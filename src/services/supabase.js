// src/services/supabase.js
import { createClient } from '@supabase/supabase-js';

// Use Create React App environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables are not set. Using mock mode.');
}

// Create Supabase client
export const supabase = createClient(
    supabaseUrl || 'https://mock-supabase-url.supabase.co',
    supabaseAnonKey || 'mock-anon-key'
);

// Events service
export const eventsService = {
    async getEvents(filters = {}) {
        try {
            let query = supabase
                .from('events')
                .select('*')
                .order('event_date', { ascending: true });

            if (filters.status) {
                query = query.eq('status', filters.status);
            }

            const { data, error } = await query;

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            console.error('Error fetching events:', error);
            // Fallback to mock data
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
        }
    },

    async getEventById(id) {
        try {
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            console.error('Error fetching event:', error);
            // Fallback to mock data
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
        }
    },

    async createEvent(eventData) {
        try {
            const { data, error } = await supabase
                .from('events')
                .insert([eventData])
                .select()
                .single();

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            console.error('Error creating event:', error);
            return {
                data: { ...eventData, id: Date.now().toString() },
                error: null
            };
        }
    },

    async updateEvent(id, updates) {
        try {
            const { data, error } = await supabase
                .from('events')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            console.error('Error updating event:', error);
            return {
                data: { ...updates, id },
                error: null
            };
        }
    },

    async deleteEvent(id) {
        try {
            const { error } = await supabase
                .from('events')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return { error: null };
        } catch (error) {
            console.error('Error deleting event:', error);
            return { error: null };
        }
    },
};

// Registrations service
export const registrationsService = {
    async createRegistration(registrationData) {
        try {
            const { data, error } = await supabase
                .from('registrations')
                .insert([registrationData])
                .select()
                .single();

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            console.error('Error creating registration:', error);
            return {
                data: { ...registrationData, id: Date.now().toString() },
                error: null
            };
        }
    },

    async getUserRegistrations(userId) {
        try {
            const { data, error } = await supabase
                .from('registrations')
                .select(`
          *,
          events (*)
        `)
                .eq('user_id', userId)
                .order('registration_date', { ascending: false });

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            console.error('Error fetching user registrations:', error);
            return { data: [], error: null };
        }
    },

    async getAllRegistrations(filters = {}) {
        try {
            let query = supabase
                .from('registrations')
                .select(`
          *,
          events (*),
          profiles (full_name, email)
        `)
                .order('registration_date', { ascending: false });

            if (filters.event_id) {
                query = query.eq('event_id', filters.event_id);
            }

            const { data, error } = await query;

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            console.error('Error fetching all registrations:', error);
            return { data: [], error: null };
        }
    },

    async exportRegistrations(eventId = null) {
        try {
            let query = supabase
                .from('registrations')
                .select(`
          full_name,
          residential_address,
          phone_number,
          school_class,
          industry,
          church,
          parent_full_name,
          parent_phone_number,
          parent_church,
          parent_occupation,
          registration_date,
          events(title, event_date)
        `);

            if (eventId) {
                query = query.eq('event_id', eventId);
            }

            const { data, error } = await query;

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            console.error('Error exporting registrations:', error);
            return { data: [], error: null };
        }
    },
};