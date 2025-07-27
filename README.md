# V2S B2B Commerce Platform

V2S is a B2B web platform connecting Indian street food vendors and suppliers. Built with React, Vite, TailwindCSS, and Supabase for authentication and data storage.

## Features

- Vendor and Supplier authentication (sign up/sign in) with Supabase
- Vendor and Supplier dashboards with search, stats, and order management
- Profile management for both user types
- Product and order listing, testimonials, and quick actions
- Responsive, modern UI with TailwindCSS

## Tech Stack

- React 19 + Vite
- TailwindCSS 4
- Supabase (auth, database)
- Lucide Icons, Heroicons
- ESLint for code quality

## Project Structure

```
src/
  App.jsx                # Main app and routes
  supabaseClient.js      # Supabase client setup
  lib/
    auth.js              # Auth service (sign in/up, profile, etc)
  pages/
    Home.jsx             # Landing page
    VendorAuth.jsx       # Vendor sign in/up
    SupplierAuth.jsx     # Supplier sign in/up
    VendorDashboard.jsx  # Vendor dashboard
    SupplierDashboard.jsx# Supplier dashboard
    ...
  components/           # Reusable UI components
  styles/               # Tailwind and custom CSS
public/
  index.html            # Main HTML
```

## Setup & Development

1. **Clone the repo:**
   ```sh
   git clone https://github.com/Ashutosh054-cs/b2b-website
   cd b2b-website
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure Supabase:**

   - Create a `.env` file in the root:
     ```env
     VITE_SUPABASE_URL=your-supabase-url
     VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```
   - Set up tables: `profiles`, `vendors`, `suppliers`, etc. (see `src/lib/auth.js` for schema reference)

4. **Run the app:**
   ```sh
   npm run dev
   ```

## Supabase Integration

- All authentication and profile logic is in `src/lib/auth.js` using the Supabase JS client.
- User sign up creates a profile in the appropriate table (`vendors` or `suppliers`).
- Auth state is managed via Supabase's session and user APIs.

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run lint` — Lint code with ESLint
- `npm run preview` — Preview production build

## Contributing

Pull requests are welcome! Please open an issue first to discuss major changes.

## Authors & Credits

- **Frontend Developer & Designer:** [Ashutosh054-cs](https://github.com/Ashutosh054-cs)
- **Backend Developer:** [SKetU-l](https://github.com/SKetU-l)
