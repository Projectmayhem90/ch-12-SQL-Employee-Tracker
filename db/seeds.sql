-- Insert data into the "departments" table.
INSERT INTO departments (department_name)
    VALUES
    ('Finance'),
    ('Engineering'),
    ('Legal'),
    ('Sales');

-- Insert data into the "roles" table.
INSERT INTO roles (departments_id, job_title, salary)
    VALUES
    (1, 'Accountant', 70000),
    (1, 'Accounting Manager', 120000),
    (2, 'Software Engineer', 110000),
    (2, 'Head Engineer', 160000),
    (3, 'Lawyer', 150000),
    (3, 'Principle Attorney', 200000),
    (4, 'Salesperson', 60000),
    (4, 'Head of Sales', 100000);

-- Insert data into the "employees" table.
INSERT INTO employees (manager_id, roles_id, first_name, last_name)
    VALUES
    (null, 1, 'Joshua', 'OBrien'),
    (1, 2, 'Jamie', 'Smith'),
    (null, 3, 'Darla', 'Zwicker'),
    (7, 4, 'Chris', 'Chesnut'),
    (null, 5, 'Kristen', 'Metays'),
    (3, 6, 'Ashley', 'Mccurdy'),
    (null, 7, 'Desmond', 'Howard'),
    (4, 8, 'Mike', 'Jones');