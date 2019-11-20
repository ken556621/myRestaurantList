const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const port = 3000;

//setting engine 
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

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

//使用session
app.use(session({
    secret: 'My secret',
    resave: false,
    saveUninitialized: true
}))

//bootstrap & jQ & images
app.use(express.static('public'));


app.use('/', require('./routes/homes'));
app.use('/restaurants', require('./routes/restaurants'));
app.use('/users', require('./routes/users'));


app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`)
})

