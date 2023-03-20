-- Create a new database called "employee_db" if it doesn't already exist.
CREATE DATABASE IF NOT EXISTS employee_db;

-- Switch to the "employee_db" database.
USE employee_db;

-- Create a new user called "newuser" with the password "password".
CREATE USER 'newuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

-- Grant the new user all privileges to the "employees" table.
GRANT ALL PRIVILEGES ON employees.* TO 'newuser'@'localhost';

-- Create a new "departments" table if it doesn't already exist.
CREATE TABLE IF NOT EXISTS departments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL
);

-- Create a new "roles" table if it doesn't already exist.
CREATE TABLE IF NOT EXISTS roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  job_title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  departments_id INT,
  CONSTRAINT fk_roles_departments
    FOREIGN KEY (departments_id)
    REFERENCES departments(id)
    ON DELETE CASCADE
);

-- Create a new "employees" table if it doesn't already exist.
CREATE TABLE IF NOT EXISTS employees (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  roles_id INT,
  manager_id INT,
  CONSTRAINT fk_employees_roles
    FOREIGN KEY (roles_id)
    REFERENCES roles(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_employees_employees
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
    ON DELETE CASCADE
);