// src/components/layout/Layout.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header with Navigation */}
            <header className="bg-blue-600 text-white shadow-lg">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold">Foursquare Sabo Teens</span>
                        </Link>

                        {/* Navigation */}
                        <nav className="flex space-x-4">
                            <Link
                                to="/"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    isActive('/') ? 'bg-blue-700' : 'hover:bg-blue-500'
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/about"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    isActive('/about') ? 'bg-blue-700' : 'hover:bg-blue-500'
                                }`}
                            >
                                About
                            </Link>
                            <Link
                                to="/events"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    isActive('/events') ? 'bg-blue-700' : 'hover:bg-blue-500'
                                }`}
                            >
                                Events
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-lg font-semibold mb-2">Foursquare Sabo District Teenagers</p>
                    <p className="text-gray-400">Empowering the next generation through faith and fellowship</p>
                    <p className="text-gray-500 mt-4">&copy; 2024 All rights reserved</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;