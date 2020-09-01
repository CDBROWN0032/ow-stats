const express = require('express')
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

app.get('/', (req, res) => {    
    res.send('hello');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});