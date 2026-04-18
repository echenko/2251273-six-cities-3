// Import Libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
// Import Components
import {App} from './components/app/app';

// Create Root
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
