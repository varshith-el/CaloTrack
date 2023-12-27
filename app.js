const express = require('express');
const app = express();
const PORT = process.env.port || 5000;
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

/*app.get('/', (req, res) => {
  res.send("Hello, this is Home Page.");
});*/


/*app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
  });*/
  

//app.listen(port, () => {
//  console.log(`Server is running at http://localhost:${port}`);
//});

const { connectDB } = require('./config/db');
//const express = require('express');
//const connectDB = require('./config/db');
const cors = require('cors');

//const app = express();

// Connect to the database
connectDB();

// Initialize middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/users')); //register a user/update user
app.use('/api/auth', require('./routes/login')); //login a user
app.use('api/homepage',require('./routes/homepage')); //fetch list of foods and calories 
app.use('/api/foods', require('./routes/food')); //log/fetch the food intake for date
app.use('/api/search', require('./routes/search')); // 

app.get('/test',(req, res) => {
  res.send("Hello, this is Home Page.");
});

//app.use('/api/exercises', require('./routes/exercises')); //fetch list of exercises and calories

//const PORT = process.env.PORT || 5000;
//console.log(require('crypto').randomBytes(64).toString('hex'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
