# Royale Rent — Marketplace Frontend

Production-ready React marketplace for Indian wedding fashion rentals (“Airbnb for couture”).

## Quick start

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` (included by default with mock API enabled).

## Demo accounts

| Role | Email | Password |
|------|-------|----------|
| Customer | customer@royalerent.com | password123 |
| Dress owner | owner@royalerent.com | password123 |
| Admin | admin@royalerent.com | password123 |

## Routes

| Path | Access | Page |
|------|--------|------|
| `/` | Public | Home (landing) |
| `/explore` | Public | Explore dresses |
| `/dress/:id` | Public | Dress details (`/dresses/:id` redirects here) |
| `/login` | Guest | Login |
| `/signup` | Guest | Signup |
| `/dashboard` | Auth | Dashboard |
| `/wishlist` | Auth | Wishlist |
| `/bookings` | Auth | Booking requests |
| `/settings` | Auth | Profile settings |
| `/my-listings` | Owner, Admin | My listings |
| `/upload-dress` | Owner, Admin | Upload dress (4-step) |
| `/admin` | Admin | Admin panel |
| `*` | Public | 404 |

## Architecture

```
src/
├── api/              Axios instance, endpoints, mock API
├── services/         Backend-ready service layer
├── context/          Auth, Dress, Wishlist, Booking
├── routes/           Protected, Role, Guest guards
├── layouts/          Dashboard layout + sidebar
├── pages/            All route pages
├── components/       UI, dress, dashboard, landing
├── hooks/            useDebounce, useScrollPosition, useInView
├── data/mock/        JSON-ready mock data
├── animations/       Framer Motion variants
└── utils/            constants, storage, validation
```

## Backend integration

1. Set `VITE_USE_MOCK_API=false`
2. Set `VITE_API_BASE_URL` to your API
3. Implement matching routes in `api/endpoints.js`
4. Services already call Axios when mock is disabled

JWT tokens are sent via `Authorization: Bearer` (see `api/axios.js`).

For Firebase, set `VITE_AUTH_PROVIDER=firebase` and extend `services/authService.js`.

## Scripts

- `npm run dev` — development
- `npm run build` — production build
- `npm run preview` — preview build
