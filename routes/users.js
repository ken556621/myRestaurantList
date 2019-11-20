const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

//註冊
router.get('/register', (req, res, next) => {
    res.render('register');
})

router.post('/register', (req, res, next) => {
    const { name, email, password, password2 } = req.body;
    User.findOne({ email: email }).then(user => {
        //已被註冊
        if(user){
            res.render('register');
        //新增至資料庫
        }else{
            const newUser = new User({
                name,
                email,
                password
            })
        //加鹽&湊雜
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save().then(user => {
                        res.redirect('/');
                    }).catch(err => console.log(err));
                })
            })
        }
    })
    res.redirect('/');
})

//登入
router.get('/login', (req, res, next) => {
    res.render('login')
})

router.post('/login', (req, res, next) => {
    next();
})

//登出
router.get('/logout', (req, res, next) => {
    res.redirect('/users/login')
})

module.exports = router;