const express = require('express');
const User = require('../models/user');
const router = express.Router();
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const JWT_SECRET = 'abuisagoodboy'; 

// creating user : POST '/api/auth/createuser' , no login requried 

router.post('/createuser', [
    body('name', 'Enter valid name').isLength({ min: 5 }),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
], async (req, res) => {
    //if error occures give bad request and error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // chec user already exist or not
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'sorry this Email already exists' })
        }

        //securing password using bcrypt package (this converts password string into hash characters)

        const salt = await bcrypt.genSalt(10);//salt is adding some extra hashes to a password
        const secPass = await bcrypt.hash(req.body.password, salt)


        //creating user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })


        //jwt tokens (is used to retrive specific userdata using the token)
        const data = {
            user: {
                id: user.id //when ever user gives us to given token , we give this id (means id represent user data)
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)

        res.json({ authtoken })
        // res.json(user)

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('some error occured')
    }
})

module.exports = router