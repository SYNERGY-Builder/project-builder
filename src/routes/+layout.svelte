
<script lang="ts">

<script>
	import './layout.css';

	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>


<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{@render children()}
