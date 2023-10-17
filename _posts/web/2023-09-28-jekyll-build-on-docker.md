---
title: 지킬 프로젝트 도커로 시작하기
categories: [web]
---
# {{ page.title }}
이 글에서는 지킬을 처음부터 깃허브에 업로드할 때까지, 도커를 활용하는 전체 과정을 설명하겠습니다.

## 배경

프로그래밍을 공부하면서 자료 검색은 빠질 수 없는 활동입니다. 공식 문서, 블로그, 포럼 등 다양한 정보 소스를 참고하게 되는데, 이러한 정보들을 유용하게 조합하거나 추가적인 내용을 덧붙여야 할 필요가 종종 있습니다. 이런 정보들을 체계적으로 관리하고 공유하기 위해 블로그를 시작하려고 결심했습니다.

초기에 워드프레스를 사용해 몇 편의 글을 작성했습니다. 하지만 다양한 자료를 첨부하고, HTML 문법까지 사용해야 해서 생산성이 떨어졌습니다. 또한, 데이터 이전에도 여러 제약사항과 어려움이 있었습니다. 이러한 문제점들을 고려하여 더 효율적인 블로깅 도구를 찾기 시작했고, 지킬을 사용하기로 결정했습니다. 이 글에서는 그 과정을 상세히 기록하려고 합니다.

## 블로깅 도구 선택

### 제약 사항

- 마크다운 지원: 포스팅 작성의 유연성을 위해
- 데이터 소유 가능성: 나중에 이전이 필요할 때를 대비하여
- 이사가기 쉬움: 플랫폼 변경의 유연성을 위해
- 빌드 및 호스팅의 편의성: 빠른 개발과 배포를 위해

### 후보 도구

여러 도구가 있었지만 추려서 두 가지만 호보군으로 선정했습니다.

- Jekyll: Ruby 기반, GitHub Pages의 기본 도구, 다양한 테마와 플러그인 지원
- Notion: Wysiwyg 에디터로 문서 작성, 플러그인 제작과 디자인 변경, 데이터 이전에 제약이 많음

### 최종 선택

jekyll을 확장성과 편리성을 고려하여 선택했습니다.
그러나 빌드에 대한 배경 지식이 없어서 많은 이슈가 있었고, 이를 해결하기 위해서는 다시 열심히 여러 자료를 찾아봐야 했습니다.

## 환경 구성

### 요구 사항

- 맥의 경우 `zsh`, 윈도우의 경우 `PowerShell`을 사용할 수 있어야 합니다.
- 도커 패키지 설치 및 `docker cli`의 사용 방법을 알고 있어야 합니다.

### 알아두기

유명한 지킬 도커 이미지는 [jekyll/jekyll](https://hub.docker.com/r/jekyll/jekyll) 입니다. 하지만, __업데이트가 중단된 상태라서__ 다른 개발자가 이 프로젝트를 포크하여 이슈를 해결하고 있습니다.

이 문서에서는 jvconsil 의 [도커허브](https://hub.docker.com/r/jvconseil/jekyll-docker) 이미지를 사용하겠습니다. [깃허브](https://github.com/JV-conseil/jekyll-docker)에 소스 코드가 공개 되어 있습니다.

### 시작하기

지킬 도커 이미지를 컨테이너로 만듭니다.  
도커 가이드에서 `윈도우`는 `Git Bash`를 사용하지만 이 가이드 에서는 `PowerShell`을 사용하겠습니다.

#### 프로젝트 생성

지킬 보일러 플레이트 코드를 도커를 이용해 빠르게 생성할 수 있습니다.

__Mac zsh__

```shell
SITE_NAME="my-jekyll"
docker run --rm \
--volume="$PWD:/srv/jekyll" \
jvconseil/jekyll-docker \
jekyll new $SITE_NAME \
&& cd $SITE_NAME
```

- `SITE_NAME="my-jekyll"`: 생성할 지킬 프로젝트의 이름을 "my-jekyll"로 설정합니다.
- `docker run --rm`: 임시로 지킬 도커 컨테이너를 실행합니다. 작업이 완료되면 컨테이너가 자동으로 삭제됩니다.
- `--volume="$PWD:/srv/jekyll"`: 현재 작업 디렉토리(`$PWD`)를 컨테이너 내의 `/srv/jekyll` 디렉토리와 볼륨으로 연결합니다.
- `jekyll new $SITE_NAME`: 지킬 프로젝트를 생성합니다.
- `&& cd $SITE_NAME`: 지킬 프로젝트가 성공적으로 생성되면 해당 디렉토리로 이동합니다.

__Windows PowerShell__

```powershell
$SITE_NAME="my-jekyll"
docker run --rm `
--volume="$(Get-Location):/srv/jekyll" `
jvconseil/jekyll-docker `
jekyll new $SITE_NAME `
&& Set-Location $SITE_NAME
```

- `$SITE_NAME = "my-jekyll"`: 생성할 지킬 프로젝트의 이름을 "my-jekyll"로 설정합니다.
- `docker run --rm`: 임시로 지킬 도커 컨테이너를 실행합니다. 작업이 완료되면 컨테이너가 자동으로 삭제됩니다.
- `--volume="$(Get-Location):/srv/jekyll"`: 현재 작업 디렉토리를 컨테이너 내의 `/srv/jekyll` 디렉토리와 볼륨으로 연결합니다.
- `jekyll new $SITE_NAME`: 지킬 프로젝트를 생성합니다.
- `&& Set-Location $SITE_NAME`: 지킬 프로젝트가 성공적으로 생성되면 해당 디렉토리로 이동합니다.

#### 빌드 및 웹 서버 실행

지킬 빌드와 웹 서버 실행을 도커로 실행합니다.

__Mac zsh__

```shell
docker run --rm \
--volume="$PWD:/srv/jekyll" \
-p 4000:4000 \
-p 35729:35729 \
jvconseil/jekyll-docker \
jekyll serve --livereload
```

- `docker run --rm`: 임시로 지킬 도커 컨테이너를 실행합니다. 작업이 완료되면 컨테이너가 자동으로 삭제됩니다.
- `--volume="$PWD:/srv/jekyll"`: 현재 작업 디렉토리(`$PWD`)를 컨테이너 내의 `/srv/jekyll` 디렉토리와 볼륨으로 연결합니다.
- `-p 4000:4000`: 로컬의 4000 포트와 컨테이너의 4000 포트를 매핑합니다. 웹 서버가 이 포트에서 실행됩니다.
- `-p 35729:35729`: LiveReload 기능을 위한 포트 매핑입니다.
- `jekyll serve --livereload`: 지킬 웹 서버를 실행하며, 파일 변경을 감지하면 자동으로 브라우저를 새로고침합니다.

__Windows PowerShell__

```powershell
docker run --rm `
--volume="$(Get-Location):/srv/jekyll" `
-p 4000:4000 `
-p 35729:35729 `
jvconseil/jekyll-docker `
jekyll serve --livereload --force_polling
```

- `docker run --rm`: 임시로 지킬 도커 컨테이너를 실행합니다. 작업이 완료되면 컨테이너가 자동으로 삭제됩니다.
- `--volume="$(Get-Location):/srv/jekyll"`: 현재 작업 디렉토리를 컨테이너 내의 `/srv/jekyll` 디렉토리와 볼륨으로 연결합니다.
- `-p 4000:4000`: 로컬의 4000 포트와 컨테이너의 4000 포트를 매핑합니다. 웹 서버가 이 포트에서 실행됩니다.
- `-p 35729:35729`: LiveReload 기능을 위한 포트 매핑입니다.
- `jekyll serve --livereload --force_polling`: 지킬 웹 서버를 실행하며, 파일 변경을 감지하면 자동으로 브라우저를 새로고침합니다.  
  - `--force_polling`: 윈도우에서는 리눅스와 파일 시스템이 다르기 때문에 파일 수정을 감지할 수 없어 페이지 리로드가 안 됩니다. 이 옵션을 추가하면 주기적으로 파일을 변경을 스케줄링으로 검사 합니다.

#### 접속하기

빌드와 서버 실행이 끝나면 [http://127.0.0.1:4000](http://127.0.0.1:4000)으로 접속하면 됩니다.  
또, 와일드 카드 주소로 열려 있어 외부에서도 접속 가능합니다.

__결과__

```text
Use `bundle info [gemname]` to see where a bundled gem is installed.
ruby 3.2.2 (2023-03-30 revision e51014f9c0) [x86_64-linux-musl]
Configuration file: /srv/jekyll/_config.yml
            Source: /srv/jekyll
       Destination: /srv/jekyll/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
                    done in 1.81 seconds.
 Auto-regeneration: enabled for '/srv/jekyll'
LiveReload address: http://0.0.0.0:35729
    Server address: http://0.0.0.0:4000 # 모든 접근에 대해서 열려 있습니다.
  Server running... press ctrl-c to stop.
```

### 업데이트

종속성을 업데이트 하려면 `bundle update`를 실행합니다.

__Mac zsh__

```shell
docker run --rm \
--volume="$PWD:/srv/jekyll" \
jvconseil/jekyll-docker \
bundle update
```

__Windows PowerShell__

```powershell
docker run --rm `
--volume="$(Get-Location):/srv/jekyll" `
jvconseil/jekyll-docker `
bundle update
```

### 캐싱

지킬 도커에서 캐싱을 활성화하려면, 도커 `--volume` 옵션을 사용하여 이미지 내부의 `/usr/local/bundle` 디렉토리를 지정할 수 있습니다.

__Mac zsh__

```shell
docker run --rm \
--volume="$PWD:/srv/jekyll" \
--volume="$PWD/vendor/bundle:/usr/local/bundle" \
-p 4000:4000 \
-p 35729:35729 \
jvconseil/jekyll-docker \
jekyll serve --livereload
```

__Windows PowerShell__

```powershell
docker run --rm `
--volume="$(Get-Location):/srv/jekyll" `
--volume="$(Get-Location)/vendor/bundle:/usr/local/bundle" `
-p 4000:4000 `
-p 35729:35729 `
jvconseil/jekyll-docker `
jekyll serve --livereload --force_polling
```
