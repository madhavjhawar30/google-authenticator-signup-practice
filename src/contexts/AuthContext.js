import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      
      // If user exists, ensure profile is created
      if (session?.user) {
        await ensureUserProfile(session.user)
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        // Handle profile creation for new users
        if (event === 'SIGNED_IN' && session?.user) {
          await ensureUserProfile(session.user)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Add this function to ensure profile exists
  const ensureUserProfile = async (user) => {
    try {
      console.log('Ensuring profile for user:', user.id)
      
      // First, try to get existing profile
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (fetchError && fetchError.code === 'PGRST116') {
        // Profile doesn't exist, create it
        const profileData = {
          id: user.id,
          first_name: user.user_metadata?.first_name || user.user_metadata?.full_name?.split(' ')[0] || '',
          last_name: user.user_metadata?.last_name || user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
          full_name: user.user_metadata?.full_name || '',
          phone: user.user_metadata?.phone || '',
          avatar_url: user.user_metadata?.avatar_url || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }

        console.log('Creating profile with data:', profileData)

        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert([profileData])
          .select()
          .single()

        if (insertError) {
          console.error('Error creating profile:', insertError)
        } else {
          console.log('Profile created successfully:', newProfile)
          setProfile(newProfile)
        }
      } else if (existingProfile) {
        // Profile exists, set it
        console.log('Profile already exists:', existingProfile)
        setProfile(existingProfile)
      }
    } catch (error) {
      console.error('Error ensuring user profile:', error)
    }
  }

  // Sign up with email and password
  const signUp = async (email, password, profileData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: profileData
        }
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  // Sign in with email and password
  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  // Sign in with Google OAuth
  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
      setProfile(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: updates
      })

      if (error) throw error
      setUser(data.user)
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  // Reset password
  const resetPassword = async (email) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    updateProfile,
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 