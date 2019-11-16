import States from './States';
import Animation from './Animation';
import Vector from "../Graphics/Vector";

export default class Sprite {
    private animations: object;
    private _state: States;
    private _reversed: boolean;

    constructor() {
        this.animations = {};
        this.state = States.Idle;
        this._reversed = false;
    }

    public addAnimation(name: States, animation: Animation) {
        this.animations[name] = animation;
    }

    public mirror(value: boolean) {
        this._reversed = value;
    }

    public getFrame(time: number) {
        let frameData = this.animations[this._state].getCurrentFrame(time);

        if (frameData) frameData.reversed = this._reversed;

        return frameData;
    }

    get state(): States {
        return  this._state;
    }

    set state(value: States) {
        this._state = value;
    }
}