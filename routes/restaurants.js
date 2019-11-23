const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant.js');
const EatenList = require('../models/eatenList');

const { authenticated } = require('../config/auth');


//render show
router.get('/show/:id', authenticated, (req, res) => {
    Restaurant.findById({ _id:req.params.id, userId:req.user._id }, (err, restaurant) => {
        if(err){
            return console.err(err)
        }
        return res.render('show', { restaurant: restaurant });
    })
})

//render eatenList
router.get('/eatenList', authenticated, (req, res) => {
    EatenList.find({ uesrId: req.user._id }, (err, eatenList) => {
        if(err){
            return console.log(err);
        } 
        console.log(eatenList)
        return res.render('eatenList', { eatenList: eatenList });
    })
})

//render search
router.get('/search', authenticated, (req, res) => {
    const keyword = req.query.keyword.toLowerCase();
    Restaurant.find({ uesrId: req.user._id }, (err, restaurants) => {
        if(err) return console.err(err);
        const restaurant = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword) || restaurant.name_en.toLowerCase().includes(keyword))
        return res.render('index', { restaurants: restaurant });
    })
})

//render north area
router.get('/location/north', authenticated, (req, res) => {
    Restaurant.find({ uesrId: req.user._id }, (err, restaurants) => {
        if(err) return console.err(err)
        const northRestaurants = restaurants.filter( place => place.location.includes("北市" ||  "新北"));
        return res.render('index', { restaurants: northRestaurants });
    })
})

//render scoreboard
router.get('/score', authenticated, (req, res) => {
    Restaurant.find({ uesrId: req.user._id }, (err, restaurants) => {
        if(err) return console.err(err);
        const restaurantScoreList = restaurants.sort((a, b) => {
            return b.rating - a.rating
        })
        return res.render('score', { restaurants: restaurantScoreList })
    })
})

//render new page
router.get('/new', authenticated, (req, res) => {
    res.render('new');
})

//General list storage
router.post('/new', authenticated, (req, res) => {
    let errorMessage = false;
    const restaurant = new Restaurant({
        name: req.body.name,
        name_en: req.body.name_en,
        category: req.body.category,
        image: req.body.image,
        location: req.body.city + req.body.zone + req.body.address,
        phone: req.body.phone,
        rating: req.body.rating,
        description: req.body.description,
        userId: req.user._id
    })
    if(req.body.name === ''){
        errorMessage = true;
        return res.render('new', { errorMessage: errorMessage });
    }else{
        errorMessage = false;
    }
    if(req.body.eatenList){
        const newEatenList = new EatenList({
            name: req.body.name,
            name_en: req.body.name_en,
            category: req.body.category,
            image: req.body.image,
            location: req.body.city + req.body.zone + req.body.address,
            phone: req.body.phone,
            rating: req.body.rating,
            description: req.body.description,
            userId: req.user._id
        })
        newEatenList.save(err => {
            if(err){
                return console.log(err);
            }
        })
    }
    restaurant.save(err => {
        if(err){
            return console.err(err)
        }
            return res.redirect('/');
    })
})

//render edit page
router.get('/edit/:id', authenticated, (req, res) => {
    Restaurant.findById({ _id:req.params.id, userId:req.user._id }, (err, restaurant) => {
        if(err){
            return console.err(err)
        }
        const restaurantPhone = restaurant.phone.replace(/\s/g, ''); //Can't send with the space within
        return res.render('edit', { restaurant: restaurant, restaurantPhone: restaurantPhone });
    })
})

//edit to db
router.put('/edit/:id', authenticated, (req, res) => {
    let errorMessage = false;

    //error message
    if(req.body.name === ''){
        errorMessage = true;
        return res.render('new', { errorMessage: errorMessage });
    }else{
        errorMessage = false;
    }

    //storage in specific restaurant
    Restaurant.findById({ _id:req.params.id, userId:req.user._id }, (err, restaurant) => { 
        if(err) return console.err(err)
        restaurant.name = req.body.name;
        restaurant.name_en = req.body.name_en;
        restaurant.category = req.body.category;
        restaurant.image = req.body.image;
        restaurant.location = req.body.city + req.body.zone + req.body.address;
        restaurant.phone = req.body.phone;
        restaurant.rating = req.body.rating;
        restaurant.description = req.body.description;

        restaurant.save(err => {
            if(err){
                return console.err(err)
            }
                return res.redirect(`/restaurants/${req.params.id}`);
        })
    })
})

//delete to db
router.delete('/delete/:id', authenticated, (req, res) => {
    Restaurant.findById({ _id:req.params.id, userId:req.user._id }, (err, restaurant) => {
        if(err) return console.err(err);
        return restaurant.remove(err => {
            if(err) return console.err(err);
            return res.redirect('/');
        })
    })
})

module.exports = router;