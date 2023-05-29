import ReactDOM from 'react-dom/client';
import './app/layout/index.css'
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/router';
import React from 'react';
import { StoreProvider } from './app/context/StoreContext';
import { Provider } from 'react-redux';
import { store } from './app/store/configurationStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//truyen store vao Provider

root.render(
  <React.StrictMode>
      <Provider store={store} >
        <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
