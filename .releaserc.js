/**
 * semantic-release 설정
 * 자동 버저닝 및 릴리즈 관리
 */

export default {
	branches: ['main'],
	plugins: [
		// 1. 커밋 메시지 분석
		'@semantic-release/commit-analyzer',
		
		// 2. 릴리즈 노트 생성
		'@semantic-release/release-notes-generator',
		
		// 3. CHANGELOG.md 파일 생성/업데이트
		'@semantic-release/changelog',
		
		// 4. package.json 버전 업데이트 (기본 포함)
		'@semantic-release/npm',
		
		// 5. Git 커밋 및 태그 생성
		[
			'@semantic-release/git',
			{
				assets: ['CHANGELOG.md', 'package.json', 'package-lock.json'],
				message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
			}
		],
		
		// 6. GitHub Release 생성
		'@semantic-release/github'
	]
};