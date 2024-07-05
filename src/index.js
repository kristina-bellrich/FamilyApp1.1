import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import {store} from './components/store/store.js';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Auth0Provider
  domain="dev-plk3pomvxgasnqy8.us.auth0.com"
  clientId="befJphItnG02K5X9ZAXGKKh03tcPE0Fz"
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
>
 <Provider store={store}>
    <App />
  </Provider>
  </Auth0Provider>

);
