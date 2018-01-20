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
import matrix from './shaders/Matrix';
import normal from './shaders/Normal';
import voronoise from './shaders/Voronoise';

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
      starburst,
      normal,
      matrix,
      voronoise
    ];
    this.state = {
      currentShader: null,
      currentShaderObject: null
    };
    this.clock = new THREE.Clock();
  }

  componentDidMount() {
    this.setShaderFromName('Basic Color');
  }

  getShaderFromName(name) {
    return this.shaders.find(x => x.name === name);
  }

  setShaderFromName(name) {
    let shader = this.getShaderFromName(name);
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

    this.setState({ currentShader: material, currentShaderObject: shader });
  }

  animateCallback() {
    // if the selects shader has an update function, call it.
    if (
      Boolean(this.state.currentShaderObject) &&
      Boolean(this.state.currentShaderObject.update)
    ) {
      this.state.currentShaderObject.update(
        this.state.currentShader.uniforms,
        this.clock
      );
    }
  }

  render() {
    return (
      <div className="App">
        <Scene
          currentShader={this.state.currentShader}
          onAnimate={() => {
            this.animateCallback();
          }}
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
