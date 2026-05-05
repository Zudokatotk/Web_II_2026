const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'mypetshop'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('✓ Conectado a MySQL (mypetshop)');
});

// Validar tablas permitidas
const tablasValidas = ['clientes', 'pets', 'productos'];

const validarTabla = (tabla) => {
  return tablasValidas.includes(tabla);
};

// Ruta raíz - Información del servidor
app.get('/', (req, res) => {
  res.json({
    mensaje: '🐶 Servidor Express - Doguito Petshop',
    autor: 'Juan Grover Castelo Ayaviri',
    estado: 'Conectado a MySQL (XAMPP)',
    endpoints: {
      clientes: 'http://localhost:3000/api/clientes',
      pets: 'http://localhost:3000/api/pets',
      productos: 'http://localhost:3000/api/productos'
    },
    metodos: ['GET', 'POST', 'PUT', 'DELETE'],
    nota: 'Para usar la aplicación, abre los archivos HTML en la carpeta screens/'
  });
});

// GET - Listar todos o uno por ID
app.get('/api/:tabla', (req, res) => {
  const tabla = req.params.tabla;
  const id = req.query.id;

  if (!validarTabla(tabla)) {
    return res.status(400).json({ error: 'Tabla no válida' });
  }

  if (id) {
    // Obtener un registro por ID
    connection.query(`SELECT * FROM ?? WHERE id = ?`, [tabla, id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results[0] || null);
    });
  } else {
    // Listar todos los registros
    connection.query(`SELECT * FROM ??`, [tabla], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  }
});

// POST - Crear nuevo registro
app.post('/api/:tabla', (req, res) => {
  const tabla = req.params.tabla;
  const data = req.body;

  if (!validarTabla(tabla)) {
    return res.status(400).json({ error: 'Tabla no válida' });
  }

  const id = data.id || Date.now().toString();

  let query, values;

  if (tabla === 'clientes') {
    query = 'INSERT INTO clientes (id, nombre, email) VALUES (?, ?, ?)';
    values = [id, data.nombre, data.email];
  } else if (tabla === 'pets') {
    query = 'INSERT INTO pets (id, nombre, edad, peso, raza, id_dueno) VALUES (?, ?, ?, ?, ?, ?)';
    values = [id, data.nombre, data.edad, data.peso, data.raza, data.id_dueno];
  } else if (tabla === 'productos') {
    query = 'INSERT INTO productos (id, nombre, precio, description) VALUES (?, ?, ?, ?)';
    values = [id, data.nombre, data.precio, data.description];
  }

  connection.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Creado exitosamente', id });
  });
});

// PUT - Actualizar registro
app.put('/api/:tabla', (req, res) => {
  const tabla = req.params.tabla;
  const data = req.body;
  const id = data.id;

  if (!validarTabla(tabla)) {
    return res.status(400).json({ error: 'Tabla no válida' });
  }

  let query, values;

  if (tabla === 'clientes') {
    query = 'UPDATE clientes SET nombre = ?, email = ? WHERE id = ?';
    values = [data.nombre, data.email, id];
  } else if (tabla === 'pets') {
    query = 'UPDATE pets SET nombre = ?, edad = ?, peso = ?, raza = ?, id_dueno = ? WHERE id = ?';
    values = [data.nombre, data.edad, data.peso, data.raza, data.id_dueno, id];
  } else if (tabla === 'productos') {
    query = 'UPDATE productos SET nombre = ?, precio = ?, description = ? WHERE id = ?';
    values = [data.nombre, data.precio, data.description, id];
  }

  connection.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Actualizado exitosamente' });
  });
});

// DELETE - Eliminar registro
app.delete('/api/:tabla', (req, res) => {
  const tabla = req.params.tabla;
  const id = req.query.id;

  if (!validarTabla(tabla)) {
    return res.status(400).json({ error: 'Tabla no válida' });
  }

  connection.query('DELETE FROM ?? WHERE id = ?', [tabla, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Eliminado exitosamente' });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Express corriendo en http://localhost:${PORT}`);
  console.log(`📊 Endpoints disponibles:`);
  console.log(`   GET    http://localhost:${PORT}/api/clientes`);
  console.log(`   GET    http://localhost:${PORT}/api/pets`);
  console.log(`   GET    http://localhost:${PORT}/api/productos`);
});
