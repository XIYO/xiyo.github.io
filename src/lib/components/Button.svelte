<script>
	export let variant = 'primary';
	export let size = 'medium';
	export let disabled = false;
</script>

<button 
	class={`btn btn-${variant} btn-${size}`}
	{disabled}
	on:click
>
	<slot />
</button>

<style>
	.btn {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 0.25rem;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.2s;
	}
	
	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	
	.btn-primary {
		background-color: #3b82f6;
		color: white;
	}
	
	.btn-primary:hover:not(:disabled) {
		background-color: #2563eb;
	}
	
	.btn-secondary {
		background-color: #6b7280;
		color: white;
	}
	
	.btn-secondary:hover:not(:disabled) {
		background-color: #4b5563;
	}
	
	.btn-small {
		padding: 0.25rem 0.5rem;
		font-size: 0.875rem;
	}
	
	.btn-medium {
		padding: 0.5rem 1rem;
		font-size: 1rem;
	}
	
	.btn-large {
		padding: 0.75rem 1.5rem;
		font-size: 1.125rem;
	}
</style>