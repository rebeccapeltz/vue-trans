(function(t){function e(e){for(var r,i,u=e[0],s=e[1],l=e[2],p=0,f=[];p<u.length;p++)i=u[p],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&f.push(a[i][0]),a[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r]);c&&c(e);while(f.length)f.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,u=1;u<n.length;u++){var s=n[u];0!==a[s]&&(r=!1)}r&&(o.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},a={app:0},o=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],s=u.push.bind(u);u.push=e,u=u.slice();for(var l=0;l<u.length;l++)e(u[l]);var c=s;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("64a9"),a=n.n(r);a.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("img",{attrs:{alt:"Vue logo",src:n("cf05")}}),r("UploadForm")],1)},o=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"upload"},[n("div",{staticClass:"container"},[t.isInitial?n("form",{attrs:{enctype:"multipart/form-data",novalidate:""}},[n("h1",[t._v("Upload images")]),n("div",{staticClass:"dropbox"},[n("input",{staticClass:"input-file",attrs:{type:"file",name:t.uploadFieldName,disabled:t.isSaving,accept:"image/*"},on:{change:function(e){t.filesChange(e.target.name,e.target.files),t.fileCount=e.target.files.length}}}),t.isInitial?n("p",[t._v("\n          Drag your file(s) here to begin\n          "),n("br"),t._v("or click to browse\n        ")]):t._e(),t.isSaving?n("p",[t._v("Uploading "+t._s(t.fileCount)+" files...")]):t._e()])]):t._e()]),t.result&&t.result.photo_url?n("div",[n("img",{attrs:{src:t.result.photo_url,alt:"uploaded photo"}})]):t._e(),n("div",[t._v(t._s(t.result))])])},u=[],s=(n("7f7f"),n("ac6a"),n("5df3"),n("1c4c"),n("bc3a")),l=0,c=1,p=2,f=3,d={name:"UploadForm",data:function(){return{result:null,uploadError:null,currentStatus:null,uploadFieldName:"singleFile"}},computed:{isInitial:function(){return this.currentStatus===l},isSaving:function(){return this.currentStatus===c},isSuccess:function(){return this.currentStatus===p},isFailed:function(){return this.currentStatus===f}},methods:{reset:function(){this.currentStatus=l,this.uploadError=null},save:function(t){var e=this;this.currentStatus=c;var n="/api/upload/single";s["post"](n,t).then((function(t){e.result=t.data,e.currentStatus=p,e.reset()})).catch((function(t){e.uploadError=t.response,e.currentStatus=f}))},filesChange:function(t,e){var n=new FormData;e.length&&(Array.from(Array(e.length).keys()).map((function(r){n.append(t,e[r],e[r].name)})),this.save(n))}},mounted:function(){this.reset()}},h=d,v=(n("b9dd"),n("2877")),g=Object(v["a"])(h,i,u,!1,null,"7707167e",null),m=g.exports,b={name:"app",components:{UploadForm:m}},y=b,_=(n("034f"),Object(v["a"])(y,a,o,!1,null,null,null)),S=_.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(t){return t(S)}}).$mount("#app")},"64a9":function(t,e,n){},a4e3:function(t,e,n){},b9dd:function(t,e,n){"use strict";var r=n("a4e3"),a=n.n(r);a.a},cf05:function(t,e,n){t.exports=n.p+"img/logo.82b9c7a5.png"}});
//# sourceMappingURL=app.4953121e.js.map