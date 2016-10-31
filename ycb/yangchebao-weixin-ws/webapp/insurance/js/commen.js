function share(sharedata){ 
	if(sharedata.channel !=undefined&&sharedata.channel =="1"){
		 sharedata.title = "养车宝车险报价查询！" // 分享标题 
		 sharedata.imgUrl = "http://weixin.yangchebao.com.cn/yangchebao-weixin-ws/salesman/css/images/share_img.jpg";
	}
	sharedata.desc = "快来查询你的车险啦，比市场价低25%哦！不需输入手机号，拒绝骚扰电话！";
	var _postData={};
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
		    imgUrl:sharedata.imgUrl// 分享图标
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
		    imgUrl: sharedata.imgUrl // 分享图标
		    // type: '', // 分享类型,music、video或link，不填默认为link
		    // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		});
		wx.onMenuShareQQ({
		    title: sharedata.title, // 分享标题
		    desc: sharedata.desc, // 分享描述
		    link: sharedata.shareUrl,// 分享链接 
		    imgUrl: sharedata.imgUrl// 分享图标
		})
	});
}
function setCookie(c_name,value,expiredays)
{
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
function getCookie(c_name)
{
	if (document.cookie.length>0)
	  {
	  c_start=document.cookie.indexOf(c_name + "=")
	  if (c_start!=-1)
		{ 
		c_start=c_start + c_name.length+1 
		c_end=document.cookie.indexOf(";",c_start)
		if (c_end==-1) c_end=document.cookie.length
		return unescape(document.cookie.substring(c_start,c_end))
		} 
	  }
	return ""
}
function getDesc(score){
	var desc = "";
	score = parseInt(score);
	if(score>30||score==30){
		desc = "十世行善 人品冲天，";
	}else if(score<30&&score>15){
		desc = "紫气东来 好运不断，";
	}else if(score<=15&&score>=1){
		desc = "否极泰来 时来运转，";
	}else{
		desc = " 衰神上身 小手一抖，"; 
	}
	return desc;
}
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