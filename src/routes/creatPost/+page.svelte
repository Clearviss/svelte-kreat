<script lang="ts">
	import { page } from '$app/stores';
	export let data: PageData;
	import type { PageData } from '../$types';
	$: ({ posciki } = data);
</script>

{#if $page.data.user}
	<h1>Zrób posta | {$page.data.user.name}</h1>
	<form action="?/creatPost" method="post">
		<textarea name="poscik" id="poscik" cols="30" rows="10">Tu możesz pisać</textarea> <br />
		<input type="submit" value="Zapisz" />
		<button formaction="?/deletePost">Usuń wszystkie (Twoje)</button>
		{#if $page.data.user.role == 'ADMIN'}
			<button formaction="?/deletePostall">Usuń wszystkie</button>
		{/if}
	</form>

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
