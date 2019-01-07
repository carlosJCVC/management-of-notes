const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/users', (req, res) => {
    res.send('index users');
});

router.get('/users/signin', (req, res) => {
    res.render('signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('signup');
});

router.post('/users/storageUser', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (name.length <= 0 ) {
        errors.push({text: 'PLease insert your name'});
    }
    if(password != confirm_password){
        errors.push({text: 'Password do not match'});
    }
    if (password.length < 4) {
        errors.push({text: 'Password must be at least 4 characters'});
    }
    if (errors.length > 0) {
        res.render('/users/signup', { errors, name, email });
    } else {
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash('success_msg', 'The email is already in use');
            res.redirect('/users/signin');
        }
        const user = new User({name, email, password});
        user.password = await user.encryptPassword(password);
        await user.save();
        req.flash('success_msg', 'You are registered');
        res.redirect('/users/signin');
    }
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;