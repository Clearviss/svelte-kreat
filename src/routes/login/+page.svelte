<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	export let form: ActionData;
</script>

<h1>Login</h1>

<form action="?/login" method="POST" use:enhance>
	<div>
		<label for="username">Login/Nazwa</label>
		<input id="username" name="username" type="text" required />
	</div>

	<div>
		<label for="password">Hasło</label>
		<input id="password" name="password" type="password" required />
	</div>

	{#if form?.invalid}
		<p class="error">Pustego nie możesz cieciu.</p>
	{/if}

	{#if form?.credentials}
		<p class="error">Źle!!!!!!!.</p>
	{/if}

	<button type="submit">Zaloguj</button>
</form>
