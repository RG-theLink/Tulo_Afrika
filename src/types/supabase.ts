export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          created_at: string | null
          id: string
          permissions: string[] | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          permissions?: string[] | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          permissions?: string[] | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      announcements: {
        Row: {
          category: string
          created_at: string | null
          created_by: string | null
          expires_at: string | null
          id: string
          message: string
          priority: string
          target_group: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          message: string
          priority: string
          target_group: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          message?: string
          priority?: string
          target_group?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "announcements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      available_badges: {
        Row: {
          category: string
          created_at: string | null
          description: string
          icon: string
          id: string
          name: string
          points_value: number | null
          requirements: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          icon: string
          id?: string
          name: string
          points_value?: number | null
          requirements: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          icon?: string
          id?: string
          name?: string
          points_value?: number | null
          requirements?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      channel_members: {
        Row: {
          channel_id: string
          created_at: string | null
          id: string
          joined_at: string | null
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          channel_id: string
          created_at?: string | null
          id?: string
          joined_at?: string | null
          role: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          channel_id?: string
          created_at?: string | null
          id?: string
          joined_at?: string | null
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "channel_members_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channel_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      channels: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_private: boolean | null
          name: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_private?: boolean | null
          name: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_private?: boolean | null
          name?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "channels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      class_attendees: {
        Row: {
          class_id: string
          created_at: string | null
          id: string
          joined_at: string | null
          left_at: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          class_id: string
          created_at?: string | null
          id?: string
          joined_at?: string | null
          left_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          class_id?: string
          created_at?: string | null
          id?: string
          joined_at?: string | null
          left_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_attendees_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "online_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_attendees_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      contact_form_submissions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          status: string | null
          subject: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          status?: string | null
          subject: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string | null
          subject?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_form_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      courses: {
        Row: {
          category: string
          created_at: string | null
          created_by: string | null
          description: string
          difficulty: string
          id: string
          published_at: string | null
          status: string | null
          thumbnail: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          created_by?: string | null
          description: string
          difficulty: string
          id?: string
          published_at?: string | null
          status?: string | null
          thumbnail?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          description?: string
          difficulty?: string
          id?: string
          published_at?: string | null
          status?: string | null
          thumbnail?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      demo_requests: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string | null
          name: string
          organization: string
          preferred_date: string
          preferred_time: string
          role: string
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message?: string | null
          name: string
          organization: string
          preferred_date: string
          preferred_time: string
          role: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string | null
          name?: string
          organization?: string
          preferred_date?: string
          preferred_time?: string
          role?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "demo_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      direct_message_attachments: {
        Row: {
          created_at: string | null
          id: string
          message_id: string
          name: string
          size: number
          type: string
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message_id: string
          name: string
          size: number
          type: string
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message_id?: string
          name?: string
          size?: number
          type?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "direct_message_attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "direct_messages"
            referencedColumns: ["id"]
          }
        ]
      }
      direct_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_edited: boolean | null
          is_read: boolean | null
          read_at: string | null
          recipient_id: string
          reply_to: string | null
          sender_id: string
          type: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_edited?: boolean | null
          is_read?: boolean | null
          read_at?: string | null
          recipient_id: string
          reply_to?: string | null
          sender_id: string
          type: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_edited?: boolean | null
          is_read?: boolean | null
          read_at?: string | null
          recipient_id?: string
          reply_to?: string | null
          sender_id?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "direct_messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "direct_messages_reply_to_fkey"
            columns: ["reply_to"]
            isOneToOne: false
            referencedRelation: "direct_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "direct_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      educator_profiles: {
        Row: {
          bio: string | null
          created_at: string | null
          id: string
          specialization: string | null
          subscription_status: string | null
          subscription_tier: string | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          id: string
          specialization?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          id?: string
          specialization?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "educator_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      feedback_categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      feedback_responses: {
        Row: {
          content: string
          created_at: string | null
          feedback_id: string
          id: string
          responder_id: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          feedback_id: string
          id?: string
          responder_id: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          feedback_id?: string
          id?: string
          responder_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_responses_feedback_id_fkey"
            columns: ["feedback_id"]
            isOneToOne: false
            referencedRelation: "feedback_submissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_responses_responder_id_fkey"
            columns: ["responder_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      feedback_submissions: {
        Row: {
          category_id: string
          content: string
          course_id: string | null
          created_at: string | null
          feedback_type: string
          id: string
          rating: number | null
          satisfaction: string | null
          status: string | null
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category_id: string
          content: string
          course_id?: string | null
          created_at?: string | null
          feedback_type: string
          id?: string
          rating?: number | null
          satisfaction?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category_id?: string
          content?: string
          course_id?: string | null
          created_at?: string | null
          feedback_type?: string
          id?: string
          rating?: number | null
          satisfaction?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_submissions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "feedback_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_submissions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      goal_milestones: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          goal_id: string
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          goal_id: string
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          goal_id?: string
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "goal_milestones_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "user_goals"
            referencedColumns: ["id"]
          }
        ]
      }
      group_members: {
        Row: {
          created_at: string | null
          group_id: string
          id: string
          joined_at: string | null
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          group_id: string
          id?: string
          joined_at?: string | null
          role: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          group_id?: string
          id?: string
          joined_at?: string | null
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      groups: {
        Row: {
          category: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_private: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_private?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_private?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "groups_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      learning_analytics: {
        Row: {
          average_score: number | null
          created_at: string | null
          id: string
          lessons_completed: number
          streak_days: number
          study_hours: number
          updated_at: string | null
          user_id: string
          week_starting: string
        }
        Insert: {
          average_score?: number | null
          created_at?: string | null
          id?: string
          lessons_completed?: number
          streak_days?: number
          study_hours?: number
          updated_at?: string | null
          user_id: string
          week_starting: string
        }
        Update: {
          average_score?: number | null
          created_at?: string | null
          id?: string
          lessons_completed?: number
          streak_days?: number
          study_hours?: number
          updated_at?: string | null
          user_id?: string
          week_starting?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_analytics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      lesson_completion: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          lesson_id: string
          score: number | null
          time_spent_seconds: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          lesson_id: string
          score?: number | null
          time_spent_seconds?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string
          score?: number | null
          time_spent_seconds?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_completion_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_completion_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      lessons: {
        Row: {
          content: string
          course_id: string
          created_at: string | null
          created_by: string | null
          description: string
          duration_minutes: number | null
          id: string
          order_index: number
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          course_id: string
          created_at?: string | null
          created_by?: string | null
          description: string
          duration_minutes?: number | null
          id?: string
          order_index: number
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          course_id?: string
          created_at?: string | null
          created_by?: string | null
          description?: string
          duration_minutes?: number | null
          id?: string
          order_index?: number
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      message_attachments: {
        Row: {
          created_at: string | null
          id: string
          message_id: string
          name: string
          size: number
          type: string
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message_id: string
          name: string
          size: number
          type: string
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message_id?: string
          name?: string
          size?: number
          type?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          }
        ]
      }
      message_reactions: {
        Row: {
          created_at: string | null
          direct_message_id: string | null
          emoji: string
          id: string
          message_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          direct_message_id?: string | null
          emoji: string
          id?: string
          message_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          direct_message_id?: string | null
          emoji?: string
          id?: string
          message_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_reactions_direct_message_id_fkey"
            columns: ["direct_message_id"]
            isOneToOne: false
            referencedRelation: "direct_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_reactions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          channel_id: string
          content: string
          created_at: string | null
          id: string
          is_edited: boolean | null
          reply_to: string | null
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          channel_id: string
          content: string
          created_at?: string | null
          id?: string
          is_edited?: boolean | null
          reply_to?: string | null
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          channel_id?: string
          content?: string
          created_at?: string | null
          id?: string
          is_edited?: boolean | null
          reply_to?: string | null
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_reply_to_fkey"
            columns: ["reply_to"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      online_classes: {
        Row: {
          created_at: string | null
          created_by: string | null
          date: string
          description: string
          end_time: string
          group_id: string | null
          id: string
          is_recurring: boolean | null
          meeting_link: string | null
          recording_link: string | null
          recurring_pattern: string | null
          start_time: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          date: string
          description: string
          end_time: string
          group_id?: string | null
          id?: string
          is_recurring?: boolean | null
          meeting_link?: string | null
          recording_link?: string | null
          recurring_pattern?: string | null
          start_time: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          date?: string
          description?: string
          end_time?: string
          group_id?: string | null
          id?: string
          is_recurring?: boolean | null
          meeting_link?: string | null
          recording_link?: string | null
          recurring_pattern?: string | null
          start_time?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "online_classes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "online_classes_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          }
        ]
      }
      partnership_requests: {
        Row: {
          contact_name: string
          created_at: string | null
          email: string
          id: string
          message: string
          organization_name: string
          organization_type: string
          phone: string
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          contact_name: string
          created_at?: string | null
          email: string
          id?: string
          message: string
          organization_name: string
          organization_type: string
          phone: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          contact_name?: string
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          organization_name?: string
          organization_type?: string
          phone?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partnership_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          updated_at: string | null
          user_type: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          updated_at?: string | null
          user_type: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          updated_at?: string | null
          user_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      resource_access: {
        Row: {
          created_at: string | null
          id: string
          resource_id: string
          subscription_tier: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          resource_id: string
          subscription_tier: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          resource_id?: string
          subscription_tier?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resource_access_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          }
        ]
      }
      resources: {
        Row: {
          access_level: string
          category: string
          created_at: string | null
          created_by: string | null
          creator: string | null
          description: string
          id: string
          status: string | null
          thumbnail: string | null
          title: string
          type: string
          updated_at: string | null
          url: string
        }
        Insert: {
          access_level: string
          category: string
          created_at?: string | null
          created_by?: string | null
          creator?: string | null
          description: string
          id?: string
          status?: string | null
          thumbnail?: string | null
          title: string
          type: string
          updated_at?: string | null
          url: string
        }
        Update: {
          access_level?: string
          category?: string
          created_at?: string | null
          created_by?: string | null
          creator?: string | null
          description?: string
          id?: string
          status?: string | null
          thumbnail?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "resources_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      schedule_requests: {
        Row: {
          created_at: string | null
          current_level: string
          goals: string
          id: string
          preferred_times: string[]
          special_requests: string | null
          status: string | null
          study_hours: string
          subjects: string[]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_level: string
          goals: string
          id?: string
          preferred_times: string[]
          special_requests?: string | null
          status?: string | null
          study_hours: string
          subjects: string[]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_level?: string
          goals?: string
          id?: string
          preferred_times?: string[]
          special_requests?: string | null
          status?: string | null
          study_hours?: string
          subjects?: string[]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedule_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      school_signup_submissions: {
        Row: {
          address: string
          budget: string
          city: string
          contact_name: string
          country: string
          created_at: string | null
          current_lms: string | null
          email: string
          grade_range: string
          id: string
          institution_name: string
          institution_type: string
          integration_type: string
          message: string
          phone: string
          preferred_contact_method: string
          preferred_time: string
          status: string | null
          student_count: string
          timeline: string
          title: string
          updated_at: string | null
          user_id: string | null
          website: string | null
        }
        Insert: {
          address: string
          budget: string
          city: string
          contact_name: string
          country: string
          created_at?: string | null
          current_lms?: string | null
          email: string
          grade_range: string
          id?: string
          institution_name: string
          institution_type: string
          integration_type: string
          message: string
          phone: string
          preferred_contact_method: string
          preferred_time: string
          status?: string | null
          student_count: string
          timeline: string
          title: string
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Update: {
          address?: string
          budget?: string
          city?: string
          contact_name?: string
          country?: string
          created_at?: string | null
          current_lms?: string | null
          email?: string
          grade_range?: string
          id?: string
          institution_name?: string
          institution_type?: string
          integration_type?: string
          message?: string
          phone?: string
          preferred_contact_method?: string
          preferred_time?: string
          status?: string | null
          student_count?: string
          timeline?: string
          title?: string
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "school_signup_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      student_profiles: {
        Row: {
          age: number | null
          created_at: string | null
          grade_level: string | null
          id: string
          learning_goals: string[] | null
          learning_style: string | null
          parent_email: string | null
          subjects: string[] | null
          subscription_status: string | null
          subscription_tier: string | null
          time_commitment: string | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          created_at?: string | null
          grade_level?: string | null
          id: string
          learning_goals?: string[] | null
          learning_style?: string | null
          parent_email?: string | null
          subjects?: string[] | null
          subscription_status?: string | null
          subscription_tier?: string | null
          time_commitment?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          created_at?: string | null
          grade_level?: string | null
          id?: string
          learning_goals?: string[] | null
          learning_style?: string | null
          parent_email?: string | null
          subjects?: string[] | null
          subscription_status?: string | null
          subscription_tier?: string | null
          time_commitment?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      student_signup_submissions: {
        Row: {
          age: string
          created_at: string | null
          email: string
          first_name: string
          grade_level: string
          id: string
          last_name: string
          learning_goals: string[]
          learning_style: string
          parent_email: string | null
          status: string | null
          subjects: string[]
          time_commitment: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          age: string
          created_at?: string | null
          email: string
          first_name: string
          grade_level: string
          id?: string
          last_name: string
          learning_goals: string[]
          learning_style: string
          parent_email?: string | null
          status?: string | null
          subjects: string[]
          time_commitment: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          age?: string
          created_at?: string | null
          email?: string
          first_name?: string
          grade_level?: string
          id?: string
          last_name?: string
          learning_goals?: string[]
          learning_style?: string
          parent_email?: string | null
          status?: string | null
          subjects?: string[]
          time_commitment?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_signup_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      system_metrics: {
        Row: {
          created_at: string | null
          details: Json | null
          id: string
          metric_name: string
          metric_unit: string
          metric_value: number
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          id?: string
          metric_name: string
          metric_unit: string
          metric_value: number
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          id?: string
          metric_name?: string
          metric_unit?: string
          metric_value?: number
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_description: string
          achievement_name: string
          created_at: string | null
          earned_at: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          achievement_description: string
          achievement_name: string
          created_at?: string | null
          earned_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          achievement_description?: string
          achievement_name?: string
          created_at?: string | null
          earned_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_activity_logs: {
        Row: {
          activity_type: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: string | null
          resource_id: string | null
          resource_type: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_badges: {
        Row: {
          badge_id: string
          created_at: string | null
          earned_at: string | null
          id: string
          progress: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          badge_id: string
          created_at?: string | null
          earned_at?: string | null
          id?: string
          progress?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          badge_id?: string
          created_at?: string | null
          earned_at?: string | null
          id?: string
          progress?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "available_badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_goals: {
        Row: {
          assigned_by: string | null
          category: string
          created_at: string | null
          deadline: string | null
          description: string
          id: string
          priority: string
          progress: number | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          assigned_by?: string | null
          category: string
          created_at?: string | null
          deadline?: string | null
          description: string
          id?: string
          priority: string
          progress?: number | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          assigned_by?: string | null
          category?: string
          created_at?: string | null
          deadline?: string | null
          description?: string
          id?: string
          priority?: string
          progress?: number | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_goals_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_progress: {
        Row: {
          completed: boolean | null
          course_id: string
          created_at: string | null
          id: string
          last_accessed_at: string | null
          lesson_id: string | null
          progress_percentage: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          course_id: string
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          lesson_id?: string | null
          progress_percentage?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          course_id?: string
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          lesson_id?: string | null
          progress_percentage?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_schedules: {
        Row: {
          created_at: string | null
          created_by: string | null
          day_of_week: string
          description: string | null
          end_time: string
          event_type: string
          group_id: string | null
          id: string
          is_recurring: boolean | null
          recurring_pattern: string | null
          start_time: string
          subject: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          day_of_week: string
          description?: string | null
          end_time: string
          event_type: string
          group_id?: string | null
          id?: string
          is_recurring?: boolean | null
          recurring_pattern?: string | null
          start_time: string
          subject?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          day_of_week?: string
          description?: string | null
          end_time?: string
          event_type?: string
          group_id?: string | null
          id?: string
          is_recurring?: boolean | null
          recurring_pattern?: string | null
          start_time?: string
          subject?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_schedules_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_schedules_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_schedules_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never