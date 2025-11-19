// src/pages/FAQ.jsx
import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [openItems, setOpenItems] = useState(new Set());

    const faqData = {
        registration: [
            {
                question: 'How do I register for an event?',
                answer: 'You can register for events by creating an account, logging in, and clicking the "Register" button on any upcoming event. You\'ll need to complete the registration form with your details and parent/guardian information.'
            },
            {
                question: 'Is there a registration fee?',
                answer: 'Most of our events are free for teenagers. However, some special events or retreats may have a minimal fee to cover materials and refreshments. Any fees will be clearly stated during registration.'
            },
            {
                question: 'Can I register for multiple events?',
                answer: 'Yes! You can register for as many events as you like. Each event requires a separate registration so we can plan appropriately.'
            },
            {
                question: 'What information do I need for registration?',
                answer: 'You\'ll need your personal details (full name, address, phone), school information (if applicable), church details, and parent/guardian contact information including their phone number and occupation.'
            }
        ],
        events: [
            {
                question: 'What types of events do you organize?',
                answer: 'We organize various events including weekly Bible studies, prayer meetings, youth conferences, leadership training, community service projects, fun fellowship activities, and annual retreats.'
            },
            {
                question: 'How often do events take place?',
                answer: 'We have regular weekly meetings every Sunday and Wednesday, plus special monthly events and quarterly major programs. Check the events calendar for the complete schedule.'
            },
            {
                question: 'Are parents allowed to attend events?',
                answer: 'While most events are specifically for teenagers, we occasionally have family events where parents are welcome. Regular teenage programs are designed to create a peer-to-peer learning environment.'
            },
            {
                question: 'What should I bring to events?',
                answer: 'We recommend bringing your Bible, a notebook, and a pen. For specific events, we may recommend additional items which will be communicated during registration.'
            }
        ],
        general: [
            {
                question: 'Who can join the Foursquare Sabo District Teenagers?',
                answer: 'Our program is open to all teenagers between ages 13-19, regardless of their church background. We welcome everyone who wants to grow spiritually and connect with other Christian youth.'
            },
            {
                question: 'What are the meeting times?',
                answer: 'We meet every Sunday morning during the main service (8:00 AM - 10:00 AM) and Wednesday evenings for Bible study (5:00 PM - 6:30 PM). Additional event times vary.'
            },
            {
                question: 'How can I get involved in leadership?',
                answer: 'We encourage interested teenagers to speak with our youth leaders. We provide leadership training and opportunities to serve in various capacities based on commitment and spiritual maturity.'
            },
            {
                question: 'Is transportation provided?',
                answer: 'While we don\'t provide general transportation, we can help coordinate carpools for special events. Please contact us if you need transportation assistance.'
            },
            {
                question: 'How can parents get involved?',
                answer: 'Parents can volunteer as chaperones for events, join the prayer team, or assist with administrative tasks. Contact our program director to discuss opportunities.'
            }
        ]
    };

    const categories = [
        { key: 'all', label: 'All Questions' },
        { key: 'registration', label: 'Registration' },
        { key: 'events', label: 'Events' },
        { key: 'general', label: 'General' }
    ];

    const toggleItem = (index) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(index)) {
            newOpenItems.delete(index);
        } else {
            newOpenItems.add(index);
        }
        setOpenItems(newOpenItems);
    };

    const allQuestions = Object.entries(faqData).flatMap(([category, questions]) =>
        questions.map((q, index) => ({
            ...q,
            category,
            globalIndex: `${category}-${index}`
        }))
    );

    const filteredQuestions = allQuestions.filter(item => {
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
                    <p className="text-xl text-gray-600">
                        Find answers to common questions about our teenagers program
                    </p>
                </div>

                {/* Search Bar */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search questions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {categories.map(category => (
                        <button
                            key={category.key}
                            onClick={() => setActiveCategory(category.key)}
                            className={`px-4 py-2 rounded-full font-medium transition-colors ${
                                activeCategory === category.key
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {filteredQuestions.length > 0 ? (
                        filteredQuestions.map((item, index) => (
                            <div key={item.globalIndex} className="bg-white rounded-lg shadow-sm border">
                                <button
                                    onClick={() => toggleItem(item.globalIndex)}
                                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    <span className="font-semibold text-gray-900 pr-4">{item.question}</span>
                                    {openItems.has(item.globalIndex) ? (
                                        <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                    )}
                                </button>
                                {openItems.has(item.globalIndex) && (
                                    <div className="px-6 pb-4">
                                        <div className="border-t pt-4">
                                            <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">❓</div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No questions found</h3>
                            <p className="text-gray-500">
                                Try adjusting your search or filter criteria
                            </p>
                        </div>
                    )}
                </div>

                {/* Contact CTA */}
                <div className="bg-primary-600 rounded-lg p-8 text-center text-white mt-12">
                    <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
                    <p className="text-primary-100 mb-6">
                        We're here to help! Contact our team for more information.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                            Call Us
                        </button>
                        <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                            Email Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;