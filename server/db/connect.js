import {Pool} from 'pg';

const pool = new Pool({
    user: 'mydiary',
    host: 'localhost',
    database: 'my_diary',
    password: 'adaeze',
    port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
  });
