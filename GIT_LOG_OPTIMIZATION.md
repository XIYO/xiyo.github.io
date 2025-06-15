---
authors:
  - unknown
dates:
  - '2025-06-15T05:58:13.788Z'
messages:
  - Initial commit
title: Git Log 최적화 및 런타임 마크다운 파싱 마이그레이션 완료 ✅
---
# Git Log 최적화 및 런타임 마크다운 파싱 마이그레이션 완료 ✅

## 🎯 마이그레이션 완료 상태

**모든 최적화 작업이 완료되었습니다!**

- ✅ Vite 플러그인에서 Svelte 런타임 파싱으로 전환 완료
- ✅ pre-push 훅을 통한 자동 프론트매터 업데이트 구현
- ✅ 실시간 Git 로그 조회 제거로 성능 대폭 향상
- ✅ 모든 타입 오류 수정 및 빌드 성공 확인
- ✅ 레거시 코드 정리 완료

## 📊 성능 개선 결과

### 빌드 시간 개선

- **이전**: 각 마크다운 파일마다 실시간 Git 로그 조회
- **현재**: 프론트매터에서 미리 준비된 Git 정보 읽기
- **결과**: 빌드 시간 대폭 단축

### 개발 경험 개선

- **이전**: 마크다운 파일 변경 시 느린 HMR
- **현재**: 빠른 런타임 파싱으로 즉시 반영
- **결과**: 개발 생산성 향상

## 변경 사항 요약

### 1. 설치된 패키지

- `husky`: Git 훅 관리를 위한 도구

### 2. 생성된 파일

- `scripts/update-frontmatter.js`: 모든 마크다운 파일의 프론트매터를 업데이트하는 스크립트
- `scripts/update-frontmatter-incremental.js`: 변경된 파일만 업데이트하는 효율적인 스크립트
- `scripts/clean-frontmatter.js`: 프론트매터 정리 스크립트
- `src/lib/utils/markdown.js`: 런타임 마크다운 파싱 유틸리티
- `.husky/pre-push`: 푸시 전에 실행되는 훅 스크립트

### 3. 수정된 파일

- `src/lib/post/Category.js`: `import.meta.glob`을 `?raw` 옵션으로 변경하여 원본 마크다운 텍스트 로드
- `src/lib/post/Post.js`: 런타임에서 마크다운 파싱하도록 변경
- `vite.config.js`: Vite 플러그인 제거
- `package.json`: 새로운 스크립트 추가
- `.husky/pre-push`: pre-push 훅 설정

### 4. 삭제된 파일

- ✅ `src/lib/plugin/vitePluginXiyo.js`: Vite 플러그인 완전 제거 완료
- ✅ `src/lib/plugin/gitLog.js`: 실시간 Git 로그 처리 모듈 제거 완료

## 작동 방식

### 기존 방식 (느림)

```text
마크다운 파일 요청 → Vite 플러그인에서 실시간 Git 로그 조회 → 프론트매터 생성 → 응답
```

### 새로운 방식 (빠름)

```text
Git push 시 → pre-push 훅 실행 → 변경된 마크다운 파일 감지 → Git 로그 조회 후 프론트매터 미리 생성
마크다운 파일 요청 → Svelte 런타임에서 원본 텍스트 로드 → 프론트매터에서 Git 정보 읽기 → 응답
```

## 사용법

### 수동으로 프론트매터 업데이트

```bash
# 모든 마크다운 파일 업데이트
pnpm run update-frontmatter

# 변경된 파일만 업데이트  
pnpm run update-frontmatter:incremental

# 프론트매터 정리
pnpm run clean-frontmatter
```

### 자동 업데이트

Git push 시 자동으로 변경된 마크다운 파일의 프론트매터가 업데이트됩니다.

## 프론트매터 구조

이제 각 마크다운 파일의 프론트매터에 다음 정보가 자동으로 추가됩니다:

```yaml
---
authors:
  - author1
  - author2
dates:
  - 2025-06-15T13:40+0900  # 최신 수정 시간 (배열의 첫 번째)
  - 2025-06-14T10:20+0900  # 이전 수정 시간들...
  - 2025-06-13T09:15+0900  # 최초 생성 시간 (배열의 마지막)
messages:
  - commit message 1
  - commit message 2
---
```

### 시간 정보 활용 방법

- **최신 업데이트**: `dates[0]` (배열의 첫 번째 요소)
- **최초 생성**: `dates[dates.length - 1]` (배열의 마지막 요소)
- **전체 히스토리**: `dates` 배열 전체

## 성능 개선

- **개발 속도**: 마크다운 파일 로딩 시 실시간 Git 로그 조회가 제거되어 빠른 로딩
- **빌드 속도**: 빌드 시 모든 파일에 대한 Git 로그 조회가 제거되어 빠른 빌드
- **효율성**: 변경된 파일만 선택적으로 업데이트

## 주의사항

1. **첫 번째 push 시**: 모든 마크다운 파일이 업데이트되어 큰 커밋이 생성될 수 있습니다.
2. **Git 히스토리**: 프론트매터 업데이트를 위한 추가 커밋이 생성됩니다.
3. **정리 완료**: 기존의 Vite 플러그인 및 실시간 Git 로그 처리 파일들이 모두 삭제되었습니다.
   - `src/lib/plugin/vitePluginXiyo.js` ✅ 삭제 완료
   - `src/lib/plugin/gitLog.js` ✅ 삭제 완료

## 트러블슈팅

### pre-push 훅이 실행되지 않는 경우

```bash
chmod +x .husky/pre-push
```

### 수동으로 모든 파일 업데이트

```bash
pnpm run update-frontmatter
```
