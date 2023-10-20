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
            foreignKeyName: 'about_association_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
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
            foreignKeyName: 'instructors_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
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
          created_at: string
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
            foreignKeyName: 'news_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
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
            foreignKeyName: 'our_philosophy_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
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
            foreignKeyName: 'profiles_id_fkey'
            columns: ['id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
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
