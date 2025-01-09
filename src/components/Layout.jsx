import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import "./Header.css";

export default function Layout() {
    return (
        <div className="site-wrapper">
            <Header />
            
                <Outlet />
          
            <Footer />
        </div>
    )
}