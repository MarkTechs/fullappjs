const passport = require('passport');
const LocalStrategy =require('passport-local');
const User = require('../models/Users');

passport.use(new LocalStrategy({
    usernameField: 'email'

}, async (email, passport, done) => {
  const user = await User.findOne({email: email});
  if(!user){
    return done(null, false, {message: 'Usuario no encontrado'});
  }
  else{
    const match = await user.matchPassword(passport);
    if(match){
        return done(null, user);
        
    }
    else{
        return done(null, false, {message: 'Contraseña incorrecta'});
    }
  }

}));


passport.serializeUser((user, done) => {
    done(null, user.id);

});

passport.deserializeUser((id,done) =>{
    User.findById(id, (err, user) =>{
        done(err , user);
    });
});