CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password bytea(200) NOT NULL,
); 

CREATE TABLE IF NOT EXISTS hikes (
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES users(user_id),
	hike_id VARCHAR(200),
	title VARCHAR(200),
	state VARCHAR(200),
	park VARCHAR(200),
	summary VARCHAR(1000),
	summary_long VARCHAR(10000),
	duration VARCHAR(50),
	time VARCHAR(50),
	pets VARCHAR(50),
	pets_info VARCHAR(1000),
	reservation VARCHAR(50),
	fee VARCHAR(50),
	fee_info VARCHAR(1000),
	age VARCHAR(50),
	image VARCHAR(1000)
	)