# apps/frontend

This is the primary user-facing application for Duramation. It's a Next.js application that provides an intuitive and responsive interface for users to define, manage, and monitor their workflow automations.

## Technologies

*   **Framework:** Next.js
*   **UI Library:** React, Radix-UI
*   **Styling:** Tailwind CSS
*   **Authentication:** Clerk
*   **Data Fetching:** React Query (or similar, assuming typical Next.js patterns)

## Features

*   User authentication and management.
*   Dashboard for an overview of workflows.
*   Tools for creating, editing, and deploying automation workflows.
*   Monitoring and logging of workflow execution.
*   Integration with various third-party services.

## Local Development

To run the frontend application locally:

1.  Ensure you have followed the main [Getting Started Guide](../../docs/GETTING_STARTED.md) to set up your environment and dependencies.
2.  Make sure your `.env` file at the project root is correctly configured, especially with Clerk and Inngest related environment variables.
3.  Start the development server from the project root:
    ```bash
    pnpm dev
    ```
    Alternatively, you can navigate into this directory and run:
    ```bash
    cd apps/frontend
    pnpm dev
    ```
4.  The application should be accessible at `http://localhost:3000` (or as configured in `FRONTEND_URL`).