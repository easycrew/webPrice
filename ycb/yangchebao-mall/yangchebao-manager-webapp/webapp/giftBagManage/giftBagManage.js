
var giftsBasicAttrFlag = false;
var giftsIntroduceFlag = false;
$(document).ready(function(){ 
	
	var wraper = $("#Wraper_giftBag_manage");
	var page_column_model = new Array();
	var page_search_items = new Array();
	var page_list_buttons = new Array();
	
	var _form = $("#Form_giftBag_manage",wraper);
	
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
    
    
    
	var fields_params={};
	
	
	fields_params['name'] ={grid:9};
	
	fields_params['status'] ={ data:[ 
	     {id:'1',name:'有效'},
	     {id:'0',name:'无效'}
	]};
	
	fields_params['giftBannerPicFile'] = {
			url:'/ycbmall-manager-ws/ws/0.1/file/uploadThree',
			delFunc: function(item){
			   item.list.remove();
			   $("input[name='picBannerUrl']",_form).val("");
			   $("input[name='middleBannerUrl']",_form).val("");
			   $("input[name='smallBannerUrl']",_form).val(""); 
			},
			fileName:"file",
			note: '仅支持 JPG和PNG图片文件,图片大小640*150',
			show: false,
			params: {type:""},
			success: function(data){ 
			   if(data[0]&&data[0].code=="400"){
			     $.jRadMessage({level:'error',message:data[0].message});
			   }else{
			   $("input[name='picBannerUrl']",_form).val(data.fileUrl);
			   $("input[name='middleBannerUrl']",_form).val(data.middleUrl);
			   $("input[name='smallBannerUrl']",_form).val(data.smallUrl); 
			   }
			},
		   beforeSubmit: function(obj){
			  var re = /^.*\.(jpg|JPG|png|PNG)$/;
			  if(re.test(obj.val())){
				return true;
			  }else{  
				$.jRadAlert("只能上传jpg和PNG文件", "error");
				$("div[name='giftBannerPicFile']",_form).find("input[type='file']").val('');
				return false;
			  }
			},
			single: true,
			showInfo:false,
			prev:'fileUrl'
		};
	
	fields_params['introduction'] = {grid:10};
	fields_params['parameter'] = {grid:10};  
	fields_params['picGiftUrlFile'] = {
			url:'/ycbmall-manager-ws/ws/0.1/file/uploadThree',
			delFunc: function(item){
			   item.list.remove();
			   $("input[name='picGiftUrl']",_form).val("");
			   $("input[name='middleGiftUrl']",_form).val("");
			   $("input[name='smallGiftUrl']",_form).val(""); 
			},
			fileName:"file",
			note: '仅支持 JPG和PNG图片文件,图片大小640*150',
			show: false,
			params: {type:""},
			success: function(data){ 
			   if(data[0]&&data[0].code=="400"){
			     $.jRadMessage({level:'error',message:data[0].message});
			   }else{
			   $("input[name='picGiftUrl']",_form).val(data.fileUrl);
			   $("input[name='middleGiftUrl']",_form).val(data.middleUrl);
			   $("input[name='smallGiftUrl']",_form).val(data.smallUrl); 
			   }
			},
		   beforeSubmit: function(obj){
			  var re = /^.*\.(jpg|JPG|png|PNG)$/;
			  if(re.test(obj.val())){
				return true;
			  }else{  
				$.jRadAlert("只能上传jpg和PNG文件", "error");
				$("div[name='picGiftUrlFile']",_form).find("input[type='file']").val('');
				return false;
			  }
			},
			single: true,
			showInfo:false,
			prev:'fileUrl'
		};
	
	page_column_model.push({display: '礼包ID', name : 'id'}); 
	page_column_model.push({display: '礼包名称', name : 'name'}); 
	page_column_model.push({display: 'banner图', name : 'smallPicUrl',width:100,diy:function($row,$div){
			var imgUrl = $row.smallPicUrl;
			if(imgUrl!=undefined&&imgUrl!=""){
			var $img = $('<img width="50" height="50" src="'+imgUrl+'" />');
			$div.height(50);
			$div.append($img);
			}
		}});  
	page_column_model.push({display: '地区', name : 'regionName'});
	page_column_model.push({display: '礼包状态', name : 'statusName'});
	page_column_model.push({display: '排序', name : 'sequence'});
	page_column_model.push({display: '操作时间', name : 'updated'});
	page_column_model.push({display: '操作人', name : 'operator'});
	
	
	page_search_items.push({row:'1',type:'jrad-input',display:'礼包名称',name:'name'});
	page_search_items.push({row:'1',type:'jrad-select',display:'省',name:'provinceId',params:jRad.params['provinceCodeSearch']});
	page_search_items.push({row:'1',type:'jrad-select',display:'市',name:'areaCodeId',params:jRad.params['areaCodeSearchId']});
	page_search_items.push({row:'2',type:'jrad-select',display:'礼包状态',name:'status',params:{
		  data:[
		    {id:'',name:'全部'},
		    {"id":"1",name:"有效"},
			{"id":"0",name:"无效"} 
		  ]
		}});
	
	$('#Form_giftBag_manage',wraper).form({
		fields_params:fields_params,
		layout: 'grid', 
		autobinding: false
	 }); 

	
	page_list_buttons.push({title: '创建',name:'Add', bclass: 'add',onpress : function(){
		 initGiftBagInfo(wraper); 
		 $('#Form_giftBag_manage',wraper).form({item:{'adTurnType':'0'}}); 
		 $('.jrad-table',wraper).slideUp();
		 $('.details-box',wraper).slideDown();
		 $(".scroll-up-btn").click();
		 clearGiftInfo(wraper);
		}
	});
	page_list_buttons.push({title: '修改',name:'Edit', bclass: 'edit',prefunc:function(){
		var checked = $('#Table_giftBag_manage').getCheckedTrs();
		if (checked.length != 1) {return false;}else{return true;}
	},onpress : function(){
		var checked = $('#Table_giftBag_manage').getCheckedTrs(); 
		if(checked[0]) {
			var id = checked[0].id;
            	updateGiftView(id,wraper);
			}
		}
	}); 
	
    page_list_buttons.push({separator: true}); 
    
	$('#Table_giftBag_manage').flexigrid({
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
			url:'/ycbmall-manager-ws/ws/0.1/giftBagCms/queryGiftBags',
			onError:showGiftBagError,
			overflow:true
	});   
	
	var _span7=$('div.searchButtons',wraper).parent().removeClass('span14').addClass('span20');
    var _div=$('<div>').addClass('row-fluid').append(_span7);
    $('div.searchContent',wraper).append(_div);
	
	$(".searchButtons .ui-btn-icon:first",wraper).unbind('click');
	$(".searchButtons .ui-btn-icon:first",wraper).click(function(){
			 $('#Table_giftBag_manage',wraper).flexOptions({url:'/ycbmall-manager-ws/ws/0.1/giftBagCms/queryGiftBags'});
			 $('#Table_giftBag_manage',wraper).flexReloadSearch();
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
			$('#Table_giftBag_manage').flexOptions({
						url:'/ycbmall-manager-ws/ws/0.1/giftBagCms/queryGiftBags',
						queryParam:{},
						page:0});
			$('#Table_giftBag_manage',wraper).flexReloadSearch();
	}); 
	
	//返回按钮
	$(".details-tab:eq(0) .return", wraper).click(function() {
		$('.details-box:eq(0)', wraper).slideUp();
		$('.details-box:eq(0)', wraper).prev('.ui-tit').hide();
		$('.jrad-table', wraper).slideDown();
		clearGiftInfo(wraper);
		$(".scroll-up-btn").click();
		$('#Table_giftBag_manage',wraper).flexReloadCurrentPage();
	});
	
	
	$(".details-tab:eq(0) .f-left", wraper).click(function() {
		$(".details-tab:eq(0) .tab-cur", wraper).removeClass("tab-cur");
		$(this).addClass("tab-cur");
		var rele = $(this).attr("rele");
		$(".tabReleForm", wraper).hide();
		var type = $("#Form_giftBag_manage",wraper).find("input[name='updateOrAdd']").val();
		var id = $("#Form_giftBag_manage",wraper).find("input[name='id']").val();
		if (type == "update") {
			if (rele == "giftInfo_introduce" && giftsIntroduceFlag == false) {
				giftInfoIntroduce(id, wraper); 
				giftsIntroduceFlag = true;
			}
		} else {
			if (rele == 'giftInfo_introduce' && giftsIntroduceFlag == false) {
				if (id == '') {
					$.jRadMessage({
						level: 'error',
						message: '请先填写礼包基础信息'
					});
					return false
				}
				giftInfoIntroduce(id, wraper);
				giftsIntroduceFlag = true
			} 
		}
		$("#" + rele, wraper).show();
	});
	
	//地区选择 
    var area_fields_params = {};
	area_fields_params['provinceId'] = {
			urlData:{
				url:'/ycbmall-manager-ws/ws/0.1/area/provinceAllTwo'
			},
			unshiftData: {id:'0',name:'全部'},
		onchange: function(){
			var provinceCode = $('#Form_area div[name=provinceId]',wraper).select('val');
			if(provinceCode=='0'){
				$("#Form_area div[name='areaCodeId']",wraper).select({
					urlData:{url:''},
					data:[{id:'0',name:'全部'}],
					val:'0'});
			}else{
				
			$('#Form_area div[name=areaCodeId]',wraper).select("val","0");
			$('#Form_area div[name=areaCodeId]',wraper).select({
				urlData:{
					url:'/ycbmall-manager-ws/ws/0.1/area/municipalitiesTwo?provinceId=' + provinceCode
				},
				unshiftData: {id:'0',name:'全部'}
			});
			}
		}
	}
	area_fields_params['areaCodeId'] = {
			data: [{id:'0',name:'全部'}]
		};
	
	$('#Form_area',wraper).form({
        title:"地区", 
		fields_params:area_fields_params,
		item:{"provinceId":"0","areaCodeId":"0"},
		submit:function(){
			var json = {};
			json.provinceId = $("#Form_area div[name='provinceId']",wraper).select('val');
			json.provinceName = $("#Form_area div[name='provinceId']",wraper).select('text');
			json.areaList = [];
			json.areaList[0] = {};
			json.areaList[0].areaCodeId = $("#Form_area div[name='areaCodeId']",wraper).select('val');
			json.areaList[0].areaCodeName = $("#Form_area div[name='areaCodeId']",wraper).select('text');  
			var array = $("div[name='regions']",wraper).data("areaList");
			var pId = json.provinceId; 
			var aId = json.areaList[0].areaCodeId;
			if(pId=="0"){
				array = []; 
				array.push(json);
			}else{
			    if(array.length==1&&array[0].provinceId=="0"){
				array = []; 
				array.push(json);
				}else{
					var flag = true;
					$.each(array,function(){
						if(this.provinceId == pId){
						  flag = false;
						  var areaList = this.areaList;
						  if(aId=="0"){
								this.areaList = json.areaList;
						  }else{ 
								var areaflag = true;
								for(var i=0;i<areaList.length;i++){
								if(areaList[i].areaCodeId==0){
								areaflag = false;
								this.areaList = json.areaList;
								break;
								}
								if(areaList[i].areaCodeId==aId){ 
								areaflag = false;
								$.jRadMessage({level:'error',message:"该地区已经选择",selector:$("#Form_area",wraper)});
								return;
								}
								
								}
								if(areaflag){
								this.areaList.push(json.areaList[0]);
								}
						  }
						}
					});
					if(flag){  
					  array.push(json);
					}  
				}
			}
			addAreaList(array,wraper); 
			$("div[name='regions']",wraper).data("areaList",array);
			// $("#Form_area div[name='areaCodeId']",wraper).select('destroy');
			$("#Form_area",wraper).form("close");
		}
		});
	$("#jrad-button-area",wraper).button({
		click : function() {  
			$("#Form_area div[name='areaCodeId']",wraper).select({
				urlData:{url:''},
				data:[{id:'0',name:'全部'}],
				val:'0'});
			$('#Form_area',wraper).form({ 
				fields_params:area_fields_params,
				item:{"provinceId":"0","areaCodeId":"0"},
			}).form('open');
		}
	});
	
	//删除地区
	$("#area_check_string .delArea",wraper).live('click',function(){
		var info = $(this).data('info'); 
		var arr = $("div[name='regions']",wraper).data("areaList");
		$.each(arr,function(i){
			var json = this;
			if(json.provinceId==info.provinceId){
				if(info.areaId=="0"){
					arr.splice(i,1);
				}else if(json.areaList.length==1){
					arr.splice(i,1);
				}else{
					$.each(json.areaList,function(j){
					var area = this;
					if(area.areaCodeId==info.areaId){ 
					json.areaList.splice(j,1); 
					}
					});
				}
			}
		}); 
		$(this).parent('.areaSpan').remove();
	});
	
	//套装Form操作
	$('#Form_suit',wraper).form({
		validators:{'id':[{msg:"套装SKU-ID不能为空",type:'min',value:"1"}]}, 
        title:"套装SKU", 
		submit:creatSuitSku
	});
	$("#jrad-button-suit",wraper).button({
		click : function() {
			$("#Form_suit",wraper).find("div[name='suitSkuName']").html('');
			$('#Form_suit',wraper).form({
			}).form('open');
			$('#btnSuitSku',wraper).unbind('click').click(function(){
				console.log(21);
				var id = $("#Form_suit",wraper).find("input[name='id']").val();
				var data = $.jRadGet({
					url:'/ycbmall-manager-ws/ws/0.1/skuCms/getIsExclusiveSku?skuId='+id,
					success:function(data){
						$("#Form_suit",wraper).find("input[name='suitSkuId']").val(data.skuId);
						$("#Form_suit",wraper).find("div[name='suitSkuName']").html(data.name);
					},error:function(xhr){
						var errormsg = eval("(" + xhr.responseText + ")"); 
			      		if (errormsg != undefined) {
			      			$("#Form_suit",wraper).form('message',errormsg[0].message,'error');
			      		}
			    	}
				});
			});
		}
	});
	//删除套装Sku
	$("#suit_check_string .delClass",wraper).live('click',function(){
		var info = $(this).data('info');   
		$("div[name='suitSku']",wraper).data("suitSku",{}); 
		$(this).parent('.classSpan').remove();
	});

	//单品SkuForm操作
	$('#Form_sku',wraper).form({
		validators:{'id':[{msg:"单品SKU-ID不能为空",type:'min',value:"1"}]}, 
        title:"单品SKU", 
		submit:creatFormSku
	});
	$("#jrad-button-sku",wraper).button({
		click : function() {  
			$("#Form_sku",wraper).find("div[name='skuName']").html('');
			$('#Form_sku',wraper).form({
			}).form('open');
			$('#btnSku',wraper).unbind('click').click(function(){
				var id = $("#Form_sku",wraper).find("input[name='id']").val();
				var data = $.jRadGet({
					url:'/ycbmall-manager-ws/ws/0.1/skuCms/getIsExclusiveSku?skuId='+id,
					success:function(data){
						$("#Form_sku",wraper).find("input[name='skuId']").val(data.skuId);
						$("#Form_sku",wraper).find("div[name='skuName']").html(data.name);
					},error:function(xhr){
						var errormsg = eval("(" + xhr.responseText + ")"); 
			      		if (errormsg != undefined) {
			      			$("#Form_sku",wraper).form('message',errormsg[0].message,'error');
			      		}
			    	}
				});
			});
		}
	});
	//删除单品商品信息
	$("#sku_check_string .delClass",wraper).live('click',function(){
		var info = $(this).data('info'); 
		var arr = $("div[name='skuLists']",wraper).data("skuList");
		$.each(arr,function(i){
			var json = this;
			if(json.skuId=info.skuId){
				arr.splice(i,1);
			}
		}); 
		$(this).parent('.classSpan').remove();
	});
	
	//专供礼包信息取消按钮
	$('#Form_giftBag_manage span.jrad-btn-normal',wraper).button({
		click: function(){
			$('.details-box:eq(0)', wraper).slideUp();
			$('.details-box:eq(0)', wraper).prev('.ui-tit').hide();
			$('.jrad-table', wraper).slideDown();
			clearGiftInfo(wraper);
			$(".scroll-up-btn").click();
			$('#Table_giftBag_manage').flexReloadCurrentPage();
		}
	}); 
	//专供礼包信息确定按钮
	$('#Form_giftBag_manage span.jrad-btn-primary', wraper).button({
		click: function() {
			var flag = $('#Form_giftBag_manage', wraper).form('validateAll');
			if (!flag) {
				return false
			}
			var json = $('#Form_giftBag_manage', wraper).form('getValue');
			json.operator = carsmart_config.operatorName;
			
			json.regions = []; 
			var regions = $("div[name='regions']",wraper).data("areaList");
			if(regions.length==0){
			 $.jRadMessage({level:'error',message:"请选择要绑定的地域。"});
			 return;
			}else{
			$.each(regions,function(){
			  var region = {};
			  region.provinceId = this.provinceId+""; 
			  var areaCodeId = [];
			  var areaList = this.areaList;
			  for(var i=0;i<areaList.length;i++){
			  areaCodeId.push(areaList[i].areaCodeId);
			  }
			  region.areaCodeId = areaCodeId.join(",");
			  json.regions.push(region);
			});
			}
			var suitSkuId = $("div[name='suitSku']",wraper).data("suitSku").suitSkuId;
			if(suitSkuId==undefined){
				$.jRadMessage({level:'error',message:"套装SKU必须选择"});
				return;
			}
			json.suitSkuId = $("div[name='suitSku']",wraper).data("suitSku").suitSkuId;
			
			
			json.skuIds = []; 
			var skuLists = $("div[name='skuLists']",wraper).data("skuList");
			if($("#Form_giftBag_manage", wraper).find("input[name='updateOrAdd']").val()=='update'){
				$.each(skuLists,function(){ 
					  var skuId = {}
					  skuId.skuId = this.skuId;
					  skuId.giftSingleSkuRelId=this.giftSingleSkuRelId;
					  json.skuIds.push(skuId);
					});
			}else{
				$.each(skuLists,function(){ 
					  var skuId = {}
					  skuId.skuId = this.skuId;
					  json.skuIds.push(skuId);
					});
			}
			
			var mediumType = $("input[name='mediumType']:checked").val();
			if(mediumType==undefined){
				$.jRadMessage({level:'error',message:"请选择礼包描述类型"});
			}
			json.mediumType=mediumType;
			
			var updateOrAdd = json.updateOrAdd;
			delete json.updateOrAdd;
			if (updateOrAdd == 'add') {
				$.jRadPost({
					url: '/ycbmall-manager-ws/ws/0.1/giftBagCms/addGiftBag',
					data: json,
					success: function(data) {
						$.jRadMessage({
							level: 'success',
							message: '保存成功！'
						});
						$('#Form_giftBag_manage', wraper).find("input[name='id']").val(data.id);
						$("#Form_giftBag_manage", wraper).find("input[name='updateOrAdd']").val('update');
					},
					error: function(data) {
						var mes = eval('(' + data.responseText + ')');
							$.jRadMessage({
								level: 'error',
								message: mes[0].message
							});
					}
				});
			} else {
				$.jRadPost({
					url: '/ycbmall-manager-ws/ws/0.1/giftBagCms/editGiftBag',
					data: json,
					success: function(data) {
						$.jRadMessage({
							level: 'success',
							message: '修改成功！'
						})
					},
					error: function(data) {
						var mes = eval('(' + data.responseText + ')');
							$.jRadMessage({
								level: 'error',
								message: mes[0].message
							})
						
					}
				});
			}
		}
	});
});

//获取礼包介绍信息
function giftInfoIntroduce(id,wraper){
	
	giftIntroduceTable(id,wraper);
	
	
	var validatorsIntroduce = {};
	var fields_Introduceparams = {};
	//验证
	validatorsIntroduce['name'] = [{
		msg: '名称不能为空',
		type: 'min',
		value: '1'
	}];
	//初始化富文本组件
	fields_Introduceparams['introduce']={
			theme:"Full",
			resizing:false,
			grid:15,
			height:200,
			uploadImg:{
				url:'/ycbmall-manager-ws/ws/0.1/file/uploadThree',
				filename:'file',
				delFunc:function(item){
					item.list.remove();
				},
				validator:[{
					mag:"只能上传JPG文件",
					type:"regex",
					value:/^.*\.(jpg|JPG)$/
				}],
				success:function(data){
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
	
	$('#basicInfo_giftIntroduce',wraper).form({
		validators: validatorsIntroduce,
		fields_params:fields_Introduceparams,
		layout: 'grid',
		autobinding: false
	});
	
	var giftsIntroduceCarFlag = false;
	$("#Form_giftIntroduce_manage .details-tab .f-left", wraper).die('click').live('click', function() {
		$("#Form_giftIntroduce_manage .details-tab .tab-cur", wraper).removeClass("tab-cur");
		$(this).addClass("tab-cur");
		var rele = $(this).attr("rele");
		var introduceId = $('div#Form_giftIntroduce_manage div#basicInfo_giftIntroduce input[name="introduceId"]', wraper).val();
		var giftId=$("#Form_giftBag_manage").find("input[name='id']").val()
		$("#Form_giftIntroduce_manage .tabReleForm", wraper).hide();
		
		if (rele == 'carType_giftIntroduce' && giftsIntroduceCarFlag == false) {
			if (introduceId == '') {
				$.jRadMessage({
					level: 'error',
					message: '请先设置礼包介绍信息！',
					selector: $('div#Form_giftIntroduce_manage div.details-box', wraper)
				});
				$("#" + rele, wraper).show();
				return false
			}
			giftBindCarTypeTable(introduceId,wraper);
			giftsIntroduceCarFlag = true
		}		
		$("#" + rele, wraper).show();
	});
	
	//新增礼包介绍窗口打开
	$('div#giftInfo_introduce span#addGiftIntroduce', wraper).die('click').live('click', function() {
		$('#Form_giftIntroduce_manage', wraper).form({
			title: '创建',
			grid: 43,
			height:450
		}).form('open');
		clearGiftIntroduce();
		giftsIntroduceCarFlag = false;
		getIntroduceParams('',wraper);
		$('div#Form_giftIntroduce_manage div#basicInfo_giftIntroduce input[name="updateOrAdd"]', wraper).val('add');
	});
	//编辑窗口打开
	$('#Table_giftIntroduce_list a.editGiftBagIntroduce', wraper).die('click').live('click', function() {
		$('#Form_giftIntroduce_manage', wraper).form({
			title: '编辑',
			grid: 43,
			height:450
		}).form('open');
		clearGiftIntroduce();
		giftsIntroduceCarFlag = false;
		var id = $(this).parents('tr').find('td.introduceId').html();
		getIntroduceParams(id,wraper);
		$('div#Form_giftIntroduce_manage div#basicInfo_giftIntroduce input[name="introduceId"]', wraper).val(id);
		$('div#Form_giftIntroduce_manage div#basicInfo_giftIntroduce input[name="updateOrAdd"]', wraper).val('update');
	});
	//窗口关闭事件
	$('#Form_giftIntroduce_manage a.pop-up-close', wraper).live('click', function(){
		$('#Form_giftIntroduce_manage', wraper).form({}).form('close')
	});
	
	
	//创建礼包介绍点击确定
	$('div#Form_giftIntroduce_manage div#basicInfo_giftIntroduce span.ui-btn-primary', wraper).unbind('click').bind('click', function() {
		var flag = $('div#Form_giftIntroduce_manage div#basicInfo_giftIntroduce', wraper).form('validateAll');
		if (!flag) {
			return false
		}
		var json = $('div#Form_giftIntroduce_manage div#basicInfo_giftIntroduce', wraper).form('getValue');
		json.giftBagId = id;
		json.operator = carsmart_config.operatorName;
		var updateOrAdd = json.updateOrAdd;
		delete json.updateOrAdd;
		if (updateOrAdd == 'add') {
			$.jRadPost({
				url: '/ycbmall-manager-ws/ws/0.1/giftBagCms/addGiftBagIntroduce',
				data: json,
				success: function(data) {
					giftIntroduceTable(id,wraper);
					$('div#Form_giftIntroduce_manage div#basicInfo_giftIntroduce input[name="introduceId"]',wraper).val(data.introduceId);
					$.jRadMessage({
						level: 'success',
						message: '创建成功！',
						selector: $('div#Form_giftIntroduce_manage div#basicInfo_giftIntroduce', wraper)
					});
				},
				error: function(data) {
					var mes = eval('(' + data.responseText + ')');
					$.jRadMessage({
						level: 'error',
						message: mes[0].message,
						selector: $('div#Form_giftIntroduce_manage div#basicInfo_giftIntroduce', wraper)
					});
				}
			})
		} else {
			$.jRadPost({
				url: '/ycbmall-manager-ws/ws/0.1/giftBagCms/editGiftBagIntroduce',
				data: json,
				success: function(data) {
					giftIntroduceTable(id,wraper);
					$.jRadMessage({
						level: 'success',
						message: '编辑成功！',
						selector: $('div#Form_giftIntroduce_manage div#basicInfo_giftIntroduce', wraper)
					})
				},
				error: function(data) {
					var mes = eval('(' + data.responseText + ')');
					$.jRadMessage({
						level: 'error',
						message: mes[0].message,
						selector: $('div#Form_giftIntroduce_manage div#basicInfo_giftIntroduce', wraper)
					});
				}
			})
		}

	});
	
}



//增加单品Sku
function creatFormSku(){
	var wraper = $("#Wraper_giftBag_manage");
	var _form =  $("#Form_sku",wraper);
	var skuId = _form.find("input[name='skuId']").val();
	var skuName = _form.find("div[name='skuName']").html();
	var flag = _form.form('validateAll');
	
	if(!flag){
		return false;
	}
	
	if(skuName==''){
		$.jRadMessage({level:'error',message:"请先点击查询按钮",selector:$("#Form_sku",wraper)});
		return;
	}
	
	var array = $("div[name='skuLists']",wraper).data("skuList");
	if(skuId!=''){
		if(array.length>=10){
			$.jRadMessage({level:'error',message:"单品Sku最多只能选择10种",selector:$("#Form_sku",wraper)});
			return;
		}else{
			var skuFlag = false;
			$.each(array,function(){
			var oldSkuId = this.skuId;
			if(oldSkuId==skuId){
				skuFlag=true;
			}
		});
			if(skuFlag){
				$.jRadMessage({level:'error',message:"该skuId已经选择",selector:$("#Form_sku",wraper)});
				return;
			}
			
		}
	}
	var skuName = _form.find("div[name='skuName']").html();
	var json={};
	json.skuName =skuName;
	json.skuId = skuId;
	array.push(json);
	addSkuList(array,wraper);
	_form.form('close');
}




//增加套餐Sku
function creatSuitSku(){
	var wraper = $("#Wraper_giftBag_manage");
	var _form =  $("#Form_suit",wraper);
	var suitSkuId = _form.find("input[name='suitSkuId']").val();
	var suitSkuName = _form.find("div[name='suitSkuName']").html();
	var flag = _form.form('validateAll');
	
	if(!flag){
		return false;
	}
	var object = $("div[name='suitSku']",wraper).data("suitSku");
	
	if(suitSkuName==''){
		$.jRadMessage({level:'error',message:"请先点击查询按钮",selector:$("#Form_suit",wraper)});
		return;
	}
	if(suitSkuId!=''){
			if(object.suitSkuId!=null){
				$.jRadMessage({level:'error',message:"套装Sku只能选择一种",selector:$("#Form_suit",wraper)});
				return;
			}
	}
	var suitSkuName = _form.find("div[name='suitSkuName']").html();
	var info = {"suitSkuId":suitSkuId};
	var _div = $("<div>").addClass("classSpan").html(suitSkuName);
	var _span = $("<span>").addClass("delspan delClass").html("X").attr("title","移除").data("info",info);
	$("div[name='suitSku']",wraper).data("suitSku",info);
	$("#suit_check_string",wraper).append(_div.append(_span));
	_form.form('close');
}
//打开编辑页面，查询该Id的信息
function updateGiftView(id,wraper){
	var item = $.jRadGet({url:'/ycbmall-manager-ws/ws/0.1/giftBagCms/getGiftBag?id='+id});
	 initGiftBagInfo(wraper);
	 $('.jrad-table',wraper).slideUp();
	 $('.details-box',wraper).slideDown(); 
	 $(".scroll-up-btn").click();
	 item.id = id;
	 $('#Form_giftBag_manage',wraper).form({item: item});
	 $("#Form_giftBag_manage", wraper).find("input[name='updateOrAdd']").val('update');
	 form_giftBag_manage(item,wraper);
}
//编辑页面回显数据
function form_giftBag_manage(item,wraper){
		//图片
		showPicBanner(item,wraper);
		//地区
		showArea(item,wraper);
		
		//单品Sku
		var skuList = item.skuIds;
		$("#Form_giftBag_manage div[name='skuLists']",wraper).data('skuList',skuList);
		addSkuList(skuList,wraper);
		
		var info = {"suitSkuId":item.suitSkuId};
		var _div = $("<div>").addClass("classSpan").html(item.suitSkuName);
		var _span = $("<span>").addClass("delspan delClass").html("X").attr("title","移除").data("info",info);
		$("div[name='suitSku']",wraper).data("suitSku",info);
		$("#suit_check_string",wraper).append(_div.append(_span));
		$("input[name='mediumType'][value="+item.mediumType+"]").attr("checked",true);
}
//回显图片的函数
function showPicBanner(item,wraper){
	   var _ul = $("div[name='giftBannerPicFile']",wraper).children(".pic-show");
	   var _ul1 = $("div[name='picGiftUrlFile']",wraper).children(".pic-show"); 
	   var src = item.smallBannerUrl;
	   var srcBig = item.picBannerUrl;
	   var src1 = item.smallGiftUrl;
	   var srcBig1 = item.picGiftUrl;
	   if(src!=undefined&&src!=""){ 
		  var _li = '<li name="" class="bannerPicBoxli"><div class="fileUrl-pic"><div class="pic-box"><div class="pic-content"><div class="pic-vc">'
					+'<a class="file cboxElement"  title="" href="'+srcBig+'" ><img src="'+src+'"></a>'
					+'</div></div><span name="small" class="del-btn"></span></div></div></li>'
		  _ul.html(_li); 
		  $(".file",wraper).colorbox({rel: 'file',close:'x',maxWidth: '70%',maxHeight: '70%',previous:'<i class="icon-font-arrow-left"></i>',next:'<i class="icon-font-arrow-right"></i>'});
		  $(".bannerPicBoxli .del-btn",wraper).click(function(){
				var small = $(this).prev(".pic-content").find("img").attr("src");
				$(this).parents(".bannerPicBoxli").remove(); 
				$("input[name='picBannerUrl']",wraper).val("");
				$("input[name='middleBannerUrl']",wraper).val("");
				$("input[name='smallBannerUrl']",wraper).val(""); 
		  });
	   }
	   if(src1!=undefined&&src1!=""){ 
			  var _li1 = '<li name="" class="giftPicBoxli"><div class="fileUrl-pic"><div class="pic-box"><div class="pic-content"><div class="pic-vc">'
						+'<a class="file cboxElement"  title="" href="'+srcBig1+'" ><img src="'+src1+'"></a>'
						+'</div></div><span name="small" class="del-btn"></span></div></div></li>'
			  _ul1.html(_li1); 
			  $(".file").colorbox({rel: 'file',close:'x',maxWidth: '70%',maxHeight: '70%',previous:'<i class="icon-font-arrow-left"></i>',next:'<i class="icon-font-arrow-right"></i>'});
			  $(".giftPicBoxli .del-btn",wraper).click(function(){
					var small = $(this).prev(".pic-content").find("img").attr("src");
					$(this).parents(".giftPicBoxli").remove(); 
					$("input[name='picGiftUrl']",wraper).val("");
					$("input[name='middleGiftUrl']",wraper).val("");
					$("input[name='smallGiftUrl']",wraper).val("");   
			  });
	   }
}
//显示地区
function showArea(item,wraper){
	   var areaList = item.regions; 
	   $.each(areaList,function(i){
	       if(areaList[i].areaList.length==0){
		    areaList[i].areaList=[{"areaCodeId":"0"}];
		   }
	   });
	   $("#Form_giftBag_manage div[name='regions']",wraper).data('areaList',areaList); 
	   addAreaList(areaList,wraper);
	
}

//初始化一些参数的值
function initGiftBagInfo(wraper){
	
	//Banner图
	var _ul = $("div[name='giftBannerPicFile']",wraper).children(".pic-show"); 
	_ul.html("");
	//礼品展示图
	var _ul1 = $("div[name='picGiftUrlFile']",wraper).children(".pic-show"); 
	_ul1.html(""); 
	$("#Form_giftBag_manage div[name='regions']",wraper).data("areaList",[]);
	$("#Form_giftBag_manage #area_check_string",wraper).html("");
	$("#Form_giftBag_manage div[name='suitSku']",wraper).data("suitSku",{});
	$("#Form_giftBag_manage #suit_check_string",wraper).html("");
	$("#Form_giftBag_manage div[name='skuLists']",wraper).data("skuList",[]);
	$("#Form_giftBag_manage #sku_check_string",wraper).html("");
}
//在div中展示单品sku
function addSkuList(array,wraper){
	$("#sku_check_string",wraper).html(""); 
	  $.each(array,function(){
		  var showClass = this.skuName;
		  var showId = this.skuId;
		  var info = {"skuId":showId};  
		  var _div = $("<div>").addClass("classSpan").html(showClass);
		  var _span = $("<span>").addClass("delspan delClass").html("X").attr("title","移除").data("info",info);
		  $("#sku_check_string",wraper).append(_div.append(_span));
		  
	 });  
}
//根据礼包Id查询详细信息
function getIntroduceParams(introduceId,wraper){
	
	if(introduceId==''){
		var item ={};
	}else{
		var item =  $.jRadGet({
			url: '/ycbmall-manager-ws/ws/0.1/giftBagCms/getGiftBagIntroduce?introduceId=' + introduceId
		});
	}
	
	$('#Form_giftIntroduce_manage',wraper).form({
		layout: 'grid',
		item:item,
		autobinding: false
	});
	

	
}

//清空礼包基本信息一些信息
function clearGiftInfo(wraper){
	$(".details-tab:eq(0) .f-left:first", wraper).click();
	//PS：我也不知道为啥注释掉这一块就不报错了
//	$("#basicInfo_giftIntroduce", wraper).form({
//		item: {}
//	});
//	
	giftsBasicAttrFlag = false;
	giftsIntroduceFlag = false;
	$("#Form_giftBag_manage input[name='mediumType']",wraper).attr("checked",false);
	$("#Form_giftBag_manage", wraper).find("input[name='updateOrAdd']").val('add');
	$("#giftInfo_introduce", wraper).html('<table id="Table_giftIntroduce_list"></table>');
	
}
//清空礼包介绍一些信息
function clearGiftIntroduce(wraper){
	$('#Form_giftIntroduce_manage .details-box', wraper).slideDown();
	$('#Form_giftIntroduce_manage div.tabReleForm',wraper).hide();
	$('#Form_giftIntroduce_manage #basicInfo_giftIntroduce', wraper).show();
	$("#Form_giftIntroduce_manage .details-tab .f-left:first", wraper).click();
	$('#Form_giftIntroduce_manage .details-tab .tab-cur', wraper).removeClass('tab-cur');
	$("#Form_giftIntroduce_manage .details-tab .f-left:first", wraper).addClass('tab-cur');

	$('#Form_giftIntroduce_manage div#carType_giftIntroduce', wraper).html('<table id="Table_bindCarType_list"></table>');
}

function giftIntroduceTable(id,wraper){
	var _str = '<div><span id="addGiftIntroduce" class="jrad-btn-primary jrad-form-element ui-btn-primary" style="display:inline-block;margin-bottom:10px;"><span class="ui-btn-primary-content">新增礼包介绍</span></span></div>'
		$("#giftInfo_introduce", wraper).html(_str + '<table id="Table_giftIntroduce_list"></table>');
		$.ajax({
			url: '/ycbmall-manager-ws/ws/0.1/giftBagCms/getIntroduceLists?giftBagId=' + id,
			method: 'get',
			success: function(data) {
				var str = '';
				str += '<tr><th>ID</th><th>礼包介绍名称</th><th>操作</th></tr>';
				if (data.introduceLists == '') {
					$('#Table_giftIntroduce_list', wraper).append(str + '<tr><td colspan="10">暂无符合条件的记录</td></tr>');
					return false
				}
				$.each(data.introduceLists, function(i) {
					var skuStr = '';
					str += '<tr>' + '<td class="introduceId">' + data.introduceLists[i].introduceId + '</td>' + '<td>' + data.introduceLists[i].introduceName + '</td>'

						+'<td><a href="javascript:" class="editGiftBagIntroduce">编辑</a></td>' + '</tr>';
				});
				$('#Table_giftIntroduce_list', wraper).append(str)
			}
		});
}

function giftBindCarTypeTable(introduceId,wraper){
	
	var page_column_model_c = new Array();
	var page_list_buttons_c = new Array();


	page_column_model_c.push({
		display: '品牌',
		name: 'brandName'
	});
	page_column_model_c.push({
		display: '车厂',
		name: 'factoryName'
	});
	page_column_model_c.push({
		display: '车系',
		name: 'modelName'
	});
	page_column_model_c.push({
		display: '车型',
		name: 'styleName'
	});

	$('#Form_giftIntroduce_brand',wraper).form({
		title: '绑定车型选择',
		fields_params: {
			'vendor': {
				data: [{
					id: '全部',
					name: '全部'
				}]
			}
		},
		height: 450
	});

	
	page_list_buttons_c.push({
		name: 'edit',
		title: '编辑',
		bclass: 'edit',
		onpress: function() {
			try {
				$("#Form_service_brand .jrad-tree", wraper).tree('destroy');
			} catch (e) {}
			var treeOption = setBrandTree(wraper);
			$("#Form_service_brand .jrad-tree", wraper).tree(treeOption);
			var itemTree = $.jRadGet({
				url: '/ycbmall-manager-ws/ws/0.1/giftBagCms/getCarStyle?introduceId=' + introduceId
			});
			var data = {};
			if (itemTree.length == 1 && itemTree[0].brandId == "0") {} else {
				$.each(itemTree, function(i, json) {
					$.each(json.factories, function() {
						var factoryNode = $("#Form_service_brand .jrad-tree", wraper).tree('getNodeByParam', 'id', this.factoryId);
						$("#Form_service_brand .jrad-tree", wraper).tree('open', factoryNode, true);
						var pNode = factoryNode.getParentNode();
						$("#Form_service_brand .jrad-tree", wraper).tree('open', pNode, true);
					})
				});
			}

			if (itemTree.length == 1 && itemTree[0].brandId == '0') {
				data = {
					"vendor": "全部"
				}
			}

			$('#Form_service_brand', wraper).form({
				item: data,
				url: '/ycbmall-manager-ws/ws/0.1/giftBagCms/editCarStyleInfo',
				before_submit: function(json) {
					json.introduceId = introduceId;
					json.operator = carsmart_config.operatorName;
					var vendor = $('#Form_service_brand div[name="vendor"]', wraper).checkbox('val');
					var brandArr = [];
					if (vendor.length == 0 || vendor[0] == "") {
						var treeObj = getZtreeObj(wraper);
						var brandFilter = function(node) {
							return (node.level == 1 && node.checked == true);
						}
						var brandNodes = treeObj.getNodesByFilter(brandFilter);
						$.each(brandNodes, function() {
							var brandJson = {};
							brandJson.brandId = this.id;
							brandJson.factories = [];
							var factoryFilter = function(node) {
								return (node.level == 2 && node.checked == true && node.brandId == brandJson.brandId);
							}
							var factoryNodes = treeObj.getNodesByFilter(factoryFilter);
							$.each(factoryNodes, function(i) {
								var factoryJson = {};
								factoryJson.factoryId = factoryNodes[i].id;
								factoryJson.models = [];
								var modelFilter = function(node) {
									return (node.level == 3 && node.checked == true && node.factoryId == factoryJson.factoryId);
								}
								var modelNodes = treeObj.getNodesByFilter(modelFilter);
								$.each(modelNodes, function(j) {
									var modelJson = {};
									modelJson.modelId = modelNodes[j].id;
									var styleIdStr = '';
									var styleIdArr = [];
									var styleFilter = function(node) {
										return (node.level == 4 && node.checked == true && node.modelId == modelJson.modelId);
									};
									var styleNodes = treeObj.getNodesByFilter(styleFilter);
									$.each(styleNodes, function(k) {
										styleIdArr.push(styleNodes[k].id)
									});
									styleIdStr = styleIdArr.join(',');
									modelJson.styleIdStr = styleIdStr;
									factoryJson.models.push(modelJson)
								});
								brandJson.factories.push(factoryJson)
							});
							brandArr.push(brandJson);
						});
					} else {
						brandArr = [{
							brandId: '0',
							factories: [{
								factoryId: '0',
								models: [{
									modelId: '0',
									styleIdStr: '0'
								}]
							}]
						}]
					}
					json.brands = brandArr;
					delete json.vendor;
					return json
				},
				success_callback: function() {
					$('#Table_bindCarType_list').flexMessage('编辑成功', 'success');
					$('#Table_bindCarType_list').flexReloadCurrentPage();
				},
				error: function(xhr) {
					var errormsg = eval("(" + xhr.responseText + ")");
					$.jRadMessage({
						level: 'error',
						message: errormsg[0].message
					})
				}
			}).form('open');
			setTimeout(check, 600);

			function check() {
				if (itemTree.length == 1 && itemTree[0].brandId == '0') {} else {
					var treeObj = getZtreeObj(wraper);
					$.each(itemTree, function(i) {
						var brandId = itemTree[i].brandId;
						$.each(this.factories, function() {
							var factoryId = this.factoryId;
							$.each(this.models, function() {
								var styleIdArr = this.styleIdStr.split(',');
								var modelId = this.modelId;
								$.each(styleIdArr, function(j) {
									var styleId = styleIdArr[j];
									var styleFilter = function(node) {
										return (node.level == 4 && node.id == styleId && node.modelId == modelId);
									}
									var styeNode = treeObj.getNodesByFilter(styleFilter, true);
									treeObj.checkNode(styeNode, true, true)
								})
							})
						})
					})
				}
			};
			$('#Form_service_brand span.jrad-btn-primary,#Form_service_brand span.jrad-btn-normal,#Form_service_brand .pop-up-close', wraper).bind('click', function() {
				$('body').append('<div id="formBackground" class="overcurtainDiv" style="z-index: 303; display: block;"></div>')
			})
		}
	});
	page_list_buttons_c.push({
		name: 'delete',
		title: '删除',
		bclass: 'delete',
		prefunc: function() {
			var checked = $('#Table_bindCarType_list').getCheckedTrs();
			if (checked.length == 0) {
				return false;
			}
		},
		onpress: function() {
			var checked = $('#Table_bindCarType_list').getCheckedTrs();
			var delArr=[];
			var introduceStyleRelIdStr='';
			checked.forEach(function(key,i){
				delArr.push(key.introduceStyleRelId)
			});
			introduceStyleRelIdStr=delArr.join(',');
			if (checked[0]) {
				$.jRadPost({
					url: '/ycbmall-manager-ws/ws/0.1/giftBagCms/deleteIntroduceStyleRels?introduceStyleRelIdStr=' + introduceStyleRelIdStr,
					success: function() {
						$('#Table_bindCarType_list').flexMessage('删除成功', 'success');
						$('#Table_bindCarType_list').flexReloadCurrentPage()
					},
					error: function(xhr) {
						var errormsg = eval("(" + xhr.responseText + ")");
						$.jRadMessage({
							level: 'error',
							message: errormsg[0].message
						})
					}
				})
			}
		}
	});

	$('#Table_bindCarType_list', wraper).flexigrid({
		colModel: page_column_model_c,
		buttons: page_list_buttons_c,
		searchitems: [],
		url: '/ycbmall-manager-ws/ws/0.1/giftBagCms/queryIntroduceStyleRels?introduceId=' + introduceId,
		method: 'get',
		showSearch: true,
		onError: showGiftBagError,
		pagination: {
			diaplay_pages: 5,
			align: 'bottom'
		},
		overflow: true
	});
}



//显示错误信息的函数
function showGiftBagError(xhr){
	 var errormsg = eval("(" + xhr.responseText + ")");
	  var cDiv = $("#Wraper_giftBag_manage .cDiv");
	  $.jRadMessage({level:'error',message:errormsg[0].message,selector:cDiv});
	} 