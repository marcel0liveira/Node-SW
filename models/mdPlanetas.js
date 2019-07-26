console.log('mdPlaneta: entrei');
const mongoose = require('mongoose');

let PlanetsModelo = new mongoose.Schema(
    {
        // _id : String,
        nome:String,
        terreno:String,
        clima:String,
        aparicoes: Number
    }
);

module.exports = mongoose.model("Planetas", PlanetsModelo);
console.log('mdPlaneta: fim');