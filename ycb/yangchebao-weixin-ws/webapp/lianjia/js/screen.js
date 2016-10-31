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
function fastReg(prizeType,cocoCode){  
        var mobile = $("#mobile").val(); 
        if (mobile == '') {
            alertTasat("请输入手机号码");
            return
        }
        var regu = /^[1][0-9]{10}$/;
        var re = new RegExp(regu);
        if (!re.test(mobile)) {
            alertTasat("请输入正确手机号码");
            return
        } 
        var mobileCode = $("#mobileCode").val();
        if (mobileCode == '') {
            alertTasat("请输入验证码");
            return
        }
        var regu2 = /^[0-9]{4}$/;
        var re2 = new RegExp(regu2);
        if (!re2.test(mobileCode)) {
            alertTasat("请输入正确的验证码");
            return
        } 
         var postData = {};
         postData.mobileCode = mobileCode;
         postData.mobile = mobile;
         postData.prizeType = prizeType;
         postData.cocoCode = cocoCode; 
		 postData.channelId = "2"; 
         $.ajax({
                url: '/yangchebao-weixin-ws/ws/0.1/coco/userFastReg',
                type: 'post', 
                data:$.toJSON(postData),
                dataType: 'json',
                contentType:'application/json;charset=utf-8',
                success:function(data){ 
                    if(prizeType=="1"){
                        window.location.href = "prize-success.html";         
                    }else if(prizeType=="2"){
                        window.location.href = "prize-shop.html?userInfoId="+data.userInfoId+"&cocoCode="+cocoCode+"&mobile="+$("#mobile").val();        
                    }else{
                        window.location.href = "voucher-success.html";
                    }
                },error:function(xhr){
                    var mes = eval('('+xhr.responseText+')'); 
                    alertTasat(mes[0].message);
                } 
            });  
} 