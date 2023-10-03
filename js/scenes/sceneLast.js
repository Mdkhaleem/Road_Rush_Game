class SceneLast extends Phaser.Scene {
  constructor() {
    super("SceneLast");
  }

  create() {
    emitter = new Phaser.Events.EventEmitter();
    controller = new Controller();

    var mediaManager = new MediaManager({ scene: this });
    model.gameOver = false;

    this.road = new Road({ scene: this });
    this.road.x = game.config.width * 0.25;
    this.road.makeLines();

    this.road2 = new Road({ scene: this });
    this.road2.x = game.config.width * 0.75;
    this.road2.makeLines();
    // this.road.makeTrees();

    this.alignGrid = new AlignGrid({
      rows: 5,
      cols: 5,
      scene: this,
    });

    var soundButtons = new SoundButtons({ scene: this });

    this.sb = new ScoreBox({ scene: this });
    this.sb.x = game.config.width / 2;
    this.sb.y = 50;
    this.road2.car.setFrame(1);

    this.cursors = this.input.keyboard.createCursorKeys();
    model.score = 20;
  }

  update() {
    this.road.moveCar(this.cursors);
    this.road.moveLines();
    this.road.moveObjects();

    this.road2.moveCar(this.cursors);
    this.road2.moveLines();
    this.road2.moveObjects();
  }
}
