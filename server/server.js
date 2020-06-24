require('./config/config')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//parse application/x-www
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/usuario', (req, res) => {
    res.json("get Usuario");
});

app.post('/usuario', (req, res) => {
    let body = req.body //cuerpo de la peticion
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: "El nombre es necesario"
        })
    } else {
        res.json({
            persona: body //imprimir como json 
        })
    }
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({
        id
    });
});

app.delete('/usuario', (req, res) => {
    res.json("delete Usuario");
});

app.listen(process.env.PORT, () => { // COGE EL PUERTO DEL CONFIG.JS
    console.log("Escuchando en el puerto", process.env.PORT);
});