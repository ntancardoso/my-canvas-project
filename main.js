import './style.css'
import { resources } from './src/Resource';
import { Sprite } from './src/Sprite';
import { Vector2 } from './src/Vector2';
import { GameLoop } from './src/GameLoop';
import { gridCells } from './src/helpers/grid';
import { Hero } from './src/objects/Hero/Hero';
import { Camera } from './src/Camera';
import { Rod } from './src/objects/Rod/Rod';
import { Exit } from './src/objects/Exit/Exit';
import { events } from './src/Events';
import { Main } from './src/objects/Main/Main';
import { OutdoorLevel1 } from './src/levels/OutdoorLevel1';

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const mainScene = new Main({
  position: new Vector2(0, 0)
});
mainScene.setLevel(new OutdoorLevel1());

events.on("HERO_EXITS", mainScene, () => {
  console.log("Change the map")
})

const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);

};

const draw = () => {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mainScene.drawBackground(ctx);
  ctx.save();

  if (mainScene.camera) {
    ctx.translate(mainScene.camera.position.x, mainScene.camera.position.y);
  }

  mainScene.draw(ctx, 0, 0);

  ctx.restore();

  mainScene.drawForeground(ctx);
}

const gameLoop = new GameLoop(update, draw);
gameLoop.start()