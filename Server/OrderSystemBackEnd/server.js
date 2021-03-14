require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const MONGO_DB_KEY = process.env.MONGOPWD;

const MongoURI = `mongodb+srv://admin:${MONGO_DB_KEY}@cluster0.nuzpu.mongodb.net/ORDERINGSYSTEM?retryWrites=true&w=majority`

mongoose.connect(MongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(res => {console.log('Database Connected')
})
  .catch(err => console.log(`Error while connecting to database....${err}`));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  
  const PORT = process.env.PORT || 5000;
  
  const whitelist = ['http://localhost:4200', 'http://127.0.0.1:4200', 'http://127.0.0.1:5000', 'http://localhost:5000']
  const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
      if (origin === undefined || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
  
  app.use(cors(corsOptions));  
  app.use(require('./Routes/routes'));
  
  app.listen(PORT, console.log(`Server running on ${PORT}`))