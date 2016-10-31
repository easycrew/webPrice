<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div class="urlContentWraper" id="Wraper_create_PackageItem">
	<div class="ui-form">
		<div class="row">
			<label class="span4 grid-layout-label">选择应用名称：</label>
			<div class="span4 grid-layout-content">
				<div data-name="appName"></div>
			</div>
			<label class="span4 grid-layout-label">选择应用版本：</label>
			<div class="span4 grid-layout-content">
				<div data-name="appVersion"></div>
			</div>
		</div>
	   
		<div class="row">
			 <div class="row">
			<label class="span4 grid-layout-label">选择渠道：</label>
			<div class="span4 grid-layout-content">
				<div data-name="channel"></div>
			</div>
			<label class="span4 grid-layout-label">选择渠道码：</label>
			<div class="span4 grid-layout-content">
				<div data-name="channelCode"></div>
			</div>
		</div>
		</div>			
	</div>	
		
	<div class="offset5 jrad-buttons-container ui-buttons-container">
		<span class="jrad-btn-primary">创建</span>
	</div>
</div>
<script type="text/javascript">
$(document).ready(function(){
	var wraper = $('#Wraper_create_PackageItem');
	
	$('div[data-name=appName]',wraper).radio({
		vertical: true,
		urlData:{
			url:'/sps-ws/ws/0.1/app/getAllAppName'
		},
		onclick: function(){
			var id = $('div[data-name=appName]',wraper).radio('val');
			$('div[data-name=appVersion]',wraper).radio({
				urlData: {
					url:'/sps-ws/ws/0.1/app/getAppVersionByAppId?id=' + id
				}
			});
		}
	});
	
	$('div[data-name=channel]',wraper).radio({
		vertical: true,
		urlData:{
			url:'/sps-ws/ws/0.1/channel/getAllChannelName'
		},
		onclick: function(value){
			var id = $('div[data-name=channel]',wraper).radio('val');
			$('div[data-name=channelCode]',wraper).radio({
				urlData: {
					url:'/sps-ws/ws/0.1/channel/getAllChannelCodeNameById?id=' + id
				}
			});
		}
	});
	
	$('.jrad-btn-primary',wraper).button({
		click: function(){
			var appId = $('div[data-name=appName]',wraper).radio('val');
			var appVersionId = $('div[data-name=appVersion]',wraper).radio('val');
			var channelId = $('div[data-name=appName]',wraper).radio('val');
			var channelCodeId = $('div[data-name=channelCode]',wraper).radio('val');
			
			
			$.jRadPost({
				url:'/sps-ws/ws/0.1/package/createPackageItem',
				data: {"appId":appId,"appVersion":appVersionId,"channelId":channelId,"channelCode":channelCodeId},
				success: function(data){
					alert(data);
				}
			})
		}
	});
	
});
</script>
