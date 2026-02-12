
<script lang="ts">
  import { form } from '$app/server';
    import Header from './Header.svelte';
  
  let formState = $state({
     name: '',
     birthday: '',
     step: 0,
     error: ''
  });
</script>

<Header name={formState.name}>
<p>Hello</p>
{#snippet secondChild()}
    <p>Second Child</p>
{/snippet}


</Header>

<main>
    <p>Step: {formState.step + 1}</p>

{@render formStep({question: "What's your name", id: "name", type: 'text'})}

    
{#if formState.error}
<p class="error">{formState.error}</p>
{/if}





</main>

{#snippet formStep( { question, id, type}: {
    type:string;
    id: string; question: string
})}
<article>
    <div>
        <label for={id}>{question}</label>
        <input {type} {id} bind:value={formState[id]}>
    </div>
</article>

{/snippet}







 


<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

