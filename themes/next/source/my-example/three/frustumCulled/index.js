function init() {
	var stats = initStats();
	var renderer = initRenderer();
	var camera = initCamera();

	// attach them here, since appendChild needs to be called first
  var trackballControls = initTrackballControls(camera, renderer);
  var clock = new THREE.Clock();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  var planeGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 20, 20);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff
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

  // add spotlight for the shadows 【灯光】
  var spotLight = new THREE.SpotLight(0xffffff, 1, 250, 2);
  spotLight.position.set(-40, 160, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  var points = gosper(4, 60);
  var lineGeometry = new THREE.BufferGeometry()
  lineGeometry.setFromPoints(points)

  let line = new THREE.Line(
    lineGeometry,
    new THREE.LineBasicMaterial({
      opacity: 1.0,
      linewidth: 1,
      color: 0x00ddff
    })
  )
  // 生成一个特殊形状的线条并添加到场景中
  scene.add(line);

  // -----------------------------

  var curve1 = new THREE.SplineCurve3( [
    new THREE.Vector3( -10, 0, 0 ),
    new THREE.Vector3( -5, 0, 5 ),
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( 5, 0, 5 ),
    new THREE.Vector3( 5, 0, 10 ),
    new THREE.Vector3( 10, 0, 0 ),
    new THREE.Vector3( 10, 0, 10 ),
    new THREE.Vector3( 10, 0, 10 ),
    new THREE.Vector3( 30, 0, 10 ),
    new THREE.Vector3( 30, 0, 10 ),
  ] );
  
  var points1 = curve1.getPoints( 50 );
  var geometry1 = new THREE.BufferGeometry().setFromPoints( points1 );
  var material1 = new THREE.LineBasicMaterial( { color : 0xaa00ff, antialias: true, linewidth: 5, linecap: 'round'  } );
  // Create the final object to add to the scene
  var splineObject1 = new THREE.Line( geometry1, material1 );
  splineObject1.segments = 1000;
	splineObject1.frustumCulled = true

  var group = new THREE.Group();
	group.add( splineObject1 );

  // --------------------------

  var curve2 = new THREE.SplineCurve3( [
    new THREE.Vector3( -10, 1, 0 ),
    new THREE.Vector3( -5, 1, 5 ),
    new THREE.Vector3( 0, 1, 0 ),
    new THREE.Vector3( 5, 1, 5 ),
    new THREE.Vector3( 5, 1, 10 ),
    new THREE.Vector3( 10, 1, 0 ),
    new THREE.Vector3( 10, 1, 10 ),
    new THREE.Vector3( 10, 1, 10 ),
    new THREE.Vector3( 30, 1, 10 ),
    new THREE.Vector3( 30, 1, 10 ),
  ] );
  var points2 = curve1.getPoints( 50 );
  var geometry2 = new THREE.BufferGeometry().setFromPoints( points2 );
  var material2 = new THREE.LineBasicMaterial( { color : 0xaa00ff  } );
  // Create the final object to add to the scene
  var splineObject2 = new THREE.Line( geometry2, material2 );
  splineObject2.frustumCulled = true
  splineObject2.translateY(3)

  group.add( splineObject2 );



  scene.add(group);

  // add the output of the renderer to the html element
  document.getElementById("webgl-output").appendChild(renderer.domElement);


  var controls = new function () {
    this.outputObjects = function () {
    	console.log(scene.children);
    }
  };

  var gui = new dat.GUI();
  
  gui.add(controls, 'outputObjects');

  

  render();
  
  function render() {

    // update方法需要传入一个时间差参数delta，表示当前帧与上一帧之间的时间差。
    // 更新TrackballControls的状态，并将时间差作为参数传递给update方法。
  	trackballControls.update(clock.getDelta());
  	stats.update();

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  function gosper(a, b) {

    var turtle = [0, 0, 0];
    var points = [];
    var count = 0;

    rg(a, b, turtle);


    return points;

    function rt(x) {
      turtle[2] += x;
    }

    function lt(x) {
      turtle[2] -= x;
    }

    function fd(dist) {
      //                ctx.beginPath();
      points.push({
        x: turtle[0],
        y: turtle[1],
        z: Math.sin(count) * 5
      });
      //                ctx.moveTo(turtle[0], turtle[1]);

      var dir = turtle[2] * (Math.PI / 180);
      turtle[0] += Math.cos(dir) * dist;
      turtle[1] += Math.sin(dir) * dist;

      points.push({
        x: turtle[0],
        y: turtle[1],
        z: Math.sin(count) * 5
      });
      //                ctx.lineTo(turtle[0], turtle[1]);
      //                ctx.stroke();

    }

    function rg(st, ln, turtle) {

      st--;
      ln = ln / 2.6457;
      if (st > 0) {
        //                    ctx.strokeStyle = '#111';
        rg(st, ln, turtle);
        rt(60);
        gl(st, ln, turtle);
        rt(120);
        gl(st, ln, turtle);
        lt(60);
        rg(st, ln, turtle);
        lt(120);
        rg(st, ln, turtle);
        rg(st, ln, turtle);
        lt(60);
        gl(st, ln, turtle);
        rt(60);
      }
      if (st == 0) {
        fd(ln);
        rt(60);
        fd(ln);
        rt(120);
        fd(ln);
        lt(60);
        fd(ln);
        lt(120);
        fd(ln);
        fd(ln);
        lt(60);
        fd(ln);
        rt(60)
      }
    }

    function gl(st, ln, turtle) {
      st--;
      ln = ln / 2.6457;
      if (st > 0) {
        //                    ctx.strokeStyle = '#555';
        lt(60);
        rg(st, ln, turtle);
        rt(60);
        gl(st, ln, turtle);
        gl(st, ln, turtle);
        rt(120);
        gl(st, ln, turtle);
        rt(60);
        rg(st, ln, turtle);
        lt(120);
        rg(st, ln, turtle);
        lt(60);
        gl(st, ln, turtle);
      }
      if (st == 0) {
        lt(60);
        fd(ln);
        rt(60);
        fd(ln);
        fd(ln);
        rt(120);
        fd(ln);
        rt(60);
        fd(ln);
        lt(120);
        fd(ln);
        lt(60);
        fd(ln);
      }
    }
  }
}