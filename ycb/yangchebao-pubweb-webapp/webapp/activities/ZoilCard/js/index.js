function alertTasat(msg){
			var _html = $("<div>").addClass("tasat-wrap")
            var _span = $("<span>").addClass("tasat").html(msg);
			$("body").append(_html.append(_span));
			_html.fadeIn();
			window.setTimeout(function(){
				_html.fadeOut(function(){
					_html.remove();
				});
			}, 1500);   
} 
function alertRefresh(msg){
			var _html = $("<div>").addClass("tasat-wrap")
            var _span = $("<span>").addClass("tasat").html(msg);
			$("body").append(_html.append(_span));
			_html.fadeIn();
			window.setTimeout(function(){
				_html.fadeOut(function(){
					_html.remove();

				});
				window.location.reload();
			}, 1500);   
} 
	/*设置错误弹出层*/
	var err_log=function(msg){
		//$('.pop-up').css('height',document.body.scrollHeight);/*设置隐藏弹出层的高度*/
		$('div.pop-up').show();
		$('#error-pop').remove();
		var errstr = '';
		errstr +='<div class="pop" id="error-pop">'
			+'<span class="error-receive">'+msg+'</span>'
			+'<span class="error-btn">确定</span>'
			+'</div>'
		$('.pop-up').append(errstr);
		$('span.error-btn').unbind('click').bind('click',function(){
			$('div.pop-up').hide();
			//window.location.reload();
		});
	}