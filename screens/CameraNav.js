import Expo, { Asset, Location, Permissions } from 'expo';
import { View, Dimensions } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
const THREE = require('three');
global.THREE = THREE;
import ExpoTHREE from 'expo-three'; // 2.0.2
import userTriggeredAnimation from './userTriggeredAnimation.js';

console.disableYellowBox = true;
var secret = require('./secret');
var routeDecoder = require('./routeDecoder');
var nextStop;
var obj_per_scene = 3;
var capture_radius = 0.15;
var msg_shown = false;
const start_z = -0.8;
var animation_time;
var self;
var exiting = false;
var point_of_touch = new THREE.Vector2();
var ray_casted = false;
var scene;

export default class App extends React.Component {
  state = {
    loaded: false,
    cur_location: null,
    coords: [],
    got_route: false,
    obj_list: [],
    animation_opacity: 0.0,
  }

  constructor(props) {
    super(props);
    self = this;
  }

  //before mounting view, do these things
  componentWillMount() {
    exiting = false;
    this.preloadAssetsAsync();
    this._getLocationAsync();
    console.debug("Will mount...")
  }

  //reset class variables
  componentWillUnmount(){
    console.debug("Component unmounting...");
  }

  async preloadAssetsAsync() {
    await Promise.all([
      require('../assets/textures/coin/front.png'),
      require('../assets/textures/coin/side.png'),
      require('../assets/textures/coin/bottom.png'),
      require('../assets/images/crosshair.png'),
      require('../assets/objects/low-poly-chest.png'),
      require('../assets/textures/crate/crate.gif'),
    ].map((module) => Expo.Asset.fromModule(module).downloadAsync()));

    this.setState({ loaded: true });
  }

  /*
    Request coordinates information.
    About: 
    location.coords.heading
    north is 0 degrees, east is 90 degrees, south is 180 degrees, and so on.

    location.coords.accuracy
    The radius of uncertainty for the location, measured in meters
  */
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    //update every 500 milliseconds and every 0.2 meter movement
    Location.watchPositionAsync({enableHighAccuracy : true, timeInterval: 500, distanceInterval: 0.2}, 
      (location) => {
        this.state.cur_location = location;
        if(!this.state.got_route){
          //Get the route to destination with Google Map Directions API
          const mode = 'walking'; // other modes like 'driving';
          const origin = location.coords.latitude + ',' + location.coords.longitude;
          /*
          TODO: the destination should be passed in as a prop, 
          right now hard code to be somewhere in main quad
          */
          const destination = '37.4274821,-122.1702636';
          const APIKEY = secret.GMapAPIKey;
          const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

          fetch(url)
              .then(response => response.json())
              .then(responseJson => {
                  console.debug("Response Received!");
                  if (responseJson.routes.length) {
                      const c_arr = routeDecoder.decode(responseJson.routes[0].overview_polyline.points);
                      //add origin to the head
                      c_arr.unshift({latitude: location.coords.latitude, longitude: location.coords.longitude});
                      //push destination to the tail
                      c_arr.push({latitude: 37.4274821, longitude: -122.1702636}); // definition below
                      this.setState({
                          coords: c_arr,
                      });
                      //Utilize the coords somehow
                      //console.debug("CUR: " + location.coords.latitude + " " + location.coords.longitude);
                      nextStop = routeDecoder.inBetween(this.state.coords, {latitude: location.coords.latitude, longitude: location.coords.longitude});
                      //console.debug("nextStop: " + nextStop);
                      if(nextStop){
                        this.setState({got_route: true});
                      }else{
                        /*
                        receiver deviated from route, set got_route to false
                        to re-request the route
                        */
                        this.setState({got_route: false});
                      }
                  }
              }).catch(e => {console.warn(e)});
        }else{
          //Do something about the AR graphics
        }
      });
  };

  _addARNavObj(scene, num, coinTexture){
    
    var angle2N = routeDecoder.findHeading({latitude: this.state.cur_location.coords.latitude, 
      longitude: this.state.cur_location.coords.longitude}, nextStop);
    var angle_diff = angle2N - this.state.cur_location.coords.heading;
    
    //Put the first coin in the direction you are going to. Calculated based on GPS readings, probably not the best
    var matched_position = routeDecoder.rotateVector([start_z, 0], angle_diff);
    //console.debug("angle is: " + angle_diff + "x is: " + matched_position[1] + "z is: " + matched_position[0]);
    //Get the current objects
    const cube_list = this.state.obj_list;
    /*
      Object custimization begins:
      Defines what the AR object is, for now, it is just coins
    */
    
    const top_material = new THREE.MeshBasicMaterial( { map: coinTexture } );
    // show copy to save memory, same as using clone()
    const bottom_material = top_material;
    const side_material = new THREE.MeshBasicMaterial( { color: 0xFFD700 } );
    //array of materials
    const materials = [side_material, top_material, bottom_material];
    //TODO: take 1/10 of the screen roughly, tune later
    const geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.02, 100);
    /*
      Object custimization ends
    */
    var i;
    for(i = 0; i < num; i++){
      let cube = new THREE.Mesh(geometry, materials);
      cube.position.x = matched_position[1] * (1.0 + i);
      cube.position.z = matched_position[0] * (1.0 + i);
      cube.rotation.x = Math.PI / 5.0 * 2.0;
      scene.add(cube);
      cube_list.push(cube);
    }

    this.setState({obj_list: cube_list});
    
  }

  tapPosition3D(tappedVec, camera_position, camera_direction){
    //console.debug("tap at: " + tappedVec.x + " " + tappedVec.y + " " + tappedVec.z)
    let vector = new THREE.Vector3();
    vector.set(camera_position.x + camera_direction.x * 0.2, 
      camera_position.y + camera_direction.y * 0.2, 
      camera_position.z + camera_direction.z * 0.2);
    return vector;

  }

  _onGLContextCreate = async (gl) => {
    console.debug("Got here");

    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;
    gl.createRenderbuffer = () => {};
    gl.bindRenderbuffer = () => {};
    gl.renderbufferStorage  = () => {};
    gl.framebufferRenderbuffer  = () => {};

    //ar init
    const arSession = await this._glView.startARSessionAsync();

    //three init
    scene = new THREE.Scene();
    const camera = ExpoTHREE.createARCamera(arSession, width, height, 0.01, 1000);
    //console.debug("camera position: " + camera.position.x + " " + camera.position.y + " " + camera.position.z);

    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(width, height);

    scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer);
    
    /* Create obj texture here because await requires async parent, 
    might need to create other textures too
    */
    
    const coinTexture = await ExpoTHREE.createTextureAsync({
      asset: Asset.fromModule(require('../assets/images/coin.png')),
    });

    
    this._addARNavObj(scene, 3, coinTexture);
    console.debug(" msg_shown: " + msg_shown + " animation_opacity: " + this.state.animation_opacity);

    /*
    Adding the final treasure chest, for testing, shouldn't be this simple
    */
    
    /*
    //Until Evan figures out what's wrong with loadAsync
    const chest = {
      'low-poly-chest.obj': require('../assets/objects/low-poly-chest.obj'),
      'low-poly-chest.mtl': require('../assets/objects/low-poly-chest.mtl'),
      'low-poly-chest.png': require('../assets/objects/low-poly-chest.png'),
    };

    const assetProvider = (name) => {
      return chest[name];
    };

    const chestObj = await ExpoTHREE.loadAsync(
      [chest['low-poly-chest.obj'], chest['low-poly-chest.mtl']],
      null,
      assetProvider,
    );
    */

    var b_texture = await ExpoTHREE.createTextureAsync({
      asset: Asset.fromModule(require('../assets/textures/crate/crate.gif')),
    });
    var b_geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
    var b_material = new THREE.MeshBasicMaterial( { map: b_texture } );
    const chestObj = new THREE.Mesh( b_geometry, b_material );

    const { navigate } = self.props.navigation;

    /*
    Raycaster object capture, used to handle user touches to interact with 3D objects
    */
    var raycaster = new THREE.Raycaster();
    // construct userTriggeredAnimation object's geometry and metarial, save memory
    let uta_geometry = new THREE.SphereGeometry( 0.02, 32, 32 );
    let uta_material = new THREE.MeshBasicMaterial( {color: 0xFFFF00, transparent:true, opacity: 0.60} );
    let utas = [];

    //Create crosshair
    let ch_texture = await ExpoTHREE.createTextureAsync({
      asset: Asset.fromModule(require('../assets/images/crosshair.png')),
    });

    let ch_geometry = new THREE.PlaneBufferGeometry(0.1, 0.1);
    let ch_material = new THREE.MeshBasicMaterial( { transparent: true, opacity: 0.5, map: ch_texture } );
    let chObj = new THREE.Mesh(ch_geometry, ch_material);

    let ch_uta = new userTriggeredAnimation(chObj, 
          (s) => {
            if(s.life_span === undefined || s.life_span <= 0){
              //Haven't been added yet, or has been removed
              scene.add(s.obj);
            }
            //born again, extend life
            s.life_span = 50;
          }, 
          (s) => {scene.remove(s.obj);});

    ch_uta.live = (s, cp, cd) => {
      if(s.life_span === undefined){
        //hasn't been born yet
      }
      else{
        let pos = this.tapPosition3D(null, cp, cd);
        s.obj.position.set(pos.x, pos.y, pos.z);
        s.obj.lookAt(cp);
        if(s.life_span === 0){
          s.death(s);
        }else{
          s.life_span = Math.max(s.life_span - 1, -1);  
        }
      }
      //always alive, stay in utas queue
      return true;
    };

    utas.push(ch_uta);

    let animate = () => {
      requestAnimationFrame(animate);

      camera.updateMatrixWorld();
      var camera_position = new THREE.Vector3();
      camera_position.setFromMatrixPosition( camera.matrixWorld );
      var camera_direction = camera.getWorldDirection();
      //x direction is pointing right, y axis is pointing upword
      //cube.rotation.x += 0.01;
      //cube.rotation.x = Math.PI / 5.0 * 2.0;
      var n_obj_list = [];
      var i;
      var obj_position = new THREE.Vector3();
      scene.updateMatrixWorld();
      for(i = 0; i < this.state.obj_list.length; i++){
        obj_position.setFromMatrixPosition(this.state.obj_list[i].matrixWorld);
        if(routeDecoder.distance(obj_position, camera_position) < capture_radius){
          //got close enough to the object, object is "collected", aka removed
          //TODO: what does collecting an object do?
          scene.remove(this.state.obj_list[i]);
          console.debug("Collect! " + "length: " + n_obj_list.length + " msg_shown: " + msg_shown);
          //200 drawing cycles
          animation_time = 100;
          this.setState({animation_opacity: 1.0});
          //Add screen flash effect for collecting an object
        }else{
          this.state.obj_list[i].rotation.y += 0.04;
          n_obj_list.push(this.state.obj_list[i]);
        }
      }

      this.setState({obj_list: n_obj_list});

      if(animation_time > 0) {animation_time--;}
      if(animation_time == 0){
        this.setState({animation_opacity: 0.0});
      }

      if(n_obj_list.length < obj_per_scene){
        /*
        TODO: Need to add new object, below function call does something weird, need fixing
        */
        //this._addARNavObj(scene, obj_per_scene - n_obj_list.length, coinTexture);
      }
      
      if(this.state.obj_list.length == 0 && !msg_shown && !exiting){
        //collected all object, show final message
        //console.debug(camera_position.x + ' ' +  camera_position.y + ' ' + camera_position.z);
        ExpoTHREE.utils.scaleLongestSideToSize(chestObj, 0.4);
        
        chestObj.position.set(camera_position.x + camera_direction.x * 1.2, 
                    camera_position.y, 
                    camera_position.z + camera_direction.z * 1.2);
        console.log(chestObj.position.x + " " + chestObj.position.y + " " + chestObj.position.z );
        scene.add(chestObj);
        msg_shown = true;
      }else if(this.state.obj_list.length == 0 && msg_shown){
        // Detecting whether you have captured the final treasure
        obj_position.setFromMatrixPosition(chestObj.matrixWorld);
        if(routeDecoder.distance(obj_position, camera_position) < capture_radius && !exiting){
          //Go to viewing message
          exiting = true;
          msg_shown = false;
          scene.remove(chestObj);
          console.debug("Exiting this view! msg_shown: " + msg_shown);
          /*
          Resetting animate function 
          makes sure that returning to GL view 
          doesn't call previous animate function
          */
          animate = () => {};
          navigate('ViewQuest');
        }
      }

      let n_utas = [];
      for(let uta of utas){
        if(uta.live(uta, camera_position, camera_direction)){
          //this uta has NOT reached the end of its life, keep it
          n_utas.push(uta);
        }
      }
      // This essentially does a remove
      utas = n_utas;

      if (ray_casted) {
        ray_casted = false;
        raycaster.setFromCamera( point_of_touch, camera );
        let intersects = raycaster.intersectObjects( scene.children );

        /*
          Ray animation
        */
        // make a copy, so we don't mess up the original vector
        ch_uta.born(ch_uta);


        let direction = raycaster.ray.direction.clone();
        let end_point = new THREE.Vector3();
        let distance = 6.0;
        if (intersects.length >= 1 ) {
          // distance to travel
          distance = intersects[0].distance;
        }

        let uta_obj = new THREE.Mesh( uta_geometry, uta_material );
        let tappedVec = new THREE.Vector3(point_of_touch.x, point_of_touch.y, 0);
        camera.localToWorld(tappedVec);
        let origin = this.tapPosition3D(tappedVec, camera_position, camera_direction);
        uta_obj.position.set(origin.x, origin.y, origin.z);

        let uta = new userTriggeredAnimation(uta_obj, 
          (s) => {scene.add(s.obj); console.debug("Origin: " + s.obj.position.x + " " + s.obj.position.y + " " + s.obj.position.z)}, 
          (s) => {
            // remove uta first
            scene.remove(s.obj);
            if (intersects.length >= 1){
              for (let j = 0; j < this.state.obj_list.length; j++){
                if(this.state.obj_list[j] === intersects[0].object){
                  this.state.obj_list.splice(j, 1);
                  scene.remove(intersects[0].object);
                  break;
                }
              }
              animation_time = 100;
              this.setState({animation_opacity: 1.0});
            }
          });

        uta.born(uta);

        uta.live = uta.moveObject(origin, direction, distance, 0.2);

        utas.push(uta);
        /*
          Ray animation
        */
      }
      
      renderer.render(scene, camera);
      gl.endFrameEXP();
    }
    animate();   
  }

  fingerDown(event){
    point_of_touch.x = (event.nativeEvent.locationX / Dimensions.get('window').width) * 2.0 - 1.0;
    point_of_touch.y = -(event.nativeEvent.locationY / Dimensions.get('window').height) * 2.0 + 1.0;
    ray_casted = true;
  }

  fingerRelease(event){
    ray_casted = false;
  }

  render() {
    return !exiting && this.state.loaded && this.state.got_route ? (
      <View style={{ flex: 1 }}
        onStartShouldSetResponder={(evt) => true}
        onMoveShouldSetResponder={(evt) => true}
        onResponderTerminationRequest={(evt) => true}
        onResponderGrant={(evt) => this.fingerDown(evt)}
        onResponderRelease={(evt) => this.fingerRelease(evt)}
        >
      <Expo.GLView
        ref={(ref) => this._glView = ref}
        style={{ flex: 1 }}
        onContextCreate={this._onGLContextCreate}
      />
      <FastImage style={{position: 'absolute', width: '100%', height: '100%', opacity: this.state.animation_opacity}} resizeMode='cover'
          source={require('../assets/images/burst.gif')}
      />
      </View>
    ) : <Expo.AppLoading />;
  }

}

