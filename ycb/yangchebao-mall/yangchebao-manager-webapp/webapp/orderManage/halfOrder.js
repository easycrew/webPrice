var despatchBillFlag=false;
$(document).ready(function(){ 
		var wraper = $('#Wraper_halfOrder_manage');

	    var page_column_model = new Array();
	    var page_search_items = new Array();
		 	
		var entityModel = {};
	    var jRad = $.jRad({app:'radsample-ws',entityModel:entityModel}); 

		//查询转换获得的省份数据形式
	    var addressId=$.jRadGet({url:'/ycbmall-manager-ws/ws/0.1/CityInfoCms/getProvinceInfo'});
	    var addressIdArr=[];
	    $.each(addressId,function(i){
	    	var json={};
	    	json.id=addressId[i].provinceId;
	    	json.name=addressId[i].provinceName;
	    	addressIdArr.push(json)
	    });
	    addressIdArr.unshift({id:'',name:'请选择'});
	    
	    jRad.params['branchOrderStatus']={data:[{id:'3',name:'已审核'},{id:'5',name:'已发货'}]}; 
		
		//省市之间级联
		jRad.params['provinceCodeSearch'] = {
			data:addressIdArr,
			onchange: function(){
				var provinceCode = $('.searchContent div[name=provinceId]',wraper).select('val');
				if(provinceCode==''){ 
					$('.searchContent div[name=areaCodeId]',wraper).select({
																	urlData:{url:''},
																	data:[{id:'',name:'请选择'}],
																	val:''});
				}else{  
				$('.searchContent div[name=areaCodeId]',wraper).select({ 
					urlData:{
						url: '/ycbmall-manager-ws/ws/0.1/CityInfoCms/getCityInfoByProvinceId?provinceId=' + provinceCode ,
					},
					unshiftData: {id:'',name:'请选择'}
				}).select('val','');
				}
			}
		}; 
		jRad.params['areaCodeSearchId'] = {
				data: [{id:'',name:'请选择'}]
			};
	    jRad.validators['postage'] = [{msg:'请填写',type:'min',value:'1'},{msg:'请填写数字',type:'regex',value:/^\d*$/}];

		var fields_params = {};  
		 
		fields_params['invoiceType'] = {data:[{id:'1',name:'个人'},{id:'0',name:'公司'}]};
 
		var addressId=$.jRadGet({url:'/ycbmall-manager-ws/ws/0.1/CityInfoCms/getProvinceInfo'});
	    var addressIdArr=[];
	    $.each(addressId,function(i){
	    	var json={};
	    	json.id=addressId[i].provinceId;
	    	json.name=addressId[i].provinceName;
	    	addressIdArr.push(json)
	    });
	    addressIdArr.unshift({id:'',name:'请选择'});
	    
		page_column_model.push({display: '分订单号', name : 'branchOrderNumber'});
	    page_column_model.push({display: '分订单金额', name : 'branchPayment'});
	    page_column_model.push({display: '商家店名', name : 'shopName'}); 
		page_column_model.push({display: '下单时间', name : 'orderDate'});
		page_column_model.push({display: '状态', name : 'branchOrderStatusName'});
		page_column_model.push({display: '操作', diy:function(item,$div){
			var branchOrderStatus=item.branchOrderStatus;
			if(branchOrderStatus == '2'||branchOrderStatus == '3'||branchOrderStatus == '4'||branchOrderStatus == '5'){
				$div.html('<a href="javascript:" class="operate">发货</a>')
			}else{
				$div.html('<a href="javascript:" class="operate">管理</a>')
			}
			$('a.operate',$div).unbind('click').bind('click',function(){
				var _item = $.jRadGet({url : '/ycbmall-manager-ws/ws/0.1/userOrderCms/getOrderMailInfo?branchOrderId='+item.branchOrderId});
				$('.details-box',wraper).prev('.ui-tit').html('').show();
				$('.details-box',wraper).slideDown();
				$('.jrad-table',wraper).slideUp(); 
				$('#orderInfo input[name="branchOrderId"]',wraper).val(item.branchOrderId);
				$('#orderInfo div[name="consigneeName"]',wraper).html(_item.consigneeName);
				$('#orderInfo div[name="shopName"]',wraper).html(_item.shopName);
				$('#orderInfo div[name="address"]',wraper).html(_item.provinceName+_item.areaName+_item.countyName+_item.postalAddress);
				$('#orderInfo div[name="mobile"]',wraper).html(_item.mobile);
				$('#orderInfo div[name="telephone"]',wraper).html(_item.telephone);
				$('#orderInfo div[name="postcode"]',wraper).html(_item.postcode);
				
//				
//				
			})
		}});
	    
		page_search_items.push({row:'1',type:'jrad-input',display:'分订单号',name:'branchOrderNumber'});
		page_search_items.push({row:'1',type:'jrad-select',display:'分订单状态',name:'branchOrderStatus',params:jRad.params['branchOrderStatus']});
	    page_search_items.push({row:'1',type:'jrad-select',display:'订单省份',name:'provinceId',params:jRad.params['provinceCodeSearch']});
		page_search_items.push({row:'2',type:'jrad-select',display:'订单城市',name:'areaCodeId',params:jRad.params['areaCodeSearchId']});
//	    page_search_items.push({row:'1',type:'jrad-select',display:'订单省份',name:'provinceId',params:{
//		data:addressIdArr,
//			onchange:function(val){
//				getareaCodeNameSearch('2',val,wraper)
//			}
//		}});
	    $('#Table_halfOrder_manage').flexigrid({
	            reload:true,
				method:'get',
	            colModel : page_column_model,
	            buttons : [],
	            searchitems :page_search_items,
	            pagination: {
					diaplay_pages: 5,
					align: 'bottom' 
				},
				showSearch:true,
				queryParam: {'branchOrderStatus':'3'},
				checkBoxType:'single',
	            url:'/ycbmall-manager-ws/ws/0.1/userOrderCms/queryBranchOrders',
				onError:showError,
				overflow:true
	    }); 

		$(".details-tab .return",wraper).click(function(){
			$('.details-box',wraper).slideUp();
			$('.jrad-table',wraper).slideDown(); 
			$(".scroll-up-btn").click();
			clearOrderInfo(wraper);
			despatchBillFlag=false;
			$('#Table_halfOrder_manage').flexReloadCurrentPage(); 
		});
		
		$(".details-tab:eq(0) .f-left", wraper).click(function() {
			$(".details-tab:eq(0) .tab-cur", wraper).removeClass("tab-cur");
			$(this).addClass("tab-cur");
			var rele = $(this).attr("rele");
			$(".tabReleForm", wraper).hide();
			var branchOrderId = $("#orderInfo",wraper).find("input[name='branchOrderId']").val();
			if (rele == 'despatchBill' && despatchBillFlag == false) {
					despatchBillShow(branchOrderId, wraper);
					despatchBillFlag = true
			}
			$("#" + rele, wraper).show();
		});
		
		$("div.details-content .jrad-btn-normal",wraper).click(function(){
			$('.details-box',wraper).slideUp();
			$('.jrad-table',wraper).slideDown(); 
			$(".scroll-up-btn").click();
			clearOrderInfo(wraper);
			despatchBillFlag=false;
			$('#Table_halfOrder_manage').flexReloadCurrentPage(); 
		});
//		$('#orderInfo .jrad-btn-primary',wraper).button({
//			click:function(){
//				// var flag=$('#orderInfo',wraper).form('validateAll');
//				// if(!flag){
//				// 	return false
//				// }
//				var json=$('#orderInfo',wraper).form('getValue');
//				json.operator=carsmart_config.operatorName;
//				var parcels=[];
//				$('#orderInfo div.grid-layout-main div.blag',wraper).each(function(){
//					var parcelsJson={};
//					parcelsJson.expressWayId=$(this).find('div.jrad-select-container').select('val');
//					parcelsJson.expressNumber=$(this).find('div.jrad-input-container').input('val');
//					parcels.push(parcelsJson)
//				});
//				json.parcels=parcels;
//				$.jRadPost({
//					url:'/ycbmall-manager-ws/ws/0.1/userOrderCms/editOrderMailInfo',
//					data:json,
//					success:function(data){
//						$.jRadMessage({
//			    			level:'success', 
//		    				message:'保存成功！' 
//			    		})
//					},
//					error:function(data){
//						 var mes = eval('('+data.responseText+')');
//			    		 $.jRadMessage({
//			    			 level:'error',
//		    				 message:mes[0].message 
//			    		 });
//					}
//				})
//			}
//		});

		function clearOrderInfo(wraper){
		   $(".details-tab .f-left:first",wraper).click();
		   $('#despatchBill #Table_despatchBill_list tbody', wraper).html('');
		   $('#Form_despatchBill',wraper).find('.table_despatchSku').html('<table id="Table_despatchSku_manage"></table>');
		   
		}
		
	}); 
//订单发货信息
function despatchBillShow(branchOrderId,wraper){
	
	var page_column_model_b = new Array();

	page_column_model_b.push({display: 'SKUID', name : 'skuId'});
    page_column_model_b.push({display: 'SKU名称', name : 'skuName'});
    page_column_model_b.push({display: '数量', name : 'allocationNumber'});
    page_column_model_b.push({display: '商品类型', name : 'commodityType',datasource:[{id:'1',name:'普通商品'},{id:'2',name:'专享商品'},{id:'3',name:'4S店专供'}]});
    
	$('#Table_despatchSku_manage',wraper).flexigrid({
		method:'get',
        colModel : page_column_model_b,
        buttons : [],
        searchitems :[],
        rp: 20,
        pagination: {
			diaplay_pages: 5,
			align: 'bottom' 
		},
		showSearch:true,
        url:'/ycbmall-manager-ws/ws/0.1/userOrderCms/queryBranchOrderSkus?branchOrderId='+branchOrderId,
		onError:showError,
		showCheckbox: true,
		overflow:true
	});  
	despatchBillTable(branchOrderId,wraper);
	var _item = $.jRadGet({url : '/ycbmall-manager-ws/ws/0.1/userOrderCms/getOrderMailInfo?branchOrderId='+branchOrderId});
	var fields_bill_params={};
	fields_bill_params['branchOrderStatus'] = {data:[{id:'3',name:'已审核'},{id:'5',name:'已发货'}]};
 	$('#despatchBill',wraper).form({
		fields_params:fields_bill_params,
		layout: 'grid', 
		autobinding: false,
		item:_item
	 });
 	
	$('#despatchBill div.offset18 .jrad-btn-primary',wraper).button({
		click:function(){
		var json=$('#despatchBill',wraper).form('getValue');
		json.operator=carsmart_config.operatorName;
		json.branchOrderId=branchOrderId;
		$.jRadPost({
			url:'/ycbmall-manager-ws/ws/0.1/despatchBillCms/editBranchOrderStatusForDespatch',
			data:json,
			success:function(data){
				$.jRadMessage({
	    			level:'success', 
    				message:'保存成功！' 
	    		})
			},
			error:function(data){
				 var mes = eval('('+data.responseText+')');
	    		 $.jRadMessage({
	    			 level:'error',
    				 message:mes[0].message 
	    		 });
			}
		})
	}
});
	var fields_params ={};
	fields_params['supplyId'] = {
			urlData:{
				url:'/ycbmall-manager-ws/ws/0.1/supplyCms/list'
			}
	}
	
	//新增发货单窗口打开
	$('div#despatchBill span#addDespatchBill', wraper).die('click').live('click', function() {
		$('#Form_despatchBill', wraper).form({
			title: '创建',
			fields_params:fields_params,
			url:'/ycbmall-manager-ws/ws/0.1/despatchBillCms/edit',
			fields_params:fields_params,
			height:500,
			before_submit:function(json){
				json.branchOrderId=branchOrderId;
				json.operator=carsmart_config.operatorName;
				var parcels=[];
				$('#Form_despatchBill div.grid-layout-main div.blag',wraper).each(function(){
					var parcelsJson={};
					parcelsJson.orderParcelId=$(this).find('div.grid-layout-content').attr("name");
					parcelsJson.expressWayId=$(this).find('div.jrad-select-container').select('val');
					parcelsJson.expressNumber=$(this).find('div.jrad-input-container').input('val');
					parcels.push(parcelsJson)
				});
				json.parcels=parcels;
				var checked = $('#Table_despatchSku_manage',wraper).getCheckedTrs();
				var skuArray=[];
				$.each(checked,function(i){
					var skuObject ={};
					skuObject.skuId=this.skuId;
					skuObject.number=this.allocationNumber;
					skuArray.push(skuObject);
				});
				json.skuArray=skuArray;
				
			},success_callback:function(){ 
				despatchBillTable(branchOrderId,wraper);
				$('#Form_despatchBill', wraper).form({}).form('close')
		    }
		}).form('open');
		clearDespatchBill(wraper);
		getDespatchBillParams('',branchOrderId,wraper);
	});
	
	//编辑窗口打开
	$('#Table_despatchBill_list a.editDespatchBill', wraper).die('click').live('click', function() {
		var id = $(this).parents('tr').find('td.despatchBillId').html();
		$('#Form_despatchBill', wraper).form({
			title: '编辑',
			url:'/ycbmall-manager-ws/ws/0.1/despatchBillCms/edit',
			fields_params:fields_params,
			height:500,
			before_submit:function(json){
				json.despatchBillId=id;
				json.branchOrderId=branchOrderId;
				json.operator=carsmart_config.operatorName;
				var parcels=[];
				$('#Form_despatchBill div.grid-layout-main div.blag',wraper).each(function(){
					var parcelsJson={};
					parcelsJson.orderParcelId=$(this).find('div.grid-layout-content').attr("name");
					parcelsJson.expressWayId=$(this).find('div.jrad-select-container').select('val');
					parcelsJson.expressNumber=$(this).find('div.jrad-input-container').input('val');
					parcels.push(parcelsJson)
				});
				json.parcels=parcels;
				var checked = $('#Table_despatchSku_manage',wraper).getCheckedTrs();
				var skuArray=[];
				$.each(checked,function(i){
					var skuObject ={};
					skuObject.skuId=this.skuId;
					skuObject.number=this.allocationNumber;
					skuArray.push(skuObject);
				});
				json.skuArray=skuArray;
			},success_callback:function(){ 
				despatchBillTable(branchOrderId,wraper);
				$('#Form_despatchBill', wraper).form({}).form('close')
		    }
		}).form('open');
		clearDespatchBill(wraper);
		getDespatchBillParams(id,branchOrderId,wraper);
	});
	
	//窗口关闭事件
	$('#Form_despatchBill a.pop-up-close', wraper).live('click', function(){
		$('#Form_despatchBill', wraper).form({}).form('close')
	});
	

	//删除按钮操作
	$('#Table_despatchBill_list a.deleteDespatchBill', wraper).die('click').live('click', function() {
		var id = $(this).parents('tr').find('td.despatchBillId').html();
		
		var icon = $('<span>').addClass("icon-ok-sign icon");
	    var info = $('<span>').addClass("success" + " icon").html("删除后不可恢复，确认删除");
		var oper = $('<div>')
				.addClass('ui-dialog-operation')
				.append('<span class="jrad-dialog ui-btn-primary submit">确认删除</span>');
		var dialog = $('<div>').addClass('jrad-dialog-confirm')
			.append(info).appendTo('body')
			.dialog({
				title : '提示',
				onclose: function(){
					dialog.remove();
				},
				buttons : oper
			}).dialog('open');
		$('.submit',dialog).button({
			click : function(e) {
				if (jQuery.isFunction(function() {
					$("#FormBackground").hide();
				})) {
					 var result= $.jRadPost({
							url: '/ycbmall-manager-ws/ws/0.1/despatchBillCms/delete?despatchBillId='+id
						});
					 if(result.status==1){
						 despatchBillTable(branchOrderId,wraper);
					 }
				};
				dialog.dialog('close');
			}
		});
	});
	
	
}

function clearDespatchBill(wraper){
	$('#Form_despatchBill div.grid-layout-main div.blag',wraper).remove();
	$('#Table_despatchSku_manage tbody tr',wraper).each(function(i){
		$(this).removeClass('trSelected');
		$(this).find('.selected').removeClass('selected');
		$(this).find('.itemchk').attr("checked",false);
		$('#Table_despatchSku_manage',wraper).parent().parent().children('.hDiv').find('.selected').removeClass('selected');
		$('#Table_despatchSku_manage',wraper).parent().parent().children('.hDiv').find('.selected input').attr("checked",false);
		
	});
	$('#Table_despatchSku_manage',wraper).parent().parent().children()
}

function despatchBillTable(branchOrderId,wraper){
	$('#despatchBill #Table_despatchBill_list tbody', wraper).html('');
	$.ajax({
		url: '/ycbmall-manager-ws/ws/0.1/despatchBillCms/getDespatchBillsByBranchId?branchOrderId=' + branchOrderId,
		method: 'get',
		success: function(data) {
			var str = '';
			if (data == '') {
				$('#despatchBill #Table_despatchBill_list tbody', wraper).append(str + '<tr><td colspan="10">暂无符合条件的记录</td></tr>');
				return false
			}
			$.each(data, function(i) {
				var skuStr = '';
				str += '<tr>' + '<td class="despatchBillId">' + this.despatchBillId + '</td>' + '<td>' + this.billNumber + '</td>'
					+'<td>'+this.supplyName+'</td>'
					+'<td><a href="javascript:" class="editDespatchBill">编辑</a>&nbsp;&nbsp;<a href="javascript:" class="deleteDespatchBill">删除</a></td>' + '</tr>';
			});
			$('#despatchBill #Table_despatchBill_list tbody', wraper).append(str);
		}
	});
	
	
}

function getDespatchBillParams(id,branchOrderId,wraper){
	
	if(id==''){
		var item ={};
		var str='';
		str+='<div class="row-fluid blag">'
			+'<label class="span3 grid-layout-label">包裹1：</label>'
			+'<div class="span10 grid-layout-content">'
			+'<span>快递公司&nbsp;&nbsp;&nbsp;&nbsp;</span>'
			+'<div class="jrad-select-container"></div>'
			+'</div>'
			+'<div class="span10 grid-layout-content">'
			+'<span><span class="ui-form-required">*</span>快递单号&nbsp;&nbsp;&nbsp;&nbsp;</span>'
			+'<div class="jrad-input-container"></div>'
			+'</div>'
			+'</div>';
		$('#Form_despatchBill div.grid-layout-main div.addBlag',wraper).before(str);
		$('#Form_despatchBill div.grid-layout-main div.blag:first span.delBlag',wraper).remove();
		$('#Form_despatchBill div.grid-layout-main div.blag .jrad-select-container',wraper).select({
			urlData:{
				url:'/ycbmall-manager-ws/ws/0.1/userOrderCms/getExpressWayList',
				id:'expressWayId',
				name:'name'
			}
		});
		$('#Form_despatchBill div.grid-layout-main div.blag .jrad-input-container',wraper).input();
			
	}else{
		var item =  $.jRadGet({
			url: '/ycbmall-manager-ws/ws/0.1/despatchBillCms/getDesBillSkuInfo?despatchBillId=' + id
		});
		var str='';
		if(item.parcels!=''){
			$.each(item.parcels,function(i){
				var number=i+1;
				str+='<div class="row-fluid blag">'
					+'<label class="span3 grid-layout-label">包裹'+number+'：</label>'
					+'<div name='+this.orderParcelId+' class="span10 grid-layout-content">'
					+'<span>快递公司&nbsp;&nbsp;&nbsp;&nbsp;</span>'
					+'<div class="jrad-select-container"></div>'
					+'</div>'
					+'<div class="span10 grid-layout-content">'
					+'<span><span class="ui-form-required">*</span>快递单号&nbsp;&nbsp;&nbsp;&nbsp;</span>'
					+'<div class="jrad-input-container"></div>';
					if(i!=0){
					str+='<span class="delBlag" style="font-weight:bold;font-size:16px;position:relative;top:3px;left:10px;cursor:pointer;">X</span>';
					}
					str+='</div>'
						+'</div>';
			})
		}else{
			str+='<div class="row-fluid blag">'
				+'<label class="span3 grid-layout-label">包裹1：</label>'
				+'<div class="span10 grid-layout-content">'
				+'<span>快递公司&nbsp;&nbsp;&nbsp;&nbsp;</span>'
				+'<div class="jrad-select-container"></div>'
				+'</div>'
				+'<div class="span10 grid-layout-content">'
				+'<span><span class="ui-form-required">*</span>快递单号&nbsp;&nbsp;&nbsp;&nbsp;</span>'
				+'<div class="jrad-input-container"></div>'
				+'</div>'
				+'</div>';
		}
		$('#Form_despatchBill div.grid-layout-main div.addBlag',wraper).before(str);
		$('#Form_despatchBill div.grid-layout-main div.blag:first span.delBlag',wraper).remove();
		$('#Form_despatchBill div.grid-layout-main div.blag .jrad-select-container',wraper).select({
			urlData:{
				url:'/ycbmall-manager-ws/ws/0.1/userOrderCms/getExpressWayList',
				id:'expressWayId',
				name:'name'
			}
		});
		$('#Form_despatchBill div.grid-layout-main div.blag .jrad-input-container',wraper).input();
		if(item.parcels!=''){
			$.each(item.parcels,function(i){
				$('#Form_despatchBill div.grid-layout-main div.blag:eq('+i+') .jrad-select-container',wraper).select('val',this.expressWayId);
				$('#Form_despatchBill div.grid-layout-main div.blag:eq('+i+') .jrad-input-container',wraper).input('val',this.expressNumber);
			})
		}
	}
	
	$('#Form_despatchBill',wraper).form({
		layout: 'grid',
		item:item,
		autobinding: false
	});
    
	if(item.skuArray!=''&&item.skuArray!=undefined){
		$('#Table_despatchSku_manage tbody tr',wraper).each(function(i){
			$.each(item.skuArray,function(j){
				if(this.skuId==$('#Table_despatchSku_manage tbody tr:eq('+i+')',wraper).find('td[name="skuId"] div').html()){
					 $('#Table_despatchSku_manage',wraper).flexSelect([i]);
				}
			});
		});
	}
	$('#Form_despatchBill div.grid-layout-main div.addBlag button',wraper).unbind('click').bind('click',function(){
	var len=$('#Form_despatchBill div.grid-layout-main div.blag',wraper).length;
	if(len>=6){
		$.jRadMessage({level:'error',message:"新增的包裹不能超过6个",selector:$("#Form_despatchBill",wraper)});
		return false
	}
	var addNum=len+1;
	var _str='<div class="row-fluid blag">'
			+'<label class="span3 grid-layout-label">包裹'+addNum+'：</label>'
			+'<div class="span10 grid-layout-content">'
			+'<span>快递公司&nbsp;&nbsp;&nbsp;&nbsp;</span>'
			+'<div class="jrad-select-container"></div>'
			+'</div>'
			+'<div class="span10 grid-layout-content">'
			+'<span><span class="ui-form-required">*</span>快递单号&nbsp;&nbsp;&nbsp;&nbsp;</span>'
			+'<div class="jrad-input-container"></div>'
			+'<span class="delBlag" style="font-weight:bold;font-size:16px;position:relative;top:3px;left:10px;cursor:pointer;">X</span>'
			+'</div>'
			+'</div>';
	$('#Form_despatchBill div.grid-layout-main div.addBlag',wraper).before(_str);
	$('#Form_despatchBill div.grid-layout-main div.blag:last .jrad-select-container',wraper).select({
		urlData:{
			url:'/ycbmall-manager-ws/ws/0.1/userOrderCms/getExpressWayList',
			id:'expressWayId',
			name:'name'
		}
	});
	$('#Form_despatchBill div.grid-layout-main div.blag .jrad-input-container',wraper).input();
	});
	
	$('span.delBlag',wraper).die('click').live('click',function(){
		$(this).parents('div.blag').remove()
	});
    
	
	
}

function getareaCodeNameSearch(node,val,wraper){ 
	var label = "";
	var classClass = "";
	var sc = "";
	var _val="";
	if(node==2){
		label = "订单城市：";
		classClass = "secondClass"; 
		sc = "second";
		$(".jrad-table .searchContent",wraper).find('.second').remove();
	}
	if(val!=""){ 
		var item = $.jRadGetDataSources("/ycbmall-manager-ws/ws/0.1/CityInfoCms/getCityInfoByProvinceId?provinceId="+val,"areaCodeId","areaName");
		if(item.length>0){
		item.unshift({id:'',name:'请选择'});
		var $label = $("<label>").addClass('grid-layout-label span3').addClass(sc).html(label);
		var $div = $("<div>").addClass('grid-layout-content span4 fluid-wrap').addClass(sc);
		var $select = $("<div>").attr('name',classClass).addClass('jrad-select-container addClass');
		if(classClass=="secondClass"){
			$(".jrad-table .searchContent",wraper).find('div.row-fluid:eq(1)').prepend($div.append($select)).prepend($label);
		}
		node++; 
		$select.select({
			data:item,
			unshiftData: {id:'',name:'请选择'}, 
			grid:false,
			onchange: function(val){
				getareaCodeNameSearch(node,val,wraper); 
				if(val!=""){
					$('#Table_halfOrder_manage',wraper).flexOptions({  
						extParam:{
							areaCodeId: val
						}
					})
				}else{
					$('#Table_halfOrder_manage',wraper).flexOptions({  
						extParam:{}	
					})
				}
			}
		});
		}
		
	}else{
		$('#Table_halfOrder_manage',wraper).flexOptions({  
			extParam:{}
		});
	}
};
function showError(xhr){
	  var errormsg = eval("(" + xhr.responseText + ")");
	  var cDiv = $("#Wraper_halfOrder_manage .cDiv");
	  $.jRadMessage({level:'error',message:errormsg[0].message,selector:cDiv});
}
	
$.jRadConfirmTwo = function(message, level, sure, cancel,selector) {
	    
		return dialog;
};