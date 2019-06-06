class EnemyLaser extends Entities 
{
    constructor(scene, x, y) 
    {
      super(scene, x, y, 'blueshot' );
      this.body.velocity.y = 200;
    }
    onDestroy()
    {
        if (this.shootTimer !== undefined) 
        {
            if (this.shootTimer) 
            {
              this.shootTimer.remove(false);
            }
        }
    }
  
}