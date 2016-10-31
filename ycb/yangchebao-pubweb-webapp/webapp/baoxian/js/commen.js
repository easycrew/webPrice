// 弹出框
function safeAlert(type,mes,btn1,btn2){
	var alertCon=$('<div>').addClass('dilog-con');
	var alertDetail=$('<p>').addClass('dialog-detail').html(mes);
	var alertBtns=$('<div>').addClass('dialog-btns');
	var alertOver=$('<div>').addClass('dialog-overLay');
	var alertBtn1=$('<p>').addClass('onlyBtn1').html(btn1);

	var alertBtn2Left=$('<p>').append('<span>'+btn1+'</span>').addClass('dialog-btnLeft');
	var alertBtn2Right=$('<p>').append('<span>'+btn2+'</span>').addClass('dialog-btnRight');
	var dialogOverlay=function(){
		var bodyHeight=$('body').height();
		var windowHeight=window.screen.availHeight;
		if(bodyHeight>windowHeight){
			$('div.dialog-overLay').css('height',bodyHeight)
		}else{
			$('div.dialog-overLay').css('height',windowHeight)
		}
	}
	if(type==0){
		if($('div.container').length>0){
			$('div.container').append(alertCon.append(alertDetail));
			$('div.container').append(alertOver);
			dialogOverlay();
			var itemWidth=($('div.container').outerWidth())*0.9;
			var itemMargin=($('div.container').outerWidth())*0.05;
			$('div.dilog-con').css({'width':itemWidth,"margin-left":itemMargin,"margin-right":itemMargin,'top':window.scrollY + 100+'px'});
		}else{
			$('section').append(alertCon.append(alertDetail));
			$('section').append(alertOver);
			dialogOverlay();
			var itemWidth=($('section').outerWidth())*0.9;
			var itemMargin=($('section').outerWidth())*0.05;
			$('div.dilog-con').css({'width':itemWidth,"margin-left":itemMargin,"margin-right":itemMargin,'top':window.scrollY + 100+'px'});
		}
		
	}else if(type==1){
		if($('div.container').length>0){
			$('div.container').append(alertCon.append(alertDetail).append(alertBtns.append(alertBtn1))).append(alertOver);
			$('div.container').append(alertOver);
			dialogOverlay();
			var itemWidth=($('div.container').outerWidth())*0.9;
			var itemMargin=($('div.container').outerWidth())*0.05;
			$('div.dilog-con').css({'width':itemWidth,"margin-left":itemMargin,"margin-right":itemMargin,'top':window.scrollY + 100+'px'});
		}else{
			$('section').append(alertCon.append(alertDetail).append(alertBtns.append(alertBtn1))).append(alertOver);
			$('section').append(alertOver);
			dialogOverlay();
			var itemWidth=($('section').outerWidth())*0.9;
			var itemMargin=($('section').outerWidth())*0.05;
			$('div.dilog-con').css({'width':itemWidth,"margin-left":itemMargin,"margin-right":itemMargin,'top':window.scrollY + 100+'px'});
		}
	}else if(type==2){
		if($('div.container').length>0){
			$('div.container').append(alertCon.append(alertDetail).append(alertBtns.append(alertBtn2Left).append(alertBtn2Right))).append(alertOver);
			$('div.container').append(alertOver);
			dialogOverlay();
			var itemWidth=($('div.container').outerWidth())*0.9;
			var itemMargin=($('div.container').outerWidth())*0.05;
			$('div.dilog-con').css({'width':itemWidth,"margin-left":itemMargin,"margin-right":itemMargin,'top':window.scrollY + 100+'px'});
		}else{
			$('section').append(alertCon.append(alertDetail).append(alertBtns.append(alertBtn2Left).append(alertBtn2Right))).append(alertOver);
			$('section').append(alertOver);
			dialogOverlay();
			var itemWidth=($('section').outerWidth())*0.9;
			var itemMargin=($('section').outerWidth())*0.05;
			$('div.dilog-con').css({'width':itemWidth,"margin-left":itemMargin,"margin-right":itemMargin,'top':window.scrollY + 100+'px'});
		}
	};
	alertBtn1.click(function(){
		alertCon.remove();
		alertOver.remove()
	});
	alertBtn2Left.click(function(){
		alertCon.remove();
		alertOver.remove()
	})
};
// 浏览器缓存
var getLocalStorage=function(key){
		try{
			return JSON.parse(localStorage.getItem(key))
		}catch(e){
			return localStorage.getItem(key)
		}
	};
var setLocalStorage=function(key,value){
		localStorage.setItem(key,JSON.stringify(value))
	};
var removeLocalStorage=function(key){
		localStorage.removeItem(key)
	};
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