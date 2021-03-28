const inquirer = require("inquirer");
const db = require("./db");
const connection = require("./db/connection");
const index = require("./db/index");
const cTable = require("console.table");
const logo = require("asciiart-logo");
const config = require("./package.json");
const { getEmployeesByManager } = require("./db");
console.log(logo(config).render());

function askForAction() {
  inquirer
    .prompt({
      message: "Choose something to do",
      name: "action",
      type: "list",
      choices: [
        "View All Employees",
        "View All Employees by Departments",
        "View All Employees by Manager",
        "Add Employee",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Finish",
      ],
    })
    .then((response) => {
      switch (response.action) {
        case "View All Employees":
          viewAllEmployees();
          return;
        case "View All Employees by Departments":
          viewEmployeesbyDepartment();
          return;
        case "View All Employees by Manager":
          viewEmployeesbyManager();
          return;
        case "Add Employee":
          addEmployee();
          return;
        case "View All Roles":
          viewAllRoles();
          return;
        case "Add Role":
          addRole();
          return;
        case "View All Departments":
          viewAllDepartments();
          return;
        case "Add Department":
          addDepartment();
          return;
        default:
          connection.end();
      }
    });
}

function viewAllEmployees() {
  db.getEmployees().then((results) => {
    console.table(results);
    askForAction();
  });
}

function viewEmployeesbyDepartment() {
  db.getEmployeesByDepartment().then((results) => {
    console.table(results);
    askForAction();
  });
}

function viewEmployeesbyManager() {
  db.getEmployeesByManager().then((results) => {
    console.table(results);
    askForAction();
  });
}

function addEmployee() {
  console.log("\n Lets add a new employee to your team!");
  inquirer
    .prompt([
      {
        message: "What is your employee's first name?",
        type: "input",
        name: "first_name",
      },
      {
        message: "What is your employee's last name?",
        type: "input",
        name: "last_name",
      },
    ])
    .then((results) => {
      db.addNewEmployee(results);
      askForAction();
    });
}

function viewAllDepartments() {
  db.getDepartments().then((results) => {
    console.table(results);
    askForAction();
  });
}

function addDepartment() {
  console.log("\n Lets add a new department to your company!");
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What department would you like to add to your company?",
      },
    ])
    .then((res, err) => {
      db.addNewDepartment(res);
      if (err) throw err;
      console.log("You have added a new department to your company!");
      askForAction();
    });
}

function viewAllRoles() {
  db.viewRoles().then((results) => {
    console.table(results);
    askForAction();
  });
}

function addRole() {
  console.log("\n Lets add a new role to your team!");
  inquirer
    .prompt([
      {
        message: "What role would you like to add?",
        type: "input",
        name: "title",
      },
      {
        message: "What is the salary for this role?",
        type: "input",
        name: "salary",
      },
    ])
    .then((results) => {
      db.addNewRole(results);
      askForAction();
    });
}

askForAction();