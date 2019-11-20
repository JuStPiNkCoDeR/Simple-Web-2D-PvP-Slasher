import IDrawAble from './IDrawAble';
import Sprite from './Sprite';
import Vector from "../Graphics/Vector";
import Collision from "../Collisions/Collision";

export default class GameObject implements IDrawAble {
    protected _name: string;
    protected _sprite: Sprite;
    protected _size: Vector;
    protected _position: Vector;
    protected _collision: Collision;

    constructor(props) {
        this._name = props.name;
        this._position = props.position;
        this._size = props.size;
        this._sprite = new Sprite();
        this._collision = new Collision({
            object: this,
            collide: props.collide
        });
    }

    public getFrame(time: number) {
        return this._sprite.getFrame(time);
    }

    public onResize(diffConst: Vector): void {
        this.position.x *= diffConst.x;
        this.position.y *= diffConst.y;
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

    get collision(): Collision {
        return this._collision;
    }
}