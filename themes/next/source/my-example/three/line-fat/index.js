import * as THREE from '../libs/three/build/three.module.js';
import Stats from '../libs/three/examples/jsm/libs/stats.module.js';
import { GUI } from '../libs/three/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from '../libs/three/examples/jsm/controls/OrbitControls.js';
import { Line2 } from '../libs/three/examples/jsm/lines/Line2.js';
import { LineMaterial } from '../libs/three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from '../libs/three/examples/jsm/lines/LineGeometry.js';
import { GeometryUtils } from '../libs/three/examples/jsm/utils/GeometryUtils.js';

var scene, matLine, matLineBasic, matLineDashed, colorLine, sColorLine
let stats, gui

export function init() {

  stats = new Stats();
  document.body.appendChild( stats.dom );

  var props = (typeof additionalProperties !== 'undefined' && additionalProperties) ? additionalProperties : {};
  var renderer = new THREE.WebGLRenderer(props);
  renderer.shadowMap.enabled = true;
  renderer.shadowMapSoft = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.getElementById("webgl-output").appendChild(renderer.domElement);

	
	
  var cameraposition =  new THREE.Vector3(-30, 200, 330);
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.copy(cameraposition);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  scene = new THREE.Scene();

  // create the ground plane
  var textureGrass = new THREE.TextureLoader().load("../assets/textures/ground/grasslight-big.jpg");
  textureGrass.wrapS = THREE.RepeatWrapping;
  textureGrass.wrapT = THREE.RepeatWrapping;
  textureGrass.repeat.set(10, 10);

  var planeGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 20, 20);
  var planeMaterial = new THREE.MeshLambertMaterial({
    map: textureGrass
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


  // 【使用原生的LineBasicMaterial】
  var curve = new THREE.SplineCurve3( [
    new THREE.Vector3( -10, 0, 0 ),
    new THREE.Vector3( -5, 10, 5 ),
    new THREE.Vector3( 0, 5, 0 ),
    new THREE.Vector3( 5, 0, 5 ),
    new THREE.Vector3( 5, 20, 10 ),
    new THREE.Vector3( 10, 20, 0 ),
    new THREE.Vector3( 10, 50, 10 ),
    new THREE.Vector3( 10, 0, 20 ),
    new THREE.Vector3( 30, 5, 10 ),
    new THREE.Vector3( 30, 0, 50 ),
  ] );
  var points = curve.getPoints( 50 );
  let line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints( points ),
    new THREE.LineBasicMaterial({
      opacity: 1.0,
      linewidth: 1,
      color: 0x18ffff
    })
  )
  line.position.set(-50, 1, -50)
  line.frustumCulled = true

  // 【使用重写的LineMaterial】
  let points1 = [
    -100,0,0,
    -100,100,0,
    0,0,0,
    100,100,0,
    100,0,0,
  ]
  var geometry1 = new LineGeometry()
  geometry1.setPositions(points1);
  var material1  = new LineMaterial( {
    color: 0xdd2222,
    // 线宽度
    linewidth: 5,
  } );
  material1.resolution.set(window.innerWidth,window.innerHeight);
  // 阅读/examples/js/lines目录下的文件，
  // 可以看出来Line2的基类是LineSegments2，LineSegments2的基类是Mesh，
  // Line2和LineSegments2本质上都是一个网格模型，你可以把代码中THREE.Line2替换为THREE.Mesh，显示效果是一样的。
  var fatLine = new THREE.Mesh( geometry1, material1 );

  // 【另一种更牛逼的实现】
  var positions3 = [];
  var colors3 = [];

  var points3 = GeometryUtils.hilbert3D( new THREE.Vector3( 20, 20, 20 ), 20.0, 1, 0, 1, 2, 3, 4, 5, 6, 7 );
  var spline3 = new THREE.CatmullRomCurve3( points3 );
  var divisions3 = Math.round( 12 * points.length );
  var point3 = new THREE.Vector3();
  var color3 = new THREE.Color();

  for ( var i = 0, l = divisions3; i < l; i ++ ) {
    var t = i / l;
    spline3.getPoint( t, point3 );
    positions3.push( point3.x, point3.y, point3.z );
    color3.setHSL( t, 1.0, 0.5 );
    colors3.push( color3.r, color3.g, color3.b );
  }
  var geometry3 = new LineGeometry();
  geometry3.setPositions( positions3 );
  geometry3.setColors( colors3 );

  matLine = new LineMaterial( {
    color: 0xffffff,
    linewidth: 5, // in pixels
    vertexColors: true,
    //resolution:  // to be set by renderer, eventually
    dashed: false
  });
  // renderer will set this eventually
  matLine.resolution.set( window.innerWidth, window.innerHeight ); // resolution of the viewport

  // 阅读/examples/js/lines目录下的文件，
  // 可以看出来Line2的基类是LineSegments2，LineSegments2的基类是Mesh，
  // Line2和LineSegments2本质上都是一个网格模型，你可以把代码中THREE.Line2替换为THREE.Mesh，显示效果是一样的。
  colorLine = new Line2( geometry3, matLine );
  colorLine.computeLineDistances();
  colorLine.scale.set( 1, 1, 1 );
  colorLine.position.set(10, 0, 30)


  var geo = new THREE.BufferGeometry();
  geo.setAttribute( 'position', new THREE.Float32BufferAttribute( positions3, 3 ) );
  geo.setAttribute( 'color', new THREE.Float32BufferAttribute( colors3, 3 ) );

  matLineBasic = new THREE.LineBasicMaterial( { vertexColors: true } );
  matLineDashed = new THREE.LineDashedMaterial( { vertexColors: true, scale: 2, dashSize: 1, gapSize: 1 } );

  sColorLine = new THREE.Line( geo, matLineBasic );
  sColorLine.computeLineDistances();
  sColorLine.visible = false;
  sColorLine.position.set(-20, 0, 40)
  



  var group = new THREE.Group();
	group.add(fatLine).add(line).add(colorLine).add(sColorLine);
  scene.add(group);

  // add the output of the renderer to the html element
  document.getElementById("webgl-output").appendChild(renderer.domElement);

  let controls = new OrbitControls( camera, renderer.domElement );
  controls.minDistance = 10;
  controls.maxDistance = 500;

  window.addEventListener( 'resize', onWindowResize, false );
  onWindowResize();
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }


  initGui();

  render();
  function render() {
    stats.update();

    renderer.setClearColor( 0x222222, 1 );

    renderer.clearDepth(); // important!

    renderer.setScissorTest( true );

    renderer.setScissor( 20, 20, window.innerWidth, window.innerHeight );

    renderer.setViewport( 20, 20, window.innerWidth, window.innerHeight );
        
    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}


function initGui() {
  gui = new GUI();

  var param = {
    'line type': 0,
    'width (px)': 5,
    'dashed': false,
    'dash scale': 1,
    'dash / gap': 1
  };

  gui.add(param, 'line type', { '粗线条': 0, '不可设宽度': 1 } ).onChange( function ( val ) {
    switch ( val ) {
      case '0':
        colorLine.visible = true;
        sColorLine.visible = false;
        break;
      case '1':
        colorLine.visible = false;
        sColorLine.visible = true;
        break;
    }
  });

  gui.add( param, 'width (px)', 1, 10 ).onChange( function ( val ) {
    matLine.linewidth = val;
  });

  gui.add( param, 'dashed' ).onChange( function ( val ) {
    matLine.dashed = val;
    // dashed is implemented as a defines -- not as a uniform. this could be changed.
    // ... or THREE.LineDashedMaterial could be implemented as a separate material
    // temporary hack - renderer should do this eventually
    if ( val ) matLine.defines.USE_DASH = ""; else delete matLine.defines.USE_DASH;
    matLine.needsUpdate = true;
    sColorLine.material = val ? matLineDashed : matLineBasic;
  });

  gui.add( param, 'dash scale', 0.5, 2, 0.1 ).onChange( function ( val ) {
    matLine.dashScale = val;
    matLineDashed.scale = val;
  });

  gui.add( param, 'dash / gap', { '2 : 1': 0, '1 : 1': 1, '1 : 2': 2 } ).onChange( function ( val ) {
    switch ( val ) {
      case '0':
        matLine.dashSize = 2;
        matLine.gapSize = 1;
        matLineDashed.dashSize = 2;
        matLineDashed.gapSize = 1;
        break;
      case '1':
        matLine.dashSize = 1;
        matLine.gapSize = 1;
        matLineDashed.dashSize = 1;
        matLineDashed.gapSize = 1;
        break;
      case '2':
        matLine.dashSize = 1;
        matLine.gapSize = 2;
        matLineDashed.dashSize = 1;
        matLineDashed.gapSize = 2;
        break;
    }
  });

  var controls = new function () {
    this.outputObjects = function () {
      console.log(scene.children);
    }
  };
  gui.add(controls, 'outputObjects');
}
