const Employee=require('../module/employe.model');

// create and save new Employee
exports.create = (req,res) =>{
    //validate request
    if(!req.body){
        res.status(400).send({
            message: "content can no be empty!"
        });
    }

    // Create a Tutorial
const employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    address: req.body.address
  });


  // Save Tutorial in the database
  Employee.create(employee, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee already exist."
      });
    else res.send(data);
  });

}

//getall employee from database
exports.findAll = (req, res) => {
  const name = req.query.name;

  Employee.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Update a employee identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Employee.updateById(
    req.params.id,
    new Employee(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Employee with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Employee with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};


// Delete a employee with the specified id in the request
exports.delete = (req, res) => {
  Employee.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Employee with id " + req.params.id
        });
      }
    } else res.send({ message: `Employee was deleted successfully!` });
  });
};


//get leave

exports.findAllLeave = (req, res) => {
  const name = req.query.name;

  Employee.getAllLeave(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};