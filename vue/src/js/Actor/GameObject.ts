import IDrawAble from './IDrawAble';
import Sprite from './Sprite';
import Vector from "../Graphics/Vector";

export default class GameObject implements IDrawAble {
    protected _sprite: Sprite;
    protected _size: Vector;
    protected _position: Vector;

    constructor(props) {
        this._position = props.position;
        this._size = props.size;
        this._sprite = new Sprite();
    }

    public getFrame(time: number) {
        return this._sprite.getFrame(time);
    }

    get sprite(): Sprite {
        return this._sprite;
    }

    get size(): Vector {
        return this._size;
    }

    get position(): Vector {
        return this._position;
    }

    set position(value: Vector) {
        this._position = value;
    }
}