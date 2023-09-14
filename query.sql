const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'emp_manager',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the emp_manager database.');

  // SQL query to fetch employee data
  const sqlQuery = `
    SELECT
      employees.id AS Employee_ID,
      employees.first_name AS First_Name,
      employees.last_name AS Last_Name,
      roles.title AS Role,
      departments.dept_name AS Department,
      roles.salary AS Salary,
      CONCAT(managers.first_name, ' ', managers.last_name) AS Manager
    FROM
      employees
    INNER JOIN roles ON employees.role_id = roles.id
    INNER JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees AS managers ON employees.manager_id = managers.id;
  `;

  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error('Error fetching data from the database: ' + error.stack);
      connection.end(); // Close the database connection in case of an error
      return;
    }

    // Display the data as a table in the console
    console.table(results);

    connection.end(); // Close the database connection
  });
});
