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
var _29b=function(key){
var tags=document.getElementsByTagName("meta");
for(var i=0;i<tags.length;i++){
if(tags[i].name===key){
var v=tags[i].content;
return v;
}
}
};
var _2a0=function(_2a1){
var _2a2=[];
for(var i=0;i<_2a1.length;i++){
_2a2.push(_2a1[i]);
}
return _2a2;
};
var _2a4=function(_2a5,_2a6){
var _2a7=[];
for(var i=0;i<_2a5.length;i++){
var elt=_2a5[i];
if(_2a6(elt)){
_2a7.push(_2a5[i]);
}
}
return _2a7;
};
var _2aa=function(_2ab,_2ac){
for(var i=0;i<_2ab.length;i++){
if(_2ab[i]==_2ac){
return i;
}
}
return -1;
};
var _2ae=function(s){
var a=[];
for(var i=0;i<s.length;i++){
a.push(s.charCodeAt(i)&255);
}
var buf=new ByteBuffer(a);
var v=_2b4(buf,Charset.UTF8);
return v;
};
var _2b5=function(_2b6){
var buf=new Uint8Array(_2b6);
var a=[];
for(var i=0;i<buf.length;i++){
a.push(buf[i]);
}
var buf=new ByteBuffer(a);
var s=_2b4(buf,Charset.UTF8);
return s;
};
var _2bb=function(_2bc){
var buf=new Uint8Array(_2bc);
var a=[];
for(var i=0;i<buf.length;i++){
a.push(buf[i]);
}
return new ByteBuffer(a);
};
var _2c0=String.fromCharCode(127);
var NULL=String.fromCharCode(0);
var _2c2="\n";
var _2c3=function(buf){
var a=[];
while(buf.remaining()){
var n=buf.getUnsigned();
var chr=String.fromCharCode(n);
switch(chr){
case _2c0:
a.push(_2c0);
a.push(_2c0);
break;
case NULL:
a.push(_2c0);
a.push("0");
break;
case _2c2:
a.push(_2c0);
a.push("n");
break;
default:
a.push(chr);
}
}
var v=a.join("");
return v;
};
var _2c9=function(buf,_2cb){
if(_2cb){
return _2c3(buf);
}else{
var _2cc=buf.array;
var _2cd=(buf.position==0&&buf.limit==_2cc.length)?_2cc:buf.getBytes(buf.remaining());
var _2ce=!(XMLHttpRequest.prototype.sendAsBinary);
for(var i=_2cd.length-1;i>=0;i--){
var _2d0=_2cd[i];
if(_2d0==0&&_2ce){
_2cd[i]=256;
}else{
if(_2d0<0){
_2cd[i]=_2d0&255;
}
}
}
var _2d1=0;
var _2d2=[];
do{
var _2d3=Math.min(_2cd.length-_2d1,10000);
partOfBytes=_2cd.slice(_2d1,_2d1+_2d3);
_2d1+=_2d3;
_2d2.push(String.fromCharCode.apply(null,partOfBytes));
}while(_2d1<_2cd.length);
var _2d4=_2d2.join("");
if(_2cd===_2cc){
for(var i=_2cd.length-1;i>=0;i--){
var _2d0=_2cd[i];
if(_2d0==256){
_2cd[i]=0;
}
}
}
return _2d4;
}
};
var _2b4=function(buf,cs){
var _2d7=buf.position;
var _2d8=buf.limit;
var _2d9=buf.array;
while(_2d7<_2d8){
_2d7++;
}
try{
buf.limit=_2d7;
return cs.decode(buf);
}
finally{
if(_2d7!=_2d8){
buf.limit=_2d8;
buf.position=_2d7+1;
}
}
};
var _2da=window.WebSocket;
var _2db=(function(){
var _2dc=function(){
this.parent;
this._listener;
this.code=1005;
this.reason="";
};
var _2dd=(browser=="safari"&&typeof (_2da.CLOSING)=="undefined");
var _2de=(browser=="android");
var _2df=_2dc.prototype;
_2df.connect=function(_2e0,_2e1){
if((typeof (_2da)==="undefined")||_2de){
doError(this);
return;
}
if(_2e0.indexOf("javascript:")==0){
_2e0=_2e0.substr("javascript:".length);
}
var _2e2=_2e0.indexOf("?");
if(_2e2!=-1){
if(!/[\?&]\.kl=Y/.test(_2e0.substring(_2e2))){
_2e0+="&.kl=Y";
}
}else{
_2e0+="?.kl=Y";
}
this._sendQueue=[];
try{
if(_2e1){
this._requestedProtocol=_2e1;
this._delegate=new _2da(_2e0,_2e1);
}else{
this._delegate=new _2da(_2e0);
}
this._delegate.binaryType="arraybuffer";
}
catch(e){
doError(this);
return;
}
bindHandlers(this);
};
_2df.onerror=function(){
};
_2df.onmessage=function(){
};
_2df.onopen=function(){
};
_2df.onclose=function(){
};
_2df.close=function(code,_2e4){
if(code){
if(_2dd){
doCloseDraft76Compat(this,code,_2e4);
}else{
this._delegate.close(code,_2e4);
}
}else{
this._delegate.close();
}
};
function doCloseDraft76Compat(_2e5,code,_2e7){
_2e5.code=code|1005;
_2e5.reason=_2e7|"";
_2e5._delegate.close();
};
_2df.send=function(_2e8){
doSend(this,_2e8);
return;
};
_2df.setListener=function(_2e9){
this._listener=_2e9;
};
_2df.setIdleTimeout=function(_2ea){
this.lastMessageTimestamp=new Date().getTime();
this.idleTimeout=_2ea;
startIdleTimer(this,_2ea);
return;
};
function doSend(_2eb,_2ec){
if(typeof (_2ec)=="string"){
_2eb._delegate.send(_2ec);
}else{
if(_2ec.byteLength||_2ec.size){
_2eb._delegate.send(_2ec);
}else{
if(_2ec.constructor==ByteBuffer){
_2eb._delegate.send(_2ec.getArrayBuffer(_2ec.remaining()));
}else{
throw new Error("Cannot call send() with that type");
}
}
}
};
function doError(_2ed,e){
setTimeout(function(){
_2ed._listener.connectionFailed(_2ed.parent);
},0);
};
function encodeMessageData(_2ef,e){
var buf;
if(typeof e.data.byteLength!=="undefined"){
buf=_2bb(e.data);
}else{
buf=ByteBuffer.allocate(e.data.length);
if(_2ef.parent._isBinary&&_2ef.parent._balanced>1){
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
function messageHandler(_2f3,e){
_2f3.lastMessageTimestamp=new Date().getTime();
if(typeof (e.data)==="string"){
_2f3._listener.textMessageReceived(_2f3.parent,e.data);
}else{
_2f3._listener.binaryMessageReceived(_2f3.parent,e.data);
}
};
function closeHandler(_2f5,e){
unbindHandlers(_2f5);
if(_2dd){
_2f5._listener.connectionClosed(_2f5.parent,true,_2f5.code,_2f5.reason);
}else{
_2f5._listener.connectionClosed(_2f5.parent,e.wasClean,e.code,e.reason);
}
};
function errorHandler(_2f7,e){
_2f7._listener.connectionError(_2f7.parent,e);
};
function openHandler(_2f9,e){
if(_2dd){
_2f9._delegate.protocol=_2f9._requestedProtocol;
}
_2f9._listener.connectionOpened(_2f9.parent,_2f9._delegate.protocol);
};
function bindHandlers(_2fb){
var _2fc=_2fb._delegate;
_2fc.onopen=function(e){
openHandler(_2fb,e);
};
_2fc.onmessage=function(e){
messageHandler(_2fb,e);
};
_2fc.onclose=function(e){
closeHandler(_2fb,e);
};
_2fc.onerror=function(e){
errorHandler(_2fb,e);
};
_2fb.readyState=function(){
return _2fc.readyState;
};
};
function unbindHandlers(_301){
var _302=_301._delegate;
_302.onmessage=undefined;
_302.onclose=undefined;
_302.onopen=undefined;
_302.onerror=undefined;
_301.readyState=WebSocket.CLOSED;
};
function startIdleTimer(_303,_304){
stopIdleTimer(_303);
_303.idleTimer=setTimeout(function(){
idleTimerHandler(_303);
},_304);
};
function idleTimerHandler(_305){
var _306=new Date().getTime();
var _307=_306-_305.lastMessageTimestamp;
var _308=_305.idleTimeout;
if(_307>_308){
try{
var _309=_305._delegate;
if(_309){
unbindHandlers(_305);
_309.close();
}
}
finally{
_305._listener.connectionClosed(_305.parent,false,1006,"");
}
}else{
startIdleTimer(_305,_308-_307);
}
};
function stopIdleTimer(_30a){
if(_30a.idleTimer!=null){
clearTimeout(_30a.idleTimer);
_30a.IdleTimer=null;
}
};
return _2dc;
})();
var _30b=(function(){
var _30c=function(){
this.parent;
this._listener;
};
var _30d=_30c.prototype;
_30d.connect=function(_30e,_30f){
this.URL=_30e;
try{
_310(this,_30e,_30f);
}
catch(e){
doError(this,e);
}
this.constructor=_30c;
};
_30d.setListener=function(_311){
this._listener=_311;
};
_30c._flashBridge={};
_30c._flashBridge.readyWaitQueue=[];
_30c._flashBridge.failWaitQueue=[];
_30c._flashBridge.flashHasLoaded=false;
_30c._flashBridge.flashHasFailed=false;
_30d.URL="";
_30d.readyState=0;
_30d.bufferedAmount=0;
_30d.connectionOpened=function(_312,_313){
var _313=_313.split("\n");
for(var i=0;i<_313.length;i++){
var _315=_313[i].split(":");
_312.responseHeaders[_315[0]]=_315[1];
}
this._listener.connectionOpened(_312,"");
};
_30d.connectionClosed=function(_316,_317,code,_319){
this._listener.connectionClosed(_316,_317,code,_319);
};
_30d.connectionFailed=function(_31a){
this._listener.connectionFailed(_31a);
};
_30d.binaryMessageReceived=function(_31b,data){
this._listener.binaryMessageReceived(_31b,data);
};
_30d.textMessageReceived=function(_31d,s){
this._listener.textMessageReceived(_31d,s);
};
_30d.redirected=function(_31f,_320){
this._listener.redirected(_31f,_320);
};
_30d.authenticationRequested=function(_321,_322,_323){
this._listener.authenticationRequested(_321,_322,_323);
};
_30d.send=function(data){
switch(this.readyState){
case 0:
throw new Error("INVALID_STATE_ERR");
break;
case 1:
if(data===null){
throw new Error("data is null");
}
if(typeof (data)=="string"){
_30c._flashBridge.sendText(this._instanceId,data);
}else{
if(data.constructor==ByteBuffer){
var _325;
var a=[];
while(data.remaining()){
a.push(String.fromCharCode(data.get()));
}
var _325=a.join("");
_30c._flashBridge.sendByteString(this._instanceId,_325);
}else{
if(data.byteLength){
var _325;
var a=[];
var _327=new DataView(data);
for(var i=0;i<data.byteLength;i++){
a.push(String.fromCharCode(_327.getUint8(i)));
}
var _325=a.join("");
_30c._flashBridge.sendByteString(this._instanceId,_325);
}else{
if(data.size){
var _329=this;
var cb=function(_32b){
_30c._flashBridge.sendByteString(_329._instanceId,_32b);
};
BlobUtils.asBinaryString(cb,data);
return;
}else{
throw new Error("Invalid type");
}
}
}
}
_32c(this);
return true;
break;
case 2:
return false;
break;
default:
throw new Error("INVALID_STATE_ERR");
}
};
_30d.close=function(code,_32e){
switch(this.readyState){
case 0:
case 1:
_30c._flashBridge.disconnect(this._instanceId,code,_32e);
break;
}
};
_30d.disconnect=_30d.close;
var _32c=function(_32f){
_32f.bufferedAmount=_30c._flashBridge.getBufferedAmount(_32f._instanceId);
if(_32f.bufferedAmount!=0){
setTimeout(function(){
_32c(_32f);
},1000);
}
};
var _310=function(_330,_331,_332){
var _333=function(key,_335){
_335[key]=_330;
_330._instanceId=key;
};
var _336=function(){
doError(_330);
};
var _337=[];
if(_330.parent.requestHeaders&&_330.parent.requestHeaders.length>0){
for(var i=0;i<_330.parent.requestHeaders.length;i++){
_337.push(_330.parent.requestHeaders[i].label+":"+_330.parent.requestHeaders[i].value);
}
}
_30c._flashBridge.registerWebSocketEmulated(_331,_337.join("\n"),_333,_336);
};
function doError(_339,e){
setTimeout(function(){
_339._listener.connectionFailed(_339.parent);
},0);
};
return _30c;
})();
var _33b=(function(){
var _33c=function(){
this.parent;
this._listener;
};
var _33d=_33c.prototype;
_33d.connect=function(_33e,_33f){
this.URL=_33e;
try{
_340(this,_33e,_33f);
}
catch(e){
doError(this,e);
}
this.constructor=_33c;
};
_33d.setListener=function(_341){
this._listener=_341;
};
_30b._flashBridge={};
_30b._flashBridge.readyWaitQueue=[];
_30b._flashBridge.failWaitQueue=[];
_30b._flashBridge.flashHasLoaded=false;
_30b._flashBridge.flashHasFailed=false;
_33d.URL="";
_33d.readyState=0;
_33d.bufferedAmount=0;
_33d.connectionOpened=function(_342,_343){
var _343=_343.split("\n");
for(var i=0;i<_343.length;i++){
var _345=_343[i].split(":");
_342.responseHeaders[_345[0]]=_345[1];
}
this._listener.connectionOpened(_342,"");
};
_33d.connectionClosed=function(_346,_347,code,_349){
this._listener.connectionClosed(_346,_347,code,_349);
};
_33d.connectionFailed=function(_34a){
this._listener.connectionFailed(_34a);
};
_33d.binaryMessageReceived=function(_34b,data){
this._listener.binaryMessageReceived(_34b,data);
};
_33d.textMessageReceived=function(_34d,s){
this._listener.textMessageReceived(_34d,s);
};
_33d.redirected=function(_34f,_350){
this._listener.redirected(_34f,_350);
};
_33d.authenticationRequested=function(_351,_352,_353){
this._listener.authenticationRequested(_351,_352,_353);
};
_33d.send=function(data){
switch(this.readyState){
case 0:
throw new Error("INVALID_STATE_ERR");
break;
case 1:
if(data===null){
throw new Error("data is null");
}
if(typeof (data)=="string"){
_30b._flashBridge.sendText(this._instanceId,data);
}else{
if(typeof (data.array)=="object"){
var _355;
var a=[];
var b;
while(data.remaining()){
b=data.get();
a.push(String.fromCharCode(b));
}
var _355=a.join("");
_30b._flashBridge.sendByteString(this._instanceId,_355);
return;
}else{
throw new Error("Invalid type");
}
}
_358(this);
return true;
break;
case 2:
return false;
break;
default:
throw new Error("INVALID_STATE_ERR");
}
};
_33d.close=function(code,_35a){
switch(this.readyState){
case 1:
case 2:
_30b._flashBridge.disconnect(this._instanceId,code,_35a);
break;
}
};
_33d.disconnect=_33d.close;
var _358=function(_35b){
_35b.bufferedAmount=_30b._flashBridge.getBufferedAmount(_35b._instanceId);
if(_35b.bufferedAmount!=0){
setTimeout(function(){
_358(_35b);
},1000);
}
};
var _340=function(_35c,_35d,_35e){
var _35f=function(key,_361){
_361[key]=_35c;
_35c._instanceId=key;
};
var _362=function(){
doError(_35c);
};
var _363=[];
if(_35c.parent.requestHeaders&&_35c.parent.requestHeaders.length>0){
for(var i=0;i<_35c.parent.requestHeaders.length;i++){
_363.push(_35c.parent.requestHeaders[i].label+":"+_35c.parent.requestHeaders[i].value);
}
}
_30b._flashBridge.registerWebSocketRtmp(_35d,_363.join("\n"),_35f,_362);
};
function doError(_365,e){
setTimeout(function(){
_365._listener.connectionFailed(_365.parent);
},0);
};
return _33c;
})();
(function(){
var _367={};
_30b._flashBridge.registerWebSocketEmulated=function(_368,_369,_36a,_36b){
var _36c=function(){
var key=_30b._flashBridge.doRegisterWebSocketEmulated(_368,_369);
_36a(key,_367);
};
if(_30b._flashBridge.flashHasLoaded){
if(_30b._flashBridge.flashHasFailed){
_36b();
}else{
_36c();
}
}else{
this.readyWaitQueue.push(_36c);
this.failWaitQueue.push(_36b);
}
};
_30b._flashBridge.doRegisterWebSocketEmulated=function(_36e,_36f){
var key=_30b._flashBridge.elt.registerWebSocketEmulated(_36e,_36f);
return key;
};
_30b._flashBridge.registerWebSocketRtmp=function(_371,_372,_373,_374){
var _375=function(){
var key=_30b._flashBridge.doRegisterWebSocketRtmp(_371,_372);
_373(key,_367);
};
if(_30b._flashBridge.flashHasLoaded){
if(_30b._flashBridge.flashHasFailed){
_374();
}else{
_375();
}
}else{
this.readyWaitQueue.push(_375);
this.failWaitQueue.push(_374);
}
};
_30b._flashBridge.doRegisterWebSocketRtmp=function(_377,_378){
var key=_30b._flashBridge.elt.registerWebSocketRtmp(_377,_378);
return key;
};
_30b._flashBridge.onready=function(){
var _37a=_30b._flashBridge.readyWaitQueue;
for(var i=0;i<_37a.length;i++){
var _37c=_37a[i];
_37c();
}
};
_30b._flashBridge.onfail=function(){
var _37d=_30b._flashBridge.failWaitQueue;
for(var i=0;i<_37d.length;i++){
var _37f=_37d[i];
_37f();
}
};
_30b._flashBridge.connectionOpened=function(key,_381){
_367[key].readyState=1;
_367[key].connectionOpened(_367[key].parent,_381);
_382();
};
_30b._flashBridge.connectionClosed=function(key,_384,code,_386){
_367[key].readyState=2;
_367[key].connectionClosed(_367[key].parent,_384,code,_386);
};
_30b._flashBridge.connectionFailed=function(key){
_367[key].connectionFailed(_367[key].parent);
};
_30b._flashBridge.binaryMessageReceived=function(key,data){
var _38a=_367[key];
if(_38a.readyState==1){
var buf=ByteBuffer.allocate(data.length);
for(var i=0;i<data.length;i++){
buf.put(data[i]);
}
buf.flip();
_38a.binaryMessageReceived(_38a.parent,buf);
}
};
_30b._flashBridge.textMessageReceived=function(key,data){
var _38f=_367[key];
if(_38f.readyState==1){
_38f.textMessageReceived(_38f.parent,unescape(data));
}
};
_30b._flashBridge.redirected=function(key,_391){
var _392=_367[key];
_392.redirected(_392.parent,_391);
};
_30b._flashBridge.authenticationRequested=function(key,_394,_395){
var _396=_367[key];
_396.authenticationRequested(_396.parent,_394,_395);
};
var _382=function(){
if(browser==="firefox"){
var e=document.createElement("iframe");
e.style.display="none";
document.body.appendChild(e);
document.body.removeChild(e);
}
};
_30b._flashBridge.sendText=function(key,_399){
this.elt.processTextMessage(key,escape(_399));
setTimeout(_382,200);
};
_30b._flashBridge.sendByteString=function(key,_39b){
this.elt.processBinaryMessage(key,escape(_39b));
setTimeout(_382,200);
};
_30b._flashBridge.disconnect=function(key,code,_39e){
this.elt.processClose(key,code,_39e);
};
_30b._flashBridge.getBufferedAmount=function(key){
var v=this.elt.getBufferedAmount(key);
return v;
};
})();
(function(){
var _3a1=function(_3a2){
var self=this;
var _3a4=3000;
var ID="Loader";
var ie=false;
var _3a7=-1;
self.elt=null;
var _3a8=function(){
var exp=new RegExp(".*"+_3a2+".*.js$");
var _3aa=document.getElementsByTagName("script");
for(var i=0;i<_3aa.length;i++){
if(_3aa[i].src){
var name=(_3aa[i].src).match(exp);
if(name){
name=name.pop();
var _3ad=name.split("/");
_3ad.pop();
if(_3ad.length>0){
return _3ad.join("/")+"/";
}else{
return "";
}
}
}
}
};
var _3ae=_3a8();
var _3af=_3ae+"Loader.swf";
self.loader=function(){
var _3b0="flash";
var tags=document.getElementsByTagName("meta");
for(var i=0;i<tags.length;i++){
if(tags[i].name==="kaazing:upgrade"){
_3b0=tags[i].content;
}
}
if(_3b0!="flash"||!_3b3([9,0,115])){
_3b4();
}else{
_3a7=setTimeout(_3b4,_3a4);
_3b5();
}
};
self.clearFlashTimer=function(){
clearTimeout(_3a7);
_3a7="cleared";
setTimeout(function(){
_3b6(self.elt.handshake(_3a2));
},0);
};
var _3b6=function(_3b7){
if(_3b7){
_30b._flashBridge.flashHasLoaded=true;
_30b._flashBridge.elt=self.elt;
_30b._flashBridge.onready();
}else{
_3b4();
}
window.___Loader=undefined;
};
var _3b4=function(){
_30b._flashBridge.flashHasLoaded=true;
_30b._flashBridge.flashHasFailed=true;
_30b._flashBridge.onfail();
};
var _3b8=function(){
var _3b9=null;
if(typeof (ActiveXObject)!="undefined"){
try{
ie=true;
var swf=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
var _3bb=swf.GetVariable("$version");
var _3bc=_3bb.split(" ")[1].split(",");
_3b9=[];
for(var i=0;i<_3bc.length;i++){
_3b9[i]=parseInt(_3bc[i]);
}
}
catch(e){
ie=false;
}
}
if(typeof navigator.plugins!="undefined"){
if(typeof navigator.plugins["Shockwave Flash"]!="undefined"){
var _3bb=navigator.plugins["Shockwave Flash"].description;
_3bb=_3bb.replace(/\s*r/g,".");
var _3bc=_3bb.split(" ")[2].split(".");
_3b9=[];
for(var i=0;i<_3bc.length;i++){
_3b9[i]=parseInt(_3bc[i]);
}
}
}
var _3be=navigator.userAgent;
if(_3b9!==null&&_3b9[0]===10&&_3b9[1]===0&&_3be.indexOf("Windows NT 6.0")!==-1){
_3b9=null;
}
if(_3be.indexOf("MSIE 6.0")==-1&&_3be.indexOf("MSIE 7.0")==-1){
if(_3be.indexOf("MSIE 8.0")>0||_3be.indexOf("MSIE 9.0")>0){
if(typeof (XDomainRequest)!=="undefined"){
_3b9=null;
}
}else{
_3b9=null;
}
}
return _3b9;
};
var _3b3=function(_3bf){
var _3c0=_3b8();
if(_3c0==null){
return false;
}
for(var i=0;i<Math.max(_3c0.length,_3bf.length);i++){
var _3c2=_3c0[i]-_3bf[i];
if(_3c2!=0){
return (_3c2>0)?true:false;
}
}
return true;
};
var _3b5=function(){
if(ie){
var elt=document.createElement("div");
document.body.appendChild(elt);
elt.outerHTML="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" height=\"0\" width=\"0\" id=\""+ID+"\"><param name=\"movie\" value=\""+_3af+"\"></param></object>";
self.elt=document.getElementById(ID);
}else{
var elt=document.createElement("object");
elt.setAttribute("type","application/x-shockwave-flash");
elt.setAttribute("width",0);
elt.setAttribute("height",0);
elt.setAttribute("id",ID);
elt.setAttribute("data",_3af);
document.body.appendChild(elt);
self.elt=elt;
}
};
self.attachToOnload=function(_3c4){
if(window.addEventListener){
window.addEventListener("load",_3c4,true);
}else{
if(window.attachEvent){
window.attachEvent("onload",_3c4);
}else{
onload=_3c4;
}
}
};
if(document.readyState==="complete"){
self.loader();
}else{
self.attachToOnload(self.loader);
}
};
var _3c5=(function(){
var _3c6=function(_3c7){
this.HOST=new _3c6(0);
this.USERINFO=new _3c6(1);
this.PORT=new _3c6(2);
this.PATH=new _3c6(3);
this.ordinal=_3c7;
};
return _3c6;
})();
var _3c8=(function(){
var _3c9=function(){
};
_3c9.getRealm=function(_3ca){
var _3cb=_3ca.authenticationParameters;
if(_3cb==null){
return null;
}
var _3cc=/realm=(\"(.*)\")/i;
var _3cd=_3cc.exec(_3cb);
return (_3cd!=null&&_3cd.length>=3)?_3cd[2]:null;
};
return _3c9;
})();
function Dictionary(){
this.Keys=new Array();
};
var _3ce=(function(){
var _3cf=function(_3d0){
this.weakKeys=_3d0;
this.elements=[];
this.dictionary=new Dictionary();
};
var _3d1=_3cf.prototype;
_3d1.getlength=function(){
return this.elements.length;
};
_3d1.getItemAt=function(_3d2){
return this.dictionary[this.elements[_3d2]];
};
_3d1.get=function(key){
var _3d4=this.dictionary[key];
if(_3d4==undefined){
_3d4=null;
}
return _3d4;
};
_3d1.remove=function(key){
for(var i=0;i<this.elements.length;i++){
var _3d7=(this.weakKeys&&(this.elements[i]==key));
var _3d8=(!this.weakKeys&&(this.elements[i]===key));
if(_3d7||_3d8){
this.elements.remove(i);
this.dictionary[this.elements[i]]=undefined;
break;
}
}
};
_3d1.put=function(key,_3da){
this.remove(key);
this.elements.push(key);
this.dictionary[key]=_3da;
};
_3d1.isEmpty=function(){
return this.length==0;
};
_3d1.containsKey=function(key){
for(var i=0;i<this.elements.length;i++){
var _3dd=(this.weakKeys&&(this.elements[i]==key));
var _3de=(!this.weakKeys&&(this.elements[i]===key));
if(_3dd||_3de){
return true;
}
}
return false;
};
_3d1.keySet=function(){
return this.elements;
};
_3d1.getvalues=function(){
var _3df=[];
for(var i=0;i<this.elements.length;i++){
_3df.push(this.dictionary[this.elements[i]]);
}
return _3df;
};
return _3cf;
})();
var Node=(function(){
var Node=function(){
this.name="";
this.kind="";
this.values=[];
this.children=new _3ce();
};
var _3e3=Node.prototype;
_3e3.getWildcardChar=function(){
return "*";
};
_3e3.addChild=function(name,kind){
if(name==null||name.length==0){
throw new ArgumentError("A node may not have a null name.");
}
var _3e6=Node.createNode(name,this,kind);
this.children.put(name,_3e6);
return _3e6;
};
_3e3.hasChild=function(name,kind){
return null!=this.getChild(name)&&kind==this.getChild(name).kind;
};
_3e3.getChild=function(name){
return this.children.get(name);
};
_3e3.getDistanceFromRoot=function(){
var _3ea=0;
var _3eb=this;
while(!_3eb.isRootNode()){
_3ea++;
_3eb=_3eb.parent;
}
return _3ea;
};
_3e3.appendValues=function(){
if(this.isRootNode()){
throw new ArgumentError("Cannot set a values on the root node.");
}
if(this.values!=null){
for(var k=0;k<arguments.length;k++){
var _3ed=arguments[k];
this.values.push(_3ed);
}
}
};
_3e3.removeValue=function(_3ee){
if(this.isRootNode()){
return;
}
for(var i=0;i<this.values.length;i++){
if(this.values[i]==_3ee){
this.values.splice(i,1);
}
}
};
_3e3.getValues=function(){
return this.values;
};
_3e3.hasValues=function(){
return this.values!=null&&this.values.length>0;
};
_3e3.isRootNode=function(){
return this.parent==null;
};
_3e3.hasChildren=function(){
return this.children!=null&&this.children.getlength()>0;
};
_3e3.isWildcard=function(){
return this.name!=null&&this.name==this.getWildcardChar();
};
_3e3.hasWildcardChild=function(){
return this.hasChildren()&&this.children.containsKey(this.getWildcardChar());
};
_3e3.getFullyQualifiedName=function(){
var b=new String();
var name=[];
var _3f2=this;
while(!_3f2.isRootNode()){
name.push(_3f2.name);
_3f2=_3f2.parent;
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
_3e3.getChildrenAsList=function(){
return this.children.getvalues();
};
_3e3.findBestMatchingNode=function(_3f4,_3f5){
var _3f6=this.findAllMatchingNodes(_3f4,_3f5);
var _3f7=null;
var _3f8=0;
for(var i=0;i<_3f6.length;i++){
var node=_3f6[i];
if(node.getDistanceFromRoot()>_3f8){
_3f8=node.getDistanceFromRoot();
_3f7=node;
}
}
return _3f7;
};
_3e3.findAllMatchingNodes=function(_3fb,_3fc){
var _3fd=[];
var _3fe=this.getChildrenAsList();
for(var i=0;i<_3fe.length;i++){
var node=_3fe[i];
var _401=node.matches(_3fb,_3fc);
if(_401<0){
continue;
}
if(_401>=_3fb.length){
do{
if(node.hasValues()){
_3fd.push(node);
}
if(node.hasWildcardChild()){
var _402=node.getChild(this.getWildcardChar());
if(_402.kind!=this.kind){
node=null;
}else{
node=_402;
}
}else{
node=null;
}
}while(node!=null);
}else{
var _403=node.findAllMatchingNodes(_3fb,_401);
for(var j=0;j<_403.length;j++){
_3fd.push(_403[j]);
}
}
}
return _3fd;
};
_3e3.matches=function(_405,_406){
if(_406<0||_406>=_405.length){
return -1;
}
if(this.matchesToken(_405[_406])){
return _406+1;
}
if(!this.isWildcard()){
return -1;
}else{
if(this.kind!=_405[_406].kind){
return -1;
}
do{
_406++;
}while(_406<_405.length&&this.kind==_405[_406].kind);
return _406;
}
};
_3e3.matchesToken=function(_407){
return this.name==_407.name&&this.kind==_407.kind;
};
Node.createNode=function(name,_409,kind){
var node=new Node();
node.name=name;
node.parent=_409;
node.kind=kind;
return node;
};
return Node;
})();
var _40c=(function(){
var _40d=function(name,kind){
this.kind=kind;
this.name=name;
};
return _40d;
})();
window.Oid=(function(){
var Oid=function(data){
this.rep=data;
};
var _412=Oid.prototype;
_412.asArray=function(){
return this.rep;
};
_412.asString=function(){
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
var _416=(function(){
var _417=function(){
};
_417.create=function(_418,_419,_41a){
var _41b=_418+":"+_419;
var _41c=[];
for(var i=0;i<_41b.length;++i){
_41c.push(_41b.charCodeAt(i));
}
var _41e="Basic "+Base64.encode(_41c);
return new ChallengeResponse(_41e,_41a);
};
return _417;
})();
function InternalDefaultChallengeHandler(){
this.canHandle=function(_41f){
return false;
};
this.handle=function(_420,_421){
_421(null);
};
};
window.PasswordAuthentication=(function(){
function PasswordAuthentication(_422,_423){
this.username=_422;
this.password=_423;
};
PasswordAuthentication.prototype.clear=function(){
this.username=null;
this.password=null;
};
return PasswordAuthentication;
})();
window.ChallengeRequest=(function(){
var _424=function(_425,_426){
if(_425==null){
throw new Error("location is not defined.");
}
if(_426==null){
return;
}
var _427="Application ";
if(_426.indexOf(_427)==0){
_426=_426.substring(_427.length);
}
this.location=_425;
this.authenticationParameters=null;
var _428=_426.indexOf(" ");
if(_428==-1){
this.authenticationScheme=_426;
}else{
this.authenticationScheme=_426.substring(0,_428);
if(_426.length>_428+1){
this.authenticationParameters=_426.substring(_428+1);
}
}
};
return _424;
})();
window.ChallengeResponse=(function(){
var _429=function(_42a,_42b){
this.credentials=_42a;
this.nextChallengeHandler=_42b;
};
var _42c=_429.prototype;
_42c.clearCredentials=function(){
if(this.credentials!=null){
this.credentials=null;
}
};
return _429;
})();
window.BasicChallengeHandler=(function(){
var _42d=function(){
this.loginHandler=undefined;
this.loginHandlersByRealm={};
};
var _42e=_42d.prototype;
_42e.setRealmLoginHandler=function(_42f,_430){
if(_42f==null){
throw new ArgumentError("null realm");
}
if(_430==null){
throw new ArgumentError("null loginHandler");
}
this.loginHandlersByRealm[_42f]=_430;
return this;
};
_42e.canHandle=function(_431){
return _431!=null&&"Basic"==_431.authenticationScheme;
};
_42e.handle=function(_432,_433){
if(_432.location!=null){
var _434=this.loginHandler;
var _435=_3c8.getRealm(_432);
if(_435!=null&&this.loginHandlersByRealm[_435]!=null){
_434=this.loginHandlersByRealm[_435];
}
var _436=this;
if(_434!=null){
_434(function(_437){
if(_437!=null&&_437.username!=null){
_433(_416.create(_437.username,_437.password,_436));
}else{
_433(null);
}
});
return;
}
}
_433(null);
};
_42e.loginHandler=function(_438){
_438(null);
};
return _42d;
})();
window.DispatchChallengeHandler=(function(){
var _439=function(){
this.rootNode=new Node();
var _43a="^(.*)://(.*)";
this.SCHEME_URI_PATTERN=new RegExp(_43a);
};
function delChallengeHandlerAtLocation(_43b,_43c,_43d){
var _43e=tokenize(_43c);
var _43f=_43b;
for(var i=0;i<_43e.length;i++){
var _441=_43e[i];
if(!_43f.hasChild(_441.name,_441.kind)){
return;
}else{
_43f=_43f.getChild(_441.name);
}
}
_43f.removeValue(_43d);
};
function addChallengeHandlerAtLocation(_442,_443,_444){
var _445=tokenize(_443);
var _446=_442;
for(var i=0;i<_445.length;i++){
var _448=_445[i];
if(!_446.hasChild(_448.name,_448.kind)){
_446=_446.addChild(_448.name,_448.kind);
}else{
_446=_446.getChild(_448.name);
}
}
_446.appendValues(_444);
};
function lookupByLocation(_449,_44a){
var _44b=new Array();
if(_44a!=null){
var _44c=findBestMatchingNode(_449,_44a);
if(_44c!=null){
return _44c.values;
}
}
return _44b;
};
function lookupByRequest(_44d,_44e){
var _44f=null;
var _450=_44e.location;
if(_450!=null){
var _451=findBestMatchingNode(_44d,_450);
if(_451!=null){
var _452=_451.getValues();
if(_452!=null){
for(var i=0;i<_452.length;i++){
var _454=_452[i];
if(_454.canHandle(_44e)){
_44f=_454;
break;
}
}
}
}
}
return _44f;
};
function findBestMatchingNode(_455,_456){
var _457=tokenize(_456);
var _458=0;
return _455.findBestMatchingNode(_457,_458);
};
function tokenize(uri){
var _45a=new Array();
if(uri==null||uri.length==0){
return _45a;
}
var _45b=new RegExp("^(([^:/?#]+):(//))?([^/?#]*)?([^?#]*)(\\?([^#]*))?(#(.*))?");
var _45c=_45b.exec(uri);
if(_45c==null){
return _45a;
}
var _45d=_45c[2]||"http";
var _45e=_45c[4];
var path=_45c[5];
var _460=null;
var _461=null;
var _462=null;
var _463=null;
if(_45e!=null){
var host=_45e;
var _465=host.indexOf("@");
if(_465>=0){
_461=host.substring(0,_465);
host=host.substring(_465+1);
var _466=_461.indexOf(":");
if(_466>=0){
_462=_461.substring(0,_466);
_463=_461.substring(_466+1);
}
}
var _467=host.indexOf(":");
if(_467>=0){
_460=host.substring(_467+1);
host=host.substring(0,_467);
}
}else{
throw new ArgumentError("Hostname is required.");
}
var _468=host.split(/\./);
_468.reverse();
for(var k=0;k<_468.length;k++){
_45a.push(new _40c(_468[k],_3c5.HOST));
}
if(_460!=null){
_45a.push(new _40c(_460,_3c5.PORT));
}else{
if(getDefaultPort(_45d)>0){
_45a.push(new _40c(getDefaultPort(_45d).toString(),_3c5.PORT));
}
}
if(_461!=null){
if(_462!=null){
_45a.push(new _40c(_462,_3c5.USERINFO));
}
if(_463!=null){
_45a.push(new _40c(_463,_3c5.USERINFO));
}
if(_462==null&&_463==null){
_45a.push(new _40c(_461,_3c5.USERINFO));
}
}
if(isNotBlank(path)){
if(path.charAt(0)=="/"){
path=path.substring(1);
}
if(isNotBlank(path)){
var _46a=path.split("/");
for(var p=0;p<_46a.length;p++){
var _46c=_46a[p];
_45a.push(new _40c(_46c,_3c5.PATH));
}
}
}
return _45a;
};
function getDefaultPort(_46d){
if(defaultPortsByScheme[_46d.toLowerCase()]!=null){
return defaultPortsByScheme[_46d];
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
var _46f=_439.prototype;
_46f.clear=function(){
this.rootNode=new Node();
};
_46f.canHandle=function(_470){
return lookupByRequest(this.rootNode,_470)!=null;
};
_46f.handle=function(_471,_472){
var _473=lookupByRequest(this.rootNode,_471);
if(_473==null){
return null;
}
return _473.handle(_471,_472);
};
_46f.register=function(_474,_475){
if(_474==null||_474.length==0){
throw new Error("Must specify a location to handle challenges upon.");
}
if(_475==null){
throw new Error("Must specify a handler to handle challenges.");
}
addChallengeHandlerAtLocation(this.rootNode,_474,_475);
return this;
};
_46f.unregister=function(_476,_477){
if(_476==null||_476.length==0){
throw new Error("Must specify a location to un-register challenge handlers upon.");
}
if(_477==null){
throw new Error("Must specify a handler to un-register.");
}
delChallengeHandlerAtLocation(this.rootNode,_476,_477);
return this;
};
return _439;
})();
window.NegotiableChallengeHandler=(function(){
var _478=function(){
this.candidateChallengeHandlers=new Array();
};
var _479=function(_47a){
var oids=new Array();
for(var i=0;i<_47a.length;i++){
oids.push(Oid.create(_47a[i]).asArray());
}
var _47d=GssUtils.sizeOfSpnegoInitialContextTokenWithOids(null,oids);
var _47e=ByteBuffer.allocate(_47d);
_47e.skip(_47d);
GssUtils.encodeSpnegoInitialContextTokenWithOids(null,oids,_47e);
return ByteArrayUtils.arrayToByteArray(Base64Util.encodeBuffer(_47e));
};
var _47f=_478.prototype;
_47f.register=function(_480){
if(_480==null){
throw new Error("handler is null");
}
for(var i=0;i<this.candidateChallengeHandlers.length;i++){
if(_480===this.candidateChallengeHandlers[i]){
return this;
}
}
this.candidateChallengeHandlers.push(_480);
return this;
};
_47f.canHandle=function(_482){
return _482!=null&&_482.authenticationScheme=="Negotiate"&&_482.authenticationParameters==null;
};
_47f.handle=function(_483,_484){
if(_483==null){
throw Error(new ArgumentError("challengeRequest is null"));
}
var _485=new _3ce();
for(var i=0;i<this.candidateChallengeHandlers.length;i++){
var _487=this.candidateChallengeHandlers[i];
if(_487.canHandle(_483)){
try{
var _488=_487.getSupportedOids();
for(var j=0;j<_488.length;j++){
var oid=new Oid(_488[j]).asString();
if(!_485.containsKey(oid)){
_485.put(oid,_487);
}
}
}
catch(e){
}
}
}
if(_485.isEmpty()){
_484(null);
return;
}
};
return _478;
})();
window.NegotiableChallengeHandler=(function(){
var _48b=function(){
this.loginHandler=undefined;
};
_48b.prototype.getSupportedOids=function(){
return new Array();
};
return _48b;
})();
window.NegotiableChallengeHandler=(function(){
var _48c=function(){
this.loginHandler=undefined;
};
_48c.prototype.getSupportedOids=function(){
return new Array();
};
return _48c;
})();
var _48d={};
(function(){
var _48e={8364:128,129:129,8218:130,402:131,8222:132,8230:133,8224:134,8225:135,710:136,8240:137,352:138,8249:139,338:140,141:141,381:142,143:143,144:144,8216:145,8217:146,8220:147,8221:148,8226:149,8211:150,8212:151,732:152,8482:153,353:154,8250:155,339:156,157:157,382:158,376:159};
var _48f={128:8364,129:129,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,141:141,142:381,143:143,144:144,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,157:157,158:382,159:376};
_48d.toCharCode=function(n){
if(n<128||(n>159&&n<256)){
return n;
}else{
var _491=_48f[n];
if(typeof (_491)=="undefined"){
throw new Error("Windows1252.toCharCode could not find: "+n);
}
return _491;
}
};
_48d.fromCharCode=function(code){
if(code<256){
return code;
}else{
var _493=_48e[code];
if(typeof (_493)=="undefined"){
throw new Error("Windows1252.fromCharCode could not find: "+code);
}
return _493;
}
};
var _494=String.fromCharCode(127);
var NULL=String.fromCharCode(0);
var _496="\n";
var _497=function(s){
var a=[];
for(var i=0;i<s.length;i++){
var code=_48d.fromCharCode(s.charCodeAt(i));
if(code==127){
i++;
if(i==s.length){
a.hasRemainder=true;
break;
}
var _49c=_48d.fromCharCode(s.charCodeAt(i));
switch(_49c){
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
throw new Error("Escaping format error");
}
}else{
a.push(code);
}
}
return a;
};
var _49d=function(buf){
var a=[];
while(buf.remaining()){
var n=buf.getUnsigned();
var chr=String.fromCharCode(_48d.toCharCode(n));
switch(chr){
case _494:
a.push(_494);
a.push(_494);
break;
case NULL:
a.push(_494);
a.push("0");
break;
case _496:
a.push(_494);
a.push("n");
break;
default:
a.push(chr);
}
}
return a.join("");
};
_48d.toArray=function(s,_4a3){
if(_4a3){
return _497(s);
}else{
var a=[];
for(var i=0;i<s.length;i++){
a.push(_48d.fromCharCode(s.charCodeAt(i)));
}
return a;
}
};
_48d.toByteString=function(buf,_4a7){
if(_4a7){
return _49d(buf);
}else{
var a=[];
while(buf.remaining()){
var n=buf.getUnsigned();
a.push(String.fromCharCode(_48d.toCharCode(n)));
}
return a.join("");
}
};
})();
function CloseEvent(_4aa,_4ab,_4ac,_4ad){
this.reason=_4ad;
this.code=_4ac;
this.wasClean=_4ab;
this.type="close";
this.bubbles=true;
this.cancelable=true;
this.target=_4aa;
};
function MessageEvent(_4ae,_4af,_4b0){
return {target:_4ae,data:_4af,origin:_4b0,bubbles:true,cancelable:true,type:"message",lastEventId:""};
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
var _4b2=function(_4b3,_4b4){
var _4b5=_4b4||{};
if(window.WebKitBlobBuilder){
var _4b6=new window.WebKitBlobBuilder();
for(var i=0;i<_4b3.length;i++){
var part=_4b3[i];
if(_4b5.endings){
_4b6.append(part,_4b5.endings);
}else{
_4b6.append(part);
}
}
var blob;
if(_4b5.type){
blob=_4b6.getBlob(type);
}else{
blob=_4b6.getBlob();
}
blob.slice=blob.webkitSlice||blob.slice;
return blob;
}else{
if(window.MozBlobBuilder){
var _4b6=new window.MozBlobBuilder();
for(var i=0;i<_4b3.length;i++){
var part=_4b3[i];
if(_4b5.endings){
_4b6.append(part,_4b5.endings);
}else{
_4b6.append(part);
}
}
var blob;
if(_4b5.type){
blob=_4b6.getBlob(type);
}else{
blob=_4b6.getBlob();
}
blob.slice=blob.mozSlice||blob.slice;
return blob;
}else{
var _4ba=[];
for(var i=0;i<_4b3.length;i++){
var part=_4b3[i];
if(typeof part==="string"){
var b=BlobUtils.fromString(part,_4b5.endings);
_4ba.push(b);
}else{
if(part.byteLength){
var _4bc=new Uint8Array(part);
for(var i=0;i<part.byteLength;i++){
_4ba.push(_4bc[i]);
}
}else{
if(part.length){
_4ba.push(part);
}else{
if(part._array){
_4ba.push(part._array);
}else{
throw new Error("invalid type in Blob constructor");
}
}
}
}
}
var blob=concatMemoryBlobs(_4ba);
blob.type=_4b5.type;
return blob;
}
}
};
function MemoryBlob(_4bd,_4be){
return {_array:_4bd,size:_4bd.length,type:_4be||"",slice:function(_4bf,end,_4c1){
var a=this._array.slice(_4bf,end);
return MemoryBlob(a,_4c1);
},toString:function(){
return "MemoryBlob: "+_4bd.toString();
}};
};
function concatMemoryBlobs(_4c3){
var a=Array.prototype.concat.apply([],_4c3);
return new MemoryBlob(a);
};
window.Blob=_4b2;
})();
(function(_4c5){
_4c5.BlobUtils={};
BlobUtils.asString=function asString(blob,_4c7,end){
if(blob._array){
}else{
if(FileReader){
var _4c9=new FileReader();
_4c9.readAsText(blob);
_4c9.onload=function(){
cb(_4c9.result);
};
_4c9.onerror=function(e){
console.log(e,_4c9);
};
}
}
};
BlobUtils.asNumberArray=(function(){
var _4cb=[];
var _4cc=function(){
if(_4cb.length>0){
try{
var _4cd=_4cb.shift();
_4cd.cb(_4cd.blob._array);
}
finally{
if(_4cb.length>0){
setTimeout(function(){
_4cc();
},0);
}
}
}
};
var _4ce=function(cb,blob){
if(blob._array){
_4cb.push({cb:cb,blob:blob});
if(_4cb.length==1){
setTimeout(function(){
_4cc();
},0);
}
}else{
if(FileReader){
var _4d1=new FileReader();
_4d1.readAsArrayBuffer(blob);
_4d1.onload=function(){
var _4d2=new DataView(_4d1.result);
var a=[];
for(var i=0;i<_4d1.result.byteLength;i++){
a.push(_4d2.getUint8(i));
}
cb(a);
};
}else{
throw new Error("Cannot convert Blob to binary string");
}
}
};
return _4ce;
})();
BlobUtils.asBinaryString=function asBinaryString(cb,blob){
if(blob._array){
var _4d7=blob._array;
var a=[];
for(var i=0;i<_4d7.length;i++){
a.push(String.fromCharCode(_4d7[i]));
}
setTimeout(function(){
cb(a.join(""));
},0);
}else{
if(FileReader){
var _4da=new FileReader();
if(_4da.readAsBinaryString){
_4da.readAsBinaryString(blob);
_4da.onload=function(){
cb(_4da.result);
};
}else{
_4da.readAsArrayBuffer(blob);
_4da.onload=function(){
var _4db=new DataView(_4da.result);
var a=[];
for(var i=0;i<_4da.result.byteLength;i++){
a.push(String.fromCharCode(_4db.getUint8(i)));
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
var _4df=[];
for(var i=0;i<s.length;i++){
_4df.push(s.charCodeAt(i));
}
return BlobUtils.fromNumberArray(_4df);
};
BlobUtils.fromNumberArray=function fromNumberArray(a){
if(typeof (Uint8Array)!=="undefined"){
return new Blob([new Uint8Array(a)]);
}else{
return new Blob([a]);
}
};
BlobUtils.fromString=function fromString(s,_4e3){
if(_4e3&&_4e3==="native"){
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
var _4e6=function(){
this._queue=[];
this._count=0;
this.completion;
};
_4e6.prototype.enqueue=function(cb){
var _4e8=this;
var _4e9={};
_4e9.cb=cb;
_4e9.id=this._count++;
this._queue.push(_4e9);
var func=function(){
_4e8.processQueue(_4e9.id,cb,arguments);
};
return func;
};
_4e6.prototype.processQueue=function(id,cb,args){
for(var i=0;i<this._queue.length;i++){
if(this._queue[i].id==id){
this._queue[i].args=args;
break;
}
}
while(this._queue.length&&this._queue[0].args!==undefined){
var _4ef=this._queue.shift();
_4ef.cb.apply(null,_4ef.args);
}
};
var _4f0=(function(){
var _4f1=function(_4f2,_4f3){
this.label=_4f2;
this.value=_4f3;
};
return _4f1;
})();
var _4f4=(function(){
var _4f5=function(_4f6){
var uri=new URI(_4f6);
if(isValidScheme(uri.scheme)){
this._uri=uri;
}else{
throw new Error("HttpURI - invalid scheme: "+_4f6);
}
};
function isValidScheme(_4f8){
return "http"==_4f8||"https"==_4f8;
};
var _4f9=_4f5.prototype;
_4f9.getURI=function(){
return this._uri;
};
_4f9.duplicate=function(uri){
try{
return new _4f5(uri);
}
catch(e){
throw e;
}
return null;
};
_4f9.isSecure=function(){
return ("https"==this._uri.scheme);
};
_4f9.toString=function(){
return this._uri.toString();
};
_4f5.replaceScheme=function(_4fb,_4fc){
var uri=URI.replaceProtocol(_4fb,_4fc);
return new _4f5(uri);
};
return _4f5;
})();
var _4fe=(function(){
var _4ff=function(_500){
var uri=new URI(_500);
if(isValidScheme(uri.scheme)){
this._uri=uri;
if(uri.port==undefined){
this._uri=new URI(_4ff.addDefaultPort(_500));
}
}else{
throw new Error("WSURI - invalid scheme: "+_500);
}
};
function isValidScheme(_502){
return "ws"==_502||"wss"==_502;
};
function duplicate(uri){
try{
return new _4ff(uri);
}
catch(e){
throw e;
}
return null;
};
var _504=_4ff.prototype;
_504.getAuthority=function(){
return this._uri.authority;
};
_504.isSecure=function(){
return "wss"==this._uri.scheme;
};
_504.getHttpEquivalentScheme=function(){
return this.isSecure()?"https":"http";
};
_504.toString=function(){
return this._uri.toString();
};
var _505=80;
var _506=443;
_4ff.setDefaultPort=function(uri){
if(uri.port==0){
if(uri.scheme=="ws"){
uri.port=_505;
}else{
if(uri.scheme=="wss"){
uri.port=_506;
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
_4ff.addDefaultPort=function(_508){
var uri=new URI(_508);
if(uri.port==undefined){
_4ff.setDefaultPort(uri);
}
return uri.toString();
};
_4ff.replaceScheme=function(_50a,_50b){
var uri=URI.replaceProtocol(_50a,_50b);
return new _4ff(uri);
};
return _4ff;
})();
var _50d=(function(){
var _50e={};
_50e["ws"]="ws";
_50e["wss"]="wss";
_50e["javascript:wse"]="ws";
_50e["javascript:wse+ssl"]="wss";
_50e["javascript:ws"]="ws";
_50e["javascript:wss"]="wss";
_50e["flash:wsr"]="ws";
_50e["flash:wsr+ssl"]="wss";
_50e["flash:wse"]="ws";
_50e["flash:wse+ssl"]="wss";
var _50f=function(_510){
var _511=getProtocol(_510);
if(isValidScheme(_511)){
this._uri=new URI(URI.replaceProtocol(_510,_50e[_511]));
this._compositeScheme=_511;
this._location=_510;
}else{
throw new SyntaxError("WSCompositeURI - invalid composite scheme: "+getProtocol(_510));
}
};
function getProtocol(_512){
var indx=_512.indexOf("://");
if(indx>0){
return _512.substr(0,indx);
}else{
return "";
}
};
function isValidScheme(_514){
return _50e[_514]!=null;
};
function duplicate(uri){
try{
return new _50f(uri);
}
catch(e){
throw e;
}
return null;
};
var _516=_50f.prototype;
_516.isSecure=function(){
var _517=this._uri.scheme;
return "wss"==_50e[_517];
};
_516.getWSEquivalent=function(){
try{
var _518=_50e[this._compositeScheme];
return _4fe.replaceScheme(this._location,_518);
}
catch(e){
throw e;
}
return null;
};
_516.getPlatformPrefix=function(){
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
_516.toString=function(){
return this._location;
};
return _50f;
})();
var _519=(function(){
var _51a=function(_51b,_51c,_51d){
if(arguments.length<3){
var s="ResumableTimer: Please specify the required parameters 'callback', 'delay', and 'updateDelayWhenPaused'.";
throw Error(s);
}
if((typeof (_51b)=="undefined")||(_51b==null)){
var s="ResumableTimer: Please specify required parameter 'callback'.";
throw Error(s);
}else{
if(typeof (_51b)!="function"){
var s="ResumableTimer: Required parameter 'callback' must be a function.";
throw Error(s);
}
}
if(typeof (_51c)=="undefined"){
var s="ResumableTimer: Please specify required parameter 'delay' of type integer.";
throw Error(s);
}else{
if((typeof (_51c)!="number")||(_51c<=0)){
var s="ResumableTimer: Required parameter 'delay' should be a positive integer.";
throw Error(s);
}
}
if(typeof (_51d)=="undefined"){
var s="ResumableTimer: Please specify required boolean parameter 'updateDelayWhenPaused'.";
throw Error(s);
}else{
if(typeof (_51d)!="boolean"){
var s="ResumableTimer: Required parameter 'updateDelayWhenPaused' is a boolean.";
throw Error(s);
}
}
this._delay=_51c;
this._updateDelayWhenPaused=_51d;
this._callback=_51b;
this._timeoutId=-1;
this._startTime=-1;
};
var _51f=_51a.prototype;
_51f.cancel=function(){
if(this._timeoutId!=-1){
window.clearTimeout(this._timeoutId);
this._timeoutId=-1;
}
this._delay=-1;
this._callback=null;
};
_51f.pause=function(){
if(this._timeoutId==-1){
return;
}
window.clearTimeout(this._timeoutId);
var _520=new Date().getTime();
var _521=_520-this._startTime;
this._timeoutId=-1;
if(this._updateDelayWhenPaused){
this._delay=this._delay-_521;
}
};
_51f.resume=function(){
if(this._timeoutId!=-1){
return;
}
if(this._callback==null){
var s="Timer cannot be resumed as it has been canceled.";
throw new Error(s);
}
this.start();
};
_51f.start=function(){
if(this._delay<0){
var s="Timer delay cannot be negative";
}
this._timeoutId=window.setTimeout(this._callback,this._delay);
this._startTime=new Date().getTime();
};
return _51a;
})();
var _524=(function(){
var _525=function(){
this._parent=null;
this._challengeResponse=new ChallengeResponse(null,null);
};
_525.prototype.toString=function(){
return "[Channel]";
};
return _525;
})();
var _526=(function(){
var _527=function(_528,_529,_52a){
_524.apply(this,arguments);
this._location=_528;
this._protocol=_529;
this._extensions=[];
this._controlFrames={};
this._controlFramesBinary={};
this._escapeSequences={};
this._handshakePayload="";
this._isEscape=false;
this._bufferedAmount=0;
};
var _52b=_527.prototype=new _524();
_52b.getBufferedAmount=function(){
return this._bufferedAmount;
};
_52b.toString=function(){
return "[WebSocketChannel "+_location+" "+_protocol!=null?_protocol:"-"+"]";
};
return _527;
})();
var _52c=(function(){
var _52d=function(){
this._nextHandler;
this._listener;
};
var _52e=_52d.prototype;
_52e.processConnect=function(_52f,_530,_531){
this._nextHandler.processConnect(_52f,_530,_531);
};
_52e.processAuthorize=function(_532,_533){
this._nextHandler.processAuthorize(_532,_533);
};
_52e.processTextMessage=function(_534,text){
this._nextHandler.processTextMessage(_534,text);
};
_52e.processBinaryMessage=function(_536,_537){
this._nextHandler.processBinaryMessage(_536,_537);
};
_52e.processClose=function(_538,code,_53a){
this._nextHandler.processClose(_538,code,_53a);
};
_52e.setIdleTimeout=function(_53b,_53c){
this._nextHandler.setIdleTimeout(_53b,_53c);
};
_52e.setListener=function(_53d){
this._listener=_53d;
};
_52e.setNextHandler=function(_53e){
this._nextHandler=_53e;
};
return _52d;
})();
var _53f=function(_540){
this.connectionOpened=function(_541,_542){
_540._listener.connectionOpened(_541,_542);
};
this.textMessageReceived=function(_543,s){
_540._listener.textMessageReceived(_543,s);
};
this.binaryMessageReceived=function(_545,obj){
_540._listener.binaryMessageReceived(_545,obj);
};
this.connectionClosed=function(_547,_548,code,_54a){
_540._listener.connectionClosed(_547,_548,code,_54a);
};
this.connectionError=function(_54b,e){
_540._listener.connectionError(_54b,e);
};
this.connectionFailed=function(_54d){
_540._listener.connectionFailed(_54d);
};
this.authenticationRequested=function(_54e,_54f,_550){
_540._listener.authenticationRequested(_54e,_54f,_550);
};
this.redirected=function(_551,_552){
_540._listener.redirected(_551,_552);
};
this.onBufferedAmountChange=function(_553,n){
_540._listener.onBufferedAmountChange(_553,n);
};
};
var _555=(function(){
var _556=function(){
var _557="";
var _558="";
};
_556.KAAZING_EXTENDED_HANDSHAKE="x-kaazing-handshake";
_556.KAAZING_SEC_EXTENSION_REVALIDATE="x-kaazing-http-revalidate";
_556.HEADER_SEC_PROTOCOL="X-WebSocket-Protocol";
_556.HEADER_SEC_EXTENSIONS="X-WebSocket-Extensions";
_556.KAAZING_SEC_EXTENSION_IDLE_TIMEOUT="x-kaazing-idle-timeout";
_556.KAAZING_SEC_EXTENSION_PING_PONG="x-kaazing-ping-pong";
return _556;
})();
var _559=(function(){
var _55a=function(_55b,_55c){
_526.apply(this,arguments);
this.requestHeaders=[];
this.responseHeaders={};
this.readyState=WebSocket.CONNECTING;
this.authenticationReceived=false;
this.wasCleanClose=false;
this.closeCode=1006;
this.closeReason="";
this.preventFallback=false;
};
return _55a;
})();
var _55d=(function(){
var _55e=function(){
};
var _55f=_55e.prototype;
_55f.createChannel=function(_560,_561,_562){
var _563=new _559(_560,_561,_562);
return _563;
};
return _55e;
})();
var _564=(function(){
var _565=function(){
};
var _566=_565.prototype;
_566.createChannel=function(_567,_568){
var _569=new _559(_567,_568);
return _569;
};
return _565;
})();
var _56a=(function(){
var _56b=function(_56c,_56d){
this._location=_56c.getWSEquivalent();
this._protocol=_56d;
this._webSocket;
this._compositeScheme=_56c._compositeScheme;
this._connectionStrategies=[];
this._selectedChannel;
this.readyState=0;
this._closing=false;
this._negotiatedExtensions={};
this._compositeScheme=_56c._compositeScheme;
};
var _56e=_56b.prototype=new _526();
_56e.getReadyState=function(){
return this.readyState;
};
_56e.getWebSocket=function(){
return this._webSocket;
};
_56e.getCompositeScheme=function(){
return this._compositeScheme;
};
_56e.getNextStrategy=function(){
if(this._connectionStrategies.length<=0){
return null;
}else{
return this._connectionStrategies.shift();
}
};
_56e.getRedirectPolicy=function(){
return this.getWebSocket().getRedirectPolicy();
};
return _56b;
})();
var _56f=(function(){
var _570=function(){
};
var _571=function(_572,_573){
var _574=0;
for(var i=_573;i<_573+4;i++){
_574=(_574<<8)+_572.getAt(i);
}
return _574;
};
var _576=function(_577){
if(_577.byteLength>3){
var _578=new DataView(_577);
return _578.getInt32(0);
}
return 0;
};
var _579=function(_57a){
var _57b=0;
for(var i=0;i<4;i++){
_57b=(_57b<<8)+_57a.charCodeAt(i);
}
return _57b;
};
var ping=[9,0];
var pong=[10,0];
var _57f={};
var _580=function(_581){
if(typeof _57f.escape==="undefined"){
var _582=[];
var i=4;
do{
_582[--i]=_581&(255);
_581=_581>>8;
}while(i);
_57f.escape=String.fromCharCode.apply(null,_582.concat(pong));
}
return _57f.escape;
};
var _584=function(_585,_586,_587,_588){
if(_555.KAAZING_SEC_EXTENSION_REVALIDATE==_586._controlFrames[_588]){
var url=_587.substr(5);
if(_586._redirectUri!=null){
if(typeof (_586._redirectUri)=="string"){
var _58a=new URI(_586._redirectUri);
url=_58a.scheme+"://"+_58a.authority+url;
}else{
url=_586._redirectUri.getHttpEquivalentScheme()+"://"+_586._redirectUri.getAuthority()+url;
}
}else{
url=_586._location.getHttpEquivalentScheme()+"://"+_586._location.getAuthority()+url;
}
_585._listener.authenticationRequested(_586,url,_555.KAAZING_SEC_EXTENSION_REVALIDATE);
}else{
if(_555.KAAZING_SEC_EXTENSION_PING_PONG==_586._controlFrames[_588]){
if(_587.charCodeAt(4)==ping[0]){
var pong=_580(_588);
_585._nextHandler.processTextMessage(_586,pong);
}
}
}
};
var _58c=_570.prototype=new _52c();
_58c.handleConnectionOpened=function(_58d,_58e){
var _58f=_58d.responseHeaders;
if(_58f[_555.HEADER_SEC_EXTENSIONS]!=null){
var _590=_58f[_555.HEADER_SEC_EXTENSIONS];
if(_590!=null&&_590.length>0){
var _591=_590.split(",");
for(var j=0;j<_591.length;j++){
var tmp=_591[j].split(";");
var ext=tmp[0].replace(/^\s+|\s+$/g,"");
var _595=new WebSocketExtension(ext);
_595.enabled=true;
_595.negotiated=true;
if(tmp.length>1){
var _596=tmp[1].replace(/^\s+|\s+$/g,"");
if(_596.length==8){
try{
var _597=parseInt(_596,16);
_58d._controlFrames[_597]=ext;
if(_555.KAAZING_SEC_EXTENSION_REVALIDATE===ext){
_58d._controlFramesBinary[_597]=ext;
}
_595.escape=_596;
}
catch(e){
}
}
}
_58d.parent._negotiatedExtensions[ext]=_595;
}
}
}
this._listener.connectionOpened(_58d,_58e);
};
_58c.handleTextMessageReceived=function(_598,_599){
if(_598._isEscape){
_598._isEscape=false;
this._listener.textMessageReceived(_598,_599);
return;
}
if(_599==null||_599.length<4){
this._listener.textMessageReceived(_598,_599);
return;
}
var _59a=_579(_599);
if(_598._controlFrames[_59a]!=null){
if(_599.length==4){
_598._isEscape=true;
return;
}else{
_584(this,_598,_599,_59a);
}
}else{
this._listener.textMessageReceived(_598,_599);
}
};
_58c.handleMessageReceived=function(_59b,_59c){
if(_59b._isEscape){
_59b._isEscape=false;
this._listener.binaryMessageReceived(_59b,_59c);
return;
}
if(typeof (_59c.byteLength)!="undefined"){
var _59d=_576(_59c);
if(_59b._controlFramesBinary[_59d]!=null){
if(_59c.byteLength==4){
_59b._isEscape=true;
return;
}else{
_584(this,_59b,String.fromCharCode.apply(null,new Uint8Array(_59c,0)),_59d);
}
}else{
this._listener.binaryMessageReceived(_59b,_59c);
}
}else{
if(_59c.constructor==ByteBuffer){
if(_59c==null||_59c.limit<4){
this._listener.binaryMessageReceived(_59b,_59c);
return;
}
var _59d=_571(_59c,_59c.position);
if(_59b._controlFramesBinary[_59d]!=null){
if(_59c.limit==4){
_59b._isEscape=true;
return;
}else{
_584(this,_59b,_59c.getString(Charset.UTF8),_59d);
}
}else{
this._listener.binaryMessageReceived(_59b,_59c);
}
}
}
};
_58c.processTextMessage=function(_59e,_59f){
if(_59f.length>=4){
var _5a0=_579(_59f);
if(_59e._escapeSequences[_5a0]!=null){
var _5a1=_59f.slice(0,4);
this._nextHandler.processTextMessage(_59e,_5a1);
}
}
this._nextHandler.processTextMessage(_59e,_59f);
};
_58c.setNextHandler=function(_5a2){
var _5a3=this;
this._nextHandler=_5a2;
var _5a4=new _53f(this);
_5a4.connectionOpened=function(_5a5,_5a6){
_5a3.handleConnectionOpened(_5a5,_5a6);
};
_5a4.textMessageReceived=function(_5a7,buf){
_5a3.handleTextMessageReceived(_5a7,buf);
};
_5a4.binaryMessageReceived=function(_5a9,buf){
_5a3.handleMessageReceived(_5a9,buf);
};
_5a2.setListener(_5a4);
};
_58c.setListener=function(_5ab){
this._listener=_5ab;
};
return _570;
})();
var _5ac=(function(){
var _5ad=function(_5ae){
this.channel=_5ae;
};
var _5af=function(_5b0){
var _5b1=_5b0.parent;
if(_5b1){
return (_5b1.readyState>=2);
}
return false;
};
var _5b2=_5ad.prototype;
_5b2.connect=function(_5b3){
if(_5af(this.channel)){
return;
}
var _5b4=this;
var _5b5=new XMLHttpRequest0();
_5b5.withCredentials=true;
_5b5.open("GET",_5b3+"&.krn="+Math.random(),true);
if(_5b4.channel._challengeResponse!=null&&_5b4.channel._challengeResponse.credentials!=null){
_5b5.setRequestHeader("Authorization",_5b4.channel._challengeResponse.credentials);
this.clearAuthenticationData(_5b4.channel);
}
_5b5.onreadystatechange=function(){
switch(_5b5.readyState){
case 2:
if(_5b5.status==403){
_5b5.abort();
}
break;
case 4:
if(_5b5.status==401){
_5b4.handle401(_5b4.channel,_5b3,_5b5.getResponseHeader("WWW-Authenticate"));
return;
}
break;
}
};
_5b5.send(null);
};
_5b2.clearAuthenticationData=function(_5b6){
if(_5b6._challengeResponse!=null){
_5b6._challengeResponse.clearCredentials();
}
};
_5b2.handle401=function(_5b7,_5b8,_5b9){
if(_5af(_5b7)){
return;
}
var _5ba=this;
var _5bb=_5b8;
if(_5bb.indexOf("/;a/")>0){
_5bb=_5bb.substring(0,_5bb.indexOf("/;a/"));
}else{
if(_5bb.indexOf("/;ae/")>0){
_5bb=_5bb.substring(0,_5bb.indexOf("/;ae/"));
}else{
if(_5bb.indexOf("/;ar/")>0){
_5bb=_5bb.substring(0,_5bb.indexOf("/;ar/"));
}
}
}
var _5bc=new ChallengeRequest(_5bb,_5b9);
var _5bd;
if(this.channel._challengeResponse.nextChallengeHandler!=null){
_5bd=this.channel._challengeResponse.nextChallengeHandler;
}else{
_5bd=_5b7.challengeHandler;
}
if(_5bd!=null&&_5bd.canHandle(_5bc)){
_5bd.handle(_5bc,function(_5be){
try{
if(_5be!=null&&_5be.credentials!=null){
_5ba.channel._challengeResponse=_5be;
_5ba.connect(_5b8);
}
}
catch(e){
}
});
}
};
return _5ad;
})();
var _5bf=(function(){
var _5c0=function(){
};
var _5c1=_5c0.prototype=new _52c();
_5c1.processConnect=function(_5c2,uri,_5c4){
if(_5c2.readyState==WebSocket.CLOSED){
throw new Error("WebSocket is already closed");
}
if(_5c2._delegate==null){
var _5c5=new _2db();
_5c5.parent=_5c2;
_5c2._delegate=_5c5;
_5c6(_5c5,this);
}
_5c2._delegate.connect(uri.toString(),_5c4);
};
_5c1.processTextMessage=function(_5c7,text){
if(_5c7._delegate.readyState()==WebSocket.OPEN){
_5c7._delegate.send(text);
}else{
throw new Error("WebSocket is already closed");
}
};
_5c1.processBinaryMessage=function(_5c9,obj){
if(_5c9._delegate.readyState()==WebSocket.OPEN){
_5c9._delegate.send(obj);
}else{
throw new Error("WebSocket is already closed");
}
};
_5c1.processClose=function(_5cb,code,_5cd){
try{
_5cb._delegate.close(code,_5cd);
}
catch(e){
}
};
_5c1.setIdleTimeout=function(_5ce,_5cf){
try{
_5ce._delegate.setIdleTimeout(_5cf);
}
catch(e){
}
};
var _5c6=function(_5d0,_5d1){
var _5d2=new _53f(_5d1);
_5d0.setListener(_5d2);
};
return _5c0;
})();
var _5d3=(function(){
var _5d4=function(){
};
var _5d5=function(_5d6,_5d7,_5d8){
_5d7._redirecting=true;
_5d7._redirectUri=_5d8;
_5d6._nextHandler.processClose(_5d7);
};
var _5d9=_5d4.prototype=new _52c();
_5d9.processConnect=function(_5da,uri,_5dc){
_5da._balanced=0;
this._nextHandler.processConnect(_5da,uri,_5dc);
};
_5d9.handleConnectionClosed=function(_5dd,_5de,code,_5e0){
if(_5dd._redirecting==true){
_5dd._redirecting=false;
var _5e1=_5dd._redirectUri;
var _5e2=_5dd._location;
var _5e3=_5dd.parent;
var _5e4=_5e3.getRedirectPolicy();
if(_5e4 instanceof HttpRedirectPolicy){
if(!_5e4.isRedirectionAllowed(_5e2.toString(),_5e1.toString())){
_5dd.preventFallback=true;
var s=_5e4.toString()+": Cannot redirect from "+_5e2.toString()+" to "+_5e1.toString();
this._listener.connectionClosed(_5dd,false,1006,s);
return;
}
}
_5dd._redirected=true;
_5dd.handshakePayload="";
var _5e6=[_555.KAAZING_EXTENDED_HANDSHAKE];
for(var i=0;i<_5dd._protocol.length;i++){
_5e6.push(_5dd._protocol[i]);
}
this.processConnect(_5dd,_5dd._redirectUri,_5e6);
}else{
this._listener.connectionClosed(_5dd,_5de,code,_5e0);
}
};
_5d9.handleMessageReceived=function(_5e8,obj){
if(_5e8._balanced>1){
this._listener.binaryMessageReceived(_5e8,obj);
return;
}
var _5ea=_2b5(obj);
if(_5ea.charCodeAt(0)==61695){
if(_5ea.match("N$")){
_5e8._balanced++;
if(_5e8._balanced==1){
this._listener.connectionOpened(_5e8,_555.KAAZING_EXTENDED_HANDSHAKE);
}else{
this._listener.connectionOpened(_5e8,_5e8._acceptedProtocol||"");
}
}else{
if(_5ea.indexOf("R")==1){
var _5eb=new _4fe(_5ea.substring(2));
_5d5(this,_5e8,_5eb);
}else{
}
}
return;
}else{
this._listener.binaryMessageReceived(_5e8,obj);
}
};
_5d9.setNextHandler=function(_5ec){
this._nextHandler=_5ec;
var _5ed=new _53f(this);
var _5ee=this;
_5ed.connectionOpened=function(_5ef,_5f0){
if(_555.KAAZING_EXTENDED_HANDSHAKE!=_5f0){
_5ef._balanced=2;
_5ee._listener.connectionOpened(_5ef,_5f0);
}
};
_5ed.textMessageReceived=function(_5f1,_5f2){
if(_5f1._balanced>1){
_5ee._listener.textMessageReceived(_5f1,_5f2);
return;
}
if(_5f2.charCodeAt(0)==61695){
if(_5f2.match("N$")){
_5f1._balanced++;
if(_5f1._balanced==1){
_5ee._listener.connectionOpened(_5f1,_555.KAAZING_EXTENDED_HANDSHAKE);
}else{
_5ee._listener.connectionOpened(_5f1,"");
}
}else{
if(_5f2.indexOf("R")==1){
var _5f3=new _4fe(_5f2.substring(2));
_5d5(_5ee,_5f1,_5f3);
}else{
}
}
return;
}else{
_5ee._listener.textMessageReceived(_5f1,_5f2);
}
};
_5ed.binaryMessageReceived=function(_5f4,obj){
_5ee.handleMessageReceived(_5f4,obj);
};
_5ed.connectionClosed=function(_5f6,_5f7,code,_5f9){
_5ee.handleConnectionClosed(_5f6,_5f7,code,_5f9);
};
_5ec.setListener(_5ed);
};
_5d9.setListener=function(_5fa){
this._listener=_5fa;
};
return _5d4;
})();
var _5fb=(function(){
var _5fc="Sec-WebSocket-Protocol";
var _5fd="Sec-WebSocket-Extensions";
var _5fe="Authorization";
var _5ff="WWW-Authenticate";
var _600="Set-Cookie";
var _601="GET";
var _602="HTTP/1.1";
var _603=":";
var _604=" ";
var _605="\r\n";
var _606=function(){
};
var _607=function(_608,_609){
var _60a=new XMLHttpRequest0();
var path=_608._location.getHttpEquivalentScheme()+"://"+_608._location.getAuthority()+(_608._location._uri.path||"");
path=path.replace(/[\/]?$/,"/;api/set-cookies");
_60a.open("POST",path,true);
_60a.setRequestHeader("Content-Type","text/plain; charset=utf-8");
_60a.send(_609);
};
var _60c=function(_60d,_60e,_60f){
var _610=[];
var _611=[];
_610.push("WebSocket-Protocol");
_611.push("");
_610.push(_5fc);
_611.push(_60e._protocol.join(","));
var _612=[_555.KAAZING_SEC_EXTENSION_IDLE_TIMEOUT,_555.KAAZING_SEC_EXTENSION_PING_PONG];
var ext=_60e._extensions;
if(ext.length>0){
_612.push(ext);
}
_610.push(_5fd);
_611.push(_612.join(","));
_610.push(_5fe);
_611.push(_60f);
var _614=_615(_60e._location,_610,_611);
_60d._nextHandler.processTextMessage(_60e,_614);
};
var _615=function(_616,_617,_618){
var _619=[];
_619.push(_601);
_619.push(_604);
var path=[];
if(_616._uri.path!=undefined){
path.push(_616._uri.path);
}
if(_616._uri.query!=undefined){
path.push("?");
path.push(_616._uri.query);
}
_619.push(path.join(""));
_619.push(_604);
_619.push(_602);
_619.push(_605);
for(var i=0;i<_617.length;i++){
var _61c=_617[i];
var _61d=_618[i];
if(_61c!=null&&_61d!=null){
_619.push(_61c);
_619.push(_603);
_619.push(_604);
_619.push(_61d);
_619.push(_605);
}
}
_619.push(_605);
var _61e=_619.join("");
return _61e;
};
var _61f=function(_620,_621,s){
if(s.length>0){
_621.handshakePayload+=s;
return;
}
var _623=_621.handshakePayload.split("\n");
_621.handshakePayload="";
var _624="";
for(var i=_623.length-1;i>=0;i--){
if(_623[i].indexOf("HTTP/1.1")==0){
var temp=_623[i].split(" ");
_624=temp[1];
break;
}
}
if("101"==_624){
var _627=[];
var _628="";
for(var i=0;i<_623.length;i++){
var line=_623[i];
if(line!=null&&line.indexOf(_5fd)==0){
_627.push(line.substring(_5fd.length+2));
}else{
if(line!=null&&line.indexOf(_5fc)==0){
_628=line.substring(_5fc.length+2);
}else{
if(line!=null&&line.indexOf(_600)==0){
_607(_621,line.substring(_600.length+2));
}
}
}
}
_621._acceptedProtocol=_628;
if(_627.length>0){
var _62a=[];
var _62b=_627.join(", ").split(", ");
for(var j=0;j<_62b.length;j++){
var tmp=_62b[j].split(";");
var ext=tmp[0].replace(/^\s+|\s+$/g,"");
var _62f=new WebSocketExtension(ext);
if(_555.KAAZING_SEC_EXTENSION_IDLE_TIMEOUT===ext){
var _630=tmp[1].match(/\d+/)[0];
if(_630>0){
_620._nextHandler.setIdleTimeout(_621,_630);
}
continue;
}else{
if(_555.KAAZING_SEC_EXTENSION_PING_PONG===ext){
try{
var _631=tmp[1].replace(/^\s+|\s+$/g,"");
var _632=parseInt(_631,16);
_621._controlFrames[_632]=ext;
_621._escapeSequences[_632]=ext;
continue;
}
catch(e){
throw new Error("failed to parse escape key for x-kaazing-ping-pong extension");
}
}else{
if(tmp.length>1){
var _631=tmp[1].replace(/^\s+|\s+$/g,"");
if(_631.length==8){
try{
var _632=parseInt(_631,16);
_621._controlFrames[_632]=ext;
if(_555.KAAZING_SEC_EXTENSION_REVALIDATE===ext){
_621._controlFramesBinary[_632]=ext;
}
_62f.escape=_631;
}
catch(e){
}
}
}
}
}
_62f.enabled=true;
_62f.negotiated=true;
_62a.push(_62b[j]);
}
if(_62a.length>0){
_621.parent._negotiatedExtensions[ext]=_62a.join(",");
}
}
return;
}else{
if("401"==_624){
_621.handshakestatus=2;
var _633="";
for(var i=0;i<_623.length;i++){
if(_623[i].indexOf(_5ff)==0){
_633=_623[i].substring(_5ff.length+2);
break;
}
}
_620._listener.authenticationRequested(_621,_621._location.toString(),_633);
}else{
_620._listener.connectionFailed(_621);
}
}
};
var _634=function(_635,_636){
try{
_636.handshakestatus=3;
_635._nextHandler.processClose(_636);
}
finally{
_635._listener.connectionFailed(_636);
}
};
var _637=_606.prototype=new _52c();
_637.processConnect=function(_638,uri,_63a){
_638.handshakePayload="";
var _63b=[_555.KAAZING_EXTENDED_HANDSHAKE];
for(var i=0;i<_63a.length;i++){
_63b.push(_63a[i]);
}
this._nextHandler.processConnect(_638,uri,_63b);
if((typeof (_638.parent.connectTimer)=="undefined")||(_638.parent.connectTimer==null)){
_638.handshakestatus=0;
var _63d=this;
setTimeout(function(){
if(_638.handshakestatus==0){
_634(_63d,_638);
}
},5000);
}
};
_637.processAuthorize=function(_63e,_63f){
_60c(this,_63e,_63f);
};
_637.handleConnectionOpened=function(_640,_641){
if(_555.KAAZING_EXTENDED_HANDSHAKE==_641){
_60c(this,_640,null);
_640.handshakestatus=1;
if((typeof (_640.parent.connectTimer)=="undefined")||(_640.parent.connectTimer==null)){
var _642=this;
setTimeout(function(){
if(_640.handshakestatus<2){
_634(_642,_640);
}
},5000);
}
}else{
_640.handshakestatus=2;
this._listener.connectionOpened(_640,_641);
}
};
_637.handleMessageReceived=function(_643,_644){
if(_643.readyState==WebSocket.OPEN){
_643._isEscape=false;
this._listener.textMessageReceived(_643,_644);
}else{
_61f(this,_643,_644);
}
};
_637.handleBinaryMessageReceived=function(_645,_646){
if(_645.readyState==WebSocket.OPEN){
_645._isEscape=false;
this._listener.binaryMessageReceived(_645,_646);
}else{
_61f(this,_645,String.fromCharCode.apply(null,new Uint8Array(_646)));
}
};
_637.setNextHandler=function(_647){
this._nextHandler=_647;
var _648=this;
var _649=new _53f(this);
_649.connectionOpened=function(_64a,_64b){
_648.handleConnectionOpened(_64a,_64b);
};
_649.textMessageReceived=function(_64c,buf){
_648.handleMessageReceived(_64c,buf);
};
_649.binaryMessageReceived=function(_64e,buf){
_648.handleBinaryMessageReceived(_64e,buf);
};
_649.connectionClosed=function(_650,_651,code,_653){
if(_650.handshakestatus<3){
_650.handshakestatus=3;
}
_648._listener.connectionClosed(_650,_651,code,_653);
};
_649.connectionFailed=function(_654){
if(_654.handshakestatus<3){
_654.handshakestatus=3;
}
_648._listener.connectionFailed(_654);
};
_647.setListener(_649);
};
_637.setListener=function(_655){
this._listener=_655;
};
return _606;
})();
var _656=(function(){
var _657=function(){
};
var _658=_657.prototype=new _52c();
_658.handleClearAuthenticationData=function(_659){
if(_659._challengeResponse!=null){
_659._challengeResponse.clearCredentials();
}
};
_658.handleRemoveAuthenticationData=function(_65a){
this.handleClearAuthenticationData(_65a);
_65a._challengeResponse=new ChallengeResponse(null,null);
};
_658.doError=function(_65b){
this._nextHandler.processClose(_65b);
this.handleClearAuthenticationData(_65b);
this._listener.connectionFailed(_65b);
};
_658.handle401=function(_65c,_65d,_65e){
var _65f=this;
var _660=_65c._location;
var _661=null;
if(typeof (_65c.parent.connectTimer)!="undefined"){
_661=_65c.parent.connectTimer;
if(_661!=null){
_661.pause();
}
}
if(_65c.redirectUri!=null){
_660=_65c._redirectUri;
}
if(_555.KAAZING_SEC_EXTENSION_REVALIDATE==_65e){
var ch=new _559(_660,_65c._protocol,_65c._isBinary);
ch.challengeHandler=_65c.parent.challengeHandler;
ch.parent=_65c.parent;
var _663=new _5ac(ch);
_663.connect(_65d);
}else{
var _664=new ChallengeRequest(_660.toString(),_65e);
var _665;
if(_65c._challengeResponse.nextChallengeHandler!=null){
_665=_65c._challengeResponse.nextChallengeHandler;
}else{
_665=_65c.parent.challengeHandler;
}
if(_665!=null&&_665.canHandle(_664)){
_665.handle(_664,function(_666){
try{
if(_666==null||_666.credentials==null){
_65f.doError(_65c);
}else{
if(_661!=null){
_661.resume();
}
_65c._challengeResponse=_666;
_65f._nextHandler.processAuthorize(_65c,_666.credentials);
}
}
catch(e){
_65f.doError(_65c);
}
});
}else{
this.doError(_65c);
}
}
};
_658.handleAuthenticate=function(_667,_668,_669){
_667.authenticationReceived=true;
this.handle401(_667,_668,_669);
};
_658.setNextHandler=function(_66a){
this._nextHandler=_66a;
var _66b=this;
var _66c=new _53f(this);
_66c.authenticationRequested=function(_66d,_66e,_66f){
_66b.handleAuthenticate(_66d,_66e,_66f);
};
_66a.setListener(_66c);
};
_658.setListener=function(_670){
this._listener=_670;
};
return _657;
})();
var _671=(function(){
var _672=function(){
};
var _673=_672.prototype=new _52c();
_673.processConnect=function(_674,uri,_676){
this._nextHandler.processConnect(_674,uri,_676);
};
_673.processBinaryMessage=function(_677,data){
if(data.constructor==ByteBuffer){
var _679=data.array.slice(data.position,data.limit);
this._nextHandler.processTextMessage(_677,Charset.UTF8.encodeByteArray(_679));
}else{
if(data.byteLength){
this._nextHandler.processTextMessage(_677,Charset.UTF8.encodeArrayBuffer(data));
}else{
if(data.size){
var _67a=this;
var cb=function(_67c){
_67a._nextHandler.processBinaryMessage(_677,Charset.UTF8.encodeByteArray(_67c));
};
BlobUtils.asNumberArray(cb,data);
}else{
throw new Error("Invalid type for send");
}
}
}
};
_673.setNextHandler=function(_67d){
this._nextHandler=_67d;
var _67e=this;
var _67f=new _53f(this);
_67f.textMessageReceived=function(_680,text){
_67e._listener.binaryMessageReceived(_680,ByteBuffer.wrap(Charset.UTF8.toByteArray(text)));
};
_67f.binaryMessageReceived=function(_682,buf){
throw new Error("draft76 won't receive binary frame");
};
_67d.setListener(_67f);
};
_673.setListener=function(_684){
this._listener=_684;
};
return _672;
})();
var _685=(function(){
var _686=function(){
var _687=new _656();
return _687;
};
var _688=function(){
var _689=new _5fb();
return _689;
};
var _68a=function(){
var _68b=new _56f();
return _68b;
};
var _68c=function(){
var _68d=new _5d3();
return _68d;
};
var _68e=function(){
var _68f=new _5bf();
return _68f;
};
var _690=function(){
var _691=new _671();
return _691;
};
var _692=(browser=="safari"&&typeof (WebSocket.CLOSING)=="undefined");
var _693=_686();
var _694=_688();
var _695=_68a();
var _696=_68c();
var _697=_68e();
var _698=_690();
var _699=function(){
if(_692){
this.setNextHandler(_698);
_698.setNextHandler(_693);
}else{
this.setNextHandler(_693);
}
_693.setNextHandler(_694);
_694.setNextHandler(_695);
_695.setNextHandler(_696);
_696.setNextHandler(_697);
};
var _69a=function(_69b,_69c){
};
var _69d=_699.prototype=new _52c();
_69d.setNextHandler=function(_69e){
this._nextHandler=_69e;
var _69f=new _53f(this);
_69e.setListener(_69f);
};
_69d.setListener=function(_6a0){
this._listener=_6a0;
};
return _699;
})();
var _6a1=(function(){
var _6a2=512*1024;
var _6a3=1;
var _6a4=function(_6a5,_6a6){
this.sequence=_6a6;
this.retry=3000;
if(_6a5.indexOf("/;e/dtem/")>0){
this.requiresEscaping=true;
}
var _6a7=new URI(_6a5);
var _6a8={"http":80,"https":443};
if(_6a7.port==undefined){
_6a7.port=_6a8[_6a7.scheme];
_6a7.authority=_6a7.host+":"+_6a7.port;
}
this.origin=_6a7.scheme+"://"+_6a7.authority;
this.location=_6a5;
this.activeXhr=null;
this.reconnectTimer=null;
this.idleTimer=null;
this.idleTimeout=null;
this.lastMessageTimestamp=null;
this.buf=new ByteBuffer();
var _6a9=this;
setTimeout(function(){
connect(_6a9,true);
_6a9.activeXhr=_6a9.mostRecentXhr;
startProxyDetectionTimer(_6a9,_6a9.mostRecentXhr);
},0);
};
var _6aa=_6a4.prototype;
var _6ab=0;
var _6ac=255;
var _6ad=1;
var _6ae=128;
var _6af=129;
var _6b0=127;
var _6b1=137;
var _6b2=3000;
_6aa.readyState=0;
function connect(_6b3,_6b4){
if(_6b3.reconnectTimer!==null){
_6b3.reconnectTimer=null;
}
stopIdleTimer(_6b3);
var _6b5=new URI(_6b3.location);
var _6b6=[];
var _6b7=_6b3.sequence++;
_6b6.push(".ksn="+_6b7);
switch(browser){
case "ie":
_6b6.push(".kns=1");
_6b6.push(".kf=200&.kp=2048");
break;
case "safari":
_6b6.push(".kp=256");
break;
case "firefox":
_6b6.push(".kp=1025");
break;
case "android":
_6b6.push(".kp=4096");
_6b6.push(".kbp=4096");
break;
}
if(browser=="android"||browser.ios){
_6b6.push(".kkt=20");
}
_6b6.push(".kc=text/plain;charset=windows-1252");
_6b6.push(".kb=4096");
_6b6.push(".kid="+String(Math.random()).substring(2));
if(_6b6.length>0){
if(_6b5.query===undefined){
_6b5.query=_6b6.join("&");
}else{
_6b5.query+="&"+_6b6.join("&");
}
}
var xhr=new XMLHttpRequest0();
xhr.id=_6a3++;
xhr.position=0;
xhr.opened=false;
xhr.reconnect=false;
xhr.requestClosing=false;
xhr.onreadystatechange=function(){
if(xhr.readyState==3){
if(_6b3.idleTimer==null){
var _6b9=xhr.getResponseHeader("X-Idle-Timeout");
if(_6b9){
if(!_6b9.match(/^[\d]+$/)){
doError(_6b3);
throw "Invalid response of header X-Idle-Timeout";
}
var _6ba=parseInt(_6b9);
if(_6ba>0){
_6ba=_6ba*1000;
_6b3.idleTimeout=_6ba;
_6b3.lastMessageTimestamp=new Date().getTime();
startIdleTimer(_6b3,_6ba);
}
}
}
}
};
xhr.onprogress=function(){
if(xhr==_6b3.activeXhr&&_6b3.readyState!=2){
_process(_6b3);
}
};
xhr.onload=function(){
if(xhr==_6b3.activeXhr&&_6b3.readyState!=2){
_process(_6b3);
xhr.onerror=function(){
};
xhr.ontimeout=function(){
};
xhr.onreadystatechange=function(){
};
if(!xhr.reconnect){
doError(_6b3);
}else{
if(xhr.requestClosing){
doClose(_6b3);
}else{
if(_6b3.activeXhr==_6b3.mostRecentXhr){
connect(_6b3);
_6b3.activeXhr=_6b3.mostRecentXhr;
startProxyDetectionTimer(_6b3,_6b3.activeXhr);
}else{
var _6bb=_6b3.mostRecentXhr;
_6b3.activeXhr=_6bb;
switch(_6bb.readyState){
case 1:
case 2:
startProxyDetectionTimer(_6b3,_6bb);
break;
case 3:
_process(_6b3);
break;
case 4:
_6b3.activeXhr.onload();
break;
default:
}
}
}
}
}
};
xhr.ontimeout=function(){
doError(_6b3);
};
xhr.onerror=function(){
doError(_6b3);
};
xhr.open("GET",_6b5.toString(),true);
xhr.send("");
_6b3.mostRecentXhr=xhr;
};
function startProxyDetectionTimer(_6bc,xhr){
if(_6bc.location.indexOf(".ki=p")==-1){
setTimeout(function(){
if(xhr&&xhr.readyState<3&&_6bc.readyState<2){
if(_6bc.location.indexOf("?")==-1){
_6bc.location+="?.ki=p";
}else{
_6bc.location+="&.ki=p";
}
connect(_6bc,false);
}
},_6b2);
}
};
_6aa.disconnect=function(){
if(this.readyState!==2){
_disconnect(this);
}
};
function _disconnect(_6be){
if(_6be.reconnectTimer!==null){
clearTimeout(_6be.reconnectTimer);
_6be.reconnectTimer=null;
}
stopIdleTimer(_6be);
if(_6be.mostRecentXhr!==null){
_6be.mostRecentXhr.onprogress=function(){
};
_6be.mostRecentXhr.onload=function(){
};
_6be.mostRecentXhr.onerror=function(){
};
_6be.mostRecentXhr.abort();
}
if(_6be.activeXhr!=_6be.mostRecentXhr&&_6be.activeXhr!==null){
_6be.activeXhr.onprogress=function(){
};
_6be.activeXhr.onload=function(){
};
_6be.activeXhr.onerror=function(){
};
_6be.activeXhr.abort();
}
_6be.lineQueue=[];
_6be.lastEventId=null;
_6be.location=null;
_6be.readyState=2;
};
function _process(_6bf){
_6bf.lastMessageTimestamp=new Date().getTime();
var xhr=_6bf.activeXhr;
var _6c1=xhr.responseText;
if(_6c1.length>=_6a2){
if(_6bf.activeXhr==_6bf.mostRecentXhr){
connect(_6bf,false);
}
}
var _6c2=_6c1.slice(xhr.position);
xhr.position=_6c1.length;
var buf=_6bf.buf;
var _6c4=_48d.toArray(_6c2,_6bf.requiresEscaping);
if(_6c4.hasRemainder){
xhr.position--;
}
buf.position=buf.limit;
buf.putBytes(_6c4);
buf.position=0;
buf.mark();
parse:
while(true){
if(!buf.hasRemaining()){
break;
}
var type=buf.getUnsigned();
switch(type&128){
case _6ab:
var _6c6=buf.indexOf(_6ac);
if(_6c6==-1){
break parse;
}
var _6c7=buf.array.slice(buf.position,_6c6);
var data=new ByteBuffer(_6c7);
var _6c9=_6c6-buf.position;
buf.skip(_6c9+1);
buf.mark();
if(type==_6ad){
handleCommandFrame(_6bf,data);
}else{
dispatchText(_6bf,data.getString(Charset.UTF8));
}
break;
case _6ae:
case _6af:
var _6ca=0;
var _6cb=false;
while(buf.hasRemaining()){
var b=buf.getUnsigned();
_6ca=_6ca<<7;
_6ca|=(b&127);
if((b&128)!=128){
_6cb=true;
break;
}
}
if(!_6cb){
break parse;
}
if(buf.remaining()<_6ca){
break parse;
}
var _6cd=buf.array.slice(buf.position,buf.position+_6ca);
var _6ce=new ByteBuffer(_6cd);
buf.skip(_6ca);
buf.mark();
if(type==_6ae){
dispatchBytes(_6bf,_6ce);
}else{
if(type==_6b1){
dispatchPingReceived(_6bf);
}else{
dispatchText(_6bf,_6ce.getString(Charset.UTF8));
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
function handleCommandFrame(_6cf,data){
while(data.remaining()){
var _6d1=String.fromCharCode(data.getUnsigned());
switch(_6d1){
case "0":
break;
case "1":
_6cf.activeXhr.reconnect=true;
break;
case "2":
_6cf.activeXhr.requestClosing=true;
break;
default:
throw new Error("Protocol decode error. Unknown command: "+_6d1);
}
}
};
function dispatchBytes(_6d2,buf){
var e=document.createEvent("Events");
e.initEvent("message",true,true);
e.lastEventId=_6d2.lastEventId;
e.data=buf;
e.decoder=_2ae;
e.origin=_6d2.origin;
if(e.source!==null){
e.source=null;
}
if(typeof (_6d2.onmessage)==="function"){
_6d2.onmessage(e);
}
};
function dispatchText(_6d5,data){
var e=document.createEvent("Events");
e.initEvent("message",true,true);
e.lastEventId=_6d5.lastEventId;
e.text=data;
e.origin=_6d5.origin;
if(e.source!==null){
e.source=null;
}
if(typeof (_6d5.onmessage)==="function"){
_6d5.onmessage(e);
}
};
function dispatchPingReceived(_6d8){
if(typeof (_6d8.onping)==="function"){
_6d8.onping();
}
};
function doClose(_6d9){
doError(_6d9);
};
function doError(_6da){
if(_6da.readyState!=2){
_6da.disconnect();
fireError(_6da);
}
};
function fireError(_6db){
var e=document.createEvent("Events");
e.initEvent("error",true,true);
if(typeof (_6db.onerror)==="function"){
_6db.onerror(e);
}
};
function startIdleTimer(_6dd,_6de){
stopIdleTimer(_6dd);
_6dd.idleTimer=setTimeout(function(){
idleTimerHandler(_6dd);
},_6de);
};
function idleTimerHandler(_6df){
var _6e0=new Date().getTime();
var _6e1=_6e0-_6df.lastMessageTimestamp;
var _6e2=_6df.idleTimeout;
if(_6e1>_6e2){
doError(_6df);
}else{
startIdleTimer(_6df,_6e2-_6e1);
}
};
function stopIdleTimer(_6e3){
if(_6e3.idleTimer!=null){
clearTimeout(_6e3.idleTimer);
_6e3.IdleTimer=null;
}
};
return _6a4;
})();
var _6e4=(function(){
var _6e5=function(){
this.parent;
this._listener;
this.closeCode=1005;
this.closeReason="";
this.sequence=0;
};
var _6e6=_6e5.prototype;
_6e6.connect=function(_6e7,_6e8){
this.URL=_6e7.replace("ws","http");
this.protocol=_6e8;
this._prepareQueue=new _4e6();
this._sendQueue=[];
_6e9(this);
};
_6e6.readyState=0;
_6e6.bufferedAmount=0;
_6e6.URL="";
_6e6.onopen=function(){
};
_6e6.onerror=function(){
};
_6e6.onmessage=function(_6ea){
};
_6e6.onclose=function(){
};
var _6eb=128;
var _6ec=129;
var _6ed=0;
var _6ee=255;
var _6ef=1;
var _6f0=138;
var _6f1=[_6ef,48,49,_6ee];
var _6f2=[_6ef,48,50,_6ee];
var _6f3=function(buf,_6f5){
var _6f6=0;
var _6f7=0;
do{
_6f7<<=8;
_6f7|=(_6f5&127);
_6f5>>=7;
_6f6++;
}while(_6f5>0);
do{
var _6f8=_6f7&255;
_6f7>>=8;
if(_6f6!=1){
_6f8|=128;
}
buf.put(_6f8);
}while(--_6f6>0);
};
_6e6.send=function(data){
var _6fa=this;
switch(this.readyState){
case 0:
throw new Error("INVALID_STATE_ERR");
case 1:
if(data===null){
throw new Error("data is null");
}
var buf=new ByteBuffer();
if(typeof data=="string"){
var _6fc=new ByteBuffer();
_6fc.putString(data,Charset.UTF8);
buf.put(_6ec);
_6f3(buf,_6fc.position);
buf.putBytes(_6fc.array);
}else{
if(data.constructor==ByteBuffer){
buf.put(_6eb);
_6f3(buf,data.remaining());
buf.putBuffer(data);
}else{
if(data.byteLength){
buf.put(_6eb);
_6f3(buf,data.byteLength);
buf.putByteArray(data);
}else{
if(data.size){
var cb=this._prepareQueue.enqueue(function(_6fe){
var b=new ByteBuffer();
b.put(_6eb);
_6f3(b,_6fe.length);
b.putBytes(_6fe);
b.flip();
doSend(_6fa,b);
});
BlobUtils.asNumberArray(cb,data);
return true;
}else{
throw new Error("Invalid type for send");
}
}
}
}
buf.flip();
this._prepareQueue.enqueue(function(_700){
doSend(_6fa,buf);
})();
return true;
case 2:
return false;
default:
throw new Error("INVALID_STATE_ERR");
}
};
_6e6.close=function(code,_702){
switch(this.readyState){
case 0:
_703(this);
break;
case 1:
if(code!=null&&code!=0){
this.closeCode=code;
this.closeReason=_702;
}
doSend(this,new ByteBuffer(_6f2));
break;
}
};
_6e6.setListener=function(_704){
this._listener=_704;
};
function openUpstream(_705){
if(_705.readyState!=1){
return;
}
var xdr=new XMLHttpRequest0();
xdr.onreadystatechange=function(){
if(xdr.readyState==4){
switch(xdr.status){
case 200:
setTimeout(function(){
doFlush(_705);
},0);
break;
}
}
};
xdr.onload=function(){
openUpstream(_705);
};
xdr.ontimeout=function(){
if(_705.upstreamXHR!=null){
_705.upstreamXHR.abort();
}
openUpstream(_705);
};
xdr.open("POST",_705._upstream+"&.krn="+Math.random(),true);
_705.upstreamXHR=xdr;
};
function doSend(_707,buf){
_707.bufferedAmount+=buf.remaining();
_707._sendQueue.push(buf);
_709(_707);
if(!_707._writeSuspended){
doFlush(_707);
}
};
function doFlush(_70a){
var _70b=_70a._sendQueue;
var _70c=_70b.length;
_70a._writeSuspended=(_70c>0);
if(_70c>0){
var _70d=_70a.sequence++;
if(_70a.useXDR){
if(_70a.upstreamXHR==null){
openUpstream(_70a);
}
var out=new ByteBuffer();
while(_70b.length){
out.putBuffer(_70b.shift());
}
out.putBytes(_6f1);
out.flip();
_70a.upstreamXHR.setRequestHeader("Content-Type","text/plain; charset=utf-8");
_70a.upstreamXHR.setRequestHeader("X-Sequence-No",_70d.toString());
_70a.upstreamXHR.send(_2c9(out,_70a.requiresEscaping));
}else{
var xhr=new XMLHttpRequest0();
xhr.open("POST",_70a._upstream+"&.krn="+Math.random(),true);
xhr.onreadystatechange=function(){
if(xhr.readyState==4){
switch(xhr.status){
case 200:
setTimeout(function(){
doFlush(_70a);
},0);
break;
default:
_703(_70a);
break;
}
}
};
var out=new ByteBuffer();
while(_70b.length){
out.putBuffer(_70b.shift());
}
out.putBytes(_6f1);
out.flip();
xhr.setRequestHeader("X-Sequence-No",_70d.toString());
if(browser=="firefox"){
if(xhr.sendAsBinary){
xhr.setRequestHeader("Content-Type","application/octet-stream");
xhr.sendAsBinary(_2c9(out));
}else{
xhr.send(_2c9(out));
}
}else{
xhr.setRequestHeader("Content-Type","text/plain; charset=utf-8");
xhr.send(_2c9(out,_70a.requiresEscaping));
}
}
}
_70a.bufferedAmount=0;
_709(_70a);
};
var _6e9=function(_710){
var url=new URI(_710.URL);
url.scheme=url.scheme.replace("ws","http");
if(browser=="ie"&&typeof (XDomainRequest)!=="undefined"&&location.protocol.replace(":","")==url.scheme){
_710.useXDR=true;
}
switch(browser){
case "opera":
_710.requiresEscaping=true;
break;
case "ie":
if(!_710.useXDR){
_710.requiresEscaping=true;
}else{
if((typeof (Object.defineProperties)==="undefined")&&(navigator.userAgent.indexOf("MSIE 8")>0)){
_710.requiresEscaping=true;
}else{
_710.requiresEscaping=false;
}
}
break;
default:
_710.requiresEscaping=false;
break;
}
var _712=_710.requiresEscaping?"/;e/ctem":"/;e/ctm";
url.path=url.path.replace(/[\/]?$/,_712);
var _713=url.toString();
var _714=_713.indexOf("?");
if(_714==-1){
_713+="?";
}else{
_713+="&";
}
_713+=".kn="+String(Math.random()).substring(2);
var _715=new XMLHttpRequest0();
var _716=false;
_715.withCredentials=true;
_715.open("GET",_713,true);
_715.setRequestHeader("Content-Type","text/plain; charset=utf-8");
_715.setRequestHeader("X-WebSocket-Version","wseb-1.0");
_715.setRequestHeader("X-Accept-Commands","ping");
var _717=_710.sequence++;
_715.setRequestHeader("X-Sequence-No",_717.toString());
if(_710.protocol.length){
var _718=_710.protocol.join(",");
_715.setRequestHeader("X-WebSocket-Protocol",_718);
}
for(var i=0;i<_710.parent.requestHeaders.length;i++){
var _71a=_710.parent.requestHeaders[i];
_715.setRequestHeader(_71a.label,_71a.value);
}
_715.onredirectallowed=function(_71b,_71c){
var _71d=_710.parent.parent;
var _71e=_71d.getRedirectPolicy();
if((typeof (_71e)!="undefined")&&(_71e!=null)){
if(!_71e.isRedirectionAllowed(_71b,_71c)){
_715.statusText=_71e.toString()+": Cannot redirect from "+_71b+" to "+_71c;
_710.closeCode=1006;
_710.closeReason=_715.statusText;
_710.parent.closeCode=_710.closeCode;
_710.parent.closeReason=_710.closeReason;
_710.parent.preventFallback=true;
doError(_710);
return false;
}
}
return true;
};
_715.onreadystatechange=function(){
switch(_715.readyState){
case 2:
if(_715.status==403){
doError(_710);
}else{
var _71f=_710.parent.parent._webSocket.connectTimeout;
if(_71f==0){
_71f=5000;
}
timer=setTimeout(function(){
if(!_716){
doError(_710);
}
},_71f);
}
break;
case 3:
break;
case 4:
_716=true;
if(_715.status==401){
_710._listener.authenticationRequested(_710.parent,_715.xhr._location,_715.getResponseHeader("WWW-Authenticate"));
return;
}
if(_710.readyState<1){
if(_715.status==201){
var _720=_715.responseText.split("\n");
var _721=_720[0];
var _722=_720[1];
var _723=new URI(_715.xhr._location);
var _724=new URI(_721);
var _725=new URI(_722);
if(_723.host.toLowerCase()!=_724.host.toLowerCase()){
throw new Error("Hostname in original URI does not match with the hostname in the upstream URI.");
}
if(_723.host.toLowerCase()!=_725.host.toLowerCase()){
throw new Error("Hostname in original URI does not match with the hostname in the downstream URI.");
}
_710._upstream=_723.scheme+"://"+_723.authority+_724.path;
_710._downstream=new _6a1(_722,_710.sequence);
var _726=_722.substring(0,_722.indexOf("/;e/"));
if(_726!=_710.parent._location.toString().replace("ws","http")){
_710.parent._redirectUri=_726;
}
_727(_710,_710._downstream);
_710.parent.responseHeaders[_555.HEADER_SEC_PROTOCOL]=_715.getResponseHeader(_555.HEADER_SEC_PROTOCOL);
_710.parent.responseHeaders[_555.HEADER_SEC_EXTENSIONS]=_715.getResponseHeader(_555.HEADER_SEC_EXTENSIONS);
_728(_710);
}else{
doError(_710);
}
}
break;
}
};
_715.send(null);
};
var _728=function(_729){
_729.readyState=1;
var _72a=_729.parent;
_72a._acceptedProtocol=_72a.responseHeaders["X-WebSocket-Protocol"]||"";
if(_729.useXDR){
this.upstreamXHR=null;
openUpstream(_729);
}
_729._listener.connectionOpened(_729.parent,_72a._acceptedProtocol);
};
function doError(_72b){
if(_72b.readyState<2){
_72b.readyState=2;
if(_72b.upstreamXHR!=null){
_72b.upstreamXHR.abort();
}
if(_72b.onerror!=null){
_72b._listener.connectionFailed(_72b.parent);
}
}
};
var _703=function(_72c,_72d,code,_72f){
switch(_72c.readyState){
case 2:
break;
case 0:
case 1:
_72c.readyState=WebSocket.CLOSED;
if(_72c.upstreamXHR!=null){
_72c.upstreamXHR.abort();
}
if(typeof _72d==="undefined"){
_72c._listener.connectionClosed(_72c.parent,true,1005,"");
}else{
_72c._listener.connectionClosed(_72c.parent,_72d,code,_72f);
}
break;
default:
}
};
var _709=function(_730){
};
var _731=function(_732,_733){
if(_733.text){
_732._listener.textMessageReceived(_732.parent,_733.text);
}else{
if(_733.data){
_732._listener.binaryMessageReceived(_732.parent,_733.data);
}
}
};
var _734=function(_735){
var _736=ByteBuffer.allocate(2);
_736.put(_6f0);
_736.put(0);
_736.flip();
doSend(_735,_736);
};
var _727=function(_737,_738){
_738.onmessage=function(_739){
switch(_739.type){
case "message":
if(_737.readyState==1){
_731(_737,_739);
}
break;
}
};
_738.onping=function(){
if(_737.readyState==1){
_734(_737);
}
};
_738.onerror=function(){
try{
_738.disconnect();
}
finally{
_703(_737,true,_737.closeCode,_737.closeReason);
}
};
_738.onclose=function(_73a){
try{
_738.disconnect();
}
finally{
_703(_737,true,this.closeCode,this.closeReason);
}
};
};
return _6e5;
})();
var _73b=(function(){
var _73c=function(){
};
var _73d=_73c.prototype=new _52c();
_73d.processConnect=function(_73e,uri,_740){
if(_73e.readyState==WebSocket.CLOSED){
throw new Error("WebSocket is already closed");
}
var _741=!!window.MockWseTransport?new MockWseTransport():new _6e4();
_741.parent=_73e;
_73e._delegate=_741;
_742(_741,this);
_741.connect(uri.toString(),_740);
};
_73d.processTextMessage=function(_743,text){
if(_743.readyState==WebSocket.OPEN){
_743._delegate.send(text);
}else{
throw new Error("WebSocket is already closed");
}
};
_73d.processBinaryMessage=function(_745,obj){
if(_745.readyState==WebSocket.OPEN){
_745._delegate.send(obj);
}else{
throw new Error("WebSocket is already closed");
}
};
_73d.processClose=function(_747,code,_749){
try{
_747._delegate.close(code,_749);
}
catch(e){
listener.connectionClosed(_747);
}
};
var _742=function(_74a,_74b){
var _74c=new _53f(_74b);
_74a.setListener(_74c);
};
return _73c;
})();
var _74d=(function(){
var _74e=function(){
};
var _74f=_74e.prototype=new _52c();
_74f.handleClearAuthenticationData=function(_750){
if(_750._challengeResponse!=null){
_750._challengeResponse.clearCredentials();
}
};
_74f.handleRemoveAuthenticationData=function(_751){
this.handleClearAuthenticationData(_751);
_751._challengeResponse=new ChallengeResponse(null,null);
};
_74f.handle401=function(_752,_753,_754){
var _755=this;
var _756=null;
if(typeof (_752.parent.connectTimer)!="undefined"){
_756=_752.parent.connectTimer;
if(_756!=null){
_756.pause();
}
}
if(_555.KAAZING_SEC_EXTENSION_REVALIDATE==_754){
var _757=new _5ac(_752);
_752.challengeHandler=_752.parent.challengeHandler;
_757.connect(_753);
}else{
var _758=_753;
if(_758.indexOf("/;e/")>0){
_758=_758.substring(0,_758.indexOf("/;e/"));
}
var _759=new _4fe(_758.replace("http","ws"));
var _75a=new ChallengeRequest(_758,_754);
var _75b;
if(_752._challengeResponse.nextChallengeHandler!=null){
_75b=_752._challengeResponse.nextChallengeHandler;
}else{
_75b=_752.parent.challengeHandler;
}
if(_75b!=null&&_75b.canHandle(_75a)){
_75b.handle(_75a,function(_75c){
try{
if(_75c==null||_75c.credentials==null){
_755.handleClearAuthenticationData(_752);
_755._listener.connectionFailed(_752);
}else{
if(_756!=null){
_756.resume();
}
_752._challengeResponse=_75c;
_755.processConnect(_752,_759,_752._protocol);
}
}
catch(e){
_755.handleClearAuthenticationData(_752);
_755._listener.connectionFailed(_752);
}
});
}else{
this.handleClearAuthenticationData(_752);
this._listener.connectionFailed(_752);
}
}
};
_74f.processConnect=function(_75d,_75e,_75f){
if(_75d._challengeResponse!=null&&_75d._challengeResponse.credentials!=null){
var _760=_75d._challengeResponse.credentials.toString();
for(var i=_75d.requestHeaders.length-1;i>=0;i--){
if(_75d.requestHeaders[i].label==="Authorization"){
_75d.requestHeaders.splice(i,1);
}
}
var _762=new _4f0("Authorization",_760);
for(var i=_75d.requestHeaders.length-1;i>=0;i--){
if(_75d.requestHeaders[i].label==="Authorization"){
_75d.requestHeaders.splice(i,1);
}
}
_75d.requestHeaders.push(_762);
this.handleClearAuthenticationData(_75d);
}
this._nextHandler.processConnect(_75d,_75e,_75f);
};
_74f.handleAuthenticate=function(_763,_764,_765){
_763.authenticationReceived=true;
this.handle401(_763,_764,_765);
};
_74f.setNextHandler=function(_766){
this._nextHandler=_766;
var _767=new _53f(this);
var _768=this;
_767.authenticationRequested=function(_769,_76a,_76b){
_768.handleAuthenticate(_769,_76a,_76b);
};
_766.setListener(_767);
};
_74f.setListener=function(_76c){
this._listener=_76c;
};
return _74e;
})();
var _76d=(function(){
var _76e=new _74d();
var _76f=new _56f();
var _770=new _73b();
var _771=function(){
this.setNextHandler(_76e);
_76e.setNextHandler(_76f);
_76f.setNextHandler(_770);
};
var _772=_771.prototype=new _52c();
_772.processConnect=function(_773,_774,_775){
var _776=[];
for(var i=0;i<_775.length;i++){
_776.push(_775[i]);
}
var _778=_773._extensions;
if(_778.length>0){
_773.requestHeaders.push(new _4f0(_555.HEADER_SEC_EXTENSIONS,_778.join(";")));
}
this._nextHandler.processConnect(_773,_774,_776);
};
_772.setNextHandler=function(_779){
this._nextHandler=_779;
var _77a=this;
var _77b=new _53f(this);
_77b.commandMessageReceived=function(_77c,_77d){
if(_77d=="CloseCommandMessage"&&_77c.readyState==1){
}
_77a._listener.commandMessageReceived(_77c,_77d);
};
_779.setListener(_77b);
};
_772.setListener=function(_77e){
this._listener=_77e;
};
return _771;
})();
var _77f=(function(){
var _780=function(){
};
var _781=_780.prototype=new _52c();
_781.processConnect=function(_782,uri,_784){
if(_782.readyState==2){
throw new Error("WebSocket is already closed");
}
var _785=new _30b();
_785.parent=_782;
_782._delegate=_785;
_786(_785,this);
_785.connect(uri.toString(),_784);
};
_781.processTextMessage=function(_787,text){
if(_787.readyState==1){
_787._delegate.send(text);
}else{
throw new Error("WebSocket is already closed");
}
};
_781.processBinaryMessage=function(_789,_78a){
if(_789.readyState==1){
_789._delegate.send(_78a);
}else{
throw new Error("WebSocket is already closed");
}
};
_781.processClose=function(_78b,code,_78d){
_78b._delegate.close(code,_78d);
};
var _786=function(_78e,_78f){
var _790=new _53f(_78f);
_78e.setListener(_790);
_790.redirected=function(_791,_792){
_791._redirectUri=_792;
};
};
return _780;
})();
var _793=(function(){
var _794=function(){
var _795=new _74d();
return _795;
};
var _796=function(){
var _797=new _56f();
return _797;
};
var _798=function(){
var _799=new _77f();
return _799;
};
var _79a=_794();
var _79b=_796();
var _79c=_798();
var _79d=function(){
this.setNextHandler(_79a);
_79a.setNextHandler(_79b);
_79b.setNextHandler(_79c);
};
var _79e=_79d.prototype=new _52c();
_79e.processConnect=function(_79f,_7a0,_7a1){
var _7a2=[_555.KAAZING_EXTENDED_HANDSHAKE];
for(var i=0;i<_7a1.length;i++){
_7a2.push(_7a1[i]);
}
var _7a4=_79f._extensions;
if(_7a4.length>0){
_79f.requestHeaders.push(new _4f0(_555.HEADER_SEC_EXTENSIONS,_7a4.join(";")));
}
this._nextHandler.processConnect(_79f,_7a0,_7a2);
};
_79e.setNextHandler=function(_7a5){
this._nextHandler=_7a5;
var _7a6=new _53f(this);
_7a5.setListener(_7a6);
};
_79e.setListener=function(_7a7){
this._listener=_7a7;
};
return _79d;
})();
var _7a8=(function(){
var _7a9;
var _7aa=function(){
_7a9=this;
};
var _7ab=_7aa.prototype=new _52c();
_7ab.processConnect=function(_7ac,uri,_7ae){
if(_7ac.readyState==2){
throw new Error("WebSocket is already closed");
}
var _7af=new _33b();
_7af.parent=_7ac;
_7ac._delegate=_7af;
_7b0(_7af,this);
_7af.connect(uri.toString(),_7ae);
};
_7ab.processTextMessage=function(_7b1,text){
if(_7b1.readyState==1){
_7b1._delegate.send(text);
}else{
throw new Error("WebSocket is already closed");
}
};
_7ab.processBinaryMessage=function(_7b3,_7b4){
if(_7b3.readyState==1){
_7b3._delegate.send(_7b4);
}else{
throw new Error("WebSocket is already closed");
}
};
_7ab.processClose=function(_7b5,code,_7b7){
_7b5._delegate.close(code,_7b7);
};
var _7b0=function(_7b8,_7b9){
var _7ba=new _53f(_7b9);
_7ba.redirected=function(_7bb,_7bc){
_7bb._redirectUri=_7bc;
};
_7b8.setListener(_7ba);
};
return _7aa;
})();
var _7bd=(function(){
var _7be=function(){
var _7bf=new _74d();
return _7bf;
};
var _7c0=function(){
var _7c1=new _56f();
return _7c1;
};
var _7c2=function(){
var _7c3=new _7a8();
return _7c3;
};
var _7c4=_7be();
var _7c5=_7c0();
var _7c6=_7c2();
var _7c7=function(){
this.setNextHandler(_7c4);
_7c4.setNextHandler(_7c5);
_7c5.setNextHandler(_7c6);
};
var _7c8=function(_7c9,_7ca){
};
var _7cb=_7c7.prototype=new _52c();
_7cb.setNextHandler=function(_7cc){
this._nextHandler=_7cc;
var _7cd=new _53f(this);
_7cc.setListener(_7cd);
};
_7cb.setListener=function(_7ce){
this._listener=_7ce;
};
return _7c7;
})();
var _7cf=(function(){
var _7d0=function(){
};
var _7d1=_7d0.prototype=new _52c();
_7d1.processConnect=function(_7d2,uri,_7d4){
if(_7d2.readyState==WebSocket.CLOSED){
throw new Error("WebSocket is already closed");
}
this._nextHandler.processConnect(_7d2,uri,_7d4);
};
_7d1.handleConnectionOpened=function(_7d5,_7d6){
var _7d7=_7d5;
if(_7d7.readyState==WebSocket.CONNECTING){
_7d7.readyState=WebSocket.OPEN;
this._listener.connectionOpened(_7d5,_7d6);
}
};
_7d1.handleMessageReceived=function(_7d8,_7d9){
if(_7d8.readyState!=WebSocket.OPEN){
return;
}
this._listener.textMessageReceived(_7d8,_7d9);
};
_7d1.handleBinaryMessageReceived=function(_7da,_7db){
if(_7da.readyState!=WebSocket.OPEN){
return;
}
this._listener.binaryMessageReceived(_7da,_7db);
};
_7d1.handleConnectionClosed=function(_7dc,_7dd,code,_7df){
var _7e0=_7dc;
if(_7e0.readyState!=WebSocket.CLOSED){
_7e0.readyState=WebSocket.CLOSED;
this._listener.connectionClosed(_7dc,_7dd,code,_7df);
}
};
_7d1.handleConnectionFailed=function(_7e1){
if(_7e1.readyState!=WebSocket.CLOSED){
_7e1.readyState=WebSocket.CLOSED;
this._listener.connectionFailed(_7e1);
}
};
_7d1.handleConnectionError=function(_7e2,e){
this._listener.connectionError(_7e2,e);
};
_7d1.setNextHandler=function(_7e4){
this._nextHandler=_7e4;
var _7e5={};
var _7e6=this;
_7e5.connectionOpened=function(_7e7,_7e8){
_7e6.handleConnectionOpened(_7e7,_7e8);
};
_7e5.redirected=function(_7e9,_7ea){
throw new Error("invalid event received");
};
_7e5.authenticationRequested=function(_7eb,_7ec,_7ed){
throw new Error("invalid event received");
};
_7e5.textMessageReceived=function(_7ee,buf){
_7e6.handleMessageReceived(_7ee,buf);
};
_7e5.binaryMessageReceived=function(_7f0,buf){
_7e6.handleBinaryMessageReceived(_7f0,buf);
};
_7e5.connectionClosed=function(_7f2,_7f3,code,_7f5){
_7e6.handleConnectionClosed(_7f2,_7f3,code,_7f5);
};
_7e5.connectionFailed=function(_7f6){
_7e6.handleConnectionFailed(_7f6);
};
_7e5.connectionError=function(_7f7,e){
_7e6.handleConnectionError(_7f7,e);
};
_7e4.setListener(_7e5);
};
_7d1.setListener=function(_7f9){
this._listener=_7f9;
};
return _7d0;
})();
var _7fa=(function(){
var _7fb=function(_7fc,_7fd,_7fe){
this._nativeEquivalent=_7fc;
this._handler=_7fd;
this._channelFactory=_7fe;
};
return _7fb;
})();
var _7ff=(function(){
var _800="javascript:ws";
var _801="javascript:wss";
var _802="javascript:wse";
var _803="javascript:wse+ssl";
var _804="flash:wse";
var _805="flash:wse+ssl";
var _806="flash:wsr";
var _807="flash:wsr+ssl";
var _808={};
var _809={};
var _80a=new _564();
var _80b=new _55d();
var _80c=true;
var _80d={};
if(Object.defineProperty){
try{
Object.defineProperty(_80d,"prop",{get:function(){
return true;
}});
_80c=false;
}
catch(e){
}
}
var _80e=function(){
this._handlerListener=createListener(this);
this._nativeHandler=createNativeHandler(this);
this._emulatedHandler=createEmulatedHandler(this);
this._emulatedFlashHandler=createFlashEmulatedHandler(this);
this._rtmpFlashHandler=createFlashRtmpHandler(this);
pickStrategies();
_808[_800]=new _7fa("ws",this._nativeHandler,_80a);
_808[_801]=new _7fa("wss",this._nativeHandler,_80a);
_808[_802]=new _7fa("ws",this._emulatedHandler,_80b);
_808[_803]=new _7fa("wss",this._emulatedHandler,_80b);
_808[_804]=new _7fa("ws",this._emulatedFlashHandler,_80b);
_808[_805]=new _7fa("wss",this._emulatedFlashHandler,_80b);
_808[_806]=new _7fa("ws",this._rtmpFlashHandler,_80b);
_808[_807]=new _7fa("wss",this._rtmpFlashHandler,_80b);
};
function isIE6orIE7(){
if(browser!="ie"){
return false;
}
var _80f=navigator.appVersion;
return (_80f.indexOf("MSIE 6.0")>=0||_80f.indexOf("MSIE 7.0")>=0);
};
function isXdrDisabledonIE8IE9(){
if(browser!="ie"){
return false;
}
var _810=navigator.appVersion;
return ((_810.indexOf("MSIE 8.0")>=0||_810.indexOf("MSIE 9.0")>=0)&&typeof (XDomainRequest)==="undefined");
};
function pickStrategies(){
if(isIE6orIE7()||isXdrDisabledonIE8IE9()){
_809["ws"]=new Array(_800,_804,_802);
_809["wss"]=new Array(_801,_805,_803);
}else{
_809["ws"]=new Array(_800,_802);
_809["wss"]=new Array(_801,_803);
}
};
function createListener(_811){
var _812={};
_812.connectionOpened=function(_813,_814){
_811.handleConnectionOpened(_813,_814);
};
_812.binaryMessageReceived=function(_815,buf){
_811.handleMessageReceived(_815,buf);
};
_812.textMessageReceived=function(_817,text){
var _819=_817.parent;
_819._webSocketChannelListener.handleMessage(_819._webSocket,text);
};
_812.connectionClosed=function(_81a,_81b,code,_81d){
_811.handleConnectionClosed(_81a,_81b,code,_81d);
};
_812.connectionFailed=function(_81e){
_811.handleConnectionFailed(_81e);
};
_812.connectionError=function(_81f,e){
_811.handleConnectionError(_81f,e);
};
_812.authenticationRequested=function(_821,_822,_823){
};
_812.redirected=function(_824,_825){
};
_812.onBufferedAmountChange=function(_826,n){
_811.handleBufferedAmountChange(_826,n);
};
return _812;
};
function createNativeHandler(_828){
var _829=new _7cf();
var _82a=new _685();
_829.setListener(_828._handlerListener);
_829.setNextHandler(_82a);
return _829;
};
function createEmulatedHandler(_82b){
var _82c=new _7cf();
var _82d=new _76d();
_82c.setListener(_82b._handlerListener);
_82c.setNextHandler(_82d);
return _82c;
};
function createFlashEmulatedHandler(_82e){
var _82f=new _7cf();
var _830=new _793();
_82f.setListener(_82e._handlerListener);
_82f.setNextHandler(_830);
return _82f;
};
function createFlashRtmpHandler(_831){
var _832=new _7cf();
var _833=new _7bd();
_832.setListener(_831._handlerListener);
_832.setNextHandler(_833);
return _832;
};
var _834=function(_835,_836){
var _837=_808[_836];
var _838=_837._channelFactory;
var _839=_835._location;
var _83a=_838.createChannel(_839,_835._protocol);
_835._selectedChannel=_83a;
_83a.parent=_835;
_83a._extensions=_835._extensions;
_83a._handler=_837._handler;
_83a._handler.processConnect(_835._selectedChannel,_839,_835._protocol);
};
var _83b=_80e.prototype;
_83b.fallbackNext=function(_83c){
var _83d=_83c.getNextStrategy();
if(_83d==null){
this.doClose(_83c,false,1006,"");
}else{
_834(_83c,_83d);
}
};
_83b.doOpen=function(_83e,_83f){
if(_83e._lastErrorEvent!==undefined){
delete _83e._lastErrorEvent;
}
if(_83e.readyState===WebSocket.CONNECTING){
_83e.readyState=WebSocket.OPEN;
if(_80c){
_83e._webSocket.readyState=WebSocket.OPEN;
}
_83e._webSocketChannelListener.handleOpen(_83e._webSocket,_83f);
}
};
_83b.doClose=function(_840,_841,code,_843){
if(_840._lastErrorEvent!==undefined){
_840._webSocketChannelListener.handleError(_840._webSocket,_840._lastErrorEvent);
delete _840._lastErrorEvent;
}
if(_840.readyState===WebSocket.CONNECTING||_840.readyState===WebSocket.OPEN||_840.readyState===WebSocket.CLOSING){
_840.readyState=WebSocket.CLOSED;
if(_80c){
_840._webSocket.readyState=WebSocket.CLOSED;
}
_840._webSocketChannelListener.handleClose(_840._webSocket,_841,code,_843);
}
};
_83b.doBufferedAmountChange=function(_844,n){
_844._webSocketChannelListener.handleBufferdAmountChange(_844._webSocket,n);
};
_83b.processConnect=function(_846,_847,_848){
var _849=_846;
if(_849.readyState===WebSocket.OPEN){
throw new Error("Attempt to reconnect an existing open WebSocket to a different location");
}
var _84a=_849._compositeScheme;
if(_84a!="ws"&&_84a!="wss"){
var _84b=_808[_84a];
if(_84b==null){
throw new Error("Invalid connection scheme: "+_84a);
}
_849._connectionStrategies.push(_84a);
}else{
var _84c=_809[_84a];
if(_84c!=null){
for(var i=0;i<_84c.length;i++){
_849._connectionStrategies.push(_84c[i]);
}
}else{
throw new Error("Invalid connection scheme: "+_84a);
}
}
this.fallbackNext(_849);
};
_83b.processTextMessage=function(_84e,_84f){
var _850=_84e;
if(_850.readyState!=WebSocket.OPEN){
throw new Error("Attempt to post message on unopened or closed web socket");
}
var _851=_850._selectedChannel;
_851._handler.processTextMessage(_851,_84f);
};
_83b.processBinaryMessage=function(_852,_853){
var _854=_852;
if(_854.readyState!=WebSocket.OPEN){
throw new Error("Attempt to post message on unopened or closed web socket");
}
var _855=_854._selectedChannel;
_855._handler.processBinaryMessage(_855,_853);
};
_83b.processClose=function(_856,code,_858){
var _859=_856;
if(_856.readyState===WebSocket.CONNECTING||_856.readyState===WebSocket.OPEN){
_856.readyState=WebSocket.CLOSING;
if(_80c){
_856._webSocket.readyState=WebSocket.CLOSING;
}
}
var _85a=_859._selectedChannel;
_85a._handler.processClose(_85a,code,_858);
};
_83b.setListener=function(_85b){
this._listener=_85b;
};
_83b.handleConnectionOpened=function(_85c,_85d){
var _85e=_85c.parent;
this.doOpen(_85e,_85d);
};
_83b.handleMessageReceived=function(_85f,obj){
var _861=_85f.parent;
switch(_861.readyState){
case WebSocket.OPEN:
if(_861._webSocket.binaryType==="blob"&&obj.constructor==ByteBuffer){
obj=obj.getBlob(obj.remaining());
}else{
if(_861._webSocket.binaryType==="arraybuffer"&&obj.constructor==ByteBuffer){
obj=obj.getArrayBuffer(obj.remaining());
}else{
if(_861._webSocket.binaryType==="blob"&&obj.byteLength){
obj=new Blob([new Uint8Array(obj)]);
}else{
if(_861._webSocket.binaryType==="bytebuffer"&&obj.byteLength){
var u=new Uint8Array(obj);
var _863=[];
for(var i=0;i<u.byteLength;i++){
_863.push(u[i]);
}
obj=new ByteBuffer(_863);
}else{
if(_861._webSocket.binaryType==="bytebuffer"&&obj.size){
var cb=function(_866){
var b=new ByteBuffer();
b.putBytes(_866);
b.flip();
_861._webSocketChannelListener.handleMessage(_861._webSocket,b);
};
BlobUtils.asNumberArray(cb,data);
return;
}
}
}
}
}
_861._webSocketChannelListener.handleMessage(_861._webSocket,obj);
break;
case WebSocket.CONNECTING:
case WebSocket.CLOSING:
case WebSocket.CLOSED:
break;
default:
throw new Error("Socket has invalid readyState: "+$this.readyState);
}
};
_83b.handleConnectionClosed=function(_868,_869,code,_86b){
var _86c=_868.parent;
if(_86c.readyState===WebSocket.CONNECTING&&!_868.authenticationReceived&&!_868.preventFallback){
this.fallbackNext(_86c);
}else{
this.doClose(_86c,_869,code,_86b);
}
};
_83b.handleConnectionFailed=function(_86d){
var _86e=_86d.parent;
var _86f=1006;
var _870="";
if(_86d.closeReason.length>0){
_86f=_86d.closeCode;
_870=_86d.closeReason;
}
if(_86e.readyState===WebSocket.CONNECTING&&!_86d.authenticationReceived&&!_86d.preventFallback){
this.fallbackNext(_86e);
}else{
this.doClose(_86e,false,_86f,_870);
}
};
_83b.handleConnectionError=function(_871,e){
_871.parent._lastErrorEvent=e;
};
return _80e;
})();
(function(){
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
var _875=HttpRedirectPolicy.prototype;
_875.toString=function(){
return "HttpRedirectPolicy."+this.name;
};
_875.isRedirectionAllowed=function(_876,_877){
if(arguments.length<2){
var s="HttpRedirectPolicy.isRedirectionAllowed(): Please specify both the 'originalLoc' and the 'redirectLoc' parameters.";
throw Error(s);
}
if(typeof (_876)=="undefined"){
var s="HttpRedirectPolicy.isRedirectionAllowed(): Please specify required 'originalLoc' parameter.";
throw Error(s);
}else{
if(typeof (_876)!="string"){
var s="HttpRedirectPolicy.isRedirectionAllowed(): Required parameter 'originalLoc' is a string.";
throw Error(s);
}
}
if(typeof (_877)=="undefined"){
var s="HttpRedirectPolicy.isRedirectionAllowed(): Please specify required 'redirectLoc' parameter.";
throw Error(s);
}else{
if(typeof (_877)!="string"){
var s="HttpRedirectPolicy.isRedirectionAllowed(): Required parameter 'redirectLoc' is a string.";
throw Error(s);
}
}
var _879=false;
var _87a=new URI(_876.toLowerCase().replace("http","ws"));
var _87b=new URI(_877.toLowerCase().replace("http","ws"));
switch(this.name){
case "ALWAYS":
_879=true;
break;
case "NEVER":
_879=false;
break;
case "PEER_DOMAIN":
_879=isPeerDomain(_87a,_87b);
break;
case "SAME_DOMAIN":
_879=isSameDomain(_87a,_87b);
break;
case "SAME_ORIGIN":
_879=isSameOrigin(_87a,_87b);
break;
case "SUB_DOMAIN":
_879=isSubDomain(_87a,_87b);
break;
default:
var s="HttpRedirectPolicy.isRedirectionAllowed(): Invalid policy: "+this.name;
throw new Error(s);
}
return _879;
};
function isPeerDomain(_87c,_87d){
if(isSameDomain(_87c,_87d)){
return true;
}
var _87e=_87c.scheme.toLowerCase();
var _87f=_87d.scheme.toLowerCase();
if(_87f.indexOf(_87e)==-1){
return false;
}
var _880=_87c.host;
var _881=_87d.host;
var _882=getBaseDomain(_880);
var _883=getBaseDomain(_881);
if(_881.indexOf(_882,(_881.length-_882.length))==-1){
return false;
}
if(_880.indexOf(_883,(_880.length-_883.length))==-1){
return false;
}
return true;
};
function isSameDomain(_884,_885){
if(isSameOrigin(_884,_885)){
return true;
}
var _886=_884.scheme.toLowerCase();
var _887=_885.scheme.toLowerCase();
if(_887.indexOf(_886)==-1){
return false;
}
var _888=_884.host.toLowerCase();
var _889=_885.host.toLowerCase();
if(_888==_889){
return true;
}
return false;
};
function isSameOrigin(_88a,_88b){
var _88c=_88a.scheme.toLowerCase();
var _88d=_88b.scheme.toLowerCase();
var _88e=_88a.authority.toLowerCase();
var _88f=_88b.authority.toLowerCase();
if((_88c==_88d)&&(_88e==_88f)){
return true;
}
return false;
};
function isSubDomain(_890,_891){
if(isSameDomain(_890,_891)){
return true;
}
var _892=_890.scheme.toLowerCase();
var _893=_891.scheme.toLowerCase();
if(_893.indexOf(_892)==-1){
return false;
}
var _894=_890.host.toLowerCase();
var _895=_891.host.toLowerCase();
if(_895.length<_894.length){
return false;
}
var s="."+_894;
if(_895.indexOf(s,(_895.length-s.length))==-1){
return false;
}
return true;
};
function getBaseDomain(host){
var _898=host.split(".");
var len=_898.length;
if(len<=2){
return host;
}
var _89a="";
for(var i=1;i<len;i++){
_89a+="."+_898[i];
}
return _89a;
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
var _89c=new _7ff();
window.WebSocket=(function(){
var _89d={};
var _89e=function(url,_8a0,_8a1,_8a2,_8a3,_8a4){
this.url=url;
this.protocol=_8a0;
this.extensions=_8a1||[];
this.connectTimeout=0;
this._challengeHandler=_8a2;
this._redirectPolicy=HttpRedirectPolicy.ALWAYS;
if(typeof (_8a3)!="undefined"){
_8a5(_8a3);
this.connectTimeout=_8a3;
}
if(typeof (_8a4)!="undefined"){
_8a6(_8a4);
this._redirectPolicy=_8a4;
}
this._queue=[];
this._origin="";
this._eventListeners={};
setProperties(this);
_8a7(this,this.url,this.protocol,this.extensions,this._challengeHandler,this.connectTimeout);
};
var _8a8=function(s){
if(s.length==0){
return false;
}
var _8aa="()<>@,;:\\<>/[]?={}\t \n";
for(var i=0;i<s.length;i++){
var c=s.substr(i,1);
if(_8aa.indexOf(c)!=-1){
return false;
}
var code=s.charCodeAt(i);
if(code<33||code>126){
return false;
}
}
return true;
};
var _8ae=function(_8af){
if(typeof (_8af)==="undefined"){
return true;
}else{
if(typeof (_8af)==="string"){
return _8a8(_8af);
}else{
for(var i=0;i<_8af.length;i++){
if(!_8a8(_8af[i])){
return false;
}
}
return true;
}
}
};
var _8a7=function(_8b1,_8b2,_8b3,_8b4,_8b5,_8b6){
if(!_8ae(_8b3)){
throw new Error("SyntaxError: invalid protocol: "+_8b3);
}
var uri=new _50d(_8b2);
if(!uri.isSecure()&&document.location.protocol==="https:"){
throw new Error("SecurityException: non-secure connection attempted from secure origin");
}
var _8b8=[];
if(typeof (_8b3)!="undefined"){
if(typeof _8b3=="string"&&_8b3.length){
_8b8=[_8b3];
}else{
if(_8b3.length){
_8b8=_8b3;
}
}
}
_8b1._channel=new _56a(uri,_8b8);
_8b1._channel._webSocket=_8b1;
_8b1._channel._webSocketChannelListener=_89d;
_8b1._channel._extensions=_8b4;
if(typeof (_8b5)!="undefined"){
_8b1._channel.challengeHandler=_8b5;
}
if((typeof (_8b6)!="undefined")&&(_8b6>0)){
var _8b9=_8b1._channel;
var _8ba=new _519(function(){
if(_8b9.readyState==_89e.CONNECTING){
_89c.doClose(_8b9,false,1006,"Connection timeout");
_89c.processClose(_8b9,0,"Connection timeout");
_8b9.connectTimer=null;
}
},_8b6,false);
_8b1._channel.connectTimer=_8ba;
_8ba.start();
}
_89c.processConnect(_8b1._channel,uri.getWSEquivalent());
};
function setProperties(_8bb){
_8bb.onmessage=null;
_8bb.onopen=null;
_8bb.onclose=null;
_8bb.onerror=null;
if(Object.defineProperty){
try{
Object.defineProperty(_8bb,"readyState",{get:function(){
if(_8bb._channel){
return _8bb._channel.readyState;
}else{
return _89e.CLOSED;
}
},set:function(){
throw new Error("Cannot set read only property readyState");
}});
var _8bc="blob";
Object.defineProperty(_8bb,"binaryType",{enumerable:true,configurable:true,get:function(){
return _8bc;
},set:function(val){
if(val==="blob"||val==="arraybuffer"||val==="bytebuffer"){
_8bc=val;
}else{
throw new SyntaxError("Invalid binaryType. Valid values are 'blob', 'arraybuffer' and 'bytebuffer'");
}
}});
Object.defineProperty(_8bb,"bufferedAmount",{get:function(){
return _8bb._channel.getBufferedAmount();
},set:function(){
throw new Error("Cannot set read only property bufferedAmount");
}});
}
catch(ex){
_8bb.readyState=_89e.CONNECTING;
_8bb.binaryType="blob";
_8bb.bufferedAmount=0;
}
}else{
_8bb.readyState=_89e.CONNECTING;
_8bb.binaryType="blob";
_8bb.bufferedAmount=0;
}
};
var _8be=_89e.prototype;
_8be.send=function(data){
switch(this.readyState){
case 0:
throw new Error("Attempt to send message on unopened or closed WebSocket");
case 1:
if(typeof (data)==="string"){
_89c.processTextMessage(this._channel,data);
}else{
_89c.processBinaryMessage(this._channel,data);
}
break;
case 2:
case 3:
break;
default:
throw new Error("Illegal state error");
}
};
_8be.close=function(code,_8c1){
if(typeof code!="undefined"){
if(code!=1000&&(code<3000||code>4999)){
var _8c2=new Error("code must equal to 1000 or in range 3000 to 4999");
_8c2.name="InvalidAccessError";
throw _8c2;
}
}
if(typeof _8c1!="undefined"&&_8c1.length>0){
var buf=new ByteBuffer();
buf.putString(_8c1,Charset.UTF8);
buf.flip();
if(buf.remaining()>123){
throw new SyntaxError("SyntaxError: reason is longer than 123 bytes");
}
}
switch(this.readyState){
case 0:
case 1:
_89c.processClose(this._channel,code,_8c1);
break;
case 2:
case 3:
break;
default:
throw new Error("Illegal state error");
}
};
_8be.getChallengeHandler=function(){
return this._challengeHandler||null;
};
_8be.setChallengeHandler=function(_8c4){
if(typeof (_8c4)=="undefined"){
var s="WebSocket.setChallengeHandler(): Parameter 'challengeHandler' is required";
throw new Error(s);
}
this._challengeHandler=_8c4;
this._channel.challengeHandler=_8c4;
};
_8be.getRedirectPolicy=function(){
return this._redirectPolicy;
};
_8be.setRedirectPolicy=function(_8c6){
_8a6(_8c6);
this._redirectPolicy=_8c6;
};
var _8a5=function(_8c7){
if(typeof (_8c7)=="undefined"){
var s="WebSocket.setConnectTimeout(): int parameter 'connectTimeout' is required";
throw new Error(s);
}
if(typeof (_8c7)!="number"){
var s="WebSocket.setConnectTimeout(): connectTimeout should be an integer";
throw new Error(s);
}
if(_8c7<0){
var s="WebSocket.setConnectTimeout(): Connect timeout cannot be negative";
throw new Error(s);
}
return;
};
var _8a6=function(_8c9){
if(typeof (_8c9)=="undefined"){
var s="WebSocket.validateHttpRedirectPolicy(): Parameter 'redirectPolicy' is required";
throw new Error(s);
}
if(!(_8c9 instanceof HttpRedirectPolicy)){
var s="WebSocket.validateHttpRedirectPolicy(): Parameter 'redirectPolicy' must be of type HttpRedirectPolicy";
throw new Error(s);
}
};
var _8cb=function(_8cc,data){
var _8ce=new MessageEvent(_8cc,data,_8cc._origin);
_8cc.dispatchEvent(_8ce);
};
var _8cf=function(_8d0){
var _8d1=new Date().getTime();
var _8d2=_8d1+50;
while(_8d0._queue.length>0){
if(new Date().getTime()>_8d2){
setTimeout(function(){
_8cf(_8d0);
},0);
return;
}
var buf=_8d0._queue.shift();
var ok=false;
try{
if(_8d0.readyState==_89e.OPEN){
_8cb(_8d0,buf);
ok=true;
}else{
_8d0._queue=[];
return;
}
}
finally{
if(!ok){
if(_8d0._queue.length==0){
_8d0._delivering=false;
}else{
setTimeout(function(){
_8cf(_8d0);
},0);
}
}
}
}
_8d0._delivering=false;
};
var _8d5=function(_8d6,_8d7,code,_8d9){
delete _8d6._channel;
setTimeout(function(){
var _8da=new CloseEvent(_8d6,_8d7,code,_8d9);
_8d6.dispatchEvent(_8da);
},0);
};
_89d.handleOpen=function(_8db,_8dc){
_8db.protocol=_8dc;
var _8dd={type:"open",bubbles:true,cancelable:true,target:_8db};
_8db.dispatchEvent(_8dd);
};
_89d.handleMessage=function(_8de,obj){
if(!Object.defineProperty&&!(typeof (obj)==="string")){
var _8e0=_8de.binaryType;
if(!(_8e0==="blob"||_8e0==="arraybuffer"||_8e0==="bytebuffer")){
var _8e1={type:"error",bubbles:true,cancelable:true,target:_8de,message:"Invalid binaryType. Valid values are 'blob', 'arraybuffer' and 'bytebuffer'"};
_8de.dispatchEvent(_8e1);
return;
}
}
_8de._queue.push(obj);
if(!_8de._delivering){
_8de._delivering=true;
_8cf(_8de);
}
};
_89d.handleClose=function(_8e2,_8e3,code,_8e5){
_8d5(_8e2,_8e3,code,_8e5);
};
_89d.handleError=function(_8e6,_8e7){
setTimeout(function(){
_8e6.dispatchEvent(_8e7);
},0);
};
_89d.handleBufferdAmountChange=function(_8e8,n){
_8e8.bufferedAmount=n;
};
_8be.addEventListener=function(type,_8eb,_8ec){
this._eventListeners[type]=this._eventListeners[type]||[];
this._eventListeners[type].push(_8eb);
};
_8be.removeEventListener=function(type,_8ee,_8ef){
var _8f0=this._eventListeners[type];
if(_8f0){
for(var i=0;i<_8f0.length;i++){
if(_8f0[i]==_8ee){
_8f0.splice(i,1);
return;
}
}
}
};
_8be.dispatchEvent=function(e){
var type=e.type;
if(!type){
throw new Error("Cannot dispatch invalid event "+e);
}
try{
var _8f4=this["on"+type];
if(typeof _8f4==="function"){
_8f4(e);
}
}
catch(e){
}
var _8f5=this._eventListeners[type];
if(_8f5){
for(var i=0;i<_8f5.length;i++){
try{
_8f5[i](e);
}
catch(e2){
}
}
}
};
_89e.CONNECTING=_8be.CONNECTING=0;
_89e.OPEN=_8be.OPEN=1;
_89e.CLOSING=_8be.CLOSING=2;
_89e.CLOSED=_8be.CLOSED=3;
return _89e;
})();
window.WebSocket.__impls__={};
window.WebSocket.__impls__["flash:wse"]=_30b;
}());
(function(){
window.WebSocketExtension=(function(){
var _8f7=function(name){
this.name=name;
this.parameters={};
this.enabled=false;
this.negotiated=false;
};
var _8f9=_8f7.prototype;
_8f9.getParameter=function(_8fa){
return this.parameters[_8fa];
};
_8f9.setParameter=function(_8fb,_8fc){
this.parameters[_8fb]=_8fc;
};
_8f9.getParameters=function(){
var arr=[];
for(var name in this.parameters){
if(this.parameters.hasOwnProperty(name)){
arr.push(name);
}
}
return arr;
};
_8f9.parse=function(str){
var arr=str.split(";");
if(arr[0]!=this.name){
throw new Error("Error: name not match");
}
this.parameters={};
for(var i=1;i<arr.length;i++){
var _902=arr[i].indexOf("=");
this.parameters[arr[i].subString(0,_902)]=arr[i].substring(_902+1);
}
};
_8f9.toString=function(){
var arr=[this.name];
for(var p in this.parameters){
if(this.parameters.hasOwnProperty(p)){
arr.push(p.name+"="+this.parameters[p]);
}
}
return arr.join(";");
};
return _8f7;
})();
})();
(function(){
window.WebSocketRevalidateExtension=(function(){
var _905=function(){
};
var _906=_905.prototype=new WebSocketExtension(_555.KAAZING_SEC_EXTENSION_REVALIDATE);
return _905;
})();
})();
(function(){
window.WebSocketFactory=(function(){
var _907=function(){
this.extensions={};
var _908=new WebSocketRevalidateExtension();
this.extensions[_908.name]=_908;
this.redirectPolicy=HttpRedirectPolicy.ALWAYS;
};
var _909=_907.prototype;
_909.getExtension=function(name){
return this.extensions[name];
};
_909.setExtension=function(_90b){
this.extensions[_90b.name]=_90b;
};
_909.setChallengeHandler=function(_90c){
if(typeof (_90c)=="undefined"){
var s="WebSocketFactory.setChallengeHandler(): Parameter 'challengeHandler' is required";
throw new Error(s);
}
this.challengeHandler=_90c;
var _90e=this.extensions[_555.KAAZING_SEC_EXTENSION_REVALIDATE];
_90e.enabled=(_90c!=null);
};
_909.getChallengeHandler=function(){
return this.challengeHandler||null;
};
_909.createWebSocket=function(url,_910){
var ext=[];
for(var key in this.extensions){
if(this.extensions.hasOwnProperty(key)&&this.extensions[key].enabled){
ext.push(this.extensions[key].toString());
}
}
var _913=this.getChallengeHandler();
var _914=this.getDefaultConnectTimeout();
var _915=this.getDefaultRedirectPolicy();
var ws=new WebSocket(url,_910,ext,_913,_914,_915);
return ws;
};
_909.setDefaultConnectTimeout=function(_917){
if(typeof (_917)=="undefined"){
var s="WebSocketFactory.setDefaultConnectTimeout(): int parameter 'connectTimeout' is required";
throw new Error(s);
}
if(typeof (_917)!="number"){
var s="WebSocketFactory.setDefaultConnectTimeout(): connectTimeout should be an integer";
throw new Error(s);
}
if(_917<0){
var s="WebSocketFactory.setDefaultConnectTimeout(): Connect timeout cannot be negative";
throw new Error(s);
}
this.connectTimeout=_917;
};
_909.getDefaultConnectTimeout=function(){
return this.connectTimeout||0;
};
_909.setDefaultRedirectPolicy=function(_919){
if(typeof (_919)=="undefined"){
var s="WebSocketFactory.setDefaultRedirectPolicy(): int parameter 'redirectPolicy' is required";
throw new Error(s);
}
if(!(_919 instanceof HttpRedirectPolicy)){
var s="WebSocketFactory.setDefaultRedirectPolicy(): redirectPolicy should be an instance of HttpRedirectPolicy";
throw new Error(s);
}
this.redirectPolicy=_919;
};
_909.getDefaultRedirectPolicy=function(){
return this.redirectPolicy;
};
return _907;
})();
})();
window.___Loader=new _3a1(_26f);
})();
})();
