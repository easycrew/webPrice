<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div class="urlContentWraper" id="Wraper_settle_AccountsWay">
	<!-- 列表显示 -->
	<div class="ui-info-layout">
		<h2 class="ui-tit">
			<strong>
				结算列表
			</strong>
		</h2>
		<div class="row-fluid ui-data-show">
			<div class="span12">
				<table id="Table_settle_AccountsWay"></table>
			</div>
			<div class="details-drag-e"><span class="details-switcher-hide"></span></div>
			<div class="span12">
				<div class="details-box">
					<ul class="details-tab">
						<li class="tab-cur-first tab-cur">
							<span>
								信息详情
							</span>
						</li>
					</ul>
					<div class="details-content">
						<div class="details-scroll">
							<div class="details-content-inner">
								<div class="ui-info-layout-subbox">
									<div class="ui-info-layout-inner">
										<div id="Form_settle_AccountsWay_right" class="ui-form">
											<div class="grid-layout-main jrad-form">
												<input name="id" type="hidden">
												<div class="row">
													<label class="span3 grid-layout-label">：</label>
													<div class="span5 grid-layout-content">
														<div name="name" class="jrad-input-container"></div>
																									</div>
												</div>
												<div class="row">
													<label class="span3 grid-layout-label">：</label>
													<div class="span5 grid-layout-content">
														<div name="code" class="jrad-input-container"></div>
																									</div>
												</div>
											</div>
											<div class="jrad-buttons-container ui-buttons-container">
												<span class="jrad-btn-primary">
													保存
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
$(document).ready(function() {
	var wraper = $('#Wraper_settle_AccountsWay');
	var page_column_model = new Array();
	var page_search_items = new Array();
	var page_list_buttons = new Array();
	
	//var jRad = $.jRad('/appmanage-ws','settle','AccountsWay');	//通过URL获取RAD配置（有RAD后台时使用）
	var entityModel = {"cnName":"结算","complexQuery":false,"domainName":"settle","enName":"AccountsWay","fields":[{"chineseName":"","columnName":"","dataSource":[],"defaultValue":"","fieldName":"name","fieldType":"NormalInput","hasComplexQueryModel":false,"hasCreateModel":true,"hasExportModel":false,"hasSimpleQueryModel":true,"hasUpdateModel":true,"hasViewModel":true,"modelURI":"","prompt":"  ","rowValue":"","validatorModel":[{"msg":"输入过长","type":"max","value":"128"}]},{"chineseName":"","columnName":"","dataSource":[],"defaultValue":"","fieldName":"code","fieldType":"NormalInput","hasComplexQueryModel":false,"hasCreateModel":true,"hasExportModel":false,"hasSimpleQueryModel":true,"hasUpdateModel":true,"hasViewModel":true,"modelURI":"","prompt":"  ","rowValue":"","validatorModel":[{"msg":"输入过长","type":"max","value":"128"}]}],"handledSQL":"","rowdses":[],"sql":"","tableName":""};//静态生成的RAD 配置（没有RAD后台时使用）
	var jRad = $.jRad({app:'appmanage-ws',entityModel:entityModel});
	
	
	page_column_model.push({display: '', name : 'name',  sortable : true});
	page_column_model.push({display: '', name : 'code',  sortable : true});
	page_search_items.push({type:'jrad-input',display:'',name:'name',qop:'like'});
	page_search_items.push({type:'jrad-input',display:'',name:'code',qop:'like'});
	page_list_buttons.push({title: '创建',name: 'Add',bclass: 'add',onpress: function() {
			$('#Form_settle_AccountsWay_right').form({
				validators: jRad.validators,
				fields_params:jRad.params,
				item:{},
				url:'/appmanage-ws/ws/0.1/settle/AccountsWay',
				success_callback: function() {
					$('#Form_settle_AccountsWay_right').form({
						item: {}
					});
					$('#Form_settle_AccountsWay_right').form('message', '创建结算成功', 'success');
					$('#Table_settle_AccountsWay').flexReload();
				}
			});
		}
	});
	page_list_buttons.push({title: '删除', name: 'delete', bclass: 'delete',prefunc:function(){
        	var checked = $('#Table_settle_AccountsWay').getCheckedTrs();
        	if (checked.length != 0) {
        		return true;
        	}else{
        		return false;
        	}
        }, onpress: function() {
			var checked = $('#Table_settle_AccountsWay').getCheckedTrs();
			if (checked.length == 0) {
				$('#Table_settle_AccountsWay').flexMessage("请选择要删除的记录", 'warning');
			} else {
				$ .jRadConfirm('确认删除？', 'warning',
				function() {
					$(checked).each(function(index) {
						$ .ajax({
							url : "/appmanage-ws/ws/0.1/settle/AccountsWay/"+this.id,
                            type : "delete",
                           	dataType : 'text',
							success: function(data) {
								$('#Table_settle_AccountsWay').flexMessage('删除成功', 'success');
								$('#Table_settle_AccountsWay').flexReload();
							}
						});
					});
				});
			}
		}
	});
	page_list_buttons.push({title: '导出', displayname: '导出', name: 'export', bclass: 'export', onpress: function() {
			$('#Table_settle_AccountsWay').exportExcel({url:'/appmanage-ws/ws/0.1/export/settle/AccountsWays'});
		}
	});
	page_list_buttons.push({
		separator: true
	});
	$('#Table_settle_AccountsWay').flexigrid({
		colModel: page_column_model,
		buttons: page_list_buttons,
		searchitems: page_search_items,
		rowdses: page_params_rowds,
		pagedStyle: 'RAD',
		trEvent: function(row) {
			var id = row.find('input[type=checkbox]').val();
			var item = $ .jRadGet({
				url: '/appmanage-ws/ws/0.1/settle/AccountsWays' + id
			});
			$('#Form_settle_AccountsWay_right').form({
				url: '/appmanage-ws/ws/0.1/settle/AccountsWay' + id,
				item: item,
				success_callback: function() {
					$('#Form_settle_AccountsWay_right').form({
						validators: jRad.validators,
						fields_params: jRad.params,
						url: 'appmanage-ws/ws/0.1/settle/AccountsWay',
						item: {},
						success_callback: function() {
							$('#Form_settle_AccountsWay_right').form('message', '创建成功', 'success');
							$('#Table_settle_AccountsWay').flexReload();
						}
					});
					$('#Form_settle_AccountsWay_right').form('message', '修改成功', 'success');
					$('#Table_settle_AccountsWay').flexReload();
				}
			});
		},
		url:'/appmanage-ws/ws/0.1/settle/AccountsWays'
	});
	$('#Form_settle_AccountsWay_right').form({
		layout: 'grid',
		validators: jRad.validators,
		fields_params: jRad.params,
		item: {},
		success_callback: function() {
			$('#Form_settle_AccountsWay_right').form('message', '创建成功', 'success');
			$('#Table_settle_AccountsWay').flexReload();
		},
		url: 'appmanage-ws/ws/0.1/settle/AccountsWay'
	});
	$('.details-switcher-hide',wraper).click(function(){
		if($( '.ui-info-layout-subbox-left',wraper).is(':hidden')) {
			$(this).removeClass().addClass('details-switcher-hide');
			$( '.ui-info-layout-subbox-right',wraper).width('');
			$( '.details-drag-e',wraper).css('left','');
			$( '.ui-info-layout-subbox-left',wraper).show();
		} else {
			$(this).removeClass().addClass('details-switcher-show');
			$( '.ui-info-layout-subbox-right',wraper).width('99%');
			$( '.details-drag-e',wraper).css('left','1px');
			$( '.ui-info-layout-subbox-left',wraper).hide();
		}
		$('#Table_settle_AccountsWay').flexReload();
	});
});
</script>