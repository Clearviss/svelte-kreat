<script lang="ts">
  import type { User } from "firebase/auth";
  import { Button } from "@/components/base/button";
  import Spinner from "./icons/Spinner.svelte";
  export let user: User;

  function signOut() {
    // Implement your sign-out logic here
    // For example, clear user session, redirect to home page, etc.
  }
</script>

<div
  class="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20"
>
  <div class="max-w-2xl" />
  {#if user}
    <!-- User is logged in, show Sign out button -->
    <div class="max-w-md w-full rounded-xl shadow-lg p-5 mt-16 bg-white">
      <div class="flex flex-col items-center justify-center gap-4">
        <Button
          href="/dashboard"
          variant="outlined"
          class="w-full transform hover:-translate-y-1">Panel Główny</Button
        >
        <form class="w-full" action="/api/auth/signout">
          <Button type="submit" class="w-full transform hover:-translate-y-1"
            >Wyloguj</Button
          >
        </form>
      </div>
    </div>
  {:else}
    <!-- No user is logged in, show Sign up and Sign in buttons -->
    <div class="max-w-md w-full rounded-xl shadow-lg p-5 mt-16 bg-white">
      <div class="flex flex-col items-center justify-center gap-4">
        <Button
          href="/signin"
          variant="outlined"
          class="w-full transform hover:-translate-y-1"
        >
          Zaloguj
        </Button>
        <Button href="/signup" class="w-full transform hover:-translate-y-1">
          Zarejestruj
        </Button>
      </div>
    </div>
  {/if}
</div>
<div class="h-[1000px]" />
