import React from 'react';
import {
    Link
  } from "react-router-dom";
const HomePage = () => {
        return (<nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/TextServicePage">Text Formatting</Link>
              </li>
            </ul>
          </nav>)
};

export default HomePage;
