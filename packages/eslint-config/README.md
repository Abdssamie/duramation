# packages/eslint-config

This package provides a collection of shared ESLint configurations for the Duramation monorepo. Its purpose is to enforce consistent code style, best practices, and catch potential errors across all applications and packages within the project. By centralizing ESLint configurations, we ensure a unified and high-quality codebase.

## Purpose

*   **Code Consistency:** Ensures all TypeScript and JavaScript code adheres to a predefined style guide.
*   **Error Prevention:** catches common programming errors and anti-patterns early in the development cycle.
*   **Best Practices:** Promotes modern and efficient coding practices.
*   **Reduced Configuration Overhead:** Developers don't need to configure ESLint individually for each project; they simply extend these shared configurations.

## Usage

To use these ESLint configurations in an application or package:

1.  **Install dependencies:** Ensure this package is a `devDependency` in your `package.json`.
2.  **Extend configuration:** In your project's `.eslintrc.js` or `.eslintrc.json` file, extend the desired configuration from this package.

    Example `.eslintrc.js`:
    ```javascript
    /** @type {import("eslint").Linter.Config} */
    module.exports = {
      root: true,
      extends: ["@repo/eslint-config/base"], // or "nextjs", "react", etc.
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: true,
      },
    };
    ```

## Configurations Available

*   `@repo/eslint-config/base`: Base configuration for TypeScript and JavaScript projects.
*   `@repo/eslint-config/nextjs`: Configuration specifically for Next.js projects.
*   `@repo/eslint-config/react`: Configuration for React projects (if different from Next.js).

Check the `index.js`, `nextjs.js`, `react.js` files within this package for the exact rules defined.

## Running ESLint

You can run ESLint checks from the project root using `pnpm lint` or within individual projects as configured in their `package.json` scripts.