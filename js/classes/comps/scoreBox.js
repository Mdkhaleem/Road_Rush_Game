class ScoreBox extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene;
    this.text1 = this.scene.add.text(0, -30, "SCORE: 0");
    this.text1.setOrigin(0.7, 1);
    this.add(this.text1);

    this.text1.setBackgroundColor("#000000");

    this.scene.add.existing(this);

    emitter.on(G.SCORE_UPDATED, this.scoreUpdated, this);
  }

  scoreUpdated() {
    this.text1.setText("SCORE: " + model.score);
  }
}
