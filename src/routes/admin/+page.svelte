<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from '../$types';
	export let data: PageData;
	let limit = 0;
	let koszt = 500;
	let dziala = false;
	$: ({ ekwipunek } = data);

	export async function otworz(koszt: number) {
		const resp = await fetch('api/otworz', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ koszt: koszt })
		});
		const dataresp = await resp.json();
		if (dataresp.zadluzony) {
			dziala = true;
			console.log(data);
		} else {
			dziala = false;
			$: ({ ekwipunek } = data);
			console.log(dataresp);
			location.reload();
		}
	}
	export async function sprzedaj(id: string, wartosc: number) {
		await fetch('api/sprzedaj', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: id, wartosc: wartosc })
		});
		location.reload();
	}
</script>

<h1>Ekwipunek</h1>

{#if $page.data.user}
	<p>Witaj {$page.data.user.name}!</p>
	<input type="button" value="Otwórz skrzynie! (500$)" on:click={() => otworz(koszt)} />
	{#if dziala}
		<p style="color: red; font-size: 30px;">Masz za mało pieniędzy!</p>
	{/if}
	{#if ekwipunek.length != 0}
		<p>
			Wylosowałeś {ekwipunek[ekwipunek.length - 1].nazwa}
			{ekwipunek[ekwipunek.length - 1].wartosc}$
		</p>
	{/if}

	<p>Oto zawartość twojego ekwipunku:</p>
	<ol>
		{#each ekwipunek as item}
			<li>
				{item.nazwa}
				{item.wartosc}$
				<input type="button" value="Sprzedaj" on:click={() => sprzedaj(item.id, item.wartosc)} />
			</li>
		{/each}
	</ol>
{/if}
