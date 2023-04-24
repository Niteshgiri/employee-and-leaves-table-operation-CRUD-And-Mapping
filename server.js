const express = require("express");
const db=require('./DB/config')
const cors = require("cors");
const connection = require("./controller/db");

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

//app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */


app.get("/",(req,res) =>{

  //  res.json({message :"wlcome to employee management project "})
  
    let sql ="CREATE TABLE IF NOT EXISTS employee(Employee_id int AUTO_INCREMENT, name VARCHAR(255),email VARCHAR(255), role VARCHAR(255),address VARCHAR(255), PRIMARY KEY(Employee_id))";
    
    connection.query(sql, (err) => {
  
      if (err) {
        throw err;
      }
      res.send("wlcome to employee management project  Employee table created if it is not exist");
    });

    let sql2="CREATE TABLE IF NOT EXISTS Leaves ( id int AUTO_INCREMENT PRIMARY KEY,LeaveDates DATE,leaveReasons VARCHAR(255),Employee_id int, FOREIGN KEY (Employee_id) REFERENCES employee(Employee_id))";
    
    connection.query(sql2, (err) => {
  
      if (err) {
        throw err;
      }
      res.send("wlcome to employee management project  Employee table created if it is not exist");
    });
});




require("./routes/employee.route.js")(app);


// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});