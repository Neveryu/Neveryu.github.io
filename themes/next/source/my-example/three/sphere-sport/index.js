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

  var curve = new THREE.SplineCurve3( [
    new THREE.Vector3( -10, 10, 0 ),
    new THREE.Vector3( -5, 0, 5 ),
    new THREE.Vector3( 0, 10, 0 ),
    new THREE.Vector3( 5, 0, 5 ),
    new THREE.Vector3( 5, 10, 10 ),
    new THREE.Vector3( 10, 0, 0 ),
    new THREE.Vector3( 10, 10, 10 ),
    new THREE.Vector3( 10, 20, 10 ),
    new THREE.Vector3( 30, 20, 10 ),
    new THREE.Vector3( 30, 0, 10 ),
  ] );
  var points = curve.getPoints( 50 );
  var geometry = new THREE.BufferGeometry().setFromPoints( points );
  var material = new THREE.LineBasicMaterial( { color : 0xaa00ff  } );
  // Create the final object to add to the scene
  var splineObject = new THREE.Line( geometry, material );
	splineObject.frustumCulled = false


  var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 50, 50),
    new THREE.MeshBasicMaterial({
      color: 'red',
    })
  )
  
  
  sphere.position.set(points[0].x, points[0].y, points[0].z)

  var group = new THREE.Group();
	group.add( splineObject );
  group.add( sphere );
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

  let index = 0
  // var tweenpos= sphere.position.clone().add(points[index+1].clone().sub(points[index]))
  var tweenpos= points[index+1].clone()
  var tween = new TWEEN.Tween(sphere.position.clone())
                      .to(tweenpos,1000)
                      .easing(TWEEN.Easing.Cubic.InOut)
                      .onUpdate(function(){sphere.position.set(this.x,  this.y,this.z);})
                      .onComplete(tweenComplete)
                      .start();

  function tweenComplete() {
    if((index+1)< points.length - 1) {
      index++
    }
    tweenpos= points[index+1].clone()
    // tweenpos= sphere.position.clone().add(points[index+1].clone().sub(points[index]))
    tween = new TWEEN.Tween(sphere.position.clone())
                      .to(tweenpos,1000)
                      .easing(TWEEN.Easing.Cubic.InOut)
                      .onUpdate(function(){sphere.position.set(this.x,  this.y,this.z);})
                      .onComplete(tweenComplete)
                      .start();
  }


  render();
  
  function render() {

  	trackballControls.update(clock.getDelta());
  	stats.update();
    TWEEN.update()

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

}