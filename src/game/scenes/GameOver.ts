import { Scene } from "phaser";
import { EventBus } from "../EventBus";

import { ButtonCreator } from "../ui/buttonCreator";

export class GameOver extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameOverText: Phaser.GameObjects.Text;

  constructor() {
    super("GameOver");
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0xff0000);

    this.background = this.add.image(512, 384, "background");
    this.background.setAlpha(0.5);

    this.gameOverText = this.add
      .text(this.scale.width / 2, (this.scale.height * 2) / 5, "Game Over", {
        fontFamily: "Arial Black",
        fontSize: 64,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(100);

    const buttonCreator = new ButtonCreator(this);
    buttonCreator.create(
      this.scale.width / 2,
      (this.scale.height * 3) / 5,
      "restartButton",
      "restartButtonGrayscale",
      this.changeScene,
    );

    EventBus.emit("current-scene-ready", this);
  }

  changeScene() {
    this.scene.start("MainMenu");
  }
}
