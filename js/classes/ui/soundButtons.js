class SoundButtons extends Phaser.GameObjects.Container
{
	constructor(config)
	{
		super(config.scene);
		this.scene=config.scene;

		this.musicButton = new ToggleButton({
             scene:this.scene,
             backKey:'toggleBack',
             onIcon:'musicOn',
             offIcon:'musicOff',
             event:G.TOGGLE_MUSIC
        });

        this.add(this.musicButton);

        this.musicButton.y=this.musicButton.height/2;
        this.musicButton.x=this.musicButton.width/2;

        if(model._musicOn == false)
        {
            this.musicButton.toggle(this.scene);
        }
        
        this.scene.add.existing(this);
	}
}