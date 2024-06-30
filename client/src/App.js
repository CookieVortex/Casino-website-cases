import React from 'react';
import './App.css';
import Header from './components/header';
import { GoogleOAuthProvider } from '@react-oauth/google';
import EventsSection from './components/EventsSection';

const App = () => {
    return (
        <GoogleOAuthProvider clientId="616649422310-vbf57v2j34ql4qhkigom1itg1fv8i3uk.apps.googleusercontent.com">
            <Header />
            <EventsSection />
        </GoogleOAuthProvider>
    );
};

export default App;
