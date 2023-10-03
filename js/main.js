var game;
var model;
var emitter;
var G;
var controller;
var mediaManager;

window.onload = function () {
  var isMobile = navigator.userAgent.indexOf("Mobile");
  if (isMobile == -1) {
    isMobile = navigator.userAgent.indexOf("Tablet");
  }

  if (isMobile == -1) {
    var config = {
      type: Phaser.AUTO,
      width: 480,
      height: 640,
      backgroundColor: "#006400",
      parent: "phaser-game",
      scene: [
        SceneLoad,
        SceneTitle,
        SceneMain,
        SceneOver,
        SceneWinner1,
        SceneWinner2,
        SceneLast,
        SceneWinner3,
      ],
      physics: {
        default: "arcade",
        arcade: {
          debug: true,
        },
      },
    };
  } else {
    var config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: "#006400",

      parent: "phaser-game",
      scene: [
        SceneLoad,
        SceneTitle,
        SceneMain,
        SceneOver,
        SceneWinner1,
        SceneWinner2,
        SceneLast,
        SceneWinner3,
      ],
      physics: {
        default: "arcade",
        arcade: {
          debug: true,
        },
      },
    };
  }

  G = new Constants();
  model = new Model();
  this.model.isMobile = isMobile;
  game = new Phaser.Game(config);
  window.focus();
  resizeGame();
  window.addEventListener("resize", resizeGame);
};

function resizeGame() {
  var canvas = document.querySelector("canvas");
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var windowRatio = windowWidth / windowHeight;
  var gameRatio = game.config.width / game.config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + "px";
    canvas.style.height = windowWidth / gameRatio + "px";
  } else {
    canvas.style.width = windowHeight * gameRatio + "px";
    canvas.style.height = windowHeight + "px";
  }
}
