(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();/**
* @vue/shared v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Sc(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Pe={},Rs=[],rn=()=>{},Qf=()=>!1,pa=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),ma=t=>t.startsWith("onUpdate:"),st=Object.assign,Rc=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},_y=Object.prototype.hasOwnProperty,xe=(t,e)=>_y.call(t,e),se=Array.isArray,Jn=t=>Mi(t)==="[object Map]",Os=t=>Mi(t)==="[object Set]",Uh=t=>Mi(t)==="[object Date]",pe=t=>typeof t=="function",Fe=t=>typeof t=="string",zt=t=>typeof t=="symbol",Se=t=>t!==null&&typeof t=="object",Jf=t=>(Se(t)||pe(t))&&pe(t.then)&&pe(t.catch),Yf=Object.prototype.toString,Mi=t=>Yf.call(t),yy=t=>Mi(t).slice(8,-1),Xf=t=>Mi(t)==="[object Object]",ga=t=>Fe(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Yr=Sc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),_a=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},vy=/-\w/g,Gt=_a(t=>t.replace(vy,e=>e.slice(1).toUpperCase())),wy=/\B([A-Z])/g,qs=_a(t=>t.replace(wy,"-$1").toLowerCase()),Zf=_a(t=>t.charAt(0).toUpperCase()+t.slice(1)),_l=_a(t=>t?`on${Zf(t)}`:""),sn=(t,e)=>!Object.is(t,e),To=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},ep=(t,e,n,s=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:s,value:n})},ya=t=>{const e=parseFloat(t);return isNaN(e)?t:e},by=t=>{const e=Fe(t)?Number(t):NaN;return isNaN(e)?t:e};let $h;const va=()=>$h||($h=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Tt(t){if(se(t)){const e={};for(let n=0;n<t.length;n++){const s=t[n],r=Fe(s)?Ay(s):Tt(s);if(r)for(const i in r)e[i]=r[i]}return e}else if(Fe(t)||Se(t))return t}const Ty=/;(?![^(]*\))/g,Iy=/:([^]+)/,Ey=/"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;function Ay(t){const e={};return t.replace(Ey,n=>n.startsWith("/*")?"":n).split(Ty).forEach(n=>{if(n){const s=n.split(Iy);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function tt(t){let e="";if(Fe(t))e=t;else if(se(t))for(let n=0;n<t.length;n++){const s=tt(t[n]);s&&(e+=s+" ")}else if(Se(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const xy="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Sy=Sc(xy);function tp(t){return!!t||t===""}function Ry(t,e,n){if(t.length!==e.length)return!1;let s=!0;for(let r=0;s&&r<t.length;r++)s=ss(t[r],e[r],n);return s}function Bh(t,e,n){if(t.size!==e.size)return!1;const s=Array.from(e),r=new Uint8Array(s.length);for(const i of t){let o=-1;for(let l=0;l<s.length;l++)if(!r[l]&&ss(i,s[l],n)){o=l;break}if(o<0)return!1;r[o]=1}return!0}function Cy(t,e,n){let s=Jn(t),r=Jn(e);if(s||r||(s=Os(t),r=Os(e),s||r))return s&&r?Bh(t,e,n):!1;const i=Object.keys(t).length,o=Object.keys(e).length;if(i!==o)return!1;for(const l in t){const c=t.hasOwnProperty(l),u=e.hasOwnProperty(l);if(c&&!u||!c&&u||!ss(t[l],e[l],n))return!1}return String(t)===String(e)}function jh(t,e,n,s){n||(n=[new Map,new Map]);const[r,i]=n;if(r.has(t)||i.has(e))return r.get(t)===e&&i.get(e)===t;r.set(t,e),i.set(e,t);const o=s(t,e,n);return r.delete(t),i.delete(e),o}function ss(t,e,n){if(t===e)return!0;let s=Uh(t),r=Uh(e);return s||r?s&&r?t.getTime()===e.getTime():!1:(s=zt(t),r=zt(e),s||r?t===e:(s=se(t),r=se(e),s||r?s&&r?jh(t,e,n,Ry):!1:(s=Se(t),r=Se(e),s||r?!s||!r?!1:jh(t,e,n,Cy):String(t)===String(e))))}function Py(t,e){return t.findIndex(n=>ss(n,e))}const np=t=>!!(t&&t.__v_isRef===!0),G=t=>Fe(t)?t:t==null?"":se(t)||Se(t)&&(t.toString===Yf||!pe(t.toString))?np(t)?G(t.value):JSON.stringify(t,sp,2):String(t),sp=(t,e)=>np(e)?sp(t,e.value):Jn(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[s,r],i)=>(n[yl(s,i)+" =>"]=r,n),{})}:Os(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>yl(n))}:zt(e)?yl(e):Se(e)&&!se(e)&&!Xf(e)?String(e):e,yl=(t,e="")=>{var n;return zt(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Je;class rp{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&Je&&(Je.active?(this.parent=Je,this.index=(Je.scopes||(Je.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes){const s=this.scopes.slice();for(e=0,n=s.length;e<n;e++)s[e].pause()}for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes){const r=this.scopes.slice();for(e=0,n=r.length;e<n;e++)r[e].resume()}const s=this.effects.slice();for(e=0,n=s.length;e<n;e++)s[e].resume()}}run(e){if(this._active){const n=Je;try{return Je=this,e()}finally{Je=n}}}on(){++this._on===1&&(this.prevScope=Je,Je=this)}off(){if(this._on>0&&--this._on===0){if(Je===this)Je=this.prevScope;else{let e=Je;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){const r=this.scopes.slice();for(n=0,s=r.length;n<s;n++)r[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function ip(t){return new rp(t)}function op(){return Je}function ky(t,e=!1){Je&&Je.cleanups.push(t)}let Me;const vl=new WeakSet;class ap{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Je&&(Je.active?Je.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,vl.has(this)&&(vl.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||cp(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,zh(this),up(this);const e=Me,n=Qt;Me=this,Qt=!0;try{return this.fn()}finally{hp(this),Me=e,Qt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)kc(e);this.deps=this.depsTail=void 0,zh(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?vl.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){ql(this)&&this.run()}get dirty(){return ql(this)}}let lp=0,Xr,Zr;function cp(t,e=!1){if(t.flags|=8,e){t.next=Zr,Zr=t;return}t.next=Xr,Xr=t}function Cc(){lp++}function Pc(){if(--lp>0)return;if(Zr){let e=Zr;for(Zr=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;Xr;){let e=Xr;for(Xr=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(s){t||(t=s)}e=n}}if(t)throw t}function up(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function hp(t){let e,n=t.depsTail,s=n;for(;s;){const r=s.prevDep;s.version===-1?(s===n&&(n=r),kc(s),My(s)):e=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=r}t.deps=e,t.depsTail=n}function ql(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(dp(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function dp(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===fi)||(t.globalVersion=fi,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!ql(t))))return;t.flags|=2;const e=t.dep,n=Me,s=Qt;Me=t,Qt=!0;try{up(t);const r=t.fn(t._value);(e.version===0||sn(r,t._value))&&(t.flags|=128,t._value=r,e.version++)}catch(r){throw e.version++,r}finally{Me=n,Qt=s,hp(t),t.flags&=-3}}function kc(t,e=!1){const{dep:n,prevSub:s,nextSub:r}=t;if(s&&(s.nextSub=r,t.prevSub=void 0),r&&(r.prevSub=s,t.nextSub=void 0),n.subs===t&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)kc(i,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function My(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let Qt=!0;const fp=[];function Rn(){fp.push(Qt),Qt=!1}function Cn(){const t=fp.pop();Qt=t===void 0?!0:t}function zh(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=Me;Me=void 0;try{e()}finally{Me=n}}}let fi=0;class Ny{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Mc{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Me||!Qt||Me===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Me)n=this.activeLink=new Ny(Me,this),Me.deps?(n.prevDep=Me.depsTail,Me.depsTail.nextDep=n,Me.depsTail=n):Me.deps=Me.depsTail=n,pp(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=Me.depsTail,n.nextDep=void 0,Me.depsTail.nextDep=n,Me.depsTail=n,Me.deps===n&&(Me.deps=s)}return n}trigger(e){this.version++,fi++,this.notify(e)}notify(e){Cc();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Pc()}}}function pp(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let s=e.deps;s;s=s.nextDep)pp(s)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const Do=new WeakMap,Ms=Symbol(""),Hl=Symbol(""),pi=Symbol("");function gt(t,e,n){if(Qt&&Me){let s=Do.get(t);s||Do.set(t,s=new Map);let r=s.get(n);r||(s.set(n,r=new Mc),r.map=s,r.key=n),r.track()}}function Tn(t,e,n,s,r,i){const o=Do.get(t);if(!o){fi++;return}const l=c=>{c&&c.trigger()};if(Cc(),e==="clear")o.forEach(l);else{const c=se(t),u=c&&ga(n);if(c&&n==="length"){const d=Number(s);o.forEach((p,y)=>{(y==="length"||y===pi||!zt(y)&&y>=d)&&l(p)})}else switch((n!==void 0||o.has(void 0))&&l(o.get(n)),u&&l(o.get(pi)),e){case"add":c?u&&l(o.get("length")):(l(o.get(Ms)),Jn(t)&&l(o.get(Hl)));break;case"delete":c||(l(o.get(Ms)),Jn(t)&&l(o.get(Hl)));break;case"set":Jn(t)&&l(o.get(Ms));break}}Pc()}function Dy(t,e){const n=Do.get(t);return n&&n.get(e)}function er(t){const e=we(t);return e===t||(gt(e,"iterate",pi),Dt(t))?e:un(t)?on(t)?e.map(n=>rs(qt(n))):e.map(rs):e.map(qt)}function wa(t){return gt(t=we(t),"iterate",pi),t}function tn(t,e){return un(t)?rs(on(t)?qt(e):e):qt(e)}const Vy={__proto__:null,[Symbol.iterator](){return wl(this,Symbol.iterator,t=>tn(this,t))},concat(...t){return er(this).concat(...t.map(e=>se(e)?er(e):e))},entries(){return wl(this,"entries",t=>(t[1]=tn(this,t[1]),t))},every(t,e){return yn(this,"every",t,e,void 0,arguments)},filter(t,e){return yn(this,"filter",t,e,n=>n.map(s=>tn(this,s)),arguments)},find(t,e){return yn(this,"find",t,e,n=>tn(this,n),arguments)},findIndex(t,e){return yn(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return yn(this,"findLast",t,e,n=>tn(this,n),arguments)},findLastIndex(t,e){return yn(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return yn(this,"forEach",t,e,void 0,arguments)},includes(...t){return bl(this,"includes",t)},indexOf(...t){return bl(this,"indexOf",t)},join(t){return er(this).join(t)},lastIndexOf(...t){return bl(this,"lastIndexOf",t)},map(t,e){return yn(this,"map",t,e,void 0,arguments)},pop(){return Br(this,"pop")},push(...t){return Br(this,"push",t)},reduce(t,...e){return qh(this,"reduce",t,e)},reduceRight(t,...e){return qh(this,"reduceRight",t,e)},shift(){return Br(this,"shift")},some(t,e){return yn(this,"some",t,e,void 0,arguments)},splice(...t){return Br(this,"splice",t)},toReversed(){return er(this).toReversed()},toSorted(t){return er(this).toSorted(t)},toSpliced(...t){return er(this).toSpliced(...t)},unshift(...t){return Br(this,"unshift",t)},values(){return wl(this,"values",t=>tn(this,t))}};function wl(t,e,n){const s=wa(t),r=s[e]();return s!==t&&!Dt(t)&&(r._next=r.next,r.next=()=>{const i=r._next();return i.done||(i.value=n(i.value)),i}),r}const Oy=Array.prototype;function yn(t,e,n,s,r,i){const o=wa(t),l=o!==t&&!Dt(t),c=o[e];if(c!==Oy[e]){const p=c.apply(t,i);return l?qt(p):p}let u=n;o!==t&&(l?u=function(p,y){return n.call(this,tn(t,p),y,t)}:n.length>2&&(u=function(p,y){return n.call(this,p,y,t)}));const d=c.call(o,u,s);return l&&r?r(d):d}function qh(t,e,n,s){const r=wa(t),i=r!==t&&!Dt(t);let o=n,l=!1;r!==t&&(i?(l=s.length===0,o=function(u,d,p){return l&&(l=!1,u=tn(t,u)),n.call(this,u,tn(t,d),p,t)}):n.length>3&&(o=function(u,d,p){return n.call(this,u,d,p,t)}));const c=r[e](o,...s);return l?tn(t,c):c}function bl(t,e,n){const s=we(t);gt(s,"iterate",pi);const r=s[e](...n);return(r===-1||r===!1)&&Ta(n[0])?(n[0]=we(n[0]),s[e](...n)):r}function Br(t,e,n=[]){Rn(),Cc();const s=we(t)[e].apply(t,n);return Pc(),Cn(),s}const Ly=Sc("__proto__,__v_isRef,__isVue"),mp=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(zt));function Fy(t){zt(t)||(t=String(t));const e=we(this);return gt(e,"has",t),e.hasOwnProperty(t)}class gp{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,s){if(n==="__v_skip")return e.__v_skip;const r=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return i;if(n==="__v_raw")return s===(r?i?Gy:wp:i?vp:yp).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const o=se(e);if(!r){let c;if(o&&(c=Vy[n]))return c;if(n==="hasOwnProperty")return Fy}const l=Reflect.get(e,n,Be(e)?e:s);if((zt(n)?mp.has(n):Ly(n))||(r||gt(e,"get",n),i))return l;if(Be(l)){const c=o&&ga(n)?l:l.value;return r&&Se(c)?Kl(c):c}return Se(l)?r?Kl(l):ba(l):l}}class _p extends gp{constructor(e=!1){super(!1,e)}set(e,n,s,r){let i=e[n];const o=se(e)&&ga(n);if(!this._isShallow){const u=un(i);if(!Dt(s)&&!un(s)&&(i=we(i),s=we(s)),!o&&Be(i)&&!Be(s))return u||(i.value=s),!0}const l=o?Number(n)<e.length:xe(e,n),c=Reflect.set(e,n,s,Be(e)?e:r);return e===we(r)&&c&&(l?sn(s,i)&&Tn(e,"set",n,s):Tn(e,"add",n,s)),c}deleteProperty(e,n){const s=xe(e,n);e[n];const r=Reflect.deleteProperty(e,n);return r&&s&&Tn(e,"delete",n,void 0),r}has(e,n){const s=Reflect.has(e,n);return(!zt(n)||!mp.has(n))&&gt(e,"has",n),s}ownKeys(e){return gt(e,"iterate",se(e)?"length":Ms),Reflect.ownKeys(e)}}class Uy extends gp{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const $y=new _p,By=new Uy,jy=new _p(!0);const Wl=t=>t,uo=t=>Reflect.getPrototypeOf(t);function zy(t,e,n){return function(...s){const r=this.__v_raw,i=we(r),o=Jn(i),l=t==="entries"||t===Symbol.iterator&&o,c=t==="keys"&&o,u=r[t](...s),d=n?Wl:e?rs:qt;return!e&&gt(i,"iterate",c?Hl:Ms),st(Object.create(u),{next(){const{value:p,done:y}=u.next();return y?{value:p,done:y}:{value:l?[d(p[0]),d(p[1])]:d(p),done:y}}})}}function ho(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function qy(t,e){const n={get(r){const i=this.__v_raw,o=we(i),l=we(r);t||(sn(r,l)&&gt(o,"get",r),gt(o,"get",l));const{has:c}=uo(o),u=e?Wl:t?rs:qt;if(c.call(o,r))return u(i.get(r));if(c.call(o,l))return u(i.get(l));i!==o&&i.get(r)},get size(){const r=this.__v_raw;return!t&&gt(we(r),"iterate",Ms),r.size},has(r){const i=this.__v_raw,o=we(i),l=we(r);return t||(sn(r,l)&&gt(o,"has",r),gt(o,"has",l)),r===l?i.has(r):i.has(r)||i.has(l)},forEach(r,i){const o=this,l=o.__v_raw,c=we(l),u=e?Wl:t?rs:qt;return!t&&gt(c,"iterate",Ms),l.forEach((d,p)=>r.call(i,u(d),u(p),o))}};return st(n,t?{add:ho("add"),set:ho("set"),delete:ho("delete"),clear:ho("clear")}:{add(r){const i=we(this),o=uo(i),l=we(r),c=!e&&!Dt(r)&&!un(r)?l:r;return o.has.call(i,c)||sn(r,c)&&o.has.call(i,r)||sn(l,c)&&o.has.call(i,l)||(i.add(c),Tn(i,"add",c,c)),this},set(r,i){!e&&!Dt(i)&&!un(i)&&(i=we(i));const o=we(this),{has:l,get:c}=uo(o);let u=l.call(o,r);u||(r=we(r),u=l.call(o,r));const d=c.call(o,r);return o.set(r,i),u?sn(i,d)&&Tn(o,"set",r,i):Tn(o,"add",r,i),this},delete(r){const i=we(this),{has:o,get:l}=uo(i);let c=o.call(i,r);c||(r=we(r),c=o.call(i,r)),l&&l.call(i,r);const u=i.delete(r);return c&&Tn(i,"delete",r,void 0),u},clear(){const r=we(this),i=r.size!==0,o=r.clear();return i&&Tn(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=zy(r,t,e)}),n}function Nc(t,e){const n=qy(t,e);return(s,r,i)=>r==="__v_isReactive"?!t:r==="__v_isReadonly"?t:r==="__v_raw"?s:Reflect.get(xe(n,r)&&r in s?n:s,r,i)}const Hy={get:Nc(!1,!1)},Wy={get:Nc(!1,!0)},Ky={get:Nc(!0,!1)};const yp=new WeakMap,vp=new WeakMap,wp=new WeakMap,Gy=new WeakMap;function Qy(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ba(t){return un(t)?t:Dc(t,!1,$y,Hy,yp)}function Jy(t){return Dc(t,!1,jy,Wy,vp)}function Kl(t){return Dc(t,!0,By,Ky,wp)}function Dc(t,e,n,s,r){if(!Se(t)||t.__v_raw&&!(e&&t.__v_isReactive)||t.__v_skip||!Object.isExtensible(t))return t;const i=r.get(t);if(i)return i;const o=Qy(yy(t));if(o===0)return t;const l=new Proxy(t,o===2?s:n);return r.set(t,l),l}function on(t){return un(t)?on(t.__v_raw):!!(t&&t.__v_isReactive)}function un(t){return!!(t&&t.__v_isReadonly)}function Dt(t){return!!(t&&t.__v_isShallow)}function Ta(t){return t?!!t.__v_raw:!1}function we(t){const e=t&&t.__v_raw;return e?we(e):t}function Vc(t){return!xe(t,"__v_skip")&&Object.isExtensible(t)&&ep(t,"__v_skip",!0),t}const qt=t=>Se(t)?ba(t):t,rs=t=>Se(t)?Kl(t):t;function Be(t){return t?t.__v_isRef===!0:!1}function je(t){return Yy(t,!1)}function Yy(t,e){return Be(t)?t:new Xy(t,e)}class Xy{constructor(e,n){this.dep=new Mc,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:we(e),this._value=n?e:qt(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,s=this.__v_isShallow||Dt(e)||un(e);e=s?e:we(e),sn(e,n)&&(this._rawValue=e,this._value=s?e:qt(e),this.dep.trigger())}}function k(t){return Be(t)?t.value:t}const Zy={get:(t,e,n)=>e==="__v_raw"?t:k(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const r=t[e];return Be(r)&&!Be(n)?(r.value=n,!0):Reflect.set(t,e,n,s)}};function bp(t){return on(t)?t:new Proxy(t,Zy)}function e0(t){const e=se(t)?new Array(t.length):{};for(const n in t)e[n]=n0(t,n);return e}class t0{constructor(e,n,s){this._object=e,this._defaultValue=s,this.__v_isRef=!0,this._value=void 0,this._key=zt(n)?n:String(n),this._raw=we(e);let r=!0,i=e;if(!se(e)||zt(this._key)||!ga(this._key))do r=!Ta(i)||Dt(i);while(r&&(i=i.__v_raw));this._shallow=r}get value(){let e=this._object[this._key];return this._shallow&&(e=k(e)),this._value=e===void 0?this._defaultValue:e}set value(e){if(this._shallow&&Be(this._raw[this._key])){const n=this._object[this._key];if(Be(n)){n.value=e;return}}this._object[this._key]=e}get dep(){return Dy(this._raw,this._key)}}function n0(t,e,n){return new t0(t,e,n)}class s0{constructor(e,n,s){this.fn=e,this.setter=n,this._value=void 0,this.dep=new Mc(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=fi-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&Me!==this)return cp(this,!0),!0}get value(){const e=this.dep.track();return dp(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function r0(t,e,n=!1){let s,r;return pe(t)?s=t:(s=t.get,r=t.set),new s0(s,r,n)}const fo={},Vo=new WeakMap;let Es;function i0(t,e=!1,n=Es){if(n){let s=Vo.get(n);s||Vo.set(n,s=[]),s.push(t)}}function o0(t,e,n=Pe){const{immediate:s,deep:r,once:i,scheduler:o,augmentJob:l,call:c}=n,u=q=>r?q:Dt(q)||r===!1||r===0?In(q,1):In(q);let d,p,y,E,x=!1,P=!1;if(Be(t)?(p=()=>t.value,x=Dt(t)):on(t)?(p=()=>u(t),x=!0):se(t)?(P=!0,x=t.some(q=>on(q)||Dt(q)),p=()=>t.map(q=>{if(Be(q))return q.value;if(on(q))return u(q);if(pe(q))return c?c(q,2):q()})):pe(t)?e?p=c?()=>c(t,2):t:p=()=>{if(y){Rn();try{y()}finally{Cn()}}const q=Es;Es=d;try{return c?c(t,3,[E]):t(E)}finally{Es=q}}:p=rn,e&&r){const q=p,K=r===!0?1/0:r;p=()=>In(q(),K)}const V=op(),X=()=>{d.stop(),V&&V.active&&Rc(V.effects,d)};if(i&&e){const q=e;e=(...K)=>{const B=q(...K);return X(),B}}let Q=P?new Array(t.length).fill(fo):fo;const Y=q=>{if(!(!(d.flags&1)||!d.dirty&&!q))if(e){const K=d.run();if(q||r||x||(P?K.some((B,S)=>sn(B,Q[S])):sn(K,Q))){y&&y();const B=Es;Es=d;try{const S=[K,Q===fo?void 0:P&&Q[0]===fo?[]:Q,E];Q=K,c?c(e,3,S):e(...S)}finally{Es=B}}}else d.run()};return l&&l(Y),d=new ap(p),d.scheduler=o?()=>o(Y,!1):Y,E=q=>i0(q,!1,d),y=d.onStop=()=>{const q=Vo.get(d);if(q){if(c)c(q,4);else for(const K of q)K();Vo.delete(d)}},e?s?Y(!0):Q=d.run():o?o(Y.bind(null,!0),!0):d.run(),X.pause=d.pause.bind(d),X.resume=d.resume.bind(d),X.stop=X,X}function In(t,e=1/0,n){if(e<=0||!Se(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,Be(t))In(t.value,e,n);else if(se(t))for(let s=0;s<t.length;s++)In(t[s],e,n);else if(Os(t)||Jn(t))t.forEach(s=>{In(s,e,n)});else if(Xf(t)){for(const s in t)In(t[s],e,n);for(const s of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,s)&&In(t[s],e,n)}return t}/**
* @vue/runtime-core v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ni(t,e,n,s){try{return s?t(...s):t()}catch(r){Ia(r,e,n)}}function Ht(t,e,n,s){if(pe(t)){const r=Ni(t,e,n,s);return r&&Jf(r)&&r.catch(i=>{Ia(i,e,n)}),r}if(se(t)){const r=[];for(let i=0;i<t.length;i++)r.push(Ht(t[i],e,n,s));return r}}function Ia(t,e,n,s=!0){const r=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||Pe;if(e){let l=e.parent;const c=e.proxy,u=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){const d=l.ec;if(d){for(let p=0;p<d.length;p++)if(d[p](t,c,u)===!1)return}l=l.parent}if(i){Rn(),Ni(i,null,10,[t,c,u]),Cn();return}}a0(t,n,r,s,o)}function a0(t,e,n,s=!0,r=!1){if(r)throw t;console.error(t)}const It=[];let en=-1;const lr=[];let zn=null,nr=0;const Tp=Promise.resolve();let Oo=null;function Oc(t){const e=Oo||Tp;return t?e.then(this?t.bind(this):t):e}function l0(t){let e=en+1,n=It.length;for(;e<n;){const s=e+n>>>1,r=It[s],i=mi(r);i<t||i===t&&r.flags&2?e=s+1:n=s}return e}function Lc(t){if(!(t.flags&1)){const e=mi(t),n=It[It.length-1];!n||!(t.flags&2)&&e>=mi(n)?It.push(t):It.splice(l0(e),0,t),t.flags|=1,Ip()}}function Ip(){Oo||(Oo=Tp.then(Ap))}function c0(t){if(!se(t))zn&&t.id===-1?zn.splice(nr+1,0,t):t.flags&1||(lr.push(t),t.flags|=1);else for(let e=0;e<t.length;e++)lr.push(t[e]);Ip()}function Hh(t,e,n=en+1){for(;n<It.length;n++){const s=It[n];if(s&&s.flags&2){if(t&&s.id!==t.uid)continue;It.splice(n,1),n--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function Ep(t){if(lr.length){const e=[...new Set(lr)].sort((n,s)=>mi(n)-mi(s));if(lr.length=0,zn){for(let n=0;n<e.length;n++)zn.push(e[n]);return}for(zn=e,nr=0;nr<zn.length;nr++){const n=zn[nr];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}zn=null,nr=0}}const mi=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Ap(t){try{for(en=0;en<It.length;en++){const e=It[en];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Ni(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;en<It.length;en++){const e=It[en];e&&(e.flags&=-2)}en=-1,It.length=0,Ep(),Oo=null,(It.length||lr.length)&&Ap()}}let Bt=null,xp=null;function Lo(t){const e=Bt;return Bt=t,xp=t&&t.type.__scopeId||null,e}function Sp(t,e=Bt,n){if(!e||t._n)return t;const s=(...r)=>{s._d&&Bo(-1);const i=Lo(e),o=Ds.length;let l;try{l=t(...r)}finally{for(let c=Ds.length;c>o;c--)nm();Lo(i),s._d&&Bo(1)}return l};return s._n=!0,s._c=!0,s._d=!0,s}function Le(t,e){if(Bt===null)return t;const n=Ca(Bt),s=t.dirs||(t.dirs=[]);for(let r=0;r<e.length;r++){let[i,o,l,c=Pe]=e[r];i&&(pe(i)&&(i={mounted:i,updated:i}),i.deep&&In(o),s.push({dir:i,instance:n,value:o,oldValue:void 0,arg:l,modifiers:c}))}return t}function ws(t,e,n,s){const r=t.dirs,i=e&&e.dirs;for(let o=0;o<r.length;o++){const l=r[o];i&&(l.oldValue=i[o].value);let c=l.dir[s];c&&(Rn(),Ht(c,n,8,[t.el,l,t,e]),Cn())}}function u0(t,e){if(At){let n=At.provides;const s=At.parent&&At.parent.provides;s===n&&(n=At.provides=Object.create(s)),n[t]=e}}function ei(t,e,n=!1){const s=Bc();if(s||Ns){let r=Ns?Ns._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(r&&t in r)return r[t];if(arguments.length>1)return n&&pe(e)?e.call(s&&s.proxy):e}}function h0(){return!!(Bc()||Ns)}const d0=Symbol.for("v-scx"),f0=()=>ei(d0);function cr(t,e,n){return Rp(t,e,n)}function Rp(t,e,n=Pe){const{immediate:s,deep:r,flush:i,once:o}=n,l=st({},n),c=e&&s||!e&&i!=="post";let u;if(wi){if(i==="sync"){const E=f0();u=E.__watcherHandles||(E.__watcherHandles=[])}else if(!c){const E=()=>{};return E.stop=rn,E.resume=rn,E.pause=rn,E}}const d=At;l.call=(E,x,P)=>Ht(E,d,x,P);let p=!1;i==="post"?l.scheduler=E=>{Rt(E,d&&d.suspense)}:i!=="sync"&&(p=!0,l.scheduler=(E,x)=>{x?E():Lc(E)}),l.augmentJob=E=>{e&&(E.flags|=4),p&&(E.flags|=2,d&&(E.id=d.uid,E.i=d))};const y=o0(t,e,l);return wi&&(u?u.push(y):c&&y()),y}function p0(t,e,n){const s=this.proxy,r=Fe(t)?t.includes(".")?Cp(s,t):()=>s[t]:t.bind(s,s);let i;pe(e)?i=e:(i=e.handler,n=e);const o=Di(this),l=Rp(r,i.bind(s),n);return o(),l}function Cp(t,e){const n=e.split(".");return()=>{let s=t;for(let r=0;r<n.length&&s;r++)s=s[n[r]];return s}}const m0=Symbol("_vte"),Ea=t=>t.__isTeleport,$t=Symbol("_leaveCb"),jr=Symbol("_enterCb");function g0(){const t={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Fc(()=>{t.isMounted=!0}),Lp(()=>{t.isUnmounting=!0}),t}const Ut=[Function,Array],Pp={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Ut,onEnter:Ut,onAfterEnter:Ut,onEnterCancelled:Ut,onBeforeLeave:Ut,onLeave:Ut,onAfterLeave:Ut,onLeaveCancelled:Ut,onBeforeAppear:Ut,onAppear:Ut,onAfterAppear:Ut,onAppearCancelled:Ut},kp=t=>{const e=t.subTree;return e.component?kp(e.component):e},_0={name:"BaseTransition",props:Pp,setup(t,{slots:e}){const n=Bc(),s=g0();return()=>{const r=e.default&&Dp(e.default(),!0),i=r&&r.length?Mp(r):n.subTree?yt():void 0;if(!i)return;const o=we(t),{mode:l}=o;if(s.isLeaving)return Tl(i);const c=Fo(i);if(!c)return Tl(i);let u=Gl(c,o,s,n,p=>u=p);c.type!==Et&&gi(c,u);let d=n.subTree&&Fo(n.subTree);if(d&&d.type!==Et&&!xs(d,c)&&kp(n).type!==Et){let p=Gl(d,o,s,n);if(gi(d,p),l==="out-in"&&c.type!==Et)return s.isLeaving=!0,p.afterLeave=()=>{s.isLeaving=!1,n.job.flags&8||n.update(),delete p.afterLeave,d=void 0},Tl(i);l==="in-out"&&c.type!==Et?p.delayLeave=(y,E,x)=>{const P=Np(s,d);P[String(d.key)]=d,y[$t]=()=>{E(),y[$t]=void 0,delete u.delayedLeave,d=void 0},u.delayedLeave=()=>{x(),delete u.delayedLeave,d=void 0}}:d=void 0}else d&&(d=void 0);return i}}};function Mp(t){let e=t[0];if(t.length>1){for(const n of t)if(n.type!==Et){e=n;break}}return e}const y0=_0;function Np(t,e){const{leavingVNodes:n}=t;let s=n.get(e.type);return s||(s=Object.create(null),n.set(e.type,s)),s}function Gl(t,e,n,s,r){const{appear:i,mode:o,persisted:l=!1,onBeforeEnter:c,onEnter:u,onAfterEnter:d,onEnterCancelled:p,onBeforeLeave:y,onLeave:E,onAfterLeave:x,onLeaveCancelled:P,onBeforeAppear:V,onAppear:X,onAfterAppear:Q,onAppearCancelled:Y}=e,q=String(t.key),K=Np(n,t),B=(_,T)=>{_&&Ht(_,s,9,T)},S=(_,T)=>{const A=T[1];B(_,T),se(_)?_.every(I=>I.length<=1)&&A():_.length<=1&&A()},v={mode:o,persisted:l,beforeEnter(_){let T=c;if(!n.isMounted)if(i)T=V||c;else return;_[$t]&&_[$t](!0);const A=K[q];A&&xs(t,A)&&A.el[$t]&&A.el[$t](),B(T,[_])},enter(_){if(K[q]===t)return;let T=u,A=d,I=p;if(!n.isMounted)if(i)T=X||u,A=Q||d,I=Y||p;else return;let w=!1;_[jr]=rt=>{w||(w=!0,rt?B(I,[_]):B(A,[_]),v.delayedLeave&&v.delayedLeave(),_[jr]=void 0)};const Re=_[jr].bind(null,!1);T?S(T,[_,Re]):Re()},leave(_,T){const A=String(t.key);if(_[jr]&&_[jr](!0),n.isUnmounting)return T();B(y,[_]);let I=!1;_[$t]=Re=>{I||(I=!0,T(),Re?B(P,[_]):B(x,[_]),_[$t]=void 0,K[A]===t&&delete K[A])};const w=_[$t].bind(null,!1);K[A]=t,E?S(E,[_,w]):w()},clone(_){const T=Gl(_,e,n,s,r);return r&&r(T),T}};return v}function Tl(t){if(Aa(t))return t=is(t),t.children=null,t}function Fo(t){if(!Aa(t))return Ea(t.type)&&t.children?Mp(t.children):t;if(t.component)return t.component.subTree;const{shapeFlag:e,children:n}=t;if(n){if(e&16)return n[0];if(e&32&&pe(n.default))return n.default()}}function gi(t,e){if(t.shapeFlag&6&&t.component){t.transition=e;const n=t.component.subTree;gi(Ea(n.type)&&Fo(n)||n,e)}else t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function Dp(t,e=!1,n){let s=[],r=0;for(let i=0;i<t.length;i++){let o=t[i];const l=n==null?o.key:String(n)+String(o.key!=null?o.key:i);o.type===_t?(o.patchFlag&128&&r++,s=s.concat(Dp(o.children,e,l))):(e||o.type!==Et)&&s.push(l!=null?is(o,{key:l}):o)}if(r>1)for(let i=0;i<s.length;i++)s[i].patchFlag=-2;return s}function Vp(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function Wh(t,e){let n;return!!((n=Object.getOwnPropertyDescriptor(t,e))&&!n.configurable)}const Uo=new WeakMap;function ti(t,e,n,s,r=!1){if(se(t)){t.forEach((P,V)=>ti(P,e&&(se(e)?e[V]:e),n,s,r));return}if(ni(s)&&!r){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&ti(t,e,n,s.component.subTree);return}const i=s.shapeFlag&4?Ca(s.component):s.el,o=r?null:i,{i:l,r:c}=t,u=e&&e.r,d=l.refs===Pe?l.refs={}:l.refs,p=l.setupState,y=we(p),E=p===Pe?Qf:P=>Wh(d,P)?!1:xe(y,P),x=(P,V)=>!(V&&Wh(d,V));if(u!=null&&u!==c){if(Kh(e),Fe(u))d[u]=null,E(u)&&(p[u]=null);else if(Be(u)){const P=e;x(u,P.k)&&(u.value=null),P.k&&(d[P.k]=null)}}if(pe(c))Ni(c,l,12,[o,d]);else{const P=Fe(c),V=Be(c);if(P||V){const X=()=>{if(t.f){const Q=P?E(c)?p[c]:d[c]:x()||!t.k?c.value:d[t.k];if(r)se(Q)&&Rc(Q,i);else if(se(Q))Q.includes(i)||Q.push(i);else if(P)d[c]=[i],E(c)&&(p[c]=d[c]);else{const Y=[i];x(c,t.k)&&(c.value=Y),t.k&&(d[t.k]=Y)}}else P?(d[c]=o,E(c)&&(p[c]=o)):V&&(x(c,t.k)&&(c.value=o),t.k&&(d[t.k]=o))};if(o){const Q=()=>{X(),Uo.delete(t)};Q.id=-1,Uo.set(t,Q),Rt(Q,n)}else Kh(t),X()}}}function Kh(t){const e=Uo.get(t);e&&(e.flags|=8,Uo.delete(t))}va().requestIdleCallback;va().cancelIdleCallback;const ni=t=>!!t.type.__asyncLoader,Aa=t=>t.type.__isKeepAlive;function v0(t,e){Op(t,"a",e)}function w0(t,e){Op(t,"da",e)}function Op(t,e,n=At){const s=t.__wdc||(t.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return t()});if(xa(e,s,n),n){let r=n.parent;for(;r&&r.parent;)Aa(r.parent.vnode)&&b0(s,e,n,r),r=r.parent}}function b0(t,e,n,s){const r=xa(e,t,s,!0);Fp(()=>{Rc(s[e],r)},n)}function xa(t,e,n=At,s=!1){if(n){const r=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{Rn();const l=Di(n),c=Ht(e,n,t,o);return l(),Cn(),c});return s?r.unshift(i):r.push(i),i}}const Vn=t=>(e,n=At)=>{(!wi||t==="sp")&&xa(t,(...s)=>e(...s),n)},T0=Vn("bm"),Fc=Vn("m"),I0=Vn("bu"),E0=Vn("u"),Lp=Vn("bum"),Fp=Vn("um"),A0=Vn("sp"),x0=Vn("rtg"),S0=Vn("rtc");function R0(t,e=At){xa("ec",t,e)}const C0=Symbol.for("v-ndc");function _i(t,e,n,s){let r;const i=n,o=se(t);if(o||Fe(t)){const l=o&&on(t);let c=!1,u=!1;l&&(c=!Dt(t),u=un(t),t=wa(t)),r=new Array(t.length);for(let d=0,p=t.length;d<p;d++)r[d]=e(c?u?rs(qt(t[d])):qt(t[d]):t[d],d,void 0,i)}else if(typeof t=="number"){r=new Array(t);for(let l=0;l<t;l++)r[l]=e(l+1,l,void 0,i)}else if(Se(t))if(t[Symbol.iterator])r=Array.from(t,(l,c)=>e(l,c,void 0,i));else{const l=Object.keys(t);r=new Array(l.length);for(let c=0,u=l.length;c<u;c++){const d=l[c];r[c]=e(t[d],d,c,i)}}else r=[];return r}const Ql=t=>t?om(t)?Ca(t):Ql(t.parent):null,si=st(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Ql(t.parent),$root:t=>Ql(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>$p(t),$forceUpdate:t=>t.f||(t.f=()=>{Lc(t.update)}),$nextTick:t=>t.n||(t.n=Oc.bind(t.proxy)),$watch:t=>p0.bind(t)}),Il=(t,e)=>t!==Pe&&!t.__isScriptSetup&&xe(t,e),P0={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:s,data:r,props:i,accessCache:o,type:l,appContext:c}=t;if(e[0]!=="$"){const y=o[e];if(y!==void 0)switch(y){case 1:return s[e];case 2:return r[e];case 4:return n[e];case 3:return i[e]}else{if(Il(s,e))return o[e]=1,s[e];if(r!==Pe&&xe(r,e))return o[e]=2,r[e];if(xe(i,e))return o[e]=3,i[e];if(n!==Pe&&xe(n,e))return o[e]=4,n[e];Jl&&(o[e]=0)}}const u=si[e];let d,p;if(u)return e==="$attrs"&&gt(t.attrs,"get",""),u(t);if((d=l.__cssModules)&&(d=d[e]))return d;if(n!==Pe&&xe(n,e))return o[e]=4,n[e];if(p=c.config.globalProperties,xe(p,e))return p[e]},set({_:t},e,n){const{data:s,setupState:r,ctx:i}=t;return Il(r,e)?(r[e]=n,!0):s!==Pe&&xe(s,e)?(s[e]=n,!0):xe(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:s,appContext:r,props:i,type:o}},l){let c;return!!(n[l]||t!==Pe&&l[0]!=="$"&&xe(t,l)||Il(e,l)||xe(i,l)||xe(s,l)||xe(si,l)||xe(r.config.globalProperties,l)||(c=o.__cssModules)&&c[l])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:xe(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function Gh(t){return se(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Jl=!0;function k0(t){const e=$p(t),n=t.proxy,s=t.ctx;Jl=!1,e.beforeCreate&&Qh(e.beforeCreate,t,"bc");const{data:r,computed:i,methods:o,watch:l,provide:c,inject:u,created:d,beforeMount:p,mounted:y,beforeUpdate:E,updated:x,activated:P,deactivated:V,beforeDestroy:X,beforeUnmount:Q,destroyed:Y,unmounted:q,render:K,renderTracked:B,renderTriggered:S,errorCaptured:v,serverPrefetch:_,expose:T,inheritAttrs:A,components:I,directives:w,filters:Re}=e;if(u&&M0(u,s,null),o)for(const fe in o){const Ie=o[fe];pe(Ie)&&(s[fe]=Ie.bind(n))}if(r){const fe=r.call(n,n);Se(fe)&&(t.data=ba(fe))}if(Jl=!0,i)for(const fe in i){const Ie=i[fe],Wt=pe(Ie)?Ie.bind(n,n):pe(Ie.get)?Ie.get.bind(n,n):rn,fs=!pe(Ie)&&pe(Ie.set)?Ie.set.bind(n):rn,pn=os({get:Wt,set:fs});Object.defineProperty(s,fe,{enumerable:!0,configurable:!0,get:()=>pn.value,set:He=>pn.value=He})}if(l)for(const fe in l)Up(l[fe],s,n,fe);if(c){const fe=pe(c)?c.call(n):c;Reflect.ownKeys(fe).forEach(Ie=>{u0(Ie,fe[Ie])})}d&&Qh(d,t,"c");function ke(fe,Ie){se(Ie)?Ie.forEach(Wt=>fe(Wt.bind(n))):Ie&&fe(Ie.bind(n))}if(ke(T0,p),ke(Fc,y),ke(I0,E),ke(E0,x),ke(v0,P),ke(w0,V),ke(R0,v),ke(S0,B),ke(x0,S),ke(Lp,Q),ke(Fp,q),ke(A0,_),se(T))if(T.length){const fe=t.exposed||(t.exposed={});T.forEach(Ie=>{Object.defineProperty(fe,Ie,{get:()=>n[Ie],set:Wt=>n[Ie]=Wt,enumerable:!0})})}else t.exposed||(t.exposed={});K&&t.render===rn&&(t.render=K),A!=null&&(t.inheritAttrs=A),I&&(t.components=I),w&&(t.directives=w),_&&Vp(t)}function M0(t,e,n=rn){se(t)&&(t=Yl(t));for(const s in t){const r=t[s];let i;Se(r)?"default"in r?i=ei(r.from||s,r.default,!0):i=ei(r.from||s):i=ei(r),Be(i)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[s]=i}}function Qh(t,e,n){Ht(se(t)?t.map(s=>s.bind(e.proxy)):t.bind(e.proxy),e,n)}function Up(t,e,n,s){let r=s.includes(".")?Cp(n,s):()=>n[s];if(Fe(t)){const i=e[t];pe(i)&&cr(r,i)}else if(pe(t))cr(r,t.bind(n));else if(Se(t))if(se(t))t.forEach(i=>Up(i,e,n,s));else{const i=pe(t.handler)?t.handler.bind(n):e[t.handler];pe(i)&&cr(r,i,t)}}function $p(t){const e=t.type,{mixins:n,extends:s}=e,{mixins:r,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,l=i.get(e);let c;return l?c=l:!r.length&&!n&&!s?c=e:(c={},r.length&&r.forEach(u=>$o(c,u,o,!0)),$o(c,e,o)),Se(e)&&i.set(e,c),c}function $o(t,e,n,s=!1){const{mixins:r,extends:i}=e;i&&$o(t,i,n,!0),r&&r.forEach(o=>$o(t,o,n,!0));for(const o in e)if(!(s&&o==="expose")){const l=N0[o]||n&&n[o];t[o]=l?l(t[o],e[o]):e[o]}return t}const N0={data:Jh,props:Yh,emits:Yh,methods:Wr,computed:Wr,beforeCreate:bt,created:bt,beforeMount:bt,mounted:bt,beforeUpdate:bt,updated:bt,beforeDestroy:bt,beforeUnmount:bt,destroyed:bt,unmounted:bt,activated:bt,deactivated:bt,errorCaptured:bt,serverPrefetch:bt,components:Wr,directives:Wr,watch:V0,provide:Jh,inject:D0};function Jh(t,e){return e?t?function(){return st(pe(t)?t.call(this,this):t,pe(e)?e.call(this,this):e)}:e:t}function D0(t,e){return Wr(Yl(t),Yl(e))}function Yl(t){if(se(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function bt(t,e){return t?[...new Set([].concat(t,e))]:e}function Wr(t,e){return t?st(Object.create(null),t,e):e}function Yh(t,e){return t?se(t)&&se(e)?[...new Set([...t,...e])]:st(Object.create(null),Gh(t),Gh(e??{})):e}function V0(t,e){if(!t)return e;if(!e)return t;const n=st(Object.create(null),t);for(const s in e)n[s]=bt(t[s],e[s]);return n}function Bp(){return{app:null,config:{isNativeTag:Qf,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let O0=0;function L0(t,e){return function(s,r=null){pe(s)||(s=st({},s)),r!=null&&!Se(r)&&(r=null);const i=Bp(),o=new WeakSet,l=[];let c=!1;const u=i.app={_uid:O0++,_component:s,_props:r,_container:null,_context:i,_instance:null,version:fv,get config(){return i.config},set config(d){},use(d,...p){return o.has(d)||(d&&pe(d.install)?(o.add(d),d.install(u,...p)):pe(d)&&(o.add(d),d(u,...p))),u},mixin(d){return i.mixins.includes(d)||i.mixins.push(d),u},component(d,p){return p?(i.components[d]=p,u):i.components[d]},directive(d,p){return p?(i.directives[d]=p,u):i.directives[d]},mount(d,p,y){if(!c){const E=u._ceVNode||ne(s,r);return E.appContext=i,y===!0?y="svg":y===!1&&(y=void 0),t(E,d,y),c=!0,u._container=d,d.__vue_app__=u,Ca(E.component)}},onUnmount(d){l.push(d)},unmount(){c&&(Ht(l,u._instance,16),t(null,u._container),delete u._container.__vue_app__)},provide(d,p){return i.provides[d]=p,u},runWithContext(d){const p=Ns;Ns=u;try{return d()}finally{Ns=p}}};return u}}let Ns=null;const F0=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${Gt(e)}Modifiers`]||t[`${qs(e)}Modifiers`];function U0(t,e,...n){if(t.isUnmounted)return;const s=t.vnode.props||Pe;let r=n;const i=e.startsWith("update:"),o=i&&F0(s,e.slice(7));o&&(o.trim&&(r=n.map(d=>Fe(d)?d.trim():d)),o.number&&(r=r.map(ya)));let l,c=s[l=_l(e)]||s[l=_l(Gt(e))];!c&&i&&(c=s[l=_l(qs(e))]),c&&Ht(c,t,6,r);const u=s[l+"Once"];if(u){if(!t.emitted)t.emitted={};else if(t.emitted[l])return;t.emitted[l]=!0,Ht(u,t,6,r)}}const $0=new WeakMap;function jp(t,e,n=!1){const s=n?$0:e.emitsCache,r=s.get(t);if(r!==void 0)return r;const i=t.emits;let o={},l=!1;if(!pe(t)){const c=u=>{const d=jp(u,e,!0);d&&(l=!0,st(o,d))};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}return!i&&!l?(Se(t)&&s.set(t,null),null):(se(i)?i.forEach(c=>o[c]=null):st(o,i),Se(t)&&s.set(t,o),o)}function Sa(t,e){return!t||!pa(e)?!1:(e=e.slice(2),e=e==="Once"?e:e.replace(/Once$/,""),xe(t,e[0].toLowerCase()+e.slice(1))||xe(t,qs(e))||xe(t,e))}function Xh(t){const{type:e,vnode:n,proxy:s,withProxy:r,propsOptions:[i],slots:o,attrs:l,emit:c,render:u,renderCache:d,props:p,data:y,setupState:E,ctx:x,inheritAttrs:P}=t,V=Lo(t);let X,Q;try{if(n.shapeFlag&4){const q=r||s,K=q;X=nn(u.call(K,q,d,p,E,y,x)),Q=l}else{const q=e;X=nn(q.length>1?q(p,{attrs:l,slots:o,emit:c}):q(p,null)),Q=e.props?l:B0(l)}}catch(q){Ds.length=0,Ia(q,t,1),X=ne(Et)}let Y=X;if(Q&&P!==!1){const q=Object.keys(Q),{shapeFlag:K}=Y;q.length&&K&7&&(i&&q.some(ma)&&(Q=j0(Q,i)),Y=is(Y,Q,!1,!0))}if(n.dirs&&(Y=is(Y,null,!1,!0),Y.dirs=Y.dirs?Y.dirs.concat(n.dirs):n.dirs),n.transition){const q=Ea(Y.type)&&Fo(Y)||Y;gi(q,n.transition)}return X=Y,Lo(V),X}const B0=t=>{let e;for(const n in t)(n==="class"||n==="style"||pa(n))&&((e||(e={}))[n]=t[n]);return e},j0=(t,e)=>{const n={};for(const s in t)(!ma(s)||!(s.slice(9)in e))&&(n[s]=t[s]);return n};function z0(t,e,n){const{props:s,children:r,component:i}=t,{props:o,children:l,patchFlag:c}=e,u=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return s?Zh(s,o,u):!!o;if(c&8){const d=e.dynamicProps;for(let p=0;p<d.length;p++){const y=d[p];if(zp(o,s,y)&&!Sa(u,y))return!0}}}else return(r||l)&&(!l||!l.$stable)?!0:s===o?!1:s?o?Zh(s,o,u):!0:!!o;return!1}function Zh(t,e,n){const s=Object.keys(e);if(s.length!==Object.keys(t).length)return!0;for(let r=0;r<s.length;r++){const i=s[r];if(zp(e,t,i)&&!Sa(n,i))return!0}return!1}function zp(t,e,n){const s=t[n],r=e[n];return n==="style"&&Se(s)&&Se(r)?!ss(s,r):s!==r}function q0({vnode:t,parent:e,suspense:n},s){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.suspense.vnode.el=r.el=s,t=r),r===t)(t=e.vnode).el=s,e=e.parent;else break}n&&n.activeBranch===t&&(n.vnode.el=s)}const qp={},Hp=()=>Object.create(qp),Wp=t=>Object.getPrototypeOf(t)===qp;function H0(t,e,n,s=!1){const r={},i=Hp();t.propsDefaults=Object.create(null),Kp(t,e,r,i);for(const o in t.propsOptions[0])o in r||(r[o]=void 0);n?t.props=s?r:Jy(r):t.type.props?t.props=r:t.props=i,t.attrs=i}function W0(t,e,n,s){const{props:r,attrs:i,vnode:{patchFlag:o}}=t,l=we(r),[c]=t.propsOptions;let u=!1;if((s||o>0)&&!(o&16)){if(o&8){const d=t.vnode.dynamicProps;for(let p=0;p<d.length;p++){let y=d[p];if(Sa(t.emitsOptions,y))continue;const E=e[y];if(c)if(xe(i,y))E!==i[y]&&(i[y]=E,u=!0);else{const x=Gt(y);r[x]=Xl(c,l,x,E,t,!1)}else E!==i[y]&&(i[y]=E,u=!0)}}}else{Kp(t,e,r,i)&&(u=!0);let d;for(const p in l)(!e||!xe(e,p)&&((d=qs(p))===p||!xe(e,d)))&&(c?n&&(n[p]!==void 0||n[d]!==void 0)&&(r[p]=Xl(c,l,p,void 0,t,!0)):delete r[p]);if(i!==l)for(const p in i)(!e||!xe(e,p))&&(delete i[p],u=!0)}u&&Tn(t.attrs,"set","")}function Kp(t,e,n,s){const[r,i]=t.propsOptions;let o=!1,l;if(e)for(let c in e){if(Yr(c))continue;const u=e[c];let d;r&&xe(r,d=Gt(c))?!i||!i.includes(d)?n[d]=u:(l||(l={}))[d]=u:Sa(t.emitsOptions,c)||(!(c in s)||u!==s[c])&&(s[c]=u,o=!0)}if(i){const c=we(n),u=l||Pe;for(let d=0;d<i.length;d++){const p=i[d];n[p]=Xl(r,c,p,u[p],t,!xe(u,p))}}return o}function Xl(t,e,n,s,r,i){const o=t[n];if(o!=null){const l=xe(o,"default");if(l&&s===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&pe(c)){const{propsDefaults:u}=r;if(n in u)s=u[n];else{const d=Di(r);s=u[n]=c.call(null,e),d()}}else s=c;r.ce&&r.ce._setProp(n,s)}o[0]&&(i&&!l?s=!1:o[1]&&(s===""||s===qs(n))&&(s=!0))}return s}const K0=new WeakMap;function Gp(t,e,n=!1){const s=n?K0:e.propsCache,r=s.get(t);if(r)return r;const i=t.props,o={},l=[];let c=!1;if(!pe(t)){const d=p=>{c=!0;const[y,E]=Gp(p,e,!0);st(o,y),E&&l.push(...E)};!n&&e.mixins.length&&e.mixins.forEach(d),t.extends&&d(t.extends),t.mixins&&t.mixins.forEach(d)}if(!i&&!c)return Se(t)&&s.set(t,Rs),Rs;if(se(i))for(let d=0;d<i.length;d++){const p=Gt(i[d]);ed(p)&&(o[p]=Pe)}else if(i)for(const d in i){const p=Gt(d);if(ed(p)){const y=i[d],E=o[p]=se(y)||pe(y)?{type:y}:st({},y),x=E.type;let P=!1,V=!0;if(se(x))for(let X=0;X<x.length;++X){const Q=x[X],Y=pe(Q)&&Q.name;if(Y==="Boolean"){P=!0;break}else Y==="String"&&(V=!1)}else P=pe(x)&&x.name==="Boolean";E[0]=P,E[1]=V,(P||xe(E,"default"))&&l.push(p)}}const u=[o,l];return Se(t)&&s.set(t,u),u}function ed(t){return t[0]!=="$"&&!Yr(t)}const Uc=t=>t==="_"||t==="_ctx"||t==="$stable",$c=t=>se(t)?t.map(nn):[nn(t)],G0=(t,e,n)=>{if(e._n)return e;const s=Sp((...r)=>$c(e(...r)),n);return s._c=!1,s},Qp=(t,e,n)=>{const s=t._ctx;for(const r in t){if(Uc(r))continue;const i=t[r];if(pe(i))e[r]=G0(r,i,s);else if(i!=null){const o=$c(i);e[r]=()=>o}}},Jp=(t,e)=>{const n=$c(e);t.slots.default=()=>n},Yp=(t,e,n)=>{for(const s in e)(n||!Uc(s))&&(t[s]=e[s])},Q0=(t,e,n)=>{const s=t.slots=Hp();if(t.vnode.shapeFlag&32){const r=e._;r?(Yp(s,e,n),n&&ep(s,"_",r,!0)):Qp(e,s)}else e&&Jp(t,e)},J0=(t,e,n)=>{const{vnode:s,slots:r}=t;let i=!0,o=Pe;if(s.shapeFlag&32){const l=e._;l?n&&l===1?i=!1:Yp(r,e,n):(i=!e.$stable,Qp(e,r)),o=e}else e&&(Jp(t,e),o={default:1});if(i)for(const l in r)!Uc(l)&&o[l]==null&&delete r[l]},Rt=tv;function Y0(t){return X0(t)}function X0(t,e){const n=va();n.__VUE__=!0;const{insert:s,remove:r,patchProp:i,createElement:o,createText:l,createComment:c,setText:u,setElementText:d,parentNode:p,nextSibling:y,setScopeId:E=rn,insertStaticContent:x}=t,P=(b,R,N,U=null,D=null,L=null,W=void 0,z=null,j=!!R.dynamicChildren)=>{if(b===R)return;b&&!xs(b,R)&&(U=mn(b),He(b,D,L,!0),b=null),R.patchFlag===-2&&(j=!1,R.dynamicChildren=null),R.dynamicChildren&&b&&b.dynamicChildren&&b.dynamicChildren.hasOnce&&(R.dynamicChildren===Rs&&(R.dynamicChildren=[]),R.dynamicChildren.hasOnce=!0);const{type:O,ref:ie,shapeFlag:J}=R;switch(O){case Ra:V(b,R,N,U);break;case Et:X(b,R,N,U);break;case Io:b==null&&Q(R,N,U,W);break;case _t:I(b,R,N,U,D,L,W,z,j);break;default:J&1?K(b,R,N,U,D,L,W,z,j):J&6?w(b,R,N,U,D,L,W,z,j):(J&64||J&128)&&O.process(b,R,N,U,D,L,W,z,j,Xt)}ie!=null&&D?ti(ie,b&&b.ref,L,R||b,!R):ie==null&&b&&b.ref!=null&&ti(b.ref,null,L,b,!0)},V=(b,R,N,U)=>{if(b==null)s(R.el=l(R.children),N,U);else{const D=R.el=b.el;R.children!==b.children&&u(D,R.children)}},X=(b,R,N,U)=>{b==null?s(R.el=c(R.children||""),N,U):R.el=b.el},Q=(b,R,N,U)=>{[b.el,b.anchor]=x(b.children,R,N,U,b.el,b.anchor)},Y=({el:b,anchor:R},N,U)=>{let D;for(;b&&b!==R;)D=y(b),s(b,N,U),b=D;s(R,N,U)},q=({el:b,anchor:R})=>{let N;for(;b&&b!==R;)N=y(b),r(b),b=N;r(R)},K=(b,R,N,U,D,L,W,z,j)=>{if(R.type==="svg"?W="svg":R.type==="math"&&(W="mathml"),b==null)B(R,N,U,D,L,W,z,j);else{const O=b.el&&b.el._isVueCE?b.el:null;try{O&&O._beginPatch(),_(b,R,D,L,W,z,j)}finally{O&&O._endPatch()}}},B=(b,R,N,U,D,L,W,z)=>{let j,O;const{props:ie,shapeFlag:J,transition:te,dirs:le}=b;if(j=b.el=o(b.type,L,ie&&ie.is,ie),J&8?d(j,b.children):J&16&&v(b.children,j,null,U,D,El(b,L),W,z),le&&ws(b,null,U,"created"),S(j,b,b.scopeId,W,U),ie){for(const de in ie)de!=="value"&&!Yr(de)&&i(j,de,null,ie[de],L,U);"value"in ie&&i(j,"value",null,ie.value,L),(O=ie.onVnodeBeforeMount)&&Zt(O,U,b)}le&&ws(b,null,U,"beforeMount");const oe=Z0(D,te);oe&&te.beforeEnter(j),s(j,R,N),((O=ie&&ie.onVnodeMounted)||oe||le)&&Rt(()=>{try{O&&Zt(O,U,b),oe&&te.enter(j),le&&ws(b,null,U,"mounted")}finally{}},D)},S=(b,R,N,U,D)=>{if(N&&E(b,N),U)for(let L=0;L<U.length;L++)E(b,U[L]);if(D){let L=D.subTree;if(R===L||tm(L.type)&&(L.ssContent===R||L.ssFallback===R)){const W=D.vnode;S(b,W,W.scopeId,W.slotScopeIds,D.parent)}}},v=(b,R,N,U,D,L,W,z,j=0)=>{for(let O=j;O<b.length;O++){const ie=b[O]=z?bn(b[O]):nn(b[O]);P(null,ie,R,N,U,D,L,W,z)}},_=(b,R,N,U,D,L,W)=>{const z=R.el=b.el;let{patchFlag:j,dynamicChildren:O,dirs:ie}=R;j|=b.patchFlag&16;const J=b.props||Pe,te=R.props||Pe;let le;if(N&&bs(N,!1),(le=te.onVnodeBeforeUpdate)&&Zt(le,N,R,b),ie&&ws(R,b,N,"beforeUpdate"),N&&bs(N,!0),O&&(!b.dynamicChildren||b.dynamicChildren.length!==O.length)&&(j=0,W=!1,O=null),(J.innerHTML&&te.innerHTML==null||J.textContent&&te.textContent==null)&&d(z,""),O?T(b.dynamicChildren,O,z,N,U,El(R,D),L):W||Ie(b,R,z,null,N,U,El(R,D),L,!1),j>0){if(j&16)A(z,J,te,N,D);else if(j&2&&J.class!==te.class&&i(z,"class",null,te.class,D),j&4&&i(z,"style",J.style,te.style,D),j&8){const oe=R.dynamicProps;for(let de=0;de<oe.length;de++){const ve=oe[de],Oe=J[ve],We=te[ve];(We!==Oe||ve==="value")&&i(z,ve,Oe,We,D,N)}}j&1&&b.children!==R.children&&d(z,R.children)}else!W&&O==null&&A(z,J,te,N,D);((le=te.onVnodeUpdated)||ie)&&Rt(()=>{le&&Zt(le,N,R,b),ie&&ws(R,b,N,"updated")},U)},T=(b,R,N,U,D,L,W)=>{for(let z=0;z<R.length;z++){const j=b[z],O=R[z],ie=j.el&&(j.type===_t||!xs(j,O)||j.shapeFlag&198)?p(j.el):N;P(j,O,ie,null,U,D,L,W,!0)}},A=(b,R,N,U,D)=>{if(R!==N){if(R!==Pe)for(const L in R)!Yr(L)&&!(L in N)&&i(b,L,R[L],null,D,U);for(const L in N){if(Yr(L))continue;const W=N[L],z=R[L];W!==z&&L!=="value"&&i(b,L,z,W,D,U)}"value"in N&&i(b,"value",R.value,N.value,D)}},I=(b,R,N,U,D,L,W,z,j)=>{const O=R.el=b?b.el:l(""),ie=R.anchor=b?b.anchor:l("");let{patchFlag:J,dynamicChildren:te,slotScopeIds:le}=R;le&&(z=z?z.concat(le):le),b==null?(s(O,N,U),s(ie,N,U),v(R.children||[],N,ie,D,L,W,z,j)):J>0&&J&64&&te&&b.dynamicChildren&&b.dynamicChildren.length===te.length?(T(b.dynamicChildren,te,N,D,L,W,z),(R.key!=null||D&&R===D.subTree)&&Xp(b,R,!0)):Ie(b,R,N,ie,D,L,W,z,j)},w=(b,R,N,U,D,L,W,z,j)=>{R.slotScopeIds=z,b==null?R.shapeFlag&512?D.ctx.activate(R,N,U,W,j):Re(R,N,U,D,L,W,j):rt(b,R,j)},Re=(b,R,N,U,D,L,W)=>{const z=b.component=av(b,U,D);if(Aa(b)&&(z.ctx.renderer=Xt),lv(z,!1,W),z.asyncDep){if(D&&D.registerDep(z,ke,W),!b.el){const j=z.subTree=ne(Et);X(null,j,R,N),b.placeholder=j.el}}else ke(z,b,R,N,D,L,W)},rt=(b,R,N)=>{const U=R.component=b.component;if(z0(b,R,N))if(U.asyncDep&&!U.asyncResolved){R.el=b.el,fe(U,R,N);return}else U.next=R,U.update();else R.el=b.el,U.vnode=R},ke=(b,R,N,U,D,L,W)=>{const z=()=>{if(b.isMounted){let{next:J,bu:te,u:le,parent:oe,vnode:de}=b;{const ht=Zp(b);if(ht){J&&(J.el=de.el,fe(b,J,W)),ht.asyncDep.then(()=>{Rt(()=>{b.isUnmounted||O()},D)});return}}let ve=J,Oe;bs(b,!1),J?(J.el=de.el,fe(b,J,W)):J=de,te&&To(te),(Oe=J.props&&J.props.onVnodeBeforeUpdate)&&Zt(Oe,oe,J,de),bs(b,!0);const We=Xh(b),Lt=b.subTree;b.subTree=We,P(Lt,We,p(Lt.el),mn(Lt),b,D,L),J.el=We.el,ve===null&&q0(b,We.el),le&&Rt(le,D),(Oe=J.props&&J.props.onVnodeUpdated)&&Rt(()=>Zt(Oe,oe,J,de),D)}else{let J;const{el:te,props:le}=R,{bm:oe,m:de,parent:ve,root:Oe,type:We}=b,Lt=ni(R);bs(b,!1),oe&&To(oe),!Lt&&(J=le&&le.onVnodeBeforeMount)&&Zt(J,ve,R),bs(b,!0);{Oe.ce&&Oe.ce._hasShadowRoot()&&Oe.ce._injectChildStyle(We,b.parent?b.parent.type:void 0);const ht=b.subTree=Xh(b);P(null,ht,N,U,b,D,L),R.el=ht.el}if(de&&Rt(de,D),!Lt&&(J=le&&le.onVnodeMounted)){const ht=R;Rt(()=>Zt(J,ve,ht),D)}(R.shapeFlag&256||ve&&ni(ve.vnode)&&ve.vnode.shapeFlag&256)&&b.a&&Rt(b.a,D),b.isMounted=!0,R=N=U=null}};b.scope.on();const j=b.effect=new ap(z);b.scope.off();const O=b.update=j.run.bind(j),ie=b.job=j.runIfDirty.bind(j);ie.i=b,ie.id=b.uid,j.scheduler=()=>Lc(ie),bs(b,!0),O()},fe=(b,R,N)=>{R.component=b;const U=b.vnode.props;b.vnode=R,b.next=null,W0(b,R.props,U,N),J0(b,R.children,N),Rn(),Hh(b),Cn()},Ie=(b,R,N,U,D,L,W,z,j=!1)=>{const O=b&&b.children,ie=b?b.shapeFlag:0,J=R.children,{patchFlag:te,shapeFlag:le}=R;if(te>0){if(te&128){fs(O,J,N,U,D,L,W,z,j);return}else if(te&256){Wt(O,J,N,U,D,L,W,z,j);return}}le&8?(ie&16&&ms(O,D,L),J!==O&&d(N,J)):ie&16?le&16?fs(O,J,N,U,D,L,W,z,j):ms(O,D,L,!0):(ie&8&&d(N,""),le&16&&v(J,N,U,D,L,W,z,j))},Wt=(b,R,N,U,D,L,W,z,j)=>{b=b||Rs,R=R||Rs;const O=b.length,ie=R.length,J=Math.min(O,ie);let te;for(te=0;te<J;te++){const le=R[te]=j?bn(R[te]):nn(R[te]);P(b[te],le,N,null,D,L,W,z,j)}O>ie?ms(b,D,L,!0,!1,J):v(R,N,U,D,L,W,z,j,J)},fs=(b,R,N,U,D,L,W,z,j)=>{let O=0;const ie=R.length;let J=b.length-1,te=ie-1;for(;O<=J&&O<=te;){const le=b[O],oe=R[O]=j?bn(R[O]):nn(R[O]);if(xs(le,oe))P(le,oe,N,null,D,L,W,z,j);else break;O++}for(;O<=J&&O<=te;){const le=b[J],oe=R[te]=j?bn(R[te]):nn(R[te]);if(xs(le,oe))P(le,oe,N,null,D,L,W,z,j);else break;J--,te--}if(O>J){if(O<=te){const le=te+1,oe=le<ie?R[le].el:U;for(;O<=te;)P(null,R[O]=j?bn(R[O]):nn(R[O]),N,oe,D,L,W,z,j),O++}}else if(O>te)for(;O<=J;)He(b[O],D,L,!0),O++;else{const le=O,oe=O,de=new Map;for(O=oe;O<=te;O++){const it=R[O]=j?bn(R[O]):nn(R[O]);it.key!=null&&de.set(it.key,O)}let ve,Oe=0;const We=te-oe+1;let Lt=!1,ht=0;const On=new Array(We);for(O=0;O<We;O++)On[O]=0;for(O=le;O<=J;O++){const it=b[O];if(Oe>=We){He(it,D,L,!0);continue}let Ft;if(it.key!=null)Ft=de.get(it.key);else for(ve=oe;ve<=te;ve++)if(On[ve-oe]===0&&xs(it,R[ve])){Ft=ve;break}Ft===void 0?He(it,D,L,!0):(On[Ft-oe]=O+1,Ft>=ht?ht=Ft:Lt=!0,P(it,R[Ft],N,null,D,L,W,z,j),Oe++)}const Rr=Lt?ev(On):Rs;for(ve=Rr.length-1,O=We-1;O>=0;O--){const it=oe+O,Ft=R[it],Gi=R[it+1],Qs=it+1<ie?Gi.el||em(Gi):U;On[O]===0?P(null,Ft,N,Qs,D,L,W,z,j):Lt&&(ve<0||O!==Rr[ve]?pn(Ft,N,Qs,2):ve--)}}},pn=(b,R,N,U,D=null)=>{const{el:L,type:W,transition:z,children:j,shapeFlag:O}=b;if(O&6){pn(b.component.subTree,R,N,U);return}if(O&128){b.suspense.move(R,N,U);return}if(O&64){W.move(b,R,N,Xt);return}if(W===_t){s(L,R,N);for(let J=0;J<j.length;J++)pn(j[J],R,N,U);s(b.anchor,R,N);return}if(W===Io){Y(b,R,N);return}if(U!==2&&O&1&&z)if(U===0)z.persisted&&!L[$t]?s(L,R,N):(z.beforeEnter(L),s(L,R,N),Rt(()=>z.enter(L),D));else{const{leave:J,delayLeave:te,afterLeave:le}=z,oe=()=>{b.ctx.isUnmounted?r(L):s(L,R,N)},de=()=>{const ve=L._isLeaving||!!L[$t];L._isLeaving&&L[$t](!0),z.persisted&&!ve?oe():J(L,()=>{oe(),le&&le()})};te?te(L,oe,de):de()}else s(L,R,N)},He=(b,R,N,U=!1,D=!1)=>{const{type:L,props:W,ref:z,children:j,dynamicChildren:O,shapeFlag:ie,patchFlag:J,dirs:te,cacheIndex:le,memo:oe}=b;if((J===-2||O&&O.hasOnce)&&(D=!1),z!=null&&(Rn(),ti(z,null,N,b,!0),Cn()),le!=null&&(!b.ctx||b.ctx===R)&&(R.renderCache[le]=void 0),ie&256){R.ctx.deactivate(b);return}const de=ie&1&&te,ve=!ni(b);let Oe;if(ve&&(Oe=W&&W.onVnodeBeforeUnmount)&&Zt(Oe,R,b),ie&6)ps(b.component,N,U);else{if(ie&128){b.suspense.unmount(N,U);return}de&&ws(b,null,R,"beforeUnmount"),ie&64?b.type.remove(b,R,N,Xt,U):O&&!O.hasOnce&&(L!==_t||J>0&&J&64)?ms(O,R,N,!1,!0):(L===_t&&J&384||!D&&ie&16)&&ms(j,R,N),U&&Qe(b)}const We=oe!=null&&le==null;(ve&&(Oe=W&&W.onVnodeUnmounted)||de||We)&&Rt(()=>{Oe&&Zt(Oe,R,b),de&&ws(b,null,R,"unmounted"),We&&(b.el=null)},N)},Qe=b=>{const{type:R,el:N,anchor:U,transition:D}=b;if(R===_t){nl(N,U);return}if(R===Io){q(b),D&&!D.persisted&&D.afterLeave&&D.afterLeave();return}const L=()=>{r(N),D&&!D.persisted&&D.afterLeave&&D.afterLeave()};if(b.shapeFlag&1&&D&&!D.persisted){const{leave:W,delayLeave:z}=D,j=()=>W(N,L);z?z(b.el,L,j):j()}else L()},nl=(b,R)=>{let N;for(;b!==R;)N=y(b),r(b),b=N;r(R)},ps=(b,R,N)=>{const{bum:U,scope:D,job:L,subTree:W,um:z,m:j,a:O}=b;td(j),td(O),U&&To(U),D.stop(),L?(L.flags|=8,He(W,b,R,N)):b.vnode.el&&W&&(W.transition=b.vnode.transition,He(W,b,R,N)),z&&Rt(z,R),Rt(()=>{b.isUnmounted=!0},R)},ms=(b,R,N,U=!1,D=!1,L=0)=>{for(let W=L;W<b.length;W++)He(b[W],R,N,U,D)},mn=b=>{if(b.shapeFlag&6)return mn(b.component.subTree);if(b.shapeFlag&128)return b.suspense.next();const R=y(b.anchor||b.el),N=R&&R[m0];return N?y(N):R};let xr=!1;const Ki=(b,R,N)=>{let U;b==null?R._vnode&&(He(R._vnode,null,null,!0),U=R._vnode.component):P(R._vnode||null,b,R,null,null,null,N),R._vnode=b,xr||(xr=!0,Hh(U),Ep(),xr=!1)},Xt={p:P,um:He,m:pn,r:Qe,mt:Re,mc:v,pc:Ie,pbc:T,n:mn,o:t};return{render:Ki,hydrate:void 0,createApp:L0(Ki)}}function El({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function bs({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function Z0(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function Xp(t,e,n=!1){const s=t.children,r=e.children;if(se(s)&&se(r))for(let i=0;i<s.length;i++){const o=s[i];let l=r[i];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=r[i]=bn(r[i]),l.el=o.el),!n&&l.patchFlag!==-2&&Xp(o,l)),l.type===Ra&&(l.patchFlag===-1&&(l=r[i]=bn(l)),l.el=o.el),l.type===Et&&!l.el&&(l.el=o.el)}}function ev(t){const e=t.slice(),n=[0];let s,r,i,o,l;const c=t.length;for(s=0;s<c;s++){const u=t[s];if(u!==0){if(r=n[n.length-1],t[r]<u){e[s]=r,n.push(s);continue}for(i=0,o=n.length-1;i<o;)l=i+o>>1,t[n[l]]<u?i=l+1:o=l;u<t[n[i]]&&(i>0&&(e[s]=n[i-1]),n[i]=s)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function Zp(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Zp(e)}function td(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}function em(t){if(t.placeholder)return t.placeholder;const e=t.component;return e?em(e.subTree):null}const tm=t=>t.__isSuspense;function tv(t,e){e&&e.pendingBranch?se(t)?e.effects.push(...t):e.effects.push(t):c0(t)}const _t=Symbol.for("v-fgt"),Ra=Symbol.for("v-txt"),Et=Symbol.for("v-cmt"),Io=Symbol.for("v-stc"),Ds=[];let Mt=null;function me(t=!1){Ds.push(Mt=t?null:[])}function nm(){Ds.pop(),Mt=Ds[Ds.length-1]||null}let yi=1;function Bo(t,e=!1){yi+=t,t<0&&Mt&&e&&(Mt.hasOnce=!0)}function sm(t){return t.dynamicChildren=yi>0?Mt||Rs:null,nm(),yi>0&&Mt&&Mt.push(t),t}function be(t,e,n,s,r,i){return sm(m(t,e,n,s,r,i,!0))}function Zl(t,e,n,s,r){return sm(ne(t,e,n,s,r,!0))}function jo(t){return t?t.__v_isVNode===!0:!1}function xs(t,e){return t.type===e.type&&t.key===e.key}const rm=({key:t})=>t??null,Eo=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?Fe(t)||Be(t)||pe(t)?{i:Bt,r:t,k:e,f:!!n}:t:null);function m(t,e=null,n=null,s=0,r=null,i=t===_t?0:1,o=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&rm(e),ref:e&&Eo(e),scopeId:xp,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:s,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:Bt};return l?(zo(c,n),i&128&&t.normalize(c)):n&&(c.shapeFlag|=Fe(n)?8:16),yi>0&&!o&&Mt&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&Mt.push(c),c}const ne=nv;function nv(t,e=null,n=null,s=0,r=null,i=!1){if((!t||t===C0)&&(t=Et),jo(t)){const l=is(t,e,!0);return n&&zo(l,n),yi>0&&!i&&Mt&&(l.shapeFlag&6?Mt[Mt.indexOf(t)]=l:Mt.push(l)),l.patchFlag=-2,l}if(dv(t)&&(t=t.__vccOpts),e){e=sv(e);let{class:l,style:c}=e;l&&!Fe(l)&&(e.class=tt(l)),Se(c)&&(Ta(c)&&!se(c)&&(c=st({},c)),e.style=Tt(c))}const o=Fe(t)?1:tm(t)?128:Ea(t)?64:Se(t)?4:pe(t)?2:0;return m(t,e,n,s,r,o,i,!0)}function sv(t){return t?Ta(t)||Wp(t)?st({},t):t:null}function is(t,e,n=!1,s=!1){const{props:r,ref:i,patchFlag:o,children:l,transition:c}=t,u=e?rv(r||{},e):r,d={__v_isVNode:!0,__v_skip:!0,type:t.type,props:u,key:u&&rm(u),ref:e&&e.ref?n&&i?se(i)?i.concat(Eo(e)):[i,Eo(e)]:Eo(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:l,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==_t?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:c,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&is(t.ssContent),ssFallback:t.ssFallback&&is(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce,cacheIndex:t.cacheIndex};return c&&s&&gi(d,c.clone(d)),d}function Ne(t=" ",e=0){return ne(Ra,null,t,e)}function im(t,e){const n=ne(Io,null,t);return n.staticCount=e,n}function yt(t="",e=!1){return e?(me(),Zl(Et,null,t)):ne(Et,null,t)}function nn(t){return t==null||typeof t=="boolean"?ne(Et):se(t)?ne(_t,null,t.slice()):jo(t)?bn(t):ne(Ra,null,String(t))}function bn(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:is(t)}function zo(t,e){let n=0;const{shapeFlag:s}=t;if(e==null)e=null;else if(se(e))n=16;else if(typeof e=="object")if(s&65){const r=e.default;r&&(r._c&&(r._d=!1),zo(t,r()),r._c&&(r._d=!0));return}else{n=32;const r=e._;!r&&!Wp(e)?e._ctx=Bt:r===3&&Bt&&(Bt.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else if(pe(e)){if(s&65){zo(t,{default:e});return}e={default:e,_ctx:Bt},n=32}else e=String(e),s&64?(n=16,e=[Ne(e)]):n=8;t.children=e,t.shapeFlag|=n}function rv(...t){const e={};for(let n=0;n<t.length;n++){const s=t[n];for(const r in s)if(r==="class")e.class!==s.class&&(e.class=tt([e.class,s.class]));else if(r==="style")e.style=Tt([e.style,s.style]);else if(pa(r)){const i=e[r],o=s[r];o&&i!==o&&!(se(i)&&i.includes(o))?e[r]=i?[].concat(i,o):o:o==null&&i==null&&!ma(r)&&(e[r]=o)}else r!==""&&(e[r]=s[r])}return e}function Zt(t,e,n,s=null){Ht(t,e,7,[n,s])}const iv=Bp();let ov=0;function av(t,e,n){const s=t.type,r=(e?e.appContext:t.appContext)||iv,i={uid:ov++,vnode:t,type:s,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new rp(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Gp(s,r),emitsOptions:jp(s,r),emit:null,emitted:null,propsDefaults:Pe,inheritAttrs:s.inheritAttrs,ctx:Pe,data:Pe,props:Pe,attrs:Pe,slots:Pe,refs:Pe,setupState:Pe,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=U0.bind(null,i),t.ce&&t.ce(i),i}let At=null;const Bc=()=>At||Bt;let qo,vi;{const t=va(),e=(n,s)=>{let r;return(r=t[n])||(r=t[n]=[]),r.push(s),i=>{r.length>1?r.forEach(o=>o(i)):r[0](i)}};qo=e("__VUE_INSTANCE_SETTERS__",n=>At=n),vi=e("__VUE_SSR_SETTERS__",n=>wi=n)}const Di=t=>{const e=At;return qo(t),t.scope.on(),()=>{t.scope.off(),qo(e)}},nd=()=>{At&&At.scope.off(),qo(null)};function om(t){return t.vnode.shapeFlag&4}let wi=!1;function lv(t,e=!1,n=!1){e&&vi(e);const{props:s,children:r}=t.vnode,i=om(t);H0(t,s,i,e),Q0(t,r,n||e);const o=i?cv(t,e):void 0;return e&&vi(!1),o}function cv(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,P0);const{setup:s}=n;if(s){Rn();const r=t.setupContext=s.length>1?hv(t):null,i=Di(t),o=Ni(s,t,0,[t.props,r]),l=Jf(o);if(Cn(),i(),(l||t.sp)&&!ni(t)&&Vp(t),l){if(o.then(nd,nd),e)return o.then(c=>{vi(!0);try{sd(t,c,e)}finally{vi(!1)}}).catch(c=>{Ia(c,t,0)});t.asyncDep=o}else sd(t,o)}else am(t)}function sd(t,e,n){pe(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Se(e)&&(t.setupState=bp(e)),am(t)}function am(t,e,n){const s=t.type;t.render||(t.render=s.render||rn);{const r=Di(t);Rn();try{k0(t)}finally{Cn(),r()}}}const uv={get(t,e){return gt(t,"get",""),t[e]}};function hv(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,uv),slots:t.slots,emit:t.emit,expose:e}}function Ca(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(bp(Vc(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in si)return si[n](t)},has(e,n){return n in e||n in si}})):t.proxy}function dv(t){return pe(t)&&"__vccOpts"in t}const os=(t,e)=>r0(t,e,wi);function Ho(t,e,n){try{Bo(-1);const s=arguments.length;return s===2?Se(e)&&!se(e)?jo(e)?ne(t,null,[e]):ne(t,e):ne(t,null,e):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&jo(n)&&(n=[n]),ne(t,e,n))}finally{Bo(1)}}const fv="3.5.43";/**
* @vue/runtime-dom v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ec;const rd=typeof window<"u"&&window.trustedTypes;if(rd)try{ec=rd.createPolicy("vue",{createHTML:t=>t})}catch{}const lm=ec?t=>ec.createHTML(t):t=>t,pv="http://www.w3.org/2000/svg",mv="http://www.w3.org/1998/Math/MathML",wn=typeof document<"u"?document:null,id=wn&&wn.createElement("template"),gv={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,s)=>{const r=e==="svg"?wn.createElementNS(pv,t):e==="mathml"?wn.createElementNS(mv,t):n?wn.createElement(t,{is:n}):wn.createElement(t);return t==="select"&&s&&s.multiple!=null&&r.setAttribute("multiple",s.multiple),r},createText:t=>wn.createTextNode(t),createComment:t=>wn.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>wn.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,s,r,i){const o=n?n.previousSibling:e.lastChild;if(r&&(r===i||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),n),!(r===i||!(r=r.nextSibling)););else{id.innerHTML=lm(s==="svg"?`<svg>${t}</svg>`:s==="mathml"?`<math>${t}</math>`:t);const l=id.content;if(s==="svg"||s==="mathml"){const c=l.firstChild;for(;c.firstChild;)l.appendChild(c.firstChild);l.removeChild(c)}e.insertBefore(l,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},$n="transition",zr="animation",bi=Symbol("_vtc"),cm={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},_v=st({},Pp,cm),yv=t=>(t.displayName="Transition",t.props=_v,t),vv=yv((t,{slots:e})=>Ho(y0,wv(t),e)),Ts=(t,e=[])=>{se(t)?t.forEach(n=>n(...e)):t&&t(...e)},od=t=>t?se(t)?t.some(e=>e.length>1):t.length>1:!1;function wv(t){const e={};for(const I in t)I in cm||(e[I]=t[I]);if(t.css===!1)return e;const{name:n="v",type:s,duration:r,enterFromClass:i=`${n}-enter-from`,enterActiveClass:o=`${n}-enter-active`,enterToClass:l=`${n}-enter-to`,appearFromClass:c=i,appearActiveClass:u=o,appearToClass:d=l,leaveFromClass:p=`${n}-leave-from`,leaveActiveClass:y=`${n}-leave-active`,leaveToClass:E=`${n}-leave-to`}=t,x=bv(r),P=x&&x[0],V=x&&x[1],{onBeforeEnter:X,onEnter:Q,onEnterCancelled:Y,onLeave:q,onLeaveCancelled:K,onBeforeAppear:B=X,onAppear:S=Q,onAppearCancelled:v=Y}=e,_=(I,w,Re,rt)=>{I._enterCancelled=rt,Is(I,w?d:l),Is(I,w?u:o),Re&&Re()},T=(I,w)=>{I._isLeaving=!1,Is(I,p),Is(I,E),Is(I,y),w&&w()},A=I=>(w,Re)=>{const rt=I?S:Q,ke=()=>_(w,I,Re);Ts(rt,[w,ke]),ad(()=>{Is(w,I?c:i),vn(w,I?d:l),od(rt)||ld(w,s,P,ke)})};return st(e,{onBeforeEnter(I){Ts(X,[I]),vn(I,i),vn(I,o)},onBeforeAppear(I){Ts(B,[I]),vn(I,c),vn(I,u)},onEnter:A(!1),onAppear:A(!0),onLeave(I,w){I._isLeaving=!0;const Re=()=>T(I,w);vn(I,p),I._enterCancelled?(vn(I,y),hd(I)):(hd(I),vn(I,y)),ad(()=>{I._isLeaving&&(Is(I,p),vn(I,E),od(q)||ld(I,s,V,Re))}),Ts(q,[I,Re])},onEnterCancelled(I){_(I,!1,void 0,!0),Ts(Y,[I])},onAppearCancelled(I){_(I,!0,void 0,!0),Ts(v,[I])},onLeaveCancelled(I){T(I),Ts(K,[I])}})}function bv(t){if(t==null)return null;if(Se(t))return[Al(t.enter),Al(t.leave)];{const e=Al(t);return[e,e]}}function Al(t){return by(t)}function vn(t,e){e.split(/\s+/).forEach(n=>n&&t.classList.add(n)),(t[bi]||(t[bi]=new Set)).add(e)}function Is(t,e){e.split(/\s+/).forEach(s=>s&&t.classList.remove(s));const n=t[bi];n&&(n.delete(e),n.size||(t[bi]=void 0))}function ad(t){requestAnimationFrame(()=>{requestAnimationFrame(t)})}let Tv=0;function ld(t,e,n,s){const r=t._endId=++Tv,i=()=>{r===t._endId&&s()};if(n!=null)return setTimeout(i,n);const{type:o,timeout:l,propCount:c}=Iv(t,e);if(!o)return s();const u=o+"end";let d=0;const p=()=>{t.removeEventListener(u,y),i()},y=E=>{E.target===t&&++d>=c&&p()};setTimeout(()=>{d<c&&p()},l+1),t.addEventListener(u,y)}function Iv(t,e){const n=window.getComputedStyle(t),s=x=>(n[x]||"").split(", "),r=s(`${$n}Delay`),i=s(`${$n}Duration`),o=cd(r,i),l=s(`${zr}Delay`),c=s(`${zr}Duration`),u=cd(l,c);let d=null,p=0,y=0;e===$n?o>0&&(d=$n,p=o,y=i.length):e===zr?u>0&&(d=zr,p=u,y=c.length):(p=Math.max(o,u),d=p>0?o>u?$n:zr:null,y=d?d===$n?i.length:c.length:0);const E=d===$n&&/\b(?:transform|all)(?:,|$)/.test(s(`${$n}Property`).toString());return{type:d,timeout:p,propCount:y,hasTransform:E}}function cd(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max(...e.map((n,s)=>ud(n)+ud(t[s])))}function ud(t){return t==="auto"?0:Number(t.slice(0,-1).replace(",","."))*1e3}function hd(t){return(t?t.ownerDocument:document).body.offsetHeight}function Ev(t,e,n){const s=t[bi];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const dd=Symbol("_vod"),Av=Symbol("_vsh"),xv=Symbol(""),Sv=/(?:^|;)\s*display\s*:/;function Rv(t,e,n){const s=t.style,r=Fe(n);let i=!1;if(n&&!r){if(e)if(Fe(e))for(const o of e.split(";")){const l=o.slice(0,o.indexOf(":")).trim();n[l]==null&&Kr(s,l,"")}else for(const o in e)n[o]==null&&Kr(s,o,"");for(const o in n){o==="display"&&(i=!0);const l=n[o];l!=null?Pv(t,o,!Fe(e)&&e?e[o]:void 0,l)||Kr(s,o,l):Kr(s,o,"")}}else if(r){if(e!==n){const o=s[xv];o&&(n+=";"+o),s.cssText=n,i=Sv.test(n)}}else e&&t.removeAttribute("style");dd in t&&(t[dd]=i?s.display:"",t[Av]&&(s.display="none"))}const po=/\s*!important$/;function Kr(t,e,n){if(se(n))n.forEach(s=>Kr(t,e,s));else if(n==null&&(n=""),e.startsWith("--"))po.test(n)?t.setProperty(e,n.replace(po,""),"important"):t.setProperty(e,n);else{const s=Cv(t,e);po.test(n)?t.setProperty(qs(s),n.replace(po,""),"important"):t[s]=n}}const fd=["Webkit","Moz","ms"],xl={};function Cv(t,e){const n=xl[e];if(n)return n;let s=Gt(e);if(s!=="filter"&&s in t)return xl[e]=s;s=Zf(s);for(let r=0;r<fd.length;r++){const i=fd[r]+s;if(i in t)return xl[e]=i}return e}function Pv(t,e,n,s){return t.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&Fe(s)&&n===s}const pd="http://www.w3.org/1999/xlink";function md(t,e,n,s,r,i=Sy(e)){s&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(pd,e.slice(6,e.length)):t.setAttributeNS(pd,e,n):n==null||i&&!tp(n)?t.removeAttribute(e):t.setAttribute(e,i?"":zt(n)?String(n):n)}function gd(t,e,n,s,r){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?lm(n):n);return}const i=t.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const l=i==="OPTION"?t.getAttribute("value")||"":t.value,c=n==null?t.type==="checkbox"?"on":"":String(n);(l!==c||!("_value"in t))&&(t.value=c),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const l=typeof t[e];l==="boolean"?n=tp(n):n==null&&l==="string"?(n="",o=!0):l==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(r||e)}function Ss(t,e,n,s){t.addEventListener(e,n,s)}function kv(t,e,n,s){t.removeEventListener(e,n,s)}const _d=Symbol("_vei");function Mv(t,e,n,s,r=null){const i=t[_d]||(t[_d]={}),o=i[e];if(s&&o)o.value=s;else{const[l,c]=Vv(e);if(s){const u=i[e]=Fv(s,r);Ss(t,l,u,c)}else o&&(kv(t,l,o,c),i[e]=void 0)}}const Nv=/(Once|Passive|Capture)$/,Dv=/^on:?(?:Once|Passive|Capture)$/;function Vv(t){let e,n;for(;(n=t.match(Nv))&&!Dv.test(t);)e||(e={}),t=t.slice(0,t.length-n[1].length),e[n[1].toLowerCase()]=!0;return[t[2]===":"?t.slice(3):qs(t.slice(2)),e]}let Sl=0;const Ov=Promise.resolve(),Lv=()=>Sl||(Ov.then(()=>Sl=0),Sl=Date.now());function Fv(t,e){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;const r=n.value;if(se(r)){const i=s.stopImmediatePropagation;s.stopImmediatePropagation=()=>{i.call(s),s._stopped=!0};const o=r.slice(),l=[s];for(let c=0;c<o.length&&!s._stopped;c++){const u=o[c];u&&Ht(u,e,5,l)}}else Ht(r,e,5,[s])};return n.value=t,n.attached=Lv(),n}const yd=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,Uv=(t,e,n,s,r,i)=>{const o=r==="svg";e==="class"?Ev(t,s,o):e==="style"?Rv(t,n,s):pa(e)?ma(e)||Mv(t,e,n,s,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):$v(t,e,s,o))?(gd(t,e,s),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&md(t,e,s,o,i,e!=="value")):t._isVueCE&&(Bv(t,e)||t._def.__asyncLoader&&(/[A-Z]/.test(e)||!Fe(s)))?gd(t,Gt(e),s,i,e):(e==="true-value"?t._trueValue=s:e==="false-value"&&(t._falseValue=s),md(t,e,s,o))};function $v(t,e,n,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in t&&yd(e)&&pe(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&t.tagName==="IFRAME"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=t.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return yd(e)&&Fe(n)?!1:e in t}function Bv(t,e){const n=t._def.props;if(!n)return!1;const s=Gt(e);return Array.isArray(n)?n.some(r=>Gt(r)===s):Object.keys(n).some(r=>Gt(r)===s)}const Wo=t=>{const e=t.props["onUpdate:modelValue"]||!1;return se(e)?n=>To(e,n):e};function jv(t){t.target.composing=!0}function vd(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Cs=Symbol("_assign"),mo=Symbol("_initialValue");function Rl(t,e,n){return e&&(t=t.trim()),n&&(t=ya(t)),t}const Ge={created(t,{modifiers:{lazy:e,trim:n,number:s}},r){t.parentNode&&(t.type==="text"?t[mo]=t.defaultValue.replace(/[\r\n]/g,""):t.type==="textarea"&&(t[mo]=t.defaultValue.replace(/\r\n?/g,`
`))),t[Cs]=Wo(r);const i=s||r.props&&r.props.type==="number";Ss(t,e?"change":"input",o=>{o.target.composing||t[Cs](Rl(t.value,n,i))}),(n||i)&&Ss(t,"change",()=>{t.value=Rl(t.value,n,i)}),e||(Ss(t,"compositionstart",jv),Ss(t,"compositionend",vd),Ss(t,"change",vd))},mounted(t,{value:e,modifiers:{trim:n,number:s}}){const r=e??"",i=t[mo];delete t[mo],i!==void 0&&(t.type==="text"||t.type==="textarea")&&t.value!==i?t[Cs](Rl(t.value,n,s)):t.value=r},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:s,trim:r,number:i}},o){if(t[Cs]=Wo(o),t.composing)return;const l=(i||t.type==="number")&&!/^0\d/.test(t.value)?ya(t.value):t.value,c=e??"";if(l===c)return;const u=t.getRootNode();(u instanceof Document||u instanceof ShadowRoot)&&u.activeElement===t&&t.type!=="range"&&(s&&e===n||r&&t.value.trim()===c)||(t.value=c)}},tc={deep:!0,created(t,{value:e,modifiers:{number:n}},s){t._modelValue=e,Ss(t,"change",()=>{const r=Array.prototype.filter.call(t.options,c=>c.selected).map(c=>n?ya(Ko(c)):Ko(c)),i=t.multiple,o=i?Os(t._modelValue)?new Set(r):r:r[0],l=t._pendingValue=[i,i?se(o)?r.slice():r:o];try{t[Cs](o)}finally{Oc(()=>{t._pendingValue===l&&(t._pendingValue=void 0)})}}),t[Cs]=Wo(s)},mounted(t,{value:e}){wd(t,e)},beforeUpdate(t,{value:e},n){t._modelValue=e,t[Cs]=Wo(n)},updated(t,{value:e}){const n=t._pendingValue;t._pendingValue=void 0,(!n||n[0]!==t.multiple||!zv(e,n[1],n[0]))&&wd(t,e)}};function zv(t,e,n){if(!n||se(t))return ss(t,e);if(Os(t)){if(t.size!==e.length)return!1;for(const s of e)if(!t.has(s))return!1;return!0}return!1}function wd(t,e){const n=t.multiple,s=se(e);if(!(n&&!s&&!Os(e))){for(let r=0,i=t.options.length;r<i;r++){const o=t.options[r],l=Ko(o);if(n)if(s){const c=typeof l;c==="string"||c==="number"?o.selected=e.some(u=>String(u)===String(l)):o.selected=Py(e,l)>-1}else o.selected=e.has(l);else if(ss(Ko(o),e)){t.selectedIndex!==r&&(t.selectedIndex=r);return}}!n&&t.selectedIndex!==-1&&(t.selectedIndex=-1)}}function Ko(t){return"_value"in t?t._value:t.value}const qv=["ctrl","shift","alt","meta"],Hv={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>qv.some(n=>t[`${n}Key`]&&!e.includes(n))},ri=(t,e)=>{if(!t)return t;const n=t._withMods||(t._withMods={}),s=e.join(".");return n[s]||(n[s]=(r,...i)=>{for(let o=0;o<e.length;o++){const l=Hv[e[o]];if(l&&l(r,e))return}return t(r,...i)})},Wv=st({patchProp:Uv},gv);let bd;function Kv(){return bd||(bd=Y0(Wv))}const Gv=(...t)=>{const e=Kv().createApp(...t),{mount:n}=e;return e.mount=s=>{const r=Jv(s);if(!r)return;const i=e._component;!pe(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=n(r,!1,Qv(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e};function Qv(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function Jv(t){return Fe(t)?document.querySelector(t):t}/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let um;const Pa=t=>um=t,hm=Symbol();function nc(t){return t&&typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"&&typeof t.toJSON!="function"}var ii;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(ii||(ii={}));function Yv(){const t=ip(!0),e=t.run(()=>je({}));let n=[],s=[];const r=Vc({install(i){Pa(r),r._a=i,i.provide(hm,r),i.config.globalProperties.$pinia=r,s.forEach(o=>n.push(o)),s=[]},use(i){return this._a?n.push(i):s.push(i),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return r}const dm=()=>{};function Td(t,e,n,s=dm){t.push(e);const r=()=>{const i=t.indexOf(e);i>-1&&(t.splice(i,1),s())};return!n&&op()&&ky(r),r}function tr(t,...e){t.slice().forEach(n=>{n(...e)})}const Xv=t=>t(),Id=Symbol(),Cl=Symbol();function sc(t,e){t instanceof Map&&e instanceof Map?e.forEach((n,s)=>t.set(s,n)):t instanceof Set&&e instanceof Set&&e.forEach(t.add,t);for(const n in e){if(!e.hasOwnProperty(n))continue;const s=e[n],r=t[n];nc(r)&&nc(s)&&t.hasOwnProperty(n)&&!Be(s)&&!on(s)?t[n]=sc(r,s):t[n]=s}return t}const Zv=Symbol();function ew(t){return!nc(t)||!t.hasOwnProperty(Zv)}const{assign:jn}=Object;function tw(t){return!!(Be(t)&&t.effect)}function nw(t,e,n,s){const{state:r,actions:i,getters:o}=e,l=n.state.value[t];let c;function u(){l||(n.state.value[t]=r?r():{});const d=e0(n.state.value[t]);return jn(d,i,Object.keys(o||{}).reduce((p,y)=>(p[y]=Vc(os(()=>{Pa(n);const E=n._s.get(t);return o[y].call(E,E)})),p),{}))}return c=fm(t,u,e,n,s,!0),c}function fm(t,e,n={},s,r,i){let o;const l=jn({actions:{}},n),c={deep:!0};let u,d,p=[],y=[],E;const x=s.state.value[t];!i&&!x&&(s.state.value[t]={});let P;function V(v){let _;u=d=!1,typeof v=="function"?(v(s.state.value[t]),_={type:ii.patchFunction,storeId:t,events:E}):(sc(s.state.value[t],v),_={type:ii.patchObject,payload:v,storeId:t,events:E});const T=P=Symbol();Oc().then(()=>{P===T&&(u=!0)}),d=!0,tr(p,_,s.state.value[t])}const X=i?function(){const{state:_}=n,T=_?_():{};this.$patch(A=>{jn(A,T)})}:dm;function Q(){o.stop(),p=[],y=[],s._s.delete(t)}const Y=(v,_="")=>{if(Id in v)return v[Cl]=_,v;const T=function(){Pa(s);const A=Array.from(arguments),I=[],w=[];function Re(fe){I.push(fe)}function rt(fe){w.push(fe)}tr(y,{args:A,name:T[Cl],store:K,after:Re,onError:rt});let ke;try{ke=v.apply(this&&this.$id===t?this:K,A)}catch(fe){throw tr(w,fe),fe}return ke instanceof Promise?ke.then(fe=>(tr(I,fe),fe)).catch(fe=>(tr(w,fe),Promise.reject(fe))):(tr(I,ke),ke)};return T[Id]=!0,T[Cl]=_,T},q={_p:s,$id:t,$onAction:Td.bind(null,y),$patch:V,$reset:X,$subscribe(v,_={}){const T=Td(p,v,_.detached,()=>A()),A=o.run(()=>cr(()=>s.state.value[t],I=>{(_.flush==="sync"?d:u)&&v({storeId:t,type:ii.direct,events:E},I)},jn({},c,_)));return T},$dispose:Q},K=ba(q);s._s.set(t,K);const S=(s._a&&s._a.runWithContext||Xv)(()=>s._e.run(()=>(o=ip()).run(()=>e({action:Y}))));for(const v in S){const _=S[v];if(Be(_)&&!tw(_)||on(_))i||(x&&ew(_)&&(Be(_)?_.value=x[v]:sc(_,x[v])),s.state.value[t][v]=_);else if(typeof _=="function"){const T=Y(_,v);S[v]=T,l.actions[v]=_}}return jn(K,S),jn(we(K),S),Object.defineProperty(K,"$state",{get:()=>s.state.value[t],set:v=>{V(_=>{jn(_,v)})}}),s._p.forEach(v=>{jn(K,o.run(()=>v({store:K,app:s._a,pinia:s,options:l})))}),x&&i&&n.hydrate&&n.hydrate(K.$state,x),u=!0,d=!0,K}/*! #__NO_SIDE_EFFECTS__ */function sw(t,e,n){let s,r;const i=typeof e=="function";s=t,r=i?n:e;function o(l,c){const u=h0();return l=l||(u?ei(hm,null):null),l&&Pa(l),l=um,l._s.has(s)||(i?fm(s,e,r,l):nw(s,r,l)),l._s.get(s)}return o.$id=s,o}const Ed=[{id:"zone-food",name:"โซนอาหาร & เครื่องดื่ม (Food & Drink)",color:"#ef4444",pricePerDay:500},{id:"zone-fashion",name:"โซนแฟชั่น & เครื่องแต่งกาย (Fashion)",color:"#ec4899",pricePerDay:400},{id:"zone-tech",name:"โซนไอที & กัดเจ็ต (Gadgets & Tech)",color:"#3b82f6",pricePerDay:450},{id:"zone-craft",name:"โซนงานแฮนด์เมด & ของสะสม (Craft & Vintage)",color:"#10b981",pricePerDay:350},{id:"zone-general",name:"โซนทั่วไป (General Zone)",color:"#8b5cf6",pricePerDay:300}],Ad=[{id:"stall-A01",stallNo:"A01",zoneId:"zone-food",x:100,y:100,width:100,height:80,price:500,status:"available",bookedBy:null,notes:"ใกล้ประตูทางเข้าหลัก"},{id:"stall-A02",stallNo:"A02",zoneId:"zone-food",x:220,y:100,width:100,height:80,price:500,status:"booked",bookedBy:{name:"คุณสมชาย (ร้านชาไข่มุก)",phone:"081-234-5678",bookedAt:"2026-09-24"},notes:"มีปลั๊กไฟ 15A"},{id:"stall-A03",stallNo:"A03",zoneId:"zone-food",x:340,y:100,width:100,height:80,price:500,status:"available",bookedBy:null,notes:""},{id:"stall-B01",stallNo:"B01",zoneId:"zone-fashion",x:100,y:220,width:120,height:90,price:400,status:"available",bookedBy:null,notes:"เหมาะตั้งราวเสื้อผ้า"},{id:"stall-B02",stallNo:"B02",zoneId:"zone-fashion",x:240,y:220,width:120,height:90,price:400,status:"disabled",bookedBy:null,notes:"ปิดซ่อมบำรุงไฟ"},{id:"stall-C01",stallNo:"C01",zoneId:"zone-tech",x:100,y:340,width:140,height:100,price:450,status:"available",bookedBy:null,notes:"มีสายแลนเต้ารับไฮสปีด"}];var xd={};/**
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
 */const pm=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},rw=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=t[n++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=t[n++],o=t[n++],l=t[n++],c=((r&7)<<18|(i&63)<<12|(o&63)<<6|l&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},mm={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const i=t[r],o=r+1<t.length,l=o?t[r+1]:0,c=r+2<t.length,u=c?t[r+2]:0,d=i>>2,p=(i&3)<<4|l>>4;let y=(l&15)<<2|u>>6,E=u&63;c||(E=64,o||(y=64)),s.push(n[d],n[p],n[y],n[E])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(pm(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):rw(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const i=n[t.charAt(r++)],l=r<t.length?n[t.charAt(r)]:0;++r;const u=r<t.length?n[t.charAt(r)]:64;++r;const p=r<t.length?n[t.charAt(r)]:64;if(++r,i==null||l==null||u==null||p==null)throw new iw;const y=i<<2|l>>4;if(s.push(y),u!==64){const E=l<<4&240|u>>2;if(s.push(E),p!==64){const x=u<<6&192|p;s.push(x)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class iw extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ow=function(t){const e=pm(t);return mm.encodeByteArray(e,!0)},Go=function(t){return ow(t).replace(/\./g,"")},gm=function(t){try{return mm.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function aw(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const lw=()=>aw().__FIREBASE_DEFAULTS__,cw=()=>{if(typeof process>"u"||typeof xd>"u")return;const t=xd.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},uw=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&gm(t[1]);return e&&JSON.parse(e)},ka=()=>{try{return lw()||cw()||uw()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},_m=t=>{var e,n;return(n=(e=ka())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},hw=t=>{const e=_m(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},ym=()=>{var t;return(t=ka())===null||t===void 0?void 0:t.config},vm=t=>{var e;return(e=ka())===null||e===void 0?void 0:e[`_${t}`]};/**
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
 */function fw(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",r=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Go(JSON.stringify(n)),Go(JSON.stringify(o)),""].join(".")}/**
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
 */function vt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function pw(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(vt())}function mw(){var t;const e=(t=ka())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function gw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function jc(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function _w(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function yw(){const t=vt();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function vw(){return!mw()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function zc(){try{return typeof indexedDB=="object"}catch{return!1}}function qc(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var i;e(((i=r.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}function wm(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const ww="FirebaseError";class Yt extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=ww,Object.setPrototypeOf(this,Yt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Hs.prototype.create)}}class Hs{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?bw(i,s):"Error",l=`${this.serviceName}: ${o} (${r}).`;return new Yt(r,l,s)}}function bw(t,e){return t.replace(Tw,(n,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const Tw=/\{\$([^}]+)}/g;function Iw(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Ti(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const i=t[r],o=e[r];if(Sd(i)&&Sd(o)){if(!Ti(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function Sd(t){return t!==null&&typeof t=="object"}/**
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
 */function Vi(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function Ew(t,e){const n=new Aw(t,e);return n.subscribe.bind(n)}class Aw{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let r;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");xw(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:s},r.next===void 0&&(r.next=Pl),r.error===void 0&&(r.error=Pl),r.complete===void 0&&(r.complete=Pl);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function xw(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Pl(){}/**
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
 */const Sw=1e3,Rw=2,Cw=4*60*60*1e3,Pw=.5;function Rd(t,e=Sw,n=Rw){const s=e*Math.pow(n,t),r=Math.round(Pw*s*(Math.random()-.5)*2);return Math.min(Cw,s+r)}/**
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
 */function Ze(t){return t&&t._delegate?t._delegate:t}class Jt{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const As="[DEFAULT]";/**
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
 */class kw{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new dw;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Nw(e))try{this.getOrInitializeService({instanceIdentifier:As})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=As){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=As){return this.instances.has(e)}getOptions(e=As){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);s===l&&o.resolve(r)}return r}onInit(e,n){var s;const r=this.normalizeInstanceIdentifier(n),i=(s=this.onInitCallbacks.get(r))!==null&&s!==void 0?s:new Set;i.add(e),this.onInitCallbacks.set(r,i);const o=this.instances.get(r);return o&&e(o,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Mw(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=As){return this.component?this.component.multipleInstances?e:As:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Mw(t){return t===As?void 0:t}function Nw(t){return t.instantiationMode==="EAGER"}/**
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
 */class Dw{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new kw(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var _e;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(_e||(_e={}));const Vw={debug:_e.DEBUG,verbose:_e.VERBOSE,info:_e.INFO,warn:_e.WARN,error:_e.ERROR,silent:_e.SILENT},Ow=_e.INFO,Lw={[_e.DEBUG]:"log",[_e.VERBOSE]:"log",[_e.INFO]:"info",[_e.WARN]:"warn",[_e.ERROR]:"error"},Fw=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=Lw[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ma{constructor(e){this.name=e,this._logLevel=Ow,this._logHandler=Fw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in _e))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Vw[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,_e.DEBUG,...e),this._logHandler(this,_e.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,_e.VERBOSE,...e),this._logHandler(this,_e.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,_e.INFO,...e),this._logHandler(this,_e.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,_e.WARN,...e),this._logHandler(this,_e.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,_e.ERROR,...e),this._logHandler(this,_e.ERROR,...e)}}const Uw=(t,e)=>e.some(n=>t instanceof n);let Cd,Pd;function $w(){return Cd||(Cd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Bw(){return Pd||(Pd=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const bm=new WeakMap,rc=new WeakMap,Tm=new WeakMap,kl=new WeakMap,Hc=new WeakMap;function jw(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(Yn(t.result)),r()},o=()=>{s(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&bm.set(n,t)}).catch(()=>{}),Hc.set(e,t),e}function zw(t){if(rc.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});rc.set(t,e)}let ic={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return rc.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Tm.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Yn(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function qw(t){ic=t(ic)}function Hw(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(Ml(this),e,...n);return Tm.set(s,e.sort?e.sort():[e]),Yn(s)}:Bw().includes(t)?function(...e){return t.apply(Ml(this),e),Yn(bm.get(this))}:function(...e){return Yn(t.apply(Ml(this),e))}}function Ww(t){return typeof t=="function"?Hw(t):(t instanceof IDBTransaction&&zw(t),Uw(t,$w())?new Proxy(t,ic):t)}function Yn(t){if(t instanceof IDBRequest)return jw(t);if(kl.has(t))return kl.get(t);const e=Ww(t);return e!==t&&(kl.set(t,e),Hc.set(e,t)),e}const Ml=t=>Hc.get(t);function Im(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(t,e),l=Yn(o);return s&&o.addEventListener("upgradeneeded",c=>{s(Yn(o.result),c.oldVersion,c.newVersion,Yn(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),l.then(c=>{i&&c.addEventListener("close",()=>i()),r&&c.addEventListener("versionchange",u=>r(u.oldVersion,u.newVersion,u))}).catch(()=>{}),l}const Kw=["get","getKey","getAll","getAllKeys","count"],Gw=["put","add","delete","clear"],Nl=new Map;function kd(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Nl.get(e))return Nl.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=Gw.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Kw.includes(n)))return;const i=async function(o,...l){const c=this.transaction(o,r?"readwrite":"readonly");let u=c.store;return s&&(u=u.index(l.shift())),(await Promise.all([u[n](...l),r&&c.done]))[0]};return Nl.set(e,i),i}qw(t=>({...t,get:(e,n,s)=>kd(e,n)||t.get(e,n,s),has:(e,n)=>!!kd(e,n)||t.has(e,n)}));/**
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
 */class Qw{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Jw(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function Jw(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const oc="@firebase/app",Md="0.10.13";/**
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
 */const Pn=new Ma("@firebase/app"),Yw="@firebase/app-compat",Xw="@firebase/analytics-compat",Zw="@firebase/analytics",eb="@firebase/app-check-compat",tb="@firebase/app-check",nb="@firebase/auth",sb="@firebase/auth-compat",rb="@firebase/database",ib="@firebase/data-connect",ob="@firebase/database-compat",ab="@firebase/functions",lb="@firebase/functions-compat",cb="@firebase/installations",ub="@firebase/installations-compat",hb="@firebase/messaging",db="@firebase/messaging-compat",fb="@firebase/performance",pb="@firebase/performance-compat",mb="@firebase/remote-config",gb="@firebase/remote-config-compat",_b="@firebase/storage",yb="@firebase/storage-compat",vb="@firebase/firestore",wb="@firebase/vertexai-preview",bb="@firebase/firestore-compat",Tb="firebase",Ib="10.14.1";/**
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
 */const ac="[DEFAULT]",Eb={[oc]:"fire-core",[Yw]:"fire-core-compat",[Zw]:"fire-analytics",[Xw]:"fire-analytics-compat",[tb]:"fire-app-check",[eb]:"fire-app-check-compat",[nb]:"fire-auth",[sb]:"fire-auth-compat",[rb]:"fire-rtdb",[ib]:"fire-data-connect",[ob]:"fire-rtdb-compat",[ab]:"fire-fn",[lb]:"fire-fn-compat",[cb]:"fire-iid",[ub]:"fire-iid-compat",[hb]:"fire-fcm",[db]:"fire-fcm-compat",[fb]:"fire-perf",[pb]:"fire-perf-compat",[mb]:"fire-rc",[gb]:"fire-rc-compat",[_b]:"fire-gcs",[yb]:"fire-gcs-compat",[vb]:"fire-fst",[bb]:"fire-fst-compat",[wb]:"fire-vertex","fire-js":"fire-js",[Tb]:"fire-js-all"};/**
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
 */const Qo=new Map,Ab=new Map,lc=new Map;function Nd(t,e){try{t.container.addComponent(e)}catch(n){Pn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function hn(t){const e=t.name;if(lc.has(e))return Pn.debug(`There were multiple attempts to register component ${e}.`),!1;lc.set(e,t);for(const n of Qo.values())Nd(n,t);for(const n of Ab.values())Nd(n,t);return!0}function Ws(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function En(t){return t.settings!==void 0}/**
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
 */const xb={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Xn=new Hs("app","Firebase",xb);/**
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
 */class Sb{constructor(e,n,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Jt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Xn.create("app-deleted",{appName:this._name})}}/**
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
 */const br=Ib;function Em(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s=Object.assign({name:ac,automaticDataCollectionEnabled:!1},e),r=s.name;if(typeof r!="string"||!r)throw Xn.create("bad-app-name",{appName:String(r)});if(n||(n=ym()),!n)throw Xn.create("no-options");const i=Qo.get(r);if(i){if(Ti(n,i.options)&&Ti(s,i.config))return i;throw Xn.create("duplicate-app",{appName:r})}const o=new Dw(r);for(const c of lc.values())o.addComponent(c);const l=new Sb(n,s,o);return Qo.set(r,l),l}function Wc(t=ac){const e=Qo.get(t);if(!e&&t===ac&&ym())return Em();if(!e)throw Xn.create("no-app",{appName:t});return e}function jt(t,e,n){var s;let r=(s=Eb[t])!==null&&s!==void 0?s:t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const l=[`Unable to register library "${r}" with version "${e}":`];i&&l.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Pn.warn(l.join(" "));return}hn(new Jt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const Rb="firebase-heartbeat-database",Cb=1,Ii="firebase-heartbeat-store";let Dl=null;function Am(){return Dl||(Dl=Im(Rb,Cb,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Ii)}catch(n){console.warn(n)}}}}).catch(t=>{throw Xn.create("idb-open",{originalErrorMessage:t.message})})),Dl}async function Pb(t){try{const n=(await Am()).transaction(Ii),s=await n.objectStore(Ii).get(xm(t));return await n.done,s}catch(e){if(e instanceof Yt)Pn.warn(e.message);else{const n=Xn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Pn.warn(n.message)}}}async function Dd(t,e){try{const s=(await Am()).transaction(Ii,"readwrite");await s.objectStore(Ii).put(e,xm(t)),await s.done}catch(n){if(n instanceof Yt)Pn.warn(n.message);else{const s=Xn.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Pn.warn(s.message)}}}function xm(t){return`${t.name}!${t.options.appId}`}/**
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
 */const kb=1024,Mb=30*24*60*60*1e3;class Nb{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Vb(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Vd();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:r}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=Mb}),this._storage.overwrite(this._heartbeatsCache))}catch(s){Pn.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Vd(),{heartbeatsToSend:s,unsentEntries:r}=Db(this._heartbeatsCache.heartbeats),i=Go(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return Pn.warn(n),""}}}function Vd(){return new Date().toISOString().substring(0,10)}function Db(t,e=kb){const n=[];let s=t.slice();for(const r of t){const i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),Od(n)>e){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),Od(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class Vb{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return zc()?qc().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Pb(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return Dd(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return Dd(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Od(t){return Go(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function Ob(t){hn(new Jt("platform-logger",e=>new Qw(e),"PRIVATE")),hn(new Jt("heartbeat",e=>new Nb(e),"PRIVATE")),jt(oc,Md,t),jt(oc,Md,"esm2017"),jt("fire-js","")}Ob("");var Lb="firebase",Fb="10.14.1";/**
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
 */jt(Lb,Fb,"app");const Sm="@firebase/installations",Kc="0.6.9";/**
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
 */const Rm=1e4,Cm=`w:${Kc}`,Pm="FIS_v2",Ub="https://firebaseinstallations.googleapis.com/v1",$b=60*60*1e3,Bb="installations",jb="Installations";/**
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
 */const zb={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Ls=new Hs(Bb,jb,zb);function km(t){return t instanceof Yt&&t.code.includes("request-failed")}/**
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
 */function Mm({projectId:t}){return`${Ub}/projects/${t}/installations`}function Nm(t){return{token:t.token,requestStatus:2,expiresIn:Hb(t.expiresIn),creationTime:Date.now()}}async function Dm(t,e){const s=(await e.json()).error;return Ls.create("request-failed",{requestName:t,serverCode:s.code,serverMessage:s.message,serverStatus:s.status})}function Vm({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function qb(t,{refreshToken:e}){const n=Vm(t);return n.append("Authorization",Wb(e)),n}async function Om(t){const e=await t();return e.status>=500&&e.status<600?t():e}function Hb(t){return Number(t.replace("s","000"))}function Wb(t){return`${Pm} ${t}`}/**
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
 */async function Kb({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const s=Mm(t),r=Vm(t),i=e.getImmediate({optional:!0});if(i){const u=await i.getHeartbeatsHeader();u&&r.append("x-firebase-client",u)}const o={fid:n,authVersion:Pm,appId:t.appId,sdkVersion:Cm},l={method:"POST",headers:r,body:JSON.stringify(o)},c=await Om(()=>fetch(s,l));if(c.ok){const u=await c.json();return{fid:u.fid||n,registrationStatus:2,refreshToken:u.refreshToken,authToken:Nm(u.authToken)}}else throw await Dm("Create Installation",c)}/**
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
 */function Lm(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */function Gb(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const Qb=/^[cdef][\w-]{21}$/,cc="";function Jb(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=Yb(t);return Qb.test(n)?n:cc}catch{return cc}}function Yb(t){return Gb(t).substr(0,22)}/**
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
 */function Na(t){return`${t.appName}!${t.appId}`}/**
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
 */const Fm=new Map;function Um(t,e){const n=Na(t);$m(n,e),Xb(n,e)}function $m(t,e){const n=Fm.get(t);if(n)for(const s of n)s(e)}function Xb(t,e){const n=Zb();n&&n.postMessage({key:t,fid:e}),eT()}let Ps=null;function Zb(){return!Ps&&"BroadcastChannel"in self&&(Ps=new BroadcastChannel("[Firebase] FID Change"),Ps.onmessage=t=>{$m(t.data.key,t.data.fid)}),Ps}function eT(){Fm.size===0&&Ps&&(Ps.close(),Ps=null)}/**
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
 */const tT="firebase-installations-database",nT=1,Fs="firebase-installations-store";let Vl=null;function Gc(){return Vl||(Vl=Im(tT,nT,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Fs)}}})),Vl}async function Jo(t,e){const n=Na(t),r=(await Gc()).transaction(Fs,"readwrite"),i=r.objectStore(Fs),o=await i.get(n);return await i.put(e,n),await r.done,(!o||o.fid!==e.fid)&&Um(t,e.fid),e}async function Bm(t){const e=Na(t),s=(await Gc()).transaction(Fs,"readwrite");await s.objectStore(Fs).delete(e),await s.done}async function Da(t,e){const n=Na(t),r=(await Gc()).transaction(Fs,"readwrite"),i=r.objectStore(Fs),o=await i.get(n),l=e(o);return l===void 0?await i.delete(n):await i.put(l,n),await r.done,l&&(!o||o.fid!==l.fid)&&Um(t,l.fid),l}/**
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
 */async function Qc(t){let e;const n=await Da(t.appConfig,s=>{const r=sT(s),i=rT(t,r);return e=i.registrationPromise,i.installationEntry});return n.fid===cc?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function sT(t){const e=t||{fid:Jb(),registrationStatus:0};return jm(e)}function rT(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const r=Promise.reject(Ls.create("app-offline"));return{installationEntry:e,registrationPromise:r}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},s=iT(t,n);return{installationEntry:n,registrationPromise:s}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:oT(t)}:{installationEntry:e}}async function iT(t,e){try{const n=await Kb(t,e);return Jo(t.appConfig,n)}catch(n){throw km(n)&&n.customData.serverCode===409?await Bm(t.appConfig):await Jo(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function oT(t){let e=await Ld(t.appConfig);for(;e.registrationStatus===1;)await Lm(100),e=await Ld(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:s}=await Qc(t);return s||n}return e}function Ld(t){return Da(t,e=>{if(!e)throw Ls.create("installation-not-found");return jm(e)})}function jm(t){return aT(t)?{fid:t.fid,registrationStatus:0}:t}function aT(t){return t.registrationStatus===1&&t.registrationTime+Rm<Date.now()}/**
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
 */async function lT({appConfig:t,heartbeatServiceProvider:e},n){const s=cT(t,n),r=qb(t,n),i=e.getImmediate({optional:!0});if(i){const u=await i.getHeartbeatsHeader();u&&r.append("x-firebase-client",u)}const o={installation:{sdkVersion:Cm,appId:t.appId}},l={method:"POST",headers:r,body:JSON.stringify(o)},c=await Om(()=>fetch(s,l));if(c.ok){const u=await c.json();return Nm(u)}else throw await Dm("Generate Auth Token",c)}function cT(t,{fid:e}){return`${Mm(t)}/${e}/authTokens:generate`}/**
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
 */async function Jc(t,e=!1){let n;const s=await Da(t.appConfig,i=>{if(!zm(i))throw Ls.create("not-registered");const o=i.authToken;if(!e&&dT(o))return i;if(o.requestStatus===1)return n=uT(t,e),i;{if(!navigator.onLine)throw Ls.create("app-offline");const l=pT(i);return n=hT(t,l),l}});return n?await n:s.authToken}async function uT(t,e){let n=await Fd(t.appConfig);for(;n.authToken.requestStatus===1;)await Lm(100),n=await Fd(t.appConfig);const s=n.authToken;return s.requestStatus===0?Jc(t,e):s}function Fd(t){return Da(t,e=>{if(!zm(e))throw Ls.create("not-registered");const n=e.authToken;return mT(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function hT(t,e){try{const n=await lT(t,e),s=Object.assign(Object.assign({},e),{authToken:n});return await Jo(t.appConfig,s),n}catch(n){if(km(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Bm(t.appConfig);else{const s=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Jo(t.appConfig,s)}throw n}}function zm(t){return t!==void 0&&t.registrationStatus===2}function dT(t){return t.requestStatus===2&&!fT(t)}function fT(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+$b}function pT(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function mT(t){return t.requestStatus===1&&t.requestTime+Rm<Date.now()}/**
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
 */async function gT(t){const e=t,{installationEntry:n,registrationPromise:s}=await Qc(e);return s?s.catch(console.error):Jc(e).catch(console.error),n.fid}/**
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
 */async function _T(t,e=!1){const n=t;return await yT(n),(await Jc(n,e)).token}async function yT(t){const{registrationPromise:e}=await Qc(t);e&&await e}/**
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
 */function vT(t){if(!t||!t.options)throw Ol("App Configuration");if(!t.name)throw Ol("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Ol(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Ol(t){return Ls.create("missing-app-config-values",{valueName:t})}/**
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
 */const qm="installations",wT="installations-internal",bT=t=>{const e=t.getProvider("app").getImmediate(),n=vT(e),s=Ws(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:s,_delete:()=>Promise.resolve()}},TT=t=>{const e=t.getProvider("app").getImmediate(),n=Ws(e,qm).getImmediate();return{getId:()=>gT(n),getToken:r=>_T(n,r)}};function IT(){hn(new Jt(qm,bT,"PUBLIC")),hn(new Jt(wT,TT,"PRIVATE"))}IT();jt(Sm,Kc);jt(Sm,Kc,"esm2017");/**
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
 */const Yo="analytics",ET="firebase_id",AT="origin",xT=60*1e3,ST="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Yc="https://www.googletagmanager.com/gtag/js";/**
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
 */const Ct=new Ma("@firebase/analytics");/**
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
 */const RT={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Vt=new Hs("analytics","Analytics",RT);/**
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
 */function CT(t){if(!t.startsWith(Yc)){const e=Vt.create("invalid-gtag-resource",{gtagURL:t});return Ct.warn(e.message),""}return t}function Hm(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function PT(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function kT(t,e){const n=PT("firebase-js-sdk-policy",{createScriptURL:CT}),s=document.createElement("script"),r=`${Yc}?l=${t}&id=${e}`;s.src=n?n==null?void 0:n.createScriptURL(r):r,s.async=!0,document.head.appendChild(s)}function MT(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function NT(t,e,n,s,r,i){const o=s[r];try{if(o)await e[o];else{const c=(await Hm(n)).find(u=>u.measurementId===r);c&&await e[c.appId]}}catch(l){Ct.error(l)}t("config",r,i)}async function DT(t,e,n,s,r){try{let i=[];if(r&&r.send_to){let o=r.send_to;Array.isArray(o)||(o=[o]);const l=await Hm(n);for(const c of o){const u=l.find(p=>p.measurementId===c),d=u&&e[u.appId];if(d)i.push(d);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),t("event",s,r||{})}catch(i){Ct.error(i)}}function VT(t,e,n,s){async function r(i,...o){try{if(i==="event"){const[l,c]=o;await DT(t,e,n,l,c)}else if(i==="config"){const[l,c]=o;await NT(t,e,n,s,l,c)}else if(i==="consent"){const[l,c]=o;t("consent",l,c)}else if(i==="get"){const[l,c,u]=o;t("get",l,c,u)}else if(i==="set"){const[l]=o;t("set",l)}else t(i,...o)}catch(l){Ct.error(l)}}return r}function OT(t,e,n,s,r){let i=function(...o){window[s].push(arguments)};return window[r]&&typeof window[r]=="function"&&(i=window[r]),window[r]=VT(i,t,e,n),{gtagCore:i,wrappedGtag:window[r]}}function LT(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(Yc)&&n.src.includes(t))return n;return null}/**
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
 */const FT=30,UT=1e3;class $T{constructor(e={},n=UT){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Wm=new $T;function BT(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function jT(t){var e;const{appId:n,apiKey:s}=t,r={method:"GET",headers:BT(s)},i=ST.replace("{app-id}",n),o=await fetch(i,r);if(o.status!==200&&o.status!==304){let l="";try{const c=await o.json();!((e=c.error)===null||e===void 0)&&e.message&&(l=c.error.message)}catch{}throw Vt.create("config-fetch-failed",{httpStatus:o.status,responseMessage:l})}return o.json()}async function zT(t,e=Wm,n){const{appId:s,apiKey:r,measurementId:i}=t.options;if(!s)throw Vt.create("no-app-id");if(!r){if(i)return{measurementId:i,appId:s};throw Vt.create("no-api-key")}const o=e.getThrottleMetadata(s)||{backoffCount:0,throttleEndTimeMillis:Date.now()},l=new WT;return setTimeout(async()=>{l.abort()},xT),Km({appId:s,apiKey:r,measurementId:i},o,l,e)}async function Km(t,{throttleEndTimeMillis:e,backoffCount:n},s,r=Wm){var i;const{appId:o,measurementId:l}=t;try{await qT(s,e)}catch(c){if(l)return Ct.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:o,measurementId:l};throw c}try{const c=await jT(t);return r.deleteThrottleMetadata(o),c}catch(c){const u=c;if(!HT(u)){if(r.deleteThrottleMetadata(o),l)return Ct.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:o,measurementId:l};throw c}const d=Number((i=u==null?void 0:u.customData)===null||i===void 0?void 0:i.httpStatus)===503?Rd(n,r.intervalMillis,FT):Rd(n,r.intervalMillis),p={throttleEndTimeMillis:Date.now()+d,backoffCount:n+1};return r.setThrottleMetadata(o,p),Ct.debug(`Calling attemptFetch again in ${d} millis`),Km(t,p,s,r)}}function qT(t,e){return new Promise((n,s)=>{const r=Math.max(e-Date.now(),0),i=setTimeout(n,r);t.addEventListener(()=>{clearTimeout(i),s(Vt.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function HT(t){if(!(t instanceof Yt)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class WT{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function KT(t,e,n,s,r){if(r&&r.global){t("event",n,s);return}else{const i=await e,o=Object.assign(Object.assign({},s),{send_to:i});t("event",n,o)}}/**
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
 */async function GT(){if(zc())try{await qc()}catch(t){return Ct.warn(Vt.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return Ct.warn(Vt.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function QT(t,e,n,s,r,i,o){var l;const c=zT(t);c.then(E=>{n[E.measurementId]=E.appId,t.options.measurementId&&E.measurementId!==t.options.measurementId&&Ct.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${E.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(E=>Ct.error(E)),e.push(c);const u=GT().then(E=>{if(E)return s.getId()}),[d,p]=await Promise.all([c,u]);LT(i)||kT(i,d.measurementId),r("js",new Date);const y=(l=o==null?void 0:o.config)!==null&&l!==void 0?l:{};return y[AT]="firebase",y.update=!0,p!=null&&(y[ET]=p),r("config",d.measurementId,y),d.measurementId}/**
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
 */class JT{constructor(e){this.app=e}_delete(){return delete oi[this.app.options.appId],Promise.resolve()}}let oi={},Ud=[];const $d={};let Ll="dataLayer",YT="gtag",Bd,Gm,jd=!1;function XT(){const t=[];if(jc()&&t.push("This is a browser extension environment."),wm()||t.push("Cookies are not available."),t.length>0){const e=t.map((s,r)=>`(${r+1}) ${s}`).join(" "),n=Vt.create("invalid-analytics-context",{errorInfo:e});Ct.warn(n.message)}}function ZT(t,e,n){XT();const s=t.options.appId;if(!s)throw Vt.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)Ct.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Vt.create("no-api-key");if(oi[s]!=null)throw Vt.create("already-exists",{id:s});if(!jd){MT(Ll);const{wrappedGtag:i,gtagCore:o}=OT(oi,Ud,$d,Ll,YT);Gm=i,Bd=o,jd=!0}return oi[s]=QT(t,Ud,$d,e,Bd,Ll,n),new JT(t)}function eI(t=Wc()){t=Ze(t);const e=Ws(t,Yo);return e.isInitialized()?e.getImmediate():tI(t)}function tI(t,e={}){const n=Ws(t,Yo);if(n.isInitialized()){const r=n.getImmediate();if(Ti(e,n.getOptions()))return r;throw Vt.create("already-initialized")}return n.initialize({options:e})}async function nI(){if(jc()||!wm()||!zc())return!1;try{return await qc()}catch{return!1}}function sI(t,e,n,s){t=Ze(t),KT(Gm,oi[t.app.options.appId],e,n,s).catch(r=>Ct.error(r))}const zd="@firebase/analytics",qd="0.10.8";function rI(){hn(new Jt(Yo,(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("installations-internal").getImmediate();return ZT(s,r,n)},"PUBLIC")),hn(new Jt("analytics-internal",t,"PRIVATE")),jt(zd,qd),jt(zd,qd,"esm2017");function t(e){try{const n=e.getProvider(Yo).getImmediate();return{logEvent:(s,r,i)=>sI(n,s,r,i)}}catch(n){throw Vt.create("interop-component-reg-failed",{reason:n})}}}rI();var Hd=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Vs,Qm;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(S,v){function _(){}_.prototype=v.prototype,S.D=v.prototype,S.prototype=new _,S.prototype.constructor=S,S.C=function(T,A,I){for(var w=Array(arguments.length-2),Re=2;Re<arguments.length;Re++)w[Re-2]=arguments[Re];return v.prototype[A].apply(T,w)}}function n(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(s,n),s.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(S,v,_){_||(_=0);var T=Array(16);if(typeof v=="string")for(var A=0;16>A;++A)T[A]=v.charCodeAt(_++)|v.charCodeAt(_++)<<8|v.charCodeAt(_++)<<16|v.charCodeAt(_++)<<24;else for(A=0;16>A;++A)T[A]=v[_++]|v[_++]<<8|v[_++]<<16|v[_++]<<24;v=S.g[0],_=S.g[1],A=S.g[2];var I=S.g[3],w=v+(I^_&(A^I))+T[0]+3614090360&4294967295;v=_+(w<<7&4294967295|w>>>25),w=I+(A^v&(_^A))+T[1]+3905402710&4294967295,I=v+(w<<12&4294967295|w>>>20),w=A+(_^I&(v^_))+T[2]+606105819&4294967295,A=I+(w<<17&4294967295|w>>>15),w=_+(v^A&(I^v))+T[3]+3250441966&4294967295,_=A+(w<<22&4294967295|w>>>10),w=v+(I^_&(A^I))+T[4]+4118548399&4294967295,v=_+(w<<7&4294967295|w>>>25),w=I+(A^v&(_^A))+T[5]+1200080426&4294967295,I=v+(w<<12&4294967295|w>>>20),w=A+(_^I&(v^_))+T[6]+2821735955&4294967295,A=I+(w<<17&4294967295|w>>>15),w=_+(v^A&(I^v))+T[7]+4249261313&4294967295,_=A+(w<<22&4294967295|w>>>10),w=v+(I^_&(A^I))+T[8]+1770035416&4294967295,v=_+(w<<7&4294967295|w>>>25),w=I+(A^v&(_^A))+T[9]+2336552879&4294967295,I=v+(w<<12&4294967295|w>>>20),w=A+(_^I&(v^_))+T[10]+4294925233&4294967295,A=I+(w<<17&4294967295|w>>>15),w=_+(v^A&(I^v))+T[11]+2304563134&4294967295,_=A+(w<<22&4294967295|w>>>10),w=v+(I^_&(A^I))+T[12]+1804603682&4294967295,v=_+(w<<7&4294967295|w>>>25),w=I+(A^v&(_^A))+T[13]+4254626195&4294967295,I=v+(w<<12&4294967295|w>>>20),w=A+(_^I&(v^_))+T[14]+2792965006&4294967295,A=I+(w<<17&4294967295|w>>>15),w=_+(v^A&(I^v))+T[15]+1236535329&4294967295,_=A+(w<<22&4294967295|w>>>10),w=v+(A^I&(_^A))+T[1]+4129170786&4294967295,v=_+(w<<5&4294967295|w>>>27),w=I+(_^A&(v^_))+T[6]+3225465664&4294967295,I=v+(w<<9&4294967295|w>>>23),w=A+(v^_&(I^v))+T[11]+643717713&4294967295,A=I+(w<<14&4294967295|w>>>18),w=_+(I^v&(A^I))+T[0]+3921069994&4294967295,_=A+(w<<20&4294967295|w>>>12),w=v+(A^I&(_^A))+T[5]+3593408605&4294967295,v=_+(w<<5&4294967295|w>>>27),w=I+(_^A&(v^_))+T[10]+38016083&4294967295,I=v+(w<<9&4294967295|w>>>23),w=A+(v^_&(I^v))+T[15]+3634488961&4294967295,A=I+(w<<14&4294967295|w>>>18),w=_+(I^v&(A^I))+T[4]+3889429448&4294967295,_=A+(w<<20&4294967295|w>>>12),w=v+(A^I&(_^A))+T[9]+568446438&4294967295,v=_+(w<<5&4294967295|w>>>27),w=I+(_^A&(v^_))+T[14]+3275163606&4294967295,I=v+(w<<9&4294967295|w>>>23),w=A+(v^_&(I^v))+T[3]+4107603335&4294967295,A=I+(w<<14&4294967295|w>>>18),w=_+(I^v&(A^I))+T[8]+1163531501&4294967295,_=A+(w<<20&4294967295|w>>>12),w=v+(A^I&(_^A))+T[13]+2850285829&4294967295,v=_+(w<<5&4294967295|w>>>27),w=I+(_^A&(v^_))+T[2]+4243563512&4294967295,I=v+(w<<9&4294967295|w>>>23),w=A+(v^_&(I^v))+T[7]+1735328473&4294967295,A=I+(w<<14&4294967295|w>>>18),w=_+(I^v&(A^I))+T[12]+2368359562&4294967295,_=A+(w<<20&4294967295|w>>>12),w=v+(_^A^I)+T[5]+4294588738&4294967295,v=_+(w<<4&4294967295|w>>>28),w=I+(v^_^A)+T[8]+2272392833&4294967295,I=v+(w<<11&4294967295|w>>>21),w=A+(I^v^_)+T[11]+1839030562&4294967295,A=I+(w<<16&4294967295|w>>>16),w=_+(A^I^v)+T[14]+4259657740&4294967295,_=A+(w<<23&4294967295|w>>>9),w=v+(_^A^I)+T[1]+2763975236&4294967295,v=_+(w<<4&4294967295|w>>>28),w=I+(v^_^A)+T[4]+1272893353&4294967295,I=v+(w<<11&4294967295|w>>>21),w=A+(I^v^_)+T[7]+4139469664&4294967295,A=I+(w<<16&4294967295|w>>>16),w=_+(A^I^v)+T[10]+3200236656&4294967295,_=A+(w<<23&4294967295|w>>>9),w=v+(_^A^I)+T[13]+681279174&4294967295,v=_+(w<<4&4294967295|w>>>28),w=I+(v^_^A)+T[0]+3936430074&4294967295,I=v+(w<<11&4294967295|w>>>21),w=A+(I^v^_)+T[3]+3572445317&4294967295,A=I+(w<<16&4294967295|w>>>16),w=_+(A^I^v)+T[6]+76029189&4294967295,_=A+(w<<23&4294967295|w>>>9),w=v+(_^A^I)+T[9]+3654602809&4294967295,v=_+(w<<4&4294967295|w>>>28),w=I+(v^_^A)+T[12]+3873151461&4294967295,I=v+(w<<11&4294967295|w>>>21),w=A+(I^v^_)+T[15]+530742520&4294967295,A=I+(w<<16&4294967295|w>>>16),w=_+(A^I^v)+T[2]+3299628645&4294967295,_=A+(w<<23&4294967295|w>>>9),w=v+(A^(_|~I))+T[0]+4096336452&4294967295,v=_+(w<<6&4294967295|w>>>26),w=I+(_^(v|~A))+T[7]+1126891415&4294967295,I=v+(w<<10&4294967295|w>>>22),w=A+(v^(I|~_))+T[14]+2878612391&4294967295,A=I+(w<<15&4294967295|w>>>17),w=_+(I^(A|~v))+T[5]+4237533241&4294967295,_=A+(w<<21&4294967295|w>>>11),w=v+(A^(_|~I))+T[12]+1700485571&4294967295,v=_+(w<<6&4294967295|w>>>26),w=I+(_^(v|~A))+T[3]+2399980690&4294967295,I=v+(w<<10&4294967295|w>>>22),w=A+(v^(I|~_))+T[10]+4293915773&4294967295,A=I+(w<<15&4294967295|w>>>17),w=_+(I^(A|~v))+T[1]+2240044497&4294967295,_=A+(w<<21&4294967295|w>>>11),w=v+(A^(_|~I))+T[8]+1873313359&4294967295,v=_+(w<<6&4294967295|w>>>26),w=I+(_^(v|~A))+T[15]+4264355552&4294967295,I=v+(w<<10&4294967295|w>>>22),w=A+(v^(I|~_))+T[6]+2734768916&4294967295,A=I+(w<<15&4294967295|w>>>17),w=_+(I^(A|~v))+T[13]+1309151649&4294967295,_=A+(w<<21&4294967295|w>>>11),w=v+(A^(_|~I))+T[4]+4149444226&4294967295,v=_+(w<<6&4294967295|w>>>26),w=I+(_^(v|~A))+T[11]+3174756917&4294967295,I=v+(w<<10&4294967295|w>>>22),w=A+(v^(I|~_))+T[2]+718787259&4294967295,A=I+(w<<15&4294967295|w>>>17),w=_+(I^(A|~v))+T[9]+3951481745&4294967295,S.g[0]=S.g[0]+v&4294967295,S.g[1]=S.g[1]+(A+(w<<21&4294967295|w>>>11))&4294967295,S.g[2]=S.g[2]+A&4294967295,S.g[3]=S.g[3]+I&4294967295}s.prototype.u=function(S,v){v===void 0&&(v=S.length);for(var _=v-this.blockSize,T=this.B,A=this.h,I=0;I<v;){if(A==0)for(;I<=_;)r(this,S,I),I+=this.blockSize;if(typeof S=="string"){for(;I<v;)if(T[A++]=S.charCodeAt(I++),A==this.blockSize){r(this,T),A=0;break}}else for(;I<v;)if(T[A++]=S[I++],A==this.blockSize){r(this,T),A=0;break}}this.h=A,this.o+=v},s.prototype.v=function(){var S=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);S[0]=128;for(var v=1;v<S.length-8;++v)S[v]=0;var _=8*this.o;for(v=S.length-8;v<S.length;++v)S[v]=_&255,_/=256;for(this.u(S),S=Array(16),v=_=0;4>v;++v)for(var T=0;32>T;T+=8)S[_++]=this.g[v]>>>T&255;return S};function i(S,v){var _=l;return Object.prototype.hasOwnProperty.call(_,S)?_[S]:_[S]=v(S)}function o(S,v){this.h=v;for(var _=[],T=!0,A=S.length-1;0<=A;A--){var I=S[A]|0;T&&I==v||(_[A]=I,T=!1)}this.g=_}var l={};function c(S){return-128<=S&&128>S?i(S,function(v){return new o([v|0],0>v?-1:0)}):new o([S|0],0>S?-1:0)}function u(S){if(isNaN(S)||!isFinite(S))return p;if(0>S)return V(u(-S));for(var v=[],_=1,T=0;S>=_;T++)v[T]=S/_|0,_*=4294967296;return new o(v,0)}function d(S,v){if(S.length==0)throw Error("number format error: empty string");if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(S.charAt(0)=="-")return V(d(S.substring(1),v));if(0<=S.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=u(Math.pow(v,8)),T=p,A=0;A<S.length;A+=8){var I=Math.min(8,S.length-A),w=parseInt(S.substring(A,A+I),v);8>I?(I=u(Math.pow(v,I)),T=T.j(I).add(u(w))):(T=T.j(_),T=T.add(u(w)))}return T}var p=c(0),y=c(1),E=c(16777216);t=o.prototype,t.m=function(){if(P(this))return-V(this).m();for(var S=0,v=1,_=0;_<this.g.length;_++){var T=this.i(_);S+=(0<=T?T:4294967296+T)*v,v*=4294967296}return S},t.toString=function(S){if(S=S||10,2>S||36<S)throw Error("radix out of range: "+S);if(x(this))return"0";if(P(this))return"-"+V(this).toString(S);for(var v=u(Math.pow(S,6)),_=this,T="";;){var A=q(_,v).g;_=X(_,A.j(v));var I=((0<_.g.length?_.g[0]:_.h)>>>0).toString(S);if(_=A,x(_))return I+T;for(;6>I.length;)I="0"+I;T=I+T}},t.i=function(S){return 0>S?0:S<this.g.length?this.g[S]:this.h};function x(S){if(S.h!=0)return!1;for(var v=0;v<S.g.length;v++)if(S.g[v]!=0)return!1;return!0}function P(S){return S.h==-1}t.l=function(S){return S=X(this,S),P(S)?-1:x(S)?0:1};function V(S){for(var v=S.g.length,_=[],T=0;T<v;T++)_[T]=~S.g[T];return new o(_,~S.h).add(y)}t.abs=function(){return P(this)?V(this):this},t.add=function(S){for(var v=Math.max(this.g.length,S.g.length),_=[],T=0,A=0;A<=v;A++){var I=T+(this.i(A)&65535)+(S.i(A)&65535),w=(I>>>16)+(this.i(A)>>>16)+(S.i(A)>>>16);T=w>>>16,I&=65535,w&=65535,_[A]=w<<16|I}return new o(_,_[_.length-1]&-2147483648?-1:0)};function X(S,v){return S.add(V(v))}t.j=function(S){if(x(this)||x(S))return p;if(P(this))return P(S)?V(this).j(V(S)):V(V(this).j(S));if(P(S))return V(this.j(V(S)));if(0>this.l(E)&&0>S.l(E))return u(this.m()*S.m());for(var v=this.g.length+S.g.length,_=[],T=0;T<2*v;T++)_[T]=0;for(T=0;T<this.g.length;T++)for(var A=0;A<S.g.length;A++){var I=this.i(T)>>>16,w=this.i(T)&65535,Re=S.i(A)>>>16,rt=S.i(A)&65535;_[2*T+2*A]+=w*rt,Q(_,2*T+2*A),_[2*T+2*A+1]+=I*rt,Q(_,2*T+2*A+1),_[2*T+2*A+1]+=w*Re,Q(_,2*T+2*A+1),_[2*T+2*A+2]+=I*Re,Q(_,2*T+2*A+2)}for(T=0;T<v;T++)_[T]=_[2*T+1]<<16|_[2*T];for(T=v;T<2*v;T++)_[T]=0;return new o(_,0)};function Q(S,v){for(;(S[v]&65535)!=S[v];)S[v+1]+=S[v]>>>16,S[v]&=65535,v++}function Y(S,v){this.g=S,this.h=v}function q(S,v){if(x(v))throw Error("division by zero");if(x(S))return new Y(p,p);if(P(S))return v=q(V(S),v),new Y(V(v.g),V(v.h));if(P(v))return v=q(S,V(v)),new Y(V(v.g),v.h);if(30<S.g.length){if(P(S)||P(v))throw Error("slowDivide_ only works with positive integers.");for(var _=y,T=v;0>=T.l(S);)_=K(_),T=K(T);var A=B(_,1),I=B(T,1);for(T=B(T,2),_=B(_,2);!x(T);){var w=I.add(T);0>=w.l(S)&&(A=A.add(_),I=w),T=B(T,1),_=B(_,1)}return v=X(S,A.j(v)),new Y(A,v)}for(A=p;0<=S.l(v);){for(_=Math.max(1,Math.floor(S.m()/v.m())),T=Math.ceil(Math.log(_)/Math.LN2),T=48>=T?1:Math.pow(2,T-48),I=u(_),w=I.j(v);P(w)||0<w.l(S);)_-=T,I=u(_),w=I.j(v);x(I)&&(I=y),A=A.add(I),S=X(S,w)}return new Y(A,S)}t.A=function(S){return q(this,S).h},t.and=function(S){for(var v=Math.max(this.g.length,S.g.length),_=[],T=0;T<v;T++)_[T]=this.i(T)&S.i(T);return new o(_,this.h&S.h)},t.or=function(S){for(var v=Math.max(this.g.length,S.g.length),_=[],T=0;T<v;T++)_[T]=this.i(T)|S.i(T);return new o(_,this.h|S.h)},t.xor=function(S){for(var v=Math.max(this.g.length,S.g.length),_=[],T=0;T<v;T++)_[T]=this.i(T)^S.i(T);return new o(_,this.h^S.h)};function K(S){for(var v=S.g.length+1,_=[],T=0;T<v;T++)_[T]=S.i(T)<<1|S.i(T-1)>>>31;return new o(_,S.h)}function B(S,v){var _=v>>5;v%=32;for(var T=S.g.length-_,A=[],I=0;I<T;I++)A[I]=0<v?S.i(I+_)>>>v|S.i(I+_+1)<<32-v:S.i(I+_);return new o(A,S.h)}s.prototype.digest=s.prototype.v,s.prototype.reset=s.prototype.s,s.prototype.update=s.prototype.u,Qm=s,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=d,Vs=o}).apply(typeof Hd<"u"?Hd:typeof self<"u"?self:typeof window<"u"?window:{});var go=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Jm,Gr,Ym,Ao,uc,Xm,Zm,eg;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,h,f){return a==Array.prototype||a==Object.prototype||(a[h]=f.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof go=="object"&&go];for(var h=0;h<a.length;++h){var f=a[h];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var s=n(this);function r(a,h){if(h)e:{var f=s;a=a.split(".");for(var g=0;g<a.length-1;g++){var C=a[g];if(!(C in f))break e;f=f[C]}a=a[a.length-1],g=f[a],h=h(g),h!=g&&h!=null&&e(f,a,{configurable:!0,writable:!0,value:h})}}function i(a,h){a instanceof String&&(a+="");var f=0,g=!1,C={next:function(){if(!g&&f<a.length){var M=f++;return{value:h(M,a[M]),done:!1}}return g=!0,{done:!0,value:void 0}}};return C[Symbol.iterator]=function(){return C},C}r("Array.prototype.values",function(a){return a||function(){return i(this,function(h,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function c(a){var h=typeof a;return h=h!="object"?h:a?Array.isArray(a)?"array":h:"null",h=="array"||h=="object"&&typeof a.length=="number"}function u(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function d(a,h,f){return a.call.apply(a.bind,arguments)}function p(a,h,f){if(!a)throw Error();if(2<arguments.length){var g=Array.prototype.slice.call(arguments,2);return function(){var C=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(C,g),a.apply(h,C)}}return function(){return a.apply(h,arguments)}}function y(a,h,f){return y=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?d:p,y.apply(null,arguments)}function E(a,h){var f=Array.prototype.slice.call(arguments,1);return function(){var g=f.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function x(a,h){function f(){}f.prototype=h.prototype,a.aa=h.prototype,a.prototype=new f,a.prototype.constructor=a,a.Qb=function(g,C,M){for(var H=Array(arguments.length-2),Ce=2;Ce<arguments.length;Ce++)H[Ce-2]=arguments[Ce];return h.prototype[C].apply(g,H)}}function P(a){const h=a.length;if(0<h){const f=Array(h);for(let g=0;g<h;g++)f[g]=a[g];return f}return[]}function V(a,h){for(let f=1;f<arguments.length;f++){const g=arguments[f];if(c(g)){const C=a.length||0,M=g.length||0;a.length=C+M;for(let H=0;H<M;H++)a[C+H]=g[H]}else a.push(g)}}class X{constructor(h,f){this.i=h,this.j=f,this.h=0,this.g=null}get(){let h;return 0<this.h?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function Q(a){return/^[\s\xa0]*$/.test(a)}function Y(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function q(a){return q[" "](a),a}q[" "]=function(){};var K=Y().indexOf("Gecko")!=-1&&!(Y().toLowerCase().indexOf("webkit")!=-1&&Y().indexOf("Edge")==-1)&&!(Y().indexOf("Trident")!=-1||Y().indexOf("MSIE")!=-1)&&Y().indexOf("Edge")==-1;function B(a,h,f){for(const g in a)h.call(f,a[g],g,a)}function S(a,h){for(const f in a)h.call(void 0,a[f],f,a)}function v(a){const h={};for(const f in a)h[f]=a[f];return h}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function T(a,h){let f,g;for(let C=1;C<arguments.length;C++){g=arguments[C];for(f in g)a[f]=g[f];for(let M=0;M<_.length;M++)f=_[M],Object.prototype.hasOwnProperty.call(g,f)&&(a[f]=g[f])}}function A(a){var h=1;a=a.split(":");const f=[];for(;0<h&&a.length;)f.push(a.shift()),h--;return a.length&&f.push(a.join(":")),f}function I(a){l.setTimeout(()=>{throw a},0)}function w(){var a=Wt;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class Re{constructor(){this.h=this.g=null}add(h,f){const g=rt.get();g.set(h,f),this.h?this.h.next=g:this.g=g,this.h=g}}var rt=new X(()=>new ke,a=>a.reset());class ke{constructor(){this.next=this.g=this.h=null}set(h,f){this.h=h,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let fe,Ie=!1,Wt=new Re,fs=()=>{const a=l.Promise.resolve(void 0);fe=()=>{a.then(pn)}};var pn=()=>{for(var a;a=w();){try{a.h.call(a.g)}catch(f){I(f)}var h=rt;h.j(a),100>h.h&&(h.h++,a.next=h.g,h.g=a)}Ie=!1};function He(){this.s=this.s,this.C=this.C}He.prototype.s=!1,He.prototype.ma=function(){this.s||(this.s=!0,this.N())},He.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Qe(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}Qe.prototype.h=function(){this.defaultPrevented=!0};var nl=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};l.addEventListener("test",f,h),l.removeEventListener("test",f,h)}catch{}return a}();function ps(a,h){if(Qe.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var f=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget){if(K){e:{try{q(h.nodeName);var C=!0;break e}catch{}C=!1}C||(h=null)}}else f=="mouseover"?h=a.fromElement:f=="mouseout"&&(h=a.toElement);this.relatedTarget=h,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:ms[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&ps.aa.h.call(this)}}x(ps,Qe);var ms={2:"touch",3:"pen",4:"mouse"};ps.prototype.h=function(){ps.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var mn="closure_listenable_"+(1e6*Math.random()|0),xr=0;function Ki(a,h,f,g,C){this.listener=a,this.proxy=null,this.src=h,this.type=f,this.capture=!!g,this.ha=C,this.key=++xr,this.da=this.fa=!1}function Xt(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Sr(a){this.src=a,this.g={},this.h=0}Sr.prototype.add=function(a,h,f,g,C){var M=a.toString();a=this.g[M],a||(a=this.g[M]=[],this.h++);var H=R(a,h,g,C);return-1<H?(h=a[H],f||(h.fa=!1)):(h=new Ki(h,this.src,M,!!g,C),h.fa=f,a.push(h)),h};function b(a,h){var f=h.type;if(f in a.g){var g=a.g[f],C=Array.prototype.indexOf.call(g,h,void 0),M;(M=0<=C)&&Array.prototype.splice.call(g,C,1),M&&(Xt(h),a.g[f].length==0&&(delete a.g[f],a.h--))}}function R(a,h,f,g){for(var C=0;C<a.length;++C){var M=a[C];if(!M.da&&M.listener==h&&M.capture==!!f&&M.ha==g)return C}return-1}var N="closure_lm_"+(1e6*Math.random()|0),U={};function D(a,h,f,g,C){if(Array.isArray(h)){for(var M=0;M<h.length;M++)D(a,h[M],f,g,C);return null}return f=le(f),a&&a[mn]?a.K(h,f,u(g)?!!g.capture:!1,C):L(a,h,f,!1,g,C)}function L(a,h,f,g,C,M){if(!h)throw Error("Invalid event type");var H=u(C)?!!C.capture:!!C,Ce=J(a);if(Ce||(a[N]=Ce=new Sr(a)),f=Ce.add(h,f,g,H,M),f.proxy)return f;if(g=W(),f.proxy=g,g.src=a,g.listener=f,a.addEventListener)nl||(C=H),C===void 0&&(C=!1),a.addEventListener(h.toString(),g,C);else if(a.attachEvent)a.attachEvent(O(h.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return f}function W(){function a(f){return h.call(a.src,a.listener,f)}const h=ie;return a}function z(a,h,f,g,C){if(Array.isArray(h))for(var M=0;M<h.length;M++)z(a,h[M],f,g,C);else g=u(g)?!!g.capture:!!g,f=le(f),a&&a[mn]?(a=a.i,h=String(h).toString(),h in a.g&&(M=a.g[h],f=R(M,f,g,C),-1<f&&(Xt(M[f]),Array.prototype.splice.call(M,f,1),M.length==0&&(delete a.g[h],a.h--)))):a&&(a=J(a))&&(h=a.g[h.toString()],a=-1,h&&(a=R(h,f,g,C)),(f=-1<a?h[a]:null)&&j(f))}function j(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[mn])b(h.i,a);else{var f=a.type,g=a.proxy;h.removeEventListener?h.removeEventListener(f,g,a.capture):h.detachEvent?h.detachEvent(O(f),g):h.addListener&&h.removeListener&&h.removeListener(g),(f=J(h))?(b(f,a),f.h==0&&(f.src=null,h[N]=null)):Xt(a)}}}function O(a){return a in U?U[a]:U[a]="on"+a}function ie(a,h){if(a.da)a=!0;else{h=new ps(h,this);var f=a.listener,g=a.ha||a.src;a.fa&&j(a),a=f.call(g,h)}return a}function J(a){return a=a[N],a instanceof Sr?a:null}var te="__closure_events_fn_"+(1e9*Math.random()>>>0);function le(a){return typeof a=="function"?a:(a[te]||(a[te]=function(h){return a.handleEvent(h)}),a[te])}function oe(){He.call(this),this.i=new Sr(this),this.M=this,this.F=null}x(oe,He),oe.prototype[mn]=!0,oe.prototype.removeEventListener=function(a,h,f,g){z(this,a,h,f,g)};function de(a,h){var f,g=a.F;if(g)for(f=[];g;g=g.F)f.push(g);if(a=a.M,g=h.type||h,typeof h=="string")h=new Qe(h,a);else if(h instanceof Qe)h.target=h.target||a;else{var C=h;h=new Qe(g,a),T(h,C)}if(C=!0,f)for(var M=f.length-1;0<=M;M--){var H=h.g=f[M];C=ve(H,g,!0,h)&&C}if(H=h.g=a,C=ve(H,g,!0,h)&&C,C=ve(H,g,!1,h)&&C,f)for(M=0;M<f.length;M++)H=h.g=f[M],C=ve(H,g,!1,h)&&C}oe.prototype.N=function(){if(oe.aa.N.call(this),this.i){var a=this.i,h;for(h in a.g){for(var f=a.g[h],g=0;g<f.length;g++)Xt(f[g]);delete a.g[h],a.h--}}this.F=null},oe.prototype.K=function(a,h,f,g){return this.i.add(String(a),h,!1,f,g)},oe.prototype.L=function(a,h,f,g){return this.i.add(String(a),h,!0,f,g)};function ve(a,h,f,g){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();for(var C=!0,M=0;M<h.length;++M){var H=h[M];if(H&&!H.da&&H.capture==f){var Ce=H.listener,ot=H.ha||H.src;H.fa&&b(a.i,H),C=Ce.call(ot,g)!==!1&&C}}return C&&!g.defaultPrevented}function Oe(a,h,f){if(typeof a=="function")f&&(a=y(a,f));else if(a&&typeof a.handleEvent=="function")a=y(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(h)?-1:l.setTimeout(a,h||0)}function We(a){a.g=Oe(()=>{a.g=null,a.i&&(a.i=!1,We(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class Lt extends He{constructor(h,f){super(),this.m=h,this.l=f,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:We(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ht(a){He.call(this),this.h=a,this.g={}}x(ht,He);var On=[];function Rr(a){B(a.g,function(h,f){this.g.hasOwnProperty(f)&&j(h)},a),a.g={}}ht.prototype.N=function(){ht.aa.N.call(this),Rr(this)},ht.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var it=l.JSON.stringify,Ft=l.JSON.parse,Gi=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function Qs(){}Qs.prototype.h=null;function Gu(a){return a.h||(a.h=a.i())}function Qu(){}var Cr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function sl(){Qe.call(this,"d")}x(sl,Qe);function rl(){Qe.call(this,"c")}x(rl,Qe);var gs={},Ju=null;function Qi(){return Ju=Ju||new oe}gs.La="serverreachability";function Yu(a){Qe.call(this,gs.La,a)}x(Yu,Qe);function Pr(a){const h=Qi();de(h,new Yu(h))}gs.STAT_EVENT="statevent";function Xu(a,h){Qe.call(this,gs.STAT_EVENT,a),this.stat=h}x(Xu,Qe);function wt(a){const h=Qi();de(h,new Xu(h,a))}gs.Ma="timingevent";function Zu(a,h){Qe.call(this,gs.Ma,a),this.size=h}x(Zu,Qe);function kr(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},h)}function Mr(){this.g=!0}Mr.prototype.xa=function(){this.g=!1};function G_(a,h,f,g,C,M){a.info(function(){if(a.g)if(M)for(var H="",Ce=M.split("&"),ot=0;ot<Ce.length;ot++){var Ee=Ce[ot].split("=");if(1<Ee.length){var dt=Ee[0];Ee=Ee[1];var ft=dt.split("_");H=2<=ft.length&&ft[1]=="type"?H+(dt+"="+Ee+"&"):H+(dt+"=redacted&")}}else H=null;else H=M;return"XMLHTTP REQ ("+g+") [attempt "+C+"]: "+h+`
`+f+`
`+H})}function Q_(a,h,f,g,C,M,H){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+C+"]: "+h+`
`+f+`
`+M+" "+H})}function Js(a,h,f,g){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+Y_(a,f)+(g?" "+g:"")})}function J_(a,h){a.info(function(){return"TIMEOUT: "+h})}Mr.prototype.info=function(){};function Y_(a,h){if(!a.g)return h;if(!h)return null;try{var f=JSON.parse(h);if(f){for(a=0;a<f.length;a++)if(Array.isArray(f[a])){var g=f[a];if(!(2>g.length)){var C=g[1];if(Array.isArray(C)&&!(1>C.length)){var M=C[0];if(M!="noop"&&M!="stop"&&M!="close")for(var H=1;H<C.length;H++)C[H]=""}}}}return it(f)}catch{return h}}var Ji={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},eh={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},il;function Yi(){}x(Yi,Qs),Yi.prototype.g=function(){return new XMLHttpRequest},Yi.prototype.i=function(){return{}},il=new Yi;function Ln(a,h,f,g){this.j=a,this.i=h,this.l=f,this.R=g||1,this.U=new ht(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new th}function th(){this.i=null,this.g="",this.h=!1}var nh={},ol={};function al(a,h,f){a.L=1,a.v=to(gn(h)),a.m=f,a.P=!0,sh(a,null)}function sh(a,h){a.F=Date.now(),Xi(a),a.A=gn(a.v);var f=a.A,g=a.R;Array.isArray(g)||(g=[String(g)]),_h(f.i,"t",g),a.C=0,f=a.j.J,a.h=new th,a.g=Vh(a.j,f?h:null,!a.m),0<a.O&&(a.M=new Lt(y(a.Y,a,a.g),a.O)),h=a.U,f=a.g,g=a.ca;var C="readystatechange";Array.isArray(C)||(C&&(On[0]=C.toString()),C=On);for(var M=0;M<C.length;M++){var H=D(f,C[M],g||h.handleEvent,!1,h.h||h);if(!H)break;h.g[H.key]=H}h=a.H?v(a.H):{},a.m?(a.u||(a.u="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,h)):(a.u="GET",a.g.ea(a.A,a.u,null,h)),Pr(),G_(a.i,a.u,a.A,a.l,a.R,a.m)}Ln.prototype.ca=function(a){a=a.target;const h=this.M;h&&_n(a)==3?h.j():this.Y(a)},Ln.prototype.Y=function(a){try{if(a==this.g)e:{const ft=_n(this.g);var h=this.g.Ba();const Zs=this.g.Z();if(!(3>ft)&&(ft!=3||this.g&&(this.h.h||this.g.oa()||Eh(this.g)))){this.J||ft!=4||h==7||(h==8||0>=Zs?Pr(3):Pr(2)),ll(this);var f=this.g.Z();this.X=f;t:if(rh(this)){var g=Eh(this.g);a="";var C=g.length,M=_n(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){_s(this),Nr(this);var H="";break t}this.h.i=new l.TextDecoder}for(h=0;h<C;h++)this.h.h=!0,a+=this.h.i.decode(g[h],{stream:!(M&&h==C-1)});g.length=0,this.h.g+=a,this.C=0,H=this.h.g}else H=this.g.oa();if(this.o=f==200,Q_(this.i,this.u,this.A,this.l,this.R,ft,f),this.o){if(this.T&&!this.K){t:{if(this.g){var Ce,ot=this.g;if((Ce=ot.g?ot.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Q(Ce)){var Ee=Ce;break t}}Ee=null}if(f=Ee)Js(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,cl(this,f);else{this.o=!1,this.s=3,wt(12),_s(this),Nr(this);break e}}if(this.P){f=!0;let Kt;for(;!this.J&&this.C<H.length;)if(Kt=X_(this,H),Kt==ol){ft==4&&(this.s=4,wt(14),f=!1),Js(this.i,this.l,null,"[Incomplete Response]");break}else if(Kt==nh){this.s=4,wt(15),Js(this.i,this.l,H,"[Invalid Chunk]"),f=!1;break}else Js(this.i,this.l,Kt,null),cl(this,Kt);if(rh(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ft!=4||H.length!=0||this.h.h||(this.s=1,wt(16),f=!1),this.o=this.o&&f,!f)Js(this.i,this.l,H,"[Invalid Chunked Response]"),_s(this),Nr(this);else if(0<H.length&&!this.W){this.W=!0;var dt=this.j;dt.g==this&&dt.ba&&!dt.M&&(dt.j.info("Great, no buffering proxy detected. Bytes received: "+H.length),ml(dt),dt.M=!0,wt(11))}}else Js(this.i,this.l,H,null),cl(this,H);ft==4&&_s(this),this.o&&!this.J&&(ft==4?kh(this.j,this):(this.o=!1,Xi(this)))}else my(this.g),f==400&&0<H.indexOf("Unknown SID")?(this.s=3,wt(12)):(this.s=0,wt(13)),_s(this),Nr(this)}}}catch{}finally{}};function rh(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function X_(a,h){var f=a.C,g=h.indexOf(`
`,f);return g==-1?ol:(f=Number(h.substring(f,g)),isNaN(f)?nh:(g+=1,g+f>h.length?ol:(h=h.slice(g,g+f),a.C=g+f,h)))}Ln.prototype.cancel=function(){this.J=!0,_s(this)};function Xi(a){a.S=Date.now()+a.I,ih(a,a.I)}function ih(a,h){if(a.B!=null)throw Error("WatchDog timer not null");a.B=kr(y(a.ba,a),h)}function ll(a){a.B&&(l.clearTimeout(a.B),a.B=null)}Ln.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(J_(this.i,this.A),this.L!=2&&(Pr(),wt(17)),_s(this),this.s=2,Nr(this)):ih(this,this.S-a)};function Nr(a){a.j.G==0||a.J||kh(a.j,a)}function _s(a){ll(a);var h=a.M;h&&typeof h.ma=="function"&&h.ma(),a.M=null,Rr(a.U),a.g&&(h=a.g,a.g=null,h.abort(),h.ma())}function cl(a,h){try{var f=a.j;if(f.G!=0&&(f.g==a||ul(f.h,a))){if(!a.K&&ul(f.h,a)&&f.G==3){try{var g=f.Da.g.parse(h)}catch{g=null}if(Array.isArray(g)&&g.length==3){var C=g;if(C[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<a.F)ao(f),io(f);else break e;pl(f),wt(18)}}else f.za=C[1],0<f.za-f.T&&37500>C[2]&&f.F&&f.v==0&&!f.C&&(f.C=kr(y(f.Za,f),6e3));if(1>=lh(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else vs(f,11)}else if((a.K||f.g==a)&&ao(f),!Q(h))for(C=f.Da.g.parse(h),h=0;h<C.length;h++){let Ee=C[h];if(f.T=Ee[0],Ee=Ee[1],f.G==2)if(Ee[0]=="c"){f.K=Ee[1],f.ia=Ee[2];const dt=Ee[3];dt!=null&&(f.la=dt,f.j.info("VER="+f.la));const ft=Ee[4];ft!=null&&(f.Aa=ft,f.j.info("SVER="+f.Aa));const Zs=Ee[5];Zs!=null&&typeof Zs=="number"&&0<Zs&&(g=1.5*Zs,f.L=g,f.j.info("backChannelRequestTimeoutMs_="+g)),g=f;const Kt=a.g;if(Kt){const co=Kt.g?Kt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(co){var M=g.h;M.g||co.indexOf("spdy")==-1&&co.indexOf("quic")==-1&&co.indexOf("h2")==-1||(M.j=M.l,M.g=new Set,M.h&&(hl(M,M.h),M.h=null))}if(g.D){const gl=Kt.g?Kt.g.getResponseHeader("X-HTTP-Session-Id"):null;gl&&(g.ya=gl,Ve(g.I,g.D,gl))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-a.F,f.j.info("Handshake RTT: "+f.R+"ms")),g=f;var H=a;if(g.qa=Dh(g,g.J?g.ia:null,g.W),H.K){ch(g.h,H);var Ce=H,ot=g.L;ot&&(Ce.I=ot),Ce.B&&(ll(Ce),Xi(Ce)),g.g=H}else Ch(g);0<f.i.length&&oo(f)}else Ee[0]!="stop"&&Ee[0]!="close"||vs(f,7);else f.G==3&&(Ee[0]=="stop"||Ee[0]=="close"?Ee[0]=="stop"?vs(f,7):fl(f):Ee[0]!="noop"&&f.l&&f.l.ta(Ee),f.v=0)}}Pr(4)}catch{}}var Z_=class{constructor(a,h){this.g=a,this.map=h}};function oh(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ah(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function lh(a){return a.h?1:a.g?a.g.size:0}function ul(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function hl(a,h){a.g?a.g.add(h):a.h=h}function ch(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}oh.prototype.cancel=function(){if(this.i=uh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function uh(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const f of a.g.values())h=h.concat(f.D);return h}return P(a.i)}function ey(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(c(a)){for(var h=[],f=a.length,g=0;g<f;g++)h.push(a[g]);return h}h=[],f=0;for(g in a)h[f++]=a[g];return h}function ty(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(c(a)||typeof a=="string"){var h=[];a=a.length;for(var f=0;f<a;f++)h.push(f);return h}h=[],f=0;for(const g in a)h[f++]=g;return h}}}function hh(a,h){if(a.forEach&&typeof a.forEach=="function")a.forEach(h,void 0);else if(c(a)||typeof a=="string")Array.prototype.forEach.call(a,h,void 0);else for(var f=ty(a),g=ey(a),C=g.length,M=0;M<C;M++)h.call(void 0,g[M],f&&f[M],a)}var dh=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function ny(a,h){if(a){a=a.split("&");for(var f=0;f<a.length;f++){var g=a[f].indexOf("="),C=null;if(0<=g){var M=a[f].substring(0,g);C=a[f].substring(g+1)}else M=a[f];h(M,C?decodeURIComponent(C.replace(/\+/g," ")):"")}}}function ys(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof ys){this.h=a.h,Zi(this,a.j),this.o=a.o,this.g=a.g,eo(this,a.s),this.l=a.l;var h=a.i,f=new Or;f.i=h.i,h.g&&(f.g=new Map(h.g),f.h=h.h),fh(this,f),this.m=a.m}else a&&(h=String(a).match(dh))?(this.h=!1,Zi(this,h[1]||"",!0),this.o=Dr(h[2]||""),this.g=Dr(h[3]||"",!0),eo(this,h[4]),this.l=Dr(h[5]||"",!0),fh(this,h[6]||"",!0),this.m=Dr(h[7]||"")):(this.h=!1,this.i=new Or(null,this.h))}ys.prototype.toString=function(){var a=[],h=this.j;h&&a.push(Vr(h,ph,!0),":");var f=this.g;return(f||h=="file")&&(a.push("//"),(h=this.o)&&a.push(Vr(h,ph,!0),"@"),a.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&a.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(Vr(f,f.charAt(0)=="/"?iy:ry,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",Vr(f,ay)),a.join("")};function gn(a){return new ys(a)}function Zi(a,h,f){a.j=f?Dr(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function eo(a,h){if(h){if(h=Number(h),isNaN(h)||0>h)throw Error("Bad port number "+h);a.s=h}else a.s=null}function fh(a,h,f){h instanceof Or?(a.i=h,ly(a.i,a.h)):(f||(h=Vr(h,oy)),a.i=new Or(h,a.h))}function Ve(a,h,f){a.i.set(h,f)}function to(a){return Ve(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Dr(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Vr(a,h,f){return typeof a=="string"?(a=encodeURI(a).replace(h,sy),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function sy(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var ph=/[#\/\?@]/g,ry=/[#\?:]/g,iy=/[#\?]/g,oy=/[#\?@]/g,ay=/#/g;function Or(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function Fn(a){a.g||(a.g=new Map,a.h=0,a.i&&ny(a.i,function(h,f){a.add(decodeURIComponent(h.replace(/\+/g," ")),f)}))}t=Or.prototype,t.add=function(a,h){Fn(this),this.i=null,a=Ys(this,a);var f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(h),this.h+=1,this};function mh(a,h){Fn(a),h=Ys(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function gh(a,h){return Fn(a),h=Ys(a,h),a.g.has(h)}t.forEach=function(a,h){Fn(this),this.g.forEach(function(f,g){f.forEach(function(C){a.call(h,C,g,this)},this)},this)},t.na=function(){Fn(this);const a=Array.from(this.g.values()),h=Array.from(this.g.keys()),f=[];for(let g=0;g<h.length;g++){const C=a[g];for(let M=0;M<C.length;M++)f.push(h[g])}return f},t.V=function(a){Fn(this);let h=[];if(typeof a=="string")gh(this,a)&&(h=h.concat(this.g.get(Ys(this,a))));else{a=Array.from(this.g.values());for(let f=0;f<a.length;f++)h=h.concat(a[f])}return h},t.set=function(a,h){return Fn(this),this.i=null,a=Ys(this,a),gh(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},t.get=function(a,h){return a?(a=this.V(a),0<a.length?String(a[0]):h):h};function _h(a,h,f){mh(a,h),0<f.length&&(a.i=null,a.g.set(Ys(a,h),P(f)),a.h+=f.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(var f=0;f<h.length;f++){var g=h[f];const M=encodeURIComponent(String(g)),H=this.V(g);for(g=0;g<H.length;g++){var C=M;H[g]!==""&&(C+="="+encodeURIComponent(String(H[g]))),a.push(C)}}return this.i=a.join("&")};function Ys(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function ly(a,h){h&&!a.j&&(Fn(a),a.i=null,a.g.forEach(function(f,g){var C=g.toLowerCase();g!=C&&(mh(this,g),_h(this,C,f))},a)),a.j=h}function cy(a,h){const f=new Mr;if(l.Image){const g=new Image;g.onload=E(Un,f,"TestLoadImage: loaded",!0,h,g),g.onerror=E(Un,f,"TestLoadImage: error",!1,h,g),g.onabort=E(Un,f,"TestLoadImage: abort",!1,h,g),g.ontimeout=E(Un,f,"TestLoadImage: timeout",!1,h,g),l.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else h(!1)}function uy(a,h){const f=new Mr,g=new AbortController,C=setTimeout(()=>{g.abort(),Un(f,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:g.signal}).then(M=>{clearTimeout(C),M.ok?Un(f,"TestPingServer: ok",!0,h):Un(f,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(C),Un(f,"TestPingServer: error",!1,h)})}function Un(a,h,f,g,C){try{C&&(C.onload=null,C.onerror=null,C.onabort=null,C.ontimeout=null),g(f)}catch{}}function hy(){this.g=new Gi}function dy(a,h,f){const g=f||"";try{hh(a,function(C,M){let H=C;u(C)&&(H=it(C)),h.push(g+M+"="+encodeURIComponent(H))})}catch(C){throw h.push(g+"type="+encodeURIComponent("_badmap")),C}}function no(a){this.l=a.Ub||null,this.j=a.eb||!1}x(no,Qs),no.prototype.g=function(){return new so(this.l,this.j)},no.prototype.i=function(a){return function(){return a}}({});function so(a,h){oe.call(this),this.D=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}x(so,oe),t=so.prototype,t.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=h,this.readyState=1,Fr(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const h={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(h.body=a),(this.D||l).fetch(new Request(this.A,h)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Lr(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Fr(this)),this.g&&(this.readyState=3,Fr(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;yh(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function yh(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.v.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?Lr(this):Fr(this),this.readyState==3&&yh(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,Lr(this))},t.Qa=function(a){this.g&&(this.response=a,Lr(this))},t.ga=function(){this.g&&Lr(this)};function Lr(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Fr(a)}t.setRequestHeader=function(a,h){this.u.append(a,h)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var f=h.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=h.next();return a.join(`\r
`)};function Fr(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(so.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function vh(a){let h="";return B(a,function(f,g){h+=g,h+=":",h+=f,h+=`\r
`}),h}function dl(a,h,f){e:{for(g in f){var g=!1;break e}g=!0}g||(f=vh(f),typeof a=="string"?f!=null&&encodeURIComponent(String(f)):Ve(a,h,f))}function $e(a){oe.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}x($e,oe);var fy=/^https?$/i,py=["POST","PUT"];t=$e.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,h,f,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():il.g(),this.v=this.o?Gu(this.o):Gu(il),this.g.onreadystatechange=y(this.Ea,this);try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(M){wh(this,M);return}if(a=f||"",f=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var C in g)f.set(C,g[C]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const M of g.keys())f.set(M,g.get(M));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(f.keys()).find(M=>M.toLowerCase()=="content-type"),C=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(py,h,void 0))||g||C||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[M,H]of f)this.g.setRequestHeader(M,H);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ih(this),this.u=!0,this.g.send(a),this.u=!1}catch(M){wh(this,M)}};function wh(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.m=5,bh(a),ro(a)}function bh(a){a.A||(a.A=!0,de(a,"complete"),de(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,de(this,"complete"),de(this,"abort"),ro(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ro(this,!0)),$e.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Th(this):this.bb())},t.bb=function(){Th(this)};function Th(a){if(a.h&&typeof o<"u"&&(!a.v[1]||_n(a)!=4||a.Z()!=2)){if(a.u&&_n(a)==4)Oe(a.Ea,0,a);else if(de(a,"readystatechange"),_n(a)==4){a.h=!1;try{const H=a.Z();e:switch(H){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var f;if(!(f=h)){var g;if(g=H===0){var C=String(a.D).match(dh)[1]||null;!C&&l.self&&l.self.location&&(C=l.self.location.protocol.slice(0,-1)),g=!fy.test(C?C.toLowerCase():"")}f=g}if(f)de(a,"complete"),de(a,"success");else{a.m=6;try{var M=2<_n(a)?a.g.statusText:""}catch{M=""}a.l=M+" ["+a.Z()+"]",bh(a)}}finally{ro(a)}}}}function ro(a,h){if(a.g){Ih(a);const f=a.g,g=a.v[0]?()=>{}:null;a.g=null,a.v=null,h||de(a,"ready");try{f.onreadystatechange=g}catch{}}}function Ih(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function _n(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<_n(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),Ft(h)}};function Eh(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function my(a){const h={};a=(a.g&&2<=_n(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(Q(a[g]))continue;var f=A(a[g]);const C=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const M=h[C]||[];h[C]=M,M.push(f)}S(h,function(g){return g.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ur(a,h,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||h}function Ah(a){this.Aa=0,this.i=[],this.j=new Mr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ur("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ur("baseRetryDelayMs",5e3,a),this.cb=Ur("retryDelaySeedMs",1e4,a),this.Wa=Ur("forwardChannelMaxRetries",2,a),this.wa=Ur("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new oh(a&&a.concurrentRequestLimit),this.Da=new hy,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Ah.prototype,t.la=8,t.G=1,t.connect=function(a,h,f,g){wt(0),this.W=a,this.H=h||{},f&&g!==void 0&&(this.H.OSID=f,this.H.OAID=g),this.F=this.X,this.I=Dh(this,null,this.W),oo(this)};function fl(a){if(xh(a),a.G==3){var h=a.U++,f=gn(a.I);if(Ve(f,"SID",a.K),Ve(f,"RID",h),Ve(f,"TYPE","terminate"),$r(a,f),h=new Ln(a,a.j,h),h.L=2,h.v=to(gn(f)),f=!1,l.navigator&&l.navigator.sendBeacon)try{f=l.navigator.sendBeacon(h.v.toString(),"")}catch{}!f&&l.Image&&(new Image().src=h.v,f=!0),f||(h.g=Vh(h.j,null),h.g.ea(h.v)),h.F=Date.now(),Xi(h)}Nh(a)}function io(a){a.g&&(ml(a),a.g.cancel(),a.g=null)}function xh(a){io(a),a.u&&(l.clearTimeout(a.u),a.u=null),ao(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function oo(a){if(!ah(a.h)&&!a.s){a.s=!0;var h=a.Ga;fe||fs(),Ie||(fe(),Ie=!0),Wt.add(h,a),a.B=0}}function gy(a,h){return lh(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=h.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=kr(y(a.Ga,a,h),Mh(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const C=new Ln(this,this.j,a);let M=this.o;if(this.S&&(M?(M=v(M),T(M,this.S)):M=this.S),this.m!==null||this.O||(C.H=M,M=null),this.P)e:{for(var h=0,f=0;f<this.i.length;f++){t:{var g=this.i[f];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(h+=g,4096<h){h=f;break e}if(h===4096||f===this.i.length-1){h=f+1;break e}}h=1e3}else h=1e3;h=Rh(this,C,h),f=gn(this.I),Ve(f,"RID",a),Ve(f,"CVER",22),this.D&&Ve(f,"X-HTTP-Session-Id",this.D),$r(this,f),M&&(this.O?h="headers="+encodeURIComponent(String(vh(M)))+"&"+h:this.m&&dl(f,this.m,M)),hl(this.h,C),this.Ua&&Ve(f,"TYPE","init"),this.P?(Ve(f,"$req",h),Ve(f,"SID","null"),C.T=!0,al(C,f,null)):al(C,f,h),this.G=2}}else this.G==3&&(a?Sh(this,a):this.i.length==0||ah(this.h)||Sh(this))};function Sh(a,h){var f;h?f=h.l:f=a.U++;const g=gn(a.I);Ve(g,"SID",a.K),Ve(g,"RID",f),Ve(g,"AID",a.T),$r(a,g),a.m&&a.o&&dl(g,a.m,a.o),f=new Ln(a,a.j,f,a.B+1),a.m===null&&(f.H=a.o),h&&(a.i=h.D.concat(a.i)),h=Rh(a,f,1e3),f.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),hl(a.h,f),al(f,g,h)}function $r(a,h){a.H&&B(a.H,function(f,g){Ve(h,g,f)}),a.l&&hh({},function(f,g){Ve(h,g,f)})}function Rh(a,h,f){f=Math.min(a.i.length,f);var g=a.l?y(a.l.Na,a.l,a):null;e:{var C=a.i;let M=-1;for(;;){const H=["count="+f];M==-1?0<f?(M=C[0].g,H.push("ofs="+M)):M=0:H.push("ofs="+M);let Ce=!0;for(let ot=0;ot<f;ot++){let Ee=C[ot].g;const dt=C[ot].map;if(Ee-=M,0>Ee)M=Math.max(0,C[ot].g-100),Ce=!1;else try{dy(dt,H,"req"+Ee+"_")}catch{g&&g(dt)}}if(Ce){g=H.join("&");break e}}}return a=a.i.splice(0,f),h.D=a,g}function Ch(a){if(!a.g&&!a.u){a.Y=1;var h=a.Fa;fe||fs(),Ie||(fe(),Ie=!0),Wt.add(h,a),a.v=0}}function pl(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=kr(y(a.Fa,a),Mh(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,Ph(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=kr(y(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,wt(10),io(this),Ph(this))};function ml(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function Ph(a){a.g=new Ln(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var h=gn(a.qa);Ve(h,"RID","rpc"),Ve(h,"SID",a.K),Ve(h,"AID",a.T),Ve(h,"CI",a.F?"0":"1"),!a.F&&a.ja&&Ve(h,"TO",a.ja),Ve(h,"TYPE","xmlhttp"),$r(a,h),a.m&&a.o&&dl(h,a.m,a.o),a.L&&(a.g.I=a.L);var f=a.g;a=a.ia,f.L=1,f.v=to(gn(h)),f.m=null,f.P=!0,sh(f,a)}t.Za=function(){this.C!=null&&(this.C=null,io(this),pl(this),wt(19))};function ao(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function kh(a,h){var f=null;if(a.g==h){ao(a),ml(a),a.g=null;var g=2}else if(ul(a.h,h))f=h.D,ch(a.h,h),g=1;else return;if(a.G!=0){if(h.o)if(g==1){f=h.m?h.m.length:0,h=Date.now()-h.F;var C=a.B;g=Qi(),de(g,new Zu(g,f)),oo(a)}else Ch(a);else if(C=h.s,C==3||C==0&&0<h.X||!(g==1&&gy(a,h)||g==2&&pl(a)))switch(f&&0<f.length&&(h=a.h,h.i=h.i.concat(f)),C){case 1:vs(a,5);break;case 4:vs(a,10);break;case 3:vs(a,6);break;default:vs(a,2)}}}function Mh(a,h){let f=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(f*=2),f*h}function vs(a,h){if(a.j.info("Error code "+h),h==2){var f=y(a.fb,a),g=a.Xa;const C=!g;g=new ys(g||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Zi(g,"https"),to(g),C?cy(g.toString(),f):uy(g.toString(),f)}else wt(2);a.G=0,a.l&&a.l.sa(h),Nh(a),xh(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),wt(2)):(this.j.info("Failed to ping google.com"),wt(1))};function Nh(a){if(a.G=0,a.ka=[],a.l){const h=uh(a.h);(h.length!=0||a.i.length!=0)&&(V(a.ka,h),V(a.ka,a.i),a.h.i.length=0,P(a.i),a.i.length=0),a.l.ra()}}function Dh(a,h,f){var g=f instanceof ys?gn(f):new ys(f);if(g.g!="")h&&(g.g=h+"."+g.g),eo(g,g.s);else{var C=l.location;g=C.protocol,h=h?h+"."+C.hostname:C.hostname,C=+C.port;var M=new ys(null);g&&Zi(M,g),h&&(M.g=h),C&&eo(M,C),f&&(M.l=f),g=M}return f=a.D,h=a.ya,f&&h&&Ve(g,f,h),Ve(g,"VER",a.la),$r(a,g),g}function Vh(a,h,f){if(h&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Ca&&!a.pa?new $e(new no({eb:f})):new $e(a.pa),h.Ha(a.J),h}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Oh(){}t=Oh.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function lo(){}lo.prototype.g=function(a,h){return new kt(a,h)};function kt(a,h){oe.call(this),this.g=new Ah(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.va&&(a?a["X-WebChannel-Client-Profile"]=h.va:a={"X-WebChannel-Client-Profile":h.va}),this.g.S=a,(a=h&&h.Sb)&&!Q(a)&&(this.g.m=a),this.v=h&&h.supportsCrossDomainXhr||!1,this.u=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!Q(h)&&(this.g.D=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new Xs(this)}x(kt,oe),kt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},kt.prototype.close=function(){fl(this.g)},kt.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.u&&(f={},f.__data__=it(a),a=f);h.i.push(new Z_(h.Ya++,a)),h.G==3&&oo(h)},kt.prototype.N=function(){this.g.l=null,delete this.j,fl(this.g),delete this.g,kt.aa.N.call(this)};function Lh(a){sl.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const f in h){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}x(Lh,sl);function Fh(){rl.call(this),this.status=1}x(Fh,rl);function Xs(a){this.g=a}x(Xs,Oh),Xs.prototype.ua=function(){de(this.g,"a")},Xs.prototype.ta=function(a){de(this.g,new Lh(a))},Xs.prototype.sa=function(a){de(this.g,new Fh)},Xs.prototype.ra=function(){de(this.g,"b")},lo.prototype.createWebChannel=lo.prototype.g,kt.prototype.send=kt.prototype.o,kt.prototype.open=kt.prototype.m,kt.prototype.close=kt.prototype.close,eg=function(){return new lo},Zm=function(){return Qi()},Xm=gs,uc={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ji.NO_ERROR=0,Ji.TIMEOUT=8,Ji.HTTP_ERROR=6,Ao=Ji,eh.COMPLETE="complete",Ym=eh,Qu.EventType=Cr,Cr.OPEN="a",Cr.CLOSE="b",Cr.ERROR="c",Cr.MESSAGE="d",oe.prototype.listen=oe.prototype.K,Gr=Qu,$e.prototype.listenOnce=$e.prototype.L,$e.prototype.getLastError=$e.prototype.Ka,$e.prototype.getLastErrorCode=$e.prototype.Ba,$e.prototype.getStatus=$e.prototype.Z,$e.prototype.getResponseJson=$e.prototype.Oa,$e.prototype.getResponseText=$e.prototype.oa,$e.prototype.send=$e.prototype.ea,$e.prototype.setWithCredentials=$e.prototype.Ha,Jm=$e}).apply(typeof go<"u"?go:typeof self<"u"?self:typeof window<"u"?window:{});const Wd="@firebase/firestore";/**
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
 */let mt=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};mt.UNAUTHENTICATED=new mt(null),mt.GOOGLE_CREDENTIALS=new mt("google-credentials-uid"),mt.FIRST_PARTY=new mt("first-party-uid"),mt.MOCK_USER=new mt("mock-user");/**
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
 */let Tr="10.14.0";/**
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
 */const Us=new Ma("@firebase/firestore");function qr(){return Us.logLevel}function Z(t,...e){if(Us.logLevel<=_e.DEBUG){const n=e.map(Xc);Us.debug(`Firestore (${Tr}): ${t}`,...n)}}function kn(t,...e){if(Us.logLevel<=_e.ERROR){const n=e.map(Xc);Us.error(`Firestore (${Tr}): ${t}`,...n)}}function pr(t,...e){if(Us.logLevel<=_e.WARN){const n=e.map(Xc);Us.warn(`Firestore (${Tr}): ${t}`,...n)}}function Xc(t){if(typeof t=="string")return t;try{/**
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
 */function ae(t="Unexpected state"){const e=`FIRESTORE (${Tr}) INTERNAL ASSERTION FAILED: `+t;throw kn(e),new Error(e)}function Te(t,e){t||ae()}function he(t,e){return t}/**
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
 */const F={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class ee extends Yt{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Zn{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
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
 */class tg{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class iI{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(mt.UNAUTHENTICATED))}shutdown(){}}class oI{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class aI{constructor(e){this.t=e,this.currentUser=mt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Te(this.o===void 0);let s=this.i;const r=c=>this.i!==s?(s=this.i,n(c)):Promise.resolve();let i=new Zn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Zn,e.enqueueRetryable(()=>r(this.currentUser))};const o=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await r(this.currentUser)})},l=c=>{Z("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(c=>l(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(Z("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Zn)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(s=>this.i!==e?(Z("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(Te(typeof s.accessToken=="string"),new tg(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Te(e===null||typeof e=="string"),new mt(e)}}class lI{constructor(e,n,s){this.l=e,this.h=n,this.P=s,this.type="FirstParty",this.user=mt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class cI{constructor(e,n,s){this.l=e,this.h=n,this.P=s}getToken(){return Promise.resolve(new lI(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(mt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class uI{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class hI{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){Te(this.o===void 0);const s=i=>{i.error!=null&&Z("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,Z("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>s(i))};const r=i=>{Z("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>r(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?r(i):Z("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Te(typeof n.token=="string"),this.R=n.token,new uI(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */class ng{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let s="";for(;s.length<20;){const r=dI(40);for(let i=0;i<r.length;++i)s.length<20&&r[i]<n&&(s+=e.charAt(r[i]%e.length))}return s}}function Ae(t,e){return t<e?-1:t>e?1:0}function mr(t,e,n){return t.length===e.length&&t.every((s,r)=>n(s,e[r]))}/**
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
 */class Xe{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new ee(F.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new ee(F.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new ee(F.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new ee(F.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Xe.fromMillis(Date.now())}static fromDate(e){return Xe.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),s=Math.floor(1e6*(e-1e3*n));return new Xe(n,s)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?Ae(this.nanoseconds,e.nanoseconds):Ae(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class ce{constructor(e){this.timestamp=e}static fromTimestamp(e){return new ce(e)}static min(){return new ce(new Xe(0,0))}static max(){return new ce(new Xe(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class Ei{constructor(e,n,s){n===void 0?n=0:n>e.length&&ae(),s===void 0?s=e.length-n:s>e.length-n&&ae(),this.segments=e,this.offset=n,this.len=s}get length(){return this.len}isEqual(e){return Ei.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Ei?e.forEach(s=>{n.push(s)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,s=this.limit();n<s;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const s=Math.min(e.length,n.length);for(let r=0;r<s;r++){const i=e.get(r),o=n.get(r);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class De extends Ei{construct(e,n,s){return new De(e,n,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const s of e){if(s.indexOf("//")>=0)throw new ee(F.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);n.push(...s.split("/").filter(r=>r.length>0))}return new De(n)}static emptyPath(){return new De([])}}const fI=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class lt extends Ei{construct(e,n,s){return new lt(e,n,s)}static isValidIdentifier(e){return fI.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),lt.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new lt(["__name__"])}static fromServerFormat(e){const n=[];let s="",r=0;const i=()=>{if(s.length===0)throw new ee(F.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(s),s=""};let o=!1;for(;r<e.length;){const l=e[r];if(l==="\\"){if(r+1===e.length)throw new ee(F.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[r+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new ee(F.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=c,r+=2}else l==="`"?(o=!o,r++):l!=="."||o?(s+=l,r++):(i(),r++)}if(i(),o)throw new ee(F.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new lt(n)}static emptyPath(){return new lt([])}}/**
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
 */class re{constructor(e){this.path=e}static fromPath(e){return new re(De.fromString(e))}static fromName(e){return new re(De.fromString(e).popFirst(5))}static empty(){return new re(De.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&De.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return De.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new re(new De(e.slice()))}}function pI(t,e){const n=t.toTimestamp().seconds,s=t.toTimestamp().nanoseconds+1,r=ce.fromTimestamp(s===1e9?new Xe(n+1,0):new Xe(n,s));return new as(r,re.empty(),e)}function mI(t){return new as(t.readTime,t.key,-1)}class as{constructor(e,n,s){this.readTime=e,this.documentKey=n,this.largestBatchId=s}static min(){return new as(ce.min(),re.empty(),-1)}static max(){return new as(ce.max(),re.empty(),-1)}}function gI(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=re.comparator(t.documentKey,e.documentKey),n!==0?n:Ae(t.largestBatchId,e.largestBatchId))}/**
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
 */const _I="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class yI{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Oi(t){if(t.code!==F.FAILED_PRECONDITION||t.message!==_I)throw t;Z("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class ${constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&ae(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new $((s,r)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(s,r)},this.catchCallback=i=>{this.wrapFailure(n,i).next(s,r)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof $?n:$.resolve(n)}catch(n){return $.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):$.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):$.reject(n)}static resolve(e){return new $((n,s)=>{n(e)})}static reject(e){return new $((n,s)=>{s(e)})}static waitFor(e){return new $((n,s)=>{let r=0,i=0,o=!1;e.forEach(l=>{++r,l.next(()=>{++i,o&&i===r&&n()},c=>s(c))}),o=!0,i===r&&n()})}static or(e){let n=$.resolve(!1);for(const s of e)n=n.next(r=>r?$.resolve(r):s());return n}static forEach(e,n){const s=[];return e.forEach((r,i)=>{s.push(n.call(this,r,i))}),this.waitFor(s)}static mapArray(e,n){return new $((s,r)=>{const i=e.length,o=new Array(i);let l=0;for(let c=0;c<i;c++){const u=c;n(e[u]).next(d=>{o[u]=d,++l,l===i&&s(o)},d=>r(d))}})}static doWhile(e,n){return new $((s,r)=>{const i=()=>{e()===!0?n().next(()=>{i()},r):s()};i()})}}function vI(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Li(t){return t.name==="IndexedDbTransactionError"}/**
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
 */class Zc{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=s=>this.ie(s),this.se=s=>n.writeSequenceNumber(s))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Zc.oe=-1;function Fi(t){return t==null}function Xo(t){return t===0&&1/t==-1/0}function wI(t){return typeof t=="number"&&Number.isInteger(t)&&!Xo(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
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
 */function Kd(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Ks(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function sg(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
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
 */class Ue{constructor(e,n){this.comparator=e,this.root=n||at.EMPTY}insert(e,n){return new Ue(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,at.BLACK,null,null))}remove(e){return new Ue(this.comparator,this.root.remove(e,this.comparator).copy(null,null,at.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return n.value;s<0?n=n.left:s>0&&(n=n.right)}return null}indexOf(e){let n=0,s=this.root;for(;!s.isEmpty();){const r=this.comparator(e,s.key);if(r===0)return n+s.left.size;r<0?s=s.left:(n+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,s)=>(e(n,s),!1))}toString(){const e=[];return this.inorderTraversal((n,s)=>(e.push(`${n}:${s}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new _o(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new _o(this.root,e,this.comparator,!1)}getReverseIterator(){return new _o(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new _o(this.root,e,this.comparator,!0)}}class _o{constructor(e,n,s,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?s(e.key,n):1,n&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class at{constructor(e,n,s,r,i){this.key=e,this.value=n,this.color=s??at.RED,this.left=r??at.EMPTY,this.right=i??at.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,s,r,i){return new at(e??this.key,n??this.value,s??this.color,r??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let r=this;const i=s(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,n,s),null):i===0?r.copy(null,n,null,null,null):r.copy(null,null,null,null,r.right.insert(e,n,s)),r.fixUp()}removeMin(){if(this.left.isEmpty())return at.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let s,r=this;if(n(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),n(e,r.key)===0){if(r.right.isEmpty())return at.EMPTY;s=r.right.min(),r=r.copy(s.key,s.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,at.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,at.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw ae();const e=this.left.check();if(e!==this.right.check())throw ae();return e+(this.isRed()?0:1)}}at.EMPTY=null,at.RED=!0,at.BLACK=!1;at.EMPTY=new class{constructor(){this.size=0}get key(){throw ae()}get value(){throw ae()}get color(){throw ae()}get left(){throw ae()}get right(){throw ae()}copy(e,n,s,r,i){return this}insert(e,n,s){return new at(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class ct{constructor(e){this.comparator=e,this.data=new Ue(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,s)=>(e(n),!1))}forEachInRange(e,n){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const r=s.getNext();if(this.comparator(r.key,e[1])>=0)return;n(r.key)}}forEachWhile(e,n){let s;for(s=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Gd(this.data.getIterator())}getIteratorFrom(e){return new Gd(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(s=>{n=n.add(s)}),n}isEqual(e){if(!(e instanceof ct)||this.size!==e.size)return!1;const n=this.data.getIterator(),s=e.data.getIterator();for(;n.hasNext();){const r=n.getNext().key,i=s.getNext().key;if(this.comparator(r,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new ct(this.comparator);return n.data=e,n}}class Gd{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Nt{constructor(e){this.fields=e,e.sort(lt.comparator)}static empty(){return new Nt([])}unionWith(e){let n=new ct(lt.comparator);for(const s of this.fields)n=n.add(s);for(const s of e)n=n.add(s);return new Nt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return mr(this.fields,e.fields,(n,s)=>n.isEqual(s))}}/**
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
 */class rg extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class ut{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(r){try{return atob(r)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new rg("Invalid base64 string: "+i):i}}(e);return new ut(n)}static fromUint8Array(e){const n=function(r){let i="";for(let o=0;o<r.length;++o)i+=String.fromCharCode(r[o]);return i}(e);return new ut(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const s=new Uint8Array(n.length);for(let r=0;r<n.length;r++)s[r]=n.charCodeAt(r);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Ae(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ut.EMPTY_BYTE_STRING=new ut("");const bI=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ls(t){if(Te(!!t),typeof t=="string"){let e=0;const n=bI.exec(t);if(Te(!!n),n[1]){let r=n[1];r=(r+"000000000").substr(0,9),e=Number(r)}const s=new Date(t);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:ze(t.seconds),nanos:ze(t.nanos)}}function ze(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function $s(t){return typeof t=="string"?ut.fromBase64String(t):ut.fromUint8Array(t)}/**
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
 */function eu(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function tu(t){const e=t.mapValue.fields.__previous_value__;return eu(e)?tu(e):e}function Ai(t){const e=ls(t.mapValue.fields.__local_write_time__.timestampValue);return new Xe(e.seconds,e.nanos)}/**
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
 */class TI{constructor(e,n,s,r,i,o,l,c,u){this.databaseId=e,this.appId=n,this.persistenceKey=s,this.host=r,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=u}}class xi{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new xi("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof xi&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const yo={mapValue:{}};function Bs(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?eu(t)?4:EI(t)?9007199254740991:II(t)?10:11:ae()}function dn(t,e){if(t===e)return!0;const n=Bs(t);if(n!==Bs(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Ai(t).isEqual(Ai(e));case 3:return function(r,i){if(typeof r.timestampValue=="string"&&typeof i.timestampValue=="string"&&r.timestampValue.length===i.timestampValue.length)return r.timestampValue===i.timestampValue;const o=ls(r.timestampValue),l=ls(i.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(r,i){return $s(r.bytesValue).isEqual($s(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(r,i){return ze(r.geoPointValue.latitude)===ze(i.geoPointValue.latitude)&&ze(r.geoPointValue.longitude)===ze(i.geoPointValue.longitude)}(t,e);case 2:return function(r,i){if("integerValue"in r&&"integerValue"in i)return ze(r.integerValue)===ze(i.integerValue);if("doubleValue"in r&&"doubleValue"in i){const o=ze(r.doubleValue),l=ze(i.doubleValue);return o===l?Xo(o)===Xo(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return mr(t.arrayValue.values||[],e.arrayValue.values||[],dn);case 10:case 11:return function(r,i){const o=r.mapValue.fields||{},l=i.mapValue.fields||{};if(Kd(o)!==Kd(l))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(l[c]===void 0||!dn(o[c],l[c])))return!1;return!0}(t,e);default:return ae()}}function Si(t,e){return(t.values||[]).find(n=>dn(n,e))!==void 0}function gr(t,e){if(t===e)return 0;const n=Bs(t),s=Bs(e);if(n!==s)return Ae(n,s);switch(n){case 0:case 9007199254740991:return 0;case 1:return Ae(t.booleanValue,e.booleanValue);case 2:return function(i,o){const l=ze(i.integerValue||i.doubleValue),c=ze(o.integerValue||o.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1}(t,e);case 3:return Qd(t.timestampValue,e.timestampValue);case 4:return Qd(Ai(t),Ai(e));case 5:return Ae(t.stringValue,e.stringValue);case 6:return function(i,o){const l=$s(i),c=$s(o);return l.compareTo(c)}(t.bytesValue,e.bytesValue);case 7:return function(i,o){const l=i.split("/"),c=o.split("/");for(let u=0;u<l.length&&u<c.length;u++){const d=Ae(l[u],c[u]);if(d!==0)return d}return Ae(l.length,c.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,o){const l=Ae(ze(i.latitude),ze(o.latitude));return l!==0?l:Ae(ze(i.longitude),ze(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Jd(t.arrayValue,e.arrayValue);case 10:return function(i,o){var l,c,u,d;const p=i.fields||{},y=o.fields||{},E=(l=p.value)===null||l===void 0?void 0:l.arrayValue,x=(c=y.value)===null||c===void 0?void 0:c.arrayValue,P=Ae(((u=E==null?void 0:E.values)===null||u===void 0?void 0:u.length)||0,((d=x==null?void 0:x.values)===null||d===void 0?void 0:d.length)||0);return P!==0?P:Jd(E,x)}(t.mapValue,e.mapValue);case 11:return function(i,o){if(i===yo.mapValue&&o===yo.mapValue)return 0;if(i===yo.mapValue)return 1;if(o===yo.mapValue)return-1;const l=i.fields||{},c=Object.keys(l),u=o.fields||{},d=Object.keys(u);c.sort(),d.sort();for(let p=0;p<c.length&&p<d.length;++p){const y=Ae(c[p],d[p]);if(y!==0)return y;const E=gr(l[c[p]],u[d[p]]);if(E!==0)return E}return Ae(c.length,d.length)}(t.mapValue,e.mapValue);default:throw ae()}}function Qd(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return Ae(t,e);const n=ls(t),s=ls(e),r=Ae(n.seconds,s.seconds);return r!==0?r:Ae(n.nanos,s.nanos)}function Jd(t,e){const n=t.values||[],s=e.values||[];for(let r=0;r<n.length&&r<s.length;++r){const i=gr(n[r],s[r]);if(i)return i}return Ae(n.length,s.length)}function _r(t){return hc(t)}function hc(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const s=ls(n);return`time(${s.seconds},${s.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return $s(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return re.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let s="[",r=!0;for(const i of n.values||[])r?r=!1:s+=",",s+=hc(i);return s+"]"}(t.arrayValue):"mapValue"in t?function(n){const s=Object.keys(n.fields||{}).sort();let r="{",i=!0;for(const o of s)i?i=!1:r+=",",r+=`${o}:${hc(n.fields[o])}`;return r+"}"}(t.mapValue):ae()}function dc(t){return!!t&&"integerValue"in t}function nu(t){return!!t&&"arrayValue"in t}function Yd(t){return!!t&&"nullValue"in t}function Xd(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function xo(t){return!!t&&"mapValue"in t}function II(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function ai(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Ks(t.mapValue.fields,(n,s)=>e.mapValue.fields[n]=ai(s)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=ai(t.arrayValue.values[n]);return e}return Object.assign({},t)}function EI(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class xt{constructor(e){this.value=e}static empty(){return new xt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let s=0;s<e.length-1;++s)if(n=(n.mapValue.fields||{})[e.get(s)],!xo(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=ai(n)}setAll(e){let n=lt.emptyPath(),s={},r=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const c=this.getFieldsMap(n);this.applyChanges(c,s,r),s={},r=[],n=l.popLast()}o?s[l.lastSegment()]=ai(o):r.push(l.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,s,r)}delete(e){const n=this.field(e.popLast());xo(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return dn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let s=0;s<e.length;++s){let r=n.mapValue.fields[e.get(s)];xo(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},n.mapValue.fields[e.get(s)]=r),n=r}return n.mapValue.fields}applyChanges(e,n,s){Ks(n,(r,i)=>e[r]=i);for(const r of s)delete e[r]}clone(){return new xt(ai(this.value))}}function ig(t){const e=[];return Ks(t.fields,(n,s)=>{const r=new lt([n]);if(xo(s)){const i=ig(s.mapValue).fields;if(i.length===0)e.push(r);else for(const o of i)e.push(r.child(o))}else e.push(r)}),new Nt(e)}/**
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
 */class nt{constructor(e,n,s,r,i,o,l){this.key=e,this.documentType=n,this.version=s,this.readTime=r,this.createTime=i,this.data=o,this.documentState=l}static newInvalidDocument(e){return new nt(e,0,ce.min(),ce.min(),ce.min(),xt.empty(),0)}static newFoundDocument(e,n,s,r){return new nt(e,1,n,ce.min(),s,r,0)}static newNoDocument(e,n){return new nt(e,2,n,ce.min(),ce.min(),xt.empty(),0)}static newUnknownDocument(e,n){return new nt(e,3,n,ce.min(),ce.min(),xt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(ce.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=xt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=xt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ce.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof nt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new nt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Zo{constructor(e,n){this.position=e,this.inclusive=n}}function Zd(t,e,n){let s=0;for(let r=0;r<t.position.length;r++){const i=e[r],o=t.position[r];if(i.field.isKeyField()?s=re.comparator(re.fromName(o.referenceValue),n.key):s=gr(o,n.data.field(i.field)),i.dir==="desc"&&(s*=-1),s!==0)break}return s}function ef(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!dn(t.position[n],e.position[n]))return!1;return!0}/**
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
 */class ea{constructor(e,n="asc"){this.field=e,this.dir=n}}function AI(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
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
 */class og{}class Ye extends og{constructor(e,n,s){super(),this.field=e,this.op=n,this.value=s}static create(e,n,s){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,s):new SI(e,n,s):n==="array-contains"?new PI(e,s):n==="in"?new kI(e,s):n==="not-in"?new MI(e,s):n==="array-contains-any"?new NI(e,s):new Ye(e,n,s)}static createKeyFieldInFilter(e,n,s){return n==="in"?new RI(e,s):new CI(e,s)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(gr(n,this.value)):n!==null&&Bs(this.value)===Bs(n)&&this.matchesComparison(gr(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ae()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class fn extends og{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new fn(e,n)}matches(e){return ag(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function ag(t){return t.op==="and"}function lg(t){return xI(t)&&ag(t)}function xI(t){for(const e of t.filters)if(e instanceof fn)return!1;return!0}function fc(t){if(t instanceof Ye)return t.field.canonicalString()+t.op.toString()+_r(t.value);if(lg(t))return t.filters.map(e=>fc(e)).join(",");{const e=t.filters.map(n=>fc(n)).join(",");return`${t.op}(${e})`}}function cg(t,e){return t instanceof Ye?function(s,r){return r instanceof Ye&&s.op===r.op&&s.field.isEqual(r.field)&&dn(s.value,r.value)}(t,e):t instanceof fn?function(s,r){return r instanceof fn&&s.op===r.op&&s.filters.length===r.filters.length?s.filters.reduce((i,o,l)=>i&&cg(o,r.filters[l]),!0):!1}(t,e):void ae()}function ug(t){return t instanceof Ye?function(n){return`${n.field.canonicalString()} ${n.op} ${_r(n.value)}`}(t):t instanceof fn?function(n){return n.op.toString()+" {"+n.getFilters().map(ug).join(" ,")+"}"}(t):"Filter"}class SI extends Ye{constructor(e,n,s){super(e,n,s),this.key=re.fromName(s.referenceValue)}matches(e){const n=re.comparator(e.key,this.key);return this.matchesComparison(n)}}class RI extends Ye{constructor(e,n){super(e,"in",n),this.keys=hg("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class CI extends Ye{constructor(e,n){super(e,"not-in",n),this.keys=hg("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function hg(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(s=>re.fromName(s.referenceValue))}class PI extends Ye{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return nu(n)&&Si(n.arrayValue,this.value)}}class kI extends Ye{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Si(this.value.arrayValue,n)}}class MI extends Ye{constructor(e,n){super(e,"not-in",n)}matches(e){if(Si(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!Si(this.value.arrayValue,n)}}class NI extends Ye{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!nu(n)||!n.arrayValue.values)&&n.arrayValue.values.some(s=>Si(this.value.arrayValue,s))}}/**
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
 */class DI{constructor(e,n=null,s=[],r=[],i=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=s,this.filters=r,this.limit=i,this.startAt=o,this.endAt=l,this.ue=null}}function tf(t,e=null,n=[],s=[],r=null,i=null,o=null){return new DI(t,e,n,s,r,i,o)}function su(t){const e=he(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(s=>fc(s)).join(","),n+="|ob:",n+=e.orderBy.map(s=>function(i){return i.field.canonicalString()+i.dir}(s)).join(","),Fi(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>_r(s)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>_r(s)).join(",")),e.ue=n}return e.ue}function ru(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!AI(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!cg(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!ef(t.startAt,e.startAt)&&ef(t.endAt,e.endAt)}function pc(t){return re.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
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
 */class Va{constructor(e,n=null,s=[],r=[],i=null,o="F",l=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=s,this.filters=r,this.limit=i,this.limitType=o,this.startAt=l,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function VI(t,e,n,s,r,i,o,l){return new Va(t,e,n,s,r,i,o,l)}function iu(t){return new Va(t)}function nf(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function OI(t){return t.collectionGroup!==null}function li(t){const e=he(t);if(e.ce===null){e.ce=[];const n=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),n.add(i.field.canonicalString());const s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new ct(lt.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(u=>{u.isInequality()&&(l=l.add(u.field))})}),l})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.ce.push(new ea(i,s))}),n.has(lt.keyField().canonicalString())||e.ce.push(new ea(lt.keyField(),s))}return e.ce}function an(t){const e=he(t);return e.le||(e.le=LI(e,li(t))),e.le}function LI(t,e){if(t.limitType==="F")return tf(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(r=>{const i=r.dir==="desc"?"asc":"desc";return new ea(r.field,i)});const n=t.endAt?new Zo(t.endAt.position,t.endAt.inclusive):null,s=t.startAt?new Zo(t.startAt.position,t.startAt.inclusive):null;return tf(t.path,t.collectionGroup,e,t.filters,t.limit,n,s)}}function mc(t,e,n){return new Va(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Oa(t,e){return ru(an(t),an(e))&&t.limitType===e.limitType}function dg(t){return`${su(an(t))}|lt:${t.limitType}`}function sr(t){return`Query(target=${function(n){let s=n.path.canonicalString();return n.collectionGroup!==null&&(s+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(s+=`, filters: [${n.filters.map(r=>ug(r)).join(", ")}]`),Fi(n.limit)||(s+=", limit: "+n.limit),n.orderBy.length>0&&(s+=`, orderBy: [${n.orderBy.map(r=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(r)).join(", ")}]`),n.startAt&&(s+=", startAt: ",s+=n.startAt.inclusive?"b:":"a:",s+=n.startAt.position.map(r=>_r(r)).join(",")),n.endAt&&(s+=", endAt: ",s+=n.endAt.inclusive?"a:":"b:",s+=n.endAt.position.map(r=>_r(r)).join(",")),`Target(${s})`}(an(t))}; limitType=${t.limitType})`}function La(t,e){return e.isFoundDocument()&&function(s,r){const i=r.key.path;return s.collectionGroup!==null?r.key.hasCollectionId(s.collectionGroup)&&s.path.isPrefixOf(i):re.isDocumentKey(s.path)?s.path.isEqual(i):s.path.isImmediateParentOf(i)}(t,e)&&function(s,r){for(const i of li(s))if(!i.field.isKeyField()&&r.data.field(i.field)===null)return!1;return!0}(t,e)&&function(s,r){for(const i of s.filters)if(!i.matches(r))return!1;return!0}(t,e)&&function(s,r){return!(s.startAt&&!function(o,l,c){const u=Zd(o,l,c);return o.inclusive?u<=0:u<0}(s.startAt,li(s),r)||s.endAt&&!function(o,l,c){const u=Zd(o,l,c);return o.inclusive?u>=0:u>0}(s.endAt,li(s),r))}(t,e)}function FI(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function fg(t){return(e,n)=>{let s=!1;for(const r of li(t)){const i=UI(r,e,n);if(i!==0)return i;s=s||r.field.isKeyField()}return 0}}function UI(t,e,n){const s=t.field.isKeyField()?re.comparator(e.key,n.key):function(i,o,l){const c=o.data.field(i),u=l.data.field(i);return c!==null&&u!==null?gr(c,u):ae()}(t.field,e,n);switch(t.dir){case"asc":return s;case"desc":return-1*s;default:return ae()}}/**
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
 */class Ir{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s!==void 0){for(const[r,i]of s)if(this.equalsFn(r,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const s=this.mapKeyFn(e),r=this.inner[s];if(r===void 0)return this.inner[s]=[[e,n]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,n]);r.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return!1;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],e))return s.length===1?delete this.inner[n]:s.splice(r,1),this.innerSize--,!0;return!1}forEach(e){Ks(this.inner,(n,s)=>{for(const[r,i]of s)e(r,i)})}isEmpty(){return sg(this.inner)}size(){return this.innerSize}}/**
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
 */const $I=new Ue(re.comparator);function Mn(){return $I}const pg=new Ue(re.comparator);function Qr(...t){let e=pg;for(const n of t)e=e.insert(n.key,n);return e}function mg(t){let e=pg;return t.forEach((n,s)=>e=e.insert(n,s.overlayedDocument)),e}function ks(){return ci()}function gg(){return ci()}function ci(){return new Ir(t=>t.toString(),(t,e)=>t.isEqual(e))}const BI=new Ue(re.comparator),jI=new ct(re.comparator);function ge(...t){let e=jI;for(const n of t)e=e.add(n);return e}const zI=new ct(Ae);function qI(){return zI}/**
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
 */function ou(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Xo(e)?"-0":e}}function _g(t){return{integerValue:""+t}}function HI(t,e){return wI(e)?_g(e):ou(t,e)}/**
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
 */class Fa{constructor(){this._=void 0}}function WI(t,e,n){return t instanceof Ri?function(r,i){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return i&&eu(i)&&(i=tu(i)),i&&(o.fields.__previous_value__=i),{mapValue:o}}(n,e):t instanceof Ci?vg(t,e):t instanceof Pi?wg(t,e):function(r,i){const o=yg(r,i),l=sf(o)+sf(r.Pe);return dc(o)&&dc(r.Pe)?_g(l):ou(r.serializer,l)}(t,e)}function KI(t,e,n){return t instanceof Ci?vg(t,e):t instanceof Pi?wg(t,e):n}function yg(t,e){return t instanceof ta?function(s){return dc(s)||function(i){return!!i&&"doubleValue"in i}(s)}(e)?e:{integerValue:0}:null}class Ri extends Fa{}class Ci extends Fa{constructor(e){super(),this.elements=e}}function vg(t,e){const n=bg(e);for(const s of t.elements)n.some(r=>dn(r,s))||n.push(s);return{arrayValue:{values:n}}}class Pi extends Fa{constructor(e){super(),this.elements=e}}function wg(t,e){let n=bg(e);for(const s of t.elements)n=n.filter(r=>!dn(r,s));return{arrayValue:{values:n}}}class ta extends Fa{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function sf(t){return ze(t.integerValue||t.doubleValue)}function bg(t){return nu(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
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
 */class GI{constructor(e,n){this.field=e,this.transform=n}}function QI(t,e){return t.field.isEqual(e.field)&&function(s,r){return s instanceof Ci&&r instanceof Ci||s instanceof Pi&&r instanceof Pi?mr(s.elements,r.elements,dn):s instanceof ta&&r instanceof ta?dn(s.Pe,r.Pe):s instanceof Ri&&r instanceof Ri}(t.transform,e.transform)}class JI{constructor(e,n){this.version=e,this.transformResults=n}}class St{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new St}static exists(e){return new St(void 0,e)}static updateTime(e){return new St(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function So(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Ua{}function Tg(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new au(t.key,St.none()):new Ui(t.key,t.data,St.none());{const n=t.data,s=xt.empty();let r=new ct(lt.comparator);for(let i of e.fields)if(!r.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?s.delete(i):s.set(i,o),r=r.add(i)}return new hs(t.key,s,new Nt(r.toArray()),St.none())}}function YI(t,e,n){t instanceof Ui?function(r,i,o){const l=r.value.clone(),c=of(r.fieldTransforms,i,o.transformResults);l.setAll(c),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof hs?function(r,i,o){if(!So(r.precondition,i))return void i.convertToUnknownDocument(o.version);const l=of(r.fieldTransforms,i,o.transformResults),c=i.data;c.setAll(Ig(r)),c.setAll(l),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(t,e,n):function(r,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function ui(t,e,n,s){return t instanceof Ui?function(i,o,l,c){if(!So(i.precondition,o))return l;const u=i.value.clone(),d=af(i.fieldTransforms,c,o);return u.setAll(d),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null}(t,e,n,s):t instanceof hs?function(i,o,l,c){if(!So(i.precondition,o))return l;const u=af(i.fieldTransforms,c,o),d=o.data;return d.setAll(Ig(i)),d.setAll(u),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(t,e,n,s):function(i,o,l){return So(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function XI(t,e){let n=null;for(const s of t.fieldTransforms){const r=e.data.field(s.field),i=yg(s.transform,r||null);i!=null&&(n===null&&(n=xt.empty()),n.set(s.field,i))}return n||null}function rf(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(s,r){return s===void 0&&r===void 0||!(!s||!r)&&mr(s,r,(i,o)=>QI(i,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Ui extends Ua{constructor(e,n,s,r=[]){super(),this.key=e,this.value=n,this.precondition=s,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class hs extends Ua{constructor(e,n,s,r,i=[]){super(),this.key=e,this.data=n,this.fieldMask=s,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Ig(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const s=t.data.field(n);e.set(n,s)}}),e}function of(t,e,n){const s=new Map;Te(t.length===n.length);for(let r=0;r<n.length;r++){const i=t[r],o=i.transform,l=e.data.field(i.field);s.set(i.field,KI(o,l,n[r]))}return s}function af(t,e,n){const s=new Map;for(const r of t){const i=r.transform,o=n.data.field(r.field);s.set(r.field,WI(i,o,e))}return s}class au extends Ua{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Eg extends Ua{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class ZI{constructor(e,n,s,r){this.batchId=e,this.localWriteTime=n,this.baseMutations=s,this.mutations=r}applyToRemoteDocument(e,n){const s=n.mutationResults;for(let r=0;r<this.mutations.length;r++){const i=this.mutations[r];i.key.isEqual(e.key)&&YI(i,e,s[r])}}applyToLocalView(e,n){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(n=ui(s,e,n,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(n=ui(s,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const s=gg();return this.mutations.forEach(r=>{const i=e.get(r.key),o=i.overlayedDocument;let l=this.applyToLocalView(o,i.mutatedFields);l=n.has(r.key)?null:l;const c=Tg(o,l);c!==null&&s.set(r.key,c),o.isValidDocument()||o.convertToNoDocument(ce.min())}),s}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),ge())}isEqual(e){return this.batchId===e.batchId&&mr(this.mutations,e.mutations,(n,s)=>rf(n,s))&&mr(this.baseMutations,e.baseMutations,(n,s)=>rf(n,s))}}class lu{constructor(e,n,s,r){this.batch=e,this.commitVersion=n,this.mutationResults=s,this.docVersions=r}static from(e,n,s){Te(e.mutations.length===s.length);let r=function(){return BI}();const i=e.mutations;for(let o=0;o<i.length;o++)r=r.insert(i[o].key,s[o].version);return new lu(e,n,s,r)}}/**
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
 */class eE{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class tE{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
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
 */var Ke,ye;function Ag(t){switch(t){default:return ae();case F.CANCELLED:case F.UNKNOWN:case F.DEADLINE_EXCEEDED:case F.RESOURCE_EXHAUSTED:case F.INTERNAL:case F.UNAVAILABLE:case F.UNAUTHENTICATED:return!1;case F.INVALID_ARGUMENT:case F.NOT_FOUND:case F.ALREADY_EXISTS:case F.PERMISSION_DENIED:case F.FAILED_PRECONDITION:case F.ABORTED:case F.OUT_OF_RANGE:case F.UNIMPLEMENTED:case F.DATA_LOSS:return!0}}function xg(t){if(t===void 0)return kn("GRPC error has no .code"),F.UNKNOWN;switch(t){case Ke.OK:return F.OK;case Ke.CANCELLED:return F.CANCELLED;case Ke.UNKNOWN:return F.UNKNOWN;case Ke.DEADLINE_EXCEEDED:return F.DEADLINE_EXCEEDED;case Ke.RESOURCE_EXHAUSTED:return F.RESOURCE_EXHAUSTED;case Ke.INTERNAL:return F.INTERNAL;case Ke.UNAVAILABLE:return F.UNAVAILABLE;case Ke.UNAUTHENTICATED:return F.UNAUTHENTICATED;case Ke.INVALID_ARGUMENT:return F.INVALID_ARGUMENT;case Ke.NOT_FOUND:return F.NOT_FOUND;case Ke.ALREADY_EXISTS:return F.ALREADY_EXISTS;case Ke.PERMISSION_DENIED:return F.PERMISSION_DENIED;case Ke.FAILED_PRECONDITION:return F.FAILED_PRECONDITION;case Ke.ABORTED:return F.ABORTED;case Ke.OUT_OF_RANGE:return F.OUT_OF_RANGE;case Ke.UNIMPLEMENTED:return F.UNIMPLEMENTED;case Ke.DATA_LOSS:return F.DATA_LOSS;default:return ae()}}(ye=Ke||(Ke={}))[ye.OK=0]="OK",ye[ye.CANCELLED=1]="CANCELLED",ye[ye.UNKNOWN=2]="UNKNOWN",ye[ye.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ye[ye.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ye[ye.NOT_FOUND=5]="NOT_FOUND",ye[ye.ALREADY_EXISTS=6]="ALREADY_EXISTS",ye[ye.PERMISSION_DENIED=7]="PERMISSION_DENIED",ye[ye.UNAUTHENTICATED=16]="UNAUTHENTICATED",ye[ye.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ye[ye.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ye[ye.ABORTED=10]="ABORTED",ye[ye.OUT_OF_RANGE=11]="OUT_OF_RANGE",ye[ye.UNIMPLEMENTED=12]="UNIMPLEMENTED",ye[ye.INTERNAL=13]="INTERNAL",ye[ye.UNAVAILABLE=14]="UNAVAILABLE",ye[ye.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function nE(){return new TextEncoder}/**
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
 */const sE=new Vs([4294967295,4294967295],0);function lf(t){const e=nE().encode(t),n=new Qm;return n.update(e),new Uint8Array(n.digest())}function cf(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),s=e.getUint32(4,!0),r=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Vs([n,s],0),new Vs([r,i],0)]}class cu{constructor(e,n,s){if(this.bitmap=e,this.padding=n,this.hashCount=s,n<0||n>=8)throw new Jr(`Invalid padding: ${n}`);if(s<0)throw new Jr(`Invalid hash count: ${s}`);if(e.length>0&&this.hashCount===0)throw new Jr(`Invalid hash count: ${s}`);if(e.length===0&&n!==0)throw new Jr(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=Vs.fromNumber(this.Ie)}Ee(e,n,s){let r=e.add(n.multiply(Vs.fromNumber(s)));return r.compare(sE)===1&&(r=new Vs([r.getBits(0),r.getBits(1)],0)),r.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=lf(e),[s,r]=cf(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(s,r,i);if(!this.de(o))return!1}return!0}static create(e,n,s){const r=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new cu(i,r,n);return s.forEach(l=>o.insert(l)),o}insert(e){if(this.Ie===0)return;const n=lf(e),[s,r]=cf(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(s,r,i);this.Ae(o)}}Ae(e){const n=Math.floor(e/8),s=e%8;this.bitmap[n]|=1<<s}}class Jr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class $a{constructor(e,n,s,r,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=s,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,s){const r=new Map;return r.set(e,$i.createSynthesizedTargetChangeForCurrentChange(e,n,s)),new $a(ce.min(),r,new Ue(Ae),Mn(),ge())}}class $i{constructor(e,n,s,r,i){this.resumeToken=e,this.current=n,this.addedDocuments=s,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,s){return new $i(s,n,ge(),ge(),ge())}}/**
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
 */class Ro{constructor(e,n,s,r){this.Re=e,this.removedTargetIds=n,this.key=s,this.Ve=r}}class Sg{constructor(e,n){this.targetId=e,this.me=n}}class Rg{constructor(e,n,s=ut.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=n,this.resumeToken=s,this.cause=r}}class uf{constructor(){this.fe=0,this.ge=df(),this.pe=ut.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=ge(),n=ge(),s=ge();return this.ge.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:n=n.add(r);break;case 1:s=s.add(r);break;default:ae()}}),new $i(this.pe,this.ye,e,n,s)}Ce(){this.we=!1,this.ge=df()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,Te(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class rE{constructor(e){this.Le=e,this.Be=new Map,this.ke=Mn(),this.qe=hf(),this.Qe=new Ue(Ae)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const s=this.Ge(n);switch(e.state){case 0:this.ze(n)&&s.De(e.resumeToken);break;case 1:s.Oe(),s.Se||s.Ce(),s.De(e.resumeToken);break;case 2:s.Oe(),s.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(s.Ne(),s.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),s.De(e.resumeToken));break;default:ae()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((s,r)=>{this.ze(r)&&n(r)})}He(e){const n=e.targetId,s=e.me.count,r=this.Je(n);if(r){const i=r.target;if(pc(i))if(s===0){const o=new re(i.path);this.Ue(n,o,nt.newNoDocument(o,ce.min()))}else Te(s===1);else{const o=this.Ye(n);if(o!==s){const l=this.Ze(e),c=l?this.Xe(l,e,o):1;if(c!==0){this.je(n);const u=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,u)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:s="",padding:r=0},hashCount:i=0}=n;let o,l;try{o=$s(s).toUint8Array()}catch(c){if(c instanceof rg)return pr("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new cu(o,r,i)}catch(c){return pr(c instanceof Jr?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.Ie===0?null:l}Xe(e,n,s){return n.me.count===s-this.nt(e,n.targetId)?0:2}nt(e,n){const s=this.Le.getRemoteKeysForTarget(n);let r=0;return s.forEach(i=>{const o=this.Le.tt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.Ue(n,i,null),r++)}),r}rt(e){const n=new Map;this.Be.forEach((i,o)=>{const l=this.Je(o);if(l){if(i.current&&pc(l.target)){const c=new re(l.target.path);this.ke.get(c)!==null||this.it(o,c)||this.Ue(o,c,nt.newNoDocument(c,e))}i.be&&(n.set(o,i.ve()),i.Ce())}});let s=ge();this.qe.forEach((i,o)=>{let l=!0;o.forEachWhile(c=>{const u=this.Je(c);return!u||u.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(s=s.add(i))}),this.ke.forEach((i,o)=>o.setReadTime(e));const r=new $a(e,n,this.Qe,this.ke,s);return this.ke=Mn(),this.qe=hf(),this.Qe=new Ue(Ae),r}$e(e,n){if(!this.ze(e))return;const s=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,s),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,s){if(!this.ze(e))return;const r=this.Ge(e);this.it(e,n)?r.Fe(n,1):r.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),s&&(this.ke=this.ke.insert(n,s))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new uf,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new ct(Ae),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||Z("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new uf),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function hf(){return new Ue(re.comparator)}function df(){return new Ue(re.comparator)}const iE={asc:"ASCENDING",desc:"DESCENDING"},oE={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},aE={and:"AND",or:"OR"};class lE{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function gc(t,e){return t.useProto3Json||Fi(e)?e:{value:e}}function na(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Cg(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function cE(t,e){return na(t,e.toTimestamp())}function Ot(t){return Te(!!t),ce.fromTimestamp(function(n){const s=ls(n);return new Xe(s.seconds,s.nanos)}(t))}function uu(t,e){return _c(t,e).canonicalString()}function _c(t,e){const n=function(r){return new De(["projects",r.projectId,"databases",r.database])}(t).child("documents");return e===void 0?n:n.child(e)}function Pg(t){const e=De.fromString(t);return Te(Og(e)),e}function sa(t,e){return uu(t.databaseId,e.path)}function hi(t,e){const n=Pg(e);if(n.get(1)!==t.databaseId.projectId)throw new ee(F.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new ee(F.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new re(Mg(n))}function kg(t,e){return uu(t.databaseId,e)}function uE(t){const e=Pg(t);return e.length===4?De.emptyPath():Mg(e)}function yc(t){return new De(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Mg(t){return Te(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function ff(t,e,n){return{name:sa(t,e),fields:n.value.mapValue.fields}}function hE(t,e){return"found"in e?function(s,r){Te(!!r.found),r.found.name,r.found.updateTime;const i=hi(s,r.found.name),o=Ot(r.found.updateTime),l=r.found.createTime?Ot(r.found.createTime):ce.min(),c=new xt({mapValue:{fields:r.found.fields}});return nt.newFoundDocument(i,o,l,c)}(t,e):"missing"in e?function(s,r){Te(!!r.missing),Te(!!r.readTime);const i=hi(s,r.missing),o=Ot(r.readTime);return nt.newNoDocument(i,o)}(t,e):ae()}function dE(t,e){let n;if("targetChange"in e){e.targetChange;const s=function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:ae()}(e.targetChange.targetChangeType||"NO_CHANGE"),r=e.targetChange.targetIds||[],i=function(u,d){return u.useProto3Json?(Te(d===void 0||typeof d=="string"),ut.fromBase64String(d||"")):(Te(d===void 0||d instanceof Buffer||d instanceof Uint8Array),ut.fromUint8Array(d||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(u){const d=u.code===void 0?F.UNKNOWN:xg(u.code);return new ee(d,u.message||"")}(o);n=new Rg(s,r,i,l||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const r=hi(t,s.document.name),i=Ot(s.document.updateTime),o=s.document.createTime?Ot(s.document.createTime):ce.min(),l=new xt({mapValue:{fields:s.document.fields}}),c=nt.newFoundDocument(r,i,o,l),u=s.targetIds||[],d=s.removedTargetIds||[];n=new Ro(u,d,c.key,c)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const r=hi(t,s.document),i=s.readTime?Ot(s.readTime):ce.min(),o=nt.newNoDocument(r,i),l=s.removedTargetIds||[];n=new Ro([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const r=hi(t,s.document),i=s.removedTargetIds||[];n=new Ro([],i,r,null)}else{if(!("filter"in e))return ae();{e.filter;const s=e.filter;s.targetId;const{count:r=0,unchangedNames:i}=s,o=new tE(r,i),l=s.targetId;n=new Sg(l,o)}}return n}function Ng(t,e){let n;if(e instanceof Ui)n={update:ff(t,e.key,e.value)};else if(e instanceof au)n={delete:sa(t,e.key)};else if(e instanceof hs)n={update:ff(t,e.key,e.data),updateMask:bE(e.fieldMask)};else{if(!(e instanceof Eg))return ae();n={verify:sa(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(s=>function(i,o){const l=o.transform;if(l instanceof Ri)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Ci)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Pi)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof ta)return{fieldPath:o.field.canonicalString(),increment:l.Pe};throw ae()}(0,s))),e.precondition.isNone||(n.currentDocument=function(r,i){return i.updateTime!==void 0?{updateTime:cE(r,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:ae()}(t,e.precondition)),n}function fE(t,e){return t&&t.length>0?(Te(e!==void 0),t.map(n=>function(r,i){let o=r.updateTime?Ot(r.updateTime):Ot(i);return o.isEqual(ce.min())&&(o=Ot(i)),new JI(o,r.transformResults||[])}(n,e))):[]}function pE(t,e){return{documents:[kg(t,e.path)]}}function mE(t,e){const n={structuredQuery:{}},s=e.path;let r;e.collectionGroup!==null?(r=s,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(r=s.popLast(),n.structuredQuery.from=[{collectionId:s.lastSegment()}]),n.parent=kg(t,r);const i=function(u){if(u.length!==0)return Vg(fn.create(u,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(u){if(u.length!==0)return u.map(d=>function(y){return{field:rr(y.field),direction:yE(y.dir)}}(d))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=gc(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(u){return{before:u.inclusive,values:u.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(u){return{before:!u.inclusive,values:u.position}}(e.endAt)),{_t:n,parent:r}}function gE(t){let e=uE(t.parent);const n=t.structuredQuery,s=n.from?n.from.length:0;let r=null;if(s>0){Te(s===1);const d=n.from[0];d.allDescendants?r=d.collectionId:e=e.child(d.collectionId)}let i=[];n.where&&(i=function(p){const y=Dg(p);return y instanceof fn&&lg(y)?y.getFilters():[y]}(n.where));let o=[];n.orderBy&&(o=function(p){return p.map(y=>function(x){return new ea(ir(x.field),function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(x.direction))}(y))}(n.orderBy));let l=null;n.limit&&(l=function(p){let y;return y=typeof p=="object"?p.value:p,Fi(y)?null:y}(n.limit));let c=null;n.startAt&&(c=function(p){const y=!!p.before,E=p.values||[];return new Zo(E,y)}(n.startAt));let u=null;return n.endAt&&(u=function(p){const y=!p.before,E=p.values||[];return new Zo(E,y)}(n.endAt)),VI(e,r,o,i,l,"F",c,u)}function _E(t,e){const n=function(r){switch(r){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ae()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function Dg(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const s=ir(n.unaryFilter.field);return Ye.create(s,"==",{doubleValue:NaN});case"IS_NULL":const r=ir(n.unaryFilter.field);return Ye.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=ir(n.unaryFilter.field);return Ye.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=ir(n.unaryFilter.field);return Ye.create(o,"!=",{nullValue:"NULL_VALUE"});default:return ae()}}(t):t.fieldFilter!==void 0?function(n){return Ye.create(ir(n.fieldFilter.field),function(r){switch(r){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return ae()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return fn.create(n.compositeFilter.filters.map(s=>Dg(s)),function(r){switch(r){case"AND":return"and";case"OR":return"or";default:return ae()}}(n.compositeFilter.op))}(t):ae()}function yE(t){return iE[t]}function vE(t){return oE[t]}function wE(t){return aE[t]}function rr(t){return{fieldPath:t.canonicalString()}}function ir(t){return lt.fromServerFormat(t.fieldPath)}function Vg(t){return t instanceof Ye?function(n){if(n.op==="=="){if(Xd(n.value))return{unaryFilter:{field:rr(n.field),op:"IS_NAN"}};if(Yd(n.value))return{unaryFilter:{field:rr(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(Xd(n.value))return{unaryFilter:{field:rr(n.field),op:"IS_NOT_NAN"}};if(Yd(n.value))return{unaryFilter:{field:rr(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:rr(n.field),op:vE(n.op),value:n.value}}}(t):t instanceof fn?function(n){const s=n.getFilters().map(r=>Vg(r));return s.length===1?s[0]:{compositeFilter:{op:wE(n.op),filters:s}}}(t):ae()}function bE(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function Og(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
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
 */class Gn{constructor(e,n,s,r,i=ce.min(),o=ce.min(),l=ut.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=n,this.purpose=s,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new Gn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Gn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Gn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Gn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class TE{constructor(e){this.ct=e}}function IE(t){const e=gE({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?mc(e,e.limit,"L"):e}/**
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
 */class EE{constructor(){this.un=new AE}addToCollectionParentIndex(e,n){return this.un.add(n),$.resolve()}getCollectionParents(e,n){return $.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return $.resolve()}deleteFieldIndex(e,n){return $.resolve()}deleteAllFieldIndexes(e){return $.resolve()}createTargetIndexes(e,n){return $.resolve()}getDocumentsMatchingTarget(e,n){return $.resolve(null)}getIndexType(e,n){return $.resolve(0)}getFieldIndexes(e,n){return $.resolve([])}getNextCollectionGroupToUpdate(e){return $.resolve(null)}getMinOffset(e,n){return $.resolve(as.min())}getMinOffsetFromCollectionGroup(e,n){return $.resolve(as.min())}updateCollectionGroup(e,n,s){return $.resolve()}updateIndexEntries(e,n){return $.resolve()}}class AE{constructor(){this.index={}}add(e){const n=e.lastSegment(),s=e.popLast(),r=this.index[n]||new ct(De.comparator),i=!r.has(s);return this.index[n]=r.add(s),i}has(e){const n=e.lastSegment(),s=e.popLast(),r=this.index[n];return r&&r.has(s)}getEntries(e){return(this.index[e]||new ct(De.comparator)).toArray()}}/**
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
 */class yr{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new yr(0)}static kn(){return new yr(-1)}}/**
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
 */class xE{constructor(){this.changes=new Ir(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,nt.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const s=this.changes.get(n);return s!==void 0?$.resolve(s):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class SE{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
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
 */class RE{constructor(e,n,s,r){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=s,this.indexManager=r}getDocument(e,n){let s=null;return this.documentOverlayCache.getOverlay(e,n).next(r=>(s=r,this.remoteDocumentCache.getEntry(e,n))).next(r=>(s!==null&&ui(s.mutation,r,Nt.empty(),Xe.now()),r))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.getLocalViewOfDocuments(e,s,ge()).next(()=>s))}getLocalViewOfDocuments(e,n,s=ge()){const r=ks();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,s).next(i=>{let o=Qr();return i.forEach((l,c)=>{o=o.insert(l,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const s=ks();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,ge()))}populateOverlays(e,n,s){const r=[];return s.forEach(i=>{n.has(i)||r.push(i)}),this.documentOverlayCache.getOverlays(e,r).next(i=>{i.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,s,r){let i=Mn();const o=ci(),l=function(){return ci()}();return n.forEach((c,u)=>{const d=s.get(u.key);r.has(u.key)&&(d===void 0||d.mutation instanceof hs)?i=i.insert(u.key,u):d!==void 0?(o.set(u.key,d.mutation.getFieldMask()),ui(d.mutation,u,d.mutation.getFieldMask(),Xe.now())):o.set(u.key,Nt.empty())}),this.recalculateAndSaveOverlays(e,i).next(c=>(c.forEach((u,d)=>o.set(u,d)),n.forEach((u,d)=>{var p;return l.set(u,new SE(d,(p=o.get(u))!==null&&p!==void 0?p:null))}),l))}recalculateAndSaveOverlays(e,n){const s=ci();let r=new Ue((o,l)=>o-l),i=ge();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(c=>{const u=n.get(c);if(u===null)return;let d=s.get(c)||Nt.empty();d=l.applyToLocalView(u,d),s.set(c,d);const p=(r.get(l.batchId)||ge()).add(c);r=r.insert(l.batchId,p)})}).next(()=>{const o=[],l=r.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),u=c.key,d=c.value,p=gg();d.forEach(y=>{if(!i.has(y)){const E=Tg(n.get(y),s.get(y));E!==null&&p.set(y,E),i=i.add(y)}}),o.push(this.documentOverlayCache.saveOverlays(e,u,p))}return $.waitFor(o)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.recalculateAndSaveOverlays(e,s))}getDocumentsMatchingQuery(e,n,s,r){return function(o){return re.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):OI(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,s,r):this.getDocumentsMatchingCollectionQuery(e,n,s,r)}getNextDocuments(e,n,s,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,s,r).next(i=>{const o=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,s.largestBatchId,r-i.size):$.resolve(ks());let l=-1,c=i;return o.next(u=>$.forEach(u,(d,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),i.get(d)?$.resolve():this.remoteDocumentCache.getEntry(e,d).next(y=>{c=c.insert(d,y)}))).next(()=>this.populateOverlays(e,u,i)).next(()=>this.computeViews(e,c,u,ge())).next(d=>({batchId:l,changes:mg(d)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new re(n)).next(s=>{let r=Qr();return s.isFoundDocument()&&(r=r.insert(s.key,s)),r})}getDocumentsMatchingCollectionGroupQuery(e,n,s,r){const i=n.collectionGroup;let o=Qr();return this.indexManager.getCollectionParents(e,i).next(l=>$.forEach(l,c=>{const u=function(p,y){return new Va(y,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(n,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,u,s,r).next(d=>{d.forEach((p,y)=>{o=o.insert(p,y)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,s,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,s.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,s,i,r))).next(o=>{i.forEach((c,u)=>{const d=u.getKey();o.get(d)===null&&(o=o.insert(d,nt.newInvalidDocument(d)))});let l=Qr();return o.forEach((c,u)=>{const d=i.get(c);d!==void 0&&ui(d.mutation,u,Nt.empty(),Xe.now()),La(n,u)&&(l=l.insert(c,u))}),l})}}/**
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
 */class CE{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return $.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(r){return{id:r.id,version:r.version,createTime:Ot(r.createTime)}}(n)),$.resolve()}getNamedQuery(e,n){return $.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(r){return{name:r.name,query:IE(r.bundledQuery),readTime:Ot(r.readTime)}}(n)),$.resolve()}}/**
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
 */class PE{constructor(){this.overlays=new Ue(re.comparator),this.Ir=new Map}getOverlay(e,n){return $.resolve(this.overlays.get(n))}getOverlays(e,n){const s=ks();return $.forEach(n,r=>this.getOverlay(e,r).next(i=>{i!==null&&s.set(r,i)})).next(()=>s)}saveOverlays(e,n,s){return s.forEach((r,i)=>{this.ht(e,n,i)}),$.resolve()}removeOverlaysForBatchId(e,n,s){const r=this.Ir.get(s);return r!==void 0&&(r.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ir.delete(s)),$.resolve()}getOverlaysForCollection(e,n,s){const r=ks(),i=n.length+1,o=new re(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const c=l.getNext().value,u=c.getKey();if(!n.isPrefixOf(u.path))break;u.path.length===i&&c.largestBatchId>s&&r.set(c.getKey(),c)}return $.resolve(r)}getOverlaysForCollectionGroup(e,n,s,r){let i=new Ue((u,d)=>u-d);const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===n&&u.largestBatchId>s){let d=i.get(u.largestBatchId);d===null&&(d=ks(),i=i.insert(u.largestBatchId,d)),d.set(u.getKey(),u)}}const l=ks(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((u,d)=>l.set(u,d)),!(l.size()>=r)););return $.resolve(l)}ht(e,n,s){const r=this.overlays.get(s.key);if(r!==null){const o=this.Ir.get(r.largestBatchId).delete(s.key);this.Ir.set(r.largestBatchId,o)}this.overlays=this.overlays.insert(s.key,new eE(n,s));let i=this.Ir.get(n);i===void 0&&(i=ge(),this.Ir.set(n,i)),this.Ir.set(n,i.add(s.key))}}/**
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
 */class kE{constructor(){this.sessionToken=ut.EMPTY_BYTE_STRING}getSessionToken(e){return $.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,$.resolve()}}/**
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
 */class hu{constructor(){this.Tr=new ct(et.Er),this.dr=new ct(et.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const s=new et(e,n);this.Tr=this.Tr.add(s),this.dr=this.dr.add(s)}Rr(e,n){e.forEach(s=>this.addReference(s,n))}removeReference(e,n){this.Vr(new et(e,n))}mr(e,n){e.forEach(s=>this.removeReference(s,n))}gr(e){const n=new re(new De([])),s=new et(n,e),r=new et(n,e+1),i=[];return this.dr.forEachInRange([s,r],o=>{this.Vr(o),i.push(o.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new re(new De([])),s=new et(n,e),r=new et(n,e+1);let i=ge();return this.dr.forEachInRange([s,r],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new et(e,0),s=this.Tr.firstAfterOrEqual(n);return s!==null&&e.isEqual(s.key)}}class et{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return re.comparator(e.key,n.key)||Ae(e.wr,n.wr)}static Ar(e,n){return Ae(e.wr,n.wr)||re.comparator(e.key,n.key)}}/**
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
 */class ME{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new ct(et.Er)}checkEmpty(e){return $.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,s,r){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new ZI(i,n,s,r);this.mutationQueue.push(o);for(const l of r)this.br=this.br.add(new et(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return $.resolve(o)}lookupMutationBatch(e,n){return $.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const s=n+1,r=this.vr(s),i=r<0?0:r;return $.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return $.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return $.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const s=new et(n,0),r=new et(n,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([s,r],o=>{const l=this.Dr(o.wr);i.push(l)}),$.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let s=new ct(Ae);return n.forEach(r=>{const i=new et(r,0),o=new et(r,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,o],l=>{s=s.add(l.wr)})}),$.resolve(this.Cr(s))}getAllMutationBatchesAffectingQuery(e,n){const s=n.path,r=s.length+1;let i=s;re.isDocumentKey(i)||(i=i.child(""));const o=new et(new re(i),0);let l=new ct(Ae);return this.br.forEachWhile(c=>{const u=c.key.path;return!!s.isPrefixOf(u)&&(u.length===r&&(l=l.add(c.wr)),!0)},o),$.resolve(this.Cr(l))}Cr(e){const n=[];return e.forEach(s=>{const r=this.Dr(s);r!==null&&n.push(r)}),n}removeMutationBatch(e,n){Te(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let s=this.br;return $.forEach(n.mutations,r=>{const i=new et(r.key,n.batchId);return s=s.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.br=s})}On(e){}containsKey(e,n){const s=new et(n,0),r=this.br.firstAfterOrEqual(s);return $.resolve(n.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,$.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
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
 */class NE{constructor(e){this.Mr=e,this.docs=function(){return new Ue(re.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const s=n.key,r=this.docs.get(s),i=r?r.size:0,o=this.Mr(n);return this.docs=this.docs.insert(s,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const s=this.docs.get(n);return $.resolve(s?s.document.mutableCopy():nt.newInvalidDocument(n))}getEntries(e,n){let s=Mn();return n.forEach(r=>{const i=this.docs.get(r);s=s.insert(r,i?i.document.mutableCopy():nt.newInvalidDocument(r))}),$.resolve(s)}getDocumentsMatchingQuery(e,n,s,r){let i=Mn();const o=n.path,l=new re(o.child("")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:u,value:{document:d}}=c.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||gI(mI(d),s)<=0||(r.has(d.key)||La(n,d))&&(i=i.insert(d.key,d.mutableCopy()))}return $.resolve(i)}getAllFromCollectionGroup(e,n,s,r){ae()}Or(e,n){return $.forEach(this.docs,s=>n(s))}newChangeBuffer(e){return new DE(this)}getSize(e){return $.resolve(this.size)}}class DE extends xE{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((s,r)=>{r.isValidDocument()?n.push(this.cr.addEntry(e,r)):this.cr.removeEntry(s)}),$.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
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
 */class VE{constructor(e){this.persistence=e,this.Nr=new Ir(n=>su(n),ru),this.lastRemoteSnapshotVersion=ce.min(),this.highestTargetId=0,this.Lr=0,this.Br=new hu,this.targetCount=0,this.kr=yr.Bn()}forEachTarget(e,n){return this.Nr.forEach((s,r)=>n(r)),$.resolve()}getLastRemoteSnapshotVersion(e){return $.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return $.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),$.resolve(this.highestTargetId)}setTargetsMetadata(e,n,s){return s&&(this.lastRemoteSnapshotVersion=s),n>this.Lr&&(this.Lr=n),$.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new yr(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,$.resolve()}updateTargetData(e,n){return this.Kn(n),$.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,$.resolve()}removeTargets(e,n,s){let r=0;const i=[];return this.Nr.forEach((o,l)=>{l.sequenceNumber<=n&&s.get(l.targetId)===null&&(this.Nr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),r++)}),$.waitFor(i).next(()=>r)}getTargetCount(e){return $.resolve(this.targetCount)}getTargetData(e,n){const s=this.Nr.get(n)||null;return $.resolve(s)}addMatchingKeys(e,n,s){return this.Br.Rr(n,s),$.resolve()}removeMatchingKeys(e,n,s){this.Br.mr(n,s);const r=this.persistence.referenceDelegate,i=[];return r&&n.forEach(o=>{i.push(r.markPotentiallyOrphaned(e,o))}),$.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),$.resolve()}getMatchingKeysForTargetId(e,n){const s=this.Br.yr(n);return $.resolve(s)}containsKey(e,n){return $.resolve(this.Br.containsKey(n))}}/**
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
 */class OE{constructor(e,n){this.qr={},this.overlays={},this.Qr=new Zc(0),this.Kr=!1,this.Kr=!0,this.$r=new kE,this.referenceDelegate=e(this),this.Ur=new VE(this),this.indexManager=new EE,this.remoteDocumentCache=function(r){return new NE(r)}(s=>this.referenceDelegate.Wr(s)),this.serializer=new TE(n),this.Gr=new CE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new PE,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let s=this.qr[e.toKey()];return s||(s=new ME(n,this.referenceDelegate),this.qr[e.toKey()]=s),s}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,s){Z("MemoryPersistence","Starting transaction:",e);const r=new LE(this.Qr.next());return this.referenceDelegate.zr(),s(r).next(i=>this.referenceDelegate.jr(r).next(()=>i)).toPromise().then(i=>(r.raiseOnCommittedEvent(),i))}Hr(e,n){return $.or(Object.values(this.qr).map(s=>()=>s.containsKey(e,n)))}}class LE extends yI{constructor(e){super(),this.currentSequenceNumber=e}}class du{constructor(e){this.persistence=e,this.Jr=new hu,this.Yr=null}static Zr(e){return new du(e)}get Xr(){if(this.Yr)return this.Yr;throw ae()}addReference(e,n,s){return this.Jr.addReference(s,n),this.Xr.delete(s.toString()),$.resolve()}removeReference(e,n,s){return this.Jr.removeReference(s,n),this.Xr.add(s.toString()),$.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),$.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(r=>this.Xr.add(r.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,n.targetId).next(r=>{r.forEach(i=>this.Xr.add(i.toString()))}).next(()=>s.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return $.forEach(this.Xr,s=>{const r=re.fromPath(s);return this.ei(e,r).next(i=>{i||n.removeEntry(r,ce.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(s=>{s?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return $.or([()=>$.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
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
 */class fu{constructor(e,n,s,r){this.targetId=e,this.fromCache=n,this.$i=s,this.Ui=r}static Wi(e,n){let s=ge(),r=ge();for(const i of n.docChanges)switch(i.type){case 0:s=s.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new fu(e,n.fromCache,s,r)}}/**
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
 */class FE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class UE{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return vw()?8:vI(vt())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,s,r){const i={result:null};return this.Yi(e,n).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.Zi(e,n,r,s).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new FE;return this.Xi(e,n,o).next(l=>{if(i.result=l,this.zi)return this.es(e,n,o,l.size)})}).next(()=>i.result)}es(e,n,s,r){return s.documentReadCount<this.ji?(qr()<=_e.DEBUG&&Z("QueryEngine","SDK will not create cache indexes for query:",sr(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),$.resolve()):(qr()<=_e.DEBUG&&Z("QueryEngine","Query:",sr(n),"scans",s.documentReadCount,"local documents and returns",r,"documents as results."),s.documentReadCount>this.Hi*r?(qr()<=_e.DEBUG&&Z("QueryEngine","The SDK decides to create cache indexes for query:",sr(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,an(n))):$.resolve())}Yi(e,n){if(nf(n))return $.resolve(null);let s=an(n);return this.indexManager.getIndexType(e,s).next(r=>r===0?null:(n.limit!==null&&r===1&&(n=mc(n,null,"F"),s=an(n)),this.indexManager.getDocumentsMatchingTarget(e,s).next(i=>{const o=ge(...i);return this.Ji.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,s).next(c=>{const u=this.ts(n,l);return this.ns(n,u,o,c.readTime)?this.Yi(e,mc(n,null,"F")):this.rs(e,u,n,c)}))})))}Zi(e,n,s,r){return nf(n)||r.isEqual(ce.min())?$.resolve(null):this.Ji.getDocuments(e,s).next(i=>{const o=this.ts(n,i);return this.ns(n,o,s,r)?$.resolve(null):(qr()<=_e.DEBUG&&Z("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),sr(n)),this.rs(e,o,n,pI(r,-1)).next(l=>l))})}ts(e,n){let s=new ct(fg(e));return n.forEach((r,i)=>{La(e,i)&&(s=s.add(i))}),s}ns(e,n,s,r){if(e.limit===null)return!1;if(s.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Xi(e,n,s){return qr()<=_e.DEBUG&&Z("QueryEngine","Using full collection scan to execute query:",sr(n)),this.Ji.getDocumentsMatchingQuery(e,n,as.min(),s)}rs(e,n,s,r){return this.Ji.getDocumentsMatchingQuery(e,s,r).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
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
 */class $E{constructor(e,n,s,r){this.persistence=e,this.ss=n,this.serializer=r,this.os=new Ue(Ae),this._s=new Ir(i=>su(i),ru),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(s)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new RE(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function BE(t,e,n,s){return new $E(t,e,n,s)}async function Lg(t,e){const n=he(t);return await n.persistence.runTransaction("Handle user change","readonly",s=>{let r;return n.mutationQueue.getAllMutationBatches(s).next(i=>(r=i,n.ls(e),n.mutationQueue.getAllMutationBatches(s))).next(i=>{const o=[],l=[];let c=ge();for(const u of r){o.push(u.batchId);for(const d of u.mutations)c=c.add(d.key)}for(const u of i){l.push(u.batchId);for(const d of u.mutations)c=c.add(d.key)}return n.localDocuments.getDocuments(s,c).next(u=>({hs:u,removedBatchIds:o,addedBatchIds:l}))})})}function jE(t,e){const n=he(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const r=e.batch.keys(),i=n.cs.newChangeBuffer({trackRemovals:!0});return function(l,c,u,d){const p=u.batch,y=p.keys();let E=$.resolve();return y.forEach(x=>{E=E.next(()=>d.getEntry(c,x)).next(P=>{const V=u.docVersions.get(x);Te(V!==null),P.version.compareTo(V)<0&&(p.applyToRemoteDocument(P,u),P.isValidDocument()&&(P.setReadTime(u.commitVersion),d.addEntry(P)))})}),E.next(()=>l.mutationQueue.removeMutationBatch(c,p))}(n,s,e,i).next(()=>i.apply(s)).next(()=>n.mutationQueue.performConsistencyCheck(s)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(s,r,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,function(l){let c=ge();for(let u=0;u<l.mutationResults.length;++u)l.mutationResults[u].transformResults.length>0&&(c=c.add(l.batch.mutations[u].key));return c}(e))).next(()=>n.localDocuments.getDocuments(s,r))})}function Fg(t){const e=he(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function zE(t,e){const n=he(t),s=e.snapshotVersion;let r=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.cs.newChangeBuffer({trackRemovals:!0});r=n.os;const l=[];e.targetChanges.forEach((d,p)=>{const y=r.get(p);if(!y)return;l.push(n.Ur.removeMatchingKeys(i,d.removedDocuments,p).next(()=>n.Ur.addMatchingKeys(i,d.addedDocuments,p)));let E=y.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?E=E.withResumeToken(ut.EMPTY_BYTE_STRING,ce.min()).withLastLimboFreeSnapshotVersion(ce.min()):d.resumeToken.approximateByteSize()>0&&(E=E.withResumeToken(d.resumeToken,s)),r=r.insert(p,E),function(P,V,X){return P.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=3e8?!0:X.addedDocuments.size+X.modifiedDocuments.size+X.removedDocuments.size>0}(y,E,d)&&l.push(n.Ur.updateTargetData(i,E))});let c=Mn(),u=ge();if(e.documentUpdates.forEach(d=>{e.resolvedLimboDocuments.has(d)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(i,d))}),l.push(qE(i,o,e.documentUpdates).next(d=>{c=d.Ps,u=d.Is})),!s.isEqual(ce.min())){const d=n.Ur.getLastRemoteSnapshotVersion(i).next(p=>n.Ur.setTargetsMetadata(i,i.currentSequenceNumber,s));l.push(d)}return $.waitFor(l).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,c,u)).next(()=>c)}).then(i=>(n.os=r,i))}function qE(t,e,n){let s=ge(),r=ge();return n.forEach(i=>s=s.add(i)),e.getEntries(t,s).next(i=>{let o=Mn();return n.forEach((l,c)=>{const u=i.get(l);c.isFoundDocument()!==u.isFoundDocument()&&(r=r.add(l)),c.isNoDocument()&&c.version.isEqual(ce.min())?(e.removeEntry(l,c.readTime),o=o.insert(l,c)):!u.isValidDocument()||c.version.compareTo(u.version)>0||c.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(c),o=o.insert(l,c)):Z("LocalStore","Ignoring outdated watch update for ",l,". Current version:",u.version," Watch version:",c.version)}),{Ps:o,Is:r}})}function HE(t,e){const n=he(t);return n.persistence.runTransaction("Get next mutation batch","readonly",s=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(s,e)))}function WE(t,e){const n=he(t);return n.persistence.runTransaction("Allocate target","readwrite",s=>{let r;return n.Ur.getTargetData(s,e).next(i=>i?(r=i,$.resolve(r)):n.Ur.allocateTargetId(s).next(o=>(r=new Gn(e,o,"TargetPurposeListen",s.currentSequenceNumber),n.Ur.addTargetData(s,r).next(()=>r))))}).then(s=>{const r=n.os.get(s.targetId);return(r===null||s.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.os=n.os.insert(s.targetId,s),n._s.set(e,s.targetId)),s})}async function vc(t,e,n){const s=he(t),r=s.os.get(e),i=n?"readwrite":"readwrite-primary";try{n||await s.persistence.runTransaction("Release target",i,o=>s.persistence.referenceDelegate.removeTarget(o,r))}catch(o){if(!Li(o))throw o;Z("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}s.os=s.os.remove(e),s._s.delete(r.target)}function pf(t,e,n){const s=he(t);let r=ce.min(),i=ge();return s.persistence.runTransaction("Execute query","readwrite",o=>function(c,u,d){const p=he(c),y=p._s.get(d);return y!==void 0?$.resolve(p.os.get(y)):p.Ur.getTargetData(u,d)}(s,o,an(e)).next(l=>{if(l)return r=l.lastLimboFreeSnapshotVersion,s.Ur.getMatchingKeysForTargetId(o,l.targetId).next(c=>{i=c})}).next(()=>s.ss.getDocumentsMatchingQuery(o,e,n?r:ce.min(),n?i:ge())).next(l=>(KE(s,FI(e),l),{documents:l,Ts:i})))}function KE(t,e,n){let s=t.us.get(e)||ce.min();n.forEach((r,i)=>{i.readTime.compareTo(s)>0&&(s=i.readTime)}),t.us.set(e,s)}class mf{constructor(){this.activeTargetIds=qI()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class GE{constructor(){this.so=new mf,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,s){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,s){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new mf,Promise.resolve()}handleUserChange(e,n,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class QE{_o(e){}shutdown(){}}/**
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
 */class gf{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){Z("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){Z("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let vo=null;function Fl(){return vo===null?vo=function(){return 268435456+Math.round(2147483648*Math.random())}():vo++,"0x"+vo.toString(16)}/**
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
 */const JE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class YE{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
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
 */const pt="WebChannelConnection";class XE extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const s=n.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=s+"://"+n.host,this.vo=`projects/${r}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${r}`:`project_id=${r}&database_id=${i}`}get Fo(){return!1}Mo(n,s,r,i,o){const l=Fl(),c=this.xo(n,s.toUriEncodedString());Z("RestConnection",`Sending RPC '${n}' ${l}:`,c,r);const u={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(u,i,o),this.No(n,c,u,r).then(d=>(Z("RestConnection",`Received RPC '${n}' ${l}: `,d),d),d=>{throw pr("RestConnection",`RPC '${n}' ${l} failed with error: `,d,"url: ",c,"request:",r),d})}Lo(n,s,r,i,o,l){return this.Mo(n,s,r,i,o)}Oo(n,s,r){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Tr}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),s&&s.headers.forEach((i,o)=>n[o]=i),r&&r.headers.forEach((i,o)=>n[o]=i)}xo(n,s){const r=JE[n];return`${this.Do}/v1/${s}:${r}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,s,r){const i=Fl();return new Promise((o,l)=>{const c=new Jm;c.setWithCredentials(!0),c.listenOnce(Ym.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case Ao.NO_ERROR:const d=c.getResponseJson();Z(pt,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(d)),o(d);break;case Ao.TIMEOUT:Z(pt,`RPC '${e}' ${i} timed out`),l(new ee(F.DEADLINE_EXCEEDED,"Request time out"));break;case Ao.HTTP_ERROR:const p=c.getStatus();if(Z(pt,`RPC '${e}' ${i} failed with status:`,p,"response text:",c.getResponseText()),p>0){let y=c.getResponseJson();Array.isArray(y)&&(y=y[0]);const E=y==null?void 0:y.error;if(E&&E.status&&E.message){const x=function(V){const X=V.toLowerCase().replace(/_/g,"-");return Object.values(F).indexOf(X)>=0?X:F.UNKNOWN}(E.status);l(new ee(x,E.message))}else l(new ee(F.UNKNOWN,"Server responded with status "+c.getStatus()))}else l(new ee(F.UNAVAILABLE,"Connection failed."));break;default:ae()}}finally{Z(pt,`RPC '${e}' ${i} completed.`)}});const u=JSON.stringify(r);Z(pt,`RPC '${e}' ${i} sending request:`,r),c.send(n,"POST",u,s,15)})}Bo(e,n,s){const r=Fl(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=eg(),l=Zm(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Oo(c.initMessageHeaders,n,s),c.encodeInitMessageHeaders=!0;const d=i.join("");Z(pt,`Creating RPC '${e}' stream ${r}: ${d}`,c);const p=o.createWebChannel(d,c);let y=!1,E=!1;const x=new YE({Io:V=>{E?Z(pt,`Not sending because RPC '${e}' stream ${r} is closed:`,V):(y||(Z(pt,`Opening RPC '${e}' stream ${r} transport.`),p.open(),y=!0),Z(pt,`RPC '${e}' stream ${r} sending:`,V),p.send(V))},To:()=>p.close()}),P=(V,X,Q)=>{V.listen(X,Y=>{try{Q(Y)}catch(q){setTimeout(()=>{throw q},0)}})};return P(p,Gr.EventType.OPEN,()=>{E||(Z(pt,`RPC '${e}' stream ${r} transport opened.`),x.yo())}),P(p,Gr.EventType.CLOSE,()=>{E||(E=!0,Z(pt,`RPC '${e}' stream ${r} transport closed`),x.So())}),P(p,Gr.EventType.ERROR,V=>{E||(E=!0,pr(pt,`RPC '${e}' stream ${r} transport errored:`,V),x.So(new ee(F.UNAVAILABLE,"The operation could not be completed")))}),P(p,Gr.EventType.MESSAGE,V=>{var X;if(!E){const Q=V.data[0];Te(!!Q);const Y=Q,q=Y.error||((X=Y[0])===null||X===void 0?void 0:X.error);if(q){Z(pt,`RPC '${e}' stream ${r} received error:`,q);const K=q.status;let B=function(_){const T=Ke[_];if(T!==void 0)return xg(T)}(K),S=q.message;B===void 0&&(B=F.INTERNAL,S="Unknown error status: "+K+" with message "+q.message),E=!0,x.So(new ee(B,S)),p.close()}else Z(pt,`RPC '${e}' stream ${r} received:`,Q),x.bo(Q)}}),P(l,Xm.STAT_EVENT,V=>{V.stat===uc.PROXY?Z(pt,`RPC '${e}' stream ${r} detected buffering proxy`):V.stat===uc.NOPROXY&&Z(pt,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{x.wo()},0),x}}function Ul(){return typeof document<"u"?document:null}/**
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
 */function Ba(t){return new lE(t,!0)}/**
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
 */class pu{constructor(e,n,s=1e3,r=1.5,i=6e4){this.ui=e,this.timerId=n,this.ko=s,this.qo=r,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),s=Math.max(0,Date.now()-this.Uo),r=Math.max(0,n-s);r>0&&Z("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${s} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,r,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class Ug{constructor(e,n,s,r,i,o,l,c){this.ui=e,this.Ho=s,this.Jo=r,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new pu(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===F.RESOURCE_EXHAUSTED?(kn(n.toString()),kn("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===F.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,r])=>{this.Yo===n&&this.P_(s,r)},s=>{e(()=>{const r=new ee(F.UNKNOWN,"Fetching auth token failed: "+s.message);return this.I_(r)})})}P_(e,n){const s=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{s(()=>this.listener.Eo())}),this.stream.Ro(()=>{s(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(r=>{s(()=>this.I_(r))}),this.stream.onMessage(r=>{s(()=>++this.e_==1?this.E_(r):this.onNext(r))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return Z("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(Z("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class ZE extends Ug{constructor(e,n,s,r,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,s,r,o),this.serializer=i}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=dE(this.serializer,e),s=function(i){if(!("targetChange"in i))return ce.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?ce.min():o.readTime?Ot(o.readTime):ce.min()}(e);return this.listener.d_(n,s)}A_(e){const n={};n.database=yc(this.serializer),n.addTarget=function(i,o){let l;const c=o.target;if(l=pc(c)?{documents:pE(i,c)}:{query:mE(i,c)._t},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=Cg(i,o.resumeToken);const u=gc(i,o.expectedCount);u!==null&&(l.expectedCount=u)}else if(o.snapshotVersion.compareTo(ce.min())>0){l.readTime=na(i,o.snapshotVersion.toTimestamp());const u=gc(i,o.expectedCount);u!==null&&(l.expectedCount=u)}return l}(this.serializer,e);const s=_E(this.serializer,e);s&&(n.labels=s),this.a_(n)}R_(e){const n={};n.database=yc(this.serializer),n.removeTarget=e,this.a_(n)}}class eA extends Ug{constructor(e,n,s,r,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,s,r,o),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return Te(!!e.streamToken),this.lastStreamToken=e.streamToken,Te(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){Te(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=fE(e.writeResults,e.commitTime),s=Ot(e.commitTime);return this.listener.g_(s,n)}p_(){const e={};e.database=yc(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(s=>Ng(this.serializer,s))};this.a_(n)}}/**
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
 */class tA extends class{}{constructor(e,n,s,r){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=s,this.serializer=r,this.y_=!1}w_(){if(this.y_)throw new ee(F.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,s,r){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Mo(e,_c(n,s),r,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===F.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new ee(F.UNKNOWN,i.toString())})}Lo(e,n,s,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Lo(e,_c(n,s),r,o,l,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===F.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new ee(F.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class nA{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(kn(n),this.D_=!1):Z("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
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
 */class sA{constructor(e,n,s,r,i){this.localStore=e,this.datastore=n,this.asyncQueue=s,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(o=>{s.enqueueAndForget(async()=>{Gs(this)&&(Z("RemoteStore","Restarting streams for network reachability change."),await async function(c){const u=he(c);u.L_.add(4),await Bi(u),u.q_.set("Unknown"),u.L_.delete(4),await ja(u)}(this))})}),this.q_=new nA(s,r)}}async function ja(t){if(Gs(t))for(const e of t.B_)await e(!0)}async function Bi(t){for(const e of t.B_)await e(!1)}function $g(t,e){const n=he(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),yu(n)?_u(n):Er(n).r_()&&gu(n,e))}function mu(t,e){const n=he(t),s=Er(n);n.N_.delete(e),s.r_()&&Bg(n,e),n.N_.size===0&&(s.r_()?s.o_():Gs(n)&&n.q_.set("Unknown"))}function gu(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ce.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Er(t).A_(e)}function Bg(t,e){t.Q_.xe(e),Er(t).R_(e)}function _u(t){t.Q_=new rE({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),Er(t).start(),t.q_.v_()}function yu(t){return Gs(t)&&!Er(t).n_()&&t.N_.size>0}function Gs(t){return he(t).L_.size===0}function jg(t){t.Q_=void 0}async function rA(t){t.q_.set("Online")}async function iA(t){t.N_.forEach((e,n)=>{gu(t,e)})}async function oA(t,e){jg(t),yu(t)?(t.q_.M_(e),_u(t)):t.q_.set("Unknown")}async function aA(t,e,n){if(t.q_.set("Online"),e instanceof Rg&&e.state===2&&e.cause)try{await async function(r,i){const o=i.cause;for(const l of i.targetIds)r.N_.has(l)&&(await r.remoteSyncer.rejectListen(l,o),r.N_.delete(l),r.Q_.removeTarget(l))}(t,e)}catch(s){Z("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),s),await ra(t,s)}else if(e instanceof Ro?t.Q_.Ke(e):e instanceof Sg?t.Q_.He(e):t.Q_.We(e),!n.isEqual(ce.min()))try{const s=await Fg(t.localStore);n.compareTo(s)>=0&&await function(i,o){const l=i.Q_.rt(o);return l.targetChanges.forEach((c,u)=>{if(c.resumeToken.approximateByteSize()>0){const d=i.N_.get(u);d&&i.N_.set(u,d.withResumeToken(c.resumeToken,o))}}),l.targetMismatches.forEach((c,u)=>{const d=i.N_.get(c);if(!d)return;i.N_.set(c,d.withResumeToken(ut.EMPTY_BYTE_STRING,d.snapshotVersion)),Bg(i,c);const p=new Gn(d.target,c,u,d.sequenceNumber);gu(i,p)}),i.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(s){Z("RemoteStore","Failed to raise snapshot:",s),await ra(t,s)}}async function ra(t,e,n){if(!Li(e))throw e;t.L_.add(1),await Bi(t),t.q_.set("Offline"),n||(n=()=>Fg(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{Z("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await ja(t)})}function zg(t,e){return e().catch(n=>ra(t,n,e))}async function za(t){const e=he(t),n=cs(e);let s=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;lA(e);)try{const r=await HE(e.localStore,s);if(r===null){e.O_.length===0&&n.o_();break}s=r.batchId,cA(e,r)}catch(r){await ra(e,r)}qg(e)&&Hg(e)}function lA(t){return Gs(t)&&t.O_.length<10}function cA(t,e){t.O_.push(e);const n=cs(t);n.r_()&&n.V_&&n.m_(e.mutations)}function qg(t){return Gs(t)&&!cs(t).n_()&&t.O_.length>0}function Hg(t){cs(t).start()}async function uA(t){cs(t).p_()}async function hA(t){const e=cs(t);for(const n of t.O_)e.m_(n.mutations)}async function dA(t,e,n){const s=t.O_.shift(),r=lu.from(s,e,n);await zg(t,()=>t.remoteSyncer.applySuccessfulWrite(r)),await za(t)}async function fA(t,e){e&&cs(t).V_&&await async function(s,r){if(function(o){return Ag(o)&&o!==F.ABORTED}(r.code)){const i=s.O_.shift();cs(s).s_(),await zg(s,()=>s.remoteSyncer.rejectFailedWrite(i.batchId,r)),await za(s)}}(t,e),qg(t)&&Hg(t)}async function _f(t,e){const n=he(t);n.asyncQueue.verifyOperationInProgress(),Z("RemoteStore","RemoteStore received new credentials");const s=Gs(n);n.L_.add(3),await Bi(n),s&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await ja(n)}async function pA(t,e){const n=he(t);e?(n.L_.delete(2),await ja(n)):e||(n.L_.add(2),await Bi(n),n.q_.set("Unknown"))}function Er(t){return t.K_||(t.K_=function(n,s,r){const i=he(n);return i.w_(),new ZE(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)}(t.datastore,t.asyncQueue,{Eo:rA.bind(null,t),Ro:iA.bind(null,t),mo:oA.bind(null,t),d_:aA.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),yu(t)?_u(t):t.q_.set("Unknown")):(await t.K_.stop(),jg(t))})),t.K_}function cs(t){return t.U_||(t.U_=function(n,s,r){const i=he(n);return i.w_(),new eA(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:uA.bind(null,t),mo:fA.bind(null,t),f_:hA.bind(null,t),g_:dA.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await za(t)):(await t.U_.stop(),t.O_.length>0&&(Z("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
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
 */class vu{constructor(e,n,s,r,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=s,this.op=r,this.removalCallback=i,this.deferred=new Zn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,s,r,i){const o=Date.now()+s,l=new vu(e,n,o,r,i);return l.start(s),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new ee(F.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function wu(t,e){if(kn("AsyncQueue",`${e}: ${t}`),Li(t))return new ee(F.UNAVAILABLE,`${e}: ${t}`);throw t}/**
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
 */class ur{constructor(e){this.comparator=e?(n,s)=>e(n,s)||re.comparator(n.key,s.key):(n,s)=>re.comparator(n.key,s.key),this.keyedMap=Qr(),this.sortedSet=new Ue(this.comparator)}static emptySet(e){return new ur(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,s)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof ur)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;n.hasNext();){const r=n.getNext().key,i=s.getNext().key;if(!r.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const s=new ur;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=n,s}}/**
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
 */class yf{constructor(){this.W_=new Ue(re.comparator)}track(e){const n=e.doc.key,s=this.W_.get(n);s?e.type!==0&&s.type===3?this.W_=this.W_.insert(n,e):e.type===3&&s.type!==1?this.W_=this.W_.insert(n,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.W_=this.W_.remove(n):e.type===1&&s.type===2?this.W_=this.W_.insert(n,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):ae():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,s)=>{e.push(s)}),e}}class vr{constructor(e,n,s,r,i,o,l,c,u){this.query=e,this.docs=n,this.oldDocs=s,this.docChanges=r,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=u}static fromInitialDocuments(e,n,s,r,i){const o=[];return n.forEach(l=>{o.push({type:0,doc:l})}),new vr(e,n,ur.emptySet(n),o,s,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Oa(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,s=e.docChanges;if(n.length!==s.length)return!1;for(let r=0;r<n.length;r++)if(n[r].type!==s[r].type||!n[r].doc.isEqual(s[r].doc))return!1;return!0}}/**
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
 */class mA{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class gA{constructor(){this.queries=vf(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,s){const r=he(n),i=r.queries;r.queries=vf(),i.forEach((o,l)=>{for(const c of l.j_)c.onError(s)})})(this,new ee(F.ABORTED,"Firestore shutting down"))}}function vf(){return new Ir(t=>dg(t),Oa)}async function _A(t,e){const n=he(t);let s=3;const r=e.query;let i=n.queries.get(r);i?!i.H_()&&e.J_()&&(s=2):(i=new mA,s=e.J_()?0:1);try{switch(s){case 0:i.z_=await n.onListen(r,!0);break;case 1:i.z_=await n.onListen(r,!1);break;case 2:await n.onFirstRemoteStoreListen(r)}}catch(o){const l=wu(o,`Initialization of query '${sr(e.query)}' failed`);return void e.onError(l)}n.queries.set(r,i),i.j_.push(e),e.Z_(n.onlineState),i.z_&&e.X_(i.z_)&&bu(n)}async function yA(t,e){const n=he(t),s=e.query;let r=3;const i=n.queries.get(s);if(i){const o=i.j_.indexOf(e);o>=0&&(i.j_.splice(o,1),i.j_.length===0?r=e.J_()?0:1:!i.H_()&&e.J_()&&(r=2))}switch(r){case 0:return n.queries.delete(s),n.onUnlisten(s,!0);case 1:return n.queries.delete(s),n.onUnlisten(s,!1);case 2:return n.onLastRemoteStoreUnlisten(s);default:return}}function vA(t,e){const n=he(t);let s=!1;for(const r of e){const i=r.query,o=n.queries.get(i);if(o){for(const l of o.j_)l.X_(r)&&(s=!0);o.z_=r}}s&&bu(n)}function wA(t,e,n){const s=he(t),r=s.queries.get(e);if(r)for(const i of r.j_)i.onError(n);s.queries.delete(e)}function bu(t){t.Y_.forEach(e=>{e.next()})}var wc,wf;(wf=wc||(wc={})).ea="default",wf.Cache="cache";class bA{constructor(e,n,s){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=s||{}}X_(e){if(!this.options.includeMetadataChanges){const s=[];for(const r of e.docChanges)r.type!==3&&s.push(r);e=new vr(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const s=n!=="Offline";return(!this.options._a||!s)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=vr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==wc.Cache}}/**
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
 */class Wg{constructor(e){this.key=e}}class Kg{constructor(e){this.key=e}}class TA{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=ge(),this.mutatedKeys=ge(),this.Aa=fg(e),this.Ra=new ur(this.Aa)}get Va(){return this.Ta}ma(e,n){const s=n?n.fa:new yf,r=n?n.Ra:this.Ra;let i=n?n.mutatedKeys:this.mutatedKeys,o=r,l=!1;const c=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,u=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((d,p)=>{const y=r.get(d),E=La(this.query,p)?p:null,x=!!y&&this.mutatedKeys.has(y.key),P=!!E&&(E.hasLocalMutations||this.mutatedKeys.has(E.key)&&E.hasCommittedMutations);let V=!1;y&&E?y.data.isEqual(E.data)?x!==P&&(s.track({type:3,doc:E}),V=!0):this.ga(y,E)||(s.track({type:2,doc:E}),V=!0,(c&&this.Aa(E,c)>0||u&&this.Aa(E,u)<0)&&(l=!0)):!y&&E?(s.track({type:0,doc:E}),V=!0):y&&!E&&(s.track({type:1,doc:y}),V=!0,(c||u)&&(l=!0)),V&&(E?(o=o.add(E),i=P?i.add(d):i.delete(d)):(o=o.delete(d),i=i.delete(d)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),i=i.delete(d.key),s.track({type:1,doc:d})}return{Ra:o,fa:s,ns:l,mutatedKeys:i}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,s,r){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((d,p)=>function(E,x){const P=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ae()}};return P(E)-P(x)}(d.type,p.type)||this.Aa(d.doc,p.doc)),this.pa(s),r=r!=null&&r;const l=n&&!r?this.ya():[],c=this.da.size===0&&this.current&&!r?1:0,u=c!==this.Ea;return this.Ea=c,o.length!==0||u?{snapshot:new vr(this.query,e.Ra,i,o,e.mutatedKeys,c===0,u,!1,!!s&&s.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new yf,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=ge(),this.Ra.forEach(s=>{this.Sa(s.key)&&(this.da=this.da.add(s.key))});const n=[];return e.forEach(s=>{this.da.has(s)||n.push(new Kg(s))}),this.da.forEach(s=>{e.has(s)||n.push(new Wg(s))}),n}ba(e){this.Ta=e.Ts,this.da=ge();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return vr.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class IA{constructor(e,n,s){this.query=e,this.targetId=n,this.view=s}}class EA{constructor(e){this.key=e,this.va=!1}}class AA{constructor(e,n,s,r,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=s,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new Ir(l=>dg(l),Oa),this.Ma=new Map,this.xa=new Set,this.Oa=new Ue(re.comparator),this.Na=new Map,this.La=new hu,this.Ba={},this.ka=new Map,this.qa=yr.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function xA(t,e,n=!0){const s=Zg(t);let r;const i=s.Fa.get(e);return i?(s.sharedClientState.addLocalQueryTarget(i.targetId),r=i.view.Da()):r=await Gg(s,e,n,!0),r}async function SA(t,e){const n=Zg(t);await Gg(n,e,!0,!1)}async function Gg(t,e,n,s){const r=await WE(t.localStore,an(e)),i=r.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let l;return s&&(l=await RA(t,e,i,o==="current",r.resumeToken)),t.isPrimaryClient&&n&&$g(t.remoteStore,r),l}async function RA(t,e,n,s,r){t.Ka=(p,y,E)=>async function(P,V,X,Q){let Y=V.view.ma(X);Y.ns&&(Y=await pf(P.localStore,V.query,!1).then(({documents:S})=>V.view.ma(S,Y)));const q=Q&&Q.targetChanges.get(V.targetId),K=Q&&Q.targetMismatches.get(V.targetId)!=null,B=V.view.applyChanges(Y,P.isPrimaryClient,q,K);return Tf(P,V.targetId,B.wa),B.snapshot}(t,p,y,E);const i=await pf(t.localStore,e,!0),o=new TA(e,i.Ts),l=o.ma(i.documents),c=$i.createSynthesizedTargetChangeForCurrentChange(n,s&&t.onlineState!=="Offline",r),u=o.applyChanges(l,t.isPrimaryClient,c);Tf(t,n,u.wa);const d=new IA(e,n,o);return t.Fa.set(e,d),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),u.snapshot}async function CA(t,e,n){const s=he(t),r=s.Fa.get(e),i=s.Ma.get(r.targetId);if(i.length>1)return s.Ma.set(r.targetId,i.filter(o=>!Oa(o,e))),void s.Fa.delete(e);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(r.targetId),s.sharedClientState.isActiveQueryTarget(r.targetId)||await vc(s.localStore,r.targetId,!1).then(()=>{s.sharedClientState.clearQueryState(r.targetId),n&&mu(s.remoteStore,r.targetId),bc(s,r.targetId)}).catch(Oi)):(bc(s,r.targetId),await vc(s.localStore,r.targetId,!0))}async function PA(t,e){const n=he(t),s=n.Fa.get(e),r=n.Ma.get(s.targetId);n.isPrimaryClient&&r.length===1&&(n.sharedClientState.removeLocalQueryTarget(s.targetId),mu(n.remoteStore,s.targetId))}async function kA(t,e,n){const s=FA(t);try{const r=await function(o,l){const c=he(o),u=Xe.now(),d=l.reduce((E,x)=>E.add(x.key),ge());let p,y;return c.persistence.runTransaction("Locally write mutations","readwrite",E=>{let x=Mn(),P=ge();return c.cs.getEntries(E,d).next(V=>{x=V,x.forEach((X,Q)=>{Q.isValidDocument()||(P=P.add(X))})}).next(()=>c.localDocuments.getOverlayedDocuments(E,x)).next(V=>{p=V;const X=[];for(const Q of l){const Y=XI(Q,p.get(Q.key).overlayedDocument);Y!=null&&X.push(new hs(Q.key,Y,ig(Y.value.mapValue),St.exists(!0)))}return c.mutationQueue.addMutationBatch(E,u,X,l)}).next(V=>{y=V;const X=V.applyToLocalDocumentSet(p,P);return c.documentOverlayCache.saveOverlays(E,V.batchId,X)})}).then(()=>({batchId:y.batchId,changes:mg(p)}))}(s.localStore,e);s.sharedClientState.addPendingMutation(r.batchId),function(o,l,c){let u=o.Ba[o.currentUser.toKey()];u||(u=new Ue(Ae)),u=u.insert(l,c),o.Ba[o.currentUser.toKey()]=u}(s,r.batchId,n),await ji(s,r.changes),await za(s.remoteStore)}catch(r){const i=wu(r,"Failed to persist write");n.reject(i)}}async function Qg(t,e){const n=he(t);try{const s=await zE(n.localStore,e);e.targetChanges.forEach((r,i)=>{const o=n.Na.get(i);o&&(Te(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1),r.addedDocuments.size>0?o.va=!0:r.modifiedDocuments.size>0?Te(o.va):r.removedDocuments.size>0&&(Te(o.va),o.va=!1))}),await ji(n,s,e)}catch(s){await Oi(s)}}function bf(t,e,n){const s=he(t);if(s.isPrimaryClient&&n===0||!s.isPrimaryClient&&n===1){const r=[];s.Fa.forEach((i,o)=>{const l=o.view.Z_(e);l.snapshot&&r.push(l.snapshot)}),function(o,l){const c=he(o);c.onlineState=l;let u=!1;c.queries.forEach((d,p)=>{for(const y of p.j_)y.Z_(l)&&(u=!0)}),u&&bu(c)}(s.eventManager,e),r.length&&s.Ca.d_(r),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function MA(t,e,n){const s=he(t);s.sharedClientState.updateQueryState(e,"rejected",n);const r=s.Na.get(e),i=r&&r.key;if(i){let o=new Ue(re.comparator);o=o.insert(i,nt.newNoDocument(i,ce.min()));const l=ge().add(i),c=new $a(ce.min(),new Map,new Ue(Ae),o,l);await Qg(s,c),s.Oa=s.Oa.remove(i),s.Na.delete(e),Tu(s)}else await vc(s.localStore,e,!1).then(()=>bc(s,e,n)).catch(Oi)}async function NA(t,e){const n=he(t),s=e.batch.batchId;try{const r=await jE(n.localStore,e);Yg(n,s,null),Jg(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await ji(n,r)}catch(r){await Oi(r)}}async function DA(t,e,n){const s=he(t);try{const r=await function(o,l){const c=he(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",u=>{let d;return c.mutationQueue.lookupMutationBatch(u,l).next(p=>(Te(p!==null),d=p.keys(),c.mutationQueue.removeMutationBatch(u,p))).next(()=>c.mutationQueue.performConsistencyCheck(u)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(u,d,l)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,d)).next(()=>c.localDocuments.getDocuments(u,d))})}(s.localStore,e);Yg(s,e,n),Jg(s,e),s.sharedClientState.updateMutationState(e,"rejected",n),await ji(s,r)}catch(r){await Oi(r)}}function Jg(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function Yg(t,e,n){const s=he(t);let r=s.Ba[s.currentUser.toKey()];if(r){const i=r.get(e);i&&(n?i.reject(n):i.resolve(),r=r.remove(e)),s.Ba[s.currentUser.toKey()]=r}}function bc(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const s of t.Ma.get(e))t.Fa.delete(s),n&&t.Ca.$a(s,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(s=>{t.La.containsKey(s)||Xg(t,s)})}function Xg(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(mu(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),Tu(t))}function Tf(t,e,n){for(const s of n)s instanceof Wg?(t.La.addReference(s.key,e),VA(t,s)):s instanceof Kg?(Z("SyncEngine","Document no longer in limbo: "+s.key),t.La.removeReference(s.key,e),t.La.containsKey(s.key)||Xg(t,s.key)):ae()}function VA(t,e){const n=e.key,s=n.path.canonicalString();t.Oa.get(n)||t.xa.has(s)||(Z("SyncEngine","New document in limbo: "+n),t.xa.add(s),Tu(t))}function Tu(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new re(De.fromString(e)),s=t.qa.next();t.Na.set(s,new EA(n)),t.Oa=t.Oa.insert(n,s),$g(t.remoteStore,new Gn(an(iu(n.path)),s,"TargetPurposeLimboResolution",Zc.oe))}}async function ji(t,e,n){const s=he(t),r=[],i=[],o=[];s.Fa.isEmpty()||(s.Fa.forEach((l,c)=>{o.push(s.Ka(c,e,n).then(u=>{var d;if((u||n)&&s.isPrimaryClient){const p=u?!u.fromCache:(d=n==null?void 0:n.targetChanges.get(c.targetId))===null||d===void 0?void 0:d.current;s.sharedClientState.updateQueryState(c.targetId,p?"current":"not-current")}if(u){r.push(u);const p=fu.Wi(c.targetId,u);i.push(p)}}))}),await Promise.all(o),s.Ca.d_(r),await async function(c,u){const d=he(c);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>$.forEach(u,y=>$.forEach(y.$i,E=>d.persistence.referenceDelegate.addReference(p,y.targetId,E)).next(()=>$.forEach(y.Ui,E=>d.persistence.referenceDelegate.removeReference(p,y.targetId,E)))))}catch(p){if(!Li(p))throw p;Z("LocalStore","Failed to update sequence numbers: "+p)}for(const p of u){const y=p.targetId;if(!p.fromCache){const E=d.os.get(y),x=E.snapshotVersion,P=E.withLastLimboFreeSnapshotVersion(x);d.os=d.os.insert(y,P)}}}(s.localStore,i))}async function OA(t,e){const n=he(t);if(!n.currentUser.isEqual(e)){Z("SyncEngine","User change. New user:",e.toKey());const s=await Lg(n.localStore,e);n.currentUser=e,function(i,o){i.ka.forEach(l=>{l.forEach(c=>{c.reject(new ee(F.CANCELLED,o))})}),i.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await ji(n,s.hs)}}function LA(t,e){const n=he(t),s=n.Na.get(e);if(s&&s.va)return ge().add(s.key);{let r=ge();const i=n.Ma.get(e);if(!i)return r;for(const o of i){const l=n.Fa.get(o);r=r.unionWith(l.view.Va)}return r}}function Zg(t){const e=he(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=Qg.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=LA.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=MA.bind(null,e),e.Ca.d_=vA.bind(null,e.eventManager),e.Ca.$a=wA.bind(null,e.eventManager),e}function FA(t){const e=he(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=NA.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=DA.bind(null,e),e}class ia{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ba(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return BE(this.persistence,new UE,e.initialUser,this.serializer)}Ga(e){return new OE(du.Zr,this.serializer)}Wa(e){return new GE}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ia.provider={build:()=>new ia};class Tc{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>bf(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=OA.bind(null,this.syncEngine),await pA(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new gA}()}createDatastore(e){const n=Ba(e.databaseInfo.databaseId),s=function(i){return new XE(i)}(e.databaseInfo);return function(i,o,l,c){return new tA(i,o,l,c)}(e.authCredentials,e.appCheckCredentials,s,n)}createRemoteStore(e){return function(s,r,i,o,l){return new sA(s,r,i,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>bf(this.syncEngine,n,0),function(){return gf.D()?new gf:new QE}())}createSyncEngine(e,n){return function(r,i,o,l,c,u,d){const p=new AA(r,i,o,l,c,u);return d&&(p.Qa=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(r){const i=he(r);Z("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await Bi(i),i.k_.shutdown(),i.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}Tc.provider={build:()=>new Tc};/**
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
 */class UA{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):kn("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
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
 */class $A{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new ee(F.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const n=await async function(r,i){const o=he(r),l={documents:i.map(p=>sa(o.serializer,p))},c=await o.Lo("BatchGetDocuments",o.serializer.databaseId,De.emptyPath(),l,i.length),u=new Map;c.forEach(p=>{const y=hE(o.serializer,p);u.set(y.key.toString(),y)});const d=[];return i.forEach(p=>{const y=u.get(p.toString());Te(!!y),d.push(y)}),d}(this.datastore,e);return n.forEach(s=>this.recordVersion(s)),n}set(e,n){this.write(n.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,n){try{this.write(n.toMutation(e,this.preconditionForUpdate(e)))}catch(s){this.lastTransactionError=s}this.writtenDocs.add(e.toString())}delete(e){this.write(new au(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(n=>{e.delete(n.key.toString())}),e.forEach((n,s)=>{const r=re.fromPath(s);this.mutations.push(new Eg(r,this.precondition(r)))}),await async function(s,r){const i=he(s),o={writes:r.map(l=>Ng(i.serializer,l))};await i.Mo("Commit",i.serializer.databaseId,De.emptyPath(),o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let n;if(e.isFoundDocument())n=e.version;else{if(!e.isNoDocument())throw ae();n=ce.min()}const s=this.readVersions.get(e.key.toString());if(s){if(!n.isEqual(s))throw new ee(F.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),n)}precondition(e){const n=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&n?n.isEqual(ce.min())?St.exists(!1):St.updateTime(n):St.none()}preconditionForUpdate(e){const n=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&n){if(n.isEqual(ce.min()))throw new ee(F.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return St.updateTime(n)}return St.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
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
 */class BA{constructor(e,n,s,r,i){this.asyncQueue=e,this.datastore=n,this.options=s,this.updateFunction=r,this.deferred=i,this._u=s.maxAttempts,this.t_=new pu(this.asyncQueue,"transaction_retry")}au(){this._u-=1,this.uu()}uu(){this.t_.Go(async()=>{const e=new $A(this.datastore),n=this.cu(e);n&&n.then(s=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(s)}).catch(r=>{this.lu(r)}))}).catch(s=>{this.lu(s)})})}cu(e){try{const n=this.updateFunction(e);return!Fi(n)&&n.catch&&n.then?n:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(n){return this.deferred.reject(n),null}}lu(e){this._u>0&&this.hu(e)?(this._u-=1,this.asyncQueue.enqueueAndForget(()=>(this.uu(),Promise.resolve()))):this.deferred.reject(e)}hu(e){if(e.name==="FirebaseError"){const n=e.code;return n==="aborted"||n==="failed-precondition"||n==="already-exists"||!Ag(n)}return!1}}/**
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
 */class jA{constructor(e,n,s,r,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=s,this.databaseInfo=r,this.user=mt.UNAUTHENTICATED,this.clientId=ng.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(s,async o=>{Z("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(s,o=>(Z("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Zn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const s=wu(n,"Failed to shutdown persistence");e.reject(s)}}),e.promise}}async function $l(t,e){t.asyncQueue.verifyOperationInProgress(),Z("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let s=n.initialUser;t.setCredentialChangeListener(async r=>{s.isEqual(r)||(await Lg(e.localStore,r),s=r)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function If(t,e){t.asyncQueue.verifyOperationInProgress();const n=await zA(t);Z("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(s=>_f(e.remoteStore,s)),t.setAppCheckTokenChangeListener((s,r)=>_f(e.remoteStore,r)),t._onlineComponents=e}async function zA(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){Z("FirestoreClient","Using user provided OfflineComponentProvider");try{await $l(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(r){return r.name==="FirebaseError"?r.code===F.FAILED_PRECONDITION||r.code===F.UNIMPLEMENTED:!(typeof DOMException<"u"&&r instanceof DOMException)||r.code===22||r.code===20||r.code===11}(n))throw n;pr("Error using user provided cache. Falling back to memory cache: "+n),await $l(t,new ia)}}else Z("FirestoreClient","Using default OfflineComponentProvider"),await $l(t,new ia);return t._offlineComponents}async function Iu(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(Z("FirestoreClient","Using user provided OnlineComponentProvider"),await If(t,t._uninitializedComponentsProvider._online)):(Z("FirestoreClient","Using default OnlineComponentProvider"),await If(t,new Tc))),t._onlineComponents}function qA(t){return Iu(t).then(e=>e.syncEngine)}function HA(t){return Iu(t).then(e=>e.datastore)}async function Ef(t){const e=await Iu(t),n=e.eventManager;return n.onListen=xA.bind(null,e.syncEngine),n.onUnlisten=CA.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=SA.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=PA.bind(null,e.syncEngine),n}/**
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
 */function e_(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
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
 */const Af=new Map;/**
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
 */function t_(t,e,n){if(!n)throw new ee(F.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function WA(t,e,n,s){if(e===!0&&s===!0)throw new ee(F.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function xf(t){if(!re.isDocumentKey(t))throw new ee(F.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Sf(t){if(re.isDocumentKey(t))throw new ee(F.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Eu(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(s){return s.constructor?s.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":ae()}function es(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new ee(F.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Eu(t);throw new ee(F.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
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
 */class Rf{constructor(e){var n,s;if(e.host===void 0){if(e.ssl!==void 0)throw new ee(F.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new ee(F.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}WA("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=e_((s=e.experimentalLongPollingOptions)!==null&&s!==void 0?s:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new ee(F.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new ee(F.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new ee(F.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,r){return s.timeoutSeconds===r.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class qa{constructor(e,n,s,r){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=s,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Rf({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new ee(F.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new ee(F.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Rf(e),e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new iI;switch(s.type){case"firstParty":return new cI(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new ee(F.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const s=Af.get(n);s&&(Z("ComponentProvider","Removing Datastore"),Af.delete(n),s.terminate())}(this),Promise.resolve()}}function KA(t,e,n,s={}){var r;const i=(t=es(t,qa))._getSettings(),o=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&pr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),s.mockUserToken){let l,c;if(typeof s.mockUserToken=="string")l=s.mockUserToken,c=mt.MOCK_USER;else{l=fw(s.mockUserToken,(r=t._app)===null||r===void 0?void 0:r.options.projectId);const u=s.mockUserToken.sub||s.mockUserToken.user_id;if(!u)throw new ee(F.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new mt(u)}t._authCredentials=new oI(new tg(l,c))}}/**
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
 */class Ha{constructor(e,n,s){this.converter=n,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new Ha(this.firestore,e,this._query)}}class Pt{constructor(e,n,s){this.converter=n,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ts(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Pt(this.firestore,e,this._key)}}class ts extends Ha{constructor(e,n,s){super(e,n,iu(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Pt(this.firestore,null,new re(e))}withConverter(e){return new ts(this.firestore,e,this._path)}}function GA(t,e,...n){if(t=Ze(t),t_("collection","path",e),t instanceof qa){const s=De.fromString(e,...n);return Sf(s),new ts(t,null,s)}{if(!(t instanceof Pt||t instanceof ts))throw new ee(F.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child(De.fromString(e,...n));return Sf(s),new ts(t.firestore,null,s)}}function Wa(t,e,...n){if(t=Ze(t),arguments.length===1&&(e=ng.newId()),t_("doc","path",e),t instanceof qa){const s=De.fromString(e,...n);return xf(s),new Pt(t,null,new re(s))}{if(!(t instanceof Pt||t instanceof ts))throw new ee(F.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child(De.fromString(e,...n));return xf(s),new Pt(t.firestore,t instanceof ts?t.converter:null,new re(s))}}/**
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
 */class Cf{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new pu(this,"async_queue_retry"),this.Vu=()=>{const s=Ul();s&&Z("AsyncQueue","Visibility state changed to "+s.visibilityState),this.t_.jo()},this.mu=e;const n=Ul();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=Ul();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new Zn;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Li(e))throw e;Z("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(s=>{this.Eu=s,this.du=!1;const r=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(s);throw kn("INTERNAL UNHANDLED ERROR: ",r),s}).then(s=>(this.du=!1,s))));return this.mu=n,n}enqueueAfterDelay(e,n,s){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const r=vu.createAndSchedule(this,e,n,s,i=>this.yu(i));return this.Tu.push(r),r}fu(){this.Eu&&ae()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,s)=>n.targetTimeMs-s.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}function Pf(t){return function(n,s){if(typeof n!="object"||n===null)return!1;const r=n;for(const i of s)if(i in r&&typeof r[i]=="function")return!0;return!1}(t,["next","error","complete"])}class wr extends qa{constructor(e,n,s,r){super(e,n,s,r),this.type="firestore",this._queue=new Cf,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Cf(e),this._firestoreClient=void 0,await e}}}function QA(t,e){const n=typeof t=="object"?t:Wc(),s=typeof t=="string"?t:"(default)",r=Ws(n,"firestore").getImmediate({identifier:s});if(!r._initialized){const i=hw("firestore");i&&KA(r,...i)}return r}function Au(t){if(t._terminated)throw new ee(F.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||JA(t),t._firestoreClient}function JA(t){var e,n,s;const r=t._freezeSettings(),i=function(l,c,u,d){return new TI(l,c,u,d.host,d.ssl,d.experimentalForceLongPolling,d.experimentalAutoDetectLongPolling,e_(d.experimentalLongPollingOptions),d.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,r);t._componentsProvider||!((n=r.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((s=r.localCache)===null||s===void 0)&&s._onlineComponentProvider)&&(t._componentsProvider={_offline:r.localCache._offlineComponentProvider,_online:r.localCache._onlineComponentProvider}),t._firestoreClient=new jA(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(l){const c=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(c),_online:c}}(t._componentsProvider))}/**
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
 */class js{constructor(e){this._byteString=e}static fromBase64String(e){try{return new js(ut.fromBase64String(e))}catch(n){throw new ee(F.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new js(ut.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class Ka{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new ee(F.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new lt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Ga{constructor(e){this._methodName=e}}/**
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
 */class xu{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new ee(F.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new ee(F.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return Ae(this._lat,e._lat)||Ae(this._long,e._long)}}/**
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
 */class Su{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(s,r){if(s.length!==r.length)return!1;for(let i=0;i<s.length;++i)if(s[i]!==r[i])return!1;return!0}(this._values,e._values)}}/**
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
 */const YA=/^__.*__$/;class XA{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return this.fieldMask!==null?new hs(e,this.data,this.fieldMask,n,this.fieldTransforms):new Ui(e,this.data,n,this.fieldTransforms)}}class n_{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return new hs(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function s_(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ae()}}class Ru{constructor(e,n,s,r,i,o){this.settings=e,this.databaseId=n,this.serializer=s,this.ignoreUndefinedProperties=r,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Ru(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const s=(n=this.path)===null||n===void 0?void 0:n.child(e),r=this.Fu({path:s,xu:!1});return r.Ou(e),r}Nu(e){var n;const s=(n=this.path)===null||n===void 0?void 0:n.child(e),r=this.Fu({path:s,xu:!1});return r.vu(),r}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return oa(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(s_(this.Cu)&&YA.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class ZA{constructor(e,n,s){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=s||Ba(e)}Qu(e,n,s,r=!1){return new Ru({Cu:e,methodName:n,qu:s,path:lt.emptyPath(),xu:!1,ku:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Cu(t){const e=t._freezeSettings(),n=Ba(t._databaseId);return new ZA(t._databaseId,!!e.ignoreUndefinedProperties,n)}function Pu(t,e,n,s,r,i={}){const o=t.Qu(i.merge||i.mergeFields?2:0,e,n,r);Mu("Data must be an object, but it was:",o,s);const l=r_(s,o);let c,u;if(i.merge)c=new Nt(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const d=[];for(const p of i.mergeFields){const y=Ic(e,p,n);if(!o.contains(y))throw new ee(F.INVALID_ARGUMENT,`Field '${y}' is specified in your field mask but missing from your input data.`);o_(d,y)||d.push(y)}c=new Nt(d),u=o.fieldTransforms.filter(p=>c.covers(p.field))}else c=null,u=o.fieldTransforms;return new XA(new xt(l),c,u)}class Qa extends Ga{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Qa}}class ku extends Ga{_toFieldTransform(e){return new GI(e.path,new Ri)}isEqual(e){return e instanceof ku}}function ex(t,e,n,s){const r=t.Qu(1,e,n);Mu("Data must be an object, but it was:",r,s);const i=[],o=xt.empty();Ks(s,(c,u)=>{const d=Nu(e,c,n);u=Ze(u);const p=r.Nu(d);if(u instanceof Qa)i.push(d);else{const y=Ja(u,p);y!=null&&(i.push(d),o.set(d,y))}});const l=new Nt(i);return new n_(o,l,r.fieldTransforms)}function tx(t,e,n,s,r,i){const o=t.Qu(1,e,n),l=[Ic(e,s,n)],c=[r];if(i.length%2!=0)throw new ee(F.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let y=0;y<i.length;y+=2)l.push(Ic(e,i[y])),c.push(i[y+1]);const u=[],d=xt.empty();for(let y=l.length-1;y>=0;--y)if(!o_(u,l[y])){const E=l[y];let x=c[y];x=Ze(x);const P=o.Nu(E);if(x instanceof Qa)u.push(E);else{const V=Ja(x,P);V!=null&&(u.push(E),d.set(E,V))}}const p=new Nt(u);return new n_(d,p,o.fieldTransforms)}function Ja(t,e){if(i_(t=Ze(t)))return Mu("Unsupported field value:",e,t),r_(t,e);if(t instanceof Ga)return function(s,r){if(!s_(r.Cu))throw r.Bu(`${s._methodName}() can only be used with update() and set()`);if(!r.path)throw r.Bu(`${s._methodName}() is not currently supported inside arrays`);const i=s._toFieldTransform(r);i&&r.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(s,r){const i=[];let o=0;for(const l of s){let c=Ja(l,r.Lu(o));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),o++}return{arrayValue:{values:i}}}(t,e)}return function(s,r){if((s=Ze(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return HI(r.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const i=Xe.fromDate(s);return{timestampValue:na(r.serializer,i)}}if(s instanceof Xe){const i=new Xe(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:na(r.serializer,i)}}if(s instanceof xu)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof js)return{bytesValue:Cg(r.serializer,s._byteString)};if(s instanceof Pt){const i=r.databaseId,o=s.firestore._databaseId;if(!o.isEqual(i))throw r.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:uu(s.firestore._databaseId||r.databaseId,s._key.path)}}if(s instanceof Su)return function(o,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(c=>{if(typeof c!="number")throw l.Bu("VectorValues must only contain numeric values.");return ou(l.serializer,c)})}}}}}}(s,r);throw r.Bu(`Unsupported field value: ${Eu(s)}`)}(t,e)}function r_(t,e){const n={};return sg(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Ks(t,(s,r)=>{const i=Ja(r,e.Mu(s));i!=null&&(n[s]=i)}),{mapValue:{fields:n}}}function i_(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Xe||t instanceof xu||t instanceof js||t instanceof Pt||t instanceof Ga||t instanceof Su)}function Mu(t,e,n){if(!i_(n)||!function(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}(n)){const s=Eu(n);throw s==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+s)}}function Ic(t,e,n){if((e=Ze(e))instanceof Ka)return e._internalPath;if(typeof e=="string")return Nu(t,e);throw oa("Field path arguments must be of type string or ",t,!1,void 0,n)}const nx=new RegExp("[~\\*/\\[\\]]");function Nu(t,e,n){if(e.search(nx)>=0)throw oa(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Ka(...e.split("."))._internalPath}catch{throw oa(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function oa(t,e,n,s,r){const i=s&&!s.isEmpty(),o=r!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${s}`),o&&(c+=` in document ${r}`),c+=")"),new ee(F.INVALID_ARGUMENT,l+t+c)}function o_(t,e){return t.some(n=>n.isEqual(e))}/**
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
 */class aa{constructor(e,n,s,r,i){this._firestore=e,this._userDataWriter=n,this._key=s,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Pt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new sx(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(a_("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class sx extends aa{data(){return super.data()}}function a_(t,e){return typeof e=="string"?Nu(t,e):e instanceof Ka?e._internalPath:e._delegate._internalPath}/**
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
 */function rx(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new ee(F.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class l_{convertValue(e,n="none"){switch(Bs(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ze(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes($s(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw ae()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const s={};return Ks(e,(r,i)=>{s[r]=this.convertValue(i,n)}),s}convertVectorValue(e){var n,s,r;const i=(r=(s=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||s===void 0?void 0:s.values)===null||r===void 0?void 0:r.map(o=>ze(o.doubleValue));return new Su(i)}convertGeoPoint(e){return new xu(ze(e.latitude),ze(e.longitude))}convertArray(e,n){return(e.values||[]).map(s=>this.convertValue(s,n))}convertServerTimestamp(e,n){switch(n){case"previous":const s=tu(e);return s==null?null:this.convertValue(s,n);case"estimate":return this.convertTimestamp(Ai(e));default:return null}}convertTimestamp(e){const n=ls(e);return new Xe(n.seconds,n.nanos)}convertDocumentKey(e,n){const s=De.fromString(e);Te(Og(s));const r=new xi(s.get(1),s.get(3)),i=new re(s.popFirst(5));return r.isEqual(n)||kn(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
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
 */function Du(t,e,n){let s;return s=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,s}class ix extends l_{constructor(e){super(),this.firestore=e}convertBytes(e){return new js(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Pt(this.firestore,null,n)}}/**
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
 */class or{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Vu extends aa{constructor(e,n,s,r,i,o){super(e,n,s,r,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Co(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const s=this._document.data.field(a_("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,n.serverTimestamps)}}}class Co extends Vu{data(e={}){return super.data(e)}}class ox{constructor(e,n,s,r){this._firestore=e,this._userDataWriter=n,this._snapshot=r,this.metadata=new or(r.hasPendingWrites,r.fromCache),this.query=s}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(s=>{e.call(n,new Co(this._firestore,this._userDataWriter,s.key,s,new or(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new ee(F.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(r,i){if(r._snapshot.oldDocs.isEmpty()){let o=0;return r._snapshot.docChanges.map(l=>{const c=new Co(r._firestore,r._userDataWriter,l.doc.key,l.doc,new or(r._snapshot.mutatedKeys.has(l.doc.key),r._snapshot.fromCache),r.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const c=new Co(r._firestore,r._userDataWriter,l.doc.key,l.doc,new or(r._snapshot.mutatedKeys.has(l.doc.key),r._snapshot.fromCache),r.query.converter);let u=-1,d=-1;return l.type!==0&&(u=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),d=o.indexOf(l.doc.key)),{type:ax(l.type),doc:c,oldIndex:u,newIndex:d}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function ax(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ae()}}class Ou extends l_{constructor(e){super(),this.firestore=e}convertBytes(e){return new js(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Pt(this.firestore,null,n)}}function lx(t,e,n){t=es(t,Pt);const s=es(t.firestore,wr),r=Du(t.converter,e,n);return c_(s,[Pu(Cu(s),"setDoc",t._key,r,t.converter!==null,n).toMutation(t._key,St.none())])}function cx(t,e){const n=es(t.firestore,wr),s=Wa(t),r=Du(t.converter,e);return c_(n,[Pu(Cu(t.firestore),"addDoc",s._key,r,t.converter!==null,{}).toMutation(s._key,St.exists(!1))]).then(()=>s)}function ux(t,...e){var n,s,r;t=Ze(t);let i={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Pf(e[o])||(i=e[o],o++);const l={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(Pf(e[o])){const p=e[o];e[o]=(n=p.next)===null||n===void 0?void 0:n.bind(p),e[o+1]=(s=p.error)===null||s===void 0?void 0:s.bind(p),e[o+2]=(r=p.complete)===null||r===void 0?void 0:r.bind(p)}let c,u,d;if(t instanceof Pt)u=es(t.firestore,wr),d=iu(t._key.path),c={next:p=>{e[o]&&e[o](hx(u,t,p))},error:e[o+1],complete:e[o+2]};else{const p=es(t,Ha);u=es(p.firestore,wr),d=p._query;const y=new Ou(u);c={next:E=>{e[o]&&e[o](new ox(u,y,p,E))},error:e[o+1],complete:e[o+2]},rx(t._query)}return function(y,E,x,P){const V=new UA(P),X=new bA(E,V,x);return y.asyncQueue.enqueueAndForget(async()=>_A(await Ef(y),X)),()=>{V.Za(),y.asyncQueue.enqueueAndForget(async()=>yA(await Ef(y),X))}}(Au(u),d,l,c)}function c_(t,e){return function(s,r){const i=new Zn;return s.asyncQueue.enqueueAndForget(async()=>kA(await qA(s),r,i)),i.promise}(Au(t),e)}function hx(t,e,n){const s=n.docs.get(e._key),r=new Ou(t);return new Vu(t,r,e._key,s,new or(n.hasPendingWrites,n.fromCache),e.converter)}/**
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
 */const dx={maxAttempts:5};function Hr(t,e){if((t=Ze(t)).firestore!==e)throw new ee(F.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return t}/**
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
 */class fx extends class{constructor(n,s){this._firestore=n,this._transaction=s,this._dataReader=Cu(n)}get(n){const s=Hr(n,this._firestore),r=new ix(this._firestore);return this._transaction.lookup([s._key]).then(i=>{if(!i||i.length!==1)return ae();const o=i[0];if(o.isFoundDocument())return new aa(this._firestore,r,o.key,o,s.converter);if(o.isNoDocument())return new aa(this._firestore,r,s._key,null,s.converter);throw ae()})}set(n,s,r){const i=Hr(n,this._firestore),o=Du(i.converter,s,r),l=Pu(this._dataReader,"Transaction.set",i._key,o,i.converter!==null,r);return this._transaction.set(i._key,l),this}update(n,s,r,...i){const o=Hr(n,this._firestore);let l;return l=typeof(s=Ze(s))=="string"||s instanceof Ka?tx(this._dataReader,"Transaction.update",o._key,s,r,i):ex(this._dataReader,"Transaction.update",o._key,s),this._transaction.update(o._key,l),this}delete(n){const s=Hr(n,this._firestore);return this._transaction.delete(s._key),this}}{constructor(e,n){super(e,n),this._firestore=e}get(e){const n=Hr(e,this._firestore),s=new Ou(this._firestore);return super.get(e).then(r=>new Vu(this._firestore,s,n._key,r._document,new or(!1,!1),n.converter))}}function px(t,e,n){t=es(t,wr);const s=Object.assign(Object.assign({},dx),n);return function(i){if(i.maxAttempts<1)throw new ee(F.INVALID_ARGUMENT,"Max attempts must be at least 1")}(s),function(i,o,l){const c=new Zn;return i.asyncQueue.enqueueAndForget(async()=>{const u=await HA(i);new BA(i.asyncQueue,u,l,o,c).au()}),c.promise}(Au(t),r=>e(new fx(t,r)),s)}function mx(){return new ku("serverTimestamp")}(function(e,n=!0){(function(r){Tr=r})(br),hn(new Jt("firestore",(s,{instanceIdentifier:r,options:i})=>{const o=s.getProvider("app").getImmediate(),l=new wr(new aI(s.getProvider("auth-internal")),new hI(s.getProvider("app-check-internal")),function(u,d){if(!Object.prototype.hasOwnProperty.apply(u.options,["projectId"]))throw new ee(F.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new xi(u.options.projectId,d)}(o,r),o);return i=Object.assign({useFetchStreams:n},i),l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),jt(Wd,"4.7.3",e),jt(Wd,"4.7.3","esm2017")})();function Lu(t,e){var n={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(n[s]=t[s]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,s=Object.getOwnPropertySymbols(t);r<s.length;r++)e.indexOf(s[r])<0&&Object.prototype.propertyIsEnumerable.call(t,s[r])&&(n[s[r]]=t[s[r]]);return n}function u_(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const gx=u_,h_=new Hs("auth","Firebase",u_());/**
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
 */const la=new Ma("@firebase/auth");function _x(t,...e){la.logLevel<=_e.WARN&&la.warn(`Auth (${br}): ${t}`,...e)}function Po(t,...e){la.logLevel<=_e.ERROR&&la.error(`Auth (${br}): ${t}`,...e)}/**
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
 */function Nn(t,...e){throw Fu(t,...e)}function ln(t,...e){return Fu(t,...e)}function d_(t,e,n){const s=Object.assign(Object.assign({},gx()),{[e]:n});return new Hs("auth","Firebase",s).create(e,{appName:t.name})}function ns(t){return d_(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Fu(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return h_.create(t,...e)}function ue(t,e,...n){if(!t)throw Fu(e,...n)}function An(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Po(e),new Error(e)}function Dn(t,e){t||An(e)}/**
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
 */function Ec(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function yx(){return kf()==="http:"||kf()==="https:"}function kf(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function vx(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(yx()||jc()||"connection"in navigator)?navigator.onLine:!0}function wx(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class zi{constructor(e,n){this.shortDelay=e,this.longDelay=n,Dn(n>e,"Short delay should be less than long delay!"),this.isMobile=pw()||_w()}get(){return vx()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Uu(t,e){Dn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class f_{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;An("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;An("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;An("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const bx={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Tx=new zi(3e4,6e4);function Ya(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Ar(t,e,n,s,r={}){return p_(t,r,async()=>{let i={},o={};s&&(e==="GET"?o=s:i={body:JSON.stringify(s)});const l=Vi(Object.assign({key:t.config.apiKey},o)).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const u=Object.assign({method:e,headers:c},i);return gw()||(u.referrerPolicy="no-referrer"),f_.fetch()(g_(t,t.config.apiHost,n,l),u)})}async function p_(t,e,n){t._canInitEmulator=!1;const s=Object.assign(Object.assign({},bx),e);try{const r=new Ix(t),i=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw wo(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const l=i.ok?o.errorMessage:o.error.message,[c,u]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw wo(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw wo(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw wo(t,"user-disabled",o);const d=s[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw d_(t,d,u);Nn(t,d)}}catch(r){if(r instanceof Yt)throw r;Nn(t,"network-request-failed",{message:String(r)})}}async function m_(t,e,n,s,r={}){const i=await Ar(t,e,n,s,r);return"mfaPendingCredential"in i&&Nn(t,"multi-factor-auth-required",{_serverResponse:i}),i}function g_(t,e,n,s){const r=`${e}${n}?${s}`;return t.config.emulator?Uu(t.config,r):`${t.config.apiScheme}://${r}`}class Ix{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(ln(this.auth,"network-request-failed")),Tx.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function wo(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const r=ln(t,e,s);return r.customData._tokenResponse=n,r}/**
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
 */async function Ex(t,e){return Ar(t,"POST","/v1/accounts:delete",e)}async function __(t,e){return Ar(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function di(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Ax(t,e=!1){const n=Ze(t),s=await n.getIdToken(e),r=$u(s);ue(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:r,token:s,authTime:di(Bl(r.auth_time)),issuedAtTime:di(Bl(r.iat)),expirationTime:di(Bl(r.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Bl(t){return Number(t)*1e3}function $u(t){const[e,n,s]=t.split(".");if(e===void 0||n===void 0||s===void 0)return Po("JWT malformed, contained fewer than 3 sections"),null;try{const r=gm(n);return r?JSON.parse(r):(Po("Failed to decode base64 JWT payload"),null)}catch(r){return Po("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function Mf(t){const e=$u(t);return ue(e,"internal-error"),ue(typeof e.exp<"u","internal-error"),ue(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function ki(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof Yt&&xx(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function xx({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class Sx{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const s=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),s}else{this.errorBackoff=3e4;const r=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Ac{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=di(this.lastLoginAt),this.creationTime=di(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function ca(t){var e;const n=t.auth,s=await t.getIdToken(),r=await ki(t,__(n,{idToken:s}));ue(r==null?void 0:r.users.length,n,"internal-error");const i=r.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?y_(i.providerUserInfo):[],l=Cx(t.providerData,o),c=t.isAnonymous,u=!(t.email&&i.passwordHash)&&!(l!=null&&l.length),d=c?u:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new Ac(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(t,p)}async function Rx(t){const e=Ze(t);await ca(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Cx(t,e){return[...t.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function y_(t){return t.map(e=>{var{providerId:n}=e,s=Lu(e,["providerId"]);return{providerId:n,uid:s.rawId||"",displayName:s.displayName||null,email:s.email||null,phoneNumber:s.phoneNumber||null,photoURL:s.photoUrl||null}})}/**
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
 */async function Px(t,e){const n=await p_(t,{},async()=>{const s=Vi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=t.config,o=g_(t,r,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",f_.fetch()(o,{method:"POST",headers:l,body:s})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function kx(t,e){return Ar(t,"POST","/v2/accounts:revokeToken",Ya(t,e))}/**
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
 */class hr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){ue(e.idToken,"internal-error"),ue(typeof e.idToken<"u","internal-error"),ue(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Mf(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){ue(e.length!==0,"internal-error");const n=Mf(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(ue(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:r,expiresIn:i}=await Px(e,n);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:r,expirationTime:i}=n,o=new hr;return s&&(ue(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),r&&(ue(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),i&&(ue(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new hr,this.toJSON())}_performRefresh(){return An("not implemented")}}/**
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
 */function Bn(t,e){ue(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class xn{constructor(e){var{uid:n,auth:s,stsTokenManager:r}=e,i=Lu(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Sx(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=s,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Ac(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await ki(this,this.stsTokenManager.getToken(this.auth,e));return ue(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Ax(this,e)}reload(){return Rx(this)}_assign(e){this!==e&&(ue(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new xn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){ue(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await ca(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(En(this.auth.app))return Promise.reject(ns(this.auth));const e=await this.getIdToken();return await ki(this,Ex(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var s,r,i,o,l,c,u,d;const p=(s=n.displayName)!==null&&s!==void 0?s:void 0,y=(r=n.email)!==null&&r!==void 0?r:void 0,E=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,x=(o=n.photoURL)!==null&&o!==void 0?o:void 0,P=(l=n.tenantId)!==null&&l!==void 0?l:void 0,V=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,X=(u=n.createdAt)!==null&&u!==void 0?u:void 0,Q=(d=n.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:Y,emailVerified:q,isAnonymous:K,providerData:B,stsTokenManager:S}=n;ue(Y&&S,e,"internal-error");const v=hr.fromJSON(this.name,S);ue(typeof Y=="string",e,"internal-error"),Bn(p,e.name),Bn(y,e.name),ue(typeof q=="boolean",e,"internal-error"),ue(typeof K=="boolean",e,"internal-error"),Bn(E,e.name),Bn(x,e.name),Bn(P,e.name),Bn(V,e.name),Bn(X,e.name),Bn(Q,e.name);const _=new xn({uid:Y,auth:e,email:y,emailVerified:q,displayName:p,isAnonymous:K,photoURL:x,phoneNumber:E,tenantId:P,stsTokenManager:v,createdAt:X,lastLoginAt:Q});return B&&Array.isArray(B)&&(_.providerData=B.map(T=>Object.assign({},T))),V&&(_._redirectEventId=V),_}static async _fromIdTokenResponse(e,n,s=!1){const r=new hr;r.updateFromServerResponse(n);const i=new xn({uid:n.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await ca(i),i}static async _fromGetAccountInfoResponse(e,n,s){const r=n.users[0];ue(r.localId!==void 0,"internal-error");const i=r.providerUserInfo!==void 0?y_(r.providerUserInfo):[],o=!(r.email&&r.passwordHash)&&!(i!=null&&i.length),l=new hr;l.updateFromIdToken(s);const c=new xn({uid:r.localId,auth:e,stsTokenManager:l,isAnonymous:o}),u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new Ac(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,u),c}}/**
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
 */const Nf=new Map;function Sn(t){Dn(t instanceof Function,"Expected a class definition");let e=Nf.get(t);return e?(Dn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Nf.set(t,e),e)}/**
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
 */class v_{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}v_.type="NONE";const Df=v_;/**
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
 */function ko(t,e,n){return`firebase:${t}:${e}:${n}`}class dr{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=ko(this.userKey,r.apiKey,i),this.fullPersistenceKey=ko("persistence",r.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?xn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new dr(Sn(Df),e,s);const r=(await Promise.all(n.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let i=r[0]||Sn(Df);const o=ko(s,e.config.apiKey,e.name);let l=null;for(const u of n)try{const d=await u._get(o);if(d){const p=xn._fromJSON(e,d);u!==i&&(l=p),i=u;break}}catch{}const c=r.filter(u=>u._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new dr(i,e,s):(i=c[0],l&&await i._set(o,l.toJSON()),await Promise.all(n.map(async u=>{if(u!==i)try{await u._remove(o)}catch{}})),new dr(i,e,s))}}/**
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
 */function Vf(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(I_(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(w_(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(A_(e))return"Blackberry";if(x_(e))return"Webos";if(b_(e))return"Safari";if((e.includes("chrome/")||T_(e))&&!e.includes("edge/"))return"Chrome";if(E_(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function w_(t=vt()){return/firefox\//i.test(t)}function b_(t=vt()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function T_(t=vt()){return/crios\//i.test(t)}function I_(t=vt()){return/iemobile/i.test(t)}function E_(t=vt()){return/android/i.test(t)}function A_(t=vt()){return/blackberry/i.test(t)}function x_(t=vt()){return/webos/i.test(t)}function Bu(t=vt()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Mx(t=vt()){var e;return Bu(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Nx(){return yw()&&document.documentMode===10}function S_(t=vt()){return Bu(t)||E_(t)||x_(t)||A_(t)||/windows phone/i.test(t)||I_(t)}/**
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
 */function R_(t,e=[]){let n;switch(t){case"Browser":n=Vf(vt());break;case"Worker":n=`${Vf(vt())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${br}/${s}`}/**
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
 */class Dx{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=i=>new Promise((o,l)=>{try{const c=e(i);o(c)}catch(c){l(c)}});s.onAbort=n,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const r of n)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
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
 */async function Vx(t,e={}){return Ar(t,"GET","/v2/passwordPolicy",Ya(t,e))}/**
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
 */const Ox=6;class Lx{constructor(e){var n,s,r,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:Ox,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(r=(s=e.allowedNonAlphanumericCharacters)===null||s===void 0?void 0:s.join(""))!==null&&r!==void 0?r:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,s,r,i,o,l;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(n=c.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),c.isValid&&(c.isValid=(s=c.meetsMaxPasswordLength)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(r=c.containsLowercaseLetter)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(i=c.containsUppercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(l=c.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),c}validatePasswordLengthOptions(e,n){const s=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=e.length>=s),r&&(n.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let r=0;r<e.length;r++)s=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,n,s,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class Fx{constructor(e,n,s,r){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Of(this),this.idTokenSubscription=new Of(this),this.beforeStateQueue=new Dx(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=h_,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Sn(n)),this._initializationPromise=this.queue(async()=>{var s,r;if(!this._deleted&&(this.persistenceManager=await dr.create(this,e),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((r=this.currentUser)===null||r===void 0?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await __(this,{idToken:e}),s=await xn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(En(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const s=await this.assertedPersistence.getCurrentUser();let r=s,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=r==null?void 0:r._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===l)&&(c!=null&&c.user)&&(r=c.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=s,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return ue(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await ca(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=wx()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(En(this.app))return Promise.reject(ns(this));const n=e?Ze(e):null;return n&&ue(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&ue(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return En(this.app)?Promise.reject(ns(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return En(this.app)?Promise.reject(ns(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Sn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Vx(this),n=new Lx(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Hs("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await kx(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Sn(e)||this._popupRedirectResolver;ue(n,this,"argument-error"),this.redirectPersistenceManager=await dr.create(this,[Sn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,s;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((s=this.redirectUser)===null||s===void 0?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const s=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==s&&(this.lastNotifiedUid=s,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,r){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(ue(l,this,"internal-error"),l.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,s,r);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return ue(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=R_(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const s=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());s&&(n["X-Firebase-Client"]=s);const r=await this._getAppCheckToken();return r&&(n["X-Firebase-AppCheck"]=r),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&_x(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function Xa(t){return Ze(t)}class Of{constructor(e){this.auth=e,this.observer=null,this.addObserver=Ew(n=>this.observer=n)}get next(){return ue(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let ju={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Ux(t){ju=t}function $x(t){return ju.loadJS(t)}function Bx(){return ju.gapiScript}function jx(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
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
 */function zx(t,e){const n=Ws(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if(Ti(i,e??{}))return r;Nn(r,"already-initialized")}return n.initialize({options:e})}function qx(t,e){const n=(e==null?void 0:e.persistence)||[],s=(Array.isArray(n)?n:[n]).map(Sn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function Hx(t,e,n){const s=Xa(t);ue(s._canInitEmulator,s,"emulator-config-failed"),ue(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!1,i=C_(e),{host:o,port:l}=Wx(e),c=l===null?"":`:${l}`;s.config.emulator={url:`${i}//${o}${c}/`},s.settings.appVerificationDisabledForTesting=!0,s.emulatorConfig=Object.freeze({host:o,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})}),Kx()}function C_(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Wx(t){const e=C_(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:Lf(s.substr(i.length+1))}}else{const[i,o]=s.split(":");return{host:i,port:Lf(o)}}}function Lf(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Kx(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class P_{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return An("not implemented")}_getIdTokenResponse(e){return An("not implemented")}_linkToIdToken(e,n){return An("not implemented")}_getReauthenticationResolver(e){return An("not implemented")}}/**
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
 */async function fr(t,e){return m_(t,"POST","/v1/accounts:signInWithIdp",Ya(t,e))}/**
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
 */const Gx="http://localhost";class zs extends P_{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new zs(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Nn("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r}=n,i=Lu(n,["providerId","signInMethod"]);if(!s||!r)return null;const o=new zs(s,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return fr(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,fr(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,fr(e,n)}buildRequest(){const e={requestUri:Gx,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Vi(n)}return e}}/**
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
 */class k_{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class qi extends k_{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class qn extends qi{constructor(){super("facebook.com")}static credential(e){return zs._fromParams({providerId:qn.PROVIDER_ID,signInMethod:qn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return qn.credentialFromTaggedObject(e)}static credentialFromError(e){return qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return qn.credential(e.oauthAccessToken)}catch{return null}}}qn.FACEBOOK_SIGN_IN_METHOD="facebook.com";qn.PROVIDER_ID="facebook.com";/**
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
 */class Hn extends qi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return zs._fromParams({providerId:Hn.PROVIDER_ID,signInMethod:Hn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Hn.credentialFromTaggedObject(e)}static credentialFromError(e){return Hn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return Hn.credential(n,s)}catch{return null}}}Hn.GOOGLE_SIGN_IN_METHOD="google.com";Hn.PROVIDER_ID="google.com";/**
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
 */class Wn extends qi{constructor(){super("github.com")}static credential(e){return zs._fromParams({providerId:Wn.PROVIDER_ID,signInMethod:Wn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Wn.credentialFromTaggedObject(e)}static credentialFromError(e){return Wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Wn.credential(e.oauthAccessToken)}catch{return null}}}Wn.GITHUB_SIGN_IN_METHOD="github.com";Wn.PROVIDER_ID="github.com";/**
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
 */class Kn extends qi{constructor(){super("twitter.com")}static credential(e,n){return zs._fromParams({providerId:Kn.PROVIDER_ID,signInMethod:Kn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Kn.credentialFromTaggedObject(e)}static credentialFromError(e){return Kn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return Kn.credential(n,s)}catch{return null}}}Kn.TWITTER_SIGN_IN_METHOD="twitter.com";Kn.PROVIDER_ID="twitter.com";/**
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
 */async function Qx(t,e){return m_(t,"POST","/v1/accounts:signUp",Ya(t,e))}/**
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
 */class us{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,r=!1){const i=await xn._fromIdTokenResponse(e,s,r),o=Ff(s);return new us({user:i,providerId:o,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const r=Ff(s);return new us({user:e,providerId:r,_tokenResponse:s,operationType:n})}}function Ff(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */async function Jx(t){var e;if(En(t.app))return Promise.reject(ns(t));const n=Xa(t);if(await n._initializationPromise,!((e=n.currentUser)===null||e===void 0)&&e.isAnonymous)return new us({user:n.currentUser,providerId:null,operationType:"signIn"});const s=await Qx(n,{returnSecureToken:!0}),r=await us._fromIdTokenResponse(n,"signIn",s,!0);return await n._updateCurrentUser(r.user),r}/**
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
 */class ua extends Yt{constructor(e,n,s,r){var i;super(n.code,n.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,ua.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,r){return new ua(e,n,s,r)}}function M_(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ua._fromErrorAndOperation(t,i,e,s):i})}async function Yx(t,e,n=!1){const s=await ki(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return us._forOperation(t,"link",s)}/**
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
 */async function Xx(t,e,n=!1){const{auth:s}=t;if(En(s.app))return Promise.reject(ns(s));const r="reauthenticate";try{const i=await ki(t,M_(s,r,e,t),n);ue(i.idToken,s,"internal-error");const o=$u(i.idToken);ue(o,s,"internal-error");const{sub:l}=o;return ue(t.uid===l,s,"user-mismatch"),us._forOperation(t,r,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Nn(s,"user-mismatch"),i}}/**
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
 */async function Zx(t,e,n=!1){if(En(t.app))return Promise.reject(ns(t));const s="signIn",r=await M_(t,s,e),i=await us._fromIdTokenResponse(t,s,r);return n||await t._updateCurrentUser(i.user),i}function e1(t,e,n,s){return Ze(t).onIdTokenChanged(e,n,s)}function t1(t,e,n){return Ze(t).beforeAuthStateChanged(e,n)}function n1(t,e,n,s){return Ze(t).onAuthStateChanged(e,n,s)}const ha="__sak";/**
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
 */class N_{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(ha,"1"),this.storage.removeItem(ha),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const s1=1e3,r1=10;class D_ extends N_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=S_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),r=this.localCache[n];s!==r&&e(n,r,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,c)=>{this.notifyListeners(o,c)});return}const s=e.key;n?this.detachListener():this.stopPolling();const r=()=>{const o=this.storage.getItem(s);!n&&this.localCache[s]===o||this.notifyListeners(s,o)},i=this.storage.getItem(s);Nx()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,r1):r()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},s1)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}D_.type="LOCAL";const i1=D_;/**
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
 */class V_ extends N_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}V_.type="SESSION";const O_=V_;/**
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
 */function o1(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class Za{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(r=>r.isListeningto(e));if(n)return n;const s=new Za(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:r,data:i}=n.data,o=this.handlersMap[r];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const l=Array.from(o).map(async u=>u(n.origin,i)),c=await o1(l);n.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Za.receivers=[];/**
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
 */function zu(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class a1{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise((l,c)=>{const u=zu("",20);r.port1.start();const d=setTimeout(()=>{c(new Error("unsupported_event"))},s);o={messageChannel:r,onMessage(p){const y=p;if(y.data.eventId===u)switch(y.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(y.data.response);break;default:clearTimeout(d),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:n},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function cn(){return window}function l1(t){cn().location.href=t}/**
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
 */function L_(){return typeof cn().WorkerGlobalScope<"u"&&typeof cn().importScripts=="function"}async function c1(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function u1(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function h1(){return L_()?self:null}/**
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
 */const F_="firebaseLocalStorageDb",d1=1,da="firebaseLocalStorage",U_="fbase_key";class Hi{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function el(t,e){return t.transaction([da],e?"readwrite":"readonly").objectStore(da)}function f1(){const t=indexedDB.deleteDatabase(F_);return new Hi(t).toPromise()}function xc(){const t=indexedDB.open(F_,d1);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(da,{keyPath:U_})}catch(r){n(r)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(da)?e(s):(s.close(),await f1(),e(await xc()))})})}async function Uf(t,e,n){const s=el(t,!0).put({[U_]:e,value:n});return new Hi(s).toPromise()}async function p1(t,e){const n=el(t,!1).get(e),s=await new Hi(n).toPromise();return s===void 0?null:s.value}function $f(t,e){const n=el(t,!0).delete(e);return new Hi(n).toPromise()}const m1=800,g1=3;class $_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await xc(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>g1)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return L_()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Za._getInstance(h1()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await c1(),!this.activeServiceWorker)return;this.sender=new a1(this.activeServiceWorker);const s=await this.sender._send("ping",{},800);s&&!((e=s[0])===null||e===void 0)&&e.fulfilled&&!((n=s[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||u1()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await xc();return await Uf(e,ha,"1"),await $f(e,ha),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>Uf(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>p1(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>$f(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=el(r,!1).getAll();return new Hi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(e.length!==0)for(const{fbase_key:r,value:i}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),m1)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}$_.type="LOCAL";const _1=$_;new zi(3e4,6e4);/**
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
 */function y1(t,e){return e?Sn(e):(ue(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class qu extends P_{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return fr(e,this._buildIdpRequest())}_linkToIdToken(e,n){return fr(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return fr(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function v1(t){return Zx(t.auth,new qu(t),t.bypassAuthState)}function w1(t){const{auth:e,user:n}=t;return ue(n,e,"internal-error"),Xx(n,new qu(t),t.bypassAuthState)}async function b1(t){const{auth:e,user:n}=t;return ue(n,e,"internal-error"),Yx(n,new qu(t),t.bypassAuthState)}/**
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
 */class B_{constructor(e,n,s,r,i=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:r,tenantId:i,error:o,type:l}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return v1;case"linkViaPopup":case"linkViaRedirect":return b1;case"reauthViaPopup":case"reauthViaRedirect":return w1;default:Nn(this.auth,"internal-error")}}resolve(e){Dn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Dn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const T1=new zi(2e3,1e4);class ar extends B_{constructor(e,n,s,r,i){super(e,n,r,i),this.provider=s,this.authWindow=null,this.pollId=null,ar.currentPopupAction&&ar.currentPopupAction.cancel(),ar.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return ue(e,this.auth,"internal-error"),e}async onExecution(){Dn(this.filter.length===1,"Popup operations only handle one event");const e=zu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(ln(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(ln(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ar.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,s;if(!((s=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||s===void 0)&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ln(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,T1.get())};e()}}ar.currentPopupAction=null;/**
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
 */const I1="pendingRedirect",Mo=new Map;class E1 extends B_{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=Mo.get(this.auth._key());if(!e){try{const s=await A1(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}Mo.set(this.auth._key(),e)}return this.bypassAuthState||Mo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function A1(t,e){const n=R1(e),s=S1(t);if(!await s._isAvailable())return!1;const r=await s._get(n)==="true";return await s._remove(n),r}function x1(t,e){Mo.set(t._key(),e)}function S1(t){return Sn(t._redirectPersistence)}function R1(t){return ko(I1,t.config.apiKey,t.name)}async function C1(t,e,n=!1){if(En(t.app))return Promise.reject(ns(t));const s=Xa(t),r=y1(s,e),o=await new E1(s,r,n).execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
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
 */const P1=10*60*1e3;class k1{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!M1(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var s;if(e.error&&!j_(e)){const r=((s=e.error.code)===null||s===void 0?void 0:s.split("auth/")[1])||"internal-error";n.onError(ln(this.auth,r))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=P1&&this.cachedEventUids.clear(),this.cachedEventUids.has(Bf(e))}saveEventToCache(e){this.cachedEventUids.add(Bf(e)),this.lastProcessedEventTime=Date.now()}}function Bf(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function j_({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function M1(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return j_(t);default:return!1}}/**
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
 */async function N1(t,e={}){return Ar(t,"GET","/v1/projects",e)}/**
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
 */const D1=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,V1=/^https?/;async function O1(t){if(t.config.emulator)return;const{authorizedDomains:e}=await N1(t);for(const n of e)try{if(L1(n))return}catch{}Nn(t,"unauthorized-domain")}function L1(t){const e=Ec(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===s}if(!V1.test(n))return!1;if(D1.test(t))return s===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
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
 */const F1=new zi(3e4,6e4);function jf(){const t=cn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function U1(t){return new Promise((e,n)=>{var s,r,i;function o(){jf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{jf(),n(ln(t,"network-request-failed"))},timeout:F1.get()})}if(!((r=(s=cn().gapi)===null||s===void 0?void 0:s.iframes)===null||r===void 0)&&r.Iframe)e(gapi.iframes.getContext());else if(!((i=cn().gapi)===null||i===void 0)&&i.load)o();else{const l=jx("iframefcb");return cn()[l]=()=>{gapi.load?o():n(ln(t,"network-request-failed"))},$x(`${Bx()}?onload=${l}`).catch(c=>n(c))}}).catch(e=>{throw No=null,e})}let No=null;function $1(t){return No=No||U1(t),No}/**
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
 */const B1=new zi(5e3,15e3),j1="__/auth/iframe",z1="emulator/auth/iframe",q1={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},H1=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function W1(t){const e=t.config;ue(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Uu(e,z1):`https://${t.config.authDomain}/${j1}`,s={apiKey:e.apiKey,appName:t.name,v:br},r=H1.get(t.config.apiHost);r&&(s.eid=r);const i=t._getFrameworks();return i.length&&(s.fw=i.join(",")),`${n}?${Vi(s).slice(1)}`}async function K1(t){const e=await $1(t),n=cn().gapi;return ue(n,t,"internal-error"),e.open({where:document.body,url:W1(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:q1,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const o=ln(t,"network-request-failed"),l=cn().setTimeout(()=>{i(o)},B1.get());function c(){cn().clearTimeout(l),r(s)}s.ping(c).then(c,()=>{i(o)})}))}/**
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
 */const G1={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Q1=500,J1=600,Y1="_blank",X1="http://localhost";class zf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Z1(t,e,n,s=Q1,r=J1){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let l="";const c=Object.assign(Object.assign({},G1),{width:s.toString(),height:r.toString(),top:i,left:o}),u=vt().toLowerCase();n&&(l=T_(u)?Y1:n),w_(u)&&(e=e||X1,c.scrollbars="yes");const d=Object.entries(c).reduce((y,[E,x])=>`${y}${E}=${x},`,"");if(Mx(u)&&l!=="_self")return eS(e||"",l),new zf(null);const p=window.open(e||"",l,d);ue(p,t,"popup-blocked");try{p.focus()}catch{}return new zf(p)}function eS(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
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
 */const tS="__/auth/handler",nS="emulator/auth/handler",sS=encodeURIComponent("fac");async function qf(t,e,n,s,r,i){ue(t.config.authDomain,t,"auth-domain-config-required"),ue(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:br,eventId:r};if(e instanceof k_){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Iw(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries({}))o[d]=p}if(e instanceof qi){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(o.scopes=d.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const d of Object.keys(l))l[d]===void 0&&delete l[d];const c=await t._getAppCheckToken(),u=c?`#${sS}=${encodeURIComponent(c)}`:"";return`${rS(t)}?${Vi(l).slice(1)}${u}`}function rS({config:t}){return t.emulator?Uu(t,nS):`https://${t.authDomain}/${tS}`}/**
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
 */const jl="webStorageSupport";class iS{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=O_,this._completeRedirectFn=C1,this._overrideRedirectResult=x1}async _openPopup(e,n,s,r){var i;Dn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await qf(e,n,s,Ec(),r);return Z1(e,o,zu())}async _openRedirect(e,n,s,r){await this._originValidation(e);const i=await qf(e,n,s,Ec(),r);return l1(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:r,promise:i}=this.eventManagers[n];return r?Promise.resolve(r):(Dn(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await K1(e),s=new k1(e);return n.register("authEvent",r=>(ue(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(jl,{type:jl},r=>{var i;const o=(i=r==null?void 0:r[0])===null||i===void 0?void 0:i[jl];o!==void 0&&n(!!o),Nn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=O1(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return S_()||b_()||Bu()}}const oS=iS;var Hf="@firebase/auth",Wf="1.7.9";/**
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
 */class aS{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){ue(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function lS(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function cS(t){hn(new Jt("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=s.options;ue(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const c={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:R_(t)},u=new Fx(s,r,i,c);return qx(u,n),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),hn(new Jt("auth-internal",e=>{const n=Xa(e.getProvider("auth").getImmediate());return(s=>new aS(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),jt(Hf,Wf,lS(t)),jt(Hf,Wf,"esm2017")}/**
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
 */const uS=5*60,hS=vm("authIdTokenMaxAge")||uS;let Kf=null;const dS=t=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>hS)return;const r=n==null?void 0:n.token;Kf!==r&&(Kf=r,await fetch(t,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function fS(t=Wc()){const e=Ws(t,"auth");if(e.isInitialized())return e.getImmediate();const n=zx(t,{popupRedirectResolver:oS,persistence:[_1,i1,O_]}),s=vm("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(s,location.origin);if(location.origin===i.origin){const o=dS(i.toString());t1(n,o,()=>o(n.currentUser)),e1(n,l=>o(l))}}const r=_m("auth");return r&&Hx(n,`http://${r}`),n}function pS(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}Ux({loadJS(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=r=>{const i=ln("internal-error");i.customData=r,n(i)},s.type="text/javascript",s.charset="UTF-8",pS().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});cS("Browser");const z_={apiKey:"AIzaSyDXuDcTNEEtdk-NmypL87DzSUiBUhh4eRM",authDomain:"market-booking-project.firebaseapp.com",projectId:"market-booking-project",storageBucket:"market-booking-project.firebasestorage.app",messagingSenderId:"678040117836",appId:"1:678040117836:web:9cf755116cf8953e838ae9",measurementId:"G-P0KPELC5H0"},Hu=Em(z_),Qn=QA(Hu),zl=fS(Hu);nI().then(t=>{t&&eI(Hu)}).catch(t=>console.log("Analytics notice:",t));const Gf=!0;console.log("🔥 Connected to Firebase project:",z_.projectId);function fa(t){return JSON.parse(JSON.stringify(t))}function mS(t){return zl?n1(zl,e=>{e?(console.log("Firebase Auth: Signed in as",e.uid),t&&t(e)):Jx(zl).catch(n=>{console.warn("Anonymous Auth notice:",n.message)})}):()=>{}}function gS(t,e){if(!Qn)return console.log("Firebase not configured. Real-time sync skipped (using Local Storage mode)."),()=>{};const n=Wa(Qn,"markets","main-layout");return ux(n,r=>{if(r.exists()){const i=r.data();console.log("⚡ Real-time update received from Firestore:",i),t&&t({name:i.name,zones:i.zones||[],stalls:i.stalls||[],updatedAt:i.updatedAt})}else console.log("No Firestore document found for markets/main-layout yet.")},r=>{console.warn("Firestore snapshot listener warning/notice:",r.message),e&&e(r)})}async function _S(t,e,n){if(!Qn)return console.log("Local Mode: Saved to localStorage"),{success:!0,mode:"local"};try{const s=Wa(Qn,"markets","main-layout"),r=fa(e),i=fa(n),o={name:t||"ตลาดยามเย็น Walking Street KKU",zones:r,stalls:i,updatedAt:new Date().toISOString()};return await lx(s,o,{merge:!0}),{success:!0,mode:"firestore"}}catch(s){return console.warn("Firestore Save Notice (falling back to LocalStorage):",s),{success:!1,mode:"local",error:s}}}async function yS(t,e,n,s,r){if(!Qn)return{success:!0,mode:"local"};const i=Wa(Qn,"markets","main-layout"),o=GA(Qn,"bookings");try{const l=fa(r),c=fa(n);await px(Qn,async u=>{const d=await u.get(i);let p=c;d.exists()&&(p=d.data().stalls||c);const y=p.findIndex(x=>x.id===t);if(y===-1)throw new Error("ไม่พบข้อมูลแผงค้านี้ในระบบ");const E=p[y];if(E.status==="booked")throw new Error(`แผงค้า ${E.stallNo} ถูกผู้อื่นจองไปก่อนหน้านี้แล้ว!`);if(E.status==="disabled")throw new Error(`แผงค้า ${E.stallNo} ปิดให้บริการ ไม่สามารถจองได้`);p[y]={...E,status:"booked",bookedBy:{name:e.name,phone:e.phone,goodsType:e.goodsType,bookedAt:new Date().toISOString()}},u.set(i,{name:s,zones:l,stalls:p,updatedAt:new Date().toISOString()},{merge:!0})});try{await cx(o,{stallId:t,customerName:e.name,customerPhone:e.phone,goodsType:e.goodsType,createdAt:mx(),status:"confirmed"})}catch(u){console.warn("Booking log notice:",u.message)}return{success:!0,mode:"firestore"}}catch(l){throw console.error("Transaction Notice:",l.message),l}}const ds=sw("market",{state:()=>({activeMode:"admin",marketName:localStorage.getItem("market_name")||"ตลาดยามเย็น Walking Street KKU",marketWidthMeters:Number(localStorage.getItem("market_width_m"))||30,marketHeightMeters:Number(localStorage.getItem("market_height_m"))||20,scalePxPerMeter:40,gridSnapMeters:Number(localStorage.getItem("market_grid_snap_m"))||.5,snapToGrid:!0,zoomLevel:1,panOffset:{x:0,y:0},zones:JSON.parse(localStorage.getItem("market_zones"))||Ed,stalls:JSON.parse(localStorage.getItem("market_stalls"))||Ad,selectedStallId:null,filterZoneId:"all",filterStatus:"all",searchQuery:"",isSaving:!1,isLoading:!1,isRealtimeConnected:!1,lastSavedTime:null,notification:null,unsubscribeRealtime:null,currentUser:null}),getters:{selectedStall:t=>t.stalls.find(e=>e.id===t.selectedStallId),getZoneById:t=>e=>t.zones.find(n=>n.id===e)||{name:"ไม่ระบุ",color:"#94a3b8"},canvasWidthPx:t=>Math.round(t.marketWidthMeters*t.scalePxPerMeter),canvasHeightPx:t=>Math.round(t.marketHeightMeters*t.scalePxPerMeter),gridSizePx:t=>Math.round(t.gridSnapMeters*t.scalePxPerMeter),totalMarketAreaSqM:t=>t.marketWidthMeters*t.marketHeightMeters,filteredStalls:t=>t.stalls.filter(e=>{const n=t.filterZoneId==="all"||e.zoneId===t.filterZoneId,s=t.filterStatus==="all"||e.status===t.filterStatus,r=!t.searchQuery||e.stallNo.toLowerCase().includes(t.searchQuery.toLowerCase())||e.notes&&e.notes.toLowerCase().includes(t.searchQuery.toLowerCase());return n&&s&&r}),stats:t=>{const e=t.stalls.length,n=t.stalls.filter(o=>o.status==="available").length,s=t.stalls.filter(o=>o.status==="booked").length,r=t.stalls.filter(o=>o.status==="disabled").length,i=t.stalls.filter(o=>o.status==="booked").reduce((o,l)=>o+(l.price||0),0);return{total:e,available:n,booked:s,disabled:r,totalRevenue:i}}},actions:{pxToM(t){return Math.round(t/this.scalePxPerMeter*10)/10},mToPx(t){return Math.round(t*this.scalePxPerMeter)},getStallMetrics(t){if(!t)return{widthM:0,heightM:0,xM:0,yM:0,areaSqM:0};const e=this.pxToM(t.width),n=this.pxToM(t.height),s=this.pxToM(t.x),r=this.pxToM(t.y),i=Math.round(e*n*10)/10;return{widthM:e,heightM:n,xM:s,yM:r,areaSqM:i}},initFirebaseSync(){mS(t=>{this.currentUser=t}),this.unsubscribeRealtime||(this.unsubscribeRealtime=gS(t=>{t.stalls&&t.stalls.length>0&&(this.stalls=t.stalls),t.zones&&t.zones.length>0&&(this.zones=t.zones),t.name&&(this.marketName=t.name),t.marketWidthMeters&&(this.marketWidthMeters=t.marketWidthMeters),t.marketHeightMeters&&(this.marketHeightMeters=t.marketHeightMeters),t.gridSnapMeters&&(this.gridSnapMeters=t.gridSnapMeters),this.isRealtimeConnected=!0,this.lastSavedTime=new Date().toLocaleTimeString("th-TH"),this.persistToLocal()},t=>{this.isRealtimeConnected=!1}))},setMode(t){this.activeMode=t},showNotification(t,e="info"){this.notification={msg:t,type:e},setTimeout(()=>{var n;((n=this.notification)==null?void 0:n.msg)===t&&(this.notification=null)},3500)},persistToLocal(){try{localStorage.setItem("market_stalls",JSON.stringify(this.stalls)),localStorage.setItem("market_zones",JSON.stringify(this.zones)),localStorage.setItem("market_name",this.marketName),localStorage.setItem("market_width_m",String(this.marketWidthMeters)),localStorage.setItem("market_height_m",String(this.marketHeightMeters)),localStorage.setItem("market_grid_snap_m",String(this.gridSnapMeters))}catch(t){console.warn("LocalStorage save error:",t)}},updateMarketDimensions({name:t,widthMeters:e,heightMeters:n,gridSnapMeters:s}){t&&(this.marketName=t),e&&e>0&&(this.marketWidthMeters=Number(e)),n&&n>0&&(this.marketHeightMeters=Number(n)),s&&s>0&&(this.gridSnapMeters=Number(s)),this.persistToLocal(),this.saveLayoutToFirestore(),this.showNotification(`ปรับขนาดตลาดเป็น ${this.marketWidthMeters} x ${this.marketHeightMeters} เมตร (${this.totalMarketAreaSqM} ตร.ม.)`,"success")},selectStall(t){this.selectedStallId=t},addStall(t={}){var u;const e=this.stalls.length+1,n=((u=this.zones[0])==null?void 0:u.id)||"zone-food",s=this.getZoneById(n),r=this.mToPx(t.widthM||2.5),i=this.mToPx(t.heightM||2),o=e*40%(this.canvasWidthPx-120)+40,l=Math.floor(e*40/(this.canvasWidthPx-120))*120+40,c={id:`stall-${Date.now().toString(36)}`,stallNo:t.stallNo||`S-${String(e).padStart(2,"0")}`,zoneId:t.zoneId||n,x:t.x??o,y:t.y??l,width:r,height:i,price:t.price||s.pricePerDay||400,status:t.status||"available",bookedBy:null,notes:t.notes||""};return this.stalls.push(c),this.selectedStallId=c.id,this.persistToLocal(),this.saveLayoutToFirestore(),this.showNotification(`เพิ่มแผงค้า ${c.stallNo} สำเร็จ (ขนาด ${this.pxToM(r)} x ${this.pxToM(i)} ม.)`,"success"),c},updateStall(t,e){const n=this.stalls.findIndex(s=>s.id===t);n!==-1&&(e.widthM!==void 0&&(e.width=this.mToPx(e.widthM)),e.heightM!==void 0&&(e.height=this.mToPx(e.heightM)),e.xM!==void 0&&(e.x=this.mToPx(e.xM)),e.yM!==void 0&&(e.y=this.mToPx(e.yM)),delete e.widthM,delete e.heightM,delete e.xM,delete e.yM,this.stalls[n]={...this.stalls[n],...e},this.persistToLocal(),this.saveLayoutToFirestore())},updateStallPosition(t,e,n){const s=this.stalls.find(r=>r.id===t);if(s){const r=this.gridSizePx;this.snapToGrid&&r>0?(s.x=Math.max(0,Math.round(e/r)*r),s.y=Math.max(0,Math.round(n/r)*r)):(s.x=Math.max(0,Math.round(e)),s.y=Math.max(0,Math.round(n))),this.persistToLocal()}},updateStallSize(t,e,n){const s=this.stalls.find(r=>r.id===t);if(s){const r=this.gridSizePx,i=this.mToPx(1);this.snapToGrid&&r>0?(s.width=Math.max(i,Math.round(e/r)*r),s.height=Math.max(i,Math.round(n/r)*r)):(s.width=Math.max(i,Math.round(e)),s.height=Math.max(i,Math.round(n))),this.persistToLocal()}},removeStall(t){const e=this.stalls.findIndex(n=>n.id===t);if(e!==-1){const n=this.stalls.splice(e,1)[0];this.selectedStallId===t&&(this.selectedStallId=null),this.persistToLocal(),this.saveLayoutToFirestore(),this.showNotification(`ลบแผงค้า ${n.stallNo} เรียบร้อยแล้ว`,"info")}},addZone(t){const e={id:`zone-${Date.now().toString(36)}`,name:t.name||"โซนใหม่",color:t.color||"#3b82f6",pricePerDay:t.pricePerDay||400};this.zones.push(e),this.persistToLocal(),this.saveLayoutToFirestore(),this.showNotification(`เพิ่ม ${e.name} เรียบร้อยแล้ว`,"success")},updateZone(t,e){const n=this.zones.findIndex(s=>s.id===t);n!==-1&&(this.zones[n]={...this.zones[n],...e},this.persistToLocal(),this.saveLayoutToFirestore())},removeZone(t){if(this.zones.length<=1){this.showNotification("ต้องมีอย่างน้อย 1 โซนในระบบ","warning");return}this.zones=this.zones.filter(e=>e.id!==t),this.persistToLocal(),this.saveLayoutToFirestore(),this.showNotification("ลบโซนสำเร็จ","info")},async bookStall(t,e){const n=this.stalls.find(s=>s.id===t);if(!n)return!1;if(n.status==="booked")return this.showNotification(`แผงค้า ${n.stallNo} ถูกจองไปแล้ว!`,"error"),!1;try{const s=await yS(t,e,this.stalls,this.marketName,this.zones);return n.status="booked",n.bookedBy={name:e.name,phone:e.phone,goodsType:e.goodsType,bookedAt:new Date().toISOString()},this.persistToLocal(),s.mode==="firestore"?this.showNotification(`จองแผงค้า ${n.stallNo} สำเร็จแล้ว! (บันทึก Firestore)`,"success"):this.showNotification(`จองแผงค้า ${n.stallNo} สำเร็จ! (โหมด Local)`,"success"),!0}catch(s){return console.error("Booking Error:",s),this.showNotification(s.message||"เกิดข้อผิดพลาดในการจองแผงค้า","error"),!1}},cancelBooking(t){const e=this.stalls.find(n=>n.id===t);e&&(e.status="available",e.bookedBy=null,this.persistToLocal(),this.saveLayoutToFirestore(),this.showNotification(`ยกเลิกการจองแผง ${e.stallNo} แล้ว`,"info"))},async saveLayoutToFirestore(){var t;this.isSaving=!0,this.persistToLocal();try{const e=await _S(this.marketName,this.zones,this.stalls,{marketWidthMeters:this.marketWidthMeters,marketHeightMeters:this.marketHeightMeters,gridSnapMeters:this.gridSnapMeters});e.success&&e.mode==="firestore"?this.showNotification("บันทึกผังตลาดลง Firebase Firestore สำเร็จ!","success"):((t=e.error)==null?void 0:t.code)==="permission-denied"?this.showNotification("บันทึกในเครื่องสำเร็จ (กรุณาเปิดสิทธิ์ Rules บน Firebase Console)","warning"):this.showNotification("บันทึกผังตลาดเรียบร้อยแล้ว","success"),this.lastSavedTime=new Date().toLocaleTimeString("th-TH")}catch(e){console.warn("Save Layout notice:",e),this.showNotification("บันทึกข้อมูลเรียบร้อยแล้ว (โหมด Local Storage)","success")}finally{this.isSaving=!1}},resetToDefaults(){this.stalls=JSON.parse(JSON.stringify(Ad)),this.zones=JSON.parse(JSON.stringify(Ed)),this.marketWidthMeters=30,this.marketHeightMeters=20,this.gridSnapMeters=.5,this.selectedStallId=null,this.persistToLocal(),this.saveLayoutToFirestore(),this.showNotification("คืนค่าเริ่มต้นผังตลาดเรียบร้อยแล้ว","info")}}});/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vS=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var bo={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wS=({size:t,strokeWidth:e=2,absoluteStrokeWidth:n,color:s,iconNode:r,name:i,class:o,...l},{slots:c})=>Ho("svg",{...bo,width:t||bo.width,height:t||bo.height,stroke:s||bo.stroke,"stroke-width":n?Number(e)*24/Number(t):e,class:["lucide",`lucide-${vS(i??"icon")}`],...l},[...r.map(u=>Ho(...u)),...c.default?[c.default()]:[]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qe=(t,e)=>(n,{slots:s})=>Ho(wS,{...n,iconNode:e,name:t},s);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q_=qe("CheckIcon",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bS=qe("ChevronRightIcon",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TS=qe("CircleCheckBigIcon",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IS=qe("FlameIcon",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ES=qe("Grid3x3Icon",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"M15 3v18",key:"14nvp0"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AS=qe("LayoutGridIcon",[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tl=qe("Maximize2Icon",[["polyline",{points:"15 3 21 3 21 9",key:"mznyad"}],["polyline",{points:"9 21 3 21 3 15",key:"1avn1i"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10",key:"ota7mn"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H_=qe("PaletteIcon",[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W_=qe("PlusIcon",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xS=qe("SaveIcon",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const SS=qe("SearchIcon",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RS=qe("SettingsIcon",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CS=qe("ShieldCheckIcon",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wu=qe("ShoppingBagIcon",[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",key:"hou9p0"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PS=qe("SlidersVerticalIcon",[["line",{x1:"4",x2:"4",y1:"21",y2:"14",key:"1p332r"}],["line",{x1:"4",x2:"4",y1:"10",y2:"3",key:"gb41h5"}],["line",{x1:"12",x2:"12",y1:"21",y2:"12",key:"hf2csr"}],["line",{x1:"12",x2:"12",y1:"8",y2:"3",key:"1kfi7u"}],["line",{x1:"20",x2:"20",y1:"21",y2:"16",key:"1lhrwl"}],["line",{x1:"20",x2:"20",y1:"12",y2:"3",key:"16vvfq"}],["line",{x1:"2",x2:"6",y1:"14",y2:"14",key:"1uebub"}],["line",{x1:"10",x2:"14",y1:"8",y2:"8",key:"1yglbp"}],["line",{x1:"18",x2:"22",y1:"16",y2:"16",key:"1jxqpz"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ku=qe("Trash2Icon",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kS=qe("UserIcon",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MS=qe("WrenchIcon",[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",key:"cbrjhi"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wi=qe("XIcon",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const NS=qe("ZoomInIcon",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DS=qe("ZoomOutIcon",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]),VS={class:"bg-slate-800 border-b border-slate-700 sticky top-0 z-30 shadow-lg"},OS={class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"},LS={class:"flex items-center justify-between h-16"},FS={class:"flex items-center space-x-3"},US={class:"w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-md shadow-sky-500/20"},$S={class:"text-lg font-bold text-white leading-tight flex items-center gap-2"},BS={class:"text-xs text-slate-400 hidden sm:block"},jS={class:"text-sky-300 font-mono"},zS={class:"flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-700/80"},qS={class:"flex items-center space-x-2"},HS=["disabled"],WS={class:"hidden sm:inline"},KS={class:"bg-slate-900/90 border-t border-slate-800 px-4 py-2 text-xs"},GS={class:"max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2"},QS={class:"flex items-center gap-4 text-slate-400"},JS={class:"flex items-center gap-1.5"},YS={class:"text-white"},XS={class:"flex items-center gap-1.5"},ZS={class:"text-emerald-400"},eR={class:"flex items-center gap-1.5"},tR={class:"text-amber-400"},nR={class:"flex items-center gap-1.5 hidden md:flex"},sR={class:"text-rose-400"},rR={class:"flex items-center gap-3"},iR={key:0,class:"text-slate-500 hidden sm:block"},oR={__name:"Navbar",emits:["open-zone-manager","open-firebase-config","open-market-settings"],setup(t){const e=ds();return(n,s)=>(me(),be("header",VS,[m("div",OS,[m("div",LS,[m("div",FS,[m("div",US,[ne(k(AS),{class:"w-6 h-6 text-white"})]),m("div",null,[m("h1",$S,[Ne(G(k(e).marketName)+" ",1),m("span",{class:tt(["px-2 py-0.5 text-xs font-medium rounded-full",k(Gf)?"bg-emerald-500/20 text-emerald-400 border border-emerald-500/30":"bg-amber-500/20 text-amber-400 border border-amber-500/30"])},G(k(Gf)?"🔥 Firebase Online":"⚡ Local PoC Mode"),3)]),m("p",BS,[s[8]||(s[8]=Ne(" ขนาดตลาดรวม: ",-1)),m("strong",jS,G(k(e).marketWidthMeters)+" x "+G(k(e).marketHeightMeters)+" เมตร",1),Ne(" ("+G(k(e).totalMarketAreaSqM)+" ตร.ม.) ",1)])])]),m("div",zS,[m("button",{onClick:s[0]||(s[0]=r=>k(e).setMode("admin")),class:tt(["px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5",k(e).activeMode==="admin"?"bg-sky-500 text-white shadow-md shadow-sky-500/30":"text-slate-400 hover:text-slate-200"])},[ne(k(MS),{class:"w-4 h-4"}),s[9]||(s[9]=m("span",null,"Admin Builder",-1))],2),m("button",{onClick:s[1]||(s[1]=r=>k(e).setMode("customer")),class:tt(["px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5",k(e).activeMode==="customer"?"bg-emerald-500 text-white shadow-md shadow-emerald-500/30":"text-slate-400 hover:text-slate-200"])},[ne(k(Wu),{class:"w-4 h-4"}),s[10]||(s[10]=m("span",null,"Customer View",-1))],2)]),m("div",qS,[k(e).activeMode==="admin"?(me(),be(_t,{key:0},[m("button",{onClick:s[2]||(s[2]=r=>n.$emit("open-market-settings")),class:"hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/80 hover:bg-slate-700 text-sky-300 text-xs font-medium rounded-lg border border-slate-600 transition",title:"ตั้งค่าความกว้าง x ความยาวตลาดรวม"},[ne(k(tl),{class:"w-4 h-4 text-sky-400"}),m("span",null,"ขนาดตลาด "+G(k(e).marketWidthMeters)+"x"+G(k(e).marketHeightMeters)+"ม.",1)]),m("button",{onClick:s[3]||(s[3]=r=>n.$emit("open-zone-manager")),class:"hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/70 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-600 transition",title:"จัดการโซนสินค้าและราคา"},[ne(k(H_),{class:"w-4 h-4 text-purple-400"}),s[11]||(s[11]=m("span",null,"จัดการโซน",-1))]),m("button",{onClick:s[4]||(s[4]=r=>k(e).addStall()),class:"flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium rounded-lg shadow-md shadow-sky-600/20 transition"},[ne(k(W_),{class:"w-4 h-4"}),s[12]||(s[12]=m("span",{class:"hidden sm:inline"},"เพิ่มแผงค้า",-1))]),m("button",{onClick:s[5]||(s[5]=r=>k(e).saveLayoutToFirestore()),disabled:k(e).isSaving,class:"flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium rounded-lg shadow-md shadow-emerald-600/20 transition disabled:opacity-50"},[ne(k(xS),{class:"w-4 h-4"}),m("span",WS,G(k(e).isSaving?"กำลังบันทึก...":"บันทึกผัง"),1)],8,HS)],64)):yt("",!0),m("button",{onClick:s[6]||(s[6]=r=>n.$emit("open-firebase-config")),class:"p-1.5 bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-600 transition",title:"ตั้งค่า Firebase Config"},[ne(k(RS),{class:"w-4 h-4"})])])])]),m("div",KS,[m("div",GS,[m("div",QS,[m("div",JS,[s[15]||(s[15]=m("span",{class:"w-2 h-2 rounded-full bg-slate-400"},null,-1)),m("span",null,[s[13]||(s[13]=Ne("ทั้งหมด: ",-1)),m("strong",YS,G(k(e).stats.total),1),s[14]||(s[14]=Ne(" แผง",-1))])]),m("div",XS,[s[17]||(s[17]=m("span",{class:"w-2 h-2 rounded-full bg-emerald-500"},null,-1)),m("span",null,[s[16]||(s[16]=Ne("ว่าง: ",-1)),m("strong",ZS,G(k(e).stats.available),1)])]),m("div",eR,[s[19]||(s[19]=m("span",{class:"w-2 h-2 rounded-full bg-amber-500"},null,-1)),m("span",null,[s[18]||(s[18]=Ne("จองแล้ว: ",-1)),m("strong",tR,G(k(e).stats.booked),1)])]),m("div",nR,[s[21]||(s[21]=m("span",{class:"w-2 h-2 rounded-full bg-rose-500"},null,-1)),m("span",null,[s[20]||(s[20]=Ne("ปิดใช้งาน: ",-1)),m("strong",sR,G(k(e).stats.disabled),1)])])]),m("div",rR,[k(e).lastSavedTime?(me(),be("div",iR," บันทึกล่าสุด: "+G(k(e).lastSavedTime),1)):yt("",!0),k(e).activeMode==="admin"?(me(),be("button",{key:1,onClick:s[7]||(s[7]=r=>k(e).resetToDefaults()),class:"text-slate-400 hover:text-rose-400 underline transition"}," รีเซ็ตผังเริ่มต้น ")):yt("",!0)])])])]))}},aR={class:"relative w-full h-[calc(100vh-120px)] overflow-hidden bg-slate-950 flex flex-col select-none"},lR={class:"absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-800/90 backdrop-blur border border-slate-700 p-1.5 rounded-xl shadow-xl"},cR={class:"text-xs font-mono text-slate-300 w-12 text-center"},uR={class:"text-xs text-slate-300 font-mono hidden sm:flex items-center gap-1.5 px-2"},hR={class:"flex items-start justify-between text-xs font-bold text-slate-500 tracking-wider"},dR={class:"flex items-center gap-1 text-sky-400"},fR={class:"flex items-center justify-between text-[11px] font-mono text-slate-600 border-t border-slate-800 pt-2"},pR=["onMousedown","onClick"],mR={class:"flex items-center justify-between text-white font-semibold"},gR={class:"text-sm tracking-wide font-mono drop-shadow"},_R={class:"text-[10px] px-1.5 py-0.5 rounded bg-black/50 font-mono text-sky-300 font-normal"},yR={class:"flex items-center justify-between mt-auto"},vR={class:"text-[11px] font-mono text-slate-200"},wR=["onMousedown"],bR={key:0,class:"absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-slate-800/95 backdrop-blur border border-slate-700 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-4 text-xs"},TR={class:"flex items-center gap-2"},IR={class:"font-bold text-white text-sm"},ER={class:"text-slate-400"},AR={class:"flex items-center gap-3 font-mono text-slate-200"},xR={class:"text-sky-300"},SR={class:"text-sky-300"},RR={class:"text-emerald-400"},CR={class:"text-slate-500 hidden md:inline"},PR={class:"flex items-center gap-1.5"},kR={__name:"StallCanvas",emits:["open-editor"],setup(t){const e=ds(),n=je(null),s=je(!1),r=je(!1),i=je(!1),o=je(null),l=je({x:0,y:0}),c=je({x:0,y:0,w:0,h:0}),u=je({x:0,y:0}),d=os(()=>e.getStallMetrics(e.selectedStall));function p(K){const B=e.getZoneById(K.zoneId);return`${(B==null?void 0:B.color)||"#3b82f6"}22`}function y(K){switch(K){case"available":return"ว่าง";case"booked":return"จองแล้ว";case"disabled":return"ปิดบริการ";default:return K}}function E(){e.zoomLevel=Math.min(2,e.zoomLevel+.15)}function x(){e.zoomLevel=Math.max(.4,e.zoomLevel-.15)}function P(){e.zoomLevel=1,e.panOffset={x:0,y:0}}function V(K,B){K.button===0&&(s.value=!0,o.value=B,l.value={x:K.clientX,y:K.clientY},c.value={x:B.x,y:B.y,w:B.width,h:B.height})}function X(K,B){K.button===0&&(r.value=!0,o.value=B,l.value={x:K.clientX,y:K.clientY},c.value={x:B.x,y:B.y,w:B.width,h:B.height})}function Q(K){(K.target===n.value||K.target.classList.contains("bg-grid-pattern"))&&(e.selectedStallId=null,i.value=!0,u.value={x:K.clientX-e.panOffset.x,y:K.clientY-e.panOffset.y})}function Y(K){if(s.value&&o.value){const B=(K.clientX-l.value.x)/e.zoomLevel,S=(K.clientY-l.value.y)/e.zoomLevel,v=c.value.x+B,_=c.value.y+S;e.updateStallPosition(o.value.id,v,_)}else if(r.value&&o.value){const B=(K.clientX-l.value.x)/e.zoomLevel,S=(K.clientY-l.value.y)/e.zoomLevel,v=c.value.w+B,_=c.value.h+S;e.updateStallSize(o.value.id,v,_)}else i.value&&(e.panOffset={x:K.clientX-u.value.x,y:K.clientY-u.value.y})}function q(){(s.value||r.value)&&e.saveLayoutToFirestore(),s.value=!1,r.value=!1,i.value=!1,o.value=null}return(K,B)=>{var S,v;return me(),be("div",aR,[m("div",lR,[m("button",{onClick:x,class:"p-1.5 hover:bg-slate-700 text-slate-300 rounded-lg transition",title:"Zoom Out (-)"},[ne(k(DS),{class:"w-4 h-4"})]),m("span",cR,G(Math.round(k(e).zoomLevel*100))+"%",1),m("button",{onClick:E,class:"p-1.5 hover:bg-slate-700 text-slate-300 rounded-lg transition",title:"Zoom In (+)"},[ne(k(NS),{class:"w-4 h-4"})]),m("button",{onClick:P,class:"px-2 py-1 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition",title:"Reset Zoom"}," Reset "),B[4]||(B[4]=m("div",{class:"w-px h-5 bg-slate-700 my-auto mx-1"},null,-1)),m("button",{onClick:B[0]||(B[0]=_=>k(e).snapToGrid=!k(e).snapToGrid),class:tt(["px-2.5 py-1 text-xs rounded-lg border transition flex items-center gap-1.5",k(e).snapToGrid?"bg-sky-500/20 text-sky-400 border-sky-500/40 font-medium":"bg-slate-700/50 text-slate-400 border-slate-600"])},[ne(k(ES),{class:"w-3.5 h-3.5"}),m("span",null,"Snap "+G(k(e).gridSnapMeters)+" ม. ("+G(k(e).snapToGrid?"ON":"OFF")+")",1)],2),B[5]||(B[5]=m("div",{class:"w-px h-5 bg-slate-700 my-auto mx-1 hidden sm:block"},null,-1)),m("div",uR,[ne(k(tl),{class:"w-3.5 h-3.5 text-sky-400"}),m("span",null,[B[3]||(B[3]=Ne("ขนาดผังตลาด: ",-1)),m("strong",null,G(k(e).marketWidthMeters)+" x "+G(k(e).marketHeightMeters)+" เมตร",1),Ne(" ("+G(k(e).totalMarketAreaSqM)+" ตร.ม.)",1)])])]),m("div",{ref_key:"canvasContainer",ref:n,class:"w-full h-full relative cursor-grab active:cursor-grabbing overflow-auto bg-slate-950 bg-grid-pattern",onMousedown:Q,onMousemove:Y,onMouseup:q,onMouseleave:q},[m("div",{class:"absolute origin-top-left transition-transform duration-75",style:Tt({transform:`scale(${k(e).zoomLevel}) translate(${k(e).panOffset.x}px, ${k(e).panOffset.y}px)`,width:`${k(e).canvasWidthPx+100}px`,height:`${k(e).canvasHeightPx+100}px`})},[m("div",{class:"absolute border-2 border-dashed border-slate-700/80 rounded-3xl pointer-events-none flex flex-col justify-between p-4",style:Tt({left:"20px",top:"20px",width:`${k(e).canvasWidthPx}px`,height:`${k(e).canvasHeightPx}px`})},[m("div",hR,[m("span",dR," 📏 ผังตลาดรวม: "+G(k(e).marketWidthMeters)+" x "+G(k(e).marketHeightMeters)+" เมตร ("+G(k(e).totalMarketAreaSqM)+" ตร.ม.) ",1),B[6]||(B[6]=m("span",{class:"text-slate-400"},"🚪 ทางเข้า - ออก หลัก (Main Entrance)",-1))]),m("div",fR,[B[7]||(B[7]=m("span",null,"0.0 เมตร",-1)),m("span",null,"กว้าง "+G(k(e).marketWidthMeters/2)+" เมตร",1),m("span",null,"กว้าง "+G(k(e).marketWidthMeters)+" เมตร",1)])],4),(me(!0),be(_t,null,_i(k(e).stalls,_=>{var T;return me(),be("div",{key:_.id,class:tt(["absolute rounded-xl border-2 transition-all shadow-lg cursor-move flex flex-col justify-between p-2 group",[k(e).selectedStallId===_.id?"ring-4 ring-sky-400/80 border-sky-300 z-20 shadow-2xl scale-[1.01]":"border-slate-700 hover:border-slate-500 z-10",_.status==="booked"?"opacity-90":"",_.status==="disabled"?"bg-slate-900/90 border-slate-800":""]]),style:Tt({left:`${_.x+20}px`,top:`${_.y+20}px`,width:`${_.width}px`,height:`${_.height}px`,backgroundColor:p(_)}),onMousedown:ri(A=>V(A,_),["stop"]),onClick:ri(A=>k(e).selectStall(_.id),["stop"])},[m("div",{class:"h-1.5 w-full rounded-full mb-1",style:Tt({backgroundColor:((T=k(e).getZoneById(_.zoneId))==null?void 0:T.color)||"#94a3b8"})},null,4),m("div",mR,[m("span",gR,G(_.stallNo),1),m("span",_R,G(k(e).pxToM(_.width))+"x"+G(k(e).pxToM(_.height))+"ม. ",1)]),m("div",yR,[m("span",{class:tt(["text-[10px] px-1.5 py-0.5 rounded-full font-medium",{"bg-emerald-500/30 text-emerald-300 border border-emerald-500/40":_.status==="available","bg-amber-500/30 text-amber-300 border border-amber-500/40":_.status==="booked","bg-rose-500/30 text-rose-300 border border-rose-500/40":_.status==="disabled"}])},G(y(_.status)),3),m("span",vR," ฿"+G(_.price),1)]),m("div",{class:tt(["absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-center justify-center opacity-0 group-hover:opacity-100 transition",k(e).selectedStallId===_.id?"opacity-100":""]),onMousedown:ri(A=>X(A,_),["stop"])},[...B[8]||(B[8]=[m("div",{class:"w-2.5 h-2.5 border-r-2 border-b-2 border-white rounded-br"},null,-1)])],42,wR)],46,pR)}),128))],4)],544),k(e).selectedStall?(me(),be("div",bR,[m("div",TR,[m("span",{class:"w-3 h-3 rounded-full",style:Tt({backgroundColor:(S=k(e).getZoneById(k(e).selectedStall.zoneId))==null?void 0:S.color})},null,4),m("span",IR,"แผง "+G(k(e).selectedStall.stallNo),1),m("span",ER,"("+G((v=k(e).getZoneById(k(e).selectedStall.zoneId))==null?void 0:v.name)+")",1)]),B[12]||(B[12]=m("div",{class:"h-4 w-px bg-slate-700"},null,-1)),m("div",AR,[m("span",null,[B[9]||(B[9]=Ne("กว้าง: ",-1)),m("strong",xR,G(d.value.widthM)+" ม.",1)]),m("span",null,[B[10]||(B[10]=Ne("ยาว: ",-1)),m("strong",SR,G(d.value.heightM)+" ม.",1)]),m("span",null,[B[11]||(B[11]=Ne("พื้นที่: ",-1)),m("strong",RR,G(d.value.areaSqM)+" ตร.ม.",1)]),m("span",CR,"(พิกัด X: "+G(d.value.xM)+"ม., Y: "+G(d.value.yM)+"ม.)",1)]),B[13]||(B[13]=m("div",{class:"h-4 w-px bg-slate-700"},null,-1)),m("div",PR,[m("button",{onClick:B[1]||(B[1]=_=>K.$emit("open-editor")),class:"px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-lg transition"}," แก้ไขรายละเอียด "),m("button",{onClick:B[2]||(B[2]=_=>k(e).removeStall(k(e).selectedStall.id)),class:"px-2 py-1 bg-rose-600/80 hover:bg-rose-600 text-white rounded-lg transition",title:"ลบแผงค้านี้"},[ne(k(Ku),{class:"w-3.5 h-3.5"})])])])):yt("",!0)])}}},MR={key:0,class:"fixed inset-y-0 right-0 z-40 w-full max-w-md bg-slate-800 border-l border-slate-700 shadow-2xl flex flex-col transition-transform"},NR={class:"px-6 py-4 border-b border-slate-700 flex items-center justify-between bg-slate-900/50"},DR={class:"flex items-center gap-2"},VR={class:"text-base font-bold text-white"},OR={class:"p-6 space-y-5 overflow-y-auto flex-1 text-xs sm:text-sm"},LR={class:"grid grid-cols-2 gap-4"},FR=["value"],UR={class:"grid grid-cols-2 gap-4"},$R={class:"bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 space-y-3"},BR={class:"flex items-center justify-between"},jR={class:"text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5"},zR={class:"text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20"},qR={class:"grid grid-cols-2 gap-3"},HR={class:"relative"},WR={class:"relative"},KR={class:"relative"},GR={class:"relative"},QR={key:0,class:"bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 space-y-2"},JR={class:"text-xs font-bold text-amber-300 flex items-center gap-1.5"},YR={key:0,class:"text-xs text-slate-300 space-y-1"},XR={class:"text-[11px] text-slate-400"},ZR={key:1,class:"text-xs text-slate-400 italic"},eC={class:"p-4 border-t border-slate-700 bg-slate-900/80 flex items-center justify-between gap-3"},tC={class:"flex items-center gap-2"},nC={__name:"StallEditorModal",props:{isOpen:Boolean,stallId:String},emits:["close"],setup(t,{emit:e}){const n=t,s=e,r=ds(),i=je(null),o=je({stallNo:"",zoneId:"",price:0,status:"available",xM:0,yM:0,widthM:2.5,heightM:2,notes:"",bookedBy:null});cr(()=>n.stallId,E=>{if(E){const x=r.stalls.find(P=>P.id===E);if(x){i.value=x;const P=r.getStallMetrics(x);o.value={...x,widthM:P.widthM,heightM:P.heightM,xM:P.xM,yM:P.yM}}}else i.value=null},{immediate:!0});const l=os(()=>{const E=Number(o.value.widthM)||0,x=Number(o.value.heightM)||0;return Math.round(E*x*10)/10});function c(){const E=r.getZoneById(o.value.zoneId);E&&E.pricePerDay&&(o.value.price=E.pricePerDay)}function u(){i.value&&(r.updateStall(i.value.id,{...o.value}),r.showNotification(`อัปเดตข้อมูลแผง ${o.value.stallNo} สำเร็จ (ขนาด ${o.value.widthM}x${o.value.heightM} ม.)`,"success"),s("close"))}function d(){i.value&&(r.removeStall(i.value.id),s("close"))}function p(){i.value&&(r.cancelBooking(i.value.id),o.value.status="available",o.value.bookedBy=null)}function y(E){if(!E)return"-";try{return new Date(E).toLocaleString("th-TH")}catch{return E}}return(E,x)=>t.isOpen&&i.value?(me(),be("div",MR,[m("div",NR,[m("div",DR,[ne(k(PS),{class:"w-5 h-5 text-sky-400"}),m("h2",VR,"แก้ไขข้อมูลแผงค้า "+G(o.value.stallNo),1)]),m("button",{onClick:x[0]||(x[0]=P=>E.$emit("close")),class:"text-slate-400 hover:text-white p-1 rounded-lg"},[ne(k(Wi),{class:"w-5 h-5"})])]),m("div",OR,[m("div",LR,[m("div",null,[x[11]||(x[11]=m("label",{class:"block text-xs font-medium text-slate-300 mb-1"},"หมายเลขแผงค้า (Stall No.)",-1)),Le(m("input",{"onUpdate:modelValue":x[1]||(x[1]=P=>o.value.stallNo=P),type:"text",class:"w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"},null,512),[[Ge,o.value.stallNo]])]),m("div",null,[x[12]||(x[12]=m("label",{class:"block text-xs font-medium text-slate-300 mb-1"},"โซนสินค้า (Zone)",-1)),Le(m("select",{"onUpdate:modelValue":x[2]||(x[2]=P=>o.value.zoneId=P),onChange:c,class:"w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"},[(me(!0),be(_t,null,_i(k(r).zones,P=>(me(),be("option",{key:P.id,value:P.id},G(P.name),9,FR))),128))],544),[[tc,o.value.zoneId]])])]),m("div",UR,[m("div",null,[x[13]||(x[13]=m("label",{class:"block text-xs font-medium text-slate-300 mb-1"},"ราคาค่าเช่าต่อวัน (บาท)",-1)),Le(m("input",{"onUpdate:modelValue":x[3]||(x[3]=P=>o.value.price=P),type:"number",class:"w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-sky-500 focus:outline-none"},null,512),[[Ge,o.value.price,void 0,{number:!0}]])]),m("div",null,[x[15]||(x[15]=m("label",{class:"block text-xs font-medium text-slate-300 mb-1"},"สถานะแผง (Status)",-1)),Le(m("select",{"onUpdate:modelValue":x[4]||(x[4]=P=>o.value.status=P),class:"w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"},[...x[14]||(x[14]=[m("option",{value:"available"},"🟢 ว่าง (Available)",-1),m("option",{value:"booked"},"🟠 จองแล้ว (Booked)",-1),m("option",{value:"disabled"},"🔴 ปิดใช้งาน (Disabled)",-1)])],512),[[tc,o.value.status]])])]),m("div",$R,[m("div",BR,[m("h3",jR,[ne(k(tl),{class:"w-3.5 h-3.5 text-sky-400"}),x[16]||(x[16]=m("span",null,"ขนาดแผงค้าจริง (หน่วย: เมตร)",-1))]),m("span",zR,G(l.value)+" ตร.ม. ",1)]),m("div",qR,[m("div",null,[x[18]||(x[18]=m("label",{class:"block text-[11px] text-slate-400 mb-1"},"ความกว้าง W (เมตร)",-1)),m("div",HR,[Le(m("input",{"onUpdate:modelValue":x[5]||(x[5]=P=>o.value.widthM=P),type:"number",step:"0.1",min:"0.5",class:"w-full bg-slate-950 border border-slate-700 rounded-xl pl-3 pr-7 py-1.5 text-white font-mono text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"},null,512),[[Ge,o.value.widthM,void 0,{number:!0}]]),x[17]||(x[17]=m("span",{class:"absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-500"},"ม.",-1))])]),m("div",null,[x[20]||(x[20]=m("label",{class:"block text-[11px] text-slate-400 mb-1"},"ความยาว H (เมตร)",-1)),m("div",WR,[Le(m("input",{"onUpdate:modelValue":x[6]||(x[6]=P=>o.value.heightM=P),type:"number",step:"0.1",min:"0.5",class:"w-full bg-slate-950 border border-slate-700 rounded-xl pl-3 pr-7 py-1.5 text-white font-mono text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"},null,512),[[Ge,o.value.heightM,void 0,{number:!0}]]),x[19]||(x[19]=m("span",{class:"absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-500"},"ม.",-1))])]),m("div",null,[x[22]||(x[22]=m("label",{class:"block text-[11px] text-slate-400 mb-1"},"พิกัดแนวนอน X (เมตร)",-1)),m("div",KR,[Le(m("input",{"onUpdate:modelValue":x[7]||(x[7]=P=>o.value.xM=P),type:"number",step:"0.5",class:"w-full bg-slate-950 border border-slate-700 rounded-xl pl-3 pr-7 py-1.5 text-white font-mono text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"},null,512),[[Ge,o.value.xM,void 0,{number:!0}]]),x[21]||(x[21]=m("span",{class:"absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-500"},"ม.",-1))])]),m("div",null,[x[24]||(x[24]=m("label",{class:"block text-[11px] text-slate-400 mb-1"},"พิกัดแนวตั้ง Y (เมตร)",-1)),m("div",GR,[Le(m("input",{"onUpdate:modelValue":x[8]||(x[8]=P=>o.value.yM=P),type:"number",step:"0.5",class:"w-full bg-slate-950 border border-slate-700 rounded-xl pl-3 pr-7 py-1.5 text-white font-mono text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"},null,512),[[Ge,o.value.yM,void 0,{number:!0}]]),x[23]||(x[23]=m("span",{class:"absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-500"},"ม.",-1))])])])]),m("div",null,[x[25]||(x[25]=m("label",{class:"block text-xs font-medium text-slate-300 mb-1"},"หมายเหตุเพิ่มเติม",-1)),Le(m("textarea",{"onUpdate:modelValue":x[9]||(x[9]=P=>o.value.notes=P),rows:"2",placeholder:"เช่น มีเต้ารับไฟฟ้า 15A / ติดทางเดินหลัก",class:"w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"},null,512),[[Ge,o.value.notes]])]),o.value.status==="booked"?(me(),be("div",QR,[m("h4",JR,[ne(k(kS),{class:"w-4 h-4"}),x[26]||(x[26]=m("span",null,"ข้อมูลผู้จอง",-1))]),o.value.bookedBy?(me(),be("div",YR,[m("p",null,[x[27]||(x[27]=m("strong",null,"ชื่อผู้จอง:",-1)),Ne(" "+G(o.value.bookedBy.name),1)]),m("p",null,[x[28]||(x[28]=m("strong",null,"เบอร์โทรศัพท์:",-1)),Ne(" "+G(o.value.bookedBy.phone),1)]),m("p",null,[x[29]||(x[29]=m("strong",null,"ประเภทสินค้า:",-1)),Ne(" "+G(o.value.bookedBy.goodsType||"ไม่ระบุ"),1)]),m("p",XR,[x[30]||(x[30]=m("strong",null,"เวลาที่จอง:",-1)),Ne(" "+G(y(o.value.bookedBy.bookedAt)),1)])])):(me(),be("div",ZR,"ไม่มีข้อมูลผู้จอง")),m("button",{onClick:p,class:"w-full mt-2 py-1.5 bg-rose-600/80 hover:bg-rose-600 text-white font-medium rounded-lg text-xs transition"}," ยกเลิกการจองแผงนี้ ")])):yt("",!0)]),m("div",eC,[m("button",{onClick:d,class:"px-3 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/40 rounded-xl font-medium text-xs transition flex items-center gap-1"},[ne(k(Ku),{class:"w-4 h-4"}),x[31]||(x[31]=m("span",null,"ลบแผงค้า",-1))]),m("div",tC,[m("button",{onClick:x[10]||(x[10]=P=>E.$emit("close")),class:"px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl font-medium text-xs transition"}," ยกเลิก "),m("button",{onClick:u,class:"px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-xl text-xs shadow-lg shadow-sky-600/20 transition flex items-center gap-1.5"},[ne(k(q_),{class:"w-4 h-4"}),x[32]||(x[32]=m("span",null,"บันทึกการปรับเปลี่ยน",-1))])])])])):yt("",!0)}},sC={key:0,class:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"},rC={class:"bg-slate-800 border border-slate-700 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"},iC={class:"px-6 py-4 border-b border-slate-700 flex items-center justify-between bg-slate-900/60"},oC={class:"flex items-center gap-2"},aC={class:"p-6 space-y-6 overflow-y-auto flex-1"},lC={class:"bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 space-y-3"},cC={class:"grid grid-cols-1 sm:grid-cols-3 gap-3"},uC={class:"sm:col-span-2"},hC={class:"flex items-center justify-between pt-1"},dC={class:"flex items-center gap-2"},fC={class:"text-xs font-mono text-slate-300"},pC={class:"space-y-3"},mC={class:"flex items-center gap-3"},gC=["onUpdate:modelValue","onChange"],_C=["onUpdate:modelValue","onBlur"],yC={class:"text-[10px] text-slate-400"},vC={class:"flex items-center gap-2"},wC=["onUpdate:modelValue","onBlur"],bC=["onClick"],TC={class:"px-6 py-4 border-t border-slate-700 bg-slate-900/60 flex justify-end"},IC={__name:"ZoneManagerModal",props:{isOpen:Boolean},emits:["close"],setup(t){const e=ds(),n=je({name:"",color:"#0284c7",pricePerDay:400});function s(){n.value.name.trim()&&(e.addZone({...n.value}),n.value={name:"",color:"#0284c7",pricePerDay:400})}return(r,i)=>t.isOpen?(me(),be("div",sC,[m("div",rC,[m("div",iC,[m("div",oC,[ne(k(H_),{class:"w-5 h-5 text-purple-400"}),i[5]||(i[5]=m("h2",{class:"text-base font-bold text-white"},"จัดการโซนสินค้าและราคาเริ่มต้น",-1))]),m("button",{onClick:i[0]||(i[0]=o=>r.$emit("close")),class:"text-slate-400 hover:text-white p-1 rounded-lg"},[ne(k(Wi),{class:"w-5 h-5"})])]),m("div",aC,[m("div",lC,[i[10]||(i[10]=m("h3",{class:"text-xs font-bold text-slate-300 uppercase tracking-wider"},"เพิ่มโซนสินค้าใหม่",-1)),m("div",cC,[m("div",uC,[i[6]||(i[6]=m("label",{class:"block text-[11px] text-slate-400 mb-1"},"ชื่อโซน",-1)),Le(m("input",{"onUpdate:modelValue":i[1]||(i[1]=o=>n.value.name=o),type:"text",placeholder:"เช่น โซนต้นไม้ / ของแต่งบ้าน",class:"w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"},null,512),[[Ge,n.value.name]])]),m("div",null,[i[7]||(i[7]=m("label",{class:"block text-[11px] text-slate-400 mb-1"},"ราคา/วัน (฿)",-1)),Le(m("input",{"onUpdate:modelValue":i[2]||(i[2]=o=>n.value.pricePerDay=o),type:"number",class:"w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white text-xs font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"},null,512),[[Ge,n.value.pricePerDay,void 0,{number:!0}]])])]),m("div",hC,[m("div",dC,[i[8]||(i[8]=m("label",{class:"text-[11px] text-slate-400"},"สีประจำโซน:",-1)),Le(m("input",{"onUpdate:modelValue":i[3]||(i[3]=o=>n.value.color=o),type:"color",class:"w-8 h-8 rounded-lg bg-transparent cursor-pointer border border-slate-700"},null,512),[[Ge,n.value.color]]),m("span",fC,G(n.value.color),1)]),m("button",{onClick:s,class:"px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs rounded-xl shadow-md transition flex items-center gap-1"},[ne(k(W_),{class:"w-3.5 h-3.5"}),i[9]||(i[9]=m("span",null,"เพิ่มโซน",-1))])])]),m("div",pC,[i[11]||(i[11]=m("h3",{class:"text-xs font-bold text-slate-400 uppercase tracking-wider"},"รายการโซนปัจจุบัน",-1)),(me(!0),be(_t,null,_i(k(e).zones,o=>(me(),be("div",{key:o.id,class:"bg-slate-900 border border-slate-700/70 rounded-2xl p-3 flex items-center justify-between gap-3"},[m("div",mC,[Le(m("input",{type:"color","onUpdate:modelValue":l=>o.color=l,onChange:l=>k(e).updateZone(o.id,{color:o.color}),class:"w-7 h-7 rounded-lg bg-transparent cursor-pointer border border-slate-700"},null,40,gC),[[Ge,o.color]]),m("div",null,[Le(m("input",{type:"text","onUpdate:modelValue":l=>o.name=l,onBlur:l=>k(e).updateZone(o.id,{name:o.name}),class:"bg-transparent text-white font-medium text-xs border-b border-transparent focus:border-purple-500 focus:outline-none"},null,40,_C),[[Ge,o.name]]),m("div",yC," ราคาแนะนำ: ฿"+G(o.pricePerDay)+"/วัน ",1)])]),m("div",vC,[Le(m("input",{type:"number","onUpdate:modelValue":l=>o.pricePerDay=l,onBlur:l=>k(e).updateZone(o.id,{pricePerDay:o.pricePerDay}),class:"w-20 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-white text-xs font-mono"},null,40,wC),[[Ge,o.pricePerDay,void 0,{number:!0}]]),m("button",{onClick:l=>k(e).removeZone(o.id),class:"p-1 text-slate-400 hover:text-rose-400 rounded-lg transition",title:"ลบโซน"},[ne(k(Ku),{class:"w-4 h-4"})],8,bC)])]))),128))])]),m("div",TC,[m("button",{onClick:i[4]||(i[4]=o=>r.$emit("close")),class:"px-5 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl text-xs transition"}," ปิดหน้าต่าง ")])])])):yt("",!0)}},EC={key:0,class:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"},AC={class:"bg-slate-800 border border-slate-700 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col"},xC={class:"px-6 py-4 border-b border-slate-700 flex items-center justify-between bg-slate-900/60"},SC={class:"flex items-center gap-2"},RC={class:"grid grid-cols-2 gap-4"},CC={class:"relative"},PC={class:"relative"},kC={class:"bg-slate-900 border border-slate-700/80 rounded-2xl p-4 flex items-center justify-between"},MC={class:"flex items-center gap-3"},NC={class:"text-base font-bold text-white font-mono"},DC={class:"pt-2 flex items-center justify-end gap-3"},VC={type:"submit",class:"px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-xl text-xs shadow-lg shadow-sky-600/20 transition flex items-center gap-1.5"},OC={__name:"MarketSettingsModal",props:{isOpen:Boolean},emits:["close"],setup(t,{emit:e}){const n=t,s=e,r=ds(),i=je({name:"",widthMeters:30,heightMeters:20,gridSnapMeters:.5});cr(()=>n.isOpen,c=>{c&&(i.value={name:r.marketName,widthMeters:r.marketWidthMeters,heightMeters:r.marketHeightMeters,gridSnapMeters:r.gridSnapMeters})},{immediate:!0});const o=os(()=>{const c=Number(i.value.widthMeters)||0,u=Number(i.value.heightMeters)||0;return(c*u).toLocaleString("th-TH")});function l(){r.updateMarketDimensions({...i.value}),s("close")}return(c,u)=>t.isOpen?(me(),be("div",EC,[m("div",AC,[m("div",xC,[m("div",SC,[ne(k(tl),{class:"w-5 h-5 text-sky-400"}),u[6]||(u[6]=m("h2",{class:"text-base font-bold text-white"},"ตั้งค่าขนาดและพื้นที่ตลาดรวม (เมตร / ตร.ม.)",-1))]),m("button",{onClick:u[0]||(u[0]=d=>c.$emit("close")),class:"text-slate-400 hover:text-white p-1 rounded-lg"},[ne(k(Wi),{class:"w-5 h-5"})])]),m("form",{onSubmit:ri(l,["prevent"]),class:"p-6 space-y-5 text-xs sm:text-sm"},[m("div",null,[u[7]||(u[7]=m("label",{class:"block text-xs font-medium text-slate-300 mb-1"},"ชื่อผังตลาด",-1)),Le(m("input",{"onUpdate:modelValue":u[1]||(u[1]=d=>i.value.name=d),type:"text",required:"",class:"w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"},null,512),[[Ge,i.value.name]])]),m("div",RC,[m("div",null,[u[9]||(u[9]=m("label",{class:"block text-xs font-medium text-slate-300 mb-1"},[Ne(" ความกว้างตลาดรวม (เมตร) "),m("span",{class:"text-rose-400"},"*")],-1)),m("div",CC,[Le(m("input",{"onUpdate:modelValue":u[2]||(u[2]=d=>i.value.widthMeters=d),type:"number",step:"0.5",min:"5",max:"200",required:"",class:"w-full bg-slate-900 border border-slate-700 rounded-xl pl-3 pr-8 py-2 text-white font-mono focus:ring-2 focus:ring-sky-500 focus:outline-none"},null,512),[[Ge,i.value.widthMeters,void 0,{number:!0}]]),u[8]||(u[8]=m("span",{class:"absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium"},"ม.",-1))])]),m("div",null,[u[11]||(u[11]=m("label",{class:"block text-xs font-medium text-slate-300 mb-1"},[Ne(" ความยาว/ลึกรวม (เมตร) "),m("span",{class:"text-rose-400"},"*")],-1)),m("div",PC,[Le(m("input",{"onUpdate:modelValue":u[3]||(u[3]=d=>i.value.heightMeters=d),type:"number",step:"0.5",min:"5",max:"200",required:"",class:"w-full bg-slate-900 border border-slate-700 rounded-xl pl-3 pr-8 py-2 text-white font-mono focus:ring-2 focus:ring-sky-500 focus:outline-none"},null,512),[[Ge,i.value.heightMeters,void 0,{number:!0}]]),u[10]||(u[10]=m("span",{class:"absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium"},"ม.",-1))])])]),m("div",kC,[m("div",MC,[u[14]||(u[14]=m("div",{class:"w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold"}," ㎡ ",-1)),m("div",null,[u[13]||(u[13]=m("div",{class:"text-xs text-slate-400"},"พื้นที่รวมผังตลาดทั้งหมด",-1)),m("div",NC,[Ne(G(o.value)+" ",1),u[12]||(u[12]=m("span",{class:"text-xs font-normal text-slate-400"},"ตารางเมตร (ตร.ม.)",-1))])])]),u[15]||(u[15]=m("div",{class:"text-right text-[11px] text-slate-400 font-mono"}," 1 เมตร = 40px ",-1))]),m("div",null,[u[17]||(u[17]=m("label",{class:"block text-xs font-medium text-slate-300 mb-1"},"ความละเอียดระยะกะ Snap (เมตร)",-1)),Le(m("select",{"onUpdate:modelValue":u[4]||(u[4]=d=>i.value.gridSnapMeters=d),class:"w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"},[...u[16]||(u[16]=[m("option",{value:.25},"0.25 เมตร (25 เซนติเมตร - ละเอียดมาก)",-1),m("option",{value:.5},"0.50 เมตร (50 เซนติเมตร - แนะนำ)",-1),m("option",{value:1},"1.00 เมตร (1 เมตร - ผังใหญ่)",-1)])],512),[[tc,i.value.gridSnapMeters,void 0,{number:!0}]])]),m("div",DC,[m("button",{type:"button",onClick:u[5]||(u[5]=d=>c.$emit("close")),class:"px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-xl text-xs transition"}," ยกเลิก "),m("button",VC,[ne(k(q_),{class:"w-4 h-4"}),u[18]||(u[18]=m("span",null,"ปรับขนาดตลาด",-1))])])],32)])])):yt("",!0)}},LC={class:"flex flex-col h-[calc(100vh-120px)] bg-slate-950 select-none"},FC={class:"bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-20 shadow-md"},UC={class:"max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4"},$C={class:"relative flex-1 min-w-[200px]"},BC={class:"flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0"},jC=["onClick"],zC={class:"flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800"},qC={class:"flex-1 relative overflow-auto bg-slate-950 bg-grid-pattern p-6"},HC={class:"text-right text-xs text-slate-500 font-medium"},WC=["onClick"],KC={class:"flex items-center justify-between"},GC={class:"text-sm font-bold text-white font-mono drop-shadow"},QC={class:"text-[10px] text-sky-300 font-mono"},JC={class:"flex items-center justify-between mt-auto"},YC={class:"text-[10px] text-slate-300 truncate max-w-[80px]"},XC={key:0,class:"text-[10px] font-bold text-emerald-300 group-hover:underline flex items-center gap-0.5"},ZC={key:1,class:"text-[10px] text-amber-400 font-medium"},eP={key:0,class:"bg-slate-900 border-t border-slate-800 p-4 sticky bottom-0 z-30 shadow-2xl"},tP={class:"max-w-4xl mx-auto flex items-center justify-between gap-4"},nP={class:"flex items-center gap-3"},sP={class:"flex items-center gap-2"},rP={class:"text-sm font-bold text-white"},iP={class:"text-xs px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md"},oP={class:"text-xs px-2 py-0.5 bg-sky-500/10 text-sky-400 rounded-md border border-sky-500/20 font-mono"},aP={class:"text-xs text-slate-400 mt-0.5"},lP={class:"text-emerald-400 font-mono"},cP={key:0,class:"ml-2 text-slate-500"},uP={key:1,class:"text-xs text-amber-400 bg-amber-500/10 px-3 py-2 rounded-xl border border-amber-500/30"},hP={__name:"CustomerStallMap",emits:["open-booking-modal"],setup(t,{emit:e}){const n=ds(),s=je(null),r=os(()=>n.stalls.find(c=>c.id===s.value)),i=os(()=>n.getStallMetrics(r.value));function o(c){s.value=c.id}function l(c){if(c.status==="booked")return"#78350f22";if(c.status==="disabled")return"#0f172a";const u=n.getZoneById(c.zoneId);return u!=null&&u.color?`${u.color}25`:"#0284c725"}return(c,u)=>{var d,p;return me(),be("div",LC,[m("div",FC,[m("div",UC,[m("div",$C,[ne(k(SS),{class:"w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"}),Le(m("input",{"onUpdate:modelValue":u[0]||(u[0]=y=>k(n).searchQuery=y),type:"text",placeholder:"ค้นหาหมายเลขแผงค้า (เช่น A01, B02)...",class:"w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"},null,512),[[Ge,k(n).searchQuery]])]),m("div",BC,[m("button",{onClick:u[1]||(u[1]=y=>k(n).filterZoneId="all"),class:tt(["px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition",k(n).filterZoneId==="all"?"bg-emerald-500 text-white shadow-md shadow-emerald-500/20":"bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700"])}," ทุกโซนสินค้า ",2),(me(!0),be(_t,null,_i(k(n).zones,y=>(me(),be("button",{key:y.id,onClick:E=>k(n).filterZoneId=y.id,class:tt(["px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition flex items-center gap-1.5 border",k(n).filterZoneId===y.id?"bg-slate-800 text-white border-emerald-500 shadow-sm":"bg-slate-800/60 text-slate-400 hover:text-slate-200 border-slate-700"])},[m("span",{class:"w-2 h-2 rounded-full",style:Tt({backgroundColor:y.color})},null,4),m("span",null,G(y.name),1)],10,jC))),128))]),m("div",zC,[m("button",{onClick:u[2]||(u[2]=y=>k(n).filterStatus="all"),class:tt(["px-2.5 py-1 rounded-lg text-xs font-medium transition",k(n).filterStatus==="all"?"bg-slate-800 text-white":"text-slate-400"])}," ทั้งหมด ",2),m("button",{onClick:u[3]||(u[3]=y=>k(n).filterStatus="available"),class:tt(["px-2.5 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1",k(n).filterStatus==="available"?"bg-emerald-600 text-white":"text-slate-400"])},[...u[5]||(u[5]=[m("span",{class:"w-1.5 h-1.5 rounded-full bg-emerald-400"},null,-1),m("span",null,"เฉพาะว่าง",-1)])],2)])])]),m("div",qC,[m("div",{class:"relative mx-auto scale-90 origin-top-left sm:scale-100",style:Tt({width:`${k(n).canvasWidthPx+60}px`,height:`${k(n).canvasHeightPx+60}px`})},[u[7]||(u[7]=im('<div class="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur border border-slate-800 p-3 rounded-2xl shadow-xl flex items-center gap-4 text-xs"><div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-emerald-500/80 border border-emerald-400"></span><span class="text-slate-300">ว่าง (คลิกเพื่อจอง)</span></div><div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-amber-500/80 border border-amber-400"></span><span class="text-slate-300">ถูกจองแล้ว</span></div><div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-slate-800 border border-slate-700"></span><span class="text-slate-400">ปิดให้บริการ</span></div></div>',1)),m("div",{class:"absolute border-2 border-dashed border-slate-700/60 rounded-3xl pointer-events-none p-4",style:Tt({left:"10px",top:"10px",width:`${k(n).canvasWidthPx}px`,height:`${k(n).canvasHeightPx}px`})},[m("div",HC," ขนาดผังตลาด: "+G(k(n).marketWidthMeters)+" x "+G(k(n).marketHeightMeters)+" เมตร ("+G(k(n).totalMarketAreaSqM)+" ตร.ม.) ",1)],4),(me(!0),be(_t,null,_i(k(n).filteredStalls,y=>{var E,x;return me(),be("div",{key:y.id,class:tt(["absolute rounded-xl border-2 transition-all shadow-lg flex flex-col justify-between p-2.5 cursor-pointer group",[s.value===y.id?"ring-4 ring-emerald-400 border-emerald-300 scale-105 z-20 shadow-2xl":"hover:scale-[1.02] border-slate-700 z-10",y.status==="available"?"hover:border-emerald-400":"",y.status==="booked"?"cursor-not-allowed opacity-75":"",y.status==="disabled"?"cursor-not-allowed opacity-50 bg-slate-900":""]]),style:Tt({left:`${y.x+10}px`,top:`${y.y+10}px`,width:`${y.width}px`,height:`${y.height}px`,backgroundColor:l(y)}),onClick:P=>o(y)},[m("div",{class:"h-1.5 w-full rounded-full mb-1",style:Tt({backgroundColor:(E=k(n).getZoneById(y.zoneId))==null?void 0:E.color})},null,4),m("div",KC,[m("span",GC,G(y.stallNo),1),m("span",{class:tt(["text-[11px] px-2 py-0.5 rounded-full font-mono font-semibold",y.status==="available"?"bg-emerald-500 text-slate-950":"bg-slate-800 text-slate-300"])}," ฿"+G(y.price),3)]),m("div",QC,G(k(n).pxToM(y.width))+"x"+G(k(n).pxToM(y.height))+" ม. ",1),m("div",JC,[m("span",YC,G((x=k(n).getZoneById(y.zoneId))==null?void 0:x.name),1),y.status==="available"?(me(),be("span",XC,[u[6]||(u[6]=Ne(" จองแผง ",-1)),ne(k(bS),{class:"w-3 h-3"})])):y.status==="booked"?(me(),be("span",ZC," ถูกจองแล้ว ")):yt("",!0)])],14,WC)}),128))],4)]),r.value?(me(),be("div",eP,[m("div",tP,[m("div",nP,[m("div",{class:"w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-base shadow-md font-mono",style:Tt({backgroundColor:(d=k(n).getZoneById(r.value.zoneId))==null?void 0:d.color})},G(r.value.stallNo),5),m("div",null,[m("div",sP,[m("h3",rP,"แผงค้า "+G(r.value.stallNo),1),m("span",iP,G((p=k(n).getZoneById(r.value.zoneId))==null?void 0:p.name),1),m("span",oP," ขนาด "+G(i.value.widthM)+" x "+G(i.value.heightM)+" ม. ("+G(i.value.areaSqM)+" ตร.ม.) ",1)]),m("p",aP,[u[8]||(u[8]=Ne(" ราคาเช่า: ",-1)),m("strong",lP,"฿"+G(r.value.price),1),u[9]||(u[9]=Ne(" / วัน ",-1)),r.value.notes?(me(),be("span",cP,"("+G(r.value.notes)+")",1)):yt("",!0)])])]),m("div",null,[r.value.status==="available"?(me(),be("button",{key:0,onClick:u[4]||(u[4]=y=>c.$emit("open-booking-modal",r.value)),class:"px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition flex items-center gap-2 text-xs sm:text-sm"},[ne(k(Wu),{class:"w-4 h-4"}),u[10]||(u[10]=m("span",null,"ดำเนินการจองแผงนี้",-1))])):(me(),be("span",uP," แผงนี้ไม่สามารถจองได้ ("+G(r.value.status==="booked"?"มีผู้จองแล้ว":"ปิดใช้งาน")+") ",1))])])])):yt("",!0)])}}},dP={key:0,class:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"},fP={class:"bg-slate-800 border border-slate-700 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col"},pP={class:"px-6 py-4 border-b border-slate-700 flex items-center justify-between bg-slate-900/60"},mP={class:"flex items-center gap-2"},gP={class:"text-base font-bold text-white"},_P={class:"bg-slate-900 border border-slate-700/80 rounded-2xl p-4 flex items-center justify-between"},yP={class:"flex items-center gap-3"},vP={class:"font-bold text-white text-base"},wP={class:"text-xs text-slate-400"},bP={class:"text-xs text-sky-400 font-mono mt-0.5"},TP={class:"text-right font-mono"},IP={class:"text-base font-bold text-emerald-400"},EP={class:"space-y-4"},AP={class:"bg-sky-500/10 border border-sky-500/30 rounded-xl p-3 flex items-start gap-2 text-xs text-sky-300"},xP={class:"pt-2 flex items-center justify-end gap-3"},SP={type:"submit",class:"px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 text-xs transition flex items-center gap-1.5"},RP={__name:"BookingModal",props:{isOpen:Boolean,stall:Object},emits:["close"],setup(t,{emit:e}){const n=t,s=e,r=ds(),i=je({name:"",phone:"",goodsType:""}),o=os(()=>r.getStallMetrics(n.stall));function l(){if(!n.stall)return;r.bookStall(n.stall.id,i.value)&&(i.value={name:"",phone:"",goodsType:""},s("close"))}return(c,u)=>{var d,p;return t.isOpen&&t.stall?(me(),be("div",dP,[m("div",fP,[m("div",pP,[m("div",mP,[ne(k(Wu),{class:"w-5 h-5 text-emerald-400"}),m("h2",gP,"แบบฟอร์มยืนยันการจองแผงค้า "+G(t.stall.stallNo),1)]),m("button",{onClick:u[0]||(u[0]=y=>c.$emit("close")),class:"text-slate-400 hover:text-white p-1 rounded-lg"},[ne(k(Wi),{class:"w-5 h-5"})])]),m("form",{onSubmit:ri(l,["prevent"]),class:"p-6 space-y-5 text-xs sm:text-sm"},[m("div",_P,[m("div",yP,[m("div",{class:"w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-white text-lg shadow-md",style:Tt({backgroundColor:(d=k(r).getZoneById(t.stall.zoneId))==null?void 0:d.color})},G(t.stall.stallNo),5),m("div",null,[m("div",vP,"แผงค้า "+G(t.stall.stallNo),1),m("div",wP,G((p=k(r).getZoneById(t.stall.zoneId))==null?void 0:p.name),1),m("div",bP," ขนาด: "+G(o.value.widthM)+" x "+G(o.value.heightM)+" เมตร ("+G(o.value.areaSqM)+" ตร.ม.) ",1)])]),m("div",TP,[u[5]||(u[5]=m("div",{class:"text-xs text-slate-400"},"อัตราค่าเช่า",-1)),m("div",IP,"฿"+G(t.stall.price)+"/วัน",1)])]),m("div",EP,[m("div",null,[u[6]||(u[6]=m("label",{class:"block text-xs font-medium text-slate-300 mb-1"},[Ne(" ชื่อ-นามสกุล ผู้จอง / ชื่อร้านค้า "),m("span",{class:"text-rose-400"},"*")],-1)),Le(m("input",{"onUpdate:modelValue":u[1]||(u[1]=y=>i.value.name=y),required:"",type:"text",placeholder:"เช่น คุณสมชาย (ร้านชาไข่มุกหวานน้อย)",class:"w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"},null,512),[[Ge,i.value.name]])]),m("div",null,[u[7]||(u[7]=m("label",{class:"block text-xs font-medium text-slate-300 mb-1"},[Ne(" เบอร์โทรศัพท์ติดต่อ "),m("span",{class:"text-rose-400"},"*")],-1)),Le(m("input",{"onUpdate:modelValue":u[2]||(u[2]=y=>i.value.phone=y),required:"",type:"tel",placeholder:"เช่น 081-234-5678",class:"w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"},null,512),[[Ge,i.value.phone]])]),m("div",null,[u[8]||(u[8]=m("label",{class:"block text-xs font-medium text-slate-300 mb-1"}," ประเภทสินค้า / สินค้าที่นำมาขาย ",-1)),Le(m("input",{"onUpdate:modelValue":u[3]||(u[3]=y=>i.value.goodsType=y),type:"text",placeholder:"เช่น เครื่องดื่มสมุนไพร, เสื้อผ้าแฟชั่นมือสอง",class:"w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"},null,512),[[Ge,i.value.goodsType]])])]),m("div",AP,[ne(k(CS),{class:"w-4 h-4 text-sky-400 shrink-0 mt-0.5"}),u[9]||(u[9]=m("p",null," ระบบจองแผงใช้ระบบ Real-time Atomic Transaction เพื่อป้องกันการจองซ้ำ (Race Condition) บน Firebase Firestore ",-1))]),m("div",xP,[m("button",{type:"button",onClick:u[4]||(u[4]=y=>c.$emit("close")),class:"px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-xl text-xs transition"}," ยกเลิก "),m("button",SP,[ne(k(TS),{class:"w-4 h-4"}),u[10]||(u[10]=m("span",null,"ยืนยันการจอง",-1))])])],32)])])):yt("",!0)}}},CP={key:0,class:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"},PP={class:"bg-slate-800 border border-slate-700 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col"},kP={class:"px-6 py-4 border-b border-slate-700 flex items-center justify-between bg-slate-900/60"},MP={class:"flex items-center gap-2"},NP={class:"p-6 space-y-4 text-xs sm:text-sm"},DP={class:"pt-2 flex justify-end"},VP={__name:"FirebaseSettingsModal",props:{isOpen:Boolean},emits:["close"],setup(t){return(e,n)=>t.isOpen?(me(),be("div",CP,[m("div",PP,[m("div",kP,[m("div",MP,[ne(k(IS),{class:"w-5 h-5 text-amber-500"}),n[2]||(n[2]=m("h2",{class:"text-base font-bold text-white"},"ตั้งค่าการเชื่อมต่อ Firebase Firestore",-1))]),m("button",{onClick:n[0]||(n[0]=s=>e.$emit("close")),class:"text-slate-400 hover:text-white p-1 rounded-lg"},[ne(k(Wi),{class:"w-5 h-5"})])]),m("div",NP,[n[3]||(n[3]=im('<p class="text-slate-300 leading-relaxed"> ปัจจุบันระบบทำงานในโหมด <strong class="text-amber-400">Local PoC Mode</strong> โดยจะบันทึกข้อมูลผังตลาดและสถานะการจองลงใน Browser LocalStorage </p><div class="bg-slate-900 border border-slate-700/80 rounded-2xl p-4 space-y-2"><h3 class="text-xs font-bold text-slate-200">หากต้องการเชื่อมต่อกับ Firebase Project จริง:</h3><ol class="list-decimal list-inside text-slate-400 space-y-1 text-xs"><li>สร้างไฟล์ <code class="text-sky-400 font-mono bg-slate-950 px-1 py-0.5 rounded">.env</code> ใน Root โฟลเดอร์ของโปรเจกต์</li><li>เพิ่ม Key ด้านล่างนี้พร้อมค่าที่ได้จาก Firebase Console:</li></ol></div><div class="bg-slate-950 border border-slate-800 rounded-xl p-3 text-[11px] font-mono text-emerald-400 space-y-1 overflow-x-auto"><p>VITE_FIREBASE_API_KEY=AIzaSy...</p><p>VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com</p><p>VITE_FIREBASE_PROJECT_ID=your-project-id</p><p>VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com</p><p>VITE_FIREBASE_MESSAGING_SENDER_ID=123456789</p><p>VITE_FIREBASE_APP_ID=1:123456789:web:abcdef</p></div>',3)),m("div",DP,[m("button",{onClick:n[1]||(n[1]=s=>e.$emit("close")),class:"px-5 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl text-xs transition"}," เข้าใจแล้ว ")])])])])):yt("",!0)}},OP={class:"min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Prompt',sans-serif]"},LP={class:"flex-1 relative overflow-hidden"},FP={__name:"App",setup(t){const e=ds(),n=je(!1),s=je(!1),r=je(!1),i=je(!1),o=je(!1),l=je(null);Fc(()=>{e.initFirebaseSync()});function c(u){l.value=u,i.value=!0}return(u,d)=>(me(),be("div",OP,[ne(oR,{onOpenZoneManager:d[0]||(d[0]=p=>s.value=!0),onOpenMarketSettings:d[1]||(d[1]=p=>r.value=!0),onOpenFirebaseConfig:d[2]||(d[2]=p=>o.value=!0)}),m("main",LP,[k(e).activeMode==="admin"?(me(),Zl(kR,{key:0,onOpenEditor:d[3]||(d[3]=p=>n.value=!0)})):k(e).activeMode==="customer"?(me(),Zl(hP,{key:1,onOpenBookingModal:c})):yt("",!0)]),ne(nC,{"is-open":n.value,"stall-id":k(e).selectedStallId,onClose:d[4]||(d[4]=p=>n.value=!1)},null,8,["is-open","stall-id"]),ne(IC,{"is-open":s.value,onClose:d[5]||(d[5]=p=>s.value=!1)},null,8,["is-open"]),ne(OC,{"is-open":r.value,onClose:d[6]||(d[6]=p=>r.value=!1)},null,8,["is-open"]),ne(RP,{"is-open":i.value,stall:l.value,onClose:d[7]||(d[7]=p=>i.value=!1)},null,8,["is-open","stall"]),ne(VP,{"is-open":o.value,onClose:d[8]||(d[8]=p=>o.value=!1)},null,8,["is-open"]),ne(vv,{name:"fade"},{default:Sp(()=>[k(e).notification?(me(),be("div",{key:0,class:tt(["fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-md flex items-center gap-2.5 text-xs font-medium",{"bg-emerald-950/90 text-emerald-300 border-emerald-500/40":k(e).notification.type==="success","bg-rose-950/90 text-rose-300 border-rose-500/40":k(e).notification.type==="error","bg-sky-950/90 text-sky-300 border-sky-500/40":k(e).notification.type==="info","bg-amber-950/90 text-amber-300 border-amber-500/40":k(e).notification.type==="warning"}])},[m("span",{class:tt(["w-2 h-2 rounded-full animate-ping",{"bg-emerald-400":k(e).notification.type==="success","bg-rose-400":k(e).notification.type==="error","bg-sky-400":k(e).notification.type==="info","bg-amber-400":k(e).notification.type==="warning"}])},null,2),m("span",null,G(k(e).notification.msg),1)],2)):yt("",!0)]),_:1})]))}},K_=Gv(FP);K_.use(Yv());K_.mount("#app");
