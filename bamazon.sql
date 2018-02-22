DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(45) NOT NULL,
department_name VARCHAR(45) NOT NULL,
price DECIMAL(5,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price,
stock_quantity)
VALUES ("cell phones", "electronics",600.00, 100);

INSERT INTO products (product_name, department_name, price, 
stock_quantity)
VALUES("laptop","electronics",1000.00,50);

INSERT INTO products (product_name, department_name, price, 
stock_quantity)
VALUES("socks", "clothing", 5.00, 200);

INSERT INTO products (product_name, department_name, price,
stock_quantity)
VALUES("necktie", "clothing", 20.00, 20);

INSERT INTO products (product_name, department_name, price,
stock_quantity)
VALUES ("The Bible", "books", 15.00, 100);

INSERT INTO products (product_name, department_name, price,
stock_quantity)
VALUES("wrist watch","clothing",100.00, 10);

INSERT INTO products (product_name, department_name, price,
stock_quantity)
VALUES ("sunglasses", "clothing", 200.00, 5);

INSERT INTO products (product_name, department_name, price,
stock_quantity)
VALUES ("harry potter", "books", 15.00, 3);

INSERT INTO products (product_name, department_name, price,
stock_quantity)
VALUES ("car wax", "automotive", 7.00,5);

INSERT INTO products (product_name, department_name, price,
stock_quantity)
VALUES ("motor oil", "automotive", 20.00, 50);


