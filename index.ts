import express from 'express';
import pool from './database';
import cors from 'cors';

const app: express.Application = express()
const port:number = 4000

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World Pinyator!')
})

app.get('/users', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM USUARIS");
    res.json(rows);
  } catch(err) {
    throw err;
  } finally {
    if(conn) conn.end();
  }
})

app.get('/castellers', async (req, res) => {
  let conn;
  try{
    conn = await pool.getConnection();
    const result = await conn.query("SELECT * FROM CASTELLER");
    res.json(result);
  } catch(err){
    throw err;
  } finally {
    if(conn) conn.end();
  }
})

app.get('/addcasteller', async (req, res) => {
  res.send('Waiting for input...');
})

app.post('/addcasteller', async (req,res) => {
  console.log(req.body);
  const dadesCasteller = req.body;
  let conn;
  conn = await pool.getConnection();
  const result: JSON = await conn.query("SELECT COUNT(*) AS numCastellers FROM CASTELLER");
  //const id = result[0].numCastellers + 1; // Retorna el numero total de castellers, per el codi nou, sha de fer aquesta variable incrementada.
  //const insert = await conn.query("INSERT INTO (MalNom, Nom, Cognom_1, Cognom_2, Altura, Forca, POSICIO_PINYA_ID, Codi, Familia_ID, Estat) VALUES ")
  res.send('Data recieved');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})