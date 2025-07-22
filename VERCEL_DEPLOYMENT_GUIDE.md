# Vercel Deployment Guide - Fixing Supabase Environment Variables

## 🚨 Current Issue

Your Next.js Yoruba Wordle app is failing to deploy on Vercel due to missing Supabase environment variables. The build succeeds locally but fails in production because Vercel can't access your Supabase database.

## ✅ Solution Overview

Add the required Supabase environment variables to your Vercel project dashboard.

---

## 📋 Step-by-Step Guide

### Step 1: Access Your Vercel Project Dashboard

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Sign in to your account

2. **Navigate to Your Project**
   - Find and click on your project: **wisdom-deck**
   - Or go directly to: https://vercel.com/recipeideas-projects/wisdom-deck

### Step 2: Access Environment Variables

1. **Go to Settings Tab**
   - Click on the **"Settings"** tab in your project dashboard

2. **Find Environment Variables Section**
   - Scroll down to **"Environment Variables"** section
   - Click **"Add New"** button

### Step 3: Add Supabase Environment Variables

#### Variable 1: `NEXT_PUBLIC_SUPABASE_URL`

- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://hwquviowywgcfxkfzplf.supabase.co`
- **Environment**: Select **"Production"**, **"Preview"**, and **"Development"**
- **Click**: **"Save"**

#### Variable 2: `NEXT_PUBLIC_SUPABASE_ANON_KEY`

- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: Your Supabase anon key (starts with `sb_publishable_`)
- **Environment**: Select **"Production"**, **"Preview"**, and **"Development"**
- **Click**: **"Save"**

### Step 4: Find Your Supabase Credentials

If you don't have your Supabase credentials:

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Sign in to your account

2. **Select Your Project**
   - Click on your project (likely named something like "wisdom-deck" or "yoruba-dictionary")

3. **Get Project URL**
   - Go to **"Settings"** → **"General"**
   - Copy the **"Project URL"** (this is your `NEXT_PUBLIC_SUPABASE_URL`)

4. **Get Anon Key**
   - Go to **"Settings"** → **"API"**
   - Copy the **"anon public"** key (starts with `sb_publishable_`)
   - This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 5: Add Additional Environment Variables (Optional)

If you're using Stripe payments, also add:

#### Variable 3: `STRIPE_SECRET_KEY`

- **Name**: `STRIPE_SECRET_KEY`
- **Value**: Your Stripe secret key (starts with `sk_`)
- **Environment**: Select **"Production"**, **"Preview"**, and **"Development"**

#### Variable 4: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

- **Name**: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Value**: Your Stripe publishable key (starts with `pk_`)
- **Environment**: Select **"Production"**, **"Preview"**, and **"Development"**

#### Variable 5: `STRIPE_WEBHOOK_SECRET`

- **Name**: `STRIPE_WEBHOOK_SECRET`
- **Value**: Your Stripe webhook secret
- **Environment**: Select **"Production"**, **"Preview"**, and **"Development"**

#### Variable 6: `RESEND_API_KEY`

- **Name**: `RESEND_API_KEY`
- **Value**: Your Resend API key
- **Environment**: Select **"Production"**, **"Preview"**, and **"Development"**

---

## 🔄 Trigger New Deployment

### Option 1: Automatic (Recommended)

- After adding environment variables, Vercel will automatically trigger a new deployment
- Go to the **"Deployments"** tab to monitor progress

### Option 2: Manual Trigger

1. Go to **"Deployments"** tab
2. Click **"Redeploy"** on your latest deployment
3. Or make a small change to your code and push to GitHub

---

## ✅ Verification Steps

### 1. Check Deployment Status

- Go to **"Deployments"** tab
- Look for **"✅ Ready"** status
- Check that the build completed without errors

### 2. Test Your App

- Click on your deployment URL
- Test the Yoruba Wordle game functionality
- Verify that word validation works (try entering a Yoruba word)

### 3. Check Environment Variables

- Go to **"Settings"** → **"Environment Variables"**
- Verify all variables are listed and have correct values
- Ensure they're enabled for **Production**, **Preview**, and **Development**

---

## 🛠️ Troubleshooting

### If Deployment Still Fails:

#### 1. Check Build Logs

- Go to **"Deployments"** tab
- Click on the failed deployment
- Check **"Build Logs"** for specific error messages

#### 2. Common Issues and Solutions:

**Issue**: "Module not found" errors

- **Solution**: Ensure all dependencies are in `package.json`

**Issue**: "Environment variable not found"

- **Solution**: Double-check variable names and values

**Issue**: "Supabase connection failed"

- **Solution**: Verify your Supabase project is active and credentials are correct

#### 3. Test Locally with Production Variables

```bash
# Copy your production environment variables to .env.local
NEXT_PUBLIC_SUPABASE_URL=https://hwquviowywgcfxkfzplf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Test build
npm run build
```

---

## 📞 Need Help?

### If you're still having issues:

1. **Check Vercel Status**: https://vercel-status.com
2. **Supabase Status**: https://status.supabase.com
3. **Vercel Support**: https://vercel.com/support
4. **Supabase Support**: https://supabase.com/support

---

## 🎯 Expected Outcome

After following this guide, your Yoruba Wordle app should:

- ✅ Deploy successfully on Vercel
- ✅ Have working Supabase database integration
- ✅ Allow users to play the Yoruba Wordle game
- ✅ Validate Yoruba words correctly
- ✅ Process Stripe payments (if configured)

Your app will be accessible at your Vercel domain and fully functional! 🚀
