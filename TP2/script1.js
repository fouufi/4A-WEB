var http = require('http'); //http contient ttes les fonctions et objets exportés par le module
var url = require('url'); //ajout du module url
var querystring = require('querystring'); //ajout du module querystring
var fs = require('fs');
var mime = require('mime');
var ejs = require('ejs');

var serveur = http.createServer(function(req, res) //Callback
{
    console.log(req.url); //Affichage de la requete
    var requete = url.parse(req.url); //Requete
    var chemin = requete.pathname; //Récupération du chemin de la requete
    var params = querystring.parse(requete.query); //Récupération des arguments de la requete
    
    if(chemin == "/Fichiers/fichier1.txt")
    {        
        //Lecture du fichier
        fs.readFile(__dirname+"/"+chemin, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.end("Une erreur s'est produite. Veuillez vérifier votre requête !")
                return;
            }
            else
            {
                res.writeHead(200, {"Content-type": mimeType("fichier1.txt")});
                res.end(data);
            }
                
        })
    }
    else if(chemin == "/Fichiers/fichier2.txt")
    {
        //Lecture du fichier
        fs.readFile(__dirname+"/"+chemin, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            else
            {
                res.writeHead(200, {"Content-type": mimeType("fichier2.txt")});
                res.end(data);
            }
                
        })
    }
    else if(chemin == "/Fichiers/fichier3.html")
    {
        if ((("nbNombres" in params)== false) || (("minimum" in params)== false) || (("maximum" in params) == false))
        {
            res.end("Erreur : Argument manquant");
        }    
        
        ejs.renderFile(__dirname +'/Fichiers/fichier3.ejs',
        {
            nbNombres:parseInt(params.nbNombres),
            minimum:parseInt(params.minimum),
            maximum:parseInt(params.maximum)
        },
        
        function(err, data)
        {
            if (err)
            {
                console.log(err);
                res.end("Une erreur s'est produite.");
            }
            else
            {
                console.log("j'ai trouvé le fichier ejs");
                res.end(data);
            }
        });
        
        res.end();
    }
    else 
    {
        
        //Le fichier n'existe pas
        console.log("La page est introuvable");
        res.end("La page est introuvable");
    }
});

function mimeType(file)
{
    this.path = file;
    this.mime = mime.lookup(file);
    this.ext = mime.extension(this.mime);
    console.log(this.path);
    console.log(this.mime);
    console.log(this.ext);
    return this.mime;
}

serveur.listen(6666);
console.log("Serveur en écoute sur le port 6666");
