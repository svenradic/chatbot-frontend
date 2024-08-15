  import React, { version } from 'react';
  import ReactDOM from 'react-dom/client';
  import App from './App.jsx';
  import 'bootstrap-icons/font/bootstrap-icons.css';

  const root = document.createElement('div');
  root.id = 'root';
  document.body.append(root);
  
  document.addEventListener('DOMContentLoaded', () => {
 
  const shadowRoot = root.attachShadow({ mode: 'open' });
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '../public/css/App.css';

 
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



// link.href = 'https://sven-chatbot.netlify.app/css/app.css'