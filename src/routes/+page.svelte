<script>
	import { article } from '$lib/utils/articleData';
	import { registerArticleBackBlocks } from '$lib/utils/grapejs/blocks/article/back';
	import { registerArticleContentBlocks } from '$lib/utils/grapejs/blocks/article/content';
	import { registerArticleMetadataBlocks } from '$lib/utils/grapejs/blocks/article/metadata';
	import { registerJournalBlocks } from '$lib/utils/grapejs/blocks/journal';
	import { initGrapejs } from '$lib/utils/grapejs/init';
    import 'grapesjs/dist/css/grapes.min.css';
	import { onMount } from "svelte";

    let editor = $state('')
    onMount(()=>{
        editor = initGrapejs()
    })

    $effect(()=>{
        if (editor) {
            registerJournalBlocks(editor, article.journal)
            registerArticleMetadataBlocks(editor, article.article.metadata)
            registerArticleContentBlocks(editor, article.article.content)
            registerArticleBackBlocks(editor, article.article.back)
        }
    })
</script>

<div class="h-screen max-h-screen">
    <div id="gjs"></div>
</div>

<style>
    /* :global(.gjs-cv-canvas) {
        padding: 0 10mm !important;
        max-height: 100vh !important;
        overflow: auto !important;
    } */

    :global(.gjs-pn-devices-c) {
        height: 40px !important;
    }
</style>