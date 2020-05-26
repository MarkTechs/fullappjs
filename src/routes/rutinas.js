const express = require('express');
const router = express.Router();

const Ejercicio = require('../models/Ejercicios');
const {isAuthenticated} = require('../helpers/auth');


router.get('/rutines/CreateRoutine', (req, res) =>{
   res.render('rutines/CreateRoutine');
}); 


router.get('/rutines/rutinesUser', isAuthenticated,async(req,res) =>{
    const ejercicios = await Ejercicio.find();
    res.render('rutines/rutinesUser', {ejercicios});   
   })




router.post('/rutines/CreateRoutine', isAuthenticated,async(req, res)=>{
   const {nombre, repeticiones,series,Gmusculo,peso,foto} =  req.body;
   console.log( req.body);
   const errors = [];

   if(!nombre){
      
       errors.push({text: "Escriba un nombre"});
   }
   if (!repeticiones){
       
       errors.push({text: "Escriba una repeticiones"});
   }
   if(!series){
      
      errors.push({text: "Escriba un series"});
  }
  if (!Gmusculo){
      
      errors.push({text: "Escriba una Gmusculo"});
  }
  if (!peso){
      
   errors.push({text: "Escriba una peso"});
}
   if(errors.length > 0){
       res.render('rutines/CreateRoutine',{
           errors,
           title,
           descripcion
       });
   }
   else{
       const newNote = new Ejercicio({nombre,repeticiones,series,Gmusculo,peso,foto});
       await newNote.save();
       req.flash("success_msg", 'Ejercicio agregado');
       res.redirect('/rutines/rutinesUser'); 
   }
});










module.exports = router;