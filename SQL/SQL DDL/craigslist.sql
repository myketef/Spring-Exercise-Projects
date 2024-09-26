DROP DATABASE IF EXISTS craigslist;
CREATE DATABASE craigslist;

\c craigslist;

CREATE TABLE regions
(
  region_id SERIAL PRIMARY KEY,
  name VARCHAR (100)
);

CREATE TABLE users
(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR (30) NOT NULL,
  name VARCHAR (100),
  date_of_birth DATE,
  region_id INT REFERENCES regions(region_id) ON DELETE SET NULL
);

CREATE TABLE categories
(
  category_id SERIAL PRIMARY KEY,
  name VARCHAR (100) NOT NULL
);

CREATE TABLE posts
(
  post_id SERIAL PRIMARY KEY,
  author_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  title TEXT,
  text TEXT,
  location VARCHAR(100),
  region_id INT REFERENCES regions(region_id) ON DELETE SET NULL,
  created_on DATE,
  categories TEXT[]
);

-- Create a junction table for posts and categories
CREATE TABLE post_category
(
  post_id INT REFERENCES posts(post_id) ON DELETE CASCADE,
  category_id INT REFERENCES categories(category_id) ON DELETE CASCADE
);

-- Insert data into regions table
INSERT INTO regions (name) VALUES
  ('San Jose'),
  ('Atlanta'),
  ('Seattle');

-- Insert data into categories table
INSERT INTO categories (name) VALUES
  ('Electronics'),
  ('Furniture'),
  ('Jobs'),
  ('Housing');

-- Insert data into users table
INSERT INTO users (username, name, date_of_birth, region_id) VALUES
  ('john_doe', 'John Smith', '1999-05-15', 1),
  ('jane_smith', 'Jane Doe', '1983-08-22', 2),
  ('bob_johnson', 'Bob Robinson', '2001-02-10', 3);

-- Insert data into posts table
INSERT INTO posts (author_id, title, text, location, region_id, created_on, categories) VALUES
  (1, 'Used Laptop for Sale', 'Good condition, 8GB RAM, 256GB SSD', 'Downtown NY', 1, '2024-01-10', ARRAY['Electronics']),
  (2, 'Comfortable Sofa', 'Large, Blue color, good condition', 'Midtown Atlanta', 2, '2024-08-05', ARRAY['Furniture']),
  (3, 'Job Opportunity: Software Developer', 'Full-time position, Competitive salary', 'Michigan Area', 3, '2024-09-10', ARRAY['Jobs']),
  (1, '3-Bedroom Apartment for Rent', 'Spacious, Great location', 'San Jose', 1, '2024-07-15', ARRAY['Housing', 'Jobs']);

-- Insert data into post_category table
INSERT INTO post_category (post_id, category_id) 
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4);