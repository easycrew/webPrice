<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"  import="java.util.*" import="java.io.*"%>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<meta http-equiv="x-ua-compatible" content="IE=9" />
<meta name="renderer" content="webkit">
<!--[if lt IE 8]>
<meta http-equiv="x-ua-compatible" content="IE=EmulateIE8" />
<![endif]-->
<title>养车宝vip商家自管理系统-登录</title> 
<script type="text/javascript" src='extra/jquery-1.9.1.js'></script>
<script type="text/javascript" src="js/index.js"></script>
<script type="text/javascript" src="js/cs_base.js"></script>
<script type="text/javascript" src="js/md5.js"></script>
<script type="text/javascript" src="extra/LAB.js"></script>
<script type="text/javascript" src="scripts/plugin/loading.js"></script>
<script type="text/javascript" src="js/jquery.cookie.js"></script> 
<!-- <link rel="shortcut icon" href="css/images/ICON-16-16-3.png" type="image/png" > -->
<link href="favicon.ico" rel="shortcut icon" type="image/x-icon"/>
<!-- <link rel="icon" href="css/images/ICON-16-16-3.png" type="image/png" >
<link rel="Bookmark" href="css/images/ICON-16-16-3.png" type="image/png" > -->

<script type="text/javascript">
    var url = window.location.href; 
	var PATH = "";
	if(url.indexOf("vip.yangchebao.com.cn")>-1){ 
	}else{
		PATH = "/yangchebao-vip"
	} 
	$.jRadLoading({app:PATH,type:'css'}); 
    $.jRadLoading({app:PATH,type:'js'});
    $(function(){
    	$(".login-radio").checkbox({data:[{id:'1',name:'记住密码'}]});
    	if($.cookie("email")){
    		$('#email').val($.cookie('email'))
    	}
    	if($.cookie('password')){
    		$('#password').val($.cookie('password'));
    		$('.login-radio').checkbox('val',1)
    	}
    	$('#loginBtn').click(function(){
    		if($('.login-radio').checkbox('val')==""){
    			$.cookie('email',null,{path:'/'});
    			$.cookie('password',null,{path:'/'})
    		}
    		if($('.login-radio').checkbox('val')==1){
    			$.cookie('email',$('#email').val(),{path:'/',expires:1});
    			$.cookie('password',$('#password').val(),{path:'/',expires:1})
    		}
    	})
	})
	
	// function setHomePage()
	// {
	// 	if(document.all)
	// 	{
	// 		var obj = document.links(0);
	// 		if (obj)
	// 		{
	// 			obj.style.behavior = 'url(#default#homepage)';
	// 			obj.setHomePage(window.location.href);
	// 		}
	//   	}
	// 	else	{
	// 		if(window.netscape)
	// 		{
	// 			try			{
	// 				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	// 			}
	// 			catch (e)
	// 			{
	// 				window.alert("此操作被浏览器拒绝，请通过浏览器菜单完成此操作！");
	// 			}
	// 		}
	//    	}
	//    }
</script> 
<link rel="stylesheet" type="text/css" href="./css/login.css"/>
<style>
	#jrad-form-demo-dialog p.error,#jrad-form-demo-dialog p.contact{
		color:red;
	}
</style>
</head>
<body>
<div class="grid-row-fluid">
		<div id="jrad-form-demo-dialog">
			<div class="grid-layout-main jrad-form">
				<!-- <input name="id" type="hidden"> -->
				<div class="grid-row-fluid">
					<label class="span1 grid-layout-label"></label>
					<div class="span18 grid-layout-content fluid-wrap">
						<div class="jrad-radio-container" name="findType">
						</div>
					</div>
				</div>
				<div class="grid-row-fluid mobileCode">
					<label class="span1 grid-layout-label"></label>
					<div class="span16 grid-layout-content fluid-wrap">
						<div class="jrad-input-container" name="mobile" placeholder="注册手机号">
						</div>
					</div>
				</div>
				<div class="grid-row-fluid userName">
					<label class="span1 grid-layout-label"></label>
					<div class="span16 grid-layout-content fluid-wrap">
						<div class="jrad-input-container" name="alias" placeholder="用户名">
						</div>
					</div>
				</div>
				<div class="grid-row-fluid userName">
					<label class="span1 grid-layout-label"></label>
					<div class="span16 grid-layout-content fluid-wrap">
						<div class="jrad-input-container" name="businessName" placeholder="店铺工商注册名称">
						</div>
					</div>
				</div>
				<div class="grid-row-fluid">
					<label class="span1 grid-layout-label"></label>
					<div class="span16 grid-layout-content fluid-wrap">
						<div class="jrad-input-container" name="password" placeholder="新密码">
						</div>
					</div>
				</div>
				<div class="grid-row-fluid">
					<label class="span1 grid-layout-label"></label>
					<div class="span16 grid-layout-content fluid-wrap">
						<div class="jrad-input-container" name="rePassword" placeholder="确认新密码">
						</div>
					</div>
				</div>
				<div class="grid-row-fluid mobileCode">
					<label class="span1 grid-layout-label"></label>
					<div class="span10 grid-layout-content fluid-wrap">
						<div class="jrad-input-container" name="code" placeholder="手机验证码">
						</div>
					</div>
					<button class="btn btn-small btn-primary" id="getCodeBtn">获取验证码</button>
				</div>
				<div class="grid-row-fluid error" style="display:none;"><label class="span1 grid-layout-label"></label><p class="error"></p></div>
				<div class="grid-row-fluid error" style="display:none;"><label class="span1 grid-layout-label"></label><p class="contact">客服电话 01058377979</p></div>
			</div>
			<div class="jrad-buttons-container ui-buttons-container">
				<button class="jrad-btn-primary btn btn-small btn-primary"> 确定 </button>
			</div>
		</div>
</div>
<form method="post" id="post">
<div class="temp-box">
	<!-- <img src="img/denglu-bg.jpg" id="bgImg"> -->
	<div class="focus" id="focus">
	<div class="logo"><img src="img/logo.png"></div>
	<div class="login_box">
		<div class="login">
			<div class="login_content">
				<div class="login-wrap">
					<div class="login-container">
						<!-- <h1><img src="img/login-title-bg.png" alt="养车宝商家后台"/></h1> -->
						<div class="login-content-main">
							<div>
								<ul>
									<li>
										<div class="login-input" >
											<span class="icon login-name-icon"></span><input id="email" name="userName" type="text" value="" onBlur="javascript:index.checkUserLoginOneFocus(this.id);" onFocus="javascript:index.removeerrorInfo('emailerror');"  onkeydown="do_if_return(event, index.newSubmit)" placeholder="用户名/手机号码"/>
										</div>
										<div id="emailerror" class="on-error" style="display:none">请输入用户名或手机号码</div>
									</li>
									<li>
										<div class="login-input">
											<span class="icon login-password-icon"></span><input id="password" name="passWord" type="password" value="" onBlur="javascript:index.checkUserLoginOneFocus(this.id);" onFocus="javascript:index.removeerrorInfo('errorInfo');" onKeyDown="do_if_return(event, index.newSubmit)" placeholder="密码"/>
										</div>
										<div id="errorInfo" class="on-error" style="display:none">请输入密码</div>
									</li>
									<li>
										<span class="block input-icon input-icon-right">
											<span class="captcha-input-box"><input id="captcha" style="width:95px;background-color:#fff;height:22px;padding:5px;border:1px solid #dfe0e0;color:#666;font-family:Arial,'微软雅黑'; border-radius:2px;" type="text" onfocus="javascript:index.removeerrorInfo('captchaerror');" onBlur="javascript:index.checkUserLoginOneFocus(this.id);" placeholder="请输入验证码" onkeydown="do_if_return(event, index.newSubmit)" />
											<img src="/vip-euc-ws/ws/0.1/captcha" alt="验证码" title="点击图片刷新验证码" style="margin:0 5px;" align="absmiddle" id="captchimg" class="captcha-img" onclick="index.refreshCaptchaImg('captchimg');return false;" /></span> 
										</span>
										<div id="captchaerror" class="on-error" style="display:none">请输入验证码</div>
									</li>
									<li style="overflow:hidden;">
										<div class="login-radio" style="float:left;">
										</div>	
										<p style="margin-top:-4px;float:right;">
											<a style="color: rgb(47, 169, 239); margin: 24px 0px 10px;" href="javascript:" id="forgetPwd">忘记密码？</a>
											<!-- onclick='$.jRadAlert("请联系客服重置密码,客服电话 01058377979。", "waring","","-1");' -->
											<!-- <a style="color: rgb(47, 169, 239); margin: 10px 0px 10px;margin-left:30px;" href="javascript:setHomePage();">将此网站设为首页></a> -->
										</p>
									</li>
								</ul>
								<div>
									<input id="domain" type="hidden" value="10"/>
									<div style="text-align:center;width:297px;">
										<span id="loginBtn" class="ui-btn-login" onClick="index.newSubmit()">登&nbsp;录</span>
									</div>
									<div style="text-align:center;margin-top:14px;border:1px solid #f73f3f; width:295px; ">
										<span href="javascript:" style="color:#f73f3f;font-size:16px;" id="registBtn" onClick="window.open('regist.jsp');" class="ui-btn-enroll">立即注册</span>
									</div>
									
								</div>
							</div>
						</div>
					</div>
					<div id="foot" style="text-align:center;position:fixed;bottom:0;width:350px;left:50%;margin-left:-175px;">
				        
				    </div>
				</div>
			</div>
		</div>
	</div>
	<div id="focus_m" class="focus_m">
		<ul>
			<li class="li_1"></li>
			<li class="li_2"></li>
			<li class="li_3"></li>
		</ul>
	</div>
	<!-- <a href="javascript:;" class="focus_l" id="focus_l" hidefocus="true" title="上一张"></a>
	<a href="javascript:;" class="focus_r" id="focus_r" hidefocus="true" title="下一张"></a> -->
	</div>
</div>
<div class="footerbg">
	<div class="footer clearfix">
		<div class="footBox1 footerBorder">
			<a href="http://www.yangchebao.com.cn/sjrz.html"  class="footera1" target="_blank">明智商家之选</a>
			<a href="http://www.yangchebao.com.cn/sjrz.html" target="_blank">咨询电话：010<span style="display:inline-block;line-height: 15px;vertical-align:top;">-</span>58377979</a>
			<a href="http://www.yangchebao.com.cn/sjrz.html" class="footera2" target="_blank">邮箱地址：hezuo@che08.com</a>
		</div>
		<div class="footBox1 footerBorder">
			<a href="http://www.yangchebao.com.cn/qdhz.html" class="footera1" target="_blank">加盟，城市代理</a>
			<a href="http://www.yangchebao.com.cn/qdhz.html" target="_blank">咨询电话：186<span style="display:inline-block;line-height: 15px;vertical-align:top;">-</span>1033<span style="display:inline-block;line-height: 15px;vertical-align:top;">-</span>8216（李经理）</a>
			<a href="http://www.yangchebao.com.cn/qdhz.html" class="footera2" target="_blank">邮箱地址：liboran@che08.com</a>
		</div>
		<div class="footBox2">
			<span class="copyIcon">©</span><a href="javascript:void(0);">2016 北京车盈科技有限公司</a>
			<a href="javascript:void(0);">版权所有 京ICP备15056241号<span style="display:inline-block;line-height: 15px;vertical-align:top;">-</span>1</a>
		</div>
	</div>
	<div class="footBox3">
		<a href="http://yangchebao.com.cn/home.html" target="_blank">关于车盈</a>
		<a href="http://yangchebao.com.cn/about.html" target="_blank">关于养车宝</a>
		<a href="http://yangchebao.com.cn/copyright.html" target="_blank">法律声明</a>
		<a href="http://weibo.com/yangchebao?is_hot=1" target="_blank" style="border:none;">官方微博</a>
	</div>
</div>
</form>
<script type="text/javascript" src="js/script.js"></script>
<script>
// window.onload=window.onresize=function()
// {
// 	var oImg=document.getElementById('bgImg');
// 	oImg.style.width='100%';
// 	var bb = document.documentElement.clientHeight;
// 	oImg.style.height=document.documentElement.clientHeight+'px';
// }
</script>
<script type="text/javascript">
	$(function(){
		
		if($('#post').show()){
			$('.grid-row-fluid').hide();
		}
		var fields = {};
		fields['password'] = {
			 type: 'password'
		};
		fields['rePassword'] = {
			 type: 'password'
		};
		// fields['mobile'] = {dataFmt:'99999999999'};
		fields['findType'] = {
			data: [{
				'id': '0',
				'name': '通过注册手机号找回'
			},
			{
				'id': '1',
				'name': '通过用户名找回'
			}]
		};
		var validators = {};

		//验证器
		var validators = {};
		validators['mobile'] = [{
			msg: "请输入手机号",
			type: "min",
			value: "1"
		},{
			msg:'请输入正确手机号',
			tyoe:'regex',
			value:/^(86){0,1}[1-9]{1}\d{10}$/
		}];
		validators['password'] = [{
			msg: "请输入6-16位密码",
			type: "min",
			value: "6"
		},{
			masg:'请输入6-16位密码',
			type:'max',
			value:'16'
		}];
		$('#jrad-form-demo-dialog').form({
			title: '密码找回',
			autobinding:true, 
			grid:'6',
			fluid: true,
			fields: fields,
			submit:function(){}
		});
		var wait=60;
		var timer=null;
		$('#forgetPwd').click(function(){
			$('.grid-row-fluid').show();
			$('#jrad-form-demo-dialog').form().form('open');
			timer=null;
			$('#jrad-form-demo-dialog #getCodeBtn').removeClass('disabled').html("获取验证码");
			$('#jrad-form-demo-dialog .icon-remove').css({position:'relative',top:'3px'});
			$('#jrad-form-demo-dialog div[name="findType"]').radio('val','0');
			$('#jrad-form-demo-dialog .userName').hide();
			$('#jrad-form-demo-dialog .mobileCode').show();
			$("div.error").hide();
			$('#jrad-form-demo-dialog div[name="findType"]').radio({
				onclick:function(){
					$("div.error").hide();
					$('#jrad-form-demo-dialog div[name="mobile"],#jrad-form-demo-dialog div[name="password"],#jrad-form-demo-dialog div[name="code"],#jrad-form-demo-dialog div[name="rePassword"],#jrad-form-demo-dialog div[name="alias"],#jrad-form-demo-dialog div[name="businessName"]').input('val','');
					if($('#jrad-form-demo-dialog div[name="findType"]').radio('val')==0){
						$('#jrad-form-demo-dialog .userName').hide();
						$('#jrad-form-demo-dialog .mobileCode').show()
					}else{
						$('#jrad-form-demo-dialog .userName').show();
						$('#jrad-form-demo-dialog .mobileCode').hide()
					}
				}
			});
			$('#jrad-form-demo-dialog a.pop-up-close').click(function(){
				clearTimeout(timer)
			});
			$('#jrad-form-demo-dialog .jrad-btn-primary').click(function(){
				var postData_mobile={};
					postData_mobile.mobile=$('#jrad-form-demo-dialog div[name="mobile"]').input('val');
					postData_mobile.password=hex_md5($('#jrad-form-demo-dialog div[name="password"]').input('val'));
					postData_mobile.code=$('#jrad-form-demo-dialog div[name="code"]').input('val');
				var postData_alias={};
					postData_alias.alias=$('#jrad-form-demo-dialog div[name="alias"]').input('val');
					postData_alias.password=hex_md5($('#jrad-form-demo-dialog div[name="password"]').input('val'));
					postData_alias.businessName=$('#jrad-form-demo-dialog div[name="businessName"]').input('val');
				if($('#jrad-form-demo-dialog div[name="findType"]').radio('val')==0){
		            var mobile = $.trim($('#jrad-form-demo-dialog div[name="mobile"]').input('val'));
		            if(mobile==""){
		                $("p.error").html("请输入手机号！");
		                $('div.error').show();
		                return;
		            }
		            var phoneReg = /^((\+86)|(86)){0,}1\d{10}$/; 
		            if(!phoneReg.test(mobile)){
		              $("p.error").html("请输入正确的手机号码！");
		              $('div.error').show(); 
		              return;
		            }  
		            var password=$('#jrad-form-demo-dialog div[name="password"]').input('val');
		            var rePassword=$('#jrad-form-demo-dialog div[name="rePassword"]').input('val');
		            if(password.length<6 || password.length>16){
		            	$("p.error").html("请输入6-16位的密码！");
			            $('div.error').show(); 
			            return;
		            }
		            if(rePassword!=password){
		            	$("p.error").html("两次输入密码不一致！");
			            $('div.error').show(); 
			            return;
		            } 
	           		$("div.error").hide();
					$.ajax({
						url:'/vip-ws/ws/0.1/user/resetPassword/mobile',
						type: 'post',
	            		async: false,
						data:$.toJSON(postData_mobile),
						dataType: 'json',
						contentType:'application/json;charset=utf-8',
						success:function(){
							$.jRadAlert('密码修改成功');
							$('#jrad-form-demo-dialog').form().form('close')
						},error:function(xhr){
						    var errormsg = eval("(" + xhr.responseText + ")"); 
							if (errormsg != undefined) {
								$('#jrad-form-demo-dialog p.error').html(errormsg[0].message);
								$('div.error').show()
							}
						}
					})
					
				}
				if($('#jrad-form-demo-dialog div[name="findType"]').radio('val')==1){
					$("div.error").hide();
		            var alias = $.trim($('#jrad-form-demo-dialog div[name="alias"]').input('val'));
		            if(alias==""){
		                $("p.error").html("请输入用户名！");
		                $('div.error').show();
		                return;
		            }
		            var businessName = $.trim($('#jrad-form-demo-dialog div[name="businessName"]').input('val'));
		            if(businessName==""){
		                $("p.error").html("请输入店铺工商注册名称！");
		                $('div.error').show();
		                return;
		            }
		            var password=$('#jrad-form-demo-dialog div[name="password"]').input('val');
		            var rePassword=$('#jrad-form-demo-dialog div[name="rePassword"]').input('val');
		            if(password.length<6 || password.length>16){
		            	$("p.error").html("请输入6-16位的密码！");
			            $('div.error').show(); 
			            return;
		            }
		            if(rePassword!=password){
		            	$("p.error").html("两次输入密码不一致！");
			            $('div.error').show(); 
			            return;
		            }
		            $("div.error").hide();
					$.ajax({
						url:'/vip-ws/ws/0.1/user/resetPassword/alias',
						type: 'post',
	            		async: false,
						data:$.toJSON(postData_alias),
						dataType: 'json',
						contentType:'application/json;charset=utf-8',
						success:function(){
							$.jRadAlert('密码修改成功');
							clearTimeout(timer);
							$('#jrad-form-demo-dialog').form().form('close')
						},error:function(xhr){
						    var errormsg = eval("(" + xhr.responseText + ")"); 
							if (errormsg != undefined) {
								$('#jrad-form-demo-dialog p.error').html(errormsg[0].message);
								$('div.error').show()
							}
						}
					})
				}
			})
		});
		
		$('#jrad-form-demo-dialog #getCodeBtn').click(function(){
			if($(this).hasClass('disabled')){
				return false
			}
			var phoneNumber=$('#jrad-form-demo-dialog div[name="mobile"]').input('val');
			wait=60;
			$.jRadGet({
				url:'/vip-ws/ws/0.1/user/resetPassword/getcode?mobile='+phoneNumber,
				success:function(){
					$.jRadAlert("如果您在1分钟内没有收到验证码，请检查您填写的手机号码是否正确或重新发送。","success","",-1);
					$('div.error').hide()
				},error:function(xhr){
					var errormsg = eval("(" + xhr.responseText + ")");
					if(errormsg != undefined){
						$('#jrad-form-demo-dialog p.error').html(errormsg[0].message);
						$('div.error').show()
					}
					wait = 0; 
				}
			});
			time()
		});
		function time(){
			var o=$('#jrad-form-demo-dialog #getCodeBtn');
			if(wait==0){
				o.removeClass('disabled');
				o.html("获取验证码");
				wait=60
			}else{
				o.addClass('disabled',true);
				o.html(wait+'秒后重新获取验证码');
				wait--;
				timer=setTimeout(time,1000)
			}
		}
	})
</script>
</body>
</html>
