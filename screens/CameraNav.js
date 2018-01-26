import Expo, { Asset, Location, Permissions } from 'expo';
import React from 'react';

const THREE = require('three');
global.THREE = THREE;
import ExpoTHREE from 'expo-three'; // 2.0.2

console.disableYellowBox = true;
var routeDecoder = require('./routeDecoder');
var nextStop;
var obj_per_scene = 3;
export default class App extends React.Component {
  state = {
    loaded: false,
    cur_location: null,
    coords: [],
    got_route: false,
    obj_list: [],
  }

  //before mounting view, do these things
  componentWillMount() {
    this.preloadAssetsAsync();
    this._getLocationAsync();
  }

  async preloadAssetsAsync() {
    await Promise.all([
      require('../assets/textures/coin/front.png'),
      require('../assets/textures/coin/side.png'),
      require('../assets/textures/coin/bottom.png')
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
          const APIKEY = 'AIzaSyDigh9mURxqbuujMNcZMVGmzG5oFoYWNSA';
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
    const start_z = -0.5;
    //Put the first coin in the direction you are going to. Calculated based on GPS readings, probably not the best
    var matched_position = routeDecoder.rotateVector([start_z, 0], angle_diff);
    console.debug("angle is: " + angle_diff + "x is: " + matched_position[1] + "z is: " + matched_position[0]);
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
    const scene = new THREE.Scene();
    const camera = ExpoTHREE.createARCamera(arSession, width, height, 0.01, 1000);
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

    const animate = () => {
      requestAnimationFrame(animate);

      //x direction is pointing right, y axis is pointing upword
      //cube.rotation.x += 0.01;
      //cube.rotation.x = Math.PI / 5.0 * 2.0;
      var n_obj_list = [];
      var i;
      for(i = 0; i < this.state.obj_list.length; i++){
        if(routeDecoder.vectorLength(this.state.obj_list[i].position) < 0.05){
          //got close enough to the object, object is "collected", aka removed
          //TODO: what does collecting an object do?
          scene.remove(this.state.obj_list[i]);
          console.debug("Collect!");
        }else{
          this.state.obj_list[i].rotation.y += 0.04;
          n_obj_list.push(this.state.obj_list[i]);
        }
      }

      if(n_obj_list.length < obj_per_scene){
        //Need to add new object!
        this._addARNavObj(scene, obj_per_scene - n_obj_list.length, coinTexture);
      }

      this.setState({obj_list: n_obj_list});

      renderer.render(scene, camera);
      gl.endFrameEXP();
    }
    animate();   
  }

  render() {
    
    return this.state.loaded && this.state.got_route ? (
      <Expo.GLView
        ref={(ref) => this._glView = ref}
        style={{ flex: 1 }}
        onContextCreate={this._onGLContextCreate}
      />
    ) : <Expo.AppLoading />;
  }

}

