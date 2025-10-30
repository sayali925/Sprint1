-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS campus_dine;
USE campus_dine;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu items table
CREATE TABLE IF NOT EXISTS menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  rating DECIMAL(3, 1) DEFAULT 0,
  description TEXT,
  image_url VARCHAR(255)
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
  address TEXT NOT NULL,
  phone VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  menu_item_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

-- Insert sample menu items
INSERT INTO menu_items (name, category, price, rating, description) VALUES
('Paneer Butter Masala', 'main', 250, 4.5, 'Creamy and rich paneer curry'),
('Veg Biryani', 'main', 220, 4.3, 'Fragrant rice with mixed vegetables'),
('Masala Dosa', 'breakfast', 120, 4.7, 'Crispy dosa with potato filling'),
('Butter Chicken', 'main', 300, 4.8, 'Classic butter chicken with tender pieces of chicken in a creamy tomato sauce'),
('Naan', 'breads', 40, 4.2, 'Soft and fluffy Indian bread'),
('Gulab Jamun', 'desserts', 80, 4.6, 'Sweet milk solids balls soaked in sugar syrup');