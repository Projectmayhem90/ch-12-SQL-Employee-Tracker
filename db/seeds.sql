INSERT INTO departments (department_name)
    VALUES
    ('Finance'),
    ('Engineering'),
    ('Legal'),
    ('Sales');

INSERT INTO roles (departments_id, job_title, salary)
    VALUES
    (1, 'Accountant', 70000),
    (1, 'Accounting Manager', 120000),
    (1, 'Software Engineer', 110000),
    (1, 'Head Engineer', 160000),
    (1, 'Lawyer', 150000),
    (1, 'Principle Attorney', 200000),
    (1, 'Salesperson', 60000),
    (1, 'Head of Sales', 100000);

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