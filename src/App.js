import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import HomePage from './HomePage';
import TextServicePage from "./TextServicePage";
import MusicStatsPage from "./MusicStatsPage";
import CallbackPage from "./CallBackPage";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="bg-gray-800 text-white p-4">
          <nav className="container mx-auto flex justify-between">
            <div className="flex items-center">
              <Link to="/" className="text-lg font-semibold mr-6">
                Home
              </Link>
              <Link to="/TextServicePage" className="text-lg mr-6">
                Text Formatting
              </Link>
              <Link to="/music-stats" className="text-lg">
                Music Stats
              </Link>
            </div>
          </nav>
        </header>

        <main> 
          <div className="flex h-screen w-screen">
            {/* Margin divs */}
            <div className="bg-gray-200 w-2/12"></div>

            {/* Content div */}
            <div className="content bg-white w-8/12 shadow-xl items-center justify-center p-4">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/TextServicePage" element={<TextServicePage />} />
                <Route path="/music-stats" element={<MusicStatsPage />} />
                <Route path="/callback" element={<CallbackPage />} />
              </Routes>
            </div>

            {/* Margin divs */}
            <div className="bg-gray-200 w-2/12"></div>
          </div>
        </main>

      </div>
    </Router>
  );
}

export default App;
