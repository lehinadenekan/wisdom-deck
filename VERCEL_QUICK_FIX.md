# 🚀 Vercel Quick Fix - Supabase Environment Variables

## 🎯 **IMMEDIATE ACTION REQUIRED**

Your Vercel deployment is failing because of missing Supabase environment variables.

---

## ⚡ **Quick Steps (5 minutes)**

### 1. Go to Vercel Dashboard

- Visit: https://vercel.com/recipeideas-projects/wisdom-deck
- Click **"Settings"** tab

### 2. Add Environment Variables

- Scroll to **"Environment Variables"**
- Click **"Add New"**

### 3. Add These 2 Variables:

#### Variable 1:

- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://hwquviowywgcfxkfzplf.supabase.co`
- **Environment**: ✅ Production, ✅ Preview, ✅ Development

#### Variable 2:

- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: Your Supabase anon key (starts with `sb_publishable_`)
- **Environment**: ✅ Production, ✅ Preview, ✅ Development

### 4. Save and Deploy

- Click **"Save"** for each variable
- Vercel will automatically redeploy

---

## 🔍 **Find Your Supabase Key**

If you need your Supabase credentials:

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy the **"anon public"** key

---

## ✅ **Verify Success**

1. Check **"Deployments"** tab
2. Look for **"✅ Ready"** status
3. Test your app at the deployment URL

---

## 🆘 **Still Failing?**

- Check build logs in **"Deployments"** tab
- Ensure variable names are exactly as shown
- Verify Supabase project is active

**Your app will work once these variables are added!** 🚀
