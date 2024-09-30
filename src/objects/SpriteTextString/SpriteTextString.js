import { GameObject } from "../../GameObject";
import { resources } from "../../Resource";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";
import { getCharacterFrame, getCharacterWidth } from "./spriteFontMap";

export class SpriteTextString extends GameObject {
    constructor(str) {
        super({
            position: new Vector2(32, 108)
        });
        this.content = str ?? "default content";
        this.words = this.content.split(" ").map(word => {

            let wordWidth = 0;
            const chars = word.split("").map(char => {
                const charWidth = getCharacterWidth(char);
                wordWidth += charWidth;
                return {
                    width: charWidth,
                    sprite: new Sprite({
                        resource: resources.images.fontWhite,
                        hFrames: 13,
                        vFrames: 6,
                        frame: getCharacterFrame(char)
                    })
                }
            })

            return {
                wordWidth,
                chars
            }
        })

        this.backdrop = new Sprite({
            resource: resources.images.textBox,
            frameSize: new Vector2(256, 64)
        });
    }

    drawImage(ctx, drawPosX, drawPosY) {
        this.backdrop.drawImage(ctx, drawPosX, drawPosY);

        const PADDING_LEFT = 7;
        const PADDING_TOP = 7;
        const LINE_WIDTH_MAX = 240;
        const LINE_VERTICAL_HEIGHT = 14;

        let cursorX = drawPosX + PADDING_LEFT;
        let cursorY = drawPosY + PADDING_TOP;

        this.words.forEach(word => {
            const spaceRemaining = drawPosX + LINE_WIDTH_MAX - cursorX;
            if (spaceRemaining < word.wordWidth) {
                cursorX = drawPosX + PADDING_LEFT
                cursorY += LINE_VERTICAL_HEIGHT
            }

            word.chars.forEach(char => {
                const {sprite, width} = char;
                const withCharOffset = cursorX - 5;
                sprite.draw(ctx, withCharOffset, cursorY)
                cursorX += width
                cursorX += 1;
            })
            cursorX += 3;
        });

    }
}