$(function(){
	// qrcode
	$('div.top_con li.weixin_qrcode a').unbind('click').bind('click',function(){
		if($(this).parent().find('div.qrcode').is(':hidden')){
			$(this).parent().find('div.qrcode').stop(false,true).slideDown();
			$(this).parent().addClass('qrcode_show');
			$(this).find('img').attr('src','img/up_img.png')
		}else{
			$(this).parent().find('div.qrcode').stop(false,true).slideUp();
			$(this).parent().removeClass('qrcode_show');
			$(this).find('img').attr('src','img/down_img.png')
		}
	});
	// nav
	if($.getQuery("type")==1){
		$('div.nav div.nav_con ul li.hotCake a').addClass('navClick').parent().siblings().find('a').removeClass('navClick')
	}else if($.getQuery("type")==2){
		$('div.nav div.nav_con ul li.classify a').addClass('navClick').parent().siblings().find('a').removeClass('navClick')
	}else{
		$('div.nav div.nav_con ul li.carType a').addClass('navClick').parent().siblings().find('a').removeClass('navClick')
	}
	$('div.nav div.nav_con ul li a').hover(function(){
		$(this).addClass('navHover');
		$(this).parent().siblings().find('a').removeClass('navHover')
	},function(){
		$(this).removeClass('navHover')
	})
})