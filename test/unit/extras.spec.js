define(['whs'], function(WHS) {
  describe('Extras', () => {
    const world = new WHS.World({init: {renderer: false}});

    context('Group', () => {
      const group = new WHS.Group();

      it('#addTo', () => {
        group.addTo(world);
      });

      it('Adding a shape', () => {
        const shape = new WHS.Shape(new THREE.Mesh());
        shape.addTo(group);
      });

      it('Shapes created at the beginning', () => {
        const shape = new WHS.Shape(new THREE.Mesh());
        const shape2 = shape.clone();

        new WHS.Group(shape, shape2);
      });
    });

    context('Loop', () => {
      const loop = new WHS.Loop((clock) => {
        clock.getElapsedTime();
      });

      it('#addLoop', () => {
        world.addLoop(loop);
      });

      it('#removeLoop', () => {
        world.removeLoop(loop);
      });

      it('#start (with shorthand)', () => {
        loop.start(world);
      });

      it('#stop (with shorthand)', () => {
        loop.stop(world);
      });

      it('#execute', () => {
        loop.execute();
      });
    });

    context('List', () => {
      const list = new WHS.List([1, 2, 3]);

      it('#add', () => {
        list.add(4);
      });

      it('#remove', () => {
        list.remove(2);
      });
    });
  });
});
