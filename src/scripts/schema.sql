-- This schema is designed to be used with MySQL.

-- An additional relation `Cart` is described in both the requirements and in the diagram, but is described as having a one-to-one relationship with `Customer` in the former and a many-to-one relationship with `Customer` in the latter. The former is preferred here, making `Cart` fully redundant with `Customer` and `Order` and thus excluded from this schema.
CREATE TABLE IF NOT EXISTS Customer (
	customer_id INT PRIMARY KEY AUTO_INCREMENT, -- An additional redundant property `cart_id` is described in both the requirements and in the diagram but is excluded from this schema.
	email VARCHAR(100) NOT NULL UNIQUE,
	`name` VARCHAR(100) NOT NULL,
	phone VARCHAR(100) NOT NULL UNIQUE -- Described in the requirements but not the diagram.
);

-- Described in the requirements but not in the diagram. `Address` is listed as a single-valued property of `Customer` in the diagram but is described as a multiple-valued property in the requirements (the latter is implemented here).
CREATE TABLE IF NOT EXISTS `Address` (
	address_id INT PRIMARY KEY AUTO_INCREMENT, -- Described in neither the requirements nor the diagram, but included to give this relation a primary key.
	customer_id INT NOT NULL,
	is_shipping BOOLEAN NOT NULL, -- Equivalent to "type" from the requirements. The requirements list "shipping" and "billing" as possible values. Use `TRUE` for "shipping" and `FALSE` for "billing."
	street_address VARCHAR(100) NOT NULL,
	city VARCHAR(100) NOT NULL,
	`state` VARCHAR(100) NOT NULL,
	postal_code VARCHAR(100) NOT NULL,
	country VARCHAR(100) NOT NULL,
	FOREIGN KEY (customer_id) REFERENCES Customer(customer_id) ON DELETE CASCADE
);

-- Described in the requirements but not in the diagram. `Payment_Info` is listed as a single-valued property of `Customer` in the diagram but is described as a multiple-valued property in the requirements (the latter is implemented here).
CREATE TABLE IF NOT EXISTS PaymentInfo (
	payment_info_id INT PRIMARY KEY AUTO_INCREMENT, -- Described in neither the requirements nor the diagram, but included to give this relation a primary key.
	customer_id INT NOT NULL,
	method VARCHAR(100) NOT NULL, -- The requirements list "credit card," "debit card," and "digital wallet" as possible values. A similar (possibly redundant) property on another relation (`method` on `Payment`) gives "credit card" and "PayPal" as possible values.
	card_number VARCHAR(100) NOT NULL, -- Can describe either a card or account number.
	card_holder_name VARCHAR(100) NOT NULL, -- Can describe either a card or account holder name.
	expiration_date DATE NOT NULL,
	address_id INT NOT NULL, -- According to the requirements, the associated `Address` must also be associated with the associated `Customer`.
	FOREIGN KEY (customer_id) REFERENCES Customer(customer_id) ON DELETE CASCADE,
	FOREIGN KEY (address_id) REFERENCES `Address`(address_id) ON DELETE CASCADE
);

-- An additional relation `OrderHistory` is described in the requirements but not the diagram and is excluded from this schema because it is fundamentally redundant with `Order`. An additional relation `Payment` is described in both the requirements and the diagram but is combined with `Order` in this schema because it has a two-way total-participation many-to-many relation with `Order`.
CREATE TABLE IF NOT EXISTS Order (
	order_id INT PRIMARY KEY AUTO_INCREMENT,
	order_date DATE NOT NULL,
	`status` VARCHAR(100) NOT NULL, -- The requirements list "pending," "shipped," and "delivered" as possible values. A similar (possibly redundant) property (the `status` property of `Payment`) gives "completed" and "pending" as possible values.
	total_amount INT NOT NULL, -- An additional property `total_price` is described in the diagram but not the requirements, so it is unclear if it is distinct from this property. An additional property `amount` on the `Payment` relation is described in both the diagram and the requirements but is excluded from this schema because it is unclear if it distinct from this property.
	estimated_delivery_date DATE NOT NULL, -- Described as `delivery_eta` in the diagram but not the requirements.
	customer_id INT NOT NULL, -- Described in the requirements but not the diagram. Takes the place of the `Place` relation described in the diagram.
	payment_info_id INT NOT NULL, -- Described in neither the requirements nor the diagram, but it makes sense for a relationship to exist between this data. Takes the place of a very similar (possibly redundant) property that is described in the requirements (the `method` property of `Payment`).
	address_id INT NOT NULL, -- Described in the requirements but not the diagram. Must reference a shipping address according to the requirements. An additional property `shipping_method` is described in the requirements but not the diagram, but it is unclear what information that property is supposed to represent.
	actual_delivery_date DATE, -- Described in the requirements but not the diagram.
	FOREIGN KEY (customer_id) REFERENCES Customer(customer_id) ON DELETE CASCADE,
	FOREIGN KEY (payment_info_id) REFERENCES PaymentInfo(payment_info_id) ON DELETE CASCADE,
	FOREIGN KEY (address_id) REFERENCES `Address`(address_id) ON DELETE CASCADE
);

-- An additional property `license_info` is mentioned but not described in both the requirements and diagram and is thus excluded from this schema. An additional relation `BusinessContactDetails` is described in the requirements, is listed as a property in the diagram, is partially redundant with this relation, and is thus combined with this relation in this schema.
CREATE TABLE IF NOT EXISTS Vendor (
	vendor_id INT PRIMARY KEY AUTO_INCREMENT,
	`name` VARCHAR(100) NOT NULL,
	address_id INT NOT NULL,
	phone VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	FOREIGN KEY (address_id) REFERENCES `Address`(address_id) ON DELETE CASCADE
);

-- An additional set of properties (or possible relation; including at least `weight` and `dimensions`) is described partially in the requirements but not the diagram and is thus excluded from this schema.
CREATE TABLE IF NOT EXISTS Product (
	product_id INT PRIMARY KEY AUTO_INCREMENT, -- Also described as `sku` (stock keeping unit) in the requirements.
	`name` VARCHAR(100) NOT NULL,
	`description` VARCHAR(100) NOT NULL,
	price DECIMAL(10, 2) NOT NULL,
	vendor_id INT NOT NULL, -- Described as a property in the requirements and both a one-to-one relation and a property in the diagram (the latter is redundant).
	stock_quantity INT NOT NULL,
	FOREIGN KEY (vendor_id) REFERENCES Vendor(vendor_id) ON DELETE CASCADE
);

-- Described as `Contain` in the diagram, but that name is used for multiple relationships, including a fully redundant relationship between `Cart` and `Product` that is excluded from this schema due to being reduntant with this relation.
CREATE TABLE IF NOT EXISTS OrderItem (
	order_id INT NOT NULL,
	product_id INT NOT NULL,
	quantity INT NOT NULL,
	FOREIGN KEY (order_id) REFERENCES Order(order_id) ON DELETE CASCADE,
	FOREIGN KEY (product_id) REFERENCES Product(product_id) ON DELETE CASCADE
);

-- The requirements describe that this relation is "organized in a hierarchy" but there is no indication of what is meant by that, so it is not reflected in this schema.
CREATE TABLE IF NOT EXISTS Category (
	category_id INT PRIMARY KEY AUTO_INCREMENT,
	`name` VARCHAR(100) NOT NULL,
	`description` VARCHAR(100) NOT NULL
);

-- This relation is referred to as `BelongsTo` in the diagram but is renamed here to make its purpose more clear. Diagram shows conflicting information (either one category per product as a property or a total participation both ways many-to-many relationship. The latter is implemented in this schema).
CREATE TABLE IF NOT EXISTS ProductCategory (
	product_category_id INT PRIMARY KEY AUTO_INCREMENT, -- Included in neither the requirements nor the diagram but included here to give this relation a primary key.
	product_id INT NOT NULL,
	category_id INT NOT NULL,
	FOREIGN KEY (product_id) REFERENCES Product(product_id) ON DELETE CASCADE,
	FOREIGN KEY (category_id) REFERENCES Category(category_id) ON DELETE CASCADE
);

-- Requirements describe that this relation can be "flagged, removed, or approved," but no indication is given as to what is meant by that so it is excluded from this schema.
CREATE TABLE IF NOT EXISTS Review (
	review_id INT PRIMARY KEY AUTO_INCREMENT,
	rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
	comment VARCHAR(100) NOT NULL,
	date_submitted DATE NOT NULL,
	customer_id INT NOT NULL, -- Described in the requirements but not the diagram.
	FOREIGN KEY (customer_id) REFERENCES Customer(customer_id) ON DELETE CASCADE
);
