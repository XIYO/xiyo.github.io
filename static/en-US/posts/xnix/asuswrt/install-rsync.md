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
title: INSTALL RSYNC
description: 'I am running nginx on the router. '
---
# INSTALL RSYNC

I am running nginx on the router. \
Since I am in the process of setting up a landing page, I will install rsync for automatic deployment.

## ENVIRONMENT

This is the environment at the time of work.

- AC88U
- Merlin 386.12\_4
- Entware 2022-02-24

## REQUIREMENTS

These are the essential elements. Detailed explanations are omitted.

- Install Merlin firmware
- Install Entware
- Activate jffs partition
- Enable ssh

## INSTALL

```bash
opkg update
opkg install rsync
```

