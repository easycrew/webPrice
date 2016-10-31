var branchOrderInfoFlag=false;
var userOrderInfoFlag=false;
var goodsInfoFlag=false;
var orderMailInfoFlag=false;
$(document).ready(function(){ 
	var wraper = $('#Wraper_orderList_manage');
	$(".details-tab .f-left",wraper).click(function(){
		$('.details-tab .tab-cur',wraper).removeClass('tab-cur');
		$('.tabReleForm',wraper).hide();
		$(this).addClass('tab-cur');
		var rele=$(this).attr('rele');
		$(".tabReleForm",wraper).hide();
		var branchId=$('#branchOrderInfo input[name="branchOrderId"]',wraper).val();
		var id=$('#branchOrderInfo input[name="userOrderId"]',wraper).val();
		if(rele=="userOrderInfo" && userOrderInfoFlag==false){
			userOrderInfo(id,wraper);
			userOrderInfoFlag=true
		}else if(rele=='branchOrder_goodsInfo' && goodsInfoFlag==false){
			goodsInfo(branchId,wraper);
			goodsInfoFlag=true
		}else if(rele=='orderMailInfo' &&  orderMailInfoFlag==false){
			orderMailInfo(branchId,wraper);
			orderMailInfoFlag=true
		}
		$('#'+rele,wraper).show()
	});

    var page_column_model = new Array();
    var page_search_items = new Array();
    var page_list_buttons = new Array();
	 	
	var entityModel = {};
    var jRad = $.jRad({app:'radsample-ws',entityModel:entityModel});

    var parentId=$.jRadGet({url:'/ycbmall-manager-ws/ws/0.1/classificationCms/getClassificationsByParentId?parentId=-1&level=1'});
    var parentIdArr=[];
    $.each(parentId,function(i){
    	var json={};
    	json.id=parentId[i].classificationId;
    	json.name=parentId[i].name;
    	parentIdArr.push(json)
    });
    parentIdArr.unshift({id:'',name:'请选择'}); 
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
	
    var payItem=$.jRadGet({url:'/ycbmall-manager-ws/ws/0.1/userOrderCms/payChannels'});
    var payArr=[];
    $.each(payItem,function(i){
    	var payJson={};
    	payJson.id=payItem[i].payChannelId;
    	payJson.name=payItem[i].payChannelName;
    	payArr.push(payJson)
    });
    payArr.unshift({id:'',name:'全部'});
    jRad.params['payChannelId']={data:payArr}; 
    jRad.params['payOnline']={data:[{id:'',name:'全部'},{id:'0',name:'货到付款'},{id:'1',name:'在线支付'},{id:'2',name:'线下支付'}]}; 
     jRad.params['branchOrderStatus']={data:[{id:'',name:'全部'},{id:'1',name:'已下单'},{id:'2',name:'审核中'},{id:'3',name:'已审核'},{id:'4',name:'已生产'},{id:'5',name:'已发货'},{id:'6',name:'已完成'},{id:'7',name:'已评价'},{id:'8',name:'取消'}]}; 
    jRad.params['orderStatus']={data:[{id:'',name:'全部'},{id:'1',name:'待付款'},{id:'2',name:'已付款，拆分失败'},{id:'3',name:'已付款，拆分成功'},{id:'8',name:'取消'}]}; 
	jRad.params['orderType'] = {data:[{id:'',name:'全部'},{id:'1',name:'普通订单（包括限量购）'},{id:'2',name:'团购订单'}]};
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
	//分类间级联
	jRad.params['classificationCodeSearch'] = {
		data:parentIdArr,
		onchange: function(){
			var val = $('.searchContent div[name=classification]',wraper).select('val');
			if(val==''){ 
				$('.searchContent div[name=classificationId]',wraper).select({
																urlData:{url:''},
																data:[{id:'',name:'请选择'}],
																val:''});
			}else{  
			$('.searchContent div[name=classificationId]',wraper).select({ 
				urlData:{
					url: "/ycbmall-manager-ws/ws/0.1/classificationCms/getClassificationsByParentId?parentId="+val+"&level=2",
					id:"classificationId",
					name:"name",
				},
				unshiftData: {id:'',name:'请选择'}
			}).select('val','');
			}
		}
	}; 
	jRad.params['classificationCodeSearchId'] = {
			data: [{id:'',name:'请选择'}]
		};
		
    jRad.validators['postage'] = [{msg:'请填写',type:'min',value:'1'},{msg:'请填写数字',type:'regex',value:/^\d*$/}];

	var fields_params = {};  
	fields_params['payOnline'] = {data:[{id:'1',name:'在线支付'},{id:'0',name:'线下支付'}]}; 
	fields_params['invoiceType'] = {data:[{id:'0',name:'不需要'},{id:'1',name:'个人'},{id:'2',name:'公司'},{id:'3',name:'增值税发票'}]};

 	$('#userOrderInfo',wraper).form({
		fields_params:fields_params,
		validators: jRad.validators,
		layout: 'grid', 
		autobinding: false
	 }); 
	$('#branchOrderInfo',wraper).form({
		layout: 'grid', 
		autobinding: false
	 }); 
	$('#orderMailInfo',wraper).form({
		layout: 'grid', 
		autobinding: false
	 }); 

	page_column_model.push({display: '分订单号', name : 'branchOrderNumber'});
    page_column_model.push({display: '总订单号', name : 'orderNumber'});
    page_column_model.push({display: '汇款状态', name : 'auditStatus',datasource:[{'id':1,'name':'待确认'},{'id':2,'name':'已收款  '},{'id':3,'name':'取消'}                                                                                                                    ]});
    page_column_model.push({display: '商家店名', name : 'shopName'}); 
    page_column_model.push({display: '发货供应商', name : 'supplyNames'}); 
//    page_column_model.push({display: '用户手机', name : 'mobile'}); 
	page_column_model.push({display: '下单时间', name : 'orderDate'});
	page_column_model.push({display: '订单城市', name : 'municipalityName'});
	page_column_model.push({display: '订单金额', name : 'realPayment'});
	page_column_model.push({display: '支付状态', name : 'payStatusName'});
	page_column_model.push({display: '支付渠道', name : 'payChannelName'});
	page_column_model.push({display: '支付方式', name : 'payOnlineName'});
	page_column_model.push({display: '分订单状态', name : 'branchOrderStatusName'});
	page_column_model.push({display: '总订单状态', name : 'orderStatusName'});
    
	page_search_items.push({row:'1',type:'jrad-input',display:'分订单号',name:'branchOrderNumber'});
	page_search_items.push({row:'1',type:'jrad-input',display:'总订单号',name:'orderNumber'});   
	page_search_items.push({row:'1',type:'jrad-input',display:'商家店名',name:'shopName'});  
	page_search_items.push({row:'2',type:'jrad-input',display:'用户手机',name:'mobile'});  
	page_search_items.push({row:'2',type:'jrad-dateinput',display:'下单时间开始',name:'orderDateBegin'});
	page_search_items.push({row:'2',type:'jrad-dateinput',display:'下单时间结束',name:'orderDateEnd'});
	page_search_items.push({row:'3',type:'jrad-select',display:'分订单状态',name:'branchOrderStatus',params:jRad.params['branchOrderStatus']});
	page_search_items.push({row:'3',type:'jrad-select',display:'总订单状态',name:'orderStatus',params:jRad.params['orderStatus']}); 
	page_search_items.push({row:'3',type:'jrad-select',display:'支付渠道',name:'payChannelId',params:jRad.params['payChannelId']});   
	page_search_items.push({row:'4',type:'jrad-select',display:'支付方式',name:'payOnline',params:jRad.params['payOnline']});  
	page_search_items.push({row:'4',type:'jrad-input',display:'快递单号',name:'expressNumber'});  
	page_search_items.push({row:'4',type:'jrad-select',display:'促销类型',name:'orderType',params:jRad.params['orderType']});
	page_search_items.push({row:'5',type:'jrad-input',display:'团购名称',name:'groupPurchasingName'});
	page_search_items.push({row:'5',type:'jrad-select',display:'订单省份',name:'provinceId',params:jRad.params['provinceCodeSearch']});
	page_search_items.push({row:'5',type:'jrad-select',display:'订单城市',name:'areaCodeId',params:jRad.params['areaCodeSearchId']});
	page_search_items.push({row:'6',type:'jrad-select',display:'一级分类',name:'classification',params:jRad.params['classificationCodeSearch']});
	page_search_items.push({row:'6',type:'jrad-select',display:'二级分类',name:'classificationId',params:jRad.params['classificationCodeSearchId']});
	page_search_items.push({row:'6',type:'jrad-select',display:'汇款状态',name:'auditStatus',params:{
		data:[
		  {id:'',name:'全部'},
		  {id:'1',name:'待确认'},
		  {id:'2',name:'已收款'},
		  {id:'3',name:'取消'}
		]
	}}); 
//	page_search_items.push({row:'6',type:'jrad-select',display:'一级分类',name:'classification',params:{
//		data:parentIdArr,
//		onchange:function(val){
//			getClassificationNameSearch('2',val,wraper)
//		}
//	}}); 
//	page_search_items.push({row:'6',type:'jrad-select',display:'订单省份',name:'provinceId',params:{
//		data:addressIdArr,
//		onchange:function(val){
//			getareaCodeNameSearch('2',val,wraper)
//		}
//	}});  

	page_list_buttons.push({title: '编辑',name:'Edit', bclass: 'edit',prefunc:function(){
            var checked = $('#Table_orderList_manage').getCheckedTrs();
            if (checked.length != 1) {return false;}else{return true;}
        },onpress : function(){
            var checked = $('#Table_orderList_manage').getCheckedTrs(); 
            var branchId=checked[0].branchOrderId;
            var id=checked[0].userOrderId;
            if(checked[0]) {
			    updateOrderView(branchId,id,wraper);
            }
        }
    });  
	
	page_list_buttons.push({title: '订单取消',name:'cancel', bclass:'discard',displayname: '订单取消',prefunc:function(){
        var checked = $('#Table_orderList_manage').getCheckedTrs();
        if (checked.length != 1) {return false;}else{
        	if(checked[0].payStatusName=='未付款'&&checked[0].branchOrderStatusName!='取消订单'){
        		return true;
        	}else{
        		return false;
        	}
        }
    },onpress : function(){
        var checked = $('#Table_orderList_manage').getCheckedTrs();  
        $.jRadConfirm("取消订单之后，将不能再进行收款、发货等后续操作，是否确认取消订单", 'success',
        		function() {
        			$("#FormBackground").hide();
        			$.jRadPost({
        				url: '/ycbmall-manager-ws/ws/0.1/userOrderCms/cancelUnpaidOrder',
        				data: {'userOrderId':checked[0].userOrderId,"operator":carsmart_config.operatorName},
        				success: function(data) {
        					$.jRadMessage({
        						level: 'success',
        						message: '编辑成功！',
        						selector: $('#Wraper_orderList_manage .cDiv', wraper)
        					});
        					 $('#Table_orderList_manage').flexMessage('订单取消已成功', 'success');
        			         $('#Table_orderList_manage').flexReloadCurrentPage();
        				},
        				error: function(data) {
        					var mes = eval('(' + data.responseText + ')');
        					$.jRadMessage({
        						level: 'error',
        						message: mes[0].message,
        						selector: $('#Wraper_orderList_manage .cDiv', wraper)
        					});
        				}
        			})
        		});
    }
	});
	page_list_buttons.push({title: '订单退款',name:'cancel', bclass:'discard',displayname: '订单退款',prefunc:function(){
        var checked = $('#Table_orderList_manage').getCheckedTrs();
        if (checked.length != 1) {return false;}else{
        	if(isRefund(checked[0].payStatusName,checked[0].payChannelName,checked[0].branchOrderStatusName)){
        		return true;
        	}else{
        		return false;
        	}
        }
    },onpress : function(){
        var checked = $('#Table_orderList_manage').getCheckedTrs(); 
        var branchId=checked[0].branchOrderId;   //分订单Id
        var id=checked[0].userOrderId;           //总订单Id
        var userId=checked[0].userInfoId;        //用户Id
        if(checked[0]) {
        	
        	cancelRefundOrderView(branchId,id,userId,wraper);
        }
    }
	});
	
	//确认收款
	page_list_buttons.push({title: '确认收款',name:'confirmReceipt', bclass:'order',displayname: '确认收款',prefunc:function(){
        var checked = $('#Table_orderList_manage').getCheckedTrs();
        if (checked.length != 1) {return false;}else{if(checked[0].payStatusName!='未付款'||checked[0].branchOrderStatusName=='取消订单'||checked[0].auditStatus=='2'){
        	return false;
        }else{
        	return true;
        }
        }
    },onpress : function(){
        var checked = $('#Table_orderList_manage').getCheckedTrs(); 
        var branchId=checked[0].branchOrderId;   //分订单Id
        if(checked[0]) {
        	confirmReceiptView(branchId,wraper);
        }
    }
	}); 

    page_list_buttons.push({separator: true});

    
    $('#Table_orderList_manage').flexigrid({
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
			checkBoxType:'single',
            url:'/ycbmall-manager-ws/ws/0.1/userOrderCms/queryBranchOrders',
			onError:showError,
			overflow:true
    }); 

    var _span3=$('div.searchButtons',wraper);
	var _span20=$('<div>').addClass('span20').append(_span3);
    var _div=$('<div>').addClass('row-fluid').append(_span20);
    $('div.searchContent',wraper).append(_div);
    $('div.searchContent span.span7',wraper).remove();

	$(".details-tab .return",wraper).click(function(){
		$('.details-box',wraper).slideUp();
		$('.jrad-table',wraper).slideDown(); 
		$(".scroll-up-btn").click();
		clearOrderInfo(wraper);
		$('#Table_orderList_manage').flexReloadCurrentPage(); 
	});
	$("div.details-content .jrad-btn-normal",wraper).click(function(){
		$('.details-box',wraper).slideUp();
		$('.jrad-table',wraper).slideDown(); 
		$(".scroll-up-btn").click();
		clearOrderInfo(wraper);
		$('#Table_orderList_manage').flexReloadCurrentPage(); 
	});
	function updateOrderView(branchId,id,wraper){
		goodsInfo(id,wraper)
		var item = $.jRadGet({url : '/ycbmall-manager-ws/ws/0.1/userOrderCms/getBranchOrder?branchOrderId='+branchId});
		$('.details-box',wraper).prev('.ui-tit').html('<strong>订单管理</strong>').show(); 
		$('.jrad-table',wraper).slideUp();
		$('.details-box',wraper).slideDown();  
		$('#branchOrderInfo',wraper).form({item:item});  
		$('#branchOrderInfo input[name="userOrderId"]',wraper).val(id);
		$('#branchOrderInfo div[name="branchOrderNumber"]',wraper).html(item.branchOrderNumber);
		$('#branchOrderInfo div[name="branchPayment"]',wraper).html(item.branchPayment);
		$('#branchOrderInfo div[name="branchOrderStatusName"]',wraper).html(item.branchOrderStatusName);
		$('#branchOrderInfo div[name="commodityWeight"]',wraper).html(item.commodityWeight+'kg');
		$('#branchOrderInfo div[name="commodityVolume"]',wraper).html(item.commodityVolume+'m³');	
		$('#userOrderInfo div[name="userRemark"]',wraper).textarea('readonly',true);
		$(".scroll-up-btn").click()

	};
	$('#branchOrderInfo .jrad-btn-primary',wraper).button({
		click:function(){
			var flag=$('#branchOrderInfo',wraper).form('validateAll');
			if(!flag){
				return false
			}
			var json=$('#branchOrderInfo',wraper).form('getValue');
			json.operator=carsmart_config.operatorName;
			delete json.userOrderId;
			$.jRadPost({
				url:'/ycbmall-manager-ws/ws/0.1/userOrderCms/editBranchOrder',
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
	$('#userOrderInfo .jrad-btn-primary',wraper).button({
		click:function(){
			// var flag=$('#userOrderInfo',wraper).form('validateAll');
			// if(!flag){
			// 	return false
			// }
			var json=$('#userOrderInfo',wraper).form('getValue');
			json.operator=carsmart_config.operatorName;
			$.jRadPost({
				url:'/ycbmall-manager-ws/ws/0.1/userOrderCms/editUserOrder',
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
	function userOrderInfo(id,wraper){
		var item=$.jRadGet({url:'/ycbmall-manager-ws/ws/0.1/userOrderCms/getUserOrder?userOrderId='+id});
		$('#userOrderInfo',wraper).form({item:item});
		$('#userOrderInfo div[name="orderNumber"]',wraper).html(item.orderNumber);
		$('#userOrderInfo div[name="mobile"]',wraper).html(item.mobile);
		$('#userOrderInfo div[name="orderStatusName"]',wraper).html(item.orderStatusName);
		$('#userOrderInfo div[name="originalPayment"]',wraper).html(item.originalPayment+'元');
		$('#userOrderInfo div[name="thirdPay"]',wraper).html(item.thirdPay+'元');
		$('#userOrderInfo div[name="blancePay"]',wraper).html(item.blancePay+'元');
		$('#userOrderInfo div[name="commodityWeight"]',wraper).html(item.commodityWeight+'kg');
		$('#userOrderInfo div[name="commodityVolume"]',wraper).html(item.commodityVolume+'m³');
		$('#userOrderInfo div[name="realPostage"]',wraper).html(item.realPostage+'元');
		$('#userOrderInfo div[name="payChannelName"]',wraper).html(item.payChannelName);
		$('#userOrderInfo div[name="payer"]',wraper).html(item.payer);
		$('#userOrderInfo div[name="payAccount"]',wraper).html(item.payAccount);
		$('#userOrderInfo div[name="payBank"]',wraper).html(item.payBank);
		$('#userOrderInfo div[name="payDate"]',wraper).html(item.payDate);
		$('#userOrderInfo div[name="invoiceDetail"]',wraper).html(item.invoiceDetail);
		$('#userOrderInfo div[name="vatStatus"]',wraper).html(item.vatStatusName);
		$('#userOrderInfo div[name="unitName"]',wraper).html(item.unitName);
		$("div[name='provePic']", wraper).children(".pic-show").html('');
		var _ul = $("div[name='provePic']", wraper).children(".pic-show");
		var arr = item.pics;
		$.each(arr, function(i) {
			var $li = $("<li>").addClass("orderPicBoxli");
			var $div = $("<div>").html('<a href="'+arr[i].picUrl+'" title="" class="payProve cboxElement"><img src="' + arr[i].smallPicUrl + '"></a>');
			$li.append($div);
			_ul.append($li);
		});
		 $(".payProve").colorbox({rel: 'payProve',close:'x',maxWidth: '70%',maxHeight: '70%',previous:'<i class="icon-font-arrow-left"></i>',next:'<i class="icon-font-arrow-right"></i>'});
	};
	function goodsInfo(id,wraper){
		var page_column_model_c = new Array();

		page_column_model_c.push({display: 'SKUID', name : 'skuId'});
	    page_column_model_c.push({display: 'SKU名称', name : 'skuName'});
	    page_column_model_c.push({display: '数量', name : 'allocationNumber'});
	    page_column_model_c.push({display: '商品类型', name : 'commodityType',datasource:[{id:'1',name:'普通商品'},{id:'2',name:'专享商品'},{id:'3',name:'4S店专供'}]});
	    
	    $('#Table_branchOrder_goodsInfoList').flexigrid({
	            reload:true,
				method:'get',
	            colModel : page_column_model_c,
	            buttons : [],
	            searchitems :[],
	            pagination: {
					diaplay_pages: 5,
					align: 'bottom' 
				},
				showSearch:true,
				checkBoxType:'single',
	            url:'/ycbmall-manager-ws/ws/0.1/userOrderCms/queryBranchOrderSkus?branchOrderId='+id,
				onError:showError,
				showCheckbox: false,
				overflow:true
	    }); 
	};
	function orderMailInfo(id,wraper){
		var item=$.jRadGet({url:'/ycbmall-manager-ws/ws/0.1/userOrderCms/getOrderMailInfo?branchOrderId='+id});
		$('#orderMailInfo div[name="consigneeName"]',wraper).html(item.consigneeName);
		$('#orderMailInfo div[name="shopName"]',wraper).html(item.shopName);
		$('#orderMailInfo div[name="address"]',wraper).html(item.provinceName+item.areaName+item.countyName);
		// $('#orderMailInfo div[name="provinceName"]',wraper).html(item.provinceName);
		// $('#orderMailInfo div[name="areaName"]',wraper).html(item.areaName);
		// $('#orderMailInfo div[name="countyName"]',wraper).html(item.countyName);
		$('#orderMailInfo div[name="postalAddress"]',wraper).html(item.postalAddress);
		$('#orderMailInfo div[name="postcode"]',wraper).html(item.postcode);
		$('#orderMailInfo div[name="mobile"]',wraper).html(item.mobile);
		$('#orderMailInfo div[name="telephone"]',wraper).html(item.telephone);
		
		var str='';
		$.each(item.despatchBillArray,function(i){
			str='<div class="despatch" style="border:1px #797979 solid;width:1480px; MARGIN-RIGHT: auto;MARGIN-LEFT: auto;">'
				+'<div  class="row-fluid">'
				+'<label class="span3 grid-layout-label">发货单号：</label>'
				+'<div class="span3 grid-layout-content">'
				+'<div name="'+this.despatchBillId+'">'+this.billNumber+'</div>'
				+'</div>'
				+'</div>'
				+'<div  class="row-fluid">'
				+'<label class="span3 grid-layout-label">发货供应商：</label>'
				+'<div class="span3 grid-layout-content">'
				+'<div>'+this.supplyName+'</div>'
				+'</div>'
				+'</div>';
				$.each(this.parcels,function(i){
				var number=i+1;
				str+='<div class="row-fluid blag">'
				+'<label class="span3 grid-layout-label">包裹'+number+'：</label>'
				+'<div class="span3 grid-layout-content">'
				+'<div name="'+this.expressWayId+'">快递公司：'+this.expressWayName+'</div>'
				+'</div>'
				+'<label class="span2 grid-layout-label">快递单号：</label>'
				+'<div class="span5 grid-layout-content">'
				+'<div name="'+this.expressNumber+'">'+this.expressNumber+'</div>'
				+'</div>'
				+'</div>';
				});
				str+='</div>'
				    +'<br>';
			$('#orderMailInfo div.grid-layout-main',wraper).append(str)
		});
		
		
		
//		var str='';找下清除按钮
//		$.each(item.parcels,function(i){
//			var number=i+1;
//			str+='<div class="row-fluid blag">'
//				+'<label class="span3 grid-layout-label">包裹'+number+'：</label>'
//				+'<div class="span3 grid-layout-content">'
//				+'<div name="'+item.parcels[i].expressWayId+'">快递公司：'+item.parcels[i].expressWayName+'</div>'
//				+'</div>'
//				+'<label class="span2 grid-layout-label">快递单号：</label>'
//				+'<div class="span5 grid-layout-content">'
//				+'<div name="'+item.parcels[i].expressNumber+'">'+item.parcels[i].expressNumber+'</div>'
//				+'</div>'
//				+'</div>'
//		});
	};
	function clearOrderInfo(wraper){
	   $(".details-tab .f-left:first",wraper).click();
	   $("#branchOrderInfo",wraper).form({item:{}}); 
	   $("#userOrderInfo",wraper).form({item:{}}); 
	   branchOrderInfoFlag=false;
	   userOrderInfoFlag=false;
	   goodsInfoFlag=false;
	   orderMailInfoFlag=false; 
	   $("#branchOrder_goodsInfo",wraper).html('<table id="Table_branchOrder_goodsInfoList"></table>');
	   $('#orderMailInfo div.blag',wraper).remove()
	}
	//取消订单
	function cancelRefundOrderView(branchId,id,userId){
		var item = $.jRadGet({url : '/ycbmall-manager-ws/ws/0.1/userOrderCms/cancelOrderDetails?id='+id});
		 $('#Form_cancel_order').form({
	          title: '订单退款',
	          url:'/ycbmall-manager-ws/ws/0.1/userOrderCms/cancelOrder',
	          before_submit:function(json){
	        	json.id=id;
	            json.operator=carsmart_config.operatorName;
	            return json
	          },
	          success_callback:function(){ 
	            $('#Table_orderList_manage').flexMessage('订单退款已提交', 'success');
	            $('#Table_orderList_manage').flexReloadCurrentPage();
	          }
	        }).form('open');
		 $('#Form_cancel_order div[name="deductions"]').input('val',0);
		 $('#Form_cancel_order div[name="shopId"]').html(item.shopId);
		 $('#Form_cancel_order div[name="shopName"]').html(item.shopName);
		 $('#Form_cancel_order div[name="realPayment"]').html("￥"+item.realPayment);
	} 
	
}); 
function confirmReceiptView(branchId,wraper){
	var fields_confirm_params={};
	fields_confirm_params['payWay'] = {
			data: [
			  {id:'1',name:'线下支付'}
			  ]
	};
	fields_confirm_params['payChannel'] = {
			data: [
			  {id:'1',name:'线下汇款'}
			  ]
	};
	
	fields_confirm_params['payProve'] = {
			url: '/ycbmall-manager-ws/ws/0.1/file/uploadThree',
			fileName: "file",
			note: '仅支持 JPG图片文件，且建议大小小于20M,宽高不能小于500*280,且最多只能上传5张图片',
			show: false,
			success: function(data) {
				$("#picShowErro",wraper).html('');
				if ($.isArray(data)) {
					$.jRadAlert(data[0].message, "error");
					return false;
				} else {
					var _pDiv = $("div[name='payProve']", wraper);
					var liArr = $(".pic-show", _pDiv).children("li");
					var len = liArr.length;
					$(liArr[len - 1]).find('div.smallUrl-pic').removeClass('smallUrl-pic');
					$(liArr[len - 1]).data(data);
				}
			},
			beforeSubmit: function(obj) {
				var _pDiv = $("div[name='payProve']", wraper);
				var liArr = $(".pic-show", _pDiv).children("li");
				var re = /^.*\.(jpg|JPG)$/;
				if (liArr.length>=5) {
					$("#picShowErro",wraper).html('提示：最多只能上传5张图片');
					return false;
				} else if(!re.test(obj.val())){
					$("#picShowErro",wraper).html('提示：只能上传jpg文件');
					return false;
				}else{
					return true;
				}
			},
			single: false,
			horizontal: true,
			prev: 'smallUrl',
			showInfo: false
		};
	 $('#Form_confirm_receipt').form({
         title: '确认收款',
         url:'/ycbmall-manager-ws/ws/0.1/userOrderCms/confirmReceipt',
         fields_params:fields_confirm_params,
         before_submit:function(json){
           json.branchId=branchId;
           json.operator=carsmart_config.operatorName;
           var picsArr = [];
			var _p = $("#Form_confirm_receipt div[name='payProve']", wraper);
			$.each($(".pic-show", _p).children("li"), function(i) {
				var picJson = {};
				picJson.picUrl = $(this).data('fileUrl');
				if (picJson.picUrl == '' || picJson.picUrl == undefined || picJson.picUrl == null) {
					picJson.picUrl = $(this).data('picUrl')
				}
				picJson.middlePicUrl = $(this).data('middleUrl');
				if (picJson.middlePicUrl == '' || picJson.middlePicUrl == undefined || picJson.middlePicUrl == null) {
					picJson.middlePicUrl = $(this).data('middlePicUrl')
				}
				picJson.smallPicUrl = $(this).data('smallUrl');
				if (picJson.smallPicUrl == '' || picJson.smallPicUrl == undefined || picJson.smallPicUrl == null) {
					picJson.smallPicUrl = $(this).data('smallPicUrl')
				}
				picsArr.push(picJson);
			});
			json.pics = picsArr;
           return json
         },
         success_callback:function(){ 
           $('#Table_orderList_manage').flexMessage('确认收款成功', 'success');
           $('#Table_orderList_manage').flexReloadCurrentPage();
         }
       }).form('open');
}

	
//function getClassificationNameSearch(node,val,wraper){ 
//	var label = "";
//	var classClass = "";
//	var sc = "";
//	var _val="";
//	if(node==2){
//		label = "二级分类：";
//		classClass = "secondClass"; 
//		sc = "second";
//		$(".jrad-table .searchContent",wraper).find('.second').remove();
//	}
//	if(val!=""){ 
//		var item = $.jRadGetDataSources("/ycbmall-manager-ws/ws/0.1/classificationCms/getClassificationsByParentId?parentId="+val+"&level="+node,"classificationId","name");
//		if(item.length>0){
//		item.unshift({id:'',name:'请选择'});
//		var $label = $("<label>").addClass('grid-layout-label span3').addClass(sc).html(label);
//		var $div = $("<div>").addClass('grid-layout-content span4 fluid-wrap').addClass(sc);
//		var $select = $("<div>").attr('name',classClass).addClass('jrad-select-container addClass');
//		if(classClass=="secondClass"){
//			$(".jrad-table .searchContent",wraper).find('div.row-fluid:eq(6)').prepend($div.append($select)).prepend($label);
//		}
//		node++; 
//		$select.select({
//			data:item,
//			unshiftData: {id:'',name:'请选择'}, 
//			grid:false,
//			onchange: function(val){
//				//getClassificationNameSearch(node,val,wraper); 
//				if(val!=""){
//					$('#Table_orderList_manage',wraper).flexOptions({  
//						extParam:{
//							classificationId: val
//						}
//					})
//				}else{
//					$('#Table_orderList_manage',wraper).flexOptions({  
//						extParam:{}	
//					})
//				}
//			}
//		});
//		}
//		
//	}else{
//		$('#Table_orderList_manage',wraper).flexOptions({  
//			extParam:{}
//		})
//	}
//};
//function getareaCodeNameSearch(node,val,wraper){ 
//	var label = "";
//	var classClass = "";
//	var sc = "";
//	var _val="";
//	if(node==2){
//		label = "订单城市：";
//		classClass = "secondClass"; 
//		sc = "second";
//		$(".jrad-table .searchContent",wraper).find('.second').remove();
//	}
//	if(val!=""){ 
//		var item = $.jRadGetDataSources("/ycbmall-manager-ws/ws/0.1/CityInfoCms/getCityInfoByProvinceId?provinceId="+val,"areaCodeId","areaName");
//		if(item.length>0){
//		item.unshift({id:'',name:'请选择'});
//		var $label = $("<label>").addClass('grid-layout-label span3').addClass(sc).html(label);
//		var $div = $("<div>").addClass('grid-layout-content span4 fluid-wrap').addClass(sc);
//		var $select = $("<div>").attr('name',classClass).addClass('jrad-select-container addClass');
//		if(classClass=="secondClass"){
//			$(".jrad-table .searchContent",wraper).find('div.row-fluid:eq(6)').prepend($div.append($select)).prepend($label);
//		}
//		node++; 
//		$select.select({
//			data:item,
//			unshiftData: {id:'',name:'请选择'}, 
//			grid:false,
//			onchange: function(val){
//				getareaCodeNameSearch(node,val,wraper); 
//				if(val!=""){
//					$('#Table_orderList_manage',wraper).flexOptions({  
//						extParam:{
//							areaCodeId: val
//						}
//					})
//				}else{
//					$('#Table_orderList_manage',wraper).flexOptions({  
//						extParam:{}	
//					})
//				}
//			}
//		});
//		}
//		
//	}else{
//		$('#Table_orderList_manage',wraper).flexOptions({  
//			extParam:{}
//		})
//	}
//};
function showError(xhr){
  var errormsg = eval("(" + xhr.responseText + ")");
  var cDiv = $("#Wraper_orderList_manage .cDiv");
  $.jRadMessage({level:'error',message:errormsg[0].message,selector:cDiv});
}
//判断是否可以取消订单
function isRefund(payStatusName,payChannelName,branchOrderStatusName){
		if(branchOrderStatusName=="取消订单"){
			return false;
		}
		if(payStatusName=='已付款'){
			var payChannelNames = ['兑换码支付','免费领取','养车宝积分支付','代金券支付','线下当面支付','百度钱包','百度银行卡支付','营销活动免费支付','车主卡支付','车主卡激活','抵用券支付'];
			var channelNames = payChannelName.split(","); 
			for (var i = 0; i < channelNames.length; i++) {
				if(payChannelNames.indexOf(channelNames[i])>0){
					return false;
				}
			}
			return true;
	}else{
		return false;
	}
	
}

