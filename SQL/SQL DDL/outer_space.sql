-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;
CREATE DATABASE outer_space;

\c outer_space

CREATE TABLE celestial_bodies
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL 
);

CREATE TABLE galaxies
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE planets
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbital_period_in_years FLOAT NOT NULL,
  celestial_body_id INT REFERENCES celestial_bodies(id) ON DELETE CASCADE,
  galaxy_id INT REFERENCES galaxies(id) ON DELETE SET NULL
);

CREATE TABLE moons
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  celestial_body_id INT REFERENCES celestial_bodies(id) ON DELETE CASCADE
);

CREATE TABLE orbits
(
  id SERIAL PRIMARY KEY,
  planet_id INT NOT NULL REFERENCES planets(id) ON DELETE CASCADE,
  moon_id INT NOT NULL REFERENCES celestial_bodies(id) ON DELETE CASCADE,
  orbital_period_in_years FLOAT NOT NULL
);

-- Sample data for celestial bodies
INSERT INTO celestial_bodies (name, type) 
VALUES
  ('The Sun', 'Star'),
  ('Earth', 'Planet'),
  ('The Moon', 'Moon'),
  ('Mars', 'Planet'),
  ('Phobos', 'Moon'),
  ('Deimos', 'Moon');

-- Sample data for galaxies
INSERT INTO galaxies (name) 
VALUES
  ('Milky Way'),
  ('Andromeda');

-- Sample data for planets
INSERT INTO planets (name, orbital_period_in_years, celestial_body_id, galaxy_id) 
VALUES
  ('Earth', 1.00, 2, 1),
  ('Mars', 1.88, 4, 1);

-- Sample data for moons
INSERT INTO moons (name, celestial_body_id) 
VALUES
  ('The Moon', 3),
  ('Phobos', 5),
  ('Deimos', 6);

-- Sample data for orbits
INSERT INTO orbits (planet_id, moon_id, orbital_period_in_years) 
VALUES
  (2, 5, 0.32),
  (2, 6, 1.23);