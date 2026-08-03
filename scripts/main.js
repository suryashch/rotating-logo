import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { Line2 } from 'three/addons/lines/Line2.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene()

const mainGroup = new THREE.Group();
const sGroup = new THREE.Group();

const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 0.1, 1000 );
scene.add( camera );
camera.zoom = 15;
camera.updateProjectionMatrix();

camera.position.set(25,0,0);

scene.add(camera);

const cameraPoses = {
  home: new THREE.Vector3(25,25,25),
  angle: new THREE.Vector3(25, 0, 0)
};

let targetPosition = cameraPoses.angle.clone();

function moveCamera( presetName ) {
    targetPosition.copy(cameraPoses[presetName]);
}

const controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = true;
controls.minDistance=0.1;
controls.maxDistance=150;
controls.minPolarAngle=0;
controls.maxPolarAngle=3;
controls.autoRotate=false;
controls.target = new THREE.Vector3(0, 0, 0);
controls.rotateSpeed = 0.15;
controls.zoomSpeed = 0.50;
controls.panSpeed = 0.50;
controls.update();

const ambientLight = new THREE.AmbientLight();
scene.add( ambientLight );


// Making the Q
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "#E97132" });

const cuboidGeom = new THREE.BoxGeometry(9, 1, 1);
const cuboidMesh = new THREE.Mesh( cuboidGeom, cubeMaterial );
cuboidMesh.position.set(5, 0 , 2);

const edgeGeom = new THREE.EdgesGeometry( cuboidGeom );
const cuboidLine = new THREE.LineSegments( edgeGeom, new THREE.MeshBasicMaterial({ color: "#9f9d9c"}) );
cuboidLine.position.set(5, 0 , 2);

mainGroup.add(cuboidLine);
mainGroup.add(cuboidMesh);

const cuboidGeom_2 = new THREE.BoxGeometry(9, 1, 1);
const cuboidMesh_2 = new THREE.Mesh( cuboidGeom_2, cubeMaterial );
cuboidMesh_2.position.set(17, 5 , -7);
const rad45 = THREE.MathUtils.degToRad(45)

cuboidMesh_2.rotation.x = 0;
cuboidMesh_2.rotation.y = - rad45;
cuboidMesh_2.rotation.z = rad45;

const edgeGeom_2 = new THREE.EdgesGeometry( cuboidGeom_2 );
const cuboidLine_2 = new THREE.LineSegments( edgeGeom_2, new THREE.MeshBasicMaterial({ color: "#ca632b"}) );
cuboidLine_2.position.set(5, 0, 2);

const positions = [
    10, 0, 4, 
    10, 0,12, 
     0, 0,12,
     0,10,12,
     0,10, 2, 
    10,10, 2, 
    10, 2, 2
]

const geometry = new LineGeometry();
geometry.setPositions( positions );

const matLine = new LineMaterial( {
    color: 0xb3b3b3,
    linewidth: 5,
    dashed: false
} );

const line = new Line2( geometry, matLine );
line.scale.set( 1, 1, 1 );

mainGroup.add(line);

const positions_2 = [
    10,10, 2, 
    10,10,12,  
    10, 0,12, 
]

const positions_3 = [
     0,10,12, 
    10,10,12, 
]

const geometry_2 = new LineGeometry();
geometry_2.setPositions( positions_2 );

const geometry_3 = new LineGeometry();
geometry_3.setPositions( positions_3 );

const matLine_2 = new LineMaterial( {
    color: "#727272",
    linewidth: 1,
    dashed: true,
    alphaToCoverage: true
} );

const line_2 = new Line2( geometry_2, matLine_2 );
line_2.scale.set( 1, 1, 1 );

mainGroup.add(line_2);

const line_3 = new Line2( geometry_3, matLine_2 );
line_3.scale.set( 1, 1, 1 );

mainGroup.add(line_3);

const positions_accent = [
     2, 0, 2, 
    10, 0, 2
];

const geometry_accent = new LineGeometry();
geometry_accent.setPositions( positions_accent );
const matLine_accent = new LineMaterial( {
    color: 0xE97132,
    linewidth: 8,
    alphaToCoverage: true,
} );

const line_accent = new Line2( geometry_accent, matLine_accent );
line_accent.scale.set( 1, 1, 1 );



// Making the S
const positions_S_bot = [
    12, 0, -2,
    22, 0, -2, 
    22, 0,-12,
    14, 0,-12
]

const geometry_S_bot = new LineGeometry();
geometry_S_bot.setPositions( positions_S_bot );

const line_S_bot = new Line2( geometry_S_bot, matLine )
sGroup.add(line_S_bot);

const positions_S_top = [
    20,10, -2,
    12,10, -2,
    12,10,-12,
    22,10,-12
]

const geometry_S_top = new LineGeometry();
geometry_S_top.setPositions( positions_S_top );

const line_S_top = new Line2( geometry_S_top, matLine )
sGroup.add(line_S_top);



const positions_S_connect = [
    13, 1,-11,
    21, 9, -3
]

const geometry_S_connect = new LineGeometry();
geometry_S_connect.setPositions( positions_S_connect );

const line_S_connect = new Line2( geometry_S_connect, matLine_accent )
sGroup.add(line_S_connect);


const positions_S_light = [
    22,10, -12,
    22,10, -4
]

const geometry_S_light = new LineGeometry();
geometry_S_light.setPositions( positions_S_light );

const line_S_light = new Line2( geometry_S_light, matLine_2 )
sGroup.add(line_S_light);

const positions_S_light_2 = [
    12, 0, -2,
    12, 0, -10,
]

const geometry_S_light_2 = new LineGeometry();
geometry_S_light_2.setPositions( positions_S_light_2 );

const line_S_light_2 = new Line2( geometry_S_light_2, matLine_2 );
sGroup.add(line_S_light_2);

mainGroup.position.set(-5, -5, -1);
scene.add(mainGroup);

sGroup.position.set(-5, -5, 1)
scene.add(sGroup);


let currentFrame = 0
let defaultPosition = true;

animate();

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    camera.position.lerp(targetPosition, 0.035);
    // Check if we are close enough to just snap into place
    if (camera.position.distanceToSquared(targetPosition) < 0.05) {
        camera.position.copy(targetPosition);
    }
    
    renderer.render( scene, camera );

    currentFrame++;

    const lightness = Math.max(0.5, Math.sin(currentFrame * 0.010));
    line_accent.material.color.setHSL(0.055, 1, lightness);
    cuboidMesh.material.color.setHSL(0.055, 1, lightness);
    

    if ( currentFrame % 500 === 0) {
        
        if (!defaultPosition) {
            targetPosition = cameraPoses.angle.clone();
        } else {
            targetPosition = cameraPoses.home.clone();
        }

        defaultPosition = !defaultPosition;
    }
}