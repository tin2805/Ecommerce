const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const cron = require('node-cron');

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;


const route = require('./routes');

const db = require('./config/db');

//Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine('hbs', handlebars.engine({ 
    defaultLayout: 'main', 
    extname: '.hbs', 
    helpers: require('./helpers/hbs').helpers
}))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//Flash message
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    cookie: {maxAge: 60000},
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(fileUpload());

//Routes init
route(app);

// Replace with your Render application URL
const appUrl = process.env.RENDER_URL;

// Define the cron job to run every 14 minutes
cron.schedule('*/14 * * * *', async () => {
  try {
    const response = await fetch(appUrl);
    if (response.ok) {
      console.log(`[${new Date().toISOString()}] Ping successful. Server is awake.`);
    } else {
      console.error(`[${new Date().toISOString()}] Ping failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Ping failed:`, error.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})