--======================================================================================================
--                                                                                                      
--  #####    ####           ####   #####   ###    ###  ###    ###    ###    ##     ##  ####     ####  
--  ##  ##  ##             ##     ##   ##  ## #  # ##  ## #  # ##   ## ##   ####   ##  ##  ##  ##     
--  #####   ##  ###        ##     ##   ##  ##  ##  ##  ##  ##  ##  ##   ##  ##  ## ##  ##  ##   ###   
--  ##      ##   ##        ##     ##   ##  ##      ##  ##      ##  #######  ##    ###  ##  ##     ##  
--  ##       ####           ####   #####   ##      ##  ##      ##  ##   ##  ##     ##  ####    ####   
--                                                                                                      
--======================================================================================================


CREATE DATABASE <database_name>;

GRANT ALL PRIVILEGES ON DATABASE <database_name> TO <database_user>;

CREATE TYPE gender AS ENUM ('male', 'female', 'transsexual', 'other');

CREATE TABLE users (
  id SERIAL  PRIMARY KEY,
  user_name VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR (50) NOT NULL,
  first_name VARCHAR (50),
  last_name VARCHAR (50),
  email VARCHAR (50) NOT NULL UNIQUE,
  phone VARCHAR (50),
  gender gender DEFAULT 'other',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE,
  is_super_admin BOOLEAN DEFAULT FALSE,
  is_blocked BOOLEAN DEFAULT FALSE
);

-- Password is 12345678 and hashed by bcryptjs salt 7
INSERT INTO users (
  user_name,
  password,
  first_name,
  last_name,
  email,
  phone,
  gender,
  is_active,
  is_verified,
  is_admin,
  is_super_admin,
  is_blocked
)
VALUES (
  'kasra',
  '$2a$07$r66gkFrxBP5L5/XSd4No4eY.Z/UGu.56F/neHhsLjAwydlPvUnocO',
  'Kasra',
  'Karami',
  'kasra.karami.kk@gmail.com',
  '09123456789',
  'male',
  TRUE,
  TRUE,
  TRUE,
  TRUE,
  FALSE
);

SELECT * FROM users;