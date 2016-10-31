<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sae" uri="sae.tld" %>
[
<sae:hasPermission name="商家权限.审核结果.启用">
	{"id":"11","name":"审核结果","url":"auditResult.html","style":"icon-shop-apply"},
</sae:hasPermission>
<sae:hasPermission name="商家权限.服务码验证.启用">
	{"id":"01","name":"服务码验证","url":"promoCode-v.html","style":"icon-search"},
</sae:hasPermission>
<sae:hasPermission name="商家权限.首页.启用">
	{"id":"15","name":"首页","url":"home.html","style":"icon-align-justify"},
</sae:hasPermission>
<sae:hasPermission name="商家权限.客户管理.启用">
	{"id":"24","name":"客户管理","style":"icon-user","submenu":[
		<sae:hasPermission name="商家权限.客户资料.启用">
			{"id":"2401","name":"客户资料","style":"icon-table","submenu":[
				<sae:hasPermission name="商家权限.所有客户信息.启用">
					{"id":"240101","name":"所有客户信息","url":"userManage/users.html","style":"icon-double-angle-right"},
				</sae:hasPermission>
				<sae:hasPermission name="商家权限.会员客户信息.启用">
					{"id":"240102","name":"会员客户信息","url":"userManage/userVip.html","style":"icon-double-angle-right"}
				</sae:hasPermission>
		 	]},
		</sae:hasPermission>
		<sae:hasPermission name="商家权限.车辆管理.启用">
			{"id":"2402","name":"车辆管理","style":"icon-table","submenu":[
				<sae:hasPermission name="商家权限.客户车辆.启用"> 
					{"id":"240201","name":"客户车辆","url":"userManage/userCar.html","style":"icon-double-angle-right"}
				</sae:hasPermission>
		 	]},
		</sae:hasPermission>
		<sae:hasPermission name="商家权限.客户召回管理.启用">
			{"id":"2403","name":"客户召回管理","style":"icon-table","submenu":[
				<sae:hasPermission name="商家权限.保养召回.启用">
					{"id":"240301","name":"保养召回","url":"accountRecall/repairRecall.html","style":"icon-double-angle-right"},
				</sae:hasPermission> 
				<sae:hasPermission name="商家权限.消费提醒召回.启用"> 
					{"id":"240301","name":"消费提醒召回","url":"accountRecall/remindRecall.html","style":"icon-double-angle-right"}
				</sae:hasPermission>
		 	]}
		</sae:hasPermission>
	]},
</sae:hasPermission>
<sae:hasPermission name="商家权限.进销存管理.启用">
	{"id":"18","name":"进销存管理","style":"icon-truck","submenu":[
		<sae:hasPermission name="商家权限.商品管理.启用">
			{"id":"1801","name":"商品管理","style":"icon-table","submenu":[
				<sae:hasPermission name="商家权限.商品列表.启用">
					{"id":"180101","name":"商品列表","url":"goodsManage/goodslist.html","style":"icon-double-angle-right"}
				</sae:hasPermission>
		 	]},
		</sae:hasPermission>
		<sae:hasPermission name="商家权限.入库管理.启用">
			{"id":"1802","name":"入库管理","style":"icon-table","submenu":[
				<sae:hasPermission name="商家权限.商品入库.启用">
					{"id":"180201","name":"商品入库","url":"putInstorage/putIntable.html","style":"icon-double-angle-right"},
				</sae:hasPermission>
				<sae:hasPermission name="商家权限.入库单列表.启用">
					{"id":"180202","name":"入库单列表","url":"putInstorage/warehousing.html","style":"icon-double-angle-right"}
				</sae:hasPermission>
		 	]},
		</sae:hasPermission>
		<sae:hasPermission name="商家权限.出库管理.启用">
			{"id":"1803","name":"出库管理","style":"icon-table","submenu":[
				<sae:hasPermission name="商家权限.出库单列表.启用">
					{"id":"180301","name":"出库单列表","url":"outbound/outTable.html","style":"icon-double-angle-right"},
				</sae:hasPermission>
				<sae:hasPermission name="商家权限.特殊出库.启用">
					{"id":"180302","name":"特殊出库","url":"outbound/specialTable.html","style":"icon-double-angle-right"}
				</sae:hasPermission>
		 	]}
		</sae:hasPermission>
	]},
</sae:hasPermission>
<sae:hasPermission name="商家权限.业务管理.启用">
	{"id":"25","name":"业务管理","style":"icon-briefcase","submenu":[
		<sae:hasPermission name="商家权限.订单管理.启用">
			{"id":"2501","name":"订单管理","style":"icon-table","submenu":[
				<sae:hasPermission name="商家权限.订单管理.启用"> 
					{"id":"250101","name":"订单管理","url":"orderManage.html","style":"icon-file-text-alt"},
				</sae:hasPermission>
				<sae:hasPermission name="商家权限.分店订单管理.启用">
					{"id":"250102","name":"分店订单管理","url":"branchManage/orderManage-branch.html","style":"icon-double-angle-right"}
				</sae:hasPermission>
		 	]},
		</sae:hasPermission>
		<sae:hasPermission name="商家权限.预约管理.启用">
			{"id":"2502","name":"预约管理","style":"icon-table","submenu":[
				<sae:hasPermission name="商家权限.预约管理.启用"> 
					{"id":"250201","name":"预约管理","url":"appointment/appointmentList.html","style":"icon-double-angle-right"}
				</sae:hasPermission>
		 	]},
		</sae:hasPermission>
		<sae:hasPermission name="商家权限.工单管理.启用">
			{"id":"2503","name":"工单管理","style":"icon-table","submenu":[
				<sae:hasPermission name="商家权限.工单管理.启用"> 
					{"id":"250301","name":"工单管理","url":"workOrderManage.html","style":"icon-wrench"}
				</sae:hasPermission>
		 	]},
		</sae:hasPermission>
		<sae:hasPermission name="商家权限.车险管理.启用">
			{"id":"2504","name":"车险管理","style":"icon-table","submenu":[
				<sae:hasPermission name="商家权限.车险购买.启用">
					{"id":"250401","name":"车险购买","url":"carInsurance/insuranceShop.html","style":"icon-double-angle-right"},
				</sae:hasPermission>
				<sae:hasPermission name="商家权限.车险订单.启用">
					{"id":"250402","name":"车险订单","url":"carInsurance/insuranceOrder.html","style":"icon-double-angle-right"},
				</sae:hasPermission>
				<sae:hasPermission name="商家权限.提成详情.启用">
					{"id":"250403","name":"提成详情","url":"carInsurance/insuranceInfo.html","style":"icon-double-angle-right"}
				</sae:hasPermission>
		 	]},
		</sae:hasPermission>
		<sae:hasPermission name="商家权限.车主卡管理.启用">
			{"id":"2506","name":"车主卡管理","style":"icon-table","submenu":[
				<sae:hasPermission name="商家权限.我的车主卡.启用"> 
					{"id":"250601","name":"我的车主卡","url":"ownerCard/myCard.html","style":"icon-wrench"}
				</sae:hasPermission>
		 	]},
		</sae:hasPermission>
		<sae:hasPermission name="商家权限.乐乘盒管理.启用">
			{"id":"2505","name":"乐乘盒管理","style":"icon-table","submenu":[
				<sae:hasPermission name="商家权限.碰撞告警.启用">
					{"id":"250501","name":"碰撞告警","url":"crashArarm.html","style":"icon-ambulance"}
				</sae:hasPermission>
		 	]}
		</sae:hasPermission>
	]},
</sae:hasPermission>
<sae:hasPermission name="商家权限.账务管理.启用">
	{"id":"26","name":"账务管理","style":" icon-skype","submenu":[
		<sae:hasPermission name="商家权限.账户管理.启用">
			{"id":"2601","name":"账户管理","style":"icon-table","submenu":[
				<sae:hasPermission name="商家权限.我的账户.启用">
					{"id":"260101","name":"我的账户","url":"account/myAccount.html","style":"icon-double-angle-right"},
				</sae:hasPermission>
				<sae:hasPermission name="商家权限.收款账号.启用">
					{"id":"260102","name":"收款账号","url":"account/accountInfo.html","style":"icon-double-angle-right"},
				</sae:hasPermission>
				<sae:hasPermission name="商家权限.在线支付申请.启用">
					{"id":"260103","name":"在线支付申请","url":"account/applyCharge.html","style":"icon-double-angle-right"}
				</sae:hasPermission>
		 	]},
		</sae:hasPermission>
		<sae:hasPermission name="商家权限.统计报表.启用">
			{"id":"2602","name":"统计报表","style":"icon-table","submenu":[
				<sae:hasPermission name="商家权限.结算列表.启用">
					{"id":"260201","name":"结算列表","url":"account/settleAccount.html","style":"icon-double-angle-right"},
				</sae:hasPermission>
				<sae:hasPermission name="商家权限.本店统计报表.启用">
					{"id":"260202","name":"本店统计报表","url":"statement/stat.html","style":"icon-double-angle-right"},
				</sae:hasPermission>
				<sae:hasPermission name="商家权限.分店统计报表.启用">
					{"id":"260203","name":"分店统计报表","url":"branchManage/stat-branch.html","style":"icon-double-angle-right"}
				</sae:hasPermission>
		 	]}
		</sae:hasPermission>
	]},
</sae:hasPermission>
<sae:hasPermission name="商家权限.会员管理.启用">
	{"id":"22","name":"会员管理","style":"icon-credit-card","submenu":[
		<sae:hasPermission name="商家权限.卡种设置.启用">
			{"id":"2201","name":"卡种设置","url":"vipManage/cardType.html","style":"icon-double-angle-right"},
		</sae:hasPermission>
		<sae:hasPermission name="商家权限.会员卡办理.启用">
			{"id":"2202","name":"会员卡办理","url":"vipManage/createCard.html","style":"icon-double-angle-right"},
		</sae:hasPermission>
		<sae:hasPermission name="商家权限.会员卡消费.启用">
			{"id":"2203","name":"会员卡消费","url":"vipManage/cardConsumption.html","style":"icon-double-angle-right"},
		</sae:hasPermission>
		<sae:hasPermission name="商家权限.会员卡管理.启用">
			{"id":"2204","name":"会员卡管理","url":"vipManage/vipCardManage.html","style":"icon-double-angle-right"}
		</sae:hasPermission>
	]},
</sae:hasPermission>
<sae:hasPermission name="商家权限.客户需求.启用">
{"id":"08","name":"客户需求","url":"userWant.html","style":"icon-smile"},
</sae:hasPermission>
<sae:hasPermission name="商家权限.基础设置.启用">
	{"id":"27","name":"基础设置","style":"icon-wrench","submenu":[
		<sae:hasPermission name="商家权限.店铺设置.启用">
			{"id":"2701","name":"店铺设置","style":"icon-table","submenu":[
				<sae:hasPermission name="商家权限.主店信息.启用">
					{"id":"270101","name":"主店信息","url":"myShop/myShopManage.html","style":"icon-double-angle-right"},
				</sae:hasPermission>
				<sae:hasPermission name="商家权限.分店信息.启用">
					{"id":"270102","name":"分店信息","url":"branchManage/shopInfoEdit-branch.html","style":"icon-double-angle-right"},
				</sae:hasPermission>
				<sae:hasPermission name="商家权限.分店账号.启用">
					{"id":"270103","name":"分店账号","url":"branchManage/accountManage-branch.html","style":"icon-double-angle-right"}
				</sae:hasPermission>
		 	]},
		</sae:hasPermission>
		<sae:hasPermission name="商家权限.服务设置.启用">
			{"id":"2702","name":"服务设置","style":"icon-table","submenu":[
				<sae:hasPermission name="商家权限.基础服务.启用">
					{"id":"270201","name":"基础服务","url":"serviceManage/serviceInfoEdit.html","style":"icon-double-angle-right"},
				</sae:hasPermission>
				<sae:hasPermission name="商家权限.标准化服务.启用">
					{"id":"270202","name":"标准化服务","url":"serviceManage/standardService.html","style":"icon-double-angle-right"},
				</sae:hasPermission>
				<sae:hasPermission name="商家权限.救援服务.启用">
					{"id":"270203","name":"救援服务","url":"serviceManage/rescueManage.html","style":"icon-double-angle-right"},
				</sae:hasPermission>
				<sae:hasPermission name="商家权限.分店服务.启用">
					{"id":"270204","name":"分店服务","url":"branchManage/serviceInfoEdit-branch.html","style":"icon-double-angle-right"}
				</sae:hasPermission>
		 	]},
		</sae:hasPermission>
		<sae:hasPermission name="商家权限.员工设置.启用">
			{"id":"2703","name":"员工设置","style":"icon-table","submenu":[
				<sae:hasPermission name="商家权限.员工列表.启用">
					{"id":"270301","name":"员工列表","url":"workerManage/workerList.html","style":"icon-double-angle-right"}
				</sae:hasPermission>
		 	]},
		</sae:hasPermission>
		<sae:hasPermission name="商家权限.工位设置.启用">
			{"id":"2704","name":"工位设置","style":"icon-table","submenu":[
				<sae:hasPermission name="商家权限.工位管理.启用">
					{"id":"270401","name":"工位管理","url":"myShop/stationManage.html","style":"icon-double-angle-right"}
				</sae:hasPermission>
		 	]},
		</sae:hasPermission>
		<sae:hasPermission name="商家权限.APP设置.启用">
			{"id":"2705","name":"APP设置","style":"icon-table","submenu":[
				<sae:hasPermission name="商家权限.App设置.启用">
					{"id":"270501","name":"App设置","url":"radioManage.html","style":"icon-volume-up"}
				</sae:hasPermission>
		 	]}
		</sae:hasPermission>
	]},
</sae:hasPermission>
<sae:hasPermission name="商家权限.使用说明.启用">
{"id":"10","name":"使用说明 ","url":"useDirection/useDirection.html","style":"icon-download"}
</sae:hasPermission>
]