# Supabase Backend Setup Guide

This guide will help you set up Supabase as your backend for the React signup page.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `your-project-name`
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
5. Click "Create new project"
6. Wait for the project to be set up (usually takes 1-2 minutes)

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://zypiewqqadsnlkvnloze.supabase.co`)
   - **Anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5cGlld3FxYWRzbmxrdm5sb3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyOTY2NDIsImV4cCI6MjA2NTg3MjY0Mn0.Kzb0mxaav3itLKtXtYRB6w9QgJkFRR7Ns5Bg2nl5Ehs`)

## 3. Set Up Environment Variables

1. Create a `.env` file in your project root:
```bash
touch .env
```

2. Add your Supabase credentials:
```env
REACT_APP_SUPABASE_URL=https://zypiewqqadsnlkvnloze.supabase.co 
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Replace the placeholder values with your actual Supabase credentials

## 4. Configure Authentication

### Enable Email Authentication
1. Go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Configure email templates if needed

### Enable Google OAuth
1. Go to **Authentication** → **Providers**
2. Enable **Google**
3. You'll need to set up Google OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing one
   - Enable Google+ API
   - Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
   - Set **Application type** to "Web application"
   - Add authorized origins: `https://your-project-id.supabase.co`
   - Add authorized redirect URIs: `https://your-project-id.supabase.co/auth/v1/callback`
4. Copy the **Client ID** and **Client Secret** from Google
5. Paste them into Supabase Google provider settings

## 5. Set Up Database Schema

### Create Profiles Table
Run this SQL in your Supabase SQL editor:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, first_name, last_name, full_name, phone)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'phone'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

## 6. Configure Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize the following templates:
   - **Confirm signup**
   - **Reset password**
   - **Magic link**

## 7. Set Up Redirect URLs

1. Go to **Authentication** → **URL Configuration**
2. Add your local development URL: `http://localhost:3000`
3. Add your production URL when ready
4. Set the redirect URL to: `http://localhost:3000/auth/callback`

## 8. Install Dependencies

Run this command to install the required packages:

```bash
npm install
```

## 9. Test Your Setup

1. Start your development server:
```bash
npm start
```

2. Test the signup flow:
   - Try creating an account with email/password
   - Check if confirmation email is sent
   - Test Google OAuth (if configured)

## 10. Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_SUPABASE_URL` | Your Supabase project URL | `https://abc123.supabase.co` |
| `REACT_APP_SUPABASE_ANON_KEY` | Your Supabase anon/public key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

## 11. Security Best Practices

1. **Never commit your `.env` file** - it's already in `.gitignore`
2. **Use environment variables** for all sensitive data
3. **Enable Row Level Security** on all tables
4. **Set up proper CORS policies** in Supabase
5. **Use HTTPS in production**

## 12. Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Check that your `.env` file exists and has the correct variables
   - Restart your development server after adding environment variables

2. **"Invalid API key"**
   - Verify your Supabase URL and anon key are correct
   - Make sure you're using the anon key, not the service role key

3. **Google OAuth not working**
   - Check that Google provider is enabled in Supabase
   - Verify redirect URIs are correctly configured
   - Ensure Google Cloud Console credentials are correct

4. **Email confirmation not working**
   - Check email templates in Supabase
   - Verify SMTP settings if using custom email provider
   - Check spam folder for confirmation emails

## 13. Production Deployment

When deploying to production:

1. Update environment variables with production Supabase credentials
2. Add your production domain to Supabase redirect URLs
3. Configure custom domain if needed
4. Set up proper CORS policies
5. Enable email confirmations for production

## 14. Additional Features

Once basic setup is complete, you can add:

- **User profiles** with additional fields
- **File uploads** for avatars
- **Real-time subscriptions** for live updates
- **Database backups** and monitoring
- **Custom authentication flows**

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues) 