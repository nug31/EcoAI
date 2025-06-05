# 🌱 EcoAI - Smart Waste Management App

A modern, AI-powered waste management application built with React, TypeScript, and Convex. This app helps users manage waste responsibly through AI-powered waste scanning, recycling tips, gamification, and community features.

## ✨ Features

### 🔍 AI-Powered Waste Scanner
- **Smart Recognition**: Upload photos of waste items for AI-powered identification
- **Instant Classification**: Automatically categorizes waste into plastic, paper, glass, organic, electronic, and metal
- **Disposal Guidance**: Provides specific disposal instructions for each waste type
- **Points System**: Earn points for scanning and properly disposing of waste

### 💡 Recycling Tips & DIY Projects
- **Comprehensive Guides**: Step-by-step recycling and upcycling tutorials
- **Difficulty Levels**: Projects categorized as easy, medium, or hard
- **Material Lists**: Complete lists of required materials for each project
- **Point Rewards**: Earn points for completing recycling projects

### 🏆 Gamification & Leaderboard
- **Point System**: Earn points for various eco-friendly activities
- **Global Leaderboard**: Compete with other users worldwide
- **Achievement Tracking**: Monitor your environmental impact
- **Progress Visualization**: Beautiful charts showing your eco-journey

### 🎁 Rewards System
- **Eco-Friendly Rewards**: Redeem points for sustainable products
- **Donation Options**: Support environmental causes with your points
- **Local Partnerships**: Discounts at eco-friendly local businesses
- **Voucher System**: Get discounts on organic groceries and green products

### 🌍 Multilingual Support
- **Indonesian (Bahasa Indonesia)**: Full localization for Indonesian users
- **English**: Complete English language support
- **Easy Language Toggle**: Switch between languages with one click
- **Cultural Adaptation**: Content adapted for local environmental practices

## 🚀 Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Convex (Real-time database and serverless functions)
- **Authentication**: Convex Auth with multiple providers
- **Styling**: Tailwind CSS + Custom Components
- **AI Integration**: OpenAI GPT for waste recognition and tips
- **State Management**: React Context + Convex Queries
- **Build Tool**: Vite for fast development and building

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Convex account (free tier available)

### 1. Clone the Repository
```bash
git clone https://github.com/nug31/EcoAI.git
cd EcoAI
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Convex
```bash
# Install Convex CLI globally
npm install -g convex

# Initialize Convex (follow the prompts)
npx convex dev
```

### 4. Environment Variables
Create a `.env.local` file in the root directory:
```env
VITE_CONVEX_URL=your_convex_deployment_url
OPENAI_API_KEY=your_openai_api_key
```

### 5. Run the Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🚀 Deployment

### Deploy to Netlify (Recommended)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/nug31/EcoAI)

1. **Click the "Deploy to Netlify" button above**
2. **Connect your GitHub account** and authorize Netlify
3. **Configure environment variables** in Netlify dashboard:
   - `VITE_CONVEX_URL`: Your Convex deployment URL
   - `OPENAI_API_KEY`: Your OpenAI API key (optional)
4. **Deploy!** Your app will be live in minutes

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Other Deployment Options
- **Vercel**: Import from GitHub and set environment variables
- **Railway**: Connect GitHub repo and configure build settings
- **Heroku**: Use the Node.js buildpack with build command `npm run build`

## 🔧 Configuration

### Convex Setup
1. Create a free account at [Convex](https://convex.dev)
2. Run `npx convex dev` to set up your deployment
3. The Convex URL will be automatically added to `.env.local`

### OpenAI Integration
1. Get an API key from [OpenAI](https://platform.openai.com)
2. Add it to your `.env.local` file
3. The AI features will automatically work

### Authentication Providers
Configure authentication providers in `convex/auth.config.ts`:
- Google OAuth
- GitHub OAuth
- Email/Password
- Anonymous authentication

## 📚 Usage Guide

### For Users
1. **Sign Up**: Create an account using email or social login
2. **Scan Waste**: Use the camera to scan waste items
3. **Learn**: Browse recycling tips and DIY projects
4. **Earn Points**: Complete activities to earn eco-points
5. **Redeem Rewards**: Use points for eco-friendly rewards
6. **Compete**: Check your ranking on the leaderboard

### For Developers
1. **Database Schema**: Check `convex/schema.ts` for data models
2. **API Functions**: Backend logic in `convex/` directory
3. **Components**: Reusable UI components in `src/components/`
4. **Contexts**: Global state management in `src/contexts/`
5. **Localization**: Translation files in `src/contexts/LanguageContext.tsx`

## 🌐 Localization

The app supports multiple languages with easy extensibility:

```typescript
// Add new language in LanguageContext.tsx
const translations = {
  en: { /* English translations */ },
  id: { /* Indonesian translations */ },
  // Add your language here
  es: { /* Spanish translations */ }
};
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit Your Changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Convex** for the amazing real-time database platform
- **OpenAI** for AI-powered waste recognition
- **Tailwind CSS** for beautiful, responsive styling
- **React Team** for the incredible frontend framework
- **Environmental Organizations** for inspiration and guidance

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/nug31/EcoAI/issues)
- **Discussions**: [GitHub Discussions](https://github.com/nug31/EcoAI/discussions)
- **Email**: support@ecoai.app

## 🌟 Star the Project

If you find this project helpful, please consider giving it a star ⭐ on GitHub!

---

**Made with 💚 for a sustainable future**
