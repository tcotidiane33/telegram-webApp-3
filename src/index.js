// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './utils/serviceWorkerRegistration';
import reportWebVitals from './utils/reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Enregistrez le service worker ici
serviceWorkerRegistration.register();

// Si vous avez besoin de mesurer des performances dans votre application, vous pouvez utiliser reportWebVitals
reportWebVitals();
