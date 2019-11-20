import Zone from "../Graphics/Zone";
import Vector from "../Graphics/Vector";
var size = new Vector(document.documentElement.clientWidth, document.documentElement.clientHeight);
export default {
    forest: new Zone({
        name: "Forest",
        position: new Vector(0, 0),
        size: new Vector(size.x, size.y),
        background: "img/backgrounds/grass1.png"
    }),
    desert: new Zone({
        name: "Desert",
        position: new Vector(size.x, 0),
        size: new Vector(size.x, size.y),
        background: "img/backgrounds/sand1.png"
    }),
    deadIsland: new Zone({
        name: "Dead Island",
        position: new Vector(size.x, size.y),
        size: new Vector(size.x, size.y),
        background: "img/backgrounds/deadIsland1.png"
    }),
    swamp: new Zone({
        name: "Swamp",
        position: new Vector(0, size.y),
        size: new Vector(size.x, size.y),
        background: "img/backgrounds/dirt1.png"
    }),
    inn: new Zone({
        name: "Inn",
        position: new Vector(0, 0),
        size: new Vector(size.x, size.y),
        background: "img/backgrounds/floor1.png"
    })
};
//# sourceMappingURL=GameZones.js.map