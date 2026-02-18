<script lang="ts">
    import { onMount } from 'svelte';
    import { initGrapejs } from '$lib/utils/grapejs/init';

    let editorContainer: HTMLElement | null = null;
    let editor;

    onMount(() => {
        if (editorContainer) {
          editor = initGrapejs(editorContainer);
        }
    });
</script>

<div bind:this={editorContainer} class="editor-container"></div>

<style>
  .editor-container {
    height: 100vh;
    width: 100%;
    border: 1px solid #ddd;
  }

  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

</style>
