<script>
	import { initGrapejs } from '$lib/utils/grapejs/init';
    import 'grapesjs/dist/css/grapes.min.css';
	import { onMount } from "svelte";

    let editor = $state('')
    onMount(()=>{
        editor = initGrapejs()
    })
</script>

<div>
    <div id="gjs"></div>
</div>

<style>
    :global(.gjs-pn-devices-c) {
        height: 40px !important;
    }
</style>