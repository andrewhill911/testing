//create a simple express server with api
var express = require("express");
var app = express();
//import postgresql module
var pg = require("pg");
//import body-parser module
var bodyParser = require("body-parser");
//import cors module
var cors = require("cors");

const path = require("path");

//create database connection
var conString =
  "postgres://postgres:testpassword@database-1.c5vt865d06bf.us-east-1.rds.amazonaws.com:5432/postgres";
//create a client
var client = new pg.Client(conString);
//connect to database
client.connect();

//make employee model with attributes: id, firstName, lastName, middleInitial, dateOfBirth, dateOfEmployment, status
var Employee = function (
  id,
  firstName,
  lastName,
  middleInitial,
  dateOfBirth,
  dateOfEmployment,
  status
) {
  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.middleInitial = middleInitial;
  this.dateOfBirth = dateOfBirth;
  this.dateOfEmployment = dateOfEmployment;
  this.status = status;
};
//make cors friendly
app.use(cors());
//make body-parser friendly
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./frontend/reactfrontend/build")));

app.post("/employees/add", function (req, res) {
  //create a new employee and insert it into the database

  //clean input and ensure no null values
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let middleInitial = req.body.middleInitial;
  let dateOfBirth = req.body.dateOfBirth;
  let dateOfEmployment = req.body.dateOfEmployment;
  let status = req.body.status;
  //status = bool status
  console.log(status);

  if (status == "true") {
    status = true;
  } else if (status == "false") {
    status = false;
  }

  if (firstName == null) {
    firstName = "";
  }
  if (lastName == null) {
    lastName = "";
  }
  if (middleInitial == null) {
    middleInitial = "";
  }
  if (dateOfBirth == null) {
    dateOfBirth = "";
  }
  if (dateOfEmployment == null) {
    dateOfEmployment = "";
  }
  if (status == null) {
    status = false;
  }

  console.log(middleInitial);
  //get highest employee id
  let index = 0;
  client
    .query("SELECT MAX(id) FROM employee")
    .then(function (result) {
      index = result.rows[0].max;
      index++;
    })
    .then(function () {
      //create new employee
      let employee = new Employee(
        index,
        firstName,
        lastName,
        middleInitial,
        dateOfBirth,
        dateOfEmployment,
        status
      );
      //insert new employee into database
      client

        .query(
          "INSERT INTO employee (first_name, last_name, middle_initial, date_of_birth, date_of_employment, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
          [
            employee.firstName,
            employee.lastName,
            employee.middleInitial,
            employee.dateOfBirth,
            employee.dateOfEmployment,
            employee.status,
          ]
        )
        .then(function (result) {
          res.json({
            message: "Employee added successfully",
            status: 200,
          });
        })
        .catch(function (err) {
          res.json({
            error: err,
            status: 500,
            message: "Error adding employee",
          });
        });
    })

    .catch(function (err) {
      res.json({
        error: err,
        status: 500,
        message: "Error getting highest employee id",
      });
    });
});

//make login POST route
app.post("/login", function (req, res) {
  //get username and password from request body
  var username = req.body.username;
  var password = req.body.password;
  //query database for username and password
  client.query(
    'SELECT * FROM "user" WHERE username = $1 AND password = $2',
    [username, password],
    function (err, result) {
      if (err) {
        console.log(err);
        //send json response with status: error
        res.json({
          status: "error",
          message: err,
        });
      } else {
        //send json response with status: success
        res.json({
          status: "success",
        });
      }
    }
  );
});

//make get all employees route
app.get("/employees", function (req, res) {
  //query database for all employees
  client.query("SELECT * FROM employee", function (err, result) {
    if (err) {
      console.log(err);
      //send json response with status: error
      res.json({
        status: "error",
        message: err,
      });
    } else {
      //create an array of employees
      var employees = [];
      //loop through all employees
      for (var i = 0; i < result.rows.length; i++) {
        //create a new employee
        var employee = new Employee(
          result.rows[i].id,
          result.rows[i].first_name,
          result.rows[i].last_name,
          result.rows[i].middle_initial,
          result.rows[i].date_of_birth,
          result.rows[i].date_of_employment,
          result.rows[i].status
        );
        //add employee to array
        employees.push(employee);
      }
      //send json response with status: success and employees
      res.json({
        employees: employees,
      });
    }
  });
});

//make edit employee route
app.post("/employees/edit", function (req, res) {
  //get employee id from request body
  var id = req.body.id;
  //get employee attributes from request body
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var middleInitial = req.body.middleInitial;
  var dateOfBirth = req.body.dateOfBirth;
  var dateOfEmployment = req.body.dateOfEmployment;
  var status = req.body.status;

  //clean input and ensure no null values
  if (firstName == null) {
    firstName = "";
  }
  if (lastName == null) {
    lastName = "";
  }
  if (middleInitial == null) {
    middleInitial = "";
  }
  if (dateOfBirth == null) {
    dateOfBirth = "";
  }
  if (dateOfEmployment == null) {
    dateOfEmployment = "";
  }
  if (status == null) {
    status = false;
  }

  //if status = 'true' change to true
  if (status == "true") {
    status = true;
  }
  //if status = 'false' change to false
  if (status == "false") {
    status = false;
  }
  console.log(status);

  //update employee in database and handle error
  client.query(
    "UPDATE employee SET first_name = $1, last_name = $2, middle_initial = $3, date_of_birth = $4, date_of_employment = $5, status = $6 WHERE id = $7",
    [
      firstName,
      lastName,
      middleInitial,
      dateOfBirth,
      dateOfEmployment,
      status,
      id,
    ],
    function (err, result) {
      if (err) {
        console.log(err);
        res.send("Error");
      } else {
        res.send("Success");
      }
    }
  );
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
