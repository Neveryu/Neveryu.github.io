function init() {
  var stats = initStats();
  var renderer = initRenderer();
  var camera = initCamera();

  // attach them here, since appendChild needs to be called first
  var trackballControls = initTrackballControls(camera, renderer);
  var clock = new THREE.Clock();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  // create the ground plane

  var planeGeometry = new THREE.PlaneGeometry(
    window.innerWidth,
    window.innerHeight,
    20,
    20
  );
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
  });

  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.rotation.z = -0.1 * Math.PI;
  plane.position.x = 10;
  plane.position.y = 0;
  plane.position.z = -5;

  // add the plane to the scene
  scene.add(plane);

  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight(0x999999);
  scene.add(ambientLight);

  // add spotlight for the shadows
  var spotLight = new THREE.SpotLight(0xffffff, 1, 250, 2);
  spotLight.position.set(-40, 160, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // ---初始化内容完成结束---

  // 创建材质
  var material = new THREE.LineDashedMaterial({
    color: 0x00ff00,
    dashSize: 10,
    gapSize: 5,
    linewidth: 2
  });

  // 创建几何体
  var geometry = new THREE.BufferGeometry();
  var vertices = [];
  vertices.push(new THREE.Vector3(-10, 0, 0));
  vertices.push(new THREE.Vector3(0, 10, 0));
  vertices.push(new THREE.Vector3(10, 0, 0));
  geometry.setFromPoints(vertices);

  // 创建线条
  var line = new THREE.Line(geometry, material);
  line.computeLineDistances();

  var group = new THREE.Group();
  group.add(line);

  scene.add(group);

  var controls = new (function () {
    this.outputObjects = function () {
      console.log(scene.children);
    };
  })();

  var gui = new dat.GUI();

  gui.add(controls, "outputObjects");

  render();

  function render() {
    trackballControls.update(clock.getDelta());
    stats.update();
    // render using requestAnimationFrame
    requestAnimationFrame(render);
    material.dashOffset -= 0.1;
    if (material.dashOffset < 0) {
      material.dashOffset = material.dashSize;
    }
    renderer.render(scene, camera);
  }
}
