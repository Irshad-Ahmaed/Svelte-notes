const BASE_URL = import.meta.env.VITE_BASE_URL;

// GET ALL
export async function getNotes({ search = '', sort = '', page = 1, limit = 10 } = {}) {
  const params = new URLSearchParams();

  if (search) params.append('title', search);
  if (sort) params.append('sortBy', sort);
  params.append('page', page);
  params.append('limit', limit);

  const res = await fetch(`${BASE_URL}/notes?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch notes');
  return await res.json();
}

// POST note
export async function createNote(data) {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, createdAt: new Date().toISOString() })
  });
  if (!res.ok) throw new Error('Failed to create note');
  return await res.json();
}

// Update notes
export async function updateNote(id, data) {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update note');
  return await res.json();
}

// Delete notes
export async function deleteNote(id) {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete note');
  return true;
}