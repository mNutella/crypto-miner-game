import { GameObjects, Scene } from "phaser";
import { Rope } from "./Rope";
import { Hook } from "./Hook";

export class Excavator {
  scene: Scene;
  // TODO: replace with sprite because there is visual bug like rope shrinking when rotating
  rope: Rope;
  ropeLength: number;
  maxRopeLength: number;
  ropeWidth: number;
  hook: GameObjects.Sprite;
  angle: number;
  maxAngle: number;
  angleSpeed: number;
  stretchingSpeed: number;
  container: GameObjects.Container;
  ropeHookContainer: GameObjects.Container;
  isHooking: boolean = false;

  constructor({
    scene,
    x,
    y,
    ropeLength,
    ropeWidth,
    maxAngle,
  }: {
    scene: Scene;
    x: number;
    y: number;
    ropeLength: number;
    ropeWidth: number;
    maxAngle: number;
  }) {
    this.scene = scene;
    this.rope = new Rope(scene, 0, 0, ropeWidth, 0, ropeLength);
    this.hook = new Hook(scene, 0, ropeLength);
    this.ropeLength = ropeLength;
    this.ropeWidth = ropeWidth;
    this.angle = 50;
    this.maxAngle = maxAngle;
    this.maxRopeLength = ropeLength;
    this.angleSpeed = 0.02;
    this.stretchingSpeed = 0.2;

    let minerImage = this.scene.add.image(
      this.scene.scale.width - 256,
      this.scene.scale.height / 4,
      "miner",
    );

    this.ropeHookContainer = this.scene.add.container(10, -125);
    this.ropeHookContainer.add([this.rope, this.hook]);
    this.container = this.scene.add.container(x, y);
    this.container.add(this.ropeHookContainer);

    this.ropeHookContainer.setDepth(1);
    minerImage.setDepth(2);
  }

  toggleHook() {
    this.isHooking = true;
  }

  update(delta: number) {
    if (this.isHooking) {
      this.ropeLength += this.stretchingSpeed * delta;

      let hookX = this.hook.x + this.hook.y * Math.cos(this.angle);
      let hookY = this.ropeLength;
      let bottomPadding = 150;

      if (
        hookX > this.scene.scale.width - bottomPadding ||
        hookY > this.scene.scale.height - bottomPadding
      ) {
        this.stretchingSpeed *= -1; // Change stretching direction when reaching max angle
      }

      if (this.ropeLength <= this.maxRopeLength) {
        this.isHooking = false;
        this.stretchingSpeed *= -1;
      }

      this.rope.create(0, 0, this.ropeWidth, 0, this.ropeLength);
      this.hook.setPosition(0, this.ropeLength);
    } else {
      this.angle += this.angleSpeed * delta;
      if (this.angle > this.maxAngle || this.angle < -this.maxAngle) {
        this.angleSpeed *= -1; // Change direction when reaching max angle
      }

      this.ropeHookContainer.setAngle(this.angle);
    }
  }
}
