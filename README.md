# Online Indian Store - Full Stack Edition

This project is a full-stack application for an online Indian store, featuring a React frontend, a Node.js/Express.js backend, and a PostgreSQL database. It includes product display, an admin panel for product management, and JWT-based authentication for admin operations.

## 1. Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js and npm (or yarn):** Required for both frontend and backend. Download from [https://nodejs.org/](https://nodejs.org/).
-   **React Developer Tools:** Recommended for frontend development (browser extension).
-   **PostgreSQL:** The database system used for this project. Ensure it's installed and running.

## 2. Project Structure

-   `public/`: Contains static assets for the frontend like `index.html` and global CSS.
-   `src/`: Contains the React application source code.
    -   `components/`: Reusable UI components for the frontend.
        -   `admin/`: Components specific to the Admin Panel.
    -   `App.js`: The main application component.
    -   `index.js`: The entry point for the React application.
    -   `App.css`: Global styles for the App component.
-   `server/`: Contains the Node.js/Express.js backend application.
    -   `routes/`: API route definitions (e.g., `productRoutes.js`, `authRoutes.js`).
    -   `middleware/`: Custom middleware (e.g., `authMiddleware.js`).
    -   `scripts/`: Utility scripts (e.g., `createAdmin.js`).
    -   `db.js`: PostgreSQL connection pool setup.
    -   `server.js`: The main backend server entry point.
    -   `db_schema.sql`: DDL statements for creating the database schema.
    -   `.env`: Environment variable configuration file (gitignored).
    -   `package.json`: Backend dependencies and scripts.
-   `package.json`: Frontend project dependencies and scripts.
-   `babel.config.js`: Configuration for Babel transpiler (frontend).
-   `src/webpack.config.js`: Webpack configuration for the frontend.

## 3. Environment Variables

### Backend (`server/.env`)

Create a `.env` file in the `server/` directory with the following variables. A `server/.env.example` might be provided, copy it to `server/.env`.

```env
# Backend Server Configuration
PORT=3001

# PostgreSQL Database Connection Details
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432

# JWT Secret for Admin Authentication
JWT_SECRET=yoursupersecretkeythatshouldbeverylongandrandom # IMPORTANT: Change this for production!
```

## 4. Setup and Running

Follow these steps in order:

### 4.1. Database Setup (PostgreSQL)

This section provides detailed steps for setting up PostgreSQL on an Ubuntu system. For other operating systems, please refer to the [official PostgreSQL documentation](https://www.postgresql.org/download/).

1.  **Install PostgreSQL on Ubuntu:**
    Open your terminal and run the following commands to install PostgreSQL and its client utilities:
    ```bash
    sudo apt update
    sudo apt install postgresql postgresql-contrib
    ```
    Once installed, PostgreSQL service should start automatically. You can enable it to start on boot and check its status:
    ```bash
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
    sudo systemctl status postgresql 
    ```
    If it's active, you're good to go. Press `q` to exit the status view.

2.  **Create a PostgreSQL User and Database:**
    For security, it's best to create a dedicated PostgreSQL user (role) for your application.
    Switch to the `postgres` system user, which is the default superuser for PostgreSQL:
    ```bash
    sudo -i -u postgres
    ```
    Now, within the `postgres` user's session, create a new database user. The `--interactive` flag will prompt you for the username, and `--pwprompt` will prompt for a password. Choose a strong password.
    ```bash
    createuser --interactive --pwprompt
    ```
    Let's say you chose `your_db_user` as the username.
    Next, create the database itself, owned by the user you just created. Replace `your_db_name` with the name you intend to use in `server/.env`, and `your_db_user` with the username you just created.
    ```bash
    createdb your_db_name -O your_db_user
    ```
    You can list your databases with `\l` and users with `\du` in the `psql` prompt (type `psql` to enter it, `\q` to exit `psql`).
    Exit the `postgres` user session to return to your regular user:
    ```bash
    exit
    ```

3.  **Connect and Configure `server/.env`:**
    Ensure that the `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_HOST` (usually `localhost`), and `DB_PORT` (usually `5432`) variables in your `server/.env` file *exactly match* the PostgreSQL user, password, database name, host, and port you've set up.

4.  **Set Up Database Schema:**
    The `server/db_schema.sql` file contains the DDL (Data Definition Language) to create the necessary tables and functions for the application.
    Navigate to the project's root directory in your terminal.
    Run the following command to execute the schema script. Replace `your_db_user` and `your_db_name` with the credentials you configured.
    ```bash
    psql -U your_db_user -d your_db_name -h localhost -f server/db_schema.sql
    ```
    You will be prompted for the password for `your_db_user`. If the script runs without errors, your schema is set up.

5.  **Create Admin User for the Application:**
    After the database and schema are successfully set up and your `server/.env` file is correctly configured with the database connection details, you can create the application's admin user.
    Navigate to the `server` directory and run:
    ```bash
    cd server
    npm install # If you haven't installed backend dependencies yet
    npm run create-admin
    ```
    This script connects to the database (specified in `server/.env`) and creates a user named `shopadmin` in the `users` table.
    The script will output:
    -   **Username:** `shopadmin`
    -   **Password:** `password123` (as defined in `server/scripts/createAdmin.js`)

    **IMPORTANT:**
    *   For a real environment, change the default password in `server/scripts/createAdmin.js` *before* running the script or use a more secure method for user provisioning.
    *   The script will update the password if the admin user already exists.

### 4.2. Backend Setup

1.  **Navigate to Server Directory:**
    ```bash
    cd server
    ```

2.  **Install Backend Dependencies:**
    ```bash
    npm install
    ```

3.  **Run the Backend Development Server:**
    This command uses `nodemon` for automatic restarts on file changes. Ensure your `server/.env` file is configured.
    ```bash
    npm run dev
    ```
    The backend server will typically start on the port specified in `server/.env` (e.g., `http://localhost:3001`).

    Alternatively, for production-like execution (without `nodemon`):
    ```bash
    npm start
    ```

### 4.3. Frontend Setup

1.  **Navigate to Project Root (if not already there):**
    If you are in the `server` directory, go back to the root:
    ```bash
    cd ..
    ```

2.  **Install Frontend Dependencies:**
    ```bash
    npm install
    ```
    (If you prefer yarn: `yarn install`)

3.  **Run the Frontend Development Server:**
    Ensure your backend server is already running, as the frontend will make API calls to it.
    ```bash
    npm run dev
    ```
    This will usually open the application in your default web browser (e.g., at `http://localhost:8080`, but the port can vary based on `src/webpack.config.js`).

## 5. Admin Panel

-   **Access:** Once the frontend is running, there should be a button or link (e.g., "Admin Panel") in the UI to navigate to the admin section.
-   **Login:** If you are not logged in as an admin, you will be prompted with a login form.
    -   **Default Username:** `shopadmin`
    -   **Default Password:** `password123` (if created using the `create-admin` script with its default password).
-   **Functionality:** The admin panel allows for creating, viewing, updating, and deleting products in the store.

## 6. Building for Production

### Frontend

To create an optimized build of the React application:
```bash
npm run build
```
The production-ready static files will be placed in the `public/` directory (this is based on the `output.path` in `src/webpack.config.js` being `path.resolve(__dirname, '..', 'public')`).

### Backend

The backend doesn't have a "build" step like the frontend. Ensure all dependencies are installed with `npm install --production` in the `server` directory if you want to exclude devDependencies.

## 7. Deployment Notes

Deploying this full-stack application requires setting up both the frontend and backend components, along with the PostgreSQL database.

### Database (PostgreSQL)

-   Set up PostgreSQL on your server.
-   Ensure the database is created and the schema is applied as per the "Database Setup" section.
-   Configure firewall rules to allow your backend server to connect to the database port (usually 5432).

### Backend (Node.js Application)

1.  **Environment Variables:** Set up all necessary environment variables (as defined in `server/.env`) on your production server. Do NOT commit your production `.env` file to version control. Use your hosting provider's mechanism for setting environment variables.
2.  **Node.js Runtime:** Ensure Node.js is installed on the server.
3.  **Process Manager:** Use a process manager like PM2 or systemd to run the Node.js application (`server/server.js`). This ensures the backend runs continuously and restarts if it crashes.
    Example with PM2:
    ```bash
    cd server
    npm install # Or npm install --production
    pm2 start server.js --name "indian-store-backend"
    ```
4.  **Web Server (Reverse Proxy):** It's common to use a web server like Nginx or Apache in front of the Node.js application to handle SSL termination, load balancing (if applicable), and serve static files efficiently. Configure it to reverse proxy requests to your Node.js app's port (e.g., 3001).

### Frontend (Static Files)

1.  Run `npm run build` to generate the static assets.
2.  Deploy the contents of the build output directory (e.g., `public/`) to your static file hosting service or web server (like Nginx, Apache, Vercel, Netlify).
3.  If using a web server like Nginx, configure it to serve these static files. Ensure it's configured to handle client-side routing (if you add React Router later) by redirecting relevant requests to `index.html`.

This project provides a foundation. Further considerations for production include security hardening, logging, monitoring, database backups, and more robust error handling.
