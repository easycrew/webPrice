function alertTasat(msg){
			var _html = $("<div>").addClass("tasat-wrap")
            var _span = $("<span>").addClass("tasat").html(msg);
			$("body").append(_html.append(_span));
			_html.fadeIn();
			window.setTimeout(function(){
				_html.fadeOut(function(){
					_html.remove();
				});
			}, 1500);   
} 
var index = {};
function passParamsFromApp2Web(info){   
		index.init(info);
} 
function connectWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) {
		callback(WebViewJavascriptBridge)
	} else {
		document.addEventListener('WebViewJavascriptBridgeReady', function() {
			callback(WebViewJavascriptBridge)
		}, false)
	}
}
connectWebViewJavascriptBridge(function(bridge) {
	document.documentElement.style.webkitTouchCallout='none';
	bridge.init(function(message, responseCallback) {   
		if(message instanceof Object){  
			if(typeof index.init === 'function') {  
				responseCallback(index.init.apply(this,[message,bridge]));
			} 
		}else if(message=="pullUpRefresh"){
			 typeof index[message] == 'function' && responseCallback(index.pullUpRefresh.apply(this));  
		}else{
			 responseCallback(setCallCountFromClient.apply(this,[message]));
		}
	}) 
 
});
//window.AppJsParamsObj.saveUserInfo("","","","","","","","","");
//saveUserInfo(customerId 1,userInfoId 2,account 3,nicName 4,brandId 5,brandName 6,modelId 7,modelName 8,carInfoId 9);
 
function setCookie(c_name,value,expiredays)
{
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
function getCookie(c_name)
{
	if (document.cookie.length>0)
	  {
	  c_start=document.cookie.indexOf(c_name + "=")
	  if (c_start!=-1)
		{ 
		c_start=c_start + c_name.length+1 
		c_end=document.cookie.indexOf(";",c_start)
		if (c_end==-1) c_end=document.cookie.length
		return unescape(document.cookie.substring(c_start,c_end))
		} 
	  }
	return ""
}
function getPath(){
	/**var arr = window.location.href.split("/");
	arr.splice(arr.length-1,arr.length);
	return arr.join("/")+"/";**/
	//return  "http://172.18.180.11/yangchebao-pubweb/sdk/";
	return  "http://app.yangchebao.com.cn/yangchebao-pubweb/sdk/";
	
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
function mobileCallBack(r,bridge){ 
	if(bIsAndroid()){
		 
		//android.setPullMode(r);				
	}else{
		bridge.send(r, function(responseData) {
			log('JS got response', responseData)
		});
	}

}