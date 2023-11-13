import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import './App.css';

// Import the components from the component files
import HomePage from './HomePage';
import TextServicePage from "./TextServicePage";

// Main App component with routing set up
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          

          {/* The 'Routes' component with your route configuration */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/TextServicePage" element={<TextServicePage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
