class SceneWinner1 extends Phaser.Scene {
    constructor() {
        super('SceneWinner1');
    }
    preload()
    {
       
    }

    create() 
    {

        this.alignGrid = new AlignGrid({
            rows:11, 
            cols:11, 
            scene: this
        });

        this.alignGrid.showNumbers();

        var titleBack = this.add.image(0, 0, 'titleBack');
        this.alignGrid.placeAtIndex(49, titleBack);

        var win = this.add.image(0, 0, 'win');
        Align.scaleToGameW(win, .8);
        this.alignGrid.placeAtIndex(27, win);

        var btnStart = new FlatButton({
            scene: this, 
            key: 'button2',
            text: 'NEXT LEVEL!!',
            x: 240, 
            y: 100, 
            event: 'next_level', 
            textConfig: {
                color: 'black',
                fontSize: 20
            }
        });

        this.alignGrid.placeAtIndex(93, btnStart);

        emitter.on('next_level', this.nextLevel, this);

        var soundButtons = new SoundButtons({scene: this});
        
        model.velocity = 10;
    }

    nextLevel()
    {
        this.scene.start('SceneMain');
    }

    update() 
    {
        //constant running loop
    }
}