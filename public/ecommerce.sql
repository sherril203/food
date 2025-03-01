CREATE TABLE orders (
    order_id VARCHAR(10) PRIMARY KEY,
    ordered_items VARCHAR(255),
    total_cost DECIMAL(10, 2),
    order_status VARCHAR(50),
    address VARCHAR(255),
    user_id INT
);