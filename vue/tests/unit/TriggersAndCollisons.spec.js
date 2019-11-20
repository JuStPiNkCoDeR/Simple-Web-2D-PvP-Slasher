import Collision from '@/js/Collisions/Collision';
import GameObject from '@/js/Actor/GameObject';
import Vector from '@/js/Graphics/Vector';
import Box from '@/js/Collisions/Box';

describe('Collisions', () => {
   it('check collisions right', () => {
       let ans = [true, true, true, false];
       let objects = [
           new GameObject({
               position: new Vector(64,64),
               size: new Vector(128, 128)
           }),
           new GameObject({
               position: new Vector(159,64),
               size: new Vector(64, 64)
           }),
           new GameObject({
               position: new Vector(64,159),
               size: new Vector(64, 64)
           }),
           new GameObject({
               position: new Vector(159,159),
               size: new Vector(64, 64)
           }),
           new GameObject({
               position: new Vector(500,500),
               size: new Vector(64, 64)
           }),
       ];
       let collisions = [];

       objects.forEach((obj) => {
           collisions.push(
               new Collision({
                   object: obj,
                   collide: new Box({
                       origin: new Vector(0, 0),
                       size: new Vector(obj.size.x, obj.size.y)
                   })
               })
           )
       });

       let hero = collisions[0];

       for (let i = 1; i < collisions.length; i++) {
           hero.addTriggerWith(collisions[i]);
       }

       expect(hero.checkCollisions()).toStrictEqual(ans);
   })
});