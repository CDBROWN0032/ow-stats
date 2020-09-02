const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

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
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modulesmdbootstrap/js/addons')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const data = await knex
    .select()
    .from('games')
    .join('maps', 'maps.mapid', '=', 'games.MapID')
    .then((rows) => rows);

  res.render('index', { data });
});

app.listen(port, () => {
  debug(`Server running at ${chalk.green('http://localhost:')} ${chalk.green(port)}`);
});
