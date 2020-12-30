var express = require('express');
var serve_static = require('serve-static');
var http = require('http');
var fs = require('fs');

console.log("Chargement de la base de données");
let database = JSON.parse(fs.readFileSync('pokedex.json')); //Lecture de la db

var app = express();
//Activation du serveur statique
app.use(serve_static(__dirname+"/public"));

app.get('/pokemonsParCat/:categorie', function (req, res) {
    if (req.params.categorie=='all') res.send({statut:'OK', pokemons:database.pokemons});
    else{
        let resultat = [];
        database.pokemons.forEach(function(pokemon){ //database.types
            console.log(pokemon);

            if (pokemon.types.indexOf(req.params.categorie)!=-1){
                resultat.push(pokemon);
            }
        });
        console.log(resultat.length);
        res.send({statut:'OK', pokemons:resultat});
    }
});

app.get('/pokemonsParChar/:pokemonchar', function (req, res) {
    if (req.params.pokemonchar=='all') res.send({statut:'OK', pokemons:database.pokemons});
    else{
        let resultat = [];
        database.pokemons.forEach(function(pokemon){ //database.types
            console.log(pokemon);

            if (pokemon.types.indexOf(req.params.pokemonchar)!=-1){
                resultat.push(pokemon);
            }
        });
        console.log(resultat.length);
        res.send({statut:'OK', pokemons:resultat});
    }
});
//générer aléatoirement une équipe de 6 pokémons de type différents
app.get('/randomtypes', function (req, res)
{
    let random = Math.floor(Math.random() * (max-min+1) + min);
    
    
    res.end("Sorry, this part has not been finished yet!");
    //Unfinished
    
});

app.get('/pokemons', function (req, res) {
	res.send(database.pokemons);
});

app.get('/categories', function (req, res) {
	res.send(database.types);
});

  
//Récupération du serveur http de l'application
var serveur = http.Server(app);

//Ecoute sur un seul port
serveur.listen(8080, function()
{
	console.log("Serveur en écoute sur le port 8080");
});
