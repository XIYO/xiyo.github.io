---
title: CUSTOM DDNS
description: ⛳ `asuswrt-merlin`의 `webUI`에서 지원하지 않는 `DDNS`를 사용하는 방법을 알아봅니다.
---
# {{ page.title }}

{{ page.description }}

초기에는 [Google Domain]을 사용했습니다. \
`webUI`에서 지원했기 때문에 `DDNS` 설정도 매우 쉽게 끝냈습니다. \
어느날 도메인 관리를 위해 접속해보니 사용자에게 통보도 없이 [Squarespace]라는 업체에게 판매를 했고, 이전이 진행중이었다는것을 알았습니다. \
그래서 이참에 도메인을 [CloudFlare]로 이전하면서 커스텀으로 설정했습니다.

`asuswrt-merlin 384.7` 버전 이상부터는 설정을 도와주는 `inadyn`이 내장되어 있어서 한 두 시간의 투자만으로 완전 자동화를 할 수 있습니다. \
지원하지 않는 도메인 업체라도 `DDNS`만 지원한다면 직접 커스텀 스크립트를 작성해서 사용할 수 있습니다.

## ENVIRONMENT

작업 당시의 환경입니다.

- hardware: \
`AC88U`
- firmware: \
`asuswrt-merlin 386.12`
- package: \
`Entware armv7sf-k2.6`

## REQUIREMENTS

사전에 준비되어야 할 작업입니다.

- **`DDNS` 지원 확인 방법**: \
도메인 업체 홈페이지에서 정보를 확인하세요.

- **`SSH` 접근 허용 방법**:
  1. `WebUI` 화면에서
  2. `Administration` 탭에서
  3. `Service` 구역에서
  4. `Enable SSH` 값을
  5. `LAN`으로 값을 설정
  > 작업이 끝나면 보안을 위해 값을 `No`로 바꾸는 것을 권장 합니다.

- **커스텀 스크립트 허용 방법**:
  1. `WebUI` 화면에서
  2. `Administration` 탭에서
  3. `System` 구역에서
  4. `Enable JFFS custom scripts and configs` 값을
  5. `Yes`로 설정

## METHOD

`inadyn`을 사용하는 방법과 커스텀 스크립트를 작성하는 방법 모두를 소개 합니다.

### USE `inadyn`

`CloduFlare`를 **영문** 기준으로 설명합니다.

0. [CloudFlare]에 접속해서 로그인
0. 두 가지 방식 중 한가지로, 발급 진행
`Key` 또는 `Token` 발급 방식 중 한가지로 진행하면 됩니다.

    - **`Global API Key` 방식**: \
    모든 권한을 가진 `Key`를 발급 받아 사용하는, **편리하지만 보안이 약해지므로 권장하지 않는 방법**

        0. [API Tokens] 화면에서
        0. `API Keys` 영역의
        0. `Global API Key` 값을 확인하기 위해
        0. `View` 버튼을 클릭
        0. 새로운 창, 비밀번호를 입력하는 화면에서
        0. 비밀번호를 입력하면 `Global API Key`가 표시됩니다.
        0. `Global API Key`를 어디가에 저장합니다.

    - **`Token` 방식**: \
    세밀하게 권한을 설정할 수 있는, 안전한, **공식적으로 권장하는 방법**

        0. [API Tokens] 화면에서
        0. `Create Token` 버튼을 클릭
        0. `Create Custom Token` 오른쪽의 `Use template` 버튼을 클릭
        0. `Permissions` 영역에서 생성할 `Token`에 두 개의 권한을 부여 \
        **필수 설정**이며 보안을 위해 다른 설정을 추가해도 됩니다.
            - `Zone`, `Zone`, `Read` 생성 \
            `Token`으로 접근시 `Zone`의 정보를 `Read` 하는 권한을 부여합니다.
            - `Zone`, `DNS`, `Edit` 생성 \
            `Token`으로 접근시 `DNS`의 정보를 `Edit` 하는 권한을 부여합니다.
        0. `Zone Resources` 영역에서 `Token`이 제공할 수 있는 정보 범위를 설정 \
        저는 보안을 위해 `Include`, `Specific zone`, `xiyo.dev`를 선택했습니다.
        0. `Continue to summary` 버튼을 클릭하여 `Token`을 생성합니다.
        0. `User API Tokens` 화면에서 `Token`이 제공할 정보를 확인하고, 맞다면 `Create Token` 버튼을 클릭
        0. `Token`을 어딘가에 저장합니다.

0. 발급받은 `Key` 또는 `Token`을 이용해 `inadyn.conf` 파일을 생성 \
저는 개인 디렉토리인, `/jffs/XIYOsWorkspace/inadyn/inadyn.conf`에 저장했습니다. \
반드시 `/jffs` 디렉토리 하위에 데이터를 생성해야 리부트시에도 스크립트가 유지 됩니다.

    - **두 개 이상의 도메인을 설정하는 방법**:

        ```text
        # /jffs/XIYOsWorkspace/inadyn/inadyn.conf

        provider cloudflare.com:1 {
            username = xiyo.dev
            password = sample123456789 
            hostname = "*.xiyo.dev"
            ttl = 1 # optional, value of 1 is 'automatic'.
            proxied = false # optional.
        }

        provider cloudflare.com:2 {
            username = xiyo.dev
            password = sample123456789 
            hostname = "xiyo.dev"
            ttl = 1 # optional, value of 1 is 'automatic'.
            proxied = false # optional.
        }
        ```

    `password`의 값을 발급받은 `Key`나 `token`으로 바꿔야합니다.

    와일드 카드 도메인과 일반 도메인을 사용할 때 문법입니다. \
    똑같은 `provider`를 여러개 사용할 경우 도메인 뒤에 `:number`를 써야합니다.

    - **단일 도메인을 설정하는 방법**:

        ```text
        # /jffs/XIYOsWorkspace/inadyn/inadyn.conf

        provider cloudflare.com {
            username = xiyo.dev
            password = sample123456789 
            hostname = "*.xiyo.dev"
            ttl = 1 # optional, value of 1 is 'automatic'.
            proxied = false # optional.
        }
        ```

    > **설정 파일의 스키마 검사 방법**:\
    > `inadyn`은 설정 파일의 스키마 검사 옵션을 제공합니다.
    >
    > **명령어**:
    >
    > ```bash
    > inadyn --check-config --config=/jffs/XIYOsWorkspace/inadyn/inadyn.conf
    > ```
    >
    > **`--check-config` 옵션**: \
    > 설정 파일의 스키마를 검사합니다.
    >
    > **`-f` 옵션**:
    > 설정 파일을 지정합니다.
    >
    > **출력**:
    >
    > ```text
    > Guessing DDNS plugin 'default@cloudflare.com' from 'cloudflare.com:1'
    > Guessing DDNS plugin 'default@cloudflare.com' from 'cloudflare.com:2'
    > ```
    >
    > 두 개의 도메인을 가진 설정 파일의 문법이 검사를 통과했습니다.

0. `inadyn`을 단독 실행 \
실제 잘 적용되는지 확인합니다.

    **명령어**:

    ```bash
    inadyn --once --config=/jffs/XIYOsWorkspace/inadyn/inadyn.conf
    ```

    **`--once` 옵션**: \
    기본 옵션인 백그라운드 지속 실행이 되지 않고, **1 회 실행 후  종료**합니다. \
    라우터에서는 특정 조건에만 실행하면 되기 때문에 이 옵션을 사용합니다.

    **`--config=FILE` 옵션**: \
    설정 파일을 지정합니다.

    **아무런 출력이 없으면 정상적으로 실행**된 것입니다.

    > 정상 실행 후에는 `CloudFlare`에서 `DNS`에 `A` 레코드가 추가되었는지 확인합니다.

0. 자동 실행 등록

    보통의 가정에서 호스팅하는 경우, 라우터를 거쳐서 내부 망에 있는 서버를 외부로 노출합니다. \
    그렇기 때문에 서버는 라우터의 아이피 변경을 감지 할 수단이 없어 `IP` 주소를 수시로 확인해서 변경시 `DDNS`를 업데이트 해야합니다.

    그러나 `asuswrt-merlin`은 내부 특정 프로세스의 트리거 기능을 제공합니다. \
    `WAN`의 `IP` 주소가 변경되면 `/jffs/scripts/ddns-start` 스크립트가 실행되며, 이곳에 `inadyn`을 실행하는 명령을 등록하면 됩니다.

    - `ddns-start` 파일 생성 및 명령어 추가 스크립트: \
    `inadyn` 설정 파일의 경로를 수정하고 셸에 붙여넣고 실행하면 됩니다. \
    단계 단계 설명하려다가 너무 길어져서 스크립트로 만들었습니다.

        ```bash
        inadynconf="/jffs/XIYOsWorkspace/inadyn/inadyn.conf"  # 이 부분을 수정하세요.

        file="/jffs/scripts/ddns-start"
        prefix="#!/bin/sh\n"
        command="\ninadyn --once --config=\"$inadynconf\" --exec=\"ddns_custom_updated 1\" --continue-on-error \"ddns_custom_updated 0\" # Added for custom DDNS"

        touch "$file"
        chmod 755 "$file"

        if [ ! -s "$file" ]; then
            echo -e "$prefix$command" > "$file"
        else
            echo -e "$command" >> "$file"
        fi
        ```

        파일 생성, 권한 설정, 명령어 추가를 한번에 진행합니다.

        중요한 옵션은 `/sbin/ddns_custom_updated 1` 입니다. \
        `ddns_custom_updated`는 시스템이 참조하는 값으로,
        - 1은 `DDNS` 업데이트가 실행하지 않습니다.
        - 0은 `DDNS` 업데이트를 실행합니다.



[Google Domain]: https://domains.google.com
[Squarespace]: https://www.squarespace.com
[CloudFlare]: https://www.cloudflare.com
[API Tokens]: https://dash.cloudflare.com/profile/api-tokens