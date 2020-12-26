var express = require('express');
var serve_static = require('serve-static');
var http = require('http');
var fs = require('fs');

console.log("Chargement de la base de données");
let database = JSON.parse(fs.readFileSync('database.json'));


var app = express();
//Activation du serveur statique
app.use(serve_static(__dirname+"/public"));

app.get('/listeFilms/:categorie', function (req, res) {
  if (req.params.categorie=='all') res.send({statut:'OK', movies:database.movies});
  else{
  	let resultat = [];
  	database.movies.forEach(function(movie){
  		console.log(movie);
  		if (movie.genres.indexOf(req.params.categorie)!=-1){
  			resultat.push(movie);
  		}
  	});
  	console.log(resultat.length);
  	res.send({statut:'OK', movies:resultat});
  }
});

app.get('/categories', function (req, res) {
	res.send(database.genres);
});
  
//Récupération du serveur http de l'application
var serveur = http.Server(app);

//Ecoute sur un seul port
serveur.listen(6000, function()
{
	console.log("Serveur en écoute sur le port 6000");
});
