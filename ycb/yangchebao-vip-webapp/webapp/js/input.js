$(function(){
	$('.ybs').css("text-align","center");
	
	// if($('.yes').blur() && $('.yes').val() == ''){
	// 	$('.yes').attr("placeholder","—")
	// }
	// if($('.yes').blur()){
	// 	alert(321)
	// }
	$('.yes').focus().attr("placeholder","");
	//$('.yes').focus();
	// $('.yes').focus().attr({placeholder:"",data:"test"});
	// if($('.yes').blur() && $('.yes').attr("data") == 'test'&& $('.yes').val() == ''){
	// 	$('.yes').attr("placeholder","—")
	// }
	//.attr("placeholder","—")

})
function toNext(obj,str){      
	if(obj.value.length==str&&obj.nextSibling.nextSibling.type=="text"){
	  obj.nextSibling.nextSibling.focus()  
	}
}

function IsNum(e) {
	var k = window.event ? e.keyCode : e.which;
	if (((k >= 48) && (k <= 57)) || k == 8 || k == 0) {
	} else {
		if (window.event) {
			window.event.returnValue = false;
		}
		else {
			e.preventDefault(); //for firefox 
		}
	}
}