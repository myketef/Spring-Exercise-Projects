-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

-- Create tables for passengers, flights, airlines, and locations
CREATE TABLE passengers
(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE locations
(
  id SERIAL PRIMARY KEY,
  city TEXT NOT NULL,
  country TEXT NOT NULL
);

CREATE TABLE airlines
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE flights
(
  id SERIAL PRIMARY KEY,
  seat TEXT NOT NULL,
  departure TIMESTAMP NOT NULL,
  arrival TIMESTAMP NOT NULL,
  passenger_id INT REFERENCES passengers(id) ON DELETE CASCADE,
  airline_id INT REFERENCES airlines(id) ON DELETE CASCADE,
  from_location_id INT REFERENCES locations(id) ON DELETE CASCADE,
  to_location_id INT REFERENCES locations(id) ON DELETE CASCADE
);

-- Sample data for passengers, locations, airlines, and flights
INSERT INTO passengers (first_name, last_name) 
VALUES
  ('Jen', 'Garry'),
  ('Theodor', 'Hemsworth'),
  ('Solam', 'Pauley'),
  ('Brithney', 'Michell'),
  ('Fernando', 'Wycliff'),
  ('Kalci', 'Doe'),
  ('John', 'Squeal'),;

INSERT INTO locations (city, country) 
VALUES
  ('Tokyo', 'Japan'),
  ('Washington DC', 'United States'),
  ('Seattle', 'United States'),
  ('Mexico City', 'Mexico'),
  ('Beijing', 'China'),
  ('Dubai', 'UAE'),
  ('Las Vegas', 'United States'),
  ('Casablanca', 'Morocco'),
  ('New York', 'United States'),
  ('Chicago', 'United States'),
  ('Sao Paolo', 'Brazil'),
  ('Los Angeles', 'United States'),
  ('London', 'United Kingdom'),
  ('Buenos Aires', 'Argentina'),
  ('Berlin', 'Germany'),
  ('Paris', 'France'),
  ('New Hampshire', 'United States');

INSERT INTO airlines (name) 
VALUES
  ('Emirates'),
  ('British Airways'),
  ('Delta'),
  ('Ethiopian AirLines'), 
  ('Air China'),
  ('American Airlines'),
  ('Lufthansa');

INSERT INTO flights (seat, departure, arrival, passenger_id, airline_id, from_location_id, to_location_id) 
VALUES
  ('33B', '2024-04-08 09:00:00', '2024-04-08 12:00:00', 1, 1, 1, 14),
  ('8A', '2024-12-19 12:45:00', '2024-12-19 16:15:00', 2, 2, 2, 13),
  ('12F', '2023-01-02 07:00:00', '2023-01-02 08:03:00', 3, 3, 3, 12),
  ('20A', '2024-04-15 16:50:00', '2024-04-15 21:00:00', 1, 3, 4, 11),
  ('23D', '2023-08-01 18:30:00', '2023-08-01 21:50:00', 4, 4, 5, 10),
  ('18C', '2024-10-31 01:15:00', '2024-10-31 12:55:00', 2, 5, 6, 9),
  ('9E', '2023-02-06 06:00:00', '2023-02-06 07:47:00', 6, 1, 7, 8),
  ('1A', '2023-12-22 14:42:00', '2023-12-22 15:56:00', 7, 6, 8, 7),
  ('32B', '2024-02-06 16:28:00', '2024-02-06 19:18:00', 6, 6, 9, 6),
  ('10D', '2023-01-20 19:30:00', '2024-01-20 22:45:00', 7, 7, 11, 5);