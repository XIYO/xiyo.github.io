# blog.xiyo.dev

깃허브 페이지스 프로젝트

## 디렉토리 구조

Jekyll의 디렉토리와 파일 구조는 매우 유연합니다. 하지만 기본적으로 몇몇 특별한 디렉토리와 파일이 존재합니다. 아래는 Jekyll 프로젝트에 대한 일반적인 디렉토리와 파일 구조에 대한 설명입니다.

### `_data`

YAML, JSON, CSV 등의 데이터 파일을 저장하며, 이 데이터는 Jekyll 사이트에서 사용될 수 있습니다.

### `_drafts`

아직 게시되지 않은 글의 초안을 저장합니다. 이 디렉토리의 파일들은 `jekyll build`나 `jekyll serve` 명령을 실행할 때 기본적으로 빌드되지 않습니다.

### `_includes`

재사용 가능한 컴포넌트(헤더, 푸터 등)를 저장합니다. 이 디렉토리의 파일들은 `{% include file.ext %}` 태그를 사용하여 레이아웃이나 포스트에서 불러올 수 있습니다.

### `_layouts`

기본 레이아웃을 저장합니다. 마크다운 파일이나 HTML 파일에서 `layout` 메타데이터를 통해 이 레이아웃을 사용할 수 있습니다.

### `_posts`

블로그 포스트를 저장합니다. 파일은 일반적으로 `YYYY-MM-DD-title-of-my-post.md` 형태의 이름을 가집니다.

### `_sass`

Sass 파일을 저장합니다. 이 디렉토리의 Sass 파일들은 `_layouts` 또는 `_includes`의 CSS 파일에서 임포트할 수 있습니다.

### `_site`

`jekyll build` 명령을 실행하면 생성되는 디렉토리입니다. 이곳에는 최종적으로 빌드된 사이트의 모든 파일이 저장됩니다.

### `.github`

GitHub과 관련된 설정 파일을 저장합니다. 예를 들어, GitHub Actions을 사용하려면 이 디렉토리에 설정 파일을 저장할 수 있습니다.

### `.jekyll-cache`

Jekyll 빌드 과정에서 캐싱을 위해 사용되는 디렉토리입니다.

### `assets`

정적 파일(이미지, CSS, JavaScript 등)을 저장합니다.

### `_config.yml`

Jekyll 설정을 저장하는 YAML 파일입니다.

### `.gitignore`

Git으로 추적하지 않을 파일이나 디렉토리를 지정합니다.

### `about.md`, `index.md`, `posts.html`

이 파일들은 일반적으로 루트에 위치하며, 각각 특정 URL로 접근될 때 보여지는 페이지입니다.

### `CNAME`

사용자 지정 도메인을 설정하는데 사용됩니다.

### `Gemfile`, `Gemfile.lock`

Ruby 패키지(젬) 관리를 위한 파일입니다.

## RUN

`Windows`에서 테스트할 때는 볼륨 옵션으로 연결시 초기 읽기 속도가 느리기 때문에 도커 컨테이너를 만들고 유지해서 사용해야 합니다. (**다른 OS도 확인 필요**)

- docker
  - `docker-compose.yaml`를 이용해서 저장된 설정을 불러와서 컨테이너 생성:

  ```shell
  docker compose up -d
  ```

  - `docker run`을 이용하여 컨테이너 생성:
    - PowerShell

    ```powershell
    docker run `
    --name jekyll `
    --volume="$(Get-Location):/srv/jekyll" `
    --volume="$(Get-Location)/vendor/bundle:/usr/local/bundle" `
    -p 4000:4000 `
    -p 35729:35729 `
    jvconseil/jekyll-docker `
    jekyll serve --livereload --force_polling --drafts --incremental
    ```

    `Windows` 환경에서 `docker`를 사용할 경우 `--livereload`는 `--force_polling` 옵션 함께 사용해야 합니다.  
    가상화 기술이 `Windows` 파일 시스템과 안 맞는 부분이 있어 파일 감지 기능이 정상 작동하지 않습니다.  
    `--force_polling`을 이용해 강제로 파일의 변화를 감지해야 `--livereload` 기능이 동작합니다.

    - bash

    ```bash
    docker run \
    --name jekyll \
    --volume="$PWD:/srv/jekyll" \
    --volume="$PWD/vendor/bundle:/usr/local/bundle" \
    -p 4000:4000 \
    -p 35729:35729 \
    jvconseil/jekyll-docker \
    jekyll serve --livereload --drafts --incremental
    ```

## ADD JEKYLL PLUGIN

- docker
  - PowerShell

    ```powershell
    docker exec jekyll bundle add jekyll-admin --group jekyll_plugins `
    && docker restart jekyll
    ```

    현재 실행중인 `jekyll` 이름의 도커 컨테이너에서 `jekyll-admin`을 추가합니다.  
    그리고 `jekyll` 컨테이너를 재시작합니다.

  - bash

    ```shell
    docker exec jekyll bundle add jekyll-admin --group jekyll_plugins \
    && docker restart jekyll
    ```

    현재 실행중인 `jekyll` 이름의 도커 컨테이너에서 `jekyll-admin`을 추가합니다.  
    그리고 `jekyll` 컨테이너를 재시작합니다.

## REMOVE JEKYLL PLUGIN

- docker
  - PowerShell

    ```powershell
    docker exec jekyll bundle remove jekyll-admin `
    && docker restart jekyll
    ```

    현재 실행중인 `jekyll` 이름의 도커 컨테이너에서 `jekyll-admin`을 제거합니다.  
    그리고 `jekyll` 컨테이너를 재시작합니다.

  - bash

    ```shell
    docker exec jekyll bundle remove jekyll-admin \
    && docker restart jekyll
    ```

    현재 실행중인 `jekyll` 이름의 도커 컨테이너에서 `jekyll-admin`을 제거합니다.
    그리고 `jekyll` 컨테이너를 재시작합니다.

## UPDATE JEKYLL PLUGIN

- docker
  - 모든 `gem`을 업데이트하는 방법:
    - PowerShell

      ```powershell
      docker exec jekyll bundle update `
      && docker restart jekyll
      ```

    - bash

    ```bash
    docker exec jekyll bundle update \
    && docker restart jekyll
    ```

  - 특정 `gem` 업데이트하는 방법:
    - PowerShell

    ```powershell
    docker exec jekyll bundle update jekyll-admin `
    && docker restart jekyll
    ```

    - bash

    ```bash
    docker exec jekyll bundle update jekyll-admin \
    && docker restart jekyll
    ```

## STOP

- docker
  - PowerShell

  ```powershell
  docker stop jekyll
  ```

  - bash

  ```bash
  docker stop jekyll
  ```

## START

이미 존재하는 컨테이너를 시작합니다.

- docker
  - PowerShell

  ```powershell
  docker start jekyll
  ```

  - bash

  ```bash
  docker start jekyll
  ```

## REMOVE

존재하는 컨테이너를 삭제합니다.

- docker
  - PowerShell

  ```powershell
  docker rm jekyll
  ```

  - bash

  ```bash
  docker rm jekyll
  ```

## OUTPUT

컨테이너의 출력을 확인합니다.  
`ctrl` + `c`는 컨테이너에  `SIGINT`를 보내서 컨테이너를 종료합니다.

> 컨테이너 실행시 `-it` 옵션을 사용했다면 `ctrl` + `p`, `ctrl` + `q`를 이용해 컨테이너를 종료하지 않고 빠져나올 수 있습니다.

- docker
  - PowerShell

  ```powershell
  docker attach jekyll
  ```

  - bash

  ```bash
  docker attach jekyll
  ```

## LOGS

컨테이너의 현재까지의 로그를 확인합니다.

- docker
  - PowerShell

  ```powershell
  docker logs jekyll
  ```

  - bash

  ```bash
  docker logs jekyll
  ```
