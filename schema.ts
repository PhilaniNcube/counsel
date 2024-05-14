export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      case_costs: {
        Row: {
          cost: number
          created_at: string
          description: string
          id: number
          title: string
        }
        Insert: {
          cost: number
          created_at?: string
          description: string
          id?: number
          title: string
        }
        Update: {
          cost?: number
          created_at?: string
          description?: string
          id?: number
          title?: string
        }
        Relationships: []
      }
      cases: {
        Row: {
          case_number: string
          client_id: number
          completed: boolean
          created_at: string
          description: string
          end_date: string | null
          id: number
          start_date: string
        }
        Insert: {
          case_number: string
          client_id: number
          completed?: boolean
          created_at?: string
          description: string
          end_date?: string | null
          id?: number
          start_date: string
        }
        Update: {
          case_number?: string
          client_id?: number
          completed?: boolean
          created_at?: string
          description?: string
          end_date?: string | null
          id?: number
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "cases_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          address: string
          company: string | null
          contact_type: Database["public"]["Enums"]["contact_type"]
          created_at: string
          email: string
          first_name: string
          id: number
          last_name: string
          phone: string
          updated_at: string | null
        }
        Insert: {
          address: string
          company?: string | null
          contact_type: Database["public"]["Enums"]["contact_type"]
          created_at?: string
          email: string
          first_name: string
          id?: number
          last_name: string
          phone: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          company?: string | null
          contact_type?: Database["public"]["Enums"]["contact_type"]
          created_at?: string
          email?: string
          first_name?: string
          id?: number
          last_name?: string
          phone?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      members: {
        Row: {
          created_at: string
          id: number
          org_id: number
          profile_id: string
          role: Database["public"]["Enums"]["roles"]
        }
        Insert: {
          created_at?: string
          id?: number
          org_id: number
          profile_id: string
          role?: Database["public"]["Enums"]["roles"]
        }
        Update: {
          created_at?: string
          id?: number
          org_id?: number
          profile_id?: string
          role?: Database["public"]["Enums"]["roles"]
        }
        Relationships: [
          {
            foreignKeyName: "members_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organization: {
        Row: {
          admin_id: string
          created_at: string
          id: number
          name: string
          phone: string
          website: string
        }
        Insert: {
          admin_id?: string
          created_at?: string
          id?: number
          name: string
          phone: string
          website: string
        }
        Update: {
          admin_id?: string
          created_at?: string
          id?: number
          name?: string
          phone?: string
          website?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          email: string
          full_name: string
          id: string
          updated_at: string | null
        }
        Insert: {
          email: string
          full_name: string
          id: string
          updated_at?: string | null
        }
        Update: {
          email?: string
          full_name?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assignee: number
          case_id: number
          created_at: string
          description: string
          id: number
          status: Database["public"]["Enums"]["task_status"]
          title: string
        }
        Insert: {
          assignee: number
          case_id: number
          created_at?: string
          description: string
          id?: number
          status?: Database["public"]["Enums"]["task_status"]
          title: string
        }
        Update: {
          assignee?: number
          case_id?: number
          created_at?: string
          description?: string
          id?: number
          status?: Database["public"]["Enums"]["task_status"]
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assignee_fkey"
            columns: ["assignee"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
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
      contact_type: "client" | "potential client" | "opposing counsel"
      roles: "admin" | "manager" | "member"
      status: "pending" | "active" | "removed"
      task_status: "not started" | "in progress" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
