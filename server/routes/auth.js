const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//REGISTER
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        const user = await newUser.save();
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email});
        if(!user)
           return res.status(404).json('user not found');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword)
        return res.status(400).send({ error: [{ msg: "bad credentials" }] });

        return res.status(200).json(user);

        } catch (err) {
            return res.status(500).json(err);
        }
});


router.get('/', (req, res) => {
    res.send('Hey its auth route');
});


module.exports = router;