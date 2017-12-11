'use strict'

const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');

const functions = require('./functions.js');

const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static('public'));

//Routes
app.get('/', function(req, res){
    res.send(functions.readJSON());
});

app.get('/search', function(req, res){
    res.send(functions.searchJSON(req.query.id));
});

app.post('/check/:item', function(req, res){
    res.send(functions.checkJSON(req.params.item));
});

app.get('/check', function(req, res){
    res.send(functions.isCheckedJSON());
});

app.post('/', urlencodedParser, function(req, res){
    res.send(functions.createJSON(req.body.subject));
});

app.put('/', urlencodedParser, function(req, res){
    res.send(functions.updateJSON(req.body.id, req.body.newsubject));
});

app.delete('/:item', function(req, res){
    res.send(functions.deleteJSON(req.params.item));
});

//Server
const server = app.listen(8080, function(){
    const host = server.address().address;
    const port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
