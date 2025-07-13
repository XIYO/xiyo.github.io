#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import matter from 'gray-matter';
import path from 'path';
import yaml from 'js-yaml';

try {
  // 마지막 커밋에서 변경된 파일들 가져오기
  const changedFiles = execSync('git diff --name-only HEAD HEAD~1', { encoding: 'utf-8' })
    .trim()
    .split('\n')
    .filter(file => file.endsWith('.md'));

  if (changedFiles.length === 0) {
    console.log('변경된 마크다운 파일이 없습니다.');
    process.exit(0);
  }

  console.log(`변경된 마크다운 파일 ${changedFiles.length}개를 처리합니다...`);

  let hasChanges = false;

  changedFiles.forEach(file => {
    try {
      const filePath = path.resolve(file);
      const content = readFileSync(filePath, 'utf-8');
      const { data, content: markdownContent } = matter(content);

      // 해당 파일의 전체 git 로그 가져오기
      const gitLog = execSync(`git log --pretty=format:"%an|%aI|%s" --follow -- "${file}"`, { encoding: 'utf-8' })
        .trim()
        .split('\n')
        .filter(line => line);

      // 커밋 정보 파싱
      const authors = [];
      const dates = [];
      const messages = [];
      
      gitLog.forEach(log => {
        const [author, date, message] = log.split('|');
        authors.push(author);
        dates.push(date);
        messages.push(message);
      });

      // 기존 필드 삭제 (title, description, authors, dates, messages, author, date, message)
      const fieldsToDelete = ['title', 'description', 'authors', 'dates', 'messages', 'author', 'date', 'message'];
      fieldsToDelete.forEach(field => delete data[field]);

      // 마크다운 내용에서 title과 description 추출
      const lines = markdownContent.trim().split('\n');
      let title = '';
      let description = '';
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // 첫 번째 h1 찾기
        if (line.startsWith('# ') && !title) {
          title = line.substring(2).trim();
          
          // h1 다음 줄이 빈 줄이면 그 다음 줄, 아니면 바로 다음 줄을 description으로
          let descIndex = i + 1;
          if (descIndex < lines.length && lines[descIndex].trim() === '') {
            descIndex++;
          }
          
          if (descIndex < lines.length && !lines[descIndex].trim().startsWith('#')) {
            description = lines[descIndex].trim();
          }
          break;
        }
      }

      // 새 필드 추가
      data.title = title || path.basename(file, '.md');
      data.description = description || '';
      data.authors = authors;
      data.dates = dates;
      data.messages = messages;

      // 파일 다시 쓰기 - 이모지 유니코드 이스케이프 방지
      const yamlStr = yaml.dump(data, {
        lineWidth: -1,
        noRefs: true,
        sortKeys: false,
        quotingType: "'",
        forceQuotes: false
      });
      
      const updatedContent = `---\n${yamlStr}---\n${markdownContent}`;
      writeFileSync(filePath, updatedContent);
      hasChanges = true;

      console.log(`✅ ${file} 프론트매터 업데이트 완료`);
    } catch (error) {
      console.error(`❌ ${file} 처리 중 오류:`, error.message);
    }
  });

  // 변경사항이 있으면 커밋
  if (hasChanges) {
    // 변경된 파일들만 추가
    changedFiles.forEach(file => {
      execSync(`git add "${file}"`, { stdio: 'inherit' });
    });
    
    // amend commit
    execSync(`git commit --amend --no-edit --no-verify`, { stdio: 'inherit' });
    console.log('✅ 프론트매터 업데이트가 커밋에 포함되었습니다.');
  }

} catch (error) {
  console.error('❌ 스크립트 실행 중 오류:', error.message);
  process.exit(1);
}