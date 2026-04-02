<script lang="ts">
	import { page } from '$app/state';
	let { children } = $props();
</script>

<nav> 
	{#if page.url.pathname !== '/'}
	<a href="/">Return Home</a>
	{/if}
</nav>


{@render children()}
