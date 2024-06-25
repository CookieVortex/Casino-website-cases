const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/google-auth', async (req, res) => {
    const {googleId, email, givenName} = req.body;

    try {
        let user = await User.findOne({googleId});

        if (!user) {
            user = new User({
                googleId,
                email,
                displayName: givenName
            });

            await user.save();
        }

        res.status(200).json({message: 'User authenticated successfully', user});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

module.exports = router;
