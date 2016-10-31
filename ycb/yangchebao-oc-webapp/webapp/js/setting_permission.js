/**
 *
 */
$(document).ready(function() {
    $.ajaxSetup({
        cache : false
    });
 
   $.jRadGet({
			 url : "/euc/ws/0.1/permission/all",
			 async:false,
			 success:showPermissions,
			 error:errorCallback
		}); 
	$.jRadGet({
			 url : "/euc/ws/0.1/role/all?pagable=false",
			 async:false,
			 success:showRoles,
			 error:errorCallback
		}); 
});

var currentRoleId = 0;

function errorCallback(xhr) {  
	var errorMessage = eval("("+xhr.responseText+")"); 
	$.jRadAlert(errorMessage[0].message, "error",function(){
		  window.location = 'login.jsp';
	});
	 currentRoleId = 0;
};
 
function showRoles(data) {
    var roleHtml = "";
    for (var i = 0; i < data.length; i++) {
        var id = data[i].id;
        var name = data[i].name;
        roleHtml += "<span class='font_button' name='roles' onclick='selectRole(this, " + id + ")'>" + name + "</span>";
        if (i != (data.length - 1)) {
            roleHtml += "|";
        }
    } 
    $("#roles").html(roleHtml);
}

function selectRole(_this, roleId) {
console.log("111");
    if ($(_this).attr("class") == "font_button") {
        currentRoleId = roleId;
        var checkboxList = $("[name='permissions']");
        if (checkboxList != null) {
            for (var i = 0; i < checkboxList.length; i++) {
                checkboxList[i].checked = false;
            }
        }

        var allRoles = $("[name='roles']");
        if (allRoles != null) {
            for (var i = 0; i < allRoles.length; i++) {
                $(allRoles[i]).attr("class", "font_button");
            }
        } 
        $(_this).attr("class", "font_button_selected");
       	$.jRadGet({
			 url : "/euc/ws/0.1/permission/query?roleId=" + roleId,
			 async:false,
			 success:showPermissionIds,
			 error:errorCallback
		}); 
		
    }
}

function showPermissionIds(data) { 
    
    for (var i = 0; i < data.length; i++) {
        $("#operation_" + data[i]).attr("checked", true);
    }
	
     console.log("333");
}
 
var permissionReady = false; 

function showPermissions(data) {
    data = formatData(data);
    for (var i = 0; i < data.length; i++) {
        var tableHtml = "";
        var bussinessName = data[i].bussinessName;
        var operations = getBusinessOperations(data[i]);
        operations = sortOperations(operations);
        tableHtml += "<div class='list' style='margin-bottom:20px;'><div class='tag_title'><h3>" + bussinessName + "</h3></div>";
        tableHtml += "<table class='ui-simpletable-table'><tr><th><div><input type='checkbox' onclick='checkAll(this)'></div></th>";  
        for (var m = 0; m < operations.length; m++) {
            tableHtml += "<th><div>" + operations[m] + "</div></th>";
        }

        tableHtml += "</tr>";
        for (var j = 0; j < data[i].moduleList.length; j++) {
            tableHtml += "<tr>";
            tableHtml += getModuleHtml(data[i].moduleList[j], operations);
            tableHtml += "</tr>";
        }

        tableHtml += "</table></div>";
        $("#permissions").append(tableHtml);
    }

    if (isPermitted('系统设置.权限设置.编辑')) {
       // $("#permissions").append("<div class='simple-button' onclick='saveChange()'>保存修改</div>");
	   $("#permissions").append("<span class='ui-btn-primary save'>保存修改</span>");
		$("#permissions .save").button({
			click : function() {
				saveChange();
			}
		});
    }

    permissionReady = true;
}

function sortOperations(operationArray) {
    var sortedArray = new Array();
    if (contain(operationArray, "查询")) {
        sortedArray.push("查询");
    }

    if (contain(operationArray, "添加")) {
        sortedArray.push("添加");
    }

    if (contain(operationArray, "编辑")) {
        sortedArray.push("编辑");
    }

    if (contain(operationArray, "删除")) {
        sortedArray.push("删除");
    }

    var tempArray = new Array();
    for (var i = 0; i < operationArray.length; i++) {
        if (!contain(sortedArray, operationArray[i])) {
            tempArray.push(operationArray[i]);
        }
    }

    for (var i = 0; i < tempArray.length; i++) {
        sortedArray.push(tempArray[i]);
    }

    return sortedArray;
}

function checkAll(_this) {
    var table = $(_this).parents("table");
    var checkboxList = $(table).find("[name='permissions']");
    if (checkboxList != null) {
        for (var i = 0; i < checkboxList.length; i++) {
            checkboxList[i].checked = _this.checked;
        }
    }
}

function getModuleHtml(moduleItem, operationArray) {
    var html = "";
    var moduleName = moduleItem.moduleName;
    html += "<td><div>" + moduleName + "</div></td>";
    for (var i = 0; i < operationArray.length; i++) {
        var operationId = getOperationId(moduleItem.operationList, operationArray[i]);
        if (operationId == 0) {
             html += "<td><div></div></td>";
        } else {
            html += "<td><div><input id='operation_" + operationId + "' name='permissions' value='" + operationId + "' type='checkbox'/></div></td>";
        }
    }

    return html;
}

function getOperationId(array, arrayItem) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].operationName == arrayItem) {
            return array[i].operationId;
        }
    }

    return 0;
}

function getBusinessOperations(businessArray) {
    var operations = new Array();
    for (var i = 0; i < businessArray.moduleList.length; i++) {
        for (var j = 0; j < businessArray.moduleList[i].operationList.length; j++) {
            var operationName = businessArray.moduleList[i].operationList[j].operationName;
            if (!contain(operations, operationName)) {
                operations.push(operationName);
            }
        }
    }

    return operations;
}

function contain(array, arrayItem) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == arrayItem) {
            return true;
        }
    }

    return false;
}

function saveChange() {
    if (currentRoleId == 0) {
       $.jRadAlert("请选择权限组", "error"); 
	   return;
    }  
    var selectPermissionIds = new Array();
    var checkboxList = $("[name='permissions']");
    if (checkboxList != null) {
        for (var i = 0; i < checkboxList.length; i++) {
            if (checkboxList[i].checked == true) {
                selectPermissionIds.push($(checkboxList[i]).val());
            }
        }
    }

    var rolePermission = {
        roleId : currentRoleId,
        permissions : selectPermissionIds
    }; 
    
	$.jRadPost({
				 url : "/euc/ws/0.1/permission/update",
				 async:false,
				 data:rolePermission,
				 success:function(data){
					$.jRadAlert("权限设置成功", "success"); 
				 },
				 error:errorCallback
			});  
	
}

function formatData(permissions){
	//var data = new Object();
	
	var catagories = new Array();
	//data.catagories = catagories;
	
	for(var i = 0; i < permissions.length; i++){
		var source = permissions[i].name;
		var arrs = source.split(".");
		var catagoryName = arrs[0];
		var itemName = arrs[1];
		var objName = arrs[2];
		
		var catagory = exists(catagories, catagoryName);
		
		if(catagory){
			var item = exists(catagory.moduleList, itemName);
			if(item){
				var obj = new Object();
				obj.operationName = objName;
				obj.operationId = permissions[i].id;
				item.operationList.push(obj);
			}else{
				var obj = new Object();
				obj.operationName = objName;
				obj.operationId = permissions[i].id;
				
				var objs = new Array();
				objs.push(obj);
				
				var item = new Object();
				item.moduleName = itemName;
				item.operationList = objs;
				
				catagory.moduleList.push(item);
			}
		}else{
			var obj = new Object();
			obj.operationName = objName;
			obj.operationId = permissions[i].id;
				
			var objs = new Array();
			objs.push(obj);
			
			var item = new Object();
			item.moduleName = itemName;
			item.operationList = objs;
			
			var items = new Array();
			items.push(item);
			
			var catagory = new Object();
			catagory.bussinessName = catagoryName;
			catagory.moduleList = items;
			
			catagories.push(catagory);
		}
	}
	
	return catagories;
}

function exists(array, item){
	for(var i = 0; i < array.length; i++){
		if(item == array[i].moduleName || item == array[i].bussinessName){
			//alert(item);
			//alert(array[i].moduleName);
			//alert(array[i].businessName);
			return array[i];
		}
	}
	return false;
}