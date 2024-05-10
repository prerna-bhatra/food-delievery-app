require('dotenv').config();

const cors = require("cors")
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./routes/auth.route');
const user = require('./routes/user.route');
const { sequelize } = require('./db');

const indexRouter = require("./routes");


const app = express();
const PORT = process.env.PORT || 3005;
// app.use(cors());
app.use(bodyParser.json());
app.use(cors())

// app.use('/auth', auth);
// app.use('/user', user);

app.use("/api" ,indexRouter )

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synced');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});