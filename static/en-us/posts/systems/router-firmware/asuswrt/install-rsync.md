---
title: INSTALL RSYNC
description: I am running nginx on the router. \
authors:
  - XIYO
modifiedAt: 2025-07-27T21:08:36+09:00
createdAt: 2025-07-22T01:56:54+09:00
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

