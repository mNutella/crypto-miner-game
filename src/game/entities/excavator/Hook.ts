import { GameObjects, Scene } from "phaser";

export class Hook extends GameObjects.Sprite {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "hook");
    this.setRotation(1.5);
  }
}
