const express = require('express');
const app = express();
require('dotenv').config({ path: '.env' });
// const cors = require('cors');
const connectDB = require('./config/db');

//connect DB
connectDB();
// const mongoose = require('mongoose');

//init middleware
app.use(express.json({extends: false})) //like bodyParser (from box)
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const passport = require('passport');
// passport.use(Strategy);
// define routes
// app.use(cors());
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/auth', require('./routes/auth'));

//mongodb connect
// mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

//create appapp.use('/api/posts', post);
// app.use(passport.initialize());
// require('./config/passport')(passport);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('App running');
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
