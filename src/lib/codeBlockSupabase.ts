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
          title: string | null
        }
        Insert: {
          body_text?: string | null
          created_at?: string
          id?: number
          title?: string | null
        }
        Update: {
          body_text?: string | null
          created_at?: string
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      instructors: {
        Row: {
          body_text: string | null
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          body_text?: string | null
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          body_text?: string | null
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      news: {
        Row: {
          body_text: string | null
          created_at: string
          id: number
          ingress: string | null
          title: string | null
        }
        Insert: {
          body_text?: string | null
          created_at: string
          id?: number
          ingress?: string | null
          title?: string | null
        }
        Update: {
          body_text?: string | null
          created_at?: string
          id?: number
          ingress?: string | null
          title?: string | null
        }
        Relationships: []
      }
      our_philosophy: {
        Row: {
          body_text: string | null
          created_at: string
          id: number
          title: string | null
        }
        Insert: {
          body_text?: string | null
          created_at?: string
          id?: number
          title?: string | null
        }
        Update: {
          body_text?: string | null
          created_at?: string
          id?: number
          title?: string | null
        }
        Relationships: []
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
