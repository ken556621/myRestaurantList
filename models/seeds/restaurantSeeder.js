const mongoose = require('mongoose');
const Restaurant = require('../restaurant.js');
const restaurantList = require('../../restaurant.json'); 
const restaurants = restaurantList.results;

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', () => {
    console.log('Mongodb fail to connect!');
})

db.once('open', () => {
    console.log('Mongodb connect!');

    //新增種子資料
    for(let i = 0;i < restaurants.length;i++){
        Restaurant.create({ 
            name: restaurants[i].name,
            name_en: restaurants[i].name_en,
            category: restaurants[i].category,
            image: restaurants[i].image,
            location: restaurants[i].location,
            phone: restaurants[i].phone,
            google_map: restaurants[i].google_map,
            rating: restaurants[i].rating,
            description: restaurants[i].description
        });
    }

    console.log('done');
})