const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const port = 3000;
//如果不是開發模式，用 dotenv 讀取 .env檔案
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

//setting engine 
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(flash());

//connect to monogodb
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

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

//啟動 passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//將訊息透過 res.locals 交給 views
app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.success_msg = req.flash('success_msg');
    res.locals.warning_msg = req.flash('warning_msg');
    next();
})

//bootstrap & jQ & images
app.use(express.static('public'));


app.use('/', require('./routes/homes'));
app.use('/restaurants', require('./routes/restaurants'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));


app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`)
})

