---
layout: post
title: jekyll 기반 블로그에 syntax highlight 추가
description: syntax highlight CSS 추가하여 문서에 포함된 코드를 좀 더 읽기 쉽게 합니다.
author: XIYO
tags:
  [
    ruby,
    rouge,
    jekyll,
    jekyll plugin,
    syntax highlight,
    syntax highlighter,
    code highlight,
    code highlighter
  ]
categories: [posts, jekyll]
---

{{ page.description }}

[공식 문서] 에 따르면, jekyll 3 버전 이상 부터 syntax highlight process 인 [rouge] 가 기본으로 변경되었습니다.
jekyll 3.0 버전 이상을 사용 중 이면 추가 설정없이 CSS 만 추가하면 됩니다.

> syntax highlight process 를 [coderay] 로 전환 할 수 있습니다. 둘을 써보니 coderay 는 liquid 문법만 syntax highlight 가능합니다.

## CSS 설치

rouge 는 [pygments] 라는 python 용 syntax highlight process 화 호환됩니다.

1. 아래 두 사이트에서 마음에 드는 CSS를 내려받습니다.
   - [payments theme css]
   - [rough theme css]
2. 다운받은 CSS를 jekyll 프로젝트에 적용하면 됩니다.  
   jekyll 의 기본 레이아웃, default.html 의 meta 태그 사이에 css 를 추가하겠습니다.
   ```css
   <link rel="stylesheet" href="/assets/css/monokai.css">
   ```

## 문서 작성 방법

jekyll의 기본 마크 다운 문법은 [git flavored markdown] 입니다.

> 다른 마크다운을 사용하기 위해서는 새로운 plugin 이나 parser 를 프로젝트에 추가해야 합니다. jekyll 홈페이지에는 기본내장 마크다운 프로세서인, [kramdown processor]에 대한 자세한 설명과 링크가 있습니다.

syntax highlight 를 위해서는 총 두 가지 방법이 있는데,

#

1. 마크다운 문서에 코드용 글을 삽입합니다.

{% highlight ruby linenos %}
def foo
puts 'foo'
end
{% endhighlight %}

[pygments]: https://pygments.org
[kramdown processor]: https://github.github.com/gfm
[git flavored markdown]: https://github.github.com/gfm
[coderay]: https://jekyllrb.com/docs/configuration/markdown/#syntax-highlighting-coderay
[rouge]: https://github.com/rouge-ruby/rouge
[공식 문서]: https://jekyllrb.com/docs/liquid/tags/#code-snippet-highlighting
[Sunil Sarolkar]: https://spsarolkar.github.io
[rough theme css]: https://spsarolkar.github.io/rouge-theme-preview
[payments theme css]: https://jwarby.github.io/jekyll-pygments-themes/languages/ruby.html
[jekll rough]: https://jekyllrb.com/docs/liquid/tags/#code-snippet-highlighting
