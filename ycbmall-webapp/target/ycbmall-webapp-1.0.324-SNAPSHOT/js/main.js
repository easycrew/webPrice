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
	}else if($.getQuery("type")==3){
		$('div.nav div.nav_con ul li.carType a').addClass('navClick').parent().siblings().find('a').removeClass('navClick')
	}else{
		$('div.nav div.nav_con ul li.hotCake a').addClass('navClick').parent().siblings().find('a').removeClass('navClick')
	};
	$('div.nav div.nav_con ul li a').hover(function(){
		$(this).addClass('navHover');
		$(this).parent().siblings().find('a').removeClass('navHover')
	},function(){
		$(this).removeClass('navHover')
	});
	// area
	$('p.areaFirst').unbind('click').bind('click',function(){
		if($('ul.areaList').is(':hidden')){
			$('p.areaFirst img').attr('src','img/areaUp.png');
			$(this).parent().addClass('areaFirstClick');
			$('ul.areaList').stop(false,true).slideDown();
			$('ul.areaList li').each(function(){
				var _areaStr=$(this).find('p').text()+' ';
				if($('p.areaFirst').text()==_areaStr){
					$(this).find('p').addClass('areaListP_select');
					$(this).siblings().find('p').removeClass('areaListP_select')
				}
			});
			$('ul.areaList li p').hover(function(){
				$(this).addClass('areaListP_hover');
				$(this).parent().siblings().find('p').removeClass('areaListP_hover')
			},function(){
				$(this).removeClass('areaListP_hover')
			})
		}else{
			$('p.areaFirst img').attr('src','img/areaDown.png');
			$('ul.areaList').stop(false,true).slideUp();
			$(this).parent().removeClass('areaFirstClick')
		}
	});

	$('ul.ul-search-first li.area').on('click','ul.areaList li p',function(){
	var selectArea=$(this).html();
	$('p.areaFirst span').html(selectArea+' ');
	$('p.areaFirst img').attr('src','img/areaDown.png');
	$('ul.areaList').stop(false,true).slideUp();
		$('ul.ul-search-first li.area').removeClass('areaFirstClick')
    });

	$.get(mall.url('/areaCode/list'),function(data){
		var areaStr='';
		$.each(data,function(i){
			areaStr+='<li><p class="'+data[i].areacodeId+'">'+data[i].areaname+'</p></li>'
		});
		$('ul.areaList').html(areaStr)
	});

	// login
	$('li.login a').click(function(){
		$('div.Form-login').show();
		$('div.login-dialog-overlay').show()
	});
	// function setCookie(name,value){
	// 	var days=30;
	// 	var exp=new Date();
	// 	exp.setTime(exp.getTime()+days*24*60*60*1000);
	// 	document.cookie=name+'='+escape(value)+';expires='+exp.toGMTString()
	// }
	//登录确定
	$('div.top').on('click','span.dialog-login',function(){
		if($('input[name="username"]').val()!=''&&$('input[name="password"]').val()!='')
		$('form.form-login-detail').submit();
		if($('input[name="username"]').val()==''){
			$('form.form-login-detail p.ui-note').html('请填写账号')
		}else if($('input[name="password"]').val()==''){
			$('form.form-login-detail p.ui-note').html('请填写密码')
		}
	})
	
})
