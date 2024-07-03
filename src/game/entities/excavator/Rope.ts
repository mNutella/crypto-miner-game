import { GameObjects, Scene } from "phaser";

export class Rope extends GameObjects.Graphics {
  constructor(
    scene: Scene,
    x: number,
    y: number,
    width: number,
    hookX: number,
    hookY: number,
  ) {
    super(scene);
    this.create(x, y, width, hookX, hookY);
  }

  create(x: number, y: number, width: number, hookX: number, hookY: number) {
    this.clear();
    this.lineStyle(width, 0x000000, 1);
    this.beginPath();
    this.moveTo(x, y);
    this.lineTo(hookX, hookY);
    this.strokePath();
  }
}
