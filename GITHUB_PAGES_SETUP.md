# Custom Domain Setup for GitHub Pages

## Current Configuration ✅

Your portfolio is configured to work with the custom domain `usaidahmad.me`. The repository has been set up correctly:

1. ✅ **CNAME File**: Located in `/public/CNAME` with domain `usaidahmad.me`
2. ✅ **Build Configuration**: Vite correctly copies CNAME to `dist/` folder
3. ✅ **GitHub Actions**: Automatic deployment workflow added
4. ✅ **Base Path**: Set to `/` in `vite.config.js` (correct for custom domains)

## What You Need to Do

### 1. Configure DNS Settings

You need to configure your DNS records for `usaidahmad.me` to point to GitHub Pages:

**Option A: Using A Records (recommended for apex domain)**
Add these A records in your DNS provider:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**Option B: Using CNAME (if using www subdomain)**
If you want `www.usaidahmad.me`, add:
```
CNAME: www -> usaid9.github.io
```

### 2. Configure GitHub Pages Settings

1. Go to your repository: https://github.com/usaid9/MYPORTFOLIO
2. Click on **Settings** → **Pages**
3. Under **Build and deployment**:
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `gh-pages` and `/root` folder
4. Under **Custom domain**:
   - Enter: `usaidahmad.me`
   - Click **Save**
   - Wait for the DNS check to complete (can take a few minutes)
   - Once verified, check **Enforce HTTPS**

### 3. Deploy Your Site

The GitHub Actions workflow will automatically deploy your site when you push to the `main` branch. You can also manually trigger it:

1. Go to **Actions** tab in your repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**

Or deploy manually using:
```bash
npm install
npm run deploy
```

### 4. Verify Deployment

After deployment and DNS propagation (typically within a few hours, though it may take up to 24-48 hours in rare cases), your site should be accessible at:
- https://usaidahmad.me
- https://usaid9.github.io/MYPORTFOLIO (fallback URL)

## Troubleshooting

### DNS Not Propagating
- Use [dnschecker.org](https://dnschecker.org) to check DNS propagation globally
- DNS changes typically propagate within minutes to a few hours, though it may take up to 24-48 hours in rare cases

### 404 Error
- Ensure GitHub Pages is set to use `gh-pages` branch
- Check that the CNAME file exists in the gh-pages branch
- Verify the custom domain is set in repository settings

### HTTPS Not Working
- Wait for GitHub to provision SSL certificate (can take a few minutes after DNS verification)
- Ensure "Enforce HTTPS" is checked in Pages settings

### Site Not Updating
- Check the **Actions** tab for deployment status
- Ensure the workflow completed successfully
- Clear your browser cache

## Repository Structure

```
MYPORTFOLIO/
├── .github/
│   └── workflows/
│       └── deploy.yml        # Automatic deployment workflow
├── public/
│   └── CNAME                 # Custom domain configuration
├── src/
│   └── ...                   # Source code
├── package.json              # Contains deploy script
└── vite.config.js           # Base path set to "/"
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```
