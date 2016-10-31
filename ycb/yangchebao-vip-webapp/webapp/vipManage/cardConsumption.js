
$(document).ready(function(){ 
	
	
	var wraper = $('#Wraper_cardConsumption_manage');
	
	var selectId;
	
	var page_column_model = new Array();
	var page_search_items = new Array();
	
	
//    page_column_model.push({display: '会员ID', name : 'memberId'});
//    page_column_model.push({display: '会员卡ID', name : 'id'});
    page_column_model.push({display: '序号', name : 'sequence'});
    page_column_model.push({display: '卡名称(卡类型)', name : 'name'}); 
    page_column_model.push({display: '卡余额', name : 'remainingMoney'});
    page_column_model.push({display: '服务', name : 'service',width:500});
    
    page_search_items.push({row:'1',type:'jrad-input',display:'用户手机号',name:'memberPhone'});
    
    $('#Table_vipCard_list',wraper).flexigrid({
		reload:true,
		method:'get',
		colModel : page_column_model,
		searchitems :page_search_items,
		pagination: {
			diaplay_pages: 5,
			align: 'bottom' 
		},
		showSearch:true, 
		autoload: false,
		url:'/vip-ws/ws/0.1/memberCard/queryMemberCardByPhone',
		onError:showErrorV,
		showCheckbox:true,
		overflow:true,
		checkBoxType:'single',
		extParam:{
            businessInfoId: carsmart_config.businessInfoId
        },
		preProcess: function(data){  //数据预处理  如果只有一条数据的话下面的table就自动加载
		  if(data.length==1){
			    $('#Table_cardService_info',wraper).flexOptions({ 
	                extParam:{
	                	memberCardId: data[0].id,
	                    businessInfoId: carsmart_config.businessInfoId
	                }
	            }).flexReload();
	            
	            $('#Table_cardBlance_info',wraper).flexOptions({ 
	                extParam:{
	                	memberCardId: data[0].id,
	                    businessInfoId: carsmart_config.businessInfoId
	                }
	            }).flexReload();
		  }
		  return data;
		},
		onSuccess:function(data){
			//判断data是否为1条,1条就自动选中
			if(data.totalCount==1){
				$('#Table_vipCard_list',wraper).flexSelect([data.items[0].id]);
			}
			if(selectId!=''&&selectId!=undefined){
				$('#Table_vipCard_list',wraper).flexSelect([selectId]);
			}
		},
		trEvent:function(){		 
			 var checked = $('#Table_vipCard_list',wraper).getCheckedTrs();  
	            $('#Table_cardService_info',wraper).flexOptions({ 
	                extParam:{
	                	memberCardId: checked[0].id,
	                    businessInfoId: carsmart_config.businessInfoId
	                }
	            }).flexReload();
	            
	            $('#Table_cardBlance_info',wraper).flexOptions({ 
	                extParam:{
	                	memberCardId: checked[0].id,
	                    businessInfoId: carsmart_config.businessInfoId
	                }
	            }).flexReload();
		}
	});

	$(".searchButtons .btn-info:first",wraper).unbind('click').click(function(){
		selectId='';
		$('#Table_vipCard_list',wraper).flexReloadSearch();
		if($('#Table_vipCard_list',wraper).find("tbody").children().length>1){
			$('#Table_cardService_info',wraper).find("tbody").children().remove();
			$('#Table_cardBlance_info',wraper).find("tbody").children().remove();
		}
	});
	$(".searchButtons .btn-info:nth-child(2)",wraper).unbind('click').click(function(){  
		var sDiv = $(".searchContent",wraper);
		$('.jrad-input',sDiv).input('val', '');
		$('#Table_vipCard_list',wraper).find("tbody").children().remove();
		$('#Table_cardService_info',wraper).find("tbody").children().remove();
		$('#Table_cardBlance_info',wraper).find("tbody").children().remove();
	}); 
    
    
    
    
    $('.vdiv .tDiv',wraper).before('<span style="margin:0 20px 0 14px;font-size:15px;float:left;line-height:60px;">会员卡</span>');
    
    var page_column_model_s = new Array();
    var page_list_buttons_s = new Array();
	
	
    page_column_model_s.push({display: '序号', name : 'sequence'});
    page_column_model_s.push({display: '卡名称(卡类型)', name : 'memberCardName'}); 
    page_column_model_s.push({display: '服务', name : 'serviceName',width:500});
    page_column_model_s.push({display: '总计次数', name : 'serviceTimes'});
    
    page_list_buttons_s.push({title: '扣减',displayname:'扣减',name:'Add', bclass: 'icon-plus',onpress : function(){
    	var checkedV = $('#Table_vipCard_list',wraper).getCheckedTrs();
    	var checked = $('#Table_cardService_info',wraper).getCheckedTrs();
    	selectId = checkedV[0].id;
    	if(checked.length==1){
    	     $.jRadConfirm('本次消费服务：'+checked[0].serviceName+'，总次数'+checked[0].serviceTimes+'次，扣减1次，是否确认扣减？',1,function(){
    	        	var postData={};
    	        	postData.businessInfoId=carsmart_config.businessInfoId;
    	        	postData.memberCardId=checkedV[0].id;
    	        	postData.memberId=checkedV[0].memberId;
    	        	postData.serviceId=checked[0].id;
    	            $.jRadPost({  
    	                url:'/vip-ws/ws/0.1/memberCard/deductCardService',
    	                data:postData, 
    	                success: function(data){ 
    	                    $('#Table_cardService_info',wraper).flexMessage('扣减成功!', 'success');
    	                    $('#Table_cardService_info',wraper).flexReload();
    	                    $('#Table_vipCard_list',wraper).flexReload();
    	                },
    	                error:function(xhr){ 
    	                    var errormsg = eval("(" + xhr.responseText + ")"); 
    	                    if (errormsg != undefined) {
    	                        $('#Table_cardService_info',wraper).flexMessage(errormsg[0].message, 'error');
    	                    }
    	                }
    	            });
    	        }); 
    	}else{
    		$.jRadMessage({
				level: 'error',
				message: '请选中一条记录来进行操作',
				selector:$("#Wraper_cardConsumption_manage .sdiv")
			})
    	}
   
	}
	});
    
    $('#Table_cardService_info',wraper).flexigrid({
    	reload:false,
		method:'get',
		colModel : page_column_model_s,
		buttons : page_list_buttons_s,
		autoload: false,
		pagination: {
			diaplay_pages: 5,
			align: 'bottom' 
		},
		showSearch:true, 
		url:'/vip-ws/ws/0.1/memberCard/getCardServiceList',
		onError:showErrorS,
		overflow:true,
		checkBoxType:'single'
	});
    
    $('.sdiv .tDiv',wraper).before('<span style="margin:0 20px 0 14px;font-size:15px;float:left;line-height:60px;">服务</span>');
    
    var page_column_model_u = new Array();
    var page_list_buttons_u = new Array();
	
	
    page_column_model_u.push({display: '序号', name : 'sequence'});
    page_column_model_u.push({display: '卡名称(卡类型)', name : 'name'});
    page_column_model_u.push({display: '账号余额', name : 'remainingMoney'});
    
    page_list_buttons_u.push({title: '扣减',displayname:'扣减',name:'Add', bclass: 'icon-plus',onpress : function(){
    	var checked = $('#Table_cardBlance_info').getCheckedTrs();
    	var checkedV = $('#Table_vipCard_list',wraper).getCheckedTrs();
    	selectId = checkedV[0].id;
    	if(checked.length==1){
	        $('#Form_cardBlance',wraper).form({
	            title: '扣减',   
	            url: '/vip-ws/ws/0.1/memberCard/deductAccount',
	            preSubmit:function(json){ 
	                json.businessInfoId = carsmart_config.businessInfoId;
	                json.memberCardId=checkedV[0].id;
	                json.memberId=checkedV[0].memberId;
	                json.userInfoId = checked[0].userInfoId;
	                return json;
	            },
	            success:function(){ 
	                $('#Table_cardBlance_info',wraper).flexMessage('扣减成功', 'success');
	                $('#Table_cardBlance_info',wraper).flexReload();
                    $('#Table_vipCard_list',wraper).flexReload();
	            }
	        }).form('open');
	        $("#Form_cardBlance div[name='atualMoney']",wraper).input('readonly',true);
	        $("#Form_cardBlance div[name='discountMoney']",wraper).input('val',0);
	        $("#Form_cardBlance div.grid-layout-main input",wraper).keyup(function(){
	        	var consumeMoney =parseFloat($("#Form_cardBlance div[name='consumeMoney']",wraper).input('val'));
	        	var discountMoney = parseFloat($("#Form_cardBlance div[name='discountMoney']",wraper).input('val'));
	        	$("#Form_cardBlance div[name='atualMoney']",wraper).input('val',isNaN(consumeMoney-discountMoney)?0:(consumeMoney-discountMoney).toFixed(2));
	        });
	        
    	}else{
    		$.jRadMessage({
				level: 'error',
				message: '请选中一条记录来进行操作',
				selector:$("#Wraper_cardConsumption_manage .udiv")
			});
    	}
    	
	}
	});
    
    $('#Table_cardBlance_info',wraper).flexigrid({
    	reload:false,
		method:'get',
		colModel : page_column_model_u,
		buttons : page_list_buttons_u,
		autoload: false,
		pagination: {
			diaplay_pages: 5,
			align: 'bottom' 
		},
		showSearch:true, 
		url:'/vip-ws/ws/0.1/memberCard/getMemberCardAccount',
		onError:showErrorU,
		overflow:true,
		checkBoxType:'single'
	});
    
    $('.udiv .tDiv',wraper).before('<span style="margin:0 20px 0 14px;font-size:15px;float:left;line-height:60px;">卡内余额</span>');
	
});

function showErrorV(xhr){
	var errormsg = eval("(" + xhr.responseText + ")");
    var vdiv = $("#Wraper_cardConsumption_manage .vdiv");
    $.jRadMessage({level:'error',message:errormsg[0].message,selector:vdiv});	
}

function showErrorS(xhr){
	var errormsg = eval("(" + xhr.responseText + ")");
    var vdiv = $("#Wraper_cardConsumption_manage .sdiv");
    $.jRadMessage({level:'error',message:errormsg[0].message,selector:vdiv});	
}

function showErrorU(xhr){
	var errormsg = eval("(" + xhr.responseText + ")");
    var vdiv = $("#Wraper_cardConsumption_manage .udiv");
    $.jRadMessage({level:'error',message:errormsg[0].message,selector:vdiv});	
}