# CineStack 🍿

**[➡️ Click here for the Live Demo!](https://your-vercel-or-netlify-link-will-go-here.com)**

CineStack is a data-driven, responsive movie dashboard and watchlist application built with React. It uses the TMDb API for real-time data and features a persistent watchlist saved to `localStorage`.

This project was built to master modern, professional frontend concepts including advanced React hooks, data fetching with React Query, and performance optimization.

![CineStack Screenshot](https://image-of-your-app-screenshot-will-go-here.png)
_(Tip: Once your app is live, take a screenshot, add it to your project folder in a new `public/images` folder, push it, and update this link!)_

---

## 🚀 Core Features

- **Real-Time Data:** Fetches real-time movie data (Now Playing, Top Rated, Trending) from the **TMDb API**.
- **Dynamic Data Fetching:** Uses **React Query (`useQuery`)** for all server state, including automatic caching, request de-duplication (e.g., for the global genre list), and built-in loading/error states.
- **Persistent Global State:** A global **Watchlist** system built with **React Context (`useContext` + `useState`)** and **`localStorage`** to ensure the user's saved movies persist across page refreshes.
- **Component-Based Routing:** Uses **React Router (`react-router-dom`)** for seamless client-side navigation between the Dashboard, Movie Detail, and Watchlist pages.
- **Advanced Data Transformation:** Uses the **`useMemo`** hook to perform expensive, client-side calculations (mapping genre IDs to names) only when necessary, preventing wasted re-renders.
- **"Prefetch-on-Hover" Trailer Modal:** A high-performance "wow" feature. The "Play Trailer" button _pre-fetches_ video data on mouse hover (`queryClient.prefetchQuery`) and opens a modal with an embedded player that appears to load instantly.
- **Performant Lazy Loading:** Uses the **`IntersectionObserver` API** in a custom `<LazyImage />` component to lazy-load movie posters, preventing 60+ image requests on initial page load and dramatically improving performance.
- **Shimmering Skeleton Loaders:** Implements a professional loading experience with CSS-based "shimmer" skeletons to prevent Cumulative Layout Shift (CLS) while data is being fetched.
- **Client-Side Filtering:** The Watchlist page uses `useMemo` to _instantly_ filter the user's saved movies by genre on the client side.

---

## 🛠 Tech Stack

- **Core:** React.js, React Router, React Query
- **Hooks:** `useState`, `useEffect`, `useContext`, `useMemo`, `useRef`, `useParams`
- **API & Data:** Axios, TMDb API (REST)
- **Styling:** Plain CSS3 (with Flexbox & Grid)
- **Bundler:** Create React App (react-scripts)
- **Browser APIs:** `localStorage`, `IntersectionObserver`
