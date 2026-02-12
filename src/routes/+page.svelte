<script lang="ts">
	import { onMount } from 'svelte';
	import 'grapesjs/dist/css/grapes.min.css';

	onMount(async () => {
		const grapesjs = (await import('grapesjs')).default;

		const editor = grapesjs.init({
			container: '#gjs',
			fromElement: true,
			height: '297mm',
			width: '210mm',
			storageManager: false
		});

		editor.BlockManager.add('section', {
			label: `
		<div style="padding:10px;text-align:center">
			<strong>Section</strong>
			<p style="font-size:12px">Layout section</p>
		</div>
	`,
			category: 'Layout',
			attributes: {
				title: 'Insert Section'
			},
			content: `
		<section style="padding:40px">
			<h1>Put your title here</h1>
			<div>Lorem ipsum dolor sit amet</div>
		</section>
	`
		});
	});
</script>

<div class="flex h-max items-start justify-center py-10">
	<div id="gjs" class="w-full border-2">
		<h1>hello world</h1>
	</div>
	<div id="blocks" class="w-[200px]"></div>
</div>
