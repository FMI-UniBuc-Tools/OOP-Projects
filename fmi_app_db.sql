DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS admin;
DROP TYPE IF EXISTS colors;
DROP TABLE IF EXISTS dbuser;

CREATE TABLE dbuser (
	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	surname VARCHAR(20) NOT NULL,
	name VARCHAR(20) NOT NULL,
	initial VARCHAR(4),
	email VARCHAR(70) NOT NULL,
	password TEXT NOT NULL
);

CREATE TABLE admin (
	id INTEGER REFERENCES dbuser (id) PRIMARY KEY,
	type VARCHAR(20) NOT NULL
);

CREATE TABLE student (
	id INTEGER REFERENCES dbuser (id) PRIMARY KEY,
	github TEXT
);

CREATE TYPE colors AS ENUM ('yellow', 'orange', 'red');

CREATE TABLE project (
	id INTEGER GENERATED ALWAYS AS IDENTITY,
	student_id INTEGER REFERENCES student (id),
	name VARCHAR(50) NOT NULL,
	link TEXT NOT NULL,
	starred BOOLEAN NOT NULL DEFAULT FALSE,
	observations TEXT,
	outdated colors,
	PRIMARY KEY (id, student_id)
);