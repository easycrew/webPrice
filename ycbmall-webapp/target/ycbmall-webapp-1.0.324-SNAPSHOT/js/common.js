(function(window,undefined){
	var mall={};
	window.mall=mall;
	window.username='';
	mall.url=function(remain){
		return '/ycbmall-ws/ws/0.1'+remain
	};
	mall.alertRe=function(m,t){
		var title=t||'提示信息';

		var dialog=$("<div>").addClass('dialog');

		var h3=$('<h3>').html(title);
		var close=$('<img>').attr('src','img/alertRe_close.png').addClass('dialog-close');
		var top=$('<div>').addClass('dialog-title');
		top.append(h3).append(close);

		var content=$('<div>').addClass('dialog-con');
		var p=$('<p>').html(m);
		var sure=$('<span>').html('确 定').addClass('dialog-sure');
		content.append(p).append(sure);

		var overlay=$('<div>').addClass('dialog-overlay');

		dialog.append(top).append(content);
		$('body').append(dialog).append(overlay);

		sure.on('click',function(){
			dialog.remove();
			overlay.remove();
			location.replace(location.href);
			//window.location = window.location.href;
		});
		close.on('click',function(){
			dialog.remove();
			overlay.remove();
			location.replace(location.href)
		})
		$(".dialog-overlay").css('height',$(document).height());
	};
	mall.alertRe_=function(m,t){
		var title=t||'提示信息';

		var dialog=$("<div>").addClass('dialog');

		var h3=$('<h3>').html(title);
		var close=$('<img>').attr('src','img/alertRe_close.png').addClass('dialog-close');
		var top=$('<div>').addClass('dialog-title');
		top.append(h3).append(close);

		var content=$('<div>').addClass('dialog-con');
		var p=$('<p>').html(m);
		var sure=$('<span>').html('确 定').addClass('dialog-sure');
		content.append(p).append(sure);

		var overlay=$('<div>').addClass('dialog-overlay');

		dialog.append(top).append(content);
		$('body').append(dialog).append(overlay);

		sure.on('click',function(){
			dialog.remove();
			overlay.remove();
		});
		close.on('click',function(){
			dialog.remove();
			overlay.remove();
		})
		$(".dialog-overlay").css('height',$(document).height());
	};
	mall.alertReFun=function(m,t,Fun){
		var title=t||'提示信息';

		var dialog=$("<div>").addClass('dialog');

		var h3=$('<h3>').html(title);
		var close=$('<img>').attr('src','img/alertRe_close.png').addClass('dialog-close');
		var top=$('<div>').addClass('dialog-title');
		top.append(h3).append(close);

		var content=$('<div>').addClass('dialog-con');
		var p=$('<p>').html(m);
		var sure=$('<span>').html('确 定').addClass('dialog-sure');
		content.append(p).append(sure);

		var overlay=$('<div>').addClass('dialog-overlay');

		dialog.append(top).append(content);
		$('body').append(dialog).append(overlay);

		sure.on('click',function(){
			dialog.remove();
			overlay.remove();
			if(Fun!=undefined){
				Fun();
			}else{
				
			}
			//window.location = window.location.href;
		});
		close.on('click',function(){
			dialog.remove();
			overlay.remove();
			location.replace(location.href)
		})
		$(".dialog-overlay").css('height',$(document).height());
	};
	mall.alertReAndCanselFun=function(m,t,Fun){
		var title=t||'提示信息';

		var dialog=$("<div>").addClass('dialog');

		var h3=$('<h3>').html(title);
		var close=$('<img>').attr('src','img/alertRe_close.png').addClass('dialog-close');
		var top=$('<div>').addClass('dialog-title');
		top.append(h3).append(close);

		var content=$('<div>').addClass('dialog-con');
		var p=$('<p>').html(m);
		var sure=$('<span>').html('确 定').addClass('dialog-sure');
		var cansel=$('<span>').html('取 消').addClass('dialog-no');
		content.append(p).append(sure).append(cansel);

		var overlay=$('<div>').addClass('dialog-overlay');

		dialog.append(top).append(content);
		$('body').append(dialog).append(overlay);

		sure.on('click',function(){
			dialog.remove();
			overlay.remove();
			Fun();
			//window.location = window.location.href;
		});
		close.on('click',function(){
			dialog.remove();
			overlay.remove();
			location.replace(location.href)
		});
		cansel.on('click',function(){
			dialog.remove();
			overlay.remove();
			location.replace(location.href)
		});
		$(".dialog-overlay").css('height',$(document).height());
	};
	mall.setCookie=function(name,value){
		document.cookie=name+'='+escape(value)
	};
	mall.getCookie=function(name){
		var arr =document.cookie.match(new RegExp("(^|)"+name+"=([^;]*)(;|$)"));
		if(arr != null) 
		return unescape(arr[2]); 
		return null;
	};
	mall.delCookie=function(name){
		var exp = new Date();
	    exp.setTime(exp.getTime() - 1);
	    var cval=getCookie(name);
	    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	};
	//字符串超长显示加...
	mall.strFormat=function(str,n){
		if(str!=undefined){
			var strReturn=str;
			if(str.length>(n+1)){
				strReturn=str.substring(0,n)+'…'
		  	}
			return strReturn
		}
		
	}
})(window,undefined)

