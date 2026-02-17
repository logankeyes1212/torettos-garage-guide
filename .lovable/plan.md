

# Torettos Toolbox — AI Classic Car Repair & Marketplace

## Overview
A dark, aggressive-themed web app for classic car enthusiasts (pre-2000 vehicles) to get AI-powered repair guidance, find videos, and buy/sell parts and vehicles. Powered by Perplexity AI for intelligent search and Lovable Cloud for backend.

---

## Page 1: Landing Page / Home
- **Intro Animation**: 4-second cinematic splash screen featuring Dominic Toretto's 1970 Dodge Charger doing a burnout (animated with CSS/video overlay), fading into the main page
- **Dynamic Background**: Each page load shows a different classic car award-winner image as the hero background (rotating gallery of 8-10 stunning classic cars)
- **Hero Section**: "Torettos Toolbox" branding with bold, aggressive typography — tagline like *"Your Ride. Your Rules. AI-Powered Repairs."*
- **Vehicle Selector**: 4 cascading dropdowns:
  - **Year** (1920–1999)
  - **Manufacturer** (filtered by year — e.g., no Tesla in 1950)
  - **Model** (filtered by manufacturer + year)
  - **Trim** (filtered by model, includes "Unknown" option)
  - Data sourced from NHTSA Vehicle API for comprehensive coverage
- **Search Bar**: Always visible below vehicle selector
  - Enter your repair issue (e.g., "engine knocking at idle")
  - If no vehicle selected, shows error toast: "Please select your vehicle first"
  - Results powered by Perplexity AI, returning:
    - **AI repair guide** with step-by-step instructions
    - **Forum discussions** from car communities with similar issues
    - **YouTube videos** on how to fix the issue (embedded links)
- **Quick navigation** to Marketplace and other sections

## Page 2: Marketplace (Buy/Sell Parts & Vehicles)
- **Listings feed** showing parts and vehicles for sale
- **Create Listing** (requires login):
  - Title, description, photos, price, condition
  - Vehicle compatibility (using the same cascading dropdowns)
  - Category: Part / Full Vehicle
  - Seller contact info (phone/email — no payment processing)
- **Search & Filter**: By vehicle, category, price range, condition
- **Listing detail page** with seller contact info and vehicle details

## Page 3: Authentication
- **Sign up / Login** pages with email authentication
- User profiles to manage listings and save vehicles
- Dark-themed auth forms matching the site aesthetic

## Design System
- **Dark theme** with deep blacks/charcoal backgrounds
- **Red/orange accent colors** (Fast & Furious vibe — fire, exhaust glow)
- **Bold, industrial typography**
- **Subtle car-themed UI elements** (gear icons, speed lines, chrome accents)
- **Smooth animations** on hover states and transitions

## Tech Stack
- **Frontend**: React + Tailwind CSS + TypeScript
- **Backend**: Lovable Cloud (Supabase) — database, auth, edge functions
- **AI Search**: Perplexity AI connector for repair guidance
- **Vehicle Data**: NHTSA Vehicle API for year/make/model/trim data
- **Storage**: Supabase Storage for listing photos

