---
layout: post
title:
description :
author: XIYO
tags:
categories:
permalink: /:categories/:title
---
{{ page.description }}

AC88U 와일드카드 인증서 발급
/sbin/acme.sh --issue --force --dns -d "xiyo.dev" -d "*.xiyo.dev" --yes-I-know-dns-manual-mode-enough-go-ahead-please

재발급
/sbin/acme.sh --renew --issue --force --dns -d "xiyo.dev" -d "*.xiyo.dev" --yes-I-know-dns-manual-mode-enough-go-ahead-please