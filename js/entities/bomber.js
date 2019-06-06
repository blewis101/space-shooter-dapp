class Bombers extends Entities
{
    constructor( scene, x, y ) 
    {
      super( scene, x, y, 'bombers', 'Bombers' );
      this.play( 'bombers' );
    }
}