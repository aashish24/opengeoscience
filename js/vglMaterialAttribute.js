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
// vglMaterialAttribute class
//
//////////////////////////////////////////////////////////////////////////////

vglMaterialAttributeType =   {
    "Undefined" : 0x0,
    "ShaderProgram" : 0x1,
    "Texture" : 0x2,
    "Blend" : 0x3,
    "Depth" : 0x4
  };

function vglMaterialAttribute() {
  vglObject.call(this);
  this.m_type = vglMaterialAttributeType.Undefined;
  this.m_enabled = true;
}
inherit(vglMaterialAttribute, vglObject);

///---------------------------------------------------------------------------
vglMaterialAttribute.prototype.type = function() {
  return this.m_type;
}

///---------------------------------------------------------------------------
vglMaterialAttribute.prototype.setup = function(renderState) {
  return false;
}

///---------------------------------------------------------------------------
vglMaterialAttribute.prototype.bind  = function(renderState) {
  return false;
}
///---------------------------------------------------------------------------
vglMaterialAttribute.prototype.undoBind = function(renderState) {
  return false;
}

///---------------------------------------------------------------------------
vglMaterialAttribute.prototype.setupVertexData = function(renderState, key) {
  return false;
}

///---------------------------------------------------------------------------
vglMaterialAttribute.prototype.bindVertexData = function(renderState, key) {
  return false;
}
///---------------------------------------------------------------------------
vglMaterialAttribute.prototype.undoBindVertexData = function(renderState, key) {
  return false;
}