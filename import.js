const knex = require('knex')({
  client: 'postgres',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'admin',
    database: 'overwatch',
  },
});

const csv = require('csv-parser');
const fs = require('fs');

async function main() {
  const maps = await knex.select('*').from('maps');
  let fileName;

  process.argv.forEach((val, index) => {
    if (index === 2 && val.includes('.csv')) fileName = val;
  });

  fs.createReadStream(fileName)
    .pipe(csv())
    .on('data', (row) => {
      //maps
      let currentMap = row['Map'];
      let selectedMap = maps.filter((map) => map.name === currentMap);

      selectedMap.forEach((map) =>
        knex('games')
          .insert({ Date: row.Date, Result: row.Result, Role: row.Role, MapID: map.mapid, SRDiff: row.SR })
          .then(function () {
            knex.select().from('games');
          })
      );
    })
    .on('end', () => {
      console.log('Update Complete!');
    });
}

main().catch(console.error);
