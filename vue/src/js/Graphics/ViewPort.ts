import Vector from './Vector';
import Render from './Render';
import Zone from "./Zone";
import GameObject from "../Actor/GameObject";

export default class ViewPort {
    private _worldPosition: Vector;
    private _size: Vector;
    private _ctx: CanvasRenderingContext2D;
    private _zones: Array<Zone>;
    private _gameObjects;

    constructor(ctx: CanvasRenderingContext2D, pos: Vector, size: Vector) {
        this._ctx = ctx;
        this._worldPosition = pos;
        this._size = size;
    }

    public update(): void {
        this._gameObjects.hero[0].update();
        let newX = this._gameObjects.hero[0].position.x - this._size.x / 2;
        let newY = this._gameObjects.hero[0].position.y - this._size.y / 2;

        this._worldPosition.x = newX;
        this._worldPosition.y = newY;
    }

    public drawZones(zones: Array<Zone> = this._zones): void {
        this._ctx.save();
        this._ctx.fillStyle = "black";
        this._ctx.fillRect(0, 0, this._size.x, this._size.y);
        this._ctx.restore();

        zones.forEach((zone) => {
            let data = Render.getZonePartData(this, zone);

            if (!data) return;

            let back = zone.background;

            if (!back) return;

            this._ctx.save();
            this._ctx.fillStyle = this._ctx.createPattern(back.cache, 'repeat');
            this._ctx.fillRect(data.offsets.x, data.offsets.y, data.size.x, data.size.y);
            this._ctx.restore();
        });
    }

    public drawGameObjects(time: number, gameObjects = this._gameObjects) {
        let gameObjectsAsArray = Object.values(this._gameObjects) as Array<GameObject>;
        //@ts-ignore
        let gameObj = gameObjectsAsArray.flat();

        let gameObjectsAsSortedArray = Render.sortByIncreasingY(gameObj);

        
        gameObjectsAsSortedArray.forEach((gameObject) => {
            let frame = gameObject.getFrame(time);

            if (!frame) return;

            let cx = gameObject.position.x - this._worldPosition.x - gameObject.size.x / 2;
            let cy = gameObject.position.y - this._worldPosition.y - gameObject.size.y / 2;

            this._ctx.save();
            if (frame.reversed) {
                this._ctx.setTransform(-1, 0, 0, 1, (cx * 2) + gameObject.size.x, 0);
            }

            this._ctx.drawImage(frame.sheet, frame.sx, frame.sy, frame.sWidth, frame.sHeight, cx, cy, gameObject.size.x, gameObject.size.y);
            this._ctx.restore();
        })
    }

    private resize(size: Vector): void {
        let gameObjectsAsArray = Object.values(this._gameObjects) as Array<GameObject>;
        //@ts-ignore
        let gameObj = gameObjectsAsArray.flat();
        let diffConst = new Vector(size.x / this._size.x,size.y / this._size.y);

        this._zones.forEach((zone) => {
            zone.onResize(diffConst);
        });
        gameObj.forEach((obj) => {
           obj.onResize(diffConst);
        });
    }

    get endPoints(): [Vector, Vector, Vector, Vector] {
        return [
            new Vector(this._worldPosition.x + this.size.x, this._worldPosition.y),
            new Vector(this._worldPosition.x, this._worldPosition.y),
            new Vector(this._worldPosition.x, this._worldPosition.y + this.size.y),
            new Vector(this._worldPosition.x + this.size.x, this._worldPosition.y + this.size.y)
        ];
    }

    get size(): Vector {
        return this._size;
    }

    set size(value: Vector) {
        this.resize(value);
        this._size = value;
    }

    set zones(values: Array<Zone>) {
        this._zones = values;
    }

    set gameObjects(values) {
        this._gameObjects = values;
    }
}