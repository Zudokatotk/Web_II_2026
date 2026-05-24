import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

// pool de conexiones: más eficiente que una sola conexión porque reutiliza conexiones
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
});

// verificar que la conexión funciona al iniciar
pool.getConnection().then((conn) => {
    console.log("✓ Conectado a MySQL (mypetshop)");
    conn.release();
}).catch((err) => console.error("✗ Error de conexión:", err.message));

export default pool;
