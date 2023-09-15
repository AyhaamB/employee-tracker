INSERT INTO departments (dept_name, dept_manager)
VALUES ('Finance', 'Harry Rosen'),
       ('Sales', 'Sean Paul'),
       ('Legal', 'Ferry Jade'),
       ('Engineering', 'Heather Press');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 60000, 2),
       ('Accountant', 80000, 1),
       ('Legal Counsel', 90000, 3),
       ('Software Engineer', 80000, 4),
       ('Salesperson', 55000, 2),
       ('Lead Engineer', 150000, 4),
       ('Account Manager', 130000, 1),
       ('Lawyer', 115000, 3);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ('John', 'Harely', 1),
       ('Ayhaam', 'Baksh', 2),
       ('Mary', 'Jackson', 3),
       ('Alice', 'Sheppard', 4),
       ('Gordon', 'Turnly', 5),
       ('Valerie', 'Poltar', 6),
       ('Isha', 'Abbas', 7),
       ('Serena', 'Lee', 8);