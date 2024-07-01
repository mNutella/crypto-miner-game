import { GameObjects, Scene } from "phaser";
import { EventBus } from "../EventBus";

import { ButtonCreator } from "../ui/buttonCreator";

export class MainMenu extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  title: GameObjects.Text;
  logoTween: Phaser.Tweens.Tween | null;

  constructor() {
    super("MainMenu");
  }

  create() {
    this.background = this.add.image(512, 384, "background");

    this.logo = this.add
      .image(this.scale.width / 2, (this.scale.height * 2) / 5, "logo")
      .setDepth(100);

    // this.title = this.add
    //   .text(512, 460, "Main Menu", {
    //     fontFamily: "Arial Black",
    //     fontSize: 38,
    //     color: "#ffffff",
    //     stroke: "#000000",
    //     strokeThickness: 8,
    //     align: "center",
    //   })
    //   .setOrigin(0.5)
    //   .setDepth(100);

    const buttonCreator = new ButtonCreator(this);
    buttonCreator.create(
      this.scale.width / 2,
      (this.scale.height * 3) / 5,
      "playButton",
      "playButtonGrayscale",
      this.changeScene,
    );

    EventBus.emit("current-scene-ready", this);
  }

  changeScene() {
    this.scene.start("Game");
  }

  moveLogo(vueCallback: ({ x, y }: { x: number; y: number }) => void) {
    if (this.logoTween) {
      if (this.logoTween.isPlaying()) {
        this.logoTween.pause();
      } else {
        this.logoTween.play();
      }
    } else {
      this.logoTween = this.tweens.add({
        targets: this.logo,
        x: { value: 750, duration: 3000, ease: "Back.easeInOut" },
        y: { value: 80, duration: 1500, ease: "Sine.easeOut" },
        yoyo: true,
        repeat: -1,
        onUpdate: () => {
          if (vueCallback) {
            vueCallback({
              x: Math.floor(this.logo.x),
              y: Math.floor(this.logo.y),
            });
          }
        },
      });
    }
  }
}
