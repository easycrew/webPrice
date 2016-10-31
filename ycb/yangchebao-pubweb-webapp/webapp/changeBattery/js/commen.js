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
		return '172.18.180.11'
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