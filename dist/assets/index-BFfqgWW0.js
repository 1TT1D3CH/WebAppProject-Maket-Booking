(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();/**
* @vue/shared v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function iu(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Be={},Ws=[],xn=()=>{},jp=()=>!1,Ha=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),Wa=t=>t.startsWith("onUpdate:"),mt=Object.assign,ou=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},m_=Object.prototype.hasOwnProperty,Le=(t,e)=>m_.call(t,e),ae=Array.isArray,ms=t=>Zi(t)==="[object Map]",er=t=>Zi(t)==="[object Set]",Eh=t=>Zi(t)==="[object Date]",be=t=>typeof t=="function",Ke=t=>typeof t=="string",sn=t=>typeof t=="symbol",Fe=t=>t!==null&&typeof t=="object",Bp=t=>(Fe(t)||be(t))&&be(t.then)&&be(t.catch),zp=Object.prototype.toString,Zi=t=>zp.call(t),y_=t=>Zi(t).slice(8,-1),qp=t=>Zi(t)==="[object Object]",Ka=t=>Ke(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,_i=iu(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ga=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},__=/-\w/g,Ut=Ga(t=>t.replace(__,e=>e.slice(1).toUpperCase())),v_=/\B([A-Z])/g,lr=Ga(t=>t.replace(v_,"-$1").toLowerCase()),Qa=Ga(t=>t.charAt(0).toUpperCase()+t.slice(1)),Ql=Ga(t=>t?`on${Qa(t)}`:""),wn=(t,e)=>!Object.is(t,e),Qo=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},Hp=(t,e,n,s=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:s,value:n})},Ya=t=>{const e=parseFloat(t);return isNaN(e)?t:e},b_=t=>{const e=Ke(t)?Number(t):NaN;return isNaN(e)?t:e};let kh;const Ja=()=>kh||(kh=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function tt(t){if(ae(t)){const e={};for(let n=0;n<t.length;n++){const s=t[n],r=Ke(s)?T_(s):tt(s);if(r)for(const i in r)e[i]=r[i]}return e}else if(Ke(t)||Fe(t))return t}const w_=/;(?![^(]*\))/g,x_=/:([^]+)/,I_=/"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;function T_(t){const e={};return t.replace(I_,n=>n.startsWith("/*")?"":n).split(w_).forEach(n=>{if(n){const s=n.split(x_);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function xe(t){let e="";if(Ke(t))e=t;else if(ae(t))for(let n=0;n<t.length;n++){const s=xe(t[n]);s&&(e+=s+" ")}else if(Fe(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const E_="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",k_=iu(E_);function Wp(t){return!!t||t===""}function A_(t,e,n){if(t.length!==e.length)return!1;let s=!0;for(let r=0;s&&r<t.length;r++)s=ws(t[r],e[r],n);return s}function Ah(t,e,n){if(t.size!==e.size)return!1;const s=Array.from(e),r=new Uint8Array(s.length);for(const i of t){let o=-1;for(let l=0;l<s.length;l++)if(!r[l]&&ws(i,s[l],n)){o=l;break}if(o<0)return!1;r[o]=1}return!0}function S_(t,e,n){let s=ms(t),r=ms(e);if(s||r||(s=er(t),r=er(e),s||r))return s&&r?Ah(t,e,n):!1;const i=Object.keys(t).length,o=Object.keys(e).length;if(i!==o)return!1;for(const l in t){const c=t.hasOwnProperty(l),u=e.hasOwnProperty(l);if(c&&!u||!c&&u||!ws(t[l],e[l],n))return!1}return String(t)===String(e)}function Sh(t,e,n,s){n||(n=[new Map,new Map]);const[r,i]=n;if(r.has(t)||i.has(e))return r.get(t)===e&&i.get(e)===t;r.set(t,e),i.set(e,t);const o=s(t,e,n);return r.delete(t),i.delete(e),o}function ws(t,e,n){if(t===e)return!0;let s=Eh(t),r=Eh(e);return s||r?s&&r?t.getTime()===e.getTime():!1:(s=sn(t),r=sn(e),s||r?t===e:(s=ae(t),r=ae(e),s||r?s&&r?Sh(t,e,n,A_):!1:(s=Fe(t),r=Fe(e),s||r?!s||!r?!1:Sh(t,e,n,S_):String(t)===String(e))))}function C_(t,e){return t.findIndex(n=>ws(n,e))}const Kp=t=>!!(t&&t.__v_isRef===!0),F=t=>Ke(t)?t:t==null?"":ae(t)||Fe(t)&&(t.toString===zp||!be(t.toString))?Kp(t)?F(t.value):JSON.stringify(t,Gp,2):String(t),Gp=(t,e)=>Kp(e)?Gp(t,e.value):ms(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[s,r],i)=>(n[Yl(s,i)+" =>"]=r,n),{})}:er(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>Yl(n))}:sn(e)?Yl(e):Fe(e)&&!ae(e)&&!qp(e)?String(e):e,Yl=(t,e="")=>{var n;return sn(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ut;class Qp{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&ut&&(ut.active?(this.parent=ut,this.index=(ut.scopes||(ut.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes){const s=this.scopes.slice();for(e=0,n=s.length;e<n;e++)s[e].pause()}for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes){const r=this.scopes.slice();for(e=0,n=r.length;e<n;e++)r[e].resume()}const s=this.effects.slice();for(e=0,n=s.length;e<n;e++)s[e].resume()}}run(e){if(this._active){const n=ut;try{return ut=this,e()}finally{ut=n}}}on(){++this._on===1&&(this.prevScope=ut,ut=this)}off(){if(this._on>0&&--this._on===0){if(ut===this)ut=this.prevScope;else{let e=ut;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){const r=this.scopes.slice();for(n=0,s=r.length;n<s;n++)r[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function Yp(t){return new Qp(t)}function Jp(){return ut}function R_(t,e=!1){ut&&ut.cleanups.push(t)}let ze;const Jl=new WeakSet;class Xp{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,ut&&(ut.active?ut.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Jl.has(this)&&(Jl.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||eg(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Ch(this),tg(this);const e=ze,n=hn;ze=this,hn=!0;try{return this.fn()}finally{ng(this),ze=e,hn=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)cu(e);this.deps=this.depsTail=void 0,Ch(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Jl.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){xc(this)&&this.run()}get dirty(){return xc(this)}}let Zp=0,vi,bi;function eg(t,e=!1){if(t.flags|=8,e){t.next=bi,bi=t;return}t.next=vi,vi=t}function au(){Zp++}function lu(){if(--Zp>0)return;if(bi){let e=bi;for(bi=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;vi;){let e=vi;for(vi=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(s){t||(t=s)}e=n}}if(t)throw t}function tg(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function ng(t){let e,n=t.depsTail,s=n;for(;s;){const r=s.prevDep;s.version===-1?(s===n&&(n=r),cu(s),P_(s)):e=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=r}t.deps=e,t.depsTail=n}function xc(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(sg(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function sg(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===Ni)||(t.globalVersion=Ni,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!xc(t))))return;t.flags|=2;const e=t.dep,n=ze,s=hn;ze=t,hn=!0;try{tg(t);const r=t.fn(t._value);(e.version===0||wn(r,t._value))&&(t.flags|=128,t._value=r,e.version++)}catch(r){throw e.version++,r}finally{ze=n,hn=s,ng(t),t.flags&=-3}}function cu(t,e=!1){const{dep:n,prevSub:s,nextSub:r}=t;if(s&&(s.nextSub=r,t.prevSub=void 0),r&&(r.prevSub=s,t.nextSub=void 0),n.subs===t&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)cu(i,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function P_(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let hn=!0;const rg=[];function Gn(){rg.push(hn),hn=!1}function Qn(){const t=rg.pop();hn=t===void 0?!0:t}function Ch(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=ze;ze=void 0;try{e()}finally{ze=n}}}let Ni=0;class M_{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class uu{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!ze||!hn||ze===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==ze)n=this.activeLink=new M_(ze,this),ze.deps?(n.prevDep=ze.depsTail,ze.depsTail.nextDep=n,ze.depsTail=n):ze.deps=ze.depsTail=n,ig(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=ze.depsTail,n.nextDep=void 0,ze.depsTail.nextDep=n,ze.depsTail=n,ze.deps===n&&(ze.deps=s)}return n}trigger(e){this.version++,Ni++,this.notify(e)}notify(e){au();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{lu()}}}function ig(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let s=e.deps;s;s=s.nextDep)ig(s)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const aa=new WeakMap,Ys=Symbol(""),Ic=Symbol(""),Di=Symbol("");function Ct(t,e,n){if(hn&&ze){let s=aa.get(t);s||aa.set(t,s=new Map);let r=s.get(n);r||(s.set(n,r=new uu),r.map=s,r.key=n),r.track()}}function zn(t,e,n,s,r,i){const o=aa.get(t);if(!o){Ni++;return}const l=c=>{c&&c.trigger()};if(au(),e==="clear")o.forEach(l);else{const c=ae(t),u=c&&Ka(n);if(c&&n==="length"){const h=Number(s);o.forEach((g,y)=>{(y==="length"||y===Di||!sn(y)&&y>=h)&&l(g)})}else switch((n!==void 0||o.has(void 0))&&l(o.get(n)),u&&l(o.get(Di)),e){case"add":c?u&&l(o.get("length")):(l(o.get(Ys)),ms(t)&&l(o.get(Ic)));break;case"delete":c||(l(o.get(Ys)),ms(t)&&l(o.get(Ic)));break;case"set":ms(t)&&l(o.get(Ys));break}}lu()}function O_(t,e){const n=aa.get(t);return n&&n.get(e)}function _r(t){const e=Pe(t);return e===t||(Ct(e,"iterate",Di),Qt(t))?e:Rn(t)?In(t)?e.map(n=>xs(rn(n))):e.map(xs):e.map(rn)}function Xa(t){return Ct(t=Pe(t),"iterate",Di),t}function vn(t,e){return Rn(t)?xs(In(t)?rn(e):e):rn(e)}const N_={__proto__:null,[Symbol.iterator](){return Xl(this,Symbol.iterator,t=>vn(this,t))},concat(...t){return _r(this).concat(...t.map(e=>ae(e)?_r(e):e))},entries(){return Xl(this,"entries",t=>(t[1]=vn(this,t[1]),t))},every(t,e){return Fn(this,"every",t,e,void 0,arguments)},filter(t,e){return Fn(this,"filter",t,e,n=>n.map(s=>vn(this,s)),arguments)},find(t,e){return Fn(this,"find",t,e,n=>vn(this,n),arguments)},findIndex(t,e){return Fn(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return Fn(this,"findLast",t,e,n=>vn(this,n),arguments)},findLastIndex(t,e){return Fn(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return Fn(this,"forEach",t,e,void 0,arguments)},includes(...t){return Zl(this,"includes",t)},indexOf(...t){return Zl(this,"indexOf",t)},join(t){return _r(this).join(t)},lastIndexOf(...t){return Zl(this,"lastIndexOf",t)},map(t,e){return Fn(this,"map",t,e,void 0,arguments)},pop(){return ai(this,"pop")},push(...t){return ai(this,"push",t)},reduce(t,...e){return Rh(this,"reduce",t,e)},reduceRight(t,...e){return Rh(this,"reduceRight",t,e)},shift(){return ai(this,"shift")},some(t,e){return Fn(this,"some",t,e,void 0,arguments)},splice(...t){return ai(this,"splice",t)},toReversed(){return _r(this).toReversed()},toSorted(t){return _r(this).toSorted(t)},toSpliced(...t){return _r(this).toSpliced(...t)},unshift(...t){return ai(this,"unshift",t)},values(){return Xl(this,"values",t=>vn(this,t))}};function Xl(t,e,n){const s=Xa(t),r=s[e]();return s!==t&&!Qt(t)&&(r._next=r.next,r.next=()=>{const i=r._next();return i.done||(i.value=n(i.value)),i}),r}const D_=Array.prototype;function Fn(t,e,n,s,r,i){const o=Xa(t),l=o!==t&&!Qt(t),c=o[e];if(c!==D_[e]){const g=c.apply(t,i);return l?rn(g):g}let u=n;o!==t&&(l?u=function(g,y){return n.call(this,vn(t,g),y,t)}:n.length>2&&(u=function(g,y){return n.call(this,g,y,t)}));const h=c.call(o,u,s);return l&&r?r(h):h}function Rh(t,e,n,s){const r=Xa(t),i=r!==t&&!Qt(t);let o=n,l=!1;r!==t&&(i?(l=s.length===0,o=function(u,h,g){return l&&(l=!1,u=vn(t,u)),n.call(this,u,vn(t,h),g,t)}):n.length>3&&(o=function(u,h,g){return n.call(this,u,h,g,t)}));const c=r[e](o,...s);return l?vn(t,c):c}function Zl(t,e,n){const s=Pe(t);Ct(s,"iterate",Di);const r=s[e](...n);return(r===-1||r===!1)&&Za(n[0])?(n[0]=Pe(n[0]),s[e](...n)):r}function ai(t,e,n=[]){Gn(),au();const s=Pe(t)[e].apply(t,n);return lu(),Qn(),s}const V_=iu("__proto__,__v_isRef,__isVue"),og=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(sn));function L_(t){sn(t)||(t=String(t));const e=Pe(this);return Ct(e,"has",t),e.hasOwnProperty(t)}class ag{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,s){if(n==="__v_skip")return e.__v_skip;const r=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return i;if(n==="__v_raw")return s===(r?i?K_:dg:i?ug:cg).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const o=ae(e);if(!r){let c;if(o&&(c=N_[n]))return c;if(n==="hasOwnProperty")return L_}const l=Reflect.get(e,n,nt(e)?e:s);if((sn(n)?og.has(n):V_(n))||(r||Ct(e,"get",n),i))return l;if(nt(l)){const c=o&&Ka(n)?l:l.value;return r&&Fe(c)?Ec(c):c}return Fe(l)?r?Ec(l):eo(l):l}}class lg extends ag{constructor(e=!1){super(!1,e)}set(e,n,s,r){let i=e[n];const o=ae(e)&&Ka(n);if(!this._isShallow){const u=Rn(i);if(!Qt(s)&&!Rn(s)&&(i=Pe(i),s=Pe(s)),!o&&nt(i)&&!nt(s))return u||(i.value=s),!0}const l=o?Number(n)<e.length:Le(e,n),c=Reflect.set(e,n,s,nt(e)?e:r);return e===Pe(r)&&c&&(l?wn(s,i)&&zn(e,"set",n,s):zn(e,"add",n,s)),c}deleteProperty(e,n){const s=Le(e,n);e[n];const r=Reflect.deleteProperty(e,n);return r&&s&&zn(e,"delete",n,void 0),r}has(e,n){const s=Reflect.has(e,n);return(!sn(n)||!og.has(n))&&Ct(e,"has",n),s}ownKeys(e){return Ct(e,"iterate",ae(e)?"length":Ys),Reflect.ownKeys(e)}}class F_ extends ag{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const $_=new lg,U_=new F_,j_=new lg(!0);const Tc=t=>t,Fo=t=>Reflect.getPrototypeOf(t);function B_(t,e,n){return function(...s){const r=this.__v_raw,i=Pe(r),o=ms(i),l=t==="entries"||t===Symbol.iterator&&o,c=t==="keys"&&o,u=r[t](...s),h=n?Tc:e?xs:rn;return!e&&Ct(i,"iterate",c?Ic:Ys),mt(Object.create(u),{next(){const{value:g,done:y}=u.next();return y?{value:g,done:y}:{value:l?[h(g[0]),h(g[1])]:h(g),done:y}}})}}function $o(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function z_(t,e){const n={get(r){const i=this.__v_raw,o=Pe(i),l=Pe(r);t||(wn(r,l)&&Ct(o,"get",r),Ct(o,"get",l));const{has:c}=Fo(o),u=e?Tc:t?xs:rn;if(c.call(o,r))return u(i.get(r));if(c.call(o,l))return u(i.get(l));i!==o&&i.get(r)},get size(){const r=this.__v_raw;return!t&&Ct(Pe(r),"iterate",Ys),r.size},has(r){const i=this.__v_raw,o=Pe(i),l=Pe(r);return t||(wn(r,l)&&Ct(o,"has",r),Ct(o,"has",l)),r===l?i.has(r):i.has(r)||i.has(l)},forEach(r,i){const o=this,l=o.__v_raw,c=Pe(l),u=e?Tc:t?xs:rn;return!t&&Ct(c,"iterate",Ys),l.forEach((h,g)=>r.call(i,u(h),u(g),o))}};return mt(n,t?{add:$o("add"),set:$o("set"),delete:$o("delete"),clear:$o("clear")}:{add(r){const i=Pe(this),o=Fo(i),l=Pe(r),c=!e&&!Qt(r)&&!Rn(r)?l:r;return o.has.call(i,c)||wn(r,c)&&o.has.call(i,r)||wn(l,c)&&o.has.call(i,l)||(i.add(c),zn(i,"add",c,c)),this},set(r,i){!e&&!Qt(i)&&!Rn(i)&&(i=Pe(i));const o=Pe(this),{has:l,get:c}=Fo(o);let u=l.call(o,r);u||(r=Pe(r),u=l.call(o,r));const h=c.call(o,r);return o.set(r,i),u?wn(i,h)&&zn(o,"set",r,i):zn(o,"add",r,i),this},delete(r){const i=Pe(this),{has:o,get:l}=Fo(i);let c=o.call(i,r);c||(r=Pe(r),c=o.call(i,r)),l&&l.call(i,r);const u=i.delete(r);return c&&zn(i,"delete",r,void 0),u},clear(){const r=Pe(this),i=r.size!==0,o=r.clear();return i&&zn(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=B_(r,t,e)}),n}function du(t,e){const n=z_(t,e);return(s,r,i)=>r==="__v_isReactive"?!t:r==="__v_isReadonly"?t:r==="__v_raw"?s:Reflect.get(Le(n,r)&&r in s?n:s,r,i)}const q_={get:du(!1,!1)},H_={get:du(!1,!0)},W_={get:du(!0,!1)};const cg=new WeakMap,ug=new WeakMap,dg=new WeakMap,K_=new WeakMap;function G_(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function eo(t){return Rn(t)?t:hu(t,!1,$_,q_,cg)}function Q_(t){return hu(t,!1,j_,H_,ug)}function Ec(t){return hu(t,!0,U_,W_,dg)}function hu(t,e,n,s,r){if(!Fe(t)||t.__v_raw&&!(e&&t.__v_isReactive)||t.__v_skip||!Object.isExtensible(t))return t;const i=r.get(t);if(i)return i;const o=G_(y_(t));if(o===0)return t;const l=new Proxy(t,o===2?s:n);return r.set(t,l),l}function In(t){return Rn(t)?In(t.__v_raw):!!(t&&t.__v_isReactive)}function Rn(t){return!!(t&&t.__v_isReadonly)}function Qt(t){return!!(t&&t.__v_isShallow)}function Za(t){return t?!!t.__v_raw:!1}function Pe(t){const e=t&&t.__v_raw;return e?Pe(e):t}function fu(t){return!Le(t,"__v_skip")&&Object.isExtensible(t)&&Hp(t,"__v_skip",!0),t}const rn=t=>Fe(t)?eo(t):t,xs=t=>Fe(t)?Ec(t):t;function nt(t){return t?t.__v_isRef===!0:!1}function Ee(t){return Y_(t,!1)}function Y_(t,e){return nt(t)?t:new J_(t,e)}class J_{constructor(e,n){this.dep=new uu,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:Pe(e),this._value=n?e:rn(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,s=this.__v_isShallow||Qt(e)||Rn(e);e=s?e:Pe(e),wn(e,n)&&(this._rawValue=e,this._value=s?e:rn(e),this.dep.trigger())}}function k(t){return nt(t)?t.value:t}const X_={get:(t,e,n)=>e==="__v_raw"?t:k(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const r=t[e];return nt(r)&&!nt(n)?(r.value=n,!0):Reflect.set(t,e,n,s)}};function hg(t){return In(t)?t:new Proxy(t,X_)}function Z_(t){const e=ae(t)?new Array(t.length):{};for(const n in t)e[n]=tv(t,n);return e}class ev{constructor(e,n,s){this._object=e,this._defaultValue=s,this.__v_isRef=!0,this._value=void 0,this._key=sn(n)?n:String(n),this._raw=Pe(e);let r=!0,i=e;if(!ae(e)||sn(this._key)||!Ka(this._key))do r=!Za(i)||Qt(i);while(r&&(i=i.__v_raw));this._shallow=r}get value(){let e=this._object[this._key];return this._shallow&&(e=k(e)),this._value=e===void 0?this._defaultValue:e}set value(e){if(this._shallow&&nt(this._raw[this._key])){const n=this._object[this._key];if(nt(n)){n.value=e;return}}this._object[this._key]=e}get dep(){return O_(this._raw,this._key)}}function tv(t,e,n){return new ev(t,e,n)}class nv{constructor(e,n,s){this.fn=e,this.setter=n,this._value=void 0,this.dep=new uu(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Ni-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&ze!==this)return eg(this,!0),!0}get value(){const e=this.dep.track();return sg(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function sv(t,e,n=!1){let s,r;return be(t)?s=t:(s=t.get,r=t.set),new nv(s,r,n)}const Uo={},la=new WeakMap;let js;function rv(t,e=!1,n=js){if(n){let s=la.get(n);s||la.set(n,s=[]),s.push(t)}}function iv(t,e,n=Be){const{immediate:s,deep:r,once:i,scheduler:o,augmentJob:l,call:c}=n,u=Y=>r?Y:Qt(Y)||r===!1||r===0?qn(Y,1):qn(Y);let h,g,y,m,_=!1,A=!1;if(nt(t)?(g=()=>t.value,_=Qt(t)):In(t)?(g=()=>u(t),_=!0):ae(t)?(A=!0,_=t.some(Y=>In(Y)||Qt(Y)),g=()=>t.map(Y=>{if(nt(Y))return Y.value;if(In(Y))return u(Y);if(be(Y))return c?c(Y,2):Y()})):be(t)?e?g=c?()=>c(t,2):t:g=()=>{if(y){Gn();try{y()}finally{Qn()}}const Y=js;js=h;try{return c?c(t,3,[m]):t(m)}finally{js=Y}}:g=xn,e&&r){const Y=g,oe=r===!0?1/0:r;g=()=>qn(Y(),oe)}const M=Jp(),W=()=>{h.stop(),M&&M.active&&ou(M.effects,h)};if(i&&e){const Y=e;e=(...oe)=>{const me=Y(...oe);return W(),me}}let H=A?new Array(t.length).fill(Uo):Uo;const te=Y=>{if(!(!(h.flags&1)||!h.dirty&&!Y))if(e){const oe=h.run();if(Y||r||_||(A?oe.some((me,R)=>wn(me,H[R])):wn(oe,H))){y&&y();const me=js;js=h;try{const R=[oe,H===Uo?void 0:A&&H[0]===Uo?[]:H,m];H=oe,c?c(e,3,R):e(...R)}finally{js=me}}}else h.run()};return l&&l(te),h=new Xp(g),h.scheduler=o?()=>o(te,!1):te,m=Y=>rv(Y,!1,h),y=h.onStop=()=>{const Y=la.get(h);if(Y){if(c)c(Y,4);else for(const oe of Y)oe();la.delete(h)}},e?s?te(!0):H=h.run():o?o(te.bind(null,!0),!0):h.run(),W.pause=h.pause.bind(h),W.resume=h.resume.bind(h),W.stop=W,W}function qn(t,e=1/0,n){if(e<=0||!Fe(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,nt(t))qn(t.value,e,n);else if(ae(t))for(let s=0;s<t.length;s++)qn(t[s],e,n);else if(er(t)||ms(t))t.forEach(s=>{qn(s,e,n)});else if(qp(t)){for(const s in t)qn(t[s],e,n);for(const s of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,s)&&qn(t[s],e,n)}return t}/**
* @vue/runtime-core v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function to(t,e,n,s){try{return s?t(...s):t()}catch(r){el(r,e,n)}}function on(t,e,n,s){if(be(t)){const r=to(t,e,n,s);return r&&Bp(r)&&r.catch(i=>{el(i,e,n)}),r}if(ae(t)){const r=[];for(let i=0;i<t.length;i++)r.push(on(t[i],e,n,s));return r}}function el(t,e,n,s=!0){const r=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||Be;if(e){let l=e.parent;const c=e.proxy,u=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){const h=l.ec;if(h){for(let g=0;g<h.length;g++)if(h[g](t,c,u)===!1)return}l=l.parent}if(i){Gn(),to(i,null,10,[t,c,u]),Qn();return}}ov(t,n,r,s,o)}function ov(t,e,n,s=!0,r=!1){if(r)throw t;console.error(t)}const Lt=[];let _n=-1;const Sr=[];let cs=null,wr=0;const fg=Promise.resolve();let ca=null;function pu(t){const e=ca||fg;return t?e.then(this?t.bind(this):t):e}function av(t){let e=_n+1,n=Lt.length;for(;e<n;){const s=e+n>>>1,r=Lt[s],i=Vi(r);i<t||i===t&&r.flags&2?e=s+1:n=s}return e}function gu(t){if(!(t.flags&1)){const e=Vi(t),n=Lt[Lt.length-1];!n||!(t.flags&2)&&e>=Vi(n)?Lt.push(t):Lt.splice(av(e),0,t),t.flags|=1,pg()}}function pg(){ca||(ca=fg.then(mg))}function lv(t){if(!ae(t))cs&&t.id===-1?cs.splice(wr+1,0,t):t.flags&1||(Sr.push(t),t.flags|=1);else for(let e=0;e<t.length;e++)Sr.push(t[e]);pg()}function Ph(t,e,n=_n+1){for(;n<Lt.length;n++){const s=Lt[n];if(s&&s.flags&2){if(t&&s.id!==t.uid)continue;Lt.splice(n,1),n--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function gg(t){if(Sr.length){const e=[...new Set(Sr)].sort((n,s)=>Vi(n)-Vi(s));if(Sr.length=0,cs){for(let n=0;n<e.length;n++)cs.push(e[n]);return}for(cs=e,wr=0;wr<cs.length;wr++){const n=cs[wr];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}cs=null,wr=0}}const Vi=t=>t.id==null?t.flags&2?-1:1/0:t.id;function mg(t){try{for(_n=0;_n<Lt.length;_n++){const e=Lt[_n];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),to(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;_n<Lt.length;_n++){const e=Lt[_n];e&&(e.flags&=-2)}_n=-1,Lt.length=0,gg(),ca=null,(Lt.length||Sr.length)&&mg()}}let Wt=null,yg=null;function ua(t){const e=Wt;return Wt=t,yg=t&&t.type.__scopeId||null,e}function no(t,e=Wt,n){if(!e||t._n)return t;const s=(...r)=>{s._d&&pa(-1);const i=ua(e),o=Xs.length;let l;try{l=t(...r)}finally{for(let c=Xs.length;c>o;c--)Kg();ua(i),s._d&&pa(1)}return l};return s._n=!0,s._c=!0,s._d=!0,s}function Ie(t,e){if(Wt===null)return t;const n=ol(Wt),s=t.dirs||(t.dirs=[]);for(let r=0;r<e.length;r++){let[i,o,l,c=Be]=e[r];i&&(be(i)&&(i={mounted:i,updated:i}),i.deep&&qn(o),s.push({dir:i,instance:n,value:o,oldValue:void 0,arg:l,modifiers:c}))}return t}function Ls(t,e,n,s){const r=t.dirs,i=e&&e.dirs;for(let o=0;o<r.length;o++){const l=r[o];i&&(l.oldValue=i[o].value);let c=l.dir[s];c&&(Gn(),on(c,n,8,[t.el,l,t,e]),Qn())}}function cv(t,e){if(Rt){let n=Rt.provides;const s=Rt.parent&&Rt.parent.provides;s===n&&(n=Rt.provides=Object.create(s)),n[t]=e}}function wi(t,e,n=!1){const s=vu();if(s||Js){let r=Js?Js._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(r&&t in r)return r[t];if(arguments.length>1)return n&&be(e)?e.call(s&&s.proxy):e}}function uv(){return!!(vu()||Js)}const dv=Symbol.for("v-scx"),hv=()=>wi(dv);function ys(t,e,n){return _g(t,e,n)}function _g(t,e,n=Be){const{immediate:s,deep:r,flush:i,once:o}=n,l=mt({},n),c=e&&s||!e&&i!=="post";let u;if(Ui){if(i==="sync"){const m=hv();u=m.__watcherHandles||(m.__watcherHandles=[])}else if(!c){const m=()=>{};return m.stop=xn,m.resume=xn,m.pause=xn,m}}const h=Rt;l.call=(m,_,A)=>on(m,h,_,A);let g=!1;i==="post"?l.scheduler=m=>{jt(m,h&&h.suspense)}:i!=="sync"&&(g=!0,l.scheduler=(m,_)=>{_?m():gu(m)}),l.augmentJob=m=>{e&&(m.flags|=4),g&&(m.flags|=2,h&&(m.id=h.uid,m.i=h))};const y=iv(t,e,l);return Ui&&(u?u.push(y):c&&y()),y}function fv(t,e,n){const s=this.proxy,r=Ke(t)?t.includes(".")?vg(s,t):()=>s[t]:t.bind(s,s);let i;be(e)?i=e:(i=e.handler,n=e);const o=so(this),l=_g(r,i.bind(s),n);return o(),l}function vg(t,e){const n=e.split(".");return()=>{let s=t;for(let r=0;r<n.length&&s;r++)s=s[n[r]];return s}}const pv=Symbol("_vte"),tl=t=>t.__isTeleport,tn=Symbol("_leaveCb"),li=Symbol("_enterCb");function gv(){const t={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return mu(()=>{t.isMounted=!0}),Ag(()=>{t.isUnmounting=!0}),t}const en=[Function,Array],bg={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:en,onEnter:en,onAfterEnter:en,onEnterCancelled:en,onBeforeLeave:en,onLeave:en,onAfterLeave:en,onLeaveCancelled:en,onBeforeAppear:en,onAppear:en,onAfterAppear:en,onAppearCancelled:en},wg=t=>{const e=t.subTree;return e.component?wg(e.component):e},mv={name:"BaseTransition",props:bg,setup(t,{slots:e}){const n=vu(),s=gv();return()=>{const r=e.default&&Tg(e.default(),!0),i=r&&r.length?xg(r):n.subTree?we():void 0;if(!i)return;const o=Pe(t),{mode:l}=o;if(s.isLeaving)return ec(i);const c=da(i);if(!c)return ec(i);let u=kc(c,o,s,n,g=>u=g);c.type!==Ft&&Li(c,u);let h=n.subTree&&da(n.subTree);if(h&&h.type!==Ft&&!qs(h,c)&&wg(n).type!==Ft){let g=kc(h,o,s,n);if(Li(h,g),l==="out-in"&&c.type!==Ft)return s.isLeaving=!0,g.afterLeave=()=>{s.isLeaving=!1,n.job.flags&8||n.update(),delete g.afterLeave,h=void 0},ec(i);l==="in-out"&&c.type!==Ft?g.delayLeave=(y,m,_)=>{const A=Ig(s,h);A[String(h.key)]=h,y[tn]=()=>{m(),y[tn]=void 0,delete u.delayedLeave,h=void 0},u.delayedLeave=()=>{_(),delete u.delayedLeave,h=void 0}}:h=void 0}else h&&(h=void 0);return i}}};function xg(t){let e=t[0];if(t.length>1){for(const n of t)if(n.type!==Ft){e=n;break}}return e}const yv=mv;function Ig(t,e){const{leavingVNodes:n}=t;let s=n.get(e.type);return s||(s=Object.create(null),n.set(e.type,s)),s}function kc(t,e,n,s,r){const{appear:i,mode:o,persisted:l=!1,onBeforeEnter:c,onEnter:u,onAfterEnter:h,onEnterCancelled:g,onBeforeLeave:y,onLeave:m,onAfterLeave:_,onLeaveCancelled:A,onBeforeAppear:M,onAppear:W,onAfterAppear:H,onAppearCancelled:te}=e,Y=String(t.key),oe=Ig(n,t),me=(b,E)=>{b&&on(b,s,9,E)},R=(b,E)=>{const C=E[1];me(b,E),ae(b)?b.every(T=>T.length<=1)&&C():b.length<=1&&C()},w={mode:o,persisted:l,beforeEnter(b){let E=c;if(!n.isMounted)if(i)E=M||c;else return;b[tn]&&b[tn](!0);const C=oe[Y];C&&qs(t,C)&&C.el[tn]&&C.el[tn](),me(E,[b])},enter(b){if(oe[Y]===t)return;let E=u,C=h,T=g;if(!n.isMounted)if(i)E=W||u,C=H||h,T=te||g;else return;let I=!1;b[li]=ct=>{I||(I=!0,ct?me(T,[b]):me(C,[b]),w.delayedLeave&&w.delayedLeave(),b[li]=void 0)};const Ve=b[li].bind(null,!1);E?R(E,[b,Ve]):Ve()},leave(b,E){const C=String(t.key);if(b[li]&&b[li](!0),n.isUnmounting)return E();me(y,[b]);let T=!1;b[tn]=Ve=>{T||(T=!0,E(),Ve?me(A,[b]):me(_,[b]),b[tn]=void 0,oe[C]===t&&delete oe[C])};const I=b[tn].bind(null,!1);oe[C]=t,m?R(m,[b,I]):I()},clone(b){const E=kc(b,e,n,s,r);return r&&r(E),E}};return w}function ec(t){if(nl(t))return t=Is(t),t.children=null,t}function da(t){if(!nl(t))return tl(t.type)&&t.children?xg(t.children):t;if(t.component)return t.component.subTree;const{shapeFlag:e,children:n}=t;if(n){if(e&16)return n[0];if(e&32&&be(n.default))return n.default()}}function Li(t,e){if(t.shapeFlag&6&&t.component){t.transition=e;const n=t.component.subTree;Li(tl(n.type)&&da(n)||n,e)}else t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function Tg(t,e=!1,n){let s=[],r=0;for(let i=0;i<t.length;i++){let o=t[i];const l=n==null?o.key:String(n)+String(o.key!=null?o.key:i);o.type===Qe?(o.patchFlag&128&&r++,s=s.concat(Tg(o.children,e,l))):(e||o.type!==Ft)&&s.push(l!=null?Is(o,{key:l}):o)}if(r>1)for(let i=0;i<s.length;i++)s[i].patchFlag=-2;return s}function Eg(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function Mh(t,e){let n;return!!((n=Object.getOwnPropertyDescriptor(t,e))&&!n.configurable)}const ha=new WeakMap;function xi(t,e,n,s,r=!1){if(ae(t)){t.forEach((A,M)=>xi(A,e&&(ae(e)?e[M]:e),n,s,r));return}if(Ii(s)&&!r){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&xi(t,e,n,s.component.subTree);return}const i=s.shapeFlag&4?ol(s.component):s.el,o=r?null:i,{i:l,r:c}=t,u=e&&e.r,h=l.refs===Be?l.refs={}:l.refs,g=l.setupState,y=Pe(g),m=g===Be?jp:A=>Mh(h,A)?!1:Le(y,A),_=(A,M)=>!(M&&Mh(h,M));if(u!=null&&u!==c){if(Oh(e),Ke(u))h[u]=null,m(u)&&(g[u]=null);else if(nt(u)){const A=e;_(u,A.k)&&(u.value=null),A.k&&(h[A.k]=null)}}if(be(c))to(c,l,12,[o,h]);else{const A=Ke(c),M=nt(c);if(A||M){const W=()=>{if(t.f){const H=A?m(c)?g[c]:h[c]:_()||!t.k?c.value:h[t.k];if(r)ae(H)&&ou(H,i);else if(ae(H))H.includes(i)||H.push(i);else if(A)h[c]=[i],m(c)&&(g[c]=h[c]);else{const te=[i];_(c,t.k)&&(c.value=te),t.k&&(h[t.k]=te)}}else A?(h[c]=o,m(c)&&(g[c]=o)):M&&(_(c,t.k)&&(c.value=o),t.k&&(h[t.k]=o))};if(o){const H=()=>{W(),ha.delete(t)};H.id=-1,ha.set(t,H),jt(H,n)}else Oh(t),W()}}}function Oh(t){const e=ha.get(t);e&&(e.flags|=8,ha.delete(t))}Ja().requestIdleCallback;Ja().cancelIdleCallback;const Ii=t=>!!t.type.__asyncLoader,nl=t=>t.type.__isKeepAlive;function _v(t,e){kg(t,"a",e)}function vv(t,e){kg(t,"da",e)}function kg(t,e,n=Rt){const s=t.__wdc||(t.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return t()});if(sl(e,s,n),n){let r=n.parent;for(;r&&r.parent;)nl(r.parent.vnode)&&bv(s,e,n,r),r=r.parent}}function bv(t,e,n,s){const r=sl(e,t,s,!0);Sg(()=>{ou(s[e],r)},n)}function sl(t,e,n=Rt,s=!1){if(n){const r=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{Gn();const l=so(n),c=on(e,n,t,o);return l(),Qn(),c});return s?r.unshift(i):r.push(i),i}}const ts=t=>(e,n=Rt)=>{(!Ui||t==="sp")&&sl(t,(...s)=>e(...s),n)},wv=ts("bm"),mu=ts("m"),xv=ts("bu"),Iv=ts("u"),Ag=ts("bum"),Sg=ts("um"),Tv=ts("sp"),Ev=ts("rtg"),kv=ts("rtc");function Av(t,e=Rt){sl("ec",t,e)}const Sv="components",Cg=Symbol.for("v-ndc");function zs(t){return Ke(t)?Cv(Sv,t,!1)||t:t||Cg}function Cv(t,e,n=!0,s=!1){const r=Wt||Rt;if(r){const i=r.type;{const l=hb(i,!1);if(l&&(l===e||l===Ut(e)||l===Qa(Ut(e))))return i}const o=Nh(r[t]||i[t],e)||Nh(r.appContext[t],e);return!o&&s?i:o}}function Nh(t,e){return t&&(t[e]||t[Ut(e)]||t[Qa(Ut(e))])}function un(t,e,n,s){let r;const i=n,o=ae(t);if(o||Ke(t)){const l=o&&In(t);let c=!1,u=!1;l&&(c=!Qt(t),u=Rn(t),t=Xa(t)),r=new Array(t.length);for(let h=0,g=t.length;h<g;h++)r[h]=e(c?u?xs(rn(t[h])):rn(t[h]):t[h],h,void 0,i)}else if(typeof t=="number"){r=new Array(t);for(let l=0;l<t;l++)r[l]=e(l+1,l,void 0,i)}else if(Fe(t))if(t[Symbol.iterator])r=Array.from(t,(l,c)=>e(l,c,void 0,i));else{const l=Object.keys(t);r=new Array(l.length);for(let c=0,u=l.length;c<u;c++){const h=l[c];r[c]=e(t[h],h,c,i)}}else r=[];return r}const Ac=t=>t?Jg(t)?ol(t):Ac(t.parent):null,Ti=mt(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Ac(t.parent),$root:t=>Ac(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>Pg(t),$forceUpdate:t=>t.f||(t.f=()=>{gu(t.update)}),$nextTick:t=>t.n||(t.n=pu.bind(t.proxy)),$watch:t=>fv.bind(t)}),tc=(t,e)=>t!==Be&&!t.__isScriptSetup&&Le(t,e),Rv={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:s,data:r,props:i,accessCache:o,type:l,appContext:c}=t;if(e[0]!=="$"){const y=o[e];if(y!==void 0)switch(y){case 1:return s[e];case 2:return r[e];case 4:return n[e];case 3:return i[e]}else{if(tc(s,e))return o[e]=1,s[e];if(r!==Be&&Le(r,e))return o[e]=2,r[e];if(Le(i,e))return o[e]=3,i[e];if(n!==Be&&Le(n,e))return o[e]=4,n[e];Sc&&(o[e]=0)}}const u=Ti[e];let h,g;if(u)return e==="$attrs"&&Ct(t.attrs,"get",""),u(t);if((h=l.__cssModules)&&(h=h[e]))return h;if(n!==Be&&Le(n,e))return o[e]=4,n[e];if(g=c.config.globalProperties,Le(g,e))return g[e]},set({_:t},e,n){const{data:s,setupState:r,ctx:i}=t;return tc(r,e)?(r[e]=n,!0):s!==Be&&Le(s,e)?(s[e]=n,!0):Le(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:s,appContext:r,props:i,type:o}},l){let c;return!!(n[l]||t!==Be&&l[0]!=="$"&&Le(t,l)||tc(e,l)||Le(i,l)||Le(s,l)||Le(Ti,l)||Le(r.config.globalProperties,l)||(c=o.__cssModules)&&c[l])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:Le(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function Dh(t){return ae(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Sc=!0;function Pv(t){const e=Pg(t),n=t.proxy,s=t.ctx;Sc=!1,e.beforeCreate&&Vh(e.beforeCreate,t,"bc");const{data:r,computed:i,methods:o,watch:l,provide:c,inject:u,created:h,beforeMount:g,mounted:y,beforeUpdate:m,updated:_,activated:A,deactivated:M,beforeDestroy:W,beforeUnmount:H,destroyed:te,unmounted:Y,render:oe,renderTracked:me,renderTriggered:R,errorCaptured:w,serverPrefetch:b,expose:E,inheritAttrs:C,components:T,directives:I,filters:Ve}=e;if(u&&Mv(u,s,null),o)for(const ye in o){const Ae=o[ye];be(Ae)&&(s[ye]=Ae.bind(n))}if(r){const ye=r.call(n,n);Fe(ye)&&(t.data=eo(ye))}if(Sc=!0,i)for(const ye in i){const Ae=i[ye],zt=be(Ae)?Ae.bind(n,n):be(Ae.get)?Ae.get.bind(n,n):xn,Dn=!be(Ae)&&be(Ae.set)?Ae.set.bind(n):xn,an=Pt({get:zt,set:Dn});Object.defineProperty(s,ye,{enumerable:!0,configurable:!0,get:()=>an.value,set:Xe=>an.value=Xe})}if(l)for(const ye in l)Rg(l[ye],s,n,ye);if(c){const ye=be(c)?c.call(n):c;Reflect.ownKeys(ye).forEach(Ae=>{cv(Ae,ye[Ae])})}h&&Vh(h,t,"c");function $e(ye,Ae){ae(Ae)?Ae.forEach(zt=>ye(zt.bind(n))):Ae&&ye(Ae.bind(n))}if($e(wv,g),$e(mu,y),$e(xv,m),$e(Iv,_),$e(_v,A),$e(vv,M),$e(Av,w),$e(kv,me),$e(Ev,R),$e(Ag,H),$e(Sg,Y),$e(Tv,b),ae(E))if(E.length){const ye=t.exposed||(t.exposed={});E.forEach(Ae=>{Object.defineProperty(ye,Ae,{get:()=>n[Ae],set:zt=>n[Ae]=zt,enumerable:!0})})}else t.exposed||(t.exposed={});oe&&t.render===xn&&(t.render=oe),C!=null&&(t.inheritAttrs=C),T&&(t.components=T),I&&(t.directives=I),b&&Eg(t)}function Mv(t,e,n=xn){ae(t)&&(t=Cc(t));for(const s in t){const r=t[s];let i;Fe(r)?"default"in r?i=wi(r.from||s,r.default,!0):i=wi(r.from||s):i=wi(r),nt(i)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[s]=i}}function Vh(t,e,n){on(ae(t)?t.map(s=>s.bind(e.proxy)):t.bind(e.proxy),e,n)}function Rg(t,e,n,s){let r=s.includes(".")?vg(n,s):()=>n[s];if(Ke(t)){const i=e[t];be(i)&&ys(r,i)}else if(be(t))ys(r,t.bind(n));else if(Fe(t))if(ae(t))t.forEach(i=>Rg(i,e,n,s));else{const i=be(t.handler)?t.handler.bind(n):e[t.handler];be(i)&&ys(r,i,t)}}function Pg(t){const e=t.type,{mixins:n,extends:s}=e,{mixins:r,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,l=i.get(e);let c;return l?c=l:!r.length&&!n&&!s?c=e:(c={},r.length&&r.forEach(u=>fa(c,u,o,!0)),fa(c,e,o)),Fe(e)&&i.set(e,c),c}function fa(t,e,n,s=!1){const{mixins:r,extends:i}=e;i&&fa(t,i,n,!0),r&&r.forEach(o=>fa(t,o,n,!0));for(const o in e)if(!(s&&o==="expose")){const l=Ov[o]||n&&n[o];t[o]=l?l(t[o],e[o]):e[o]}return t}const Ov={data:Lh,props:Fh,emits:Fh,methods:di,computed:di,beforeCreate:Vt,created:Vt,beforeMount:Vt,mounted:Vt,beforeUpdate:Vt,updated:Vt,beforeDestroy:Vt,beforeUnmount:Vt,destroyed:Vt,unmounted:Vt,activated:Vt,deactivated:Vt,errorCaptured:Vt,serverPrefetch:Vt,components:di,directives:di,watch:Dv,provide:Lh,inject:Nv};function Lh(t,e){return e?t?function(){return mt(be(t)?t.call(this,this):t,be(e)?e.call(this,this):e)}:e:t}function Nv(t,e){return di(Cc(t),Cc(e))}function Cc(t){if(ae(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function Vt(t,e){return t?[...new Set([].concat(t,e))]:e}function di(t,e){return t?mt(Object.create(null),t,e):e}function Fh(t,e){return t?ae(t)&&ae(e)?[...new Set([...t,...e])]:mt(Object.create(null),Dh(t),Dh(e??{})):e}function Dv(t,e){if(!t)return e;if(!e)return t;const n=mt(Object.create(null),t);for(const s in e)n[s]=Vt(t[s],e[s]);return n}function Mg(){return{app:null,config:{isNativeTag:jp,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Vv=0;function Lv(t,e){return function(s,r=null){be(s)||(s=mt({},s)),r!=null&&!Fe(r)&&(r=null);const i=Mg(),o=new WeakSet,l=[];let c=!1;const u=i.app={_uid:Vv++,_component:s,_props:r,_container:null,_context:i,_instance:null,version:pb,get config(){return i.config},set config(h){},use(h,...g){return o.has(h)||(h&&be(h.install)?(o.add(h),h.install(u,...g)):be(h)&&(o.add(h),h(u,...g))),u},mixin(h){return i.mixins.includes(h)||i.mixins.push(h),u},component(h,g){return g?(i.components[h]=g,u):i.components[h]},directive(h,g){return g?(i.directives[h]=g,u):i.directives[h]},mount(h,g,y){if(!c){const m=u._ceVNode||G(s,r);return m.appContext=i,y===!0?y="svg":y===!1&&(y=void 0),t(m,h,y),c=!0,u._container=h,h.__vue_app__=u,ol(m.component)}},onUnmount(h){l.push(h)},unmount(){c&&(on(l,u._instance,16),t(null,u._container),delete u._container.__vue_app__)},provide(h,g){return i.provides[h]=g,u},runWithContext(h){const g=Js;Js=u;try{return h()}finally{Js=g}}};return u}}let Js=null;const Fv=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${Ut(e)}Modifiers`]||t[`${lr(e)}Modifiers`];function $v(t,e,...n){if(t.isUnmounted)return;const s=t.vnode.props||Be;let r=n;const i=e.startsWith("update:"),o=i&&Fv(s,e.slice(7));o&&(o.trim&&(r=n.map(h=>Ke(h)?h.trim():h)),o.number&&(r=r.map(Ya)));let l,c=s[l=Ql(e)]||s[l=Ql(Ut(e))];!c&&i&&(c=s[l=Ql(lr(e))]),c&&on(c,t,6,r);const u=s[l+"Once"];if(u){if(!t.emitted)t.emitted={};else if(t.emitted[l])return;t.emitted[l]=!0,on(u,t,6,r)}}const Uv=new WeakMap;function Og(t,e,n=!1){const s=n?Uv:e.emitsCache,r=s.get(t);if(r!==void 0)return r;const i=t.emits;let o={},l=!1;if(!be(t)){const c=u=>{const h=Og(u,e,!0);h&&(l=!0,mt(o,h))};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}return!i&&!l?(Fe(t)&&s.set(t,null),null):(ae(i)?i.forEach(c=>o[c]=null):mt(o,i),Fe(t)&&s.set(t,o),o)}function rl(t,e){return!t||!Ha(e)?!1:(e=e.slice(2),e=e==="Once"?e:e.replace(/Once$/,""),Le(t,e[0].toLowerCase()+e.slice(1))||Le(t,lr(e))||Le(t,e))}function $h(t){const{type:e,vnode:n,proxy:s,withProxy:r,propsOptions:[i],slots:o,attrs:l,emit:c,render:u,renderCache:h,props:g,data:y,setupState:m,ctx:_,inheritAttrs:A}=t,M=ua(t);let W,H;try{if(n.shapeFlag&4){const Y=r||s,oe=Y;W=bn(u.call(oe,Y,h,g,m,y,_)),H=l}else{const Y=e;W=bn(Y.length>1?Y(g,{attrs:l,slots:o,emit:c}):Y(g,null)),H=e.props?l:jv(l)}}catch(Y){Xs.length=0,el(Y,t,1),W=G(Ft)}let te=W;if(H&&A!==!1){const Y=Object.keys(H),{shapeFlag:oe}=te;Y.length&&oe&7&&(i&&Y.some(Wa)&&(H=Bv(H,i)),te=Is(te,H,!1,!0))}if(n.dirs&&(te=Is(te,null,!1,!0),te.dirs=te.dirs?te.dirs.concat(n.dirs):n.dirs),n.transition){const Y=tl(te.type)&&da(te)||te;Li(Y,n.transition)}return W=te,ua(M),W}const jv=t=>{let e;for(const n in t)(n==="class"||n==="style"||Ha(n))&&((e||(e={}))[n]=t[n]);return e},Bv=(t,e)=>{const n={};for(const s in t)(!Wa(s)||!(s.slice(9)in e))&&(n[s]=t[s]);return n};function zv(t,e,n){const{props:s,children:r,component:i}=t,{props:o,children:l,patchFlag:c}=e,u=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return s?Uh(s,o,u):!!o;if(c&8){const h=e.dynamicProps;for(let g=0;g<h.length;g++){const y=h[g];if(Ng(o,s,y)&&!rl(u,y))return!0}}}else return(r||l)&&(!l||!l.$stable)?!0:s===o?!1:s?o?Uh(s,o,u):!0:!!o;return!1}function Uh(t,e,n){const s=Object.keys(e);if(s.length!==Object.keys(t).length)return!0;for(let r=0;r<s.length;r++){const i=s[r];if(Ng(e,t,i)&&!rl(n,i))return!0}return!1}function Ng(t,e,n){const s=t[n],r=e[n];return n==="style"&&Fe(s)&&Fe(r)?!ws(s,r):s!==r}function qv({vnode:t,parent:e,suspense:n},s){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.suspense.vnode.el=r.el=s,t=r),r===t)(t=e.vnode).el=s,e=e.parent;else break}n&&n.activeBranch===t&&(n.vnode.el=s)}const Dg={},Vg=()=>Object.create(Dg),Lg=t=>Object.getPrototypeOf(t)===Dg;function Hv(t,e,n,s=!1){const r={},i=Vg();t.propsDefaults=Object.create(null),Fg(t,e,r,i);for(const o in t.propsOptions[0])o in r||(r[o]=void 0);n?t.props=s?r:Q_(r):t.type.props?t.props=r:t.props=i,t.attrs=i}function Wv(t,e,n,s){const{props:r,attrs:i,vnode:{patchFlag:o}}=t,l=Pe(r),[c]=t.propsOptions;let u=!1;if((s||o>0)&&!(o&16)){if(o&8){const h=t.vnode.dynamicProps;for(let g=0;g<h.length;g++){let y=h[g];if(rl(t.emitsOptions,y))continue;const m=e[y];if(c)if(Le(i,y))m!==i[y]&&(i[y]=m,u=!0);else{const _=Ut(y);r[_]=Rc(c,l,_,m,t,!1)}else m!==i[y]&&(i[y]=m,u=!0)}}}else{Fg(t,e,r,i)&&(u=!0);let h;for(const g in l)(!e||!Le(e,g)&&((h=lr(g))===g||!Le(e,h)))&&(c?n&&(n[g]!==void 0||n[h]!==void 0)&&(r[g]=Rc(c,l,g,void 0,t,!0)):delete r[g]);if(i!==l)for(const g in i)(!e||!Le(e,g))&&(delete i[g],u=!0)}u&&zn(t.attrs,"set","")}function Fg(t,e,n,s){const[r,i]=t.propsOptions;let o=!1,l;if(e)for(let c in e){if(_i(c))continue;const u=e[c];let h;r&&Le(r,h=Ut(c))?!i||!i.includes(h)?n[h]=u:(l||(l={}))[h]=u:rl(t.emitsOptions,c)||(!(c in s)||u!==s[c])&&(s[c]=u,o=!0)}if(i){const c=Pe(n),u=l||Be;for(let h=0;h<i.length;h++){const g=i[h];n[g]=Rc(r,c,g,u[g],t,!Le(u,g))}}return o}function Rc(t,e,n,s,r,i){const o=t[n];if(o!=null){const l=Le(o,"default");if(l&&s===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&be(c)){const{propsDefaults:u}=r;if(n in u)s=u[n];else{const h=so(r);s=u[n]=c.call(null,e),h()}}else s=c;r.ce&&r.ce._setProp(n,s)}o[0]&&(i&&!l?s=!1:o[1]&&(s===""||s===lr(n))&&(s=!0))}return s}const Kv=new WeakMap;function $g(t,e,n=!1){const s=n?Kv:e.propsCache,r=s.get(t);if(r)return r;const i=t.props,o={},l=[];let c=!1;if(!be(t)){const h=g=>{c=!0;const[y,m]=$g(g,e,!0);mt(o,y),m&&l.push(...m)};!n&&e.mixins.length&&e.mixins.forEach(h),t.extends&&h(t.extends),t.mixins&&t.mixins.forEach(h)}if(!i&&!c)return Fe(t)&&s.set(t,Ws),Ws;if(ae(i))for(let h=0;h<i.length;h++){const g=Ut(i[h]);jh(g)&&(o[g]=Be)}else if(i)for(const h in i){const g=Ut(h);if(jh(g)){const y=i[h],m=o[g]=ae(y)||be(y)?{type:y}:mt({},y),_=m.type;let A=!1,M=!0;if(ae(_))for(let W=0;W<_.length;++W){const H=_[W],te=be(H)&&H.name;if(te==="Boolean"){A=!0;break}else te==="String"&&(M=!1)}else A=be(_)&&_.name==="Boolean";m[0]=A,m[1]=M,(A||Le(m,"default"))&&l.push(g)}}const u=[o,l];return Fe(t)&&s.set(t,u),u}function jh(t){return t[0]!=="$"&&!_i(t)}const yu=t=>t==="_"||t==="_ctx"||t==="$stable",_u=t=>ae(t)?t.map(bn):[bn(t)],Gv=(t,e,n)=>{if(e._n)return e;const s=no((...r)=>_u(e(...r)),n);return s._c=!1,s},Ug=(t,e,n)=>{const s=t._ctx;for(const r in t){if(yu(r))continue;const i=t[r];if(be(i))e[r]=Gv(r,i,s);else if(i!=null){const o=_u(i);e[r]=()=>o}}},jg=(t,e)=>{const n=_u(e);t.slots.default=()=>n},Bg=(t,e,n)=>{for(const s in e)(n||!yu(s))&&(t[s]=e[s])},Qv=(t,e,n)=>{const s=t.slots=Vg();if(t.vnode.shapeFlag&32){const r=e._;r?(Bg(s,e,n),n&&Hp(s,"_",r,!0)):Ug(e,s)}else e&&jg(t,e)},Yv=(t,e,n)=>{const{vnode:s,slots:r}=t;let i=!0,o=Be;if(s.shapeFlag&32){const l=e._;l?n&&l===1?i=!1:Bg(r,e,n):(i=!e.$stable,Ug(e,r)),o=e}else e&&(jg(t,e),o={default:1});if(i)for(const l in r)!yu(l)&&o[l]==null&&delete r[l]},jt=tb;function Jv(t){return Xv(t)}function Xv(t,e){const n=Ja();n.__VUE__=!0;const{insert:s,remove:r,patchProp:i,createElement:o,createText:l,createComment:c,setText:u,setElementText:h,parentNode:g,nextSibling:y,setScopeId:m=xn,insertStaticContent:_}=t,A=(x,S,N,B=null,V=null,U=null,Z=void 0,J=null,K=!!S.dynamicChildren)=>{if(x===S)return;x&&!qs(x,S)&&(B=O(x),Xe(x,V,U,!0),x=null),S.patchFlag===-2&&(K=!1,S.dynamicChildren=null),S.dynamicChildren&&x&&x.dynamicChildren&&x.dynamicChildren.hasOnce&&(S.dynamicChildren===Ws&&(S.dynamicChildren=[]),S.dynamicChildren.hasOnce=!0);const{type:L,ref:ce,shapeFlag:ne}=S;switch(L){case il:M(x,S,N,B);break;case Ft:W(x,S,N,B);break;case Yo:x==null&&H(S,N,B,Z);break;case Qe:T(x,S,N,B,V,U,Z,J,K);break;default:ne&1?oe(x,S,N,B,V,U,Z,J,K):ne&6?I(x,S,N,B,V,U,Z,J,K):(ne&64||ne&128)&&L.process(x,S,N,B,V,U,Z,J,K,rt)}ce!=null&&V?xi(ce,x&&x.ref,U,S||x,!S):ce==null&&x&&x.ref!=null&&xi(x.ref,null,U,x,!0)},M=(x,S,N,B)=>{if(x==null)s(S.el=l(S.children),N,B);else{const V=S.el=x.el;S.children!==x.children&&u(V,S.children)}},W=(x,S,N,B)=>{x==null?s(S.el=c(S.children||""),N,B):S.el=x.el},H=(x,S,N,B)=>{[x.el,x.anchor]=_(x.children,S,N,B,x.el,x.anchor)},te=({el:x,anchor:S},N,B)=>{let V;for(;x&&x!==S;)V=y(x),s(x,N,B),x=V;s(S,N,B)},Y=({el:x,anchor:S})=>{let N;for(;x&&x!==S;)N=y(x),r(x),x=N;r(S)},oe=(x,S,N,B,V,U,Z,J,K)=>{if(S.type==="svg"?Z="svg":S.type==="math"&&(Z="mathml"),x==null)me(S,N,B,V,U,Z,J,K);else{const L=x.el&&x.el._isVueCE?x.el:null;try{L&&L._beginPatch(),b(x,S,V,U,Z,J,K)}finally{L&&L._endPatch()}}},me=(x,S,N,B,V,U,Z,J)=>{let K,L;const{props:ce,shapeFlag:ne,transition:ie,dirs:he}=x;if(K=x.el=o(x.type,U,ce&&ce.is,ce),ne&8?h(K,x.children):ne&16&&w(x.children,K,null,B,V,nc(x,U),Z,J),he&&Ls(x,null,B,"created"),R(K,x,x.scopeId,Z,B),ce){for(const ve in ce)ve!=="value"&&!_i(ve)&&i(K,ve,null,ce[ve],U,B);"value"in ce&&i(K,"value",null,ce.value,U),(L=ce.onVnodeBeforeMount)&&yn(L,B,x)}he&&Ls(x,null,B,"beforeMount");const ue=Zv(V,ie);ue&&ie.beforeEnter(K),s(K,S,N),((L=ce&&ce.onVnodeMounted)||ue||he)&&jt(()=>{try{L&&yn(L,B,x),ue&&ie.enter(K),he&&Ls(x,null,B,"mounted")}finally{}},V)},R=(x,S,N,B,V)=>{if(N&&m(x,N),B)for(let U=0;U<B.length;U++)m(x,B[U]);if(V){let U=V.subTree;if(S===U||Wg(U.type)&&(U.ssContent===S||U.ssFallback===S)){const Z=V.vnode;R(x,Z,Z.scopeId,Z.slotScopeIds,V.parent)}}},w=(x,S,N,B,V,U,Z,J,K=0)=>{for(let L=K;L<x.length;L++){const ce=x[L]=J?jn(x[L]):bn(x[L]);A(null,ce,S,N,B,V,U,Z,J)}},b=(x,S,N,B,V,U,Z)=>{const J=S.el=x.el;let{patchFlag:K,dynamicChildren:L,dirs:ce}=S;K|=x.patchFlag&16;const ne=x.props||Be,ie=S.props||Be;let he;if(N&&Fs(N,!1),(he=ie.onVnodeBeforeUpdate)&&yn(he,N,S,x),ce&&Ls(S,x,N,"beforeUpdate"),N&&Fs(N,!0),L&&(!x.dynamicChildren||x.dynamicChildren.length!==L.length)&&(K=0,Z=!1,L=null),(ne.innerHTML&&ie.innerHTML==null||ne.textContent&&ie.textContent==null)&&h(J,""),L?E(x.dynamicChildren,L,J,N,B,nc(S,V),U):Z||Ae(x,S,J,null,N,B,nc(S,V),U,!1),K>0){if(K&16)C(J,ne,ie,N,V);else if(K&2&&ne.class!==ie.class&&i(J,"class",null,ie.class,V),K&4&&i(J,"style",ne.style,ie.style,V),K&8){const ue=S.dynamicProps;for(let ve=0;ve<ue.length;ve++){const Re=ue[ve],Ge=ne[Re],ot=ie[Re];(ot!==Ge||Re==="value")&&i(J,Re,Ge,ot,V,N)}}K&1&&x.children!==S.children&&h(J,S.children)}else!Z&&L==null&&C(J,ne,ie,N,V);((he=ie.onVnodeUpdated)||ce)&&jt(()=>{he&&yn(he,N,S,x),ce&&Ls(S,x,N,"updated")},B)},E=(x,S,N,B,V,U,Z)=>{for(let J=0;J<S.length;J++){const K=x[J],L=S[J],ce=K.el&&(K.type===Qe||!qs(K,L)||K.shapeFlag&198)?g(K.el):N;A(K,L,ce,null,B,V,U,Z,!0)}},C=(x,S,N,B,V)=>{if(S!==N){if(S!==Be)for(const U in S)!_i(U)&&!(U in N)&&i(x,U,S[U],null,V,B);for(const U in N){if(_i(U))continue;const Z=N[U],J=S[U];Z!==J&&U!=="value"&&i(x,U,J,Z,V,B)}"value"in N&&i(x,"value",S.value,N.value,V)}},T=(x,S,N,B,V,U,Z,J,K)=>{const L=S.el=x?x.el:l(""),ce=S.anchor=x?x.anchor:l("");let{patchFlag:ne,dynamicChildren:ie,slotScopeIds:he}=S;he&&(J=J?J.concat(he):he),x==null?(s(L,N,B),s(ce,N,B),w(S.children||[],N,ce,V,U,Z,J,K)):ne>0&&ne&64&&ie&&x.dynamicChildren&&x.dynamicChildren.length===ie.length?(E(x.dynamicChildren,ie,N,V,U,Z,J),(S.key!=null||V&&S===V.subTree)&&zg(x,S,!0)):Ae(x,S,N,ce,V,U,Z,J,K)},I=(x,S,N,B,V,U,Z,J,K)=>{S.slotScopeIds=J,x==null?S.shapeFlag&512?V.ctx.activate(S,N,B,Z,K):Ve(S,N,B,V,U,Z,K):ct(x,S,K)},Ve=(x,S,N,B,V,U,Z)=>{const J=x.component=ab(x,B,V);if(nl(x)&&(J.ctx.renderer=rt),lb(J,!1,Z),J.asyncDep){if(V&&V.registerDep(J,$e,Z),!x.el){const K=J.subTree=G(Ft);W(null,K,S,N),x.placeholder=K.el}}else $e(J,x,S,N,V,U,Z)},ct=(x,S,N)=>{const B=S.component=x.component;if(zv(x,S,N))if(B.asyncDep&&!B.asyncResolved){S.el=x.el,ye(B,S,N);return}else B.next=S,B.update();else S.el=x.el,B.vnode=S},$e=(x,S,N,B,V,U,Z)=>{const J=()=>{if(x.isMounted){let{next:ne,bu:ie,u:he,parent:ue,vnode:ve}=x;{const Tt=qg(x);if(Tt){ne&&(ne.el=ve.el,ye(x,ne,Z)),Tt.asyncDep.then(()=>{jt(()=>{x.isUnmounted||L()},V)});return}}let Re=ne,Ge;Fs(x,!1),ne?(ne.el=ve.el,ye(x,ne,Z)):ne=ve,ie&&Qo(ie),(Ge=ne.props&&ne.props.onVnodeBeforeUpdate)&&yn(Ge,ue,ne,ve),Fs(x,!0);const ot=$h(x),Xt=x.subTree;x.subTree=ot,A(Xt,ot,g(Xt.el),O(Xt),x,V,U),ne.el=ot.el,Re===null&&qv(x,ot.el),he&&jt(he,V),(Ge=ne.props&&ne.props.onVnodeUpdated)&&jt(()=>yn(Ge,ue,ne,ve),V)}else{let ne;const{el:ie,props:he}=S,{bm:ue,m:ve,parent:Re,root:Ge,type:ot}=x,Xt=Ii(S);Fs(x,!1),ue&&Qo(ue),!Xt&&(ne=he&&he.onVnodeBeforeMount)&&yn(ne,Re,S),Fs(x,!0);{Ge.ce&&Ge.ce._hasShadowRoot()&&Ge.ce._injectChildStyle(ot,x.parent?x.parent.type:void 0);const Tt=x.subTree=$h(x);A(null,Tt,N,B,x,V,U),S.el=Tt.el}if(ve&&jt(ve,V),!Xt&&(ne=he&&he.onVnodeMounted)){const Tt=S;jt(()=>yn(ne,Re,Tt),V)}(S.shapeFlag&256||Re&&Ii(Re.vnode)&&Re.vnode.shapeFlag&256)&&x.a&&jt(x.a,V),x.isMounted=!0,S=N=B=null}};x.scope.on();const K=x.effect=new Xp(J);x.scope.off();const L=x.update=K.run.bind(K),ce=x.job=K.runIfDirty.bind(K);ce.i=x,ce.id=x.uid,K.scheduler=()=>gu(ce),Fs(x,!0),L()},ye=(x,S,N)=>{S.component=x;const B=x.vnode.props;x.vnode=S,x.next=null,Wv(x,S.props,B,N),Yv(x,S.children,N),Gn(),Ph(x),Qn()},Ae=(x,S,N,B,V,U,Z,J,K=!1)=>{const L=x&&x.children,ce=x?x.shapeFlag:0,ne=S.children,{patchFlag:ie,shapeFlag:he}=S;if(ie>0){if(ie&128){Dn(L,ne,N,B,V,U,Z,J,K);return}else if(ie&256){zt(L,ne,N,B,V,U,Z,J,K);return}}he&8?(ce&16&&j(L,V,U),ne!==L&&h(N,ne)):ce&16?he&16?Dn(L,ne,N,B,V,U,Z,J,K):j(L,V,U,!0):(ce&8&&h(N,""),he&16&&w(ne,N,B,V,U,Z,J,K))},zt=(x,S,N,B,V,U,Z,J,K)=>{x=x||Ws,S=S||Ws;const L=x.length,ce=S.length,ne=Math.min(L,ce);let ie;for(ie=0;ie<ne;ie++){const he=S[ie]=K?jn(S[ie]):bn(S[ie]);A(x[ie],he,N,null,V,U,Z,J,K)}L>ce?j(x,V,U,!0,!1,ne):w(S,N,B,V,U,Z,J,K,ne)},Dn=(x,S,N,B,V,U,Z,J,K)=>{let L=0;const ce=S.length;let ne=x.length-1,ie=ce-1;for(;L<=ne&&L<=ie;){const he=x[L],ue=S[L]=K?jn(S[L]):bn(S[L]);if(qs(he,ue))A(he,ue,N,null,V,U,Z,J,K);else break;L++}for(;L<=ne&&L<=ie;){const he=x[ne],ue=S[ie]=K?jn(S[ie]):bn(S[ie]);if(qs(he,ue))A(he,ue,N,null,V,U,Z,J,K);else break;ne--,ie--}if(L>ne){if(L<=ie){const he=ie+1,ue=he<ce?S[he].el:B;for(;L<=ie;)A(null,S[L]=K?jn(S[L]):bn(S[L]),N,ue,V,U,Z,J,K),L++}}else if(L>ie)for(;L<=ne;)Xe(x[L],V,U,!0),L++;else{const he=L,ue=L,ve=new Map;for(L=ue;L<=ie;L++){const yt=S[L]=K?jn(S[L]):bn(S[L]);yt.key!=null&&ve.set(yt.key,L)}let Re,Ge=0;const ot=ie-ue+1;let Xt=!1,Tt=0;const ns=new Array(ot);for(L=0;L<ot;L++)ns[L]=0;for(L=he;L<=ne;L++){const yt=x[L];if(Ge>=ot){Xe(yt,V,U,!0);continue}let Zt;if(yt.key!=null)Zt=ve.get(yt.key);else for(Re=ue;Re<=ie;Re++)if(ns[Re-ue]===0&&qs(yt,S[Re])){Zt=Re;break}Zt===void 0?Xe(yt,V,U,!0):(ns[Zt-ue]=L+1,Zt>=Tt?Tt=Zt:Xt=!0,A(yt,S[Zt],N,null,V,U,Z,J,K),Ge++)}const Gr=Xt?eb(ns):Ws;for(Re=Gr.length-1,L=ot-1;L>=0;L--){const yt=ue+L,Zt=S[yt],xo=S[yt+1],fr=yt+1<ce?xo.el||Hg(xo):B;ns[L]===0?A(null,Zt,N,fr,V,U,Z,J,K):Xt&&(Re<0||L!==Gr[Re]?an(Zt,N,fr,2):Re--)}}},an=(x,S,N,B,V=null)=>{const{el:U,type:Z,transition:J,children:K,shapeFlag:L}=x;if(L&6){an(x.component.subTree,S,N,B);return}if(L&128){x.suspense.move(S,N,B);return}if(L&64){Z.move(x,S,N,rt);return}if(Z===Qe){s(U,S,N);for(let ne=0;ne<K.length;ne++)an(K[ne],S,N,B);s(x.anchor,S,N);return}if(Z===Yo){te(x,S,N);return}if(B!==2&&L&1&&J)if(B===0)J.persisted&&!U[tn]?s(U,S,N):(J.beforeEnter(U),s(U,S,N),jt(()=>J.enter(U),V));else{const{leave:ne,delayLeave:ie,afterLeave:he}=J,ue=()=>{x.ctx.isUnmounted?r(U):s(U,S,N)},ve=()=>{const Re=U._isLeaving||!!U[tn];U._isLeaving&&U[tn](!0),J.persisted&&!Re?ue():ne(U,()=>{ue(),he&&he()})};ie?ie(U,ue,ve):ve()}else s(U,S,N)},Xe=(x,S,N,B=!1,V=!1)=>{const{type:U,props:Z,ref:J,children:K,dynamicChildren:L,shapeFlag:ce,patchFlag:ne,dirs:ie,cacheIndex:he,memo:ue}=x;if((ne===-2||L&&L.hasOnce)&&(V=!1),J!=null&&(Gn(),xi(J,null,N,x,!0),Qn()),he!=null&&(!x.ctx||x.ctx===S)&&(S.renderCache[he]=void 0),ce&256){S.ctx.deactivate(x);return}const ve=ce&1&&ie,Re=!Ii(x);let Ge;if(Re&&(Ge=Z&&Z.onVnodeBeforeUnmount)&&yn(Ge,S,x),ce&6)ln(x.component,N,B);else{if(ce&128){x.suspense.unmount(N,B);return}ve&&Ls(x,null,S,"beforeUnmount"),ce&64?x.type.remove(x,S,N,rt,B):L&&!L.hasOnce&&(U!==Qe||ne>0&&ne&64)?j(L,S,N,!1,!0):(U===Qe&&ne&384||!V&&ce&16)&&j(K,S,N),B&&st(x)}const ot=ue!=null&&he==null;(Re&&(Ge=Z&&Z.onVnodeUnmounted)||ve||ot)&&jt(()=>{Ge&&yn(Ge,S,x),ve&&Ls(x,null,S,"unmounted"),ot&&(x.el=null)},N)},st=x=>{const{type:S,el:N,anchor:B,transition:V}=x;if(S===Qe){Kr(N,B);return}if(S===Yo){Y(x),V&&!V.persisted&&V.afterLeave&&V.afterLeave();return}const U=()=>{r(N),V&&!V.persisted&&V.afterLeave&&V.afterLeave()};if(x.shapeFlag&1&&V&&!V.persisted){const{leave:Z,delayLeave:J}=V,K=()=>Z(N,U);J?J(x.el,U,K):K()}else U()},Kr=(x,S)=>{let N;for(;x!==S;)N=y(x),r(x),x=N;r(S)},ln=(x,S,N)=>{const{bum:B,scope:V,job:U,subTree:Z,um:J,m:K,a:L}=x;Bh(K),Bh(L),B&&Qo(B),V.stop(),U?(U.flags|=8,Xe(Z,x,S,N)):x.vnode.el&&Z&&(Z.transition=x.vnode.transition,Xe(Z,x,S,N)),J&&jt(J,S),jt(()=>{x.isUnmounted=!0},S)},j=(x,S,N,B=!1,V=!1,U=0)=>{for(let Z=U;Z<x.length;Z++)Xe(x[Z],S,N,B,V)},O=x=>{if(x.shapeFlag&6)return O(x.component.subTree);if(x.shapeFlag&128)return x.suspense.next();const S=y(x.anchor||x.el),N=S&&S[pv];return N?y(N):S};let Se=!1;const Ze=(x,S,N)=>{let B;x==null?S._vnode&&(Xe(S._vnode,null,null,!0),B=S._vnode.component):A(S._vnode||null,x,S,null,null,null,N),S._vnode=x,Se||(Se=!0,Ph(B),gg(),Se=!1)},rt={p:A,um:Xe,m:an,r:st,mt:Ve,mc:w,pc:Ae,pbc:E,n:O,o:t};return{render:Ze,hydrate:void 0,createApp:Lv(Ze)}}function nc({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function Fs({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function Zv(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function zg(t,e,n=!1){const s=t.children,r=e.children;if(ae(s)&&ae(r))for(let i=0;i<s.length;i++){const o=s[i];let l=r[i];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=r[i]=jn(r[i]),l.el=o.el),!n&&l.patchFlag!==-2&&zg(o,l)),l.type===il&&(l.patchFlag===-1&&(l=r[i]=jn(l)),l.el=o.el),l.type===Ft&&!l.el&&(l.el=o.el)}}function eb(t){const e=t.slice(),n=[0];let s,r,i,o,l;const c=t.length;for(s=0;s<c;s++){const u=t[s];if(u!==0){if(r=n[n.length-1],t[r]<u){e[s]=r,n.push(s);continue}for(i=0,o=n.length-1;i<o;)l=i+o>>1,t[n[l]]<u?i=l+1:o=l;u<t[n[i]]&&(i>0&&(e[s]=n[i-1]),n[i]=s)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function qg(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:qg(e)}function Bh(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}function Hg(t){if(t.placeholder)return t.placeholder;const e=t.component;return e?Hg(e.subTree):null}const Wg=t=>t.__isSuspense;function tb(t,e){e&&e.pendingBranch?ae(t)?e.effects.push(...t):e.effects.push(t):lv(t)}const Qe=Symbol.for("v-fgt"),il=Symbol.for("v-txt"),Ft=Symbol.for("v-cmt"),Yo=Symbol.for("v-stc"),Xs=[];let Kt=null;function q(t=!1){Xs.push(Kt=t?null:[])}function Kg(){Xs.pop(),Kt=Xs[Xs.length-1]||null}let Fi=1;function pa(t,e=!1){Fi+=t,t<0&&Kt&&e&&(Kt.hasOnce=!0)}function Gg(t){return t.dynamicChildren=Fi>0?Kt||Ws:null,Kg(),Fi>0&&Kt&&Kt.push(t),t}function ee(t,e,n,s,r,i){return Gg(f(t,e,n,s,r,i,!0))}function ft(t,e,n,s,r){return Gg(G(t,e,n,s,r,!0))}function ga(t){return t?t.__v_isVNode===!0:!1}function qs(t,e){return t.type===e.type&&t.key===e.key}const Qg=({key:t})=>t??null,Jo=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?Ke(t)||nt(t)||be(t)?{i:Wt,r:t,k:e,f:!!n}:t:null);function f(t,e=null,n=null,s=0,r=null,i=t===Qe?0:1,o=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&Qg(e),ref:e&&Jo(e),scopeId:yg,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:s,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:Wt};return l?(ma(c,n),i&128&&t.normalize(c)):n&&(c.shapeFlag|=Ke(n)?8:16),Fi>0&&!o&&Kt&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&Kt.push(c),c}const G=nb;function nb(t,e=null,n=null,s=0,r=null,i=!1){if((!t||t===Cg)&&(t=Ft),ga(t)){const l=Is(t,e,!0);return n&&ma(l,n),Fi>0&&!i&&Kt&&(l.shapeFlag&6?Kt[Kt.indexOf(t)]=l:Kt.push(l)),l.patchFlag=-2,l}if(fb(t)&&(t=t.__vccOpts),e){e=sb(e);let{class:l,style:c}=e;l&&!Ke(l)&&(e.class=xe(l)),Fe(c)&&(Za(c)&&!ae(c)&&(c=mt({},c)),e.style=tt(c))}const o=Ke(t)?1:Wg(t)?128:tl(t)?64:Fe(t)?4:be(t)?2:0;return f(t,e,n,s,r,o,i,!0)}function sb(t){return t?Za(t)||Lg(t)?mt({},t):t:null}function Is(t,e,n=!1,s=!1){const{props:r,ref:i,patchFlag:o,children:l,transition:c}=t,u=e?rb(r||{},e):r,h={__v_isVNode:!0,__v_skip:!0,type:t.type,props:u,key:u&&Qg(u),ref:e&&e.ref?n&&i?ae(i)?i.concat(Jo(e)):[i,Jo(e)]:Jo(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:l,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Qe?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:c,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&Is(t.ssContent),ssFallback:t.ssFallback&&Is(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce,cacheIndex:t.cacheIndex};return c&&s&&Li(h,c.clone(h)),h}function qe(t=" ",e=0){return G(il,null,t,e)}function Yg(t,e){const n=G(Yo,null,t);return n.staticCount=e,n}function we(t="",e=!1){return e?(q(),ft(Ft,null,t)):G(Ft,null,t)}function bn(t){return t==null||typeof t=="boolean"?G(Ft):ae(t)?G(Qe,null,t.slice()):ga(t)?jn(t):G(il,null,String(t))}function jn(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:Is(t)}function ma(t,e){let n=0;const{shapeFlag:s}=t;if(e==null)e=null;else if(ae(e))n=16;else if(typeof e=="object")if(s&65){const r=e.default;r&&(r._c&&(r._d=!1),ma(t,r()),r._c&&(r._d=!0));return}else{n=32;const r=e._;!r&&!Lg(e)?e._ctx=Wt:r===3&&Wt&&(Wt.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else if(be(e)){if(s&65){ma(t,{default:e});return}e={default:e,_ctx:Wt},n=32}else e=String(e),s&64?(n=16,e=[qe(e)]):n=8;t.children=e,t.shapeFlag|=n}function rb(...t){const e={};for(let n=0;n<t.length;n++){const s=t[n];for(const r in s)if(r==="class")e.class!==s.class&&(e.class=xe([e.class,s.class]));else if(r==="style")e.style=tt([e.style,s.style]);else if(Ha(r)){const i=e[r],o=s[r];o&&i!==o&&!(ae(i)&&i.includes(o))?e[r]=i?[].concat(i,o):o:o==null&&i==null&&!Wa(r)&&(e[r]=o)}else r!==""&&(e[r]=s[r])}return e}function yn(t,e,n,s=null){on(t,e,7,[n,s])}const ib=Mg();let ob=0;function ab(t,e,n){const s=t.type,r=(e?e.appContext:t.appContext)||ib,i={uid:ob++,vnode:t,type:s,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Qp(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:$g(s,r),emitsOptions:Og(s,r),emit:null,emitted:null,propsDefaults:Be,inheritAttrs:s.inheritAttrs,ctx:Be,data:Be,props:Be,attrs:Be,slots:Be,refs:Be,setupState:Be,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=$v.bind(null,i),t.ce&&t.ce(i),i}let Rt=null;const vu=()=>Rt||Wt;let ya,$i;{const t=Ja(),e=(n,s)=>{let r;return(r=t[n])||(r=t[n]=[]),r.push(s),i=>{r.length>1?r.forEach(o=>o(i)):r[0](i)}};ya=e("__VUE_INSTANCE_SETTERS__",n=>Rt=n),$i=e("__VUE_SSR_SETTERS__",n=>Ui=n)}const so=t=>{const e=Rt;return ya(t),t.scope.on(),()=>{t.scope.off(),ya(e)}},zh=()=>{Rt&&Rt.scope.off(),ya(null)};function Jg(t){return t.vnode.shapeFlag&4}let Ui=!1;function lb(t,e=!1,n=!1){e&&$i(e);const{props:s,children:r}=t.vnode,i=Jg(t);Hv(t,s,i,e),Qv(t,r,n||e);const o=i?cb(t,e):void 0;return e&&$i(!1),o}function cb(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,Rv);const{setup:s}=n;if(s){Gn();const r=t.setupContext=s.length>1?db(t):null,i=so(t),o=to(s,t,0,[t.props,r]),l=Bp(o);if(Qn(),i(),(l||t.sp)&&!Ii(t)&&Eg(t),l){if(o.then(zh,zh),e)return o.then(c=>{$i(!0);try{qh(t,c,e)}finally{$i(!1)}}).catch(c=>{el(c,t,0)});t.asyncDep=o}else qh(t,o)}else Xg(t)}function qh(t,e,n){be(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Fe(e)&&(t.setupState=hg(e)),Xg(t)}function Xg(t,e,n){const s=t.type;t.render||(t.render=s.render||xn);{const r=so(t);Gn();try{Pv(t)}finally{Qn(),r()}}}const ub={get(t,e){return Ct(t,"get",""),t[e]}};function db(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,ub),slots:t.slots,emit:t.emit,expose:e}}function ol(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(hg(fu(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Ti)return Ti[n](t)},has(e,n){return n in e||n in Ti}})):t.proxy}function hb(t,e=!0){return be(t)?t.displayName||t.name:t.name||e&&t.__name}function fb(t){return be(t)&&"__vccOpts"in t}const Pt=(t,e)=>sv(t,e,Ui);function _a(t,e,n){try{pa(-1);const s=arguments.length;return s===2?Fe(e)&&!ae(e)?ga(e)?G(t,null,[e]):G(t,e):G(t,null,e):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&ga(n)&&(n=[n]),G(t,e,n))}finally{pa(1)}}const pb="3.5.43";/**
* @vue/runtime-dom v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Pc;const Hh=typeof window<"u"&&window.trustedTypes;if(Hh)try{Pc=Hh.createPolicy("vue",{createHTML:t=>t})}catch{}const Zg=Pc?t=>Pc.createHTML(t):t=>t,gb="http://www.w3.org/2000/svg",mb="http://www.w3.org/1998/Math/MathML",Un=typeof document<"u"?document:null,Wh=Un&&Un.createElement("template"),yb={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,s)=>{const r=e==="svg"?Un.createElementNS(gb,t):e==="mathml"?Un.createElementNS(mb,t):n?Un.createElement(t,{is:n}):Un.createElement(t);return t==="select"&&s&&s.multiple!=null&&r.setAttribute("multiple",s.multiple),r},createText:t=>Un.createTextNode(t),createComment:t=>Un.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>Un.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,s,r,i){const o=n?n.previousSibling:e.lastChild;if(r&&(r===i||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),n),!(r===i||!(r=r.nextSibling)););else{Wh.innerHTML=Zg(s==="svg"?`<svg>${t}</svg>`:s==="mathml"?`<math>${t}</math>`:t);const l=Wh.content;if(s==="svg"||s==="mathml"){const c=l.firstChild;for(;c.firstChild;)l.appendChild(c.firstChild);l.removeChild(c)}e.insertBefore(l,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},os="transition",ci="animation",ji=Symbol("_vtc"),em={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},_b=mt({},bg,em),vb=t=>(t.displayName="Transition",t.props=_b,t),al=vb((t,{slots:e})=>_a(yv,bb(t),e)),$s=(t,e=[])=>{ae(t)?t.forEach(n=>n(...e)):t&&t(...e)},Kh=t=>t?ae(t)?t.some(e=>e.length>1):t.length>1:!1;function bb(t){const e={};for(const T in t)T in em||(e[T]=t[T]);if(t.css===!1)return e;const{name:n="v",type:s,duration:r,enterFromClass:i=`${n}-enter-from`,enterActiveClass:o=`${n}-enter-active`,enterToClass:l=`${n}-enter-to`,appearFromClass:c=i,appearActiveClass:u=o,appearToClass:h=l,leaveFromClass:g=`${n}-leave-from`,leaveActiveClass:y=`${n}-leave-active`,leaveToClass:m=`${n}-leave-to`}=t,_=wb(r),A=_&&_[0],M=_&&_[1],{onBeforeEnter:W,onEnter:H,onEnterCancelled:te,onLeave:Y,onLeaveCancelled:oe,onBeforeAppear:me=W,onAppear:R=H,onAppearCancelled:w=te}=e,b=(T,I,Ve,ct)=>{T._enterCancelled=ct,Us(T,I?h:l),Us(T,I?u:o),Ve&&Ve()},E=(T,I)=>{T._isLeaving=!1,Us(T,g),Us(T,m),Us(T,y),I&&I()},C=T=>(I,Ve)=>{const ct=T?R:H,$e=()=>b(I,T,Ve);$s(ct,[I,$e]),Gh(()=>{Us(I,T?c:i),$n(I,T?h:l),Kh(ct)||Qh(I,s,A,$e)})};return mt(e,{onBeforeEnter(T){$s(W,[T]),$n(T,i),$n(T,o)},onBeforeAppear(T){$s(me,[T]),$n(T,c),$n(T,u)},onEnter:C(!1),onAppear:C(!0),onLeave(T,I){T._isLeaving=!0;const Ve=()=>E(T,I);$n(T,g),T._enterCancelled?($n(T,y),Xh(T)):(Xh(T),$n(T,y)),Gh(()=>{T._isLeaving&&(Us(T,g),$n(T,m),Kh(Y)||Qh(T,s,M,Ve))}),$s(Y,[T,Ve])},onEnterCancelled(T){b(T,!1,void 0,!0),$s(te,[T])},onAppearCancelled(T){b(T,!0,void 0,!0),$s(w,[T])},onLeaveCancelled(T){E(T),$s(oe,[T])}})}function wb(t){if(t==null)return null;if(Fe(t))return[sc(t.enter),sc(t.leave)];{const e=sc(t);return[e,e]}}function sc(t){return b_(t)}function $n(t,e){e.split(/\s+/).forEach(n=>n&&t.classList.add(n)),(t[ji]||(t[ji]=new Set)).add(e)}function Us(t,e){e.split(/\s+/).forEach(s=>s&&t.classList.remove(s));const n=t[ji];n&&(n.delete(e),n.size||(t[ji]=void 0))}function Gh(t){requestAnimationFrame(()=>{requestAnimationFrame(t)})}let xb=0;function Qh(t,e,n,s){const r=t._endId=++xb,i=()=>{r===t._endId&&s()};if(n!=null)return setTimeout(i,n);const{type:o,timeout:l,propCount:c}=Ib(t,e);if(!o)return s();const u=o+"end";let h=0;const g=()=>{t.removeEventListener(u,y),i()},y=m=>{m.target===t&&++h>=c&&g()};setTimeout(()=>{h<c&&g()},l+1),t.addEventListener(u,y)}function Ib(t,e){const n=window.getComputedStyle(t),s=_=>(n[_]||"").split(", "),r=s(`${os}Delay`),i=s(`${os}Duration`),o=Yh(r,i),l=s(`${ci}Delay`),c=s(`${ci}Duration`),u=Yh(l,c);let h=null,g=0,y=0;e===os?o>0&&(h=os,g=o,y=i.length):e===ci?u>0&&(h=ci,g=u,y=c.length):(g=Math.max(o,u),h=g>0?o>u?os:ci:null,y=h?h===os?i.length:c.length:0);const m=h===os&&/\b(?:transform|all)(?:,|$)/.test(s(`${os}Property`).toString());return{type:h,timeout:g,propCount:y,hasTransform:m}}function Yh(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max(...e.map((n,s)=>Jh(n)+Jh(t[s])))}function Jh(t){return t==="auto"?0:Number(t.slice(0,-1).replace(",","."))*1e3}function Xh(t){return(t?t.ownerDocument:document).body.offsetHeight}function Tb(t,e,n){const s=t[ji];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const Zh=Symbol("_vod"),Eb=Symbol("_vsh"),kb=Symbol(""),Ab=/(?:^|;)\s*display\s*:/;function Sb(t,e,n){const s=t.style,r=Ke(n);let i=!1;if(n&&!r){if(e)if(Ke(e))for(const o of e.split(";")){const l=o.slice(0,o.indexOf(":")).trim();n[l]==null&&hi(s,l,"")}else for(const o in e)n[o]==null&&hi(s,o,"");for(const o in n){o==="display"&&(i=!0);const l=n[o];l!=null?Rb(t,o,!Ke(e)&&e?e[o]:void 0,l)||hi(s,o,l):hi(s,o,"")}}else if(r){if(e!==n){const o=s[kb];o&&(n+=";"+o),s.cssText=n,i=Ab.test(n)}}else e&&t.removeAttribute("style");Zh in t&&(t[Zh]=i?s.display:"",t[Eb]&&(s.display="none"))}const jo=/\s*!important$/;function hi(t,e,n){if(ae(n))n.forEach(s=>hi(t,e,s));else if(n==null&&(n=""),e.startsWith("--"))jo.test(n)?t.setProperty(e,n.replace(jo,""),"important"):t.setProperty(e,n);else{const s=Cb(t,e);jo.test(n)?t.setProperty(lr(s),n.replace(jo,""),"important"):t[s]=n}}const ef=["Webkit","Moz","ms"],rc={};function Cb(t,e){const n=rc[e];if(n)return n;let s=Ut(e);if(s!=="filter"&&s in t)return rc[e]=s;s=Qa(s);for(let r=0;r<ef.length;r++){const i=ef[r]+s;if(i in t)return rc[e]=i}return e}function Rb(t,e,n,s){return t.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&Ke(s)&&n===s}const tf="http://www.w3.org/1999/xlink";function nf(t,e,n,s,r,i=k_(e)){s&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(tf,e.slice(6,e.length)):t.setAttributeNS(tf,e,n):n==null||i&&!Wp(n)?t.removeAttribute(e):t.setAttribute(e,i?"":sn(n)?String(n):n)}function sf(t,e,n,s,r){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?Zg(n):n);return}const i=t.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const l=i==="OPTION"?t.getAttribute("value")||"":t.value,c=n==null?t.type==="checkbox"?"on":"":String(n);(l!==c||!("_value"in t))&&(t.value=c),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const l=typeof t[e];l==="boolean"?n=Wp(n):n==null&&l==="string"?(n="",o=!0):l==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(r||e)}function Hs(t,e,n,s){t.addEventListener(e,n,s)}function Pb(t,e,n,s){t.removeEventListener(e,n,s)}const rf=Symbol("_vei");function Mb(t,e,n,s,r=null){const i=t[rf]||(t[rf]={}),o=i[e];if(s&&o)o.value=s;else{const[l,c]=Db(e);if(s){const u=i[e]=Fb(s,r);Hs(t,l,u,c)}else o&&(Pb(t,l,o,c),i[e]=void 0)}}const Ob=/(Once|Passive|Capture)$/,Nb=/^on:?(?:Once|Passive|Capture)$/;function Db(t){let e,n;for(;(n=t.match(Ob))&&!Nb.test(t);)e||(e={}),t=t.slice(0,t.length-n[1].length),e[n[1].toLowerCase()]=!0;return[t[2]===":"?t.slice(3):lr(t.slice(2)),e]}let ic=0;const Vb=Promise.resolve(),Lb=()=>ic||(Vb.then(()=>ic=0),ic=Date.now());function Fb(t,e){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;const r=n.value;if(ae(r)){const i=s.stopImmediatePropagation;s.stopImmediatePropagation=()=>{i.call(s),s._stopped=!0};const o=r.slice(),l=[s];for(let c=0;c<o.length&&!s._stopped;c++){const u=o[c];u&&on(u,e,5,l)}}else on(r,e,5,[s])};return n.value=t,n.attached=Lb(),n}const of=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,$b=(t,e,n,s,r,i)=>{const o=r==="svg";e==="class"?Tb(t,s,o):e==="style"?Sb(t,n,s):Ha(e)?Wa(e)||Mb(t,e,n,s,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Ub(t,e,s,o))?(sf(t,e,s),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&nf(t,e,s,o,i,e!=="value")):t._isVueCE&&(jb(t,e)||t._def.__asyncLoader&&(/[A-Z]/.test(e)||!Ke(s)))?sf(t,Ut(e),s,i,e):(e==="true-value"?t._trueValue=s:e==="false-value"&&(t._falseValue=s),nf(t,e,s,o))};function Ub(t,e,n,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in t&&of(e)&&be(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&t.tagName==="IFRAME"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=t.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return of(e)&&Ke(n)?!1:e in t}function jb(t,e){const n=t._def.props;if(!n)return!1;const s=Ut(e);return Array.isArray(n)?n.some(r=>Ut(r)===s):Object.keys(n).some(r=>Ut(r)===s)}const va=t=>{const e=t.props["onUpdate:modelValue"]||!1;return ae(e)?n=>Qo(e,n):e};function Bb(t){t.target.composing=!0}function af(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Ks=Symbol("_assign"),Bo=Symbol("_initialValue");function oc(t,e,n){return e&&(t=t.trim()),n&&(t=Ya(t)),t}const De={created(t,{modifiers:{lazy:e,trim:n,number:s}},r){t.parentNode&&(t.type==="text"?t[Bo]=t.defaultValue.replace(/[\r\n]/g,""):t.type==="textarea"&&(t[Bo]=t.defaultValue.replace(/\r\n?/g,`
`))),t[Ks]=va(r);const i=s||r.props&&r.props.type==="number";Hs(t,e?"change":"input",o=>{o.target.composing||t[Ks](oc(t.value,n,i))}),(n||i)&&Hs(t,"change",()=>{t.value=oc(t.value,n,i)}),e||(Hs(t,"compositionstart",Bb),Hs(t,"compositionend",af),Hs(t,"change",af))},mounted(t,{value:e,modifiers:{trim:n,number:s}}){const r=e??"",i=t[Bo];delete t[Bo],i!==void 0&&(t.type==="text"||t.type==="textarea")&&t.value!==i?t[Ks](oc(t.value,n,s)):t.value=r},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:s,trim:r,number:i}},o){if(t[Ks]=va(o),t.composing)return;const l=(i||t.type==="number")&&!/^0\d/.test(t.value)?Ya(t.value):t.value,c=e??"";if(l===c)return;const u=t.getRootNode();(u instanceof Document||u instanceof ShadowRoot)&&u.activeElement===t&&t.type!=="range"&&(s&&e===n||r&&t.value.trim()===c)||(t.value=c)}},ba={deep:!0,created(t,{value:e,modifiers:{number:n}},s){t._modelValue=e,Hs(t,"change",()=>{const r=Array.prototype.filter.call(t.options,c=>c.selected).map(c=>n?Ya(wa(c)):wa(c)),i=t.multiple,o=i?er(t._modelValue)?new Set(r):r:r[0],l=t._pendingValue=[i,i?ae(o)?r.slice():r:o];try{t[Ks](o)}finally{pu(()=>{t._pendingValue===l&&(t._pendingValue=void 0)})}}),t[Ks]=va(s)},mounted(t,{value:e}){lf(t,e)},beforeUpdate(t,{value:e},n){t._modelValue=e,t[Ks]=va(n)},updated(t,{value:e}){const n=t._pendingValue;t._pendingValue=void 0,(!n||n[0]!==t.multiple||!zb(e,n[1],n[0]))&&lf(t,e)}};function zb(t,e,n){if(!n||ae(t))return ws(t,e);if(er(t)){if(t.size!==e.length)return!1;for(const s of e)if(!t.has(s))return!1;return!0}return!1}function lf(t,e){const n=t.multiple,s=ae(e);if(!(n&&!s&&!er(e))){for(let r=0,i=t.options.length;r<i;r++){const o=t.options[r],l=wa(o);if(n)if(s){const c=typeof l;c==="string"||c==="number"?o.selected=e.some(u=>String(u)===String(l)):o.selected=C_(e,l)>-1}else o.selected=e.has(l);else if(ws(wa(o),e)){t.selectedIndex!==r&&(t.selectedIndex=r);return}}!n&&t.selectedIndex!==-1&&(t.selectedIndex=-1)}}function wa(t){return"_value"in t?t._value:t.value}const qb=["ctrl","shift","alt","meta"],Hb={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>qb.some(n=>t[`${n}Key`]&&!e.includes(n))},vt=(t,e)=>{if(!t)return t;const n=t._withMods||(t._withMods={}),s=e.join(".");return n[s]||(n[s]=(r,...i)=>{for(let o=0;o<e.length;o++){const l=Hb[e[o]];if(l&&l(r,e))return}return t(r,...i)})},Wb=mt({patchProp:$b},yb);let cf;function Kb(){return cf||(cf=Jv(Wb))}const Gb=(...t)=>{const e=Kb().createApp(...t),{mount:n}=e;return e.mount=s=>{const r=Yb(s);if(!r)return;const i=e._component;!be(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=n(r,!1,Qb(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e};function Qb(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function Yb(t){return Ke(t)?document.querySelector(t):t}/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let tm;const ll=t=>tm=t,nm=Symbol();function Mc(t){return t&&typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"&&typeof t.toJSON!="function"}var Ei;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(Ei||(Ei={}));function Jb(){const t=Yp(!0),e=t.run(()=>Ee({}));let n=[],s=[];const r=fu({install(i){ll(r),r._a=i,i.provide(nm,r),i.config.globalProperties.$pinia=r,s.forEach(o=>n.push(o)),s=[]},use(i){return this._a?n.push(i):s.push(i),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return r}const sm=()=>{};function uf(t,e,n,s=sm){t.push(e);const r=()=>{const i=t.indexOf(e);i>-1&&(t.splice(i,1),s())};return!n&&Jp()&&R_(r),r}function vr(t,...e){t.slice().forEach(n=>{n(...e)})}const Xb=t=>t(),df=Symbol(),ac=Symbol();function Oc(t,e){t instanceof Map&&e instanceof Map?e.forEach((n,s)=>t.set(s,n)):t instanceof Set&&e instanceof Set&&e.forEach(t.add,t);for(const n in e){if(!e.hasOwnProperty(n))continue;const s=e[n],r=t[n];Mc(r)&&Mc(s)&&t.hasOwnProperty(n)&&!nt(s)&&!In(s)?t[n]=Oc(r,s):t[n]=s}return t}const Zb=Symbol();function ew(t){return!Mc(t)||!t.hasOwnProperty(Zb)}const{assign:ls}=Object;function tw(t){return!!(nt(t)&&t.effect)}function nw(t,e,n,s){const{state:r,actions:i,getters:o}=e,l=n.state.value[t];let c;function u(){l||(n.state.value[t]=r?r():{});const h=Z_(n.state.value[t]);return ls(h,i,Object.keys(o||{}).reduce((g,y)=>(g[y]=fu(Pt(()=>{ll(n);const m=n._s.get(t);return o[y].call(m,m)})),g),{}))}return c=rm(t,u,e,n,s,!0),c}function rm(t,e,n={},s,r,i){let o;const l=ls({actions:{}},n),c={deep:!0};let u,h,g=[],y=[],m;const _=s.state.value[t];!i&&!_&&(s.state.value[t]={});let A;function M(w){let b;u=h=!1,typeof w=="function"?(w(s.state.value[t]),b={type:Ei.patchFunction,storeId:t,events:m}):(Oc(s.state.value[t],w),b={type:Ei.patchObject,payload:w,storeId:t,events:m});const E=A=Symbol();pu().then(()=>{A===E&&(u=!0)}),h=!0,vr(g,b,s.state.value[t])}const W=i?function(){const{state:b}=n,E=b?b():{};this.$patch(C=>{ls(C,E)})}:sm;function H(){o.stop(),g=[],y=[],s._s.delete(t)}const te=(w,b="")=>{if(df in w)return w[ac]=b,w;const E=function(){ll(s);const C=Array.from(arguments),T=[],I=[];function Ve(ye){T.push(ye)}function ct(ye){I.push(ye)}vr(y,{args:C,name:E[ac],store:oe,after:Ve,onError:ct});let $e;try{$e=w.apply(this&&this.$id===t?this:oe,C)}catch(ye){throw vr(I,ye),ye}return $e instanceof Promise?$e.then(ye=>(vr(T,ye),ye)).catch(ye=>(vr(I,ye),Promise.reject(ye))):(vr(T,$e),$e)};return E[df]=!0,E[ac]=b,E},Y={_p:s,$id:t,$onAction:uf.bind(null,y),$patch:M,$reset:W,$subscribe(w,b={}){const E=uf(g,w,b.detached,()=>C()),C=o.run(()=>ys(()=>s.state.value[t],T=>{(b.flush==="sync"?h:u)&&w({storeId:t,type:Ei.direct,events:m},T)},ls({},c,b)));return E},$dispose:H},oe=eo(Y);s._s.set(t,oe);const R=(s._a&&s._a.runWithContext||Xb)(()=>s._e.run(()=>(o=Yp()).run(()=>e({action:te}))));for(const w in R){const b=R[w];if(nt(b)&&!tw(b)||In(b))i||(_&&ew(b)&&(nt(b)?b.value=_[w]:Oc(b,_[w])),s.state.value[t][w]=b);else if(typeof b=="function"){const E=te(b,w);R[w]=E,l.actions[w]=b}}return ls(oe,R),ls(Pe(oe),R),Object.defineProperty(oe,"$state",{get:()=>s.state.value[t],set:w=>{M(b=>{ls(b,w)})}}),s._p.forEach(w=>{ls(oe,o.run(()=>w({store:oe,app:s._a,pinia:s,options:l})))}),_&&i&&n.hydrate&&n.hydrate(oe.$state,_),u=!0,h=!0,oe}/*! #__NO_SIDE_EFFECTS__ */function bu(t,e,n){let s,r;const i=typeof e=="function";typeof t=="string"?(s=t,r=i?n:e):(r=t,s=t.id);function o(l,c){const u=uv();return l=l||(u?wi(nm,null):null),l&&ll(l),l=tm,l._s.has(s)||(i?rm(s,e,r,l):nw(s,r,l)),l._s.get(s)}return o.$id=s,o}const hf=[{id:"zone-food",name:"โซนอาหาร & เครื่องดื่ม (Food & Drink)",color:"#ef4444",pricePerDay:500},{id:"zone-fashion",name:"โซนแฟชั่น & เครื่องแต่งกาย (Fashion)",color:"#ec4899",pricePerDay:400},{id:"zone-tech",name:"โซนไอที & กัดเจ็ต (Gadgets & Tech)",color:"#3b82f6",pricePerDay:450},{id:"zone-craft",name:"โซนงานแฮนด์เมด & ของสะสม (Craft & Vintage)",color:"#10b981",pricePerDay:350},{id:"zone-general",name:"โซนทั่วไป (General Zone)",color:"#8b5cf6",pricePerDay:300}],ff=[{id:"stall-A01",stallNo:"A01",zoneId:"zone-food",x:100,y:100,width:100,height:80,price:500,status:"available",bookedBy:null,notes:"ใกล้ประตูทางเข้าหลัก"},{id:"stall-A02",stallNo:"A02",zoneId:"zone-food",x:220,y:100,width:100,height:80,price:500,status:"booked",bookedBy:{tenantId:"demo-tenant-001",name:"คุณสมชาย (ร้านชาไข่มุก)",phone:"081-234-5678",bookedAt:"2026-09-24"},notes:"มีปลั๊กไฟ 15A"},{id:"stall-A03",stallNo:"A03",zoneId:"zone-food",x:340,y:100,width:100,height:80,price:500,status:"available",bookedBy:null,notes:""},{id:"stall-B01",stallNo:"B01",zoneId:"zone-fashion",x:100,y:220,width:120,height:90,price:400,status:"available",bookedBy:null,notes:"เหมาะตั้งราวเสื้อผ้า"},{id:"stall-B02",stallNo:"B02",zoneId:"zone-fashion",x:240,y:220,width:120,height:90,price:400,status:"disabled",bookedBy:null,notes:"ปิดซ่อมบำรุงไฟ"},{id:"stall-C01",stallNo:"C01",zoneId:"zone-tech",x:100,y:340,width:140,height:100,price:450,status:"available",bookedBy:null,notes:"มีสายแลนเต้ารับไฮสปีด"}],pf=[{id:"obj-entrance-main",type:"entrance",subType:"gate",label:"ทางเข้าหลัก A (Main Gate)",x:40,y:20,width:160,height:48,rotation:0,styleProps:{color:"#10b981",icon:"door-open"}},{id:"obj-exit-parking",type:"exit",subType:"gate",label:"ทางออกฝั่งลานจอดรถ",x:880,y:620,width:160,height:48,rotation:0,styleProps:{color:"#f59e0b",icon:"log-out"}},{id:"obj-walkway-main",type:"walkway",subType:"main_path",label:"ทางเดินหลัก (Central Walkway)",x:470,y:100,width:80,height:360,rotation:0,styleProps:{color:"#64748b",icon:"footprints"}},{id:"obj-restroom",type:"restricted",subType:"restroom",label:"โซนห้องน้ำสาธารณะ",x:880,y:100,width:120,height:90,rotation:0,styleProps:{color:"#0284c7",icon:"bath"}},{id:"obj-stage",type:"restricted",subType:"stage",label:"เวทีแสดงดนตรีสด & กิจกรรม",x:580,y:350,width:180,height:110,rotation:0,styleProps:{color:"#8b5cf6",icon:"mic"}},{id:"obj-atm-station",type:"facility",subType:"atm",label:"จุดตู้ ATM / โอนเงิน",x:230,y:20,width:110,height:45,rotation:0,styleProps:{color:"#0ea5e9",icon:"credit-card"}},{id:"obj-info-center",type:"facility",subType:"info",label:"จุดประชาสัมพันธ์ (Info)",x:360,y:20,width:130,height:45,rotation:0,styleProps:{color:"#6366f1",icon:"help-circle"}}],Ht=[{type:"entrance",subType:"gate",label:"ทางเข้าหลัก (Entrance)",widthM:4,heightM:1.2,styleProps:{color:"#10b981",icon:"door-open"}},{type:"exit",subType:"gate",label:"ทางออก (Exit)",widthM:4,heightM:1.2,styleProps:{color:"#f59e0b",icon:"log-out"}},{type:"walkway",subType:"main_path",label:"ทางเดินผู้ซื้อ (Walkway)",widthM:2,heightM:8,styleProps:{color:"#64748b",icon:"footprints"}},{type:"restricted",subType:"pillar",label:"เสาอาคาร (Pillar)",widthM:1.5,heightM:1.5,styleProps:{color:"#475569",icon:"square"}},{type:"restricted",subType:"restroom",label:"ห้องน้ำ (Restroom)",widthM:3,heightM:2.5,styleProps:{color:"#0284c7",icon:"bath"}},{type:"restricted",subType:"stage",label:"เวทีกลางแจ้ง (Stage)",widthM:4.5,heightM:3,styleProps:{color:"#8b5cf6",icon:"mic"}},{type:"restricted",subType:"trash",label:"จุดทิ้งขยะ (Trash Area)",widthM:2,heightM:1.5,styleProps:{color:"#64748b",icon:"trash-2"}},{type:"facility",subType:"atm",label:"ตู้ ATM",widthM:2.5,heightM:1.2,styleProps:{color:"#0ea5e9",icon:"credit-card"}},{type:"facility",subType:"info",label:"จุดประชาสัมพันธ์ (Info)",widthM:3,heightM:1.2,styleProps:{color:"#6366f1",icon:"help-circle"}},{type:"facility",subType:"firstaid",label:"จุดปฐมพยาบาล (First Aid)",widthM:2.5,heightM:2,styleProps:{color:"#ef4444",icon:"cross"}}];var gf={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const im=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},sw=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=t[n++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=t[n++],o=t[n++],l=t[n++],c=((r&7)<<18|(i&63)<<12|(o&63)<<6|l&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},om={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const i=t[r],o=r+1<t.length,l=o?t[r+1]:0,c=r+2<t.length,u=c?t[r+2]:0,h=i>>2,g=(i&3)<<4|l>>4;let y=(l&15)<<2|u>>6,m=u&63;c||(m=64,o||(y=64)),s.push(n[h],n[g],n[y],n[m])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(im(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):sw(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const i=n[t.charAt(r++)],l=r<t.length?n[t.charAt(r)]:0;++r;const u=r<t.length?n[t.charAt(r)]:64;++r;const g=r<t.length?n[t.charAt(r)]:64;if(++r,i==null||l==null||u==null||g==null)throw new rw;const y=i<<2|l>>4;if(s.push(y),u!==64){const m=l<<4&240|u>>2;if(s.push(m),g!==64){const _=u<<6&192|g;s.push(_)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class rw extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const iw=function(t){const e=im(t);return om.encodeByteArray(e,!0)},xa=function(t){return iw(t).replace(/\./g,"")},am=function(t){try{return om.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ow(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aw=()=>ow().__FIREBASE_DEFAULTS__,lw=()=>{if(typeof process>"u"||typeof gf>"u")return;const t=gf.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},cw=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&am(t[1]);return e&&JSON.parse(e)},cl=()=>{try{return aw()||lw()||cw()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},lm=t=>{var e,n;return(n=(e=cl())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},uw=t=>{const e=lm(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},cm=()=>{var t;return(t=cl())===null||t===void 0?void 0:t.config},um=t=>{var e;return(e=cl())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dw{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hw(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",r=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[xa(JSON.stringify(n)),xa(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function fw(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Nt())}function pw(){var t;const e=(t=cl())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function gw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function wu(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function mw(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function yw(){const t=Nt();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function _w(){return!pw()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function xu(){try{return typeof indexedDB=="object"}catch{return!1}}function Iu(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var i;e(((i=r.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}function dm(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vw="FirebaseError";class mn extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=vw,Object.setPrototypeOf(this,mn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,cr.prototype.create)}}class cr{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?bw(i,s):"Error",l=`${this.serviceName}: ${o} (${r}).`;return new mn(r,l,s)}}function bw(t,e){return t.replace(ww,(n,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const ww=/\{\$([^}]+)}/g;function xw(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Bi(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const i=t[r],o=e[r];if(mf(i)&&mf(o)){if(!Bi(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function mf(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ro(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function fi(t){const e={};return t.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[r,i]=s.split("=");e[decodeURIComponent(r)]=decodeURIComponent(i)}}),e}function pi(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function Iw(t,e){const n=new Tw(t,e);return n.subscribe.bind(n)}class Tw{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let r;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");Ew(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:s},r.next===void 0&&(r.next=lc),r.error===void 0&&(r.error=lc),r.complete===void 0&&(r.complete=lc);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ew(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function lc(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kw=1e3,Aw=2,Sw=4*60*60*1e3,Cw=.5;function yf(t,e=kw,n=Aw){const s=e*Math.pow(n,t),r=Math.round(Cw*s*(Math.random()-.5)*2);return Math.min(Sw,s+r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ye(t){return t&&t._delegate?t._delegate:t}class fn{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bs="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rw{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new dw;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Mw(e))try{this.getOrInitializeService({instanceIdentifier:Bs})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=Bs){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Bs){return this.instances.has(e)}getOptions(e=Bs){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);s===l&&o.resolve(r)}return r}onInit(e,n){var s;const r=this.normalizeInstanceIdentifier(n),i=(s=this.onInitCallbacks.get(r))!==null&&s!==void 0?s:new Set;i.add(e),this.onInitCallbacks.set(r,i);const o=this.instances.get(r);return o&&e(o,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Pw(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Bs){return this.component?this.component.multipleInstances?e:Bs:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Pw(t){return t===Bs?void 0:t}function Mw(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ow{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Rw(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ke;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ke||(ke={}));const Nw={debug:ke.DEBUG,verbose:ke.VERBOSE,info:ke.INFO,warn:ke.WARN,error:ke.ERROR,silent:ke.SILENT},Dw=ke.INFO,Vw={[ke.DEBUG]:"log",[ke.VERBOSE]:"log",[ke.INFO]:"info",[ke.WARN]:"warn",[ke.ERROR]:"error"},Lw=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=Vw[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ul{constructor(e){this.name=e,this._logLevel=Dw,this._logHandler=Lw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ke))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Nw[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ke.DEBUG,...e),this._logHandler(this,ke.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ke.VERBOSE,...e),this._logHandler(this,ke.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ke.INFO,...e),this._logHandler(this,ke.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ke.WARN,...e),this._logHandler(this,ke.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ke.ERROR,...e),this._logHandler(this,ke.ERROR,...e)}}const Fw=(t,e)=>e.some(n=>t instanceof n);let _f,vf;function $w(){return _f||(_f=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Uw(){return vf||(vf=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const hm=new WeakMap,Nc=new WeakMap,fm=new WeakMap,cc=new WeakMap,Tu=new WeakMap;function jw(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(_s(t.result)),r()},o=()=>{s(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&hm.set(n,t)}).catch(()=>{}),Tu.set(e,t),e}function Bw(t){if(Nc.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Nc.set(t,e)}let Dc={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Nc.get(t);if(e==="objectStoreNames")return t.objectStoreNames||fm.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return _s(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function zw(t){Dc=t(Dc)}function qw(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(uc(this),e,...n);return fm.set(s,e.sort?e.sort():[e]),_s(s)}:Uw().includes(t)?function(...e){return t.apply(uc(this),e),_s(hm.get(this))}:function(...e){return _s(t.apply(uc(this),e))}}function Hw(t){return typeof t=="function"?qw(t):(t instanceof IDBTransaction&&Bw(t),Fw(t,$w())?new Proxy(t,Dc):t)}function _s(t){if(t instanceof IDBRequest)return jw(t);if(cc.has(t))return cc.get(t);const e=Hw(t);return e!==t&&(cc.set(t,e),Tu.set(e,t)),e}const uc=t=>Tu.get(t);function pm(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(t,e),l=_s(o);return s&&o.addEventListener("upgradeneeded",c=>{s(_s(o.result),c.oldVersion,c.newVersion,_s(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),l.then(c=>{i&&c.addEventListener("close",()=>i()),r&&c.addEventListener("versionchange",u=>r(u.oldVersion,u.newVersion,u))}).catch(()=>{}),l}const Ww=["get","getKey","getAll","getAllKeys","count"],Kw=["put","add","delete","clear"],dc=new Map;function bf(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(dc.get(e))return dc.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=Kw.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Ww.includes(n)))return;const i=async function(o,...l){const c=this.transaction(o,r?"readwrite":"readonly");let u=c.store;return s&&(u=u.index(l.shift())),(await Promise.all([u[n](...l),r&&c.done]))[0]};return dc.set(e,i),i}zw(t=>({...t,get:(e,n,s)=>bf(e,n)||t.get(e,n,s),has:(e,n)=>!!bf(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gw{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Qw(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function Qw(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Vc="@firebase/app",wf="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yn=new ul("@firebase/app"),Yw="@firebase/app-compat",Jw="@firebase/analytics-compat",Xw="@firebase/analytics",Zw="@firebase/app-check-compat",e1="@firebase/app-check",t1="@firebase/auth",n1="@firebase/auth-compat",s1="@firebase/database",r1="@firebase/data-connect",i1="@firebase/database-compat",o1="@firebase/functions",a1="@firebase/functions-compat",l1="@firebase/installations",c1="@firebase/installations-compat",u1="@firebase/messaging",d1="@firebase/messaging-compat",h1="@firebase/performance",f1="@firebase/performance-compat",p1="@firebase/remote-config",g1="@firebase/remote-config-compat",m1="@firebase/storage",y1="@firebase/storage-compat",_1="@firebase/firestore",v1="@firebase/vertexai-preview",b1="@firebase/firestore-compat",w1="firebase",x1="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lc="[DEFAULT]",I1={[Vc]:"fire-core",[Yw]:"fire-core-compat",[Xw]:"fire-analytics",[Jw]:"fire-analytics-compat",[e1]:"fire-app-check",[Zw]:"fire-app-check-compat",[t1]:"fire-auth",[n1]:"fire-auth-compat",[s1]:"fire-rtdb",[r1]:"fire-data-connect",[i1]:"fire-rtdb-compat",[o1]:"fire-fn",[a1]:"fire-fn-compat",[l1]:"fire-iid",[c1]:"fire-iid-compat",[u1]:"fire-fcm",[d1]:"fire-fcm-compat",[h1]:"fire-perf",[f1]:"fire-perf-compat",[p1]:"fire-rc",[g1]:"fire-rc-compat",[m1]:"fire-gcs",[y1]:"fire-gcs-compat",[_1]:"fire-fst",[b1]:"fire-fst-compat",[v1]:"fire-vertex","fire-js":"fire-js",[w1]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ia=new Map,T1=new Map,Fc=new Map;function xf(t,e){try{t.container.addComponent(e)}catch(n){Yn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Pn(t){const e=t.name;if(Fc.has(e))return Yn.debug(`There were multiple attempts to register component ${e}.`),!1;Fc.set(e,t);for(const n of Ia.values())xf(n,t);for(const n of T1.values())xf(n,t);return!0}function ur(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function dn(t){return t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E1={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},vs=new cr("app","Firebase",E1);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k1{constructor(e,n,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new fn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw vs.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ur=x1;function gm(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s=Object.assign({name:Lc,automaticDataCollectionEnabled:!1},e),r=s.name;if(typeof r!="string"||!r)throw vs.create("bad-app-name",{appName:String(r)});if(n||(n=cm()),!n)throw vs.create("no-options");const i=Ia.get(r);if(i){if(Bi(n,i.options)&&Bi(s,i.config))return i;throw vs.create("duplicate-app",{appName:r})}const o=new Ow(r);for(const c of Fc.values())o.addComponent(c);const l=new k1(n,s,o);return Ia.set(r,l),l}function Eu(t=Lc){const e=Ia.get(t);if(!e&&t===Lc&&cm())return gm();if(!e)throw vs.create("no-app",{appName:t});return e}function nn(t,e,n){var s;let r=(s=I1[t])!==null&&s!==void 0?s:t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const l=[`Unable to register library "${r}" with version "${e}":`];i&&l.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Yn.warn(l.join(" "));return}Pn(new fn(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A1="firebase-heartbeat-database",S1=1,zi="firebase-heartbeat-store";let hc=null;function mm(){return hc||(hc=pm(A1,S1,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(zi)}catch(n){console.warn(n)}}}}).catch(t=>{throw vs.create("idb-open",{originalErrorMessage:t.message})})),hc}async function C1(t){try{const n=(await mm()).transaction(zi),s=await n.objectStore(zi).get(ym(t));return await n.done,s}catch(e){if(e instanceof mn)Yn.warn(e.message);else{const n=vs.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Yn.warn(n.message)}}}async function If(t,e){try{const s=(await mm()).transaction(zi,"readwrite");await s.objectStore(zi).put(e,ym(t)),await s.done}catch(n){if(n instanceof mn)Yn.warn(n.message);else{const s=vs.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Yn.warn(s.message)}}}function ym(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R1=1024,P1=30*24*60*60*1e3;class M1{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new N1(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Tf();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:r}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=P1}),this._storage.overwrite(this._heartbeatsCache))}catch(s){Yn.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Tf(),{heartbeatsToSend:s,unsentEntries:r}=O1(this._heartbeatsCache.heartbeats),i=xa(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return Yn.warn(n),""}}}function Tf(){return new Date().toISOString().substring(0,10)}function O1(t,e=R1){const n=[];let s=t.slice();for(const r of t){const i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),Ef(n)>e){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),Ef(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class N1{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return xu()?Iu().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await C1(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return If(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return If(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Ef(t){return xa(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D1(t){Pn(new fn("platform-logger",e=>new Gw(e),"PRIVATE")),Pn(new fn("heartbeat",e=>new M1(e),"PRIVATE")),nn(Vc,wf,t),nn(Vc,wf,"esm2017"),nn("fire-js","")}D1("");var V1="firebase",L1="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */nn(V1,L1,"app");const _m="@firebase/installations",ku="0.6.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vm=1e4,bm=`w:${ku}`,wm="FIS_v2",F1="https://firebaseinstallations.googleapis.com/v1",$1=60*60*1e3,U1="installations",j1="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B1={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},tr=new cr(U1,j1,B1);function xm(t){return t instanceof mn&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Im({projectId:t}){return`${F1}/projects/${t}/installations`}function Tm(t){return{token:t.token,requestStatus:2,expiresIn:q1(t.expiresIn),creationTime:Date.now()}}async function Em(t,e){const s=(await e.json()).error;return tr.create("request-failed",{requestName:t,serverCode:s.code,serverMessage:s.message,serverStatus:s.status})}function km({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function z1(t,{refreshToken:e}){const n=km(t);return n.append("Authorization",H1(e)),n}async function Am(t){const e=await t();return e.status>=500&&e.status<600?t():e}function q1(t){return Number(t.replace("s","000"))}function H1(t){return`${wm} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function W1({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const s=Im(t),r=km(t),i=e.getImmediate({optional:!0});if(i){const u=await i.getHeartbeatsHeader();u&&r.append("x-firebase-client",u)}const o={fid:n,authVersion:wm,appId:t.appId,sdkVersion:bm},l={method:"POST",headers:r,body:JSON.stringify(o)},c=await Am(()=>fetch(s,l));if(c.ok){const u=await c.json();return{fid:u.fid||n,registrationStatus:2,refreshToken:u.refreshToken,authToken:Tm(u.authToken)}}else throw await Em("Create Installation",c)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sm(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K1(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G1=/^[cdef][\w-]{21}$/,$c="";function Q1(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=Y1(t);return G1.test(n)?n:$c}catch{return $c}}function Y1(t){return K1(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dl(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cm=new Map;function Rm(t,e){const n=dl(t);Pm(n,e),J1(n,e)}function Pm(t,e){const n=Cm.get(t);if(n)for(const s of n)s(e)}function J1(t,e){const n=X1();n&&n.postMessage({key:t,fid:e}),Z1()}let Gs=null;function X1(){return!Gs&&"BroadcastChannel"in self&&(Gs=new BroadcastChannel("[Firebase] FID Change"),Gs.onmessage=t=>{Pm(t.data.key,t.data.fid)}),Gs}function Z1(){Cm.size===0&&Gs&&(Gs.close(),Gs=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ex="firebase-installations-database",tx=1,nr="firebase-installations-store";let fc=null;function Au(){return fc||(fc=pm(ex,tx,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(nr)}}})),fc}async function Ta(t,e){const n=dl(t),r=(await Au()).transaction(nr,"readwrite"),i=r.objectStore(nr),o=await i.get(n);return await i.put(e,n),await r.done,(!o||o.fid!==e.fid)&&Rm(t,e.fid),e}async function Mm(t){const e=dl(t),s=(await Au()).transaction(nr,"readwrite");await s.objectStore(nr).delete(e),await s.done}async function hl(t,e){const n=dl(t),r=(await Au()).transaction(nr,"readwrite"),i=r.objectStore(nr),o=await i.get(n),l=e(o);return l===void 0?await i.delete(n):await i.put(l,n),await r.done,l&&(!o||o.fid!==l.fid)&&Rm(t,l.fid),l}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Su(t){let e;const n=await hl(t.appConfig,s=>{const r=nx(s),i=sx(t,r);return e=i.registrationPromise,i.installationEntry});return n.fid===$c?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function nx(t){const e=t||{fid:Q1(),registrationStatus:0};return Om(e)}function sx(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const r=Promise.reject(tr.create("app-offline"));return{installationEntry:e,registrationPromise:r}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},s=rx(t,n);return{installationEntry:n,registrationPromise:s}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:ix(t)}:{installationEntry:e}}async function rx(t,e){try{const n=await W1(t,e);return Ta(t.appConfig,n)}catch(n){throw xm(n)&&n.customData.serverCode===409?await Mm(t.appConfig):await Ta(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function ix(t){let e=await kf(t.appConfig);for(;e.registrationStatus===1;)await Sm(100),e=await kf(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:s}=await Su(t);return s||n}return e}function kf(t){return hl(t,e=>{if(!e)throw tr.create("installation-not-found");return Om(e)})}function Om(t){return ox(t)?{fid:t.fid,registrationStatus:0}:t}function ox(t){return t.registrationStatus===1&&t.registrationTime+vm<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ax({appConfig:t,heartbeatServiceProvider:e},n){const s=lx(t,n),r=z1(t,n),i=e.getImmediate({optional:!0});if(i){const u=await i.getHeartbeatsHeader();u&&r.append("x-firebase-client",u)}const o={installation:{sdkVersion:bm,appId:t.appId}},l={method:"POST",headers:r,body:JSON.stringify(o)},c=await Am(()=>fetch(s,l));if(c.ok){const u=await c.json();return Tm(u)}else throw await Em("Generate Auth Token",c)}function lx(t,{fid:e}){return`${Im(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cu(t,e=!1){let n;const s=await hl(t.appConfig,i=>{if(!Nm(i))throw tr.create("not-registered");const o=i.authToken;if(!e&&dx(o))return i;if(o.requestStatus===1)return n=cx(t,e),i;{if(!navigator.onLine)throw tr.create("app-offline");const l=fx(i);return n=ux(t,l),l}});return n?await n:s.authToken}async function cx(t,e){let n=await Af(t.appConfig);for(;n.authToken.requestStatus===1;)await Sm(100),n=await Af(t.appConfig);const s=n.authToken;return s.requestStatus===0?Cu(t,e):s}function Af(t){return hl(t,e=>{if(!Nm(e))throw tr.create("not-registered");const n=e.authToken;return px(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function ux(t,e){try{const n=await ax(t,e),s=Object.assign(Object.assign({},e),{authToken:n});return await Ta(t.appConfig,s),n}catch(n){if(xm(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Mm(t.appConfig);else{const s=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Ta(t.appConfig,s)}throw n}}function Nm(t){return t!==void 0&&t.registrationStatus===2}function dx(t){return t.requestStatus===2&&!hx(t)}function hx(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+$1}function fx(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function px(t){return t.requestStatus===1&&t.requestTime+vm<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gx(t){const e=t,{installationEntry:n,registrationPromise:s}=await Su(e);return s?s.catch(console.error):Cu(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mx(t,e=!1){const n=t;return await yx(n),(await Cu(n,e)).token}async function yx(t){const{registrationPromise:e}=await Su(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _x(t){if(!t||!t.options)throw pc("App Configuration");if(!t.name)throw pc("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw pc(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function pc(t){return tr.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dm="installations",vx="installations-internal",bx=t=>{const e=t.getProvider("app").getImmediate(),n=_x(e),s=ur(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:s,_delete:()=>Promise.resolve()}},wx=t=>{const e=t.getProvider("app").getImmediate(),n=ur(e,Dm).getImmediate();return{getId:()=>gx(n),getToken:r=>mx(n,r)}};function xx(){Pn(new fn(Dm,bx,"PUBLIC")),Pn(new fn(vx,wx,"PRIVATE"))}xx();nn(_m,ku);nn(_m,ku,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ea="analytics",Ix="firebase_id",Tx="origin",Ex=60*1e3,kx="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Ru="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bt=new ul("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ax={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Yt=new cr("analytics","Analytics",Ax);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sx(t){if(!t.startsWith(Ru)){const e=Yt.create("invalid-gtag-resource",{gtagURL:t});return Bt.warn(e.message),""}return t}function Vm(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function Cx(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function Rx(t,e){const n=Cx("firebase-js-sdk-policy",{createScriptURL:Sx}),s=document.createElement("script"),r=`${Ru}?l=${t}&id=${e}`;s.src=n?n==null?void 0:n.createScriptURL(r):r,s.async=!0,document.head.appendChild(s)}function Px(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function Mx(t,e,n,s,r,i){const o=s[r];try{if(o)await e[o];else{const c=(await Vm(n)).find(u=>u.measurementId===r);c&&await e[c.appId]}}catch(l){Bt.error(l)}t("config",r,i)}async function Ox(t,e,n,s,r){try{let i=[];if(r&&r.send_to){let o=r.send_to;Array.isArray(o)||(o=[o]);const l=await Vm(n);for(const c of o){const u=l.find(g=>g.measurementId===c),h=u&&e[u.appId];if(h)i.push(h);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),t("event",s,r||{})}catch(i){Bt.error(i)}}function Nx(t,e,n,s){async function r(i,...o){try{if(i==="event"){const[l,c]=o;await Ox(t,e,n,l,c)}else if(i==="config"){const[l,c]=o;await Mx(t,e,n,s,l,c)}else if(i==="consent"){const[l,c]=o;t("consent",l,c)}else if(i==="get"){const[l,c,u]=o;t("get",l,c,u)}else if(i==="set"){const[l]=o;t("set",l)}else t(i,...o)}catch(l){Bt.error(l)}}return r}function Dx(t,e,n,s,r){let i=function(...o){window[s].push(arguments)};return window[r]&&typeof window[r]=="function"&&(i=window[r]),window[r]=Nx(i,t,e,n),{gtagCore:i,wrappedGtag:window[r]}}function Vx(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(Ru)&&n.src.includes(t))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lx=30,Fx=1e3;class $x{constructor(e={},n=Fx){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Lm=new $x;function Ux(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function jx(t){var e;const{appId:n,apiKey:s}=t,r={method:"GET",headers:Ux(s)},i=kx.replace("{app-id}",n),o=await fetch(i,r);if(o.status!==200&&o.status!==304){let l="";try{const c=await o.json();!((e=c.error)===null||e===void 0)&&e.message&&(l=c.error.message)}catch{}throw Yt.create("config-fetch-failed",{httpStatus:o.status,responseMessage:l})}return o.json()}async function Bx(t,e=Lm,n){const{appId:s,apiKey:r,measurementId:i}=t.options;if(!s)throw Yt.create("no-app-id");if(!r){if(i)return{measurementId:i,appId:s};throw Yt.create("no-api-key")}const o=e.getThrottleMetadata(s)||{backoffCount:0,throttleEndTimeMillis:Date.now()},l=new Hx;return setTimeout(async()=>{l.abort()},Ex),Fm({appId:s,apiKey:r,measurementId:i},o,l,e)}async function Fm(t,{throttleEndTimeMillis:e,backoffCount:n},s,r=Lm){var i;const{appId:o,measurementId:l}=t;try{await zx(s,e)}catch(c){if(l)return Bt.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:o,measurementId:l};throw c}try{const c=await jx(t);return r.deleteThrottleMetadata(o),c}catch(c){const u=c;if(!qx(u)){if(r.deleteThrottleMetadata(o),l)return Bt.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:o,measurementId:l};throw c}const h=Number((i=u==null?void 0:u.customData)===null||i===void 0?void 0:i.httpStatus)===503?yf(n,r.intervalMillis,Lx):yf(n,r.intervalMillis),g={throttleEndTimeMillis:Date.now()+h,backoffCount:n+1};return r.setThrottleMetadata(o,g),Bt.debug(`Calling attemptFetch again in ${h} millis`),Fm(t,g,s,r)}}function zx(t,e){return new Promise((n,s)=>{const r=Math.max(e-Date.now(),0),i=setTimeout(n,r);t.addEventListener(()=>{clearTimeout(i),s(Yt.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function qx(t){if(!(t instanceof mn)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class Hx{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function Wx(t,e,n,s,r){if(r&&r.global){t("event",n,s);return}else{const i=await e,o=Object.assign(Object.assign({},s),{send_to:i});t("event",n,o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kx(){if(xu())try{await Iu()}catch(t){return Bt.warn(Yt.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return Bt.warn(Yt.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function Gx(t,e,n,s,r,i,o){var l;const c=Bx(t);c.then(m=>{n[m.measurementId]=m.appId,t.options.measurementId&&m.measurementId!==t.options.measurementId&&Bt.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${m.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(m=>Bt.error(m)),e.push(c);const u=Kx().then(m=>{if(m)return s.getId()}),[h,g]=await Promise.all([c,u]);Vx(i)||Rx(i,h.measurementId),r("js",new Date);const y=(l=o==null?void 0:o.config)!==null&&l!==void 0?l:{};return y[Tx]="firebase",y.update=!0,g!=null&&(y[Ix]=g),r("config",h.measurementId,y),h.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qx{constructor(e){this.app=e}_delete(){return delete ki[this.app.options.appId],Promise.resolve()}}let ki={},Sf=[];const Cf={};let gc="dataLayer",Yx="gtag",Rf,$m,Pf=!1;function Jx(){const t=[];if(wu()&&t.push("This is a browser extension environment."),dm()||t.push("Cookies are not available."),t.length>0){const e=t.map((s,r)=>`(${r+1}) ${s}`).join(" "),n=Yt.create("invalid-analytics-context",{errorInfo:e});Bt.warn(n.message)}}function Xx(t,e,n){Jx();const s=t.options.appId;if(!s)throw Yt.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)Bt.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Yt.create("no-api-key");if(ki[s]!=null)throw Yt.create("already-exists",{id:s});if(!Pf){Px(gc);const{wrappedGtag:i,gtagCore:o}=Dx(ki,Sf,Cf,gc,Yx);$m=i,Rf=o,Pf=!0}return ki[s]=Gx(t,Sf,Cf,e,Rf,gc,n),new Qx(t)}function Zx(t=Eu()){t=Ye(t);const e=ur(t,Ea);return e.isInitialized()?e.getImmediate():eI(t)}function eI(t,e={}){const n=ur(t,Ea);if(n.isInitialized()){const r=n.getImmediate();if(Bi(e,n.getOptions()))return r;throw Yt.create("already-initialized")}return n.initialize({options:e})}async function tI(){if(wu()||!dm()||!xu())return!1;try{return await Iu()}catch{return!1}}function nI(t,e,n,s){t=Ye(t),Wx($m,ki[t.app.options.appId],e,n,s).catch(r=>Bt.error(r))}const Mf="@firebase/analytics",Of="0.10.8";function sI(){Pn(new fn(Ea,(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("installations-internal").getImmediate();return Xx(s,r,n)},"PUBLIC")),Pn(new fn("analytics-internal",t,"PRIVATE")),nn(Mf,Of),nn(Mf,Of,"esm2017");function t(e){try{const n=e.getProvider(Ea).getImmediate();return{logEvent:(s,r,i)=>nI(n,s,r,i)}}catch(n){throw Yt.create("interop-component-reg-failed",{reason:n})}}}sI();var Nf=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Zs,Um;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(R,w){function b(){}b.prototype=w.prototype,R.D=w.prototype,R.prototype=new b,R.prototype.constructor=R,R.C=function(E,C,T){for(var I=Array(arguments.length-2),Ve=2;Ve<arguments.length;Ve++)I[Ve-2]=arguments[Ve];return w.prototype[C].apply(E,I)}}function n(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(s,n),s.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(R,w,b){b||(b=0);var E=Array(16);if(typeof w=="string")for(var C=0;16>C;++C)E[C]=w.charCodeAt(b++)|w.charCodeAt(b++)<<8|w.charCodeAt(b++)<<16|w.charCodeAt(b++)<<24;else for(C=0;16>C;++C)E[C]=w[b++]|w[b++]<<8|w[b++]<<16|w[b++]<<24;w=R.g[0],b=R.g[1],C=R.g[2];var T=R.g[3],I=w+(T^b&(C^T))+E[0]+3614090360&4294967295;w=b+(I<<7&4294967295|I>>>25),I=T+(C^w&(b^C))+E[1]+3905402710&4294967295,T=w+(I<<12&4294967295|I>>>20),I=C+(b^T&(w^b))+E[2]+606105819&4294967295,C=T+(I<<17&4294967295|I>>>15),I=b+(w^C&(T^w))+E[3]+3250441966&4294967295,b=C+(I<<22&4294967295|I>>>10),I=w+(T^b&(C^T))+E[4]+4118548399&4294967295,w=b+(I<<7&4294967295|I>>>25),I=T+(C^w&(b^C))+E[5]+1200080426&4294967295,T=w+(I<<12&4294967295|I>>>20),I=C+(b^T&(w^b))+E[6]+2821735955&4294967295,C=T+(I<<17&4294967295|I>>>15),I=b+(w^C&(T^w))+E[7]+4249261313&4294967295,b=C+(I<<22&4294967295|I>>>10),I=w+(T^b&(C^T))+E[8]+1770035416&4294967295,w=b+(I<<7&4294967295|I>>>25),I=T+(C^w&(b^C))+E[9]+2336552879&4294967295,T=w+(I<<12&4294967295|I>>>20),I=C+(b^T&(w^b))+E[10]+4294925233&4294967295,C=T+(I<<17&4294967295|I>>>15),I=b+(w^C&(T^w))+E[11]+2304563134&4294967295,b=C+(I<<22&4294967295|I>>>10),I=w+(T^b&(C^T))+E[12]+1804603682&4294967295,w=b+(I<<7&4294967295|I>>>25),I=T+(C^w&(b^C))+E[13]+4254626195&4294967295,T=w+(I<<12&4294967295|I>>>20),I=C+(b^T&(w^b))+E[14]+2792965006&4294967295,C=T+(I<<17&4294967295|I>>>15),I=b+(w^C&(T^w))+E[15]+1236535329&4294967295,b=C+(I<<22&4294967295|I>>>10),I=w+(C^T&(b^C))+E[1]+4129170786&4294967295,w=b+(I<<5&4294967295|I>>>27),I=T+(b^C&(w^b))+E[6]+3225465664&4294967295,T=w+(I<<9&4294967295|I>>>23),I=C+(w^b&(T^w))+E[11]+643717713&4294967295,C=T+(I<<14&4294967295|I>>>18),I=b+(T^w&(C^T))+E[0]+3921069994&4294967295,b=C+(I<<20&4294967295|I>>>12),I=w+(C^T&(b^C))+E[5]+3593408605&4294967295,w=b+(I<<5&4294967295|I>>>27),I=T+(b^C&(w^b))+E[10]+38016083&4294967295,T=w+(I<<9&4294967295|I>>>23),I=C+(w^b&(T^w))+E[15]+3634488961&4294967295,C=T+(I<<14&4294967295|I>>>18),I=b+(T^w&(C^T))+E[4]+3889429448&4294967295,b=C+(I<<20&4294967295|I>>>12),I=w+(C^T&(b^C))+E[9]+568446438&4294967295,w=b+(I<<5&4294967295|I>>>27),I=T+(b^C&(w^b))+E[14]+3275163606&4294967295,T=w+(I<<9&4294967295|I>>>23),I=C+(w^b&(T^w))+E[3]+4107603335&4294967295,C=T+(I<<14&4294967295|I>>>18),I=b+(T^w&(C^T))+E[8]+1163531501&4294967295,b=C+(I<<20&4294967295|I>>>12),I=w+(C^T&(b^C))+E[13]+2850285829&4294967295,w=b+(I<<5&4294967295|I>>>27),I=T+(b^C&(w^b))+E[2]+4243563512&4294967295,T=w+(I<<9&4294967295|I>>>23),I=C+(w^b&(T^w))+E[7]+1735328473&4294967295,C=T+(I<<14&4294967295|I>>>18),I=b+(T^w&(C^T))+E[12]+2368359562&4294967295,b=C+(I<<20&4294967295|I>>>12),I=w+(b^C^T)+E[5]+4294588738&4294967295,w=b+(I<<4&4294967295|I>>>28),I=T+(w^b^C)+E[8]+2272392833&4294967295,T=w+(I<<11&4294967295|I>>>21),I=C+(T^w^b)+E[11]+1839030562&4294967295,C=T+(I<<16&4294967295|I>>>16),I=b+(C^T^w)+E[14]+4259657740&4294967295,b=C+(I<<23&4294967295|I>>>9),I=w+(b^C^T)+E[1]+2763975236&4294967295,w=b+(I<<4&4294967295|I>>>28),I=T+(w^b^C)+E[4]+1272893353&4294967295,T=w+(I<<11&4294967295|I>>>21),I=C+(T^w^b)+E[7]+4139469664&4294967295,C=T+(I<<16&4294967295|I>>>16),I=b+(C^T^w)+E[10]+3200236656&4294967295,b=C+(I<<23&4294967295|I>>>9),I=w+(b^C^T)+E[13]+681279174&4294967295,w=b+(I<<4&4294967295|I>>>28),I=T+(w^b^C)+E[0]+3936430074&4294967295,T=w+(I<<11&4294967295|I>>>21),I=C+(T^w^b)+E[3]+3572445317&4294967295,C=T+(I<<16&4294967295|I>>>16),I=b+(C^T^w)+E[6]+76029189&4294967295,b=C+(I<<23&4294967295|I>>>9),I=w+(b^C^T)+E[9]+3654602809&4294967295,w=b+(I<<4&4294967295|I>>>28),I=T+(w^b^C)+E[12]+3873151461&4294967295,T=w+(I<<11&4294967295|I>>>21),I=C+(T^w^b)+E[15]+530742520&4294967295,C=T+(I<<16&4294967295|I>>>16),I=b+(C^T^w)+E[2]+3299628645&4294967295,b=C+(I<<23&4294967295|I>>>9),I=w+(C^(b|~T))+E[0]+4096336452&4294967295,w=b+(I<<6&4294967295|I>>>26),I=T+(b^(w|~C))+E[7]+1126891415&4294967295,T=w+(I<<10&4294967295|I>>>22),I=C+(w^(T|~b))+E[14]+2878612391&4294967295,C=T+(I<<15&4294967295|I>>>17),I=b+(T^(C|~w))+E[5]+4237533241&4294967295,b=C+(I<<21&4294967295|I>>>11),I=w+(C^(b|~T))+E[12]+1700485571&4294967295,w=b+(I<<6&4294967295|I>>>26),I=T+(b^(w|~C))+E[3]+2399980690&4294967295,T=w+(I<<10&4294967295|I>>>22),I=C+(w^(T|~b))+E[10]+4293915773&4294967295,C=T+(I<<15&4294967295|I>>>17),I=b+(T^(C|~w))+E[1]+2240044497&4294967295,b=C+(I<<21&4294967295|I>>>11),I=w+(C^(b|~T))+E[8]+1873313359&4294967295,w=b+(I<<6&4294967295|I>>>26),I=T+(b^(w|~C))+E[15]+4264355552&4294967295,T=w+(I<<10&4294967295|I>>>22),I=C+(w^(T|~b))+E[6]+2734768916&4294967295,C=T+(I<<15&4294967295|I>>>17),I=b+(T^(C|~w))+E[13]+1309151649&4294967295,b=C+(I<<21&4294967295|I>>>11),I=w+(C^(b|~T))+E[4]+4149444226&4294967295,w=b+(I<<6&4294967295|I>>>26),I=T+(b^(w|~C))+E[11]+3174756917&4294967295,T=w+(I<<10&4294967295|I>>>22),I=C+(w^(T|~b))+E[2]+718787259&4294967295,C=T+(I<<15&4294967295|I>>>17),I=b+(T^(C|~w))+E[9]+3951481745&4294967295,R.g[0]=R.g[0]+w&4294967295,R.g[1]=R.g[1]+(C+(I<<21&4294967295|I>>>11))&4294967295,R.g[2]=R.g[2]+C&4294967295,R.g[3]=R.g[3]+T&4294967295}s.prototype.u=function(R,w){w===void 0&&(w=R.length);for(var b=w-this.blockSize,E=this.B,C=this.h,T=0;T<w;){if(C==0)for(;T<=b;)r(this,R,T),T+=this.blockSize;if(typeof R=="string"){for(;T<w;)if(E[C++]=R.charCodeAt(T++),C==this.blockSize){r(this,E),C=0;break}}else for(;T<w;)if(E[C++]=R[T++],C==this.blockSize){r(this,E),C=0;break}}this.h=C,this.o+=w},s.prototype.v=function(){var R=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);R[0]=128;for(var w=1;w<R.length-8;++w)R[w]=0;var b=8*this.o;for(w=R.length-8;w<R.length;++w)R[w]=b&255,b/=256;for(this.u(R),R=Array(16),w=b=0;4>w;++w)for(var E=0;32>E;E+=8)R[b++]=this.g[w]>>>E&255;return R};function i(R,w){var b=l;return Object.prototype.hasOwnProperty.call(b,R)?b[R]:b[R]=w(R)}function o(R,w){this.h=w;for(var b=[],E=!0,C=R.length-1;0<=C;C--){var T=R[C]|0;E&&T==w||(b[C]=T,E=!1)}this.g=b}var l={};function c(R){return-128<=R&&128>R?i(R,function(w){return new o([w|0],0>w?-1:0)}):new o([R|0],0>R?-1:0)}function u(R){if(isNaN(R)||!isFinite(R))return g;if(0>R)return M(u(-R));for(var w=[],b=1,E=0;R>=b;E++)w[E]=R/b|0,b*=4294967296;return new o(w,0)}function h(R,w){if(R.length==0)throw Error("number format error: empty string");if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(R.charAt(0)=="-")return M(h(R.substring(1),w));if(0<=R.indexOf("-"))throw Error('number format error: interior "-" character');for(var b=u(Math.pow(w,8)),E=g,C=0;C<R.length;C+=8){var T=Math.min(8,R.length-C),I=parseInt(R.substring(C,C+T),w);8>T?(T=u(Math.pow(w,T)),E=E.j(T).add(u(I))):(E=E.j(b),E=E.add(u(I)))}return E}var g=c(0),y=c(1),m=c(16777216);t=o.prototype,t.m=function(){if(A(this))return-M(this).m();for(var R=0,w=1,b=0;b<this.g.length;b++){var E=this.i(b);R+=(0<=E?E:4294967296+E)*w,w*=4294967296}return R},t.toString=function(R){if(R=R||10,2>R||36<R)throw Error("radix out of range: "+R);if(_(this))return"0";if(A(this))return"-"+M(this).toString(R);for(var w=u(Math.pow(R,6)),b=this,E="";;){var C=Y(b,w).g;b=W(b,C.j(w));var T=((0<b.g.length?b.g[0]:b.h)>>>0).toString(R);if(b=C,_(b))return T+E;for(;6>T.length;)T="0"+T;E=T+E}},t.i=function(R){return 0>R?0:R<this.g.length?this.g[R]:this.h};function _(R){if(R.h!=0)return!1;for(var w=0;w<R.g.length;w++)if(R.g[w]!=0)return!1;return!0}function A(R){return R.h==-1}t.l=function(R){return R=W(this,R),A(R)?-1:_(R)?0:1};function M(R){for(var w=R.g.length,b=[],E=0;E<w;E++)b[E]=~R.g[E];return new o(b,~R.h).add(y)}t.abs=function(){return A(this)?M(this):this},t.add=function(R){for(var w=Math.max(this.g.length,R.g.length),b=[],E=0,C=0;C<=w;C++){var T=E+(this.i(C)&65535)+(R.i(C)&65535),I=(T>>>16)+(this.i(C)>>>16)+(R.i(C)>>>16);E=I>>>16,T&=65535,I&=65535,b[C]=I<<16|T}return new o(b,b[b.length-1]&-2147483648?-1:0)};function W(R,w){return R.add(M(w))}t.j=function(R){if(_(this)||_(R))return g;if(A(this))return A(R)?M(this).j(M(R)):M(M(this).j(R));if(A(R))return M(this.j(M(R)));if(0>this.l(m)&&0>R.l(m))return u(this.m()*R.m());for(var w=this.g.length+R.g.length,b=[],E=0;E<2*w;E++)b[E]=0;for(E=0;E<this.g.length;E++)for(var C=0;C<R.g.length;C++){var T=this.i(E)>>>16,I=this.i(E)&65535,Ve=R.i(C)>>>16,ct=R.i(C)&65535;b[2*E+2*C]+=I*ct,H(b,2*E+2*C),b[2*E+2*C+1]+=T*ct,H(b,2*E+2*C+1),b[2*E+2*C+1]+=I*Ve,H(b,2*E+2*C+1),b[2*E+2*C+2]+=T*Ve,H(b,2*E+2*C+2)}for(E=0;E<w;E++)b[E]=b[2*E+1]<<16|b[2*E];for(E=w;E<2*w;E++)b[E]=0;return new o(b,0)};function H(R,w){for(;(R[w]&65535)!=R[w];)R[w+1]+=R[w]>>>16,R[w]&=65535,w++}function te(R,w){this.g=R,this.h=w}function Y(R,w){if(_(w))throw Error("division by zero");if(_(R))return new te(g,g);if(A(R))return w=Y(M(R),w),new te(M(w.g),M(w.h));if(A(w))return w=Y(R,M(w)),new te(M(w.g),w.h);if(30<R.g.length){if(A(R)||A(w))throw Error("slowDivide_ only works with positive integers.");for(var b=y,E=w;0>=E.l(R);)b=oe(b),E=oe(E);var C=me(b,1),T=me(E,1);for(E=me(E,2),b=me(b,2);!_(E);){var I=T.add(E);0>=I.l(R)&&(C=C.add(b),T=I),E=me(E,1),b=me(b,1)}return w=W(R,C.j(w)),new te(C,w)}for(C=g;0<=R.l(w);){for(b=Math.max(1,Math.floor(R.m()/w.m())),E=Math.ceil(Math.log(b)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),T=u(b),I=T.j(w);A(I)||0<I.l(R);)b-=E,T=u(b),I=T.j(w);_(T)&&(T=y),C=C.add(T),R=W(R,I)}return new te(C,R)}t.A=function(R){return Y(this,R).h},t.and=function(R){for(var w=Math.max(this.g.length,R.g.length),b=[],E=0;E<w;E++)b[E]=this.i(E)&R.i(E);return new o(b,this.h&R.h)},t.or=function(R){for(var w=Math.max(this.g.length,R.g.length),b=[],E=0;E<w;E++)b[E]=this.i(E)|R.i(E);return new o(b,this.h|R.h)},t.xor=function(R){for(var w=Math.max(this.g.length,R.g.length),b=[],E=0;E<w;E++)b[E]=this.i(E)^R.i(E);return new o(b,this.h^R.h)};function oe(R){for(var w=R.g.length+1,b=[],E=0;E<w;E++)b[E]=R.i(E)<<1|R.i(E-1)>>>31;return new o(b,R.h)}function me(R,w){var b=w>>5;w%=32;for(var E=R.g.length-b,C=[],T=0;T<E;T++)C[T]=0<w?R.i(T+b)>>>w|R.i(T+b+1)<<32-w:R.i(T+b);return new o(C,R.h)}s.prototype.digest=s.prototype.v,s.prototype.reset=s.prototype.s,s.prototype.update=s.prototype.u,Um=s,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=h,Zs=o}).apply(typeof Nf<"u"?Nf:typeof self<"u"?self:typeof window<"u"?window:{});var zo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var jm,gi,Bm,Xo,Uc,zm,qm,Hm;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,d,p){return a==Array.prototype||a==Object.prototype||(a[d]=p.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof zo=="object"&&zo];for(var d=0;d<a.length;++d){var p=a[d];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var s=n(this);function r(a,d){if(d)e:{var p=s;a=a.split(".");for(var v=0;v<a.length-1;v++){var P=a[v];if(!(P in p))break e;p=p[P]}a=a[a.length-1],v=p[a],d=d(v),d!=v&&d!=null&&e(p,a,{configurable:!0,writable:!0,value:d})}}function i(a,d){a instanceof String&&(a+="");var p=0,v=!1,P={next:function(){if(!v&&p<a.length){var D=p++;return{value:d(D,a[D]),done:!1}}return v=!0,{done:!0,value:void 0}}};return P[Symbol.iterator]=function(){return P},P}r("Array.prototype.values",function(a){return a||function(){return i(this,function(d,p){return p})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function c(a){var d=typeof a;return d=d!="object"?d:a?Array.isArray(a)?"array":d:"null",d=="array"||d=="object"&&typeof a.length=="number"}function u(a){var d=typeof a;return d=="object"&&a!=null||d=="function"}function h(a,d,p){return a.call.apply(a.bind,arguments)}function g(a,d,p){if(!a)throw Error();if(2<arguments.length){var v=Array.prototype.slice.call(arguments,2);return function(){var P=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(P,v),a.apply(d,P)}}return function(){return a.apply(d,arguments)}}function y(a,d,p){return y=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?h:g,y.apply(null,arguments)}function m(a,d){var p=Array.prototype.slice.call(arguments,1);return function(){var v=p.slice();return v.push.apply(v,arguments),a.apply(this,v)}}function _(a,d){function p(){}p.prototype=d.prototype,a.aa=d.prototype,a.prototype=new p,a.prototype.constructor=a,a.Qb=function(v,P,D){for(var X=Array(arguments.length-2),Ue=2;Ue<arguments.length;Ue++)X[Ue-2]=arguments[Ue];return d.prototype[P].apply(v,X)}}function A(a){const d=a.length;if(0<d){const p=Array(d);for(let v=0;v<d;v++)p[v]=a[v];return p}return[]}function M(a,d){for(let p=1;p<arguments.length;p++){const v=arguments[p];if(c(v)){const P=a.length||0,D=v.length||0;a.length=P+D;for(let X=0;X<D;X++)a[P+X]=v[X]}else a.push(v)}}class W{constructor(d,p){this.i=d,this.j=p,this.h=0,this.g=null}get(){let d;return 0<this.h?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function H(a){return/^[\s\xa0]*$/.test(a)}function te(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function Y(a){return Y[" "](a),a}Y[" "]=function(){};var oe=te().indexOf("Gecko")!=-1&&!(te().toLowerCase().indexOf("webkit")!=-1&&te().indexOf("Edge")==-1)&&!(te().indexOf("Trident")!=-1||te().indexOf("MSIE")!=-1)&&te().indexOf("Edge")==-1;function me(a,d,p){for(const v in a)d.call(p,a[v],v,a)}function R(a,d){for(const p in a)d.call(void 0,a[p],p,a)}function w(a){const d={};for(const p in a)d[p]=a[p];return d}const b="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(a,d){let p,v;for(let P=1;P<arguments.length;P++){v=arguments[P];for(p in v)a[p]=v[p];for(let D=0;D<b.length;D++)p=b[D],Object.prototype.hasOwnProperty.call(v,p)&&(a[p]=v[p])}}function C(a){var d=1;a=a.split(":");const p=[];for(;0<d&&a.length;)p.push(a.shift()),d--;return a.length&&p.push(a.join(":")),p}function T(a){l.setTimeout(()=>{throw a},0)}function I(){var a=zt;let d=null;return a.g&&(d=a.g,a.g=a.g.next,a.g||(a.h=null),d.next=null),d}class Ve{constructor(){this.h=this.g=null}add(d,p){const v=ct.get();v.set(d,p),this.h?this.h.next=v:this.g=v,this.h=v}}var ct=new W(()=>new $e,a=>a.reset());class $e{constructor(){this.next=this.g=this.h=null}set(d,p){this.h=d,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let ye,Ae=!1,zt=new Ve,Dn=()=>{const a=l.Promise.resolve(void 0);ye=()=>{a.then(an)}};var an=()=>{for(var a;a=I();){try{a.h.call(a.g)}catch(p){T(p)}var d=ct;d.j(a),100>d.h&&(d.h++,a.next=d.g,d.g=a)}Ae=!1};function Xe(){this.s=this.s,this.C=this.C}Xe.prototype.s=!1,Xe.prototype.ma=function(){this.s||(this.s=!0,this.N())},Xe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function st(a,d){this.type=a,this.g=this.target=d,this.defaultPrevented=!1}st.prototype.h=function(){this.defaultPrevented=!0};var Kr=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,d=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const p=()=>{};l.addEventListener("test",p,d),l.removeEventListener("test",p,d)}catch{}return a}();function ln(a,d){if(st.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var p=this.type=a.type,v=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=d,d=a.relatedTarget){if(oe){e:{try{Y(d.nodeName);var P=!0;break e}catch{}P=!1}P||(d=null)}}else p=="mouseover"?d=a.fromElement:p=="mouseout"&&(d=a.toElement);this.relatedTarget=d,v?(this.clientX=v.clientX!==void 0?v.clientX:v.pageX,this.clientY=v.clientY!==void 0?v.clientY:v.pageY,this.screenX=v.screenX||0,this.screenY=v.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:j[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&ln.aa.h.call(this)}}_(ln,st);var j={2:"touch",3:"pen",4:"mouse"};ln.prototype.h=function(){ln.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var O="closure_listenable_"+(1e6*Math.random()|0),Se=0;function Ze(a,d,p,v,P){this.listener=a,this.proxy=null,this.src=d,this.type=p,this.capture=!!v,this.ha=P,this.key=++Se,this.da=this.fa=!1}function rt(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Q(a){this.src=a,this.g={},this.h=0}Q.prototype.add=function(a,d,p,v,P){var D=a.toString();a=this.g[D],a||(a=this.g[D]=[],this.h++);var X=S(a,d,v,P);return-1<X?(d=a[X],p||(d.fa=!1)):(d=new Ze(d,this.src,D,!!v,P),d.fa=p,a.push(d)),d};function x(a,d){var p=d.type;if(p in a.g){var v=a.g[p],P=Array.prototype.indexOf.call(v,d,void 0),D;(D=0<=P)&&Array.prototype.splice.call(v,P,1),D&&(rt(d),a.g[p].length==0&&(delete a.g[p],a.h--))}}function S(a,d,p,v){for(var P=0;P<a.length;++P){var D=a[P];if(!D.da&&D.listener==d&&D.capture==!!p&&D.ha==v)return P}return-1}var N="closure_lm_"+(1e6*Math.random()|0),B={};function V(a,d,p,v,P){if(Array.isArray(d)){for(var D=0;D<d.length;D++)V(a,d[D],p,v,P);return null}return p=he(p),a&&a[O]?a.K(d,p,u(v)?!!v.capture:!1,P):U(a,d,p,!1,v,P)}function U(a,d,p,v,P,D){if(!d)throw Error("Invalid event type");var X=u(P)?!!P.capture:!!P,Ue=ne(a);if(Ue||(a[N]=Ue=new Q(a)),p=Ue.add(d,p,v,X,D),p.proxy)return p;if(v=Z(),p.proxy=v,v.src=a,v.listener=p,a.addEventListener)Kr||(P=X),P===void 0&&(P=!1),a.addEventListener(d.toString(),v,P);else if(a.attachEvent)a.attachEvent(L(d.toString()),v);else if(a.addListener&&a.removeListener)a.addListener(v);else throw Error("addEventListener and attachEvent are unavailable.");return p}function Z(){function a(p){return d.call(a.src,a.listener,p)}const d=ce;return a}function J(a,d,p,v,P){if(Array.isArray(d))for(var D=0;D<d.length;D++)J(a,d[D],p,v,P);else v=u(v)?!!v.capture:!!v,p=he(p),a&&a[O]?(a=a.i,d=String(d).toString(),d in a.g&&(D=a.g[d],p=S(D,p,v,P),-1<p&&(rt(D[p]),Array.prototype.splice.call(D,p,1),D.length==0&&(delete a.g[d],a.h--)))):a&&(a=ne(a))&&(d=a.g[d.toString()],a=-1,d&&(a=S(d,p,v,P)),(p=-1<a?d[a]:null)&&K(p))}function K(a){if(typeof a!="number"&&a&&!a.da){var d=a.src;if(d&&d[O])x(d.i,a);else{var p=a.type,v=a.proxy;d.removeEventListener?d.removeEventListener(p,v,a.capture):d.detachEvent?d.detachEvent(L(p),v):d.addListener&&d.removeListener&&d.removeListener(v),(p=ne(d))?(x(p,a),p.h==0&&(p.src=null,d[N]=null)):rt(a)}}}function L(a){return a in B?B[a]:B[a]="on"+a}function ce(a,d){if(a.da)a=!0;else{d=new ln(d,this);var p=a.listener,v=a.ha||a.src;a.fa&&K(a),a=p.call(v,d)}return a}function ne(a){return a=a[N],a instanceof Q?a:null}var ie="__closure_events_fn_"+(1e9*Math.random()>>>0);function he(a){return typeof a=="function"?a:(a[ie]||(a[ie]=function(d){return a.handleEvent(d)}),a[ie])}function ue(){Xe.call(this),this.i=new Q(this),this.M=this,this.F=null}_(ue,Xe),ue.prototype[O]=!0,ue.prototype.removeEventListener=function(a,d,p,v){J(this,a,d,p,v)};function ve(a,d){var p,v=a.F;if(v)for(p=[];v;v=v.F)p.push(v);if(a=a.M,v=d.type||d,typeof d=="string")d=new st(d,a);else if(d instanceof st)d.target=d.target||a;else{var P=d;d=new st(v,a),E(d,P)}if(P=!0,p)for(var D=p.length-1;0<=D;D--){var X=d.g=p[D];P=Re(X,v,!0,d)&&P}if(X=d.g=a,P=Re(X,v,!0,d)&&P,P=Re(X,v,!1,d)&&P,p)for(D=0;D<p.length;D++)X=d.g=p[D],P=Re(X,v,!1,d)&&P}ue.prototype.N=function(){if(ue.aa.N.call(this),this.i){var a=this.i,d;for(d in a.g){for(var p=a.g[d],v=0;v<p.length;v++)rt(p[v]);delete a.g[d],a.h--}}this.F=null},ue.prototype.K=function(a,d,p,v){return this.i.add(String(a),d,!1,p,v)},ue.prototype.L=function(a,d,p,v){return this.i.add(String(a),d,!0,p,v)};function Re(a,d,p,v){if(d=a.i.g[String(d)],!d)return!0;d=d.concat();for(var P=!0,D=0;D<d.length;++D){var X=d[D];if(X&&!X.da&&X.capture==p){var Ue=X.listener,_t=X.ha||X.src;X.fa&&x(a.i,X),P=Ue.call(_t,v)!==!1&&P}}return P&&!v.defaultPrevented}function Ge(a,d,p){if(typeof a=="function")p&&(a=y(a,p));else if(a&&typeof a.handleEvent=="function")a=y(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(d)?-1:l.setTimeout(a,d||0)}function ot(a){a.g=Ge(()=>{a.g=null,a.i&&(a.i=!1,ot(a))},a.l);const d=a.h;a.h=null,a.m.apply(null,d)}class Xt extends Xe{constructor(d,p){super(),this.m=d,this.l=p,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:ot(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Tt(a){Xe.call(this),this.h=a,this.g={}}_(Tt,Xe);var ns=[];function Gr(a){me(a.g,function(d,p){this.g.hasOwnProperty(p)&&K(d)},a),a.g={}}Tt.prototype.N=function(){Tt.aa.N.call(this),Gr(this)},Tt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var yt=l.JSON.stringify,Zt=l.JSON.parse,xo=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function fr(){}fr.prototype.h=null;function Nd(a){return a.h||(a.h=a.i())}function Dd(){}var Qr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Dl(){st.call(this,"d")}_(Dl,st);function Vl(){st.call(this,"c")}_(Vl,st);var Os={},Vd=null;function Io(){return Vd=Vd||new ue}Os.La="serverreachability";function Ld(a){st.call(this,Os.La,a)}_(Ld,st);function Yr(a){const d=Io();ve(d,new Ld(d))}Os.STAT_EVENT="statevent";function Fd(a,d){st.call(this,Os.STAT_EVENT,a),this.stat=d}_(Fd,st);function Dt(a){const d=Io();ve(d,new Fd(d,a))}Os.Ma="timingevent";function $d(a,d){st.call(this,Os.Ma,a),this.size=d}_($d,st);function Jr(a,d){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},d)}function Xr(){this.g=!0}Xr.prototype.xa=function(){this.g=!1};function Ky(a,d,p,v,P,D){a.info(function(){if(a.g)if(D)for(var X="",Ue=D.split("&"),_t=0;_t<Ue.length;_t++){var Oe=Ue[_t].split("=");if(1<Oe.length){var Et=Oe[0];Oe=Oe[1];var kt=Et.split("_");X=2<=kt.length&&kt[1]=="type"?X+(Et+"="+Oe+"&"):X+(Et+"=redacted&")}}else X=null;else X=D;return"XMLHTTP REQ ("+v+") [attempt "+P+"]: "+d+`
`+p+`
`+X})}function Gy(a,d,p,v,P,D,X){a.info(function(){return"XMLHTTP RESP ("+v+") [ attempt "+P+"]: "+d+`
`+p+`
`+D+" "+X})}function pr(a,d,p,v){a.info(function(){return"XMLHTTP TEXT ("+d+"): "+Yy(a,p)+(v?" "+v:"")})}function Qy(a,d){a.info(function(){return"TIMEOUT: "+d})}Xr.prototype.info=function(){};function Yy(a,d){if(!a.g)return d;if(!d)return null;try{var p=JSON.parse(d);if(p){for(a=0;a<p.length;a++)if(Array.isArray(p[a])){var v=p[a];if(!(2>v.length)){var P=v[1];if(Array.isArray(P)&&!(1>P.length)){var D=P[0];if(D!="noop"&&D!="stop"&&D!="close")for(var X=1;X<P.length;X++)P[X]=""}}}}return yt(p)}catch{return d}}var To={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Ud={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ll;function Eo(){}_(Eo,fr),Eo.prototype.g=function(){return new XMLHttpRequest},Eo.prototype.i=function(){return{}},Ll=new Eo;function ss(a,d,p,v){this.j=a,this.i=d,this.l=p,this.R=v||1,this.U=new Tt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new jd}function jd(){this.i=null,this.g="",this.h=!1}var Bd={},Fl={};function $l(a,d,p){a.L=1,a.v=Co(Vn(d)),a.m=p,a.P=!0,zd(a,null)}function zd(a,d){a.F=Date.now(),ko(a),a.A=Vn(a.v);var p=a.A,v=a.R;Array.isArray(v)||(v=[String(v)]),sh(p.i,"t",v),a.C=0,p=a.j.J,a.h=new jd,a.g=wh(a.j,p?d:null,!a.m),0<a.O&&(a.M=new Xt(y(a.Y,a,a.g),a.O)),d=a.U,p=a.g,v=a.ca;var P="readystatechange";Array.isArray(P)||(P&&(ns[0]=P.toString()),P=ns);for(var D=0;D<P.length;D++){var X=V(p,P[D],v||d.handleEvent,!1,d.h||d);if(!X)break;d.g[X.key]=X}d=a.H?w(a.H):{},a.m?(a.u||(a.u="POST"),d["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,d)):(a.u="GET",a.g.ea(a.A,a.u,null,d)),Yr(),Ky(a.i,a.u,a.A,a.l,a.R,a.m)}ss.prototype.ca=function(a){a=a.target;const d=this.M;d&&Ln(a)==3?d.j():this.Y(a)},ss.prototype.Y=function(a){try{if(a==this.g)e:{const kt=Ln(this.g);var d=this.g.Ba();const yr=this.g.Z();if(!(3>kt)&&(kt!=3||this.g&&(this.h.h||this.g.oa()||uh(this.g)))){this.J||kt!=4||d==7||(d==8||0>=yr?Yr(3):Yr(2)),Ul(this);var p=this.g.Z();this.X=p;t:if(qd(this)){var v=uh(this.g);a="";var P=v.length,D=Ln(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Ns(this),Zr(this);var X="";break t}this.h.i=new l.TextDecoder}for(d=0;d<P;d++)this.h.h=!0,a+=this.h.i.decode(v[d],{stream:!(D&&d==P-1)});v.length=0,this.h.g+=a,this.C=0,X=this.h.g}else X=this.g.oa();if(this.o=p==200,Gy(this.i,this.u,this.A,this.l,this.R,kt,p),this.o){if(this.T&&!this.K){t:{if(this.g){var Ue,_t=this.g;if((Ue=_t.g?_t.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!H(Ue)){var Oe=Ue;break t}}Oe=null}if(p=Oe)pr(this.i,this.l,p,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,jl(this,p);else{this.o=!1,this.s=3,Dt(12),Ns(this),Zr(this);break e}}if(this.P){p=!0;let cn;for(;!this.J&&this.C<X.length;)if(cn=Jy(this,X),cn==Fl){kt==4&&(this.s=4,Dt(14),p=!1),pr(this.i,this.l,null,"[Incomplete Response]");break}else if(cn==Bd){this.s=4,Dt(15),pr(this.i,this.l,X,"[Invalid Chunk]"),p=!1;break}else pr(this.i,this.l,cn,null),jl(this,cn);if(qd(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),kt!=4||X.length!=0||this.h.h||(this.s=1,Dt(16),p=!1),this.o=this.o&&p,!p)pr(this.i,this.l,X,"[Invalid Chunked Response]"),Ns(this),Zr(this);else if(0<X.length&&!this.W){this.W=!0;var Et=this.j;Et.g==this&&Et.ba&&!Et.M&&(Et.j.info("Great, no buffering proxy detected. Bytes received: "+X.length),Kl(Et),Et.M=!0,Dt(11))}}else pr(this.i,this.l,X,null),jl(this,X);kt==4&&Ns(this),this.o&&!this.J&&(kt==4?yh(this.j,this):(this.o=!1,ko(this)))}else p_(this.g),p==400&&0<X.indexOf("Unknown SID")?(this.s=3,Dt(12)):(this.s=0,Dt(13)),Ns(this),Zr(this)}}}catch{}finally{}};function qd(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Jy(a,d){var p=a.C,v=d.indexOf(`
`,p);return v==-1?Fl:(p=Number(d.substring(p,v)),isNaN(p)?Bd:(v+=1,v+p>d.length?Fl:(d=d.slice(v,v+p),a.C=v+p,d)))}ss.prototype.cancel=function(){this.J=!0,Ns(this)};function ko(a){a.S=Date.now()+a.I,Hd(a,a.I)}function Hd(a,d){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Jr(y(a.ba,a),d)}function Ul(a){a.B&&(l.clearTimeout(a.B),a.B=null)}ss.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Qy(this.i,this.A),this.L!=2&&(Yr(),Dt(17)),Ns(this),this.s=2,Zr(this)):Hd(this,this.S-a)};function Zr(a){a.j.G==0||a.J||yh(a.j,a)}function Ns(a){Ul(a);var d=a.M;d&&typeof d.ma=="function"&&d.ma(),a.M=null,Gr(a.U),a.g&&(d=a.g,a.g=null,d.abort(),d.ma())}function jl(a,d){try{var p=a.j;if(p.G!=0&&(p.g==a||Bl(p.h,a))){if(!a.K&&Bl(p.h,a)&&p.G==3){try{var v=p.Da.g.parse(d)}catch{v=null}if(Array.isArray(v)&&v.length==3){var P=v;if(P[0]==0){e:if(!p.u){if(p.g)if(p.g.F+3e3<a.F)Do(p),Oo(p);else break e;Wl(p),Dt(18)}}else p.za=P[1],0<p.za-p.T&&37500>P[2]&&p.F&&p.v==0&&!p.C&&(p.C=Jr(y(p.Za,p),6e3));if(1>=Gd(p.h)&&p.ca){try{p.ca()}catch{}p.ca=void 0}}else Vs(p,11)}else if((a.K||p.g==a)&&Do(p),!H(d))for(P=p.Da.g.parse(d),d=0;d<P.length;d++){let Oe=P[d];if(p.T=Oe[0],Oe=Oe[1],p.G==2)if(Oe[0]=="c"){p.K=Oe[1],p.ia=Oe[2];const Et=Oe[3];Et!=null&&(p.la=Et,p.j.info("VER="+p.la));const kt=Oe[4];kt!=null&&(p.Aa=kt,p.j.info("SVER="+p.Aa));const yr=Oe[5];yr!=null&&typeof yr=="number"&&0<yr&&(v=1.5*yr,p.L=v,p.j.info("backChannelRequestTimeoutMs_="+v)),v=p;const cn=a.g;if(cn){const Lo=cn.g?cn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Lo){var D=v.h;D.g||Lo.indexOf("spdy")==-1&&Lo.indexOf("quic")==-1&&Lo.indexOf("h2")==-1||(D.j=D.l,D.g=new Set,D.h&&(zl(D,D.h),D.h=null))}if(v.D){const Gl=cn.g?cn.g.getResponseHeader("X-HTTP-Session-Id"):null;Gl&&(v.ya=Gl,We(v.I,v.D,Gl))}}p.G=3,p.l&&p.l.ua(),p.ba&&(p.R=Date.now()-a.F,p.j.info("Handshake RTT: "+p.R+"ms")),v=p;var X=a;if(v.qa=bh(v,v.J?v.ia:null,v.W),X.K){Qd(v.h,X);var Ue=X,_t=v.L;_t&&(Ue.I=_t),Ue.B&&(Ul(Ue),ko(Ue)),v.g=X}else gh(v);0<p.i.length&&No(p)}else Oe[0]!="stop"&&Oe[0]!="close"||Vs(p,7);else p.G==3&&(Oe[0]=="stop"||Oe[0]=="close"?Oe[0]=="stop"?Vs(p,7):Hl(p):Oe[0]!="noop"&&p.l&&p.l.ta(Oe),p.v=0)}}Yr(4)}catch{}}var Xy=class{constructor(a,d){this.g=a,this.map=d}};function Wd(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Kd(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Gd(a){return a.h?1:a.g?a.g.size:0}function Bl(a,d){return a.h?a.h==d:a.g?a.g.has(d):!1}function zl(a,d){a.g?a.g.add(d):a.h=d}function Qd(a,d){a.h&&a.h==d?a.h=null:a.g&&a.g.has(d)&&a.g.delete(d)}Wd.prototype.cancel=function(){if(this.i=Yd(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Yd(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let d=a.i;for(const p of a.g.values())d=d.concat(p.D);return d}return A(a.i)}function Zy(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(c(a)){for(var d=[],p=a.length,v=0;v<p;v++)d.push(a[v]);return d}d=[],p=0;for(v in a)d[p++]=a[v];return d}function e_(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(c(a)||typeof a=="string"){var d=[];a=a.length;for(var p=0;p<a;p++)d.push(p);return d}d=[],p=0;for(const v in a)d[p++]=v;return d}}}function Jd(a,d){if(a.forEach&&typeof a.forEach=="function")a.forEach(d,void 0);else if(c(a)||typeof a=="string")Array.prototype.forEach.call(a,d,void 0);else for(var p=e_(a),v=Zy(a),P=v.length,D=0;D<P;D++)d.call(void 0,v[D],p&&p[D],a)}var Xd=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function t_(a,d){if(a){a=a.split("&");for(var p=0;p<a.length;p++){var v=a[p].indexOf("="),P=null;if(0<=v){var D=a[p].substring(0,v);P=a[p].substring(v+1)}else D=a[p];d(D,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function Ds(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Ds){this.h=a.h,Ao(this,a.j),this.o=a.o,this.g=a.g,So(this,a.s),this.l=a.l;var d=a.i,p=new ni;p.i=d.i,d.g&&(p.g=new Map(d.g),p.h=d.h),Zd(this,p),this.m=a.m}else a&&(d=String(a).match(Xd))?(this.h=!1,Ao(this,d[1]||"",!0),this.o=ei(d[2]||""),this.g=ei(d[3]||"",!0),So(this,d[4]),this.l=ei(d[5]||"",!0),Zd(this,d[6]||"",!0),this.m=ei(d[7]||"")):(this.h=!1,this.i=new ni(null,this.h))}Ds.prototype.toString=function(){var a=[],d=this.j;d&&a.push(ti(d,eh,!0),":");var p=this.g;return(p||d=="file")&&(a.push("//"),(d=this.o)&&a.push(ti(d,eh,!0),"@"),a.push(encodeURIComponent(String(p)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.s,p!=null&&a.push(":",String(p))),(p=this.l)&&(this.g&&p.charAt(0)!="/"&&a.push("/"),a.push(ti(p,p.charAt(0)=="/"?r_:s_,!0))),(p=this.i.toString())&&a.push("?",p),(p=this.m)&&a.push("#",ti(p,o_)),a.join("")};function Vn(a){return new Ds(a)}function Ao(a,d,p){a.j=p?ei(d,!0):d,a.j&&(a.j=a.j.replace(/:$/,""))}function So(a,d){if(d){if(d=Number(d),isNaN(d)||0>d)throw Error("Bad port number "+d);a.s=d}else a.s=null}function Zd(a,d,p){d instanceof ni?(a.i=d,a_(a.i,a.h)):(p||(d=ti(d,i_)),a.i=new ni(d,a.h))}function We(a,d,p){a.i.set(d,p)}function Co(a){return We(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function ei(a,d){return a?d?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function ti(a,d,p){return typeof a=="string"?(a=encodeURI(a).replace(d,n_),p&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function n_(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var eh=/[#\/\?@]/g,s_=/[#\?:]/g,r_=/[#\?]/g,i_=/[#\?@]/g,o_=/#/g;function ni(a,d){this.h=this.g=null,this.i=a||null,this.j=!!d}function rs(a){a.g||(a.g=new Map,a.h=0,a.i&&t_(a.i,function(d,p){a.add(decodeURIComponent(d.replace(/\+/g," ")),p)}))}t=ni.prototype,t.add=function(a,d){rs(this),this.i=null,a=gr(this,a);var p=this.g.get(a);return p||this.g.set(a,p=[]),p.push(d),this.h+=1,this};function th(a,d){rs(a),d=gr(a,d),a.g.has(d)&&(a.i=null,a.h-=a.g.get(d).length,a.g.delete(d))}function nh(a,d){return rs(a),d=gr(a,d),a.g.has(d)}t.forEach=function(a,d){rs(this),this.g.forEach(function(p,v){p.forEach(function(P){a.call(d,P,v,this)},this)},this)},t.na=function(){rs(this);const a=Array.from(this.g.values()),d=Array.from(this.g.keys()),p=[];for(let v=0;v<d.length;v++){const P=a[v];for(let D=0;D<P.length;D++)p.push(d[v])}return p},t.V=function(a){rs(this);let d=[];if(typeof a=="string")nh(this,a)&&(d=d.concat(this.g.get(gr(this,a))));else{a=Array.from(this.g.values());for(let p=0;p<a.length;p++)d=d.concat(a[p])}return d},t.set=function(a,d){return rs(this),this.i=null,a=gr(this,a),nh(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[d]),this.h+=1,this},t.get=function(a,d){return a?(a=this.V(a),0<a.length?String(a[0]):d):d};function sh(a,d,p){th(a,d),0<p.length&&(a.i=null,a.g.set(gr(a,d),A(p)),a.h+=p.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],d=Array.from(this.g.keys());for(var p=0;p<d.length;p++){var v=d[p];const D=encodeURIComponent(String(v)),X=this.V(v);for(v=0;v<X.length;v++){var P=D;X[v]!==""&&(P+="="+encodeURIComponent(String(X[v]))),a.push(P)}}return this.i=a.join("&")};function gr(a,d){return d=String(d),a.j&&(d=d.toLowerCase()),d}function a_(a,d){d&&!a.j&&(rs(a),a.i=null,a.g.forEach(function(p,v){var P=v.toLowerCase();v!=P&&(th(this,v),sh(this,P,p))},a)),a.j=d}function l_(a,d){const p=new Xr;if(l.Image){const v=new Image;v.onload=m(is,p,"TestLoadImage: loaded",!0,d,v),v.onerror=m(is,p,"TestLoadImage: error",!1,d,v),v.onabort=m(is,p,"TestLoadImage: abort",!1,d,v),v.ontimeout=m(is,p,"TestLoadImage: timeout",!1,d,v),l.setTimeout(function(){v.ontimeout&&v.ontimeout()},1e4),v.src=a}else d(!1)}function c_(a,d){const p=new Xr,v=new AbortController,P=setTimeout(()=>{v.abort(),is(p,"TestPingServer: timeout",!1,d)},1e4);fetch(a,{signal:v.signal}).then(D=>{clearTimeout(P),D.ok?is(p,"TestPingServer: ok",!0,d):is(p,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(P),is(p,"TestPingServer: error",!1,d)})}function is(a,d,p,v,P){try{P&&(P.onload=null,P.onerror=null,P.onabort=null,P.ontimeout=null),v(p)}catch{}}function u_(){this.g=new xo}function d_(a,d,p){const v=p||"";try{Jd(a,function(P,D){let X=P;u(P)&&(X=yt(P)),d.push(v+D+"="+encodeURIComponent(X))})}catch(P){throw d.push(v+"type="+encodeURIComponent("_badmap")),P}}function Ro(a){this.l=a.Ub||null,this.j=a.eb||!1}_(Ro,fr),Ro.prototype.g=function(){return new Po(this.l,this.j)},Ro.prototype.i=function(a){return function(){return a}}({});function Po(a,d){ue.call(this),this.D=a,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}_(Po,ue),t=Po.prototype,t.open=function(a,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=d,this.readyState=1,ri(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const d={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(d.body=a),(this.D||l).fetch(new Request(this.A,d)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,si(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,ri(this)),this.g&&(this.readyState=3,ri(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;rh(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function rh(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var d=a.value?a.value:new Uint8Array(0);(d=this.v.decode(d,{stream:!a.done}))&&(this.response=this.responseText+=d)}a.done?si(this):ri(this),this.readyState==3&&rh(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,si(this))},t.Qa=function(a){this.g&&(this.response=a,si(this))},t.ga=function(){this.g&&si(this)};function si(a){a.readyState=4,a.l=null,a.j=null,a.v=null,ri(a)}t.setRequestHeader=function(a,d){this.u.append(a,d)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],d=this.h.entries();for(var p=d.next();!p.done;)p=p.value,a.push(p[0]+": "+p[1]),p=d.next();return a.join(`\r
`)};function ri(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Po.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function ih(a){let d="";return me(a,function(p,v){d+=v,d+=":",d+=p,d+=`\r
`}),d}function ql(a,d,p){e:{for(v in p){var v=!1;break e}v=!0}v||(p=ih(p),typeof a=="string"?p!=null&&encodeURIComponent(String(p)):We(a,d,p))}function et(a){ue.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}_(et,ue);var h_=/^https?$/i,f_=["POST","PUT"];t=et.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,d,p,v){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);d=d?d.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ll.g(),this.v=this.o?Nd(this.o):Nd(Ll),this.g.onreadystatechange=y(this.Ea,this);try{this.B=!0,this.g.open(d,String(a),!0),this.B=!1}catch(D){oh(this,D);return}if(a=p||"",p=new Map(this.headers),v)if(Object.getPrototypeOf(v)===Object.prototype)for(var P in v)p.set(P,v[P]);else if(typeof v.keys=="function"&&typeof v.get=="function")for(const D of v.keys())p.set(D,v.get(D));else throw Error("Unknown input type for opt_headers: "+String(v));v=Array.from(p.keys()).find(D=>D.toLowerCase()=="content-type"),P=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(f_,d,void 0))||v||P||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[D,X]of p)this.g.setRequestHeader(D,X);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{ch(this),this.u=!0,this.g.send(a),this.u=!1}catch(D){oh(this,D)}};function oh(a,d){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=d,a.m=5,ah(a),Mo(a)}function ah(a){a.A||(a.A=!0,ve(a,"complete"),ve(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,ve(this,"complete"),ve(this,"abort"),Mo(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Mo(this,!0)),et.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?lh(this):this.bb())},t.bb=function(){lh(this)};function lh(a){if(a.h&&typeof o<"u"&&(!a.v[1]||Ln(a)!=4||a.Z()!=2)){if(a.u&&Ln(a)==4)Ge(a.Ea,0,a);else if(ve(a,"readystatechange"),Ln(a)==4){a.h=!1;try{const X=a.Z();e:switch(X){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var p;if(!(p=d)){var v;if(v=X===0){var P=String(a.D).match(Xd)[1]||null;!P&&l.self&&l.self.location&&(P=l.self.location.protocol.slice(0,-1)),v=!h_.test(P?P.toLowerCase():"")}p=v}if(p)ve(a,"complete"),ve(a,"success");else{a.m=6;try{var D=2<Ln(a)?a.g.statusText:""}catch{D=""}a.l=D+" ["+a.Z()+"]",ah(a)}}finally{Mo(a)}}}}function Mo(a,d){if(a.g){ch(a);const p=a.g,v=a.v[0]?()=>{}:null;a.g=null,a.v=null,d||ve(a,"ready");try{p.onreadystatechange=v}catch{}}}function ch(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function Ln(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<Ln(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var d=this.g.responseText;return a&&d.indexOf(a)==0&&(d=d.substring(a.length)),Zt(d)}};function uh(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function p_(a){const d={};a=(a.g&&2<=Ln(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let v=0;v<a.length;v++){if(H(a[v]))continue;var p=C(a[v]);const P=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const D=d[P]||[];d[P]=D,D.push(p)}R(d,function(v){return v.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function ii(a,d,p){return p&&p.internalChannelParams&&p.internalChannelParams[a]||d}function dh(a){this.Aa=0,this.i=[],this.j=new Xr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=ii("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=ii("baseRetryDelayMs",5e3,a),this.cb=ii("retryDelaySeedMs",1e4,a),this.Wa=ii("forwardChannelMaxRetries",2,a),this.wa=ii("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Wd(a&&a.concurrentRequestLimit),this.Da=new u_,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=dh.prototype,t.la=8,t.G=1,t.connect=function(a,d,p,v){Dt(0),this.W=a,this.H=d||{},p&&v!==void 0&&(this.H.OSID=p,this.H.OAID=v),this.F=this.X,this.I=bh(this,null,this.W),No(this)};function Hl(a){if(hh(a),a.G==3){var d=a.U++,p=Vn(a.I);if(We(p,"SID",a.K),We(p,"RID",d),We(p,"TYPE","terminate"),oi(a,p),d=new ss(a,a.j,d),d.L=2,d.v=Co(Vn(p)),p=!1,l.navigator&&l.navigator.sendBeacon)try{p=l.navigator.sendBeacon(d.v.toString(),"")}catch{}!p&&l.Image&&(new Image().src=d.v,p=!0),p||(d.g=wh(d.j,null),d.g.ea(d.v)),d.F=Date.now(),ko(d)}vh(a)}function Oo(a){a.g&&(Kl(a),a.g.cancel(),a.g=null)}function hh(a){Oo(a),a.u&&(l.clearTimeout(a.u),a.u=null),Do(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function No(a){if(!Kd(a.h)&&!a.s){a.s=!0;var d=a.Ga;ye||Dn(),Ae||(ye(),Ae=!0),zt.add(d,a),a.B=0}}function g_(a,d){return Gd(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=d.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Jr(y(a.Ga,a,d),_h(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const P=new ss(this,this.j,a);let D=this.o;if(this.S&&(D?(D=w(D),E(D,this.S)):D=this.S),this.m!==null||this.O||(P.H=D,D=null),this.P)e:{for(var d=0,p=0;p<this.i.length;p++){t:{var v=this.i[p];if("__data__"in v.map&&(v=v.map.__data__,typeof v=="string")){v=v.length;break t}v=void 0}if(v===void 0)break;if(d+=v,4096<d){d=p;break e}if(d===4096||p===this.i.length-1){d=p+1;break e}}d=1e3}else d=1e3;d=ph(this,P,d),p=Vn(this.I),We(p,"RID",a),We(p,"CVER",22),this.D&&We(p,"X-HTTP-Session-Id",this.D),oi(this,p),D&&(this.O?d="headers="+encodeURIComponent(String(ih(D)))+"&"+d:this.m&&ql(p,this.m,D)),zl(this.h,P),this.Ua&&We(p,"TYPE","init"),this.P?(We(p,"$req",d),We(p,"SID","null"),P.T=!0,$l(P,p,null)):$l(P,p,d),this.G=2}}else this.G==3&&(a?fh(this,a):this.i.length==0||Kd(this.h)||fh(this))};function fh(a,d){var p;d?p=d.l:p=a.U++;const v=Vn(a.I);We(v,"SID",a.K),We(v,"RID",p),We(v,"AID",a.T),oi(a,v),a.m&&a.o&&ql(v,a.m,a.o),p=new ss(a,a.j,p,a.B+1),a.m===null&&(p.H=a.o),d&&(a.i=d.D.concat(a.i)),d=ph(a,p,1e3),p.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),zl(a.h,p),$l(p,v,d)}function oi(a,d){a.H&&me(a.H,function(p,v){We(d,v,p)}),a.l&&Jd({},function(p,v){We(d,v,p)})}function ph(a,d,p){p=Math.min(a.i.length,p);var v=a.l?y(a.l.Na,a.l,a):null;e:{var P=a.i;let D=-1;for(;;){const X=["count="+p];D==-1?0<p?(D=P[0].g,X.push("ofs="+D)):D=0:X.push("ofs="+D);let Ue=!0;for(let _t=0;_t<p;_t++){let Oe=P[_t].g;const Et=P[_t].map;if(Oe-=D,0>Oe)D=Math.max(0,P[_t].g-100),Ue=!1;else try{d_(Et,X,"req"+Oe+"_")}catch{v&&v(Et)}}if(Ue){v=X.join("&");break e}}}return a=a.i.splice(0,p),d.D=a,v}function gh(a){if(!a.g&&!a.u){a.Y=1;var d=a.Fa;ye||Dn(),Ae||(ye(),Ae=!0),zt.add(d,a),a.v=0}}function Wl(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Jr(y(a.Fa,a),_h(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,mh(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Jr(y(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Dt(10),Oo(this),mh(this))};function Kl(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function mh(a){a.g=new ss(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var d=Vn(a.qa);We(d,"RID","rpc"),We(d,"SID",a.K),We(d,"AID",a.T),We(d,"CI",a.F?"0":"1"),!a.F&&a.ja&&We(d,"TO",a.ja),We(d,"TYPE","xmlhttp"),oi(a,d),a.m&&a.o&&ql(d,a.m,a.o),a.L&&(a.g.I=a.L);var p=a.g;a=a.ia,p.L=1,p.v=Co(Vn(d)),p.m=null,p.P=!0,zd(p,a)}t.Za=function(){this.C!=null&&(this.C=null,Oo(this),Wl(this),Dt(19))};function Do(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function yh(a,d){var p=null;if(a.g==d){Do(a),Kl(a),a.g=null;var v=2}else if(Bl(a.h,d))p=d.D,Qd(a.h,d),v=1;else return;if(a.G!=0){if(d.o)if(v==1){p=d.m?d.m.length:0,d=Date.now()-d.F;var P=a.B;v=Io(),ve(v,new $d(v,p)),No(a)}else gh(a);else if(P=d.s,P==3||P==0&&0<d.X||!(v==1&&g_(a,d)||v==2&&Wl(a)))switch(p&&0<p.length&&(d=a.h,d.i=d.i.concat(p)),P){case 1:Vs(a,5);break;case 4:Vs(a,10);break;case 3:Vs(a,6);break;default:Vs(a,2)}}}function _h(a,d){let p=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(p*=2),p*d}function Vs(a,d){if(a.j.info("Error code "+d),d==2){var p=y(a.fb,a),v=a.Xa;const P=!v;v=new Ds(v||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Ao(v,"https"),Co(v),P?l_(v.toString(),p):c_(v.toString(),p)}else Dt(2);a.G=0,a.l&&a.l.sa(d),vh(a),hh(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Dt(2)):(this.j.info("Failed to ping google.com"),Dt(1))};function vh(a){if(a.G=0,a.ka=[],a.l){const d=Yd(a.h);(d.length!=0||a.i.length!=0)&&(M(a.ka,d),M(a.ka,a.i),a.h.i.length=0,A(a.i),a.i.length=0),a.l.ra()}}function bh(a,d,p){var v=p instanceof Ds?Vn(p):new Ds(p);if(v.g!="")d&&(v.g=d+"."+v.g),So(v,v.s);else{var P=l.location;v=P.protocol,d=d?d+"."+P.hostname:P.hostname,P=+P.port;var D=new Ds(null);v&&Ao(D,v),d&&(D.g=d),P&&So(D,P),p&&(D.l=p),v=D}return p=a.D,d=a.ya,p&&d&&We(v,p,d),We(v,"VER",a.la),oi(a,v),v}function wh(a,d,p){if(d&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return d=a.Ca&&!a.pa?new et(new Ro({eb:p})):new et(a.pa),d.Ha(a.J),d}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function xh(){}t=xh.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function Vo(){}Vo.prototype.g=function(a,d){return new qt(a,d)};function qt(a,d){ue.call(this),this.g=new dh(d),this.l=a,this.h=d&&d.messageUrlParams||null,a=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(a?a["X-WebChannel-Content-Type"]=d.messageContentType:a={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.va&&(a?a["X-WebChannel-Client-Profile"]=d.va:a={"X-WebChannel-Client-Profile":d.va}),this.g.S=a,(a=d&&d.Sb)&&!H(a)&&(this.g.m=a),this.v=d&&d.supportsCrossDomainXhr||!1,this.u=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!H(d)&&(this.g.D=d,a=this.h,a!==null&&d in a&&(a=this.h,d in a&&delete a[d])),this.j=new mr(this)}_(qt,ue),qt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},qt.prototype.close=function(){Hl(this.g)},qt.prototype.o=function(a){var d=this.g;if(typeof a=="string"){var p={};p.__data__=a,a=p}else this.u&&(p={},p.__data__=yt(a),a=p);d.i.push(new Xy(d.Ya++,a)),d.G==3&&No(d)},qt.prototype.N=function(){this.g.l=null,delete this.j,Hl(this.g),delete this.g,qt.aa.N.call(this)};function Ih(a){Dl.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var d=a.__sm__;if(d){e:{for(const p in d){a=p;break e}a=void 0}(this.i=a)&&(a=this.i,d=d!==null&&a in d?d[a]:void 0),this.data=d}else this.data=a}_(Ih,Dl);function Th(){Vl.call(this),this.status=1}_(Th,Vl);function mr(a){this.g=a}_(mr,xh),mr.prototype.ua=function(){ve(this.g,"a")},mr.prototype.ta=function(a){ve(this.g,new Ih(a))},mr.prototype.sa=function(a){ve(this.g,new Th)},mr.prototype.ra=function(){ve(this.g,"b")},Vo.prototype.createWebChannel=Vo.prototype.g,qt.prototype.send=qt.prototype.o,qt.prototype.open=qt.prototype.m,qt.prototype.close=qt.prototype.close,Hm=function(){return new Vo},qm=function(){return Io()},zm=Os,Uc={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},To.NO_ERROR=0,To.TIMEOUT=8,To.HTTP_ERROR=6,Xo=To,Ud.COMPLETE="complete",Bm=Ud,Dd.EventType=Qr,Qr.OPEN="a",Qr.CLOSE="b",Qr.ERROR="c",Qr.MESSAGE="d",ue.prototype.listen=ue.prototype.K,gi=Dd,et.prototype.listenOnce=et.prototype.L,et.prototype.getLastError=et.prototype.Ka,et.prototype.getLastErrorCode=et.prototype.Ba,et.prototype.getStatus=et.prototype.Z,et.prototype.getResponseJson=et.prototype.Oa,et.prototype.getResponseText=et.prototype.oa,et.prototype.send=et.prototype.ea,et.prototype.setWithCredentials=et.prototype.Ha,jm=et}).apply(typeof zo<"u"?zo:typeof self<"u"?self:typeof window<"u"?window:{});const Df="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let St=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};St.UNAUTHENTICATED=new St(null),St.GOOGLE_CREDENTIALS=new St("google-credentials-uid"),St.FIRST_PARTY=new St("first-party-uid"),St.MOCK_USER=new St("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let jr="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sr=new ul("@firebase/firestore");function ui(){return sr.logLevel}function re(t,...e){if(sr.logLevel<=ke.DEBUG){const n=e.map(Pu);sr.debug(`Firestore (${jr}): ${t}`,...n)}}function Jn(t,...e){if(sr.logLevel<=ke.ERROR){const n=e.map(Pu);sr.error(`Firestore (${jr}): ${t}`,...n)}}function Nr(t,...e){if(sr.logLevel<=ke.WARN){const n=e.map(Pu);sr.warn(`Firestore (${jr}): ${t}`,...n)}}function Pu(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function de(t="Unexpected state"){const e=`FIRESTORE (${jr}) INTERNAL ASSERTION FAILED: `+t;throw Jn(e),new Error(e)}function Me(t,e){t||de()}function ge(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class se extends mn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wm{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class rI{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(St.UNAUTHENTICATED))}shutdown(){}}class iI{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class oI{constructor(e){this.t=e,this.currentUser=St.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Me(this.o===void 0);let s=this.i;const r=c=>this.i!==s?(s=this.i,n(c)):Promise.resolve();let i=new Tn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Tn,e.enqueueRetryable(()=>r(this.currentUser))};const o=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await r(this.currentUser)})},l=c=>{re("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(c=>l(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(re("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Tn)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(s=>this.i!==e?(re("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(Me(typeof s.accessToken=="string"),new Wm(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Me(e===null||typeof e=="string"),new St(e)}}class aI{constructor(e,n,s){this.l=e,this.h=n,this.P=s,this.type="FirstParty",this.user=St.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class lI{constructor(e,n,s){this.l=e,this.h=n,this.P=s}getToken(){return Promise.resolve(new aI(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(St.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class cI{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class uI{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){Me(this.o===void 0);const s=i=>{i.error!=null&&re("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,re("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>s(i))};const r=i=>{re("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>r(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?r(i):re("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Me(typeof n.token=="string"),this.R=n.token,new cI(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dI(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let s=0;s<t;s++)n[s]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Km{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let s="";for(;s.length<20;){const r=dI(40);for(let i=0;i<r.length;++i)s.length<20&&r[i]<n&&(s+=e.charAt(r[i]%e.length))}return s}}function Ne(t,e){return t<e?-1:t>e?1:0}function Dr(t,e,n){return t.length===e.length&&t.every((s,r)=>n(s,e[r]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new se($.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new se($.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new se($.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new se($.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return ht.fromMillis(Date.now())}static fromDate(e){return ht.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),s=Math.floor(1e6*(e-1e3*n));return new ht(n,s)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?Ne(this.nanoseconds,e.nanoseconds):Ne(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(e){this.timestamp=e}static fromTimestamp(e){return new fe(e)}static min(){return new fe(new ht(0,0))}static max(){return new fe(new ht(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi{constructor(e,n,s){n===void 0?n=0:n>e.length&&de(),s===void 0?s=e.length-n:s>e.length-n&&de(),this.segments=e,this.offset=n,this.len=s}get length(){return this.len}isEqual(e){return qi.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof qi?e.forEach(s=>{n.push(s)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,s=this.limit();n<s;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const s=Math.min(e.length,n.length);for(let r=0;r<s;r++){const i=e.get(r),o=n.get(r);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class He extends qi{construct(e,n,s){return new He(e,n,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const s of e){if(s.indexOf("//")>=0)throw new se($.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);n.push(...s.split("/").filter(r=>r.length>0))}return new He(n)}static emptyPath(){return new He([])}}const hI=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class wt extends qi{construct(e,n,s){return new wt(e,n,s)}static isValidIdentifier(e){return hI.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),wt.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new wt(["__name__"])}static fromServerFormat(e){const n=[];let s="",r=0;const i=()=>{if(s.length===0)throw new se($.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(s),s=""};let o=!1;for(;r<e.length;){const l=e[r];if(l==="\\"){if(r+1===e.length)throw new se($.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[r+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new se($.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=c,r+=2}else l==="`"?(o=!o,r++):l!=="."||o?(s+=l,r++):(i(),r++)}if(i(),o)throw new se($.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new wt(n)}static emptyPath(){return new wt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e){this.path=e}static fromPath(e){return new le(He.fromString(e))}static fromName(e){return new le(He.fromString(e).popFirst(5))}static empty(){return new le(He.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&He.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return He.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new le(new He(e.slice()))}}function fI(t,e){const n=t.toTimestamp().seconds,s=t.toTimestamp().nanoseconds+1,r=fe.fromTimestamp(s===1e9?new ht(n+1,0):new ht(n,s));return new Ts(r,le.empty(),e)}function pI(t){return new Ts(t.readTime,t.key,-1)}class Ts{constructor(e,n,s){this.readTime=e,this.documentKey=n,this.largestBatchId=s}static min(){return new Ts(fe.min(),le.empty(),-1)}static max(){return new Ts(fe.max(),le.empty(),-1)}}function gI(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=le.comparator(t.documentKey,e.documentKey),n!==0?n:Ne(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mI="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class yI{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function io(t){if(t.code!==$.FAILED_PRECONDITION||t.message!==mI)throw t;re("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&de(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new z((s,r)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(s,r)},this.catchCallback=i=>{this.wrapFailure(n,i).next(s,r)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof z?n:z.resolve(n)}catch(n){return z.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):z.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):z.reject(n)}static resolve(e){return new z((n,s)=>{n(e)})}static reject(e){return new z((n,s)=>{s(e)})}static waitFor(e){return new z((n,s)=>{let r=0,i=0,o=!1;e.forEach(l=>{++r,l.next(()=>{++i,o&&i===r&&n()},c=>s(c))}),o=!0,i===r&&n()})}static or(e){let n=z.resolve(!1);for(const s of e)n=n.next(r=>r?z.resolve(r):s());return n}static forEach(e,n){const s=[];return e.forEach((r,i)=>{s.push(n.call(this,r,i))}),this.waitFor(s)}static mapArray(e,n){return new z((s,r)=>{const i=e.length,o=new Array(i);let l=0;for(let c=0;c<i;c++){const u=c;n(e[u]).next(h=>{o[u]=h,++l,l===i&&s(o)},h=>r(h))}})}static doWhile(e,n){return new z((s,r)=>{const i=()=>{e()===!0?n().next(()=>{i()},r):s()};i()})}}function _I(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function oo(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mu{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=s=>this.ie(s),this.se=s=>n.writeSequenceNumber(s))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Mu.oe=-1;function ao(t){return t==null}function ka(t){return t===0&&1/t==-1/0}function vI(t){return typeof t=="number"&&Number.isInteger(t)&&!ka(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vf(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function dr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function Gm(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e,n){this.comparator=e,this.root=n||bt.EMPTY}insert(e,n){return new Je(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,bt.BLACK,null,null))}remove(e){return new Je(this.comparator,this.root.remove(e,this.comparator).copy(null,null,bt.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return n.value;s<0?n=n.left:s>0&&(n=n.right)}return null}indexOf(e){let n=0,s=this.root;for(;!s.isEmpty();){const r=this.comparator(e,s.key);if(r===0)return n+s.left.size;r<0?s=s.left:(n+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,s)=>(e(n,s),!1))}toString(){const e=[];return this.inorderTraversal((n,s)=>(e.push(`${n}:${s}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new qo(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new qo(this.root,e,this.comparator,!1)}getReverseIterator(){return new qo(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new qo(this.root,e,this.comparator,!0)}}class qo{constructor(e,n,s,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?s(e.key,n):1,n&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class bt{constructor(e,n,s,r,i){this.key=e,this.value=n,this.color=s??bt.RED,this.left=r??bt.EMPTY,this.right=i??bt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,s,r,i){return new bt(e??this.key,n??this.value,s??this.color,r??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let r=this;const i=s(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,n,s),null):i===0?r.copy(null,n,null,null,null):r.copy(null,null,null,null,r.right.insert(e,n,s)),r.fixUp()}removeMin(){if(this.left.isEmpty())return bt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let s,r=this;if(n(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),n(e,r.key)===0){if(r.right.isEmpty())return bt.EMPTY;s=r.right.min(),r=r.copy(s.key,s.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,bt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,bt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw de();const e=this.left.check();if(e!==this.right.check())throw de();return e+(this.isRed()?0:1)}}bt.EMPTY=null,bt.RED=!0,bt.BLACK=!1;bt.EMPTY=new class{constructor(){this.size=0}get key(){throw de()}get value(){throw de()}get color(){throw de()}get left(){throw de()}get right(){throw de()}copy(e,n,s,r,i){return this}insert(e,n,s){return new bt(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(e){this.comparator=e,this.data=new Je(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,s)=>(e(n),!1))}forEachInRange(e,n){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const r=s.getNext();if(this.comparator(r.key,e[1])>=0)return;n(r.key)}}forEachWhile(e,n){let s;for(s=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Lf(this.data.getIterator())}getIteratorFrom(e){return new Lf(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(s=>{n=n.add(s)}),n}isEqual(e){if(!(e instanceof xt)||this.size!==e.size)return!1;const n=this.data.getIterator(),s=e.data.getIterator();for(;n.hasNext();){const r=n.getNext().key,i=s.getNext().key;if(this.comparator(r,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new xt(this.comparator);return n.data=e,n}}class Lf{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(e){this.fields=e,e.sort(wt.comparator)}static empty(){return new Gt([])}unionWith(e){let n=new xt(wt.comparator);for(const s of this.fields)n=n.add(s);for(const s of e)n=n.add(s);return new Gt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Dr(this.fields,e.fields,(n,s)=>n.isEqual(s))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qm extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(r){try{return atob(r)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Qm("Invalid base64 string: "+i):i}}(e);return new It(n)}static fromUint8Array(e){const n=function(r){let i="";for(let o=0;o<r.length;++o)i+=String.fromCharCode(r[o]);return i}(e);return new It(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const s=new Uint8Array(n.length);for(let r=0;r<n.length;r++)s[r]=n.charCodeAt(r);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Ne(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}It.EMPTY_BYTE_STRING=new It("");const bI=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Es(t){if(Me(!!t),typeof t=="string"){let e=0;const n=bI.exec(t);if(Me(!!n),n[1]){let r=n[1];r=(r+"000000000").substr(0,9),e=Number(r)}const s=new Date(t);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:it(t.seconds),nanos:it(t.nanos)}}function it(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function rr(t){return typeof t=="string"?It.fromBase64String(t):It.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ou(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function Nu(t){const e=t.mapValue.fields.__previous_value__;return Ou(e)?Nu(e):e}function Hi(t){const e=Es(t.mapValue.fields.__local_write_time__.timestampValue);return new ht(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wI{constructor(e,n,s,r,i,o,l,c,u){this.databaseId=e,this.appId=n,this.persistenceKey=s,this.host=r,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=u}}class Wi{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new Wi("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Wi&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ho={mapValue:{}};function ir(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Ou(t)?4:II(t)?9007199254740991:xI(t)?10:11:de()}function Mn(t,e){if(t===e)return!0;const n=ir(t);if(n!==ir(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Hi(t).isEqual(Hi(e));case 3:return function(r,i){if(typeof r.timestampValue=="string"&&typeof i.timestampValue=="string"&&r.timestampValue.length===i.timestampValue.length)return r.timestampValue===i.timestampValue;const o=Es(r.timestampValue),l=Es(i.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(r,i){return rr(r.bytesValue).isEqual(rr(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(r,i){return it(r.geoPointValue.latitude)===it(i.geoPointValue.latitude)&&it(r.geoPointValue.longitude)===it(i.geoPointValue.longitude)}(t,e);case 2:return function(r,i){if("integerValue"in r&&"integerValue"in i)return it(r.integerValue)===it(i.integerValue);if("doubleValue"in r&&"doubleValue"in i){const o=it(r.doubleValue),l=it(i.doubleValue);return o===l?ka(o)===ka(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return Dr(t.arrayValue.values||[],e.arrayValue.values||[],Mn);case 10:case 11:return function(r,i){const o=r.mapValue.fields||{},l=i.mapValue.fields||{};if(Vf(o)!==Vf(l))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(l[c]===void 0||!Mn(o[c],l[c])))return!1;return!0}(t,e);default:return de()}}function Ki(t,e){return(t.values||[]).find(n=>Mn(n,e))!==void 0}function Vr(t,e){if(t===e)return 0;const n=ir(t),s=ir(e);if(n!==s)return Ne(n,s);switch(n){case 0:case 9007199254740991:return 0;case 1:return Ne(t.booleanValue,e.booleanValue);case 2:return function(i,o){const l=it(i.integerValue||i.doubleValue),c=it(o.integerValue||o.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1}(t,e);case 3:return Ff(t.timestampValue,e.timestampValue);case 4:return Ff(Hi(t),Hi(e));case 5:return Ne(t.stringValue,e.stringValue);case 6:return function(i,o){const l=rr(i),c=rr(o);return l.compareTo(c)}(t.bytesValue,e.bytesValue);case 7:return function(i,o){const l=i.split("/"),c=o.split("/");for(let u=0;u<l.length&&u<c.length;u++){const h=Ne(l[u],c[u]);if(h!==0)return h}return Ne(l.length,c.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,o){const l=Ne(it(i.latitude),it(o.latitude));return l!==0?l:Ne(it(i.longitude),it(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return $f(t.arrayValue,e.arrayValue);case 10:return function(i,o){var l,c,u,h;const g=i.fields||{},y=o.fields||{},m=(l=g.value)===null||l===void 0?void 0:l.arrayValue,_=(c=y.value)===null||c===void 0?void 0:c.arrayValue,A=Ne(((u=m==null?void 0:m.values)===null||u===void 0?void 0:u.length)||0,((h=_==null?void 0:_.values)===null||h===void 0?void 0:h.length)||0);return A!==0?A:$f(m,_)}(t.mapValue,e.mapValue);case 11:return function(i,o){if(i===Ho.mapValue&&o===Ho.mapValue)return 0;if(i===Ho.mapValue)return 1;if(o===Ho.mapValue)return-1;const l=i.fields||{},c=Object.keys(l),u=o.fields||{},h=Object.keys(u);c.sort(),h.sort();for(let g=0;g<c.length&&g<h.length;++g){const y=Ne(c[g],h[g]);if(y!==0)return y;const m=Vr(l[c[g]],u[h[g]]);if(m!==0)return m}return Ne(c.length,h.length)}(t.mapValue,e.mapValue);default:throw de()}}function Ff(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return Ne(t,e);const n=Es(t),s=Es(e),r=Ne(n.seconds,s.seconds);return r!==0?r:Ne(n.nanos,s.nanos)}function $f(t,e){const n=t.values||[],s=e.values||[];for(let r=0;r<n.length&&r<s.length;++r){const i=Vr(n[r],s[r]);if(i)return i}return Ne(n.length,s.length)}function Lr(t){return jc(t)}function jc(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const s=Es(n);return`time(${s.seconds},${s.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return rr(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return le.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let s="[",r=!0;for(const i of n.values||[])r?r=!1:s+=",",s+=jc(i);return s+"]"}(t.arrayValue):"mapValue"in t?function(n){const s=Object.keys(n.fields||{}).sort();let r="{",i=!0;for(const o of s)i?i=!1:r+=",",r+=`${o}:${jc(n.fields[o])}`;return r+"}"}(t.mapValue):de()}function Bc(t){return!!t&&"integerValue"in t}function Du(t){return!!t&&"arrayValue"in t}function Uf(t){return!!t&&"nullValue"in t}function jf(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Zo(t){return!!t&&"mapValue"in t}function xI(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function Ai(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return dr(t.mapValue.fields,(n,s)=>e.mapValue.fields[n]=Ai(s)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Ai(t.arrayValue.values[n]);return e}return Object.assign({},t)}function II(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e){this.value=e}static empty(){return new $t({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let s=0;s<e.length-1;++s)if(n=(n.mapValue.fields||{})[e.get(s)],!Zo(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ai(n)}setAll(e){let n=wt.emptyPath(),s={},r=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const c=this.getFieldsMap(n);this.applyChanges(c,s,r),s={},r=[],n=l.popLast()}o?s[l.lastSegment()]=Ai(o):r.push(l.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,s,r)}delete(e){const n=this.field(e.popLast());Zo(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Mn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let s=0;s<e.length;++s){let r=n.mapValue.fields[e.get(s)];Zo(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},n.mapValue.fields[e.get(s)]=r),n=r}return n.mapValue.fields}applyChanges(e,n,s){dr(n,(r,i)=>e[r]=i);for(const r of s)delete e[r]}clone(){return new $t(Ai(this.value))}}function Ym(t){const e=[];return dr(t.fields,(n,s)=>{const r=new wt([n]);if(Zo(s)){const i=Ym(s.mapValue).fields;if(i.length===0)e.push(r);else for(const o of i)e.push(r.child(o))}else e.push(r)}),new Gt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e,n,s,r,i,o,l){this.key=e,this.documentType=n,this.version=s,this.readTime=r,this.createTime=i,this.data=o,this.documentState=l}static newInvalidDocument(e){return new gt(e,0,fe.min(),fe.min(),fe.min(),$t.empty(),0)}static newFoundDocument(e,n,s,r){return new gt(e,1,n,fe.min(),s,r,0)}static newNoDocument(e,n){return new gt(e,2,n,fe.min(),fe.min(),$t.empty(),0)}static newUnknownDocument(e,n){return new gt(e,3,n,fe.min(),fe.min(),$t.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(fe.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=$t.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=$t.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=fe.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof gt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new gt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aa{constructor(e,n){this.position=e,this.inclusive=n}}function Bf(t,e,n){let s=0;for(let r=0;r<t.position.length;r++){const i=e[r],o=t.position[r];if(i.field.isKeyField()?s=le.comparator(le.fromName(o.referenceValue),n.key):s=Vr(o,n.data.field(i.field)),i.dir==="desc"&&(s*=-1),s!==0)break}return s}function zf(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Mn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa{constructor(e,n="asc"){this.field=e,this.dir=n}}function TI(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jm{}class dt extends Jm{constructor(e,n,s){super(),this.field=e,this.op=n,this.value=s}static create(e,n,s){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,s):new kI(e,n,s):n==="array-contains"?new CI(e,s):n==="in"?new RI(e,s):n==="not-in"?new PI(e,s):n==="array-contains-any"?new MI(e,s):new dt(e,n,s)}static createKeyFieldInFilter(e,n,s){return n==="in"?new AI(e,s):new SI(e,s)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(Vr(n,this.value)):n!==null&&ir(this.value)===ir(n)&&this.matchesComparison(Vr(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return de()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class On extends Jm{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new On(e,n)}matches(e){return Xm(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Xm(t){return t.op==="and"}function Zm(t){return EI(t)&&Xm(t)}function EI(t){for(const e of t.filters)if(e instanceof On)return!1;return!0}function zc(t){if(t instanceof dt)return t.field.canonicalString()+t.op.toString()+Lr(t.value);if(Zm(t))return t.filters.map(e=>zc(e)).join(",");{const e=t.filters.map(n=>zc(n)).join(",");return`${t.op}(${e})`}}function e0(t,e){return t instanceof dt?function(s,r){return r instanceof dt&&s.op===r.op&&s.field.isEqual(r.field)&&Mn(s.value,r.value)}(t,e):t instanceof On?function(s,r){return r instanceof On&&s.op===r.op&&s.filters.length===r.filters.length?s.filters.reduce((i,o,l)=>i&&e0(o,r.filters[l]),!0):!1}(t,e):void de()}function t0(t){return t instanceof dt?function(n){return`${n.field.canonicalString()} ${n.op} ${Lr(n.value)}`}(t):t instanceof On?function(n){return n.op.toString()+" {"+n.getFilters().map(t0).join(" ,")+"}"}(t):"Filter"}class kI extends dt{constructor(e,n,s){super(e,n,s),this.key=le.fromName(s.referenceValue)}matches(e){const n=le.comparator(e.key,this.key);return this.matchesComparison(n)}}class AI extends dt{constructor(e,n){super(e,"in",n),this.keys=n0("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class SI extends dt{constructor(e,n){super(e,"not-in",n),this.keys=n0("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function n0(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(s=>le.fromName(s.referenceValue))}class CI extends dt{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Du(n)&&Ki(n.arrayValue,this.value)}}class RI extends dt{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Ki(this.value.arrayValue,n)}}class PI extends dt{constructor(e,n){super(e,"not-in",n)}matches(e){if(Ki(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!Ki(this.value.arrayValue,n)}}class MI extends dt{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Du(n)||!n.arrayValue.values)&&n.arrayValue.values.some(s=>Ki(this.value.arrayValue,s))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OI{constructor(e,n=null,s=[],r=[],i=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=s,this.filters=r,this.limit=i,this.startAt=o,this.endAt=l,this.ue=null}}function qf(t,e=null,n=[],s=[],r=null,i=null,o=null){return new OI(t,e,n,s,r,i,o)}function Vu(t){const e=ge(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(s=>zc(s)).join(","),n+="|ob:",n+=e.orderBy.map(s=>function(i){return i.field.canonicalString()+i.dir}(s)).join(","),ao(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>Lr(s)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>Lr(s)).join(",")),e.ue=n}return e.ue}function Lu(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!TI(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!e0(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!zf(t.startAt,e.startAt)&&zf(t.endAt,e.endAt)}function qc(t){return le.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fl{constructor(e,n=null,s=[],r=[],i=null,o="F",l=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=s,this.filters=r,this.limit=i,this.limitType=o,this.startAt=l,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function NI(t,e,n,s,r,i,o,l){return new fl(t,e,n,s,r,i,o,l)}function pl(t){return new fl(t)}function Hf(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function DI(t){return t.collectionGroup!==null}function Si(t){const e=ge(t);if(e.ce===null){e.ce=[];const n=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),n.add(i.field.canonicalString());const s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new xt(wt.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(u=>{u.isInequality()&&(l=l.add(u.field))})}),l})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.ce.push(new Sa(i,s))}),n.has(wt.keyField().canonicalString())||e.ce.push(new Sa(wt.keyField(),s))}return e.ce}function En(t){const e=ge(t);return e.le||(e.le=VI(e,Si(t))),e.le}function VI(t,e){if(t.limitType==="F")return qf(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(r=>{const i=r.dir==="desc"?"asc":"desc";return new Sa(r.field,i)});const n=t.endAt?new Aa(t.endAt.position,t.endAt.inclusive):null,s=t.startAt?new Aa(t.startAt.position,t.startAt.inclusive):null;return qf(t.path,t.collectionGroup,e,t.filters,t.limit,n,s)}}function Hc(t,e,n){return new fl(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function gl(t,e){return Lu(En(t),En(e))&&t.limitType===e.limitType}function s0(t){return`${Vu(En(t))}|lt:${t.limitType}`}function xr(t){return`Query(target=${function(n){let s=n.path.canonicalString();return n.collectionGroup!==null&&(s+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(s+=`, filters: [${n.filters.map(r=>t0(r)).join(", ")}]`),ao(n.limit)||(s+=", limit: "+n.limit),n.orderBy.length>0&&(s+=`, orderBy: [${n.orderBy.map(r=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(r)).join(", ")}]`),n.startAt&&(s+=", startAt: ",s+=n.startAt.inclusive?"b:":"a:",s+=n.startAt.position.map(r=>Lr(r)).join(",")),n.endAt&&(s+=", endAt: ",s+=n.endAt.inclusive?"a:":"b:",s+=n.endAt.position.map(r=>Lr(r)).join(",")),`Target(${s})`}(En(t))}; limitType=${t.limitType})`}function ml(t,e){return e.isFoundDocument()&&function(s,r){const i=r.key.path;return s.collectionGroup!==null?r.key.hasCollectionId(s.collectionGroup)&&s.path.isPrefixOf(i):le.isDocumentKey(s.path)?s.path.isEqual(i):s.path.isImmediateParentOf(i)}(t,e)&&function(s,r){for(const i of Si(s))if(!i.field.isKeyField()&&r.data.field(i.field)===null)return!1;return!0}(t,e)&&function(s,r){for(const i of s.filters)if(!i.matches(r))return!1;return!0}(t,e)&&function(s,r){return!(s.startAt&&!function(o,l,c){const u=Bf(o,l,c);return o.inclusive?u<=0:u<0}(s.startAt,Si(s),r)||s.endAt&&!function(o,l,c){const u=Bf(o,l,c);return o.inclusive?u>=0:u>0}(s.endAt,Si(s),r))}(t,e)}function LI(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function r0(t){return(e,n)=>{let s=!1;for(const r of Si(t)){const i=FI(r,e,n);if(i!==0)return i;s=s||r.field.isKeyField()}return 0}}function FI(t,e,n){const s=t.field.isKeyField()?le.comparator(e.key,n.key):function(i,o,l){const c=o.data.field(i),u=l.data.field(i);return c!==null&&u!==null?Vr(c,u):de()}(t.field,e,n);switch(t.dir){case"asc":return s;case"desc":return-1*s;default:return de()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s!==void 0){for(const[r,i]of s)if(this.equalsFn(r,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const s=this.mapKeyFn(e),r=this.inner[s];if(r===void 0)return this.inner[s]=[[e,n]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,n]);r.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return!1;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],e))return s.length===1?delete this.inner[n]:s.splice(r,1),this.innerSize--,!0;return!1}forEach(e){dr(this.inner,(n,s)=>{for(const[r,i]of s)e(r,i)})}isEmpty(){return Gm(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $I=new Je(le.comparator);function Xn(){return $I}const i0=new Je(le.comparator);function mi(...t){let e=i0;for(const n of t)e=e.insert(n.key,n);return e}function o0(t){let e=i0;return t.forEach((n,s)=>e=e.insert(n,s.overlayedDocument)),e}function Qs(){return Ci()}function a0(){return Ci()}function Ci(){return new Br(t=>t.toString(),(t,e)=>t.isEqual(e))}const UI=new Je(le.comparator),jI=new xt(le.comparator);function Te(...t){let e=jI;for(const n of t)e=e.add(n);return e}const BI=new xt(Ne);function zI(){return BI}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fu(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ka(e)?"-0":e}}function l0(t){return{integerValue:""+t}}function qI(t,e){return vI(e)?l0(e):Fu(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl{constructor(){this._=void 0}}function HI(t,e,n){return t instanceof Gi?function(r,i){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return i&&Ou(i)&&(i=Nu(i)),i&&(o.fields.__previous_value__=i),{mapValue:o}}(n,e):t instanceof Qi?u0(t,e):t instanceof Yi?d0(t,e):function(r,i){const o=c0(r,i),l=Wf(o)+Wf(r.Pe);return Bc(o)&&Bc(r.Pe)?l0(l):Fu(r.serializer,l)}(t,e)}function WI(t,e,n){return t instanceof Qi?u0(t,e):t instanceof Yi?d0(t,e):n}function c0(t,e){return t instanceof Ca?function(s){return Bc(s)||function(i){return!!i&&"doubleValue"in i}(s)}(e)?e:{integerValue:0}:null}class Gi extends yl{}class Qi extends yl{constructor(e){super(),this.elements=e}}function u0(t,e){const n=h0(e);for(const s of t.elements)n.some(r=>Mn(r,s))||n.push(s);return{arrayValue:{values:n}}}class Yi extends yl{constructor(e){super(),this.elements=e}}function d0(t,e){let n=h0(e);for(const s of t.elements)n=n.filter(r=>!Mn(r,s));return{arrayValue:{values:n}}}class Ca extends yl{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function Wf(t){return it(t.integerValue||t.doubleValue)}function h0(t){return Du(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KI{constructor(e,n){this.field=e,this.transform=n}}function GI(t,e){return t.field.isEqual(e.field)&&function(s,r){return s instanceof Qi&&r instanceof Qi||s instanceof Yi&&r instanceof Yi?Dr(s.elements,r.elements,Mn):s instanceof Ca&&r instanceof Ca?Mn(s.Pe,r.Pe):s instanceof Gi&&r instanceof Gi}(t.transform,e.transform)}class QI{constructor(e,n){this.version=e,this.transformResults=n}}class lt{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new lt}static exists(e){return new lt(void 0,e)}static updateTime(e){return new lt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ea(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class _l{}function f0(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new co(t.key,lt.none()):new lo(t.key,t.data,lt.none());{const n=t.data,s=$t.empty();let r=new xt(wt.comparator);for(let i of e.fields)if(!r.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?s.delete(i):s.set(i,o),r=r.add(i)}return new Ss(t.key,s,new Gt(r.toArray()),lt.none())}}function YI(t,e,n){t instanceof lo?function(r,i,o){const l=r.value.clone(),c=Gf(r.fieldTransforms,i,o.transformResults);l.setAll(c),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof Ss?function(r,i,o){if(!ea(r.precondition,i))return void i.convertToUnknownDocument(o.version);const l=Gf(r.fieldTransforms,i,o.transformResults),c=i.data;c.setAll(p0(r)),c.setAll(l),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(t,e,n):function(r,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function Ri(t,e,n,s){return t instanceof lo?function(i,o,l,c){if(!ea(i.precondition,o))return l;const u=i.value.clone(),h=Qf(i.fieldTransforms,c,o);return u.setAll(h),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null}(t,e,n,s):t instanceof Ss?function(i,o,l,c){if(!ea(i.precondition,o))return l;const u=Qf(i.fieldTransforms,c,o),h=o.data;return h.setAll(p0(i)),h.setAll(u),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(g=>g.field))}(t,e,n,s):function(i,o,l){return ea(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function JI(t,e){let n=null;for(const s of t.fieldTransforms){const r=e.data.field(s.field),i=c0(s.transform,r||null);i!=null&&(n===null&&(n=$t.empty()),n.set(s.field,i))}return n||null}function Kf(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(s,r){return s===void 0&&r===void 0||!(!s||!r)&&Dr(s,r,(i,o)=>GI(i,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class lo extends _l{constructor(e,n,s,r=[]){super(),this.key=e,this.value=n,this.precondition=s,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class Ss extends _l{constructor(e,n,s,r,i=[]){super(),this.key=e,this.data=n,this.fieldMask=s,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function p0(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const s=t.data.field(n);e.set(n,s)}}),e}function Gf(t,e,n){const s=new Map;Me(t.length===n.length);for(let r=0;r<n.length;r++){const i=t[r],o=i.transform,l=e.data.field(i.field);s.set(i.field,WI(o,l,n[r]))}return s}function Qf(t,e,n){const s=new Map;for(const r of t){const i=r.transform,o=n.data.field(r.field);s.set(r.field,HI(i,o,e))}return s}class co extends _l{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class g0 extends _l{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XI{constructor(e,n,s,r){this.batchId=e,this.localWriteTime=n,this.baseMutations=s,this.mutations=r}applyToRemoteDocument(e,n){const s=n.mutationResults;for(let r=0;r<this.mutations.length;r++){const i=this.mutations[r];i.key.isEqual(e.key)&&YI(i,e,s[r])}}applyToLocalView(e,n){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(n=Ri(s,e,n,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(n=Ri(s,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const s=a0();return this.mutations.forEach(r=>{const i=e.get(r.key),o=i.overlayedDocument;let l=this.applyToLocalView(o,i.mutatedFields);l=n.has(r.key)?null:l;const c=f0(o,l);c!==null&&s.set(r.key,c),o.isValidDocument()||o.convertToNoDocument(fe.min())}),s}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),Te())}isEqual(e){return this.batchId===e.batchId&&Dr(this.mutations,e.mutations,(n,s)=>Kf(n,s))&&Dr(this.baseMutations,e.baseMutations,(n,s)=>Kf(n,s))}}class $u{constructor(e,n,s,r){this.batch=e,this.commitVersion=n,this.mutationResults=s,this.docVersions=r}static from(e,n,s){Me(e.mutations.length===s.length);let r=function(){return UI}();const i=e.mutations;for(let o=0;o<i.length;o++)r=r.insert(i[o].key,s[o].version);return new $u(e,n,s,r)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZI{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eT{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var at,Ce;function m0(t){switch(t){default:return de();case $.CANCELLED:case $.UNKNOWN:case $.DEADLINE_EXCEEDED:case $.RESOURCE_EXHAUSTED:case $.INTERNAL:case $.UNAVAILABLE:case $.UNAUTHENTICATED:return!1;case $.INVALID_ARGUMENT:case $.NOT_FOUND:case $.ALREADY_EXISTS:case $.PERMISSION_DENIED:case $.FAILED_PRECONDITION:case $.ABORTED:case $.OUT_OF_RANGE:case $.UNIMPLEMENTED:case $.DATA_LOSS:return!0}}function y0(t){if(t===void 0)return Jn("GRPC error has no .code"),$.UNKNOWN;switch(t){case at.OK:return $.OK;case at.CANCELLED:return $.CANCELLED;case at.UNKNOWN:return $.UNKNOWN;case at.DEADLINE_EXCEEDED:return $.DEADLINE_EXCEEDED;case at.RESOURCE_EXHAUSTED:return $.RESOURCE_EXHAUSTED;case at.INTERNAL:return $.INTERNAL;case at.UNAVAILABLE:return $.UNAVAILABLE;case at.UNAUTHENTICATED:return $.UNAUTHENTICATED;case at.INVALID_ARGUMENT:return $.INVALID_ARGUMENT;case at.NOT_FOUND:return $.NOT_FOUND;case at.ALREADY_EXISTS:return $.ALREADY_EXISTS;case at.PERMISSION_DENIED:return $.PERMISSION_DENIED;case at.FAILED_PRECONDITION:return $.FAILED_PRECONDITION;case at.ABORTED:return $.ABORTED;case at.OUT_OF_RANGE:return $.OUT_OF_RANGE;case at.UNIMPLEMENTED:return $.UNIMPLEMENTED;case at.DATA_LOSS:return $.DATA_LOSS;default:return de()}}(Ce=at||(at={}))[Ce.OK=0]="OK",Ce[Ce.CANCELLED=1]="CANCELLED",Ce[Ce.UNKNOWN=2]="UNKNOWN",Ce[Ce.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ce[Ce.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ce[Ce.NOT_FOUND=5]="NOT_FOUND",Ce[Ce.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ce[Ce.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ce[Ce.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ce[Ce.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ce[Ce.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ce[Ce.ABORTED=10]="ABORTED",Ce[Ce.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ce[Ce.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ce[Ce.INTERNAL=13]="INTERNAL",Ce[Ce.UNAVAILABLE=14]="UNAVAILABLE",Ce[Ce.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tT(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nT=new Zs([4294967295,4294967295],0);function Yf(t){const e=tT().encode(t),n=new Um;return n.update(e),new Uint8Array(n.digest())}function Jf(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),s=e.getUint32(4,!0),r=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Zs([n,s],0),new Zs([r,i],0)]}class Uu{constructor(e,n,s){if(this.bitmap=e,this.padding=n,this.hashCount=s,n<0||n>=8)throw new yi(`Invalid padding: ${n}`);if(s<0)throw new yi(`Invalid hash count: ${s}`);if(e.length>0&&this.hashCount===0)throw new yi(`Invalid hash count: ${s}`);if(e.length===0&&n!==0)throw new yi(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=Zs.fromNumber(this.Ie)}Ee(e,n,s){let r=e.add(n.multiply(Zs.fromNumber(s)));return r.compare(nT)===1&&(r=new Zs([r.getBits(0),r.getBits(1)],0)),r.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=Yf(e),[s,r]=Jf(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(s,r,i);if(!this.de(o))return!1}return!0}static create(e,n,s){const r=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Uu(i,r,n);return s.forEach(l=>o.insert(l)),o}insert(e){if(this.Ie===0)return;const n=Yf(e),[s,r]=Jf(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(s,r,i);this.Ae(o)}}Ae(e){const n=Math.floor(e/8),s=e%8;this.bitmap[n]|=1<<s}}class yi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vl{constructor(e,n,s,r,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=s,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,s){const r=new Map;return r.set(e,uo.createSynthesizedTargetChangeForCurrentChange(e,n,s)),new vl(fe.min(),r,new Je(Ne),Xn(),Te())}}class uo{constructor(e,n,s,r,i){this.resumeToken=e,this.current=n,this.addedDocuments=s,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,s){return new uo(s,n,Te(),Te(),Te())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(e,n,s,r){this.Re=e,this.removedTargetIds=n,this.key=s,this.Ve=r}}class _0{constructor(e,n){this.targetId=e,this.me=n}}class v0{constructor(e,n,s=It.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=n,this.resumeToken=s,this.cause=r}}class Xf{constructor(){this.fe=0,this.ge=ep(),this.pe=It.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=Te(),n=Te(),s=Te();return this.ge.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:n=n.add(r);break;case 1:s=s.add(r);break;default:de()}}),new uo(this.pe,this.ye,e,n,s)}Ce(){this.we=!1,this.ge=ep()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,Me(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class sT{constructor(e){this.Le=e,this.Be=new Map,this.ke=Xn(),this.qe=Zf(),this.Qe=new Je(Ne)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const s=this.Ge(n);switch(e.state){case 0:this.ze(n)&&s.De(e.resumeToken);break;case 1:s.Oe(),s.Se||s.Ce(),s.De(e.resumeToken);break;case 2:s.Oe(),s.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(s.Ne(),s.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),s.De(e.resumeToken));break;default:de()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((s,r)=>{this.ze(r)&&n(r)})}He(e){const n=e.targetId,s=e.me.count,r=this.Je(n);if(r){const i=r.target;if(qc(i))if(s===0){const o=new le(i.path);this.Ue(n,o,gt.newNoDocument(o,fe.min()))}else Me(s===1);else{const o=this.Ye(n);if(o!==s){const l=this.Ze(e),c=l?this.Xe(l,e,o):1;if(c!==0){this.je(n);const u=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,u)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:s="",padding:r=0},hashCount:i=0}=n;let o,l;try{o=rr(s).toUint8Array()}catch(c){if(c instanceof Qm)return Nr("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new Uu(o,r,i)}catch(c){return Nr(c instanceof yi?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.Ie===0?null:l}Xe(e,n,s){return n.me.count===s-this.nt(e,n.targetId)?0:2}nt(e,n){const s=this.Le.getRemoteKeysForTarget(n);let r=0;return s.forEach(i=>{const o=this.Le.tt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.Ue(n,i,null),r++)}),r}rt(e){const n=new Map;this.Be.forEach((i,o)=>{const l=this.Je(o);if(l){if(i.current&&qc(l.target)){const c=new le(l.target.path);this.ke.get(c)!==null||this.it(o,c)||this.Ue(o,c,gt.newNoDocument(c,e))}i.be&&(n.set(o,i.ve()),i.Ce())}});let s=Te();this.qe.forEach((i,o)=>{let l=!0;o.forEachWhile(c=>{const u=this.Je(c);return!u||u.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(s=s.add(i))}),this.ke.forEach((i,o)=>o.setReadTime(e));const r=new vl(e,n,this.Qe,this.ke,s);return this.ke=Xn(),this.qe=Zf(),this.Qe=new Je(Ne),r}$e(e,n){if(!this.ze(e))return;const s=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,s),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,s){if(!this.ze(e))return;const r=this.Ge(e);this.it(e,n)?r.Fe(n,1):r.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),s&&(this.ke=this.ke.insert(n,s))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new Xf,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new xt(Ne),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||re("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Xf),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function Zf(){return new Je(le.comparator)}function ep(){return new Je(le.comparator)}const rT={asc:"ASCENDING",desc:"DESCENDING"},iT={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},oT={and:"AND",or:"OR"};class aT{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Wc(t,e){return t.useProto3Json||ao(e)?e:{value:e}}function Ra(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function b0(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function lT(t,e){return Ra(t,e.toTimestamp())}function Jt(t){return Me(!!t),fe.fromTimestamp(function(n){const s=Es(n);return new ht(s.seconds,s.nanos)}(t))}function ju(t,e){return Kc(t,e).canonicalString()}function Kc(t,e){const n=function(r){return new He(["projects",r.projectId,"databases",r.database])}(t).child("documents");return e===void 0?n:n.child(e)}function w0(t){const e=He.fromString(t);return Me(A0(e)),e}function Pa(t,e){return ju(t.databaseId,e.path)}function Pi(t,e){const n=w0(e);if(n.get(1)!==t.databaseId.projectId)throw new se($.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new se($.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new le(I0(n))}function x0(t,e){return ju(t.databaseId,e)}function cT(t){const e=w0(t);return e.length===4?He.emptyPath():I0(e)}function Gc(t){return new He(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function I0(t){return Me(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function tp(t,e,n){return{name:Pa(t,e),fields:n.value.mapValue.fields}}function uT(t,e){return"found"in e?function(s,r){Me(!!r.found),r.found.name,r.found.updateTime;const i=Pi(s,r.found.name),o=Jt(r.found.updateTime),l=r.found.createTime?Jt(r.found.createTime):fe.min(),c=new $t({mapValue:{fields:r.found.fields}});return gt.newFoundDocument(i,o,l,c)}(t,e):"missing"in e?function(s,r){Me(!!r.missing),Me(!!r.readTime);const i=Pi(s,r.missing),o=Jt(r.readTime);return gt.newNoDocument(i,o)}(t,e):de()}function dT(t,e){let n;if("targetChange"in e){e.targetChange;const s=function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:de()}(e.targetChange.targetChangeType||"NO_CHANGE"),r=e.targetChange.targetIds||[],i=function(u,h){return u.useProto3Json?(Me(h===void 0||typeof h=="string"),It.fromBase64String(h||"")):(Me(h===void 0||h instanceof Buffer||h instanceof Uint8Array),It.fromUint8Array(h||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(u){const h=u.code===void 0?$.UNKNOWN:y0(u.code);return new se(h,u.message||"")}(o);n=new v0(s,r,i,l||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const r=Pi(t,s.document.name),i=Jt(s.document.updateTime),o=s.document.createTime?Jt(s.document.createTime):fe.min(),l=new $t({mapValue:{fields:s.document.fields}}),c=gt.newFoundDocument(r,i,o,l),u=s.targetIds||[],h=s.removedTargetIds||[];n=new ta(u,h,c.key,c)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const r=Pi(t,s.document),i=s.readTime?Jt(s.readTime):fe.min(),o=gt.newNoDocument(r,i),l=s.removedTargetIds||[];n=new ta([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const r=Pi(t,s.document),i=s.removedTargetIds||[];n=new ta([],i,r,null)}else{if(!("filter"in e))return de();{e.filter;const s=e.filter;s.targetId;const{count:r=0,unchangedNames:i}=s,o=new eT(r,i),l=s.targetId;n=new _0(l,o)}}return n}function T0(t,e){let n;if(e instanceof lo)n={update:tp(t,e.key,e.value)};else if(e instanceof co)n={delete:Pa(t,e.key)};else if(e instanceof Ss)n={update:tp(t,e.key,e.data),updateMask:bT(e.fieldMask)};else{if(!(e instanceof g0))return de();n={verify:Pa(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(s=>function(i,o){const l=o.transform;if(l instanceof Gi)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Qi)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Yi)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Ca)return{fieldPath:o.field.canonicalString(),increment:l.Pe};throw de()}(0,s))),e.precondition.isNone||(n.currentDocument=function(r,i){return i.updateTime!==void 0?{updateTime:lT(r,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:de()}(t,e.precondition)),n}function hT(t,e){return t&&t.length>0?(Me(e!==void 0),t.map(n=>function(r,i){let o=r.updateTime?Jt(r.updateTime):Jt(i);return o.isEqual(fe.min())&&(o=Jt(i)),new QI(o,r.transformResults||[])}(n,e))):[]}function fT(t,e){return{documents:[x0(t,e.path)]}}function pT(t,e){const n={structuredQuery:{}},s=e.path;let r;e.collectionGroup!==null?(r=s,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(r=s.popLast(),n.structuredQuery.from=[{collectionId:s.lastSegment()}]),n.parent=x0(t,r);const i=function(u){if(u.length!==0)return k0(On.create(u,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(u){if(u.length!==0)return u.map(h=>function(y){return{field:Ir(y.field),direction:yT(y.dir)}}(h))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=Wc(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(u){return{before:u.inclusive,values:u.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(u){return{before:!u.inclusive,values:u.position}}(e.endAt)),{_t:n,parent:r}}function gT(t){let e=cT(t.parent);const n=t.structuredQuery,s=n.from?n.from.length:0;let r=null;if(s>0){Me(s===1);const h=n.from[0];h.allDescendants?r=h.collectionId:e=e.child(h.collectionId)}let i=[];n.where&&(i=function(g){const y=E0(g);return y instanceof On&&Zm(y)?y.getFilters():[y]}(n.where));let o=[];n.orderBy&&(o=function(g){return g.map(y=>function(_){return new Sa(Tr(_.field),function(M){switch(M){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(_.direction))}(y))}(n.orderBy));let l=null;n.limit&&(l=function(g){let y;return y=typeof g=="object"?g.value:g,ao(y)?null:y}(n.limit));let c=null;n.startAt&&(c=function(g){const y=!!g.before,m=g.values||[];return new Aa(m,y)}(n.startAt));let u=null;return n.endAt&&(u=function(g){const y=!g.before,m=g.values||[];return new Aa(m,y)}(n.endAt)),NI(e,r,o,i,l,"F",c,u)}function mT(t,e){const n=function(r){switch(r){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return de()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function E0(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const s=Tr(n.unaryFilter.field);return dt.create(s,"==",{doubleValue:NaN});case"IS_NULL":const r=Tr(n.unaryFilter.field);return dt.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Tr(n.unaryFilter.field);return dt.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Tr(n.unaryFilter.field);return dt.create(o,"!=",{nullValue:"NULL_VALUE"});default:return de()}}(t):t.fieldFilter!==void 0?function(n){return dt.create(Tr(n.fieldFilter.field),function(r){switch(r){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return de()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return On.create(n.compositeFilter.filters.map(s=>E0(s)),function(r){switch(r){case"AND":return"and";case"OR":return"or";default:return de()}}(n.compositeFilter.op))}(t):de()}function yT(t){return rT[t]}function _T(t){return iT[t]}function vT(t){return oT[t]}function Ir(t){return{fieldPath:t.canonicalString()}}function Tr(t){return wt.fromServerFormat(t.fieldPath)}function k0(t){return t instanceof dt?function(n){if(n.op==="=="){if(jf(n.value))return{unaryFilter:{field:Ir(n.field),op:"IS_NAN"}};if(Uf(n.value))return{unaryFilter:{field:Ir(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(jf(n.value))return{unaryFilter:{field:Ir(n.field),op:"IS_NOT_NAN"}};if(Uf(n.value))return{unaryFilter:{field:Ir(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ir(n.field),op:_T(n.op),value:n.value}}}(t):t instanceof On?function(n){const s=n.getFilters().map(r=>k0(r));return s.length===1?s[0]:{compositeFilter:{op:vT(n.op),filters:s}}}(t):de()}function bT(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function A0(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gs{constructor(e,n,s,r,i=fe.min(),o=fe.min(),l=It.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=n,this.purpose=s,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new gs(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new gs(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new gs(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new gs(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wT{constructor(e){this.ct=e}}function xT(t){const e=gT({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Hc(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IT{constructor(){this.un=new TT}addToCollectionParentIndex(e,n){return this.un.add(n),z.resolve()}getCollectionParents(e,n){return z.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return z.resolve()}deleteFieldIndex(e,n){return z.resolve()}deleteAllFieldIndexes(e){return z.resolve()}createTargetIndexes(e,n){return z.resolve()}getDocumentsMatchingTarget(e,n){return z.resolve(null)}getIndexType(e,n){return z.resolve(0)}getFieldIndexes(e,n){return z.resolve([])}getNextCollectionGroupToUpdate(e){return z.resolve(null)}getMinOffset(e,n){return z.resolve(Ts.min())}getMinOffsetFromCollectionGroup(e,n){return z.resolve(Ts.min())}updateCollectionGroup(e,n,s){return z.resolve()}updateIndexEntries(e,n){return z.resolve()}}class TT{constructor(){this.index={}}add(e){const n=e.lastSegment(),s=e.popLast(),r=this.index[n]||new xt(He.comparator),i=!r.has(s);return this.index[n]=r.add(s),i}has(e){const n=e.lastSegment(),s=e.popLast(),r=this.index[n];return r&&r.has(s)}getEntries(e){return(this.index[e]||new xt(He.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Fr(0)}static kn(){return new Fr(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ET{constructor(){this.changes=new Br(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,gt.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const s=this.changes.get(n);return s!==void 0?z.resolve(s):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kT{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AT{constructor(e,n,s,r){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=s,this.indexManager=r}getDocument(e,n){let s=null;return this.documentOverlayCache.getOverlay(e,n).next(r=>(s=r,this.remoteDocumentCache.getEntry(e,n))).next(r=>(s!==null&&Ri(s.mutation,r,Gt.empty(),ht.now()),r))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.getLocalViewOfDocuments(e,s,Te()).next(()=>s))}getLocalViewOfDocuments(e,n,s=Te()){const r=Qs();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,s).next(i=>{let o=mi();return i.forEach((l,c)=>{o=o.insert(l,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const s=Qs();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,Te()))}populateOverlays(e,n,s){const r=[];return s.forEach(i=>{n.has(i)||r.push(i)}),this.documentOverlayCache.getOverlays(e,r).next(i=>{i.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,s,r){let i=Xn();const o=Ci(),l=function(){return Ci()}();return n.forEach((c,u)=>{const h=s.get(u.key);r.has(u.key)&&(h===void 0||h.mutation instanceof Ss)?i=i.insert(u.key,u):h!==void 0?(o.set(u.key,h.mutation.getFieldMask()),Ri(h.mutation,u,h.mutation.getFieldMask(),ht.now())):o.set(u.key,Gt.empty())}),this.recalculateAndSaveOverlays(e,i).next(c=>(c.forEach((u,h)=>o.set(u,h)),n.forEach((u,h)=>{var g;return l.set(u,new kT(h,(g=o.get(u))!==null&&g!==void 0?g:null))}),l))}recalculateAndSaveOverlays(e,n){const s=Ci();let r=new Je((o,l)=>o-l),i=Te();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(c=>{const u=n.get(c);if(u===null)return;let h=s.get(c)||Gt.empty();h=l.applyToLocalView(u,h),s.set(c,h);const g=(r.get(l.batchId)||Te()).add(c);r=r.insert(l.batchId,g)})}).next(()=>{const o=[],l=r.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),u=c.key,h=c.value,g=a0();h.forEach(y=>{if(!i.has(y)){const m=f0(n.get(y),s.get(y));m!==null&&g.set(y,m),i=i.add(y)}}),o.push(this.documentOverlayCache.saveOverlays(e,u,g))}return z.waitFor(o)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.recalculateAndSaveOverlays(e,s))}getDocumentsMatchingQuery(e,n,s,r){return function(o){return le.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):DI(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,s,r):this.getDocumentsMatchingCollectionQuery(e,n,s,r)}getNextDocuments(e,n,s,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,s,r).next(i=>{const o=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,s.largestBatchId,r-i.size):z.resolve(Qs());let l=-1,c=i;return o.next(u=>z.forEach(u,(h,g)=>(l<g.largestBatchId&&(l=g.largestBatchId),i.get(h)?z.resolve():this.remoteDocumentCache.getEntry(e,h).next(y=>{c=c.insert(h,y)}))).next(()=>this.populateOverlays(e,u,i)).next(()=>this.computeViews(e,c,u,Te())).next(h=>({batchId:l,changes:o0(h)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new le(n)).next(s=>{let r=mi();return s.isFoundDocument()&&(r=r.insert(s.key,s)),r})}getDocumentsMatchingCollectionGroupQuery(e,n,s,r){const i=n.collectionGroup;let o=mi();return this.indexManager.getCollectionParents(e,i).next(l=>z.forEach(l,c=>{const u=function(g,y){return new fl(y,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(n,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,u,s,r).next(h=>{h.forEach((g,y)=>{o=o.insert(g,y)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,s,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,s.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,s,i,r))).next(o=>{i.forEach((c,u)=>{const h=u.getKey();o.get(h)===null&&(o=o.insert(h,gt.newInvalidDocument(h)))});let l=mi();return o.forEach((c,u)=>{const h=i.get(c);h!==void 0&&Ri(h.mutation,u,Gt.empty(),ht.now()),ml(n,u)&&(l=l.insert(c,u))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ST{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return z.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(r){return{id:r.id,version:r.version,createTime:Jt(r.createTime)}}(n)),z.resolve()}getNamedQuery(e,n){return z.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(r){return{name:r.name,query:xT(r.bundledQuery),readTime:Jt(r.readTime)}}(n)),z.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CT{constructor(){this.overlays=new Je(le.comparator),this.Ir=new Map}getOverlay(e,n){return z.resolve(this.overlays.get(n))}getOverlays(e,n){const s=Qs();return z.forEach(n,r=>this.getOverlay(e,r).next(i=>{i!==null&&s.set(r,i)})).next(()=>s)}saveOverlays(e,n,s){return s.forEach((r,i)=>{this.ht(e,n,i)}),z.resolve()}removeOverlaysForBatchId(e,n,s){const r=this.Ir.get(s);return r!==void 0&&(r.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ir.delete(s)),z.resolve()}getOverlaysForCollection(e,n,s){const r=Qs(),i=n.length+1,o=new le(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const c=l.getNext().value,u=c.getKey();if(!n.isPrefixOf(u.path))break;u.path.length===i&&c.largestBatchId>s&&r.set(c.getKey(),c)}return z.resolve(r)}getOverlaysForCollectionGroup(e,n,s,r){let i=new Je((u,h)=>u-h);const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===n&&u.largestBatchId>s){let h=i.get(u.largestBatchId);h===null&&(h=Qs(),i=i.insert(u.largestBatchId,h)),h.set(u.getKey(),u)}}const l=Qs(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((u,h)=>l.set(u,h)),!(l.size()>=r)););return z.resolve(l)}ht(e,n,s){const r=this.overlays.get(s.key);if(r!==null){const o=this.Ir.get(r.largestBatchId).delete(s.key);this.Ir.set(r.largestBatchId,o)}this.overlays=this.overlays.insert(s.key,new ZI(n,s));let i=this.Ir.get(n);i===void 0&&(i=Te(),this.Ir.set(n,i)),this.Ir.set(n,i.add(s.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RT{constructor(){this.sessionToken=It.EMPTY_BYTE_STRING}getSessionToken(e){return z.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,z.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bu{constructor(){this.Tr=new xt(pt.Er),this.dr=new xt(pt.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const s=new pt(e,n);this.Tr=this.Tr.add(s),this.dr=this.dr.add(s)}Rr(e,n){e.forEach(s=>this.addReference(s,n))}removeReference(e,n){this.Vr(new pt(e,n))}mr(e,n){e.forEach(s=>this.removeReference(s,n))}gr(e){const n=new le(new He([])),s=new pt(n,e),r=new pt(n,e+1),i=[];return this.dr.forEachInRange([s,r],o=>{this.Vr(o),i.push(o.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new le(new He([])),s=new pt(n,e),r=new pt(n,e+1);let i=Te();return this.dr.forEachInRange([s,r],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new pt(e,0),s=this.Tr.firstAfterOrEqual(n);return s!==null&&e.isEqual(s.key)}}class pt{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return le.comparator(e.key,n.key)||Ne(e.wr,n.wr)}static Ar(e,n){return Ne(e.wr,n.wr)||le.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PT{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new xt(pt.Er)}checkEmpty(e){return z.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,s,r){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new XI(i,n,s,r);this.mutationQueue.push(o);for(const l of r)this.br=this.br.add(new pt(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return z.resolve(o)}lookupMutationBatch(e,n){return z.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const s=n+1,r=this.vr(s),i=r<0?0:r;return z.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return z.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return z.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const s=new pt(n,0),r=new pt(n,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([s,r],o=>{const l=this.Dr(o.wr);i.push(l)}),z.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let s=new xt(Ne);return n.forEach(r=>{const i=new pt(r,0),o=new pt(r,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,o],l=>{s=s.add(l.wr)})}),z.resolve(this.Cr(s))}getAllMutationBatchesAffectingQuery(e,n){const s=n.path,r=s.length+1;let i=s;le.isDocumentKey(i)||(i=i.child(""));const o=new pt(new le(i),0);let l=new xt(Ne);return this.br.forEachWhile(c=>{const u=c.key.path;return!!s.isPrefixOf(u)&&(u.length===r&&(l=l.add(c.wr)),!0)},o),z.resolve(this.Cr(l))}Cr(e){const n=[];return e.forEach(s=>{const r=this.Dr(s);r!==null&&n.push(r)}),n}removeMutationBatch(e,n){Me(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let s=this.br;return z.forEach(n.mutations,r=>{const i=new pt(r.key,n.batchId);return s=s.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.br=s})}On(e){}containsKey(e,n){const s=new pt(n,0),r=this.br.firstAfterOrEqual(s);return z.resolve(n.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,z.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MT{constructor(e){this.Mr=e,this.docs=function(){return new Je(le.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const s=n.key,r=this.docs.get(s),i=r?r.size:0,o=this.Mr(n);return this.docs=this.docs.insert(s,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const s=this.docs.get(n);return z.resolve(s?s.document.mutableCopy():gt.newInvalidDocument(n))}getEntries(e,n){let s=Xn();return n.forEach(r=>{const i=this.docs.get(r);s=s.insert(r,i?i.document.mutableCopy():gt.newInvalidDocument(r))}),z.resolve(s)}getDocumentsMatchingQuery(e,n,s,r){let i=Xn();const o=n.path,l=new le(o.child("")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:u,value:{document:h}}=c.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||gI(pI(h),s)<=0||(r.has(h.key)||ml(n,h))&&(i=i.insert(h.key,h.mutableCopy()))}return z.resolve(i)}getAllFromCollectionGroup(e,n,s,r){de()}Or(e,n){return z.forEach(this.docs,s=>n(s))}newChangeBuffer(e){return new OT(this)}getSize(e){return z.resolve(this.size)}}class OT extends ET{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((s,r)=>{r.isValidDocument()?n.push(this.cr.addEntry(e,r)):this.cr.removeEntry(s)}),z.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NT{constructor(e){this.persistence=e,this.Nr=new Br(n=>Vu(n),Lu),this.lastRemoteSnapshotVersion=fe.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Bu,this.targetCount=0,this.kr=Fr.Bn()}forEachTarget(e,n){return this.Nr.forEach((s,r)=>n(r)),z.resolve()}getLastRemoteSnapshotVersion(e){return z.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return z.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),z.resolve(this.highestTargetId)}setTargetsMetadata(e,n,s){return s&&(this.lastRemoteSnapshotVersion=s),n>this.Lr&&(this.Lr=n),z.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new Fr(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,z.resolve()}updateTargetData(e,n){return this.Kn(n),z.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,z.resolve()}removeTargets(e,n,s){let r=0;const i=[];return this.Nr.forEach((o,l)=>{l.sequenceNumber<=n&&s.get(l.targetId)===null&&(this.Nr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),r++)}),z.waitFor(i).next(()=>r)}getTargetCount(e){return z.resolve(this.targetCount)}getTargetData(e,n){const s=this.Nr.get(n)||null;return z.resolve(s)}addMatchingKeys(e,n,s){return this.Br.Rr(n,s),z.resolve()}removeMatchingKeys(e,n,s){this.Br.mr(n,s);const r=this.persistence.referenceDelegate,i=[];return r&&n.forEach(o=>{i.push(r.markPotentiallyOrphaned(e,o))}),z.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),z.resolve()}getMatchingKeysForTargetId(e,n){const s=this.Br.yr(n);return z.resolve(s)}containsKey(e,n){return z.resolve(this.Br.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DT{constructor(e,n){this.qr={},this.overlays={},this.Qr=new Mu(0),this.Kr=!1,this.Kr=!0,this.$r=new RT,this.referenceDelegate=e(this),this.Ur=new NT(this),this.indexManager=new IT,this.remoteDocumentCache=function(r){return new MT(r)}(s=>this.referenceDelegate.Wr(s)),this.serializer=new wT(n),this.Gr=new ST(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new CT,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let s=this.qr[e.toKey()];return s||(s=new PT(n,this.referenceDelegate),this.qr[e.toKey()]=s),s}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,s){re("MemoryPersistence","Starting transaction:",e);const r=new VT(this.Qr.next());return this.referenceDelegate.zr(),s(r).next(i=>this.referenceDelegate.jr(r).next(()=>i)).toPromise().then(i=>(r.raiseOnCommittedEvent(),i))}Hr(e,n){return z.or(Object.values(this.qr).map(s=>()=>s.containsKey(e,n)))}}class VT extends yI{constructor(e){super(),this.currentSequenceNumber=e}}class zu{constructor(e){this.persistence=e,this.Jr=new Bu,this.Yr=null}static Zr(e){return new zu(e)}get Xr(){if(this.Yr)return this.Yr;throw de()}addReference(e,n,s){return this.Jr.addReference(s,n),this.Xr.delete(s.toString()),z.resolve()}removeReference(e,n,s){return this.Jr.removeReference(s,n),this.Xr.add(s.toString()),z.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),z.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(r=>this.Xr.add(r.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,n.targetId).next(r=>{r.forEach(i=>this.Xr.add(i.toString()))}).next(()=>s.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return z.forEach(this.Xr,s=>{const r=le.fromPath(s);return this.ei(e,r).next(i=>{i||n.removeEntry(r,fe.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(s=>{s?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return z.or([()=>z.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(e,n,s,r){this.targetId=e,this.fromCache=n,this.$i=s,this.Ui=r}static Wi(e,n){let s=Te(),r=Te();for(const i of n.docChanges)switch(i.type){case 0:s=s.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new qu(e,n.fromCache,s,r)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LT{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FT{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return _w()?8:_I(Nt())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,s,r){const i={result:null};return this.Yi(e,n).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.Zi(e,n,r,s).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new LT;return this.Xi(e,n,o).next(l=>{if(i.result=l,this.zi)return this.es(e,n,o,l.size)})}).next(()=>i.result)}es(e,n,s,r){return s.documentReadCount<this.ji?(ui()<=ke.DEBUG&&re("QueryEngine","SDK will not create cache indexes for query:",xr(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),z.resolve()):(ui()<=ke.DEBUG&&re("QueryEngine","Query:",xr(n),"scans",s.documentReadCount,"local documents and returns",r,"documents as results."),s.documentReadCount>this.Hi*r?(ui()<=ke.DEBUG&&re("QueryEngine","The SDK decides to create cache indexes for query:",xr(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,En(n))):z.resolve())}Yi(e,n){if(Hf(n))return z.resolve(null);let s=En(n);return this.indexManager.getIndexType(e,s).next(r=>r===0?null:(n.limit!==null&&r===1&&(n=Hc(n,null,"F"),s=En(n)),this.indexManager.getDocumentsMatchingTarget(e,s).next(i=>{const o=Te(...i);return this.Ji.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,s).next(c=>{const u=this.ts(n,l);return this.ns(n,u,o,c.readTime)?this.Yi(e,Hc(n,null,"F")):this.rs(e,u,n,c)}))})))}Zi(e,n,s,r){return Hf(n)||r.isEqual(fe.min())?z.resolve(null):this.Ji.getDocuments(e,s).next(i=>{const o=this.ts(n,i);return this.ns(n,o,s,r)?z.resolve(null):(ui()<=ke.DEBUG&&re("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),xr(n)),this.rs(e,o,n,fI(r,-1)).next(l=>l))})}ts(e,n){let s=new xt(r0(e));return n.forEach((r,i)=>{ml(e,i)&&(s=s.add(i))}),s}ns(e,n,s,r){if(e.limit===null)return!1;if(s.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Xi(e,n,s){return ui()<=ke.DEBUG&&re("QueryEngine","Using full collection scan to execute query:",xr(n)),this.Ji.getDocumentsMatchingQuery(e,n,Ts.min(),s)}rs(e,n,s,r){return this.Ji.getDocumentsMatchingQuery(e,s,r).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $T{constructor(e,n,s,r){this.persistence=e,this.ss=n,this.serializer=r,this.os=new Je(Ne),this._s=new Br(i=>Vu(i),Lu),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(s)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new AT(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function UT(t,e,n,s){return new $T(t,e,n,s)}async function S0(t,e){const n=ge(t);return await n.persistence.runTransaction("Handle user change","readonly",s=>{let r;return n.mutationQueue.getAllMutationBatches(s).next(i=>(r=i,n.ls(e),n.mutationQueue.getAllMutationBatches(s))).next(i=>{const o=[],l=[];let c=Te();for(const u of r){o.push(u.batchId);for(const h of u.mutations)c=c.add(h.key)}for(const u of i){l.push(u.batchId);for(const h of u.mutations)c=c.add(h.key)}return n.localDocuments.getDocuments(s,c).next(u=>({hs:u,removedBatchIds:o,addedBatchIds:l}))})})}function jT(t,e){const n=ge(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const r=e.batch.keys(),i=n.cs.newChangeBuffer({trackRemovals:!0});return function(l,c,u,h){const g=u.batch,y=g.keys();let m=z.resolve();return y.forEach(_=>{m=m.next(()=>h.getEntry(c,_)).next(A=>{const M=u.docVersions.get(_);Me(M!==null),A.version.compareTo(M)<0&&(g.applyToRemoteDocument(A,u),A.isValidDocument()&&(A.setReadTime(u.commitVersion),h.addEntry(A)))})}),m.next(()=>l.mutationQueue.removeMutationBatch(c,g))}(n,s,e,i).next(()=>i.apply(s)).next(()=>n.mutationQueue.performConsistencyCheck(s)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(s,r,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,function(l){let c=Te();for(let u=0;u<l.mutationResults.length;++u)l.mutationResults[u].transformResults.length>0&&(c=c.add(l.batch.mutations[u].key));return c}(e))).next(()=>n.localDocuments.getDocuments(s,r))})}function C0(t){const e=ge(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function BT(t,e){const n=ge(t),s=e.snapshotVersion;let r=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.cs.newChangeBuffer({trackRemovals:!0});r=n.os;const l=[];e.targetChanges.forEach((h,g)=>{const y=r.get(g);if(!y)return;l.push(n.Ur.removeMatchingKeys(i,h.removedDocuments,g).next(()=>n.Ur.addMatchingKeys(i,h.addedDocuments,g)));let m=y.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(g)!==null?m=m.withResumeToken(It.EMPTY_BYTE_STRING,fe.min()).withLastLimboFreeSnapshotVersion(fe.min()):h.resumeToken.approximateByteSize()>0&&(m=m.withResumeToken(h.resumeToken,s)),r=r.insert(g,m),function(A,M,W){return A.resumeToken.approximateByteSize()===0||M.snapshotVersion.toMicroseconds()-A.snapshotVersion.toMicroseconds()>=3e8?!0:W.addedDocuments.size+W.modifiedDocuments.size+W.removedDocuments.size>0}(y,m,h)&&l.push(n.Ur.updateTargetData(i,m))});let c=Xn(),u=Te();if(e.documentUpdates.forEach(h=>{e.resolvedLimboDocuments.has(h)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(i,h))}),l.push(zT(i,o,e.documentUpdates).next(h=>{c=h.Ps,u=h.Is})),!s.isEqual(fe.min())){const h=n.Ur.getLastRemoteSnapshotVersion(i).next(g=>n.Ur.setTargetsMetadata(i,i.currentSequenceNumber,s));l.push(h)}return z.waitFor(l).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,c,u)).next(()=>c)}).then(i=>(n.os=r,i))}function zT(t,e,n){let s=Te(),r=Te();return n.forEach(i=>s=s.add(i)),e.getEntries(t,s).next(i=>{let o=Xn();return n.forEach((l,c)=>{const u=i.get(l);c.isFoundDocument()!==u.isFoundDocument()&&(r=r.add(l)),c.isNoDocument()&&c.version.isEqual(fe.min())?(e.removeEntry(l,c.readTime),o=o.insert(l,c)):!u.isValidDocument()||c.version.compareTo(u.version)>0||c.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(c),o=o.insert(l,c)):re("LocalStore","Ignoring outdated watch update for ",l,". Current version:",u.version," Watch version:",c.version)}),{Ps:o,Is:r}})}function qT(t,e){const n=ge(t);return n.persistence.runTransaction("Get next mutation batch","readonly",s=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(s,e)))}function HT(t,e){const n=ge(t);return n.persistence.runTransaction("Allocate target","readwrite",s=>{let r;return n.Ur.getTargetData(s,e).next(i=>i?(r=i,z.resolve(r)):n.Ur.allocateTargetId(s).next(o=>(r=new gs(e,o,"TargetPurposeListen",s.currentSequenceNumber),n.Ur.addTargetData(s,r).next(()=>r))))}).then(s=>{const r=n.os.get(s.targetId);return(r===null||s.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.os=n.os.insert(s.targetId,s),n._s.set(e,s.targetId)),s})}async function Qc(t,e,n){const s=ge(t),r=s.os.get(e),i=n?"readwrite":"readwrite-primary";try{n||await s.persistence.runTransaction("Release target",i,o=>s.persistence.referenceDelegate.removeTarget(o,r))}catch(o){if(!oo(o))throw o;re("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}s.os=s.os.remove(e),s._s.delete(r.target)}function np(t,e,n){const s=ge(t);let r=fe.min(),i=Te();return s.persistence.runTransaction("Execute query","readwrite",o=>function(c,u,h){const g=ge(c),y=g._s.get(h);return y!==void 0?z.resolve(g.os.get(y)):g.Ur.getTargetData(u,h)}(s,o,En(e)).next(l=>{if(l)return r=l.lastLimboFreeSnapshotVersion,s.Ur.getMatchingKeysForTargetId(o,l.targetId).next(c=>{i=c})}).next(()=>s.ss.getDocumentsMatchingQuery(o,e,n?r:fe.min(),n?i:Te())).next(l=>(WT(s,LI(e),l),{documents:l,Ts:i})))}function WT(t,e,n){let s=t.us.get(e)||fe.min();n.forEach((r,i)=>{i.readTime.compareTo(s)>0&&(s=i.readTime)}),t.us.set(e,s)}class sp{constructor(){this.activeTargetIds=zI()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class KT{constructor(){this.so=new sp,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,s){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,s){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new sp,Promise.resolve()}handleUserChange(e,n,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GT{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){re("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){re("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wo=null;function mc(){return Wo===null?Wo=function(){return 268435456+Math.round(2147483648*Math.random())}():Wo++,"0x"+Wo.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QT={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YT{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const At="WebChannelConnection";class JT extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const s=n.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=s+"://"+n.host,this.vo=`projects/${r}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${r}`:`project_id=${r}&database_id=${i}`}get Fo(){return!1}Mo(n,s,r,i,o){const l=mc(),c=this.xo(n,s.toUriEncodedString());re("RestConnection",`Sending RPC '${n}' ${l}:`,c,r);const u={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(u,i,o),this.No(n,c,u,r).then(h=>(re("RestConnection",`Received RPC '${n}' ${l}: `,h),h),h=>{throw Nr("RestConnection",`RPC '${n}' ${l} failed with error: `,h,"url: ",c,"request:",r),h})}Lo(n,s,r,i,o,l){return this.Mo(n,s,r,i,o)}Oo(n,s,r){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+jr}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),s&&s.headers.forEach((i,o)=>n[o]=i),r&&r.headers.forEach((i,o)=>n[o]=i)}xo(n,s){const r=QT[n];return`${this.Do}/v1/${s}:${r}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,s,r){const i=mc();return new Promise((o,l)=>{const c=new jm;c.setWithCredentials(!0),c.listenOnce(Bm.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case Xo.NO_ERROR:const h=c.getResponseJson();re(At,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(h)),o(h);break;case Xo.TIMEOUT:re(At,`RPC '${e}' ${i} timed out`),l(new se($.DEADLINE_EXCEEDED,"Request time out"));break;case Xo.HTTP_ERROR:const g=c.getStatus();if(re(At,`RPC '${e}' ${i} failed with status:`,g,"response text:",c.getResponseText()),g>0){let y=c.getResponseJson();Array.isArray(y)&&(y=y[0]);const m=y==null?void 0:y.error;if(m&&m.status&&m.message){const _=function(M){const W=M.toLowerCase().replace(/_/g,"-");return Object.values($).indexOf(W)>=0?W:$.UNKNOWN}(m.status);l(new se(_,m.message))}else l(new se($.UNKNOWN,"Server responded with status "+c.getStatus()))}else l(new se($.UNAVAILABLE,"Connection failed."));break;default:de()}}finally{re(At,`RPC '${e}' ${i} completed.`)}});const u=JSON.stringify(r);re(At,`RPC '${e}' ${i} sending request:`,r),c.send(n,"POST",u,s,15)})}Bo(e,n,s){const r=mc(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Hm(),l=qm(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Oo(c.initMessageHeaders,n,s),c.encodeInitMessageHeaders=!0;const h=i.join("");re(At,`Creating RPC '${e}' stream ${r}: ${h}`,c);const g=o.createWebChannel(h,c);let y=!1,m=!1;const _=new YT({Io:M=>{m?re(At,`Not sending because RPC '${e}' stream ${r} is closed:`,M):(y||(re(At,`Opening RPC '${e}' stream ${r} transport.`),g.open(),y=!0),re(At,`RPC '${e}' stream ${r} sending:`,M),g.send(M))},To:()=>g.close()}),A=(M,W,H)=>{M.listen(W,te=>{try{H(te)}catch(Y){setTimeout(()=>{throw Y},0)}})};return A(g,gi.EventType.OPEN,()=>{m||(re(At,`RPC '${e}' stream ${r} transport opened.`),_.yo())}),A(g,gi.EventType.CLOSE,()=>{m||(m=!0,re(At,`RPC '${e}' stream ${r} transport closed`),_.So())}),A(g,gi.EventType.ERROR,M=>{m||(m=!0,Nr(At,`RPC '${e}' stream ${r} transport errored:`,M),_.So(new se($.UNAVAILABLE,"The operation could not be completed")))}),A(g,gi.EventType.MESSAGE,M=>{var W;if(!m){const H=M.data[0];Me(!!H);const te=H,Y=te.error||((W=te[0])===null||W===void 0?void 0:W.error);if(Y){re(At,`RPC '${e}' stream ${r} received error:`,Y);const oe=Y.status;let me=function(b){const E=at[b];if(E!==void 0)return y0(E)}(oe),R=Y.message;me===void 0&&(me=$.INTERNAL,R="Unknown error status: "+oe+" with message "+Y.message),m=!0,_.So(new se(me,R)),g.close()}else re(At,`RPC '${e}' stream ${r} received:`,H),_.bo(H)}}),A(l,zm.STAT_EVENT,M=>{M.stat===Uc.PROXY?re(At,`RPC '${e}' stream ${r} detected buffering proxy`):M.stat===Uc.NOPROXY&&re(At,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{_.wo()},0),_}}function yc(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bl(t){return new aT(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hu{constructor(e,n,s=1e3,r=1.5,i=6e4){this.ui=e,this.timerId=n,this.ko=s,this.qo=r,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),s=Math.max(0,Date.now()-this.Uo),r=Math.max(0,n-s);r>0&&re("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${s} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,r,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R0{constructor(e,n,s,r,i,o,l,c){this.ui=e,this.Ho=s,this.Jo=r,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Hu(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===$.RESOURCE_EXHAUSTED?(Jn(n.toString()),Jn("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===$.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,r])=>{this.Yo===n&&this.P_(s,r)},s=>{e(()=>{const r=new se($.UNKNOWN,"Fetching auth token failed: "+s.message);return this.I_(r)})})}P_(e,n){const s=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{s(()=>this.listener.Eo())}),this.stream.Ro(()=>{s(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(r=>{s(()=>this.I_(r))}),this.stream.onMessage(r=>{s(()=>++this.e_==1?this.E_(r):this.onNext(r))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return re("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(re("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class XT extends R0{constructor(e,n,s,r,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,s,r,o),this.serializer=i}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=dT(this.serializer,e),s=function(i){if(!("targetChange"in i))return fe.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?fe.min():o.readTime?Jt(o.readTime):fe.min()}(e);return this.listener.d_(n,s)}A_(e){const n={};n.database=Gc(this.serializer),n.addTarget=function(i,o){let l;const c=o.target;if(l=qc(c)?{documents:fT(i,c)}:{query:pT(i,c)._t},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=b0(i,o.resumeToken);const u=Wc(i,o.expectedCount);u!==null&&(l.expectedCount=u)}else if(o.snapshotVersion.compareTo(fe.min())>0){l.readTime=Ra(i,o.snapshotVersion.toTimestamp());const u=Wc(i,o.expectedCount);u!==null&&(l.expectedCount=u)}return l}(this.serializer,e);const s=mT(this.serializer,e);s&&(n.labels=s),this.a_(n)}R_(e){const n={};n.database=Gc(this.serializer),n.removeTarget=e,this.a_(n)}}class ZT extends R0{constructor(e,n,s,r,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,s,r,o),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return Me(!!e.streamToken),this.lastStreamToken=e.streamToken,Me(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){Me(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=hT(e.writeResults,e.commitTime),s=Jt(e.commitTime);return this.listener.g_(s,n)}p_(){const e={};e.database=Gc(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(s=>T0(this.serializer,s))};this.a_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eE extends class{}{constructor(e,n,s,r){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=s,this.serializer=r,this.y_=!1}w_(){if(this.y_)throw new se($.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,s,r){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Mo(e,Kc(n,s),r,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===$.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new se($.UNKNOWN,i.toString())})}Lo(e,n,s,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Lo(e,Kc(n,s),r,o,l,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===$.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new se($.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class tE{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Jn(n),this.D_=!1):re("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nE{constructor(e,n,s,r,i){this.localStore=e,this.datastore=n,this.asyncQueue=s,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(o=>{s.enqueueAndForget(async()=>{hr(this)&&(re("RemoteStore","Restarting streams for network reachability change."),await async function(c){const u=ge(c);u.L_.add(4),await ho(u),u.q_.set("Unknown"),u.L_.delete(4),await wl(u)}(this))})}),this.q_=new tE(s,r)}}async function wl(t){if(hr(t))for(const e of t.B_)await e(!0)}async function ho(t){for(const e of t.B_)await e(!1)}function P0(t,e){const n=ge(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),Qu(n)?Gu(n):zr(n).r_()&&Ku(n,e))}function Wu(t,e){const n=ge(t),s=zr(n);n.N_.delete(e),s.r_()&&M0(n,e),n.N_.size===0&&(s.r_()?s.o_():hr(n)&&n.q_.set("Unknown"))}function Ku(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(fe.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}zr(t).A_(e)}function M0(t,e){t.Q_.xe(e),zr(t).R_(e)}function Gu(t){t.Q_=new sT({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),zr(t).start(),t.q_.v_()}function Qu(t){return hr(t)&&!zr(t).n_()&&t.N_.size>0}function hr(t){return ge(t).L_.size===0}function O0(t){t.Q_=void 0}async function sE(t){t.q_.set("Online")}async function rE(t){t.N_.forEach((e,n)=>{Ku(t,e)})}async function iE(t,e){O0(t),Qu(t)?(t.q_.M_(e),Gu(t)):t.q_.set("Unknown")}async function oE(t,e,n){if(t.q_.set("Online"),e instanceof v0&&e.state===2&&e.cause)try{await async function(r,i){const o=i.cause;for(const l of i.targetIds)r.N_.has(l)&&(await r.remoteSyncer.rejectListen(l,o),r.N_.delete(l),r.Q_.removeTarget(l))}(t,e)}catch(s){re("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),s),await Ma(t,s)}else if(e instanceof ta?t.Q_.Ke(e):e instanceof _0?t.Q_.He(e):t.Q_.We(e),!n.isEqual(fe.min()))try{const s=await C0(t.localStore);n.compareTo(s)>=0&&await function(i,o){const l=i.Q_.rt(o);return l.targetChanges.forEach((c,u)=>{if(c.resumeToken.approximateByteSize()>0){const h=i.N_.get(u);h&&i.N_.set(u,h.withResumeToken(c.resumeToken,o))}}),l.targetMismatches.forEach((c,u)=>{const h=i.N_.get(c);if(!h)return;i.N_.set(c,h.withResumeToken(It.EMPTY_BYTE_STRING,h.snapshotVersion)),M0(i,c);const g=new gs(h.target,c,u,h.sequenceNumber);Ku(i,g)}),i.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(s){re("RemoteStore","Failed to raise snapshot:",s),await Ma(t,s)}}async function Ma(t,e,n){if(!oo(e))throw e;t.L_.add(1),await ho(t),t.q_.set("Offline"),n||(n=()=>C0(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{re("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await wl(t)})}function N0(t,e){return e().catch(n=>Ma(t,n,e))}async function xl(t){const e=ge(t),n=ks(e);let s=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;aE(e);)try{const r=await qT(e.localStore,s);if(r===null){e.O_.length===0&&n.o_();break}s=r.batchId,lE(e,r)}catch(r){await Ma(e,r)}D0(e)&&V0(e)}function aE(t){return hr(t)&&t.O_.length<10}function lE(t,e){t.O_.push(e);const n=ks(t);n.r_()&&n.V_&&n.m_(e.mutations)}function D0(t){return hr(t)&&!ks(t).n_()&&t.O_.length>0}function V0(t){ks(t).start()}async function cE(t){ks(t).p_()}async function uE(t){const e=ks(t);for(const n of t.O_)e.m_(n.mutations)}async function dE(t,e,n){const s=t.O_.shift(),r=$u.from(s,e,n);await N0(t,()=>t.remoteSyncer.applySuccessfulWrite(r)),await xl(t)}async function hE(t,e){e&&ks(t).V_&&await async function(s,r){if(function(o){return m0(o)&&o!==$.ABORTED}(r.code)){const i=s.O_.shift();ks(s).s_(),await N0(s,()=>s.remoteSyncer.rejectFailedWrite(i.batchId,r)),await xl(s)}}(t,e),D0(t)&&V0(t)}async function ip(t,e){const n=ge(t);n.asyncQueue.verifyOperationInProgress(),re("RemoteStore","RemoteStore received new credentials");const s=hr(n);n.L_.add(3),await ho(n),s&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await wl(n)}async function fE(t,e){const n=ge(t);e?(n.L_.delete(2),await wl(n)):e||(n.L_.add(2),await ho(n),n.q_.set("Unknown"))}function zr(t){return t.K_||(t.K_=function(n,s,r){const i=ge(n);return i.w_(),new XT(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)}(t.datastore,t.asyncQueue,{Eo:sE.bind(null,t),Ro:rE.bind(null,t),mo:iE.bind(null,t),d_:oE.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),Qu(t)?Gu(t):t.q_.set("Unknown")):(await t.K_.stop(),O0(t))})),t.K_}function ks(t){return t.U_||(t.U_=function(n,s,r){const i=ge(n);return i.w_(),new ZT(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:cE.bind(null,t),mo:hE.bind(null,t),f_:uE.bind(null,t),g_:dE.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await xl(t)):(await t.U_.stop(),t.O_.length>0&&(re("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yu{constructor(e,n,s,r,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=s,this.op=r,this.removalCallback=i,this.deferred=new Tn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,s,r,i){const o=Date.now()+s,l=new Yu(e,n,o,r,i);return l.start(s),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new se($.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ju(t,e){if(Jn("AsyncQueue",`${e}: ${t}`),oo(t))return new se($.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr{constructor(e){this.comparator=e?(n,s)=>e(n,s)||le.comparator(n.key,s.key):(n,s)=>le.comparator(n.key,s.key),this.keyedMap=mi(),this.sortedSet=new Je(this.comparator)}static emptySet(e){return new Cr(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,s)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Cr)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;n.hasNext();){const r=n.getNext().key,i=s.getNext().key;if(!r.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const s=new Cr;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=n,s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class op{constructor(){this.W_=new Je(le.comparator)}track(e){const n=e.doc.key,s=this.W_.get(n);s?e.type!==0&&s.type===3?this.W_=this.W_.insert(n,e):e.type===3&&s.type!==1?this.W_=this.W_.insert(n,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.W_=this.W_.remove(n):e.type===1&&s.type===2?this.W_=this.W_.insert(n,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):de():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,s)=>{e.push(s)}),e}}class $r{constructor(e,n,s,r,i,o,l,c,u){this.query=e,this.docs=n,this.oldDocs=s,this.docChanges=r,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=u}static fromInitialDocuments(e,n,s,r,i){const o=[];return n.forEach(l=>{o.push({type:0,doc:l})}),new $r(e,n,Cr.emptySet(n),o,s,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&gl(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,s=e.docChanges;if(n.length!==s.length)return!1;for(let r=0;r<n.length;r++)if(n[r].type!==s[r].type||!n[r].doc.isEqual(s[r].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pE{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class gE{constructor(){this.queries=ap(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,s){const r=ge(n),i=r.queries;r.queries=ap(),i.forEach((o,l)=>{for(const c of l.j_)c.onError(s)})})(this,new se($.ABORTED,"Firestore shutting down"))}}function ap(){return new Br(t=>s0(t),gl)}async function Xu(t,e){const n=ge(t);let s=3;const r=e.query;let i=n.queries.get(r);i?!i.H_()&&e.J_()&&(s=2):(i=new pE,s=e.J_()?0:1);try{switch(s){case 0:i.z_=await n.onListen(r,!0);break;case 1:i.z_=await n.onListen(r,!1);break;case 2:await n.onFirstRemoteStoreListen(r)}}catch(o){const l=Ju(o,`Initialization of query '${xr(e.query)}' failed`);return void e.onError(l)}n.queries.set(r,i),i.j_.push(e),e.Z_(n.onlineState),i.z_&&e.X_(i.z_)&&ed(n)}async function Zu(t,e){const n=ge(t),s=e.query;let r=3;const i=n.queries.get(s);if(i){const o=i.j_.indexOf(e);o>=0&&(i.j_.splice(o,1),i.j_.length===0?r=e.J_()?0:1:!i.H_()&&e.J_()&&(r=2))}switch(r){case 0:return n.queries.delete(s),n.onUnlisten(s,!0);case 1:return n.queries.delete(s),n.onUnlisten(s,!1);case 2:return n.onLastRemoteStoreUnlisten(s);default:return}}function mE(t,e){const n=ge(t);let s=!1;for(const r of e){const i=r.query,o=n.queries.get(i);if(o){for(const l of o.j_)l.X_(r)&&(s=!0);o.z_=r}}s&&ed(n)}function yE(t,e,n){const s=ge(t),r=s.queries.get(e);if(r)for(const i of r.j_)i.onError(n);s.queries.delete(e)}function ed(t){t.Y_.forEach(e=>{e.next()})}var Yc,lp;(lp=Yc||(Yc={})).ea="default",lp.Cache="cache";class td{constructor(e,n,s){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=s||{}}X_(e){if(!this.options.includeMetadataChanges){const s=[];for(const r of e.docChanges)r.type!==3&&s.push(r);e=new $r(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const s=n!=="Offline";return(!this.options._a||!s)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=$r.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Yc.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L0{constructor(e){this.key=e}}class F0{constructor(e){this.key=e}}class _E{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=Te(),this.mutatedKeys=Te(),this.Aa=r0(e),this.Ra=new Cr(this.Aa)}get Va(){return this.Ta}ma(e,n){const s=n?n.fa:new op,r=n?n.Ra:this.Ra;let i=n?n.mutatedKeys:this.mutatedKeys,o=r,l=!1;const c=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,u=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((h,g)=>{const y=r.get(h),m=ml(this.query,g)?g:null,_=!!y&&this.mutatedKeys.has(y.key),A=!!m&&(m.hasLocalMutations||this.mutatedKeys.has(m.key)&&m.hasCommittedMutations);let M=!1;y&&m?y.data.isEqual(m.data)?_!==A&&(s.track({type:3,doc:m}),M=!0):this.ga(y,m)||(s.track({type:2,doc:m}),M=!0,(c&&this.Aa(m,c)>0||u&&this.Aa(m,u)<0)&&(l=!0)):!y&&m?(s.track({type:0,doc:m}),M=!0):y&&!m&&(s.track({type:1,doc:y}),M=!0,(c||u)&&(l=!0)),M&&(m?(o=o.add(m),i=A?i.add(h):i.delete(h)):(o=o.delete(h),i=i.delete(h)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const h=this.query.limitType==="F"?o.last():o.first();o=o.delete(h.key),i=i.delete(h.key),s.track({type:1,doc:h})}return{Ra:o,fa:s,ns:l,mutatedKeys:i}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,s,r){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((h,g)=>function(m,_){const A=M=>{switch(M){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return de()}};return A(m)-A(_)}(h.type,g.type)||this.Aa(h.doc,g.doc)),this.pa(s),r=r!=null&&r;const l=n&&!r?this.ya():[],c=this.da.size===0&&this.current&&!r?1:0,u=c!==this.Ea;return this.Ea=c,o.length!==0||u?{snapshot:new $r(this.query,e.Ra,i,o,e.mutatedKeys,c===0,u,!1,!!s&&s.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new op,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=Te(),this.Ra.forEach(s=>{this.Sa(s.key)&&(this.da=this.da.add(s.key))});const n=[];return e.forEach(s=>{this.da.has(s)||n.push(new F0(s))}),this.da.forEach(s=>{e.has(s)||n.push(new L0(s))}),n}ba(e){this.Ta=e.Ts,this.da=Te();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return $r.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class vE{constructor(e,n,s){this.query=e,this.targetId=n,this.view=s}}class bE{constructor(e){this.key=e,this.va=!1}}class wE{constructor(e,n,s,r,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=s,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new Br(l=>s0(l),gl),this.Ma=new Map,this.xa=new Set,this.Oa=new Je(le.comparator),this.Na=new Map,this.La=new Bu,this.Ba={},this.ka=new Map,this.qa=Fr.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function xE(t,e,n=!0){const s=q0(t);let r;const i=s.Fa.get(e);return i?(s.sharedClientState.addLocalQueryTarget(i.targetId),r=i.view.Da()):r=await $0(s,e,n,!0),r}async function IE(t,e){const n=q0(t);await $0(n,e,!0,!1)}async function $0(t,e,n,s){const r=await HT(t.localStore,En(e)),i=r.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let l;return s&&(l=await TE(t,e,i,o==="current",r.resumeToken)),t.isPrimaryClient&&n&&P0(t.remoteStore,r),l}async function TE(t,e,n,s,r){t.Ka=(g,y,m)=>async function(A,M,W,H){let te=M.view.ma(W);te.ns&&(te=await np(A.localStore,M.query,!1).then(({documents:R})=>M.view.ma(R,te)));const Y=H&&H.targetChanges.get(M.targetId),oe=H&&H.targetMismatches.get(M.targetId)!=null,me=M.view.applyChanges(te,A.isPrimaryClient,Y,oe);return up(A,M.targetId,me.wa),me.snapshot}(t,g,y,m);const i=await np(t.localStore,e,!0),o=new _E(e,i.Ts),l=o.ma(i.documents),c=uo.createSynthesizedTargetChangeForCurrentChange(n,s&&t.onlineState!=="Offline",r),u=o.applyChanges(l,t.isPrimaryClient,c);up(t,n,u.wa);const h=new vE(e,n,o);return t.Fa.set(e,h),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),u.snapshot}async function EE(t,e,n){const s=ge(t),r=s.Fa.get(e),i=s.Ma.get(r.targetId);if(i.length>1)return s.Ma.set(r.targetId,i.filter(o=>!gl(o,e))),void s.Fa.delete(e);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(r.targetId),s.sharedClientState.isActiveQueryTarget(r.targetId)||await Qc(s.localStore,r.targetId,!1).then(()=>{s.sharedClientState.clearQueryState(r.targetId),n&&Wu(s.remoteStore,r.targetId),Jc(s,r.targetId)}).catch(io)):(Jc(s,r.targetId),await Qc(s.localStore,r.targetId,!0))}async function kE(t,e){const n=ge(t),s=n.Fa.get(e),r=n.Ma.get(s.targetId);n.isPrimaryClient&&r.length===1&&(n.sharedClientState.removeLocalQueryTarget(s.targetId),Wu(n.remoteStore,s.targetId))}async function AE(t,e,n){const s=NE(t);try{const r=await function(o,l){const c=ge(o),u=ht.now(),h=l.reduce((m,_)=>m.add(_.key),Te());let g,y;return c.persistence.runTransaction("Locally write mutations","readwrite",m=>{let _=Xn(),A=Te();return c.cs.getEntries(m,h).next(M=>{_=M,_.forEach((W,H)=>{H.isValidDocument()||(A=A.add(W))})}).next(()=>c.localDocuments.getOverlayedDocuments(m,_)).next(M=>{g=M;const W=[];for(const H of l){const te=JI(H,g.get(H.key).overlayedDocument);te!=null&&W.push(new Ss(H.key,te,Ym(te.value.mapValue),lt.exists(!0)))}return c.mutationQueue.addMutationBatch(m,u,W,l)}).next(M=>{y=M;const W=M.applyToLocalDocumentSet(g,A);return c.documentOverlayCache.saveOverlays(m,M.batchId,W)})}).then(()=>({batchId:y.batchId,changes:o0(g)}))}(s.localStore,e);s.sharedClientState.addPendingMutation(r.batchId),function(o,l,c){let u=o.Ba[o.currentUser.toKey()];u||(u=new Je(Ne)),u=u.insert(l,c),o.Ba[o.currentUser.toKey()]=u}(s,r.batchId,n),await fo(s,r.changes),await xl(s.remoteStore)}catch(r){const i=Ju(r,"Failed to persist write");n.reject(i)}}async function U0(t,e){const n=ge(t);try{const s=await BT(n.localStore,e);e.targetChanges.forEach((r,i)=>{const o=n.Na.get(i);o&&(Me(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1),r.addedDocuments.size>0?o.va=!0:r.modifiedDocuments.size>0?Me(o.va):r.removedDocuments.size>0&&(Me(o.va),o.va=!1))}),await fo(n,s,e)}catch(s){await io(s)}}function cp(t,e,n){const s=ge(t);if(s.isPrimaryClient&&n===0||!s.isPrimaryClient&&n===1){const r=[];s.Fa.forEach((i,o)=>{const l=o.view.Z_(e);l.snapshot&&r.push(l.snapshot)}),function(o,l){const c=ge(o);c.onlineState=l;let u=!1;c.queries.forEach((h,g)=>{for(const y of g.j_)y.Z_(l)&&(u=!0)}),u&&ed(c)}(s.eventManager,e),r.length&&s.Ca.d_(r),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function SE(t,e,n){const s=ge(t);s.sharedClientState.updateQueryState(e,"rejected",n);const r=s.Na.get(e),i=r&&r.key;if(i){let o=new Je(le.comparator);o=o.insert(i,gt.newNoDocument(i,fe.min()));const l=Te().add(i),c=new vl(fe.min(),new Map,new Je(Ne),o,l);await U0(s,c),s.Oa=s.Oa.remove(i),s.Na.delete(e),nd(s)}else await Qc(s.localStore,e,!1).then(()=>Jc(s,e,n)).catch(io)}async function CE(t,e){const n=ge(t),s=e.batch.batchId;try{const r=await jT(n.localStore,e);B0(n,s,null),j0(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await fo(n,r)}catch(r){await io(r)}}async function RE(t,e,n){const s=ge(t);try{const r=await function(o,l){const c=ge(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",u=>{let h;return c.mutationQueue.lookupMutationBatch(u,l).next(g=>(Me(g!==null),h=g.keys(),c.mutationQueue.removeMutationBatch(u,g))).next(()=>c.mutationQueue.performConsistencyCheck(u)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(u,h,l)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,h)).next(()=>c.localDocuments.getDocuments(u,h))})}(s.localStore,e);B0(s,e,n),j0(s,e),s.sharedClientState.updateMutationState(e,"rejected",n),await fo(s,r)}catch(r){await io(r)}}function j0(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function B0(t,e,n){const s=ge(t);let r=s.Ba[s.currentUser.toKey()];if(r){const i=r.get(e);i&&(n?i.reject(n):i.resolve(),r=r.remove(e)),s.Ba[s.currentUser.toKey()]=r}}function Jc(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const s of t.Ma.get(e))t.Fa.delete(s),n&&t.Ca.$a(s,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(s=>{t.La.containsKey(s)||z0(t,s)})}function z0(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(Wu(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),nd(t))}function up(t,e,n){for(const s of n)s instanceof L0?(t.La.addReference(s.key,e),PE(t,s)):s instanceof F0?(re("SyncEngine","Document no longer in limbo: "+s.key),t.La.removeReference(s.key,e),t.La.containsKey(s.key)||z0(t,s.key)):de()}function PE(t,e){const n=e.key,s=n.path.canonicalString();t.Oa.get(n)||t.xa.has(s)||(re("SyncEngine","New document in limbo: "+n),t.xa.add(s),nd(t))}function nd(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new le(He.fromString(e)),s=t.qa.next();t.Na.set(s,new bE(n)),t.Oa=t.Oa.insert(n,s),P0(t.remoteStore,new gs(En(pl(n.path)),s,"TargetPurposeLimboResolution",Mu.oe))}}async function fo(t,e,n){const s=ge(t),r=[],i=[],o=[];s.Fa.isEmpty()||(s.Fa.forEach((l,c)=>{o.push(s.Ka(c,e,n).then(u=>{var h;if((u||n)&&s.isPrimaryClient){const g=u?!u.fromCache:(h=n==null?void 0:n.targetChanges.get(c.targetId))===null||h===void 0?void 0:h.current;s.sharedClientState.updateQueryState(c.targetId,g?"current":"not-current")}if(u){r.push(u);const g=qu.Wi(c.targetId,u);i.push(g)}}))}),await Promise.all(o),s.Ca.d_(r),await async function(c,u){const h=ge(c);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>z.forEach(u,y=>z.forEach(y.$i,m=>h.persistence.referenceDelegate.addReference(g,y.targetId,m)).next(()=>z.forEach(y.Ui,m=>h.persistence.referenceDelegate.removeReference(g,y.targetId,m)))))}catch(g){if(!oo(g))throw g;re("LocalStore","Failed to update sequence numbers: "+g)}for(const g of u){const y=g.targetId;if(!g.fromCache){const m=h.os.get(y),_=m.snapshotVersion,A=m.withLastLimboFreeSnapshotVersion(_);h.os=h.os.insert(y,A)}}}(s.localStore,i))}async function ME(t,e){const n=ge(t);if(!n.currentUser.isEqual(e)){re("SyncEngine","User change. New user:",e.toKey());const s=await S0(n.localStore,e);n.currentUser=e,function(i,o){i.ka.forEach(l=>{l.forEach(c=>{c.reject(new se($.CANCELLED,o))})}),i.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await fo(n,s.hs)}}function OE(t,e){const n=ge(t),s=n.Na.get(e);if(s&&s.va)return Te().add(s.key);{let r=Te();const i=n.Ma.get(e);if(!i)return r;for(const o of i){const l=n.Fa.get(o);r=r.unionWith(l.view.Va)}return r}}function q0(t){const e=ge(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=U0.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=OE.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=SE.bind(null,e),e.Ca.d_=mE.bind(null,e.eventManager),e.Ca.$a=yE.bind(null,e.eventManager),e}function NE(t){const e=ge(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=CE.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=RE.bind(null,e),e}class Oa{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=bl(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return UT(this.persistence,new FT,e.initialUser,this.serializer)}Ga(e){return new DT(zu.Zr,this.serializer)}Wa(e){return new KT}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Oa.provider={build:()=>new Oa};class Xc{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>cp(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=ME.bind(null,this.syncEngine),await fE(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new gE}()}createDatastore(e){const n=bl(e.databaseInfo.databaseId),s=function(i){return new JT(i)}(e.databaseInfo);return function(i,o,l,c){return new eE(i,o,l,c)}(e.authCredentials,e.appCheckCredentials,s,n)}createRemoteStore(e){return function(s,r,i,o,l){return new nE(s,r,i,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>cp(this.syncEngine,n,0),function(){return rp.D()?new rp:new GT}())}createSyncEngine(e,n){return function(r,i,o,l,c,u,h){const g=new wE(r,i,o,l,c,u);return h&&(g.Qa=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(r){const i=ge(r);re("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await ho(i),i.k_.shutdown(),i.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}Xc.provider={build:()=>new Xc};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sd{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Jn("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DE{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new se($.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const n=await async function(r,i){const o=ge(r),l={documents:i.map(g=>Pa(o.serializer,g))},c=await o.Lo("BatchGetDocuments",o.serializer.databaseId,He.emptyPath(),l,i.length),u=new Map;c.forEach(g=>{const y=uT(o.serializer,g);u.set(y.key.toString(),y)});const h=[];return i.forEach(g=>{const y=u.get(g.toString());Me(!!y),h.push(y)}),h}(this.datastore,e);return n.forEach(s=>this.recordVersion(s)),n}set(e,n){this.write(n.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,n){try{this.write(n.toMutation(e,this.preconditionForUpdate(e)))}catch(s){this.lastTransactionError=s}this.writtenDocs.add(e.toString())}delete(e){this.write(new co(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(n=>{e.delete(n.key.toString())}),e.forEach((n,s)=>{const r=le.fromPath(s);this.mutations.push(new g0(r,this.precondition(r)))}),await async function(s,r){const i=ge(s),o={writes:r.map(l=>T0(i.serializer,l))};await i.Mo("Commit",i.serializer.databaseId,He.emptyPath(),o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let n;if(e.isFoundDocument())n=e.version;else{if(!e.isNoDocument())throw de();n=fe.min()}const s=this.readVersions.get(e.key.toString());if(s){if(!n.isEqual(s))throw new se($.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),n)}precondition(e){const n=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&n?n.isEqual(fe.min())?lt.exists(!1):lt.updateTime(n):lt.none()}preconditionForUpdate(e){const n=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&n){if(n.isEqual(fe.min()))throw new se($.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return lt.updateTime(n)}return lt.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VE{constructor(e,n,s,r,i){this.asyncQueue=e,this.datastore=n,this.options=s,this.updateFunction=r,this.deferred=i,this._u=s.maxAttempts,this.t_=new Hu(this.asyncQueue,"transaction_retry")}au(){this._u-=1,this.uu()}uu(){this.t_.Go(async()=>{const e=new DE(this.datastore),n=this.cu(e);n&&n.then(s=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(s)}).catch(r=>{this.lu(r)}))}).catch(s=>{this.lu(s)})})}cu(e){try{const n=this.updateFunction(e);return!ao(n)&&n.catch&&n.then?n:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(n){return this.deferred.reject(n),null}}lu(e){this._u>0&&this.hu(e)?(this._u-=1,this.asyncQueue.enqueueAndForget(()=>(this.uu(),Promise.resolve()))):this.deferred.reject(e)}hu(e){if(e.name==="FirebaseError"){const n=e.code;return n==="aborted"||n==="failed-precondition"||n==="already-exists"||!m0(n)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LE{constructor(e,n,s,r,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=s,this.databaseInfo=r,this.user=St.UNAUTHENTICATED,this.clientId=Km.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(s,async o=>{re("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(s,o=>(re("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Tn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const s=Ju(n,"Failed to shutdown persistence");e.reject(s)}}),e.promise}}async function _c(t,e){t.asyncQueue.verifyOperationInProgress(),re("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let s=n.initialUser;t.setCredentialChangeListener(async r=>{s.isEqual(r)||(await S0(e.localStore,r),s=r)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function dp(t,e){t.asyncQueue.verifyOperationInProgress();const n=await FE(t);re("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(s=>ip(e.remoteStore,s)),t.setAppCheckTokenChangeListener((s,r)=>ip(e.remoteStore,r)),t._onlineComponents=e}async function FE(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){re("FirestoreClient","Using user provided OfflineComponentProvider");try{await _c(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(r){return r.name==="FirebaseError"?r.code===$.FAILED_PRECONDITION||r.code===$.UNIMPLEMENTED:!(typeof DOMException<"u"&&r instanceof DOMException)||r.code===22||r.code===20||r.code===11}(n))throw n;Nr("Error using user provided cache. Falling back to memory cache: "+n),await _c(t,new Oa)}}else re("FirestoreClient","Using default OfflineComponentProvider"),await _c(t,new Oa);return t._offlineComponents}async function rd(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(re("FirestoreClient","Using user provided OnlineComponentProvider"),await dp(t,t._uninitializedComponentsProvider._online)):(re("FirestoreClient","Using default OnlineComponentProvider"),await dp(t,new Xc))),t._onlineComponents}function $E(t){return rd(t).then(e=>e.syncEngine)}function UE(t){return rd(t).then(e=>e.datastore)}async function Na(t){const e=await rd(t),n=e.eventManager;return n.onListen=xE.bind(null,e.syncEngine),n.onUnlisten=EE.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=IE.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=kE.bind(null,e.syncEngine),n}function jE(t,e,n={}){const s=new Tn;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,l,c,u){const h=new sd({next:y=>{h.Za(),o.enqueueAndForget(()=>Zu(i,g));const m=y.docs.has(l);!m&&y.fromCache?u.reject(new se($.UNAVAILABLE,"Failed to get document because the client is offline.")):m&&y.fromCache&&c&&c.source==="server"?u.reject(new se($.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(y)},error:y=>u.reject(y)}),g=new td(pl(l.path),h,{includeMetadataChanges:!0,_a:!0});return Xu(i,g)}(await Na(t),t.asyncQueue,e,n,s)),s.promise}function BE(t,e,n={}){const s=new Tn;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,l,c,u){const h=new sd({next:y=>{h.Za(),o.enqueueAndForget(()=>Zu(i,g)),y.fromCache&&c.source==="server"?u.reject(new se($.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):u.resolve(y)},error:y=>u.reject(y)}),g=new td(l,h,{includeMetadataChanges:!0,_a:!0});return Xu(i,g)}(await Na(t),t.asyncQueue,e,n,s)),s.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H0(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hp=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W0(t,e,n){if(!n)throw new se($.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function zE(t,e,n,s){if(e===!0&&s===!0)throw new se($.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function fp(t){if(!le.isDocumentKey(t))throw new se($.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function pp(t){if(le.isDocumentKey(t))throw new se($.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function id(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(s){return s.constructor?s.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":de()}function Mt(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new se($.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=id(t);throw new se($.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gp{constructor(e){var n,s;if(e.host===void 0){if(e.ssl!==void 0)throw new se($.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new se($.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}zE("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=H0((s=e.experimentalLongPollingOptions)!==null&&s!==void 0?s:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new se($.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new se($.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new se($.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,r){return s.timeoutSeconds===r.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Il{constructor(e,n,s,r){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=s,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new gp({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new se($.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new se($.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new gp(e),e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new rI;switch(s.type){case"firstParty":return new lI(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new se($.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const s=hp.get(n);s&&(re("ComponentProvider","Removing Datastore"),hp.delete(n),s.terminate())}(this),Promise.resolve()}}function qE(t,e,n,s={}){var r;const i=(t=Mt(t,Il))._getSettings(),o=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&Nr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),s.mockUserToken){let l,c;if(typeof s.mockUserToken=="string")l=s.mockUserToken,c=St.MOCK_USER;else{l=hw(s.mockUserToken,(r=t._app)===null||r===void 0?void 0:r.options.projectId);const u=s.mockUserToken.sub||s.mockUserToken.user_id;if(!u)throw new se($.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new St(u)}t._authCredentials=new iI(new Wm(l,c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class po{constructor(e,n,s){this.converter=n,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new po(this.firestore,e,this._query)}}class Ot{constructor(e,n,s){this.converter=n,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new bs(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ot(this.firestore,e,this._key)}}class bs extends po{constructor(e,n,s){super(e,n,pl(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ot(this.firestore,null,new le(e))}withConverter(e){return new bs(this.firestore,e,this._path)}}function Er(t,e,...n){if(t=Ye(t),W0("collection","path",e),t instanceof Il){const s=He.fromString(e,...n);return pp(s),new bs(t,null,s)}{if(!(t instanceof Ot||t instanceof bs))throw new se($.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child(He.fromString(e,...n));return pp(s),new bs(t.firestore,null,s)}}function As(t,e,...n){if(t=Ye(t),arguments.length===1&&(e=Km.newId()),W0("doc","path",e),t instanceof Il){const s=He.fromString(e,...n);return fp(s),new Ot(t,null,new le(s))}{if(!(t instanceof Ot||t instanceof bs))throw new se($.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child(He.fromString(e,...n));return fp(s),new Ot(t.firestore,t instanceof bs?t.converter:null,new le(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mp{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Hu(this,"async_queue_retry"),this.Vu=()=>{const s=yc();s&&re("AsyncQueue","Visibility state changed to "+s.visibilityState),this.t_.jo()},this.mu=e;const n=yc();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=yc();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new Tn;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!oo(e))throw e;re("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(s=>{this.Eu=s,this.du=!1;const r=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(s);throw Jn("INTERNAL UNHANDLED ERROR: ",r),s}).then(s=>(this.du=!1,s))));return this.mu=n,n}enqueueAfterDelay(e,n,s){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const r=Yu.createAndSchedule(this,e,n,s,i=>this.yu(i));return this.Tu.push(r),r}fu(){this.Eu&&de()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,s)=>n.targetTimeMs-s.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}function yp(t){return function(n,s){if(typeof n!="object"||n===null)return!1;const r=n;for(const i of s)if(i in r&&typeof r[i]=="function")return!0;return!1}(t,["next","error","complete"])}class pn extends Il{constructor(e,n,s,r){super(e,n,s,r),this.type="firestore",this._queue=new mp,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new mp(e),this._firestoreClient=void 0,await e}}}function HE(t,e){const n=typeof t=="object"?t:Eu(),s=typeof t=="string"?t:"(default)",r=ur(n,"firestore").getImmediate({identifier:s});if(!r._initialized){const i=uw("firestore");i&&qE(r,...i)}return r}function qr(t){if(t._terminated)throw new se($.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||WE(t),t._firestoreClient}function WE(t){var e,n,s;const r=t._freezeSettings(),i=function(l,c,u,h){return new wI(l,c,u,h.host,h.ssl,h.experimentalForceLongPolling,h.experimentalAutoDetectLongPolling,H0(h.experimentalLongPollingOptions),h.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,r);t._componentsProvider||!((n=r.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((s=r.localCache)===null||s===void 0)&&s._onlineComponentProvider)&&(t._componentsProvider={_offline:r.localCache._offlineComponentProvider,_online:r.localCache._onlineComponentProvider}),t._firestoreClient=new LE(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(l){const c=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(c),_online:c}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or{constructor(e){this._byteString=e}static fromBase64String(e){try{return new or(It.fromBase64String(e))}catch(n){throw new se($.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new or(It.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new se($.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new wt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tl{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class od{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new se($.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new se($.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return Ne(this._lat,e._lat)||Ne(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ad{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(s,r){if(s.length!==r.length)return!1;for(let i=0;i<s.length;++i)if(s[i]!==r[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KE=/^__.*__$/;class GE{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return this.fieldMask!==null?new Ss(e,this.data,this.fieldMask,n,this.fieldTransforms):new lo(e,this.data,n,this.fieldTransforms)}}class K0{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return new Ss(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function G0(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw de()}}class ld{constructor(e,n,s,r,i,o){this.settings=e,this.databaseId=n,this.serializer=s,this.ignoreUndefinedProperties=r,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new ld(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const s=(n=this.path)===null||n===void 0?void 0:n.child(e),r=this.Fu({path:s,xu:!1});return r.Ou(e),r}Nu(e){var n;const s=(n=this.path)===null||n===void 0?void 0:n.child(e),r=this.Fu({path:s,xu:!1});return r.vu(),r}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Da(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(G0(this.Cu)&&KE.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class QE{constructor(e,n,s){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=s||bl(e)}Qu(e,n,s,r=!1){return new ld({Cu:e,methodName:n,qu:s,path:wt.emptyPath(),xu:!1,ku:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function go(t){const e=t._freezeSettings(),n=bl(t._databaseId);return new QE(t._databaseId,!!e.ignoreUndefinedProperties,n)}function El(t,e,n,s,r,i={}){const o=t.Qu(i.merge||i.mergeFields?2:0,e,n,r);hd("Data must be an object, but it was:",o,s);const l=Q0(s,o);let c,u;if(i.merge)c=new Gt(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const h=[];for(const g of i.mergeFields){const y=Zc(e,g,n);if(!o.contains(y))throw new se($.INVALID_ARGUMENT,`Field '${y}' is specified in your field mask but missing from your input data.`);J0(h,y)||h.push(y)}c=new Gt(h),u=o.fieldTransforms.filter(g=>c.covers(g.field))}else c=null,u=o.fieldTransforms;return new GE(new $t(l),c,u)}class kl extends Tl{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof kl}}class cd extends Tl{_toFieldTransform(e){return new KI(e.path,new Gi)}isEqual(e){return e instanceof cd}}function ud(t,e,n,s){const r=t.Qu(1,e,n);hd("Data must be an object, but it was:",r,s);const i=[],o=$t.empty();dr(s,(c,u)=>{const h=fd(e,c,n);u=Ye(u);const g=r.Nu(h);if(u instanceof kl)i.push(h);else{const y=Al(u,g);y!=null&&(i.push(h),o.set(h,y))}});const l=new Gt(i);return new K0(o,l,r.fieldTransforms)}function dd(t,e,n,s,r,i){const o=t.Qu(1,e,n),l=[Zc(e,s,n)],c=[r];if(i.length%2!=0)throw new se($.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let y=0;y<i.length;y+=2)l.push(Zc(e,i[y])),c.push(i[y+1]);const u=[],h=$t.empty();for(let y=l.length-1;y>=0;--y)if(!J0(u,l[y])){const m=l[y];let _=c[y];_=Ye(_);const A=o.Nu(m);if(_ instanceof kl)u.push(m);else{const M=Al(_,A);M!=null&&(u.push(m),h.set(m,M))}}const g=new Gt(u);return new K0(h,g,o.fieldTransforms)}function Al(t,e){if(Y0(t=Ye(t)))return hd("Unsupported field value:",e,t),Q0(t,e);if(t instanceof Tl)return function(s,r){if(!G0(r.Cu))throw r.Bu(`${s._methodName}() can only be used with update() and set()`);if(!r.path)throw r.Bu(`${s._methodName}() is not currently supported inside arrays`);const i=s._toFieldTransform(r);i&&r.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(s,r){const i=[];let o=0;for(const l of s){let c=Al(l,r.Lu(o));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),o++}return{arrayValue:{values:i}}}(t,e)}return function(s,r){if((s=Ye(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return qI(r.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const i=ht.fromDate(s);return{timestampValue:Ra(r.serializer,i)}}if(s instanceof ht){const i=new ht(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:Ra(r.serializer,i)}}if(s instanceof od)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof or)return{bytesValue:b0(r.serializer,s._byteString)};if(s instanceof Ot){const i=r.databaseId,o=s.firestore._databaseId;if(!o.isEqual(i))throw r.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:ju(s.firestore._databaseId||r.databaseId,s._key.path)}}if(s instanceof ad)return function(o,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(c=>{if(typeof c!="number")throw l.Bu("VectorValues must only contain numeric values.");return Fu(l.serializer,c)})}}}}}}(s,r);throw r.Bu(`Unsupported field value: ${id(s)}`)}(t,e)}function Q0(t,e){const n={};return Gm(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):dr(t,(s,r)=>{const i=Al(r,e.Mu(s));i!=null&&(n[s]=i)}),{mapValue:{fields:n}}}function Y0(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof ht||t instanceof od||t instanceof or||t instanceof Ot||t instanceof Tl||t instanceof ad)}function hd(t,e,n){if(!Y0(n)||!function(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}(n)){const s=id(n);throw s==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+s)}}function Zc(t,e,n){if((e=Ye(e))instanceof Hr)return e._internalPath;if(typeof e=="string")return fd(t,e);throw Da("Field path arguments must be of type string or ",t,!1,void 0,n)}const YE=new RegExp("[~\\*/\\[\\]]");function fd(t,e,n){if(e.search(YE)>=0)throw Da(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Hr(...e.split("."))._internalPath}catch{throw Da(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Da(t,e,n,s,r){const i=s&&!s.isEmpty(),o=r!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${s}`),o&&(c+=` in document ${r}`),c+=")"),new se($.INVALID_ARGUMENT,l+t+c)}function J0(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Va{constructor(e,n,s,r,i){this._firestore=e,this._userDataWriter=n,this._key=s,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Ot(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new JE(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(X0("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class JE extends Va{data(){return super.data()}}function X0(t,e){return typeof e=="string"?fd(t,e):e instanceof Hr?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z0(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new se($.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ey{convertValue(e,n="none"){switch(ir(e)){case 0:return null;case 1:return e.booleanValue;case 2:return it(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(rr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw de()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const s={};return dr(e,(r,i)=>{s[r]=this.convertValue(i,n)}),s}convertVectorValue(e){var n,s,r;const i=(r=(s=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||s===void 0?void 0:s.values)===null||r===void 0?void 0:r.map(o=>it(o.doubleValue));return new ad(i)}convertGeoPoint(e){return new od(it(e.latitude),it(e.longitude))}convertArray(e,n){return(e.values||[]).map(s=>this.convertValue(s,n))}convertServerTimestamp(e,n){switch(n){case"previous":const s=Nu(e);return s==null?null:this.convertValue(s,n);case"estimate":return this.convertTimestamp(Hi(e));default:return null}}convertTimestamp(e){const n=Es(e);return new ht(n.seconds,n.nanos)}convertDocumentKey(e,n){const s=He.fromString(e);Me(A0(s));const r=new Wi(s.get(1),s.get(3)),i=new le(s.popFirst(5));return r.isEqual(n)||Jn(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sl(t,e,n){let s;return s=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,s}class XE extends ey{constructor(e){super(),this.firestore=e}convertBytes(e){return new or(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Ot(this.firestore,null,n)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class pd extends Va{constructor(e,n,s,r,i,o){super(e,n,s,r,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new na(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const s=this._document.data.field(X0("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,n.serverTimestamps)}}}class na extends pd{data(e={}){return super.data(e)}}class ty{constructor(e,n,s,r){this._firestore=e,this._userDataWriter=n,this._snapshot=r,this.metadata=new kr(r.hasPendingWrites,r.fromCache),this.query=s}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(s=>{e.call(n,new na(this._firestore,this._userDataWriter,s.key,s,new kr(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new se($.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(r,i){if(r._snapshot.oldDocs.isEmpty()){let o=0;return r._snapshot.docChanges.map(l=>{const c=new na(r._firestore,r._userDataWriter,l.doc.key,l.doc,new kr(r._snapshot.mutatedKeys.has(l.doc.key),r._snapshot.fromCache),r.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const c=new na(r._firestore,r._userDataWriter,l.doc.key,l.doc,new kr(r._snapshot.mutatedKeys.has(l.doc.key),r._snapshot.fromCache),r.query.converter);let u=-1,h=-1;return l.type!==0&&(u=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),h=o.indexOf(l.doc.key)),{type:ZE(l.type),doc:c,oldIndex:u,newIndex:h}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function ZE(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return de()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ek(t){t=Mt(t,Ot);const e=Mt(t.firestore,pn);return jE(qr(e),t._key).then(n=>ry(e,t,n))}class Cl extends ey{constructor(e){super(),this.firestore=e}convertBytes(e){return new or(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Ot(this.firestore,null,n)}}function _p(t){t=Mt(t,po);const e=Mt(t.firestore,pn),n=qr(e),s=new Cl(e);return Z0(t._query),BE(n,t._query).then(r=>new ty(e,s,t,r))}function ny(t,e,n){t=Mt(t,Ot);const s=Mt(t.firestore,pn),r=Sl(t.converter,e,n);return mo(s,[El(go(s),"setDoc",t._key,r,t.converter!==null,n).toMutation(t._key,lt.none())])}function tk(t,e,n,...s){t=Mt(t,Ot);const r=Mt(t.firestore,pn),i=go(r);let o;return o=typeof(e=Ye(e))=="string"||e instanceof Hr?dd(i,"updateDoc",t._key,e,n,s):ud(i,"updateDoc",t._key,e),mo(r,[o.toMutation(t._key,lt.exists(!0))])}function nk(t){return mo(Mt(t.firestore,pn),[new co(t._key,lt.none())])}function eu(t,e){const n=Mt(t.firestore,pn),s=As(t),r=Sl(t.converter,e);return mo(n,[El(go(t.firestore),"addDoc",s._key,r,t.converter!==null,{}).toMutation(s._key,lt.exists(!1))]).then(()=>s)}function sy(t,...e){var n,s,r;t=Ye(t);let i={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||yp(e[o])||(i=e[o],o++);const l={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(yp(e[o])){const g=e[o];e[o]=(n=g.next)===null||n===void 0?void 0:n.bind(g),e[o+1]=(s=g.error)===null||s===void 0?void 0:s.bind(g),e[o+2]=(r=g.complete)===null||r===void 0?void 0:r.bind(g)}let c,u,h;if(t instanceof Ot)u=Mt(t.firestore,pn),h=pl(t._key.path),c={next:g=>{e[o]&&e[o](ry(u,t,g))},error:e[o+1],complete:e[o+2]};else{const g=Mt(t,po);u=Mt(g.firestore,pn),h=g._query;const y=new Cl(u);c={next:m=>{e[o]&&e[o](new ty(u,y,g,m))},error:e[o+1],complete:e[o+2]},Z0(t._query)}return function(y,m,_,A){const M=new sd(A),W=new td(m,M,_);return y.asyncQueue.enqueueAndForget(async()=>Xu(await Na(y),W)),()=>{M.Za(),y.asyncQueue.enqueueAndForget(async()=>Zu(await Na(y),W))}}(qr(u),h,l,c)}function mo(t,e){return function(s,r){const i=new Tn;return s.asyncQueue.enqueueAndForget(async()=>AE(await $E(s),r,i)),i.promise}(qr(t),e)}function ry(t,e,n){const s=n.docs.get(e._key),r=new Cl(t);return new pd(t,r,e._key,s,new kr(n.hasPendingWrites,n.fromCache),e.converter)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sk={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rk{constructor(e,n){this._firestore=e,this._commitHandler=n,this._mutations=[],this._committed=!1,this._dataReader=go(e)}set(e,n,s){this._verifyNotCommitted();const r=us(e,this._firestore),i=Sl(r.converter,n,s),o=El(this._dataReader,"WriteBatch.set",r._key,i,r.converter!==null,s);return this._mutations.push(o.toMutation(r._key,lt.none())),this}update(e,n,s,...r){this._verifyNotCommitted();const i=us(e,this._firestore);let o;return o=typeof(n=Ye(n))=="string"||n instanceof Hr?dd(this._dataReader,"WriteBatch.update",i._key,n,s,r):ud(this._dataReader,"WriteBatch.update",i._key,n),this._mutations.push(o.toMutation(i._key,lt.exists(!0))),this}delete(e){this._verifyNotCommitted();const n=us(e,this._firestore);return this._mutations=this._mutations.concat(new co(n._key,lt.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new se($.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function us(t,e){if((t=Ye(t)).firestore!==e)throw new se($.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ik extends class{constructor(n,s){this._firestore=n,this._transaction=s,this._dataReader=go(n)}get(n){const s=us(n,this._firestore),r=new XE(this._firestore);return this._transaction.lookup([s._key]).then(i=>{if(!i||i.length!==1)return de();const o=i[0];if(o.isFoundDocument())return new Va(this._firestore,r,o.key,o,s.converter);if(o.isNoDocument())return new Va(this._firestore,r,s._key,null,s.converter);throw de()})}set(n,s,r){const i=us(n,this._firestore),o=Sl(i.converter,s,r),l=El(this._dataReader,"Transaction.set",i._key,o,i.converter!==null,r);return this._transaction.set(i._key,l),this}update(n,s,r,...i){const o=us(n,this._firestore);let l;return l=typeof(s=Ye(s))=="string"||s instanceof Hr?dd(this._dataReader,"Transaction.update",o._key,s,r,i):ud(this._dataReader,"Transaction.update",o._key,s),this._transaction.update(o._key,l),this}delete(n){const s=us(n,this._firestore);return this._transaction.delete(s._key),this}}{constructor(e,n){super(e,n),this._firestore=e}get(e){const n=us(e,this._firestore),s=new Cl(this._firestore);return super.get(e).then(r=>new pd(this._firestore,s,n._key,r._document,new kr(!1,!1),n.converter))}}function ok(t,e,n){t=Mt(t,pn);const s=Object.assign(Object.assign({},sk),n);return function(i){if(i.maxAttempts<1)throw new se($.INVALID_ARGUMENT,"Max attempts must be at least 1")}(s),function(i,o,l){const c=new Tn;return i.asyncQueue.enqueueAndForget(async()=>{const u=await UE(i);new VE(i.asyncQueue,u,l,o,c).au()}),c.promise}(qr(t),r=>e(new ik(t,r)),s)}function ak(){return new cd("serverTimestamp")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lk(t){return qr(t=Mt(t,pn)),new rk(t,e=>mo(t,e))}(function(e,n=!0){(function(r){jr=r})(Ur),Pn(new fn("firestore",(s,{instanceIdentifier:r,options:i})=>{const o=s.getProvider("app").getImmediate(),l=new pn(new oI(s.getProvider("auth-internal")),new uI(s.getProvider("app-check-internal")),function(u,h){if(!Object.prototype.hasOwnProperty.apply(u.options,["projectId"]))throw new se($.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Wi(u.options.projectId,h)}(o,r),o);return i=Object.assign({useFetchStreams:n},i),l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),nn(Df,"4.7.3",e),nn(Df,"4.7.3","esm2017")})();function gd(t,e){var n={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(n[s]=t[s]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,s=Object.getOwnPropertySymbols(t);r<s.length;r++)e.indexOf(s[r])<0&&Object.prototype.propertyIsEnumerable.call(t,s[r])&&(n[s[r]]=t[s[r]]);return n}function iy(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const ck=iy,oy=new cr("auth","Firebase",iy());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const La=new ul("@firebase/auth");function uk(t,...e){La.logLevel<=ke.WARN&&La.warn(`Auth (${Ur}): ${t}`,...e)}function sa(t,...e){La.logLevel<=ke.ERROR&&La.error(`Auth (${Ur}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gn(t,...e){throw md(t,...e)}function kn(t,...e){return md(t,...e)}function ay(t,e,n){const s=Object.assign(Object.assign({},ck()),{[e]:n});return new cr("auth","Firebase",s).create(e,{appName:t.name})}function An(t){return ay(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function md(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return oy.create(t,...e)}function pe(t,e,...n){if(!t)throw md(e,...n)}function Hn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw sa(e),new Error(e)}function Zn(t,e){t||Hn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tu(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function dk(){return vp()==="http:"||vp()==="https:"}function vp(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hk(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(dk()||wu()||"connection"in navigator)?navigator.onLine:!0}function fk(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yo{constructor(e,n){this.shortDelay=e,this.longDelay=n,Zn(n>e,"Short delay should be less than long delay!"),this.isMobile=fw()||mw()}get(){return hk()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yd(t,e){Zn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ly{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Hn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Hn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Hn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pk={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gk=new yo(3e4,6e4);function Cs(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Rs(t,e,n,s,r={}){return cy(t,r,async()=>{let i={},o={};s&&(e==="GET"?o=s:i={body:JSON.stringify(s)});const l=ro(Object.assign({key:t.config.apiKey},o)).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const u=Object.assign({method:e,headers:c},i);return gw()||(u.referrerPolicy="no-referrer"),ly.fetch()(uy(t,t.config.apiHost,n,l),u)})}async function cy(t,e,n){t._canInitEmulator=!1;const s=Object.assign(Object.assign({},pk),e);try{const r=new yk(t),i=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Ko(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const l=i.ok?o.errorMessage:o.error.message,[c,u]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ko(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Ko(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Ko(t,"user-disabled",o);const h=s[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw ay(t,h,u);gn(t,h)}}catch(r){if(r instanceof mn)throw r;gn(t,"network-request-failed",{message:String(r)})}}async function _o(t,e,n,s,r={}){const i=await Rs(t,e,n,s,r);return"mfaPendingCredential"in i&&gn(t,"multi-factor-auth-required",{_serverResponse:i}),i}function uy(t,e,n,s){const r=`${e}${n}?${s}`;return t.config.emulator?yd(t.config,r):`${t.config.apiScheme}://${r}`}function mk(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class yk{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(kn(this.auth,"network-request-failed")),gk.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Ko(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const r=kn(t,e,s);return r.customData._tokenResponse=n,r}function bp(t){return t!==void 0&&t.enterprise!==void 0}class _k{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return mk(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function vk(t,e){return Rs(t,"GET","/v2/recaptchaConfig",Cs(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bk(t,e){return Rs(t,"POST","/v1/accounts:delete",e)}async function dy(t,e){return Rs(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mi(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function wk(t,e=!1){const n=Ye(t),s=await n.getIdToken(e),r=_d(s);pe(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:r,token:s,authTime:Mi(vc(r.auth_time)),issuedAtTime:Mi(vc(r.iat)),expirationTime:Mi(vc(r.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function vc(t){return Number(t)*1e3}function _d(t){const[e,n,s]=t.split(".");if(e===void 0||n===void 0||s===void 0)return sa("JWT malformed, contained fewer than 3 sections"),null;try{const r=am(n);return r?JSON.parse(r):(sa("Failed to decode base64 JWT payload"),null)}catch(r){return sa("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function wp(t){const e=_d(t);return pe(e,"internal-error"),pe(typeof e.exp<"u","internal-error"),pe(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ji(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof mn&&xk(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function xk({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ik{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const s=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),s}else{this.errorBackoff=3e4;const r=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Mi(this.lastLoginAt),this.creationTime=Mi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fa(t){var e;const n=t.auth,s=await t.getIdToken(),r=await Ji(t,dy(n,{idToken:s}));pe(r==null?void 0:r.users.length,n,"internal-error");const i=r.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?hy(i.providerUserInfo):[],l=Ek(t.providerData,o),c=t.isAnonymous,u=!(t.email&&i.passwordHash)&&!(l!=null&&l.length),h=c?u:!1,g={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new nu(i.createdAt,i.lastLoginAt),isAnonymous:h};Object.assign(t,g)}async function Tk(t){const e=Ye(t);await Fa(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Ek(t,e){return[...t.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function hy(t){return t.map(e=>{var{providerId:n}=e,s=gd(e,["providerId"]);return{providerId:n,uid:s.rawId||"",displayName:s.displayName||null,email:s.email||null,phoneNumber:s.phoneNumber||null,photoURL:s.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kk(t,e){const n=await cy(t,{},async()=>{const s=ro({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=t.config,o=uy(t,r,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",ly.fetch()(o,{method:"POST",headers:l,body:s})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function Ak(t,e){return Rs(t,"POST","/v2/accounts:revokeToken",Cs(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){pe(e.idToken,"internal-error"),pe(typeof e.idToken<"u","internal-error"),pe(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):wp(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){pe(e.length!==0,"internal-error");const n=wp(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(pe(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:r,expiresIn:i}=await kk(e,n);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:r,expirationTime:i}=n,o=new Rr;return s&&(pe(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),r&&(pe(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),i&&(pe(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Rr,this.toJSON())}_performRefresh(){return Hn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function as(t,e){pe(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Wn{constructor(e){var{uid:n,auth:s,stsTokenManager:r}=e,i=gd(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Ik(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=s,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new nu(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Ji(this,this.stsTokenManager.getToken(this.auth,e));return pe(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return wk(this,e)}reload(){return Tk(this)}_assign(e){this!==e&&(pe(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Wn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){pe(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await Fa(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(dn(this.auth.app))return Promise.reject(An(this.auth));const e=await this.getIdToken();return await Ji(this,bk(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var s,r,i,o,l,c,u,h;const g=(s=n.displayName)!==null&&s!==void 0?s:void 0,y=(r=n.email)!==null&&r!==void 0?r:void 0,m=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,_=(o=n.photoURL)!==null&&o!==void 0?o:void 0,A=(l=n.tenantId)!==null&&l!==void 0?l:void 0,M=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,W=(u=n.createdAt)!==null&&u!==void 0?u:void 0,H=(h=n.lastLoginAt)!==null&&h!==void 0?h:void 0,{uid:te,emailVerified:Y,isAnonymous:oe,providerData:me,stsTokenManager:R}=n;pe(te&&R,e,"internal-error");const w=Rr.fromJSON(this.name,R);pe(typeof te=="string",e,"internal-error"),as(g,e.name),as(y,e.name),pe(typeof Y=="boolean",e,"internal-error"),pe(typeof oe=="boolean",e,"internal-error"),as(m,e.name),as(_,e.name),as(A,e.name),as(M,e.name),as(W,e.name),as(H,e.name);const b=new Wn({uid:te,auth:e,email:y,emailVerified:Y,displayName:g,isAnonymous:oe,photoURL:_,phoneNumber:m,tenantId:A,stsTokenManager:w,createdAt:W,lastLoginAt:H});return me&&Array.isArray(me)&&(b.providerData=me.map(E=>Object.assign({},E))),M&&(b._redirectEventId=M),b}static async _fromIdTokenResponse(e,n,s=!1){const r=new Rr;r.updateFromServerResponse(n);const i=new Wn({uid:n.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await Fa(i),i}static async _fromGetAccountInfoResponse(e,n,s){const r=n.users[0];pe(r.localId!==void 0,"internal-error");const i=r.providerUserInfo!==void 0?hy(r.providerUserInfo):[],o=!(r.email&&r.passwordHash)&&!(i!=null&&i.length),l=new Rr;l.updateFromIdToken(s);const c=new Wn({uid:r.localId,auth:e,stsTokenManager:l,isAnonymous:o}),u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new nu(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,u),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xp=new Map;function Kn(t){Zn(t instanceof Function,"Expected a class definition");let e=xp.get(t);return e?(Zn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,xp.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fy{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}fy.type="NONE";const Ip=fy;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ra(t,e,n){return`firebase:${t}:${e}:${n}`}class Pr{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=ra(this.userKey,r.apiKey,i),this.fullPersistenceKey=ra("persistence",r.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Wn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new Pr(Kn(Ip),e,s);const r=(await Promise.all(n.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let i=r[0]||Kn(Ip);const o=ra(s,e.config.apiKey,e.name);let l=null;for(const u of n)try{const h=await u._get(o);if(h){const g=Wn._fromJSON(e,h);u!==i&&(l=g),i=u;break}}catch{}const c=r.filter(u=>u._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new Pr(i,e,s):(i=c[0],l&&await i._set(o,l.toJSON()),await Promise.all(n.map(async u=>{if(u!==i)try{await u._remove(o)}catch{}})),new Pr(i,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tp(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(yy(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(py(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(vy(e))return"Blackberry";if(by(e))return"Webos";if(gy(e))return"Safari";if((e.includes("chrome/")||my(e))&&!e.includes("edge/"))return"Chrome";if(_y(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function py(t=Nt()){return/firefox\//i.test(t)}function gy(t=Nt()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function my(t=Nt()){return/crios\//i.test(t)}function yy(t=Nt()){return/iemobile/i.test(t)}function _y(t=Nt()){return/android/i.test(t)}function vy(t=Nt()){return/blackberry/i.test(t)}function by(t=Nt()){return/webos/i.test(t)}function vd(t=Nt()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Sk(t=Nt()){var e;return vd(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Ck(){return yw()&&document.documentMode===10}function wy(t=Nt()){return vd(t)||_y(t)||by(t)||vy(t)||/windows phone/i.test(t)||yy(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xy(t,e=[]){let n;switch(t){case"Browser":n=Tp(Nt());break;case"Worker":n=`${Tp(Nt())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ur}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rk{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=i=>new Promise((o,l)=>{try{const c=e(i);o(c)}catch(c){l(c)}});s.onAbort=n,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const r of n)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pk(t,e={}){return Rs(t,"GET","/v2/passwordPolicy",Cs(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mk=6;class Ok{constructor(e){var n,s,r,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:Mk,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(r=(s=e.allowedNonAlphanumericCharacters)===null||s===void 0?void 0:s.join(""))!==null&&r!==void 0?r:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,s,r,i,o,l;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(n=c.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),c.isValid&&(c.isValid=(s=c.meetsMaxPasswordLength)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(r=c.containsLowercaseLetter)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(i=c.containsUppercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(l=c.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),c}validatePasswordLengthOptions(e,n){const s=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=e.length>=s),r&&(n.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let r=0;r<e.length;r++)s=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,n,s,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nk{constructor(e,n,s,r){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ep(this),this.idTokenSubscription=new Ep(this),this.beforeStateQueue=new Rk(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=oy,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Kn(n)),this._initializationPromise=this.queue(async()=>{var s,r;if(!this._deleted&&(this.persistenceManager=await Pr.create(this,e),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((r=this.currentUser)===null||r===void 0?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await dy(this,{idToken:e}),s=await Wn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(dn(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const s=await this.assertedPersistence.getCurrentUser();let r=s,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=r==null?void 0:r._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===l)&&(c!=null&&c.user)&&(r=c.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=s,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return pe(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Fa(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=fk()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(dn(this.app))return Promise.reject(An(this));const n=e?Ye(e):null;return n&&pe(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&pe(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return dn(this.app)?Promise.reject(An(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return dn(this.app)?Promise.reject(An(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Kn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Pk(this),n=new Ok(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new cr("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await Ak(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Kn(e)||this._popupRedirectResolver;pe(n,this,"argument-error"),this.redirectPersistenceManager=await Pr.create(this,[Kn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,s;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((s=this.redirectUser)===null||s===void 0?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const s=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==s&&(this.lastNotifiedUid=s,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,r){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(pe(l,this,"internal-error"),l.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,s,r);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return pe(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=xy(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const s=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());s&&(n["X-Firebase-Client"]=s);const r=await this._getAppCheckToken();return r&&(n["X-Firebase-AppCheck"]=r),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&uk(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function Ps(t){return Ye(t)}class Ep{constructor(e){this.auth=e,this.observer=null,this.addObserver=Iw(n=>this.observer=n)}get next(){return pe(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rl={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Dk(t){Rl=t}function Iy(t){return Rl.loadJS(t)}function Vk(){return Rl.recaptchaEnterpriseScript}function Lk(){return Rl.gapiScript}function Fk(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const $k="recaptcha-enterprise",Uk="NO_RECAPTCHA";class jk{constructor(e){this.type=$k,this.auth=Ps(e)}async verify(e="verify",n=!1){async function s(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,l)=>{vk(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const u=new _k(c);return i.tenantId==null?i._agentRecaptchaConfig=u:i._tenantRecaptchaConfigs[i.tenantId]=u,o(u.siteKey)}}).catch(c=>{l(c)})})}function r(i,o,l){const c=window.grecaptcha;bp(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:e}).then(u=>{o(u)}).catch(()=>{o(Uk)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,o)=>{s(this.auth).then(l=>{if(!n&&bp(window.grecaptcha))r(l,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=Vk();c.length!==0&&(c+=l),Iy(c).then(()=>{r(l,i,o)}).catch(u=>{o(u)})}}).catch(l=>{o(l)})})}}async function kp(t,e,n,s=!1){const r=new jk(t);let i;try{i=await r.verify(n)}catch{i=await r.verify(n,!0)}const o=Object.assign({},e);return s?Object.assign(o,{captchaResp:i}):Object.assign(o,{captchaResponse:i}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function su(t,e,n,s){var r;if(!((r=t._getRecaptchaConfig())===null||r===void 0)&&r.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await kp(t,e,n,n==="getOobCode");return s(t,i)}else return s(t,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await kp(t,e,n,n==="getOobCode");return s(t,o)}else return Promise.reject(i)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bk(t,e){const n=ur(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if(Bi(i,e??{}))return r;gn(r,"already-initialized")}return n.initialize({options:e})}function zk(t,e){const n=(e==null?void 0:e.persistence)||[],s=(Array.isArray(n)?n:[n]).map(Kn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function qk(t,e,n){const s=Ps(t);pe(s._canInitEmulator,s,"emulator-config-failed"),pe(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!1,i=Ty(e),{host:o,port:l}=Hk(e),c=l===null?"":`:${l}`;s.config.emulator={url:`${i}//${o}${c}/`},s.settings.appVerificationDisabledForTesting=!0,s.emulatorConfig=Object.freeze({host:o,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})}),Wk()}function Ty(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Hk(t){const e=Ty(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:Ap(s.substr(i.length+1))}}else{const[i,o]=s.split(":");return{host:i,port:Ap(o)}}}function Ap(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Wk(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bd{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Hn("not implemented")}_getIdTokenResponse(e){return Hn("not implemented")}_linkToIdToken(e,n){return Hn("not implemented")}_getReauthenticationResolver(e){return Hn("not implemented")}}async function Kk(t,e){return Rs(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gk(t,e){return _o(t,"POST","/v1/accounts:signInWithPassword",Cs(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qk(t,e){return _o(t,"POST","/v1/accounts:signInWithEmailLink",Cs(t,e))}async function Yk(t,e){return _o(t,"POST","/v1/accounts:signInWithEmailLink",Cs(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi extends bd{constructor(e,n,s,r=null){super("password",s),this._email=e,this._password=n,this._tenantId=r}static _fromEmailAndPassword(e,n){return new Xi(e,n,"password")}static _fromEmailAndCode(e,n,s=null){return new Xi(e,n,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return su(e,n,"signInWithPassword",Gk);case"emailLink":return Qk(e,{email:this._email,oobCode:this._password});default:gn(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const s={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return su(e,s,"signUpPassword",Kk);case"emailLink":return Yk(e,{idToken:n,email:this._email,oobCode:this._password});default:gn(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mr(t,e){return _o(t,"POST","/v1/accounts:signInWithIdp",Cs(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jk="http://localhost";class ar extends bd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new ar(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):gn("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r}=n,i=gd(n,["providerId","signInMethod"]);if(!s||!r)return null;const o=new ar(s,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Mr(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,Mr(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Mr(e,n)}buildRequest(){const e={requestUri:Jk,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=ro(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xk(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Zk(t){const e=fi(pi(t)).link,n=e?fi(pi(e)).deep_link_id:null,s=fi(pi(t)).deep_link_id;return(s?fi(pi(s)).link:null)||s||n||e||t}class wd{constructor(e){var n,s,r,i,o,l;const c=fi(pi(e)),u=(n=c.apiKey)!==null&&n!==void 0?n:null,h=(s=c.oobCode)!==null&&s!==void 0?s:null,g=Xk((r=c.mode)!==null&&r!==void 0?r:null);pe(u&&h&&g,"argument-error"),this.apiKey=u,this.operation=g,this.code=h,this.continueUrl=(i=c.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(l=c.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const n=Zk(e);try{return new wd(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wr{constructor(){this.providerId=Wr.PROVIDER_ID}static credential(e,n){return Xi._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const s=wd.parseLink(n);return pe(s,"argument-error"),Xi._fromEmailAndCode(e,s.code,s.tenantId)}}Wr.PROVIDER_ID="password";Wr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Wr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ey{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vo extends Ey{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds extends vo{constructor(){super("facebook.com")}static credential(e){return ar._fromParams({providerId:ds.PROVIDER_ID,signInMethod:ds.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ds.credentialFromTaggedObject(e)}static credentialFromError(e){return ds.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ds.credential(e.oauthAccessToken)}catch{return null}}}ds.FACEBOOK_SIGN_IN_METHOD="facebook.com";ds.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs extends vo{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return ar._fromParams({providerId:hs.PROVIDER_ID,signInMethod:hs.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return hs.credentialFromTaggedObject(e)}static credentialFromError(e){return hs.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return hs.credential(n,s)}catch{return null}}}hs.GOOGLE_SIGN_IN_METHOD="google.com";hs.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fs extends vo{constructor(){super("github.com")}static credential(e){return ar._fromParams({providerId:fs.PROVIDER_ID,signInMethod:fs.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return fs.credentialFromTaggedObject(e)}static credentialFromError(e){return fs.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return fs.credential(e.oauthAccessToken)}catch{return null}}}fs.GITHUB_SIGN_IN_METHOD="github.com";fs.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps extends vo{constructor(){super("twitter.com")}static credential(e,n){return ar._fromParams({providerId:ps.PROVIDER_ID,signInMethod:ps.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return ps.credentialFromTaggedObject(e)}static credentialFromError(e){return ps.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return ps.credential(n,s)}catch{return null}}}ps.TWITTER_SIGN_IN_METHOD="twitter.com";ps.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ky(t,e){return _o(t,"POST","/v1/accounts:signUp",Cs(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,r=!1){const i=await Wn._fromIdTokenResponse(e,s,r),o=Sp(s);return new es({user:i,providerId:o,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const r=Sp(s);return new es({user:e,providerId:r,_tokenResponse:s,operationType:n})}}function Sp(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eA(t){var e;if(dn(t.app))return Promise.reject(An(t));const n=Ps(t);if(await n._initializationPromise,!((e=n.currentUser)===null||e===void 0)&&e.isAnonymous)return new es({user:n.currentUser,providerId:null,operationType:"signIn"});const s=await ky(n,{returnSecureToken:!0}),r=await es._fromIdTokenResponse(n,"signIn",s,!0);return await n._updateCurrentUser(r.user),r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $a extends mn{constructor(e,n,s,r){var i;super(n.code,n.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,$a.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,r){return new $a(e,n,s,r)}}function Ay(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?$a._fromErrorAndOperation(t,i,e,s):i})}async function tA(t,e,n=!1){const s=await Ji(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return es._forOperation(t,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nA(t,e,n=!1){const{auth:s}=t;if(dn(s.app))return Promise.reject(An(s));const r="reauthenticate";try{const i=await Ji(t,Ay(s,r,e,t),n);pe(i.idToken,s,"internal-error");const o=_d(i.idToken);pe(o,s,"internal-error");const{sub:l}=o;return pe(t.uid===l,s,"user-mismatch"),es._forOperation(t,r,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&gn(s,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sy(t,e,n=!1){if(dn(t.app))return Promise.reject(An(t));const s="signIn",r=await Ay(t,s,e),i=await es._fromIdTokenResponse(t,s,r);return n||await t._updateCurrentUser(i.user),i}async function sA(t,e){return Sy(Ps(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cy(t){const e=Ps(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function rA(t,e,n){if(dn(t.app))return Promise.reject(An(t));const s=Ps(t),o=await su(s,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",ky).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&Cy(t),c}),l=await es._fromIdTokenResponse(s,"signIn",o);return await s._updateCurrentUser(l.user),l}function iA(t,e,n){return dn(t.app)?Promise.reject(An(t)):sA(Ye(t),Wr.credential(e,n)).catch(async s=>{throw s.code==="auth/password-does-not-meet-requirements"&&Cy(t),s})}function oA(t,e,n,s){return Ye(t).onIdTokenChanged(e,n,s)}function aA(t,e,n){return Ye(t).beforeAuthStateChanged(e,n)}function lA(t,e,n,s){return Ye(t).onAuthStateChanged(e,n,s)}function cA(t){return Ye(t).signOut()}const Ua="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ry{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Ua,"1"),this.storage.removeItem(Ua),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uA=1e3,dA=10;class Py extends Ry{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=wy(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),r=this.localCache[n];s!==r&&e(n,r,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,c)=>{this.notifyListeners(o,c)});return}const s=e.key;n?this.detachListener():this.stopPolling();const r=()=>{const o=this.storage.getItem(s);!n&&this.localCache[s]===o||this.notifyListeners(s,o)},i=this.storage.getItem(s);Ck()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,dA):r()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},uA)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Py.type="LOCAL";const hA=Py;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class My extends Ry{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}My.type="SESSION";const Oy=My;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fA(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pl{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(r=>r.isListeningto(e));if(n)return n;const s=new Pl(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:r,data:i}=n.data,o=this.handlersMap[r];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const l=Array.from(o).map(async u=>u(n.origin,i)),c=await fA(l);n.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Pl.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xd(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pA{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise((l,c)=>{const u=xd("",20);r.port1.start();const h=setTimeout(()=>{c(new Error("unsupported_event"))},s);o={messageChannel:r,onMessage(g){const y=g;if(y.data.eventId===u)switch(y.data.status){case"ack":clearTimeout(h),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(y.data.response);break;default:clearTimeout(h),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:n},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sn(){return window}function gA(t){Sn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ny(){return typeof Sn().WorkerGlobalScope<"u"&&typeof Sn().importScripts=="function"}async function mA(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function yA(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function _A(){return Ny()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dy="firebaseLocalStorageDb",vA=1,ja="firebaseLocalStorage",Vy="fbase_key";class bo{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Ml(t,e){return t.transaction([ja],e?"readwrite":"readonly").objectStore(ja)}function bA(){const t=indexedDB.deleteDatabase(Dy);return new bo(t).toPromise()}function ru(){const t=indexedDB.open(Dy,vA);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(ja,{keyPath:Vy})}catch(r){n(r)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(ja)?e(s):(s.close(),await bA(),e(await ru()))})})}async function Cp(t,e,n){const s=Ml(t,!0).put({[Vy]:e,value:n});return new bo(s).toPromise()}async function wA(t,e){const n=Ml(t,!1).get(e),s=await new bo(n).toPromise();return s===void 0?null:s.value}function Rp(t,e){const n=Ml(t,!0).delete(e);return new bo(n).toPromise()}const xA=800,IA=3;class Ly{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ru(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>IA)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Ny()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Pl._getInstance(_A()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await mA(),!this.activeServiceWorker)return;this.sender=new pA(this.activeServiceWorker);const s=await this.sender._send("ping",{},800);s&&!((e=s[0])===null||e===void 0)&&e.fulfilled&&!((n=s[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||yA()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ru();return await Cp(e,Ua,"1"),await Rp(e,Ua),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>Cp(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>wA(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Rp(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=Ml(r,!1).getAll();return new bo(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(e.length!==0)for(const{fbase_key:r,value:i}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),xA)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ly.type="LOCAL";const TA=Ly;new yo(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function EA(t,e){return e?Kn(e):(pe(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Id extends bd{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Mr(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Mr(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Mr(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function kA(t){return Sy(t.auth,new Id(t),t.bypassAuthState)}function AA(t){const{auth:e,user:n}=t;return pe(n,e,"internal-error"),nA(n,new Id(t),t.bypassAuthState)}async function SA(t){const{auth:e,user:n}=t;return pe(n,e,"internal-error"),tA(n,new Id(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fy{constructor(e,n,s,r,i=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:r,tenantId:i,error:o,type:l}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return kA;case"linkViaPopup":case"linkViaRedirect":return SA;case"reauthViaPopup":case"reauthViaRedirect":return AA;default:gn(this.auth,"internal-error")}}resolve(e){Zn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Zn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CA=new yo(2e3,1e4);class Ar extends Fy{constructor(e,n,s,r,i){super(e,n,r,i),this.provider=s,this.authWindow=null,this.pollId=null,Ar.currentPopupAction&&Ar.currentPopupAction.cancel(),Ar.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return pe(e,this.auth,"internal-error"),e}async onExecution(){Zn(this.filter.length===1,"Popup operations only handle one event");const e=xd();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(kn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(kn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ar.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,s;if(!((s=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||s===void 0)&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(kn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,CA.get())};e()}}Ar.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RA="pendingRedirect",ia=new Map;class PA extends Fy{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=ia.get(this.auth._key());if(!e){try{const s=await MA(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}ia.set(this.auth._key(),e)}return this.bypassAuthState||ia.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function MA(t,e){const n=DA(e),s=NA(t);if(!await s._isAvailable())return!1;const r=await s._get(n)==="true";return await s._remove(n),r}function OA(t,e){ia.set(t._key(),e)}function NA(t){return Kn(t._redirectPersistence)}function DA(t){return ra(RA,t.config.apiKey,t.name)}async function VA(t,e,n=!1){if(dn(t.app))return Promise.reject(An(t));const s=Ps(t),r=EA(s,e),o=await new PA(s,r,n).execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LA=10*60*1e3;class FA{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!$A(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var s;if(e.error&&!$y(e)){const r=((s=e.error.code)===null||s===void 0?void 0:s.split("auth/")[1])||"internal-error";n.onError(kn(this.auth,r))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=LA&&this.cachedEventUids.clear(),this.cachedEventUids.has(Pp(e))}saveEventToCache(e){this.cachedEventUids.add(Pp(e)),this.lastProcessedEventTime=Date.now()}}function Pp(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function $y({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function $A(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return $y(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function UA(t,e={}){return Rs(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jA=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,BA=/^https?/;async function zA(t){if(t.config.emulator)return;const{authorizedDomains:e}=await UA(t);for(const n of e)try{if(qA(n))return}catch{}gn(t,"unauthorized-domain")}function qA(t){const e=tu(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===s}if(!BA.test(n))return!1;if(jA.test(t))return s===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HA=new yo(3e4,6e4);function Mp(){const t=Sn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function WA(t){return new Promise((e,n)=>{var s,r,i;function o(){Mp(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Mp(),n(kn(t,"network-request-failed"))},timeout:HA.get()})}if(!((r=(s=Sn().gapi)===null||s===void 0?void 0:s.iframes)===null||r===void 0)&&r.Iframe)e(gapi.iframes.getContext());else if(!((i=Sn().gapi)===null||i===void 0)&&i.load)o();else{const l=Fk("iframefcb");return Sn()[l]=()=>{gapi.load?o():n(kn(t,"network-request-failed"))},Iy(`${Lk()}?onload=${l}`).catch(c=>n(c))}}).catch(e=>{throw oa=null,e})}let oa=null;function KA(t){return oa=oa||WA(t),oa}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GA=new yo(5e3,15e3),QA="__/auth/iframe",YA="emulator/auth/iframe",JA={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},XA=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function ZA(t){const e=t.config;pe(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?yd(e,YA):`https://${t.config.authDomain}/${QA}`,s={apiKey:e.apiKey,appName:t.name,v:Ur},r=XA.get(t.config.apiHost);r&&(s.eid=r);const i=t._getFrameworks();return i.length&&(s.fw=i.join(",")),`${n}?${ro(s).slice(1)}`}async function e2(t){const e=await KA(t),n=Sn().gapi;return pe(n,t,"internal-error"),e.open({where:document.body,url:ZA(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:JA,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const o=kn(t,"network-request-failed"),l=Sn().setTimeout(()=>{i(o)},GA.get());function c(){Sn().clearTimeout(l),r(s)}s.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const t2={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},n2=500,s2=600,r2="_blank",i2="http://localhost";class Op{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function o2(t,e,n,s=n2,r=s2){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let l="";const c=Object.assign(Object.assign({},t2),{width:s.toString(),height:r.toString(),top:i,left:o}),u=Nt().toLowerCase();n&&(l=my(u)?r2:n),py(u)&&(e=e||i2,c.scrollbars="yes");const h=Object.entries(c).reduce((y,[m,_])=>`${y}${m}=${_},`,"");if(Sk(u)&&l!=="_self")return a2(e||"",l),new Op(null);const g=window.open(e||"",l,h);pe(g,t,"popup-blocked");try{g.focus()}catch{}return new Op(g)}function a2(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const l2="__/auth/handler",c2="emulator/auth/handler",u2=encodeURIComponent("fac");async function Np(t,e,n,s,r,i){pe(t.config.authDomain,t,"auth-domain-config-required"),pe(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:Ur,eventId:r};if(e instanceof Ey){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",xw(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,g]of Object.entries({}))o[h]=g}if(e instanceof vo){const h=e.getScopes().filter(g=>g!=="");h.length>0&&(o.scopes=h.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const h of Object.keys(l))l[h]===void 0&&delete l[h];const c=await t._getAppCheckToken(),u=c?`#${u2}=${encodeURIComponent(c)}`:"";return`${d2(t)}?${ro(l).slice(1)}${u}`}function d2({config:t}){return t.emulator?yd(t,c2):`https://${t.authDomain}/${l2}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bc="webStorageSupport";class h2{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Oy,this._completeRedirectFn=VA,this._overrideRedirectResult=OA}async _openPopup(e,n,s,r){var i;Zn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await Np(e,n,s,tu(),r);return o2(e,o,xd())}async _openRedirect(e,n,s,r){await this._originValidation(e);const i=await Np(e,n,s,tu(),r);return gA(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:r,promise:i}=this.eventManagers[n];return r?Promise.resolve(r):(Zn(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await e2(e),s=new FA(e);return n.register("authEvent",r=>(pe(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(bc,{type:bc},r=>{var i;const o=(i=r==null?void 0:r[0])===null||i===void 0?void 0:i[bc];o!==void 0&&n(!!o),gn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=zA(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return wy()||gy()||vd()}}const f2=h2;var Dp="@firebase/auth",Vp="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p2{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){pe(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g2(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function m2(t){Pn(new fn("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=s.options;pe(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const c={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:xy(t)},u=new Nk(s,r,i,c);return zk(u,n),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),Pn(new fn("auth-internal",e=>{const n=Ps(e.getProvider("auth").getImmediate());return(s=>new p2(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),nn(Dp,Vp,g2(t)),nn(Dp,Vp,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y2=5*60,_2=um("authIdTokenMaxAge")||y2;let Lp=null;const v2=t=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>_2)return;const r=n==null?void 0:n.token;Lp!==r&&(Lp=r,await fetch(t,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function b2(t=Eu()){const e=ur(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Bk(t,{popupRedirectResolver:f2,persistence:[TA,hA,Oy]}),s=um("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(s,location.origin);if(location.origin===i.origin){const o=v2(i.toString());aA(n,o,()=>o(n.currentUser)),oA(n,l=>o(l))}}const r=lm("auth");return r&&qk(n,`http://${r}`),n}function w2(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}Dk({loadJS(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=r=>{const i=kn("internal-error");i.customData=r,n(i)},s.type="text/javascript",s.charset="UTF-8",w2().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});m2("Browser");const Uy={apiKey:"AIzaSyDXuDcTNEEtdk-NmypL87DzSUiBUhh4eRM",authDomain:"market-booking-project.firebaseapp.com",projectId:"market-booking-project",storageBucket:"market-booking-project.firebasestorage.app",messagingSenderId:"678040117836",appId:"1:678040117836:web:9cf755116cf8953e838ae9",measurementId:"G-P0KPELC5H0"},Td=gm(Uy),je=HE(Td),Bn=b2(Td);tI().then(t=>{t&&Zx(Td)}).catch(t=>console.log("Analytics notice:",t));const Or=!0;console.log("🔥 Connected to Firebase project:",Uy.projectId);function Oi(t){return JSON.parse(JSON.stringify(t||[]))}function x2(t){return Bn?lA(Bn,e=>{e?(console.log("Firebase Auth: Signed in as",e.uid),t&&t(e)):eA(Bn).catch(n=>{console.warn("Anonymous Auth notice:",n.message)})}):()=>{}}function I2(t,e){if(!je)return console.log("Firebase not configured. Real-time sync skipped (using Local Storage mode)."),()=>{};const n=As(je,"markets","main-layout");return sy(n,r=>{if(r.exists()){const i=r.data();console.log("⚡ Real-time update received from Firestore:",i),t&&t({name:i.name,zones:i.zones||[],stalls:i.stalls||[],layoutObjects:i.layoutObjects||[],marketWidthMeters:i.marketWidthMeters,marketHeightMeters:i.marketHeightMeters,gridSnapMeters:i.gridSnapMeters,updatedAt:i.updatedAt})}else console.log("No Firestore document found for markets/main-layout yet.")},r=>{console.warn("Firestore snapshot listener warning/notice:",r.message),e&&e(r)})}async function T2(t,e,n,s={},r=[]){if(!je)return console.log("Local Mode: Saved to localStorage"),{success:!0,mode:"local"};try{const i=As(je,"markets","main-layout"),o=Oi(e),l=Oi(n),c=Oi(r),u={name:t||"ตลาดยามเย็น Walking Street KKU",zones:o,stalls:l,layoutObjects:c,marketWidthMeters:s.marketWidthMeters||30,marketHeightMeters:s.marketHeightMeters||20,gridSnapMeters:s.gridSnapMeters||.5,updatedAt:new Date().toISOString()};return await ny(i,u,{merge:!0}),{success:!0,mode:"firestore"}}catch(i){return console.warn("Firestore Save Notice (falling back to LocalStorage):",i),{success:!1,mode:"local",error:i}}}async function E2(t,e,n,s,r){if(!je)return{success:!0,mode:"local"};const i=As(je,"markets","main-layout"),o=Er(je,"bookings");try{const l=Oi(r),c=Oi(n);await ok(je,async u=>{const h=await u.get(i);let g=c;h.exists()&&(g=h.data().stalls||c);const y=g.findIndex(_=>_.id===t);if(y===-1)throw new Error("ไม่พบข้อมูลแผงค้านี้ในระบบ");const m=g[y];if(m.status==="booked")throw new Error(`แผงค้า ${m.stallNo} ถูกผู้อื่นจองไปก่อนหน้านี้แล้ว!`);if(m.status==="disabled")throw new Error(`แผงค้า ${m.stallNo} ปิดให้บริการ ไม่สามารถจองได้`);g[y]={...m,status:"booked",bookedBy:{tenantId:e.tenantId||"demo-tenant-001",name:e.name,phone:e.phone,goodsType:e.goodsType,bookedAt:new Date().toISOString()}},u.set(i,{name:s,zones:l,stalls:g,updatedAt:new Date().toISOString()},{merge:!0})});try{await eu(o,{stallId:t,customerName:e.name,customerPhone:e.phone,goodsType:e.goodsType,createdAt:ak(),status:"confirmed"})}catch(u){console.warn("Booking log notice:",u.message)}return{success:!0,mode:"firestore"}}catch(l){throw console.error("Transaction Notice:",l.message),l}}function k2(){try{const t=localStorage.getItem("tenant_notifications");if(!t)return[];const e=JSON.parse(t);if(Array.isArray(e))return e.length>50?(localStorage.removeItem("tenant_notifications"),localStorage.removeItem("tenant_notifications_deleted"),[]):e}catch{localStorage.removeItem("tenant_notifications")}return[]}const Ol=bu("notification",{state:()=>({notifications:k2(),deletedIds:JSON.parse(localStorage.getItem("tenant_notifications_deleted"))||[],unsubscribeListener:null,isPurging:!1}),getters:{unreadCount:t=>(e,n=!1)=>{if(n)return t.notifications.filter(r=>!r.isRead).length;const s=e||"demo-tenant-001";return t.notifications.filter(r=>!r.isRead&&(r.tenantId===s||r.tenantId==="demo-tenant-001")).length},tenantNotifications:t=>(e,n=!1)=>{let s=t.notifications;if(!n){const r=e||"demo-tenant-001";s=t.notifications.filter(i=>i.tenantId===r||i.tenantId==="demo-tenant-001")}return[...s].sort((r,i)=>new Date(i.createdAt||0)-new Date(r.createdAt||0))}},actions:{persistLocal(){try{localStorage.setItem("tenant_notifications",JSON.stringify(this.notifications.slice(0,50))),localStorage.setItem("tenant_notifications_deleted",JSON.stringify(this.deletedIds.slice(0,100)))}catch(t){console.warn("Notification storage notice:",t)}},initNotificationSync(){if(je&&(this.autoCleanupIfSpammed(),!this.unsubscribeListener))try{const t=Er(je,"notifications");this.unsubscribeListener=sy(t,e=>{const n=[];e.forEach(r=>{const i=r.data(),o=r.id;this.deletedIds.includes(o)||n.push({id:o,...i})}),n.sort((r,i)=>new Date(i.createdAt||0)-new Date(r.createdAt||0));const s=n.slice(0,30);this.notifications=s,this.persistLocal()},e=>{console.warn("Notification snapshot notice:",e.message)})}catch(t){console.warn("Init notification sync error:",t)}},async autoCleanupIfSpammed(){if(!(!je||this.isPurging))try{const t=await _p(Er(je,"notifications"));t.size>40&&(console.log(`🧹 พบ notifications ตกค้าง ${t.size} รายการ กำลังล้างทำความสะอาด...`),await this.clearAllNotifications())}catch(t){console.warn("Auto cleanup notice:",t)}},async sendBatchLayoutNotifications(t){if(!(!t||t.length===0)){for(const e of t){const n={id:`notif-${Date.now().toString(36)}-${Math.random().toString(36).substring(2,7)}`,tenantId:e.tenantId||"demo-tenant-001",stallId:e.stallId||"N/A",stallNo:e.stallNo||"N/A",title:e.title||"อัปเดตข้อมูลแผงค้า",message:e.message||"แผงค้าของคุณได้รับการอัปเดตจากผู้ดูแลระบบ",type:e.type||"LAYOUT_UPDATE",isRead:!1,createdAt:e.createdAt||new Date().toISOString()};if(this.notifications.unshift(n),je)try{await eu(Er(je,"notifications"),{...n,createdAt:n.createdAt})}catch(s){console.warn("Firestore notification batch add notice:",s.message)}}this.persistLocal()}},async sendStallShiftNotification({tenantId:t,stallNo:e,title:n,message:s,type:r="LAYOUT_UPDATE",details:i={}}){const o=t||"demo-tenant-001",l={id:`notif-${Date.now().toString(36)}-${Math.random().toString(36).substring(2,6)}`,tenantId:o,stallId:i.stallId||e||"N/A",stallNo:e||"N/A",title:n||`⚠️ อัปเดตข้อมูลแผงค้า ${e}`,message:s||`แผงค้า ${e} ของคุณได้รับการปรับปรุงข้อมูลบนผังตลาด`,type:r,isRead:!1,details:i,createdAt:new Date().toISOString()};if(this.notifications.unshift(l),this.persistLocal(),je)try{await eu(Er(je,"notifications"),l)}catch(c){console.warn("Firestore notification add notice:",c.message)}},markAsRead(t){const e=this.notifications.findIndex(n=>n.id===t);if(e!==-1&&(this.notifications[e].isRead=!0,this.persistLocal()),je)try{tk(As(je,"notifications",t),{isRead:!0}).catch(()=>{})}catch{}},markAllAsRead(t,e=!1){this.notifications.forEach(n=>{(e||!t||n.tenantId===t||n.tenantId==="demo-tenant-001")&&(n.isRead=!0)}),this.persistLocal()},deleteNotification(t){if(this.deletedIds.includes(t)||this.deletedIds.push(t),this.notifications=this.notifications.filter(e=>e.id!==t),this.persistLocal(),je)try{nk(As(je,"notifications",t)).catch(()=>{})}catch{}},async clearAllNotifications(){if(this.isPurging=!0,this.notifications=[],this.deletedIds=[],localStorage.removeItem("tenant_notifications"),localStorage.removeItem("tenant_notifications_deleted"),je)try{const t=await _p(Er(je,"notifications")),e=lk(je);t.forEach(n=>{e.delete(n.ref)}),await e.commit(),console.log(`✅ Cleared all ${t.size} notifications from Firestore`)}catch(t){console.warn("Error clearing Firestore notifications:",t)}this.isPurging=!1}}}),Nn=bu("market",{state:()=>({activeMode:"admin",theme:localStorage.getItem("app_theme")||"light",marketName:localStorage.getItem("market_name")||"ตลาดยามเย็น Walking Street KKU",marketWidthMeters:Number(localStorage.getItem("market_width_m"))||30,marketHeightMeters:Number(localStorage.getItem("market_height_m"))||20,scalePxPerMeter:40,gridSnapMeters:Number(localStorage.getItem("market_grid_snap_m"))||.5,snapToGrid:!0,zoomLevel:1,panOffset:{x:0,y:0},zones:JSON.parse(localStorage.getItem("market_zones"))||hf,stalls:JSON.parse(localStorage.getItem("market_stalls"))||ff,layoutObjects:JSON.parse(localStorage.getItem("market_layout_objects"))||pf,selectedStallId:null,selectedObjectId:null,filterZoneId:"all",filterStatus:"all",searchQuery:"",isSaving:!1,isLoading:!1,isRealtimeConnected:!1,lastSavedTime:null,notification:null,unsubscribeRealtime:null,currentUser:null,hasUnsavedChanges:!1,initialStallsState:{},dirtyStallsMap:{},deletedBookedStalls:[]}),getters:{isDark:t=>t.theme==="dark",selectedStall:t=>t.stalls.find(e=>e.id===t.selectedStallId),selectedObject:t=>t.layoutObjects.find(e=>e.id===t.selectedObjectId),getZoneById:t=>e=>t.zones.find(n=>n.id===e)||{name:"ไม่ระบุ",color:"#94a3b8"},canvasWidthPx:t=>Math.round(t.marketWidthMeters*t.scalePxPerMeter),canvasHeightPx:t=>Math.round(t.marketHeightMeters*t.scalePxPerMeter),gridSizePx:t=>Math.round(t.gridSnapMeters*t.scalePxPerMeter),totalMarketAreaSqM:t=>t.marketWidthMeters*t.marketHeightMeters,filteredStalls:t=>t.stalls.filter(e=>{const n=t.filterZoneId==="all"||e.zoneId===t.filterZoneId,s=t.filterStatus==="all"||e.status===t.filterStatus,r=!t.searchQuery||e.stallNo.toLowerCase().includes(t.searchQuery.toLowerCase())||e.notes&&e.notes.toLowerCase().includes(t.searchQuery.toLowerCase());return n&&s&&r}),stats:t=>{const e=t.stalls.length,n=t.stalls.filter(o=>o.status==="available").length,s=t.stalls.filter(o=>o.status==="booked").length,r=t.stalls.filter(o=>o.status==="disabled").length,i=t.stalls.filter(o=>o.status==="booked").reduce((o,l)=>o+(l.price||0),0);return{total:e,available:n,booked:s,disabled:r,totalRevenue:i}}},actions:{initTheme(){this.theme==="dark"?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")},toggleTheme(){this.theme=this.theme==="light"?"dark":"light",localStorage.setItem("app_theme",this.theme),this.theme==="dark"?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),this.showNotification(`สลับเป็นโหมด ${this.theme==="dark"?"Dark Mode 🌙":"Light Mode ☀️"}`,"info")},setTheme(t){this.theme=t,localStorage.setItem("app_theme",t),t==="dark"?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")},pxToM(t){return Math.round(t/this.scalePxPerMeter*10)/10},mToPx(t){return Math.round(t*this.scalePxPerMeter)},getStallMetrics(t){if(!t)return{widthM:0,heightM:0,xM:0,yM:0,areaSqM:0};const e=this.pxToM(t.width),n=this.pxToM(t.height),s=this.pxToM(t.x),r=this.pxToM(t.y),i=Math.round(e*n*10)/10;return{widthM:e,heightM:n,xM:s,yM:r,areaSqM:i}},getObjectMetrics(t){if(!t)return{widthM:0,heightM:0,xM:0,yM:0};const e=this.pxToM(t.width),n=this.pxToM(t.height),s=this.pxToM(t.x),r=this.pxToM(t.y);return{widthM:e,heightM:n,xM:s,yM:r}},initFirebaseSync(){this.initTheme(),this._captureInitialStallsState(),x2(t=>{this.currentUser=t}),this.unsubscribeRealtime||(this.unsubscribeRealtime=I2(t=>{this.isSaving||(t.stalls&&t.stalls.length>0&&(this.stalls=t.stalls),t.zones&&t.zones.length>0&&(this.zones=t.zones),t.layoutObjects&&t.layoutObjects.length>0&&(this.layoutObjects=t.layoutObjects),t.name&&(this.marketName=t.name),t.marketWidthMeters&&(this.marketWidthMeters=t.marketWidthMeters),t.marketHeightMeters&&(this.marketHeightMeters=t.marketHeightMeters),t.gridSnapMeters&&(this.gridSnapMeters=t.gridSnapMeters),this.isRealtimeConnected=!0,this.lastSavedTime=new Date().toLocaleTimeString("th-TH"),this.hasUnsavedChanges=!1,this._captureInitialStallsState(),this.persistToLocal())},()=>{this.isRealtimeConnected=!1}))},setMode(t){this.activeMode=t},showNotification(t,e="info"){this._notifTimer&&(clearTimeout(this._notifTimer),this._notifTimer=null),this.notification={msg:t,type:e},this._notifTimer=setTimeout(()=>{this.notification=null,this._notifTimer=null},3e3)},persistToLocal(){try{localStorage.setItem("market_stalls",JSON.stringify(this.stalls)),localStorage.setItem("market_zones",JSON.stringify(this.zones)),localStorage.setItem("market_layout_objects",JSON.stringify(this.layoutObjects)),localStorage.setItem("market_name",this.marketName),localStorage.setItem("market_width_m",String(this.marketWidthMeters)),localStorage.setItem("market_height_m",String(this.marketHeightMeters)),localStorage.setItem("market_grid_snap_m",String(this.gridSnapMeters)),localStorage.setItem("app_theme",this.theme)}catch(t){console.warn("LocalStorage save error:",t)}},markUnsaved(){this.hasUnsavedChanges=!0,this.persistToLocal()},_captureInitialStallsState(){const t={};this.stalls.forEach(e=>{t[e.id]={id:e.id,stallNo:e.stallNo,zoneId:e.zoneId,x:e.x,y:e.y,width:e.width,height:e.height,price:e.price,status:e.status,notes:e.notes||"",bookedBy:e.bookedBy?JSON.parse(JSON.stringify(e.bookedBy)):null}}),this.initialStallsState=t,this.dirtyStallsMap={},this.deletedBookedStalls=[]},snapshotStallIfNew(t){this.dirtyStallsMap||(this.dirtyStallsMap={}),this.dirtyStallsMap[t]=!0},updateMarketDimensions({name:t,widthMeters:e,heightMeters:n,gridSnapMeters:s}){t&&(this.marketName=t),e&&e>0&&(this.marketWidthMeters=Number(e)),n&&n>0&&(this.marketHeightMeters=Number(n)),s&&s>0&&(this.gridSnapMeters=Number(s)),this.markUnsaved(),this.showNotification(`ปรับขนาดตลาดเป็น ${this.marketWidthMeters} x ${this.marketHeightMeters} เมตร — กด "บันทึกผัง" เพื่อยืนยัน`,"warning")},selectStall(t){this.selectedStallId=t,this.selectedObjectId=null},selectLayoutObject(t){this.selectedObjectId=t,this.selectedStallId=null},deselectAll(){this.selectedStallId=null,this.selectedObjectId=null},addStall(t={}){var u;const e=this.stalls.length+1,n=((u=this.zones[0])==null?void 0:u.id)||"zone-food",s=this.getZoneById(n),r=this.mToPx(t.widthM||2.5),i=this.mToPx(t.heightM||2),o=e*40%(this.canvasWidthPx-120)+40,l=Math.floor(e*40/(this.canvasWidthPx-120))*120+40,c={id:`stall-${Date.now().toString(36)}`,stallNo:t.stallNo||`S-${String(e).padStart(2,"0")}`,zoneId:t.zoneId||n,x:t.x??o,y:t.y??l,width:r,height:i,price:t.price||s.pricePerDay||400,status:t.status||"available",bookedBy:null,notes:t.notes||""};return this.stalls.push(c),this.selectStall(c.id),this.markUnsaved(),this.showNotification(`เพิ่มแผงค้า ${c.stallNo} — กด "บันทึกผัง" เพื่อยืนยัน`,"warning"),c},updateStall(t,e){const n=this.stalls.findIndex(s=>s.id===t);n!==-1&&(e.widthM!==void 0&&(e.width=this.mToPx(e.widthM)),e.heightM!==void 0&&(e.height=this.mToPx(e.heightM)),e.xM!==void 0&&(e.x=this.mToPx(e.xM)),e.yM!==void 0&&(e.y=this.mToPx(e.yM)),delete e.widthM,delete e.heightM,delete e.xM,delete e.yM,this.stalls[n]={...this.stalls[n],...e},this.markUnsaved())},updateStallPosition(t,e,n){const s=this.stalls.find(r=>r.id===t);if(s){const r=this.gridSizePx;this.snapToGrid&&r>0?(s.x=Math.max(0,Math.round(e/r)*r),s.y=Math.max(0,Math.round(n/r)*r)):(s.x=Math.max(0,Math.round(e)),s.y=Math.max(0,Math.round(n))),this.hasUnsavedChanges=!0,this.persistToLocal()}},updateStallSize(t,e,n){const s=this.stalls.find(r=>r.id===t);if(s){const r=this.gridSizePx,i=this.mToPx(1);this.snapToGrid&&r>0?(s.width=Math.max(i,Math.round(e/r)*r),s.height=Math.max(i,Math.round(n/r)*r)):(s.width=Math.max(i,Math.round(e)),s.height=Math.max(i,Math.round(n))),this.hasUnsavedChanges=!0,this.persistToLocal()}},removeStall(t){const e=this.stalls.findIndex(n=>n.id===t);if(e!==-1){const n=this.stalls.splice(e,1)[0];this.selectedStallId===t&&(this.selectedStallId=null),n.status==="booked"&&n.bookedBy&&(this.deletedBookedStalls||(this.deletedBookedStalls=[]),this.deletedBookedStalls.push(n)),this.markUnsaved(),this.showNotification(`ลบแผงค้า ${n.stallNo} — กด "บันทึกผัง" เพื่อยืนยัน`,"warning")}},addLayoutObject(t){const e=this.layoutObjects.length+1,n=this.mToPx(t.widthM||3),s=this.mToPx(t.heightM||2),r={id:`obj-${Date.now().toString(36)}`,type:t.type||"facility",subType:t.subType||"info",label:t.label||`วัตถุโครงสร้าง ${e}`,x:120+e*30%300,y:120+e*30%200,width:n,height:s,rotation:0,styleProps:t.styleProps||{color:"#6366f1",icon:"help-circle"}};return this.layoutObjects.push(r),this.selectLayoutObject(r.id),this.markUnsaved(),this.showNotification(`เพิ่ม ${r.label} บนผังแล้ว`,"success"),r},updateLayoutObject(t,e){const n=this.layoutObjects.findIndex(s=>s.id===t);n!==-1&&(e.widthM!==void 0&&(e.width=this.mToPx(e.widthM)),e.heightM!==void 0&&(e.height=this.mToPx(e.heightM)),e.xM!==void 0&&(e.x=this.mToPx(e.xM)),e.yM!==void 0&&(e.y=this.mToPx(e.yM)),delete e.widthM,delete e.heightM,delete e.xM,delete e.yM,this.layoutObjects[n]={...this.layoutObjects[n],...e},this.markUnsaved())},rotateLayoutObject(t){const e=this.layoutObjects.find(n=>n.id===t);e&&(e.rotation=((e.rotation||0)+90)%360,this.markUnsaved(),this.showNotification(`หมุน ${e.label} เป็น ${e.rotation}°`,"info"))},updateLayoutObjectPosition(t,e,n){const s=this.layoutObjects.find(r=>r.id===t);if(s){const r=this.gridSizePx;this.snapToGrid&&r>0?(s.x=Math.max(0,Math.round(e/r)*r),s.y=Math.max(0,Math.round(n/r)*r)):(s.x=Math.max(0,Math.round(e)),s.y=Math.max(0,Math.round(n))),this.hasUnsavedChanges=!0,this.persistToLocal()}},updateLayoutObjectSize(t,e,n){const s=this.layoutObjects.find(r=>r.id===t);if(s){const r=this.gridSizePx,i=this.mToPx(.8);this.snapToGrid&&r>0?(s.width=Math.max(i,Math.round(e/r)*r),s.height=Math.max(i,Math.round(n/r)*r)):(s.width=Math.max(i,Math.round(e)),s.height=Math.max(i,Math.round(n))),this.hasUnsavedChanges=!0,this.persistToLocal()}},removeLayoutObject(t){const e=this.layoutObjects.findIndex(n=>n.id===t);if(e!==-1){const n=this.layoutObjects.splice(e,1)[0];this.selectedObjectId===t&&(this.selectedObjectId=null),this.markUnsaved(),this.showNotification(`ลบวัตถุ ${n.label} แล้ว`,"warning")}},addZone(t){const e={id:`zone-${Date.now().toString(36)}`,name:t.name||"โซนใหม่",color:t.color||"#3b82f6",pricePerDay:t.pricePerDay||400};this.zones.push(e),this.markUnsaved(),this.showNotification(`เพิ่ม ${e.name} — กด "บันทึกผัง" เพื่อยืนยัน`,"warning")},updateZone(t,e){const n=this.zones.findIndex(s=>s.id===t);n!==-1&&(this.zones[n]={...this.zones[n],...e},this.markUnsaved())},removeZone(t){if(this.zones.length<=1){this.showNotification("ต้องมีอย่างน้อย 1 โซนในระบบ","warning");return}this.zones=this.zones.filter(e=>e.id!==t),this.markUnsaved(),this.showNotification('ลบโซนแล้ว — กด "บันทึกผัง" เพื่อยืนยัน',"warning")},async bookStall(t,e){const n=this.stalls.find(s=>s.id===t);if(!n)return!1;if(n.status==="booked")return this.showNotification(`แผงค้า ${n.stallNo} ถูกจองไปแล้ว!`,"error"),!1;try{const s=await E2(t,e,this.stalls,this.marketName,this.zones);return n.status="booked",n.bookedBy={tenantId:e.tenantId||"demo-tenant-001",name:e.name,phone:e.phone,goodsType:e.goodsType,bookedAt:new Date().toISOString()},this.persistToLocal(),s.mode==="firestore"?this.showNotification(`จองแผงค้า ${n.stallNo} สำเร็จแล้ว! (บันทึก Firestore)`,"success"):this.showNotification(`จองแผงค้า ${n.stallNo} สำเร็จ! (โหมด Local)`,"success"),!0}catch(s){return console.error("Booking Error:",s),this.showNotification(s.message||"เกิดข้อผิดพลาดในการจองแผงค้า","error"),!1}},cancelBooking(t){const e=this.stalls.find(n=>n.id===t);e&&(e.status="available",e.bookedBy=null,this.markUnsaved(),this.showNotification(`ยกเลิกการจองแผง ${e.stallNo} — กด "บันทึกผัง" เพื่อยืนยัน`,"warning"))},async saveLayoutToFirestore(t=!1){var e;this.isSaving=!0,this.persistToLocal();try{const n=await this._sendBatchShiftNotifications(),s=await T2(this.marketName,this.zones,this.stalls,{marketWidthMeters:this.marketWidthMeters,marketHeightMeters:this.marketHeightMeters,gridSnapMeters:this.gridSnapMeters},this.layoutObjects);this.lastSavedTime=new Date().toLocaleTimeString("th-TH"),this.hasUnsavedChanges=!1,this._captureInitialStallsState(),t||(n>0?this.showNotification(`✅ บันทึกผังสำเร็จ และส่งแจ้งเตือนไปยังผู้เช่า ${n} ราย`,"success"):s.success&&s.mode==="firestore"?this.showNotification("✅ บันทึกผังตลาดลง Firebase Firestore สำเร็จ!","success"):((e=s.error)==null?void 0:e.code)==="permission-denied"?this.showNotification("บันทึกในเครื่องสำเร็จ (กรุณาเปิดสิทธิ์ Rules บน Firebase Console)","warning"):this.showNotification("✅ บันทึกผังตลาดเรียบร้อยแล้ว","success"))}catch(n){console.warn("Save Layout notice:",n),t||this.showNotification("✅ บันทึกข้อมูลเรียบร้อยแล้ว (โหมด Local Storage)","success"),this.hasUnsavedChanges=!1}finally{this.isSaving=!1}},async _sendBatchShiftNotifications(){var s,r,i,o,l,c;if(!this.initialStallsState||Object.keys(this.initialStallsState).length===0)return this._captureInitialStallsState(),0;const t=Ol(),e=new Map;for(const u of this.stalls){const h=this.initialStallsState[u.id],g=u.status==="booked",y=h&&h.status==="booked";if(!g&&!y)continue;const m=((s=u.bookedBy)==null?void 0:s.tenantId)||((r=u.bookedBy)==null?void 0:r.uid)||((i=h==null?void 0:h.bookedBy)==null?void 0:i.tenantId)||((o=h==null?void 0:h.bookedBy)==null?void 0:o.uid)||"demo-tenant-001";if(!h){e.has(m)||e.set(m,[]),e.get(m).push({stall:u,oldSnap:null,posChanged:!1,sizeChanged:!1,infoChanged:!0});continue}const _=h.x!==u.x||h.y!==u.y,A=h.width!==u.width||h.height!==u.height,W=h.status!==u.status||h.stallNo!==u.stallNo||h.price!==u.price||h.notes!==(u.notes||"")||h.zoneId!==u.zoneId;!_&&!A&&!W||(e.has(m)||e.set(m,[]),e.get(m).push({stall:u,oldSnap:h,posChanged:_,sizeChanged:A,infoChanged:W}))}if(this.deletedBookedStalls&&this.deletedBookedStalls.length>0)for(const u of this.deletedBookedStalls){const h=((l=u.bookedBy)==null?void 0:l.tenantId)||((c=u.bookedBy)==null?void 0:c.uid)||"demo-tenant-001";e.has(h)||e.set(h,[]),e.get(h).push({stall:u,oldSnap:u,posChanged:!1,sizeChanged:!1,infoChanged:!0,isDeleted:!0})}if(e.size===0)return 0;const n=[];for(const[u,h]of e.entries())if(h.length===1){const g=h[0],y=g.stall.stallNo,m=g.stall.id;let _="อัปเดตข้อมูลแผงค้า",A="";g.isDeleted?(_="แจ้งเตือนการยกเลิกแผงค้า",A=`แผง ${y} ของคุณถูกนำออกจากผังตลาดโดยผู้ดูแลระบบ`):g.posChanged&&(g.sizeChanged||g.infoChanged)?(_="อัปเดตข้อมูลแผงค้า",A=`แผง ${y} ของคุณได้รับการปรับตำแหน่งและอัปเดตข้อมูลบนผังตลาดเรียบร้อยแล้ว`):g.posChanged?(_="อัปเดตตำแหน่งแผงค้า",A=`แผง ${y} ของคุณได้รับการปรับเปลี่ยนตำแหน่งบนผังตลาด`):(_="อัปเดตข้อมูลแผงค้า",A=`ข้อมูลแผง ${y} ของคุณได้รับการอัปเดตจากผู้ดูแลระบบ`),n.push({tenantId:u,stallId:m,stallNo:y,title:_,message:A,type:"LAYOUT_UPDATE",createdAt:new Date().toISOString(),isRead:!1})}else{const g=h.map(M=>M.stall.stallNo).join(", "),y=h.map(M=>M.stall.id).join(", "),m=h.some(M=>M.posChanged),_="อัปเดตข้อมูลแผงค้า",A=m?`แผงค้าของคุณ (${g}) ได้รับการปรับตำแหน่งและอัปเดตข้อมูลบนผังตลาดเรียบร้อยแล้ว`:`แผงค้าของคุณ (${g}) ได้รับการปรับปรุงข้อมูลบนผังตลาดเรียบร้อยแล้ว`;n.push({tenantId:u,stallId:y,stallNo:g,title:_,message:A,type:"LAYOUT_UPDATE",createdAt:new Date().toISOString(),isRead:!1})}return await t.sendBatchLayoutNotifications(n),n.length},resetToDefaults(){this.stalls=JSON.parse(JSON.stringify(ff)),this.zones=JSON.parse(JSON.stringify(hf)),this.layoutObjects=JSON.parse(JSON.stringify(pf)),this.marketWidthMeters=30,this.marketHeightMeters=20,this.gridSnapMeters=.5,this.selectedStallId=null,this.selectedObjectId=null,this.initialStallsState={},this.dirtyStallsMap={},this.deletedBookedStalls=[],this._captureInitialStallsState(),this.markUnsaved(),this.showNotification('รีเซ็ตผังตลาดแล้ว — กด "บันทึกผัง" เพื่อยืนยัน',"warning")}}}),br={owner:{uid:"demo-owner-001",email:"owner@market.com",displayName:"คุณวิชัย (เจ้าของตลาด Walking Street)",role:"owner",phone:"081-999-8888",citizenId:"1100200300401"},admin:{uid:"demo-admin-001",email:"admin@market.com",displayName:"คุณสมชาย (ผู้ดูแลระบบผังตลาด)",role:"admin",phone:"082-777-6666",citizenId:"1100200300402"},tenant:{uid:"demo-tenant-001",email:"tenant@market.com",displayName:"คุณสมพงษ์ (พ่อค้าชาไข่มุก)",role:"tenant",phone:"083-555-4444",citizenId:"1100200300403"}},Nl=bu("auth",{state:()=>{const t=localStorage.getItem("auth_user");return{currentUser:t?JSON.parse(t):br.tenant,isAuthenticated:!0,isLoading:!1,authError:null}},getters:{userRole:t=>{var e;return((e=t.currentUser)==null?void 0:e.role)||"tenant"},isOwner:t=>{var e;return((e=t.currentUser)==null?void 0:e.role)==="owner"},isAdmin:t=>{var e,n;return((e=t.currentUser)==null?void 0:e.role)==="admin"||((n=t.currentUser)==null?void 0:n.role)==="owner"},isTenant:t=>{var e;return((e=t.currentUser)==null?void 0:e.role)==="tenant"},userName:t=>{var e,n;return((e=t.currentUser)==null?void 0:e.displayName)||((n=t.currentUser)==null?void 0:n.email)||"ผู้ใช้งานทั่วไป"}},actions:{setUser(t){this.currentUser=t,this.isAuthenticated=!!t,t?localStorage.setItem("auth_user",JSON.stringify(t)):localStorage.removeItem("auth_user")},switchDemoRole(t){return br[t]?(this.setUser(br[t]),!0):!1},async register({email:t,password:e,displayName:n,phone:s,citizenId:r,role:i="tenant"}){this.isLoading=!0,this.authError=null;try{if(Or&&Bn){const l=(await rA(Bn,t,e)).user,c={uid:l.uid,email:l.email,displayName:n,phone:s,citizenId:r,role:i,createdAt:new Date().toISOString()};return je&&await ny(As(je,"users",l.uid),c),this.setUser(c),{success:!0,user:c}}else{const o={uid:`local-${Date.now()}`,email:t,displayName:n,phone:s,citizenId:r,role:i,createdAt:new Date().toISOString()};return this.setUser(o),{success:!0,user:o}}}catch(o){return console.error("Registration error:",o),this.authError=o.message,{success:!1,error:o.message}}finally{this.isLoading=!1}},async login(t,e){this.isLoading=!0,this.authError=null;try{if(Or&&Bn){const s=(await iA(Bn,t,e)).user;let r={uid:s.uid,email:s.email,displayName:s.displayName||t.split("@")[0],role:"tenant"};if(je){const i=await ek(As(je,"users",s.uid));i.exists()&&(r={...r,...i.data()})}return this.setUser(r),{success:!0,user:r}}else{const n=Object.keys(br).find(r=>br[r].email.toLowerCase()===t.toLowerCase()),s=n?br[n]:{uid:`local-${Date.now()}`,email:t,displayName:t.split("@")[0],role:"tenant"};return this.setUser(s),{success:!0,user:s}}}catch(n){return console.error("Login error:",n),this.authError=n.message,{success:!1,error:n.message}}finally{this.isLoading=!1}},async logout(){try{Or&&Bn&&await cA(Bn)}catch(t){console.warn("Signout notice:",t)}finally{this.setUser(null)}}}});/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A2=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Go={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S2=({size:t,strokeWidth:e=2,absoluteStrokeWidth:n,color:s,iconNode:r,name:i,class:o,...l},{slots:c})=>_a("svg",{...Go,width:t||Go.width,height:t||Go.height,stroke:s||Go.stroke,"stroke-width":n?Number(e)*24/Number(t):e,class:["lucide",`lucide-${A2(i??"icon")}`],...l},[...r.map(u=>_a(...u)),...c.default?[c.default()]:[]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e=(t,e)=>(n,{slots:s})=>_a(S2,{...n,iconNode:e,name:t},s);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ed=_e("BathIcon",[["path",{d:"M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5",key:"1r8yf5"}],["line",{x1:"10",x2:"8",y1:"5",y2:"7",key:"h5g8z4"}],["line",{x1:"2",x2:"22",y1:"12",y2:"12",key:"1dnqot"}],["line",{x1:"7",x2:"7",y1:"19",y2:"21",key:"16jp00"}],["line",{x1:"17",x2:"17",y1:"19",y2:"21",key:"1pxrnk"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jy=_e("BellIcon",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C2=_e("CheckCheckIcon",[["path",{d:"M18 6 7 17l-5-5",key:"116fxf"}],["path",{d:"m22 10-7.5 7.5L13 16",key:"ke71qq"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kd=_e("CheckIcon",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wc=_e("ChevronDownIcon",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R2=_e("ChevronRightIcon",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fp=_e("ChevronUpIcon",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const By=_e("CircleAlertIcon",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P2=_e("CircleCheckBigIcon",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M2=_e("CircleCheckIcon",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ba=_e("CircleHelpIcon",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O2=_e("CloudUploadIcon",[["path",{d:"M12 13v8",key:"1l5pq0"}],["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"m8 17 4-4 4 4",key:"1quai1"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ad=_e("CreditCardIcon",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sd=_e("CrossIcon",[["path",{d:"M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z",key:"1t5g7j"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const za=_e("DoorOpenIcon",[["path",{d:"M13 4h3a2 2 0 0 1 2 2v14",key:"hrm0s9"}],["path",{d:"M2 20h3",key:"1gaodv"}],["path",{d:"M13 20h9",key:"s90cdi"}],["path",{d:"M10 12v.01",key:"vx6srw"}],["path",{d:"M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z",key:"199qr4"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N2=_e("FlameIcon",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cd=_e("FootprintsIcon",[["path",{d:"M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z",key:"1dudjm"}],["path",{d:"M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z",key:"l2t8xc"}],["path",{d:"M16 17h4",key:"1dejxt"}],["path",{d:"M4 13h4",key:"1bwh8b"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D2=_e("Grid3x3Icon",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"M15 3v18",key:"14nvp0"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V2=_e("LayersIcon",[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",key:"8b97xw"}],["path",{d:"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",key:"dd6zsq"}],["path",{d:"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",key:"ep9fru"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L2=_e("LayoutGridIcon",[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F2=_e("LockIcon",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rd=_e("LogOutIcon",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wo=_e("Maximize2Icon",[["polyline",{points:"15 3 21 3 21 9",key:"mznyad"}],["polyline",{points:"9 21 3 21 3 15",key:"1avn1i"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10",key:"ota7mn"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pd=_e("MicIcon",[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $2=_e("MoonIcon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U2=_e("MoveIcon",[["polyline",{points:"5 9 2 12 5 15",key:"1r5uj5"}],["polyline",{points:"9 5 12 2 15 5",key:"5v383o"}],["polyline",{points:"15 19 12 22 9 19",key:"g7qi8m"}],["polyline",{points:"19 9 22 12 19 15",key:"tpp73q"}],["line",{x1:"2",x2:"22",y1:"12",y2:"12",key:"1dnqot"}],["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zy=_e("PaletteIcon",[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Md=_e("PlusIcon",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qy=_e("RotateCwIcon",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j2=_e("SaveIcon",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B2=_e("SearchIcon",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z2=_e("SettingsIcon",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q2=_e("ShieldCheckIcon",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Od=_e("ShoppingBagIcon",[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",key:"hou9p0"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H2=_e("SlidersVerticalIcon",[["line",{x1:"4",x2:"4",y1:"21",y2:"14",key:"1p332r"}],["line",{x1:"4",x2:"4",y1:"10",y2:"3",key:"gb41h5"}],["line",{x1:"12",x2:"12",y1:"21",y2:"12",key:"hf2csr"}],["line",{x1:"12",x2:"12",y1:"8",y2:"3",key:"1kfi7u"}],["line",{x1:"20",x2:"20",y1:"21",y2:"16",key:"1lhrwl"}],["line",{x1:"20",x2:"20",y1:"12",y2:"3",key:"16vvfq"}],["line",{x1:"2",x2:"6",y1:"14",y2:"14",key:"1uebub"}],["line",{x1:"10",x2:"14",y1:"8",y2:"8",key:"1yglbp"}],["line",{x1:"18",x2:"22",y1:"16",y2:"16",key:"1jxqpz"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qa=_e("SquareIcon",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W2=_e("SunIcon",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cn=_e("Trash2Icon",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K2=_e("UserCheckIcon",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["polyline",{points:"16 11 18 13 22 9",key:"1pwet4"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G2=_e("UserIcon",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q2=_e("WrenchIcon",[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",key:"cbrjhi"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ms=_e("XIcon",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $p=_e("ZoomInIcon",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Up=_e("ZoomOutIcon",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]),Y2={class:"glass-panel dark:glass-panel-dark sticky top-0 z-30 border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs transition-colors duration-300"},J2={class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"},X2={class:"flex items-center justify-between h-16 gap-3"},Z2={class:"flex items-center space-x-3"},eS={class:"w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200 dark:shadow-none shrink-0 transition-transform hover:scale-105"},tS={class:"text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2"},nS={class:"text-[11px] text-slate-500 dark:text-slate-400 hidden md:block"},sS={class:"text-indigo-600 dark:text-indigo-400 font-mono font-semibold"},rS={class:"flex items-center bg-slate-100 dark:bg-slate-950 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-inner"},iS={class:"flex items-center space-x-2"},oS=["title"],aS={key:0,class:"absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm animate-pulse"},lS={class:"text-xs"},cS={class:"max-w-[80px] sm:max-w-[120px] truncate hidden sm:inline text-slate-500 dark:text-slate-400 font-medium"},uS={class:"bg-slate-50/90 dark:bg-slate-950/90 border-t border-slate-200/60 dark:border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2 text-xs backdrop-blur-sm transition-colors duration-300"},dS={class:"max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3"},hS={class:"flex items-center gap-2.5 sm:gap-3 text-slate-600 dark:text-slate-400 flex-wrap"},fS={class:"flex items-center gap-1.5 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs"},pS={class:"text-slate-900 dark:text-white font-mono font-bold"},gS={class:"flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded-xl border border-emerald-200/80 dark:border-emerald-800 shadow-xs"},mS={class:"font-mono font-bold text-emerald-700 dark:text-emerald-400"},yS={class:"flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs"},_S={class:"font-mono font-bold text-slate-700 dark:text-slate-300"},vS={class:"flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 px-2.5 py-1 rounded-xl border border-rose-200/80 dark:border-rose-800 shadow-xs"},bS={class:"font-mono font-bold text-rose-700 dark:text-rose-400"},wS={key:0,class:"flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-mono bg-emerald-100/80 dark:bg-emerald-950/80 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800 shadow-xs font-semibold"},xS={key:0,class:"flex items-center space-x-2"},IS=["disabled"],TS={key:0},ES={key:1},kS={key:2},AS={key:3,class:"absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-white dark:border-slate-950 rounded-full"},SS={__name:"Navbar",emits:["open-zone-manager","open-firebase-config","open-market-settings","open-auth","open-notifications"],setup(t){const e=Nn(),n=Nl(),s=Ol(),r=Pt(()=>{var i;return s.unreadCount((i=n.currentUser)==null?void 0:i.uid,n.isAdmin||n.isOwner)});return(i,o)=>(q(),ee("header",Y2,[f("div",J2,[f("div",X2,[f("div",Z2,[f("div",eS,[G(k(L2),{class:"w-5 h-5 text-white"})]),f("div",null,[f("h1",tS,[qe(F(k(e).marketName)+" ",1),f("span",{class:xe(["px-2.5 py-0.5 text-[10px] font-semibold rounded-full hidden sm:inline-flex items-center gap-1.5 transition-colors",k(Or)?"bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800":"bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800"])},[f("span",{class:xe(["w-1.5 h-1.5 rounded-full",k(Or)?"bg-emerald-500 animate-pulse":"bg-amber-500"])},null,2),qe(" "+F(k(Or)?"Firestore Online":"Local Mode"),1)],2)]),f("p",nS,[o[11]||(o[11]=qe(" ขนาดผังรวม: ",-1)),f("strong",sS,F(k(e).marketWidthMeters)+" × "+F(k(e).marketHeightMeters)+" ม.",1),qe(" ("+F(k(e).totalMarketAreaSqM)+" ตร.ม.) ",1)])])]),f("div",rS,[f("button",{onClick:o[0]||(o[0]=l=>k(e).setMode("admin")),class:xe(["px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5",k(e).activeMode==="admin"?"bg-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-none":"text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"])},[G(k(Q2),{class:"w-3.5 h-3.5"}),o[12]||(o[12]=f("span",{class:"hidden sm:inline"},"Admin Builder",-1))],2),f("button",{onClick:o[1]||(o[1]=l=>k(e).setMode("customer")),class:xe(["px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5",k(e).activeMode==="customer"?"bg-emerald-600 text-white shadow-sm shadow-emerald-200 dark:shadow-none":"text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"])},[G(k(Od),{class:"w-3.5 h-3.5"}),o[13]||(o[13]=f("span",{class:"hidden sm:inline"},"Customer Map",-1))],2)]),f("div",iS,[f("button",{onClick:o[2]||(o[2]=l=>k(e).toggleTheme()),class:"p-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-400 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-xs transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center",title:k(e).isDark?"สลับเป็น Light Mode":"สลับเป็น Dark Mode"},[k(e).isDark?(q(),ft(k(W2),{key:0,class:"w-4 h-4 text-amber-400"})):(q(),ft(k($2),{key:1,class:"w-4 h-4 text-indigo-600"}))],8,oS),f("button",{onClick:o[3]||(o[3]=l=>i.$emit("open-notifications")),class:"relative p-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-xs transition-all duration-200 hover:scale-105 active:scale-95",title:"การแจ้งเตือน"},[G(k(jy),{class:"w-4 h-4 text-amber-500"}),r.value>0?(q(),ee("span",aS,F(r.value),1)):we("",!0)]),f("button",{onClick:o[4]||(o[4]=l=>i.$emit("open-auth")),class:"px-3 py-1.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 hover:border-slate-300 dark:hover:border-slate-700"},[f("span",lS,F(k(n).userRole==="owner"?"👑 Owner":k(n).userRole==="admin"?"🛡️ Admin":"🛍️ Tenant"),1),f("span",cS,F(k(n).userName),1)]),f("button",{onClick:o[5]||(o[5]=l=>i.$emit("open-firebase-config")),class:"p-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-xs transition-all duration-200 hover:scale-105",title:"ตั้งค่า Firebase Config"},[G(k(z2),{class:"w-4 h-4"})])])])]),f("div",uS,[f("div",dS,[f("div",hS,[f("div",fS,[o[16]||(o[16]=f("span",{class:"w-2 h-2 rounded-full bg-slate-400"},null,-1)),f("span",null,[o[14]||(o[14]=qe("ทั้งหมด: ",-1)),f("strong",pS,F(k(e).stats.total),1),o[15]||(o[15]=qe(" แผง",-1))])]),f("div",gS,[o[18]||(o[18]=f("span",{class:"w-2 h-2 rounded-full bg-emerald-500"},null,-1)),f("span",null,[o[17]||(o[17]=qe("ว่าง: ",-1)),f("strong",mS,F(k(e).stats.available),1)])]),f("div",yS,[o[20]||(o[20]=f("span",{class:"w-2 h-2 rounded-full bg-slate-400"},null,-1)),f("span",null,[o[19]||(o[19]=qe("จองแล้ว: ",-1)),f("strong",_S,F(k(e).stats.booked),1)])]),f("div",vS,[o[22]||(o[22]=f("span",{class:"w-2 h-2 rounded-full bg-rose-500"},null,-1)),f("span",null,[o[21]||(o[21]=qe("ปิดบริการ: ",-1)),f("strong",bS,F(k(e).stats.disabled),1)])]),k(n).isAdmin||k(n).isOwner?(q(),ee("div",wS,[f("span",null,[o[23]||(o[23]=qe("💰 รายได้รวม: ",-1)),f("strong",null,"฿"+F(k(e).stats.totalRevenue.toLocaleString()),1)])])):we("",!0)]),k(e).activeMode==="admin"?(q(),ee("div",xS,[f("button",{onClick:o[6]||(o[6]=l=>i.$emit("open-market-settings")),class:"flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-indigo-700 dark:text-indigo-400 text-xs font-semibold rounded-xl border border-slate-200/90 dark:border-slate-800 transition shadow-xs",title:"ตั้งค่าขนาดตลาดรวม"},[G(k(wo),{class:"w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400"}),f("span",null,F(k(e).marketWidthMeters)+"×"+F(k(e).marketHeightMeters)+"ม.",1)]),f("button",{onClick:o[7]||(o[7]=l=>i.$emit("open-zone-manager")),class:"flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-purple-700 dark:text-purple-400 text-xs font-semibold rounded-xl border border-slate-200/90 dark:border-slate-800 transition shadow-xs",title:"จัดการโซนสินค้า"},[G(k(zy),{class:"w-3.5 h-3.5 text-purple-600 dark:text-purple-400"}),o[24]||(o[24]=f("span",null,"จัดการโซน",-1))]),f("button",{onClick:o[8]||(o[8]=l=>k(e).addStall()),class:"flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl border border-slate-200/90 dark:border-slate-800 transition shadow-xs",title:"เพิ่มแผงใหม่"},[G(k(Md),{class:"w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400"}),o[25]||(o[25]=f("span",{class:"hidden sm:inline"},"เพิ่มแผง",-1))]),f("button",{onClick:o[9]||(o[9]=l=>k(e).saveLayoutToFirestore()),disabled:k(e).isSaving,class:xe(["relative flex items-center gap-1.5 px-4 py-1.5 font-bold text-xs rounded-xl shadow-md transition-all duration-200 active:scale-95 disabled:opacity-50",k(e).hasUnsavedChanges?"bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-200 animate-pulse":"bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 dark:shadow-none"])},[G(k(j2),{class:"w-4 h-4"}),k(e).isSaving?(q(),ee("span",TS,"กำลังบันทึก...")):k(e).hasUnsavedChanges?(q(),ee("span",ES,"บันทึกผัง *")):(q(),ee("span",kS,"บันทึกผัง")),k(e).hasUnsavedChanges&&!k(e).isSaving?(q(),ee("span",AS)):we("",!0)],10,IS),f("button",{onClick:o[10]||(o[10]=l=>k(e).resetToDefaults()),class:"text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 underline transition text-[11px] ml-1 hidden lg:inline font-medium"}," รีเซ็ตผัง ")])):we("",!0)])])]))}},CS={class:"relative w-full h-[calc(100vh-112px)] overflow-hidden bg-slate-50 dark:bg-slate-950 flex flex-col select-none transition-colors duration-300"},RS={key:0,class:"flex items-center gap-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 p-1.5 rounded-2xl shadow-lg transition-all duration-200 hover:scale-105"},PS={class:"text-xs font-mono font-bold text-slate-600 dark:text-slate-300 px-1"},MS={key:1,class:"flex flex-col gap-1.5 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 p-2 rounded-2xl shadow-xl transition-all duration-200 max-w-[calc(100vw-32px)]"},OS={class:"flex items-center gap-1.5 flex-wrap"},NS={class:"flex items-center bg-slate-100/80 dark:bg-slate-800/80 rounded-xl p-0.5 border border-slate-200/60 dark:border-slate-700/60"},DS={class:"text-xs font-mono text-slate-700 dark:text-slate-200 w-11 text-center font-bold"},VS=["title"],LS=["title"],FS={class:"text-[11px] text-slate-500 dark:text-slate-400 font-mono hidden md:flex items-center gap-1 ml-auto px-1.5"},$S={class:"flex items-center gap-1.5 pt-1.5 border-t border-slate-200/60 dark:border-slate-800/80 overflow-x-auto scrollbar-none relative"},US=["onClick"],jS={class:"text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase px-2 py-0.5 tracking-wider"},BS=["onClick"],zS={class:"flex items-center gap-2"},qS={class:"font-medium text-[11px] group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors"},HS={class:"text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold"},WS={class:"hidden sm:flex items-center gap-1 shrink-0"},KS=["onClick"],GS={class:"flex items-start justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 tracking-wide"},QS={class:"flex items-center gap-1.5 text-indigo-700 dark:text-indigo-400 font-bold"},YS={class:"flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500 border-t border-slate-200/80 dark:border-slate-800 pt-2"},JS=["onMousedown","onTouchstart","onClick"],XS={class:"flex items-center gap-1.5 font-bold text-xs text-slate-800 dark:text-slate-100"},ZS={class:"truncate tracking-tight"},eC={class:"flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-auto"},tC={key:0,class:"font-bold text-indigo-600 dark:text-indigo-400"},nC=["onMousedown","onTouchstart"],sC=["onMousedown","onTouchstart","onClick"],rC={class:"flex items-center justify-between text-slate-900 dark:text-white font-semibold gap-1 leading-relaxed"},iC={class:"text-xs sm:text-sm font-bold font-mono tracking-tight drop-shadow-xs pt-0.5"},oC={class:"text-[10px] px-1.5 py-0.5 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 font-mono text-slate-600 dark:text-slate-300 font-semibold shadow-xs"},aC={class:"flex items-center justify-between mt-auto gap-1"},lC={class:"text-[11px] font-mono text-slate-800 dark:text-slate-200 font-bold"},cC=["onMousedown","onTouchstart"],uC={key:0,class:"absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-4 text-xs animate-slide-up text-slate-800 dark:text-slate-200"},dC={class:"flex items-center gap-2"},hC={class:"font-bold text-slate-900 dark:text-white text-sm"},fC={class:"text-slate-500 dark:text-slate-400 font-medium"},pC={class:"flex items-center gap-3 font-mono text-slate-700 dark:text-slate-300 font-semibold"},gC={class:"text-indigo-600 dark:text-indigo-400"},mC={class:"text-indigo-600 dark:text-indigo-400"},yC={class:"text-emerald-600 dark:text-emerald-400"},_C={class:"flex items-center gap-2"},vC={key:1,class:"absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-4 text-xs animate-slide-up text-slate-800 dark:text-slate-200"},bC={class:"flex items-center gap-2"},wC={class:"font-bold text-slate-900 dark:text-white text-sm"},xC={class:"flex items-center gap-3 font-mono text-slate-700 dark:text-slate-300 font-semibold"},IC={class:"text-indigo-600 dark:text-indigo-400"},TC={class:"flex items-center gap-2"},EC={__name:"StallCanvas",emits:["open-editor","open-object-editor"],setup(t){const e=Nn(),n=Ee(null),s=Ee(localStorage.getItem("admin_toolbar_collapsed")==="true"),r=Ee(localStorage.getItem("admin_toolbar_position")||"top"),i=Ee(null);function o(){s.value=!s.value,localStorage.setItem("admin_toolbar_collapsed",String(s.value)),i.value=null}function l(){r.value=r.value==="top"?"bottom":"top",localStorage.setItem("admin_toolbar_position",r.value),i.value=null}function c(j){i.value=i.value===j?null:j}function u(j){e.addLayoutObject(j),i.value=null}const h=Pt(()=>[{id:"access",label:"ทางเข้า/ออก",icon:za,color:"#10b981",presets:Ht.filter(j=>["entrance","exit","walkway"].includes(j.type))},{id:"facility",label:"สิ่งอำนวยความสะดวก",icon:Ba,color:"#0ea5e9",presets:Ht.filter(j=>j.type==="facility"||j.subType==="restroom")},{id:"structure",label:"โครงสร้างหลัก",icon:qa,color:"#8b5cf6",presets:Ht.filter(j=>j.type==="restricted"&&j.subType!=="restroom")}]),g=Pt(()=>[Ht.find(j=>j.type==="walkway")||Ht[2],Ht.find(j=>j.type==="entrance")||Ht[0],Ht.find(j=>j.subType==="restroom")||Ht[4],Ht.find(j=>j.subType==="stage")||Ht[5],Ht.find(j=>j.subType==="atm")||Ht[7]].filter(Boolean)),y=Ee(!1),m=Ee(!1),_=Ee(!1),A=Ee("stall"),M=Ee(null),W=Ee({x:0,y:0}),H=Ee({x:0,y:0,w:0,h:0}),te=Ee({x:0,y:0}),Y=Pt(()=>e.getStallMetrics(e.selectedStall)),oe=Pt(()=>e.getObjectMetrics(e.selectedObject));function me(j){return j.status==="booked"?"bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 opacity-90 hover:border-slate-400":j.status==="disabled"?"bg-slate-200/60 dark:bg-slate-800/60 text-slate-400 border-slate-300 dark:border-slate-700 opacity-60":"bg-emerald-50/90 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 hover:border-emerald-500 shadow-xs"}function R(j){switch(j){case"available":return"ว่าง";case"booked":return"จองแล้ว";case"disabled":return"ปิดบริการ";default:return j}}function w(j){switch(j){case"door-open":return za;case"log-out":return Rd;case"footprints":return Cd;case"bath":return Ed;case"mic":return Pd;case"trash-2":return Cn;case"credit-card":return Ad;case"help-circle":return Ba;case"cross":return Sd;default:return qa}}function b(){e.zoomLevel=Math.min(2,e.zoomLevel+.15)}function E(){e.zoomLevel=Math.max(.4,e.zoomLevel-.15)}function C(){e.zoomLevel=1,e.panOffset={x:0,y:0}}const T=Ee(0);function I(j){if(i.value=null,j.touches.length===1){const O=j.touches[0];(j.target===n.value||j.target.classList.contains("bg-dot-pattern")||j.target.classList.contains("bg-dot-pattern-light"))&&(e.deselectAll(),_.value=!0,te.value={x:O.clientX-e.panOffset.x,y:O.clientY-e.panOffset.y})}else if(j.touches.length===2){_.value=!1;const O=j.touches[0].clientX-j.touches[1].clientX,Se=j.touches[0].clientY-j.touches[1].clientY;T.value=Math.hypot(O,Se)}}function Ve(j){if(j.touches.length===1){const O=j.touches[0];if(y.value&&M.value){const Se=(O.clientX-W.value.x)/e.zoomLevel,Ze=(O.clientY-W.value.y)/e.zoomLevel;A.value==="stall"?e.updateStallPosition(M.value.id,H.value.x+Se,H.value.y+Ze):e.updateLayoutObjectPosition(M.value.id,H.value.x+Se,H.value.y+Ze)}else if(m.value&&M.value){const Se=(O.clientX-W.value.x)/e.zoomLevel,Ze=(O.clientY-W.value.y)/e.zoomLevel;A.value==="stall"?e.updateStallSize(M.value.id,H.value.w+Se,H.value.h+Ze):e.updateLayoutObjectSize(M.value.id,H.value.w+Se,H.value.h+Ze)}else _.value&&(e.panOffset={x:O.clientX-te.value.x,y:O.clientY-te.value.y})}else if(j.touches.length===2&&T.value>0){const O=j.touches[0].clientX-j.touches[1].clientX,Se=j.touches[0].clientY-j.touches[1].clientY,Ze=Math.hypot(O,Se),rt=(Ze-T.value)*.005;e.zoomLevel=Math.min(2.5,Math.max(.4,e.zoomLevel+rt)),T.value=Ze}}function ct(j,O){if(j.touches.length===1){const Se=j.touches[0];e.snapshotStallIfNew(O.id),y.value=!0,A.value="stall",M.value=O,W.value={x:Se.clientX,y:Se.clientY},H.value={x:O.x,y:O.y,w:O.width,h:O.height}}}function $e(j,O){if(j.touches.length===1){const Se=j.touches[0];e.snapshotStallIfNew(O.id),m.value=!0,A.value="stall",M.value=O,W.value={x:Se.clientX,y:Se.clientY},H.value={x:O.x,y:O.y,w:O.width,h:O.height}}}function ye(j,O){j.button===0&&(e.snapshotStallIfNew(O.id),y.value=!0,A.value="stall",M.value=O,W.value={x:j.clientX,y:j.clientY},H.value={x:O.x,y:O.y,w:O.width,h:O.height})}function Ae(j,O){j.button===0&&(e.snapshotStallIfNew(O.id),m.value=!0,A.value="stall",M.value=O,W.value={x:j.clientX,y:j.clientY},H.value={x:O.x,y:O.y,w:O.width,h:O.height})}function zt(j,O){j.button===0&&(y.value=!0,A.value="object",M.value=O,W.value={x:j.clientX,y:j.clientY},H.value={x:O.x,y:O.y,w:O.width,h:O.height})}function Dn(j,O){if(j.touches.length===1){const Se=j.touches[0];y.value=!0,A.value="object",M.value=O,W.value={x:Se.clientX,y:Se.clientY},H.value={x:O.x,y:O.y,w:O.width,h:O.height}}}function an(j,O){j.button===0&&(m.value=!0,A.value="object",M.value=O,W.value={x:j.clientX,y:j.clientY},H.value={x:O.x,y:O.y,w:O.width,h:O.height})}function Xe(j,O){if(j.touches.length===1){const Se=j.touches[0];m.value=!0,A.value="object",M.value=O,W.value={x:Se.clientX,y:Se.clientY},H.value={x:O.x,y:O.y,w:O.width,h:O.height}}}function st(j){i.value=null,(j.target===n.value||j.target.classList.contains("bg-dot-pattern")||j.target.classList.contains("bg-dot-pattern-light"))&&(e.deselectAll(),_.value=!0,te.value={x:j.clientX-e.panOffset.x,y:j.clientY-e.panOffset.y})}function Kr(j){if(y.value&&M.value){const O=(j.clientX-W.value.x)/e.zoomLevel,Se=(j.clientY-W.value.y)/e.zoomLevel,Ze=H.value.x+O,rt=H.value.y+Se;A.value==="stall"?e.updateStallPosition(M.value.id,Ze,rt):e.updateLayoutObjectPosition(M.value.id,Ze,rt)}else if(m.value&&M.value){const O=(j.clientX-W.value.x)/e.zoomLevel,Se=(j.clientY-W.value.y)/e.zoomLevel,Ze=H.value.w+O,rt=H.value.h+Se;A.value==="stall"?e.updateStallSize(M.value.id,Ze,rt):e.updateLayoutObjectSize(M.value.id,Ze,rt)}else _.value&&(e.panOffset={x:j.clientX-te.value.x,y:j.clientY-te.value.y})}function ln(){y.value=!1,m.value=!1,_.value=!1,M.value=null,T.value=0}return(j,O)=>{var Se,Ze,rt;return q(),ee("div",CS,[f("div",{class:xe(["absolute z-20 transition-all duration-300 select-none pointer-events-auto",r.value==="bottom"?"bottom-4 left-4":"top-4 left-4"])},[s.value?(q(),ee("div",RS,[f("button",{onClick:o,class:"flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 rounded-xl text-xs font-bold transition shadow-xs",title:"ขยายแถบเครื่องมือ (Expand Controls)"},[G(k(V2),{class:"w-4 h-4 text-indigo-600 dark:text-indigo-400"}),O[8]||(O[8]=f("span",null,"เครื่องมือผัง",-1)),r.value==="top"?(q(),ft(k(wc),{key:0,class:"w-3.5 h-3.5"})):(q(),ft(k(Fp),{key:1,class:"w-3.5 h-3.5"}))]),f("span",PS,F(Math.round(k(e).zoomLevel*100))+"% ",1),f("button",{onClick:b,class:"p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl transition active:scale-95",title:"ซูมเข้า (+)"},[G(k($p),{class:"w-3.5 h-3.5"})]),f("button",{onClick:E,class:"p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl transition active:scale-95",title:"ซูมออก (-)"},[G(k(Up),{class:"w-3.5 h-3.5"})])])):(q(),ee("div",MS,[f("div",OS,[f("button",{onClick:o,class:"p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-all active:scale-95 flex items-center gap-1 text-xs",title:"พับเก็บแถบเครื่องมือเพื่อดูผังเต็มตา"},[r.value==="top"?(q(),ft(k(Fp),{key:0,class:"w-4 h-4"})):(q(),ft(k(wc),{key:1,class:"w-4 h-4"})),O[9]||(O[9]=f("span",{class:"text-[11px] font-semibold hidden sm:inline"},"พับเก็บ",-1))]),O[10]||(O[10]=f("div",{class:"w-px h-4 bg-slate-200 dark:bg-slate-800 my-auto"},null,-1)),f("div",NS,[f("button",{onClick:E,class:"p-1 hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition active:scale-95",title:"Zoom Out (-)"},[G(k(Up),{class:"w-3.5 h-3.5"})]),f("span",DS,F(Math.round(k(e).zoomLevel*100))+"% ",1),f("button",{onClick:b,class:"p-1 hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition active:scale-95",title:"Zoom In (+)"},[G(k($p),{class:"w-3.5 h-3.5"})]),f("button",{onClick:C,class:"px-1.5 py-0.5 hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-[11px] rounded-lg font-medium transition",title:"รีเซ็ตสเกล (Reset 100%)"}," 1:1 ")]),O[11]||(O[11]=f("div",{class:"w-px h-4 bg-slate-200 dark:bg-slate-800 my-auto"},null,-1)),f("button",{onClick:O[0]||(O[0]=Q=>k(e).snapToGrid=!k(e).snapToGrid),class:xe(["px-2.5 py-1 text-xs rounded-xl border transition-all duration-150 flex items-center gap-1.5 active:scale-95",k(e).snapToGrid?"bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 font-semibold shadow-xs":"bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700"]),title:`สแนปกริด ${k(e).gridSnapMeters} เมตร (${k(e).snapToGrid?"เปิด":"ปิด"})`},[G(k(D2),{class:"w-3.5 h-3.5"}),f("span",null,"Snap "+F(k(e).gridSnapMeters)+"ม.",1)],10,VS),f("button",{onClick:l,class:"p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl transition",title:r.value==="top"?"ย้ายแถบไปไว้ด้านล่างหน้าจอ":"ย้ายแถบไปไว้ด้านบนหน้าจอ"},[G(k(U2),{class:"w-3.5 h-3.5"})],8,LS),f("div",FS,[G(k(wo),{class:"w-3 h-3 text-indigo-600 dark:text-indigo-400"}),f("span",null,F(k(e).marketWidthMeters)+"×"+F(k(e).marketHeightMeters)+"ม.",1)])]),f("div",$S,[f("button",{onClick:O[1]||(O[1]=Q=>k(e).addStall()),class:"px-3 py-1 text-xs rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition flex items-center gap-1.5 shadow-sm shadow-indigo-200 dark:shadow-none active:scale-95 shrink-0",title:"เพิ่มแผงค้าใหม่"},[G(k(Md),{class:"w-3.5 h-3.5"}),O[12]||(O[12]=f("span",null,"เพิ่มแผง",-1))]),O[13]||(O[13]=f("div",{class:"w-px h-4 bg-slate-200 dark:bg-slate-800 my-auto shrink-0"},null,-1)),(q(!0),ee(Qe,null,un(h.value,Q=>(q(),ee("div",{key:Q.id,class:"relative shrink-0"},[f("button",{onClick:vt(x=>c(Q.id),["stop"]),class:xe(["px-2.5 py-1 text-xs rounded-xl border transition-all flex items-center gap-1.5 active:scale-95",i.value===Q.id?"bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100 font-semibold shadow-xs":"bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 font-medium"])},[(q(),ft(zs(Q.icon),{class:"w-3.5 h-3.5",style:tt({color:i.value===Q.id?"currentColor":Q.color})},null,8,["style"])),f("span",null,F(Q.label),1),G(k(wc),{class:xe(["w-3 h-3 transition-transform",{"rotate-180":i.value===Q.id}])},null,8,["class"])],10,US),G(al,{name:"fade"},{default:no(()=>[i.value===Q.id?(q(),ee("div",{key:0,class:xe(["absolute left-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-2xl p-2 w-56 space-y-1 animate-slide-up",r.value==="bottom"?"bottom-full mb-2":"top-full mt-2"]),onClick:O[2]||(O[2]=vt(()=>{},["stop"]))},[f("div",jS,F(Q.label),1),(q(!0),ee(Qe,null,un(Q.presets,x=>(q(),ee("button",{key:x.type+x.subType,onClick:S=>u(x),class:"w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs transition flex items-center justify-between group/item"},[f("div",zS,[(q(),ft(zs(w(x.styleProps.icon)),{class:"w-4 h-4 shrink-0",style:tt({color:x.styleProps.color})},null,8,["style"])),f("span",qS,F(x.label),1)]),f("span",HS,F(x.widthM)+"×"+F(x.heightM)+"ม. ",1)],8,BS))),128))],2)):we("",!0)]),_:2},1024)]))),128)),O[14]||(O[14]=f("div",{class:"w-px h-4 bg-slate-200 dark:bg-slate-800 my-auto shrink-0 hidden sm:block"},null,-1)),f("div",WS,[(q(!0),ee(Qe,null,un(g.value,Q=>(q(),ee("div",{key:"quick-"+Q.type+Q.subType,class:"relative group/tooltip"},[f("button",{onClick:x=>k(e).addLayoutObject(Q),class:"p-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition-all hover:scale-105 active:scale-95"},[(q(),ft(zs(w(Q.styleProps.icon)),{class:"w-3.5 h-3.5",style:tt({color:Q.styleProps.color})},null,8,["style"]))],8,KS),f("div",{class:xe(["absolute left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900/90 dark:bg-slate-800 text-white text-[10px] font-medium rounded-lg shadow-xl opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all duration-150 whitespace-nowrap z-50",r.value==="bottom"?"bottom-full mb-1.5":"top-full mt-1.5"])},F(Q.label)+" ("+F(Q.widthM)+"×"+F(Q.heightM)+"ม.) ",3)]))),128))])])]))],2),f("div",{ref_key:"canvasContainer",ref:n,class:xe(["w-full h-full relative cursor-grab active:cursor-grabbing overflow-auto transition-colors duration-300",k(e).isDark?"bg-slate-950 bg-dot-pattern":"bg-slate-50 bg-dot-pattern-light"]),onMousedown:st,onMousemove:Kr,onMouseup:ln,onMouseleave:ln,onTouchstart:I,onTouchmove:Ve,onTouchend:ln},[f("div",{class:"absolute origin-top-left transition-transform duration-75",style:tt({transform:`scale(${k(e).zoomLevel}) translate(${k(e).panOffset.x}px, ${k(e).panOffset.y}px)`,width:`${k(e).canvasWidthPx+100}px`,height:`${k(e).canvasHeightPx+100}px`})},[f("div",{class:"absolute border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl pointer-events-none flex flex-col justify-between p-4 bg-white/40 dark:bg-slate-900/30 shadow-xs",style:tt({left:"20px",top:"20px",width:`${k(e).canvasWidthPx}px`,height:`${k(e).canvasHeightPx}px`})},[f("div",GS,[f("span",QS," 📐 พื้นที่ตลาดรวม: "+F(k(e).marketWidthMeters)+" × "+F(k(e).marketHeightMeters)+" เมตร ("+F(k(e).totalMarketAreaSqM)+" ตร.ม.) ",1)]),f("div",YS,[O[15]||(O[15]=f("span",null,"0.0 ม.",-1)),f("span",null,"กว้าง "+F(k(e).marketWidthMeters/2)+" ม.",1),f("span",null,"กว้าง "+F(k(e).marketWidthMeters)+" ม.",1)])],4),(q(!0),ee(Qe,null,un(k(e).layoutObjects,Q=>{var x,S;return q(),ee("div",{key:Q.id,class:xe(["absolute rounded-2xl border-2 transition-all duration-200 cursor-move flex flex-col justify-between p-2 group shadow-sm backdrop-blur-xs",[k(e).selectedObjectId===Q.id?"ring-4 ring-indigo-500 border-indigo-500 z-20 shadow-xl scale-[1.02]":"border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 z-10",Q.type==="walkway"?"bg-slate-200/60 dark:bg-slate-800/60 border-dashed":"",Q.type==="entrance"?"bg-emerald-50/90 dark:bg-emerald-950/80 border-emerald-400":"",Q.type==="exit"?"bg-amber-50/90 dark:bg-amber-950/80 border-amber-400":"",Q.type==="restricted"?"bg-slate-300/80 dark:bg-slate-900/90 border-slate-400":"",Q.type==="facility"?"bg-sky-50/90 dark:bg-sky-950/80 border-sky-400":""]]),style:tt({left:`${Q.x+20}px`,top:`${Q.y+20}px`,width:`${Q.width}px`,height:`${Q.height}px`,transform:`rotate(${Q.rotation||0}deg)`}),onMousedown:vt(N=>zt(N,Q),["stop"]),onTouchstart:vt(N=>Dn(N,Q),["stop"]),onClick:vt(N=>k(e).selectLayoutObject(Q.id),["stop"])},[k(e).selectedObjectId===Q.id?(q(),ee(Qe,{key:0},[O[16]||(O[16]=f("div",{class:"absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-indigo-600 border-2 border-white rounded-full z-30 shadow-md animate-pulse"},null,-1)),O[17]||(O[17]=f("div",{class:"absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-indigo-600 border-2 border-white rounded-full z-30 shadow-md"},null,-1))],64)):we("",!0),f("div",XS,[(q(),ft(zs(w((x=Q.styleProps)==null?void 0:x.icon)),{class:"w-4 h-4 shrink-0",style:tt({color:(S=Q.styleProps)==null?void 0:S.color})},null,8,["style"])),f("span",ZS,F(Q.label),1)]),f("div",eC,[f("span",null,F(k(e).pxToM(Q.width))+"×"+F(k(e).pxToM(Q.height))+"ม.",1),Q.rotation?(q(),ee("span",tC,F(Q.rotation)+"°",1)):we("",!0)]),f("div",{class:xe(["absolute -bottom-2 -right-2 w-5 h-5 bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-900 rounded-full cursor-se-resize flex items-center justify-center shadow-md border-2 border-white dark:border-slate-900 transition-all duration-150 z-30",k(e).selectedObjectId===Q.id?"opacity-100 scale-110":"opacity-0 group-hover:opacity-100"]),title:"ปรับขนาด",onMousedown:vt(N=>an(N,Q),["stop"]),onTouchstart:vt(N=>Xe(N,Q),["stop"])},[...O[18]||(O[18]=[f("div",{class:"w-1.5 h-1.5 border-r-2 border-b-2 border-current"},null,-1)])],42,nC)],46,JS)}),128)),(q(!0),ee(Qe,null,un(k(e).stalls,Q=>{var x;return q(),ee("div",{key:Q.id,class:xe(["absolute rounded-2xl border-2 transition-all duration-200 shadow-sm hover:-translate-y-0.5 hover:shadow-xl cursor-move flex flex-col justify-between p-2.5 group backdrop-blur-xs",[k(e).selectedStallId===Q.id?"ring-4 ring-indigo-500/80 border-indigo-500 bg-indigo-50/90 dark:bg-indigo-950/80 z-20 shadow-xl scale-[1.02]":me(Q)]]),style:tt({left:`${Q.x+20}px`,top:`${Q.y+20}px`,width:`${Q.width}px`,height:`${Q.height}px`}),onMousedown:vt(S=>ye(S,Q),["stop"]),onTouchstart:vt(S=>ct(S,Q),["stop"]),onClick:vt(S=>k(e).selectStall(Q.id),["stop"])},[k(e).selectedStallId===Q.id?(q(),ee(Qe,{key:0},[O[19]||(O[19]=f("div",{class:"absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-indigo-600 border-2 border-white rounded-full z-30 shadow-md animate-pulse"},null,-1)),O[20]||(O[20]=f("div",{class:"absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-indigo-600 border-2 border-white rounded-full z-30 shadow-md"},null,-1)),O[21]||(O[21]=f("div",{class:"absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-indigo-600 border-2 border-white rounded-full z-30 shadow-md"},null,-1))],64)):we("",!0),f("div",{class:"h-1.5 w-full rounded-full mb-1 transition-transform group-hover:scale-x-105 shadow-xs",style:tt({backgroundColor:((x=k(e).getZoneById(Q.zoneId))==null?void 0:x.color)||"#94a3b8"})},null,4),f("div",rC,[f("span",iC,F(Q.stallNo),1),f("span",oC,F(k(e).pxToM(Q.width))+"×"+F(k(e).pxToM(Q.height))+"ม. ",1)]),f("div",aC,[f("span",{class:xe(["text-[10px] px-2 py-0.5 rounded-full font-bold border shadow-xs transition-colors",{"bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800":Q.status==="available","bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700":Q.status==="booked","bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800":Q.status==="disabled"}])},F(R(Q.status)),3),f("span",lC," ฿"+F(Q.price),1)]),f("div",{class:xe(["absolute -bottom-2 -right-2 w-6 h-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full cursor-se-resize flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-950 transition-all duration-150 z-30",k(e).selectedStallId===Q.id?"opacity-100 scale-110":"opacity-0 group-hover:opacity-100"]),title:"ลากเพื่อปรับขนาด (Resize)",onMousedown:vt(S=>Ae(S,Q),["stop"]),onTouchstart:vt(S=>$e(S,Q),["stop"])},[...O[22]||(O[22]=[f("div",{class:"w-2 h-2 border-r-2 border-b-2 border-white"},null,-1)])],42,cC)],46,sC)}),128))],4)],34),k(e).selectedStall?(q(),ee("div",uC,[f("div",dC,[f("span",{class:"w-3 h-3 rounded-full shadow-xs",style:tt({backgroundColor:(Se=k(e).getZoneById(k(e).selectedStall.zoneId))==null?void 0:Se.color})},null,4),f("span",hC,"แผง "+F(k(e).selectedStall.stallNo),1),f("span",fC,"("+F((Ze=k(e).getZoneById(k(e).selectedStall.zoneId))==null?void 0:Ze.name)+")",1)]),O[26]||(O[26]=f("div",{class:"h-4 w-px bg-slate-200 dark:bg-slate-800"},null,-1)),f("div",pC,[f("span",null,[O[23]||(O[23]=qe("กว้าง: ",-1)),f("strong",gC,F(Y.value.widthM)+" ม.",1)]),f("span",null,[O[24]||(O[24]=qe("ยาว: ",-1)),f("strong",mC,F(Y.value.heightM)+" ม.",1)]),f("span",null,[O[25]||(O[25]=qe("พื้นที่: ",-1)),f("strong",yC,F(Y.value.areaSqM)+" ตร.ม.",1)])]),O[27]||(O[27]=f("div",{class:"h-4 w-px bg-slate-200 dark:bg-slate-800"},null,-1)),f("div",_C,[f("button",{onClick:O[3]||(O[3]=Q=>j.$emit("open-editor")),class:"px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-150 shadow-sm shadow-indigo-200 dark:shadow-none active:scale-95"}," แก้ไขรายละเอียด "),f("button",{onClick:O[4]||(O[4]=Q=>k(e).removeStall(k(e).selectedStall.id)),class:"p-1.5 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 rounded-xl transition-all duration-150 hover:scale-105",title:"ลบแผงค้านี้"},[G(k(Cn),{class:"w-4 h-4"})])])])):we("",!0),k(e).selectedObject?(q(),ee("div",vC,[f("div",bC,[(q(),ft(zs(w((rt=k(e).selectedObject.styleProps)==null?void 0:rt.icon)),{class:"w-4 h-4 text-indigo-600 dark:text-indigo-400"})),f("span",wC,F(k(e).selectedObject.label),1)]),O[30]||(O[30]=f("div",{class:"h-4 w-px bg-slate-200 dark:bg-slate-800"},null,-1)),f("div",xC,[f("span",null,[O[28]||(O[28]=qe("ขนาด: ",-1)),f("strong",null,F(oe.value.widthM)+" × "+F(oe.value.heightM)+" ม.",1)]),f("span",null,[O[29]||(O[29]=qe("หมุน: ",-1)),f("strong",IC,F(k(e).selectedObject.rotation||0)+"°",1)])]),O[31]||(O[31]=f("div",{class:"h-4 w-px bg-slate-200 dark:bg-slate-800"},null,-1)),f("div",TC,[f("button",{onClick:O[5]||(O[5]=Q=>k(e).rotateLayoutObject(k(e).selectedObject.id)),class:"p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition-all duration-150",title:"หมุนวัตถุ 90°"},[G(k(qy),{class:"w-4 h-4 text-indigo-600 dark:text-indigo-400"})]),f("button",{onClick:O[6]||(O[6]=Q=>j.$emit("open-object-editor")),class:"px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-150 shadow-sm shadow-indigo-200 dark:shadow-none active:scale-95"}," แก้ไขวัตถุ "),f("button",{onClick:O[7]||(O[7]=Q=>k(e).removeLayoutObject(k(e).selectedObject.id)),class:"p-1.5 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 rounded-xl transition-all duration-150 hover:scale-105",title:"ลบวัตถุนี้"},[G(k(Cn),{class:"w-4 h-4"})])])])):we("",!0)])}}},kC={key:0,class:"fixed inset-y-0 right-0 z-40 w-full max-w-md bg-white border-l border-slate-200/90 shadow-2xl flex flex-col transition-transform text-slate-800"},AC={class:"px-6 py-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/80"},SC={class:"flex items-center gap-2"},CC={class:"text-base font-bold text-slate-900"},RC={class:"p-6 space-y-5 overflow-y-auto flex-1 text-xs sm:text-sm"},PC={class:"grid grid-cols-2 gap-4"},MC=["value"],OC={class:"grid grid-cols-2 gap-4"},NC={class:"bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3"},DC={class:"flex items-center justify-between"},VC={class:"text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5"},LC={class:"text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200"},FC={class:"grid grid-cols-2 gap-3"},$C={class:"relative"},UC={class:"relative"},jC={class:"relative"},BC={class:"relative"},zC={key:0,class:"bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2"},qC={class:"text-xs font-bold text-amber-900 flex items-center gap-1.5"},HC={key:0,class:"text-xs text-slate-700 space-y-1 font-medium"},WC={class:"text-[11px] text-slate-500"},KC={key:1,class:"text-xs text-slate-500 italic"},GC={class:"p-4 border-t border-slate-200/80 bg-slate-50/80 flex items-center justify-between gap-3"},QC={class:"flex items-center gap-2"},YC={__name:"StallEditorModal",props:{isOpen:Boolean,stallId:String},emits:["close"],setup(t,{emit:e}){const n=t,s=e,r=Nn(),i=Ee(null),o=Ee({stallNo:"",zoneId:"",price:0,status:"available",xM:0,yM:0,widthM:2.5,heightM:2,notes:"",bookedBy:null});ys(()=>n.stallId,m=>{if(m){const _=r.stalls.find(A=>A.id===m);if(_){i.value=_;const A=r.getStallMetrics(_);o.value={..._,widthM:A.widthM,heightM:A.heightM,xM:A.xM,yM:A.yM}}}else i.value=null},{immediate:!0});const l=Pt(()=>{const m=Number(o.value.widthM)||0,_=Number(o.value.heightM)||0;return Math.round(m*_*10)/10});function c(){const m=r.getZoneById(o.value.zoneId);m&&m.pricePerDay&&(o.value.price=m.pricePerDay)}function u(){i.value&&(r.updateStall(i.value.id,{...o.value}),r.showNotification(`แก้ไขแผง ${o.value.stallNo} แล้ว — กด "บันทึกผัง" เพื่อยืนยัน`,"warning"),s("close"))}function h(){i.value&&(r.removeStall(i.value.id),s("close"))}function g(){i.value&&(r.cancelBooking(i.value.id),o.value.status="available",o.value.bookedBy=null)}function y(m){if(!m)return"-";try{return new Date(m).toLocaleString("th-TH")}catch{return m}}return(m,_)=>t.isOpen&&i.value?(q(),ee("div",kC,[f("div",AC,[f("div",SC,[G(k(H2),{class:"w-5 h-5 text-indigo-600"}),f("h2",CC,"แก้ไขข้อมูลแผงค้า "+F(o.value.stallNo),1)]),f("button",{onClick:_[0]||(_[0]=A=>m.$emit("close")),class:"text-slate-400 hover:text-slate-700 p-1 rounded-lg transition"},[G(k(Ms),{class:"w-5 h-5"})])]),f("div",RC,[f("div",PC,[f("div",null,[_[11]||(_[11]=f("label",{class:"block text-xs font-semibold text-slate-700 mb-1"},"หมายเลขแผงค้า (Stall No.)",-1)),Ie(f("input",{"onUpdate:modelValue":_[1]||(_[1]=A=>o.value.stallNo=A),type:"text",class:"w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"},null,512),[[De,o.value.stallNo]])]),f("div",null,[_[12]||(_[12]=f("label",{class:"block text-xs font-semibold text-slate-700 mb-1"},"โซนสินค้า (Zone)",-1)),Ie(f("select",{"onUpdate:modelValue":_[2]||(_[2]=A=>o.value.zoneId=A),onChange:c,class:"w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"},[(q(!0),ee(Qe,null,un(k(r).zones,A=>(q(),ee("option",{key:A.id,value:A.id},F(A.name),9,MC))),128))],544),[[ba,o.value.zoneId]])])]),f("div",OC,[f("div",null,[_[13]||(_[13]=f("label",{class:"block text-xs font-semibold text-slate-700 mb-1"},"ราคาค่าเช่าต่อวัน (บาท)",-1)),Ie(f("input",{"onUpdate:modelValue":_[3]||(_[3]=A=>o.value.price=A),type:"number",class:"w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"},null,512),[[De,o.value.price,void 0,{number:!0}]])]),f("div",null,[_[15]||(_[15]=f("label",{class:"block text-xs font-semibold text-slate-700 mb-1"},"สถานะแผง (Status)",-1)),Ie(f("select",{"onUpdate:modelValue":_[4]||(_[4]=A=>o.value.status=A),class:"w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition font-medium"},[..._[14]||(_[14]=[f("option",{value:"available"},"🟢 ว่าง (Available)",-1),f("option",{value:"booked"},"🟠 จองแล้ว (Booked)",-1),f("option",{value:"disabled"},"🔴 ปิดใช้งาน (Disabled)",-1)])],512),[[ba,o.value.status]])])]),f("div",NC,[f("div",DC,[f("h3",VC,[G(k(wo),{class:"w-3.5 h-3.5 text-indigo-600"}),_[16]||(_[16]=f("span",null,"ขนาดแผงค้าจริง (หน่วย: เมตร)",-1))]),f("span",LC,F(l.value)+" ตร.ม. ",1)]),f("div",FC,[f("div",null,[_[18]||(_[18]=f("label",{class:"block text-[11px] text-slate-500 font-medium mb-1"},"ความกว้าง W (เมตร)",-1)),f("div",$C,[Ie(f("input",{"onUpdate:modelValue":_[5]||(_[5]=A=>o.value.widthM=A),type:"number",step:"0.1",min:"0.5",class:"w-full bg-white border border-slate-200 rounded-xl pl-3 pr-7 py-1.5 text-slate-900 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"},null,512),[[De,o.value.widthM,void 0,{number:!0}]]),_[17]||(_[17]=f("span",{class:"absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400"},"ม.",-1))])]),f("div",null,[_[20]||(_[20]=f("label",{class:"block text-[11px] text-slate-500 font-medium mb-1"},"ความยาว H (เมตร)",-1)),f("div",UC,[Ie(f("input",{"onUpdate:modelValue":_[6]||(_[6]=A=>o.value.heightM=A),type:"number",step:"0.1",min:"0.5",class:"w-full bg-white border border-slate-200 rounded-xl pl-3 pr-7 py-1.5 text-slate-900 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"},null,512),[[De,o.value.heightM,void 0,{number:!0}]]),_[19]||(_[19]=f("span",{class:"absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400"},"ม.",-1))])]),f("div",null,[_[22]||(_[22]=f("label",{class:"block text-[11px] text-slate-500 font-medium mb-1"},"พิกัดแนวนอน X (เมตร)",-1)),f("div",jC,[Ie(f("input",{"onUpdate:modelValue":_[7]||(_[7]=A=>o.value.xM=A),type:"number",step:"0.5",class:"w-full bg-white border border-slate-200 rounded-xl pl-3 pr-7 py-1.5 text-slate-900 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"},null,512),[[De,o.value.xM,void 0,{number:!0}]]),_[21]||(_[21]=f("span",{class:"absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400"},"ม.",-1))])]),f("div",null,[_[24]||(_[24]=f("label",{class:"block text-[11px] text-slate-500 font-medium mb-1"},"พิกัดแนวตั้ง Y (เมตร)",-1)),f("div",BC,[Ie(f("input",{"onUpdate:modelValue":_[8]||(_[8]=A=>o.value.yM=A),type:"number",step:"0.5",class:"w-full bg-white border border-slate-200 rounded-xl pl-3 pr-7 py-1.5 text-slate-900 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"},null,512),[[De,o.value.yM,void 0,{number:!0}]]),_[23]||(_[23]=f("span",{class:"absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400"},"ม.",-1))])])])]),f("div",null,[_[25]||(_[25]=f("label",{class:"block text-xs font-semibold text-slate-700 mb-1"},"หมายเหตุเพิ่มเติม",-1)),Ie(f("textarea",{"onUpdate:modelValue":_[9]||(_[9]=A=>o.value.notes=A),rows:"2",placeholder:"เช่น มีเต้ารับไฟฟ้า 15A / ติดทางเดินหลัก",class:"w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"},null,512),[[De,o.value.notes]])]),o.value.status==="booked"?(q(),ee("div",zC,[f("h4",qC,[G(k(G2),{class:"w-4 h-4 text-amber-600"}),_[26]||(_[26]=f("span",null,"ข้อมูลผู้จอง",-1))]),o.value.bookedBy?(q(),ee("div",HC,[f("p",null,[_[27]||(_[27]=f("strong",null,"ชื่อผู้จอง:",-1)),qe(" "+F(o.value.bookedBy.name),1)]),f("p",null,[_[28]||(_[28]=f("strong",null,"เบอร์โทรศัพท์:",-1)),qe(" "+F(o.value.bookedBy.phone),1)]),f("p",null,[_[29]||(_[29]=f("strong",null,"ประเภทสินค้า:",-1)),qe(" "+F(o.value.bookedBy.goodsType||"ไม่ระบุ"),1)]),f("p",WC,[_[30]||(_[30]=f("strong",null,"เวลาที่จอง:",-1)),qe(" "+F(y(o.value.bookedBy.bookedAt)),1)])])):(q(),ee("div",KC,"ไม่มีข้อมูลผู้จอง")),f("button",{onClick:g,class:"w-full mt-2 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg text-xs transition shadow-sm"}," ยกเลิกการจองแผงนี้ ")])):we("",!0)]),f("div",GC,[f("button",{onClick:h,class:"px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-semibold text-xs transition flex items-center gap-1"},[G(k(Cn),{class:"w-4 h-4"}),_[31]||(_[31]=f("span",null,"ลบแผงค้า",-1))]),f("div",QC,[f("button",{onClick:_[10]||(_[10]=A=>m.$emit("close")),class:"px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition"}," ยกเลิก "),f("button",{onClick:u,class:"px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-200 transition flex items-center gap-1.5 active:scale-95"},[G(k(kd),{class:"w-4 h-4"}),_[32]||(_[32]=f("span",null,"บันทึกการปรับเปลี่ยน",-1))])])])])):we("",!0)}},JC={key:0,class:"fixed inset-y-0 right-0 z-40 w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col transition-transform text-slate-800 dark:text-slate-100"},XC={class:"px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/90"},ZC={class:"flex items-center gap-2"},eR={class:"text-base font-bold text-slate-900 dark:text-white"},tR={class:"p-6 space-y-5 overflow-y-auto flex-1 text-xs sm:text-sm"},nR={class:"grid grid-cols-2 gap-4"},sR={class:"flex items-center gap-2"},rR={class:"text-xs font-mono font-bold text-slate-700 dark:text-slate-300"},iR={class:"bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 space-y-3"},oR={class:"flex items-center justify-between"},aR={class:"text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5"},lR={class:"text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800"},cR={class:"grid grid-cols-2 gap-3"},uR={class:"relative"},dR={class:"relative"},hR={class:"relative"},fR={class:"relative"},pR={class:"p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-center justify-between gap-3"},gR={class:"flex items-center gap-2"},mR={__name:"ObjectEditorModal",props:{isOpen:Boolean,objectId:String},emits:["close"],setup(t,{emit:e}){const n=t,s=e,r=Nn(),i=Ee(null),o=Ee({label:"",rotation:0,color:"#6366f1",widthM:3,heightM:2,xM:0,yM:0});ys(()=>n.objectId,y=>{var m;if(y){const _=r.layoutObjects.find(A=>A.id===y);if(_){i.value=_;const A=r.getObjectMetrics(_);o.value={label:_.label,rotation:_.rotation||0,color:((m=_.styleProps)==null?void 0:m.color)||"#6366f1",widthM:A.widthM,heightM:A.heightM,xM:A.xM,yM:A.yM}}}else i.value=null},{immediate:!0});const l=Pt(()=>{const y=Number(o.value.widthM)||0,m=Number(o.value.heightM)||0;return Math.round(y*m*10)/10});function c(){o.value.rotation=(o.value.rotation+90)%360}function u(){i.value&&(r.updateLayoutObject(i.value.id,{label:o.value.label,rotation:o.value.rotation,widthM:o.value.widthM,heightM:o.value.heightM,xM:o.value.xM,yM:o.value.yM,styleProps:{...i.value.styleProps,color:o.value.color}}),r.showNotification(`แก้ไขวัตถุ ${o.value.label} แล้ว`,"success"),s("close"))}function h(){i.value&&(r.removeLayoutObject(i.value.id),s("close"))}function g(y){switch(y){case"door-open":return za;case"log-out":return Rd;case"footprints":return Cd;case"bath":return Ed;case"mic":return Pd;case"trash-2":return Cn;case"credit-card":return Ad;case"help-circle":return Ba;case"cross":return Sd;default:return qa}}return(y,m)=>{var _;return t.isOpen&&i.value?(q(),ee("div",JC,[f("div",XC,[f("div",ZC,[(q(),ft(zs(g((_=i.value.styleProps)==null?void 0:_.icon)),{class:"w-5 h-5 text-indigo-600 dark:text-indigo-400"})),f("h2",eR,"แก้ไขโครงสร้าง: "+F(o.value.label),1)]),f("button",{onClick:m[0]||(m[0]=A=>y.$emit("close")),class:"text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg transition"},[G(k(Ms),{class:"w-5 h-5"})])]),f("div",tR,[f("div",null,[m[8]||(m[8]=f("label",{class:"block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"},"ชื่อเรียก / ข้อความระบุบนผัง",-1)),Ie(f("input",{"onUpdate:modelValue":m[1]||(m[1]=A=>o.value.label=A),type:"text",placeholder:"เช่น ทางเข้าหลัก A / ห้องน้ำสาธารณะ",class:"w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"},null,512),[[De,o.value.label]])]),f("div",nR,[f("div",null,[m[9]||(m[9]=f("label",{class:"block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"},"หมุนทิศทาง (Rotation)",-1)),f("button",{type:"button",onClick:c,class:"w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-semibold flex items-center justify-center gap-2 transition"},[G(k(qy),{class:"w-4 h-4 text-indigo-600 dark:text-indigo-400"}),f("span",null,F(o.value.rotation)+"° องศา",1)])]),f("div",null,[m[10]||(m[10]=f("label",{class:"block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"},"สีประจำวัตถุ (Color)",-1)),f("div",sR,[Ie(f("input",{"onUpdate:modelValue":m[2]||(m[2]=A=>o.value.color=A),type:"color",class:"w-10 h-9 rounded-xl bg-transparent cursor-pointer border border-slate-200 dark:border-slate-700 p-0.5"},null,512),[[De,o.value.color]]),f("span",rR,F(o.value.color),1)])])]),f("div",iR,[f("div",oR,[f("h3",aR,[G(k(wo),{class:"w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400"}),m[11]||(m[11]=f("span",null,"ขนาดวัตถุจริง (หน่วย: เมตร)",-1))]),f("span",lR,F(l.value)+" ตร.ม. ",1)]),f("div",cR,[f("div",null,[m[13]||(m[13]=f("label",{class:"block text-[11px] text-slate-500 dark:text-slate-400 font-medium mb-1"},"ความกว้าง W (เมตร)",-1)),f("div",uR,[Ie(f("input",{"onUpdate:modelValue":m[3]||(m[3]=A=>o.value.widthM=A),type:"number",step:"0.1",min:"0.5",class:"w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-3 pr-7 py-1.5 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"},null,512),[[De,o.value.widthM,void 0,{number:!0}]]),m[12]||(m[12]=f("span",{class:"absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400"},"ม.",-1))])]),f("div",null,[m[15]||(m[15]=f("label",{class:"block text-[11px] text-slate-500 dark:text-slate-400 font-medium mb-1"},"ความยาว H (เมตร)",-1)),f("div",dR,[Ie(f("input",{"onUpdate:modelValue":m[4]||(m[4]=A=>o.value.heightM=A),type:"number",step:"0.1",min:"0.5",class:"w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-3 pr-7 py-1.5 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"},null,512),[[De,o.value.heightM,void 0,{number:!0}]]),m[14]||(m[14]=f("span",{class:"absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400"},"ม.",-1))])]),f("div",null,[m[17]||(m[17]=f("label",{class:"block text-[11px] text-slate-500 dark:text-slate-400 font-medium mb-1"},"พิกัดแนวนอน X (เมตร)",-1)),f("div",hR,[Ie(f("input",{"onUpdate:modelValue":m[5]||(m[5]=A=>o.value.xM=A),type:"number",step:"0.5",class:"w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-3 pr-7 py-1.5 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"},null,512),[[De,o.value.xM,void 0,{number:!0}]]),m[16]||(m[16]=f("span",{class:"absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400"},"ม.",-1))])]),f("div",null,[m[19]||(m[19]=f("label",{class:"block text-[11px] text-slate-500 dark:text-slate-400 font-medium mb-1"},"พิกัดแนวตั้ง Y (เมตร)",-1)),f("div",fR,[Ie(f("input",{"onUpdate:modelValue":m[6]||(m[6]=A=>o.value.yM=A),type:"number",step:"0.5",class:"w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-3 pr-7 py-1.5 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"},null,512),[[De,o.value.yM,void 0,{number:!0}]]),m[18]||(m[18]=f("span",{class:"absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400"},"ม.",-1))])])])])]),f("div",pR,[f("button",{onClick:h,class:"px-3 py-2 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800 rounded-xl font-semibold text-xs transition flex items-center gap-1"},[G(k(Cn),{class:"w-4 h-4"}),m[20]||(m[20]=f("span",null,"ลบวัตถุนี้",-1))]),f("div",gR,[f("button",{onClick:m[7]||(m[7]=A=>y.$emit("close")),class:"px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold text-xs transition"}," ยกเลิก "),f("button",{onClick:u,class:"px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-200 dark:shadow-none transition flex items-center gap-1.5 active:scale-95"},[G(k(kd),{class:"w-4 h-4"}),m[21]||(m[21]=f("span",null,"บันทึกวัตถุ",-1))])])])])):we("",!0)}}},yR={key:0,class:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"},_R={class:"bg-white border border-slate-200/80 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-800"},vR={class:"px-6 py-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/80"},bR={class:"flex items-center gap-2"},wR={class:"p-6 space-y-6 overflow-y-auto flex-1"},xR={class:"bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3"},IR={class:"grid grid-cols-1 sm:grid-cols-3 gap-3"},TR={class:"sm:col-span-2"},ER={class:"flex items-center justify-between pt-1"},kR={class:"flex items-center gap-2"},AR={class:"text-xs font-mono text-slate-700 font-semibold"},SR={class:"space-y-3"},CR={class:"flex items-center gap-3"},RR=["onUpdate:modelValue","onChange"],PR=["onUpdate:modelValue","onBlur"],MR={class:"text-[10px] text-slate-500 font-medium"},OR={class:"flex items-center gap-2"},NR=["onUpdate:modelValue","onBlur"],DR=["onClick"],VR={class:"px-6 py-4 border-t border-slate-200/80 bg-slate-50/80 flex justify-end"},LR={__name:"ZoneManagerModal",props:{isOpen:Boolean},emits:["close"],setup(t){const e=Nn(),n=Ee({name:"",color:"#4f46e5",pricePerDay:400});function s(){n.value.name.trim()&&(e.addZone({...n.value}),n.value={name:"",color:"#4f46e5",pricePerDay:400})}return(r,i)=>t.isOpen?(q(),ee("div",yR,[f("div",_R,[f("div",vR,[f("div",bR,[G(k(zy),{class:"w-5 h-5 text-purple-600"}),i[5]||(i[5]=f("h2",{class:"text-base font-bold text-slate-900"},"จัดการโซนสินค้าและราคาเริ่มต้น",-1))]),f("button",{onClick:i[0]||(i[0]=o=>r.$emit("close")),class:"text-slate-400 hover:text-slate-700 p-1 rounded-lg transition"},[G(k(Ms),{class:"w-5 h-5"})])]),f("div",wR,[f("div",xR,[i[10]||(i[10]=f("h3",{class:"text-xs font-bold text-slate-700 uppercase tracking-wider"},"เพิ่มโซนสินค้าใหม่",-1)),f("div",IR,[f("div",TR,[i[6]||(i[6]=f("label",{class:"block text-[11px] font-semibold text-slate-600 mb-1"},"ชื่อโซน",-1)),Ie(f("input",{"onUpdate:modelValue":i[1]||(i[1]=o=>n.value.name=o),type:"text",placeholder:"เช่น โซนต้นไม้ / ของแต่งบ้าน",class:"w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none transition"},null,512),[[De,n.value.name]])]),f("div",null,[i[7]||(i[7]=f("label",{class:"block text-[11px] font-semibold text-slate-600 mb-1"},"ราคา/วัน (฿)",-1)),Ie(f("input",{"onUpdate:modelValue":i[2]||(i[2]=o=>n.value.pricePerDay=o),type:"number",class:"w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900 text-xs font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none transition"},null,512),[[De,n.value.pricePerDay,void 0,{number:!0}]])])]),f("div",ER,[f("div",kR,[i[8]||(i[8]=f("label",{class:"text-[11px] text-slate-600 font-medium"},"สีประจำโซน:",-1)),Ie(f("input",{"onUpdate:modelValue":i[3]||(i[3]=o=>n.value.color=o),type:"color",class:"w-8 h-8 rounded-lg bg-transparent cursor-pointer border border-slate-200"},null,512),[[De,n.value.color]]),f("span",AR,F(n.value.color),1)]),f("button",{onClick:s,class:"px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-200 transition flex items-center gap-1 active:scale-95"},[G(k(Md),{class:"w-3.5 h-3.5"}),i[9]||(i[9]=f("span",null,"เพิ่มโซน",-1))])])]),f("div",SR,[i[11]||(i[11]=f("h3",{class:"text-xs font-bold text-slate-700 uppercase tracking-wider"},"รายการโซนปัจจุบัน",-1)),(q(!0),ee(Qe,null,un(k(e).zones,o=>(q(),ee("div",{key:o.id,class:"bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-xs"},[f("div",CR,[Ie(f("input",{type:"color","onUpdate:modelValue":l=>o.color=l,onChange:l=>k(e).updateZone(o.id,{color:o.color}),class:"w-7 h-7 rounded-lg bg-transparent cursor-pointer border border-slate-200"},null,40,RR),[[De,o.color]]),f("div",null,[Ie(f("input",{type:"text","onUpdate:modelValue":l=>o.name=l,onBlur:l=>k(e).updateZone(o.id,{name:o.name}),class:"bg-transparent text-slate-900 font-bold text-xs border-b border-transparent focus:border-purple-500 focus:outline-none"},null,40,PR),[[De,o.name]]),f("div",MR," ราคาแนะนำ: ฿"+F(o.pricePerDay)+"/วัน ",1)])]),f("div",OR,[Ie(f("input",{type:"number","onUpdate:modelValue":l=>o.pricePerDay=l,onBlur:l=>k(e).updateZone(o.id,{pricePerDay:o.pricePerDay}),class:"w-20 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-900 text-xs font-mono font-semibold"},null,40,NR),[[De,o.pricePerDay,void 0,{number:!0}]]),f("button",{onClick:l=>k(e).removeZone(o.id),class:"p-1 text-slate-400 hover:text-rose-600 rounded-lg transition",title:"ลบโซน"},[G(k(Cn),{class:"w-4 h-4"})],8,DR)])]))),128))])]),f("div",VR,[f("button",{onClick:i[4]||(i[4]=o=>r.$emit("close")),class:"px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"}," ปิดหน้าต่าง ")])])])):we("",!0)}},FR={key:0,class:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"},$R={class:"bg-white border border-slate-200/80 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col text-slate-800"},UR={class:"px-6 py-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/80"},jR={class:"flex items-center gap-2"},BR={class:"grid grid-cols-2 gap-4"},zR={class:"relative"},qR={class:"relative"},HR={class:"bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between"},WR={class:"flex items-center gap-3"},KR={class:"text-base font-bold text-slate-900 font-mono"},GR={class:"pt-2 flex items-center justify-end gap-3"},QR={type:"submit",class:"px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-200 transition flex items-center gap-1.5 active:scale-95"},YR={__name:"MarketSettingsModal",props:{isOpen:Boolean},emits:["close"],setup(t,{emit:e}){const n=t,s=e,r=Nn(),i=Ee({name:"",widthMeters:30,heightMeters:20,gridSnapMeters:.5});ys(()=>n.isOpen,c=>{c&&(i.value={name:r.marketName,widthMeters:r.marketWidthMeters,heightMeters:r.marketHeightMeters,gridSnapMeters:r.gridSnapMeters})},{immediate:!0});const o=Pt(()=>{const c=Number(i.value.widthMeters)||0,u=Number(i.value.heightMeters)||0;return(c*u).toLocaleString("th-TH")});function l(){r.updateMarketDimensions({...i.value}),s("close")}return(c,u)=>t.isOpen?(q(),ee("div",FR,[f("div",$R,[f("div",UR,[f("div",jR,[G(k(wo),{class:"w-5 h-5 text-indigo-600"}),u[6]||(u[6]=f("h2",{class:"text-base font-bold text-slate-900"},"ตั้งค่าขนาดและพื้นที่ตลาดรวม (เมตร / ตร.ม.)",-1))]),f("button",{onClick:u[0]||(u[0]=h=>c.$emit("close")),class:"text-slate-400 hover:text-slate-700 p-1 rounded-lg transition"},[G(k(Ms),{class:"w-5 h-5"})])]),f("form",{onSubmit:vt(l,["prevent"]),class:"p-6 space-y-5 text-xs sm:text-sm"},[f("div",null,[u[7]||(u[7]=f("label",{class:"block text-xs font-semibold text-slate-700 mb-1"},"ชื่อผังตลาด",-1)),Ie(f("input",{"onUpdate:modelValue":u[1]||(u[1]=h=>i.value.name=h),type:"text",required:"",class:"w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"},null,512),[[De,i.value.name]])]),f("div",BR,[f("div",null,[u[9]||(u[9]=f("label",{class:"block text-xs font-semibold text-slate-700 mb-1"},[qe(" ความกว้างตลาดรวม (เมตร) "),f("span",{class:"text-rose-500"},"*")],-1)),f("div",zR,[Ie(f("input",{"onUpdate:modelValue":u[2]||(u[2]=h=>i.value.widthMeters=h),type:"number",step:"0.5",min:"5",max:"200",required:"",class:"w-full bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-slate-900 font-mono focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"},null,512),[[De,i.value.widthMeters,void 0,{number:!0}]]),u[8]||(u[8]=f("span",{class:"absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium"},"ม.",-1))])]),f("div",null,[u[11]||(u[11]=f("label",{class:"block text-xs font-semibold text-slate-700 mb-1"},[qe(" ความยาว/ลึกรวม (เมตร) "),f("span",{class:"text-rose-500"},"*")],-1)),f("div",qR,[Ie(f("input",{"onUpdate:modelValue":u[3]||(u[3]=h=>i.value.heightMeters=h),type:"number",step:"0.5",min:"5",max:"200",required:"",class:"w-full bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-slate-900 font-mono focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"},null,512),[[De,i.value.heightMeters,void 0,{number:!0}]]),u[10]||(u[10]=f("span",{class:"absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium"},"ม.",-1))])])]),f("div",HR,[f("div",WR,[u[14]||(u[14]=f("div",{class:"w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 font-bold"}," ㎡ ",-1)),f("div",null,[u[13]||(u[13]=f("div",{class:"text-xs text-slate-500 font-medium"},"พื้นที่รวมผังตลาดทั้งหมด",-1)),f("div",KR,[qe(F(o.value)+" ",1),u[12]||(u[12]=f("span",{class:"text-xs font-normal text-slate-500"},"ตารางเมตร (ตร.ม.)",-1))])])]),u[15]||(u[15]=f("div",{class:"text-right text-[11px] text-slate-400 font-mono"}," 1 เมตร = 40px ",-1))]),f("div",null,[u[17]||(u[17]=f("label",{class:"block text-xs font-semibold text-slate-700 mb-1"},"ความละเอียดระยะกะ Snap (เมตร)",-1)),Ie(f("select",{"onUpdate:modelValue":u[4]||(u[4]=h=>i.value.gridSnapMeters=h),class:"w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"},[...u[16]||(u[16]=[f("option",{value:.25},"0.25 เมตร (25 เซนติเมตร - ละเอียดมาก)",-1),f("option",{value:.5},"0.50 เมตร (50 เซนติเมตร - แนะนำ)",-1),f("option",{value:1},"1.00 เมตร (1 เมตร - ผังใหญ่)",-1)])],512),[[ba,i.value.gridSnapMeters,void 0,{number:!0}]])]),f("div",GR,[f("button",{type:"button",onClick:u[5]||(u[5]=h=>c.$emit("close")),class:"px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"}," ยกเลิก "),f("button",QR,[G(k(kd),{class:"w-4 h-4"}),u[18]||(u[18]=f("span",null,"ปรับขนาดตลาด",-1))])])],32)])])):we("",!0)}},JR={class:"flex flex-col h-[calc(100vh-112px)] bg-slate-50 dark:bg-slate-950 select-none transition-colors duration-300"},XR={class:"glass-panel dark:glass-panel-dark border-b border-slate-200/80 dark:border-slate-800/80 p-3 sm:p-4 sticky top-0 z-20 shadow-xs transition-colors duration-300"},ZR={class:"max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3"},eP={class:"relative flex-1 min-w-[180px]"},tP={class:"flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none"},nP=["onClick"],sP={class:"flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-800"},rP={class:"text-right text-xs text-slate-500 dark:text-slate-400 font-mono font-medium"},iP=["onClick"],oP={class:"flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-100"},aP={class:"truncate tracking-tight text-[11px]"},lP=["onClick"],cP={class:"flex items-center justify-between leading-relaxed"},uP={class:"text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-mono tracking-tight drop-shadow-xs pt-0.5"},dP={class:"my-1"},hP={class:"text-[10px] px-1.5 py-0.5 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-mono font-semibold shadow-xs"},fP={class:"flex items-center justify-between mt-auto"},pP={class:"text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[80px]"},gP={key:0,class:"text-[10px] font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5"},mP={key:1,class:"text-[10px] text-slate-400 dark:text-slate-500 font-semibold"},yP={key:2,class:"text-[10px] text-rose-500 dark:text-rose-400 font-semibold"},_P={key:0,class:"bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 fixed bottom-0 inset-x-0 z-40 shadow-2xl animate-slide-up rounded-t-3xl sm:rounded-none text-slate-800 dark:text-slate-100"},vP={class:"max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4"},bP={class:"flex items-start sm:items-center gap-3"},wP={class:"space-y-1"},xP={class:"flex flex-wrap items-center gap-2"},IP={class:"text-sm font-bold text-slate-900 dark:text-white"},TP={class:"text-[11px] px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 font-medium"},EP={class:"text-[11px] px-2.5 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-lg border border-indigo-200 dark:border-indigo-800 font-mono font-semibold"},kP={class:"text-xs text-slate-500 dark:text-slate-400 font-medium"},AP={class:"text-emerald-700 dark:text-emerald-400 font-mono text-sm font-bold"},SP={key:0,class:"ml-2 text-slate-500 dark:text-slate-400 font-normal"},CP={class:"flex items-center justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-800"},RP={key:1,class:"text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium"},PP={__name:"CustomerStallMap",emits:["open-booking-modal"],setup(t,{emit:e}){const n=Nn(),s=Ee(null),r=Pt(()=>n.stalls.find(h=>h.id===s.value)),i=Pt(()=>n.getStallMetrics(r.value));function o(h){s.value=h.id}function l(h){n.showNotification(`📍 ${h.label}`,"info")}function c(h){return h.status==="booked"?"bg-slate-100/90 dark:bg-slate-900/90 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 opacity-75 cursor-not-allowed":h.status==="disabled"?"bg-slate-200/60 dark:bg-slate-800/60 text-slate-400 border-slate-300 dark:border-slate-700 opacity-50 cursor-not-allowed":"bg-emerald-50/90 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border-emerald-300/90 dark:border-emerald-800 hover:border-emerald-500 hover:bg-emerald-100/80 shadow-xs"}function u(h){switch(h){case"door-open":return za;case"log-out":return Rd;case"footprints":return Cd;case"bath":return Ed;case"mic":return Pd;case"trash-2":return Cn;case"credit-card":return Ad;case"help-circle":return Ba;case"cross":return Sd;default:return qa}}return(h,g)=>{var y,m;return q(),ee("div",JR,[f("div",XR,[f("div",ZR,[f("div",eP,[G(k(B2),{class:"w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"}),Ie(f("input",{"onUpdate:modelValue":g[0]||(g[0]=_=>k(n).searchQuery=_),type:"text",placeholder:"ค้นหาหมายเลขแผงค้า (เช่น A01, B02)...",class:"w-full bg-slate-100/90 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 focus:outline-none transition-all shadow-inner"},null,512),[[De,k(n).searchQuery]])]),f("div",tP,[f("button",{onClick:g[1]||(g[1]=_=>k(n).filterZoneId="all"),class:xe(["px-3.5 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-150",k(n).filterZoneId==="all"?"bg-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-none":"bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"])}," ทุกโซนสินค้า ",2),(q(!0),ee(Qe,null,un(k(n).zones,_=>(q(),ee("button",{key:_.id,onClick:A=>k(n).filterZoneId=_.id,class:xe(["px-3.5 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 border",k(n).filterZoneId===_.id?"bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-xs":"bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"])},[f("span",{class:"w-2 h-2 rounded-full",style:tt({backgroundColor:_.color})},null,4),f("span",null,F(_.name),1)],10,nP))),128))]),f("div",sP,[f("button",{onClick:g[2]||(g[2]=_=>k(n).filterStatus="all"),class:xe(["px-3 py-1 rounded-xl text-xs font-semibold transition-all",k(n).filterStatus==="all"?"bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs":"text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"])}," ทั้งหมด ",2),f("button",{onClick:g[3]||(g[3]=_=>k(n).filterStatus="available"),class:xe(["px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5",k(n).filterStatus==="available"?"bg-emerald-600 text-white shadow-xs":"text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"])},[...g[6]||(g[6]=[f("span",{class:"w-1.5 h-1.5 rounded-full bg-emerald-300"},null,-1),f("span",null,"เฉพาะว่าง",-1)])],2)])])]),f("div",{class:xe(["flex-1 relative overflow-auto p-4 sm:p-6 transition-colors duration-300",k(n).isDark?"bg-slate-950 bg-dot-pattern":"bg-slate-50 bg-dot-pattern-light"])},[f("div",{class:"relative mx-auto scale-90 origin-top-left sm:scale-100",style:tt({width:`${k(n).canvasWidthPx+60}px`,height:`${k(n).canvasHeightPx+60}px`})},[g[8]||(g[8]=Yg('<div class="absolute top-4 left-4 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 p-3 rounded-2xl shadow-md flex items-center gap-4 text-xs text-slate-700 dark:text-slate-300"><div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-lg bg-emerald-500 border border-emerald-400"></span><span class="font-semibold">ว่าง (แตะเพื่อจอง)</span></div><div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"></span><span class="font-medium">ถูกจองแล้ว</span></div><div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-lg bg-rose-100 dark:bg-rose-950 border border-rose-200 dark:border-rose-800"></span><span class="text-rose-600 dark:text-rose-400 font-medium">ปิดให้บริการ</span></div></div>',1)),f("div",{class:"absolute border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl pointer-events-none p-4 bg-white/40 dark:bg-slate-900/30 shadow-xs",style:tt({left:"10px",top:"10px",width:`${k(n).canvasWidthPx}px`,height:`${k(n).canvasHeightPx}px`})},[f("div",rP," ขนาดผังตลาด: "+F(k(n).marketWidthMeters)+" × "+F(k(n).marketHeightMeters)+" ม. ("+F(k(n).totalMarketAreaSqM)+" ตร.ม.) ",1)],4),(q(!0),ee(Qe,null,un(k(n).layoutObjects,_=>{var A,M;return q(),ee("div",{key:_.id,class:xe(["absolute rounded-2xl border transition-all pointer-events-auto flex items-center justify-center p-2 shadow-xs backdrop-blur-xs",[_.type==="walkway"?"bg-slate-200/50 dark:bg-slate-800/50 border-dashed border-slate-300 dark:border-slate-700":"",_.type==="entrance"?"bg-emerald-50/90 dark:bg-emerald-950/80 border-emerald-400/80":"",_.type==="exit"?"bg-amber-50/90 dark:bg-amber-950/80 border-amber-400/80":"",_.type==="restricted"?"bg-slate-200/80 dark:bg-slate-900/90 border-slate-300 dark:border-slate-700":"",_.type==="facility"?"bg-sky-50/90 dark:bg-sky-950/80 border-sky-400/80":""]]),style:tt({left:`${_.x+10}px`,top:`${_.y+10}px`,width:`${_.width}px`,height:`${_.height}px`,transform:`rotate(${_.rotation||0}deg)`}),onClick:W=>l(_)},[f("div",oP,[(q(),ft(zs(u((A=_.styleProps)==null?void 0:A.icon)),{class:"w-4 h-4 shrink-0",style:tt({color:(M=_.styleProps)==null?void 0:M.color})},null,8,["style"])),f("span",aP,F(_.label),1)])],14,iP)}),128)),(q(!0),ee(Qe,null,un(k(n).filteredStalls,_=>{var A,M;return q(),ee("div",{key:_.id,class:xe(["absolute rounded-2xl border-2 transition-all duration-200 shadow-xs hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col justify-between p-2.5 group backdrop-blur-xs",[s.value===_.id?"ring-4 ring-indigo-600 border-indigo-500 bg-indigo-50/90 dark:bg-indigo-950/90 scale-105 z-20 shadow-xl":c(_)]]),style:tt({left:`${_.x+10}px`,top:`${_.y+10}px`,width:`${_.width}px`,height:`${_.height}px`}),onClick:W=>o(_)},[f("div",{class:"h-1.5 w-full rounded-full mb-1 transition-transform group-hover:scale-x-105 shadow-xs",style:tt({backgroundColor:(A=k(n).getZoneById(_.zoneId))==null?void 0:A.color})},null,4),f("div",cP,[f("span",uP,F(_.stallNo),1),f("span",{class:xe(["text-[10px] px-2 py-0.5 rounded-full font-mono font-bold transition-transform group-hover:scale-105 shadow-xs",_.status==="available"?"bg-emerald-600 text-white":"bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300"])}," ฿"+F(_.price),3)]),f("div",dP,[f("span",hP,F(k(n).pxToM(_.width))+"×"+F(k(n).pxToM(_.height))+" ม. ",1)]),f("div",fP,[f("span",pP,F((M=k(n).getZoneById(_.zoneId))==null?void 0:M.name),1),_.status==="available"?(q(),ee("span",gP,[g[7]||(g[7]=qe(" จองแผง ",-1)),G(k(R2),{class:"w-3 h-3"})])):_.status==="booked"?(q(),ee("span",mP," จองแล้ว ")):_.status==="disabled"?(q(),ee("span",yP," ปิดบริการ ")):we("",!0)])],14,lP)}),128))],4)],2),r.value?(q(),ee("div",_P,[f("div",vP,[f("div",bP,[f("div",{class:"w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-white text-base shadow-md font-mono shrink-0",style:tt({backgroundColor:(y=k(n).getZoneById(r.value.zoneId))==null?void 0:y.color})},F(r.value.stallNo),5),f("div",wP,[f("div",xP,[f("h3",IP,"แผงค้า "+F(r.value.stallNo),1),f("span",TP,F((m=k(n).getZoneById(r.value.zoneId))==null?void 0:m.name),1),f("span",EP," ขนาด "+F(i.value.widthM)+" × "+F(i.value.heightM)+" ม. ("+F(i.value.areaSqM)+" ตร.ม.) ",1)]),f("p",kP,[g[9]||(g[9]=qe(" อัตราค่าเช่า: ",-1)),f("strong",AP,"฿"+F(r.value.price),1),g[10]||(g[10]=qe(" / วัน ",-1)),r.value.notes?(q(),ee("span",SP,"("+F(r.value.notes)+")",1)):we("",!0)])])]),f("div",CP,[f("button",{onClick:g[4]||(g[4]=_=>s.value=null),class:"px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition sm:hidden"}," ปิด "),r.value.status==="available"?(q(),ee("button",{key:0,onClick:g[5]||(g[5]=_=>h.$emit("open-booking-modal",r.value)),class:"w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 text-xs sm:text-sm"},[G(k(Od),{class:"w-4 h-4"}),g[11]||(g[11]=f("span",null,"ดำเนินการจองแผงนี้",-1))])):(q(),ee("span",RP," แผงนี้ไม่สามารถจองได้ ("+F(r.value.status==="booked"?"มีผู้จองแล้ว":"ปิดใช้งาน")+") ",1))])])])):we("",!0)])}}},MP={key:0,class:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"},OP={class:"bg-white border border-slate-200/80 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-800"},NP={class:"px-6 py-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/80"},DP={class:"flex items-center gap-2"},VP={class:"text-base font-bold text-slate-900"},LP={key:0,class:"p-6 text-center space-y-4"},FP={class:"w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200"},$P={class:"bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between"},UP={class:"flex items-center gap-3"},jP={class:"font-bold text-slate-900 text-base"},BP={class:"text-xs text-slate-500 font-medium"},zP={class:"text-xs text-indigo-600 font-mono font-semibold mt-0.5"},qP={class:"text-right font-mono"},HP={class:"text-base font-bold text-emerald-700"},WP={class:"space-y-3"},KP={class:"grid grid-cols-2 gap-2"},GP={class:"pt-2"},QP={class:"block text-xs font-semibold text-slate-800 mb-1.5 flex items-center justify-between"},YP={key:0,class:"flex flex-col items-center gap-2"},JP=["src"],XP={key:1,class:"py-3 flex flex-col items-center gap-1.5 text-slate-500"},ZP={key:0,class:"p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5 font-medium"},eM={class:"bg-indigo-50 border border-indigo-200/80 rounded-xl p-2.5 flex items-start gap-2 text-[11px] text-indigo-900 font-medium"},tM={class:"pt-2 flex items-center justify-end gap-3"},nM={type:"submit",class:"px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md shadow-indigo-200 text-xs transition flex items-center gap-1.5 active:scale-95"},sM={__name:"BookingModal",props:{isOpen:Boolean,stall:Object},emits:["close","open-auth"],setup(t,{emit:e}){const n=t,s=e,r=Nn(),i=Nl(),o=Ee(""),l=Ee(""),c=Ee({name:"",phone:"",citizenId:"",goodsType:""});ys(()=>i.currentUser,y=>{y&&(c.value.name=y.displayName||c.value.name,c.value.phone=y.phone||c.value.phone,c.value.citizenId=y.citizenId||c.value.citizenId)},{immediate:!0});const u=Pt(()=>r.getStallMetrics(n.stall));function h(y){const m=y.target.files[0];if(m){const _=new FileReader;_.onload=A=>{o.value=A.target.result},_.readAsDataURL(m)}}async function g(){var _;if(l.value="",!c.value.name||c.value.name.trim().length<2){l.value="กรุณาระบุชื่อ-นามสกุล ผู้จองให้ถูกต้อง";return}if(!/^0[0-9]{9}$/.test(c.value.phone)){l.value="กรุณาระบุเบอร์โทรศัพท์ 10 หลัก (ขึ้นต้นด้วย 0)";return}if(!/^[0-9]{13}$/.test(c.value.citizenId)){l.value="กรุณาระบุเลขบัตรประชาชน 13 หลักเป็นตัวเลขเท่านั้น";return}if(!c.value.goodsType){l.value="กรุณาระบุประเภทสินค้าที่จะนำมาขาย";return}if(!o.value){l.value="กรุณาอัปโหลดสลิปหลักฐานการโอนเงิน";return}if(!n.stall)return;const y={...c.value,tenantId:((_=i.currentUser)==null?void 0:_.uid)||"tenant-anon",slipUrl:o.value};await r.bookStall(n.stall.id,y)&&(o.value="",s("close"))}return(y,m)=>{var _,A;return t.isOpen&&t.stall?(q(),ee("div",MP,[f("div",OP,[f("div",NP,[f("div",DP,[G(k(Od),{class:"w-5 h-5 text-indigo-600"}),f("h2",VP,"แบบฟอร์มยืนยันการจองแผงค้า "+F(t.stall.stallNo),1)]),f("button",{onClick:m[0]||(m[0]=M=>y.$emit("close")),class:"text-slate-400 hover:text-slate-700 p-1 rounded-lg transition"},[G(k(Ms),{class:"w-5 h-5"})])]),k(i).isAuthenticated?(q(),ee("form",{key:1,onSubmit:vt(g,["prevent"]),class:"p-6 overflow-y-auto space-y-4 text-xs sm:text-sm"},[f("div",$P,[f("div",UP,[f("div",{class:"w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-white text-lg shadow-md",style:tt({backgroundColor:(_=k(r).getZoneById(t.stall.zoneId))==null?void 0:_.color})},F(t.stall.stallNo),5),f("div",null,[f("div",jP,"แผงค้า "+F(t.stall.stallNo),1),f("div",BP,F((A=k(r).getZoneById(t.stall.zoneId))==null?void 0:A.name),1),f("div",zP," ขนาด: "+F(u.value.widthM)+" x "+F(u.value.heightM)+" เมตร ("+F(u.value.areaSqM)+" ตร.ม.) ",1)])]),f("div",qP,[m[9]||(m[9]=f("div",{class:"text-xs text-slate-400 font-medium"},"อัตราค่าเช่า",-1)),f("div",HP,"฿"+F(t.stall.price)+"/วัน",1)])]),f("div",WP,[f("div",null,[m[10]||(m[10]=f("label",{class:"block text-xs font-semibold text-slate-700 mb-1"}," ชื่อ-นามสกุล ผู้จอง / ชื่อร้านค้า * ",-1)),Ie(f("input",{"onUpdate:modelValue":m[2]||(m[2]=M=>c.value.name=M),required:"",type:"text",placeholder:"เช่น คุณสมพงษ์ ใจดี (ร้านชาไข่มุก)",class:"w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"},null,512),[[De,c.value.name]])]),f("div",KP,[f("div",null,[m[11]||(m[11]=f("label",{class:"block text-xs font-semibold text-slate-700 mb-1"}," เบอร์โทรศัพท์ (10 หลัก) * ",-1)),Ie(f("input",{"onUpdate:modelValue":m[3]||(m[3]=M=>c.value.phone=M),required:"",type:"tel",maxlength:"10",placeholder:"0812345678",class:"w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"},null,512),[[De,c.value.phone]])]),f("div",null,[m[12]||(m[12]=f("label",{class:"block text-xs font-semibold text-slate-700 mb-1"}," เลขบัตรประชาชน (13 หลัก) * ",-1)),Ie(f("input",{"onUpdate:modelValue":m[4]||(m[4]=M=>c.value.citizenId=M),required:"",type:"text",maxlength:"13",placeholder:"1100200300401",class:"w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"},null,512),[[De,c.value.citizenId]])])]),f("div",null,[m[13]||(m[13]=f("label",{class:"block text-xs font-semibold text-slate-700 mb-1"}," ประเภทสินค้า / สินค้าที่จะนำมาขาย * ",-1)),Ie(f("input",{"onUpdate:modelValue":m[5]||(m[5]=M=>c.value.goodsType=M),required:"",type:"text",placeholder:"เช่น ชาชงสด, ขนมปังปิ้ง, เสื้อผ้าแฟชั่น",class:"w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"},null,512),[[De,c.value.goodsType]])]),f("div",GP,[f("label",QP,[f("span",null,"💳 แนบหลักฐานสลิปโอนเงินค่าเช่า (฿"+F(t.stall.price)+") *",1),m[14]||(m[14]=f("span",{class:"text-[10px] text-slate-500 font-mono"},"PromptPay: 081-999-8888",-1))]),f("div",{class:xe(["border-2 border-dashed rounded-2xl p-3 text-center transition cursor-pointer relative",o.value?"border-emerald-500/60 bg-emerald-50/50":"border-slate-300 hover:border-indigo-400 bg-slate-50"]),onClick:m[6]||(m[6]=M=>y.$refs.fileInput.click())},[f("input",{ref:"fileInput",type:"file",accept:"image/*",class:"hidden",onChange:h},null,544),o.value?(q(),ee("div",YP,[f("img",{src:o.value,alt:"Slip Preview",class:"max-h-36 rounded-lg object-contain border border-slate-200 shadow-xs"},null,8,JP),m[15]||(m[15]=f("span",{class:"text-xs text-emerald-700 font-semibold"},"✓ แนบสลิปเรียบร้อยแล้ว (คลิกเพื่อเปลี่ยน)",-1))])):(q(),ee("div",XP,[G(k(O2),{class:"w-6 h-6 text-indigo-600"}),m[16]||(m[16]=f("span",{class:"text-xs font-medium"},"อัปโหลดสลิปการชำระเงิน (คลิกเพื่อเลือกไฟล์)",-1)),m[17]||(m[17]=f("span",{class:"text-[10px] text-slate-400"},"รองรับไฟล์ภาพ JPG, PNG, WEBP",-1))]))],2)])]),l.value?(q(),ee("div",ZP,[G(k(By),{class:"w-4 h-4 shrink-0 text-rose-600"}),f("span",null,F(l.value),1)])):we("",!0),f("div",eM,[G(k(q2),{class:"w-4 h-4 text-indigo-600 shrink-0 mt-0.5"}),m[18]||(m[18]=f("p",null," ระบบจองแผงใช้ Firestore Atomic Transaction ป้องกัน Race Condition เมื่อยืนยันการจอง สิทธิ์จะถูกล็อกแบบ Real-time ทันที ",-1))]),f("div",tM,[f("button",{type:"button",onClick:m[7]||(m[7]=M=>y.$emit("close")),class:"px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"}," ยกเลิก "),f("button",nM,[G(k(P2),{class:"w-4 h-4"}),m[19]||(m[19]=f("span",null,"ยืนยันชำระเงินและจองแผง",-1))])])],32)):(q(),ee("div",LP,[f("div",FP,[G(k(F2),{class:"w-6 h-6"})]),m[8]||(m[8]=f("div",null,[f("h3",{class:"text-sm font-bold text-slate-900"},"ต้องเข้าสู่ระบบก่อนทำการจองแผงค้า"),f("p",{class:"text-xs text-slate-500 mt-1"},"เพื่อความปลอดภัยและรับการแจ้งเตือนสิทธิ์การจอง กรุณาสมัครสมาชิกหรือล็อกอินเข้าใช้งาน")],-1)),f("button",{onClick:m[1]||(m[1]=M=>y.$emit("open-auth")),class:"px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-indigo-200"}," ล็อกอิน / สมัครสมาชิกเข้าใช้งาน ")]))])])):we("",!0)}}},rM={key:0,class:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"},iM={class:"bg-white border border-slate-200/80 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col text-slate-800"},oM={class:"px-6 py-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/80"},aM={class:"flex items-center gap-2"},lM={class:"p-6 space-y-4 text-xs sm:text-sm"},cM={class:"pt-2 flex justify-end"},uM={__name:"FirebaseSettingsModal",props:{isOpen:Boolean},emits:["close"],setup(t){return(e,n)=>t.isOpen?(q(),ee("div",rM,[f("div",iM,[f("div",oM,[f("div",aM,[G(k(N2),{class:"w-5 h-5 text-amber-500"}),n[2]||(n[2]=f("h2",{class:"text-base font-bold text-slate-900"},"ตั้งค่าการเชื่อมต่อ Firebase Firestore",-1))]),f("button",{onClick:n[0]||(n[0]=s=>e.$emit("close")),class:"text-slate-400 hover:text-slate-700 p-1 rounded-lg transition"},[G(k(Ms),{class:"w-5 h-5"})])]),f("div",lM,[n[3]||(n[3]=Yg('<p class="text-slate-600 leading-relaxed font-medium"> ปัจจุบันระบบทำงานในโหมด <strong class="text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Local PoC Mode</strong> โดยจะบันทึกข้อมูลผังตลาดและสถานะการจองลงใน Browser LocalStorage </p><div class="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2"><h3 class="text-xs font-bold text-slate-800">หากต้องการเชื่อมต่อกับ Firebase Project จริง:</h3><ol class="list-decimal list-inside text-slate-600 space-y-1 text-xs font-medium"><li>สร้างไฟล์ <code class="text-indigo-600 font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">.env</code> ใน Root โฟลเดอร์ของโปรเจกต์</li><li>เพิ่ม Key ด้านล่างนี้พร้อมค่าที่ได้จาก Firebase Console:</li></ol></div><div class="bg-slate-900 border border-slate-800 rounded-xl p-3 text-[11px] font-mono text-emerald-400 space-y-1 overflow-x-auto shadow-inner"><p>VITE_FIREBASE_API_KEY=AIzaSy...</p><p>VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com</p><p>VITE_FIREBASE_PROJECT_ID=your-project-id</p><p>VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com</p><p>VITE_FIREBASE_MESSAGING_SENDER_ID=123456789</p><p>VITE_FIREBASE_APP_ID=1:123456789:web:abcdef</p></div>',3)),f("div",cM,[f("button",{onClick:n[1]||(n[1]=s=>e.$emit("close")),class:"px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-200 transition active:scale-95"}," เข้าใจแล้ว ")])])])])):we("",!0)}},Hy=(t,e)=>{const n=t.__vccOpts||t;for(const[s,r]of e)n[s]=r;return n},dM={key:0,class:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md"},hM={class:"flex items-center justify-between pb-4 border-b border-slate-200/80"},fM={class:"flex items-center gap-2"},pM={class:"w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100"},gM={class:"text-sm font-bold text-slate-900"},mM={class:"mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-200/80"},yM={class:"grid grid-cols-3 gap-1.5"},_M={key:0},vM={key:1,class:"grid grid-cols-2 gap-2"},bM={key:2},wM={key:3,class:"p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5 font-medium"},xM=["disabled"],IM={key:0,class:"animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"},TM={class:"mt-4 pt-3 border-t border-slate-200/80 text-center"},EM={__name:"AuthModal",props:{isOpen:Boolean},emits:["close"],setup(t,{emit:e}){const n=e,s=Nl(),r=Nn(),i=Ee(!1),o=Ee(""),l=eo({email:"",password:"",displayName:"",phone:"",citizenId:"",role:"tenant"});function c(h){s.switchDemoRole(h),r.showNotification(`สลับเข้าสู่บทบาท: ${h.toUpperCase()} (${s.userName})`,"success"),n("close")}async function u(){if(o.value="",i.value){if(l.phone&&!/^0[0-9]{9}$/.test(l.phone)){o.value="กรุณาระบุเบอร์โทรศัพท์ 10 หลักขึ้นต้นด้วย 0";return}if(l.citizenId&&!/^[0-9]{13}$/.test(l.citizenId)){o.value="กรุณาระบุเลขบัตรประชาชน 13 หลักเป็นตัวเลขเท่านั้น";return}const h=await s.register({...l});h.success?(r.showNotification(`สมัครสมาชิกสำเร็จ! ยินดีต้อนรับคุณ ${h.user.displayName}`,"success"),n("close")):o.value=h.error||"เกิดข้อผิดพลาดในการสมัครสมาชิก"}else{const h=await s.login(l.email,l.password);h.success?(r.showNotification(`เข้าสู่ระบบสำเร็จ ยินดีต้อนรับ ${h.user.displayName}`,"success"),n("close")):o.value=h.error||"อีเมลหรือรหัสผ่านไม่ถูกต้อง"}}return(h,g)=>(q(),ft(al,{name:"fade"},{default:no(()=>[t.isOpen?(q(),ee("div",dM,[f("div",{class:"bg-white border border-slate-200/80 w-full max-w-md rounded-3xl shadow-2xl p-6 relative overflow-hidden text-slate-800",onClick:g[11]||(g[11]=vt(()=>{},["stop"]))},[f("div",hM,[f("div",fM,[f("div",pM,[G(k(K2),{class:"w-4 h-4"})]),f("div",null,[f("h3",gM,F(i.value?"สมัครสมาชิกผู้ใช้งานใหม่":"เข้าสู่ระบบ (Sign In)"),1),g[12]||(g[12]=f("p",{class:"text-[11px] text-slate-500 font-medium"},"ระบบจองแผงตลาด WalkStreet System",-1))])]),f("button",{onClick:g[0]||(g[0]=y=>h.$emit("close")),class:"p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"},[G(k(Ms),{class:"w-5 h-5"})])]),f("div",mM,[g[13]||(g[13]=f("span",{class:"text-[10px] text-indigo-700 font-bold uppercase tracking-wider block mb-2"}," ⚡ สลับบทบาททดสอบด่วน (Quick Demo Role Switch): ",-1)),f("div",yM,[f("button",{onClick:g[1]||(g[1]=y=>c("owner")),class:xe(["px-2 py-1.5 rounded-xl text-[11px] font-bold border transition",k(s).userRole==="owner"?"bg-purple-600 text-white border-purple-600 shadow-xs":"bg-white text-slate-700 border-slate-200 hover:border-purple-400 hover:bg-purple-50/50"])}," 👑 Owner ",2),f("button",{onClick:g[2]||(g[2]=y=>c("admin")),class:xe(["px-2 py-1.5 rounded-xl text-[11px] font-bold border transition",k(s).userRole==="admin"?"bg-indigo-600 text-white border-indigo-600 shadow-xs":"bg-white text-slate-700 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50"])}," 🛡️ Admin ",2),f("button",{onClick:g[3]||(g[3]=y=>c("tenant")),class:xe(["px-2 py-1.5 rounded-xl text-[11px] font-bold border transition",k(s).userRole==="tenant"?"bg-emerald-600 text-white border-emerald-600 shadow-xs":"bg-white text-slate-700 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50"])}," 🛍️ Tenant ",2)])]),f("form",{onSubmit:vt(u,["prevent"]),class:"mt-4 space-y-3"},[i.value?(q(),ee("div",_M,[g[14]||(g[14]=f("label",{class:"block text-xs font-semibold text-slate-700 mb-1"},"ชื่อ-นามสกุล จริง *",-1)),Ie(f("input",{"onUpdate:modelValue":g[4]||(g[4]=y=>l.displayName=y),type:"text",required:"",placeholder:"เช่น นายสมพงษ์ ใจดี",class:"w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"},null,512),[[De,l.displayName]])])):we("",!0),f("div",null,[g[15]||(g[15]=f("label",{class:"block text-xs font-semibold text-slate-700 mb-1"},"อีเมล (Email) *",-1)),Ie(f("input",{"onUpdate:modelValue":g[5]||(g[5]=y=>l.email=y),type:"email",required:"",placeholder:"example@market.com",class:"w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"},null,512),[[De,l.email]])]),f("div",null,[g[16]||(g[16]=f("label",{class:"block text-xs font-semibold text-slate-700 mb-1"},"รหัสผ่าน (Password) *",-1)),Ie(f("input",{"onUpdate:modelValue":g[6]||(g[6]=y=>l.password=y),type:"password",required:"",placeholder:"••••••••",class:"w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"},null,512),[[De,l.password]])]),i.value?(q(),ee("div",vM,[f("div",null,[g[17]||(g[17]=f("label",{class:"block text-xs font-semibold text-slate-700 mb-1"},"เบอร์โทรศัพท์ (10 หลัก) *",-1)),Ie(f("input",{"onUpdate:modelValue":g[7]||(g[7]=y=>l.phone=y),type:"tel",required:"",maxlength:"10",placeholder:"0812345678",class:"w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none font-mono transition"},null,512),[[De,l.phone]])]),f("div",null,[g[18]||(g[18]=f("label",{class:"block text-xs font-semibold text-slate-700 mb-1"},"เลขบัตรประชาชน (13 หลัก)",-1)),Ie(f("input",{"onUpdate:modelValue":g[8]||(g[8]=y=>l.citizenId=y),type:"text",maxlength:"13",placeholder:"1100200300401",class:"w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none font-mono transition"},null,512),[[De,l.citizenId]])])])):we("",!0),i.value?(q(),ee("div",bM,[g[20]||(g[20]=f("label",{class:"block text-xs font-semibold text-slate-700 mb-1"},"เลือกบทบาท (Role) *",-1)),Ie(f("select",{"onUpdate:modelValue":g[9]||(g[9]=y=>l.role=y),class:"w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium"},[...g[19]||(g[19]=[f("option",{value:"tenant"},"ผู้เช่า / พ่อค้าแม่ค้า (Tenant)",-1),f("option",{value:"admin"},"ผู้ดูแลระบบผังตลาด (Admin)",-1),f("option",{value:"owner"},"เจ้าของตลาด (Market Owner)",-1)])],512),[[ba,l.role]])])):we("",!0),o.value?(q(),ee("div",wM,[G(k(By),{class:"w-4 h-4 shrink-0 text-rose-600"}),f("span",null,F(o.value),1)])):we("",!0),f("button",{type:"submit",disabled:k(s).isLoading,class:"w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-200 active:scale-95"},[k(s).isLoading?(q(),ee("span",IM)):we("",!0),f("span",null,F(i.value?"ยืนยันการสมัครสมาชิก":"เข้าสู่ระบบ"),1)],8,xM)],32),f("div",TM,[f("button",{onClick:g[10]||(g[10]=y=>i.value=!i.value),class:"text-xs text-slate-600 hover:text-indigo-600 transition font-medium"},F(i.value?"มีบัญชีผู้ใช้อยู่แล้ว? คลิกเข้าสู่ระบบ":"ยังไม่มีบัญชีผู้ใช้? คลิกสมัครสมาชิก"),1)])])])):we("",!0)]),_:1}))}},kM=Hy(EM,[["__scopeId","data-v-651bfe47"]]),AM={key:0,class:"fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-900/40 backdrop-blur-xs"},SM={class:"p-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/80"},CM={class:"flex items-center gap-2"},RM={key:0,class:"px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full shadow-xs"},PM={class:"px-4 py-2.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between text-xs"},MM={class:"text-slate-500 font-medium"},OM={class:"flex items-center gap-2 sm:gap-3"},NM={class:"flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50"},DM={key:0,class:"text-center py-16 text-slate-400 text-xs space-y-3"},VM={class:"flex items-start justify-between gap-2"},LM={class:"flex items-center gap-2"},FM={class:"text-xs font-bold text-slate-900 leading-tight"},$M={key:0,class:"text-[9px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 font-bold border border-indigo-100 shrink-0"},UM=["onClick"],jM={class:"text-xs text-slate-600 mt-1.5 leading-relaxed font-medium"},BM={class:"mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono font-medium"},zM=["onClick"],qM={__name:"NotificationCenter",props:{isOpen:Boolean},emits:["close"],setup(t){const e=Nl(),n=Ol(),s=Pt(()=>e.isAdmin||e.isOwner),r=Pt(()=>{var u;return n.tenantNotifications((u=e.currentUser)==null?void 0:u.uid,s.value)}),i=Pt(()=>{var u;return n.unreadCount((u=e.currentUser)==null?void 0:u.uid,s.value)});function o(){var u;n.markAllAsRead((u=e.currentUser)==null?void 0:u.uid,s.value)}async function l(){await n.clearAllNotifications()}function c(u){if(!u)return"";try{return new Date(u).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})}catch{return u}}return(u,h)=>(q(),ft(al,{name:"slide-left"},{default:no(()=>[t.isOpen?(q(),ee("div",AM,[f("div",{class:"w-full max-w-md bg-white border-l border-slate-200/90 h-full flex flex-col shadow-2xl text-slate-800",onClick:h[1]||(h[1]=vt(()=>{},["stop"]))},[f("div",SM,[f("div",CM,[G(k(jy),{class:"w-5 h-5 text-amber-500"}),h[2]||(h[2]=f("h2",{class:"text-sm font-bold text-slate-900"},"การแจ้งเตือนสำหรับผู้เช่า",-1)),i.value>0?(q(),ee("span",RM,F(i.value)+" ใหม่ ",1)):we("",!0)]),f("button",{onClick:h[0]||(h[0]=g=>u.$emit("close")),class:"p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition"},[G(k(Ms),{class:"w-5 h-5"})])]),f("div",PM,[f("span",MM,"ทั้งหมด "+F(r.value.length)+" รายการ",1),f("div",OM,[i.value>0?(q(),ee("button",{key:0,onClick:o,class:"text-indigo-600 hover:text-indigo-700 font-semibold transition flex items-center gap-1"},[G(k(C2),{class:"w-3.5 h-3.5"}),h[3]||(h[3]=f("span",null,"อ่านทั้งหมด",-1))])):we("",!0),r.value.length>0?(q(),ee("button",{key:1,onClick:l,class:"px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold transition flex items-center gap-1",title:"ลบรายการแจ้งเตือนทั้งหมด"},[G(k(Cn),{class:"w-3.5 h-3.5"}),h[4]||(h[4]=f("span",null,"ลบข้อความทั้งหมด",-1))])):we("",!0)])]),f("div",NM,[r.value.length===0?(q(),ee("div",DM,[G(k(M2),{class:"w-10 h-10 text-slate-300 mx-auto"}),h[5]||(h[5]=f("p",{class:"font-medium text-slate-500"},"ยังไม่มีการแจ้งเตือนในขณะนี้",-1))])):we("",!0),(q(!0),ee(Qe,null,un(r.value,g=>(q(),ee("div",{key:g.id,class:xe(["p-3.5 rounded-2xl border transition-all relative group",[g.isRead?"bg-white border-slate-200/80 opacity-80 shadow-xs":"bg-white border-amber-300 shadow-md shadow-amber-500/5 ring-1 ring-amber-200"]])},[f("div",VM,[f("div",LM,[f("span",{class:xe(["w-2 h-2 rounded-full",g.isRead?"bg-slate-300":"bg-amber-500 animate-pulse"])},null,2),f("h4",FM,F(g.title),1),g.type==="LAYOUT_UPDATE"?(q(),ee("span",$M," ผังตลาด ")):we("",!0)]),f("button",{onClick:y=>k(n).deleteNotification(g.id),class:"opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition",title:"ลบการแจ้งเตือนนี้"},[G(k(Cn),{class:"w-3.5 h-3.5"})],8,UM)]),f("p",jM,F(g.message),1),f("div",BM,[f("span",null,"แผงค้า: "+F(g.stallNo),1),f("span",null,F(c(g.createdAt)),1)]),g.isRead?we("",!0):(q(),ee("button",{key:0,onClick:y=>k(n).markAsRead(g.id),class:"mt-2 text-[10px] text-amber-600 hover:underline block font-semibold"}," ทบทวน / รับทราบแล้ว ",8,zM))],2))),128))])])])):we("",!0)]),_:1}))}},HM=Hy(qM,[["__scopeId","data-v-da3921dc"]]),WM={class:"min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-['Prompt',sans-serif] transition-colors duration-300"},KM={class:"flex-1 relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300"},GM={__name:"App",setup(t){const e=Nn(),n=Ee(!1),s=Ee(!1),r=Ee(!1),i=Ee(!1),o=Ee(!1),l=Ee(!1),c=Ee(!1),u=Ee(!1),h=Ee(null),g=Ol();mu(()=>{e.initFirebaseSync(),g.initNotificationSync()});function y(m){h.value=m,o.value=!0}return(m,_)=>(q(),ee("div",WM,[G(SS,{onOpenZoneManager:_[0]||(_[0]=A=>r.value=!0),onOpenMarketSettings:_[1]||(_[1]=A=>i.value=!0),onOpenFirebaseConfig:_[2]||(_[2]=A=>l.value=!0),onOpenAuth:_[3]||(_[3]=A=>c.value=!0),onOpenNotifications:_[4]||(_[4]=A=>u.value=!0)}),f("main",KM,[k(e).activeMode==="admin"?(q(),ft(EC,{key:0,onOpenEditor:_[5]||(_[5]=A=>n.value=!0),onOpenObjectEditor:_[6]||(_[6]=A=>s.value=!0)})):k(e).activeMode==="customer"?(q(),ft(PP,{key:1,onOpenBookingModal:y})):we("",!0)]),G(YC,{"is-open":n.value,"stall-id":k(e).selectedStallId,onClose:_[7]||(_[7]=A=>n.value=!1)},null,8,["is-open","stall-id"]),G(mR,{"is-open":s.value,"object-id":k(e).selectedObjectId,onClose:_[8]||(_[8]=A=>s.value=!1)},null,8,["is-open","object-id"]),G(LR,{"is-open":r.value,onClose:_[9]||(_[9]=A=>r.value=!1)},null,8,["is-open"]),G(YR,{"is-open":i.value,onClose:_[10]||(_[10]=A=>i.value=!1)},null,8,["is-open"]),G(sM,{"is-open":o.value,stall:h.value,onClose:_[11]||(_[11]=A=>o.value=!1),onOpenAuth:_[12]||(_[12]=A=>c.value=!0)},null,8,["is-open","stall"]),G(uM,{"is-open":l.value,onClose:_[13]||(_[13]=A=>l.value=!1)},null,8,["is-open"]),G(kM,{"is-open":c.value,onClose:_[14]||(_[14]=A=>c.value=!1)},null,8,["is-open"]),G(HM,{"is-open":u.value,onClose:_[15]||(_[15]=A=>u.value=!1)},null,8,["is-open"]),G(al,{name:"fade"},{default:no(()=>[k(e).notification?(q(),ee("div",{key:0,class:xe(["fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md flex items-center gap-2.5 text-xs font-semibold tracking-tight transition-colors duration-300",{"bg-emerald-50/95 dark:bg-emerald-950/90 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700 shadow-emerald-500/10":k(e).notification.type==="success","bg-rose-50/95 dark:bg-rose-950/90 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-700 shadow-rose-500/10":k(e).notification.type==="error","bg-sky-50/95 dark:bg-sky-950/90 text-sky-900 dark:text-sky-200 border-sky-300 dark:border-sky-700 shadow-sky-500/10":k(e).notification.type==="info","bg-amber-50/95 dark:bg-amber-950/90 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700 shadow-amber-500/10":k(e).notification.type==="warning"}])},[f("span",{class:xe(["w-2 h-2 rounded-full animate-ping",{"bg-emerald-500":k(e).notification.type==="success","bg-rose-500":k(e).notification.type==="error","bg-sky-500":k(e).notification.type==="info","bg-amber-500":k(e).notification.type==="warning"}])},null,2),f("span",null,F(k(e).notification.msg),1)],2)):we("",!0)]),_:1})]))}},Wy=Gb(GM);Wy.use(Jb());Wy.mount("#app");
