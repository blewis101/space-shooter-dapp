class SceneTitle extends Phaser.Scene 
{
    constructor() 
    {
        super('SceneTitle');
    }
    preload()
    {
        this.load.image("titleimage", "images/title.png");
        this.load.image("playbutton", "images/5.png");
        this.load.image("storybutton", "images/6.png");
        this.load.image("levelbutton", "images/4.png");

        this.load.image("musicOn", "images/music_on.png");
        this.load.image("musicOff", "images/music_off.png");
        this.load.image("orangetoggle", "images/orangetoggle.png");
        this.load.image("sfxOff", "images/sfx_off.png");
        this.load.image("sfxOn", "images/sfx_on.png");
        
        //Music and Sounds
        this.load.audio('theme',["audio/theme.mp3", "audio/theme.ogg"]);
        this.load.audio('buttonclick',["audio/buttonclick.mp3", "audio/buttonclick.ogg"]);
    }
    create() 
    {
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        //Music
        var mediaManager = new MediaManager({scene:this});
        mediaManager.setTheme('theme');

        //Grid System//
        var gridConfig={row:11, cols:11, scene:this};
        var alignGrid = new AlignGrid(gridConfig);
        //alignGrid.showNumbers();

        //Title Screen Buttons//
        var playbutton = new FlatButton({scene: this, key: 'playbutton', text: 'PLAY', event:'button_pressed', params: 'press_play'});
        alignGrid.placeAtIndex(27, playbutton);
        var storybutton = new FlatButton({scene: this, key: 'storybutton', text: 'STORY', event:'button_pressed', params: 'press_story'});
        alignGrid.placeAtIndex(38, storybutton);
        var levelbutton = new FlatButton({scene: this, key: 'levelbutton', text: 'LEVELS', event:'button_pressed', params: 'press_level'});
        alignGrid.placeAtIndex(49, levelbutton);

        var toggleButton = new ToggleButton({scene: this, backKey: 'orangetoggle', onIcon: 'musicOn', offIcon: 'musicOff', event: G.TOGGLE_MUSIC});
        alignGrid.placeAtIndex(9, toggleButton);

        
        //Title Image//
        this.titleimage = this.add.image(0,0,"titleimage");
        alignGrid.placeAtIndex(16, this.titleimage);

        emitter.on('button_pressed',this.buttonPressed,this);
        emitter.on('musicOff', this.stopMusic,this);

    }
    buttonPressed(param)
    {
        var mediaManager = new MediaManager({scene:this});
        model.musicOn = false;
        mediaManager.playSound('buttonclick');

        if (param == 'press_play')
        {
            this.scene.start('SceneMain');
        }
        if (param == 'press_story')
        {
            this.scene.start('SceneStory');
        }
        if (param == 'press_level')
        {
            this.scene.start();
        }        
    }
    stopMusic()
    {
       var mediaManager = new MediaManager({scene:this});
       mediaManager.turnThemeOff('musicOff') 
       model.musicOff = true;
    }
    update() {}
}