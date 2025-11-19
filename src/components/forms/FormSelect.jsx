// src/components/forms/FormSelect.jsx
import React from 'react';

const FormSelect = React.forwardRef(({
                                         label,
                                         error,
                                         options = [],
                                         className = '',
                                         ...props
                                     }, ref) => {
    return (
        <div className={className}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <select
                ref={ref}
                {...props}
                className={`block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                }`}
            >
                <option value="">Select an option</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error.message}</p>
            )}
        </div>
    );
});

FormSelect.displayName = 'FormSelect';

export default FormSelect;