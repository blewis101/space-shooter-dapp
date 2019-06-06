class SceneStory extends Phaser.Scene 
{
    constructor() 
    {
        super( 'SceneStory' );
    }
    preload()
    {
        this.load.image( "backbutton", "images/5.png" );
    }
    create() 
    {
        
        //Grid System//
        var gridConfig={ row:11, cols:11, scene:this };
        var alignGrid = new AlignGrid( gridConfig );
        //alignGrid.showNumbers();

        //Story Text//
        let content = [
            "The year was 2050, the year everything changed. We used to joke about little green men",
            "only when they showed up - the Aidenites - they were anything but little...or green.",
            "They caught us off-guard. Our little rock called Earth was rich with resources, ",
            "while theirs had been devestated by war. A war that bled their planet dry.",
            "So they brought their war to Earth...and we had nothing to stand against them.",
            "The nations of the world put down their religious, ethnic, and national allegiances",
            "and Earth rallied against a common enemy. An alien invasion that threatened to kill us all.",
            "",
            "The United Nations was reformed to fit the times and the nations of the world",
            "formed the (GESN) Global Earth Space Network - an interconnected community",
            "of scientists, fighters, workers, and anyone willing to lend a hand to neutralize",
            "the alien Aidenite threat. In 2050 the world changed, by 2070 we had learned enough",
            "and began to fight back. We reverse engineered their advanced technology and perfected",
            "deep space travel. Space pilots from all across Earth became the new explorers that discovered",
            "vast uncharted worlds. Turns out there was way more out there than anyone could ever imagine.",
            "",
            "You are a new space cadet, one of thousands of new recruits who have answered the call.",
            "All of Earth is depending on you now. If we don't win this war and protect the homeland",
            "from the alien invaders, humanity will not survive. This is why you were born and why you're here.",
            "We don't know everything that is out there and the multitude of dangers you may face,",
            "but we know that Earth is our planet! It is ours to claim and ours to protect. You fly in the most",
            "advanced aircraft ever created. You will be rewarded in cryptocurrency for every kill you achieve.",
            "Use the tokens to upgrade your ship, sell them - do what you will. Just kill those bastards and",
            "send them back to the hellhole they crawled out of. This is your mission.",
            "",
            "---- The Architect",            

        ];
        this.add.text(150, 60, content, { fontFamily: 'Arial Black', color: '#e81212', lineSpacing: 10 });

        // Back Button
        var backButton = new FlatButton({ scene: this, key: 'backbutton', text: 'BACK', event:'button_pressed', params: 'press_back' });
        alignGrid.placeAtIndex( 52, backButton );
        
    
        emitter.on( 'button_pressed',this.buttonPressed,this );

    }
    buttonPressed(param)
    {
        if ( param == 'press_back' )
        {
            this.scene.start( 'SceneTitle' );
        }
    }
    update() {}
}