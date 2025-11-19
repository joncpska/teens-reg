// src/components/admin/EventForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { eventsService } from '../../services/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';

const EventForm = ({ event, onSuccess, onCancel }) => {
    const { profile } = useAuth();
    const { showToast } = useToast();
    const [loading, setLoading] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: event ? {
            title: event.title,
            description: event.description,
            event_date: event.event_date,
            start_time: event.start_time,
            end_time: event.end_time,
            theme: event.theme,
            bible_text: event.bible_text,
            objective: event.objective,
            venue: event.venue,
            max_participants: event.max_participants,
            status: event.status,
        } : {
            status: 'upcoming'
        }
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const eventData = {
                ...data,
                created_by: profile.id,
                max_participants: data.max_participants ? parseInt(data.max_participants) : null,
            };

            if (event) {
                // Update existing event
                const { error } = await eventsService.updateEvent(event.id, eventData);
                if (error) throw error;
                showToast('Event updated successfully', 'success');
            } else {
                // Create new event
                const { error } = await eventsService.createEvent(eventData);
                if (error) throw error;
                showToast('Event created successfully', 'success');
            }

            onSuccess();
        } catch (error) {
            console.error('Error saving event:', error);
            showToast('Failed to save event', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
                label="Event Title"
                type="text"
                error={errors.title}
                {...register('title', { required: 'Event title is required' })}
            />

            <FormInput
                label="Theme"
                type="text"
                error={errors.theme}
                {...register('theme', { required: 'Theme is required' })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                    label="Event Date"
                    type="date"
                    error={errors.event_date}
                    {...register('event_date', { required: 'Event date is required' })}
                />

                <FormSelect
                    label="Status"
                    error={errors.status}
                    options={[
                        { value: 'upcoming', label: 'Upcoming' },
                        { value: 'ongoing', label: 'Ongoing' },
                        { value: 'completed', label: 'Completed' },
                    ]}
                    {...register('status', { required: 'Status is required' })}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                    label="Start Time"
                    type="time"
                    error={errors.start_time}
                    {...register('start_time', { required: 'Start time is required' })}
                />

                <FormInput
                    label="End Time"
                    type="time"
                    error={errors.end_time}
                    {...register('end_time', { required: 'End time is required' })}
                />
            </div>

            <FormInput
                label="Bible Text"
                type="text"
                placeholder="e.g., John 3:16, Romans 8:28"
                error={errors.bible_text}
                {...register('bible_text', { required: 'Bible text is required' })}
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Objective
                </label>
                <textarea
                    rows={3}
                    {...register('objective', { required: 'Objective is required' })}
                    className={`block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        errors.objective ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                    }`}
                />
                {errors.objective && (
                    <p className="mt-1 text-sm text-red-600">{errors.objective.message}</p>
                )}
            </div>

            <FormInput
                label="Venue"
                type="text"
                error={errors.venue}
                {...register('venue')}
            />

            <FormInput
                label="Maximum Participants"
                type="number"
                error={errors.max_participants}
                {...register('max_participants', { min: 1 })}
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                </label>
                <textarea
                    rows={4}
                    {...register('description')}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
            </div>

            <div className="flex justify-end space-x-3 pt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
                </button>
            </div>
        </form>
    );
};

export default EventForm;