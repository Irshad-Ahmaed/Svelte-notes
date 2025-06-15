<script>
  export let show = false;
  export let title = '';
  export let onClose = () => {};
</script>

{#if show}
  <div class="fixed inset-0 px-3 lg:p-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg max-w-md w-full">
      <h2 class="text-lg font-bold mb-4">{title}</h2>
      <slot />
      <div class="mt-4 text-right">
        <button
          class="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer hover:bg-gray-400"
          on:click={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
{/if}