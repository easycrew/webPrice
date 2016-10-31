<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"  import="java.util.*" import="java.io.*"%>
<%@ taglib prefix="sae" uri="sae.tld" %>

<jsp:include page="properties.jsp"></jsp:include>
<jsp:include page="goto-login.jsp"></jsp:include>

<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="./css/base.css">
<link rel="stylesheet" type="text/css" href="./css/dtree.css">
<link href="./css/jquery.ui.custom.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="./js/jquery-1.5.1.js"></script>
<script type="text/javascript" src="./js/index.js"></script>
<script type="text/javascript" src="./js/jquery.json-2.2.js"></script>
<script type="text/javascript" src="./js/opcenter_util.js"></script>
<script type="text/javascript" src="./js/cs_base.js"></script>
<script type="text/javascript" src="./js/setting_permission.js"></script>
<script type="text/javascript" src="./js/dtree.js"></script>
<title>系统设置 - 权限设置</title>
<style>
   .font_button{
           margin-left: 5px;margin-right: 5px;color:#25698c;cursor:pointer;
   }
   .font_button:hover {
           text-decoration:underline;
   }
   .font_button_selected{
           margin-left: 5px;margin-right: 5px;
   }
   .font_text{
       margin-left: 5px;margin-right: 5px;
   }
   .div_button{
       background-color:#234874;
    color:#fff;
    height:20px;
    width:80px;
    text-align:center;
    padding-top:4px;
    cursor:pointer;
    float:left;margin-left:10px;margin-top:10px;
   }
   .autorow{
     height:auto;overflow:auto;
   }



</style>

</head>

<body>
    <div id="Global_Container">
        <jsp:include page="header.jsp"></jsp:include>
        <div class="fullband_container ptn-body-bg" style="background-color:#ecf5f6">
            <div class="sized_container" style="text-align:center;">
                <jsp:include page="menu.jsp"></jsp:include>
                <script>
                    $(function() {
                        active_menu_item("#menu-systemset", "#menu-setting-permission");
                    });
                </script>
                <div class="op-content">
                    <div style="border:4px solid #595959;width:380px;display:none;background-color:white;" id="deleteConfirmationDialog">
                        <div style="background-color:#377ca0;height:16px;padding:6px 0 4px 5px;color:#fff;">删除确认</div>
                        <div style="padding:1px;color:#4a4a4a;padding:30px 0 40px 20px;">
                        </div>
                        <div style="clear:both;background-color:#f0f0f0;height:30px;padding:2px;">
                            <div style="float:right;margin:2px;margin-right:10px;color:#234874;background-color:#f0f0f0;" class="simple-button" id="cancelDelete">取消</div>
                            <div style="float:right;margin:2px;margin-right:10px;background-color:#ad030f;" class="simple-button" onclick="confirmDelete(this)">确认删除</div>
                        </div>
                    </div>
                    <div style="float:left;margin-bottom:10px;margin-left:3px;margin-bottom:20px;" id="roles">
                    </div>
                    <div style="clear:both;"></div>
                    <div style="width:650px;float:left;">
                    <div id="permissions" >
                    </div>
                    <div class='simple-button' style="width:80px;" onclick='saveChange()'>保存修改</div>
                    </div>
                    <div style="float:right;">
                        <ul class="setting-permission-right-ul" id="category">
                            <li style="background-color:#fff;color:#4b4c47;font-size:13px;">快速查找大类</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div style="clear:both;"></div>
        </div>
        <div class="fullband_container ptn-tail-bg">
            <div class="sized_container" style="text-align:center;height:23px;">
            </div>
        </div>
    </div>
</body>
</html>