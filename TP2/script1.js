var http = require('http'); //http contient ttes les fonctions et objets exportés par le module
var url = require('url'); //ajout du module url
var querystring = require('querystring'); //ajout du module querystring
var fs = require('fs');

var serveur = http.createServer(function(req, res) //Callback
{
    console.log(req.url); //Affichage de la requete
    var requete = url.parse(req.url); //Requete
    var chemin = requete.pathname; //Récupération du chemin de la requete
    var params = querystring.parse(requete.query); //Récupération des arguments de la requete
    res.writeHead(200, {"Content-type": "text/plain"});

    if(req.url = "/fichier1.txt")
    {
        //Lecture du fichier
    }
    else if(req.url = "/fichier2.txt")
    {
        //Lecture du fichier
    }
    else if(req.url = "/fichier3.txt")
    {
        //Lecture du fichier
    }
    else 
    {
        //Le fichier n'existe pas
        console.log("La page est introuvable");
        res.end("La page est introuvable");
    }
});

fs.readFile(__dirname+"/"+chemin+"/"+nomFichier, function(err,data))
{
    if(err)
    {
        //Traitement de l'erreur et envoie d'une réponse
        console.log("Erreur de lecture du fichier");
    }
    else
    {
        //Ecriture de l'entête
        //TODO: en fonction de l'extension
        //on envoit au navigateur le type de fichier

        //Envoi du contenu du fichier
        res.end(data, 'binary');
    }
});

serveur.listen(8080);
console.log("Serveur en écoute sur le port 8080");