<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/04641220-032d-48a1-bab3-8667f27cf9bd

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies with `npm install`.
2. Make sure your local PostgreSQL Windows service is running and create a database named `travels_feeder` in pgAdmin.
3. Copy `.env.example` to `.env` and replace the sample username/password in `DATABASE_URL` with your local PostgreSQL credentials.
4. Create the schema and seed the current travel catalog with `npm run db:migrate`.
5. Start the frontend and API together with `npm run dev` and open `http://localhost:3000`.

In PowerShell, if port 3000 is already occupied, run `$env:PORT=3001; npm run dev`.

The API returns JSON in a `{ data }` envelope. `GET /api/content` provides the
complete catalog. `GET /api/destinations`, `GET /api/destinations/:id`,
`GET /api/packages`, and `GET /api/packages/:id` provide catalog views.
`POST /api/enquiries` stores tour, flight, accommodation, visa, and general
contact enquiries. `POST /api/transfers` stores airport transfer requests.
`GET /api/health` checks both the API and its PostgreSQL connection. Requests
are validated, rate-limited, assigned a request ID, and logged centrally.

The public API does not expose enquiry or transfer records. Administrative read
and update endpoints require a separate authenticated admin workflow; the
current frontend does not include one.

For production, run `npm run build` and start the API with
`NODE_ENV=production npm start`. Set a strong production database password and
provide its connection string through `DATABASE_URL`.
