<script>
  import { onMount } from "svelte";
  import {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
  } from "../services/notesApi.js";
  import NoteForm from "../components/NoteForm.svelte";
  import Spinner from "../components/Spinner.svelte";
  import Modal from "../components/Modal.svelte";

  let notes = [];
  let loading = false;
  let error = "";

  let selectedNote = null;
  let editing = false;
  let deleting = false;

  let editTitle = "";
  let editContent = "";

  let search = "";
  let sort = "";
  let page = 1;
  let limit = 10;
  let totalVisible = 0;

  let searchDebounce;

  async function fetchNotesReactive() {
    loading = true;
    try {
      const result = await getNotes({ search, sort, page, limit });
      notes = result;
      totalVisible = result.length;
    } catch (err) {
      error = err.message;
      notes = [];
      totalVisible = 0;
    } finally {
      loading = false;
    }
  }

  // Initial load
  onMount(fetchNotesReactive);

  // Watchers for page and sort
  $: if (!searchDebounce && (sort)) {
    fetchNotesReactive();
  }

  // Debounce search input
  function handleSearchInput(e) {
    clearTimeout(searchDebounce);
    search = e.target.value;
    page = 1;
    error = ""

    searchDebounce = setTimeout(() => {
      fetchNotesReactive();
    }, 300);
  }

  function changePage(newPage) {
    page = newPage;
    fetchNotesReactive();
  }


  async function handleAddNote(newNote) {
    try {
      loading = true;
      const created = await createNote(newNote);
      notes = [created, ...notes];
    } catch (err) {
      alert("Error creating note");
    } finally{
      loading = false;
    }
  }

  function openEdit(note) {
    selectedNote = note;
    editTitle = note.title;
    editContent = note.content;
    editing = true;
  }

  async function saveEdit() {
    try {
      loading = true;
      const updated = await updateNote(selectedNote.id, {
        title: editTitle,
        content: editContent,
      });
      notes = notes.map((n) => (n.id === updated.id ? updated : n));
      editing = false;
    } catch {
      alert("Failed to update note");
    } finally{
      loading = false;
    }
  }

  function openDelete(note) {
    selectedNote = note;
    deleting = true;
  }

  async function confirmDelete() {
    try {
      loading = true;
      await deleteNote(selectedNote.id);
      notes = notes.filter((n) => n.id !== selectedNote.id);
      deleting = false;
    } catch {
      alert("Failed to delete note");
    } finally{
      loading = false;
    }
  }
</script>

<div class="p-4 max-w-4xl mx-auto">
  <h1 class="text-2xl font-bold mb-4">My Notes</h1>
  <!-- Search & Sort Controls -->
  <div
    class="flex flex-col items-center justify-between md:flex-row gap-3 mb-4"
  >
    <input
      type="text"
      placeholder="Search title..."
      value={search}
      on:input={handleSearchInput}
      class="p-2 border placeholder:text-gray-400 rounded-md w-full md:w-1/2"
    />

    <select bind:value={sort} class="p-2 border rounded-md">
      <option class="text-gray-400" value="">Sort by</option>
      <option class="text-gray-400" value="title">Title</option>
      <option class="text-gray-400" value="createdAt">Created At</option>
    </select>
  </div>

  <NoteForm onSubmit={handleAddNote} />

  {#if loading}
    <div class="flex items-center gap-3">
      <Spinner />
      <p>Loading notes...</p>
    </div>
  {:else if error}
    <p class="text-red-500">Error: {error}</p>
  {:else if notes.length === 0}
    <p>No notes found. Start by creating one!</p>
  {:else}
    <div class="grid md:grid-cols-2 gap-4">
      {#each notes as note}
        <div class="border rounded-lg p-4 shadow bg-white">
          <h2 class="font-semibold text-gray-800 text-lg">{note.title}</h2>
          <p class="text-sm text-gray-600 mt-1">{note.content}</p>
          <p class="text-xs text-gray-400 mt-2">
            Created: {new Date(note.createdAt).toLocaleString()}
          </p>

          <div class="mt-4 flex gap-2">
            <button
              on:click={() => openEdit(note)}
              class="px-3 py-1 bg-yellow-500 text-white rounded-lg cursor-pointer hover:bg-yellow-400 text-sm"
              >Edit</button
            >
            <button
              on:click={() => openDelete(note)}
              class="px-3 py-1 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-400 text-sm"
              >Delete</button
            >
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <!-- Edit Modal -->
  <Modal show={editing} title="Edit Note" onClose={() => (editing = false)}>
    <input class="w-full mb-2 p-2 border rounded" bind:value={editTitle} />
    <textarea class="w-full p-2 border h-36 rounded" bind:value={editContent}
    ></textarea>
    <div class="mt-4 text-right">
      <button
        disabled={loading}
        on:click={saveEdit}
        class="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700"
        >{loading ? 'Saving...' : 'Save'}</button
      >
    </div>
  </Modal>

  <!-- Delete Modal -->
  <Modal
    show={deleting}
    title="Confirm Delete"
    onClose={() => (deleting = false)}
  >
    <p>
      Are you sure you want to delete <strong>{selectedNote?.title}</strong>?
    </p>
    <div class="mt-4 text-right">
      <button
        disabled={loading}
        on:click={confirmDelete}
        class="bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-700"
        >{loading ? 'Deleting...' : 'Delete'}</button
      >
    </div>
  </Modal>

  <!-- Pagination -->
  <div class="flex justify-center mt-6 gap-2">
    <button
      on:click={() => changePage(page - 1)}
      class="px-4 py-2 bg-gray-200 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-300 disabled:opacity-50"
      disabled={page === 1}
    >
      Previous
    </button>

    <span class="px-4 py-2">Page {page}</span>

    <button
      on:click={() => changePage(page + 1)}
      class="px-4 py-2 bg-gray-200 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-300 disabled:opacity-50"
      disabled={totalVisible < limit}
    >
      Next
    </button>
  </div>
</div>
