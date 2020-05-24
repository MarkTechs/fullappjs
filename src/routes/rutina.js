const express = require('express');
const router = express.Router();

router.get('/rutina/rutina', (req, res) =>{
   res.render('rutina/rutina');
}); 

module.exports = router;