import ICollision from "./ICollision";
import ICollisionType from "./ICollisionType";
import GameObject from "../Actor/GameObject";
import Vector from "../Graphics/Vector";

function* triggersSearch(triggers: Array<Collision>) {
    for (let i = 0; i < triggers.length; i++) {
        yield triggers[i];
    }
}

export default class Collision implements ICollision {
    private _object: GameObject;
    private _collide: ICollisionType;
    private _triggers: Array<Collision> = [];
    private _bounds;

    constructor(props) {
        this._object = props.object;
        this._collide = props.collide;

        this._bounds = this._collide.getBounds();
    }

    public checkCollisions(newPosition: Vector = this._object.position) {
        let iterator = triggersSearch(this._triggers);

        let trigger = iterator.next(), ans = false;

        while (!trigger.done && !ans) {
            ans = this.checkCollides(trigger.value, newPosition);
            trigger = iterator.next();
        }

        return ans;
    }

    public addTriggerWith(collision: Collision) {
        this._triggers.push(collision);
    }

    protected checkCollides(otherCollision: Collision, newPosition: Vector) {
        let otherCollide = otherCollision.collide;
        let otherObject = otherCollision.object;

        let thisAbsoluteCenterPosition = newPosition.subtract(this._object.size.divide(2)).sum(this._collide.getOffset().sum(this._collide.getSize().divide(2)));
        let otherAbsoluteCenterPosition = otherObject.position.subtract(otherObject.size.divide(2)).sum(otherCollide.getOffset().sum(otherCollide.getSize().divide(2)));

        let area = new Vector(
            otherCollide.getSize().x / 2,
            otherCollide.getSize().y / 2
        );
        let vector = otherAbsoluteCenterPosition.subtract(thisAbsoluteCenterPosition);

        return vector.length < area.length;
    }

    get collide(): ICollisionType {
        return this._collide;
    }

    get object(): GameObject {
        return this._object;
    }
}