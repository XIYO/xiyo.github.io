---
title: Journey to Automating Markdown Frontmatter with Git Hooks
authors:
  - XIYO
modifiedAt: 2025-07-27T21:08:36+09:00
createdAt: 2025-07-22T02:44:08+09:00
---
# Journey to Automating Markdown Frontmatter with Git Hooks

## Beginning: The Problem Starts - Limitations of Pre-commit Hook

Managing frontmatter for each post manually while running a Markdown blog was tedious. Especially having to manually input metadata like commit messages, authors, and dates every single time.

Initially, I tried to solve this using a **pre-commit hook**.

```bash
# .husky/pre-commit (initial version)
# Update frontmatter for staged markdown files
```

### Problems with Pre-commit Approach

But I soon discovered serious issues:

1. **Staging changes persist**: After updating frontmatter, new changes always remained in Git staging
2. **Additional commit required**: Another commit was needed to reflect the updated frontmatter
3. **No commit message access**: Most critically, at the pre-commit stage, the commit message isn't finalized yet, so it couldn't be included in the frontmatter

```javascript
// This is impossible in pre-commit
const commitMessage = "???"; // Doesn't exist yet
```

## Development: Transition to Post-commit Hook

Realizing the limitations of pre-commit, I switched direction to a **post-commit hook**.

```bash
# .husky/post-commit
# Update frontmatter after commit + git commit --amend
```

### Post-commit + Amend Approach

This approach worked as follows:

1. User commits: `"✨ Add new feature"`
2. Post-commit hook executes
3. Extract message from commit history and update frontmatter
4. Include changes in existing commit with `git commit --amend --no-edit --no-verify`

```javascript
// scripts/update-frontmatter-postcommit.js
const changedFiles = execSync('git diff --name-only HEAD HEAD~1')
  .trim().split('\n').filter(file => file.endsWith('.md'));

// ... update frontmatter ...

// Add changes to existing commit
execSync('git commit --amend --no-edit --no-verify');
```

### Emergence of New Complexity

While the post-commit approach solved the commit message access problem, it introduced new issues:

1. **Infinite loop risk**: `git commit --amend` triggers another post-commit hook
2. **Complex prevention logic needed**:
   ```bash
   # Infinite loop prevention code
   if [ "$FRONTMATTER_UPDATE_RUNNING" = "1" ]; then
     exit 0
   fi
   export FRONTMATTER_UPDATE_RUNNING=1
   ```
3. **Git history tampering**: SHA changes could cause conflicts during collaboration
4. **--no-verify limitations**: Discovered that post-commit hooks can't be skipped with `--no-verify`

## Turning Point: Searching for a Fundamental Solution

Looking at the complicated code, I thought there must be a better way. After deeper investigation into Git hooks, I discovered the perfect solution: **prepare-commit-msg hook**.

### Discovering prepare-commit-msg Hook

Through web research, I confirmed the exact order of Git commit workflow:

1. Stage files (`git add`)
2. Execute **pre-commit** hook
3. Execute **prepare-commit-msg** hook ← **This is the key!**
4. Execute **commit-msg** hook
5. Create actual commit
6. Execute **post-commit** hook

### Perfect Timing of Prepare-commit-msg

I discovered the characteristics of this hook:

- ✅ Commit message is already finalized
- ✅ Before the commit is created
- ✅ Can modify files and re-stage
- ✅ Automatically included in the same commit

```bash
# prepare-commit-msg hook parameters
# $1 = commit message file path
# $2 = commit source (message, template, merge, etc.)

CURRENT_MSG=$(cat "$1")  # Can read commit message!
```

## Resolution: Implementing the Perfect Solution

### Final Implementation

I completely reimplemented using the prepare-commit-msg approach:

```bash
# .husky/prepare-commit-msg
#!/bin/sh

COMMIT_MSG_FILE="$1"
COMMIT_SOURCE="$2"

# Only run for regular commits
if [ "$COMMIT_SOURCE" = "message" ] || [ -z "$COMMIT_SOURCE" ]; then
  CURRENT_MSG=$(cat "$COMMIT_MSG_FILE")
  
  # Find staged markdown files
  STAGED_MD_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep '\.md$')
  
  if [ -n "$STAGED_MD_FILES" ]; then
    export COMMIT_MESSAGE="$CURRENT_MSG"
    
    if pnpm exec node scripts/update-frontmatter-prepare.js; then
      echo "✅ Frontmatter updated and re-staged successfully"
    fi
  fi
fi
```

```javascript
// scripts/update-frontmatter-prepare.js
const commitMessage = process.env.COMMIT_MESSAGE;
const stagedFiles = execSync('git diff --cached --name-only --diff-filter=ACM')
  .trim().split('\n').filter(file => file && file.endsWith('.md'));

// Update frontmatter
const updatedData = {
  title: title,
  description: description,
  authors: uniqueAuthors,
  dates: dates,
  messages: [commitMessage, ...existingMessages], // Include current commit message!
  created: createdDate,
  modified: modifiedDate
};

// Update file and auto re-stage
writeFileSync(filePath, updatedContent);
execSync(`git add "${file}"`); // Automatically included in same commit
```

### Revolutionary Results

Advantages of the final implementation:

1. **Perfect timing**: After commit message finalization, before commit creation
2. **Automatic inclusion**: Re-staged changes naturally included in the same commit
3. **Complexity removed**: No need for infinite loop prevention logic
4. **History integrity**: No SHA changes, no amend needed
5. **Collaboration safe**: Leverages Git's legitimate workflow

### Real-world Example

```bash
$ git commit -m "✨ Add new feature"

🔍 Running pre-commit checks...
✅ All pre-commit checks passed!

📝 Running prepare-commit-msg hook...
📄 Found staged markdown files: new-feature.md
✅ new-feature.md frontmatter updated
✅ Updated frontmatter has been staged.

📝 Validating commit message...
✅ Commit message validation passed

[main abc1234] ✨ Add new feature
 2 files changed, 50 insertions(+)
```

Resulting markdown:

```yaml
---
title: New Feature
description: The innovative feature we just added
authors:
  - XIYO
messages:
  - '✨ Add new feature'  # Automatically included!
createdAt: '2025-07-20T09:40:48.024Z'
modifiedAt: '2025-07-20T09:40:48.024Z'
modifiedAt: 2025-07-27T21:08:36+09:00
createdAt: 2025-07-22T02:44:08+09:00
---

# New Feature

The innovative feature we just added...
```

## Conclusion: The Journey of Finding the Right Tool

Lessons learned from this project:

1. **Understanding the root of the problem**: Not just finding a working solution, but understanding why the problem occurs
2. **Deep exploration of tools**: Understanding the various types of Git hooks and their characteristics
3. **Complexity is a signal**: If code becomes complex, there's likely a better way
4. **Power of the legitimate approach**: Utilizing workflows aligned with Git's design intent

This journey from Pre-commit → Post-commit → Prepare-commit-msg was more than just a technical solution—it was a valuable experience that made me think about the essence of problem-solving.

---

*The frontmatter of this post was also automatically generated by the prepare-commit-msg hook! 🎉*
