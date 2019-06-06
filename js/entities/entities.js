class Entities extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, key, type)
    {
        super(scene, x, y, key, type);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setData("type", type);
        this.setData("isDead", false);
    }
    preload()
    //loads our images and sounds
    {
        	
    }

    //A Class I was just playing around with and created that doesn't actually do anything useful.
    /*playerShip(name)
    {
        this.name = name;
        this.ship = this.physics.add.sprite(0,0, "blueship");
        this.boundaries = anchor.setTo(0,0);
        this.acceleration = NULL;
        this.drag = NULL;
    }*/

}