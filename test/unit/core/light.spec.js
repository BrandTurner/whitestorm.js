define(['whs'], function(WHS) {
  describe('Light', () => {
    const world = new WHS.World({init: {renderer: false}});

    function describeAttribute(light, name, dims, Value) {
      describe('.' + name, done => {
        it('Method', () => light[name].set(1, 1, 1));

        it('Setter', () => {
          light[name] = new Value(...(new Array(dims.length).fill(2)));
        });

        it('Poperties', () => {
          for (let i = 0; i < dims.length; i++)
            light[name][dims.charAt(i)] = 3;
        });

        it('=== Values are equal ===', () => light.position === light.getNative().position);
      });
    }

    function testAPI(light) {
      // it('#wrapShadow()', () => light.wrapShadow());
      // it('#wrap()', () => light.wrap());
      // it('#wrap() - \'no-shadows\'', () => light.wrap('no-shadows'));
      // it('#wrap() - \'no-transforms\'', () => light.wrap('no-transforms'));
      it('#addTo()', () => light.addTo(world));
      it('#clone()', () => light.clone());
      it('#copy()', () => light.copy(new WHS.Light()));
      it('#getWorld()', () => light.getWorld());
      it('#getParent()', () => light.getParent());

      describeAttribute(light, 'position', 'xyz', THREE.Vector3);
      describeAttribute(light, 'rotation', 'xyz', THREE.Euler);
      describeAttribute(light, 'quaternion', 'xyzw', THREE.Quaternion);
    }

    context('Should wrap three.js lights', () => {
      const lightMesh = new THREE.Light();
      const light = new WHS.Light(lightMesh);

      it('#wrap() - \'no-shadows\'', () => light.wrap('no-shadows'));

      testAPI(light);
    });

    context('Should work with WHS.DirectionalLight', () => {
      const light = new WHS.DirectionalLight({
        light: {
          color: 0xffffff,
          intensity: 2,
          distance: 300
        },

        pos: {
          x: 2,
          y: 4,
          z: 6
        }
      });

      it('#wrap()', () => light.wrap());
      it('#wrap() - \'no-shadows\'', () => light.wrap('no-shadows'));
      it('#wrap() - \'no-transforms\'', () => light.wrap('no-transforms'));

      testAPI(light);
    });
  });
});
