/**
 * src/index.js
 *
 * This is the main entry point for the React application.
 * It renders the root <App /> component into the DOM element with ID 'app'
 * found in `public/index.html`. It also sets up React.StrictMode.
 */
import React from 'react';
import ReactDOM from 'react-dom/client'; // Using react-dom/client for React 18+
import App from './App';

const rootElement = document.getElementById('app');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element with ID 'app'");
}
