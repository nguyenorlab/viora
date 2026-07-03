(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();function pm(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ld={exports:{}},rl={},ad={exports:{}},R={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Eo=Symbol.for("react.element"),fm=Symbol.for("react.portal"),mm=Symbol.for("react.fragment"),hm=Symbol.for("react.strict_mode"),gm=Symbol.for("react.profiler"),ym=Symbol.for("react.provider"),vm=Symbol.for("react.context"),xm=Symbol.for("react.forward_ref"),wm=Symbol.for("react.suspense"),Sm=Symbol.for("react.memo"),km=Symbol.for("react.lazy"),Iu=Symbol.iterator;function jm(e){return e===null||typeof e!="object"?null:(e=Iu&&e[Iu]||e["@@iterator"],typeof e=="function"?e:null)}var sd={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ud=Object.assign,cd={};function Tr(e,t,n){this.props=e,this.context=t,this.refs=cd,this.updater=n||sd}Tr.prototype.isReactComponent={};Tr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Tr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function dd(){}dd.prototype=Tr.prototype;function ys(e,t,n){this.props=e,this.context=t,this.refs=cd,this.updater=n||sd}var vs=ys.prototype=new dd;vs.constructor=ys;ud(vs,Tr.prototype);vs.isPureReactComponent=!0;var Nu=Array.isArray,pd=Object.prototype.hasOwnProperty,xs={current:null},fd={key:!0,ref:!0,__self:!0,__source:!0};function md(e,t,n){var r,o={},i=null,l=null;if(t!=null)for(r in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(i=""+t.key),t)pd.call(t,r)&&!fd.hasOwnProperty(r)&&(o[r]=t[r]);var u=arguments.length-2;if(u===1)o.children=n;else if(1<u){for(var s=Array(u),c=0;c<u;c++)s[c]=arguments[c+2];o.children=s}if(e&&e.defaultProps)for(r in u=e.defaultProps,u)o[r]===void 0&&(o[r]=u[r]);return{$$typeof:Eo,type:e,key:i,ref:l,props:o,_owner:xs.current}}function Em(e,t){return{$$typeof:Eo,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function ws(e){return typeof e=="object"&&e!==null&&e.$$typeof===Eo}function $m(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Fu=/\/+/g;function Tl(e,t){return typeof e=="object"&&e!==null&&e.key!=null?$m(""+e.key):t.toString(36)}function ci(e,t,n,r,o){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(i){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case Eo:case fm:l=!0}}if(l)return l=e,o=o(l),e=r===""?"."+Tl(l,0):r,Nu(o)?(n="",e!=null&&(n=e.replace(Fu,"$&/")+"/"),ci(o,t,n,"",function(c){return c})):o!=null&&(ws(o)&&(o=Em(o,n+(!o.key||l&&l.key===o.key?"":(""+o.key).replace(Fu,"$&/")+"/")+e)),t.push(o)),1;if(l=0,r=r===""?".":r+":",Nu(e))for(var u=0;u<e.length;u++){i=e[u];var s=r+Tl(i,u);l+=ci(i,t,n,s,o)}else if(s=jm(e),typeof s=="function")for(e=s.call(e),u=0;!(i=e.next()).done;)i=i.value,s=r+Tl(i,u++),l+=ci(i,t,n,s,o);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function Mo(e,t,n){if(e==null)return e;var r=[],o=0;return ci(e,r,"","",function(i){return t.call(n,i,o++)}),r}function Cm(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Le={current:null},di={transition:null},Dm={ReactCurrentDispatcher:Le,ReactCurrentBatchConfig:di,ReactCurrentOwner:xs};function hd(){throw Error("act(...) is not supported in production builds of React.")}R.Children={map:Mo,forEach:function(e,t,n){Mo(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Mo(e,function(){t++}),t},toArray:function(e){return Mo(e,function(t){return t})||[]},only:function(e){if(!ws(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};R.Component=Tr;R.Fragment=mm;R.Profiler=gm;R.PureComponent=ys;R.StrictMode=hm;R.Suspense=wm;R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Dm;R.act=hd;R.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=ud({},e.props),o=e.key,i=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,l=xs.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(s in t)pd.call(t,s)&&!fd.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&u!==void 0?u[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){u=Array(s);for(var c=0;c<s;c++)u[c]=arguments[c+2];r.children=u}return{$$typeof:Eo,type:e.type,key:o,ref:i,props:r,_owner:l}};R.createContext=function(e){return e={$$typeof:vm,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:ym,_context:e},e.Consumer=e};R.createElement=md;R.createFactory=function(e){var t=md.bind(null,e);return t.type=e,t};R.createRef=function(){return{current:null}};R.forwardRef=function(e){return{$$typeof:xm,render:e}};R.isValidElement=ws;R.lazy=function(e){return{$$typeof:km,_payload:{_status:-1,_result:e},_init:Cm}};R.memo=function(e,t){return{$$typeof:Sm,type:e,compare:t===void 0?null:t}};R.startTransition=function(e){var t=di.transition;di.transition={};try{e()}finally{di.transition=t}};R.unstable_act=hd;R.useCallback=function(e,t){return Le.current.useCallback(e,t)};R.useContext=function(e){return Le.current.useContext(e)};R.useDebugValue=function(){};R.useDeferredValue=function(e){return Le.current.useDeferredValue(e)};R.useEffect=function(e,t){return Le.current.useEffect(e,t)};R.useId=function(){return Le.current.useId()};R.useImperativeHandle=function(e,t,n){return Le.current.useImperativeHandle(e,t,n)};R.useInsertionEffect=function(e,t){return Le.current.useInsertionEffect(e,t)};R.useLayoutEffect=function(e,t){return Le.current.useLayoutEffect(e,t)};R.useMemo=function(e,t){return Le.current.useMemo(e,t)};R.useReducer=function(e,t,n){return Le.current.useReducer(e,t,n)};R.useRef=function(e){return Le.current.useRef(e)};R.useState=function(e){return Le.current.useState(e)};R.useSyncExternalStore=function(e,t,n){return Le.current.useSyncExternalStore(e,t,n)};R.useTransition=function(){return Le.current.useTransition()};R.version="18.3.1";ad.exports=R;var M=ad.exports;const at=pm(M);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bm=M,Tm=Symbol.for("react.element"),Pm=Symbol.for("react.fragment"),Im=Object.prototype.hasOwnProperty,Nm=bm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Fm={key:!0,ref:!0,__self:!0,__source:!0};function gd(e,t,n){var r,o={},i=null,l=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(l=t.ref);for(r in t)Im.call(t,r)&&!Fm.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)o[r]===void 0&&(o[r]=t[r]);return{$$typeof:Tm,type:e,key:i,ref:l,props:o,_owner:Nm.current}}rl.Fragment=Pm;rl.jsx=gd;rl.jsxs=gd;ld.exports=rl;var a=ld.exports,ha={},yd={exports:{}},et={},vd={exports:{}},xd={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(b,P){var F=b.length;b.push(P);e:for(;0<F;){var V=F-1>>>1,B=b[V];if(0<o(B,P))b[V]=P,b[F]=B,F=V;else break e}}function n(b){return b.length===0?null:b[0]}function r(b){if(b.length===0)return null;var P=b[0],F=b.pop();if(F!==P){b[0]=F;e:for(var V=0,B=b.length,mt=B>>>1;V<mt;){var Ue=2*(V+1)-1,nt=b[Ue],Ce=Ue+1,rt=b[Ce];if(0>o(nt,F))Ce<B&&0>o(rt,nt)?(b[V]=rt,b[Ce]=F,V=Ce):(b[V]=nt,b[Ue]=F,V=Ue);else if(Ce<B&&0>o(rt,F))b[V]=rt,b[Ce]=F,V=Ce;else break e}}return P}function o(b,P){var F=b.sortIndex-P.sortIndex;return F!==0?F:b.id-P.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var l=Date,u=l.now();e.unstable_now=function(){return l.now()-u}}var s=[],c=[],g=1,y=null,f=3,v=!1,x=!1,S=!1,N=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,d=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function h(b){for(var P=n(c);P!==null;){if(P.callback===null)r(c);else if(P.startTime<=b)r(c),P.sortIndex=P.expirationTime,t(s,P);else break;P=n(c)}}function w(b){if(S=!1,h(b),!x)if(n(s)!==null)x=!0,ft($);else{var P=n(c);P!==null&&ae(w,P.startTime-b)}}function $(b,P){x=!1,S&&(S=!1,p(T),T=-1),v=!0;var F=f;try{for(h(P),y=n(s);y!==null&&(!(y.expirationTime>P)||b&&!Y());){var V=y.callback;if(typeof V=="function"){y.callback=null,f=y.priorityLevel;var B=V(y.expirationTime<=P);P=e.unstable_now(),typeof B=="function"?y.callback=B:y===n(s)&&r(s),h(P)}else r(s);y=n(s)}if(y!==null)var mt=!0;else{var Ue=n(c);Ue!==null&&ae(w,Ue.startTime-P),mt=!1}return mt}finally{y=null,f=F,v=!1}}var k=!1,j=null,T=-1,z=5,_=-1;function Y(){return!(e.unstable_now()-_<z)}function Fe(){if(j!==null){var b=e.unstable_now();_=b;var P=!0;try{P=j(!0,b)}finally{P?Re():(k=!1,j=null)}}else k=!1}var Re;if(typeof d=="function")Re=function(){d(Fe)};else if(typeof MessageChannel<"u"){var Kt=new MessageChannel,Oe=Kt.port2;Kt.port1.onmessage=Fe,Re=function(){Oe.postMessage(null)}}else Re=function(){N(Fe,0)};function ft(b){j=b,k||(k=!0,Re())}function ae(b,P){T=N(function(){b(e.unstable_now())},P)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(b){b.callback=null},e.unstable_continueExecution=function(){x||v||(x=!0,ft($))},e.unstable_forceFrameRate=function(b){0>b||125<b?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):z=0<b?Math.floor(1e3/b):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_getFirstCallbackNode=function(){return n(s)},e.unstable_next=function(b){switch(f){case 1:case 2:case 3:var P=3;break;default:P=f}var F=f;f=P;try{return b()}finally{f=F}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(b,P){switch(b){case 1:case 2:case 3:case 4:case 5:break;default:b=3}var F=f;f=b;try{return P()}finally{f=F}},e.unstable_scheduleCallback=function(b,P,F){var V=e.unstable_now();switch(typeof F=="object"&&F!==null?(F=F.delay,F=typeof F=="number"&&0<F?V+F:V):F=V,b){case 1:var B=-1;break;case 2:B=250;break;case 5:B=1073741823;break;case 4:B=1e4;break;default:B=5e3}return B=F+B,b={id:g++,callback:P,priorityLevel:b,startTime:F,expirationTime:B,sortIndex:-1},F>V?(b.sortIndex=F,t(c,b),n(s)===null&&b===n(c)&&(S?(p(T),T=-1):S=!0,ae(w,F-V))):(b.sortIndex=B,t(s,b),x||v||(x=!0,ft($))),b},e.unstable_shouldYield=Y,e.unstable_wrapCallback=function(b){var P=f;return function(){var F=f;f=P;try{return b.apply(this,arguments)}finally{f=F}}}})(xd);vd.exports=xd;var Mm=vd.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _m=M,qe=Mm;function C(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var wd=new Set,oo={};function Vn(e,t){yr(e,t),yr(e+"Capture",t)}function yr(e,t){for(oo[e]=t,e=0;e<t.length;e++)wd.add(t[e])}var Wt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ga=Object.prototype.hasOwnProperty,Am=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Mu={},_u={};function Lm(e){return ga.call(_u,e)?!0:ga.call(Mu,e)?!1:Am.test(e)?_u[e]=!0:(Mu[e]=!0,!1)}function zm(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Rm(e,t,n,r){if(t===null||typeof t>"u"||zm(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ze(e,t,n,r,o,i,l){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=l}var $e={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){$e[e]=new ze(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];$e[t]=new ze(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){$e[e]=new ze(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){$e[e]=new ze(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){$e[e]=new ze(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){$e[e]=new ze(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){$e[e]=new ze(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){$e[e]=new ze(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){$e[e]=new ze(e,5,!1,e.toLowerCase(),null,!1,!1)});var Ss=/[\-:]([a-z])/g;function ks(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Ss,ks);$e[t]=new ze(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Ss,ks);$e[t]=new ze(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Ss,ks);$e[t]=new ze(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){$e[e]=new ze(e,1,!1,e.toLowerCase(),null,!1,!1)});$e.xlinkHref=new ze("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){$e[e]=new ze(e,1,!1,e.toLowerCase(),null,!0,!0)});function js(e,t,n,r){var o=$e.hasOwnProperty(t)?$e[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Rm(t,n,o,r)&&(n=null),r||o===null?Lm(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Xt=_m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,_o=Symbol.for("react.element"),Kn=Symbol.for("react.portal"),Zn=Symbol.for("react.fragment"),Es=Symbol.for("react.strict_mode"),ya=Symbol.for("react.profiler"),Sd=Symbol.for("react.provider"),kd=Symbol.for("react.context"),$s=Symbol.for("react.forward_ref"),va=Symbol.for("react.suspense"),xa=Symbol.for("react.suspense_list"),Cs=Symbol.for("react.memo"),tn=Symbol.for("react.lazy"),jd=Symbol.for("react.offscreen"),Au=Symbol.iterator;function Mr(e){return e===null||typeof e!="object"?null:(e=Au&&e[Au]||e["@@iterator"],typeof e=="function"?e:null)}var le=Object.assign,Pl;function Br(e){if(Pl===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Pl=t&&t[1]||""}return`
`+Pl+e}var Il=!1;function Nl(e,t){if(!e||Il)return"";Il=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var o=c.stack.split(`
`),i=r.stack.split(`
`),l=o.length-1,u=i.length-1;1<=l&&0<=u&&o[l]!==i[u];)u--;for(;1<=l&&0<=u;l--,u--)if(o[l]!==i[u]){if(l!==1||u!==1)do if(l--,u--,0>u||o[l]!==i[u]){var s=`
`+o[l].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=l&&0<=u);break}}}finally{Il=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Br(e):""}function Om(e){switch(e.tag){case 5:return Br(e.type);case 16:return Br("Lazy");case 13:return Br("Suspense");case 19:return Br("SuspenseList");case 0:case 2:case 15:return e=Nl(e.type,!1),e;case 11:return e=Nl(e.type.render,!1),e;case 1:return e=Nl(e.type,!0),e;default:return""}}function wa(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Zn:return"Fragment";case Kn:return"Portal";case ya:return"Profiler";case Es:return"StrictMode";case va:return"Suspense";case xa:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case kd:return(e.displayName||"Context")+".Consumer";case Sd:return(e._context.displayName||"Context")+".Provider";case $s:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Cs:return t=e.displayName||null,t!==null?t:wa(e.type)||"Memo";case tn:t=e._payload,e=e._init;try{return wa(e(t))}catch{}}return null}function Um(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return wa(t);case 8:return t===Es?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function vn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ed(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Vm(e){var t=Ed(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(l){r=""+l,i.call(this,l)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ao(e){e._valueTracker||(e._valueTracker=Vm(e))}function $d(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Ed(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Di(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Sa(e,t){var n=t.checked;return le({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Lu(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=vn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Cd(e,t){t=t.checked,t!=null&&js(e,"checked",t,!1)}function ka(e,t){Cd(e,t);var n=vn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?ja(e,t.type,n):t.hasOwnProperty("defaultValue")&&ja(e,t.type,vn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function zu(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function ja(e,t,n){(t!=="number"||Di(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Hr=Array.isArray;function ur(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+vn(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function Ea(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(C(91));return le({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Ru(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(C(92));if(Hr(n)){if(1<n.length)throw Error(C(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:vn(n)}}function Dd(e,t){var n=vn(t.value),r=vn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Ou(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function bd(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function $a(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?bd(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Lo,Td=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Lo=Lo||document.createElement("div"),Lo.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Lo.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function io(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Yr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Bm=["Webkit","ms","Moz","O"];Object.keys(Yr).forEach(function(e){Bm.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Yr[t]=Yr[e]})});function Pd(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Yr.hasOwnProperty(e)&&Yr[e]?(""+t).trim():t+"px"}function Id(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,o=Pd(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}var Hm=le({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ca(e,t){if(t){if(Hm[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(C(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(C(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(C(61))}if(t.style!=null&&typeof t.style!="object")throw Error(C(62))}}function Da(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ba=null;function Ds(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ta=null,cr=null,dr=null;function Uu(e){if(e=Do(e)){if(typeof Ta!="function")throw Error(C(280));var t=e.stateNode;t&&(t=sl(t),Ta(e.stateNode,e.type,t))}}function Nd(e){cr?dr?dr.push(e):dr=[e]:cr=e}function Fd(){if(cr){var e=cr,t=dr;if(dr=cr=null,Uu(e),t)for(e=0;e<t.length;e++)Uu(t[e])}}function Md(e,t){return e(t)}function _d(){}var Fl=!1;function Ad(e,t,n){if(Fl)return e(t,n);Fl=!0;try{return Md(e,t,n)}finally{Fl=!1,(cr!==null||dr!==null)&&(_d(),Fd())}}function lo(e,t){var n=e.stateNode;if(n===null)return null;var r=sl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(C(231,t,typeof n));return n}var Pa=!1;if(Wt)try{var _r={};Object.defineProperty(_r,"passive",{get:function(){Pa=!0}}),window.addEventListener("test",_r,_r),window.removeEventListener("test",_r,_r)}catch{Pa=!1}function Wm(e,t,n,r,o,i,l,u,s){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(g){this.onError(g)}}var Xr=!1,bi=null,Ti=!1,Ia=null,Gm={onError:function(e){Xr=!0,bi=e}};function Qm(e,t,n,r,o,i,l,u,s){Xr=!1,bi=null,Wm.apply(Gm,arguments)}function Ym(e,t,n,r,o,i,l,u,s){if(Qm.apply(this,arguments),Xr){if(Xr){var c=bi;Xr=!1,bi=null}else throw Error(C(198));Ti||(Ti=!0,Ia=c)}}function Bn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Ld(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Vu(e){if(Bn(e)!==e)throw Error(C(188))}function Xm(e){var t=e.alternate;if(!t){if(t=Bn(e),t===null)throw Error(C(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var i=o.alternate;if(i===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===i.child){for(i=o.child;i;){if(i===n)return Vu(o),e;if(i===r)return Vu(o),t;i=i.sibling}throw Error(C(188))}if(n.return!==r.return)n=o,r=i;else{for(var l=!1,u=o.child;u;){if(u===n){l=!0,n=o,r=i;break}if(u===r){l=!0,r=o,n=i;break}u=u.sibling}if(!l){for(u=i.child;u;){if(u===n){l=!0,n=i,r=o;break}if(u===r){l=!0,r=i,n=o;break}u=u.sibling}if(!l)throw Error(C(189))}}if(n.alternate!==r)throw Error(C(190))}if(n.tag!==3)throw Error(C(188));return n.stateNode.current===n?e:t}function zd(e){return e=Xm(e),e!==null?Rd(e):null}function Rd(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Rd(e);if(t!==null)return t;e=e.sibling}return null}var Od=qe.unstable_scheduleCallback,Bu=qe.unstable_cancelCallback,Km=qe.unstable_shouldYield,Zm=qe.unstable_requestPaint,ce=qe.unstable_now,Jm=qe.unstable_getCurrentPriorityLevel,bs=qe.unstable_ImmediatePriority,Ud=qe.unstable_UserBlockingPriority,Pi=qe.unstable_NormalPriority,qm=qe.unstable_LowPriority,Vd=qe.unstable_IdlePriority,ol=null,Nt=null;function eh(e){if(Nt&&typeof Nt.onCommitFiberRoot=="function")try{Nt.onCommitFiberRoot(ol,e,void 0,(e.current.flags&128)===128)}catch{}}var jt=Math.clz32?Math.clz32:rh,th=Math.log,nh=Math.LN2;function rh(e){return e>>>=0,e===0?32:31-(th(e)/nh|0)|0}var zo=64,Ro=4194304;function Wr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ii(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,i=e.pingedLanes,l=n&268435455;if(l!==0){var u=l&~o;u!==0?r=Wr(u):(i&=l,i!==0&&(r=Wr(i)))}else l=n&~o,l!==0?r=Wr(l):i!==0&&(r=Wr(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&o)&&(o=r&-r,i=t&-t,o>=i||o===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-jt(t),o=1<<n,r|=e[n],t&=~o;return r}function oh(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ih(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,i=e.pendingLanes;0<i;){var l=31-jt(i),u=1<<l,s=o[l];s===-1?(!(u&n)||u&r)&&(o[l]=oh(u,t)):s<=t&&(e.expiredLanes|=u),i&=~u}}function Na(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Bd(){var e=zo;return zo<<=1,!(zo&4194240)&&(zo=64),e}function Ml(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function $o(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-jt(t),e[t]=n}function lh(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-jt(n),i=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~i}}function Ts(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-jt(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var W=0;function Hd(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Wd,Ps,Gd,Qd,Yd,Fa=!1,Oo=[],un=null,cn=null,dn=null,ao=new Map,so=new Map,rn=[],ah="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Hu(e,t){switch(e){case"focusin":case"focusout":un=null;break;case"dragenter":case"dragleave":cn=null;break;case"mouseover":case"mouseout":dn=null;break;case"pointerover":case"pointerout":ao.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":so.delete(t.pointerId)}}function Ar(e,t,n,r,o,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[o]},t!==null&&(t=Do(t),t!==null&&Ps(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function sh(e,t,n,r,o){switch(t){case"focusin":return un=Ar(un,e,t,n,r,o),!0;case"dragenter":return cn=Ar(cn,e,t,n,r,o),!0;case"mouseover":return dn=Ar(dn,e,t,n,r,o),!0;case"pointerover":var i=o.pointerId;return ao.set(i,Ar(ao.get(i)||null,e,t,n,r,o)),!0;case"gotpointercapture":return i=o.pointerId,so.set(i,Ar(so.get(i)||null,e,t,n,r,o)),!0}return!1}function Xd(e){var t=Dn(e.target);if(t!==null){var n=Bn(t);if(n!==null){if(t=n.tag,t===13){if(t=Ld(n),t!==null){e.blockedOn=t,Yd(e.priority,function(){Gd(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function pi(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Ma(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);ba=r,n.target.dispatchEvent(r),ba=null}else return t=Do(n),t!==null&&Ps(t),e.blockedOn=n,!1;t.shift()}return!0}function Wu(e,t,n){pi(e)&&n.delete(t)}function uh(){Fa=!1,un!==null&&pi(un)&&(un=null),cn!==null&&pi(cn)&&(cn=null),dn!==null&&pi(dn)&&(dn=null),ao.forEach(Wu),so.forEach(Wu)}function Lr(e,t){e.blockedOn===t&&(e.blockedOn=null,Fa||(Fa=!0,qe.unstable_scheduleCallback(qe.unstable_NormalPriority,uh)))}function uo(e){function t(o){return Lr(o,e)}if(0<Oo.length){Lr(Oo[0],e);for(var n=1;n<Oo.length;n++){var r=Oo[n];r.blockedOn===e&&(r.blockedOn=null)}}for(un!==null&&Lr(un,e),cn!==null&&Lr(cn,e),dn!==null&&Lr(dn,e),ao.forEach(t),so.forEach(t),n=0;n<rn.length;n++)r=rn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<rn.length&&(n=rn[0],n.blockedOn===null);)Xd(n),n.blockedOn===null&&rn.shift()}var pr=Xt.ReactCurrentBatchConfig,Ni=!0;function ch(e,t,n,r){var o=W,i=pr.transition;pr.transition=null;try{W=1,Is(e,t,n,r)}finally{W=o,pr.transition=i}}function dh(e,t,n,r){var o=W,i=pr.transition;pr.transition=null;try{W=4,Is(e,t,n,r)}finally{W=o,pr.transition=i}}function Is(e,t,n,r){if(Ni){var o=Ma(e,t,n,r);if(o===null)Hl(e,t,r,Fi,n),Hu(e,r);else if(sh(o,e,t,n,r))r.stopPropagation();else if(Hu(e,r),t&4&&-1<ah.indexOf(e)){for(;o!==null;){var i=Do(o);if(i!==null&&Wd(i),i=Ma(e,t,n,r),i===null&&Hl(e,t,r,Fi,n),i===o)break;o=i}o!==null&&r.stopPropagation()}else Hl(e,t,r,null,n)}}var Fi=null;function Ma(e,t,n,r){if(Fi=null,e=Ds(r),e=Dn(e),e!==null)if(t=Bn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Ld(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Fi=e,null}function Kd(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Jm()){case bs:return 1;case Ud:return 4;case Pi:case qm:return 16;case Vd:return 536870912;default:return 16}default:return 16}}var ln=null,Ns=null,fi=null;function Zd(){if(fi)return fi;var e,t=Ns,n=t.length,r,o="value"in ln?ln.value:ln.textContent,i=o.length;for(e=0;e<n&&t[e]===o[e];e++);var l=n-e;for(r=1;r<=l&&t[n-r]===o[i-r];r++);return fi=o.slice(e,1<r?1-r:void 0)}function mi(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Uo(){return!0}function Gu(){return!1}function tt(e){function t(n,r,o,i,l){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=i,this.target=l,this.currentTarget=null;for(var u in e)e.hasOwnProperty(u)&&(n=e[u],this[u]=n?n(i):i[u]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Uo:Gu,this.isPropagationStopped=Gu,this}return le(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Uo)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Uo)},persist:function(){},isPersistent:Uo}),t}var Pr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Fs=tt(Pr),Co=le({},Pr,{view:0,detail:0}),ph=tt(Co),_l,Al,zr,il=le({},Co,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ms,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==zr&&(zr&&e.type==="mousemove"?(_l=e.screenX-zr.screenX,Al=e.screenY-zr.screenY):Al=_l=0,zr=e),_l)},movementY:function(e){return"movementY"in e?e.movementY:Al}}),Qu=tt(il),fh=le({},il,{dataTransfer:0}),mh=tt(fh),hh=le({},Co,{relatedTarget:0}),Ll=tt(hh),gh=le({},Pr,{animationName:0,elapsedTime:0,pseudoElement:0}),yh=tt(gh),vh=le({},Pr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),xh=tt(vh),wh=le({},Pr,{data:0}),Yu=tt(wh),Sh={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},kh={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},jh={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Eh(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=jh[e])?!!t[e]:!1}function Ms(){return Eh}var $h=le({},Co,{key:function(e){if(e.key){var t=Sh[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=mi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?kh[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ms,charCode:function(e){return e.type==="keypress"?mi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?mi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Ch=tt($h),Dh=le({},il,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Xu=tt(Dh),bh=le({},Co,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ms}),Th=tt(bh),Ph=le({},Pr,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ih=tt(Ph),Nh=le({},il,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Fh=tt(Nh),Mh=[9,13,27,32],_s=Wt&&"CompositionEvent"in window,Kr=null;Wt&&"documentMode"in document&&(Kr=document.documentMode);var _h=Wt&&"TextEvent"in window&&!Kr,Jd=Wt&&(!_s||Kr&&8<Kr&&11>=Kr),Ku=" ",Zu=!1;function qd(e,t){switch(e){case"keyup":return Mh.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ep(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Jn=!1;function Ah(e,t){switch(e){case"compositionend":return ep(t);case"keypress":return t.which!==32?null:(Zu=!0,Ku);case"textInput":return e=t.data,e===Ku&&Zu?null:e;default:return null}}function Lh(e,t){if(Jn)return e==="compositionend"||!_s&&qd(e,t)?(e=Zd(),fi=Ns=ln=null,Jn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Jd&&t.locale!=="ko"?null:t.data;default:return null}}var zh={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ju(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!zh[e.type]:t==="textarea"}function tp(e,t,n,r){Nd(r),t=Mi(t,"onChange"),0<t.length&&(n=new Fs("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Zr=null,co=null;function Rh(e){pp(e,0)}function ll(e){var t=tr(e);if($d(t))return e}function Oh(e,t){if(e==="change")return t}var np=!1;if(Wt){var zl;if(Wt){var Rl="oninput"in document;if(!Rl){var qu=document.createElement("div");qu.setAttribute("oninput","return;"),Rl=typeof qu.oninput=="function"}zl=Rl}else zl=!1;np=zl&&(!document.documentMode||9<document.documentMode)}function ec(){Zr&&(Zr.detachEvent("onpropertychange",rp),co=Zr=null)}function rp(e){if(e.propertyName==="value"&&ll(co)){var t=[];tp(t,co,e,Ds(e)),Ad(Rh,t)}}function Uh(e,t,n){e==="focusin"?(ec(),Zr=t,co=n,Zr.attachEvent("onpropertychange",rp)):e==="focusout"&&ec()}function Vh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ll(co)}function Bh(e,t){if(e==="click")return ll(t)}function Hh(e,t){if(e==="input"||e==="change")return ll(t)}function Wh(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ct=typeof Object.is=="function"?Object.is:Wh;function po(e,t){if(Ct(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!ga.call(t,o)||!Ct(e[o],t[o]))return!1}return!0}function tc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function nc(e,t){var n=tc(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=tc(n)}}function op(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?op(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function ip(){for(var e=window,t=Di();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Di(e.document)}return t}function As(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Gh(e){var t=ip(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&op(n.ownerDocument.documentElement,n)){if(r!==null&&As(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,i=Math.min(r.start,o);r=r.end===void 0?i:Math.min(r.end,o),!e.extend&&i>r&&(o=r,r=i,i=o),o=nc(n,i);var l=nc(n,r);o&&l&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Qh=Wt&&"documentMode"in document&&11>=document.documentMode,qn=null,_a=null,Jr=null,Aa=!1;function rc(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Aa||qn==null||qn!==Di(r)||(r=qn,"selectionStart"in r&&As(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Jr&&po(Jr,r)||(Jr=r,r=Mi(_a,"onSelect"),0<r.length&&(t=new Fs("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=qn)))}function Vo(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var er={animationend:Vo("Animation","AnimationEnd"),animationiteration:Vo("Animation","AnimationIteration"),animationstart:Vo("Animation","AnimationStart"),transitionend:Vo("Transition","TransitionEnd")},Ol={},lp={};Wt&&(lp=document.createElement("div").style,"AnimationEvent"in window||(delete er.animationend.animation,delete er.animationiteration.animation,delete er.animationstart.animation),"TransitionEvent"in window||delete er.transitionend.transition);function al(e){if(Ol[e])return Ol[e];if(!er[e])return e;var t=er[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in lp)return Ol[e]=t[n];return e}var ap=al("animationend"),sp=al("animationiteration"),up=al("animationstart"),cp=al("transitionend"),dp=new Map,oc="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function wn(e,t){dp.set(e,t),Vn(t,[e])}for(var Ul=0;Ul<oc.length;Ul++){var Vl=oc[Ul],Yh=Vl.toLowerCase(),Xh=Vl[0].toUpperCase()+Vl.slice(1);wn(Yh,"on"+Xh)}wn(ap,"onAnimationEnd");wn(sp,"onAnimationIteration");wn(up,"onAnimationStart");wn("dblclick","onDoubleClick");wn("focusin","onFocus");wn("focusout","onBlur");wn(cp,"onTransitionEnd");yr("onMouseEnter",["mouseout","mouseover"]);yr("onMouseLeave",["mouseout","mouseover"]);yr("onPointerEnter",["pointerout","pointerover"]);yr("onPointerLeave",["pointerout","pointerover"]);Vn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Vn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Vn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Vn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Vn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Vn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Gr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Kh=new Set("cancel close invalid load scroll toggle".split(" ").concat(Gr));function ic(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Ym(r,t,void 0,e),e.currentTarget=null}function pp(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var l=r.length-1;0<=l;l--){var u=r[l],s=u.instance,c=u.currentTarget;if(u=u.listener,s!==i&&o.isPropagationStopped())break e;ic(o,u,c),i=s}else for(l=0;l<r.length;l++){if(u=r[l],s=u.instance,c=u.currentTarget,u=u.listener,s!==i&&o.isPropagationStopped())break e;ic(o,u,c),i=s}}}if(Ti)throw e=Ia,Ti=!1,Ia=null,e}function J(e,t){var n=t[Ua];n===void 0&&(n=t[Ua]=new Set);var r=e+"__bubble";n.has(r)||(fp(t,e,2,!1),n.add(r))}function Bl(e,t,n){var r=0;t&&(r|=4),fp(n,e,r,t)}var Bo="_reactListening"+Math.random().toString(36).slice(2);function fo(e){if(!e[Bo]){e[Bo]=!0,wd.forEach(function(n){n!=="selectionchange"&&(Kh.has(n)||Bl(n,!1,e),Bl(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Bo]||(t[Bo]=!0,Bl("selectionchange",!1,t))}}function fp(e,t,n,r){switch(Kd(t)){case 1:var o=ch;break;case 4:o=dh;break;default:o=Is}n=o.bind(null,t,n,e),o=void 0,!Pa||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function Hl(e,t,n,r,o){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var u=r.stateNode.containerInfo;if(u===o||u.nodeType===8&&u.parentNode===o)break;if(l===4)for(l=r.return;l!==null;){var s=l.tag;if((s===3||s===4)&&(s=l.stateNode.containerInfo,s===o||s.nodeType===8&&s.parentNode===o))return;l=l.return}for(;u!==null;){if(l=Dn(u),l===null)return;if(s=l.tag,s===5||s===6){r=i=l;continue e}u=u.parentNode}}r=r.return}Ad(function(){var c=i,g=Ds(n),y=[];e:{var f=dp.get(e);if(f!==void 0){var v=Fs,x=e;switch(e){case"keypress":if(mi(n)===0)break e;case"keydown":case"keyup":v=Ch;break;case"focusin":x="focus",v=Ll;break;case"focusout":x="blur",v=Ll;break;case"beforeblur":case"afterblur":v=Ll;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=Qu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=mh;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=Th;break;case ap:case sp:case up:v=yh;break;case cp:v=Ih;break;case"scroll":v=ph;break;case"wheel":v=Fh;break;case"copy":case"cut":case"paste":v=xh;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=Xu}var S=(t&4)!==0,N=!S&&e==="scroll",p=S?f!==null?f+"Capture":null:f;S=[];for(var d=c,h;d!==null;){h=d;var w=h.stateNode;if(h.tag===5&&w!==null&&(h=w,p!==null&&(w=lo(d,p),w!=null&&S.push(mo(d,w,h)))),N)break;d=d.return}0<S.length&&(f=new v(f,x,null,n,g),y.push({event:f,listeners:S}))}}if(!(t&7)){e:{if(f=e==="mouseover"||e==="pointerover",v=e==="mouseout"||e==="pointerout",f&&n!==ba&&(x=n.relatedTarget||n.fromElement)&&(Dn(x)||x[Gt]))break e;if((v||f)&&(f=g.window===g?g:(f=g.ownerDocument)?f.defaultView||f.parentWindow:window,v?(x=n.relatedTarget||n.toElement,v=c,x=x?Dn(x):null,x!==null&&(N=Bn(x),x!==N||x.tag!==5&&x.tag!==6)&&(x=null)):(v=null,x=c),v!==x)){if(S=Qu,w="onMouseLeave",p="onMouseEnter",d="mouse",(e==="pointerout"||e==="pointerover")&&(S=Xu,w="onPointerLeave",p="onPointerEnter",d="pointer"),N=v==null?f:tr(v),h=x==null?f:tr(x),f=new S(w,d+"leave",v,n,g),f.target=N,f.relatedTarget=h,w=null,Dn(g)===c&&(S=new S(p,d+"enter",x,n,g),S.target=h,S.relatedTarget=N,w=S),N=w,v&&x)t:{for(S=v,p=x,d=0,h=S;h;h=Gn(h))d++;for(h=0,w=p;w;w=Gn(w))h++;for(;0<d-h;)S=Gn(S),d--;for(;0<h-d;)p=Gn(p),h--;for(;d--;){if(S===p||p!==null&&S===p.alternate)break t;S=Gn(S),p=Gn(p)}S=null}else S=null;v!==null&&lc(y,f,v,S,!1),x!==null&&N!==null&&lc(y,N,x,S,!0)}}e:{if(f=c?tr(c):window,v=f.nodeName&&f.nodeName.toLowerCase(),v==="select"||v==="input"&&f.type==="file")var $=Oh;else if(Ju(f))if(np)$=Hh;else{$=Vh;var k=Uh}else(v=f.nodeName)&&v.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&($=Bh);if($&&($=$(e,c))){tp(y,$,n,g);break e}k&&k(e,f,c),e==="focusout"&&(k=f._wrapperState)&&k.controlled&&f.type==="number"&&ja(f,"number",f.value)}switch(k=c?tr(c):window,e){case"focusin":(Ju(k)||k.contentEditable==="true")&&(qn=k,_a=c,Jr=null);break;case"focusout":Jr=_a=qn=null;break;case"mousedown":Aa=!0;break;case"contextmenu":case"mouseup":case"dragend":Aa=!1,rc(y,n,g);break;case"selectionchange":if(Qh)break;case"keydown":case"keyup":rc(y,n,g)}var j;if(_s)e:{switch(e){case"compositionstart":var T="onCompositionStart";break e;case"compositionend":T="onCompositionEnd";break e;case"compositionupdate":T="onCompositionUpdate";break e}T=void 0}else Jn?qd(e,n)&&(T="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(T="onCompositionStart");T&&(Jd&&n.locale!=="ko"&&(Jn||T!=="onCompositionStart"?T==="onCompositionEnd"&&Jn&&(j=Zd()):(ln=g,Ns="value"in ln?ln.value:ln.textContent,Jn=!0)),k=Mi(c,T),0<k.length&&(T=new Yu(T,e,null,n,g),y.push({event:T,listeners:k}),j?T.data=j:(j=ep(n),j!==null&&(T.data=j)))),(j=_h?Ah(e,n):Lh(e,n))&&(c=Mi(c,"onBeforeInput"),0<c.length&&(g=new Yu("onBeforeInput","beforeinput",null,n,g),y.push({event:g,listeners:c}),g.data=j))}pp(y,t)})}function mo(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Mi(e,t){for(var n=t+"Capture",r=[];e!==null;){var o=e,i=o.stateNode;o.tag===5&&i!==null&&(o=i,i=lo(e,n),i!=null&&r.unshift(mo(e,i,o)),i=lo(e,t),i!=null&&r.push(mo(e,i,o))),e=e.return}return r}function Gn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function lc(e,t,n,r,o){for(var i=t._reactName,l=[];n!==null&&n!==r;){var u=n,s=u.alternate,c=u.stateNode;if(s!==null&&s===r)break;u.tag===5&&c!==null&&(u=c,o?(s=lo(n,i),s!=null&&l.unshift(mo(n,s,u))):o||(s=lo(n,i),s!=null&&l.push(mo(n,s,u)))),n=n.return}l.length!==0&&e.push({event:t,listeners:l})}var Zh=/\r\n?/g,Jh=/\u0000|\uFFFD/g;function ac(e){return(typeof e=="string"?e:""+e).replace(Zh,`
`).replace(Jh,"")}function Ho(e,t,n){if(t=ac(t),ac(e)!==t&&n)throw Error(C(425))}function _i(){}var La=null,za=null;function Ra(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Oa=typeof setTimeout=="function"?setTimeout:void 0,qh=typeof clearTimeout=="function"?clearTimeout:void 0,sc=typeof Promise=="function"?Promise:void 0,eg=typeof queueMicrotask=="function"?queueMicrotask:typeof sc<"u"?function(e){return sc.resolve(null).then(e).catch(tg)}:Oa;function tg(e){setTimeout(function(){throw e})}function Wl(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(r===0){e.removeChild(o),uo(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=o}while(n);uo(t)}function pn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function uc(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Ir=Math.random().toString(36).slice(2),It="__reactFiber$"+Ir,ho="__reactProps$"+Ir,Gt="__reactContainer$"+Ir,Ua="__reactEvents$"+Ir,ng="__reactListeners$"+Ir,rg="__reactHandles$"+Ir;function Dn(e){var t=e[It];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Gt]||n[It]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=uc(e);e!==null;){if(n=e[It])return n;e=uc(e)}return t}e=n,n=e.parentNode}return null}function Do(e){return e=e[It]||e[Gt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function tr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(C(33))}function sl(e){return e[ho]||null}var Va=[],nr=-1;function Sn(e){return{current:e}}function ee(e){0>nr||(e.current=Va[nr],Va[nr]=null,nr--)}function K(e,t){nr++,Va[nr]=e.current,e.current=t}var xn={},Ne=Sn(xn),He=Sn(!1),Mn=xn;function vr(e,t){var n=e.type.contextTypes;if(!n)return xn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},i;for(i in n)o[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function We(e){return e=e.childContextTypes,e!=null}function Ai(){ee(He),ee(Ne)}function cc(e,t,n){if(Ne.current!==xn)throw Error(C(168));K(Ne,t),K(He,n)}function mp(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(C(108,Um(e)||"Unknown",o));return le({},n,r)}function Li(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||xn,Mn=Ne.current,K(Ne,e),K(He,He.current),!0}function dc(e,t,n){var r=e.stateNode;if(!r)throw Error(C(169));n?(e=mp(e,t,Mn),r.__reactInternalMemoizedMergedChildContext=e,ee(He),ee(Ne),K(Ne,e)):ee(He),K(He,n)}var Ut=null,ul=!1,Gl=!1;function hp(e){Ut===null?Ut=[e]:Ut.push(e)}function og(e){ul=!0,hp(e)}function kn(){if(!Gl&&Ut!==null){Gl=!0;var e=0,t=W;try{var n=Ut;for(W=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Ut=null,ul=!1}catch(o){throw Ut!==null&&(Ut=Ut.slice(e+1)),Od(bs,kn),o}finally{W=t,Gl=!1}}return null}var rr=[],or=0,zi=null,Ri=0,it=[],lt=0,_n=null,Vt=1,Bt="";function $n(e,t){rr[or++]=Ri,rr[or++]=zi,zi=e,Ri=t}function gp(e,t,n){it[lt++]=Vt,it[lt++]=Bt,it[lt++]=_n,_n=e;var r=Vt;e=Bt;var o=32-jt(r)-1;r&=~(1<<o),n+=1;var i=32-jt(t)+o;if(30<i){var l=o-o%5;i=(r&(1<<l)-1).toString(32),r>>=l,o-=l,Vt=1<<32-jt(t)+o|n<<o|r,Bt=i+e}else Vt=1<<i|n<<o|r,Bt=e}function Ls(e){e.return!==null&&($n(e,1),gp(e,1,0))}function zs(e){for(;e===zi;)zi=rr[--or],rr[or]=null,Ri=rr[--or],rr[or]=null;for(;e===_n;)_n=it[--lt],it[lt]=null,Bt=it[--lt],it[lt]=null,Vt=it[--lt],it[lt]=null}var Je=null,Ze=null,te=!1,kt=null;function yp(e,t){var n=st(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function pc(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Je=e,Ze=pn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Je=e,Ze=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=_n!==null?{id:Vt,overflow:Bt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=st(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Je=e,Ze=null,!0):!1;default:return!1}}function Ba(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ha(e){if(te){var t=Ze;if(t){var n=t;if(!pc(e,t)){if(Ba(e))throw Error(C(418));t=pn(n.nextSibling);var r=Je;t&&pc(e,t)?yp(r,n):(e.flags=e.flags&-4097|2,te=!1,Je=e)}}else{if(Ba(e))throw Error(C(418));e.flags=e.flags&-4097|2,te=!1,Je=e}}}function fc(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Je=e}function Wo(e){if(e!==Je)return!1;if(!te)return fc(e),te=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Ra(e.type,e.memoizedProps)),t&&(t=Ze)){if(Ba(e))throw vp(),Error(C(418));for(;t;)yp(e,t),t=pn(t.nextSibling)}if(fc(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(C(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Ze=pn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Ze=null}}else Ze=Je?pn(e.stateNode.nextSibling):null;return!0}function vp(){for(var e=Ze;e;)e=pn(e.nextSibling)}function xr(){Ze=Je=null,te=!1}function Rs(e){kt===null?kt=[e]:kt.push(e)}var ig=Xt.ReactCurrentBatchConfig;function Rr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(C(309));var r=n.stateNode}if(!r)throw Error(C(147,e));var o=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(l){var u=o.refs;l===null?delete u[i]:u[i]=l},t._stringRef=i,t)}if(typeof e!="string")throw Error(C(284));if(!n._owner)throw Error(C(290,e))}return e}function Go(e,t){throw e=Object.prototype.toString.call(t),Error(C(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function mc(e){var t=e._init;return t(e._payload)}function xp(e){function t(p,d){if(e){var h=p.deletions;h===null?(p.deletions=[d],p.flags|=16):h.push(d)}}function n(p,d){if(!e)return null;for(;d!==null;)t(p,d),d=d.sibling;return null}function r(p,d){for(p=new Map;d!==null;)d.key!==null?p.set(d.key,d):p.set(d.index,d),d=d.sibling;return p}function o(p,d){return p=gn(p,d),p.index=0,p.sibling=null,p}function i(p,d,h){return p.index=h,e?(h=p.alternate,h!==null?(h=h.index,h<d?(p.flags|=2,d):h):(p.flags|=2,d)):(p.flags|=1048576,d)}function l(p){return e&&p.alternate===null&&(p.flags|=2),p}function u(p,d,h,w){return d===null||d.tag!==6?(d=ql(h,p.mode,w),d.return=p,d):(d=o(d,h),d.return=p,d)}function s(p,d,h,w){var $=h.type;return $===Zn?g(p,d,h.props.children,w,h.key):d!==null&&(d.elementType===$||typeof $=="object"&&$!==null&&$.$$typeof===tn&&mc($)===d.type)?(w=o(d,h.props),w.ref=Rr(p,d,h),w.return=p,w):(w=Si(h.type,h.key,h.props,null,p.mode,w),w.ref=Rr(p,d,h),w.return=p,w)}function c(p,d,h,w){return d===null||d.tag!==4||d.stateNode.containerInfo!==h.containerInfo||d.stateNode.implementation!==h.implementation?(d=ea(h,p.mode,w),d.return=p,d):(d=o(d,h.children||[]),d.return=p,d)}function g(p,d,h,w,$){return d===null||d.tag!==7?(d=Nn(h,p.mode,w,$),d.return=p,d):(d=o(d,h),d.return=p,d)}function y(p,d,h){if(typeof d=="string"&&d!==""||typeof d=="number")return d=ql(""+d,p.mode,h),d.return=p,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case _o:return h=Si(d.type,d.key,d.props,null,p.mode,h),h.ref=Rr(p,null,d),h.return=p,h;case Kn:return d=ea(d,p.mode,h),d.return=p,d;case tn:var w=d._init;return y(p,w(d._payload),h)}if(Hr(d)||Mr(d))return d=Nn(d,p.mode,h,null),d.return=p,d;Go(p,d)}return null}function f(p,d,h,w){var $=d!==null?d.key:null;if(typeof h=="string"&&h!==""||typeof h=="number")return $!==null?null:u(p,d,""+h,w);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case _o:return h.key===$?s(p,d,h,w):null;case Kn:return h.key===$?c(p,d,h,w):null;case tn:return $=h._init,f(p,d,$(h._payload),w)}if(Hr(h)||Mr(h))return $!==null?null:g(p,d,h,w,null);Go(p,h)}return null}function v(p,d,h,w,$){if(typeof w=="string"&&w!==""||typeof w=="number")return p=p.get(h)||null,u(d,p,""+w,$);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case _o:return p=p.get(w.key===null?h:w.key)||null,s(d,p,w,$);case Kn:return p=p.get(w.key===null?h:w.key)||null,c(d,p,w,$);case tn:var k=w._init;return v(p,d,h,k(w._payload),$)}if(Hr(w)||Mr(w))return p=p.get(h)||null,g(d,p,w,$,null);Go(d,w)}return null}function x(p,d,h,w){for(var $=null,k=null,j=d,T=d=0,z=null;j!==null&&T<h.length;T++){j.index>T?(z=j,j=null):z=j.sibling;var _=f(p,j,h[T],w);if(_===null){j===null&&(j=z);break}e&&j&&_.alternate===null&&t(p,j),d=i(_,d,T),k===null?$=_:k.sibling=_,k=_,j=z}if(T===h.length)return n(p,j),te&&$n(p,T),$;if(j===null){for(;T<h.length;T++)j=y(p,h[T],w),j!==null&&(d=i(j,d,T),k===null?$=j:k.sibling=j,k=j);return te&&$n(p,T),$}for(j=r(p,j);T<h.length;T++)z=v(j,p,T,h[T],w),z!==null&&(e&&z.alternate!==null&&j.delete(z.key===null?T:z.key),d=i(z,d,T),k===null?$=z:k.sibling=z,k=z);return e&&j.forEach(function(Y){return t(p,Y)}),te&&$n(p,T),$}function S(p,d,h,w){var $=Mr(h);if(typeof $!="function")throw Error(C(150));if(h=$.call(h),h==null)throw Error(C(151));for(var k=$=null,j=d,T=d=0,z=null,_=h.next();j!==null&&!_.done;T++,_=h.next()){j.index>T?(z=j,j=null):z=j.sibling;var Y=f(p,j,_.value,w);if(Y===null){j===null&&(j=z);break}e&&j&&Y.alternate===null&&t(p,j),d=i(Y,d,T),k===null?$=Y:k.sibling=Y,k=Y,j=z}if(_.done)return n(p,j),te&&$n(p,T),$;if(j===null){for(;!_.done;T++,_=h.next())_=y(p,_.value,w),_!==null&&(d=i(_,d,T),k===null?$=_:k.sibling=_,k=_);return te&&$n(p,T),$}for(j=r(p,j);!_.done;T++,_=h.next())_=v(j,p,T,_.value,w),_!==null&&(e&&_.alternate!==null&&j.delete(_.key===null?T:_.key),d=i(_,d,T),k===null?$=_:k.sibling=_,k=_);return e&&j.forEach(function(Fe){return t(p,Fe)}),te&&$n(p,T),$}function N(p,d,h,w){if(typeof h=="object"&&h!==null&&h.type===Zn&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case _o:e:{for(var $=h.key,k=d;k!==null;){if(k.key===$){if($=h.type,$===Zn){if(k.tag===7){n(p,k.sibling),d=o(k,h.props.children),d.return=p,p=d;break e}}else if(k.elementType===$||typeof $=="object"&&$!==null&&$.$$typeof===tn&&mc($)===k.type){n(p,k.sibling),d=o(k,h.props),d.ref=Rr(p,k,h),d.return=p,p=d;break e}n(p,k);break}else t(p,k);k=k.sibling}h.type===Zn?(d=Nn(h.props.children,p.mode,w,h.key),d.return=p,p=d):(w=Si(h.type,h.key,h.props,null,p.mode,w),w.ref=Rr(p,d,h),w.return=p,p=w)}return l(p);case Kn:e:{for(k=h.key;d!==null;){if(d.key===k)if(d.tag===4&&d.stateNode.containerInfo===h.containerInfo&&d.stateNode.implementation===h.implementation){n(p,d.sibling),d=o(d,h.children||[]),d.return=p,p=d;break e}else{n(p,d);break}else t(p,d);d=d.sibling}d=ea(h,p.mode,w),d.return=p,p=d}return l(p);case tn:return k=h._init,N(p,d,k(h._payload),w)}if(Hr(h))return x(p,d,h,w);if(Mr(h))return S(p,d,h,w);Go(p,h)}return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h,d!==null&&d.tag===6?(n(p,d.sibling),d=o(d,h),d.return=p,p=d):(n(p,d),d=ql(h,p.mode,w),d.return=p,p=d),l(p)):n(p,d)}return N}var wr=xp(!0),wp=xp(!1),Oi=Sn(null),Ui=null,ir=null,Os=null;function Us(){Os=ir=Ui=null}function Vs(e){var t=Oi.current;ee(Oi),e._currentValue=t}function Wa(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function fr(e,t){Ui=e,Os=ir=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Be=!0),e.firstContext=null)}function ct(e){var t=e._currentValue;if(Os!==e)if(e={context:e,memoizedValue:t,next:null},ir===null){if(Ui===null)throw Error(C(308));ir=e,Ui.dependencies={lanes:0,firstContext:e}}else ir=ir.next=e;return t}var bn=null;function Bs(e){bn===null?bn=[e]:bn.push(e)}function Sp(e,t,n,r){var o=t.interleaved;return o===null?(n.next=n,Bs(t)):(n.next=o.next,o.next=n),t.interleaved=n,Qt(e,r)}function Qt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var nn=!1;function Hs(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function kp(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ht(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function fn(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,O&2){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,Qt(e,n)}return o=r.interleaved,o===null?(t.next=t,Bs(r)):(t.next=o.next,o.next=t),r.interleaved=t,Qt(e,n)}function hi(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ts(e,n)}}function hc(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var o=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var l={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?o=i=l:i=i.next=l,n=n.next}while(n!==null);i===null?o=i=t:i=i.next=t}else o=i=t;n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Vi(e,t,n,r){var o=e.updateQueue;nn=!1;var i=o.firstBaseUpdate,l=o.lastBaseUpdate,u=o.shared.pending;if(u!==null){o.shared.pending=null;var s=u,c=s.next;s.next=null,l===null?i=c:l.next=c,l=s;var g=e.alternate;g!==null&&(g=g.updateQueue,u=g.lastBaseUpdate,u!==l&&(u===null?g.firstBaseUpdate=c:u.next=c,g.lastBaseUpdate=s))}if(i!==null){var y=o.baseState;l=0,g=c=s=null,u=i;do{var f=u.lane,v=u.eventTime;if((r&f)===f){g!==null&&(g=g.next={eventTime:v,lane:0,tag:u.tag,payload:u.payload,callback:u.callback,next:null});e:{var x=e,S=u;switch(f=t,v=n,S.tag){case 1:if(x=S.payload,typeof x=="function"){y=x.call(v,y,f);break e}y=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=S.payload,f=typeof x=="function"?x.call(v,y,f):x,f==null)break e;y=le({},y,f);break e;case 2:nn=!0}}u.callback!==null&&u.lane!==0&&(e.flags|=64,f=o.effects,f===null?o.effects=[u]:f.push(u))}else v={eventTime:v,lane:f,tag:u.tag,payload:u.payload,callback:u.callback,next:null},g===null?(c=g=v,s=y):g=g.next=v,l|=f;if(u=u.next,u===null){if(u=o.shared.pending,u===null)break;f=u,u=f.next,f.next=null,o.lastBaseUpdate=f,o.shared.pending=null}}while(!0);if(g===null&&(s=y),o.baseState=s,o.firstBaseUpdate=c,o.lastBaseUpdate=g,t=o.shared.interleaved,t!==null){o=t;do l|=o.lane,o=o.next;while(o!==t)}else i===null&&(o.shared.lanes=0);Ln|=l,e.lanes=l,e.memoizedState=y}}function gc(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=n,typeof o!="function")throw Error(C(191,o));o.call(r)}}}var bo={},Ft=Sn(bo),go=Sn(bo),yo=Sn(bo);function Tn(e){if(e===bo)throw Error(C(174));return e}function Ws(e,t){switch(K(yo,t),K(go,e),K(Ft,bo),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:$a(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=$a(t,e)}ee(Ft),K(Ft,t)}function Sr(){ee(Ft),ee(go),ee(yo)}function jp(e){Tn(yo.current);var t=Tn(Ft.current),n=$a(t,e.type);t!==n&&(K(go,e),K(Ft,n))}function Gs(e){go.current===e&&(ee(Ft),ee(go))}var oe=Sn(0);function Bi(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ql=[];function Qs(){for(var e=0;e<Ql.length;e++)Ql[e]._workInProgressVersionPrimary=null;Ql.length=0}var gi=Xt.ReactCurrentDispatcher,Yl=Xt.ReactCurrentBatchConfig,An=0,ie=null,me=null,ve=null,Hi=!1,qr=!1,vo=0,lg=0;function be(){throw Error(C(321))}function Ys(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ct(e[n],t[n]))return!1;return!0}function Xs(e,t,n,r,o,i){if(An=i,ie=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,gi.current=e===null||e.memoizedState===null?cg:dg,e=n(r,o),qr){i=0;do{if(qr=!1,vo=0,25<=i)throw Error(C(301));i+=1,ve=me=null,t.updateQueue=null,gi.current=pg,e=n(r,o)}while(qr)}if(gi.current=Wi,t=me!==null&&me.next!==null,An=0,ve=me=ie=null,Hi=!1,t)throw Error(C(300));return e}function Ks(){var e=vo!==0;return vo=0,e}function Tt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ve===null?ie.memoizedState=ve=e:ve=ve.next=e,ve}function dt(){if(me===null){var e=ie.alternate;e=e!==null?e.memoizedState:null}else e=me.next;var t=ve===null?ie.memoizedState:ve.next;if(t!==null)ve=t,me=e;else{if(e===null)throw Error(C(310));me=e,e={memoizedState:me.memoizedState,baseState:me.baseState,baseQueue:me.baseQueue,queue:me.queue,next:null},ve===null?ie.memoizedState=ve=e:ve=ve.next=e}return ve}function xo(e,t){return typeof t=="function"?t(e):t}function Xl(e){var t=dt(),n=t.queue;if(n===null)throw Error(C(311));n.lastRenderedReducer=e;var r=me,o=r.baseQueue,i=n.pending;if(i!==null){if(o!==null){var l=o.next;o.next=i.next,i.next=l}r.baseQueue=o=i,n.pending=null}if(o!==null){i=o.next,r=r.baseState;var u=l=null,s=null,c=i;do{var g=c.lane;if((An&g)===g)s!==null&&(s=s.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var y={lane:g,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};s===null?(u=s=y,l=r):s=s.next=y,ie.lanes|=g,Ln|=g}c=c.next}while(c!==null&&c!==i);s===null?l=r:s.next=u,Ct(r,t.memoizedState)||(Be=!0),t.memoizedState=r,t.baseState=l,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){o=e;do i=o.lane,ie.lanes|=i,Ln|=i,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Kl(e){var t=dt(),n=t.queue;if(n===null)throw Error(C(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,i=t.memoizedState;if(o!==null){n.pending=null;var l=o=o.next;do i=e(i,l.action),l=l.next;while(l!==o);Ct(i,t.memoizedState)||(Be=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function Ep(){}function $p(e,t){var n=ie,r=dt(),o=t(),i=!Ct(r.memoizedState,o);if(i&&(r.memoizedState=o,Be=!0),r=r.queue,Zs(bp.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||ve!==null&&ve.memoizedState.tag&1){if(n.flags|=2048,wo(9,Dp.bind(null,n,r,o,t),void 0,null),Se===null)throw Error(C(349));An&30||Cp(n,t,o)}return o}function Cp(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ie.updateQueue,t===null?(t={lastEffect:null,stores:null},ie.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Dp(e,t,n,r){t.value=n,t.getSnapshot=r,Tp(t)&&Pp(e)}function bp(e,t,n){return n(function(){Tp(t)&&Pp(e)})}function Tp(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ct(e,n)}catch{return!0}}function Pp(e){var t=Qt(e,1);t!==null&&Et(t,e,1,-1)}function yc(e){var t=Tt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:xo,lastRenderedState:e},t.queue=e,e=e.dispatch=ug.bind(null,ie,e),[t.memoizedState,e]}function wo(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ie.updateQueue,t===null?(t={lastEffect:null,stores:null},ie.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Ip(){return dt().memoizedState}function yi(e,t,n,r){var o=Tt();ie.flags|=e,o.memoizedState=wo(1|t,n,void 0,r===void 0?null:r)}function cl(e,t,n,r){var o=dt();r=r===void 0?null:r;var i=void 0;if(me!==null){var l=me.memoizedState;if(i=l.destroy,r!==null&&Ys(r,l.deps)){o.memoizedState=wo(t,n,i,r);return}}ie.flags|=e,o.memoizedState=wo(1|t,n,i,r)}function vc(e,t){return yi(8390656,8,e,t)}function Zs(e,t){return cl(2048,8,e,t)}function Np(e,t){return cl(4,2,e,t)}function Fp(e,t){return cl(4,4,e,t)}function Mp(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function _p(e,t,n){return n=n!=null?n.concat([e]):null,cl(4,4,Mp.bind(null,t,e),n)}function Js(){}function Ap(e,t){var n=dt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ys(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Lp(e,t){var n=dt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ys(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function zp(e,t,n){return An&21?(Ct(n,t)||(n=Bd(),ie.lanes|=n,Ln|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Be=!0),e.memoizedState=n)}function ag(e,t){var n=W;W=n!==0&&4>n?n:4,e(!0);var r=Yl.transition;Yl.transition={};try{e(!1),t()}finally{W=n,Yl.transition=r}}function Rp(){return dt().memoizedState}function sg(e,t,n){var r=hn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Op(e))Up(t,n);else if(n=Sp(e,t,n,r),n!==null){var o=Ae();Et(n,e,r,o),Vp(n,t,r)}}function ug(e,t,n){var r=hn(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Op(e))Up(t,o);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var l=t.lastRenderedState,u=i(l,n);if(o.hasEagerState=!0,o.eagerState=u,Ct(u,l)){var s=t.interleaved;s===null?(o.next=o,Bs(t)):(o.next=s.next,s.next=o),t.interleaved=o;return}}catch{}finally{}n=Sp(e,t,o,r),n!==null&&(o=Ae(),Et(n,e,r,o),Vp(n,t,r))}}function Op(e){var t=e.alternate;return e===ie||t!==null&&t===ie}function Up(e,t){qr=Hi=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Vp(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ts(e,n)}}var Wi={readContext:ct,useCallback:be,useContext:be,useEffect:be,useImperativeHandle:be,useInsertionEffect:be,useLayoutEffect:be,useMemo:be,useReducer:be,useRef:be,useState:be,useDebugValue:be,useDeferredValue:be,useTransition:be,useMutableSource:be,useSyncExternalStore:be,useId:be,unstable_isNewReconciler:!1},cg={readContext:ct,useCallback:function(e,t){return Tt().memoizedState=[e,t===void 0?null:t],e},useContext:ct,useEffect:vc,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,yi(4194308,4,Mp.bind(null,t,e),n)},useLayoutEffect:function(e,t){return yi(4194308,4,e,t)},useInsertionEffect:function(e,t){return yi(4,2,e,t)},useMemo:function(e,t){var n=Tt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Tt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=sg.bind(null,ie,e),[r.memoizedState,e]},useRef:function(e){var t=Tt();return e={current:e},t.memoizedState=e},useState:yc,useDebugValue:Js,useDeferredValue:function(e){return Tt().memoizedState=e},useTransition:function(){var e=yc(!1),t=e[0];return e=ag.bind(null,e[1]),Tt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ie,o=Tt();if(te){if(n===void 0)throw Error(C(407));n=n()}else{if(n=t(),Se===null)throw Error(C(349));An&30||Cp(r,t,n)}o.memoizedState=n;var i={value:n,getSnapshot:t};return o.queue=i,vc(bp.bind(null,r,i,e),[e]),r.flags|=2048,wo(9,Dp.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=Tt(),t=Se.identifierPrefix;if(te){var n=Bt,r=Vt;n=(r&~(1<<32-jt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=vo++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=lg++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},dg={readContext:ct,useCallback:Ap,useContext:ct,useEffect:Zs,useImperativeHandle:_p,useInsertionEffect:Np,useLayoutEffect:Fp,useMemo:Lp,useReducer:Xl,useRef:Ip,useState:function(){return Xl(xo)},useDebugValue:Js,useDeferredValue:function(e){var t=dt();return zp(t,me.memoizedState,e)},useTransition:function(){var e=Xl(xo)[0],t=dt().memoizedState;return[e,t]},useMutableSource:Ep,useSyncExternalStore:$p,useId:Rp,unstable_isNewReconciler:!1},pg={readContext:ct,useCallback:Ap,useContext:ct,useEffect:Zs,useImperativeHandle:_p,useInsertionEffect:Np,useLayoutEffect:Fp,useMemo:Lp,useReducer:Kl,useRef:Ip,useState:function(){return Kl(xo)},useDebugValue:Js,useDeferredValue:function(e){var t=dt();return me===null?t.memoizedState=e:zp(t,me.memoizedState,e)},useTransition:function(){var e=Kl(xo)[0],t=dt().memoizedState;return[e,t]},useMutableSource:Ep,useSyncExternalStore:$p,useId:Rp,unstable_isNewReconciler:!1};function wt(e,t){if(e&&e.defaultProps){t=le({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Ga(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:le({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var dl={isMounted:function(e){return(e=e._reactInternals)?Bn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ae(),o=hn(e),i=Ht(r,o);i.payload=t,n!=null&&(i.callback=n),t=fn(e,i,o),t!==null&&(Et(t,e,o,r),hi(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ae(),o=hn(e),i=Ht(r,o);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=fn(e,i,o),t!==null&&(Et(t,e,o,r),hi(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ae(),r=hn(e),o=Ht(n,r);o.tag=2,t!=null&&(o.callback=t),t=fn(e,o,r),t!==null&&(Et(t,e,r,n),hi(t,e,r))}};function xc(e,t,n,r,o,i,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,l):t.prototype&&t.prototype.isPureReactComponent?!po(n,r)||!po(o,i):!0}function Bp(e,t,n){var r=!1,o=xn,i=t.contextType;return typeof i=="object"&&i!==null?i=ct(i):(o=We(t)?Mn:Ne.current,r=t.contextTypes,i=(r=r!=null)?vr(e,o):xn),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=dl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=i),t}function wc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&dl.enqueueReplaceState(t,t.state,null)}function Qa(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs={},Hs(e);var i=t.contextType;typeof i=="object"&&i!==null?o.context=ct(i):(i=We(t)?Mn:Ne.current,o.context=vr(e,i)),o.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Ga(e,t,i,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&dl.enqueueReplaceState(o,o.state,null),Vi(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function kr(e,t){try{var n="",r=t;do n+=Om(r),r=r.return;while(r);var o=n}catch(i){o=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:o,digest:null}}function Zl(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Ya(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var fg=typeof WeakMap=="function"?WeakMap:Map;function Hp(e,t,n){n=Ht(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Qi||(Qi=!0,os=r),Ya(e,t)},n}function Wp(e,t,n){n=Ht(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){Ya(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Ya(e,t),typeof r!="function"&&(mn===null?mn=new Set([this]):mn.add(this));var l=t.stack;this.componentDidCatch(t.value,{componentStack:l!==null?l:""})}),n}function Sc(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new fg;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=Dg.bind(null,e,t,n),t.then(e,e))}function kc(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function jc(e,t,n,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Ht(-1,1),t.tag=2,fn(n,t,1))),n.lanes|=1),e)}var mg=Xt.ReactCurrentOwner,Be=!1;function _e(e,t,n,r){t.child=e===null?wp(t,null,n,r):wr(t,e.child,n,r)}function Ec(e,t,n,r,o){n=n.render;var i=t.ref;return fr(t,o),r=Xs(e,t,n,r,i,o),n=Ks(),e!==null&&!Be?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,Yt(e,t,o)):(te&&n&&Ls(t),t.flags|=1,_e(e,t,r,o),t.child)}function $c(e,t,n,r,o){if(e===null){var i=n.type;return typeof i=="function"&&!lu(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,Gp(e,t,i,r,o)):(e=Si(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&o)){var l=i.memoizedProps;if(n=n.compare,n=n!==null?n:po,n(l,r)&&e.ref===t.ref)return Yt(e,t,o)}return t.flags|=1,e=gn(i,r),e.ref=t.ref,e.return=t,t.child=e}function Gp(e,t,n,r,o){if(e!==null){var i=e.memoizedProps;if(po(i,r)&&e.ref===t.ref)if(Be=!1,t.pendingProps=r=i,(e.lanes&o)!==0)e.flags&131072&&(Be=!0);else return t.lanes=e.lanes,Yt(e,t,o)}return Xa(e,t,n,r,o)}function Qp(e,t,n){var r=t.pendingProps,o=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},K(ar,Ke),Ke|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,K(ar,Ke),Ke|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,K(ar,Ke),Ke|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,K(ar,Ke),Ke|=r;return _e(e,t,o,n),t.child}function Yp(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Xa(e,t,n,r,o){var i=We(n)?Mn:Ne.current;return i=vr(t,i),fr(t,o),n=Xs(e,t,n,r,i,o),r=Ks(),e!==null&&!Be?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,Yt(e,t,o)):(te&&r&&Ls(t),t.flags|=1,_e(e,t,n,o),t.child)}function Cc(e,t,n,r,o){if(We(n)){var i=!0;Li(t)}else i=!1;if(fr(t,o),t.stateNode===null)vi(e,t),Bp(t,n,r),Qa(t,n,r,o),r=!0;else if(e===null){var l=t.stateNode,u=t.memoizedProps;l.props=u;var s=l.context,c=n.contextType;typeof c=="object"&&c!==null?c=ct(c):(c=We(n)?Mn:Ne.current,c=vr(t,c));var g=n.getDerivedStateFromProps,y=typeof g=="function"||typeof l.getSnapshotBeforeUpdate=="function";y||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(u!==r||s!==c)&&wc(t,l,r,c),nn=!1;var f=t.memoizedState;l.state=f,Vi(t,r,l,o),s=t.memoizedState,u!==r||f!==s||He.current||nn?(typeof g=="function"&&(Ga(t,n,g,r),s=t.memoizedState),(u=nn||xc(t,n,u,r,f,s,c))?(y||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),l.props=r,l.state=s,l.context=c,r=u):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{l=t.stateNode,kp(e,t),u=t.memoizedProps,c=t.type===t.elementType?u:wt(t.type,u),l.props=c,y=t.pendingProps,f=l.context,s=n.contextType,typeof s=="object"&&s!==null?s=ct(s):(s=We(n)?Mn:Ne.current,s=vr(t,s));var v=n.getDerivedStateFromProps;(g=typeof v=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(u!==y||f!==s)&&wc(t,l,r,s),nn=!1,f=t.memoizedState,l.state=f,Vi(t,r,l,o);var x=t.memoizedState;u!==y||f!==x||He.current||nn?(typeof v=="function"&&(Ga(t,n,v,r),x=t.memoizedState),(c=nn||xc(t,n,c,r,f,x,s)||!1)?(g||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,x,s),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,x,s)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||u===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=x),l.props=r,l.state=x,l.context=s,r=c):(typeof l.componentDidUpdate!="function"||u===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return Ka(e,t,n,r,i,o)}function Ka(e,t,n,r,o,i){Yp(e,t);var l=(t.flags&128)!==0;if(!r&&!l)return o&&dc(t,n,!1),Yt(e,t,i);r=t.stateNode,mg.current=t;var u=l&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&l?(t.child=wr(t,e.child,null,i),t.child=wr(t,null,u,i)):_e(e,t,u,i),t.memoizedState=r.state,o&&dc(t,n,!0),t.child}function Xp(e){var t=e.stateNode;t.pendingContext?cc(e,t.pendingContext,t.pendingContext!==t.context):t.context&&cc(e,t.context,!1),Ws(e,t.containerInfo)}function Dc(e,t,n,r,o){return xr(),Rs(o),t.flags|=256,_e(e,t,n,r),t.child}var Za={dehydrated:null,treeContext:null,retryLane:0};function Ja(e){return{baseLanes:e,cachePool:null,transitions:null}}function Kp(e,t,n){var r=t.pendingProps,o=oe.current,i=!1,l=(t.flags&128)!==0,u;if((u=l)||(u=e!==null&&e.memoizedState===null?!1:(o&2)!==0),u?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),K(oe,o&1),e===null)return Ha(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(l=r.children,e=r.fallback,i?(r=t.mode,i=t.child,l={mode:"hidden",children:l},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=l):i=ml(l,r,0,null),e=Nn(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Ja(n),t.memoizedState=Za,e):qs(t,l));if(o=e.memoizedState,o!==null&&(u=o.dehydrated,u!==null))return hg(e,t,l,r,u,o,n);if(i){i=r.fallback,l=t.mode,o=e.child,u=o.sibling;var s={mode:"hidden",children:r.children};return!(l&1)&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=gn(o,s),r.subtreeFlags=o.subtreeFlags&14680064),u!==null?i=gn(u,i):(i=Nn(i,l,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,l=e.child.memoizedState,l=l===null?Ja(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},i.memoizedState=l,i.childLanes=e.childLanes&~n,t.memoizedState=Za,r}return i=e.child,e=i.sibling,r=gn(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function qs(e,t){return t=ml({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Qo(e,t,n,r){return r!==null&&Rs(r),wr(t,e.child,null,n),e=qs(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function hg(e,t,n,r,o,i,l){if(n)return t.flags&256?(t.flags&=-257,r=Zl(Error(C(422))),Qo(e,t,l,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,o=t.mode,r=ml({mode:"visible",children:r.children},o,0,null),i=Nn(i,o,l,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&wr(t,e.child,null,l),t.child.memoizedState=Ja(l),t.memoizedState=Za,i);if(!(t.mode&1))return Qo(e,t,l,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var u=r.dgst;return r=u,i=Error(C(419)),r=Zl(i,r,void 0),Qo(e,t,l,r)}if(u=(l&e.childLanes)!==0,Be||u){if(r=Se,r!==null){switch(l&-l){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|l)?0:o,o!==0&&o!==i.retryLane&&(i.retryLane=o,Qt(e,o),Et(r,e,o,-1))}return iu(),r=Zl(Error(C(421))),Qo(e,t,l,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=bg.bind(null,e),o._reactRetry=t,null):(e=i.treeContext,Ze=pn(o.nextSibling),Je=t,te=!0,kt=null,e!==null&&(it[lt++]=Vt,it[lt++]=Bt,it[lt++]=_n,Vt=e.id,Bt=e.overflow,_n=t),t=qs(t,r.children),t.flags|=4096,t)}function bc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Wa(e.return,t,n)}function Jl(e,t,n,r,o){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=o)}function Zp(e,t,n){var r=t.pendingProps,o=r.revealOrder,i=r.tail;if(_e(e,t,r.children,n),r=oe.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&bc(e,n,t);else if(e.tag===19)bc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(K(oe,r),!(t.mode&1))t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&Bi(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),Jl(t,!1,o,n,i);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&Bi(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}Jl(t,!0,n,null,i);break;case"together":Jl(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function vi(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Yt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ln|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(C(153));if(t.child!==null){for(e=t.child,n=gn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=gn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function gg(e,t,n){switch(t.tag){case 3:Xp(t),xr();break;case 5:jp(t);break;case 1:We(t.type)&&Li(t);break;case 4:Ws(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;K(Oi,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(K(oe,oe.current&1),t.flags|=128,null):n&t.child.childLanes?Kp(e,t,n):(K(oe,oe.current&1),e=Yt(e,t,n),e!==null?e.sibling:null);K(oe,oe.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Zp(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),K(oe,oe.current),r)break;return null;case 22:case 23:return t.lanes=0,Qp(e,t,n)}return Yt(e,t,n)}var Jp,qa,qp,ef;Jp=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};qa=function(){};qp=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,Tn(Ft.current);var i=null;switch(n){case"input":o=Sa(e,o),r=Sa(e,r),i=[];break;case"select":o=le({},o,{value:void 0}),r=le({},r,{value:void 0}),i=[];break;case"textarea":o=Ea(e,o),r=Ea(e,r),i=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=_i)}Ca(n,r);var l;n=null;for(c in o)if(!r.hasOwnProperty(c)&&o.hasOwnProperty(c)&&o[c]!=null)if(c==="style"){var u=o[c];for(l in u)u.hasOwnProperty(l)&&(n||(n={}),n[l]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(oo.hasOwnProperty(c)?i||(i=[]):(i=i||[]).push(c,null));for(c in r){var s=r[c];if(u=o!=null?o[c]:void 0,r.hasOwnProperty(c)&&s!==u&&(s!=null||u!=null))if(c==="style")if(u){for(l in u)!u.hasOwnProperty(l)||s&&s.hasOwnProperty(l)||(n||(n={}),n[l]="");for(l in s)s.hasOwnProperty(l)&&u[l]!==s[l]&&(n||(n={}),n[l]=s[l])}else n||(i||(i=[]),i.push(c,n)),n=s;else c==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,u=u?u.__html:void 0,s!=null&&u!==s&&(i=i||[]).push(c,s)):c==="children"?typeof s!="string"&&typeof s!="number"||(i=i||[]).push(c,""+s):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(oo.hasOwnProperty(c)?(s!=null&&c==="onScroll"&&J("scroll",e),i||u===s||(i=[])):(i=i||[]).push(c,s))}n&&(i=i||[]).push("style",n);var c=i;(t.updateQueue=c)&&(t.flags|=4)}};ef=function(e,t,n,r){n!==r&&(t.flags|=4)};function Or(e,t){if(!te)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Te(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function yg(e,t,n){var r=t.pendingProps;switch(zs(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Te(t),null;case 1:return We(t.type)&&Ai(),Te(t),null;case 3:return r=t.stateNode,Sr(),ee(He),ee(Ne),Qs(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Wo(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,kt!==null&&(as(kt),kt=null))),qa(e,t),Te(t),null;case 5:Gs(t);var o=Tn(yo.current);if(n=t.type,e!==null&&t.stateNode!=null)qp(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(C(166));return Te(t),null}if(e=Tn(Ft.current),Wo(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[It]=t,r[ho]=i,e=(t.mode&1)!==0,n){case"dialog":J("cancel",r),J("close",r);break;case"iframe":case"object":case"embed":J("load",r);break;case"video":case"audio":for(o=0;o<Gr.length;o++)J(Gr[o],r);break;case"source":J("error",r);break;case"img":case"image":case"link":J("error",r),J("load",r);break;case"details":J("toggle",r);break;case"input":Lu(r,i),J("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},J("invalid",r);break;case"textarea":Ru(r,i),J("invalid",r)}Ca(n,i),o=null;for(var l in i)if(i.hasOwnProperty(l)){var u=i[l];l==="children"?typeof u=="string"?r.textContent!==u&&(i.suppressHydrationWarning!==!0&&Ho(r.textContent,u,e),o=["children",u]):typeof u=="number"&&r.textContent!==""+u&&(i.suppressHydrationWarning!==!0&&Ho(r.textContent,u,e),o=["children",""+u]):oo.hasOwnProperty(l)&&u!=null&&l==="onScroll"&&J("scroll",r)}switch(n){case"input":Ao(r),zu(r,i,!0);break;case"textarea":Ao(r),Ou(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=_i)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{l=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=bd(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=l.createElement(n,{is:r.is}):(e=l.createElement(n),n==="select"&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,n),e[It]=t,e[ho]=r,Jp(e,t,!1,!1),t.stateNode=e;e:{switch(l=Da(n,r),n){case"dialog":J("cancel",e),J("close",e),o=r;break;case"iframe":case"object":case"embed":J("load",e),o=r;break;case"video":case"audio":for(o=0;o<Gr.length;o++)J(Gr[o],e);o=r;break;case"source":J("error",e),o=r;break;case"img":case"image":case"link":J("error",e),J("load",e),o=r;break;case"details":J("toggle",e),o=r;break;case"input":Lu(e,r),o=Sa(e,r),J("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=le({},r,{value:void 0}),J("invalid",e);break;case"textarea":Ru(e,r),o=Ea(e,r),J("invalid",e);break;default:o=r}Ca(n,o),u=o;for(i in u)if(u.hasOwnProperty(i)){var s=u[i];i==="style"?Id(e,s):i==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&Td(e,s)):i==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&io(e,s):typeof s=="number"&&io(e,""+s):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(oo.hasOwnProperty(i)?s!=null&&i==="onScroll"&&J("scroll",e):s!=null&&js(e,i,s,l))}switch(n){case"input":Ao(e),zu(e,r,!1);break;case"textarea":Ao(e),Ou(e);break;case"option":r.value!=null&&e.setAttribute("value",""+vn(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?ur(e,!!r.multiple,i,!1):r.defaultValue!=null&&ur(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=_i)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Te(t),null;case 6:if(e&&t.stateNode!=null)ef(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(C(166));if(n=Tn(yo.current),Tn(Ft.current),Wo(t)){if(r=t.stateNode,n=t.memoizedProps,r[It]=t,(i=r.nodeValue!==n)&&(e=Je,e!==null))switch(e.tag){case 3:Ho(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ho(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[It]=t,t.stateNode=r}return Te(t),null;case 13:if(ee(oe),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(te&&Ze!==null&&t.mode&1&&!(t.flags&128))vp(),xr(),t.flags|=98560,i=!1;else if(i=Wo(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(C(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(C(317));i[It]=t}else xr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Te(t),i=!1}else kt!==null&&(as(kt),kt=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||oe.current&1?he===0&&(he=3):iu())),t.updateQueue!==null&&(t.flags|=4),Te(t),null);case 4:return Sr(),qa(e,t),e===null&&fo(t.stateNode.containerInfo),Te(t),null;case 10:return Vs(t.type._context),Te(t),null;case 17:return We(t.type)&&Ai(),Te(t),null;case 19:if(ee(oe),i=t.memoizedState,i===null)return Te(t),null;if(r=(t.flags&128)!==0,l=i.rendering,l===null)if(r)Or(i,!1);else{if(he!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(l=Bi(e),l!==null){for(t.flags|=128,Or(i,!1),r=l.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,l=i.alternate,l===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=l.childLanes,i.lanes=l.lanes,i.child=l.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=l.memoizedProps,i.memoizedState=l.memoizedState,i.updateQueue=l.updateQueue,i.type=l.type,e=l.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return K(oe,oe.current&1|2),t.child}e=e.sibling}i.tail!==null&&ce()>jr&&(t.flags|=128,r=!0,Or(i,!1),t.lanes=4194304)}else{if(!r)if(e=Bi(l),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Or(i,!0),i.tail===null&&i.tailMode==="hidden"&&!l.alternate&&!te)return Te(t),null}else 2*ce()-i.renderingStartTime>jr&&n!==1073741824&&(t.flags|=128,r=!0,Or(i,!1),t.lanes=4194304);i.isBackwards?(l.sibling=t.child,t.child=l):(n=i.last,n!==null?n.sibling=l:t.child=l,i.last=l)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=ce(),t.sibling=null,n=oe.current,K(oe,r?n&1|2:n&1),t):(Te(t),null);case 22:case 23:return ou(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Ke&1073741824&&(Te(t),t.subtreeFlags&6&&(t.flags|=8192)):Te(t),null;case 24:return null;case 25:return null}throw Error(C(156,t.tag))}function vg(e,t){switch(zs(t),t.tag){case 1:return We(t.type)&&Ai(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Sr(),ee(He),ee(Ne),Qs(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Gs(t),null;case 13:if(ee(oe),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(C(340));xr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ee(oe),null;case 4:return Sr(),null;case 10:return Vs(t.type._context),null;case 22:case 23:return ou(),null;case 24:return null;default:return null}}var Yo=!1,Ie=!1,xg=typeof WeakSet=="function"?WeakSet:Set,I=null;function lr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){se(e,t,r)}else n.current=null}function es(e,t,n){try{n()}catch(r){se(e,t,r)}}var Tc=!1;function wg(e,t){if(La=Ni,e=ip(),As(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var l=0,u=-1,s=-1,c=0,g=0,y=e,f=null;t:for(;;){for(var v;y!==n||o!==0&&y.nodeType!==3||(u=l+o),y!==i||r!==0&&y.nodeType!==3||(s=l+r),y.nodeType===3&&(l+=y.nodeValue.length),(v=y.firstChild)!==null;)f=y,y=v;for(;;){if(y===e)break t;if(f===n&&++c===o&&(u=l),f===i&&++g===r&&(s=l),(v=y.nextSibling)!==null)break;y=f,f=y.parentNode}y=v}n=u===-1||s===-1?null:{start:u,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(za={focusedElem:e,selectionRange:n},Ni=!1,I=t;I!==null;)if(t=I,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,I=e;else for(;I!==null;){t=I;try{var x=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var S=x.memoizedProps,N=x.memoizedState,p=t.stateNode,d=p.getSnapshotBeforeUpdate(t.elementType===t.type?S:wt(t.type,S),N);p.__reactInternalSnapshotBeforeUpdate=d}break;case 3:var h=t.stateNode.containerInfo;h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(C(163))}}catch(w){se(t,t.return,w)}if(e=t.sibling,e!==null){e.return=t.return,I=e;break}I=t.return}return x=Tc,Tc=!1,x}function eo(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var i=o.destroy;o.destroy=void 0,i!==void 0&&es(t,n,i)}o=o.next}while(o!==r)}}function pl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function ts(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function tf(e){var t=e.alternate;t!==null&&(e.alternate=null,tf(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[It],delete t[ho],delete t[Ua],delete t[ng],delete t[rg])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function nf(e){return e.tag===5||e.tag===3||e.tag===4}function Pc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||nf(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ns(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=_i));else if(r!==4&&(e=e.child,e!==null))for(ns(e,t,n),e=e.sibling;e!==null;)ns(e,t,n),e=e.sibling}function rs(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(rs(e,t,n),e=e.sibling;e!==null;)rs(e,t,n),e=e.sibling}var je=null,St=!1;function Zt(e,t,n){for(n=n.child;n!==null;)rf(e,t,n),n=n.sibling}function rf(e,t,n){if(Nt&&typeof Nt.onCommitFiberUnmount=="function")try{Nt.onCommitFiberUnmount(ol,n)}catch{}switch(n.tag){case 5:Ie||lr(n,t);case 6:var r=je,o=St;je=null,Zt(e,t,n),je=r,St=o,je!==null&&(St?(e=je,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):je.removeChild(n.stateNode));break;case 18:je!==null&&(St?(e=je,n=n.stateNode,e.nodeType===8?Wl(e.parentNode,n):e.nodeType===1&&Wl(e,n),uo(e)):Wl(je,n.stateNode));break;case 4:r=je,o=St,je=n.stateNode.containerInfo,St=!0,Zt(e,t,n),je=r,St=o;break;case 0:case 11:case 14:case 15:if(!Ie&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var i=o,l=i.destroy;i=i.tag,l!==void 0&&(i&2||i&4)&&es(n,t,l),o=o.next}while(o!==r)}Zt(e,t,n);break;case 1:if(!Ie&&(lr(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(u){se(n,t,u)}Zt(e,t,n);break;case 21:Zt(e,t,n);break;case 22:n.mode&1?(Ie=(r=Ie)||n.memoizedState!==null,Zt(e,t,n),Ie=r):Zt(e,t,n);break;default:Zt(e,t,n)}}function Ic(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new xg),t.forEach(function(r){var o=Tg.bind(null,e,r);n.has(r)||(n.add(r),r.then(o,o))})}}function vt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];try{var i=e,l=t,u=l;e:for(;u!==null;){switch(u.tag){case 5:je=u.stateNode,St=!1;break e;case 3:je=u.stateNode.containerInfo,St=!0;break e;case 4:je=u.stateNode.containerInfo,St=!0;break e}u=u.return}if(je===null)throw Error(C(160));rf(i,l,o),je=null,St=!1;var s=o.alternate;s!==null&&(s.return=null),o.return=null}catch(c){se(o,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)of(t,e),t=t.sibling}function of(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(vt(t,e),bt(e),r&4){try{eo(3,e,e.return),pl(3,e)}catch(S){se(e,e.return,S)}try{eo(5,e,e.return)}catch(S){se(e,e.return,S)}}break;case 1:vt(t,e),bt(e),r&512&&n!==null&&lr(n,n.return);break;case 5:if(vt(t,e),bt(e),r&512&&n!==null&&lr(n,n.return),e.flags&32){var o=e.stateNode;try{io(o,"")}catch(S){se(e,e.return,S)}}if(r&4&&(o=e.stateNode,o!=null)){var i=e.memoizedProps,l=n!==null?n.memoizedProps:i,u=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{u==="input"&&i.type==="radio"&&i.name!=null&&Cd(o,i),Da(u,l);var c=Da(u,i);for(l=0;l<s.length;l+=2){var g=s[l],y=s[l+1];g==="style"?Id(o,y):g==="dangerouslySetInnerHTML"?Td(o,y):g==="children"?io(o,y):js(o,g,y,c)}switch(u){case"input":ka(o,i);break;case"textarea":Dd(o,i);break;case"select":var f=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!i.multiple;var v=i.value;v!=null?ur(o,!!i.multiple,v,!1):f!==!!i.multiple&&(i.defaultValue!=null?ur(o,!!i.multiple,i.defaultValue,!0):ur(o,!!i.multiple,i.multiple?[]:"",!1))}o[ho]=i}catch(S){se(e,e.return,S)}}break;case 6:if(vt(t,e),bt(e),r&4){if(e.stateNode===null)throw Error(C(162));o=e.stateNode,i=e.memoizedProps;try{o.nodeValue=i}catch(S){se(e,e.return,S)}}break;case 3:if(vt(t,e),bt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{uo(t.containerInfo)}catch(S){se(e,e.return,S)}break;case 4:vt(t,e),bt(e);break;case 13:vt(t,e),bt(e),o=e.child,o.flags&8192&&(i=o.memoizedState!==null,o.stateNode.isHidden=i,!i||o.alternate!==null&&o.alternate.memoizedState!==null||(nu=ce())),r&4&&Ic(e);break;case 22:if(g=n!==null&&n.memoizedState!==null,e.mode&1?(Ie=(c=Ie)||g,vt(t,e),Ie=c):vt(t,e),bt(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!g&&e.mode&1)for(I=e,g=e.child;g!==null;){for(y=I=g;I!==null;){switch(f=I,v=f.child,f.tag){case 0:case 11:case 14:case 15:eo(4,f,f.return);break;case 1:lr(f,f.return);var x=f.stateNode;if(typeof x.componentWillUnmount=="function"){r=f,n=f.return;try{t=r,x.props=t.memoizedProps,x.state=t.memoizedState,x.componentWillUnmount()}catch(S){se(r,n,S)}}break;case 5:lr(f,f.return);break;case 22:if(f.memoizedState!==null){Fc(y);continue}}v!==null?(v.return=f,I=v):Fc(y)}g=g.sibling}e:for(g=null,y=e;;){if(y.tag===5){if(g===null){g=y;try{o=y.stateNode,c?(i=o.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(u=y.stateNode,s=y.memoizedProps.style,l=s!=null&&s.hasOwnProperty("display")?s.display:null,u.style.display=Pd("display",l))}catch(S){se(e,e.return,S)}}}else if(y.tag===6){if(g===null)try{y.stateNode.nodeValue=c?"":y.memoizedProps}catch(S){se(e,e.return,S)}}else if((y.tag!==22&&y.tag!==23||y.memoizedState===null||y===e)&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===e)break e;for(;y.sibling===null;){if(y.return===null||y.return===e)break e;g===y&&(g=null),y=y.return}g===y&&(g=null),y.sibling.return=y.return,y=y.sibling}}break;case 19:vt(t,e),bt(e),r&4&&Ic(e);break;case 21:break;default:vt(t,e),bt(e)}}function bt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(nf(n)){var r=n;break e}n=n.return}throw Error(C(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(io(o,""),r.flags&=-33);var i=Pc(e);rs(e,i,o);break;case 3:case 4:var l=r.stateNode.containerInfo,u=Pc(e);ns(e,u,l);break;default:throw Error(C(161))}}catch(s){se(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Sg(e,t,n){I=e,lf(e)}function lf(e,t,n){for(var r=(e.mode&1)!==0;I!==null;){var o=I,i=o.child;if(o.tag===22&&r){var l=o.memoizedState!==null||Yo;if(!l){var u=o.alternate,s=u!==null&&u.memoizedState!==null||Ie;u=Yo;var c=Ie;if(Yo=l,(Ie=s)&&!c)for(I=o;I!==null;)l=I,s=l.child,l.tag===22&&l.memoizedState!==null?Mc(o):s!==null?(s.return=l,I=s):Mc(o);for(;i!==null;)I=i,lf(i),i=i.sibling;I=o,Yo=u,Ie=c}Nc(e)}else o.subtreeFlags&8772&&i!==null?(i.return=o,I=i):Nc(e)}}function Nc(e){for(;I!==null;){var t=I;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Ie||pl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Ie)if(n===null)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:wt(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&gc(t,i,r);break;case 3:var l=t.updateQueue;if(l!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}gc(t,l,n)}break;case 5:var u=t.stateNode;if(n===null&&t.flags&4){n=u;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var g=c.memoizedState;if(g!==null){var y=g.dehydrated;y!==null&&uo(y)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(C(163))}Ie||t.flags&512&&ts(t)}catch(f){se(t,t.return,f)}}if(t===e){I=null;break}if(n=t.sibling,n!==null){n.return=t.return,I=n;break}I=t.return}}function Fc(e){for(;I!==null;){var t=I;if(t===e){I=null;break}var n=t.sibling;if(n!==null){n.return=t.return,I=n;break}I=t.return}}function Mc(e){for(;I!==null;){var t=I;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{pl(4,t)}catch(s){se(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(s){se(t,o,s)}}var i=t.return;try{ts(t)}catch(s){se(t,i,s)}break;case 5:var l=t.return;try{ts(t)}catch(s){se(t,l,s)}}}catch(s){se(t,t.return,s)}if(t===e){I=null;break}var u=t.sibling;if(u!==null){u.return=t.return,I=u;break}I=t.return}}var kg=Math.ceil,Gi=Xt.ReactCurrentDispatcher,eu=Xt.ReactCurrentOwner,ut=Xt.ReactCurrentBatchConfig,O=0,Se=null,fe=null,Ee=0,Ke=0,ar=Sn(0),he=0,So=null,Ln=0,fl=0,tu=0,to=null,Ve=null,nu=0,jr=1/0,Rt=null,Qi=!1,os=null,mn=null,Xo=!1,an=null,Yi=0,no=0,is=null,xi=-1,wi=0;function Ae(){return O&6?ce():xi!==-1?xi:xi=ce()}function hn(e){return e.mode&1?O&2&&Ee!==0?Ee&-Ee:ig.transition!==null?(wi===0&&(wi=Bd()),wi):(e=W,e!==0||(e=window.event,e=e===void 0?16:Kd(e.type)),e):1}function Et(e,t,n,r){if(50<no)throw no=0,is=null,Error(C(185));$o(e,n,r),(!(O&2)||e!==Se)&&(e===Se&&(!(O&2)&&(fl|=n),he===4&&on(e,Ee)),Ge(e,r),n===1&&O===0&&!(t.mode&1)&&(jr=ce()+500,ul&&kn()))}function Ge(e,t){var n=e.callbackNode;ih(e,t);var r=Ii(e,e===Se?Ee:0);if(r===0)n!==null&&Bu(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Bu(n),t===1)e.tag===0?og(_c.bind(null,e)):hp(_c.bind(null,e)),eg(function(){!(O&6)&&kn()}),n=null;else{switch(Hd(r)){case 1:n=bs;break;case 4:n=Ud;break;case 16:n=Pi;break;case 536870912:n=Vd;break;default:n=Pi}n=mf(n,af.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function af(e,t){if(xi=-1,wi=0,O&6)throw Error(C(327));var n=e.callbackNode;if(mr()&&e.callbackNode!==n)return null;var r=Ii(e,e===Se?Ee:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Xi(e,r);else{t=r;var o=O;O|=2;var i=uf();(Se!==e||Ee!==t)&&(Rt=null,jr=ce()+500,In(e,t));do try{$g();break}catch(u){sf(e,u)}while(!0);Us(),Gi.current=i,O=o,fe!==null?t=0:(Se=null,Ee=0,t=he)}if(t!==0){if(t===2&&(o=Na(e),o!==0&&(r=o,t=ls(e,o))),t===1)throw n=So,In(e,0),on(e,r),Ge(e,ce()),n;if(t===6)on(e,r);else{if(o=e.current.alternate,!(r&30)&&!jg(o)&&(t=Xi(e,r),t===2&&(i=Na(e),i!==0&&(r=i,t=ls(e,i))),t===1))throw n=So,In(e,0),on(e,r),Ge(e,ce()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(C(345));case 2:Cn(e,Ve,Rt);break;case 3:if(on(e,r),(r&130023424)===r&&(t=nu+500-ce(),10<t)){if(Ii(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){Ae(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=Oa(Cn.bind(null,e,Ve,Rt),t);break}Cn(e,Ve,Rt);break;case 4:if(on(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var l=31-jt(r);i=1<<l,l=t[l],l>o&&(o=l),r&=~i}if(r=o,r=ce()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*kg(r/1960))-r,10<r){e.timeoutHandle=Oa(Cn.bind(null,e,Ve,Rt),r);break}Cn(e,Ve,Rt);break;case 5:Cn(e,Ve,Rt);break;default:throw Error(C(329))}}}return Ge(e,ce()),e.callbackNode===n?af.bind(null,e):null}function ls(e,t){var n=to;return e.current.memoizedState.isDehydrated&&(In(e,t).flags|=256),e=Xi(e,t),e!==2&&(t=Ve,Ve=n,t!==null&&as(t)),e}function as(e){Ve===null?Ve=e:Ve.push.apply(Ve,e)}function jg(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var o=n[r],i=o.getSnapshot;o=o.value;try{if(!Ct(i(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function on(e,t){for(t&=~tu,t&=~fl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-jt(t),r=1<<n;e[n]=-1,t&=~r}}function _c(e){if(O&6)throw Error(C(327));mr();var t=Ii(e,0);if(!(t&1))return Ge(e,ce()),null;var n=Xi(e,t);if(e.tag!==0&&n===2){var r=Na(e);r!==0&&(t=r,n=ls(e,r))}if(n===1)throw n=So,In(e,0),on(e,t),Ge(e,ce()),n;if(n===6)throw Error(C(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Cn(e,Ve,Rt),Ge(e,ce()),null}function ru(e,t){var n=O;O|=1;try{return e(t)}finally{O=n,O===0&&(jr=ce()+500,ul&&kn())}}function zn(e){an!==null&&an.tag===0&&!(O&6)&&mr();var t=O;O|=1;var n=ut.transition,r=W;try{if(ut.transition=null,W=1,e)return e()}finally{W=r,ut.transition=n,O=t,!(O&6)&&kn()}}function ou(){Ke=ar.current,ee(ar)}function In(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,qh(n)),fe!==null)for(n=fe.return;n!==null;){var r=n;switch(zs(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Ai();break;case 3:Sr(),ee(He),ee(Ne),Qs();break;case 5:Gs(r);break;case 4:Sr();break;case 13:ee(oe);break;case 19:ee(oe);break;case 10:Vs(r.type._context);break;case 22:case 23:ou()}n=n.return}if(Se=e,fe=e=gn(e.current,null),Ee=Ke=t,he=0,So=null,tu=fl=Ln=0,Ve=to=null,bn!==null){for(t=0;t<bn.length;t++)if(n=bn[t],r=n.interleaved,r!==null){n.interleaved=null;var o=r.next,i=n.pending;if(i!==null){var l=i.next;i.next=o,r.next=l}n.pending=r}bn=null}return e}function sf(e,t){do{var n=fe;try{if(Us(),gi.current=Wi,Hi){for(var r=ie.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}Hi=!1}if(An=0,ve=me=ie=null,qr=!1,vo=0,eu.current=null,n===null||n.return===null){he=1,So=t,fe=null;break}e:{var i=e,l=n.return,u=n,s=t;if(t=Ee,u.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var c=s,g=u,y=g.tag;if(!(g.mode&1)&&(y===0||y===11||y===15)){var f=g.alternate;f?(g.updateQueue=f.updateQueue,g.memoizedState=f.memoizedState,g.lanes=f.lanes):(g.updateQueue=null,g.memoizedState=null)}var v=kc(l);if(v!==null){v.flags&=-257,jc(v,l,u,i,t),v.mode&1&&Sc(i,c,t),t=v,s=c;var x=t.updateQueue;if(x===null){var S=new Set;S.add(s),t.updateQueue=S}else x.add(s);break e}else{if(!(t&1)){Sc(i,c,t),iu();break e}s=Error(C(426))}}else if(te&&u.mode&1){var N=kc(l);if(N!==null){!(N.flags&65536)&&(N.flags|=256),jc(N,l,u,i,t),Rs(kr(s,u));break e}}i=s=kr(s,u),he!==4&&(he=2),to===null?to=[i]:to.push(i),i=l;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var p=Hp(i,s,t);hc(i,p);break e;case 1:u=s;var d=i.type,h=i.stateNode;if(!(i.flags&128)&&(typeof d.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(mn===null||!mn.has(h)))){i.flags|=65536,t&=-t,i.lanes|=t;var w=Wp(i,u,t);hc(i,w);break e}}i=i.return}while(i!==null)}df(n)}catch($){t=$,fe===n&&n!==null&&(fe=n=n.return);continue}break}while(!0)}function uf(){var e=Gi.current;return Gi.current=Wi,e===null?Wi:e}function iu(){(he===0||he===3||he===2)&&(he=4),Se===null||!(Ln&268435455)&&!(fl&268435455)||on(Se,Ee)}function Xi(e,t){var n=O;O|=2;var r=uf();(Se!==e||Ee!==t)&&(Rt=null,In(e,t));do try{Eg();break}catch(o){sf(e,o)}while(!0);if(Us(),O=n,Gi.current=r,fe!==null)throw Error(C(261));return Se=null,Ee=0,he}function Eg(){for(;fe!==null;)cf(fe)}function $g(){for(;fe!==null&&!Km();)cf(fe)}function cf(e){var t=ff(e.alternate,e,Ke);e.memoizedProps=e.pendingProps,t===null?df(e):fe=t,eu.current=null}function df(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=vg(n,t),n!==null){n.flags&=32767,fe=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{he=6,fe=null;return}}else if(n=yg(n,t,Ke),n!==null){fe=n;return}if(t=t.sibling,t!==null){fe=t;return}fe=t=e}while(t!==null);he===0&&(he=5)}function Cn(e,t,n){var r=W,o=ut.transition;try{ut.transition=null,W=1,Cg(e,t,n,r)}finally{ut.transition=o,W=r}return null}function Cg(e,t,n,r){do mr();while(an!==null);if(O&6)throw Error(C(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(C(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(lh(e,i),e===Se&&(fe=Se=null,Ee=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Xo||(Xo=!0,mf(Pi,function(){return mr(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=ut.transition,ut.transition=null;var l=W;W=1;var u=O;O|=4,eu.current=null,wg(e,n),of(n,e),Gh(za),Ni=!!La,za=La=null,e.current=n,Sg(n),Zm(),O=u,W=l,ut.transition=i}else e.current=n;if(Xo&&(Xo=!1,an=e,Yi=o),i=e.pendingLanes,i===0&&(mn=null),eh(n.stateNode),Ge(e,ce()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(Qi)throw Qi=!1,e=os,os=null,e;return Yi&1&&e.tag!==0&&mr(),i=e.pendingLanes,i&1?e===is?no++:(no=0,is=e):no=0,kn(),null}function mr(){if(an!==null){var e=Hd(Yi),t=ut.transition,n=W;try{if(ut.transition=null,W=16>e?16:e,an===null)var r=!1;else{if(e=an,an=null,Yi=0,O&6)throw Error(C(331));var o=O;for(O|=4,I=e.current;I!==null;){var i=I,l=i.child;if(I.flags&16){var u=i.deletions;if(u!==null){for(var s=0;s<u.length;s++){var c=u[s];for(I=c;I!==null;){var g=I;switch(g.tag){case 0:case 11:case 15:eo(8,g,i)}var y=g.child;if(y!==null)y.return=g,I=y;else for(;I!==null;){g=I;var f=g.sibling,v=g.return;if(tf(g),g===c){I=null;break}if(f!==null){f.return=v,I=f;break}I=v}}}var x=i.alternate;if(x!==null){var S=x.child;if(S!==null){x.child=null;do{var N=S.sibling;S.sibling=null,S=N}while(S!==null)}}I=i}}if(i.subtreeFlags&2064&&l!==null)l.return=i,I=l;else e:for(;I!==null;){if(i=I,i.flags&2048)switch(i.tag){case 0:case 11:case 15:eo(9,i,i.return)}var p=i.sibling;if(p!==null){p.return=i.return,I=p;break e}I=i.return}}var d=e.current;for(I=d;I!==null;){l=I;var h=l.child;if(l.subtreeFlags&2064&&h!==null)h.return=l,I=h;else e:for(l=d;I!==null;){if(u=I,u.flags&2048)try{switch(u.tag){case 0:case 11:case 15:pl(9,u)}}catch($){se(u,u.return,$)}if(u===l){I=null;break e}var w=u.sibling;if(w!==null){w.return=u.return,I=w;break e}I=u.return}}if(O=o,kn(),Nt&&typeof Nt.onPostCommitFiberRoot=="function")try{Nt.onPostCommitFiberRoot(ol,e)}catch{}r=!0}return r}finally{W=n,ut.transition=t}}return!1}function Ac(e,t,n){t=kr(n,t),t=Hp(e,t,1),e=fn(e,t,1),t=Ae(),e!==null&&($o(e,1,t),Ge(e,t))}function se(e,t,n){if(e.tag===3)Ac(e,e,n);else for(;t!==null;){if(t.tag===3){Ac(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(mn===null||!mn.has(r))){e=kr(n,e),e=Wp(t,e,1),t=fn(t,e,1),e=Ae(),t!==null&&($o(t,1,e),Ge(t,e));break}}t=t.return}}function Dg(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ae(),e.pingedLanes|=e.suspendedLanes&n,Se===e&&(Ee&n)===n&&(he===4||he===3&&(Ee&130023424)===Ee&&500>ce()-nu?In(e,0):tu|=n),Ge(e,t)}function pf(e,t){t===0&&(e.mode&1?(t=Ro,Ro<<=1,!(Ro&130023424)&&(Ro=4194304)):t=1);var n=Ae();e=Qt(e,t),e!==null&&($o(e,t,n),Ge(e,n))}function bg(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),pf(e,n)}function Tg(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(C(314))}r!==null&&r.delete(t),pf(e,n)}var ff;ff=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||He.current)Be=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Be=!1,gg(e,t,n);Be=!!(e.flags&131072)}else Be=!1,te&&t.flags&1048576&&gp(t,Ri,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;vi(e,t),e=t.pendingProps;var o=vr(t,Ne.current);fr(t,n),o=Xs(null,t,r,e,o,n);var i=Ks();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,We(r)?(i=!0,Li(t)):i=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Hs(t),o.updater=dl,t.stateNode=o,o._reactInternals=t,Qa(t,r,e,n),t=Ka(null,t,r,!0,i,n)):(t.tag=0,te&&i&&Ls(t),_e(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(vi(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=Ig(r),e=wt(r,e),o){case 0:t=Xa(null,t,r,e,n);break e;case 1:t=Cc(null,t,r,e,n);break e;case 11:t=Ec(null,t,r,e,n);break e;case 14:t=$c(null,t,r,wt(r.type,e),n);break e}throw Error(C(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:wt(r,o),Xa(e,t,r,o,n);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:wt(r,o),Cc(e,t,r,o,n);case 3:e:{if(Xp(t),e===null)throw Error(C(387));r=t.pendingProps,i=t.memoizedState,o=i.element,kp(e,t),Vi(t,r,null,n);var l=t.memoizedState;if(r=l.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){o=kr(Error(C(423)),t),t=Dc(e,t,r,n,o);break e}else if(r!==o){o=kr(Error(C(424)),t),t=Dc(e,t,r,n,o);break e}else for(Ze=pn(t.stateNode.containerInfo.firstChild),Je=t,te=!0,kt=null,n=wp(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(xr(),r===o){t=Yt(e,t,n);break e}_e(e,t,r,n)}t=t.child}return t;case 5:return jp(t),e===null&&Ha(t),r=t.type,o=t.pendingProps,i=e!==null?e.memoizedProps:null,l=o.children,Ra(r,o)?l=null:i!==null&&Ra(r,i)&&(t.flags|=32),Yp(e,t),_e(e,t,l,n),t.child;case 6:return e===null&&Ha(t),null;case 13:return Kp(e,t,n);case 4:return Ws(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=wr(t,null,r,n):_e(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:wt(r,o),Ec(e,t,r,o,n);case 7:return _e(e,t,t.pendingProps,n),t.child;case 8:return _e(e,t,t.pendingProps.children,n),t.child;case 12:return _e(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,i=t.memoizedProps,l=o.value,K(Oi,r._currentValue),r._currentValue=l,i!==null)if(Ct(i.value,l)){if(i.children===o.children&&!He.current){t=Yt(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var u=i.dependencies;if(u!==null){l=i.child;for(var s=u.firstContext;s!==null;){if(s.context===r){if(i.tag===1){s=Ht(-1,n&-n),s.tag=2;var c=i.updateQueue;if(c!==null){c=c.shared;var g=c.pending;g===null?s.next=s:(s.next=g.next,g.next=s),c.pending=s}}i.lanes|=n,s=i.alternate,s!==null&&(s.lanes|=n),Wa(i.return,n,t),u.lanes|=n;break}s=s.next}}else if(i.tag===10)l=i.type===t.type?null:i.child;else if(i.tag===18){if(l=i.return,l===null)throw Error(C(341));l.lanes|=n,u=l.alternate,u!==null&&(u.lanes|=n),Wa(l,n,t),l=i.sibling}else l=i.child;if(l!==null)l.return=i;else for(l=i;l!==null;){if(l===t){l=null;break}if(i=l.sibling,i!==null){i.return=l.return,l=i;break}l=l.return}i=l}_e(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,fr(t,n),o=ct(o),r=r(o),t.flags|=1,_e(e,t,r,n),t.child;case 14:return r=t.type,o=wt(r,t.pendingProps),o=wt(r.type,o),$c(e,t,r,o,n);case 15:return Gp(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:wt(r,o),vi(e,t),t.tag=1,We(r)?(e=!0,Li(t)):e=!1,fr(t,n),Bp(t,r,o),Qa(t,r,o,n),Ka(null,t,r,!0,e,n);case 19:return Zp(e,t,n);case 22:return Qp(e,t,n)}throw Error(C(156,t.tag))};function mf(e,t){return Od(e,t)}function Pg(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function st(e,t,n,r){return new Pg(e,t,n,r)}function lu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ig(e){if(typeof e=="function")return lu(e)?1:0;if(e!=null){if(e=e.$$typeof,e===$s)return 11;if(e===Cs)return 14}return 2}function gn(e,t){var n=e.alternate;return n===null?(n=st(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Si(e,t,n,r,o,i){var l=2;if(r=e,typeof e=="function")lu(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case Zn:return Nn(n.children,o,i,t);case Es:l=8,o|=8;break;case ya:return e=st(12,n,t,o|2),e.elementType=ya,e.lanes=i,e;case va:return e=st(13,n,t,o),e.elementType=va,e.lanes=i,e;case xa:return e=st(19,n,t,o),e.elementType=xa,e.lanes=i,e;case jd:return ml(n,o,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Sd:l=10;break e;case kd:l=9;break e;case $s:l=11;break e;case Cs:l=14;break e;case tn:l=16,r=null;break e}throw Error(C(130,e==null?e:typeof e,""))}return t=st(l,n,t,o),t.elementType=e,t.type=r,t.lanes=i,t}function Nn(e,t,n,r){return e=st(7,e,r,t),e.lanes=n,e}function ml(e,t,n,r){return e=st(22,e,r,t),e.elementType=jd,e.lanes=n,e.stateNode={isHidden:!1},e}function ql(e,t,n){return e=st(6,e,null,t),e.lanes=n,e}function ea(e,t,n){return t=st(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Ng(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ml(0),this.expirationTimes=Ml(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ml(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function au(e,t,n,r,o,i,l,u,s){return e=new Ng(e,t,n,u,s),t===1?(t=1,i===!0&&(t|=8)):t=0,i=st(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Hs(i),e}function Fg(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Kn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function hf(e){if(!e)return xn;e=e._reactInternals;e:{if(Bn(e)!==e||e.tag!==1)throw Error(C(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(We(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(C(171))}if(e.tag===1){var n=e.type;if(We(n))return mp(e,n,t)}return t}function gf(e,t,n,r,o,i,l,u,s){return e=au(n,r,!0,e,o,i,l,u,s),e.context=hf(null),n=e.current,r=Ae(),o=hn(n),i=Ht(r,o),i.callback=t??null,fn(n,i,o),e.current.lanes=o,$o(e,o,r),Ge(e,r),e}function hl(e,t,n,r){var o=t.current,i=Ae(),l=hn(o);return n=hf(n),t.context===null?t.context=n:t.pendingContext=n,t=Ht(i,l),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=fn(o,t,l),e!==null&&(Et(e,o,l,i),hi(e,o,l)),l}function Ki(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Lc(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function su(e,t){Lc(e,t),(e=e.alternate)&&Lc(e,t)}function Mg(){return null}var yf=typeof reportError=="function"?reportError:function(e){console.error(e)};function uu(e){this._internalRoot=e}gl.prototype.render=uu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(C(409));hl(e,t,null,null)};gl.prototype.unmount=uu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;zn(function(){hl(null,e,null,null)}),t[Gt]=null}};function gl(e){this._internalRoot=e}gl.prototype.unstable_scheduleHydration=function(e){if(e){var t=Qd();e={blockedOn:null,target:e,priority:t};for(var n=0;n<rn.length&&t!==0&&t<rn[n].priority;n++);rn.splice(n,0,e),n===0&&Xd(e)}};function cu(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function yl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function zc(){}function _g(e,t,n,r,o){if(o){if(typeof r=="function"){var i=r;r=function(){var c=Ki(l);i.call(c)}}var l=gf(t,r,e,0,null,!1,!1,"",zc);return e._reactRootContainer=l,e[Gt]=l.current,fo(e.nodeType===8?e.parentNode:e),zn(),l}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var u=r;r=function(){var c=Ki(s);u.call(c)}}var s=au(e,0,!1,null,null,!1,!1,"",zc);return e._reactRootContainer=s,e[Gt]=s.current,fo(e.nodeType===8?e.parentNode:e),zn(function(){hl(t,s,n,r)}),s}function vl(e,t,n,r,o){var i=n._reactRootContainer;if(i){var l=i;if(typeof o=="function"){var u=o;o=function(){var s=Ki(l);u.call(s)}}hl(t,l,e,o)}else l=_g(n,t,e,o,r);return Ki(l)}Wd=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Wr(t.pendingLanes);n!==0&&(Ts(t,n|1),Ge(t,ce()),!(O&6)&&(jr=ce()+500,kn()))}break;case 13:zn(function(){var r=Qt(e,1);if(r!==null){var o=Ae();Et(r,e,1,o)}}),su(e,1)}};Ps=function(e){if(e.tag===13){var t=Qt(e,134217728);if(t!==null){var n=Ae();Et(t,e,134217728,n)}su(e,134217728)}};Gd=function(e){if(e.tag===13){var t=hn(e),n=Qt(e,t);if(n!==null){var r=Ae();Et(n,e,t,r)}su(e,t)}};Qd=function(){return W};Yd=function(e,t){var n=W;try{return W=e,t()}finally{W=n}};Ta=function(e,t,n){switch(t){case"input":if(ka(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=sl(r);if(!o)throw Error(C(90));$d(r),ka(r,o)}}}break;case"textarea":Dd(e,n);break;case"select":t=n.value,t!=null&&ur(e,!!n.multiple,t,!1)}};Md=ru;_d=zn;var Ag={usingClientEntryPoint:!1,Events:[Do,tr,sl,Nd,Fd,ru]},Ur={findFiberByHostInstance:Dn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Lg={bundleType:Ur.bundleType,version:Ur.version,rendererPackageName:Ur.rendererPackageName,rendererConfig:Ur.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Xt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=zd(e),e===null?null:e.stateNode},findFiberByHostInstance:Ur.findFiberByHostInstance||Mg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ko=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ko.isDisabled&&Ko.supportsFiber)try{ol=Ko.inject(Lg),Nt=Ko}catch{}}et.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ag;et.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!cu(t))throw Error(C(200));return Fg(e,t,null,n)};et.createRoot=function(e,t){if(!cu(e))throw Error(C(299));var n=!1,r="",o=yf;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=au(e,1,!1,null,null,n,!1,r,o),e[Gt]=t.current,fo(e.nodeType===8?e.parentNode:e),new uu(t)};et.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(C(188)):(e=Object.keys(e).join(","),Error(C(268,e)));return e=zd(t),e=e===null?null:e.stateNode,e};et.flushSync=function(e){return zn(e)};et.hydrate=function(e,t,n){if(!yl(t))throw Error(C(200));return vl(null,e,t,!0,n)};et.hydrateRoot=function(e,t,n){if(!cu(e))throw Error(C(405));var r=n!=null&&n.hydratedSources||null,o=!1,i="",l=yf;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),t=gf(t,null,e,1,n??null,o,!1,i,l),e[Gt]=t.current,fo(e),r)for(e=0;e<r.length;e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new gl(t)};et.render=function(e,t,n){if(!yl(t))throw Error(C(200));return vl(null,e,t,!1,n)};et.unmountComponentAtNode=function(e){if(!yl(e))throw Error(C(40));return e._reactRootContainer?(zn(function(){vl(null,null,e,!1,function(){e._reactRootContainer=null,e[Gt]=null})}),!0):!1};et.unstable_batchedUpdates=ru;et.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!yl(n))throw Error(C(200));if(e==null||e._reactInternals===void 0)throw Error(C(38));return vl(e,t,n,!1,r)};et.version="18.3.1-next-f1338f8080-20240426";function vf(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(vf)}catch(e){console.error(e)}}vf(),yd.exports=et;var zg=yd.exports,Rc=zg;ha.createRoot=Rc.createRoot,ha.hydrateRoot=Rc.hydrateRoot;var we=function(){return we=Object.assign||function(t){for(var n,r=1,o=arguments.length;r<o;r++){n=arguments[r];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},we.apply(this,arguments)};function Er(e,t,n){if(n||arguments.length===2)for(var r=0,o=t.length,i;r<o;r++)(i||!(r in t))&&(i||(i=Array.prototype.slice.call(t,0,r)),i[r]=t[r]);return e.concat(i||Array.prototype.slice.call(t))}var q="-ms-",ro="-moz-",H="-webkit-",xf="comm",xl="rule",du="decl",Rg="@import",wf="@keyframes",Og="@layer",Sf=Math.abs,pu=String.fromCharCode,ss=Object.assign;function Ug(e,t){return xe(e,0)^45?(((t<<2^xe(e,0))<<2^xe(e,1))<<2^xe(e,2))<<2^xe(e,3):0}function kf(e){return e.trim()}function Ot(e,t){return(e=t.exec(e))?e[0]:e}function A(e,t,n){return e.replace(t,n)}function ki(e,t,n){return e.indexOf(t,n)}function xe(e,t){return e.charCodeAt(t)|0}function $r(e,t,n){return e.slice(t,n)}function Pt(e){return e.length}function jf(e){return e.length}function Qr(e,t){return t.push(e),e}function Vg(e,t){return e.map(t).join("")}function Oc(e,t){return e.filter(function(n){return!Ot(n,t)})}var wl=1,Cr=1,Ef=0,pt=0,pe=0,Nr="";function Sl(e,t,n,r,o,i,l,u){return{value:e,root:t,parent:n,type:r,props:o,children:i,line:wl,column:Cr,length:l,return:"",siblings:u}}function en(e,t){return ss(Sl("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Qn(e){for(;e.root;)e=en(e.root,{children:[e]});Qr(e,e.siblings)}function Bg(){return pe}function Hg(){return pe=pt>0?xe(Nr,--pt):0,Cr--,pe===10&&(Cr=1,wl--),pe}function $t(){return pe=pt<Ef?xe(Nr,pt++):0,Cr++,pe===10&&(Cr=1,wl++),pe}function Fn(){return xe(Nr,pt)}function ji(){return pt}function kl(e,t){return $r(Nr,e,t)}function us(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Wg(e){return wl=Cr=1,Ef=Pt(Nr=e),pt=0,[]}function Gg(e){return Nr="",e}function ta(e){return kf(kl(pt-1,cs(e===91?e+2:e===40?e+1:e)))}function Qg(e){for(;(pe=Fn())&&pe<33;)$t();return us(e)>2||us(pe)>3?"":" "}function Yg(e,t){for(;--t&&$t()&&!(pe<48||pe>102||pe>57&&pe<65||pe>70&&pe<97););return kl(e,ji()+(t<6&&Fn()==32&&$t()==32))}function cs(e){for(;$t();)switch(pe){case e:return pt;case 34:case 39:e!==34&&e!==39&&cs(pe);break;case 40:e===41&&cs(e);break;case 92:$t();break}return pt}function Xg(e,t){for(;$t()&&e+pe!==57;)if(e+pe===84&&Fn()===47)break;return"/*"+kl(t,pt-1)+"*"+pu(e===47?e:$t())}function Kg(e){for(;!us(Fn());)$t();return kl(e,pt)}function Zg(e){return Gg(Ei("",null,null,null,[""],e=Wg(e),0,[0],e))}function Ei(e,t,n,r,o,i,l,u,s){for(var c=0,g=0,y=l,f=0,v=0,x=0,S=1,N=1,p=1,d=0,h="",w=o,$=i,k=r,j=h;N;)switch(x=d,d=$t()){case 40:if(x!=108&&xe(j,y-1)==58){ki(j+=A(ta(d),"&","&\f"),"&\f",Sf(c?u[c-1]:0))!=-1&&(p=-1);break}case 34:case 39:case 91:j+=ta(d);break;case 9:case 10:case 13:case 32:j+=Qg(x);break;case 92:j+=Yg(ji()-1,7);continue;case 47:switch(Fn()){case 42:case 47:Qr(Jg(Xg($t(),ji()),t,n,s),s);break;default:j+="/"}break;case 123*S:u[c++]=Pt(j)*p;case 125*S:case 59:case 0:switch(d){case 0:case 125:N=0;case 59+g:p==-1&&(j=A(j,/\f/g,"")),v>0&&Pt(j)-y&&Qr(v>32?Vc(j+";",r,n,y-1,s):Vc(A(j," ","")+";",r,n,y-2,s),s);break;case 59:j+=";";default:if(Qr(k=Uc(j,t,n,c,g,o,u,h,w=[],$=[],y,i),i),d===123)if(g===0)Ei(j,t,k,k,w,i,y,u,$);else switch(f===99&&xe(j,3)===110?100:f){case 100:case 108:case 109:case 115:Ei(e,k,k,r&&Qr(Uc(e,k,k,0,0,o,u,h,o,w=[],y,$),$),o,$,y,u,r?w:$);break;default:Ei(j,k,k,k,[""],$,0,u,$)}}c=g=v=0,S=p=1,h=j="",y=l;break;case 58:y=1+Pt(j),v=x;default:if(S<1){if(d==123)--S;else if(d==125&&S++==0&&Hg()==125)continue}switch(j+=pu(d),d*S){case 38:p=g>0?1:(j+="\f",-1);break;case 44:u[c++]=(Pt(j)-1)*p,p=1;break;case 64:Fn()===45&&(j+=ta($t())),f=Fn(),g=y=Pt(h=j+=Kg(ji())),d++;break;case 45:x===45&&Pt(j)==2&&(S=0)}}return i}function Uc(e,t,n,r,o,i,l,u,s,c,g,y){for(var f=o-1,v=o===0?i:[""],x=jf(v),S=0,N=0,p=0;S<r;++S)for(var d=0,h=$r(e,f+1,f=Sf(N=l[S])),w=e;d<x;++d)(w=kf(N>0?v[d]+" "+h:A(h,/&\f/g,v[d])))&&(s[p++]=w);return Sl(e,t,n,o===0?xl:u,s,c,g,y)}function Jg(e,t,n,r){return Sl(e,t,n,xf,pu(Bg()),$r(e,2,-2),0,r)}function Vc(e,t,n,r,o){return Sl(e,t,n,du,$r(e,0,r),$r(e,r+1,-1),r,o)}function $f(e,t,n){switch(Ug(e,t)){case 5103:return H+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return H+e+e;case 4789:return ro+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return H+e+ro+e+q+e+e;case 5936:switch(xe(e,t+11)){case 114:return H+e+q+A(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return H+e+q+A(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return H+e+q+A(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return H+e+q+e+e;case 6165:return H+e+q+"flex-"+e+e;case 5187:return H+e+A(e,/(\w+).+(:[^]+)/,H+"box-$1$2"+q+"flex-$1$2")+e;case 5443:return H+e+q+"flex-item-"+A(e,/flex-|-self/g,"")+(Ot(e,/flex-|baseline/)?"":q+"grid-row-"+A(e,/flex-|-self/g,""))+e;case 4675:return H+e+q+"flex-line-pack"+A(e,/align-content|flex-|-self/g,"")+e;case 5548:return H+e+q+A(e,"shrink","negative")+e;case 5292:return H+e+q+A(e,"basis","preferred-size")+e;case 6060:return H+"box-"+A(e,"-grow","")+H+e+q+A(e,"grow","positive")+e;case 4554:return H+A(e,/([^-])(transform)/g,"$1"+H+"$2")+e;case 6187:return A(A(A(e,/(zoom-|grab)/,H+"$1"),/(image-set)/,H+"$1"),e,"")+e;case 5495:case 3959:return A(e,/(image-set\([^]*)/,H+"$1$`$1");case 4968:return A(A(e,/(.+:)(flex-)?(.*)/,H+"box-pack:$3"+q+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+H+e+e;case 4200:if(!Ot(e,/flex-|baseline/))return q+"grid-column-align"+$r(e,t)+e;break;case 2592:case 3360:return q+A(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(r,o){return t=o,Ot(r.props,/grid-\w+-end/)})?~ki(e+(n=n[t].value),"span",0)?e:q+A(e,"-start","")+e+q+"grid-row-span:"+(~ki(n,"span",0)?Ot(n,/\d+/):+Ot(n,/\d+/)-+Ot(e,/\d+/))+";":q+A(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(r){return Ot(r.props,/grid-\w+-start/)})?e:q+A(A(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return A(e,/(.+)-inline(.+)/,H+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Pt(e)-1-t>6)switch(xe(e,t+1)){case 109:if(xe(e,t+4)!==45)break;case 102:return A(e,/(.+:)(.+)-([^]+)/,"$1"+H+"$2-$3$1"+ro+(xe(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~ki(e,"stretch",0)?$f(A(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return A(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(r,o,i,l,u,s,c){return q+o+":"+i+c+(l?q+o+"-span:"+(u?s:+s-+i)+c:"")+e});case 4949:if(xe(e,t+6)===121)return A(e,":",":"+H)+e;break;case 6444:switch(xe(e,xe(e,14)===45?18:11)){case 120:return A(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+H+(xe(e,14)===45?"inline-":"")+"box$3$1"+H+"$2$3$1"+q+"$2box$3")+e;case 100:return A(e,":",":"+q)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return A(e,"scroll-","scroll-snap-")+e}return e}function Zi(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function qg(e,t,n,r){switch(e.type){case Og:if(e.children.length)break;case Rg:case du:return e.return=e.return||e.value;case xf:return"";case wf:return e.return=e.value+"{"+Zi(e.children,r)+"}";case xl:if(!Pt(e.value=e.props.join(",")))return""}return Pt(n=Zi(e.children,r))?e.return=e.value+"{"+n+"}":""}function ey(e){var t=jf(e);return function(n,r,o,i){for(var l="",u=0;u<t;u++)l+=e[u](n,r,o,i)||"";return l}}function ty(e){return function(t){t.root||(t=t.return)&&e(t)}}function ny(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case du:e.return=$f(e.value,e.length,n);return;case wf:return Zi([en(e,{value:A(e.value,"@","@"+H)})],r);case xl:if(e.length)return Vg(n=e.props,function(o){switch(Ot(o,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Qn(en(e,{props:[A(o,/:(read-\w+)/,":"+ro+"$1")]})),Qn(en(e,{props:[o]})),ss(e,{props:Oc(n,r)});break;case"::placeholder":Qn(en(e,{props:[A(o,/:(plac\w+)/,":"+H+"input-$1")]})),Qn(en(e,{props:[A(o,/:(plac\w+)/,":"+ro+"$1")]})),Qn(en(e,{props:[A(o,/:(plac\w+)/,q+"input-$1")]})),Qn(en(e,{props:[o]})),ss(e,{props:Oc(n,r)});break}return""})}}var ry={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Ye={},Dr=typeof process<"u"&&Ye!==void 0&&(Ye.REACT_APP_SC_ATTR||Ye.SC_ATTR)||"data-styled",Cf="active",Df="data-styled-version",jl="6.1.13",fu=`/*!sc*/
`,Ji=typeof window<"u"&&"HTMLElement"in window,oy=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&Ye!==void 0&&Ye.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&Ye.REACT_APP_SC_DISABLE_SPEEDY!==""?Ye.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&Ye.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&Ye!==void 0&&Ye.SC_DISABLE_SPEEDY!==void 0&&Ye.SC_DISABLE_SPEEDY!==""&&Ye.SC_DISABLE_SPEEDY!=="false"&&Ye.SC_DISABLE_SPEEDY),iy={},El=Object.freeze([]),br=Object.freeze({});function bf(e,t,n){return n===void 0&&(n=br),e.theme!==n.theme&&e.theme||t||n.theme}var Tf=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),ly=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,ay=/(^-|-$)/g;function Bc(e){return e.replace(ly,"-").replace(ay,"")}var sy=/(a)(d)/gi,Zo=52,Hc=function(e){return String.fromCharCode(e+(e>25?39:97))};function ds(e){var t,n="";for(t=Math.abs(e);t>Zo;t=t/Zo|0)n=Hc(t%Zo)+n;return(Hc(t%Zo)+n).replace(sy,"$1-$2")}var na,Pf=5381,sr=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},If=function(e){return sr(Pf,e)};function mu(e){return ds(If(e)>>>0)}function uy(e){return e.displayName||e.name||"Component"}function ra(e){return typeof e=="string"&&!0}var Nf=typeof Symbol=="function"&&Symbol.for,Ff=Nf?Symbol.for("react.memo"):60115,cy=Nf?Symbol.for("react.forward_ref"):60112,dy={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},py={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Mf={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},fy=((na={})[cy]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},na[Ff]=Mf,na);function Wc(e){return("type"in(t=e)&&t.type.$$typeof)===Ff?Mf:"$$typeof"in e?fy[e.$$typeof]:dy;var t}var my=Object.defineProperty,hy=Object.getOwnPropertyNames,Gc=Object.getOwnPropertySymbols,gy=Object.getOwnPropertyDescriptor,yy=Object.getPrototypeOf,Qc=Object.prototype;function _f(e,t,n){if(typeof t!="string"){if(Qc){var r=yy(t);r&&r!==Qc&&_f(e,r,n)}var o=hy(t);Gc&&(o=o.concat(Gc(t)));for(var i=Wc(e),l=Wc(t),u=0;u<o.length;++u){var s=o[u];if(!(s in py||n&&n[s]||l&&s in l||i&&s in i)){var c=gy(t,s);try{my(e,s,c)}catch{}}}}return e}function Rn(e){return typeof e=="function"}function hu(e){return typeof e=="object"&&"styledComponentId"in e}function Pn(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function qi(e,t){if(e.length===0)return"";for(var n=e[0],r=1;r<e.length;r++)n+=e[r];return n}function ko(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function ps(e,t,n){if(n===void 0&&(n=!1),!n&&!ko(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=ps(e[r],t[r]);else if(ko(t))for(var r in t)e[r]=ps(e[r],t[r]);return e}function gu(e,t){Object.defineProperty(e,"toString",{value:t})}function On(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var vy=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var n=0,r=0;r<t;r++)n+=this.groupSizes[r];return n},e.prototype.insertRules=function(t,n){if(t>=this.groupSizes.length){for(var r=this.groupSizes,o=r.length,i=o;t>=i;)if((i<<=1)<0)throw On(16,"".concat(t));this.groupSizes=new Uint32Array(i),this.groupSizes.set(r),this.length=i;for(var l=o;l<i;l++)this.groupSizes[l]=0}for(var u=this.indexOfGroup(t+1),s=(l=0,n.length);l<s;l++)this.tag.insertRule(u,n[l])&&(this.groupSizes[t]++,u++)},e.prototype.clearGroup=function(t){if(t<this.length){var n=this.groupSizes[t],r=this.indexOfGroup(t),o=r+n;this.groupSizes[t]=0;for(var i=r;i<o;i++)this.tag.deleteRule(r)}},e.prototype.getGroup=function(t){var n="";if(t>=this.length||this.groupSizes[t]===0)return n;for(var r=this.groupSizes[t],o=this.indexOfGroup(t),i=o+r,l=o;l<i;l++)n+="".concat(this.tag.getRule(l)).concat(fu);return n},e}(),$i=new Map,el=new Map,Ci=1,Jo=function(e){if($i.has(e))return $i.get(e);for(;el.has(Ci);)Ci++;var t=Ci++;return $i.set(e,t),el.set(t,e),t},xy=function(e,t){Ci=t+1,$i.set(e,t),el.set(t,e)},wy="style[".concat(Dr,"][").concat(Df,'="').concat(jl,'"]'),Sy=new RegExp("^".concat(Dr,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),ky=function(e,t,n){for(var r,o=n.split(","),i=0,l=o.length;i<l;i++)(r=o[i])&&e.registerName(t,r)},jy=function(e,t){for(var n,r=((n=t.textContent)!==null&&n!==void 0?n:"").split(fu),o=[],i=0,l=r.length;i<l;i++){var u=r[i].trim();if(u){var s=u.match(Sy);if(s){var c=0|parseInt(s[1],10),g=s[2];c!==0&&(xy(g,c),ky(e,g,s[3]),e.getTag().insertRules(c,o)),o.length=0}else o.push(u)}}},Yc=function(e){for(var t=document.querySelectorAll(wy),n=0,r=t.length;n<r;n++){var o=t[n];o&&o.getAttribute(Dr)!==Cf&&(jy(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function Ey(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var Af=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=function(u){var s=Array.from(u.querySelectorAll("style[".concat(Dr,"]")));return s[s.length-1]}(n),i=o!==void 0?o.nextSibling:null;r.setAttribute(Dr,Cf),r.setAttribute(Df,jl);var l=Ey();return l&&r.setAttribute("nonce",l),n.insertBefore(r,i),r},$y=function(){function e(t){this.element=Af(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(n){if(n.sheet)return n.sheet;for(var r=document.styleSheets,o=0,i=r.length;o<i;o++){var l=r[o];if(l.ownerNode===n)return l}throw On(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,n){try{return this.sheet.insertRule(n,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var n=this.sheet.cssRules[t];return n&&n.cssText?n.cssText:""},e}(),Cy=function(){function e(t){this.element=Af(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,n){if(t<=this.length&&t>=0){var r=document.createTextNode(n);return this.element.insertBefore(r,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),Dy=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,n){return t<=this.length&&(this.rules.splice(t,0,n),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),Xc=Ji,by={isServer:!Ji,useCSSOMInjection:!oy},tl=function(){function e(t,n,r){t===void 0&&(t=br),n===void 0&&(n={});var o=this;this.options=we(we({},by),t),this.gs=n,this.names=new Map(r),this.server=!!t.isServer,!this.server&&Ji&&Xc&&(Xc=!1,Yc(this)),gu(this,function(){return function(i){for(var l=i.getTag(),u=l.length,s="",c=function(y){var f=function(p){return el.get(p)}(y);if(f===void 0)return"continue";var v=i.names.get(f),x=l.getGroup(y);if(v===void 0||!v.size||x.length===0)return"continue";var S="".concat(Dr,".g").concat(y,'[id="').concat(f,'"]'),N="";v!==void 0&&v.forEach(function(p){p.length>0&&(N+="".concat(p,","))}),s+="".concat(x).concat(S,'{content:"').concat(N,'"}').concat(fu)},g=0;g<u;g++)c(g);return s}(o)})}return e.registerId=function(t){return Jo(t)},e.prototype.rehydrate=function(){!this.server&&Ji&&Yc(this)},e.prototype.reconstructWithOptions=function(t,n){return n===void 0&&(n=!0),new e(we(we({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(n){var r=n.useCSSOMInjection,o=n.target;return n.isServer?new Dy(o):r?new $y(o):new Cy(o)}(this.options),new vy(t)));var t},e.prototype.hasNameForId=function(t,n){return this.names.has(t)&&this.names.get(t).has(n)},e.prototype.registerName=function(t,n){if(Jo(t),this.names.has(t))this.names.get(t).add(n);else{var r=new Set;r.add(n),this.names.set(t,r)}},e.prototype.insertRules=function(t,n,r){this.registerName(t,n),this.getTag().insertRules(Jo(t),r)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(Jo(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Ty=/&/g,Py=/^\s*\/\/.*$/gm;function Lf(e,t){return e.map(function(n){return n.type==="rule"&&(n.value="".concat(t," ").concat(n.value),n.value=n.value.replaceAll(",",",".concat(t," ")),n.props=n.props.map(function(r){return"".concat(t," ").concat(r)})),Array.isArray(n.children)&&n.type!=="@keyframes"&&(n.children=Lf(n.children,t)),n})}function Iy(e){var t,n,r,o=br,i=o.options,l=i===void 0?br:i,u=o.plugins,s=u===void 0?El:u,c=function(f,v,x){return x.startsWith(n)&&x.endsWith(n)&&x.replaceAll(n,"").length>0?".".concat(t):f},g=s.slice();g.push(function(f){f.type===xl&&f.value.includes("&")&&(f.props[0]=f.props[0].replace(Ty,n).replace(r,c))}),l.prefix&&g.push(ny),g.push(qg);var y=function(f,v,x,S){v===void 0&&(v=""),x===void 0&&(x=""),S===void 0&&(S="&"),t=S,n=v,r=new RegExp("\\".concat(n,"\\b"),"g");var N=f.replace(Py,""),p=Zg(x||v?"".concat(x," ").concat(v," { ").concat(N," }"):N);l.namespace&&(p=Lf(p,l.namespace));var d=[];return Zi(p,ey(g.concat(ty(function(h){return d.push(h)})))),d};return y.hash=s.length?s.reduce(function(f,v){return v.name||On(15),sr(f,v.name)},Pf).toString():"",y}var Ny=new tl,fs=Iy(),zf=at.createContext({shouldForwardProp:void 0,styleSheet:Ny,stylis:fs});zf.Consumer;at.createContext(void 0);function ms(){return M.useContext(zf)}var Rf=function(){function e(t,n){var r=this;this.inject=function(o,i){i===void 0&&(i=fs);var l=r.name+i.hash;o.hasNameForId(r.id,l)||o.insertRules(r.id,l,i(r.rules,l,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=n,gu(this,function(){throw On(12,String(r.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=fs),this.name+t.hash},e}(),Fy=function(e){return e>="A"&&e<="Z"};function Kc(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(n===1&&r==="-"&&e[0]==="-")return e;Fy(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var Of=function(e){return e==null||e===!1||e===""},Uf=function(e){var t,n,r=[];for(var o in e){var i=e[o];e.hasOwnProperty(o)&&!Of(i)&&(Array.isArray(i)&&i.isCss||Rn(i)?r.push("".concat(Kc(o),":"),i,";"):ko(i)?r.push.apply(r,Er(Er(["".concat(o," {")],Uf(i),!1),["}"],!1)):r.push("".concat(Kc(o),": ").concat((t=o,(n=i)==null||typeof n=="boolean"||n===""?"":typeof n!="number"||n===0||t in ry||t.startsWith("--")?String(n).trim():"".concat(n,"px")),";")))}return r};function yn(e,t,n,r){if(Of(e))return[];if(hu(e))return[".".concat(e.styledComponentId)];if(Rn(e)){if(!Rn(i=e)||i.prototype&&i.prototype.isReactComponent||!t)return[e];var o=e(t);return yn(o,t,n,r)}var i;return e instanceof Rf?n?(e.inject(n,r),[e.getName(r)]):[e]:ko(e)?Uf(e):Array.isArray(e)?Array.prototype.concat.apply(El,e.map(function(l){return yn(l,t,n,r)})):[e.toString()]}function Vf(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(Rn(n)&&!hu(n))return!1}return!0}var My=If(jl),_y=function(){function e(t,n,r){this.rules=t,this.staticRulesId="",this.isStatic=(r===void 0||r.isStatic)&&Vf(t),this.componentId=n,this.baseHash=sr(My,n),this.baseStyle=r,tl.registerId(n)}return e.prototype.generateAndInjectStyles=function(t,n,r){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,n,r):"";if(this.isStatic&&!r.hash)if(this.staticRulesId&&n.hasNameForId(this.componentId,this.staticRulesId))o=Pn(o,this.staticRulesId);else{var i=qi(yn(this.rules,t,n,r)),l=ds(sr(this.baseHash,i)>>>0);if(!n.hasNameForId(this.componentId,l)){var u=r(i,".".concat(l),void 0,this.componentId);n.insertRules(this.componentId,l,u)}o=Pn(o,l),this.staticRulesId=l}else{for(var s=sr(this.baseHash,r.hash),c="",g=0;g<this.rules.length;g++){var y=this.rules[g];if(typeof y=="string")c+=y;else if(y){var f=qi(yn(y,t,n,r));s=sr(s,f+g),c+=f}}if(c){var v=ds(s>>>0);n.hasNameForId(this.componentId,v)||n.insertRules(this.componentId,v,r(c,".".concat(v),void 0,this.componentId)),o=Pn(o,v)}}return o},e}(),jo=at.createContext(void 0);jo.Consumer;function Ay(e){var t=at.useContext(jo),n=M.useMemo(function(){return function(r,o){if(!r)throw On(14);if(Rn(r)){var i=r(o);return i}if(Array.isArray(r)||typeof r!="object")throw On(8);return o?we(we({},o),r):r}(e.theme,t)},[e.theme,t]);return e.children?at.createElement(jo.Provider,{value:n},e.children):null}var oa={};function Ly(e,t,n){var r=hu(e),o=e,i=!ra(e),l=t.attrs,u=l===void 0?El:l,s=t.componentId,c=s===void 0?function(w,$){var k=typeof w!="string"?"sc":Bc(w);oa[k]=(oa[k]||0)+1;var j="".concat(k,"-").concat(mu(jl+k+oa[k]));return $?"".concat($,"-").concat(j):j}(t.displayName,t.parentComponentId):s,g=t.displayName,y=g===void 0?function(w){return ra(w)?"styled.".concat(w):"Styled(".concat(uy(w),")")}(e):g,f=t.displayName&&t.componentId?"".concat(Bc(t.displayName),"-").concat(t.componentId):t.componentId||c,v=r&&o.attrs?o.attrs.concat(u).filter(Boolean):u,x=t.shouldForwardProp;if(r&&o.shouldForwardProp){var S=o.shouldForwardProp;if(t.shouldForwardProp){var N=t.shouldForwardProp;x=function(w,$){return S(w,$)&&N(w,$)}}else x=S}var p=new _y(n,f,r?o.componentStyle:void 0);function d(w,$){return function(k,j,T){var z=k.attrs,_=k.componentStyle,Y=k.defaultProps,Fe=k.foldedComponentIds,Re=k.styledComponentId,Kt=k.target,Oe=at.useContext(jo),ft=ms(),ae=k.shouldForwardProp||ft.shouldForwardProp,b=bf(j,Oe,Y)||br,P=function(nt,Ce,rt){for(var de,ht=we(we({},Ce),{className:void 0,theme:rt}),Z=0;Z<nt.length;Z+=1){var gt=Rn(de=nt[Z])?de(ht):de;for(var De in gt)ht[De]=De==="className"?Pn(ht[De],gt[De]):De==="style"?we(we({},ht[De]),gt[De]):gt[De]}return Ce.className&&(ht.className=Pn(ht.className,Ce.className)),ht}(z,j,b),F=P.as||Kt,V={};for(var B in P)P[B]===void 0||B[0]==="$"||B==="as"||B==="theme"&&P.theme===b||(B==="forwardedAs"?V.as=P.forwardedAs:ae&&!ae(B,F)||(V[B]=P[B]));var mt=function(nt,Ce){var rt=ms(),de=nt.generateAndInjectStyles(Ce,rt.styleSheet,rt.stylis);return de}(_,P),Ue=Pn(Fe,Re);return mt&&(Ue+=" "+mt),P.className&&(Ue+=" "+P.className),V[ra(F)&&!Tf.has(F)?"class":"className"]=Ue,V.ref=T,M.createElement(F,V)}(h,w,$)}d.displayName=y;var h=at.forwardRef(d);return h.attrs=v,h.componentStyle=p,h.displayName=y,h.shouldForwardProp=x,h.foldedComponentIds=r?Pn(o.foldedComponentIds,o.styledComponentId):"",h.styledComponentId=f,h.target=r?o.target:e,Object.defineProperty(h,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(w){this._foldedDefaultProps=r?function($){for(var k=[],j=1;j<arguments.length;j++)k[j-1]=arguments[j];for(var T=0,z=k;T<z.length;T++)ps($,z[T],!0);return $}({},o.defaultProps,w):w}}),gu(h,function(){return".".concat(h.styledComponentId)}),i&&_f(h,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),h}function Zc(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n}var Jc=function(e){return Object.assign(e,{isCss:!0})};function yu(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(Rn(e)||ko(e))return Jc(yn(Zc(El,Er([e],t,!0))));var r=e;return t.length===0&&r.length===1&&typeof r[0]=="string"?yn(r):Jc(yn(Zc(r,t)))}function hs(e,t,n){if(n===void 0&&(n=br),!t)throw On(1,t);var r=function(o){for(var i=[],l=1;l<arguments.length;l++)i[l-1]=arguments[l];return e(t,n,yu.apply(void 0,Er([o],i,!1)))};return r.attrs=function(o){return hs(e,t,we(we({},n),{attrs:Array.prototype.concat(n.attrs,o).filter(Boolean)}))},r.withConfig=function(o){return hs(e,t,we(we({},n),o))},r}var Bf=function(e){return hs(Ly,e)},E=Bf;Tf.forEach(function(e){E[e]=Bf(e)});var zy=function(){function e(t,n){this.rules=t,this.componentId=n,this.isStatic=Vf(t),tl.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,n,r,o){var i=o(qi(yn(this.rules,n,r,o)),""),l=this.componentId+t;r.insertRules(l,l,i)},e.prototype.removeStyles=function(t,n){n.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,n,r,o){t>2&&tl.registerId(this.componentId+t),this.removeStyles(t,r),this.createStyles(t,n,r,o)},e}();function Ry(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=yu.apply(void 0,Er([e],t,!1)),o="sc-global-".concat(mu(JSON.stringify(r))),i=new zy(r,o),l=function(s){var c=ms(),g=at.useContext(jo),y=at.useRef(c.styleSheet.allocateGSInstance(o)).current;return c.styleSheet.server&&u(y,s,c.styleSheet,g,c.stylis),at.useLayoutEffect(function(){if(!c.styleSheet.server)return u(y,s,c.styleSheet,g,c.stylis),function(){return i.removeStyles(y,c.styleSheet)}},[y,s,c.styleSheet,g,c.stylis]),null};function u(s,c,g,y,f){if(i.isStatic)i.renderStyles(s,iy,g,f);else{var v=we(we({},c),{theme:bf(c,y,l.defaultProps)});i.renderStyles(s,v,g,f)}}return at.memo(l)}function Hn(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=qi(yu.apply(void 0,Er([e],t,!1))),o=mu(r);return new Rf(o,r)}const Mt=E.div`
  width: min(100% - 40px, ${({theme:e})=>e.layout.maxWidth});
  margin: 0 auto;

  @media (max-width: 640px) {
    width: min(100% - 28px, ${({theme:e})=>e.layout.maxWidth});
  }
`,$l=E.section`
  padding: ${({$compact:e})=>e?"72px 0":"104px 0"};

  @media (max-width: 768px) {
    padding: ${({$compact:e})=>e?"56px 0":"72px 0"};
  }
`,vu=E.div`
  max-width: 760px;
  margin-bottom: 42px;
`,Cl=E.p`
  margin: 0 0 12px;
  color: ${({theme:e})=>e.colors.accent};
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 13px;
`,xu=E.h2`
  margin: 0;
  font-size: clamp(32px, 5vw, 52px);
  line-height: 1.08;
  letter-spacing: -0.02em;
`,wu=E.p`
  margin: 18px 0 0;
  color: ${({theme:e})=>e.colors.muted};
  max-width: 680px;
  font-size: 17px;
`,Hf=[{code:"vi",label:"VI"},{code:"en",label:"EN"},{code:"jp",label:"JP"}],Oy={vi:{nav:{services:"DỊCH VỤ",process:"QUY TRÌNH",capabilities:"NĂNG LỰC",contact:"LIÊN HỆ",hotline:"HOTLINE",admin:"ADMIN"},hero:{badge:"Software Engineering · System Development",titlePrefix:"Xây dựng hệ thống phần mềm",titleSuffix:"hiện đại cho doanh nghiệp",lead:"VIORA thiết kế kiến trúc hệ thống, phát triển dashboard quản trị, backend API, website, web application và mobile application theo yêu cầu triển khai thực tế.",ctaPrimary:"Gọi tư vấn dự án",ctaSecondary:"Xem năng lực",panel:["System architecture","Backend API","Dashboard realtime","Pilot deployment"],metrics:[["API","Backend integration"],["Web","Dashboard system"],["Ops","Deploy & handover"]]},services:{eyebrow:"Dịch vụ cốt lõi",title:"Từ kiến trúc hệ thống đến triển khai vận hành.",text:"VIORA tập trung vào các hạng mục kỹ thuật thiết yếu để xây dựng phần mềm có cấu trúc, dễ bảo trì và phù hợp với nhu cầu tăng trưởng của doanh nghiệp.",items:[{title:"Thiết kế hệ thống",eyebrow:"System Architecture",description:"Thiết kế kiến trúc backend, database, agent app và dashboard quản trị với định hướng ổn định, bảo mật và dễ mở rộng.",items:["Backend architecture","Database design","Agent app design","Dashboard architecture"]},{title:"Phát triển Dashboard Web",eyebrow:"Management Dashboard",description:"Xây dựng dashboard quản trị phục vụ theo dõi, điều phối và vận hành thiết bị, ứng dụng và dữ liệu hệ thống.",items:["Quản lý thiết bị","Gửi lệnh từ xa","Quản lý ứng dụng","Theo dõi trạng thái và log"]},{title:"Phát triển API Backend",eyebrow:"Backend API",description:"Xây dựng hệ thống API phục vụ tích hợp, đồng bộ dữ liệu, xử lý nghiệp vụ và kết nối với các nền tảng liên quan.",items:["RESTful API","Authentication","Logging","Documentation"]},{title:"Website, Web App & Mobile App",eyebrow:"Software Development",description:"Phát triển, bảo trì và tối ưu website, web application và mobile application theo yêu cầu thực tế của doanh nghiệp.",items:["UI & feature development","Database implementation","Bug fixing","Performance optimization"]}]},process:{eyebrow:"Quy trình triển khai",title:"Làm rõ yêu cầu, phát triển có kiểm soát, bàn giao có tài liệu.",text:"Quy trình được thiết kế để phù hợp với các dự án dashboard, backend, website, web app, mobile app và hệ thống quản trị thiết bị.",items:["Phân tích yêu cầu và phạm vi triển khai","Thiết kế giao diện, chức năng và cơ sở dữ liệu","Phát triển backend, frontend và ứng dụng liên quan","Kiểm thử unit test, integration test và UAT","Cài đặt server, domain, CDN nếu cần","Triển khai dashboard quản trị và policy ban đầu","Bàn giao tài liệu và hướng dẫn vận hành"]},capabilities:{eyebrow:"Năng lực kỹ thuật",title:"Đồng hành từ phát triển đến vận hành.",text:"VIORA không chỉ lập trình theo yêu cầu, mà còn tham gia phân tích, kiểm thử, tối ưu và bảo trì để hệ thống có thể vận hành ổn định sau khi bàn giao.",items:["Thiết kế kiến trúc hệ thống có khả năng mở rộng","Phối hợp triển khai và vận hành sản phẩm phần mềm","Nghiên cứu, áp dụng công nghệ mới vào dự án","Bảo trì, cập nhật và đảm bảo an toàn hệ thống"]},contact:{eyebrow:"Liên hệ VIORA",title:"Bạn cần xây dựng hệ thống phần mềm cho doanh nghiệp?",text:"Liên hệ trực tiếp qua hotline hoặc email để trao đổi về phạm vi, kiến trúc, kế hoạch triển khai và phương án bàn giao.",phone:"Hotline",email:"Email hỗ trợ",address:"Địa chỉ"},footer:{rights:"All rights reserved."}},en:{nav:{services:"SERVICES",process:"PROCESS",capabilities:"CAPABILITIES",contact:"CONTACT",hotline:"HOTLINE",admin:"ADMIN"},hero:{badge:"Software Engineering · System Development",titlePrefix:"Build modern software systems",titleSuffix:"for growing businesses",lead:"VIORA designs system architecture, management dashboards, backend APIs, websites, web applications and mobile applications for real-world business deployment.",ctaPrimary:"Call for consultation",ctaSecondary:"View capabilities",panel:["System architecture","Backend API","Realtime dashboard","Pilot deployment"],metrics:[["API","Backend integration"],["Web","Dashboard system"],["Ops","Deploy & handover"]]},services:{eyebrow:"Core services",title:"From system architecture to operational deployment.",text:"VIORA focuses on essential engineering work to build structured, maintainable and scalable software systems.",items:[{title:"System Architecture",eyebrow:"System Architecture",description:"Backend, database, agent app and dashboard architecture designed for stability, security and scalability.",items:["Backend architecture","Database design","Agent app design","Dashboard architecture"]},{title:"Dashboard Web Development",eyebrow:"Management Dashboard",description:"Management dashboards for monitoring, coordinating and operating devices, applications and system data.",items:["Device management","Remote commands","Application management","Status and log monitoring"]},{title:"Backend API Development",eyebrow:"Backend API",description:"API systems for integration, data synchronization, business logic processing and platform connectivity.",items:["RESTful API","Authentication","Logging","Documentation"]},{title:"Website, Web App & Mobile App",eyebrow:"Software Development",description:"Development, maintenance and optimization of websites, web applications and mobile applications.",items:["UI & feature development","Database implementation","Bug fixing","Performance optimization"]}]},process:{eyebrow:"Delivery process",title:"Clear requirements, controlled development and documented handover.",text:"A process suitable for dashboard, backend, website, web app, mobile app and device management projects.",items:["Analyze requirements and implementation scope","Design interfaces, features and database","Develop backend, frontend and related applications","Run unit tests, integration tests and UAT","Set up server, domain and CDN if needed","Deploy admin dashboard and initial policies","Handover documentation and operation guide"]},capabilities:{eyebrow:"Technical capabilities",title:"Supporting products from development to operation.",text:"VIORA participates in analysis, development, testing, optimization and maintenance so the system can operate reliably after delivery.",items:["Design scalable system architecture","Coordinate product deployment and operation","Research and apply new technologies","Maintain, update and secure software systems"]},contact:{eyebrow:"Contact VIORA",title:"Need to build a business software system?",text:"Contact us directly by hotline or email to discuss scope, architecture, implementation plan and handover approach.",phone:"Hotline",email:"Support email",address:"Address"},footer:{rights:"All rights reserved."}},jp:{nav:{services:"サービス",process:"プロセス",capabilities:"技術力",contact:"お問い合わせ",hotline:"電話",admin:"管理"},hero:{badge:"Software Engineering · System Development",titlePrefix:"企業向けの最新ソフトウェアシステムを",titleSuffix:"設計・開発します",lead:"VIORAは、実運用を見据えたシステムアーキテクチャ、管理ダッシュボード、バックエンドAPI、Webサイト、Webアプリケーション、モバイルアプリを開発します。",ctaPrimary:"電話で相談する",ctaSecondary:"技術力を見る",panel:["システム設計","バックエンドAPI","リアルタイムダッシュボード","パイロット導入"],metrics:[["API","バックエンド連携"],["Web","管理ダッシュボード"],["Ops","導入・引き継ぎ"]]},services:{eyebrow:"主要サービス",title:"システム設計から導入・運用まで対応します。",text:"VIORAは、保守性・拡張性・安定性を重視したソフトウェア開発を行います。",items:[{title:"システム設計",eyebrow:"System Architecture",description:"安定性、セキュリティ、拡張性を考慮し、バックエンド、データベース、エージェントアプリ、ダッシュボードを設計します。",items:["バックエンド設計","データベース設計","エージェントアプリ設計","ダッシュボード設計"]},{title:"ダッシュボード開発",eyebrow:"Management Dashboard",description:"デバイス、アプリケーション、システムデータの監視・管理・運用を支援する管理画面を構築します。",items:["デバイス管理","リモートコマンド","アプリ管理","状態・ログ監視"]},{title:"APIバックエンド開発",eyebrow:"Backend API",description:"外部連携、データ同期、業務ロジック処理、プラットフォーム接続に対応するAPIを開発します。",items:["RESTful API","認証","ログ管理","ドキュメント"]},{title:"Web・モバイルアプリ開発",eyebrow:"Software Development",description:"Webサイト、Webアプリケーション、モバイルアプリケーションの開発・保守・最適化を行います。",items:["UI・機能開発","データベース実装","バグ修正","パフォーマンス最適化"]}]},process:{eyebrow:"導入プロセス",title:"要件を明確化し、管理された開発と文書化された引き継ぎを行います。",text:"ダッシュボード、バックエンド、Webサイト、Webアプリ、モバイルアプリ、デバイス管理システムに適したプロセスです。",items:["要件と導入範囲の分析","画面、機能、データベースの設計","バックエンド、フロントエンド、関連アプリの開発","単体テスト、結合テスト、UATの実施","必要に応じてサーバー、ドメイン、CDNを設定","管理ダッシュボードと初期ポリシーを導入","ドキュメントと運用ガイドの引き継ぎ"]},capabilities:{eyebrow:"技術力",title:"開発から運用までサポートします。",text:"VIORAは、納品後も安定運用できるよう、分析、開発、テスト、最適化、保守に対応します。",items:["拡張可能なシステムアーキテクチャ設計","ソフトウェア製品の導入・運用支援","新技術の調査と適用","システムの保守、更新、セキュリティ対応"]},contact:{eyebrow:"VIORAへのお問い合わせ",title:"企業向けソフトウェアシステムの構築をご検討ですか？",text:"スコープ、アーキテクチャ、導入計画、引き継ぎ方法について、電話またはメールでご相談ください。",phone:"電話",email:"サポートメール",address:"住所"},footer:{rights:"All rights reserved."}}},Uy=E.header`
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(18px);
  background: ${({theme:e})=>e.mode==="light"?"rgba(246, 248, 252, 0.78)":"rgba(11, 16, 32, 0.78)"};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
`,Vy=E(Mt)`
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
`,By=E.a`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 800;
  letter-spacing: -0.04em;
  font-size: 24px;
`,Hy=E.span`
  width: 38px;
  height: 38px;
  border-radius: 13px;
  display: grid;
  place-items: center;
  background: ${({theme:e})=>e.colors.primary};
  box-shadow: 0 12px 34px ${({theme:e})=>e.colors.primarySoft};
  color: white;

  &::before {
    content: 'V';
    font-size: 20px;
    font-weight: 900;
  }
`,Wy=E.nav`
  display: flex;
  gap: 24px;
  color: ${({theme:e})=>e.colors.muted};
  font-size: 14px;
  font-weight: 700;

  a {
    position: relative;
    padding: 6px 0;
  }

  a::after {
    content: '';
    position: absolute;
    height: 2px;
    left: 0;
    right: 100%;
    bottom: 0;
    background: ${({theme:e})=>e.colors.primary};
    transition: right ${({theme:e})=>e.motion.fast};
  }

  a:hover {
    color: ${({theme:e})=>e.colors.text};
  }

  a:hover::after {
    right: 0;
  }

  @media (max-width: 900px) {
    display: none;
  }
`,Gy=E.div`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (max-width: 560px) {
    gap: 6px;
  }
`,qc=E.div`
  display: flex;
  padding: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.radius.full};
  background: ${({theme:e})=>e.colors.surface};
  box-shadow: ${({theme:e})=>e.colors.shadow};
`,ia=E.button`
  border: 0;
  min-width: 38px;
  height: 32px;
  padding: 0 10px;
  border-radius: ${({theme:e})=>e.radius.full};
  background: ${({theme:e,$active:t})=>t?e.colors.primary:"transparent"};
  color: ${({theme:e,$active:t})=>t?e.colors.white:e.colors.muted};
  font-weight: 800;
  font-size: 12px;
  transition: background ${({theme:e})=>e.motion.fast}, transform ${({theme:e})=>e.motion.fast};

  &:hover {
    transform: translateY(-1px);
    color: ${({theme:e,$active:t})=>t?e.colors.white:e.colors.text};
  }

  @media (max-width: 560px) {
    min-width: 34px;
    padding: 0 8px;
  }
`;E.a`
  padding: 11px 18px;
  border-radius: ${({theme:e})=>e.radius.full};
  border: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e})=>e.colors.surface};
  font-weight: 800;
  font-size: 14px;
  box-shadow: ${({theme:e})=>e.colors.shadow};

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    background: ${({theme:e})=>e.colors.primarySoft};
  }

  @media (max-width: 700px) {
    display: none;
  }
`;function Qy({t:e,mode:t,language:n,onModeChange:r,onLanguageChange:o}){return a.jsx(Uy,{children:a.jsxs(Vy,{children:[a.jsxs(By,{href:"#home","aria-label":"VIORA home",children:[a.jsx(Hy,{}),"VIORA"]}),a.jsxs(Wy,{"aria-label":"Primary navigation",children:[a.jsx("a",{href:"#services",children:e.services}),a.jsx("a",{href:"#process",children:e.process}),a.jsx("a",{href:"#capabilities",children:e.capabilities}),a.jsx("a",{href:"#contact",children:e.contact})]}),a.jsxs(Gy,{children:[a.jsxs(qc,{"aria-label":"Theme mode",children:[a.jsx(ia,{$active:t==="light",onClick:()=>r("light"),children:"☀"}),a.jsx(ia,{$active:t==="dark",onClick:()=>r("dark"),children:"☾"})]}),a.jsx(qc,{"aria-label":"Language",children:Hf.map(i=>a.jsx(ia,{$active:n===i.code,onClick:()=>o(i.code),children:i.label},i.code))})]})]})})}const Yy={vi:{name:"VIORA",legalName:"VIORA CO., LTD",email:"viora.co.ltd@gmail.com",phone:"0365048367",address:"Tầng 9, tòa Detech Tower 2, số 107 đường Nguyễn Phong Sắc, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Hà Nội"},en:{name:"VIORA",legalName:"VIORA CO., LTD",email:"viora.co.ltd@gmail.com",phone:"0365048367",address:"9th Floor, Detech Tower 2, 107 Nguyen Phong Sac Street, Dich Vong Hau Ward, Cau Giay District, Hanoi, Viet Nam"},jp:{name:"VIORA",legalName:"VIORA CO., LTD",email:"viora.co.ltd@gmail.com",phone:"0365048367",address:"9階、Detech Tower 2、107 Nguyen Phong Sac Street、Dich Vong Hau Ward、Cau Giay District、ハノイ、 ベトナム"}},Xy=E.footer`
  border-top: 1px solid ${({theme:e})=>e.colors.border};
  padding: 34px 0;
  color: ${({theme:e})=>e.colors.muted};
  background: ${({theme:e})=>e.colors.backgroundSoft};
`,Ky=E(Mt)`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;

  strong {
    color: ${({theme:e})=>e.colors.text};
  }
`;function Zy({t:e,language:t}){const n=Yy[t];return a.jsx(Xy,{children:a.jsxs(Ky,{children:[a.jsx("div",{children:a.jsx("strong",{children:n.legalName})}),a.jsxs("div",{children:["© ",new Date().getFullYear()," VIORA. ",e.rights]})]})})}const Jy=Hn`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-14px) rotate(1.5deg); }
`,Wf=Hn`
  0%, 100% { transform: scale(1); opacity: 0.75; }
  50% { transform: scale(1.08); opacity: 1; }
`,qy=E.section`
  position: relative;
  padding: 96px 0 80px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 72px 0 56px;
  }
`,ev=E(Mt)`
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: 54px;
  align-items: center;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`,tv=E.div`
  width: fit-content;
  margin-bottom: 22px;
  padding: 8px 14px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.radius.full};
  background: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.accent};
  font-size: 13px;
  font-weight: 800;
  box-shadow: ${({theme:e})=>e.colors.shadow};
`,nv=E.h1`
  margin: 0;
  max-width: 850px;
  font-size: clamp(42px, 7vw, 74px);
  line-height: 0.98;
  letter-spacing: -0.03em;

  span {
    color: ${({theme:e})=>e.colors.primary};
  }
`,rv=E.p`
  margin: 26px 0 0;
  max-width: 650px;
  color: ${({theme:e})=>e.colors.muted};
  font-size: clamp(17px, 2vw, 20px);
`,ov=E.div`
  margin-top: 36px;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`,iv=E.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0 22px;
  border-radius: ${({theme:e})=>e.radius.full};
  border: 1px solid ${({theme:e,$variant:t})=>t==="ghost"?e.colors.border:e.colors.primary};
  background: ${({theme:e,$variant:t})=>t==="ghost"?e.colors.surface:e.colors.primary};
  color: ${({theme:e,$variant:t})=>t==="ghost"?e.colors.text:e.colors.white};
  font-weight: 800;
  box-shadow: ${({theme:e})=>e.colors.shadow};
  transition: transform ${({theme:e})=>e.motion.fast}, background ${({theme:e})=>e.motion.fast};

  &:hover {
    transform: translateY(-3px);
    background: ${({theme:e,$variant:t})=>t==="ghost"?e.colors.primarySoft:e.colors.primary};
  }
`,lv=E.div`
  position: relative;
  min-height: 520px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 34px;
  background: ${({theme:e})=>e.colors.elevated};
  box-shadow: ${({theme:e})=>e.colors.shadow};
  padding: 28px;
  overflow: hidden;
  animation: ${Jy} 7s ease-in-out infinite;

  @media (max-width: 920px) {
    min-height: 420px;
  }
`,av=E.div`
  position: absolute;
  width: 190px;
  height: 190px;
  right: -46px;
  top: -48px;
  border: 22px solid ${({theme:e})=>e.colors.primarySoft};
  border-radius: 50%;
  animation: ${Wf} 5s ease-in-out infinite;
`,qo=E.div`
  position: absolute;
  width: 12px;
  height: 12px;
  left: ${({$left:e})=>e};
  top: ${({$top:e})=>e};
  border-radius: 999px;
  background: ${({theme:e})=>e.colors.accent};
  box-shadow: 0 0 0 8px ${({theme:e})=>e.colors.accentSoft};
  animation: ${Wf} 3.5s ease-in-out infinite;
  animation-delay: ${({$delay:e})=>e||"0s"};
`,sv=E.div`
  position: relative;
  z-index: 1;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 24px;
  background: ${({theme:e})=>e.colors.surfaceLight};
  padding: 20px;
`,uv=E.div`
  display: flex;
  gap: 8px;
  margin-bottom: 18px;

  span {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: ${({theme:e})=>e.colors.primary};
  }

  span:nth-child(2) {
    background: ${({theme:e})=>e.colors.accent};
  }

  span:nth-child(3) {
    background: ${({theme:e})=>e.colors.muted};
  }
`,cv=E.p`
  margin: 10px 0;
  color: ${({theme:e})=>e.colors.muted};
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 14px;

  strong {
    color: ${({theme:e})=>e.colors.primary};
    font-weight: 800;
  }
`,dv=E.div`
  position: absolute;
  left: 28px;
  right: 28px;
  bottom: 28px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    position: relative;
    left: auto;
    right: auto;
    bottom: auto;
    margin-top: 24px;
  }
`,pv=E.div`
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 18px;
  background: ${({theme:e})=>e.colors.surface};
  padding: 16px;
  transition: transform ${({theme:e})=>e.motion.fast}, border ${({theme:e})=>e.motion.fast};

  &:hover {
    transform: translateY(-5px);
    border-color: ${({theme:e})=>e.colors.primary};
  }

  b {
    display: block;
    font-size: 22px;
    letter-spacing: -0.04em;
  }

  span {
    display: block;
    margin-top: 4px;
    color: ${({theme:e})=>e.colors.muted};
    font-size: 12px;
  }
`;function fv({t:e}){return a.jsx(qy,{id:"home",children:a.jsxs(ev,{children:[a.jsxs("div",{children:[a.jsx(tv,{children:e.badge}),a.jsxs(nv,{children:[a.jsx("span",{children:e.titlePrefix})," ",e.titleSuffix]}),a.jsx(rv,{children:e.lead}),a.jsx(ov,{children:a.jsx(iv,{href:"#services",children:e.ctaSecondary})})]}),a.jsxs(lv,{"aria-label":"VIORA system dashboard preview",children:[a.jsx(av,{}),a.jsx(qo,{$left:"76%",$top:"38%"}),a.jsx(qo,{$left:"19%",$top:"62%",$delay:"-1.4s"}),a.jsx(qo,{$left:"49%",$top:"62%",$delay:"-1.4s"}),a.jsx(qo,{$left:"79%",$top:"62%",$delay:"-1.4s"}),a.jsxs(sv,{children:[a.jsxs(uv,{children:[a.jsx("span",{}),a.jsx("span",{}),a.jsx("span",{})]}),e.panel.map((t,n)=>a.jsxs(cv,{children:[a.jsxs("strong",{children:["0",n+1]})," · ",t]},t))]}),a.jsx(dv,{children:e.metrics.map(([t,n])=>a.jsxs(pv,{children:[a.jsx("b",{children:t}),a.jsx("span",{children:n})]},t))})]})]})})}const mv=E.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`,hv=E.article`
  position: relative;
  min-height: 320px;
  padding: 30px;
  border-radius: ${({theme:e})=>e.radius.lg};
  border: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e})=>e.colors.surface};
  box-shadow: ${({theme:e})=>e.colors.shadow};
  overflow: hidden;
  transition: transform ${({theme:e})=>e.motion.medium}, border ${({theme:e})=>e.motion.fast};

  &::before {
    content: '';
    position: absolute;
    width: 130px;
    height: 130px;
    right: -64px;
    top: -64px;
    border-radius: 999px;
    background: ${({theme:e})=>e.colors.primarySoft};
    transition: transform ${({theme:e})=>e.motion.medium};
  }

  &:hover {
    transform: translateY(-8px);
    border-color: ${({theme:e})=>e.colors.primary};
  }

  &:hover::before {
    transform: scale(1.35);
  }
`,gv=E.p`
  position: relative;
  margin: 0 0 10px;
  color: ${({theme:e})=>e.colors.accent};
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.12em;
`,yv=E.h3`
  position: relative;
  margin: 0;
  font-size: 28px;
  line-height: 1.15;
  letter-spacing: -0.02em;
`,vv=E.p`
  position: relative;
  margin: 16px 0 22px;
  color: ${({theme:e})=>e.colors.muted};
`,xv=E.ul`
  position: relative;
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${({theme:e})=>e.colors.text};
    font-weight: 700;
    font-size: 14px;
  }

  li::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({theme:e})=>e.colors.primary};
    box-shadow: 0 0 0 5px ${({theme:e})=>e.colors.primarySoft};
  }
`;function wv({t:e}){return a.jsx($l,{id:"services",children:a.jsxs(Mt,{children:[a.jsxs(vu,{children:[a.jsx(Cl,{children:e.eyebrow}),a.jsx(xu,{children:e.title}),a.jsx(wu,{children:e.text})]}),a.jsx(mv,{children:e.items.map(t=>a.jsxs(hv,{children:[a.jsx(gv,{children:t.eyebrow}),a.jsx(yv,{children:t.title}),a.jsx(vv,{children:t.description}),a.jsx(xv,{children:t.items.map(n=>a.jsx("li",{children:n},n))})]},t.title))})]})})}const Sv=E.div`
  display: grid;
  gap: 14px;
  counter-reset: process;
`,kv=E.div`
  counter-increment: process;
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 18px;
  align-items: center;
  padding: 20px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 22px;
  background: ${({theme:e})=>e.colors.surface};
  box-shadow: ${({theme:e})=>e.colors.shadow};
  transition: transform ${({theme:e})=>e.motion.fast}, border ${({theme:e})=>e.motion.fast};

  &:hover {
    transform: translateX(8px);
    border-color: ${({theme:e})=>e.colors.primary};
  }

  &::before {
    content: counter(process, decimal-leading-zero);
    width: 54px;
    height: 54px;
    display: grid;
    place-items: center;
    border-radius: 18px;
    background: ${({theme:e})=>e.colors.primarySoft};
    color: ${({theme:e})=>e.colors.primary};
    font-weight: 900;
  }

  span {
    font-size: 17px;
    font-weight: 700;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;

    &:hover {
      transform: translateY(-4px);
    }
  }
`;function jv({t:e}){return a.jsx($l,{id:"process",$compact:!0,children:a.jsxs(Mt,{children:[a.jsxs(vu,{children:[a.jsx(Cl,{children:e.eyebrow}),a.jsx(xu,{children:e.title}),a.jsx(wu,{children:e.text})]}),a.jsx(Sv,{children:e.items.map(t=>a.jsx(kv,{children:a.jsx("span",{children:t})},t))})]})})}const Ev=Hn`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.025); }
`,$v=E.div`
  position: relative;
  border-radius: 34px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e})=>e.colors.surface};
  box-shadow: ${({theme:e})=>e.colors.shadow};
  padding: 42px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    width: 260px;
    height: 260px;
    right: -100px;
    bottom: -110px;
    border-radius: 999px;
    background: ${({theme:e})=>e.colors.accentSoft};
    animation: ${Ev} 6s ease-in-out infinite;
  }

  @media (max-width: 640px) {
    padding: 28px;
  }
`,Cv=E.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`,Dv=E.div`
  min-height: 180px;
  padding: 22px;
  border-radius: 22px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e})=>e.colors.surfaceLight};
  transition: transform ${({theme:e})=>e.motion.medium}, background ${({theme:e})=>e.motion.fast};

  &:hover {
    transform: translateY(-8px) rotate(-0.5deg);
    background: ${({theme:e})=>e.colors.primarySoft};
  }

  strong {
    display: block;
    font-size: 18px;
    line-height: 1.35;
    letter-spacing: -0.03em;
  }
`;function bv({t:e}){return a.jsx($l,{id:"capabilities",children:a.jsx(Mt,{children:a.jsxs($v,{children:[a.jsxs(vu,{children:[a.jsx(Cl,{children:e.eyebrow}),a.jsx(xu,{children:e.title}),a.jsx(wu,{children:e.text})]}),a.jsx(Cv,{children:e.items.map(t=>a.jsx(Dv,{children:a.jsx("strong",{children:t})},t))})]})})})}const Tv={vi:{name:"VIORA",legalName:"VIORA CO., LTD",field:"Sản xuất phần mềm",email:"viora.co.ltd@gmail.com",phone:"0365048367",address:"Tầng 9, tòa Detech Tower 2, số 107 đường Nguyễn Phong Sắc, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Hà Nội"},en:{name:"VIORA",legalName:"VIORA CO., LTD",field:"Software Development",email:"viora.co.ltd@gmail.com",phone:"0365048367",address:"9th Floor, Detech Tower 2, 107 Nguyen Phong Sac Street, Dich Vong Hau Ward, Cau Giay District, Hanoi, Viet Nam"},jp:{name:"VIORA",legalName:"VIORA CO., LTD",field:"ソフトウェア開発",email:"viora.co.ltd@gmail.com",phone:"0365048367",address:"9階、Detech Tower 2、107 Nguyen Phong Sac Street、Dich Vong Hau Ward、Cau Giay District、ハノイ、 ベトナム"}};function Pv(e){return Tv[e]}const Iv=E.div`
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: 28px;
  align-items: stretch;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`,Nv=E.div`
  position: relative;
  padding: 42px;
  border-radius: 34px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e})=>e.colors.primary};
  color: white;
  overflow: hidden;
  box-shadow: ${({theme:e})=>e.colors.shadow};

  &::after {
    content: '';
    position: absolute;
    width: 220px;
    height: 220px;
    right: -80px;
    bottom: -90px;
    border: 24px solid rgba(255,255,255,0.16);
    border-radius: 999px;
  }

  h2 {
    position: relative;
    margin: 0;
    max-width: 720px;
    font-size: clamp(34px, 5vw, 58px);
    line-height: 1.2;
    letter-spacing: -0.03em;
  }

  p {
    position: relative;
    margin: 18px 0 0;
    max-width: 620px;
    font-size: 18px;
    opacity: 0.9;
  }
`,Fv=E.div`
  padding: 34px;
  border-radius: 34px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e})=>e.colors.surface};
  box-shadow: ${({theme:e})=>e.colors.shadow};
`,la=E.a`
  display: block;
  padding: 18px 0;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  transition: transform ${({theme:e})=>e.motion.fast};

  &:hover {
    transform: translateX(6px);
  }

  &:last-child {
    border-bottom: 0;
  }

  span {
    display: block;
    color: ${({theme:e})=>e.colors.muted};
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  strong {
    display: block;
    margin-top: 6px;
    line-height: 1.45;
  }
`;function Mv({t:e,language:t}){const n=Pv(t);return a.jsx($l,{id:"contact",$compact:!0,children:a.jsx(Mt,{children:a.jsxs(Iv,{children:[a.jsxs(Nv,{children:[a.jsx(Cl,{style:{color:"white",opacity:.9},children:e.eyebrow}),a.jsx("h2",{children:e.title}),a.jsx("p",{children:e.text})]}),a.jsxs(Fv,{children:[a.jsxs(la,{children:[a.jsx("span",{children:e.phone}),a.jsx("strong",{children:n.phone})]}),a.jsxs(la,{children:[a.jsx("span",{children:e.email}),a.jsx("strong",{children:n.email})]}),a.jsxs(la,{children:[a.jsx("span",{children:e.address}),a.jsx("strong",{children:n.address})]})]})]})})})}const _v={employeeNo:"",department:"",name:"",joinDate:"",email:"",status:"active"},ue={basicStart:"09:00",basicEnd:"18:00",earlyStart:"05:00",earlyEnd:"10:00",overtimeStart:"19:00",overtimeEnd:"22:00",nightStart:"22:00",nightEnd:"05:00",breakMinutes:60,startRoundMinutes:30,endRoundMinutes:10},Gf=[{value:"",jp:"",vi:"-",en:"-"},{value:"work",jp:"出勤",vi:"Đi làm",en:"Work"},{value:"absence",jp:"欠勤",vi:"Vắng mặt",en:"Absence"},{value:"paidLeave",jp:"有給休暇",vi:"Nghỉ phép",en:"Paid leave"},{value:"compensatoryLeave",jp:"代休",vi:"Nghỉ bù",en:"Comp. leave"},{value:"holidayWork",jp:"休日出勤",vi:"Làm ngày nghỉ",en:"Holiday work"},{value:"publicHoliday",jp:"祝日",vi:"Ngày lễ",en:"Public holiday"}];function Qf(e,t){const n=Gf.find(r=>r.value===e);return n?t==="en"?n.en:t==="jp"?n.jp||n.en:n.jp?`${n.jp} / ${n.vi}`:n.vi:""}const Yf={vi:["CN","T2","T3","T4","T5","T6","T7"],en:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],jp:["日","月","火","水","木","金","土"]};function Un(e){return String(e).padStart(2,"0")}function Av(e,t,n){return`${e}-${Un(t)}-${Un(n)}`}function sn(e){if(!e||!/^\d{2}:\d{2}$/.test(e))return null;const[t,n]=e.split(":").map(Number);return t*60+n}function ei(e){const t=(Math.round(e)%1440+1440)%1440,n=Math.floor(t/60),r=t%60;return`${Un(n)}:${Un(r)}`}function ot(e){const t=Math.max(0,Math.round(e)),n=Math.floor(t/60),r=t%60;return`${n}:${Un(r)}`}function Lv(e,t){return t?Math.ceil(e/t)*t:e}function zv(e,t){return t?Math.floor(e/t)*t:e}function Rv(e){const t=sn(e.basicStart)??sn(ue.basicStart),n=sn(e.basicEnd)??sn(ue.basicEnd);return Math.max(0,n-t-e.breakMinutes)}function aa(e,t,n,r){const o=Math.max(e,n),i=Math.min(t,r);return Math.max(0,i-o)}function Ov(e,t,n){const r=sn(n.nightStart)??1320,o=sn(n.nightEnd)??5*60;let i=0,l=e,u=t;u<=l&&(u+=1440);for(let s=0;s<=Math.ceil(u/1440);s+=1){const c=s*1440;r>o?(i+=aa(l,u,c+r,c+1440),i+=aa(l,u,c,c+o)):i+=aa(l,u,c+r,c+o)}return i}function Uv(e){const t=new Date(`${e}T00:00:00`);return t.getDay()===0?"sun":t.getDay()===6?"sat":"weekday"}function hr(e){return e==="work"||e==="holidayWork"}function Jt(e,t,n="jp"){const r=new Date(e,t,0).getDate();return Array.from({length:r},(o,i)=>{const l=i+1,u=Av(e,t,l),s=new Date(e,t-1,l),c=s.getDay()===0||s.getDay()===6,g=c?"":"work",y={id:u,date:u,day:l,weekday:Yf[n][s.getDay()],attendanceType:g,timecardIn:c?"":"09:00",timecardOut:c?"":"18:00",workStart:"",workEnd:"",basicMinutes:0,overtimeMinutes:0,nightMinutes:0,totalMinutes:0,note:""};return nl(y,ue)})}function sa(e,t){return e.map(n=>{const r=new Date(`${n.date}T00:00:00`);return{...n,weekday:Yf[t][r.getDay()]}})}function nl(e,t){const n=Rv(t);if(e.attendanceType==="paidLeave")return{...e,timecardIn:"",timecardOut:"",workStart:"",workEnd:"",basicMinutes:n,overtimeMinutes:0,nightMinutes:0,totalMinutes:n};if(!hr(e.attendanceType))return{...e,timecardIn:"",timecardOut:"",workStart:"",workEnd:"",basicMinutes:0,overtimeMinutes:0,nightMinutes:0,totalMinutes:0};const r=sn(e.timecardIn),o=sn(e.timecardOut);if(r===null||o===null)return{...e,workStart:"",workEnd:"",basicMinutes:0,overtimeMinutes:0,nightMinutes:0,totalMinutes:0};let i=Lv(r,t.startRoundMinutes),l=zv(o,t.endRoundMinutes);l<=i&&(l+=1440);const u=Math.max(0,l-i),s=Math.max(0,u-t.breakMinutes),c=Ov(i,l,t);if(e.attendanceType==="holidayWork")return{...e,workStart:ei(i),workEnd:ei(l),basicMinutes:0,overtimeMinutes:s,nightMinutes:c,totalMinutes:s};const g=Math.min(s,n),y=Math.max(0,s-g);return{...e,workStart:ei(i),workEnd:ei(l),basicMinutes:g,overtimeMinutes:y,nightMinutes:c,totalMinutes:s}}function ua(e,t){return e.map(n=>nl(n,t))}function Xf(e){return e.reduce((t,n)=>(n.attendanceType==="work"&&(t.workDays+=1),n.attendanceType==="absence"&&(t.absenceDays+=1),n.attendanceType==="paidLeave"&&(t.paidLeaveDays+=1),n.attendanceType==="compensatoryLeave"&&(t.compensatoryLeaveDays+=1),n.attendanceType==="holidayWork"&&(t.holidayWorkDays+=1),n.attendanceType==="publicHoliday"&&(t.publicHolidayDays+=1),t.totalMinutes+=n.totalMinutes,t.basicMinutes+=n.basicMinutes,t.overtimeMinutes+=n.overtimeMinutes,t.nightMinutes+=n.nightMinutes,t),{workDays:0,absenceDays:0,paidLeaveDays:0,compensatoryLeaveDays:0,holidayWorkDays:0,publicHolidayDays:0,totalMinutes:0,basicMinutes:0,overtimeMinutes:0,nightMinutes:0})}const Vv={vi:{title:"Admin chấm công",subtitle:"Trang quản trị chấm công, ngày phép, nhân viên - VIORA",home:"Trang chủ",admin:"Admin",landing:"Landing page",employee:"Thông tin nhân viên",settings:"Thời gian & quy tắc",summary:"Tổng hợp tháng",sheetStatus:"Google Sheet",configured:"Đã cấu hình backend API",notConfigured:"Chưa đăng nhập hoặc chưa cấu hình backend API, dữ liệu sẽ lưu local draft.",year:"Năm",month:"Tháng",selectEmployee:"Chọn nhân viên",selectEmployeesOption:"-- Chọn nhân viên --",employeeNo:"Mã nhân viên",department:"Bộ phận",employeeName:"Họ tên",joinDate:"Ngày vào công ty",email:"Email",paidLeaveDayTitle:"Ngày phép",paidLeaveDayManagement:"Quản lý ngày phép",RemainingVacationDays:"Số ngày phép còn lại",UsedVacationDays:"Số ngày phép đã sử dụng",ExpiringVacationDays:"Số ngày phép sắp hết hạn",ExpirationDate:"Ngày hết hạn",basicTime:"Giờ làm cơ bản",earlyTime:"Giờ đi sớm",overtime:"Giờ tăng ca",nightTime:"Giờ đêm / sáng sớm",breakMinutes:"Nghỉ giữa ca",startRound:"Làm tròn giờ vào",endRound:"Làm tròn giờ ra",minutes:"phút",workDays:"Ngày đi làm",absenceDays:"Ngày vắng",paidLeaveDays:"Nghỉ phép",compLeaveDays:"Nghỉ bù",holidayWorkDays:"Làm ngày nghỉ",publicHolidayDays:"Ngày lễ",totalHours:"Tổng giờ làm",overtimeHours:"Tăng ca",nightHours:"Giờ đêm",saveDraft:"Lưu draft",syncSheet:"Đồng bộ Google Sheet",loadSheet:"Tải từ Google Sheet",testSheet:"Kiểm tra kết nối Sheet",resetMonth:"Tạo lại tháng",exportXlsx:"Tải Excel (.xlsx)",savedDraft:"Đã lưu draft trên trình duyệt.",savedSheet:"Đã gửi dữ liệu sang backend API và lưu draft local.",loaded:"Đã tải dữ liệu.",resetDone:"Đã tạo lại bảng chấm công theo tháng.",error:"Có lỗi xảy ra. Vui lòng kiểm tra cấu hình.",cols:{day:"Ngày",weekday:"Thứ",type:"Loại",timecard:"Giờ chấm công",in:"Vào",out:"Ra",workTime:"Giờ làm",start:"Giờ vào",end:"Giờ ra",working:"Giờ làm",basic:"Cơ bản",over:"Đi sớm/Tăng ca",night:"Làm đêm",total:"Tổng",note:"Ghi chú"},openTimeSheet:"Mở bảng chấm công",actions:"Thao tác",overviewTimekeeping:"Tổng quan chấm công",overview:"Tổng quan",attendance:"Chấm công",employees:"Nhân viên",users:"Tài khoản",overviewTimekeepingDescription:"Thông tin nhân viên, số liệu tổng hợp tháng và thao tác đồng bộ chính.",openTimeSheetDescription:"Cấu hình giờ làm và nhập liệu bảng chấm công theo từng ngày trong tháng.",paidLeaveDayTitleDescription:"Theo dõi số ngày phép còn lại, đã sử dụng, sắp hết hạn và bảng grant phép theo từng năm.",employeesDescription:"Quản lý nhân viên và ngày vào công ty để tính ngày phép.",usersDescription:"Tạo tài khoản admin/viewer và quản lý quyền truy cập hệ thống.",attendanceManagementSheet:"Bảng chấm công",grantDate:"Ngày cấp",grantedDays:"Số ngày được cấp",usedDays:"Số ngày đã sử dụng",remainingDays:"Số ngày còn lại",expirationDate:"Ngày hết hạn",status:"Trạng thái",noDataPaidLeave:"Chưa có dữ liệu phép. Hãy nhập ngày vào công ty và lưu nhân viên.",addEmployee:"Thêm nhân viên",newEmployee:"Nhân viên mới",saveEmployee:"Lưu nhân viên",deleteEmployee:"Xóa nhân viên",applyEmployeeProfile:"Dùng cho bảng chấm công",refreshEmployees:"Tải danh sách",noEmployees:"Chưa có nhân viên.",permission:"Phân quyền tài khoản",username:"Tên đăng nhập",displayName:"Tên hiển thị",role:"Vai trò",password:"Mật khẩu",newUser:"Tài khoản mới",saveUser:"Lưu tài khoản",deleteUser:"Xóa tài khoản",refreshUsers:"Tải danh sách",updatedAt:"Cập nhật lúc",noUsers:"Chưa có tài khoản nào.",processing:"Đang xử lý...",wait:"Vui lòng chờ, không đóng trình duyệt hoặc thao tác lại.",adminMenu:"Các mục quản trị",checking:"Đang kiểm tra...",syncing:"Đang đồng bộ...",loading:"Đang tải...",total:"TỔNG",loginDescription:"Trang quản trị chấm công, nhân viên, ngày phép và tài khoản - VIORA",selectedEmployee:"Đã chọn nhân viên. Bấm Load from Sheet để tải chấm công, ngày phép và tổng hợp tháng.",selectedDraft:"Đã chọn nhân viên từ danh sách tạm. Bấm Load from Sheet để tải dữ liệu cho tháng.",pleaseSelectEmployee:"Vui lòng chọn nhân viên trước."},en:{title:"Attendance Admin",subtitle:"Timekeeping, paid leave, and employee management page - VIORA",home:"Home",admin:"Admin",landing:"Landing page",employee:"Employee information",settings:"Time settings",summary:"Monthly summary",sheetStatus:"Google Sheet",configured:"Backend API configured",notConfigured:"Backend API is not configured or you are not logged in. Data will be saved as local draft.",year:"Year",month:"Month",selectEmployee:"Select Employee",selectEmployeesOption:"-- Select Employee --",employeeNo:"Employee No.",department:"Department",joinDate:"Join date",email:"Email",paidLeaveDayTitle:"Paid Leave Days",paidLeaveDayManagement:"Paid Leave Day Management",RemainingVacationDays:"Remaining Vacation Days",UsedVacationDays:"Used Vacation Days",ExpiringVacationDays:"Expiring Vacation Days",ExpirationDate:"Expiration Date",employeeName:"Name",basicTime:"Basic working time",earlyTime:"Early time",overtime:"Overtime",nightTime:"Night / early morning",breakMinutes:"Break time",startRound:"Start rounding",endRound:"End rounding",minutes:"min",workDays:"Work days",absenceDays:"Absence",paidLeaveDays:"Paid leave",compLeaveDays:"Comp. leave",holidayWorkDays:"Holiday work",publicHolidayDays:"Public holidays",totalHours:"Total hours",overtimeHours:"Overtime",nightHours:"Night hours",saveDraft:"Save draft",syncSheet:"Sync Google Sheet",loadSheet:"Load from Sheet",testSheet:"Test Sheet connection",resetMonth:"Reset month",exportXlsx:"Download Excel (.xlsx)",savedDraft:"Draft saved in browser.",savedSheet:"Data sent to backend API and saved as local draft.",loaded:"Data loaded.",resetDone:"Attendance month regenerated.",error:"Something went wrong. Please check the configuration.",cols:{day:"Day",weekday:"Weekday",type:"Type",timecard:"Timecard",in:"In",out:"Out",workTime:"Work time",start:"Start",end:"End",working:"Hours",basic:"Basic",over:"Early/OT",night:"Night",total:"Total",note:"Note"},openTimeSheet:"Open Timesheet",actions:"Actions",overviewTimekeeping:"Overview Timekeeping",overview:"Overview",attendance:"Attendance",employees:"Employees",users:"Users",overviewTimekeepingDescription:"Employee information, monthly summary data, and main synchronization actions.",openTimeSheetDescription:"Time settings and data entry for the timesheet by day within the month.",paidLeaveDayTitleDescription:"Track remaining vacation days, used days, days about to expire, and the annual vacation grant table.",employeesDescription:"Manage employees and their join date to calculate paid leave days.",usersDescription:"Create admin/viewer accounts and manage system access permissions.",attendanceManagementSheet:"Attendance management sheet",grantDate:"Grant Date",grantedDays:"Granted Days",usedDays:"Used Days",remainingDays:"Remaining Days",expirationDate:"Expiration Date",status:"Status",noDataPaidLeave:"No paid leave data. Please enter join date and save employee.",addEmployee:"Add Employee",newEmployee:"New Employee",saveEmployee:"Save Employee",deleteEmployee:"Delete Employee",applyEmployeeProfile:"Apply to Timesheet",refreshEmployees:"Refresh Employees",noEmployees:"No employees found.",permission:"User Permission",username:"Username",displayName:"Display Name",role:"Role",password:"Password",newUser:"New User",saveUser:"Save User",deleteUser:"Delete User",refreshUsers:"Refresh Users",updatedAt:"Updated At",noUsers:"No user accounts found.",processing:"Processing...",wait:"Please wait, do not close the browser or perform other actions.",adminMenu:"Admin Menu",checking:"Checking...",syncing:"Syncing...",loading:"Loading...",total:"TOTAL",loginDescription:"Timekeeping, employee, paid leave, and account administration page - VIORA",selectedEmployee:"Employees have been selected. Click Load from Sheet to load attendance records, leave days, and monthly summary.",selectedDraft:"Employees have been selected from the provisional list. Click Load from Sheet to load the data for the month.",pleaseSelectEmployee:"Please select employees first."},jp:{title:"勤怠管理",subtitle:"勤怠管理、休暇、従業員管理ページ - VIORA",home:"ホーム",admin:"管理",landing:"ランディングページ",employee:"社員情報",settings:"時間設定",summary:"月次集計",sheetStatus:"Google Sheet",configured:"backend API設定済み",notConfigured:"backend APIが未設定、または未ログインです。データはローカル下書きとして保存されます。",year:"年",month:"月",selectEmployee:"従業員を選択",selectEmployeesOption:"-- 従業員を選択 --",employeeNo:"社員NO",department:"所属",joinDate:"入社日",email:"メール",paidLeaveDayTitle:"有給休暇日数一覧",paidLeaveDayManagement:"有給休暇管理",RemainingVacationDays:"残り有給休暇日数",UsedVacationDays:"使用済み有給休暇日数",ExpiringVacationDays:"まもなく期限切れの有給休暇日数",ExpirationDate:"有給休暇の期限",employeeName:"氏名",basicTime:"基本就業時間",earlyTime:"早出時間",overtime:"残業時間",nightTime:"早朝・深夜時間",breakMinutes:"休憩時間",startRound:"開始時刻切上単位",endRound:"終了時刻切捨単位",minutes:"分",workDays:"出勤日数",absenceDays:"欠勤日数",paidLeaveDays:"有休取得日数",compLeaveDays:"代休取得日数",holidayWorkDays:"休日出勤",publicHolidayDays:"祝日",totalHours:"総就業時間",overtimeHours:"早出残業時間",nightHours:"早朝深夜勤務時間",saveDraft:"下書き保存",syncSheet:"Google Sheet同期",loadSheet:"Sheetから読込",testSheet:"接続確認",resetMonth:"月を再作成",exportXlsx:"Excel出力 (.xlsx)",savedDraft:"ブラウザに下書きを保存しました。",savedSheet:"backend APIへ送信し、ローカル下書きも保存しました。",loaded:"データを読み込みました。",resetDone:"勤怠月を再作成しました。",error:"エラーが発生しました。設定を確認してください。",cols:{day:"日",weekday:"曜日",type:"勤怠区分",timecard:"タイムカード時刻",in:"出社",out:"退社",workTime:"就業時刻",start:"開始時刻",end:"終了時刻",working:"就業時間",basic:"基本",over:"早出/残業",night:"早朝/深夜",total:"合計",note:"備考"},openTimeSheet:"タイムシートを開く",actions:"操作",overviewTimekeeping:"勤怠概要",overview:"概要",attendance:"勤怠",employees:"従業員",users:"ユーザー",overviewTimekeepingDescription:"従業員情報、月次集計データ、勤怠管理表の同期操作など。",openTimeSheetDescription:"勤怠管理表の時間設定や日ごとのデータ入力など。",paidLeaveDayTitleDescription:"残り有給休暇日数、使用済み日数、まもなく期限切れの日数、年間の有給休暇付与テーブルなどを管理。",employeesDescription:"新人/従業員とその入社日を管理して、休暇日数を計算する。",usersDescription:"管理者/閲覧者アカウントを作成し、システムアクセス権限を管理する。",attendanceManagementSheet:"勤怠管理表",grantDate:"付与日",grantedDays:"付与日数",usedDays:"取得日数",remainingDays:"残日数",expirationDate:"有効期限",status:"ステータス",noDataPaidLeave:"有給休暇のデータがありません。入社日を入力して従業員を保存してください。",addEmployee:"社員を追加",newEmployee:"新規社員",saveEmployee:"社員を保存",deleteEmployee:"社員を削除",applyEmployeeProfile:"勤怠表に適用",refreshEmployees:"社員リストを更新",noEmployees:"社員が見つかりません。",permission:"ユーザー権限",username:"ユーザー名",displayName:"表示名",role:"役割",password:"パスワード",newUser:"新規ユーザー",saveUser:"ユーザーを保存",deleteUser:"ユーザーを削除",refreshUsers:"ユーザーリストを更新",updatedAt:"更新日時",noUsers:"ユーザーアカウントが見つかりません。",processing:"処理中...",wait:"しばらくお待ちください。ブラウザを閉じたり、他の操作をしないでください。",adminMenu:"管理メニュー",checking:"接続確認中...",syncing:"同期中...",loading:"読み込み中...",total:"合計",loginDescription:"勤怠管理、従業員管理、休暇管理、アカウント管理ページ - VIORA",selectedEmployee:"従業員が選択されました。「シートから読み込む」をクリックして、出勤記録、休暇日数、月次サマリーを読み込んでください。",selectedDraft:"従業員は暫定リストから選定されました。「シートから読み込む」をクリックして、該当月のデータを読み込みます。",pleaseSelectEmployee:"まず、従業員を選択してください。"}};function Kf(e){return Vv[e]}const Bv=Zf("/api/attendance"),Hv=Zf(""),Su="viora-admin-session";function Zf(e){return String(e||"").trim().replace(/^[`'"<]+|[`'">]+$/g,"").trim()}function Wv(e,t={}){const n=Bv||"/api/attendance",r=/^https?:\/\//i.test(n)?new URL(n):new URL(n,window.location.origin);return r.searchParams.set("action",e),Object.entries(t).forEach(([o,i])=>{i!==void 0&&i!==""&&r.searchParams.set(o,String(i))}),r.toString()}function ed(e){try{const t=new URL(e);return t.searchParams.delete("token"),t.toString()}catch{return e.replace(/token=[^&]+/g,"token=***")}}function Jf(){var t;const e=localStorage.getItem(Su);if(!e)return null;try{const n=JSON.parse(e);return!(n!=null&&n.token)||!((t=n==null?void 0:n.user)!=null&&t.username)?null:n}catch{return null}}function Gv(e){localStorage.setItem(Su,JSON.stringify(e))}function qf(){localStorage.removeItem(Su)}function em(){var e;return((e=Jf())==null?void 0:e.token)||Hv}function Qv(e=!1){const t={"Content-Type":"application/json"},n=em();return!e&&n&&(t.Authorization=`Bearer ${n}`),t}async function Dt(e,t={}){const n=t.method||"GET",r=Wv(e,t.query);let o;try{o=await fetch(r,{method:n,headers:Qv(t.skipAuth),credentials:"omit",body:n==="POST"?JSON.stringify(t.body||{}):void 0})}catch(u){throw new Error(`Cannot connect to attendance API. Tried: ${ed(r)}. Original error: ${u instanceof Error?u.message:"Network error"}`)}const i=await o.text();let l=null;try{l=i?JSON.parse(i):null}catch{throw new Error(`Attendance API did not return valid JSON. HTTP ${o.status}. Tried: ${ed(r)}. Response: ${i.slice(0,240)}`)}if(!o.ok||!(l!=null&&l.ok))throw o.status===401&&qf(),new Error((l==null?void 0:l.message)||`Attendance API request failed with HTTP ${o.status}.`);return l}function Xe(e,t=0){const n=Number(e);return Number.isFinite(n)?n:t}function Pe(e){const t=String(e||"").trim();if(!t||t==="--:--")return"";const n=t.match(/^(\d{1,2}):(\d{2})/);return n?`${n[1].padStart(2,"0")}:${n[2]}`:t}function td(e){return{basicStart:Pe(e==null?void 0:e.basicStart)||ue.basicStart,basicEnd:Pe(e==null?void 0:e.basicEnd)||ue.basicEnd,earlyStart:Pe(e==null?void 0:e.earlyStart)||ue.earlyStart,earlyEnd:Pe(e==null?void 0:e.earlyEnd)||ue.earlyEnd,overtimeStart:Pe(e==null?void 0:e.overtimeStart)||ue.overtimeStart,overtimeEnd:Pe(e==null?void 0:e.overtimeEnd)||ue.overtimeEnd,nightStart:Pe(e==null?void 0:e.nightStart)||ue.nightStart,nightEnd:Pe(e==null?void 0:e.nightEnd)||ue.nightEnd,breakMinutes:Xe(e==null?void 0:e.breakMinutes,ue.breakMinutes),startRoundMinutes:Xe(e==null?void 0:e.startRoundMinutes,ue.startRoundMinutes),endRoundMinutes:Xe(e==null?void 0:e.endRoundMinutes,ue.endRoundMinutes)}}function Yv(e,t,n,r){var o,i,l,u,s,c;return e.payload?{...e.payload,employee:{employeeNo:e.payload.employee.employeeNo||t,name:e.payload.employee.name||"",department:e.payload.employee.department||"",joinDate:e.payload.employee.joinDate||"",email:e.payload.employee.email||"",status:e.payload.employee.status||"active"},year:Xe(e.payload.year,n),month:Xe(e.payload.month,r),settings:td(e.payload.settings),rows:(e.payload.rows||[]).map(g=>({...g,timecardIn:Pe(g.timecardIn),timecardOut:Pe(g.timecardOut),workStart:Pe(g.workStart),workEnd:Pe(g.workEnd),basicMinutes:Xe(g.basicMinutes),overtimeMinutes:Xe(g.overtimeMinutes),nightMinutes:Xe(g.nightMinutes),totalMinutes:Xe(g.totalMinutes)}))}:!e.rows||!e.rows.length?null:{employee:{employeeNo:((o=e.employee)==null?void 0:o.employeeNo)||t,name:((i=e.employee)==null?void 0:i.name)||"",department:((l=e.employee)==null?void 0:l.department)||"",joinDate:((u=e.employee)==null?void 0:u.joinDate)||"",email:((s=e.employee)==null?void 0:s.email)||"",status:((c=e.employee)==null?void 0:c.status)||"active"},year:n,month:r,settings:td(e.settings),rows:e.rows.map(g=>({...g,timecardIn:Pe(g.timecardIn),timecardOut:Pe(g.timecardOut),workStart:Pe(g.workStart),workEnd:Pe(g.workEnd),basicMinutes:Xe(g.basicMinutes),overtimeMinutes:Xe(g.overtimeMinutes),nightMinutes:Xe(g.nightMinutes),totalMinutes:Xe(g.totalMinutes)})),summary:{workDays:0,absenceDays:0,paidLeaveDays:0,compensatoryLeaveDays:0,holidayWorkDays:0,publicHolidayDays:0,totalMinutes:0,basicMinutes:0,overtimeMinutes:0,nightMinutes:0},updatedAt:e.updatedAt||""}}function Xv(){return!!em()}async function Kv(e,t){const n=await Dt("login",{method:"POST",body:{username:e,password:t},skipAuth:!0}),r={token:n.token,user:n.user,expiresAt:n.expiresAt};return Gv(r),r}async function Zv(){try{const e=await Dt("health",{skipAuth:!0});return{ok:!0,mode:"api",message:`Connected to Attendance API. ${e.version||""} ${e.timestamp||""}`.trim()}}catch(e){return{ok:!1,mode:"api",message:e instanceof Error?e.message:"Cannot connect to Attendance API."}}}async function Jv(e,t,n){const r=await Dt("load",{query:{employeeNo:e,year:t,month:n}});return{payload:Yv(r,e,t,n),employee:r.employee,leaveSummary:r.leaveSummary||null}}async function qv(e){if(!e.employee.employeeNo.trim())return{ok:!1,mode:"local",message:"Employee number is required before syncing to Google Sheet."};try{const t=await Dt("save",{method:"POST",body:e});return{ok:!0,mode:"api",leaveSummary:t.leaveSummary,message:t.message||`Saved ${t.rows||e.rows.length} attendance rows to Google Sheet.`}}catch(t){return{ok:!1,mode:"api",message:t instanceof Error?t.message:"Cannot save attendance to Google Sheet."}}}async function e0(){return(await Dt("listEmployees")).employees||[]}async function t0(e){return(await Dt("getEmployee",{query:{employeeNo:e}})).employee}async function n0(e){return await Dt("saveEmployee",{method:"POST",body:e})}async function r0(e){return await Dt("deleteEmployee",{method:"POST",body:{employeeNo:e}})}async function o0(){return(await Dt("listUsers")).users||[]}async function i0(e){return await Dt("saveUser",{method:"POST",body:e})}async function l0(e){return await Dt("deleteUser",{method:"POST",body:{username:e}})}const D={title:1,label:2,value:3,settingsHeader:4,settingsLabel:5,settingsValue:6,header:7,headerYellow:8,body:9,day:10,saturday:11,sunday:12,disabled:13,disabledDay:14,total:15,totalLabel:16,note:17},a0=new TextEncoder;function ku(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")}function s0(e){let t="",n=e;for(;n>0;){const r=(n-1)%26;t=String.fromCharCode(65+r)+t,n=Math.floor((n-1)/26)}return t}function gr(e,t){return`${s0(t)}${e}`}function ti(e){return e&&/^\d{2}:\d{2}$/.test(e)?e:"--:--"}function u0(e){const t=["日","月","火","水","木","金","土"],n=new Date(`${e}T00:00:00`);return t[n.getDay()]||""}function c0(e){if(!e||!hr(e.attendanceType))return D.disabledDay;const t=new Date(`${e.date}T00:00:00`).getDay();return t===0?D.sunday:t===6?D.saturday:D.day}function Q(e,t,n,r,o){e.set(gr(t,n),{value:r,style:o})}function d0(e,t,n,r,o,i){for(let l=t;l<=n;l+=1)for(let u=r;u<=o;u+=1){const s=gr(l,u),c=e.get(s);e.set(s,{value:c==null?void 0:c.value,style:i})}}function p0(e,t,n,r,o,i,l){d0(e,t,r,n,o,l),Q(e,t,n,i,l)}function f0(e,t,n){const r=gr(e,t),o=` s="${n.style}"`;return typeof n.value>"u"||n.value===""?`<c r="${r}"${o}/>`:typeof n.value=="number"&&Number.isFinite(n.value)?`<c r="${r}"${o}><v>${n.value}</v></c>`:`<c r="${r}"${o} t="inlineStr"><is><t>${ku(n.value)}</t></is></c>`}function xt(e){return ot(e||0)}function m0(e){const t=new Map,n=[],r=40,o=44,i=Xf(e.rows),l=new Map(e.rows.map(f=>[f.day,f])),u=(f,v)=>n.push(`${f}:${v}`),s=(f,v,x,S,N,p)=>{p0(t,f,v,x,S,N,p),u(gr(f,v),gr(x,S))};for(let f=1;f<=o;f+=1)for(let v=1;v<=r;v+=1)Q(t,f,v,"",D.body);s(1,1,1,2,e.year,D.title),Q(t,1,3,"年",D.title),s(1,4,1,5,e.month,D.title),Q(t,1,6,"月度",D.title),s(3,1,3,3,"社員NO",D.label),s(3,4,3,7,e.employee.employeeNo||"",D.value),s(3,8,3,10,"所属",D.label),s(3,11,3,22,e.employee.department||"",D.value),s(3,23,3,25,"氏名",D.label),s(3,26,3,35,e.employee.name||"",D.value),s(5,1,5,7,"出勤日数",D.label),s(6,1,6,7,i.workDays,D.value),s(5,8,5,14,"欠勤日数",D.label),s(6,8,6,14,i.absenceDays,D.value),s(5,15,5,21,"有休取得日数",D.label),s(6,15,6,21,i.paidLeaveDays,D.value),s(5,22,5,28,"代休取得日数",D.label),s(6,22,6,28,i.compensatoryLeaveDays,D.value),s(7,1,7,7,"総就業時間",D.label),s(8,1,8,7,xt(i.totalMinutes),D.value),s(7,8,7,14,"早出残業時間",D.label),s(8,8,8,14,xt(i.overtimeMinutes),D.value),s(7,15,7,21,"早朝深夜勤務時間",D.label),s(8,15,8,21,xt(i.nightMinutes),D.value),s(1,37,1,40,"時間設定",D.settingsHeader),Q(t,2,37,"基本就業時間",D.settingsLabel),Q(t,2,38,e.settings.basicStart,D.settingsValue),Q(t,2,39,"～",D.settingsValue),Q(t,2,40,e.settings.basicEnd,D.settingsValue),Q(t,3,37,"早出時間",D.settingsLabel),Q(t,3,38,e.settings.earlyStart,D.settingsValue),Q(t,3,39,"～",D.settingsValue),Q(t,3,40,e.settings.earlyEnd,D.settingsValue),Q(t,4,37,"残業時間",D.settingsLabel),Q(t,4,38,e.settings.overtimeStart,D.settingsValue),Q(t,4,39,"～",D.settingsValue),Q(t,4,40,e.settings.overtimeEnd,D.settingsValue),Q(t,5,37,"早朝・深夜業時間",D.settingsLabel),Q(t,5,38,e.settings.nightStart,D.settingsValue),Q(t,5,39,"～",D.settingsValue),Q(t,5,40,e.settings.nightEnd,D.settingsValue),Q(t,6,37,"休憩時間",D.settingsLabel),Q(t,6,38,`${e.settings.breakMinutes}分`,D.settingsValue),s(8,37,8,40,"就業時刻",D.settingsHeader),Q(t,9,37,"開始時刻切上単位",D.settingsLabel),Q(t,9,38,e.settings.startRoundMinutes,D.settingsValue),Q(t,10,37,"終了時刻切捨単位",D.settingsLabel),Q(t,10,38,e.settings.endRoundMinutes,D.settingsValue),Q(t,11,38,"※単位：分",D.settingsValue),["勤怠区分","出勤","欠勤","有給休暇","代休","休日出勤","祝日"].forEach((f,v)=>{Q(t,13+v,37,f,D.settingsLabel)}),s(10,1,12,2,"日",D.header),s(10,3,12,4,"曜日",D.header),s(10,5,12,8,"勤怠区分",D.header),s(10,9,10,14,"タイムカード時刻",D.header),s(11,9,12,11,"出社",D.header),s(11,12,12,14,"退社",D.header),s(10,15,10,20,"就業時刻",D.header),s(11,15,12,17,"開始時刻",D.header),s(11,18,12,20,"終了時刻",D.header),s(10,21,10,29,"就業時間",D.headerYellow),s(11,21,12,23,"基本",D.headerYellow),s(11,24,11,26,"早出",D.headerYellow),s(12,24,12,26,"残業",D.headerYellow),s(11,27,11,29,"早朝",D.headerYellow),s(12,27,12,29,"深夜",D.headerYellow),s(10,30,12,31,"合計",D.headerYellow),s(10,32,12,35,"備考",D.header);for(let f=1;f<=31;f+=1){const v=12+f,x=l.get(f),S=x?hr(x.attendanceType):!1,N=S?D.body:D.disabled,p=S?D.total:D.disabled,d=S?D.note:D.disabled,h=c0(x),w=x?Qf(x.attendanceType,"jp"):"";s(v,1,v,2,x?x.day:"",h),s(v,3,v,4,x?u0(x.date):"",N),s(v,5,v,8,w,N),s(v,9,v,11,S?ti(x==null?void 0:x.timecardIn):"--:--",N),s(v,12,v,14,S?ti(x==null?void 0:x.timecardOut):"--:--",N),s(v,15,v,17,S?ti(x==null?void 0:x.workStart):"--:--",N),s(v,18,v,20,S?ti(x==null?void 0:x.workEnd):"--:--",N),s(v,21,v,23,x?xt(x.basicMinutes):"",p),s(v,24,v,26,x?xt(x.overtimeMinutes):"",p),s(v,27,v,29,x?xt(x.nightMinutes):"",p),s(v,30,v,31,x?xt(x.totalMinutes):"",p),s(v,32,v,35,(x==null?void 0:x.note)||"",d)}s(o,1,o,20,"合計",D.totalLabel),s(o,21,o,23,xt(i.basicMinutes),D.total),s(o,24,o,26,xt(i.overtimeMinutes),D.total),s(o,27,o,29,xt(i.nightMinutes),D.total),s(o,30,o,31,xt(i.totalMinutes),D.total),s(o,32,o,35,"",D.note);const c=new Map([[1,26],[3,22],[5,22],[6,22],[7,22],[8,22],[10,26],[11,24],[12,24],[44,24]]);for(let f=13;f<=43;f+=1)c.set(f,22);const g=[[1,2,4.2],[3,4,4.6],[5,8,7.6],[9,20,7.4],[21,31,6.8],[32,35,12.2],[36,36,2.2],[37,37,18],[38,38,9],[39,39,4],[40,40,9]],y=[];for(let f=1;f<=o;f+=1){const v=c.get(f),x=v?` r="${f}" ht="${v}" customHeight="1"`:` r="${f}"`,S=[];for(let N=1;N<=r;N+=1){const p=t.get(gr(f,N));p&&S.push(f0(f,N,p))}y.push(`<row${x}>${S.join("")}</row>`)}return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheetViews><sheetView workbookViewId="0"><pane ySplit="12" topLeftCell="A13" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>
  <sheetFormatPr defaultRowHeight="18"/>
  <cols>${g.map(([f,v,x])=>`<col min="${f}" max="${v}" width="${x}" customWidth="1"/>`).join("")}</cols>
  <sheetData>${y.join("")}</sheetData>
  <mergeCells count="${n.length}">${n.map(f=>`<mergeCell ref="${f}"/>`).join("")}</mergeCells>
  <dataValidations count="1"><dataValidation type="list" allowBlank="1" showErrorMessage="1" sqref="E13:H43"><formula1>$AK$14:$AK$19</formula1></dataValidation></dataValidations>
  <pageMargins left="0.3" right="0.3" top="0.5" bottom="0.5" header="0.3" footer="0.3"/>
</worksheet>`}function h0(){return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="5">
    <font><sz val="10"/><name val="Arial"/><family val="2"/></font>
    <font><b/><sz val="10"/><name val="Arial"/><family val="2"/></font>
    <font><b/><sz val="16"/><name val="Arial"/><family val="2"/></font>
    <font><b/><sz val="10"/><color rgb="FFFFFFFF"/><name val="Arial"/><family val="2"/></font>
    <font><sz val="10"/><color rgb="FF666666"/><name val="Arial"/><family val="2"/></font>
  </fonts>
  <fills count="9">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFFFFFF"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFCCFFFF"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFFFF99"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFE7E7E7"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFEAF2FF"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF293DFF"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFF2222"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border><left style="thin"><color rgb="FFB7C9C9"/></left><right style="thin"><color rgb="FFB7C9C9"/></right><top style="thin"><color rgb="FFB7C9C9"/></top><bottom style="thin"><color rgb="FFB7C9C9"/></bottom><diagonal/></border>
  </borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="18">
    <xf numFmtId="0" fontId="0" fillId="2" borderId="1" xfId="0" applyFill="1" applyBorder="1"><alignment vertical="center"/></xf>
    <xf numFmtId="0" fontId="2" fillId="2" borderId="0" xfId="0" applyFont="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="1" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="0" fillId="2" borderId="1" xfId="0" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="1" fillId="6" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="1" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="left" vertical="center"/></xf>
    <xf numFmtId="0" fontId="0" fillId="2" borderId="1" xfId="0" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="1" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="1" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="2" borderId="1" xfId="0" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="1" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="3" fillId="7" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="3" fillId="8" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="4" fillId="5" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="1" fillId="5" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="1" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="1" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="0" fillId="2" borderId="1" xfId="0" applyFill="1" applyBorder="1"><alignment horizontal="left" vertical="center"/></xf>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`}function g0(e){return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets><sheet name="${ku(e)}" sheetId="1" r:id="rId1"/></sheets>
</workbook>`}function y0(){return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`}function v0(){return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`}function x0(){return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`}function w0(){const e=new Date().toISOString();return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:creator>VIORA Admin</dc:creator>
  <cp:lastModifiedBy>VIORA Admin</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">${e}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">${e}</dcterms:modified>
</cp:coreProperties>`}function S0(e){return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>VIORA Admin</Application>
  <DocSecurity>0</DocSecurity>
  <ScaleCrop>false</ScaleCrop>
  <HeadingPairs><vt:vector size="2" baseType="variant"><vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant><vt:variant><vt:i4>1</vt:i4></vt:variant></vt:vector></HeadingPairs>
  <TitlesOfParts><vt:vector size="1" baseType="lpstr"><vt:lpstr>${ku(e)}</vt:lpstr></vt:vector></TitlesOfParts>
</Properties>`}function Lt(e){return a0.encode(e)}const k0=(()=>{const e=new Uint32Array(256);for(let t=0;t<256;t+=1){let n=t;for(let r=0;r<8;r+=1)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n>>>0}return e})();function j0(e){let t=4294967295;for(const n of e)t=k0[(t^n)&255]^t>>>8;return(t^4294967295)>>>0}function E0(e=new Date){const t=Math.max(1980,e.getFullYear()),n=e.getHours()<<11|e.getMinutes()<<5|Math.floor(e.getSeconds()/2),r=t-1980<<9|e.getMonth()+1<<5|e.getDate();return{dosTime:n,dosDate:r}}function ne(e,t,n){e[t]=n&255,e[t+1]=n>>>8&255}function Qe(e,t,n){e[t]=n&255,e[t+1]=n>>>8&255,e[t+2]=n>>>16&255,e[t+3]=n>>>24&255}function $0(e){const t=E0(),n=[],r=[];let o=0;e.forEach(g=>{const y=Lt(g.name),f=j0(g.data),v=new Uint8Array(30+y.length);Qe(v,0,67324752),ne(v,4,20),ne(v,6,2048),ne(v,8,0),ne(v,10,t.dosTime),ne(v,12,t.dosDate),Qe(v,14,f),Qe(v,18,g.data.length),Qe(v,22,g.data.length),ne(v,26,y.length),ne(v,28,0),v.set(y,30),n.push(v,g.data);const x=new Uint8Array(46+y.length);Qe(x,0,33639248),ne(x,4,20),ne(x,6,20),ne(x,8,2048),ne(x,10,0),ne(x,12,t.dosTime),ne(x,14,t.dosDate),Qe(x,16,f),Qe(x,20,g.data.length),Qe(x,24,g.data.length),ne(x,28,y.length),ne(x,30,0),ne(x,32,0),ne(x,34,0),ne(x,36,0),Qe(x,38,0),Qe(x,42,o),x.set(y,46),r.push(x),o+=v.length+g.data.length});const i=r.reduce((g,y)=>g+y.length,0),l=new Uint8Array(22);Qe(l,0,101010256),ne(l,4,0),ne(l,6,0),ne(l,8,e.length),ne(l,10,e.length),Qe(l,12,i),Qe(l,16,o),ne(l,20,0);const u=o+i+l.length,s=new Uint8Array(u);let c=0;return[...n,...r,l].forEach(g=>{s.set(g,c),c+=g.length}),s}function C0(e){const t=`${e.year}${Un(e.month)}勤怠管理`,n=[{name:"[Content_Types].xml",data:Lt(x0())},{name:"_rels/.rels",data:Lt(v0())},{name:"docProps/core.xml",data:Lt(w0())},{name:"docProps/app.xml",data:Lt(S0(t))},{name:"xl/workbook.xml",data:Lt(g0(t))},{name:"xl/_rels/workbook.xml.rels",data:Lt(y0())},{name:"xl/styles.xml",data:Lt(h0())},{name:"xl/worksheets/sheet1.xml",data:Lt(m0(e))}];return $0(n)}function nd(e){const t=C0(e),n=new Blob([t],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),r=URL.createObjectURL(n),o=document.createElement("a"),i=e.employee.employeeNo||"employee";o.href=r,o.download=`${i}_${e.year}${Un(e.month)}_勤怠管理表.xlsx`,document.body.appendChild(o),o.click(),o.remove(),URL.revokeObjectURL(r)}function tm(e,t,n){return`viora-attendance:${e||"unknown"}:${t}-${String(n).padStart(2,"0")}`}function ca(e){localStorage.setItem(tm(e.employee.employeeNo,e.year,e.month),JSON.stringify(e))}function D0(e,t,n){const r=localStorage.getItem(tm(e,t,n));if(!r)return null;try{return JSON.parse(r)}catch{return null}}const nm=Hn`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`,b0=Hn`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`,T0=Hn`
  to { transform: rotate(360deg); }
`,rm=E.div`
  min-height: 100vh;
  background: ${({theme:e})=>e.colors.background};
`,P0=E.header`
  position: sticky;
  top: 0;
  z-index: 30;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e})=>e.mode==="light"?"rgba(246, 248, 252, 0.86)":"rgba(11, 16, 32, 0.86)"};
  backdrop-filter: blur(18px);
`,I0=E(Mt)`
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  @media (max-width: 860px) {
    width: min(100% - 24px, ${({theme:e})=>e.layout.maxWidth});
    min-height: auto;
    padding: 12px 0;
    align-items: stretch;
    flex-direction: column;
  }

  @media (max-width: 520px) {
    width: min(100% - 18px, ${({theme:e})=>e.layout.maxWidth});
    gap: 12px;
  }
`,N0=E.a`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 900;
  letter-spacing: -0.04em;
  font-size: 22px;
  min-width: 0;

  @media (max-width: 520px) {
    font-size: 19px;
  }
`,F0=E.div`
  display: flex;
  justify-content: center;
`,om=E.span`
  width: 38px;
  height: 38px;
  border-radius: 13px;
  display: grid;
  place-items: center;
  background: ${({theme:e})=>e.colors.primary};
  color: white;
  box-shadow: 0 12px 34px ${({theme:e})=>e.colors.primarySoft};

  &::before {
    content: 'V';
    font-weight: 900;
  }

  @media (max-width: 520px) {
    width: 34px;
    height: 34px;
    border-radius: 12px;
  }
`,M0=E.div`
  display: flex;
  justify-content: center;
  margin: 0;
  font-size: 34px;
  letter-spacing: -0.06em;
  font-weight: 800;
`,_0=E.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
  min-width: 0;
  max-width: 100%;

  > * {
    min-width: 0;
  }

  @media (max-width: 860px) {
    width: 100%;
    justify-content: flex-start;
  }

  @media (max-width: 620px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;

    > * {
      width: 100%;
      justify-content: center;
    }

    > *:first-child {
      grid-column: 1 / -1;
    }
  }
`,rd=E.div`
  display: flex;
  padding: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.radius.full};
  background: ${({theme:e})=>e.colors.surface};
  box-shadow: ${({theme:e})=>e.colors.shadow};
  min-width: 0;

  @media (max-width: 620px) {
    > button {
      flex: 1;
    }
  }
`,da=E.button`
  border: 0;
  min-width: 38px;
  height: 32px;
  padding: 0 10px;
  border-radius: ${({theme:e})=>e.radius.full};
  background: ${({theme:e,$active:t})=>t?e.colors.primary:"transparent"};
  color: ${({theme:e,$active:t})=>t?e.colors.white:e.colors.muted};
  font-weight: 900;
  font-size: 12px;
  transition: transform ${({theme:e})=>e.motion.fast}, background ${({theme:e})=>e.motion.fast};

  &:hover {
    transform: translateY(-1px);
    color: ${({theme:e,$active:t})=>t?e.colors.white:e.colors.text};
  }

  @media (max-width: 560px) {
    min-width: 34px;
    padding: 0 8px;
  }
`;E.a`
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border-radius: ${({theme:e})=>e.radius.full};
  border: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.text};
  font-weight: 800;
  font-size: 13px;
  box-shadow: ${({theme:e})=>e.colors.shadow};

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    background: ${({theme:e})=>e.colors.primarySoft};
  }
`;E.button`
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border-radius: ${({theme:e})=>e.radius.full};
  border: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.text};
  font-weight: 900;
  font-size: 13px;
  box-shadow: ${({theme:e})=>e.colors.shadow};

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    background: ${({theme:e})=>e.colors.primarySoft};
  }
`;const A0=E.div`
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 14px;
  border-radius: ${({theme:e})=>e.radius.full};
  border: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e})=>e.colors.surface};
  font-size: 13px;
  font-weight: 900;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  span {
    min-width: 0;
    color: ${({theme:e})=>e.colors.muted};
    font-weight: 800;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;E.section`
  padding: 54px 0 28px;
`;E(Mt)`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 28px;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;E.div`
  animation: ${nm} 420ms ease both;

  p {
    max-width: 760px;
    margin: 18px 0 0;
    color: ${({theme:e})=>e.colors.muted};
    font-size: 17px;
  }
`;const L0=E.div`
  width: fit-content;
  margin-bottom: 14px;
  padding: 8px 14px;
  border-radius: ${({theme:e})=>e.radius.full};
  border: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.accent};
  font-weight: 900;
  font-size: 13px;
`;E.h1`
  margin: 0;
  font-size: clamp(38px, 6vw, 66px);
  line-height: 1;
  letter-spacing: -0.06em;

  span {
    color: ${({theme:e})=>e.colors.primary};
  }
`;E.div`
  position: relative;
  padding: 26px;
  border-radius: 28px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e})=>e.colors.surface};
  box-shadow: ${({theme:e})=>e.colors.shadow};
  overflow: hidden;
  animation: ${b0} 7s ease-in-out infinite;

  &::after {
    content: '';
    position: absolute;
    right: -70px;
    bottom: -70px;
    width: 170px;
    height: 170px;
    border-radius: 999px;
    background: ${({theme:e})=>e.colors.primarySoft};
  }

  strong, span, small {
    position: relative;
    z-index: 1;
  }

  strong {
    display: block;
    font-size: 18px;
  }

  span {
    display: block;
    margin-top: 8px;
    color: ${({theme:e})=>e.colors.muted};
  }

  small {
    display: inline-flex;
    margin-top: 16px;
    padding: 7px 10px;
    border-radius: ${({theme:e})=>e.radius.full};
    background: ${({theme:e})=>e.colors.primarySoft};
    color: ${({theme:e})=>e.colors.primary};
    font-weight: 900;
  }
`;E(Mt)`
  padding: 18px 0 80px;
  display: grid;
  gap: 22px;
  min-width: 0;

  @media (max-width: 640px) {
    padding-bottom: 56px;
  }
`;const z0=E.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
  min-width: 0;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`,zt=E.section`
  min-width: 0;
  max-width: 100%;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e})=>e.colors.surface};
  border-radius: 28px;
  padding: 24px;
  box-shadow: ${({theme:e})=>e.colors.shadow};
  animation: ${nm} 420ms ease both;

  @media (max-width: 640px) {
    border-radius: 22px;
    padding: 18px;
  }
`,qt=E.h2`
  margin: 0 0 18px;
  font-size: 22px;
  letter-spacing: -0.04em;
`,ni=E.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`,U=E.label`
  display: grid;
  gap: 7px;
  color: ${({theme:e})=>e.colors.muted};
  font-size: 13px;
  font-weight: 800;
`,X=E.input`
  width: 100%;
  min-height: 42px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 14px;
  background: ${({theme:e})=>e.colors.surfaceLight};
  color: ${({theme:e})=>e.colors.text};
  padding: 0 12px;
  outline: none;

  &:focus {
    border-color: ${({theme:e})=>e.colors.primary};
    box-shadow: 0 0 0 4px ${({theme:e})=>e.colors.primarySoft};
  }
`,ri=E.select`
  width: 100%;
  min-height: 42px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 14px;
  background: ${({theme:e})=>e.colors.surfaceLight};
  color: ${({theme:e})=>e.colors.text};
  padding: 0 12px;
  outline: none;

  &:focus {
    border-color: ${({theme:e})=>e.colors.primary};
    box-shadow: 0 0 0 4px ${({theme:e})=>e.colors.primarySoft};
  }
`,od=E.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`,ke=E.div`
  padding: 16px;
  border-radius: 18px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e})=>e.colors.surfaceLight};
  transition: transform ${({theme:e})=>e.motion.fast}, background ${({theme:e})=>e.motion.fast};

  &:hover {
    transform: translateY(-4px);
    background: ${({theme:e})=>e.colors.primarySoft};
  }

  span {
    display: block;
    color: ${({theme:e})=>e.colors.muted};
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  strong {
    display: block;
    margin-top: 5px;
    font-size: 24px;
    letter-spacing: -0.04em;
  }
`,oi=E.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 16px;

  @media (max-width: 760px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`,re=E.button`
  min-height: 44px;
  border-radius: ${({theme:e})=>e.radius.full};
  border: 1px solid ${({theme:e,$primary:t,$danger:n})=>n?"#DC2626":t?e.colors.primary:e.colors.border};
  background: ${({theme:e,$primary:t,$danger:n})=>n?"#DC2626":t?e.colors.primary:e.colors.surface};
  color: ${({theme:e,$primary:t,$danger:n})=>t||n?e.colors.white:e.colors.text};
  padding: 0 18px;
  font-weight: 900;
  box-shadow: ${({theme:e})=>e.colors.shadow};
  transition: transform ${({theme:e})=>e.motion.fast}, background ${({theme:e})=>e.motion.fast};

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    background: ${({theme:e,$primary:t,$danger:n})=>n?"#B91C1C":t?e.colors.primary:e.colors.primarySoft};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  @media (max-width: 760px) {
    width: 100%;
  }
`,R0=E.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`,ju=E.span`
  width: 16px;
  height: 16px;
  border-radius: 999px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  display: inline-block;
  animation: ${T0} 700ms linear infinite;
`,O0=E.div`
  min-height: 46px;
  display: flex;
  align-items: center;
  margin-top: 12px;
  padding: 12px 16px;
  border-radius: 16px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e,$state:t})=>t==="error"?"rgba(239, 68, 68, 0.10)":e.colors.surfaceLight};
  color: ${({theme:e,$state:t})=>t==="error"?"#DC2626":e.colors.muted};
  font-weight: 800;
`,U0=E.div`
  position: fixed;
  left: 24px;
  bottom: 24px;
  z-index: 80;
  width: min(460px, calc(100vw - 48px));
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px solid ${({$state:e})=>e==="error"?"rgba(220, 38, 38, 0.32)":"rgba(22, 163, 74, 0.32)"};
  background: ${({theme:e,$state:t})=>t==="error"?e.mode==="light"?"#FEF2F2":"#2A1111":e.mode==="light"?"#ECFDF3":"#0F2618"};
  color: ${({$state:e})=>e==="error"?"#DC2626":"#15803D"};
  box-shadow: ${({theme:e})=>e.colors.shadow};
  font-weight: 900;

  @media (max-width: 520px) {
    left: 12px;
    bottom: 12px;
    width: calc(100vw - 24px);
    padding: 12px 14px;
  }
`,V0=E.button`
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.08);
  color: inherit;
  font-weight: 900;
`,B0=E.div`
  position: fixed;
  inset: 0;
  z-index: 70;
  display: grid;
  place-items: center;
  background: ${({theme:e})=>e.mode==="light"?"rgba(246, 248, 252, 0.72)":"rgba(11, 16, 32, 0.72)"};
  backdrop-filter: blur(6px);
`,H0=E.div`
  width: min(420px, calc(100vw - 40px));
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 28px;
  background: ${({theme:e})=>e.colors.surface};
  box-shadow: ${({theme:e})=>e.colors.shadow};
  padding: 26px;
  text-align: center;

  ${ju} {
    width: 36px;
    height: 36px;
    border-width: 4px;
    color: ${({theme:e})=>e.colors.primary};
    margin: 0 auto 16px;
  }

  strong {
    display: block;
    font-size: 18px;
    letter-spacing: -0.03em;
  }

  span {
    display: block;
    margin-top: 6px;
    color: ${({theme:e})=>e.colors.muted};
    font-size: 13px;
    font-weight: 800;
  }
`,W0=E(zt)`
  padding: 0;
  overflow: hidden;
`,G0=E.div`
  padding: 22px 24px;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;

  h2 {
    margin: 0;
    font-size: 22px;
    letter-spacing: -0.04em;
  }
`,ii=E.div`
  max-width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`,Q0=E.table`
  width: 100%;
  min-width: 1120px;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 13px;

  @media (max-width: 640px) {
    min-width: 980px;
    font-size: 12px;
  }
`,pa=E.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 780px;
  font-size: 13px;

  th, td {
    border-right: 1px solid ${({theme:e})=>e.colors.border};
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    padding: 10px;
    text-align: left;
  }

  th {
    background: ${({theme:e})=>e.colors.primarySoft};
    font-weight: 900;
  }

  tr:hover td {
    background: ${({theme:e})=>e.colors.surfaceLight};
  }

  @media (max-width: 640px) {
    min-width: 640px;
    font-size: 12px;

    th, td {
      padding: 8px;
    }
  }
`,Me=E.th`
  border-right: 1px solid ${({theme:e})=>e.colors.border};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e,$total:t})=>t?"#FEF9A7":e.mode==="light"?"#CBF7F6":"#183A4A"};
  color: ${({theme:e})=>e.colors.text};
  padding: 9px 8px;
  text-align: center;
  font-weight: 900;
  white-space: nowrap;
`,Y0=E.tr`
  transition: background ${({theme:e})=>e.motion.fast};

  ${({$disabled:e})=>e?`
    select, input {
      color: inherit;
    }
  `:""}
`,ye=E.td`
  border-right: 1px solid ${({theme:e})=>e.colors.border};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e,$total:t,$disabled:n})=>n?e.mode==="light"?"#EFEFEF":"#253044":t?"#FEF9A7":e.colors.surface};
  color: ${({theme:e,$disabled:t})=>t?e.colors.muted:e.colors.text};
  padding: 6px;
  text-align: center;
  white-space: nowrap;

  &:first-child {
    background: ${({$weekend:e,$disabled:t,theme:n})=>t?n.mode==="light"?"#D9D9D9":"#303A4D":e==="sat"?"#2D36FF":e==="sun"?"#FF1111":n.mode==="light"?"#FEF9A7":"#33362A"};
    color: ${({$weekend:e,$disabled:t,theme:n})=>e==="sat"||e==="sun"?"#FFFFFF":t?n.colors.muted:n.colors.text};
    font-weight: 900;
  }
`,li=E.input`
  width: 100%;
  min-width: 82px;
  height: 32px;
  border: 1px solid transparent;
  background: transparent;
  color: ${({theme:e})=>e.colors.text};
  text-align: center;
  border-radius: 10px;
  outline: none;

  &:focus {
    background: ${({theme:e})=>e.colors.surfaceLight};
    border-color: ${({theme:e})=>e.colors.primary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 1;
    color: ${({theme:e})=>e.colors.muted};
  }
`,X0=E.select`
  width: 100%;
  min-width: 150px;
  height: 32px;
  border: 1px solid transparent;
  background: transparent;
  color: ${({theme:e})=>e.colors.text};
  border-radius: 10px;
  outline: none;

  &:focus {
    background: ${({theme:e})=>e.colors.surfaceLight};
    border-color: ${({theme:e})=>e.colors.primary};
  }
`,K0=E.input`
  width: 100%;
  min-width: 210px;
  height: 32px;
  border: 1px solid transparent;
  background: transparent;
  color: ${({theme:e})=>e.colors.text};
  border-radius: 10px;
  padding: 0 8px;
  outline: none;

  &:focus {
    background: ${({theme:e})=>e.colors.surfaceLight};
    border-color: ${({theme:e})=>e.colors.primary};
  }
`,Z0=E.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
`,J0=E.form`
  width: min(100%, 460px);
  border: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e})=>e.colors.surface};
  box-shadow: ${({theme:e})=>e.colors.shadow};
  border-radius: 30px;
  padding: 32px;
  display: grid;
  gap: 16px;

  h1 {
    margin: 0;
    font-size: 34px;
    letter-spacing: -0.06em;
  }

  p {
    margin: 0;
    color: ${({theme:e})=>e.colors.muted};
  }

  @media (max-width: 520px) {
    border-radius: 24px;
    padding: 24px 18px;

    h1 {
      font-size: 30px;
    }
  }
`,q0=E.div`
  width: min(100% - 32px, 1440px);
  margin: 24px auto 80px;
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 22px;
  min-width: 0;

  @media (max-width: 1180px) {
    grid-template-columns: 230px minmax(0, 1fr);
  }

  @media (max-width: 980px) {
    width: min(100% - 24px, 1440px);
    margin: 16px auto 64px;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (max-width: 640px) {
    width: min(100% - 18px, 1440px);
    margin: 12px auto 52px;
  }
`,ex=E.aside`
  position: sticky;
  top: 96px;
  align-self: start;
  min-width: 0;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e})=>e.colors.surface};
  box-shadow: ${({theme:e})=>e.colors.shadow};
  border-radius: 28px;
  padding: 16px;

  @media (max-width: 980px) {
    position: static;
    border-radius: 24px;
    padding: 12px;
    overflow: hidden;
  }

  @media (max-width: 640px) {
    border-radius: 20px;
    padding: 10px;
  }
`,tx=E.div`
  padding: 10px 10px 14px;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  margin-bottom: 12px;

  strong {
    display: block;
    font-size: 15px;
    letter-spacing: -0.02em;
  }

  span {
    display: block;
    margin-top: 3px;
    color: ${({theme:e})=>e.colors.muted};
    font-size: 12px;
    font-weight: 800;
  }

  @media (max-width: 980px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 6px 6px 10px;

    span {
      text-align: right;
    }
  }

  @media (max-width: 640px) {
    display: none;
  }
`,nx=E.nav`
  display: grid;
  gap: 8px;
  min-width: 0;

  @media (max-width: 980px) {
    display: flex;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding-bottom: 2px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`,Vr=E.button`
  width: 100%;
  min-height: 44px;
  border: 1px solid ${({theme:e,$active:t})=>t?e.colors.primary:"transparent"};
  border-radius: 16px;
  background: ${({theme:e,$active:t})=>t?e.colors.primarySoft:"transparent"};
  color: ${({theme:e,$active:t})=>t?e.colors.primary:e.colors.text};
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-weight: 900;
  text-align: left;
  transition: transform ${({theme:e})=>e.motion.fast}, background ${({theme:e})=>e.motion.fast};

  &:hover {
    transform: translateX(3px);
    background: ${({theme:e})=>e.colors.primarySoft};
  }

  span {
    color: ${({theme:e})=>e.colors.muted};
    font-size: 12px;
  }

  @media (max-width: 980px) {
    width: auto;
    flex: 0 0 auto;
    min-width: max-content;
    padding: 0 16px;
    white-space: nowrap;

    &:hover {
      transform: translateY(-2px);
    }
  }

  @media (max-width: 640px) {
    min-height: 40px;
    border-radius: 14px;
    padding: 0 14px;
    font-size: 14px;

    span {
      display: none;
    }
  }
`,rx=E.main`
  min-width: 0;
  max-width: 100%;
  display: grid;
  gap: 18px;

  @media (max-width: 640px) {
    gap: 14px;
  }
`,ox=E.div`
  min-width: 0;
  overflow: hidden;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e})=>e.colors.surface};
  box-shadow: ${({theme:e})=>e.colors.shadow};
  border-radius: 28px;
  padding: 22px 24px;
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
  flex-wrap: wrap;

  h1 {
    margin: 0;
    font-size: clamp(26px, 4vw, 42px);
    letter-spacing: -0.055em;
    line-height: 1.05;
  }

  p {
    margin: 8px 0 0;
    color: ${({theme:e})=>e.colors.muted};
    /* max-width: 760px; */
  }

  @media (max-width: 640px) {
    border-radius: 22px;
    padding: 18px;
    align-items: flex-start;

    h1 {
      font-size: 28px;
    }

    p {
      font-size: 14px;
    }
  }
`,ix=E.div`
  max-width: 100%;
  padding: 10px 14px;
  border-radius: ${({theme:e})=>e.radius.full};
  background: ${({theme:e})=>e.colors.primarySoft};
  color: ${({theme:e})=>e.colors.primary};
  font-size: 13px;
  font-weight: 900;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 640px) {
    width: 100%;
    text-align: center;
  }
`,lx=E.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding-top: 12px;
  color: ${({theme:e})=>e.colors.muted};
  font-size: 13px;
  font-weight: 800;
`,ax=E.div`
  display: flex;
  gap: 8px;
  align-items: center;
  @media (max-width: 520px) {
    width: 100%;
    justify-content: space-between;
  }
`,ai=E.button`
  min-height: 34px;
  min-width: 34px;
  border-radius: 12px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e})=>e.colors.surfaceLight};
  color: ${({theme:e})=>e.colors.text};
  font-weight: 900;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    border-color: ${({theme:e})=>e.colors.primary};
    background: ${({theme:e})=>e.colors.primarySoft};
  }
`,gs="--:--";function id(e){return e||gs}function si(e){return String(e||"").trim()||"-"}function En(e=""){return{employeeNo:e,asOfDate:"",joinDate:"",remainingDays:0,usedDays:0,expiringDays:0,expiringDate:"",grants:[]}}function Yn(){return{employeeNo:"",department:"",name:"",joinDate:"",email:"",status:"active"}}function ui(){return{username:"",displayName:"",role:"viewer",status:"active",password:""}}function sx(e){return e==="superAdmin"||e==="admin"}function ux(e){return e==="superAdmin"||e==="admin"}function fa(e,t,n){const r=Math.max(1,Math.ceil(e.length/n)),i=(Math.min(Math.max(t,1),r)-1)*n,l=e.slice(i,i+n);return{items:l,totalPages:r,start:e.length?i+1:0,end:Math.min(e.length,i+l.length)}}function ma({total:e,page:t,totalPages:n,start:r,end:o,onPageChange:i}){return a.jsxs(lx,{children:[a.jsx("span",{children:e?`${r}-${o} / ${e}`:"0 record"}),a.jsxs(ax,{children:[a.jsx(ai,{type:"button",onClick:()=>i(1),disabled:t<=1,children:"«"}),a.jsx(ai,{type:"button",onClick:()=>i(t-1),disabled:t<=1,children:"‹"}),a.jsxs("span",{children:["Page ",Math.min(t,n)," / ",n]}),a.jsx(ai,{type:"button",onClick:()=>i(t+1),disabled:t>=n,children:"›"}),a.jsx(ai,{type:"button",onClick:()=>i(n),disabled:t>=n,children:"»"})]})]})}function Xn({label:e}){return a.jsxs(R0,{children:[a.jsx(ju,{"aria-hidden":"true"}),e]})}function cx(e){switch(e){case"testing":return"Testing Google Sheets connection...";case"loadingEmployee":return"Loading employee information...";case"loading":return"Loading data from Google Sheets...";case"syncing":return"Syncing data with Google Sheets...";case"savingEmployee":return"Saving employee information...";case"savingUser":return"Saving user information...";default:return""}}function dx({onLogin:e}){const[t,n]=M.useState(""),[r,o]=M.useState(""),[i,l]=M.useState("idle"),[u,s]=M.useState(""),c=Kf("en");async function g(y){y.preventDefault(),l("saving"),s("");try{const f=await Kv(t,r);l("saved"),e(f)}catch(f){l("error"),s(f instanceof Error?f.message:"Login failed.")}}return a.jsx(rm,{children:a.jsx(Z0,{children:a.jsxs(J0,{onSubmit:g,children:[a.jsx(F0,{children:a.jsx(om,{})}),a.jsx(M0,{children:"VIORA ADMIN"}),a.jsx("p",{children:c.loginDescription}),a.jsxs(U,{children:["Username",a.jsx(X,{value:t,onChange:y=>n(y.target.value),autoComplete:"username"})]}),a.jsxs(U,{children:["Password",a.jsx(X,{type:"password",value:r,onChange:y=>o(y.target.value),autoComplete:"current-password"})]}),a.jsx(re,{$primary:!0,type:"submit",disabled:i==="saving",children:i==="saving"?"Signing in...":"Login"}),u&&a.jsx(O0,{$state:i,children:u})]})})})}function px({mode:e,language:t,onModeChange:n,onLanguageChange:r}){const o=Kf(t),i=t==="jp"?"jp":t==="en"?"en":"vi",l=M.useMemo(()=>new Date,[]),[u,s]=M.useState(()=>Jf()),[c,g]=M.useState(l.getFullYear()),[y,f]=M.useState(l.getMonth()+1),[v,x]=M.useState(_v),[S,N]=M.useState(ue),[p,d]=M.useState(()=>Jt(l.getFullYear(),l.getMonth()+1,i)),[h,w]=M.useState(""),[$,k]=M.useState("idle"),[j,T]=M.useState("none"),[z,_]=M.useState([]),[Y,Fe]=M.useState(Yn()),[Re,Kt]=M.useState([]),[Oe,ft]=M.useState(ui()),[ae,b]=M.useState(()=>En()),[P,F]=M.useState("overview"),[V,B]=M.useState(1),[mt,Ue]=M.useState(1),[nt,Ce]=M.useState(1),rt=Xv(),de=M.useMemo(()=>Xf(p),[p]),ht=(u==null?void 0:u.user.role)||"viewer",Z=ux(ht),gt=sx(ht),De=ht==="superAdmin",To=M.useMemo(()=>fa(z,V,8),[z,V]),Po=M.useMemo(()=>fa(Re,mt,8),[Re,mt]),Io=M.useMemo(()=>fa(ae.grants||[],nt,8),[ae.grants,nt]),_t=M.useMemo(()=>!!v.employeeNo&&z.some(m=>m.employeeNo===v.employeeNo),[z,v.employeeNo]),Eu=cx(j),$u={overview:{title:`${o.overviewTimekeeping}`,description:`${o.overviewTimekeepingDescription}`},attendance:{title:`${o.openTimeSheet}`,description:`${o.openTimeSheetDescription}`},leave:{title:`${o.paidLeaveDayTitle}`,description:`${o.paidLeaveDayTitleDescription}`},employees:{title:`${o.employees}`,description:`${o.employeesDescription}`},users:{title:`${o.users}`,description:`${o.usersDescription}`}}[P];if(M.useEffect(()=>{d(m=>sa(m,i))},[i]),M.useEffect(()=>{N(ue),d(Jt(c,y,i)),b(En(v.employeeNo))},[c,y]),M.useEffect(()=>{u&&(bl(),De&&Cu())},[u==null?void 0:u.token]),M.useEffect(()=>{P==="users"&&!De&&F("overview"),P==="employees"&&!gt&&F("overview")},[P,De,gt]),M.useEffect(()=>{B(1)},[z.length]),M.useEffect(()=>{Ue(1)},[Re.length]),M.useEffect(()=>{Ce(1)},[ae.grants.length]),M.useEffect(()=>{if(!h||$!=="saved")return;const m=window.setTimeout(()=>w(""),3e3);return()=>window.clearTimeout(m)},[h,$]),!u)return a.jsx(dx,{onLogin:s});function No(){return{employee:v,year:c,month:y,settings:S,rows:p,summary:de,updatedAt:new Date().toISOString()}}function Dl(m){x({employeeNo:m.employeeNo,name:m.name,department:m.department,joinDate:m.joinDate||"",email:m.email||"",status:m.status||"active"}),Fe(m)}async function im(m){if(!m){x(Yn()),Fe(Yn()),N(ue),d(Jt(c,y,i)),b(En()),w(""),k("idle");return}T("loadingEmployee"),w("");try{const L=await t0(m);Dl(L),N(ue),d(Jt(c,y,i)),b(En(L.employeeNo)),k("saved"),w(o.selectedEmployee)}catch(L){const G=z.find(ge=>ge.employeeNo===m);G?(Dl(G),N(ue),d(Jt(c,y,i)),b(En(G.employeeNo)),k("saved"),w(o.selectedDraft)):(k("error"),w(L instanceof Error?L.message:o.error))}finally{T("none")}}function Wn(m,L){Fe(G=>({...G,[m]:L}))}function Fr(m,L){ft(G=>({...G,[m]:L}))}function yt(m,L){N(G=>{const ge={...G,[m]:L};return d(At=>ua(At,ge)),ge})}function Fo(m,L,G){Z&&d(ge=>ge.map(At=>{if(At.id!==m)return At;if((L==="timecardIn"||L==="timecardOut")&&!hr(At.attendanceType))return nl(At,S);const jn={...At,[L]:G};return L==="attendanceType"&&(hr(G)?(jn.timecardIn=At.timecardIn||S.basicStart,jn.timecardOut=At.timecardOut||S.basicEnd):(jn.timecardIn="",jn.timecardOut="",jn.workStart="",jn.workEnd="")),nl(jn,S)}))}async function bl(){try{const m=await e0();_(m)}catch(m){w(m instanceof Error?m.message:o.error),k("error")}}async function Cu(){try{const m=await o0();Kt(m)}catch(m){w(m instanceof Error?m.message:o.error),k("error")}}function Du(){ca(No()),w(o.savedDraft),k("saved")}async function bu(){k("saving"),T("testing"),w("");try{const m=await Zv();k(m.ok?"saved":"error"),w(m.message)}catch(m){k("error"),w(m instanceof Error?m.message:o.error)}finally{T("none")}}async function Tu(){if(!Z){k("error"),w("This account does not have permission to save attendance.");return}if(!_t){k("error"),w(o.pleaseSelectEmployee);return}const m=No();ca(m),k("saving"),T("syncing"),w("");try{const L=await qv(m);k(L.ok?"saved":"error"),L.leaveSummary&&b(L.leaveSummary),w(L.ok?L.message||o.savedSheet:L.message),bl()}catch(L){k("error"),w(L instanceof Error?L.message:o.error)}finally{T("none")}}async function Pu(){k("saving"),T("loading"),w("");try{if(!_t){w(o.pleaseSelectEmployee),k("error");return}if(!rt){const L=D0(v.employeeNo,c,y);L?(x(L.employee),N(L.settings),d(sa(ua(L.rows,L.settings),i)),w(o.loaded),k("saved")):(w(o.notConfigured),k("error"));return}const m=await Jv(v.employeeNo,c,y);if(!m.payload){m.employee&&x(L=>({...L,...m.employee})),m.leaveSummary&&b(m.leaveSummary),w("No attendance data found for this employee and month. Employee and leave data were loaded if available."),k("saved");return}x(m.payload.employee),N(m.payload.settings),d(sa(ua(m.payload.rows,m.payload.settings),i)),m.leaveSummary&&b(m.leaveSummary),ca(m.payload),w(o.loaded),k("saved")}catch(m){k("error"),w(m instanceof Error?m.message:o.error)}finally{T("none")}}function lm(){Z&&(d(Jt(c,y,i)),w(o.resetDone),k("saved"))}async function am(){if(gt){k("saving"),T("savingEmployee"),w("");try{const m=await n0(Y);_(m.employees||[]),m.employee&&(x(m.employee),Fe(m.employee),N(ue),d(Jt(c,y,i)),b(En(m.employee.employeeNo))),k("saved"),w(m.message||"Employee saved.")}catch(m){k("error"),w(m instanceof Error?m.message:o.error)}finally{T("none")}}}async function sm(){if(!(!gt||!Y.employeeNo)&&window.confirm(`Delete employee ${Y.employeeNo}?`)){k("saving"),T("savingEmployee"),w("");try{const m=Y.employeeNo,L=await r0(m);_(L.employees||[]),Fe(Yn()),v.employeeNo===m&&(x(Yn()),N(ue),d(Jt(c,y,i)),b(En())),k("saved"),w(L.message||"Employee deleted.")}catch(m){k("error"),w(m instanceof Error?m.message:o.error)}finally{T("none")}}}async function um(){if(De){k("saving"),T("savingUser"),w("");try{const m=await i0(Oe);Kt(m.users||[]),ft(ui()),k("saved"),w(m.message||"User saved.")}catch(m){k("error"),w(m instanceof Error?m.message:o.error)}finally{T("none")}}}async function cm(){if(!(!De||!Oe.username)&&window.confirm(`Delete user ${Oe.username}?`)){k("saving"),T("savingUser"),w("");try{const m=await l0(Oe.username);Kt(m.users||[]),ft(ui()),k("saved"),w(m.message||"User deleted.")}catch(m){k("error"),w(m instanceof Error?m.message:o.error)}finally{T("none")}}}function dm(){qf(),s(null)}return a.jsxs(rm,{children:[a.jsx(P0,{children:a.jsxs(I0,{children:[a.jsxs(N0,{href:"/admin","aria-label":"VIORA ADMIN",children:[a.jsx(om,{}),"VIORA ADMIN"]}),a.jsxs(_0,{children:[a.jsxs(A0,{children:[u.user.displayName,a.jsx("span",{children:u.user.role})]}),a.jsxs(rd,{"aria-label":"Theme mode",children:[a.jsx(da,{$active:e==="light",onClick:()=>n("light"),children:"☀"}),a.jsx(da,{$active:e==="dark",onClick:()=>n("dark"),children:"☾"})]}),a.jsx(rd,{"aria-label":"Language",children:Hf.map(m=>a.jsx(da,{$active:t===m.code,onClick:()=>r(m.code),children:m.label},m.code))}),a.jsx(re,{onClick:dm,children:"Logout"})]})]})}),a.jsxs(q0,{children:[a.jsxs(ex,{children:[a.jsxs(tx,{children:[a.jsx("strong",{children:o.adminMenu}),a.jsxs("span",{children:[u.user.role," · ",rt?"API ready":"Not configured"]})]}),a.jsxs(nx,{children:[a.jsxs(Vr,{type:"button",$active:P==="overview",onClick:()=>F("overview"),children:[o.overview," ",a.jsxs("span",{children:[c,"/",String(y).padStart(2,"0")]})]}),a.jsxs(Vr,{type:"button",$active:P==="attendance",onClick:()=>F("attendance"),children:[o.attendance," ",a.jsx("span",{children:p.length})]}),a.jsxs(Vr,{type:"button",$active:P==="leave",onClick:()=>F("leave"),children:[o.paidLeaveDayTitle," ",a.jsxs("span",{children:[ae.remainingDays,"d"]})]}),gt&&a.jsxs(Vr,{type:"button",$active:P==="employees",onClick:()=>F("employees"),children:[o.employees," ",a.jsx("span",{children:z.length})]}),De&&a.jsxs(Vr,{type:"button",$active:P==="users",onClick:()=>F("users"),children:[o.users," ",a.jsx("span",{children:Re.length})]})]})]}),a.jsxs(rx,{children:[a.jsxs(ox,{children:[a.jsxs("div",{children:[a.jsxs(L0,{children:[o.admin," · Google Sheets API"]}),a.jsx("h1",{children:$u.title}),a.jsx("p",{children:$u.description})]}),a.jsx(ix,{children:v.employeeNo||"No employee selected"})]}),P==="overview"&&a.jsxs(a.Fragment,{children:[a.jsxs(z0,{children:[a.jsxs(zt,{children:[a.jsx(qt,{children:o.employee}),a.jsxs(ni,{children:[a.jsxs(U,{children:[o.year,a.jsx(X,{type:"number",min:2020,max:2100,value:c,onChange:m=>g(Number(m.target.value))})]}),a.jsxs(U,{children:[o.month,a.jsx(X,{type:"number",min:1,max:12,value:y,onChange:m=>f(Number(m.target.value))})]}),a.jsxs(U,{children:[o.selectEmployee,a.jsxs(ri,{value:_t?v.employeeNo:"",onChange:m=>void im(m.target.value),disabled:j!=="none",children:[a.jsx("option",{value:"",children:o.selectEmployeesOption}),z.map(m=>a.jsx("option",{value:m.employeeNo,children:m.name},m.employeeNo))]})]}),a.jsxs(U,{children:[o.employeeNo,a.jsx(X,{value:si(v.employeeNo),disabled:!0})]}),a.jsxs(U,{children:[o.department,a.jsx(X,{value:si(v.department),disabled:!0})]}),a.jsxs(U,{children:[o.joinDate,a.jsx(X,{value:si(v.joinDate),disabled:!0})]}),a.jsxs(U,{children:[o.email,a.jsx(X,{value:si(v.email),disabled:!0})]})]})]}),a.jsxs(zt,{children:[a.jsx(qt,{children:o.paidLeaveDayTitle}),a.jsxs(U,{children:[a.jsxs(ke,{children:[a.jsx("span",{children:o.RemainingVacationDays}),a.jsx("strong",{children:ae.remainingDays})]}),a.jsxs(ke,{children:[a.jsx("span",{children:o.UsedVacationDays}),a.jsx("strong",{children:ae.usedDays})]}),a.jsxs(ke,{children:[a.jsx("span",{children:o.ExpiringVacationDays}),a.jsx("strong",{children:ae.expiringDays})]}),a.jsxs(ke,{children:[a.jsx("span",{children:o.ExpirationDate}),a.jsx("strong",{children:ae.expiringDate||"-"})]})]})]})]}),a.jsxs(zt,{children:[a.jsx(qt,{children:o.summary}),a.jsxs(od,{children:[a.jsxs(ke,{children:[a.jsx("span",{children:o.workDays}),a.jsx("strong",{children:de.workDays})]}),a.jsxs(ke,{children:[a.jsx("span",{children:o.absenceDays}),a.jsx("strong",{children:de.absenceDays})]}),a.jsxs(ke,{children:[a.jsx("span",{children:o.paidLeaveDays}),a.jsx("strong",{children:de.paidLeaveDays})]}),a.jsxs(ke,{children:[a.jsx("span",{children:o.compLeaveDays}),a.jsx("strong",{children:de.compensatoryLeaveDays})]}),a.jsxs(ke,{children:[a.jsx("span",{children:o.holidayWorkDays}),a.jsx("strong",{children:de.holidayWorkDays})]}),a.jsxs(ke,{children:[a.jsx("span",{children:o.publicHolidayDays}),a.jsx("strong",{children:de.publicHolidayDays})]}),a.jsxs(ke,{children:[a.jsx("span",{children:o.totalHours}),a.jsx("strong",{children:ot(de.totalMinutes)})]}),a.jsxs(ke,{children:[a.jsx("span",{children:o.overtimeHours}),a.jsx("strong",{children:ot(de.overtimeMinutes)})]}),a.jsxs(ke,{children:[a.jsx("span",{children:o.nightHours}),a.jsx("strong",{children:ot(de.nightMinutes)})]})]})]}),a.jsxs(zt,{children:[a.jsx(qt,{children:o.actions}),a.jsxs(oi,{children:[a.jsx(re,{onClick:Du,children:o.saveDraft}),a.jsx(re,{onClick:bu,disabled:j!=="none",children:j==="testing"?a.jsx(Xn,{label:o.checking}):o.testSheet}),a.jsx(re,{$primary:!0,onClick:Tu,disabled:j!=="none"||!Z||!_t,children:j==="syncing"?a.jsx(Xn,{label:o.syncing}):o.syncSheet}),a.jsx(re,{onClick:Pu,disabled:j!=="none"||!_t,children:j==="loading"?a.jsx(Xn,{label:o.loading}):o.loadSheet}),a.jsx(re,{onClick:()=>nd(No()),disabled:!_t,children:o.exportXlsx}),a.jsx(re,{onClick:()=>F("attendance"),children:o.openTimeSheet})]})]})]}),P==="attendance"&&a.jsxs(a.Fragment,{children:[a.jsxs(zt,{children:[a.jsx(qt,{children:o.settings}),a.jsxs(ni,{children:[a.jsxs(U,{children:[o.basicTime,a.jsx(X,{type:"time",value:S.basicStart,onChange:m=>yt("basicStart",m.target.value),disabled:!Z})]}),a.jsxs(U,{children:[" ",a.jsx(X,{type:"time",value:S.basicEnd,onChange:m=>yt("basicEnd",m.target.value),disabled:!Z})]}),a.jsxs(U,{children:[o.earlyTime,a.jsx(X,{type:"time",value:S.earlyStart,onChange:m=>yt("earlyStart",m.target.value),disabled:!Z})]}),a.jsxs(U,{children:[" ",a.jsx(X,{type:"time",value:S.earlyEnd,onChange:m=>yt("earlyEnd",m.target.value),disabled:!Z})]}),a.jsxs(U,{children:[o.overtime,a.jsx(X,{type:"time",value:S.overtimeStart,onChange:m=>yt("overtimeStart",m.target.value),disabled:!Z})]}),a.jsxs(U,{children:[" ",a.jsx(X,{type:"time",value:S.overtimeEnd,onChange:m=>yt("overtimeEnd",m.target.value),disabled:!Z})]}),a.jsxs(U,{children:[o.nightTime,a.jsx(X,{type:"time",value:S.nightStart,onChange:m=>yt("nightStart",m.target.value),disabled:!Z})]}),a.jsxs(U,{children:[" ",a.jsx(X,{type:"time",value:S.nightEnd,onChange:m=>yt("nightEnd",m.target.value),disabled:!Z})]}),a.jsxs(U,{children:[o.breakMinutes," (",o.minutes,")",a.jsx(X,{type:"number",min:0,value:S.breakMinutes,onChange:m=>yt("breakMinutes",Number(m.target.value)),disabled:!Z})]}),a.jsxs(U,{children:[o.startRound," (",o.minutes,")",a.jsx(X,{type:"number",min:0,value:S.startRoundMinutes,onChange:m=>yt("startRoundMinutes",Number(m.target.value)),disabled:!Z})]}),a.jsxs(U,{children:[o.endRound," (",o.minutes,")",a.jsx(X,{type:"number",min:0,value:S.endRoundMinutes,onChange:m=>yt("endRoundMinutes",Number(m.target.value)),disabled:!Z})]})]}),a.jsxs(oi,{children:[a.jsx(re,{onClick:Du,children:o.saveDraft}),a.jsx(re,{onClick:bu,disabled:j!=="none",children:j==="testing"?a.jsx(Xn,{label:o.checking}):o.testSheet}),a.jsx(re,{$primary:!0,onClick:Tu,disabled:j!=="none"||!Z||!_t,children:j==="syncing"?a.jsx(Xn,{label:o.syncing}):o.syncSheet}),a.jsx(re,{onClick:Pu,disabled:j!=="none"||!_t,children:j==="loading"?a.jsx(Xn,{label:o.loading}):o.loadSheet}),a.jsx(re,{onClick:lm,disabled:!Z,children:o.resetMonth}),a.jsx(re,{onClick:()=>nd(No()),disabled:!_t,children:o.exportXlsx})]})]}),a.jsxs(W0,{children:[a.jsxs(G0,{children:[a.jsxs("h2",{children:[c,"/",String(y).padStart(2,"0")," - ",o.attendanceManagementSheet]}),a.jsxs("span",{children:[v.employeeNo," · ",v.name]})]}),a.jsx(ii,{children:a.jsxs(Q0,{children:[a.jsxs("thead",{children:[a.jsxs("tr",{children:[a.jsx(Me,{rowSpan:2,children:o.cols.day}),a.jsx(Me,{rowSpan:2,children:o.cols.weekday}),a.jsx(Me,{rowSpan:2,children:o.cols.type}),a.jsx(Me,{colSpan:2,children:o.cols.timecard}),a.jsx(Me,{colSpan:2,children:o.cols.workTime}),a.jsx(Me,{colSpan:4,$total:!0,children:o.cols.working}),a.jsx(Me,{rowSpan:2,children:o.cols.note})]}),a.jsxs("tr",{children:[a.jsx(Me,{children:o.cols.in}),a.jsx(Me,{children:o.cols.out}),a.jsx(Me,{children:o.cols.start}),a.jsx(Me,{children:o.cols.end}),a.jsx(Me,{$total:!0,children:o.cols.basic}),a.jsx(Me,{$total:!0,children:o.cols.over}),a.jsx(Me,{$total:!0,children:o.cols.night}),a.jsx(Me,{$total:!0,children:o.cols.total})]})]}),a.jsxs("tbody",{children:[p.map(m=>{const L=Uv(m.date),G=hr(m.attendanceType);return a.jsxs(Y0,{$disabled:!G,children:[a.jsx(ye,{$weekend:L,$disabled:!G,children:m.day}),a.jsx(ye,{$disabled:!G,children:m.weekday}),a.jsx(ye,{$disabled:!G,children:a.jsx(X0,{value:m.attendanceType,onChange:ge=>Fo(m.id,"attendanceType",ge.target.value),disabled:!Z,children:Gf.map(ge=>a.jsx("option",{value:ge.value,children:Qf(ge.value,t)},ge.value||"none"))})}),a.jsx(ye,{$disabled:!G,children:G?a.jsx(li,{type:"time",value:m.timecardIn,onChange:ge=>Fo(m.id,"timecardIn",ge.target.value),disabled:!Z}):a.jsx(li,{type:"text",value:gs,disabled:!0,readOnly:!0})}),a.jsx(ye,{$disabled:!G,children:G?a.jsx(li,{type:"time",value:m.timecardOut,onChange:ge=>Fo(m.id,"timecardOut",ge.target.value),disabled:!Z}):a.jsx(li,{type:"text",value:gs,disabled:!0,readOnly:!0})}),a.jsx(ye,{$disabled:!G,children:id(m.workStart)}),a.jsx(ye,{$disabled:!G,children:id(m.workEnd)}),a.jsx(ye,{$total:!0,$disabled:!G,children:ot(m.basicMinutes)}),a.jsx(ye,{$total:!0,$disabled:!G,children:ot(m.overtimeMinutes)}),a.jsx(ye,{$total:!0,$disabled:!G,children:ot(m.nightMinutes)}),a.jsx(ye,{$total:!0,$disabled:!G,children:ot(m.totalMinutes)}),a.jsx(ye,{$disabled:!G,children:a.jsx(K0,{value:m.note,onChange:ge=>Fo(m.id,"note",ge.target.value),disabled:!Z})})]},m.id)}),a.jsxs("tr",{children:[a.jsx(ye,{$weekend:"weekday",colSpan:7,children:o.total}),a.jsx(ye,{$total:!0,children:a.jsx("strong",{children:ot(de.basicMinutes)})}),a.jsx(ye,{$total:!0,children:a.jsx("strong",{children:ot(de.overtimeMinutes)})}),a.jsx(ye,{$total:!0,children:a.jsx("strong",{children:ot(de.nightMinutes)})}),a.jsx(ye,{$total:!0,children:a.jsx("strong",{children:ot(de.totalMinutes)})}),a.jsx(ye,{})]})]})]})})]})]}),P==="leave"&&a.jsxs(zt,{children:[a.jsx(qt,{children:o.paidLeaveDayManagement}),a.jsxs(od,{style:{marginTop:16},children:[a.jsxs(ke,{children:[a.jsx("span",{children:o.RemainingVacationDays}),a.jsx("strong",{children:ae.remainingDays})]}),a.jsxs(ke,{children:[a.jsx("span",{children:o.UsedVacationDays}),a.jsx("strong",{children:ae.usedDays})]}),a.jsxs(ke,{children:[a.jsx("span",{children:o.ExpiringVacationDays}),a.jsx("strong",{children:ae.expiringDays})]}),a.jsxs(ke,{children:[a.jsx("span",{children:o.ExpirationDate}),a.jsx("strong",{children:ae.expiringDate||"-"})]})]}),a.jsx(ii,{style:{marginTop:16},children:a.jsxs(pa,{children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:o.grantDate}),a.jsx("th",{children:o.grantedDays}),a.jsx("th",{children:o.usedDays}),a.jsx("th",{children:o.remainingDays}),a.jsx("th",{children:o.expirationDate}),a.jsx("th",{children:o.status})]})}),a.jsxs("tbody",{children:[Io.items.map(m=>a.jsxs("tr",{children:[a.jsx("td",{children:m.grantDate}),a.jsxs("td",{children:[m.grantedDays,"日"]}),a.jsxs("td",{children:[m.usedDays,"日"]}),a.jsxs("td",{children:[m.remainingDays,"日"]}),a.jsx("td",{children:m.expiresAt}),a.jsx("td",{children:m.status||(m.isExpired?"expired":"active")})]},m.grantDate)),!ae.grants.length&&a.jsx("tr",{children:a.jsx("td",{colSpan:6,children:o.noDataPaidLeave})})]})]})}),a.jsx(ma,{total:ae.grants.length,page:nt,totalPages:Io.totalPages,start:Io.start,end:Io.end,onPageChange:Ce})]}),P==="employees"&&gt&&a.jsxs(zt,{children:[a.jsx(qt,{children:o.addEmployee}),a.jsxs(ni,{children:[a.jsxs(U,{children:[o.employeeNo,a.jsx(X,{value:Y.employeeNo,onChange:m=>Wn("employeeNo",m.target.value)})]}),a.jsxs(U,{children:[o.employeeName,a.jsx(X,{value:Y.name,onChange:m=>Wn("name",m.target.value)})]}),a.jsxs(U,{children:[o.department,a.jsx(X,{value:Y.department,onChange:m=>Wn("department",m.target.value)})]}),a.jsxs(U,{children:[o.joinDate,a.jsx(X,{type:"date",value:Y.joinDate||"",onChange:m=>Wn("joinDate",m.target.value)})]}),a.jsxs(U,{children:[o.email,a.jsx(X,{value:Y.email||"",onChange:m=>Wn("email",m.target.value)})]}),a.jsxs(U,{children:[o.status,a.jsxs(ri,{value:Y.status||"active",onChange:m=>Wn("status",m.target.value),children:[a.jsx("option",{value:"active",children:"Active"}),a.jsx("option",{value:"inactive",children:"Inactive"})]})]})]}),a.jsxs(oi,{children:[a.jsx(re,{onClick:()=>Fe(Yn()),children:o.newEmployee}),a.jsx(re,{$primary:!0,onClick:am,disabled:$==="saving",children:o.saveEmployee}),a.jsx(re,{$danger:!0,onClick:sm,disabled:$==="saving"||!Y.employeeNo,children:o.deleteEmployee}),a.jsx(re,{onClick:()=>Dl(Y),disabled:!Y.employeeNo,children:o.applyEmployeeProfile}),a.jsx(re,{onClick:bl,children:o.refreshEmployees})]}),a.jsx(ii,{style:{marginTop:16},children:a.jsxs(pa,{children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:o.employeeNo}),a.jsx("th",{children:o.employeeName}),a.jsx("th",{children:o.department}),a.jsx("th",{children:o.joinDate}),a.jsx("th",{children:o.email}),a.jsx("th",{children:o.status})]})}),a.jsxs("tbody",{children:[To.items.map(m=>a.jsxs("tr",{onClick:()=>Fe(m),children:[a.jsx("td",{children:m.employeeNo}),a.jsx("td",{children:m.name}),a.jsx("td",{children:m.department}),a.jsx("td",{children:m.joinDate||"-"}),a.jsx("td",{children:m.email||"-"}),a.jsx("td",{children:m.status||"active"})]},m.employeeNo)),!z.length&&a.jsx("tr",{children:a.jsx("td",{colSpan:6,children:o.noEmployees})})]})]})}),a.jsx(ma,{total:z.length,page:V,totalPages:To.totalPages,start:To.start,end:To.end,onPageChange:B})]}),P==="users"&&De&&a.jsxs(zt,{children:[a.jsx(qt,{children:o.permission}),a.jsxs(ni,{style:{marginTop:16},children:[a.jsxs(U,{children:[o.username,a.jsx(X,{value:Oe.username,onChange:m=>Fr("username",m.target.value)})]}),a.jsxs(U,{children:[o.displayName,a.jsx(X,{value:Oe.displayName,onChange:m=>Fr("displayName",m.target.value)})]}),a.jsxs(U,{children:[o.role,a.jsxs(ri,{value:Oe.role,onChange:m=>Fr("role",m.target.value),children:[a.jsx("option",{value:"superAdmin",children:"superAdmin"}),a.jsx("option",{value:"admin",children:"admin"}),a.jsx("option",{value:"viewer",children:"viewer"})]})]}),a.jsxs(U,{children:[o.status,a.jsxs(ri,{value:Oe.status,onChange:m=>Fr("status",m.target.value),children:[a.jsx("option",{value:"active",children:"active"}),a.jsx("option",{value:"inactive",children:"inactive"})]})]}),a.jsxs(U,{children:[o.password,a.jsx(X,{type:"password",value:Oe.password||"",onChange:m=>Fr("password",m.target.value)})]})]}),a.jsxs(oi,{children:[a.jsx(re,{onClick:()=>ft(ui()),children:o.newUser}),a.jsx(re,{$primary:!0,onClick:um,disabled:$==="saving",children:o.saveUser}),a.jsx(re,{$danger:!0,onClick:cm,disabled:$==="saving"||!Oe.username,children:o.deleteUser}),a.jsx(re,{onClick:Cu,children:o.refreshUsers})]}),a.jsx(ii,{style:{marginTop:16},children:a.jsxs(pa,{children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:o.username}),a.jsx("th",{children:o.displayName}),a.jsx("th",{children:o.role}),a.jsx("th",{children:o.status}),a.jsx("th",{children:o.updatedAt})]})}),a.jsxs("tbody",{children:[Po.items.map(m=>a.jsxs("tr",{onClick:()=>ft({...m,password:""}),children:[a.jsx("td",{children:m.username}),a.jsx("td",{children:m.displayName}),a.jsx("td",{children:m.role}),a.jsx("td",{children:m.status}),a.jsx("td",{children:m.updatedAt||"-"})]},m.username)),!Re.length&&a.jsx("tr",{children:a.jsx("td",{colSpan:5,children:o.noUsers})})]})]})}),a.jsx(ma,{total:Re.length,page:mt,totalPages:Po.totalPages,start:Po.start,end:Po.end,onPageChange:Ue})]})]})]}),j!=="none"&&a.jsx(B0,{role:"status","aria-live":"polite","aria-label":Eu||"Loading",children:a.jsxs(H0,{children:[a.jsx(ju,{"aria-hidden":"true"}),a.jsx("strong",{children:Eu||o.processing}),a.jsx("span",{children:o.wait})]})}),h&&$!=="saving"&&a.jsxs(U0,{$state:$==="error"?"error":"saved",role:"status","aria-live":"polite",children:[a.jsx("span",{children:h}),a.jsx(V0,{type:"button","aria-label":"Close message",onClick:()=>w(""),children:"×"})]})]})}function fx({mode:e,language:t,onModeChange:n,onLanguageChange:r}){const o=Oy[t],[i,l]=M.useState(()=>window.location.pathname);return M.useEffect(()=>{const u=()=>l(window.location.pathname);return window.addEventListener("popstate",u),()=>window.removeEventListener("popstate",u)},[]),i.startsWith("/admin")?a.jsx(px,{mode:e,language:t,onModeChange:n,onLanguageChange:r}):a.jsxs(a.Fragment,{children:[a.jsx(Qy,{t:o.nav,mode:e,language:t,onModeChange:n,onLanguageChange:r}),a.jsxs("main",{children:[a.jsx(fv,{t:o.hero}),a.jsx(wv,{t:o.services}),a.jsx(jv,{t:o.process}),a.jsx(bv,{t:o.capabilities}),a.jsx(Mv,{t:o.contact,language:t})]}),a.jsx(Zy,{t:o.footer,language:t})]})}const mx=Hn`
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(18px, -16px, 0); }
`,hx=Ry`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: ${({theme:e})=>e.colors.background};
    color: ${({theme:e})=>e.colors.text};
    line-height: 1.6;
    transition: background ${({theme:e})=>e.motion.medium}, color ${({theme:e})=>e.motion.medium};
  }

  body::before,
  body::after {
    content: '';
    position: fixed;
    z-index: -1;
    pointer-events: none;
    border-radius: 999px;
    opacity: ${({theme:e})=>e.mode==="light"?.45:.28};
    animation: ${mx} 10s ease-in-out infinite;
  }

  body::before {
    width: 420px;
    height: 420px;
    left: -120px;
    top: 80px;
    background: ${({theme:e})=>e.colors.primarySoft};
  }

  body::after {
    width: 360px;
    height: 360px;
    right: -120px;
    top: 18vh;
    background: ${({theme:e})=>e.colors.accentSoft};
    animation-delay: -4s;
  }

  html::before {
    content: 'VIORA';
    position: fixed;
    top: 40%;
    left: 55%;
    transform: translateX(-50%);
    z-index: -2;
    pointer-events: none;
    font-size: 20vw;
    font-weight: 900;
    letter-spacing: 1vw;
    color: ${({theme:e})=>e.colors.accentSoft};
    opacity: ${({theme:e})=>e.mode==="light"?.25:.2};
    white-space: nowrap;
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }  

  a {
    color: inherit;
    text-decoration: none;
  }

  button, input, textarea {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  img, svg {
    display: block;
    max-width: 100%;
  }

  ::selection {
    background: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.white};
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 1ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 1ms !important;
    }
  }
`,gx={light:{background:"#F6F8FC",backgroundSoft:"#EEF3FA",surface:"#FFFFFF",surfaceLight:"#F8FBFF",elevated:"#FFFFFF",text:"#101827",muted:"#667085",border:"rgba(16, 24, 39, 0.12)",primary:"#2457D6",primarySoft:"rgba(36, 87, 214, 0.10)",accent:"#0E7490",accentSoft:"rgba(14, 116, 144, 0.10)",white:"#FFFFFF",shadow:"0 24px 70px rgba(16, 24, 39, 0.10)"},dark:{background:"#0B1020",backgroundSoft:"#11182A",surface:"#141C2F",surfaceLight:"#1A2438",elevated:"#111A2E",text:"#F8FAFC",muted:"#A7B0C5",border:"rgba(255,255,255,0.12)",primary:"#7AA2FF",primarySoft:"rgba(122, 162, 255, 0.14)",accent:"#67E8F9",accentSoft:"rgba(103, 232, 249, 0.12)",white:"#FFFFFF",shadow:"0 24px 70px rgba(0, 0, 0, 0.35)"}},yx=e=>({mode:e,colors:gx[e],radius:{sm:"12px",md:"18px",lg:"28px",full:"999px"},layout:{maxWidth:"1180px"},motion:{fast:"180ms ease",medium:"320ms ease"}});function vx(){const[e,t]=M.useState("light"),[n,r]=M.useState("vi"),o=M.useMemo(()=>yx(e),[e]);return a.jsxs(Ay,{theme:o,children:[a.jsx(hx,{}),a.jsx(fx,{mode:e,language:n,onModeChange:t,onLanguageChange:r})]})}ha.createRoot(document.getElementById("root")).render(a.jsx(at.StrictMode,{children:a.jsx(vx,{})}));
