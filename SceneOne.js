var player;
var cursors;
var cursors2;

class SceneOne extends Phaser.Scene{
    constructor(){
        super("sceneOne");
    }
    init(data){
    }
    preload(){
        this.load.spritesheet('lusan_anime', 'assets/spritesheet/Actor1.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('tiles','assets/tiles/carte_teste.png');
        this.load.tilemapTiledJSON('map','assets/tiles/carte_teste.json'); 
    }
    create(){
        
        const map = this.make.tilemap({key : 'map'});
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
        this.physics.add.collider(player, chargement, function (){this.scene.start("SceneTwo");});
        
        function sceneSuite (){
            
            this.scene.start("SceneTwo");
            
        }
        this.input.once('pointerdown', function () {

            this.scene.start('SceneTwo');

        }, this);
        
        this.anims.create({
            key: 'course',
            frames: this.anims.generateFrameNumbers('lusan_anime', { start: 0, end: 15 }),
            frameRate: 30,
            repeat: -1
        });

        cursors = this.input.keyboard.createCursorKeys();
        cursors2 = this.input.keyboard.addKeys('Z,Q,S,D,SPACE');
    }
    update(){
        if (cursors.right.isDown){
            player.setVelocityX(200);
            player.anims.play('course', true);
        }
        else if (cursors.left.isDown){
            player.setVelocityX(-200);
        }
        else if (cursors.up.isDown){
            player.setVelocityY(-200);
        }
        else if (cursors.down.isDown){
            player.setVelocityY(200);
        }
        else{
            player.setVelocity(0);
        }
    }
    /*function sceneSuite (player, chargement){
        this.scene.start('SceneTwo');
    }*/
}