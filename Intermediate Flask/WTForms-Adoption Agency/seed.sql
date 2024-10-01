
DROP DATABASE IF EXISTS  adopt;

CREATE DATABASE adopt;

\c adopt

CREATE TABLE pets
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  photo_url TEXT,
  age INT,
  notes TEXT,
  available BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO pets
  (name, species, photo_url, age, notes, available)
VALUES
  ('Dolly', 'dog', 'https://en.wikipedia.org/wiki/German_Shepherd#/media/File:German_Shepherd_-_DSC_0346_(10096362833).jpg', 3, 'Majestic looking.', 't'),
  ('Biggy', 'cat', 'https://wallpapers.com/images/high/fat-cat-pictures-900-x-1200-53opd8afuf46tulf.webp', 4, 'Goofy!', 't'),
  ('Jacky', 'dog', 'https://en.wikipedia.org/wiki/Pit_bull#/media/File:Pit_bull_with_cropped_ears_at_SFACC.jpg', null, null, 't'),
  ('Rosetta', 'cat', null, null, null, 't'),
  ('Big Dawg', 'dog', null, null, null, 't');

