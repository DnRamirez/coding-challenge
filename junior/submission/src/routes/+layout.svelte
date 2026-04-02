<script lang="ts">
	import { page } from '$app/state';
	let { children } = $props();
</script>

<nav> 
	{#if page.url.pathname !== '/'}
	<a href="/">Return Home</a>
	{/if}
</nav>

<main> 
{@render children()}
</main>

<style> 
	nav {
		margin-bottom: 20px;
	}

	a {
		text-decoration: none;
		color: #0070f3;
		font-weight: bold;
		padding: 8px 16px;
	}

	a:hover {
		text-decoration: underline;
	}
	main {
		padding: 0 20px;
	}
</style>