// 错误框
var errorLog=function(msg){
	$('div.errorLog').remove();
	var errorStr='';
	errorStr+='<div class="errorLog" style="display:none;"><p></p></div>'
	$('body').append(errorStr);
	$('div.errorLog p').html(msg);
	$('div.errorLog').fadeIn();
	var errorHeight=$('div.errorLog p').outerHeight();
	$('div.errorLog p').css({'top':'50%','margin-top':'-'+errorHeight/2+'px'});
	$('div.errorLog').unbind('click').bind('click',function(){
		$('div.errorLog').fadeOut()
	});
	setTimeout(function(){
		$('div.errorLog').fadeOut()
	},3000)
};
// 区分ip
var urlIp=function(){
	if((window.location.href).indexOf('app.yangchebao.com.cn')!=-1){
		return 'app.yangchebao.com.cn'
	}else{
		return '106.2.213.122:10081'
	}
}
// 判断andriod
var bIsAndroid=function(){
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