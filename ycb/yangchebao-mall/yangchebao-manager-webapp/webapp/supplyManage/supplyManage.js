$(document).ready(function(){ 
    var wraper = $('#Wraper_supply_manage');
    var page_column_model = new Array();
    var page_search_items = new Array();
    var page_list_buttons = new Array();
	 	
	var entityModel = {};
    var jRad = $.jRad({app:'radsample-ws',entityModel:entityModel}); 
    jRad.validators['name'] = [{"msg":"供应商名称不能为空","type":"min","value":"1"}];
	jRad.validators['linkman'] = [{"msg":"联系人不能为空","type":"min","value":"1"}];
	jRad.validators['contactPhone'] = [{"msg":"联系电话不能为空","type":"min","value":"1"}];
	jRad.validators['address'] = [{"msg":"详细地址不能为空","type":"min","value":"1"}];
	
	
    jRad.params['classCodeSearch'] = {
    		urlData:{
				url:'/ycbmall-manager-ws/ws/0.1/classificationCms/getClassificationsByParentIdV2?parentId=-1&level=1'
			},
			unshiftData: {id:'0',name:'请选择'}
    	}; 
	
	var fields_params = {};
	fields_params['contactPhone'] = {grid:10};  
	fields_params['address'] = {grid:10};  
	fields_params['remark'] = {grid:10};
	fields_params['status'] ={data:[
		{"id":"1",name:"合作中"},
		{"id":"0",name:"已解约"},
		
	]};
	var bankList = $.jRadGet({
		url: '/ycbmall-manager-ws/ws/0.1/bank/getBankList'
	});
	fields_params['bankName'] = {
			  data:bankList,
		      queryParam:'name',
		      fl: 'name',
		      displayField:'name',
		      grid:7,
		      response: function(data){
		        return data;
		      }
		      
	};
	
	var _form = $("#Form_supply_manage",wraper);

	
	page_column_model.push({display: 'ID', name : 'id',width:50});
    page_column_model.push({display: '供应商名称', name : 'name'});
    page_column_model.push({display: '供货品类', name : 'supplyClassName'}); 
    page_column_model.push({display: '覆盖范围', name : 'regionName'}); 

    page_column_model.push({display: '合作状态', name : 'statusName'});
    page_column_model.push({display: '联系人', name : 'linkman'});
    page_column_model.push({display: '联系电话', name : 'contactPhone',width:200});  
	page_column_model.push({display: '创建时间', name : 'created'});
	page_column_model.push({display: '操作人', name : 'operator'});
    
	page_search_items.push({row:'1',type:'jrad-input',display:'供应商ID',name:'id'});
	page_search_items.push({row:'1',type:'jrad-input',display:'供应商名称',name:'name'});
	page_search_items.push({row:'1',type:'jrad-select',display:'供货品类',name:'',params:jRad.params['classCodeSearch']}); 
	page_search_items.push({row:'2',type:'jrad-select',display:'合作状态',name:'status',params:{
		  data:[
		    {id:'',name:'全部'},
		    {id:'1',name:'合作中'},
		    {id:'0',name:'已解约'}
		  ]
		}}); 
	
    $('#Form_supply_manage .jrad-btn-normal',wraper).button({
		click: function(){
			$('.details-box',wraper).slideUp();
			$('.jrad-table',wraper).slideDown(); 
			$(".scroll-up-btn").click();
		}
	});  
    
	$('#Form_supply_manage .jrad-btn-primary',wraper).button({
		click: function(){
			var flag = $('#Form_supply_manage',wraper).form('validateAll');
			var json = $('#Form_supply_manage',wraper).form('getValue'); 
			
			var remarkFlag = true;
			if(!flag) {
			   return;
			}  
			if(!remarkFlag){
			   return;
			} 
			
			json.operator = carsmart_config.operatorName;
			json.regions = []; 
			var regions = $("div[name='regions']",wraper).data("areaList");
			if(regions.length==0){
			 $.jRadMessage({level:'error',message:"请选择要绑定的覆盖范围。"});
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
			json.supplyClasses = [];
			var classIds = $("div[name='classifies']",wraper).data("classList"); 
			if($(".details-box .details-tab",wraper).find("span[name='title']").html()=="供应商添加"){
				$.each(classIds,function(){
					var classificationId = {};
					classificationId.classificationId=this.classificationId;
					json.supplyClasses.push(classificationId);
				});
			}else{
				$.each(classIds,function(){
					var classificationId = {};
					classificationId.classificationId=this.classificationId;
					classificationId.supplyClassRelId=this.supplyClassRelId;
					json.supplyClasses.push(classificationId);
				});
			}
			
			

			if($(".details-box .details-tab",wraper).find("span[name='title']").html()=="供应商添加"){
			$.jRadPost({
				    	url:'/ycbmall-manager-ws/ws/0.1/supplyCms/addSupply',
				    	data:json,
				    	success:function(){
				    		$('.details-box',wraper).slideUp();
							$('.jrad-table',wraper).slideDown();  
							$(".scroll-up-btn").click();
							$('#Table_supply_manage').flexMessage('创建成功', 'success');
							$('#Table_supply_manage').flexReload();
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
				    	url:'/ycbmall-manager-ws/ws/0.1/supplyCms/editSupply',
				    	data:json,
				    	success:function(){
				    		$('.details-box',wraper).slideUp();
							$('.jrad-table',wraper).slideDown();  
							$(".scroll-up-btn").click();
							$('#Table_supply_manage').flexMessage('修改成功', 'success');
							$('#Table_supply_manage').flexReload();
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
	$('#Form_supply_manage',wraper).form({
		validators: jRad.validators,
		fields_params:fields_params,
		layout: 'grid', 
		autobinding: false
	 }); 
	
	var readonlyFields2 = {};
	readonlyFields2['users'] = false; 
	page_list_buttons.push({title: '创建',name:'Add', bclass: 'add',onpress : function(){
			 initSupplyInfo(wraper); 
			 $('#Form_supply_manage',wraper).form({item:{'adTurnType':'0'}}); 
			 $(".details-box .details-tab",wraper).find("span[name='title']").html("供应商添加");
			 $('.jrad-table',wraper).slideUp();
			 $('.details-box',wraper).slideDown();
			 $(".scroll-up-btn").click();
        }
    });
	var readonlyFields = {};
	readonlyFields['users'] = true; 
	page_list_buttons.push({title: '修改',name:'Edit', bclass: 'edit',prefunc:function(){
            var checked = $('#Table_supply_manage').getCheckedTrs();
            if (checked.length != 1) {return false;}else{return true;}
        },onpress : function(){
            var checked = $('#Table_supply_manage').getCheckedTrs(); 
            if(checked[0]) {
			     var id = checked[0].id;
                 updateSupplyView(id,wraper);
            }
        }
    }); 
	 
    page_list_buttons.push({separator: true}); 
	$('#Table_supply_manage').flexigrid({
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
			url:'/ycbmall-manager-ws/ws/0.1/supplyCms/querySupply',
			onError:showSupplyError,
			overflow:true
	});   
	  
	var _span7=$('div.searchButtons',wraper).parent().removeClass('span14').addClass('span20');
    var _div=$('<div>').addClass('row-fluid').append(_span7);
    $('div.searchContent',wraper).append(_div);
	
	$(".searchButtons .ui-btn-icon:first",wraper).unbind('click');
	$(".searchButtons .ui-btn-icon:first",wraper).click(function(){
			 $('#Table_supply_manage',wraper).flexOptions({url:'/ycbmall-manager-ws/ws/0.1/supplyCms/querySupply'});
			 $('#Table_supply_manage',wraper).flexReloadSearch();
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
			$('#Table_supply_manage').flexOptions({
						url:'/ycbmall-manager-ws/ws/0.1/supplyCms/querySupply',
						queryParam:{},
						page:0});
			$('#Table_supply_manage').flexReloadSearch();
	}); 
	
	$(".details-tab .return",wraper).click(function(){
		$('.details-box',wraper).slideUp();
		$('.jrad-table',wraper).slideDown(); 
		$(".scroll-up-btn").click();
	}); 
	//供货品类选择
	var class_fields_params={};
	class_fields_params['classificationId'] = {
			urlData:{
				url:'/ycbmall-manager-ws/ws/0.1/classificationCms/getClassificationsByParentIdV2?parentId=-1&level=1'
			},
			unshiftData: {id:'0',name:'全部'}
	}
	$('#Form_class',wraper).form({
	        title:"供货品类", 
			fields_params:class_fields_params,
			item:{"classificationId":"0"},
			submit:function(){
				var json = {};
				json.classificationId = $("#Form_class div[name='classificationId']",wraper).select('val');
				json.classificationName = $("#Form_class div[name='classificationId']",wraper).select('text');
				var array = $("div[name='classifies']",wraper).data("classList"); 
				
				var fId = json.classificationId; 

				if(fId=="0"){
					array = []; 
					array.push(json);
				}else{
					if(array.length==1&&array[0].classificationId=="0"){
						array = []; 
						array.push(json);
					}else{
					var flag = true;
					$.each(array,function(){
						if(this.classificationId == fId){
							flag=false;
							var classList = this.classList;
							$.jRadMessage({level:'error',message:"该供应品类已经选择",selector:$("#Form_class",wraper)});
						}
					});
					if(flag){  
					  array.push(json);
					}else{
						return;
				}	
			}
		}
				addClassList(array,wraper); 
				$("div[name='classifies']",wraper).data("classList",array);
				$("#Form_class",wraper).form("close");
			}
			});
		$("#jrad-button-class",wraper).button({
			click : function() {
				$('#Form_class',wraper).form({ 
				fields_params:class_fields_params,
				item:{"classificationId":"0"},
				}).form('open');
			}
		});
		//删除分类
		$("#class_check_string .delClass",wraper).live('click',function(){
			var info = $(this).data('info'); 
			var arr = $("div[name='classifies']",wraper).data("classList");
			$.each(arr,function(i){
				var json = this;
				if(json.classificationId==info.classificationId){
					if(info.classificationId=="0"){
						arr.splice(i,1);
					}else if(json.classificationId==info.classificationId){
						arr.splice(i,1);
					}
				}
			}); 
			$(this).parent('.classSpan').remove();
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
				$("#Form_area",wraper).form("close");
			}
			});
	
	//打开覆盖范围窗口
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

function initSupplyInfo(wraper){
	
	  //地区
	   $("#Form_supply_manage div[name='regions']",wraper).data("areaList",[]); 
	   $("#Form_supply_manage div[name='classifies']",wraper).data("classList",[]); 
	   $("#Form_supply_manage #area_check_string",wraper).html("");   
}
//修改时赋值
function Form_supply_manageVal(wraper,item){ 
	 
   //地区
   var areaList = item.regions; 
   $.each(areaList,function(i){
       if(areaList[i].areaList.length==0){
	    areaList[i].areaList=[{"areaCodeId":"0"}];
	   }
   });
   $("#Form_supply_manage div[name='regions']",wraper).data('areaList',areaList); 
   addAreaList(areaList,wraper);
   //分类
   var classList = item.supplyClasses;
   
   $("#Form_supply_manage div[name='classifies']",wraper).data('classList',classList);
   addClassList(classList,wraper);
   //用不用判断
   $("#Form_supply_manage", wraper).find("div[name='bankName']").autocombo("val",{id:item.bankId,name:item.bankName});
   
}

function updateSupplyView(id,wraper){ 
	 var item = $.jRadGet({url : '/ycbmall-manager-ws/ws/0.1/supplyCms/getSupply?supplyId='+id}); 	 
	 $(".details-box .details-tab",wraper).find("span[name='title']").html("供应商修改"); 
	 initSupplyInfo(wraper);  
	 $('.jrad-table',wraper).slideUp();
	 $('.details-box',wraper).slideDown(); 
	 $(".scroll-up-btn").click();
	 item.id = id;
	 $('#Form_supply_manage',wraper).form({item: item});  
	 $("#Form_supply_manage", wraper).find("div[name='bankName']").autocombo("val",{id:item.bankId,name:item.bankName});
	 Form_supply_manageVal(wraper,item); 
}

function addClassList(array,wraper){
	$("#class_check_string",wraper).html("");
	  if(array.length==1&&array[0].classificationId=="0"){
			 var info = {"classificationId":"0"};  
			 var _div = $("<div>").addClass("classSpan").html("全部");
			 var _span = $("<span>").addClass("delspan delClass").html("X").attr("title","移除").data("info",info);
			 $("#class_check_string",wraper).append(_div.append(_span));
	}else{ 
		  $.each(array,function(){
		      var json = this.classList;
			  var classificationId = this.classificationId;
			  var classificationName = this.classificationName;
			  var info = {"classificationId":classificationId};  
			  var _div = $("<div>").addClass("classSpan").html(classificationName);
			  var _span = $("<span>").addClass("delspan delClass").html("X").attr("title","移除").data("info",info);
			  $("#class_check_string",wraper).append(_div.append(_span));
		  });   
	}
}


function showSupplyError(xhr){
	 var errormsg = eval("(" + xhr.responseText + ")");
	  var cDiv = $("#Wraper_supply_manage .cDiv");
	  $.jRadMessage({level:'error',message:errormsg[0].message,selector:cDiv});
} 
