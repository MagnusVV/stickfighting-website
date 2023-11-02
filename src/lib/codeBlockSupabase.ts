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
      about_association: {
        Row: {
          body_text: string | null
          created_at: string
          id: number
          profile_id: string | null
          title: string | null
        }
        Insert: {
          body_text?: string | null
          created_at?: string
          id?: number
          profile_id?: string | null
          title?: string | null
        }
        Update: {
          body_text?: string | null
          created_at?: string
          id?: number
          profile_id?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "about_association_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      about_page: {
        Row: {
          about_id: number | null
          id: number
          intructor_id: number | null
          philosophy_id: number | null
        }
        Insert: {
          about_id?: number | null
          id?: number
          intructor_id?: number | null
          philosophy_id?: number | null
        }
        Update: {
          about_id?: number | null
          id?: number
          intructor_id?: number | null
          philosophy_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "about_page_about_id_fkey"
            columns: ["about_id"]
            isOneToOne: false
            referencedRelation: "about_association"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "about_page_intructor_id_fkey"
            columns: ["intructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "about_page_philosophy_id_fkey"
            columns: ["philosophy_id"]
            isOneToOne: false
            referencedRelation: "our_philosophy"
            referencedColumns: ["id"]
          }
        ]
      }
      editor_test: {
        Row: {
          body_text: Json | null
          created_at: string
          id: number
          profile_id: string | null
        }
        Insert: {
          body_text?: Json | null
          created_at?: string
          id?: number
          profile_id?: string | null
        }
        Update: {
          body_text?: Json | null
          created_at?: string
          id?: number
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "editor_test_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      events: {
        Row: {
          cancelled: boolean
          created_at: string
          event_date: string
          event_end_time: string
          event_start_time: string
          id: number
          instructor_id: number | null
          locale_id: number
          profile_id: string
        }
        Insert: {
          cancelled?: boolean
          created_at?: string
          event_date: string
          event_end_time: string
          event_start_time: string
          id?: number
          instructor_id?: number | null
          locale_id: number
          profile_id: string
        }
        Update: {
          cancelled?: boolean
          created_at?: string
          event_date?: string
          event_end_time?: string
          event_start_time?: string
          id?: number
          instructor_id?: number | null
          locale_id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_locale_id_fkey"
            columns: ["locale_id"]
            isOneToOne: false
            referencedRelation: "locale"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      instructors: {
        Row: {
          body_text: string | null
          created_at: string
          id: number
          name: string | null
          profile_id: string | null
        }
        Insert: {
          body_text?: string | null
          created_at?: string
          id?: number
          name?: string | null
          profile_id?: string | null
        }
        Update: {
          body_text?: string | null
          created_at?: string
          id?: number
          name?: string | null
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instructors_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      locale: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          body_text: string | null
          created_at: string
          id: number
          ingress: string | null
          profile_id: string | null
          title: string | null
        }
        Insert: {
          body_text?: string | null
          created_at?: string
          id?: number
          ingress?: string | null
          profile_id?: string | null
          title?: string | null
        }
        Update: {
          body_text?: string | null
          created_at?: string
          id?: number
          ingress?: string | null
          profile_id?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "news_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      our_philosophy: {
        Row: {
          body_text: string | null
          created_at: string
          id: number
          profile_id: string | null
          title: string | null
        }
        Insert: {
          body_text?: string | null
          created_at?: string
          id?: number
          profile_id?: string | null
          title?: string | null
        }
        Update: {
          body_text?: string | null
          created_at?: string
          id?: number
          profile_id?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "our_philosophy_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
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
