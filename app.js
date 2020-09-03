const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

// todo: breakout
const knex = require('knex')({
  client: 'postgres',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'admin',
    database: 'overwatch',
  },
});

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '/public')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/mdbootstrap/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/mdbootstrap/js/addons')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery-ui')));

app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

// Routes
router.route('/').get((req, res) => {
  res.render('index');
});

router.route('/Charts').get((req, res) => {
  res.render('charts');
});

router.route('/Games').get(async (req, res) => {
  const today = new Date();
  const allGames = await knex
    .select()
    .from('games')
    .join('maps', 'maps.mapid', '=', 'games.MapID')
    .then((rows) => rows);

  const newGames = await knex
    .select()
    .from('games')
    .join('maps', 'maps.mapid', '=', 'games.MapID')
    .where('Date', today)
    .then((rows) => rows);

  const maps = await knex
    .select()
    .from('maps')
    .then((rows) => rows);

  res.render('games', { allGames, newGames, today, maps });
});

app.use('/', router);

// Post
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.post('/submit-form', urlencodedParser, async (req, res) => {
  const data = req.body;
  debug(data);
  await knex().insert({ Date: data.date, Result: data.result, Role: data.role, MapID: data.map, SRDiff: data.sr, Season: data.season }).into('games');
  res.redirect('games');
});

// Listener
app.listen(port, () => {
  debug(`Server running at ${chalk.green('http://localhost:')} ${chalk.green(port)}`);
});
