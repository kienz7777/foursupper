const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/connectDB');
require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 5000;

// Use bodyParser
app.use(bodyParser.json());

// Connect to Database
connectDB()

// Config for only development
if (process.env.NODE_ENV === 'development') {
    app.use(cors())
    

    //Morgan give information about each request
    //Cors it's allow to deal with react for localhost:3000 without any problem
    app.use(morgan('dev'))
}

// Load all routes
const allUserRouter = require('./routes/user.route');
const allOrderRouter = require('./routes/order.route');

// User routes
app.use('/api/user',cors(),allUserRouter);
app.use('/api/order',cors(),allOrderRouter);

app.get('/', (req, res) => { res.send('Hello from Express!')});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});