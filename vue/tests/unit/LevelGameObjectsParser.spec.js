import Levels from '@/js/GameData/Levels';

describe('GameObjects parser for Levels', () => {
   it('parse result is correct answer', () => {
      let generator = Levels.GameObjectsParser(Levels.menu);

      let ans = ["hero", "solid"];

      let ar = {};

      for (let obj of generator) {
         for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
               if (ar[key] === undefined)
                  ar[key] = [];

               ar[key].push(obj[key]);
            }
         }
      }

      console.log(ar);

      expect(ar).toBeTruthy();
   })
});