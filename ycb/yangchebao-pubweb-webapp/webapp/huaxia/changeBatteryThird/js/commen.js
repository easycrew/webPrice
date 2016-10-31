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
		return '106.2.213.122:10081'
	}
}