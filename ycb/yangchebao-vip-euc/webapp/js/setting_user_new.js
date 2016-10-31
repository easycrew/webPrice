/**
 *
 */
$(document).ready(function() {
    $.ajaxSetup({
        cache : false
    });

    showAllUsers(0, 10);
    showAllDepartments();
    showAllPositions();
    $("#cancelDelete").click(function() {
        $("#deleteConfirmationDialog").css("display", "none");
    });

    $("#cancelReset").click(function() {
        $("#resetDialog").css("display", "none");
    });

    $("#refresh").click(function() {
        initPagination = true;
        showAllUsers(0, 10);
    });

    $("#add").click(addUser);
});

function showAllDepartments() {
    var url = "/euc/ws/0.1/department/all?pagable=false";
    var success = showDepartments;
    var error = errorCallback;
    getMethodRequest(url, success, error, true);
}

function showDepartments(data) {
    var departmentList = "<option value='-1' selected='selected'>请选择部门</option>";
    for (var i = 0; i < data.length; i++) {
        var departmentId = data[i].id;
        var name = data[i].name;
        var pDepartmentId = data[i].parentDepartmentId;
        var pDepartmentName = data[i].parentDepartmentName;
        var departmentItem = {
            id : departmentId,
            name : name,
            pId : pDepartmentId,
            pName : pDepartmentName
        };

        globalDepartment.push(departmentItem);
        departmentList += getOptionHtml(departmentId, name);
    }

    $("#departmentList").html(departmentList);
}

function getOptionHtml(id, name) {
    return "<option value='" + id + "'>" + name + "</option>";
}

function showAllPositions() {
    var url = "/euc/ws/0.1/position/all?pagable=false";
    var success = showPositions;
    var error = errorCallback;
    getMethodRequest(url, success, error, true);
}

function showPositions(data) {
    var positionList = "<option value='-1' selected='selected'>请选择职位</option>";
    for (var i = 0; i < data.length; i++) {
        var id = data[i].id;
        var name = data[i].name;
        var positionItem = {
            id : id,
            name : name
        };

        positionList += getOptionHtml(id, name);
        globalPosition.push(positionItem);
    }

    $("#positionList").html(positionList);
}

var initPagination = true;
var globalDepartment = new Array();
var globalPosition = new Array();
var totalCount;
var totalPages;

function errorCallback(xhr) {
    var errorMessage = eval("("+xhr.responseText+")");
    showErrorDialog("error", errorMessage[0].message);
};

function showAllUsers(pageindex, pagesize) {
    var url = "/euc/ws/0.1/user/all?pageindex=" + pageindex + "&pagesize=" + pagesize;
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
        showUserList(data);
    };

    var error = errorCallback;
    getMethodRequest(url, success, error, true);
}

function pageControlCallBack(page_index, container) {
    if (!initPagination) {
        showAllUsers(page_index, 10);
    }
}

function showUserList(data) {
    var userList = "<li class='title'><div class='w50'>选择</div><div class='w120'>用户名</div><div class='w90'>部门名称</div>"
                +  "<div class='w100'>上级部门</div><div class='w90'>职位</div><div class='w160'>邮箱</div><div class='w100'>电话</div>"
                +  "<div class='w80'>密码</div><div class='w90'>操作</div></li>";

    if (data.items.length > 0) {
        for (var i = 0; i < data.items.length; i++) {
            var id = data.items[i].id;
            var userName = data.items[i].name;
            var mobile = data.items[i].mobile;
            var email = data.items[i].email;
            if (mobile == null) {
                mobile = "";
            }

            var departmentId = data.items[i].departmentId;
            if (departmentId == null) {
                departmentId = "";
            }

            var departmentName = data.items[i].departmentName;
            if (departmentName == null) {
                departmentName = "";
            }

            var positionId = data.items[i].positionId;
            if (positionId == null) {
                positionId = "";
            }

            var positionName = data.items[i].positionName;
            if (positionName == null) {
                positionName = "";
            }

            var parentDepartmentId = data.items[i].parentDepartmentId;
            if (parentDepartmentId == null) {
                parentDepartmentId = "";
            }

            var parentDepartmentName = data.items[i].parentDepartmentName;
            if (parentDepartmentName == null) {
                parentDepartmentName = "";
            }

            var editHtml = "";
            var deleteHtml = "";
            var resetHtml = "";
            if (isPermitted('系统设置.员工设置.编辑')) {
                editHtml = "<a href='#' class='la' onclick='editItem(this)'>修改</a>";
            }

            if (isPermitted('系统设置.员工设置.删除')) {
                deleteHtml = "<a href='#' class='la' onclick='singleDelete(" + id + ", \"" + userName + "\")'>删除</a>";
            }

            if (isPermitted('系统设置.员工设置.密码重置')) {
                resetHtml = "<a href='#' class='la' onclick='resetPassword(" + id + ")'>重置</a>";
            }

            userList += "<li class='row2' id='li_" + id + "'><div class='w50'><input type='checkbox' id='checkbox_" + id + "' name='userCheckbox' value='" + id + "'/></div><div class='w120'>" + userName + "</div>"
                    +   "<div class='w90' id='" + departmentId + "'>" + departmentName + "</div><div class='w100' id='" + parentDepartmentId + "'>" + parentDepartmentName + "</div><div class='w90' id='" + positionId + "'>" + positionName + "</div>"
                    +   "<div class='w160'>" + email + "</div><div class='w100'>" + mobile + "</div><div class='w80'>" + resetHtml + "</div>"
                    +   "<div class='w90'><p style='text-align:center;'>" + deleteHtml + "</p><p style='text-align:center;margin-top:5px;'>" + editHtml + "</p></div></li>";
        }
    }

    $("#userList").html(userList);
}

function resetPassword(userId) {
    $("#resetDialog div:eq(1)").attr("id", userId);
    $("#resetDialog").center();
    $("#resetDialog").css("display", "block");
}

function reset(_this) {
    var id = $("#resetDialog div:eq(1)").attr("id");
    $("#resetDialog").css("display", "none");
    var url = "/euc/ws/0.1/user/password/reset?id=" + id;
    var success = function(data) {
        showErrorDialog("info", "密码重置成功");
    };

    var error = errorCallback;
    postMethodRequestWithoutData(url, success, error, true);
}

function checkAll(checkFlag){
    var checkboxList = $("[name='userCheckbox']");
    if (checkboxList != null) {
        for (var i = 0; i < checkboxList.length; i++) {
            checkboxList[i].checked = checkFlag;
        }
    }
}

function batchDelete() {
    var checkboxList = $("[name='userCheckbox']");
    if (checkboxList != null) {
        if(confirm("您确定要删除所有用户吗?")) {
            for (var i = 0; i < checkboxList.length; i++) {
                if (checkboxList[i].checked == true) {
                    deleteUserById(checkboxList[i].value);
                }
            }
        }
    }
}

function editItem(_this) {
    var liParent = $($($(_this).parent()).parent()).parent();
    var liId = $(liParent).attr("id");
    var $div = $(liParent).children();
    var userName = $div[1].innerText;
    var departmentName = $div[2].innerText;
    var pDepartmentName = $div[3].innerText;
    var positionName = $div[4].innerText;
    var email = $div[5].innerText;
    var mobile= $div[6].innerText;
    $($div[1]).html("<input type='text' style='margin-top:-3px;' oldName='" + userName + "' size='12' value='" + userName + "' />");
    $($div[5]).html("<input type='text' style='margin-top:-3px;' oldName='" + email + "' size='20' value='" + email + "' />");
    $($div[6]).html("<input type='text' style='margin-top:-3px;' oldName='" + mobile + "' size='10' value='" + mobile + "' />");
    $($div[3]).attr("oldName", pDepartmentName);
    var departmentHtml = getDepartmentSelectHtml(globalDepartment, $($div[2]).attr("id"), liId);
    var positionHtml = getPositionSelectHtml(globalPosition, $($div[4]).attr("id"));
    $($div[2]).html(departmentHtml);
    $($div[2]).attr("oldName", departmentName);
    $($div[4]).html(positionHtml);
    $($div[4]).attr("oldName", positionName);
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
    var liParent = $($($(_this).parent()).parent()).parent();
    var $div = $(liParent).children();
    $($div[1]).text($($div[1]).children("input").attr("oldName"));
    $($div[2]).text($($div[2]).attr("oldName"));
    $($div[3]).text($($div[3]).attr("oldName"));
    $($div[4]).text($($div[4]).attr("oldName"));
    $($div[5]).text($($div[5]).children("input").attr("oldName"));
    $($div[6]).text($($div[6]).children("input").attr("oldName"));
    $(($(_this).parent())).html("<a href='#' class='la' onclick='editItem(this)'>修改</a>");
}

function saveItem(_this) {
    var liParent = $($($(_this).parent()).parent()).parent();
    var liId = $(liParent).attr("id");
    var $div = $(liParent).children();
    var newUserName = $.trim($($div[1]).children("input").val());
    if (newUserName == "") {
        showErrorDialog("info", "用户名不能为空");
        return;
    }

    var newEmail = $.trim($($div[5]).children("input").val());
    if (newEmail == "") {
        showErrorDialog("info", "邮件不能为空");
        return;
    }

    var newMobile = $.trim($($div[6]).children("input").val());
    var newDepartmentName = $($div[2]).children("select").find("option:selected").text();
    var newDepartmentId = $($($div[2]).children("select")).val();
    var newPositionName = $($div[4]).children("select").find("option:selected").text();
    var newPositionId = $($($div[4]).children("select")).val();
    var userId = liId.substring(3, liId.length);

    var user = {
        id : userId,
        name : newUserName,
        email : newEmail,
        mobile : newMobile,
    };

    var userObject = {
        user : user,
        departmentId : newDepartmentId,
        positionId : newPositionId
    };

    var url = "/euc/ws/0.1/user/update";
    var success = function(data) {
        var parent = $(_this).parent();
        $(parent).html("<a href='#' class='la' onclick='editItem(this)'>修改</a>");
        $($div[1]).text(newUserName);
        $($div[2]).text(newDepartmentName);
        $($div[2]).attr("id", newDepartmentId);
        $($div[4]).text(newPositionName);
        $($div[4]).attr("id", newPositionId);
        $($div[5]).text(newEmail);
        $($div[6]).text(newMobile);
    };

    var error = errorCallback;
    postMethodRequestWithData(url, userObject, success, error, true);
}

function singleDelete(userId, userName) {
    $("#deleteConfirmationDialog div:eq(1)").attr("id", userId);
    var content = "确定要删除用户 " + userName + " 吗?";
    $("#deleteConfirmationDialog div:eq(1)").text(content);
    $("#deleteConfirmationDialog").center();
    $("#deleteConfirmationDialog").css("display", "block");
}

function confirmDelete(_this) {
    var id = $("#deleteConfirmationDialog div:eq(1)").attr("id");
    $("#deleteConfirmationDialog").css("display", "none");
    deleteUserById(id);
}

function deleteUserById(id) {
    var url = "/euc/ws/0.1/user/delete?id=" + id;
    var success = function(data) {
        $("#li_" + id).remove();
    };

    var error = errorCallback;
    postMethodRequestWithoutData(url, success, error, true);
}

function departmentChangeEvent(_this) {
    var departmentId = $(_this).val();
    var liid = $(_this).attr("liid");
    var pDepartmentId = "";
    var pDepartmentName = "";
    for (var i = 0; i < globalDepartment.length; i++) {
        if (departmentId == globalDepartment[i].id) {
            pDepartmentId = globalDepartment[i].pId;
            pDepartmentName = globalDepartment[i].pName;
            break;
        }
    }

    $div = $("#" + liid).children()[3];
    $($div).attr("id", pDepartmentId);
    $($div).text(pDepartmentName);
}

function addUser() {
    var departmentId = $("#departmentList").val();
    var positionId = $("#positionList").val();
    var userName = $.trim($("#userName").val());
    var initialPassword = $("#initialPassword").val();
    var email = $.trim($("#email").val());
    var mobile = $.trim($("#mobile").val());
    if (userName == null || userName == "") {
        showErrorDialog("info", "用户名不能为空");
        return;
    }

    if (!index.validEmail(email)) {
        showErrorDialog("info", "请输入正确的邮箱");
        return;
    }

    if (departmentId == "-1") {
        departmentId = null;
    }

    if (positionId == "-1") {
        positionId = null;
    }

    if (initialPassword != null && initialPassword != "") {
        initialPassword = hex_md5(initialPassword);
    }

    var user = {
        name : userName,
        email : email,
        mobile : mobile,
        password : initialPassword
    };

    var userObject = {
        user : user,
        departmentId : departmentId,
        positionId : positionId
    };

    var url = "/euc/ws/0.1/user/add";
    var success = function(data) {
        $("#userName").val("");
        $("#initialPassword").val("");
        $("#email").val("");
        $("#mobile").val("");
        initPagination = true;
        if (totalCount % 10 == 0) {
            showAllUsers(totalPages, 10);
        } else {
            showAllUsers(totalPages - 1, 10);
        }

        showErrorDialog("info", "添加成功");
    };
    var error = errorCallback;
    postMethodRequestWithData(url, userObject, success, error, true);
}