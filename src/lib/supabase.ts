import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to get user profile
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      *,
      student_profiles(*),
      educator_profiles(*),
      admin_profiles(*)
    `)
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
}

// Helper function to get user type
export async function getUserType(userId: string): Promise<'student' | 'educator' | 'admin' | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('user_type')
    .eq('id', userId)
    .single();

  if (error || !data) {
    console.error('Error fetching user type:', error);
    return null;
  }

  return data.user_type as 'student' | 'educator' | 'admin';
}

// Helper function to submit contact form
export async function submitContactForm(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
  user_id?: string;
}) {
  const { data, error } = await supabase
    .from('contact_form_submissions')
    .insert([formData])
    .select();

  if (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }

  return data;
}

// Helper function to submit partnership request
export async function submitPartnershipRequest(formData: {
  organization_name: string;
  organization_type: string;
  contact_name: string;
  email: string;
  phone: string;
  message: string;
  user_id?: string;
}) {
  const { data, error } = await supabase
    .from('partnership_requests')
    .insert([formData])
    .select();

  if (error) {
    console.error('Error submitting partnership request:', error);
    throw error;
  }

  return data;
}

// Helper function to submit demo request
export async function submitDemoRequest(formData: {
  name: string;
  email: string;
  organization: string;
  role: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
  user_id?: string;
}) {
  const { data, error } = await supabase
    .from('demo_requests')
    .insert([formData])
    .select();

  if (error) {
    console.error('Error submitting demo request:', error);
    throw error;
  }

  return data;
}

// Helper function to submit school signup
export async function submitSchoolSignup(formData: any) {
  const { data, error } = await supabase
    .from('school_signup_submissions')
    .insert([formData])
    .select();

  if (error) {
    console.error('Error submitting school signup:', error);
    throw error;
  }

  return data;
}

// Helper function to submit student signup
export async function submitStudentSignup(formData: any) {
  const { data, error } = await supabase
    .from('student_signup_submissions')
    .insert([formData])
    .select();

  if (error) {
    console.error('Error submitting student signup:', error);
    throw error;
  }

  return data;
}

// Helper function to log user activity
export async function logUserActivity(userId: string, activityType: string, details: any = {}) {
  const { error } = await supabase
    .from('user_activity_logs')
    .insert([{
      user_id: userId,
      activity_type: activityType,
      details
    }]);

  if (error) {
    console.error('Error logging user activity:', error);
  }
}

// Helper function to get user courses
export async function getUserCourses(userId: string) {
  const { data, error } = await supabase
    .from('user_progress')
    .select(`
      *,
      courses(*)
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user courses:', error);
    return [];
  }

  return data;
}

// Helper function to get user goals
export async function getUserGoals(userId: string) {
  const { data, error } = await supabase
    .from('user_goals')
    .select(`
      *,
      goal_milestones(*)
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user goals:', error);
    return [];
  }

  return data;
}

// Helper function to get user schedule
export async function getUserSchedule(userId: string) {
  const { data, error } = await supabase
    .from('user_schedules')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user schedule:', error);
    return [];
  }

  return data;
}

// Helper function to get user groups
export async function getUserGroups(userId: string) {
  const { data, error } = await supabase
    .from('group_members')
    .select(`
      *,
      groups(*)
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user groups:', error);
    return [];
  }

  return data;
}

// Helper function to get user messages
export async function getUserChannelMessages(channelId: string) {
  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      profiles:user_id(first_name, last_name, avatar_url),
      message_attachments(*),
      message_reactions(*)
    `)
    .eq('channel_id', channelId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching channel messages:', error);
    return [];
  }

  return data;
}

// Helper function to get user direct messages
export async function getUserDirectMessages(userId: string, otherUserId: string) {
  const { data, error } = await supabase
    .from('direct_messages')
    .select(`
      *,
      sender:sender_id(first_name, last_name, avatar_url),
      recipient:recipient_id(first_name, last_name, avatar_url),
      direct_message_attachments(*),
      message_reactions(*)
    `)
    .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
    .or(`sender_id.eq.${otherUserId},recipient_id.eq.${otherUserId}`)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching direct messages:', error);
    return [];
  }

  return data;
}

// Helper function to get user announcements
export async function getUserAnnouncements(userId: string) {
  // First get user's groups
  const { data: userGroups, error: groupsError } = await supabase
    .from('group_members')
    .select('group_id')
    .eq('user_id', userId);

  if (groupsError) {
    console.error('Error fetching user groups:', groupsError);
    return [];
  }

  const groupIds = userGroups.map(g => g.group_id);
  
  // Get user type
  const userType = await getUserType(userId);
  
  // Get announcements for user's groups and type
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .or(`target_group.eq.All,target_group.in.(${groupIds.join(',')})${userType ? `,target_group.eq.${userType}s` : ''}`);

  if (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }

  return data;
}

// Helper function to get resources
export async function getResources(category?: string, accessLevel?: string) {
  let query = supabase
    .from('resources')
    .select(`
      *,
      resource_access(subscription_tier)
    `)
    .eq('status', 'active');

  if (category) {
    query = query.eq('category', category);
  }

  if (accessLevel) {
    query = query.eq('access_level', accessLevel);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching resources:', error);
    return [];
  }

  return data;
}

// Helper function to get user badges
export async function getUserBadges(userId: string) {
  const { data, error } = await supabase
    .from('user_badges')
    .select(`
      *,
      badge:badge_id(*)
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user badges:', error);
    return [];
  }

  return data;
}

// Helper function to get user feedback
export async function getUserFeedback(userId: string) {
  const { data, error } = await supabase
    .from('feedback_submissions')
    .select(`
      *,
      category:category_id(*),
      responses:feedback_responses(*)
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user feedback:', error);
    return [];
  }

  return data;
}

// Helper function to submit feedback
export async function submitFeedback(formData: any) {
  const { data, error } = await supabase
    .from('feedback_submissions')
    .insert([formData])
    .select();

  if (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }

  return data;
}