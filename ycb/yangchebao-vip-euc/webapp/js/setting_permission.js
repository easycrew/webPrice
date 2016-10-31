/**
 *
 */
$(document).ready(function() {
    $.ajaxSetup({
        cache : false
    });
    showAllPermissionsTree();
    
//    showAllPermissions();
    showAllRoles();
});


var currentRoleId = 0;
var data;
function errorCallback(xhr) {
    var errorMessage = eval("("+xhr.responseText+")");
    showErrorDialog("error", errorMessage[0].message);
    currentRoleId = 0;
};

function showAllRoles() {
    var url = "/euc/ws/0.1/role/all?pagable=false";
    var success = showRoles;
    var error = errorCallback;
    getMethodRequest(url, success, error, true);
}

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
        var url = "/euc/ws/0.1/permission/query?roleId=" + roleId;
        var success = showPermissionIds;
        var error = errorCallback;
        getMethodRequest(url, success, error, true);
    }
}

function showPermissionIds(data) {
    if (!permissionReady) {
        sleep(50);
    }

    for (var i = 0; i < data.length; i++) {
        //$("#permissions_" + data[i]).attr("checked", true);
        $("#permissions_" + data[i]).click();
        $("#permissions_" + data[i]).attr("checked", true);
        
    }
}

function showAllPermissions() {
    var url = "/euc/ws/0.1/permission/all";
    var success = showPermissions;
    var error = errorCallback;
    getMethodRequest(url, success, error, true);
}

function showAllPermissionsTree() {
    var url = "/euc/ws/0.1/permission/all";
    var success = showPermissionsTree;
    var error = errorCallback;
    getMethodRequest(url, success, error, true);
}

var permissionReady = false;
var categoryNumber = 0;

function showPermissions(data) {
    data = getPermissionView(data);
    for (var i = 0; i < data.length; i++) {
        var tableHtml = "";
        var bussinessName = data[i].bussinessName;
        var operations = getBusinessOperations(data[i]);
        operations = sortOperations(operations);
        tableHtml += "<div class='list' style='margin-bottom:20px;'><div class='tag_title'><h2><a name='category_" + categoryNumber + "'>" + bussinessName + "</a></h2></div>";
        tableHtml += "<table><tr><th><input type='checkbox' onclick='checkAll(this)'></th>";
        $("#category").append("<li><a href='#category_" + categoryNumber +  "'>" + bussinessName + "</a></li>");
        categoryNumber++;
        for (var m = 0; m < operations.length; m++) {
            tableHtml += "<th>" + operations[m] + "</th>";
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
        $("#permissions").append("<div class='simple-button' onclick='saveChange()'>保存修改</div>");
    }

    permissionReady = true;
}
/**/
function showPermissionsTree(data) {
	data = getPermissionView(data);
	
	d = new dTree('d');
	d.add(0,-1,'权限管理');

	var first = data.length;
	for (var i = 0; i < data.length; i++) {
		var bussinessName = data[i].bussinessName;
		d.add(i+1, 0, '', '', data[i].bussinessName);
		var second = data[i].moduleList.length;
		for (var j = 0; j < second; j++) {
			
			d.add((first+j+1)*(i*5+1), i+1, '', '', data[i].moduleList[j].moduleName);
			var three = data[i].moduleList[j].operationList.length;
			for(var k = 0; k < three; k++) {
				d.add(data[i].moduleList[j].operationList[k].operationId, (first+j+1)*(i*5+1), 'permissions', 
						data[i].moduleList[j].operationList[k].operationId, data[i].moduleList[j].operationList[k].operationName);
			}
		}
	}
	
	$("#permissions").append(d.toString());
	d.closeAll();
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
    var table = $($($(_this).parent()).parent()).parent();
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
    html += "<td>" + moduleName + "</td>";
    for (var i = 0; i < operationArray.length; i++) {
        var operationId = getOperationId(moduleItem.operationList, operationArray[i]);
        if (operationId == 0) {
            html += "<td></td>";
        } else {
            html += "<td><input id='operation_" + operationId + "' name='permissions' value='" + operationId + "' type='checkbox'></td>";
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
        showErrorDialog("info", "请选择权限组");
        return;
    }

    var url = "/euc/ws/0.1/permission/update";
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

    var success = function(data) {
        showErrorDialog("info", "权限设置成功");
    };

    var error = errorCallback;
    postMethodRequestWithData(url, rolePermission, success, error);
}