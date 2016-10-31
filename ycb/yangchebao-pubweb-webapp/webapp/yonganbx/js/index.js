function alertTasat(msg){
			var _html = $("<div>").addClass("tasat-wrap")
            var _span = $("<span>").addClass("tasat").html(msg);
			$("body").append(_html.append(_span));
			_html.fadeIn();
			window.setTimeout(function(){
				_html.fadeOut(function(){
					_html.remove();
				});
			}, 1500);   
} 
 
function getPath(){  
	//return  "http://172.18.180.11/yangchebao-pubweb/yonganbx/";
	return  "http://app.yangchebao.com.cn/yangchebao-pubweb/yonganbx/"; 
}
function getIp(){  
	//return  "http://172.18.180.11/yangchebao-pubweb/";
	return  "http://app.yangchebao.com.cn/yangchebao-pubweb/"; 
}
function getCustomerId(id){
	var customerId = "";
	$.ajax({
			url: '/yangchebao-app-ws/ws/0.1/user/userinfo/getCustomerId?userInfoId='+id,
			type: 'get',
			async: false,
			dataType: 'json',
			success: function(data) {  
				if(data.customerId!=""&&data.customerId!=undefined){ 
				 customerId = data.customerId; 
				}else{
				 customerId = -1; 
				}
			},error:function(){ 
				customerId = -1;
			}
		});
	return customerId;
}  
function isLogin(url){ 
	if(paramJson.customerId=='' || paramJson.customerId==null || paramJson.customerId=='null' || paramJson.customerId==undefined){
		window.location.href = url;
	}else{   
		var customerId = getCustomerId(paramJson.userId); 
		if(customerId=="-1"){
		window.location.href = "http://w2l?presentType=2&androidName=8&iosName=LoginViewController"; 
		}else{			
		window.location.href = url;
		}				
	}
}
 