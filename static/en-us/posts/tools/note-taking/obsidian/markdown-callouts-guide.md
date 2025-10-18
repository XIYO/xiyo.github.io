---
title: "Markdown Callouts Guide"
description: "A comprehensive guide to markdown callout (alert) features available in Obsidian, GitHub, and GitLab"
authors: ["XIYO"]
published: "2025-07-30"
lastmodified: "2025-07-30"
tags: ["markdown", "obsidian", "github", "gitlab", "callouts", "documentation", "guide"]
lastModified: 2025-07-30T13:59:56Z
---

# Markdown Callouts Guide

## What are Callouts?

While basic markdown only provides simple blockquotes (`>`), GitHub introduced enhanced design features that allow writers to emphasize specific content and clearly convey intent to readers through callout functionality. This feature has been adopted by other markdown rendering tools like GitLab and Obsidian and is now widely used.

> [!note] Difference from Basic Markdown Blockquotes
> **Basic blockquote syntax:**
> ```markdown
> > This is a basic markdown blockquote.
> > It only provides a simple gray vertical line and indentation.
> ```
> 
> **Rendered result:**
> > This is a basic markdown blockquote.
> > It only provides a simple gray vertical line and indentation.
> 
> In contrast, callouts provide rich visual elements like colors, icons, and titles to clearly convey the nature of the content.

### Basic Usage

Callouts use the following syntax:

```markdown
> [!type]
> Callout content
```

> [!tip] Case Sensitivity Rules
> Callout types are **case-insensitive**. `[!NOTE]`, `[!note]`, and `[!Note]` all work identically.
> 
> However, it's **recommended to choose one consistent rule**:
> - **Lowercase** (`[!note]`): Faster typing without Shift key
> - **Uppercase** (`[!NOTE]`): More visually prominent and formal
> 
> **Recommendation**: **Use lowercase**. With markdown linters (standardization tools), you can automatically convert all callouts to uppercase later if needed, so it's more efficient to use convenient lowercase during writing and convert with tools when necessary.

### Examples

```markdown
> [!note]
> This is a note callout.

> [!warning]
> This is a warning callout.

> [!tip] Custom Title
> You can add a custom title.
```

## Markdown Platform Callout/Alert Support Comparison

| Callout Type      | GitHub | GitLab | Obsidian |
| ----------------- | ------ | ------ | -------- |
| **NOTE**          | ✅      | ✅      | ✅        |
| **TIP**           | ✅      | ✅      | ✅        |
| **IMPORTANT**     | ✅      | ✅      | ✅        |
| **WARNING**       | ✅      | ✅      | ✅        |
| **CAUTION**       | ✅      | ✅      | ✅        |
| info              | ❌      | ❌      | ✅        |
| todo              | ❌      | ❌      | ✅        |
| abstract          | ❌      | ❌      | ✅        |
| summary           | ❌      | ❌      | ✅        |
| tldr              | ❌      | ❌      | ✅        |
| hint              | ❌      | ❌      | ✅        |
| success           | ❌      | ❌      | ✅        |
| check             | ❌      | ❌      | ✅        |
| done              | ❌      | ❌      | ✅        |
| question          | ❌      | ❌      | ✅        |
| help              | ❌      | ❌      | ✅        |
| faq               | ❌      | ❌      | ✅        |
| attention         | ❌      | ❌      | ✅        |
| failure           | ❌      | ❌      | ✅        |
| fail              | ❌      | ❌      | ✅        |
| missing           | ❌      | ❌      | ✅        |
| danger            | ❌      | ❌      | ✅        |
| error             | ❌      | ❌      | ✅        |
| bug               | ❌      | ❌      | ✅        |
| example           | ❌      | ❌      | ✅        |
| quote             | ❌      | ❌      | ✅        |
| cite              | ❌      | ❌      | ✅        |

> [!IMPORTANT] Recommendation - Simplicity is Productivity
> While Obsidian offers 25 different callout types, **we strongly recommend using only the 5 common types**.
> 
> **Key reasons:**
> 1. **Reduced choice fatigue**: No need to choose among 25 options - just remember 5
> 2. **Focus on writing**: Spend time on content, not callout selection
> 3. **Maintain consistency**: Build unified style across teams and projects
> 4. **Ensure compatibility**: Works identically across GitHub, GitLab, and other platforms
> 5. **Minimize cognitive load**: Readers only need to understand 5 familiar types
> 
> **Recommended 5 types**: NOTE (information), TIP (tips), IMPORTANT (important), WARNING (warning), CAUTION (caution)
> 
> These 5 types can effectively express 99% of situations. More choices aren't always better.

---

## Basic Information Callouts

Used to display basic information or notes that users should be aware of.

### Note

| GitHub   | GitLab   | Obsidian |
| -------- | -------- | -------- |
| ✅        | ✅        | ✅        |

> [!note]
> Displays basic information or notes.

### Info

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

> [!info]
> Displays informational content or guidance.

### Todo

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

> [!todo]
> Displays to-do items or task lists.

## Help and Suggestion Callouts

Used to provide helpful tips or emphasize important information for users.

### Tip

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ✅       | ✅       | ✅ |

> [!tip]
> Displays useful tips or suggestions.

### Hint

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

> [!hint]
> Used to provide hints or clues.

### Important

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ✅             | ✅             | ✅ |

> [!important]
> Emphasizes important information or key content.

## Question and Help Callouts

Used to address user questions or provide assistance.

### Question

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

> [!question]
> Displays questions or inquiries.

### Help

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

> [!help]
> Provides help information or usage instructions.

### FAQ

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

> [!faq]
> Displays frequently asked questions and answers.

## Warning and Caution Callouts

Used to convey warnings or cautionary information to users.

### Warning

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ✅           | ✅           | ✅ |

> [!warning]
> Warns about matters requiring attention.

### Caution

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ✅           | ✅           | ✅ |

> [!caution]
> Alerts about content requiring caution or risk factors.

### Attention

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

> [!attention]
> Emphasizes content requiring special attention.

## Success and Completion Callouts

Used to display successful results or completed tasks.

### Success

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

> [!success]
> Displays successful results or positive status.

### Check

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

> [!check]
> Displays confirmed content or verified information.

### Done

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

> [!done]
> Displays completed tasks or finished content.

## Summary and Organization Callouts

Used to summarize content or provide concise key points.

### Abstract

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

> [!abstract]
> Provides an overview of a document or content.

### Summary

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

> [!summary]
> Summarizes and organizes key content.

### TLDR

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

> [!tldr]
> Too Long; Didn't Read - provides a brief summary of lengthy content.

## Error and Problem Callouts

Used to display errors, failures, and issues.

### Failure

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

> [!failure]
> Displays failed results or problematic situations.

### Fail

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

> [!fail]
> Indicates failure situations or incorrect results.

### Missing

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

> [!missing]
> Displays missing content or incomplete information.

### Danger

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

> [!danger]
> Warns about dangerous situations or serious problems.

### Error

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

> [!error]
> Displays error situations or error messages.

### Bug

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

> [!bug]
> Used to report bugs or software defects.

## Example and Citation Callouts

Used to show examples or cite content from other sources.

### Example

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

> [!example]
> Provides specific examples or sample code.

### Quote

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

> [!quote]
> Displays quotes from other sources or famous sayings.

### Cite

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

> [!cite]
> Used to specify references or sources.

## Advanced Features

### Adding Titles (Supported by All Platforms)

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ✅ | ✅ | ✅ |

> [!tip] Custom Title
> You can add a title after the callout type.

### Folding/Expanding Feature (Obsidian Only)

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

**Syntax:**
```markdown
> [!info]- Collapsed by Default
> Using the minus (-) symbol displays the callout collapsed by default.

> [!info]+ Expanded by Default
> Using the plus (+) symbol displays the callout expanded by default.
```

**Rendered result:**
> [!info]- Collapsed by Default
> Using the minus (-) symbol displays the callout collapsed by default.

> [!info]+ Expanded by Default
> Using the plus (+) symbol displays the callout expanded by default.

### Nested Callouts (Obsidian Only)

| GitHub | GitLab | Obsidian |
|--------|--------|----------|
| ❌ | ❌ | ✅ |

**Syntax:**
```markdown
> [!warning] Outer Callout
> This is the outer callout.
> 
> > [!tip] Inner Callout
> > You can nest other callouts inside a callout.
```

**Rendered result:**
> [!warning] Outer Callout
> This is the outer callout.
> 
> > [!tip] Inner Callout
> > You can nest other callouts inside a callout.
