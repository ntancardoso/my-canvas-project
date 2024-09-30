import { events } from "../Events";
import { gridCells } from "../helpers/grid";
import { Exit } from "../objects/Exit/Exit";
import { Hero } from "../objects/Hero/Hero";
import { Level } from "../objects/Level/Level";
import { Npc } from "../objects/NPC/Npc";
import { Rod } from "../objects/Rod/Rod";
import { resources } from "../Resource";
import { Sprite } from "../Sprite";
import { Vector2 } from "../Vector2";
import { OutdoorLevel1 } from "./OutdoorLevel1";

const DEFAULT_HERO_POSITION = new Vector2(gridCells(6), gridCells(5))
export class CaveLevel1 extends Level {
    constructor(params = {}) {
        super({});

        this.background = new Sprite({
            resource: resources.images.cave,
            frameSize: new Vector2(320, 180)
        });

        const ground = new Sprite({
            resource: resources.images.caveGround,
            frameSize: new Vector2(320, 180)
        });
        this.addChild(ground);

        const exit = new Exit(gridCells(3), gridCells(5));
        this.addChild(exit);
        
        this.heroStartPosition = params.heroPosition ?? DEFAULT_HERO_POSITION;
        const hero = new Hero(this.heroStartPosition.x, this.heroStartPosition.y);
        this.addChild(hero);

        const rod = new Rod(gridCells(9), gridCells(6));
        this.addChild(rod);

        const npc = new Npc(gridCells(5), gridCells(5));
        this.addChild(npc);

        this.walls = new Set();
    }

    ready() {
        events.on("HERO_EXITS", this, () => {
            events.emit("CHANGE_LEVEL", new OutdoorLevel1({
                heroPosition: new Vector2(gridCells(7), gridCells(3))
            }))
        })
    }
}