<!DOCTYPE html>
<html lang="en">
<jsp:include page="properties.jsp"></jsp:include>
<jsp:include page="goto-login.jsp"></jsp:include>
<head>
<meta charset="utf-8" />
<meta http-equiv="x-ua-compatible" content="IE=9" />
<!--[if lt IE 8]>
<meta http-equiv="x-ua-compatible" content="IE=EmulateIE8" />
<![endif]-->
<title>养车宝渠道自管理系统</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!--fonts-->
<script type="text/javascript" src='./extra/jquery-1.9.1.js'></script>
<script type="text/javascript" src="./extra/LAB.js"></script>
<script type="text/javascript" src="./scripts/plugin/loading.js"></script> 
<link rel="icon" href="css/images/ICON-16-16-2.png" type="image/png" >
<script type="text/javascript">
	var url = window.location.href; 
	var PATH = ""; 
	PATH = "/yangchebao-channel"
	 
    $.jRadLoading({app:PATH,type:'css'});
</script> 
<link rel="stylesheet" type="text/css" href="./css/index.css"/>
<link rel="stylesheet" type="text/css" href="./css/demo_table.css"/>
</head>
<body>
<div class="navbar navbar-inverse">
    <div class="navbar-inner">
        <div class="container-fluid">
            <a href="javascript:void(0);" class="brand"></a>
            <!--/.brand-->
            <ul class="nav ace-nav pull-right">
                <li class="light-blue user-profile">
                    <a data-toggle="dropdown" href="javascript:void(0);" class="user-menu dropdown-toggle">
					<img class="nav-user-photo" alt="Jason's Photo" src="themes/extra/images/avatars/user.jpg">
                    <span id="user_info"> <small>欢迎,</small></span>
                    <i class="icon-caret-down"></i>
                    </a>
                    <ul class="pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-closer" id="user_menu">
                        <!-- <li>
                            <a href="javascript:void(0);">
                            <i class="icon-cog"></i> 系统设置 </a>
                        </li> -->
                        <li>
                            <a href="javascript:void(0);">
                            <i class="icon-user"></i>修改密码</a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="javascript:;">
                            <i class="icon-off"></i> 注销 </a>
                        </li>
                    </ul>
                </li>
            </ul>
            <!--/.ace-nav-->
        </div>
        <!--/.container-fluid-->
    </div>
    <!--/.navbar-inner-->
</div>
<div class="container-fluid" id="main-container">
    <!-- 菜单 -->
    <div id="sidebar">
    </div>
    <div id="main-content" class="clearfix">
        <!-- 导航 -->
        <div id="breadcrumbs">
            <ul class="breadcrumb">
            </ul>
            <!--.breadcrumb-->
        </div>
        <!-- 主体页面 -->
        <div id="page-content" class="clearfix">
        </div>
        <!--/#page-content--> 
    </div>
    <!--/#main-content--> 
</div>
<!--/.fluid-container#main-container-->

<a href="javascript:void(0);" id="btn-scroll-up" class="btn btn-small btn-inverse">
<i class="icon-double-angle-up icon-only bigger-110"></i>
</a>

<div id="Form_pwd_update" class="grid-layout ui-form" style="display:none;">
    <div class="grid-layout-main jrad-form">
        <input name="id" type="hidden"> 
        <div class="grid-row-fluid"> 
            <label class="span4 grid-layout-label">
			   <span class="ui-form-required">*</span>
                原始密码：
            </label>
            <div class="span8 grid-layout-content fluid-wrap">
                <div data-name="oldPassword" class="jrad-input-container">
                </div>
            </div>
        </div>
        <div class="grid-row-fluid">
            <label class="span4 grid-layout-label">
			<span class="ui-form-required">*</span>
                新密码：
            </label>
            <div class="span8 grid-layout-content fluid-wrap">
                <div data-name="newPassword" class="jrad-input-container">
                </div>
            </div>
        </div>  
		<div class="grid-row-fluid">
            <label class="span4 grid-layout-label">
			<span class="ui-form-required">*</span>
                确认密码：
            </label>
            <div class="span8 grid-layout-content fluid-wrap">
                <div data-name="confirmNewPassword" class="jrad-input-container">
                </div>
            </div>
        </div>     
    </div>
    <div class="jrad-buttons-container ui-buttons-container">
        <button class="jrad-btn-primary btn btn-small btn-primary">
            确定
        </button>
        <button class="jrad-btn-normal btn btn-small btn-default">
            取消
        </button>
    </div>
</div>
<script type="text/javascript">
    $.jRadLoading({app:PATH,type:'js'});
</script>
<script type="text/javascript" src="./scripts/plugin/index.js"></script>
<script type="text/javascript" src="./js/md5.js"></script>
<script type="text/javascript" src="./js/masonry.pkgd.min.js"></script>
<script type="text/javascript" src="./js/index.js"></script> 
<script type="text/javascript" src="./js/Saiku.js"></script>
<script type="text/javascript" src="./js/ui.dimensiontable.js"></script>
<script type="text/javascript" src="./js/ui.charts.js"></script>
<script type="text/javascript" src="./js/ui.analytics.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    // 导航条
   $('#breadcrumbs>ul').breadcrumbs({
        index: 'channel-statistics.html',
        data:[]
    });
    // 菜单
    $('#sidebar').menu({ 
        urlData: {url:'menu.jsp'},
        expandAll: true,
        sidebars: [],
        error: function() {
        	//index.logOut();
        }
    }).menu('open','channel-statistics.html');  
    $('#user_info').html('<small>欢迎,</small>' + carsmart_config.operatorName);
    $('#user_menu .icon-off').parent().click(function(){index.logOut();}); 
	//修改密码
	var validators = {};
	validators['oldPassword'] = [{type:'min',msg:'请输入原始密码',value:'1'}];
	validators['newPassword'] = [{type:'min',msg:'请输入新密码',value:'1'}];
	validators['confirmNewPassword'] = [{type:'min',msg:'请确认新密码',value:'1'}];
	var params = {};
	params['oldPassword'] = {
		type: 'password'
	};
	params['newPassword'] = {
			type: 'password'
	};
	params['confirmNewPassword'] = {
			type: 'password'
	};
	$("#Form_pwd_update").form({
		title: '修改密码',
		grid: 20,
		validators: validators, 
		fields:params,
		submit:upPwd
	});
	$('#user_menu .icon-user').parent().click(function(){ 
		$("#Form_pwd_update").form({item:{}}).form('open');
	});
});
function upPwd(){ 
			var form = $("#Form_pwd_update .jrad-form");
			if ($('#Form_pwd_update').form('validateAll')) {  
				if($("#Form_pwd_update div[data-name=newPassword]").input('val') != $("#Form_pwd_update div[data-name=confirmNewPassword]").input('val')) { 
					$.jRadMessage({message:'两次密码输入不一致',level:'warning',selector:form}); 
					return;
				}  
				var postData = {
					"old": hex_md5($("#Form_pwd_update div[data-name=oldPassword]").input('val')),
					"new": hex_md5($("#Form_pwd_update div[data-name=newPassword]").input('val'))
				};
				var opts = {
					url: "/channel-euc/ws/0.1/change/password",
					dataType: 'json',
					data: postData,
					async: true,
					success: function(data) {
						if (data == true) {
							//$.jRadAlert({message:'密码修改成功',level:'success',selector:form});
							$("#Form_pwd_update").form('close');
							$.jRadAlert("密码修改成功","success",function(){
								window.location = "login.jsp";
							},-1); 
						} else {
                           	$.jRadAlert("修改失败","error","",-1);
						}
					},
					error: function(xhr) {
						if (xhr.responseText) {
                            var message = eval("(" + xhr.responseText + ")");
                            $.jRadMessage({message:message[0].message,level:'error'});
                        } else {
                        	$.jRadMessage({message:'请求超时',level:'error',selector:form});
                        }
					}
				};
				$.jRadPost(opts);
			}

}
</script> 
</body>
</html>
