// src/services/supabase.js
import { createClient } from '@supabase/supabase-js';

// Use Create React App environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables are not set. Using mock mode.');
}

// Create Supabase client with fallback for development
export const supabase = createClient(
    supabaseUrl || 'https://mock-supabase-url.supabase.co',
    supabaseAnonKey || 'mock-anon-key'
);

// Mock services for development
export const eventsService = {
    async getEvents(filters = {}) {
        // Return mock data for development
        const mockEvents = [
            {
                id: '1',
                title: 'Teenagers Prayer Conference',
                event_date: '2025-12-06',
                start_time: '07:00:00',
                end_time: '10:00:00',
                theme: 'GETTING DEEP IN CHRIST',
                bible_text: 'Isaiah 64:4, 1 Corinthians 2:9-16',
                objective: '3 Hours of Praying in Tongues to get Wisdom to Live a Glorious Life',
                venue: 'Foursquare Gospel Church Sabo District',
                status: 'upcoming',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ];

        return {
            data: mockEvents.filter(event =>
                !filters.status || event.status === filters.status
            ),
            error: null
        };
    },

    async getEventById(id) {
        const mockEvent = {
            id: id,
            title: 'Teenagers Prayer Conference',
            event_date: '2025-12-06',
            start_time: '07:00:00',
            end_time: '10:00:00',
            theme: 'GETTING DEEP IN CHRIST',
            bible_text: 'Isaiah 64:4, 1 Corinthians 2:9-16',
            objective: '3 Hours of Praying in Tongues to get Wisdom to Live a Glorious Life',
            venue: 'Foursquare Gospel Church Sabo District',
            status: 'upcoming',
            description: 'Join us for a powerful prayer conference focused on deepening our relationship with Christ through the power of praying in tongues.',
            max_participants: 100,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        return { data: mockEvent, error: null };
    },

    async createEvent(eventData) {
        console.log('Creating event:', eventData);
        return {
            data: { ...eventData, id: Date.now().toString() },
            error: null
        };
    },

    async updateEvent(id, updates) {
        console.log('Updating event:', id, updates);
        return {
            data: { ...updates, id },
            error: null
        };
    },

    async deleteEvent(id) {
        console.log('Deleting event:', id);
        return { error: null };
    },
};

export const registrationsService = {
    async createRegistration(registrationData) {
        console.log('Creating registration:', registrationData);
        return {
            data: { ...registrationData, id: Date.now().toString() },
            error: null
        };
    },

    async getUserRegistrations(userId) {
        return { data: [], error: null };
    },

    async getAllRegistrations(filters = {}) {
        return { data: [], error: null };
    },

    async exportRegistrations(eventId = null) {
        return { data: [], error: null };
    },
};