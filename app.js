const express = require('express');
const app = express();
const PORT = process.env.port || 5000;
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
const cookieParser = require('cookie-parser');
const staticroute = require('./routes/staticroute')
app.use(cookieParser());
//const connectDB = require('./config/db');
const cors = require('cors');
/*
//for https
const https = require('https');
const fs = require('fs');


// Your existing Express.js middleware and routes go here

// Replace these with the path to your certificate and private key
let key = fs.readFileSync(__dirname+'/server.key', 'utf-8');
let cert = fs.readFileSync(__dirname+'/server.crt', 'utf-8');

let options = {
  key: key,
  cert: cert
};

let server = https.createServer(options, app);

server.listen(443, () => {
  console.log('HTTPS server is running on port 443');
});

//https ends here*/


// Connect to the database
//connectDB();

// Initialize middleware
app.use(cors());
app.use(express.json());

app.use('/',staticroute)
// Define routes
app.use('/api/users', require('./routes/users')); //register a user/update user
app.use('/api/login', require('./routes/login')); //login a user
app.use('/api/homepage', require('./routes/homepage')); //fetch list of foods and calories 
app.use('/api/foods', require('./routes/food')); //log/fetch the food intake for date
app.use('/api/search', require('./routes/search')); // 


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
