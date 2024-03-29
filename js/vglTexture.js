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
// vglTexture class
//
//////////////////////////////////////////////////////////////////////////////

///---------------------------------------------------------------------------
function vglTexture() {
  vglMaterialAttribute.call(this);

  this.m_type = vglMaterialAttributeType.Texture;

  this.m_width = 0;
  this.m_height = 0;
  this.m_depth = 0;

  this.m_textureHandle = null;
  this.m_textureUnit = 0;

  this.m_pixelFormat = null;
  this.m_pixelDataType = null;

  this.m_internalFormat = null;

  this.m_image = null
}

inherit(vglTexture, vglMaterialAttribute);

///---------------------------------------------------------------------------
vglTexture.prototype.setup = function(renderState) {
  if (this.modified()) {
    gl.deleteTexture(this.m_textureHandle);
    this.m_textureHandle = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.m_textureHandle);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    if (this.m_image !== null) {
      this.updateDimensions();
      this.computeInternalFormatUsingImage();

      console.log("m_internalFormat " + this.m_internalFormat);
      console.log("m_pixelFormat " + this.m_pixelFormat);
      console.log("m_pixelDataType " + this.m_pixelDataType);

      // FOR now support only 2D textures
      gl.texImage2D(gl.TEXTURE_2D, 0, this.m_internalFormat,
                    this.m_pixelFormat, this.m_pixelDataType, this.m_image);
    }
    else {
      gl.texImage2D(gl.TEXTURE_2D, 0, this.m_internalFormat,
                    this.m_pixelFormat, this.m_pixelDataType, null);
    }

    gl.bindTexture(gl.TEXTURE_2D, null);
    this.setModified(false);
  }
}

///---------------------------------------------------------------------------
vglTexture.prototype.bind = function(renderState) {
  // TODO Call setup via material setup
  if (this.modified()) {
    this.setup(renderState);
  }

//  gl.activeTexture(gl.TEXTURE0);
//  gl.bindTexture(gl.TEXTURE_2D, worldTexture);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, this.m_textureHandle);
}
///---------------------------------------------------------------------------
vglTexture.prototype.undoBind = function(renderState) {
  gl.bindTexture(gl.TEXTURE_2D, 0);
}

///---------------------------------------------------------------------------
vglTexture.prototype.image = function() {
  return this.m_image;
}
///---------------------------------------------------------------------------
vglTexture.prototype.setImage = function(image) {
  if (image !== null) {
    this.m_image = image;
    this.updateDimensions();
    this.setModified(true);
    return true;
  }

  return false;
}

///---------------------------------------------------------------------------
vglTexture.prototype.textureUnit = function() {
  return this.m_textureUnit;
}
///---------------------------------------------------------------------------
vglTexture.prototype.setTextureUnit = function(unit) {
  if (this.m_textureUnit === unit) {
    return false;
  }

  this.m_textureUnit = unit;
  this.setModified(true);
  return true;
}

///---------------------------------------------------------------------------
vglTexture.prototype.width = function() {
  return this.m_width;
}
///---------------------------------------------------------------------------
vglTexture.prototype.setWidth = function(width) {
  if (this.m_image === null) {
    return false;
  }

  this.m_width = width;
  this.setModified(true);

  return true;
}

///---------------------------------------------------------------------------
vglTexture.prototype.depth = function() {
  return this.m_depth;
}
///---------------------------------------------------------------------------
vglTexture.prototype.setDepth = function(depth) {
  if (this.m_image === null) {
    return false;
  }

  this.m_depth = depth;
  this.setModified(true);

  return true;
}

///---------------------------------------------------------------------------
vglTexture.prototype.textureHandle = function() {
  return this.m_textureHandle;
}

///---------------------------------------------------------------------------
vglTexture.prototype.internalFormat = function() {
  return this.m_internalFormat;
}
///---------------------------------------------------------------------------
vglTexture.prototype.setInternalFormat = function(internalFormat) {
  if (this.m_internalFormat !== internalFormat) {
    this.m_internalFormat = internalFormat;
    this.setModified(true);

    return true;
  }

  return false;
}

///---------------------------------------------------------------------------
vglTexture.prototype.pixelFormat = function() {
  return this.m_pixelFormat;
}
///---------------------------------------------------------------------------
vglTexture.prototype.setPixelFormat = function(pixelFormat) {
  if (this.m_image === null) {
    return false;
  }

  this.m_pixelFormat = pixelFormat;
  this.setModified(true);
  return true;
}

///---------------------------------------------------------------------------
vglTexture.prototype.pixelDataType = function() {
  return this.m_pixelDataType;
}
///---------------------------------------------------------------------------
vglTexture.prototype.setPixelDataType = function(pixelDataType) {
  if (this.m_image === null) {
    return false;
  }

  this.m_pixelDataTYpe = pixelDataType;

  this.setModified(true);

  return true;
}

///---------------------------------------------------------------------------
vglTexture.prototype.computeInternalFormatUsingImage = function() {
  // Currently image does not define internal format
  // and hence it's pixel format is the only way to query
  // information on how color has been stored.
//  switch (this.m_image.pixelFormat()) {
//  case gl.RGB:
//    this.m_internalFormat = gl.RGB;
//    break;
//  case gl.RGBA:
//    this.m_internalFormat = gl.RGBA;
//    break;
//  case gl.Luminance:
//    this.m_internalFormat = gl.Luminance;
//    break;
//  case gl.LuminanceAlpha:
//    this.m_internalFormat = gl.LuminanceAlpha;
//    break;
//  // Do nothing when image pixel format is none or undefined.
//  default:
//    break;
//  };

  // TODO Fix this
  this.m_internalFormat = gl.RGBA;
  this.m_pixelFormat = gl.RGBA;
  this.m_pixelDataType = gl.UNSIGNED_BYTE;
}

///---------------------------------------------------------------------------
vglTexture.prototype.updateDimensions = function() {
  if (this.m_image != null) {
    this.m_width = this.m_image.width;
    this.m_height = this.m_image.height;
    this.m_depth = 0; // Only 2D images are supported now
  }
}








