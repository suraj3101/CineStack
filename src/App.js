import "./App.css";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import WatchlistPage from "./pages/WatchlistPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
