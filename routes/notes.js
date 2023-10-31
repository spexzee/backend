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

//Route1
//add notes : POST: '/api/notes/addnote' login required
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

        const notes = await Notes.create({
            user: req.user.id, title, description, tag
        })
        const saveNote = await notes.save(notes)
        res.send(saveNote)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error')
    }

})

module.exports = router