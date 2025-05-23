-- server/db_schema.sql
--
-- This SQL script contains the Data Definition Language (DDL) statements
-- for creating the necessary tables (users, products) and triggers
-- for the PostgreSQL database used by the Indian Grocery Store application.
-- It should be run to initialize the database schema.

-- Users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products table for the store
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(2048), -- URL to the product image
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Trigger to update 'updated_at' timestamp on product update
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_products_timestamp') THEN
        CREATE TRIGGER set_products_timestamp
        BEFORE UPDATE ON products
        FOR EACH ROW
        EXECUTE FUNCTION trigger_set_timestamp();
    END IF;
END
$$;

-- Note:
-- The 'shopadmin' user will be added via a script or manually later,
-- not directly in the schema DDL for general setup.
-- Example of inserting a product (for testing, not part of schema):
-- INSERT INTO products (name, description, price, image_url, stock) VALUES
-- ('Masala Chai', 'Aromatic spiced tea', 3.99, 'https://example.com/images/masala_chai.jpg', 100);
