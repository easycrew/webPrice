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
			  if(responseData[i].models!=undefined&&responseData[i].models.length>0){
			  $.each(responseData[i].models,function(){
				this.brandId = parentNode.id;
			  });
			  responseData[i].children = responseData[i].models;
			  }else{
			  responseData[i].children = [];
			  var json = {};
			  json.id = responseData[i].id;
			  json.name = responseData[i].name;
			  json.brandId = parentNode.id;
			  responseData[i].children.push(json);
			  }
		  } 
		}  
		var zTree = getZtreeObj(wraper);
		zTree.setChkDisabled(parentNode,false,true,true);
		return responseData;
		}; 
		
		var json =$.jRadGet({
			 url : "/shopmanage-ws/ws/0.1/support/brand/list",
			 async:false
		});
		var treeData = [];
		var num = 0;
		$.each(json,function(name,value){
		    num++;
			$.each(value,function(){
			this.isParent = true; 
			});
			var id = "p"+num;
		    var parent = {"pId":-1,"name":name,"id":id,"children":value,chkDisabled:true}; 
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
				autoParam:["id=brandId"],
				contentType:"application/json",
				dataFilter:ajaxDataFilter,
				dataType:'json', 
				enable: true,
				type:'get',
				url:"/shopmanage-ws/ws/0.1/support/model/list"
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

