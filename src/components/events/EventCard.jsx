// src/components/events/EventCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';

const EventCard = ({ event, featured = false }) => {
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

    const getStatusColor = (status) => {
        switch (status) {
            case 'upcoming': return 'bg-green-100 text-green-800';
            case 'ongoing': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (featured) {
        return (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
              {event.status?.charAt(0).toUpperCase() + event.status?.slice(1)}
            </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
                    <p className="text-primary-100 text-lg mb-4">{event.theme}</p>
                </div>

                <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-3">
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
                        </div>

                        <div className="bg-primary-50 rounded-lg p-4">
                            <h4 className="font-semibold text-primary-900 mb-2">Bible Text</h4>
                            <p className="text-primary-700">{event.bible_text}</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Objective</h4>
                        <p className="text-gray-700">{event.objective}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            to={`/events/${event.id}`}
                            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center"
                        >
                            View Details
                        </Link>
                        <Link
                            to={`/register/${event.id}`}
                            className="border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-colors text-center"
                        >
                            Register Now
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
            <div className="flex flex-wrap gap-2 mb-3">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
          {event.status?.charAt(0).toUpperCase() + event.status?.slice(1)}
        </span>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
            <p className="text-primary-600 font-medium mb-3">{event.theme}</p>

            <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(event.event_date)}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {formatTime(event.start_time)} - {formatTime(event.end_time)}
                </div>
                {event.venue && (
                    <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.venue}
                    </div>
                )}
            </div>

            <div className="mb-4">
                <p className="text-sm text-gray-700 line-clamp-2">{event.objective}</p>
            </div>

            <div className="flex justify-between items-center">
                <Link
                    to={`/events/${event.id}`}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                    Learn more →
                </Link>
                <Link
                    to={`/register/${event.id}`}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default EventCard;