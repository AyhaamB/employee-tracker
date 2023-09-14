const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '78qy26hh',
  database: 'emp_manager',
});

connection.connect();

// creates the table where the selected information is diplayed
function displayTable(data, headers) {
  console.table(data, headers);
}

function viewAllDepartments() {
    connection.query('SELECT id, dept_name FROM departments', (error, results) => {
      if (error) throw error;
  
      // Transform the results into an array of objects
      const formattedResults = results.map((result) => {
        return {
          'Department ID': result.id,
          'Department Name': result.dept_name,
        };
      });
  
      displayTable(formattedResults, ['Department ID', 'Department Name']);
      startApp();
    });
}

function viewAllRoles() {
    connection.query('SELECT roles.id, roles.title, roles.salary, departments.dept_name AS department FROM roles INNER JOIN departments ON roles.department_id = departments.id;',
    (error, results) => {
      if (error) throw error;
  
      // Transform the results into an array of objects
      const formattedResults = results.map((result) => {
        return {
          'Role ID': result.id,
          'Title': result.title,
          'Salary': result.salary,
          'Department': result.department,
        };
      });
  
      displayTable(formattedResults, ['Role ID', 'Department', 'Title', 'Salary']);
      startApp();
    });
}

function viewAllEmployees() {
    connection.query('SELECT roles.id, roles.title, roles.salary, departments.dept_name AS department, employees.first_name, employees.last_name FROM roles INNER JOIN departments ON roles.department_id = departments.id INNER JOIN employees ON roles.id = employees.role_id;',
    (error, results) => {
      if (error) throw error;
  
      // Transform the results into an array of objects
      const formattedResults = results.map((result) => {
        return {
          'First Name': result.first_name,
          'Last Name': result.last_name,
          'Role ID': result.id,
          'Title': result.title,
          'Salary': result.salary,
          'Department': result.department,
        };
      });

      displayTable(formattedResults, ['First Name', 'Last Name', 'Role ID', 'Department', 'Title', 'Salary']);
      startApp();
    });
}
  
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'dept_name',
                message: 'Enter the name of the department:',
            },
        ])
        .then((deptAnswer) => {
            connection.query(
                'INSERT INTO departments (dept_name) VALUES (?)',
                [deptAnswer.dept_name],
                (error, results) => {
                    if (error) throw error;
                    startApp();
                }
            );
        });
}

function addRole() {
    connection.query('SELECT dept_name FROM departments', (error, results) => {
        if (error) throw error;

        const departmentChoices = results.map((result) => result.dept_name);

        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the name of the role:',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the salary for this role:',
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'Select the department for this role:',
                    choices: departmentChoices,
                },
            ])
            .then((roleAnswer) => {
                connection.query(
                    'SELECT id FROM departments WHERE dept_name = ?',
                    [roleAnswer.department],
                    (error, departmentResult) => {
                        if (error) throw error;

                        const departmentId = departmentResult[0].id;

                        connection.query(
                            'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
                            [roleAnswer.title, roleAnswer.salary, departmentId],
                            (error, results) => {
                                if (error) throw error;
                                console.log('Role added successfully.');
                                startApp();
                            }
                        );
                    }
                );
            });
    });
}

function startApp() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View All departments',
          'Add Department',
          'View All Roles',
          'Add Role',
          'View All Employees',
          'Exit',
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case 'View All departments':
          viewAllDepartments();
          break;
        case 'Add Department':
          addDepartment();
          break;      
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'View All Employees':
          viewAllEmployees();
          break;
        // Add cases for other actions here...
        case 'Exit':
          connection.end();
          console.log('End');
          break;
        default:
          console.log('Error, please try again.');
          startApp();
      }
    });
}

startApp();
