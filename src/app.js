const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;
const logger = require('morgan');

require('../firebaseConfig');
const gamesRouter = require('./routes/games.route');
const profileRouter = require('./routes/profile.route');
const usersRouter = require('./routes/users.route');
const authMiddleware = require('./middlewares/auth.middleware');

// config
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// the program listens to the router
app.use('/', authMiddleware);
app.use('/api/games', gamesRouter);
app.use('/api/profile', profileRouter);
app.use('/api/users', usersRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
