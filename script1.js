var http = require('http'); //http contient ttes les fonctions et objets exportés par le module
var url = require('url');
var querystring = require('querystring');

var serveur = http.createServer(function(req, res)
{
    console.log(req.url);
    var requete = url.parse(req.url);
    var chemin = requete.pathname;
    var params = querystring.parse(requete.query);

    res.writeHead(200, {"Content-type": "text/plain"});
    
    if(chemin == "/direBonjour")
    {
        if ((("nom" in params)== false) ||("prenom" in params) == false)
        {
            res.end("erreur : Argument manquant");
        }
        res.end("Salut " + params.nom + " " + params.prenom + "!");
    }
    else if (chemin == "/direAuRevoir")
    {
        if ((("nom" in params)== false) ||("prenom" in params) == false)
        {
            res.end("erreur : Argument manquant");
        }
        res.end("Au Revoir " + params.nom + " " + params.prenom + "!");
    }
    else
    {
        res.end("Service inconnu");
    }
});

serveur.listen(8080);
console.log("Serveur en écoute sur le port 8080");