class BatimentClef extends Phaser.Scene{
    constructor(){
        super("BatimentClef");
        this.pad = null;
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
        this.load.image('lootPv','assets/spritesheet/pv.png');
        this.load.image('itembreche','assets/spritesheet/item_breche.png');

        this.load.image('bareDeVie_3Pv','assets/barre_de_vie/barre_vie_3pv.png');
        this.load.image('bareDeVie_2Pv','assets/barre_de_vie/barre_vie_2pv.png');
        this.load.image('bareDeVie_1Pv','assets/barre_de_vie/barre_vie_1pv.png');
        this.load.image('bareDeVie_0Pv','assets/barre_de_vie/barre_vie_0pv.png');
        this.load.image('bareDeVie_breche','assets/barre_de_vie/barre_vie_breche.png');

        this.load.image('coffre_fermer','assets/loot/coffre_fermer.png');
        this.load.image('coffre_ouvert','assets/loot/coffre_ouvert.png');

        this.load.image('inventaire','assets/inventaire/nbMine_nbSubstance.png');
        this.load.image('inventaire_breche','assets/inventaire/nbMine_nbSubstance_breche.png');
        this.load.image('inventaire_clef','assets/inventaire/nbMine_nbSubstance_clef.png');
        this.load.image('inventaire_breche_clef','assets/inventaire/nbMine_nbSubstance_breche_clef.png');

        this.load.image('tiles','assets/tiles/carte_teste.png');
        this.load.tilemapTiledJSON('map_clef','assets/tiles/batiment_clef.json'); 
    }
    create(){
        inventaire = this.add.image(1000,100,'inventaire') 
                .setDepth(1)
                .setScrollFactor(0);
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

        const map = this.make.tilemap({key: 'map_clef'});
        const tileset = map.addTilesetImage('carte_teste', 'tiles');
        const terrain = map.createLayer('sol', tileset, 0, 0);
        const mur = map.createLayer('mur', tileset, 0, 0);
        const zone = map.createLayer('chargement', tileset, 0, 0);

        mur.setCollisionByExclusion(-1, true);
        zone.setCollisionByExclusion(-1, true)
        
        player = this.physics.add.sprite(1224, 510, 'boomer_anime').setDepth(1);

        this.physics.add.collider(player, mur);
        this.physics.add.collider(player, zone, changementZone, null, this);
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

    /////////////////////////////   
    // ENEMIS ///////////////////
    /////////////////////////////

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
       
    /////////////////////////////   
    // COFFRE ///////////////////
    /////////////////////////////

    const coffreObjects = map.getObjectLayer('coffre').objects;
    this.coffres = this.physics.add.group({
        allowGravity: false
    }); 

    for (const coffre of coffreObjects) {

        this.coffres.create(coffre.x, coffre.y, 'coffre_fermer')
            .setOrigin(0.5,0.5)
            .setDepth(0.5)
            .setScale(1)
    }
    /////////////////////////////   
    // CLEF ///////////////////
    /////////////////////////////

    const clefObjects = map.getObjectLayer('clef').objects;
    this.clef = this.physics.add.group({
        allowGravity: false
    }); 

    for (const clef of clefObjects) {

        this.clef.create(clef.x, clef.y, 'coffre_fermer')
            .setOrigin(0.5,0.5)
            .setDepth(0.5)
            .setScale(1)
    }
    //manette
    if (this.input.gamepad.total === 0){
        this.input.gamepad.once('connected', function (pad, button, index) {
            paddle = pad;
            padConnected = true;
        }); 
    }
    else {
        paddle = this.input.gamepad.pad1;
    }
        cursors = this.input.keyboard.createCursorKeys();
        cursors2 = this.input.keyboard.addKeys('Z,Q,S,D,SPACE,A,E,SHIFT'); 

    /////////////////////////////   
    // ITEM BRECHE ///////////////
    /////////////////////////////

    const brecheObjects = map.getObjectLayer('breche').objects;
    this.itemBreche = this.physics.add.group({
        allowGravity: false
    }); 

    for (const itemBreche of brecheObjects) {

        this.itemBreche.create(itemBreche.x, itemBreche.y, 'itembreche')
            .setOrigin(0.5,0.5)
            .setDepth(0.5)
            .setScale(1)
    }

      /////////////////////////////   
     // CAMERA ///////////////////
    ///////////////////////////// 

        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        //this.cameras.main.zoom = 2;

      /////////////////////////////   
     // CHARGEMENT ///////////////
    /////////////////////////////

        function changementZone(player, zone){
            if (player.x >= 1224 && player.y >= 468 && player.y <= 550){
                this.scene.start("Ville");
                console.log("changement");
                brecheVille = false;
                brecheCoffre = false;
                villeTuto = false;
                finVille = false;
                finSorti = false;
                clefVille = true;
                villeBreche = false;
                villeBreche_2 = false;
                tutoVille = false;
                villeFin = false;
                villeFin_2 = false;
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
        afficheMine.setText('Nb Mine : ' + player.y);
        afficheSB.setText('Nb Mine : ' + player.x);
        const poseMine = Phaser.Input.Keyboard.JustDown(cursors2.E)
        //const poseMinePad = Phaser.Input.paddle.justPressed(paddle.B)

        if(pv === 3)
        {
            barreVie = this.add.image(400,100,'bareDeVie_3Pv') 
                .setDepth(1)
                .setScrollFactor(0);
        }
        
        if (pv === 2){

            //vie3.destroy();
            
            barreVie = this.add.image(400,100,'bareDeVie_2Pv') 
                .setDepth(1)
                .setScrollFactor(0);
        }
        
        if (pv === 1){
            
            barreVie = this.add.image(400,100,'bareDeVie_1Pv') 
                .setDepth(1)
                .setScrollFactor(0);
        }
        if (pv===0){
            gameOver = true;
            barreVie = this.add.image(400,100,'bareDeVie_0Pv') 
                .setDepth(1)
                .setScrollFactor(0);
        }
        if (brecheRecup){
            inventaire = this.add.image(1000,100,'inventaire_breche') 
            .setDepth(1)
            .setScrollFactor(0); 
        }
        if (recupclef){
            inventaire = this.add.image(1000,100,'inventaire_clef') 
            .setDepth(1)
            .setScrollFactor(0); 
        }
        if (recupclef && brecheRecup){
            inventaire = this.add.image(1000,100,'inventaire_breche_clef') 
            .setDepth(1)
            .setScrollFactor(0);
        }

      /////////////////////////////   
     // CONTROLE CLAVIER /////////
    /////////////////////////////

        if (cursors.right.isDown){
            if (gameOver == false){
                gauche = false;
                droite = true;
                dos = false;
                face = false;
                player.setVelocityX(vitesse);
                player.anims.play('droite', true);
            }
        }
        else if (cursors.left.isDown){
            if (gameOver == false){
                gauche = true;
                droite = false;
                dos = false;
                face = false;
                player.setVelocityX(-vitesse);
                player.anims.play('gauche', true);
            }
            
            
        }
        else if (cursors.right.isUp && cursors.left.isUp){
            player.setVelocityX(0);
            if (gameOver == false){
                if (gauche == true){
                    player.anims.play('gauche_neutre', true);
                }
                else if (droite == true){
                    player.anims.play('droite_neutre', true);
                }
            }
            
        }
        if (cursors.up.isDown){
            if (gameOver == false){
                gauche = false;
                droite = false;
                dos = true;
                face = false;
                player.setVelocityY(-vitesse);
                player.anims.play('dos', true);
            } 
        }
        else if (cursors.down.isDown){
            if (gameOver == false){
                gauche = false;
                droite = false;
                dos = false;
                face = true;

                player.setVelocityY(vitesse);
                player.anims.play('face', true);
            }
            
            
        }
        else if (cursors.up.isUp && cursors.down.isUp){
            player.setVelocityY(0);
            if (gameOver == false){
                if (dos == true){
                    player.anims.play('dos_neutre', true);
                }
                else if (face == true){
                    player.anims.play('face_neutre', true);
                }
            }
            
        }

        if (cursors.up.isDown && cursors.left.isDown){
            if (gameOver == false){
                player.setVelocityY(-(vitesse*0.7));
                player.setVelocityX(-(vitesse*0.7));
            }
        }
        else if (cursors.up.isDown && cursors.right.isDown){
            if (gameOver == false){
                player.setVelocityY(-(vitesse*0.7));
                player.setVelocityX(vitesse*0.7);
            }
            
        }
        else if (cursors.down.isDown && cursors.left.isDown){
            if (gameOver == false){
                player.setVelocityY(vitesse*0.7);
                player.setVelocityX(-(vitesse*0.7));
            } 
        }
        else if ( cursors.down.isDown && cursors.right.isDown){
            if (gameOver == false){
                player.setVelocityY(vitesse*0.7);
                player.setVelocityX((vitesse*0.7));
            }
        }
      /////////////////////////////   
     // CONTROLE PAD /////////////
    /////////////////////////////
    
        this.input.gamepad.once('connected', function (pad) {
            paddle = pad;
            padConnected = true;
        });
        if (padConnected){

            if (cursors.right.isDown || paddle.right ){
                if (gameOver == false){
                    gauche = false;
                    droite = true;
                    dos = false;
                    face = false;
                    player.setVelocityX(vitesse);
                    player.anims.play('droite', true);
                }
            }
            else if (cursors.left.isDown || paddle.left){
                if (gameOver == false){
                    gauche = true;
                    droite = false;
                    dos = false;
                    face = false;
                    player.setVelocityX(-vitesse);
                    player.anims.play('gauche', true);
                }
                
                
            }
            else if (cursors.right.isUp && cursors.left.isUp){
                player.setVelocityX(0);
                if (gameOver == false){
                    if (gauche == true){
                        player.anims.play('gauche_neutre', true);
                    }
                    else if (droite == true){
                        player.anims.play('droite_neutre', true);
                    }
                }
                
            }
            if (cursors.up.isDown || paddle.up){
                if (gameOver == false){
                    gauche = false;
                    droite = false;
                    dos = true;
                    face = false;
                    player.setVelocityY(-vitesse);
                    player.anims.play('dos', true);
                } 
            }
            else if (cursors.down.isDown || paddle.down){
                if (gameOver == false){
                    gauche = false;
                    droite = false;
                    dos = false;
                    face = true;
    
                    player.setVelocityY(vitesse);
                    player.anims.play('face', true);
                }
                
                
            }
            else if (cursors.up.isUp && cursors.down.isUp){
                player.setVelocityY(0);
                if (gameOver == false){
                    if (dos == true){
                        player.anims.play('dos_neutre', true);
                    }
                    else if (face == true){
                        player.anims.play('face_neutre', true);
                    }
                }
                
            }
    
            if (cursors.up.isDown && cursors.left.isDown || paddle.up && paddle.left){
                if (gameOver == false){
                    player.setVelocityY(-(vitesse*0.7));
                    player.setVelocityX(-(vitesse*0.7));
                }
            }
            else if (cursors.up.isDown && cursors.right.isDown || paddle.up && paddle.right){
                if (gameOver == false){
                    player.setVelocityY(-(vitesse*0.7));
                    player.setVelocityX(vitesse*0.7);
                }
                
            }
            else if (cursors.down.isDown && cursors.left.isDown || paddle.down && paddle.left){
                if (gameOver == false){
                    player.setVelocityY(vitesse*0.7);
                    player.setVelocityX(-(vitesse*0.7));
                } 
            }
            else if ( cursors.down.isDown && cursors.right.isDown || paddle.down && paddle.right){
                if (gameOver == false){
                    player.setVelocityY(vitesse*0.7);
                    player.setVelocityX((vitesse*0.7));
                }
            }

            if (cursors2.Q.isDown && brecheRecup && gameOver == false || paddle.A && brecheRecup && gameOver == false){

                barreVie = this.add.image(400,100,'bareDeVie_breche')
                    .setDepth(1)
                    .setScrollFactor(0); 
    
                player.setVelocity(0);
                breche = true;
                player.setTint(6754E1);
    
            }
            else if (invincible == false){
                breche = false;
                player.setTint(0xffffff);
            }

            if (poseMine && gameOver == false || paddle.B.isDown && gameOver == false) {
                if ( nbMine > 0){
                    nbMine -= 1;
                    afficheMine.setText('Nb Mine : ' + nbMine);
                    mine = this.physics.add.sprite(player.x,player.y, 'mine');
                    mine.body.height = zoneActionMine;
                    mine.body.width = zoneActionMine;
                    mine.body.setOffset(-((zoneActionMine/2)-(48/2)),-((zoneActionMine/2)-(48/2)));
                } 
            }
        }

        const detonation = Phaser.Input.Keyboard.JustDown(cursors2.D)
        
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
        if (cursors2.Q.isDown && brecheRecup && gameOver == false){

            barreVie = this.add.image(400,100,'bareDeVie_breche')
                .setDepth(1)
                .setScrollFactor(0); 

            player.setVelocity(0);
            breche = true;
            player.setTint(6754E1);

        }
        else if (invincible == false){
            breche = false;
            player.setTint(0xffffff);
        }
        

        if (poseMine && gameOver == false) {
            if ( nbMine > 0){
                nbMine -= 1;
                afficheMine.setText('Nb Mine : ' + nbMine);
                mine = this.physics.add.sprite(player.x,player.y, 'mine');
                mine.body.height = zoneActionMine;
                mine.body.width = zoneActionMine;
                mine.body.setOffset(-((zoneActionMine/2)-(48/2)),-((zoneActionMine/2)-(48/2)));
            } 
        }
      /////////////////////////////   
     // COMPORTEMENT ENNEMIE /////
    /////////////////////////////

        for (const enemie of this.enemies.children.entries) {
            if (enemie.body.blocked.right) {
                enemiesDirection = Math.floor(Math.random() * Math.floor(3));
                if (enemiesDirection == 0){
                    enemie.direction = 'LEFT';
                }
                else if (enemiesDirection == 1){
                    enemie.direction = 'UP';
                }
                else if (enemiesDirection == 2){
                    enemie.direction = 'DOWN';
                }
            }
    
            if (enemie.body.blocked.left) {
                enemiesDirection = Math.floor(Math.random() * Math.floor(3));
                if (enemiesDirection == 0){
                    enemie.direction = 'RIGHT';
                }
                else if (enemiesDirection == 1){
                    enemie.direction = 'UP';
                }
                else if (enemiesDirection == 2){
                    enemie.direction = 'DOWN';
                }
            }

            if (enemie.body.blocked.up) {
                enemiesDirection = Math.floor(Math.random() * Math.floor(3));
                if (enemiesDirection == 0){
                    enemie.direction = 'RIGHT';
                }
                else if (enemiesDirection == 1){
                    enemie.direction = 'LEFT';
                }
                else if (enemiesDirection == 2){
                    enemie.direction = 'DOWN';
                }
            }
            if (enemie.body.blocked.down) {
                enemiesDirection = Math.floor(Math.random() * Math.floor(3));
                if (enemiesDirection == 0){
                    enemie.direction = 'RIGHT';
                }
                else if (enemiesDirection == 1){
                    enemie.direction = 'LEFT';
                }
                else if (enemiesDirection == 2){
                    enemie.direction = 'UP';
                }
            }
    
            if (enemie.direction === 'RIGHT') {
                enemie.setVelocityX(enemiesVitesse);
                //enemie.setFlipX(true);
                //enemie.anims.play("loup", true);
            }
            else if (enemie.direction === 'RIGHT'){
                enemie.setVelocityX(-enemiesVitesse);
            } 
            else if (enemie.direction === 'UP'){
                enemie.setVelocityY(-enemiesVitesse);
            }
            else if (enemie.direction === 'DOWN'){
                enemie.setVelocityY(enemiesVitesse);
            }
            else {
                enemie.setVelocityX(-enemiesVitesse);
                //enemie.setFlipX(false);
                //enemie.anims.play("loup", true);
            }
           
        }

        this.physics.add.overlap(this.enemies, this.enemies.children.entries);
        this.physics.add.overlap(this.enemies, mine, ActiveMine, null, this);

        function ActiveMine (mine,enemie){
            mine.destroy();
            enemie.destroy();
            aleatoire = Math.floor(Math.random() * Math.floor(3));
            if (aleatoire == 0){
                lootSubstance = this.physics.add.sprite(enemie.x,enemie.y, 'lootSubstance');
            }
            else if (aleatoire == 1){
                lootMine = this.physics.add.sprite(enemie.x,enemie.y, 'lootMine');
            }
            else if (aleatoire == 2){
                lootPv = this.physics.add.sprite(enemie.x,enemie.y, 'lootPv');
            }
            
        }

        this.physics.add.overlap(player,lootSubstance,recupSubstance,null, this);
        this.physics.add.overlap(player,lootMine,recupMine,null, this);
        this.physics.add.overlap(player,lootPv,recupPv,null, this);
        
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
        function recupPv (player,lootPv){
            if (pv < pvMax){
                lootPv.destroy();
                pv ++;
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
           if (invincible == false && breche == false && gameOver == false){
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

        ////// ITEM BRECHE ///////////////////////

        
        this.physics.add.collider(this.itemBreche ,player, recupBreche, null,this);

        function recupBreche(player,itemBreche){
            itemBreche.destroy();
            brecheRecup = true;
            
        }

        ////// ITEM COFFRE ///////////////////////
        
        this.physics.add.collider(this.coffres ,player, ouvreCoffre, null,this);
        function ouvreCoffre (player, coffre){
            coffre.destroy();
            coffreOpen = this.physics.add.sprite(coffre.x,coffre.y, 'coffre_ouvert');
            aleatoire = Math.floor(Math.random() * Math.floor(3));
            if (aleatoire == 0){
                lootSubstance = this.physics.add.sprite(coffreOpen.x,coffreOpen.y, 'lootSubstance');
            }
            else if (aleatoire == 1){
                lootMine = this.physics.add.sprite(coffreOpen.x,coffreOpen.y, 'lootMine');
            }
            else if (aleatoire == 2){
                lootPv = this.physics.add.sprite(coffreOpen.x,coffreOpen.y, 'lootPv');
            }
        }

        ////// ITEM CLEF ///////////////////////

        this.physics.add.collider(this.clef ,player, recupClef, null,this);
        function recupClef (player, clef){
            clef.destroy();
            recupclef = true;
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