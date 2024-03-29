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
// vglBoundingObject class
//
//////////////////////////////////////////////////////////////////////////////

function vglBoundingObject() {
  vglObject.call(this);

  this.m_boundsDirty = true;
  this.m_bounds = new Array(6);
}

inherit(vglBoundingObject, vglObject);

/// Return dirty state of bounds
//----------------------------------------------------------------------------
vglBoundingObject.prototype.boundsDirty = function() {
  return this.m_boundsDirty;
}
/// Set bounds dirty
//----------------------------------------------------------------------------
vglBoundingObject.prototype.setBoundsDirty = function(flag) {
  if (this.m_boundsDirty !== flag)
  {
    this.m_boundsDirty = flag;
    this.setModified();
    return true;
  }

  return false;
}

/// Return current bounds
//----------------------------------------------------------------------------
vglBoundingObject.prototype.bounds  = function() {
  return this.m_bounds;
}
/// Set current bounds
//----------------------------------------------------------------------------
vglBoundingObject.prototype.setBounds = function(minX, maxX, minY, maxY,
                                                  minZ, maxZ) {
  this.m_bounds[0] = minX;
  this.m_bounds[1] = maxX;
  this.m_bounds[2] = minY;
  this.m_bounds[3] = maxY;
  this.m_bounds[4] = minZ;
  this.m_bounds[5] = maxZ;

  this.setModified();

  return true;
}

/// Request computing bounds. Should be implemented by the concrete class
//----------------------------------------------------------------------------
vglBoundingObject.prototype.computeBounds = function() {
}
