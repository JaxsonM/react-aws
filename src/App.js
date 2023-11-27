import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import HomePage from './HomePage';
import TextServicePage from "./TextServicePage";
import MusicStatsPage from "./MusicStatsPage";
import CallbackPage from "./CallBackPage";
import MovieRaterPage from "./MovieRaterPage";
import AuthenticationPage from "./AuthenticationPage"


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
              <Link to="/music-stats" className="text-lg mr-6">
                Music Stats
              </Link>
              <Link to="/movie-rater" className="text-lg mr-6">
                Movie Rater
              </Link>
              <Link to="/login" className="text-lg mr-6">
                Login
              </Link>
            </div>
          </nav>
        </header>

        <main> 
          <div className="flex h-screen w-screen">
            {/* Margin divs */}
            <div className="bg-gray-200 w-2/12"></div>

            {/* Content div */}
            <div className="content bg-white w-8/12 shadow-xl items-center justify-center p-4 h-full overflow-auto">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/TextServicePage" element={<TextServicePage />} />
                <Route path="/music-stats" element={<MusicStatsPage />} />
                <Route path="/callback" element={<CallbackPage />} />
                <Route path="/movie-rater" element={<MovieRaterPage />} />
                <Route path="/login" element={<AuthenticationPage />} />
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
