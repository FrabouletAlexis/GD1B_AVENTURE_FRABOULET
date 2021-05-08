class EcranFin extends Phaser.Scene{
    constructor(){
        super("EcranFin");
    }
    init(data){
    }
    preload(){

        this.load.image('ecranFin','assets/ecran-fin.png');
    }
    create(){
        ecranTitre = this.add.image(1280/2 ,780/2 ,'ecranFin')
        afficheSeve = this.add.text(150, 430, 'Vous avez récoltez ' + nbSubstance + ' unités de sève ! ',
         { fontSize: '45px', fill: '#E1E1E1' }).setScrollFactor(0).setDepth(2);
    }
    update(){
        
    }
}      