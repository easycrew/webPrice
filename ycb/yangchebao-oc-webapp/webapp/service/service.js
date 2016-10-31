function serviceInit(service){ 
var _form,wraper,_tree,ztreeObj,newCount = 1;
function ajaxDataFilter(treeId, parentNode, responseData) { 
	if (responseData) {
	  for(var i =0; i < responseData.length; i++) {
		responseData[i].name = responseData[i].serviceName+'：ID'+responseData[i].id;
		responseData[i].isParent = true;
		responseData[i].open = true;
		if(responseData[i].isShow=="0"){ 
			responseData[i].font = {'color':'red'};
		}  
	  }
	}
	return responseData;
}
function setRemoveBtn(treeId, treeNode) {
	if(treeNode.level==0){
	  return false;
	}
	return true;
}
function setRenameBtn(treeId, treeNode) {
	if(treeNode.level==0){
	  return false;
	}
	return true;
} 
function getFont(treeId, node) {
	return node.font ? node.font : {};
}
// function serviceInit(service){ 
    wraper = $("#Wraper_service_"+service);
    _form = $("#Form_service_"+service,wraper); 
    _tree = $("#"+service+"Tree",wraper)
    var serviceTypeId,serviceName; //1.洗车  2.美容 3.保养 4.维修
    if(service=="beautify"){
    	serviceTypeId = "2";
    	serviceName = "美容";
    }else if(service=="carwash"){
    	serviceTypeId = "1";
    	serviceName = "洗车";
    }else if(service=="repair"){
    	serviceTypeId = "4";
    	serviceName = "维修";
    }else if(service=="upkeep"){
    	serviceTypeId = "3";
    	serviceName = "保养";
    }else{
    	serviceTypeId = "5";
    	serviceName = "小保养";
    }
	var entityModel = {};
    var jRad = $.jRad({app:'radsample-ws',entityModel:entityModel}); 
	jRad.validators['serviceName'] = [{"msg":"名称为空","type":"min","value":"1"}]; 
	jRad.validators['topReservePrice'] = [{"msg":"请输入非负整数","type":"regex","value":/^\d*$/}]; 
	jRad.validators['description'] = [{"msg":"内容为空","type":"min","value":"1"}];  
	jRad.validators['sequence'] = [{"msg":"序号为空","type":"min","value":"1"},{"msg":"请输入正确的序号","type":"regex","value":/^[1-9]\d*$/}]; 
	jRad.validators['limitTimes'] = [{"msg":"请输入正确的限购次数","type":"regex","value":/^[1-9]\d*$/}]; 
	jRad.validators['subsidyUseRatio'] = [{"msg":"请输入正确的使用比例","type":"regex","value":/^([0-9]|[1-9][0-9]|100)(.[0-9]{1,2}){0,1}$/}]; 
	var fields_params = {};
	fields_params['colour'] = {data:[{id:'',name:'无'},
									{id:'2',name:'浅色'},
									{id:'1',name:'深色'}]};  
	fields_params['location'] = {data:[{id:'',name:'无'},
									   {id:'1',name:'前档'},
									   {id:'2',name:'整车'},
									   {id:'3',name:'侧后档'}]}; 
	fields_params['isActivity'] = {data:[{id:'0',name:'否'},
									   {id:'1',name:'是'}]}; 
    fields_params['isShow'] = {data:[{id:'1',name:'显示'},
										{id:'0',name:'不显示'}]};  
	fields_params['serviceFile'] = { 
				url: '/shopmanage-ws/ws/0.1/file/upload',
				fileName: 'file', 
				delFunc: function(item) { 
					item.list.remove(); 
					_form.find("input[name='servicePic']").val("");   
				},
				success: function(data){ 
					   if(data[0]&&data[0].code=="400"){
						 $.jRadMessage({level:'error',message:data[0].message});
					   }else{  
						 _form.find("input[name='servicePic']").val(data.large);  //图片地址 
					   }  
					}, 
				note: '',
				show:true,
				showLarge:true, 
				prev:'large', 
				params: {type:"",cutPicType:''}, 
				single: true  
 	};		
	fields_params['description'] = {
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
	_form.form({ 
			grid: 22, 
			fields_params: fields_params,
			validators:jRad.validators
	});
	var childrenTree = $.jRadGet({'url':'/shopmanage-ws/ws/0.1/service/getSonServices?parentId='+serviceTypeId}); 
	$.each(childrenTree,function(){  
	 this.name = this.serviceName+':ID'+this.id;
	 this.isParent = true; 
	 this.open = true;
	 if(this.isShow=="0"){ 
		this.font = {'color':'red'};
	 }  
	 delete this.serviceName
	}); 
	if(service!="smallUpkeep"){
		var options = {
			setting:{
				async: {
					enable: true,
					url:"/shopmanage-ws/ws/0.1/service/getSonServices",
					type:'get',
					autoParam:["id=parentId"],
					dataFilter: ajaxDataFilter
				},
				view: {
					expandSpeed:"",
					addHoverDom: addHoverDom,
					removeHoverDom: removeHoverDom,
					selectedMulti: false,
					showIcon: false,
					fontCss: getFont
				},
				edit: {
					enable: true,
					renameTitle:"修改",
					removeTitle:"删除",
					showRemoveBtn: setRemoveBtn,
					showRenameBtn: setRenameBtn
				},
				data: {
					simpleData: {
						enable: true
					}
				},
				callback: {
					beforeRemove: beforeRemove,
					beforeEditName: updateService
				}
			},
			data:[
			{"pId":-1,"name":serviceName,"id":serviceTypeId,children:childrenTree,open:true}
			]
		}
	}else{
		var options = {
			setting:{
				async: {
					enable: true,
					url:"/shopmanage-ws/ws/0.1/service/getSonServices",
					type:'get',
					autoParam:["id=parentId"],
					dataFilter: ajaxDataFilter
				},
				view: {
					expandSpeed:"",
					addHoverDom: addHoverDom2,
					removeHoverDom: removeHoverDom,
					selectedMulti: false,
					showIcon: false,
					fontCss: getFont
				},
				edit: {
					enable: true,
					renameTitle:"修改",
					removeTitle:"删除",
					showRemoveBtn: setRemoveBtn,
					showRenameBtn: setRenameBtn
				},
				data: {
					simpleData: {
						enable: true
					}
				},
				callback: {
					beforeRemove: beforeRemove,
					beforeEditName: updateService2
				}
			},
			data:[
			{"pId":-1,"name":serviceName,"id":serviceTypeId,children:childrenTree,open:true}
			]
		}
	}
	
	_tree.tree(options);
	ztreeObj = _tree.tree('getTreeObj')
// } 
function addHoverDom(treeId, treeNode) {
	var sObj = $("#" + treeNode.tId + "_span"); 
	var level = treeNode.level; 
	if ($("#addBtn_"+treeNode.tId).length>0||level==4) return;
	var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
		+ "' title='增加' onfocus='this.blur();'></span>";
	sObj.after(addStr);  
	var addBtn = $("#addBtn_"+treeNode.tId);
	if (addBtn){
		addBtn.bind("click", function(){ 
			var flag = addService(treeNode);
			return flag;
		});
	} 
}
function addHoverDom2(treeId, treeNode) {
	var sObj = $("#" + treeNode.tId + "_span"); 
	var level = treeNode.level; 
	if ($("#addBtn_"+treeNode.tId).length>0||level==4) return;
	var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
		+ "' title='增加' onfocus='this.blur();'></span>";
	sObj.after(addStr);  
	var addBtn = $("#addBtn_"+treeNode.tId);
	if (addBtn){
		addBtn.bind("click", function(){ 
			var flag = addService2(treeNode);
			return flag;
		});
	} 
}
function removeHoverDom(treeId, treeNode) { 
	$("#addBtn_"+treeNode.tId).unbind().remove();
}
function addService(treeNode){ 
	var parentNode = treeNode.getParentNode(); 
	var data = $.jRadGet({'url':'/shopmanage-ws/ws/0.1/service/detailService?id='+treeNode.id}); 
	var name = ""; 
	var _ul = $("div[name='logoIdFile']",_form).children(".pic-show"); 
    _ul.html("");
	_form.form({
	    title:'创建',
		url:'/shopmanage-ws/ws/0.1/service/addService',
		item:{"description":data.description}, 
		before_submit:function(json){
			json.parentId = treeNode.id;
			name = json.serviceName
			return json;
		},
		success_callback:function(data){ 
			_form.form('close');
			$.jRadMessage({level:'success',message:"添加成功！"});
			ztreeObj.addNodes(treeNode,{
			 id:data.id, 
			 pId:treeNode.id,
			 isParent:false, 
			 name:name
			});  
		}}).form('open'); 
		return false; 
}
function addService2(treeNode){ 
	var parentNode = treeNode.getParentNode(); 
	var data = $.jRadGet({'url':'/shopmanage-ws/ws/0.1/service/detailService?id='+treeNode.id}); 
	var name = ""; 
	var _ul = $("div[name='logoIdFile']",_form).children(".pic-show"); 
    _ul.html("");
	_form.form({
	    title:'创建',
		url:'/shopmanage-ws/ws/0.1/service/addService',
		item:{"description":data.description}, 
		before_submit:function(json){
			json.parentId = treeNode.id;
			name = json.serviceName;
			json.isActivity = 0;
			return json;
		},
		success_callback:function(data){ 
			_form.form('close');
			$.jRadMessage({level:'success',message:"添加成功！"});
			ztreeObj.addNodes(treeNode,{
			 id:data.id, 
			 pId:treeNode.id,
			 isParent:false, 
			 name:name
			});  
		}}).form('open'); 
		return false; 
}
function updateService(treeId,treeNode){ 
	var name = "";
	var item = $.jRadGet({'url':'/shopmanage-ws/ws/0.1/service/detailService?id='+treeNode.id}); 
	_form.form({
	    title:'修改',
		url:'/shopmanage-ws/ws/0.1/service/editService',
		item:item,
		before_submit:function(json){
			name = json.serviceName;
			json.id = treeNode.id;
			return json;
		},
		success_callback:function(){ 
			$.jRadMessage({level:'success',message:"更新成功！"}); 
			treeNode.name = name+'ID'+treeNode.id;
			ztreeObj.updateNode(treeNode);
		}}).form('open'); 
		var _ul = $("div[name='serviceFile']",_form).children(".pic-show"); 
		var src = item.servicePic;  
		if(src!=undefined&&src!=""){ 
			var _li = '<li name=""><div class="large-pic"><div class="pic-box"><div class="pic-content"><div class="pic-vc">'
					+'<img src="'+src+'">'
					+'</div></div><span name="small" class="del-btn"></span></div></div></li>'
			_ul.html(_li); 
			$(".del-btn",_ul).click(function(){ 
				_ul.html(""); 
				$("input[name='servicePic']",_form).val(""); 
			});
		} 
		return true; 
}
function updateService2(treeId,treeNode){ 
	var name = "";
	var item = $.jRadGet({'url':'/shopmanage-ws/ws/0.1/service/detailService?id='+treeNode.id}); 
	_form.form({
	    title:'修改',
		url:'/shopmanage-ws/ws/0.1/service/editService',
		item:item,
		before_submit:function(json){
			name = json.serviceName;
			json.id = treeNode.id;
			json.isActivity = 0;
			return json;
		},
		success_callback:function(){ 
			$.jRadMessage({level:'success',message:"更新成功！"}); 
			treeNode.name = name+'ID'+treeNode.id;
			ztreeObj.updateNode(treeNode);
		}}).form('open'); 
		var _ul = $("div[name='serviceFile']",_form).children(".pic-show"); 
		var src = item.servicePic;  
		if(src!=undefined&&src!=""){ 
			var _li = '<li name=""><div class="large-pic"><div class="pic-box"><div class="pic-content"><div class="pic-vc">'
					+'<img src="'+src+'">'
					+'</div></div><span name="small" class="del-btn"></span></div></div></li>'
			_ul.html(_li); 
			$(".del-btn",_ul).click(function(){ 
				_ul.html(""); 
				$("input[name='servicePic']",_form).val(""); 
			});
		} 
		return true; 
}
function beforeRemove(treeId, treeNode) {
	 var flag = false;
	 var cDiv = wraper;
	 $.jRadConfirm('确认删除吗？',1,function(){ 
			$.jRadAjax({
				url:'/shopmanage-ws/ws/0.1/service/deleteService?id='+treeNode.id, 
				type:'post',
				success: function(){
				    flag = true;
					$.jRadMessage({level:'success',message:"删除成功",selector:cDiv	});
					ztreeObj.removeNode(treeNode);
				},
				error:function(xhr){
					var errormsg = eval("(" + xhr.responseText + ")");
					var cDiv = wraper;
					$.jRadMessage({level:'error',message:errormsg[0].message,selector:cDiv});
					console.log(errormsg[0].message);
					flag = false; 
				}
			});
	},function(){
	  flag = false;
	});
	return flag;
}   
function showError(xhr){
	var errormsg = eval("(" + xhr.responseText + ")");
	var cDiv = wraper;
	$.jRadMessage({level:'error',message:errormsg[0].message,selector:cDiv});
	} 
}