
$(document).ready(function(){ 
	
	var wraper = $('#Wraper_vipCard_Manage');
	//初始化tab页默认展示第一个
    $('#vipCardManageTabs',wraper).tabs({
    	active:0 
    });  
    
    
    var tempData=$.jRadGet({
		url:'/vip-ws/ws/0.1/business/queryBasicInfo?shopAccountId='+carsmart_config.shopId
	});
    
    //第二个tab页点击事件
    $('#vipCardManageTabs ul li:eq(1)').click(function(){
        showValidVipCard(tempData,wraper);
    });
    $('#vipCardManageTabs ul li:eq(2)').click(function(){
        showWouldConsume(tempData,wraper);
    });	
    var optionStr=''
    $.each(tempData,function(){
    	optionStr='<option value='+carsmart_config.businessInfoId+' >'+tempData.businessRegName.beforeUpdate+'</option>'
    });
    $('#vipCardCount div.ydiv #businessInfoId',wraper).append(optionStr);
    //默认展示当天
    showCardInfoByDate('',wraper);
    
    //查询当天
    $('#vipCardCount a.searchNowDay', wraper).unbind('click').click(function() {
    	
    	$('#vipCardCount div.diySearchClass', wraper).hide();
    	var date=new Date;
    	var startDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    	var nowDay = startDate+';'+startDate;
    	showCardInfoByDate(nowDay,wraper);
    	
	});
    
    //查询当月
    $('#vipCardCount a.searchNowMonth', wraper).unbind('click').click(function() {
    	
    	$('#vipCardCount div.diySearchClass', wraper).hide();
    	var date=new Date;
    	var startDate =date.getFullYear()+"-"+(date.getMonth()+1)+'-01';
    	var endDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    	var nowMonth = startDate+';'+endDate;
    	showCardInfoByDate(nowMonth,wraper);
    	
	});
    //自定义事件
   $('#vipCardCount a.serarchDiyTime', wraper).unbind('click').click(function() {
	   
	   $('#vipCardCount div.diySearchClass', wraper).show();
	   var date=new Date;
	   var startDate = date.getFullYear()+"-0"+(date.getMonth()+1)+"-"+date.getDate();
	   $("#vipCardCount div.diySearchClass #startDate").val(startDate);
	   $("#vipCardCount div.diySearchClass #endDate").val(startDate);
	   var nowDay = startDate+';'+startDate;
	   //自定义事件默认查询当天的
	   showCardInfoByDate(nowDay,wraper);
	   
	   
	});
    
    $('#vipCardCount button.search', wraper).unbind('click').click(function() {
    	
    	var startDate = $(this).siblings("#startDate").val();
    	var endDate =$(this).siblings("#endDate").val();
    	var businessInfoId = $(this).siblings("#businessInfoId").val();
    	var date = startDate+';'+endDate;
    	
    	showCardInfoByDate(date,wraper);
    	
	});
});

//根据时间来查询会员卡统计结果
function showCardInfoByDate(date,wraper){
	
   	initVipCardCount(wraper);
   	if(date==''){
   		var date=new Date;
    	var startDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    	var endDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    	var nowDay = startDate+';'+endDate;
    	showCardInfoByDate(nowDay,wraper);
    	return;
   	}
	$.jRadGet({
		url: '/vip-ws/ws/0.1/memberCard/statisticsMemberCard?businessInfoId='+carsmart_config.businessInfoId+'&date='+date,
		success: function(data) {
			$("#vipCardCount div[name='chargeAmount']",wraper).html(data.chargeAmount);
			$("#vipCardCount div[name='chargeMoney']",wraper).html(data.chargeMoney);
			$("#vipCardCount div[name='consumeAmount']",wraper).html(data.consumeAmount);
			$("#vipCardCount div[name='consumeMoney']",wraper).html(data.consumeMoney);
			$("#vipCardCount div[name='recordAmount']",wraper).html(data.recordAmount);
			$("#vipCardCount div[name='memberCardSumAmount']",wraper).html(data.memberCardSumAmount);
			$("#vipCardCount div[name='memberCardSumMoney']",wraper).html(data.memberCardSumMoney);
			
			var buyChargeStr='';
			$.each(data.buyChargeList,function(){
				buyChargeStr+='<tr>'
							 +'<td>'+this.handleName+'</td>'
							 +'<td>'+this.amount+'</td>'
							 +'<td>'+this.discountMoney+'</td>'
							 +'<td>'+this.freeMoney+'</td>'
							 +'<td>'+this.atualMoney+'</td>'
							 +'</tr>';
			});
			 $('#vipCardCount table#buyChargeList tbody',wraper).append(buyChargeStr);
			
			
			var memberCardStr='';
			$.each(data.memberCardList,function(){
				memberCardStr+='<tr>'
							 +'<td>'+this.memberCardName+'</td>'
							 +'<td>'+this.amount+'</td>'
							 +'<td>'+this.atualMoney+'</td>'
							 +'</tr>';
			});
			$('#vipCardCount table#memberCardList tbody',wraper).append(memberCardStr);
		},
		error: function(data) {
			var mes = eval('(' + data.responseText + ')');
				$.jRadMessage({
					level: 'error',
					message: mes[0].message
				});
		}
	});
	
	
}


//清空一些展示的值
function initVipCardCount(wraper){
	$('#vipCardCount table#memberCardList tbody',wraper).html('');
	$('#vipCardCount table#buyChargeList tbody',wraper).html('');
}

function showValidVipCard(tempData,wraper){
	
    var page_column_model = new Array();
    var page_search_items = new Array();
    var page_list_buttons = new Array();
    
    var entityModel = {};
    var jRad = $.jRad({app:'radsample-ws',entityModel:entityModel}); 
    
    
    jRad.params['businessInfoId'] = {data:[{id:carsmart_config.businessInfoId,name:tempData.businessRegName.beforeUpdate}]};
    jRad.params['cardId'] = {
    		urlData:{
    			url:'/vip-ws/ws/0.1/card/queryAllCardList?businessInfoId='+carsmart_config.businessInfoId,
    			id:'id',
                name:'name'
    		},
    		unshiftData: {id:'',name:'请选择'}
    }
    page_column_model.push({display: '序号', name : 'sequence'});
    page_column_model.push({display: '姓名', name : 'memberName'}); 
    page_column_model.push({display: '手机号', name : 'memberPhone'});
    page_column_model.push({display: '卡号', name : 'number'});
    page_column_model.push({display: '卡类型', name : 'memberCardName'});
    page_column_model.push({display: '余额', name : 'remainingMoney'});
    page_column_model.push({display: '办卡日期', name : 'startDate'}); 
    page_column_model.push({display: '截止日期', name : 'expiredDate'});
    page_column_model.push({display: '所属门店', name : 'businessInfoName'});
    
    page_search_items.push({row:'1',type:'jrad-input',display:'手机号',name:'memberPhone'});
    page_search_items.push({row:'1',type:'jrad-select',display:'卡类型',name:'cardId',params:jRad.params['cardId']});
    page_search_items.push({row:'1',type:'jrad-select',display:'所属门店',name:'businessInfoId',params:jRad.params['businessInfoId']});
    
    
    page_list_buttons.push({title: '充值',displayname:'充值',name:'Add', bclass: 'icon-plus',onpress : function(){
	    //充值的操作
    	var checked = $('#Table_validVipCard_list',wraper).getCheckedTrs();
    	if(checked.length==1){
    		 $('#Form_cardRecharge',wraper).form({
 	            title: '充值', 
 	            item:{memberName:checked[0].memberName,memberCardName:checked[0].memberCardName},
 	            url: '/vip-ws/ws/0.1/memberCard/chargeMemberCard',
 	            preSubmit:function(json){ 
 	                json.businessInfoId = carsmart_config.businessInfoId;
 	                json.memberCardId=checked[0].memberCardId;
 	                json.memberId=checked[0].memberId;
 	                return json;
 	            },
 	            success:function(){ 
 	                $('#Table_validVipCard_list',wraper).flexMessage('充值成功', 'success');
 	                $('#Table_validVipCard_list',wraper).flexReload();
 	            }
 	        }).form('open');
    		$("#Form_cardRecharge div[name='memberName']",wraper).input('readonly',true);
    		$("#Form_cardRecharge div[name='memberCardName']",wraper).input('readonly',true);
    		
    	}else{
    		$.jRadMessage({
				level: 'error',
				message: '请选中一条记录来进行操作',
				selector:$("#Wraper_vipCard_Manage .vdiv")
			})
    	}
	}
	});
    
    page_list_buttons.push({title: '卡延期',displayname:'卡延期',name:'discount', bclass: 'icon-edit',onpress : function(){
    	 //卡延期的操作
    	var checked = $('#Table_validVipCard_list',wraper).getCheckedTrs();
    	if(checked.length==1){
    		 $('#Form_cardDelay',wraper).form({
 	            title: '卡延期',   
 	            item:{memberName:checked[0].memberName,memberCardName:checked[0].memberCardName,expiredDate:checked[0].expiredDate},
 	            url: '/vip-ws/ws/0.1/memberCard/postponeMemberCard',
 	            preSubmit:function(json){ 
 	                json.businessInfoId = carsmart_config.businessInfoId;
 	                json.memberCardId=checked[0].memberCardId;
 	                json.memberId=checked[0].memberId;
 	                return json;
 	            },
 	            success:function(){ 
 	                $('#Table_validVipCard_list',wraper).flexMessage('卡延期成功', 'success');
 	                $('#Table_validVipCard_list',wraper).flexReload();
 	            }
 	        }).form('open');
    		 $("#Form_cardDelay div[name='memberName']",wraper).input('readonly',true);
    		 $("#Form_cardDelay div[name='memberCardName']",wraper).input('readonly',true);
    		
    	}else{
    		$.jRadMessage({
				level: 'error',
				message: '请选中一条记录来进行操作',
				selector:$("#Wraper_vipCard_Manage .vdiv")
			})
    	}
	}
    });
    page_list_buttons.push({title: '会员批量导入',displayname:'会员批量导入',name:'discount', bclass: 'icon-edit',onpress : function(){
    	
    	$.jRadMessage({
			level: 'error',
			message: '该功能尚未开通',
			selector:$("#Wraper_vipCard_Manage .vdiv")
		})
	}
    });
    
    //有效会员卡表格初始化
	$('#Table_validVipCard_list',wraper).flexigrid({
		reload:true,
		method:'get',
		colModel : page_column_model,
		buttons : page_list_buttons,
		searchitems :page_search_items,
		pagination: {
			diaplay_pages: 5,
			align: 'bottom' 
		},
		showSearch:true, 
		url:'/vip-ws/ws/0.1/memberCard/queryMemberCardInfoList',
		onError:showErrorV,
		checkBoxType: 'single',
		overflow:true,
		extParam:{'businessInfoId':carsmart_config.businessInfoId}
	});
}
//计次消费列表
function showWouldConsume(tempData,wraper){
	
    var page_column_model_s = new Array();
    var page_search_items_s = new Array();
    
    var entityModel = {};
    var jRad = $.jRad({app:'radsample-ws',entityModel:entityModel}); 
    
    jRad.params['businessInfoId'] = {data:[{id:carsmart_config.businessInfoId,name:tempData.businessRegName.beforeUpdate}]};
    jRad.params['cardId'] = {
    		urlData:{
    			url:'/vip-ws/ws/0.1/card/queryAllCardList?businessInfoId='+carsmart_config.businessInfoId,
    			id:'id',
                name:'name'
    		},
    		unshiftData: {id:'',name:'请选择'}
    }
    
    page_column_model_s.push({display: '客户', name : 'memberName'});
    page_column_model_s.push({display: '手机号', name : 'memberPhone'});
    page_column_model_s.push({display: '卡类型', name : 'memberCardName'});
    page_column_model_s.push({display: '消费项目', name : 'serviceName'});
    page_column_model_s.push({display: '总次数', name : 'totalTimes'}); 
    page_column_model_s.push({display: '消费', name : 'consumeTimes'});
    page_column_model_s.push({display: '剩余', name : 'remainingTimes'});
    
    page_search_items_s.push({row:'1',type:'jrad-input',display:'客户姓名',name:'memberName'});
    page_search_items_s.push({row:'1',type:'jrad-input',display:'手机号',name:'memberPhone'});
    page_search_items_s.push({row:'1',type:'jrad-select',display:'卡类型',name:'cardId',params:jRad.params['cardId']});
    page_search_items_s.push({row:'2',type:'jrad-select',display:'所属门店',name:'businessInfoId',params:jRad.params['businessInfoId']});
   
    
    //计次消费表格初始化
	$('#Table_WouldConsume_list',wraper).flexigrid({
		reload:true,
		method:'get',
		colModel : page_column_model_s,
		searchitems :page_search_items_s,
		pagination: {
			diaplay_pages: 5,
			align: 'bottom' 
		},
		showSearch:true, 
		url:'/vip-ws/ws/0.1/memberCard/queryAmountServiceRecord',
		onError:showErrorS,
		overflow:true,
		extParam:{'businessInfoId':carsmart_config.businessInfoId}
	});
}

function showErrorV(xhr){
	var errormsg = eval("(" + xhr.responseText + ")");
    var ydiv = $("#Wraper_vipCard_Manage .vdiv");
    $.jRadMessage({level:'error',message:errormsg[0].message,selector:ydiv});
}
function showErrorS(xhr){
	var errormsg = eval("(" + xhr.responseText + ")");
    var ydiv = $("#Wraper_vipCard_Manage .sdiv");
    $.jRadMessage({level:'error',message:errormsg[0].message,selector:ydiv});
}


