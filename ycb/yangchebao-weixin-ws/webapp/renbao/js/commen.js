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
	if((window.location.href).indexOf('weixin.yangchebao.com.cn')!=-1){
		return 'weixin.yangchebao.com.cn'
	}else{
		return 'wxtest.yangchebao.com.cn'
	}
}
var share=function(sharedata){  
	var _postData={};
	sharedata.desc = "养车宝携手中国人寿联合推出五折车险！！！";
	$.ajax({
		url:'/yangchebao-weixin-ws/ws/0.1/weixin/getJsapiConfig?url='+encodeURIComponent(location.href.split('#')[0]),
	    async: false,
	    dataType: 'json',
	    success: function(data) {  
	        _postData = data;
	    }
	});
	wx.config({
	    debug:false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	    appId: _postData.appId, // 必填，公众号的唯一标识
	    timestamp: _postData.timestamp, // 必填，生成签名的时间戳
	    nonceStr: _postData.nonceStr, // 必填，生成签名的随机串
	    signature: _postData.signature,// 必填，签名，见附录1
	    jsApiList: ['onMenuShareTimeline','onMenuShareQQ','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
	wx.ready(function(){
	// wx.checkJsApi({
	//     jsApiList: ['onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
	//     success: function(res) {
	//     	alert(JSON.stringify(res));
	//         // 以键值对的形式返回，可用的api值true，不可用为false
	//         // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
	//     }
	// }); 
		wx.onMenuShareTimeline({ 
		    title:sharedata.title, // 分享标题
		    link: sharedata.shareUrl,// 分享链接 
		    desc: sharedata.desc, // 分享描述
		    imgUrl:sharedata.headImgUrl// 分享图标
		    // trigger:function(res){
		    // 	alert('点击分享到朋友圈')
		    // },
		    // success: function (res) { 
		    // 	alert('已分享')
		    //     // 用户确认分享后执行的回调函数
		    // },
		    // cancel: function (res) { 
		    // 	alert('已取消')
		    //     // 用户取消分享后执行的回调函数
		    // },
		    // fail:function(res){
		    // 	 alert(JSON.stringify(res))
		    // }
		});
		wx.onMenuShareAppMessage({
		    title: sharedata.title, // 分享标题
		    desc: sharedata.desc, // 分享描述
		    link: sharedata.shareUrl,// 分享链接 
		    imgUrl: sharedata.headImgUrl // 分享图标
		    // type: '', // 分享类型,music、video或link，不填默认为link
		    // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		});
		wx.onMenuShareQQ({
		    title: sharedata.title, // 分享标题
		    desc: sharedata.desc, // 分享描述
		    link: sharedata.shareUrl,// 分享链接 
		    imgUrl: sharedata.headImgUrl// 分享图标
		})
	});
}