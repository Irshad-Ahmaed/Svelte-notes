# 📝 Svelte Notes App

A simple, responsive note-taking web app built with **Svelte** and **TailwindCSS** that interacts with a mock API to support:

- ✅ Viewing notes
- ✅ Creating, editing, deleting notes
- ✅ Searching, sorting, and paginated results
- ✅ Dark mode toggle

---

## 🚀 How to Run the App

### 1. Clone the repository

```bash
git clone https://github.com/Irshad-Ahmaed/Svelte-notes
cd Svelte-notes
```

### 2. Environment Variables
```sh
VITE_BASE_URL=https://xxxxxxxxxxxx.mockapi.io/api/v1
```
### 3. RUN THE APPLICATION
```sh
npm install
npm run dev
```

## Trade-offs and Assumptions
- Data Constraints: Searching is limited to title, based on MockAPI's built-in filtering support.

- Error Handling: Basic alert-based error messages instead of toasts or inline messages.


## If I Had More Time

✅ Unit testing using Vitest

✅ Enhanced UI with transitions, animations, skeleton loaders

✅ Authentication to support user-based note management

