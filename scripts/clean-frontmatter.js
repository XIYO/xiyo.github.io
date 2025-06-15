#!/usr/bin/env node

import { spawnSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'fs/promises';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';

/**
 * Git 로그 정보를 추출하는 함수
 * @param {string} filePath - 파일 경로
 * @param {string} currentCommitMsg - 현재 커밋 메시지 (선택사항)
 * @returns {Array} Git 로그 배열
 */
function getGitLogForFile(filePath, currentCommitMsg = null) {
	try {
		// 구분자를 특수 문자로 변경하여 쉼표 문제 해결
		const gitCommand = [
			'log',
			'--follow',
			'--pretty=format:%ad|||%s|||%an',
			'--date=format:%Y-%m-%dT%H:%M%z',
			filePath
		];
		const { stdout } = spawnSync('git', gitCommand, { encoding: 'utf8' });

		let gitLog = [];

		// 현재 커밋 메시지가 있다면 맨 앞에 추가
		if (currentCommitMsg && currentCommitMsg.trim()) {
			gitLog.push({
				datetime: new Date().toISOString().replace(/\.\d{3}Z$/, '+0900'),
				comment: currentCommitMsg.trim(),
				author: 'XIYO'
			});
		}

		if (stdout) {
			const existingLog = stdout.split('\n').map((line) => {
				const [datetime, comment, author] = line.split('|||');
				return {
					datetime: datetime?.trim() || '',
					comment: comment?.trim() || '',
					author: author?.trim() || ''
				};
			});
			gitLog = [...gitLog, ...existingLog];
		}

		// 기본값 반환 (로그가 없을 경우)
		if (gitLog.length === 0) {
			gitLog = [
				{
					datetime: new Date().toISOString(),
					comment: 'Initial commit',
					author: 'unknown'
				}
			];
		}

		return gitLog;
	} catch (error) {
		console.error(`Error getting git log for ${filePath}:`, error);
		return [
			{
				datetime: new Date().toISOString(),
				comment: 'Error retrieving git log',
				author: 'unknown'
			}
		];
	}
}

/**
 * 마크다운 본문에서 제목(H1)과 설명(첫 단락)을 추출
 * @param {string} markdown
 * @returns {{ title: string, description: string }}
 */
function extractTitleAndDescription(markdown) {
	let title = '';
	let description = '';
	const processor = unified()
		.use(remarkParse)
		.use(() => (tree) => {
			visit(tree, (node, index, parent) => {
				if (!title && node.type === 'heading' && node.depth === 1) {
					title = node.children[0]?.value || '';
					if (
						index !== undefined &&
						parent &&
						parent.children[index + 1] &&
						parent.children[index + 1].type === 'paragraph' &&
						parent.children[index + 1].children[0] &&
						parent.children[index + 1].children[0].type === 'text'
					) {
						description = parent.children[index + 1].children[0].value;
					}
				}
			});
		});
	processor.parse(markdown); // parse만 해도 visit이 동작
	processor.runSync(processor.parse(markdown));
	return { title, description };
}

/**
 * 마크다운 파일의 프론트매터를 정리하는 함수
 * @param {string} filePath - 마크다운 파일 경로
 * @param {string} currentCommitMsg - 현재 커밋 메시지 (선택사항)
 */
function cleanMarkdownFrontmatter(filePath, currentCommitMsg = null) {
	try {
		const content = readFileSync(filePath, 'utf8');
		const parsed = matter(content);

		// 제목/설명 추출 및 프론트매터에 추가
		const { title, description } = extractTitleAndDescription(parsed.content);
		if (title && !parsed.data.title) parsed.data.title = title;
		if (description && !parsed.data.description) parsed.data.description = description;

		// Git 로그 정보 가져오기 (현재 커밋 메시지 포함)
		const gitLog = getGitLogForFile(filePath, currentCommitMsg);

		// 기존 배열들을 초기화 (배열이 아니면 빈 배열로)
		const existingAuthors = Array.isArray(parsed.data.authors) ? parsed.data.authors : [];
		const existingDates = Array.isArray(parsed.data.dates) ? parsed.data.dates : [];
		const existingMessages = Array.isArray(parsed.data.messages) ? parsed.data.messages : [];

		// 새로운 항목들만 추가 (중복 제거)
		const newAuthors = [...existingAuthors];
		const newDates = [...existingDates];
		const newMessages = [...existingMessages];

		gitLog.forEach((entry) => {
			const author = entry.author || '';
			const datetime = entry.datetime || '';
			const message = entry.comment || '';

			// 중복 체크: 같은 날짜와 메시지가 이미 있는지 확인
			const isDuplicate = existingDates.some(
				(existingDate, index) => existingDate === datetime && existingMessages[index] === message
			);

			if (!isDuplicate) {
				newAuthors.unshift(author); // 최신 항목을 앞에 추가
				newDates.unshift(datetime);
				newMessages.unshift(message);
			}
		});

		// 프론트매터에 업데이트된 정보 설정
		parsed.data.authors = newAuthors;
		parsed.data.dates = newDates;
		parsed.data.messages = newMessages;

		// 불필요한 필드 제거
		delete parsed.data.lastUpdated;
		delete parsed.data.firstCreated;

		// 새로운 마크다운 내용 생성 (이모지를 올바르게 처리하도록 설정)
		const yamlString = yaml.dump(parsed.data, {
			// 이모지를 유니코드 이스케이프하지 않도록 설정
			noCompatMode: true,
			flowLevel: -1,
			allowUnicode: true
		});

		const newContent = `---\n${yamlString}---\n${parsed.content}`;

		// 파일 쓰기
		writeFileSync(filePath, newContent, 'utf8');
		console.log(`✅ Cleaned frontmatter for: ${filePath}`);
	} catch (error) {
		console.error(`❌ Error cleaning ${filePath}:`, error);
	}
}

async function main() {
	const args = process.argv.slice(2);
	if (args.length === 0) {
		console.log('❌ Please provide file paths or glob patterns as arguments');
		console.log('Usage: node scripts/clean-frontmatter.js <file-path|glob> [more...]');
		return;
	}

	// 환경변수에서 커밋 메시지 가져오기
	const currentCommitMsg = process.env.HUSKY_COMMIT_MSG || null;

	let files = [];
	for (const arg of args) {
		if (arg.includes('*')) {
			const matched = await glob(arg, {
				ignore: ['node_modules/**', 'build/**', '.git/**', 'storybook-static/**']
			});
			// glob 결과를 배열로 변환
			files.push(...Array.from(matched));
		} else {
			files.push(arg);
		}
	}
	// 중복 제거
	files = [...new Set(files)];
	for (const file of files) {
		cleanMarkdownFrontmatter(file, currentCommitMsg);
	}
	console.log('\n🎉 모든 파일의 프론트매터 정리 완료!');
}

main();
