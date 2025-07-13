---
category: blog
title: Building a Git History-Based Frontmatter Automation System
description: This document covers how to automatically manage frontmatter based on Git history in a Markdown-based blog.
authors:
  - xiyo
dates:
  - '2025-07-13T18:25:42+09:00'
messages:
  - 🌐 블로그 포스트 영어/일본어 번역 추가
---
# Building a Git History-Based Frontmatter Automation System

This document covers how to automatically manage frontmatter based on Git history in a Markdown-based blog.

## Problem Recognition: Inefficiency in Repetitive Metadata Management

Anyone who manages development documentation or blog posts has experienced this problem. You've modified content and committed it, but forgot to update the document's metadata. While Git history accurately records the modification time, the frontmatter dates remain stuck in the past.

```yaml
# The actual commit was on 2025-01-13, but...
dates:
  - '2025-01-01T10:00:00+09:00'  # Forgot to update
```

This goes beyond a simple mistake to become an efficiency issue in the development process. Despite Git already tracking all change history, we're manually managing duplicate information. This violates the DRY (Don't Repeat Yourself) principle and contradicts the Single Source of Truth concept.

## Initial Approach: Automation Attempt Using Git Hooks

The first approach to solve this problem was to use Git hooks. I expected it would be simple to write a script that automatically updates frontmatter at commit time.

However, unexpected technical challenges arose in succession during implementation:

1. Mismatch between Git hook execution timing and commit data accessibility
2. Recursive call issues caused by commit modifications within hooks
3. YAML parser unicode handling inconsistencies
4. Git hooks sharing constraints in team environments

Each problem seemed simple, but solving them required deep understanding of Git's internal workings and various tools' details.

## Technical Challenge 1: Understanding Git Hook Execution Timing

Git hooks are scripts that automatically execute when specific Git events occur. The first attempt was with a pre-commit hook.

```bash
# .git/hooks/pre-commit
#!/bin/sh
echo "Updating frontmatter..."
node update-frontmatter.js
```

After testing the execution timing, I confirmed that pre-commit hooks execute before the commit object is created, so they cannot access the commit message or hash. This was an important lesson in understanding Git's commit process.

Git's commit process proceeds in the following order:
1. Execute pre-commit hook
2. Enter commit message
3. Execute commit-msg hook
4. Create commit object
5. Execute post-commit hook

Starting implementation without properly understanding these execution timing differences was my first mistake. It was the result of relying on intuition without sufficiently reviewing technical documentation details.

### Post-commit Hook and Commit Modification Strategy

After switching to post-commit hook, I could access commit information. However, a new problem arose.

```bash
git log --oneline
f3d2a1b Auto-update frontmatter
a8c9e2f 🚀 Add new feature
7b5c3d2 Auto-update frontmatter  
9d1e4f6 🐛 Fix bug
```

Updating frontmatter and creating new commits unnecessarily complicated the history. An additional commit for metadata updates was created for each commit, harming project history readability.

To solve this, I decided to use the `git commit --amend` command. This command allows reflecting changes without creating a new commit by modifying the most recent commit.

```bash
# Inside post-commit hook
git add -u
git commit --amend --no-edit --no-verify
```

This approach allowed automatically updating metadata while maintaining clean commit history.

## Technical Challenge 2: Sharing Git Hooks in Team Environments

The `.git/hooks` directory is a local setting that Git doesn't track. While designed for security reasons, it becomes a constraint when the entire team needs to use the same hooks.

If each team member must manually copy hook files, it diminishes the meaning of automation. Additionally, management burden arises as all team members must synchronize whenever hooks are updated.

### Husky: Shareable Git Hooks Management Tool

Husky is a tool that allows managing Git hooks as part of the project. Emerging in the mid-2010s, this tool enables managing Git hooks like npm packages in JavaScript projects.

```bash
npm install --save-dev husky
npx husky install
npx husky add .husky/post-commit "node scripts/update-frontmatter.js"
```

Through Husky, hooks become part of the project repository and are automatically configured during `npm install`. This enabled the entire team to maintain a consistent development environment.

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

> Adding this configuration to `package.json` automatically sets up Husky with just `npm install` after cloning the project.

## Technical Challenge 3: Infinite Loop from Recursive Calls

I thought all configuration was complete and proceeded with testing. However, an unexpected situation occurred.

The post-commit hook was executing infinitely. Analysis revealed the following circular structure:

1. Create commit → Execute post-commit hook
2. Execute `git commit --amend` within hook
3. Create new commit due to amend → Re-execute post-commit hook
4. Infinite repetition of steps 2-3

This demonstrated the absence of mechanisms to control recursive execution of Git hooks.

### Limitations of the --no-verify Flag

The first attempt was to use the `--no-verify` flag. This flag is known to bypass Git hooks.

However, after carefully checking Git documentation, I discovered that the `--no-verify` flag only bypasses pre-commit and commit-msg hooks, not affecting post-commit hooks. This is because, by design, post-commit is used for notification purposes after commits are already complete.

### Recursion Prevention Strategy Using Environment Variables

After reviewing various solutions, I implemented a simple yet effective method using environment variables.

```bash
#!/bin/sh
# If already running, just exit
if [ "$FRONTMATTER_UPDATE_RUNNING" = "1" ]; then
  echo "🔄 Already running, skip"
  exit 0
fi

export FRONTMATTER_UPDATE_RUNNING=1

# Actual work
node scripts/update-frontmatter-postcommit.js

# Cleanup (actually unnecessary, environment variable disappears when process ends)
unset FRONTMATTER_UPDATE_RUNNING
```

This approach is simple but effective. By managing state at the process level, recursive calls could be effectively prevented. It was a practical choice as it solved the problem without relying on complex flag combinations or Git internal mechanisms.

## Technical Challenge 4: Unicode Handling Consistency Issues

Everything seemed to work correctly, but another problem was discovered when checking the generated frontmatter.

```yaml
messages:
  - "\U0001F680 Add new feature"
  - "\U0001F41B Fix bug"
```

Emojis from commit messages were being converted and stored as unicode escape sequences.

### Analyzing Behavioral Differences Between YAML Parsers

Gray-matter internally uses js-yaml but adds its own processing during stringify. Debugging confirmed that gray-matter's stringify method escapes unicode characters.

While this is a valid expression per YAML spec, it wasn't desirable from readability and user experience perspectives. After researching GitHub issues and related documentation, I derived the following solution:

```javascript
import yaml from 'js-yaml';
import matter from 'gray-matter';

// Parse with gray-matter (no problems here)
const { data, content } = matter(fileContent);

// Save directly with js-yaml!
const yamlStr = yaml.dump(data, {
  lineWidth: -1,
  noRefs: true,
  sortKeys: false
});

// Reassemble frontmatter
const updatedContent = `---\n${yamlStr}---\n${content}`;
```

This approach is a practical solution leveraging each library's strengths. While maintaining gray-matter's convenient parsing features, I could achieve the desired output format using js-yaml's more flexible stringify options.

## Technical Challenge 5: Existing Metadata Preservation Strategy

After completing the system, an important design decision had to be made. The automation system should not overwrite metadata manually set by users.

```yaml
---
title: My Post
category: blog        # This shouldn't disappear...
tags: [git, automation]  # This too...
featured: true        # This is important too...
---
```

Frontmatter can include various metadata, some of which can be automated while others must reflect users' explicit intentions.

### Establishing Metadata Management Policy

I established the following clear policy:

**Automatically managed:**
- Information extractable from Git history
- Information derivable from document content

**Manually managed:**
- Information requiring user's intentional choice
- Identifiers for integration with external systems

```javascript
const AUTO_MANAGED_FIELDS = [
  'title',        // Auto-extract from H1
  'description',  // Auto-extract from first paragraph
  'authors',      // from git log
  'dates',        // from git log
  'messages'      // from git log
];

// Remove only auto fields from existing data
AUTO_MANAGED_FIELDS.forEach(field => delete data[field]);

// Merge newly extracted data
Object.assign(data, newData);
```

Through this selective update strategy, I achieved balance between automation convenience and user control.

## Implementation Results and Achievements

### Previous Workflow

```yaml
---
title: Manually copy-paste
description: Also manually written
authors:
  - Uh... what was my GitHub ID?
dates:
  - '2025-01-... which day was it?'
---
```

### Improved Workflow

```bash
git add posts/my-post.md  
git commit -m "📝 Write blog post"
# Done. Really done.
```

Frontmatter automatically becomes:

```yaml
---
title: Building a Git History-Based Frontmatter Automation System
description: "Forgot to update the date again..." Friday 4 PM...
authors:
  - xiyo
dates:
  - '2025-07-13T19:24:00+09:00'
messages:
  - 📝 Write blog post
category: blog  # This stays as I set it
---
```

## Conclusion: Return on Investment Analysis

Unlike initial expectations, the entire implementation took about 6 hours:

- Understanding Git hooks execution timing and implementation: 1 hour
- Solving infinite loop problem: 2 hours
- Unicode handling issue: 1 hour
- Husky introduction and configuration: 30 minutes
- Metadata preservation logic: 30 minutes
- Testing and debugging: 1 hour

However, this investment brought significant time savings in the long term. Metadata update tasks that took 30 seconds to 1 minute per commit were completely automated, and the possibility of human error was eliminated.

### System's Practical Value

The core value of this automation system goes beyond simple time savings. The most important point is that developers are freed from the ancillary task of metadata management and can focus on essential content creation.

Repetitive manual work not only consumes time but also interrupts creative workflow. Through such automation, developers can invest time and energy in more valuable work.

## Example Code

[/scripts/update-frontmatter-postcommit.js](https://github.com/XIYO/xiyo.github.io/blob/main/scripts/update-frontmatter-postcommit.js)
[/.husky/post-commit](https://github.com/XIYO/xiyo.github.io/blob/main/.husky/post-commit)