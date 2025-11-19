// src/components/TestComponent.jsx
import React from 'react';

const TestComponent = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">
                    Foursquare Sabo Teens - Test
                </h1>
                <p className="text-gray-600 mb-4">
                    If you can see this, React and Tailwind CSS are working!
                </p>
                <div className="space-y-2">
                    <div className="bg-blue-500 text-white p-2 rounded">Blue button</div>
                    <div className="bg-green-500 text-white p-2 rounded">Green button</div>
                    <div className="bg-red-500 text-white p-2 rounded">Red button</div>
                </div>
            </div>
        </div>
    );
};

export default TestComponent;