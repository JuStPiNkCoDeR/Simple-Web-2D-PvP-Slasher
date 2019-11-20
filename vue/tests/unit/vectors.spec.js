import Vector from '@/js/Graphics/Vector';

describe('Vectors ', () => {
   it('calculate vectors correctly ', () => {
      let ans = [173.277234512, 44.72135955, 104.403065089, 83.522452071];
      let vectors = [
          new Vector(21, -172),
          new Vector(20, 40),
          new Vector(-30, 100),
          new Vector(-80, -24)
      ];
       for (let i = 0; i < vectors.length; i++) {
            expect(vectors[i].length).toBeCloseTo(ans[i]);
       }
   });
});