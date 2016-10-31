/**
 *
 */
$(document).ready(function() {
    $.ajaxSetup({
        cache : false
    });

    showAllUserRoles(0, 10);
    showAllRoles();
    showAllUsers();
    $("#cancelDelete").click(function() {
        $("#deleteConfirmationDialog").css("display", "none");
    });

    $("#refresh").click(function() {
        initPagination = true;
        showAllUserRoles(0, 10);
    });

    $("#add").click(addUserRole);
});

function showAllUsers() {
    var url = "/euc/ws/0.1/user/all?pagable=false";
    var success = showUsers;
    var error = errorCallback;
    getMethodRequest(url, success, error, true);
}

function showUsers(data) {
    var userList = "<option value='-1' selected='selected'>请选择用户</option>";
    for (var i = 0; i < data.length; i++) {
        var userId = data[i].id;
        var name = data[i].name;
        userList += getOptionHtml(userId, name);
    }

    $("#userList").html(userList);
}

function showAllRoles() {
    var url = "/euc/ws/0.1/role/all?pagable=false";
    var success = showRoles;
    var error = errorCallback;
    getMethodRequest(url, success, error, true);
}

function showRoles(data) {
    var roleList = "<option value='-1' selected='selected'>请选择权限组</option>";
    for (var i = 0; i < data.length; i++) {
        var id = data[i].id;
        var name = data[i].name;
        var roleItem = {
            id : id,
            name : name
        };

        roleList += getOptionHtml(id, name);
        globalRoles.push(roleItem);
    }

    $("#roleList").html(roleList);
}

function getOptionHtml(id, name) {
    return "<option value='" + id + "'>" + name + "</option>";
}


var initPagination = true;
var globalRoles = new Array();
var totalCount;
var totalPages;

function errorCallback(xhr) {
    var errorMessage = eval("("+xhr.responseText+")");
    showErrorDialog("error", errorMessage[0].message);
};

function showAllUserRoles(pageindex, pagesize) {
    var url = "/euc/ws/0.1/user/role/all?pageindex=" + pageindex + "&pagesize=" + pagesize;
    var success = function(data) {
        if (initPagination) {
            $("#paging_panel").pagination(data.totalPages * pagesize, {
                num_edge_entries : 1,
                num_display_entries : 4,
                callback : pageControlCallBack,
                items_per_page : pagesize,
                prev_text : "< 上一页",
                next_text : "下一页 >",
                current_page : pageindex
            });

            initPagination = false;
        }

        totalCount = data.totalCount;
        totalPages = data.totalPages;
        showUserRoleList(data);
    };

    var error = errorCallback;
    getMethodRequest(url, success, error, true);
}

function pageControlCallBack(page_index, container) {
    if (!initPagination) {
        showAllUserRoles(page_index, 10);
    }
}

function showUserRoleList(data) {
    var userRoleList = "<li class='title'><div class='w50'>序号</div><div class='w150'>用户名</div>"
                 + "<div class='w150'>权限组名称</div>"
                 + "<div class='w110'>修改</div><div class='w110'>删除</div></li>";
    for (var i = 0; i < data.items.length; i++) {
        var id = data.items[i].id;
        var userName = data.items[i].userName;
        var roleName = data.items[i].roleName;
        var userId = data.items[i].userId;
        var roleId = data.items[i].roleId;

        var editHtml = "";
        var deleteHtml = "";
        if (isPermitted('系统设置.用户设置.编辑')) {
            editHtml = "<a href='#' style='text-decoration:none;' onclick='editItem(this)'>修改</a>";
        }

        if (isPermitted('系统设置.用户设置.删除')) {
            deleteHtml = "<a href='#' style='text-decoration:none;' onclick='deleteItem(" + id + ")'>删除</a>";
        }

        userRoleList += "<li id='" + id + "'><div class='w50'>" + (i + 1) + "</div><div class='w150' id='" + userId + "'>" + userName + "</div>"
                +   "<div class='w150' id='" + roleId + "'>" + roleName + "</div>"
                +   "<div class='w110'>" + editHtml + "</div><div class='w110'>" + deleteHtml + "</div></li>";
    }

    $("#userRoleList").html(userRoleList);
}

function editItem(_this) {
    var liParent = $($(_this).parent()).parent();
    var $div = $(liParent).children();
    var roleName = $div[2].innerText;
    var roleHtml = getPositionSelectHtml(globalRoles, $($div[2]).attr("id"));
    $($div[2]).html(roleHtml);
    $($div[2]).attr("oldName", roleName);
    $(($(_this).parent())).html("<a href='#' class='la' onclick='saveItem(this)'>保存</a>&nbsp;&nbsp;<a href='#' class='la' onclick='cancel(this)'>取消</a>");
}

function getDepartmentSelectHtml(array, selectId, liId) {
    var list = "<select style='margin-top:-3px;width:80px' liid='" + liId + "' onchange='departmentChangeEvent(this)'>";
    $.each(array, function(index, element) {
        if (element.id == selectId) {
            list += "<option selected='selected' value=" + element.id + ">" + element.name + "</option>";
        } else {
            list += "<option value=" + element.id + ">" + element.name + "</option>";
        }
    });

    return list;
}

function getPositionSelectHtml(array, selectId) {
    var list = "<select style='margin-top:-3px;width:80px' onchange=''>";
    $.each(array, function(index, element) {
        if (element.id == selectId) {
            list += "<option selected='selected' value=" + element.id + ">" + element.name + "</option>";
        } else {
            list += "<option value=" + element.id + ">" + element.name + "</option>";
        }
    });

    return list;
}

function cancel(_this) {
    var liParent = $($(_this).parent()).parent();
    var $div = $(liParent).children();
    $($div[2]).text($($div[2]).attr("oldName"));
    $(($(_this).parent())).html("<a href='#' class='la' onclick='editItem(this)'>修改</a>");
}

function saveItem(_this) {
    var liParent = $($(_this).parent()).parent();
    var liId = $(liParent).attr("id");
    var $div = $(liParent).children();

    var roleName = $($div[2]).children("select").find("option:selected").text();
    var roleId = $($($div[2]).children("select")).val();

    var userRoleItem = {
        id : liId,
        roleId : roleId
    };

    var url = "/euc/ws/0.1/user/role/update";
    var success = function(data) {
        var parent = $(_this).parent();
        $(parent).html("<a href='#' class='la' onclick='editItem(this)'>修改</a>");
        $($div[2]).text(roleName);
        $($div[2]).attr("id", roleId);
    };

    var error = errorCallback;
    postMethodRequestWithData(url, userRoleItem, success, error, true);
}

function deleteItem(id) {
    $("#deleteConfirmationDialog div:eq(1)").attr("id", id);
    var content = "确定要删除吗?";
    $("#deleteConfirmationDialog div:eq(1)").text(content);
    $("#deleteConfirmationDialog").center();
    $("#deleteConfirmationDialog").css("display", "block");
}

function confirmDelete(_this) {
    var id = $("#deleteConfirmationDialog div:eq(1)").attr("id");
    $("#deleteConfirmationDialog").css("display", "none");
    deleteUserRoleById(id);
}

function deleteUserRoleById(id) {
    var url = "/euc/ws/0.1/user/role/delete?id=" + id;
    var success = function(data) {
        $("#userRoleList").children("#" + id).remove();
    };

    var error = errorCallback;
    postMethodRequestWithoutData(url, success, error, true);
}

function addUserRole() {
    var userId = $("#userList").val();
    var roleId = $("#roleList").val();

    if (userId == "-1") {
        showErrorDialog("info", "请选择用户");
        return;
    }

    if (roleId == "-1") {
        showErrorDialog("info", "请选择权限组");
        return;
    }

    var userRole = {
        userId : userId,
        roleId : roleId
    };

    var url = "/euc/ws/0.1/user/role/add";
    var success = function(data) {
        $("#userList").val("-1");
        $("#roleList").val("-1");
        initPagination = true;
        if (totalCount % 10 == 0) {
            showAllUserRoles(totalPages, 10);
        } else {
            showAllUserRoles(totalPages - 1, 10);
        }

        showErrorDialog("info", "添加成功");
    };
    var error = errorCallback;
    postMethodRequestWithData(url, userRole, success, error, true);
}