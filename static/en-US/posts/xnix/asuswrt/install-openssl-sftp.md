---
authors:
  - XIYO
  - XIYO
dates:
  - '2024-09-08T12:40+0900'
  - '2024-09-05T23:19+0900'
messages:
  - ':art: 로케일 코드 제거하고, 번역된 파일을 기존 처럼 /static/{locale} 구조로 저장'
  - ':globe_with_meridians: 기존 국제화 방식을 제거하고 새로운 방식으로 번역본 추가'
title: INSTALL OPENSSL AND SFTP ON ASUSWRT
description: 'This document explains how to add SFTP functionality to '
---
# INSTALL OPENSSL AND SFTP ON ASUSWRT

This document explains how to add SFTP functionality to `Dropbear`.

`Dropbear` is a lightweight package of `OpenSSH`. \
Some features of `OpenSSH` have been removed, including `SFTP`.

## ENVIRONMENT

- `ASUSWRT-MERLIN 386.12`
- `Entware armv7sf-k2.6`

## METHOD

```bash
opkg update
opkg install openssh-sftp-server
```

Proceed with updating and installing the package manager.

After installation, you can access it immediately without any additional configuration.

