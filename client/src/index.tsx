import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AppRouter } from './router/AppRouter';
import { store } from './store/store';
import './styles/main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <AppRouter/>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);