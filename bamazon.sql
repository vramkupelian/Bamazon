
DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(45) NOT NULL,
department_name VARCHAR(45) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT NOT NULL,
product_sales DECIMAL(10,2) DEFAULT 0,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price,
stock_quantity,product_sales)
VALUES ("cell phones", "electronics",600.00, 100, 60000.00);

INSERT INTO products (product_name, department_name, price,
stock_quantity,product_sales)
VALUES("laptop","electronics",1000.00,50, 50000.00);

INSERT INTO products (product_name, department_name, price,
stock_quantity,product_sales)
VALUES("socks", "clothing", 5.00, 200, 1000.00);

INSERT INTO products (product_name, department_name, price,
stock_quantity,product_sales)
VALUES("necktie", "clothing", 20.00, 20, 400.00);

INSERT INTO products (product_name, department_name, price,
stock_quantity,product_sales)
VALUES ("The Bible", "books", 15.00, 100, 1500.00);

INSERT INTO products (product_name, department_name, price,
stock_quantity,product_sales)
VALUES("wrist watch","clothing",100.00, 10,1000.00);

INSERT INTO products (product_name, department_name, price,
stock_quantity,product_sales)
VALUES ("sunglasses", "clothing", 200.00, 5, 1000.00);

INSERT INTO products (product_name, department_name, price,
stock_quantity,product_sales)
VALUES ("harry potter", "books", 15.00, 3, 2500.00);

INSERT INTO products (product_name, department_name, price,
stock_quantity,product_sales)
VALUES ("car wax", "automotive", 7.00,5, 1000.00);

INSERT INTO products (product_name, department_name, price,
stock_quantity,product_sales)
VALUES ("motor oil", "automotive", 20.00, 50, 100.00);

use bamazonDb;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NULL,
  over_head_costs DECIMAL(10,2) NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("automotive", 2000);

INSERT INTO departments(department_name, over_head_costs)
VALUES("books", 2000);

INSERT INTO departments(department_name, over_head_costs)
VALUES("clothing", 2000);

INSERT INTO departments(department_name, over_head_costs)
VALUES("electronics", 3000);
