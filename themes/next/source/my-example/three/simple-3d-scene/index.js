import * as THREE from '../libs/three/build/three.module.js';
import Stats from '../libs/three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from '../libs/three/examples/jsm/controls/OrbitControls.js';

var scene, stats

export function init() {
  stats = new Stats();
  document.body.appendChild( stats.dom );

  var props = (typeof additionalProperties !== 'undefined' && additionalProperties) ? additionalProperties : { antialias: true }
  var renderer = new THREE.WebGLRenderer(props);
  renderer.shadowMap.enabled = true;
  renderer.shadowMapSoft = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setClearColor(new THREE.Color(0xffffff));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
	
	
  var cameraposition =  new THREE.Vector3(0, 0, 20);
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.copy(cameraposition);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  scene = new THREE.Scene();

  const textureLoader = new THREE.TextureLoader();

  const skyboxGeometry = new THREE.BoxGeometry(400, 400, 400);
  const skyboxMaterials = [
    new THREE.MeshBasicMaterial({ map: textureLoader.load('../assets/skybox/rt.png'), side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load('../assets/skybox/lf.png'), side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load('../assets/skybox/up.png'), side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load('../assets/skybox/dn.png'), side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load('../assets/skybox/bk.png'), side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load('../assets/skybox/ft.png'), side: THREE.DoubleSide }),
  ];
  const skyboxMesh = new THREE.Mesh(skyboxGeometry, skyboxMaterials);
  skyboxMesh.name = 'skyboxMesh';
  scene.add(skyboxMesh);

  // const boxTexture = textureLoader.load('../assets/textures/uv/ash_uvgrid01.jpg');
  const boxTexture = textureLoader.load('../assets/textures/earth/Earth.png');
  const boxGeometry = new THREE.SphereGeometry( 1, 35, 35 );
  const meshBasicMaterial = new THREE.MeshBasicMaterial({ map: boxTexture, side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(boxGeometry, meshBasicMaterial);
  mesh.name = 'box';
  scene.add(mesh);

  // add the output of the renderer to the html element
  document.getElementById("webgl-output").appendChild(renderer.domElement);

	let controls = new OrbitControls( camera, renderer.domElement );
  controls.minDistance = 2; //你能够将相机向内移动多少（仅适用于PerspectiveCamera），其默认值为0。
  controls.maxDistance = 200; //你能够将相机向外移动多少（仅适用于PerspectiveCamera），其默认值为Infinity。

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

    renderer.clearDepth(); // important!

    const skyboxMesh = scene.getObjectByName('skyboxMesh');
    if(skyboxMesh) {
      skyboxMesh.rotation.y += 0.001;
    }
        
    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}




