DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

Use employee_db;

CREATE TABLE departments (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    
)