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
<script type="text/javascript" src="./js/jquery-1.5.1.js"></script>
<script type="text/javascript" src="./js/index.js"></script>
<script type="text/javascript" src="./js/jquery.json-2.2.js"></script>
<script type="text/javascript" src="./js/opcenter_util.js"></script>
<script type="text/javascript" src="./js/cs_base.js"></script>
<script type="text/javascript" src="./js/md5.js"></script>
<title>系统设置 - 修改密码</title>
<script type="text/javascript">
    function changePassword() {
        $("#error").css("display", "none");
        $("#success").css("display", "none");
        var postData = {
            "old" : hex_md5($("#oldPassword").val()),
            "new" : hex_md5($("#newPassword").val())
        };
        if (checkInput()) {
            url = "/euc/ws/0.1/change/password";
            var success = function(data) {
                if (data == true) {
                    $("#oldPassword").val("");
                    $("#newPassword").val("");
                    $("#confirmNewPassword").val("");
                    $("#success").css("display", "block");
                } else {
                    $("#errorMsg").text("密码修改失败， 请确认密码是否正确");
                    $("#error").css("display", "block");
                }
            };

            var error = function(xhr) {
                var errorMessage = eval("("+xhr.responseText+")");
                $("#errorMsg").text(errorMessage);
                $("#error").css("display", "block");
            };

            postMethodRequestWithData(url, postData, success, error, true);
        }
    }

    function checkInput() {
        if ($("#oldPassword").val() == "") {
            $("#errorMsg").text("请输入旧密码");
            $("#error").css("display", "block");
            return false;
        }

        if ($("#newPassword").val() == "") {
            $("#errorMsg").text("请输入新密码");
            $("#error").css("display", "block");
            return false;
        }

        if ($("#confirmNewPassword").val() == "") {
            $("#errorMsg").text("请确认新密码");
            $("#error").css("display", "block");
            return false;
        }

        if ($("#newPassword").val() != $("#confirmNewPassword").val()) {
            $("#errorMsg").text("两次密码不一致， 请重新输入");
            $("#error").css("display", "block");
            return false;
        }

        return true;
    }
</script>
</head>
<body>
    <div id="Global_Container">
        <jsp:include page="header.jsp"></jsp:include>
        <div class="fullband_container ptn-body-bg" style="background-color:#ecf5f6">
            <div class="sized_container" style="text-align:center;">
                <jsp:include page="menu.jsp"></jsp:include>
                <script>
                    $(function() {
                        active_menu_item("#menu-systemset", "#menu-setting-modify-password");
                    });
                </script>
                <div class="op-content">
                    <div class="change_password">
                      <div class="info_correct" style="display:none;" id="success">
                        <img src="images/cs_correct_icon.gif"><p>修改成功</p><p></p>
                      </div>
                      <div class="info_error" style="display:none;" id="error">
                        <img src="images/cs_error_icon.gif"><p id="errorMsg">修改失败&nbsp;两次密码输入不一致,请您重新输入</p>
                      </div>
                      <div>
                        <p>旧密码:</p>
                        <input type="password" class="input_password" id="oldPassword">
                      </div>
                      <div>
                        <p>新密码:</p>
                        <input type="password" class="input_password" id="newPassword">
                      </div>
                      <div>
                        <p>密码确认:</p>
                        <input type="password" class="input_password" id="confirmNewPassword">
                      </div>
                      <div class="simple-button" style="margin-left:75px;" onclick='changePassword()'>
                                                                    确认修改
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