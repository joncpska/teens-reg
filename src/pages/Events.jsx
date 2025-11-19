// src/pages/Events.jsx
import React, { useEffect, useState } from 'react';
import { eventsService } from '../services/supabase';
import EventCard from '../components/events/EventCard';
import EventFilter from '../components/events/EventFilter';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const { data, error } = await eventsService.getEvents();
                if (error) throw error;
                setEvents(data || []);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            if (activeFilter === 'all') {
                setFilteredEvents(events);
            } else {
                setFilteredEvents(events.filter(event => event.status === activeFilter));
            }
        };

        applyFilters();
    }, [events, activeFilter]);

    const filters = [
        { key: 'all', label: 'All Events' },
        { key: 'upcoming', label: 'Upcoming' },
        { key: 'ongoing', label: 'Current' },
        { key: 'completed', label: 'Previous' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="animate-pulse space-y-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-gray-200 rounded-lg h-48"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Events</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Join us for inspiring gatherings, fellowship, and spiritual growth
                    </p>
                </div>

                <EventFilter
                    filters={filters}
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                />

                <div className="grid gap-8">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">📅</div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                No events found
                            </h3>
                            <p className="text-gray-500">
                                {activeFilter === 'all'
                                    ? 'There are no events scheduled at the moment.'
                                    : `There are no ${activeFilter} events at the moment.`}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Events;