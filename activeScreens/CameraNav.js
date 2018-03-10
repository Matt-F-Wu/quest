import Expo, { Asset, Location, Permissions, MapView } from 'expo';
import { View, Dimensions, StyleSheet, Animated, Text, Image, Modal, Alert, TextInput} from 'react-native';
import React from 'react';
const THREE = require('three');
global.THREE = THREE;
require('./ARUtils/OBJLoader');
require('./ARUtils/Water');
import ExpoTHREE from 'expo-three'; // 2.0.2
import MovableObject from './ARUtils/MovableObject.js';
import softBodyObject from '../api/softBodyObject.js';
import HGD from '../api/handGestureDetection';
import utils from '../api/utils';
import Arrows from './ARUtils/Arrows';
import Claws from './ARUtils/Claws';
import Tools from './ARUtils/Tools';
import BlueOverlay from './ARUtils/BlueOverlay';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import {RkButton} from 'react-native-ui-kitten';
import FIcon from 'react-native-vector-icons/FontAwesome';
import ProgressBar from '../components/ProgressBar';
import FadeOutView from '../components/FadeOutView';
import ExpandableView from '../components/ExpandableView';
//import * as CANNON from 'cannon';
import Icon from 'react-native-vector-icons/Entypo';

console.disableYellowBox = true;
const PUSH_ENDPOINT = 'https://quest-back-end.herokuapp.com/sendq/';
var secret = require('../api/secret');
var routeDecoder = require('../api/routeDecoder');
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
var showMap = false;
var showDash = false;
var showArrows = true;
const analysis_cycle = 100;
const zero_vector = new THREE.Vector3(0, 0, 0);
// the user has to shoot 5 light balls to fire the blue flame, to repel the ghost
var ghost_out = false;
var buff_point = 0;
const buff_threshold = 3;
var screenWidth = 0;
var screenHeight = 0;
// Water related consts
const WATER_Y = -0.15;
//globe related consts
const sphere_r = 5;
export default class App extends React.Component {
  state = {
    loaded: false,
    cur_location: null,
    coords: [],
    got_route: false,
    obj_list: [],
    animation_opacity: 0.0,
    overlay_gif: require('../assets/images/burst.gif'),
    game_feedback: new Animated.Value(0),
    right_env: false,
  }

  // TODO: AR View requires customized back button, resetting states + global variables
  static navigationOptions  = ({ navigation, screenProps }) => ({
    title: 'Follow the coins!',
    style:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
    headerLeft: (
      <Icon name={'chevron-left'} size={32} style={{padding: 10, marginLeft: 10, color: Colors.tintColor,}}
                            onPress={ () => {exiting = true; msg_shown = false; showArrows = true; self.setState({right_env: false, loaded: false}); navigation.goBack();} } />
      ),
  });


  constructor(props) {
    super(props);
    self = this;
    if(this.props.navigation.state.params.indoor){
      obj_per_scene = 1;
    }else{
      obj_per_scene = 3;
    }
  }

  //before mounting view, do these things
  componentWillMount() {
    exiting = false;
    this.preloadAssetsAsync();
    this._getLocationAsync();
    console.debug("Will mount...")
  }

  componentDidMount(){
    screenWidth = Dimensions.get('window').width;
    screenHeight = Dimensions.get('window').height;
  }

  async preloadAssetsAsync() {
    //Hao: Should do slective loading to save memory in the future
    await Promise.all([
      require('../assets/images/coin.png'),
      require('../assets/images/crosshair.png'),
      require('../assets/images/ghost.png'),
      require('../assets/textures/quest-present-side.png'),
      require('../assets/textures/quest-present-top-bottom.png'),
      require('../assets/images/blueFlame.gif'),
      require('../assets/images/burst.gif'),
      require('../assets/images/ghost_entrance.gif'),
      require('../assets/textures/waternormals.jpg'),
      require('../assets/textures/city_globe.jpg'),
      require('../assets/textures/rainbow_metallic.jpg'),
      require('../assets/objects/heart/heart-reformed.obj'),
      require('../assets/textures/portal.jpg'),
    ].map((module) => Expo.Asset.fromModule(module).downloadAsync()));

    this.setState({ loaded: true, overlay_gif: Asset.fromModule(require('../assets/images/burst.gif')).localUri });
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
                        //Check is the user is indoor or not, if indoor, display a message
                        if(!this.props.navigation.state.params.indoor){
                          const geo_key = secret.GeoCoding;
                          const geo_url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${origin}&key=${geo_key}`;
                          fetch(geo_url)
                            .then(response => response.json())
                            .then(responseJson => {
                              if(responseJson.results.length){
                                if(responseJson.results[0].geometry.location_type === "ROOFTOP"){
                                  //the user is likely indoors, give the user a heads up
                                  Alert.alert("It's beautiful outside!", "This quest is intended for outdoors, yet we detect that you are indoors, wanna go out?",
                                    [
                                      {text: 'Ignore', onPress: () => this.setState({right_env: true}), style: 'cancel'},
                                      {text: "I'm out now", onPress: () => this.setState({right_env: true}) },
                                    ]
                                  );
                                }else{
                                  //already outdoors
                                  this.setState({right_env: true});
                                }
                              }else{
                                //something went wrong
                                //console.debug("Cannot determine indoor/outdoor..." + JSON.stringify(responseJson) );
                                this.setState({right_env: true});
                              }
                            }).catch(e => {console.warn(e)});
                        }else{
                          this.setState({right_env: true});
                        }
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

  async _addARWater(camera, renderer){
    // First add lighting
    const dirLight = new THREE.DirectionalLight(0xdddddd);
    dirLight.position.set(1, 1, 1);
    scene.add(dirLight);
    // water
    const waterNormals = await ExpoTHREE.createTextureAsync({
      asset: Expo.Asset.fromModule(require('../assets/textures/waternormals.jpg')),
    });
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
    const water = new THREE.Water(renderer, camera, scene, {
      textureWidth: 256, textureHeight: 256,
      waterNormals,
      alpha: 0.75,
      sunDirection: dirLight.position.normalize(),
      waterColor: 0x001e0f,
      betaVersion: 0,
      side: THREE.DoubleSide,
      distortionScale: 10,
      noiseScale: 0.005,
    });
    const waterMesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(30, 30, 10, 10),
      water.material,
    );
    waterMesh.add(water);
    waterMesh.rotation.x = -Math.PI * 0.5;
    waterMesh.position.y = WATER_Y;
    return waterMesh;
  }

  async _addARHeart(){
    const modelAsset = Asset.fromModule(require('../assets/objects/heart/heart-reformed.obj'));
    await modelAsset.downloadAsync();
    const loader = new THREE.OBJLoader();
    const model = loader.parse(
      await Expo.FileSystem.readAsStringAsync(modelAsset.localUri));
    const heart_material = new THREE.MeshPhongMaterial( { color: 0xFFB6C1 } );
    model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = heart_material;
        }
      });
    return model;
  }

  async _addARGlobe(){
    var sphere_geometry = new THREE.SphereGeometry(sphere_r, 200, 200);
    const sphere_texture = await ExpoTHREE.createTextureAsync({
      asset: Asset.fromModule(require('../assets/textures/city_globe.jpg')),
    });
    // A large enclosing globe
    var sphere_material = new THREE.MeshBasicMaterial({map: sphere_texture, side: THREE.BackSide});
    var globe = new THREE.Mesh(sphere_geometry, sphere_material);
    globe.rotation.z = Math.PI / 2;
    return globe;
  }

  async _createARGoal(){
    if(this.props.navigation.state.params.goal == 'portal'){
      let portal = new THREE.Group();
      let frame_top_geometry = new THREE.BoxBufferGeometry( 0.6, 0.05, 0.05 );
      let frame_side_geometry = new THREE.BoxBufferGeometry( 0.05, 1.2, 0.05 );
      let frame_texture = await ExpoTHREE.createTextureAsync({
        asset: Asset.fromModule(require('../assets/textures/rainbow_metallic.jpg')),
      });
      let frame_material = new THREE.MeshBasicMaterial( { map: frame_texture } );
      let sideL = new THREE.Mesh(frame_side_geometry, frame_material);
      let sideR = new THREE.Mesh(frame_side_geometry, frame_material);
      let top = new THREE.Mesh(frame_top_geometry, frame_material);
      let bottom = new THREE.Mesh(frame_top_geometry, frame_material);

      let mem_texture = await ExpoTHREE.createTextureAsync({
        asset: Asset.fromModule(require('../assets/textures/portal.jpg')),
      });
      let mem_material = new THREE.MeshBasicMaterial( { map: mem_texture, side: THREE.DoubleSide } );

      let mem_geometry = new THREE.PlaneBufferGeometry(0.6, 1.2); 
      let mem = new THREE.Mesh(mem_geometry, mem_material);
      portal.add(mem);
      portal.add(sideL);
      portal.add(sideR);
      portal.add(top);
      portal.add(bottom);

      mem.position.set(0, 0, 0);
      sideL.position.set(-0.3, 0, 0);
      sideR.position.set(0.3, 0, 0);
      top.position.set(0, 0.6, 0);
      bottom.position.set(0, -0.6, 0);
      
      return portal;
    }

    var b_t_texture = await ExpoTHREE.createTextureAsync({
      asset: Asset.fromModule(require('../assets/textures/quest-present-top-bottom.png')),
    });
    var b_s_texture = await ExpoTHREE.createTextureAsync({
      asset: Asset.fromModule(require('../assets/textures/quest-present-side.png')),
    });
    
    var b_geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
    var b_t_material = new THREE.MeshBasicMaterial( { map: b_t_texture } );
    var b_s_material = new THREE.MeshBasicMaterial( { map: b_s_texture } );
    var b_materials = [b_s_material, b_s_material, b_t_material, b_t_material, b_s_material, b_s_material];
    
    return (new THREE.Mesh( b_geometry,  b_materials));
  }

  relativeToCamera(bias, camera_position, camera_direction, offset){
    //console.debug("tap at: " + tappedVec.x + " " + tappedVec.y + " " + tappedVec.z)
    offset = offset || 0.2;
    let vector = new THREE.Vector3();
    vector.set(camera_position.x + camera_direction.x * offset + bias.x, 
      camera_position.y + camera_direction.y * offset + bias.y, 
      camera_position.z + camera_direction.z * offset + bias.z);
    return vector;

  }

  showProgress(){
    this.setState({game_feedback: new Animated.Value(1)});
    Animated.timing(
      this.state.game_feedback,
      {
        toValue: 0,
        duration: 1000,
      }
    ).start();    
  }

  showBlueFlame(){
    //console.debug("Show Blue Flame!");
    analysis_cycle = 100;
    animation_time = analysis_cycle * 2;
    this.setState({animation_opacity: 1.0, overlay_gif: Asset.fromModule(require('../assets/images/blueFlame.gif')).localUri});
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

    
    this._addARNavObj(scene, obj_per_scene, coinTexture);
    //console.debug(" msg_shown: " + msg_shown + " animation_opacity: " + this.state.animation_opacity);

    var ghost_texture = await ExpoTHREE.createTextureAsync({
      asset: Asset.fromModule(require('../assets/images/ghost.png')),
    });

    var ghost = new softBodyObject();
    ghost.init(ghost_texture);

    const chestObj = await this._createARGoal();

    const { navigate } = self.props.navigation;

    /*
    Raycaster object capture, used to handle user touches to interact with 3D objects
    */
    var raycaster = new THREE.Raycaster();
    // construct MovableObject object's geometry and metarial, save memory
    let uta_geometry = new THREE.SphereGeometry( 0.02, 32, 32 );
    let uta_material = new THREE.MeshBasicMaterial( {color: 0xFFFF00, transparent:true, opacity: 0.60} );
    let utas = [];

    // make the pixies (guide) and add to scene
    var group = new THREE.Group();
    scene.add(group);
    //TODO: Deal with the position of Group later

    //Create crosshair
    let ch_texture = await ExpoTHREE.createTextureAsync({
      asset: Asset.fromModule(require('../assets/images/crosshair.png')),
    });

    let ch_geometry = new THREE.PlaneBufferGeometry(0.1, 0.1);
    let ch_material = new THREE.MeshBasicMaterial( { transparent: true, opacity: 0.5, map: ch_texture } );
    let chObj = new THREE.Mesh(ch_geometry, ch_material);

    let ch_uta = new MovableObject(chObj, 
          (s) => {
            if(s.life_span === undefined || s.life_span <= 0){
              //Haven't been added yet, or has been removed
              scene.add(s.obj);
            }
            //born again, extend life, life span is half of analysis cycle
            s.life_span = analysis_cycle / 2;
          }, 
          (s) => {scene.remove(s.obj);});

    ch_uta.live = (s, cp, cd) => {
      if(s.life_span === undefined){
        //hasn't been born yet
      }
      else{
        let pos = this.relativeToCamera(zero_vector, cp, cd);
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

    if(this.props.navigation.state.params.has_ghost){
      //Make it a var, so scoping is no longer a concern
      var ghost_uta = new MovableObject(ghost.object, 
        (s, ip) => {
          if(!s.killed && !ghost_out){
            ghost_out = true;
            //Ghost graphics make things slow, lower analysis cycle
            analysis_cycle = 20;
            animation_time = analysis_cycle;
            this.setState({animation_opacity: 0.6, overlay_gif: Asset.fromModule(require('../assets/images/ghost_entrance.gif')).localUri});
            ghost.animate(scene, ip); 
            ghost.object.lookAt(ip);
          }
        },
        (s) => {
            s.killed = true;
            ghost_out = false;
            var n_utas = utas.filter(function(el) {
                return el !== s;
            });
            utas = n_utas;
            scene.remove(ghost.object);
          },
        );

      ghost_uta.live = (s, cp, cd) => {
        if(ghost_out){
          let cir = MovableObject.circleUser();
          let ip = this.relativeToCamera(zero_vector, cp, cd, 0.8);
          ghost.animate(scene, ip);
          ghost.object.lookAt(ip);
          //never forget to return true to indicate that it should live
          return cir(s, cp, cd);
        }else{
          return true;
        }
      };
      
      utas.push(ghost_uta);
    }

    if(this.props.navigation.state.params.indoor){
      let globe = await this._addARGlobe();
      scene.add(globe);
      let waterMesh = await this._addARWater(camera, renderer);
      scene.add(waterMesh);
      let heart = await this._addARHeart();
      Tools.scaleLongestSideToSize(heart, 0.08);
      let i; 
      //put 6 hearts there because I want to --- Hao
      for(i = 0; i < 6; i++){
        let h = heart.clone();
        //randomly put it somewhere, 0 -> 1, so need to scale
        h.position.set(Math.random() * sphere_r / 2, WATER_Y + Math.random() * 0.03, Math.random() * sphere_r / 2);
        let h_uta = new MovableObject(h);
        h_uta.live = (s) => {
          
          if(s.obj.position.y > WATER_Y + 0.03 || s.obj.position.y < WATER_Y - 0.03){
            if(!s.up){
              s.up = true;
            }else{
              s.up = false;
            }
          }

          if(s.up){
            s.obj.position.y += 0.002;  
          }else{
            s.obj.position.y -= 0.002;
          }

          s.obj.rotation.x += Math.random() / 20;
          s.obj.rotation.y += Math.random() / 20;
          return true;
        };
        
        scene.add(h);
        utas.push(h_uta);
      }
    }

    var cycle_idx = 0;
    //let dummyobj = Claws.createClaw();
    //scene.add(dummyobj);
    let animate = () => {
      requestAnimationFrame(animate);

      cycle_idx = (cycle_idx + 1) % analysis_cycle;
      camera.updateMatrixWorld();
      var camera_position = new THREE.Vector3();
      camera_position.setFromMatrixPosition( camera.matrixWorld );
      var camera_direction = camera.getWorldDirection();
      
      if(this.props.navigation.state.params.indoor){
        // Workaround for water_overlay becomes null when exiting
        if(this.water_overlay){
          if (camera_position.y < WATER_Y && !this.water_overlay.visible()) {
            this.water_overlay.setVisible(true);
          }else if(camera_position.y >= WATER_Y && this.water_overlay.visible()){
            this.water_overlay.setVisible(false);
          }
        }
      }

      let angleToCoin;
      if(showArrows && this.state.obj_list[0]){
        angleToCoin = utils.horizontalAngleBetween(camera_direction, this.state.obj_list[0].position.clone().sub(camera_position));
        group.position.copy(camera_position);
        //set arrow to point to left when condition is true
        if(!group.added) {
          Arrows.addArrows(group, camera_position, angleToCoin);
        }
        if(Math.abs(angleToCoin) < Math.PI/9.0){
          /*If the user is less than 20 degrees away from the first coin
            Remove the pixies/arrow
          */
          scene.remove(group);
          showArrows = false;
        }
      }
      
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
          animation_time = analysis_cycle;
          this.setState({animation_opacity: 1.0, overlay_gif: Asset.fromModule(require('../assets/images/burst.gif')).localUri});
          //Add screen flash effect for collecting an object
        }else{
          this.state.obj_list[i].rotation.y += 0.04;
          this.state.obj_list[i].rotation.x += 0.01;
          n_obj_list.push(this.state.obj_list[i]);
        }
      }

      this.setState({obj_list: n_obj_list});

      if(animation_time > 0) {animation_time--;}
      if(animation_time <= 0){
        this.setState({animation_opacity: 0.0});
      }

      if(n_obj_list.length === 1){
        /*
        TODO: Need to add new object, below function call does something weird, need fixing
        */
        //this._addARNavObj(scene, obj_per_scene - n_obj_list.length, coinTexture);

        //Temporarily, show ghost once, aka born once only
        if(this.props.navigation.state.params.has_ghost){
          ghost_uta.born(ghost_uta, this.relativeToCamera(zero_vector, camera_position, camera_direction, 0.8));
          scene.add( ghost_uta.obj );
        }
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
          showArrows = true;
          scene.remove(chestObj);
          console.debug("Exiting this view! msg_shown: " + msg_shown);
          this.setState({right_env: false, loaded: false});
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
        ch_uta.born(ch_uta);

        raycaster.setFromCamera( point_of_touch, camera );
        let intersects = raycaster.intersectObjects( scene.children );
        /*
          If hit ghost, show progress
        */
        if(intersects.length >= 1 && this.props.navigation.state.params.has_ghost && intersects[0].object === ghost_uta.obj){
          this.showProgress();
          buff_point++;
          console.log("Hit ghost: " + buff_point + " times!");
          if(buff_point === buff_threshold){
            //threshold reached, ghost runs away
            ghost_uta.live = MovableObject.moveObject(ghost_uta.obj.position, camera_direction, 15, 0.5);
            buff_point = 0;
            this.showBlueFlame();
          }
        }else{
          /*
            Ray animation
          */
          // make a copy, so we don't mess up the original vector
          
          let direction = raycaster.ray.direction.clone();
          let end_point = new THREE.Vector3();
          let distance = 6.0;
          if (intersects.length >= 1 ) {
            // distance to travel
            distance = intersects[0].distance;
          }

          let uta_obj;
          if(this.state.obj_list.length > 0){ 
            uta_obj = new THREE.Mesh( uta_geometry, uta_material );
          }else{
            //Final box/gift is showing
            uta_obj = Claws.createClaw();
          }
          let tappedVec = new THREE.Vector3(point_of_touch.x, point_of_touch.y, 0);
          camera.localToWorld(tappedVec);
          let origin = this.relativeToCamera(zero_vector, camera_position, camera_direction);
          uta_obj.position.set(origin.x, origin.y, origin.z);

          let uta = new MovableObject(uta_obj, 
            (s) => {scene.add(s.obj);}, 
            (s) => {
              // remove uta first
              scene.remove(s.obj);
              if (intersects.length >= 1){
                //Am I hitting th final gift?
                if(intersects[0].object === chestObj){
                  exiting = true;
                  msg_shown = false;
                  scene.remove(chestObj);
                  console.debug("Exiting this view! msg_shown: " + msg_shown);
                  animate = () => {};
                  navigate('ViewQuest');
                  return;
                }

                for (let j = 0; j < this.state.obj_list.length; j++){
                  if(this.state.obj_list[j] === intersects[0].object){
                    this.state.obj_list.splice(j, 1);
                    scene.remove(intersects[0].object);
                    animation_time = analysis_cycle;
                    this.setState({animation_opacity: 1.0, overlay_gif: Asset.fromModule(require('../assets/images/burst.gif')).localUri});
                    break;
                  }
                }
              }
            });

          uta.born(uta);
          // If throwing the claw, face camera
          uta.live = MovableObject.moveObject(origin, direction, distance, distance < 1.0 ? 0.02 : 0.2, this.state.obj_list.length == 0);

          utas.push(uta);
        }
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

  // request help from the sender
  requestHelp(){
    let sender = this.props.navigation.state.params.sender;
    fetch(PUSH_ENDPOINT + sender, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          requester: 'HaoWu',
          requestText: this.state.requestText,
          key: this.props.navigation.state.params.key,
        },
      }),
    });
    //TODO: requester shouldn't be hardcoded
    //clear request texts
    this.setState({requestText: ''});
    Alert.alert("Request sent!", "",
        [
          {text: 'OK'},
        ]
    );
  }

  render() {
    //console.debug("Exiting: " + exiting);
    return !exiting && this.state.loaded && this.state.got_route ? (
      <View style={{ flex: 1 }}>

      <RkButton
          onStartShouldSetResponder={(evt) => true}
          onStartShouldSetResponderCapture={(evt) => true}
          onResponderTerminationRequest={(evt) => false} 
          onPress={() => {showMap = !showMap}} 
          style={[{zIndex: 10, position: 'absolute', left: '80%', top: '2%', width: '15%', height: '10%'}, styles.button]} >
          <FIcon name={'map'} color='#ffffff' size={25} />
      </RkButton>

      <Expo.GLView
        onStartShouldSetResponder={(evt) => true}
        onMoveShouldSetResponder={(evt) => true}
        onResponderTerminationRequest={(evt) => true}
        onResponderGrant={(evt) => this.fingerDown(evt)}
        onResponderRelease={(evt) => this.fingerRelease(evt)}
        ref={(ref) => this._glView = ref}
        style={{ flex: 1 }}
        onContextCreate={this._onGLContextCreate}/>

      {
        showMap? (
          <MapView
            style={{ position: 'absolute', width: '100%', height: '100%', }}
            initialRegion={{
              latitude: this.state.cur_location.coords.latitude,
              longitude: this.state.cur_location.coords.longitude,
              latitudeDelta: 0.0369,
              longitudeDelta: 0.0168,
            }}>

            <MapView.Marker
              coordinate = {{
                latitude: this.state.cur_location.coords.latitude, 
                longitude: this.state.cur_location.coords.longitude}}
              title={'You are here!'}
              pinColor={Colors.tintColor}>
            </MapView.Marker>

            <MapView.Polyline 
              coordinates={this.state.coords}
              strokeWidth={4}
              strokeColor={Colors.tintColor}/>

          </MapView>
        ) : null
      }
       
      <Image style={{position: 'absolute', width: '100%', height: '100%', opacity: this.state.animation_opacity}} resizeMode='cover'
        source={{uri: this.state.overlay_gif}}
        onStartShouldSetResponder={(evt) => true}
        onResponderGrant={(evt) => this.fingerDown(evt)}
        onResponderRelease={(evt) => this.fingerRelease(evt)}
      />

      <BlueOverlay ref={(ref) => this.water_overlay = ref} 
        onStartShouldSetResponder={(evt) => true}
        onResponderGrant={(evt) => this.fingerDown(evt)}
        onResponderRelease={(evt) => this.fingerRelease(evt)}
      />
      
      <ProgressBar
        fillStyle={styles.progress_fill}
        backgroundStyle={styles.progress_background}
        style={{position:'absolute', marginTop: '5%', width: '40%', height: 15, marginLeft: '2%', opacity: ghost_out? 1 : 0}}
        progress={buff_point/buff_threshold}
      />

      <Text style={[{position:'absolute', height: 15, paddingTop: 6, width: '10%', left: '45%', opacity: ghost_out? 1 : 0}, Styles.floating_text]}>{buff_point} / {buff_threshold}</Text>

      <FadeOutView fadeAnim={this.state.game_feedback} style={{position: 'absolute', marginLeft: '10%'}}>
        <Text style={styles.gf_text}>+1</Text>
      </FadeOutView>

      <ExpandableView style={{position: 'absolute', backgroundColor: Colors.blackMask}}
        config={{initialWidth: 0, initialHeight: 0, endWidth: screenWidth * 0.8, endHeight: screenHeight * 0.8, anchorX: screenWidth * 0.1, anchorY: screenHeight * 0.8}}
        expand={showDash}>
        
        <View style={styles.innerContainer}>
          <View style={styles.row}>
            <Text style={{fontSize: 24, color: Colors.tintColor}}>Points: </Text><Text style={styles.gf_text}>30</Text>
          </View>
          <View style={styles.row}>
            <Text style={{fontSize: 24, color: Colors.tintColor}}>To destination: </Text><Text style={styles.gf_text}>2.2 miles</Text>
          </View>
          <View style={styles.row}>
            <Text style={{fontSize: 24, color: Colors.tintColor}}>Time spent: </Text><Text style={styles.gf_text}>1.2 hours</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.titleText}
              onChangeText={(text) => this.setState({requestText: text})}
              value={this.state.requestText}
              placeholder={'your request to the sender...'}
              placeholderTextColor={Colors.accentColor}
            />
          </View>

          <RkButton style={{padding: 15, backgroundColor: Colors.tintColor, borderRadius: 5, marginBottom: 15}}
              onPress={() => this.requestHelp()}>
            <Text style={{fontSize: 16, color: Colors.noticeText}}>Request hints</Text>
          </RkButton>

          <RkButton style={{padding: 15, backgroundColor: Colors.tintColor, borderRadius: 5, marginBottom: 15}}
              onPress={() => {showDash = false;}}>
            <Text style={{fontSize: 16, color: Colors.noticeText}}>About Game</Text>
          </RkButton>
          
        </View>
      
      </ExpandableView>

      <RkButton
          onStartShouldSetResponder={(evt) => true}
          onStartShouldSetResponderCapture={(evt) => true}
          onResponderTerminationRequest={(evt) => false} 
          onPress={() => {showDash= !showDash}} 
          style={[{zIndex: 50, position: 'absolute', left: '5%', top: '90%', width: '10%', height: '5%', backgroundColor: Colors.tintColor, borderRadius: 5}]} >
          <FIcon name={showDash ? 'chevron-down' : 'chevron-up'} color='#ffffff' size={10} />
      </RkButton>
      
      </View>
    ) : (<View style={{flex: 1, backgroundColor: Colors.backgroundColor, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Loading experience...</Text>
          </View>);
  }

}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.tintColor,
    borderRadius: 40,
  },
  progress_fill: {
    backgroundColor: Colors.tintColor,
  },
  progress_background: {
    backgroundColor: Colors.textBGBlur, 
    borderRadius: 2,
  },
  gf_text: {
    backgroundColor: Colors.tintColor,
    color: Colors.noticeText,
    borderWidth: 5,
    borderRadius: 5,
    fontSize: 24,
  },
  innerContainer: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  inputContainer: {
    width: '100%',
    borderBottomColor: Colors.tintColor,
    borderBottomWidth: 2,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
  },
  titleText: {
    color: Colors.tintColor,
    fontWeight: 'bold',  
    fontSize: 16,
  },
});

