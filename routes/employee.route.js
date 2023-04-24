module.exports = app => {
    const employee = require("../controller/employee.controller");
     const employee2=require("../module/employe.model");
    var router = require("express").Router();

    //create new employee
    router.post("/",employee.create);
  
    //getAll employee
    router.get("/",employee.findAll);

    // get employee  by name and email // import from employee.model in module folder
    router.get("/:name/:email",employee2.getbyNameAndEmail)
    //update employee by id
    router.put("/:id",employee.update);

    //delete employee by id
    router.delete("/:id",employee.delete);

     //get all leave of  all employee
    router.get("/all",employee2.getAllLeave);

    //add leave by employee id
    router.post("/:id",employee2.addLeave);


    app.use('/api', router);


   
};