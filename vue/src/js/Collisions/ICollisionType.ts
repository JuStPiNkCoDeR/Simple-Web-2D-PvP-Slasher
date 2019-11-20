import Vector from "../Graphics/Vector";

export default interface ICollisionType {
    getBounds();
    getSize(): Vector;
    getOffset(): Vector;
}