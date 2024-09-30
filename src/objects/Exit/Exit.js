import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { resources } from "../../Resource";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";

export class Exit extends GameObject {
    constructor(x, y) {
        super({
            position: new Vector2(x, y)
        })
        this.addChild(new Sprite({
            resource: resources.images.exit
        }))

        this.drawLayer = "FLOOR";
    }

    ready() {
        events.on("HERO_POSITION", this, pos => {
            const roundHeroX = Math.round(pos.x);
            const roundHeroY = Math.round(pos.y);
            if (roundHeroX === this.position.x && roundHeroY === this.position.y) {
                console.log("HERO EXIT")
                events.emit("HERO_EXITS")
            }
        })
    }
}