# 🦉 Scholarship Owl – Admissions Readiness Dashboard
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Nuxt](https://img.shields.io/badge/Nuxt-4-green)
![Express](https://img.shields.io/badge/Express-5-lightgrey)
![Tests](https://img.shields.io/badge/Tests-Vitest%20%7C%20Playwright-success)

Technical assessment project implementing an admissions readiness platform for prospective students.

## Tech Stack

### Frontend

* Nuxt 4
* TypeScript
* Vue 3 Composition API
* Playwright

### Backend

* Express.js
* TypeScript
* Zod
* Vitest
* Supertest

---

## Features

### Student Profile Intake

Students can create a profile containing:

* Name
* Email
* Education Level
* GPA
* Test Scores
* Target Enrollment Term

### Program Catalog

Browse available academic programs and select a target program.

### Dynamic Checklist Generation

A personalized application checklist is generated automatically based on selected program requirements.

### Readiness Dashboard

The dashboard displays:

* Readiness Score
* Missing Requirements
* Checklist Status
* Application Timeline

### Progress Tracking

Checklist items can be marked as completed.

Readiness score is recalculated automatically after every update.

---

## Project Structure

```text
.
├── api
│   ├── src
│   ├── tests
│   └── package.json
│
├── ui
│   ├── app
│   ├── tests
│   └── package.json
│
├── package.json
└── README.md
```

---

## Installation

Install dependencies for both applications:

```bash
yarn install:all
```

---

## Running the Application

Start frontend and backend simultaneously:

```bash
yarn dev
```

### Frontend

```text
http://localhost:3000
```

### Backend

```text
http://localhost:3001
```

---

## Running Tests

Run all tests:

```bash
yarn test
```

Run backend tests only:

```bash
yarn test:api
```

Run frontend tests only:

```bash
yarn test:ui
```

---

## Test Coverage

### API Tests

Implemented using Vitest and Supertest.

Covered scenarios:

* Profile creation
* Checklist generation
* Checklist updates
* Readiness score recalculation
* Timeline generation

### UI Tests

Implemented using Playwright.

Covered scenarios:

* Program catalog rendering
* Dashboard rendering
* Checklist interaction
* Readiness score updates

---

## Architecture Decisions

### In-Memory Storage

For simplicity and to keep the solution focused on business logic, data is stored in memory.

This can be replaced with a database implementation without changing API contracts.

### Validation

All incoming API payloads are validated using Zod.

### Frontend Architecture

The frontend uses:

* Composition API
* Reusable API client composable
* Type-safe interfaces

---

## Trade-offs

To keep the implementation focused and within the assessment scope:

* No authentication system
* No file uploads
* No persistent database
* Program data is predefined
* Checklist generation is deterministic

---

## Future Improvements

Potential next steps:

* PostgreSQL or MongoDB persistence
* Authentication and authorization
* Document upload support
* Email notifications
* Admin panel for managing programs
* Extended E2E coverage

---

## Author

Pavlo Babik

GitHub: https://github.com/PavelBabik
