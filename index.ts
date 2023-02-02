import express from 'express';
import pool from './database';

const app: express.Application = express()
const port:number = 4000


app.get('/', (req, res) => {
  res.send('Hello World Pinyator!')
})

app.get('/users', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM USUARIS");
    res.send(rows);
  } catch(err) {
    throw err;
  } finally {
    if(conn) conn.end();
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})