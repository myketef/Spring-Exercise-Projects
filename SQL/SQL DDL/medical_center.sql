DROP DATABASE IF EXISTS clinic;
CREATE DATABASE clinic;

\c clinic;

CREATE TABLE doctors
(
  doctor_id SERIAL PRIMARY KEY,
  name VARCHAR (100) NOT NULL,
  specialization TEXT
);

CREATE TABLE patients
(
  patient_id SERIAL PRIMARY KEY,
  name VARCHAR (100) NOT NULL,
  date_of_birth DATE
);

CREATE TABLE diseases
(
  disease_id SERIAL PRIMARY KEY,
  name TEXT,
  discover_year TEXT
);

CREATE TABLE visits
(
  visit_id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients ON DELETE SET NULL,
  doctor_id INTEGER REFERENCES doctors ON DELETE SET NULL,
  visit_date DATE,
  diagnosis TEXT
);

CREATE TABLE doctors_patients 
(
  id SERIAL PRIMARY KEY,
  doctor_id INTEGER NOT NULL REFERENCES doctors ON DELETE CASCADE,
  patient_id INTEGER NOT NULL REFERENCES patients ON DELETE CASCADE,
  disease_id INTEGER REFERENCES diseases ON DELETE CASCADE
);

-- Insert data into doctors table
INSERT INTO doctors (name, specialization) 
VALUES
  ('Dr. Miller', 'Cardiologist'),
  ('Dr. Nelson', 'Pediatrician'),
  ('Dr. Adams', 'Orthopedic Surgeon');

-- Insert data into patients table
INSERT INTO patients (name, date_of_birth) 
VALUES
  ('John Doe', '1990-05-15'),
  ('Jane Smith', '1985-08-22'),
  ('Bob Johnson', '2000-02-10');

-- Insert data into diseases table
INSERT INTO diseases (name, discover_year) 
VALUES
  ('High blood pressure', '1928'),
  ('Influenza', 'unknown'),
  ('Fracture', 'unknown');

-- Insert data into visits table
INSERT INTO visits (patient_id, doctor_id, visit_date, diagnosis) 
VALUES
  (1, 1, '2024-01-10', 'High blood pressure'),
  (2, 2, '2024-05-05', 'Common cold'),
  (3, 3, '2024-04-20', 'Broken leg');

-- Insert data into doctors_patients table for multiple diseases for a patient
INSERT INTO doctors_patients (doctor_id, patient_id, disease_id) 
VALUES
  (1, 1, 1),
  (2, 1, 2),
  (3, 2, 1),
  (1, 2, 3),
  (2, 3, 2),
  (3, 3, 1);