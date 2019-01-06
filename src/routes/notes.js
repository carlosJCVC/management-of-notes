const router = require('express').Router();
const Task = require('../models/Task');

router.get('/notes/add', (req, res) => {
    res.render('notes/create');
});

router.get('/notes', async (req, res) => {
    const notes = await Task.find().sort({date: 'desc'});
    res.render('notes', { notes });
});

router.post('/notes/store', (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if(!title) {
        errors.push({text: 'Please insert a Title'});
    }

    if(errors.length > 0) {
        res.render('notes/create', { errors, title, description });
    } else {
        const task = new Task({ title, description });

        //podemos realizarlo con promesas por ser tareas asincronas
        //sin embargo ES6 permite usar la palabra asymc en la funcion y await en la tarea para realizar de manera normal dichas tareas
        task.save()
            .then( msj => res.redirect('/'))
            .catch( err => console.log(colors.red(err)));
        
        req.flash('success_msg', 'Note add Successfully');
        
        res.redirect('/notes');
    }
});

router.get('/note/edit/:id', async (req, res) => {
    const { id } = req.params;
    const note = await Task.findById(id);
    res.render('notes/edit', { note: note });
});

router.put('/note/update/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    await Task.findByIdAndUpdate(id, { title, description });
    req.flash('success_msg', 'Note updated successfully');
    res.redirect('/notes');
});

router.delete('/note/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Task.remove({_id : id});
    req.flash('success_msg', 'Note deleted successfully');
    res.redirect('/notes')
});

module.exports = router;