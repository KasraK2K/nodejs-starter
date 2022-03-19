# SOME USEFUL COMMAND

## DOCKER

```bash
docker exec -it <container_id> /bin/bash
docker exec -it <container_id> /bin/bash -c "psql -U postgres"
docker exec -it <container_id> /bin/bash -c "psql -U postgres -c '\l'"
```

---

## POSTGRES

```bash
psql -U <user>
psql -U <user> -h <host> -p <port> -c "CREATE DATABASE <dbname>;"
\l
\c <dbname>
\dt
```

---

### Create Database

```postgres
CREATE DATABASE <database_name>;
```

### Create ENUM

```postgres
GRANT ALL PRIVILEGES ON DATABASE <database_name> TO <database_user>;
```

### Create Table

```postgres
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
```

### Insert First User

Password is 12345678 and hashed by bcryptjs salt 7

```postgres
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
```

### Select All Users

```postgres
SELECT * FROM users;
```
