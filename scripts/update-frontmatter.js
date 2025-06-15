#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/**
 * Git staged 파일들 중 마크다운 파일만 필터링
 */
function getStagedMarkdownFiles() {
  try {
    // --cached: staged 파일들만
    // --diff-filter=AM: Added, Modified 파일만 (Deleted 제외)
    const result = execSync('git diff --cached --name-only --diff-filter=AM', { encoding: 'utf8' });
    const files = result
      .split('\n')
      .filter(file => file.trim() && file.endsWith('.md'))
      .map(file => path.resolve(file))
      .filter(file => fs.existsSync(file)); // 실제 존재하는 파일만
    
    console.log(`📂 발견된 마크다운 파일: ${files.length}개`);
    return files;
  } catch (error) {
    console.error('Git staged 파일 조회 실패:', error.message);
    return [];
  }
}

/**
 * 현재 커밋 메시지 가져오기
 */
function getCurrentCommitMessage() {
  try {
    // prepare-commit-msg 훅에서 전달된 커밋 메시지 파일 경로
    const commitMsgFile = process.env.COMMIT_MSG_FILE;
    if (commitMsgFile && fs.existsSync(commitMsgFile)) {
      const content = fs.readFileSync(commitMsgFile, 'utf8').trim();
      // 첫 번째 줄만 사용 (제목)
      const firstLine = content.split('\n')[0].trim();
      if (firstLine && !firstLine.startsWith('#')) {
        return firstLine;
      }
    }
    
    // .git/COMMIT_EDITMSG에서 커밋 메시지 읽기
    const commitMsgPath = path.join('.git', 'COMMIT_EDITMSG');
    if (fs.existsSync(commitMsgPath)) {
      const content = fs.readFileSync(commitMsgPath, 'utf8').trim();
      const firstLine = content.split('\n')[0].trim();
      if (firstLine && !firstLine.startsWith('#')) {
        return firstLine;
      }
    }
    
    // 환경변수에서 시도
    if (process.env.COMMIT_MESSAGE) {
      return process.env.COMMIT_MESSAGE;
    }
    
    // 기본값 사용
    return '문서 업데이트';
  } catch (error) {
    console.warn('커밋 메시지 조회 실패, 기본값 사용:', error.message);
    return '문서 업데이트';
  }
}

/**
 * Git 사용자 정보 가져오기
 */
function getGitUser() {
  try {
    const name = execSync('git config user.name', { encoding: 'utf8' }).trim();
    return name || 'Unknown';
  } catch (error) {
    console.warn('Git 사용자 정보 조회 실패:', error.message);
    return 'Unknown';
  }
}

/**
 * 프론트매터 파싱
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return {
      frontmatter: {},
      content: content,
      hasFrontmatter: false
    };
  }

  const frontmatterContent = match[1];
  const bodyContent = match[2];
  
  // 간단한 YAML 파싱 (기본적인 구조만)
  const frontmatter = {};
  const lines = frontmatterContent.split('\n');
  let currentKey = null;
  let currentArray = null;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    if (trimmed.startsWith('- ')) {
      // 배열 항목
      if (currentArray) {
        const value = trimmed.substring(2).trim();
        // 따옴표 제거
        const cleanValue = value.replace(/^["']|["']$/g, '');
        currentArray.push(cleanValue);
      }
    } else if (trimmed.includes(':')) {
      // 키-값 쌍
      const [key, ...valueParts] = trimmed.split(':');
      const value = valueParts.join(':').trim();
      currentKey = key.trim();
      
      if (value) {
        // 단일 값
        const cleanValue = value.replace(/^["']|["']$/g, '');
        frontmatter[currentKey] = cleanValue;
        currentArray = null;
      } else {
        // 배열 시작
        frontmatter[currentKey] = [];
        currentArray = frontmatter[currentKey];
      }
    }
  }
  
  return {
    frontmatter,
    content: bodyContent,
    hasFrontmatter: true
  };
}

/**
 * 프론트매터를 YAML 문자열로 변환
 */
function stringifyFrontmatter(frontmatter) {
  let yaml = '';
  
  for (const [key, value] of Object.entries(frontmatter)) {
    if (Array.isArray(value)) {
      yaml += `${key}:\n`;
      for (const item of value) {
        // 특수 문자나 공백이 있는 경우 따옴표로 감싸기
        const needsQuotes = /[:#\-[\]{}|>*&!%@`]/.test(item) || item.includes(' ') || item.includes('\n');
        if (needsQuotes) {
          yaml += `  - "${item.replace(/"/g, '\\"')}"\n`;
        } else {
          yaml += `  - ${item}\n`;
        }
      }
    } else {
      // 특수 문자나 공백이 있는 경우 따옴표로 감싸기
      const needsQuotes = /[:#\-[\]{}|>*&!%@`]/.test(value) || value.includes(' ') || value.includes('\n');
      if (needsQuotes) {
        yaml += `${key}: "${value.replace(/"/g, '\\"')}"\n`;
      } else {
        yaml += `${key}: ${value}\n`;
      }
    }
  }
  
  return yaml.trim();
}

/**
 * 마크다운 파일의 프론트매터 업데이트
 */
function updateMarkdownFrontmatter(filePath, commitMessage, author) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { frontmatter, content: bodyContent } = parseFrontmatter(content);
    
    // 현재 시간 (ISO 8601 형식)
    const now = new Date().toISOString();
    
    // 프론트매터 업데이트
    const updatedFrontmatter = {
      ...frontmatter,
      title: frontmatter.title || '제목 없음',
      description: frontmatter.description || '',
      authors: [...(frontmatter.authors || []), author],
      dates: [...(frontmatter.dates || []), now],
      messages: [...(frontmatter.messages || []), commitMessage]
    };
    
    // 중복 제거 (동일한 작성자/날짜 조합)
    const uniqueEntries = [];
    const seen = new Set();
    
    for (let i = 0; i < updatedFrontmatter.authors.length; i++) {
      const author = updatedFrontmatter.authors[i];
      const date = updatedFrontmatter.dates[i];
      const message = updatedFrontmatter.messages[i];
      
      if (author && date && message) {
        const key = `${author}:${date}:${message}`;
        if (!seen.has(key)) {
          seen.add(key);
          uniqueEntries.push({ author, date, message });
        }
      }
    }
    
    // 정렬 (날짜 기준 내림차순)
    uniqueEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    updatedFrontmatter.authors = uniqueEntries.map(entry => entry.author);
    updatedFrontmatter.dates = uniqueEntries.map(entry => entry.date);
    updatedFrontmatter.messages = uniqueEntries.map(entry => entry.message);
    
    // 새로운 마크다운 파일 생성
    const frontmatterYaml = stringifyFrontmatter(updatedFrontmatter);
    const newContent = `---\n${frontmatterYaml}\n---\n${bodyContent}`;
    
    // 파일 업데이트
    fs.writeFileSync(filePath, newContent, 'utf8');
    
    console.log(`✅ 프론트매터 업데이트 완료: ${path.relative(process.cwd(), filePath)}`);
    return true;
  } catch (error) {
    console.error(`❌ 프론트매터 업데이트 실패 (${filePath}):`, error.message);
    return false;
  }
}

/**
 * 메인 실행 함수
 */
function main() {
  console.log('🚀 프론트매터 자동 업데이트 시작...');
  
  const stagedFiles = getStagedMarkdownFiles();
  
  if (stagedFiles.length === 0) {
    console.log('📝 업데이트할 마크다운 파일이 없습니다.');
    return;
  }
  
  const commitMessage = getCurrentCommitMessage();
  const author = getGitUser();
  
  console.log(`📋 커밋 메시지: "${commitMessage}"`);
  console.log(`👤 작성자: ${author}`);
  console.log(`📄 대상 파일:`);
  stagedFiles.forEach(f => console.log(`  - ${path.relative(process.cwd(), f)}`));
  
  let successCount = 0;
  
  for (const filePath of stagedFiles) {
    if (updateMarkdownFrontmatter(filePath, commitMessage, author)) {
      successCount++;
      
      // 업데이트된 파일을 다시 스테이징
      try {
        execSync(`git add "${filePath}"`);
        console.log(`📦 재스테이징 완료: ${path.relative(process.cwd(), filePath)}`);
      } catch (error) {
        console.error(`❌ 재스테이징 실패 (${filePath}):`, error.message);
        // 스테이징 실패는 치명적이지 않으므로 계속 진행
      }
    }
  }
  
  if (successCount > 0) {
    console.log(`\n✨ 프론트매터 업데이트 완료: ${successCount}/${stagedFiles.length} 파일`);
    console.log('🎯 커밋에 자동으로 프론트매터 변경사항이 포함됩니다.');
  } else {
    console.log('\n⚠️  프론트매터 업데이트에 실패했습니다.');
  }
}

// 스크립트 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
