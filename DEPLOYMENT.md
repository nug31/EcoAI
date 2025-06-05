# 🚀 Deployment Guide - EcoAI on Netlify

This guide will help you deploy the EcoAI Smart Waste Management App to Netlify.

## 📋 Prerequisites

Before deploying, make sure you have:
- ✅ GitHub repository with the code (already done!)
- ✅ Netlify account (free tier available)
- ✅ Convex account and deployment
- ✅ OpenAI API key (optional, for AI features)

## 🌐 Method 1: Deploy via Netlify Dashboard (Recommended)

### Step 1: Connect to Netlify
1. Go to [Netlify](https://netlify.com) and sign up/login
2. Click **"New site from Git"**
3. Choose **"GitHub"** as your Git provider
4. Authorize Netlify to access your GitHub account
5. Select the **"EcoAI"** repository

### Step 2: Configure Build Settings
Netlify should auto-detect the settings, but verify:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `18` (set in netlify.toml)

### Step 3: Set Environment Variables
In Netlify dashboard, go to **Site settings > Environment variables** and add:

```
VITE_CONVEX_URL=https://your-convex-deployment.convex.cloud
OPENAI_API_KEY=your-openai-api-key-here
NODE_ENV=production
```

### Step 4: Deploy
1. Click **"Deploy site"**
2. Wait for the build to complete (usually 2-3 minutes)
3. Your app will be live at `https://random-name.netlify.app`

## 🔧 Method 2: Deploy via Netlify CLI

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify
```bash
netlify login
```

### Step 3: Initialize Site
```bash
cd your-project-directory
netlify init
```

### Step 4: Set Environment Variables
```bash
netlify env:set VITE_CONVEX_URL "https://your-convex-deployment.convex.cloud"
netlify env:set OPENAI_API_KEY "your-openai-api-key"
netlify env:set NODE_ENV "production"
```

### Step 5: Deploy
```bash
npm run build
netlify deploy --prod --dir=dist
```

## ⚙️ Convex Configuration for Production

### Step 1: Set Up Production Deployment
```bash
npx convex deploy --cmd 'npm run build'
```

### Step 2: Configure Authentication
In your Convex dashboard:
1. Go to **Settings > Authentication**
2. Add your Netlify domain to **Allowed Origins**:
   - `https://your-site-name.netlify.app`
   - `https://your-custom-domain.com` (if using custom domain)

### Step 3: Update Environment Variables
Make sure your `.env.local` (for development) and Netlify environment variables match your Convex production deployment URL.

## 🌍 Custom Domain Setup (Optional)

### Step 1: Add Custom Domain
1. In Netlify dashboard, go to **Site settings > Domain management**
2. Click **"Add custom domain"**
3. Enter your domain name

### Step 2: Configure DNS
Point your domain's DNS to Netlify:
- **A Record**: `75.2.60.5`
- **AAAA Record**: `2600:1f14:e22:d200::1`
- Or use **CNAME**: `your-site-name.netlify.app`

### Step 3: Enable HTTPS
Netlify automatically provides SSL certificates via Let's Encrypt.

## 🔍 Troubleshooting

### Build Fails
- Check Node.js version (should be 18+)
- Verify all dependencies are in package.json
- Check build logs for specific errors

### Environment Variables Not Working
- Ensure variables start with `VITE_` for frontend access
- Check variable names match exactly
- Redeploy after adding new variables

### Convex Connection Issues
- Verify CONVEX_URL is correct
- Check Convex deployment status
- Ensure authentication domains are configured

### 404 Errors on Refresh
- The `netlify.toml` file should handle this with redirects
- Verify the redirect rule is in place

## 📊 Performance Optimization

### Enable Build Optimizations
The `netlify.toml` file includes:
- Caching headers for static assets
- Security headers
- Redirect rules for SPA routing

### Monitor Performance
- Use Netlify Analytics (paid feature)
- Monitor Core Web Vitals
- Check Lighthouse scores

## 🔄 Continuous Deployment

Once connected to GitHub:
- ✅ Automatic deployments on `main` branch pushes
- ✅ Deploy previews for pull requests
- ✅ Branch deployments for feature branches

## 📱 Testing Your Deployment

After deployment, test:
1. **Authentication**: Sign up/login functionality
2. **Language Toggle**: Switch between English/Indonesian
3. **Waste Scanner**: Upload and scan waste images
4. **Recycling Tips**: Browse and filter tips
5. **Leaderboard**: Check user rankings
6. **Rewards**: View available rewards
7. **Mobile Responsiveness**: Test on different devices

## 🎉 Success!

Your EcoAI app should now be live! Share the URL and start helping people manage waste more sustainably.

### Next Steps
- Set up monitoring and analytics
- Configure custom domain
- Set up staging environment
- Add more features and improvements

---

**Need help?** Check the [Netlify docs](https://docs.netlify.com/) or [Convex docs](https://docs.convex.dev/) for more information.
