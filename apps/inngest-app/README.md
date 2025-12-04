# apps/inngest-app

This application serves as the backend for Duramation, primarily responsible for hosting and executing Inngest-powered workflows and exposing a programmatic API. While built with Next.js, its role is distinct from a traditional frontend, focusing on server-side logic, API endpoints, and integration with the Inngest framework.

## Purpose

*   **Inngest Workflow Execution:** Hosts all defined Inngest functions and handles their triggers and execution.
*   **REST API:** Exposes a set of RESTful API endpoints for the frontend and external systems to interact with workflows, data, and integrations. (Refer to `apps/frontend/API_DOCUMENTATION.md` for API details).
*   **Webhooks:** Processes incoming webhooks from various services (e.g., Clerk, Nango, Inngest itself) to trigger workflows or update data.
*   **Third-Party Integrations:** Facilitates server-side interactions with external services, often orchestrated through the `packages/integrations` module.

## Why Next.js for the Backend?

Using Next.js for a dedicated backend might seem unconventional. This choice was made to leverage the benefits of the Next.js ecosystem, such as:

*   **Unified Development Experience:** Maintaining a single framework across both frontend and backend (API routes, serverless functions) can simplify development, shared tooling, and learning curves within a monorepo.
*   **Serverless Deployment:** Next.js API routes and `getServerSideProps`/`getStaticProps` functions are naturally suited for serverless deployments (e.g., Vercel), allowing for scalable and cost-effective operations.
*   **File-system based API Routing:** Simplifies API creation and organization.

## Technologies

*   **Framework:** Next.js
*   **Workflow Engine:** Inngest
*   **Authentication Integration:** Clerk (for webhook handling)
*   **External Service Integration:** Nango
*   **Database Interaction:** Prisma (via `packages/db`)

## Local Development

To run the backend application locally:

1.  Ensure you have followed the main [Getting Started Guide](../../docs/GETTING_STARTED.md) to set up your environment and dependencies.
2.  Make sure your `.env` file at the project root is correctly configured, especially with Inngest, Clerk, and database related environment variables.
3.  Start the development server from the project root:
    ```bash
    pnpm dev
    ```
    Alternatively, you can navigate into this directory and run:
    ```bash
    cd apps/inngest-app
    pnpm dev
    ```
4.  The Inngest backend application should be accessible at `http://localhost:3001` (or as configured in `INNGEST_APP_URL`). The API endpoints will typically be under `/api/inngest` or other defined routes.
