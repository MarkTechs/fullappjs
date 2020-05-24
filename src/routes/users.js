const express = require('express');
const router = express.Router();
const passport = require('passport');
const Users = require('../models/Users');


router.get('/users/signin', (req, res) => {

    res.render('users/signin');
})

router.post('/users/signin' , passport.authenticate('local', {
   successRedirect: '/partials/navigation',
   failureRedirect: '/users/signin',
   failureFlash: true 
})); 



router.get('/users/signup', (req, res) => {

    res.render('users/signup');
});

router.post('/users/signup', async(req, res)=>{
   const { name, email, password, confirmpass} = req.body;
   const errors = [];

   if(name.length <= 0){
    errors.push({text: 'El nombre no puede estar vacio'});
   }

   if(email.length <= 0){
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
     const emailUser = await Users.findOne({email: email});
     if(emailUser){
         req.flash('error_msg', 'el email ya existe');
         res.redirect('/users/signup');
     }  
     const NewUser = new Users({name, email, password});
     NewUser.password = await NewUser.encryptPassword(password);
     await NewUser.save();
     req.flash('success_msg', 'Se ha registrado');
     res.redirect('/users/signin');
   } 
});

router.get('/users/logout', (req, res) =>{
    req.logout();
    req.flash('success_msg','Ha salido de sesion satisfactoriamente');
    res.redirect('/users/signin'); 
});

module.exports = router;