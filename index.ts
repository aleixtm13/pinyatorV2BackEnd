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
  const result = await conn.query("SELECT COUNT(*) AS numCastellers FROM CASTELLER");
  let nCastellers = Number(result[0].numCastellers); // Retorna el numero total de castellers en tipus bigInt, s'ha de passar a number
  const id = nCastellers + 1; // Afegim 1 per fer la nova id.
  const insertQuery = `INSERT INTO CASTELLER (MalNom, Nom, Cognom_1, Cognom_2, Altura, Forca, POSICIO_PINYA_ID, Codi, Familia_ID, Estat) VALUES
                                      ('${dadesCasteller.malNom}', '${dadesCasteller.nom}', '${dadesCasteller.cognom_1}', '${dadesCasteller.cognom_2}',
                                      ${dadesCasteller.altura}, ${dadesCasteller.forca}, ${dadesCasteller.posicioPinya}, ${id}, 
                                      ${dadesCasteller.family}, ${dadesCasteller.state})`;
  const insert = await conn.query(insertQuery);
  if(insert) console.log("Inserted data into DB.")
  res.send('Data inserted.');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})