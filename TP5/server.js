var http = require('http'); //http contient ttes les fonctions et objets exportés par le module
var url = require('url'); //ajout du module url
var fs = require('fs');
var express = require('express');
var serve_static = require('serve-static');


var app = express();
app.use(serve_static(__dirname+"/public"));

//Récupération du serveur http de l'application 
var serveur = http.Server(app);
let database = JSON.parse(fs.readFileSync('data.json'));

app.get('/categories', function (req, res) {
    res.send(database.genres);
});

//Ecoute sur un seul port
serveur.listen(8080, function()
{
    console.log("Serveur en écoute sur le port 8080");
});

