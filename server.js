const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require('console.table');
const PORT = process.env.PORT || 3001;

require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'null',
    database: 'employee_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }

    console.log('Connected to the employee_db database.');
    startPrompt();
});

function startPrompt() {
    inquirer.prompt({
        type: 'list',
        name: 'task',
        message: 'What would you like to do?',
        choices: ['View Departments', 'View Roles', 'View Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Exit']
    }).then((answer) => {
        switch (answer.task) {
            case 'View Departments':
                viewDepartments();
                break;

            case 'View Roles':
                viewRoles();
                break;

            case 'View Employees':
                viewEmployees();
                break;

            case 'Add a Department':
                addDepartment();
                break;

            case 'Add a Role':
                addRole();
                break;

            case 'Add an Employee':
                addEmployee();
                break;

            case 'Exit':
                db.end();
                console.log('Goodbye!');
                return;
        }
    });
}

function viewDepartments() {
    db.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;
        console.table(res);
        startPrompt();
    });
}

function viewRoles() {
    db.query('SELECT roles.*, departments.department_name FROM roles LEFT JOIN departments ON roles.departments_id = departments.id', (err, res) => {
        if (err) throw err;
        console.table(res);
        startPrompt();
    });
}

function viewEmployees() {
    db.query('SELECT employees.*, roles.job_title, roles.salary, departments.department_name AS department FROM employees LEFT JOIN roles ON employees.roles_id = roles.id LEFT JOIN departments ON roles.departments_id = departments.id', (err, res) => {
        if (err) throw err;
        console.table(res);
        startPrompt();
    });
}

function addDepartment() {
    inquirer.prompt({
        type: 'input',
        message: 'What is the name of the new department?',
        name: 'departmentName'
    }).then((answer) => {
        db.query('INSERT INTO departments SET ?', { department_name: answer.departmentName }, (err, res) => {
            if (err) throw err;
            console.log(`New department '${answer.departmentName}' added successfully.`);
            startPrompt();
        });
    });
}

function addRole() {
    db.query('SELECT * FROM departments', (err, departments) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the title of the new role?',
                name: 'roleTitle'
            },
            {
                type: 'input',
                message: 'What is the salary for the new role?',
                name: 'roleSalary'
            },
            {
                type: 'list',
                message: 'Which department does the new role belong to?',
                choices: departments.map((department) => {
                    return {
                        name: department.department_name,
                        value: department.id
                    }
                }),
                name: 'departmentId'
            }
        ]).then((answer) => {
            db.query('INSERT INTO roles SET ?', { job_title: answer.roleTitle, salary: answer.roleSalary, departments_id: answer.departmentId }, (err, res) => {
                if (err) throw err;
                console.log(`New role '${answer.roleTitle}' added successfully.`);
                startPrompt();
            });
        });
    });
};

function addEmployee() {
    db.query('SELECT * FROM roles', (err, roles) => {
        if (err) throw err;
        db.query('SELECT * FROM employees', (err, employees) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the first name of the new employee?',
                    name: 'firstName'
                },
                {
                    type: 'list',
                    message: 'Waht is the role of the new employee?',
                    choices: roles.map((role) => {
                        return {
                            name: role.job_title,
                            value: role.id
                        }
                    }),
                    name: 'roled'
                },
                {
                    type: 'list',
                    message: 'Who is the managerof the new employee?',
                    choices: employees.map((employee) => {
                        return {
                            name: `${employee.first_name} ${employee.last_name}`,
                            value: employee.id
                        }
                    }),
                    name: 'managerld'
                }
            ]).then((answer) => {
                db.query('INSERT INTO employees SET ?', {
                    first_name: answer.firstName,
                    roles_id: answer.roleId,
                    manager_id: answer.managerId
                }, (err, res) => {
                    if (err) throw err;
                    console.log(`New employee '${answer.firstName}' added successfully.`);
                    startPrompt();
                });
            });
        });
    });
}