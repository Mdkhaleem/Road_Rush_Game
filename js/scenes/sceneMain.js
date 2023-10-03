let timeSinceLastIncrement = 0;
class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }
  preload() {}

  create() {
    emitter = new Phaser.Events.EventEmitter();
    controller = new Controller();
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
    var mediaManager = new MediaManager({ scene: this });
    model.gameOver = false;

    this.road = new Road({ scene: this });
    this.road.x = game.config.width * 0.25;
    this.road.makeLines();
    this.road2 = new Road({ scene: this });
    this.road2.x = game.config.width * 0.75;
    this.road2.makeLines();
    // this.road.makeTrees();
    this.road2.car.setFrame(1);
    this.alignGrid = new AlignGrid({
      rows: 5,
      cols: 5,
      scene: this,
    });

    var soundButtons = new SoundButtons({ scene: this });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.sb = new ScoreBox({ scene: this });
    this.sb.x = game.config.width / 2;
    this.sb.y = 50;
  }

  update() {
    timeSinceLastIncrement += 1;
    if (timeSinceLastIncrement >= 1000) {
      timeSinceLastIncrement = 0;
    }
    this.road.moveCar(this.keys);
    this.road2.moveCar(this.cursors);

    this.road.moveLines();
    this.road.moveObject();
    this.road2.moveLines();
    this.road2.moveObject();
  }
}
