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



## 실행
로컬에서 루비를 설치하는 것은 나를 너무 힘들게 하니까 도커로 실행합니다.  
jekyll docker로 검색하면 나오는 깃허브 프로젝트는 침몰했음.
거기서 활동하는 다른 개발자의 도움으로 만든 docker 이미지를 사용함.
[jvconseil/jekyll-docker](https://hub.docker.com/r/jvconseil/jekyll-docker)

[![asciicast](https://asciinema.xiyo.dev/a/11.svg)](https://asciinema.xiyo.dev/a/11)
```sh
cd ~/Projects/xiyo.github.io
docker run --rm \
  --name my-blog \
  --volume="$PWD:/srv/jekyll:Z" \
  -p 4000:4000 \
  -it jvconseil/jekyll-docker \
  jekyll serve --livereload
```

__Windows PowerShell__
```powershell
cd ~/Projects/xiyo.github.io
docker run --rm --volume="$(Get-Location):/srv/jekyll:Z" -it -p 4000:4000 jvconseil/jekyll-docker jekyll serve --livereload
```

## 업데이트
최신 버전의 도로 프로젝트 업데이트
[![asciicast](https://asciinema.xiyo.dev/a/10.svg)](https://asciinema.xiyo.dev/a/10)
```sh
cd ~/Projects/xiyo.github.io
docker run --rm \
  --volume="$PWD:/srv/jekyll:Z" \
  -it jvconseil/jekyll-docker \
  bundle update
```

__Windows PowerShell__
```sh
docker run --rm --volume="$(Get-Location):/srv/jekyll:Z" -it jvconseil/jekyll-docker bundle  lock --add-platform x86_64-linux
```