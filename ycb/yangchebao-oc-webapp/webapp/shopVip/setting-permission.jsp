<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"  import="java.util.*" import="java.io.*"%>  

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
<script type="text/javascript" src="./js/setting_vip_permission.js"></script>
<title>系统设置 - 权限设置</title> 
 <div class="urlContentWraper" id="permissions">  
			<div id="roles">
			</div>
			<bottom class="all-work-info numb154">页面说明</bottom>
			<div style="clear:both;"></div>
			<div id="permissions" style="width:640px;float:left;"></div> 
                
		    <div id="Form_explain_eg154" style="display:none;">
		        <div class="grid-layout-main jrad-form"> 
		            <div class="row">
		                <label class="span3 grid-layout-label">业务说明：</label>
		                <div class="span12 grid-layout-content">
		                    <div><strong>功能简介：</strong>商家权限组具体权限的管理，即为设置某个权限的商家可以看到哪些菜单。</div>
		                    <div><strong>重要功能说明：</strong>无。</div>
		                    <div><strong>注意事项：</strong>无。</div>
		                </div> 
		            </div> 
		            <div class="row">
		                <label class="span3 grid-layout-label">备注：</label>
		                <div class="span12 grid-layout-content">
		                    <div class="jrad-textarea-container" name="remark">
		                    </div>
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
		
	    $(".numb154").click(function(){
	        $('.overcurtainDiv').hide();
	        var menuId = $(".tabs-selected").attr("menuId")
	        var data = $.jRadGet({url:'/shopmanage-ws/ws/0.1/remark/getMenuRemark?menuId='+menuId})
	        $("#Form_explain_eg154").form({}).form('close');
	        $("#Form_explain_eg154").form({
	            title:'页面说明',
	            item:data,
	            autobinding: true, 
	            submit:function(){
	                var postData = {};
	                postData.operator = carsmart_config.operatorName;
	                postData.menuName = $(".tabs-selected").attr("menuName");
	                postData.menuId = $(".tabs-selected").attr("menuId");
	                postData.remark = $("#Form_explain_eg154 div[name='remark']").textarea("val")
	                $.jRadPost({
	                    url:'/shopmanage-ws/ws/0.1/remark/updateMenuRemark',
	                    data:postData,
	                    success:function(){
	                        $("#Form_explain_eg154").form('close')
	                        $('.overcurtainDiv').hide();
	                    }
	                });
	            }, 
	            cancel:function(){
	                $("#Form_explain_eg154").form('close')
	                $('.overcurtainDiv').hide();
	            }
	        }).form('open')
	        $("#Form_explain_eg154 .textarea-content").removeClass("span4").addClass("span12")
	        $('.overcurtainDiv').hide();
	        $('.overcurtainDiv').eq(0).show().attr("style","z-index:303;display:block");
	    })
    })
    </script>
                  
 