const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const dateTimeHelper = require('lib/helpers/dateTimeHelper');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/addNote', function(request,response){
    var filePath = __dirname + '/data/' + 'notes.json';
    fs.readFile(filePath,'utf8',function(error, data){
        if(error){
            return console.log('file reading error ' + filePath + error);
        }

        var notes = [];
        if(data){
            notes = JSON.parse(data);
        }

        notes.push(request.body);
        fs.writeFile(filePath,JSON.stringify(notes),'utf8',function(error){
            if(error){
                return console.log('file writing error' + filePath + error);
            }
        })
        response.sendStatus(200);
    })
});

app.get('/allNotes', function(request,response){
    var filePath = __dirname + '/data/' + 'notes.json';
    fs.readFile(filePath,'utf8',function(error, data){
        if(error){
            return console.log('file reading error ' + filePath + error);
        }

        var notes = [];
        if(data){
            notes = JSON.parse(data);
        }

        response.send(notes);
    })
});

var listener = app.listen(8088, function(){
    var host = listener.address().address;
    var port = listener.address().port;

    console.log('App started at %s', dateTimeHelper.currentDateTime());
    console.log('App listening at http://%s:%s', host, port);
});