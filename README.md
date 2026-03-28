# Glowify

Glowify is a modern cosmetics e-commerce platform built with Next.js 16. It features a unique AI-powered color matching tool that helps users find products that match their skin tone or desired palette.

## 🌟 Features

- **AI-Powered Product Matching**: Upload a photo to find makeup products that match the detected colors.
- **Product Catalog**: Browse lipsticks, foundations, and serums with category filtering.
- **Modern UI/UX**: Responsive design using Tailwind CSS v4 and Shadcn UI components.
- **User Authentication**: Secure sign-up and login via Supabase.
- **Checkout Process**: Integrated Stripe payment processing.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend & Auth**: [Supabase](https://supabase.com/)
- **Payments**: [Stripe](https://stripe.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ahmed7991/glowify.git
   cd glowify
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up Environment Variables**

   Copy the example environment file to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your credentials:
   - **Supabase**: Create a new project at [supabase.com](https://supabase.com) to get your URL and Keys.
   - **Stripe**: Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/).

4. **Database Setup**

   - Log in to your Supabase Dashboard.
   - Go to the **SQL Editor**.
   - Copy the contents of `supabase-schema.sql` from this repository.
   - Paste and run the script in the SQL Editor to create the necessary tables, policies, and triggers.

5. **Run the development server**

   ```bash
   npm run dev
   # or
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤖 AI Service Integration

The AI image search feature currently uses a **mock service** (`src/lib/ai-service.ts`) for demonstration purposes. It simulates image analysis and returns products based on a randomized color extraction logic.

### Swapping for Real AI (e.g., Replicate)

To use a real AI model for image analysis:

1. Obtain an API token from [Replicate](https://replicate.com/).
2. Add the token to your `.env.local`:
   ```env
   REPLICATE_API_TOKEN=r8_...
   ```
3. Open `src/lib/ai-service.ts`.
4. Replace the `analyzeImage` function with the real API implementation provided in the file's comments.
5. Ensure you have the necessary dependencies installed (e.g., for base64 conversion if needed).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
