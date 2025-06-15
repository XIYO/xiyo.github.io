---
authors:
  - XIYO
  - XIYO
  - XIYO
dates:
  - '2024-09-18T11:16+0900'
  - '2024-09-08T12:40+0900'
  - '2024-09-05T23:19+0900'
messages:
  - ':truck: 이미지 경로를 전부 /static/resource 로 이동'
  - ':art: 로케일 코드 제거하고, 번역된 파일을 기존 처럼 /static/{locale} 구조로 저장'
  - ':globe_with_meridians: 기존 국제화 방식을 제거하고 새로운 방식으로 번역본 추가'
title: Renaming a Branch
description: 'When initializing a project with Git for local management, a '
---
# Renaming a Branch

When initializing a project with Git for local management, a `master` branch is created. Since GitHub often promotes the use of "main" as the branch name, let's explore how to rename the branch.

## Changing the Branch Name with `git` Commands

We will change the branch name from "master" to "main."

### Local Repository

1. Initialize Git.

   ```bash
   git init
   ```

2. Rename the branch.
   ```bash
   git branch -m master main
   ```

### Remote Repository

1. Clone the remote repository.
   ```bash
   git clone repository-url
   ```
2. Navigate to the remote repository.
   ```bash
   cd repository
   ```
3. Rename the branch.
   ```bash
   git branch -m master main
   ```
4. Push the changes to the remote repository.
   ```bash
   git push -u origin main
   ```
5. Delete the old branch from the remote repository.
   ```bash
   git push origin --delete master
   ```

## Renaming the Branch Directly on the Remote Repository

On GitHub, you can rename the branch directly on the web without going through the above steps.

![Menu location for renaming a branch](/static/resources/change-branch-name-20240918104226703.png)

1. Go to the page at <https://github.com/owner-name/branch-name/branches>.
2. Click on the hamburger menu and select `Rename branch`.

## Changing the Default Branch Name on Initialization

To change the default branch name created during Git initialization to "main," use the following command:

```shell
git config --global init.defaultBranch main
```

