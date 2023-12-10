<script>
  import { onMount } from "svelte";
  import GoogleIcon from "@/components/icons/GoogleIcon.svelte";
  import handleGoogleSignIn from "@/firebase/utils/auth/handleGoogleSignIn";
  import Spinner from "../icons/Spinner.svelte";
  import { Button } from "../base/button";

  let loading = false;

  async function signIn() {
    loading = true;
    await handleGoogleSignIn();
    loading = false;
  }
</script>

<Button variant="google" on:click={signIn} disabled={loading}>
  {#if loading}
    <Spinner />
    Czekaj
  {:else}
    <GoogleIcon />
    Zaloguj z Google
  {/if}
</Button>
