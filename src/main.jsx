  import React, { version } from 'react';
  import ReactDOM from 'react-dom/client';
  import App from './App.jsx';

  const root = document.createElement('div');
  root.id = 'root';
  document.body.append(root);
  
document.addEventListener('DOMContentLoaded', () => {
 
  const shadowRoot = root.attachShadow({ mode: 'open' });
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '../css/App.css';
 
  shadowRoot.appendChild(link);
  const reactApp = document.createElement('div');
  reactApp.id = 'react-app';
  shadowRoot.appendChild(reactApp);
  
  ReactDOM.createRoot(reactApp).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});


/* https://sven-chatbot.netlify.app/assets/appcss-dn2izyto.css */

