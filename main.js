import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 95, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(100);

renderer.render( scene, camera )

//torus
const torusGeometry = new THREE.TorusGeometry(20, 4.5, 26, 100)
const torusMaterial = new THREE.MeshStandardMaterial({color: 0xffffff})
const torus = new THREE.Mesh(torusGeometry, torusMaterial)
scene.add(torus)

torus.position.y = 25

//heart
const x = 0, y = 0;

const heartShape = new THREE.Shape();

heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

const heartGeometry = new THREE.ShapeGeometry( heartShape );
var flip = new THREE.Matrix4().makeScale(1,-1,1);
const heartMaterial = new THREE.MeshBasicMaterial( { color: '#ff0000' } );
const heart = new THREE.Mesh( heartGeometry, heartMaterial ) ;
heart.applyMatrix4(flip)
scene.add( heart );

heart.position.y = 33
heart.position.x = -5

//heart2

const heartShape2 = new THREE.Shape();

heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

const heartGeometry2 = new THREE.ShapeGeometry( heartShape );
var flip = new THREE.Matrix4().makeScale(1,-1,-1);
const heartMaterial2 = new THREE.MeshBasicMaterial( { color: '#ff0000' } );
const heart2 = new THREE.Mesh( heartGeometry2, heartMaterial2 ) ;
heart2.applyMatrix4(flip)
scene.add( heart2 );

heart2.position.y = 33
heart2.position.x = -5



//lighting
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(0,12,20)
scene.add(pointLight)

//lighting helper
//const lightHelper = new THREE.PointLightHelper(pointLight)
//scene.add(lightHelper)

//grid helper
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(gridHelper)

//moon
const moonTexture = new THREE.TextureLoader().load('/images/moon.jpeg')
const normalTexture = new THREE.TextureLoader().load('/images/normal.jpg')

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(5, 32, 32),
    new THREE.MeshStandardMaterial( {
        map: moonTexture,
        normalMap: normalTexture
    } )
);
torus.add(moon)

moon.position.y = 60
moon.position.setX(-80)

const nightTexture = new THREE.TextureLoader().load('/images/nightSky.jpg');
scene.background = nightTexture;

//snow
let particles; //snowflakes
let positions = []; //snowflake positions(x, y, z) and velocities(x, y, z)

const numSnowFlakes = 55000;//amount of snowflakes

const maxRange = 2000, minRange = maxRange/2;//snowflakes placed from -500 to 500 x & z axis
const minHeight = 150;//snowflakes on 150 to 500 on y axis

const snowFlakeGeometry = new THREE.BufferGeometry();

const textureLoader = new THREE.TextureLoader();

addSnowflakes();
function addSnowflakes() {
    //create snowflake geometry
    for(let i=0 ; i < numSnowFlakes; i++) {
        positions.push(
            Math.floor(Math.random() * maxRange - minRange), //x -500 to 500
            Math.floor(Math.random() * maxRange + -200), //y 250 to 750
            Math.floor(Math.random() * maxRange - 600)) //x -500 to 500
    }
}

//each attribute has an array of values

snowFlakeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

const flakeMaterial = new THREE.PointsMaterial({
    size: 3,
    map: textureLoader.load('/images/snowflake.png'),
    blending: THREE.AdditiveBlending, // add rgb values when combining 2 colors
    depthTest: false, // determines if one object is in front of another
    transparent: true, // enables opacity changes to work
    opacity: 0.7,
});

particles = new THREE.Points(snowFlakeGeometry, flakeMaterial);

scene.add(particles)



//controls
const controls = new OrbitControls(camera, renderer.domElement);

//move camera
function moveCamera() {
const t = document.body.getBoundingClientRect().top

camera.position.z = t + 100
camera.position.x = t + 1 * -0.0002
camera.position.y = t * -0.0002 + 1

}
document.body.onscroll = moveCamera


//animate
function animate() {
    requestAnimationFrame( animate );
    //torus rotate
    //  torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
    //  torus.rotation.z += 0.01;

      //moon rotate
      moon.rotateY(0.004)


    controls.update();

    //addSnowFlakes()
    //updateParticles(); // update position of snowflakes//Bugged

    renderer.render( scene, camera)


}
animate() 