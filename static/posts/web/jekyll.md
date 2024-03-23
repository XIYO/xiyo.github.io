# jekyll로 블로그 개설하기

[jekyll]은 [github]의 공동 설립자 [Tom Preston-Werner]가 2008년 출시한 정적 사이트 생성기입니다. 공식 문서가 매우 친절하기 때문에 일주일 정도의 노력끝에 블로그를 개설 할 수 있었습니다.

## 시작하기 전에
- 직접 설명 보다는 링크로 설명을 합니다. 명확한 설명은 [jekyll 공식 문서][jekyll]를 참조하세요.
- 맥을 ventura를 기준으로 설명하며, [brew]가 필요합니다.
- markdown[^markdown] 문법을 배워야합니다.
- jekyll은 [ruby] 언어로 만들어진 정적 사이트 생성기입니다.

## 정적 블로그 개설하기

### ruby 설치
jekyll의 공식 [설치] 문서에서 운영체제 종류별 설치 방법을 알려줍니다.  
jekyll은 ruby 2.5.0 이상을 요구하고, mac ventura 에서는 2.6.10가 설치되어 있습니다. 의존성 때문에 ruby를 최신 버전으로 업데이트 하겠습니다.

설치에는 몇 가지 방법이 존재하는데 brew가 관리하는 [rbenv]를 사용해 최신버전의 ruby를 설치하겠습니다.  
brew를 이용해서 ruby를 바로 설치해도 상관없으나 현시점에서는 최신 버전 ruby를 설치할 수 없습니다.

rbenv를 통해 최신 버전을 설치하겠습니다.
1. rbenv 설치 ```brew install rbenv```
3. 3.2.0 버전 설치 ```rbenv install 3.2.0```
4. 로컬 버전 변경 ```rbenv global 3.2.0```
5. 최신 버전 확인 ```ruby -v```

### jekyll 설치
ruby는 [gem]을 통해 패키지를 관리합니다. (앱 이름이 우아합니다...)  
gem으로 jekyll과 [bundler]를 설치하겠습니다.
jekyll은 정적 사이트 생성기고, bundler는 의존성 관리 매니저입니다.
1. gem으로 jekyll과 bundler를 설치합니다. ```gem install jekyll bundler```
2. jekyll 프로젝트를 newblog 디렉토리에 생성합니다. ```jekyll new newblog```
3. 생성한 디렉토리에 접근 하고 ```cd newblog```
4. jekyll을 로컬에서 실행시키면 ```bundle exec jekyll serve```
5. 브라우저에서 http://localhost:4000 으로 접속하면 기본적인 프로젝트가 완성됩니다.

---
[Tom Preston-Werner]: https://github.com/mojombo
[gem]: https://rubygems.org
[jekyll]: https://jekyllrb.com
[ruby]: https://www.ruby-lang.org
[github]: https://github.com
[brew]: https://www.google.com 
[설치]: https://jekyllrb-ko.github.io/docs/installation
[kramdown]: https://kramdown.gettalong.org
[markdown]: https://www.markdownguide.org
[rbenv]: https://github.com/rbenv/rbenv
[bundler]: https://bundler.io

[^markdown]: jekyll은 [kramdown]을 기본 사용