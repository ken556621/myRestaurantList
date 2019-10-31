const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const restaurantList = require('./restaurant.json');
const port = 3000;

//setting engine 
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//bootstrap & jQ
app.use(express.static('public'));

//render 根目錄
app.get('/', (req, res) => {
    res.render('index', { restaurants: restaurantList.results})
})

//render show
app.get('/restaurants/:restaurant_id', (req, res) => {
    const restaurant = restaurantList.results.find( place => place.id === Number(req.params.restaurant_id));
    res.render('show', { restaurant: restaurant })
})

//search
app.get('/search', (req, res) => {
    const keyword = req.query.keyword.toLowerCase();
    const restaurants = restaurantList.results.filter( place => place.name.toLowerCase().includes(keyword));
    res.render('index', { restaurants: restaurants, keyword: keyword })
})



app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`)
})

