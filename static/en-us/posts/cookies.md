---
title: Cookie Transmission Scenario Analysis
description: >-
  This document analyzes cookie transmission scenarios and organizes whether
  cookies are transmitted based on various SameSite settings and domain
  attributes. This analysis is based on requests between `https://api.hello.dev`
  and `https://hello.dev`.
authors:
  - XIYO
  - xiyo
modifiedAt: 2025-07-27T21:08:36+09:00
createdAt: 2025-07-22T01:32:54+09:00
---
# Cookie Transmission Scenario Analysis

This document analyzes cookie transmission scenarios and organizes whether cookies are transmitted based on various SameSite settings and domain attributes. This analysis is based on requests between `https://api.hello.dev` and `https://hello.dev`.

## Prerequisites

All cookies have the following common options:
- **Secure=true**: Cookies are transmitted only over HTTPS connections

The browser transmits all SameSite setting cookies only for **same-site** requests (where origin and target share the same registered domain hello.dev), so there's no blocking due to SameSite here. When a cookie's Domain attribute is specified, the cookie is transmitted to that domain and all its subdomains. In the tables below, ✅ indicates cookie transmission, and 🚫 indicates no transmission.

## `https://api.hello.dev` → `https://api.hello.dev`

|**Domain**|**SameSite**|**Form GET**|**Form POST**|**Fetch GET**|**Fetch POST**|
|---|---|---|---|---|---|
|api.hello.dev|Strict|✅|✅|✅¹|✅¹|
|api.hello.dev|Lax|✅|✅|✅¹|✅¹|
|api.hello.dev|None|✅|✅|✅¹|✅¹|
|.hello.dev|Strict|✅|✅|✅¹|✅¹|
|.hello.dev|Lax|✅|✅|✅¹|✅¹|
|.hello.dev|None|✅|✅|✅¹|✅¹|

## `https://api.hello.dev` → `https://*.hello.dev`

|**Domain**|**SameSite**|**Form GET**|**Form POST**|**Fetch GET**|**Fetch POST**|
|---|---|---|---|---|---|
|api.hello.dev|Strict|🚫|🚫|🚫|🚫|
|api.hello.dev|Lax|🚫|🚫|🚫|🚫|
|api.hello.dev|None|🚫|🚫|🚫|🚫|
|.hello.dev|Strict|✅|✅|✅¹|✅¹|
|.hello.dev|Lax|✅|✅|✅¹|✅¹|
|.hello.dev|None|✅|✅|✅¹|✅¹|

## `https://api.hello.dev` → `https://hello.dev`

|**Domain**|**SameSite**|**Form GET**|**Form POST**|**Fetch GET**|**Fetch POST**|
|---|---|---|---|---|---|
|api.hello.dev|Strict|🚫|🚫|🚫|🚫|
|api.hello.dev|Lax|🚫|🚫|🚫|🚫|
|api.hello.dev|None|🚫|🚫|🚫|🚫|
|.hello.dev|Strict|✅|✅|✅¹|✅¹|
|.hello.dev|Lax|✅|✅|✅¹|✅¹|
|.hello.dev|None|✅|✅|✅¹|✅¹|

## `https://hello.dev` → `https://api.hello.dev`

|**Domain**|**SameSite**|**Form GET**|**Form POST**|**Fetch GET**|**Fetch POST**|
|---|---|---|---|---|---|
|hello.dev|Strict|🚫|🚫|🚫|🚫|
|hello.dev|Lax|🚫|🚫|🚫|🚫|
|hello.dev|None|🚫|🚫|🚫|🚫|
|.hello.dev|Strict|✅|✅|✅¹|✅¹|
|.hello.dev|Lax|✅|✅|✅¹|✅¹|
|.hello.dev|None|✅|✅|✅¹|✅¹|

## `https://hello.dev` → `https://*.hello.dev`

|**Domain**|**SameSite**|**Form GET**|**Form POST**|**Fetch GET**|**Fetch POST**|
|---|---|---|---|---|---|
|hello.dev|Strict|🚫|🚫|🚫|🚫|
|hello.dev|Lax|🚫|🚫|🚫|🚫|
|hello.dev|None|🚫|🚫|🚫|🚫|
|.hello.dev|Strict|✅|✅|✅¹|✅¹|
|.hello.dev|Lax|✅|✅|✅¹|✅¹|
|.hello.dev|None|✅|✅|✅¹|✅¹|

---

## Footnotes

¹ With credentials (Fetch API requires credentials: include option)

**Note:** When the domain attribute is specified, cookies are transmitted to the specified domain and all its subdomains.
