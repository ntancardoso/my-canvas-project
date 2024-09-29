import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { resources } from "../../Resource";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";

export class Rod extends GameObject {
    constructor(x, y) {
        super({
            position: new Vector2(x, y)
        });
        const sprite = new Sprite({
            resource: resources.images.rod,
            position: new Vector2(0, -5)
        })
        this.addChild(sprite);

        events.on("HERO_POSITION", this, pos => {
            const roundHeroX = Math.round(pos.x);
            const roundHeroY = Math.round(pos.y);
            if (roundHeroX === this.position.x && roundHeroY === this.position.y) {
                this.onCollideWithHero();
            }
        })

    }


    onCollideWithHero() {
        this.destroy()
        events.emit("HERO_PICKS_UP_ITEM", {
            image: resources.images.rod,
            position: this.position
        })
    }

}