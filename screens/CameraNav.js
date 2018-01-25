import Expo, { Asset, Location, Permissions } from 'expo';
import React from 'react';

const THREE = require('three');
global.THREE = THREE;
import ExpoTHREE from 'expo-three'; // 2.0.2

console.disableYellowBox = true;
var routeDecoder = require('./routeDecoder');
export default class App extends React.Component {
  state = {
    loaded: false,
    coords: [],
    init_angle: 0.0,
    got_angle: false,
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
    var first_point = true;
    Location.watchPositionAsync({enableHighAccuracy : true, timeInterval: 500, distanceInterval: 0.2}, 
      (location) => {
        if(first_point){
          first_point = false;
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
                      console.debug("CUR: " + location.coords.latitude + " " + location.coords.longitude);
                      const nextStop = routeDecoder.inBetween(this.state.coords, {latitude: location.coords.latitude, longitude: location.coords.longitude});
                      console.debug("nextStop: " + nextStop);
                      if(nextStop){
                        var angle2N = routeDecoder.findHeading({latitude: location.coords.latitude, longitude: location.coords.longitude}, nextStop);
                        var angle_diff = angle2N - location.coords.heading;
                        this.setState({init_angle: angle_diff, got_angle: true});
                      }else{
                        /*
                        receiver deviated from route, set first point to true
                        to re-request the route
                        */
                        first_point = true;
                      }
                  }
              }).catch(e => {console.warn(e)});
        }else{
          //Do something about the AR graphics
        }
      });
  };

  render() {
    return this.state.loaded && this.state.got_angle ? (
      <Expo.GLView
        ref={(ref) => this._glView = ref}
        style={{ flex: 1 }}
        onContextCreate={this._onGLContextCreate}
      />
    ) : <Expo.AppLoading />;
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
    
    const coinTexture = await ExpoTHREE.createTextureAsync({
      asset: Asset.fromModule(require('../assets/images/coin.png')),
    });
    
    const top_material = new THREE.MeshBasicMaterial( { map: coinTexture } );
    // show copy to save memory, same as using clone()
    const bottom_material = top_material;
    const side_material = new THREE.MeshBasicMaterial( { color: 0xFFD700 } );
    //array of materials
    const materials = [side_material, top_material, bottom_material];
    //TODO: take 1/10 of the screen roughly, tune later
    const geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.02, 100);
    const cube = new THREE.Mesh(geometry, materials);
    cube.position.z = -0.5;
    //Put the first coin in the direction you are going to. Calculated based on GPS readings, probably not the best
    var matched_position = routeDecoder.rotateVector([cube.position.z, 0], this.state.init_angle);
    cube.position.x = matched_position[1];
    cube.position.z = matched_position[0];
    
    console.debug("angle is: " + this.state.init_angle + "x is: " + cube.position.x + "z is: " + cube.position.z);
    scene.add(cube);

    const animate = () => {
      requestAnimationFrame(animate);

      //x direction is pointing right, y axis is pointing upword
      //cube.rotation.x += 0.01;
      //cube.rotation.x = Math.PI / 5.0 * 2.0;
      cube.rotation.y += 0.04;

      renderer.render(scene, camera);
      gl.endFrameEXP();
    }
    animate();   
  }
}

