// src/pages/EventDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowLeft, BookOpen, Users } from 'lucide-react';
import { eventsService } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { profile } = useAuth();
    const { showToast } = useToast();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedEvents, setRelatedEvents] = useState([]);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const { data, error } = await eventsService.getEventById(id);
                if (error) throw error;
                setEvent(data);

                // Fetch related events
                const { data: related } = await eventsService.getEvents({
                    status: data.status
                });
                setRelatedEvents(related?.filter(e => e.id !== id).slice(0, 3) || []);
            } catch (error) {
                console.error('Error fetching event:', error);
                showToast('Event not found', 'error');
                navigate('/events');
            } finally {
                setLoading(false);
            }
        };

        fetchEventData();
    }, [id, showToast, navigate]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-96 bg-gray-200 rounded"></div>
                        <div className="h-32 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
                    <Link to="/events" className="text-primary-600 hover:text-primary-700">
                        Back to Events
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/events')}
                    className="flex items-center text-primary-600 hover:text-primary-700 mb-6"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Events
                </button>

                {/* Event Header */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-8">
                        <div className="flex flex-wrap gap-4 text-sm mb-4">
              <span className={`px-3 py-1 rounded-full ${
                  event.status === 'upcoming' ? 'bg-green-500' :
                      event.status === 'ongoing' ? 'bg-yellow-500' : 'bg-gray-500'
              }`}>
                {event.status?.charAt(0).toUpperCase() + event.status?.slice(1)}
              </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
                        <p className="text-primary-100 text-lg">{event.theme}</p>
                    </div>

                    {/* Event Details */}
                    <div className="p-8">
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div className="space-y-4">
                                <div className="flex items-center text-gray-700">
                                    <Calendar className="h-5 w-5 mr-3 text-primary-600" />
                                    <span>{formatDate(event.event_date)}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <Clock className="h-5 w-5 mr-3 text-primary-600" />
                                    <span>{formatTime(event.start_time)} - {formatTime(event.end_time)}</span>
                                </div>
                                {event.venue && (
                                    <div className="flex items-center text-gray-700">
                                        <MapPin className="h-5 w-5 mr-3 text-primary-600" />
                                        <span>{event.venue}</span>
                                    </div>
                                )}
                                {event.max_participants && (
                                    <div className="flex items-center text-gray-700">
                                        <Users className="h-5 w-5 mr-3 text-primary-600" />
                                        <span>Max Participants: {event.max_participants}</span>
                                    </div>
                                )}
                            </div>

                            <div className="bg-primary-50 rounded-lg p-6">
                                <div className="flex items-start mb-4">
                                    <BookOpen className="h-6 w-6 mr-3 text-primary-600 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Bible Text</h3>
                                        <p className="text-gray-700">{event.bible_text}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Objective */}
                        <div className="border-t pt-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Objective</h3>
                            <p className="text-gray-700 leading-relaxed">{event.objective}</p>
                        </div>

                        {/* Description */}
                        {event.description && (
                            <div className="border-t pt-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">About This Event</h3>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {event.description}
                                </p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="border-t pt-6 mt-6">
                            {profile ? (
                                <Link
                                    to={`/register/${event.id}`}
                                    className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block"
                                >
                                    Register for this Event
                                </Link>
                            ) : (
                                <div className="space-y-3">
                                    <p className="text-gray-600">You need to be logged in to register for this event.</p>
                                    <Link
                                        to="/login"
                                        className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block"
                                    >
                                        Login to Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Related Events */}
                {relatedEvents.length > 0 && (
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Events</h2>
                        <div className="grid gap-6">
                            {relatedEvents.map(relatedEvent => (
                                <div key={relatedEvent.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <Link to={`/events/${relatedEvent.id}`} className="block">
                                        <h3 className="font-semibold text-gray-900 mb-2">{relatedEvent.title}</h3>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {formatDate(relatedEvent.event_date)}
                                            <Clock className="h-4 w-4 ml-4 mr-1" />
                                            {formatTime(relatedEvent.start_time)}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventDetail;