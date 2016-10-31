$(document).ready(function(){ 
    var wraper = $('#Wraper_ads_manage');
    var page_column_model = new Array();
    var page_search_items = new Array();
    var page_list_buttons = new Array();
	 	
	var entityModel = {};
    var jRad = $.jRad({app:'radsample-ws',entityModel:entityModel}); 
    jRad.validators['title'] = [{"msg":"标题不能为空","type":"min","value":"1"}];
	jRad.validators['osInfo'] = [{"msg":"平台不能为空","type":"min","value":"1"}];
	jRad.validators['location'] = [{"msg":"广告位不能为空","type":"min","value":"1"}]; 
	jRad.validators['startDate'] = [{"msg":"广告显示开始时间不能为空","type":"min","value":"1"}]; 
	jRad.validators['endDate'] = [{"msg":"广告显示结束时间不能为空","type":"min","value":"1"}];
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
	
	var fields_params = {}; 
	fields_params['title'] = {grid: 9}; 
	fields_params['turnToUrl'] = {grid: 9}; 
	fields_params['osInfo'] ={data:[
		{"id":"1",name:"IOS"},
		{"id":"2",name:"Android"}
	]};   

	fields_params['location'] = {
		data:[
			    {id:'1',name:'首页'},
			    {id:'2',name:'限量购'},
			    {id:'3',name:'专享'},
			    {id:'4',name:'团购'}
			 ]
	}

	fields_params['status'] ={ data:[ 
		{id:'1',name:'有效'},
		{id:'0',name:'无效'}
	]};     
	var _form = $("#Form_ads_manage",wraper);
	fields_params['adPicFile'] = {
		url:'/ycbmall-manager-ws/ws/0.1/file/uploadThree',
		delFunc: function(item){
		   item.list.remove();
		   $("input[name='adPicAddress']",_form).val("");
		   $("input[name='adPicMiddleAddress']",_form).val("");
		   $("input[name='adPicSmallAddress']",_form).val(""); 
		},
		fileName:"file",
		note: '仅支持 JPG和PNG图片文件,图片大小640*150',
		show: false,
		params: {type:""},
		success: function(data){ 
		   if(data[0]&&data[0].code=="400"){
		     $.jRadMessage({level:'error',message:data[0].message});
		   }else{
		   $("input[name='adPicAddress']",_form).val(data.fileUrl);
		   $("input[name='adPicMiddleAddress']",_form).val(data.middleUrl);
		   $("input[name='adPicSmallAddress']",_form).val(data.smallUrl); 
		   }
		},
	   beforeSubmit: function(obj){
		  var re = /^.*\.(jpg|JPG|png|PNG)$/;
		  if(re.test(obj.val())){
			return true;
		  }else{  
			$.jRadAlert("只能上传jpg和PNG文件", "error");
			$("div[name='adPicFile']",_form).find("input[type='file']").val('');
			return false;
		  }
		},
		single: true,
		showInfo:false,
		prev:'fileUrl'
	};
	fields_params['startDate'] = {
			grid:4,
	    	dateFmt:'yyyy-MM-dd HH:mm:ss',
	}; 
	fields_params['endDate'] = {
			grid:4,
	    	dateFmt:'yyyy-MM-dd HH:mm:ss',
	}; 
	page_column_model.push({display: 'ID', name : 'id',width:50});
    page_column_model.push({display: '活动名称', name : 'title'});
    page_column_model.push({display: '广告位', name : 'locationName'}); 
    page_column_model.push({display: '平台', name : 'onInfoName'}); 
	page_column_model.push({display: 'banner图', name : 'adPicSmallAddress',width:80,diy:function($row,$div){
			var imgUrl = $row.adPicSmallAddress;
			if(imgUrl!=undefined&&imgUrl!=""){
			var $img = $('<img width="50" height="50" src="'+imgUrl+'" />');
			$div.height(50);
			$div.append($img);
			}
		}});
    page_column_model.push({display: '显示开始时间', name : 'startDate'});
    page_column_model.push({display: '显示结束时间', name : 'endDate'});
    page_column_model.push({display: 'url', name : 'turnToUrl'});
    page_column_model.push({display: '前台排序', name : 'sequence'});
    page_column_model.push({display: '地区', name : 'regionName',width:200});  
	page_column_model.push({display: '状态', name : 'statusName'});
	page_column_model.push({display: '操作人', name : 'operator'});
    
	page_search_items.push({row:'1',type:'jrad-input',display:'活动ID',name:'id'});
	page_search_items.push({row:'1',type:'jrad-input',display:'活动名称',name:'title'});
	page_search_items.push({row:'1',type:'jrad-select',display:'活动状态',name:'status',params:{
		  data:[
		    {id:'',name:'全部'},
		    {"id":"0",name:"无效"},
			{"id":"1",name:"有效"} 
		  ]
		}}); 
	page_search_items.push({row:'2',type:'jrad-select',display:'广告位',name:'location',params:{
		  data:[
		    {id:'',name:'全部'},
		    {id:'1',name:'首页'},
		    {id:'2',name:'限量购'},
		    {id:'3',name:'专享'},
		    {id:'4',name:'团购'}
		  ]
		}}); 
	page_search_items.push({row:'2',type:'jrad-select',display:'省',name:'provinceId',params:jRad.params['provinceCodeSearch']});
	page_search_items.push({row:'2',type:'jrad-select',display:'市',name:'areaCodeId',params:jRad.params['areaCodeSearchId']});
	page_search_items.push({row:'3',type:'jrad-checkbox',display:'平台',name:'osInfo',grid:5,params:{ 
	  data:[
	    {"id":"1",name:"IOS"},
		{"id":"2",name:"Android"}
	  ]
	}});
    $('#Form_ads_manage .jrad-btn-normal',wraper).button({
		click: function(){
			$('.details-box',wraper).slideUp();
			$('.jrad-table',wraper).slideDown(); 
			$(".scroll-up-btn").click();
		}
	});  
	$('#Form_ads_manage .jrad-btn-primary',wraper).button({
		click: function(){
			var flag = $('#Form_ads_manage',wraper).form('validateAll');
			var json = $('#Form_ads_manage',wraper).form('getValue'); 
			var adRemarks = json.adRemarks;
			var remarkFlag = true;
			if(!flag) {
			   return;
			}  
			if(!remarkFlag){
			   return;
			} 
			json.osInfo = json.osInfo.join(",");
			json.location = json.location;
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
			delete json.adPicFile;

			if($(".details-box .details-tab",wraper).find("span[name='title']").html()=="广告添加"){
			$.jRadPost({
				    	url:'/ycbmall-manager-ws/ws/0.1/AdvertisingCms/addAdvertising',
				    	data:json,
				    	success:function(){
				    		$('.details-box',wraper).slideUp();
							$('.jrad-table',wraper).slideDown();  
							$(".scroll-up-btn").click();
							$('#Table_ads_manage').flexMessage('创建成功', 'success');
							$('#Table_ads_manage').flexReload();
				    	},error:function(data){
				    		var mes = eval('('+data.responseText+')');
				    			$.jRadMessage({
					    			 level:'error', 
				    				 message:mes[0].message 
					    		 })
				    	}
				    });
		 }else{
			$.jRadPost({
				    	url:'/ycbmall-manager-ws/ws/0.1/AdvertisingCms/editAdvertising',
				    	data:json,
				    	success:function(){
				    		$('.details-box',wraper).slideUp();
							$('.jrad-table',wraper).slideDown();  
							$(".scroll-up-btn").click();
							$('#Table_ads_manage').flexMessage('修改成功', 'success');
							$('#Table_ads_manage').flexReload();
				    	},error:function(data){
				    		var mes = eval('('+data.responseText+')');
				    			$.jRadMessage({
					    			 level:'error', 
				    				 message:mes[0].message 
					    		 })
				    	}
				    });
		 		}
			}	 
	});  
//	}); 
	$('#Form_ads_manage',wraper).form({
		validators: jRad.validators,
		fields_params:fields_params,
		layout: 'grid', 
		autobinding: false
	 }); 
	
	var readonlyFields2 = {};
	readonlyFields2['users'] = false; 
	page_list_buttons.push({title: '创建',name:'Add', bclass: 'add',onpress : function(){
			 initAdsInfo(wraper); 
			 $('#Form_ads_manage',wraper).form({item:{'adTurnType':'0'}}); 
			 $(".details-box .details-tab",wraper).find("span[name='title']").html("广告添加");
			 $('.jrad-table',wraper).slideUp();
			 $('.details-box',wraper).slideDown();
			 $(".scroll-up-btn").click();
        }
    });
	var readonlyFields = {};
	readonlyFields['users'] = true; 
	page_list_buttons.push({title: '修改',name:'Edit', bclass: 'edit',prefunc:function(){
            var checked = $('#Table_ads_manage').getCheckedTrs();
            if (checked.length != 1) {return false;}else{return true;}
        },onpress : function(){
            var checked = $('#Table_ads_manage').getCheckedTrs(); 
            if(checked[0]) {
			     var id = checked[0].id;
                 updateAdsView(id,wraper);
            }
        }
    }); 
	
	
	
  
//	page_list_buttons.push({name:'delete',bclass: 'delete',prefunc:function(){
//            var checked = $('#Table_ads_manage').getCheckedTrs();
//            if (checked.length != 1) {return false;}else{return true;}
//        },onpress : function(){
//	    	var checked = $('#Table_ads_manage').getCheckedTrs();
//			$.jRadConfirm('确认删除吗？',1,function(){
//				var id =  checked[0].id; 
//				$.jRadAjax({
//				    type:'post',
//					url:'/ycbmall-manager-ws/ws/0.1/AdvertisingCms/deleteAdvertising?id='+id, 
//					success: function(){
//						$('#Table_ads_manage').flexMessage('删除成功!', 'success');
//           	    		$('#Table_ads_manage').flexReload();
//					},
//					error:function(xhr){
//					    var errormsg = eval("(" + xhr.responseText + ")"); 
//						if (errormsg != undefined) {
//							$('#Table_ads_manage').flexMessage(errormsg[0].message, 'error');
//						}
//					}
//				});
//			});
//		}
//	});
//	page_list_buttons.push({displayname: '设为无效',name:'unUse',bclass: 'unUse',prefunc:function(){
//            var checked = $('#Table_ads_manage').getCheckedTrs();
//            if (checked.length == 0) {return false;}else{return true;}
//        },onpress : function(){
//	    	var checked = $('#Table_ads_manage').getCheckedTrs();
//			$.jRadConfirm('确认设置为无效吗？',1,function(){
//				var idArr = [];
//				$.each(checked,function(){
//				idArr.push(this.id);
//				}); 
//				idArr.join(",");
//				$.jRadAjax({
//				    type:'post',
//					url:'/ycbmall-manager-ws/ws/0.1/AdvertisingCms/setAdvertisingsStatus?idString='+idArr+"&status=0" ,
//					success: function(){
//						$('#Table_ads_manage').flexMessage('操作成功!', 'success');
//           	    		$('#Table_ads_manage').flexReload();
//					},
//					error:function(xhr){
//					    var errormsg = eval("(" + xhr.responseText + ")"); 
//						if (errormsg != undefined) {
//							$('#Table_ads_manage').flexMessage(errormsg[0].message, 'error');
//						}
//					}
//				});
//			});
//		}
//	});
	 
    page_list_buttons.push({separator: true}); 
	$('#Table_ads_manage').flexigrid({
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
			url:'/ycbmall-manager-ws/ws/0.1/AdvertisingCms/queryAdvertisinge',
			onError:showAdsError,
			overflow:true
	});   
	  
	var _span7=$('div.searchButtons',wraper).parent().removeClass('span14').addClass('span20');
    var _div=$('<div>').addClass('row-fluid').append(_span7);
    $('div.searchContent',wraper).append(_div);
	
	$(".searchButtons .ui-btn-icon:first",wraper).unbind('click');
	$(".searchButtons .ui-btn-icon:first",wraper).click(function(){
			 $('#Table_ads_manage',wraper).flexOptions({url:'/ycbmall-manager-ws/ws/0.1/AdvertisingCms/queryAdvertisinge'});
			 $('#Table_ads_manage',wraper).flexReloadSearch();
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
			$('#Table_ads_manage').flexOptions({
						url:'/ycbmall-manager-ws/ws/0.1/AdvertisingCms/queryAdvertisinge',
						queryParam:{},
						page:0});
			$('#Table_ads_manage').flexReloadSearch();
	}); 
	
	$(".details-tab .return",wraper).click(function(){
		$('.details-box',wraper).slideUp();
		$('.jrad-table',wraper).slideDown(); 
		$(".scroll-up-btn").click();
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
	});

function initAdsInfo(wraper){
		//前台排序为0就只读状态
		$('#Form_ads_manage div[name="status"]').select('readonly',false);
	   //广告图
	   var _ul = $("div[name='adPicFile']",wraper).children(".pic-show"); 
	   _ul.html(""); 
	  //地区
	   $("#Form_ads_manage div[name='regions']",wraper).data("areaList",[]); 
	   $("#Form_ads_manage #area_check_string",wraper).html("");   
}
//修改时赋值
function Form_ads_manageVal(wraper,item){ 
//   $("#serviceNames",wraper).html(item.serviceName);
   var _ul = $("div[name='adPicFile']",wraper).children(".pic-show"); 
   var src = item.adPicSmallAddress;
   var srcBig = item.adPicAddress;
   if(src!=undefined&&src!=""){ 
	  var _li = '<li name="" class="adsPicBoxli"><div class="fileUrl-pic"><div class="pic-box"><div class="pic-content"><div class="pic-vc">'
				+'<a class="adsFile cboxElement"  title="" href="'+srcBig+'" ><img src="'+src+'"></a>'
				+'</div></div><span name="small" class="del-btn"></span></div></div></li>'
	  _ul.html(_li); 
	  $(".adsFile",wraper).colorbox({rel: 'file',close:'x',maxWidth: '70%',maxHeight: '70%',previous:'<i class="icon-font-arrow-left"></i>',next:'<i class="icon-font-arrow-right"></i>'});
	  $(".adsPicBoxli .del-btn").click(function(){
			var small = $(this).prev(".pic-content").find("img").attr("src");
			$(this).parents(".adsPicBoxli").remove(); 
		    $("input[name='adPicAddress']",wraper).val("");
		    $("input[name='adPicMiddleAddress']",wraper).val("");
		    $("input[name='adPicSmallAddress']",wraper).val("");  
	  });
	 } 
   //地区
   var areaList = item.regions; 
   $.each(areaList,function(i){
       if(areaList[i].areaList.length==0){
	    areaList[i].areaList=[{"areaCodeId":"0"}];
	   }
   });
   $("#Form_ads_manage div[name='regions']",wraper).data('areaList',areaList); 
   addAreaList(areaList,wraper);
}

function updateAdsView(id,wraper){ 
	 $('#Form_ads_manage div[name="status"]').select('readonly',false);
	 var item = $.jRadGet({url : '/ycbmall-manager-ws/ws/0.1/AdvertisingCms/detailAdvertising?id='+id}); 	 
	 $(".details-box .details-tab",wraper).find("span[name='title']").html("广告修改"); 
	 initAdsInfo(wraper);  
	 $('.jrad-table',wraper).slideUp();
	 $('.details-box',wraper).slideDown(); 
	 $(".scroll-up-btn").click();  
	 $('#Form_ads_manage',wraper).form({item: item});  
	 if(item.sequence==0){
		 $('#Form_ads_manage div[name="status"]').select('readonly',true);
	 }
	 item.id = id;
	 item.osInfo = item.osInfo.split(",");
	 item.location = item.location;
	 $('#Form_ads_manage',wraper).form({item: item});  
	 Form_ads_manageVal(wraper,item); 
} 
function showAdsError(xhr){
	 var errormsg = eval("(" + xhr.responseText + ")");
	  var cDiv = $("#Wraper_ads_manage .cDiv");
	  $.jRadMessage({level:'error',message:errormsg[0].message,selector:cDiv});
	} 
