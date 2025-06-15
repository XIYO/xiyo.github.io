#!/bin/bash

# e5940e4: :fire: 잘못 만들어진 파일 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e5940e4" ]; then echo "🔥 잘못 만들어진 파일 삭제"; else cat; fi' HEAD

# 623fa31: :art: Header 및 Nav 컴포넌트 개선, 내비게이션 모달 적용 및 불필요한 코드 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "623fa31" ]; then echo "🎨 Header 및 Nav 컴포넌트 개선, 내비게이션 모달 적용 및 불필요한 코드 제거"; else cat; fi' HEAD

# 5d3e6ef: :fire: tailwind.config.js 파일 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "5d3e6ef" ]; then echo "🔥 tailwind.config.js 파일 삭제"; else cat; fi' HEAD

# 6729456: :art: Footer 컴포넌트 스타일 통일 및 불필요한 코드 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6729456" ]; then echo "🎨 Footer 컴포넌트 스타일 통일 및 불필요한 코드 제거"; else cat; fi' HEAD

# 470c995: :arrow_up: 의존성 버전 업데이트 및 불필요한 항목 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "470c995" ]; then echo "⬆️ 의존성 버전 업데이트 및 불필요한 항목 제거"; else cat; fi' HEAD

# 53700f2: :art: 코드 스타일 통일 및 불필요한 줄 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "53700f2" ]; then echo "🎨 코드 스타일 통일 및 불필요한 줄 제거"; else cat; fi' HEAD

# 2978400: :art: 따옴표 스타일 통일을 위한 Nav 컴포넌트 임포트 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "2978400" ]; then echo "🎨 따옴표 스타일 통일을 위한 Nav 컴포넌트 임포트 수정"; else cat; fi' HEAD

# b1a6e8f: :fire: 사용하지 않는 DirectoryTrees 및 NavButton 컴포넌트 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b1a6e8f" ]; then echo "🔥 사용하지 않는 DirectoryTrees 및 NavButton 컴포넌트 삭제"; else cat; fi' HEAD

# 95fb63b: :poop: 잘못된 테일윈드 문법을 옳은 방향으로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "95fb63b" ]; then echo "💩 잘못된 테일윈드 문법을 옳은 방향으로 변경"; else cat; fi' HEAD

# b5645c4: :recycle: 커밋 메시지 지침 파일 정리 및 불필요한 내용 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b5645c4" ]; then echo "♻️ 커밋 메시지 지침 파일 정리 및 불필요한 내용 제거"; else cat; fi' HEAD

# 6f001d8: :recycle: font-optical-sizing 속성 제거 (코드 정리 및 유지보수성 향상)
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6f001d8" ]; then echo "♻️ font-optical-sizing 속성 제거 (코드 정리 및 유지보수성 향상)"; else cat; fi' HEAD

# ee508b0: :zap: Svelte 5의 비동기 호출 자동 병렬화 최적화 (성능 향상)
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "ee508b0" ]; then echo "⚡️ Svelte 5의 비동기 호출 자동 병렬화 최적화 (성능 향상)"; else cat; fi' HEAD

# 8c6bbd2: :zap: Svelte 5의 비동기 처리 자동 병렬화 기능 추가 (성능 최적화 및 개발자 편의성 향상)
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8c6bbd2" ]; then echo "⚡️ Svelte 5의 비동기 처리 자동 병렬화 기능 추가 (성능 최적화 및 개발자 편의성 향상)"; else cat; fi' HEAD

# 0e6d27e: :tada: 깃모지 커밋 메시지 지침 추가 (명확하고 일관된 메시지 작성 지원)
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0e6d27e" ]; then echo "🎉 깃모지 커밋 메시지 지침 추가 (명확하고 일관된 메시지 작성 지원)"; else cat; fi' HEAD

# d08da60: :recycle: 카테고리 및 게시글 클래스의 주석 업데이트 및 타입 수정 (코드 가독성 향상)
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "d08da60" ]; then echo "♻️ 카테고리 및 게시글 클래스의 주석 업데이트 및 타입 수정 (코드 가독성 향상)"; else cat; fi' HEAD

# 7b6d2a2: :fire: 불필요한 게시물 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7b6d2a2" ]; then echo "🔥 불필요한 게시물 삭제"; else cat; fi' HEAD

# e1b9b2b: :fire: 의미 없는 파일 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e1b9b2b" ]; then echo "🔥 의미 없는 파일 삭제"; else cat; fi' HEAD

# 07cda83: :fire: 푸터에서의 날짜 표시 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "07cda83" ]; then echo "🔥 푸터에서의 날짜 표시 삭제"; else cat; fi' HEAD

# 5000373: :art: svelte-async.md 문서 내용 수정 및 개선 사항 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "5000373" ]; then echo "🎨 svelte-async.md 문서 내용 수정 및 개선 사항 추가"; else cat; fi' HEAD

# 7c16f58: :art: svelte-async.md 문서 제목 수정 및 내용 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7c16f58" ]; then echo "🎨 svelte-async.md 문서 제목 수정 및 내용 추가"; else cat; fi' HEAD

# b37779d: :art: svelte-async.md 문서에서 <script> 영역의 await 사용에 대한 설명 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b37779d" ]; then echo "🎨 svelte-async.md 문서에서 <script> 영역의 await 사용에 대한 설명 수정"; else cat; fi' HEAD

# bbd6dbd: :memo: 스벨트의 비동기
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "bbd6dbd" ]; then echo "📝 스벨트의 비동기"; else cat; fi' HEAD

# 19f4c4a: :memo: 스벨트의 비동기
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "19f4c4a" ]; then echo "📝 스벨트의 비동기"; else cat; fi' HEAD

# 3d8398e: :arrow_up: 최신 버전으로 업데이트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3d8398e" ]; then echo "⬆️ 최신 버전으로 업데이트"; else cat; fi' HEAD

# faf7036: :art: 카테고리의 데이터를 필수 데이터만 보내도록 최적화
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "faf7036" ]; then echo "🎨 카테고리의 데이터를 필수 데이터만 보내도록 최적화"; else cat; fi' HEAD

# dcc7af7: :memo: 설명 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "dcc7af7" ]; then echo "📝 설명 추가"; else cat; fi' HEAD

# c0aab34: :memo: 설명 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c0aab34" ]; then echo "📝 설명 추가"; else cat; fi' HEAD

# ad8081a: :arrow_up: 전체 업그레이드 및 패러그랄이드JS 업그레이드에 따른 구조 변화
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "ad8081a" ]; then echo "⬆️ 전체 업그레이드 및 패러그랄이드JS 업그레이드에 따른 구조 변화"; else cat; fi' HEAD

# 4122cf9: :art: 이미지 파일 경로 수정: 정적 리소스 경로에 슬래시 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4122cf9" ]; then echo "🎨 이미지 파일 경로 수정: 정적 리소스 경로에 슬래시 추가"; else cat; fi' HEAD

# 55cf4ca: :art: 이미지 파일 이름 변경 및 업데이트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "55cf4ca" ]; then echo "🎨 이미지 파일 이름 변경 및 업데이트"; else cat; fi' HEAD

# 5cee6a8: :memo: 인텔리제이에서 프로젝트가 항상 탭으로 열리게 하기
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "5cee6a8" ]; then echo "📝 인텔리제이에서 프로젝트가 항상 탭으로 열리게 하기"; else cat; fi' HEAD

# 21f05df: :lipstick: 코드 테두리 색상 변경: 기본 색상을 서브 색상으로 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "21f05df" ]; then echo "💄 코드 테두리 색상 변경: 기본 색상을 서브 색상으로 수정"; else cat; fi' HEAD

# 3d16d0c: :lipstick: 헤딩 마진 조정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3d16d0c" ]; then echo "💄 헤딩 마진 조정"; else cat; fi' HEAD

# b42b124: :memo: Cloudflare 토큰 발급 페이지 링크 추가 및 스크립트 설명 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b42b124" ]; then echo "📝 Cloudflare 토큰 발급 페이지 링크 추가 및 스크립트 설명 수정"; else cat; fi' HEAD

# d403844: :art: run format
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "d403844" ]; then echo "🎨 run format"; else cat; fi' HEAD

# e484873: :memo: 투 슬래시 문법 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e484873" ]; then echo "📝 투 슬래시 문법 추가"; else cat; fi' HEAD

# a4089b0: :lipstick: 가로 720 이하 해상도에 대한 반응형 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a4089b0" ]; then echo "💄 가로 720 이하 해상도에 대한 반응형 추가"; else cat; fi' HEAD

# 0ea7f77: :lipstick: 래퍼 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0ea7f77" ]; then echo "💄 래퍼 제거"; else cat; fi' HEAD

# a822891: :memo: 말이 되도록 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a822891" ]; then echo "📝 말이 되도록 변경"; else cat; fi' HEAD

# 750da0a: :art: code format
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "750da0a" ]; then echo "🎨 code format"; else cat; fi' HEAD

# 7492c0f: :recycle: 심볼 사용 코드 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7492c0f" ]; then echo "♻️ 심볼 사용 코드 제거"; else cat; fi' HEAD

# 06e7dd5: :bug: 이미지 사이즈 사용법 변경에 의한 코드 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "06e7dd5" ]; then echo "🐛 이미지 사이즈 사용법 변경에 의한 코드 변경"; else cat; fi' HEAD

# 8f7bb88: :art: code format
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8f7bb88" ]; then echo "🎨 code format"; else cat; fi' HEAD

# b93d482: :recycle: 타입 추가 및 비효율적인 코드 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b93d482" ]; then echo "♻️ 타입 추가 및 비효율적인 코드 제거"; else cat; fi' HEAD

# 70b2237: :art: 린트 적용
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "70b2237" ]; then echo "🎨 린트 적용"; else cat; fi' HEAD

# 932d9c7: :arrow_up: 패키지 전체 업데이트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "932d9c7" ]; then echo "⬆️ 패키지 전체 업데이트"; else cat; fi' HEAD

# 3aff31a: :recycle: 코드 최적화
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3aff31a" ]; then echo "♻️ 코드 최적화"; else cat; fi' HEAD

# f4e9337: :art: update deployment workflow to streamline pnpm installation and add Node.js setup
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f4e9337" ]; then echo "🎨 update deployment workflow to streamline pnpm installation and add Node.js setup"; else cat; fi' HEAD

# bc9e5a3: :art: simplify deployment workflow by removing unnecessary steps and consolidating pnpm installation
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "bc9e5a3" ]; then echo "🎨 simplify deployment workflow by removing unnecessary steps and consolidating pnpm installation"; else cat; fi' HEAD

# 0794f1e: :art: simplify deployment workflow by removing unused branch and pnpm setup step
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0794f1e" ]; then echo "🎨 simplify deployment workflow by removing unused branch and pnpm setup step"; else cat; fi' HEAD

# e3605bc: :art: update deployment workflow to target Cloudflare Pages and streamline steps
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e3605bc" ]; then echo "🎨 update deployment workflow to target Cloudflare Pages and streamline steps"; else cat; fi' HEAD

# 7c03b2a: :art: improve clarity in ACME certificate issuance guide by refining language and formatting
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7c03b2a" ]; then echo "🎨 improve clarity in ACME certificate issuance guide by refining language and formatting"; else cat; fi' HEAD

# 17ce5f0: :fire:
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "17ce5f0" ]; then echo "🔥"; else cat; fi' HEAD

# 0049d85: :art: add guide for automating ACME certificate issuance on ASUS AC88U router
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0049d85" ]; then echo "🎨 add guide for automating ACME certificate issuance on ASUS AC88U router"; else cat; fi' HEAD

# 2402bad: :art: add CardCaption component to render children with styling
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "2402bad" ]; then echo "🎨 add CardCaption component to render children with styling"; else cat; fi' HEAD

# 7e52635: :art: refactor CardHeader component to use children prop instead of title
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7e52635" ]; then echo "🎨 refactor CardHeader component to use children prop instead of title"; else cat; fi' HEAD

# 6eae09f: :art: refactor Border component to Card component across multiple files
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6eae09f" ]; then echo "🎨 refactor Border component to Card component across multiple files"; else cat; fi' HEAD

# 3d9bfe1: :art: fix duplicate selector in heading styles
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3d9bfe1" ]; then echo "🎨 fix duplicate selector in heading styles"; else cat; fi' HEAD

# 25547ce: :goal_net:
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "25547ce" ]; then echo "🥅"; else cat; fi' HEAD

# bb22277: :arrow_up: upgrade
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "bb22277" ]; then echo "⬆️ upgrade"; else cat; fi' HEAD

# f2b5443: :recycle: 사용 중지된 코드 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f2b5443" ]; then echo "♻️ 사용 중지된 코드 수정"; else cat; fi' HEAD

# 84ac697: :memo: 제목 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "84ac697" ]; then echo "📝 제목 추가"; else cat; fi' HEAD

# cdbf837: :memo: 패스트 캠퍼스 중간 회고
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "cdbf837" ]; then echo "📝 패스트 캠퍼스 중간 회고"; else cat; fi' HEAD

# b882810: :arrow_up: pnpm up --latest
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b882810" ]; then echo "⬆️ pnpm up --latest"; else cat; fi' HEAD

# 4d14fd1: :memo: 사진 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4d14fd1" ]; then echo "📝 사진 추가"; else cat; fi' HEAD

# 7204c86: :memo: 키워드 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7204c86" ]; then echo "📝 키워드 추가"; else cat; fi' HEAD

# c4c8879: :memo: 키워드 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c4c8879" ]; then echo "📝 키워드 추가"; else cat; fi' HEAD

# 6b4c006: :memo: 세번째 패리포터 포스팅
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6b4c006" ]; then echo "📝 세번째 패리포터 포스팅"; else cat; fi' HEAD

# 6d9ed08: :memo: 서두에 나오는 문장, 앞광고 문장 통일
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6d9ed08" ]; then echo "📝 서두에 나오는 문장, 앞광고 문장 통일"; else cat; fi' HEAD

# ac3b76f: :memo: 사진 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "ac3b76f" ]; then echo "📝 사진 추가"; else cat; fi' HEAD

# a45e92a: :arrow_up: 디펜던시 업데이트, 특히 vite 판올림 함
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a45e92a" ]; then echo "⬆️ 디펜던시 업데이트, 특히 vite 판올림 함"; else cat; fi' HEAD

# 66596d3: :memo: 이터레이터 초안
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "66596d3" ]; then echo "📝 이터레이터 초안"; else cat; fi' HEAD

# 3c0690d: :poop: 잘못된 경로 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3c0690d" ]; then echo "💩 잘못된 경로 수정"; else cat; fi' HEAD

# 460a846: :memo: 패리포터 글 2
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "460a846" ]; then echo "📝 패리포터 글 2"; else cat; fi' HEAD

# 35a5118: :arrow_up: 패키지 업데이트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "35a5118" ]; then echo "⬆️ 패키지 업데이트"; else cat; fi' HEAD

# e1f077d: :memo: 코딩 테스트 모집 사진 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e1f077d" ]; then echo "📝 코딩 테스트 모집 사진 추가"; else cat; fi' HEAD

# 0a8c16d: :arrow_up: 디펜던시 업그레이드
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0a8c16d" ]; then echo "⬆️ 디펜던시 업그레이드"; else cat; fi' HEAD

# 4006ae2: :memo: new post
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4006ae2" ]; then echo "📝 new post"; else cat; fi' HEAD

# 55fa9e0: :memo: 띄어쓰기, 이모지 적절하게 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "55fa9e0" ]; then echo "📝 띄어쓰기, 이모지 적절하게 수정"; else cat; fi' HEAD

# 2b082ca: :memo: 문장 수정 및 이미지 리사이즈
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "2b082ca" ]; then echo "📝 문장 수정 및 이미지 리사이즈"; else cat; fi' HEAD

# 4f10e8b: :lipstick: 헤더 탑 마진 조금 더 크게
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4f10e8b" ]; then echo "💄 헤더 탑 마진 조금 더 크게"; else cat; fi' HEAD

# 5693811: :memo: 문장 조금 더 자연스럽게 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "5693811" ]; then echo "📝 문장 조금 더 자연스럽게 수정"; else cat; fi' HEAD

# b549ab3: :memo: 문장 조금 더 자연스럽게 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b549ab3" ]; then echo "📝 문장 조금 더 자연스럽게 수정"; else cat; fi' HEAD

# b566d88: :memo: 문장 조금 더 자연스럽게 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b566d88" ]; then echo "📝 문장 조금 더 자연스럽게 수정"; else cat; fi' HEAD

# 0895679: :memo: 문장 조금 더 자연스럽게 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0895679" ]; then echo "📝 문장 조금 더 자연스럽게 수정"; else cat; fi' HEAD

# 8c6024d: :memo: 문장 조금 더 자연스럽게 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8c6024d" ]; then echo "📝 문장 조금 더 자연스럽게 수정"; else cat; fi' HEAD

# ebfda4b: :memo: 문장 조금 더 자연스럽게 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "ebfda4b" ]; then echo "📝 문장 조금 더 자연스럽게 수정"; else cat; fi' HEAD

# 468b391: :memo: 위트 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "468b391" ]; then echo "📝 위트 추가"; else cat; fi' HEAD

# 87592fe: :memo: 단체 사진 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "87592fe" ]; then echo "📝 단체 사진 추가"; else cat; fi' HEAD

# 6e6452f: :memo: 단체 사진 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6e6452f" ]; then echo "📝 단체 사진 추가"; else cat; fi' HEAD

# 389d3f4: :memo: 문장 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "389d3f4" ]; then echo "📝 문장 수정"; else cat; fi' HEAD

# d9f079c: :memo: 문장 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "d9f079c" ]; then echo "📝 문장 수정"; else cat; fi' HEAD

# 111127c: :memo: new post, 패스트캠퍼스 후기
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "111127c" ]; then echo "📝 new post, 패스트캠퍼스 후기"; else cat; fi' HEAD

# 1f903a9: :bug: 소형 모니터 이하에서 내비게이션이 닫기를 눌러도 사리지지 않는 버그 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "1f903a9" ]; then echo "🐛 소형 모니터 이하에서 내비게이션이 닫기를 눌러도 사리지지 않는 버그 수정"; else cat; fi' HEAD

# f58892a: :arrow_up: svelte 5.0.3
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f58892a" ]; then echo "⬆️ svelte 5.0.3"; else cat; fi' HEAD

# f76f66f: :memo: 문장 레벨 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f76f66f" ]; then echo "📝 문장 레벨 변경"; else cat; fi' HEAD

# f121c58: :memo: 문서 전체적으로 보완
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f121c58" ]; then echo "📝 문서 전체적으로 보완"; else cat; fi' HEAD

# 1b8ae26: :sparkles: 헤더에 OG 태그 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "1b8ae26" ]; then echo "✨ 헤더에 OG 태그 추가"; else cat; fi' HEAD

# 877e026: :memo: 문장 자연스럽게 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "877e026" ]; then echo "📝 문장 자연스럽게 수정"; else cat; fi' HEAD

# a7a10dd: :memo: 문장 자연스럽게 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a7a10dd" ]; then echo "📝 문장 자연스럽게 수정"; else cat; fi' HEAD

# 993ae75: :pencil2: 맞춤법 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "993ae75" ]; then echo "✏️ 맞춤법 수정"; else cat; fi' HEAD

# 1016553: :lipstick: 들여쓰기 스타일 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "1016553" ]; then echo "💄 들여쓰기 스타일 추가"; else cat; fi' HEAD

# 2daeab7: :truck: rename
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "2daeab7" ]; then echo "🚚 rename"; else cat; fi' HEAD

# 5741ab9: :memo: new post
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "5741ab9" ]; then echo "📝 new post"; else cat; fi' HEAD

# 3cf01a7: :memo: new post, java
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3cf01a7" ]; then echo "📝 new post, java"; else cat; fi' HEAD

# 763c2a6: :memo: new post
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "763c2a6" ]; then echo "📝 new post"; else cat; fi' HEAD

# 52ef215: :memo: new post
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "52ef215" ]; then echo "📝 new post"; else cat; fi' HEAD

# 776f5d3: :lipstick: 피규어 내부의 앵커 스타일 수정, 백그라운드 컬러를 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "776f5d3" ]; then echo "💄 피규어 내부의 앵커 스타일 수정, 백그라운드 컬러를 추가"; else cat; fi' HEAD

# 2cd28e3: :memo: new post
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "2cd28e3" ]; then echo "📝 new post"; else cat; fi' HEAD

# b365cf5: :arrow_up: remark-figure-caption 1.0.6으로 업데이트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b365cf5" ]; then echo "⬆️ remark-figure-caption 1.0.6으로 업데이트"; else cat; fi' HEAD

# 7b31361: :bug: 포스팅 정렬이 잘못된 버그 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7b31361" ]; then echo "🐛 포스팅 정렬이 잘못된 버그 수정"; else cat; fi' HEAD

# a296187: :memo: 문장의 흐름을 조금 더 자엽스럽게 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a296187" ]; then echo "📝 문장의 흐름을 조금 더 자엽스럽게 수정"; else cat; fi' HEAD

# b2e6fe8: :truck: 소문자 및 하이픈으로 이름 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b2e6fe8" ]; then echo "🚚 소문자 및 하이픈으로 이름 변경"; else cat; fi' HEAD

# ebd7d90: :memo: new post
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "ebd7d90" ]; then echo "📝 new post"; else cat; fi' HEAD

# 63baed4: :art: this 키워드를 사용하여 조금 더 안전한 코드로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "63baed4" ]; then echo "🎨 this 키워드를 사용하여 조금 더 안전한 코드로 변경"; else cat; fi' HEAD

# 8779604: :coffin: remove import code
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8779604" ]; then echo "⚰️ remove import code"; else cat; fi' HEAD

# 45e6a2f: :recycle: 스태틱 초기화 메서드로 클래스 싱글톤 생성
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "45e6a2f" ]; then echo "♻️ 스태틱 초기화 메서드로 클래스 싱글톤 생성"; else cat; fi' HEAD

# a1bbc44: :construction:
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a1bbc44" ]; then echo "🚧"; else cat; fi' HEAD

# 8ad04d6: :arrow_up:
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8ad04d6" ]; then echo "⬆️"; else cat; fi' HEAD

# 8f462bd: :sparkles: 메타 데이터, 키워드 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8f462bd" ]; then echo "✨ 메타 데이터, 키워드 추가"; else cat; fi' HEAD

# cf6ebfd: :art: 터미널 브라우저 접속한 화면 이미지 교체
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "cf6ebfd" ]; then echo "🎨 터미널 브라우저 접속한 화면 이미지 교체"; else cat; fi' HEAD

# 67bdb64: :art: 캡션 수정 및 이미지 최신으로 교체
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "67bdb64" ]; then echo "🎨 캡션 수정 및 이미지 최신으로 교체"; else cat; fi' HEAD

# e442c86: :art: 터미널 실행 예제 이미지 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e442c86" ]; then echo "🎨 터미널 실행 예제 이미지 추가"; else cat; fi' HEAD

# f495963: :see_no_evil: ignore .obsidian
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f495963" ]; then echo "🙈 ignore .obsidian"; else cat; fi' HEAD

# 91718ce: :art: amp 에서 사용 못하는 코드 주석 처리
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "91718ce" ]; then echo "🎨 amp 에서 사용 못하는 코드 주석 처리"; else cat; fi' HEAD

# 4bd0681: :bug: 스벨트킷 버그 때문에 폰트를 css 에 직접 사용 css를 html문서에 다 포함시키면 import 로 불러온 css의 폰트 경로를 해시화된 경로로 정상적으로 반영 못함
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4bd0681" ]; then echo "🐛 스벨트킷 버그 때문에 폰트를 css 에 직접 사용 css를 html문서에 다 포함시키면 import 로 불러온 css의 폰트 경로를 해시화된 경로로 정상적으로 반영 못함"; else cat; fi' HEAD

# f1e23a1: :lipstick: 폰트 CSS 파일 서브셋을 하나의 폰트로 교체
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f1e23a1" ]; then echo "💄 폰트 CSS 파일 서브셋을 하나의 폰트로 교체"; else cat; fi' HEAD

# 2c7b56a: :arrow_up:
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "2c7b56a" ]; then echo "⬆️"; else cat; fi' HEAD

# 4473e9e: :lipstick: 폰트 로컬 인스톨
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4473e9e" ]; then echo "💄 폰트 로컬 인스톨"; else cat; fi' HEAD

# 270254a: :art: amp 기능 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "270254a" ]; then echo "🎨 amp 기능 추가"; else cat; fi' HEAD

# 9c6c4b3: :art: 코드 블럭의 코드 색상을 완전히 변수만을 참조하도록 변경.
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "9c6c4b3" ]; then echo "🎨 코드 블럭의 코드 색상을 완전히 변수만을 참조하도록 변경."; else cat; fi' HEAD

# 8493775: :art: 브라우저의 모션 감지 설정을 확인하고 뷰 트랜지션 재생
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8493775" ]; then echo "🎨 브라우저의 모션 감지 설정을 확인하고 뷰 트랜지션 재생"; else cat; fi' HEAD

# cf7c3ad: :construction_worker: 브랜치 이름 변경과 함께 브랜치 이름에 해당하는 클라우드 플레어 페이지스에 배포
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "cf7c3ad" ]; then echo "👷 브랜치 이름 변경과 함께 브랜치 이름에 해당하는 클라우드 플레어 페이지스에 배포"; else cat; fi' HEAD

# 2c6fe9e: Revert ":art: 폰트 로드 너무 느려서 일딴 비활성화"
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "2c6fe9e" ]; then echo "Revert \"🎨 폰트 로드 너무 느려서 일딴 비활성화\""; else cat; fi' HEAD

# c3bd957: :art: 폰트 로드 너무 느려서 일딴 비활성화
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c3bd957" ]; then echo "🎨 폰트 로드 너무 느려서 일딴 비활성화"; else cat; fi' HEAD

# 3de7b3a: :arrow_up:
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3de7b3a" ]; then echo "⬆️"; else cat; fi' HEAD

# 8061b9e: :memo: Paraglide JS 적용기
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8061b9e" ]; then echo "📝 Paraglide JS 적용기"; else cat; fi' HEAD

# d959a40: :lipstick: 코드 블럭에 포커스 기능 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "d959a40" ]; then echo "💄 코드 블럭에 포커스 기능 추가"; else cat; fi' HEAD

# f70ef54: :lipstick: 코드 블럭에 diff 기능 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f70ef54" ]; then echo "💄 코드 블럭에 diff 기능 추가"; else cat; fi' HEAD

# dc43904: :truck: 이미지 경로를 전부 /static/resource 로 이동
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "dc43904" ]; then echo "🚚 이미지 경로를 전부 /static/resource 로 이동"; else cat; fi' HEAD

# 4124d94: :arrow_up:
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4124d94" ]; then echo "⬆️"; else cat; fi' HEAD

# d8e9b8d: :lipstick: 세 칸 고정에서 동적 간격으로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "d8e9b8d" ]; then echo "💄 세 칸 고정에서 동적 간격으로 변경"; else cat; fi' HEAD

# c26063c: :art: 언어 변경 의존성을 +layout.server.js에서 +layout.js로 이동
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c26063c" ]; then echo "🎨 언어 변경 의존성을 +layout.server.js에서 +layout.js로 이동"; else cat; fi' HEAD

# 9ec828e: :lipstick: 미디어 쿼리를 기준으로 자식 컬럼 분할
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "9ec828e" ]; then echo "💄 미디어 쿼리를 기준으로 자식 컬럼 분할"; else cat; fi' HEAD

# df608ea: :art: title, description 반응형으로 디자인
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "df608ea" ]; then echo "🎨 title, description 반응형으로 디자인"; else cat; fi' HEAD

# 61b9bde: :memo: 디스크립션 문장에 대응하는 멘트 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "61b9bde" ]; then echo "📝 디스크립션 문장에 대응하는 멘트 추가"; else cat; fi' HEAD

# 0f1f3e1: :recycle: 임포트 문장 종류별로 구분
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0f1f3e1" ]; then echo "♻️ 임포트 문장 종류별로 구분"; else cat; fi' HEAD

# d89f069: :coffin:
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "d89f069" ]; then echo "⚰️"; else cat; fi' HEAD

# c722911: :recycle: snippet 문법으로 깔끔하게 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c722911" ]; then echo "♻️ snippet 문법으로 깔끔하게 변경"; else cat; fi' HEAD

# 928508d: :arrow_up:
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "928508d" ]; then echo "⬆️"; else cat; fi' HEAD

# 0fa916c: :fire: 사용하지 않는 컴포넌트 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0fa916c" ]; then echo "🔥 사용하지 않는 컴포넌트 삭제"; else cat; fi' HEAD

# d44ad3e: :lipstick: 폰트 적용 순서를 한국어 부터 적용
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "d44ad3e" ]; then echo "💄 폰트 적용 순서를 한국어 부터 적용"; else cat; fi' HEAD

# cdfe61b: :lipstick: 마진 인라인만 리셋하고 블록은 유지, 요소는 블럭으로 한줄을 차지하지만, 요소의 크기는 fit-content
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "cdfe61b" ]; then echo "💄 마진 인라인만 리셋하고 블록은 유지, 요소는 블럭으로 한줄을 차지하지만, 요소의 크기는 fit-content"; else cat; fi' HEAD

# 78276e4: :art: 언어 변경시 내비게이션이 초기화 되는 문제를 해결했지만 실질적으로 해킹에 가까운 기법이라 다시 돌려놓음.
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "78276e4" ]; then echo "🎨 언어 변경시 내비게이션이 초기화 되는 문제를 해결했지만 실질적으로 해킹에 가까운 기법이라 다시 돌려놓음."; else cat; fi' HEAD

# 62b4514: :lipstick: 메뉴 갯수가 길어질 경우 스크롤이 생성되도록 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "62b4514" ]; then echo "💄 메뉴 갯수가 길어질 경우 스크롤이 생성되도록 추가"; else cat; fi' HEAD

# 8f9e9c0: :art: 필수 값, 기본 값, 옵셔널 순으로 필드 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8f9e9c0" ]; then echo "🎨 필수 값, 기본 값, 옵셔널 순으로 필드 변경"; else cat; fi' HEAD

# b82a153: :art: 리터럴을 전부 스크립트 영역으로 이동
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b82a153" ]; then echo "🎨 리터럴을 전부 스크립트 영역으로 이동"; else cat; fi' HEAD

# 4287fc4: :art: run format
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4287fc4" ]; then echo "🎨 run format"; else cat; fi' HEAD

# f316cbb: :fire: Posts.svelte 에서 긴 li가 나올경우 컨테이너가 커져서 비율이 달라지기 때문에 텍스트를 랩 제한하는 스타일 제거,
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f316cbb" ]; then echo "🔥 Posts.svelte 에서 긴 li가 나올경우 컨테이너가 커져서 비율이 달라지기 때문에 텍스트를 랩 제한하는 스타일 제거,"; else cat; fi' HEAD

# 878dfba: :art: 이미지 비율 추가 이미지를 내려받기전에 레이아웃 쉬프트 현상 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "878dfba" ]; then echo "🎨 이미지 비율 추가 이미지를 내려받기전에 레이아웃 쉬프트 현상 제거"; else cat; fi' HEAD

# 1534e1e: :mag: 디스크립션을 동적으로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "1534e1e" ]; then echo "🔍️ 디스크립션을 동적으로 변경"; else cat; fi' HEAD

# f1c8a2c: :globe_with_meridians: 디스크립션 국제화 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f1c8a2c" ]; then echo "🌐 디스크립션 국제화 추가"; else cat; fi' HEAD

# 3646357: :globe_with_meridians: 타이틀 국제화
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3646357" ]; then echo "🌐 타이틀 국제화"; else cat; fi' HEAD

# 1c6176b: :wrench: 클라우드플레어 페이지스 배포 프로젝트 명 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "1c6176b" ]; then echo "🔧 클라우드플레어 페이지스 배포 프로젝트 명 변경"; else cat; fi' HEAD

# 7fe839e: :art: 캐노니컬 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7fe839e" ]; then echo "🎨 캐노니컬 추가"; else cat; fi' HEAD

# 9ad02ed: :wrench: cloudflare pages 프로젝트명 블로그로 변경 하이픈 적용 못함
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "9ad02ed" ]; then echo "🔧 cloudflare pages 프로젝트명 블로그로 변경 하이픈 적용 못함"; else cat; fi' HEAD

# f03f2c6: :wrench: cloudflare pages 랭귤러에 커맨드 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f03f2c6" ]; then echo "🔧 cloudflare pages 랭귤러에 커맨드 추가"; else cat; fi' HEAD

# 5f3fea6: :wrench: cloudflare pages 워킹 디렉토리 변경, (오류 있어서)
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "5f3fea6" ]; then echo "🔧 cloudflare pages 워킹 디렉토리 변경, (오류 있어서)"; else cat; fi' HEAD

# 084db59: :wrench: cloudflare pages 에 배포 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "084db59" ]; then echo "🔧 cloudflare pages 에 배포 변경"; else cat; fi' HEAD

# 7648d9f: :lipstick: 언어 변경시에도 내비게이션이 사라지지 않도록 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7648d9f" ]; then echo "💄 언어 변경시에도 내비게이션이 사라지지 않도록 변경"; else cat; fi' HEAD

# 9d238b6: :art: 리소스 경로를 규격에 맞게 통일
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "9d238b6" ]; then echo "🎨 리소스 경로를 규격에 맞게 통일"; else cat; fi' HEAD

# 74cbada: :fire: 사용하지 않는 파일
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "74cbada" ]; then echo "🔥 사용하지 않는 파일"; else cat; fi' HEAD

# 99937f7: :lipstick: img 레이아웃 쉬프트 막기 위해 이미지 크기 설정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "99937f7" ]; then echo "💄 img 레이아웃 쉬프트 막기 위해 이미지 크기 설정"; else cat; fi' HEAD

# 24bc2f9: :lipstick: Pretendard Variable 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "24bc2f9" ]; then echo "💄 Pretendard Variable 추가"; else cat; fi' HEAD

# b0310d2: :lipstick: 폰트 프린텐다드 다이내믹 서브셋 에서 가변 다이내믹 서브셋으로 교체
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b0310d2" ]; then echo "💄 폰트 프린텐다드 다이내믹 서브셋 에서 가변 다이내믹 서브셋으로 교체"; else cat; fi' HEAD

# f6c1624: :art: article 대신 post 사용
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f6c1624" ]; then echo "🎨 article 대신 post 사용"; else cat; fi' HEAD

# 972be73: :lipstick: 하위 카테고리가 없을 경우 카테고리 영역이 사라지지 않고 명시적으로 카테고리가 없다고 보여주기, 태블릿 해상도 이상부터는 카테고리와 포스츠 영역을 좌우로 분할하여 보여줌 미만에서는 수직 으로
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "972be73" ]; then echo "💄 하위 카테고리가 없을 경우 카테고리 영역이 사라지지 않고 명시적으로 카테고리가 없다고 보여주기, 태블릿 해상도 이상부터는 카테고리와 포스츠 영역을 좌우로 분할하여 보여줌 미만에서는 수직 으로"; else cat; fi' HEAD

# e987b33: :lipstick: CSS, 마진 공통 클래스 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e987b33" ]; then echo "💄 CSS, 마진 공통 클래스 추가"; else cat; fi' HEAD

# 782c0c2: :lipstick: 고정 폭 100%에서 맥스 폭 100% 로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "782c0c2" ]; then echo "💄 고정 폭 100%에서 맥스 폭 100% 로 변경"; else cat; fi' HEAD

# a856a4d: :lipstick: 라인 하이트 하나로 통일
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a856a4d" ]; then echo "💄 라인 하이트 하나로 통일"; else cat; fi' HEAD

# 8664386: :art: 사용하지 않는 타입 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8664386" ]; then echo "🎨 사용하지 않는 타입 삭제"; else cat; fi' HEAD

# 31ebbbf: :lipstick: 내비게이션 버튼 배경색 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "31ebbbf" ]; then echo "💄 내비게이션 버튼 배경색 제거"; else cat; fi' HEAD

# 37b10be: :lipstick: 요소간 마진 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "37b10be" ]; then echo "💄 요소간 마진 추가"; else cat; fi' HEAD

# 0009943: :lipstick: 피규어 태그 인라인 사이즈 100% 로 제한하여 부모를 벗어나지 않도록 변경 프리 태그의 블록 마진 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0009943" ]; then echo "💄 피규어 태그 인라인 사이즈 100% 로 제한하여 부모를 벗어나지 않도록 변경 프리 태그의 블록 마진 제거"; else cat; fi' HEAD

# 4a01986: :lipstick: 일본어 프리텐다드 적용
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4a01986" ]; then echo "💄 일본어 프리텐다드 적용"; else cat; fi' HEAD

# c4fbd79: :lipstick: li 라인 하이트 조정, code 블럭은 전부 neo둥근모 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c4fbd79" ]; then echo "💄 li 라인 하이트 조정, code 블럭은 전부 neo둥근모 변경"; else cat; fi' HEAD

# 7ef79be: :pencil2: 글 강조 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7ef79be" ]; then echo "✏️ 글 강조 변경"; else cat; fi' HEAD

# 636d007: :art: 로케일 코드 제거하고, 번역된 파일을 기존 처럼 /static/{locale} 구조로 저장
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "636d007" ]; then echo "🎨 로케일 코드 제거하고, 번역된 파일을 기존 처럼 /static/{locale} 구조로 저장"; else cat; fi' HEAD

# 788c682: :globe_with_meridians: 번역 상태 추적기 설치
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "788c682" ]; then echo "🌐 번역 상태 추적기 설치"; else cat; fi' HEAD

# 38b0217: :globe_with_meridians: 설정 조금 더 간단하게
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "38b0217" ]; then echo "🌐 설정 조금 더 간단하게"; else cat; fi' HEAD

# fece8a7: :pencil2: 콤마 위치 이동
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "fece8a7" ]; then echo "✏️ 콤마 위치 이동"; else cat; fi' HEAD

# 679a2b6: :globe_with_meridians: 일본어 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "679a2b6" ]; then echo "🌐 일본어 추가"; else cat; fi' HEAD

# c051658: :globe_with_meridians: 국제화 보완
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c051658" ]; then echo "🌐 국제화 보완"; else cat; fi' HEAD

# 41c8081: :globe_with_meridians: 국제화 보완
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "41c8081" ]; then echo "🌐 국제화 보완"; else cat; fi' HEAD

# 4174ead: :lipstick: 푸터 조금 더 재미있게...
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4174ead" ]; then echo "💄 푸터 조금 더 재미있게..."; else cat; fi' HEAD

# 9353fb3: :art: 깃 로그 추가 및 시간 표시를 언어에 맞게 출력하도록 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "9353fb3" ]; then echo "🎨 깃 로그 추가 및 시간 표시를 언어에 맞게 출력하도록 변경"; else cat; fi' HEAD

# a4c1ad3: :lipstick: 찐 프리텐다드 적용... 여테 적용이 안되고있었다니;🥲
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a4c1ad3" ]; then echo "💄 찐 프리텐다드 적용... 여테 적용이 안되고있었다니;🥲"; else cat; fi' HEAD

# 6da915e: :globe_with_meridians: 마크다운 번역 스크립트 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6da915e" ]; then echo "🌐 마크다운 번역 스크립트 추가"; else cat; fi' HEAD

# 346cb64: :globe_with_meridians: 기존 국제화 방식을 제거하고 새로운 방식으로 번역본 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "346cb64" ]; then echo "🌐 기존 국제화 방식을 제거하고 새로운 방식으로 번역본 추가"; else cat; fi' HEAD

# c92b7b5: :globe_with_meridians: 국제화 코드를 언어가 아닌 로케이션 코드로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c92b7b5" ]; then echo "🌐 국제화 코드를 언어가 아닌 로케이션 코드로 변경"; else cat; fi' HEAD

# eb3e8fe: :wrench: @lobehub/i18n-cli 자동 번역 기능 설정 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "eb3e8fe" ]; then echo "🔧 @lobehub/i18n-cli 자동 번역 기능 설정 추가"; else cat; fi' HEAD

# 35223d4: :arrow_up: @shikijs/rehype, @sveltejs/kit
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "35223d4" ]; then echo "⬆️ @shikijs/rehype, @sveltejs/kit"; else cat; fi' HEAD

# eeb94ab: :globe_with_meridians: translate
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "eeb94ab" ]; then echo "🌐 translate"; else cat; fi' HEAD

# 9250e31: :art: run format
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "9250e31" ]; then echo "🎨 run format"; else cat; fi' HEAD

# 55fd1d9: :arrow_up: @shikijs/rehype, svelte
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "55fd1d9" ]; then echo "⬆️ @shikijs/rehype, svelte"; else cat; fi' HEAD

# e502525: :art: 외부에서는 아무것도 신경써도 되지 않게, URL에 따라서 내부에서 국제화 처리
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e502525" ]; then echo "🎨 외부에서는 아무것도 신경써도 되지 않게, URL에 따라서 내부에서 국제화 처리"; else cat; fi' HEAD

# 4f6da49: :bulb: 순서 정리
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4f6da49" ]; then echo "💡 순서 정리"; else cat; fi' HEAD

# 765d464: :bulb: 순서 정리
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "765d464" ]; then echo "💡 순서 정리"; else cat; fi' HEAD

# af92aa7: :bulb: 잘못된 코멘트 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "af92aa7" ]; then echo "💡 잘못된 코멘트 삭제"; else cat; fi' HEAD

# 7ebe535: :art: 타이틀 설정 방식 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7ebe535" ]; then echo "🎨 타이틀 설정 방식 변경"; else cat; fi' HEAD

# c786033: :bug: 콤마 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c786033" ]; then echo "🐛 콤마 제거"; else cat; fi' HEAD

# b3fdec3: :globe_with_meridians: 국제화 언어 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b3fdec3" ]; then echo "🌐 국제화 언어 추가"; else cat; fi' HEAD

# 5c92c1e: :globe_with_meridians: 국제화 문장으로 출력되게 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "5c92c1e" ]; then echo "🌐 국제화 문장으로 출력되게 변경"; else cat; fi' HEAD

# 995b22e: :globe_with_meridians: 번역
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "995b22e" ]; then echo "🌐 번역"; else cat; fi' HEAD

# 75207a7: :sparkles: 언어 변환 버튼 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "75207a7" ]; then echo "✨ 언어 변환 버튼 추가"; else cat; fi' HEAD

# 42c9d5b: :globe_with_meridians: about.md
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "42c9d5b" ]; then echo "🌐 about.md"; else cat; fi' HEAD

# beaaf17: :art: 국제화 형식으로 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "beaaf17" ]; then echo "🎨 국제화 형식으로 추가"; else cat; fi' HEAD

# aca5905: :heavy_plus_sign: paraglide
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "aca5905" ]; then echo "➕ paraglide"; else cat; fi' HEAD

# cbb8b79: :heavy_plus_sign: paraglide
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "cbb8b79" ]; then echo "➕ paraglide"; else cat; fi' HEAD

# 7fa354b: :arrow_up: @shikijs/rehype
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7fa354b" ]; then echo "⬆️ @shikijs/rehype"; else cat; fi' HEAD

# 6d645e1: :heavy_plus_sign: paraglide
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6d645e1" ]; then echo "➕ paraglide"; else cat; fi' HEAD

# 7a4d7f6: :memo: 멘트 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7a4d7f6" ]; then echo "📝 멘트 추가"; else cat; fi' HEAD

# 465aa70: :arrow_up: Update npm dependencies to latest versions
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "465aa70" ]; then echo "⬆️ Update npm dependencies to latest versions"; else cat; fi' HEAD

# fd40c95: :lipstick: 여백이 생기지 않도록 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "fd40c95" ]; then echo "💄 여백이 생기지 않도록 변경"; else cat; fi' HEAD

# 78306b7: :art: gitLog를 vite 플러그인으로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "78306b7" ]; then echo "🎨 gitLog를 vite 플러그인으로 변경"; else cat; fi' HEAD

# f8e69cc: :memo: 내용 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f8e69cc" ]; then echo "📝 내용 삭제"; else cat; fi' HEAD

# dd1fdec: :memo: lg gram 에 드라이버 설치하기
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "dd1fdec" ]; then echo "📝 lg gram 에 드라이버 설치하기"; else cat; fi' HEAD

# 23f05fc: :sparkles: 카카오톡 인앱 브라우저 탈출 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "23f05fc" ]; then echo "✨ 카카오톡 인앱 브라우저 탈출 수정"; else cat; fi' HEAD

# f2cdbc7: :sparkles: 카카오 인앱 브라우저 탈출
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f2cdbc7" ]; then echo "✨ 카카오 인앱 브라우저 탈출"; else cat; fi' HEAD

# 191c07a: :bug: 테스트로 하드 코딩된 OG url 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "191c07a" ]; then echo "🐛 테스트로 하드 코딩된 OG url 수정"; else cat; fi' HEAD

# 1d71d37: :bug: 필드 참조 실패 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "1d71d37" ]; then echo "🐛 필드 참조 실패 수정"; else cat; fi' HEAD

# b4c564e: :sparkles: meta 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b4c564e" ]; then echo "✨ meta 추가"; else cat; fi' HEAD

# 1cf265d: :art: run format
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "1cf265d" ]; then echo "🎨 run format"; else cat; fi' HEAD

# 2c47a32: :arrow_up: eslint, remark-figure-caption, svelte
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "2c47a32" ]; then echo "⬆️ eslint, remark-figure-caption, svelte"; else cat; fi' HEAD

# f3c4860: :lipstick: add shiki light dark theme
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f3c4860" ]; then echo "💄 add shiki light dark theme"; else cat; fi' HEAD

# 59f4af4: :art: 플러그인을 제거하고 서버 컴포넌트에서 불러옴
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "59f4af4" ]; then echo "🎨 플러그인을 제거하고 서버 컴포넌트에서 불러옴"; else cat; fi' HEAD

# 5d9875d: :art: popover가 정의되는 top-layer 가 있기 때문에 position: fixed는 필요 없고 위치값만 잘 정의하면 된다.
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "5d9875d" ]; then echo "🎨 popover가 정의되는 top-layer 가 있기 때문에 position: fixed는 필요 없고 위치값만 잘 정의하면 된다."; else cat; fi' HEAD

# 0677f9e: :lipstick: 헤더 텍스트가 중앙 비율이 못 생겨서 스크롤을 위한 마진 블록 엔드 제거하고, 스크롤 바도 오토로 필요할 경우에만 나오도록 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0677f9e" ]; then echo "💄 헤더 텍스트가 중앙 비율이 못 생겨서 스크롤을 위한 마진 블록 엔드 제거하고, 스크롤 바도 오토로 필요할 경우에만 나오도록 변경"; else cat; fi' HEAD

# 7c49368: :art: 화면 넓이에 다른 레이아웃 변경을 +layout.svelte 에서 하도록 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7c49368" ]; then echo "🎨 화면 넓이에 다른 레이아웃 변경을 +layout.svelte 에서 하도록 변경"; else cat; fi' HEAD

# a851950: :fire: 라이브러리 도입으로 인한 사용하지 않는 내부 립 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a851950" ]; then echo "🔥 라이브러리 도입으로 인한 사용하지 않는 내부 립 제거"; else cat; fi' HEAD

# b3657aa: :heavy_plus_sign: 기존에 있던 remark-figure-caption 코드를 라이브러리화 하고, 디펜던시 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b3657aa" ]; then echo "➕ 기존에 있던 remark-figure-caption 코드를 라이브러리화 하고, 디펜던시 추가"; else cat; fi' HEAD

# f75be35: :lipstick: 바디의 최소 크기를 lvh로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f75be35" ]; then echo "💄 바디의 최소 크기를 lvh로 변경"; else cat; fi' HEAD

# 90d23b1: :lipstick: 프라이머리 서브 컬러 단색으로 변경 톤을 낮춘것만 사용 및 배경색을 프라이머리 서브 컬러로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "90d23b1" ]; then echo "💄 프라이머리 서브 컬러 단색으로 변경 톤을 낮춘것만 사용 및 배경색을 프라이머리 서브 컬러로 변경"; else cat; fi' HEAD

# 8610319: :art: 다른곳에서 body 마진을 조절하기 때문에 초기값 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8610319" ]; then echo "🎨 다른곳에서 body 마진을 조절하기 때문에 초기값 제거"; else cat; fi' HEAD

# ce6e543: :lipstick: 폰트 사이즈 정수로 나오도록 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "ce6e543" ]; then echo "💄 폰트 사이즈 정수로 나오도록 변경"; else cat; fi' HEAD

# 27b9232: :heavy_minus_sign: vite-plugin-minify
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "27b9232" ]; then echo "➖ vite-plugin-minify"; else cat; fi' HEAD

# 6fa864b: :arrow_up: @sveltejs/vite-plugin-svelte", svelte, svelte-check
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6fa864b" ]; then echo "⬆️ @sveltejs/vite-plugin-svelte\", svelte, svelte-check"; else cat; fi' HEAD

# 1006f3f: :lipstick: 보더 컴포넌트의 스타일링을 최소화 하고 필요한 스타일은 각자가 하도록 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "1006f3f" ]; then echo "💄 보더 컴포넌트의 스타일링을 최소화 하고 필요한 스타일은 각자가 하도록 변경"; else cat; fi' HEAD

# f42d12e: :fire: 사용하지 않는 속성 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f42d12e" ]; then echo "🔥 사용하지 않는 속성 삭제"; else cat; fi' HEAD

# 6b75b7c: :art: 보더 태그를 아우터에서 하도록 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6b75b7c" ]; then echo "🎨 보더 태그를 아우터에서 하도록 변경"; else cat; fi' HEAD

# 9194286: :lipstick: 헤더의 고정폭을 제거하면서 발생한 내비게이션 버튼 이격 문제 해결
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "9194286" ]; then echo "💄 헤더의 고정폭을 제거하면서 발생한 내비게이션 버튼 이격 문제 해결"; else cat; fi' HEAD

# 8092da9: :lipstick: 코드 텍스트의 보더를 좀 더 작게 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8092da9" ]; then echo "💄 코드 텍스트의 보더를 좀 더 작게 변경"; else cat; fi' HEAD

# 32f2415: :art: 주석 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "32f2415" ]; then echo "🎨 주석 추가"; else cat; fi' HEAD

# b4f911a: :art: 아이디 추가 및 주석 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b4f911a" ]; then echo "🎨 아이디 추가 및 주석 추가"; else cat; fi' HEAD

# a17ae98: :lipstick: 메인의 패러그래프만 라인하이트 적용
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a17ae98" ]; then echo "💄 메인의 패러그래프만 라인하이트 적용"; else cat; fi' HEAD

# 80b4957: :lipstick: 하프 사이즈 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "80b4957" ]; then echo "💄 하프 사이즈 제거"; else cat; fi' HEAD

# bf992c5: :lipstick: 내비게이션 노출 해상도 데스크톱 이상에서만
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "bf992c5" ]; then echo "💄 내비게이션 노출 해상도 데스크톱 이상에서만"; else cat; fi' HEAD

# 6aa3a95: :wheelchair: og:title 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6aa3a95" ]; then echo "♿️ og:title 추가"; else cat; fi' HEAD

# 65aeba2: :lipstick: 라인하이트를 본문만 주기 위해 레이아웃 변경 및 라이하이트 1.5rem 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "65aeba2" ]; then echo "💄 라인하이트를 본문만 주기 위해 레이아웃 변경 및 라이하이트 1.5rem 추가"; else cat; fi' HEAD

# f8cace4: :lipstick: 인라인으로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f8cace4" ]; then echo "💄 인라인으로 변경"; else cat; fi' HEAD

# 5c005f6: :lipstick: 내비게이션 토글 버튼 쪼그라 드는 문제 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "5c005f6" ]; then echo "💄 내비게이션 토글 버튼 쪼그라 드는 문제 수정"; else cat; fi' HEAD

# 0e0a538: :art: 절반값 패딩 변수 추가, 라인 하이트 속성 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0e0a538" ]; then echo "🎨 절반값 패딩 변수 추가, 라인 하이트 속성 삭제"; else cat; fi' HEAD

# 0f890fc: :lipstick: 고정 블록 사이즈 제거하고, 패딩 값으로 조절
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0f890fc" ]; then echo "💄 고정 블록 사이즈 제거하고, 패딩 값으로 조절"; else cat; fi' HEAD

# 4a14c7e: :art: 콜아웃 형태로 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4a14c7e" ]; then echo "🎨 콜아웃 형태로 수정"; else cat; fi' HEAD

# 2ae3a49: :pencil2: 오타 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "2ae3a49" ]; then echo "✏️ 오타 수정"; else cat; fi' HEAD

# 4af1931: :lipstick: 라인 하이트 좀 더 시원하게 보이도록 넓힘
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4af1931" ]; then echo "💄 라인 하이트 좀 더 시원하게 보이도록 넓힘"; else cat; fi' HEAD

# 0f639ac: :lipstick: 글 내려쓰기가 좀 더 예쁘게 되도록 워드 브레이크 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0f639ac" ]; then echo "💄 글 내려쓰기가 좀 더 예쁘게 되도록 워드 브레이크 추가"; else cat; fi' HEAD

# 405ba14: :fire: 테스트용 코드 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "405ba14" ]; then echo "🔥 테스트용 코드 삭제"; else cat; fi' HEAD

# ba6c53e: :art: run format
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "ba6c53e" ]; then echo "🎨 run format"; else cat; fi' HEAD

# c38512e: :lipstick: 피규어 내부 스타일 조금 더 보완
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c38512e" ]; then echo "💄 피규어 내부 스타일 조금 더 보완"; else cat; fi' HEAD

# c5137d6: :lipstick: 단일 코드 블럭 배경 지정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c5137d6" ]; then echo "💄 단일 코드 블럭 배경 지정"; else cat; fi' HEAD

# a59a8ae: :art: 깃로그 메서드 따로 동작하도록 분리
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a59a8ae" ]; then echo "🎨 깃로그 메서드 따로 동작하도록 분리"; else cat; fi' HEAD

# 5853454: :art: 리턴 타입 올바르게 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "5853454" ]; then echo "🎨 리턴 타입 올바르게 변경"; else cat; fi' HEAD

# 21adb84: :wrench: 프리티어가 _drafts 디렉토리는 실행 안하도록 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "21adb84" ]; then echo "🔧 프리티어가 _drafts 디렉토리는 실행 안하도록 추가"; else cat; fi' HEAD

# 3c40719: :fire: 바텀 패딩을 넣어두면 단독 라인 코드가 나올때 밑에가 붕떠 보여서 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3c40719" ]; then echo "🔥 바텀 패딩을 넣어두면 단독 라인 코드가 나올때 밑에가 붕떠 보여서 제거"; else cat; fi' HEAD

# 4d680a1: :zap: remarkFigureCaption.js 플러그인으로 figure 태그 적용
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4d680a1" ]; then echo "⚡️ remarkFigureCaption.js 플러그인으로 figure 태그 적용"; else cat; fi' HEAD

# c52ec01: :art: run format
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c52ec01" ]; then echo "🎨 run format"; else cat; fi' HEAD

# 22402bc: :lipstick: 둥근모 폰트 임포트 구문 위치 변경 및 kbd 태그 스타일링
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "22402bc" ]; then echo "💄 둥근모 폰트 임포트 구문 위치 변경 및 kbd 태그 스타일링"; else cat; fi' HEAD

# c116873: :lipstick: rehype-figure-caption 플러그인 생성 및 적용
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c116873" ]; then echo "💄 rehype-figure-caption 플러그인 생성 및 적용"; else cat; fi' HEAD

# d348c36: :memo: 제목 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "d348c36" ]; then echo "📝 제목 변경"; else cat; fi' HEAD

# e6d19bc: :art: 룬 문법 활성화
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e6d19bc" ]; then echo "🎨 룬 문법 활성화"; else cat; fi' HEAD

# 9752c2e: :memo: 제너레이터 포스팅
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "9752c2e" ]; then echo "📝 제너레이터 포스팅"; else cat; fi' HEAD

# 4e35ac8: :art: root 캡슐화에 의해서 추출 방식 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4e35ac8" ]; then echo "🎨 root 캡슐화에 의해서 추출 방식 변경"; else cat; fi' HEAD

# c49d95b: :poop:
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c49d95b" ]; then echo "💩"; else cat; fi' HEAD

# 24abe14: :test_tube: 테스트 케이스
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "24abe14" ]; then echo "🧪 테스트 케이스"; else cat; fi' HEAD

# 386510f: :art: 참고하는 곳이 있어서 다시 복구
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "386510f" ]; then echo "🎨 참고하는 곳이 있어서 다시 복구"; else cat; fi' HEAD

# a6be26d: :art: 차기 버전에서 룬 다시 제거됨
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a6be26d" ]; then echo "🎨 차기 버전에서 룬 다시 제거됨"; else cat; fi' HEAD

# c5821c2: :fire: 잘못된 캐시 방식 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c5821c2" ]; then echo "🔥 잘못된 캐시 방식 제거"; else cat; fi' HEAD

# 4acb2ab: :art: 코드 옵티마이즈
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4acb2ab" ]; then echo "🎨 코드 옵티마이즈"; else cat; fi' HEAD

# 7a6ec33: :art: 코드 옵티마이즈
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7a6ec33" ]; then echo "🎨 코드 옵티마이즈"; else cat; fi' HEAD

# 2ecf649: :art: 잘못 커밋된 주석 처리 복구
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "2ecf649" ]; then echo "🎨 잘못 커밋된 주석 처리 복구"; else cat; fi' HEAD

# 2f9624e: :fire: 루트 카테고리 필드 제거, 사용할 곳이 없고, getCategory를 이용해 루트 찾기 가능
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "2f9624e" ]; then echo "🔥 루트 카테고리 필드 제거, 사용할 곳이 없고, getCategory를 이용해 루트 찾기 가능"; else cat; fi' HEAD

# 421b114: :art: 사용하지는 않지만 문맥상 넣어주는게 바람직한 메서드 활성화
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "421b114" ]; then echo "🎨 사용하지는 않지만 문맥상 넣어주는게 바람직한 메서드 활성화"; else cat; fi' HEAD

# 61324b3: :fire: 잘못 설계된 메서드 삭제 prentCategories
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "61324b3" ]; then echo "🔥 잘못 설계된 메서드 삭제 prentCategories"; else cat; fi' HEAD

# 4f0d239: :art: Post.js 내부 정리 받는 인자를 좀 더 명확하게 promise 키워드 사용
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4f0d239" ]; then echo "🎨 Post.js 내부 정리 받는 인자를 좀 더 명확하게 promise 키워드 사용"; else cat; fi' HEAD

# bef2331: :art: 보일러 플레이트 코드추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "bef2331" ]; then echo "🎨 보일러 플레이트 코드추가"; else cat; fi' HEAD

# 8609792: Revert ":art: shiki는 스타일을 인라인으로 만들어서 맘에 안들어서 highlightjs로 변경"
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8609792" ]; then echo "Revert \"🎨 shiki는 스타일을 인라인으로 만들어서 맘에 안들어서 highlightjs로 변경\""; else cat; fi' HEAD

# f75ffc2: :art: shiki는 스타일을 인라인으로 만들어서 맘에 안들어서 highlightjs로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f75ffc2" ]; then echo "🎨 shiki는 스타일을 인라인으로 만들어서 맘에 안들어서 highlightjs로 변경"; else cat; fi' HEAD

# 0c4cbd1: :art: 루트 카테고리 필드 이름 root 로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0c4cbd1" ]; then echo "🎨 루트 카테고리 필드 이름 root 로 변경"; else cat; fi' HEAD

# 7681f18: :memo: 제목 조금 더 구체적으로 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7681f18" ]; then echo "📝 제목 조금 더 구체적으로 수정"; else cat; fi' HEAD

# 36d404e: :fire: 주석 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "36d404e" ]; then echo "🔥 주석 제거"; else cat; fi' HEAD

# 8fa18f6: :art: 다이어트, 컴포넌트 자체가 텍스트 트랜스폼 책임지는 걸로
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8fa18f6" ]; then echo "🎨 다이어트, 컴포넌트 자체가 텍스트 트랜스폼 책임지는 걸로"; else cat; fi' HEAD

# b2b3985: :art: 대문 멘트 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b2b3985" ]; then echo "🎨 대문 멘트 변경"; else cat; fi' HEAD

# e0e7674: :arrow_down: pretendard
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e0e7674" ]; then echo "⬇️ pretendard"; else cat; fi' HEAD

# 08b104e: :arrow_up: vite
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "08b104e" ]; then echo "⬆️ vite"; else cat; fi' HEAD

# c0b2014: :art: 코드 타입 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c0b2014" ]; then echo "🎨 코드 타입 변경"; else cat; fi' HEAD

# 028075f: :lipstick: 코드용 폰트 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "028075f" ]; then echo "💄 코드용 폰트 추가"; else cat; fi' HEAD

# 6afb180: :memo: new-rune-svelte@5.0.0-next.299.md
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6afb180" ]; then echo "📝 new-rune-svelte@5.0.0-next.299.md"; else cat; fi' HEAD

# 7b9d895: :pencil2: 오타 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7b9d895" ]; then echo "✏️ 오타 수정"; else cat; fi' HEAD

# a220dea: :art: 옵시디언 자동 설정 변경 반영
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a220dea" ]; then echo "🎨 옵시디언 자동 설정 변경 반영"; else cat; fi' HEAD

# 9ad6525: :art: run format
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "9ad6525" ]; then echo "🎨 run format"; else cat; fi' HEAD

# a7af5e8: :lipstick: 라인 하이트 좀 더 넓게 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a7af5e8" ]; then echo "💄 라인 하이트 좀 더 넓게 변경"; else cat; fi' HEAD

# 652e7e7: :art: 변수명 변경 result => file
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "652e7e7" ]; then echo "🎨 변수명 변경 result => file"; else cat; fi' HEAD

# 0b0d343: :lipstick: 개발 단계에서 레이아웃 쉬프트도 있고, github pages는 10분 캐시라서 매번 레이아웃 쉬프트 발생해서 cdn으로 폰트 제공
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0b0d343" ]; then echo "💄 개발 단계에서 레이아웃 쉬프트도 있고, github pages는 10분 캐시라서 매번 레이아웃 쉬프트 발생해서 cdn으로 폰트 제공"; else cat; fi' HEAD

# 177ae8c: :art: 마크다운에서 발생하는 html도 파싱하도록 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "177ae8c" ]; then echo "🎨 마크다운에서 발생하는 html도 파싱하도록 변경"; else cat; fi' HEAD

# 402b173: :bug: 빈 데이터를 내보내지도 않는 연산자 문제 및 커밋이 하나도 없는 테스트용 파일일때 오늘 날짜를 리턴하도록 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "402b173" ]; then echo "🐛 빈 데이터를 내보내지도 않는 연산자 문제 및 커밋이 하나도 없는 테스트용 파일일때 오늘 날짜를 리턴하도록 변경"; else cat; fi' HEAD

# 200e87f: :art: 버전 정보 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "200e87f" ]; then echo "🎨 버전 정보 추가"; else cat; fi' HEAD

# 9f8a866: :fire: rehype-mermaid
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "9f8a866" ]; then echo "🔥 rehype-mermaid"; else cat; fi' HEAD

# d5c51a7: :art: NavButton.svelte 으로 내비게이션 호출 버튼을 컴포넌트화
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "d5c51a7" ]; then echo "🎨 NavButton.svelte 으로 내비게이션 호출 버튼을 컴포넌트화"; else cat; fi' HEAD

# 714c824: :art: 코드 다이어트!
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "714c824" ]; then echo "🎨 코드 다이어트!"; else cat; fi' HEAD

# b5d2c8c: :fire: 사용하지 않는 css 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b5d2c8c" ]; then echo "🔥 사용하지 않는 css 삭제"; else cat; fi' HEAD

# 7445e0c: :truck: BorderSubTitle.svelte -> BorderHeader.svelte 변경 및 일부 화면에서 의미없이 사용하는것 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7445e0c" ]; then echo "🚚 BorderSubTitle.svelte -> BorderHeader.svelte 변경 및 일부 화면에서 의미없이 사용하는것 삭제"; else cat; fi' HEAD

# 0ef50ed: :art: 미디어 쿼리 부등호로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0ef50ed" ]; then echo "🎨 미디어 쿼리 부등호로 변경"; else cat; fi' HEAD

# 8bc4ede: :lipstick: 레이아웃 쉬프트 해결
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8bc4ede" ]; then echo "💄 레이아웃 쉬프트 해결"; else cat; fi' HEAD

# 0b1afc0: :bug: 데스크톱 버전에서는 내비게이션 버전이 안 나와야함
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0b1afc0" ]; then echo "🐛 데스크톱 버전에서는 내비게이션 버전이 안 나와야함"; else cat; fi' HEAD

# 545d56e: :art: run format
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "545d56e" ]; then echo "🎨 run format"; else cat; fi' HEAD

# 05848bb: :bug: 잘못된 속성명 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "05848bb" ]; then echo "🐛 잘못된 속성명 변경"; else cat; fi' HEAD

# 02ebe68: :arrow_up: sveltekit
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "02ebe68" ]; then echo "⬆️ sveltekit"; else cat; fi' HEAD

# 5002b31: :art: posts, post 에서 각 요소에 블록 마진 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "5002b31" ]; then echo "🎨 posts, post 에서 각 요소에 블록 마진 추가"; else cat; fi' HEAD

# bc8f6a9: :art: NO-CSS 환경을 위한 개선, 내비게이션 토글 에서 사용한 SVG를 제거, 디폴트 마진 변수 이름 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "bc8f6a9" ]; then echo "🎨 NO-CSS 환경을 위한 개선, 내비게이션 토글 에서 사용한 SVG를 제거, 디폴트 마진 변수 이름 변경"; else cat; fi' HEAD

# 4afab00: :art: Border.svelte 디폴트 마진 삭제 -> 외부에서 사용하기
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4afab00" ]; then echo "🎨 Border.svelte 디폴트 마진 삭제 -> 외부에서 사용하기"; else cat; fi' HEAD

# 431631b: :package: optimize
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "431631b" ]; then echo "📦️ optimize"; else cat; fi' HEAD

# 481857f: :pencil2: rehypteMermaid -> rehypeMermaid
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "481857f" ]; then echo "✏️ rehypteMermaid -> rehypeMermaid"; else cat; fi' HEAD

# ccc0f97: :fire: threejs
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "ccc0f97" ]; then echo "🔥 threejs"; else cat; fi' HEAD

# b771133: :arrow_up: @shikijs/rehype
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b771133" ]; then echo "⬆️ @shikijs/rehype"; else cat; fi' HEAD

# 14c0443: :art: 비허용 디렉토리 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "14c0443" ]; then echo "🎨 비허용 디렉토리 제거"; else cat; fi' HEAD

# 7dca4e7: :art: run format
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7dca4e7" ]; then echo "🎨 run format"; else cat; fi' HEAD

# 08bac54: :art: 헤더 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "08bac54" ]; then echo "🎨 헤더 추가"; else cat; fi' HEAD

# b1412d4: :art: origin 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b1412d4" ]; then echo "🎨 origin 추가"; else cat; fi' HEAD

# 15064fb: :lipstick: 좀 더 클릭하기 쉽게 유도
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "15064fb" ]; then echo "💄 좀 더 클릭하기 쉽게 유도"; else cat; fi' HEAD

# cc81af4: :art: no css 환경에서 로고가 너무 크게 나와서 가상 요소로 넣음
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "cc81af4" ]; then echo "🎨 no css 환경에서 로고가 너무 크게 나와서 가상 요소로 넣음"; else cat; fi' HEAD

# f445cba: :art: 프리텐다는 폰트 로드를 서브셋으로 하도록 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f445cba" ]; then echo "🎨 프리텐다는 폰트 로드를 서브셋으로 하도록 변경"; else cat; fi' HEAD

# d798722: :art: pnpm install
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "d798722" ]; then echo "🎨 pnpm install"; else cat; fi' HEAD

# f135633: :art: run format
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f135633" ]; then echo "🎨 run format"; else cat; fi' HEAD

# b3195c7: :sparkles: add sitemap
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b3195c7" ]; then echo "✨ add sitemap"; else cat; fi' HEAD

# a40f51e: :wheelchair: 포커스 할 때 리더가 읽을 수 있게 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a40f51e" ]; then echo "♿️ 포커스 할 때 리더가 읽을 수 있게 추가"; else cat; fi' HEAD

# f728c18: :lock: sonar 설정 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f728c18" ]; then echo "🔒️ sonar 설정 추가"; else cat; fi' HEAD

# 26b1fe8: :lock: sonar 보안 점검에 걸린 코드 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "26b1fe8" ]; then echo "🔒️ sonar 보안 점검에 걸린 코드 수정"; else cat; fi' HEAD

# 4d929e4: :lock: sonar 보안 점검에 걸린 코드 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4d929e4" ]; then echo "🔒️ sonar 보안 점검에 걸린 코드 수정"; else cat; fi' HEAD

# 0f4a22e: :lock: sonar 보안 점검에 걸린 코드 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0f4a22e" ]; then echo "🔒️ sonar 보안 점검에 걸린 코드 수정"; else cat; fi' HEAD

# c471987: :lipstick: 폰트가 좀 더 잘 보이도록 볼드 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c471987" ]; then echo "💄 폰트가 좀 더 잘 보이도록 볼드 추가"; else cat; fi' HEAD

# c2c47ee: :art: run format
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c2c47ee" ]; then echo "🎨 run format"; else cat; fi' HEAD

# af70466: :art: BorderSubTitle 컴포넌트 제거하고 푸터 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "af70466" ]; then echo "🎨 BorderSubTitle 컴포넌트 제거하고 푸터 추가"; else cat; fi' HEAD

# e63f76d: :art: 잘못된 날자 참조 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e63f76d" ]; then echo "🎨 잘못된 날자 참조 변경"; else cat; fi' HEAD

# ed16d3b: :fire: light dark로 바꾸면서 백업해놧던 코드 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "ed16d3b" ]; then echo "🔥 light dark로 바꾸면서 백업해놧던 코드 삭제"; else cat; fi' HEAD

# 70dc1ca: :lipstick: 코드 영역에 보더 색상 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "70dc1ca" ]; then echo "💄 코드 영역에 보더 색상 추가"; else cat; fi' HEAD

# b53684f: :art: run format
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b53684f" ]; then echo "🎨 run format"; else cat; fi' HEAD

# ff7a27e: :art: 패스 정리 로직 최적화
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "ff7a27e" ]; then echo "🎨 패스 정리 로직 최적화"; else cat; fi' HEAD

# 1956d89: :art: 타이틀 추출 로직 수정 및 정리
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "1956d89" ]; then echo "🎨 타이틀 추출 로직 수정 및 정리"; else cat; fi' HEAD

# 0067204: :pencil2: 글러브 오타 수정 😂
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0067204" ]; then echo "✏️ 글러브 오타 수정 😂"; else cat; fi' HEAD

# 18df386: :art: 타이틀 생성 로직을 +layout.server.js -> +layout.js 로 이동
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "18df386" ]; then echo "🎨 타이틀 생성 로직을 +layout.server.js -> +layout.js 로 이동"; else cat; fi' HEAD

# 4a0bb15: :arrow_up: package upgrade
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4a0bb15" ]; then echo "⬆️ package upgrade"; else cat; fi' HEAD

# 6fedcd9: :art: 라이트 다크 모드로 CSS 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6fedcd9" ]; then echo "🎨 라이트 다크 모드로 CSS 변경"; else cat; fi' HEAD

# e1fd8d5: :lipstick: 내비게이션이 다른 팝오버 요소가 나올때 사라지지 않음
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e1fd8d5" ]; then echo "💄 내비게이션이 다른 팝오버 요소가 나올때 사라지지 않음"; else cat; fi' HEAD

# 391b801: :lipstick: svg 밑에 있는 여백 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "391b801" ]; then echo "💄 svg 밑에 있는 여백 제거"; else cat; fi' HEAD

# 42d91e3: :art: 옵시디언 설정 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "42d91e3" ]; then echo "🎨 옵시디언 설정 추가"; else cat; fi' HEAD

# eb012b9: :lipstick: shiki 로 만들어진 코드 스타일에 라운딩, 패딩 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "eb012b9" ]; then echo "💄 shiki 로 만들어진 코드 스타일에 라운딩, 패딩 추가"; else cat; fi' HEAD

# 1d7ba48: :memo: add post - using-popover-api.md
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "1d7ba48" ]; then echo "📝 add post - using-popover-api.md"; else cat; fi' HEAD

# 1768ab0: :art:내비게이션 동작을 팝오버로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "1768ab0" ]; then echo "🎨내비게이션 동작을 팝오버로 변경"; else cat; fi' HEAD

# 3180954: :art: 옵시디언 설정 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3180954" ]; then echo "🎨 옵시디언 설정 추가"; else cat; fi' HEAD

# 2263fbf: :memo: 버전 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "2263fbf" ]; then echo "📝 버전 변경"; else cat; fi' HEAD

# 8386140: :lipstick: 콜아웃 문법 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8386140" ]; then echo "💄 콜아웃 문법 변경"; else cat; fi' HEAD

# 8a9366c: :lipstick: 콜아웃 플러그인 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8a9366c" ]; then echo "💄 콜아웃 플러그인 변경"; else cat; fi' HEAD

# 5ee865f: :pencil2: 오타 수정 파일명
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "5ee865f" ]; then echo "✏️ 오타 수정 파일명"; else cat; fi' HEAD

# d920891: :memo: 깃허브 액션 캐시 사용하기
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "d920891" ]; then echo "📝 깃허브 액션 캐시 사용하기"; else cat; fi' HEAD

# f3d4b48: :art: 한줄로 만들기
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f3d4b48" ]; then echo "🎨 한줄로 만들기"; else cat; fi' HEAD

# 1b7bb50: :art: 다른 방식으로 버전 로드
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "1b7bb50" ]; then echo "🎨 다른 방식으로 버전 로드"; else cat; fi' HEAD

# 6cab52f: :art: 락 파일이름을 package-lock에서 pnpm-lock 으로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6cab52f" ]; then echo "🎨 락 파일이름을 package-lock에서 pnpm-lock 으로 변경"; else cat; fi' HEAD

# 0a9af66: :art: 락 파일 확장자를 yaml로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0a9af66" ]; then echo "🎨 락 파일 확장자를 yaml로 변경"; else cat; fi' HEAD

# 5d5dbca: :art: 플레이 라이트 버전 출력
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "5d5dbca" ]; then echo "🎨 플레이 라이트 버전 출력"; else cat; fi' HEAD

# 28e5929: :art: 병렬 실행 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "28e5929" ]; then echo "🎨 병렬 실행 제거"; else cat; fi' HEAD

# 6150a68: :art: 병렬로 실행
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6150a68" ]; then echo "🎨 병렬로 실행"; else cat; fi' HEAD

# ecdd910: :art: 병렬로 실행
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "ecdd910" ]; then echo "🎨 병렬로 실행"; else cat; fi' HEAD

# 686a657: Revert ":art: node 액션을 사용하고 패키지 매니저 따로 설치 안함"
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "686a657" ]; then echo "Revert \"🎨 node 액션을 사용하고 패키지 매니저 따로 설치 안함\""; else cat; fi' HEAD

# f97b945: :art: node 액션을 사용하고 패키지 매니저 따로 설치 안함
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f97b945" ]; then echo "🎨 node 액션을 사용하고 패키지 매니저 따로 설치 안함"; else cat; fi' HEAD

# 5aa20d6: :art: pnpm 공식 액션 사용법 및 플레이라이트 캐시 추가 - 실제 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "5aa20d6" ]; then echo "🎨 pnpm 공식 액션 사용법 및 플레이라이트 캐시 추가 - 실제 캐시 테스트"; else cat; fi' HEAD

# 703909c: :art: pnpm 공식 액션 사용법 및 플레이라이트 캐시 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "703909c" ]; then echo "🎨 pnpm 공식 액션 사용법 및 플레이라이트 캐시 추가"; else cat; fi' HEAD

# b1c0a73: :art: pnpm 공식 액션 사용법, 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b1c0a73" ]; then echo "🎨 pnpm 공식 액션 사용법, 캐시 테스트"; else cat; fi' HEAD

# dcaaf04: :art: pnpm 공식 액션 사용법, 캐시 테스트 - pnpm 버전 명시 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "dcaaf04" ]; then echo "🎨 pnpm 공식 액션 사용법, 캐시 테스트 - pnpm 버전 명시 제거"; else cat; fi' HEAD

# d0b31e2: :art: pnpm 공식 액션 사용법, 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "d0b31e2" ]; then echo "🎨 pnpm 공식 액션 사용법, 캐시 테스트"; else cat; fi' HEAD

# 8247f56: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8247f56" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# 3255488: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3255488" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# d4a65fb: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "d4a65fb" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# b109c44: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b109c44" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# 8bfb820: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8bfb820" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# aec25cb: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "aec25cb" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# b6f1072: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b6f1072" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# ef26ee7: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "ef26ee7" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# 4967f15: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4967f15" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# 2b58664: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "2b58664" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# 0a91355: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0a91355" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# ef800bc: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "ef800bc" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# cd61235: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "cd61235" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# 15c6a12: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "15c6a12" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# 66b89d3: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "66b89d3" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# 45f1700: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "45f1700" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# 101fca4: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "101fca4" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# 29b2685: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "29b2685" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# b224bf8: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b224bf8" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# eeed734: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "eeed734" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# 04a68e8: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "04a68e8" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# e351e78: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e351e78" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# 0d841a5: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0d841a5" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# cdea49a: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "cdea49a" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# ca16070: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "ca16070" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# 3eca225: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3eca225" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# 6c37ac0: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6c37ac0" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# 87e999b: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "87e999b" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# 76f945c: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "76f945c" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# ec95278: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "ec95278" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# 9b72ece: :art: 캐시 테스트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "9b72ece" ]; then echo "🎨 캐시 테스트"; else cat; fi' HEAD

# fa3afc8: :art: 무엇으로 만들었는지 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "fa3afc8" ]; then echo "🎨 무엇으로 만들었는지 추가"; else cat; fi' HEAD

# 6430fe5: :lipstick: 오른쪽도 여백 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6430fe5" ]; then echo "💄 오른쪽도 여백 추가"; else cat; fi' HEAD

# e7d0e2a: :art: 필드이름 좀 더 명확하게 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e7d0e2a" ]; then echo "🎨 필드이름 좀 더 명확하게 변경"; else cat; fi' HEAD

# 3df5ce0: :art: 정렬해서 출력 최근 순으로
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3df5ce0" ]; then echo "🎨 정렬해서 출력 최근 순으로"; else cat; fi' HEAD

# 62921ff: :bug: 필드 참조 명 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "62921ff" ]; then echo "🐛 필드 참조 명 수정"; else cat; fi' HEAD

# a770198: :art: run format
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a770198" ]; then echo "🎨 run format"; else cat; fi' HEAD

# fd0ff10: :memo: 콜아웃 문법 변ㄱ여
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "fd0ff10" ]; then echo "📝 콜아웃 문법 변ㄱ여"; else cat; fi' HEAD

# 7cb8db2: :lipstick: 스크롤바 디자인 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7cb8db2" ]; then echo "💄 스크롤바 디자인 변경"; else cat; fi' HEAD

# 0565283: :art: 빌드 버전 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0565283" ]; then echo "🎨 빌드 버전 추가"; else cat; fi' HEAD

# 6086bf4: :art: Category.js, Post.js 를 비동기함수로 교체
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6086bf4" ]; then echo "🎨 Category.js, Post.js 를 비동기함수로 교체"; else cat; fi' HEAD

# 482e7dc: :art: 콜아웃 스타일 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "482e7dc" ]; then echo "🎨 콜아웃 스타일 추가"; else cat; fi' HEAD

# 5f82d95: :art: 패키지 의존성 제거하고 내부로 포함
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "5f82d95" ]; then echo "🎨 패키지 의존성 제거하고 내부로 포함"; else cat; fi' HEAD

# cf2385c: :pencil2: 헤딩 문법 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "cf2385c" ]; then echo "✏️ 헤딩 문법 수정"; else cat; fi' HEAD

# 9a03f34: :art: 참조 필드 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "9a03f34" ]; then echo "🎨 참조 필드 수정"; else cat; fi' HEAD

# ec3cd04: :art: 코드 다이어트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "ec3cd04" ]; then echo "🎨 코드 다이어트"; else cat; fi' HEAD

# 5f8304c: :art: 코드 다이어트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "5f8304c" ]; then echo "🎨 코드 다이어트"; else cat; fi' HEAD

# e2c55d2: :art: 코드 다이어트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e2c55d2" ]; then echo "🎨 코드 다이어트"; else cat; fi' HEAD

# 90893a0: :bug: 잘못된 참조 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "90893a0" ]; then echo "🐛 잘못된 참조 수정"; else cat; fi' HEAD

# ca64e71: :fire: 사용하지 않는 임포트 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "ca64e71" ]; then echo "🔥 사용하지 않는 임포트 삭제"; else cat; fi' HEAD

# 60d0869: :art: Post.js 정리
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "60d0869" ]; then echo "🎨 Post.js 정리"; else cat; fi' HEAD

# ff5cfc5: :arrow_up:
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "ff5cfc5" ]; then echo "⬆️"; else cat; fi' HEAD

# 0d1c5f1: :truck: 드래프트 디렉토리 이동
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0d1c5f1" ]; then echo "🚚 드래프트 디렉토리 이동"; else cat; fi' HEAD

# 7532c1d: :art: 문법 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7532c1d" ]; then echo "🎨 문법 수정"; else cat; fi' HEAD

# 8a138d8: :art: run format
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8a138d8" ]; then echo "🎨 run format"; else cat; fi' HEAD

# 9f2d6b7: :art: 옵시디언 코드
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "9f2d6b7" ]; then echo "🎨 옵시디언 코드"; else cat; fi' HEAD

# e716f63: :art: h1 태그 그것만 삭제, 뒷 라인이 줄바꿈이 아닐 수도 있어서
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e716f63" ]; then echo "🎨 h1 태그 그것만 삭제, 뒷 라인이 줄바꿈이 아닐 수도 있어서"; else cat; fi' HEAD

# 636c3b9: :lipstick: 코드 스타일 변경 -> 드라큘라
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "636c3b9" ]; then echo "💄 코드 스타일 변경 -> 드라큘라"; else cat; fi' HEAD

# bb7538b: :art: remark mermaidjs말고 rehype로 변경 그리고 타입 명시
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "bb7538b" ]; then echo "🎨 remark mermaidjs말고 rehype로 변경 그리고 타입 명시"; else cat; fi' HEAD

# 526f2a3: :memo: add post
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "526f2a3" ]; then echo "📝 add post"; else cat; fi' HEAD

# 5e5fe84: :art: shikijs-rehypte 사용법 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "5e5fe84" ]; then echo "🎨 shikijs-rehypte 사용법 추가"; else cat; fi' HEAD

# 3eccc6c: :art: 문장 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3eccc6c" ]; then echo "🎨 문장 수정"; else cat; fi' HEAD

# 9531375: :art: 보더 컴포넌트를 디렉토리 이동 밑 서브 타이틀 컴포넌트 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "9531375" ]; then echo "🎨 보더 컴포넌트를 디렉토리 이동 밑 서브 타이틀 컴포넌트 추가"; else cat; fi' HEAD

# 6b96371: :art: 잘못된 설명 수정, 배포된 기능을 보면 정상 작동함 HMR 단계에서 폰트가 계속 새로 리로드 되어서 문제였음
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6b96371" ]; then echo "🎨 잘못된 설명 수정, 배포된 기능을 보면 정상 작동함 HMR 단계에서 폰트가 계속 새로 리로드 되어서 문제였음"; else cat; fi' HEAD

# 0355890: :bug: h1이 삭제되지 않는 버그 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0355890" ]; then echo "🐛 h1이 삭제되지 않는 버그 수정"; else cat; fi' HEAD

# 2497f24: :art: 코드 영역에 스크롤 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "2497f24" ]; then echo "🎨 코드 영역에 스크롤 추가"; else cat; fi' HEAD

# 0440b94: :art: 애니메이션 속도 설정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0440b94" ]; then echo "🎨 애니메이션 속도 설정"; else cat; fi' HEAD

# d82b7e2: :memo: vite-plugin 만들기
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "d82b7e2" ]; then echo "📝 vite-plugin 만들기"; else cat; fi' HEAD

# 1736885: :arrow_up:
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "1736885" ]; then echo "⬆️"; else cat; fi' HEAD

# 7e56d67: :art: 모바일 모드에서 내비게이션 위로 트랜지션 되는 모습 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7e56d67" ]; then echo "🎨 모바일 모드에서 내비게이션 위로 트랜지션 되는 모습 제거"; else cat; fi' HEAD

# f6a3701: :art: run format
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f6a3701" ]; then echo "🎨 run format"; else cat; fi' HEAD

# f523ad4: :fire: 테스트 코드 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f523ad4" ]; then echo "🔥 테스트 코드 삭제"; else cat; fi' HEAD

# 81d4777: :art: 기본 텍스트 랩 스타일 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "81d4777" ]; then echo "🎨 기본 텍스트 랩 스타일 추가"; else cat; fi' HEAD

# 9cec0fc: :art: 설명 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "9cec0fc" ]; then echo "🎨 설명 추가"; else cat; fi' HEAD

# 3e725a0: :art: 단어 줄바꿈 속성 변경, 용도가 좀더 분명한 속성 사용
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3e725a0" ]; then echo "🎨 단어 줄바꿈 속성 변경, 용도가 좀더 분명한 속성 사용"; else cat; fi' HEAD

# d8fcc8a: :art: 뷰 트랜지션 코드 분리
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "d8fcc8a" ]; then echo "🎨 뷰 트랜지션 코드 분리"; else cat; fi' HEAD

# 762a77e: :art: 코드 정리
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "762a77e" ]; then echo "🎨 코드 정리"; else cat; fi' HEAD

# de79342: :art: view-transition 최신 문법인 클래스 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "de79342" ]; then echo "🎨 view-transition 최신 문법인 클래스 추가"; else cat; fi' HEAD

# 2a42293: :art: run format
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "2a42293" ]; then echo "🎨 run format"; else cat; fi' HEAD

# f7aa1bb: :bug: 타이틀 추출 필드명 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f7aa1bb" ]; then echo "🐛 타이틀 추출 필드명 변경"; else cat; fi' HEAD

# 3400cc8: :art: 최적화
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3400cc8" ]; then echo "🎨 최적화"; else cat; fi' HEAD

# e7b42a8: :art: 타이틀 추출 방식 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e7b42a8" ]; then echo "🎨 타이틀 추출 방식 변경"; else cat; fi' HEAD

# 3f0759a: :art: .md 파싱 플러그인 만들어서 대체함, Post와 category가 너무 많은 역할이 있었음.
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3f0759a" ]; then echo "🎨 .md 파싱 플러그인 만들어서 대체함, Post와 category가 너무 많은 역할이 있었음."; else cat; fi' HEAD

# 55afe72: :art: 옵시디언 루트 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "55afe72" ]; then echo "🎨 옵시디언 루트 변경"; else cat; fi' HEAD

# 5578805: :art: 영상 말고 이미지로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "5578805" ]; then echo "🎨 영상 말고 이미지로 변경"; else cat; fi' HEAD

# 0641816: :art: 정정 경로를 파서에서 제거하는 로직 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0641816" ]; then echo "🎨 정정 경로를 파서에서 제거하는 로직 추가"; else cat; fi' HEAD

# eb57f72: :art: 정정 경로를 파서에서 제거하는 로직 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "eb57f72" ]; then echo "🎨 정정 경로를 파서에서 제거하는 로직 추가"; else cat; fi' HEAD

# 7928e53: :art: 콜아웃 파서 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7928e53" ]; then echo "🎨 콜아웃 파서 추가"; else cat; fi' HEAD

# f39a7b9: :art: 옵시디언을 이용하여 마크다운 작성
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f39a7b9" ]; then echo "🎨 옵시디언을 이용하여 마크다운 작성"; else cat; fi' HEAD

# 3082561: :fire: 사용하지 않는 변수 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3082561" ]; then echo "🔥 사용하지 않는 변수 삭제"; else cat; fi' HEAD

# 7d065b6: :fire: 디렉토리 트리 삭제, 보기 싫음
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7d065b6" ]; then echo "🔥 디렉토리 트리 삭제, 보기 싫음"; else cat; fi' HEAD

# f579184: :art: 잘못된 코드 되돌려놓고 테마 다크 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f579184" ]; then echo "🎨 잘못된 코드 되돌려놓고 테마 다크 추가"; else cat; fi' HEAD

# ab9b5c1: :art: mermaid 파싱 순서를 html 후로 미루면서 하이드레이션 단계에서 머메이드가 사라지는 문제 해결, 그러나 서버용 컴포넌트로 바꾸었기 때문에 결과상에는 변화 없음
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "ab9b5c1" ]; then echo "🎨 mermaid 파싱 순서를 html 후로 미루면서 하이드레이션 단계에서 머메이드가 사라지는 문제 해결, 그러나 서버용 컴포넌트로 바꾸었기 때문에 결과상에는 변화 없음"; else cat; fi' HEAD

# 67cd7f2: :art: 잘못된 링크 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "67cd7f2" ]; then echo "🎨 잘못된 링크 수정"; else cat; fi' HEAD

# aa2fc30: :art: 동적 타이틀 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "aa2fc30" ]; then echo "🎨 동적 타이틀 추가"; else cat; fi' HEAD

# b3174c8: :art: 국가 제외
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b3174c8" ]; then echo "🎨 국가 제외"; else cat; fi' HEAD

# c2ab53e: :art: 루트 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c2ab53e" ]; then echo "🎨 루트 추가"; else cat; fi' HEAD

# cf0ab3d: :art: 새로운 메뉴 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "cf0ab3d" ]; then echo "🎨 새로운 메뉴 추가"; else cat; fi' HEAD

# 6e70bda: :art: 헤더 분리
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6e70bda" ]; then echo "🎨 헤더 분리"; else cat; fi' HEAD

# bce8638: :art: 히스토리를 가져오도록 체크아웃 액션 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "bce8638" ]; then echo "🎨 히스토리를 가져오도록 체크아웃 액션 수정"; else cat; fi' HEAD

# 3ed68f8: :art: 디렉토리 구조 스타일 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3ed68f8" ]; then echo "🎨 디렉토리 구조 스타일 추가"; else cat; fi' HEAD

# eb0b746: :art: 코드 스타일링 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "eb0b746" ]; then echo "🎨 코드 스타일링 추가"; else cat; fi' HEAD

# e959494: Revert ":truck: 포스트 데이터 이동"
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e959494" ]; then echo "Revert \"🚚 포스트 데이터 이동\""; else cat; fi' HEAD

# 1abb729: :art: 문서에 작성일 수정일 추가 및 포스츠 스타일 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "1abb729" ]; then echo "🎨 문서에 작성일 수정일 추가 및 포스츠 스타일 추가"; else cat; fi' HEAD

# 287241a: :art: 마크다운 이동에 따른 경로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "287241a" ]; then echo "🎨 마크다운 이동에 따른 경로 변경"; else cat; fi' HEAD

# 85a7e23: :truck: 포스트 데이터 이동
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "85a7e23" ]; then echo "🚚 포스트 데이터 이동"; else cat; fi' HEAD

# 464f0f8: :art: 최적화
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "464f0f8" ]; then echo "🎨 최적화"; else cat; fi' HEAD

# 4516d30: :bug: mermaid 그래픽 사라지는 버그 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4516d30" ]; then echo "🐛 mermaid 그래픽 사라지는 버그 수정"; else cat; fi' HEAD

# 0602c44: :art: format
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0602c44" ]; then echo "🎨 format"; else cat; fi' HEAD

# 524c46b: :art: threlte로 대문 꾸미기 및 룬 컴파일러 비활성화
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "524c46b" ]; then echo "🎨 threlte로 대문 꾸미기 및 룬 컴파일러 비활성화"; else cat; fi' HEAD

# 4db2479: :art: 빌드 의존성 액션에 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4db2479" ]; then echo "🎨 빌드 의존성 액션에 추가"; else cat; fi' HEAD

# c066e62: :art: 테마 블랙으로
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c066e62" ]; then echo "🎨 테마 블랙으로"; else cat; fi' HEAD

# 36f7293: :art: 약간의 최적화...
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "36f7293" ]; then echo "🎨 약간의 최적화..."; else cat; fi' HEAD

# 57c0d7c: :fire: 사용하지 않는 파일 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "57c0d7c" ]; then echo "🔥 사용하지 않는 파일 삭제"; else cat; fi' HEAD

# 8e832f8: :art: 하위 카테고리에 있어도 내비게이션의 POSTS 가 활성화 되도록 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8e832f8" ]; then echo "🎨 하위 카테고리에 있어도 내비게이션의 POSTS 가 활성화 되도록 수정"; else cat; fi' HEAD

# 68e0115: :art: 머메이드, 시키 적용, 미루어뒀던 기능 적용
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "68e0115" ]; then echo "🎨 머메이드, 시키 적용, 미루어뒀던 기능 적용"; else cat; fi' HEAD

# bce1931: :art: 프리티어 실행
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "bce1931" ]; then echo "🎨 프리티어 실행"; else cat; fi' HEAD

# bd24500: :art: 프리티어 실행
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "bd24500" ]; then echo "🎨 프리티어 실행"; else cat; fi' HEAD

# 03d5895: :art: 패키지 추가 프리티어, 린트
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "03d5895" ]; then echo "🎨 패키지 추가 프리티어, 린트"; else cat; fi' HEAD

# 2e67809: :art: 타입 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "2e67809" ]; then echo "🎨 타입 추가"; else cat; fi' HEAD

# ce16885: :art: 압축 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "ce16885" ]; then echo "🎨 압축 추가"; else cat; fi' HEAD

# 0594a28: :art: Border.svelte 정리
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0594a28" ]; then echo "🎨 Border.svelte 정리"; else cat; fi' HEAD

# 9ae68e6: :art: 규칙 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "9ae68e6" ]; then echo "🎨 규칙 추가"; else cat; fi' HEAD

# 8dda50f: :package: update
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8dda50f" ]; then echo "📦️ update"; else cat; fi' HEAD

# e906511: :package: update 및 룬 문법으로 교체
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e906511" ]; then echo "📦️ update 및 룬 문법으로 교체"; else cat; fi' HEAD

# 635c58d: :package: update
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "635c58d" ]; then echo "📦️ update"; else cat; fi' HEAD

# 74a7fa9: :package: update
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "74a7fa9" ]; then echo "📦️ update"; else cat; fi' HEAD

# 6dc88ea: :recycle: CSS 변수 정리 및 내비게이션 애니메이션 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6dc88ea" ]; then echo "♻️ CSS 변수 정리 및 내비게이션 애니메이션 변경"; else cat; fi' HEAD

# 87e6540: :recycle: 공백 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "87e6540" ]; then echo "♻️ 공백 추가"; else cat; fi' HEAD

# b01c3e3: :art: 모바일 사이즈에서 내비게이션을 숨기는 방법을 알려주는 버튼 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b01c3e3" ]; then echo "🎨 모바일 사이즈에서 내비게이션을 숨기는 방법을 알려주는 버튼 추가"; else cat; fi' HEAD

# 79bf3a7: :art: 크롬에서 데스크톱 모드로 웹을 볼 경우 마음대로 폰트 사이즈를 변경하던것을 방지
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "79bf3a7" ]; then echo "🎨 크롬에서 데스크톱 모드로 웹을 볼 경우 마음대로 폰트 사이즈를 변경하던것을 방지"; else cat; fi' HEAD

# 79819e8: :art: 폰트 선언 최상위로 변경 및 속성 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "79819e8" ]; then echo "🎨 폰트 선언 최상위로 변경 및 속성 수정"; else cat; fi' HEAD

# 34708ff: :recycle: 내비게이션 기본적으로 숨김 처리
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "34708ff" ]; then echo "♻️ 내비게이션 기본적으로 숨김 처리"; else cat; fi' HEAD

# a797903: :art: 의미 없는 코드 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a797903" ]; then echo "🎨 의미 없는 코드 제거"; else cat; fi' HEAD

# e6866bd: :art: 명확한 값으로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e6866bd" ]; then echo "🎨 명확한 값으로 변경"; else cat; fi' HEAD

# a9c57ab: :memo: 문장 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a9c57ab" ]; then echo "📝 문장 변경"; else cat; fi' HEAD

# 5d7a1ec: :recycle: 스크롤바 스타일링
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "5d7a1ec" ]; then echo "♻️ 스크롤바 스타일링"; else cat; fi' HEAD

# 4747ece: :recycle: 전체적으로 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4747ece" ]; then echo "♻️ 전체적으로 수정"; else cat; fi' HEAD

# 3a8ee58: :recycle: GFM 삭제, 아직 사용하지 않기 떄문에
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3a8ee58" ]; then echo "♻️ GFM 삭제, 아직 사용하지 않기 떄문에"; else cat; fi' HEAD

# 4d7d5ad: :recycle: 들여쓰기 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4d7d5ad" ]; then echo "♻️ 들여쓰기 추가"; else cat; fi' HEAD

# fedd873: :lipstick: 폰트 사이즈 .05rem 증가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "fedd873" ]; then echo "💄 폰트 사이즈 .05rem 증가"; else cat; fi' HEAD

# ec3b899: :recycle: used where
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "ec3b899" ]; then echo "♻️ used where"; else cat; fi' HEAD

# 2e84586: :lipstick: 내비게이션 상단 폰트 크기를 기본으로
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "2e84586" ]; then echo "💄 내비게이션 상단 폰트 크기를 기본으로"; else cat; fi' HEAD

# bde8ded: :lipstick: 스크롤 바 디자인 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "bde8ded" ]; then echo "💄 스크롤 바 디자인 추가"; else cat; fi' HEAD

# a38e13d: :fire: 필요 없는 코드 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a38e13d" ]; then echo "🔥 필요 없는 코드 삭제"; else cat; fi' HEAD

# 0687581: :recycle: 상위 요소로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0687581" ]; then echo "♻️ 상위 요소로 변경"; else cat; fi' HEAD

# cf9acbc: :truck: 이미 있는 요소에 디자인 중첩
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "cf9acbc" ]; then echo "🚚 이미 있는 요소에 디자인 중첩"; else cat; fi' HEAD

# 559d7bc: :rocket: 완벽한 트랜지션!
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "559d7bc" ]; then echo "🚀 완벽한 트랜지션!"; else cat; fi' HEAD

# afdf6db: :lipstick: 뷰 트랜지션 정리
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "afdf6db" ]; then echo "💄 뷰 트랜지션 정리"; else cat; fi' HEAD

# 350c767: :sparkles: 모든 화면에 트랜지션 적용
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "350c767" ]; then echo "✨ 모든 화면에 트랜지션 적용"; else cat; fi' HEAD

# 898ab8b: :bug: 나중에 해결법 찾기
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "898ab8b" ]; then echo "🐛 나중에 해결법 찾기"; else cat; fi' HEAD

# 3681a6a: :sparkles: 웹 제목 마크다운에서 파싱해서 표시
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3681a6a" ]; then echo "✨ 웹 제목 마크다운에서 파싱해서 표시"; else cat; fi' HEAD

# b30de98: :sparkles: 마크다운 기능 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b30de98" ]; then echo "✨ 마크다운 기능 추가"; else cat; fi' HEAD

# 0078e84: :fire:
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0078e84" ]; then echo "🔥"; else cat; fi' HEAD

# e75f85f: :art: 스타일 재정의
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e75f85f" ]; then echo "🎨 스타일 재정의"; else cat; fi' HEAD

# b05c2e7: :fire: 마크다운으로 대체
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b05c2e7" ]; then echo "🔥 마크다운으로 대체"; else cat; fi' HEAD

# 5073b93: :poop: li 의 자식 요소에 마진 핸들링이 적용된것을  ul의 자식으로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "5073b93" ]; then echo "💩 li 의 자식 요소에 마진 핸들링이 적용된것을  ul의 자식으로 변경"; else cat; fi' HEAD

# c54245e: :fire: comment
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c54245e" ]; then echo "🔥 comment"; else cat; fi' HEAD

# 62854e7: :truck: flex
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "62854e7" ]; then echo "🚚 flex"; else cat; fi' HEAD

# 028daa3: :wrench: add name
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "028daa3" ]; then echo "🔧 add name"; else cat; fi' HEAD

# 6e2beec: :wrench: auto todos action
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6e2beec" ]; then echo "🔧 auto todos action"; else cat; fi' HEAD

# 58df082: :arrow_up:
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "58df082" ]; then echo "⬆️"; else cat; fi' HEAD

# 79616dc: :lipstick: add css reset
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "79616dc" ]; then echo "💄 add css reset"; else cat; fi' HEAD

# 4e5724e: :recycle:
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4e5724e" ]; then echo "♻️"; else cat; fi' HEAD

# dbf9d1b: :art: 스벨트 권장 방식으로 태그 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "dbf9d1b" ]; then echo "🎨 스벨트 권장 방식으로 태그 변경"; else cat; fi' HEAD

# 4d14d5d: :memo: 대문 문장 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4d14d5d" ]; then echo "📝 대문 문장 변경"; else cat; fi' HEAD

# e1efa7b: :fire: 파일 정리
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e1efa7b" ]; then echo "🔥 파일 정리"; else cat; fi' HEAD

# d8d3374: :green_heart: add view-transition
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "d8d3374" ]; then echo "💚 add view-transition"; else cat; fi' HEAD

# 9c1180c: :fire:
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "9c1180c" ]; then echo "🔥"; else cat; fi' HEAD

# b9dac97: :wheelchair: 키보드 포커스로도 메뉴가 나오도록 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b9dac97" ]; then echo "♿️ 키보드 포커스로도 메뉴가 나오도록 변경"; else cat; fi' HEAD

# 9696a65: :lipstick: 미디어 쿼리 경계 1px씩 올림
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "9696a65" ]; then echo "💄 미디어 쿼리 경계 1px씩 올림"; else cat; fi' HEAD

# eff4482: :lipstick: 헤딩이 글 읽는데 방해되는 느낌이라 끝으로이동
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "eff4482" ]; then echo "💄 헤딩이 글 읽는데 방해되는 느낌이라 끝으로이동"; else cat; fi' HEAD

# f254f49: :lipstick: add dark mode color scheme
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f254f49" ]; then echo "💄 add dark mode color scheme"; else cat; fi' HEAD

# 3d3eae4: :recycle: indent
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3d3eae4" ]; then echo "♻️ indent"; else cat; fi' HEAD

# eef3421: :lipstick: add font
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "eef3421" ]; then echo "💄 add font"; else cat; fi' HEAD

# 71ebb71: :fire:
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "71ebb71" ]; then echo "🔥"; else cat; fi' HEAD

# 8ade0ff: :lipstick: 마우스 호버시에도 내비게이션이 나오도록 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8ade0ff" ]; then echo "💄 마우스 호버시에도 내비게이션이 나오도록 변경"; else cat; fi' HEAD

# 990eb53: :lipstick: 좀 더 명시적인 트랜지션으로 변경, 의도치 않은 트랜지션은 실행되지 않도록 설정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "990eb53" ]; then echo "💄 좀 더 명시적인 트랜지션으로 변경, 의도치 않은 트랜지션은 실행되지 않도록 설정"; else cat; fi' HEAD

# b491ee8: :lipstick: 하위 카테고리에 대한 스타일링 제거
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b491ee8" ]; then echo "💄 하위 카테고리에 대한 스타일링 제거"; else cat; fi' HEAD

# f2eda93: :art: about.md to +page.svelte
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f2eda93" ]; then echo "🎨 about.md to +page.svelte"; else cat; fi' HEAD

# 0e9c0fc: :memo: 내용 보강
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "0e9c0fc" ]; then echo "📝 내용 보강"; else cat; fi' HEAD

# 403a7a3: :seedling: change-branch-name.md
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "403a7a3" ]; then echo "🌱 change-branch-name.md"; else cat; fi' HEAD

# bea5945: :seedling: changing-the-korean-english-switch-key.md
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "bea5945" ]; then echo "🌱 changing-the-korean-english-switch-key.md"; else cat; fi' HEAD

# 1f4f191: :memo: add reference
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "1f4f191" ]; then echo "📝 add reference"; else cat; fi' HEAD

# f29e35b: :seedling: add-authorized-keys.md
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f29e35b" ]; then echo "🌱 add-authorized-keys.md"; else cat; fi' HEAD

# 8fc47e9: :memo: 문장 보강
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8fc47e9" ]; then echo "📝 문장 보강"; else cat; fi' HEAD

# bd2bd51: :see_no_evil: enable-force-push.md
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "bd2bd51" ]; then echo "🙈 enable-force-push.md"; else cat; fi' HEAD

# 5cc4dbe: :seedling: install-rsync.md
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "5cc4dbe" ]; then echo "🌱 install-rsync.md"; else cat; fi' HEAD

# 00f5dd7: :seedling: WinGet 실행 오류 해결 방법
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "00f5dd7" ]; then echo "🌱 WinGet 실행 오류 해결 방법"; else cat; fi' HEAD

# 42a496e: :art: 표준 메타 태그 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "42a496e" ]; then echo "🎨 표준 메타 태그 추가"; else cat; fi' HEAD

# 42b8ce2: :fire: 잘못된 주석 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "42b8ce2" ]; then echo "🔥 잘못된 주석 삭제"; else cat; fi' HEAD

# bdac2c3: :bug: 문법 오류 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "bdac2c3" ]; then echo "🐛 문법 오류 수정"; else cat; fi' HEAD

# 07d0b46: :wrench: 인텔리제이에서 감지 가능하도록 정적 자원 위치 지정 깃액션 이그노어 파일 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "07d0b46" ]; then echo "🔧 인텔리제이에서 감지 가능하도록 정적 자원 위치 지정 깃액션 이그노어 파일 추가"; else cat; fi' HEAD

# dd13b0c: :truck: 마크다운 파일명 변경 및 구조 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "dd13b0c" ]; then echo "🚚 마크다운 파일명 변경 및 구조 변경"; else cat; fi' HEAD

# 9d1f086: :wrench: add ignore file GitHub action
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "9d1f086" ]; then echo "🔧 add ignore file GitHub action"; else cat; fi' HEAD

# e76d386: :memo: 프로젝트 설명 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e76d386" ]; then echo "📝 프로젝트 설명 추가"; else cat; fi' HEAD

# 91689b8: :lipstick: 내비게이션 기본 숨김
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "91689b8" ]; then echo "💄 내비게이션 기본 숨김"; else cat; fi' HEAD

# 8eae0d9: :wrench: sync `package.json` and `pnpm-lock.yaml`
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8eae0d9" ]; then echo "🔧 sync `package.json` and `pnpm-lock.yaml`"; else cat; fi' HEAD

# 511ac14: :wrench: use pnpm action
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "511ac14" ]; then echo "🔧 use pnpm action"; else cat; fi' HEAD

# e1130ec: :recycle: 권장 문버으로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e1130ec" ]; then echo "♻️ 권장 문버으로 변경"; else cat; fi' HEAD

# a594d37: :wrench: 깃허브 액션을 노드21, pnpm 으로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a594d37" ]; then echo "🔧 깃허브 액션을 노드21, pnpm 으로 변경"; else cat; fi' HEAD

# 97111fd: :lipstick: 파비콘 변경 및 기본 파비콘 파일 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "97111fd" ]; then echo "💄 파비콘 변경 및 기본 파비콘 파일 삭제"; else cat; fi' HEAD

# c4a397f: :seedling: "isArray"와 "instanceof Array"의 차이
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c4a397f" ]; then echo "🌱 \"isArray\"와 \"instanceof Array\"의 차이"; else cat; fi' HEAD

# c135c1d: :rocket: 1.0.0 출시!
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c135c1d" ]; then echo "🚀 1.0.0 출시!"; else cat; fi' HEAD

# b6eda7e: :memo: 오타 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "b6eda7e" ]; then echo "📝 오타 수정"; else cat; fi' HEAD

# 3ffedb2: :construction: 작업중!
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "3ffedb2" ]; then echo "🚧 작업중!"; else cat; fi' HEAD

# 7aa30eb: :recycle: 인자 전달 방식 제거 및 스스로 필요 인자 생성
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "7aa30eb" ]; then echo "♻️ 인자 전달 방식 제거 및 스스로 필요 인자 생성"; else cat; fi' HEAD

# 9d2f8e0: :memo: 홈 화면 내용 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "9d2f8e0" ]; then echo "📝 홈 화면 내용 변경"; else cat; fi' HEAD

# c2bc349: :memo: 도커 루트 디렉토리 이전
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c2bc349" ]; then echo "📝 도커 루트 디렉토리 이전"; else cat; fi' HEAD

# c4b066d: :memo: asuswrt-merlin 커스텀 DDNS 설정 방법
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "c4b066d" ]; then echo "📝 asuswrt-merlin 커스텀 DDNS 설정 방법"; else cat; fi' HEAD

# 6f6e79a: :fire: asuswrt를 xnix 하위로 이동
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "6f6e79a" ]; then echo "🔥 asuswrt를 xnix 하위로 이동"; else cat; fi' HEAD

# a05db2d: :package: 정적 빌드 패키지 변경 및 사용하지 않는 패키지 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a05db2d" ]; then echo "📦️ 정적 빌드 패키지 변경 및 사용하지 않는 패키지 삭제"; else cat; fi' HEAD

# 49cba4b: :lipstick: 스벨트킷으로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "49cba4b" ]; then echo "💄 스벨트킷으로 변경"; else cat; fi' HEAD

# 503a278: :fire: 의미 없는 코드 삭제
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "503a278" ]; then echo "🔥 의미 없는 코드 삭제"; else cat; fi' HEAD

# a85d0b7: :recycle: 줄 맞춤
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a85d0b7" ]; then echo "♻️ 줄 맞춤"; else cat; fi' HEAD

# 9646cb6: :bug: 제목 -> title
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "9646cb6" ]; then echo "🐛 제목 -> title"; else cat; fi' HEAD

# 4f1cdca: :memo: improved document
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4f1cdca" ]; then echo "📝 improved document"; else cat; fi' HEAD

# d335eba: :memo: improved document
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "d335eba" ]; then echo "📝 improved document"; else cat; fi' HEAD

# 20ada9f: :lipstick: h, kbd tag design improved
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "20ada9f" ]; then echo "💄 h, kbd tag design improved"; else cat; fi' HEAD

# 50e3e5f: :memo: improved document
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "50e3e5f" ]; then echo "📝 improved document"; else cat; fi' HEAD

# 74d883a: :wrench: change version
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "74d883a" ]; then echo "🔧 change version"; else cat; fi' HEAD

# 85d517a: :recycle: preload font
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "85d517a" ]; then echo "♻️ preload font"; else cat; fi' HEAD

# 058d9e0: :recycle: css 워터폴 제거, 근데 http 오버헤드가 더큰듯...
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "058d9e0" ]; then echo "♻️ css 워터폴 제거, 근데 http 오버헤드가 더큰듯..."; else cat; fi' HEAD

# cb6bfd0: :fire: scss
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "cb6bfd0" ]; then echo "🔥 scss"; else cat; fi' HEAD

# 8c0a8eb: :recycle: improved semantic tag
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "8c0a8eb" ]; then echo "♻️ improved semantic tag"; else cat; fi' HEAD

# 93e9743: :pencil2: 의미있는 문장으로 변경
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "93e9743" ]; then echo "✏️ 의미있는 문장으로 변경"; else cat; fi' HEAD

# f0a2bc2: :wrench: 리소스로 인식할 수 있게 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "f0a2bc2" ]; then echo "🔧 리소스로 인식할 수 있게 추가"; else cat; fi' HEAD

# 9960b82: :lipstick: 앵커 추가
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "9960b82" ]; then echo "💄 앵커 추가"; else cat; fi' HEAD

# 113f149: :recycle: 최적화
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "113f149" ]; then echo "♻️ 최적화"; else cat; fi' HEAD

# e881d67: :lipstick: 폰트 교체
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "e881d67" ]; then echo "💄 폰트 교체"; else cat; fi' HEAD

# 63ff8ed: :pencil2: 오타 수정
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "63ff8ed" ]; then echo "✏️ 오타 수정"; else cat; fi' HEAD

# 70cde88: :fire: not use
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "70cde88" ]; then echo "🔥 not use"; else cat; fi' HEAD

# 4292a0e: :truck: unix-and-unix-like -> xnix
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "4292a0e" ]; then echo "🚚 unix-and-unix-like -> xnix"; else cat; fi' HEAD

# a1f85cc: :fire: 깃이그노어 정리
git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "a1f85cc" ]; then echo "🔥 깃이그노어 정리"; else cat; fi' HEAD
