<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"  import="java.util.*" import="java.io.*"%>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<meta http-equiv="x-ua-compatible" content="IE=9" />
<!--[if lt IE 8]>
<meta http-equiv="x-ua-compatible" content="IE=EmulateIE8" />
<![endif]-->
<title>养车宝渠道自管理系统-登录</title> 
<script type="text/javascript" src='extra/jquery-1.9.1.js'></script>
<script type="text/javascript" src="js/index.js"></script>
<script type="text/javascript" src="js/cs_base.js"></script>
<script type="text/javascript" src="js/md5.js"></script>
<script type="text/javascript" src="extra/LAB.js"></script>
<script type="text/javascript" src="scripts/plugin/loading.js"></script> 
<link rel="icon" href="css/images/ICON-16-16-2.png" type="image/png" >
<script type="text/javascript">
    var url = window.location.href; 
	var PATH = "";
	if(url.indexOf("channel.yangchebao.com.cn")>-1){ 
	}else{
		PATH = "/yangchebao-channel"
	} 
	$.jRadLoading({app:PATH,type:'css'}); 
    $.jRadLoading({app:PATH,type:'js'});
</script> 
<link rel="stylesheet" type="text/css" href="./css/login.css"/>
</head>
<body>
<div class="login-wrap">
	<div class="login-container">
		<h1><img src="css/images/logo.png" alt="养车宝渠道后台"/></h1>
		<div class="login-content">
			<div class="related" id="imgScroll">
			   	<div>
					<img src="css/images/yangchebao_login_1.png"/> 
				</div>
			</div>
			<div class="login-content-main">
				<div>
					<ul>
						<li>
							<div class="login-input" >
								<span class="icon login-name-icon"></span><input id="email" type="text" value="" onBlur="javascript:index.checkUserLoginOneFocus(this.id);" onFocus="javascript:index.removeerrorInfo('emailerror');"  onkeydown="do_if_return(event, index.newSubmit)" placeholder="用户名\邮箱"/>
							</div>
							<div id="emailerror" class="on-error" style="display:none">请输入登录邮箱</div>
						</li>
						<li>
							<div class="login-input">
								<span class="icon login-password-icon"></span><input id="password" type="password" value="" onBlur="javascript:index.checkUserLoginOneFocus(this.id);" onFocus="javascript:index.removeerrorInfo('errorInfo');" onKeyDown="do_if_return(event, index.newSubmit)" placeholder="密码"/>
							</div>
							<div id="errorInfo" class="on-error" style="display:none">请输入密码</div>
						</li>
						<li>
							<span class="block input-icon input-icon-right">
								<span class="captcha-input-box"><input id="captcha" style="width:95px;background-color:#fff;height:22px;padding:5px;border:1px solid #dfe0e0;color:#666;font-family:Arial,'微软雅黑'; border-radius:2px;" type="text" onfocus="javascript:index.removeerrorInfo('captchaerror');" onBlur="javascript:index.checkUserLoginOneFocus(this.id);" placeholder="请输入验证码" onkeydown="do_if_return(event, index.newSubmit)" />
								<img src="/channel-euc/ws/0.1/captcha" alt="验证码" title="点击图片刷新验证码" style="margin:0 5px;" align="absmiddle" id="captchimg" class="captcha-img" onclick="index.refreshCaptchaImg('captchimg');return false;" /></span> 
							</span>
							<div id="captchaerror" class="on-error" style="display:none">请输入验证码</div>
						</li>
					</ul>
					<a style="width: 100%; display: block; text-align: right; color: rgb(47, 169, 239); margin: 24px 0px 10px;"  onclick='$.jRadAlert("请联系客服重置密码,客服电话 010-5897 8999。", "waring","","-1");'>忘记密码？</a>
					<input id="domain" type="hidden" value="10"/>
					<div class="buttons-wrap">
						<span id="loginBtn" class="ui-btn-login" onClick="index.newSubmit()">登&nbsp;录</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

</body>
</html>
