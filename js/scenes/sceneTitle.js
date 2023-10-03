class SceneTitle extends Phaser.Scene {
    constructor() {
        super('SceneTitle');
    }
    preload()
    {
       
    }

    create() 
    {
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        this.alignGrid = new AlignGrid({
            rows:11, 
            cols:11, 
            scene: this
        });

        var titleBack = this.add.image(0, 0, 'titleBack');
        this.alignGrid.placeAtIndex(49, titleBack);

        var title = this.add.image(0, 0, 'title');
        Align.scaleToGameW(title, .8);
        this.alignGrid.placeAtIndex(27, title);

        var btnStart = new FlatButton({
            scene: this, 
            key: 'button1',
            text: 'Start Game!!',
            x: 240, 
            y: 100, 
            event: 'start_game',
            textConfig: {
                color: 'black',
                fontSize: 20
            }
        });

        this.alignGrid.placeAtIndex(93, btnStart);

        mediaManager = new MediaManager({scene: this});
        

        mediaManager.setBackgroundMusic('backgroundMusic');
        var soundButtons = new SoundButtons({scene: this});

        emitter.on('start_game', this.startGame, this);
    }

    startGame()
    {
        this.scene.start('SceneMain');
    }

    update() 
    {
    }

}