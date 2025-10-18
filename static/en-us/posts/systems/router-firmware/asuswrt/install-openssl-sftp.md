---
title: INSTALL OPENSSL AND SFTP ON ASUSWRT
description: This document explains how to add SFTP functionality to `Dropbear`.
authors:
  - XIYO
lastModified: 2025-07-27T21:08:36+09:00
published: 2025-07-22T01:56:54+09:00
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

