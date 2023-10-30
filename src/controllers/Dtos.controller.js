const DtosModel = require('../models/Dtos');
const provisional = {};

// Controlador para guardar los datos en MongoDB

provisional.guardarDtos = (req, res) => {
  const{num1,num2,num3,R1,R2,R3,R4,R5,R6} = req.body;
  console.log(num1,num2,num3,R1,R2,R3,R4,R5,R6)
  try {
    const nuevo = new DtosModel({num1,num2,num3,R1,R2,R3,R4,R5,R6})
    nuevo.save()


  } catch (error) {

    console.log(error)
  }


};


module.exports = provisional

