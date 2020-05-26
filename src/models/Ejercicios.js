const mongoose = require('mongoose');
const {Schema} = mongoose;

const EjercicioSchema = new Schema({
    nombre: {type: String, required: true},
    repeticiones: {type: String, required: true},
   	series: {type: String},
    Gmusculo: {type: String },
       peso: {type: String },
       foto: {type: String }
       

});

module.exports = mongoose.model('Ejercicio', EjercicioSchema);