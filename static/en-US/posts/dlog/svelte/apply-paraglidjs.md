---
authors:
  - XIYO
dates:
  - '2024-09-18T17:12+0900'
messages:
  - ':memo: Applying Paraglide JS'
title: Applying Paraglide JS
description: 'Experience with the new internationalization library'
---
# Applying Paraglide JS

Sharing my experience of applying **Paraglide JS**, a new internationalization library, to my project.

## Why Did I Introduce Internationalization?

One of the inconvenient development experiences I've had in the past was having to clone projects for internationalization, change languages, and operate separate instances for each language. This led to features differing between languages, making internationalization work very cumbersome.

To prevent such experiences from recurring, I attempted internationalization on this blog to learn how to handle it properly.

## What is Paraglide JS?

**Paraglide JS** is an AI-powered translation support tool. You can easily translate content written in a single language through a **web editor** and easily manage additional translations. It's free for individual users, and they're considering a paid policy for enterprises, so you can use it without burden.

## Features

### Editor

According to [Paraglide JS | inlang](https://inlang.com/m/gerre34r/library-inlang-paraglideJs), besides being lightweight, type-safe, and providing a VS Code extension, a convenient feature is the "translation editor provision".

![Paraglide JS Editor](/static/resources/apply-paraglidjs-20240918153234469.png)
> You can provide translations through the editor even from outside without a development system.

In early development, you can create quick work by writing only in Korean, and later work through the editor, which is quite convenient for collaboration. Especially, it provides "machine translation functionality", so you can quickly provide translations.

Untranslated sentences are output in the default language, so there are no issues with empty text.

### Meta Tag Optimization

It optimizes for SEO and browsers by additionally inserting language information into HTML documents.

```html
<html lang="ko-KR" dir="ltr">
  <head>
  <link rel="alternate" hreflang="ko-KR" href="http://localhost:5173/posts">
  <link rel="alternate" hreflang="ja-JP" href="http://localhost:5173/ja-JP/posts">
  <link rel="alternate" hreflang="en-US" href="http://localhost:5173/en-US/posts">
  </head>
```

> The `lang` attribute in `<html lang="ko-KR" dir="ltr">` is an attribute that browsers consider for enabling translation options. The `dir` attribute controls the direction of text.

## How to Apply

There are two methods in total, but the difference is simply whether it's automated or not.
Let's look only at the well-integrated initializer with SvelteKit and exclude the basic initializer.

### Using paraglide-sveltekit Initializer

You can easily apply it to your project using the initializer.

```shell
npx @inlang/paraglide-sveltekit init
npm install
```

> You must run it with the `npx` command; other package managers are not supported.

After applying, there was one minor issue.
The automatically generated `ParaglideJS` component was wrapping exceptions as well.

To solve this problem, I modified it so that `ParaglideJS` doesn't include exceptions.

```svelte data-title="+layout.svelte"
<script>  
  import { ParaglideJS } from '@inlang/paraglide-sveltekit';  
  import { i18n } from '$lib/i18n';  
  
  const { children } = $props();  
</script>  

<ParaglideJS {i18n}> // [!code --]
  <svelte:head>  
    <title>{$page.data.title}</title>  
    <meta name="description" content={$page.data.description} />  
  </svelte:head>  

<ParaglideJS {i18n}> // [!code ++]
  <div id="container-content">  
   <Header title={$page.data.title} />  
   <main class="margin-block">  
    {@render children()}  
   </main>   <Footer gitLog={$page.data.gitLog} />  
  </div>  <Nav />
</ParaglideJS>
```

> The `svelte:head` component cannot exist inside other elements, so I moved it outside the `ParaglideJS` component.

## Usage

### Adding Internationalization Languages

If you used the SvelteKit initializer, files for each language are created in `/messages/{lang}.json`.
Initially, you can write in one language and provide additional translations using the editor.

Adding sentences to `/messages/ko-KR.json`

```json data-title="ko-KR.json"
{
    "$schema": "https://inlang.com/schema/inlang-message-format",  
    "title": "XIYO's Hole",  
    "description": "Archive and Lab and Playground and Blog",  
    "welcome": "For no js, no css! A blog made with svelte considering even terminal browsers... (Responsiveness improves when JS is enabled!)",  
}
```
> First, you only need to write in one language.

Now, when you run the project with `npm run dev`, Paraglide JS builds the language files at build time and generates `/src/lib/paraglide/messages.js`, allowing you to write type-safe code.

Using the generated `messages.js` for internationalized sentences will replace them according to the language when the language changes.

```svelte data-title="+page.svelte"
<script>  
  import Border from '$lib/ui/Border.svelte';  
  import * as m from '$lib/paraglide/messages.js'; // [!code focus]
</script>  
  
<Border viewTransitionName="post" negative>  
  <div class="padding content">  
   <p>{m.welcome()}</p> // [!code focus]
  </div>
</Border>
```

### Adding Language Selector

You can create and manage a separate component for changing languages.

```svelte data-title="LangSwitch.svelte"
<script>  
  import { availableLanguageTags } from '$lib/paraglide/runtime.js';  
  import { i18n } from '$lib/i18n.js';  
  import { page } from '$app/stores';  
</script>  
  
{#snippet switcher({href, lang})}  
  <li>
    <a {href} hreflang={lang}>  
      {lang}  
    </a>
  </li>
{/snippet}  
  
<ul>  
  {#each availableLanguageTags as lang}  
    {@render switcher({href: i18n.route($page.url.pathname), lang})}  
  {/each}
</ul>
```

> I used Svelte's snippet syntax for better modularization.

Now, just placing this selector where you want makes language switching work very easily.

![Language selector applied](/static/resources/apply-paraglidjs-20240918161625634.png)

> I placed the language selector in the navigation.

## Conclusion

While ParaglideJS provides simple internationalization features, there are points to be careful about when using it. Especially since components re-render entirely whenever the language changes, you need to be careful with components that might have different results on each render. For example, components containing random functions can cause unexpected behavior.

Also, since sentences provided by Paraglide JS are not state variables, you need to consider logic for cases where re-rendering doesn't occur.

Since it's not a library for markdown either, there's also the inconvenience of having to design with markdown internationalization in mind.