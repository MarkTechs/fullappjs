const express = require('express');
const router = express.Router();

router.get('/users/signin', (req, res) => {

    res.render('users/signin');
})

router.get('/users/signup', (req, res) => {

    res.render('users/signup');
})

router.post('/users/signup', (req, res)=>{
   const { name, email, password, confirmpass} = req.body;
   const errors = [];

   if(name.length > 0){
    errors.push({text: 'El nombre no puede estar vacio'});
   }

   if(email.length > 0){
    errors.push({text: 'El email no puede estar vacio'});
   }

   if(password != confirmpass){
       errors.push({text: 'Las contraseñas no son iguales'});
   }
   if(password.length < 6 ){
       errors.push({text: 'La contraseña tiene menos de 6 caracteres'});
   }
   if(errors.length > 0){
       res.render('users/signup', {errors,name, email, password, confirmpass});
   }
   else{
       res.send('ok');
   } 
});

module.exports = router;