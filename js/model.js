import * as THREE from './three.module.js';
import {
    GLTFLoader
} from './GLTFLoader.js';


let canvas, renderer;

const scenes = [];

var name, id, html;
let posX, posY, posZ, sx, sy, sz;
var loader = new GLTFLoader();

//Função que insere e carrega os modulos no html. 
//Nome - nome do modelo, idC - id do canvas
//id - id do elemento html onde o modelo será inserido
//html - elemento html do Modelo, posXYZ - posição relativamente à cam.
function init(nome, idC, id, html, posX, posY, posZ, sx, sy, sz) {

    //busca da canvas onde serão desenhados os modelos.
    canvas = document.getElementById(idC);

    //busca do elemento html onde queremos inserir os modelos.
    const content = document.getElementById(id);

    const scene = new THREE.Scene();

    //Carregamento do modelo
    loader.load("models/" + nome + ".gltf", function (gltf) {
        var obj = gltf.scene;
        obj.position.set(posX, posY, posZ);
        obj.scale.set(sx, sy, sz);
        scene.add(obj);
    });

    //Criação do elemento html do Modelo e criação do nome da classe para css
    const element = document.createElement(html);
    element.className = nome;


    // the element that represents the area we want to render the scene
    scene.userData.element = element;
    content.appendChild(element);

    const camera = new THREE.PerspectiveCamera(43, window.innerWidth / window.innerHeight, .01, 5000);
    camera.position.z = 2;
    scene.userData.camera = camera;

    const light = new THREE.HemisphereLight(0xffffff, 2);
    light.position.set(0, 1, 100);
    scene.add(light);

    scenes.push(scene);


    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true
    });
    renderer.setClearColor(0xffffff, 0);

}

function updateSize() {

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width || canvas.height !== height) {

        renderer.setSize(width, height, false);

    }

}

function animate() {

    render();
    requestAnimationFrame(animate);

}

function render() {

    updateSize();

    renderer.setClearColor(0xffffff);
    renderer.setScissorTest(false);
    renderer.clear();

    renderer.setClearColor(0xfffffff, 0);
    renderer.setScissorTest(true);

    scenes.forEach(function (scene) {

        // get the element that is a place holder for where we want to
        // draw the scene
        const element = scene.userData.element;

        // get its position relative to the page's viewport
        const rect = element.getBoundingClientRect();

        // check if it's offscreen. If so skip it
        if (rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
            rect.right < 0 || rect.left > renderer.domElement.clientWidth) {

            return; // it's off screen

        }

        // set the viewport
        const width = rect.right - rect.left;
        const height = rect.bottom - rect.top;
        const left = rect.left;
        const bottom = renderer.domElement.clientHeight - rect.bottom;

        renderer.setViewport(left, bottom, width, height);
        renderer.setScissor(left, bottom, width, height);

        const camera = scene.userData.camera;

        //camera.aspect = width / height; // not changing in this example
        //camera.updateProjectionMatrix();

        //scene.userData.controls.update();

        renderer.render(scene, camera);

    });

}

init('Aba', 'c', 'div1', 'div', 0, 0.5, 0, 1, 1, 1);
init('Joy', 'c1', 'div1', 'div', 0, 0.5, 0, 1, 1, 1);
animate();
