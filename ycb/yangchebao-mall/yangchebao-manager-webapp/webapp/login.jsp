<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"  import="java.util.*" import="java.io.*"%>
<%@ taglib prefix="sae" uri="sae.tld" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>养车宝配件商城后台管理系统</title>
<script type="text/javascript" src="extra/jquery-1.8.1.min.js"></script>
<script type="text/javascript" src="./js/index.js"></script>
<script type="text/javascript" src="./js/cs_base.js"></script>
<script type="text/javascript" src="./js/md5.js"></script>
<style type="text/css">
body {
    color: #393939;
    font-family: '微软雅黑';
    font-size: 12px; 
	background:#bababa url("css/images/login-bg.JPG") repeat-x scroll 0 0; 
}
.login-container {
    margin: 0 auto;
    padding-top: 100px;
    width: 375px;
} 
.login-layout .widget-box.visible {
    transform: scale(1, 1) translate(0px);
    transition: all 0.3s ease 0s;
    visibility: visible;
}
.login-layout .widget-box {
    border-bottom: medium none;
    box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.2);
    margin: 0;
    overflow: hidden;
    position: absolute;
    transform: scale(0, 1) translate(-150px); 
    width: 100%;
	background-color:#fff;
	border-bottom: 2px solid #597597;
} 
.blue {
    color: #478FCA;
}
h2 {
    font-size: 16px;
    font-weight: normal;
} 
.position-relative {
    position: relative;
}
.header.blue {
    border-bottom-color: #C0D7EA;
}
.header {
    border-bottom: 1px solid #CCCCCC;
    line-height: 28px;
    margin-bottom: 10px;
    padding-bottom: 4px;
}
.lighter {
    font-weight: lighter;
}
.login-layout .widget-box .widget-main {
    padding: 16px 36px 36px;
}
fieldset {
    border: 0 none;
    margin: 0;
    padding: 0;
}

.login-layout label {
    margin-bottom: 11px;
}
label, .lbl {
    vertical-align: middle;
}
label {
    display: block;
    margin-bottom: 5px;
}
label, input, button, select, textarea {
    font-size: 14px;
    font-weight: normal;
    line-height: 20px;
}
.row-fluid [class*="span"] {
    -moz-box-sizing: border-box;
    display: block;
    float: left;
    margin-left: 2.12766%;
    min-height: 30px;
    width: 100%;
}
input[type="text"],input[type="password"]{
    background-color: #FFFFFF;
    border: 1px solid #CCCCCC;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
    transition: border 0.2s linear 0s, box-shadow 0.2s linear 0s;
	border-radius: 4px 4px 4px 4px;
    color: #555555;
    display: inline-block;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    margin-bottom: 10px;
    padding: 4px 6px;
    vertical-align: middle;
}
input[type="text"]:focus, input[type="password"]:focus{
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.6);
    outline: 0 none;
}
.btn-primary {
    background-color: #006DCC;
    background-image: linear-gradient(to bottom, #0088CC, #0044CC);
    background-repeat: repeat-x;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    color: #FFFFFF;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
}
.row-fluid .span4 {
    width: 31.6239%;
}
.btn-small {
    border-radius: 3px 3px 3px 3px;
    font-size: 11.9px;
    padding: 2px 10px;
}
.btn {
    -moz-border-bottom-colors: none;
    -moz-border-left-colors: none;
    -moz-border-right-colors: none;
    -moz-border-top-colors: none; 
    background-repeat: repeat-x;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) #B3B3B3;
    border-image: none;
    border-radius: 4px 4px 4px 4px;
    border-style: solid;
    border-width: 1px;
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2) inset, 0 1px 2px rgba(0, 0, 0, 0.05); 
    cursor: pointer;
    display: inline-block; 
    line-height: 20px;
    margin-bottom: 0;
    padding: 4px 12px;
    text-align: center; 
    vertical-align: middle;
}

.row-fluid [class*="span"]:first-child {
    margin-left: 0;
}
.login-layout h2 .logo {
    background: url("logo.png") no-repeat scroll 0 0 transparent;
    display: inline-block;
    height: 23px;
    margin-right: 10px;
    width: 45px;
}
.login-layout h2 span {
    vertical-align: middle;
}
.on-error{
  color:#D16E6C;
}
.layout-footer{
  width: 100%;
  background-color: #d7d8d8;
  color: #666666;
  height: 30px;
  line-height: 30px;
  text-align: center;
  position: fixed;
  bottom: 0;
}
</style>
</head>
<body class="login-layout">
<form method="post">
<div class="container-fluid" id="main-container">
	<div id="main-content">
		<div class="row-fluid">
			<div class="span12">
				<div class="login-container">
					<div class="row-fluid">
						<div class="position-relative">
							<div id="login-box" class="visible widget-box no-border">
								<div class="widget-body">
									<div class="widget-main">
										<div class="login-form">
											<h2 class="header lighter  blue"><span class="logo"></span><span>养车宝配件商城后台管理系统</span></h2>
											<form>
												<fieldset>
													<label>
														<span class="block input-icon input-icon-right">
															<span class="input-box"><input class="span12" placeholder="用户名" type="text" id="email" onblur="javascript:index.checkUserLoginOneFocus(this.id);" onfocus="javascript:index.removeerrorInfo('emailerror');"  onkeydown="do_if_return(event, index.newSubmit)"></span>
															<i class="icon-user"></i>
														</span>
														<div id="emailerror" class="on-error" style="display:none">请输入登录邮箱</div>
													</label>
	
													<label>
														<span class="block input-icon input-icon-right">
															<span class="input-box"><input class="span12" placeholder="密码" type="password" id="password" onblur="javascript:index.checkUserLoginOneFocus(this.id);" onfocus="javascript:index.removeerrorInfo('errorInfo');" onkeydown="do_if_return(event, index.newSubmit)"></span>
															<i class="icon-lock"></i>
														</span>
														<div id="errorInfo" class="on-error" style="display:none">请输入密码</div>
													</label> 
													
													<label>
														<span class="block input-icon input-icon-right">
															<span class="input-box"><input id="captcha" style="width:85px;" type="text" onfocus="javascript:index.removeerrorInfo(this.id);" placeholder="请输入验证码" onkeydown="do_if_return(event, index.newSubmit)" />
															<img src="/mall-euc-ws/ws/0.1/captcha" alt="验证码" title="点击图片刷新验证码" style="margin:-5px 5px 5px;" align="absmiddle" id="captchimg" class="captcha-img" onclick="index.refreshCaptchaImg('captchimg');return false;" /></span> 
														</span>
														<div id="captchaerror" class="on-error" style="display:none"></div>
													</label> 
													<div class="row-fluid">    
														<button class="span4 btn btn-small btn-primary" style="float:right;" onclick="index.newSubmit();return false;"> 
															登录
														</button>
													</div>
												</fieldset>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div> 
</form>
<div class="layout-footer">©2016 北京车盈科技有限公司 京ICP备15056241号-1</div>
</body> 
</html>
