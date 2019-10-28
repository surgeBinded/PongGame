//* Initialize webGL with camera and lights
const canvas1 = document.getElementById("mycanvas1");
const canvas = document.getElementById("mycanvas");

const renderer1 = new THREE.WebGLRenderer({ canvas: canvas1 });
renderer1.setClearColor('white');

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setClearColor('white');

// create scene and cameras
const scene = new THREE.Scene();

const camera1 = new THREE.PerspectiveCamera(-90, canvas1.width / canvas1.height, 0.1, 1000);
camera1.position.set(0, 25, 10);
camera1.lookAt(scene.position);

const camera = new THREE.PerspectiveCamera(90, canvas.width / canvas.height, 0.1, 1000);
camera.position.set(0, -25, 10);
camera.lookAt(scene.position);

const ambientLight = new THREE.AmbientLight(0x909090);
scene.add(ambientLight);
const light = new THREE.DirectionalLight(0x444444);
light.position.set(1.5, 1, 1);
scene.add(light);

// game mode parameter 
let multiPlayer = window.confirm("Press Ok for Single playere and Cancel for multiplayer");

//creating board
const pongBoard = new THREE.Object3D();
// pongBoard.rotation.x = formula;

let planeGeometry = new THREE.BoxGeometry(30, 21, .1);
let planeMaterial = new THREE.MeshPhongMaterial({ color: "#2ecc71", side: THREE.DoubleSide });
let plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.z = -0.5;

// the white line
let lineGeometry = new THREE.BoxGeometry(.5, 21, .1);
let lineMaterial = new THREE.MeshPhongMaterial({ color: "#fff", side: THREE.DoubleSide });
let line = new THREE.Mesh(lineGeometry, lineMaterial);
line.position.z = -0.4;

// creating coushons
// red coushon
const redCoushonGeometry = new THREE.BoxGeometry(0.1, 3, 1);
const redCoushonMaterial = new THREE.MeshPhongMaterial({ color: "red" });
const redCoushon = new THREE.Mesh(redCoushonGeometry, redCoushonMaterial);
redCoushon.position.x = 15;
redCoushonBoxHelper = new THREE.BoxHelper(redCoushon, "red");
const redCoushonBBox = new THREE.Box3();
redCoushonBBox.setFromObject(redCoushonBoxHelper);

// blue coushon
const blueCoushonGeometry = new THREE.BoxGeometry(0.1, 3, 1);
const blueCoushonMaterial = new THREE.MeshPhongMaterial({ color: "blue" });
const blueCoushon = new THREE.Mesh(blueCoushonGeometry, blueCoushonMaterial);
blueCoushon.position.x = -15;
blueCoushonBoxHelper = new THREE.BoxHelper(blueCoushon, "red");
const blueCoushonBBox = new THREE.Box3();
blueCoushonBBox.setFromObject(blueCoushonBoxHelper);

// creating field boundaries
const upperBorderGeometry = new THREE.BoxGeometry(30, 1, 1);
const upperBorderMaterial = new THREE.MeshPhongMaterial({ color: "#055223" });
const upperBorder = new THREE.Mesh(upperBorderGeometry, upperBorderMaterial);
upperBorder.position.y = 10;
const upperBorderBoxHelper = new THREE.BoxHelper(upperBorder, "red");
const upperBorderBBox = new THREE.Box3();
upperBorderBBox.setFromObject(upperBorderBoxHelper);

const lowerBorderGeometry = new THREE.BoxGeometry(30, 1, 1);
const lowerBorderMaterial = new THREE.MeshPhongMaterial({ color: "#055223" });
const lowerBorder = new THREE.Mesh(lowerBorderGeometry, lowerBorderMaterial);
lowerBorder.position.y = -10;
const lowerBorderBoxHelper = new THREE.BoxHelper(lowerBorder, "red");
const lowerBorderBBox = new THREE.Box3();
lowerBorderBBox.setFromObject(lowerBorderBoxHelper);

// for single player mode 
const leftBorderGeometry = new THREE.BoxGeometry(1, 20, 1);
const leftBorderMaterial = new THREE.MeshPhongMaterial({ color: "#055223" });
const leftBorder = new THREE.Mesh(leftBorderGeometry, leftBorderMaterial);
leftBorder.position.x = -15;
const leftBorderBoxHelper = new THREE.BoxHelper(leftBorder, "red");
const leftBorderBBox = new THREE.Box3();
leftBorderBBox.setFromObject(leftBorderBoxHelper);

// defining the ball
const ballGeometry = new THREE.SphereGeometry(.3, 32, 32);
const ballMaterial = new THREE.MeshPhongMaterial({ color: "#f1c40f" });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
const ballBoxHelper = new THREE.BoxHelper(ball, "red");
const ballBBox = new THREE.Box3();
ballBBox.setFromObject(ballBoxHelper);

const axes = new THREE.AxesHelper();

// adding components to the canvas
if (multiPlayer) {
    pongBoard.add(leftBorder);
} else {
    pongBoard.add(blueCoushon);
}

pongBoard.add(redCoushon);
pongBoard.add(upperBorder);
pongBoard.add(lowerBorder);
pongBoard.add(ball);
pongBoard.add(plane);
pongBoard.add(line);
scene.add(pongBoard);

pongBoard.rotation.z = Math.PI / -2;
