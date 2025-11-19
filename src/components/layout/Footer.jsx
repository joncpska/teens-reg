// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Users } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center mb-4">
                            <Users className="h-8 w-8 text-primary-400" />
                            <span className="ml-2 text-xl font-bold">Foursquare Sabo Teens</span>
                        </div>
                        <p className="text-gray-300 mb-4 max-w-md">
                            Empowering the next generation through faith, fellowship, and divine purpose.
                            Join our vibrant community of teenagers committed to deepening their faith and making a difference.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
                            <li><Link to="/events" className="text-gray-300 hover:text-white transition-colors">Events</Link></li>
                            <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <MapPin className="h-5 w-5 text-primary-400 mr-3" />
                                <span className="text-gray-300">Foursquare Gospel Church, Sabo District, Lagos</span>
                            </div>
                            <div className="flex items-center">
                                <Phone className="h-5 w-5 text-primary-400 mr-3" />
                                <span className="text-gray-300">+234 801 234 5678</span>
                            </div>
                            <div className="flex items-center">
                                <Mail className="h-5 w-5 text-primary-400 mr-3" />
                                <span className="text-gray-300">teens@sabodistrict.foursquare</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                    <p className="text-gray-300">
                        &copy; {new Date().getFullYear()} Foursquare Gospel Church Sabo District Teenagers. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;