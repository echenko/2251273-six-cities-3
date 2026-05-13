// Import Libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
// Import Store
import { Provider } from 'react-redux';
import { store } from './store/store';
// Import Components
import { App } from './components/app/app';

// Create Root
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render App
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode >
);
