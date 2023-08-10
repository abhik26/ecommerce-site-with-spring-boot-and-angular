--
-- Prep work
--
DROP TABLE IF EXISTS order_item;
DROP TABLE IF EXISTS order;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS address;

--
-- Table structure for table address
--
CREATE TABLE address (
  id bigserial,
  city varchar(255) DEFAULT NULL,
  country varchar(255) DEFAULT NULL,
  state varchar(255) DEFAULT NULL,
  street varchar(255) DEFAULT NULL,
  zip_code varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
-- Table structure for table customer
--
CREATE TABLE customer (
  id bigserial,
  first_name varchar(255) DEFAULT NULL,
  last_name varchar(255) DEFAULT NULL,
  email varchar(255) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE(email)
);

--
-- Table structure for table orders
--
CREATE TABLE order (
  id bigserial,
  order_tracking_number varchar(255) NOT NULL,
  total_price decimal(19,2) NOT NULL,
  total_quantity int NOT NULL,
  billing_address_id bigint NOT NULL,
  customer_id bigint NOT NULL,
  shipping_address_id bigint NOT NULL,
  status varchar(128) DEFAULT NULL,
  date_created timestamp NOT NULL,
  last_updated timestamp NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (billing_address_id),
  UNIQUE (shipping_address_id),
  FOREIGN KEY (customer_id) REFERENCES customer (id),
  FOREIGN KEY (billing_address_id) REFERENCES address (id),
  FOREIGN KEY (shipping_address_id) REFERENCES address (id)
);

--
-- Table structure for table order_items
--
CREATE TABLE order_item (
  id bigserial,
  image_url varchar(255) DEFAULT NULL,
  quantity int DEFAULT NULL,
  unit_price decimal(19,2) DEFAULT NULL,
  order_id bigint NOT NULL,
  product_id bigint NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (order_id) REFERENCES orders (id),
  FOREIGN KEY (product_id) REFERENCES product (id)
);
