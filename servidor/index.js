const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: '127.0.0.1',
    password: 'mazoku1?',
    database: 'web2024',
});

app.post('/create', (req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const ci = req.body.ci;
    const antiguedad = req.body.antiguedad;
    const cargo = req.body.cargo;

    db.query('INSERT INTO empleados (nombre, edad, ci, antiguedad, cargo) VALUES (?, ?, ?, ?, ?)',
        [nombre, edad, ci, antiguedad, cargo],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send('Empleado creado');
            }
        }
    );
});

app.get('/empleados', (req, res) => {
    db.query('SELECT * FROM empleados', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log('Servidor iniciado en el puerto 3001');
});