$(document).ready(function(){ 
	//定义wraper
    var wraper = $('#Wraper_exclusivePrivileges_manage');
    
    //定义三个集合，用于存放操作按钮,搜索条件,数据展示
    var page_column_model = new Array();
    var page_search_items = new Array();
    var page_list_buttons = new Array();
	
    
    
    //操作按钮
    
	page_list_buttons.push({title: '编辑',name:'Edit', bclass:'edit',displayname: '编辑',prefunc:function(){
		var checked = $('#Table_exclusivePrivileges_list').getCheckedTrs();
        if (checked.length != 1) {return false;}else{return true;}
    },onpress : function(){
        var checked = $('#Table_exclusivePrivileges_list').getCheckedTrs(); 
        if(checked[0]) {
        	updateExclusivePrivilegeView(checked[0],wraper);
        }
    }
	});  
	page_list_buttons.push({separator: true});
	var citySelect = $.jRadGet({url:'/ycbmall-manager-ws/ws/0.1/area/municipalityList'});
	var citySelectDataSource = [];
	$.each(citySelect, function(i) {
		var json = {};
		json.id = citySelect[i].id;
		json.name = citySelect[i].municipalityName;
		citySelectDataSource.push(json)
	});
    //搜索框
    page_search_items.push({row:'1',type:'jrad-input',display:'商家ID',name:'shopId'});
	page_search_items.push({row:'1',type:'jrad-input',display:'商家店名',name:'shopName'});
	
	//grid展示
	 page_column_model.push({display: '商家ID', name : 'shopAccountId'});
	 page_column_model.push({display: '登录账号', name : 'loginAccount'});
	 page_column_model.push({display: '商家店名', name : 'shopName'});
     page_column_model.push({display: '城市', name : 'areaCodeId',datasource:citySelectDataSource});
	 page_column_model.push({display: '权限', name : 'privilegeName'});
	 page_column_model.push({display: '操作时间', name : 'updated'});
	 page_column_model.push({display: '操作人', name : 'privilegeOperator'});   
	
	
	//操作dataGrid
	$('#Table_exclusivePrivileges_list').flexigrid({
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
		url:'/vip-ws/ws/0.1/shopAccountBack/queryShopAcounts',
		overflow:true
	});
	var _span3 = $('div.searchButtons', wraper);
	var _span20 = $('<div>').addClass('span20').append(_span3);
	var _div = $('<div>').addClass('row-fluid').append(_span20);
	$('div.searchContent', wraper).append(_div);
	$('div.searchContent span.span14', wraper).remove();
});

//编辑用户权限
function updateExclusivePrivilegeView(item,wraper){
	
	
    //初始化组件数据
	var fields_params = {};
	fields_params['isPrivilege'] = {
			data: [
			  {id:'1',name:'专享权限'}
			  ]
	};
	fields_params['isExclusive'] = {
			data: [
			  {id:'1',name:'专供权限'}
			  ]
	};
	
	//赋值操作
	$('#Form_exclusive_privileges div[name="shopId"]',wraper).html(item.shopAccountId);
	$('#Form_exclusive_privileges div[name="shopName"]',wraper).html(item.shopName);
	 $('#Form_exclusive_privileges').form({
         title: '权限管理',
         url:'/vip-ws/ws/0.1/shopAccountBack/editShopAcountsPrivilege',
         fields_params:fields_params,
         item:item,
         before_submit:function(json){ 
           json.id=item.shopAccountId;
           json.privilegeOperator=carsmart_config.operatorName;
           json.isPrivilege=json.isPrivilege.join(",");
           json.isExclusive=json.isExclusive.join(",");
           return json
         },
         success_callback:function(){ 
           $('#Table_exclusivePrivileges_list').flexMessage('编辑成功', 'success');
           $('#Table_exclusivePrivileges_list').flexReloadCurrentPage();
         }
       }).form('open');
}
function showError(xhr) {
	var errormsg = eval("(" + xhr.responseText + ")");
	var cDiv = $("#Wraper_exclusivePrivileges_manage .cDiv");
	$.jRadMessage({
		level: 'error',
		message: errormsg[0].message,
		selector: cDiv
	});
}