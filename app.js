const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = 44334;

const knex = require('knex')({
  client: 'postgres',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'admin',
    database : 'overwatch'
  }
});

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));

app.get('/', (req, res) => {    
  res.sendFile(path.join(__dirname, 'views', 'index.html'));   
});

app.listen(port, () => {
    debug(`Server running at ${chalk.green("http://localhost:")} ${chalk.green(port)}`);
});