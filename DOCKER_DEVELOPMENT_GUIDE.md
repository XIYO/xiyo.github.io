# Docker를 활용한 격리된 개발 환경 구축 가이드

## 개요

이 문서는 xiyo.github.io 프로젝트에 Docker를 활용하여 격리된 개발 환경을 구축하는 방법을 안내합니다. SvelteKit, pnpm, Cloudflare Workers의 특성을 고려한 최적화된 워크플로우를 제공합니다.

## 1. Docker 컨테이너 내부에서 브랜치별 작업 환경

### 기본 개념

Docker 컨테이너를 사용하면 각 브랜치마다 독립된 개발 환경을 구성할 수 있습니다. 이를 통해 의존성 충돌이나 환경 설정 문제를 방지할 수 있습니다.

### Dockerfile 구성

```dockerfile
# Dockerfile
FROM node:20-alpine

# pnpm 설치
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# 작업 디렉토리 설정
WORKDIR /workspace

# 의존성 캐싱을 위한 package.json 복사
COPY package.json pnpm-lock.yaml ./

# pnpm fetch로 의존성 미리 다운로드 (캐시 최적화)
RUN pnpm fetch --frozen-lockfile

# 소스 코드 복사
COPY . .

# 오프라인 모드로 의존성 설치 (빠른 설치)
RUN pnpm install --offline --frozen-lockfile

# 개발 서버 포트
EXPOSE 5173

# 개발 서버 실행
CMD ["pnpm", "dev", "--host"]
```

### 브랜치별 컨테이너 관리

```bash
# 브랜치별 이미지 빌드
docker build -t xiyo-dev:feature-branch-name .

# 브랜치별 컨테이너 실행
docker run -it --rm \
  -v $(pwd):/workspace \
  -v /workspace/node_modules \
  -p 5173:5173 \
  --name xiyo-feature-branch \
  xiyo-dev:feature-branch-name
```

## 2. VSCode Dev Containers 설정

### .devcontainer/devcontainer.json

```json
{
	"name": "xiyo.dev Development",
	"dockerComposeFile": "docker-compose.yml",
	"service": "app",
	"workspaceFolder": "/workspace",

	"customizations": {
		"vscode": {
			"extensions": [
				"svelte.svelte-vscode",
				"esbenp.prettier-vscode",
				"dbaeumer.vscode-eslint",
				"bradlc.vscode-tailwindcss",
				"streetsidesoftware.code-spell-checker"
			],
			"settings": {
				"terminal.integrated.defaultProfile.linux": "bash",
				"editor.formatOnSave": true,
				"editor.defaultFormatter": "esbenp.prettier-vscode",
				"editor.codeActionsOnSave": {
					"source.fixAll.eslint": true
				}
			}
		}
	},

	"forwardPorts": [5173, 6006],

	"postCreateCommand": "pnpm install",

	"features": {
		"ghcr.io/devcontainers/features/git:1": {},
		"ghcr.io/devcontainers/features/github-cli:1": {}
	},

	"remoteUser": "node"
}
```

### .devcontainer/docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build:
      context: ..
      dockerfile: .devcontainer/Dockerfile
    volumes:
      - ..:/workspace:cached
      - node_modules:/workspace/node_modules
    environment:
      - NODE_ENV=development
    command: sleep infinity
    network_mode: host

volumes:
  node_modules:
```

### .devcontainer/Dockerfile

```dockerfile
FROM mcr.microsoft.com/devcontainers/typescript-node:20

# pnpm 설치
RUN npm install -g pnpm

# Cloudflare Wrangler CLI 설치
RUN npm install -g wrangler

# 추가 개발 도구
RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 작업 디렉토리
WORKDIR /workspace
```

## 3. Docker Compose를 활용한 개발 환경

### docker-compose.dev.yml

```yaml
version: '3.8'

services:
  # SvelteKit 개발 서버
  sveltekit:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - '5173:5173'
    volumes:
      - .:/workspace
      - /workspace/node_modules
      - pnpm-store:/root/.local/share/pnpm/store
    environment:
      - NODE_ENV=development
      - PUBLIC_API_URL=${PUBLIC_API_URL}
    command: pnpm dev --host

  # Storybook
  storybook:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - '6006:6006'
    volumes:
      - .:/workspace
      - /workspace/node_modules
    command: pnpm storybook

  # 테스트 실행기
  test-runner:
    build:
      context: .
      dockerfile: Dockerfile.dev
    volumes:
      - .:/workspace
      - /workspace/node_modules
    environment:
      - CI=true
    command: pnpm test:unit --watch

volumes:
  pnpm-store:
```

### 개발 환경 실행

```bash
# 전체 개발 환경 시작
docker-compose -f docker-compose.dev.yml up

# 특정 서비스만 실행
docker-compose -f docker-compose.dev.yml up sveltekit

# 백그라운드 실행
docker-compose -f docker-compose.dev.yml up -d
```

## 4. Git 브랜치 관리와 Docker 환경 연동

### 브랜치별 환경 분리 스크립트

```bash
#!/bin/bash
# scripts/docker-branch-env.sh

BRANCH_NAME=$(git branch --show-current)
PROJECT_NAME="xiyo-${BRANCH_NAME//\//-}"

# 브랜치별 .env 파일 생성
if [ ! -f ".env.${BRANCH_NAME}" ]; then
  cp .env.example ".env.${BRANCH_NAME}"
fi

# Docker Compose 실행
docker-compose \
  -p "${PROJECT_NAME}" \
  -f docker-compose.dev.yml \
  --env-file ".env.${BRANCH_NAME}" \
  up -d

echo "Development environment for branch '${BRANCH_NAME}' is running"
echo "Access the app at: http://localhost:5173"
```

### Git Hooks 활용

```bash
# .git/hooks/post-checkout
#!/bin/bash

# 브랜치 변경 시 Docker 환경 재시작
if [ "$3" = "1" ]; then
  echo "Branch changed, restarting Docker environment..."
  ./scripts/docker-branch-env.sh
fi
```

## 5. 클로드 코드와 함께 사용하는 워크플로우

### 1. 초기 환경 설정

```bash
# 1. Dev Container 열기
code . --folder-uri vscode-remote://dev-container+$(pwd)/workspace

# 2. 터미널에서 브랜치 생성
git checkout -b feature/new-feature

# 3. Docker 환경 시작
./scripts/docker-branch-env.sh
```

### 2. 개발 워크플로우

```bash
# Dev Container 내부에서 작업
pnpm dev          # 개발 서버 시작
pnpm test:unit    # 단위 테스트 실행
pnpm build        # 프로덕션 빌드
```

### 3. Cloudflare Workers 로컬 테스트

```bash
# wrangler를 사용한 로컬 테스트
pnpm build
wrangler dev
```

### 4. 환경 변수 관리

```env
# .env.development
PUBLIC_API_URL=http://localhost:8787
CLOUDFLARE_ACCOUNT_ID=your_account_id
```

## 6. 최적화 팁

### pnpm 캐시 최적화

```dockerfile
# 의존성 레이어 캐싱
COPY pnpm-lock.yaml ./
RUN pnpm fetch --frozen-lockfile

# 소스 코드는 나중에 복사
COPY . .
RUN pnpm install --offline --frozen-lockfile
```

### 멀티 스테이지 빌드

```dockerfile
# 빌드 스테이지
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build

# 프로덕션 스테이지
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build ./build
COPY package.json ./
RUN pnpm deploy --prod
```

### 볼륨 마운트 최적화

```yaml
volumes:
  # 소스 코드는 캐시 모드로 마운트
  - .:/workspace:cached
  # node_modules는 컨테이너 내부 볼륨 사용
  - /workspace/node_modules
  # pnpm 스토어 캐싱
  - pnpm-store:/root/.local/share/pnpm/store
```

## 7. 문제 해결

### 일반적인 이슈

1. **포트 충돌**: 다른 프로세스가 5173 포트를 사용 중인 경우

   ```bash
   docker-compose -f docker-compose.dev.yml down
   lsof -i :5173  # 포트 사용 프로세스 확인
   ```

2. **권한 문제**: 파일 권한 이슈

   ```dockerfile
   # Dockerfile에 추가
   RUN chown -R node:node /workspace
   USER node
   ```

3. **메모리 부족**: Docker Desktop 메모리 할당 증가 필요

### 디버깅

```bash
# 컨테이너 로그 확인
docker-compose logs -f sveltekit

# 컨테이너 내부 접속
docker-compose exec sveltekit sh

# 볼륨 정리
docker volume prune
```

## 결론

Docker와 VSCode Dev Containers를 활용하면 xiyo.github.io 프로젝트에서 일관되고 격리된 개발 환경을 구축할 수 있습니다. 브랜치별 환경 분리, pnpm 캐시 최적화, Cloudflare Workers 통합을 통해 효율적인 개발 워크플로우를 구성할 수 있습니다.

2025년 6월부터는 Cloudflare Containers가 공개 베타로 제공되어, Workers와 컨테이너를 함께 사용하는 새로운 배포 옵션도 고려해볼 수 있습니다.
