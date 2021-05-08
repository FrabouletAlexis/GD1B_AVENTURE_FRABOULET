class BatimentFin extends Phaser.Scene{
    constructor(){
        super("BatimentFin");
        this.pad = null;
    }
    init(data){
    }
    preload(){
        this.load.spritesheet('boomer_anime', 'assets/spritesheet/boomer2.png', { frameWidth: 80, frameHeight: 96 });
        //this.load.spritesheet('boomer_anime', 'assets/spritesheet/boomer.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('arbre', 'assets/spritesheet/ennemis.png', { frameWidth: 80, frameHeight: 96 });
        this.load.spritesheet('mine', 'assets/spritesheet/mine.png', { frameWidth: 48, frameHeight: 48 });

        //this.load.image('mine','assets/spritesheet/mine.png');
        this.load.image('lootMine','assets/spritesheet/lootMine.png');
        this.load.image('lootSubstance','assets/spritesheet/substance.png');
        this.load.image('lootPv','assets/spritesheet/pv.png');
        this.load.image('itembreche','assets/spritesheet/item_breche.png');
        this.load.image('clef','assets/spritesheet/clef.png');

        this.load.image('cadavre','assets/spritesheet/cadavre.png');
        this.load.image('cadavre2','assets/spritesheet/cadavre2.png');

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
        this.load.tilemapTiledJSON('map_fin','assets/tiles/batiment_fin.json'); 
    }
    create(){
    ///////////////// INVENTAIRE //////////////////////////////

        afficheNbMine = this.add.text(810, 75, 'x' + nbMine, { fontSize: '32px', fill: '#000032' }).setScrollFactor(0).setDepth(2);
        afficheSeve = this.add.text(910, 75, 'x' + nbSubstance, { fontSize: '32px', fill: '#000032' }).setScrollFactor(0).setDepth(2);
        inventaire = this.add.image(inventaireX ,inventaireY,'inventaire') 
                .setDepth(1)
                .setScrollFactor(0);


        const map = this.make.tilemap({key: 'map_fin'});
        const tileset = map.addTilesetImage('carte_teste', 'tiles');
        const terrain = map.createLayer('sol', tileset, 0, 0);
        const mur = map.createLayer('mur', tileset, 0, 0);
        const deco = map.createLayer('deco', tileset, 0, 0);
        const zone = map.createLayer('chargement', tileset, 0, 0);

        mur.setCollisionByExclusion(-1, true);
        zone.setCollisionByExclusion(-1, true)

/////////// PLAYER ////////////////////////

        if (villeFin){
            player = this.physics.add.sprite(340, 1418, 'boomer_anime').setDepth(1);
            player.body.height = 96;
            player.body.width = 40;
            player.body.setOffset(((80/2)-(40/2)),0);
        }
        else if(villeFin_2){
            player = this.physics.add.sprite(2050, 1414, 'boomer_anime').setDepth(1);
            player.body.height = 96;
            player.body.width = 40;
            player.body.setOffset(((80/2)-(40/2)),0);
        }
        

        this.physics.add.collider(player, mur);
        this.physics.add.collider(player, zone, changementZone, null, this);

////// ANIME COTER ///////////////////////
    this.anims.create({
        key: 'coter',
        frames: this.anims.generateFrameNumbers('boomer_anime', { start: 0, end: 14 }),
        frameRate: 30,
        repeat: -1
    });
    this.anims.create({
        key: 'coter_neutre',
        frames: [ { key: 'boomer_anime', frame: 45 } ],
        frameRate: 10,
    });
    this.anims.create({
        key: 'coter_mort',
        frames: [ { key: 'boomer_anime', frame: 63 } ],
        frameRate: 10,
    });

////// ANIME FACE ///////////////////////      
    this.anims.create({
        key: 'face',
        frames: this.anims.generateFrameNumbers('boomer_anime', { start: 15, end: 29 }),
        frameRate: 30,
        repeat: -1
    });
    this.anims.create({
        key: 'face_neutre',
        frames: [ { key: 'boomer_anime', frame: 46 } ],
        frameRate: 10,
    });
    this.anims.create({
        key: 'face_mort',
        frames: [ { key: 'boomer_anime', frame: 64 } ],
        frameRate: 10,
    });


////// ANIME DOS ///////////////////////
    this.anims.create({
        key: 'dos',
        frames: this.anims.generateFrameNumbers('boomer_anime', { start: 30, end: 44 }),
        frameRate: 30,
        repeat: -1
    });
    this.anims.create({
        key: 'dos_neutre',
        frames: [ { key: 'boomer_anime', frame: 47 } ],
        frameRate: 10,
    });
    this.anims.create({
        key: 'dos_mort',
        frames: [ { key: 'boomer_anime', frame: 65 } ],
        frameRate: 10,
    });

////// ANIME BRECHE ///////////////////////      
    this.anims.create({
        key: 'breche',
        frames: this.anims.generateFrameNumbers('boomer_anime', { start: 48, end: 62 }),
        frameRate: 30,
        repeat: -1
    });
    
    /////////////////////////////   
    // ANIME MINE ///////////////
    ////////////////////////////    
    this.anims.create({
        key: 'mine_pose',
        frames: this.anims.generateFrameNumbers('mine', { start: 0, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'mine_explose',
        frames: this.anims.generateFrameNumbers('mine', { start: 12, end: 23 }),
        frameRate: 10,
        //repeat: -1
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

////// ENNEMIS ANIME COTER ///////////////////////
    this.anims.create({
        key: 'ennemiCoter',
        frames: this.anims.generateFrameNumbers('arbre', { start: 0, end: 14 }),
        frameRate: 30,
        repeat: -1
    });

////// ENNEMIS ANIME FACE ///////////////////////      
    this.anims.create({
        key: 'ennemiFace',
        frames: this.anims.generateFrameNumbers('arbre', { start: 15, end: 29 }),
        frameRate: 30,
        repeat: -1
    });


////// ENNEMIS ANIME DOS ///////////////////////
    this.anims.create({
        key: 'ennemiDos',
        frames: this.anims.generateFrameNumbers('arbre', { start: 30, end: 44 }),
        frameRate: 30,
        repeat: -1
    });

    /////////////////////////////   
    // CADAVRE //////////////////
    /////////////////////////////

    /// cadavre ///
    const cadavreObjects = map.getObjectLayer('cadavre').objects;
    this.cadavres = this.physics.add.group({
        allowGravity: false
        
    }); 

    for (const cadavre of cadavreObjects) {

        this.cadavres.create(cadavre.x, cadavre.y, 'cadavre')
            .setOrigin(0.5,0.5)               
    }

    /// cadavre 2///
    const cadavre2Objects = map.getObjectLayer('cadavre2').objects;
    this.cadavres2 = this.physics.add.group({
        allowGravity: false
        
    }); 

    for (const cadavre2 of cadavre2Objects) {

        this.cadavres2.create(cadavre2.x, cadavre2.y, 'cadavre2')
            .setOrigin(0.5,0.5)               
    }
    
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
        cursors2 = this.input.keyboard.addKeys('Z,Q,S,D,A,E,R');  

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
            if (player.y >= 1424 && player.x >= 310 && player.x <= 400){
                this.scene.start("Ville");
                console.log("changement");
                brecheVille = false;
                brecheCoffre = false;
                villeTuto = false;
                finVille = true;
                finSorti = false;              
                clefVille = false;
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
            else if (player.y >= 1064 && player.x >= 2000 && player.x <= 2088){
                this.scene.start("Ville");
                console.log("changement");
                finVille = false;
                finSorti = true;
                brecheVille = false;
                brecheCoffre = false;
                villeTuto = false;              
                clefVille = false;
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
       
    }
    update(){
        
        const poseMine = Phaser.Input.Keyboard.JustDown(cursors2.E)
        //const poseMinePad = Phaser.Input.paddle.justPressed(paddle.B)

        if(pv === 3)
        {
            barreVie = this.add.image(barreVieX,BarreVieY,'bareDeVie_3Pv') 
                .setDepth(1)
                .setScrollFactor(0);
        }
        
        if (pv === 2){

            //vie3.destroy();
            
            barreVie = this.add.image(barreVieX,BarreVieY,'bareDeVie_2Pv') 
                .setDepth(1)
                .setScrollFactor(0);
        }
        
        if (pv === 1){
            
            barreVie = this.add.image(barreVieX,BarreVieY,'bareDeVie_1Pv') 
                .setDepth(1)
                .setScrollFactor(0);
        }
        if (pv===0){
            gameOver = true;
            barreVie = this.add.image(barreVieX,BarreVieY,'bareDeVie_0Pv') 
                .setDepth(1)
                .setScrollFactor(0);
        }
        if (brecheRecup){
            inventaire = this.add.image(inventaireX ,inventaireY,'inventaire_breche') 
            .setDepth(1)
            .setScrollFactor(0); 
        }
        if (recupclef){
            inventaire = this.add.image(inventaireX ,inventaireY,'inventaire_clef') 
            .setDepth(1)
            .setScrollFactor(0); 
        }
        if (recupclef && brecheRecup){
            inventaire = this.add.image(inventaireX ,inventaireY,'inventaire_breche_clef') 
            .setDepth(1)
            .setScrollFactor(0);
        }

      /////////////////////////////   
     // CONTROLE CLAVIER /////////
    /////////////////////////////

        if (cursors.right.isDown && breche == false){
            if (gameOver == false){
                gauche = false;
                droite = true;
                dos = false;
                face = false;
                player.setVelocityX(vitesse);
                player.anims.play('coter', true);
                player.setFlipX(true);

               /* player.body.height = 80;
                player.body.width = 40;
                player.body.setOffset(((80/2)-(40/2)),((96/2)-(80/2)));*/
            }
        }
        else if (cursors.left.isDown && breche == false){
            if (gameOver == false){
                gauche = true;
                droite = false;
                dos = false;
                face = false;
                player.setVelocityX(-vitesse);
                player.anims.play('coter', true);
                player.setFlipX(false);

                /*player.body.height = 80;
                player.body.width = 40;
                player.body.setOffset(((80/2)-(40/2)),((96/2)-(80/2)));*/
            }
            
            
        }
        else if (cursors.right.isUp && cursors.left.isUp && breche == false){
            player.setVelocityX(0);
            if (gameOver == false){
                if (gauche == true){
                    player.anims.play('coter_neutre', true);
                    player.setFlipX(false);
                }
                else if (droite == true){
                    player.anims.play('coter_neutre', true);
                    player.setFlipX(true);
                }
            }
            
        }
        if (cursors.up.isDown && breche == false){
            if (gameOver == false){
                gauche = false;
                droite = false;
                dos = true;
                face = false;
                player.setVelocityY(-vitesse);
                player.anims.play('dos', true);

               /* player.body.height = 80;
                player.body.width = 40;
                player.body.setOffset(((80/2)-(40/2)),((96/2)-(80/2)));
                //player.body.setOffset(-(80/2),-(40/2));*/
            } 
        }
        else if (cursors.down.isDown && breche == false){
            if (gameOver == false){
                gauche = false;
                droite = false;
                dos = false;
                face = true;

                /*player.body.height = 80;
                player.body.width = 40;
                player.body.setOffset(((80/2)-(40/2)),((96/2)-(80/2)));*/

                player.setVelocityY(vitesse);
                player.anims.play('face', true);
            }
            
            
        }
        else if (cursors.up.isUp && cursors.down.isUp && breche == false){
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

        if (cursors.up.isDown && cursors.left.isDown && breche == false){
            if (gameOver == false){
                player.setVelocityY(-(vitesse*0.7));
                player.setVelocityX(-(vitesse*0.7));
                player.anims.play('dos', true);
                player.setFlipX(false);
            }
        }
        else if (cursors.up.isDown && cursors.right.isDown && breche == false){
            if (gameOver == false){
                player.setVelocityY(-(vitesse*0.7));
                player.setVelocityX(vitesse*0.7);
                player.anims.play('dos', true);
                player.setFlipX(true);
            }
            
        }
        else if (cursors.down.isDown && cursors.left.isDown && breche == false){
            if (gameOver == false){
                player.setVelocityY(vitesse*0.7);
                player.setVelocityX(-(vitesse*0.7));
                player.anims.play('face', true);
            } 
        }
        else if ( cursors.down.isDown && cursors.right.isDown && breche == false){
            if (gameOver == false){
                player.setVelocityY(vitesse*0.7);
                player.setVelocityX((vitesse*0.7));
                player.anims.play('face', true);
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

            if (cursors.right.isDown && breche == false || paddle.right && breche == false){
                if (gameOver == false){
                    gauche = false;
                    droite = true;
                    dos = false;
                    face = false;
                    player.setVelocityX(vitesse);
                    player.anims.play('coter', true);
                    player.setFlipX(true);
                }
            }
            else if (cursors.left.isDown && breche == false || paddle.left && breche == false){
                if (gameOver == false){
                    gauche = true;
                    droite = false;
                    dos = false;
                    face = false;
                    player.setVelocityX(-vitesse);
                    player.anims.play('coter', true);
                    player.setFlipX(false);

                }
                
                
            }
            else if (cursors.right.isUp && cursors.left.isUp && breche == false || paddle.right.isUp && paddle.left.isUp && breche == false){
                player.setVelocityX(0);
                if (gameOver == false){
                    if (gauche == true){
                        player.anims.play('coter_neutre', true);
                        player.setFlipX(false);
                    }
                    else if (droite == true){
                        player.anims.play('coter_neutre', true);
                        player.setFlipX(true);
                    }
                }
                
            }
            if (cursors.up.isDown && breche == false || paddle.up && breche == false ){
                if (gameOver == false){
                    gauche = false;
                    droite = false;
                    dos = true;
                    face = false;
                    player.setVelocityY(-vitesse);
                    player.anims.play('dos', true);
                } 
            }
            else if (cursors.down.isDown && breche == false || paddle.down && breche == false){
                if (gameOver == false){
                    gauche = false;
                    droite = false;
                    dos = false;
                    face = true;
    
                    player.setVelocityY(vitesse);
                    player.anims.play('face', true);
                }  
            }
            else if (cursors.up.isUp && cursors.down.isUp && breche == false || paddle.up.isUp && paddle.down.isUp && breche == false){
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
    
            if (cursors.up.isDown && cursors.left.isDown && breche == false || paddle.up && paddle.left && breche == false){
                if (gameOver == false){
                    player.setVelocityY(-(vitesse*0.7));
                    player.setVelocityX(-(vitesse*0.7));
                    player.anims.play('dos', true);
                    player.setFlipX(false);
                }
            }
            else if (cursors.up.isDown && cursors.right.isDown && breche == false || paddle.up && paddle.right && breche == false){
                if (gameOver == false){
                    player.setVelocityY(-(vitesse*0.7));
                    player.setVelocityX(vitesse*0.7);
                    player.anims.play('dos', true);
                    player.setFlipX(true);
                }
                
            }
            else if (cursors.down.isDown && cursors.left.isDown && breche == false || paddle.down && paddle.left && breche == false){
                if (gameOver == false){
                    player.setVelocityY(vitesse*0.7);
                    player.setVelocityX(-(vitesse*0.7));
                    player.anims.play('face', true);
                } 
            }
            else if ( cursors.down.isDown && cursors.right.isDown && breche == false || paddle.down && paddle.right && breche == false){
                if (gameOver == false){
                    player.setVelocityY(vitesse*0.7);
                    player.setVelocityX((vitesse*0.7));
                    player.anims.play('face', true);
                }
            }
            // Pad use BRECHE /////
            if (cursors2.Q.isDown && brecheRecup && gameOver == false || paddle.A && brecheRecup && gameOver == false){

                player.anims.play('breche', true);
                barreVie = this.add.image(barreVieX,BarreVieY,'bareDeVie_breche')
                    .setDepth(1)
                    .setScrollFactor(0); 

                player.setVelocity(0);
                breche = true;
    
            }
            else if (invincible == false){
                breche = false;
                player.setTint(0xffffff);
            }

            if (poseMine && gameOver == false || paddle.B && gameOver == false) {
                if ( nbMine > 0){
                    nbMine -= 1;
                    afficheNbMine.setText('x' + nbMine);
                    mine = this.physics.add.sprite(player.x,player.y, 'mine');
                    mine.body.height = zoneActionMine;
                    mine.body.width = zoneActionMine;
                    mine.body.setOffset(-((zoneActionMine/2)-(48/2)),-((zoneActionMine/2)-(48/2)));
                    mine.anims.play('mine_pose', true);
                }
            }
        }

        const detonation = Phaser.Input.Keyboard.JustDown(cursors2.D)
        
        const useBreche = Phaser.Input.Keyboard.JustDown(cursors2.Q)
      /////////////////////////////   
     // RESPAWN      /////////////
    /////////////////////////////
        
        if (gameOver){
            afficheGameOver = this.add.text(640, 390, ' Game Over "R" pour recommencer ', { fontSize: '20px', fill: '#E1E1E1' }).setScrollFactor(0).setDepth(1);
            if (face == true){
                player.anims.play('face_mort', true);
                player.setTint(0xff0000);
            }
            else if (gauche == true){
                player.anims.play('coter_mort', true);
                player.setFlipX(false);
                player.setTint(0xff0000);
            }
            else if (droite == true){
                player.anims.play('coter_mort', true);
                player.setFlipX(true);
                player.setTint(0xff0000);
            }
            else if (dos == true){
                player.anims.play('dos_mort', true);
                player.setTint(0xff0000);
            }
            if (cursors2.R.isDown){
                this.scene.restart();
                gameOver = false;
                pv = 3;
            }
        }
      /////////////////////////////   
     // ACTIVE BRECHE   //////////
    /////////////////////////////
        if (cursors2.Q.isDown && brecheRecup && gameOver == false){
            
            player.anims.play('breche', true);
            barreVie = this.add.image(barreVieX,BarreVieY,'bareDeVie_breche')
                .setDepth(1)
                .setScrollFactor(0); 

            player.setVelocity(0);
            breche = true;
            
            //player.setTint(6754E1);

        }
        else if (invincible == false){
            breche = false;
            player.setTint(0xffffff);
        }
        
      /////////////////////////////   
     //POSE MINE  ////////////////
    /////////////////////////////
        if (poseMine && gameOver == false) {
            if ( nbMine > 0){
                nbMine -= 1;
                afficheNbMine.setText('x' + nbMine);
                mine = this.physics.add.sprite(player.x,player.y, 'mine');
                mine.body.height = zoneActionMine;
                mine.body.width = zoneActionMine;
                mine.body.setOffset(-((zoneActionMine/2)-(48/2)),-((zoneActionMine/2)-(48/2)));
                mine.anims.play('mine_pose', true);
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
                enemie.anims.play('ennemiCoter', true);
                enemie.setFlipX(true);
            }
            else if (enemie.direction === 'LEFT'){
                enemie.setVelocityX(-enemiesVitesse);
                enemie.anims.play('ennemiCoter', true);
                enemie.setFlipX(false);
            } 
            else if (enemie.direction === 'UP'){
                enemie.setVelocityY(-enemiesVitesse);
                enemie.anims.play('ennemiDos', true);
            }
            else if (enemie.direction === 'DOWN'){
                enemie.setVelocityY(enemiesVitesse);
                enemie.anims.play('ennemiFace', true);
            }
            else {
                enemie.setVelocityX(-enemiesVitesse);
                enemie.anims.play('ennemiCoter', true);

                enemie.body.height = 96;
                enemie.body.width = 40;
                enemie.body.setOffset(((80/2)-(40/2)),0);
            }
           
        }

        this.physics.add.overlap(this.enemies, this.enemies.children.entries);
        this.physics.add.overlap(this.enemies, mine, ActiveMine, null, this);

        function ActiveMine (mine,enemie){
            mine.anims.play('mine_explose', true);
            //mine.destroy();
            mine.body.height = 0;
            mine.body.width = 0;
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
                
            afficheSeve.setText('x' + nbSubstance);

        }
        function recupMine (player,lootMine){
            if (nbMine < mineMax){
                lootMine.destroy();
                nbMine ++;
                afficheNbMine.setText('x' + nbMine);
            }
        }
        function recupPv (player,lootPv){
            if (pv < pvMax){
                lootPv.destroy();
                pv ++;
            }
        }
        this.physics.add.overlap(this.enemies, player,degat,null, this);

        function degat( player, enemies){
           if (invincible == false && breche == false && gameOver == false){
                invincible = true;
                pv--;
                player.setTint(0xff0000);
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
}   