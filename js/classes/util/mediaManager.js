class MediaManager
{
    constructor(config)
    {
        this.scene = config.scene;

        emitter.on(G.PLAY_SOUND, this.playSound, this);
        emitter.on(G.MUSIC_CHANGED, this.musicChanged, this);
    }
    musicChanged()
    {
        if (this.background)
        {
            this.background.stop();
        }
    }
    playSound(key)
    {
        if (model.soundOn == true)
        {
            var sound = this.scene.sound.add(key);
            sound.play();
        }
    }
    setTheme(key)
    {
        if (model.musicOn == true)
        {
            this.theme = this.scene.sound.add(key,{volume:.5, loop:true});
            this.theme.play();
        }
    }
    turnThemeOff(offIcon)
    {
        if (model.musicOff == true)
        {
            this.scene.sound.stop(offIcon);
        }
    }
}