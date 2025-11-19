// src/components/events/EventFilter.jsx
import React from 'react';

const EventFilter = ({ filters, activeFilter, onFilterChange }) => {
    return (
        <div className="flex flex-wrap gap-2 justify-center mb-8">
            {filters.map(filter => (
                <button
                    key={filter.key}
                    onClick={() => onFilterChange(filter.key)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                        activeFilter === filter.key
                            ? 'bg-primary-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
};

export default EventFilter;