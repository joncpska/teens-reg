// src/contexts/ToastContext.jsx
import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = 'info', duration = 5000) => {
        const id = Date.now().toString();
        const toast = { id, message, type, duration };
        setToasts(prev => [...prev, toast]);

        setTimeout(() => {
            removeToast(id);
        }, duration);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast, removeToast }}>
            {children}
            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-50 space-y-2">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`px-6 py-4 rounded-lg shadow-lg max-w-sm ${
                            toast.type === 'success' ? 'bg-green-500 text-white' :
                                toast.type === 'error' ? 'bg-red-500 text-white' :
                                    toast.type === 'warning' ? 'bg-yellow-500 text-white' :
                                        'bg-blue-500 text-white'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-medium">{toast.message}</span>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="ml-4 hover:opacity-70 transition-opacity"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};