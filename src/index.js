import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../src/assets/css/global.scss'
import LayoutContextProvider from './context/layout.context';

ReactDOM.render(
  <React.StrictMode>
      <LayoutContextProvider>
      <App />
    </LayoutContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
