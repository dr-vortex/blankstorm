!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r(require("babylonjs")):"function"==typeof define&&define.amd?define("babylonjs-procedural-textures",["babylonjs"],r):"object"==typeof exports?exports["babylonjs-procedural-textures"]=r(require("babylonjs")):e.PROCEDURALTEXTURES=r(e.BABYLON)}("undefined"!=typeof self?self:"undefined"!=typeof global?global:this,(function(e){return function(e){var r={};function t(o){if(r[o])return r[o].exports;var n=r[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,t),n.l=!0,n.exports}return t.m=e,t.c=r,t.d=function(e,r,o){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)t.d(o,n,function(r){return e[r]}.bind(null,n));return o},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=14)}([function(r,t){r.exports=e},function(e,r,t){"use strict";t.d(r,"b",(function(){return n})),t.d(r,"a",(function(){return i}));
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var o=function(e,r){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])})(e,r)};function n(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function t(){this.constructor=e}o(e,r),e.prototype=null===r?Object.create(r):(t.prototype=r.prototype,new t)}function i(e,r,t,o){var n,i=arguments.length,a=i<3?r:null===o?o=Object.getOwnPropertyDescriptor(r,t):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,r,t,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(a=(i<3?n(a):i>3?n(r,t,a):n(r,t))||a);return i>3&&a&&Object.defineProperty(r,t,a),a}Object.create;Object.create},function(e,r){var t;t=function(){return this}();try{t=t||new Function("return this")()}catch(e){"object"==typeof window&&(t=window)}e.exports=t},function(e,r,t){"use strict";t.r(r),t.d(r,"BrickProceduralTexture",(function(){return a}));var o=t(1),n=t(0),i="precision highp float;\nvarying vec2 vPosition;\nvarying vec2 vUV;\nuniform float numberOfBricksHeight;\nuniform float numberOfBricksWidth;\nuniform vec3 brickColor;\nuniform vec3 jointColor;\nfloat rand(vec2 n) {\nreturn fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);\n}\nfloat noise(vec2 n) {\nconst vec2 d=vec2(0.0,1.0);\nvec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));\nreturn mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);\n}\nfloat fbm(vec2 n) {\nfloat total=0.0,amplitude=1.0;\nfor (int i=0; i<4; i++) {\ntotal+=noise(n)*amplitude;\nn+=n;\namplitude*=0.5;\n}\nreturn total;\n}\nfloat roundF(float number){\nreturn sign(number)*floor(abs(number)+0.5);\n}\nvoid main(void)\n{\nfloat brickW=1.0/numberOfBricksWidth;\nfloat brickH=1.0/numberOfBricksHeight;\nfloat jointWPercentage=0.01;\nfloat jointHPercentage=0.05;\nvec3 color=brickColor;\nfloat yi=vUV.y/brickH;\nfloat nyi=roundF(yi);\nfloat xi=vUV.x/brickW;\nif (mod(floor(yi),2.0) == 0.0){\nxi=xi-0.5;\n}\nfloat nxi=roundF(xi);\nvec2 brickvUV=vec2((xi-floor(xi))/brickH,(yi-floor(yi))/brickW);\nif (yi<nyi+jointHPercentage && yi>nyi-jointHPercentage){\ncolor=mix(jointColor,vec3(0.37,0.25,0.25),(yi-nyi)/jointHPercentage+0.2);\n}\nelse if (xi<nxi+jointWPercentage && xi>nxi-jointWPercentage){\ncolor=mix(jointColor,vec3(0.44,0.44,0.44),(xi-nxi)/jointWPercentage+0.2);\n}\nelse {\nfloat brickColorSwitch=mod(floor(yi)+floor(xi),3.0);\nif (brickColorSwitch == 0.0)\ncolor=mix(color,vec3(0.33,0.33,0.33),0.3);\nelse if (brickColorSwitch == 2.0)\ncolor=mix(color,vec3(0.11,0.11,0.11),0.3);\n}\ngl_FragColor=vec4(color,1.0);\n}";n.Effect.ShadersStore.brickProceduralTexturePixelShader=i;var a=function(e){function r(r,t,o,i,a){var l=e.call(this,r,t,"brickProceduralTexture",o,i,a)||this;return l._numberOfBricksHeight=15,l._numberOfBricksWidth=5,l._jointColor=new n.Color3(.72,.72,.72),l._brickColor=new n.Color3(.77,.47,.4),l.updateShaderUniforms(),l}return Object(o.b)(r,e),r.prototype.updateShaderUniforms=function(){this.setFloat("numberOfBricksHeight",this._numberOfBricksHeight),this.setFloat("numberOfBricksWidth",this._numberOfBricksWidth),this.setColor3("brickColor",this._brickColor),this.setColor3("jointColor",this._jointColor)},Object.defineProperty(r.prototype,"numberOfBricksHeight",{get:function(){return this._numberOfBricksHeight},set:function(e){this._numberOfBricksHeight=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"numberOfBricksWidth",{get:function(){return this._numberOfBricksWidth},set:function(e){this._numberOfBricksWidth=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"jointColor",{get:function(){return this._jointColor},set:function(e){this._jointColor=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"brickColor",{get:function(){return this._brickColor},set:function(e){this._brickColor=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),r.prototype.serialize=function(){var r=n.SerializationHelper.Serialize(this,e.prototype.serialize.call(this));return r.customType="BABYLON.BrickProceduralTexture",r},r.Parse=function(e,t,o){return n.SerializationHelper.Parse((function(){return new r(e.name,e._size,t,void 0,e._generateMipMaps)}),e,t,o)},Object(o.a)([Object(n.serialize)()],r.prototype,"numberOfBricksHeight",null),Object(o.a)([Object(n.serialize)()],r.prototype,"numberOfBricksWidth",null),Object(o.a)([Object(n.serializeAsColor3)()],r.prototype,"jointColor",null),Object(o.a)([Object(n.serializeAsColor3)()],r.prototype,"brickColor",null),r}(n.ProceduralTexture);n._TypeStore.RegisteredTypes["BABYLON.BrickProceduralTexture"]=a},function(e,r,t){"use strict";t.r(r),t.d(r,"CloudProceduralTexture",(function(){return a}));var o=t(1),n=t(0),i="precision highp float;\nvarying vec2 vUV;\nuniform vec4 skyColor;\nuniform vec4 cloudColor;\nfloat rand(vec2 n) {\nreturn fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);\n}\nfloat noise(vec2 n) {\nconst vec2 d=vec2(0.0,1.0);\nvec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));\nreturn mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);\n}\nfloat fbm(vec2 n) {\nfloat total=0.0,amplitude=1.0;\nfor (int i=0; i<4; i++) {\ntotal+=noise(n)*amplitude;\nn+=n;\namplitude*=0.5;\n}\nreturn total;\n}\nvoid main() {\nvec2 p=vUV*12.0;\nvec4 c=mix(skyColor,cloudColor,fbm(p));\ngl_FragColor=c;\n}\n";n.Effect.ShadersStore.cloudProceduralTexturePixelShader=i;var a=function(e){function r(r,t,o,i,a){var l=e.call(this,r,t,"cloudProceduralTexture",o,i,a)||this;return l._skyColor=new n.Color4(.15,.68,1,1),l._cloudColor=new n.Color4(1,1,1,1),l.updateShaderUniforms(),l}return Object(o.b)(r,e),r.prototype.updateShaderUniforms=function(){this.setColor4("skyColor",this._skyColor),this.setColor4("cloudColor",this._cloudColor)},Object.defineProperty(r.prototype,"skyColor",{get:function(){return this._skyColor},set:function(e){this._skyColor=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"cloudColor",{get:function(){return this._cloudColor},set:function(e){this._cloudColor=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),r.prototype.serialize=function(){var r=n.SerializationHelper.Serialize(this,e.prototype.serialize.call(this));return r.customType="BABYLON.CloudProceduralTexture",r},r.Parse=function(e,t,o){return n.SerializationHelper.Parse((function(){return new r(e.name,e._size,t,void 0,e._generateMipMaps)}),e,t,o)},Object(o.a)([Object(n.serializeAsColor4)()],r.prototype,"skyColor",null),Object(o.a)([Object(n.serializeAsColor4)()],r.prototype,"cloudColor",null),r}(n.ProceduralTexture);n._TypeStore.RegisteredTypes["BABYLON.CloudProceduralTexture"]=a},function(e,r,t){"use strict";t.r(r),t.d(r,"FireProceduralTexture",(function(){return a}));var o=t(1),n=t(0),i="precision highp float;\nuniform float time;\nuniform vec3 c1;\nuniform vec3 c2;\nuniform vec3 c3;\nuniform vec3 c4;\nuniform vec3 c5;\nuniform vec3 c6;\nuniform vec2 speed;\nuniform float shift;\nuniform float alphaThreshold;\nvarying vec2 vUV;\nfloat rand(vec2 n) {\nreturn fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);\n}\nfloat noise(vec2 n) {\nconst vec2 d=vec2(0.0,1.0);\nvec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));\nreturn mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);\n}\nfloat fbm(vec2 n) {\nfloat total=0.0,amplitude=1.0;\nfor (int i=0; i<4; i++) {\ntotal+=noise(n)*amplitude;\nn+=n;\namplitude*=0.5;\n}\nreturn total;\n}\nvoid main() {\nvec2 p=vUV*8.0;\nfloat q=fbm(p-time*0.1);\nvec2 r=vec2(fbm(p+q+time*speed.x-p.x-p.y),fbm(p+q-time*speed.y));\nvec3 c=mix(c1,c2,fbm(p+r))+mix(c3,c4,r.x)-mix(c5,c6,r.y);\nvec3 color=c*cos(shift*vUV.y);\nfloat luminance=dot(color.rgb,vec3(0.3,0.59,0.11));\ngl_FragColor=vec4(color,luminance*alphaThreshold+(1.0-alphaThreshold));\n}";n.Effect.ShadersStore.fireProceduralTexturePixelShader=i;var a=function(e){function r(t,o,i,a,l){var u=e.call(this,t,o,"fireProceduralTexture",i,a,l)||this;return u._time=0,u._speed=new n.Vector2(.5,.3),u._autoGenerateTime=!0,u._alphaThreshold=.5,u._fireColors=r.RedFireColors,u.updateShaderUniforms(),u}return Object(o.b)(r,e),r.prototype.updateShaderUniforms=function(){this.setFloat("time",this._time),this.setVector2("speed",this._speed),this.setColor3("c1",this._fireColors[0]),this.setColor3("c2",this._fireColors[1]),this.setColor3("c3",this._fireColors[2]),this.setColor3("c4",this._fireColors[3]),this.setColor3("c5",this._fireColors[4]),this.setColor3("c6",this._fireColors[5]),this.setFloat("alphaThreshold",this._alphaThreshold)},r.prototype.render=function(r){var t=this.getScene();this._autoGenerateTime&&t&&(this._time+=.03*t.getAnimationRatio(),this.updateShaderUniforms()),e.prototype.render.call(this,r)},Object.defineProperty(r,"PurpleFireColors",{get:function(){return[new n.Color3(.5,0,1),new n.Color3(.9,0,1),new n.Color3(.2,0,1),new n.Color3(1,.9,1),new n.Color3(.1,.1,1),new n.Color3(.9,.9,1)]},enumerable:!1,configurable:!0}),Object.defineProperty(r,"GreenFireColors",{get:function(){return[new n.Color3(.5,1,0),new n.Color3(.5,1,0),new n.Color3(.3,.4,0),new n.Color3(.5,1,0),new n.Color3(.2,0,0),new n.Color3(.5,1,0)]},enumerable:!1,configurable:!0}),Object.defineProperty(r,"RedFireColors",{get:function(){return[new n.Color3(.5,0,.1),new n.Color3(.9,0,0),new n.Color3(.2,0,0),new n.Color3(1,.9,0),new n.Color3(.1,.1,.1),new n.Color3(.9,.9,.9)]},enumerable:!1,configurable:!0}),Object.defineProperty(r,"BlueFireColors",{get:function(){return[new n.Color3(.1,0,.5),new n.Color3(0,0,.5),new n.Color3(.1,0,.2),new n.Color3(0,0,1),new n.Color3(.1,.2,.3),new n.Color3(0,.2,.9)]},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"autoGenerateTime",{get:function(){return this._autoGenerateTime},set:function(e){this._autoGenerateTime=e},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"fireColors",{get:function(){return this._fireColors},set:function(e){this._fireColors=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"time",{get:function(){return this._time},set:function(e){this._time=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"speed",{get:function(){return this._speed},set:function(e){this._speed=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"alphaThreshold",{get:function(){return this._alphaThreshold},set:function(e){this._alphaThreshold=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),r.prototype.serialize=function(){var r=n.SerializationHelper.Serialize(this,e.prototype.serialize.call(this));r.customType="BABYLON.FireProceduralTexture",r.fireColors=[];for(var t=0;t<this._fireColors.length;t++)r.fireColors.push(this._fireColors[t].asArray());return r},r.Parse=function(e,t,o){for(var i=n.SerializationHelper.Parse((function(){return new r(e.name,e._size,t,void 0,e._generateMipMaps)}),e,t,o),a=[],l=0;l<e.fireColors.length;l++)a.push(n.Color3.FromArray(e.fireColors[l]));return i.fireColors=a,i},Object(o.a)([Object(n.serialize)()],r.prototype,"autoGenerateTime",null),Object(o.a)([Object(n.serialize)()],r.prototype,"time",null),Object(o.a)([Object(n.serializeAsVector2)()],r.prototype,"speed",null),Object(o.a)([Object(n.serialize)()],r.prototype,"alphaThreshold",null),r}(n.ProceduralTexture);n._TypeStore.RegisteredTypes["BABYLON.FireProceduralTexture"]=a},function(e,r,t){"use strict";t.r(r),t.d(r,"GrassProceduralTexture",(function(){return a}));var o=t(1),n=t(0),i="precision highp float;\nvarying vec2 vPosition;\nvarying vec2 vUV;\nuniform vec3 herb1Color;\nuniform vec3 herb2Color;\nuniform vec3 herb3Color;\nuniform vec3 groundColor;\nfloat rand(vec2 n) {\nreturn fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);\n}\nfloat noise(vec2 n) {\nconst vec2 d=vec2(0.0,1.0);\nvec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));\nreturn mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);\n}\nfloat fbm(vec2 n) {\nfloat total=0.0,amplitude=1.0;\nfor (int i=0; i<4; i++) {\ntotal+=noise(n)*amplitude;\nn+=n;\namplitude*=0.5;\n}\nreturn total;\n}\nvoid main(void) {\nvec3 color=mix(groundColor,herb1Color,rand(gl_FragCoord.xy*4.0));\ncolor=mix(color,herb2Color,rand(gl_FragCoord.xy*8.0));\ncolor=mix(color,herb3Color,rand(gl_FragCoord.xy));\ncolor=mix(color,herb1Color,fbm(gl_FragCoord.xy*16.0));\ngl_FragColor=vec4(color,1.0);\n}";n.Effect.ShadersStore.grassProceduralTexturePixelShader=i;var a=function(e){function r(r,t,o,i,a){var l=e.call(this,r,t,"grassProceduralTexture",o,i,a)||this;return l._groundColor=new n.Color3(1,1,1),l._grassColors=[new n.Color3(.29,.38,.02),new n.Color3(.36,.49,.09),new n.Color3(.51,.6,.28)],l.updateShaderUniforms(),l}return Object(o.b)(r,e),r.prototype.updateShaderUniforms=function(){this.setColor3("herb1Color",this._grassColors[0]),this.setColor3("herb2Color",this._grassColors[1]),this.setColor3("herb3Color",this._grassColors[2]),this.setColor3("groundColor",this._groundColor)},Object.defineProperty(r.prototype,"grassColors",{get:function(){return this._grassColors},set:function(e){this._grassColors=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"groundColor",{get:function(){return this._groundColor},set:function(e){this._groundColor=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),r.prototype.serialize=function(){var r=n.SerializationHelper.Serialize(this,e.prototype.serialize.call(this));r.customType="BABYLON.GrassProceduralTexture",r.grassColors=[];for(var t=0;t<this._grassColors.length;t++)r.grassColors.push(this._grassColors[t].asArray());return r},r.Parse=function(e,t,o){for(var i=n.SerializationHelper.Parse((function(){return new r(e.name,e._size,t,void 0,e._generateMipMaps)}),e,t,o),a=[],l=0;l<e.grassColors.length;l++)a.push(n.Color3.FromArray(e.grassColors[l]));return i.grassColors=a,i},Object(o.a)([Object(n.serializeAsColor3)()],r.prototype,"groundColor",null),r}(n.ProceduralTexture);n._TypeStore.RegisteredTypes["BABYLON.GrassProceduralTexture"]=a},function(e,r,t){"use strict";t.r(r),t.d(r,"MarbleProceduralTexture",(function(){return a}));var o=t(1),n=t(0),i="precision highp float;\nvarying vec2 vPosition;\nvarying vec2 vUV;\nuniform float numberOfTilesHeight;\nuniform float numberOfTilesWidth;\nuniform float amplitude;\nuniform vec3 marbleColor;\nuniform vec3 jointColor;\nconst vec3 tileSize=vec3(1.1,1.0,1.1);\nconst vec3 tilePct=vec3(0.98,1.0,0.98);\nfloat rand(vec2 n) {\nreturn fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);\n}\nfloat noise(vec2 n) {\nconst vec2 d=vec2(0.0,1.0);\nvec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));\nreturn mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);\n}\nfloat turbulence(vec2 P)\n{\nfloat val=0.0;\nfloat freq=1.0;\nfor (int i=0; i<4; i++)\n{\nval+=abs(noise(P*freq)/freq);\nfreq*=2.07;\n}\nreturn val;\n}\nfloat roundF(float number){\nreturn sign(number)*floor(abs(number)+0.5);\n}\nvec3 marble_color(float x)\n{\nvec3 col;\nx=0.5*(x+1.);\nx=sqrt(x);\nx=sqrt(x);\nx=sqrt(x);\ncol=vec3(.2+.75*x);\ncol.b*=0.95;\nreturn col;\n}\nvoid main()\n{\nfloat brickW=1.0/numberOfTilesWidth;\nfloat brickH=1.0/numberOfTilesHeight;\nfloat jointWPercentage=0.01;\nfloat jointHPercentage=0.01;\nvec3 color=marbleColor;\nfloat yi=vUV.y/brickH;\nfloat nyi=roundF(yi);\nfloat xi=vUV.x/brickW;\nif (mod(floor(yi),2.0) == 0.0){\nxi=xi-0.5;\n}\nfloat nxi=roundF(xi);\nvec2 brickvUV=vec2((xi-floor(xi))/brickH,(yi-floor(yi))/brickW);\nif (yi<nyi+jointHPercentage && yi>nyi-jointHPercentage){\ncolor=mix(jointColor,vec3(0.37,0.25,0.25),(yi-nyi)/jointHPercentage+0.2);\n}\nelse if (xi<nxi+jointWPercentage && xi>nxi-jointWPercentage){\ncolor=mix(jointColor,vec3(0.44,0.44,0.44),(xi-nxi)/jointWPercentage+0.2);\n}\nelse {\nfloat t=6.28*brickvUV.x/(tileSize.x+noise(vec2(vUV)*6.0));\nt+=amplitude*turbulence(brickvUV.xy);\nt=sin(t);\ncolor=marble_color(t);\n}\ngl_FragColor=vec4(color,0.0);\n}";n.Effect.ShadersStore.marbleProceduralTexturePixelShader=i;var a=function(e){function r(r,t,o,i,a){var l=e.call(this,r,t,"marbleProceduralTexture",o,i,a)||this;return l._numberOfTilesHeight=3,l._numberOfTilesWidth=3,l._amplitude=9,l._jointColor=new n.Color3(.72,.72,.72),l.updateShaderUniforms(),l}return Object(o.b)(r,e),r.prototype.updateShaderUniforms=function(){this.setFloat("numberOfTilesHeight",this._numberOfTilesHeight),this.setFloat("numberOfTilesWidth",this._numberOfTilesWidth),this.setFloat("amplitude",this._amplitude),this.setColor3("jointColor",this._jointColor)},Object.defineProperty(r.prototype,"numberOfTilesHeight",{get:function(){return this._numberOfTilesHeight},set:function(e){this._numberOfTilesHeight=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"amplitude",{get:function(){return this._amplitude},set:function(e){this._amplitude=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"numberOfTilesWidth",{get:function(){return this._numberOfTilesWidth},set:function(e){this._numberOfTilesWidth=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"jointColor",{get:function(){return this._jointColor},set:function(e){this._jointColor=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),r.prototype.serialize=function(){var r=n.SerializationHelper.Serialize(this,e.prototype.serialize.call(this));return r.customType="BABYLON.MarbleProceduralTexture",r},r.Parse=function(e,t,o){return n.SerializationHelper.Parse((function(){return new r(e.name,e._size,t,void 0,e._generateMipMaps)}),e,t,o)},Object(o.a)([Object(n.serialize)()],r.prototype,"numberOfTilesHeight",null),Object(o.a)([Object(n.serialize)()],r.prototype,"amplitude",null),Object(o.a)([Object(n.serialize)()],r.prototype,"numberOfTilesWidth",null),Object(o.a)([Object(n.serialize)()],r.prototype,"jointColor",null),r}(n.ProceduralTexture);n._TypeStore.RegisteredTypes["BABYLON.MarbleProceduralTexture"]=a},function(e,r,t){"use strict";t.r(r),t.d(r,"NormalMapProceduralTexture",(function(){return a}));var o=t(1),n=t(0),i="precision highp float;\n\nuniform sampler2D baseSampler;\nuniform float size;\n\nvarying vec2 vUV;\n\nconst vec3 LUMA_COEFFICIENT=vec3(0.2126,0.7152,0.0722);\nfloat lumaAtCoord(vec2 coord)\n{\nvec3 pixel=texture2D(baseSampler,coord).rgb;\nfloat luma=dot(pixel,LUMA_COEFFICIENT);\nreturn luma;\n}\nvoid main()\n{\nfloat lumaU0=lumaAtCoord(vUV+vec2(-1.0,0.0)/size);\nfloat lumaU1=lumaAtCoord(vUV+vec2( 1.0,0.0)/size);\nfloat lumaV0=lumaAtCoord(vUV+vec2( 0.0,-1.0)/size);\nfloat lumaV1=lumaAtCoord(vUV+vec2( 0.0,1.0)/size);\nvec2 slope=(vec2(lumaU0-lumaU1,lumaV0-lumaV1)+1.0)*0.5;\ngl_FragColor=vec4(slope,1.0,1.0);\n}\n";n.Effect.ShadersStore.normalMapProceduralTexturePixelShader=i;var a=function(e){function r(r,t,o,n,i){var a=e.call(this,r,t,"normalMapProceduralTexture",o,n,i)||this;return a.updateShaderUniforms(),a}return Object(o.b)(r,e),r.prototype.updateShaderUniforms=function(){this.setTexture("baseSampler",this._baseTexture),this.setFloat("size",this.getRenderSize())},r.prototype.render=function(r){e.prototype.render.call(this,r)},r.prototype.resize=function(r,t){e.prototype.resize.call(this,r,t),this.updateShaderUniforms()},Object.defineProperty(r.prototype,"baseTexture",{get:function(){return this._baseTexture},set:function(e){this._baseTexture=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),r.prototype.serialize=function(){var r=n.SerializationHelper.Serialize(this,e.prototype.serialize.call(this));return r.customType="BABYLON.NormalMapProceduralTexture",r},r.Parse=function(e,t,o){return n.SerializationHelper.Parse((function(){return new r(e.name,e._size,t,void 0,e._generateMipMaps)}),e,t,o)},Object(o.a)([Object(n.serializeAsTexture)()],r.prototype,"baseTexture",null),r}(n.ProceduralTexture);n._TypeStore.RegisteredTypes["BABYLON.NormalMapProceduralTexture"]=a},function(e,r,t){"use strict";t.r(r),t.d(r,"PerlinNoiseProceduralTexture",(function(){return a}));var o=t(1),n=t(0),i="\nprecision highp float;\n\nuniform float size;\nuniform float time;\nuniform float translationSpeed;\n\nvarying vec2 vUV;\n\nfloat r(float n)\n{\nreturn fract(cos(n*89.42)*343.42);\n}\nvec2 r(vec2 n)\n{\nreturn vec2(r(n.x*23.62-300.0+n.y*34.35),r(n.x*45.13+256.0+n.y*38.89));\n}\nfloat worley(vec2 n,float s)\n{\nfloat dis=1.0;\nfor(int x=-1; x<=1; x++)\n{\nfor(int y=-1; y<=1; y++)\n{\nvec2 p=floor(n/s)+vec2(x,y);\nfloat d=length(r(p)+vec2(x,y)-fract(n/s));\nif (dis>d)\ndis=d;\n}\n}\nreturn 1.0-dis;\n}\nvec3 hash33(vec3 p3)\n{\np3=fract(p3*vec3(0.1031,0.11369,0.13787));\np3+=dot(p3,p3.yxz+19.19);\nreturn -1.0+2.0*fract(vec3((p3.x+p3.y)*p3.z,(p3.x+p3.z)*p3.y,(p3.y+p3.z)*p3.x));\n}\nfloat perlinNoise(vec3 p)\n{\nvec3 pi=floor(p);\nvec3 pf=p-pi;\nvec3 w=pf*pf*(3.0-2.0*pf);\nreturn mix(\nmix(\nmix(\ndot(pf-vec3(0,0,0),hash33(pi+vec3(0,0,0))),\ndot(pf-vec3(1,0,0),hash33(pi+vec3(1,0,0))),\nw.x\n),\nmix(\ndot(pf-vec3(0,0,1),hash33(pi+vec3(0,0,1))),\ndot(pf-vec3(1,0,1),hash33(pi+vec3(1,0,1))),\nw.x\n),\nw.z\n),\nmix(\nmix(\ndot(pf-vec3(0,1,0),hash33(pi+vec3(0,1,0))),\ndot(pf-vec3(1,1,0),hash33(pi+vec3(1,1,0))),\nw.x\n),\nmix(\ndot(pf-vec3(0,1,1),hash33(pi+vec3(0,1,1))),\ndot(pf-vec3(1,1,1),hash33(pi+vec3(1,1,1))),\nw.x\n),\nw.z\n),\nw.y\n);\n}\n\nvoid main(void)\n{\nvec2 uv=gl_FragCoord.xy+translationSpeed;\nfloat dis=(\n1.0+perlinNoise(vec3(uv/vec2(size,size),time*0.05)*8.0))\n*(1.0+(worley(uv,32.0)+ 0.5*worley(2.0*uv,32.0)+0.25*worley(4.0*uv,32.0))\n);\ngl_FragColor=vec4(vec3(dis/4.0),1.0);\n}\n";n.Effect.ShadersStore.perlinNoiseProceduralTexturePixelShader=i;var a=function(e){function r(r,t,o,n,i){var a=e.call(this,r,t,"perlinNoiseProceduralTexture",o,n,i)||this;return a.time=0,a.timeScale=1,a.translationSpeed=1,a._currentTranslation=0,a.updateShaderUniforms(),a}return Object(o.b)(r,e),r.prototype.updateShaderUniforms=function(){this.setFloat("size",this.getRenderSize());var e=this.getScene();if(e){var r=e.getEngine().getDeltaTime();this.time+=r,this.setFloat("time",this.time*this.timeScale/1e3),this._currentTranslation+=r*this.translationSpeed/1e3,this.setFloat("translationSpeed",this._currentTranslation)}},r.prototype.render=function(r){this.updateShaderUniforms(),e.prototype.render.call(this,r)},r.prototype.resize=function(r,t){e.prototype.resize.call(this,r,t)},r.prototype.serialize=function(){var r=n.SerializationHelper.Serialize(this,e.prototype.serialize.call(this));return r.customType="BABYLON.PerlinNoiseProceduralTexture",r},r.Parse=function(e,t,o){return n.SerializationHelper.Parse((function(){return new r(e.name,e._size,t,void 0,e._generateMipMaps)}),e,t,o)},Object(o.a)([Object(n.serialize)()],r.prototype,"time",void 0),Object(o.a)([Object(n.serialize)()],r.prototype,"timeScale",void 0),Object(o.a)([Object(n.serialize)()],r.prototype,"translationSpeed",void 0),r}(n.ProceduralTexture);n._TypeStore.RegisteredTypes["BABYLON.PerlinNoiseProceduralTexture"]=a},function(e,r,t){"use strict";t.r(r),t.d(r,"RoadProceduralTexture",(function(){return a}));var o=t(1),n=t(0),i="precision highp float;\nvarying vec2 vUV;\nuniform vec3 roadColor;\nfloat rand(vec2 n) {\nreturn fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);\n}\nfloat noise(vec2 n) {\nconst vec2 d=vec2(0.0,1.0);\nvec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));\nreturn mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);\n}\nfloat fbm(vec2 n) {\nfloat total=0.0,amplitude=1.0;\nfor (int i=0; i<4; i++) {\ntotal+=noise(n)*amplitude;\nn+=n;\namplitude*=0.5;\n}\nreturn total;\n}\nvoid main(void) {\nfloat ratioy=mod(gl_FragCoord.y*100.0 ,fbm(vUV*2.0));\nvec3 color=roadColor*ratioy;\ngl_FragColor=vec4(color,1.0);\n}";n.Effect.ShadersStore.roadProceduralTexturePixelShader=i;var a=function(e){function r(r,t,o,i,a){var l=e.call(this,r,t,"roadProceduralTexture",o,i,a)||this;return l._roadColor=new n.Color3(.53,.53,.53),l.updateShaderUniforms(),l}return Object(o.b)(r,e),r.prototype.updateShaderUniforms=function(){this.setColor3("roadColor",this._roadColor)},Object.defineProperty(r.prototype,"roadColor",{get:function(){return this._roadColor},set:function(e){this._roadColor=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),r.prototype.serialize=function(){var r=n.SerializationHelper.Serialize(this,e.prototype.serialize.call(this));return r.customType="BABYLON.RoadProceduralTexture",r},r.Parse=function(e,t,o){return n.SerializationHelper.Parse((function(){return new r(e.name,e._size,t,void 0,e._generateMipMaps)}),e,t,o)},Object(o.a)([Object(n.serializeAsColor3)()],r.prototype,"roadColor",null),r}(n.ProceduralTexture);n._TypeStore.RegisteredTypes["BABYLON.RoadProceduralTexture"]=a},function(e,r,t){"use strict";t.r(r),t.d(r,"StarfieldProceduralTexture",(function(){return a}));var o=t(1),n=t(0),i="precision highp float;\n\n#define volsteps 20\n#define iterations 15\nvarying vec2 vPosition;\nvarying vec2 vUV;\nuniform float time;\nuniform float alpha;\nuniform float beta;\nuniform float zoom;\nuniform float formuparam;\nuniform float stepsize;\nuniform float tile;\nuniform float brightness;\nuniform float darkmatter;\nuniform float distfading;\nuniform float saturation;\nvoid main()\n{\nvec3 dir=vec3(vUV*zoom,1.);\nfloat localTime=time*0.0001;\n\nmat2 rot1=mat2(cos(alpha),sin(alpha),-sin(alpha),cos(alpha));\nmat2 rot2=mat2(cos(beta),sin(beta),-sin(beta),cos(beta));\ndir.xz*=rot1;\ndir.xy*=rot2;\nvec3 from=vec3(1.,.5,0.5);\nfrom+=vec3(-2.,localTime*2.,localTime);\nfrom.xz*=rot1;\nfrom.xy*=rot2;\n\nfloat s=0.1,fade=1.;\nvec3 v=vec3(0.);\nfor (int r=0; r<volsteps; r++) {\nvec3 p=from+s*dir*.5;\np=abs(vec3(tile)-mod(p,vec3(tile*2.)));\nfloat pa,a=pa=0.;\nfor (int i=0; i<iterations; i++) {\np=abs(p)/dot(p,p)-formuparam;\na+=abs(length(p)-pa);\npa=length(p);\n}\nfloat dm=max(0.,darkmatter-a*a*.001);\na*=a*a;\nif (r>6) fade*=1.-dm;\n\nv+=fade;\nv+=vec3(s,s*s,s*s*s*s)*a*brightness*fade;\nfade*=distfading;\ns+=stepsize;\n}\nv=mix(vec3(length(v)),v,saturation);\ngl_FragColor=vec4(v*.01,1.);\n}";n.Effect.ShadersStore.starfieldProceduralTexturePixelShader=i;var a=function(e){function r(r,t,o,n,i){var a=e.call(this,r,t,"starfieldProceduralTexture",o,n,i)||this;return a._time=1,a._alpha=.5,a._beta=.8,a._zoom=.8,a._formuparam=.53,a._stepsize=.1,a._tile=.85,a._brightness=.0015,a._darkmatter=.4,a._distfading=.73,a._saturation=.85,a.updateShaderUniforms(),a}return Object(o.b)(r,e),r.prototype.updateShaderUniforms=function(){this.setFloat("time",this._time),this.setFloat("alpha",this._alpha),this.setFloat("beta",this._beta),this.setFloat("zoom",this._zoom),this.setFloat("formuparam",this._formuparam),this.setFloat("stepsize",this._stepsize),this.setFloat("tile",this._tile),this.setFloat("brightness",this._brightness),this.setFloat("darkmatter",this._darkmatter),this.setFloat("distfading",this._distfading),this.setFloat("saturation",this._saturation)},Object.defineProperty(r.prototype,"time",{get:function(){return this._time},set:function(e){this._time=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"alpha",{get:function(){return this._alpha},set:function(e){this._alpha=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"beta",{get:function(){return this._beta},set:function(e){this._beta=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"formuparam",{get:function(){return this._formuparam},set:function(e){this._formuparam=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"stepsize",{get:function(){return this._stepsize},set:function(e){this._stepsize=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"zoom",{get:function(){return this._zoom},set:function(e){this._zoom=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"tile",{get:function(){return this._tile},set:function(e){this._tile=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"brightness",{get:function(){return this._brightness},set:function(e){this._brightness=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"darkmatter",{get:function(){return this._darkmatter},set:function(e){this._darkmatter=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"distfading",{get:function(){return this._distfading},set:function(e){this._distfading=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"saturation",{get:function(){return this._saturation},set:function(e){this._saturation=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),r.prototype.serialize=function(){var r=n.SerializationHelper.Serialize(this,e.prototype.serialize.call(this));return r.customType="BABYLON.StarfieldProceduralTexture",r},r.Parse=function(e,t,o){return n.SerializationHelper.Parse((function(){return new r(e.name,e._size,t,void 0,e._generateMipMaps)}),e,t,o)},Object(o.a)([Object(n.serialize)()],r.prototype,"time",null),Object(o.a)([Object(n.serialize)()],r.prototype,"alpha",null),Object(o.a)([Object(n.serialize)()],r.prototype,"beta",null),Object(o.a)([Object(n.serialize)()],r.prototype,"formuparam",null),Object(o.a)([Object(n.serialize)()],r.prototype,"stepsize",null),Object(o.a)([Object(n.serialize)()],r.prototype,"zoom",null),Object(o.a)([Object(n.serialize)()],r.prototype,"tile",null),Object(o.a)([Object(n.serialize)()],r.prototype,"brightness",null),Object(o.a)([Object(n.serialize)()],r.prototype,"darkmatter",null),Object(o.a)([Object(n.serialize)()],r.prototype,"distfading",null),Object(o.a)([Object(n.serialize)()],r.prototype,"saturation",null),r}(n.ProceduralTexture);n._TypeStore.RegisteredTypes["BABYLON.StarfieldProceduralTexture"]=a},function(e,r,t){"use strict";t.r(r),t.d(r,"WoodProceduralTexture",(function(){return a}));var o=t(1),n=t(0),i="precision highp float;\nvarying vec2 vPosition;\nvarying vec2 vUV;\nuniform float ampScale;\nuniform vec3 woodColor;\nfloat rand(vec2 n) {\nreturn fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);\n}\nfloat noise(vec2 n) {\nconst vec2 d=vec2(0.0,1.0);\nvec2 b=floor(n),f=smoothstep(vec2(0.0),vec2(1.0),fract(n));\nreturn mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);\n}\nfloat fbm(vec2 n) {\nfloat total=0.0,amplitude=1.0;\nfor (int i=0; i<4; i++) {\ntotal+=noise(n)*amplitude;\nn+=n;\namplitude*=0.5;\n}\nreturn total;\n}\nvoid main(void) {\nfloat ratioy=mod(vUV.x*ampScale,2.0+fbm(vUV*0.8));\nvec3 wood=woodColor*ratioy;\ngl_FragColor=vec4(wood,1.0);\n}";n.Effect.ShadersStore.woodProceduralTexturePixelShader=i;var a=function(e){function r(r,t,o,i,a){var l=e.call(this,r,t,"woodProceduralTexture",o,i,a)||this;return l._ampScale=100,l._woodColor=new n.Color3(.32,.17,.09),l.updateShaderUniforms(),l}return Object(o.b)(r,e),r.prototype.updateShaderUniforms=function(){this.setFloat("ampScale",this._ampScale),this.setColor3("woodColor",this._woodColor)},Object.defineProperty(r.prototype,"ampScale",{get:function(){return this._ampScale},set:function(e){this._ampScale=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"woodColor",{get:function(){return this._woodColor},set:function(e){this._woodColor=e,this.updateShaderUniforms()},enumerable:!1,configurable:!0}),r.prototype.serialize=function(){var r=n.SerializationHelper.Serialize(this,e.prototype.serialize.call(this));return r.customType="BABYLON.WoodProceduralTexture",r},r.Parse=function(e,t,o){return n.SerializationHelper.Parse((function(){return new r(e.name,e._size,t,void 0,e._generateMipMaps)}),e,t,o)},Object(o.a)([Object(n.serialize)()],r.prototype,"ampScale",null),Object(o.a)([Object(n.serializeAsColor3)()],r.prototype,"woodColor",null),r}(n.ProceduralTexture);n._TypeStore.RegisteredTypes["BABYLON.WoodProceduralTexture"]=a},function(e,r,t){"use strict";t.r(r);var o=t(3);t.d(r,"BrickProceduralTexture",(function(){return o.BrickProceduralTexture}));var n=t(4);t.d(r,"CloudProceduralTexture",(function(){return n.CloudProceduralTexture}));var i=t(5);t.d(r,"FireProceduralTexture",(function(){return i.FireProceduralTexture}));var a=t(6);t.d(r,"GrassProceduralTexture",(function(){return a.GrassProceduralTexture}));var l=t(7);t.d(r,"MarbleProceduralTexture",(function(){return l.MarbleProceduralTexture}));var u=t(8);t.d(r,"NormalMapProceduralTexture",(function(){return u.NormalMapProceduralTexture}));var c=t(9);t.d(r,"PerlinNoiseProceduralTexture",(function(){return c.PerlinNoiseProceduralTexture}));var s=t(10);t.d(r,"RoadProceduralTexture",(function(){return s.RoadProceduralTexture}));var f=t(11);t.d(r,"StarfieldProceduralTexture",(function(){return f.StarfieldProceduralTexture}));var d=t(12);t.d(r,"WoodProceduralTexture",(function(){return d.WoodProceduralTexture}))},function(e,r,t){"use strict";t.r(r),function(e){var o=t(13);t.d(r,"BrickProceduralTexture",(function(){return o.BrickProceduralTexture})),t.d(r,"CloudProceduralTexture",(function(){return o.CloudProceduralTexture})),t.d(r,"FireProceduralTexture",(function(){return o.FireProceduralTexture})),t.d(r,"GrassProceduralTexture",(function(){return o.GrassProceduralTexture})),t.d(r,"MarbleProceduralTexture",(function(){return o.MarbleProceduralTexture})),t.d(r,"NormalMapProceduralTexture",(function(){return o.NormalMapProceduralTexture})),t.d(r,"PerlinNoiseProceduralTexture",(function(){return o.PerlinNoiseProceduralTexture})),t.d(r,"RoadProceduralTexture",(function(){return o.RoadProceduralTexture})),t.d(r,"StarfieldProceduralTexture",(function(){return o.StarfieldProceduralTexture})),t.d(r,"WoodProceduralTexture",(function(){return o.WoodProceduralTexture}));var n=void 0!==e?e:"undefined"!=typeof window?window:void 0;if(void 0!==n)for(var i in n.BABYLON=n.BABYLON||{},o)n.BABYLON[i]=o[i]}.call(this,t(2))}])}));