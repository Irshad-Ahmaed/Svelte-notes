<script>
  import {onMount} from 'svelte'
  import NotesPage from './pages/NotesPage.svelte';
  let dark = localStorage.getItem('theme') === 'dark';

  onMount(() => {
    dark = localStorage.getItem('theme') === 'dark';
  });

  $: {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }
</script>

<!-- App layout -->
<main class="min-h-screen w-full bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
  <div class="p-4 text-right">
    <button
      class={`p-3 shadow-md rounded-full cursor-pointer bg-gray-200 dark:bg-gray-700 text-sm ${dark ? 'hover:bg-gray-400 hover:text-gray-600' : 'hover:bg-gray-500 hover:text-gray-300'} transition-all duration-300`}
      on:click={() => dark = !dark}
    >
      <span>{ dark ? '🌞' : '🌙'}</span>
    </button>
  </div>

  <NotesPage />
</main>