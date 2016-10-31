	
	var paramJson = {};
	var trenchCode ='';
	var activityId = '';
	var activityUrl = '';

	//强制登录
	var index = {};
	var paramJson = {};
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
	  paramJson = info;
	};
	
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

	    //自适应宽度
	    var uiW = $('.ui-input').outerWidth();
	    $('.ui-code').width(uiW*0.46+'px');
	    $('.ui-input input[name="code"]').width(uiW*0.54 - 20);

	    $('title').text(decodeURIComponent($('title').text()));

	    //trench.getCode()   渠道编码格式是10位数字 如：2016062301
	    if(paramJson.channel && paramJson.channel.length >=10) {
	    	trenchCode = paramJson.channel.substring(0,10);
	    	activityId = paramJson.channel.substring(10);
	    }

	    //dialog确认
	    $(".confirm").unbind("click").bind("click", function(){
	    	$('.dialog-content p').html('');
    		$('.dialog').height($(".dialog-content").height()+'px');
	    	$(".dialog").hide();
	    	$(".dialog-overlay").hide();
	    });
	    //点击领取
	    $('.btn').unbind("click").bind("click", function(){
	    	if(paramJson.customerId=='' || paramJson.customerId==null || paramJson.customerId=='null' || paramJson.customerId==undefined){  
				window.location.href = "http://w2l?presentType=2&androidName=8&iosName=LoginViewController";  
			} else {

		    	var exchangeCode = $("input[name='exchangeCode']").val();
				if($.trim(exchangeCode) == '') {
					errorLog("请输入兑换码");
					return false;
				}

				$('.loading').show();
				$('.dialog-overlay').show();

		    	var postData = {};
				postData.exchangeCode = exchangeCode;
				postData.customerId = paramJson.customerId;
				postData.trenchCode = trenchCode;
				postData.activityId = activityId;

				$.ajax({
					url: '/yangchebao-app-ws/ws/0.1/convertPrize/getPrizeByCode',
					type:'post',
					async:false,
					data:$.toJSON(postData),
					contentType:'application/json;charset=utf-8',
					success:function(data){
						setTimeout(function(){
							$('.loading').hide();
							$('.dialog-overlay').hide();

							if(data.statusCode == '207') {
								if(data.msg == '') {
									window.location.href="http://app.yangchebao.com.cn/yangchebao-pubweb/template/success-in.html";
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
						}, 500);
						
						
					},
					error: function(xhr) {
						$('.loading').hide();
						$('.dialog-overlay').hide();
						var mes = eval('('+xhr.responseText+')'); 
						errorLog(mes[0].message);
					}
				})
			}


	    });

	});

	var errorLog = function(msg) {
    	$('.dialog-content p').html(msg);
    	$('.dialog').show();
    	$('.dialog').height($(".dialog-content").height()+'px');
    	$('.dialog-overlay').show();
    }