# xiyo.github.io

깃허브 페이지스 프로젝트입니다.

## 실행
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