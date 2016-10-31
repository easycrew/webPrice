/**
 *
 */
$(document).ready(function() {
    $.ajaxSetup({
        cache : false
    });

    showAllDepartment(0, 10);
    showParentDepartment(false);
    $("#cancelDelete").click(function() {
        $("#deleteConfirmationDialog").css("display", "none");
    });

    $("#refresh").click(function() {
        initPagination = true;
        showAllDepartment(0, 10);
    });

    $("#add").click(function() {
        addDepartmentItem();
    });

    showDepartmentTree();
});

var initPagination = true;
var totalCount;
var totalPages;

function errorCallback(xhr) {
    var errorMessage = eval("("+xhr.responseText+")");
    showErrorDialog("error", errorMessage[0].message);
}

function showDepartmentTree() {
    var setting = {
        view: {
            showIcon: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onClick: onClick
        }
    };

    var url = "/euc/ws/0.1/department/tree";
    var success = function(data) {
        $.fn.zTree.init($("#departmentTree"), setting, data);
    };

    var error = errorCallback;
    getMethodRequest(url, success, error, false);

}

function onClick(event, treeId, treeNode, clickFlag) {
    initPagination = true;
    var departmentId = treeNode.id;
    showDepartmentById(0, 10, departmentId);
}

function showDepartmentById(pageindex, pagesize, departmentId) {
    var url = "/euc/ws/0.1/department/query?id=" + departmentId + "&pageindex=" + pageindex + "&pagesize=" + pagesize;
    var success = function(data) {
        if (initPagination) {
            $("#paging_panel").pagination(data.totalPages * pagesize, {
                num_edge_entries : 1,
                num_display_entries : 4,
                items_per_page : pagesize,
                prev_text : "< 上一页",
                next_text : "下一页 >",
                current_page : pageindex
            });

            initPagination = false;
        }

        showDepartmentList(data);
    };

    var error = errorCallback;
    getMethodRequest(url, success, error, false);
}

function showAllDepartment(pageindex, pagesize) {
    var url = "/euc/ws/0.1/department/all?pageindex=" + pageindex + "&pagesize=" + pagesize;
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
        showDepartmentList(data);
    };

    var error = errorCallback;
    getMethodRequest(url, success, error, false);
}

function pageControlCallBack(page_index, container) {
    if (!initPagination) {
        showAllDepartment(page_index, 10);
    }
}

var globalDepartmentList = new Array();

function showParentDepartment(async) {
    var url = "/euc/ws/0.1/department/all?pagable=false";
    var success = function(data) {
        var pDepartmentList = "<option value='-1' selected='selected'>请选择上级部门</option>";
        globalDepartmentList = new Array();
        for (var i = 0; i < data.length; i++) {
            var departmentName = data[i].name;
            var id = data[i].id;
            pDepartmentList += "<option value='" + id + "'>" + departmentName + "</option>";
            var item = {
                id : id,
                name : departmentName
            };

            globalDepartmentList.push(item);
        }

        $("#pDepartmentList").html(pDepartmentList);
    };

    var error = errorCallback;
    getMethodRequest(url, success, error, async);
}

function showDepartmentList(data) {
    var departmentList = "<li class='title'><div class='w70'>序号</div><div class='w200'>部门名称</div><div class='w200'>所属上级</div><div class='w80'>修改</div><div class='w80'>删除</div></li>";
    var updateHtml = "";
    var deleteHtml = "";
    if (isPermitted('系统设置.部门设置.编辑')) {
        updateHtml = "<a href='#' style='text-decoration:none;' onclick='editItem(this)'>修改</a>";
    }

    if (isPermitted('系统设置.部门设置.删除')) {
        deleteHtml = "<a href='#' style='text-decoration:none;' onclick='deleteItem(this)'>删除</a>";
    }

    if (data.items.length > 0) {
        for (var i = 0; i < data.items.length; i++) {
            var pDepartmentName = data.items[i].parentDepartmentName;
            var departmentName = data.items[i].name;
            var id = data.items[i].id;
            var pDepartmentId = data.items[i].parentDepartmentId;
            departmentList += "<li id='" + id + "'>" + "<div class='w70'>" + (i + 1) + "</div><div class='w200'>" + departmentName + "</div><div class='w200' id='" + pDepartmentId + "'>" + pDepartmentName + "</div>"
                    + "<div class='w80'>" + updateHtml + "</div><div class='w80'>" + deleteHtml + "</div></li>";

        }
    }

    $("#departmentList").html(departmentList);
}

function editItem(_this) {
    var parent = $($(_this).parent()).parent();
    var $div = $(parent).children();
    var departmentName = $div[1].innerText;
    var pDepartmentName = $div[2].innerText;
    var pDepartmentId = $($div[2]).attr("id");
    var tempDepartmentList = getDepartmentSelectHtml(globalDepartmentList, pDepartmentId);
    $($div[2]).html(tempDepartmentList);
    $($div[2]).attr("oldName", pDepartmentName);
    $($div[1]).html("<input type='text' style='margin-top:-3px;' oldName='" + departmentName + "' size='12' value='" + departmentName + "' />");
    $($div[3]).html("<a href='#' style='text-decoration:none;' onclick='saveItem(this)'>保存</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' style='text-decoration:none;' onclick='cancel(this)'>取消</a>");
}

function getDepartmentSelectHtml(departmentList, pDepartmentId) {
    var list = "<select style='margin-top:-3px;width:120px'>";
    if (pDepartmentId == "-1") {
        list += "<option selected='selected' value='-1'>请选择上级部门</option>";
    }

    $.each(departmentList, function(index, element) {
        if (element.id == pDepartmentId) {
            list += "<option selected='selected' value=" + element.id + ">" + element.name + "</option>";
        } else {
            list += "<option value=" + element.id + ">" + element.name + "</option>";
        }
    });

    return list;
}

function cancel(_this) {
    var parent = $($(_this).parent()).parent();
    var $div = $(parent).children();
    $($div[1]).text($($div[1]).children("input").attr("oldName"));
    $($div[2]).text($($div[2]).attr("oldName"));
    parent = $(_this).parent();
    $(parent).html("<a href='#' style='text-decoration:none'  onclick='editItem(this)'>修改</a>");
}

function saveItem(_this) {
    var parent = $($(_this).parent()).parent();
    var id = $(parent).attr('id');
    var $div = $(parent).children();
    var newName = $($($div[1]).children("input")).val();
    var newpDepartmentName = $($div[2]).children("select").find("option:selected").text();
    var newpDepartmentId = $($($div[2]).children("select")).val();
    if (newpDepartmentId == '-1') {
        newpDepartmentName = "";
    }

    var updateItem = {
        id : id,
        name : newName,
        parentDepartmentId : newpDepartmentId
    };

    var url = "/euc/ws/0.1/department/update";
    var success = function(data) {
        parent = $(_this).parent();
        $(parent).html("<a href='#' style='text-decoration:none'  onclick='editItem(this)'>修改</a>");
        $($div[1]).text(newName);
        $($div[2]).attr("id", newpDepartmentId);
        $($div[2]).text(newpDepartmentName);
        showParentDepartment(true);
        showDepartmentTree();
    };

    var error = errorCallback;
    postMethodRequestWithData(url, updateItem, success, error, false);
}

function deleteItem(_this) {
    var parent = $($(_this).parent()).parent();
    var id = $(parent).attr('id');
    var departmentName = $(parent).children()[1].innerText;
    showDeleteConfirmationDialog(id, departmentName);
}

function showDeleteConfirmationDialog(departmentId, departmentName) {
    $("#deleteConfirmationDialog div:eq(1)").attr("id", departmentId);
    var content = "确定要删除部门 " + departmentName + " 吗?";
    $("#deleteConfirmationDialog div:eq(1)").text(content);
    $("#deleteConfirmationDialog").center();
    $("#deleteConfirmationDialog").css("display", "block");
}

function confirmDelete(_this) {
    var id = $("#deleteConfirmationDialog div:eq(1)").attr("id");
    var url = "/euc/ws/0.1/department/delete?id=" + id;
    $("#deleteConfirmationDialog").css("display", "none");
    var success = function(data) {
        $($("#departmentList").children("#" + id)).remove();
        showParentDepartment(true);
        showDepartmentTree();
    };

    var error = errorCallback;
    postMethodRequestWithoutData(url, success, error, false);
}

function addDepartmentItem() {
    var departmentName = $.trim($("#departmentName").val());
    if (departmentName != "") {
        var item = {
            name : departmentName,
            parentDepartmentId : $("#pDepartmentList").val()
        };

        var url = "/euc/ws/0.1/department/add";
        var success = function(data) {
            $("#departmentName").val("");
            initPagination = true;
            if (totalCount % 10 == 0) {
                showAllDepartment(totalPages, 10);
            } else {
                showAllDepartment(totalPages - 1, 10);
            }

            showParentDepartment(true);
            showDepartmentTree();
            showErrorDialog("info", "添加成功");
        };

        var error = errorCallback;
        postMethodRequestWithData(url, item, success, error, false);
    } else {
        showErrorDialog("info", "部门名称不能为空");
    }
}