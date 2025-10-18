---
title: Git & GitHub 설정
authors:
  - XIYO
tags:
  - mac-setup
  - git
  - github
  - version-control
  - ssh
  - github-cli
lastModified: 2025-07-27T21:20:48Z
published: 2025-07-22T00:14:46Z
---

# Git & GitHub 설정

> [!NOTE]
> **사전 요구사항**
> [개발자 필수 도구 설치](macos-step01-essential-developer-tools)가 완료되어야 합니다.

## Git 기본 설정

### 사용자 정보 설정

Git 커밋에 사용될 이름과 이메일을 설정합니다.

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

> [!TIP]
> GitHub 계정과 동일한 이메일을 사용하는 것을 권장합니다.
> 달라도 되지만 누가 커밋했는지 빠르게 알기 어렵습니다.

### 기본 브랜치 이름 설정

GitHub의 기본 브랜치 이름과 일치시킵니다.

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:

```bash
git config --global init.defaultBranch main
```

> [!INFO]
> **왜 Git은 기본 브랜치가 master로 생성되고 GitHub는 main으로 생성되나요?**
>
> 'master'라는 용어가 master/slave(주인/노예)를 연상시킬 수 있어, 2020년부터 GitHub를 비롯한 많은 서비스들이 더 중립적인 'main'으로 변경했습니다.
>
> Git 자체는 하위 호환성을 중시하여 아직 기본값을 변경하지 않았지만, 사용자가 직접 설정을 변경할 수 있도록 옵션을 제공합니다.
> 위 명령어로 Git의 기본 브랜치도 'main'으로 설정하여 GitHub와 일치시킬 수 있습니다.

### 줄바꿈 처리 설정

Windows 사용자와 협업 시 줄바꿈 문자 차이로 인한 문제를 방지합니다.
서버는 대부분 Unix/Linux이므로 **Windows 사용자가 맞춰야 하며, Mac/Linux 사용자끼리만 협업한다면 이 설정은 불필요**합니다.

다른 OS와 협업하는 경우에만 아래 명령어를 실행하세요:

```bash
git config --global core.autocrlf input
```

> [!WARNING]
> **Windows 사용자 필수 설정**
>
> 협업 프로젝트에 여러 OS가 섞여있고 Windows 사용자가 있다면,
> **반드시 Windows 사용자만** `git config --global core.autocrlf true`를 실행해야 합니다.
> [!INFO]
> **줄바꿈 차이로 인한 문제**
>
> Windows와 Unix/Linux 간의 줄바꿈 방식이 다르면, 실제 코드는 변경하지 않았는데도
> 파일 전체가 수정된 것처럼 스테이지에 올라갑니다.
>
> **왜 문제가 되나요?**
>
> - IntelliJ 같은 개발 도구는 줄바꿈 기호를 표시하지 않아 무엇이 변경됐는지 알 수 없습니다
> - 매번 체크아웃할 때마다 줄바꿈이 자동 변환되어 불필요한 변경사항이 생깁니다
> - 실제 코드 변경사항을 찾기 어려워 코드 리뷰가 힘들어집니다
>
> 위 설정을 하면 체크아웃 시 해당 OS에 맞게 변환하고, 커밋 시 Unix 방식(LF)으로 통일하여
> 이런 혼란을 방지할 수 있습니다.

## GitHub CLI(gh)란?

GitHub CLI는 웹 브라우저를 열지 않고도 터미널에서 직접 GitHub의 모든 기능을 사용할 수 있게 해주는 공식 도구입니다.
PR 생성, 이슈 관리, 저장소 클론 등을 명령어로 처리할 수 있어 개발 흐름을 방해받지 않습니다.

### GitHub CLI 로그인

GitHub CLI를 사용하려면 먼저 현재 컴퓨터에 GitHub 인증 정보를 저장해야 합니다.
이 과정을 한 번만 거치면 이후 모든 GitHub 작업을 인증 없이 수행할 수 있습니다.

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:

```bash
gh auth login
```

> [!INFO]
> **gh 로그인의 장점**
>
> GitHub CLI로 로그인하면 인증 정보가 시스템에 안전하게 저장됩니다.
> 이후 `git push`나 `git pull` 같은 명령어 사용 시:
>
> - 매번 사용자명과 비밀번호를 입력할 필요가 없습니다
> - 복잡한 Personal Access Token 발급 과정을 생략할 수 있습니다
> - 터미널에서 바로 PR 생성, 이슈 관리 등 GitHub 기능을 사용할 수 있습니다
>
> 하지만 CLI 불편하다고 브라우저만 고집하는 코린이들 🥲

인증 과정에서 선택할 옵션:

1. **What account do you want to log into?** → GitHub.com
2. **What is your preferred protocol for Git operations?** → HTTPS
3. **Authenticate Git with your GitHub credentials?** → Y
4. **How would you like to authenticate GitHub CLI?** → Login with a web browser

### 인증 확인

GitHub 인증이 성공적으로 완료되었는지 확인합니다.

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:

```bash
gh auth status
```

## SSH 키 설정

SSH(Secure Shell)는 암호화된 통신을 위한 프로토콜입니다.
GitHub에서는 비밀번호 대신 SSH 키를 사용하여 더 안전하고 편리하게 인증할 수 있습니다.

> [!INFO]
> **SSH 설정은 선택사항입니다**
>
> - **gh CLI에서 HTTPS로 이미 인증했다면**: 하지 않아도 됩니다
> - **SSH를 선호한다면**: 아래 단계를 따라 설정하세요
> - **기업 환경**: 보안을 중요시하는 환경에서는 HTTPS를 허용하지 않고 SSH만 허용합니다

### SSH 키란 무엇인가요?

SSH 키는 비밀번호를 대체하는 디지털 신분증입니다.
실제 열쇠처럼 **비밀키**(private key)와 **공개키**(public key) 한 쌍으로 구성됩니다:

- **비밀키**: 내 컴퓨터에만 보관하는 열쇠 (절대 공유하면 안 됨!)
- **공개키**: GitHub에 등록하는 자물쇠 (공유해도 안전함)

GitHub에 공개키를 등록하면, 내 컴퓨터의 비밀키와 짝이 맞을 때만 접속을 허용합니다.
마치 내 열쇠로만 열리는 자물쇠를 GitHub에 설치하는 것과 같습니다.

### SSH 키 생성

새로운 SSH 키를 생성합니다.

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:

```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```

Enter를 3번 눌러 기본값으로 진행합니다.

> [!INFO]
> **명령어 옵션 설명**
>
> - `-t ed25519`: 암호화 알고리즘 타입 지정 (ed25519는 현재 가장 안전하고 빠른 알고리즘, 최신 macOS의 기본값이므로 생략 가능)
> - `-C "your.email@example.com"`: 키를 식별하기 위한 주석 (생략 시 Mac 이름이 자동으로 들어가므로 생략 가능)
> [!WARNING]
> **SSH 키 패스워드는 설정하지 마세요!**
>
> SSH 키 생성 시 패스워드를 설정할 수 있지만, 초보자는 절대 설정하지 않는 것을 권장합니다.
> 패스워드를 잊어버리면 키를 사용할 수 없어 매우 고생합니다.
>
> DevOps 전문가가 된 후에 보안 강화를 위해 패스워드 설정을 고려하세요.
> (하지만 그런 상황이 영영 오지 않을지도...😅)

### 키 생성 후 확인하기

키 생성이 완료되면 `~/.ssh/` 폴더에 두 개의 파일이 생성됩니다:

- `id_ed25519` - **비밀키** (절대 공유 금지!)
- `id_ed25519.pub` - **공개키** (`.pub` 확장자가 붙은 것이 공개키)

> [!INFO]
> **macOS에서 SSH 키 확인하기**
>
> 이 파일들은 숨김 폴더에 있어 Finder에서 보이지 않습니다.
> 터미널에서 `ls -la ~/.ssh/`로 확인할 수 있습니다.

### SSH 키를 GitHub에 추가

생성된 SSH 공개키를 GitHub 계정에 추가합니다.

> [!INFO]
> **SSH 키를 GitHub에 추가한다는 것은?**
>
> 앞서 생성한 공개키(`id_ed25519.pub`)를 GitHub 계정에 등록하는 과정입니다.
> 이는 마치 GitHub 서버에 "이 열쇠(비밀키)를 가진 사람만 내 계정에 접근을 허용해주세요"라고
> 자물쇠(공개키)를 맡기는 것과 같습니다.
>
> 등록 후에는 터미널에서 `git push`, `git pull` 등을 할 때
> 비밀번호 입력 없이 자동으로 인증됩니다.

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:

```bash
gh ssh-key add ~/.ssh/id_ed25519.pub --title "My Mac"
```

## 설정 확인

모든 Git 설정이 올바르게 되었는지 확인합니다.

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:

```bash
git config --list
```

아래와 비슷한 내용이 표시되면 설정이 올바르게 완료된 것입니다:

```text
user.name=Your Name
user.email=your.email@example.com
init.defaultbranch=main
core.autocrlf=input
```

> [!INFO]
> **설정 확인 포인트**
>
> - `user.name`과 `user.email`이 올바르게 설정됨
> - `init.defaultbranch=main`으로 기본 브랜치가 설정됨
> - `core.autocrlf=input`으로 줄바꿈 처리가 설정됨 (Windows 사용자와 협업 시)
>
## GitHub CLI로 저장소 생성하기

설정이 완료되었다면 이제 gh 명령어로 GitHub 저장소를 쉽게 만들 수 있습니다.

### 현재 디렉토리를 GitHub에 올리기

> [!DANGER]
> **중요한 정보가 있다면 반드시 private으로 생성하세요!**
>
> API 키, 비밀번호, 개인정보 등이 포함된 프로젝트는 반드시 private 저장소로 만들어야 합니다.
> public으로 만들면 전 세계 누구나 볼 수 있습니다.

```bash
# 현재 디렉토리를 private 저장소로 생성하고 바로 push (기본 권장)
gh repo create my-project --private --source=. --remote=origin --push
```

> [!INFO]
> **저장소 공개 범위 옵션**
>
> - `--private`: 본인과 초대된 사람만 볼 수 있음 (기본 권장)
> - `--public`: 전 세계 누구나 볼 수 있음
> - `--internal`: 조직 내부 멤버만 볼 수 있음 (조직 계정 전용)

### 새 저장소 만들고 클론하기

```bash
# GitHub에 저장소만 먼저 생성
gh repo create my-new-project --public --clone
```

### 유용한 gh 명령어들

```bash
# 저장소 목록 보기
gh repo list

# 브라우저에서 저장소 열기
gh repo view --web

# PR 생성하기
gh pr create

# 이슈 목록 보기
gh issue list
```

[돌아가기](macos-step01-essential-developer-tools)
