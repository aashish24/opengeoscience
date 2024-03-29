/*========================================================================
  VGL --- VTK WebGL Rendering Toolkit

  Copyright 2013 Kitware, Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 ========================================================================*/

//////////////////////////////////////////////////////////////////////////////
//
// vglUniform class
//
//////////////////////////////////////////////////////////////////////////////

function vglUniform(type, name) {
  this.getTypeNumberOfComponents = function(type) {
    switch (type) {
      case gl.FLOAT:
      case gl.INT:
      case gl.BOOL:
        return 1;

      case gl.FLOAT_VEC2:
      case gl.INT_VEC2:
      case gl.BOOL_VEC2:
        return 2;

      case gl.FLOAT_VEC2:
      case gl.INT_VEC2:
      case gl.FLOAT_VEC3:
        return 3;

      case gl.FLOAT_VEC4:
      case gl.INT_VEC4:
      case gl.BOOL_VEC4:
        return 4;

      case gl.FLOAT_MAT3:
        return 9;

      case gl.FLOAT_MAT4:
        return 16;

      default:
          return 0;
    }
  }

  this.m_type = type;
  this.m_name = name;
  this.m_dataArray = [this.getTypeNumberOfComponents(this.m_type)];
  this.m_numberOfElements = 1;
}

///---------------------------------------------------------------------------
vglUniform.prototype.name = function() {
  return this.m_name;
}

///---------------------------------------------------------------------------
vglUniform.prototype.type = function() {
  return this.m_type;
}

///---------------------------------------------------------------------------
vglUniform.prototype.get = function() {
  // TODO
}
///---------------------------------------------------------------------------
vglUniform.prototype.set = function(value) {
  if (value instanceof mat4.constructor) {
    for (var i = 0; i < 16; ++i) {
      this.m_dataArray[i] = value[i];
    }
  }
  else if (value instanceof mat3.constructor) {
    for (var i = 0; i < 9; ++i) {
      this.m_dataArray[i] = value[i];
    }
  }
  else if (value instanceof vec4.constructor) {
    for (var i = 0; i < 4; ++i) {
      this.m_dataArray[i] = value[i];
    }
  }
  else if (value instanceof vec3.constructor) {
    for (var i = 0; i < 3; ++i) {
      this.m_dataArray[i] = value[i];
    }
  }
  else if (value instanceof vec2.constructor) {
    for (var i = 0; i < 2; ++i) {
      this.m_dataArray[i] = value[i];
    }
  }
  else {
    this.m_dataArray[0] = value;
  }
}

///---------------------------------------------------------------------------
vglUniform.prototype.callGL = function(location) {
  if (this.m_numberElements < 1)
    return;

  switch (this.m_type) {
    case gl.BOOL:
    case gl.INT:
      gl.uniform1iv(location, this.m_dataArray);
      break;
    case gl.FLOAT:
      gl.uniform1fv(location, this.m_dataArray);
      break;
    case gl.FLOAT_VEC2:
      gl.uniform2fv(location, this.m_dataArray);
      break;
    case gl.FLOAT_VEC3:
      gl.uniform3fv(location, this.m_dataArray);
      break;
    case gl.FLOAT_VEC4:
      gl.uniform4fv(location, this.m_dataArray);
      break;
    case gl.FLOAT_MAT3:
      gl.uniformMatrix3fv(location, gl.FALSE, this.m_dataArray);
      break;
    case gl.FLOAT_MAT4:
      gl.uniformMatrix4fv(location, gl.FALSE, this.m_dataArray);
      break;
    default:
        break;
  }
}

///---------------------------------------------------------------------------
vglUniform.prototype.update = function(renderState, program) {
  // Should be implemented by the derived class
}

//////////////////////////////////////////////////////////////////////////////
//
// vglModelViewUniform class
//
//////////////////////////////////////////////////////////////////////////////

///---------------------------------------------------------------------------
function vglModelViewUniform(name) {

  if (name.length == 0) {
    name = "modelViewMatrix";
  }

  vglUniform.call(this, gl.FLOAT_MAT4, name);
  this.set(mat4.create());
}

inherit(vglModelViewUniform, vglUniform);

///---------------------------------------------------------------------------
vglModelViewUniform.prototype.update = function(renderState, program) {
  this.set(renderState.m_modelViewMatrix);
}

//////////////////////////////////////////////////////////////////////////////
//
// vesProjectionUniform class
//
//////////////////////////////////////////////////////////////////////////////

function vglProjectionUniform(name) {
  if (name.length == 0) {
    name = "projectionMatrix";
  }

  vglUniform.call(this, gl.FLOAT_MAT4, name);
  this.set(mat4.create());
}

inherit(vglProjectionUniform, vglUniform);

///---------------------------------------------------------------------------
vglProjectionUniform.prototype.update = function(renderState, program) {
  this.set(renderState.m_projectionMatrix);
}