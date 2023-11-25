<script lang="ts">
	import { page } from '$app/stores';
	import { fail } from '@sveltejs/kit';
	import type { PageData } from '../$types';
	export let data: PageData;
	let limit = 0;
	let koszt = 500;
	let dziala = false;
	$: ({ ekwipunek } = data);
	let nazwa_przedmiotu = '';
	let wartosc_przedmitu = 0;
	const przedmioty = {
		Potka: 500,
		Miecz: 1000,
		Złoto: 5000,
		Sakwwa: 100,
		Hełm: 300,
		Zbroja: 600,
		Kupon: 100,
		Moneta: 1,
		Komponent: 50,
		Różdża: 1200,
		Kapelusz: 200,
		Tarcza: 400,
		Niespodzianka: 150,
		Skarpetki: 250,
		Grzebień: 180,
		Dynia: 80,
		Kij: 350,
		Klepsydra: 700,
		Pizza: 420,
		Kanapka: 30,
		Pióro: 800,
		Kieliszek: 90,
		Kamera: 600,
		Melodia: 200,
		Smok: 2000,
		Skrzynia: 300,
		Lornetka: 180,
		Lampka: 120,
		Medalion: 480,
		Diament: 1500,
		Koparka: 1000,
		Czekolada: 70,
		Dzwonek: 50,
		Kostium: 350,
		Banana: 40,
		Kapcie: 120,
		Błazen: 300,
		Laptop: 800,
		Galaktyka: 50000,
		Skarpety: 60,
		Rewolwer: 800,
		Arbuz: 90,
		Kura: 200,
		Termos: 180,
		Misio: 100,
		Karafka: 250,
		Pingwin: 150,
		Kaktus: 30,
		Nocnik: 70,
		Wazon: 110,
		Maskotka: 120,
		Rakieta: 900,
		Kołdra: 200,
		Słomka: 10,
		Flet: 130,
		Krzesło: 80,
		Guma: 5,
		Kredki: 40,
		Deska: 300,
		Wiewiórka: 120,
		Pudełko: 150,
		Pianino: 1000,
		Miotełka: 70,
		Dinozaur: 250,
		Cukierek: 15,
		Gitara: 550,
		Słuchawki: 120,
		Klucz: 90
	};

	export async function otworz(koszt: number) {
		if (data.user.money < koszt) {
			dziala = true;
		} else {
			dziala = false;
			let los = Math.floor(Math.random() * Object.keys(przedmioty).length);
			nazwa_przedmiotu = Object.keys(przedmioty)[los];
			wartosc_przedmitu = Object.values(przedmioty)[los];
			await fetch('api/otworz', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ wartosc: wartosc_przedmitu, nazwa: nazwa_przedmiotu, koszt: koszt })
			});
		}
	}
	export async function sprzedaj(id: string, wartosc: number) {
		await fetch('api/sprzedaj', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: id, wartosc: wartosc })
		});
	}
</script>

<h1>Ekwipunek</h1>

{#if $page.data.user}
	<p>Witaj {$page.data.user.name}!</p>
	<input type="button" value="Otwórz skrzynie! (500$)" on:click={() => otworz(koszt)} />
	{#if dziala}
		<p>Masz za mało pieniędzy!</p>
	{/if}
	<p>Wylosowałeś {nazwa_przedmiotu} {wartosc_przedmitu}$</p>
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
