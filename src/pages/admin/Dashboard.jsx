// src/pages/admin/Dashboard.jsx
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Calendar,
    BarChart3,
    Settings
} from 'lucide-react';
import DashboardHome from './DashboardHome';
import EventManagement from './EventManagement';
import RegistrationManagement from './RegistrationManagement';

const Dashboard = () => {
    const location = useLocation();

    const navigation = [
        { name: 'Overview', href: '/admin', icon: LayoutDashboard },
        { name: 'Events', href: '/admin/events', icon: Calendar },
        { name: 'Registrations', href: '/admin/registrations', icon: Users },
        { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-white shadow-lg min-h-screen">
                    <div className="p-6 border-b">
                        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                        <p className="text-sm text-gray-600">Foursquare Sabo Teens</p>
                    </div>

                    <nav className="mt-6">
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <item.icon className="h-5 w-5 mr-3" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Main content */}
                <div className="flex-1 p-8">
                    <Routes>
                        <Route path="/" element={<DashboardHome />} />
                        <Route path="/events" element={<EventManagement />} />
                        <Route path="/registrations" element={<RegistrationManagement />} />
                        <Route path="/reports" element={<div>Reports Coming Soon</div>} />
                        <Route path="/settings" element={<div>Settings Coming Soon</div>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;