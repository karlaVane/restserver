const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario');
const app = express();

app.post('/login', (req, res) => {
    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        //si existe un error en ls bd y otra cosa con el servidor
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        //si no existe el usuario en bd
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }
        //Verificar si las contraseñas coinciden
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });
        }

        //Generar el token
        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOCKEN });
        //respuesta correcta
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    });

});

module.exports = app;