CREATE DATABASE khan;

CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

ALTER TABLE items
ADD COLUMN title VARCHAR(255),
ADD COLUMN extra_info TEXT,
ADD COLUMN metadata JSON,
ADD COLUMN qty INT,
ADD COLUMN price DECIMAL(10, 2),
ADD COLUMN discount DECIMAL(5, 2),
ADD COLUMN pic1 MEDIUMBLOB,
ADD COLUMN pic2 MEDIUMBLOB,
ADD COLUMN pic3 MEDIUMBLOB,
ADD COLUMN pic4 MEDIUMBLOB,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;


CREATE TABLE "items" (
  "id" int NOT NULL AUTO_INCREMENT,
  "name" varchar(255) NOT NULL,
  "description" text,
  "title" varchar(255) DEFAULT NULL,
  "extra_info" text,
  "metadata" json DEFAULT NULL COMMENT '							',
  "qty" int DEFAULT NULL,
  "price" decimal(10,2) DEFAULT NULL,
  "discount" decimal(5,2) DEFAULT NULL,
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  "pic1" blob,
  "pic2" blob,
  "pic3" blob,
  "pic4" blob,
  PRIMARY KEY ("id")
)



select * from items;

CREATE TABLE "users" (
  "id" int NOT NULL AUTO_INCREMENT,
  "username" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,
  "phone_number" varchar(15) NOT NULL,
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  UNIQUE KEY "phone_number" ("phone_number")
);

CREATE TABLE "Admin" (
  "id" int NOT NULL AUTO_INCREMENT,
  "username" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,
  "phone_number" varchar(15) NOT NULL,
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  UNIQUE KEY "phone_number" ("phone_number")
)
