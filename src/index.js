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
