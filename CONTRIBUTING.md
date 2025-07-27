# 기여 가이드

## 커밋 메시지 컨벤션

이 프로젝트는 [Conventional Commits](https://www.conventionalcommits.org/)를 사용하여 자동 버저닝을 지원합니다.

### 커밋 메시지 형식

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 커밋 타입

| 타입 | 버전 | 설명 | 예시 |
|------|------|------|------|
| `feat` | **minor** | 새로운 기능 추가 | `feat: 사용자 로그인 기능 추가` |
| `fix` | **patch** | 버그 수정 | `fix: 로그인 오류 수정` |
| `chore` | - | 빌드, 설정 변경 | `chore: 의존성 업데이트` |
| `docs` | - | 문서 변경 | `docs: README 업데이트` |
| `style` | - | 코드 스타일 변경 | `style: 코드 포맷팅` |
| `refactor` | - | 코드 리팩토링 | `refactor: 컴포넌트 구조 개선` |
| `test` | - | 테스트 추가/수정 | `test: 로그인 테스트 추가` |
| `perf` | **patch** | 성능 개선 | `perf: 이미지 로딩 최적화` |

### Breaking Changes

**Major 버전** 업데이트가 필요한 경우:

```bash
feat!: API 응답 형식 변경

BREAKING CHANGE: API 응답이 {data} 형태로 변경됨
```

또는

```bash
feat(api)!: 사용자 인증 방식 변경
```

### 예시

**Good ✅**
```bash
feat: 다크 모드 지원 추가
fix: 모바일에서 네비게이션 버그 수정
docs: 설치 가이드 업데이트
chore: ESLint 설정 업데이트
feat(blog): 태그 필터링 기능 구현
```

**Bad ❌**
```bash
added new feature
bug fix
update docs
fixed things
```

## 자동 버저닝 동작

1. **main 브랜치**에 푸시하면 자동으로 버전이 계산됩니다
2. **package.json** 버전이 자동 업데이트됩니다
3. **CHANGELOG.md**가 자동 생성/업데이트됩니다
4. **Git 태그**가 자동 생성됩니다
5. **GitHub Release**가 자동 생성됩니다
6. **Cloudflare Workers**에 자동 배포됩니다

## 개발 워크플로우

```bash
# 1. 기능 브랜치 생성
git checkout -b feature/새기능

# 2. 개발 및 커밋 (컨벤션 준수)
git commit -m "feat: 새로운 기능 추가"

# 3. 브랜치 푸시
git push origin feature/새기능

# 4. Pull Request 생성

# 5. 리뷰 후 main 브랜치로 머지
# → 자동 버저닝 및 배포 실행
```

## 수동 릴리즈 스킵

버저닝이 필요 없는 커밋:

```bash
git commit -m "docs: README 수정 [skip ci]"
```

`[skip ci]` 플래그를 사용하면 릴리즈 워크플로우가 실행되지 않습니다.