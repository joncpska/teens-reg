// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // For development, set a mock user after loading
        const timer = setTimeout(() => {
            setLoading(false);
            // Set a mock user for development
            setUser({ id: 'mock-user-id', email: 'user@example.com' });
            setProfile({
                id: 'mock-user-id',
                email: 'user@example.com',
                full_name: 'Test User',
                role: 'user'
            });
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const signUp = async (email, password, fullName) => {
        console.log('Sign up:', email, fullName);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Set mock user
        setUser({ id: 'new-user-id', email });
        setProfile({
            id: 'new-user-id',
            email,
            full_name: fullName,
            role: 'user'
        });

        return { error: null };
    };

    const signIn = async (email, password) => {
        console.log('Sign in:', email);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Set mock user
        setUser({ id: 'user-id', email });
        setProfile({
            id: 'user-id',
            email,
            full_name: 'Test User',
            role: 'user'
        });

        return { error: null };
    };

    const signOut = async () => {
        console.log('Sign out');
        setUser(null);
        setProfile(null);
        return { error: null };
    };

    const value = {
        user,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
        isAdmin: profile?.role === 'admin',
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};