<script>
    import { onMount } from "svelte";
    import FacebookIcon from "@/components/icons/FacebookIcon.svelte";
    import handleFacebookSignIn from "@/firebase/utils/auth/handleFacebookSignIn";
    import Spinner from "../icons/Spinner.svelte";
    import { Button } from "../base/button";

    let loading = false;

    async function signIn() {
        loading = true;
        await handleFacebookSignIn();
        loading = false;
    }
</script>

<Button variant="google" on:click={signIn} disabled={loading}>
    {#if loading}
        <Spinner />
        Czekaj
    {:else}
        <FacebookIcon />
        Zaloguj z Facebook
    {/if}
</Button>
