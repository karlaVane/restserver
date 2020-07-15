const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

//clase
let Schema = mongoose.Schema; //esquema dentro de mi base de datos (objeto)

//ROLES VALIDOS
let rolesValidos = {
        values: ['ADMIN_ROLE', 'USER_ROLE'],
        message: '{VALUE} no es un rol válido'
    }
    //objeto
let usuarioShema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'el correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: { //string no obligatorio
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//error mas lindo
usuarioShema.plugin(uniqueValidator, { message: '{PATH} deber ser único' }); //para que el correo sea único

usuarioShema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

module.exports = mongoose.model('usuario', usuarioShema)