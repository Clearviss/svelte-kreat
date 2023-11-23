<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from '../$types';
	export let data: PageData;
	$: ({ posciki } = data);
</script>

{#if $page.data.user}
	<h1>{$page.data.user.name}</h1>
	<h1>Tu są posty</h1>
	<a href="/posting">Przeglądaj posty</a>
	<a href="/creatPost">Zrób posta</a>
	{#each posciki as poscik}
		{#if poscik.userId == $page.data.user.name}
			<article>
				<header><h3>{poscik.userId} (Ty)</h3></header>
				<p>{poscik.content}</p>
			</article>
		{:else}
			<article>
				<header><h3>{poscik.userId}</h3></header>
				<p>{poscik.content}</p>
			</article>
		{/if}
	{/each}
{:else}
	<h1>Nie powinno cie tu być!!!</h1>
{/if}
