import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // CSS only needed here
import './index.css';
import App from './App';
// import { BrowserRouter } from 'react-router-dom';
// Note: You don't actually need to import bootstrap.bundle.min.js
// React-Bootstrap handles the JavaScript functionality for Bootstrap components
// Importing it is not harmful, but it's unnecessary with React-Bootstrap

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);