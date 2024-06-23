import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {GoogleOAuthProvider} from '@react-oauth/google';

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId="16649422310-ff9qfdvarruc9n44n2qf47ji4u736s5q.apps.googleusercontent.com">
            <App/>
        </GoogleOAuthProvider>
    </React.StrictMode>
);

reportWebVitals();
