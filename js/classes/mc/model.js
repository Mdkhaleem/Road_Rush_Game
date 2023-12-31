class Model {
  constructor() {
    this._score = 0;
    this.soundOn = true;
    this._musicOn = true;
    this.gameOver = false;
    this._velocity = 20;
  }

  set musicOn(val) {
    this._musicOn = val;
    mediaManager.musicChanged();
  }

  get musicOn() {
    return this._musicOn;
  }

  set score(val) {
    this._score = val;
    emitter.emit(G.SCORE_UPDATED);
  }

  get score() {
    return this._score;
  }

  set velocity(val) {
    this._velocity = val;
  }

  get velocity() {
    return this._velocity;
  }
}
