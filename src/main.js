import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as lilGui from "lil-gui";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  45, // Field of View
  window.innerWidth / window.innerHeight, // Aspect Ratio
  0.1, // Near
  1000 // Far
);

// Initial position of the camera
// camera.position.z = 5;
// scene.add(camera);

// ctor3 {x: -3.8872917243461753, y: 2.5050869538172846, z: 2.9049935253861863}
// main.js:62 _Euler {isEuler: true, _x: -0.07648303921553071, _y: -0.8175814419392743, _z: -0.0558448163455325, _order: 'XYZ', …}

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Orbit Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
camera.position.set(-3.88, 2.5, 2.9);
// camera.rotation.set(-0.07, -0.81, -0.05);
const euler = new THREE.Euler(-0.07, -0.81, -0.05);
const quaternion = new THREE.Quaternion().setFromEuler(euler);
const forward = new THREE.Vector3(0, 0, -1);
const direction = forward.applyQuaternion(quaternion);
const distance = 1; // Adjust this as needed

// Calculate the lookAt point
const lookAtPoint = new THREE.Vector3(camera.position)
  .copy(camera.position)
  .add(direction.multiplyScalar(distance));

// Set the camera to look at the calculated point
camera.lookAt(lookAtPoint);

// Set the OrbitControls target to the same point
controls.target.copy(lookAtPoint);

let position = 0;

// gltf Loader
const gltfLoader = new GLTFLoader();

gltfLoader.load(" ./model/drawing-room/scene.gltf", (gltf) => {
  console.log("Our model here!", gltf);
  const model = gltf.scene;
  scene.add(model);

  // window.addEventListener("mouseup", function () {
  //   console.log(camera.position);
  //   console.log(camera.rotation);
  // });

  window.addEventListener("mouseup", function () {
    switch (position) {
      case 0:
        cameraMovement(-3.15, 2.43, 3.21);
        cameraRotation(0.01, 0, 0);
        // cameraMovement(-6.0, 1.72, 1.34);
        // cameraRotation(-2.75, -1.24, -2.77);
        position = 1;
        break;

      case 1:
        cameraMovement(-3.17, 2.41, 2.24);
        cameraRotation(0.93, -0.44, 0.52);
        position = 2;
        break;

      // case 2:
      //   cameraMovement(-1.64, 4.28, -1.56);
      //   cameraRotation(-2.71, -0.68, -2.86);

      //   position = 3;
      //   break;

      // case 2:
      //   cameraMovement(1.29, 3.63, -1.89);
      //   cameraRotation(-2.74, 0.47, 2.94);

      //   position = 3;
      //   break;

      case 2:
        cameraMovement(-1.34, 2.43, 0.46);
        cameraRotation(3.13, 0.8, -3.13);
        position = 3;
        break;

      case 3:
        cameraMovement(3.44, 2.39, -4.13);
        cameraRotation(3.13, 0.8, -3.13);
        position = 4;
        break;

      case 4:
        cameraMovement(-3.88, 2.5, 2.9);
        cameraRotation(-0.07, -0.81, -0.05);
        position = 0;
    }
  });

  // GUI Configurator
  //   const gui = new lilGui.GUI();
  //   // add the camera to the GUI
  //   gui
  //     .add(model.position, "x")
  //     .min(-100)
  //     .max(100)
  //     .step(0.001)
  //     .name("Model X Axis Position");
  //   gui
  //     .add(model.position, "y")
  //     .min(-100)
  //     .max(100)
  //     .step(0.001)
  //     .name("Model Y Axis Position");
  //   gui
  //     .add(model.position, "z")
  //     .min(-100)
  //     .max(100)
  //     .step(0.001)
  //     .name("Model Z Axis Position");
});

// Functions to move and rotate the camera
function cameraMovement(x, y, z) {
  gsap.to(camera.position, {
    x,
    y,
    z,
    duration: 3,
  });
}

function cameraRotation(x, y, z) {
  gsap.to(camera.rotation, {
    x,
    y,
    z,
    duration: 3,
  });
}

// Animation and loop
const animate = () => {
  renderer.render(scene, camera);

  // window.requestAnimationFrame(animate);
  // controls.update();
};

renderer.setAnimationLoop(animate); // this is the same as requestAnimationFrame(animate). It will call the animate function over and over again on every frame.

animate();
