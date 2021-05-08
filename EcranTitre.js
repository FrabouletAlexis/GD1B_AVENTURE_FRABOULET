var player;
var pv = 3;
var pvMax = 3;
var barreVie;
var barreVieX = 250;
var BarreVieY = 80;
var ecranTitre;
var ecranFin;
var inventaire;
var inventaireX = 980;
var inventaireY = 70;
var gamepad;
var paddle;
var padConnected;
var pad;
var play = false;
var recupclef = false;
var coffre;
var coffreOpen;

var tutoVille = false;
var villeTuto = false;

var villeBreche = false;
var villeBreche_2 = false;
var brecheVille = false;
var brecheCoffre = false;
var villeClef = false;
var clefVille = false;
var finVille = false;
var villeFin = false;
var finSorti = false;
var villeFin_2 =false;

var gameOver = false;

var enemiesDirection;
var enemiesVitesse = 100;

var invincible = false;
var resetCompteur = 200;
var compteur = resetCompteur;
var affichePV;
var affichetest;
var afficheSB;
var afficheSeve;
var afficheNbMine;
var aleatoire;

var afficheTutoMine;
var afficheTutoMouve;
var afficheTutoBreche;
var afficheGameOver;

var gauche = false;
var droite = false;
var dos = false;
var face = false;
var compteurAttaque = 60;
var cursors;
var cursors2;
var vitesse = 200;

var lootSubstance;
var nbSubstance = 0;

var breche = false;
var brecheRecup = false;
var itemBreche;

var lootPv;

var lootMine;
var mine;
var nbMine = 5;
var mineMax = 5;
var afficheMine;
var zoneActionMine = 100;
class EcranTitre extends Phaser.Scene{
    constructor(){
        super("EcranTitre");
    }
    init(data){
    }
    preload(){

        this.load.image('ecranTitre','assets/ecran-titre.png');
    }
    create(){
        ecranTitre = this.add.image(1280/2 ,780/2 ,'ecranTitre')
         
    }
    update(){
        this.input.on('pointerdown', function (pointer) {
            ecranTitre.destroy();
            play = true;
            
        })
        if(play === true )
          this.scene.start("Tuto"); 
    }
}      