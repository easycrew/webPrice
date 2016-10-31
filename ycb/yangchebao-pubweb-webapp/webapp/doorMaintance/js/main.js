// 浏览器缓存

// var index = {};
var getLocalStorage=function(key){
		if(window.localStorage){
			try{
				return JSON.parse(localStorage.getItem(key))
			}catch(e){
				return localStorage.getItem(key)
			}
		}else{
			var name = key;
			var arr =document.cookie.match(new RegExp("(^|)"+name+"=([^;]*)(;|$)"));
			if(arr != null) {
				try{
					return JSON.parse(unescape(arr[2]))
				}catch(e){
					return unescape(arr[2])
				}
			}else{
				return null
			}
		}
		
	};
var setLocalStorage=function(key,value){
		if(window.localStorage){
			localStorage.setItem(key,JSON.stringify(value))
		}else{
			var name = key;
			document.cookie=name+'='+escape(JSON.stringify(value))
		}
	};
var removeLocalStorage=function(key){
		if(window.localStorage){
			localStorage.removeItem(key)
		}else{
			var name = key;
			var exp = new Date();
		    exp.setTime(exp.getTime() - 1);
		    var cval=getCookie(name);
		    if(cval!=null)
	        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
		}
	};
var urlIp=function(){
	if((window.location.href).indexOf('app.yangchebao.com.cn')!=-1){
		return 'app.yangchebao.com.cn'
	}else{
		return '172.18.180.11'
	}
}

// 浏览器cookie
var setCookie=function(name,value){
		document.cookie=name+'='+escape(JSON.stringify(value))
	};
var getCookie=function(name){
		var arr =document.cookie.match(new RegExp("(^|)"+name+"=([^;]*)(;|$)"));
		if(arr != null) {
			try{
				return JSON.parse(unescape(arr[2]))
			}catch(e){
				return unescape(arr[2])
			}
		}else{
			return null
		}
	};
var delCookie=function(name){
	    var exp = new Date();
	    exp.setTime(exp.getTime() - 1);
	    var cval=getCookie(name);
	    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	}


function bIsAndroid(){
			var sUserAgent = navigator.userAgent.toLowerCase(); 
			var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
			var bIsIphone = sUserAgent.match(/iphone/i) == "iphone";
			var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
			var bIsMidp = sUserAgent.match(/midp/i) == "midp";
			var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
			var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
			var bIsAndroid = sUserAgent.match(/android/i) == "android";
			var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
			var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile"; 
			if(bIsIpad || bIsIphoneOs || bIsIphone){ 
				return false;
			}else{ 
				return true;
			}
}  
// function mobileCallBack(r,bridge){ 
// 	if(bIsAndroid()){
		 
// 		//android.setPullMode(r);				
// 	}else{
// 		bridge.send(r, function(responseData) {
// 			log('JS got response', responseData)
// 		});
// 	}

// }

// function passParamsFromApp2Web(info){   
// 		index.init(info);
// } 
// function connectWebViewJavascriptBridge(callback) {
// 	if (window.WebViewJavascriptBridge) {
// 		callback(WebViewJavascriptBridge)
// 	} else {
// 		document.addEventListener('WebViewJavascriptBridgeReady', function() {
// 			callback(WebViewJavascriptBridge)
// 		}, false)
// 	}
// }
// connectWebViewJavascriptBridge(function(bridge) {
// 	document.documentElement.style.webkitTouchCallout='none';
// 	bridge.init(function(message, responseCallback) {
// 		alert(message);
// 		if(message instanceof Object){  
// 			if(typeof index.init === 'function') {  
// 				responseCallback(index.init.apply(this,[message,bridge]));
// 			} 
// 		}else if(message=="pullUpRefresh"){
// 			 typeof index[message] == 'function' && responseCallback(index.pullUpRefresh.apply(this));  
// 		}else{
// 			 responseCallback(setCallCountFromClient.apply(this,[message]));
// 		}
// 	}) 
 
// });
//window.AppJsParamsObj.saveUserInfo("","","","","","","","","");
//saveUserInfo(customerId 1,userInfoId 2,account 3,nicName 4,brandId 5,brandName 6,modelId 7,modelName 8,carInfoId 9);