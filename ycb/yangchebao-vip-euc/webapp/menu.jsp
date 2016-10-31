<%@ page language="java" contentType="text/html; charset=UTF-8"  import="java.util.*" import="java.io.*"%>
<%@ taglib prefix="sae" uri="sae.tld" %>
<script type="text/javascript">
$(document).ready(function() {
    var mainMenus = $("#menus").children("li");
    for (var i = 0; i < mainMenus.length; i++) {
        if ($(mainMenus[i]).children("ul").children("li").length == 0) {
            $(mainMenus[i]).css("display", "none");
        }
    }
});
</script>
<div style="float:left;width:130px;">
    <ul class="agent-tabs" id="menus">
<!--         <li id="menu-tm"> -->
<!--             <img src="images/cs_op_icon_terminal.png" class="agent-tab-bar"><div class="agent-tab-bar">终端管理</div> -->
<!--             <div class="deliminator agent-tab-bar"></div> -->
<!--             <ul> -->
<%--                 <sae:hasPermission name="终端管理.终端管理.添加"> --%>
<%--                 <sae:hasPermission name="基础资料.集团设置.查询"> --%>
<%--                 <sae:hasPermission name="基础资料.网点设置.查询"> --%>
<%--                 <sae:hasPermission name="基础资料.供应商设置.查询"> --%>
<%--                 <sae:hasPermission name="基础资料.终端类型设置.查询"> --%>
<%--                 <sae:hasPermission name="终端管理.终端套餐配置.查询"> --%>
<!--                 <li id="menu-tm-single-new"><a href="tm-new.jsp"><div>单个新增</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="终端管理.终端管理.添加"> --%>
<!--                 <li id="menu-tm-batch-new"><a href="tm-new-batch.jsp"><div>批量导入</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="终端管理.终端管理.添加"> --%>
<%--                 <sae:hasPermission name="基础资料.集团设置.查询"> --%>
<%--                 <sae:hasPermission name="基础资料.网点设置.查询"> --%>
<%--                 <sae:hasPermission name="基础资料.供应商设置.查询"> --%>
<%--                 <sae:hasPermission name="基础资料.终端类型设置.查询"> --%>
<%--                 <sae:hasPermission name="终端管理.终端套餐配置.查询"> --%>
<!--                 <li id="menu-tm-scan-new"><a href="tm-scan-new.jsp"><div>扫码新增</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>

<%--                 <sae:hasPermission name="终端管理.终端管理.查询"> --%>
<%--                 <sae:hasPermission name="基础资料.集团设置.查询"> --%>
<%--                 <sae:hasPermission name="基础资料.网点设置.查询"> --%>
<%--                 <sae:hasPermission name="基础资料.供应商设置.查询"> --%>
<%--                 <sae:hasPermission name="基础资料.终端类型设置.查询"> --%>
<%--                 <sae:hasPermission name="终端管理.终端套餐配置.查询"> --%>
<!--                 <li id="menu-tm-query"><a href="tm-query.jsp"><div>查询终端</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="终端管理.在线业务配置.查询"> --%>
<!--                 <li id="menu-tm-online-service-config"><a href="tm-online-service-config.jsp"><div>在线业务配置</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="终端管理.产品服务配置.查询"> --%>
<!--                 <li id="menu-tm-product-service-config"><a href="tm-product-service-config-hardware.jsp"><div>产品服务配置</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="终端管理.终端套餐配置.查询"> --%>
<%--                 <sae:hasPermission name="终端管理.产品服务配置.查询"> --%>
<%--                 <sae:hasPermission name="基础资料.集团设置.查询"> --%>
<!--                 <li id="menu-tm-service-combo-config" class="last-child"><a href="tm-service-combo-config.jsp"><div>服务套餐配置</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<!--             </ul> -->
<!--         </li> -->
<!--         <li id="menu-postsale"> -->
<!--             <img src="images/cs_op_icon_repair.png" class="agent-tab-bar"><div class="agent-tab-bar">售后维修</div> -->
<!--             <div class="deliminator agent-tab-bar"></div> -->
<!--             <ul> -->
<!--
<!--                 <li id="menu-postsale-query"><a href="postsale-repair-query.jsp"><div>售后查询</div></a></li> -->
<!--                 <li id="menu-postsale-recheckin" class="last-child"><div>转支撑部门补登</div></li> -->
<!--                 <li id="menu-postsale-repair-type" ><a href="postsale-repair-type.jsp"><div>问题类型配置</div></a></li> -->
<!--                 <li id="menu-postsale-repair-config"><a href="postsale-repair-problem.jsp"><div>受理问题配置</div></a></li> -->
<%--                 <sae:hasPermission name="售后维修.受理来源设置.查询"> --%>
<!--                 <li id="menu-postsale-repair-feedbacksource"><a href="postsale-repair-feedbacksource.jsp"><div>受理来源配置</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<!--
<!--                 <li id="menu-postsale-repair-price"><a href="postsale-repair-price.jsp"><div> 产品价格查询</div></a></li> -->
<!--             </ul> -->
<!--         </li> -->
<!--         <li id="menu-report"><img src="images/cs_op_icon_report.png"><div>报表统计</div></li> -->
<!--         <li id="menu-consult"><img src="images/cs_icon_internal_news.png"><div>内部资讯</div></li> -->
<!--         <li id="menu-resource"> -->
<!--             <img src="images/cs_op_icon_basic_resource.png" class="agent-tab-bar"><div class="agent-tab-bar">基础资料</div> -->
<!--             <div class="deliminator agent-tab-bar"></div> -->
<!--             <ul> -->
<%--                 <sae:hasPermission name="基础资料.集团设置.查询"> --%>
<!--                 <li id="menu-resource-group"><a href="resource-group.jsp"><div>集团</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="基础资料.项目设置.查询"> --%>
<!--                 <li id="menu-resource-project"><a href="resource-project.jsp"><div>项目</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="基础资料.网点设置.查询"> --%>
<!--                 <li id="menu-resource-salepoint"><a href="resource-salepoint.jsp"><div>网点</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="基础资料.供应商设置.查询"> --%>
<!--                 <li id="menu-resource-provider"><a href="resource-provider.jsp"><div>供应商</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="基础资料.终端类型设置.查询"> --%>
<!--                 <li id="menu-resource-devicetype" class="last-child"><a href="resource-devicetype.jsp"><div>终端类型</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<!--             </ul> -->
<!--         </li> -->
<!--         <li id="menu-company-portal"> -->
<!--             <img src="images/cs_op_icon_company_portal.png" class="agent-tab-bar"><div class="agent-tab-bar">公司门户</div> -->
<!--             <div class="deliminator agent-tab-bar"></div> -->
<!--             <ul> -->
<%--                 <sae:hasPermission name="公司门户.资源类型管理.查询"> --%>
<%--                 <sae:hasPermission name="公司门户.资源类型管理.添加"> --%>
<!--                 <li id="menu-portal-cms-mgt"><a href="portal-cms-mgt.jsp"><div>资源类型管理</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="公司门户.动态新闻.查询"> --%>
<%--                 <sae:hasPermission name="公司门户.动态新闻.添加"> --%>
<!--                 <li id="menu-portal-news-list"><a href="portal-news-list.jsp"><div>动态新闻发布</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="公司门户.招聘信息.查询"> --%>
<%--                 <sae:hasPermission name="公司门户.招聘信息.添加"> --%>
<!--                 <li id="menu-portal-jobs-list"><a href="portal-jobs-list.jsp"><div>招聘信息发布</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="公司门户.快讯信息.查询"> --%>
<%--                 <sae:hasPermission name="公司门户.快讯信息.添加"> --%>
<!--                 <li id="portal-flashnews-post"><a href="portal-flashnews-post.jsp"><div>快讯信息发布</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="公司门户.展会信息.查询"> --%>
<%--                 <sae:hasPermission name="公司门户.展会信息.添加"> --%>
<!--                 <li id="portal-flashnews-post"><a href="portal-exhibition-post.jsp"><div>展会信息发布</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="公司门户.APK版本.查询"> --%>
<!--                 <li id="menu-portal-apk-list" class="last-child"><a href="portal-apk-list.jsp"><div>APK版本发布</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<!--             </ul> -->
<!--         </li> -->
<!--         <li id="menu-content-check"> -->
<!--             <img src="images/cs_icon_content_check.png" class="agent-tab-bar"><div class="agent-tab-bar">内容审核</div> -->
<!--             <div class="deliminator agent-tab-bar"></div> -->
<!--             <ul> -->
<%--                 <sae:hasPermission name="内容审核.评论.查询"> --%>
<!--                 <li id="comment-check"><a href="comment-check.jsp"><div>评论</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="内容审核.图片.查询"> --%>
<!--                 <li id="image-check"><a href="image-check.jsp"><div>图片</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="内容审核.敏感词文件.添加"> --%>
<!--                 <li id="import-filterword"><a href="import_filterwords.jsp"><div>上传敏感词</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<!--             </ul> -->
<!--         </li> -->
        <li id="menu-systemset">
            <img src="images/cs_op_icon_systemset.png" class="agent-tab-bar"><div class="agent-tab-bar">系统设置</div>
            <div class="deliminator agent-tab-bar"></div>
            <ul>
                <sae:hasPermission name="系统设置.部门设置.查询">
                <li id="menu-setting-department"><a href="setting-department.jsp"><div>部门设置</div></a></li>
                </sae:hasPermission>
                <sae:hasPermission name="系统设置.职位设置.查询">
                <li id="menu-setting-position"><a href="setting-position.jsp"><div>职位设置</div></a></li>
                </sae:hasPermission>
                <sae:hasPermission name="系统设置.员工设置.查询">
                <li id="menu-setting-user"><a href="setting-user.jsp"><div>员工设置</div></a></li>
                </sae:hasPermission>
                <sae:hasPermission name="系统设置.权限组设置.查询">
                <li id="menu-setting-role"><a href="setting-role.jsp"><div>权限组设置</div></a></li>
                </sae:hasPermission>
                <sae:hasPermission name="系统设置.权限设置.查询">
                <sae:hasPermission name="系统设置.权限组设置.查询">
                <li id="menu-setting-permission"><a href="setting-permission.jsp"><div>权限设置</div></a></li>
                </sae:hasPermission>
                </sae:hasPermission>
                <sae:hasPermission name="系统设置.权限分配.编辑">
                <li id="menu-assign-permission"><a href="assign-permission.jsp"><div>权限分配</div></a></li>
                </sae:hasPermission>
                <sae:hasPermission name="系统设置.CCSS权限设置.查询">
                <li id="menu-ccss-permission"><a href="ccss-permission.jsp"><div>CCSS权限设置</div></a></li>
                </sae:hasPermission>
                <sae:hasPermission name="系统设置.用户设置.查询">
                <li id="menu-setting-user-role"><a href="setting-user-role.jsp"><div>用户设置</div></a></li>
                </sae:hasPermission>
                <sae:authenticated>
                <li id="menu-setting-modify-password"><a href="setting-modify-password.jsp"><div>修改密码</div></a></li>
                </sae:authenticated>
            </ul>
        </li>
<!--         <li id="menu-shortmsg"> -->
<!--             <img src="images/cs_icon_message_task.png" class="agent-tab-bar"><div class="agent-tab-bar">短信管理</div> -->
<!--             <div class="deliminator agent-tab-bar"></div> -->
<!--             <ul> -->
<%--                 <sae:hasPermission name="短信管理.短信任务.添加"> --%>
<%--                 <sae:hasPermission name="短信管理.号码组管理.查询"> --%>
<!--                 <li id="menu-shortmsg-edit"><a href="shortmsg-message-new.jsp"><div>编辑短信</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="短信管理.短信任务.查询"> --%>
<!--                 <li id="menu-shortmsg-query"><a href="shortmsg-message-query.jsp"><div>查询短信</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="短信管理.号码组管理.查询"> --%>
<!--                 <li id="menu-shortmsg-number-manager"><a href="shortmsg-number-manager.jsp"><div>号码组管理</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="短信管理.短信任务.审核"> --%>
<%--                 <sae:hasPermission name="短信管理.短信任务.查询"> --%>
<!--                 <li id="menu-shortmsg-check"><a href="shortmsg-task-check.jsp"><div>审核短信</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="短信管理.短信流量控制.查询"> --%>
<!--                 <li id="menu-shortmsg-check"><a href="sms-traffic-config-list.jsp"><div>短信流量控制</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<!--             </ul> -->
<!--         </li> -->
<!--         <li id="menu-tracker"> -->
<!--             <img src="images/cs_icon_message_task.png" class="agent-tab-bar"><div class="agent-tab-bar">Tracker管理</div> -->
<!--             <div class="deliminator agent-tab-bar"></div> -->
<!--             <ul> -->
<%--                 <sae:hasPermission name="Tracker管理.短信查询.启用"> --%>
<!--                 <li id="menu-tracker-sms-list"><a href="tracker-sms-list.jsp"><div>短信查询</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="Tracker管理.指令下发.启用"> --%>
<!--                 <li id="menu-tracker-commend-send"><a href="tracker-commend-send.jsp"><div>指令下发</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="Tracker管理.低电告警设置.启用"> --%>
<!--                 <li id="menu-tracker-lowpower-send"><a href="tracker-lowpower-send.jsp"><div>低电告警设置</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="Tracker管理.终端定位.启用"> --%>
<!--                 <li id="menu-tracker-position-show"><a href="tracker-position-show.jsp"><div>终端定位</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                 <sae:hasPermission name="Tracker管理.电子围栏.启用"> --%>
<!--                  <li id="menu-tracker-electfence"><a href="tracker-electfence.jsp"><div>电子栅栏</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                  <sae:hasPermission name="Tracker管理.卡资源管理.启用"> --%>
<!--                 <li id="menu-tracker-calManage"><a href="tracker-cal-manage.jsp"><div>卡资源管理</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                  <sae:hasPermission name="Tracker管理.终端管理.启用"> --%>
<!--                 <li id="menu-tracker-terminalManage"><a href="tracker-terminal-manage.jsp"><div>终端管理</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<%--                  <sae:hasPermission name="Tracker管理.用户管理.启用"> --%>
<!--                 <li id="menu-tracker-userManage"><a href="tracker-user-manage.jsp"><div>用户管理</div></a></li> -->
<%--                 </sae:hasPermission> --%>
<!--             </ul> -->
<!--         </li> -->
    </ul>
</div>