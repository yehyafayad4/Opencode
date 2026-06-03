# FreshFit AI

An AI-powered health and wellness companion that helps users optimize their nutrition, reduce food waste, and track fitness goals through intelligent meal generation and habit tracking.

## Overview

FreshFit AI combines nutrition tracking, fridge inventory management, AI-powered meal generation, and fitness tracking into a seamless mobile experience. The app helps users make healthier choices while minimizing food waste through smart expiry tracking and ingredient-based meal suggestions.

## Phase 1 Features (MVP)

- **Authentication**: Email/password login, signup, and password reset
- **Home Dashboard**: Overview of daily metrics, expiring food, and AI suggestions
- **Fridge Management**: Add/view/remove food items with expiry tracking
- **AI Meal Generator**: Generate meal suggestions based on available ingredients
- **Meal Details**: Nutritional information and preparation instructions
- **Calorie Tracking**: Log meals and track progress toward goals
- **Habit Tracking**: Create and monitor daily/weekly habits
- **Grocery List**: Generate shopping lists from meal plans and expiring food
- **Insights Dashboard**: View weekly/monthly trends and food waste reduction metrics
- **Connected Apps**: Placeholder for future health and fitness integrations
- **Settings/Profile**: User preferences and account management

## Technical Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: Zustand
- **Navigation**: React Native Bottom Tab Navigator
- **UI Components**: Custom reusable components with dark mode-first design
- **Data**: Mock data services for MVP (no real backend in Phase 1)

## Project Structure

```
src/
├── assets/              # Images, icons, animations, fonts
├── components/          # Reusable UI components
│   └── ui/              # Basic UI elements (buttons, cards, inputs, etc.)
├── navigation/          # App navigation configuration
├── screens/             # Main screen components
│   ├── home/            # Home dashboard
│   ├── fridge/          # Fridge inventory management
│   ├── meals/           # AI meal generator and meal details
│   ├── track/           # Calorie and habit tracking
│   └── profile/         # User profile, settings, connected apps
├── services/            # Service layer (mock implementations for MVP)
├── store/               # Zustand state management slices
├── types/               # TypeScript interfaces and types
├── themes/              # Theme configuration (dark/light)
├── utils/               # Utility functions and helpers
└── mockData.ts          # Mock data for MVP
```

## Design Principles

- **Dark Mode First**: Premium dark interface with vibrant accent colors
- **Glassmorphism**: Semi-transparent cards with subtle blur effects
- **Modern Typography**: Clean, readable text with proper hierarchy
- **Consistent Spacing**: 8px grid system for balanced layouts
- **Micro-interactions**: Animated feedback for user actions
- **Platform Adaptive**: Works on both iOS and Android

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/freshfit-ai.git
   cd freshfit-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on your preferred platform:
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Press `w` for web browser
   - Scan QR code with Expo Go app on physical device

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint for code quality
- `npm run type-check` - Run TypeScript type checking

## Phase 2 Planned Features

- Real Supabase backend integration
- Actual AI-powered meal generation
- Wearable device integrations (Apple Health, Google Fit, etc.)
- Food image recognition (barcode and visual)
- Social sharing and community features
- Advanced analytics and export capabilities
- Offline data persistence
- Push notifications and reminders

## License

This project is proprietary and confidential. All rights reserved.

## Contact

For questions or support, please contact the development team.