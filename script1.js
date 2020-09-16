var http = require('http'); //http contient ttes les fonctions et objets exportés par le module

var serveur = http.createServer(function(req, res)
{
    console.log(req.url);
    var requete = req.url;
    res.writeHead(200, {"Content-type": "text/plain"});
    
    if(requete=="/direBonjour")
    {
        res.end("Salut Utilisateur !");
    }
    else if (requete=="/direAuRevoir")
    {
        res.end("Au revoir Utilisateur !");
    }
    else
    {
        res.end("Service inconnu");
    }
});

serveur.listen(8080);
console.log("Serveur en écoute sur le port 8080");