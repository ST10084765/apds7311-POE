// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Change this line
import App from './App';
import './index.css';

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
