var num = 0;
var shopFlag = false;
var operateFlag = false;
var carwashFlag = false;
var beautifyFlag = false;
var repairFlag = false;
var rescueFlag = false;
var upkeepFlag = false; 
var smallUpkeepFlag = false; 
var standardFlag = false;
$(document).ready(function(){
	var wraper = $('#Wraper_shop_list');
	$(".details-tab .f-left",wraper).click(function(){
	    $(".details-tab .tab-cur").removeClass("tab-cur");
	    $(this).addClass("tab-cur"); 
		var rele = $(this).attr("rele"); 
		$(".tabReleForm",wraper).hide(); 
		var type = $("#shopInfo").find("input[name='updateOrAdd']").val();
		var id = $("#shopInfo").find("input[name='id']").val(); 
		//getServiceInfo2("1","carwash",id);
		if(type == "update"){
			$('#Wraper_price_list').hide();
			if(rele=="operateInfo"&& operateFlag==false){ 
				var item =$.jRadGet({
					url : "/shopmanage-ws/ws/0.1/shopmanage/shop/detailShopOperatingInfo?id="+id
				});
				
				// if(item.grade!=''){
				// 	item.grade=Math.floor((item.grade)/10)*10
				// }
				$("#"+rele,wraper).form({item:item});

				var onlineVal = $("#operateInfo",wraper).find('div[name="onlinePayStatus"]').select('val');
				if(onlineVal == 1){
					$("#operateInfo div[name='isCoop']",wraper).select('val',3);
				}else{
					if(item.isCoop == 1){
						$("#operateInfo div[name='isCoop']",wraper).select('val',1);
					}else{
						$("#operateInfo div[name='isCoop']",wraper).select('val',2);
					}
				}

				//广告 "ads":[]
				if(item.ads!=undefined&&item.ads.length>0){ 
					$.each(item.ads,function(i){
					num++; 
					item.ads[i].offerServiceId = item.ads[i].offerServiceId.split(",");
					cloneAD(num,wraper,item.ads[i]);
			 	});
			}  
			operateFlag = true;
			}else if(rele=="carwashService"){
	 		  $('#Wraper_price_list').show();
			  getServiceInfo("1","carwash",id);//1.洗车 2.美容 3.保养 4.维修 5.小保养
			}else if(rele=="beautifyService"){
	 		  $('#Wraper_price_list').show();
			  getServiceInfo("2","beautify",id); 
			}else if(rele=="upkeepService"){
	 		  $('#Wraper_price_list').show();
			  getServiceInfo("3","upkeep",id); 
			}else if(rele=="repairService"){
	 		  $('#Wraper_price_list').show();
			  getServiceInfo("4","repair",id); 
			}else if(rele=="smallUpkeepService"){
	 		  $('#Wraper_price_list').show();
			  getServiceInfo("5","smallUpkeep",id); 
			}else if(rele=="rescueService"){  //救援
			  rescueServiceInfo("rescue",id); 
			}else if(rele=="standardService"){  //标准化服务
			  getServiceInfo2("1","carwash",id);
			}
		}
		$("#"+rele,wraper).show();

		//getServiceInfo2("1","carwash",id);

		$(".details-tab2 .f-left",wraper).click(function(){
	    	$(".details-tab2 .tab-cur").removeClass("tab-cur");
			$(this).addClass("tab-cur");
			var rele = $(this).attr("rele");
			$(".tabReleForm2",wraper).hide();

			if(rele=="carwash"){
				getServiceInfo2("1","carwash",id)
			}else if(rele=="beautify"){
				getServiceInfo2("2","beautify",id)
			}else if(rele=="upkeep"){
				getServiceInfo2("3","upkeep",id)
			}else if(rele=="repair"){
				getServiceInfo2("4","repair",id)
			}
			$('div#'+rele).show()
	    });
  		
	});
	$('#saveBtn',wraper).button({
		click: function(){ 
		 $('#shopInfo .jrad-btn-primary',wraper).click(); 
		 if(operateFlag==true){
		  $('#operateInfo .jrad-btn-primary',wraper).click();
		 }
		 $('.details-box',wraper).slideUp();
		 $('#Wraper_price_list').hide();
		 $('.details-box',wraper).prev('.ui-tit').hide();
		 $('.jrad-table',wraper).slideDown();   
		 clearShopInfo(wraper,gmap,bmap);
		 $(".scroll-up-btn").click();
		 $(".showTab:first").click();		 
		 $('#Table_shop_list').flexReloadCurrentPage();
		 $('#Wraper_shop_list .message-tips').fadeOut(3000);  
			
		}
	});
	var mapArr = initShopInfo(wraper);  
	initOperateInfo(wraper); 
    var bmap = mapArr.bmap;	
    var gmap = mapArr.gmap;	
	var entityModel = {};
	var jRad = $.jRad({app:'radsample-ws',entityModel:entityModel}); 
	//省市区select值
	jRad.params['provinceCodeSearch'] = {
			urlData:{
				     url:'/euc/ws/0.1/user/provinces?userId='+carsmart_config.userId
			},
			unshiftData: {id:'',name:'请选择'},
			onchange: function(){
				var provinceCode = $('.searchContent div[name=provinceId]',wraper).select('val');
				if(provinceCode==''){
					$('.searchContent div[name=areaCodeId]',wraper).select({
																urlData:{url:''},
																data:[{id:'',name:'请选择'}],
																val: ''});
				}else{
				$('.searchContent div[name=areaCodeId]',wraper).select({
					urlData:{
						 url:'/euc/ws/0.1/user/cities?provinceId='+provinceCode+'&userId='+carsmart_config.userId
					},
					unshiftData: {id:'',name:'请选择'},
					val:''
				});
				} 
				$('.searchContent div[name=countyId]',wraper).select({
																urlData:{url:''},
																data:[{id:'',name:'请选择'}],
																val: ''});
			}
		};
	jRad.params['cityIdSearch'] = {
		data: [{id:'',name:'请选择'}],
		onchange: function(){
			var cityId = $('.searchContent div[name=areaCodeId]',wraper).select('val');
			if(cityId==''){
				$('.searchContent div[name=countyId]',wraper).select({
																urlData:{url:''},
																data:[{id:'',name:'请选择'}],val: ''});
			}else{
				$('.searchContent div[name=countyId]',wraper).select({
					urlData:{
						url: '/shopmanage-ws/ws/0.1/userInfoCms/countries?areaCodeId=' + cityId
					},
					unshiftData: {id:'',name:'请选择'},
					val:''
				});
			}
		}
	};
	
	jRad.params['countyIdSearch'] = {
			data: [{id:'',name:'请选择'}]
		};
	jRad.params['onlinePayStatusSearch'] = {
			data: [{id:'',name:'全部'},{id:'0',name:'不支持'},{id:'1',name:'支持'}]
		};
	 
	var page_column_model = new Array();
	var page_search_items = new Array();
	var page_list_buttons = new Array(); 

	page_column_model.push({display: '商家ID', name : 'id',width:100});
	page_column_model.push({display: '商家简称', name : 'businessRegName',diy:function(item,$div){
	   $div.html("<a class='shopLink' shopid='"+item.id+"'>"+item.businessRegName+"</a>");
	}});
	page_column_model.push({display: '市', name : 'areaName'});
	page_column_model.push({display: '地址', name : 'address'});
	page_column_model.push({display: '售后电话', name : 'mobile'});
	page_column_model.push({display: '服务车厂', name : 'modelName'}); 
	page_column_model.push({display: '结算百分比', name : 'transferRate',diy:function(item,$div){
		$div.html(item.transferRate+'%')
	}});   
	page_column_model.push({display: '是否在黑名单', name : 'isBlackName'});
	page_column_model.push({display: '状态', name : 'statusName'});
	page_column_model.push({display: '合作等级', name : 'isCoopName'});
	page_column_model.push({display: '商家级别', name : 'grade'});
	page_column_model.push({display: '合约时间', name : 'coopDateRange'});  
	page_column_model.push({display: '最后编辑人', name : 'modifyPerson'});  
	page_column_model.push({display: '更新时间', name : 'updateDate'});  
	
	page_search_items.push({row:'1',type:'jrad-input',display:'ID',name:'id'});
	page_search_items.push({row:'1',type:'jrad-input',display:'商家全称',name:'name'});
	page_search_items.push({row:'1',type:'jrad-input',display:'商家简称',name:'businessRegName'});
	page_search_items.push({row:'2',type:'jrad-input',display:'地址',name:'address'}); 
	page_search_items.push({row:'2',type:'jrad-select',display:'支持在线支付',name:'onlinePayStatus',params:jRad.params['onlinePayStatusSearch']});
	page_search_items.push({row:'2',type:'jrad-select',display:'省',name:'provinceId',params:jRad.params['provinceCodeSearch']});
	page_search_items.push({row:'3',type:'jrad-select',display:'市',name:'areaCodeId',params:jRad.params['cityIdSearch']});
	page_search_items.push({row:'3',type:'jrad-select',display:'县',name:'countyId',params:jRad.params['countyIdSearch']}); 
	page_search_items.push({row:'3',type:'jrad-input',display:'售前电话',name:'serviceTel'}); 
	page_search_items.push({row:'4',type:'jrad-input',display:'售后电话',name:'mobile'});
	page_search_items.push({row:'4',type:'jrad-select',display:'商家类型',name:'type',params:{
	  data:[{'id':'','name':'全部'},{'id':'0','name':'4S店'},{'id':'1',name:'连锁店'},{'id':'2','name':'专修店'},{'id':'3','name':'汽配城'},{'id':'4','name':'其他'}]
	}}); 
	page_search_items.push({row:'4',type:'jrad-dateinput',display:'更新时间开始',name:'startDate'});
	page_search_items.push({row:'5',type:'jrad-dateinput',display:'更新时间结束',name:'endDate'});
	page_search_items.push({row:'5',type:'jrad-select',display:'合作等级',name:'isCoop',params:{
	  data:[
	    {"id":"",name:"全部"}, 
		{"id":"1",name:"普通商家"},
		{"id":"2",name:"认证商家"},
		{"id":"3",name:"合作商家"},
		{"id":"4",name:"车店通商家"}
	  ]
	}});   
	page_search_items.push({row:'5',type:'jrad-input',display:'折扣范围开始',name:'saleoffstart'});
    page_search_items.push({row:'6',type:'jrad-input',display:'折扣范围结束',name:'saleoffend'});	
	page_search_items.push({row:'6',type:'jrad-select',display:'是否置顶',name:'isTop',params:{
	  data:[
	    {"id":"",name:"全部"},
	    {"id":"0",name:"否"},
		{"id":"1",name:"是"}
	  ]
	}
	}); 
	page_search_items.push({row:'6',type:'jrad-select',display:'广告类型',name:'adType',params:{
	  data:[
	    {"id":"",name:"全部"},
	    {"id":"1",name:"长时优惠"},
		{"id":"2",name:"限时优惠"}
	  ]
	}}); 
	page_search_items.push({row:'7',type:'jrad-input',display:'服务车厂',name:'modelName'});
	page_search_items.push({row:'7',type:'jrad-input',display:'最后编辑人',name:'modifyPerson'}); 
	page_search_items.push({row:'7',type:'jrad-select',display:'状态',name:'status',params:{
	  data:[
		{"id":"3",name:"未删除"},		 
	    {"id":"0",name:"无效"},
		{"id":"1",name:"有效"},
		{"id":"2",name:"已删除"},
		{"id":"4",name:"完善中"},
		{"id":"",name:"全部"}		
	  ]
	}}); 
	page_search_items.push({row:'8',type:'jrad-select',display:'是否黑名单',name:'isBlacklist',params:{
	  data:[
	    {"id":"",name:"全部"},
	    {"id":"0",name:"否"},
		{"id":"1",name:"是"}
	  ]
	}
	});  
	page_search_items.push({row:'8',type:'jrad-dateinput',display:'合作时间开始',name:'coopStartDate'});
	page_search_items.push({row:'8',type:'jrad-dateinput',display:'合作时间结束',name:'coopEndDate'});
	page_search_items.push({row:'9',type:'jrad-input',display:'商家级别',name:'grade'});
	page_search_items.push({row:'9',type:'jrad-select',display:'选择服务',name:'zeroService',params:{
		data:[
			{"id":"",name:"请选择"},{id:'1',name:'洗车'},{id:'2',name:'美容'},{id:'3',name:'保养'},{id:'4',name:'维修'},{id:'5',name:'小保养'}
		],
		onchange: function(val){  
			getServiceSonNodeSearch("1",val,wraper);  
		}
	}
	}); 
	
	page_list_buttons.push({name:'Add',bclass: 'add',onpress : function(){ 
	     $('.details-box',wraper).slideDown();
		 $('.details-box',wraper).prev('.ui-tit').html('<strong>商家新增</strong>').show()
		 $('.jrad-table',wraper).slideUp(); 
		 $(".scroll-up-btn").click();
		 clearShopInfo(wraper,gmap,bmap);
		 $("#shopInfo",wraper).find("div[name='status']").select({
			 data:[ 
				{"id":"1",name:"有效"}, 		 
				{"id":"0",name:"无效"}
			  ]
		    });
		$('#shopInfo .settle',wraper).hide();
		$("#operateInfo div[name='grade']",wraper).input('val','20')
		}
	});
	page_list_buttons.push({name:'Edit',bclass: 'edit',prefunc:function(){
            var checked = $('#Table_shop_list').getCheckedTrs();
            if (checked.length != 1) {return false;}else{return true;};
        },onpress : function(){
			$('#standardService').hide()
	    	var checked = $('#Table_shop_list').getCheckedTrs(); 
			var id = checked[0].id;
			if(checked[0]) {
				$('#standardService').hide()
				updateShopView(id,wraper,gmap,bmap);
			}
		}
	});
	page_list_buttons.push({name:'delete',bclass: 'delete',prefunc:function(){
            var checked = $('#Table_shop_list').getCheckedTrs();
            if (checked.length < 1) {return false;}else{return true;}
        },onpress : function(){
	    	var checked = $('#Table_shop_list').getCheckedTrs();
			$ .jRadConfirm('确认删除吗？',1,function(){
				var ids = [];
				$.each(checked,function(){
					ids.push(this.id); 
				});
				ids.join(',');
				$.jRadPost({
					url:'/shopmanage-ws/ws/0.1/shopmanage/shop/deleteShopBatch?idString='+ids, 
					success: function(){
						$('#Table_shop_list').flexMessage('删除成功!', 'success');
           	    		$('#Table_shop_list').flexReloadCurrentPage();
					},error:function(xhr){
						var errormsg = eval("(" + xhr.responseText + ")");
						$('#Table_shop_list').flexMessage(errormsg[0].message, 'error');
					}
				});
			});
		}
	});
	page_list_buttons.push({displayname: '查看点评',name:'seeRemark',bclass: 'seeRemark',
		prefunc:function(){
            var checked = $('#Table_shop_list').getCheckedTrs();
            if (checked.length != 1||carsmart_config.isAgentor!=0) {return false;}else{return true;}
        },
        onpress : function(){
	    	var checked = $('#Table_shop_list').getCheckedTrs();
			var name = checked[0].name; 
			$(document).data("shopRemarkName",name);
			$.jRadOpenTab({'name':'点评管理','url':'userManage/remark.html'});
 
		}
	});
	page_list_buttons.push({displayname: '点评-快捷',name:'remark',bclass: 'remark',prefunc:function(){
            var checked = $('#Table_shop_list').getCheckedTrs();
            if (checked.length != 1||carsmart_config.isAgentor!=0) {return false;}else{return true;}
        },onpress : function(){
	    	var checked = $('#Table_shop_list').getCheckedTrs(); 
			$(document).data('remarkShopId',checked[0].id);  
			$.jRadOpenTab({'name':'点评管理','url':'userManage/remark.html'});
		}
	});
	page_list_buttons.push({displayname: '系统消息-快捷',name:'message',bclass: 'message',prefunc:function(){
            var checked = $('#Table_shop_list').getCheckedTrs();
            if (checked.length != 1||carsmart_config.isAgentor!=0) {return false;}else{return true;}
        },onpress : function(){
	    	var checked = $('#Table_shop_list').getCheckedTrs(); 
			$(document).data('messageShopId',checked[0].id);  
			$.jRadOpenTab({'name':'系统消息管理','url':'message/system-message.html'});
		}
	});
	page_list_buttons.push({displayname: '导出商家ID',name:'txt', bclass: 'txt',
		prefunc:function(){
			if(carsmart_config.isAgentor!=0){return false;}else{return true;}
		},
		onpress : function(){ 
		 $.jRadConfirm('确认导出吗？',1,function(){
				 var param = {};
				 var busiId =  $.trim($(".searchContent div[name='id']",wraper).input('val'));
				 if(busiId!="")
				 {
					 param['busiId'] = busiId;
				 }
				 var name =  $.trim($(".searchContent div[name='name']",wraper).input('val'));
				 if(name!="")
				 {
					 param['name'] = name;
				 }
				 var businessRegName = $.trim($(".searchContent div[name='businessRegName']",wraper).input('val'));
				 if(businessRegName!=""){
					param['businessRegName'] = businessRegName;
				 }; 
				 var address = $.trim($(".searchContent div[name='address']",wraper).input('val'));
				 if(address!=""){
					param['address'] = address;
				 };
				 var onlinePayStatus = $.trim($(".searchContent div[name='onlinePayStatus']",wraper).select('val'));
				 if(onlinePayStatus!=""){
					param['onlinePayStatus'] = onlinePayStatus;
				 }; 
				 var provinceId = $.trim($(".searchContent div[name='provinceId']",wraper).select('val'));
				 if(provinceId!=""){
					param['provinceId'] = provinceId;
				 };
				 var areaCodeId = $.trim($(".searchContent div[name='areaCodeId']",wraper).select('val'));
				 if(areaCodeId!=""){
					param['areaCodeId'] = areaCodeId;
				 }; 
				 var countyId = $.trim($(".searchContent div[name='countyId']",wraper).select('val'));
				 if(countyId!=""){
					param['countyId'] = countyId;
				 };  
				 var serviceTel = $.trim($(".searchContent div[name='serviceTel']",wraper).input('val'));
				 if(serviceTel!=""){
					param['serviceTel'] = serviceTel;
				 };  
				 var mobile = $.trim($(".searchContent div[name='mobile']",wraper).input('val'));
				 if(mobile!=""){
					param['mobile'] = mobile;
				 };
				 var Type = $.trim($(".searchContent div[name='type']",wraper).select('val'));
				 if(Type!=""){
					param['Type'] = Type;
				 }; 
				 var startDate = $.trim($(".searchContent div[name='startDate']",wraper).dateinput('val'));
				 if(startDate!=""){
					param['startDate'] = startDate;
				 }; 
				 var endDate = $.trim($(".searchContent div[name='endDate']",wraper).dateinput('val'));
				 if(endDate!=""){
					param['endDate'] = endDate;
				 };
				 var isCoop = $.trim($(".searchContent div[name='isCoop']",wraper).select('val'));
				 if(isCoop!=""){
					param['isCoop'] = isCoop;
				 };  
				 var saleoffstart = $.trim($(".searchContent div[name='saleoffstart']",wraper).input('val'));
				 if(saleoffstart!=""){
					param['saleoffstart'] = saleoffstart;
				 };
				 var saleoffend = $.trim($(".searchContent div[name='saleoffend']",wraper).input('val'));
				 if(saleoffend!=""){
					param['saleoffend'] = saleoffend;
				 }; 
				 var isTop = $.trim($(".searchContent div[name='isTop']",wraper).select('val'));
				 if(isTop!=""){
					param['isTop'] = isTop;
				 }; 
				 var adType = $.trim($(".searchContent div[name='adType']",wraper).select('val'));
				 if(adType!=""){
					param['adType'] = adType;
				 };
				 var status = $.trim($(".searchContent div[name='status']",wraper).select('val'));
				 if(status!=""){
					param['status'] = status;
				 };
				 var isBlacklist = $.trim($(".searchContent div[name='isBlacklist']",wraper).select('val'));
				 if(isBlacklist!=""){
					param['isBlacklist'] = isBlacklist;
				 }; 
				 var modelName = $.trim($(".searchContent div[name='modelName']",wraper).input('val'));
				 if(modelName!=""){
					param['modelName'] = modelName;
				 }; 
				 var modifyPerson = $.trim($(".searchContent div[name='modifyPerson']",wraper).input('val'));
				 if(modifyPerson!=""){
					param['modifyPerson'] = modifyPerson;
				 };
				 var zeroService = $.trim($(".searchContent div[name='zeroService']",wraper).select('val'));
				 if(zeroService!=""){
					param['zeroService'] = zeroService;
				 };
				 var serviceId = $(".searchContent .service:last").select('val');
				 if(!isNaN(serviceId))
				 {
					param['serviceId'] = serviceId;
				 }
				 var coopStartDate = $.trim($(".searchContent div[name='coopStartDate']",wraper).dateinput('val'));
				 if(coopStartDate!=""){
					param['coopStartDate'] = coopStartDate;
				 }; 
				 var coopEndDate = $.trim($(".searchContent div[name='coopEndDate']",wraper).dateinput('val'));
				 if(coopEndDate!=""){
					param['coopEndDate'] = coopEndDate;
				 };
				 var grade = $.trim($(".searchContent div[name='grade']",wraper).input('val'));
				 if(grade!=""){
						param['grade'] = grade;
				 };
				 var paramUrl = "";
				 if(param!={}){   
					 paramUrl+="?"
					 $.each(param,function(k,v){ 
							paramUrl+="&"+k+"="+v; 
					 });
				 }
				 window.open('/shopmanage-ws/ws/0.1/shopmanage/shop/excel'+paramUrl);
			}); 
        }
    });
	page_list_buttons.push({displayname: '导出商家信息',name:'excel', bclass: 'excel',
		prefunc:function(){
			if(carsmart_config.isAgentor!=0){return false;}else{return true;}
		},
		onpress : function(){ 
		 $.jRadConfirm('确认导出吗？',1,function(){
				 var param = {};
				 var id =  $.trim($(".searchContent div[name='id']",wraper).input('val'));
				 if(id!=""){
					 param['id'] = id;
				 }
				 var name =  $.trim($(".searchContent div[name='name']",wraper).input('val'));
				 if(name!=""){
					 param['name'] = name;
				 }
				 var modelName = $.trim($(".searchContent div[name='modelName']",wraper).input('val'));
				 if(modelName!=""){
					param['modelName'] = modelName;
				 }; 
				 var isBlacklist = $.trim($(".searchContent div[name='isBlacklist']",wraper).select('val'));
				 if(isBlacklist!=""){
					param['isBlacklist'] = isBlacklist;
				 }; 
				 var isCoop = $.trim($(".searchContent div[name='isCoop']",wraper).select('val'));
				 if(isCoop!=""){
					param['isCoop'] = isCoop;
				 };
				 var onlinePayStatus = $.trim($(".searchContent div[name='onlinePayStatus']",wraper).select('val'));
				 if(onlinePayStatus!=""){
					param['onlinePayStatus'] = onlinePayStatus;
				 }; 
				 var provinceId = $.trim($(".searchContent div[name='provinceId']",wraper).select('val'));
				 if(provinceId!=""){
					param['provinceId'] = provinceId;
				 };
				 var countyId = $.trim($(".searchContent div[name='countyId']",wraper).select('val'));
				 if(countyId!=""){
					param['countyId'] = countyId;
				 };  
				 var businessRegName = $.trim($(".searchContent div[name='businessRegName']",wraper).input('val'));
				 if(businessRegName!=""){
					param['businessRegName'] = businessRegName;
				 }; 
				 var serviceId = $(".searchContent .service:last").select('val');
				 if(!isNaN(serviceId)){
					param['serviceId'] = serviceId;
				 }
				 var areaCodeId = $.trim($(".searchContent div[name='areaCodeId']",wraper).select('val'));
				 if(areaCodeId!=""){
					param['areaCodeId'] = areaCodeId;
				 }; 
				 var address = $.trim($(".searchContent div[name='address']",wraper).input('val'));
				 if(address!=""){
					param['address'] = address;
				 };
				 var serviceTel = $.trim($(".searchContent div[name='serviceTel']",wraper).input('val'));
				 if(serviceTel!=""){
					param['serviceTel'] = serviceTel;
				 };  
				 var mobile = $.trim($(".searchContent div[name='mobile']",wraper).input('val'));
				 if(mobile!=""){
					param['mobile'] = mobile;
				 };
				 var startDate = $.trim($(".searchContent div[name='startDate']",wraper).dateinput('val'));
				 if(startDate!=""){
					param['startDate'] = startDate;
				 };  
				 var endDate = $.trim($(".searchContent div[name='endDate']",wraper).dateinput('val'));
				 if(endDate!=""){
					param['endDate'] = endDate;
				 }; 
				 var modifyPerson = $.trim($(".searchContent div[name='modifyPerson']",wraper).input('val'));
				 if(modifyPerson!=""){
					param['modifyPerson'] = modifyPerson;
				 };
				 var Type = $.trim($(".searchContent div[name='type']",wraper).select('val'));
				 if(Type!=""){
					param['Type'] = Type;
				 }; 
				 var saleoffstart = $.trim($(".searchContent div[name='saleoffstart']",wraper).input('val'));
				 if(saleoffstart!=""){
					param['saleoffstart'] = saleoffstart;
				 };
				 var saleoffend = $.trim($(".searchContent div[name='saleoffend']",wraper).input('val'));
				 if(saleoffend!=""){
					param['saleoffend'] = saleoffend;
				 }; 
				 var adType = $.trim($(".searchContent div[name='adType']",wraper).select('val'));
				 if(adType!=""){
					param['adType'] = adType;
				 };
				 var status = $.trim($(".searchContent div[name='status']",wraper).select('val'));
				 if(status!=""){
					param['status'] = status;
				 };
				 var isTop = $.trim($(".searchContent div[name='isTop']",wraper).select('val'));
				 if(isTop!=""){
					param['isTop'] = isTop;
				 }; 
				 var coopStartDate = $.trim($(".searchContent div[name='coopStartDate']",wraper).dateinput('val'));
				 if(coopStartDate!=""){
					param['coopStartDate'] = coopStartDate;
				 }; 
				 var coopEndDate = $.trim($(".searchContent div[name='coopEndDate']",wraper).dateinput('val'));
				 if(coopEndDate!=""){
					param['coopEndDate'] = coopEndDate;
				 };
				 var zeroService = $.trim($(".searchContent div[name='zeroService']",wraper).select('val'));
				 if(zeroService!=""){
					param['zeroService'] = zeroService;
				 };
				 var grade = $.trim($(".searchContent div[name='grade']",wraper).input('val'));
				 if(grade!=""){
						param['grade'] = grade;
				 };
				 var paramUrl = "";
				 if(param!={}){   
					 paramUrl+="?"
					 $.each(param,function(k,v){ 
							paramUrl+="&"+k+"="+v; 
					 });
				 }
				 window.open('/shopmanage-ws/ws/0.1/shopmanage/shopInfo/excel'+paramUrl);
				 
			}); 
        }
    });
    page_list_buttons.push({displayname: '加入黑名单',name:'black',bclass: 'black',prefunc:function(){
            var checked = $('#Table_shop_list').getCheckedTrs();
            if (checked.length != 1||carsmart_config.isAgentor!=0) {return false;}else{return true;}
        },onpress : function(){
	    	var checked = $('#Table_shop_list').getCheckedTrs(); 
			$(document).data('blackShopId',checked[0].id);  
			$.jRadOpenTab({'name':'黑名单管理','url':'shopManage/blackList.html'});
		}
	});  

	$('#Table_shop_list').flexigrid({
		colModel: page_column_model,
		buttons: page_list_buttons,
		searchitems: page_search_items,
		queryParam: {'status':'3'}, 
		url:'/shopmanage-ws/ws/0.1/shopmanage/shop/page', 
		method:'post', 
		showSearch:true,
		onError:showShopError,
	    pagination: {
			diaplay_pages: 5,
			align: 'bottom' 
		},
		overflow:true,
		clear_callback:clear_callback
    }); 

    $('.searchContent div.row-fluid:eq(7)',wraper).append($('div.searchButtons',wraper));
    $('.searchContent div.row-fluid:eq(8) span.span7',wraper).remove();
	var pTable = $(".jrad-table .searchContent",wraper); 
	var addRow = $("<div>").addClass("row-fluid addRow");
	pTable.append(addRow);
	var _span3=$('div.searchButtons',wraper);
	var _span20=$('<div>').addClass('span20').append(_span3);
    var _div=$('<div>').addClass('row-fluid').append(_span20);
    $('div.searchContent',wraper).append(_div);
	function clear_callback(p){
		$(".jrad-table .searchContent",wraper).find("div[name='status']").select('val','3');
	}
	$("div[name='saleoffstart']").find("input").attr('placeholder','0');
	$("div[name='saleoffend']").find("input").attr('placeholder','10');

	//返回按钮
	$(".details-tab .return",wraper).click(function(){
			$('.details-box',wraper).slideUp();
			$('.details-box2',wraper).slideUp();
			$('#Wraper_price_list').hide();
			$('.details-box',wraper).prev('.ui-tit').hide()
			$('.jrad-table',wraper).slideDown();
			 clearShopInfo(wraper,gmap,bmap);
			$(".scroll-up-btn").click(); 
			$(".showTab:first").click();
			$('#Table_shop_list').flexReloadCurrentPage(); 	
			$('#txtCity').val("");
	}); 
	
	$(".shopLink",wraper).live('click',function(){
		var id = $(this).attr("shopid");
		updateShopView(id,wraper,gmap,bmap);
	}); 
	if($(document).data("checkShopId")!=undefined&&$(document).data("checkShopId")!=""){
		var checkShopId = $(document).data("checkShopId");
		$(document).data("checkShopId","");
		updateShopView(checkShopId,wraper,gmap,bmap);
	}
	
});
	
function getServiceInfo2(type,typeName,id){ 
	var serviceTable=$('#Table_settle_'+typeName);

    var page_column_model = new Array();
    var page_list_buttons = new Array();
	var entityModel = {};
    var jRad = $.jRad({app:'radsample-ws',entityModel:entityModel});  

	jRad.validators['useRule'] = [{msg:"使用规则不能为空",type:'min',value:'1'}];  
	jRad.validators['sequence'] = [{msg:"排序号不能为空",type:'min',value:'1'}];
	jRad.validators['illustrate'] = [{msg:"服务说明不能为空",type:'min',value:'1'}];
	var fields_params = {};  
	fields_params['isCompensate'] = {
		data: [{id:'0',name:'否'},{id:'1',name:'是'}]
	};  
	fields_params['isSubsidy'] = {
		data: [{id:'0',name:'否'},{id:'1',name:'是'}]
	};
	fields_params['useRule'] = {
		grid:10
	};

	fields_params['serviceExplain'] = {
 			theme:"Full",
 			resizing: false, 
 			grid: 18, 
 			height: 200 ,
			uploadImg: { //上传图片参数
			url: '/shopmanage-ws/ws/0.1/file/uploadThree',
			filename: 'file', 
			delFunc: function(item) { 
				item.list.remove(); 
			}, 
			validator : [{
				msg : "只能上传jpg文件",
				type : "regex",
				value : /^.*\.(jpg|JPG)$/
			}], 
			success: function(data){ 
				   if(data[0]&&data[0].code=="400"){
					 $.jRadMessage({level:'error',message:data[0].message});
				   } 
				},
			note: '仅支持 JPG图片文件。',
			show:true,
			showLarge:true, 
			prev:'fileUrl', 
			params: {type:""}, 
			single: true 
		},
		CKOpt:{
			fullPage:true,//是否使用完整的html编辑模式
			basicEntities:false, //Whether to escape basic HTML entities in the document, including:  nbsp gt lt amp 
			startupMode:'source' //载入时，以何种方式编辑 源码和所见即所得 "source"和"wysiwyg"
		} 
	}; 

	//var isCbus = $.jRadGet({url:'/vip-ws/ws/0.1/business/checkIsChainBusiness?businessInfoId='+id}) //是否连锁体系

	var getNameList = [];
    var _result = $.jRadGet({url: '/shopmanage-ws/ws/0.1/busiStandardService/getServiceList?serviceType='+type});
    $.each(_result,function(index, vo){
      var __id = vo['serviceId'];
      var __name = vo['serviceName'];
      var __tm = {'id': __id,'name': __name};
      getNameList.push(__tm);
    });
    var reserveInfoSelect = $.jRadGetDataSources('/shopmanage-ws/ws/0.1/datadictionary/dictionarylist?type=reserve_info','id','name'); 
	fields_params['reserveInfo'] = {
		grid:10,
		data:reserveInfoSelect
	};

    fields_params['serviceId'] = {
        data:getNameList,
  	    onclick:function(){
		  	$('#Form_standard_service .jrad-btn-primary').button({
				click: function(){
					var flag = $('#Form_standard_service').form('validateAll');
					if(flag){
						var json = $('#Form_standard_service').form('getValue');  
						var attrOption =[];
						var desc = [];

						$('#process tbody tr').each(function(i){ 
							desc.push($("#process tbody tr").eq(i).find("td a").attr("val"));
						})

						$.each(step.optionList, function(k){
							var parm = step.optionList[k]
							$.each(parm,function(j){
								if(parm[j].serviceExplain){
									parm[j].serviceExplain = desc[k];
								}
							})
						})

						$('#process tbody tr').each(function(i){ 
							var att ={};
							att.shopPrice = $("#process tbody tr").eq(i).find("td input[name='shopPrice']").val();
							att.reservePrice = $("#process tbody tr").eq(i).find("td input[name='reservePrice']").val();
							att.clearingPrice = $("#process tbody tr").eq(i).find("td input[name='clearingPrice']").val();
							//if(isCbus.isChainBusiness == 1){
							att.workPrice = 0;
							att.workHour = 1;
							// att.workPrice = $("#process tbody tr").eq(i).find("td input[name='workPrice']").val();
							// att.workHour = $("#process tbody tr").eq(i).find("td input[name='workHour']").val();
								//att.isChainBusiness = 1
							// }else{
							// 	att.isChainBusiness = 0
							// }
							att.serviceExplain = $("#process tbody tr").eq(i).find("td a").attr("val");
							att.attrOptionIdList = step.optionList[i];
							attrOption.push(att)
						})

						json.attrOption = attrOption;
						json.serviceType = type;
						json.businessInfoId = id;
						json.operator = carsmart_config.operatorName;
						$.jRadPost({
							url: '/shopmanage-ws/ws/0.1/busiStandardService/addBusiService',
							data:json,
							success:function(data){ 
								// var msg = $(".details-box .details-tab").find("span[name='title']").html()+"成功！";
								// $.jRadMessage({ level:'success',message:msg}); 
								$('#Form_standard_service').form({}).form('close');

								serviceTable.flexMessage(data.msg, 'success');
								serviceTable.flexReload();  
							},error:function(data){
								var mes = eval('('+data.responseText+')');
								 $.jRadMessage({level:'error', message:mes[0].message });
							}
						});
					 
					}	 
				}
			});

		  	$('#Form_standard_service .jrad-btn-normal').button({
				click: function(){ 
					$('#Form_standard_service').form('close');  
				}   
			});

  	    	var urlstr = '/shopmanage-ws/ws/0.1/busiStandardService/getAttrOptionInfo'
			var fristId = $("div[name='serviceId']").select('val');
            var flag = (fristId!=undefined&&fristId!="");
		    if(flag){ 
		 	    urlstr = '/shopmanage-ws/ws/0.1/busiStandardService/getAttrOptionInfo?serviceId='+fristId;
		    }
		 	var Data = $.jRadGet({url : urlstr});
		    var _moudle = $(".app");
		    _moudle.html("");
		    $(".note2").html("")
			$.each(Data,function(j){
		 		var info = Data[j]; 
		 		var _row = $("<div style='overflow:hidden'>").addClass('div_contentlist');
		 		var _ul = $("<ul class='Father_Title'>")
				var _li = $("<li style='float:left;width:150px;text-align:right;'>").attr("data",info.attrId).html(info.attrName +'：');
				var _div = $("<div class='divlist' style='float:left;margin-left:10px;width:388px;'>");
				var _ul2 = $("<ul>").addClass("Father_Item" + j);
				var opt2 = [];
				var value2 = [];
				var _li2 = $("<li>");
				$.each(info.option,function(i){
					var param = info.option[i];
                	var vk2 = {};
                	vk2.id = param.optionId;
                	vk2.name = param.optionName; 
                	opt2.push(vk2); 
                	value2.push(param.optionName); 
          			var _label2 = $("<label style='margin-right:15px;float:left;'>");
		            var _input = $("<input type='checkbox' style='float:left;margin:2px 3px 0 0;'>").addClass("chcBox_Width").attr({value:param.optionName,alt:param.optionId,explain:param.serviceExplain})
		            var _span = $("<span>").addClass("li_empty").attr("contentEditable","true")
				    _li2.append(_label2.append(_input).append(param.optionName).append(_span))
				}); 

				if(info.option.length != 0){ 
					_ul2.append(_li2);
	        		_row.append(_ul.append(_li)).append(_div.append(_ul2));
	        		_moudle.append(_row);
                }
		 	});

		 	if(_moudle.html() != ""){
		 		_moudle.append('<p class="note">您需要选择所有的扩展属性,才能组合成完整的服务信息。</p>')
		 	}
		 	if($("#createTable").html() == ""){
		 		$("#createTable").append('<p class="note">若一个服务已创建，再次创建此服务，不会改变服务价格。</p>')
		 	}
			
			$('#process').html("");

		    var step = {
		        optionList:[],
		        Creat_Table: function () {
		        	var _step = this;
		            step.hebingFunction();
		            var SKUObj = $(".Father_Title");
		            var arrayTile = new Array();
		            var arrayInfor = new Array();
		            var arrayColumn = new Array();
		            var attrOptionIdList = new Array();
		            var bCheck = true;//是否全选
		            var columnIndex = 0;
		            $.each(SKUObj, function (i, item){
		                arrayColumn.push(columnIndex);
		                columnIndex++;
		                arrayTile.push(SKUObj.find("li").eq(i).html().replace("：", ""));
		                var itemName = "Father_Item" + i;
		                
		                var order = new Array();
		                $("." + itemName + " input[type=checkbox]:checked").each(function (){
		                    order.push($(this).val());
		                });
		                arrayInfor.push(order);

		                var data = []
		                $("." + itemName + " input[type=checkbox]:checked").each(function (){
		                	var json ={};
		                	json.attrId = $(this).parent().parent().parent().parent().prev().children().attr("data");
		                	json.optionId = $(this).attr("alt");
		                	json.serviceExplain = $(this).attr("explain");
		                	var jsonstring = JSON.stringify(json)
		                	data.push(jsonstring)
		                });

						data.sort(getSortFun('desc', 'optionId'));
						function getSortFun(order, sortBy) {
						    var ordAlpah = (order == 'asc') ? '>' : '<';
						    var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
						    return sortFun;
						}

		                attrOptionIdList.push(data)

		                if (order.join() == ""){
		                    bCheck = false;
		                } 
		            });

		            //开始创建Table表
		            if (bCheck == true) {
		                var RowsCount = 0;
		                $("#createTable").html("");
		                var table = $("<table id=\"process\" border=\"1\" cellpadding=\"1\" cellspacing=\"0\" style=\"width:80%;padding:5px;\"></table>");
		                table.appendTo($("#createTable"));
		                var thead = $("<thead></thead>");
		                thead.appendTo(table);
		                var trHead = $("<tr></tr>");
		                trHead.appendTo(thead);
		                //创建表头
		                $.each(arrayTile, function (index, item) {
		                    var td = $("<th>" + item + "</th>");
		                    td.appendTo(trHead);
		                });
		                
		                //if(isCbus.isChainBusiness == 1){
		                	// var itemColumHead = $("<th  style=\"width:70px;\">门市价</th><th style=\"width:70px;\">预定价</th><th style=\"width:70px;\">结算价</th><th style=\"width:70px;\">工时费</th><th style=\"width:70px;\">所需工时</th><th style=\"width:50px;\">服务说明</th>");
		                	// itemColumHead.appendTo(trHead);
					    // }else{
		                	var itemColumHead = $("<th  style=\"width:70px;\">门市价</th><th style=\"width:70px;\">预定价</th><th style=\"width:70px;\">结算价</th><th style=\"width:50px;\">服务说明</th>");
		                	itemColumHead.appendTo(trHead);
					    // }

		                var tbody = $("<tbody></tbody>");
		                tbody.appendTo(table);
		                ////生成组合
		                var zuheDate = step.doExchange(arrayInfor);
		                var zuheDate2 = step.doExchange(attrOptionIdList);
		                var attr = [];
		                $.each(zuheDate2,function(i){
		                	attr.push($.parseJSON("[" + zuheDate2[i] + "]"));
		                })
		                
						var zuiArr = [];
						$.each(attr,function(v){
		                	var minArr = attr[v]
		                	$.each(minArr,function(z){
		                		if(minArr[z].serviceExplain){
		                			zuiArr.push(minArr[z].serviceExplain);
		                		}
		                	})
		                })

		                _step.optionList = attr;

		                if (zuheDate.length > 0) {
		                    //创建行
		                    $.each(zuheDate, function (index, item) {

		                        var td_array = item.split(",");
		                        var tr = $("<tr></tr>");
		                        tr.appendTo(tbody);
		                        $.each(td_array, function (i, values) {
		                            var td = $("<td>" + values + "</td>");
		                            td.appendTo(tr);
		                        });
		                        var td1 = $("<td ><input name=\"shopPrice\" class=\"l-text\" type=\"text\" value=\"\"></td>");
		                        td1.appendTo(tr);
		                        var td2 = $("<td ><input name=\"reservePrice\" class=\"l-text\" type=\"text\" value=\"\"></td>");
		                        td2.appendTo(tr);
		                        var td3 = $("<td ><input name=\"clearingPrice\" class=\"l-text\" type=\"text\" value=\"\"></td>");
		                        td3.appendTo(tr);
		                        //if(isCbus.isChainBusiness == 1){
	                        	// var td4 = $("<td ><input name=\"workPrice\" class=\"l-text\" type=\"text\" value=\"\"></td>");
	                        	// td4.appendTo(tr);
	                        	// var td5 = $("<td ><input name=\"workHour\" class=\"l-text\" type=\"text\" value=\"\"></td>");
	                        	// td5.appendTo(tr);
		                        //}
			                    var td6 = $("<td align=\"center\"><a href=\"javascript:void(0);\" class=\"l-text\">编辑</a></td>");
			                    td6.appendTo(tr);
		                    });

		                    $('#process td a').each(function(i){
			                    	$(this).attr("val",zuiArr[i])	
			                })
		                }
		                //结束创建Table表
		                arrayColumn.pop();//删除数组中最后一项
		                //合并单元格
		                $(table).mergeCell({
		                    // 目前只有cols这么一个配置项, 用数组表示列的索引,从0开始
		                    cols: arrayColumn
		                });
		            } else{
		                //未全选中,清除表格
		                document.getElementById('createTable').innerHTML="";
		            }
		        },//合并行
		        hebingFunction: function () {
		            $.fn.mergeCell = function (options) {
		                return this.each(function () {
		                    var cols = options.cols;
		                    for (var i = cols.length - 1; cols[i] != undefined; i--) {
		                        // fixbug console调试
		                        // console.debug(cols[i]);
		                        mergeCell($(this), cols[i]);
		                    }
		                    dispose($(this));
		                });
		            };
		            function mergeCell($table, colIndex) {
		                $table.data('col-content', ''); // 存放单元格内容
		                $table.data('col-rowspan', 1); // 存放计算的rowspan值 默认为1
		                $table.data('col-td', $()); // 存放发现的第一个与前一行比较结果不同td(jQuery封装过的), 默认一个"空"的jquery对象
		                $table.data('trNum', $('tbody tr', $table).length); // 要处理表格的总行数, 用于最后一行做特殊处理时进行判断之用
		                // 进行"扫面"处理 关键是定位col-td, 和其对应的rowspan
		                $('tbody tr', $table).each(function (index) {
		                    // td:eq中的colIndex即列索引
		                    var $td = $('td:eq(' + colIndex + ')', this);
		                    // 取出单元格的当前内容
		                    var currentContent = $td.html();
		                    // 第一次时走此分支
		                    if ($table.data('col-content') == '') {
		                        $table.data('col-content', currentContent);
		                        $table.data('col-td', $td);
		                    } else {
		                        // 上一行与当前行内容相同
		                        if ($table.data('col-content') == currentContent) {
		                            // 上一行与当前行内容相同则col-rowspan累加, 保存新值
		                            var rowspan = $table.data('col-rowspan') + 1;
		                            $table.data('col-rowspan', rowspan);
		                            // 值得注意的是 如果用了$td.remove()就会对其他列的处理造成影响
		                            $td.hide();
		                            // 最后一行的情况比较特殊一点
		                            // 比如最后2行 td中的内容是一样的, 那么到最后一行就应该把此时的col-td里保存的td设置rowspan
		                            if (++index == $table.data('trNum'))
		                                $table.data('col-td').attr('rowspan', $table.data('col-rowspan'));
		                        } else { // 上一行与当前行内容不同
		                            // col-rowspan默认为1, 如果统计出的col-rowspan没有变化, 不处理
		                            if ($table.data('col-rowspan') != 1) {
		                                $table.data('col-td').attr('rowspan', $table.data('col-rowspan'));
		                            }
		                            // 保存第一次出现不同内容的td, 和其内容, 重置col-rowspan
		                            $table.data('col-td', $td);
		                            $table.data('col-content', $td.html());
		                            $table.data('col-rowspan', 1);
		                        }
		                    }
		                });
		            }
		            // 同样是个private函数 清理内存之用
		            function dispose($table) {
		                $table.removeData();
		            }
		        },
		        //组合数组
		        doExchange: function (doubleArrays) {
		            var len = doubleArrays.length;
		            if (len >= 2) {
		                var arr1 = doubleArrays[0];
		                var arr2 = doubleArrays[1];
		                var len1 = doubleArrays[0].length;
		                var len2 = doubleArrays[1].length;
		                var newlen = len1 * len2;
		                var temp = new Array(newlen);
		                var index = 0;
		                for (var i = 0; i < len1; i++) {
		                    for (var j = 0; j < len2; j++) {
		                        temp[index] = arr1[i] + "," + arr2[j];
		                        index++;
		                    }
		                }
		                var newArray = new Array(len - 1);
		                newArray[0] = temp;
		                if (len > 2) {
		                    var _count = 1;
		                    for (var i = 2; i < len; i++) {
		                        newArray[_count] = doubleArrays[i];
		                        _count++;
		                    }
		                }
		                //console.log(newArray);
		                return step.doExchange(newArray);
		            }
		            else {
		                return doubleArrays[0];
		            }
		        }
		    }
		    //return step;

		    $(".divlist label").bind("change", function () { 
		        step.Creat_Table(); 
		        if($('#createTable').html() != ""){
		    		$('.app .note').hide();
		    		$("#createTable").append('<p class="note2">若一个服务已创建，再次创建此服务，不会改变服务价格。</p>')
		    		$('.note2').show();
		    	}else{
		    		$('.app .note').show();
		    		$('.note2').hide();
		    	}

		    	$('#process td a').click(function(){
		    		var _that = $(this)
			    	var html = _that.attr('val');
			    	var serviceExplain;
			    	$('#Form_service_desc').form({
			    		title:'服务说明',
			    		grid: 18,
			    		height:'400px',
						autobinding: false,
			    		fields_params:fields_params,
			    		item:{"serviceExplain":html}
			    	}).form('open');
			    	
			    	$('#Form_service_desc .jrad-btn-primary').button({
						click: function(){
							var json = $('#Form_service_desc').form('getValue'); 
							_that.attr("val",json.serviceExplain)
							$('#Form_service_desc').form().form("close");
						}
					});

				    $('#Form_service_desc .jrad-btn-normal').button({
						click: function(){
							$('#Form_service_desc').form().form("close");
							$(".scroll-up-btn").click();
						}
					}); 

			    })

		    });
  	    } 
    }

	page_column_model.push({display: '绑定ID', name : 'id'});
    page_column_model.push({display: '服务详细名称', name : 'serviceName'});
    page_column_model.push({display: '门市价', name : 'shopPrice'}); 
    page_column_model.push({display: '预定价', name : 'reservePrice'});
    page_column_model.push({display: '结算价', name : 'clearingPrice'});
    //if(isCbus.isChainBusiness == 1){
    // page_column_model.push({display: '工时费', name : 'workPrice'});
    // page_column_model.push({display: '所需工时', name : 'workHour'});
    //}
    // else{
	   //  page_column_model.push({display: '工时费', name : 'workPrice',hidden:true});
	   //  page_column_model.push({display: '所需工时', name : 'workHour',hidden:true});
    // }
    page_column_model.push({display: '是否补贴', name : 'isShopSubsidy'});
    page_column_model.push({display: '是否先行赔付', name : 'isCompensate'});   
    page_column_model.push({display: '排列序号', name : 'sequence'}); 
    // page_column_model.push({display: '最后操作时间', name : 'updateDate'});
    // page_column_model.push({display: '最后操作人', name : 'operator'});
	 
	page_list_buttons.push({displayname:'创建',name:'add',bclass: 'add',  //标准化服务
		onpress : function(){
			$('#Form_standard_service').form({
                title: '标准化服务', 
				fields_params: fields_params,
				validators:jRad.validators,
				grid:20,
				item:{},
                url: '/shopmanage-ws/ws/0.1/busiStandardService/addBusiService',
				before_submit:function(json){
					json.serviceType = type;
					json.businessInfoId = id;
					json.operator = carsmart_config.operatorName;
					var attrOption =[];

					$('#process tbody tr').each(function(i){ 
						var att ={};
						att.shopPrice = $("#process tbody tr").eq(i).find("td input[name='shopPrice']").val();
						att.reservePrice = $("#process tbody tr").eq(i).find("td input[name='reservePrice']").val();
						att.clearingPrice = $("#process tbody tr").eq(i).find("td input[name='clearingPrice']").val();
						//if(isCbus.isChainBusiness == 1){
						att.workPrice = 0;
						att.workHour = 1;
						// att.workPrice = $("#process tbody tr").eq(i).find("td input[name='workPrice']").val();
						// att.workHour = $("#process tbody tr").eq(i).find("td input[name='workHour']").val();
							//att.isChainBusiness = 1
						// }else{
						// 	att.isChainBusiness = 0
						// }
						att.serviceExplain = $("#process tbody tr").eq(i).find("td a").attr("val");
						att.attrOptionIdList = step.optionList[i];
						attrOption.push(att)
					})
					
					json.attrOption = attrOption;
					return json;
				},
				success_callback:function(){ 
					serviceTable.flexMessage('创建成功', 'success');
					serviceTable.flexReload();

		 			$('#Wraper_shop_list .message-tips').fadeOut(3000); 
				}
            }).form('open');

			$('#Form_standard_service div[name="serviceId"]').select("readonly",false);
			$('#Form_standard_service .app').show();
			var urlstr = '/shopmanage-ws/ws/0.1/busiStandardService/getAttrOptionInfo';
			var fristId = $("div[name='serviceId']").select('val');
            var flag = (fristId!=undefined&&fristId!="");
		    if(flag){ 
		 	    urlstr = '/shopmanage-ws/ws/0.1/busiStandardService/getAttrOptionInfo?serviceId='+fristId;
		    }
		 	var Data = $.jRadGet({url : urlstr});
		    var _moudle = $(".app");
		    _moudle.html("");
		    $(".note2").html("")
			$.each(Data,function(j){
		 		var info = Data[j]; 
		 		var _row = $("<div style='overflow:hidden'>").addClass('div_contentlist');
		 		var _ul = $("<ul class='Father_Title'>")
				var _li = $("<li style='float:left;width:150px;text-align:right;'>").attr("data",info.attrId).html(info.attrName +'：');
				var _div = $("<div class='divlist' style='float:left;margin-left:10px;width:388px;'>");
				var _ul2 = $("<ul>").addClass("Father_Item" + j);
				var opt2 = [];
				var value2 = [];
				var _li2 = $("<li>");
				$.each(info.option,function(i){
					var param = info.option[i];
                	var vk2 = {};
                	vk2.id = param.optionId;
                	vk2.name = param.optionName; 
                	opt2.push(vk2); 
                	value2.push(param.optionName); 
          			var _label2 = $("<label style='margin-right:15px;float:left;'>");
		            var _input = $("<input type='checkbox' style='float:left;margin:2px 3px 0 0;'>").addClass("chcBox_Width").attr({value:param.optionName,alt:param.optionId,explain:param.serviceExplain})
		            var _span = $("<span>").addClass("li_empty").attr("contentEditable","true")
				    _li2.append(_label2.append(_input).append(param.optionName).append(_span))
				}); 

				if(info.option.length != 0){ 
					_ul2.append(_li2);
	        		_row.append(_ul.append(_li)).append(_div.append(_ul2));
	        		_moudle.append(_row);
                }
		 	});

		 	if(_moudle.html() != ""){
		 		_moudle.append('<p class="note">您需要选择所有的扩展属性,才能组合成完整的服务信息。</p>')
		 	}
			
			$('#process').html("");

		    $(".divlist label").bind("change", function () { 
		        step.Creat_Table(); 
		        if($('#createTable').html() != ""){
		    		$('.app .note').hide();
		    		$("#createTable").append('<p class="note2">若一个服务已创建，再次创建此服务，不会改变服务价格。</p>')
		    		$('.note2').show();
		    	}else{
		    		$('.app .note').show();
		    		$('.note2').hide();
		    	}

		    	$('#process td a').click(function(){
		    		var _that = $(this)
			    	var html = _that.attr('val');
			    	var serviceExplain;
			    	$('#Form_service_desc').form({
			    		title:'服务说明',
			    		grid: 18,
			    		height:'400px',
						autobinding: false,
			    		fields_params:fields_params,
			    		item:{"serviceExplain":html}
			    	}).form('open');
			    	
			    	$('#Form_service_desc .jrad-btn-primary').button({
						click: function(){
							var json = $('#Form_service_desc').form('getValue'); 
							_that.attr("val",json.serviceExplain)
							$('#Form_service_desc').form().form("close");
						}
					});

				    $('#Form_service_desc .jrad-btn-normal').button({
						click: function(){
							$('#Form_service_desc').form().form("close");
							$(".scroll-up-btn").click();
						}
					}); 

			    })

		    });

		    var step = {
		        optionList:[],
		        Creat_Table: function () {
		        	var _step = this;
		            step.hebingFunction();
		            var SKUObj = $(".Father_Title");
		            var arrayTile = new Array();
		            var arrayInfor = new Array();
		            var arrayColumn = new Array();
		            var attrOptionIdList = new Array();
		            var attrOptionIdList2 = new Array();
		            var bCheck = true;//是否全选
		            var columnIndex = 0;
		            $.each(SKUObj, function (i, item){
		                arrayColumn.push(columnIndex);
		                columnIndex++;
		                arrayTile.push(SKUObj.find("li").eq(i).html().replace("：", ""));
		                var itemName = "Father_Item" + i;
		                
		                var order = new Array();
		                $("." + itemName + " input[type=checkbox]:checked").each(function (){
		                    order.push($(this).val());
		                });
		                arrayInfor.push(order);

		                var data = []
		                $("." + itemName + " input[type=checkbox]:checked").each(function (){
		                	var json ={};
		                	json.attrId = $(this).parent().parent().parent().parent().prev().children().attr("data");
		                	json.optionId = $(this).attr("alt");
		                	var jsonstring = JSON.stringify(json)
		                	data.push(jsonstring)
		                });

		                var data2 = []
		                $("." + itemName + " input[type=checkbox]:checked").each(function (){
		                	var json ={};
		                	json.attrId = $(this).parent().parent().parent().parent().prev().children().attr("data");
		                	json.optionId = $(this).attr("alt");
		                	json.serviceExplain = $(this).attr("explain");
		                	var jsonstring = JSON.stringify(json)
		                	data2.push(jsonstring)
		                });

						data.sort(getSortFun('desc', 'optionId'));
						function getSortFun(order, sortBy) {
						    var ordAlpah = (order == 'asc') ? '>' : '<';
						    var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
						    return sortFun;
						}

		                attrOptionIdList.push(data)
		                attrOptionIdList2.push(data2)

		                if (order.join() == ""){
		                    bCheck = false;
		                } 
		            });

		            //开始创建Table表
		            if (bCheck == true) {
		                var RowsCount = 0;
		                $("#createTable").html("");
		                var table = $("<table id=\"process\" border=\"1\" cellpadding=\"1\" cellspacing=\"0\" style=\"width:80%;padding:5px;\"></table>");
		                table.appendTo($("#createTable"));
		                var thead = $("<thead></thead>");
		                thead.appendTo(table);
		                var trHead = $("<tr></tr>");
		                trHead.appendTo(thead);
		                //创建表头
		                $.each(arrayTile, function (index, item) {
		                    var td = $("<th>" + item + "</th>");
		                    td.appendTo(trHead);
		                });

		                //if(isCbus.isChainBusiness == 1){
	                	// var itemColumHead = $("<th  style=\"width:70px;\">门市价</th><th style=\"width:70px;\">预定价</th><th style=\"width:70px;\">结算价</th><th style=\"width:70px;\">工时费</th><th style=\"width:70px;\">所需工时</th><th style=\"width:50px;\">服务说明</th>");
	                	// itemColumHead.appendTo(trHead);
					    //}
					    // else{
		                	var itemColumHead = $("<th  style=\"width:70px;\">门市价</th><th style=\"width:70px;\">预定价</th><th style=\"width:70px;\">结算价</th><th style=\"width:50px;\">服务说明</th>");
		                	itemColumHead.appendTo(trHead);
					    // }

		                var tbody = $("<tbody></tbody>");
		                tbody.appendTo(table);
		                ////生成组合
		                var zuheDate = step.doExchange(arrayInfor);
		                var zuheDate2 = step.doExchange(attrOptionIdList);
		                var zuheDate3 = step.doExchange(attrOptionIdList2);

		                var attr = [];
		                $.each(zuheDate2,function(i){
		                	attr.push($.parseJSON("[" + zuheDate2[i] + "]"));
		                })

		                var attr2 = [];
		                $.each(zuheDate3,function(i){
		                	attr2.push($.parseJSON("[" + zuheDate3[i] + "]"));
		                })
		                
						var zuiArr = [];
						$.each(attr2,function(v){
		                	var minArr = attr2[v]
		                	$.each(minArr,function(z){
		                		if(minArr[z].serviceExplain){
		                			zuiArr.push(minArr[z].serviceExplain);
		                		}
		                	})
		                })
						console.log(zuiArr)
		                _step.optionList = attr;

		                if (zuheDate.length > 0) {
		                    //创建行
		                    $.each(zuheDate, function (index, item) {

		                        var td_array = item.split(",");
		                        var tr = $("<tr></tr>");
		                        tr.appendTo(tbody);
		                        $.each(td_array, function (i, values) {
		                            var td = $("<td>" + values + "</td>");
		                            td.appendTo(tr);
		                        });
		                        var td1 = $("<td ><input name=\"shopPrice\" class=\"l-text\" type=\"text\" value=\"\"></td>");
		                        td1.appendTo(tr);
		                        var td2 = $("<td ><input name=\"reservePrice\" class=\"l-text\" type=\"text\" value=\"\"></td>");
		                        td2.appendTo(tr);
		                        var td3 = $("<td ><input name=\"clearingPrice\" class=\"l-text\" type=\"text\" value=\"\"></td>");
		                        td3.appendTo(tr);
		                        //if(isCbus.isChainBusiness == 1){
	                        	// var td4 = $("<td ><input name=\"workPrice\" class=\"l-text\" type=\"text\" value=\"\"></td>");
	                        	// td4.appendTo(tr);
	                        	// var td5 = $("<td ><input name=\"workHour\" class=\"l-text\" type=\"text\" value=\"\"></td>");
	                        	// td5.appendTo(tr);
		                        //}
			                    var td6 = $("<td align=\"center\"><a href=\"javascript:void(0);\" class=\"l-text\">编辑</a></td>");
			                    td6.appendTo(tr);
		                    });

		                    $('#process td a').each(function(i){
			                    $(this).attr("val",zuiArr[i])	
			                })
		                }
		                //结束创建Table表
		                arrayColumn.pop();//删除数组中最后一项
		                //合并单元格
		                $(table).mergeCell({
		                    // 目前只有cols这么一个配置项, 用数组表示列的索引,从0开始
		                    cols: arrayColumn
		                });
		            } else{
		                //未全选中,清除表格
		                document.getElementById('createTable').innerHTML="";
		            }
		        },//合并行
		        hebingFunction: function () {
		            $.fn.mergeCell = function (options) {
		                return this.each(function () {
		                    var cols = options.cols;
		                    for (var i = cols.length - 1; cols[i] != undefined; i--) {
		                        // fixbug console调试
		                        // console.debug(cols[i]);
		                        mergeCell($(this), cols[i]);
		                    }
		                    dispose($(this));
		                });
		            };
		            function mergeCell($table, colIndex) {
		                $table.data('col-content', ''); // 存放单元格内容
		                $table.data('col-rowspan', 1); // 存放计算的rowspan值 默认为1
		                $table.data('col-td', $()); // 存放发现的第一个与前一行比较结果不同td(jQuery封装过的), 默认一个"空"的jquery对象
		                $table.data('trNum', $('tbody tr', $table).length); // 要处理表格的总行数, 用于最后一行做特殊处理时进行判断之用
		                // 进行"扫面"处理 关键是定位col-td, 和其对应的rowspan
		                $('tbody tr', $table).each(function (index) {
		                    // td:eq中的colIndex即列索引
		                    var $td = $('td:eq(' + colIndex + ')', this);
		                    // 取出单元格的当前内容
		                    var currentContent = $td.html();
		                    // 第一次时走此分支
		                    if ($table.data('col-content') == '') {
		                        $table.data('col-content', currentContent);
		                        $table.data('col-td', $td);
		                    } else {
		                        // 上一行与当前行内容相同
		                        if ($table.data('col-content') == currentContent) {
		                            // 上一行与当前行内容相同则col-rowspan累加, 保存新值
		                            var rowspan = $table.data('col-rowspan') + 1;
		                            $table.data('col-rowspan', rowspan);
		                            // 值得注意的是 如果用了$td.remove()就会对其他列的处理造成影响
		                            $td.hide();
		                            // 最后一行的情况比较特殊一点
		                            // 比如最后2行 td中的内容是一样的, 那么到最后一行就应该把此时的col-td里保存的td设置rowspan
		                            if (++index == $table.data('trNum'))
		                                $table.data('col-td').attr('rowspan', $table.data('col-rowspan'));
		                        } else { // 上一行与当前行内容不同
		                            // col-rowspan默认为1, 如果统计出的col-rowspan没有变化, 不处理
		                            if ($table.data('col-rowspan') != 1) {
		                                $table.data('col-td').attr('rowspan', $table.data('col-rowspan'));
		                            }
		                            // 保存第一次出现不同内容的td, 和其内容, 重置col-rowspan
		                            $table.data('col-td', $td);
		                            $table.data('col-content', $td.html());
		                            $table.data('col-rowspan', 1);
		                        }
		                    }
		                });
		            }
		            // 同样是个private函数 清理内存之用
		            function dispose($table) {
		                $table.removeData();
		            }
		        },
		        //组合数组
		        doExchange: function (doubleArrays) {
		            var len = doubleArrays.length;
		            if (len >= 2) {
		                var arr1 = doubleArrays[0];
		                var arr2 = doubleArrays[1];
		                var len1 = doubleArrays[0].length;
		                var len2 = doubleArrays[1].length;
		                var newlen = len1 * len2;
		                var temp = new Array(newlen);
		                var index = 0;
		                for (var i = 0; i < len1; i++) {
		                    for (var j = 0; j < len2; j++) {
		                        temp[index] = arr1[i] + "," + arr2[j];
		                        index++;
		                    }
		                }
		                var newArray = new Array(len - 1);
		                newArray[0] = temp;
		                if (len > 2) {
		                    var _count = 1;
		                    for (var i = 2; i < len; i++) {
		                        newArray[_count] = doubleArrays[i];
		                        _count++;
		                    }
		                }
		                //console.log(newArray);
		                return step.doExchange(newArray);
		            }
		            else {
		                return doubleArrays[0];
		            }
		        }
		    }
		    //return step;
		    
        }
    }); 

	page_list_buttons.push({displayname: '修改',name:'Edit', bclass: 'edit',		
		prefunc:function(){
            var checked = serviceTable.getCheckedTrs();
            if (checked.length != 1) {return false;}else{return true;}
        },
        onpress : function(){
            var checked = serviceTable.getCheckedTrs();
            if(checked[0]){
	            var _item = $.jRadGet({url : '/shopmanage-ws/ws/0.1/busiStandardService/getServiceInfo?bindId='+checked[0].id});
				$('#Form_standard_service').form({
					title: '修改',
					fields_params: fields_params,
					validators:jRad.validators,
					item:_item,
					url:'/shopmanage-ws/ws/0.1/busiStandardService/updateBusiService',
					before_submit:function(json){
						json.bindId =  checked[0].id
						json.shopPrice =  $('#Form_standard_service input[name="shopPrice"]').val();
						json.reservePrice =  $('#Form_standard_service input[name="reservePrice"]').val();
						json.clearingPrice =  $('#Form_standard_service input[name="clearingPrice"]').val();
						//if(isCbus.isChainBusiness == 1){
						json.workPrice =  0;
						json.workHour =  1;
						// json.workPrice =  $('#Form_standard_service input[name="workPrice"]').val();
						// json.workHour =  $('#Form_standard_service input[name="workHour"]').val();
							//json.isChainBusiness = 1
			            //}
			            //else{
								//json.isChainBusiness = 0
						//}
						json.serviceExplain =  $('#process td a').attr("val");

						json.operator = carsmart_config.operatorName;
						return json;
					},
					success_callback: function(){ 
						serviceTable.flexMessage('修改成功!', 'success');
						serviceTable.flexReload();
					}
				}).form('open'); 
 			}
			$('#Form_standard_service div[name="serviceId"]').select("readonly",true);
			$('#Form_standard_service .app').hide();
			$("#createTable").html("");

            var table = $("<table id=\"process\" border=\"1\" cellpadding=\"1\" cellspacing=\"0\" style=\"width:80%;padding:5px;\"></table>");
            table.appendTo($("#createTable"));
            var thead = $("<thead></thead>");
            var tbody = $("<tbody></tbody>");
            thead.appendTo(table);
            tbody.appendTo(table);
            var trHead = $("<tr></tr>");
			var trbody = $("<tr></tr>");
            trHead.appendTo(thead);
            trbody.appendTo(tbody);

            var arrpor = _item.attrOptionList;
            var headData =  [];
            $.each(arrpor, function(i){
            	headData.push(arrpor[i].attrName)
            })
            $.each(headData, function (index, item) {
                var td = $("<th>" + item + "</th>");
                td.appendTo(trHead);
            });
            var bodyData = [];
            $.each(arrpor, function(i){
            	bodyData.push(arrpor[i].optionName)
            })
            $.each(bodyData, function (index, item) {
                var td2 = $("<td>" + item + "</td>");
                td2.appendTo(trbody);
            });
			//if(isCbus.isChainBusiness == 1){
        	// var itemColumHead = $("<th  style=\"width:70px;\">门市价</th><th style=\"width:70px;\">预定价</th><th style=\"width:70px;\">结算价</th><th style=\"width:70px;\">工时费</th><th style=\"width:70px;\">所需工时</th><th style=\"width:50px;\">服务说明</th>");
        	// itemColumHead.appendTo(trHead);
            //}
            // else{
	            var itemColumHead = $("<th  style=\"width:70px;\">门市价</th><th style=\"width:70px;\">预定价</th><th style=\"width:70px;\">结算价</th><th style=\"width:50px;\">服务说明</th>");
	            itemColumHead.appendTo(trHead);
            // }
            var td1 = $("<td ><input name=\"shopPrice\" class=\"l-text\" type=\"text\" value=\"\"></td>");
            td1.appendTo(trbody);
            var td2 = $("<td ><input name=\"reservePrice\" class=\"l-text\" type=\"text\" value=\"\"></td>");
            td2.appendTo(trbody);
            var td3 = $("<td ><input name=\"clearingPrice\" class=\"l-text\" type=\"text\" value=\"\"></td>");
            td3.appendTo(trbody);
            //if(isCbus.isChainBusiness == 1){
        	// var td4 = $("<td ><input name=\"workPrice\" class=\"l-text\" type=\"text\" value=\"\"></td>");
        	// td4.appendTo(trbody);
        	// var td5 = $("<td ><input name=\"workHour\" class=\"l-text\" type=\"text\" value=\"\"></td>");
        	// td5.appendTo(trbody);
            //}
            var td6 = $("<td align=\"center\"><a href=\"javascript:void(0);\" class=\"l-text\">编辑</a></td>");
            td6.appendTo(trbody);
            $('input[name="shopPrice"]').val(_item.shopPrice);
            $('input[name="reservePrice"]').val(_item.reservePrice);
            $('input[name="clearingPrice"]').val(_item.clearingPrice);
            //if(isCbus.isChainBusiness == 1){
            // $('input[name="workPrice"]').val(_item.workPrice);
            // $('input[name="workHour"]').val(_item.workHour);
            //}
            $("#process td a").attr("val",_item.serviceExplain);

            $('#process td a').click(function(){
	    		var _that = $(this)
		    	var html = _that.attr('val');
		    	var serviceExplain;
		    	$('#Form_service_desc').form({
		    		title:'服务说明',
		    		grid: 18,
		    		height:'400px',
					autobinding: false,
		    		fields_params:fields_params,
		    		item:{"serviceExplain":html}
		    	}).form('open');
		    	
		    	$('#Form_service_desc .jrad-btn-primary').button({
					click: function(){
						var json = $('#Form_service_desc').form('getValue'); 
						_that.attr("val",json.serviceExplain)
						$('#Form_service_desc').form().form("close");
					}
				});

			    $('#Form_service_desc .jrad-btn-normal').button({
					click: function(){
						$('#Form_service_desc').form().form("close");
						$(".scroll-up-btn").click();
					}
				}); 
			})
        }
    }); 

	page_list_buttons.push({displayname: '删除',name:'delete',bclass: 'delete',
		prefunc:function(){
            var checked = serviceTable.getCheckedTrs();
            if (checked.length != 1){return false;}else{return true;}
        },
        onpress : function(){
	    	var checked = serviceTable.getCheckedTrs();
			$.jRadConfirm('确认删除吗？',1,function(){
				var postData = []; 
				$.each(checked,function(i){
				 	var postJson={};
				 	postJson.bindId=checked[i].id;
				 	postData.push(postJson)
				});
				$.jRadAjax({
				    type:'post',
					data:postData,
					url:'/shopmanage-ws/ws/0.1/busiStandardService/delService', 
					success: function(){
						serviceTable.flexMessage('删除成功!', 'success');
           	    		serviceTable.flexReloadSearch();
					},
					error:function(xhr){
					    var errormsg = eval("(" + xhr.responseText + ")"); 
						if (errormsg != undefined) {
							serviceTable.flexMessage(errormsg[0].message, 'error');
						}
					}
				});
			});
		}
	});

 	page_list_buttons.push({separator: true});

	serviceTable.flexigrid({
        reload:false,
		method:'get',
		autoload:true,
		url:'/shopmanage-ws/ws/0.1/busiStandardService/busiServicelist?serviceType='+type+'&businessInfoId='+id,
        colModel : page_column_model,
        buttons : page_list_buttons,
        pagination: {
			diaplay_pages: 5,
			align: 'bottom'
		},
		overflow:true,
		showSearch:true,
		checkBoxType: ''
		//onError:showError
    })
}

function showShopError(xhr){
	var errormsg = eval("(" + xhr.responseText + ")");
	var cDiv = $("#Wraper_shop_list .cDiv");
	$.jRadMessage({level:'error',message:errormsg[0].message,selector:cDiv});
}

function importShops(){
	var _form = $("#Form_shop_batch");
	var flag = _form.form('validateAll');
	if(!flag) {
	   return;
	} 
	$('div[name=file]',_form).upload('upload'); 
} 
//点新增广告位
function cloneAD(num,_parent,json){ 
	var str = '<div class="row ADLi ui-form" id="ADForm'+num+'"><div class="jrad-form">';
	if(json){
	    str+= '<input type="hidden" name="adId">'
	}
		str+= '<label class="span5 grid-layout-label"> 广告'+num+'：</label>'
			+'<div class="span14 grid-layout-content">'								
			+'<div class="row">'							
			+'<label class="span5 grid-layout-label">广告图：</label>'
			+'<div class="span8 grid-layout-content"><div name="adPicFile" class="jrad-uploadimg-container"></div></div>'									
			+'<div class="f-right"><a href="javascript:void(0)" class="ADdel">删除</a></div>'										
			+'</div>'
			+'<input type="hidden" name="adPicId">'
			+'<div class="row">' 
			+'<label class="span5 grid-layout-label">广告类型：</label>'
			+'<div class="span5 grid-layout-content"><div class="jrad-select-container" name="adType"></div></div>'
			+'</div>'
			+'<div class="row">'  
			+'<label class="span5 grid-layout-label">优惠开始时间：</label>'
			+'<div class="span5 grid-layout-content"><div class="jrad-dateinput-container" name="adStartDate"></div></div>'
			+'</div>'	
			+'<div class="row">'  
			+'<label class="span5 grid-layout-label">优惠结束时间：</label>'
			+'<div class="span5 grid-layout-content"><div class="jrad-dateinput-container" name="adEndDate"></div></div>'
			+'</div>'	
			+'<div class="row">' 
			+'<label class="span5 grid-layout-label">广告分类：</label>'
			+'<div class="span9 grid-layout-content"><div class="jrad-checkbox-container" name="offerServiceId"></div></div>'
			+'</div>'
			+'<div class="row">'  
			+'<label class="span5 grid-layout-label">折扣比例：</label>'
			+'<div class="span9 grid-layout-content"><div class="jrad-input-container" name="saleoff"></div>（默认为10，无折扣，可填写1-9，可带1位小数。） </div>'
			+'</div>'	
			+'<div class="row">'  
			+'<label class="span5 grid-layout-label">最新优惠是否显示：</label>'
			+'<div class="span9 grid-layout-content"><div class="jrad-select-container" name="showStatus"></div></div>'
			+'</div>'	
			+'<div class="row">'  
			+'<label class="span5 grid-layout-label">广告简介：</label>'
			+'<div class="span5 grid-layout-content"><div class="jrad-input-container" name="adInfo"></div></div>'
			+'</div>'	
			+'<div class="row">'  
			+'<label class="span5 grid-layout-label">详细介绍：</label>'
			+'<div class="span5 grid-layout-content"><div class="jrad-textarea-container" name="adRemarks"></div></div>'
			+'</div>' 
			+'<div class="row">'
			+'<label class="span5 grid-layout-label">详细介绍：</label>'
			+'<div class="span9 grid-layout-content"><div class="jrad-mediaarea-container" name="newRemarks" style="margin-left:0;"></div></div>'
			+'</div>' 
			+'<div class="row">'
			+'<label class="span5 grid-layout-label">是否需要优惠码：</label>'
			+'<div class="span5 grid-layout-content"><div class="jrad-select-container" name="couponStatus"></div></div>'
			+'</div>'
			+'<div class="row">'
			+'<label class="span5 grid-layout-label">是否有效：</label>'
			+'<div class="span5 grid-layout-content"><div class="jrad-select-container" name="status"></div></div>'
			+'</div>' 
			+'<div class="row">'
			+'<label class="span5 grid-layout-label">标签：</label>'
			+'<div class="span5 grid-layout-content"><div class="jrad-input-container" name="adLabel"></div><p class="ui-note" style="margin-top:10px">请输入2个字的广告标签</p></div>'
			+'</div>' 
			+'</div></div></div>';  		 			
	$("#ADList",_parent).append(str); 
	var validators = {};
	validators['adStartDate'] = [{"msg":"请选择优惠开始时间","type":"min","value":"1"}]; 
	validators['adEndDate'] = [{"msg":"请选择优惠结束时间","type":"min","value":"1"}]; 
	validators['adLabel'] = [{"msg":"请填写标签","type":"min","value":"1"},{"msg":"请填写两个字符的标签","type":"max","value":"2"}];
	var fields_params = {};
	fields_params['adInfo'] = {grid: 9};
	fields_params['adRemarks'] = {grid: 9};
	fields_params['newRemarks'] = {
 			theme:"Full",
 			resizing: false, 
 			grid: 18, 
 			height: 200,
			uploadImg: { //上传图片参数
				url: '/shopmanage-ws/ws/0.1/file/uploadThree',
				fileName: 'file', 
				delFunc: function(item) { 
					item.list.remove(); 
				}, 
				validator : [{
					msg : "只能上传jpg文件",
					type : "regex",
					value : /^.*\.(jpg|JPG)$/
				}], 
				success: function(data){  
					   if(data[0]&&data[0].code=="400"){
						 $.jRadMessage({level:'error',message:data[0].message});
					   }
					},
				note: '仅支持 JPG图片文件。',
				show:true,
				showLarge:true,  
				prev:'fileUrl', 
				params: {type:"",cutPicType:""}, 
				single: true 
			},
			CKOpt:{
				fullPage:true,//是否使用完整的html编辑模式
				basicEntities:false, //Whether to escape basic HTML entities in the document, including:  nbsp gt lt amp 
				startupMode:'source' //载入时，以何种方式编辑 源码和所见即所得 "source"和"wysiwyg"
			} 
 	};
	var _ad = $("#ADForm"+num);
	fields_params['adPicFile'] = {
		url:'/shopmanage-ws/ws/0.1/file/upload',
		delFunc: function(item){
		   item.list.remove();
		   var large = item.large;
		   var array = $("input[name='adPicId']",_ad).val().split(",");
		   $.each(array,function(i){
			  if(array[i]==large){
				array.splice(i,1);
			  } 
		   });
		   $("input[name='adPicId']",_ad).val(array.join(","));
		},
		fileName:"file",
		note: '仅支持 JPG图片文件，且建议大小小于20M,宽高不能小于624*170 。',
		show: false,
		params: {type:"3"},
		success: function(data){ 
			   var val = $("input[name='adPicId']",_ad).val();
			   if(val==""){
				 $("input[name='adPicId']",_ad).val(data.large);
			   }else{
				 $("input[name='adPicId']",_ad).val(val+","+data.large);
			   } 
		},
	   beforeSubmit: function(obj){
		  var re = /^.*\.(jpg|JPG)$/;
		  if(re.test(obj.val())){
			return true;
		  }else{  
			$.jRadAlert("只能上传jpg文件","error",'',-1);
			$("div[name='adPicFile']",_ad).find("input[type='file']").val('');
			return false;
		  }
		},
		single: false,
		showInfo:false 
	};
	fields_params['adType'] = {data:[{id:'1',name:'长时优惠'},{id:'2',name:'限时优惠'}]};  
	fields_params['couponStatus'] = {data:[{id:'0',name:'否'},{id:'1',name:'是'}]};  
	fields_params['showStatus'] = {data:[{id:'1',name:'是'},{id:'0',name:'否'}]};   
	fields_params['status'] = {data:[{id:'1',name:'有效'},{id:'0',name:'无效'}]};     
 
	fields_params['offerServiceId'] = {
			data:[{id:'1',name:'洗车'},{id:'2',name:'美容'},{id:'3',name:'保养'},{id:'4',name:'维修'}],
			selectAll:false}; 
	fields_params['adStartDate'] = {
			grid:4,
	    	dateFmt:'yyyy-MM-dd HH:mm:ss' 
	};
	fields_params['adEndDate'] = {
			grid:4,
	    	dateFmt:'yyyy-MM-dd HH:mm:ss'
	};
	if(json){
		$("#ADForm"+num,_parent).form({
			item:json,
			layout: 'grid',
			fields_params: fields_params, 
			validators:validators,
			autobinding: false
		}); 
		//广告图片
	   var _ul = $("div[name='adPicFile']",_ad).children(".pic-show"); 
	   var src = $("input[name='adPicId']",_ad).val();
	   if(src!=""){ 
		  var arr = src.split(",");
		  var _li = "";
		  $.each(arr,function(i){
				_li += '<li name="" class="adPicPicBoxli"><div class="large-pic"><div class="pic-box"><div class="pic-content"><div class="pic-vc">'
					+'<img src="'+arr[i]+'">'
					+'</div></div><span name="large" class="del-btn"></span></div></div></li>'
		  }); 
		  _ul.html(_li); 
		  $(".adPicPicBoxli .del-btn").click(function(){
			var large = $(this).prev(".pic-content").find("img").attr("src");
			$(this).parents(".adPicPicBoxli").remove(); 
			var array = $("input[name='adPicId']",_ad).val().split(",");
			$.each(array,function(i){
			  if(array[i]==large){
				array.splice(i,1);
			  } 
		   });
		   $("input[name='adPicId']",_ad).val(array.join(","));
	   }); 
		  
	   }
	}else{
		$("#ADForm"+num,_parent).form({
			item: {"saleoff":"10"},
			layout: 'grid',
			fields_params: fields_params,  
			autobinding: false
		});
		$("#ADForm"+num).find("div[name='saleoff']").find("input").attr('placeholder','10');
	}
}

function setBrandTree(){ 
		var json =$.jRadGet({
			 url : "/shopmanage-ws/ws/0.1/support/brand/list",
			 async:false
		});
		var treeData = [];
		var num = 0;
		$.each(json,function(name,value){
		    num++;
			var id = "p"+num;
		    var parent = {"pId":-1,"name":name,"id":id,children:value}; 
			treeData.push(parent); 
		});  
		var optionsSimple = {
		    urlData:{},
		    setting:{
		        view: {
		            showIcon: false
		        },
		        data: {
		            simpleData: {
		                enable: true
		            }
		        },
		        callback: {
		            onClick: zTreeOnClick
		        }
		    },
		    data:treeData
		}; 
		return optionsSimple;
}
function zTreeOnClick(event, treeId, treeNode) {
    var obj;
	if ($.browser.msie && $.browser.version > 6 ){
	  obj = $(event.srcElement);
	}else{ 
	  obj = $(event.target);
	}
    var _li = obj.parent().parent("li");	 
	if(_li.find(".jrad-checkbox-container").length>0){
	   return;
	}else{
		var json =$.jRadGet({
				 url : "/shopmanage-ws/ws/0.1/support/model/list?brandId="+treeNode.id,
				 async:false
			}); 
	   var str = '<div class="jrad-checkbox-container brand-checkbox-container"  name="model-checkbox-container" data-brandid='+treeNode.id+' style="display:block;white-space:normal;margin-left:22px;"></div>'; 
	   if(json.length==0){
	        json = [{"id":treeNode.id,"name":treeNode.name}];
			str = '<div class="jrad-checkbox-container brand-checkbox-container" name="brand-checkbox-container" data-brandid='+treeNode.id+' style="display:block;white-space:normal;margin-left:22px;"></div>'; 
	   }
	   
	   _li.append(str);  
	   $(".brand-checkbox-container",_li).each(function(){
			$(this).checkbox({ 
				data:json,
				selectAll:true
			});
			 
	   });
   }	
}

//shopInfo form 初始化
function initShopInfo(wraper){

	//高德地图初始化
	// var gmap = new mapTool('g_map',{"scale":false});
	// gmap.setScalePostion(10, 10);

 //    $('#g_map').mousemove(function(e){
	// 	$('#showPosition').hide()
	// });
	//百度地图初始化  
	var bmap = new BMap.Map("b_map");
    //point = new BMap.Point("116.403068", "39.914504");
    //bmap.centerAndZoom(point, 14);
    point = new BMap.Point("116.403068", "39.914504");
    bmap.centerAndZoom(point, 13);
    bmap.addControl(new BMap.NavigationControl());
    bmap.enableScrollWheelZoom();
	bmap.addEventListener("click",function(e){
		$('div[name="baiduLongtitude"]').input('val',e.point.lng);
		$('div[name="baiduLatitude"]').input('val',e.point.lat)
	});
	bmap.addEventListener("mousemove",function(e){
		$('#showPosition').html(e.point.lng + "," + e.point.lat).show()
	});
	$('#b_map').mousemove(function(e){
		$('#showPosition').css({position:'absolute','z-index':'1000',top:e.pageY+10,left:e.pageX+10,display:'inline-block'})
	});
	$('#b_map').mouseout(function(e){
		$('#showPosition').hide()
	});

	$('#chaxun').click(function(){
		var str = $('#txtCity').val();
		var local = new BMap.LocalSearch(bmap, {renderOptions:{map: bmap}});
		local.search(str);
	})

	$('.details-box',wraper).hide();
	$('.details-box',wraper).prev('.ui-tit').hide()
	//信息切换
	$("#shopInfo .shop_dec").hide();
	$("#shopInfo .shop_photo").hide(); 
	$(".showTab").click(function(){
	   $(".showTab").removeClass("showTab_select");
	   $(this).addClass("showTab_select");
	   var name = $(this).attr("name"); 
	   if(name=="shop_map_btn"){ 
	    $("#shopInfo .shop_map").show(); 
		$("#shopInfo .shop_dec").hide();
	    $("#shopInfo .shop_photo").hide(); 
	   }else if(name=="shop_dec_btn"){ 
	    $("#shopInfo .shop_map").hide(); 
		$("#shopInfo .shop_dec").show();
	    $("#shopInfo .shop_photo").hide(); 
	   }else if(name=="shop_photo_btn"){ 
	    $("#shopInfo .shop_map").hide(); 
		$("#shopInfo .shop_dec").hide();
	    $("#shopInfo .shop_photo").show(); 
	   } 
	});

	$('#Form_service_brand').form({
		title: '服务品牌', 
		fields_params:{'vendor':{data: [{id:'全部',name:'全部'}]}},
		item: {},  
		height: 500,
		submit:function(){  
			var vendor = $('#Form_service_brand div[name="vendor"]').checkbox('val'); 
			if(vendor.length==0||vendor[0]==""){
				var selectors = $('#Form_service_brand .brand-checkbox-container'); 
				var array = [];//选中字符串集
				var array2 = [];//选中仅有brandid的集
				var array3 = [];//选中仅有modelid的集
				var brandIds = [];
				$.each(selectors,function(i,item){    
					array = $.merge(array,$(item).checkbox("text"));
					if($(item).attr("name")=="brand-checkbox-container"){
						array2 = $.merge(array2,$(item).checkbox("val"));
					}else{
						array3 = $.merge(array3,$(item).checkbox("val"));
					}
					if($(item).checkbox("text").length>0){
						var k = $(item).data("brandid");
						var v = $(item).checkbox("val").join(",");
						var kv = {};
						if(k==v&&$(item).attr("name")=="brand-checkbox-container"){
							kv = {"brandId":k}; 
						}else{
							kv = {"brandId":k,"modelId":v}; 
						}
						brandIds.push(kv);
					}
				});
				array = $.unique(array);   
				var  str="已选择：";
				if(array.length>0){ 
					$.each(array,function(i,json){
					str += json.name+" &nbsp;&nbsp;&nbsp;&nbsp ";
					})
				}
				$("#shopInfo").find("div[name='brand_check_btn']").next("#brand_check_string").html(str); 
				$("div[name='brandIds']",wraper).data("brandIds",brandIds);
				$("div[name='brandIds']",wraper).data("brandIdsArr",{"brand-checkbox-container":array2,"model-checkbox-container":array3}); 
			}else{
				 $("#shopInfo").find("div[name='brand_check_btn']").next("#brand_check_string").html("已选择："+vendor[0]);	
				  $("div[name='brandIds']",wraper).data("brandIds",[]);
				  $("div[name='brandIds']",wraper).data("brandsArr",{"brand-checkbox-container":[],"model-checkbox-container":[],"vendor":['全部']});
			}
			$("#Form_service_brand").form('close'); 
		} 
	}); 
	$("#jrad-button-brand").button({
		click : function() {  
			$('#Form_service_brand').form({
			item:$("div[name='brandIds']",wraper).data("brandIdsArr")
			}).form('open');
		}
	}); 
	var fields_params = {}; 
	fields_params['name'] = {grid: 14}; 
	fields_params['address'] = {grid: 14};  
	fields_params['serviceTel'] = {grid: 14};  
	fields_params['mobile'] = {grid: 14};  
	fields_params['orgNameAddEng'] = {grid: 14};
	fields_params['remarks'] = {grid: 14}; 
	fields_params['startTime'] = {
			grid:4,
	    	dateFmt:'HH:mm',
	};
	fields_params['endTime'] = {
			grid:4,
	    	dateFmt:'HH:mm',
	};
	fields_params['type'] = {data:[{'id':'4','name':'其他'},{'id':'0','name':'4S店'},{'id':'1',name:'连锁店'},{'id':'2','name':'专修店'},{'id':'3','name':'汽配城'}]};  
	fields_params['allowOfflinePay'] = {data:[{id:'1',name:'允许'},{id:'0',name:'不允许'}]}; 
	fields_params['isChainBusiness'] = {data:[{id:'0',name:'否'},{id:'1',name:'是'}]}; 
	fields_params['status'] = {data:[{id:'1',name:'有效'},{id:'0',name:'无效'},{"id":"2",name:"已删除"},{"id":"4",name:"完善中"}]};   
	
	fields_params['isReceiveWMessage'] = {data:[{id:'0',name:'否'},{id:'1',name:'是'}]}; 
	fields_params['isUseErpSystem'] = {data:[{id:'0',name:'否'},{id:'1',name:'简单版'},{id:'2',name:'复杂版'}]};
	//省市区select值
	fields_params['provinceId'] = {
			urlData:{
				url:'/euc/ws/0.1/user/provinces?userId='+carsmart_config.userId
			},
			unshiftData: {id:'',name:'请选择'},
			onchange: function(){
				var provinceCode = $('#shopInfo div[name=provinceId]').select('val');
				if(provinceCode==''){
				$('#shopInfo div[name=areaCodeId]').select({
															urlData:{url:''},
															data:[{id:'',name:'请选择'}],
															val: ''});
				}else{
				$('#shopInfo div[name=areaCodeId]').select({
					urlData:{
						// url: '/shopmanage-ws/ws/0.1/userInfoCms/municipalities?provinceId=' + provinceCode 
						url:'/euc/ws/0.1/user/cities?provinceId='+provinceCode+'&userId='+carsmart_config.userId
					},
					unshiftData: {id:'',name:'请选择'},
					val:''
				});
				} 
				$('#shopInfo div[name=countyId]').select({
																urlData:{url:''},
																data:[{id:'',name:'请选择'}],
																val: ''});
			}
		};
	fields_params['areaCodeId'] = {
		data: [{id:'',name:'请选择'}],
		onchange: function(){
			var cityId = $('#shopInfo div[name=areaCodeId]').select('val');
			if(cityId==''){
				$('#shopInfo div[name=countyId]').select({
														urlData:{url:''},
														data:[{id:'',name:'请选择'}],val: ''});
			}else{
				$('#shopInfo div[name=countyId]').select({
					urlData:{
						url: '/shopmanage-ws/ws/0.1/userInfoCms/countries?areaCodeId=' + cityId
					},
					unshiftData: {id:'',name:'请选择'},
					val:''
				});
			}
		}
	}; 
	fields_params['countyId'] = {
			data: [{id:'',name:'请选择'}]
		}; 
	fields_params['adStartDate'] = {
			grid:4,
	    	dateFmt:'yyyy-MM-dd HH:mm:ss',
	};
	fields_params['adEndDate'] = {
			grid:4,
	    	dateFmt:'yyyy-MM-dd HH:mm:ss',
	};
	fields_params['introduction'] = { 
 			resizing: false, 
 			grid: 22, 
 			height: 200 
 	};
	fields_params['logoIdFile'] = {
			url:'/shopmanage-ws/ws/0.1/file/disposePic',
        	delFunc: function(item){
			   item.list.remove();
			   $("input[name='logoId']",wraper).val("");
			},
			fileName:"file",
            note: '仅支持JPG图片文件，且建议大小小于20M,宽高不能小于180*135。',
            show: false,
            params: {type:"1"},
            success: function(data){
			   if($.isArray(data)){
			    $.jRadAlert(data[0].message, "error");
				return false;
			   }else{
			    $("input[name='logoId']",wraper).val(data.large);
			   }
			},
            beforeSubmit: function(obj){
			  var re = /^.*\.(jpg|JPG)$/;
			  if(re.test(obj.val())){
			    return true;
			  }else{  
				$.jRadAlert("只能上传jpg文件", "error");
				var alert=$('div.jrad-dialog-alert');
				$('a.pop-up-close',alert).click(function(){
					$('div.jrad-dialog-alert').remove()
				});
			    return false;
			  }
			},
            single: true,
            showInfo:false 
	};
	fields_params['businessIdsFile'] = {
			url:'/shopmanage-ws/ws/0.1/file/upload', 
			fileName:"file",
            note: '仅支持 JPG图片文件，且建议大小小于20M,宽高不能小于500*280。',
            show: false,
            params: {type:"2"},
            success: function(data){
			   if($.isArray(data)){
			    $.jRadAlert(data[0].message, "error");
				return false;
			   }else{
			   var _pDiv = $("div[name='businessIdsFile']",wraper);
			   var liArr = $(".pic-show",_pDiv).children("li");
			   var len = liArr.length;
			   var $tDiv = $("<div>").css('clear','left');
			   var $sDiv = $("<div>").addClass("imgType");
			   $(liArr[len-1]).append($tDiv.append($sDiv));
			   $(liArr[len-1]).data('large',data.large)
			   $sDiv.select({
						   urlData:{
								url:'/shopmanage-ws/ws/0.1/shopmanage/pic/types',
								id:'picType',
								name:'picTypeDesc'
							},
							unshiftData: {id:'',name:'请选择'}
					   });
			 }
			},
            beforeSubmit: function(obj){
			  var re = /^.*\.(jpg|JPG)$/;
			  if(re.test(obj.val())){
			    return true;
			  }else{  
				$.jRadAlert("只能上传jpg文件", "error");
			    return false;
			  }
			},
            single: false,
            showInfo:false 
	};
	$('#shopInfo',wraper).form({
		item: {},
		layout: 'grid',
		fields_params: fields_params,
		autobinding: false
	});
    var treeOption = setBrandTree();  
    $("#Form_service_brand .jrad-tree").tree(treeOption);  
	//编辑 提交按钮
	$('#shopInfo .jrad-btn-normal',wraper).button({
		click: function(){
			$('.details-box',wraper).slideUp();
			$('.details-box',wraper).prev('.ui-tit').hide()
			$('.jrad-table',wraper).slideDown(); 
			$(".scroll-up-btn").click();
			$('#Wraper_shop_list .message-tips').fadeOut(3000);
		}
	}); 
	$('#shopInfo .jrad-btn-primary',wraper).button({
		click: function(){ 
			$(".scroll-up-btn").click();
			//$('body,html').animate({scrollTop:0},100);
			var json = $('#shopInfo',wraper).form('getValue'); 
			//json.txtCity = $('#txtCity').val();
			json.brandIds = $("#shopInfo div[name='brandIds']",wraper).data("brandIds");  
			if($("#brand_check_string").html()=="已选择：全部"){
				json.vendor = "0";
			}else{
				json.vendor = "";
			}  

			json.businessIds =[];
			var coverNum = 0;
			var _p = $("div[name='businessIdsFile']",wraper);
			$.each($(".pic-show",_p).children("li"),function(i){
			   var item = {};
			   item.businessId = $(this).data('large');
			   item.picType = $(this).find(".imgType").select('val')[0];
			   if(item.picType=="8"){
				coverNum++;
			   }
			   json.businessIds.push(item); 
			});  
			if(json.status=="1"){
				if(json.businessIds.length==0){
					$.jRadMessage({
					    			 level:'error', 
				    				 message:'请上传商家图片！' 
					    		 }); 
					$('#Wraper_shop_list .message-tips').fadeOut(3000);
					return false;
				}else if(coverNum!=1){
					$.jRadMessage({
					    			 level:'error', 
				    				 message:'要选一张并且只能选一张商家图片做封面！' 
					    		 });  
					return false;
				}
			} 

			var updateOrAdd = json.updateOrAdd;
			delete json.updateOrAdd;
			if(updateOrAdd == "add"){ 
				$.jRadPost({
					    	url:'/shopmanage-ws/ws/0.1/shopmanage/shop/addShopBasicInfo',
					    	data:json,
					    	success:function(data){ 
								  $.jRadMessage({
					    			 level:'success', 
				    				 message:'保存成功！'
					    		 }); 
								 $('#shopInfo',wraper).find("input[name='id']").val(data.id);
								// $('#shopInfo .jrad-btn-primary',wraper).button('disabled',true);
								 $("#shopInfo").find("input[name='updateOrAdd']").val('update');
					    	},error:function(data){
					    		var mes = eval('('+data.responseText+')');
					    		 $.jRadMessage({
					    			 level:'error', 
				    				 message:mes[0].message
					    		 });
					    	}
				});
				$('#Wraper_shop_list .message-tips').fadeOut(3000);
			}else{
				if($("input[name='logoId']",wraper).val()==""){
					json.logoId = "";
				}  
				if(json.adId){
				   json.adId="";
				}
				if(json.adPicId){
				   json.adPicId="";
				} 
				json.modifyPerson = carsmart_config.operatorName;
				$.jRadPost({
					    	url:'/shopmanage-ws/ws/0.1/shopmanage/shop/editShopBasicInfo',
					    	data:json,
					    	success:function(){
					    		 $.jRadMessage({
					    			 level:'success', 
				    				 message:'保存成功！'
					    		 }); 
					    	},error:function(data){
					    		var mes = eval('('+data.responseText+')');
					    		 $.jRadMessage({
					    			 level:'error', 
				    				 message:mes[0].message
					    		 });
					    	}
					    });
				$('#Wraper_shop_list .message-tips').fadeOut(3000);
			}
			// $('.details-box',wraper).slideUp();
			// $('.details-box',wraper).prev('.ui-tit').hide()
			// $('.jrad-table',wraper).slideDown(); 
		   
			
					
		}
	});
	var mapArr = [];
	mapArr.bmap = bmap;
	//mapArr.gmap = gmap;
	return mapArr;
}
function initOperateInfo(wraper){
	var fields_params = {};
	fields_params['isCoop'] = {data:[
		{"id":"1",name:"普通商家"},
		{"id":"2",name:"认证商家"},
		{"id":"3",name:"合作商家"},
		{"id":"4",name:"车店通商家"}
	  ]};  
	fields_params['isTop'] = {data:[{id:'0',name:'否'},{id:'1',name:'是'}]}; 
	fields_params['isGiveGlass'] = {data:[{id:'2',name:'不参加活动'},{id:'1',name:'是'},{id:'0',name:'否'}]}; 
	fields_params['hasOffContract'] = {data:[{id:'0',name:'否'},{id:'1',name:'是'}]};

	fields_params['allowOfflinePay'] = {data:[{id:'1',name:'允许'},{id:'0',name:'不允许'}]};   
	fields_params['onlinePayStatus'] = {data:[{id:'0',name:'不支持'},{id:'1',name:'支持'}]}; 
	fields_params['isSubsidyShare'] = {data:[{id:'1',name:'是'},{id:'0',name:'否'}]}; 
	fields_params['canUseVoucher'] = {data:[{id:'1',name:'是'},{id:'0',name:'否'}]};   

	$('#operateInfo',wraper).form({
		item: {},
		layout: 'grid',
		fields_params: fields_params,
		autobinding: false
	}); 
	$('#Form_buy_CoopTime',wraper).form({
		item: {}
	});
	var regions=eval('('+carsmart_config.regions+')');

	//if(regions[0].areaCodeId != 0){
		$('div.coopBuy').show();
		$('#jrad-button-shop-coopBuy').click(function(){
			$('#Form_buy_CoopTime',wraper).form({
				title:'购买合约时间',
				item: {},
				url:'/shopmanage-ws/ws/0.1/agentManager/coopBusiCostDetail',
				before_submit:function(json){
					json.busiId=$("#shopInfo").find("input[name='id']").val();
					return json
				},
				success_callback:function(data){
					var buyYear = $('#Form_buy_CoopTime div[name="buyYear"]',wraper).input('val');
					var coopStartDate = $('#Form_buy_CoopTime div[name="coopStartDate"]',wraper).dateinput('val');
					$('#Form_ok_CoopTime',wraper).form({
						title:'提示',
						url:'/shopmanage-ws/ws/0.1/agentManager/buyCoopBusi',
						before_submit:function(json){
							json.busiId=$("#shopInfo").find("input[name='id']").val();
							json.buyYear=buyYear;
							json.coopStartDate=coopStartDate;
							return json
						},
						success_callback:function(){
								$('div.overDiv').remove();
								$('div#operateInfo div[name="isCoop"]',wraper).select('val','4');
								var coopEndDate=parseInt(coopStartDate.substring(0,4))+1+coopStartDate.substring(4,10);
								if($('div#operateInfo div.coopTime',wraper).is(':hidden')){
									$('div#operateInfo div.coopTime',wraper).show();
									$('div#operateInfo div[name="coopStartDate"]',wraper).dateinput('val',coopStartDate);
									$('div#operateInfo div[name="coopEndDate"]',wraper).dateinput('val',coopEndDate)
								}else{
									$('div#operateInfo div[name="coopStartDate"]',wraper).dateinput('val',coopStartDate);
									$('div#operateInfo div[name="coopEndDate"]',wraper).dateinput('val',coopEndDate)
								}
								$.jRadMessage({level:'success',message:'购买成功',selector:$('div.details-content',wraper)})
							}
					}).form('open');
					$('body').append('<div class="overDiv" style="z-index: 303; display: block;"></div>');
					$('#Form_ok_CoopTime .jrad-form').html('购买车店通商家'+data.buyYear+'年，需扣除预付款'+data.costMoney+'元，确定后立即生效，确认购买？');
					$('#Form_ok_CoopTime span.ui-btn-normal,#Form_ok_CoopTime a.pop-up-close').click(function(){
						$('div.overDiv').remove()
					})
				}
			}).form('open');
			$('#Form_buy_CoopTime div[name="buyYear"]',wraper).input('val','1');
			$('#Form_buy_CoopTime div[name="buyYear"]',wraper).input('readonly',true)
		})
	//}

	$(".ADdel",wraper).live('click',function(){
		$(this).parents(".ADLi").remove();
	});   
	$("#jrad-button-shop-addAD").button({
		click : function() {
			num++;
			cloneAD(num,wraper);
		}
	}); 
	$('#operateInfo .jrad-btn-normal',wraper).button({
		click: function(){
			$('.details-box',wraper).slideUp();
			$('.details-box',wraper).prev('.ui-tit').hide();
			$('.jrad-table',wraper).slideDown(); 
			$(".scroll-up-btn").click();
			$('#Wraper_shop_list .message-tips').fadeOut(3000);
		}
	}); 

	/*copy 到运营页面*/
	$("#operateInfo",wraper).find('div[name="onlinePayStatus"]').select({
	 	onchange:function(val){
	 		if(val==0){
	 			$('#operateInfo .settle',wraper).hide();
	 			$("#operateInfo div[name='isCoop']",wraper).select('val',1);
	 		}else if(val==1){
	 			$("#operateInfo div[name='isCoop']",wraper).select('val',3);
	 			$('#operateInfo .settle',wraper).show();
	 			$('#operateInfo div[name="transferRate"]',wraper).input('val','100');
	 			if(carsmart_config.isAgentor!=0){
	 				$('#operateInfo div[name="transferRate"]',wraper).input('val','90');
	 				$('#operateInfo div[name="transferRate"]',wraper).input('readonly',true)
	 			}
	 		}
	 	}
	});
	if(carsmart_config.isAgentor != 0){
	 	$('#operateInfo div[name="onlinePayStatus"]',wraper).select('readonly',true);
	 	$('#operateInfo div[name="transferRate"]',wraper).input('readonly',true)
	}
	if(carsmart_config.isAgentor!=0){
	 	$("#operateInfo div[name='isCoop']",wraper).select('val',1);
	 	$('#operateInfo div[name="isCoop"]',wraper).select('readonly',true)
	}else{
	 	 $('#operateInfo .coopTime',wraper).hide();
		 $("#operateInfo div[name='isCoop']",wraper).select({
		 	onchange:function(val){
		 		if(val!=3 && val!=4){
		 			$('#operateInfo .coopTime',wraper).hide();
		 		}else{
		 			$('#operateInfo .coopTime',wraper).show();
		 		}
		 	}
		 })
	}

	if($('#operateInfo div[name="onlinePayStatus"]',wraper).select('val')==0){
		$('#operateInfo .settle',wraper).hide();
	}else if($('#operateInfo div[name="onlinePayStatus"]',wraper).select('val')==1){
	 	$('#operateInfo .settle',wraper).show();
	 	if(carsmart_config.isAgentor!=0){
				$('#shopInfo div[name="transferRate"]',wraper).input('readonly',true)
			}
	}

	$("#operateInfo",wraper).find('div[name="onlinePayStatus"]').select({
	 	onchange:function(val){
	 		if(val==0){
	 			$("#operateInfo div[name='isCoop']",wraper).select('val',1);
	 			$('#operateInfo .settle',wraper).hide();
	 		}else if(val==1){
	 			$("#operateInfo div[name='isCoop']",wraper).select('val',3);
	 			$('#operateInfo .settle',wraper).show();
	 			if(carsmart_config.isAgentor!=0){
	 				$('#operateInfo div[name="transferRate"]',wraper).input('readonly',true)
	 			}
	 		}
	 	}
	})


	$('#operateInfo .jrad-btn-primary',wraper).button({
		click: function(){
		var json = $('#operateInfo',wraper).form('getValue');
		var _grade=$('#operateInfo div[name="grade"]',wraper).input('val');
		json.modifyPerson = carsmart_config.operatorName;
		json.id = $('#shopInfo',wraper).find("input[name='id']").val();
		delete json.adPicId;
		delete json.saleoff;
		delete json.adInfo;
		delete json.adRemarks;
		delete json.adStartDate;
		delete json.adEndDate;
		delete json.newRemarks;
		delete json.offerServiceId;
		delete json.adType;
		delete json.couponStatus;
		delete json.adPicFile; 
		json.ads = []; 
		$.each($("#operateInfo .ADLi",wraper),function(){
		   var ad = $(this).form('getValue');
		   ad.offerServiceId = ad.offerServiceId.join(",");
		   json.ads.push(ad);
		});

		if(!((json.coopStartDate=="" && json.coopEndDate=="")||(json.coopStartDate!="" && json.coopEndDate!=""))){
			$.jRadMessage({
				    			 level:'error', 
			    				 message:'不能只填写一个合约时间！' 
				    		 });  
				return false;
		} 
		if(!(/^[0-9]*[1-9][0-9]*$/.test(_grade)|| _grade=="")){
			$.jRadMessage({
				    			 level:'error', 
			    				 message:'商家级别只能为正整数！' 
				    		 });  
				return false
		}
		if(json.grade=="" || json.grade==undefined || json.grade==null){
			json.grade=20
		}
		$.jRadPost({
					url:'/shopmanage-ws/ws/0.1/shopmanage/shop/editShopOperatingInfo',
					data:json,
					success:function(){
						 $.jRadMessage({
				    			 level:'success', 
			    				 message:'保存成功！' 
				    		 }); 
					},error:function(data){
						var mes = eval('('+data.responseText+')');
						 if(mes[0].message.indexOf('<html>')>0){
				    			$.jRadMessage({
				    			 level:'error', 
			    				 message:'<html>广告详情源码须以<xmp style="display:inline-block;"><html>或<!DOCTYPE html>开头，以</html></xmp>结尾</html>' 
				    		 })
				    		}else{
				    			$.jRadMessage({
					    			 level:'error', 
				    				 message:mes[0].message 
					    		 })
				    		}
					}
				}); 
		$('#Wraper_shop_list .message-tips').fadeOut(3000);
		// $('.details-box',wraper).slideUp();
		// $('.details-box',wraper).prev('.ui-tit').hide()
		// $('.jrad-table',wraper).slideDown(); 
		// $(".scroll-up-btn").click();
		}
	});
}
function clearShopInfo(wraper,gmap,bmap){
	$("#standardService").hide();
	
	$("#shopInfo span[name='g_map_btn']").click(); 
	$(".details-tab .f-left:first",wraper).click();
	//gmap.clearMap();
	bmap.clearOverlays(); 
	//var lnglat = "116.391467"+','+"39.906477";
	//gmap.setCenter(lnglat); 
	//gmap.setZoom("12"); 
	var pt = new BMap.Point("116.391467", "39.906477");
	bmap.setCenter(pt);
	//$('#chaxun').click()
   //logo
   var _ul = $("div[name='logoIdFile']",wraper).children(".pic-show"); 
   _ul.html("<ul class='pic-show'></ul>");
   //店内照片
   var _ul2 = $("div[name='businessIdsFile']",wraper).children(".pic-show"); 
   _ul2.html("<ul class='pic-show'></ul>");
   //服务品牌  
   $("#shopInfo").find("div[name='brand_check_btn']").next("#brand_check_string").html(""); 
   try{
		$("#Form_service_brand .jrad-tree").tree('destroy');  
	}catch(e) {
	} 
   var treeOption = setBrandTree();  
   $("#Form_service_brand .jrad-tree").tree(treeOption);    
   $("#shopInfo div[name='brandIds']",wraper).data("brandIds",[]);//
   $("#shopInfo div[name='brandIds']",wraper).data("brandIdsArr",{"brand-checkbox-container":[],"model-checkbox-container":[],"vendor":""});
   //广告
   $("#operateInfo #ADList").html("");
   num = 0;  
   $("#shopInfo",wraper).form({item:{}});  
   $("#operateInfo",wraper).form({item:{}}); 
   shopFlag = false;
   operateFlag = false;
   carwashFlag = false;
   beautifyFlag = false;
   repairFlag = false;
   rescueFlag = false;
   upkeepFlag = false; 
   smallUpkeepFlag = false; 
   standardFlag = false;

   $("#shopInfo").find("input[name='updateOrAdd']").val('add');  
   $("#carwashService",wraper).html('<table id="Table_carwash_list"></table><p style="margin:10px 10px 20px;color:#666;" class="tips"></p>');
   $("#beautifyService",wraper).html('<table id="Table_beautify_list"></table><p style="margin:10px 10px 20px;color:#666;" class="tips"></p> ');
   $("#upkeepService",wraper).html('<table id="Table_upkeep_list"></table><p style="margin:10px 10px 20px;color:#666;" class="tips"></p> ');
   $("#smallUpkeepService",wraper).html('<table id="Table_smallUpkeep_list"></table><p style="margin:10px 10px 20px;color:#666;"></p> ');
   $("#repairService",wraper).html('<table id="Table_repair_list"></table><p style="margin:10px 10px 20px;color:#666;" class="tips"></p> ');
   $("#rescueService",wraper).html('<table id="Table_rescue_list"></table>');

   var standardService_str='';
   standardService_str+='<div class="details-box2">'
					    	+'<ul class="details-tab2">'
								+'<li class="tab-cur tab-cur-first f-left" rele="carwash"><span name="title">洗车</span></li>'
								+'<li class="f-left" rele="beautify"><span name="title">美容</span></li>'
								+'<li class="f-left" rele="upkeep"><span name="title">保养</span></li>'
								+'<li class="f-left" rele="repair"><span name="title">维修</span></li>'
							+'</ul>'
							+'<div class="details-content">'
								+'<div class="details-scroll">'
									+'<div class="details-content-inner">'
										+'<div class="ui-info-layout tabReleForm2" id="carwash">'
									      +'<div class="qdiv">'
									           +'<table id="Table_settle_carwash"></table>'
									      +'</div> '
									    +'</div>'

										+'<div class="ui-info-layout tabReleForm2" id="beautify" style="display:none;">'
									      +'<div class="qdiv">'
									           +'<table id="Table_settle_beautify"></table>'
									      +'</div>'
									    +'</div>'

										+'<div class="ui-info-layout tabReleForm2" id="upkeep" style="display:none;">'
									      +'<div class="qdiv">'
									           +'<table id="Table_settle_upkeep"></table>'
									      +'</div>'
									    +'</div>'

										+'<div class="ui-info-layout tabReleForm2" id="repair" style="display:none;">'
									      +'<div class="qdiv">'
									           +'<table id="Table_settle_repair"></table>'
									      +'</div>'
									    +'</div>'
									    
									+'</div>'
								+'</div>'
							+'</div>'
					    +'</div>'
   
   $('#standardService',wraper).html(standardService_str);
}

//修改时赋值
function shopInfoVal(wraper,item){
	//logo
    var _ul = $("div[name='logoIdFile']",wraper).children(".pic-show"); 
    var src = $("input[name='logoId']",wraper).val();
    if(src!=""){ 
	  var _li = '<li name="" class="logoPicBoxli"><div class="large-pic"><div class="pic-box"><div class="pic-content"><div class="pic-vc">'
				+'<img src="'+src+'">'
				+'</div></div><span name="small" class="del-btn"></span></div></div></li>'
	  _ul.html(_li); 
		$(".logoPicBoxli .del-btn").click(function(){
				var small = $(this).prev(".pic-content").find("img").attr("src");
				$(this).parents(".logoPicBoxli").remove(); 
			   $("input[name='logoId']",wraper).val("");   
		});	  
	} 
    //店内照片
	var _ul = $("div[name='businessIdsFile']",wraper).children(".pic-show");   
	var arr =item.businessIds; 
	$.each(arr,function(i){
		var $li = $("<li>").addClass("businessPicBoxli");
		var $div = $("<div>").addClass("large-pic").html('<div class="pic-box"><div class="pic-content"><div class="pic-vc">'
															+'<img src="'+arr[i].businessId+'">'
															+'</div></div><span name="large" class="del-btn"></span></div>');
			 
		$li.append($div);
		var $tDiv = $("<div>").css('clear','left');
		var $sDiv = $("<div>").addClass("imgType"); 
		$tDiv.append($sDiv);
		$li.append($tDiv);
		$sDiv.select({
			urlData:{
				url:'/shopmanage-ws/ws/0.1/shopmanage/pic/types',
				id:'picType',
				name:'picTypeDesc'
			},
			val:arr[i].picType,
			unshiftData: {id:'',name:'请选择'} 
		});
		_ul.append($li);
		$li.data('large',arr[i].businessId);
	}); 
	$(".businessPicBoxli .del-btn",wraper).click(function(){ 
		$(this).parents(".businessPicBoxli").remove(); 
	}); 
    //服务品牌  
    if(item.vendor!="0"){
	  var brandCheckString = [];
	  if(item.brandNames!=undefined&&item.brandNames.length > 0){
		  $.each(item.brandNames,function(i){ 
			 if(item.brandNames[i].modelName!=undefined&&item.brandNames[i].modelName!=""){
				$.merge(brandCheckString,item.brandNames[i].modelName.split(",")); 
			 }else{
				brandCheckString.push(item.brandNames[i].brandName);
			 }
		   }); 
	   }  
	   $.unique(brandCheckString);
	   $("#brand_check_string",wraper).html(brandCheckString.join(","));  
	   var brandIdsArr = [];
	   var modelIdsArr = [];
	   if(item.brandNames!=undefined&&item.brandNames.length > 0){
		   $.each(item.brandIds,function(i){
			   var node = $("#brandsTree").tree('getNodeByParam','id',item.brandIds[i].brandId);  
			   var pNode = node.getParentNode();
			   $("#brandsTree").tree('open',pNode,true); 
			   $("#"+node.tId+"_span").click(); 
			   if(item.brandIds[i].modelId==""){
				   var bArr = item.brandIds[i].brandId; 
				   brandIdsArr.push(bArr); 
			   }else{
				   var mArr = item.brandIds[i].modelId.split(","); 
				   $.merge(modelIdsArr,mArr); 
			   }
		   });
	   }
	   $("#shopInfo div[name='brandIds']",wraper).data("brandIds",item.brandIds?item.brandIds:[]);  
	   $("#shopInfo div[name='brandIds']",wraper).data("brandIdsArr",{"brand-checkbox-container":brandIdsArr,"model-checkbox-container":modelIdsArr});  
    }else{
	   $("#brand_check_string",wraper).html("已选择：全部");
	   $("#shopInfo div[name='brandIds']",wraper).data("brandIds",[]);//
	   $("#shopInfo div[name='brandIds']",wraper).data("brandIdsArr",{"brand-checkbox-container":[],"model-checkbox-container":[],"vendor":"全部"});
    }
    if(carsmart_config.isAgentor != 0){
	 	$('#shopInfo div[name="onlinePayStatus"]',wraper).select('readonly',true);
	 	$('#shopInfo div[name="transferRate"]',wraper).input('readonly',true)
	}
   
}

function updateShopView(id,wraper,gmap,bmap){  
	var item = $ .jRadGet({url : '/shopmanage-ws/ws/0.1/shopmanage/shop/detailShopBasicInfo?id='+id});
	$('.details-box',wraper).prev('.ui-tit').html('<strong>商家信息修改</strong>').show(); 
	$('.jrad-table',wraper).slideUp();
	$('.details-box',wraper).slideDown();  
	$('#shopInfo',wraper).form({item:item});  
	$('#operateInfo',wraper).form({item:item});  
	$(".scroll-up-btn").click(); 
	$("#chaxun").click();
	$('#standardService').hide()

	shopInfoVal(wraper,item);
	showBMap(bmap,item); 

	$("#shopInfo",wraper).find("input[name='updateOrAdd']").val('update');  
	
	//copy 到运营页面
	// if($('#shopInfo div[name="onlinePayStatus"]',wraper).select('val')==0){
	// 	$('#shopInfo .settle',wraper).hide();
	// }else if($('#shopInfo div[name="onlinePayStatus"]',wraper).select('val')==1){
	//  	$('#shopInfo .settle',wraper).show();
	//  	if(carsmart_config.isAgentor!=0){
	// 			$('#shopInfo div[name="transferRate"]',wraper).input('readonly',true)
	// 		}
	// }
	// $("#shopInfo",wraper).find('div[name="onlinePayStatus"]').select({
	//  	onchange:function(val){
	//  		if(val==0){
	//  			$("#operateInfo div[name='isCoop']",wraper).select('val',1);
	//  			$('#shopInfo .settle',wraper).hide();
	//  		}else if(val==1){
	//  			$("#operateInfo div[name='isCoop']",wraper).select('val',3);
	//  			$('#shopInfo .settle',wraper).show();
	//  			if(carsmart_config.isAgentor!=0){
	//  				$('#shopInfo div[name="transferRate"]',wraper).input('readonly',true)
	//  			}
	//  		}
	//  	}
	// })

	if($('#operateInfo div[name="isCoop"]',wraper).select('val')!=3 && $('#operateInfo div[name="isCoop"]',wraper).select('val')!=4){
		$('#operateInfo .coopTime',wraper).hide();
	}else{
	 	$('#operateInfo .coopTime',wraper).show();
	}
	$("#operateInfo div[name='isCoop']",wraper).select({
	 	onchange:function(val){
	 		if(val!=3 && val!=4){
	 			$('#operateInfo .coopTime',wraper).hide();
	 		}else{
	 			$('#operateInfo .coopTime',wraper).show();
	 		}
	 	}
	})

	if(carsmart_config.isAgentor!=0){
	 	$('#operateInfo div[name="isCoop"]',wraper).select('readonly',true);
	 	//$('#operateInfo div[name="coopStartDate"]',wraper).dateinput('readonly',true);
	 	//$('#operateInfo div[name="coopEndDate"]',wraper).dateinput('readonly',true)
	}

}
function showBMap(bmap,item){ 
		var blon = item.baiduLongtitude;
		var blat = item.baiduLatitude;
		bmap.clearOverlays();
		if(blon!=""&&blat!=""){ 
			var pt = new BMap.Point(blon,blat);
			var marker_b = new BMap.Marker(pt);  // 创建标注
			bmap.addOverlay(marker_b); 
			bmap.setCenter(pt);   
		}else{
		    var point = new BMap.Point("116.403068", "39.914504");
		    bmap.centerAndZoom(point, 13);
		}
}

function BGmapTurn(type,wraper){
	/** 1.	高德转百度
	2.	百度转高德**/
	var lon;
	var lat;
	if(type=='1'){
	lon = $("#shopInfo",wraper).find("div[name='deflectionLongtitude']").input('val');  
	lat = $("#shopInfo",wraper).find("div[name='deflectionLatitude']").input('val');  
	}else{
	lon = $("#shopInfo",wraper).find("div[name='baiduLongtitude']").input('val');  
	lat = $("#shopInfo",wraper).find("div[name='baiduLatitude']").input('val');  
	}
	if(lon==""||lat==""){
	return false;
	}
	var item = $.jRadGet({url:'/shopmanage-ws/ws/0.1/coordinate/convertor?lon='+lon+'&lat='+lat+'&type='+type});  
	if(type=='1'){
	 $("#shopInfo",wraper).find("div[name='baiduLongtitude']").input('val',item.blng);  
	 $("#shopInfo",wraper).find("div[name='baiduLatitude']").input('val',item.blat);  
	}else{
	 $("#shopInfo",wraper).find("div[name='deflectionLongtitude']").input('val',item.glng);  
	 $("#shopInfo",wraper).find("div[name='deflectionLatitude']").input('val',item.glat);  
	}
}

function getServiceInfo(type,typeName,shopId){   
	var wraper = $('#Wraper_shop_list'); 
	var _table = 'Table_'+typeName+'_list';
    var page_column_model = new Array();
    var page_column_model_b = new Array();
    var page_search_items = new Array();
    var page_list_buttons = new Array();
    var page_list_buttons_b = new Array();

    var page_column_model_c = new Array(); 
	var page_list_buttons_c = new Array();
	//1.洗车  2.美容 3.保养 4.维修 5.小保养
	var entityModel = {};
    var jRad = $.jRad({app:'radsample-ws',entityModel:entityModel});  

	//创建验证
	jRad.validators['firstService'] = [{msg:"请选择一级服务",type:'min',value:'1'}];
	jRad.validators['secondService'] = [{msg:"请选择二级服务",type:'min',value:'1'}];
	jRad.validators['thirdService'] = [{msg:"请选择三级服务",type:'min',value:'1'}]; 
	jRad.validators['shopPrice'] = [{"msg":"请填写非负整数","type":"regex","value":/^[0-9]+$/}];
	jRad.validators['reservePrice'] = [{"msg":"请填写非负整数","type":"regex","value":/^[0-9]+$/}];
	jRad.validators['sequence'] = [{msg:"请输入排列序号",type:'min',value:'1'},{"msg":"请输入数字","type":"regex","value":/^[0-9]+$/}];
	jRad.validators['integral'] = [{"msg":"请填写非负整数","type":"regex","value":/^[0-9]+$/}];
	jRad.validators['clearingPrice'] = [{"msg":"请填写结算价","type":"min","value":'1'},{"msg":"请填写非负整数","type":"regex","value":/^[0-9]+$/}];  
	jRad.validators['useRule'] = [{"msg":'最多200个字符','type':'max',value:'200'}];
	jRad.validators['illustrate'] = [{"msg":'请填写服务说明','type':'min',value:'1'}];
	jRad.validators['idlePrivilegePrice'] = [{"msg":'请填写非负整数',"type":"regex","value":/^[0-9]+$/}];
	jRad.validators['idleClearingPrice'] = [{"msg":'请填写非负整数',"type":"regex","value":/^[0-9]+$/}];
	jRad.validators['couponPrice'] = [{"msg":'请填写非负整数',"type":"regex","value":/^[0-9]+$/}];
	jRad.validators['couponCashPrice'] = [{"msg":'请填写非负整数',"type":"regex","value":/^[0-9]+$/}];
	// jRad.validators['couponClearingPrice'] = [{"msg":'请填写非负整数',"type":"regex","value":/^[0-9]+$/}];
	
	jRad.validators['workPrice'] = [{"msg":'请填写工时费','type':'min',value:'1'}];
	jRad.validators['workHour'] = [{"msg":'请填写工时','type':'min',value:'1'}];

	//修改验证
	var validators2 = {};
	validators2['shopPrice'] = [{"msg":"请填写非负整数","type":"regex","value":/^[0-9]+$/}];
	validators2['reservePrice'] = [{"msg":"请填写非负整数","type":"regex","value":/^[0-9]+$/}];
	validators2['sequence'] = [{msg:"请输入排列序号",type:'min',value:'1'},{"msg":"请输入数字","type":"regex","value":/^[0-9]+$/}];
	validators2['integral'] = [{"msg":"请填写非负整数","type":"regex","value":/^[0-9]+$/}];
	validators2['clearingPrice'] = [{"msg":"请填写结算价","type":"min","value":'1'},{"msg":"请填写非负整数","type":"regex","value":/^[0-9]+$/}];  
	validators2['useRule'] = [{"msg":'最多200个字符','type':'max',value:'200'}];
	validators2['illustrate'] = [{"msg":'请填写服务说明','type':'min',value:'1'}];
	validators2['idlePrivilegePrice'] = [{"msg":'请填写非负整数',"type":"regex","value":/^[0-9]+$/}];
	validators2['idleClearingPrice'] = [{"msg":'请填写非负整数',"type":"regex","value":/^[0-9]+$/}];
	validators2['couponPrice'] = [{"msg":'请填写非负整数',"type":"regex","value":/^[0-9]+$/}];
	validators2['couponCashPrice'] = [{"msg":'请填写非负整数',"type":"regex","value":/^[0-9]+$/}];
	// validators2['couponClearingPrice'] = [{"msg":'请填写非负整数',"type":"regex","value":/^[0-9]+$/}];

	validators2['workPrice'] = [{"msg":'请填写工时费','type':'min',value:'1'}];
	validators2['workHour'] = [{"msg":'请填写工时','type':'min',value:'1'}];
	//机滤价格和工时费验证
	var validators3 = {};
	var validators4 = {};
	validators4['filterShopPrice'] = [{"msg":'请填写正整数',"type":"regex","value":/^0$|^[1-9]\d*$/},{msg:"请输入机滤门市价",type:'min',value:'1'}];
	validators4['filterReservePrice'] = [{"msg":'请填写正整数',"type":"regex","value":/^0$|^[1-9]\d*$/},{msg:"请输入机滤预定价",type:'min',value:'1'}];
	validators4['filterClearingPrice'] = [{"msg":'请填写正整数',"type":"regex","value":/^0$|^[1-9]\d*$/},{msg:"请输入机滤结算价",type:'min',value:'1'}];

	validators3['clearingPrice'] = [{"msg":"请填写正整数","type":"regex","value":/^[0-9]*[1-9][0-9]*$/}];  

	validators3['workShopPrice'] = [{"msg":'请填写正整数',"type":"regex","value":/^0$|^[1-9]\d*$/},{msg:"请输入门市价",type:'min',value:'1'}];
	validators3['workReservePrice'] = [{"msg":"请填写正整数","type":"regex","value":/^0$|^[1-9]\d*$/},{msg:"请输入预定价",type:'min',value:'1'}];  
	validators3['workClearingPrice'] = [{"msg":'请填写正整数',"type":"regex","value":/^0$|^[1-9]\d*$/},{msg:"请输入结算价",type:'min',value:'1'}];


	var fields_params = {};  

	var fields_params2 = {};  
	var categoryList = [];
    var _result = $.jRadGet({url: '/shopmanage-ws/ws/0.1/businessServiceRel/bizActivityList'});
    $.each(_result,function(index, vo){
      var __id = vo['bizActivityId'];
      var __name = vo['bizActivityName'];
      var __tm = {'id': __id,'name': __name};
      categoryList.push(__tm);
    });  

	var categoryList2 = [];
    var _result = $.jRadGet({url: '/shopmanage-ws/ws/0.1/businessServiceRel/bizPartnerList'});
    $.each(_result,function(index, vo){
      var __id = vo['bizPartnerId'];
      var __name = vo['bizPartnerName'];
      var __tm = {'id': __id,'name': __name};
      categoryList2.push(__tm);
    });
    
    fields_params2['bizActivityId'] = {data:categoryList}
    fields_params2['bizPartnerId'] = {data:categoryList2}

	jRad.validators['isSubsidy'] = {
			data:[{id:'0',name:'否'},{id:'1',name:'是'}]
	};
	fields_params['isSubsidy'] = {
			data:[{id:'0',name:'否'},{id:'1',name:'是'}]
	};

	fields_params['firstService'] = {
		urlData: {
				url:'/shopmanage-ws/ws/0.1/service/getSonServices?parentId='+type,
				id: 'id',
				name: 'serviceName',
				type: 'get',
				dataType: 'json'
			}, 
		unshiftData:{id:'',name:'请选择'}, 
		onchange: function(val){ 
				getServiceSonNode("2",val,wraper);  
		}
	};
	fields_params['startTime'] = {
			grid:4,
	    	dateFmt:'yyyy-MM-dd HH:mm:ss'
	};
	fields_params['endTime'] = {
			grid:4,
	    	dateFmt:'yyyy-MM-dd HH:mm:ss'
	};
	fields_params['idlePrivilegePeriod'] = {
			data:[{id:'0',name:'无'},{id:'1',name:'全周'},{id:"2",name:'工作日'}]
	};
	fields_params['illustrate'] = {
 			theme:"Full",
 			resizing: false, 
 			grid: 18, 
 			height: 200,
			uploadImg: { //上传图片参数
				url: '/shopmanage-ws/ws/0.1/file/uploadThree',
				fileName: 'file', 
				delFunc: function(item) { 
					item.list.remove(); 
				}, 
				validator : [{
					msg : "只能上传jpg文件",
					type : "regex",
					value : /^.*\.(jpg|JPG)$/
				}], 
				success: function(data){  
					   if(data[0]&&data[0].code=="400"){
						 $.jRadMessage({level:'error',message:data[0].message});
					   }
					},
				note: '仅支持 JPG图片文件。',
				show:true,
				showLarge:true,  
				prev:'fileUrl', 
				params: {type:"",cutPicType:""}, 
				single: true 
			} 
 	};
 	var branchShopList = $.jRadGetDataSources('/shopmanage-ws/ws/0.1/shopmanage/shop/branchBusiInfos?businessInfoId='+shopId,'busiId','busiRegName');  
 	fields_params['busiIds'] = {
		data:branchShopList,
		selectAll: true
	};
	var reserveInfoSelect = $.jRadGetDataSources('/shopmanage-ws/ws/0.1/datadictionary/dictionarylist?type=reserve_info','id','name'); 
	fields_params['reserveInfo'] = {
		data:reserveInfoSelect
	};
	$('#Form_service_carwash').form({ 
		grid: 22, 
		fields_params: fields_params 
	});
	$('#Form_service_carwash div[name="reserveInfo"]').find('.ui-select-content').removeClass('span4').addClass('span12');
	$('#Form_service_carwash div[name="useRule"]').find('.textarea-content').removeClass('span4').addClass('span12');
	
	$('#Form_discount_time').form({ 
		grid: 16, 
		fields_params: fields_params 
	});
	$('#Form_discount_time .startTime_one,#Form_discount_time .startTime_two').dateinput({
		grid:4,
		dateFmt:'HH:mm'
	});
	$('#Form_discount_time .endTime_one,#Form_discount_time .endTime_two').dateinput({
		grid:4,
		dateFmt:'HH:mm'
	});
	$('#Form_service_smallUpkeep').form({ 
		grid: 22, 
		fields_params: fields_params 
	});
	$('#Form_FilterWork_install').form({ 
		grid: 16, 
		//validators: validators3,
		fields_params: fields_params 
	});

	//var isCbus = $.jRadGet({url:'/vip-ws/ws/0.1/business/checkIsChainBusiness?businessInfoId='+shopId})
	//var isCbus = $.jRadGet({url:'/shopmanage-ws/ws/0.1/businessServiceRel/checkIsChainBusiness?businessInfoId='+shopId})

	page_column_model.push({display: '绑定ID', name : 'id',diy:function(item,$div){
	   if(item.modifyPersonType=="2"){		// 创建渠道 1.运营创建  2.商家创建
			$div.html('<font color="red">'+item.id+'</font>')
	   }else{
			$div.html(item.id);
		}
	}});
	page_column_model.push({display: '服务',name : 'serviceNames'});
    page_column_model.push({display: '门市价', name : 'shopPrice'});
    page_column_model.push({display: '预订价', name : 'reservePrice'});
    page_column_model.push({display: '结算价', name : 'clearingPrice'});    
    //if(isCbus.isChainBusiness == 1){
    // page_column_model.push({display: '工时费', name : 'workPrice'});
    // page_column_model.push({display: '所需工时', name : 'workHour'});
    //}else{
	   //  page_column_model.push({display: '工时费', name : 'workPrice',hidden:true});
	   //  page_column_model.push({display: '所需工时', name : 'workHour',hidden:true});
    // }
    page_column_model.push({display: '闲时优惠价', name : 'idlePrivilegePrice'}); 
	page_column_model.push({display: '闲时结算价', name : 'idleClearingPrice'});  
	page_column_model.push({display: '是否补贴', name : 'isSubsidy',diy:function(item,$div){
	   if(item.isSubsidy=="0"){		
			$div.html('否')
	   }else{
			$div.html('是');
		}
	}});  
	// page_column_model.push({display: '使用开始时间', name : 'useStartTime'});  
	// page_column_model.push({display: '使用结束时间', name : 'useEndTime'});  
	page_column_model.push({display: '预约信息', name : 'reserveInfo'});  
	page_column_model.push({display: '排列序号', name : 'sequence'});  
	page_column_model.push({display: '最后操作时间', name : 'updateDate'});  
	page_column_model.push({display: '最后操作人', name : 'operator'});  
     
	page_column_model_c.push({display: '活动名称', name : 'bizActivityName'})
	page_column_model_c.push({display: '合作伙伴', name : 'bizPartnerName'})
	page_column_model_c.push({display: '结算价(元)', name : 'clearingPrice'})

	page_list_buttons.push({title: '创建',name:'Add', bclass: 'add',onpress : function(){
            $("#Form_service_carwash .addService").parents(".row").remove();
			$("#Form_service_carwash .row:eq(1) .grid-layout-content #serviceNames").remove();
			if(branchShopList.length>0){
				$("div[name='busiIds']").parents(".row").show();
			}else{
				$("div[name='busiIds']").parents(".row").hide();
			}
			$('#Form_service_carwash').form({
                title: '创建',   
                url: '/shopmanage-ws/ws/0.1/businessServiceRel/addRel',  
				item:{}, 
				validators: jRad.validators,
				before_submit:function(json){
					json.businessInfoId = shopId; 
					json.operator = carsmart_config.operatorName;
					json.serviceId = $("#Form_service_carwash .service:last").select('val'); 
					json.busiIds = json.busiIds.join(",");
					json.workPrice =  0;
					json.workHour =  1;
					// if(isCbus.isChainBusiness == 1){
					// 	json.isChainBusiness = 1
					// }else{
					// 	json.isChainBusiness = 0
					// }
					return json;
				},
				success_callback:function(){ 
					$('#'+_table).flexMessage('创建成功', 'success');
					$('#'+_table).flexReload();
				}
            }).form('open'); 
            $('#Form_service_carwash').find('div.date').hide();
			$("#Form_service_carwash div[name='firstService']").select('readonly',false)  
            //if(isCbus.isChainBusiness == 1){
			    // $('#Form_service_carwash .row').eq(4).show()
			    // $('#Form_service_carwash .row').eq(5).show()
		    //}
		    // else{
			    // $('#Form_service_carwash .row').eq(4).hide()
			    // $('#Form_service_carwash .row').eq(5).hide()
		    // }          
        }
    });
	 
	page_list_buttons.push({title: '修改',name:'Edit', bclass: 'edit',prefunc:function(){
            var checked = $('#'+_table).getCheckedTrs();
            if (checked.length != 1) {return false;}else{return true;}
        },onpress : function(){
            var checked = $('#'+_table).getCheckedTrs(); 
            if(checked[0]){ 
            	if(branchShopList.length>0){
					$("div[name='busiIds']").parents(".row").show();
				}else{
					$("div[name='busiIds']").parents(".row").hide();
				}
				  $("#Form_service_carwash .addService").parents(".row").remove();
				  $("#Form_service_carwash .row:eq(1) .grid-layout-content #serviceNames").remove();
				  var item = $.jRadGet({url:'/shopmanage-ws/ws/0.1/businessServiceRel/detailRel?id='+checked[0].id});
				  if(item.busiIds!=undefined){
					  item.busiIds = item.busiIds.split(",");
					}else{
					  item.busiIds = [];
					}; 
				  $("#Form_service_carwash .row:eq(1) .grid-layout-content").append('<p id="serviceNames">已选择：'+item.serviceNames+'</p>');
				  $('#Form_service_carwash').form({
					title: '修改', 
					fields_params: fields_params, 
					item:item,  
					validators: validators2,
					url: '/shopmanage-ws/ws/0.1/businessServiceRel/editRel',
					before_submit:function(json){
						json.businessInfoId = shopId; 
						json.operator = carsmart_config.operatorName;
						json.workPrice =  0;
						json.workHour =  1;
						// if(isCbus.isChainBusiness == 1){
						// 	json.isChainBusiness = 1 
						// }else{
						// 	json.isChainBusiness = 0
						// }
						var serviceId = $("#Form_service_carwash .service:last").select('val'); 
						if(serviceId!=""){
						  json.serviceId = serviceId;
						}
						json.busiIds = json.busiIds.join(",");
						return json;
					},
					success_callback:function(){ 
						$('#'+_table).flexMessage('修改成功', 'success');
						$('#'+_table).flexReloadSearch();
					}
				}).form('open');
				$('#Form_service_carwash').find('div.date').hide();
				$("#Form_service_carwash div[name='firstService']").select('readonly',true)

				// $('#Form_service_carwash div[name="workPrice"]').input('val',0)
				// $('#Form_service_carwash div[name="workHour"]').input('val',1)

	      //       if(isCbus.isChainBusiness == 1){
				   //  $('#Form_service_carwash .row').eq(4).show()
				   //  $('#Form_service_carwash .row').eq(5).show()
			    // }else{
				    // $('#Form_service_carwash .row').eq(4).hide()
				    // $('#Form_service_carwash .row').eq(5).hide()
			    // }
            }
        }
    }); 

	page_list_buttons.push({name:'delete',bclass: 'delete',prefunc:function(){ 
            var checked = $('#'+_table).getCheckedTrs();
            if (checked.length == 0) {return false;}else{return true;}
        },onpress : function(){
	    	var checked = $('#'+_table).getCheckedTrs();
	    	var ids = [];
			$.each(checked,function(i){
				ids.push(checked[i].id);
			});
			var busiServiceIds =ids.join(',');
			$.jRadConfirm('确认删除吗？',1,function(){
				var id =  checked[0].id; 
				var serviceId = checked[0].serviceId;
				$.jRadAjax({
				    type:'post',
					url:'/shopmanage-ws/ws/0.1/businessServiceRel/deleteRel?id='+busiServiceIds+"&businessInfoId="+shopId+'&serviceId='+serviceId, 
					success: function(){
						$('#'+_table).flexMessage('删除成功!', 'success');
           	    		$('#'+_table).flexReloadSearch();
					},
					error:function(xhr){
					    var errormsg = eval("(" + xhr.responseText + ")"); 
						if (errormsg != undefined) {
							$('#'+_table).flexMessage(errormsg[0].message, 'error');
						}
					}
				});
			});
		}
	});
	page_list_buttons.push({displayname: '闲时优惠时间设置',title: '闲时优惠时间设置',name:'timeInstall', bclass: 'timeInstall',onpress : function(){
			var item=$.jRadGet({url:'/shopmanage-ws/ws/0.1/businessServiceRel/getIdlePrivilegePeriod?businessInfoId='+shopId});
			$('#Form_discount_time').form({
                title: '闲时优惠时间设置',   
                url: '/shopmanage-ws/ws/0.1/businessServiceRel/setIdlePrivilegePeriod',  
				item:item, 
				validators: jRad.validators,
				before_submit:function(json){
					json.businessInfoId = shopId; 
					json.idlePrivilegeTimeOne=$('#Form_discount_time .startTime_one').dateinput('val')+'-'+$('#Form_discount_time .endTime_one').dateinput('val');
					json.idlePrivilegeTimeTwo=$('#Form_discount_time .startTime_two').dateinput('val')+'-'+$('#Form_discount_time .endTime_two').dateinput('val');
					return json;
				},
				success_callback:function(){ 
					$('#'+_table).flexMessage('设置成功', 'success');
					$('#'+_table).flexReload();
				}
            }).form('open'); 
            var TimeOne=item.idlePrivilegeTimeOne;
            var TimeTwo=item.idlePrivilegeTimeTwo;
            if(TimeOne!='-'){
            	var TimeOne_start=TimeOne.substr(0,5);
            	var TimeOne_end=TimeOne.substr(6,5);
            	$('#Form_discount_time .startTime_one').dateinput('val',TimeOne_start);
            	$('#Form_discount_time .endTime_one').dateinput('val',TimeOne_end);
            }
            if(TimeTwo!='-'){
            	var TimeTwo_start=TimeTwo.substr(0,5);
            	var TimeTwo_end=TimeTwo.substr(6,5);
            	$('#Form_discount_time .startTime_two').dateinput('val',TimeTwo_start);
            	$('#Form_discount_time .endTime_two').dateinput('val',TimeTwo_end);
            }
            if($('#Form_discount_time div[name="idlePrivilegePeriod"]').radio('val')==""){
            	$('#Form_discount_time div[name="idlePrivilegePeriod"]').radio('val',0)
            }           
        }
    }); 

	page_list_buttons.push({displayname: '设置全部服务补贴',title:'设置全部服务补贴',name:'enabled',bclass: 'enabled',prefunc:function(){
            var checked = $('#Table_shop_list').getCheckedTrs();
            if (checked.length != 1) {return false;}else{return true;}
        },onpress : function(){
	    	var checked = $('#Table_shop_list').getCheckedTrs();
			$ .jRadConfirm('确认将该商家的所有服务都设置为补贴吗？',1,function(){
				var operator =  checked[0].operatorName; 
				var postData={};
				postData.operator=carsmart_config.operatorName;
				postData.businessInfoId=shopId;
				postData.isSubsidy=1;
				$.jRadAjax({
					title:'设置全部服务补贴',
				    type:'post',
				    data:postData,
					url:'/shopmanage-ws/ws/0.1/businessServiceRel/setIsSubsidy', 
					success: function(){
						$('#'+_table).flexMessage('设置成功!', 'success');
           	    		$('#'+_table).flexReload();
					},
					error:function(xhr){
					    var errormsg = eval("(" + xhr.responseText + ")"); 
						if (errormsg != undefined) {
							$('#'+_table).flexMessage(errormsg[0].message, 'error');
						}
					}
				});
			});
		}
	});
	page_list_buttons.push({displayname: '设置全部服务不补贴',title:'设置全部服务不补贴',name:'enabled',bclass: 'enabled',prefunc:function(){
            var checked = $('#Table_shop_list').getCheckedTrs();
            if (checked.length != 1) {return false;}else{return true;}
        },onpress : function(){
	    	var checked = $('#Table_shop_list').getCheckedTrs();
			$ .jRadConfirm('确认将该商家的所有服务都设置为不补贴吗？',1,function(){
				var operator =  checked[0].operatorName; 
				var postData={};
				postData.operator=carsmart_config.operatorName;
				postData.businessInfoId=shopId;
				postData.isSubsidy=0;
				$.jRadAjax({
					title:'设置全部服务补贴',
				    type:'post',
				    data:postData,
					url:'/shopmanage-ws/ws/0.1/businessServiceRel/setIsSubsidy', 
					success: function(){
						$('#'+_table).flexMessage('设置成功!', 'success');
           	    		$('#'+_table).flexReload();
					},
					error:function(xhr){
					    var errormsg = eval("(" + xhr.responseText + ")"); 
						if (errormsg != undefined) {
							$('#'+_table).flexMessage(errormsg[0].message, 'error');
						}
					}
				});
			});
		}
	});
	page_list_buttons.push({separator: true});

	page_list_buttons_c.push({name:'Add',bclass: 'add',onpress : function(){
	 	$('#Form_price_list').form({
                title: '创建',
                fields_params:fields_params2,
                item:{},
               	url:'/shopmanage-ws/ws/0.1/businessServiceRel/saveBizServicePrice',
				before_submit:function(json){
					var checked = $('#'+_table).getCheckedTrs();
					json.id = checked[0].id;
					json.operator = carsmart_config.operatorName;
					return json
				},				
				success_callback:function(){ 
                    $('#Table_price_list').flexMessage('添加成功', 'success');
                    $('#Table_price_list').flexReload();
                } 
            }).form('open');  
		}
	});
 	page_list_buttons_c.push({title: '修改',name:'Edit', bclass: 'edit',prefunc:function(){
            var checked = $('#Table_price_list').getCheckedTrs();
            if (checked.length != 1) {return false;}else{return true;}
        },onpress : function(){
        	var checked = $('#Table_price_list').getCheckedTrs(); 
            if(checked[0]){ 
            	 //console.log(checked[0])				
				 $('#Form_price_list').form({
				 title:'修改', 
				 fields_params:fields_params2,
	             item:checked[0],
	             url:'/shopmanage-ws/ws/0.1/businessServiceRel/saveBizServicePrice',
	             before_submit:function(json){
	             		var checked = $('#'+_table).getCheckedTrs();
	                	json.operator = carsmart_config.operatorName;
	                	json.id = checked[0].id;
	                	return json
	                },
	             success_callback:function(){
	                	$('#Table_price_list').flexMessage('修改成功','success');
	                	$('#Table_price_list').flexReload()
	                }
	        	}).form('open');
			}
		}
			
	});
	page_list_buttons_c.push({name:'delete',bclass: 'delete',prefunc:function(){ 
            var checked = $('#Table_price_list').getCheckedTrs();
            if (checked.length == 0) {return false;}else{return true;}
        },onpress : function(){
	    	var checked = $('#Table_price_list').getCheckedTrs();   
			$ .jRadConfirm('确认删除吗？',1,function(){
				var json = {};
				json.bizServicePriceId = checked[0].bizServicePriceId; 
				$.jRadPost({
					url:'/shopmanage-ws/ws/0.1/businessServiceRel/delBizServicePrice',
					data:json,
					success:function(){ 
						$('#Table_price_list').flexMessage('已删除', 'success');
	                    $('#Table_price_list').flexReload();
					} 
				});   
			});  
		}
	});
    page_list_buttons_c.push({separator: true});

    page_column_model_b.push({display: '绑定ID', name : 'id',diy:function(item,$div){
	   if(item.modifyPersonType=="2"){		// 创建渠道 1.运营创建  2.商家创建
			$div.html('<font color="red">'+item.id+'</font>')
	   }else{
			$div.html(item.id);
		}
	}});
	page_column_model_b.push({display: '服务',name : 'serviceNames'});
    page_column_model_b.push({display: '门市价/升', name : 'shopPrice'});
    page_column_model_b.push({display: '预订价/升', name : 'reservePrice'});
    //if(isCbus.isChainBusiness == 1){
    // page_column_model_b.push({display: '工时费', name : 'workPrice'});
    // page_column_model_b.push({display: '所需工时', name : 'workHour'});
    //}else{
	   //  page_column_model_b.push({display: '工时费', name : 'workPrice',hidden:true});
	   //  page_column_model_b.push({display: '所需工时', name : 'workHour',hidden:true});
    // }
    page_column_model_b.push({display: '结算价', name : 'clearingPrice'});  
	page_column_model_b.push({display: '预约信息', name : 'reserveInfo'});  
	page_column_model_b.push({display: '排列序号', name : 'sequence'});  
	page_column_model_b.push({display: '最后操作时间', name : 'updateDate'});  
	page_column_model_b.push({display: '最后操作人', name : 'operator'});
     
	 
	page_list_buttons_b.push({title: '创建',name:'Add', bclass: 'add',onpress : function(){
            $("#Form_service_smallUpkeep .addService").parents(".row").remove();
			$("#Form_service_smallUpkeep .row:eq(1) .grid-layout-content #serviceNames").remove();
			if(branchShopList.length>0){
				$("div[name='busiIds']").parents(".row").show();
			}else{
				$("div[name='busiIds']").parents(".row").hide();
			}
			$('#Form_service_smallUpkeep').form({
                title: '创建',   
                url: '/shopmanage-ws/ws/0.1/businessServiceRel/addRel',  
				item:{}, 
				validators: jRad.validators,
				before_submit:function(json){
					json.businessInfoId = shopId; 
					json.operator = carsmart_config.operatorName;
					json.serviceId = $("#Form_service_smallUpkeep .service:last").select('val'); 
					json.busiIds = json.busiIds.join(",");
					
						json.workPrice =  0;
						json.workHour =  1;
					// if(isCbus.isChainBusiness == 1){
					// 	json.isChainBusiness = 1
					// }else{
					// 	json.isChainBusiness = 0
					// }
					return json;
				},
				success_callback:function(){ 
					$('#'+_table).flexMessage('创建成功', 'success');
					$('#'+_table).flexReload();
				}
            }).form('open') 
			$("#Form_service_smallUpkeep div[name='firstService']").select('readonly',false)

      //       if(isCbus.isChainBusiness == 1){
			   //  $('#Form_service_smallUpkeep .row').eq(5).show()
			   //  $('#Form_service_smallUpkeep .row').eq(6).show()
		    // }else{
			    // $('#Form_service_smallUpkeep .row').eq(5).hide()
			    // $('#Form_service_smallUpkeep .row').eq(6).hide()
		    // }         
        }
    });
	 
	page_list_buttons_b.push({title: '修改',name:'Edit', bclass: 'edit',prefunc:function(){
            var checked = $('#'+_table).getCheckedTrs();
            if (checked.length < 1) {return false;}else{return true;}
        },onpress : function(){
            var checked = $('#'+_table).getCheckedTrs(); 
            if(checked[0]){ 
				  $("#Form_service_smallUpkeep .addService").parents(".row").remove();
				  $("#Form_service_smallUpkeep .row:eq(1) .grid-layout-content #serviceNames").remove();
				  if(branchShopList.length>0){
						$("div[name='busiIds']").parents(".row").show();
					}else{
						$("div[name='busiIds']").parents(".row").hide();
					}
				  var item = $.jRadGet({url:'/shopmanage-ws/ws/0.1/businessServiceRel/detailRel?id='+checked[0].id});
				  if(item.busiIds!=undefined){
					  item.busiIds = item.busiIds.split(",");
					}else{
					  item.busiIds = [];
					}; 
				  $("#Form_service_smallUpkeep .row:eq(1) .grid-layout-content").append('<p id="serviceNames">已选择：'+item.serviceNames+'</p>');
				  $('#Form_service_smallUpkeep').form({
					title: '修改', 
					fields_params: fields_params, 
					item:item,  
					validators: validators2,
					url: '/shopmanage-ws/ws/0.1/businessServiceRel/editRel',
					before_submit:function(json){
						json.businessInfoId = shopId; 
						json.operator = carsmart_config.operatorName;
						json.workPrice = 0;
						json.workHour = 1;

						// if(isCbus.isChainBusiness == 1){
						// 	json.isChainBusiness = 1
						// }else{
						// 		json.isChainBusiness = 0
						// }
						var serviceId = $("#Form_service_smallUpkeep .service:last").select('val'); 
						if(serviceId!=""){
						  json.serviceId = serviceId;
						}
						json.busiIds = json.busiIds.join(",");
						return json;
					},
					success_callback:function(){ 
						$('#'+_table).flexMessage('修改成功', 'success');
						$('#'+_table).flexReloadSearch();
					}
				}).form('open')
				$("#Form_service_smallUpkeep div[name='firstService']").select('readonly',true)

			// $('#Form_service_smallUpkeep div[name="workPrice"]').input('val',0)
			// $('#Form_service_smallUpkeep div[name="workHour"]').input('val',1)
	      //       if(isCbus.isChainBusiness == 1){
				   //  $('#Form_service_smallUpkeep .row').eq(5).show()
				   //  $('#Form_service_smallUpkeep .row').eq(6).show()
			    // }else{
				    // $('#Form_service_smallUpkeep .row').eq(5).hide()
				    // $('#Form_service_smallUpkeep .row').eq(6).hide()
			    // }
            }
        }
    }); 
  
	page_list_buttons_b.push({name:'delete',bclass: 'delete',prefunc:function(){
            var checked = $('#'+_table).getCheckedTrs();
            if (checked.length == 0) {return false;}else{return true;}
        },onpress : function(){
	    	var checked = $('#'+_table).getCheckedTrs();
	    	var serviceId = checked[0].serviceId;
			$.jRadConfirm('确认删除吗？',1,function(){
				var id =  checked[0].id; 
				$.jRadAjax({
				    type:'post',
					url:'/shopmanage-ws/ws/0.1/businessServiceRel/deleteRel?id='+id+"&businessInfoId="+shopId+'&serviceId='+serviceId, 
					success: function(){
						$('#'+_table).flexMessage('删除成功!', 'success');
           	    		$('#'+_table).flexReloadSearch();
					},
					error:function(xhr){
					    var errormsg = eval("(" + xhr.responseText + ")"); 
						if (errormsg != undefined) {
							$('#'+_table).flexMessage(errormsg[0].message, 'error');
						}
					}
				});
			});
		}
	});
	page_list_buttons_b.push({displayname: '机滤价格设置',title: '机滤价格设置',name:'filterInstall', bclass: 'filterInstall',
		onpress : function(){
			var item=$.jRadGet({url:'/shopmanage-ws/ws/0.1/businessServiceRel/detailBusinessServiceMidRel?businessInfoId='+shopId+'&offerServiceId=5'});
			$('#Form_FilterWork_install').form({
                title: '机滤价格设置',   
                url: '/shopmanage-ws/ws/0.1/businessServiceRel/setBusinessServiceMidRel',  
				item:item, 
				validators: validators4,
				before_submit:function(json){
					json.businessInfoId = shopId; 
					json.modifyPerson = carsmart_config.operatorName;
					json.type = 1;
					return json
				},
				success_callback:function(){ 
					$('#'+_table).flexMessage('设置成功', 'success');
					$('#'+_table).flexReload();
					var _item=$.jRadGet({url:'/shopmanage-ws/ws/0.1/businessServiceRel/detailBusinessServiceMidRel?businessInfoId='+shopId+'&offerServiceId=5'});
				    var _str='';
				        _str+='<span class="ReservePrice" style="padding-left:1%;color:#000;">当前机滤预订价：'+_item.filterReservePrice+'</span>'
				             +'<span class="ReservePrice" style="padding-left:2%;color:#000;">当前工时费预订价：'+_item.workReservePrice+'</span>';
				    $('div#smallUpkeepService div.mDiv span.ReservePrice').remove();
				    $('div#smallUpkeepService div.mDiv').append(_str)
				}
            }).form('open');
            $('#Form_FilterWork_install div.work',wraper).hide();
            $('#Form_FilterWork_install div.filter',wraper).show()
        }
    }); 
    page_list_buttons_b.push({displayname: '工时费设置',title: '工时费设置',name:'workInstall', bclass: 'workInstall',onpress : function(){
			var item=$.jRadGet({url:'/shopmanage-ws/ws/0.1/businessServiceRel/detailBusinessServiceMidRel?businessInfoId='+shopId+'&offerServiceId=5'});
			$('#Form_FilterWork_install').form({
                title: '工时费设置',   
                url: '/shopmanage-ws/ws/0.1/businessServiceRel/setBusinessServiceMidRel',  
				item:item, 
				validators: validators3,
				before_submit:function(json){
					json.businessInfoId = shopId; 
					json.modifyPerson = carsmart_config.operatorName;
					json.type = 2;
					return json
				},
				success_callback:function(){ 
					$('#'+_table).flexMessage('设置成功', 'success');
					$('#'+_table).flexReload();
					var _item=$.jRadGet({url:'/shopmanage-ws/ws/0.1/businessServiceRel/detailBusinessServiceMidRel?businessInfoId='+shopId+'&offerServiceId=5'});
				    var _str='';
				        _str+='<span class="ReservePrice" style="padding-left:1%;color:#000;">当前机滤预订价：'+_item.filterReservePrice+'</span>'
				             +'<span class="ReservePrice" style="padding-left:2%;color:#000;">当前工时费预订价：'+_item.workReservePrice+'</span>';
				    $('div#smallUpkeepService div.mDiv span.ReservePrice').remove();
				    $('div#smallUpkeepService div.mDiv').append(_str)
				}
            }).form('open')
            $('#Form_FilterWork_install div.work',wraper).show();
            $('#Form_FilterWork_install div.filter',wraper).hide()
        }
    });
    page_list_buttons_b.push({separator: true});

    $('#Table_price_list').flexigrid({
		reload: true,
		autoload: false,
		method:'get',
		dataType: 'json',
		//autoload: true,
		url: '/shopmanage-ws/ws/0.1/businessServiceRel/bizServicePriceList',
		searchitems: [], 
		colModel : page_column_model_c,
		buttons : page_list_buttons_c,
		pagedStyle: 'oc'
	});

    if(type == "5"){
    	$('#'+_table).flexigrid({
	            reload:true,
				method:'get',
	            colModel : page_column_model_b,
	            buttons : page_list_buttons_b,
	            searchitems :page_search_items,
	            pagination: {
					diaplay_pages: 5,
					align: 'bottom' 
				},
				//checkBoxType:'single',
				showSearch:true,
	            url:'/shopmanage-ws/ws/0.1/businessServiceRel/queryRels?serviceType='+type+"&businessInfoId="+shopId, 
				overflow:true,
				trEvent:function(){		
					var checked = $('#'+_table).getCheckedTrs();  
					$('#Table_price_list').flexOptions({ 
						extParam:{id: checked[0].id}
					}).flexReload();
				}
	    });    
	    var _item=$.jRadGet({url:'/shopmanage-ws/ws/0.1/businessServiceRel/detailBusinessServiceMidRel?businessInfoId='+shopId+'&offerServiceId=5'});
	    var _str='';
	        _str+='<span class="ReservePrice" style="padding-left:1%;color:#000;">当前机滤预订价：'+_item.filterReservePrice+'</span>'
	             +'<span class="ReservePrice" style="padding-left:2%;color:#000;">当前工时费预订价：'+_item.workReservePrice+'</span>';
	    $('div#smallUpkeepService div.mDiv span.ReservePrice').remove();
	    $('div#smallUpkeepService div.mDiv').append(_str);
	    $('div#smallUpkeepService p.tips',wraper).html('此服务在客户端展示的价格为“机油价格x用户使用机油升数+机滤价格+工时费”！').css('color','red');
	    $('div#smallUpkeepService div[title="刷新"]',wraper).parent().click(function(){
	    		var _item2=$.jRadGet({url:'/shopmanage-ws/ws/0.1/businessServiceRel/detailBusinessServiceMidRel?businessInfoId='+shopId+'&offerServiceId=5'});
		    	var _str2='';
			        _str2+='<span class="ReservePrice" style="padding-left:1%;color:#000;">当前机滤预订价：'+_item2.filterReservePrice+'</span>'
			             +'<span class="ReservePrice" style="padding-left:2%;color:#000;">当前工时费预订价：'+_item2.workReservePrice+'</span>';
		        $('#smallUpkeepService div.mDiv span.ReservePrice').remove();
		    	$('#smallUpkeepService div.mDiv').append(_str2)
	    	})
    }else{
    	$('#'+_table).flexigrid({
	            reload:true,
				method:'get',
	            colModel : page_column_model,
	            buttons : page_list_buttons,
	            searchitems :page_search_items,
	            pagination: {
					diaplay_pages: 5,
					align: 'bottom' 
				},
				//checkBoxType:'single',
				showSearch:true,
	            url:'/shopmanage-ws/ws/0.1/businessServiceRel/queryRels?serviceType='+type+"&businessInfoId="+shopId, 
				overflow:true,
				trEvent:function(){		
					var checked = $('#'+_table).getCheckedTrs();  
					$('#Table_price_list').flexOptions({ 
						extParam:{id: checked[0].id}
					}).flexReload();
				}
	    });  
	    $('div.tabReleForm p.tips',wraper).html('说明：商家提交服务，绑定ID为红色字体。')
    }
}

$(".numb31").click(function(){
    $('.overcurtainDiv').hide();
    var menuId = $(".tabs-selected").attr("menuId")
    var data = $.jRadGet({url:'/shopmanage-ws/ws/0.1/remark/getMenuRemark?menuId='+menuId})
    $("#Form_explain_eg31").form({}).form('close');
    $("#Form_explain_eg31").form({
        title:'页面说明',
        item:data,
        autobinding: true, 
		submit:function(){
        	var postData = {};
            postData.operator = carsmart_config.operatorName;
            postData.menuName = $(".tabs-selected").attr("menuName");
            postData.menuId = $(".tabs-selected").attr("menuId");
            postData.remark = $("#Form_explain_eg31 div[name='remark']").textarea("val")
			$.jRadPost({
			    url:'/shopmanage-ws/ws/0.1/remark/updateMenuRemark',
			    data:postData,
			    success:function(){
					$("#Form_explain_eg31").form('close')
  					$('.overcurtainDiv').hide();
			   	}
			});
		}, 
		cancel:function(){
			$("#Form_explain_eg31").form('close')
  			$('.overcurtainDiv').hide();
		}
    }).form('open')
    $("#Form_explain_eg31 .textarea-content").removeClass("span4").addClass("span12")
    $('.overcurtainDiv').hide();
    $('.overcurtainDiv').eq(0).show().attr("style","z-index:303;display:block");
})

function rescueServiceInfo(typeName,shopId){
	var wraper = $('#Wraper_shop_list'); 
	var _table = 'Table_'+typeName+'_list';
    var page_column_model = new Array();
    var page_search_items = new Array();
    var page_list_buttons = new Array();
	var fields_params = {};
	// var jRad = $.jRad({app:'radsample-ws',entityModel:entityModel});  
	var rescueServices = [];
	var _rescue = $.jRadGet({
		url: '/shopmanage-ws/ws/0.1/shopmanage/shop/listRescueService'
	});
	$.each(_rescue.rescueServices,
	function(index, vo) {
		var __id = vo['rescueServiceId'];
		var __name = vo['rescueServiceName'];
		var __tm = {
			'id': __id,
			'name': __name
		};
		rescueServices.push(__tm);
	});
	fields_params['rescueServiceId']={data:rescueServices};
	fields_params['rescueRegion'] = {
			data: [{id:'0',name:'请选择'},{id:'5',name:'5公里内'},{id:'10',name:'10公里内'},{id:'15',name:'15公里内'},{id:'20',name:'20公里内'}] 
		};
	$('#Form_service_rescue').form({ 
		grid: 12, 
		fields_params: fields_params	
	});

	page_column_model.push({display: '救援ID', name : 'busiRescueRadarId'});
	page_column_model.push({display: '救援类型', name : 'rescueServiceName'});
	page_column_model.push({display: '救援报价/次', name : 'rescueUnit'});
	page_column_model.push({display: '救援范围(多少公里内)', name : 'rescueRegin'});
	page_column_model.push({display: '最后操作时间', name : 'midifyTime'});
    page_column_model.push({display: '最后操作人', name : 'lastModifier'});  
     
	 
	page_list_buttons.push({title: '创建',name:'Add', bclass: 'add',onpress : function(){
			$('#Form_service_rescue').form({
                title: '创建',   
                url: '/shopmanage-ws/ws/0.1/shopmanage/shop/addRrescueRadar',
				item:{},
				fields_params: fields_params,
				before_submit:function(json){
					    json.busiId=shopId;
					    json.rescueServiceId=$('#Form_service_rescue').find("div[name='rescueServiceId']").select('val');
						json.lastModifier = carsmart_config.operatorName;
	                	return json;
	                },
				success_callback:function(){ 
					$('#'+_table).flexMessage('创建成功', 'success');
					$('#'+_table).flexReload();
				}
            }).form('open'); 
        }
    });
	 
	page_list_buttons.push({title: '修改',name:'Edit', bclass: 'edit',prefunc:function(){
            var checked = $("#Table_rescue_list").getCheckedTrs();
            if (checked.length < 1) {return false;}else{return true;}
        },onpress : function(){
            var checked = $("#Table_rescue_list").getCheckedTrs();                 
            if(checked[0]){ 
				  var item = $.jRadGet({url:'/shopmanage-ws/ws/0.1/shopmanage/shop/rescueRadarDetail?busiRescueRadarId='+checked[0].busiRescueRadarId});

				  $('#Form_service_rescue').form({
					title: '修改', 
					fields_params: fields_params,
					validators:[],
					item:item,  
					url: '/shopmanage-ws/ws/0.1/shopmanage/shop/editRrescueRadar',
				// 	before_submit:function(json){
				// 	json.rescueServiceId = checked[0].rescueServiceId;
				// 	return json;
				// },
				before_submit:function(json){
	                	json.busiId=shopId;
					    json.rescueServiceId=$('#Form_service_rescue').find("div[name='rescueServiceId']").select('val');
						json.lastModifier = carsmart_config.operatorName;
	                	return json;
	                },
				success_callback:function(){ 
						$('#Table_rescue_list').flexMessage('修改成功', 'success');
						$('#Table_rescue_list').flexReloadSearch();
					}
				}).form('open');
            }
        }
    }); 
  
	page_list_buttons.push({name:'delete',bclass: 'delete',prefunc:function(){
            var checked = $('#Table_rescue_list').getCheckedTrs();
            if (checked.length < 1) {return false;}else{return true;}
        },onpress : function(){
	    	var checked = $('#Table_rescue_list').getCheckedTrs();
			$.jRadConfirm('确认删除吗？',1,function(){
				var id =  checked[0].busiRescueRadarId; 
				var postData={};
				postData.busiRescueRadarIds=id;
				postData.serviceId = checked[0].serviceId;
				$.jRadPost({
					url:'/shopmanage-ws/ws/0.1/shopmanage/shop/delRrescueRadar',
					data:postData, 
					success: function(){
						$('#Table_rescue_list').flexMessage('删除成功!', 'success');
           	    		$('#Table_rescue_list').flexReloadSearch();
					},
					error:function(xhr){
					    var errormsg = eval("(" + xhr.responseText + ")"); 
						if (errormsg != undefined) {
							$('#Table_rescue_list').flexMessage(errormsg[0].message, 'error');
						}
					}
				});
			});
		}
	}); 
    page_list_buttons.push({separator: true});
    
    $('#Table_rescue_list').flexigrid({
            reload:true,
			method:'get',
            colModel : page_column_model,
            buttons : page_list_buttons,
            searchitems :page_search_items,
            pagination: {
				diaplay_pages: 5,
				align: 'bottom' 
			},
			checkBoxType:'single',
			showSearch:true,
            url:'/shopmanage-ws/ws/0.1/shopmanage/shop/listRrescueRadar?busiId='+shopId,
			//onError:showCategoryError,
			overflow:true,
			trEvent:function(){		
				var checked = $('#Table_rescue_list').getCheckedTrs();  
				$('#Table_price_list').flexOptions({ 
					extParam:{di: checked[0].id}
				}).flexReload();
			}
    });  
}
// 一级 二级 三级服务
function getServiceSonNode(node,val,wraper){   
	var label = "";
	var serviceClass = "";
	if(node==2){
		label = "二级";
		serviceClass = "secondService"; 
		$("#Form_service_carwash .addService").parents(".row").remove();
		$("#Form_service_smallUpkeep .addService").parents(".row").remove();
	}else if(node==3){
		label = "三级";
		serviceClass = "thirdService";
		$('#Form_service_carwash div[name='+serviceClass+']').parents(".row").remove();
		$('#Form_service_smallUpkeep div[name='+serviceClass+']').parents(".row").remove();
	}else if(node==4){
		label = "四级";
		serviceClass = "fourService";
		$('#Form_service_carwash div[name='+serviceClass+']').parents(".row").remove();
		$('#Form_service_smallUpkeep div[name='+serviceClass+']').parents(".row").remove();
	}
	if(val!=""){
		var item = $.jRadGetDataSources("/shopmanage-ws/ws/0.1/service/getSonServices?parentId="+val,"id","serviceName");
		if(item.length>0){
		item.unshift({id:'',name:'请选择'}); 
		var row = '<div class="row">'
					+'<label class="span3 grid-layout-label">'+label+'：</label>'
					+'<div class="span5 grid-layout-content">'
					+'<div name="'+serviceClass+'" class="jrad-select-container service addService"></div>'
					+'</div>'
					+'</div>' 
		if(node==2){
		$("#Form_service_carwash .row:eq(1)",wraper).after(row);
		$("#Form_service_smallUpkeep .row:eq(1)",wraper).after(row);
		}else if(node==3){
		$("#Form_service_carwash .row:eq(2)",wraper).after(row);
		$("#Form_service_smallUpkeep .row:eq(2)",wraper).after(row);
		}else if(node==4){
		$("#Form_service_carwash .row:eq(3)",wraper).after(row);
		$("#Form_service_smallUpkeep .row:eq(3)",wraper).after(row);
		}
		node++; 
		$('#Form_service_carwash div[name='+serviceClass+'],#Form_service_smallUpkeep div[name='+serviceClass+']').select({
			data:item,
			unshiftData: {id:'',name:'请选择'}, 
			onchange: function(val){
				getServiceSonNode(node,val,wraper); 
			}
		});
		}else{
			var des = $.jRadGet({"url":'/shopmanage-ws/ws/0.1/service/detailService?id='+val});
			$('#Form_service_carwash div[name="illustrate"]').mediaarea('val',des.description?des.description:'');
			$('#Form_service_smallUpkeep div[name="illustrate"]').mediaarea('val',des.description?des.description:'');
		}
	}
}
// 一级 二级 三级服务
function getServiceSonNodeSearch(node,val,wraper){    
	var row = $(".jrad-table .searchContent .addRow",wraper); 
	var label = "";
	var serviceClass = "";
	var sc = "";
	var _val="";
	if(node==1){
		label = "一级服务：";
		serviceClass = "firstService"; 
		sc = "first";
		row.html("");
		$(".jrad-table .searchContent",wraper).find('.first').remove();
	}else if(node==2){
		label = "二级服务：";
		serviceClass = "secondService";
		sc = "second";
		_val=$(".jrad-table .searchContent div[name='zeroService']",wraper).select('val');
		$(".second",row).remove();
	}else if(node==3){
		label = "三级服务：";
		serviceClass = "thirdService";
		sc = "second third";
		_val=$(".jrad-table .searchContent div[name='firstService']",wraper).select('val');
		$(".third",row).remove();
	}else if(node==4){
		label = "四级服务：";
		serviceClass = "fourService";
		sc = "second third four";
		_val=$(".jrad-table .searchContent div[name='secondService']",wraper).select('val');
		$(".four",row).remove();
	}
	if(val!=""){ 
		var item = $.jRadGetDataSources("/shopmanage-ws/ws/0.1/service/getSonServices?parentId="+val,"id","serviceName");
		if(item.length>0){
		item.unshift({id:'',name:'请选择'});
		var $label = $("<label>").addClass('grid-layout-label span3').addClass(sc).html(label);
		var $div = $("<div>").addClass('grid-layout-content span4 fluid-wrap').addClass(sc);
		var $select = $("<div>").attr('name',serviceClass).addClass('jrad-select-container service addService');
		if(serviceClass=="firstService"){
			$(".jrad-table .searchContent",wraper).find('div.row-fluid:eq(8)').append($label).append($div.append($select));
		}else{   
			row.append($label).append($div.append($select));
		}
		node++; 
		$select.select({
			data:item,
			unshiftData: {id:'',name:'请选择'}, 
			grid:false,
			onchange: function(val){
				getServiceSonNodeSearch(node,val,wraper); 
			}
		});
		} 
		$('#Table_shop_list').flexOptions({  
			extParam:{
				serviceId: val
			}
		})
	}else{
		$('#Table_shop_list').flexOptions({  
			extParam:{
				serviceId: _val
			}
		})
	}
	
}