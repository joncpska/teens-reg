// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/admin/Dashboard';
import FAQ from './pages/FAQ';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

function App() {
    return (
        <Router>
            <ToastProvider>
                <AuthProvider>
                    <Layout>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/events" element={<Events />} />
                            <Route path="/events/:id" element={<EventDetail />} />
                            <Route path="/faq" element={<FAQ />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />

                            {/* Protected Routes */}
                            <Route
                                path="/register/:eventId?"
                                element={
                                    <ProtectedRoute>
                                        <Registration />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Admin Routes */}
                            <Route
                                path="/admin/*"
                                element={
                                    <AdminRoute>
                                        <Dashboard />
                                    </AdminRoute>
                                }
                            />
                        </Routes>
                    </Layout>
                </AuthProvider>
            </ToastProvider>
        </Router>
    );
}

export default App;