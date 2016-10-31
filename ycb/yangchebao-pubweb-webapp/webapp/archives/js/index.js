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
function getPath(){  
	//return  "http://172.18.180.11/yangchebao-pubweb/archives/";
	return  "http://app.yangchebao.com.cn/yangchebao-pubweb/archives/"; 
}
function getIp(){  
	//return  "http://172.18.180.11/yangchebao-pubweb/";
	return  "http://app.yangchebao.com.cn/yangchebao-pubweb/"; 
}
var urlIp=function(){
	if((window.location.href).indexOf('app.yangchebao.com.cn')!=-1){
		return 'app.yangchebao.com.cn'
	}else{
		return '172.18.180.11'
	}
}
function getCustomerId(id){
	var customerId = "";
	$.ajax({
			url: '/yangchebao-app-ws/ws/0.1/user/userinfo/getCustomerId?userInfoId='+id,
			type: 'get',
			async: false,
			dataType: 'json',
			success: function(data) {  
				if(data.customerId!=""&&data.customerId!=undefined){ 
				 customerId = data.customerId; 
				}else{
				 customerId = -1; 
				}
			},error:function(){ 
				customerId = -1;
			}
		});
	return customerId;
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
index.init= function(info){  
    paramJson.customerId = info.customerId;
};
function isLogin(url){ 
	if(paramJson.customerId=='' || paramJson.customerId==null || paramJson.customerId=='null' || paramJson.customerId==undefined){  
		window.location.href = "http://w2l?presentType=2&androidName=8&iosName=LoginViewController";  
	}else{   
		window.location.href = url;			
	}
}
 