class SceneThree extends Phaser.Scene{
    constructor(){
        super("SceneThree");
    }
    init(data){
    }
    preload(){
        this.load.spritesheet('boomer_anime', 'assets/spritesheet/boomer.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('arbre', 'assets/spritesheet/ennemis.png', { frameWidth: 48, frameHeight: 48 });

        this.load.image('bombe','assets/spritesheet/bombe.png');
        this.load.image('mine','assets/spritesheet/mine.png');
        this.load.image('lootMine','assets/spritesheet/lootMine.png');
        this.load.image('lootSubstance','assets/spritesheet/substance.png');

        this.load.image('tiles','assets/tiles/carte_teste.png');
        this.load.tilemapTiledJSON('map','assets/tiles/carte_teste.json'); 
    }
    create(){
        
        /*const map = this.make.tilemap({key : 'map'});
        const tileset = map.addTilesetImage('carte_teste','tiles');
        
        map.createDynamicLayer('sol',tileset, 0, 0);
        const mur = map.createDynamicLayer('mur',tileset, 0, 0);
        const chargement = map.createDynamicLayer('chargement',tileset, 0,0);
        
        mur.setCollisionByExclusion(-1,true)
        chargement.setCollisionByExclusion(-1,true)
    
        mur.setCollisionByProperty({ collides: true });
        chargement.setCollisionByProperty({ collides: true });

        player = this.physics.add.sprite(500, 100, 'lusan_anime');
        
        this.physics.add.collider(player, mur);
        this.physics.add.collider(player, chargement, changementZone, null, this);*/
        afficheMine = this.add.text(10, 100, 'Nb Mine : ' + nbMine, { fontSize: '32px', fill: '#48E14E' }).setScrollFactor(0).setDepth(1);
        affichePV = this.add.text(10, 30, 'pv : ' + pv, { fontSize: '32px', fill: '#48E14E' }).setScrollFactor(0).setDepth(1);
        afficheSB = this.add.text(10, 50, 'pv : ' + nbSubstance, { fontSize: '32px', fill: '#48E14E' }).setScrollFactor(0).setDepth(1);

        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('carte_teste', 'tiles');
        const terrain = map.createLayer('sol', tileset, 0, 0);
        const mur = map.createLayer('mur', tileset, 0, 0);
        const zone = map.createLayer('chargement', tileset, 0, 0);

        mur.setCollisionByExclusion(-1, true);
        zone.setCollisionByExclusion(-1, true)

        player = this.physics.add.sprite(500, 100, 'boomer_anime').setDepth(1);

        this.physics.add.collider(player, mur);
        this.physics.add.overlap(player, zone, changementZone, null, this);
////// ANIME FACE ///////////////////////      
        this.anims.create({
            key: 'face',
            frames: this.anims.generateFrameNumbers('boomer_anime', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'face_neutre',
            frames: [ { key: 'boomer_anime', frame: 1 } ],
            frameRate: 10,
        });
////// ANIME GAUCHE ///////////////////////
        this.anims.create({
            key: 'gauche',
            frames: this.anims.generateFrameNumbers('boomer_anime', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'gauche_neutre',
            frames: [ { key: 'boomer_anime', frame: 4 } ],
            frameRate: 10,
        });
////// ANIME DROITE /////////////////////// 
        this.anims.create({
            key: 'droite',
            frames: this.anims.generateFrameNumbers('boomer_anime', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'droite_neutre',
            frames: [ { key: 'boomer_anime', frame: 7 } ],
            frameRate: 10,
        });
////// ANIME DOS ///////////////////////
        this.anims.create({
            key: 'dos',
            frames: this.anims.generateFrameNumbers('boomer_anime', { start: 9, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'dos_neutre',
            frames: [ { key: 'boomer_anime', frame: 10 } ],
            frameRate: 10,
        });

////// ENNEMIS ///////////////////////

        const enemieObjects = map.getObjectLayer('enemie').objects;
        this.enemies = this.physics.add.group({
            allowGravity: false
        }); 

        for (const enemie of enemieObjects) {

            this.enemies.create(enemie.x, enemie.y, 'arbre')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
        }
        
        this.physics.add.collider(this.enemies, mur);
        this.physics.add.collider(this.enemies, zone);
        

        cursors = this.input.keyboard.createCursorKeys();
        cursors2 = this.input.keyboard.addKeys('Z,Q,S,D,SPACE,A,E,SHIFT');      
      /////////////////////////////   
     // CAMERA ///////////////////
    ///////////////////////////// 

        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        function changementZone(player, zone){
            if (player.y >= 730 && player.x >= 400 && player.x <= 560){
                this.scene.start("SceneOne");
                console.log("changement");
                /*cursors.up.reset();
                cursors.down.reset();
                cursors.right.reset();
                cursors.left.reset();*/
            }
        }
        
        /*function poserBombe (player){
            if (bombePoser == true){
                for (const bombe of this.bombes.children.entries) {
                    var bombe = bombes.create(player.x, player.y, 'bombe');
        
                    bombe.body.height = zoneActionBombe;
                    bombe.body.width = zoneActionBombe;
                    bombe.body.setOffset(-((zoneActionBombe/2)-(48/2)),-((zoneActionBombe/2)-(48/2)));
                }
            }
        } */
       
    }
    update(){
        
        if (cursors.right.isDown){
            gauche = false;
            droite = true;
            dos = false;
            face = false;
            player.setVelocityX(vitesse1);
            player.anims.play('droite', true);
            
        }
        else if (cursors.left.isDown){
            gauche = true;
            droite = false;
            dos = false;
            face = false;
            player.setVelocityX(-vitesse1);
            player.anims.play('gauche', true);
        }
        else if (cursors.up.isDown){
            gauche = false;
            droite = false;
            dos = true;
            face = false;
            player.setVelocityY(-vitesse1);
            player.anims.play('dos', true);
        }
        else if (cursors.down.isDown){
            gauche = false;
            droite = false;
            dos = false;
            face = true;

            player.setVelocityY(vitesse1);
            player.anims.play('face', true);
        }
        else{
            player.setVelocity(0);
            if (gauche == true){
                player.anims.play('gauche_neutre', true);
            }
            else if (droite == true){
                player.anims.play('droite_neutre', true);
            }
            else if (dos == true){
                player.anims.play('dos_neutre', true);
            }
            else if (face == true){
                player.anims.play('face_neutre', true);
            }
        }

        const detonation = Phaser.Input.Keyboard.JustDown(cursors2.D)
        const poseMine = Phaser.Input.Keyboard.JustDown(cursors2.E)
        const useBreche = Phaser.Input.Keyboard.JustDown(cursors2.Q)

       /* if (poseBombe) {
            if (bombePoser == false && nbBombe > 0){
                bombePoser = true;
                nbBombe -= 1;
                afficheBombe.setText('Nb Bombe : ' + nbBombe);
                bombe = this.physics.add.sprite(player.x,player.y, 'mine');
                bombe.body.height = zoneActionBombe;
                bombe.body.width = zoneActionBombe;
                bombe.body.setOffset(-((zoneActionBombe/2)-(48/2)),-((zoneActionBombe/2)-(48/2)));
            }         
        }

        if (detonation && bombePoser == true){
            bombe.disableBody(true, true);
            bombe.destroy();
            degatBombe = true;
            bombePoser = false;
            
        }*/
        /*if (dash){
            if (gauche == true){
                player.setVelocityX(-vitesseDash);
            }
            else if (droite == true){
                player.setVelocityX(vitesseDash);
            }
            else if (dos == true){
                player.setVelocityY(-vitesseDash);
            }
            else if (face == true){
                player.setVelocityY(vitesseDash);
            }
        }*/
        if (cursors2.Q.isDown){

            player.setVelocity(0);
            breche = true;
            player.setTint(6754E1);

        }
        else if (invincible == false){
            breche = false;
            player.setTint(0xffffff);
        }
        

        if (poseMine) {
            if ( nbMine > 0){
                nbMine -= 1;
                afficheMine.setText('Nb Mine : ' + nbMine);
                mine = this.physics.add.sprite(player.x,player.y, 'mine');
                mine.body.height = zoneActionMine;
                mine.body.width = zoneActionMine;
                mine.body.setOffset(-((zoneActionMine/2)-(48/2)),-((zoneActionMine/2)-(48/2)));
            } 
        }

        for (const enemie of this.enemies.children.entries) {
            if (enemie.body.blocked.right) {
                enemie.direction = 'LEFT';
            }
    
            if (enemie.body.blocked.left) {
                enemie.direction = 'RIGHT';
            }
    
            if (enemie.direction === 'RIGHT') {
                enemie.setVelocityX(300);
                //enemie.setFlipX(true);
                //enemie.anims.play("loup", true);
            } else {
                enemie.setVelocityX(-300);
                //enemie.setFlipX(false);
                //enemie.anims.play("loup", true);
            }
           
        }
        //this.physics.add.overlap(this.enemies, bombe, ActiveBombe, null, this);
        this.physics.add.overlap(this.enemies, mine, ActiveMine, null, this);

        function ActiveMine (mine,enemie){
            mine.destroy();
            enemie.destroy();
            lootSubstance = this.physics.add.sprite(enemie.x-10,enemie.y, 'lootSubstance');
            lootMine = this.physics.add.sprite(enemie.x,enemie.y-20, 'lootMine');
        }

        this.physics.add.overlap(player,lootSubstance,recupSubstance,null, this);
        this.physics.add.overlap(player,lootMine,recupMine,null, this);
        
        function recupSubstance(player,lootSubstance){
            lootSubstance.destroy();
            nbSubstance = nbSubstance + 60;
                
            afficheSB.setText('SB : ' + nbSubstance);

        }
        function recupMine (player,lootMine){
            if (nbMine < mineMax){
                lootMine.destroy();
                nbMine ++;
            }
            

        }
      /* function ActiveBombe (bombe,enemie){

            if (degatBombe == true){
                enemie.disableBody(true, true);
            }
            affichetest.setText('TEST : ' + degatBombe);
        }*/
        this.physics.add.overlap(this.enemies, player,degat,null, this);

        function degat( player, enemies){
           if (invincible == false && breche == false){
                invincible = true;
                pv--;
                player.setTint(0xff0000);
                affichePV.setText('PV : ' + pv);
            }
        }
        if(invincible == true){
            compteur-- ;
            if(compteur == 0){
                compteur = resetCompteur;
                player.setTint(0xffffff);
                invincible = false ;
            }
        }

                
    }
    /*function sceneSuite (player, chargement){
        this.scene.start('SceneTwo');
    }*/
    /*poserBombe (player){
        if (bombePoser == true){
            for (const bombe of this.bombes.children.entries) {
                var bombe = bombes.create(player.x, player.y, 'bombe');
    
                bombe.body.height = zoneActionBombe;
                bombe.body.width = zoneActionBombe;
                bombe.body.setOffset(-((zoneActionBombe/2)-(48/2)),-((zoneActionBombe/2)-(48/2)));
            }
        }
    }*/
}   