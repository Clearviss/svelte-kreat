<script lang="ts">
	export let zarobione = 0;
	import { page } from '$app/stores';
	let cena = 10;
	export async function klik(koszt: number) {
		const resp = await fetch('api/klik', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ koszt: koszt })
		});
		const data = await resp.json();
		zarobione += 10;
	}
</script>

{#if $page.data.user}
	<nav>
		{#if !$page.data.user}
			<a href="/login">Logowanie</a>
			<a href="/register">Rejestracja</a>
		{/if}

		{#if $page.data.user}
			<p>Twoje pieniądze: {$page.data.user.money + zarobione}$</p>
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
	<h1>Klikaj by zarabiać</h1>
	<input type="button" value="Klik (10$)" on:click={() => klik(cena)} />
{/if}
