# Travels Feeder Dashboard Implementation Guide

## 1. Purpose and implementation status

This document specifies the admin dashboard that fits the current Travels Feeder website. It is an implementation contract for future work, not a description of existing admin or backend functionality.

**Current state:** the project is a React 19, TypeScript, Vite website. Public page content is imported from `src/data/travelData.ts` or defined inside page/components. `api/` is empty. There is no server entry point, route handler, database schema/client, authentication, authorization, or API client. The forms on the Contact page, home Contact section, Enquiry modal, and Transfers page only show local success states; they do not save submissions. The search controls are enquiry prefill controls, not a connected flight/hotel search service. Express and `tsx` are dependencies but are not wired to scripts or routes. `.env.example` only documents `GEMINI_API_KEY` and `APP_URL`; Gemini is not used by the current website.

Consequently, all `/api/v1/...` endpoints and database tables below are **proposed work**. Do not represent them as existing APIs. Before implementation, choose and provision a database and production hosting arrangement; neither is specified by the repository.

## 2. Scope and design constraints

Build a private content-management and enquiry-management dashboard for the existing public site. Keep the public URLs and customer workflows intact. Use one persistent source of truth after migration; do not silently keep serving hard-coded arrays when an API call fails.

In scope:

- Manage the existing travel content collections and company contact/trust details.
- Receive and manage customer enquiries submitted by the existing forms.
- Provide a small overview of enquiry workload and content counts.
- Authenticate staff and authorize each dashboard/API action on the server.

Out of scope until a real provider or business requirement exists:

- Airline/GDS flight search, fare availability, ticketing, hotel inventory, payment, booking/order management, dispatch/driver assignment, or reservations. No provider credentials or integration code exist.
- AI-generated content or a Gemini dashboard feature. The package and environment variable alone do not constitute an integration.
- General analytics, revenue reporting, marketing automation, customer accounts, public sign-up, media uploads, and editing every paragraph in every page. These are not supported by the current functionality.
- Editing the inline descriptive copy/options in components (for example, transfer feature blurbs, visa guide text, hero copy, and flight-search labels). Those are not standalone data collections today. Do not create duplicate editable versions in the dashboard.

## 3. Dashboard navigation and pages

Use a separate admin route shell under `/admin`; it must not render the public Navbar, Footer, or EnquiryModal. Preserve all existing public routes. Require authentication for every `/admin/*` page except the login page, and still enforce authorization independently on every API request.

### 3.1 Login: `/admin/login`

- Email and password inputs, submit, password visibility toggle, and an inline error area.
- No public account registration.
- Successful login creates the server session and redirects to the requested admin route or `/admin`.
- Expired/invalid session returns to login with a non-sensitive message.

### 3.2 Overview: `/admin`

Show only useful data backed by the enquiry/content APIs:

- Enquiries created today, unassigned/open enquiries, and counts by current status.
- Recent enquiries with name, service, destination, submitted time, and status for `admin` and `enquiry_operator`; row opens the enquiry detail. For `content_manager`, omit this panel and return only aggregate counts that contain no customer PII.
- Counts of published records in each content collection, with direct links to manage them.
- Quick actions: open enquiry inbox and create a package, destination, or other content item.

Do not show revenue, conversion, confirmed bookings, or live flight metrics; the project has no such records or integrations.

### 3.3 Enquiry inbox: `/admin/enquiries` and `/admin/enquiries/:id`

List controls:

- Search name, email, phone, destination, and message.
- Filter by status, service, source form, assigned staff member, and submitted-date range.
- Sort by submitted/updated date and paginate on the server.
- Clear filters and refresh results.
- Table columns: submitted date, customer, email/phone, service, destination/route, travel date, source, status, assignee.

Detail view:

- Show contact details; all normalized travel details; the original submitted message; source page/form; created/updated timestamps; status; assignee; and internal notes.
- Controls: change status, assign/reassign, edit internal notes, open email/telephone/WhatsApp links, and archive. Customer contact links must use stored values and safe URL encoding.
- Status workflow: `new`, `in_progress`, `waiting_on_customer`, `resolved`, `archived`. These are proposed operational statuses, not current application state. Preserve status history in the audit log.
- Creating a lead is public form submission, not a manual dashboard action. If a staff-created lead is later required, add a distinct form using the same validated create endpoint and set its source to `admin`.
- Do not hard-delete enquiries in the first release. Archive them to retain service history; any future permanent deletion must follow a defined retention policy and be audited.

### 3.4 Content manager: `/admin/content/:collection`

Provide a collection selector, searchable/filterable paginated list, create/edit form, publish toggle, ordering control, preview link, and archive/delete confirmation. Forms must expose the existing model fields below, use repeatable controls for arrays/nested lists, and validate required fields before sending. Preserve current IDs/slugs on edit because public URLs such as `/packages/:id` depend on stable package IDs. Create IDs server-side or validate unique submitted slugs.

| Collection | Existing data and form fields |
| --- | --- |
| `destinations` | `id`, `name`, `tagline`, `category` (`Culture`, `Hill Country`, `Beaches`, `Wildlife`, `Southern Coast`, `Adventure`), `description`, `image`, `highlights[]`, `bestTimeToVisit`, `idealDuration` |
| `tour-packages` | `id`, `name`, `duration`, `category` (`Sri Lanka`, `International`, `Adventure`, `Luxury`, `Family`, `Honeymoon`, `Wildlife`, `Cultural`, `Beach`), `priceStarting`, `destinations[]`, `image`, `summary`, `highlights[]`, `itinerary[]` (`day`, `title`, `desc`), `includes[]` |
| `international-destinations` | `id`, `name`, `region`, `image`, `tagline`, `highlights[]` |
| `services` | `id`, `num`, `title`, `shortDesc`, `fullDesc`, `image`, `link` |
| `vehicles` | `id`, `name`, `category`, `passengers`, `luggage`, `transmission`, `airConditioning`, `image`, `description` |
| `accommodation-categories` | `id`, `name`, `description`, `tier`, `image`, `typicalAmenities[]` |
| `gallery-items` | `id`, `title`, `category` (`Destinations`, `Wildlife`, `Beaches`, `Culture`, `Hotels`, `Tours`), `image`, `location` |
| `testimonials` | `id`, `quote`, `author`, `country`, `tripType` |
| `trust-points` | `title`, `desc` |

All collections also need dashboard metadata: `isPublished`, `sortOrder`, `createdAt`, and `updatedAt`. Keep the current array ordering via `sortOrder`, since it determines homepage and listing order. Public reads return only published items in this order. An unpublished item is a draft and is not visible publicly.

For images, initially use a URL/path field with validation and preview. Existing records mix imported local assets and remote image URLs. Migrate local imports to stable public asset paths. Do not offer file upload until storage, authorization, limits, and deployment persistence have been implemented.

### 3.5 Company settings: `/admin/settings/company`

Edit the existing `COMPANY_DETAILS` values: `name`, `tagline`, `foundedLocation`, `address`, phone entries (`display`, `raw`), email list, `website`, `accreditation`, `support`, and `whatsappNumber`. These values are rendered in the navbar, footer, contact pages, enquiry flows, and trust sections. Validate telephone/email formats and show a preview of generated `tel:`, `mailto:`, map, and WhatsApp links. `trust-points` are edited in the content manager, not duplicated here.

### 3.6 Staff accounts: `/admin/users`

Admin-only page. List email, role, active state, and last login; create/invite an account, change role, deactivate/reactivate, and revoke sessions. Do not show password hashes, session secrets, or reset tokens. There is no self-service registration in this project.

## 4. Roles and permissions

These roles are the minimal proposed roles for the above pages. Enforce them in API middleware, not only by hiding frontend controls.

| Capability | `admin` | `content_manager` | `enquiry_operator` |
| --- | --- | --- | --- |
| View overview and content | Yes | Yes | Yes (read-only content) |
| Create/edit/publish/reorder/archive content | Yes | Yes | No |
| Read enquiries and customer PII | Yes | Yes (no access by default) | Yes |
| Update enquiry status, assignee, internal notes; archive | Yes | No | Yes |
| Manage company settings | Yes | No | No |
| Create/deactivate users, change roles, revoke sessions | Yes | No | No |
| View audit history | Yes | No | No |

Create only the roles needed at deployment. A user may have one role initially. Deny by default; return `403` for authenticated users lacking permission and `401` for missing/expired authentication.

## 5. API contract

All paths below are proposed endpoints; none currently exist. Use same-origin `/api/v1` in browser code so the session cookie can be HttpOnly. JSON request/response bodies use `application/json`; list endpoints accept `page`, `pageSize`, `sort`, and filters and return `{ "items": [], "page": 1, "pageSize": 25, "total": 0 }`. Cap `pageSize` server-side. Use consistent errors: `{ "error": { "code": "VALIDATION_ERROR", "message": "Check the submitted fields.", "fieldErrors": {}, "requestId": "..." } }`.

### 5.1 Public content reads

The existing website should read published content from these endpoints:

| Public page/data | Endpoint |
| --- | --- |
| Company details and public trust details | `GET /api/v1/public/site` |
| Sri Lanka destinations | `GET /api/v1/public/destinations`; `GET /api/v1/public/destinations/:id` |
| Tour packages | `GET /api/v1/public/tour-packages`; `GET /api/v1/public/tour-packages/:id` |
| International destinations | `GET /api/v1/public/international-destinations` |
| Services | `GET /api/v1/public/services` |
| Vehicle options | `GET /api/v1/public/vehicles` |
| Accommodation categories | `GET /api/v1/public/accommodation-categories` |
| Gallery | `GET /api/v1/public/gallery-items` |
| Testimonials | `GET /api/v1/public/testimonials` |

All public reads exclude drafts/archived records and follow `sortOrder`. Return `404` for an unknown detail ID; do not substitute the first package as `PackageDetailPage` currently does. Keep public fields limited to data actually rendered by the website.

### 5.2 Public enquiry creation

`POST /api/v1/public/enquiries` is the only public write endpoint in this scope. It accepts unauthenticated, validated submissions from all existing forms and returns `201` with `{ "id": "...", "createdAt": "...", "status": "new" }`.

Common request fields:

```json
{
  "name": "Required string",
  "email": "Required valid email",
  "phone": "Required string",
  "service": "Service label from the current form",
  "destination": "Optional string",
  "travelDate": "Optional ISO date",
  "returnDate": "Optional ISO date",
  "passengers": "Optional current form value",
  "tripType": "Optional current form value",
  "notes": "Optional customer message/preferences",
  "source": "contact_page | home_contact | enquiry_modal | flight_search | transfer_request",
  "sourcePath": "Optional same-site path",
  "details": {}
}
```

`details` preserves form-specific values without forcing unrelated forms into fake shared columns. For `transfer_request`, include airport, arrival date/time if the form actually captures it, flight number, destination, and vehicle type. The Transfers page currently has an `arrivalTime` state variable but no visible input; do not fabricate a value. For flight/hotel/tour/transfer search-card enquiries, preserve the entered route, dates, trip type, cabin class, and passenger label. `FlightSearchCard` currently passes cabin class through `tripType`; normalize it in the client payload without losing the original selection. Never claim a flight search or booking has occurred.

Apply server-side length limits, validation, rate limiting, spam controls, and safe logging. Never send submitted message contents or PII to analytics/error logs by default.

### 5.3 Admin authentication and overview

| Action | Endpoint | Permission |
| --- | --- | --- |
| Sign in | `POST /api/v1/auth/login` | Public, rate limited |
| Sign out and revoke current session | `POST /api/v1/auth/logout` | Authenticated |
| Get current user and role | `GET /api/v1/auth/me` | Authenticated |
| Overview metrics and role-appropriate recent enquiries | `GET /api/v1/admin/dashboard` | Any dashboard role; response is permission-filtered |

### 5.4 Enquiry management

| Action | Endpoint | Permission |
| --- | --- | --- |
| Search/filter/paginate inbox | `GET /api/v1/admin/enquiries` | `admin`, `enquiry_operator` |
| Read one enquiry | `GET /api/v1/admin/enquiries/:id` | `admin`, `enquiry_operator` |
| Update status, assignee, or internal notes | `PATCH /api/v1/admin/enquiries/:id` | `admin`, `enquiry_operator` |
| Archive | `POST /api/v1/admin/enquiries/:id/archive` | `admin`, `enquiry_operator` |
| Restore archived enquiry | `POST /api/v1/admin/enquiries/:id/restore` | `admin`, `enquiry_operator` |

The patch body may contain only `status`, `assignedTo`, and `internalNotes`; reject changes to original customer-submitted fields so the intake record remains trustworthy. Record actor, timestamp, and changed fields in audit history.

### 5.5 Content, settings, accounts, and audit

Use these supported collection keys for generic admin CRUD: `destinations`, `tour-packages`, `international-destinations`, `services`, `vehicles`, `accommodation-categories`, `gallery-items`, and `testimonials`, plus `trust-points`.

| Action | Endpoint | Permission |
| --- | --- | --- |
| List and search collection | `GET /api/v1/admin/content/:collection` | `admin`, `content_manager` |
| Create record | `POST /api/v1/admin/content/:collection` | `admin`, `content_manager` |
| Read record | `GET /api/v1/admin/content/:collection/:id` | `admin`, `content_manager` |
| Update record | `PATCH /api/v1/admin/content/:collection/:id` | `admin`, `content_manager` |
| Archive/unpublish record | `DELETE /api/v1/admin/content/:collection/:id` | `admin`, `content_manager` |
| Publish/unpublish | `PATCH /api/v1/admin/content/:collection/:id` with `isPublished` | `admin`, `content_manager` |
| Save ordering | `PUT /api/v1/admin/content/:collection/order` with ordered IDs | `admin`, `content_manager` |
| Read/update company settings | `GET`, `PATCH /api/v1/admin/settings/company` | `admin` |
| List/create/update/deactivate staff | `GET /api/v1/admin/users`, `POST /api/v1/admin/users`, `PATCH /api/v1/admin/users/:id` | `admin` |
| Revoke a user's sessions | `POST /api/v1/admin/users/:id/revoke-sessions` | `admin` |
| Read audit events | `GET /api/v1/admin/audit-log` | `admin` |

`DELETE` is an archive/unpublish operation, not a physical database delete; retain stable IDs and audit the change. Reject unknown collection names, unknown fields, malformed nested itinerary items, duplicate IDs, and invalid sort orders. A record cannot be published unless all public-required fields are valid.

## 6. Data model

The repository has no database today. Use a relational database with migrations, transactions, unique constraints, and JSON columns for existing nested arrays where that is simpler than separate child tables. The following is the minimum logical schema; field naming may be adapted to the selected database, but the API behavior must remain stable.

### `admin_users` and `admin_sessions`

- `admin_users`: `id`, normalized unique `email`, `password_hash` or identity-provider subject, `role`, `is_active`, `created_at`, `updated_at`, `last_login_at`.
- `admin_sessions`: session ID/hash, user ID, expiry, created/revoked timestamps. Store only a session identifier in a Secure, HttpOnly, SameSite cookie; store session state server-side.
- No plaintext passwords, token secrets, or client-side localStorage auth tokens.

### `enquiries`

- `id`, `name`, `email`, `phone`, `service`, `destination`, `travel_date`, `return_date`, `passengers`, `trip_type`, `notes`, `source`, `source_path`, `details` (JSON), `status`, nullable `assigned_to` (staff ID), `internal_notes`, `created_at`, `updated_at`, nullable `archived_at`.
- Original user-submitted fields are immutable through the dashboard. `internal_notes`, assignment, and status are staff-managed.
- Index `created_at`, `status`, `service`, `assigned_to`, normalized email, and searchable contact/destination fields as appropriate for the selected database.

### Content tables

Create a typed table for each collection in section 3.4. Each table has `id` (stable string/slug primary key), typed scalar fields matching the current interface, `sort_order` (integer), `is_published` (boolean), `created_at`, `updated_at`, and optional `archived_at`. Store existing `string[]` properties and package `itinerary[]` in JSON/array columns or child tables with explicit ordering. Keep `TourPackage.destinations` as strings in the first migration: current values are free-form route labels and do not all correspond to `DESTINATIONS` IDs.

### `company_settings`, `trust_points`, and `audit_log`

- `company_settings`: singleton row containing the current `COMPANY_DETAILS` fields; arrays for phones/emails preserve their current ordering.
- `trust_points`: same content metadata and `title`/`desc` fields as the existing `TRUST_POINTS` entries.
- `audit_log`: `id`, actor user ID, action, resource type/ID, changed field names or safe before/after diff, timestamp, request ID. Do not record passwords, cookies, secrets, or full customer notes in the audit diff.

Seed initial data from the current TypeScript constants: 9 destinations, 6 tour packages, 9 international destinations, 8 services, 6 vehicle options, 6 accommodation categories, 12 gallery items, 4 testimonials, and 4 trust points. Make the seed idempotent and preserve current IDs and display order. Company details seed as one settings record.

## 7. Authentication, security, and authorization requirements

- Select either a trusted identity provider or implement server-side sessions with a maintained password-hashing algorithm such as Argon2id. Do not invent a client-only password gate.
- Require HTTPS in production; issue `Secure`, `HttpOnly`, `SameSite=Lax` (or stricter compatible) session cookies. Protect cookie-authenticated state-changing requests against CSRF. Validate `Origin`/CORS policy and do not use wildcard origins with credentials.
- Rate-limit login and public enquiry writes; use generic login errors to avoid revealing whether an email exists. Add password reset/invitation only through a verified email-delivery workflow; until configured, admin-created users must be provisioned securely out of band.
- Validate and authorize on every endpoint. Validate all inputs server-side, parameterize database queries, escape output, and sanitize/validate external image URLs and link schemes. Do not accept arbitrary `javascript:` links.
- Keep secrets only in server environment variables. Never expose database credentials, session secrets, or Gemini keys through `VITE_*` variables or browser bundles.
- Treat enquiry email, phone, notes, and travel dates as personal data. Limit access by role, avoid unnecessary exports, and define retention/deletion policy before production.
- Audit content mutations, staff/role changes, session revocations, and enquiry workflow changes. Do not log authentication secrets or unnecessary PII.

## 8. Loading, empty, error, and confirmation states

Every page and mutation needs explicit states; a blank panel is not a loading or error state.

- Initial list/detail load: skeleton rows or form placeholders; keep layout stable. Show a retry action on load failure.
- Empty collection: say there are no records and provide the permitted create action. Empty enquiry filters should offer “clear filters.”
- Save/publish/archive/reorder: disable duplicate submission, show progress on the initiating control, and update only after server confirmation. Prevent accidental navigation with unsaved form changes.
- Validation (`400`/`422`): preserve inputs and show field-level messages; focus the first invalid field.
- Session expired (`401`): clear client user state and return to login. Forbidden (`403`): show access denied without retry loops.
- Missing record (`404`): show a not-found state, not a fallback record. Conflict (`409`, such as duplicate ID or stale version): explain the conflict and offer reload/retry.
- Rate limit (`429`): show a retry-after message. Network/`5xx`: preserve form values, show a non-sensitive message and retry. For enquiry submission, do not show “received” until `201` is returned; guard against duplicate submissions with a request/idempotency key where supported.
- Confirm archive, publish/unpublish if the action changes public visibility, role/deactivation changes, and session revocation. Announce successful actions accessibly and leave keyboard focus in a predictable place.
- Do not optimistically display a successful content edit or enquiry status if the API rejected it.

## 9. Integration and migration sequence

1. Choose a production database, hosting model, session/auth approach, and migration strategy. Add migrations and an idempotent seed for the current content before removing the static source.
2. Implement the API under `api/` with runtime validation, database access, auth/session middleware, role checks, rate limits, error serialization, audit writes, and health checks. The current `package.json` has Express and `tsx`, but no API start/dev scripts. Add scripts and a local Vite `/api` proxy when implementing; run the API and Vite on separate local ports.
3. Implement and verify public read endpoints and admin CRUD. Keep `/api/v1` same-origin in production; configure the host/reverse proxy to send API paths to Express and serve the Vite build for page routes. No current production API routing is configured.
4. Add a typed frontend API client with shared error handling. Replace `travelData.ts` runtime imports with API data in the pages/components that use each collection. The static values should be migration seed data, not an independent fallback that can go stale.
5. Wire all existing enquiry forms to `POST /api/v1/public/enquiries`: EnquiryModal, home ContactPreview, ContactPage, TransfersPage, and the search-card prefill flow. Normalize fields consistently, retain form-specific fields under `details`, and show success only after persistence. Keep WhatsApp/call/email CTAs as contact links; they are not substitutes for recording the form submission.
6. Add the `/admin` route shell, route guard, screens, and permission-aware controls. Add the admin UI only after the server-side role checks are in place.
7. Test migrated public page content, all form sources, CRUD/publish behavior, and deployment routing before deleting or ceasing imports from the static arrays.

## 10. Acceptance checks

- Unauthenticated visitors can read published public content and submit a valid enquiry, but cannot call any admin endpoint successfully.
- Invalid form submissions receive field errors; successful submissions persist once, return an ID, and appear in the inbox. Each current form source and its applicable fields are represented accurately.
- Staff roles can only access the operations allowed in section 4; direct API calls cannot bypass the UI permission model.
- CRUD, publish/unpublish, archive/restore where applicable, ordering, filtering, pagination, and duplicate-ID handling work for every supported content collection.
- Public pages render migrated data in the original intended order; drafts never appear. Package detail URLs resolve by stable ID and missing IDs show not found.
- Contact details update consistently across all pages consuming company settings. No separate stale copy remains in runtime data.
- Loading, empty, validation, `401`, `403`, `404`, `409`, `429`, network, and server-error states are verified for reads and writes.
- Session expiry, CSRF protection, rate limits, audit events, and safe handling of customer PII are tested.
- Production build serves `/admin` page routes and `/api/v1` correctly; secrets and database access remain server-side.

## 11. Current content ownership map

The homepage composes hero, search, trust, destination/package/international-destination previews, services, safari, accommodation, testimonials, gallery, contact CTA, and contact form sections. Dedicated public routes cover about, flights, packages and package detail, destinations, services, accommodation, safari, car rental, transfers, visa, gallery, testimonials, and contact. Most data-driven sections import the shared constants in `src/data/travelData.ts`; some page prose and options are inline in their components and are intentionally outside the initial dashboard CMS scope.

Existing interaction mappings:

- Package quote and itinerary buttons, destination/service/safari/visa CTAs, navbar CTA, and enquiry modal open the shared EnquiryModal with prefills.
- Home ContactPreview and ContactPage each collect contact and travel enquiry information independently.
- TransfersPage collects airport, arrival date, flight number, destination, vehicle type, and customer contact information. Its current submit is local only.
- FlightSearchCard has Flights, Hotels, Tours, and Transfers tabs; submission prefills an enquiry rather than querying inventory. Its “Live IATA GDS Connected Rates” display has no corresponding integration in the repository.

All four submission surfaces must converge on the same enquiry persistence model while preserving source and form-specific details; do not create separate dashboard modules or databases for each form.