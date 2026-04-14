// Import Libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
// Import Components
import {App} from './components/app/app';
import {OFFERS} from './mocks/offers-mocks';

// Create Root
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render App
root.render(
  <React.StrictMode>
    <App offers={OFFERS} />
  </React.StrictMode>
);
