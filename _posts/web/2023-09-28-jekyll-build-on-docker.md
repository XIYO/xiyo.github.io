---
title: 지킬 프로젝트 도커로 시작하기
---
# {{ page.title }}
맥과 윈도우를 번갈아 가며 사용하는 환경에 있어, 빌드의 편리성이 필요했습니다.  
도커를 이용해 지킬을 구성하고 빌드하는 방법을 알아보겠습니다.

## 요구사항
- 맥의 경우 zsh, 윈도우의 경우 PowerShell을 사용할 수 있어야 합니다.
- 도커 패키지 설치 및 사용 방법을 알고 있어야 합니다.

## 방법
### 알아두기

공식 도커 이미지가 없기 때문에 비공식 [도커허브](https://hub.docker.com/r/jvconseil/jekyll-docker) 이미지를 사용하겠습니다. [깃허브](https://github.com/JV-conseil/jekyll-docker)에 소스코드가 공개 되어 있습니다.

### 시작하기
지킬 도커 이미지를 컨테이너로 만듭니다.  
도커 가이드에서 `윈도우`는 `Git Bash`를 사용하지만 이 가이드 에서는 `PowerShell`을 사용하겠습니다.

<!-- 0. 디렉토리 생성

    지킬 프로젝트를 구성할 디렉토리를 만들고 이동합니다.
    
    - __Mac zsh__
    ```shell
    mkdir -p "$HOME/Projects" \
    && cd "$_"
    ```

    - __Windows PowerShell__
    ```powershell
    New-Item -ItemType Directory `
    -Path "$HOME\Projects" `
    | Set-Location
    ``` -->

#### 지킬 프로젝트 생성
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
```sh
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

#### 업데이트
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

#### 캐싱
지킬 도커에서 캐싱을 활성화하려면, 도커 `--volume` 옵션을 사용하여 이미지 내부의 `/usr/local/bundle` 디렉토리를 지정할 수 있습니다. 이는 CI(지속적 통합)에서 빌드를 빠르게 수행하려는 사용자에게 이상적입니다.

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