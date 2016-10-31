<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div class="urlContentWraper" id="Wraper_rad_Channel">
	<div class="row-fluid ui-data-show">
		<!-- 列表显示 -->
			<!-- <div class="ui-info-layout-subbox-left span12"> -->
			<div class="hDiv">
				 <h2 class="ui-tit"><strong>渠道列表</strong></h2> 
				<table id="Table_rad_Channel"></table>
			</div>
			<!-- <div class="details-drag-e"><span class="details-switcher-hide"></span></div> -->
			<!-- <div class="ui-info-layout-subbox-right span12"> -->
			<div class="bDiv">
				<br/>
				 <h2 class="ui-tit"><strong>渠道码列表</strong></h2> 
				<table id="Table_rad_Channel_Code"></table>
			</div> 
    </div>
	<div id="Form_rad_Channel" style="display:none;">
		<div class="grid-layout-main jrad-form">
			<input name="id" type="hidden">
			<div class="row">
				 <label class="span3 grid-layout-label">渠道全称：</label>
	          	 <div class="span5 grid-layout-content">
					   <div name="name" class="jrad-input-container"></div>
					   				</div>
			</div>
			<div class="row">
				 <label class="span3 grid-layout-label">渠道简称：</label>
	          	 <div class="span5 grid-layout-content">
					   <div name="abbreviation" class="jrad-input-container"></div>
					   				</div>
			</div>
			<div class="row">
				 <label class="span3 grid-layout-label">登录账号：</label>
	          	 <div class="span5 grid-layout-content">
					   <div name="account" class="jrad-input-container"></div>
					   				</div>
			</div>
			<div class="row">
				 <label class="span3 grid-layout-label">渠道标识：</label>
	          	 <div class="span5 grid-layout-content  text-content">
					   <div name="mark" class="jrad-content-container"></div>
					   				</div>
			</div>
		</div>
		<div class="jrad-buttons-container ui-buttons-container">
			<span class="jrad-btn-primary">确定</span>
			<span class="jrad-btn-normal">取消</span>
		</div>
	</div>
	<!-- 渠道码Form -->
	<div id="Form_rad_Channel_Code" style="display:none;">
		<div class="grid-layout-main jrad-form">
			<input name="channelId" type="hidden">
			<div class="row">
				 <label class="span3 grid-layout-label">渠道标识：</label>
	          	 <div class="span5 grid-layout-content  text-content">
					   <div name="channelMark" class="jrad-content-container"></div>
					   				</div>
			</div>
			<div class="row">
				 <label class="span3 grid-layout-label">渠道简称：</label>
	          	 <div class="span5 grid-layout-content  text-content">
					   <div name="abbr" class="jrad-content-container"></div>
					   				</div>
			</div>
			<div class="row">
				 <label class="span3 grid-layout-label">推广方式：</label>
	          	 <div class="span5 grid-layout-content">
					   <div name="spreadWay" class="jrad-select-container"></div>
					   				</div>
			</div>
			<div class="row">
				 <label class="span3 grid-layout-label">结算方式：</label>
	          	 <div class="span5 grid-layout-content">
					   <div name="settlementWay" class="jrad-select-container"></div>
					   				</div>
			</div>
			<div class="row">
				<label class="span3 grid-layout-label">扣量百分比：</label>
	          	<div class="span5 grid-layout-content">
					   <div name="deduction" class="jrad-input-container"></div>%
	   			</div>
			</div>
			<div class="row">
				 <label class="span3 grid-layout-label">渠道码：</label>
	          	 <div class="span5 grid-layout-content  text-content">
					   <div id="channelCode_content" name="channelCode" class="jrad-content-container"></div>
					   				</div>
			</div>
		</div>
		<div class="jrad-buttons-container ui-buttons-container">
			<span class="jrad-btn-primary">确定</span>
			<span class="jrad-btn-normal">取消</span>
		</div>
	</div>
</div>
<script type="text/javascript">
$(document).ready(function(){
	var wraper = $('#Wraper_rad_Channel');
	//渠道列表中的列模型，搜索项，按钮
	var page_column_model = new Array();
	var page_search_items = new Array();
	var page_list_buttons = new Array();
	
	//渠道码列表中的列模型，搜索项，按钮
	var page_column_model_c = new Array();
	var page_search_items_c = new Array();
	var page_list_buttons_c = new Array();
	
	//var jRad = $.jRad('/sps-ws','rad','Channel');	//通过URL获取RAD配置（有RAD后台时使用）
	var entityModel = {
			"cnName":"",
			"complexQuery":false,
			"domainName":"rad",
			"enName":"Channel",
			"fields":[
			          {"chineseName":"渠道全称","dataSource":[],"defaultValue":"","fieldName":"name","fieldType":"NormalInput","validatorModel":[{"msg":"请输入","type":"min","value":"1"},{"msg":"输入过长","type":"max","value":"128"}]},
			          {"chineseName":"渠道简称","dataSource":[],"defaultValue":"","fieldName":"abbreviation","fieldType":"NormalInput","validatorModel":[{"msg":"请输入","type":"min","value":"1"},{"msg":"输入过长","type":"max","value":"128"}]},
			          {"chineseName":"渠道标识","dataSource":[],"defaultValue":"","fieldName":"mark","fieldType":"NormalInput","validatorModel":[{"msg":"输入过长","type":"max","value":"128"}]},
			          {"chineseName":"扣量","dataSource":[],"defaultValue":"","fieldName":"deduction","fieldType":"NormalInput","validatorModel":[{"msg":"必须是0~100之间的数字","type":"regex","value": /^(0|100|[1-9]{1}\d?)$/}]},
			          {"chineseName":"登录账号","dataSource":[],"defaultValue":"","fieldName":"account","fieldType":"NormalInput","validatorModel":[{"msg":"输入过长","type":"max","value":"30"}]},
			          {"chineseName":"渠道码数量","dataSource":[],"defaultValue":"","fieldName":"codeCount","fieldType":"NormalInput","validatorModel":[{"msg":"输入过长","type":"max","value":"128"}]},
			          {"chineseName":"渠道码","dataSource":[],"defaultValue":"","fieldName":"code","fieldType":"NormalInput","validatorModel":[{"msg":"输入过长","type":"max","value":"128"}]},
			          {"chineseName":"定义","dataSource":[],"defaultValue":"","fieldName":"define","fieldType":"NormalInput","validatorModel":[{"msg":"输入过长","type":"max","value":"128"}]}
			         ],
			"handledSQL":"",
			"rowdses":[],
			"sql":"",
			"tableName":""
			};//静态生成的RAD 配置（没有RAD后台时使用）
	var jRad = $.jRad({app:'sps-ws',entityModel:entityModel});

	jRad.params['deduction'] = {grid: 2};
	
	//渠道列表中的列
	page_column_model.push({display: '渠道全称', name : 'name',  sortable : true});
	page_column_model.push({display: '渠道简称', name : 'abbreviation',  sortable : true});
	page_column_model.push({display: '渠道标识', name : 'mark',  sortable : true});
	page_column_model.push({display: '渠道码数量', name : 'codeCount',  sortable : true});
	
	//渠道码列表中的列
	page_column_model_c.push({display: '渠道码', name : 'code', sortable : true});
	page_column_model_c.push({display: '定义', name : 'define', sortable : true});
	page_column_model_c.push({display: '扣量百分比', name : 'deduction', sortable : true, width: 120,type: 'input' ,submit: {url: '/sps-ws/ws/0.1/channel/modifyChannelDeduction',type:'post',error: function(data){
		var result = eval('('+data.responseText+')');
		if(result && result[0]) {
			$('#Table_rad_Channel_Code').flexMessage(result[0].message,'error', false);
		}
	}}});
	
	//渠道列表中的搜索项
	page_search_items.push({row:'1',type:'jrad-input',display:'关键字',name:'keyword'});
	
	//向渠道列表中添加创建按钮
	page_list_buttons.push({title: '创建',name:'Add', bclass: 'add',onpress : function(){
		var mark = $ .jRadGet({url :'/sps-ws/ws/0.1/channel/getChannelMark'});
		
		if(!mark || mark == '') {
			$('#Table_rad_Channel').flexMessage('渠道码已经到最大三位数,无法生成渠道码！', 'warning');
			return;
		}
		
			$('#Form_rad_Channel').form({
				title: '创建',
				validators: jRad.validators,
				fields_params:jRad.params,
				item:{"mark":mark},
				style:{height:'300px'},
				url:'/sps-ws/ws/0.1/channel/addChannel',
				success_callback:function(){
					$('#Table_rad_Channel').flexMessage('创建成功', 'success');
					$('#Table_rad_Channel').flexReload();
				}
			}).form('open');
		}
	});
	
	
	//向渠道列表中添加修改按钮
	page_list_buttons.push({title: '修改',name:'Edit', bclass: 'edit',prefunc:function(){
			var checked = $('#Table_rad_Channel').getCheckedTrs();
			if (checked.length != 1) {return false;}else{return true;}
		},onpress : function(){
			var checked = $('#Table_rad_Channel').getCheckedTrs();
			var item = $ .jRadGet({url : '/sps-ws/ws/0.1/channel/getChannel/'+checked[0].id});
			if(checked[0]) {
					$('#Form_rad_Channel').form({grid:'16',
						title: '修改',
					    validators: jRad.validators,
						fields_params:jRad.params,
					    item:item,
					    before_submit: function(json){
					    	return json;
					    },
					    url:'/sps-ws/ws/0.1/channel/modifyChannel',
					    success_callback:function(){
					    	$('#Table_rad_Channel').flexMessage('修改成功', 'success');
					    	$('#Table_rad_Channel').flexReload();
					    },
					    style:{height:'300px'}
				    }).form('open');
			}
		}
	});
	
	//向渠道列表中添加删除按钮
	page_list_buttons.push({title: '删除',name:'delete',bclass: 'delete',prefunc:function(){
        	var checked = $('#Table_rad_Channel').getCheckedTrs();
        	if (checked.length != 0) {
        		return true;
        	}else{
        		return false;
        	}
        },onpress : function(){
			var checked = $('#Table_rad_Channel').getCheckedTrs();
			$ .jRadConfirm('确认删除？',1,function(){
				$(checked).each(function(index){
					 $.ajax({
               		 	url : "/sps-ws/ws/0.1/channel/delChannel/"+this.id,
                	 	type : "delete",
               	 		dataType : 'text',
               	    	success : function(data) {
               	    		$('#Table_rad_Channel').flexMessage('删除成功', 'success');
               	    		$('#Table_rad_Channel').flexReload();
               	    		$.ajax({
			           		 	url : "/sps-ws/ws/0.1/channel/getChannelCodeById?id=-1",
			            	 	type : "get",
			           	 		dataType : 'json',
			           	    	success : function(data) {
			           	    		$('#Table_rad_Channel_Code').flexAddData (data.items);
			           	    	}
			        		});
               	    	},
               	    	error: function(xhr) {
               	    	 	var status = xhr.status;
               	    		var responseText = xhr.responseText;
               	    		var data = eval('('+responseText+')');
               	    		if(status == 400 && data[0]) {
               	    			$('#Table_rad_Channel').flexMessage(data[0].message, 'error');
               	    			$('#Table_rad_Channel').flexReload();
               	    			
               	    		}
               	    	}
            		});
				});
			});
		}
	});
	//向渠道列表中添加分隔符
	page_list_buttons.push({separator: true});
	
	//----------------------------------------------------------------------------------------
	var channelCode = "";
	var spreadWayCode = "";
	var settlementWayCode = "";
	
	var spreadWayItems = $.jRadGet({url:'/sps-ws/ws/0.1/spreadway/getAllSpreadWay'});
	
	spreadWayItems = $ .jRadUnshift(spreadWayItems,{id:'',name:'请选择'});
	jRad.params['spreadWay'] = {data:spreadWayItems,onchange:function(){
		spreadWayCode = $('div[name=spreadWay]').select('val');
		$('#channelCode_content').html(channelCode + spreadWayCode + settlementWayCode);
	}};
	
	var settlementWayItems = $.jRadGet({url:'/sps-ws/ws/0.1/settlement/getAllSettleWay'});
	settlementWayItems = $ .jRadUnshift(settlementWayItems,{id:'',name:'请选择'});
	jRad.params['settlementWay'] = {data:settlementWayItems,onchange:function(){
		settlementWayCode = $('div[name=settlementWay]').select('val');
		$('#channelCode_content').html(channelCode + spreadWayCode + settlementWayCode);
	}};
	
	//向渠道码列表中添加创建按钮
	page_list_buttons_c.push({title: '创建渠道码',name:'Add', bclass: 'add',onpress : function(){
		var checked = $('#Table_rad_Channel').getCheckedTrs();
		if(checked.length == 0){
			$('#Table_rad_Channel_Code').flexMessage('请先选择一条渠道信息！', 'warning');
			return false;
		}
		
		channelCode = checked[0].mark;
		
		
			$('#Form_rad_Channel_Code').form({
				title: '创建',
				validators: jRad.validators,
				fields_params:jRad.params,
				item:{"abbr":checked[0].abbreviation,"channelMark":checked[0].mark,"channelCode":channelCode},
				before_submit:function(json){
					json.channelId = checked[0].id;
					return json;
				}, 
				style:{height:'300px'},
				url:'/sps-ws/ws/0.1/channel/addChannelCode',
				success_callback:function(){
					$('#Table_rad_Channel_Code').flexMessage('创建成功', 'success');
					var checked = $('#Table_rad_Channel').getCheckedTrs();
					var id = checked[0].id;
					$.ajax({
	           		 	url : "/sps-ws/ws/0.1/channel/getChannelCodeById?id="+id,
	            	 	type : "get",
	           	 		dataType : 'json',
	           	    	success : function(data) {
	           	    		$('#Table_rad_Channel_Code').flexAddData (data.items);
	           	    		$('#Table_rad_Channel_Code').flexReload();
	           	    	}
	        		});
				}
			}).form('open');
		}
	});
	
	//向渠道码列表中添加修改按钮
	page_list_buttons_c.push({title: '修改渠道码',name:'Edit', bclass: 'edit',prefunc:function(){
			var checked = $('#Table_rad_Channel_Code').getCheckedTrs();
			if (checked.length != 1) {
				return false;
			}else{
				var c = $('#Table_rad_Channel').getCheckedTrs();
				if(c.length == 0){
					$('#Table_rad_Channel_Code').flexMessage('必须要选择渠道！', 'error');
					return false;
				}
				return true;
			}
		},onpress : function(){
			var checked = $('#Table_rad_Channel_Code').getCheckedTrs();
			var c = $('#Table_rad_Channel').getCheckedTrs();
			if(c.length == 0){
				$('#Table_rad_Channel_Code').flexMessage('必须要选择渠道！', 'error');
				return false;
			}
			channelCode = c[0].mark;
			var spread = checked[0].code.substring(3,5);
			var settle = checked[0].code.substring(5,7);
			//var item = $ .jRadGet({url : '/sps-ws/ws/0.1/channel/getChannelCodeByCodeId?id='+checked[0].id});
			if(checked[0]) {
					$('#Form_rad_Channel_Code').form({grid:'16',
						title: '修改渠道码',
					    validators: jRad.validators,
						fields_params: jRad.params,
					    item:{
					    	"abbr":c[0].abbreviation,
					    	"channelMark":c[0].mark,
					    	"channelCode":checked[0].code,
					    	"spreadWay":spread,
					    	"settlementWay":settle,
					    	"deduction": checked[0].deduction
					    },
					    before_submit: function(json){
					    	json.channelId = c[0].id;
					    	json.id = checked[0].id;
					    	return json;
					    },
					    url:'/sps-ws/ws/0.1/channel/modifyChannelCode',
					    success_callback:function(){
					    	$('#Table_rad_Channel_Code').flexMessage('修改成功', 'success');
					    	$('#Table_rad_Channel_Code').flexReload();
					    	var checked = $('#Table_rad_Channel').getCheckedTrs();
							var id = checked[0].id;
							$.ajax({
			           		 	url : "/sps-ws/ws/0.1/channel/getChannelCodeById?id="+id,
			            	 	type : "get",
			           	 		dataType : 'json',
			           	    	success : function(data) {
			           	    		$('#Table_rad_Channel_Code').flexAddData (data.items);
			           	    	}
			        		});
					    },
					    style:{height:'300px'}
				    }).form('open');
			}
		}
	});
	
	//向渠道列表中添加删除按钮
	page_list_buttons_c.push({title: '删除渠道码',name:'delete',bclass: 'delete',prefunc:function(){
        	var checked = $('#Table_rad_Channel_Code').getCheckedTrs();
        	if (checked.length != 0) {
        		return true;
        	}else{
        		return false;
        	}
        },onpress : function(){
        	var checked = $('#Table_rad_Channel_Code').getCheckedTrs();
        	if (checked.length != 1) {
				$('#Table_rad_Channel_Code').flexMessage('请选择一条记录进行删除', 'warn');
				return false;
			}
        	
			var checked = $('#Table_rad_Channel_Code').getCheckedTrs();
			$ .jRadConfirm('确认删除？',1,function(){
				$(checked).each(function(index){
					 $.ajax({
               		 	url : "/sps-ws/ws/0.1/channel/delChannelCode/"+this.id,
                	 	type : "delete",
               	 		dataType : 'text',
               	    	success : function(data) {
               	    		$('#Table_rad_Channel_Code').flexMessage('删除成功', 'success');
               	    		$('#Table_rad_Channel_Code').flexReload();
               	    		var checked = $('#Table_rad_Channel').getCheckedTrs();
            				var id = checked[0].id;
            				$.ajax({
                       		 	url : "/sps-ws/ws/0.1/channel/getChannelCodeById?id="+id,
                        	 	type : "get",
                       	 		dataType : 'json',
                       	    	success : function(data) {
                       	    		$('#Table_rad_Channel_Code').flexAddData (data.items);
                       	    	}
                    		});
               	    	},
               	    	error: function(xhr) {
               	    	 	var status = xhr.status;
               	    		var responseText = xhr.responseText;
               	    		var data = eval('('+responseText+')');
               	    		if(status == 400 && data[0]) {
               	    			$('#Table_rad_Channel_Code').flexMessage(data[0].message, 'error');
               	    		}
               	    	}
            		});
				});
			});
		}
	});
	//向渠道列表中添加分隔符
	page_list_buttons_c.push({separator: true});
	
	//-------------------------------------------------------------------------------------------------
	
	//渲染渠道列表
	 $('#Table_rad_Channel').flexigrid({
		 	reload:true,
		 	method:'GET',
			colModel : page_column_model,
			buttons : page_list_buttons,
			searchitems :page_search_items,
			pagedStyle: 'OC',
			checkBoxType:'single',
			rp:10,
			trEvent:function(){		//监听行事件
				var checked = $('#Table_rad_Channel').getCheckedTrs();
				var id = checked[0].id;
				$.ajax({
           		 	url : "/sps-ws/ws/0.1/channel/getChannelCodeById?id="+id,
            	 	type : "get",
           	 		dataType : 'json',
           	    	success : function(data) {
           	    		$('#Table_rad_Channel_Code').flexAddData (data.items);
           	    	}
        		});
			},
			pagination: {diaplay_pages:5,align:'bottom'},
			onSuccess: function(){
				$.ajax({
           		 	url : "/sps-ws/ws/0.1/channel/getChannelCodeById?id=-1",
            	 	type : "get",
           	 		dataType : 'json',
           	    	success : function(data) {
           	    		$('#Table_rad_Channel_Code').flexAddData (data.items);
           	    	}
        		});
			},
			url:'/sps-ws/ws/0.1/channel/getChannel' ,
			onError:function(xhr) {
				var status = xhr.status;
				
				if(status == 401){
	                $.jRadAlert('用户未登录点击确定返回登录页','error',function(){
	                    index.logOut();
	                },-1);
	            } else {
	            	$.jRadMessage({level:'error',message: "获取数据发生异常",selector:$("#Wraper_rad_Channel .bbit-grid .cDiv")});
				}
			}
	});
	 
	//渲染渠道码列表
	 $('#Table_rad_Channel_Code').flexigrid({
			colModel : page_column_model_c,
			buttons : page_list_buttons_c,
			searchitems :page_search_items_c,
			pagedStyle: 'RAD',
			checkBoxType:'single',
			rp:100
	});
	
	
});
</script>
