import Vector from "../Graphics/Vector";
import ICollisionType from "./ICollisionType";

export default class Box implements ICollisionType {
    private _offset: Vector;
    private _size: Vector;

    constructor(props) {
        this._offset = props.offset;
        this._size = props.size;
    }

    getBounds() {
        return {
            tl: this._offset,
            br: this._offset.sum(this._size),
            tr: new Vector(this._offset.x, this._offset.y + this._size.y),
            bl: new Vector(this._offset.x + this._size.x, this._offset.y)
        };
    }

    getSize(): Vector {
        return this._size;
    }

    getOffset(): Vector {
        return this._offset;
    }
}