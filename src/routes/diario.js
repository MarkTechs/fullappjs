const express = require('express');
const router = express.Router();

router.get('/notes', (req,res) =>{

    res.send('database diary');
})
module.exports = router;