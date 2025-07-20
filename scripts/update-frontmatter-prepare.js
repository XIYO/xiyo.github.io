#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import matter from 'gray-matter';
import path from 'path';
import yaml from 'js-yaml';

try {
	// 환경변수에서 커밋 메시지 가져오기
	const commitMessage = process.env.COMMIT_MESSAGE || '';

	if (!commitMessage) {
		console.log('커밋 메시지가 없습니다.');
		process.exit(0);
	}

	// 스테이징된 마크다운 파일들 가져오기
	const stagedFiles = execSync('git diff --cached --name-only --diff-filter=ACM', {
		encoding: 'utf-8'
	})
		.trim()
		.split('\n')
		.filter((file) => file && file.endsWith('.md'));

	if (stagedFiles.length === 0) {
		console.log('스테이징된 마크다운 파일이 없습니다.');
		process.exit(0);
	}

	console.log(`스테이징된 마크다운 파일 ${stagedFiles.length}개를 처리합니다...`);
	console.log(`커밋 메시지: "${commitMessage}"`);

	let hasChanges = false;

	stagedFiles.forEach((file) => {
		try {
			const filePath = path.resolve(file);
			const content = readFileSync(filePath, 'utf-8');
			const { data, content: markdownContent } = matter(content);

			// 해당 파일의 전체 git 로그 가져오기 (기존 히스토리)
			let gitLog = [];
			try {
				gitLog = execSync(`git log --pretty=format:"%an|%aI|%s" --follow -- "${file}"`, {
					encoding: 'utf-8'
				})
					.trim()
					.split('\n')
					.filter((line) => line);
			} catch {
				// 새 파일인 경우 git log가 없을 수 있음
				console.log(`새 파일: ${file}`);
			}

			// 현재 작업자 정보 가져오기
			const currentAuthor = execSync('git config user.name', { encoding: 'utf-8' }).trim();
			const currentDate = new Date().toISOString();

			// 커밋 정보 파싱 (현재 커밋 메시지 포함)
			const authors = [currentAuthor];
			const dates = [currentDate];
			const messages = [commitMessage]; // 현재 커밋 메시지 추가

			// 기존 히스토리 추가
			gitLog.forEach((log) => {
				const [author, date, message] = log.split('|');
				authors.push(author);
				dates.push(date);
				messages.push(message);
			});

			// 고유한 작성자 목록
			const uniqueAuthors = [...new Set(authors)];

			// 날짜 정보
			const createdDate = dates[dates.length - 1] || currentDate;
			const modifiedDate = currentDate;

			// 제목 추출 (첫 번째 H1 헤더)
			const titleMatch = markdownContent.match(/^#\s+(.+)$/m);
			const title = titleMatch ? titleMatch[1] : '';

			// 설명 추출 (첫 번째 단락)
			const descriptionMatch = markdownContent.match(/^#\s+.+\n\n(.+)$/m);
			const description = descriptionMatch ? descriptionMatch[1] : '';

			// 프론트매터 업데이트
			const updatedData = {
				...data,
				title: data.title || title,
				description: data.description || description,
				authors: uniqueAuthors,
				dates: dates,
				messages: messages,
				created: data.created || createdDate,
				modified: modifiedDate
			};

			// 변경사항이 있는 경우에만 업데이트
			if (JSON.stringify(data) !== JSON.stringify(updatedData)) {
				// YAML 포맷팅
				const yamlStr = yaml.dump(updatedData, {
					lineWidth: -1,
					sortKeys: false,
					quotingType: "'",
					forceQuotes: false
				});

				const updatedContent = `---\n${yamlStr}---\n${markdownContent}`;
				writeFileSync(filePath, updatedContent);

				console.log(`✅ ${file} 프론트매터 업데이트 완료`);
				hasChanges = true;
			}
		} catch (error) {
			console.error(`❌ ${file} 처리 중 오류 발생:`, error.message);
		}
	});

	// 변경사항이 있으면 다시 스테이징
	if (hasChanges) {
		stagedFiles.forEach((file) => {
			execSync(`git add "${file}"`, { stdio: 'inherit' });
		});
		console.log('✅ 업데이트된 프론트매터가 스테이징되었습니다.');
	} else {
		console.log('ℹ️  업데이트할 프론트매터가 없습니다.');
	}
} catch (error) {
	console.error('스크립트 실행 중 오류 발생:', error);
	process.exit(1);
}
