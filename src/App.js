import React, { Component } from 'react';
import * as THREE from 'three';
//import logo from './logo.svg';
import './App.css';

import Scene from './components/Scene/Scene';
import Stats from './components/Stats/Stats';
import Controls from './components/Controls/Controls';

import basicColor from './shaders/BasicColor';
import basicColorLights from './shaders/BasicColorLights';
import checker from './shaders/Checker';
import dots from './shaders/Dots';
import simpleLines from './shaders/SimpleLines';
import fadedLines from './shaders/FadedLines';
import starburst from './shaders/Starburst';

class App extends Component {
  constructor(props) {
    super(props);
    this.shaders = [
      basicColor,
      basicColorLights,
      checker,
      dots,
      simpleLines,
      fadedLines,
      starburst
    ];
    this.state = {
      currentShader: null
    };
  }

  componentDidMount() {
    //this.setShader(this.shaders[0]);
    this.setShaderFromName('Basic Color');
  }

  setShader(shader) {
    //console.log(this);
    //this.scene.setShader(shader);
    //this.setState({ currentShader: shader });
  }

  setShaderFromName(name) {
    let shader = this.shaders.find(x => x.name === name);
    //create the options object to send to ShaderMaterial.
    let shaderObject = {
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
      lights: true
    };
    // Add uniforms if present.
    if ('uniforms' in shader) {
      // Using UniformUtils will clone the shader files uniforms,
      shaderObject.uniforms = THREE.UniformsUtils.merge([
        THREE.UniformsLib['lights'],
        shader.uniforms
      ]);
    }
    // Set this new material on the mesh.
    let material = new THREE.ShaderMaterial(shaderObject);
    // add the original uniforms here so we can loop over them in the Controls, because other uniforms are added that we don't want controls for.
    material.customUniforms = shader.uniforms;
    // if (this.mesh != null) {
    //   this.mesh.material = this.material;
    // }
    this.setState({ currentShader: material });
  }

  updateShaderParam() {}

  // setShader(shader) {
  //   // create the options object to send to ShaderMaterial.
  //   let shaderObject = {
  //     vertexShader: shader.vertexShader,
  //     fragmentShader: shader.fragmentShader,
  //     lights: true
  //   };
  //   // Add uniforms if present.
  //   if ('uniforms' in shader) {
  //     // Using UniormUtils will clone the shader files uniforms,
  //     shaderObject.uniforms = THREE.UniformsUtils.merge([
  //       THREE.UniformsLib['lights'],
  //       shader.uniforms
  //     ]);
  //   }
  //   // Set this new material on the mesh.
  //   this.material = new THREE.ShaderMaterial(shaderObject);
  //   if (this.mesh != null) {
  //     this.mesh.material = this.material;
  //   }
  // }

  render() {
    return (
      <div className="App">
        <Scene
          currentShader={this.state.currentShader}
          ref={scene => {
            this.scene = scene;
          }}
        />
        <Stats />
        <Controls
          shaders={this.shaders}
          currentShader={this.state.currentShader}
          onShaderSelect={shaderName => {
            //this.setShader(shader);
            this.setShaderFromName(shaderName);
          }}
        />
      </div>
    );
  }
}

export default App;
