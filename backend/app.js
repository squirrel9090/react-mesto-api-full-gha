require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./middlewares/auth');
const { createUserJoi, loginJoi } = require('./middlewares/validation');
const { createUser, loginUser } = require('./controllers/users');
const router = require('./routes/router');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginJoi, loginUser);
app.post('/signup', createUserJoi, createUser);

app.use(auth);
app.use(router);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const {
    statusCode = 500,
    message,
  } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });
  next();
});

app.listen(PORT);
