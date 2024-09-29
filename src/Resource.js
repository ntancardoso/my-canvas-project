class  Resources {
    constructor() {
        this.toLoad = {
            hero: "/sprites/hero-sheet.png",
            shadow: "/sprites/shadow.png",
            rod: "/sprites/rod.png",
            exit: "/sprites/exit.png",

            sky: "/sprites/sky.png",
            ground: "/sprites/ground.png",

            cave: "/sprites/cave.png",
            caveGround: "/sprites/cave-ground.png",
        }

        this.images = {};

        Object.keys(this.toLoad).forEach(key => {
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
                image: img,
                isLoaded: false
            }
            img.onload = () => {
                this.images[key].isLoaded = true;
            }
        })
    }
}

export const resources = new Resources();