<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"  import="java.util.*" import="java.io.*"%>
<%@ taglib prefix="sae" uri="sae.tld" %>
<script type="text/javascript" src="./js/jquery-1.5.1.js"></script>
<script type="text/javascript" src="./js/md5.js"></script>
<script type="text/javascript" src="./js/cs_base.js"></script>
<script type="text/javascript" src="./js/index.js"></script>


<script language="javascript">

</script>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<link rel="stylesheet" type="text/css" href="./css/base.css">
</head>
<body>
  <div class="login_whole">
    <div class="login_contain">
      <div>
        <ul>
          <li>
            <p>邮箱：</p>
            <input id="email" type="text" title="在此输入登录邮箱" placeholder="example@che08.com" onblur="javascript:index.checkUserLoginOneFocus(this.id);" onfocus="javascript:index.removeerrorInfo(this.id);"  onkeydown="do_if_return(event, index.newSubmit)">
          </li>
          <span id="emailerror"></span>
          <li>
            <p>密码：</p>
            <input id="password" type="password" title="在此输入登录密码" onblur="javascript:index.checkUserLoginOneFocus(this.id);" onfocus="javascript:index.removeerrorInfo(this.id);" onkeydown="do_if_return(event, index.newSubmit)">
          </li>
          <input id="domain" type="hidden" value="10" />
          <span id="passworderror"></span>
          <li class="password_remember">
            <p>.</p>
            <label>
              <input id="" type="checkbox">
              记住密码
            </label>
          </li>
          <li>
            <p>.</p>
            <input id="login" type="button" value="登录" class="login_button" onClick="index.newSubmit(); return false;">
            <span id="errorInfo" style="display:none;"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</body>
</html>