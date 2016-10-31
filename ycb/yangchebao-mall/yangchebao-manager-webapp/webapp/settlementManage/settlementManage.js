$(document).ready(function(){ 
    var wraper = $('#Wraper_settlement_manage');
    var page_column_model = new Array();
    var page_search_items = new Array();
    var page_list_buttons = new Array();
	 	
	var entityModel = {};
    var jRad = $.jRad({app:'radsample-ws',entityModel:entityModel}); 
	
    jRad.params['provinceCodeSearch'] = {
    		urlData:{
    			url:'/ycbmall-manager-ws/ws/0.1/area/provinceAllTwo'
    		},
    		unshiftData: {id:'',name:'请选择'},
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
    	}; 
    	jRad.params['areaCodeSearchId'] = {
    			data: [{id:'',name:'请选择'}]
    		};
    	
    
	var _form = $("#Form_settlement_manage",wraper);

	page_column_model.push({display: '发货单ID', name : 'despatchBillId'});
    page_column_model.push({display: '结算状态', name : 'settlementStatusName'});
    page_column_model.push({display: '分订单号', name : 'branchOrderNumber'}); 
    page_column_model.push({display: '发货单号', name : 'billNumber'}); 

    page_column_model.push({display: '发货供应商', name : 'supplyName'});
    page_column_model.push({display: '订单城市', name : 'areaName'});
    page_column_model.push({display: '发货时间', name : 'deliveredTime',width:200});  
	page_column_model.push({display: '支付状态', name : 'payStatusName'});
	page_column_model.push({display: '分订单状态', name : 'branchOrderStatusName'});
	page_column_model.push({display: '订单金额', name : 'realPayment'});
	page_column_model.push({display: '应结算金额(订单成本+运费)', name : 'settlementAmount'});
	page_column_model.push({display: '操作人', name : 'settlementMan'});
    
	page_search_items.push({row:'1',type:'jrad-input',display:'发货单ID',name:'despatchBillId'});
	page_search_items.push({row:'1',type:'jrad-input',display:'发货供应商',name:'supplyName'});
	page_search_items.push({row:'1',type:'jrad-input',display:'分订单号',name:'branchOrderNumber'});
	page_search_items.push({row:'2',type:'jrad-select',display:'结算状态',name:'settlementStatus',params:{
		  data:[
		    {id:'',name:'全部'},
		    {"id":"0",name:"未结算"},
			{"id":"1",name:"已结算"} 
		  ]
		}}); 
	page_search_items.push({row:'2',type:'jrad-select',display:'省',name:'provinceId',params:jRad.params['provinceCodeSearch']});
	page_search_items.push({row:'2',type:'jrad-select',display:'市',name:'areaCodeId',params:jRad.params['areaCodeSearchId']});
	page_search_items.push({row:'3',type:'jrad-dateinput',display:'发货时间始',name:'deliveredTimeBegin'});
	page_search_items.push({row:'3',type:'jrad-dateinput',display:'发货时间终',name:'deliveredTimeEnd'});
	
	
    $('#Form_settlement_manage .jrad-btn-normal',wraper).button({
		click: function(){
			$('.details-box',wraper).slideUp();
			$('.jrad-table',wraper).slideDown(); 
			$(".scroll-up-btn").click();
		}
	});  
    
	$('#Form_settlement_manage',wraper).form({
		validators: jRad.validators,
		layout: 'grid', 
		autobinding: false
	 }); 
	

	page_list_buttons.push({title:'查看详情',name:'detail', bclass:'look-detail',prefunc:function(){
            var checked = $('#Table_settlement_manage').getCheckedTrs();
            if (checked.length != 1) {return false;}else{return true;}
        },onpress : function(){
            var checked = $('#Table_settlement_manage').getCheckedTrs(); 
            if(checked[0]){
            	detailSettlement(checked[0].despatchBillId,wraper);
            }
        }
    });  
	page_list_buttons.push({title:'订单结算',name:'ordersettlement', bclass:'order',displayname:'订单结算',prefunc:function(){
			var checked = $('#Table_settlement_manage').getCheckedTrs();
			if (checked.length != 1) {return false;}else{if(checked[0].settlementStatus!=0){
				return false;
			}else{return true;}
			}
		},onpress : function(){
			var checked = $('#Table_settlement_manage').getCheckedTrs();
			if(checked[0]) {
				settlementProveView(checked[0].despatchBillId,wraper);
			}
		}
    });
	
    page_list_buttons.push({separator: true}); 
	$('#Table_settlement_manage').flexigrid({
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
			url:'/ycbmall-manager-ws/ws/0.1/despatchBillCms/queryDespatchBills',
			onError:showsettlementError,
			overflow:true
	});   
	  
	var _span7=$('div.searchButtons',wraper).parent().removeClass('span7').addClass('span20');
    var _div=$('<div>').addClass('row-fluid').append(_span7);
    $('div.searchContent',wraper).append(_div);
	
	$(".searchButtons .ui-b-icon:first",wraper).unbind('click');
	$(".searchButtons .ui-btn-icon:first",wraper).click(function(){
			 $('#Table_settlement_manage',wraper).flexOptions({url:'/ycbmall-manager-ws/ws/0.1/despatchBillCms/queryDespatchBills'});
			 $('#Table_settlement_manage',wraper).flexReloadSearch();
	}); 
	$(".searchButtons .ui-btn-icon:nth-child(2)",wraper).unbind('click');
	$(".searchButtons .ui-btn-icon:nth-child(2)",wraper).click(function(){  
			var sDiv = $(".searchContent",wraper);
			$('.jrad-select',sDiv).select('val', '');
			$('.jrad-autocomplete',sDiv).autocomplete('val', '');
			$('.jrad-input',sDiv).input('val', '');
			$('.jrad-dateinput',sDiv).dateinput('val', '');
			$('.jrad-autocombo',sDiv).autocombo('val', '');
			$('.jrad-checkbox',sDiv).checkbox('val', '');
			$('#Table_settlement_manage').flexOptions({
						url:'/ycbmall-manager-ws/ws/0.1/despatchBillCms/queryDespatchBills',
						queryParam:{},
						page:0});
			$('#Table_settlement_manage',wraper).flexReloadSearch();
	}); 
	
	
	
	$(".details-tab .return",wraper).click(function(){
		$('.details-box',wraper).slideUp();
		$('.jrad-table',wraper).slideDown(); 
		$(".scroll-up-btn").click();
	});

	});
//查看结算订单详情
function detailSettlement(despatchBillId,wraper){
	 var item =$.jRadGet({url : '/ycbmall-manager-ws/ws/0.1/despatchBillCms/getDespatchBillDetail?despatchBillId='+despatchBillId});
	 $(".details-box .details-tab",wraper).find("span[name='title']").html("结算订单详情"); 
	 initSettlementInfo(wraper);  
	 $('.jrad-table',wraper).slideUp();
	 $('.details-box',wraper).slideDown(); 
	 $(".scroll-up-btn").click(); 
	 
	 $('#Form_settlement_manage div[name="branchOrderNumber"]',wraper).html(item.branchOrderNumber);
	 $('#Form_settlement_manage div[name="billNumber"]',wraper).html(item.billNumber);
	 $('#Form_settlement_manage div[name="deliveredTime"]',wraper).html(item.deliveredTime);
	 $('#Form_settlement_manage div[name="orderDate"]',wraper).html(item.orderDate);
	 $('#Form_settlement_manage div[name="areaName"]',wraper).html(item.areaName);
	 $('#Form_settlement_manage div[name="supplyName"]',wraper).html(item.supplyName);
	 $('#Form_settlement_manage div[name="commodityCost"]',wraper).html(item.commodityCost);
	 $('#Form_settlement_manage div[name="postage"]',wraper).html(item.postage);
	 $('#Form_settlement_manage div[name="settlementAmount"]',wraper).html(item.settlementAmount);
	 $('#Form_settlement_manage div[name="settlementMan"]',wraper).html(item.settlementMan);
	 $('#Form_settlement_manage div[name="settlementTime"]',wraper).html(item.settlementTime);
	 var settlementProvePic = item.settlementProvePic;
	 var settlementProveSmallPic = item.settlementProveSmallPic;
	 if(settlementProvePic!=undefined&&settlementProvePic!=""){
		 var _li1 ='<a href="'+settlementProvePic+'" title="" class="file cboxElement"><img height="250" width="250"  src="'+settlementProveSmallPic+'"></a>';
		 $('#Form_settlement_manage div[name="settlementProveShow"]',wraper).html(_li1);
		 $(".file").colorbox({rel: 'file',close:'x' ,maxWidth: '70%',maxHeight: '70%',previous:'<i class="icon-font-arrow-left"></i>',next:'<i class="icon-font-arrow-right"></i>'});
	 }
	 var skuArray = item.skuArray;
	 $.each(skuArray,function(i){
		 var _str='<tr><td>'+this.skuId+'</td>'
		 	+'<td>'+this.skuName+'</td>'
		 	+'<td>'+this.number+'</td>'
		 	+'<td>'+this.costPrice+'</td>'
		 	+'<td>'+this.commodityTypeName+'</td>'
		 	+'</tr>';
		 $('#Form_settlement_manage #Table_deliverySku_manage tbody',wraper).append(_str);
	 });
}
//清除绑定的值
function initSettlementInfo(wraper){
	$('#Form_settlement_manage div[name="settlementProveShow"]',wraper).html('');
	$('#Form_settlement_manage #Table_deliverySku_manage tbody',wraper).html('');
}
//订单结算
function settlementProveView(despatchBillId,wraper){
	
	
	var _form = $("#Form_settlement",wraper);
	var fields_prove_params={};
	
	fields_prove_params['settlementProve'] = {
			url:'/ycbmall-manager-ws/ws/0.1/file/uploadThree',
			delFunc: function(item){
			   item.list.remove();
			   $("input[name='settlementProvePic']",_form).val("");
			   $("input[name='settlementProveMidPic']",_form).val("");
			   $("input[name='settlementProveSmallPic']",_form).val(""); 
			},
			fileName:"file",
			note: '仅支持 JPG和PNG图片文件,图片大小640*150',
			show: false,
			params: {type:""},
			success: function(data){ 
			   if(data[0]&&data[0].code=="400"){
			     $.jRadMessage({level:'error',message:data[0].message});
			   }else{
			   $("input[name='settlementProvePic']",_form).val(data.fileUrl);
			   $("input[name='settlementProveMidPic']",_form).val(data.middleUrl);
			   $("input[name='settlementProveSmallPic']",_form).val(data.smallUrl); 
			   }
			},
		   beforeSubmit: function(obj){
			  var re = /^.*\.(jpg|JPG|png|PNG)$/;
			  if(re.test(obj.val())){
				return true;
			  }else{  
				$.jRadAlert("只能上传jpg和PNG文件", "error");
				$("div[name='settlementProve']",_form).find("input[type='file']").val('');
				return false;
			  }
			},
			single: true,
			showInfo:false,
			prev:'fileUrl'
		};
	 $('#Form_settlement').form({
         title: '订单结算',
         url:'/ycbmall-manager-ws/ws/0.1/despatchBillCms/settlement',
         fields_params:fields_prove_params,
         before_submit:function(json){
           delete json.settlementProve;
           json.despatchBillId=despatchBillId;
           json.operator=carsmart_config.operatorName;
           return json
         },
         success_callback:function(){ 
           $('#Table_settlement_manage').flexMessage('确认收款成功', 'success');
           $('#Table_settlement_manage').flexReloadCurrentPage();
         }
       }).form('open');

	
}


function showsettlementError(xhr){
	 var errormsg = eval("(" + xhr.responseText + ")");
	  var cDiv = $("#Wraper_settlement_manage .cDiv");
	  $.jRadMessage({level:'error',message:errormsg[0].message,selector:cDiv});
} 
