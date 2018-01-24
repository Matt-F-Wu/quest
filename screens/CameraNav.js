import Expo, { Asset } from 'expo';
import React from 'react';

const THREE = require('three');
global.THREE = THREE;
import ExpoTHREE from 'expo-three'; // 2.0.2

console.disableYellowBox = true;

export default class App extends React.Component {
  state = {
    loaded: false,
  }

  componentWillMount() {
    this.preloadAssetsAsync();
  }

  async preloadAssetsAsync() {
    await Promise.all([
      require('../assets/textures/coin/front.png'),
      require('../assets/textures/coin/side.png'),
      require('../assets/textures/coin/bottom.png')
    ].map((module) => Expo.Asset.fromModule(module).downloadAsync()));
    this.setState({ loaded: true });
  }

  render() {
    return this.state.loaded ? (
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

    const material = new THREE.MeshBasicMaterial( { map: coinTexture } );
    //TODO: take 1/10 of the screen roughly, tune later
    const geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.015, 100);
    const cube = new THREE.Mesh(geometry, material);
    cube.position.z = -0.4;
    scene.add(cube);

    const animate = () => {
      requestAnimationFrame(animate);

      //x direction is pointing right, y axis is pointing upword
      //cube.rotation.x += 0.01;
      cube.rotation.x = 0.5;
      cube.rotation.y += 0.02;

      renderer.render(scene, camera);
      gl.endFrameEXP();
    }
    animate();   
  }
}

