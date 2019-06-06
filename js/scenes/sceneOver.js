class SceneOver extends Phaser.Scene 
{
    constructor() 
    {
        super('SceneOver');
    }
    preload()
    {
        /*this.load.image("titleimage", "images/title.png");
        this.load.image("playbutton", "images/5.png");
        this.load.image("storybutton", "images/6.png");
        this.load.image("levelbutton", "images/4.png");*/
    }
    create() 
    {
        
        //Grid System//
        var gridConfig={row:11, cols:11, scene:this};
        var alignGrid = new AlignGrid(gridConfig);
        alignGrid.showNumbers();

        //Title Screen Buttons//
        var playbutton = new FlatButton({scene: this, key: 'playbutton', text: 'PLAY', event:'button_pressed', params: 'press_play'});
        alignGrid.placeAtIndex(27, playbutton);
        var storybutton = new FlatButton({scene: this, key: 'storybutton', text: 'STORY', event:'button_pressed', params: 'press_story'});
        alignGrid.placeAtIndex(38, storybutton);
        var levelbutton = new FlatButton({scene: this, key: 'levelbutton', text: 'LEVELS', event:'button_pressed', params: 'press_level'});
        alignGrid.placeAtIndex(49, levelbutton);

        //Title Image//
        this.titleimage = this.add.image(0,0,"titleimage");
        alignGrid.placeAtIndex(16, this.titleimage);

        emitter.on('button_pressed',this.buttonPressed,this);

    }
    buttonPressed()
    {
        /*if (param == 'press_play')
        {
            this.scene.start('SceneMain');
        }
        if (param == 'press_story')
        {
            this.scene.start();
        }
        if (param == 'press_level')
        {
            this.scene.start();
        }*/        
    }
    update() {}
}