<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="cn.com.carsmart.util.configmanagement.ConfigUtil"%> 
<html>
<jsp:include page="properties.jsp"></jsp:include>
<jsp:include page="goto-login.jsp"></jsp:include>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<meta http-equiv="x-ua-compatible" content="IE=9" />
<!--[if lt IE 8]>
<meta http-equiv="x-ua-compatible" content="IE=EmulateIE8" />
<![endif]-->
<title>养车宝管理平台</title>
<script type="text/javascript" src="extra/jquery-1.8.1.min.js"></script>
<script type="text/javascript" src="scripts/plugin/loading.js"></script>
<script type="text/javascript" src="./js/md5.js"></script>
<script type="text/javascript" src="./js/zclip/jquery.zclip.min.js"></script>
<!-- <script tpe="text/javascript" src="scripts/plugin/plugin-mapabc.js"></script> -->
<!-- <script type="text/javascript" src="http://apis.mapabc.com/webapi/auth.json?t=javascriptmap&v=3.1.1&key=5071fc9c68b7bcee54573a9b0f9453530189067a8bb056068ef54ceb786ac0f6d3d4249bd7b2a873"></script>  -->  
<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.3&ak=2d5********2cb"></script> 
<link rel="stylesheet" href="css/ebase.css" type="text/css"> 
<script type="text/javascript">
	var url = window.location.href; 
	var PATH = "";
	if(url.indexOf("cms.yangchebao.com.cn")>-1){ 
	}else{
		PATH = "/yangchebao-oc"
	} 
	$.jRadLoading({app:PATH,type:'css',source:true,componentStyle: 'flat',gap: 'small',menuHeight: 'small'});

</script>
<style>
  textarea{
	resize:vertical;
  }
  .search{position:static;}
</style>
</head>
<body scroll="no">
<div class="layout-body-container">
    <div class="layout-header"> 
                <div class="login-info"></div>
                 <div class="toolbar">  
                        <!--span class="message">
                            <span class="messageCount">
                                <span class="left"></span>
                                <span class="center">99+</span>
                                <span class="right"></span>
                            </span>
                        </span-->
               </div>
               <span class="logo"></span>                
    </div>
    <div class="layout-clean"></div>
    
    <div class="layout-clean"></div>
    <div class="layout-menu-container" id="menu"></div>
    <div class="layout-switcher"><span class="menu-show"></span></div>
    <div class="layout-tab-container" id="tabs"></div> 
</div>
<a href="javascript:void(0);" class="scroll-up-btn" title="置顶"></a>
<script type="text/javascript"> 
    $.jRadLoading({app:PATH,type:'js',source:true});
</script>
<script type="text/javascript" src="./js/index.js"></script>
<script type="text/javascript" src="./js/eutil.js"></script>
<script type="text/javascript">
$(document).ready(function() {  
	  GLOBAlTITLE = "养车宝管理平台";
	  try{
        $('.layout-menu-container').menu({title:'功能菜单',urlData:{url:'menu.jsp'}});
    }catch(e) {
       index.logOut();
    }
    $.jRadHomeTab('首页','declare.html'); 
    $('.login-info').menubar({name:carsmart_config.operatorName,data:[ {icon:'icon',name:'密码修改',onclick:function(){
															   $.jRadOpenTab({"name":"修改密码","url":"setting/setting-password.html"});
															}}
                                                                 ]});
    $('.menubar-icon').click(function(){index.logOut();});
    $(".scroll-up-btn").click(function(){ 
        $(".panel:visible").animate({scrollTop:0},50);//
    });
    $(".ui-menu-submenu-container li").click(function(){ 
      $(".tabs .tabs-selected").attr({menuId:$(this).attr("id").substring(10),menuName:$(this).html()});
      $("#tabs").attr({menuId:$(this).attr("id").substring(10),menuName:$(this).html()});
    })
  
});

</script>

</body></html>