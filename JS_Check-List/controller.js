var express = require('express');
var app = express();
var fs = require('fs');
var cookieParser = require('cookie-parser');
var functions = require('./functions.js');
var handlebars = require('handlebars');
var bodyParser = require('body-parser');
var multer  = require('multer');

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static('public'));

var multer = require('multer');
var upload = multer({ dest: '/tmp/' });

var file = "list.json";
var fileRe = require("./list.json");

//Homepage GET-Method
/*app.get('/', function(req, res){
    res.sendFile(__dirname + "/" + "index.htm");
});*/

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

/*

        //Handlebars
        fs.readFile('list.htm', 'utf-8', function(error, source){
        if (error) {
            console.error(error);
            return;
        }

        var template = handlebars.compile(source);
        var html = template({
            todos: fileRe.Todo
        });

        res.send(html);
    });
});*/

//Server
var server = app.listen(8080, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
