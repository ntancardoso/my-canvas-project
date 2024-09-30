import { Camera } from "../../Camera";
import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { Input } from "../../Input";
import { Inventory } from "../Inventory/Inventory";
import { SpriteTextString } from "../SpriteTextString/SpriteTextString";

export class Main extends GameObject {
    constructor() {
        super({});
        this.level = null;
        this.input = new Input()
        this.camera = new Camera()
    }

    ready() {

        const inventory = new Inventory()
        this.addChild(inventory)

        events.on("CHANGE_LEVEL", this, newLevelInstance => {
            this.setLevel(newLevelInstance)
        })

        events.on("HERO_REQUEST_ACTION", this, newLevelInstance => {
            const textbox = new SpriteTextString("Hey hey hey! yohoho!")
            this.addChild(textbox)
            events.emit("START_TEXT_BOX")

            const endingSub = events.on("END_TEXT_BOX", this, () => {
                textbox.destroy();
                events.off(endingSub);
            })
        })
    }

    setLevel(newLevelInstance) {

        if (this.level) {
            this.level.destroy();
        }

        this.level = newLevelInstance;
        this.addChild(this.level);
    }

    drawBackground(ctx) {
        this.level?.background.drawImage(ctx, 0, 0);
    }

    drawObjects(ctx) {
        this.children.forEach(child => {
            if (child.drawLayer !== "HUD") {
                child.draw(ctx, 0, 0);
            }
        })
    }

    drawForeground(ctx) {
        this.children.forEach(child => {
            if (child.drawLayer === "HUD") {
                child.draw(ctx, 0, 0);
            }
        })
    }

}