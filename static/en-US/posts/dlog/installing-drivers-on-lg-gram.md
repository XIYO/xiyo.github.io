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
title: Installing Drivers on LG Gram
description: >-
  This guide addresses driver issues that arise during the process of resetting
  and reinstalling the OS on the LG Gram.
---
# Installing Drivers on LG Gram

This guide addresses driver issues that arise during the process of resetting and reinstalling the OS on the LG Gram.

## Problem

Due to the need to reset the OS, I had to install a completely clean version of the OS instead of the initially configured one. I anticipated that after the reset, the drivers would be automatically installed through Windows Update, but...

### No Wireless Driver

I expected that the wireless LAN driver would be installed by default after the installation, but contrary to my expectations, I had to install it manually.

![Wireless LAN Driver List](/static/resources/install-driver-for-lg-gram-20240826221737828.png)

> I downloaded the wireless LAN driver and installed it.

### Still Unable to Install Drivers via Update

Even after running Windows Update through the network, the USB and sound drivers were still not installed. Using the [Intel® Driver & Support Assistant](https://www.intel.com/content/www/us/en/support/detect.html) did not resolve the issue, as one Intel USB driver remained uninstalled, and I found it difficult to locate the Realtek sound driver for direct download from the official site.

## Solution

Ultimately, I was about to give up on installing the remaining drivers when I decided to check the [LG Download Center](https://www.lge.com/us/support/product-manuals) once more, and I discovered that there was a dedicated update tool...

![Download Center Screen](/static/resources/install-driver-for-lg-gram-20240826222611325.png)

> I had overlooked the "LG Update Program" while searching for the model name, but it became visible upon a second look...

After downloading and installing it, all the driver issues I was experiencing were resolved. It took about an hour and a half to install all the supporting software.

