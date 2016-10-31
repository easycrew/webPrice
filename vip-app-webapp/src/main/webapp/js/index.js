var index = {};
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
// function pullDownRefresh() {
// 	alert("android：刷新，这是从网页上弹出的框哟"); 
// 	// 刷新动作
//	
// 	android.pullDownResponse(true); // 刷新完成，通知客户端
// }
 
 function pullUpRefresh() {
	var f = index.pullUpRefresh();   
	// 加载动作 
	android.pullUpResponse(true); // 加载完成，通知客户端
	if(f=="1"){
		f=0x3;
	}else{
		f=0x1;
	}
	//alert(f);
	android.setPullMode(f);
 }
function pullDownClose(m){
	if(m=='1'){
		m=0x0;//上拉下拉都不要
	}else{
		m=0x1;//下拉刷新，上拉加载不执行
	}
	android.setPullMode(m);
}
 function setAtomInfo(info) 
 {
	//alert("shopAccountId:"+info.shopAccountId+", businessInfoId:"+info.businessInfoId);
	var f = index.init(info); 
	if(f=="1"){
		f=0x3;
	}else{
		f=0x1;
	} 
	android.setPullMode(f);
 } 
function getPath(){   
	var path = window.location.href.split("?")[0];
	var arr = path.split("/");
	var length = arr.length;
	arr.splice(length-1);
	return arr.join("/");
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
		if(r=="1"){
			r=0x3;
		}else{
			r=0x1;
		} 
		android.setPullMode(r);				
	}else{
		bridge.send(r, function(responseData) {
			log('JS got response', responseData)
		});
	}

}
// 本地存储
var store={
	set:function(key,value){
		if(window.localStorage){
			localStorage.setItem(key,JSON.stringify(value))
		}else{
			var name = key;
			document.cookie=name+'='+escape(JSON.stringify(value))
		}
	},
	get:function(key){
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
	},
	remove:function(key){
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
	},
	clear:function(){
		if(window.localStorage){
			localStorage.clear()
		}else{
			var keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
			if(keys){ 
				for(var i = keys.length; i--;){
					document.cookie=keys[i]+'=0;expires=' + new Date(0).toUTCString() 
				}
			} 
		}
	}
}

//弹出框-确定按钮
function alertRe(m,t){
	var title = t||"提示信息";
	var dialog = $("<div>").addClass("dialog");
	var h1 = $("<h1>").html(title);
	var content = $("<div>").addClass("dialog-content").html("<p>"+m+"</p>");
	var btns = $("<div>").addClass("btn-wraper");
	var sure = $("<span>").html("确定"); 
	var overlay = $("<div>").addClass("dialog-overlay");
	$("body").append(dialog.append(h1).append(content).append(btns.append(sure))).append(overlay); 
	sure.on('click',function(){
		dialog.remove();
		overlay.remove();
	});
	overlay.on('click',function(){
		dialog.remove();
		overlay.remove();
	});
}
//弹出框-确定取消按钮
function confirmRe(m,sure,cancel,t){
	var title = t||"提示信息";
	var dialog = $("<div>").addClass("dialog");
	var h1 = $("<h1>").html(title);
	var content = $("<div>").addClass("dialog-content").html("<p>"+m+"</p>");
	var btns = $("<div>").addClass("btn-wraper two-btn");
	var sureBtn = $("<span>").html("确定");
	var cancelBtn = $("<span>").html("取消");
	var overlay = $("<div>").addClass("dialog-overlay");
	$("body").append(dialog.append(h1).append(content).append(btns.append(sureBtn).append(cancelBtn))).append(overlay);
	cancelBtn.on('click',function(){
	    if(jQuery.isFunction(cancel)) {
            cancel();
        }
		dialog.remove();
		overlay.remove();
	});
	sureBtn.on('click',function(){
		if(jQuery.isFunction(sure)) {
            sure();
        }
		dialog.remove();
		overlay.remove();
	});
	overlay.on('click',function(){
		dialog.remove();
		overlay.remove();
	});
}
//弹出框-确定取消按钮-数据输入-格式检验
/*
 * reg		正则表达式
 * im		placeholder 值||错误提示话术
 * sure		点击确定执行方法
 * cancel 	点击取消执行方法
 * t 		提示title
 */
function confirmReSeach(reg,im,sure,cancel,t){
	var title = t||"提示信息";
	var dialog = $("<div>").addClass("dialog");
	var h1 = $("<h1>").html(title);
//	var p=$("<p>").html(m);
	var input=$("<input>").attr('type','text').attr('placeholder',im);
	var note=$("<p>").addClass('ui-note');
	var content = $("<div>").addClass("dialog-content").append(input).append(note);
	var btns = $("<div>").addClass("btn-wraper two-btn");
	var sureBtn = $("<span>").html("确定");
	var cancelBtn = $("<span>").html("取消");
	var overlay = $("<div>").addClass("dialog-overlay");
	$("body").append(dialog.append(h1).append(content).append(btns.append(sureBtn).append(cancelBtn))).append(overlay);
	cancelBtn.on('click',function(){
	    if(jQuery.isFunction(cancel)) {
            cancel();
        }
		dialog.remove();
		overlay.remove();
	});
	sureBtn.on('click',function(){
		if(!reg.test($.trim(input.val()))){
			note.html(im);
			return
		}
		if(jQuery.isFunction(sure)) {
            sure();
        }
		dialog.remove();
		overlay.remove();
	});
//	overlay.on('click',function(){
//		dialog.remove();
//		overlay.remove();
//	});
}

//弹出提示信息框，自动消失  
//注意两个土司框字体大小问题,需优化
function alertTasat(msg){
	var _html = $("<div>").addClass("tasat-wrap").addClass("G")
	var _span = $("<span>").addClass("tasat").css('font-size','16px').html(msg);
	$("body").append(_html.append(_span));
	_html.fadeIn();
	window.setTimeout(function(){
		_html.fadeOut(function(){
			_html.remove();
		});
	}, 1500);   
}
function alertTasatG(msg){
	var _html = $("<div>").addClass("tasat-wrap").addClass("G")
	var _span = $("<span>").addClass("tasat").css('font-size','16px').html(msg);
	var overlay = $("<div>").addClass("G-dialog").addClass("dialog-overlay");
	$("body").append(overlay).append(_html.append(_span));
	_html.fadeIn();
	window.setTimeout(function(){
		_html.fadeOut(function(){
			_html.remove();
			overlay.remove();
		});
	}, 2000);   
}
function alertTasatF(msg,Fun){
	var _html = $("<div>").addClass("tasat-wrap").addClass("G")
	var _span = $("<span>").addClass("tasat").css('font-size','16px').html(msg);
	var overlay = $("<div>").addClass("G-dialog").addClass("dialog-overlay");
	$("body").append(overlay).append(_html.append(_span));
	_html.fadeIn();
	window.setTimeout(function(){
		_html.fadeOut(function(){
			_html.remove();
			overlay.remove();
			if(jQuery.isFunction(Fun)){
				Fun();
			}
		});
	}, 2000);
}
function showEmpty(msg){
	var path=getPath();
	if(path=="http://vipapp.yangchebao.com.cn/vip-app"){
		var _img=$('<img src="'+path+'/css/ycbmall/images/search_empty.png">');
	}else{
		var _img=$('<img src="http://106.2.213.122:10081/vip-app/css/ycbmall/images/search_empty.png">');
	}
	var _section=$("<section>").addClass("error-wrap");
	var _div=$("<div>").addClass("contents");
	var _divImg=$("<div>").addClass("error-img");
	var _content=$("<div>").addClass("error-info").html(msg);
	$("body").html(_section.append(_div.append(_divImg.append(_img)).append(_content)))
}
