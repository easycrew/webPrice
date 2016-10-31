<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div class="urlContentWraper" id="Wraper_rad_SpreadWay">
	<div class="ui-info-layout">
		<h2 class="ui-tit"><strong>推广码列表</strong></h2>
		<!-- 列表显示 -->
		<table id="Table_rad_SpreadWay"></table>
    </div>
	<div id="Form_rad_SpreadWay" style="display:none;">
		<div class="grid-layout-main jrad-form">
			<input name="id" type="hidden">
			<input name="code" type="hidden">
			<div class="row">
				 <label class="span3 grid-layout-label">推广方式：</label>
	          	 <div class="span5 grid-layout-content">
					   <div name="name" class="jrad-input-container"></div>
					   				</div>
			</div>
			<div class="row">
				 <label class="span3 grid-layout-label">推广码：</label>
	          	 <div class="span5 grid-layout-content  text-content">
					   <div name="code" class="jrad-content-container"></div>
					   				</div>
			</div>
		</div>
		<div class="jrad-buttons-container ui-buttons-container">
			<span class="jrad-btn-normal">取消</span>
			<span class="jrad-btn-primary">确定</span>
		</div>
	</div>
</div>
<script type="text/javascript">
$(document).ready(function(){
	var wraper = $('#Wraper_rad_SpreadWay');
	var page_column_model = new Array();
	var page_search_items = new Array();
	var page_list_buttons = new Array();
	
	//var jRad = $.jRad('/sps-ws','rad','SpreadWay');	//通过URL获取RAD配置（有RAD后台时使用）
	var entityModel = {
			"cnName":"推广码",
			"complexQuery":false,
			"domainName":"rad",
			"enName":"SpreadWay",
			"fields":[
					  {"chineseName":"序号","dataSource":[],"defaultValue":"","fieldName":"no","fieldType":"NormalInput","validatorModel":[{"msg":"输入过长","type":"max","value":"128"}]},
			          {"chineseName":"推广方式","dataSource":[],"defaultValue":"","fieldName":"name","fieldType":"NormalInput","validatorModel":[{"msg":"推广方式不能为空","type":"min","value":"1"},{"msg":"输入过长","type":"max","value":"128"}]},
			          {"chineseName":"推广码","dataSource":[],"defaultValue":"","fieldName":"code","fieldType":"NormalInput","validatorModel":[{"msg":"输入过长","type":"max","value":"128"}]}],
	          "handledSQL":"",
	          "rowdses":[],
	          "sql":"",
	          "tableName":""
	          };//静态生成的RAD 配置（没有RAD后台时使用）
	var jRad = $.jRad({app:'sps-ws',entityModel:entityModel});
	
	page_column_model.push({display: '序号', name : 'no',  sortable : true});
	page_column_model.push({display: '推广方式', name : 'name',  sortable : true});
	page_column_model.push({display: '推广码', name : 'code',  sortable : true});
	
	page_search_items.push({row:'1',type:'jrad-input',display:'关键字',name:'keyword'});
	jRad.validators['name'] = [{msg: '推广方式不能为空！',type:'min',value:1},{msg: '推广方式输入过长！',type:'max',value:128},{msg: '只能是汉字、数字、英文字母、下划线且不能以下划线开头和结尾！',type:'regex',value:/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/g}];
	page_list_buttons.push({title: '创建',name:'Add', bclass: 'add',onpress : function(){
			var code = $ .jRadGet({url :'/sps-ws/ws/0.1/spreadway/getCode'});
		
			if(!code || code == '') {
				$('#Table_rad_SpreadWay').flexMessage('推广码已经到最大两位数,无法生成推广码！', 'warning');
				return;
			}
		
			$('#Form_rad_SpreadWay').form({
				title: '创建推广码',
				validators: jRad.validators,
				fields_params:jRad.params,
				type: 'post',
				dataType: 'json',
				item:{"code":code},
				style:{height:'300px'},
				url:'/sps-ws/ws/0.1/spreadway/addSpreadWay',
				success_callback:function(){
					$('#Table_rad_SpreadWay').flexMessage('创建成功', 'success');
					$('#Table_rad_SpreadWay').flexReload();
				}
			}).form('open');
		}
	});
	page_list_buttons.push({title: '修改',name:'Edit', bclass: 'edit',prefunc:function(){
			var checked = $('#Table_rad_SpreadWay').getCheckedTrs();
			if (checked.length != 1) {return false;}else{return true;}
		},onpress : function(){
			var checked = $('#Table_rad_SpreadWay').getCheckedTrs();
			var item = $ .jRadGet({url : '/sps-ws/ws/0.1/spreadway/getSpreadWay/'+checked[0].id});
			if(checked[0]) {
					$('#Form_rad_SpreadWay').form({grid:'16',
						title: '修改推广码',
					    validators: jRad.validators,
						fields_params:jRad.params,
					    item:item,
					    before_submit: function(json){
					    	return json;
					    },
					    url:'/sps-ws/ws/0.1/spreadway/modifySpreadWay',
					    success_callback:function(){
					    	$('#Table_rad_SpreadWay').flexMessage('修改成功', 'success');
					    	$('#Table_rad_SpreadWay').flexReload();
					    },
					    style:{height:'300px'}
				    }).form('open');
			}
		}
	});
	page_list_buttons.push({title: '删除',name:'delete',bclass: 'delete',prefunc:function(){
        	var checked = $('#Table_rad_SpreadWay').getCheckedTrs();
        	if (checked.length != 0) {
        		return true;
        	}else{
        		return false;
        	}
        },onpress : function(){
			var checked = $('#Table_rad_SpreadWay').getCheckedTrs();
			$ .jRadConfirm('确认删除？',1,function(){
				$(checked).each(function(index){
					 $.ajax({
               		 	url : "/sps-ws/ws/0.1/spreadway/delSpreadWay/"+this.id,
                	 	type : "delete",
               	 		dataType : 'text',
               	    	success : function(data) {
               	    		$('#Table_rad_SpreadWay').flexMessage('删除成功', 'success');
               	    		$('#Table_rad_SpreadWay').flexReload();
               	    	},
               	    	error: function(xhr) {
               	    	 	var status = xhr.status;
               	    		var responseText = xhr.responseText;
               	    		var data = eval('('+responseText+')');
               	    		if(status == 400 && data[0]) {
               	    			$('#Table_rad_SpreadWay').flexMessage(data[0].message, 'error');
               	    		}
               	    	}
            		});
				});
			});
		}
	});
	page_list_buttons.push({separator: true});
	
    $('#Table_rad_SpreadWay').flexigrid({
			reload:true,
			method: "GET",
			preProcess:function(data){
				var jsonArr = data.items;
				for(var i=0;i<data.items.length;i++){
					jsonArr[i].no = i+1;
				}
				return data;
			},
			colModel : page_column_model,
			buttons : page_list_buttons,
			searchitems :page_search_items,
			pagedStyle: 'oc',
			checkBoxType:'single',
			pagination: {diaplay_pages:5,align:'bottom'},
			url:'/sps-ws/ws/0.1/spreadway/getSpreadWay',
			onError:function(xhr) {
				var status = xhr.status;
				
				if(status == 401){
	                $.jRadAlert('用户未登录点击确定返回登录页','error',function(){
	                    index.logOut();
	                },-1);
	            } else {
	            	$.jRadMessage({level:'error',message: "获取数据发生异常",selector:$("#Wraper_rad_SpreadWay .bbit-grid .cDiv")});
				}
			}
	});
});
</script>
