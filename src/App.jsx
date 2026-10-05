import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePortfolio from "./pages/CreatePortfolio";
import Dashboard from "./pages/Dashboard";
import PublicPortfolio from "./pages/PublicPortfolio";

import "./App.css";

function AppContent() {
  const location = useLocation();

  // A public portfolio should look like the user's own website,
  // so the app navbar is hidden on those pages.
  const isPublicPortfolio = location.pathname.startsWith("/portfolio/");

  return (
    <>
      {!isPublicPortfolio && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreatePortfolio />} />
        <Route path="/portfolio/:id" element={<PublicPortfolio />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;