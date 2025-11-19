// src/pages/About.jsx
import React from 'react';
import { Users, Target, Heart, Mail, Phone, MapPin } from 'lucide-react';

const About = () => {
    const values = [
        {
            icon: Heart,
            title: 'Love & Compassion',
            description: 'We show Christ\'s love through caring for one another and our community.'
        },
        {
            icon: Users,
            title: 'Fellowship',
            description: 'Building strong relationships that encourage spiritual growth and accountability.'
        },
        {
            icon: Target,
            title: 'Purpose',
            description: 'Helping teenagers discover and fulfill their God-given purpose.'
        }
    ];

    const team = [
        {
            name: 'Pastor John Adeyemi',
            role: 'District Youth Coordinator',
            description: 'Leading the teenagers ministry with passion and dedication for over 5 years.'
        },
        {
            name: 'Sister Grace Oluwaseun',
            role: 'Program Director',
            description: 'Organizing events and activities that engage and inspire our youth.'
        },
        {
            name: 'Brother David Chukwu',
            role: 'Discipleship Leader',
            description: 'Mentoring young believers in their spiritual journey and growth.'
        }
    ];

    const testimonials = [
        {
            name: 'Sarah Johnson',
            age: 16,
            testimony: 'This program helped me build a strong relationship with God and make amazing Christian friends.'
        },
        {
            name: 'Michael Adekunle',
            age: 17,
            testimony: 'Through the teenagers program, I discovered my purpose and developed leadership skills.'
        },
        {
            name: 'Blessing Okoro',
            age: 15,
            testimony: 'The events and Bible studies have transformed my life and given me hope for the future.'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Ministry</h1>
                        <p className="text-xl md:text-2xl text-primary-100">
                            Empowering the next generation to become Christ-centered leaders
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        <div className="bg-primary-50 rounded-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                To raise a generation of teenagers who are deeply rooted in Christ,
                                equipped with God's Word, and empowered to impact their world through
                                the demonstration of the Holy Spirit's power.
                            </p>
                        </div>
                        <div className="bg-secondary-50 rounded-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                A vibrant community where every teenager discovers their divine purpose,
                                develops authentic relationships, and becomes a catalyst for positive
                                change in their generation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm">
                                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <value.icon className="h-8 w-8 text-primary-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Team */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
                        <p className="text-xl text-gray-600">Dedicated servants guiding our youth</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {team.map((member, index) => (
                            <div key={index} className="text-center">
                                <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                                <p className="text-gray-600">{member.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-primary-600 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">What Our Teens Say</h2>
                        <p className="text-primary-100 text-xl">Hear from members of our community</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-primary-500 rounded-lg p-6">
                                <div className="text-4xl mb-4">"</div>
                                <p className="text-lg mb-4 italic">{testimonial.testimony}</p>
                                <div className="font-semibold">
                                    {testimonial.name}, <span className="text-primary-200">Age {testimonial.age}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center">
                                <MapPin className="h-8 w-8 text-primary-600 mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                                <p className="text-gray-600">Foursquare Gospel Church<br />Sabo District<br />Lagos, Nigeria</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <Phone className="h-8 w-8 text-primary-600 mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                                <p className="text-gray-600">+234 801 234 5678<br />+234 901 876 5432</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <Mail className="h-8 w-8 text-primary-600 mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                                <p className="text-gray-600">teens@sabodistrict.foursquare<br />info@sabodistrict.foursquare</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;