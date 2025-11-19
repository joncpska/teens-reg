// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, BookOpen, ArrowRight } from 'lucide-react';
import { eventsService } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import EventCard from '../components/events/EventCard';

const Home = () => {
    const [featuredEvent, setFeaturedEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const { profile } = useAuth();

    useEffect(() => {
        const fetchFeaturedEvent = async () => {
            try {
                const { data } = await eventsService.getEvents({ status: 'upcoming' });
                if (data && data.length > 0) {
                    setFeaturedEvent(data[0]);
                }
            } catch (error) {
                console.error('Error fetching featured event:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedEvent();
    }, []);

    const stats = [
        { icon: Users, label: 'Active Members', value: '500+' },
        { icon: Calendar, label: 'Events Yearly', value: '24+' },
        { icon: BookOpen, label: 'Bible Studies', value: '52+' },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Foursquare Sabo District
                            <span className="block text-primary-200">Teenagers Program</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-primary-100">
                            Empowering the next generation through faith, fellowship, and divine purpose
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {profile ? (
                                <Link
                                    to="/events"
                                    className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors inline-flex items-center justify-center"
                                >
                                    View Events <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            ) : (
                                <Link
                                    to="/signup"
                                    className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors"
                                >
                                    Join Us Today
                                </Link>
                            )}
                            <Link
                                to="/about"
                                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <stat.icon className="h-8 w-8 text-primary-600" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Event Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Event</h2>
                        <p className="text-xl text-gray-600">Don't miss our upcoming gathering</p>
                    </div>

                    {loading ? (
                        <div className="max-w-2xl mx-auto">
                            <div className="animate-pulse bg-gray-200 rounded-lg h-96"></div>
                        </div>
                    ) : featuredEvent ? (
                        <div className="max-w-2xl mx-auto">
                            <EventCard event={featuredEvent} featured />
                            <div className="text-center mt-8">
                                <Link
                                    to="/events"
                                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                                >
                                    View All Events
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500">
                            <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                            <p className="text-xl">No upcoming events scheduled</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Grow With Us?</h2>
                    <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                        Join our vibrant community of teenagers committed to deepening their faith and making a difference.
                    </p>
                    {!profile && (
                        <Link
                            to="/signup"
                            className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors inline-block"
                        >
                            Get Started Today
                        </Link>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;