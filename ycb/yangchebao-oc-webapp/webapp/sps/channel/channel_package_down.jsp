<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div class="urlContentWraper" id="Wraper_rad_PackageItem">
	<div class="ui-info-layout">
		<h2 class="ui-tit">
			<strong>渠道包下载列表</strong>
		</h2>
		<!-- 列表显示 -->
        <div class="jrad-table">
		  <table id="Table_rad_PackageItem"></table>
        </div>
          <div class="details-box" style="display: none">
            <ul class="details-tab">
                <li class="tab-cur tab-cur-first f-left"><span name="title">创建打包项</span> </li>
                <li class="f-left" style="margin-left:10px"><label>渠道过滤：</label><div id="filterInput"></div></li>
                <li><span class="return"></span></li>
            </ul>
            <div class="details-content">
                <div class="details-scroll">
                    <div class="details-content-inner">
                        <div class="grid-layout ui-form" id="Form_create_PackageItem">
                            <div class="jrad-form">
                                <div class="row">
                                    <label class="span3 grid-layout-label">选择产品名称：</label>
                                    <div class="span5 grid-layout-content">
                                        <div name="appName" class="jrad-select-container"></div>
                                    </div>
                                    <label class="span3 grid-layout-label">选择应用版本：</label>
                                    <div class="span5 grid-layout-content">
                                        <div name="appVersion" class="jrad-select-container"></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <table id="channel-simpletable" style="margin:0 0 0 10px;width:100%"></table>
                                </div>
                                
                                <input type="hidden" name="logoPath">
                                 <div class="offset3 jrad-buttons-container ui-buttons-container">
                                    <span class="jrad-btn-primary">确定</span>
                                    <span class="jrad-btn-normal">取消</span>
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
$(document).ready(function(){
    var wraper = $('#Wraper_rad_PackageItem');
    var page_column_model = new Array();
    var page_search_items = new Array();
    var page_list_buttons = new Array();
    $(".details-tab .return",wraper).click(function(){ 
        $('.details-box',wraper).slideUp();
        $('.jrad-table',wraper).slideDown(); 
    });
    $('#filterInput').input();
    $('input','#filterInput').bind('input propertychange',function(){
        var value = $(this).val();;
        if(!value){
            $('tr','#channel-simpletable').show();
            return ;
        }
        $('tr','#channel-simpletable').show();
        $('label:not(:contains("'+ value +'"))','.channelName').parents('tr').hide()
    })
    $('#channel-simpletable').delegate('.channelName', 'click', function(event){
        var self = $(this);
        var $input = self.find('input');
        var value = $input.val();
        var $tr = self.parents('tr');
        var $channelCode = $('.channelCodeId',$tr);
        if(self.hasClass('selected')){
            self.removeClass('selected');
            $input.prop('checked', false);
            $channelCode.removeClass('selected');
            $channelCode.find('input').prop('checked', false);
        }else{
            self.addClass('selected');
            $input.prop('checked', true);
            $channelCode.addClass('selected');
            $channelCode.find('input').prop('checked', true);
        }
        $.jRadCancelPop(event);
    });
    $('#channel-simpletable').delegate('.channelCodeId', 'click', function(event){
        var self = $(this);
        var trParent = self.parents('tr');
        var tdParent = self.parents('td');
        var $channelName = $('.channelName',trParent);
        if(!$channelName.hasClass('selected')){
            $channelName.addClass('selected');
            $channelName.find('input').prop('checked', true);
        }
        var $input = self.find('input');
        var value = $input.val();
        if(self.hasClass('selected')){
            self.removeClass('selected');
            $input.prop('checked', false);
            if($('.channelCodeId.selected',tdParent).length == 0){
                $channelName.removeClass('selected');
                $channelName.find('input').prop('checked', false);
            }
        }else{
            self.addClass('selected');
            $input.prop('checked', true);
        }
        $.jRadCancelPop(event);
    });
    var simpletableOptions = {
        dataType: 'json',
        method:'get',
        rp:1000,
        pagination: {diaplay_pages: 0,align:'right'},
        colModel : [
            {display: '渠道简称', name : 'chanel', align: 'left',width:200,diy:function(row, $div){

                $div.html('<div class="ui-checkbox channelName"><input type="checkbox" value="'+ row.channelId+'"><label>'+row.channelMarkName+'</label></div>');
            }},
            {display: '渠道码', name : 'channelCode',  align: 'left',diy:function(row, $div){

                var channelCodes = row.channelCodes;
                var htmlArray = [];
                $.each(channelCodes, function(index, value){
                    htmlArray.push('<div class="ui-checkbox channelCodeId"><input type="checkbox" value="'+ value.channelCodeId+'"><label>'+value.channelCodeName+'</label></div>');
                });
                $div.html(htmlArray.join(''));
                $div.css('white-space','normal');
            }}
        ],
        url:'/sps-ws/ws/0.1/channel/getChannelAndCodes'
    }
    //初始化信息
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
    //应用名称校验器
    jRad.validators['appName'] = [{"msg":"应用名称为必选","type":"regex","value":"^[1-9]\\d*$"}];
    jRad.validators['appVersion'] = [{"msg":"请选择","type":"min","value":1}];
    jRad.validators['channel'] = [{"msg":"请选择","type":"min","value":1}];
    jRad.validators['channelCodes'] = [{"msg":"请选择","type":"min","value":1}];
    //应用名称和应用版本联动下拉框------------
    jRad.params['appName'] = {
        urlData:{
            url:'/sps-ws/ws/0.1/app/getAllAppName'
        },
        unshiftData:{id:0,name:'请选择'},
        onchange:function(appNameId){
            var results = $.jRadGet({url: '/sps-ws/ws/0.1/app/getAppVersionByAppId?id=' + appNameId});
            results = $.jRadUnshift(results,{id: '',name:'请选择'});
            $('#Form_create_PackageItem div[name=appVersion]').select({
                data: results
            });
        }
    };
    //应用版本初始值
    jRad.params['appVersion'] = {
        data: [{id: '',name:'请选择'}]
    };
    //渠道和渠道码联动下拉框---------------------------
    var chnanelItems = $.jRadGet({url: '/sps-ws/ws/0.1/channel/getAbleChannelName'});
    chnanelItems = $.jRadUnshift(chnanelItems,{id: 0,name:'全部',code:''});
    chnanelItems = $.jRadUnshift(chnanelItems,{id: '',name:'请选择',code:''});
    jRad.params['channel'] = {
        data: chnanelItems,
        fl: 'name,code',
        onchange:function(channel){
            var results = $.jRadGet({url: '/sps-ws/ws/0.1/channel/getAllChannelCodeNameById?id=' + channel});
            results = $.jRadUnshift(results,{id: 0,name:'全部',code:''});
            results = $.jRadUnshift(results,{id: '',name:'请选择',code: ''});
            $('#Form_create_PackageItem div[name=channelCodes]').select({
            	data: results
            });
        }
    };
    //渠道码初始值---------
    jRad.params['channelCodes'] = {
		data: [{id: '',name:'请选择'}]
    };
    //以上为弹出框form的初始化信息，创建打包时使用，以下为搜索框赋值和初始化
    jRad.params['appId'] = {data:$ .jRadUnshift(jRad.datasources['appId'],{id:'',name:'请选择'}),onchange:function(){
        var appNameId = $('div[name=appId]').select('val');
        if(appNameId == ''){
            $('div[name=appVersionId]').select({
                urlData:{
                    url:''
                },
                data: [{id:'',name:'请选择'}]
            });
            return;
        }
        $('div[name=appVersionId]').select({
            urlData:{
                url:'/sps-ws/ws/0.1/app/getAppVersionByAppId?id=' + appNameId
            },
            unshiftData:{id:'',name:'请选择'}
        });
    }
    };
    jRad.params['appVersionId'] = {data:[{id:'',name:'请选择'}]};
    
    jRad.params['channelId'] = {data:$.jRadUnshift(jRad.datasources['channelId'],{id:'',name:'请选择'}),onchange:function(){
        var channelId = $('div[name=channelId]').select('val');
        if(channelId == ''){
            $('div[name=channelCodeId]').select({
                urlData:{
                    url:''
                },
                data: [{id:'',name:'请选择'}]
            });
            return;
        }
        $('div[name=channelCodeId]').select({
            urlData:{
                url:'/sps-ws/ws/0.1/channel/getAllChannelCodeNameById?id=' + channelId
            },
            unshiftData:{id:'',name:'请选择'}
        });
    }};
    jRad.params['channelCodeId'] = {data:[{id:'',name:'请选择'}]};
    page_column_model.push({display: '渠道简称', name : 'abbr', sortable : true});
    page_column_model.push({display: '渠道标识', name : 'mark',  sortable : true});
    page_column_model.push({display: '渠道码',  name : 'channelCode' });
    page_column_model.push({display: '应用名称', name : 'appName',  sortable : true});
    page_column_model.push({display: '应用版本', name : 'appVersion',  sortable : true});
    page_column_model.push({display: '下载地址', name : 'downloadAddr',  sortable : true});
    page_column_model.push({display: '更新时间', name : 'updateTime',  sortable : true});
    page_column_model.push({display: '打包状态', name : 'status',  sortable : true});
    page_search_items.push({row:'1',type:'jrad-select',display:'应用名称',name:'appId',params:jRad.params['appId']});
    page_search_items.push({row:'1',type:'jrad-select',display:'应用版本',name:'appVersionId',params:jRad.params['appVersionId']});
    page_search_items.push({row:'2',type:'jrad-select',display:'渠道简称',name:'channelId',params:jRad.params['channelId']});
    page_search_items.push({row:'2',type:'jrad-select',display:'渠道码',name:'channelCodeId',params:jRad.params['channelCodeId']});
    //渠道包下载
    page_list_buttons.push({title: '下载',name:'Edit',displayname:'下载', bclass: 'download',prefunc:function(){
        var checked = $('#Table_rad_PackageItem').getCheckedTrs();
        if (checked.length != 1) {return false;}else{return true;}
    },onpress : function(){
        var checked = $('#Table_rad_PackageItem').getCheckedTrs();
        if(checked[0]) {
            if(checked[0].downloadAddr != null){
                window.location.href='/sps-ws/ws/0.1/package/downloadPackage/'+checked[0].id;
            }else{
                $('#Table_rad_PackageItem').flexMessage('未生成文件路径，暂时无法下载！', 'error');
            }
        }
    }});
    //创建打包项
    page_list_buttons.push({title: '创建打包项',name:'Add',displayname:'创建打包项', bclass: 'stock-adjust',onpress : function(){
            $('#Form_create_PackageItem').form({
                validators: jRad.validators,
                layout:'grid',
                fields_params:jRad.params,
                cancel:function(){
                     $('.jrad-table').slideDown();
                    $('.details-box').slideUp();
                },
                before_submit:function(json){
                    var channel = [];
                    $('.channelName.selected').each(function(){
                        var data = {};
                        var self = $(this);
                        var $tr = self.parents('tr');
                        var channelId = $('input', self).val();
                        data['channelId'] = channelId;
                        data['channelCodes'] = [];
                        $('.channelCodeId.selected',$tr).each(function(){
                            var self = $(this);
                            data['channelCodes'].push($('input', self).val());
                        });
                        channel.push(data);

                    });
                    json["channel"] = channel;
                    return json;
                },
                url:'/sps-ws/ws/0.1/package/createPackageItem',
                success_callback:function(){
                    $('.jrad-table').slideDown();
                    $('.details-box').slideUp();
                    $('#Table_rad_PackageItem').flexMessage('创建成功', 'success');
                    $('#Table_rad_PackageItem').flexReload();
                }
            });
            $('#filterInput').input('val','');
            $('#channel-simpletable').simpletable(simpletableOptions).simpletable('resize');
            $('.jrad-table').slideUp();
            $('.details-box').slideDown();
        }
    });
    //查看历史打包
    page_list_buttons.push({title: '查看历史打包',name:'history',displayname:'查看历史打包',bclass: 'history',onpress : function(){
            $.jRadOpenTab({url:'/sps/channel/history_package.jsp',name:'查看历史打包项',reload:true});
        }
    });
    
    $('#Table_rad_PackageItem').flexigrid({
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
            url:'/sps-ws/ws/0.1/package/queryDownloadList',
            onError:function(xhr) {
                var status = xhr.status;
                if(status == 401){
                    $.jRadAlert('用户未登录点击确定返回登录页','error',function(){
                        index.logOut();
                    },-1);
                } else {
                	$('#Table_rad_PackageItem').flexMessage("获取数据发生异常",'error');
                }
            }
    });
});
</script>
