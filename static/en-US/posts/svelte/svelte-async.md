---
authors:
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
  - XIYO
dates:
  - '2025-05-26T12:36+0900'
  - '2025-05-26T12:35+0900'
  - '2025-05-25T22:53+0900'
  - '2025-05-25T22:37+0900'
  - '2025-05-25T22:36+0900'
  - '2025-05-25T22:34+0900'
  - '2025-05-25T22:33+0900'
messages:
  - ':zap: Svelte 5 automatic parallelization optimization for async calls (performance improvement)'
  - ':zap: Added automatic parallelization for async processing in Svelte 5 (performance optimization and developer convenience)'
  - ':art: Modified and improved svelte-async.md document content'
  - ':art: Modified title and added content to svelte-async.md document'
  - ':art: Modified explanation about using await in <script> section in svelte-async.md document'
  - ':memo: Async in Svelte'
  - ':memo: Async in Svelte'
title: Svelte's Async Processing Support
description: 'Svelte 5 Async Processing Improvements: Comparison with existing SvelteKit approaches.'
---
# Svelte's Async Processing Support

Svelte 5 Async Processing Improvements: Comparison with existing SvelteKit approaches.

Could Svelte finally be growing to enterprise-grade?

## Overview: SvelteKit's Async Processing Issues and Svelte 5's Promise

Svelte 5, through Rich Harris's **"What Svelte Promises"** session at Svelte Summit 2024, announced major improvements to async processing mechanisms. It solves the inconveniences of async data loading that existing SvelteKit developers faced (e.g., **mandatory use of load functions**, router-dependent data fetching, **complex type definitions**, slow sequential processing, multiple loading screens, etc.), enabling **concise and intuitive async code at the component level**. In this section, we'll compare the existing approach in SvelteKit (Svelte 3/4) with the newly introduced methods in Svelte 5 through actual development scenarios, and examine how each improves the developer experience.

## Existing SvelteKit Async Processing

### load Function and Various Limitations

SvelteKit's traditional data loading used **page file load functions** or component onMount/{#await} blocks. For example, to fetch data in a page component, you would implement export async function load() in +page.ts, perform fetch, and then use the passed props in the page Svelte component. While this approach had the advantage of pre-rendering initial data through SSR (server-side rendering), there were several inconveniences from a developer's perspective:

- **Logic split across multiple places**: The UI and data logic of page components were separated, making it **difficult to understand the entire flow in one file**. Even for simple data requests, you had to switch between the load function file and the Svelte component file.

- **Router dependency**: Since load functions are bound to SvelteKit routing and only work at the page level, **they cannot be used in regular components**, and non-page components had to fetch data separately in onMount. This reduced the reusability of router-independent components.

- **Complex type definitions**: In TypeScript environments, the return value of load functions is defined by the PageData type that SvelteKit generates based on routes, requiring separate generic type declarations or .d.ts configuration. This made **type generation cumbersome** and the auto-generated types difficult for developers to fully understand, leading to criticism of **"type shenanigans"**.

- **Delays due to sequential processing**: When there were consecutive async operations inside load functions or onMount, they were **executed sequentially by default**. Unless developers explicitly used Promise.all, multiple fetches occurred serially, causing **slow loading issues**.

- **Multiple loading states**: When multiple components each handled async processing, they had to manage loading spinners individually. For example, if parent and child components each fetched data, **two or more loading UIs ("spinners") would appear on screen** or the UI would jerk sequentially as data arrived at different times. To resolve this, **prop-drilling** was needed to fetch all data in one place and pass it down as props, but this pattern made the code structure rigid.

Thinking about these issues in real-world cases, we can recall implementing a **blog post page**. In SvelteKit, you would write the following to load post content and comment list:

- **Existing approach (SvelteKit 1.x)** – Fetch post content and comment data **simultaneously** in the load function of +page.ts:

```ts
// +page.ts - Existing SvelteKit approach
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const postRes = await fetch(`/api/posts/${params.id}`);
	const commentsRes = await fetch(`/api/posts/${params.id}/comments`);
	return {
		post: await postRes.json(),
		comments: await commentsRes.json()
	};
};
```

```svelte
<!-- +page.svelte -->
<script>
  export let data; // Data passed from load function
  const { post, comments } = data;
</script>

<h1>{post.title}</h1>
<p>{post.content}</p>
<CommentsList {comments} />
```

- This approach has the advantage of receiving both post and comments through SSR and rendering them on the initial screen, but developers must **pre-load all related data in one place**. If we made the CommentsList component fetch data internally, the SSR benefits would disappear and we'd have to manage loading UI for both.

- **Inconvenience of the existing approach**: As seen in the code above, listing multiple fetches in the load function causes them to **execute sequentially** by default, so the second fetch only starts after the first completes. Unless developers consciously apply Promise.all, **data cannot be loaded in parallel, causing delays**. Also, processing all data in load can lead to unnecessarily loading unused data (passed as props but not actually used) or making it difficult to identify which data is used during code cleanup, resulting in **"unnecessary logic remaining"**.

For these reasons, SvelteKit's existing async strategy has **shown limitations in terms of developer convenience**. Now, let's look at how Svelte 5 solves these issues by examining each improvement.

## Improvement 1: Component-level await Support – Concise Data Loading

**In Svelte 5, you can use await directly in the component's `<script>` section.** In other words, you can **treat the component itself like an async function** to fetch async data directly. This aligns with the "minimal ceremony" principle, allowing you to use it **just like writing JavaScript code without framework-specific APIs**. Developers no longer need to rely on page-specific load functions or onMount, and can **fetch data directly where needed**.

For example, converting the blog post page mentioned earlier to Svelte 5 style:

```svelte
<!-- Svelte 5: Direct await in page component -->
<script>
  import CommentsList from './CommentsList.svelte';
  export let id;  // Post ID passed from page router
  const postRes = fetch(`/api/posts/${id}`);
  const commentsRes = fetch(`/api/posts/${id}/comments`);
  // Start fetch requests in parallel then await each result
  const post = await postRes.then(r => r.json());
  const comments = await commentsRes.then(r => r.json());
</script>

<h1>{post.title}</h1>
<p>{post.content}</p>
<CommentsList {comments} />
```

As shown in the code above, we **used await at the top level of the component script** to fetch data. The Svelte 5 compiler provides a mechanism to render components asynchronously to handle such code, and developers can write as if writing synchronous code. **The improvements compared to the old approach are:**

- **Logic concentrated in a single file**: The load function file is eliminated or minimized. Since UI composition and data request logic are in one place, **code readability is improved and management is easier**.

- **Breaking free from router dependency**: Since data can be freely loaded inside components, **any component can handle async data on its own**, not just at the page level. For example, the `<CommentsList>` component can also use await fetch(...) to fetch data if needed (previously had to receive from page load as props or handle in internal onMount).

- **Simplified type handling**: Using `const post = await fetch().then(r=>r.json())`, the type of post is **determined by normal TS inference**. You don't have to worry about separate PageData interfaces, and can handle types in **familiar TypeScript ways** like specifying generic types for fetch responses. As a result, it reduces the time developers spend learning SvelteKit-specific type generation rules or pondering complex generic declarations.

- **Reduced code volume**: Unnecessary boilerplate disappears. Instead of extracting fetch or params from the load function's context object and constructing return objects one by one, you can directly assign needed data to variables. Rich Harris also mentioned about Svelte 5 that "you will write less code", and this simplified data loading approach is one example.

In summary, **with component-level await support, developers can intuitively write logic to fetch desired data at desired times**, becoming less bound by SvelteKit's routing or rules. This leads to improved maintenance convenience and development productivity.

> **Note:** Currently in Svelte 5, the component top-level await feature is being introduced experimentally, and you can specify **UI to display during loading (pending snippet)** by wrapping async areas with a special component called `<svelte:boundary>` (https://svelte.dev/docs#svelte_boundary). For example, wrapping the above component with `<svelte:boundary pending={<p>Loading...</p>}> ... </svelte:boundary>` will only display "Loading..." until all data is ready, then render the interior all at once when ready. This way, Svelte 5 provides an easy way to display loading states without the existing `{#await ... then ...}` blocks.

## Improvement 2: Automatic Synchronized Rendering – Consistent and Clean UI Updates

A core philosophy of Svelte 5's async processing is **"automatic coordination"**. This means **the framework automatically synchronizes and handles async operations and state changes**, greatly reducing the need for developers to write complex code to manually manage UI state. Specifically, by **deferring related UI updates until async operations complete**, it can **provide consistent screen transitions to users**.

In a practical scenario, let's reconsider **displaying post content while loading user comments on a post detail page**. In the existing SvelteKit approach, after the parent component displayed the post, the child `<CommentsList>` component would fetch comments in onMount and render the list when loading finished. In this case, users would see **the post initially visible but a loading spinner in the comment area**. The list would only appear after comment data arrived. This is a common UX pattern caused by **parent and child each managing their own loading states**. Or as mentioned earlier, fetching all data at once would delay everything due to the slower one, or conversely, if drawn all at once with SSR, development convenience was sacrificed.

With Svelte 5's **automatic synchronized rendering**, **the framework automatically processes parent and child component async operations in parallel and reflects results on screen all at once**. For example, the following flow is possible in Svelte 5:

- The parent component fetches post data with await and simultaneously creates commentsPromise to pass to the child (fetch call). At this time, **the two fetches proceed in parallel**, with the parent waiting until post is ready and the child waiting until comments are ready.

- If components are wrapped with `<svelte:boundary>`, they **maintain the existing screen or display only a common loading UI until all async operations complete**. When async processing completes, both parent-child components **render simultaneously with the latest data**, so no awkward empty screens or multiple spinners appear in between.

- If **other state changes during async waiting** (e.g., user interacts with other parts of the screen), that part updates immediately while handling to avoid conflicts with async operation results. In other words, it performs smart operations that **wait for what needs waiting while reflecting changes that don't need waiting in real-time**.

As a result, in Svelte 5, **UI instability due to async data loading is greatly reduced without developers having to pay special attention**. From the user's perspective, they see all data prepared as a **consistent complete screen** or at least a screen that transitions all at once, improving the experience. From the developer's perspective, the burden of solving concerns like **"when to turn loading displays on and off"** and **"how to match parent-child data loading order"** disappears. Since the Svelte compiler and runtime handle this coordination, we can **focus on core logic**.

For example, thanks to **Svelte 5's automatic synchronized rendering**, we can compare:

| **Scenario**              | **Existing SvelteKit (Svelte 4)**                                                                                                        | **Svelte 5 Approach**                                                                                                                      |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Post + Comments Load      | - Fetch both data in SSR `load` function<br>- Parent renders first, then shows loading spinner in child area<br>- Replace when child data arrives | - Parent awaits `post`, child awaits `comments` (parallel processing)<br>- Show common loading UI with `<svelte:boundary>`<br>- Render simultaneously when complete |
| Intermediate State Exposure | - Shows post first, comments area empty, etc. intermediate states exposed                                                                | - Shows only complete screen or loading UI                                                                                                 |
| Number of Loading UIs     | - Need to manage spinners for parent/child each                                                                                          | - Can unify with single `<svelte:boundary>`                                                                                                |

As shown in the comparison above, **Svelte 5's automatic synchronized rendering allows developers to implement excellent UX with simple code, and users experience smoother screen transitions.** Rich Harris, mentioning concepts similar to Suspense introduced by React, Vue, etc., was confident that Svelte can provide **component-level async with better ergonomics and fewer drawbacks through compiler-driven design**.

## Improvement 3: Parallel Processing by Default & Fine-grained Reactivity – Fast and Efficient Updates

In Svelte 5, **performance optimization is automatically built-in** for async processing and reactivity. The two keywords are **"parallel by default"** and **"fine-grained reactivity"**.

### Faster Async Execution with Default Parallel Processing

Before Svelte 5, unless developers consciously coded async calls to execute in parallel, JavaScript's await caused sequential execution. For example, doing `await fetchA(); await fetchB();` in onMount would execute B only after A finished. **Svelte 5 optimized even this part at the compile stage to execute in parallel by default.** For instance, the Svelte 5 compiler might internally transform the above code like this:

```js
// How Svelte 5 compiler internally handles (example)
const _p1 = fetchA();
const _p2 = fetchB();
const [resultA, resultB] = await Promise.all([_p1, _p2]);
```

In other words, even if developers wrote sequential awaits, it makes **the two fetches actually proceed simultaneously**. This **"automatic parallelization"** is specified as one of Svelte 5's async processing design requirements ("Since expressions in templates can be assumed to be pure, sequential awaits can be optimized to not necessarily mean sequential operations"). Similarly, **async operations of multiple sibling components are also automatically performed in parallel**. This means developers can get **optimal loading speed** without writing or refactoring separate code for parallel processing. As a result, along with **overall app response speed improvement**, it minimizes unnecessary delays even in slow network environments.

### Update Only What's Needed with Fine-grained Reactivity

Svelte is already famous for efficient reactivity that updates only the DOM parts where changes occur. Svelte 5 goes a step further and **made the tracking unit of reactivity even more granular**. With the introduction of new **rune**-based state management ($state, $derived, etc.), it can track down to object property levels and **re-evaluate and re-render only changed parts**. For instance, until Svelte 4, you had to replace the entire object obj or use the store API to handle internal property changes reactively, but in Svelte 5, just `obj.someProp = newValue` updates only the UI using that property. Rich Harris explained that Svelte 5's compiler enabled **"language-level fine control and efficient state updates"**.

This **fine-grained reactivity** solves the previously mentioned **"coarse-grained invalidation" problem**. In the existing SvelteKit load approach, since all data was bundled at page-level, even small changes would invalidate and recalculate the entire load result. But in Svelte 5, each await or reactive state is tracked **independently** and updated only when needed. For example, when only the "like" count of one item in a post list the user is viewing increases, previously you had to refresh the entire list data or manually optimize, but now **only the like number part of that item updates**. This **greatly reduces DOM updates and computation to improve performance**, allowing developers to get efficient behavior without writing unnecessary optimization code.

Also, Svelte 5's reactivity improvements enhance developer experience. For instance, state declared with $state can be seen as **unifying the concepts of component local state and Svelte stores**, so **parts that were complicated by overusing stores for global state management in existing SvelteKit or coding complexly to maintain local state are expected to become simpler**. In summary, **Svelte 5's fine-grained reactivity is a change that catches both performance and DX (developer experience)**.

## Summary: SvelteKit vs Svelte 5 – What Changed (Comparison Table)

Finally, let's summarize by **comparing existing SvelteKit approaches with Svelte 5 approaches** focusing on the improvements we've examined:

| Improvement Element    | Existing SvelteKit (Svelte 3/4)                                                                                           | Svelte 5                                                                                                |
|------------------------|----------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| Data Loading Method    | Fetch data in page-specific load function → inject as props to component. Or handle inside component onMount/{#await} blocks (no SSR support). | Can use await directly at top of component `<script>`. Load data like assigning regular variables **without framework APIs**. |
| Router Dependency      | Data logic bound to router making **component reuse difficult**. (Non-page components must give up SSR benefits for self-loading)     | **Reduced router dependency** – any component can use await fetch if needed. **Same pattern** regardless of page/layout distinction. |
| Types & Boilerplate    | Need separate definitions following PageData types generated by SvelteKit. **Repetitive code** like destructuring load results to receive as props. | Use normal TS type inference. **Reduced boilerplate** since processing in one place. Type safety naturally secured. |
| Async Execution Method | await calls are **processed sequentially** by default. (Explicit consideration needed for parallel processing)                     | **Default parallel processing** – sequential awaits also optimized for concurrent execution internally. Multiple component fetches also proceed in parallel (reduced network delays). |
| Loading UI             | **Multiple spinners**/placeholders can appear separately. (Consistent loading screen possible only with manual coordination by developer) | Can **unify loading screen** with `<svelte:boundary>`. **Automatic synchronized rendering** doesn't show incomplete intermediate states to users. |
| Reactivity/Update Scope | **Entire page data refreshed** on load invalidation (coarse-grained). Component local state also needs entire replacement for objects. | Update only changed parts with **fine-grained reactivity**. Reduced unnecessary recalculation, better performance and smoother UX. |

As shown in the table above, **Svelte 5 is moving in the direction of carefully supplementing existing shortcomings to provide developers with a simple and enjoyable coding experience and users with better performance and UX.** Rich Harris actually emphasized that Svelte 5 is a framework that's "just better in every way", and this is not just a promotional phrase but confidence backed by these practical improvements we've examined.

Finally, these changes have a big impact on SvelteKit as well. The Svelte team has indicated plans to **gradually move away from existing primitives like load functions**, and **more intuitive data fetching patterns are expected to emerge** with Svelte 5. To summarize, **Svelte 5's async processing improvements achieve a win-win where developers can do more with less code and user experience is improved by resolving the inconveniences that past SvelteKit development had.** In future development using Svelte 5, time spent on complex async logic will decrease, allowing more focus on the application's core logic and feature implementation.

**References:** Rich Harris, _"What Svelte Promises"_, Svelte Summit 2024; Svelte official blog and RFC documents (Asynchronous Svelte discussions), etc.