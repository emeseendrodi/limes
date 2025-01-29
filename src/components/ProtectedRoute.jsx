import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';


export default function ProtectedRoute(){
    const { userEmail } = useContext(AuthContext);
    return userEmail ? <Outlet /> : <Navigate to="/" />;
}
