/*
    **** mongodb original ****
    const MongoClient = require(‘mongodb’).MongoClient;
    const uri = "mongodb+srv://user:byuser@cluster0-w869e.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
*/
const express = require('express');
console.log('importei o express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
console.log('importei o mongoose');
const bodyParse = require('body-parser');
console.log('importei o body-parse');


const URI = 'mongodb+srv://sysdba:masterkey@cluster0-g2rfa.azure.mongodb.net/StarWars';
var rtPlanetas = require('./rota/rtPlanetas');
console.log('importei o rota planeta');


mongoose.connect(URI, {useNewUrlParser: true}).catch((error) => {
    assert.isNotOk(error,'Promise error');
    done();
  });

const db = mongoose.connection;

db.on('error', () => console.log('falha de conexão :('));
db.once('open', () => console.log('conectado :D'));

var app = express();
app.use(bodyParse.json());

console.log('escuta 27017');
app.listen(27017, function(err){
    if (err){console.log('erro no servidor')}
    else{console.log('servidor na escuta')};
});

console.log('Iniciando...');
app.use('/api/Planetas', rtPlanetas);