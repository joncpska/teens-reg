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
        // Get initial session
        const getSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setUser(session?.user ?? null);
                if (session?.user) {
                    await fetchProfile(session.user.id);
                }
            } catch (error) {
                console.error('Error getting session:', error);
            } finally {
                setLoading(false);
            }
        };

        getSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null);
                if (session?.user) {
                    await fetchProfile(session.user.id);
                } else {
                    setProfile(null);
                    setLoading(false);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (userId) => {
        try {
            // Try to get the profile from our profiles table
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('Error fetching profile:', error);
                // If profile doesn't exist, create a basic one
                if (error.code === 'PGRST116') {
                    const userEmail = user?.email || 'user@example.com';
                    const newProfile = {
                        id: userId,
                        email: userEmail,
                        full_name: userEmail.split('@')[0],
                        role: 'user',
                    };
                    setProfile(newProfile);

                    // Try to create the profile in the database
                    try {
                        await supabase
                            .from('profiles')
                            .insert([newProfile]);
                    } catch (insertError) {
                        console.error('Error creating profile:', insertError);
                    }
                    return;
                }
            } else {
                setProfile(data);
            }
        } catch (error) {
            console.error('Error in fetchProfile:', error);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (email, password, fullName) => {
        try {
            // Create auth user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (authError) throw authError;

            if (authData.user) {
                // Create profile in our database
                const profileData = {
                    id: authData.user.id,
                    email,
                    full_name: fullName,
                    role: 'user',
                };

                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([profileData])
                    .select()
                    .single();

                if (profileError) {
                    console.error('Profile creation error:', profileError);
                    // Even if profile creation fails, we still have an auth user
                }

                setUser(authData.user);
                setProfile(profileData);

                return { error: null, user: authData.user };
            }

            return { error: null };
        } catch (error) {
            console.error('Sign up error:', error);
            return { error };
        }
    };

    const signIn = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.user) {
                setUser(data.user);
                await fetchProfile(data.user.id);
            }

            return { error: null, user: data.user };
        } catch (error) {
            console.error('Sign in error:', error);
            return { error };
        }
    };

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            setUser(null);
            setProfile(null);
            return { error: null };
        } catch (error) {
            console.error('Sign out error:', error);
            return { error };
        }
    };

    const resetPassword = async (email) => {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });
            return { error };
        } catch (error) {
            return { error };
        }
    };

    const updateProfile = async (updates) => {
        try {
            const { error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', user.id);

            if (error) throw error;

            setProfile(prev => ({ ...prev, ...updates }));
            return { error: null };
        } catch (error) {
            console.error('Update profile error:', error);
            return { error };
        }
    };

    const value = {
        user,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updateProfile,
        isAdmin: profile?.role === 'admin',
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};