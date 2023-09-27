---
title: 도커에서 지킬 빌드하기
---
# {{ page.title }}
맥과 윈도우를 번갈아 가며 사용하는 환경에 있어, 빌드의 편리성이 필요했습니다.  
도커를 이용해 지킬을 구성하고 빌드하는 방법을 알아보겠습니다.

## 요구사항
- 쉘 명령어 사용 방법
- 도커 패키지 설치 및 사용 방법

## 방법
### 알아두기
공식 도커 이미지는 더 이상 업데이트되지 않고 있습니다.  
다른 개발자의 [도커허브](https://hub.docker.com/r/jvconseil/jekyll-docker) 이미지를 사용했습니다.

> 공식 [도커허브](https://hub.docker.com/r/jekyll/jekyll/)와 [깃허브](https://github.com/envygeeks/jekyll-docker)는 업데이트가 없습니다.

### 지킬 프로젝트 생성
지킬 보일러 플레이트를 생성합니다.

__asciinema__
<script async id="asciicast-14" src="https://asciinema.xiyo.dev/a/14.js"></script>

__Mac zsh__
```zsh
docker run --rm -it \
--volume="$PWD:/srv/jekyll" \
jvconseil/jekyll-docker \
jekyll new my-blog
```

__Windows PowerShell__
```powershell
docker run --rm -it `
--volume="$(Get-Location):/srv/jekyll" `
jvconseil/jekyll-docker `
jekyll new my-blog
```

### 도커 이미지 빌드
```sh

```