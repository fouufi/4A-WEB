var express = require('express');
var serve_static = require('serve-static');
var http = require('http');
var fs = require('fs');

console.log("Chargement de la base de données");
let database = JSON.parse(fs.readFileSync('./Donnees/pokedex.json')); //Lecture de la db

var app = express();
//Activation du serveur statique
app.use(serve_static(__dirname+"/public"));

app.get('/pokemonsParCat/:categorie', function (req, res) {
    if (req.params.categorie=='all') res.send({statut:'OK', pokemons:database.pokemons});
    else{
        let resultat = [];
        database.types.forEach(function(pokemon){
var express = require('express'); 
            console.log(pokemon);

            if (pokemon.nom.indexOf(req.params.categorie)!=-1){
                resultat.push(pokemon);
            }
        });
        console.log(resultat.length);
        res.send({statut:'OK', pokemons:resultat});
    }
  });

//Affiche la liste des pokémons dont le nom contient la chaîne passée en paramètre 
app.get('/pokemonsParNom/:chaine', function (req, res) {
    
    let sub_pokename = req.params.chaine;
    sub_pokename = sub_pokename.toLowerCase(req.params.chaine);
    
    let is_included;
    is_included = database.pokemons.includes(sub_pokename);
    
    if (is_included == true)
    {
        res.send("Match founded with the substring :", sub_pokename);
    }
    else
    {
        res.send("sorry not here!");
    }
});
//générer aléatoirement une équipe de 6 pokémons de type différents
app.get('/randomtypes', function (req, res)
{
    let random = Math.floor(Math.random() * (max-min+1) + min);
    let nb_poke = 6;
    
    res.end("Sorry, this part has not been finished yet!");
    //Unfinished
    
});



app.get('/pokemons', function (req, res) {
	res.send(database.pokemons);
});

app.get('/types', function (req, res) {
	res.send(database.types);
});

  
//Récupération du serveur http de l'application
var serveur = http.Server(app);

//Ecoute sur un seul port
serveur.listen(8080, function()
{
	console.log("Serveur en écoute sur le port 8080");
});
