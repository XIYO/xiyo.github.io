# GitHub Actions Workflow

이 워크플로우는 main 브랜치에 푸시될 때 자동으로 Cloudflare Workers에 배포합니다.

## 필요한 시크릿 설정

GitHub 저장소의 Settings → Secrets and variables → Actions에서 다음 시크릿을 추가해야 합니다:

1. **CLOUDFLARE_API_TOKEN**
   - Cloudflare 대시보드 → My Profile → API Tokens
   - "Create Token" 클릭
   - "Custom token" 선택
   - 권한: `Account:Cloudflare Workers Scripts:Edit`
   - Account Resources: Include → Your Account
   - Zone Resources: Include → All zones

2. **CLOUDFLARE_ACCOUNT_ID**
   - Cloudflare 대시보드 → Workers & Pages
   - 우측 상단의 Account ID 복사

## 워크플로우 동작

1. `main` 브랜치에 코드가 푸시되면 자동 실행
2. Git 서브모듈을 포함하여 저장소 클론
3. 의존성 설치 및 프로젝트 빌드
4. Cloudflare Workers에 배포

## 수동 실행

Actions 탭에서 "Deploy to Cloudflare Workers" 워크플로우를 선택하고 "Run workflow" 버튼으로 수동 실행 가능