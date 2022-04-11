import React, { useEffect} from 'react';
import * as Dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import groguGLB from './scene.glb' 



export function Threejs(){

    useEffect(()=>{
        var grogu;
        var groguMesh;
     
        var scene = new THREE.Scene();
        // scene.background = new THREE.Color( 0xFFFFFF );

        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        var renderer = new THREE.WebGLRenderer();

        renderer.setSize( window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(devicePixelRatio);
        document.body.appendChild(renderer.domElement);

        const loader = new GLTFLoader();   
        loader.load(groguGLB, (gltf) => {
            grogu = gltf.scene.children[0];
            groguMesh = gltf.scene;
           
            grogu.position.set(-1, 1.9, -4.45);
            scene.add(groguMesh)
          });

        const SphereGeometry = new THREE.SphereGeometry( 15, 32, 16 );
        const SphereMaterial = new THREE.MeshPhongMaterial({color: 0x0000FF, side: THREE.DoubleSide, wireframe: false, flatShading: false});
        const Sphere = new THREE.Mesh(SphereGeometry, SphereMaterial);
        
        Sphere.position.y = 20;

        const floorGeometry = new THREE.BoxGeometry(70, 100, 2, 2);
        floorGeometry.rotateX(-Math.PI * 0.5);
        const floorMaterial = new THREE.MeshPhongMaterial({color: 0x0000FF, side: THREE.DoubleSide, wireframe: false, flatShading: false})
        const Floor = new THREE.Mesh(floorGeometry, floorMaterial);
        Floor.overdraw = true;
        Floor.position.y = -15;


        const light = new THREE.AmbientLight(0xffffff, 1);
        const backLight = new THREE.DirectionalLight(0xffffff, 1);
        const topLight = new THREE.DirectionalLight(0xffffff, 1);

        light.position.set(0, 0, 1);
        backLight.position.set(0,0, -1);
        topLight.position.set(0, 1, 0 );

        const axesHelper = new THREE.AxesHelper( 150 );// red = x green = y blue = z
        
        // scene.add( axesHelper );
        scene.add( light );
        // scene.add( backLight );
        // scene.add( topLight );
        // scene.add( Sphere ); 
        // scene.add( Floor );

        camera.position.z = 7;
        camera.position.y = 1.6;


        new OrbitControls(camera, renderer.domElement);

        function handleResize(){
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize( window.innerWidth, window.innerHeight );
        }


        function animate(){
          requestAnimationFrame(animate);
          groguMesh.rotation.y += 0.01;
          // plane.rotation.y += 0.004;
          // // plane.rotation.z += 0.009;
          renderer.render(scene, camera);
        };

        animate();
        window.addEventListener('resize', handleResize);
        
        // window.addEventListener('click', () => {
        //   console.log(camera.position)
        // });
    }, []);

    return <></>;
}

export default Threejs;