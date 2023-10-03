class Road extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene;
    this.back = this.scene.add.image(0, 0, "road");
    this.add(this.back);
    this.scene.add.existing(this);

    Align.scaleToGameW(this.back, 0.5);

    this.setSize(this.back.displayWidth, game.config.height);

    this.lineGroup = this.scene.add.group();
    this.lineGroup2 = this.scene.add.group();
    this.lineGroup3 = this.scene.add.group();

    this.count = 0;

    this.car = this.scene.add.sprite(
      this.displayWidth / 4,
      game.config.height * 0.9,
      "cars"
    );
    Align.scaleToGameW(this.car, 0.1);
    this.add(this.car);

    this.power = 0;

    this.back.setInteractive();

    this.back.on("pointerdown", this.moveLeft, this);

    if (model.score >= 10) this.addObjects();
    else this.addObject();

    emitter.emit(G.SET_SCORE, model.score);
  }
  moveLeft() {
    if (model.gameOver == true) {
      return;
    }

    if (this.car.x === -this.displayWidth / 4) {
      this.car.x = this.displayWidth / 4;
    } else if (this.car.x === this.displayWidth / 4) {
      this.car.x = -this.displayWidth / 4;
    }
  }
  makeLines() {
    this.vSpace = this.displayHeight / 10;

    for (var i = 0; i < 20; i++) {
      var line = this.scene.add.image(this.x, this.vSpace * i, "line");
      line.oy = line.y;
      this.lineGroup.add(line);
    }
  }
  makeTrees() {
    var t1 = this.RandomNumber(t1);
    this.vSpace1 = this.displayHeight / 10;
    for (var i = 0; i < 10; i++) {
      var tree = this.scene.add.image(this.x, this.vSpace1 * i, `tree0`);
      tree.oy = tree.y;
      this.lineGroup2.add(tree);
    }
    this.vSpace2 = this.displayHeight / 10;
    for (var i = 0; i < 10; i++) {
      var tree = this.scene.add.image(this.x, this.vSpace2 * i + 50, `tree3`);
      tree.oy = tree.y;
      this.lineGroup3.add(tree);
    }
  }

  RandomNumber(number) {
    number = Math.floor(Math.random() * 5);
    return number;
  }

  moveLines() {
    if (model.gameOver == true) {
      return;
    }

    this.lineGroup.children.iterate(
      function (child) {
        child.y += this.vSpace / model.velocity;
      }.bind(this)
    );
    this.lineGroup2.children.iterate(
      function (child) {
        child.x = this.displayWidth - 130;
        child.y += this.vSpace1 / model.velocity - 0.5;
      }.bind(this)
    );
    this.lineGroup3.children.iterate(
      function (child) {
        child.x = this.displayWidth + 130;
        child.y += this.vSpace1 / model.velocity - 0.5;
      }.bind(this)
    );

    this.count++;

    if (this.count == model.velocity) {
      this.lineGroup.children.iterate(
        function (child) {
          child.y = child.oy;
        }.bind(this)
      );
    }
    if (this.count == model.velocity) {
      this.lineGroup2.children.iterate(
        function (child) {
          child.y = child.oy;
        }.bind(this)
      );
    }
    if (this.count == model.velocity) {
      this.count = 0;
      this.lineGroup3.children.iterate(
        function (child) {
          child.y = child.oy;
        }.bind(this)
      );
    }
    if (this.lineGroup2.y > game.config.height) {
      this.lineGroup2.destroy();
    }
    if (this.lineGroup3.y > game.config.height) {
      this.lineGroup3.destroy();
    }
  }

  moveCar(cursors) {
    if (model.gameOver == true) {
      return;
    }
    mediaManager.playSound("whoosh");
    if (cursors.left.isDowm) {
      this.road2.car.x = -this.displayWidth / 4;
    }
    if (cursors.left.isDown) {
      this.car.x = -this.displayWidth / 4;
    } else if (cursors.right.isDown) {
      this.car.x = this.displayWidth / 4;
    }
    if (cursors.down.isDown) {
      this.car.y += 10;
    } else if (cursors.up.isDown) {
      this.car.y -= 10;
    }

    if (model.score >= 10) {
      if (cursors.down.isDown) {
        this.car.y += 10;
      } else if (cursors.up.isDown) {
        this.car.y -= 10;
      }
    }
  }
  addObject() {
    var objs = [
      {
        key: "pcar1",
        speed: model.velocity / 2,
        scale: 10,
      },
      {
        key: "pcar2",
        speed: model.velocity / 2,
        scale: 10,
      },
      {
        key: "cone",
        speed: model.velocity,
        scale: 5,
      },
      {
        key: "barrier",
        speed: model.velocity,
        scale: 8,
      },
      {
        key: "bus",
        speed: model.velocity,
        scale: 12,
      },
      {
        key: "truck",
        speed: model.velocity,
        scale: 10,
      },
      {
        key: "truck1",
        speed: model.velocity,
        scale: 10,
      },
    ];
    var index = Math.floor(Math.random() * 7);
    var key = objs[index].key;
    var speed = objs[index].speed;
    var scale = objs[index].scale / 100;

    var lane = Math.random() * 100;

    this.object = this.scene.add.sprite(-this.displayWidth / 4, 0, key);
    this.object.speed = speed;

    if (lane < 50) {
      this.object.x = this.displayWidth / 4;
    }

    Align.scaleToGameW(this.object, scale);
    this.add(this.object);
  }

  addObjects() {
    var objs = [
      {
        key: "pcar1",
        speed: model.velocity / 2,
        scale: 10,
      },
      {
        key: "pcar2",
        speed: model.velocity / 2,
        scale: 10,
      },
      {
        key: "cone",
        speed: model.velocity,
        scale: 5,
      },
      {
        key: "barrier",
        speed: model.velocity,
        scale: 8,
      },
      {
        key: "bus",
        speed: model.velocity,
        scale: 12,
      },
      {
        key: "truck",
        speed: model.velocity,
        scale: 10,
      },
      {
        key: "truck1",
        speed: model.velocity,
        scale: 10,
      },
    ];
    var index1 = Math.floor(Math.random() * 7);
    var key1 = objs[index1].key;
    var speed1 = objs[index1].speed;
    var scale1 = objs[index1].scale / 100;

    var lane = Math.random() * 100;

    this.object = this.scene.add.sprite(-this.displayWidth / 4, 0, key1);
    this.object.speed = speed1;

    if (lane < 50) {
      this.object.x = this.displayWidth / 4;
    }

    Align.scaleToGameW(this.object, scale1);
    this.add(this.object);

    var index2 = Math.floor(Math.random() * 4);
    var key2 = objs[index2].key;
    var speed2 = objs[index2].speed;
    var scale2 = objs[index2].scale / 100;

    var lane = Math.random() * 100;

    this.object2 = this.scene.add.sprite(-game.config.width / 4, 0, key2);
    this.object2.speed = speed2;

    if (objs[index2].key == "pcar1" || objs[index2].key == "pcar2")
      this.object2.angle = -90;

    if (lane <= 10) {
      this.object2.y = game.config.width / 0.5;
    } else if (lane > 10 || lane < 25) {
      this.object2.y = game.config.width / 2.5;
    } else if (lane >= 25 || lane <= 75) {
      this.object2.y = game.config.width / 1.5;
    } else if (lane > 75) {
      this.object2.y = game.config.width / 3.5;
    }

    Align.scaleToGameW(this.object2, scale2);
    this.add(this.object2);
  }

  goGameOver() {
    this.scene.start("SceneOver");
  }

  goNextLevel() {
    this.scene.start("SceneWinner1");
  }

  goNextLevel2() {
    this.scene.start("SceneWinner2");
  }

  goMainAfterWIn() {
    this.scene.start("SceneWinner3");
  }

  moveObject() {
    if (model.gameOver == true) {
      return;
    }

    this.object.y += this.vSpace / this.object.speed;

    if (this.car.alpha != 0) {
      if (Collision.checkCollide(this.car, this.object) == true) {
        model.gameOver = true;
        emitter.emit(G.PLAY_SOUND, "boom");

        this.scene.tweens.add({
          targets: this.car,
          duration: 1000,
          y: game.config.height,
          angle: -270,
        });

        this.scene.time.addEvent({
          delay: 2000,
          callback: this.goGameOver,
          callbackScope: this.scene,
          loop: false,
        });
      }

      if (this.object.y > game.config.height) {
        emitter.emit(G.UP_POINTS, 1);
        this.object.destroy();

        if (model.score == 10) {
          this.scene.time.addEvent({
            delay: 30,
            callback: this.goNextLevel,
            callbackScope: this.scene,
            loop: false,
          });
        }

        if (model.score == 20) {
          this.scene.time.addEvent({
            delay: 50,
            callback: this.goNextLevel2,
            callbackScope: this.scene,
            loop: false,
          });
        }

        if (model.score == 30) {
          this.scene.time.addEvent({
            delay: 150,
            callback: this.goMainAfterWIn,
            callbackScope: this.scene,
            loop: false,
          });
        }
        this.addObject();
      }
    }
  }

  moveObjects() {
    if (model.gameOver == true) {
      return;
    }

    this.object.y += this.vSpace / this.object.speed;
    this.object2.x += this.vSpace / this.object2.speed;

    if (this.car.alpha != 0) {
      if (Collision.checkCollide(this.car, this.object) == true) {
        model.gameOver = true;
        emitter.emit(G.PLAY_SOUND, "boom");

        this.scene.tweens.add({
          targets: this.car,
          duration: 1000,
          y: game.config.height,
          angle: -270,
        });

        this.scene.time.addEvent({
          delay: 2000,
          callback: this.goGameOver,
          callbackScope: this.scene,
          loop: false,
        });
      }

      if (Collision.checkCollide(this.car, this.object2) == true) {
        model.gameOver = true;
        emitter.emit(G.PLAY_SOUND, "boom");

        this.scene.tweens.add({
          targets: this.car,
          duration: 1000,
          x: game.config.width,
          angle: -270,
        });

        this.scene.time.addEvent({
          delay: 2000,
          callback: this.goGameOver,
          callbackScope: this.scene,
          loop: false,
        });
      }

      if (this.object.y > game.config.height) {
        emitter.emit(G.UP_POINTS, 1);
        this.object.destroy();

        if (model.score == 30) {
          this.scene.time.addEvent({
            delay: 50,
            callback: this.goMainAfterWIn,
            callbackScope: this.scene,
            loop: false,
          });
        }

        this.addObjects();
      }

      if (this.object2.y > game.config.width) {
        this.object2.destroy();

        if (model.score == 30) {
          this.scene.time.addEvent({
            delay: 50,
            callback: this.goMainAfterWIn,
            callbackScope: this.scene,
            loop: false,
          });
        }
        this.addObjects();
      }
    }
  }
}
