<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Kreat</title>
</svelte:head>

<nav>
	{#if !$page.data.user}
		<a href="/login">Logowanie</a>
		<a href="/register">Rejestracja</a>
	{/if}

	{#if $page.data.user}
		<p>Twoje pieniądze: {$page.data.user.money}$</p>
		<a href="/admin">Ekwipunek</a>
		<a href="/creatPost">Posty</a>
		<a href="/klikaj">Klikaj by zarabiać</a>
		<span></span>
		<br />
		<div>
			<form action="/logout" method="POST">
				<button type="submit">Wyloguj</button>
			</form>
		</div>
	{/if}
</nav>

<main>
	<slot />
</main>

<style>
</style>
