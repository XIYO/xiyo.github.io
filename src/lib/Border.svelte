<script>
    const { viewTransitionName, classes } = $props();
</script>
<div class="border-outer"
     style={
     viewTransitionName ? `--view-transition-name: border-outer-${viewTransitionName};` : ''}
>
    <div class={`border-inner ${ classes || ''}`}
         style={viewTransitionName ? `--view-transition-name: border-inner-${viewTransitionName};` : ''}
    >
        <slot />
    </div>
</div>