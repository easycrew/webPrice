$(function(){  
    try{
        var phoneWidth = parseInt(window.screen.width);
        var phoneHeight = parseInt(window.screen.height);
        var phoneScale = phoneWidth / 640;
        var ua = navigator.userAgent;

        if (/Android (\d+\.\d+)/.test(ua)) {
            var version = parseFloat(RegExp.$1);
            // andriod 2.3
                $('[name="viewport"]').attr('content', 'width=640, initial-scale=' + phoneScale + ', minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi');
            if (version >= 2.3) {
                // andriod 2.3以上
            } else {
                $('[name="viewport"]').attr('content', 'width=640, initial-scale= 1.0, minimum-scale = 1.0, maximum-scale = 1.0, user-scalable=no, target-densitydpi=device-dpi');
            }
        // 其他系统
        } else {
                $('[name="viewport"]').attr('content', 'width=640, initial-scale=' + phoneScale + ', minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi');
        }
    }catch(e){}
});
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
