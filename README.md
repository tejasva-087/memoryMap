# MemoryMap 🌍

**MemoryMap** is a sleek, interactive web application that allows users to pin and preserve their travel memories on a world map. Built with a focus on advanced React state management and local data persistence, it offers a seamless way to log trips, dates, durations, and photos.

---

## 🚀 Features

- **Interactive Map Interface:** Click anywhere on the map to drop a pin and start a new memory.
- **Detailed Memory Logging:** Store the country, state, visit date, trip duration, and a personal description.
- **Photo Gallery:** Upload and view images associated with each specific location.
- **Offline Persistence:** Uses **IndexedDB** for local storage, ensuring your data remains available even after a browser refresh without a backend.
- **Responsive Sidebar:** A clean, dark-themed UI for browsing and managing your saved trips.

---

## 🛠️ Tech Stack

- **Framework:** [React](https://react.dev/) (Vite)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** `useContext` + `useReducer`
- **Map Engine:** [Leaflet](https://leafletjs.com/) / [React-Leaflet](https://react-leaflet.js.org/)
- **Storage:** [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

---

## 🧠 Technical Highlights

### Advanced State Management

To avoid "prop drilling" and maintain a clean architecture, I implemented a custom state management system using the **useContext** and **useReducer** hooks. This allows for a predictable state container that handles complex actions like adding, deleting, and viewing memories across deeply nested components.

### Local Data Persistence

Since the app currently operates without a traditional backend, I utilized **IndexedDB**. This provides a significant upgrade over `localStorage` by allowing for larger data sets (like images) and asynchronous operations, providing a "database-like" experience directly in the browser.

---

## 🗺️ Roadmap

- [ ] **Backend Integration:** Migration to Node.js/Express with MongoDB for cloud syncing.
- [ ] **Authentication:** User accounts to access maps across multiple devices.
- [ ] **Search:** Search for specific memories by country or date.
- [ ] **Social Sharing:** Generate shareable links for specific trip summaries.

---

## 🏁 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/memorymap.git](https://github.com/your-username/memorymap.git)
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
4.  **Open in browser:**
    Navigate to `http://localhost:5173`

---

### License

Distributed under the MIT License. See `LICENSE` for more information.
