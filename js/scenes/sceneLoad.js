class SceneLoad extends Phaser.Scene {
  constructor() {
    super("SceneLoad");
  }

  preload() {
    this.bar = new Bar({
      scene: this,
      x: 240,
      y: 320,
    });

    this.progText = this.add.text(
      game.config.width / 2,
      game.config.height / 2,
      "0%",
      {
        color: "#ffffff",
        fontSize: game.config.width / 20,
      }
    );
    this.progText.setOrigin(0.5, 0.5);
    this.load.on("progress", this.onProgess, this);

    this.load.image("road", "images/road.jpg");
    this.load.image("line", "images/line.png");

    this.load.spritesheet("cars", "images/cars.png", {
      frameWidth: 67,
      frameHeight: 126,
    });

    this.load.image("pcar1", "images/pcar1.png");
    this.load.image("pcar2", "images/pcar2.png");
    this.load.image("cone", "images/cone.png");
    this.load.image("barrier", "images/barrier.png");
    this.load.image("bus", "images/bus.png");
    this.load.image("truck", "images/truck.png");
    this.load.image("truck1", "images/truck1.png");
    this.load.image("tree0", "images/tree0.png");
    this.load.image("tree1", "images/tree1.png");
    this.load.image("tree2", "images/tree2.png");
    this.load.image("tree3", "images/tree3.png");
    this.load.image("tree4", "images/tree4.png");

    this.load.audio("boom", ["audio/boom.mp3", "audio/boom.ogg"]);
    this.load.audio("backgroundMusic", [
      "audio/random-race.mp3",
      "audio/random-race.ogg",
    ]);
    this.load.audio("whoosh", ["audio/whoosh.mp3", "audio/whoosh.ogg"]);

    this.load.image("title", "images/title.png");
    this.load.image("button1", "images/ui/buttons/2/1.png");
    this.load.image("button2", "images/ui/buttons/2/2.png");
    this.load.image("titleBack", "images/titleBack.jpg");
    this.load.audio("background", [
      "audio/background.mp3",
      "audio/background.ogg",
    ]);
    this.load.image("toggleBack", "images/ui/toggles/1.png");
    this.load.image("musicOn", "images/ui/icons/music_on.png");
    this.load.image("musicOff", "images/ui/icons/music_off.png");

    this.load.image("win", "images/YOU-WIN.png");
    this.load.image("lost", "images/YOU-Lost.png");
    this.load.image("bigWin", "images/youAreAWinner.png");
  }

  onProgess(value) {
    var per = value * 100;
    this.bar.setPercent(value);
    this.progText.setText(per + "%");
  }

  create() {
    this.scene.start("SceneTitle");
  }
}
