import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import {GoogleOAuthProvider} from '@react-oauth/google';
import { HashRouter as Router } from 'react-router';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { FoodProvider } from './contexts/FoodContext.jsx';

const clientId = '703456349605-e44j1qhdbscl8u8j56tq52kkimq4ch5i.apps.googleusercontent.com';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId} >
      <Provider store={store}>
        <FoodProvider>
          <Router>
            <App />
          </Router>
        </FoodProvider>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
