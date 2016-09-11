/**
 * Copyright (c) 2007-2015, Kaazing Corporation. All rights reserved.
 */

var browser=null;
if(typeof (ActiveXObject)!="undefined"){
if(navigator.userAgent.indexOf("MSIE 10")!=-1){
browser="chrome";
}else{
browser="ie";
}
}else{
if(navigator.userAgent.indexOf("Trident/7")!=-1&&navigator.userAgent.indexOf("rv:11")!=-1){
browser="chrome";
}else{
if(Object.prototype.toString.call(window.opera)=="[object Opera]"){
browser="opera";
}else{
if(navigator.vendor.indexOf("Apple")!=-1){
browser="safari";
if(navigator.userAgent.indexOf("iPad")!=-1||navigator.userAgent.indexOf("iPhone")!=-1){
browser.ios=true;
}
}else{
if(navigator.vendor.indexOf("Google")!=-1){
if((navigator.userAgent.indexOf("Android")!=-1)&&(navigator.userAgent.indexOf("Chrome")==-1)){
browser="android";
}else{
browser="chrome";
}
}else{
if(navigator.product=="Gecko"&&window.find&&!navigator.savePreferences){
browser="firefox";
}else{
throw new Error("couldn't detect browser");
}
}
}
}
}
}
switch(browser){
case "ie":
(function(){
if(document.createEvent===undefined){
var _1=function(){
};
_1.prototype.initEvent=function(_2,_3,_4){
this.type=_2;
this.bubbles=_3;
this.cancelable=_4;
};
document.createEvent=function(_5){
if(_5!="Events"){
throw new Error("Unsupported event name: "+_5);
}
return new _1();
};
}
document._w_3_c_d_o_m_e_v_e_n_t_s_createElement=document.createElement;
document.createElement=function(_6){
var _7=this._w_3_c_d_o_m_e_v_e_n_t_s_createElement(_6);
if(_7.addEventListener===undefined){
var _8={};
_7.addEventListener=function(_9,_a,_b){
_7.attachEvent("on"+_9,_a);
return addEventListener(_8,_9,_a,_b);
};
_7.removeEventListener=function(_c,_d,_e){
return removeEventListener(_8,_c,_d,_e);
};
_7.dispatchEvent=function(_f){
return dispatchEvent(_8,_f);
};
}
return _7;
};
if(window.addEventListener===undefined){
var _10=document.createElement("div");
var _11=(typeof (postMessage)==="undefined");
window.addEventListener=function(_12,_13,_14){
if(_11&&_12=="message"){
_10.addEventListener(_12,_13,_14);
}else{
window.attachEvent("on"+_12,_13);
}
};
window.removeEventListener=function(_15,_16,_17){
if(_11&&_15=="message"){
_10.removeEventListener(_15,_16,_17);
}else{
window.detachEvent("on"+_15,_16);
}
};
window.dispatchEvent=function(_18){
if(_11&&_18.type=="message"){
_10.dispatchEvent(_18);
}else{
window.fireEvent("on"+_18.type,_18);
}
};
}
function addEventListener(_19,_1a,_1b,_1c){
if(_1c){
throw new Error("Not implemented");
}
var _1d=_19[_1a]||{};
_19[_1a]=_1d;
_1d[_1b]=_1b;
};
function removeEventListener(_1e,_1f,_20,_21){
if(_21){
throw new Error("Not implemented");
}
var _22=_1e[_1f]||{};
delete _22[_20];
};
function dispatchEvent(_23,_24){
var _25=_24.type;
var _26=_23[_25]||{};
for(var key in _26){
if(_26.hasOwnProperty(key)&&typeof (_26[key])=="function"){
try{
_26[key](_24);
}
catch(e){
}
}
}
};
})();
break;
case "chrome":
case "android":
case "safari":
if(typeof (window.postMessage)==="undefined"&&typeof (window.dispatchEvent)==="undefined"&&typeof (document.dispatchEvent)==="function"){
window.dispatchEvent=function(_28){
document.dispatchEvent(_28);
};
var addEventListener0=window.addEventListener;
window.addEventListener=function(_29,_2a,_2b){
if(_29==="message"){
document.addEventListener(_29,_2a,_2b);
}else{
addEventListener0.call(window,_29,_2a,_2b);
}
};
var removeEventListener0=window.removeEventListener;
window.removeEventListener=function(_2c,_2d,_2e){
if(_2c==="message"){
document.removeEventListener(_2c,_2d,_2e);
}else{
removeEventListener0.call(window,_2c,_2d,_2e);
}
};
}
break;
case "opera":
var addEventListener0=window.addEventListener;
window.addEventListener=function(_2f,_30,_31){
var _32=_30;
if(_2f==="message"){
_32=function(_33){
if(_33.origin===undefined&&_33.uri!==undefined){
var uri=new URI(_33.uri);
delete uri.path;
delete uri.query;
delete uri.fragment;
_33.origin=uri.toString();
}
return _30(_33);
};
_30._$=_32;
}
addEventListener0.call(window,_2f,_32,_31);
};
var removeEventListener0=window.removeEventListener;
window.removeEventListener=function(_35,_36,_37){
var _38=_36;
if(_35==="message"){
_38=_36._$;
}
removeEventListener0.call(window,_35,_38,_37);
};
break;
}
function URI(str){
str=str||"";
var _3a=0;
var _3b=str.indexOf("://");
if(_3b!=-1){
this.scheme=str.slice(0,_3b);
_3a=_3b+3;
var _3c=str.indexOf("/",_3a);
if(_3c==-1){
_3c=str.length;
str+="/";
}
var _3d=str.slice(_3a,_3c);
this.authority=_3d;
_3a=_3c;
this.host=_3d;
var _3e=_3d.indexOf(":");
if(_3e!=-1){
this.host=_3d.slice(0,_3e);
this.port=parseInt(_3d.slice(_3e+1),10);
if(isNaN(this.port)){
throw new Error("Invalid URI syntax");
}
}
}
var _3f=str.indexOf("?",_3a);
if(_3f!=-1){
this.path=str.slice(_3a,_3f);
_3a=_3f+1;
}
var _40=str.indexOf("#",_3a);
if(_40!=-1){
if(_3f!=-1){
this.query=str.slice(_3a,_40);
}else{
this.path=str.slice(_3a,_40);
}
_3a=_40+1;
this.fragment=str.slice(_3a);
}else{
if(_3f!=-1){
this.query=str.slice(_3a);
}else{
this.path=str.slice(_3a);
}
}
};
(function(){
var _41=URI.prototype;
_41.toString=function(){
var sb=[];
var _43=this.scheme;
if(_43!==undefined){
sb.push(_43);
sb.push("://");
sb.push(this.host);
var _44=this.port;
if(_44!==undefined){
sb.push(":");
sb.push(_44.toString());
}
}
if(this.path!==undefined){
sb.push(this.path);
}
if(this.query!==undefined){
sb.push("?");
sb.push(this.query);
}
if(this.fragment!==undefined){
sb.push("#");
sb.push(this.fragment);
}
return sb.join("");
};
var _45={"http":80,"ws":80,"https":443,"wss":443};
URI.replaceProtocol=function(_46,_47){
var _48=_46.indexOf("://");
if(_48>0){
return _47+_46.substr(_48);
}else{
return "";
}
};
})();
(function(){
Base64={};
Base64.encode=function(_49){
var _4a=[];
var _4b;
var _4c;
var _4d;
while(_49.length){
switch(_49.length){
case 1:
_4b=_49.shift();
_4a.push(_4e[(_4b>>2)&63]);
_4a.push(_4e[((_4b<<4)&48)]);
_4a.push("=");
_4a.push("=");
break;
case 2:
_4b=_49.shift();
_4c=_49.shift();
_4a.push(_4e[(_4b>>2)&63]);
_4a.push(_4e[((_4b<<4)&48)|((_4c>>4)&15)]);
_4a.push(_4e[(_4c<<2)&60]);
_4a.push("=");
break;
default:
_4b=_49.shift();
_4c=_49.shift();
_4d=_49.shift();
_4a.push(_4e[(_4b>>2)&63]);
_4a.push(_4e[((_4b<<4)&48)|((_4c>>4)&15)]);
_4a.push(_4e[((_4c<<2)&60)|((_4d>>6)&3)]);
_4a.push(_4e[_4d&63]);
break;
}
}
return _4a.join("");
};
Base64.decode=function(_4f){
if(_4f.length===0){
return [];
}
if(_4f.length%4!==0){
throw new Error("Invalid base64 string (must be quads)");
}
var _50=[];
for(var i=0;i<_4f.length;i+=4){
var _52=_4f.charAt(i);
var _53=_4f.charAt(i+1);
var _54=_4f.charAt(i+2);
var _55=_4f.charAt(i+3);
var _56=_57[_52];
var _58=_57[_53];
var _59=_57[_54];
var _5a=_57[_55];
_50.push(((_56<<2)&252)|((_58>>4)&3));
if(_54!="="){
_50.push(((_58<<4)&240)|((_59>>2)&15));
if(_55!="="){
_50.push(((_59<<6)&192)|(_5a&63));
}
}
}
return _50;
};
var _4e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
var _57={"=":0};
for(var i=0;i<_4e.length;i++){
_57[_4e[i]]=i;
}
if(typeof (window.btoa)==="undefined"){
window.btoa=function(s){
var _5d=s.split("");
for(var i=0;i<_5d.length;i++){
_5d[i]=(_5d[i]).charCodeAt();
}
return Base64.encode(_5d);
};
window.atob=function(_5f){
var _60=Base64.decode(_5f);
for(var i=0;i<_60.length;i++){
_60[i]=String.fromCharCode(_60[i]);
}
return _60.join("");
};
}
})();
var postMessage0=(function(){
var _62=new URI((browser=="ie")?document.URL:location.href);
var _63={"http":80,"https":443};
if(_62.port==null){
_62.port=_63[_62.scheme];
_62.authority=_62.host+":"+_62.port;
}
var _64=_62.scheme+"://"+_62.authority;
var _65="/.kr";
if(typeof (postMessage)!=="undefined"){
return function(_66,_67,_68){
if(typeof (_67)!="string"){
throw new Error("Unsupported type. Messages must be strings");
}
if(_68==="null"){
_68="*";
}
switch(browser){
case "ie":
case "opera":
case "firefox":
setTimeout(function(){
_66.postMessage(_67,_68);
},0);
break;
default:
_66.postMessage(_67,_68);
break;
}
};
}else{
function MessagePipe(_69){
this.sourceToken=toPaddedHex(Math.floor(Math.random()*(Math.pow(2,32)-1)),8);
this.iframe=_69;
this.bridged=false;
this.lastWrite=0;
this.lastRead=0;
this.lastReadIndex=2;
this.lastSyn=0;
this.lastAck=0;
this.queue=[];
this.escapedFragments=[];
};
var _6a=MessagePipe.prototype;
_6a.attach=function(_6b,_6c,_6d,_6e,_6f,_70){
this.target=_6b;
this.targetOrigin=_6c;
this.targetToken=_6d;
this.reader=_6e;
this.writer=_6f;
this.writerURL=_70;
try{
this._lastHash=_6e.location.hash;
this.poll=pollLocationHash;
}
catch(permissionDenied){
this._lastDocumentURL=_6e.document.URL;
this.poll=pollDocumentURL;
}
if(_6b==parent){
dequeue(this,true);
}
};
_6a.detach=function(){
this.poll=function(){
};
delete this.target;
delete this.targetOrigin;
delete this.reader;
delete this.lastFragment;
delete this.writer;
delete this.writerURL;
};
_6a.poll=function(){
};
function pollLocationHash(){
var _71=this.reader.location.hash;
if(this._lastHash!=_71){
process(this,_71.substring(1));
this._lastHash=_71;
}
};
function pollDocumentURL(){
var _72=this.reader.document.URL;
if(this._lastDocumentURL!=_72){
var _73=_72.indexOf("#");
if(_73!=-1){
process(this,_72.substring(_73+1));
this._lastDocumentURL=_72;
}
}
};
_6a.post=function(_74,_75,_76){
bridgeIfNecessary(this,_74);
var _77=1000;
var _78=escape(_75);
var _79=[];
while(_78.length>_77){
var _7a=_78.substring(0,_77);
_78=_78.substring(_77);
_79.push(_7a);
}
_79.push(_78);
this.queue.push([_76,_79]);
if(this.writer!=null&&this.lastAck>=this.lastSyn){
dequeue(this,false);
}
};
function bridgeIfNecessary(_7b,_7c){
if(_7b.lastWrite<1&&!_7b.bridged){
if(_7c.parent==window){
var src=_7b.iframe.src;
var _7e=src.split("#");
var _7f=null;
var _80=document.getElementsByTagName("meta");
for(var i=0;i<_80.length;i++){
if(_80[i].name=="kaazing:resources"){
alert("kaazing:resources is no longer supported. Please refer to the Administrator's Guide section entitled \"Configuring a Web Server to Integrate with Kaazing Gateway\"");
}
}
var _82=_64;
var _83=_82.toString()+_65+"?.kr=xsp&.kv=10.05";
if(_7f){
var _84=new URI(_82.toString());
var _7e=_7f.split(":");
_84.host=_7e.shift();
if(_7e.length){
_84.port=_7e.shift();
}
_83=_84.toString()+_65+"?.kr=xsp&.kv=10.05";
}
for(var i=0;i<_80.length;i++){
if(_80[i].name=="kaazing:postMessageBridgeURL"){
var _85=_80[i].content;
var _86=new URI(_85);
var _87=new URI(location.toString());
if(!_86.authority){
_86.host=_87.host;
_86.port=_87.port;
_86.scheme=_87.scheme;
if(_85.indexOf("/")!=0){
var _88=_87.path.split("/");
_88.pop();
_88.push(_85);
_86.path=_88.join("/");
}
}
postMessage0.BridgeURL=_86.toString();
}
}
if(postMessage0.BridgeURL){
_83=postMessage0.BridgeURL;
}
var _89=["I",_82,_7b.sourceToken,escape(_83)];
if(_7e.length>1){
var _8a=_7e[1];
_89.push(escape(_8a));
}
_7e[1]=_89.join("!");
setTimeout(function(){
_7c.location.replace(_7e.join("#"));
},200);
_7b.bridged=true;
}
}
};
function flush(_8b,_8c){
var _8d=_8b.writerURL+"#"+_8c;
_8b.writer.location.replace(_8d);
};
function fromHex(_8e){
return parseInt(_8e,16);
};
function toPaddedHex(_8f,_90){
var hex=_8f.toString(16);
var _92=[];
_90-=hex.length;
while(_90-->0){
_92.push("0");
}
_92.push(hex);
return _92.join("");
};
function dequeue(_93,_94){
var _95=_93.queue;
var _96=_93.lastRead;
if((_95.length>0||_94)&&_93.lastSyn>_93.lastAck){
var _97=_93.lastFrames;
var _98=_93.lastReadIndex;
if(fromHex(_97[_98])!=_96){
_97[_98]=toPaddedHex(_96,8);
flush(_93,_97.join(""));
}
}else{
if(_95.length>0){
var _99=_95.shift();
var _9a=_99[0];
if(_9a=="*"||_9a==_93.targetOrigin){
_93.lastWrite++;
var _9b=_99[1];
var _9c=_9b.shift();
var _9d=3;
var _97=[_93.targetToken,toPaddedHex(_93.lastWrite,8),toPaddedHex(_96,8),"F",toPaddedHex(_9c.length,4),_9c];
var _98=2;
if(_9b.length>0){
_97[_9d]="f";
_93.queue.unshift(_99);
}
if(_93.resendAck){
var _9e=[_93.targetToken,toPaddedHex(_93.lastWrite-1,8),toPaddedHex(_96,8),"a"];
_97=_9e.concat(_97);
_98+=_9e.length;
}
flush(_93,_97.join(""));
_93.lastFrames=_97;
_93.lastReadIndex=_98;
_93.lastSyn=_93.lastWrite;
_93.resendAck=false;
}
}else{
if(_94){
_93.lastWrite++;
var _97=[_93.targetToken,toPaddedHex(_93.lastWrite,8),toPaddedHex(_96,8),"a"];
var _98=2;
if(_93.resendAck){
var _9e=[_93.targetToken,toPaddedHex(_93.lastWrite-1,8),toPaddedHex(_96,8),"a"];
_97=_9e.concat(_97);
_98+=_9e.length;
}
flush(_93,_97.join(""));
_93.lastFrames=_97;
_93.lastReadIndex=_98;
_93.resendAck=true;
}
}
}
};
function process(_9f,_a0){
var _a1=_a0.substring(0,8);
var _a2=fromHex(_a0.substring(8,16));
var _a3=fromHex(_a0.substring(16,24));
var _a4=_a0.charAt(24);
if(_a1!=_9f.sourceToken){
throw new Error("postMessage emulation tampering detected");
}
var _a5=_9f.lastRead;
var _a6=_a5+1;
if(_a2==_a6){
_9f.lastRead=_a6;
}
if(_a2==_a6||_a2==_a5){
_9f.lastAck=_a3;
}
if(_a2==_a6||(_a2==_a5&&_a4=="a")){
switch(_a4){
case "f":
var _a7=_a0.substr(29,fromHex(_a0.substring(25,29)));
_9f.escapedFragments.push(_a7);
dequeue(_9f,true);
break;
case "F":
var _a8=_a0.substr(29,fromHex(_a0.substring(25,29)));
if(_9f.escapedFragments!==undefined){
_9f.escapedFragments.push(_a8);
_a8=_9f.escapedFragments.join("");
_9f.escapedFragments=[];
}
var _a9=unescape(_a8);
dispatch(_a9,_9f.target,_9f.targetOrigin);
dequeue(_9f,true);
break;
case "a":
if(_a0.length>25){
process(_9f,_a0.substring(25));
}else{
dequeue(_9f,false);
}
break;
default:
throw new Error("unknown postMessage emulation payload type: "+_a4);
}
}
};
function dispatch(_aa,_ab,_ac){
var _ad=document.createEvent("Events");
_ad.initEvent("message",false,true);
_ad.data=_aa;
_ad.origin=_ac;
_ad.source=_ab;
dispatchEvent(_ad);
};
var _ae={};
var _af=[];
function pollReaders(){
for(var i=0,len=_af.length;i<len;i++){
var _b2=_af[i];
_b2.poll();
}
setTimeout(pollReaders,20);
};
function findMessagePipe(_b3){
if(_b3==parent){
return _ae["parent"];
}else{
if(_b3.parent==window){
var _b4=document.getElementsByTagName("iframe");
for(var i=0;i<_b4.length;i++){
var _b6=_b4[i];
if(_b3==_b6.contentWindow){
return supplyIFrameMessagePipe(_b6);
}
}
}else{
throw new Error("Generic peer postMessage not yet implemented");
}
}
};
function supplyIFrameMessagePipe(_b7){
var _b8=_b7._name;
if(_b8===undefined){
_b8="iframe$"+String(Math.random()).substring(2);
_b7._name=_b8;
}
var _b9=_ae[_b8];
if(_b9===undefined){
_b9=new MessagePipe(_b7);
_ae[_b8]=_b9;
}
return _b9;
};
function postMessage0(_ba,_bb,_bc){
if(typeof (_bb)!="string"){
throw new Error("Unsupported type. Messages must be strings");
}
if(_ba==window){
if(_bc=="*"||_bc==_64){
dispatch(_bb,window,_64);
}
}else{
var _bd=findMessagePipe(_ba);
_bd.post(_ba,_bb,_bc);
}
};
postMessage0.attach=function(_be,_bf,_c0,_c1,_c2,_c3){
var _c4=findMessagePipe(_be);
_c4.attach(_be,_bf,_c0,_c1,_c2,_c3);
_af.push(_c4);
};
var _c5=function(_c6){
var _c7=new URI((browser=="ie")?document.URL:location.href);
var _c8;
var _c9={"http":80,"https":443};
if(_c7.port==null){
_c7.port=_c9[_c7.scheme];
_c7.authority=_c7.host+":"+_c7.port;
}
var _ca=unescape(_c7.fragment||"");
if(_ca.length>0){
var _cb=_ca.split(",");
var _cc=_cb.shift();
var _cd=_cb.shift();
var _ce=_cb.shift();
var _cf=_c7.scheme+"://"+document.domain+":"+_c7.port;
var _d0=_c7.scheme+"://"+_c7.authority;
var _d1=_cc+"/.kr?.kr=xsc&.kv=10.05";
var _d2=document.location.toString().split("#")[0];
var _d3=_d1+"#"+escape([_cf,_cd,escape(_d2)].join(","));
if(typeof (ActiveXObject)!="undefined"){
_c8=new ActiveXObject("htmlfile");
_c8.open();
try{
_c8.parentWindow.opener=window;
}
catch(domainError){
if(_c6){
_c8.domain=_c6;
}
_c8.parentWindow.opener=window;
}
_c8.write("<html>");
_c8.write("<body>");
if(_c6){
_c8.write("<script>CollectGarbage();document.domain='"+_c6+"';</"+"script>");
}
_c8.write("<iframe src=\""+_d1+"\"></iframe>");
_c8.write("</body>");
_c8.write("</html>");
_c8.close();
var _d4=_c8.body.lastChild;
var _d5=_c8.parentWindow;
var _d6=parent;
var _d7=_d6.parent.postMessage0;
if(typeof (_d7)!="undefined"){
_d4.onload=function(){
var _d8=_d4.contentWindow;
_d8.location.replace(_d3);
_d7.attach(_d6,_cc,_ce,_d5,_d8,_d1);
};
}
}else{
var _d4=document.createElement("iframe");
_d4.src=_d3;
document.body.appendChild(_d4);
var _d5=window;
var _d9=_d4.contentWindow;
var _d6=parent;
var _d7=_d6.parent.postMessage0;
if(typeof (_d7)!="undefined"){
_d7.attach(_d6,_cc,_ce,_d5,_d9,_d1);
}
}
}
window.onunload=function(){
try{
var _da=window.parent.parent.postMessage0;
if(typeof (_da)!="undefined"){
_da.detach(_d6);
}
}
catch(permissionDenied){
}
if(typeof (_c8)!=="undefined"){
_c8.parentWindow.opener=null;
_c8.open();
_c8.close();
_c8=null;
CollectGarbage();
}
};
};
postMessage0.__init__=function(_db,_dc){
var _dd=_c5.toString();
_db.URI=URI;
_db.browser=browser;
if(!_dc){
_dc="";
}
_db.setTimeout("("+_dd+")('"+_dc+"')",0);
};
postMessage0.bridgeURL=false;
postMessage0.detach=function(_de){
var _df=findMessagePipe(_de);
for(var i=0;i<_af.length;i++){
if(_af[i]==_df){
_af.splice(i,1);
}
}
_df.detach();
};
if(window!=top){
_ae["parent"]=new MessagePipe();
function initializeAsTargetIfNecessary(){
var _e1=new URI((browser=="ie")?document.URL:location.href);
var _e2=_e1.fragment||"";
if(document.body!=null&&_e2.length>0&&_e2.charAt(0)=="I"){
var _e3=unescape(_e2);
var _e4=_e3.split("!");
if(_e4.shift()=="I"){
var _e5=_e4.shift();
var _e6=_e4.shift();
var _e7=unescape(_e4.shift());
var _e8=_64;
if(_e5==_e8){
try{
parent.location.hash;
}
catch(permissionDenied){
document.domain=document.domain;
}
}
var _e9=_e4.shift()||"";
switch(browser){
case "firefox":
location.replace([location.href.split("#")[0],_e9].join("#"));
break;
default:
location.hash=_e9;
break;
}
var _ea=findMessagePipe(parent);
_ea.targetToken=_e6;
var _eb=_ea.sourceToken;
var _ec=_e7+"#"+escape([_e8,_e6,_eb].join(","));
var _ed;
_ed=document.createElement("iframe");
_ed.src=_ec;
_ed.style.position="absolute";
_ed.style.left="-10px";
_ed.style.top="10px";
_ed.style.visibility="hidden";
_ed.style.width="0px";
_ed.style.height="0px";
document.body.appendChild(_ed);
return;
}
}
setTimeout(initializeAsTargetIfNecessary,20);
};
initializeAsTargetIfNecessary();
}
var _ee=document.getElementsByTagName("meta");
for(var i=0;i<_ee.length;i++){
if(_ee[i].name==="kaazing:postMessage"){
if("immediate"==_ee[i].content){
var _f0=function(){
var _f1=document.getElementsByTagName("iframe");
for(var i=0;i<_f1.length;i++){
var _f3=_f1[i];
if(_f3.style["KaaPostMessage"]=="immediate"){
_f3.style["KaaPostMessage"]="none";
var _f4=supplyIFrameMessagePipe(_f3);
bridgeIfNecessary(_f4,_f3.contentWindow);
}
}
setTimeout(_f0,20);
};
setTimeout(_f0,20);
}
break;
}
}
for(var i=0;i<_ee.length;i++){
if(_ee[i].name==="kaazing:postMessagePrefix"){
var _f5=_ee[i].content;
if(_f5!=null&&_f5.length>0){
if(_f5.charAt(0)!="/"){
_f5="/"+_f5;
}
_65=_f5;
}
}
}
setTimeout(pollReaders,20);
return postMessage0;
}
})();
var XDRHttpDirect=(function(){
var id=0;
function XDRHttpDirect(_f7){
this.outer=_f7;
};
var _f8=XDRHttpDirect.prototype;
_f8.open=function(_f9,_fa){
var _fb=this;
var xhr=this.outer;
xhr.responseText="";
var _fd=2;
var _fe=0;
var _ff=0;
this._method=_f9;
this._location=_fa;
if(_fa.indexOf("?")==-1){
_fa+="?.kac=ex&.kct=application/x-message-http";
}else{
_fa+="&.kac=ex&.kct=application/x-message-http";
}
this.location=_fa;
var xdr=this.xdr=new XDomainRequest();
var _101=function(e){
try{
var _103=xdr.responseText;
if(_fd<=2){
var _104=_103.indexOf("\r\n\r\n");
if(_104==-1){
return;
}
var _105=_103.indexOf("\r\n");
var _106=_103.substring(0,_105);
var _107=_106.match(/HTTP\/1\.\d\s(\d+)\s([^\r\n]+)/);
xhr.status=parseInt(_107[1]);
xhr.statusText=_107[2];
var _108=_105+2;
_ff=_104+4;
var _109=_103.substring(_108,_104).split("\r\n");
xhr._responseHeaders={};
for(var i=0;i<_109.length;i++){
var _10b=_109[i].split(":");
if(_10b.length>1){
xhr._responseHeaders[_10b[0].replace(/^\s+|\s+$/g,"")]=_10b[1].replace(/^\s+|\s+$/g,"");
}
}
_fe=_ff;
_fd=xhr.readyState=3;
if(typeof (_fb.onreadystatechange)=="function"){
_fb.onreadystatechange(xhr);
}
}
var _10c=xdr.responseText.length;
if(_10c>_fe){
xhr.responseText=_103.slice(_ff);
_fe=_10c;
if(typeof (_fb.onprogress)=="function"){
_fb.onprogress(xhr);
}
}else{
}
}
catch(e1){
_fb.onload(xhr);
}
};
xdr.onprogress=_101;
xdr.onerror=function(e){
xhr.readyState=0;
if(typeof (xhr.onerror)=="function"){
xhr.onerror(xhr);
}
};
xdr.onload=function(e){
if(_fd<=3){
_101(e);
}
reayState=xhr.readyState=4;
if(typeof (xhr.onreadystatechange)=="function"){
xhr.onreadystatechange(xhr);
}
if(typeof (xhr.onload)=="function"){
xhr.onload(xhr);
}
};
xdr.ontimeout=function(e){
if(typeof (xhr.ontimeout)=="function"){
xhr.ontimeout(xhr);
}
};
xdr.open("POST",_fa);
xdr.timeout=30000;
};
_f8.send=function(_110){
var _111=this._method+" "+this.location.substring(this.location.indexOf("/",9),this.location.indexOf("&.kct"))+" HTTP/1.1\r\n";
for(var i=0;i<this.outer._requestHeaders.length;i++){
_111+=this.outer._requestHeaders[i][0]+": "+this.outer._requestHeaders[i][1]+"\r\n";
}
var _113=_110||"";
if(_113.length>0||this._method.toUpperCase()==="POST"){
var len=0;
for(var i=0;i<_113.length;i++){
len++;
if(_113.charCodeAt(i)>=128){
len++;
}
}
_111+="Content-Length: "+len+"\r\n";
}
_111+="\r\n";
_111+=_113;
this.xdr.send(_111);
};
_f8.abort=function(){
this.xdr.abort();
};
return XDRHttpDirect;
})();
var XMLHttpBridge=(function(){
var _115={"http":80,"https":443};
var _116=location.protocol.replace(":","");
var _117=location.port;
if(_117==null){
_117=_115[_116];
}
var _118=_116+"://"+location.hostname+":"+_117;
var _119={};
var _11a={};
var _11b=0;
function XMLHttpBridge(_11c){
this.outer=_11c;
};
var _11d=XMLHttpBridge.prototype;
_11d.open=function(_11e,_11f){
var id=register(this);
var pipe=supplyPipe(this,_11f);
pipe.attach(id);
this._pipe=pipe;
this._method=_11e;
this._location=_11f;
this.outer.readyState=1;
this.outer.status=0;
this.outer.statusText="";
this.outer.responseText="";
var _122=this;
setTimeout(function(){
_122.outer.readyState=1;
onreadystatechange(_122);
},0);
};
_11d.send=function(_123){
doSend(this,_123);
};
_11d.abort=function(){
var pipe=this._pipe;
if(pipe!==undefined){
pipe.post(["a",this._id].join(""));
pipe.detach(this._id);
}
};
function onreadystatechange(_125){
if(typeof (_125.onreadystatechange)!=="undefined"){
_125.onreadystatechange(_125.outer);
}
switch(_125.outer.readyState){
case 3:
if(typeof (_125.onprogress)!=="undefined"){
_125.onprogress(_125.outer);
}
break;
case 4:
if(_125.outer.status<100||_125.outer.status>=500){
if(typeof (_125.onerror)!=="undefined"){
_125.onerror(_125.outer);
}
}else{
if(typeof (_125.onprogress)!=="undefined"){
_125.onprogress(_125.outer);
}
if(typeof (_125.onload)!=="undefined"){
_125.onload(_125.outer);
}
}
break;
}
};
function fromHex(_126){
return parseInt(_126,16);
};
function toPaddedHex(_127,_128){
var hex=_127.toString(16);
var _12a=[];
_128-=hex.length;
while(_128-->0){
_12a.push("0");
}
_12a.push(hex);
return _12a.join("");
};
function register(_12b){
var id=toPaddedHex(_11b++,8);
_11a[id]=_12b;
_12b._id=id;
return id;
};
function doSend(_12d,_12e){
if(typeof (_12e)!=="string"){
_12e="";
}
var _12f=_12d._method.substring(0,10);
var _130=_12d._location;
var _131=_12d.outer._requestHeaders;
var _132=toPaddedHex(_12d.outer.timeout,4);
var _133=(_12d.outer.onprogress!==undefined)?"t":"f";
var _134=["s",_12d._id,_12f.length,_12f,toPaddedHex(_130.length,4),_130,toPaddedHex(_131.length,4)];
for(var i=0;i<_131.length;i++){
var _136=_131[i];
_134.push(toPaddedHex(_136[0].length,4));
_134.push(_136[0]);
_134.push(toPaddedHex(_136[1].length,4));
_134.push(_136[1]);
}
_134.push(toPaddedHex(_12e.length,8),_12e,toPaddedHex(_132,4),_133);
_12d._pipe.post(_134.join(""));
};
function supplyPipe(_137,_138){
var uri=new URI(_138);
var _13a=(uri.scheme!=null&&uri.authority!=null);
var _13b=_13a?uri.scheme:_116;
var _13c=_13a?uri.authority:_118;
if(_13c!=null&&uri.port==null){
_13c=uri.host+":"+_115[_13b];
}
var _13d=_13b+"://"+_13c;
var pipe=_119[_13d];
if(pipe!==undefined){
if(!("iframe" in pipe&&"contentWindow" in pipe.iframe&&typeof pipe.iframe.contentWindow=="object")){
pipe=_119[_13d]=undefined;
}
}
if(pipe===undefined){
var _13f=document.createElement("iframe");
_13f.style.position="absolute";
_13f.style.left="-10px";
_13f.style.top="10px";
_13f.style.visibility="hidden";
_13f.style.width="0px";
_13f.style.height="0px";
var _140=new URI(_13d);
_140.query=".kr=xs";
_140.path="/";
_13f.src=_140.toString();
function post(_141){
this.buffer.push(_141);
};
function attach(id){
var _143=this.attached[id];
if(_143===undefined){
_143={};
this.attached[id]=_143;
}
if(_143.timerID!==undefined){
clearTimeout(_143.timerID);
delete _143.timerID;
}
};
function detach(id){
var _145=this.attached[id];
if(_145!==undefined&&_145.timerID===undefined){
var _146=this;
_145.timerID=setTimeout(function(){
delete _146.attached[id];
var xhr=_11a[id];
if(xhr._pipe==pipe){
delete _11a[id];
delete xhr._id;
delete xhr._pipe;
}
postMessage0(pipe.iframe.contentWindow,["d",id].join(""),pipe.targetOrigin);
},0);
}
};
pipe={"targetOrigin":_13d,"iframe":_13f,"buffer":[],"post":post,"attach":attach,"detach":detach,"attached":{count:0}};
_119[_13d]=pipe;
function sendInitWhenReady(){
var _148=_13f.contentWindow;
if(!_148){
setTimeout(sendInitWhenReady,20);
}else{
postMessage0(_148,"I",_13d);
}
};
pipe.handshakeID=setTimeout(function(){
_119[_13d]=undefined;
pipe.post=function(_149){
_137.readyState=4;
_137.status=0;
onreadystatechange(_137);
};
if(pipe.buffer.length>0){
pipe.post();
}
},30000);
document.body.appendChild(_13f);
if(typeof (postMessage)==="undefined"){
sendInitWhenReady();
}
}
return pipe;
};
function onmessage(_14a){
var _14b=_14a.origin;
var _14c={"http":":80","https":":443"};
var _14d=_14b.split(":");
if(_14d.length===2){
_14b+=_14c[_14d[0]];
}
var pipe=_119[_14b];
if(pipe!==undefined&&pipe.iframe!==undefined&&_14a.source==pipe.iframe.contentWindow){
if(_14a.data=="I"){
clearTimeout(pipe.handshakeID);
var _14f;
while((_14f=pipe.buffer.shift())!==undefined){
postMessage0(pipe.iframe.contentWindow,_14f,pipe.targetOrigin);
}
pipe.post=function(_150){
postMessage0(pipe.iframe.contentWindow,_150,pipe.targetOrigin);
};
}else{
var _14f=_14a.data;
if(_14f.length>=9){
var _151=0;
var type=_14f.substring(_151,_151+=1);
var id=_14f.substring(_151,_151+=8);
var _154=_11a[id];
if(_154!==undefined){
switch(type){
case "r":
var _155={};
var _156=fromHex(_14f.substring(_151,_151+=2));
for(var i=0;i<_156;i++){
var _158=fromHex(_14f.substring(_151,_151+=4));
var _159=_14f.substring(_151,_151+=_158);
var _15a=fromHex(_14f.substring(_151,_151+=4));
var _15b=_14f.substring(_151,_151+=_15a);
_155[_159]=_15b;
}
var _15c=fromHex(_14f.substring(_151,_151+=4));
var _15d=fromHex(_14f.substring(_151,_151+=2));
var _15e=_14f.substring(_151,_151+=_15d);
switch(_15c){
case 301:
case 302:
case 307:
var _15f=_155["Location"];
var _160=_14a.origin;
if(typeof (_154.outer.onredirectallowed)==="function"){
if(!_154.outer.onredirectallowed(_160,_15f)){
return;
}
}
var id=register(_154);
var pipe=supplyPipe(_154,_15f);
pipe.attach(id);
_154._pipe=pipe;
_154._method="GET";
_154._location=_15f;
_154._redirect=true;
break;
case 403:
_154.outer.status=_15c;
onreadystatechange(_154);
break;
default:
_154.outer._responseHeaders=_155;
_154.outer.status=_15c;
_154.outer.statusText=_15e;
break;
}
break;
case "p":
var _161=parseInt(_14f.substring(_151,_151+=1));
if(_154._id===id){
_154.outer.readyState=_161;
var _162=fromHex(_14f.substring(_151,_151+=8));
var _163=_14f.substring(_151,_151+=_162);
if(_163.length>0){
_154.outer.responseText+=_163;
}
onreadystatechange(_154);
}else{
if(_154._redirect){
_154._redirect=false;
doSend(_154,"");
}
}
if(_161==4){
pipe.detach(id);
}
break;
case "e":
if(_154._id===id){
_154.outer.status=0;
_154.outer.statusText="";
_154.outer.readyState=4;
onreadystatechange(_154);
}
pipe.detach(id);
break;
case "t":
if(_154._id===id){
_154.outer.status=0;
_154.outer.statusText="";
_154.outer.readyState=4;
if(typeof (_154.ontimeout)!=="undefined"){
_154.ontimeout();
}
}
pipe.detach(id);
break;
}
}
}
}
}else{
}
};
window.addEventListener("message",onmessage,false);
return XMLHttpBridge;
})();
var XMLHttpRequest0=(function(){
var _164=location.protocol.replace(":","");
var _165={"http":80,"https":443};
var _166=location.port;
if(_166==null){
_166=_165[_164];
}
var _167=location.hostname+":"+_166;
function onreadystatechange(_168){
if(typeof (_168.onreadystatechange)!=="undefined"){
_168.onreadystatechange();
}
};
function onprogress(_169){
if(typeof (_169.onprogress)!=="undefined"){
_169.onprogress();
}
};
function onerror(_16a){
if(typeof (_16a.onerror)!=="undefined"){
_16a.onerror();
}
};
function onload(_16b){
if(typeof (_16b.onload)!=="undefined"){
_16b.onload();
}
};
function XMLHttpRequest0(){
this._requestHeaders=[];
this.responseHeaders={};
this.withCredentials=false;
};
var _16c=XMLHttpRequest0.prototype;
_16c.readyState=0;
_16c.responseText="";
_16c.status=0;
_16c.statusText="";
_16c.timeout=0;
_16c.onreadystatechange;
_16c.onerror;
_16c.onload;
_16c.onprogress;
_16c.onredirectallowed;
_16c.open=function(_16d,_16e,_16f){
if(!_16f){
throw new Error("Asynchronous is required for cross-origin XMLHttpRequest emulation");
}
switch(this.readyState){
case 0:
case 4:
break;
default:
throw new Error("Invalid ready state");
}
var _170=this;
this._method=_16d;
this._location=_16e;
this.readyState=1;
this.status=0;
this.statusText="";
this.responseText="";
var xhr;
var _172=new URI(_16e);
if(_172.port==null){
_172.port=_165[_172.scheme];
_172.authority=_172.host+":"+_172.port;
}
if(browser=="ie"&&typeof (XDomainRequest)!=="undefined"&&_172.scheme==_164&&!this.withCredentials){
xhr=new XDRHttpDirect(this);
}else{
if(_172.scheme==_164&&_172.authority==_167){
try{
xhr=new XMLHttpBridge(this);
}
catch(e){
xhr=new XMLHttpBridge(this);
}
}else{
xhr=new XMLHttpBridge(this);
}
}
xhr.onload=onload;
xhr.onprogress=onprogress;
xhr.onreadystatechange=onreadystatechange;
xhr.onerror=onerror;
xhr.open(_16d,_16e);
this.xhr=xhr;
setTimeout(function(){
if(_170.readyState>1){
return;
}
if(_170.readyState<1){
_170.readyState=1;
}
onreadystatechange(_170);
},0);
};
_16c.setRequestHeader=function(_173,_174){
if(this.readyState!==1){
throw new Error("Invalid ready state");
}
this._requestHeaders.push([_173,_174]);
};
_16c.send=function(_175){
if(this.readyState!==1){
throw new Error("Invalid ready state");
}
var _176=this;
setTimeout(function(){
if(_176.readyState>2){
return;
}
if(_176.readyState<2){
_176.readyState=2;
}
onreadystatechange(_176);
},0);
this.xhr.send(_175);
};
_16c.abort=function(){
this.xhr.abort();
};
_16c.getResponseHeader=function(_177){
if(this.status==0){
throw new Error("Invalid ready state");
}
var _178=this._responseHeaders;
return _178[_177];
};
_16c.getAllResponseHeaders=function(){
if(this.status==0){
throw new Error("Invalid ready state");
}
return this._responseHeaders;
};
return XMLHttpRequest0;
})();
ByteOrder=function(){
};
(function(){
var _179=ByteOrder.prototype;
_179.toString=function(){
throw new Error("Abstract");
};
var _17a=function(v){
return (v&255);
};
var _17c=function(_17d){
return (_17d&128)?(_17d|-256):_17d;
};
var _17e=function(v){
return [((v>>8)&255),(v&255)];
};
var _180=function(_181,_182){
return (_17c(_181)<<8)|(_182&255);
};
var _183=function(_184,_185){
return ((_184&255)<<8)|(_185&255);
};
var _186=function(_187,_188,_189){
return ((_187&255)<<16)|((_188&255)<<8)|(_189&255);
};
var _18a=function(v){
return [((v>>16)&255),((v>>8)&255),(v&255)];
};
var _18c=function(_18d,_18e,_18f){
return ((_18d&255)<<16)|((_18e&255)<<8)|(_18f&255);
};
var _190=function(v){
return [((v>>24)&255),((v>>16)&255),((v>>8)&255),(v&255)];
};
var _192=function(_193,_194,_195,_196){
return (_17c(_193)<<24)|((_194&255)<<16)|((_195&255)<<8)|(_196&255);
};
var _197=function(_198,_199,_19a,_19b){
var _19c=_183(_198,_199);
var _19d=_183(_19a,_19b);
return (_19c*65536+_19d);
};
ByteOrder.BIG_ENDIAN=(function(){
var _19e=function(){
};
_19e.prototype=new ByteOrder();
var _19f=_19e.prototype;
_19f._toUnsignedByte=_17a;
_19f._toByte=_17c;
_19f._fromShort=_17e;
_19f._toShort=_180;
_19f._toUnsignedShort=_183;
_19f._toUnsignedMediumInt=_186;
_19f._fromMediumInt=_18a;
_19f._toMediumInt=_18c;
_19f._fromInt=_190;
_19f._toInt=_192;
_19f._toUnsignedInt=_197;
_19f.toString=function(){
return "<ByteOrder.BIG_ENDIAN>";
};
return new _19e();
})();
ByteOrder.LITTLE_ENDIAN=(function(){
var _1a0=function(){
};
_1a0.prototype=new ByteOrder();
var _1a1=_1a0.prototype;
_1a1._toByte=_17c;
_1a1._toUnsignedByte=_17a;
_1a1._fromShort=function(v){
return _17e(v).reverse();
};
_1a1._toShort=function(_1a3,_1a4){
return _180(_1a4,_1a3);
};
_1a1._toUnsignedShort=function(_1a5,_1a6){
return _183(_1a6,_1a5);
};
_1a1._toUnsignedMediumInt=function(_1a7,_1a8,_1a9){
return _186(_1a9,_1a8,_1a7);
};
_1a1._fromMediumInt=function(v){
return _18a(v).reverse();
};
_1a1._toMediumInt=function(_1ab,_1ac,_1ad,_1ae,_1af,_1b0){
return _18c(_1b0,_1af,_1ae,_1ad,_1ac,_1ab);
};
_1a1._fromInt=function(v){
return _190(v).reverse();
};
_1a1._toInt=function(_1b2,_1b3,_1b4,_1b5){
return _192(_1b5,_1b4,_1b3,_1b2);
};
_1a1._toUnsignedInt=function(_1b6,_1b7,_1b8,_1b9){
return _197(_1b9,_1b8,_1b7,_1b6);
};
_1a1.toString=function(){
return "<ByteOrder.LITTLE_ENDIAN>";
};
return new _1a0();
})();
})();
function ByteBuffer(_1ba){
this.array=_1ba||[];
this._mark=-1;
this.limit=this.capacity=this.array.length;
this.order=ByteOrder.BIG_ENDIAN;
};
(function(){
ByteBuffer.allocate=function(_1bb){
var buf=new ByteBuffer();
buf.capacity=_1bb;
buf.limit=_1bb;
return buf;
};
ByteBuffer.wrap=function(_1bd){
return new ByteBuffer(_1bd);
};
var _1be=ByteBuffer.prototype;
_1be.autoExpand=true;
_1be.capacity=0;
_1be.position=0;
_1be.limit=0;
_1be.order=ByteOrder.BIG_ENDIAN;
_1be.array=[];
_1be.mark=function(){
this._mark=this.position;
return this;
};
_1be.reset=function(){
var m=this._mark;
if(m<0){
throw new Error("Invalid mark");
}
this.position=m;
return this;
};
_1be.compact=function(){
this.array.splice(0,this.position);
this.limit-=this.position;
this.position=0;
return this;
};
_1be.duplicate=function(){
var buf=new ByteBuffer(this.array);
buf.position=this.position;
buf.limit=this.limit;
buf.capacity=this.capacity;
return buf;
};
_1be.fill=function(size){
_autoExpand(this,size);
while(size-->0){
this.put(0);
}
return this;
};
_1be.fillWith=function(b,size){
_autoExpand(this,size);
while(size-->0){
this.put(b);
}
return this;
};
_1be.indexOf=function(b){
var _1c5=this.limit;
var _1c6=this.array;
for(var i=this.position;i<_1c5;i++){
if(_1c6[i]==b){
return i;
}
}
return -1;
};
_1be.put=function(v){
_autoExpand(this,1);
this.array[this.position++]=v&255;
return this;
};
_1be.putAt=function(_1c9,v){
_checkForWriteAt(this,_1c9,1);
this.array[_1c9]=v&255;
return this;
};
_1be.putUnsigned=function(v){
_autoExpand(this,1);
this.array[this.position++]=v&255;
return this;
};
_1be.putUnsignedAt=function(_1cc,v){
_checkForWriteAt(this,_1cc,1);
this.array[_1cc]=v&255;
return this;
};
_1be.putShort=function(v){
_autoExpand(this,2);
_putBytesInternal(this,this.position,this.order._fromShort(v));
this.position+=2;
return this;
};
_1be.putShortAt=function(_1cf,v){
_checkForWriteAt(this,_1cf,2);
_putBytesInternal(this,_1cf,this.order._fromShort(v));
return this;
};
_1be.putUnsignedShort=function(v){
_autoExpand(this,2);
_putBytesInternal(this,this.position,this.order._fromShort(v&65535));
this.position+=2;
return this;
};
_1be.putUnsignedShortAt=function(_1d2,v){
_checkForWriteAt(this,_1d2,2);
_putBytesInternal(this,_1d2,this.order._fromShort(v&65535));
return this;
};
_1be.putMediumInt=function(v){
_autoExpand(this,3);
this.putMediumIntAt(this.position,v);
this.position+=3;
return this;
};
_1be.putMediumIntAt=function(_1d5,v){
this.putBytesAt(_1d5,this.order._fromMediumInt(v));
return this;
};
_1be.putInt=function(v){
_autoExpand(this,4);
_putBytesInternal(this,this.position,this.order._fromInt(v));
this.position+=4;
return this;
};
_1be.putIntAt=function(_1d8,v){
_checkForWriteAt(this,_1d8,4);
_putBytesInternal(this,_1d8,this.order._fromInt(v));
return this;
};
_1be.putUnsignedInt=function(v){
_autoExpand(this,4);
this.putUnsignedIntAt(this.position,v&4294967295);
this.position+=4;
return this;
};
_1be.putUnsignedIntAt=function(_1db,v){
_checkForWriteAt(this,_1db,4);
this.putIntAt(_1db,v&4294967295);
return this;
};
_1be.putString=function(v,cs){
cs.encode(v,this);
return this;
};
_1be.putPrefixedString=function(_1df,v,cs){
if(typeof (cs)==="undefined"||typeof (cs.encode)==="undefined"){
throw new Error("ByteBuffer.putPrefixedString: character set parameter missing");
}
if(_1df===0){
return this;
}
_autoExpand(this,_1df);
var len=v.length;
switch(_1df){
case 1:
this.put(len);
break;
case 2:
this.putShort(len);
break;
case 4:
this.putInt(len);
break;
}
cs.encode(v,this);
return this;
};
function _putBytesInternal(_1e3,_1e4,v){
var _1e6=_1e3.array;
for(var i=0;i<v.length;i++){
_1e6[i+_1e4]=v[i]&255;
}
};
_1be.putBytes=function(v){
_autoExpand(this,v.length);
_putBytesInternal(this,this.position,v);
this.position+=v.length;
return this;
};
_1be.putBytesAt=function(_1e9,v){
_checkForWriteAt(this,_1e9,v.length);
_putBytesInternal(this,_1e9,v);
return this;
};
_1be.putByteArray=function(v){
_autoExpand(this,v.byteLength);
var u=new Uint8Array(v);
for(var i=0;i<u.byteLength;i++){
this.putAt(this.position+i,u[i]&255);
}
this.position+=v.byteLength;
return this;
};
_1be.putBuffer=function(v){
var len=v.remaining();
_autoExpand(this,len);
var _1f0=v.array;
var _1f1=v.position;
var _1f2=this.position;
for(var i=0;i<len;i++){
this.array[i+_1f2]=_1f0[i+_1f1];
}
this.position+=len;
return this;
};
_1be.putBufferAt=function(_1f4,v){
var len=v.remaining();
_autoExpand(this,len);
var _1f7=v.array;
var _1f8=v.position;
var _1f9=this.position;
for(var i=0;i<len;i++){
this.array[i+_1f9]=_1f7[i+_1f8];
}
return this;
};
_1be.get=function(){
_checkForRead(this,1);
return this.order._toByte(this.array[this.position++]);
};
_1be.getAt=function(_1fb){
_checkForReadAt(this,_1fb,1);
return this.order._toByte(this.array[_1fb]);
};
_1be.getUnsigned=function(){
_checkForRead(this,1);
var val=this.order._toUnsignedByte(this.array[this.position++]);
return val;
};
_1be.getUnsignedAt=function(_1fd){
_checkForReadAt(this,_1fd,1);
return this.order._toUnsignedByte(this.array[_1fd]);
};
_1be.getBytes=function(size){
_checkForRead(this,size);
var _1ff=new Array();
for(var i=0;i<size;i++){
_1ff.push(this.order._toByte(this.array[i+this.position]));
}
this.position+=size;
return _1ff;
};
_1be.getBytesAt=function(_201,size){
_checkForReadAt(this,_201,size);
var _203=new Array();
var _204=this.array;
for(var i=0;i<size;i++){
_203.push(_204[i+_201]);
}
return _203;
};
_1be.getBlob=function(size){
var _207=this.array.slice(this.position,size);
this.position+=size;
return BlobUtils.fromNumberArray(_207);
};
_1be.getBlobAt=function(_208,size){
var _20a=this.getBytesAt(_208,size);
return BlobUtils.fromNumberArray(_20a);
};
_1be.getArrayBuffer=function(size){
var u=new Uint8Array(size);
u.set(this.array.slice(this.position,size));
this.position+=size;
return u.buffer;
};
_1be.getShort=function(){
_checkForRead(this,2);
var val=this.getShortAt(this.position);
this.position+=2;
return val;
};
_1be.getShortAt=function(_20e){
_checkForReadAt(this,_20e,2);
var _20f=this.array;
return this.order._toShort(_20f[_20e++],_20f[_20e++]);
};
_1be.getUnsignedShort=function(){
_checkForRead(this,2);
var val=this.getUnsignedShortAt(this.position);
this.position+=2;
return val;
};
_1be.getUnsignedShortAt=function(_211){
_checkForReadAt(this,_211,2);
var _212=this.array;
return this.order._toUnsignedShort(_212[_211++],_212[_211++]);
};
_1be.getUnsignedMediumInt=function(){
var _213=this.array;
return this.order._toUnsignedMediumInt(_213[this.position++],_213[this.position++],_213[this.position++]);
};
_1be.getMediumInt=function(){
var val=this.getMediumIntAt(this.position);
this.position+=3;
return val;
};
_1be.getMediumIntAt=function(i){
var _216=this.array;
return this.order._toMediumInt(_216[i++],_216[i++],_216[i++]);
};
_1be.getInt=function(){
_checkForRead(this,4);
var val=this.getIntAt(this.position);
this.position+=4;
return val;
};
_1be.getIntAt=function(_218){
_checkForReadAt(this,_218,4);
var _219=this.array;
return this.order._toInt(_219[_218++],_219[_218++],_219[_218++],_219[_218++]);
};
_1be.getUnsignedInt=function(){
_checkForRead(this,4);
var val=this.getUnsignedIntAt(this.position);
this.position+=4;
return val;
};
_1be.getUnsignedIntAt=function(_21b){
_checkForReadAt(this,_21b,4);
var _21c=this.array;
return this.order._toUnsignedInt(_21c[_21b++],_21c[_21b++],_21c[_21b++],_21c[_21b++]);
return val;
};
_1be.getPrefixedString=function(_21d,cs){
var len=0;
switch(_21d||2){
case 1:
len=this.getUnsigned();
break;
case 2:
len=this.getUnsignedShort();
break;
case 4:
len=this.getInt();
break;
}
if(len===0){
return "";
}
var _220=this.limit;
try{
this.limit=this.position+len;
return cs.decode(this);
}
finally{
this.limit=_220;
}
};
_1be.getString=function(cs){
try{
return cs.decode(this);
}
finally{
this.position=this.limit;
}
};
_1be.slice=function(){
return new ByteBuffer(this.array.slice(this.position,this.limit));
};
_1be.flip=function(){
this.limit=this.position;
this.position=0;
this._mark=-1;
return this;
};
_1be.rewind=function(){
this.position=0;
this._mark=-1;
return this;
};
_1be.clear=function(){
this.position=0;
this.limit=this.capacity;
this._mark=-1;
return this;
};
_1be.remaining=function(){
return (this.limit-this.position);
};
_1be.hasRemaining=function(){
return (this.limit>this.position);
};
_1be.skip=function(size){
this.position+=size;
return this;
};
_1be.getHexDump=function(){
var _223=this.array;
var pos=this.position;
var _225=this.limit;
if(pos==_225){
return "empty";
}
var _226=[];
for(var i=pos;i<_225;i++){
var hex=(_223[i]||0).toString(16);
if(hex.length==1){
hex="0"+hex;
}
_226.push(hex);
}
return _226.join(" ");
};
_1be.toString=_1be.getHexDump;
_1be.expand=function(_229){
return this.expandAt(this.position,_229);
};
_1be.expandAt=function(i,_22b){
var end=i+_22b;
if(end>this.capacity){
this.capacity=end;
}
if(end>this.limit){
this.limit=end;
}
return this;
};
function _autoExpand(_22d,_22e){
if(_22d.autoExpand){
_22d.expand(_22e);
}
return _22d;
};
function _checkForRead(_22f,_230){
var end=_22f.position+_230;
if(end>_22f.limit){
throw new Error("Buffer underflow");
}
return _22f;
};
function _checkForReadAt(_232,_233,_234){
var end=_233+_234;
if(_233<0||end>_232.limit){
throw new Error("Index out of bounds");
}
return _232;
};
function _checkForWriteAt(_236,_237,_238){
var end=_237+_238;
if(_237<0||end>_236.limit){
throw new Error("Index out of bounds");
}
return _236;
};
})();
function Charset(){
};
(function(){
var _23a=Charset.prototype;
_23a.decode=function(buf){
};
_23a.encode=function(str,buf){
};
Charset.UTF8=(function(){
function UTF8(){
};
UTF8.prototype=new Charset();
var _23e=UTF8.prototype;
_23e.decode=function(buf){
var _240=buf.remaining();
var _241=_240<10000;
var _242=[];
var _243=buf.array;
var _244=buf.position;
var _245=_244+_240;
var _246,_247,_248,_249;
for(var i=_244;i<_245;i++){
_246=(_243[i]&255);
var _24b=charByteCount(_246);
var _24c=_245-i;
if(_24c<_24b){
break;
}
var _24d=null;
switch(_24b){
case 1:
_24d=_246;
break;
case 2:
i++;
_247=(_243[i]&255);
_24d=((_246&31)<<6)|(_247&63);
break;
case 3:
i++;
_247=(_243[i]&255);
i++;
_248=(_243[i]&255);
_24d=((_246&15)<<12)|((_247&63)<<6)|(_248&63);
break;
case 4:
i++;
_247=(_243[i]&255);
i++;
_248=(_243[i]&255);
i++;
_249=(_243[i]&255);
_24d=((_246&7)<<18)|((_247&63)<<12)|((_248&63)<<6)|(_249&63);
break;
}
if(_241){
_242.push(_24d);
}else{
_242.push(String.fromCharCode(_24d));
}
}
if(_241){
return String.fromCharCode.apply(null,_242);
}else{
return _242.join("");
}
};
_23e.encode=function(str,buf){
var _250=buf.position;
var mark=_250;
var _252=buf.array;
for(var i=0;i<str.length;i++){
var _254=str.charCodeAt(i);
if(_254<128){
_252[_250++]=_254;
}else{
if(_254<2048){
_252[_250++]=(_254>>6)|192;
_252[_250++]=(_254&63)|128;
}else{
if(_254<65536){
_252[_250++]=(_254>>12)|224;
_252[_250++]=((_254>>6)&63)|128;
_252[_250++]=(_254&63)|128;
}else{
if(_254<1114112){
_252[_250++]=(_254>>18)|240;
_252[_250++]=((_254>>12)&63)|128;
_252[_250++]=((_254>>6)&63)|128;
_252[_250++]=(_254&63)|128;
}else{
throw new Error("Invalid UTF-8 string");
}
}
}
}
}
buf.position=_250;
buf.expandAt(_250,_250-mark);
};
_23e.encodeAsByteArray=function(str){
var _256=new Array();
for(var i=0;i<str.length;i++){
var _258=str.charCodeAt(i);
if(_258<128){
_256.push(_258);
}else{
if(_258<2048){
_256.push((_258>>6)|192);
_256.push((_258&63)|128);
}else{
if(_258<65536){
_256.push((_258>>12)|224);
_256.push(((_258>>6)&63)|128);
_256.push((_258&63)|128);
}else{
if(_258<1114112){
_256.push((_258>>18)|240);
_256.push(((_258>>12)&63)|128);
_256.push(((_258>>6)&63)|128);
_256.push((_258&63)|128);
}else{
throw new Error("Invalid UTF-8 string");
}
}
}
}
}
return _256;
};
_23e.encodeByteArray=function(_259){
var _25a=_259.length;
var _25b=[];
for(var i=0;i<_25a;i++){
var _25d=_259[i];
if(_25d<128){
_25b.push(_25d);
}else{
if(_25d<2048){
_25b.push((_25d>>6)|192);
_25b.push((_25d&63)|128);
}else{
if(_25d<65536){
_25b.push((_25d>>12)|224);
_25b.push(((_25d>>6)&63)|128);
_25b.push((_25d&63)|128);
}else{
if(_25d<1114112){
_25b.push((_25d>>18)|240);
_25b.push(((_25d>>12)&63)|128);
_25b.push(((_25d>>6)&63)|128);
_25b.push((_25d&63)|128);
}else{
throw new Error("Invalid UTF-8 string");
}
}
}
}
}
return String.fromCharCode.apply(null,_25b);
};
_23e.encodeArrayBuffer=function(_25e){
var buf=new Uint8Array(_25e);
var _260=buf.length;
var _261=[];
for(var i=0;i<_260;i++){
var _263=buf[i];
if(_263<128){
_261.push(_263);
}else{
if(_263<2048){
_261.push((_263>>6)|192);
_261.push((_263&63)|128);
}else{
if(_263<65536){
_261.push((_263>>12)|224);
_261.push(((_263>>6)&63)|128);
_261.push((_263&63)|128);
}else{
if(_263<1114112){
_261.push((_263>>18)|240);
_261.push(((_263>>12)&63)|128);
_261.push(((_263>>6)&63)|128);
_261.push((_263&63)|128);
}else{
throw new Error("Invalid UTF-8 string");
}
}
}
}
}
return String.fromCharCode.apply(null,_261);
};
_23e.toByteArray=function(str){
var _265=[];
var _266,_267,_268,_269;
var _26a=str.length;
for(var i=0;i<_26a;i++){
_266=(str.charCodeAt(i)&255);
var _26c=charByteCount(_266);
var _26d=null;
if(_26c+i>_26a){
break;
}
switch(_26c){
case 1:
_26d=_266;
break;
case 2:
i++;
_267=(str.charCodeAt(i)&255);
_26d=((_266&31)<<6)|(_267&63);
break;
case 3:
i++;
_267=(str.charCodeAt(i)&255);
i++;
_268=(str.charCodeAt(i)&255);
_26d=((_266&15)<<12)|((_267&63)<<6)|(_268&63);
break;
case 4:
i++;
_267=(str.charCodeAt(i)&255);
i++;
_268=(str.charCodeAt(i)&255);
i++;
_269=(str.charCodeAt(i)&255);
_26d=((_266&7)<<18)|((_267&63)<<12)|((_268&63)<<6)|(_269&63);
break;
}
_265.push(_26d&255);
}
return _265;
};
function charByteCount(b){
if((b&128)===0){
return 1;
}
if((b&32)===0){
return 2;
}
if((b&16)===0){
return 3;
}
if((b&8)===0){
return 4;
}
throw new Error("Invalid UTF-8 bytes");
};
return new UTF8();
})();
})();
(function(){
var _26f="WebSocket";
var _270=function(name){
this._name=name;
this._level=_270.Level.INFO;
};
(function(){
_270.Level={OFF:8,SEVERE:7,WARNING:6,INFO:5,CONFIG:4,FINE:3,FINER:2,FINEST:1,ALL:0};
var _272;
var tags=document.getElementsByTagName("meta");
for(var i=0;i<tags.length;i++){
if(tags[i].name==="kaazing:logging"){
_272=tags[i].content;
break;
}
}
_270._logConf={};
if(_272){
var _275=_272.split(",");
for(var i=0;i<_275.length;i++){
var _276=_275[i].split("=");
_270._logConf[_276[0]]=_276[1];
}
}
var _277={};
_270.getLogger=function(name){
var _279=_277[name];
if(_279===undefined){
_279=new _270(name);
_277[name]=_279;
}
return _279;
};
var _27a=_270.prototype;
_27a.setLevel=function(_27b){
if(_27b&&_27b>=_270.Level.ALL&&_27b<=_270.Level.OFF){
this._level=_27b;
}
};
_27a.isLoggable=function(_27c){
for(var _27d in _270._logConf){
if(_270._logConf.hasOwnProperty(_27d)){
if(this._name.match(_27d)){
var _27e=_270._logConf[_27d];
if(_27e){
return (_270.Level[_27e]<=_27c);
}
}
}
}
return (this._level<=_27c);
};
var noop=function(){
};
var _280={};
_280[_270.Level.OFF]=noop;
_280[_270.Level.SEVERE]=(window.console)?(console.error||console.log||noop):noop;
_280[_270.Level.WARNING]=(window.console)?(console.warn||console.log||noop):noop;
_280[_270.Level.INFO]=(window.console)?(console.info||console.log||noop):noop;
_280[_270.Level.CONFIG]=(window.console)?(console.info||console.log||noop):noop;
_280[_270.Level.FINE]=(window.console)?(console.debug||console.log||noop):noop;
_280[_270.Level.FINER]=(window.console)?(console.debug||console.log||noop):noop;
_280[_270.Level.FINEST]=(window.console)?(console.debug||console.log||noop):noop;
_280[_270.Level.ALL]=(window.console)?(console.log||noop):noop;
_27a.config=function(_281,_282){
this.log(_270.Level.CONFIG,_281,_282);
};
_27a.entering=function(_283,name,_285){
if(this.isLoggable(_270.Level.FINER)){
if(browser=="chrome"||browser=="safari"){
_283=console;
}
var _286=_280[_270.Level.FINER];
if(_285){
if(typeof (_286)=="object"){
_286("ENTRY "+name,_285);
}else{
_286.call(_283,"ENTRY "+name,_285);
}
}else{
if(typeof (_286)=="object"){
_286("ENTRY "+name);
}else{
_286.call(_283,"ENTRY "+name);
}
}
}
};
_27a.exiting=function(_287,name,_289){
if(this.isLoggable(_270.Level.FINER)){
var _28a=_280[_270.Level.FINER];
if(browser=="chrome"||browser=="safari"){
_287=console;
}
if(_289){
if(typeof (_28a)=="object"){
_28a("RETURN "+name,_289);
}else{
_28a.call(_287,"RETURN "+name,_289);
}
}else{
if(typeof (_28a)=="object"){
_28a("RETURN "+name);
}else{
_28a.call(_287,"RETURN "+name);
}
}
}
};
_27a.fine=function(_28b,_28c){
this.log(_270.Level.FINE,_28b,_28c);
};
_27a.finer=function(_28d,_28e){
this.log(_270.Level.FINER,_28d,_28e);
};
_27a.finest=function(_28f,_290){
this.log(_270.Level.FINEST,_28f,_290);
};
_27a.info=function(_291,_292){
this.log(_270.Level.INFO,_291,_292);
};
_27a.log=function(_293,_294,_295){
if(this.isLoggable(_293)){
var _296=_280[_293];
if(browser=="chrome"||browser=="safari"){
_294=console;
}
if(typeof (_296)=="object"){
_296(_295);
}else{
_296.call(_294,_295);
}
}
};
_27a.severe=function(_297,_298){
this.log(_270.Level.SEVERE,_297,_298);
};
_27a.warning=function(_299,_29a){
this.log(_270.Level.WARNING,_299,_29a);
};
})();
var ULOG=_270.getLogger("com.kaazing.gateway.client.loader.Utils");
var _29c=function(key){
ULOG.entering(this,"Utils.getMetaValue",key);
var tags=document.getElementsByTagName("meta");
for(var i=0;i<tags.length;i++){
if(tags[i].name===key){
var v=tags[i].content;
ULOG.exiting(this,"Utils.getMetaValue",v);
return v;
}
}
ULOG.exiting(this,"Utils.getMetaValue");
};
var _2a1=function(_2a2){
ULOG.entering(this,"Utils.arrayCopy",_2a2);
var _2a3=[];
for(var i=0;i<_2a2.length;i++){
_2a3.push(_2a2[i]);
}
return _2a3;
};
var _2a5=function(_2a6,_2a7){
ULOG.entering(this,"Utils.arrayFilter",{"array":_2a6,"callback":_2a7});
var _2a8=[];
for(var i=0;i<_2a6.length;i++){
var elt=_2a6[i];
if(_2a7(elt)){
_2a8.push(_2a6[i]);
}
}
return _2a8;
};
var _2ab=function(_2ac,_2ad){
ULOG.entering(this,"Utils.indexOf",{"array":_2ac,"searchElement":_2ad});
for(var i=0;i<_2ac.length;i++){
if(_2ac[i]==_2ad){
ULOG.exiting(this,"Utils.indexOf",i);
return i;
}
}
ULOG.exiting(this,"Utils.indexOf",-1);
return -1;
};
var _2af=function(s){
ULOG.entering(this,"Utils.decodeByteString",s);
var a=[];
for(var i=0;i<s.length;i++){
a.push(s.charCodeAt(i)&255);
}
var buf=new ByteBuffer(a);
var v=_2b5(buf,Charset.UTF8);
ULOG.exiting(this,"Utils.decodeByteString",v);
return v;
};
var _2b6=function(_2b7){
ULOG.entering(this,"Utils.decodeArrayBuffer",_2b7);
var buf=new Uint8Array(_2b7);
var a=[];
for(var i=0;i<buf.length;i++){
a.push(buf[i]);
}
var buf=new ByteBuffer(a);
var s=_2b5(buf,Charset.UTF8);
ULOG.exiting(this,"Utils.decodeArrayBuffer",s);
return s;
};
var _2bc=function(_2bd){
ULOG.entering(this,"Utils.decodeArrayBuffer2ByteBuffer");
var buf=new Uint8Array(_2bd);
var a=[];
for(var i=0;i<buf.length;i++){
a.push(buf[i]);
}
ULOG.exiting(this,"Utils.decodeArrayBuffer2ByteBuffer");
return new ByteBuffer(a);
};
var _2c1=String.fromCharCode(127);
var NULL=String.fromCharCode(0);
var _2c3="\n";
var _2c4=function(buf){
ULOG.entering(this,"Utils.encodeEscapedByte",buf);
var a=[];
while(buf.remaining()){
var n=buf.getUnsigned();
var chr=String.fromCharCode(n);
switch(chr){
case _2c1:
a.push(_2c1);
a.push(_2c1);
break;
case NULL:
a.push(_2c1);
a.push("0");
break;
case _2c3:
a.push(_2c1);
a.push("n");
break;
default:
a.push(chr);
}
}
var v=a.join("");
ULOG.exiting(this,"Utils.encodeEscapedBytes",v);
return v;
};
var _2ca=function(buf,_2cc){
ULOG.entering(this,"Utils.encodeByteString",{"buf":buf,"requiresEscaping":_2cc});
if(_2cc){
return _2c4(buf);
}else{
var _2cd=buf.array;
var _2ce=(buf.position==0&&buf.limit==_2cd.length)?_2cd:buf.getBytes(buf.remaining());
var _2cf=!(XMLHttpRequest.prototype.sendAsBinary);
for(var i=_2ce.length-1;i>=0;i--){
var _2d1=_2ce[i];
if(_2d1==0&&_2cf){
_2ce[i]=256;
}else{
if(_2d1<0){
_2ce[i]=_2d1&255;
}
}
}
var _2d2=0;
var _2d3=[];
do{
var _2d4=Math.min(_2ce.length-_2d2,10000);
partOfBytes=_2ce.slice(_2d2,_2d2+_2d4);
_2d2+=_2d4;
_2d3.push(String.fromCharCode.apply(null,partOfBytes));
}while(_2d2<_2ce.length);
var _2d5=_2d3.join("");
if(_2ce===_2cd){
for(var i=_2ce.length-1;i>=0;i--){
var _2d1=_2ce[i];
if(_2d1==256){
_2ce[i]=0;
}
}
}
ULOG.exiting(this,"Utils.encodeByteString",_2d5);
return _2d5;
}
};
var _2b5=function(buf,cs){
var _2d8=buf.position;
var _2d9=buf.limit;
var _2da=buf.array;
while(_2d8<_2d9){
_2d8++;
}
try{
buf.limit=_2d8;
return cs.decode(buf);
}
finally{
if(_2d8!=_2d9){
buf.limit=_2d9;
buf.position=_2d8+1;
}
}
};
var _2db=window.WebSocket;
var _2dc=(function(){
var _2dd=_270.getLogger("WebSocketNativeProxy");
var _2de=function(){
this.parent;
this._listener;
this.code=1005;
this.reason="";
};
var _2df=(browser=="safari"&&typeof (_2db.CLOSING)=="undefined");
var _2e0=(browser=="android");
var _2e1=_2de.prototype;
_2e1.connect=function(_2e2,_2e3){
_2dd.entering(this,"WebSocketNativeProxy.<init>",{"location":_2e2,"protocol":_2e3});
if((typeof (_2db)==="undefined")||_2e0){
doError(this);
return;
}
if(_2e2.indexOf("javascript:")==0){
_2e2=_2e2.substr("javascript:".length);
}
var _2e4=_2e2.indexOf("?");
if(_2e4!=-1){
if(!/[\?&]\.kl=Y/.test(_2e2.substring(_2e4))){
_2e2+="&.kl=Y";
}
}else{
_2e2+="?.kl=Y";
}
this._sendQueue=[];
try{
if(_2e3){
this._requestedProtocol=_2e3;
this._delegate=new _2db(_2e2,_2e3);
}else{
this._delegate=new _2db(_2e2);
}
this._delegate.binaryType="arraybuffer";
}
catch(e){
_2dd.severe(this,"WebSocketNativeProxy.<init> "+e);
doError(this);
return;
}
bindHandlers(this);
};
_2e1.onerror=function(){
};
_2e1.onmessage=function(){
};
_2e1.onopen=function(){
};
_2e1.onclose=function(){
};
_2e1.close=function(code,_2e6){
_2dd.entering(this,"WebSocketNativeProxy.close");
if(code){
if(_2df){
doCloseDraft76Compat(this,code,_2e6);
}else{
this._delegate.close(code,_2e6);
}
}else{
this._delegate.close();
}
};
function doCloseDraft76Compat(_2e7,code,_2e9){
_2e7.code=code|1005;
_2e7.reason=_2e9|"";
_2e7._delegate.close();
};
_2e1.send=function(_2ea){
_2dd.entering(this,"WebSocketNativeProxy.send",_2ea);
doSend(this,_2ea);
return;
};
_2e1.setListener=function(_2eb){
this._listener=_2eb;
};
_2e1.setIdleTimeout=function(_2ec){
_2dd.entering(this,"WebSocketNativeProxy.setIdleTimeout",_2ec);
this.lastMessageTimestamp=new Date().getTime();
this.idleTimeout=_2ec;
startIdleTimer(this,_2ec);
return;
};
function doSend(_2ed,_2ee){
_2dd.entering(this,"WebSocketNativeProxy.doSend",_2ee);
if(typeof (_2ee)=="string"){
_2ed._delegate.send(_2ee);
}else{
if(_2ee.byteLength||_2ee.size){
_2ed._delegate.send(_2ee);
}else{
if(_2ee.constructor==ByteBuffer){
_2ed._delegate.send(_2ee.getArrayBuffer(_2ee.remaining()));
}else{
_2dd.severe(this,"WebSocketNativeProxy.doSend called with unkown type "+typeof (_2ee));
throw new Error("Cannot call send() with that type");
}
}
}
};
function doError(_2ef,e){
_2dd.entering(this,"WebSocketNativeProxy.doError",e);
setTimeout(function(){
_2ef._listener.connectionFailed(_2ef.parent);
},0);
};
function encodeMessageData(_2f1,e){
var buf;
if(typeof e.data.byteLength!=="undefined"){
buf=_2bc(e.data);
}else{
buf=ByteBuffer.allocate(e.data.length);
if(_2f1.parent._isBinary&&_2f1.parent._balanced>1){
for(var i=0;i<e.data.length;i++){
buf.put(e.data.charCodeAt(i));
}
}else{
buf.putString(e.data,Charset.UTF8);
}
buf.flip();
}
return buf;
};
function messageHandler(_2f5,e){
_2dd.entering(this,"WebSocketNativeProxy.messageHandler",e);
_2f5.lastMessageTimestamp=new Date().getTime();
if(typeof (e.data)==="string"){
_2f5._listener.textMessageReceived(_2f5.parent,e.data);
}else{
_2f5._listener.binaryMessageReceived(_2f5.parent,e.data);
}
};
function closeHandler(_2f7,e){
_2dd.entering(this,"WebSocketNativeProxy.closeHandler",e);
unbindHandlers(_2f7);
if(_2df){
_2f7._listener.connectionClosed(_2f7.parent,true,_2f7.code,_2f7.reason);
}else{
_2f7._listener.connectionClosed(_2f7.parent,e.wasClean,e.code,e.reason);
}
};
function errorHandler(_2f9,e){
_2dd.entering(this,"WebSocketNativeProxy.errorHandler",e);
_2f9._listener.connectionError(_2f9.parent,e);
};
function openHandler(_2fb,e){
_2dd.entering(this,"WebSocketNativeProxy.openHandler",e);
if(_2df){
_2fb._delegate.protocol=_2fb._requestedProtocol;
}
_2fb._listener.connectionOpened(_2fb.parent,_2fb._delegate.protocol);
};
function bindHandlers(_2fd){
_2dd.entering(this,"WebSocketNativeProxy.bindHandlers");
var _2fe=_2fd._delegate;
_2fe.onopen=function(e){
openHandler(_2fd,e);
};
_2fe.onmessage=function(e){
messageHandler(_2fd,e);
};
_2fe.onclose=function(e){
closeHandler(_2fd,e);
};
_2fe.onerror=function(e){
errorHandler(_2fd,e);
};
_2fd.readyState=function(){
return _2fe.readyState;
};
};
function unbindHandlers(_303){
_2dd.entering(this,"WebSocketNativeProxy.unbindHandlers");
var _304=_303._delegate;
_304.onmessage=undefined;
_304.onclose=undefined;
_304.onopen=undefined;
_304.onerror=undefined;
_303.readyState=WebSocket.CLOSED;
};
function startIdleTimer(_305,_306){
stopIdleTimer(_305);
_305.idleTimer=setTimeout(function(){
idleTimerHandler(_305);
},_306);
};
function idleTimerHandler(_307){
var _308=new Date().getTime();
var _309=_308-_307.lastMessageTimestamp;
var _30a=_307.idleTimeout;
if(_309>_30a){
try{
var _30b=_307._delegate;
if(_30b){
unbindHandlers(_307);
_30b.close();
}
}
finally{
_307._listener.connectionClosed(_307.parent,false,1006,"");
}
}else{
startIdleTimer(_307,_30a-_309);
}
};
function stopIdleTimer(_30c){
if(_30c.idleTimer!=null){
clearTimeout(_30c.idleTimer);
_30c.IdleTimer=null;
}
};
return _2de;
})();
var _30d=(function(){
var _30e=_270.getLogger("WebSocketEmulatedFlashProxy");
var _30f=function(){
this.parent;
this._listener;
};
var _310=_30f.prototype;
_310.connect=function(_311,_312){
_30e.entering(this,"WebSocketEmulatedFlashProxy.<init>",_311);
this.URL=_311;
try{
_313(this,_311,_312);
}
catch(e){
_30e.severe(this,"WebSocketEmulatedFlashProxy.<init> "+e);
doError(this,e);
}
this.constructor=_30f;
_30e.exiting(this,"WebSocketEmulatedFlashProxy.<init>");
};
_310.setListener=function(_314){
this._listener=_314;
};
_30f._flashBridge={};
_30f._flashBridge.readyWaitQueue=[];
_30f._flashBridge.failWaitQueue=[];
_30f._flashBridge.flashHasLoaded=false;
_30f._flashBridge.flashHasFailed=false;
_310.URL="";
_310.readyState=0;
_310.bufferedAmount=0;
_310.connectionOpened=function(_315,_316){
var _316=_316.split("\n");
for(var i=0;i<_316.length;i++){
var _318=_316[i].split(":");
_315.responseHeaders[_318[0]]=_318[1];
}
this._listener.connectionOpened(_315,"");
};
_310.connectionClosed=function(_319,_31a,code,_31c){
this._listener.connectionClosed(_319,_31a,code,_31c);
};
_310.connectionFailed=function(_31d){
this._listener.connectionFailed(_31d);
};
_310.binaryMessageReceived=function(_31e,data){
this._listener.binaryMessageReceived(_31e,data);
};
_310.textMessageReceived=function(_320,s){
this._listener.textMessageReceived(_320,s);
};
_310.redirected=function(_322,_323){
this._listener.redirected(_322,_323);
};
_310.authenticationRequested=function(_324,_325,_326){
this._listener.authenticationRequested(_324,_325,_326);
};
_310.send=function(data){
_30e.entering(this,"WebSocketEmulatedFlashProxy.send",data);
switch(this.readyState){
case 0:
_30e.severe(this,"WebSocketEmulatedFlashProxy.send: readyState is 0");
throw new Error("INVALID_STATE_ERR");
break;
case 1:
if(data===null){
_30e.severe(this,"WebSocketEmulatedFlashProxy.send: Data is null");
throw new Error("data is null");
}
if(typeof (data)=="string"){
_30f._flashBridge.sendText(this._instanceId,data);
}else{
if(data.constructor==ByteBuffer){
var _328;
var a=[];
while(data.remaining()){
a.push(String.fromCharCode(data.get()));
}
var _328=a.join("");
_30f._flashBridge.sendByteString(this._instanceId,_328);
}else{
if(data.byteLength){
var _328;
var a=[];
var _32a=new DataView(data);
for(var i=0;i<data.byteLength;i++){
a.push(String.fromCharCode(_32a.getUint8(i)));
}
var _328=a.join("");
_30f._flashBridge.sendByteString(this._instanceId,_328);
}else{
if(data.size){
var _32c=this;
var cb=function(_32e){
_30f._flashBridge.sendByteString(_32c._instanceId,_32e);
};
BlobUtils.asBinaryString(cb,data);
return;
}else{
_30e.severe(this,"WebSocketEmulatedFlashProxy.send: Data is on invalid type "+typeof (data));
throw new Error("Invalid type");
}
}
}
}
_32f(this);
return true;
break;
case 2:
return false;
break;
default:
_30e.severe(this,"WebSocketEmulatedFlashProxy.send: Invalid readyState "+this.readyState);
throw new Error("INVALID_STATE_ERR");
}
};
_310.close=function(code,_331){
_30e.entering(this,"WebSocketEmulatedFlashProxy.close");
switch(this.readyState){
case 0:
case 1:
_30f._flashBridge.disconnect(this._instanceId,code,_331);
break;
}
};
_310.disconnect=_310.close;
var _32f=function(_332){
_30e.entering(this,"WebSocketEmulatedFlashProxy.updateBufferedAmount");
_332.bufferedAmount=_30f._flashBridge.getBufferedAmount(_332._instanceId);
if(_332.bufferedAmount!=0){
setTimeout(function(){
_32f(_332);
},1000);
}
};
var _313=function(_333,_334,_335){
_30e.entering(this,"WebSocketEmulatedFlashProxy.registerWebSocket",_334);
var _336=function(key,_338){
_338[key]=_333;
_333._instanceId=key;
};
var _339=function(){
doError(_333);
};
var _33a=[];
if(_333.parent.requestHeaders&&_333.parent.requestHeaders.length>0){
for(var i=0;i<_333.parent.requestHeaders.length;i++){
_33a.push(_333.parent.requestHeaders[i].label+":"+_333.parent.requestHeaders[i].value);
}
}
_30f._flashBridge.registerWebSocketEmulated(_334,_33a.join("\n"),_336,_339);
};
function doError(_33c,e){
_30e.entering(this,"WebSocketEmulatedFlashProxy.doError",e);
setTimeout(function(){
_33c._listener.connectionFailed(_33c.parent);
},0);
};
return _30f;
})();
var _33e=(function(){
var _33f=_270.getLogger("WebSocketRtmpFlashProxy");
var _340=function(){
this.parent;
this._listener;
};
var _341=_340.prototype;
_341.connect=function(_342,_343){
_33f.entering(this,"WebSocketRtmpFlashProxy.<init>",_342);
this.URL=_342;
try{
_344(this,_342,_343);
}
catch(e){
_33f.severe(this,"WebSocketRtmpFlashProxy.<init> "+e);
doError(this,e);
}
this.constructor=_340;
_33f.exiting(this,"WebSocketRtmpFlashProxy.<init>");
};
_341.setListener=function(_345){
this._listener=_345;
};
_30d._flashBridge={};
_30d._flashBridge.readyWaitQueue=[];
_30d._flashBridge.failWaitQueue=[];
_30d._flashBridge.flashHasLoaded=false;
_30d._flashBridge.flashHasFailed=false;
_341.URL="";
_341.readyState=0;
_341.bufferedAmount=0;
_341.connectionOpened=function(_346,_347){
var _347=_347.split("\n");
for(var i=0;i<_347.length;i++){
var _349=_347[i].split(":");
_346.responseHeaders[_349[0]]=_349[1];
}
this._listener.connectionOpened(_346,"");
};
_341.connectionClosed=function(_34a,_34b,code,_34d){
this._listener.connectionClosed(_34a,_34b,code,_34d);
};
_341.connectionFailed=function(_34e){
this._listener.connectionFailed(_34e);
};
_341.binaryMessageReceived=function(_34f,data){
this._listener.binaryMessageReceived(_34f,data);
};
_341.textMessageReceived=function(_351,s){
this._listener.textMessageReceived(_351,s);
};
_341.redirected=function(_353,_354){
this._listener.redirected(_353,_354);
};
_341.authenticationRequested=function(_355,_356,_357){
this._listener.authenticationRequested(_355,_356,_357);
};
_341.send=function(data){
_33f.entering(this,"WebSocketRtmpFlashProxy.send",data);
switch(this.readyState){
case 0:
_33f.severe(this,"WebSocketRtmpFlashProxy.send: readyState is 0");
throw new Error("INVALID_STATE_ERR");
break;
case 1:
if(data===null){
_33f.severe(this,"WebSocketRtmpFlashProxy.send: Data is null");
throw new Error("data is null");
}
if(typeof (data)=="string"){
_30d._flashBridge.sendText(this._instanceId,data);
}else{
if(typeof (data.array)=="object"){
var _359;
var a=[];
var b;
while(data.remaining()){
b=data.get();
a.push(String.fromCharCode(b));
}
var _359=a.join("");
_30d._flashBridge.sendByteString(this._instanceId,_359);
return;
}else{
_33f.severe(this,"WebSocketRtmpFlashProxy.send: Data is on invalid type "+typeof (data));
throw new Error("Invalid type");
}
}
_35c(this);
return true;
break;
case 2:
return false;
break;
default:
_33f.severe(this,"WebSocketRtmpFlashProxy.send: Invalid readyState "+this.readyState);
throw new Error("INVALID_STATE_ERR");
}
};
_341.close=function(code,_35e){
_33f.entering(this,"WebSocketRtmpFlashProxy.close");
switch(this.readyState){
case 1:
case 2:
_30d._flashBridge.disconnect(this._instanceId,code,_35e);
break;
}
};
_341.disconnect=_341.close;
var _35c=function(_35f){
_33f.entering(this,"WebSocketRtmpFlashProxy.updateBufferedAmount");
_35f.bufferedAmount=_30d._flashBridge.getBufferedAmount(_35f._instanceId);
if(_35f.bufferedAmount!=0){
setTimeout(function(){
_35c(_35f);
},1000);
}
};
var _344=function(_360,_361,_362){
_33f.entering(this,"WebSocketRtmpFlashProxy.registerWebSocket",_361);
var _363=function(key,_365){
_365[key]=_360;
_360._instanceId=key;
};
var _366=function(){
doError(_360);
};
var _367=[];
if(_360.parent.requestHeaders&&_360.parent.requestHeaders.length>0){
for(var i=0;i<_360.parent.requestHeaders.length;i++){
_367.push(_360.parent.requestHeaders[i].label+":"+_360.parent.requestHeaders[i].value);
}
}
_30d._flashBridge.registerWebSocketRtmp(_361,_367.join("\n"),_363,_366);
};
function doError(_369,e){
_33f.entering(this,"WebSocketRtmpFlashProxy.doError",e);
setTimeout(function(){
_369._listener.connectionFailed(_369.parent);
},0);
};
return _340;
})();
(function(){
var _36b=_270.getLogger("com.kaazing.gateway.client.loader.FlashBridge");
var _36c={};
_30d._flashBridge.registerWebSocketEmulated=function(_36d,_36e,_36f,_370){
_36b.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.registerWebSocketEmulated",{"location":_36d,"callback":_36f,"errback":_370});
var _371=function(){
var key=_30d._flashBridge.doRegisterWebSocketEmulated(_36d,_36e);
_36f(key,_36c);
};
if(_30d._flashBridge.flashHasLoaded){
if(_30d._flashBridge.flashHasFailed){
_370();
}else{
_371();
}
}else{
this.readyWaitQueue.push(_371);
this.failWaitQueue.push(_370);
}
_36b.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.registerWebSocketEmulated");
};
_30d._flashBridge.doRegisterWebSocketEmulated=function(_373,_374){
_36b.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.doRegisterWebSocketEmulated",{"location":_373,"headers":_374});
var key=_30d._flashBridge.elt.registerWebSocketEmulated(_373,_374);
_36b.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.doRegisterWebSocketEmulated",key);
return key;
};
_30d._flashBridge.registerWebSocketRtmp=function(_376,_377,_378,_379){
_36b.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.registerWebSocketRtmp",{"location":_376,"callback":_378,"errback":_379});
var _37a=function(){
var key=_30d._flashBridge.doRegisterWebSocketRtmp(_376,_377);
_378(key,_36c);
};
if(_30d._flashBridge.flashHasLoaded){
if(_30d._flashBridge.flashHasFailed){
_379();
}else{
_37a();
}
}else{
this.readyWaitQueue.push(_37a);
this.failWaitQueue.push(_379);
}
_36b.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.registerWebSocketEmulated");
};
_30d._flashBridge.doRegisterWebSocketRtmp=function(_37c,_37d){
_36b.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.doRegisterWebSocketRtmp",{"location":_37c,"protocol":_37d});
var key=_30d._flashBridge.elt.registerWebSocketRtmp(_37c,_37d);
_36b.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.doRegisterWebSocketRtmp",key);
return key;
};
_30d._flashBridge.onready=function(){
_36b.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.onready");
var _37f=_30d._flashBridge.readyWaitQueue;
for(var i=0;i<_37f.length;i++){
var _381=_37f[i];
_381();
}
_36b.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.onready");
};
_30d._flashBridge.onfail=function(){
_36b.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.onfail");
var _382=_30d._flashBridge.failWaitQueue;
for(var i=0;i<_382.length;i++){
var _384=_382[i];
_384();
}
_36b.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.onfail");
};
_30d._flashBridge.connectionOpened=function(key,_386){
_36b.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.connectionOpened",key);
_36c[key].readyState=1;
_36c[key].connectionOpened(_36c[key].parent,_386);
_387();
_36b.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.connectionOpened");
};
_30d._flashBridge.connectionClosed=function(key,_389,code,_38b){
_36b.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.connectionClosed",key);
_36c[key].readyState=2;
_36c[key].connectionClosed(_36c[key].parent,_389,code,_38b);
_36b.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.connectionClosed");
};
_30d._flashBridge.connectionFailed=function(key){
_36b.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.connectionFailed",key);
_36c[key].connectionFailed(_36c[key].parent);
_36b.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.connectionFailed");
};
_30d._flashBridge.binaryMessageReceived=function(key,data){
_36b.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.binaryMessageReceived",{"key":key,"data":data});
var _38f=_36c[key];
if(_38f.readyState==1){
var buf=ByteBuffer.allocate(data.length);
for(var i=0;i<data.length;i++){
buf.put(data[i]);
}
buf.flip();
_38f.binaryMessageReceived(_38f.parent,buf);
}
_36b.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.binaryMessageReceived");
};
_30d._flashBridge.textMessageReceived=function(key,data){
_36b.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.textMessageReceived",{"key":key,"data":data});
var _394=_36c[key];
if(_394.readyState==1){
_394.textMessageReceived(_394.parent,unescape(data));
}
_36b.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.textMessageReceived");
};
_30d._flashBridge.redirected=function(key,_396){
_36b.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.redirected",{"key":key,"data":_396});
var _397=_36c[key];
_397.redirected(_397.parent,_396);
_36b.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.redirected");
};
_30d._flashBridge.authenticationRequested=function(key,_399,_39a){
_36b.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.authenticationRequested",{"key":key,"data":_399});
var _39b=_36c[key];
_39b.authenticationRequested(_39b.parent,_399,_39a);
_36b.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.authenticationRequested");
};
var _387=function(){
_36b.entering(this,"WebSocketEmulatedFlashProxy.killLoadingBar");
if(browser==="firefox"){
var e=document.createElement("iframe");
e.style.display="none";
document.body.appendChild(e);
document.body.removeChild(e);
}
};
_30d._flashBridge.sendText=function(key,_39e){
_36b.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.sendText",{"key":key,"message":_39e});
this.elt.processTextMessage(key,escape(_39e));
setTimeout(_387,200);
};
_30d._flashBridge.sendByteString=function(key,_3a0){
_36b.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.sendByteString",{"key":key,"message":_3a0});
this.elt.processBinaryMessage(key,escape(_3a0));
setTimeout(_387,200);
};
_30d._flashBridge.disconnect=function(key,code,_3a3){
_36b.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.disconnect",key);
this.elt.processClose(key,code,_3a3);
};
_30d._flashBridge.getBufferedAmount=function(key){
_36b.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.getBufferedAmount",key);
var v=this.elt.getBufferedAmount(key);
_36b.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.getBufferedAmount",v);
return v;
};
})();
(function(){
var _3a6=function(_3a7){
var self=this;
var _3a9=3000;
var ID="Loader";
var ie=false;
var _3ac=-1;
self.elt=null;
var _3ad=function(){
var exp=new RegExp(".*"+_3a7+".*.js$");
var _3af=document.getElementsByTagName("script");
for(var i=0;i<_3af.length;i++){
if(_3af[i].src){
var name=(_3af[i].src).match(exp);
if(name){
name=name.pop();
var _3b2=name.split("/");
_3b2.pop();
if(_3b2.length>0){
return _3b2.join("/")+"/";
}else{
return "";
}
}
}
}
};
var _3b3=_3ad();
var _3b4=_3b3+"Loader.swf";
self.loader=function(){
var _3b5="flash";
var tags=document.getElementsByTagName("meta");
for(var i=0;i<tags.length;i++){
if(tags[i].name==="kaazing:upgrade"){
_3b5=tags[i].content;
}
}
if(_3b5!="flash"||!_3b8([9,0,115])){
_3b9();
}else{
_3ac=setTimeout(_3b9,_3a9);
_3ba();
}
};
self.clearFlashTimer=function(){
clearTimeout(_3ac);
_3ac="cleared";
setTimeout(function(){
_3bb(self.elt.handshake(_3a7));
},0);
};
var _3bb=function(_3bc){
if(_3bc){
_30d._flashBridge.flashHasLoaded=true;
_30d._flashBridge.elt=self.elt;
_30d._flashBridge.onready();
}else{
_3b9();
}
window.___Loader=undefined;
};
var _3b9=function(){
_30d._flashBridge.flashHasLoaded=true;
_30d._flashBridge.flashHasFailed=true;
_30d._flashBridge.onfail();
};
var _3bd=function(){
var _3be=null;
if(typeof (ActiveXObject)!="undefined"){
try{
ie=true;
var swf=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
var _3c0=swf.GetVariable("$version");
var _3c1=_3c0.split(" ")[1].split(",");
_3be=[];
for(var i=0;i<_3c1.length;i++){
_3be[i]=parseInt(_3c1[i]);
}
}
catch(e){
ie=false;
}
}
if(typeof navigator.plugins!="undefined"){
if(typeof navigator.plugins["Shockwave Flash"]!="undefined"){
var _3c0=navigator.plugins["Shockwave Flash"].description;
_3c0=_3c0.replace(/\s*r/g,".");
var _3c1=_3c0.split(" ")[2].split(".");
_3be=[];
for(var i=0;i<_3c1.length;i++){
_3be[i]=parseInt(_3c1[i]);
}
}
}
var _3c3=navigator.userAgent;
if(_3be!==null&&_3be[0]===10&&_3be[1]===0&&_3c3.indexOf("Windows NT 6.0")!==-1){
_3be=null;
}
if(_3c3.indexOf("MSIE 6.0")==-1&&_3c3.indexOf("MSIE 7.0")==-1){
if(_3c3.indexOf("MSIE 8.0")>0||_3c3.indexOf("MSIE 9.0")>0){
if(typeof (XDomainRequest)!=="undefined"){
_3be=null;
}
}else{
_3be=null;
}
}
return _3be;
};
var _3b8=function(_3c4){
var _3c5=_3bd();
if(_3c5==null){
return false;
}
for(var i=0;i<Math.max(_3c5.length,_3c4.length);i++){
var _3c7=_3c5[i]-_3c4[i];
if(_3c7!=0){
return (_3c7>0)?true:false;
}
}
return true;
};
var _3ba=function(){
if(ie){
var elt=document.createElement("div");
document.body.appendChild(elt);
elt.outerHTML="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" height=\"0\" width=\"0\" id=\""+ID+"\"><param name=\"movie\" value=\""+_3b4+"\"></param></object>";
self.elt=document.getElementById(ID);
}else{
var elt=document.createElement("object");
elt.setAttribute("type","application/x-shockwave-flash");
elt.setAttribute("width",0);
elt.setAttribute("height",0);
elt.setAttribute("id",ID);
elt.setAttribute("data",_3b4);
document.body.appendChild(elt);
self.elt=elt;
}
};
self.attachToOnload=function(_3c9){
if(window.addEventListener){
window.addEventListener("load",_3c9,true);
}else{
if(window.attachEvent){
window.attachEvent("onload",_3c9);
}else{
onload=_3c9;
}
}
};
if(document.readyState==="complete"){
self.loader();
}else{
self.attachToOnload(self.loader);
}
};
var _3ca=(function(){
var _3cb=function(_3cc){
this.HOST=new _3cb(0);
this.USERINFO=new _3cb(1);
this.PORT=new _3cb(2);
this.PATH=new _3cb(3);
this.ordinal=_3cc;
};
return _3cb;
})();
var _3cd=(function(){
var _3ce=function(){
};
_3ce.getRealm=function(_3cf){
var _3d0=_3cf.authenticationParameters;
if(_3d0==null){
return null;
}
var _3d1=/realm=(\"(.*)\")/i;
var _3d2=_3d1.exec(_3d0);
return (_3d2!=null&&_3d2.length>=3)?_3d2[2]:null;
};
return _3ce;
})();
function Dictionary(){
this.Keys=new Array();
};
var _3d3=(function(){
var _3d4=function(_3d5){
this.weakKeys=_3d5;
this.elements=[];
this.dictionary=new Dictionary();
};
var _3d6=_3d4.prototype;
_3d6.getlength=function(){
return this.elements.length;
};
_3d6.getItemAt=function(_3d7){
return this.dictionary[this.elements[_3d7]];
};
_3d6.get=function(key){
var _3d9=this.dictionary[key];
if(_3d9==undefined){
_3d9=null;
}
return _3d9;
};
_3d6.remove=function(key){
for(var i=0;i<this.elements.length;i++){
var _3dc=(this.weakKeys&&(this.elements[i]==key));
var _3dd=(!this.weakKeys&&(this.elements[i]===key));
if(_3dc||_3dd){
this.elements.remove(i);
this.dictionary[this.elements[i]]=undefined;
break;
}
}
};
_3d6.put=function(key,_3df){
this.remove(key);
this.elements.push(key);
this.dictionary[key]=_3df;
};
_3d6.isEmpty=function(){
return this.length==0;
};
_3d6.containsKey=function(key){
for(var i=0;i<this.elements.length;i++){
var _3e2=(this.weakKeys&&(this.elements[i]==key));
var _3e3=(!this.weakKeys&&(this.elements[i]===key));
if(_3e2||_3e3){
return true;
}
}
return false;
};
_3d6.keySet=function(){
return this.elements;
};
_3d6.getvalues=function(){
var _3e4=[];
for(var i=0;i<this.elements.length;i++){
_3e4.push(this.dictionary[this.elements[i]]);
}
return _3e4;
};
return _3d4;
})();
var Node=(function(){
var Node=function(){
this.name="";
this.kind="";
this.values=[];
this.children=new _3d3();
};
var _3e8=Node.prototype;
_3e8.getWildcardChar=function(){
return "*";
};
_3e8.addChild=function(name,kind){
if(name==null||name.length==0){
throw new ArgumentError("A node may not have a null name.");
}
var _3eb=Node.createNode(name,this,kind);
this.children.put(name,_3eb);
return _3eb;
};
_3e8.hasChild=function(name,kind){
return null!=this.getChild(name)&&kind==this.getChild(name).kind;
};
_3e8.getChild=function(name){
return this.children.get(name);
};
_3e8.getDistanceFromRoot=function(){
var _3ef=0;
var _3f0=this;
while(!_3f0.isRootNode()){
_3ef++;
_3f0=_3f0.parent;
}
return _3ef;
};
_3e8.appendValues=function(){
if(this.isRootNode()){
throw new ArgumentError("Cannot set a values on the root node.");
}
if(this.values!=null){
for(var k=0;k<arguments.length;k++){
var _3f2=arguments[k];
this.values.push(_3f2);
}
}
};
_3e8.removeValue=function(_3f3){
if(this.isRootNode()){
return;
}
for(var i=0;i<this.values.length;i++){
if(this.values[i]==_3f3){
this.values.splice(i,1);
}
}
};
_3e8.getValues=function(){
return this.values;
};
_3e8.hasValues=function(){
return this.values!=null&&this.values.length>0;
};
_3e8.isRootNode=function(){
return this.parent==null;
};
_3e8.hasChildren=function(){
return this.children!=null&&this.children.getlength()>0;
};
_3e8.isWildcard=function(){
return this.name!=null&&this.name==this.getWildcardChar();
};
_3e8.hasWildcardChild=function(){
return this.hasChildren()&&this.children.containsKey(this.getWildcardChar());
};
_3e8.getFullyQualifiedName=function(){
var b=new String();
var name=[];
var _3f7=this;
while(!_3f7.isRootNode()){
name.push(_3f7.name);
_3f7=_3f7.parent;
}
name=name.reverse();
for(var k=0;k<name.length;k++){
b+=name[k];
b+=".";
}
if(b.length>=1&&b.charAt(b.length-1)=="."){
b=b.slice(0,b.length-1);
}
return b.toString();
};
_3e8.getChildrenAsList=function(){
return this.children.getvalues();
};
_3e8.findBestMatchingNode=function(_3f9,_3fa){
var _3fb=this.findAllMatchingNodes(_3f9,_3fa);
var _3fc=null;
var _3fd=0;
for(var i=0;i<_3fb.length;i++){
var node=_3fb[i];
if(node.getDistanceFromRoot()>_3fd){
_3fd=node.getDistanceFromRoot();
_3fc=node;
}
}
return _3fc;
};
_3e8.findAllMatchingNodes=function(_400,_401){
var _402=[];
var _403=this.getChildrenAsList();
for(var i=0;i<_403.length;i++){
var node=_403[i];
var _406=node.matches(_400,_401);
if(_406<0){
continue;
}
if(_406>=_400.length){
do{
if(node.hasValues()){
_402.push(node);
}
if(node.hasWildcardChild()){
var _407=node.getChild(this.getWildcardChar());
if(_407.kind!=this.kind){
node=null;
}else{
node=_407;
}
}else{
node=null;
}
}while(node!=null);
}else{
var _408=node.findAllMatchingNodes(_400,_406);
for(var j=0;j<_408.length;j++){
_402.push(_408[j]);
}
}
}
return _402;
};
_3e8.matches=function(_40a,_40b){
if(_40b<0||_40b>=_40a.length){
return -1;
}
if(this.matchesToken(_40a[_40b])){
return _40b+1;
}
if(!this.isWildcard()){
return -1;
}else{
if(this.kind!=_40a[_40b].kind){
return -1;
}
do{
_40b++;
}while(_40b<_40a.length&&this.kind==_40a[_40b].kind);
return _40b;
}
};
_3e8.matchesToken=function(_40c){
return this.name==_40c.name&&this.kind==_40c.kind;
};
Node.createNode=function(name,_40e,kind){
var node=new Node();
node.name=name;
node.parent=_40e;
node.kind=kind;
return node;
};
return Node;
})();
var _411=(function(){
var _412=function(name,kind){
this.kind=kind;
this.name=name;
};
return _412;
})();
window.Oid=(function(){
var Oid=function(data){
this.rep=data;
};
var _417=Oid.prototype;
_417.asArray=function(){
return this.rep;
};
_417.asString=function(){
var s="";
for(var i=0;i<this.rep.length;i++){
s+=(this.rep[i].toString());
s+=".";
}
if(s.length>0&&s.charAt(s.length-1)=="."){
s=s.slice(0,s.length-1);
}
return s;
};
Oid.create=function(data){
return new Oid(data.split("."));
};
return Oid;
})();
var _41b=(function(){
var _41c=function(){
};
_41c.create=function(_41d,_41e,_41f){
var _420=_41d+":"+_41e;
var _421=[];
for(var i=0;i<_420.length;++i){
_421.push(_420.charCodeAt(i));
}
var _423="Basic "+Base64.encode(_421);
return new ChallengeResponse(_423,_41f);
};
return _41c;
})();
function InternalDefaultChallengeHandler(){
this.canHandle=function(_424){
return false;
};
this.handle=function(_425,_426){
_426(null);
};
};
window.PasswordAuthentication=(function(){
function PasswordAuthentication(_427,_428){
this.username=_427;
this.password=_428;
};
PasswordAuthentication.prototype.clear=function(){
this.username=null;
this.password=null;
};
return PasswordAuthentication;
})();
window.ChallengeRequest=(function(){
var _429=function(_42a,_42b){
if(_42a==null){
throw new Error("location is not defined.");
}
if(_42b==null){
return;
}
var _42c="Application ";
if(_42b.indexOf(_42c)==0){
_42b=_42b.substring(_42c.length);
}
this.location=_42a;
this.authenticationParameters=null;
var _42d=_42b.indexOf(" ");
if(_42d==-1){
this.authenticationScheme=_42b;
}else{
this.authenticationScheme=_42b.substring(0,_42d);
if(_42b.length>_42d+1){
this.authenticationParameters=_42b.substring(_42d+1);
}
}
};
return _429;
})();
window.ChallengeResponse=(function(){
var _42e=function(_42f,_430){
this.credentials=_42f;
this.nextChallengeHandler=_430;
};
var _431=_42e.prototype;
_431.clearCredentials=function(){
if(this.credentials!=null){
this.credentials=null;
}
};
return _42e;
})();
window.BasicChallengeHandler=(function(){
var _432=function(){
this.loginHandler=undefined;
this.loginHandlersByRealm={};
};
var _433=_432.prototype;
_433.setRealmLoginHandler=function(_434,_435){
if(_434==null){
throw new ArgumentError("null realm");
}
if(_435==null){
throw new ArgumentError("null loginHandler");
}
this.loginHandlersByRealm[_434]=_435;
return this;
};
_433.canHandle=function(_436){
return _436!=null&&"Basic"==_436.authenticationScheme;
};
_433.handle=function(_437,_438){
if(_437.location!=null){
var _439=this.loginHandler;
var _43a=_3cd.getRealm(_437);
if(_43a!=null&&this.loginHandlersByRealm[_43a]!=null){
_439=this.loginHandlersByRealm[_43a];
}
var _43b=this;
if(_439!=null){
_439(function(_43c){
if(_43c!=null&&_43c.username!=null){
_438(_41b.create(_43c.username,_43c.password,_43b));
}else{
_438(null);
}
});
return;
}
}
_438(null);
};
_433.loginHandler=function(_43d){
_43d(null);
};
return _432;
})();
window.DispatchChallengeHandler=(function(){
var _43e=function(){
this.rootNode=new Node();
var _43f="^(.*)://(.*)";
this.SCHEME_URI_PATTERN=new RegExp(_43f);
};
function delChallengeHandlerAtLocation(_440,_441,_442){
var _443=tokenize(_441);
var _444=_440;
for(var i=0;i<_443.length;i++){
var _446=_443[i];
if(!_444.hasChild(_446.name,_446.kind)){
return;
}else{
_444=_444.getChild(_446.name);
}
}
_444.removeValue(_442);
};
function addChallengeHandlerAtLocation(_447,_448,_449){
var _44a=tokenize(_448);
var _44b=_447;
for(var i=0;i<_44a.length;i++){
var _44d=_44a[i];
if(!_44b.hasChild(_44d.name,_44d.kind)){
_44b=_44b.addChild(_44d.name,_44d.kind);
}else{
_44b=_44b.getChild(_44d.name);
}
}
_44b.appendValues(_449);
};
function lookupByLocation(_44e,_44f){
var _450=new Array();
if(_44f!=null){
var _451=findBestMatchingNode(_44e,_44f);
if(_451!=null){
return _451.values;
}
}
return _450;
};
function lookupByRequest(_452,_453){
var _454=null;
var _455=_453.location;
if(_455!=null){
var _456=findBestMatchingNode(_452,_455);
if(_456!=null){
var _457=_456.getValues();
if(_457!=null){
for(var i=0;i<_457.length;i++){
var _459=_457[i];
if(_459.canHandle(_453)){
_454=_459;
break;
}
}
}
}
}
return _454;
};
function findBestMatchingNode(_45a,_45b){
var _45c=tokenize(_45b);
var _45d=0;
return _45a.findBestMatchingNode(_45c,_45d);
};
function tokenize(uri){
var _45f=new Array();
if(uri==null||uri.length==0){
return _45f;
}
var _460=new RegExp("^(([^:/?#]+):(//))?([^/?#]*)?([^?#]*)(\\?([^#]*))?(#(.*))?");
var _461=_460.exec(uri);
if(_461==null){
return _45f;
}
var _462=_461[2]||"http";
var _463=_461[4];
var path=_461[5];
var _465=null;
var _466=null;
var _467=null;
var _468=null;
if(_463!=null){
var host=_463;
var _46a=host.indexOf("@");
if(_46a>=0){
_466=host.substring(0,_46a);
host=host.substring(_46a+1);
var _46b=_466.indexOf(":");
if(_46b>=0){
_467=_466.substring(0,_46b);
_468=_466.substring(_46b+1);
}
}
var _46c=host.indexOf(":");
if(_46c>=0){
_465=host.substring(_46c+1);
host=host.substring(0,_46c);
}
}else{
throw new ArgumentError("Hostname is required.");
}
var _46d=host.split(/\./);
_46d.reverse();
for(var k=0;k<_46d.length;k++){
_45f.push(new _411(_46d[k],_3ca.HOST));
}
if(_465!=null){
_45f.push(new _411(_465,_3ca.PORT));
}else{
if(getDefaultPort(_462)>0){
_45f.push(new _411(getDefaultPort(_462).toString(),_3ca.PORT));
}
}
if(_466!=null){
if(_467!=null){
_45f.push(new _411(_467,_3ca.USERINFO));
}
if(_468!=null){
_45f.push(new _411(_468,_3ca.USERINFO));
}
if(_467==null&&_468==null){
_45f.push(new _411(_466,_3ca.USERINFO));
}
}
if(isNotBlank(path)){
if(path.charAt(0)=="/"){
path=path.substring(1);
}
if(isNotBlank(path)){
var _46f=path.split("/");
for(var p=0;p<_46f.length;p++){
var _471=_46f[p];
_45f.push(new _411(_471,_3ca.PATH));
}
}
}
return _45f;
};
function getDefaultPort(_472){
if(defaultPortsByScheme[_472.toLowerCase()]!=null){
return defaultPortsByScheme[_472];
}else{
return -1;
}
};
function defaultPortsByScheme(){
http=80;
ws=80;
wss=443;
https=443;
};
function isNotBlank(s){
return s!=null&&s.length>0;
};
var _474=_43e.prototype;
_474.clear=function(){
this.rootNode=new Node();
};
_474.canHandle=function(_475){
return lookupByRequest(this.rootNode,_475)!=null;
};
_474.handle=function(_476,_477){
var _478=lookupByRequest(this.rootNode,_476);
if(_478==null){
return null;
}
return _478.handle(_476,_477);
};
_474.register=function(_479,_47a){
if(_479==null||_479.length==0){
throw new Error("Must specify a location to handle challenges upon.");
}
if(_47a==null){
throw new Error("Must specify a handler to handle challenges.");
}
addChallengeHandlerAtLocation(this.rootNode,_479,_47a);
return this;
};
_474.unregister=function(_47b,_47c){
if(_47b==null||_47b.length==0){
throw new Error("Must specify a location to un-register challenge handlers upon.");
}
if(_47c==null){
throw new Error("Must specify a handler to un-register.");
}
delChallengeHandlerAtLocation(this.rootNode,_47b,_47c);
return this;
};
return _43e;
})();
window.NegotiableChallengeHandler=(function(){
var _47d=function(){
this.candidateChallengeHandlers=new Array();
};
var _47e=function(_47f){
var oids=new Array();
for(var i=0;i<_47f.length;i++){
oids.push(Oid.create(_47f[i]).asArray());
}
var _482=GssUtils.sizeOfSpnegoInitialContextTokenWithOids(null,oids);
var _483=ByteBuffer.allocate(_482);
_483.skip(_482);
GssUtils.encodeSpnegoInitialContextTokenWithOids(null,oids,_483);
return ByteArrayUtils.arrayToByteArray(Base64Util.encodeBuffer(_483));
};
var _484=_47d.prototype;
_484.register=function(_485){
if(_485==null){
throw new Error("handler is null");
}
for(var i=0;i<this.candidateChallengeHandlers.length;i++){
if(_485===this.candidateChallengeHandlers[i]){
return this;
}
}
this.candidateChallengeHandlers.push(_485);
return this;
};
_484.canHandle=function(_487){
return _487!=null&&_487.authenticationScheme=="Negotiate"&&_487.authenticationParameters==null;
};
_484.handle=function(_488,_489){
if(_488==null){
throw Error(new ArgumentError("challengeRequest is null"));
}
var _48a=new _3d3();
for(var i=0;i<this.candidateChallengeHandlers.length;i++){
var _48c=this.candidateChallengeHandlers[i];
if(_48c.canHandle(_488)){
try{
var _48d=_48c.getSupportedOids();
for(var j=0;j<_48d.length;j++){
var oid=new Oid(_48d[j]).asString();
if(!_48a.containsKey(oid)){
_48a.put(oid,_48c);
}
}
}
catch(e){
}
}
}
if(_48a.isEmpty()){
_489(null);
return;
}
};
return _47d;
})();
window.NegotiableChallengeHandler=(function(){
var _490=function(){
this.loginHandler=undefined;
};
_490.prototype.getSupportedOids=function(){
return new Array();
};
return _490;
})();
window.NegotiableChallengeHandler=(function(){
var _491=function(){
this.loginHandler=undefined;
};
_491.prototype.getSupportedOids=function(){
return new Array();
};
return _491;
})();
var _492={};
(function(){
var _493=_270.getLogger("com.kaazing.gateway.client.html5.Windows1252");
var _494={8364:128,129:129,8218:130,402:131,8222:132,8230:133,8224:134,8225:135,710:136,8240:137,352:138,8249:139,338:140,141:141,381:142,143:143,144:144,8216:145,8217:146,8220:147,8221:148,8226:149,8211:150,8212:151,732:152,8482:153,353:154,8250:155,339:156,157:157,382:158,376:159};
var _495={128:8364,129:129,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,141:141,142:381,143:143,144:144,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,157:157,158:382,159:376};
_492.toCharCode=function(n){
if(n<128||(n>159&&n<256)){
return n;
}else{
var _497=_495[n];
if(typeof (_497)=="undefined"){
_493.severe(this,"Windows1252.toCharCode: Error: Could not find "+n);
throw new Error("Windows1252.toCharCode could not find: "+n);
}
return _497;
}
};
_492.fromCharCode=function(code){
if(code<256){
return code;
}else{
var _499=_494[code];
if(typeof (_499)=="undefined"){
_493.severe(this,"Windows1252.fromCharCode: Error: Could not find "+code);
throw new Error("Windows1252.fromCharCode could not find: "+code);
}
return _499;
}
};
var _49a=String.fromCharCode(127);
var NULL=String.fromCharCode(0);
var _49c="\n";
var _49d=function(s){
_493.entering(this,"Windows1252.escapedToArray",s);
var a=[];
for(var i=0;i<s.length;i++){
var code=_492.fromCharCode(s.charCodeAt(i));
if(code==127){
i++;
if(i==s.length){
a.hasRemainder=true;
break;
}
var _4a2=_492.fromCharCode(s.charCodeAt(i));
switch(_4a2){
case 127:
a.push(127);
break;
case 48:
a.push(0);
break;
case 110:
a.push(10);
break;
case 114:
a.push(13);
break;
default:
_493.severe(this,"Windows1252.escapedToArray: Error: Escaping format error");
throw new Error("Escaping format error");
}
}else{
a.push(code);
}
}
return a;
};
var _4a3=function(buf){
_493.entering(this,"Windows1252.toEscapedByteString",buf);
var a=[];
while(buf.remaining()){
var n=buf.getUnsigned();
var chr=String.fromCharCode(_492.toCharCode(n));
switch(chr){
case _49a:
a.push(_49a);
a.push(_49a);
break;
case NULL:
a.push(_49a);
a.push("0");
break;
case _49c:
a.push(_49a);
a.push("n");
break;
default:
a.push(chr);
}
}
return a.join("");
};
_492.toArray=function(s,_4a9){
_493.entering(this,"Windows1252.toArray",{"s":s,"escaped":_4a9});
if(_4a9){
return _49d(s);
}else{
var a=[];
for(var i=0;i<s.length;i++){
a.push(_492.fromCharCode(s.charCodeAt(i)));
}
return a;
}
};
_492.toByteString=function(buf,_4ad){
_493.entering(this,"Windows1252.toByteString",{"buf":buf,"escaped":_4ad});
if(_4ad){
return _4a3(buf);
}else{
var a=[];
while(buf.remaining()){
var n=buf.getUnsigned();
a.push(String.fromCharCode(_492.toCharCode(n)));
}
return a.join("");
}
};
})();
function CloseEvent(_4b0,_4b1,_4b2,_4b3){
this.reason=_4b3;
this.code=_4b2;
this.wasClean=_4b1;
this.type="close";
this.bubbles=true;
this.cancelable=true;
this.target=_4b0;
};
function MessageEvent(_4b4,_4b5,_4b6){
return {target:_4b4,data:_4b5,origin:_4b6,bubbles:true,cancelable:true,type:"message",lastEventId:""};
};
(function(){
if(typeof (Blob)!=="undefined"){
try{
var temp=new Blob(["Blob"]);
return;
}
catch(e){
}
}
var _4b8=function(_4b9,_4ba){
var _4bb=_4ba||{};
if(window.WebKitBlobBuilder){
var _4bc=new window.WebKitBlobBuilder();
for(var i=0;i<_4b9.length;i++){
var part=_4b9[i];
if(_4bb.endings){
_4bc.append(part,_4bb.endings);
}else{
_4bc.append(part);
}
}
var blob;
if(_4bb.type){
blob=_4bc.getBlob(type);
}else{
blob=_4bc.getBlob();
}
blob.slice=blob.webkitSlice||blob.slice;
return blob;
}else{
if(window.MozBlobBuilder){
var _4bc=new window.MozBlobBuilder();
for(var i=0;i<_4b9.length;i++){
var part=_4b9[i];
if(_4bb.endings){
_4bc.append(part,_4bb.endings);
}else{
_4bc.append(part);
}
}
var blob;
if(_4bb.type){
blob=_4bc.getBlob(type);
}else{
blob=_4bc.getBlob();
}
blob.slice=blob.mozSlice||blob.slice;
return blob;
}else{
var _4c0=[];
for(var i=0;i<_4b9.length;i++){
var part=_4b9[i];
if(typeof part==="string"){
var b=BlobUtils.fromString(part,_4bb.endings);
_4c0.push(b);
}else{
if(part.byteLength){
var _4c2=new Uint8Array(part);
for(var i=0;i<part.byteLength;i++){
_4c0.push(_4c2[i]);
}
}else{
if(part.length){
_4c0.push(part);
}else{
if(part._array){
_4c0.push(part._array);
}else{
throw new Error("invalid type in Blob constructor");
}
}
}
}
}
var blob=concatMemoryBlobs(_4c0);
blob.type=_4bb.type;
return blob;
}
}
};
function MemoryBlob(_4c3,_4c4){
return {_array:_4c3,size:_4c3.length,type:_4c4||"",slice:function(_4c5,end,_4c7){
var a=this._array.slice(_4c5,end);
return MemoryBlob(a,_4c7);
},toString:function(){
return "MemoryBlob: "+_4c3.toString();
}};
};
function concatMemoryBlobs(_4c9){
var a=Array.prototype.concat.apply([],_4c9);
return new MemoryBlob(a);
};
window.Blob=_4b8;
})();
(function(_4cb){
_4cb.BlobUtils={};
BlobUtils.asString=function asString(blob,_4cd,end){
if(blob._array){
}else{
if(FileReader){
var _4cf=new FileReader();
_4cf.readAsText(blob);
_4cf.onload=function(){
cb(_4cf.result);
};
_4cf.onerror=function(e){
console.log(e,_4cf);
};
}
}
};
BlobUtils.asNumberArray=(function(){
var _4d1=[];
var _4d2=function(){
if(_4d1.length>0){
try{
var _4d3=_4d1.shift();
_4d3.cb(_4d3.blob._array);
}
finally{
if(_4d1.length>0){
setTimeout(function(){
_4d2();
},0);
}
}
}
};
var _4d4=function(cb,blob){
if(blob._array){
_4d1.push({cb:cb,blob:blob});
if(_4d1.length==1){
setTimeout(function(){
_4d2();
},0);
}
}else{
if(FileReader){
var _4d7=new FileReader();
_4d7.readAsArrayBuffer(blob);
_4d7.onload=function(){
var _4d8=new DataView(_4d7.result);
var a=[];
for(var i=0;i<_4d7.result.byteLength;i++){
a.push(_4d8.getUint8(i));
}
cb(a);
};
}else{
throw new Error("Cannot convert Blob to binary string");
}
}
};
return _4d4;
})();
BlobUtils.asBinaryString=function asBinaryString(cb,blob){
if(blob._array){
var _4dd=blob._array;
var a=[];
for(var i=0;i<_4dd.length;i++){
a.push(String.fromCharCode(_4dd[i]));
}
setTimeout(function(){
cb(a.join(""));
},0);
}else{
if(FileReader){
var _4e0=new FileReader();
if(_4e0.readAsBinaryString){
_4e0.readAsBinaryString(blob);
_4e0.onload=function(){
cb(_4e0.result);
};
}else{
_4e0.readAsArrayBuffer(blob);
_4e0.onload=function(){
var _4e1=new DataView(_4e0.result);
var a=[];
for(var i=0;i<_4e0.result.byteLength;i++){
a.push(String.fromCharCode(_4e1.getUint8(i)));
}
cb(a.join(""));
};
}
}else{
throw new Error("Cannot convert Blob to binary string");
}
}
};
BlobUtils.fromBinaryString=function fromByteString(s){
var _4e5=[];
for(var i=0;i<s.length;i++){
_4e5.push(s.charCodeAt(i));
}
return BlobUtils.fromNumberArray(_4e5);
};
BlobUtils.fromNumberArray=function fromNumberArray(a){
if(typeof (Uint8Array)!=="undefined"){
return new Blob([new Uint8Array(a)]);
}else{
return new Blob([a]);
}
};
BlobUtils.fromString=function fromString(s,_4e9){
if(_4e9&&_4e9==="native"){
if(navigator.userAgent.indexOf("Windows")!=-1){
s=s.replace("\r\n","\n","g").replace("\n","\r\n","g");
}
}
var buf=new ByteBuffer();
Charset.UTF8.encode(s,buf);
var a=buf.array;
return BlobUtils.fromNumberArray(a);
};
})(window);
var _4ec=function(){
this._queue=[];
this._count=0;
this.completion;
};
_4ec.prototype.enqueue=function(cb){
var _4ee=this;
var _4ef={};
_4ef.cb=cb;
_4ef.id=this._count++;
this._queue.push(_4ef);
var func=function(){
_4ee.processQueue(_4ef.id,cb,arguments);
};
return func;
};
_4ec.prototype.processQueue=function(id,cb,args){
for(var i=0;i<this._queue.length;i++){
if(this._queue[i].id==id){
this._queue[i].args=args;
break;
}
}
while(this._queue.length&&this._queue[0].args!==undefined){
var _4f5=this._queue.shift();
_4f5.cb.apply(null,_4f5.args);
}
};
var _4f6=(function(){
var _4f7=function(_4f8,_4f9){
this.label=_4f8;
this.value=_4f9;
};
return _4f7;
})();
var _4fa=(function(){
var _4fb=function(_4fc){
var uri=new URI(_4fc);
if(isValidScheme(uri.scheme)){
this._uri=uri;
}else{
throw new Error("HttpURI - invalid scheme: "+_4fc);
}
};
function isValidScheme(_4fe){
return "http"==_4fe||"https"==_4fe;
};
var _4ff=_4fb.prototype;
_4ff.getURI=function(){
return this._uri;
};
_4ff.duplicate=function(uri){
try{
return new _4fb(uri);
}
catch(e){
throw e;
}
return null;
};
_4ff.isSecure=function(){
return ("https"==this._uri.scheme);
};
_4ff.toString=function(){
return this._uri.toString();
};
_4fb.replaceScheme=function(_501,_502){
var uri=URI.replaceProtocol(_501,_502);
return new _4fb(uri);
};
return _4fb;
})();
var _504=(function(){
var _505=function(_506){
var uri=new URI(_506);
if(isValidScheme(uri.scheme)){
this._uri=uri;
if(uri.port==undefined){
this._uri=new URI(_505.addDefaultPort(_506));
}
}else{
throw new Error("WSURI - invalid scheme: "+_506);
}
};
function isValidScheme(_508){
return "ws"==_508||"wss"==_508;
};
function duplicate(uri){
try{
return new _505(uri);
}
catch(e){
throw e;
}
return null;
};
var _50a=_505.prototype;
_50a.getAuthority=function(){
return this._uri.authority;
};
_50a.isSecure=function(){
return "wss"==this._uri.scheme;
};
_50a.getHttpEquivalentScheme=function(){
return this.isSecure()?"https":"http";
};
_50a.toString=function(){
return this._uri.toString();
};
var _50b=80;
var _50c=443;
_505.setDefaultPort=function(uri){
if(uri.port==0){
if(uri.scheme=="ws"){
uri.port=_50b;
}else{
if(uri.scheme=="wss"){
uri.port=_50c;
}else{
if(uri.scheme=="http"){
uri.port=80;
}else{
if(uri.schemel=="https"){
uri.port=443;
}else{
throw new Error("Unknown protocol: "+uri.scheme);
}
}
}
}
uri.authority=uri.host+":"+uri.port;
}
};
_505.addDefaultPort=function(_50e){
var uri=new URI(_50e);
if(uri.port==undefined){
_505.setDefaultPort(uri);
}
return uri.toString();
};
_505.replaceScheme=function(_510,_511){
var uri=URI.replaceProtocol(_510,_511);
return new _505(uri);
};
return _505;
})();
var _513=(function(){
var _514={};
_514["ws"]="ws";
_514["wss"]="wss";
_514["javascript:wse"]="ws";
_514["javascript:wse+ssl"]="wss";
_514["javascript:ws"]="ws";
_514["javascript:wss"]="wss";
_514["flash:wsr"]="ws";
_514["flash:wsr+ssl"]="wss";
_514["flash:wse"]="ws";
_514["flash:wse+ssl"]="wss";
var _515=function(_516){
var _517=getProtocol(_516);
if(isValidScheme(_517)){
this._uri=new URI(URI.replaceProtocol(_516,_514[_517]));
this._compositeScheme=_517;
this._location=_516;
}else{
throw new SyntaxError("WSCompositeURI - invalid composite scheme: "+getProtocol(_516));
}
};
function getProtocol(_518){
var indx=_518.indexOf("://");
if(indx>0){
return _518.substr(0,indx);
}else{
return "";
}
};
function isValidScheme(_51a){
return _514[_51a]!=null;
};
function duplicate(uri){
try{
return new _515(uri);
}
catch(e){
throw e;
}
return null;
};
var _51c=_515.prototype;
_51c.isSecure=function(){
var _51d=this._uri.scheme;
return "wss"==_514[_51d];
};
_51c.getWSEquivalent=function(){
try{
var _51e=_514[this._compositeScheme];
return _504.replaceScheme(this._location,_51e);
}
catch(e){
throw e;
}
return null;
};
_51c.getPlatformPrefix=function(){
if(this._compositeScheme.indexOf("javascript:")===0){
return "javascript";
}else{
if(this._compositeScheme.indexOf("flash:")===0){
return "flash";
}else{
return "";
}
}
};
_51c.toString=function(){
return this._location;
};
return _515;
})();
var _51f=(function(){
var _520=function(_521,_522,_523){
if(arguments.length<3){
var s="ResumableTimer: Please specify the required parameters 'callback', 'delay', and 'updateDelayWhenPaused'.";
throw Error(s);
}
if((typeof (_521)=="undefined")||(_521==null)){
var s="ResumableTimer: Please specify required parameter 'callback'.";
throw Error(s);
}else{
if(typeof (_521)!="function"){
var s="ResumableTimer: Required parameter 'callback' must be a function.";
throw Error(s);
}
}
if(typeof (_522)=="undefined"){
var s="ResumableTimer: Please specify required parameter 'delay' of type integer.";
throw Error(s);
}else{
if((typeof (_522)!="number")||(_522<=0)){
var s="ResumableTimer: Required parameter 'delay' should be a positive integer.";
throw Error(s);
}
}
if(typeof (_523)=="undefined"){
var s="ResumableTimer: Please specify required boolean parameter 'updateDelayWhenPaused'.";
throw Error(s);
}else{
if(typeof (_523)!="boolean"){
var s="ResumableTimer: Required parameter 'updateDelayWhenPaused' is a boolean.";
throw Error(s);
}
}
this._delay=_522;
this._updateDelayWhenPaused=_523;
this._callback=_521;
this._timeoutId=-1;
this._startTime=-1;
};
var _525=_520.prototype;
_525.cancel=function(){
if(this._timeoutId!=-1){
window.clearTimeout(this._timeoutId);
this._timeoutId=-1;
}
this._delay=-1;
this._callback=null;
};
_525.pause=function(){
if(this._timeoutId==-1){
return;
}
window.clearTimeout(this._timeoutId);
var _526=new Date().getTime();
var _527=_526-this._startTime;
this._timeoutId=-1;
if(this._updateDelayWhenPaused){
this._delay=this._delay-_527;
}
};
_525.resume=function(){
if(this._timeoutId!=-1){
return;
}
if(this._callback==null){
var s="Timer cannot be resumed as it has been canceled.";
throw new Error(s);
}
this.start();
};
_525.start=function(){
if(this._delay<0){
var s="Timer delay cannot be negative";
}
this._timeoutId=window.setTimeout(this._callback,this._delay);
this._startTime=new Date().getTime();
};
return _520;
})();
var _52a=(function(){
var _52b=function(){
this._parent=null;
this._challengeResponse=new ChallengeResponse(null,null);
};
_52b.prototype.toString=function(){
return "[Channel]";
};
return _52b;
})();
var _52c=(function(){
var _52d=function(_52e,_52f,_530){
_52a.apply(this,arguments);
this._location=_52e;
this._protocol=_52f;
this._extensions=[];
this._controlFrames={};
this._controlFramesBinary={};
this._escapeSequences={};
this._handshakePayload="";
this._isEscape=false;
this._bufferedAmount=0;
};
var _531=_52d.prototype=new _52a();
_531.getBufferedAmount=function(){
return this._bufferedAmount;
};
_531.toString=function(){
return "[WebSocketChannel "+_location+" "+_protocol!=null?_protocol:"-"+"]";
};
return _52d;
})();
var _532=(function(){
var _533=function(){
this._nextHandler;
this._listener;
};
var _534=_533.prototype;
_534.processConnect=function(_535,_536,_537){
this._nextHandler.processConnect(_535,_536,_537);
};
_534.processAuthorize=function(_538,_539){
this._nextHandler.processAuthorize(_538,_539);
};
_534.processTextMessage=function(_53a,text){
this._nextHandler.processTextMessage(_53a,text);
};
_534.processBinaryMessage=function(_53c,_53d){
this._nextHandler.processBinaryMessage(_53c,_53d);
};
_534.processClose=function(_53e,code,_540){
this._nextHandler.processClose(_53e,code,_540);
};
_534.setIdleTimeout=function(_541,_542){
this._nextHandler.setIdleTimeout(_541,_542);
};
_534.setListener=function(_543){
this._listener=_543;
};
_534.setNextHandler=function(_544){
this._nextHandler=_544;
};
return _533;
})();
var _545=function(_546){
this.connectionOpened=function(_547,_548){
_546._listener.connectionOpened(_547,_548);
};
this.textMessageReceived=function(_549,s){
_546._listener.textMessageReceived(_549,s);
};
this.binaryMessageReceived=function(_54b,obj){
_546._listener.binaryMessageReceived(_54b,obj);
};
this.connectionClosed=function(_54d,_54e,code,_550){
_546._listener.connectionClosed(_54d,_54e,code,_550);
};
this.connectionError=function(_551,e){
_546._listener.connectionError(_551,e);
};
this.connectionFailed=function(_553){
_546._listener.connectionFailed(_553);
};
this.authenticationRequested=function(_554,_555,_556){
_546._listener.authenticationRequested(_554,_555,_556);
};
this.redirected=function(_557,_558){
_546._listener.redirected(_557,_558);
};
this.onBufferedAmountChange=function(_559,n){
_546._listener.onBufferedAmountChange(_559,n);
};
};
var _55b=(function(){
var _55c=function(){
var _55d="";
var _55e="";
};
_55c.KAAZING_EXTENDED_HANDSHAKE="x-kaazing-handshake";
_55c.KAAZING_SEC_EXTENSION_REVALIDATE="x-kaazing-http-revalidate";
_55c.HEADER_SEC_PROTOCOL="X-WebSocket-Protocol";
_55c.HEADER_SEC_EXTENSIONS="X-WebSocket-Extensions";
_55c.KAAZING_SEC_EXTENSION_IDLE_TIMEOUT="x-kaazing-idle-timeout";
_55c.KAAZING_SEC_EXTENSION_PING_PONG="x-kaazing-ping-pong";
return _55c;
})();
var _55f=(function(){
var _560=function(_561,_562){
_52c.apply(this,arguments);
this.requestHeaders=[];
this.responseHeaders={};
this.readyState=WebSocket.CONNECTING;
this.authenticationReceived=false;
this.wasCleanClose=false;
this.closeCode=1006;
this.closeReason="";
this.preventFallback=false;
};
return _560;
})();
var _563=(function(){
var _564=function(){
};
var _565=_564.prototype;
_565.createChannel=function(_566,_567,_568){
var _569=new _55f(_566,_567,_568);
return _569;
};
return _564;
})();
var _56a=(function(){
var _56b=function(){
};
var _56c=_56b.prototype;
_56c.createChannel=function(_56d,_56e){
var _56f=new _55f(_56d,_56e);
return _56f;
};
return _56b;
})();
var _570=(function(){
var _571=function(_572,_573){
this._location=_572.getWSEquivalent();
this._protocol=_573;
this._webSocket;
this._compositeScheme=_572._compositeScheme;
this._connectionStrategies=[];
this._selectedChannel;
this.readyState=0;
this._closing=false;
this._negotiatedExtensions={};
this._compositeScheme=_572._compositeScheme;
};
var _574=_571.prototype=new _52c();
_574.getReadyState=function(){
return this.readyState;
};
_574.getWebSocket=function(){
return this._webSocket;
};
_574.getCompositeScheme=function(){
return this._compositeScheme;
};
_574.getNextStrategy=function(){
if(this._connectionStrategies.length<=0){
return null;
}else{
return this._connectionStrategies.shift();
}
};
_574.getRedirectPolicy=function(){
return this.getWebSocket().getRedirectPolicy();
};
return _571;
})();
var _575=(function(){
var _576="WebSocketControlFrameHandler";
var LOG=_270.getLogger(_576);
var _578=function(){
LOG.finest(_576,"<init>");
};
var _579=function(_57a,_57b){
var _57c=0;
for(var i=_57b;i<_57b+4;i++){
_57c=(_57c<<8)+_57a.getAt(i);
}
return _57c;
};
var _57e=function(_57f){
if(_57f.byteLength>3){
var _580=new DataView(_57f);
return _580.getInt32(0);
}
return 0;
};
var _581=function(_582){
var _583=0;
for(var i=0;i<4;i++){
_583=(_583<<8)+_582.charCodeAt(i);
}
return _583;
};
var ping=[9,0];
var pong=[10,0];
var _587={};
var _588=function(_589){
if(typeof _587.escape==="undefined"){
var _58a=[];
var i=4;
do{
_58a[--i]=_589&(255);
_589=_589>>8;
}while(i);
_587.escape=String.fromCharCode.apply(null,_58a.concat(pong));
}
return _587.escape;
};
var _58c=function(_58d,_58e,_58f,_590){
if(_55b.KAAZING_SEC_EXTENSION_REVALIDATE==_58e._controlFrames[_590]){
var url=_58f.substr(5);
if(_58e._redirectUri!=null){
if(typeof (_58e._redirectUri)=="string"){
var _592=new URI(_58e._redirectUri);
url=_592.scheme+"://"+_592.authority+url;
}else{
url=_58e._redirectUri.getHttpEquivalentScheme()+"://"+_58e._redirectUri.getAuthority()+url;
}
}else{
url=_58e._location.getHttpEquivalentScheme()+"://"+_58e._location.getAuthority()+url;
}
_58d._listener.authenticationRequested(_58e,url,_55b.KAAZING_SEC_EXTENSION_REVALIDATE);
}else{
if(_55b.KAAZING_SEC_EXTENSION_PING_PONG==_58e._controlFrames[_590]){
if(_58f.charCodeAt(4)==ping[0]){
var pong=_588(_590);
_58d._nextHandler.processTextMessage(_58e,pong);
}
}
}
};
var _594=_578.prototype=new _532();
_594.handleConnectionOpened=function(_595,_596){
LOG.finest(_576,"handleConnectionOpened");
var _597=_595.responseHeaders;
if(_597[_55b.HEADER_SEC_EXTENSIONS]!=null){
var _598=_597[_55b.HEADER_SEC_EXTENSIONS];
if(_598!=null&&_598.length>0){
var _599=_598.split(",");
for(var j=0;j<_599.length;j++){
var tmp=_599[j].split(";");
var ext=tmp[0].replace(/^\s+|\s+$/g,"");
var _59d=new WebSocketExtension(ext);
_59d.enabled=true;
_59d.negotiated=true;
if(tmp.length>1){
var _59e=tmp[1].replace(/^\s+|\s+$/g,"");
if(_59e.length==8){
try{
var _59f=parseInt(_59e,16);
_595._controlFrames[_59f]=ext;
if(_55b.KAAZING_SEC_EXTENSION_REVALIDATE===ext){
_595._controlFramesBinary[_59f]=ext;
}
_59d.escape=_59e;
}
catch(e){
LOG.finest(_576,"parse control frame bytes error");
}
}
}
_595.parent._negotiatedExtensions[ext]=_59d;
}
}
}
this._listener.connectionOpened(_595,_596);
};
_594.handleTextMessageReceived=function(_5a0,_5a1){
LOG.finest(_576,"handleMessageReceived",_5a1);
if(_5a0._isEscape){
_5a0._isEscape=false;
this._listener.textMessageReceived(_5a0,_5a1);
return;
}
if(_5a1==null||_5a1.length<4){
this._listener.textMessageReceived(_5a0,_5a1);
return;
}
var _5a2=_581(_5a1);
if(_5a0._controlFrames[_5a2]!=null){
if(_5a1.length==4){
_5a0._isEscape=true;
return;
}else{
_58c(this,_5a0,_5a1,_5a2);
}
}else{
this._listener.textMessageReceived(_5a0,_5a1);
}
};
_594.handleMessageReceived=function(_5a3,_5a4){
LOG.finest(_576,"handleMessageReceived",_5a4);
if(_5a3._isEscape){
_5a3._isEscape=false;
this._listener.binaryMessageReceived(_5a3,_5a4);
return;
}
if(typeof (_5a4.byteLength)!="undefined"){
var _5a5=_57e(_5a4);
if(_5a3._controlFramesBinary[_5a5]!=null){
if(_5a4.byteLength==4){
_5a3._isEscape=true;
return;
}else{
_58c(this,_5a3,String.fromCharCode.apply(null,new Uint8Array(_5a4,0)),_5a5);
}
}else{
this._listener.binaryMessageReceived(_5a3,_5a4);
}
}else{
if(_5a4.constructor==ByteBuffer){
if(_5a4==null||_5a4.limit<4){
this._listener.binaryMessageReceived(_5a3,_5a4);
return;
}
var _5a5=_579(_5a4,_5a4.position);
if(_5a3._controlFramesBinary[_5a5]!=null){
if(_5a4.limit==4){
_5a3._isEscape=true;
return;
}else{
_58c(this,_5a3,_5a4.getString(Charset.UTF8),_5a5);
}
}else{
this._listener.binaryMessageReceived(_5a3,_5a4);
}
}
}
};
_594.processTextMessage=function(_5a6,_5a7){
if(_5a7.length>=4){
var _5a8=_581(_5a7);
if(_5a6._escapeSequences[_5a8]!=null){
var _5a9=_5a7.slice(0,4);
this._nextHandler.processTextMessage(_5a6,_5a9);
}
}
this._nextHandler.processTextMessage(_5a6,_5a7);
};
_594.setNextHandler=function(_5aa){
var _5ab=this;
this._nextHandler=_5aa;
var _5ac=new _545(this);
_5ac.connectionOpened=function(_5ad,_5ae){
_5ab.handleConnectionOpened(_5ad,_5ae);
};
_5ac.textMessageReceived=function(_5af,buf){
_5ab.handleTextMessageReceived(_5af,buf);
};
_5ac.binaryMessageReceived=function(_5b1,buf){
_5ab.handleMessageReceived(_5b1,buf);
};
_5aa.setListener(_5ac);
};
_594.setListener=function(_5b3){
this._listener=_5b3;
};
return _578;
})();
var _5b4=(function(){
var LOG=_270.getLogger("RevalidateHandler");
var _5b6=function(_5b7){
LOG.finest("ENTRY Revalidate.<init>");
this.channel=_5b7;
};
var _5b8=function(_5b9){
var _5ba=_5b9.parent;
if(_5ba){
return (_5ba.readyState>=2);
}
return false;
};
var _5bb=_5b6.prototype;
_5bb.connect=function(_5bc){
LOG.finest("ENTRY Revalidate.connect with {0}",_5bc);
if(_5b8(this.channel)){
return;
}
var _5bd=this;
var _5be=new XMLHttpRequest0();
_5be.withCredentials=true;
_5be.open("GET",_5bc+"&.krn="+Math.random(),true);
if(_5bd.channel._challengeResponse!=null&&_5bd.channel._challengeResponse.credentials!=null){
_5be.setRequestHeader("Authorization",_5bd.channel._challengeResponse.credentials);
this.clearAuthenticationData(_5bd.channel);
}
_5be.onreadystatechange=function(){
switch(_5be.readyState){
case 2:
if(_5be.status==403){
_5be.abort();
}
break;
case 4:
if(_5be.status==401){
_5bd.handle401(_5bd.channel,_5bc,_5be.getResponseHeader("WWW-Authenticate"));
return;
}
break;
}
};
_5be.send(null);
};
_5bb.clearAuthenticationData=function(_5bf){
if(_5bf._challengeResponse!=null){
_5bf._challengeResponse.clearCredentials();
}
};
_5bb.handle401=function(_5c0,_5c1,_5c2){
if(_5b8(_5c0)){
return;
}
var _5c3=this;
var _5c4=_5c1;
if(_5c4.indexOf("/;a/")>0){
_5c4=_5c4.substring(0,_5c4.indexOf("/;a/"));
}else{
if(_5c4.indexOf("/;ae/")>0){
_5c4=_5c4.substring(0,_5c4.indexOf("/;ae/"));
}else{
if(_5c4.indexOf("/;ar/")>0){
_5c4=_5c4.substring(0,_5c4.indexOf("/;ar/"));
}
}
}
var _5c5=new ChallengeRequest(_5c4,_5c2);
var _5c6;
if(this.channel._challengeResponse.nextChallengeHandler!=null){
_5c6=this.channel._challengeResponse.nextChallengeHandler;
}else{
_5c6=_5c0.challengeHandler;
}
if(_5c6!=null&&_5c6.canHandle(_5c5)){
_5c6.handle(_5c5,function(_5c7){
try{
if(_5c7!=null&&_5c7.credentials!=null){
_5c3.channel._challengeResponse=_5c7;
_5c3.connect(_5c1);
}
}
catch(e){
}
});
}
};
return _5b6;
})();
var _5c8=(function(){
var _5c9="WebSocketNativeDelegateHandler";
var LOG=_270.getLogger(_5c9);
var _5cb=function(){
LOG.finest(_5c9,"<init>");
};
var _5cc=_5cb.prototype=new _532();
_5cc.processConnect=function(_5cd,uri,_5cf){
LOG.finest(_5c9,"connect",_5cd);
if(_5cd.readyState==WebSocket.CLOSED){
throw new Error("WebSocket is already closed");
}
if(_5cd._delegate==null){
var _5d0=new _2dc();
_5d0.parent=_5cd;
_5cd._delegate=_5d0;
_5d1(_5d0,this);
}
_5cd._delegate.connect(uri.toString(),_5cf);
};
_5cc.processTextMessage=function(_5d2,text){
LOG.finest(_5c9,"processTextMessage",_5d2);
if(_5d2._delegate.readyState()==WebSocket.OPEN){
_5d2._delegate.send(text);
}else{
throw new Error("WebSocket is already closed");
}
};
_5cc.processBinaryMessage=function(_5d4,obj){
LOG.finest(_5c9,"processBinaryMessage",_5d4);
if(_5d4._delegate.readyState()==WebSocket.OPEN){
_5d4._delegate.send(obj);
}else{
throw new Error("WebSocket is already closed");
}
};
_5cc.processClose=function(_5d6,code,_5d8){
LOG.finest(_5c9,"close",_5d6);
try{
_5d6._delegate.close(code,_5d8);
}
catch(e){
LOG.finest(_5c9,"processClose exception: ",e);
}
};
_5cc.setIdleTimeout=function(_5d9,_5da){
LOG.finest(_5c9,"idleTimeout",_5d9);
try{
_5d9._delegate.setIdleTimeout(_5da);
}
catch(e){
LOG.finest(_5c9,"setIdleTimeout exception: ",e);
}
};
var _5d1=function(_5db,_5dc){
var _5dd=new _545(_5dc);
_5db.setListener(_5dd);
};
return _5cb;
})();
var _5de=(function(){
var _5df="WebSocketNativeBalancingHandler";
var LOG=_270.getLogger(_5df);
var _5e1=function(){
LOG.finest(_5df,"<init>");
};
var _5e2=function(_5e3,_5e4,_5e5){
_5e4._redirecting=true;
_5e4._redirectUri=_5e5;
_5e3._nextHandler.processClose(_5e4);
};
var _5e6=_5e1.prototype=new _532();
_5e6.processConnect=function(_5e7,uri,_5e9){
_5e7._balanced=0;
this._nextHandler.processConnect(_5e7,uri,_5e9);
};
_5e6.handleConnectionClosed=function(_5ea,_5eb,code,_5ed){
if(_5ea._redirecting==true){
_5ea._redirecting=false;
var _5ee=_5ea._redirectUri;
var _5ef=_5ea._location;
var _5f0=_5ea.parent;
var _5f1=_5f0.getRedirectPolicy();
if(_5f1 instanceof HttpRedirectPolicy){
if(!_5f1.isRedirectionAllowed(_5ef.toString(),_5ee.toString())){
_5ea.preventFallback=true;
var s=_5f1.toString()+": Cannot redirect from "+_5ef.toString()+" to "+_5ee.toString();
this._listener.connectionClosed(_5ea,false,1006,s);
return;
}
}
_5ea._redirected=true;
_5ea.handshakePayload="";
var _5f3=[_55b.KAAZING_EXTENDED_HANDSHAKE];
for(var i=0;i<_5ea._protocol.length;i++){
_5f3.push(_5ea._protocol[i]);
}
this.processConnect(_5ea,_5ea._redirectUri,_5f3);
}else{
this._listener.connectionClosed(_5ea,_5eb,code,_5ed);
}
};
_5e6.handleMessageReceived=function(_5f5,obj){
LOG.finest(_5df,"handleMessageReceived",obj);
if(_5f5._balanced>1){
this._listener.binaryMessageReceived(_5f5,obj);
return;
}
var _5f7=_2b6(obj);
if(_5f7.charCodeAt(0)==61695){
if(_5f7.match("N$")){
_5f5._balanced++;
if(_5f5._balanced==1){
this._listener.connectionOpened(_5f5,_55b.KAAZING_EXTENDED_HANDSHAKE);
}else{
this._listener.connectionOpened(_5f5,_5f5._acceptedProtocol||"");
}
}else{
if(_5f7.indexOf("R")==1){
var _5f8=new _504(_5f7.substring(2));
_5e2(this,_5f5,_5f8);
}else{
LOG.warning(_5df,"Invalidate balancing message: "+target);
}
}
return;
}else{
this._listener.binaryMessageReceived(_5f5,obj);
}
};
_5e6.setNextHandler=function(_5f9){
this._nextHandler=_5f9;
var _5fa=new _545(this);
var _5fb=this;
_5fa.connectionOpened=function(_5fc,_5fd){
if(_55b.KAAZING_EXTENDED_HANDSHAKE!=_5fd){
_5fc._balanced=2;
_5fb._listener.connectionOpened(_5fc,_5fd);
}
};
_5fa.textMessageReceived=function(_5fe,_5ff){
LOG.finest(_5df,"textMessageReceived",_5ff);
if(_5fe._balanced>1){
_5fb._listener.textMessageReceived(_5fe,_5ff);
return;
}
if(_5ff.charCodeAt(0)==61695){
if(_5ff.match("N$")){
_5fe._balanced++;
if(_5fe._balanced==1){
_5fb._listener.connectionOpened(_5fe,_55b.KAAZING_EXTENDED_HANDSHAKE);
}else{
_5fb._listener.connectionOpened(_5fe,"");
}
}else{
if(_5ff.indexOf("R")==1){
var _600=new _504(_5ff.substring(2));
_5e2(_5fb,_5fe,_600);
}else{
LOG.warning(_5df,"Invalidate balancing message: "+target);
}
}
return;
}else{
_5fb._listener.textMessageReceived(_5fe,_5ff);
}
};
_5fa.binaryMessageReceived=function(_601,obj){
_5fb.handleMessageReceived(_601,obj);
};
_5fa.connectionClosed=function(_603,_604,code,_606){
_5fb.handleConnectionClosed(_603,_604,code,_606);
};
_5f9.setListener(_5fa);
};
_5e6.setListener=function(_607){
this._listener=_607;
};
return _5e1;
})();
var _608=(function(){
var _609="WebSocketNativeHandshakeHandler";
var LOG=_270.getLogger(_609);
var _60b="Sec-WebSocket-Protocol";
var _60c="Sec-WebSocket-Extensions";
var _60d="Authorization";
var _60e="WWW-Authenticate";
var _60f="Set-Cookie";
var _610="GET";
var _611="HTTP/1.1";
var _612=":";
var _613=" ";
var _614="\r\n";
var _615=function(){
LOG.finest(_609,"<init>");
};
var _616=function(_617,_618){
LOG.finest(_609,"sendCookieRequest with {0}",_618);
var _619=new XMLHttpRequest0();
var path=_617._location.getHttpEquivalentScheme()+"://"+_617._location.getAuthority()+(_617._location._uri.path||"");
path=path.replace(/[\/]?$/,"/;api/set-cookies");
_619.open("POST",path,true);
_619.setRequestHeader("Content-Type","text/plain; charset=utf-8");
_619.send(_618);
};
var _61b=function(_61c,_61d,_61e){
var _61f=[];
var _620=[];
_61f.push("WebSocket-Protocol");
_620.push("");
_61f.push(_60b);
_620.push(_61d._protocol.join(","));
var _621=[_55b.KAAZING_SEC_EXTENSION_IDLE_TIMEOUT,_55b.KAAZING_SEC_EXTENSION_PING_PONG];
var ext=_61d._extensions;
if(ext.length>0){
_621.push(ext);
}
_61f.push(_60c);
_620.push(_621.join(","));
_61f.push(_60d);
_620.push(_61e);
var _623=_624(_61d._location,_61f,_620);
_61c._nextHandler.processTextMessage(_61d,_623);
};
var _624=function(_625,_626,_627){
LOG.entering(_609,"encodeGetRequest");
var _628=[];
_628.push(_610);
_628.push(_613);
var path=[];
if(_625._uri.path!=undefined){
path.push(_625._uri.path);
}
if(_625._uri.query!=undefined){
path.push("?");
path.push(_625._uri.query);
}
_628.push(path.join(""));
_628.push(_613);
_628.push(_611);
_628.push(_614);
for(var i=0;i<_626.length;i++){
var _62b=_626[i];
var _62c=_627[i];
if(_62b!=null&&_62c!=null){
_628.push(_62b);
_628.push(_612);
_628.push(_613);
_628.push(_62c);
_628.push(_614);
}
}
_628.push(_614);
var _62d=_628.join("");
return _62d;
};
var _62e=function(_62f,_630,s){
if(s.length>0){
_630.handshakePayload+=s;
return;
}
var _632=_630.handshakePayload.split("\n");
_630.handshakePayload="";
var _633="";
for(var i=_632.length-1;i>=0;i--){
if(_632[i].indexOf("HTTP/1.1")==0){
var temp=_632[i].split(" ");
_633=temp[1];
break;
}
}
if("101"==_633){
var _636=[];
var _637="";
for(var i=0;i<_632.length;i++){
var line=_632[i];
if(line!=null&&line.indexOf(_60c)==0){
_636.push(line.substring(_60c.length+2));
}else{
if(line!=null&&line.indexOf(_60b)==0){
_637=line.substring(_60b.length+2);
}else{
if(line!=null&&line.indexOf(_60f)==0){
_616(_630,line.substring(_60f.length+2));
}
}
}
}
_630._acceptedProtocol=_637;
if(_636.length>0){
var _639=[];
var _63a=_636.join(", ").split(", ");
for(var j=0;j<_63a.length;j++){
var tmp=_63a[j].split(";");
var ext=tmp[0].replace(/^\s+|\s+$/g,"");
var _63e=new WebSocketExtension(ext);
if(_55b.KAAZING_SEC_EXTENSION_IDLE_TIMEOUT===ext){
var _63f=tmp[1].match(/\d+/)[0];
if(_63f>0){
_62f._nextHandler.setIdleTimeout(_630,_63f);
}
continue;
}else{
if(_55b.KAAZING_SEC_EXTENSION_PING_PONG===ext){
try{
var _640=tmp[1].replace(/^\s+|\s+$/g,"");
var _641=parseInt(_640,16);
_630._controlFrames[_641]=ext;
_630._escapeSequences[_641]=ext;
continue;
}
catch(e){
throw new Error("failed to parse escape key for x-kaazing-ping-pong extension");
}
}else{
if(tmp.length>1){
var _640=tmp[1].replace(/^\s+|\s+$/g,"");
if(_640.length==8){
try{
var _641=parseInt(_640,16);
_630._controlFrames[_641]=ext;
if(_55b.KAAZING_SEC_EXTENSION_REVALIDATE===ext){
_630._controlFramesBinary[_641]=ext;
}
_63e.escape=_640;
}
catch(e){
LOG.finest(_609,"parse control frame bytes error");
}
}
}
}
}
_63e.enabled=true;
_63e.negotiated=true;
_639.push(_63a[j]);
}
if(_639.length>0){
_630.parent._negotiatedExtensions[ext]=_639.join(",");
}
}
return;
}else{
if("401"==_633){
_630.handshakestatus=2;
var _642="";
for(var i=0;i<_632.length;i++){
if(_632[i].indexOf(_60e)==0){
_642=_632[i].substring(_60e.length+2);
break;
}
}
_62f._listener.authenticationRequested(_630,_630._location.toString(),_642);
}else{
_62f._listener.connectionFailed(_630);
}
}
};
var _643=function(_644,_645){
try{
_645.handshakestatus=3;
_644._nextHandler.processClose(_645);
}
finally{
_644._listener.connectionFailed(_645);
}
};
var _646=_615.prototype=new _532();
_646.processConnect=function(_647,uri,_649){
_647.handshakePayload="";
var _64a=[_55b.KAAZING_EXTENDED_HANDSHAKE];
for(var i=0;i<_649.length;i++){
_64a.push(_649[i]);
}
this._nextHandler.processConnect(_647,uri,_64a);
if((typeof (_647.parent.connectTimer)=="undefined")||(_647.parent.connectTimer==null)){
_647.handshakestatus=0;
var _64c=this;
setTimeout(function(){
if(_647.handshakestatus==0){
_643(_64c,_647);
}
},5000);
}
};
_646.processAuthorize=function(_64d,_64e){
_61b(this,_64d,_64e);
};
_646.handleConnectionOpened=function(_64f,_650){
LOG.finest(_609,"handleConnectionOpened");
if(_55b.KAAZING_EXTENDED_HANDSHAKE==_650){
_61b(this,_64f,null);
_64f.handshakestatus=1;
if((typeof (_64f.parent.connectTimer)=="undefined")||(_64f.parent.connectTimer==null)){
var _651=this;
setTimeout(function(){
if(_64f.handshakestatus<2){
_643(_651,_64f);
}
},5000);
}
}else{
_64f.handshakestatus=2;
this._listener.connectionOpened(_64f,_650);
}
};
_646.handleMessageReceived=function(_652,_653){
LOG.finest(_609,"handleMessageReceived",_653);
if(_652.readyState==WebSocket.OPEN){
_652._isEscape=false;
this._listener.textMessageReceived(_652,_653);
}else{
_62e(this,_652,_653);
}
};
_646.handleBinaryMessageReceived=function(_654,_655){
LOG.finest(_609,"handleMessageReceived",_655);
if(_654.readyState==WebSocket.OPEN){
_654._isEscape=false;
this._listener.binaryMessageReceived(_654,_655);
}else{
_62e(this,_654,String.fromCharCode.apply(null,new Uint8Array(_655)));
}
};
_646.setNextHandler=function(_656){
this._nextHandler=_656;
var _657=this;
var _658=new _545(this);
_658.connectionOpened=function(_659,_65a){
_657.handleConnectionOpened(_659,_65a);
};
_658.textMessageReceived=function(_65b,buf){
_657.handleMessageReceived(_65b,buf);
};
_658.binaryMessageReceived=function(_65d,buf){
_657.handleBinaryMessageReceived(_65d,buf);
};
_658.connectionClosed=function(_65f,_660,code,_662){
if(_65f.handshakestatus<3){
_65f.handshakestatus=3;
}
_657._listener.connectionClosed(_65f,_660,code,_662);
};
_658.connectionFailed=function(_663){
if(_663.handshakestatus<3){
_663.handshakestatus=3;
}
_657._listener.connectionFailed(_663);
};
_656.setListener(_658);
};
_646.setListener=function(_664){
this._listener=_664;
};
return _615;
})();
var _665=(function(){
var _666="WebSocketNativeAuthenticationHandler";
var LOG=_270.getLogger(_666);
var _668=function(){
LOG.finest(_666,"<init>");
};
var _669=_668.prototype=new _532();
_669.handleClearAuthenticationData=function(_66a){
if(_66a._challengeResponse!=null){
_66a._challengeResponse.clearCredentials();
}
};
_669.handleRemoveAuthenticationData=function(_66b){
this.handleClearAuthenticationData(_66b);
_66b._challengeResponse=new ChallengeResponse(null,null);
};
_669.doError=function(_66c){
this._nextHandler.processClose(_66c);
this.handleClearAuthenticationData(_66c);
this._listener.connectionFailed(_66c);
};
_669.handle401=function(_66d,_66e,_66f){
var _670=this;
var _671=_66d._location;
var _672=null;
if(typeof (_66d.parent.connectTimer)!="undefined"){
_672=_66d.parent.connectTimer;
if(_672!=null){
_672.pause();
}
}
if(_66d.redirectUri!=null){
_671=_66d._redirectUri;
}
if(_55b.KAAZING_SEC_EXTENSION_REVALIDATE==_66f){
var ch=new _55f(_671,_66d._protocol,_66d._isBinary);
ch.challengeHandler=_66d.parent.challengeHandler;
ch.parent=_66d.parent;
var _674=new _5b4(ch);
_674.connect(_66e);
}else{
var _675=new ChallengeRequest(_671.toString(),_66f);
var _676;
if(_66d._challengeResponse.nextChallengeHandler!=null){
_676=_66d._challengeResponse.nextChallengeHandler;
}else{
_676=_66d.parent.challengeHandler;
}
if(_676!=null&&_676.canHandle(_675)){
_676.handle(_675,function(_677){
try{
if(_677==null||_677.credentials==null){
_670.doError(_66d);
}else{
if(_672!=null){
_672.resume();
}
_66d._challengeResponse=_677;
_670._nextHandler.processAuthorize(_66d,_677.credentials);
}
}
catch(e){
_670.doError(_66d);
}
});
}else{
this.doError(_66d);
}
}
};
_669.handleAuthenticate=function(_678,_679,_67a){
_678.authenticationReceived=true;
this.handle401(_678,_679,_67a);
};
_669.setNextHandler=function(_67b){
this._nextHandler=_67b;
var _67c=this;
var _67d=new _545(this);
_67d.authenticationRequested=function(_67e,_67f,_680){
_67c.handleAuthenticate(_67e,_67f,_680);
};
_67b.setListener(_67d);
};
_669.setListener=function(_681){
this._listener=_681;
};
return _668;
})();
var _682=(function(){
var _683="WebSocketHixie76FrameCodecHandler";
var LOG=_270.getLogger(_683);
var _685=function(){
LOG.finest(_683,"<init>");
};
var _686=_685.prototype=new _532();
_686.processConnect=function(_687,uri,_689){
this._nextHandler.processConnect(_687,uri,_689);
};
_686.processBinaryMessage=function(_68a,data){
if(data.constructor==ByteBuffer){
var _68c=data.array.slice(data.position,data.limit);
this._nextHandler.processTextMessage(_68a,Charset.UTF8.encodeByteArray(_68c));
}else{
if(data.byteLength){
this._nextHandler.processTextMessage(_68a,Charset.UTF8.encodeArrayBuffer(data));
}else{
if(data.size){
var _68d=this;
var cb=function(_68f){
_68d._nextHandler.processBinaryMessage(_68a,Charset.UTF8.encodeByteArray(_68f));
};
BlobUtils.asNumberArray(cb,data);
}else{
throw new Error("Invalid type for send");
}
}
}
};
_686.setNextHandler=function(_690){
this._nextHandler=_690;
var _691=this;
var _692=new _545(this);
_692.textMessageReceived=function(_693,text){
_691._listener.binaryMessageReceived(_693,ByteBuffer.wrap(Charset.UTF8.toByteArray(text)));
};
_692.binaryMessageReceived=function(_695,buf){
throw new Error("draft76 won't receive binary frame");
};
_690.setListener(_692);
};
_686.setListener=function(_697){
this._listener=_697;
};
return _685;
})();
var _698=(function(){
var _699="WebSocketNativeHandler";
var LOG=_270.getLogger(_699);
var _69b=function(){
var _69c=new _665();
return _69c;
};
var _69d=function(){
var _69e=new _608();
return _69e;
};
var _69f=function(){
var _6a0=new _575();
return _6a0;
};
var _6a1=function(){
var _6a2=new _5de();
return _6a2;
};
var _6a3=function(){
var _6a4=new _5c8();
return _6a4;
};
var _6a5=function(){
var _6a6=new _682();
return _6a6;
};
var _6a7=(browser=="safari"&&typeof (WebSocket.CLOSING)=="undefined");
var _6a8=_69b();
var _6a9=_69d();
var _6aa=_69f();
var _6ab=_6a1();
var _6ac=_6a3();
var _6ad=_6a5();
var _6ae=function(){
LOG.finest(_699,"<init>");
if(_6a7){
this.setNextHandler(_6ad);
_6ad.setNextHandler(_6a8);
}else{
this.setNextHandler(_6a8);
}
_6a8.setNextHandler(_6a9);
_6a9.setNextHandler(_6aa);
_6aa.setNextHandler(_6ab);
_6ab.setNextHandler(_6ac);
};
var _6af=function(_6b0,_6b1){
LOG.finest(_699,"<init>");
};
var _6b2=_6ae.prototype=new _532();
_6b2.setNextHandler=function(_6b3){
this._nextHandler=_6b3;
var _6b4=new _545(this);
_6b3.setListener(_6b4);
};
_6b2.setListener=function(_6b5){
this._listener=_6b5;
};
return _6ae;
})();
var _6b6=(function(){
var _6b7=_270.getLogger("com.kaazing.gateway.client.html5.WebSocketEmulatedProxyDownstream");
var _6b8=512*1024;
var _6b9=1;
var _6ba=function(_6bb,_6bc){
_6b7.entering(this,"WebSocketEmulatedProxyDownstream.<init>",_6bb);
this.sequence=_6bc;
this.retry=3000;
if(_6bb.indexOf("/;e/dtem/")>0){
this.requiresEscaping=true;
}
var _6bd=new URI(_6bb);
var _6be={"http":80,"https":443};
if(_6bd.port==undefined){
_6bd.port=_6be[_6bd.scheme];
_6bd.authority=_6bd.host+":"+_6bd.port;
}
this.origin=_6bd.scheme+"://"+_6bd.authority;
this.location=_6bb;
this.activeXhr=null;
this.reconnectTimer=null;
this.idleTimer=null;
this.idleTimeout=null;
this.lastMessageTimestamp=null;
this.buf=new ByteBuffer();
var _6bf=this;
setTimeout(function(){
connect(_6bf,true);
_6bf.activeXhr=_6bf.mostRecentXhr;
startProxyDetectionTimer(_6bf,_6bf.mostRecentXhr);
},0);
_6b7.exiting(this,"WebSocketEmulatedProxyDownstream.<init>");
};
var _6c0=_6ba.prototype;
var _6c1=0;
var _6c2=255;
var _6c3=1;
var _6c4=128;
var _6c5=129;
var _6c6=127;
var _6c7=137;
var _6c8=3000;
_6c0.readyState=0;
function connect(_6c9,_6ca){
_6b7.entering(this,"WebSocketEmulatedProxyDownstream.connect");
if(_6c9.reconnectTimer!==null){
_6c9.reconnectTimer=null;
}
stopIdleTimer(_6c9);
var _6cb=new URI(_6c9.location);
var _6cc=[];
var _6cd=_6c9.sequence++;
_6cc.push(".ksn="+_6cd);
switch(browser){
case "ie":
_6cc.push(".kns=1");
_6cc.push(".kf=200&.kp=2048");
break;
case "safari":
_6cc.push(".kp=256");
break;
case "firefox":
_6cc.push(".kp=1025");
break;
case "android":
_6cc.push(".kp=4096");
_6cc.push(".kbp=4096");
break;
}
if(browser=="android"||browser.ios){
_6cc.push(".kkt=20");
}
_6cc.push(".kc=text/plain;charset=windows-1252");
_6cc.push(".kb=4096");
_6cc.push(".kid="+String(Math.random()).substring(2));
if(_6cc.length>0){
if(_6cb.query===undefined){
_6cb.query=_6cc.join("&");
}else{
_6cb.query+="&"+_6cc.join("&");
}
}
var xhr=new XMLHttpRequest0();
xhr.id=_6b9++;
xhr.position=0;
xhr.opened=false;
xhr.reconnect=false;
xhr.requestClosing=false;
xhr.onreadystatechange=function(){
if(xhr.readyState==3){
if(_6c9.idleTimer==null){
var _6cf=xhr.getResponseHeader("X-Idle-Timeout");
if(_6cf){
if(!_6cf.match(/^[\d]+$/)){
doError(_6c9);
throw "Invalid response of header X-Idle-Timeout";
}
var _6d0=parseInt(_6cf);
if(_6d0>0){
_6d0=_6d0*1000;
_6c9.idleTimeout=_6d0;
_6c9.lastMessageTimestamp=new Date().getTime();
startIdleTimer(_6c9,_6d0);
}
}
}
}
};
xhr.onprogress=function(){
if(xhr==_6c9.activeXhr&&_6c9.readyState!=2){
_process(_6c9);
}
};
xhr.onload=function(){
if(xhr==_6c9.activeXhr&&_6c9.readyState!=2){
_process(_6c9);
xhr.onerror=function(){
};
xhr.ontimeout=function(){
};
xhr.onreadystatechange=function(){
};
if(!xhr.reconnect){
doError(_6c9);
}else{
if(xhr.requestClosing){
doClose(_6c9);
}else{
if(_6c9.activeXhr==_6c9.mostRecentXhr){
connect(_6c9);
_6c9.activeXhr=_6c9.mostRecentXhr;
startProxyDetectionTimer(_6c9,_6c9.activeXhr);
}else{
var _6d1=_6c9.mostRecentXhr;
_6c9.activeXhr=_6d1;
switch(_6d1.readyState){
case 1:
case 2:
startProxyDetectionTimer(_6c9,_6d1);
break;
case 3:
_process(_6c9);
break;
case 4:
_6c9.activeXhr.onload();
break;
default:
}
}
}
}
}
};
xhr.ontimeout=function(){
_6b7.entering(this,"WebSocketEmulatedProxyDownstream.connect.xhr.ontimeout");
doError(_6c9);
};
xhr.onerror=function(){
_6b7.entering(this,"WebSocketEmulatedProxyDownstream.connect.xhr.onerror");
doError(_6c9);
};
xhr.open("GET",_6cb.toString(),true);
xhr.send("");
_6c9.mostRecentXhr=xhr;
};
function startProxyDetectionTimer(_6d2,xhr){
if(_6d2.location.indexOf(".ki=p")==-1){
setTimeout(function(){
if(xhr&&xhr.readyState<3&&_6d2.readyState<2){
if(_6d2.location.indexOf("?")==-1){
_6d2.location+="?.ki=p";
}else{
_6d2.location+="&.ki=p";
}
connect(_6d2,false);
}
},_6c8);
}
};
_6c0.disconnect=function(){
_6b7.entering(this,"WebSocketEmulatedProxyDownstream.disconnect");
if(this.readyState!==2){
_disconnect(this);
}
};
function _disconnect(_6d4){
_6b7.entering(this,"WebSocketEmulatedProxyDownstream._disconnect");
if(_6d4.reconnectTimer!==null){
clearTimeout(_6d4.reconnectTimer);
_6d4.reconnectTimer=null;
}
stopIdleTimer(_6d4);
if(_6d4.mostRecentXhr!==null){
_6d4.mostRecentXhr.onprogress=function(){
};
_6d4.mostRecentXhr.onload=function(){
};
_6d4.mostRecentXhr.onerror=function(){
};
_6d4.mostRecentXhr.abort();
}
if(_6d4.activeXhr!=_6d4.mostRecentXhr&&_6d4.activeXhr!==null){
_6d4.activeXhr.onprogress=function(){
};
_6d4.activeXhr.onload=function(){
};
_6d4.activeXhr.onerror=function(){
};
_6d4.activeXhr.abort();
}
_6d4.lineQueue=[];
_6d4.lastEventId=null;
_6d4.location=null;
_6d4.readyState=2;
};
function _process(_6d5){
_6d5.lastMessageTimestamp=new Date().getTime();
var xhr=_6d5.activeXhr;
var _6d7=xhr.responseText;
if(_6d7.length>=_6b8){
if(_6d5.activeXhr==_6d5.mostRecentXhr){
connect(_6d5,false);
}
}
var _6d8=_6d7.slice(xhr.position);
xhr.position=_6d7.length;
var buf=_6d5.buf;
var _6da=_492.toArray(_6d8,_6d5.requiresEscaping);
if(_6da.hasRemainder){
xhr.position--;
}
buf.position=buf.limit;
buf.putBytes(_6da);
buf.position=0;
buf.mark();
parse:
while(true){
if(!buf.hasRemaining()){
break;
}
var type=buf.getUnsigned();
switch(type&128){
case _6c1:
var _6dc=buf.indexOf(_6c2);
if(_6dc==-1){
break parse;
}
var _6dd=buf.array.slice(buf.position,_6dc);
var data=new ByteBuffer(_6dd);
var _6df=_6dc-buf.position;
buf.skip(_6df+1);
buf.mark();
if(type==_6c3){
handleCommandFrame(_6d5,data);
}else{
dispatchText(_6d5,data.getString(Charset.UTF8));
}
break;
case _6c4:
case _6c5:
var _6e0=0;
var _6e1=false;
while(buf.hasRemaining()){
var b=buf.getUnsigned();
_6e0=_6e0<<7;
_6e0|=(b&127);
if((b&128)!=128){
_6e1=true;
break;
}
}
if(!_6e1){
break parse;
}
if(buf.remaining()<_6e0){
break parse;
}
var _6e3=buf.array.slice(buf.position,buf.position+_6e0);
var _6e4=new ByteBuffer(_6e3);
buf.skip(_6e0);
buf.mark();
if(type==_6c4){
dispatchBytes(_6d5,_6e4);
}else{
if(type==_6c7){
dispatchPingReceived(_6d5);
}else{
dispatchText(_6d5,_6e4.getString(Charset.UTF8));
}
}
break;
default:
throw new Error("Emulation protocol error. Unknown frame type: "+type);
}
}
buf.reset();
buf.compact();
};
function handleCommandFrame(_6e5,data){
while(data.remaining()){
var _6e7=String.fromCharCode(data.getUnsigned());
switch(_6e7){
case "0":
break;
case "1":
_6e5.activeXhr.reconnect=true;
break;
case "2":
_6e5.activeXhr.requestClosing=true;
break;
default:
throw new Error("Protocol decode error. Unknown command: "+_6e7);
}
}
};
function dispatchBytes(_6e8,buf){
var e=document.createEvent("Events");
e.initEvent("message",true,true);
e.lastEventId=_6e8.lastEventId;
e.data=buf;
e.decoder=_2af;
e.origin=_6e8.origin;
if(e.source!==null){
e.source=null;
}
if(typeof (_6e8.onmessage)==="function"){
_6e8.onmessage(e);
}
};
function dispatchText(_6eb,data){
var e=document.createEvent("Events");
e.initEvent("message",true,true);
e.lastEventId=_6eb.lastEventId;
e.text=data;
e.origin=_6eb.origin;
if(e.source!==null){
e.source=null;
}
if(typeof (_6eb.onmessage)==="function"){
_6eb.onmessage(e);
}
};
function dispatchPingReceived(_6ee){
if(typeof (_6ee.onping)==="function"){
_6ee.onping();
}
};
function doClose(_6ef){
doError(_6ef);
};
function doError(_6f0){
if(_6f0.readyState!=2){
_6f0.disconnect();
fireError(_6f0);
}
};
function fireError(_6f1){
var e=document.createEvent("Events");
e.initEvent("error",true,true);
if(typeof (_6f1.onerror)==="function"){
_6f1.onerror(e);
}
};
function startIdleTimer(_6f3,_6f4){
stopIdleTimer(_6f3);
_6f3.idleTimer=setTimeout(function(){
idleTimerHandler(_6f3);
},_6f4);
};
function idleTimerHandler(_6f5){
var _6f6=new Date().getTime();
var _6f7=_6f6-_6f5.lastMessageTimestamp;
var _6f8=_6f5.idleTimeout;
if(_6f7>_6f8){
doError(_6f5);
}else{
startIdleTimer(_6f5,_6f8-_6f7);
}
};
function stopIdleTimer(_6f9){
if(_6f9.idleTimer!=null){
clearTimeout(_6f9.idleTimer);
_6f9.IdleTimer=null;
}
};
return _6ba;
})();
var _6fa=(function(){
var _6fb=_270.getLogger("WebSocketEmulatedProxy");
var _6fc=function(){
this.parent;
this._listener;
this.closeCode=1005;
this.closeReason="";
this.sequence=0;
};
var _6fd=_6fc.prototype;
_6fd.connect=function(_6fe,_6ff){
_6fb.entering(this,"WebSocketEmulatedProxy.connect",{"location":_6fe,"subprotocol":_6ff});
this.URL=_6fe.replace("ws","http");
this.protocol=_6ff;
this._prepareQueue=new _4ec();
this._sendQueue=[];
_700(this);
_6fb.exiting(this,"WebSocketEmulatedProxy.<init>");
};
_6fd.readyState=0;
_6fd.bufferedAmount=0;
_6fd.URL="";
_6fd.onopen=function(){
};
_6fd.onerror=function(){
};
_6fd.onmessage=function(_701){
};
_6fd.onclose=function(){
};
var _702=128;
var _703=129;
var _704=0;
var _705=255;
var _706=1;
var _707=138;
var _708=[_706,48,49,_705];
var _709=[_706,48,50,_705];
var _70a=function(buf,_70c){
_6fb.entering(this,"WebSocketEmulatedProxy.encodeLength",{"buf":buf,"length":_70c});
var _70d=0;
var _70e=0;
do{
_70e<<=8;
_70e|=(_70c&127);
_70c>>=7;
_70d++;
}while(_70c>0);
do{
var _70f=_70e&255;
_70e>>=8;
if(_70d!=1){
_70f|=128;
}
buf.put(_70f);
}while(--_70d>0);
};
_6fd.send=function(data){
var _711=this;
_6fb.entering(this,"WebSocketEmulatedProxy.send",{"data":data});
switch(this.readyState){
case 0:
_6fb.severe(this,"WebSocketEmulatedProxy.send: Error: readyState is 0");
throw new Error("INVALID_STATE_ERR");
case 1:
if(data===null){
_6fb.severe(this,"WebSocketEmulatedProxy.send: Error: data is null");
throw new Error("data is null");
}
var buf=new ByteBuffer();
if(typeof data=="string"){
_6fb.finest(this,"WebSocketEmulatedProxy.send: Data is string");
var _713=new ByteBuffer();
_713.putString(data,Charset.UTF8);
buf.put(_703);
_70a(buf,_713.position);
buf.putBytes(_713.array);
}else{
if(data.constructor==ByteBuffer){
_6fb.finest(this,"WebSocketEmulatedProxy.send: Data is ByteBuffer");
buf.put(_702);
_70a(buf,data.remaining());
buf.putBuffer(data);
}else{
if(data.byteLength){
_6fb.finest(this,"WebSocketEmulatedProxy.send: Data is ByteArray");
buf.put(_702);
_70a(buf,data.byteLength);
buf.putByteArray(data);
}else{
if(data.size){
_6fb.finest(this,"WebSocketEmulatedProxy.send: Data is Blob");
var cb=this._prepareQueue.enqueue(function(_715){
var b=new ByteBuffer();
b.put(_702);
_70a(b,_715.length);
b.putBytes(_715);
b.flip();
doSend(_711,b);
});
BlobUtils.asNumberArray(cb,data);
return true;
}else{
_6fb.severe(this,"WebSocketEmulatedProxy.send: Error: Invalid type for send");
throw new Error("Invalid type for send");
}
}
}
}
buf.flip();
this._prepareQueue.enqueue(function(_717){
doSend(_711,buf);
})();
return true;
case 2:
return false;
default:
_6fb.severe(this,"WebSocketEmulatedProxy.send: Error: invalid readyState");
throw new Error("INVALID_STATE_ERR");
}
_6fb.exiting(this,"WebSocketEmulatedProxy.send");
};
_6fd.close=function(code,_719){
_6fb.entering(this,"WebSocketEmulatedProxy.close");
switch(this.readyState){
case 0:
_71a(this);
break;
case 1:
if(code!=null&&code!=0){
this.closeCode=code;
this.closeReason=_719;
}
doSend(this,new ByteBuffer(_709));
break;
}
};
_6fd.setListener=function(_71b){
this._listener=_71b;
};
function openUpstream(_71c){
if(_71c.readyState!=1){
return;
}
var xdr=new XMLHttpRequest0();
xdr.onreadystatechange=function(){
if(xdr.readyState==4){
switch(xdr.status){
case 200:
setTimeout(function(){
doFlush(_71c);
},0);
break;
}
}
};
xdr.onload=function(){
openUpstream(_71c);
};
xdr.ontimeout=function(){
if(_71c.upstreamXHR!=null){
_71c.upstreamXHR.abort();
}
openUpstream(_71c);
};
xdr.open("POST",_71c._upstream+"&.krn="+Math.random(),true);
_71c.upstreamXHR=xdr;
};
function doSend(_71e,buf){
_6fb.entering(this,"WebSocketEmulatedProxy.doSend",buf);
_71e.bufferedAmount+=buf.remaining();
_71e._sendQueue.push(buf);
_720(_71e);
if(!_71e._writeSuspended){
doFlush(_71e);
}
};
function doFlush(_721){
_6fb.entering(this,"WebSocketEmulatedProxy.doFlush");
var _722=_721._sendQueue;
var _723=_722.length;
_721._writeSuspended=(_723>0);
if(_723>0){
var _724=_721.sequence++;
if(_721.useXDR){
if(_721.upstreamXHR==null){
openUpstream(_721);
}
var out=new ByteBuffer();
while(_722.length){
out.putBuffer(_722.shift());
}
out.putBytes(_708);
out.flip();
_721.upstreamXHR.setRequestHeader("Content-Type","text/plain; charset=utf-8");
_721.upstreamXHR.setRequestHeader("X-Sequence-No",_724.toString());
_721.upstreamXHR.send(_2ca(out,_721.requiresEscaping));
}else{
var xhr=new XMLHttpRequest0();
xhr.open("POST",_721._upstream+"&.krn="+Math.random(),true);
xhr.onreadystatechange=function(){
if(xhr.readyState==4){
_6fb.finest(this,"WebSocketEmulatedProxy.doFlush: xhr.status="+xhr.status);
switch(xhr.status){
case 200:
setTimeout(function(){
doFlush(_721);
},0);
break;
default:
_71a(_721);
break;
}
}
};
var out=new ByteBuffer();
while(_722.length){
out.putBuffer(_722.shift());
}
out.putBytes(_708);
out.flip();
xhr.setRequestHeader("X-Sequence-No",_724.toString());
if(browser=="firefox"){
if(xhr.sendAsBinary){
_6fb.finest(this,"WebSocketEmulatedProxy.doFlush: xhr.sendAsBinary");
xhr.setRequestHeader("Content-Type","application/octet-stream");
xhr.sendAsBinary(_2ca(out));
}else{
xhr.send(_2ca(out));
}
}else{
xhr.setRequestHeader("Content-Type","text/plain; charset=utf-8");
xhr.send(_2ca(out,_721.requiresEscaping));
}
}
}
_721.bufferedAmount=0;
_720(_721);
};
var _700=function(_727){
_6fb.entering(this,"WebSocketEmulatedProxy.connect");
var url=new URI(_727.URL);
url.scheme=url.scheme.replace("ws","http");
if(browser=="ie"&&typeof (XDomainRequest)!=="undefined"&&location.protocol.replace(":","")==url.scheme){
_727.useXDR=true;
}
switch(browser){
case "opera":
_727.requiresEscaping=true;
break;
case "ie":
if(!_727.useXDR){
_727.requiresEscaping=true;
}else{
if((typeof (Object.defineProperties)==="undefined")&&(navigator.userAgent.indexOf("MSIE 8")>0)){
_727.requiresEscaping=true;
}else{
_727.requiresEscaping=false;
}
}
break;
default:
_727.requiresEscaping=false;
break;
}
var _729=_727.requiresEscaping?"/;e/ctem":"/;e/ctm";
url.path=url.path.replace(/[\/]?$/,_729);
var _72a=url.toString();
var _72b=_72a.indexOf("?");
if(_72b==-1){
_72a+="?";
}else{
_72a+="&";
}
_72a+=".kn="+String(Math.random()).substring(2);
_6fb.finest(this,"WebSocketEmulatedProxy.connect: Connecting to "+_72a);
var _72c=new XMLHttpRequest0();
var _72d=false;
_72c.withCredentials=true;
_72c.open("GET",_72a,true);
_72c.setRequestHeader("Content-Type","text/plain; charset=utf-8");
_72c.setRequestHeader("X-WebSocket-Version","wseb-1.0");
_72c.setRequestHeader("X-Accept-Commands","ping");
var _72e=_727.sequence++;
_72c.setRequestHeader("X-Sequence-No",_72e.toString());
if(_727.protocol.length){
var _72f=_727.protocol.join(",");
_72c.setRequestHeader("X-WebSocket-Protocol",_72f);
}
for(var i=0;i<_727.parent.requestHeaders.length;i++){
var _731=_727.parent.requestHeaders[i];
_72c.setRequestHeader(_731.label,_731.value);
}
_72c.onredirectallowed=function(_732,_733){
var _734=_727.parent.parent;
var _735=_734.getRedirectPolicy();
if((typeof (_735)!="undefined")&&(_735!=null)){
if(!_735.isRedirectionAllowed(_732,_733)){
_72c.statusText=_735.toString()+": Cannot redirect from "+_732+" to "+_733;
_727.closeCode=1006;
_727.closeReason=_72c.statusText;
_727.parent.closeCode=_727.closeCode;
_727.parent.closeReason=_727.closeReason;
_727.parent.preventFallback=true;
doError(_727);
return false;
}
}
return true;
};
_72c.onreadystatechange=function(){
switch(_72c.readyState){
case 2:
if(_72c.status==403){
doError(_727);
}else{
var _736=_727.parent.parent._webSocket.connectTimeout;
if(_736==0){
_736=5000;
}
timer=setTimeout(function(){
if(!_72d){
doError(_727);
}
},_736);
}
break;
case 3:
break;
case 4:
_72d=true;
if(_72c.status==401){
_727._listener.authenticationRequested(_727.parent,_72c.xhr._location,_72c.getResponseHeader("WWW-Authenticate"));
return;
}
if(_727.readyState<1){
if(_72c.status==201){
var _737=_72c.responseText.split("\n");
var _738=_737[0];
var _739=_737[1];
var _73a=new URI(_72c.xhr._location);
var _73b=new URI(_738);
var _73c=new URI(_739);
if(_73a.host.toLowerCase()!=_73b.host.toLowerCase()){
throw new Error("Hostname in original URI does not match with the hostname in the upstream URI.");
}
if(_73a.host.toLowerCase()!=_73c.host.toLowerCase()){
throw new Error("Hostname in original URI does not match with the hostname in the downstream URI.");
}
_727._upstream=_73a.scheme+"://"+_73a.authority+_73b.path;
_727._downstream=new _6b6(_739,_727.sequence);
var _73d=_739.substring(0,_739.indexOf("/;e/"));
if(_73d!=_727.parent._location.toString().replace("ws","http")){
_727.parent._redirectUri=_73d;
}
_73e(_727,_727._downstream);
_727.parent.responseHeaders[_55b.HEADER_SEC_PROTOCOL]=_72c.getResponseHeader(_55b.HEADER_SEC_PROTOCOL);
_727.parent.responseHeaders[_55b.HEADER_SEC_EXTENSIONS]=_72c.getResponseHeader(_55b.HEADER_SEC_EXTENSIONS);
_73f(_727);
}else{
doError(_727);
}
}
break;
}
};
_72c.send(null);
_6fb.exiting(this,"WebSocketEmulatedProxy.connect");
};
var _73f=function(_740){
_6fb.entering(this,"WebSocketEmulatedProxy.doOpen");
_740.readyState=1;
var _741=_740.parent;
_741._acceptedProtocol=_741.responseHeaders["X-WebSocket-Protocol"]||"";
if(_740.useXDR){
this.upstreamXHR=null;
openUpstream(_740);
}
_740._listener.connectionOpened(_740.parent,_741._acceptedProtocol);
};
function doError(_742){
if(_742.readyState<2){
_6fb.entering(this,"WebSocketEmulatedProxy.doError");
_742.readyState=2;
if(_742.upstreamXHR!=null){
_742.upstreamXHR.abort();
}
if(_742.onerror!=null){
_742._listener.connectionFailed(_742.parent);
}
}
};
var _71a=function(_743,_744,code,_746){
_6fb.entering(this,"WebSocketEmulatedProxy.doClose");
switch(_743.readyState){
case 2:
break;
case 0:
case 1:
_743.readyState=WebSocket.CLOSED;
if(_743.upstreamXHR!=null){
_743.upstreamXHR.abort();
}
if(typeof _744==="undefined"){
_743._listener.connectionClosed(_743.parent,true,1005,"");
}else{
_743._listener.connectionClosed(_743.parent,_744,code,_746);
}
break;
default:
}
};
var _720=function(_747){
};
var _748=function(_749,_74a){
_6fb.finest("WebSocket.handleMessage: A WebSocket frame received on a WebSocket");
if(_74a.text){
_749._listener.textMessageReceived(_749.parent,_74a.text);
}else{
if(_74a.data){
_749._listener.binaryMessageReceived(_749.parent,_74a.data);
}
}
};
var _74b=function(_74c){
var _74d=ByteBuffer.allocate(2);
_74d.put(_707);
_74d.put(0);
_74d.flip();
doSend(_74c,_74d);
};
var _73e=function(_74e,_74f){
_6fb.entering(this,"WebSocketEmulatedProxy.bindHandlers");
_74f.onmessage=function(_750){
switch(_750.type){
case "message":
if(_74e.readyState==1){
_748(_74e,_750);
}
break;
}
};
_74f.onping=function(){
if(_74e.readyState==1){
_74b(_74e);
}
};
_74f.onerror=function(){
try{
_74f.disconnect();
}
finally{
_71a(_74e,true,_74e.closeCode,_74e.closeReason);
}
};
_74f.onclose=function(_751){
try{
_74f.disconnect();
}
finally{
_71a(_74e,true,this.closeCode,this.closeReason);
}
};
};
return _6fc;
})();
var _752=(function(){
var _753="WebSocketEmulatedDelegateHandler";
var LOG=_270.getLogger(_753);
var _755=function(){
LOG.finest(_753,"<init>");
};
var _756=_755.prototype=new _532();
_756.processConnect=function(_757,uri,_759){
LOG.finest(_753,"connect",_757);
if(_757.readyState==WebSocket.CLOSED){
throw new Error("WebSocket is already closed");
}
var _75a=!!window.MockWseTransport?new MockWseTransport():new _6fa();
_75a.parent=_757;
_757._delegate=_75a;
_75b(_75a,this);
_75a.connect(uri.toString(),_759);
};
_756.processTextMessage=function(_75c,text){
LOG.finest(_753,"connect",_75c);
if(_75c.readyState==WebSocket.OPEN){
_75c._delegate.send(text);
}else{
throw new Error("WebSocket is already closed");
}
};
_756.processBinaryMessage=function(_75e,obj){
LOG.finest(_753,"processBinaryMessage",_75e);
if(_75e.readyState==WebSocket.OPEN){
_75e._delegate.send(obj);
}else{
throw new Error("WebSocket is already closed");
}
};
_756.processClose=function(_760,code,_762){
LOG.finest(_753,"close",_760);
try{
_760._delegate.close(code,_762);
}
catch(e){
listener.connectionClosed(_760);
}
};
var _75b=function(_763,_764){
var _765=new _545(_764);
_763.setListener(_765);
};
return _755;
})();
var _766=(function(){
var _767="WebSocketEmulatedAuthenticationHandler";
var LOG=_270.getLogger(_767);
var _769=function(){
LOG.finest(_767,"<init>");
};
var _76a=_769.prototype=new _532();
_76a.handleClearAuthenticationData=function(_76b){
if(_76b._challengeResponse!=null){
_76b._challengeResponse.clearCredentials();
}
};
_76a.handleRemoveAuthenticationData=function(_76c){
this.handleClearAuthenticationData(_76c);
_76c._challengeResponse=new ChallengeResponse(null,null);
};
_76a.handle401=function(_76d,_76e,_76f){
var _770=this;
var _771=null;
if(typeof (_76d.parent.connectTimer)!="undefined"){
_771=_76d.parent.connectTimer;
if(_771!=null){
_771.pause();
}
}
if(_55b.KAAZING_SEC_EXTENSION_REVALIDATE==_76f){
var _772=new _5b4(_76d);
_76d.challengeHandler=_76d.parent.challengeHandler;
_772.connect(_76e);
}else{
var _773=_76e;
if(_773.indexOf("/;e/")>0){
_773=_773.substring(0,_773.indexOf("/;e/"));
}
var _774=new _504(_773.replace("http","ws"));
var _775=new ChallengeRequest(_773,_76f);
var _776;
if(_76d._challengeResponse.nextChallengeHandler!=null){
_776=_76d._challengeResponse.nextChallengeHandler;
}else{
_776=_76d.parent.challengeHandler;
}
if(_776!=null&&_776.canHandle(_775)){
_776.handle(_775,function(_777){
try{
if(_777==null||_777.credentials==null){
_770.handleClearAuthenticationData(_76d);
_770._listener.connectionFailed(_76d);
}else{
if(_771!=null){
_771.resume();
}
_76d._challengeResponse=_777;
_770.processConnect(_76d,_774,_76d._protocol);
}
}
catch(e){
_770.handleClearAuthenticationData(_76d);
_770._listener.connectionFailed(_76d);
}
});
}else{
this.handleClearAuthenticationData(_76d);
this._listener.connectionFailed(_76d);
}
}
};
_76a.processConnect=function(_778,_779,_77a){
if(_778._challengeResponse!=null&&_778._challengeResponse.credentials!=null){
var _77b=_778._challengeResponse.credentials.toString();
for(var i=_778.requestHeaders.length-1;i>=0;i--){
if(_778.requestHeaders[i].label==="Authorization"){
_778.requestHeaders.splice(i,1);
}
}
var _77d=new _4f6("Authorization",_77b);
for(var i=_778.requestHeaders.length-1;i>=0;i--){
if(_778.requestHeaders[i].label==="Authorization"){
_778.requestHeaders.splice(i,1);
}
}
_778.requestHeaders.push(_77d);
this.handleClearAuthenticationData(_778);
}
this._nextHandler.processConnect(_778,_779,_77a);
};
_76a.handleAuthenticate=function(_77e,_77f,_780){
_77e.authenticationReceived=true;
this.handle401(_77e,_77f,_780);
};
_76a.setNextHandler=function(_781){
this._nextHandler=_781;
var _782=new _545(this);
var _783=this;
_782.authenticationRequested=function(_784,_785,_786){
_783.handleAuthenticate(_784,_785,_786);
};
_781.setListener(_782);
};
_76a.setListener=function(_787){
this._listener=_787;
};
return _769;
})();
var _788=(function(){
var _789="WebSocketEmulatedHandler";
var LOG=_270.getLogger(_789);
var _78b=new _766();
var _78c=new _575();
var _78d=new _752();
var _78e=function(){
LOG.finest(_789,"<init>");
this.setNextHandler(_78b);
_78b.setNextHandler(_78c);
_78c.setNextHandler(_78d);
};
var _78f=_78e.prototype=new _532();
_78f.processConnect=function(_790,_791,_792){
var _793=[];
for(var i=0;i<_792.length;i++){
_793.push(_792[i]);
}
var _795=_790._extensions;
if(_795.length>0){
_790.requestHeaders.push(new _4f6(_55b.HEADER_SEC_EXTENSIONS,_795.join(";")));
}
this._nextHandler.processConnect(_790,_791,_793);
};
_78f.setNextHandler=function(_796){
this._nextHandler=_796;
var _797=this;
var _798=new _545(this);
_798.commandMessageReceived=function(_799,_79a){
if(_79a=="CloseCommandMessage"&&_799.readyState==1){
}
_797._listener.commandMessageReceived(_799,_79a);
};
_796.setListener(_798);
};
_78f.setListener=function(_79b){
this._listener=_79b;
};
return _78e;
})();
var _79c=(function(){
var _79d="WebSocketFlashEmulatedDelegateHandler";
var LOG=_270.getLogger(_79d);
var _79f=function(){
LOG.finest(_79d,"<init>");
};
var _7a0=_79f.prototype=new _532();
_7a0.processConnect=function(_7a1,uri,_7a3){
LOG.finest(_79d,"connect",_7a1);
if(_7a1.readyState==2){
throw new Error("WebSocket is already closed");
}
var _7a4=new _30d();
_7a4.parent=_7a1;
_7a1._delegate=_7a4;
_7a5(_7a4,this);
_7a4.connect(uri.toString(),_7a3);
};
_7a0.processTextMessage=function(_7a6,text){
LOG.finest(_79d,"connect",_7a6);
if(_7a6.readyState==1){
_7a6._delegate.send(text);
}else{
throw new Error("WebSocket is already closed");
}
};
_7a0.processBinaryMessage=function(_7a8,_7a9){
LOG.finest(_79d,"connect",_7a8);
if(_7a8.readyState==1){
_7a8._delegate.send(_7a9);
}else{
throw new Error("WebSocket is already closed");
}
};
_7a0.processClose=function(_7aa,code,_7ac){
LOG.finest(_79d,"close",_7aa);
_7aa._delegate.close(code,_7ac);
};
var _7a5=function(_7ad,_7ae){
var _7af=new _545(_7ae);
_7ad.setListener(_7af);
_7af.redirected=function(_7b0,_7b1){
_7b0._redirectUri=_7b1;
};
};
return _79f;
})();
var _7b2=(function(){
var _7b3="WebSocketFlashEmulatedHandler";
var LOG=_270.getLogger(_7b3);
var _7b5=function(){
var _7b6=new _766();
return _7b6;
};
var _7b7=function(){
var _7b8=new _575();
return _7b8;
};
var _7b9=function(){
var _7ba=new _79c();
return _7ba;
};
var _7bb=_7b5();
var _7bc=_7b7();
var _7bd=_7b9();
var _7be=function(){
LOG.finest(_7b3,"<init>");
this.setNextHandler(_7bb);
_7bb.setNextHandler(_7bc);
_7bc.setNextHandler(_7bd);
};
var _7bf=_7be.prototype=new _532();
_7bf.processConnect=function(_7c0,_7c1,_7c2){
var _7c3=[_55b.KAAZING_EXTENDED_HANDSHAKE];
for(var i=0;i<_7c2.length;i++){
_7c3.push(_7c2[i]);
}
var _7c5=_7c0._extensions;
if(_7c5.length>0){
_7c0.requestHeaders.push(new _4f6(_55b.HEADER_SEC_EXTENSIONS,_7c5.join(";")));
}
this._nextHandler.processConnect(_7c0,_7c1,_7c3);
};
_7bf.setNextHandler=function(_7c6){
this._nextHandler=_7c6;
var _7c7=new _545(this);
_7c6.setListener(_7c7);
};
_7bf.setListener=function(_7c8){
this._listener=_7c8;
};
return _7be;
})();
var _7c9=(function(){
var _7ca="WebSocketFlashRtmpDelegateHandler";
var LOG=_270.getLogger(_7ca);
var _7cc;
var _7cd=function(){
LOG.finest(_7ca,"<init>");
_7cc=this;
};
var _7ce=_7cd.prototype=new _532();
_7ce.processConnect=function(_7cf,uri,_7d1){
LOG.finest(_7ca,"connect",_7cf);
if(_7cf.readyState==2){
throw new Error("WebSocket is already closed");
}
var _7d2=new _33e();
_7d2.parent=_7cf;
_7cf._delegate=_7d2;
_7d3(_7d2,this);
_7d2.connect(uri.toString(),_7d1);
};
_7ce.processTextMessage=function(_7d4,text){
LOG.finest(_7ca,"connect",_7d4);
if(_7d4.readyState==1){
_7d4._delegate.send(text);
}else{
throw new Error("WebSocket is already closed");
}
};
_7ce.processBinaryMessage=function(_7d6,_7d7){
LOG.finest(_7ca,"connect",_7d6);
if(_7d6.readyState==1){
_7d6._delegate.send(_7d7);
}else{
throw new Error("WebSocket is already closed");
}
};
_7ce.processClose=function(_7d8,code,_7da){
LOG.finest(_7ca,"close",_7d8);
_7d8._delegate.close(code,_7da);
};
var _7d3=function(_7db,_7dc){
var _7dd=new _545(_7dc);
_7dd.redirected=function(_7de,_7df){
_7de._redirectUri=_7df;
};
_7db.setListener(_7dd);
};
return _7cd;
})();
var _7e0=(function(){
var _7e1="WebSocketFlashRtmpHandler";
var LOG=_270.getLogger(_7e1);
var _7e3=function(){
var _7e4=new _766();
return _7e4;
};
var _7e5=function(){
var _7e6=new _575();
return _7e6;
};
var _7e7=function(){
var _7e8=new _7c9();
return _7e8;
};
var _7e9=_7e3();
var _7ea=_7e5();
var _7eb=_7e7();
var _7ec=function(){
LOG.finest(_7e1,"<init>");
this.setNextHandler(_7e9);
_7e9.setNextHandler(_7ea);
_7ea.setNextHandler(_7eb);
};
var _7ed=function(_7ee,_7ef){
LOG.finest(_7e1,"<init>");
};
var _7f0=_7ec.prototype=new _532();
_7f0.setNextHandler=function(_7f1){
this._nextHandler=_7f1;
var _7f2=new _545(this);
_7f1.setListener(_7f2);
};
_7f0.setListener=function(_7f3){
this._listener=_7f3;
};
return _7ec;
})();
var _7f4=(function(){
var _7f5="WebSocketSelectedHandler";
var _LOG=_270.getLogger(_7f5);
var _7f7=function(){
_LOG.fine(_7f5,"<init>");
};
var _7f8=_7f7.prototype=new _532();
_7f8.processConnect=function(_7f9,uri,_7fb){
_LOG.fine(_7f5,"connect",_7f9);
if(_7f9.readyState==WebSocket.CLOSED){
throw new Error("WebSocket is already closed");
}
this._nextHandler.processConnect(_7f9,uri,_7fb);
};
_7f8.handleConnectionOpened=function(_7fc,_7fd){
_LOG.fine(_7f5,"handleConnectionOpened");
var _7fe=_7fc;
if(_7fe.readyState==WebSocket.CONNECTING){
_7fe.readyState=WebSocket.OPEN;
this._listener.connectionOpened(_7fc,_7fd);
}
};
_7f8.handleMessageReceived=function(_7ff,_800){
_LOG.fine(_7f5,"handleMessageReceived",_800);
if(_7ff.readyState!=WebSocket.OPEN){
return;
}
this._listener.textMessageReceived(_7ff,_800);
};
_7f8.handleBinaryMessageReceived=function(_801,_802){
_LOG.fine(_7f5,"handleBinaryMessageReceived",_802);
if(_801.readyState!=WebSocket.OPEN){
return;
}
this._listener.binaryMessageReceived(_801,_802);
};
_7f8.handleConnectionClosed=function(_803,_804,code,_806){
_LOG.fine(_7f5,"handleConnectionClosed");
var _807=_803;
if(_807.readyState!=WebSocket.CLOSED){
_807.readyState=WebSocket.CLOSED;
this._listener.connectionClosed(_803,_804,code,_806);
}
};
_7f8.handleConnectionFailed=function(_808){
_LOG.fine(_7f5,"connectionFailed");
if(_808.readyState!=WebSocket.CLOSED){
_808.readyState=WebSocket.CLOSED;
this._listener.connectionFailed(_808);
}
};
_7f8.handleConnectionError=function(_809,e){
_LOG.fine(_7f5,"connectionError");
this._listener.connectionError(_809,e);
};
_7f8.setNextHandler=function(_80b){
this._nextHandler=_80b;
var _80c={};
var _80d=this;
_80c.connectionOpened=function(_80e,_80f){
_80d.handleConnectionOpened(_80e,_80f);
};
_80c.redirected=function(_810,_811){
throw new Error("invalid event received");
};
_80c.authenticationRequested=function(_812,_813,_814){
throw new Error("invalid event received");
};
_80c.textMessageReceived=function(_815,buf){
_80d.handleMessageReceived(_815,buf);
};
_80c.binaryMessageReceived=function(_817,buf){
_80d.handleBinaryMessageReceived(_817,buf);
};
_80c.connectionClosed=function(_819,_81a,code,_81c){
_80d.handleConnectionClosed(_819,_81a,code,_81c);
};
_80c.connectionFailed=function(_81d){
_80d.handleConnectionFailed(_81d);
};
_80c.connectionError=function(_81e,e){
_80d.handleConnectionError(_81e,e);
};
_80b.setListener(_80c);
};
_7f8.setListener=function(_820){
this._listener=_820;
};
return _7f7;
})();
var _821=(function(){
var _822=function(_823,_824,_825){
this._nativeEquivalent=_823;
this._handler=_824;
this._channelFactory=_825;
};
return _822;
})();
var _826=(function(){
var _827="WebSocketCompositeHandler";
var _LOG=_270.getLogger(_827);
var _829="javascript:ws";
var _82a="javascript:wss";
var _82b="javascript:wse";
var _82c="javascript:wse+ssl";
var _82d="flash:wse";
var _82e="flash:wse+ssl";
var _82f="flash:wsr";
var _830="flash:wsr+ssl";
var _831={};
var _832={};
var _833=new _56a();
var _834=new _563();
var _835=true;
var _836={};
if(Object.defineProperty){
try{
Object.defineProperty(_836,"prop",{get:function(){
return true;
}});
_835=false;
}
catch(e){
}
}
var _837=function(){
this._handlerListener=createListener(this);
this._nativeHandler=createNativeHandler(this);
this._emulatedHandler=createEmulatedHandler(this);
this._emulatedFlashHandler=createFlashEmulatedHandler(this);
this._rtmpFlashHandler=createFlashRtmpHandler(this);
_LOG.finest(_827,"<init>");
pickStrategies();
_831[_829]=new _821("ws",this._nativeHandler,_833);
_831[_82a]=new _821("wss",this._nativeHandler,_833);
_831[_82b]=new _821("ws",this._emulatedHandler,_834);
_831[_82c]=new _821("wss",this._emulatedHandler,_834);
_831[_82d]=new _821("ws",this._emulatedFlashHandler,_834);
_831[_82e]=new _821("wss",this._emulatedFlashHandler,_834);
_831[_82f]=new _821("ws",this._rtmpFlashHandler,_834);
_831[_830]=new _821("wss",this._rtmpFlashHandler,_834);
};
function isIE6orIE7(){
if(browser!="ie"){
return false;
}
var _838=navigator.appVersion;
return (_838.indexOf("MSIE 6.0")>=0||_838.indexOf("MSIE 7.0")>=0);
};
function isXdrDisabledonIE8IE9(){
if(browser!="ie"){
return false;
}
var _839=navigator.appVersion;
return ((_839.indexOf("MSIE 8.0")>=0||_839.indexOf("MSIE 9.0")>=0)&&typeof (XDomainRequest)==="undefined");
};
function pickStrategies(){
if(isIE6orIE7()||isXdrDisabledonIE8IE9()){
_832["ws"]=new Array(_829,_82d,_82b);
_832["wss"]=new Array(_82a,_82e,_82c);
}else{
_832["ws"]=new Array(_829,_82b);
_832["wss"]=new Array(_82a,_82c);
}
};
function createListener(_83a){
var _83b={};
_83b.connectionOpened=function(_83c,_83d){
_83a.handleConnectionOpened(_83c,_83d);
};
_83b.binaryMessageReceived=function(_83e,buf){
_83a.handleMessageReceived(_83e,buf);
};
_83b.textMessageReceived=function(_840,text){
var _842=_840.parent;
_842._webSocketChannelListener.handleMessage(_842._webSocket,text);
};
_83b.connectionClosed=function(_843,_844,code,_846){
_83a.handleConnectionClosed(_843,_844,code,_846);
};
_83b.connectionFailed=function(_847){
_83a.handleConnectionFailed(_847);
};
_83b.connectionError=function(_848,e){
_83a.handleConnectionError(_848,e);
};
_83b.authenticationRequested=function(_84a,_84b,_84c){
};
_83b.redirected=function(_84d,_84e){
};
_83b.onBufferedAmountChange=function(_84f,n){
_83a.handleBufferedAmountChange(_84f,n);
};
return _83b;
};
function createNativeHandler(_851){
var _852=new _7f4();
var _853=new _698();
_852.setListener(_851._handlerListener);
_852.setNextHandler(_853);
return _852;
};
function createEmulatedHandler(_854){
var _855=new _7f4();
var _856=new _788();
_855.setListener(_854._handlerListener);
_855.setNextHandler(_856);
return _855;
};
function createFlashEmulatedHandler(_857){
var _858=new _7f4();
var _859=new _7b2();
_858.setListener(_857._handlerListener);
_858.setNextHandler(_859);
return _858;
};
function createFlashRtmpHandler(_85a){
var _85b=new _7f4();
var _85c=new _7e0();
_85b.setListener(_85a._handlerListener);
_85b.setNextHandler(_85c);
return _85b;
};
var _85d=function(_85e,_85f){
var _860=_831[_85f];
var _861=_860._channelFactory;
var _862=_85e._location;
var _863=_861.createChannel(_862,_85e._protocol);
_85e._selectedChannel=_863;
_863.parent=_85e;
_863._extensions=_85e._extensions;
_863._handler=_860._handler;
_863._handler.processConnect(_85e._selectedChannel,_862,_85e._protocol);
};
var _864=_837.prototype;
_864.fallbackNext=function(_865){
_LOG.finest(_827,"fallbackNext");
var _866=_865.getNextStrategy();
if(_866==null){
this.doClose(_865,false,1006,"");
}else{
_85d(_865,_866);
}
};
_864.doOpen=function(_867,_868){
if(_867._lastErrorEvent!==undefined){
delete _867._lastErrorEvent;
}
if(_867.readyState===WebSocket.CONNECTING){
_867.readyState=WebSocket.OPEN;
if(_835){
_867._webSocket.readyState=WebSocket.OPEN;
}
_867._webSocketChannelListener.handleOpen(_867._webSocket,_868);
}
};
_864.doClose=function(_869,_86a,code,_86c){
if(_869._lastErrorEvent!==undefined){
_869._webSocketChannelListener.handleError(_869._webSocket,_869._lastErrorEvent);
delete _869._lastErrorEvent;
}
if(_869.readyState===WebSocket.CONNECTING||_869.readyState===WebSocket.OPEN||_869.readyState===WebSocket.CLOSING){
_869.readyState=WebSocket.CLOSED;
if(_835){
_869._webSocket.readyState=WebSocket.CLOSED;
}
_869._webSocketChannelListener.handleClose(_869._webSocket,_86a,code,_86c);
}
};
_864.doBufferedAmountChange=function(_86d,n){
_86d._webSocketChannelListener.handleBufferdAmountChange(_86d._webSocket,n);
};
_864.processConnect=function(_86f,_870,_871){
_LOG.finest(_827,"connect",_86f);
var _872=_86f;
_LOG.finest("Current ready state = "+_872.readyState);
if(_872.readyState===WebSocket.OPEN){
_LOG.fine("Attempt to reconnect an existing open WebSocket to a different location");
throw new Error("Attempt to reconnect an existing open WebSocket to a different location");
}
var _873=_872._compositeScheme;
if(_873!="ws"&&_873!="wss"){
var _874=_831[_873];
if(_874==null){
throw new Error("Invalid connection scheme: "+_873);
}
_LOG.finest("Turning off fallback since the URL is prefixed with java:");
_872._connectionStrategies.push(_873);
}else{
var _875=_832[_873];
if(_875!=null){
for(var i=0;i<_875.length;i++){
_872._connectionStrategies.push(_875[i]);
}
}else{
throw new Error("Invalid connection scheme: "+_873);
}
}
this.fallbackNext(_872);
};
_864.processTextMessage=function(_877,_878){
_LOG.finest(_827,"send",_878);
var _879=_877;
if(_879.readyState!=WebSocket.OPEN){
_LOG.fine("Attempt to post message on unopened or closed web socket");
throw new Error("Attempt to post message on unopened or closed web socket");
}
var _87a=_879._selectedChannel;
_87a._handler.processTextMessage(_87a,_878);
};
_864.processBinaryMessage=function(_87b,_87c){
_LOG.finest(_827,"send",_87c);
var _87d=_87b;
if(_87d.readyState!=WebSocket.OPEN){
_LOG.fine("Attempt to post message on unopened or closed web socket");
throw new Error("Attempt to post message on unopened or closed web socket");
}
var _87e=_87d._selectedChannel;
_87e._handler.processBinaryMessage(_87e,_87c);
};
_864.processClose=function(_87f,code,_881){
_LOG.finest(_827,"close");
var _882=_87f;
if(_87f.readyState===WebSocket.CONNECTING||_87f.readyState===WebSocket.OPEN){
_87f.readyState=WebSocket.CLOSING;
if(_835){
_87f._webSocket.readyState=WebSocket.CLOSING;
}
}
var _883=_882._selectedChannel;
_883._handler.processClose(_883,code,_881);
};
_864.setListener=function(_884){
this._listener=_884;
};
_864.handleConnectionOpened=function(_885,_886){
var _887=_885.parent;
this.doOpen(_887,_886);
};
_864.handleMessageReceived=function(_888,obj){
var _88a=_888.parent;
switch(_88a.readyState){
case WebSocket.OPEN:
if(_88a._webSocket.binaryType==="blob"&&obj.constructor==ByteBuffer){
obj=obj.getBlob(obj.remaining());
}else{
if(_88a._webSocket.binaryType==="arraybuffer"&&obj.constructor==ByteBuffer){
obj=obj.getArrayBuffer(obj.remaining());
}else{
if(_88a._webSocket.binaryType==="blob"&&obj.byteLength){
obj=new Blob([new Uint8Array(obj)]);
}else{
if(_88a._webSocket.binaryType==="bytebuffer"&&obj.byteLength){
var u=new Uint8Array(obj);
var _88c=[];
for(var i=0;i<u.byteLength;i++){
_88c.push(u[i]);
}
obj=new ByteBuffer(_88c);
}else{
if(_88a._webSocket.binaryType==="bytebuffer"&&obj.size){
var cb=function(_88f){
var b=new ByteBuffer();
b.putBytes(_88f);
b.flip();
_88a._webSocketChannelListener.handleMessage(_88a._webSocket,b);
};
BlobUtils.asNumberArray(cb,data);
return;
}
}
}
}
}
_88a._webSocketChannelListener.handleMessage(_88a._webSocket,obj);
break;
case WebSocket.CONNECTING:
case WebSocket.CLOSING:
case WebSocket.CLOSED:
break;
default:
throw new Error("Socket has invalid readyState: "+$this.readyState);
}
};
_864.handleConnectionClosed=function(_891,_892,code,_894){
var _895=_891.parent;
if(_895.readyState===WebSocket.CONNECTING&&!_891.authenticationReceived&&!_891.preventFallback){
this.fallbackNext(_895);
}else{
this.doClose(_895,_892,code,_894);
}
};
_864.handleConnectionFailed=function(_896){
var _897=_896.parent;
var _898=1006;
var _899="";
if(_896.closeReason.length>0){
_898=_896.closeCode;
_899=_896.closeReason;
}
if(_897.readyState===WebSocket.CONNECTING&&!_896.authenticationReceived&&!_896.preventFallback){
this.fallbackNext(_897);
}else{
this.doClose(_897,false,_898,_899);
}
};
_864.handleConnectionError=function(_89a,e){
_89a.parent._lastErrorEvent=e;
};
return _837;
})();
(function(){
var _89c="HttpRedirectPolicy";
var LOG=_270.getLogger(_89c);
window.HttpRedirectPolicy=function(name){
if(arguments.length<1){
var s="HttpRedirectPolicy: Please specify the policy name.";
throw Error(s);
}
if(typeof (name)=="undefined"){
var s="HttpRedirectPolicy: Please specify required 'name' parameter.";
throw Error(s);
}else{
if(typeof (name)!="string"){
var s="HttpRedirectPolicy: Required parameter 'name' is a string.";
throw Error(s);
}
}
this.name=name;
};
var _8a0=HttpRedirectPolicy.prototype;
_8a0.toString=function(){
return "HttpRedirectPolicy."+this.name;
};
_8a0.isRedirectionAllowed=function(_8a1,_8a2){
if(arguments.length<2){
var s="HttpRedirectPolicy.isRedirectionAllowed(): Please specify both the 'originalLoc' and the 'redirectLoc' parameters.";
throw Error(s);
}
if(typeof (_8a1)=="undefined"){
var s="HttpRedirectPolicy.isRedirectionAllowed(): Please specify required 'originalLoc' parameter.";
throw Error(s);
}else{
if(typeof (_8a1)!="string"){
var s="HttpRedirectPolicy.isRedirectionAllowed(): Required parameter 'originalLoc' is a string.";
throw Error(s);
}
}
if(typeof (_8a2)=="undefined"){
var s="HttpRedirectPolicy.isRedirectionAllowed(): Please specify required 'redirectLoc' parameter.";
throw Error(s);
}else{
if(typeof (_8a2)!="string"){
var s="HttpRedirectPolicy.isRedirectionAllowed(): Required parameter 'redirectLoc' is a string.";
throw Error(s);
}
}
var _8a4=false;
var _8a5=new URI(_8a1.toLowerCase().replace("http","ws"));
var _8a6=new URI(_8a2.toLowerCase().replace("http","ws"));
switch(this.name){
case "ALWAYS":
_8a4=true;
break;
case "NEVER":
_8a4=false;
break;
case "PEER_DOMAIN":
_8a4=isPeerDomain(_8a5,_8a6);
break;
case "SAME_DOMAIN":
_8a4=isSameDomain(_8a5,_8a6);
break;
case "SAME_ORIGIN":
_8a4=isSameOrigin(_8a5,_8a6);
break;
case "SUB_DOMAIN":
_8a4=isSubDomain(_8a5,_8a6);
break;
default:
var s="HttpRedirectPolicy.isRedirectionAllowed(): Invalid policy: "+this.name;
throw new Error(s);
}
return _8a4;
};
function isPeerDomain(_8a7,_8a8){
if(isSameDomain(_8a7,_8a8)){
return true;
}
var _8a9=_8a7.scheme.toLowerCase();
var _8aa=_8a8.scheme.toLowerCase();
if(_8aa.indexOf(_8a9)==-1){
return false;
}
var _8ab=_8a7.host;
var _8ac=_8a8.host;
var _8ad=getBaseDomain(_8ab);
var _8ae=getBaseDomain(_8ac);
if(_8ac.indexOf(_8ad,(_8ac.length-_8ad.length))==-1){
return false;
}
if(_8ab.indexOf(_8ae,(_8ab.length-_8ae.length))==-1){
return false;
}
return true;
};
function isSameDomain(_8af,_8b0){
if(isSameOrigin(_8af,_8b0)){
return true;
}
var _8b1=_8af.scheme.toLowerCase();
var _8b2=_8b0.scheme.toLowerCase();
if(_8b2.indexOf(_8b1)==-1){
return false;
}
var _8b3=_8af.host.toLowerCase();
var _8b4=_8b0.host.toLowerCase();
if(_8b3==_8b4){
return true;
}
return false;
};
function isSameOrigin(_8b5,_8b6){
var _8b7=_8b5.scheme.toLowerCase();
var _8b8=_8b6.scheme.toLowerCase();
var _8b9=_8b5.authority.toLowerCase();
var _8ba=_8b6.authority.toLowerCase();
if((_8b7==_8b8)&&(_8b9==_8ba)){
return true;
}
return false;
};
function isSubDomain(_8bb,_8bc){
if(isSameDomain(_8bb,_8bc)){
return true;
}
var _8bd=_8bb.scheme.toLowerCase();
var _8be=_8bc.scheme.toLowerCase();
if(_8be.indexOf(_8bd)==-1){
return false;
}
var _8bf=_8bb.host.toLowerCase();
var _8c0=_8bc.host.toLowerCase();
if(_8c0.length<_8bf.length){
return false;
}
var s="."+_8bf;
if(_8c0.indexOf(s,(_8c0.length-s.length))==-1){
return false;
}
return true;
};
function getBaseDomain(host){
var _8c3=host.split(".");
var len=_8c3.length;
if(len<=2){
return host;
}
var _8c5="";
for(var i=1;i<len;i++){
_8c5+="."+_8c3[i];
}
return _8c5;
};
HttpRedirectPolicy.ALWAYS=new HttpRedirectPolicy("ALWAYS");
HttpRedirectPolicy.NEVER=new HttpRedirectPolicy("NEVER");
HttpRedirectPolicy.PEER_DOMAIN=new HttpRedirectPolicy("PEER_DOMAIN");
HttpRedirectPolicy.SAME_DOMAIN=new HttpRedirectPolicy("SAME_DOMAIN");
HttpRedirectPolicy.SAME_ORIGIN=new HttpRedirectPolicy("SAME_ORIGIN");
HttpRedirectPolicy.SUB_DOMAIN=new HttpRedirectPolicy("SUB_DOMAIN");
return HttpRedirectPolicy;
})();
(function(){
var _8c7=new _826();
window.WebSocket=(function(){
var _8c8="WebSocket";
var LOG=_270.getLogger(_8c8);
var _8ca={};
var _8cb=function(url,_8cd,_8ce,_8cf,_8d0,_8d1){
LOG.entering(this,"WebSocket.<init>",{"url":url,"protocol":_8cd});
this.url=url;
this.protocol=_8cd;
this.extensions=_8ce||[];
this.connectTimeout=0;
this._challengeHandler=_8cf;
this._redirectPolicy=HttpRedirectPolicy.ALWAYS;
if(typeof (_8d0)!="undefined"){
_8d2(_8d0);
this.connectTimeout=_8d0;
}
if(typeof (_8d1)!="undefined"){
_8d3(_8d1);
this._redirectPolicy=_8d1;
}
this._queue=[];
this._origin="";
this._eventListeners={};
setProperties(this);
_8d4(this,this.url,this.protocol,this.extensions,this._challengeHandler,this.connectTimeout);
};
var _8d5=function(s){
if(s.length==0){
return false;
}
var _8d7="()<>@,;:\\<>/[]?={}\t \n";
for(var i=0;i<s.length;i++){
var c=s.substr(i,1);
if(_8d7.indexOf(c)!=-1){
return false;
}
var code=s.charCodeAt(i);
if(code<33||code>126){
return false;
}
}
return true;
};
var _8db=function(_8dc){
if(typeof (_8dc)==="undefined"){
return true;
}else{
if(typeof (_8dc)==="string"){
return _8d5(_8dc);
}else{
for(var i=0;i<_8dc.length;i++){
if(!_8d5(_8dc[i])){
return false;
}
}
return true;
}
}
};
var _8d4=function(_8de,_8df,_8e0,_8e1,_8e2,_8e3){
if(!_8db(_8e0)){
throw new Error("SyntaxError: invalid protocol: "+_8e0);
}
var uri=new _513(_8df);
if(!uri.isSecure()&&document.location.protocol==="https:"){
throw new Error("SecurityException: non-secure connection attempted from secure origin");
}
var _8e5=[];
if(typeof (_8e0)!="undefined"){
if(typeof _8e0=="string"&&_8e0.length){
_8e5=[_8e0];
}else{
if(_8e0.length){
_8e5=_8e0;
}
}
}
_8de._channel=new _570(uri,_8e5);
_8de._channel._webSocket=_8de;
_8de._channel._webSocketChannelListener=_8ca;
_8de._channel._extensions=_8e1;
if(typeof (_8e2)!="undefined"){
_8de._channel.challengeHandler=_8e2;
}
if((typeof (_8e3)!="undefined")&&(_8e3>0)){
var _8e6=_8de._channel;
var _8e7=new _51f(function(){
if(_8e6.readyState==_8cb.CONNECTING){
_8c7.doClose(_8e6,false,1006,"Connection timeout");
_8c7.processClose(_8e6,0,"Connection timeout");
_8e6.connectTimer=null;
}
},_8e3,false);
_8de._channel.connectTimer=_8e7;
_8e7.start();
}
_8c7.processConnect(_8de._channel,uri.getWSEquivalent());
};
function setProperties(_8e8){
_8e8.onmessage=null;
_8e8.onopen=null;
_8e8.onclose=null;
_8e8.onerror=null;
if(Object.defineProperty){
try{
Object.defineProperty(_8e8,"readyState",{get:function(){
if(_8e8._channel){
return _8e8._channel.readyState;
}else{
return _8cb.CLOSED;
}
},set:function(){
throw new Error("Cannot set read only property readyState");
}});
var _8e9="blob";
Object.defineProperty(_8e8,"binaryType",{enumerable:true,configurable:true,get:function(){
return _8e9;
},set:function(val){
if(val==="blob"||val==="arraybuffer"||val==="bytebuffer"){
_8e9=val;
}else{
throw new SyntaxError("Invalid binaryType. Valid values are 'blob', 'arraybuffer' and 'bytebuffer'");
}
}});
Object.defineProperty(_8e8,"bufferedAmount",{get:function(){
return _8e8._channel.getBufferedAmount();
},set:function(){
throw new Error("Cannot set read only property bufferedAmount");
}});
}
catch(ex){
_8e8.readyState=_8cb.CONNECTING;
_8e8.binaryType="blob";
_8e8.bufferedAmount=0;
}
}else{
_8e8.readyState=_8cb.CONNECTING;
_8e8.binaryType="blob";
_8e8.bufferedAmount=0;
}
};
var _8eb=_8cb.prototype;
_8eb.send=function(data){
switch(this.readyState){
case 0:
LOG.error("WebSocket.send: Error: Attempt to send message on unopened or closed WebSocket");
throw new Error("Attempt to send message on unopened or closed WebSocket");
case 1:
if(typeof (data)==="string"){
_8c7.processTextMessage(this._channel,data);
}else{
_8c7.processBinaryMessage(this._channel,data);
}
break;
case 2:
case 3:
break;
default:
LOG.error("WebSocket.send: Illegal state error");
throw new Error("Illegal state error");
}
};
_8eb.close=function(code,_8ee){
if(typeof code!="undefined"){
if(code!=1000&&(code<3000||code>4999)){
var _8ef=new Error("code must equal to 1000 or in range 3000 to 4999");
_8ef.name="InvalidAccessError";
throw _8ef;
}
}
if(typeof _8ee!="undefined"&&_8ee.length>0){
var buf=new ByteBuffer();
buf.putString(_8ee,Charset.UTF8);
buf.flip();
if(buf.remaining()>123){
throw new SyntaxError("SyntaxError: reason is longer than 123 bytes");
}
}
switch(this.readyState){
case 0:
case 1:
_8c7.processClose(this._channel,code,_8ee);
break;
case 2:
case 3:
break;
default:
LOG.error("WebSocket.close: Illegal state error");
throw new Error("Illegal state error");
}
};
_8eb.getChallengeHandler=function(){
return this._challengeHandler||null;
};
_8eb.setChallengeHandler=function(_8f1){
if(typeof (_8f1)=="undefined"){
var s="WebSocket.setChallengeHandler(): Parameter 'challengeHandler' is required";
throw new Error(s);
}
this._challengeHandler=_8f1;
this._channel.challengeHandler=_8f1;
};
_8eb.getRedirectPolicy=function(){
return this._redirectPolicy;
};
_8eb.setRedirectPolicy=function(_8f3){
_8d3(_8f3);
this._redirectPolicy=_8f3;
};
var _8d2=function(_8f4){
if(typeof (_8f4)=="undefined"){
var s="WebSocket.setConnectTimeout(): int parameter 'connectTimeout' is required";
throw new Error(s);
}
if(typeof (_8f4)!="number"){
var s="WebSocket.setConnectTimeout(): connectTimeout should be an integer";
throw new Error(s);
}
if(_8f4<0){
var s="WebSocket.setConnectTimeout(): Connect timeout cannot be negative";
throw new Error(s);
}
return;
};
var _8d3=function(_8f6){
if(typeof (_8f6)=="undefined"){
var s="WebSocket.validateHttpRedirectPolicy(): Parameter 'redirectPolicy' is required";
throw new Error(s);
}
if(!(_8f6 instanceof HttpRedirectPolicy)){
var s="WebSocket.validateHttpRedirectPolicy(): Parameter 'redirectPolicy' must be of type HttpRedirectPolicy";
throw new Error(s);
}
};
var _8f8=function(_8f9,data){
var _8fb=new MessageEvent(_8f9,data,_8f9._origin);
_8f9.dispatchEvent(_8fb);
};
var _8fc=function(_8fd){
var _8fe=new Date().getTime();
var _8ff=_8fe+50;
while(_8fd._queue.length>0){
if(new Date().getTime()>_8ff){
setTimeout(function(){
_8fc(_8fd);
},0);
return;
}
var buf=_8fd._queue.shift();
var ok=false;
try{
if(_8fd.readyState==_8cb.OPEN){
_8f8(_8fd,buf);
ok=true;
}else{
_8fd._queue=[];
return;
}
}
finally{
if(!ok){
if(_8fd._queue.length==0){
_8fd._delivering=false;
}else{
setTimeout(function(){
_8fc(_8fd);
},0);
}
}
}
}
_8fd._delivering=false;
};
var _902=function(_903,_904,code,_906){
LOG.entering(_903,"WebSocket.doClose");
delete _903._channel;
setTimeout(function(){
var _907=new CloseEvent(_903,_904,code,_906);
_903.dispatchEvent(_907);
},0);
};
_8ca.handleOpen=function(_908,_909){
_908.protocol=_909;
var _90a={type:"open",bubbles:true,cancelable:true,target:_908};
_908.dispatchEvent(_90a);
};
_8ca.handleMessage=function(_90b,obj){
if(!Object.defineProperty&&!(typeof (obj)==="string")){
var _90d=_90b.binaryType;
if(!(_90d==="blob"||_90d==="arraybuffer"||_90d==="bytebuffer")){
var _90e={type:"error",bubbles:true,cancelable:true,target:_90b,message:"Invalid binaryType. Valid values are 'blob', 'arraybuffer' and 'bytebuffer'"};
_90b.dispatchEvent(_90e);
return;
}
}
_90b._queue.push(obj);
if(!_90b._delivering){
_90b._delivering=true;
_8fc(_90b);
}
};
_8ca.handleClose=function(_90f,_910,code,_912){
_902(_90f,_910,code,_912);
};
_8ca.handleError=function(_913,_914){
LOG.entering(_913,"WebSocket.handleError"+_914);
setTimeout(function(){
_913.dispatchEvent(_914);
},0);
};
_8ca.handleBufferdAmountChange=function(_915,n){
_915.bufferedAmount=n;
};
_8eb.addEventListener=function(type,_918,_919){
this._eventListeners[type]=this._eventListeners[type]||[];
this._eventListeners[type].push(_918);
};
_8eb.removeEventListener=function(type,_91b,_91c){
var _91d=this._eventListeners[type];
if(_91d){
for(var i=0;i<_91d.length;i++){
if(_91d[i]==_91b){
_91d.splice(i,1);
return;
}
}
}
};
_8eb.dispatchEvent=function(e){
var type=e.type;
if(!type){
throw new Error("Cannot dispatch invalid event "+e);
}
try{
var _921=this["on"+type];
if(typeof _921==="function"){
_921(e);
}
}
catch(e){
LOG.severe(this,type+" event handler: Error thrown from application");
}
var _922=this._eventListeners[type];
if(_922){
for(var i=0;i<_922.length;i++){
try{
_922[i](e);
}
catch(e2){
LOG.severe(this,type+" event handler: Error thrown from application");
}
}
}
};
_8cb.CONNECTING=_8eb.CONNECTING=0;
_8cb.OPEN=_8eb.OPEN=1;
_8cb.CLOSING=_8eb.CLOSING=2;
_8cb.CLOSED=_8eb.CLOSED=3;
return _8cb;
})();
window.WebSocket.__impls__={};
window.WebSocket.__impls__["flash:wse"]=_30d;
}());
(function(){
window.WebSocketExtension=(function(){
var _924="WebSocketExtension";
var LOG=_270.getLogger(_924);
var _926=function(name){
this.name=name;
this.parameters={};
this.enabled=false;
this.negotiated=false;
};
var _928=_926.prototype;
_928.getParameter=function(_929){
return this.parameters[_929];
};
_928.setParameter=function(_92a,_92b){
this.parameters[_92a]=_92b;
};
_928.getParameters=function(){
var arr=[];
for(var name in this.parameters){
if(this.parameters.hasOwnProperty(name)){
arr.push(name);
}
}
return arr;
};
_928.parse=function(str){
var arr=str.split(";");
if(arr[0]!=this.name){
throw new Error("Error: name not match");
}
this.parameters={};
for(var i=1;i<arr.length;i++){
var _931=arr[i].indexOf("=");
this.parameters[arr[i].subString(0,_931)]=arr[i].substring(_931+1);
}
};
_928.toString=function(){
var arr=[this.name];
for(var p in this.parameters){
if(this.parameters.hasOwnProperty(p)){
arr.push(p.name+"="+this.parameters[p]);
}
}
return arr.join(";");
};
return _926;
})();
})();
(function(){
window.WebSocketRevalidateExtension=(function(){
var _934=function(){
};
var _935=_934.prototype=new WebSocketExtension(_55b.KAAZING_SEC_EXTENSION_REVALIDATE);
return _934;
})();
})();
(function(){
window.WebSocketFactory=(function(){
var _936="WebSocketFactory";
var LOG=_270.getLogger(_936);
var _938=function(){
this.extensions={};
var _939=new WebSocketRevalidateExtension();
this.extensions[_939.name]=_939;
this.redirectPolicy=HttpRedirectPolicy.ALWAYS;
};
var _93a=_938.prototype;
_93a.getExtension=function(name){
return this.extensions[name];
};
_93a.setExtension=function(_93c){
this.extensions[_93c.name]=_93c;
};
_93a.setChallengeHandler=function(_93d){
if(typeof (_93d)=="undefined"){
var s="WebSocketFactory.setChallengeHandler(): Parameter 'challengeHandler' is required";
throw new Error(s);
}
this.challengeHandler=_93d;
var _93f=this.extensions[_55b.KAAZING_SEC_EXTENSION_REVALIDATE];
_93f.enabled=(_93d!=null);
};
_93a.getChallengeHandler=function(){
return this.challengeHandler||null;
};
_93a.createWebSocket=function(url,_941){
var ext=[];
for(var key in this.extensions){
if(this.extensions.hasOwnProperty(key)&&this.extensions[key].enabled){
ext.push(this.extensions[key].toString());
}
}
var _944=this.getChallengeHandler();
var _945=this.getDefaultConnectTimeout();
var _946=this.getDefaultRedirectPolicy();
var ws=new WebSocket(url,_941,ext,_944,_945,_946);
return ws;
};
_93a.setDefaultConnectTimeout=function(_948){
if(typeof (_948)=="undefined"){
var s="WebSocketFactory.setDefaultConnectTimeout(): int parameter 'connectTimeout' is required";
throw new Error(s);
}
if(typeof (_948)!="number"){
var s="WebSocketFactory.setDefaultConnectTimeout(): connectTimeout should be an integer";
throw new Error(s);
}
if(_948<0){
var s="WebSocketFactory.setDefaultConnectTimeout(): Connect timeout cannot be negative";
throw new Error(s);
}
this.connectTimeout=_948;
};
_93a.getDefaultConnectTimeout=function(){
return this.connectTimeout||0;
};
_93a.setDefaultRedirectPolicy=function(_94a){
if(typeof (_94a)=="undefined"){
var s="WebSocketFactory.setDefaultRedirectPolicy(): int parameter 'redirectPolicy' is required";
throw new Error(s);
}
if(!(_94a instanceof HttpRedirectPolicy)){
var s="WebSocketFactory.setDefaultRedirectPolicy(): redirectPolicy should be an instance of HttpRedirectPolicy";
throw new Error(s);
}
this.redirectPolicy=_94a;
};
_93a.getDefaultRedirectPolicy=function(){
return this.redirectPolicy;
};
return _938;
})();
})();
window.___Loader=new _3a6(_26f);
})();
})();
