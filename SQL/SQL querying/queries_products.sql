-- Comments in SQL Start with dash-dash --

-- Add a product to the table with the name of “chair”, price of 44.00, and can_be_returned of false. --
INSERT INTO products (name, price, can_be_returned) VALUES ('chair', 44.0, false);

-- Add a product to the table with the name of “stool”, price of 25.99, and can_be_returned of true. --
INSERT INTO products (name, price, can_be_returned) VALUES ('stool', 25.99, true);

-- Add a product to the table with the name of “table”, price of 124.00, and can_be_returned of false --
INSERT INTO products (name, price, can_be_returned) VALUES ('table', 124.00, false);

-- Display all of the rows and columns in the table.--
SELECT * FROM products;

-- Display all of the names of the products. --
SELECT name FROM products;

-- Display all of the names and prices of the products.--
SELECT name, price FROM products;

-- Add a new product - make up whatever you would like! --
INSERT INTO products (name, price, can_be_returned) VALUES ('bed', 254.09, false);

-- Display only the products that can_be_returned --
SELECT name, can_be_returned from PRODUCTS WHERE can_be_returned = true;

-- Display only the products that have a price less than 44.00. --
SELECT name, price from PRODUCTS WHERE price > 44.00;

-- Display only the products that have a price in between 22.50 and 99.99. --
SELECT name, price FROM PRODUCTS WHERE price BETWEEN 22.50 and 99.99;

--  Update all products set price $20 off!. --
UPDATE products SET price = price * 0.8;

-- Remove all products whose price meets this criteria. --
DELETE FROM products WHERE price < 25;

-- Increase remaining product price by $20. --
UPDATE products SET price = price + 25;

-- Update databese to everything is returnable --
UPDATE products SET can_be_returned = true;