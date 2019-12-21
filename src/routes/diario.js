const express = require('express');
const router = express.Router();

const Note = require('../models/Notes');



router.get('/notes/add', (req, res)=>{
    res.render('notes/newnotes');
});

router.post('/notes/newnote', async(req, res)=>{
    const {title, descripcion} =  req.body;
    const errors = [];

    if(!title){
        errors.push({text: "Escriba un nombre"});
    }
    if (!descripcion){
        errors.push({text: "Escriba una descripcion"});
    }
    if(errors.length > 0){
        res.render('notes/newnotes',{
            errors,
            title,
            descripcion
        });
    }
    else{
    const newNote = new Note({title,descripcion});
       await newNote.save();
       res.redirect('/notes'); 
    }
});

router.get('/notes', async(req,res) =>{
 const notes = await Note.find().sort({date:'desc'});
 res.render('notes/allnotes', {notes});   
})

router.get('/notes/edit/:id', async(req, res) =>{
    const note = await Note.findById(req.params.id);
    res.render('notes/editnotes', {note});
});

module.exports = router;