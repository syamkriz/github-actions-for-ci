# Online Indian Store - React Edition

This project is a simple frontend for an online Indian store, built with React.

## Prerequisites

- Node.js and npm (or yarn) installed. You can download Node.js from [https://nodejs.org/](https://nodejs.org/).

## Getting Started

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    Open your terminal in the project root directory and run:
    ```bash
    npm install
    ```
    (If you prefer yarn: `yarn install`)

3.  **Run the development server:**
    To start the application in development mode with hot reloading:
    ```bash
    npm run dev
    ```
    This will usually open the application in your default web browser at `http://localhost:8080` (the port might vary based on webpack dev server config).

4.  **Build for production:**
    To create an optimized build of the application for deployment:
    ```bash
    npm run build
    ```
    The production-ready files will be placed in the `dist/` directory (this might vary based on your Webpack output configuration, check `src/webpack.config.js`).

## Project Structure

- `public/`: Contains static assets like `index.html` and global CSS.
- `src/`: Contains the React application source code.
  - `components/`: Reusable UI components.
  - `App.js`: The main application component.
  - `index.js`: The entry point for the React application.
- `package.json`: Lists project dependencies and scripts.
- `webpack.config.js`: Configuration for Webpack bundler (located in `src/` directory in this project).
- `babel.config.js`: Configuration for Babel transpiler.

## Deployment (General Notes)

To deploy this React application to an Ubuntu server, you would typically:
1. Run `npm run build` to generate static assets.
2. Copy the contents of the build output directory (e.g., `dist/`) to your server (e.g., into `/var/www/html` or a similar directory).
3. Configure a web server like Nginx or Apache to serve these static files.
    - Ensure the web server is configured to handle client-side routing by redirecting all relevant requests to `index.html` if you add React Router later.

This project currently does not include backend functionality or a database. It's a frontend-only application.
