const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore')
const Usuario = require('../models/usuario')

const app = express();

app.get('/usuario', (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde)

    let limite = req.query.limite || 5;
    limite = Number(limite)

    Usuario.find({ estado: true }, 'nombre role email estado')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    numero: conteo
                });
            });

        });
});

app.post('/usuario', (req, res) => {
    let body = req.body //cuerpo de la peticion
    let usuario = new Usuario({ //creando un nuevo objeto
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    //guardar en la bd
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //usuarioDB.password = null; // muestra la palabra password
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']); //solo se pueden cambiar estos parámetros
    //delete body.password;
    //delete body.google;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let cambiarEstado = {
            estado: false
        }
        //Usuario.findByIdAndDelete(id, (err, usuarioEliminado) => {
        //parecido a un metodo put
    Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true, context: 'query' }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            res.json({
                ok: false, //porq no fue hayado
                err: {
                    message: "Usuario no encontrado"
                }
            });
        } else {
            res.json({
                ok: true,
                usuario: usuarioDB
            })
        }

    });
});


module.exports = app