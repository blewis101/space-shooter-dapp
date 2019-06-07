class ChaserShip extends Entities
{
    constructor( scene, x, y ) 
    {
      super( scene, x, y, 'chasers', 'ChaserShip' );
      this.body.velocity.y = Phaser.Math.Between( 50, 100 );
      this.shootTimer = this.scene.time.addEvent
      ({
          delay: 1000,
          callback: function() 
          {
            var laser = new EnemyLaser( this.scene, this.x, this.y );
            laser.setScale( this.scaleX );
            this.scene.enemyLasers.add( laser );
          },
            callbackScope: this,
            loop: true
      });

      this.states = 
        {
            MOVE_DOWN: "MOVE_DOWN",
            CHASE: "CHASE"
        };
        this.state = this.states.MOVE_DOWN;
    }
    preload()
    {
    
    }
    create()
    {
    
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