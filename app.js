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

const connectDB = require('./config/db');
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
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/foods', require('./routes/api/foods'));
app.use('/api/dailylogs', require('./routes/api/dailylogs'));
app.use('/api/exercises', require('./routes/api/exercises'));
app.use('/api/exerciselogs', require('./routes/api/exerciselogs'));

//const PORT = process.env.PORT || 5000;
//console.log(require('crypto').randomBytes(64).toString('hex'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
