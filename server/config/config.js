///7 configurar puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno 

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/////////////Vencimiento del token
//60 segundos-60 minutos- 24 horas- 30 dias
process.env.CADUCIDAD_TOCKEN = 60 * 60 * 24 * 30;
//////////// SEED DE AUTENTIFICACION
process.env.NODE_ENV = process.env.SEED || 'seed-dessarrollo';
//base de datos
let urlDB;
/*
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {*/
urlDB = 'mongodb+srv://KarlaAdmin:kvmr210897@cluster0.toul9.mongodb.net/Cluster0'
    //}
process.env.URLDB = urlDB;