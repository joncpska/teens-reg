// src/pages/admin/EventManagement.jsx
import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { eventsService } from '../../services/supabase';
import { useToast } from '../../contexts/ToastContext';
import EventForm from '../../components/admin/EventForm';
import Modal from '../../components/ui/Modal';

const EventManagement = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const { showToast } = useToast();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data, error } = await eventsService.getEvents();
                if (error) throw error;
                setEvents(data || []);
            } catch (error) {
                console.error('Error fetching events:', error);
                showToast('Failed to load events', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [showToast]);

    const handleCreate = () => {
        setEditingEvent(null);
        setShowModal(true);
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
        setShowModal(true);
    };

    const handleDelete = async (event) => {
        if (window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
            try {
                const { error } = await eventsService.deleteEvent(event.id);
                if (error) throw error;

                showToast('Event deleted successfully', 'success');
                const { data } = await eventsService.getEvents();
                setEvents(data || []);
            } catch (error) {
                console.error('Error deleting event:', error);
                showToast('Failed to delete event', 'error');
            }
        }
    };

    const handleSuccess = () => {
        setShowModal(false);
        setEditingEvent(null);
        const fetchEvents = async () => {
            const { data } = await eventsService.getEvents();
            setEvents(data || []);
        };
        fetchEvents();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'upcoming': return 'bg-green-100 text-green-800';
            case 'ongoing': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

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
                    <h1 className="text-2xl font-bold text-gray-900">Event Management</h1>
                    <p className="text-gray-600">Create and manage events for the teenagers program</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-primary-700 transition-colors"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    New Event
                </button>
            </div>

            {/* Events List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {events.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                        {events.map(event => (
                            <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {event.title}
                                            </h3>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600 mb-1">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {new Date(event.event_date).toLocaleDateString()} •
                                            {event.start_time} - {event.end_time}
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">
                                            <strong>Theme:</strong> {event.theme}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <strong>Bible Text:</strong> {event.bible_text}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleEdit(event)}
                                            className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event)}
                                            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No events created</h3>
                        <p className="text-gray-500 mb-4">Get started by creating your first event.</p>
                        <button
                            onClick={handleCreate}
                            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            Create Event
                        </button>
                    </div>
                )}
            </div>

            {/* Event Form Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={editingEvent ? 'Edit Event' : 'Create New Event'}
            >
                <EventForm
                    event={editingEvent}
                    onSuccess={handleSuccess}
                    onCancel={() => setShowModal(false)}
                />
            </Modal>
        </div>
    );
};

export default EventManagement;