const connection = require('../controller/db');

// constructor
const Employee = function (employee) {
  this.name = employee.name;
  this.email = employee.email;
  this.role = employee.role;
  this.address = employee.address;
}

//Insert employ into database
Employee.create = (newEmployee, result) => {

  connection.query("SELECT * FROM employee WHERE email = ?", newEmployee.email, (err, results) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(newEmployee.email);
    console.log(result.email);
    if (results.length > 0) {
      // not found Tutorial with the id
      result({ kind: "Already exist" }, null);
      return;
    }
    else {
      connection.query("INSERT INTO employee SET ?", newEmployee, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("created Employee: ", { id: res.insertId, ...newEmployee });
        result(null, { id: res.insertId, ...newEmployee });
      });
    }
  });
  console.log("hello")
}

//get all

Employee.getAll = (name, result) => {
  let query = "SELECT * FROM employee";

  // if (name) {
  //   query += ` WHERE name LIKE '%${name}%'`;
  // }

  connection.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("employee: ", res);
    result(null, res);
  });
};



//Update employee
Employee.updateById = (id, employee, result) => {
  connection.query(
    "UPDATE employee SET name = ?, email = ?, role = ?,address = ? WHERE id = ?",
    [employee.name, employee.email, employee.role, employee.address, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Employee: ", { id: id, ...employee });
      result(null, { id: id, ...employee });
    }
  );
};

//delete by id

Employee.remove = (id, result) => {
  connection.query("DELETE FROM employee WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted employee with id: ", id);
    result(null, res);
  });
};


// get employe by name or employee
Employee.getbyNameAndEmail = (req, res) => {
  let name = req.params.name;
  let email = req.params.email;


  let query = connection.query('SELECT * FROM employee WHERE name=? AND email=?', [name, email], (err, results) => {

    if (err) {

      throw err;

    }
    console.log(results)
    res.send(results);
  });

}





const mysql = require("mysql2");
const { promisify } = require("util");

// promisify the pool.query method
connection.query = promisify(connection.query);


// add leave for employee by id
Employee.addLeave = (req, res) => {
  let id = req.params.id;
  let post = { LeaveDates: "", leaveReasons: "", Employee_id: "" };
  let sql = "INSERT INTO leaves SET ?";
  post = req.body;
  post.Employee_id = req.params.id;
  let query = connection.query(sql, post, (err) => {

    if (err) {

      throw err;

    }
    res.send("Leave  added");
  });

}

const axios = require('axios');

//get employee  with their all leaves


Employee.getAllLeave = (req, res) => {
 
  class Employee {
    constructor(Employee_id, name, email, role, address, leaves) {
      this.Employee_id = Employee_id;
      this.name = name;
      this.email = email;
      this.role = role;
      this.address = address;
      this.leaves = leaves
    }
  }

  class Leaves {
    constructor(LeaveDates, leaveReasons, Employee_id) {
      this.LeaveDates = LeaveDates;
      this.leaveReasons = leaveReasons;
      this.Employee_id = Employee_id;

    }
  }

  let promises = [];


  connection.query('SELECT * FROM employee')
    .then((rows) => {

      let query = connection.query('select count(*) as count from employee ', (err, result) => {

        let end = result[0].count;

        for (let i = 1; i <= end; i++) {
          let query = connection.query('SELECT * FROM  leaves where Employee_id=? ', i, (err, results) => {

            employee1 = rows[i - 1];
            const employee = new Employee(employee1.Employee_id, employee1.name, employee1.email, employee1.role, employee1.address, results);
            promises.push(employee)

            if (i === end) {
              res.send(promises)
            }

          });
        }
      })

    })
    .catch((error) => {
      console.error(error);
    });


};




module.exports = Employee;