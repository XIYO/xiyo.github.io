---
title: Add Vault Repo to CentOS 6
description: 사용 불능한 CentOS 6 서버에 Vault Repo를 추가하는 방법을 알아보겠습니다.
---

# {{ page.title }}

{{ page.description }}

> [valut](https://valut.centos.org) 는 CentOS 의 공식 보관소 입니다.

## ADD VAULT REPO

### CHECK RELEASE INFO

먼저 *yum* 명령어에서 참조할 *OS* 릴리즈 정보를 입력해야합니다.

**릴리즈 정보 확인 방법**:

```bash
cat /etc/yum/vars/releasever
```

내용이 없다면 자신의 *OS* 릴리즈 정보를 */etc/yum/vars/releasever*에 입력합니다. \
저는 *6.10*을 입력했습니다.

> 릴리즈 정보는 */etc/centos-release* 파일에서 확인할 수 있습니다.

### ADD REPO

저장소를 추가합니다. \
*CentOS 6*에서 테스트햇으며 *Vault*에 있는 릴리즈라면 다른 것도 사용가능합니다.

0. ***CentOS* 저장소 정보 추가**: \
*/etc/yum.repos.d/vault.repo*에 저장할 내용입니다.

    ```text
    [plus]
    name=CentOS-$releasever - Plus
    baseurl=http://vault.centos.org/centos/$releasever/centosplus/$basearch/
    enabled=1
    gpgcheck=1
    gpgkey=http://vault.centos.org/centos/RPM-GPG-KEY-CentOS-6

    [contrib]
    name=CentOS-$releasever - Contrib
    baseurl=http://vault.centos.org/centos/$releasever/contrib/$basearch/
    enabled=1
    gpgcheck=1
    gpgkey=http://vault.centos.org/centos/RPM-GPG-KEY-CentOS-6

    [cr]
    name=CentOS-$releasever - CR
    baseurl=http://vault.centos.org/centos/$releasever/cr/$basearch/
    enabled=1
    gpgcheck=1
    gpgkey=http://vault.centos.org/centos/RPM-GPG-KEY-CentOS-6

    [extras]
    name=CentOS-$releasever - Extras
    baseurl=http://vault.centos.org/centos/$releasever/extras/$basearch/
    enabled=1
    gpgcheck=1
    gpgkey=http://vault.centos.org/centos/RPM-GPG-KEY-CentOS-6

    [fasttrack]
    name=CentOS-$releasever - Fasttrack
    baseurl=http://vault.centos.org/centos/$releasever/fasttrack/$basearch/
    enabled=1
    gpgcheck=1
    gpgkey=http://vault.centos.org/centos/RPM-GPG-KEY-CentOS-6

    [os]
    name=CentOS-$releasever - OS
    baseurl=http://vault.centos.org/centos/$releasever/os/$basearch/
    enabled=1
    gpgcheck=1
    gpgkey=http://vault.centos.org/centos/RPM-GPG-KEY-CentOS-6

    [updates]
    name=CentOS-$releasever - Updates
    baseurl=http://vault.centos.org/centos/$releasever/updates/$basearch/
    enabled=1
    gpgcheck=1
    gpgkey=http://vault.centos.org/centos/RPM-GPG-KEY-CentOS-6
    ```

    *yum*이 알아서 내용을 채워주기 때문에 수정할 필요 없이 저장만하면 됩니다. \
    *6.10*에서 사용가능한 모든 저장소를 넣었으며 필요 없는 저장소는 삭제하면 됩니다.

0. 저장소 추가 확인:

    ```bash
    yum repolist
    ```
