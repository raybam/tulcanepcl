# TULCAN ENERGY — FULL-STACK WEBSITE BUILD PROMPT
## Frontend + Backend API + Database + Admin CMS

---

# 1. ROLE

You are a senior full-stack software architect, Next.js engineer, backend/API engineer, database architect, security engineer, DevOps engineer and UI implementation specialist.

Build the production-ready website for:

**Tulcan Energy Exploration and Production Company Limited**


The UI/design has already been created and has been linked to you in the AI/design environment.

Your job is to take the existing approved UI and turn it into a complete, functional, production-ready web application consisting of:

1. Public frontend website
2. Backend API
3. PostgreSQL database
4. Admin/CMS dashboard
5. Authentication and authorization
6. Media/file management
7. Content management
8. News management
9. Asset/project management
10. Leadership management
11. Careers/job management
12. Contact/enquiry management
13. Resources/document management
14. SEO management
15. Security controls
16. Logging/auditing
17. Deployment-ready infrastructure

The existing UI is the source of truth for the visual design.

DO NOT redesign the UI unnecessarily.

DO NOT replace the approved design with generic dashboard templates, Bootstrap layouts, default component libraries or a different visual language.

Implement the UI accurately and make it functional.

---

# 2. CRITICAL SOURCE-OF-TRUTH RULE

There are three sources of truth:

### SOURCE 1 — EXISTING UI

The linked UI is the primary source for:

- layout
- visual hierarchy
- typography
- colours
- spacing
- components
- responsive behaviour
- interactions
- animations
- page structure

### SOURCE 2 — CURRENT TULCAN WEBSITE

Use the current website as a content/reference source:

`https://tulcanepc.com/`

Extract and preserve relevant factual information.

### SOURCE 3 — TULCAN COMPANY PROFILE

Use the supplied company profile document as the authoritative source for company information, asset information, leadership, capabilities, milestones, HSE, ESG, CSR, projects and other corporate content.

DO NOT invent facts.

If information is missing, create an appropriate CMS field or placeholder rather than fabricating content.

If two sources conflict, flag the conflict instead of silently choosing one.

---

# 3. PRIMARY OBJECTIVE

Build a website that presents Tulcan as:

> A credible, ambitious, technically capable Nigerian upstream exploration and production company.

The final application must feel:

- enterprise-grade
- premium
- international
- technically credible
- modern
- fast
- secure
- responsive
- maintainable
- SEO-friendly
- CMS-driven

It must not feel like:

- a static HTML template
- a WordPress clone
- a generic oil-and-gas template
- a startup landing page
- a brochure converted into HTML
- a dashboard-heavy application

---

# 4. RECOMMENDED ARCHITECTURE

Use a monorepo architecture.

Recommended:

```text
tulcan-energy/
│
├── apps/
│   ├── web/
│   │   └── Next.js public website
│   │
│   ├── api/
│   │   └── NestJS backend API
│   │
│   └── admin/
│       └── Next.js admin/CMS dashboard
│
├── packages/
│   ├── ui/
│   ├── types/
│   ├── validation/
│   ├── config/
│   └── utils/
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── docs/
│
├── .env.example
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

Use a package manager appropriate for a monorepo, preferably:

**pnpm**

Use Turborepo if it provides a meaningful development/build advantage.

---

# 5. FRONTEND STACK

Use:

- Next.js
- React
- TypeScript
- Tailwind CSS
- modern CSS where necessary
- accessible semantic HTML
- React Server Components where appropriate
- Server Actions where appropriate
- TanStack Query where client-side API state management is genuinely required
- Zod for client-side validation
- Framer Motion/Motion for controlled animation
- Lucide React or an appropriate lightweight icon library
- next/image
- next/font

Use the latest stable versions compatible with one another.

Do not blindly use experimental packages.

---

# 6. BACKEND STACK

Use:

- Node.js
- NestJS
- TypeScript
- REST API
- Prisma ORM
- PostgreSQL
- Zod/class-validator as appropriate
- JWT authentication
- refresh-token rotation
- RBAC
- Swagger/OpenAPI
- structured logging
- rate limiting
- secure HTTP headers
- CORS configuration
- centralized exception handling

The backend must be independently deployable from the frontend.

---

# 7. DATABASE

Use:

**Neon PostgreSQL**

Use Prisma ORM.

Database requirements:

- relational design
- normalized schema
- foreign keys
- indexes
- unique constraints
- timestamps
- soft deletion where appropriate
- migration support
- seed data
- audit records

Never store important relational content as arbitrary JSON when a proper relational structure is more appropriate.

JSON fields may be used selectively for flexible metadata.

---

# 8. FILE AND MEDIA STORAGE

Do not store large images, PDFs, CVs or videos directly in PostgreSQL.

Use object storage.

Recommended architecture:

- Cloudinary for optimized public website images/video
- S3-compatible storage for private documents where appropriate

The implementation should make the provider replaceable.

Media records in the database should contain:

```text
id
filename
originalName
mimeType
size
url
publicId
altText
caption
width
height
folder
uploadedBy
createdAt
updatedAt
```

Admin users should be able to manage media.

---

# 9. EMAIL

Implement transactional email through a provider such as:

- Resend
- SendGrid
- Amazon SES

Use an abstraction so the provider can be replaced.

Email functionality should include:

- contact enquiry notification
- enquiry acknowledgement
- career application notification
- career application acknowledgement
- admin account/security notifications
- password reset
- relevant CMS notifications

Never expose email API keys to the frontend.

---

# 10. AUTHENTICATION

Admin authentication must be secure.

Implement:

- email/password login
- password hashing using Argon2id or an appropriately strong password hashing algorithm
- short-lived access tokens
- refresh-token rotation
- secure HTTP-only cookies where appropriate
- CSRF protection for cookie-authenticated mutation requests
- account lockout/rate limiting
- password reset
- session management
- logout
- optional MFA-ready architecture

Do not store plaintext passwords.

Do not store access tokens in localStorage if a safer architecture can be used.

---

# 11. ADMIN ROLES

Implement RBAC.

Initial roles:

### SUPER_ADMIN

Full access.

### ADMIN

Most administrative capabilities.

### EDITOR

Content management.

### HR

Careers and applications.

### MEDIA_MANAGER

Media/document management.

### VIEWER

Read-only administrative access.

Permissions should be granular.

Example:

```text
content.read
content.create
content.update
content.delete
news.publish
assets.update
careers.manage
applications.read
media.manage
users.manage
settings.manage
audit.read
```

Do not rely only on hiding buttons.

Authorization must be enforced server-side.

---

# 12. ADMIN DASHBOARD

Create a dedicated admin application.

Route:

`/admin`

or separate admin host/application.

The admin UI can use a more functional design than the public website, but it must still use Tulcan branding.

Dashboard should show:

- published news
- drafts
- assets
- projects
- leadership
- careers
- enquiries
- applications
- resources
- media
- recent activity

Example dashboard metrics:

```text
Published News
Draft News
Active Jobs
Applications
Unread Enquiries
Assets
Projects
Documents
```

Do not fabricate values.

Use live database counts.

---

# 13. ADMIN SIDEBAR

Create:

Dashboard

Content

- Pages
- News
- Projects
- Assets
- Achievements
- Leadership
- Business Capabilities
- Sustainability
- CSR

Operations

- Careers
- Applications
- Enquiries
- Resources
- Media

System

- Users
- Roles
- Audit Logs
- Settings

Use permission-aware navigation.

---

# 14. ADMIN CONTENT WORKFLOW

Content must support:

```text
DRAFT
↓
IN_REVIEW
↓
APPROVED
↓
PUBLISHED
↓
ARCHIVED
```

Editors should not automatically publish unless their permission allows it.

Store:

- createdBy
- updatedBy
- reviewedBy
- publishedBy
- publishedAt

Implement versioning where practical.

---

# 15. PUBLIC WEBSITE ROUTES

Implement at minimum:

```text
/
 /about
 /about/story
 /about/values
 /about/leadership
 /about/leadership/[slug]
 /about/governance
 /about/footprint

 /business
 /business/exploration
 /business/drilling
 /business/field-development
 /business/production
 /business/engineering
 /business/supply-chain

 /assets
 /assets/tom-shot-bank
 /assets/odimodi
 /assets/ppl-2008
 /assets/ppl-3012
 /assets/[slug]

 /projects
 /projects/[slug]

 /achievements

 /sustainability
 /sustainability/esg
 /sustainability/hse
 /sustainability/environment
 /sustainability/communities
 /sustainability/csr

 /news
 /news/[slug]

 /careers
 /careers/[slug]
 /careers/[slug]/apply

 /resources

 /contact

 /search
 /privacy
 /terms
 /cookies

 /404
```

Only expose pages that have approved content.

---

# 16. HOMEPAGE IMPLEMENTATION

The homepage must reproduce the existing approved UI.

Implement:

- cinematic hero
- company introduction
- metrics
- asset map
- featured assets
- Tom Shot Bank feature
- operations/value chain
- capabilities
- achievements
- project development
- technology
- sustainability
- leadership
- news
- careers
- final CTA
- footer

Use real content from the source material.

Do not invent statistics.

---

# 17. ASSET SYSTEM

Assets must be database-driven.

Asset model should support:

```text
id
name
slug
shortName
licence
location
state
country
assetType
status
operator
description
overview
fieldArea
waterDepth
discoveryYear
seismicInformation
developmentStatus
productionInformation
technicalSummary
developmentStrategy
heroMediaId
mapLatitude
mapLongitude
seoTitle
seoDescription
isFeatured
sortOrder
status
createdAt
updatedAt
publishedAt
```

Additional technical information should have structured fields where appropriate.

---

# 18. ASSET PAGE

Asset detail pages must dynamically render from the database.

The page should support:

- hero
- asset snapshot
- location
- technical information
- wells
- development history
- development strategy
- infrastructure
- production/performance
- gallery
- related projects
- related news
- downloadable resources

Do not display empty sections.

If a field is unavailable, conditionally hide that section.

---

# 19. TOM SHOT BANK

Create a detailed CMS-driven page.

Include source-supported information such as:

- PPL 244
- Akwa Ibom
- field area
- water depth
- seismic information
- wells
- field history
- development information
- infrastructure
- production/test information
- relevant milestones

Where numerical data is shown, include contextual labels.

For example:

```text
3,000+ BOPD
TSB-3 Extended Well Test
```

Do not display an isolated number without context.

---

# 20. ODIMODI

Implement the same reusable asset framework.

Populate with approved information including:

- licence
- location
- geological/technical information
- gas/condensate characteristics where supported
- seismic information
- wells
- development strategy
- current status

Do not manufacture missing data.

---

# 21. OTHER ASSETS

Support:

- PPL 2008
- PPL 3012
- future assets

The admin should be able to create new assets without modifying source code.

---

# 22. PROJECT SYSTEM

Project model:

```text
id
title
slug
summary
description
category
status
location
assetId
objectives
technicalScope
developmentStage
startDate
completionDate
heroMediaId
featured
sortOrder
seoTitle
seoDescription
createdAt
updatedAt
publishedAt
```

Project statuses:

```text
PLANNING
EXPLORATION
APPRAISAL
DEVELOPMENT
CONSTRUCTION
COMMISSIONING
PRODUCTION
COMPLETED
ON_HOLD
```

Only use statuses that accurately represent the source content.

---

# 23. NEWS/CMS SYSTEM

News model:

```text
id
title
slug
excerpt
content
category
featuredImageId
authorId
status
publishedAt
seoTitle
seoDescription
createdAt
updatedAt
```

Categories:

- Corporate
- Operations
- Projects
- People
- Sustainability
- Community
- Industry

Features:

- rich text editor
- image insertion
- featured image
- drafts
- preview
- scheduled publishing
- publishing
- archive
- SEO fields
- related assets
- related projects

---

# 24. NEWS FRONTEND

Implement:

- featured article
- article grid
- category filters
- search
- pagination
- article detail
- related news
- related assets/projects
- share functionality

Use URL-based filtering.

Example:

```text
/news?category=operations
```

---

# 25. LEADERSHIP SYSTEM

Leadership model:

```text
id
name
slug
position
shortBio
fullBio
photoId
education
experience
expertise
sortOrder
featured
status
seoTitle
seoDescription
```

The admin should be able to:

- add executive
- edit executive
- reorder executives
- upload portrait
- publish/unpublish

---

# 26. BUSINESS/CAPABILITIES CMS

Create manageable capability records.

Examples:

- Exploration & Subsurface
- Drilling & Wells
- Field Development
- Production & Operations
- Engineering & Projects
- Procurement & Supply Chain

Fields:

```text
title
slug
summary
description
heroImage
content
capabilities
sortOrder
status
```

---

# 27. ACHIEVEMENTS SYSTEM

Achievements should be dynamic.

Model:

```text
id
number
unit
title
description
year
category
image
sortOrder
status
```

Examples should only come from approved source information.

Do not convert every claim into a statistic.

---

# 28. SUSTAINABILITY CMS

Create separate content structures for:

- ESG
- HSE
- Environment
- Communities
- CSR

Allow admin to manage:

- page content
- images
- reports
- initiatives
- metrics where verified
- related documents

---

# 29. CSR SYSTEM

CSR initiatives should be database-driven.

Example categories:

```text
Education
Sports
Arts
Community
Other
```

The system must support:

- title
- summary
- full content
- date/year
- images
- category
- external link where approved
- related documents

---

# 30. CAREERS SYSTEM

Job model:

```text
id
title
slug
department
location
employmentType
experience
description
responsibilities
requirements
benefits
closingDate
status
createdAt
updatedAt
```

Statuses:

```text
DRAFT
OPEN
CLOSED
ARCHIVED
```

Admin can:

- create job
- edit job
- publish job
- close job
- archive job

---

# 31. CAREER APPLICATION SYSTEM

Application fields:

```text
id
jobId
firstName
lastName
email
phone
location
coverLetter
cvMediaId
status
createdAt
updatedAt
```

Application statuses:

```text
RECEIVED
UNDER_REVIEW
SHORTLISTED
INTERVIEW
REJECTED
HIRED
ARCHIVED
```

CVs must be stored privately.

Do not expose CV URLs publicly.

Only authorized HR/admin users can access applications.

---

# 32. CONTACT ENQUIRY SYSTEM

Contact form:

```text
name
email
company
phone
enquiryType
message
```

Store:

```text
id
name
email
company
phone
enquiryType
message
status
createdAt
updatedAt
assignedTo
```

Statuses:

```text
NEW
IN_PROGRESS
RESOLVED
ARCHIVED
```

Admin should be able to:

- view
- assign
- change status
- add internal notes
- archive

---

# 33. RESOURCES/DOCUMENT LIBRARY

Create a document library.

Categories:

- Company Profile
- Reports
- ESG
- Policies
- Publications
- Press Releases
- Other

Fields:

```text
title
slug
description
category
file
fileType
fileSize
publishedAt
status
```

Private documents must not be publicly accessible.

---

# 34. MEDIA LIBRARY

Admin media library should support:

- upload
- search
- filtering
- folders
- alt text
- captions
- metadata
- replacement
- deletion
- usage tracking where practical

Do not delete media currently referenced by published content without warning.

---

# 35. SEARCH

Implement global search across:

- pages
- assets
- projects
- news
- leadership
- resources

Use PostgreSQL full-text search initially.

Structure the system so a dedicated search engine can be introduced later if scale requires it.

Search endpoint:

```text
GET /api/v1/search?q=
```

---

# 36. API DESIGN

Version the API.

Base:

```text
/api/v1
```

Example endpoints:

```text
GET    /api/v1/assets
GET    /api/v1/assets/:slug

GET    /api/v1/projects
GET    /api/v1/projects/:slug

GET    /api/v1/news
GET    /api/v1/news/:slug

GET    /api/v1/leadership
GET    /api/v1/leadership/:slug

GET    /api/v1/business
GET    /api/v1/business/:slug

GET    /api/v1/achievements

GET    /api/v1/sustainability/:slug

GET    /api/v1/careers
GET    /api/v1/careers/:slug

POST   /api/v1/careers/:slug/apply

GET    /api/v1/resources

POST   /api/v1/contact

GET    /api/v1/search
```

Admin endpoints:

```text
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password

GET    /api/v1/admin/dashboard

CRUD   /api/v1/admin/assets
CRUD   /api/v1/admin/projects
CRUD   /api/v1/admin/news
CRUD   /api/v1/admin/leadership
CRUD   /api/v1/admin/business
CRUD   /api/v1/admin/achievements
CRUD   /api/v1/admin/sustainability
CRUD   /api/v1/admin/careers
CRUD   /api/v1/admin/resources
CRUD   /api/v1/admin/media
CRUD   /api/v1/admin/users

GET/PATCH /api/v1/admin/applications
GET/PATCH /api/v1/admin/enquiries

GET    /api/v1/admin/audit-logs
```

Follow REST principles consistently.

---

# 37. API RESPONSE FORMAT

Use a consistent response structure.

Example:

```json
{
  "success": true,
  "data": {},
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

Errors:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "details": []
  }
}
```

Do not expose stack traces in production.

---

# 38. VALIDATION

Validate on:

1. frontend
2. API boundary
3. database constraints where applicable

Use strong schemas.

Validate:

- email
- phone
- slug
- dates
- uploaded files
- file size
- MIME types
- required fields
- URL fields
- query parameters

Never trust frontend validation alone.

---

# 39. SECURITY

Treat security as a first-class requirement.

Implement:

### Authentication

Secure authentication and sessions.

### Authorization

Server-side RBAC.

### Password security

Strong hashing.

### Rate limiting

Apply to:

- login
- contact
- career applications
- password reset
- public API endpoints

### Input security

Protect against:

- SQL injection
- XSS
- CSRF
- command injection
- malicious file uploads
- path traversal

### HTTP security

Use appropriate:

- CSP
- HSTS
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- frame protection

### Secrets

Never commit:

- API keys
- database credentials
- JWT secrets
- storage credentials
- email credentials

---

# 40. FILE UPLOAD SECURITY

For CVs/documents:

Validate:

- extension
- MIME type
- size
- filename
- content where feasible

Rename files using generated identifiers.

Never trust the original filename.

Store private files outside public web directories.

Use signed URLs or authenticated download endpoints for private files.

---

# 41. AUDIT LOGGING

Create audit logs for important admin actions.

Log:

```text
id
userId
action
entityType
entityId
oldValue
newValue
ipAddress
userAgent
createdAt
```

Examples:

```text
USER_LOGIN
USER_CREATED
CONTENT_CREATED
CONTENT_UPDATED
CONTENT_PUBLISHED
CONTENT_ARCHIVED
CONTENT_DELETED
MEDIA_UPLOADED
MEDIA_DELETED
JOB_CREATED
APPLICATION_STATUS_CHANGED
```

Do not log passwords, tokens or sensitive credentials.

---

# 42. DATABASE DESIGN

Create a complete Prisma schema.

At minimum consider:

```text
User
Role
Permission
UserRole
RolePermission

Asset
AssetWell
AssetMedia
AssetTechnicalData

Project
ProjectMedia

NewsArticle
NewsCategory

LeadershipProfile

BusinessCapability

Achievement

SustainabilityPage
CSRInitiative

Job
JobApplication

ContactEnquiry

Resource
Media

AuditLog

SiteSetting
SeoMetadata
```

Use proper relationships.

Avoid unnecessary duplication.

---

# 43. SLUGS

All public content should have stable slugs.

Example:

```text
tom-shot-bank
odimodi
ppl-2008
ppl-3012
```

Slugs must be:

- lowercase
- URL-safe
- unique

Do not use database IDs as primary public URLs.

---

# 44. SEO

Implement technical SEO.

Every dynamic content type should support:

- title
- meta description
- canonical URL
- Open Graph
- Twitter/X metadata
- structured data where applicable

Generate:

```text
/sitemap.xml
/robots.txt
```

Use Next.js metadata APIs.

---

# 45. STRUCTURED DATA

Where appropriate implement Schema.org structured data for:

- Organization
- NewsArticle
- JobPosting
- BreadcrumbList
- WebSite

Do not create misleading structured data.

---

# 46. PERFORMANCE

Target excellent Core Web Vitals.

Implement:

- next/image
- responsive image sizes
- lazy loading
- image compression
- caching
- static generation where appropriate
- ISR/revalidation where appropriate
- server components
- code splitting
- dynamic imports for heavy components

Do not load large JavaScript libraries globally.

---

# 47. CACHING STRATEGY

Public content should be aggressively cacheable.

Recommended approach:

Static/ISR:

- about
- assets
- projects
- business pages
- leadership
- news

Dynamic:

- search
- contact
- career applications
- admin

After admin publishes content, trigger appropriate cache invalidation/revalidation.

---

# 48. NEXT.JS DATA STRATEGY

Do not make every page a client component.

Prefer:

```text
Server Components
        ↓
Backend API
        ↓
Database
```

Use client components only where interaction requires them.

Examples:

- asset map
- filters
- search
- forms
- animations
- admin UI

---

# 49. API SECURITY BETWEEN FRONTEND AND BACKEND

Configure:

- HTTPS
- strict CORS
- trusted origins
- API authentication
- rate limits
- request validation

Do not expose internal database access to the frontend.

The browser must never connect directly to Neon PostgreSQL.

---

# 50. ENVIRONMENT VARIABLES

Create:

`.env.example`

Include placeholders such as:

```env
DATABASE_URL=
DIRECT_DATABASE_URL=

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

NEXT_PUBLIC_API_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

EMAIL_PROVIDER_API_KEY=
EMAIL_FROM=

NEXT_PUBLIC_SITE_URL=
```

Never include real credentials.

Separate:

```text
development
staging
production
```

---

# 51. ADMIN SETTINGS

Create a settings system for:

- site title
- site description
- contact email
- phone
- office addresses
- social links
- default SEO
- analytics IDs
- maintenance mode
- footer content

Do not hard-code values that administrators should reasonably be able to change.

---

# 52. ANALYTICS

Prepare integration for analytics such as:

- Google Analytics
- Google Tag Manager
- privacy-conscious alternatives

Analytics must be configurable through environment variables/settings.

Do not hard-code tracking IDs.

---

# 53. COOKIE/PRIVACY

If analytics or non-essential cookies are used, implement appropriate consent behaviour.

Create:

- Privacy Policy
- Cookie Policy
- Terms

Do not fabricate legal statements.

Leave clearly marked CMS-managed/legal placeholders where approved legal copy has not been supplied.

---

# 54. ERROR HANDLING

Frontend:

Create:

- global error boundary
- route-level error states
- loading states
- empty states
- 404 page

Backend:

Create:

- global exception filter
- structured errors
- request IDs
- production-safe error responses
- server-side logging

---

# 55. LOGGING

Use structured logging.

Include:

- request ID
- timestamp
- endpoint
- HTTP method
- response status
- execution time

Do not log:

- passwords
- authentication tokens
- CV contents
- private documents
- sensitive personal information unnecessarily

---

# 56. ADMIN UX

Admin pages should support:

- search
- filtering
- sorting
- pagination
- bulk actions where safe
- confirmation dialogs
- autosave only where appropriate
- draft/publish states
- clear success/error messages

Destructive actions must require confirmation.

---

# 57. RICH TEXT EDITOR

Use a modern editor for:

- news
- projects
- assets
- sustainability
- business pages

Support:

- headings
- paragraphs
- lists
- links
- images
- quotes
- tables where appropriate

Sanitize rendered HTML.

Do not blindly inject arbitrary HTML.

---

# 58. ADMIN CONTENT PREVIEW

Editors should be able to preview unpublished content.

Example:

```text
Draft → Preview → Review → Publish
```

Preview should not make draft content publicly indexable.

Use secure preview mechanisms.

---

# 59. DRAFT/PUBLISHED ROUTING

Public website should only retrieve:

```text
status = PUBLISHED
```

unless preview mode is explicitly enabled.

Never expose drafts through ordinary public API requests.

---

# 60. MEDIA OPTIMIZATION

For every uploaded image:

- generate optimized formats where provider supports it
- retain appropriate dimensions
- generate thumbnails
- store metadata
- require alt text for meaningful images

Do not serve 10MB images to mobile devices.

---

# 61. MAP IMPLEMENTATION

Implement the asset map from database coordinates.

Possible libraries:

- Mapbox
- Leaflet
- another production-ready map library

Do not expose private API keys.

If using Mapbox, use the public browser token only where appropriate and restrict it by domain.

Asset locations must use approved coordinates.

If exact coordinates are sensitive or unavailable, use approximate display locations.

---

# 62. ACCESSIBILITY

Target WCAG 2.2 AA principles.

Implement:

- keyboard navigation
- focus management
- semantic HTML
- accessible forms
- labels
- alt text
- sufficient contrast
- reduced motion
- accessible menus
- accessible modals
- accessible tables
- screen-reader-friendly status messages

Do not rely on hover as the only way to access information.

---

# 63. RESPONSIVE DESIGN

Support:

```text
320px+
375px
414px
768px
1024px
1280px
1440px
1920px+
```

Test:

- Chrome
- Edge
- Safari
- Firefox
- mobile Safari
- mobile Chrome

Pay special attention to:

- navigation
- hero images
- maps
- technical data
- timelines
- tables
- forms
- admin tables

---

# 64. UI IMPLEMENTATION RULE

The linked UI is already approved.

Therefore:

DO NOT:

- change the colour palette
- redesign the homepage
- replace typography without reason
- convert cards into unrelated components
- add unnecessary gradients
- add excessive glassmorphism
- add generic Bootstrap components
- add random animations
- add decorative content not present in the design

DO:

- faithfully implement the existing UI
- make components reusable
- connect UI to real API data
- preserve responsive behaviour
- improve accessibility
- add loading/empty/error states without disrupting the design

---

# 65. BRAND COLOURS

Use:

```text
Primary Burgundy: #7F2622
Deep Burgundy:    #371919
Near Black:       #191614
Black:            #000000
White:            #FFFFFF
```

Use Tailwind theme tokens rather than repeatedly writing raw colours.

Example conceptual tokens:

```text
brand-primary
brand-deep
brand-dark
brand-black
brand-white
```

---

# 66. COMPONENT ARCHITECTURE

Create reusable components.

Public:

```text
Header
MegaMenu
MobileMenu
Footer
Hero
SectionHeader
Button
Metric
AssetCard
AssetMap
AssetHero
ProjectCard
NewsCard
LeadershipCard
Achievement
Timeline
Gallery
Breadcrumbs
Search
CTASection
ContactForm
CareerForm
```

Admin:

```text
AdminLayout
Sidebar
Topbar
DataTable
SearchInput
FilterBar
Pagination
Form
RichTextEditor
MediaPicker
MediaLibrary
StatusBadge
PublishControls
ConfirmDialog
Toast
DashboardCard
AuditLogTable
```

---

# 67. TYPESCRIPT

Use strict TypeScript.

Enable strict mode.

Avoid:

```typescript
any
```

unless absolutely unavoidable.

Define shared types.

Use generated Prisma types where appropriate.

Keep API DTOs and frontend models clearly separated.

---

# 68. API CLIENT

Create a centralized API client.

Do not scatter:

```text
fetch("...")
```

throughout the application.

Create typed services such as:

```text
assetService
projectService
newsService
leadershipService
careerService
resourceService
contactService
adminService
```

Handle:

- authentication
- errors
- retries where appropriate
- caching
- serialization

---

# 69. DATABASE SEEDING

Create seed data based strictly on the supplied company information.

Seed:

- initial admin role
- permissions
- approved assets
- business capabilities
- leadership
- achievements
- sustainability pages
- CSR initiatives
- sample news where source content exists

Clearly mark sample/demo records if they are not approved for publication.

Never seed fake production claims as real data.

---

# 70. ADMIN INITIAL USER

Do not hard-code an administrator password into source code.

Provide a secure setup process.

Example:

```text
pnpm admin:create
```

or a secure initialization script requiring environment variables.

Force password change if a temporary setup credential is used.

---

# 71. DATABASE MIGRATIONS

Use Prisma migrations.

Never modify production schema manually without a migration.

Document:

```text
migration creation
migration deployment
rollback strategy
database backup strategy
```

---

# 72. BACKUP STRATEGY

Neon/database backup capabilities should be used appropriately.

Document:

- backup expectations
- recovery process
- production migration process
- disaster recovery considerations

Do not claim a backup mechanism is implemented unless it actually is.

---

# 73. TESTING

Implement meaningful tests.

Backend:

- unit tests
- service tests
- authentication tests
- authorization tests
- API integration tests

Frontend:

- component tests for critical components
- form validation tests

End-to-end:

- homepage
- navigation
- asset page
- news
- contact form
- career application
- admin login
- publishing workflow

Use an appropriate testing framework such as:

- Vitest
- Jest
- Playwright

---

# 74. SECURITY TESTING

Test:

- invalid authentication
- expired token
- refresh-token reuse
- unauthorized admin access
- role escalation
- XSS payloads
- SQL injection attempts
- CSRF
- malicious uploads
- oversized uploads
- invalid MIME types
- rate limits
- brute force login
- IDOR/BOLA

A user must never be able to access another user's private records simply by changing an ID.

---

# 75. API DOCUMENTATION

Integrate Swagger/OpenAPI into NestJS.

Document:

- authentication
- public endpoints
- admin endpoints
- request bodies
- responses
- errors
- authorization requirements

Provide a development-only or protected API documentation route.

---

# 76. DEVELOPMENT EXPERIENCE

Provide:

```text
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm test:e2e
pnpm db:migrate
pnpm db:seed
```

Make the project straightforward for another developer to run.

---

# 77. CODE QUALITY

Follow:

- SOLID principles where appropriate
- DRY
- separation of concerns
- modular architecture
- clear naming
- small focused components
- reusable services
- typed interfaces
- dependency injection in NestJS
- repository/service/controller separation where useful

Do not over-engineer.

---

# 78. NESTJS MODULE STRUCTURE

Organize the API approximately as:

```text
src/
├── auth/
├── users/
├── roles/
├── permissions/
├── assets/
├── projects/
├── news/
├── leadership/
├── business/
├── achievements/
├── sustainability/
├── csr/
├── careers/
├── applications/
├── enquiries/
├── resources/
├── media/
├── search/
├── settings/
├── audit/
├── common/
└── main.ts
```

Each module should have:

```text
controller
service
dto
entities/types where appropriate
guards
tests
```

---

# 79. NEXT.JS PUBLIC STRUCTURE

Use the App Router.

Conceptual:

```text
app/
├── page.tsx
├── about/
├── business/
├── assets/
├── projects/
├── achievements/
├── sustainability/
├── news/
├── careers/
├── resources/
├── contact/
├── search/
├── privacy/
├── terms/
├── api/
└── not-found.tsx
```

Use route groups/layouts where they improve maintainability.

---

# 80. ADMIN STRUCTURE

Conceptual:

```text
app/
└── admin/
    ├── login/
    ├── dashboard/
    ├── content/
    ├── assets/
    ├── projects/
    ├── news/
    ├── leadership/
    ├── business/
    ├── sustainability/
    ├── careers/
    ├── applications/
    ├── enquiries/
    ├── resources/
    ├── media/
    ├── users/
    ├── audit/
    └── settings/
```

---

# 81. SEO-FRIENDLY CONTENT RENDERING

Public pages should render meaningful content server-side where possible.

Avoid relying entirely on client-side fetching for important SEO content.

Search engines must be able to understand:

- company information
- assets
- projects
- leadership
- news
- careers

---

# 82. SOCIAL SHARING

News articles and major pages should support:

- Open Graph image
- title
- description
- canonical URL

Admin should be able to override SEO/social fields.

---

# 83. CONTACT AND CAREER SPAM PROTECTION

Protect public forms using a suitable anti-spam mechanism.

Potentially:

- Cloudflare Turnstile
- reCAPTCHA
- honeypot
- rate limiting

Prefer privacy-conscious approaches where practical.

Never rely on CAPTCHA alone.

---

# 84. EMAIL NOTIFICATION FLOW

Contact:

```text
Visitor
 ↓
Contact API
 ↓
Validate
 ↓
Store enquiry
 ↓
Send admin notification
 ↓
Send visitor acknowledgement
```

Career:

```text
Applicant
 ↓
Career API
 ↓
Validate
 ↓
Secure CV upload
 ↓
Store application
 ↓
Notify HR
 ↓
Send acknowledgement
```

If email delivery fails, the application/enquiry should not automatically be lost.

---

# 85. ADMIN NOTIFICATIONS

Create notification indicators for:

- new enquiry
- new application
- content requiring review
- system alerts

Notifications should be permission-aware.

---

# 86. PUBLIC API VS ADMIN API

Keep clear separation.

Public API:

Only returns safe published content.

Admin API:

Requires authentication and permissions.

Never expose:

- internal notes
- audit logs
- unpublished content
- user passwords
- private CVs
- private documents
- internal configuration

through public endpoints.

---

# 87. CONTENT VERSIONING

For important corporate content, consider:

```text
Content
ContentVersion
```

Store previous versions of:

- assets
- projects
- news
- leadership
- sustainability pages

Allow administrators to inspect previous versions.

Do not allow arbitrary restoration without permission.

---

# 88. PUBLISHING

Publishing a record should:

1. validate content
2. check required fields
3. update status
4. record publishing user
5. record timestamp
6. invalidate/revalidate frontend cache
7. generate/update sitemap where applicable

---

# 89. UNPUBLISHING

Unpublishing should:

- remove content from public API
- invalidate cache
- preserve record
- preserve audit history

Do not delete content merely to remove it from the website.

---

# 90. ADMIN DASHBOARD ANALYTICS

If analytics data is available, create a lightweight overview.

Do not build an elaborate fake analytics dashboard.

Possible:

- page views
- news views
- application counts
- enquiry counts

Only display metrics that can be backed by actual data.

---

# 91. FUTURE EXTENSIBILITY

Architect the platform so it can later support:

- investor relations
- publications
- tenders
- vendor registration
- stakeholder portal
- multilingual content
- advanced search
- job alerts
- newsletter subscriptions

Do not implement these unless requested.

Design the core architecture so adding them will not require rewriting the application.

---

# 92. DEPLOYMENT

Prepare deployment for:

### Frontend

Vercel or equivalent Next.js-compatible platform.

### Backend

Railway, Render, AWS, Azure, DigitalOcean or another production Node.js host.

### Database

Neon PostgreSQL.

### Media

Cloudinary/S3-compatible storage.

### DNS/CDN

Cloudflare or equivalent.

The exact provider can be selected based on the existing deployment environment.

---

# 93. DOMAIN ARCHITECTURE

Recommended production setup:

```text
tulcanepc.com
    ↓
Next.js frontend

api.tulcanepc.com
    ↓
NestJS API

admin.tulcanepc.com
    ↓
Admin application
```

Alternatively, use a path-based admin architecture if the deployment strategy makes that preferable.

Do not expose the API/database unnecessarily.

---

# 94. CI/CD

Create a Git-based CI/CD pipeline.

On pull request:

- install dependencies
- typecheck
- lint
- unit tests
- build

On production deployment:

- build
- run safe database migration procedure
- deploy
- smoke test

Never automatically run destructive database operations in production.

---

# 95. SECURITY HEADERS

Configure appropriate production headers.

At minimum evaluate:

```text
Content-Security-Policy
Strict-Transport-Security
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
```

Configure CSP carefully so it does not break:

- maps
- Cloudinary
- analytics
- fonts
- API
- required third-party services

---

# 96. RATE LIMITING

Rate-limit sensitive endpoints.

Examples:

```text
/auth/login
/auth/forgot-password
/contact
/careers/:slug/apply
/search
```

Use Redis if distributed rate limiting/session infrastructure requires it.

Do not introduce Redis merely because it is fashionable.

---

# 97. REDIS

Redis is optional.

Use it only where there is a concrete requirement such as:

- distributed rate limiting
- caching
- background jobs
- queues
- session infrastructure

For the initial version, do not add unnecessary infrastructure if PostgreSQL and the hosting environment are sufficient.

---

# 98. BACKGROUND JOBS

If asynchronous processing becomes necessary, introduce a queue such as:

- BullMQ + Redis

Possible jobs:

- email delivery
- image processing
- document processing
- notification processing

Do not make the entire application dependent on a queue unnecessarily.

---

# 99. CONTENT QUALITY CONTROL

The CMS must make it difficult to accidentally publish incomplete content.

For example, an asset cannot be published without:

- title
- slug
- summary
- hero image
- overview
- location
- status

Required fields should depend on content type.

---

# 100. SOURCE CONTENT RULE

This is extremely important.

Do not hallucinate company facts.

Never invent:

- production volumes
- reserves
- employees
- revenue
- field acreage
- project costs
- dates
- partnerships
- certifications
- awards
- executives
- operational status
- licence information

If a fact is not supported by the provided sources:

```text
TODO: APPROVED CONTENT REQUIRED
```

or leave it CMS-editable.

---

# 101. PARTNERS

Where the source content identifies partners, create a partner system or structured section.

Possible partner records:

```text
name
logo
description
website
category
sortOrder
status
```

Use only approved partner relationships.

Do not imply that a company is a current strategic partner if the source does not support that wording.

---

# 102. SOCIAL MEDIA

Social links should be managed through site settings.

Do not hard-code them throughout the frontend.

Support:

- LinkedIn
- X
- Instagram
- Facebook
- YouTube

Only display platforms for which approved Tulcan accounts exist.

---

# 103. FOOTER

Footer should be dynamically configurable.

Include:

- navigation
- office/contact information
- social links
- privacy
- terms
- copyright
- company information

Keep the approved UI design.

---

# 104. ACCESSIBILITY OF ADMIN

Admin should also support:

- keyboard navigation
- accessible tables
- focus states
- labelled forms
- confirmation dialogs
- error announcements

Do not treat admin accessibility as optional.

---

# 105. FINAL ACCEPTANCE CRITERIA

The application is complete only when:

### FRONTEND

- all approved UI pages are implemented
- desktop works
- tablet works
- mobile works
- animations work
- loading states work
- error states work
- empty states work
- images are optimized
- navigation works
- forms work

### BACKEND

- API is functional
- authentication works
- authorization works
- validation works
- errors are handled
- rate limiting works
- logging works
- Swagger documentation exists

### DATABASE

- Prisma schema exists
- migrations exist
- relationships work
- indexes exist
- seed process works

### ADMIN

- login works
- RBAC works
- content CRUD works
- publishing works
- media works
- news works
- assets work
- projects work
- leadership works
- careers work
- applications work
- enquiries work
- resources work
- audit logs work

### SECURITY

- no secrets in Git
- passwords hashed
- private files protected
- admin routes protected
- public API cannot expose drafts
- authorization enforced server-side
- rate limiting implemented
- malicious uploads rejected
- common OWASP risks addressed

### SEO

- metadata works
- sitemap works
- robots works
- canonical URLs work
- structured data works where appropriate
- social sharing works

### PERFORMANCE

- optimized images
- minimal client JavaScript
- appropriate caching
- good Core Web Vitals
- no unnecessary API requests

---

# 106. DEVELOPMENT ORDER

Do NOT attempt to build everything randomly.

Implement in this order:

## PHASE 1 — FOUNDATION

1. Repository
2. Monorepo
3. TypeScript
4. Next.js
5. Tailwind
6. NestJS
7. Prisma
8. Neon connection
9. Environment configuration
10. shared types/config
11. linting
12. formatting

## PHASE 2 — DATABASE

1. Prisma schema
2. migrations
3. relationships
4. indexes
5. seed data

## PHASE 3 — AUTHENTICATION

1. users
2. roles
3. permissions
4. login
5. refresh tokens
6. logout
7. password reset
8. guards
9. RBAC

## PHASE 4 — ADMIN FOUNDATION

1. admin layout
2. sidebar
3. dashboard
4. authentication guard
5. users
6. permissions
7. audit logs

## PHASE 5 — CMS

Implement:

1. assets
2. projects
3. news
4. leadership
5. business capabilities
6. achievements
7. sustainability
8. CSR
9. resources
10. media

## PHASE 6 — PUBLIC FRONTEND

Implement:

1. header
2. footer
3. homepage
4. about
5. business
6. assets
7. projects
8. achievements
9. sustainability
10. news
11. careers
12. resources
13. contact
14. search

## PHASE 7 — FORMS

1. contact
2. careers
3. application uploads
4. email notifications
5. spam protection

## PHASE 8 — SEO

1. metadata
2. sitemap
3. robots
4. structured data
5. canonical URLs
6. Open Graph

## PHASE 9 — SECURITY

1. headers
2. rate limits
3. upload security
4. RBAC testing
5. authorization testing
6. input validation
7. audit logging

## PHASE 10 — TESTING

1. unit
2. integration
3. E2E
4. responsive
5. accessibility
6. security
7. performance

## PHASE 11 — DEPLOYMENT

1. production environment
2. Neon
3. API
4. frontend
5. admin
6. Cloudflare
7. domain
8. HTTPS
9. CI/CD
10. monitoring

---

# 107. DO NOT TAKE SHORTCUTS

Do not:

- hard-code database content into React components
- put database credentials in frontend code
- connect browser directly to PostgreSQL
- use localStorage for sensitive authentication tokens unnecessarily
- expose admin endpoints publicly without authorization
- skip validation
- skip migrations
- skip audit logs
- upload private CVs into public folders
- create fake company data
- duplicate components unnecessarily
- put everything into one giant component
- use `any` everywhere
- make every Next.js component client-side
- create unnecessary microservices
- over-engineer the first version

---

# 108. DOCUMENTATION

Create:

```text
README.md
ARCHITECTURE.md
DATABASE.md
API.md
SECURITY.md
DEPLOYMENT.md
CONTENT-MANAGEMENT.md
```

Document:

- architecture
- local setup
- environment variables
- database setup
- migrations
- seeding
- API
- admin
- deployment
- troubleshooting
- security considerations

---

# 109. FINAL PROJECT STRUCTURE

The final repository should resemble:

```text
tulcan-energy/
│
├── apps/
│   ├── web/
│   ├── api/
│   └── admin/
│
├── packages/
│   ├── ui/
│   ├── types/
│   ├── validation/
│   ├── config/
│   └── utils/
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── API.md
│   ├── SECURITY.md
│   ├── DEPLOYMENT.md
│   └── CONTENT-MANAGEMENT.md
│
├── .env.example
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

---

# 110. FINAL INSTRUCTION TO THE AI

You have been given an existing, approved Tulcan Energy website UI.

Your responsibility is to transform that UI into a complete production-ready upstream oil and gas corporate platform.

The UI is not a suggestion.

**Treat the existing UI as the design source of truth.**

Build the system behind it.

The finished application should provide:

```text
                    TULCAN ENERGY
                         │
          ┌──────────────┴──────────────┐
          │                             │
     PUBLIC WEBSITE                 ADMIN CMS
          │                             │
          │                             │
       Next.js                      Next.js
          │                             │
          └──────────────┬──────────────┘
                         │
                      REST API
                         │
                       NestJS
                         │
                      Prisma
                         │
                  Neon PostgreSQL
                         │
              ┌──────────┼──────────┐
              │          │          │
           Media       Email      Optional
         Storage      Provider     Redis
```

The platform must be:

**Fast.**

**Secure.**

**Maintainable.**

**SEO-friendly.**

**CMS-driven.**

**Responsive.**

**Accessible.**

**Production-ready.**

Most importantly:

> **Do not build a generic oil-and-gas website. Build Tulcan Energy's digital platform using the approved UI, the company's actual source content, and a robust modern full-stack architecture.**

Before writing large amounts of code, inspect the existing UI structure and identify:

1. all pages
2. all reusable components
3. all content types
4. all dynamic sections
5. all forms
6. all media requirements
7. all API requirements
8. all database entities

Then create an implementation plan.

After that, implement the system phase-by-phase.

At the end of each major phase:

- run type checking
- run linting
- run tests
- fix errors
- verify the UI
- verify API functionality
- verify responsive behaviour

Do not move forward while foundational errors remain unresolved.

The final result should be a complete enterprise-grade Tulcan Energy website, API and CMS—not merely a frontend mockup.
