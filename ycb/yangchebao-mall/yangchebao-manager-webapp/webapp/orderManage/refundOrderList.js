$(document).ready(function(){ 
	//定义wraper
    var wraper = $('#Wraper_refundOrder_manage');
    
    //定义三个集合，用于存放操作按钮,搜索条件,数据展示
    var page_column_model = new Array();
    var page_search_items = new Array();
    var page_list_buttons = new Array();
	
    
    
    //操作按钮
    
	page_list_buttons.push({title: '订单退款',name:'cancel', bclass:'discard',displayname: '订单退款',prefunc:function(){
        var checked = $('#Table_refundOrder_list').getCheckedTrs();
        if (checked.length != 1) {return false;}else{if(checked[0].statusName!="退款中"){
        	return false;
        }else{return true;}
        }
    },onpress : function(){
        var checked = $('#Table_refundOrder_list').getCheckedTrs(); 
        var userOrderId=checked[0].userOrderId;   //分订单Id
        var refundId=checked[0].refundId;   //退款Id
        if(checked[0]) {
        	cancelOrderView(userOrderId,refundId,wraper);
        }
    }
	});
	page_list_buttons.push({title: '查看',name:'details', bclass:'discard',displayname: '查看订单详情',prefunc:function(){
        var checked = $('#Table_refundOrder_list').getCheckedTrs();
        if (checked.length != 1) {return false;}else{return true;}
	},onpress : function(){
		var checked = $('#Table_refundOrder_list').getCheckedTrs(); 
        var refundId=checked[0].refundId;   //退款Id
        if(checked[0]){
        	openRefundDetail(refundId,wraper);
        }
    }
	});  
	page_list_buttons.push({separator: true});

	
    //搜索框
    page_search_items.push({row:'1',type:'jrad-input',display:'分订单号',name:'branchOrderNumber'});
	page_search_items.push({row:'1',type:'jrad-input',display:'商家店名',name:'shopName'});
	page_search_items.push({row:'1',type:'jrad-input',display:'用户手机',name:'mobile'});
	page_search_items.push({row:'2',type:'jrad-dateinput',display:'下单时间开始',name:'orderDateBegin'});
	page_search_items.push({row:'2',type:'jrad-dateinput',display:'下单时间结束',name:'orderDateEnd'});
	page_search_items.push({row:'2',type:'jrad-select',display:'支付状态',name:'payStatus',params:{
		data:[
		  {id:'',name:'全部'},
		  {id:'3',name:'退款中'},
		  {id:'4',name:'退款完成'}
		]
	}});  
	page_search_items.push({row:'3',type:'jrad-select',display:'订单省份',name:'provinceId',params:{
		urlData:{
			url:'/ycbmall-manager-ws/ws/0.1/area/provinceAllTwo'
		},
		unshiftData: {id:'0',name:'全部'},
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
				url:'/ycbmall-manager-ws/ws/0.1/area/municipalitiesTwo?provinceId=' + provinceCode
			},
			unshiftData: {id:'',name:'请选择'},
			}).select('val','');
			}
		}
	}});
	page_search_items.push({row:'3',type:'jrad-select',display:'订单城市',name:'areaCodeId',params:{
		data: [{id:'',name:'请选择'}]
	}});
	
	//grid展示
	 page_column_model.push({display: '分订单号', name : 'branchOrderNumber'});
	 page_column_model.push({display: '总订单号', name : 'orderNumber'});
     page_column_model.push({display: '商家店名', name : 'shopName'}); 
	 page_column_model.push({display: '用户手机', name : 'mobile'});
	 page_column_model.push({display: '下单时间', name : 'orderDate'});
	 page_column_model.push({display: '取消时间', name : 'cancelTime'});
	 page_column_model.push({display: '城市', name : 'municipalityName'});
	 page_column_model.push({display: '订单金额', name : 'realPayment'});
	 page_column_model.push({display: '退款时间', name : 'refundTime'});
	 page_column_model.push({display: '退款金额', name : 'refundMoney'});
	 page_column_model.push({display: '支付状态', name : 'statusName'});
	 page_column_model.push({display: '操作人', name : 'operator'});
	
	//操作dataGrid
	$('#Table_refundOrder_list').flexigrid({
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
		url:'/ycbmall-manager-ws/ws/0.1/userOrderCms/queryRefundOrders',
		onError:showError,
		overflow:true
	});
	var _span3 = $('div.searchButtons', wraper);
	var _span20 = $('<div>').addClass('span20').append(_span3);
	var _div = $('<div>').addClass('row-fluid').append(_span20);
	$('div.searchContent', wraper).append(_div);
	$('div.searchContent span.span14', wraper).remove();
});

function cancelOrderView(id,refundId,wraper){
    //初始化组件数据
	var fields_params = {};
	var item = $.jRadGet({url : '/ycbmall-manager-ws/ws/0.1/userOrderCms/refundOrderDetails?id='+id});
	//赋值操作
	if(item.payOnline==0||item.payOnline==2){
		fields_params['refundWayRadio'] = {
				data: [{id: '2',name: '转账退款'}]
		};
		fields_params['refundProve'] = {
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
						var _pDiv = $("div[name='refundProve']", wraper);
						var liArr = $(".pic-show", _pDiv).children("li");
						var len = liArr.length;
						$(liArr[len - 1]).find('div.smallUrl-pic').removeClass('smallUrl-pic');
						$(liArr[len - 1]).data(data);
					}
				},
				beforeSubmit: function(obj) {
					var _pDiv = $("div[name='refundProve']", wraper);
					var liArr = $(".pic-show", _pDiv).children("li");
					var re = /^.*\.(jpg|JPG)$/;
					if (liArr.length>=5) {
						$("#picShowErro",wraper).html('提示：最多只能上传5张图片');
						return false;
					} else if(!re.test(obj.val())){
						$("#picShowErro",wraper).html('提示：只能上传jpg文件');
						return false;
					}
				},
				single: false, 
				horizontal: true,
				prev: 'smallUrl',
				showInfo: false
			};
		$('#Form_face_refund div[name="shopId"]',wraper).html(item.shopId);
		$('#Form_face_refund div[name="shopName"]',wraper).html(item.shopName);
		$('#Form_face_refund div[name="realPayment"]',wraper).html("￥"+item.realPayment);
		$('#Form_face_refund div[name="yue"]',wraper).html("￥"+item.yue);
		$('#Form_face_refund div[name="thirdPartyPayment"]',wraper).html("￥"+item.thirdPartyPayment);
		$('#Form_face_refund div[name="deductions"]',wraper).html("￥"+item.deductions);
		$('#Form_face_refund div[name="refundMoney"]',wraper).html("￥"+item.refundMoney);
		
		$('#Form_face_refund').form({
	         title: '订单退款',
	         url:'/ycbmall-manager-ws/ws/0.1/userOrderCms/faceRefundOrder',
	         fields_params:fields_params,
	         autobinding: true,
	         before_submit:function(json){
	           json.refundId=refundId;
	           json.operator=carsmart_config.operatorName;
	           var picsArr = [];
				var _p = $("#Form_face_refund div[name='refundProve']", wraper);
				$.each($(".pic-show", _p).children("li"), function(i) {
					var picJson = {};
					picJson.picUrl = $(this).data('fileUrl');
					if (picJson.picUrl == '' || picJson.picUrl == undefined || picJson.picUrl == null) {
						picJson.picUrl = $(this).data('info').fileUrl;
					}
					picJson.middlePicUrl = $(this).data('middleUrl');
					if (picJson.middlePicUrl == '' || picJson.middlePicUrl == undefined || picJson.middlePicUrl == null) {
						picJson.middlePicUrl = $(this).data('info').middleUrl;
					}
					picJson.smallPicUrl = $(this).data('smallUrl');
					if (picJson.smallPicUrl == '' || picJson.smallPicUrl == undefined || picJson.smallPicUrl == null) {
						picJson.smallPicUrl = $(this).data('info').smallUrl;
					}
					picsArr.push(picJson);
				});
				json.pics = picsArr;
	           return json
	         },
	         success_callback:function(){ 
	           $('#Table_refundOrder_list').flexMessage('退款成功', 'success');
	           $('#Table_refundOrder_list').flexReloadCurrentPage();
	         }
	       }).form('open');
		$('#Form_face_refund div[name="refundWayRadio"]',wraper).radio('val',2);
		$('#Form_face_refund div[name="deductionsNote"]',wraper).textarea('val',item.deductionsNote);
		$('#Form_face_refund div[name="deductionsNote"]',wraper).textarea('readonly',true);

	}else{
		fields_params['refundWayRadio'] = {
				data: [{id: '1',name: '原款原退'}]
		};
		$('#Form_refund_order div[name="shopId"]',wraper).html(item.shopId);
		$('#Form_refund_order div[name="shopName"]',wraper).html(item.shopName);
		$('#Form_refund_order div[name="realPayment"]',wraper).html("￥"+item.realPayment);
		$('#Form_refund_order div[name="yue"]',wraper).html("￥"+item.yue);
		$('#Form_refund_order div[name="thirdPartyPayment"]',wraper).html("￥"+item.thirdPartyPayment);
		$('#Form_refund_order div[name="deductions"]',wraper).html("￥"+item.deductions);
		$('#Form_refund_order div[name="refundMoney"]',wraper).html("￥"+item.refundMoney);
		$('#Form_refund_order input[name="id"]',wraper).val(refundId);
		$('#Form_refund_order input[name="operator"]',wraper).val(carsmart_config.operatorName);
		//利用组件的form，由于组件的form是ajax提交的,得自己写form来进行提交
		 $('#Form_refund_order').form({
	         title: '订单退款',
	         fields_params:fields_params,
	       }).form('open');
				 	
		 $('#Form_refund_order #btn',wraper).unbind('click').click(function(){
			 if($('#Form_refund_order div[name="refundNote"]',wraper).textarea('val').length>40){
				 var cDiv = $("#Form_refund_order #refundForm");
					$.jRadMessage({
						level: 'error',
						message: "退款备注不能大于40个字符",
						selector: cDiv
					});
	        	return false;
	         }
			 $('#Form_refund_order #refundForm').submit();
			 $('#Form_refund_order').form('close');
				$.jRadConfirmTwo('退款是否完成', 'success',
				function() {
					$("#FormBackground").hide();
					}
				);
		 });
		$('#Form_refund_order div[name="deductionsNote"]',wraper).textarea('val',item.deductionsNote);
		$('#Form_refund_order div[name="deductionsNote"]',wraper).textarea('readonly',true);
		$('#Form_refund_order div[name="refundWayRadio"]',wraper).radio('val',1);
		if($('#Form_refund_order div[name="refundWayRadio"]',wraper).radio('val')==1){
			$('#Form_refund_order input[name="refundWay"]',wraper).val(1);
		}

	}
	
}


function openRefundDetail(refundId,wraper){
	var fields_params = {};
	var item = $.jRadGet({url : '/ycbmall-manager-ws/ws/0.1/userOrderCms/refundOkDetail?refundId='+refundId});
	//赋值操作

		fields_params['refundWayRadio'] = {
				data: [{id: '1',name: '原款原退'},{id: '2',name: '转账退款'}]
		};	 
	 $('#Form_refund_detail').form({
         title: '订单退款详情',
         fields_params:fields_params,
         item:item,
         height:500
       }).form('open');
	$('#Form_refund_detail div[name="shopId"]',wraper).html(item.shopId);
	$('#Form_refund_detail div[name="shopName"]',wraper).html(item.shopName);
	$('#Form_refund_detail div[name="realPayment"]',wraper).html("￥"+item.realPayment);
	$('#Form_refund_detail div[name="yue"]',wraper).html("￥"+item.yue);
	$('#Form_refund_detail div[name="thirdPartyPayment"]',wraper).html("￥"+item.thirdPartyPayment);
	$('#Form_refund_detail div[name="deductions"]',wraper).html("￥"+item.deductions);
	$('#Form_refund_detail div[name="refundMoney"]',wraper).html("￥"+item.refundMoney);
	$('#Form_refund_detail div[name="refundWayRadio"]',wraper).radio('val',item.refundWay);
	$("#Form_refund_detail div[name='refundProve']", wraper).children(".pic-show").html('');
	var _ul = $("#Form_refund_detail div[name='refundProve']", wraper).children(".pic-show");
	var arr = item.pics;
	$.each(arr, function(i) {
		var $li = $("<li>").addClass("refundOrderPicBoxli");
		var $div = $("<div>").html('<a href="'+arr[i].picUrl+'" title="" class="file cboxElement"><img src="' + arr[i].smallPicUrl + '"></a>');
		$li.append($div);
		_ul.append($li);
	});
	 $(".file").colorbox({rel: 'file',close:'x',previous:'<i class="icon-font-arrow-left"></i>',next:'<i class="icon-font-arrow-right"></i>'});
	
	 
}

function showError(xhr) {
	var errormsg = eval("(" + xhr.responseText + ")");
	var cDiv = $("#Wraper_refundOrder_manage .cDiv");
	$.jRadMessage({
		level: 'error',
		message: errormsg[0].message,
		selector: cDiv
	});
}



$.jRadConfirmTwo = function(message, level, sure, cancel,selector) {
    var icon = $('<span>').addClass("icon-ok-sign icon");
    var info = $('<span>').addClass(level + " icon").html(message);
	var oper = $('<div>')
			.addClass('ui-dialog-operation')
			.append('<span class="jrad-dialog ui-btn-primary submit">退款完成</span>');
	var dialog = $('<div>').addClass('jrad-dialog-confirm')
		.append(info).appendTo('body')
		.dialog({
			title : '提示',
			onclose: function(){
				dialog.remove();
			},
			buttons : oper
		}).dialog('open', selector);
	$('.submit',dialog).button({
		click : function(e) {
			if (jQuery.isFunction(sure)) {
				$('#Table_refundOrder_list').flexReloadCurrentPage();
			};
			dialog.dialog('close', selector);
		}
	});
	return dialog;
};
