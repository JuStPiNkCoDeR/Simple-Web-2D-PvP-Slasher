export default class Vector {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public sum(vector: Vector) {
        return new Vector(this._x + vector.x, this._y + vector.y);
    }

    public subtract(vector: Vector) {
        return new Vector(this._x - vector.x, this._y - vector.y);
    }

    public divide(num: number) {
        return new Vector(this._x / num, this._y / num);
    }

    public getX(): number {
        return this._x;
    }

    public getY(): number {
        return this._y;
    }

    public setX(x: number): void {
        this._x = x;
    }

    public setY(y: number): void {
        this._y = y;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    set x(value: number) {
        this._x = value;
    }

    set y(value: number) {
        this._y = value;
    }

    get length(): number {
        return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
    }
}