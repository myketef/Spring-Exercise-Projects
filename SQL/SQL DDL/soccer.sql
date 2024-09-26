DROP DATABASE IF EXISTS soccer;
CREATE DATABASE soccer;

\c soccer;

CREATE TABLE teams (
  team_id SERIAL PRIMARY KEY,
  team_name VARCHAR(100) NOT NULL
);

CREATE TABLE players (
  player_id SERIAL PRIMARY KEY,
  player_name VARCHAR(100) NOT NULL,
  team_id INT REFERENCES teams ON DELETE CASCADE
);

CREATE TABLE referees (
  referee_id SERIAL PRIMARY KEY,
  referee_name VARCHAR(100) NOT NULL
);

CREATE TABLE matches (
  match_id SERIAL PRIMARY KEY,
  home_team_id INT NOT NULL REFERENCES teams ON DELETE CASCADE,
  away_team_id INT NOT NULL REFERENCES teams ON DELETE CASCADE,
  match_date DATE,
  referee_id INT REFERENCES referees ON DELETE SET NULL
);

CREATE TABLE goals (
  goal_id SERIAL PRIMARY KEY,
  player_id INT NOT NULL REFERENCES players ON DELETE CASCADE,
  match_id INT NOT NULL REFERENCES matches ON DELETE CASCADE,
  goal_time TIME
);

CREATE TABLE seasons (
  season_id SERIAL PRIMARY KEY,
  start_date DATE,
  end_date DATE
);

CREATE TABLE matches_seasons (
  match_id INT REFERENCES matches ON DELETE CASCADE,
  season_id INT REFERENCES seasons ON DELETE CASCADE,
  PRIMARY KEY (match_id, season_id)
);

-- Insert data into teams table
INSERT INTO teams (team_name) VALUES
  ('Team A'),
  ('Team B'),
  ('Team C');

-- Insert data into players table
INSERT INTO players (player_name, team_id) 
VALUES
  ('Player 1', 1),
  ('Player 2', 1),
  ('Player 3', 2),
  ('Player 4', 2),
  ('Player 5', 3),
  ('Player 6', 3);

-- Insert data into referees table
INSERT INTO referees (referee_name) 
VALUES
  ('Referee X'),
  ('Referee Y');

-- Insert data into matches table
INSERT INTO matches (home_team_id, away_team_id, match_date, referee_id) VALUES
  (1, 2, '2024-01-10', 1),
  (2, 3, '2024-02-05', 2),
  (3, 1, '2024-03-20', 1);

-- Insert data into goals table
INSERT INTO goals (player_id, match_id, goal_time) 
VALUES
  (1, 1, '00:15'),
  (2, 1, '01:30'),
  (3, 2, '00:45'),
  (4, 2, '02:10'),
  (5, 3, '01:20'),
  (6, 3, '03:05');

-- Insert data into seasons table
INSERT INTO seasons (start_date, end_date) 
VALUES
  ('2024-01-01', '2024-12-31');

-- Insert data into matches_seasons table
INSERT INTO matches_seasons (match_id, season_id) 
VALUES
  (1, 1),
  (2, 1),
  (3, 1);
