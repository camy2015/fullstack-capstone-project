import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import MainPage from './components/MainPage/MainPage';
import Navbar from './components/Navbar/Navbar';
import RegisterPage from './components/RegisterPage/RegisterPage';

function App() {

    return (
        <>
            <Navbar />
            <Routes>
                {/* the final code will not pass the products to every page, but each page will call the server API */}
                <Route path="/" element={<MainPage />} />
                <Route path="/app" element={<MainPage />} />
                <Route path="/app/login" element={<LoginPage />} />
                <Route path="/app/register" element={<RegisterPage />} />
            </Routes>
        </>
    );
}

export default App;
