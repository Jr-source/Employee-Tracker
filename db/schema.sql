DROP DATABASE IF EXISTS employeesdb;
CREATE DATABASE employeesdb;
USE employeesdb;

create table department (
department_id int not NULL auto_increment,
name varchar(30),
primary key (department_id)
);

create table role (
role_id int auto_increment,
title varchar(30),
salary decimal(8, 2),
department_id int,
primary key (role_id),
foreign key (department_id) references department(department_id)
ON DELETE SET NULL
);

CREATE TABLE employee (
id INT auto_increment,
first_name varchar(30),
last_name varchar(30),
role varchar(30),
role_id int,
department varchar(30),
manager_id int,
manager_name varchar(30),
primary key (id),
foreign key (role_id) references role(role_id)
);

SELECT * FROM employee
LEFT JOIN role ON role_id = role(role_id);