$(document).ready(function(){ 
	
	//定义wraper
    var wraper = $('#Wraper_vatInvoice_manage');
    
    //定义三个集合，用于存放操作按钮,搜索条件,数据展示
    var page_column_model = new Array();
    var page_search_items = new Array();
    var page_list_buttons = new Array();
    
    //操作按钮
	page_list_buttons.push({title: '审核',name:'cancel', bclass:'business',displayname: '审核',prefunc:function(){
        var checked = $('#Table_vatInvoice_list').getCheckedTrs();
        if (checked.length != 1) {return false;}else{return true;
        }
    },onpress : function(){
        var checked = $('#Table_vatInvoice_list').getCheckedTrs(); 
        var vatId=checked[0].id;   //增票资质Id
        if(checked[0]) {
        	auditVatView(vatId,wraper);
        }
    }
	});  
	page_list_buttons.push({separator: true});

	
    //搜索框
    page_search_items.push({row:'1',type:'jrad-input',display:'商家ID',name:'shopAccountId'});
	page_search_items.push({row:'1',type:'jrad-input',display:'商家店名',name:'shopAccountName'});
	page_search_items.push({row:'1',type:'jrad-select',display:'资质状态',name:'vatStatus',params:{
		data:[
		  {id:'',name:'全部'},
		  {id:'1',name:'待审核'},
		  {id:'2',name:'审核通过'},
		  {id:'3',name:'驳回'},
		  {id:'0',name:'无效'}
		]
	}});  
	//grid展示
	 page_column_model.push({display: 'ID', name : 'id',hidden:true});
	 page_column_model.push({display: '商家ID', name : 'shopAccountId'});
	 page_column_model.push({display: '商家店名', name : 'shopName'});
     page_column_model.push({display: '单位名称', name : 'unitName'}); 
	 page_column_model.push({display: '注册地址', name : 'registeredAddress'});
	 page_column_model.push({display: '增票资质状态', name : 'statusName'});
	 page_column_model.push({display: '操作时间', name : 'updated'});
	 page_column_model.push({display: '操作人', name : 'operator'});   
	
	
	//操作dataGrid
	$('#Table_vatInvoice_list').flexigrid({
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
		url:'/ycbmall-manager-ws/ws/0.1/VatInvoiceCms/queryYmVatInvoice',
		overflow:true
	});
	var _span3 = $('div.searchButtons', wraper);
	var _span20 = $('<div>').addClass('span20').append(_span3);
	var _div = $('<div>').addClass('row-fluid').append(_span20);
	$('div.searchContent', wraper).append(_div);
	$('div.searchContent span.span14', wraper).remove();
});

function auditVatView(id,wraper){
    //初始化组件数据
	var fields_params = {};
	var item = $.jRadGet({url : '/ycbmall-manager-ws/ws/0.1/VatInvoiceCms/detailVatInvoice?id='+id});
	var vatStatus =  item.vatStatus;
	var data = [];
	switch(vatStatus){
	  case 0 : data=[
	    			  {id:'0',name:'无效'}
	    			 ]
	  break;
	  case 1 : data=[
	    			  {id:'1',name:'待审核'},
	    			  {id:'2',name:'审核通过'},
	    			  {id:'3',name:'驳回'},
	    			  {id:'0',name:'无效'}
	    			 ]
	  break;
	  case 2 : data=[
	    			  {id:'2',name:'审核通过'},
	    			  {id:'0',name:'无效'}
	    			 ]
	  break;
	  case 3 : data=[
	    			  {id:'3',name:'驳回'},
	    			  {id:'0',name:'无效'}
	    			 ]
	  break;
	   
	}
	fields_params['vatStatus'] = {
			data:data
	};
	
	//赋值操作
	$('#Form_vat_invoice div[name="unitName"]',wraper).html(item.unitName);
	$('#Form_vat_invoice div[name="identificationCode"]',wraper).html(item.identificationCode);
	$('#Form_vat_invoice div[name="registeredAdress"]',wraper).html(item.registeredAddress);
	$('#Form_vat_invoice div[name="registeredPhone"]',wraper).html(item.registeredPhone);
	$('#Form_vat_invoice div[name="bank"]',wraper).html(item.bank);
	$('#Form_vat_invoice div[name="bankAccount"]',wraper).html(item.bankAccount);
	
	//初始化编辑框
	initVatInvoice(wraper);
	   
	//显示图片的方法
	showPic(item,wraper);

	 $('#Form_vat_invoice').form({
	        title: '增票资质审核',
	        url:'/ycbmall-manager-ws/ws/0.1/VatInvoiceCms/editVatInvoice',
	        item:item,
	        fields_params:fields_params,
	        before_submit:function(json){
	          json.id=id;
	          json.operator=carsmart_config.operatorName;
	          return json
	        },
	        success_callback:function(){ 
	          $('#Table_vatInvoice_list').flexMessage('审核成功', 'success');
	          $('#Table_vatInvoice_list').flexReloadCurrentPage();
	        }
	      }).form('open');
}

function showPic(item,wraper){
	var _ul = $("div[name='taxcodebak']",wraper); 
//    var src = item.taxcodebakPicSmaUrl;
    var srcBig = item.taxcodebakPicUrl;
    var _ul1 = $("div[name='generalTaxpayer']",wraper); 
//    var src1 = item.generalTaxpayerPicSmaUrl;
    var srcBig1 = item.generalTaxpayerPicUrl;
    var _ul2 = $("div[name='license']",wraper);
//    var src2 = item.licenseSmaPicUrl;
    var srcBig2 = item.licensePicUrl;
    var _ul3 = $("div[name='entrust']",wraper);
//    var src3 = item.entrustSmaPicUrl;
    var srcBig3 = item.entrustPicUrl;
    if(srcBig!=undefined&&srcBig!=""){ 
      var _li ='<a class="vatInvoice cboxElement" title="" href="'+srcBig+'"  ><img height="250" width="250" src="'+srcBig+'"></a>';
      _ul.html(_li);
    }
    if(srcBig1!=undefined&&srcBig1!=""){ 
        var _li1 ='<a href="'+srcBig1+'" title="" class="vatInvoice cboxElement"><img height="250" width="250"  src="'+srcBig1+'"></a>';
        _ul1.html(_li1);
      }
    if(srcBig2!=undefined&&srcBig2!=""){ 
        var _li2 ='<a href="'+srcBig2+'" title="" class="vatInvoice cboxElement"><img height="250" width="250"  src="'+srcBig2+'"></a>';
        _ul2.html(_li2);
      }
    if(srcBig3!=undefined&&srcBig3!=""){ 
        var _li3 ='<a href="'+srcBig3+'" title="" class="vatInvoice cboxElement"><img height="250" width="250"  src="'+srcBig3+'"></a>';
        _ul3.html(_li3);
      }
    $(".vatInvoice").colorbox({rel: 'vatInvoice',close:'x' ,maxWidth: '70%',maxHeight: '70%',previous:'<i class="icon-font-arrow-left"></i>',next:'<i class="icon-font-arrow-right"></i>'});
}
function initVatInvoice(wraper){
	  var _ul = $("div[name='taxcodebak']",wraper); 
	  _ul.html(""); 
	  var _ul1 = $("div[name='generalTaxpayer']",wraper); 
	  _ul.html(""); 
	  var _ul2 = $("div[name='license']",wraper); 
	  _ul.html(""); 
	  var _ul3 = $("div[name='entrust']",wraper); 
	  _ul.html(""); 
}
function showError(xhr) {
	var errormsg = eval("(" + xhr.responseText + ")");
	var cDiv = $("#Wraper_vatInvoice_manage .cDiv");
	$.jRadMessage({
		level: 'error',
		message: errormsg[0].message,
		selector: cDiv
	});
}