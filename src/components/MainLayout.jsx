import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';

const MainLayout = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
            {!isAdminRoute && <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />}
            <Outlet context={{ searchTerm, setSearchTerm }} />
        </div>
    );
};

export default MainLayout;
