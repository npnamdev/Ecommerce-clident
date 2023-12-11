import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
    return (
        <div className="layout-app">
            <Header />
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
