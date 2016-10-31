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
<title>系统设置 - 权限分配</title>
</head>
<script type="text/javascript">
$(document).ready(function() {
    $.ajaxSetup({
        cache : false
    });

    showAllRoles();
    showPermissionBussinessTypes();
    $("#assign").click(assignPermission);
});

function showAllRoles() {
    var url = "/euc/ws/0.1/role/all?pagable=false";
    var success = showRoles;
    var error = errorCallback;
    getMethodRequest(url, success, error, true);
}

function getOptionHtml(id, name) {
    return "<option value='" + id + "'>" + name + "</option>";
}

function errorCallback(xhr) {
    var errorMessage = eval("("+xhr.responseText+")");
    showErrorDialog("error", errorMessage[0].message);
};

function showPermissionBussinessTypes() {
    var url = "/euc/ws/0.1/permission/bussiness/type";
    var success = showPermissions;
    var error = errorCallback;
    getMethodRequest(url, success, error, true);
}

function assignPermission() {
    var roleId = $("#roleList").val();
    if (roleId == -1) {
        showErrorDialog("info", "请选择权限组");
        return;
    }

    var url = "/euc/ws/0.1/permission/limit";
    var checkboxList = $("#permissionList").find("[name='permissions']");
    var permissions = new Array();
    for (var i = 0; i < checkboxList.length; i++) {
        if ($(checkboxList[i]).attr("checked")) {
            var permission = $($($($(checkboxList[i]).parent()).parent()).children()[1]).text();
            permissions.push(permission);
        }
    }

    var postData = {
        roleId : roleId,
        permissions : permissions
    };

    var success = function(data) {
        showErrorDialog("common", "更新成功");
    };

    var error = errorCallback;
    postMethodRequestWithData(url, postData, success, error, true);
}

function showPermissions(data) {
    var permissionList = "";
    for (var i = 0; i < data.length; i++) {
        permissionList += "<li><div class='w70'><input type='checkBox' style='margin:0' name='permissions'/></div><div class='w200'>" + data[i] + "</div></li>";
    }

    $("#permissionList").append(permissionList);
}

function showRoles(data) {
    var roleList = "<option value='-1' selected='selected'>请选择权限组</option>";
    for (var i = 0; i < data.length; i++) {
        var id = data[i].id;
        var name = data[i].name;
        var roleItem = {
            id : id,
            name : name
        };

        roleList += getOptionHtml(id, name);
    }

    $("#roleList").html(roleList);
}


function checkAll(_this) {
  var table = $($($(_this).parent()).parent()).parent();
  var checkboxList = $(table).find("[name='permissions']");
    if (checkboxList != null) {
        for (var i = 0; i < checkboxList.length; i++) {
            checkboxList[i].checked = _this.checked;
        }
    }
}
</script>
<body>
    <div id="Global_Container">
        <jsp:include page="header.jsp"></jsp:include>
        <div class="fullband_container ptn-body-bg" style="background-color:#ecf5f6">
            <div class="sized_container" style="text-align:center;">
                <jsp:include page="menu.jsp"></jsp:include>
                <script>
                    $(function() {
                        active_menu_item("#menu-systemset", "#menu-assign-permission");
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
                                <div style="color: #4A4A4A;float: left;padding-right:4px;padding-top: 5px;width:60px;">权限组:</div>
                                <select name="" id="roleList" style="color: #4A4A4A;width:100px;">

                                </select>
                            </div>

                            <div style="margin-top:30px;">
                                <div style="float:left;color: #4A4A4A;;margin-bottom:10px;margin-right:3px;">权限列表</div>
                            </div>
                            <ul class="op-datatable" style="width:300px;" id="permissionList">
                               <li class="title">
                                    <div class="w70"><input type="checkBox" style="margin:0" onclick="checkAll(this)" /></div>
                                    <div class="w200">权限组名称</div>
                              </li>
                            </ul>
                            <div id="assign" class="button_main" style="margin: 40px 0 0 200px;width:40px;">
                                <p>更改</p>
                            </div>
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