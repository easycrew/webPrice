<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div class="urlContentWraper" id="Wraper_rad_HistoryPackage">
	<div class="ui-info-layout">
		<!-- 列表显示 -->
		<table id="Table_rad_HistoryPackage"></table>
    </div>
	
</div>
<script type="text/javascript">
$(document).ready(function(){
	var wraper = $('#Wraper_rad_HistoryPackage');
	var page_column_model = new Array();
	var page_search_items = new Array();
	var page_list_buttons = new Array();
	
	//var jRad = $.jRad('/sps-ws','rad','PackageItem');	//通过URL获取RAD配置（有RAD后台时使用）
	var entityModel = {
			"cnName":"渠道包下载",
			"complexQuery":false,
			"domainName":"rad",
			"enName":"PackageItem",
			"fields":[
			          //{"chineseName":"打包任务ID","dataSource":[],"defaultValue":"","fieldName":"packageTaskId","fieldType":"NormalInput","validatorModel":[{"msg":"输入过长","type":"max","value":"20"}]},
			          {"chineseName":"应用名称","dataSource":[{"optionName":"name","optionValue":"id","type":"url","url":"","value":"/sps-ws/ws/0.1/app/getAllAppName"}],"defaultValue":"","fieldName":"appId","fieldType":"Select","validatorModel":[{"msg":"输入过长","type":"max","value":"20"}]},
			          {"chineseName":"渠道名称","dataSource":[{"optionName":"name","optionValue":"id","type":"url","url":"","value":"/sps-ws/ws/0.1/channel/getAllChannelName"}],"defaultValue":"","fieldName":"channelId","fieldType":"Select","validatorModel":[{"msg":"输入过长","type":"max","value":"128"}]},
			          {"chineseName":"渠道码","dataSource":[{"optionName":"name","optionValue":"id","type":"url","url":"","value":""}],"defaultValue":"","fieldName":"channelCodeId","fieldType":"Select","validatorModel":[{"msg":"输入过长","type":"max","value":"128"}]},
			          {"chineseName":"应用版本","dataSource":[{"optionName":"name","optionValue":"id","type":"url","url":"","value":""}],"defaultValue":"","fieldName":"appVersionId","fieldType":"Select","validatorModel":[{"msg":"输入过长","type":"max","value":"128"}]},
			          {"chineseName":"打包状态","dataSource":[],"defaultValue":"","fieldName":"status","fieldType":"NormalInput","validatorModel":[{"msg":"0:正在打包 1：打包完成 2: 打包失败输入过长","type":"max","value":"32"}]},
			          {"chineseName":"文件路径","dataSource":[],"defaultValue":"","fieldName":"fileUrl","fieldType":"NormalInput","validatorModel":[{"msg":"输入过长","type":"max","value":"512"}]},
			          {"chineseName":"文件ID","dataSource":[],"defaultValue":"","fieldName":"fileId","fieldType":"NormalInput","validatorModel":[{"msg":"输入过长","type":"max","value":"20"}]}
			          ],
			          "handledSQL":"",
			          "rowdses":[],
			          "sql":"",
			          "tableName":""
			          };//静态生成的RAD 配置（没有RAD后台时使用）
	var jRad = $.jRad({app:'sps-ws',entityModel:entityModel});
	
	page_column_model.push({display: '打包项目名称', name : 'projectName',  sortable : true});
	page_column_model.push({display: '打包时间', name : 'packagedTime',  sortable : true});
	page_column_model.push({display: '打包产品', name : 'appName',  sortable : true});
	page_column_model.push({display: '渠道简称', name : 'channelName',  sortable : true});
	page_column_model.push({display: '渠道标识', name : 'mark',  sortable : true});
	page_column_model.push({display: '渠道码', name : 'channelCode' });
	page_column_model.push({display: '版本', name : 'appVersion',  sortable : true});
	page_column_model.push({display: '打包状态', name : 'status',  sortable : true});
	
	
    $('#Table_rad_HistoryPackage').flexigrid({
			reload:true,
			method:'GET',
			colModel : page_column_model,
			buttons : page_list_buttons,
			searchitems :page_search_items,
			checkBoxType:'single',
			preProcess:function(data){
				var jsonArr = data.items;
				for(var i=0;i<data.items.length;i++){
					var status = jsonArr[i].status;
					if(status == '0'){
						jsonArr[i].status = '正在打包';
					}else if(status == '1'){
						jsonArr[i].status = '打包成功';
					}else if(status == '2'){
						jsonArr[i].status = '打包失败';
					}
				}
				return data;
			},
			pagedStyle: 'oc',
			url:'/sps-ws/ws/0.1/package/historyPackagedList',
			onError:function(xhr) {
				var status = xhr.status;
				
				if(status == 401){
	                $.jRadAlert('用户未登录点击确定返回登录页','error',function(){
	                    index.logOut();
	                },-1);
	            } else {
	            	$.jRadMessage({level:'error',message: "获取数据发生异常",selector:$("#Wraper_rad_HistoryPackage .bbit-grid .cDiv")});
				}
			}
	});
});
</script>
