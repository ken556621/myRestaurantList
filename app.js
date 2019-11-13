const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 3000;

//setting engine 
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));

//connect to monogodb
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

//透過 mongoose 拿到 mongodb 物件
const db = mongoose.connection;

//連線異常
db.on('error', () => {
    console.log('Mongodb error!');
})

//連線成功
db.once('open', () => {
    console.log('Mongodb connect!');
})

const Restaurant = require('./models/restaurant.js');

//bootstrap & jQ & images
app.use(express.static('public'));




//render 根目錄
app.get('/', (req, res) => {
    Restaurant.find((err, restaurants) => {
        if(err) return console.err(err);
        return res.render('index', { restaurants: restaurants });
    })
})

//render show
app.get('/restaurants/:id', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
        if(err){
            return console.err(err)
        }
        return res.render('show', { restaurant: restaurant });
    })
})

//render search
app.get('/search', (req, res) => {
    const keyword = req.query.keyword.toLowerCase();
    Restaurant.find((err, restaurants) => {
        if(err) return console.err(err);
        const restaurant = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword) || restaurant.name_en.toLowerCase().includes(keyword))
        return res.render('index', { restaurants: restaurant });
    })
})

//render north area
app.get('/north', (req, res) => {
    Restaurant.find((err, restaurants) => {
        if(err) return console.err(err)
        const northRestaurants = restaurants.filter( place => place.location.includes("北市" ||  "新北"));
        return res.render('index', { restaurants: northRestaurants });
    })
})

//render scoreboard
app.get('/score', (req, res) => {
    Restaurant.find((err, restaurants) => {
        if(err) return console.err(err);
        const restaurantScoreList = restaurants.sort((a, b) => {
            return b.rating - a.rating
        })
        return res.render('score', { restaurants: restaurantScoreList })
    })
})

//render new restaurant
app.get('/score', (req, res) => {
    Restaurant.find((err, restaurants) => {
        if(err) return console.err(err);
        const restaurantScoreList = restaurants.sort((a, b) => {
            return b.rating - a.rating
        })
        return res.render('score', { restaurants: restaurantScoreList })
    })
})

//add
app.get('/new', (req, res) => {
    res.render('new');
})

//storage to db
app.post('/new', (req, res) => {
    console.log(req.body);
    const restaurant = new Restaurant({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        name_en: req.body.name_en,
        category: req.body.category,
        image: req.body.image,
        location: req.body.city + req.body.zone + req.body.address,
        phone: req.body.phone,
        rating: req.body.rating,
        description: req.body.description
    })
    restaurant.save(err => {
        if(err) return console.err(err)
        return res.redirect('/');
    })
})


app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`)
})

