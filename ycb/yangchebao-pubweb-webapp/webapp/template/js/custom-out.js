var paramJson = {};
	var wait = 60;
	var activityUrl = '';
	
	$(function(){
        // 获取参数
		var url = window.location.search; 
	    

	    if(url!=''){
	    	var paramsArr = (url.split("?")[1]).split("&");
		    $.each(paramsArr,function(i){
		        var item = paramsArr[i].split("=");
		        paramJson[item[0]] = item[1]
		    });
	    }

	    //自适应宽高度
	    var uiW = $('.ui-input').outerWidth();
	    $('.ui-code').width(uiW*0.46+'px');
	    $('.ui-input input[name="code"]').width(uiW*0.54 - 20+'px');

	    var uiH = $('.ui-input').outerHeight();
	    $('.ui-code').height(uiH - 22 +'px');
	    $('.ui-code').css('line-height',uiH -22+'px');

	    $('.ui-code').css('top',uiH + 5+'px');

	    $('title').text(decodeURIComponent($('title').text()));

	    //trench.getCode()   渠道编码格式是10位数字 如：2016062301
	    if(paramJson.channel && paramJson.channel.length >=10) {
	    	var trenchCode = paramJson.channel.substring(0,10);
	    	var activityId = paramJson.channel.substring(10);
	    	paramJson.trenchCode = trenchCode;
	    	paramJson.activityId = activityId;
	    }

	    //禁用微信分享
		function onBridgeReady(){
			WeixinJSBridge.call('hideOptionMenu');
		}

		if(typeof WeixinJSBridge == "undefined"){
		if(document.addEventListener){
			document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
			}else if(document.attachEvent){
				document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
				document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			}
		}else{
			onBridgeReady();
		}

	    //获取验证码
	    $(".ui-code").unbind("click").bind("click", function() {
	    	var number = $("input[name='number']").val();
	    	if($.trim(number) == '') {
	    		errorLog("请输入手机号");
	    		return false;
	    	}

	    	if(!/^1[0-9]{10}$/.test(number)){
	    		errorLog("输入正确格式的手机号码");
			    return false;
			}
			codeBtnClick(number);
	    });

	    //dialog确认
	    $(".confirm").unbind("click").bind("click", function(){
	    	$('.dialog-content p').html('');
    		$('.dialog').height($(".dialog-content").height()+'px');
	    	$(".dialog").hide();
	    	$(".dialog-overlay").hide();
	    });
	    //点击领取
	    $('.btn').unbind("click").bind("click", function(){
	    	var number = $("input[name='number']").val();
	    	if($.trim(number) == '') {
	    		errorLog("请输入手机号");
	    		return false;
	    	}

	    	if(!/^1[0-9]{10}$/.test(number)){
	    		errorLog("输入正确格式的手机号码");
			    return false;
			}

			var verifyCode = $("input[name='code']").val();
			if($.trim(verifyCode) == '') {
				errorLog("请输入验证码");
				return false;
			}

			var exchangeCode = $("input[name='exchangeCode']").val();
			if($.trim(exchangeCode) == '') {
				errorLog("请输入兑换码");
				return false;
			}

			$('.loading').show();
			$('.dialog-overlay').show();

			var postData = {};
	    	postData.mobile = number;
	    	postData.verifyCode = verifyCode;

	    	//先获取customerid
	    	$.ajax({
	    		url:'/yangchebao-app-ws/ws/0.1/appOutside/login',
				type:'post',
				async:false,
				data:$.toJSON(postData),
				contentType:'application/json;charset=utf-8',
				success:function(data){
					if(data.flag == 1) {
						paramJson.customerId = data.userInfo.customerId;
						var postData2 = {};
						postData2.exchangeCode = exchangeCode;
						postData2.customerId = paramJson.customerId;
						postData2.trenchCode = paramJson.trenchCode;
						postData2.activityId = paramJson.activityId;

						$.ajax({
							url: '/yangchebao-app-ws/ws/0.1/convertPrize/getPrizeByCode',
							type:'post',
							async:false,
							data:$.toJSON(postData2),
							contentType:'application/json;charset=utf-8',
							success:function(data){
								setTimeout(function(){
									$('.loading').hide();
									$('.dialog-overlay').hide();

									if(data.statusCode == '207') {
										if(data.msg == '') {
											window.location.href="http://app.yangchebao.com.cn/yangchebao-pubweb/template/success-out.html";
										} else {
											activityUrl = data.msg;
											var curUrl = window.location.href;
											var curProLength = window.location.protocol.length;
											var fullDomain = curUrl.substring(0,curProLength+2+curUrl.substring(curProLength+2).indexOf('/')+1);

											if(activityUrl.indexOf(fullDomain) == -1) {
												window.location.href=activityUrl;
											} else {
												$.ajax({
										    		url:activityUrl,
										    		type:'get',
										    		success:function(data) {
										    			window.location.href=activityUrl;
										    		},
										    		error:function(data) {
										    			window.location.href="http://app.yangchebao.com.cn/yangchebao-pubweb/template/loading-fail.html";
										    		}
										    	});
											}
											
										}
										
									} else if(data.statusCode == '200'){
										window.location.href="http://app.yangchebao.com.cn/yangchebao-pubweb/template/result-pending.html";
									} else if(data.statusCode == '201') {
										window.location.href="http://app.yangchebao.com.cn/yangchebao-pubweb/template/result-done.html";
									} else {
										errorLog(data.msg);
										return false;
									}
								},500);
								
								
							},
							error: function(xhr) {
								$('.loading').hide();
								$('.dialog-overlay').hide();
								var mes = eval('('+xhr.responseText+')'); 
								errorLog(mes[0].message);
							}
						})

						
					} else {
						$('.loading').hide();
						$('.dialog-overlay').hide();
						errorLog(data.message);
						return false;
					}
					
				},
				error:function(xhr){
					$('.loading').hide();
					$('.dialog-overlay').hide();
					var mes = eval('('+xhr.responseText+')'); 
					errorLog(mes[0].message);
				}
	    	})


	    });

	});

	var errorLog = function(msg) {
    	$('.dialog-content p').html(msg);
    	$('.dialog').show();
    	$('.dialog').height($(".dialog-content").height()+'px');
    	$('.dialog-overlay').show();
    }

    function time(number) {
		var o = $("div.ui-code");
		if (wait == 0) {
			o.unbind('click').bind('click',function(){
				var number = $("input[name='number']").val();
		    	if($.trim(number) == '') {
		    		errorLog("请输入手机号");
		    		return false;
		    	}

		    	if(!/^1[0-9]{10}$/.test(number)){
		    		errorLog("输入正确格式的手机号码");
				    return false;
				}
				codeBtnClick(number)
			});
			o.css('cursor','pointer');
			o.html("获取验证码"); 
			wait = 60;
		} else {
			o.unbind('click');
			o.css('cursor','default');
			o.html('还剩'+ wait + "秒");
			wait--;
			setTimeout(function() {
				time(number);//循环调用
			},
			1000)
		}
	}

	//发送验证码
	function codeBtnClick(number){
		
		$.ajax({
			type:'get',
			url:'/yangchebao-app-ws/ws/0.1/appOutside/sendVerifycode?mobile='+number,
			dataType:'json',
			async:false,
			contentType:'application/json;charset=utf-8',
			success:function(data){
				if(data.statusCode == "200") {
					errorLog('向'+number+'成功发送验证码！');
				} else {
					errorLog(data.msg);
				}
				
			}
		});
		time(number);
	}