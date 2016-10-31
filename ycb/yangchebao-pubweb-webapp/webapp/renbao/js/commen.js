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
// 获取customerId
var getCustomerId=function(id){
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