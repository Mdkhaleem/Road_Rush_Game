class SceneWinner3 extends Phaser.Scene {
  constructor() {
    super("SceneWinner3");
  }
  preload() {}

  create() {
    //define our objects

    this.alignGrid = new AlignGrid({
      rows: 11,
      cols: 11,
      scene: this,
    });

    this.alignGrid.showNumbers();

    var titleBack = this.add.image(0, 0, "titleBack");
    this.alignGrid.placeAtIndex(49, titleBack);

    var bigWin = this.add.image(0, 0, "bigWin");
    Align.scaleToGameW(bigWin, 0.8);
    this.alignGrid.placeAtIndex(38, bigWin);

    var btnStart = new FlatButton({
      scene: this,
      key: "button2",
      text: "Reset Game!!",
      x: 240,
      y: 100,
      event: "main_scene",
      textConfig: {
        color: "black",
        fontSize: 20,
      },
    });

    this.alignGrid.placeAtIndex(93, btnStart);

    emitter.on("main_scene", this.mainScene, this);

    var soundButtons = new SoundButtons({ scene: this });
  }

  mainScene() {
    this.scene.start("SceneTitle");
  }

  update() {}
}
