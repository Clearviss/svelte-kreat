<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>SvelteKit Auth</title>
</svelte:head>

<nav>
	{#if !$page.data.user}
		<a href="/login">Logowanie</a>
		<a href="/register">Rejestracja</a>
	{/if}

	{#if $page.data.user}
		<a href="/admin">Ekwipunek</a>
		<a href="/posting">Posty</a>
		<p>Twoje pieniądze: {$page.data.user.money}$</p>
		<form action="/logout" method="POST">
			<button type="submit">Wyloguj</button>
		</form>
	{/if}
</nav>

<main>
	<slot />
</main>
