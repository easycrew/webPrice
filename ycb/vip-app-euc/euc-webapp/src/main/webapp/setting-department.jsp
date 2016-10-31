<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"  import="java.util.*" import="java.io.*"%>
<%@ taglib prefix="sae" uri="sae.tld" %>

<jsp:include page="properties.jsp"></jsp:include>
<jsp:include page="goto-login.jsp"></jsp:include>

<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="./css/base.css">
<link href="./css/jquery.ui.custom.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="./css/pagination.css">
<link rel="stylesheet" href="./css/zTreeStyle/zTreeStyle.css" type="text/css">
<script type="text/javascript" src="./js/jquery-1.5.1.js"></script>
<script type="text/javascript" src="./js/index.js"></script>
<script type="text/javascript" src="./js/jquery.json-2.2.js"></script>
<script type="text/javascript" src="./js/opcenter_util.js"></script>
<script type="text/javascript" src="./js/cs_base.js"></script>
<script type="text/javascript" src="./js/jquery.pagination.js"></script>
<script type="text/javascript" src="./js/jquery.ztree.core-3.0.js"></script>
<script type="text/javascript" src="./js/setting_department.js"></script>
<title>系统设置 - 部门设置</title>
</head>

<body>
    <div id="Global_Container">
        <jsp:include page="header.jsp"></jsp:include>
        <div class="fullband_container ptn-body-bg" style="background-color:#ecf5f6">
            <div class="sized_container" style="text-align:center;">
                <jsp:include page="menu.jsp"></jsp:include>
                <script>
                    $(function() {
                        active_menu_item("#menu-systemset", "#menu-setting-department");
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
                    <div style="clear:both;margin-top:10px;">
                        <div style="float:left;width:640px; margin-top:20px;">
                            <div style="margin-bottom:10px;">
                                <div style="color: #4A4A4A;float: left;padding-right:4px;padding-top: 5px;width:60px;">上级部门:</div>
                                <select name="" id="pDepartmentList" style="color: #4A4A4A;width:100px;">
                                    <option value="-1" selected="selected">请选择上级部门</option>
                                </select>
                            </div>
                            <div style="margin-bottom:10px;height:auto;overflow:auto;">
                                <div  style="color: #4A4A4A;float:left;padding-right:4px;padding-top:5px;width:60px;">部门名称:</div>
                                <input type="text" id="departmentName" style="width:200px;float:left;">
                                <div class="simple-button left" style="margin-left:10px;" id="query">查询</div>
                                <sae:hasPermission name="系统设置.部门设置.添加">
                                <a href="setting-department-new.jsp" style="margin-left:20px;color:#25698c;margin-top: 4px;float:left; display:block;">添加</a>
                                </sae:hasPermission>
                            </div>
                            <div style="margin-top:30px;">
                                <div style="float:left;color: #4A4A4A;;margin-bottom:10px;margin-right:3px;">部门列表</div>
                                <div style="float:right;color:#25698c;margin-bottom:10px;margin-right:3px;cursor:pointer;" id="refresh">刷新列表</div>
                            </div>
                            <ul class="op-datatable" style="margin:auto;" id="departmentList">
                            </ul>
                            <div id="paging_panel" style="float:right;margin-top:20px;" class="pagination">

                            </div>
                        </div>
                        <div style="float:left;margin-left:15px;">
                            <div style="margin-bottom:5px;">部门层级列表</div>
                            <div><ul id="departmentTree" class="ztree"></ul></div>
                        </div>
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