var http = require('http'); //http contient ttes les fonctions et objets exportés par le module
var url = require('url'); //ajout du module url
var querystring = require('querystring'); //ajout du module querystring

var serveur = http.createServer(function(req, res) //Callback
{
    console.log(req.url); //Affichage de la requete
    var requete = url.parse(req.url); //Requete
    var chemin = requete.pathname; //Récupération du chemin de la requete
    var params = querystring.parse(requete.query); //Récupération des arguments de la requete
    res.writeHead(200, {"Content-type": "text/plain"});
    
    var ip = req.connection.remoteAddress; //Récupération de l'addresse ip du client
    var user = new Array({ip_u: ip, nom_u: params.nom, prenom_u: params.prenom});
   
    //Dire bonjour 
    if(chemin == "/direBonjour")
    {
        if ((("nom" in params)== false) ||("prenom" in params) == false)
        {
            res.end("erreur : Argument manquant");
        }
        res.end("Salut " + params.nom + " " + params.prenom + "!");
        getIP();
    }

    //Dire au revoir
    else if (chemin == "/direAuRevoir")
    {
        getIP();
        /*if ((("nom" in params)== false) ||("prenom" in params) == false)
        {
            res.end("erreur : Argument manquant");
        }
        res.end("Au Revoir " + params.nom + " " + params.prenom + "!");
    */
    }

    //Erreur car pas de reconnaissance de la requete
    else
    {
        res.end("Service inconnu");
    }
});

function getIP()
{
    var filter_ip = user.filter(user => (user.ip_u === ip));
    if (ip in filter_ip)
    {
        res.end("Vous vous répétez ...");
        //return user[ip_u];
    }
    else
    {
        user.ip_u = ip;
        user.nom_u = params.nom;
        user.prenom_u = params.prenom;
        
    }
}

serveur.listen(8080);
console.log("Serveur en écoute sur le port 8080");