<%@ page language="java" contentType="text/html; charset=UTF-8"  import="java.util.*" import="java.io.*"%>
<%@ taglib prefix="sae" uri="sae.tld" %>
<div class="fullband_container ptn-head-bg">
    <div class="sized_container op-title" style="padding:7px;position:relative;">
        <div style="float:left;margin-top:12px;">
            <div class="label">欢迎您：</div><div class="ptn-label-bg left" style="width:112px;"><span class="display-name"></span></div>
            <div class="label">时间:</div><div class="ptn-label-bg left" style="width:248px;"><span id="span-show-time"></span></div>
            <div class="label">天气:</div><div class="ptn-label-bg left" style="width:178px;">北京 26℃~36℃晴</div>
        </div>
        <div style="float:right;padding:10px;position:absolute;right:10px;top:3px;">
            <ul class="op-usercenter-command">
                <li>消息(2)</li>
                <li class="delimator">|</li>
                <li>修改密码</li>
                <li class="delimator">|</li>
                <li><a href="javacript:void(0)" onClick="index.logOut();return false;">退出</a></li>
            </ul>
        </div>
        <div class="clear"></div>
    </div>
</div>