export class ButtonCreator {
  static height = 128;
  static width = 128;
  static tintColor = 0xeeeeee;

  scene: Phaser.Scene;
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  create(x, y, texture, pressTexture, callback) {
    const button = this.scene.add
      .image(x, y, texture)
      // .setScale(0.5)
      .setInteractive({ useHandCursor: true }) // Change cursor on hover
      .on("pointerover", () => button.setTint(ButtonCreator.tintColor)) // Hover state
      .on("pointerout", () => {
        button.clearTint();
        button.setTexture(texture);
      }) // Rest state
      .on("pointerdown", () => button.setTexture(pressTexture))
      .on("pointerup", () => {
        button.setTexture(texture);
        callback.call(this.scene);
      });

    button.displayWidth = ButtonCreator.width;
    button.displayHeight = ButtonCreator.height;

    return button;
  }
}
