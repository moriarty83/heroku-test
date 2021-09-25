////////////////////////////
// DEPENDENCIES
////////////////////////////
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const dontenv = require('dotenv');
const app = express();
const db = mongoose.connection;

dontenv.config();

////////////////////////////
// PORT
////////////////////////////
// Allow use of Heroku's port or your own local port, depending on the environment

const PORT = process.env.PORT || 3000;

////////////////////////////
// DATABASE
////////////////////////////
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongod disconnected'));

////////////////////////////
// MIDDLEWARE
////////////////////////////
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.json());

////////////////////////////
// ROUTES
////////////////////////////

app.get('/', (req, res)=>{
    res.send("Hello World");
});

////////////////////////////
// LISTENER
////////////////////////////
app.listen(PORT, () => {
    console.log("Hello Seattle, I'm listening on " + PORT);
});