// src/pages/admin/DashboardHome.jsx
import React, { useEffect, useState } from 'react';
import { Users, Calendar, TrendingUp, Clock } from 'lucide-react';
import { eventsService, registrationsService } from '../../services/supabase';

const DashboardHome = () => {
    const [stats, setStats] = useState({
        totalRegistrations: 0,
        upcomingEvents: 0,
        recentRegistrations: [],
        registrationsByEvent: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [eventsRes, registrationsRes] = await Promise.all([
                eventsService.getEvents(),
                registrationsService.getAllRegistrations()
            ]);

            const events = eventsRes.data || [];
            const registrations = registrationsRes.data || [];

            // Calculate stats
            const upcomingEvents = events.filter(event =>
                event.status === 'upcoming' || event.status === 'ongoing'
            ).length;

            const recentRegistrations = registrations
                .slice(0, 5)
                .map(reg => ({
                    id: reg.id,
                    name: reg.full_name,
                    event: reg.events?.title,
                    date: new Date(reg.registration_date).toLocaleDateString()
                }));

            // Group registrations by event
            const registrationsByEvent = events.map(event => ({
                event: event.title,
                count: registrations.filter(reg => reg.event_id === event.id).length
            })).filter(item => item.count > 0);

            setStats({
                totalRegistrations: registrations.length,
                upcomingEvents,
                recentRegistrations,
                registrationsByEvent
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="animate-pulse space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-200 h-64 rounded-lg"></div>
                    <div className="bg-gray-200 h-64 rounded-lg"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-600">Welcome to the Foursquare Sabo Teens admin dashboard</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="bg-primary-100 p-3 rounded-lg">
                            <Users className="h-6 w-6 text-primary-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Registrations</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {stats.totalRegistrations}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="bg-green-100 p-3 rounded-lg">
                            <Calendar className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {stats.upcomingEvents}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Active Events</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {stats.registrationsByEvent.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Registrations */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Recent Registrations</h3>
                    </div>
                    <div className="p-6">
                        {stats.recentRegistrations.length > 0 ? (
                            <div className="space-y-4">
                                {stats.recentRegistrations.map(registration => (
                                    <div key={registration.id} className="flex items-center justify-between py-2">
                                        <div>
                                            <p className="font-medium text-gray-900">{registration.name}</p>
                                            <p className="text-sm text-gray-500">{registration.event}</p>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock className="h-4 w-4 mr-1" />
                                            {registration.date}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-4">No recent registrations</p>
                        )}
                    </div>
                </div>

                {/* Registrations by Event */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Registrations by Event</h3>
                    </div>
                    <div className="p-6">
                        {stats.registrationsByEvent.length > 0 ? (
                            <div className="space-y-4">
                                {stats.registrationsByEvent.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 truncate flex-1 mr-4">
                      {item.event}
                    </span>
                                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {item.count} {item.count === 1 ? 'registration' : 'registrations'}
                    </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-4">No registration data available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;