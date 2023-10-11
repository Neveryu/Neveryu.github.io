import * as THREE from '../libs/three/build/three.module.js';
import Stats from '../libs/three/examples/jsm/libs/stats.module.js';
import { GUI } from '../libs/three/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from '../libs/three/examples/jsm/controls/OrbitControls.js';
import { Line2 } from '../libs/three/examples/jsm/lines/Line2.js';
import { LineMaterial } from '../libs/three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from '../libs/three/examples/jsm/lines/LineGeometry.js';
import { GeometryUtils } from '../libs/three/examples/jsm/utils/GeometryUtils.js';

var scene, fatLine, matLine, matLineBasic, matLineDashed, colorLine, sColorLine
let stats, gui

export function updatePartLine2() {
  fatLine.geometry.attributes.instanceStart.setY(1, 50);
  fatLine.geometry.attributes.instanceEnd.setY(1, 50);
  fatLine.geometry.attributes.instanceStart.needsUpdate = true
  fatLine.geometry.attributes.instanceEnd.needsUpdate = true
}

export function updateLine2() {
  // 传多了也没用
  let points2 = [
    -100,100,0,
    -100,0,0,
    0,100,0,
    100,0,0,
    100,100,0,
    150,0,0,
    200,0,0
  ]
  fatLine.geometry.setPositions(points2);
}

export function customUpdateLine() {
  fatLine.geometry.dispose()
  let newPositions = [
    -100,100,0,
    -100,0,0,
    0,100,0,
    100,0,0,
    100,100,0,
    150,0,0,
    200,0,0
   ]
  fatLine.geometry = new LineGeometry().setPositions(newPositions)
}

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

  // 场景，灯光，背景plane结束



  // 【使用重写的LineMaterial】默认创建line使用的是LineBasicMaterial
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
  fatLine = new Line2( geometry1, material1 );

  /**
   * 在three.js中，对于使用Line2创建的线条，可以使用computeLineDistances方法来计算线条上每个顶点之间的距离，并将结果存储在Line2对象的lineDistances属性中。
   * computeLineDistances方法的作用是为了方便地获取线条上每个顶点之间的距离，以便进行一些相关的计算或操作。例如，可以通过lineDistances属性来实现线条上的虚线效果，也可以通过计算线条上两个点之间的距离来判断是否需要对线条进行细分。
   * 具体地说，computeLineDistances方法会计算出每个顶点到线条起点的距离，并将这些距离存储在lineDistances属性中。lineDistances属性是一个Float32Array类型的数组，它的长度等于线条顶点数减一，即线条上相邻两个顶点之间的距离数目。
   * 需要注意的是，computeLineDistances方法只对Line2对象有效，对其他几何体类型（如Line、LineSegments等）没有影响。
   */
  fatLine.computeLineDistances();
  fatLine.scale.set( 1, 1, 1 ); // 缩放、伸缩变形

  var group = new THREE.Group();
  group.add(fatLine)
  scene.add(group);

  // setTimeout(function() {
  //   let points2 = [
  //     -100,100,0,
  //     -100,0,0,
  //     0,100,0,
  //     100,0,0,
  //     100,100,0,
  //     150,0,0,
  //     200,0,0
  //   ]
  //   geometry1.setPositions(points2);

  //   // geometry1.attributes.instanceEnd.setY(1, 50);
  //   // geometry1.attributes.instanceStart.setY(0, 50);
  //   // geometry1.attributes.instanceStart.needsUpdate = true
  //   // geometry1.attributes.instanceEnd.needsUpdate = true

  //   console.log('-----')
  // }, 3000)

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



