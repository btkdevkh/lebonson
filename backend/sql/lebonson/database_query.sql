CREATE TABLE "user_lbs" (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  zip int NOT NULL,
  city VARCHAR(255) NOT NULL,
  creationtimestamp TIMESTAMP,
  role VARCHAR(255) NOT NULL
);

CREATE TABLE "product_lbs" (
  id SERIAL PRIMARY KEY,
  title varchar(90) NOT NULL,
  price float NOT NULL,
  image varchar(90) NOT NULL,
  quantity int NOT NULL,
  creationtimestamp TIMESTAMP NOT NULL,
  description text NOT NULL
);

CREATE TABLE "orders_lbs" (
  id SERIAL PRIMARY KEY,
  user_id int NOT NULL,
  totalAmount float NOT NULL,
  creationtimestamp TIMESTAMP NOT NULL,
  status varchar(45) NOT NULL
);

CREATE TABLE "orderdetail_lbs" (
  id SERIAL PRIMARY KEY,
  order_id int NOT NULL,
  product_id int NOT NULL,
  quantity int NOT NULL,
  total float NOT NULL
);
