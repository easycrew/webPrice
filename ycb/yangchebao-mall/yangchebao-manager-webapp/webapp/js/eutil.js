function addAreaList(array,wraper){  
      $("#area_check_string",wraper).html(""); 
	  if(array.length==1&&array[0].provinceId=="0"){
		 var info = {"provinceId":"0","areaId":"0"};  
		 var _div = $("<div>").addClass("areaSpan").html("全部");
		 var _span = $("<span>").addClass("delspan delArea").html("X").attr("title","移除").data("info",info);
		 $("#area_check_string",wraper).append(_div.append(_span));
	  }else{ 
	  $.each(array,function(){
	      var json = this.areaList;
		  var provinceId = this.provinceId;
		  var provinceName = this.provinceName;
		  if(json.length==1&&json[0].areaCodeId==0){ 
		  var showArea = provinceName; 
		  var showId = provinceId;
		  var info = {"provinceId":showId,"areaId":"0"};  
		  var _div = $("<div>").addClass("areaSpan").html(showArea);
		  var _span = $("<span>").addClass("delspan delArea").html("X").attr("title","移除").data("info",info);
		  $("#area_check_string",wraper).append(_div.append(_span));
		  }else{ 
		  for(var i=0;i<json.length;i++){ 
		  var showArea = json[i].areaCodeName;
		  var showId = json[i].areaCodeId;
		  var info = {"provinceId":provinceId,"areaId":showId};  
		  var _div = $("<div>").addClass("areaSpan").html(showArea);
		  var _span = $("<span>").addClass("delspan delArea").html("X").attr("title","移除").data("info",info);
		  $("#area_check_string",wraper).append(_div.append(_span));
		  }
		  }
	  });   
	  }
} 

function getZtreeObj(wraper){ 
	var obj = $("#Form_service_brand .jrad-tree",wraper).tree('getTreeObj');
	return obj;
}  
function setBrandTree(wraper){ 
		var ajaxDataFilter = function(treeId, parentNode, responseData) { 
		if (responseData) {
		  for(var i =0; i < responseData.length; i++) { 
			  responseData[i].id = responseData[i].modelId;
			  responseData[i].name = responseData[i].modelName;
			  responseData[i].factoryId = parentNode.id;
			  responseData[i].isParent = true;
			  if(responseData[i].styles!=undefined && responseData[i].styles.length>0){
			  	  var stylesArr=[];
				  $.each(responseData[i].styles,function(){
				  	var stylesJson={};
				  	stylesJson.id=this.styleId;
				  	stylesJson.name=this.styleName;
				  	stylesJson.modelId=responseData[i].id;
				  	stylesArr.push(stylesJson);
				  });
				  responseData[i].children = stylesArr;
			  }else{
				  responseData[i].children = [];
				  var json = {};
				  json.id = responseData[i].modelId;
				  json.name = responseData[i].modelName;
				  json.modelId = responseData[i].id;
				  responseData[i].children.push(json);
			  }
		  } 
		} 
		var zTree = getZtreeObj(wraper);
		zTree.setChkDisabled(parentNode,false,true,true);
		return responseData;
		}; 
		
		var json =$.jRadGet({
			 url : "/ycbmall-manager-ws/ws/0.1/support/brandAndFactory/list",
			 async:false
		});
		var treeData = [];
		var num = 0;
		$.each(json,function(name,value){
		    num++;
		    var id = "p"+num;
			$.each(value,function(){
					var brandId=this.brandId;
					this.isParent = true;
					var children=[];
					$.each(this.factories,function(){
						var childrenJson={};
						childrenJson.id=this.factoryId;
						childrenJson.name=this.factoryName;
						childrenJson.brandId=brandId;
						childrenJson.isParent = true;
						children.push(childrenJson)
					});
					var _parent={'pId':id,'name':this.brandName,'id':this.brandId,'children':children,chkDisabled:true};
					treeData.push(_parent)
				});
		    var parent = {"pId":-1,"name":name,"id":id,chkDisabled:true}; 
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
				async: {
					autoParam:["id=factoryId"],
					contentType:"application/json",
					dataFilter:ajaxDataFilter,
					dataType:'json', 
					enable: true,
					type:'get',
					url:"/ycbmall-manager-ws/ws/0.1/support/modelAndStyle/list"
				},
				check:{
					enable:true,
					chkDisabledInherit:true
				}
		    },
		    data:treeData
		}; 
		return optionsSimple;
}
function getCityZtreeObj(wraper){ 
	var obj = $("#Wraper_opencity_manager .jrad-tree",wraper).tree('getTreeObj');
	return obj;
} 
function setProvinceTree(wraper){ 
	var ajaxDataFilter = function(treeId, parentNode, responseData) { 
		if (responseData) {  
		  for(var i =0; i < responseData.length; i++) { 
		    responseData[i].name = responseData[i].municipalityName;
		    responseData[i].parentNode = parentNode.id;
		  }
		} 
		var zTree = getCityZtreeObj(wraper);
		zTree.setChkDisabled(parentNode,false,true,true);
		return responseData;
		} 
		 
		var json =$.jRadGet({
			 url : "/ycbmall-manager-ws/ws/0.1/area/provinceAll",
			 async:false
		});
		var treeData = [];
		var num = 0;
		$.each(json,function(name,value){
	    num++;
	    var id = value.id;
			var provinceId=value.id; 
			var children=value.id;
			var _parent={'pId':0,'name':value.provinceName,'id':value.id,"chkDisabled":true,"isParent":true};
			treeData.push(_parent)
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
				async: {
					autoParam:["id=provinceId"],
					contentType:"application/json",
					dataFilter:ajaxDataFilter,
					dataType:'json', 
					enable: true,
					type:'get',
					url:"/ycbmall-manager-ws/ws/0.1/area/municipalities"
				},
				check:{
					enable:true,
					chkDisabledInherit:true
				},
				
		    },
		    data:treeData
		}; 
		return optionsSimple;
}