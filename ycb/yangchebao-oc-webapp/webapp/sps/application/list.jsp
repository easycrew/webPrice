	<%@ page language="java" contentType="text/html; charset=UTF-8"%>
	<script type="text/javascript" src="/sps/js/DateFormat.js"></script>
	<div class="urlContentWraper" id="Wraper_app_Version">
	    <!-- 列表显示 -->
		<div class="ui-info-layout">
			<h2 class="ui-tit"><strong>应用列表</strong></h2>
			<table id="Table_app_Version"></table>
	    </div>
	    <div class="grid-row-fluid">
	    
	    <div id="Form_app_Version" style="display:none;"> 
					
			<div class="grid-layout-main jrad-form">	    
			    <input name="id" type="hidden">
			    <input name="packageFileId" type="hidden">           
	           
	           
	            <div class="row">
	                 <label class="span3 grid-layout-label">应用名称：</label>
	                 <div class="span5 grid-layout-content">
	                       <div name="name" class="jrad-input-container"></div>
	                                    </div>
	            </div>
	            <div class="row">
	                 <label class="span3 grid-layout-label">发布版本：</label>
	                 <div class="span5 grid-layout-content">
	                       <div name="version" class="jrad-input-container"></div>
	                                    </div>
	            </div>  
	            <div class="row">
	                 <label class="span3 grid-layout-label">ICON图标：</label>
	                 <div class="span10 grid-layout-content">
	                       <div name="icon" class="jrad-uploadimg-container"></div>
	                                    </div>
	            </div>                       
	            <div class="row">
	                 <label class="span3 grid-layout-label">应用包上传：</label>
	                 <div class="span5 grid-layout-content">
	                       <div name="file" class="jrad-upload-container"></div>
	                                    </div>
	            </div>
				<div class="row">
	                 <label class="span3 grid-layout-label">应用截图：</label>
	                 <div class="span12 grid-layout-content">
	                       <div name="img" class="jrad-uploadimg-container"></div>
	                                    </div>
	            </div>
				<div class="row">
	                 <label class="span3 grid-layout-label">应用简介：</label>
	                 <div class="span5 grid-layout-content">
	                       <div name="introduction" class="jrad-textarea-container"></div>
	                                    </div>
	            </div>
				<div class="row">
	                 <label class="span3 grid-layout-label">更新描述：</label>
	                 <div class="span5 grid-layout-content">
	                       <div name="updateDesc" class="jrad-textarea-container"></div>
	                                    </div>
	            </div>
	       
				
				
			</div>
			<div class="jrad-buttons-container ui-buttons-container">
				<span class="jrad-btn-primary btn btn-small btn-primary">确定</span>
				<span class="jrad-btn-normal btn btn-small btn-default">取消</span>			
			</div>
		</div>
		
		  <!-- 详情 -->
		<div id="Form_app_Version_details" style="display:none;"> 
			<div class="grid-layout-main jrad-form">	    
			    <input name="id" type="hidden">
			    <input name="packageFileId" type="hidden">           
	           
	           
	            <div class="row">
	                 <label class="span3 grid-layout-label">应用名称：</label>
	                 <div class="span5 grid-layout-content text-content">
	                       <div name="name" class="jrad-content-container"></div>
	                                    </div>
	            </div>
	            <div class="row">
	                 <label class="span3 grid-layout-label">发布版本：</label>
	                 <div class="span5 grid-layout-content text-content">
	                       <div name="version" class="jrad-content-container"></div>
	                                    </div>
	            </div>  
	            <div class="row">
	                 <label class="span3 grid-layout-label">ICON图标：</label>
	                 <div class="span10 grid-layout-content">
	                                    <img name="icon" width="70" height="70" />
	                  </div>
	            </div>                       
	            <div class="row">
	                 <label class="span3 grid-layout-label">应用包上传：</label>
	                 <div class="span5 grid-layout-content text-content">
	                       <div name="file" class="jrad-content-container"></div>
	                                    </div>
	            </div>
				<div class="row">
	                 <label class="span3 grid-layout-label">应用截图：</label>
	                 <div class="span12 grid-layout-content" data-name="imgs">
	                       <img name="img" width="100" height="100"/>
	                 </div>
	            </div>
				<div class="row">
	                 <label class="span3 grid-layout-label">应用简介：</label>
	                 <div class="span10 grid-layout-content text-content">
	                       <div name="introduction" class="jrad-content-container"></div>
	                                    </div>
	            </div>
				<div class="row">
	                 <label class="span3 grid-layout-label">更新描述：</label>
	                 <div class="span10 grid-layout-content text-content">
	                       <div name="updateDesc" class="jrad-content-container"></div>
	                                    </div>
	            </div>
			</div>
			<div class="jrad-buttons-container ui-buttons-container">
				<span class="jrad-btn-normal btn btn-small btn-default">关闭</span>			
			</div>
		</div>
		</div>
	</div>
	<script type="text/javascript">
	$(document).ready(function(){
		var page_column_model = new Array();
		var page_search_items = new Array();
		var page_list_buttons = new Array();
		
		//var jRad = $.jRad('/sps-ws','app','Version');	//通过URL获取RAD配置（有RAD后台时使用）
		var entityModel = {"cnName":"","complexQuery":false,"domainName":"app","enName":"Version","fields":[{"chineseName":"","dataSource":[],"defaultValue":"","fieldName":"appId","fieldType":"NormalInput","validatorModel":[{"msg":"输入过长","type":"max","value":"20"}]},{"chineseName":"","dataSource":[],"defaultValue":"","fieldName":"version","fieldType":"NormalInput","validatorModel":[{"msg":"输入过长","type":"max","value":"30"}]},{"chineseName":"","dataSource":[],"defaultValue":"","fieldName":"iconFileId","fieldType":"NormalInput","validatorModel":[{"msg":"输入过长","type":"max","value":"20"}]},{"chineseName":"","dataSource":[],"defaultValue":"","fieldName":"packageFileId","fieldType":"NormalInput","validatorModel":[{"msg":"输入过长","type":"max","value":"20"}]},{"chineseName":"","dataSource":[],"defaultValue":"","fieldName":"firstImgFileId","fieldType":"NormalInput","validatorModel":[{"msg":"输入过长","type":"max","value":"20"}]},{"chineseName":"","dataSource":[],"defaultValue":"","fieldName":"secondImgFileId","fieldType":"NormalInput","validatorModel":[{"msg":"输入过长","type":"max","value":"20"}]},{"chineseName":"","dataSource":[],"defaultValue":"","fieldName":"thirdImgFileId","fieldType":"NormalInput","validatorModel":[{"msg":"输入过长","type":"max","value":"20"}]},{"chineseName":"","dataSource":[],"defaultValue":"","fieldName":"fourthImgFileId","fieldType":"NormalInput","validatorModel":[{"msg":"输入过长","type":"max","value":"20"}]},{"chineseName":"","dataSource":[],"defaultValue":"","fieldName":"fifthImgFileId","fieldType":"NormalInput","validatorModel":[{"msg":"输入过长","type":"max","value":"20"}]},{"chineseName":"","dataSource":[],"defaultValue":"","fieldName":"sixthImgFileId","fieldType":"NormalInput","validatorModel":[{"msg":"输入过长","type":"max","value":"20"}]},{"chineseName":"","dataSource":[],"defaultValue":"","fieldName":"introduction","fieldType":"NormalInput","validatorModel":[{"msg":"输入过长","type":"max","value":"2048"}]},{"chineseName":"","dataSource":[],"defaultValue":"","fieldName":"updateDesc","fieldType":"NormalInput","validatorModel":[{"msg":"输入过长","type":"max","value":"2048"}]}],"handledSQL":"","rowdses":[],"sql":"","tableName":""};//静态生成的RAD 配置（没有RAD后台时使用）
		var jRad = $.jRad({app:'sps-ws',entityModel:entityModel});
		
		page_column_model.push({display: '序号', name : 'number',  sortable : true});
		page_column_model.push({display: 'ICON', name : 'iconUrl',  sortable : true,diy:function($row,$div){
			var imgUrl = $row.iconUrl;
			var $img = $('<img width="50" height="50" src="'+imgUrl+'" />');
			$div.height(50);
			$div.append($img);
		}});
		page_column_model.push({display: '应用名称', name : 'name',  sortable : true});
		page_column_model.push({display: '版本号', name : 'version',  sortable : true});
		page_column_model.push({display: '应用类型', name : 'type',  sortable : true});
		page_column_model.push({display: '更新时间', name : 'updateTime',  sortable : true});
		
		page_search_items.push({row:'1',type:'jrad-input',display:'名称或版本号',name:'nameORversion'});
		
		jRad.validators['name'] = [{msg: '应用名称不能为空！',type:'min',value:1},{msg: '应用名称输入过长！最多不能超过30个字',type:'max',value:30},{msg: '只能是汉字、数字、英文字母、下划线且不能以下划线开头和结尾！',type:'regex',value:/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/g}];
		jRad.validators['version'] = [{msg: '应用版本不能为空！',type:'min',value:1},{msg: '应用版本输入过长！最多不能超过30个字',type:'max',value:30}];				
		jRad.validators['introduction'] = [{msg: '应用简介不能为空！',type:'min',value:1},{msg: '应用简介输入过长！最多不能超过2000个字',type:'max',value:2000}];
		jRad.validators['updateDesc'] = [{msg: '更新描述不能为空！',type:'min',value:1},{msg: '更新描述输入过长！最多不能超过1000个字',type:'max',value:1000}];

		jRad.validators['img'] = [{
			type:"func",
			value:function(){
				var li = $('#Form_app_Version div[name=img] .pic-show li');
				var val = $('#Form_app_Version div[name=img]').uploadimg('val');
				if(li.length == 0 && val == ''){
					return false;
				}
				return true;
			},
			msg:"请选择上传应用截图"
		}];
		
		jRad.validators['icon'] = [{
			type:"func",
			value:function(){
				var li = $('#Form_app_Version div[name=icon] .pic-show li');
				var val = $('#Form_app_Version div[name=icon]').uploadimg('val');
				if(li.length == 0 && val == ''){
					return false;
				}
				return true;
			},
			msg:"请选择上传icon！"
		}];

		jRad.validators['file'] = [{
			type:"func",
			msg:"文件格式只支持zip和ipa，请重新上传！",
			value:function(value) {
				value = $('#Form_app_Version div[name=file]').upload('text');
				if(value == '') {
					return true;
				}
				var re = new RegExp(/^\S+\.(zip)|(ipa)$/);
				if (!re.test(value)) {
					return false;
				}
				return true;
			}
		},{
			type:"func",
			msg:"请上传应用包！",
			value:function(value) {
				value = $('#Form_app_Version div[name=file]').upload('text');
				if(value == '') {
					return false;
				}
				return true;
			}
		}];
		
		
		var fields_params = {}; 
		fields_params['icon'] = {
				url:'/sps-ws/ws/0.1/app/upload/icon',
				delFunc: function(item) {
			       item.list.remove();
			       $.jRadMessage("删除图片"+item.small);
			   	},
				note: '仅支持 JPG、GIF、PNG图片文件，且建议大小小于20k。',
				show: true,
				success : function(data) {
					$('#Form_app_Version input[name=iconFileId]').val(data.id);
			   	},
				single: true
		};
		fields_params['introduction'] = {
				grid:10
		};
		fields_params['updateDesc'] = {
				grid:10
		};
		fields_params['file'] = {
				autocomplete: true,
				url: '/sps-ws/ws/0.1/app/upload/package',
				beforeSubmit: function(self) {
					var fileName = self.text();
					var re = new RegExp(/^\S+\.(zip)|(ipa)$/);
					if (!re.test(fileName)) {
						self.showError('文件格式只支持zip和ipa，请重新上传！');
						return false;
					}
					return true;
				},
				success: function(data){
					$('#Form_app_Version input[name=packageFileId]').val(data.result);
				}
		};
		fields_params['img'] = {
				url:'/sps-ws/ws/0.1/app/upload/screenshot',
				delFunc: function(item) {
			       item.list.remove();
			       $.jRadMessage("删除图片"+item.small);
			   },
			   beforeSubmit: function(self) {
				   var li = $('#Form_app_Version div[name=img] .pic-show li');
				   if(li.length >= 6) {
					   $('#Form_app_Version').form('message','最多上传6张图片','warning');
					   return false;
				   }
				   return true;
			   },
				note: '仅支持 JPG图片文件，且建议大小小于1M。',
				single: false,
				horizontal: true,
				showInfo:true
		};
		
		page_list_buttons.push({title: '发布版本',name:'Add', bclass: 'add',onpress : function(){
			var checked = $('#Table_app_Version').getCheckedTrs();
			
		},onpress : function(){
			var checked = $('#Table_app_Version').getCheckedTrs();
			var item = {};
			if(checked[0]){
				item = $ .jRadGet({url : '/sps-ws/ws/0.1/app/'+checked[0].id});
			}
			if(item) {
				delete item.id,
				delete item.appId,
				delete item.version,
				delete item.file,
				delete item.packageFileId
				
			}
			$('#Form_app_Version').form({
	            	grid:'16',
	                title: '发布版本',
	                height: 800,
	                fields_params: fields_params,
	                validators: jRad.validators,
	                before_submit: function(json) {
	                	json.imgIds = new Array();
	                	$.each($('#Form_app_Version div[name=img] .pic-show li'),function(){
	                		json.imgIds.push($(this).attr("name"));
	                	});
	                	json.iconFileId = ""; ;
	                	$('#Form_app_Version div[name=icon] .pic-show li').each(function(){
	                		json.iconFileId = $(this).attr("name");
	                	});	
	                	return json;
	                },
	                item:item, 
	                url:'/sps-ws/ws/0.1/app/add',
	                success_callback:function(){
	                    $('#Table_app_Version').flexMessage('发布成功', 'success');
	                    $('#Table_app_Version').flexReload();
	                }
	            });
			$('#Form_app_Version').find('div[name=img] .pic-show').empty();
			$('#Form_app_Version').find('div[name=img]').uploadimg({
				show: item.imgIds
			});
			
			$('#Form_app_Version').find('div[name=icon]').uploadimg({
				show: item.iconFileId
			}); 
	            
			$('#Form_app_Version').form('open');
		
	        }
	    });
		
		page_list_buttons.push({title: '修改',name:'Edit',bclass: 'edit',prefunc:function(){
			var checked = $('#Table_app_Version').getCheckedTrs();
			if (checked.length != 1) {return false;}else{return true;}
		},onpress : function(){
			var checked = $('#Table_app_Version').getCheckedTrs();
			var item = $ .jRadGet({url : '/sps-ws/ws/0.1/app/'+checked[0].id});
			
			if(checked[0]) {
				$('#Form_app_Version').form({
					grid:'16',
					title: '修改',
				    validators: jRad.validators,
					fields_params: fields_params,
				    item:item,
				    before_submit: function(json){
				    	json.imgIds = new Array();
				    	$('#Form_app_Version div[name=img] .pic-show li').each(function(){
	                		json.imgIds.push($(this).attr("name"));
	                	});
	                	json.iconFileId = ""; ;
	                	$('#Form_app_Version div[name=icon] .pic-show li').each(function(){
	                		json.iconFileId = $(this).attr("name");
	                	});	
	                	console.log(json);
	                	return json;
				    },
				    url:'/sps-ws/ws/0.1/app/update',
				    success_callback:function(){
				    	$('#Table_app_Version').flexMessage('修改成功', 'success');
				    	$('#Table_app_Version').flexReload();
				    }
			    });
				
				$('#Form_app_Version').find('div[name=img] .pic-show').empty();
				$('#Form_app_Version').find('div[name=img]').uploadimg({
					show: item.imgIds
				});
				$('#Form_app_Version').find('div[name=icon] .pic-show').empty();
				$('#Form_app_Version').find('div[name=icon]').uploadimg({
					show: item.iconFileId
				});
				
				$('#Form_app_Version').form('open');
		}
	}
	});
		
	page_list_buttons.push({displayname: '详情',bclass:'details', prefunc:function(){
			var checked = $('#Table_app_Version').getCheckedTrs();
			if (checked.length != 1) {return false;}else{return true;}
		},onpress : function(){
			var checked = $('#Table_app_Version').getCheckedTrs();
			var item = $ .jRadGet({url : '/sps-ws/ws/0.1/app/'+checked[0].id,async:false});
			if(checked[0]) {
				$('#Form_app_Version_details').form({
					grid:'16',
					title: '详情',
					fields_params: fields_params,
				    item:item,
					submit: function() {
				    },
				    cancel: function() {
				    	$('#Form_app_Version_details').form('close');
				    }
			    });
				$('img[name=icon]','#Form_app_Version_details').attr('src',item.iconFileId[0].small);
				$('[data-name=imgs]','#Form_app_Version_details').html('');
				if(item.imgIds.length > 0){
					for(var i = 0; i < item.imgIds.length ; i++){
						var img = $('<img>').attr('src',item.imgIds[i].small).width(100).height(100).css('margin-right','30px').css('margin-top','10px');
						$('[data-name=imgs]','#Form_app_Version_details').append(img);
					}
				}
				$('#Form_app_Version_details').form('open');
		}
	}
	});
		
	
	
	page_list_buttons.push({title: '删除',name:'delete',bclass: 'delete',prefunc:function(){
    	var checked = $('#Table_app_Version').getCheckedTrs();
    	if (checked.length != 0) {
    		return true;
    	}else{
    		return false;
    	}
    },onpress : function(){
		var checked = $('#Table_app_Version').getCheckedTrs();
		$ .jRadConfirm('确认删除？',1,function(){
			$(checked).each(function(index){
				 $.ajax({
           		 	url : "/sps-ws/ws/0.1/app/delete/"+this.id,
           		    type : "delete",          		   
           	 		dataType : 'text',
           	    	success : function(data) {
           	    		$('#Table_app_Version').flexMessage('删除成功', 'success');
           	    		$('#Table_app_Version').flexReload();
           	    	},
           	    	error: function(xhr) {
           	    	 	var status = xhr.status;
           	    		var responseText = xhr.responseText;
           	    		var data = eval('('+responseText+')');
           	    		if(status == 400 && data[0]) {
           	    			$('#Table_app_Version').flexMessage(data[0].message, 'error');
           	    		}
           	    	}
        		});
			});
		});
	}
});
	
	page_list_buttons.push({separator: true});
	
	$('#Table_app_Version').flexigrid({
		reload:true,
		method:'get',
		showSearch:true,
		colModel : page_column_model,
		buttons : page_list_buttons,
		searchitems :page_search_items,
		pagedStyle: 'oc',
		checkBoxType:'single',	
		pagination: {diaplay_pages:5,align:'bottom'},
		url:'/sps-ws/ws/0.1/app/list',
		onError:function(xhr) {
			var status = xhr.status;
			if(status == 401){
                $.jRadAlert('用户未登录点击确定返回登录页','error',function(){
                    index.logOut();
                },-1);
            } else {
            	$.jRadMessage({level:'error',message: "获取数据发生异常",selector:$("#Wraper_app_Version .bbit-grid .cDiv")});
			}
		}
	});
});
		
		
	</script>
