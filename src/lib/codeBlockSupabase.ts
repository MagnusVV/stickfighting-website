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
            referencedRelation: "about_association"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "about_page_intructor_id_fkey"
            columns: ["intructor_id"]
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "about_page_philosophy_id_fkey"
            columns: ["philosophy_id"]
            referencedRelation: "our_philosophy"
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
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
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
