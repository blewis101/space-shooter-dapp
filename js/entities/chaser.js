class ChaserShip extends Entities
{
    constructor( scene, x, y ) 
    {
      super( scene, x, y, 'chasers', 'ChaserShip' );
      //this.play( 'chasers' );

      this.states = 
        {
            MOVE_DOWN: "MOVE_DOWN",
            CHASE: "CHASE"
        };
        this.state = this.states.MOVE_DOWN;
    }
    preload()
    {
        this.load.spritesheet( 'chasers', 'images/chasers.png', { frameWidth: 65, frameHeight: 80 });
    }
    create()
    {
        this.chasers = this.physics.add.sprite( 0,0, 'chasers' );
        this.anims.create({
            key: 'chase',
            frames: this.anims.generateFrameNames( 'chasers', {start: 0, end: 9 }),
            frameRate: 16,
            repeat: -1
        });
        this.chasers.play( 'chase', this );
    }
    update()
    {
        if (!this.getData( "isDead" ) && this.scene.playerShip ) 
        {
            if (Phaser.Math.Distance.Between( this.x, this.y, this.scene.playerShip.x, this.scene.playerShip.y ) < 320) 
            {
                this.state = this.states.CHASE;
            }
            if (this.state == this.states.CHASE) 
              {
                var dx = this.scene.playerShip.x - this.x;
                var dy = this.scene.playerShip.y - this.y;
                var angle = Math.atan2( dy, dx );
                var speed = 100;
                this.body.setVelocity( Math.cos(angle) * speed, Math.sin(angle) * speed );
              }
            //Rotate Enemy Ship
            if ( this.x < this.scene.playerShip.x ) 
              {
                this.angle -= 5;
              }
              else 
              {
                this.angle += 5;
              } 
         }
    }
}