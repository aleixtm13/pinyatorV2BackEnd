import mariadb from 'mariadb';

const pool = mariadb.createPool(
    {
        host: 'localhost',
        database: 'pinyator',
        user: 'root',
        password: 'root',
        connectionLimit: 10,
        idleTimeout: 0
    }
)

export default pool;