<script>
  const { json } = $props();
  const computed = $derived(typeof json === 'function' ? json() : json);
  const safe = $derived(computed ? String(computed).replace(/</g, '\\u003c') : '');
</script>

{@html `<script type="application/ld+json">${safe}</script>`}
