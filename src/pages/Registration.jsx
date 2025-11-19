// src/pages/Registration.jsx
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { eventsService, registrationsService } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import FormInput from '../components/forms/FormInput';
import FormSelect from '../components/forms/FormSelect';

const Registration = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const { profile } = useAuth();
    const { showToast } = useToast();
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm();

    const isStudent = watch('category') === 'student';

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        if (eventId && events.length > 0) {
            const event = events.find(e => e.id === eventId);
            if (event) {
                setSelectedEvent(event);
            }
        }
    }, [eventId, events]);

    const fetchEvents = async () => {
        try {
            const { data } = await eventsService.getEvents({ status: 'upcoming' });
            setEvents(data || []);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const onSubmit = async (data) => {
        if (!selectedEvent && !data.event_id) {
            showToast('Please select an event', 'error');
            return;
        }

        setLoading(true);
        try {
            const registrationData = {
                event_id: selectedEvent?.id || data.event_id,
                user_id: profile.id,
                full_name: data.full_name,
                residential_address: data.residential_address,
                phone_number: data.phone_number,
                school_class: isStudent ? data.school_class : null,
                industry: !isStudent ? data.industry : null,
                church: data.church,
                parent_full_name: data.parent_full_name,
                parent_phone_number: data.parent_phone_number,
                parent_church: data.parent_church,
                parent_occupation: data.parent_occupation,
            };

            const { error } = await registrationsService.createRegistration(registrationData);

            if (error) throw error;

            showToast('Registration submitted successfully!', 'success');
            reset();
            navigate('/events');
        } catch (error) {
            console.error('Registration error:', error);
            showToast('Failed to submit registration. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-2xl">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Event Registration
                        </h1>
                        <p className="text-gray-600">
                            Complete the form below to register for our teenage program events
                        </p>
                    </div>

                    {selectedEvent && (
                        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                            <h3 className="font-semibold text-primary-900 mb-2">
                                Registering for:
                            </h3>
                            <p className="text-primary-700">{selectedEvent.title}</p>
                            <p className="text-primary-600 text-sm">
                                {new Date(selectedEvent.event_date).toLocaleDateString()} •
                                {selectedEvent.start_time} - {selectedEvent.end_time}
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {!selectedEvent && (
                            <FormSelect
                                label="Select Event"
                                options={events.map(event => ({
                                    value: event.id,
                                    label: `${event.title} (${new Date(event.event_date).toLocaleDateString()})`
                                }))}
                                error={errors.event_id}
                                {...register('event_id', { required: 'Please select an event' })}
                            />
                        )}

                        <FormInput
                            label="Full Name"
                            type="text"
                            error={errors.full_name}
                            {...register('full_name', { required: 'Full name is required' })}
                        />

                        <FormInput
                            label="Residential Address"
                            type="text"
                            error={errors.residential_address}
                            {...register('residential_address', {
                                required: 'Residential address is required'
                            })}
                        />

                        <FormInput
                            label="Phone Number"
                            type="tel"
                            error={errors.phone_number}
                            {...register('phone_number', {
                                required: 'Phone number is required',
                                pattern: {
                                    value: /^[0-9+\-\s()]+$/,
                                    message: 'Please enter a valid phone number'
                                }
                            })}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <div className="space-y-2">
                                    {['student', 'vocational'].map(category => (
                                        <label key={category} className="flex items-center">
                                            <input
                                                type="radio"
                                                value={category}
                                                {...register('category', {
                                                    required: 'Please select a category'
                                                })}
                                                className="mr-2"
                                            />
                                            <span className="capitalize">{category}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.category && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.category.message}
                                    </p>
                                )}
                            </div>

                            {isStudent ? (
                                <FormInput
                                    label="School & Class"
                                    type="text"
                                    placeholder="e.g., Community High School, SS2"
                                    error={errors.school_class}
                                    {...register('school_class', {
                                        required: 'School and class is required for students'
                                    })}
                                />
                            ) : (
                                <FormInput
                                    label="Industry/Vocation"
                                    type="text"
                                    placeholder="e.g., Fashion Design, Computer Programming"
                                    error={errors.industry}
                                    {...register('industry', {
                                        required: 'Industry/vocation is required'
                                    })}
                                />
                            )}
                        </div>

                        <FormInput
                            label="Church You Attend"
                            type="text"
                            error={errors.church}
                            {...register('church', {
                                required: 'Church information is required'
                            })}
                        />

                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Parent/Guardian Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput
                                    label="Parent's Full Name"
                                    type="text"
                                    error={errors.parent_full_name}
                                    {...register('parent_full_name', {
                                        required: "Parent's full name is required"
                                    })}
                                />

                                <FormInput
                                    label="Parent's Phone Number"
                                    type="tel"
                                    error={errors.parent_phone_number}
                                    {...register('parent_phone_number', {
                                        required: "Parent's phone number is required",
                                        pattern: {
                                            value: /^[0-9+\-\s()]+$/,
                                            message: 'Please enter a valid phone number'
                                        }
                                    })}
                                />
                            </div>

                            <FormInput
                                label="Parent's Church"
                                type="text"
                                error={errors.parent_church}
                                {...register('parent_church', {
                                    required: "Parent's church is required"
                                })}
                            />

                            <FormInput
                                label="Parent's Occupation"
                                type="text"
                                error={errors.parent_occupation}
                                {...register('parent_occupation', {
                                    required: "Parent's occupation is required"
                                })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? 'Submitting...' : 'Submit Registration'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;