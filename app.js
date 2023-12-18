const express = require('express');
const app = express();
const port = process.env.port || 5000;
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
const express = require('express');
//const connectDB = require('./config/db');
const cors = require('cors');

//const app = express();

// Connect to the database
connectDB();

// Initialize middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/api/users')); //register a user/update user
app.use('/api/auth', require('./routes/api/auth')); //login a user
app.use('api/homepage',require('./routes/homepage')); //fetch list of foods and calories 
app.use('/api/foods', require('./routes/api/food')); //log the food intake for date
app.use('/api/foodlog', require('./routes/api/foodlog')); // 
app.use('/api/exerciselog', require('./routes/api/exercises')); //fetch list of exercises and calories
app.use('/api/exerciselogs', require('./routes/api/exerciselogs')); //log the exercise for date

//const PORT = process.env.PORT || 5000;
//console.log(require('crypto').randomBytes(64).toString('hex'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
