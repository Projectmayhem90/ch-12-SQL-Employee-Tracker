const inquirer = require('inquirer');
const mysql = require('mysql2');



const db = mysql.createConnection(
    {
        host: '',
        user: 'root',
        password: '',
        database: '',
    },
    console.log('connected to the database')

);

// Need to code employee list menu 
function startPrompt() {
    inquirer.prompt({
        type: 'list',
        name: 'task',
        message: 'What would you like to create?',
        choices: ['View Departments', 'View Roles', 'View Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'None']
    })
    .then((answer) => {
        if(answer.task == 'View departments') {
            db.quert('SELECT * FROM departments', function (err, res) {
                console.table(res)
                if (err) throw err
                startPrompt();
            })

        } else if(answer.task == 'Veiw Roles') {
            db.query('SELECT * FROM roels', function (err, res) {
                console.table(res)
                if (err) throw err
                startPrompt();
            })
        } else if(answer.task == 'View Employees') {
            db.query('SELECT * FROM employees', function (err, res) {
                console.tables(res)
                if (err) throw err
                startPrompt();
            })
        } else if (answer.task == 'Add a Department') {
            inquirer.prompt({
                type: 'input',
                message: 'What department are you looking to add?',
                name: 'depName'
            })
            .then((answer) => {
                db.query(`INSERT INTO departments (department_name) VALUES ('${answer.depName}')`, function (err, res) {
                    console.table(res)
                    if (err) throw err
                    startPrompt();
                })
            })
        } else if (answer.task == 'Add a Role') {
            inquirer.prompt({
                tyle: 'input',
                message: 'Enter new role:',
                new: 'newRole'
            },
            {
                type: 'input',
                message: 'What is ecpected pay?',
                name:'newSalery'
            },
            {
                type: 'input',
                message: 'What is the Department ID?',
                name: 'newDepId'
            })
            .then((answer) =>{
                db.query(`INSERT INTO roles (job_title, salary, departments_id) VALUES (${answer.newRole}, ${answer.newSalary}, ${answer.newDepId})`), function (err, res)
                console.table(res)
                if (err) throw err
                startPrompt();
            }
        })

    } else if(answer.task == 'Add a Role') {
        inquirer.prompt({
            type: 'input',
            message: 'Enter new role',
            name: 'newRole'
        },
        {
            type: 'input',
            message: 'What is expected pay?',
            name: 'newSalary",'
        },
        {
            type: 'input',
            message: 'What is the department ID?',
            name: 'newDepId',
        })
        .then((answer) =>{
            db.query(`INSERT INTO roles (job_titles, salary, department_id) VALUES (${answer.newRole}, ${answer.newSalary}, ${answer.newDepId})`), function (err, res)
            console.table(res0
                if (err) throw err
                startPrompt();
            }
        })

    } else if(answer.task == 'add an Employee') {
        inquirer.prompt({
            type: 'input',
            message: 'Enter employee first name.',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'What is the employees role?',
            name: 'empRole'
        },
        {
            type: 'input',
            message: 'If manager, what is their ID?',
            name: 'empMan'
        })
        .then((answer) => {
            db.query(`INSERT INTO employees (first_name, last_name, manager_id, roles_id) VALUES (${answer.firstName}, ${answer.lastName}, ${answer.empRole}, ${answer.empMan})`), function (err, res) {
                console.table(res)
                if (err) throw err
                startPrompt();
            }
        })
    } else if (answer == 'None') {
        startPrompt();
    }

}

//return 

// Function here to how user iwll use application 


//function to show employee data 

//fucntion for different roles
//department

//function to add employee to list and table
//add role
//add department

