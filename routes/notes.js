const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator')



//Route1
//fetching all notes : GET: '/api/notes/fetchallnotes' login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes)
})

//Route2
//add note : POST: '/api/notes/addnote' login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter valid title').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    //if error occures give bad request and error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { title, description, tag } = req.body
    try {

        const note = new Notes({
            user: req.user.id, title, description, tag
        })
        const saveNote = await note.save(note)
        res.send(saveNote)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error')
    }

})


//Route3
//update note : PUT: '/api/notes/updatenote' login required
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    //if error occures give bad request and error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }


    const { title, description, tag } = req.body

    try {
        //create new note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note and uodate
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error')
    }

})

module.exports = router