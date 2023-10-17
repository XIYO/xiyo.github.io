---
title: Add Vault Repo to CentOS 6
description: 사용 불능한 CentOS 6 서버에 Vault Repo를 추가하는 방법을 알아보겠습니다.
---

# {{ page.title }}

{{ page.description }}

> [valut](https://valut.centos.org) 는 CentOS 의 공식 보관소 입니다.

## ADD VAULT REPO

### CHECK META INFO

먼저 `yum` 명령어에서 사용할 메타 정보를 입력해야합니다.

메타 정보 확인:

```bash
cat /etc/yum/vars/releasever
```

과거의 관리자가 입력했는지 확인해보고, 출력이나 없다면 메타 정보를 입력합니다.

**메타 정보 입력 명령어**:

```bash
echo "6.10" | sudo tee -a /etc/yum/vars/releasever > /dev/null
```

"6.10"에 해당하는 버전을 자신의 OS에 맞게 바꾸어야합니다.

> 버전 정보는 `/etc/centos-release` 파일에서 확인할 수 있습니다.

### ADD REPO

CentOS 6 서버에 파일을 만들며 내용을 바로 넣는 명령어:

```bash
cat <<EOF > /etc/yum.repos.d/vault.repo
[root@tktlkdd01 test]# cat /etc/yum.repos.d/vault.repo 
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
EOF
```
