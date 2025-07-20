#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

try {
	const file = process.argv[2];

	if (!file) {
		console.error('파일 경로가 필요합니다.');
		process.exit(1);
	}

	const content = readFileSync(file, 'utf-8');

	// 이미 frontmatter가 있으면 스킵
	if (content.startsWith('---')) {
		console.log(`⏩ ${file} already has frontmatter`);
		process.exit(0);
	}

	// 제목 추출 (첫 번째 H1 헤더)
	const titleMatch = content.match(/^#\s+(.+)$/m);
	const title = titleMatch ? titleMatch[1].trim() : '';

	// 설명 추출 (첫 번째 단락)
	const descMatch = content.match(/^#[^\n]*\n\n(.+?)(\n\n|$)/ms);
	const description = descMatch ? descMatch[1].trim() : '';

	// Git 정보 가져오기
	const author = execSync('git config user.name', { encoding: 'utf-8' }).trim();
	const now = new Date().toISOString();

	// Frontmatter 생성
	const frontmatter = `---
title: ${title}
description: ${description}
author: ${author}
created: ${now}
modified: ${now}
---

${content}`;

	writeFileSync(file, frontmatter);
	console.log(`✅ Added basic frontmatter to ${file}`);
} catch (error) {
	console.error('❌ Error processing file:', error.message);
	process.exit(1);
}
