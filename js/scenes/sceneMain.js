class SceneMain extends Phaser.Scene 
{
    constructor() 
    {
        super('SceneMain');
        
    }
    preload()
    //loads our images and sounds
    {
        //this.load.image( "playership","images/blueship.png" );
        this.load.image( 'spaceback4','images/spaceback4.png' );
        this.load.spritesheet( 'blueships', 'images/blueships.png', { frameWidth: 73, frameHeight: 80 });
        this.load.spritesheet( 'blueshot', 'images/blueshipshot.png', { frameWidth: 20, frameHeight: 55 });
        this.load.spritesheet( 'basicenemy', 'images/basicenemy.png', { frameWidth: 65, frameHeight: 80 });
        this.load.spritesheet( 'bombers', 'images/bombersgroup.png', { frameWidth: 48, frameHeight: 82 });
        this.load.spritesheet( 'chasers', 'images/chasers.png', { frameWidth: 38, frameHeight: 80 });


        this.load.audio( 'explosion', 'audio/explosion.mp3' );
        this.load.audio( 'laser', 'audio/lasershot.mp3' );
        this.load.audio( 'enemylaser', 'audio/enemylaser.mp3' );
            	
    }
    create()
    //define our objects 
    {
        //The Starfield Background
        this.starfield = this.add.tileSprite( 0, 0, 1080, 900, "spaceback4" );   
        
        //The Grid System
        var gridConfig={ row:5, cols:5, scene:this };
        var alignGrid = new AlignGrid( gridConfig );
        //alignGrid.showNumbers();

        //The Score
        this.sb = new ScoreBox( {scene:this} );
        alignGrid.placeAtIndex( 2, this.sb );
        model.score = 0; 

        
        //The Player Ship
        this.playerShip = this.physics.add.sprite( 0,0, 'blueships' );
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNames( 'blueships', {start: 0, end: 9 }),
            frameRate: 16,
            repeat: -1
        });
        this.playerShip.play( 'fly', this );
        alignGrid.placeAtIndex( 22, this.playerShip );
        this.playerShip.setCollideWorldBounds( true );

        //The Static Enemy Ships
        this.basicEnemy = this.physics.add.sprite( 0,0, 'basicenemy' )
        this.bomber = this.physics.add.sprite( 0,0, 'bombers' )
        this.chaser = this.physics.add.sprite( 0,0, 'chasers' )
        
        this.anims.create({
            key: 'badfly',
            frames: this.anims.generateFrameNames( 'basicenemy', {start: 0, end: 9 }),
            frameRate: 16,
            repeat: -1
        });
        this.anims.create({
            key: 'badfly2',
            frames: this.anims.generateFrameNames( 'bombers', {start: 0, end: 9 }),
            frameRate: 16,
            repeat: -1
        });
        this.anims.create({
            key: 'badfly3',
            frames: this.anims.generateFrameNames( 'chasers', {start: 0, end: 9 }),
            frameRate: 16,
            repeat: -1
        });
        this.basicEnemy.play( 'badfly', this );
        this.bomber.play( 'badfly2', this );
        this.chaser.play( 'badfly3', this );
        alignGrid.placeAtIndex( 6, this.basicEnemy );
        alignGrid.placeAtIndex( 7, this.bomber );
        alignGrid.placeAtIndex( 8, this.chaser );

        //The Enemies and Bullet Group That Spawns from the Top
        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();
        this.playerLasers = this.add.group();
        


        this.time.addEvent(
        {
            delay: 2000,
            callback: function() 
            {
                var enemy = null;
                if ( Phaser.Math.Between( 0, 10 ) >= 3 ) 
                    {
                        enemy = new BasicEnemy( this, Phaser.Math.Between( 0, this.game.config.width ), 0 );
                        this.basicEnemy = this.physics.add.sprite( enemy );
                        this.basicEnemy.play( 'badfly', this );
                        this.basicEnemy.setCollideWorldBounds( true );
                    }

                else if ( Phaser.Math.Between( 0, 10 ) >= 5 ) 
                {
                    if ( this.getEnemiesByType( 'bombers' ).length < 5 ) 
                    {
                        enemy = new Bombers( this, Phaser.Math.Between( 0, this.game.config.width ), 0 );
                        this.bomber = this.physics.add.sprite( enemy );
                        this.bomber.play( 'badfly2', this );
                    }
                }
                else
                    {
                        enemy = new ChaserShip( this, Phaser.Math.Between( 0, this.game.config.width ), 0 );
                        this.chaser = this.physics.add.sprite( enemy );
                        this.chaser.play( 'badfly3', this );
                    }

                if ( enemy !== null ) 
                    {
                        enemy.setScale(Phaser.Math.Between( 5, 10 ) * 0.1 );
                        this.basciEnemies = this.physics.add.sprite( enemy );
                        this.basicEnemy.play( 'badfly', this );
                    }
            },
            callbackScope: this,
            loop: true,
        });

        //The Audio
        this.sfx = 
        {
            laser: [
              this.sound.add( 'laser' ),
              this.sound.add( 'enemylaser' )
            ],
            explosion: this.sound.add( 'explosion' )
        };

        //The Starfield
        alignGrid.placeAtIndex( 12, this.starfield );

        //Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.fireButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.SPACE);
               
    }
    
    update()
    //constant running loops 
    {
        //Scroll the starfield
        this.starfield.tilePositionY += -1.5;

        //Player Movement
        this.playerShip.setAccelerationX( 0 );
        this.playerShip.setDragX( 300 );
        
      
        if ( this.cursors.left.isDown )
        {
            this.playerShip.setAccelerationX (-300 );
        }
        if ( this.cursors.right.isDown )
        {
            this.playerShip.setAccelerationX ( 300 );
        }

        for ( var i = 0; i < this.enemies.getChildren().length; i++ ) 
        {
            this.enemy = this.enemies.getChildren()[i];
            enemy.update();
        }
    }
    
    getEnemiesByType( type ) 
    {
        var array = [];
        for ( var i = 0; i < this.enemies.getChildren().length; i++ ) 
        {
            var enemy = this.enemies.getChildren()[i];
            if ( enemy.getData( 'type' ) == type ) 
            {
              array.push( enemy );
            }
        }
        return array;
    }
}