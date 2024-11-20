import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import SignUp from './Pages/SignUp/SignUp';
import Home from './Pages/Home/Home';
import { AuthProvider } from './contexts/AuthContext';
import Login from './Pages/Login/Login';
import AddItem from './Pages/Add_Item/AddItem';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <AuthProvider>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/add-product' element={<AddItem/>} />
        </Routes>
        </AuthProvider>
    </Router>
);
