
$(document).ready(function(){ 
	
	var wraper = $('#Wraper_car_type');
	
	//初始化tab页默认展示第一个
    $('#careTypeTabs',wraper).tabs({
    	active:0 
    });  
    
  //第一个tab页点击事件，用于刷新列表
    $('#careTypeTabs ul li:eq(0)').click(function(){
        $('#Table_validCard_list',wraper).flexReload();
    });
    //第二个tab页点击事件
    $('#careTypeTabs ul li:eq(1)').click(function(){
        showNullityCard(wraper);
        $('#Table_nullityCard_list',wraper).flexReload();
    });
    //有效卡种
    var page_column_model = new Array();
    var page_search_items = new Array();
    var page_list_buttons = new Array();
    
    var entityModel = {};
    var jRad = $.jRad({app:'radsample-ws',entityModel:entityModel}); 
    
    var tempData=$.jRadGet({
		url:'/vip-ws/ws/0.1/business/queryBasicInfo?shopAccountId='+carsmart_config.shopId
	});
    
    jRad.params['businessInfoId'] = {data:[{id:carsmart_config.businessInfoId,name:tempData.businessRegName.beforeUpdate}]};
    
    //有效卡种列表展示
    page_column_model.push({display: '序号', name : 'sequence'});
    page_column_model.push({display: '卡名称(卡类型)', name : 'name'}); 
    page_column_model.push({display: '有效期', name : 'expiredMonth'});
    page_column_model.push({display: '卡售价', name : 'sellingPrice'});
    page_column_model.push({display: '操作',width:200 ,diy:function(item,$div){
		var $edit = $("<a>").addClass('flexOperate').html("修改");
		$div.append($edit);
		//修改按钮点击
		$edit.click(function(e){
			editValidCard(item.id,wraper);
		})
    }}); 
    
    //有效卡种列表搜索
    page_search_items.push({row:'1',type:'jrad-input',display:'卡名称',name:'cardName'});
    page_search_items.push({row:'1',type:'jrad-select',display:'所属门店',name:'businessInfoId',params:jRad.params['businessInfoId']});
    
    //有效卡种按钮
    page_list_buttons.push({title: '添加',displayname:'添加',name:'Add', bclass: 'icon-plus',onpress : function(){
    	//调用添加会员卡操作
    	addValidCard(wraper);
	}
	});
    
    page_list_buttons.push({title: '折扣设置',displayname:'折扣设置',name:'discount', bclass: 'icon-edit',onpress : function(){
    	//产品说这个功能展示不做
		$.jRadMessage({
			level: 'error',
			message: '该功能尚未开通',
			selector:$("#Wraper_car_type .ydiv")
		})
	}
    });
    
    page_list_buttons.push({title: '停用',displayname:'停用',name:'disable', bclass: 'icon-pause',onpress : function(){
		var checked = $('#Table_validCard_list',wraper).getCheckedTrs();
		if(checked.length!=0){
//			$.jRadConfirm('停用选中的会员卡',1,function(){
			var json={};
			var ids='';
			$.each(checked,function(i){
				if(i<(checked.length-1)){
					ids+=checked[i].id+',';
				}else{
					ids+=checked[i].id;
				}
			});
			json.ids=ids;
			json.businessInfoId=carsmart_config.businessInfoId;
			json.operator=carsmart_config.operatorName;
			json.status=1;
			$.jRadPost({  
				url:'/vip-ws/ws/0.1/card/updateCardStatus',
				data:json,
				success: function(data){ 
					$('#Table_validCard_list',wraper).flexMessage('停用成功', 'success');
					$('#Table_validCard_list',wraper).flexReload();
				},
				error:function(xhr){ 
				    var errormsg = eval("(" + xhr.responseText + ")"); 
					if (errormsg != undefined) {
						$('#Table_validCard_list',wraper).flexMessage(errormsg[0].message, 'error');
					}
				}
			});
//		});
		}else{
			$.jRadMessage({
				level: 'error',
				message: '请选中一条或多条来进行操作',
				selector:$("#Wraper_car_type .ydiv")
			})
		}
		
	}
    });
    //有效会员卡表格初始化
	$('#Table_validCard_list',wraper).flexigrid({
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
		url:'/vip-ws/ws/0.1/card/queryCardList',
		onError:showError,
		overflow:true,
		extParam:{'businessInfoId':carsmart_config.businessInfoId,status:2}
	});
	
	//预加载这个
	//选择套餐按钮
	$("#jrad-button-item",wraper).click(function(){
		$('#Form_combo_item div[name="offerType"]',wraper).radio({
			    data:[{id:'1',name:'洗车'},{id:'3',name:'保养'},{id:'2',name:'美容'},{id:'4',name:'维修'}],
			    onclick:function(){
			    	 var key = $('#Form_combo_item div[name="offerType"]',wraper).radio('val');
			    	 $('#Form_combo_item div[name="serviceId"]',wraper).select('val','');
			         $('#Form_combo_item div[name="serviceId"]',wraper).select({
		                    urlData:{
		                        url:'/shopmanage-ws/ws/0.1/businessServiceRel/getBusinessServiceList?serviceType='+key+'&businessInfoId='+carsmart_config.businessInfoId,
		                        id: 'serviceId',
		                        name: 'serviceName',
		                        type: 'get',
		                        dataType: 'json',
		                        val: '',
		                        selectedItems:true
		                    }, 
		                    unshiftData:{id:'',name:'请选择'}
		             }); 
			     }
		});
		
		var field_params={};
	    field_params['serviceId'] = {
	            urlData: {
	                url:'/shopmanage-ws/ws/0.1/businessServiceRel/getBusinessServiceList?serviceType='+1+'&businessInfoId='+carsmart_config.businessInfoId,
	                id: 'serviceId',
	                name: 'serviceName',
	                type: 'get',
	                dataType: 'json',
	                val: '',
	                selectedItems:true
	            }, 
	            unshiftData:{id:'',name:'请选择'}
	        };
		
		$('#Form_combo_item',wraper).form({
			title:"添加套餐项目", 
			item:{offerType:1},
			submit:creatComboItem,
			fields:field_params,
			height: 420
	    	}).form('open');

	});
	
});

//无效列表页
function showNullityCard(wraper){
	
    var page_column_model_n = new Array();
    var page_search_items_n = new Array();
    var page_list_buttons_n = new Array();
    
    var entityModel = {};
    var jRad = $.jRad({app:'radsample-ws',entityModel:entityModel}); 
    
    var tempData=$.jRadGet({
		url:'/vip-ws/ws/0.1/business/queryBasicInfo?shopAccountId='+carsmart_config.shopId
	});
    
    jRad.params['businessInfoId'] = {data:[{id:carsmart_config.businessInfoId,name:tempData.businessRegName.beforeUpdate}]};
    
    //无效卡种列表展示
    page_column_model_n.push({display: '序号', name : 'sequence'});
    page_column_model_n.push({display: '卡名称(卡类型)', name : 'name'}); 
    page_column_model_n.push({display: '有效期', name : 'expiredMonth'});
    page_column_model_n.push({display: '卡售价', name : 'sellingPrice'});
    
    //无效卡种列表搜索
    page_search_items_n.push({row:'1',type:'jrad-input',display:'卡名称',name:'cardName'});
    page_search_items_n.push({row:'1',type:'jrad-select',display:'所属门店',name:'businessInfoId',params:jRad.params['businessInfoId']});
    //无效卡种按钮
    page_list_buttons_n.push({title: '启用',displayname:'启用',name:'Add', bclass: 'icon-youtube-play',onpress : function(){
    	var checked = $('#Table_nullityCard_list',wraper).getCheckedTrs();
		if(checked.length!=0){
//		$.jRadConfirm('启用选中的会员卡',1,function(){
			var json={};
			var ids='';
			$.each(checked,function(i){
				if(i<(checked.length-1)){
					ids+=checked[i].id+',';
				}else{
					ids+=checked[i].id;
				}
			});
			json.ids=ids;
			json.businessInfoId=carsmart_config.businessInfoId;
			json.operator=carsmart_config.operatorName;
			json.status=2;
			$.jRadPost({  
				url:'/vip-ws/ws/0.1/card/updateCardStatus',
				data:json,
				success: function(data){ 
					$('#Table_nullityCard_list',wraper).flexMessage('启用成功!', 'success');
					$('#Table_nullityCard_list',wraper).flexReload();
				},
				error:function(xhr){ 
				    var errormsg = eval("(" + xhr.responseText + ")"); 
					if (errormsg != undefined) {
						$('#Table_nullityCard_list',wraper).flexMessage(errormsg[0].message, 'error');
					}
				}
			});
//		});
		}else{
			$.jRadMessage({
				level: 'error',
				message: '请选中一条或多条来进行操作',
				selector:$("#Wraper_car_type .vdiv")
			})
		}
	}
    });
    
  //无效会员卡表格初始化
	$('#Table_nullityCard_list',wraper).flexigrid({
		reload:true,
		method:'get',
		colModel : page_column_model_n,
		buttons : page_list_buttons_n,
		searchitems :page_search_items_n,
		pagination: {
			diaplay_pages: 5,
			align: 'bottom' 
		},
		showSearch:true, 
		url:'/vip-ws/ws/0.1/card/queryCardList',
		onError:function(xhr){
			var errormsg = eval("(" + xhr.responseText + ")");
		    var vdiv = $("#Wraper_car_type .vdiv");
		    $.jRadMessage({level:'error',message:errormsg[0].message,selector:vdiv});
		},
		overflow:true,
		checkBoxType: 'single',
		extParam:{'businessInfoId':carsmart_config.businessInfoId,status:1}
	});
}
//添加会员卡操作
function addValidCard(wraper){
	
	initValidCard(wraper);
	//打开添加窗口
	
	var field_valid_params={};

	var tempData=$.jRadGet({
		url:'/vip-ws/ws/0.1/business/queryBasicInfo?shopAccountId='+carsmart_config.shopId
	});
	field_valid_params['businessInfoId']={
			data:[{id:carsmart_config.businessInfoId,name:tempData.businessRegName.beforeUpdate}]
	}

	$('#Form_valid_card',wraper).form({
	    title: '添加会员卡', 
		displayname:'添加会员卡', 
		fields:field_valid_params,
	    url: '/vip-ws/ws/0.1/card/addCard', 
		preSubmit:function(json){
			var services=[];
			$("#addPackAgeItem",wraper).find("tbody tr").each(function(i){
				var object={};
				object.serviceTypeId=$(this).find("input[name='serviceTypeId']").val();
				object.serviceTimes=$(this).find("input[name='serviceTimes']").val();
				object.reservePrice=$(this).find("input[name='reservePrice']").val();
				object.sellPrice=object.serviceTimes*object.reservePrice;
				services.push(object);
			});
			json.services=services;
			json.initMoney=(json.initMoney=='')?0:json.initMoney;
			json.freeMoney=(json.freeMoney=='')?0:json.freeMoney;
			json.sellingPrice=(json.sellingPrice=='')?0:json.sellingPrice;
			return json;
		},
		success:function(){ 
			$('#Table_validCard_list',wraper).flexMessage('添加会员卡成功', 'success');
			$('#Table_validCard_list',wraper).flexReload();
			
		},
		height: 400
	}).form('open');
	
}

//添加项目
function creatComboItem(){
	var wraper = $('#Wraper_car_type');
	var key = $('#Form_combo_item div[name="offerType"]',wraper).radio('val');
	var serviceId =  $('#Form_combo_item div[name="serviceId"]',wraper).select('val');
	var _form = $('#Form_combo_item',wraper);
	if(serviceId==''||serviceId==undefined){
		 $.jRadMessage({level:'error',message:'请选中服务项目',selector:_form.find('.grid-layout-main')});
		 return;
	}
	var serviceTpeId = $("#addPackAgeItem",wraper).find("tbody tr td input[name='serviceTypeId']")
	if(serviceTpeId.length>9){
		$.jRadMessage({level:'error',message:'服务项目最多只能添加10个',selector:_form.find('.grid-layout-main')});
		 return;
	}
	var flag = false;
	$.each(serviceTpeId,function(){
		if(this.value==serviceId){
			flag=true;
		}
	});
	if(flag){
		$.jRadMessage({level:'error',message:'重复的服务项目',selector:_form.find('.grid-layout-main')});
		 return;
	}
	var data=$.jRadGet({
		url:'/shopmanage-ws/ws/0.1/businessServiceRel/getBusinessServiceList?serviceType='+key+'&businessInfoId='+carsmart_config.businessInfoId,
		success:function(data){
			_form.form('close');
			$("#addPackAgeItem",wraper).show();
			var packAgeItemStr='';
			//直接去掉each
			$.each(data, function(i){
				if(this.serviceId==serviceId){
					packAgeItemStr+='<tr class="packAgeTr">'
						+'<td style="width:40%"><input type="hidden" value="'+serviceId+'" name="serviceTypeId" />'+this.serviceName+'</td>'
						+'<td style="width:17%;"><input type="text"  class="serviceTimes" name="serviceTimes" style=" width:40px;text-align:center" value="1"></td>'
						+'<td style="width:16%"><input type="hidden" value="'+this.reservePrice+'" name="reservePrice" />'+this.reservePrice+'</td>'
						+'<td style="width:16%"><label class="sellPrice">'+this.reservePrice+'</label></td>'
						+'<td style="width:16%"><a href="javascript:" class="deletePageAge">删除</a></td>'
						+'</tr>';
				}
			});
			$("#addPackAgeItem",wraper).find("tbody").append(packAgeItemStr);
		},error:function(xhr){
			var errormsg = eval("(" + xhr.responseText + ")"); 
      		if (errormsg != undefined) {
         		_form.form('message',errormsg[0].message,'error');
      		}
    	}
	});	
	//删除套餐项目
	$('#addPackAgeItem a.deletePageAge', wraper).unbind('click').click(function() {
		var packAgeTr = $(this).parents('.packAgeTr');
//	     	$.jRadConfirm('确定要删除该条套餐项目',1,function(){
	     		packAgeTr.remove();
//        }); 
	    if($("#addPackAgeItem",wraper).find("tbody tr").length==0){
	    	 $("#addPackAgeItem",wraper).hide();
	 	  }     		
	});
	
	$('#addPackAgeItem input.serviceTimes', wraper).keyup(function(){
		var sellPrice = parseInt(parseInt(this.value)*parseInt($(this).parents('.packAgeTr').find("input[name='reservePrice']").val()));
		$(this).parents('.packAgeTr').find('label.sellPrice').html(sellPrice)
	});
}

//修改有效会员卡
function editValidCard(id,wraper){
	
	initValidCard(wraper);
	
	var item = $.jRadGet({url:'/vip-ws/ws/0.1/card/getCardInfoById?cardId='+id+'&businessInfoId='+carsmart_config.businessInfoId});
	
	var field_valid_params={};
	
	var tempData=$.jRadGet({
		url:'/vip-ws/ws/0.1/business/queryBasicInfo?shopAccountId='+carsmart_config.shopId
	});
	field_valid_params['businessInfoId']={
			data:[{id:carsmart_config.businessInfoId,name:tempData.businessRegName.beforeUpdate}]
	}
	$('#Form_valid_card',wraper).form({
        title: '修改会员卡', 
		displayname:'修改会员卡', 
		fields:field_valid_params,
		item:item,
        url: '/vip-ws/ws/0.1/card/updateCard', 
		preSubmit:function(json){
			var services=[];
			$("#addPackAgeItem",wraper).find("tbody tr").each(function(i){
				var object={};
				object.id=$(this).find("input[name='id']").val();
				object.serviceTypeId=$(this).find("input[name='serviceTypeId']").val();
				object.serviceTimes=$(this).find("input[name='serviceTimes']").val();
				object.reservePrice=$(this).find("input[name='reservePrice']").val();
				object.sellPrice=object.serviceTimes*object.reservePrice;
				services.push(object);
			});
			json.services=services;
			json.initMoney=(json.initMoney=='')?0:json.initMoney;
			json.freeMoney=(json.freeMoney=='')?0:json.freeMoney;
			json.sellingPrice=(json.sellingPrice=='')?0:json.sellingPrice;
			return json;
		},
		success:function(){ 
			$('#Table_validCard_list',wraper).flexMessage('修改会员卡成功', 'success');
			$('#Table_validCard_list',wraper).flexReload();
			
		},
		height: 400
    }).form('open');
		$("#Form_valid_card div[name='name']",wraper).input('readonly',true);
	if(item.flag==2){
		$("#Form_valid_card div[name='initMoney']",wraper).input('readonly',true);
		$("#Form_valid_card div[name='freeMoney']",wraper).input('readonly',true);
	}
	
	showServiceItem(item,wraper);
}
function showServiceItem(item,wraper){
	var serviceItemList = item.services;
	var packAgeItemStr='';
	$.each(serviceItemList,function(){
			packAgeItemStr+='<tr class="packAgeTr">'
				+'<td style="width:40%"><input type="hidden" value="'+this.id+'" name="id" />'+'<input type="hidden" value="'+this.serviceTypeId+'" name="serviceTypeId" />'+this.serviceName+'</td>'
				+'<td style="width:17%;"><input type="text"  class="serviceTimes" name="serviceTimes" style=" width:40px;text-align:center" value="'+this.serviceTimes+'"></td>'
				+'<td style="width:16%"><input type="hidden" value="'+((this.reservePrice==undefined)?0:this.reservePrice)+'" name="reservePrice" />'+((this.reservePrice==undefined)?0:this.reservePrice)+'</td>'
				+'<td style="width:16%"><label class="sellPrice">'+((this.sellPrice==undefined)?0:this.sellPrice)+'</label></td>'
				+'<td style="width:16%"><a href="javascript:" class="deletePageAge">删除</a></td>'
				+'</tr>';
	});
	if(serviceItemList.length>0){
		$("#addPackAgeItem",wraper).show();
		$("#addPackAgeItem",wraper).find("tbody").append(packAgeItemStr);
	}
	
	
	//删除套餐项目
	$('#addPackAgeItem a.deletePageAge', wraper).unbind('click').click(function() {
		var packAgeTr = $(this).parents('.packAgeTr');
//	     	$.jRadConfirm('确定要删除该条套餐项目',1,function(){
	     		packAgeTr.remove();
//        }); 
	      if($("#addPackAgeItem",wraper).find("tbody tr").length==0){
	    	  $("#addPackAgeItem",wraper).hide();
	      }
	});
	
	$('#addPackAgeItem input.serviceTimes', wraper).keyup(function(){
		var sellPrice = parseInt(parseInt(this.value)*parseInt($(this).parents('.packAgeTr').find("input[name='reservePrice']").val()));
		$(this).parents('.packAgeTr').find('label.sellPrice').html(sellPrice)
	});
	
}

//初始化添加和修改的会员卡的Form
function initValidCard(wraper){
	$("#Form_valid_card", wraper).form({
	item: {}
	});
	$("#Form_valid_card div[name='name']",wraper).input('readonly',false);
	$("#Form_valid_card div[name='initMoney']",wraper).input('readonly',false);
	$("#Form_valid_card div[name='freeMoney']",wraper).input('readonly',false);
	$("#addPackAgeItem #packAgeItems",wraper).find("tbody").html('');
	$("#addPackAgeItem").hide();
}

//展示有效卡种的异常提示
function showError(xhr){
	var errormsg = eval("(" + xhr.responseText + ")");
    var ydiv = $("#Wraper_car_type .ydiv");
    $.jRadMessage({level:'error',message:errormsg[0].message,selector:ydiv});
}
