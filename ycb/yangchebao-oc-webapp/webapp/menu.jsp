<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sae" uri="sae.tld" %>
[   
	<sae:hasPermission name="养车宝后台管理.一级菜单.启用">
	{"id":"10","name":"后台管理","remark":"","submenu":[ 
	<sae:hasPermission name="养车宝后台管理.管理账号.启用">
		{"id":"1010","name":"管理账号","remark":"","url":"setting/setting-user.html"}, 
	</sae:hasPermission>
	<sae:hasPermission name="养车宝后台管理.账号设置.启用">
        {"id":"1020","name":"账号设置","remark":"","url":"setting/setting-userRole.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝后台管理.权限组设置.启用">	
		{"id":"1030","name":"权限组设置","remark":"","url":"setting/setting-role.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝后台管理.权限设置.启用">
		{"id":"1040","name":"权限设置","remark":"","url":"setting/setting-permission.jsp"}
	</sae:hasPermission> 
	],"url":""}, 
	</sae:hasPermission>
	<sae:hasPermission name="养车宝用户管理.一级菜单.启用"> 
	{"id":"20","name":"用户管理","remark":"","submenu":[
	<sae:hasPermission name="养车宝用户管理.用户管理.启用"> 
		{"id":"2010","name":"用户管理","remark":"","url":"userManage/user.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝用户管理.用户管理(客服).启用"> 
		{"id":"2140","name":"用户管理(客服)","remark":"","url":"userManage/user-service.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝用户管理.会员管理.启用">
		{"id":"2080","name":"会员管理","remark":"","url":"userManage/vip-manage.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝用户管理.用户黑名单.启用">
		{"id":"2100","name":"用户黑名单","remark":"","url":"userManage/userBlackList.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝用户管理.微信黑名单.启用">
		{"id":"2170","name":"微信黑名单","remark":"","url":"userManage/wxBlackList.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝用户管理.反馈管理.启用"> 
		{"id":"2020","name":"反馈管理","remark":"","url":"userManage/response.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝用户管理.商家评价.启用"> 
		{"id":"2030","name":"商家评价","remark":"","url":"userManage/remark.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝用户管理.服务评价.启用"> 
		{"id":"2040","name":"服务评价","remark":"","url":"userManage/serviceRemark.html"},
	</sae:hasPermission>  
	<sae:hasPermission name="养车宝用户管理.举报管理.启用"> 
		{"id":"2050","name":"举报管理","remark":"","url":"userManage/inform.html"},
	</sae:hasPermission> 
	<sae:hasPermission name="养车宝用户管理.账户管理.启用">
		{"id":"2060","name":"账户管理","remark":"","url":"userManage/account.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝用户管理.账户管理(客服).启用">
		{"id":"2150","name":"账户管理(客服)","remark":"","url":"userManage/account-service.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝用户管理.积分管理.启用"> 
		{"id":"2070","name":"积分管理","remark":"","url":"userManage/integrals.html"},
	</sae:hasPermission> 
	<sae:hasPermission name="养车宝用户管理.积分管理(客服).启用"> 
		{"id":"2160","name":"积分管理(客服)","remark":"","url":"userManage/integrals-service.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝用户管理.抵用券管理.启用">
		{"id":"2090","name":"抵用券管理","remark":"","url":"userManage/vouchers.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝用户管理.盒子用户管理.启用">
		{"id":"2120","name":"盒子用户管理","remark":"","url":"userManage/boxusermanager.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝用户管理.盒子补贴余额.启用">
		{"id":"2130","name":"盒子补贴余额","remark":"","url":"userManage/boxSubsidy.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝用户管理.养车宝盒子管理.启用">
		{"id":"2180","name":"养车宝盒子管理","remark":"","url":"userManage/ycbBoxManager.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝用户管理.代理商盒子管理.启用">
		{"id":"2190","name":"代理商盒子管理","remark":"","url":"userManage/agentBoxManager.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝用户管理.短信查询.启用">
		{"id":"2110","name":"短信查询","remark":"","url":"userManage/msgquery.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝用户管理.理赔员管理.启用">
		{"id":"2210","name":"理赔员管理","remark":"","url":"userManage/claimsManager.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝用户管理.用户提现管理.启用">
		{"id":"2220","name":"用户提现管理","remark":"","url":"userManage/userCash.html"}
	</sae:hasPermission>
	],"url":""}, 
	</sae:hasPermission>	
	<sae:hasPermission name="养车宝商家管理.一级菜单.启用"> 
	{"id":"30","name":"商家管理","remark":"","submenu":[
	<sae:hasPermission name="养车宝商家管理.商家信息管理.启用"> 
		{"id":"3010","name":"商家信息管理","remark":"","url":"shopManage/list2.html"},
	</sae:hasPermission>	
	<sae:hasPermission name="养车宝商家管理.黑名单管理.启用"> 
		{"id":"3020","name":"黑名单管理","remark":"","url":"shopManage/blackList.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝商家管理.结算管理.启用"> 
	    {"id":"3030","name":"结算管理","remark":"","url":"shopManage/settleAccount.html"},
    </sae:hasPermission>
	<sae:hasPermission name="养车宝商家管理.商家账户管理.启用"> 
	    {"id":"3070","name":"商家账户管理","remark":"","url":"shopManage/shopAccountManage.html"},
    </sae:hasPermission>
	<sae:hasPermission name="养车宝商家管理.商家提现审核.启用"> 
	    {"id":"3080","name":"商家提现审核","remark":"","url":"shopManage/cashReview.html"},
    </sae:hasPermission>
	<sae:hasPermission name="养车宝商家管理.商家收益管理.启用"> 
	    {"id":"3090","name":"商家收益管理","remark":"","url":"shopManage/incomeManage.html"},
    </sae:hasPermission>	
	<sae:hasPermission name="养车宝商家管理.收款账号管理.启用"> 
		{"id":"3040","name":"收款账号管理","remark":"","url":"shopManage/shroffAccount.html"},
	</sae:hasPermission>	
	<sae:hasPermission name="养车宝商家管理.兑换码管理.启用"> 
		{"id":"3050","name":"兑换码管理","remark":"","url":"shopManage/exchangeCode.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝商家管理.合同管理.启用"> 
		{"id":"3060","name":"合同管理","remark":"","url":"shopManage/contract.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝商家管理.代理商盒子返现.启用"> 
		{"id":"3110","name":"代理商盒子返现","remark":"","url":"shopManage/agentBoxCash.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝商家管理.商户玻璃水返现.启用"> 
		{"id":"3120","name":"商户玻璃水返现","remark":"","url":"shopManage/shopGlassCash.html"},
	</sae:hasPermission>	
	<sae:hasPermission name="养车宝商家管理.维修厂管理.启用"> 
		{"id":"3130","name":"维修厂管理","remark":"","url":"shopManage/repairFactory.html"}
	</sae:hasPermission>
	],"url":""},
	</sae:hasPermission>	
	<sae:hasPermission name="养车宝商家服务管理.一级菜单.启用"> 
	{"id":"40","name":"商家服务管理","remark":"","submenu":[ 
		<sae:hasPermission name="养车宝商家服务管理.美容.启用"> 
		{"id":"4010","name":"美容","remark":"","url":"service/beautify.html"},
		</sae:hasPermission>
		<sae:hasPermission name="养车宝商家服务管理.洗车.启用"> 
		{"id":"4020","name":"洗车","remark":"","url":"service/carwash.html"},
		</sae:hasPermission>
		<sae:hasPermission name="养车宝商家服务管理.保养.启用">  
		{"id":"4030","name":"保养","remark":"","url":"service/upkeep.html"},
		</sae:hasPermission>
		<sae:hasPermission name="养车宝商家服务管理.维修.启用"> 
		{"id":"4040","name":"维修","remark":"","url":"service/repair.html"},
		</sae:hasPermission>
		<sae:hasPermission name="养车宝商家服务管理.小保养.启用">
		{"id":"4050","name":"小保养","remark":"","url":"service/smallUpkeep.html"},
		</sae:hasPermission>
		<sae:hasPermission name="养车宝商家服务管理.标准化服务.启用">
		{"id":"4060","name":"标准化服务","remark":"","url":"service/standardService.html"}
		</sae:hasPermission>
	],"url":""},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝订单管理.一级菜单.启用"> 
	{"id":"50","name":"订单管理","remark":"","submenu":[ 
	<sae:hasPermission name="养车宝订单管理.订单管理.启用"> 
		{"id":"5010","name":"订单管理","remark":"","url":"order/list.html"}, 
	</sae:hasPermission>
	<sae:hasPermission name="养车宝订单管理.上门保养订单.启用">
		{"id":"5020","name":"上门保养订单","remark":"","url":"order/maintainOrder.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝订单管理.订单预警管理.启用">
		{"id":"5040","name":"订单预警管理","remark":"","url":"order/unOrder.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝订单管理.代驾订单.启用">
		{"id":"5030","name":"代驾订单","remark":"","url":"order/driveOrder.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝订单管理.加油卡订单.启用">
		{"id":"5060","name":"加油卡订单","remark":"","url":"order/oilOrder.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝订单管理.服务理赔单.启用">
		{"id":"5070","name":"服务理赔单","remark":"","url":"order/claims.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝订单管理.上门换电瓶订单.启用">
		{"id":"5090","name":"上门换电瓶订单","remark":"","url":"order/changeBattery.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝订单管理.上门检测订单.启用">
		{"id":"5103","name":"上门检测订单","remark":"","url":"order/doorTestOrder.html"}
	</sae:hasPermission>
	],"url":""}, 
	</sae:hasPermission>
	<sae:hasPermission name="养车宝代理商预付款管理.一级菜单.启用"> 
	{"id":"160","name":"代理商预付款管理","remark":"","submenu":[ 
	<sae:hasPermission name="养车宝代理商预付款管理.预付款管理.启用"> 
		{"id":"16010","name":"预付款管理","remark":"","url":"preCharge/preCharge.html"}, 
	</sae:hasPermission>
	<sae:hasPermission name="养车宝代理商预付款管理.省代理预付款管理.启用">
		{"id":"16020","name":"省代理预付款管理","remark":"","url":"preCharge/province_preCharge.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝代理商预付款管理.市代理预付款管理.启用">
		{"id":"16030","name":"市代理预付款管理","remark":"","url":"preCharge/city_preCharge.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝代理商预付款管理.预付款结算管理.启用">
		{"id":"16040","name":"预付款结算管理","remark":"","url":"preCharge/preSettle.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝代理商预付款管理.省代理预付款结算管理.启用">
		{"id":"16050","name":"省代理预付款结算管理","remark":"","url":"preCharge/province_preSettle.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝代理商预付款管理.省代理收款账号管理.启用">
		{"id":"16060","name":"省代理收款账号管理","remark":"","url":"preCharge/provinceAccount.html"}
	</sae:hasPermission>
	],"url":""}, 
	</sae:hasPermission>
	<sae:hasPermission name="养车宝车主卡管理.一级菜单.启用">
	{"id":"150","name":"车主卡管理","remark":"","submenu":[ 
	<sae:hasPermission name="养车宝车主卡管理.车主卡管理.启用">
		{"id":"15010","name":"车主卡管理","remark":"","url":"card/ownerCard.html"},
	</sae:hasPermission>	
	<sae:hasPermission name="养车宝车主卡管理.车主卡订单管理.启用">
		{"id":"15050","name":"车主卡订单管理","remark":"","url":"card/ownerCardOrder.html"},
	</sae:hasPermission>	
	<sae:hasPermission name="养车宝车主卡管理.代理商车主卡管理.启用">
		{"id":"15060","name":"代理商车主卡管理","remark":"","url":"card/ownerCardAgent.html"},
	</sae:hasPermission>	
	<sae:hasPermission name="养车宝车主卡管理.代理商车主卡订单管理.启用">
		{"id":"15070","name":"代理商车主卡订单管理","remark":"","url":"card/CardOrderAgent.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝车主卡管理.车主卡管理(客服).启用">
		{"id":"15040","name":"车主卡管理(客服)","remark":"","url":"card/ownerCard-service.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝车主卡管理.商家车主卡管理.启用">
		{"id":"15020","name":"商家车主卡管理","remark":"","url":"card/busicard-manage.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝车主卡管理.第三方赠送车主卡.启用">
		{"id":"15030","name":"第三方赠送车主卡","remark":"","url":"card/thirdParty-sendCard.html"}
	</sae:hasPermission>
	],"url":""},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝保险管理.一级菜单.启用">
	{"id":"151","name":"保险管理","remark":"","submenu":[ 
	<sae:hasPermission name="养车宝保险管理.保险未比价用户信息.启用">
		{"id":"15110","name":"保险未比价用户信息","remark":"","url":"InsuranceMage/noComparisonInfo.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝保险管理.易保险订单.启用">
		{"id":"15120","name":"易保险订单","remark":"","url":"InsuranceMage/easyInsurance.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝保险管理.易保险代理商订单.启用">
		{"id":"15130","name":"易保险代理商订单","remark":"","url":"InsuranceMage/easyInsuranceAgent.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝保险管理.保险理赔单.启用">
		{"id":"15140","name":"保险理赔单","remark":"","url":"InsuranceMage/insuranceOrder.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝保险管理.商家保险提成设置.启用">
		{"id":"15150","name":"商家保险提成设置","remark":"","url":"InsuranceMage/insuranceCommissEdit.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝保险管理.去哪保订单.启用">
		{"id":"15160","name":"去哪保订单","remark":"","url":"InsuranceMage/carInsurance.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝保险管理.基金账户管理.启用">
		{"id":"15170","name":"基金账户管理","remark":"","url":"InsuranceMage/fundAccountManage.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝保险管理.保险渠道返现管理.启用">
		{"id":"15180","name":"保险渠道返现管理","remark":"","url":"InsuranceMage/insuranceRecash.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝保险管理.微信保险活动.启用">
		{"id":"15190","name":"微信保险活动","remark":"","url":"InsuranceMage/wxInsurance.html"}
	</sae:hasPermission>
	],"url":""},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝商家信息审核.一级菜单.启用"> 
	{"id":"60","name":"商家信息审核","remark":"","submenu":[ 
		<sae:hasPermission name="养车宝商家信息审核.商家信息审核.启用"> 
		{"id":"6010","name":"商家信息审核","remark":"","url":"check/shopCheck.html"},
		</sae:hasPermission>
		<sae:hasPermission name="养车宝商家信息审核.服务审核.启用"> 
		{"id":"6020","name":"服务审核","remark":"","url":"check/serviceCheck.html"}, 
		</sae:hasPermission>
		<sae:hasPermission name="养车宝商家信息审核.图片审核.启用"> 
		{"id":"6030","name":"图片审核","remark":"","url":"check/imgCheck.html"},
		</sae:hasPermission>
		<sae:hasPermission name="养车宝商家信息审核.套餐审核.启用"> 
		{"id":"6040","name":"套餐审核","remark":"","url":"check/dinnerCheck.html"},
		</sae:hasPermission>
		<sae:hasPermission name="养车宝商家信息审核.认证用户审核.启用">
		{"id":"6050","name":"认证用户审核","remark":"","url":"check/accreditUseCheck.html"},
		</sae:hasPermission>
		<sae:hasPermission name="养车宝商家信息审核.标准化服务审核.启用">
		{"id":"6060","name":"标准化服务审核","remark":"","url":"check/standardCheck.html"}
		</sae:hasPermission>
	],"url":""},  
	</sae:hasPermission>
	<sae:hasPermission name="养车宝营销管理.一级菜单.启用"> 
	{"id":"70","name":"营销管理","remark":"","submenu":[ 
	<sae:hasPermission name="养车宝营销管理.系统消息管理.启用"> 
	{"id":"7010","name":"系统消息管理","remark":"","url":"message/system-message.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝营销管理.商家系统消息管理.启用"> 
	{"id":"7020","name":"商家系统消息管理","remark":"","url":"message/businesystem-message.html"},
	</sae:hasPermission>	
	<sae:hasPermission name="养车宝营销管理.广告管理.启用"> 
	{"id":"7030","name":"广告管理","remark":"","url":"message/ads-manage.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝营销管理.代理商首页管理.启用">
	{"id":"7120","name":"代理商首页管理","remark":"","url":"message/agentHome-manage.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝营销管理.市场活动页面管理.启用">
	{"id":"7210","name":"市场活动页面管理","remark":"","url":"message/marketActivePages.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝营销管理.二维码活动管理.启用"> 
	{"id":"7040","name":"二维码活动管理","remark":"","url":"message/QRcode-manage.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝营销管理.活动管理.启用"> 
	{"id":"7050","name":"活动管理","remark":"","url":"message/active-manage.html"},
	</sae:hasPermission>	
	<sae:hasPermission name="养车宝营销管理.积分换购管理.启用"> 
	{"id":"7060","name":"积分换购管理","remark":"","url":"message/integralPay-manage.html"},
	</sae:hasPermission>	
	<sae:hasPermission name="养车宝营销管理.套餐管理.启用"> 
	{"id":"7070","name":"套餐管理","remark":"","url":"message/dinner-manage.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝营销管理.代金券管理.启用"> 
	{"id":"7080","name":"代金券管理","remark":"","url":"message/voucher-manage.html"},
	</sae:hasPermission>	
	<sae:hasPermission name="养车宝营销管理.运营页面管理.启用"> 
	{"id":"7090","name":"运营页面管理","remark":"","url":"message/operationPages.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝营销管理.外发代金券管理.启用"> 
	{"id":"7100","name":"外发代金券管理","remark":"","url":"message/handoutVoucher.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝营销管理.微信代金券管理.启用">
	{"id":"7110","name":"微信代金券管理","remark":"","url":"message/microletterVoucher.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝营销管理.业务员推广管理.启用">
	{"id":"7130","name":"业务员推广管理","remark":"","url":"message/salePromotion-manage.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝营销管理.工资提现管理.启用">
	{"id":"7140","name":"工资提现管理","remark":"","url":"message/payCash-manage.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝营销管理.业务员收款账号管理.启用">
	{"id":"7150","name":"业务员收款账号管理","remark":"","url":"message/saleAccount-manage.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝营销管理.抢购活动管理.启用">
	{"id":"7170","name":"抢购活动管理","remark":"","url":"message/assist.html"}
	</sae:hasPermission>
	],"url":""},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝资讯管理.一级菜单.启用">  
	{"id":"80","name":"资讯管理","remark":"","submenu":[  
	<sae:hasPermission name="养车宝资讯管理.资讯分类管理.启用"> 
	{"id":"8010","name":"资讯分类管理","remark":"","url":"information/category-manage.html"}, 
	</sae:hasPermission>	
	<sae:hasPermission name="养车宝资讯管理.资讯管理列表.启用"> 
    {"id":"8020","name":"资讯管理列表","remark":"","url":"information/information-manage.html"}
	</sae:hasPermission>	
	],"url":""},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝问答管理.一级菜单.启用">  
	{"id":"170","name":"问答管理","remark":"","submenu":[  
	<sae:hasPermission name="养车宝问答管理.问答管理.启用"> 
	{"id":"17010","name":"问答管理","remark":"","url":"answer/answer-manage.html"}
	</sae:hasPermission>		
	],"url":""},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝行车信息管理.一级菜单.启用"> 	
	{"id":"90","name":"行车信息管理","remark":"","submenu":[
	<sae:hasPermission name="养车宝行车信息管理.加油站管理.启用">
	{"id":"9010","name":"加油站管理","remark":"","url":"oilPrice/oilStation.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝行车信息管理.用户反馈油价审核.启用">
	{"id":"9020","name":"用户反馈油价审核","remark":"","url":"oilPrice/userOilPrice.html"}, 
	</sae:hasPermission>
	<sae:hasPermission name="养车宝行车信息管理.油价红包管理.启用">
	{"id":"9030","name":"油价红包管理","remark":"","url":"oilPrice/OilRedpaper.html"}, 
	</sae:hasPermission>
	<sae:hasPermission name="养车宝行车信息管理.油价管理.启用"> 	
	{"id":"9040","name":"油价管理","remark":"","url":"oilPrice/list.html"}, 
	</sae:hasPermission>
	<sae:hasPermission name="养车宝行车信息管理.油价变动预警.启用"> 	
	{"id":"9050","name":"油价变动预警","remark":"","url":"oilPrice/oilPriceWarning.html"}
	</sae:hasPermission>
	],"url":""},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝客户端管理.一级菜单.启用"> 	
	{"id":"100","name":"客户端管理","remark":"","submenu":[
	<sae:hasPermission name="养车宝客户端管理.搜索关键字管理.启用">
	{"id":"10010","name":"搜索关键字管理","remark":"","url":"clientside/keyWord.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝客户端管理.敏感词管理.启用"> 
	{"id":"10020","name":"敏感词管理","remark":"","url":"clientside/forbiddenWord.html"},
	</sae:hasPermission>	
	<sae:hasPermission name="养车宝客户端管理.升级管理.启用"> 
	{"id":"10030","name":"升级管理","remark":"","url":"clientside/upgrade.html"}
	</sae:hasPermission>		
	],"url":""},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝积分商城管理.一级菜单.启用"> 	
	{"id":"220","name":"积分商城管理","remark":"","submenu":[
	<sae:hasPermission name="养车宝积分商城管理.积分商城管理.启用">
	{"id":"22010","name":"积分商城管理","remark":"","url":"integral/integral-shop.html"}
	</sae:hasPermission>	
	],"url":""},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝商家后台管理.一级菜单.启用"> 	
	{"id":"110","name":"商家后台管理","remark":"","submenu":[ 
	<sae:hasPermission name="养车宝商家后台管理.商家账号管理.启用"> 
	{"id":"11010","name":"商家账号管理","remark":"","url":"shopVip/account.html"}, 
	</sae:hasPermission>	
	<sae:hasPermission name="养车宝商家后台管理.代理商商家账号管理.启用"> 
	{"id":"11050","name":"代理商商家账号管理","remark":"","url":"shopVip/agents-account.html"}, 
	</sae:hasPermission>
	<sae:hasPermission name="养车宝商家后台管理.商家权限管理.启用"> 
	{"id":"11020","name":"商家权限管理","remark":"","url":"shopVip/setting-role.html"}, 
	</sae:hasPermission>
	<sae:hasPermission name="养车宝商家后台管理.商家权限设置.启用"> 
	{"id":"11030","name":"商家权限设置","remark":"","url":"shopVip/setting-permission.jsp"}, 
	</sae:hasPermission>		
	<sae:hasPermission name="养车宝商家后台管理.我要管理.启用"> 
	{"id":"11040","name":"我要管理","remark":"","url":"shopVip/userWant.html"}
	</sae:hasPermission>	
	],"url":""}	,
	</sae:hasPermission>
	<sae:hasPermission name="养车宝清空缓存.一级菜单.启用"> 
	{"id":"120","name":"清空缓存","remark":"","submenu":[ 
	<sae:hasPermission name="养车宝清空缓存.清空缓存.启用"> 
		{"id":"12010","name":"清空缓存","remark":"","url":"cache.html"} 
	</sae:hasPermission>	
	],"url":""}, 
	</sae:hasPermission>
	<sae:hasPermission name="养车宝渠道号管理.一级菜单.启用"> 
	{"id":"130","name":"渠道号管理","remark":"","submenu":[  
	<sae:hasPermission name="养车宝渠道号管理.渠道号管理.启用"> 
	{"id":"13010","name":"渠道号管理","remark":"","url":"channel/channelManage.html"}  
	</sae:hasPermission>	 
	],"url":""},
    </sae:hasPermission>
    <sae:hasPermission name="养车宝上门检测管理.一级菜单.启用"> 
	{"id":"180","name":"上门检测管理","remark":"","submenu":[  
	<sae:hasPermission name="养车宝上门检测管理.工单管理.启用"> 
	{"id":"18010","name":"工单管理","remark":"","url":"doorTest/workOrder.html"}, 
	</sae:hasPermission>
	<sae:hasPermission name="养车宝上门检测管理.档案管理.启用"> 
	{"id":"18020","name":"档案管理","remark":"","url":"doorTest/archives.html"}, 
	</sae:hasPermission>	
	<sae:hasPermission name="养车宝上门检测管理.再次检测管理.启用"> 
	{"id":"18030","name":"再次检测管理","remark":"","url":"doorTest/nextWorkOrder.html"}, 
	</sae:hasPermission> 
	],"url":""},
    </sae:hasPermission>
    <sae:hasPermission name="养车宝官网管理.一级菜单.启用"> 
    {"id":"140","name":"官网管理","remark":"","submenu":[ 
    <sae:hasPermission name="养车宝官网管理.广告位管理.启用">   
	{"id":"14010","name":"广告位管理","remark":"","url":"website/ad.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝官网管理.下载管理.启用"> 
	{"id":"14020","name":"下载管理","remark":"","url":"website/appDownload.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝官网管理.文章管理.启用"> 
	{"id":"14030","name":"文章管理","remark":"","url":"website/article.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝官网管理.页脚管理.启用">
	{"id":"14040","name":"页脚管理","remark":"","url":"website/footer.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝官网管理.优质商家管理.启用">
	{"id":"14050","name":"优质商家管理","remark":"","url":"website/greateBusiness.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝官网管理.商家攻略管理.启用">
	{"id":"14060","name":"商家攻略管理","remark":"","url":"website/strategy.html"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝官网管理.代理商查询管理.启用">
	{"id":"14070","name":"代理商查询管理","remark":"","url":"website/agentSearch.html"}
	</sae:hasPermission>
	],"url":""},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝软件发布管理.一级菜单.启用"> 
    {"id":"140","name":"软件发布","remark":"","submenu":[ 
    <sae:hasPermission name="养车宝软件发布管理.应用列表.启用">   
	{"id":"00001","name":"应用列表","remark":"","url":"sps/application/list.jsp"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝官网管理.渠道列表.启用"> 
	{"id":"00101","name":"渠道列表","remark":"","url":"sps/channel/channel_list.jsp"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝官网管理.渠道包下载.启用"> 
	{"id":"00102","name":"渠道包下载","remark":"","url":"sps/channel/channel_package_down.jsp"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝官网管理.推广码管理.启用">
	{"id":"00201","name":"推广码","remark":"","url":"sps/baseconfig/spread_way_list.jsp"},
	</sae:hasPermission>
	<sae:hasPermission name="养车宝官网管理.结算码管理.启用">
	{"id":"00202","name":"结算码","remark":"","url":"sps/baseconfig/settlement_way_list.jsp"},
	</sae:hasPermission>
	],"url":""}
	</sae:hasPermission>
]