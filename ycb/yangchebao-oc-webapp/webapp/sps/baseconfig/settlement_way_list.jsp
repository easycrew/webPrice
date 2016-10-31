<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div class="urlContentWraper" id="Wraper_settle_AccountsWay">
	<div class="ui-info-layout">
		<h2 class="ui-tit"><strong>结算列表</strong></h2>
		<!-- 列表显示 -->
		<table id="Table_settle_AccountsWay"></table>
    </div>
	<div id="Form_settle_AccountsWay" style="display:none;">
		<div class="grid-layout-main jrad-form">
			<input name="id" type="hidden">
			<input name="code" type="hidden">
			<div class="row">
				 <label class="span3 grid-layout-label">结算方式：</label>
	          	 <div class="span5 grid-layout-content">
					   <div name="name" class="jrad-input-container"></div>
					   				</div>
			</div>
			<div class="row">
				 <label class="span3 grid-layout-label">结算码：</label>
	          	 <div class="span5 grid-layout-content text-content">
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
	var wraper = $('#Wraper_settle_AccountsWay');
	var page_column_model = new Array();
	var page_search_items = new Array();
	var page_list_buttons = new Array();
	
	//var jRad = $.jRad('/sps-ws','settle','AccountsWay');	//通过URL获取RAD配置（有RAD后台时使用）
	var entityModel = {"cnName":"结算","complexQuery":false,"domainName":"settle","enName":"AccountsWay","fields":[{"chineseName":"","columnName":"","dataSource":[],"defaultValue":"","fieldName":"name","fieldType":"NormalInput","hasComplexQueryModel":false,"hasCreateModel":true,"hasExportModel":false,"hasSimpleQueryModel":true,"hasUpdateModel":true,"hasViewModel":true,"modelURI":"","prompt":"  ","rowValue":"","validatorModel":[{"msg":"输入过长","type":"max","value":"128"}]},{"chineseName":"","columnName":"","dataSource":[],"defaultValue":"","fieldName":"code","fieldType":"NormalInput","hasComplexQueryModel":false,"hasCreateModel":true,"hasExportModel":false,"hasSimpleQueryModel":true,"hasUpdateModel":true,"hasViewModel":true,"modelURI":"","prompt":"  ","rowValue":"","validatorModel":[{"msg":"输入过长","type":"max","value":"128"}]}],"handledSQL":"","rowdses":[],"sql":"","tableName":""};//静态生成的RAD 配置（没有RAD后台时使用）
	var jRad = $.jRad({app:'sps-ws',entityModel:entityModel});
	
	page_column_model.push({display: '序号', name : 'number',  sortable : true});
	page_column_model.push({display: '结算方式', name : 'name',  sortable : true});
	page_column_model.push({display: '结算码', name : 'code',  sortable : true});
	
	
	page_search_items.push({row:'1',type:'jrad-input',display:'关键字',name:'nameORcode'});
	
	jRad.validators['name'] = [{msg: '结算方式不能为空！',type:'min',value:1},{msg: '结算方式输入过长！',type:'max',value:30},{msg: '只能是汉字、数字、英文字母、下划线且不能以下划线开头和结尾！',type:'regex',value:/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/g}];
	
	page_list_buttons.push({title: '创建',name:'Add', bclass: 'add',onpress : function(){
		
		var code = $ .jRadGet({url :'/sps-ws/ws/0.1/settlement/get'});
		if(!code || code == '') {
			$('#Table_settle_AccountsWay').flexMessage('code已为最大值99或code获取失败', 'warning');
			return;
		}
			$('#Form_settle_AccountsWay').form({
				title: '创建结算',
				type: 'post',
				dataType: 'json',
				validators: jRad.validators,
				fields_params:jRad.params,
				item:{"code":code},
				style:{height:'300px'},
				url:'/sps-ws/ws/0.1/settlement/add',
				success_callback:function(){
					$('#Table_settle_AccountsWay').flexMessage('创建成功', 'success');
					$('#Table_settle_AccountsWay').flexReload();
				}
			}).form('open');
		}
	});
	
	
	
	page_list_buttons.push({title: '修改',name:'Edit', bclass: 'edit',prefunc:function(){
			var checked = $('#Table_settle_AccountsWay').getCheckedTrs();
			if (checked.length != 1) {return false;}else{return true;}
		},onpress : function(){
			var checked = $('#Table_settle_AccountsWay').getCheckedTrs();
			var item = $ .jRadGet({url : '/sps-ws/ws/0.1/settlement/'+checked[0].id});
			if(checked[0]) {
					$('#Form_settle_AccountsWay').form({grid:'16',
						title: '修改结算',
					    validators: jRad.validators,
						fields_params:jRad.params,
					    item:item,
					    before_submit: function(json){
					    	return json;
					    },
					    url:'/sps-ws/ws/0.1/settlement/update',
					    success_callback:function(){
					    	$('#Table_settle_AccountsWay').flexMessage('修改成功', 'success');
					    	$('#Table_settle_AccountsWay').flexReload();
					    },
					    style:{height:'300px'}
				    }).form('open');
			}
		}
	});
	page_list_buttons.push({title: '删除',name:'delete',bclass: 'delete',prefunc:function(){
        	var checked = $('#Table_settle_AccountsWay').getCheckedTrs();
        	if (checked.length != 0) {
        		return true;
        	}else{
        		return false;
        	}
        },onpress : function(){
			var checked = $('#Table_settle_AccountsWay').getCheckedTrs();
			$ .jRadConfirm('确认删除？',1,function(){
				$(checked).each(function(index){
					 $.ajax({
               		 	url : "/sps-ws/ws/0.1/settlement/"+this.id,
                	 	type : "delete",
               	 		dataType : 'text',
               	    	success : function(data) {
               	    		$('#Table_settle_AccountsWay').flexMessage('删除成功', 'success');
               	    		$('#Table_settle_AccountsWay').flexReload();
               	    	},
               	    	error: function(xhr) {
               	    	 	var status = xhr.status;
               	    		var responseText = xhr.responseText;
               	    		var data = eval('('+responseText+')');
               	    		if(status == 400 && data[0]) {
               	    			$('#Table_settle_AccountsWay').flexMessage(data[0].message, 'error');
               	    		}
               	    	}
            		});
				});
			});
		}
	});
	
	page_list_buttons.push({separator: true});
	
    $('#Table_settle_AccountsWay').flexigrid({
			reload:true,
			method:'get',
			showSearch:true,
			colModel : page_column_model,
			buttons : page_list_buttons,
			searchitems :page_search_items,		
			pagedStyle: 'oc',
			checkBoxType:'single',
			pagination: {diaplay_pages:5,align:'bottom'},
			url:'/sps-ws/ws/0.1/settlement/list',
			onError:function(xhr) {
				var status = xhr.status;
				
				if(status == 401){
	                $.jRadAlert('用户未登录点击确定返回登录页','error',function(){
	                    index.logOut();
	                },-1);
	            } else {
	            	$.jRadMessage({level:'error',message: "获取数据发生异常",selector:$("#Wraper_settle_AccountsWay .bbit-grid .cDiv")});
				}
			}
	});
});


</script>
