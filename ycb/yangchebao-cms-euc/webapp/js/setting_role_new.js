/**
 *
 */
$(document).ready(function() {
    $.ajaxSetup({
        cache : false
    });

    showAllRoles(0, 10);
    $("#refresh").click(function() {
        initPagination = true;
        showAllRoles(0, 10);
    });

    $("#add").click(function() {
        addRoleItem();
    });

    $("#cancelDelete").click(function() {
        $("#deleteConfirmationDialog").css("display", "none");
    });

    $("#closeErrorDialog").click(function() {
        $("#errorDialog").css("display", "none");
    });
});

var initPagination = true;
var totalCount;
var totalPages;

function showAllRoles(pageindex, pagesize) {
    var url = "/euc/ws/0.1/role/all?pageindex=" + pageindex + "&pagesize=" + pagesize;
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
        showRoleList(data);
    };

    var error = errorCallback;
    getMethodRequest(url, success, error, true);
}

function errorCallback(xhr) {
    var errorMessage = eval("("+xhr.responseText+")");
    showErrorDialog("error", errorMessage[0].message);
}

function pageControlCallBack(page_index, container) {
    if (!initPagination) {
        showAllRoles(page_index, 10);
    }
}

function showRoleList(data) {
    var roleList = "<li class='title'><div class='w70'>序号</div><div class='w400'>权限组名称</div><div class='w80'>修改</div><div class='w80'>删除</div></li>";
    var editHtml = "";
    var deleteHtml = "";
    if (isPermitted('系统设置.权限组设置.编辑')) {
        editHtml = "<a href='#' style='text-decoration:none'  onclick='editItem(this)'>修改</a>";
    }

    if (isPermitted('系统设置.权限组设置.删除')) {
        deleteHtml = "<a href='#' style='text-decoration:none' onclick='deleteItem(this)'>删除</a>";
    }

    if (data.items.length > 0) {
        for (var i = 0; i < data.items.length; i++) {
            var roleName = data.items[i].name;
            var id = data.items[i].id;
            roleList += "<li id='" + id + "'><div class='w70'>" + (i + 1) + "</div><div class='w400'>" + roleName + "</div><div class='w80'>" + editHtml + "</div><div class='w80'>" + deleteHtml + "</div></li>";
        }
    }

    $("#roleList").html(roleList);
}

function editItem(_this) {
    var parent = $($(_this).parent()).parent();
    var $div = $(parent).children();
    var roleName = $div[1].innerText;
    $($div[1]).html("<input type='text' style='margin-top:-3px;' oldName='" + roleName + "' size='12' value='" + roleName + "' />");
    $($div[2]).html("<a href='#' style='text-decoration:none;' onclick='saveItem(this)'>保存</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' style='text-decoration:none;' onclick='cancel(this)'>取消</a>");
}

function cancel(_this) {
    var parent = $($(_this).parent()).parent();
    var $div = $(parent).children();
    $($div[1]).text($($div[1]).children("input").attr("oldName"));
    parent = $(_this).parent();
    $(parent).html("<a href='#' style='text-decoration:none'  onclick='editItem(this)'>修改</a>");
}

function saveItem(_this) {
    var parent = $($(_this).parent()).parent();
    var id = $(parent).attr('id');
    var $div = $(parent).children();
    var newName = $($($div[1]).children("input")).val();
    var updateItem = {
        id : id,
        name : newName
    };

    var url = "/euc/ws/0.1/role/update";
    var success = function(data) {
        parent = $(_this).parent();
        $(parent).html("<a href='#' style='text-decoration:none'  onclick='editItem(this)'>修改</a>");
        $($div[1]).text(newName);
    };

    var error = errorCallback;
    postMethodRequestWithData(url, updateItem, success, error, true);
}

function deleteItem(_this) {
    var parent = $($(_this).parent()).parent();
    var id = $(parent).attr('id');
    var roleName = $(parent).children()[1].innerText;
    showDeleteConfirmationDialog(id, roleName);
}

function showDeleteConfirmationDialog(roleId, roleName) {
    $("#deleteConfirmationDialog div:eq(1)").attr("id", roleId);
    var content = "确定要删除权限组 " + roleName + " 吗?";
    $("#deleteConfirmationDialog div:eq(1)").text(content);
    $("#deleteConfirmationDialog").center();
    $("#deleteConfirmationDialog").css("display", "block");
}

function confirmDelete(_this) {
    var id = $("#deleteConfirmationDialog div:eq(1)").attr("id");
    var url = "/euc/ws/0.1/role/delete?id=" + id;
    $("#deleteConfirmationDialog").css("display", "none");
    var success = function(data) {
        $($("#roleList").children("#" + id)).remove();
    };

    var error = errorCallback;
    postMethodRequestWithoutData(url, success, error, true);
}

function addRoleItem() {
    var roleName = $.trim($("#roleName").val());
    if (roleName != "") {
        var item = {
                name : roleName
            };
        var url = "/euc/ws/0.1/role/add";
        var success = function(data) {
            $("#roleName").val("");
            initPagination = true;
            if (totalCount % 10 == 0) {
                showAllRoles(totalPages, 10);
            } else {
                showAllRoles(totalPages - 1, 10);
            }

            showErrorDialog("info", "添加成功");
        };
        var error = errorCallback;
        postMethodRequestWithData(url, item, success, error, true);
    } else {
        showErrorDialog("info", "权限组名称不能为空");
    }
}