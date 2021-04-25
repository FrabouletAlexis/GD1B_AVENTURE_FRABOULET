class SceneTwo extends Phaser.Scene{
    constructor(){
        super("SceneTwo");
    }
    init(data){
    }
    preload(){
        this.load.spritesheet('boomer_anime', 'assets/spritesheet/boomer.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('menu','assets/menu.png');
        this.load.image('tiles','assets/tiles/carte_teste.png');
        this.load.tilemapTiledJSON('map2','assets/tiles/carte_teste_2.json'); 
    }
    create(){
        this.anims.create({
            key: 'face',
            frames: this.anims.generateFrameNumbers('boomer_anime', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        });

        /*const map = this.make.tilemap({key : 'map'});
        const tileset = map.addTilesetImage('carte_teste','tiles');
        
        map.createDynamicLayer('sol',tileset, 0, 0);
        const mur = map.createDynamicLayer('mur',tileset, 0, 0);
        const chargement = map.createDynamicLayer('chargement',tileset, 0,0);
        
        mur.setCollisionByExclusion(-1,true)
        chargement.setCollisionByExclusion(-1,true)
    
        mur.setCollisionByProperty({ collides: true });
        chargement.setCollisionByProperty({ collides: true });

        player = this.physics.add.sprite(60, 660, 'lusan_anime');
        
        this.physics.add.collider(player, mur);
        this.physics.add.collider(player, chargement, changementZone, null, this);*/
        const map = this.make.tilemap({key: 'map2'});
        const tileset = map.addTilesetImage('carte_teste', 'tiles');
        const terrain = map.createLayer('sol', tileset, 0, 0);
        const bloquant = map.createLayer('mur', tileset, 0, 0);
        const zone = map.createLayer('chargement', tileset, 0, 0);

        bloquant.setCollisionByExclusion(-1, true);
        zone.setCollisionByExclusion(-1, true)

        player = this.physics.add.sprite(500, 100).setDepth(1);
        player.body.height = 48;
        player.body.width = 48;

        this.physics.add.collider(player, bloquant);
        /*this.physics.add.overlap(player, zone, changementZone, null, this);
        
        function changementZone(player, zone){
            if (player.y >= 760 && player.x >= 400 && player.x <= 780){
                this.scene.start("SceneOne");
                console.log("changement");
            }
        }*/
        
       /* this.anims.create({
            key: 'course',
            frames: this.anims.generateFrameNumbers('lusan_anime', { start: 0, end: 15 }),
            frameRate: 30,
            repeat: -1
        });*/

        cursors = this.input.keyboard.createCursorKeys();
        cursors2 = this.input.keyboard.addKeys('Z,Q,S,D,SPACE');

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
    }
}