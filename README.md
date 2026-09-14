MediReach

MediReach is a medication management and pharmacy discovery web
application designed to help users organize medicines, manage medication
schedules, track doses, monitor refills, and locate nearby pharmacies.

The project is being developed as a full-stack web application with a
clean, clinical, user-focused interface.

Project Status

Current stage: Frontend foundation + Add Medicine workflow in
progress.

Implemented so far:

Next.js application foundation

TypeScript setup

Tailwind CSS

shadcn/ui component setup

Responsive MediReach application shell

Dashboard UI

Add Medicine route and form

Medication details section

Dosage and medicine form fields

Medication scheduling fields

Supply and refill fields

Instructions field

Client-side form validation foundation

Temporary browser storage for medication data during prototyping

The backend, authentication, persistent database, notification system,
analytics, and real pharmacy integration are planned next.

Vision

Medication management can become difficult when users have multiple
medicines, different schedules, limited supplies, and difficulty
remembering doses.

MediReach aims to bring these tasks into one place:

Medication → Schedule → Reminder → Dose Tracking → Adherence → Refill
→ Pharmacy

The goal is to create a practical application rather than a static
demonstration.

Planned Features

Medication Management

Add medicines

Edit medicines

Delete medicines

Dosage and unit management

Tablet, capsule, syrup, injection, and other medication forms

Start and end dates

Medication instructions

Current medicine quantity

Refill threshold

Medication Scheduling

Once-daily schedules

Multiple doses per day

Configurable dose times

Start and end dates

Upcoming medication reminders

Dose Tracking

Users will be able to record whether a scheduled dose was:

Taken

Skipped

Missed

This data will later be used to calculate medication adherence.

Reminders

Planned reminder functionality includes:

Browser notifications

Scheduled medication alerts

Missed-dose notifications

Refill reminders

Adherence Analytics

The analytics section is planned to provide:

Daily adherence

Weekly adherence

Monthly trends

Taken vs missed doses

Medication-specific adherence

Simple actionable insights

Pharmacy Locator

MediReach will use real map/location data to help users find nearby
pharmacies.

Planned functionality:

Current-location based search

Nearby pharmacies

Distance information

Map view

Pharmacy details

Directions

Pharmacy availability information where reliable data is available

The project will avoid using fabricated pharmacy data for the real
locator.

Technology Stack

Frontend

Next.js

React

TypeScript

Tailwind CSS

shadcn/ui

Lucide React

Backend

Planned:

Next.js Route Handlers / Server Actions

Supabase

Database

Supabase PostgreSQL

Planned core entities:

Profiles

Medications

Medication schedules

Dose logs

Notifications

Refill alerts

Authentication

Supabase Auth

Row Level Security (RLS)

Validation

Zod

Charts

Recharts

Maps

Planned:

OpenStreetMap

Leaflet

Overpass API

Notifications

Planned:

Web Push

Service Worker

Mobile push notifications may be considered later.

Deployment

Planned:

Vercel

Supabase

Project Structure

medireach/
├── public/
│   ├── icons/
│   └── images/
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── forgot-password/
│   │   │
│   │   └── app/
│   │       ├── dashboard/
│   │       ├── medicines/
│   │       │   ├── add/
│   │       │   └── [id]/
│   │       ├── reminders/
│   │       ├── history/
│   │       ├── analytics/
│   │       ├── pharmacies/
│   │       │   └── [id]/
│   │       ├── profile/
│   │       └── settings/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── dashboard/
│   │   ├── medicines/
│   │   ├── reminders/
│   │   ├── pharmacies/
│   │   ├── analytics/
│   │   └── layout/
│   │
│   ├── hooks/
│   ├── lib/
│   │   ├── supabase/
│   │   ├── medications/
│   │   ├── reminders/
│   │   ├── pharmacy/
│   │   ├── analytics/
│   │   └── validation/
│   │
│   ├── services/
│   ├── types/
│   └── utils/
│
├── supabase/
│   └── migrations/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
└── README.md

Design Direction

MediReach follows a clean clinical-product aesthetic.

Visual principles

Clean layouts

Strong typography

High readability

Generous spacing

Clear hierarchy

Minimal unnecessary animation

Responsive design

Accessible interaction states

The interface intentionally avoids an overly futuristic or neon visual
style.

Primary visual language

Deep navy

Soft blue

Muted teal

Off-white backgrounds

Slate neutrals

Green for successful medication actions

Amber for refill warnings

Red for important medication alerts

Data & Privacy

Medication information is personal data, so security is an important
part of the planned architecture.

The production version will use:

Supabase Row Level Security

Authenticated user-specific records

HTTPS deployment

Environment variables for secrets

No service-role credentials in client-side code

Minimal collection of personal information

Server-side authorization checks

MediReach is intended to assist with medication organization and
reminders. It should not replace professional medical advice or make
autonomous clinical decisions.

Development

Install dependencies

npm install

Start development server

npm run dev

Open:

http://localhost:3000

Run lint

npm run lint

Build for production

npm run build

Environment Variables

The production application will require environment variables for
external services.

Example:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

Additional environment variables may be added as notification, maps, or
other backend services are integrated.

Never commit real secrets to Git.

Development Roadmap

Phase 1 --- Foundation

Initialize Next.js project

Configure TypeScript

Configure Tailwind CSS

Configure shadcn/ui

Create project architecture

Build application shell

Build dashboard foundation

Phase 2 --- Medication Management

Create Add Medicine route

Build medication form

Complete validation

Build medicines list

Build medicine details page

Add edit functionality

Add delete functionality

Replace temporary browser storage with Supabase

Phase 3 --- Authentication & Database

Supabase project setup

Database schema

Authentication

Row Level Security

User profiles

Persistent medication records

Phase 4 --- Reminders & Tracking

Medication schedule engine

Dose logging

Reminder system

Browser notifications

Missed-dose handling

Refill alerts

Phase 5 --- Analytics

Adherence calculations

Weekly analytics

Monthly analytics

Medication-specific trends

Dashboard insights

Phase 6 --- Pharmacy Locator

Map integration

User location handling

Nearby pharmacy search

Distance calculation

Pharmacy details

Directions

Phase 7 --- Production Hardening

Security review

Error handling

Loading states

Empty states

Accessibility review

Mobile optimization

Unit tests

Integration tests

End-to-end tests

Production deployment

Architecture Goal

The final system is intended to follow this flow:

                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │   MediReach Web App │
                  └──────────┬──────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
    Medication           Reminders          Pharmacy
    Management           & Tracking         Locator
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │
                             ▼
                   ┌───────────────────┐
                   │ Supabase Backend  │
                   │ Auth + PostgreSQL │
                   └─────────┬─────────┘
                             │
                             ▼
                   ┌───────────────────┐
                   │ Analytics &       │
                   │ Adherence Insights│
                   └───────────────────┘

Important Development Principle

MediReach is being developed incrementally.

The project will prioritize:

Correct functionality

Real data

Secure data handling

Reliable reminders

Clear user experience

Maintainable architecture

AI, if introduced later, will be used for supportive insights rather
than replacing medication or clinical decision-making.

License

This project is currently being developed as a personal software project
and is not yet released under a finalized open-source license.