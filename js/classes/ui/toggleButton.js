class ToggleButton extends Phaser.GameObjects.Container
{
    constructor(config)
    {
        super(config.scene);
        this.scene = config.scene;
        

        this.back = this.scene.add.image(0,0, config.backKey);
        this.onIcon = this.scene.add.image(0,0, config.onIcon);
        this.offIcon = this.scene.add.image(0,0, config.offIcon);

        Align.scaleToGameW(this.back,.1);
        Align.scaleToGameW(this.onIcon,.05);
        Align.scaleToGameW(this.offIcon,.05);

        this.add(this.back);
        this.add(this.onIcon);
        this.add(this.offIcon);

        if (!config.value)
        {
            config.value = true;
        }
        this.value = config.value;

        if (config.event)
        {
            this.event = config.event;
            /*added
            var flatButton = new FlatButton({scene:this});
            flatButton.pressed();
            this.back.setInteractive();
            this.back.on('pointerdown',this.pressed,this);*/
        }

        this.setIcons();

        this.back.setInteractive();
        this.back.on('pointerdown',this.toggle,this);

        if (config.x)
        {
            this.x = config.x;
        }
        if (config.y)
        {
            this.y = config.y;
        }
        this.scene.add.existing(this);
    }
    toggle()
    {
        this.value = !this.value;
        this.setIcons();

        if (this.event)
        {
            emitter.emit(this.event,this.value);
        }
        if (this.config.params)
        {
            emitter.emit(this.config.event, this.config.params);
        }
        else
        {
            emitter.emit(this.config.event);
        }

    }
    setIcons()
    {
        if (this.value == true)
        {
            this.onIcon.visible = true;
            this.offIcon.visible = false;
        }
        else
        {
            this.onIcon.visible = false;
            this.offIcon.visible = true;
        }
    }
}