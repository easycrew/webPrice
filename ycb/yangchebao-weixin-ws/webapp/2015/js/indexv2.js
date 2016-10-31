var shareArr = [
'赠君一个字，开运一整年',
'我的新年好运字是：路。遍寻天下美景，盼遇此生良人。', 
];
var descArr = [
'2015年人品大爆发，好运连连到，竟然可以实现全年零违章。',  
'三羊即“三阳”寓意新的一年朝阳启明，大地回春，万象更新，爱车容易被晒伤，记得给它涂抹防晒霜！',  
'一年四季生活顺意，但要注意身体，忙时最好以车代步，不要运动过度。',
'新的一年，财星高照，财运亨通。纵使油价再高也不怕，有钱，任性。 ',
'一年顺风顺水，但是也要防备小人陷害，半道加塞。',
'新的一年总能八面玲珑，眼光六路，耳听八方。但也要小心酒精中毒，莫要酒后驾车。',
'2015虽有不顺，但皆可逢凶化吉，峰回路转。但也要留意交通安全，切忌疲劳驾驶。',
'2015将会告别过去，焕然新生，光芒四射。但也要时刻注意身边的一切，切莫疏忽爱车的美容和保养。',
'一年身体无恙，健健康康。但也勿要疏忽生活小细节，尤其警惕爱车内潜在的致癌物。',
'辣条会有的，爱车也会有的，新的一年，有钱，任性。',
'2015驾驶技术越发炉火纯青，全年零事故。但仍需安全驾驶，勿要随意并线变道。',
'2015所有的阴霾都将属于过去，新的一年，对你重要的事都能顺顺利利，家人平安，行车安全。',
'百尺竿头更进一步，新的一年，离梦想更近了一步，各种豪车尽在眼前，任你挑选。',
'2015桃花盛开，脱单在即。聪明的你记得防犯烂桃花，香车美女可遇不可求。',
'2015年逢考必过，轻松学驾驶,顺利拿驾照,和补考说拜拜。',
'羊年走的是洋运，收的是洋钱，住的是洋房，坐的是洋车，用的是洋货，发的是洋福。',
'之前压抑的心情在羊年会一扫而光，一直缠绕你的问题在新的一年也会峰回路转，驾车行驶时也不要太过于急躁，对待一切事物要有耐心。',
'之前的烦恼“羊”长而去，前程“羊”关大道。涨工资不再是口号，总能开车到处去闲逛。',
'之前你所期待的一切今年会一一实现，美中不足的是受到“五鬼”的影响，行车安全需注意，尤其远离马路上的大货车。',
'2015运势如有神助，全年如阳光普照，诸事至善至美，状态极佳。但也切忌马虎大意，日常出车勤检查，谨防受到意外伤害。'
];
var shareTitle = '2015，赠你一个字，开运一整年';
var shareTxt = shareArr[0]; 
var shareUrl = '';
var sharePic = '';
var resUrl = '';

var winObj = $(window);

var requestAnimFrame = (function () {
    return window.requestAnimationFrame || (window).webkitRequestAnimationFrame || (window).mozRequestAnimationFrame || (window).oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60, new Date().getTime());
    };
})();
var isAndroid = /android/i.test(navigator.userAgent.toLowerCase());
var isWx = /micromessenger/i.test(navigator.userAgent.toLowerCase());
var isYx = /yixin/i.test(navigator.userAgent.toLowerCase());
var fixViewport = function(){
	var phoneWidth =  parseInt(window.screen.width);
	var phoneScale = phoneWidth/640;
	var ua = navigator.userAgent;
	var dpi =  640/phoneWidth*window.devicePixelRatio*160;
	if (/Android.*?(\d+\.\d+)/.test(ua)){
		var version = parseFloat(RegExp.$1);
		if(version<=2.3){
			document.getElementById('viewport').content = 'width=640,target-densitydpi='+dpi;
		} else {
			document.getElementById('viewport').content = 'width=640,user-scalable=no,target-densitydpi='+dpi;
		}
	}
}
//fixViewport();
function is_weixin(){
	var ua = navigator.userAgent.toLowerCase();
	if(/micromessenger|yixin/i.test(ua)){
		return true;
 	} else {
		return false;
	}
}
var params = function(u, paras){
	var url = u;
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
	var paraObj = {}
	for (i=0; j=paraString[i]; i++){
		paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
	}
	var ret = paraObj[paras.toLowerCase()];
	if(typeof(ret)=="undefined"){
		return "";
	}else{
		return ret;
	}
}
/**function getUrlData() {
	var channel = params(location.search, 'c');
	var shareTimes = params(location.search, 'n');
	if(!shareTimes) {
		shareTimes=0;
	}
	var tjurl = 'sm_xz_0123.html?action=enter&c='+channel+'&n='+shareTimes;
	setTimeout(function(){
		nie.config.stats.url.add(tjurl, '进入页面');
	}, 500);
	shareTimes = parseInt(shareTimes)+1;
	shareUrl = shareUrl+'?c='+channel+'&n='+shareTimes;
}
getUrlData();**/
var loader = {
	isShow:false,
	uto:null,
	cbfun:null,
	loadW:0,
	loadH:0,
	total:0,
	loaded:0,
	loadId:'',
	loadBgId:'',
	loadTopId:'',
	backColor:'#000000',
	resize:function(){
		if(!this.isShow) {
			return;
		}
		var per = this.loaded/this.total;
		if(per>1) {
			per = 1;
		}
		var _self = this;
		var ww = $(window).width();
		var lw = ww*0.4;
		var lh = 124*lw/160;
		var ll = (ww-lw)*0.5;
		this.loadW = lw;
		this.loadH = lh;
		var lt = ($(window).height()-lh)*0.5;
		$('#'+_self.loadBgId).width(lw).height(lh).css({'left':ll,'top':lt});
		$('#'+_self.loadTopId).width(lw).height(lh).css({'background-position':'0 -'+lh+'px','clip':'rect('+(lh-lh*per)+'px,'+lw+'px,'+lh+'px,0)','-webkit-transition':'all 0ms linear'});
		setTimeout(function(){
			$('#'+_self.loadTopId).css({'-webkit-transition':'all 300ms linear'});
		},100);
	},
	hide:function(){
		this.isShow = false;
		if(this.cbfun) {
			this.cbfun();
		}
		var _self = this;
		$('#'+this.loadId).css({'-webkit-transition':'all 300ms linear','opacity':'0'});
		setTimeout(function(){
			$('#'+_self.loadId).remove();
		},300);
	},
	show:function(cb, iFileData,bc){
		if(bc) {
			this.backColor = bc;
		}
		this.startTime = +new Date;
		this.loadId = 'Nie_load_id'+this.startTime;
		this.loadBgId = 'Nie_loadBg_id'+this.startTime;
		this.loadTopId = 'Nie_loadTop_id'+this.startTime;
		this.isShow = true;
		this.cbfun = cb;
		var _self = this;
		this.imgData = {};
		this.total = iFileData.length;
		this.loaded = 0;
		for(var i = 0; i < this.total; i++) {
			this.loadImage(iFileData[i]);
		}
		this.resize();
		$(window).resize(function(){
			_self.resize();
		});
	},
	loadImage:function(iData){
		var _this = this;
		var img = new Image();
		img.onload = function () {
			_this.loaded++;
			_this.checkLoadComplete();
		};
		img.onerror = function(){
			_this.loaded++;
			_this.checkLoadComplete();
		}
		img.src = iData;
	},
	checkLoadComplete:function(){
		if(this.loaded == this.total) {
			this.hide();
		} else {
			var per = this.loaded/this.total;
			if(per>1) {
				per = 1;
			}
			$('#'+this.loadTopId).css({'clip':'rect('+(this.loadH-this.loadH*per)+'px,'+this.loadW+'px,'+this.loadH+'px,0)'});
		}
	}
}
var shakeCtrl = {
	isStart:false,
	startTime:0,
	preTime:0,
	data:{},
	handleEvent:function(e){
		switch(e.type) {
			case 'deviceorientation':
				this.shake2(e);
				break;
		}
	},
	shake2:function(e) {
		if(pageCtrl.nowPage!=4) {
			return;
		}
		if(this.preTime==0) {
			this.preTime = +new Date;
		}
		var dt = +new Date - this.preTime;
		var dt2 = +new Date-this.startTime;
		if(dt>100&&this.isStart) {
			this.shakeOver();
		} else {
			if(dt<60) {
				return;
			}
			var a = e.alpha;
			var b = e.beta;
			var g = e.gamma;
			if(!this.data.a) {
				this.data.a = a;
				this.data.b = b;
				this.data.g  = g;
				this.data.n = 1;
			} else {
				var da = parseInt(this.data.a - a);
				var db = parseInt(this.data.b - b);
				var dg = parseInt(this.data.g - g);
				this.data.a = a;
				this.data.b = b;
				this.data.g  = g;
				var ada = Math.abs(da);
				var adb = Math.abs(db);
				var adg = Math.abs(dg);
				if(ada>180) {
					ada = Math.abs(360-ada);
				}
				if(adb>180) {
					adb = Math.abs(360-adb);
				}
				if(adg>180) {
					adg = Math.abs(360-adg);
				}
				if(ada>30||adg>30||adb>30) {
					if(!this.isStart) {
						this.isStart = true;
						this.startTime = +new Date;
						this.shakeStart();
					}
					this.preTime = +new Date;
				}
			}
		}
	},
	shakeOver:function(){
		this.isStart = false;
		this.preTime = 0;
		this.data={};
		pageCtrl.change();
	},
	shakeStart:function(){
	},
	init:function(){
		this.isStart = false;
		this.preTime = 0;
		this.startTime = 0;
		window.addEventListener('deviceorientation', this, false);
	}
}
var posArr = [];
var posArr2 = [];
var compassCtrl = {
	obj:null,
	obj1:null,
	obj2:null,
	obj3:null,
	obj4:null,
	pretime:0,
	alpha:0,
	mypos:0,
	now:0,
	start:false,
	translate:function(obj, tx,ty,rt,speed) {
		var style = obj && obj.style;
		if (!style) return;
		style.webkitTransitionTimingFunction =
		style.transitionTimingFunction = 'ease-out';
		style.webkitTransitionDuration =
		style.transitionDuration = speed + 'ms';
		style.webkitTransform = 'translate('+tx+'px,'+ty+'px) rotate('+rt+'deg) translateZ(0)';
		style.msTransform =
		style.MozTransform =
		style.OTransform = 'translate('+tx+'px,'+ty+'px) rotate('+rt+'deg)';
	},
	handleEvent:function(e) {
		switch(e.type) {
			case 'deviceorientation':
				this.orient(e);
				break;
		}
	},
	orient:function(e){
		if(pageCtrl.nowPage!=3) {
			return;
		}
		var tmp;
                if(e.webkitCompassHeading) {
			tmp = -e.webkitCompassHeading;
                }else {
			tmp = e.alpha-360;
                }
		this.alpha = tmp;
		this.setPos();
	},
	setPos:function(){
		if(!this.start) {
			return;
		}
		this.now = this.now+(this.alpha-this.now)*1;
		this.translate(this.obj, 0,0,this.now, 0);
		var px = (102+220)+220*Math.sin((this.now+this.mypos)*Math.PI/180);
		var py = (260+220)-220*Math.cos((this.now+this.mypos)*Math.PI/180);
		this.translate(this.obj1, px-52,py-54,0, 0);
		var nd = this.getIndex(Math.abs(this.alpha));
		this.obj3.html('<span>'+parseInt(Math.abs(this.alpha))+'°</span>'+posArr[nd]);
		if(Math.abs(this.mypos-Math.abs(this.alpha))<4) {
			this.start = false;
			pageCtrl.show(5);
		}
	},
	getIndex:function(a){
		var dir = 0;
		if (a > 337.5 || a < 22.5) {
			dir = 0;
		} else if (a > 45 - 22.5 && a < 45 + 22.5) {
			dir = 1;
		} else if (a > 90 - 22.5 && a < 90 + 22.5) {
			dir = 2;
		} else if (a > 135 - 22.5 && a < 135 + 22.5) {
			dir = 3;
		} else if (a > 180 - 22.5 && a < 180 + 22.5) {
			dir = 4;
		} else if (a > 225 - 22.5 && a < 225 + 22.5) {
			dir = 5;
		} else if (a > 270 - 22.5 && a < 270 + 22.5) {
			dir = 6;
		} else if (a > 315 - 22.5 && a < 315 + 22.5) {
			dir = 7;
		}
		return dir;
	},
	reset:function(p){
		this.mypos = p;
		this.pretime = +new Date;
		var md = this.getIndex(this.mypos);
		$('.findTxt2').html(posArr2[md]+' '+posArr[md]+' <span>'+this.mypos+'°</span>');
		this.translate($('.arr').get(0), 0,0,this.mypos, 100);
		this.start = true;
		this.setPos();
	},
	init:function(){
		this.obj = $('.lpCon').get(0);
		this.obj1 = $('.peoNow').get(0);
		this.obj3 = $('.findTxt3');
		this.pretime = +new Date;
		if (window.DeviceOrientationEvent) {
			window.addEventListener('deviceorientation', this, false);
		}
	}
}
var pageCtrl = {
	nowPage:'',
	pos:0,
	word:0,
	peo:0,
	show:function(p){   
			this.peo = parseInt(Math.random()*200)%20;  
			$('.peoCon').html('<img src="'+resUrl+'images/p'+(this.peo+1)+'.png" />');
			$('.pTxt').html(descArr[this.peo]); 
		if(this.nowPage) {
			pageCtrl.fade($('#pageCon').get(0), 0, 300);
			setTimeout(function(){
				$('#con'+pageCtrl.nowPage).hide();
				pageCtrl.nowPage=p;
				$('#con'+pageCtrl.nowPage).show();
				pageCtrl.fade($('#pageCon').get(0), 1, 300);
			}, 300);
		} else {
			this.nowPage=p;
			$('#con'+p).show();
		}
	},
	translate:function(obj, dist,speed) {
		var style = obj && obj.style;
		if (!style) return;
		style.webkitTransitionTimingFunction =
		style.transitionTimingFunction = 'ease-out';
		style.webkitTransitionDuration =
		style.transitionDuration = speed + 'ms';
		style.webkitTransform = 'translate(' + dist + 'px,0px)' + 'translateZ(0)';
		style.msTransform =
		style.MozTransform =
		style.OTransform = 'translate(' + dist + 'px,0px)';
	},
	change:function(){
		this.show(5);
	},
	fade:function(obj, o,speed) {
		var style = obj && obj.style;
		if (!style) return;
		style.webkitTransitionTimingFunction =
		style.transitionTimingFunction = 'ease-in';
		style.webkitTransitionDuration =
		style.transitionDuration = speed + 'ms';
		style.webkitTransform = 'translateZ(0)';
		style.opacity = o;
	},
	resize:function(e){
		var wh = winObj.height();  
		var pw = 640;
		var ph = 1036;
		var tww = winObj.width();
		var twh = winObj.height();
		var wh = twh*640/tww;
		$('#main').height(wh);
		if(wh<800) {
			$('#main').height(800);
			wh = 800;
		} else if(wh>1036) {
			wh = 1036;
		}
		var sc = tww/640;
		var tw = Math.min(0,-(640-tww)*0.5);
		$('#main').css({'-webkit-transform':'translate3d('+tw+'px, 0px, 0px) scale('+sc+')'});

		$('#pmid').css({'top':wh*(352/950)});
		$('#pbot').css({'top':wh*(580/950)});
		var zwsc = 1
		zwsc = Math.min(1,(wh-680)/257);

		$('#zwCon').css({'-webkit-transform':'scale('+zwsc+')'});
		$('.t6').css({'top':270-(1-zwsc)*(150)});
		$('#con2').css({'top':(wh-1036)*0.5});
		$('#con3').css({'top':(wh-1036)*0.5});
		$('#con4').css({'top':(wh-1036)*0.5});
		var sc = 1;
		if(wh<900) {
			sc = (360-(900-wh))/360
		}
		$('.peoCon').css({'top':wh*(150/950)});
		$('.peoCon img').css({'-webkit-transform':'scale('+sc+')'});
		$('.txtCon').css({'top':wh*(480/950)});
		$('.sBtn').css({'top':wh*(870/950)});
		$('.hBtn').css({'top':wh*(870/950)});
	},
	init:function(){
		$('.ipic').each(function(){
			$(this).attr('src',$(this).attr('data-pic'));
		});
		$('.pic').each(function(){
			var img = new Image();
			img.src = $(this).attr('data-pic');
			$(this).css({'background':'url('+$(this).attr('data-pic')+') no-repeat','backgroundSize':'100%'});
		});
		$('.pic_nc').each(function(){
			var img = new Image();
			img.src = $(this).attr('data-pic');
			$(this).css({'background':'url('+$(this).attr('data-pic')+') no-repeat','backgroundSize':'100%'});
			$(this).html('');
		});
		$(".startBtn").click(function(){
			pageCtrl.show(2);
		}); 
		$('.btn').each(function(){
			var ismove = false;
			this.addEventListener('touchstart', function(e){
				ismove = false;
				var ob = $(this).data('ob');
				$(this).css({'background-position':'0 -'+ob+'px'});
			},false,false);
			this.addEventListener('touchmove', function(e){
				ismove = true;
			},false,false);
			this.addEventListener('touchend', function(e){
				e.preventDefault();
				$(this).css({'background-position':'0 0'});
				if(ismove) {
					ismove = false;
					return;
				}
				var id = $(this).attr('id');
				switch(id) {
					case "startBtn": 
						pageCtrl.show(2);
						break; 
					case "maskbg":
						$('#maskbg').hide();
						$('#wxtips').hide();
						break;
				}
			},false,false);
		});
		var uto;
		var isClick=false;
		$('.cbtn').click(function(){
			pageCtrl.show($(this).data('todis'));
		});
		var dis = params(location.search, 'dis');
		var p = params(location.search, 'p');
		var w = params(location.search, 'w');
		if(w) {
			this.peo = p;
			this.word= w;
			this.show(7);
		} else {
			this.show(1);
		}
		this.pos = parseInt(Math.random()*350)+5;
		var isChg = false;
		$('#zwCon').get(0).addEventListener('touchstart',function(e){
			e.preventDefault();
			isChg = false;
			$('#zwArr1').removeClass('zwArr1');
			$('#zwCon').addClass('dis');
			uto = setTimeout(function(){
				isChg = true;
				$('#con1').hide();
				pageCtrl.fade($('#pageCon').get(0), 1, 300);
				pageCtrl.nowPage = 2;
				$('#con2').show();
				$('.pos').html(pageCtrl.pos);
				var md = compassCtrl.getIndex(pageCtrl.pos);
				$('.pos2').html(posArr2[md]+' '+posArr[md]+' <span>'+pageCtrl.pos+'°</span>');
			}, 100);
		},false);
		$('#zwCon').get(0).addEventListener('touchend',function(e){
			e.preventDefault();
			if(uto) {
				clearTimeout(uto);
			}
			if(!isChg) {
				$('#zwArr1').addClass('zwArr1');
				$('#zwCon').removeClass('dis');
			}
		},false);
		compassCtrl.init();
		shakeCtrl.init();
		this.resize();
		winObj.resize(function(){
			pageCtrl.resize();
		});
	}
}
$(function(){
	loader.show(function(){
		$('#main').show();
		pageCtrl.init();
	}, [ 
		resUrl+'images/t1.png',
		resUrl+'images/t2.png',
		resUrl+'images/t3.png', 
		resUrl+'images/t5.png',
		resUrl+'images/logo.png', 
	]);
})
var onBridgeReady = function () {
	var jsb = window.WeixinJSBridge||window.YixinJSBridge;
	jsb.call('showOptionMenu');
	var appId = '';
	// 发送给好友;
	jsb.on('menu:share:appmessage', function(argv){
		var imgUrl = sharePic;
		var link = shareUrl;
		var title = shareTitle;
		var shareDesc = shareTxt;
		jsb.invoke('sendAppMessage',{
		'img_url' : imgUrl,
		'img_width' : '640',
		'img_height' : '640',
		'link' : link,
		'desc' : title,
		'title' : shareDesc
		}, function(res) {
			$('#maskbg').hide();
			$('#wxtips').hide();
			if(res.err_msg != 'send_app_msg:cancel' && res.err_msg != 'share_timeline:cancel') {
				try{
					nie.config.stats.url.add('sm_xz_0123.html?action=hy', '分享到好友圈');
				}catch(e){
				} 
			}
		});
	});
	// 分享到朋友圈;
	jsb.on('menu:share:timeline', function(argv){
		var imgUrl = sharePic;
		var link = shareUrl;
		var title = shareTitle;
		var shareDesc = shareTxt;
		jsb.invoke('shareTimeline',{
		'img_url' : imgUrl,
		'img_width' : '640',
		'img_height' : '640',
		'link' : link,
		'desc' : shareDesc,
		'title' : shareDesc
		}, function(res) {
			$('#maskbg').hide();
			$('#wxtips').hide();
			if(res.err_msg != 'send_app_msg:cancel' && res.err_msg != 'share_timeline:cancel') {
				try{
					nie.config.stats.url.add('sm_xz_0123.html?action=py', '分享到朋友圈');
				}catch(e){
				}
			 
			}
		});
	});
};
if(document.addEventListener){
	document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	document.addEventListener('YixinJSBridgeReady', onBridgeReady, false);
} else if(document.attachEvent){
	document.attachEvent('WeixinJSBridgeReady' , onBridgeReady);
	document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
	document.attachEvent('YixinJSBridgeReady' , onBridgeReady);
	document.attachEvent('onYixinJSBridgeReady' , onBridgeReady);
}