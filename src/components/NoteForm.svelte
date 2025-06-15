<script>
  export let onSubmit;

  let hide = true;
  let title = "";
  let content = "";

  function handleSubmit() {
    if (!title.trim() || !content.trim()) return;
    onSubmit({ title, content });
    title = "";
    content = "";
    hide = true;
  }
</script>

<div>
  <div class={`${hide ? "flex items-center justify-end" : "hidden"}`}>
    <button
      class="text-xs bg-blue-500 text-white font-bold mb-2 py-1.5 px-2 rounded-lg cursor-pointer hover:bg-blue-400"
      on:click={() => (hide = !hide)}
    >
      Create a Note
    </button>
  </div>

  <div
    class={`${hide ? "hidden" : "block"} bg-white p-4 rounded-lg shadow mb-6`}
  >
    <h2 class={`text-xl font-bold mb-2 underline`}>Create a Note</h2>
    <form on:submit|preventDefault={handleSubmit} class={`space-y-3`}>
      <input
        class="w-full p-2 border rounded"
        placeholder="Title"
        bind:value={title}
        required
      />
      <textarea
        class="w-full p-2 border rounded"
        placeholder="Content"
        bind:value={content}
        required
      ></textarea>

      <div class="flex items-center justify-end gap-3">
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          Add Note
        </button>

        <button
          type="button"
          class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer"
          on:click={() => (hide = !hide)}
        >
          Close
        </button>
      </div>
    </form>
  </div>
</div>
