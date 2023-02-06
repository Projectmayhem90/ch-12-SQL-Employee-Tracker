DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    job_title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    departments_id INT NOT NULL,
    FOREIGN KEY (departments_id)
    REFERENCES departments(id)
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INT,
    roles_id INT NOT NULL,
    FOREIGN KEY (roles_id)
    REFERENCES roles(id)
);