import { Excavator } from "../entities/excavator/Excavator";
import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameText: Phaser.GameObjects.Text;

  miner: Excavator;

  constructor() {
    super("Game");
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x000000);

    this.background = this.add.image(
      this.scale.width / 2,
      this.scale.height / 2,
      "game-background",
    );
    this.background.displayWidth = this.sys.game.config.width as number;
    this.background.displayHeight = this.sys.game.config.height as number;

    this.miner = new Excavator({
      scene: this,
      x: this.scale.width / 2,
      y: this.scale.height / 3,
      ropeLength: 200,
      ropeWidth: 5,
      maxAngle: 50,
    });

    let miner = this.miner;
    this.input.on("pointerdown", () => miner.toggleHook());

    EventBus.emit("current-scene-ready", this);

    // this.time.delayedCall(5000, this.changeScene, [], this);
  }

  update(time: number, delta: number) {
    this.miner.update(delta);
  }

  changeScene() {
    this.scene.start("GameOver");
  }
}
