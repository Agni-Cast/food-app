CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password bytea(200) NOT NULL,
); 

CREATE TABLE IF NOT EXISTS hikes (
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES users(user_id),
	hike_id VARCHAR(200),
	"title" VARCHAR(200),
	"parkSource" VARCHAR(200),
	"state" VARCHAR(200),
	"shortDescription" VARCHAR(5000),
	"longDescription" VARCHAR(20000),
	"duration" VARCHAR(50),
	time VARCHAR(50),
	"arePetsPermitted" VARCHAR(50),
	"petsDescription" VARCHAR(2000),
	"isReservationRequired" VARCHAR(50),
	"doFeesApply" VARCHAR(50),
	"feeDescription" VARCHAR(2000),
	"age" VARCHAR(50),
	image VARCHAR(2000)
	)

	CREATE TABLE IF NOT EXISTS completed (
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES users(user_id),
	hike_id VARCHAR(200),
	"title" VARCHAR(200),
	"parkSource" VARCHAR(200),
	"state" VARCHAR(200),
	"shortDescription" VARCHAR(5000),
	"longDescription" VARCHAR(20000),
	"duration" VARCHAR(50),
	time VARCHAR(50),
	"arePetsPermitted" VARCHAR(50),
	"petsDescription" VARCHAR(2000),
	"isReservationRequired" VARCHAR(50),
	"doFeesApply" VARCHAR(50),
	"feeDescription" VARCHAR(2000),
	"age" VARCHAR(50),
	image VARCHAR(2000)
	)