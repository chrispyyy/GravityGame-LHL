/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	console.log('sup')

	GameObject = __webpack_require__(2);
	createScene = __webpack_require__(3);

	window.addEventListener('DOMContentLoaded', function(){
	  // get the canvas DOM element
	  var canvas = document.getElementById('renderCanvas');

	  // load the 3D engine
	  var engine = new BABYLON.Engine(canvas, true);

	  // createScene function that creates and return the scene

	  // call the createScene function
	  var scene = createScene(engine, canvas);

	  // run the render loop
	  engine.runRenderLoop(function(){
	    scene.render();
	  });

	// the canvas/window resize event handler
	  window.addEventListener('resize', function(){
	    engine.resize();
	  });
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	function GameObject (name, size, mass, scene, x, y, z){

	  this.canvasObject = BABYLON.Mesh.CreateSphere(name, 16, size, scene);

	  this.material = this.canvasObject.material = new BABYLON.StandardMaterial(name, scene);

	  this.mass = mass; 

	  this.size = size;

	  this.position = this.canvasObject.position = new BABYLON.Vector3(x, y, z);

	  this.calculateForce = function(magnetObject){

	    var distanceVector = magnetObject.position.subtract(this.position);

	    var magnitude = distanceVector.length();
	    if (magnitude < 20) {
	      magnitude = 20;
	    } else if (magnitude > 100) {
	      magnitude = 100;
	    }

	    // if (magnitude < 1) {
	    //   // return alert("GAME OVER");
	    //   console.info("Game Over")
	    // }
	    var forceDirection = distanceVector.normalize();

	    var strength = (10 * this.mass * magnetObject.mass)/(magnitude * magnitude);

	    var gForce = forceDirection.scale(strength);
	 
	    return gForce;
	  }
	}

	module.exports = GameObject

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	clickEvents = __webpack_require__(4);
	generateStars = __webpack_require__(5);
	generateGround = __webpack_require__(6);
	generateCamera = __webpack_require__(7);
	generateLight = __webpack_require__(8);

	module.exports = function createScene(engine, canvas){
	  // This creates a basic Babylon Scene object (non-mesh)
	  var scene = new BABYLON.Scene(engine);
	  // This creates and positions a free camera (non-mesh)
	  var camera = generateCamera(scene, canvas);
	  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
	  var light = generateLight(scene);

	  var stars = generateStars(scene);

	  var ground = generateGround(scene);

	  var ship = new GameObject('ship', 2, .5, scene, -20, 1, -20);

	  var canvasObjects = [];

	  for (var i=0; i<1; i++) {
	    canvasObjects[i] = new GameObject('planet', 6, 30, scene, 25, 1, 25);
	  }


	  clickEvents(scene, ship, canvasObjects)

	  return scene;
	}



/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function clickEvent(scene, ship, canvasObjects){ 

	  var isMouseDown = false;
	  var eventStarted = null;
	  var newBlackhole  = null;
	  
	  scene.onPointerDown = function (event, pickResult){
	    isMouseDown = true;
	    eventStarted = Date.now()

	    if (pickResult.hit) {
	      var xCoord = pickResult.pickedPoint.x;
	      var zCoord = pickResult.pickedPoint.z;
	      newBlackhole = new GameObject('canvasObject', 1, 5, scene, xCoord, 1, zCoord);
	      canvasObjects.push(newBlackhole);
	      window.newBlackhole = newBlackhole;
	    }
	  };

	  scene.onPointerUp = function(event)
	  {
	    isMouseDown = false;
	    newBlackhole = null;
	  }

	  scene.registerBeforeRender(function()
	  {  

	    if (ship.canvasObject.intersectsPoint(canvasObjects[0].canvasObject.position, true)) {
	      ship.material.emissiveColor = new BABYLON.Color3(0, 1, 0);
	    }

	    for(var i = 1; i < canvasObjects.length; i ++){
	      if (ship.canvasObject.intersectsPoint(canvasObjects[i].canvasObject.position, true)) {
	      ship.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
	      }
	    }

	    var forces = new BABYLON.Vector3(0, 0, 0);
	    canvasObjects.forEach(function(canvasObject){
	      forces = forces.add(ship.calculateForce(canvasObject));
	    });
	    ship.position.addInPlace(forces);
	    if(isMouseDown)
	    {
	      if(newBlackhole)
	      {
	        var delta = Date.now() - eventStarted;
	        newBlackhole.canvasObject.scaling.addInPlace(new BABYLON.Vector3(.05,.05,.05));
	        newBlackhole.mass = newBlackhole.mass + (delta/10000);
	        console.log(newBlackhole.mass);
	      }
	    }
	  });
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function generateStars(scene){

	  var stars = []
	  
	  for (var i=0; i< 500; i++) {
	    stars.push(new GameObject('stars', 2 + Math.random() * 7, 30, scene, -1000 + Math.random() * 2000, -1000, -500 + Math.random() * 1000));
	  }

	  for (var i=0; i < stars.length; i++){
	    stars[i]
	  }

	  return stars
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function generateGround(scene){

	  var ground = BABYLON.Mesh.CreateGround("ground", 1000, 1000, 0, scene, false);

	  groundMaterial =  new BABYLON.StandardMaterial("ground", scene);

	  ground.material = groundMaterial;

	  groundMaterial.alpha  = 0;

	  return ground;
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function generateCamera(scene, canvas){
	  
	  var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 75, -0.0000000000000001), scene);
	  // This targets the camera to scene origin
	  camera.setTarget(BABYLON.Vector3.Zero());
	  // This attaches the camera to the canvas
	  camera.attachControl(canvas, true);

	  return camera;
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function generateLight(scene){

	  var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(30, 25 , 30), scene);
	  // Default intensity is 1. Let's dim the light a small amount
	  light.intensity = 0.7;
	  
	  return light;
	}

/***/ }
/******/ ]);