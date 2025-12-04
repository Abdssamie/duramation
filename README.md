# Duramation

Duramation is a powerful workflow automation platform designed to streamline and automate complex processes. Built as a monorepo, it leverages modern web technologies to provide a flexible and scalable solution for defining, executing, and managing automated workflows.

## Features

*   **Workflow Automation:** Define and execute custom workflows to automate repetitive tasks.
*   **External Integrations:** Seamlessly connect with third-party services using Nango for data exchange and trigger events.
*   **Robust Backend:** Powered by Inngest for reliable and scalable workflow execution.
*   **Intuitive Frontend:** A modern and responsive user interface built with Next.js, Radix-UI, and Tailwind CSS.
*   **Authentication & Authorization:** Secure user management and access control using Clerk.

## Technologies Used

*   **Monorepo Management:** Turborepo, pnpm
*   **Framework:** Next.js (for both frontend and backend API)
*   **Workflow Engine:** Inngest
*   **Authentication:** Clerk
*   **Integrations:** Nango
*   **UI/UX:** React, Radix-UI, Tailwind CSS
*   **Language:** TypeScript
*   **Deployment:** Vercel

## Getting Started

To get a local copy up and running, follow the detailed instructions in our [Getting Started Guide](/apps/docs/docs/getting-started). This guide will walk you through setting up your development environment, installing dependencies, configuring environment variables, and running the applications.

## Usage

Once the application is up and running, you can:

*   Access the frontend application in your browser to define and manage your workflows.
*   Utilize the backend API to programmatically control and interact with your automated processes. Refer to `apps/frontend/API_DOCUMENTATION.md` for API details.

## Project Structure

This project is a monorepo managed with Turborepo and pnpm. It contains the following main workspaces:

*   `apps/frontend`: The Next.js frontend application providing the user interface.
*   `apps/inngest-app`: The Next.js backend application, responsible for Inngest workflow execution and API handling.
*   `packages/db`: Database-related configurations, schemas, and utilities.
*   `packages/eslint-config`: Shared ESLint configurations for consistent code style.
*   `packages/integrations`: Contains logic for integrating with various third-party services via Nango.
*   `packages/shared`: Common utilities, types, and components shared across applications and packages.
*   `packages/typescript-config`: Shared TypeScript configurations.

## Contributing

We welcome contributions! Please see our [Contribution Guidelines](./CONTRIBUTING.md) (coming soon) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.