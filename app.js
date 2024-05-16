require('dotenv').config();

const cors = require("cors")
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./routes/auth.route');
const user = require('./routes/user.route');
const { sequelize } = require('./db');
const socketHandler = require('./socket/socket.js');

const indexRouter = require("./routes");


const app = express();
const PORT = process.env.PORT || 3005;
// app.use(cors());
app.use(bodyParser.json());
app.use(cors())


app.use("/api" ,indexRouter )

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synced');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

const server =app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

socketHandler(server);
