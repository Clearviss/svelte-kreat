<script lang="ts">
	import type { ActionData } from './$types';
	import { Turnstile } from 'svelte-turnstile';
	import { enhance } from '$app/forms';
	export let form: ActionData;
</script>

<h1>Rejestracja</h1>

<form action="?/register" method="POST" use:enhance>
	<div>
		<label for="username">Login/Nazwa</label>
		<input id="username" name="username" type="text" required />
	</div>

	<div>
		<label for="password">Hasło</label>
		<input id="password" name="password" type="password" required />
	</div>
	<div>
		<Turnstile siteKey="0x4AAAAAAAMnEeEGpqoUhSke" />
	</div>
	{#if form?.user}
		<p class="error">Nazwa zajęta.</p>
	{/if}
	{#if form?.kapcza}
		<p class="error">Zła kapcza!</p>
	{/if}

	<button type="submit">Zarejestruj</button>
</form>
