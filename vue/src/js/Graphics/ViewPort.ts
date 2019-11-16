import Vector from './Vector';
import Render from './Render';
import Zone from "./Zone";
import GameObject from "../Actor/GameObject";

export default class ViewPort {
    private _worldPoisition: Vector;
    private _size: Vector;
    private _ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D, pos: Vector, size: Vector) {
        this._ctx = ctx;
        this._worldPoisition = pos;
        this._size = size;
    }

    public update(characterPosition: Vector): void {
        let newX = characterPosition.x - this._size.x / 2;
        let newY = characterPosition.y - this._size.y / 2;

        this._worldPoisition.x = newX;
        this._worldPoisition.y = newY;
    }

    public drawZones(zones: Array<Zone>): void {
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

    public drawGameObjects(gameObjects: Array<GameObject>, time: number) {
        gameObjects.forEach((gameObject) => {
            let frame = gameObject.getFrame(time);

            if (!frame) return;

            let cx = gameObject.position.x - this._worldPoisition.x - gameObject.size.x / 2;
            let cy = gameObject.position.y - this._worldPoisition.y - gameObject.size.y / 2;

            this._ctx.save();
            if (frame.reversed) {
                this._ctx.setTransform(-1, 0, 0, 1, (cx * 2) + gameObject.size.x, 0);
            }

            this._ctx.drawImage(frame.sheet, frame.sx, frame.sy, frame.sWidth, frame.sHeight, cx, cy, gameObject.size.x, gameObject.size.y);
            this._ctx.restore();
        })
    }

    get endPoints(): [Vector, Vector, Vector, Vector] {
        return [
            new Vector(this._worldPoisition.x + this.size.x, this._worldPoisition.y),
            new Vector(this._worldPoisition.x, this._worldPoisition.y),
            new Vector(this._worldPoisition.x, this._worldPoisition.y + this.size.y),
            new Vector(this._worldPoisition.x + this.size.x, this._worldPoisition.y + this.size.y)
        ];
    }

    get size(): Vector {
        return this._size;
    }

    set size(value: Vector) {
        this._size = value;
    }
}