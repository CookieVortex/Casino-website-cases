import React from 'react';
import './App.css';
import Header from './components/header';
import { GoogleOAuthProvider } from '@react-oauth/google';
import EventsSection from './components/EventsSection';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";

const App = () => {
    return (
        <GoogleOAuthProvider clientId="616649422310-vbf57v2j34ql4qhkigom1itg1fv8i3uk.apps.googleusercontent.com">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/" element={<EventsSection />} />
                </Routes>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
};

export default App;
