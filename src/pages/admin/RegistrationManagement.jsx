// src/pages/admin/RegistrationManagement.jsx
import React, { useEffect, useState } from 'react';
import { Search, Download, Filter } from 'lucide-react';
import { registrationsService, eventsService } from '../../services/supabase';
import { useToast } from '../../contexts/ToastContext';

const RegistrationManagement = () => {
    const [registrations, setRegistrations] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEvent, setSelectedEvent] = useState('');
    const { showToast } = useToast();

    useEffect(() => {
        const loadData = async () => {
            try {
                const [eventsRes, registrationsRes] = await Promise.all([
                    eventsService.getEvents(),
                    registrationsService.getAllRegistrations()
                ]);

                setEvents(eventsRes.data || []);
                setRegistrations(registrationsRes.data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
                showToast('Failed to load registrations', 'error');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [showToast]);

    // ... rest of the component remains the same ...
    const handleExport = async () => {
        try {
            const { data, error } = await registrationsService.exportRegistrations(
                selectedEvent || null
            );

            if (error) throw error;

            // Convert to CSV
            const headers = [
                'Full Name', 'Residential Address', 'Phone Number', 'School/Class',
                'Industry', 'Church', 'Parent Full Name', 'Parent Phone Number',
                'Parent Church', 'Parent Occupation', 'Registration Date', 'Event Title', 'Event Date'
            ];

            const csvData = data.map(reg => [
                reg.full_name,
                reg.residential_address,
                reg.phone_number,
                reg.school_class || '',
                reg.industry || '',
                reg.church,
                reg.parent_full_name,
                reg.parent_phone_number,
                reg.parent_church,
                reg.parent_occupation,
                new Date(reg.registration_date).toLocaleDateString(),
                reg.events?.title || '',
                reg.events?.event_date ? new Date(reg.events.event_date).toLocaleDateString() : ''
            ]);

            const csvContent = [
                headers.join(','),
                ...csvData.map(row => row.map(field => `"${field}"`).join(','))
            ].join('\n');

            // Download file
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `registrations-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            showToast('Registrations exported successfully', 'success');
        } catch (error) {
            console.error('Error exporting registrations:', error);
            showToast('Failed to export registrations', 'error');
        }
    };

    const filteredRegistrations = registrations.filter(reg => {
        const matchesSearch =
            reg.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.parent_full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.church.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesEvent = !selectedEvent || reg.event_id === selectedEvent;

        return matchesSearch && matchesEvent;
    });

    if (loading) {
        return (
            <div className="animate-pulse space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-gray-200 h-20 rounded-lg"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Registration Management</h1>
                    <p className="text-gray-600">View and manage all event registrations</p>
                </div>
                <button
                    onClick={handleExport}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors"
                >
                    <Download className="h-5 w-5 mr-2" />
                    Export CSV
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search registrations..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>

                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <select
                            value={selectedEvent}
                            onChange={(e) => setSelectedEvent(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
                        >
                            <option value="">All Events</option>
                            {events.map(event => (
                                <option key={event.id} value={event.id}>
                                    {event.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="text-sm text-gray-600 flex items-center">
                        Showing {filteredRegistrations.length} of {registrations.length} registrations
                    </div>
                </div>
            </div>

            {/* Registrations Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {filteredRegistrations.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Participant
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Parent
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Event
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {filteredRegistrations.map(reg => (
                                <tr key={reg.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {reg.full_name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {reg.school_class || reg.industry}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{reg.phone_number}</div>
                                        <div className="text-sm text-gray-500">{reg.church}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{reg.parent_full_name}</div>
                                        <div className="text-sm text-gray-500">{reg.parent_phone_number}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {reg.events?.title || 'N/A'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(reg.registration_date).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">📝</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No registrations found</h3>
                        <p className="text-gray-500">
                            {searchTerm || selectedEvent
                                ? 'Try adjusting your search or filter criteria'
                                : 'No registrations have been submitted yet'
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegistrationManagement;