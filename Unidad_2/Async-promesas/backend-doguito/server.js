import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./conexion.js";

dotenv.config();

const app = express(); // instancia de express
app.use(cors());        // permite peticiones desde el frontend
app.use(express.json()); // parsear body JSON

// ---- CLIENTES ----

// GET - listar todos los clientes
app.get("/clientes", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM clientes");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET - obtener cliente por id
app.get("/cliente/:id", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM clientes WHERE id = ?", [req.params.id]
        );
        res.json(rows[0] || null);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST - crear cliente
app.post("/clientes", async (req, res) => {
    try {
        const { id, nombre, email } = req.body;
        await pool.query(
            "INSERT INTO clientes (id, nombre, email) VALUES (?, ?, ?)",
            [id, nombre, email]
        );
        res.status(201).json({ id, nombre, email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT - actualizar cliente
app.put("/clientes/:id", async (req, res) => {
    try {
        const { nombre, email } = req.body;
        await pool.query(
            "UPDATE clientes SET nombre = ?, email = ? WHERE id = ?",
            [nombre, email, req.params.id]
        );
        res.json({ mensaje: "actualizado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE - eliminar cliente
app.delete("/clientes/:id", async (req, res) => {
    try {
        await pool.query("DELETE FROM clientes WHERE id = ?", [req.params.id]);
        res.json({ mensaje: "eliminado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---- PETS ----

// GET - listar todos los pets
app.get("/pets", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM pets");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET - obtener pet por id
app.get("/pets/:id", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM pets WHERE id = ?", [req.params.id]
        );
        res.json(rows[0] || null);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST - crear pet
app.post("/pets", async (req, res) => {
    try {
        const { id, nombre, edad, peso, raza, id_dueno } = req.body;
        await pool.query(
            "INSERT INTO pets (id, nombre, edad, peso, raza, id_dueno) VALUES (?, ?, ?, ?, ?, ?)",
            [id, nombre, edad, peso, raza, id_dueno]
        );
        res.status(201).json({ id, nombre, edad, peso, raza, id_dueno });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT - actualizar pet
app.put("/pets/:id", async (req, res) => {
    try {
        const { nombre, edad, peso, raza, id_dueno } = req.body;
        await pool.query(
            "UPDATE pets SET nombre = ?, edad = ?, peso = ?, raza = ?, id_dueno = ? WHERE id = ?",
            [nombre, edad, peso, raza, id_dueno, req.params.id]
        );
        res.json({ mensaje: "actualizado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE - eliminar pet
app.delete("/pets/:id", async (req, res) => {
    try {
        await pool.query("DELETE FROM pets WHERE id = ?", [req.params.id]);
        res.json({ mensaje: "eliminado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---- PRODUCTOS ----

// GET - listar todos los productos
app.get("/productos", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM productos");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET - obtener producto por id
app.get("/productos/:id", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM productos WHERE id = ?", [req.params.id]
        );
        res.json(rows[0] || null);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST - crear producto
app.post("/productos", async (req, res) => {
    try {
        const { id, nombre, precio, description } = req.body;
        await pool.query(
            "INSERT INTO productos (id, nombre, precio, description) VALUES (?, ?, ?, ?)",
            [id, nombre, precio, description]
        );
        res.status(201).json({ id, nombre, precio, description });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT - actualizar producto
app.put("/productos/:id", async (req, res) => {
    try {
        const { nombre, precio, description } = req.body;
        await pool.query(
            "UPDATE productos SET nombre = ?, precio = ?, description = ? WHERE id = ?",
            [nombre, precio, description, req.params.id]
        );
        res.json({ mensaje: "actualizado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE - eliminar producto
app.delete("/productos/:id", async (req, res) => {
    try {
        await pool.query("DELETE FROM productos WHERE id = ?", [req.params.id]);
        res.json({ mensaje: "eliminado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${process.env.PORT}`);
});
