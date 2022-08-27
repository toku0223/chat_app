import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './App';
import Chat from './pages/chat.tsx';

const RouterLink = () => {


    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/chat" element={<Chat />} />
                </Routes>
            </Router>
        </>
    )

}

export default RouterLink;