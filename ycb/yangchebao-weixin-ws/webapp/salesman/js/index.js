function alertRe(m,t){
	var title = t||"提示信息";
	var dialog = $("<div>").addClass("dialog");
	var h1 = $("<h1>").html(title);
	var content = $("<div>").addClass("dialog-content").html("<p>"+m+"</p>");
	var btns = $("<div>").addClass("btn-wraper");
	var sure = $("<span>").html("确定"); 
	var overlay = $("<div>").addClass("dialog-overlay");
	$("body").append(dialog.append(h1).append(content).append(btns.append(sure))).append(overlay); 
	sure.on('click',function(){
		dialog.remove();
		overlay.remove();
	});
	overlay.on('click',function(){
		dialog.remove();
		overlay.remove();
	});
}
function confirmRe(m,sure,cancel,t){
	var title = t||"提示信息";
	var dialog = $("<div>").addClass("dialog");
	var h1 = $("<h1>").html(title);
	var content = $("<div>").addClass("dialog-content").html("<p>"+m+"</p>");
	var btns = $("<div>").addClass("btn-wraper two-btn");
	var sureBtn = $("<span>").html("确定");
	var cancelBtn = $("<span>").html("取消");
	var overlay = $("<div>").addClass("dialog-overlay");
	$("body").append(dialog.append(h1).append(content).append(btns.append(sureBtn).append(cancelBtn))).append(overlay);
	cancelBtn.on('click',function(){
	    if(jQuery.isFunction(cancel)) {
            cancel();
        }
		dialog.remove();
		overlay.remove();
	});
	sureBtn.on('click',function(){
		if(jQuery.isFunction(sure)) {
            sure();
        }
		dialog.remove();
		overlay.remove();
	});
	overlay.on('click',function(){
		dialog.remove();
		overlay.remove();
	});
}