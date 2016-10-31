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
 