const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant.js');

const { authenticated } = require('../config/auth');

//render 根目錄
router.get('/', authenticated, (req, res) => {
    Restaurant.find((err, restaurants) => {
        if(err) return console.err(err);
        return res.render('index', { restaurants: restaurants });
    })
})

module.exports = router;