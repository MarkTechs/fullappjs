const express = require('express');
const router = express.Router();

const Note = require('../models/Notes');
const {isAuthenticated} = require('../helpers/auth');


router.get('/notes/add', isAuthenticated,(req, res)=>{
    res.render('notes/newnotes');
});

router.post('/notes/newnote', isAuthenticated,async(req, res)=>{
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
        newNote.user = req.user.id;
        await newNote.save();
        req.flash("success_msg", 'Nota agregada');
        res.redirect('/notes'); 
    }
});

router.get('/notes', isAuthenticated,async(req,res) =>{
 const notes = await Note.find({user:req.user.id}).sort({date:'desc'});
 res.render('notes/allnotes', {notes});   
})

router.get('/notes/edit/:id', isAuthenticated,async(req, res) =>{
    const note = await Note.findById(req.params.id);
    res.render('notes/editnotes', {note});
});

router.put('/notes/editnote/:id', isAuthenticated,async (req, res) =>{
    const {title, descripcion} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, descripcion});
    req.flash('success_msg', 'Nota editada correctamente');
    res.redirect('/notes');
}); 


router.delete('/notes/delete/:id', isAuthenticated,async(req, res)=>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota eliminada correctamente');
    res.redirect('/notes');
});

module.exports = router;