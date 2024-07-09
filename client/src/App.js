import React from 'react';
import './App.css';
import Header from './components/header';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Main from './components/Main';
import EventsSection from './components/EventsSection';
import CreateItem from "./components/CreateItem";

const App = () => {
    return (
        <GoogleOAuthProvider clientId="616649422310-vbf57v2j34ql4qhkigom1itg1fv8i3uk.apps.googleusercontent.com">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={
                        <>
                            <EventsSection />
                            <Main />
                        </>
                    } />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/create-case" element={<CreateItem />} />
                </Routes>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
};

export default App;
