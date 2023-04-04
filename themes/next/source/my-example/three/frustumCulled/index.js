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
  var textureGrass = new THREE.TextureLoader().load("../assets/textures/ground/grasslight-big.jpg");
  textureGrass.wrapS = THREE.RepeatWrapping;
  textureGrass.wrapT = THREE.RepeatWrapping;
  textureGrass.repeat.set(10, 10);

  var planeGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 20, 20);
  var planeMaterial = new THREE.MeshLambertMaterial({
    // map: textureGrass
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

  var points = gosper(4, 60);
  var lineGeometry = new THREE.BufferGeometry()
  lineGeometry.setFromPoints(points)

  let line1 = new THREE.Line(
    lineGeometry,
    new THREE.LineBasicMaterial({
      opacity: 1.0,
      linewidth: 1,
      color: 0x00ddff
    })
  )
  // scene.add(line1);

  var curve = new THREE.SplineCurve3( [
    new THREE.Vector3( -10, 0.1, 0 ),
    new THREE.Vector3( -5, 0.1, 5 ),
    new THREE.Vector3( 0, 0.1, 0 ),
    new THREE.Vector3( 5, 0.1, 5 ),
    new THREE.Vector3( 5, 0.1, 10 ),
    new THREE.Vector3( 10, 0.1, 0 ),
    new THREE.Vector3( 10, 0.1, 10 ),
    new THREE.Vector3( 10, 0.1, 10 ),
    new THREE.Vector3( 30, 0.1, 10 ),
    new THREE.Vector3( 30, 0.1, 10 ),
  ] );
  var points = curve.getPoints( 50 );
  var geometry = new THREE.BufferGeometry().setFromPoints( points );
  var material = new THREE.LineBasicMaterial( { color : 0xaa00ff  } );
  // Create the final object to add to the scene
  var splineObject = new THREE.Line( geometry, material );
	// splineObject.frustumCulled = true

  var group = new THREE.Group();
	group.add( splineObject );

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