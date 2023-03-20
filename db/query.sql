-- Select all columns from the employees table.
SELECT * FROM employees;

-- Select only the first and last names of all employees.
SELECT first_name, last_name FROM employees;

-- Select the job title and salary of all roles in the Engineering department.
SELECT job_title, salary FROM roles WHERE departments_id = 2;

-- Select the department name and the number of roles in each department.
SELECT department_name, COUNT(roles.id) AS num_roles
FROM departments
LEFT JOIN roles ON departments.id = roles.departments_id
GROUP BY department_name;

-- Select the first name and job title of all employees who report to a manager with the ID of 1.
SELECT employees.first_name, roles.job_title
FROM employees
JOIN roles ON employees.roles_id = roles.id
WHERE employees.manager_id = 1;