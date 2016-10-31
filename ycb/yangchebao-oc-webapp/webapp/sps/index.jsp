<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"  import="java.util.*" import="java.io.*"%>
<html>
<head>
<%@ page language="java" contentType="text/html; charset=UTF-8"%>

<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<meta http-equiv="x-ua-compatible" content="IE=9" />
<!--[if lt IE 8]>
<meta http-equiv="x-ua-compatible" content="IE=EmulateIE8" />
<![endif]-->
<script type="text/javascript" src="extra/jquery-1.8.1.min.js"></script>
<script type="text/javascript" src="scripts/plugin/loading.js"></script>
<script type="text/javascript">
	$ .jRadLoading({app:'/sps',type:'css',source:true});
</script>

</head>
<body>
<div class="layout-body-container">
	<div class="layout-header">	
				<div class="login-info"></div>
				 <div class="toolbar">	
						<span class="message">
							<span class="messageCount">
								<span class="left"></span>
								<span class="center">99+</span>
								<span class="right"></span>
							</span>
						</span>
			   </div>
               <span class="logo"></span>                
	</div>
	<div class="layout-clean"></div>
	
	<div class="layout-clean"></div>
	<div class="layout-menu-container" id="menu"></div>
	<div class="layout-switcher"><span class="menu-show"></span></div>
	<div class="layout-tab-container" id="tabs"></div>
	<div class="layout-footer">©2012 北京车网互联科技股份有限公司 京ICP证110666号</div>
</div>
<script type="text/javascript">
	$ .jRadLoading({app:'/sps',type:'js',source:true});
</script>

<script type="text/javascript">
$(document).ready(function() {  
    $('.layout-menu-container').menu({title:'功能菜单',urlData:{url:'/sps/menus.json'}});
    $ .jRadHomeTab('首页','');
    $('.login-info').menubar({name:'admin@che08.com',data:[{icon:'icon',name:'系统设置',onclick:function(){alert('11');}},
                                                                 {icon:'icon',name:'账户管理',onclick:function(){alert('22');}},
                                                                 {icon:'icon',name:'密码修改',onclick:function(){alert('11');}},
                                                                 {icon:'icon',name:'业务设置',onclick:function(){alert('11');}}
                                                                 ]});
    
});
</script>

</body></html>