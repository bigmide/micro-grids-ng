import { type MergeDeep } from 'type-fest'
import { type Database as DatabaseGenerated } from './supabase-generated'

// Define your custom JSON type
type PositionType = { lat: number | string; lng: number | string }

export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Tables: {
        microgrid_applications: {
          Row: {
            capacity: string
            category: string
            area: string
            commissioningDate: string
            contactName: string
            createdAt?: string
            description: string
            email: string
            geopoliticalZone: string
            id?: number
            lga: string
            name: string
            notes: string | null
            operator: string
            position: PositionType
            powerSources: string
            size: string
            source: string
            state: string
            type: string
          }
          Insert: {
            capacity: string
            category: string
            area: string
            commissioningDate: string
            contactName?: string
            createdAt?: string
            description: string
            email?: string
            geopoliticalZone: string
            id?: number
            lga: string
            name: string
            notes?: string | null
            operator: string
            position: PositionType
            powerSources: string
            size: string
            source: string
            state: string
            type: string
          }
          Update: {
            capacity?: string
            category?: string
            area?: string
            commissioningDate?: string
            contactName?: string
            createdAt?: string
            description?: string
            email?: string
            geopoliticalZone?: string
            id?: number
            lga?: string
            name?: string
            notes?: string | null
            operator?: string
            position?: PositionType
            powerSources?: string
            size?: string
            source?: string
            state?: string
            type?: string
          }
          Relationships: []
        }
        microgrids: {
          Row: {
            capacity: string
            category: string
            area: string
            commissioningDate: string
            contactName: string
            createdAt?: string
            description: string
            email: string
            geopoliticalZone: string
            id?: number
            lga: string
            name: string
            notes: string | null
            operator: string
            position: PositionType
            powerSources: string
            size: string
            source: string
            state: string
            type: string
          }
          Insert: {
            capacity: string
            category: string
            area: string
            commissioningDate: string
            contactName?: string
            createdAt?: string
            description: string
            email?: string
            geopoliticalZone: string
            id?: number
            lga: string
            name: string
            notes?: string | null
            operator: string
            position: PositionType
            powerSources: string
            size: string
            source: string
            state: string
            type: string
          }
          Update: {
            capacity?: string
            category?: string
            area?: string
            commissioningDate?: string
            contactName?: string
            createdAt?: string
            description?: string
            email?: string
            geopoliticalZone?: string
            id?: number
            lga?: string
            name?: string
            notes?: string | null
            operator?: string
            position?: PositionType
            powerSources?: string
            size?: string
            source?: string
            state?: string
            type?: string
          }
          Relationships: []
        }
        service_providers: {
          Row: {
            address: string
            business_classification: string
            category: string
            certification: string
            area: string
            commencement_year: string
            connection_mode: string
            contactName: string
            coverage_areas: string
            createdAt?: string
            description: string
            email: string
            id?: number
            lga: string
            logo: string | null
            name: string
            notes: string | null
            phone: string
            position: PositionType
            products_and_services: string
            state: string
            website: string
          }
          Insert: {
            address: string
            business_classification?: string
            category: string
            certification?: string
            area: string
            commencement_year: string
            connection_mode?: string
            contactName: string
            coverage_areas: string
            createdAt?: string
            description: string
            email: string
            id?: number
            lga: string
            logo?: string | null
            name: string
            notes?: string | null
            phone: string
            position: PositionType
            products_and_services?: string
            state: string
            website?: string
          }
          Update: {
            address?: string
            business_classification?: string
            category?: string
            certification?: string
            area?: string
            commencement_year?: string
            connection_mode?: string
            contactName?: string
            coverage_areas?: string
            createdAt?: string
            description?: string
            email?: string
            id?: number
            lga?: string
            logo?: string | null
            name?: string
            notes?: string | null
            phone?: string
            position?: PositionType
            products_and_services?: string
            state?: string
            website?: string
          }
          Relationships: []
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
>

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
