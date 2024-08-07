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
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      CoinTransaction: {
        Row: {
          amount: number
          createdAt: string
          description: string
          id: number
          updatedAt: string
          userId: string
        }
        Insert: {
          amount: number
          createdAt?: string
          description: string
          id?: number
          updatedAt: string
          userId: string
        }
        Update: {
          amount?: number
          createdAt?: string
          description?: string
          id?: number
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "CoinTransaction_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Invitation: {
        Row: {
          createdAt: string
          id: number
          inviteeId: string
          inviterId: string
        }
        Insert: {
          createdAt?: string
          id?: number
          inviteeId: string
          inviterId: string
        }
        Update: {
          createdAt?: string
          id?: number
          inviteeId?: string
          inviterId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Invitation_inviteeId_fkey"
            columns: ["inviteeId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Invitation_inviterId_fkey"
            columns: ["inviterId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      MembershipLevel: {
        Row: {
          createdAt: string
          id: number
          level: number
          rechargeAmount: number
        }
        Insert: {
          createdAt?: string
          id?: number
          level?: number
          rechargeAmount: number
        }
        Update: {
          createdAt?: string
          id?: number
          level?: number
          rechargeAmount?: number
        }
        Relationships: []
      }
      Order: {
        Row: {
          amount: number
          createdAt: string
          currency: string | null
          id: string
          payerOpenid: string | null
          paymentId: string | null
          status: Database["public"]["Enums"]["OrderStatus"]
          subscriptionId: number | null
          subscriptionType: Database["public"]["Enums"]["SubscriptionType"]
          updatedAt: string
          userId: string
        }
        Insert: {
          amount: number
          createdAt?: string
          currency?: string | null
          id: string
          payerOpenid?: string | null
          paymentId?: string | null
          status: Database["public"]["Enums"]["OrderStatus"]
          subscriptionId?: number | null
          subscriptionType: Database["public"]["Enums"]["SubscriptionType"]
          updatedAt: string
          userId: string
        }
        Update: {
          amount?: number
          createdAt?: string
          currency?: string | null
          id?: string
          payerOpenid?: string | null
          paymentId?: string | null
          status?: Database["public"]["Enums"]["OrderStatus"]
          subscriptionId?: number | null
          subscriptionType?: Database["public"]["Enums"]["SubscriptionType"]
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Order_subscriptionId_fkey"
            columns: ["subscriptionId"]
            isOneToOne: false
            referencedRelation: "Subscription"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Order_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Session: {
        Row: {
          createdAt: string
          expiresAt: string
          id: number
          token: string
          userId: string
        }
        Insert: {
          createdAt?: string
          expiresAt: string
          id?: number
          token: string
          userId: string
        }
        Update: {
          createdAt?: string
          expiresAt?: string
          id?: number
          token?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Session_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Subscription: {
        Row: {
          createdAt: string
          endDate: string
          id: number
          invitationId: number | null
          startDate: string
          type: Database["public"]["Enums"]["SubscriptionType"]
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          endDate: string
          id?: number
          invitationId?: number | null
          startDate?: string
          type: Database["public"]["Enums"]["SubscriptionType"]
          updatedAt: string
          userId: string
        }
        Update: {
          createdAt?: string
          endDate?: string
          id?: number
          invitationId?: number | null
          startDate?: string
          type?: Database["public"]["Enums"]["SubscriptionType"]
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Subscription_invitationId_fkey"
            columns: ["invitationId"]
            isOneToOne: false
            referencedRelation: "Invitation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Subscription_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      SubscriptionPrice: {
        Row: {
          id: number
          price: number
          subtitle: string
          tag: string | null
          title: string
          type: Database["public"]["Enums"]["SubscriptionType"]
        }
        Insert: {
          id?: number
          price: number
          subtitle: string
          tag?: string | null
          title: string
          type: Database["public"]["Enums"]["SubscriptionType"]
        }
        Update: {
          id?: number
          price?: number
          subtitle?: string
          tag?: string | null
          title?: string
          type?: Database["public"]["Enums"]["SubscriptionType"]
        }
        Relationships: []
      }
      User: {
        Row: {
          avatar: string | null
          city: string | null
          coins: number
          country: string | null
          createdAt: string
          email: string | null
          emailVerified: string | null
          id: string
          inviteCode: string
          language: string | null
          level: number
          openid: string | null
          password: string
          phone: string | null
          privilege: string[] | null
          province: string | null
          role: Database["public"]["Enums"]["Role"]
          sex: number | null
          unionid: string | null
          updatedAt: string
          username: string | null
        }
        Insert: {
          avatar?: string | null
          city?: string | null
          coins?: number
          country?: string | null
          createdAt?: string
          email?: string | null
          emailVerified?: string | null
          id: string
          inviteCode: string
          language?: string | null
          level?: number
          openid?: string | null
          password: string
          phone?: string | null
          privilege?: string[] | null
          province?: string | null
          role: Database["public"]["Enums"]["Role"]
          sex?: number | null
          unionid?: string | null
          updatedAt: string
          username?: string | null
        }
        Update: {
          avatar?: string | null
          city?: string | null
          coins?: number
          country?: string | null
          createdAt?: string
          email?: string | null
          emailVerified?: string | null
          id?: string
          inviteCode?: string
          language?: string | null
          level?: number
          openid?: string | null
          password?: string
          phone?: string | null
          privilege?: string[] | null
          province?: string | null
          role?: Database["public"]["Enums"]["Role"]
          sex?: number | null
          unionid?: string | null
          updatedAt?: string
          username?: string | null
        }
        Relationships: []
      }
      verificationtokens: {
        Row: {
          expires: string
          identifier: string
          token: string
        }
        Insert: {
          expires: string
          identifier: string
          token: string
        }
        Update: {
          expires?: string
          identifier?: string
          token?: string
        }
        Relationships: []
      }
      WechatLoginSession: {
        Row: {
          createdAt: string
          id: string
          status: Database["public"]["Enums"]["WechatLoginStatus"]
          updatedAt: string
          userId: string | null
        }
        Insert: {
          createdAt?: string
          id: string
          status: Database["public"]["Enums"]["WechatLoginStatus"]
          updatedAt: string
          userId?: string | null
        }
        Update: {
          createdAt?: string
          id?: string
          status?: Database["public"]["Enums"]["WechatLoginStatus"]
          updatedAt?: string
          userId?: string | null
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
      OrderStatus: "CREATED" | "PAID" | "CANCELED"
      Role: "ADMIN" | "USER"
      SubscriptionType:
        | "YEARLY"
        | "MONTHLY"
        | "QUARTERLY"
        | "SEMIANNUALLY"
        | "INVITE"
      WechatLoginStatus: "CREATED" | "SUCCESS" | "FAIL" | "USED"
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
