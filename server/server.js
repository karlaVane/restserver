require('./config/config')
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

//parse application/x-www
app.use(bodyParser.urlencoded({ extended: false }))

//parse application /json
app.use(bodyParser.json())

//configuracion global de las rutas
app.use(require('./routes/index'));

// CONEXION CON MONGODB //ver los warnings de la consola
//ver npm mongoose-unique-validator (instalar como dependencia)
//mongoose.connect('mongodb://localhost:27017/cafe', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
mongoose.connect(process.env.URLDB, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err;
    console.log('base de datos ONLINE');
})
app.listen(process.env.PORT, () => { // COGE EL PUERTO DEL CONFIG.JS
    console.log("Escuchando en el puerto", process.env.PORT);
});