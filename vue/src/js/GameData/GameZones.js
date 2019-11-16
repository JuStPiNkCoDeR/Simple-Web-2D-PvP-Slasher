"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Zone_1 = require("../Graphics/Zone");
var Vector_1 = require("../Graphics/Vector");
var size = new Vector_1.default(document.documentElement.clientWidth, document.documentElement.clientHeight);
exports.default = {
    forest: new Zone_1.default({
        name: "Forest",
        position: new Vector_1.default(0, 0),
        size: new Vector_1.default(size.x, size.y),
        background: "img/backgrounds/grass1.png"
    }),
    desert: new Zone_1.default({
        name: "Desert",
        position: new Vector_1.default(size.x, 0),
        size: new Vector_1.default(size.x, size.y),
        background: "img/backgrounds/sand1.png"
    }),
    deadIsland: new Zone_1.default({
        name: "Dead Island",
        position: new Vector_1.default(size.x, size.y),
        size: new Vector_1.default(size.x, size.y),
        background: "img/backgrounds/deadIsland1.png"
    }),
    swamp: new Zone_1.default({
        name: "Swamp",
        position: new Vector_1.default(0, size.y),
        size: new Vector_1.default(size.x, size.y),
        background: "img/backgrounds/dirt1.png"
    })
};
