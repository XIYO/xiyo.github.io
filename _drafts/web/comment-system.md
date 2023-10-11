---
title: 댓글 서비스 고르기
---
# {{ page.title }}

`jekyll`을 운영하면서 글을 쓰다보면 일방적인 글 보다는 소통 가능한,  
글이 살아있는 듯한, 방치된 문서가 아닌 관리하는 느낌을 주고싶었습니다.

## 고려사항

최초의 댓글 서비스를 찾은것은 [`Disqus`](https://disqus.com/)입니다.

가장 유명한 댓글 서비스이며,  
**일정량은 무료**로 사용가능하고 정적 웹 사이트도 쉽게 적용할 수 있습니다.  
하지만 일정량 무료라는 것은 **일정량 초과시 유료 서비스로 전환**을 하거나,  
이사를 가야하는 번거로움이 생기며 이사할 때는 **댓글 데이터를 가져갈 수 없습니다.**

댓글 서비스를 고르는 기준은 다음과 같습니다.

- **오픈 소스**  
  서비스의 종료나 변경에 대비할 수 있어야 합니다.
- **마지막 업데이트 날짜**  
  커밋이나 업데이트가 1년 이내여야 합니다.  
  1년을 넘긴 프로젝트는 더이상 관리되지 않는 프로젝트일 가능성이 높습니다.
- **데이터 소유**  
  댓글 데이터를 통제할 수 있어야 합니다.
- **완전 무료**  
  유로서비스를 이용할만큼의 가치를 가지기 전에는 부담이 되지 않아야 합니다.
- **익명 글쓰기 지원**  
  누구나 댓글을 쓸 수 있어야 소통을 원활히 할 수 있습니다.
- **이메일 피드백**  
  댓글을 쓴 사람에게도 피드백을 할 수 있어야 합니다.

이런 기준을 가지고 블로그에 댓글 서비스를 적용했습니다.

## 종류

### 일부 무료

| 기능 | [Disqus](https://disqus.com/) | [Utterances](https://utteranc.es/) | [Staticman](https://staticman.net/) | [Giscus](https://giscus.app/) | [Commento](https://commento.io/) | [CommentBox](https://commentbox.io/) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| 저장소 | `Disqus` | `Github` | `Files` | `Github` | `Database` | `CommentBox` |
| 완전 무료 | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| 익명 글쓰기 | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ |
| 이메일 발송 | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ |
| 소셜 로그인 | ✅ | ❌ | ❌ | ✅ | ✅ | ✅ |

| 기능 | [Disqus](https://disqus.com/) | [Utterances](https://utteranc.es/) | [Staticman](https://staticman.net/) | [Giscus](https://giscus.app/) | [Commento](https://commento.io/) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| 오픈 소스 | ❌ | ✅ | ✅ | ✅ | ✅ |
| 셀프 호스팅 | ❌ | ❌ | ✅ | ✅ | ✅ |
| 데이터 저장 위치 | Disqus | GitHub | GitHub self | GitHub | self or Commento's servers |
| 완전 무료 | ❌ | ✅ | ✅ | ✅ | ❌ (Self-hosted can be free) |
| 익명 글쓰기 지원 | ✅ | ❌ | ❌ | ✅ | ✅ |
| 이메일 발송 | ✅ | ❌ | ✅ | ✅ | ✅ |
| 소셜 로그인 | ✅ | ❌ | ❌ | ✅ | (OAuth login supported) |

