import Vector from "../Graphics/Vector";

export default interface ICollision {
    checkCollisions(newPosition: Vector);
    addTriggerWith(collision: ICollision);
}