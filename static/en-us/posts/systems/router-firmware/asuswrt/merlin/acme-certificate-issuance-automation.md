---
title: Automating ACME Certificate Issuance (ASUS AC88U Router)
description: >-
  I've installed Nginx on my AC88U router and set up SSL certificates, but the
  manual certificate issuance process has been disorganized. Here's my complete
  guide after finally organizing everything.
authors:
  - XIYO
  - xiyo
lastModified: 2025-07-27T21:08:36+09:00
published: 2025-07-22T01:56:54+09:00
---
# Automating ACME Certificate Issuance (ASUS AC88U Router)

I've installed Nginx on my AC88U router and set up SSL certificates, but the manual certificate issuance process has been disorganized. Here's my complete guide after finally organizing everything.

> [!NOTE]
> This process is only possible on routers with ASUS Merlin firmware installed.

## Domains in Use

I'm using several subdomains:

- `xiyo.dev`
- `blog.xiyo.dev`
- `test.xiyo.dev`

When you have many subdomains like this, it's efficient to use a wildcard (`*.xiyo.dev`) to issue a certificate for all of them at once.

## Prerequisites

Wildcard domains must be authenticated using **DNS-01 method, not HTTP-01**.
This method can only be automated if your DNS provider supports API access.

> I was able to automate certificate issuance using DNS-01 because I use **Cloudflare**.   
> Domestic domain services don't support this...

### DNS Authentication Using Cloudflare API

Looking at the [`dns_cf`](https://github.com/acmesh-official/acme.sh/blob/master/dnsapi/dns_cf.sh) script in the [ACME repository](https://github.com/acmesh-official/acme.sh) on GitHub, you can see the environment variables needed for DNS-01 method.

```sh
#!/usr/bin/env sh
# shellcheck disable=SC2034
dns_cf_info='CloudFlare
Site: CloudFlare.com
Docs: github.com/acmesh-official/acme.sh/wiki/dnsapi#dns_cf
Options:
 CF_Key API Key
 CF_Email Your account email
 OptionsAlt:
 CF_Token API Token
 CF_Account_ID Account ID
 CF_Zone_ID Zone ID. Optional.
'
```

Looking at the code, you can choose one of two methods:

1. **Global API Key method** (uses `CF_Key` + `CF_Email`)
2. **API Token method** (uses `CF_Token` + `CF_Account_ID`)

- **Global API Key method** is useful when managing many domains, allowing you to easily issue certificates for multiple domains with one key.
- **API Token method** is more secure as you can grant permissions for specific domains only.

You can refer to the [Cloudflare token issuance page](https://dash.cloudflare.com/profile/api-tokens) for token generation.

> [!NOTE]
> I used the **Global API Key method** because I have other domains besides `xiyo.dev`.

---

## Certificate Issuance Process

### 1. SSH into the Router

```sh data-title="terminal"
ssh admin@router-ip
```

### 2. Download Cloudflare DNS Plugin

The AC88U router doesn't provide DNS plugins by default, so you need to add them manually.

```sh data-title="terminal"
wget -O /jffs/scripts/dnsapi/dns_cf "https://raw.githubusercontent.com/acmesh-official/acme.sh/master/dnsapi/dns_cf.sh"
```

> Using `wget` to download the latest `dns_cf.sh` script.

### 3. Add Cloudflare API Key

Add `CF_KEY` and `CF_EMAIL` to the second line of the `dns_cf` script and enter your issued token.

```sh data-title="dns_cf"
#!/usr/bin/env sh

export CF_Key="my_key" # Added by XIYO // [!code focus]
export CF_Email="my_email" # Added by XIYO // [!code focus]

dns_cf_info=CloudFlare
Site: CloudFlare.com
# ... rest omitted
```

> Since this is a home server with only me accessing it, I added the key directly to the script file.

### 4. Add Auto-Configuration on Service Start

You need to configure the router to automatically mount the DNS plugin and perform certificate renewal when it boots.

Add the following to the `/jffs/scripts/service-start` file:

```sh data-title="service-start"
#!/bin/sh

/jffs/scripts/scmerlin startup &  # scMerlin 
ln -s /jffs/.config /home/root/.config # Added by XIYO

# Mount DNS plugin to directory referenced by acme.sh // [!code focus]
mount --bind /jffs/acme/dnsapi /usr/sbin/dnsapi  # Added by XIYO, for ACME // [!code focus]
# Run certificate renewal at 3 AM daily & log to Web UI (System Log) // [!code focus]
cru a AcmeRenew "0 3 * * * acme.sh --cron --home /jffs/.le 2>&1 | logger -t AcmeRenew" # Added by XIYO // [!code focus]
```

If the script doesn't exist, create it and grant execution permissions:

```sh data-title="terminal"
touch /jffs/scripts/service-start
chmod +x /jffs/scripts/service-start
```

> `service-start` is usually created automatically when you install other services...

### 5. Manual Mount and Cron Job Registration

Since I don't plan to reboot the router, I manually mounted the DNS plugin and registered the certificate issuance process in cron:

```sh data-title="terminal"
mount --bind /jffs/acme/dnsapi /usr/sbin/dnsapi
cru a AcmeRenew "0 3 * * * acme.sh --cron --home /jffs/.le 2>&1 | logger -t AcmeRenew"
```

### 6. Issue Certificate

Run the following command to issue a wildcard certificate:

```sh data-title="terminal"
acme.sh --issue --dns dns_cf \
-d xiyo.dev -d *.xiyo.dev \
--cert-home /jffs/.le \
--reloadcmd "nginx -s reload"
```

> Since I'm using nginx, I used the `reloadcmd` option to renew the web server's certificate after issuance.

## Conclusion

Now **automatic ACME SSL certificate issuance and renewal using Cloudflare API** will work perfectly on your ASUS AC88U router.

After this process, **SSL certificates will be automatically renewed without manual intervention**, and Nginx will automatically load them.
