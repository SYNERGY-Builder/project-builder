<script>
	// @ts-nocheck
	import { registerArticleBackBlocks } from '$lib/utils/grapejs/blocks/article/back';
	import { registerArticleContentBlocks } from '$lib/utils/grapejs/blocks/article/content';
	import { registerArticleMetadataBlocks } from '$lib/utils/grapejs/blocks/article/metadata';
	import { registerJournalBlocks } from '$lib/utils/grapejs/blocks/journal';
	import { initGrapejs } from '$lib/utils/grapejs/init';
	import 'grapesjs/dist/css/grapes.min.css';
	import { onMount } from 'svelte';

	let editor = $state(null);

	onMount(() => {
		// Inisialisasi editor
		initGrapejs()
		const editorInstance = initGrapejs();
		editor = editorInstance;
	});
</script>

<div>
	<div id="gjs"></div>
</div>

<style>
	:global(.gjs-pn-devices-c) {
		height: 40px;
		text-decoration: none;
	}

	:global(.gjs-sel-arrow) {
		display: none;
	}

	:global(.custom-import-btn),
	:global(.custom-delete-btn) {
		font-family: 'Font Awesome 6 Free' !important;
		font-weight: 900 !important;
		font-size: 16px !important;
		display: flex !important;
		align-items: center;
		justify-content: center;
	}

	:global(.custom-import-btn::before) {
		content: '\f56f' !important;
		color: #3b82f6;
	}

	:global(.custom-delete-btn::before) {
		content: '\f1f8' !important;
		color: #ff4d4f;
	}
</style>
