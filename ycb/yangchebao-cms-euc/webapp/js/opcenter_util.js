/**
 *
 */
function getMethodRequest(url, successCallback, errorCallBack, flag) {
    $.ajax({
        url : url,
        contentType : "application/json;charset=utf-8",
        dataType : "json",
        type : "GET",
        async: flag,
        success : function(data) {
            successCallback(data);
        },
        error : function (xhr) {
            errorCallBack(xhr);
        }
    });
}

function postDataByForm(url,formId,successCallback,errorCallback,flag){
    $('#'+formId).ajaxSubmit({
        url:url,
        type:'POST',
        dataType:'json',
        timeout:300000,
        success:function(data){
            successCallback(data);
        },
        error:function(xhr){
            errorCallback(xhr);
        }
    });
}

function postMethodRequestWithData(url, postData, successCallback, errorCallBack, flag) {
    $.ajax({
        url : url,
        contentType : "application/json;charset=utf-8",
        dataType : "json",
        type : "POST",
        data : $.toJSON(postData),
        async: flag,
        success : function(data) {
            successCallback(data);
        },
        error : function(xhr) {
            errorCallBack(xhr);
        }
    });
}

function postMethodRequestWithoutData(url, successCallback, errorCallBack, flag) {
    $.ajax({
        url : url,
        contentType : "application/json;charset=utf-8",
        dataType : "json",
        type : "POST",
        async: flag,
        success : function(data) {
            successCallback(data);
        },
        error : function(xhr) {
            errorCallBack(xhr);
        }
    });
}


function deleteMethodRequestWithoutData(url, successCallback, errorCallBack,
        flag) {
    $.ajax({
        url : url,
        contentType : "application/json;charset=utf-8",
        dataType : "json",
        type : "DELETE",
        async : flag,
        success : function(data) {
            successCallback(data);
        },
        error : function(xhr) {
            errorCallBack(xhr);
        }
    });
}

function getPermissionView(permissions) {
    var permissionViewList = new Array();
    var bussinessNameArray = new Array();
    var moduleNameArray = new Array();
    for (var i = 0; i < permissions.length; i++) {
        var permissionName = permissions[i].name;//系统设置.部门设置.查询
        var array = new Array();
        array = permissionName.split(".");
        var bussinessName = array[0];//系统设置
        var moduleName = array[1];//部门设置
        var operationName = array[2];//查询
        if (exist(bussinessNameArray, bussinessName)) {
            for (var j = 0; j < permissionViewList.length; j++) {
                if (permissionViewList[j].bussinessName == bussinessName) {
                    var moduleOperationList = permissionViewList[j].moduleList;
                    if (exist(moduleNameArray, moduleName)) {
                        for (var k = 0; k < moduleOperationList.length; k++) {
                            if (moduleOperationList[k].moduleName == moduleName) {
                                var operation = {
                                        operationName : operationName,
                                        operationId : permissions[i].id
                                    };
                                moduleOperationList[k].operationList.push(operation);
                                break;
                            }
                        }
                    } else {
                        moduleNameArray.push(moduleName);
                        var moduleOperation = {};
                        moduleOperation.moduleName = moduleName;
                        var operationList = new Array();
                        var operation = {
                            operationName : operationName,
                            operationId : permissions[i].id
                        };

                        operationList.push(operation);
                        moduleOperation.operationList = operationList;
                        permissionViewList[j].moduleList.push(moduleOperation);
                    }

                    break;
                }
            }

        } else {
            moduleNameArray = new Array();
            bussinessNameArray.push(bussinessName);
            moduleNameArray.push(moduleName);
            var viewItem = {};
            viewItem.bussinessName = bussinessName;
            var moduleOperationList = new Array();
            var moduleOperation = {};
            moduleOperation.moduleName = moduleName;
            var operationList = new Array();
            var operation = {
                operationName : operationName,
                operationId : permissions[i].id
            };

            operationList.push(operation);
            moduleOperation.operationList = operationList;
            moduleOperationList.push(moduleOperation);
            viewItem.moduleList = moduleOperationList;
            permissionViewList.push(viewItem);
        }
    }

    return permissionViewList;
}

function exist(array, item) {
    for (var i = 0; i < array.length; i++) {
        if (item == array[i]) {
            return true;
        }
    }

    return false;
}