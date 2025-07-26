#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';
import yaml from 'js-yaml';

/**
 * Git 커밋 정보를 가져오는 함수
 */
function getGitInfo(filePath) {
	try {
		// 파일이 서브모듈 내에 있는지 확인
		const relativePath = path.relative(process.cwd(), filePath);
		const isInSubmodule = relativePath.startsWith('static/ko-kr') || 
							  relativePath.startsWith('static/ja-jp') || 
							  relativePath.startsWith('static/en-us');
		
		let gitLog = '';
		
		if (isInSubmodule) {
			// 서브모듈의 경우, 해당 서브모듈 디렉토리로 이동하여 git log 실행
			const submodulePath = relativePath.split(path.sep).slice(0, 2).join(path.sep);
			const submoduleDir = path.join(process.cwd(), submodulePath);
			const fileInSubmodule = path.relative(submoduleDir, filePath);
			
			gitLog = execSync(
				`cd "${submoduleDir}" && git log --follow --format="%ai|%an" -- "${fileInSubmodule}"`,
				{ encoding: 'utf-8', shell: true }
			).trim();
		} else {
			// 일반 파일의 경우 기존 방식 사용
			gitLog = execSync(
				`git log --follow --format="%ai|%an" -- "${filePath}"`,
				{ encoding: 'utf-8', cwd: process.cwd() }
			).trim();
		}

		if (!gitLog) {
			console.warn(`⚠️  No git history found for: ${filePath}`);
			return {
				dates: [],
				authors: []
			};
		}

		const commits = gitLog.split('\n').map(line => {
			const [date, author] = line.split('|');
			return { date: new Date(date).toISOString(), author };
		});

		// 날짜 중복 제거 (내림차순 정렬)
		const uniqueDates = [...new Set(commits.map(c => c.date))].sort((a, b) => new Date(b) - new Date(a));
		
		// 작성자 중복 제거 (첫 번째 커밋 순서대로)
		const uniqueAuthors = [...new Set(commits.map(c => c.author))];

		return {
			dates: uniqueDates,
			authors: uniqueAuthors
		};
	} catch (error) {
		console.warn(`⚠️  Error getting git info for ${filePath}:`, error.message);
		return {
			dates: [],
			authors: []
		};
	}
}

/**
 * 마크다운 파일에서 제목과 설명 추출
 */
function extractTitleAndDescription(content) {
	const lines = content.split('\n');
	let title = '';
	let description = '';
	
	// 프론트매터 스킵
	let startIndex = 0;
	if (lines[0] === '---') {
		const endIndex = lines.findIndex((line, index) => index > 0 && line === '---');
		if (endIndex !== -1) {
			startIndex = endIndex + 1;
		}
	}
	
	// H1 제목 찾기
	for (let i = startIndex; i < lines.length; i++) {
		const line = lines[i].trim();
		if (line.startsWith('# ')) {
			title = line.substring(2).trim();
			
			// H1 바로 아래 패러그래프를 설명으로 사용
			for (let j = i + 1; j < lines.length; j++) {
				const nextLine = lines[j].trim();
				if (nextLine === '') continue; // 빈 줄 스킵
				if (nextLine.startsWith('#') || nextLine.startsWith('>')) break; // 다른 헤딩이나 블록인용문이면 중단
				if (nextLine.startsWith('```') || nextLine.startsWith('|')) break; // 코드블록이나 테이블이면 중단
				
				description = nextLine;
				break;
			}
			break;
		}
	}
	
	return { title, description };
}

/**
 * 프론트매터 완전 재구성 (4개 필드만 새로 생성, messages 삭제, 나머지 유지)
 */
function cleanFrontmatter(content, newFields) {
	const lines = content.split('\n');
	
	// 기존 프론트매터 찾기
	let frontmatterStart = -1;
	let frontmatterEnd = -1;
	let existingFrontmatter = {};
	
	if (lines[0] === '---') {
		frontmatterStart = 0;
		const endIndex = lines.findIndex((line, index) => index > 0 && line === '---');
		if (endIndex !== -1) {
			frontmatterEnd = endIndex;
			const frontmatterContent = lines.slice(1, endIndex).join('\n');
			try {
				existingFrontmatter = yaml.load(frontmatterContent) || {};
			} catch (error) {
				console.warn('Failed to parse existing frontmatter:', error.message);
			}
		}
	}
	
	// 기존 프론트매터에서 4개 필드와 messages 필드 제거
	const cleanedExisting = { ...existingFrontmatter };
	delete cleanedExisting.title;
	delete cleanedExisting.description;
	delete cleanedExisting.dates;
	delete cleanedExisting.authors;
	delete cleanedExisting.messages; // messages 필드 완전 삭제
	
	// 새로운 프론트매터 = 새로 추출한 4개 필드 + 나머지 기존 필드
	const newFrontmatter = {
		...newFields, // title, description, dates, authors (새로 추출)
		...cleanedExisting // 나머지 기존 필드들
	};
	
	// 빈 필드 제거
	Object.keys(newFrontmatter).forEach(key => {
		if (newFrontmatter[key] === '' || 
			(Array.isArray(newFrontmatter[key]) && newFrontmatter[key].length === 0)) {
			delete newFrontmatter[key];
		}
	});
	
	// 새 프론트매터 생성
	const newFrontmatterYaml = yaml.dump(newFrontmatter, {
		defaultFlowStyle: false,
		quotingType: '"',
		forceQuotes: false
	});
	
	// 콘텐츠 재구성
	const contentStart = frontmatterEnd > -1 ? frontmatterEnd + 1 : 0;
	const bodyContent = lines.slice(contentStart).join('\n');
	
	return `---\n${newFrontmatterYaml}---\n${bodyContent}`;
}

/**
 * 마크다운 파일 처리
 */
async function processMarkdownFile(filePath) {
	console.log(`📝 Processing: ${filePath}`);
	
	try {
		// 파일 읽기
		const content = await fs.readFile(filePath, 'utf-8');
		
		// Git 정보 가져오기
		const gitInfo = getGitInfo(filePath);
		
		// 제목과 설명 추출
		const { title, description } = extractTitleAndDescription(content);
		
		// 새로 생성할 4개 필드
		const newFields = {};
		
		if (title) newFields.title = title;
		if (description) newFields.description = description;
		if (gitInfo.dates.length > 0) newFields.dates = gitInfo.dates;
		if (gitInfo.authors.length > 0) newFields.authors = gitInfo.authors;
		
		// 프론트매터 완전 재구성
		const updatedContent = cleanFrontmatter(content, newFields);
		
		// 파일 쓰기
		await fs.writeFile(filePath, updatedContent, 'utf-8');
		
		console.log(`  ✅ Updated: 4개 필드 새로 생성, messages 삭제`);
		if (title) console.log(`    📌 Title: ${title}`);
		if (description) console.log(`    📄 Description: ${description.substring(0, 50)}${description.length > 50 ? '...' : ''}`);
		console.log(`    📅 Dates: ${gitInfo.dates.length}`);
		console.log(`    👤 Authors: ${gitInfo.authors.join(', ')}`);
		
	} catch (error) {
		console.error(`❌ Error processing ${filePath}:`, error.message);
	}
}

/**
 * 디렉토리에서 마크다운 파일 찾기
 */
async function findMarkdownFiles(dir) {
	const files = [];
	
	try {
		const entries = await fs.readdir(dir, { withFileTypes: true });
		
		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			
			if (entry.isDirectory()) {
				// 재귀적으로 하위 디렉토리 탐색
				const subFiles = await findMarkdownFiles(fullPath);
				files.push(...subFiles);
			} else if (entry.isFile() && entry.name.endsWith('.md')) {
				files.push(fullPath);
			}
		}
	} catch (error) {
		console.warn(`⚠️  Cannot read directory ${dir}:`, error.message);
	}
	
	return files;
}

/**
 * 메인 실행 함수
 */
async function main() {
	console.log('🧹 Starting frontmatter cleanup process...');
	console.log('- 4개 필드 (title, description, dates, authors) 새로 생성');
	console.log('- messages 필드 완전 삭제');
	console.log('- 나머지 필드들은 기존 데이터 유지');
	console.log('====================================');
	
	const staticDir = path.join(process.cwd(), 'static');
	
	try {
		// static 디렉토리 확인
		await fs.access(staticDir);
	} catch (error) {
		console.error(`❌ Static directory not found: ${staticDir}`);
		process.exit(1);
	}
	
	// 모든 마크다운 파일 찾기
	console.log('📂 Finding markdown files...');
	const markdownFiles = await findMarkdownFiles(staticDir);
	
	console.log(`📊 Found ${markdownFiles.length} markdown files`);
	console.log('====================================');
	
	// 각 파일 처리
	for (const filePath of markdownFiles) {
		await processMarkdownFile(filePath);
		console.log(''); // 빈 줄로 구분
	}
	
	console.log('====================================');
	console.log('✅ Frontmatter cleanup completed!');
	console.log(`📊 Processed ${markdownFiles.length} files`);
	console.log('🗑️  All messages fields deleted');
	console.log('🔄 4 fields regenerated from Git and content');
}

// 스크립트 실행
if (import.meta.url === `file://${process.argv[1]}`) {
	main().catch(console.error);
}