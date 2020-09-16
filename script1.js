var http = require('http'); //http contient ttes les fonctions et objets exportés par le module

var serveur = http.createServer(function(req, res)
{
    console.log("Requête d'un client ");
    res.writeHead(200, {"Content-type": "text/plain"});
    res.end("Salut tout le monde !");
});

serveur.listen(8080);
console.log("Serveur en écoute sur le port 8080");