import React, { PureComponent } from 'react';

export default class CodeView extends PureComponent {
  render() {
    return (
      <div
        id="codeviewcontainer"
        style={{ display: this.props.visible ? 'block' : 'none' }}
        onClick={() => {
          if (this.props.onBorderClick) {
            this.props.onBorderClick();
          }
        }}
      >
        <div id="closebar">
          <div id="bartitle">{this.props.shaderName}</div>
          <div id="closebutton">Close</div>
        </div>
        <div
          id="codeview"
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <div className="pane">
            <div id="vertex-shader">
              <h3>Vertex Shader</h3>
              <pre>{this.props.vertexShader}</pre>
            </div>
          </div>

          <div className="pane">
            <div id="fragment-shader">
              <h3>Fragment Shader</h3>
              <pre>{this.props.fragmentShader}</pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
