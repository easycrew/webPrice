
var importObdSuccess = function(responseText, statusText, xhr, $form) {
	try {
		var msg = JSON.parse(responseText);
		if(msg[0] && msg[0].code){
		    $.jRadAlert(msg[0].message, 'error',null,1500);
		    return false;
		}
		var page = msg;
		
		/*
		$('#Table_rad_ImportResult').flexAddData(page);
		$('#Div_rad_Import').css('right','0px');
		$('#formBackground').css('display','block');
		$('#Div_rad_Import').css('left','0px');
		
		*/
		
		var arrayMsg = msg.errorMsg;
		var success = msg.success;
		var total = msg.total;
		var showHtml = "<li class='title'><div class='w50'>所在行号</div><div class='w130'>终端编号</div><div class='w150'>错误信息</div></li>";

		for (var n = 0; n < arrayMsg.length; n++){
			showHtml += ("<li style='height:auto'><div class='w50'>"
					 + arrayMsg[n].rowNum
					 + "</div><div class='w130'>"
					 + arrayMsg[n].imei
					 + "</div><div class='w150' style='width:280px' >"
					 + arrayMsg[n].msg
					 + "</div></li>");
		}

		showHtml += "<li><div class='w280' style='float:right'>成功：" + success + " 个, 失败：" + (total - success) + " 个&nbsp;&nbsp;";
		if(msg.fileName!=null){
			showHtml += "<a href='/obd-ws/ws/0.1/terminal/down/errorXls"+msg.fileName+"'>导出错误信息</a>";
		}
		showHtml += "</div></li>";
		
		$("#showErrMsg").html(showHtml);
		$('div.fileUpload').form('close');
		$("#terminal_vehicle_data_upload").form('open');

	//	$('div#fileUpload').hide();
	//	$("#Div_rad_Import").show().MakeCenter();
	} catch (e) {
	}
}
	

var makeUploadFileWrapper = function(tempUrl, formAction,titleName) {
    var templateHtml = '<div class="fielUpload">';
    templateHtml += ' <ul class="ui-form-list">';
    templateHtml += ' <form method="post" enctype="multipart/form-data" method="post" class="fileUploadForm">';
    templateHtml += ' <input type="hidden" name="username" value="' + carsmart_config.alias + '">';
    templateHtml += ' <li>';
    templateHtml += ' <div class="ui-form-element">';
    if (tempUrl) {
        templateHtml += '<p> 1. 批量前请先 <a href=' + tempUrl
                + ' class="tempFile">下载模板</a> ,并按照模板格式要求进行数据录入。</p>';
        templateHtml += ' <p>2. 上传时会对Excel文件表格内容进行验证,表格内如有异常数据系统会输出异常数据报表.并在下方显示,您可以下载修改后重新上传。</p>';
    }
    templateHtml += ' <input type="text" class="ui-text-file span3 terminalLoad"><a class="ui-fileButton"><input type="file" name="file" class="ui-file" onchange=$.chagneInputfile(this)></a>   ';
    templateHtml += ' <p class="errorHint">&nbsp;</p>';
    templateHtml += '</div>';
    templateHtml += '</li>';
    	   templateHtml += '<li class="clear" style="margin-top:20px"> ';
    	   templateHtml += '<div class="ui-form-label" style="width:60px">';
    	   templateHtml += '<label class="fontWeight" style="padding-top:5px;display:inline-block">汽车品牌</label>';
    	   templateHtml += '<p>&nbsp;</p>';	
    	   templateHtml += '</div>';
    	   templateHtml += '<div class="ui-form-element">';	
    	   templateHtml += '<div id="terminal_vehicle_import_brandId"';
    	   templateHtml += 'class="jrad-select" name="terminal_vehicle_import_brandId"></div>';
    	   templateHtml += '</div>';
    	   templateHtml += '<input type="hidden" name="brandId"\></li>';
    	   templateHtml += '<li class="clear">';	
    	   templateHtml += '<div class="ui-form-label" style="width:60px">';	
    	   templateHtml += '<label class="fontWeight" style="padding-top:5px;display:inline-block">汽车车系</label>';
    	   templateHtml += '<p>&nbsp;</p>';
    	   templateHtml += '</div>';	
    	   templateHtml += '<div class="ui-form-element">';
    	   templateHtml += '<div id="terminal_vehicle_import_modelId"';
    	   templateHtml += 'class="jrad-select" name="terminal_vehicle_import_modelId"></div>';
    	   templateHtml += '</div>';
    	   templateHtml += '<input type="hidden" name="modelId"\></li>';
    	   templateHtml += '<li class="clear">';
    	   templateHtml += '<div class="ui-form-label" style="width:60px">';	
    	   templateHtml += '<label class="fontWeight" style="padding-top:5px;display:inline-block">汽车年款</label>';	
    	   templateHtml += '<p>&nbsp;</p>';	
    	   templateHtml += '</div>';
    	   templateHtml += '<div class="ui-form-element">';
    	   templateHtml += '<div id="terminal_vehicle_import_styleId"';
    	   templateHtml += 'class="jrad-select" name="terminal_vehicle_import_styleId"></div>';	
    	   templateHtml += '<input type="hidden" name="styleId"\></div>';
    	   templateHtml += '</li>';	
    templateHtml += ' </form>';
    templateHtml += ' </ul>';
    templateHtml += '<div class="jrad-buttons-container ui-buttons-container">';
    templateHtml += ' <span class="jrad-btn-primary">确定</span>';
    templateHtml += '<span class="jrad-btn-normal">取消</span>';
    templateHtml += '</div>';
    templateHtml += '</div>';
    $('body').append(templateHtml);
	var fields_params = new Array();
				fields_params['terminal_vehicle_import_brandId']={
					urlData : {
						url : '/auto-ws/ws/0.1/rad/Brands'
					},unshiftData:{id:'',name:'请选择'},
					onchange:function(){ 
									// 获取select的值
									var val = $("#terminal_vehicle_import_brandId").select('val'); 
									$('input[name=brandId]').val(val) 
									$("#terminal_vehicle_import_modelId").select({data:[],selectedItem:{id:'',name:'请选择'},unshiftData:{id:'',name:'请选择'},urlData:{url:"/auto-ws/ws/0.1/auto/model?brandId="+val,id:'id',name:'name'},onchange:function(){
										var val = $("#terminal_vehicle_import_modelId").select('val'); 
										$('input[name=modelId]').val(val);
										$("#terminal_vehicle_import_styleId").select({data:[],selectedItem:{id:'',name:'请选择'},urlData:{url:"/auto-ws/ws/0.1/auto/style?modelId="+val,id:'id',name:'name'},unshiftData:{id:'',name:'请选择'},onchange:function(){
										    $('input[name=styleId]').val($("#terminal_vehicle_import_styleId").select('val'));
										}});
										
									}})
								 }
				};
	$('div.fielUpload').form({
		title:'绑定关系导入',
		fields_params:fields_params,
		style:{width:'500px',height:'500px'},
		submit: function() {
                            var imgPath = $(".terminalLoad").val();
                            if( imgPath==null || imgPath.length < 1){
                            	$.jRadAlert("请选择要导入的xls文件!","error",null,1500);
                                return false;
                            }
                            var extend = (imgPath.substr(imgPath.length - 5)).substr(
                                    (imgPath.substr(imgPath.length - 5)).indexOf('.') + 1).toLowerCase();
                            
                            if (extend != "xls") {
                            	$.jRadAlert("文件有误，只能导入后缀名为xls的文件!","error",null,1500);
                                return false;
                            }
                            
                            var styleId =$("#terminal_vehicle_import_styleId").select('val');
                            if(styleId == null || styleId.length<1 ){
                            	$.jRadAlert("请选择要导入的车型!","error",null,1500);
                                return false;
                            }

                           
                    $('.fileUploadForm').ajaxSubmit({
                        dataType : 'text/plain;charset=utf-8',
                        type : 'post',
                        url : formAction,
                        async : false,
                        success : function(responseText, statusText, xhr, $form) {
                        	importObdSuccess(responseText, statusText, xhr, $form);
                        },
                    	error:function(responseText,statusText,xhr,$form){
    						$.jRadAlert(responseText, 'error',null,1500);
                    	}
                    });
                    return false;
                }
	}).form('open');
};