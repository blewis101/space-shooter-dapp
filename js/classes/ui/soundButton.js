class SoundButton extends Phaser.GameObjects.Container
{
    constructor(config)
    {
        super(config.scene);
        this.scene = config.scene;

        var musicButton = new ToggleButton({scene: this.scene, backKey: 'orangetoggle', onIcon: 'musicOn', offIcon: 'musicOff', event: G.TOGGLE_MUSIC});
        //alignGrid.placeAtIndex(9, musicButton);
        var sfxButton = new ToggleButton({scene: this.scene, backKey: 'orangetoggle', onIcon: 'sfxOn', offIcon: 'sfxOff', event: G.TOGGLE_SOUND});
        //alignGrid.placeAtIndex(1, sfxButton);

        this.add(this.musicButton);
        this.add(this.sfxButton);
    }
}