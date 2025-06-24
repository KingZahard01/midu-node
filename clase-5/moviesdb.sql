-- CREACION DE BASE DE DATOS
-- DROP DATABASE IF EXISTS moviesdb;
-- CREATE DATABASE moviesdb;

-- USAR
-- USE moviesdb;
-- 
-- CREAR LA TABLA MOVIES
-- CREATE TABLE movie (
-- 	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
-- 	title VARCHAR(255) NOT NULL,
-- 	year INT NOT NULL,
-- 	director VARCHAR(255) NOT NULL,
-- 	duration INT NOT NULL,
-- 	poster TEXT,
-- 	rate DECIMAL(2, 1) NOT NULL
-- );
-- 
-- CREATE TABLE genre (
-- 	id INT AUTO_INCREMENT PRIMARY KEY,
-- 	name VARCHAR(255) NOT NULL UNIQUE
-- );
-- 
-- CREATE TABLE movie_genre (
-- 	movie_id BINARY(16) REFERENCES movies(id),
-- 	genre_id INT REFERENCES genres(id),
-- 	PRIMARY KEY (movie_id), (genre_id)
-- );
-- 
-- INSERT INTO genre (name) VALUES 
-- ('Action'),
-- ('Adventure'),
-- ('Comedy'),
-- ('Crime'),
-- ('Drama'),
-- ('Fantasy'),
-- ('Horror'),
-- ('Thriller'),
-- ('Sci-Fi'),
-- ('Romance');
-- 
-- INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
-- (UUID_TO_BIN(UUID()), "The Shawshank Redemption", 1994, "Frank Darabont", 142, "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp", 9.3),
-- (UUID_TO_BIN(UUID()), "The Dark Knight", 2008, "Christopher Nolan", 152, "https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg", 9.0),
-- (UUID_TO_BIN(UUID()), "Inception", 2010, "Christopher Nolan", 148, "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg", 8.8);
-- 
-- INSERT INTO movie_genres (movie_id, genre_id) VALUES 
-- ((SELECT id FROM movie WHERE title = 'The Shawshank Redemption'), (SELECT id FROM genre WHERE name = 'Drama')),
-- ((SELECT id FROM movie WHERE title = 'The Dark Knight'), (SELECT id FROM genre WHERE name = 'Action')),
-- ((SELECT id FROM movie WHERE title = 'The Dark Knight'), (SELECT id FROM genre WHERE name = 'Crime')),
-- ((SELECT id FROM movie WHERE title = 'The Dark Knight'), (SELECT id FROM genre WHERE name = 'Drama')),
-- ((SELECT id FROM movie WHERE title = 'Inception'), (SELECT id FROM genre WHERE name = 'Action')),
-- ((SELECT id FROM movie WHERE title = 'Inception'), (SELECT id FROM genre WHERE name = 'Adventure')),
-- ((SELECT id FROM movie WHERE title = 'Inception'), (SELECT id FROM genre WHERE name = 'Sci-Fi'));
-- 
-- SELECT * FROM movie;


-- CREACION DE BASE DE DATOS
DROP DATABASE IF EXISTS moviesdb;
CREATE DATABASE moviesdb;

USE moviesdb;

-- CREAR LA TABLA MOVIES
CREATE TABLE movie (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    director VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    poster TEXT,
    rate DECIMAL(2, 1) NOT NULL
);

CREATE TABLE genre (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE movie_genre (
    movie_id BINARY(16),
    genre_id INT,
    PRIMARY KEY (movie_id, genre_id),
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genre(id) ON DELETE CASCADE
);

-- Insertar géneros
INSERT INTO genre (name) VALUES 
('Action'),
('Adventure'),
('Comedy'),
('Crime'),
('Drama'),
('Fantasy'),
('Horror'),
('Thriller'),
('Sci-Fi'),
('Romance');

-- Insertar películas
INSERT INTO movie (title, year, director, duration, poster, rate) VALUES
("The Shawshank Redemption", 1994, "Frank Darabont", 142, "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp", 9.3),
("The Dark Knight", 2008, "Christopher Nolan", 152, "https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg", 9.0),
("Inception", 2010, "Christopher Nolan", 148, "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg", 8.8);

-- Insertar relaciones película-género
INSERT INTO movie_genre (movie_id, genre_id) VALUES 
((SELECT id FROM movie WHERE title = 'The Shawshank Redemption' LIMIT 1), (SELECT id FROM genre WHERE name = 'Drama' LIMIT 1)),
((SELECT id FROM movie WHERE title = 'The Dark Knight' LIMIT 1), (SELECT id FROM genre WHERE name = 'Action' LIMIT 1)),
((SELECT id FROM movie WHERE title = 'The Dark Knight' LIMIT 1), (SELECT id FROM genre WHERE name = 'Crime' LIMIT 1)),
((SELECT id FROM movie WHERE title = 'The Dark Knight' LIMIT 1), (SELECT id FROM genre WHERE name = 'Drama' LIMIT 1)),
((SELECT id FROM movie WHERE title = 'Inception' LIMIT 1), (SELECT id FROM genre WHERE name = 'Action' LIMIT 1)),
((SELECT id FROM movie WHERE title = 'Inception' LIMIT 1), (SELECT id FROM genre WHERE name = 'Adventure' LIMIT 1)),
((SELECT id FROM movie WHERE title = 'Inception' LIMIT 1), (SELECT id FROM genre WHERE name = 'Sci-Fi' LIMIT 1));

SELECT * FROM movie;


