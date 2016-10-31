$(document).ready(function() {
    // index.initRegValidator();
        // index.initRegGoValidator();
        initBaseInfo();
    });
    /**
     * 动态显示时间。
     */
     function showDynTime(ev, type){
        /*
         * ev:显示时间的元素
         * type:时间显示模式.若传入12则为12小时制,不传入则为24小时制
         */
        //年月日时分秒
        var Y,M,D,W,H,I,S;
        //月日时分秒为单位时前面补零
        function fillZero(v){
            if(v < 10){
                v = '0' + v;
            }
            return v;
        }
        (function(){
            var d=new Date();
            var Week=['星期天','星期一','星期二','星期三','星期四','星期五','星期六'];
            Y=d.getFullYear();
            M=fillZero(d.getMonth()+1);
            D=fillZero(d.getDate());
            W=Week[d.getDay()];
            H=fillZero(d.getHours());
            I=fillZero(d.getMinutes());
            S=fillZero(d.getSeconds());
            //12小时制显示模式
            if(type && type==12){
                //若要显示更多时间类型诸如中午凌晨可在下面添加判断
                if(H<=12){
                    H='上午 '+H;
                }else if(H>12 && H<24){
                    H-=12;
                    H='下午 '+fillZero(H);
                }else if(H==24){
                    H='下午 00';
                }
            }
            ev.html(Y + '年' + M + '月' + D + '日 ' + '（' + W + '）' + H + ':' + I + ':' + S);
            //每秒更新时间
            setTimeout(arguments.callee, 1000);
        })();
     }
    /**
     * 初始化页面顶部用户名、时间、天气等信息。
     */
     function initBaseInfo(){
        // 显示用户名称
        var arrayUserOperatorName = $(".display-name");
        if (arrayUserOperatorName != null){
            for (var i = 0; i < arrayUserOperatorName.length; i++){
                arrayUserOperatorName.html(carsmart_config.operatorName);
            }
        }
        // 显示时间
        var objShowTime = $("#span-show-time");
        if (objShowTime != null){
            showDynTime(objShowTime, "24");
        }
     }
     
var cookie = {
	set : function(name, value, expireDays){
		var days = expireDays == null ? 30 : expireDays;// 过期天数，默认30天
		var exp = new Date();
		exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
		document.cookie = name + "="+ value + ";expires=" + exp.toGMTString();
	},
	get : function(name){
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	    if(arr != null) {
	    	return arr[2];
	    }
	    return null;
	},
	remove : function(name){
		var exp = new Date();
	    exp.setTime(exp.getTime() - 1);
	    var cval = this.get(name);
	    if(cval != null) {
	    	document.cookie= name + "=" + cval + ";expires=" + exp.toGMTString();
	    }
	}
};

function validSpace(value) {
	return value;
}

var index = {
    changevercode : 1,
    CONTEXT_PATH : "/web4s",
    pndObj : {},// 缓存pnd的信息
    gpsObj : {},// 缓存gps的信息
    map : null,
    mark : null,
    nowShowDiv : "",
    sendEmailUid:null,

    /**
     * 开发模式
     *
     *
     */
    initPage : function(){
        web4s.isOpen = "";
    },
    /**
     * 登录验证。
     */
   	/**
     * 登录验证。
     */
	newSubmit: function() {
		$('#errorInfo').css("display", "none");
		var userid = $("#email").val();
		var password = $("#password").val();
		var captcha = $("#captcha").val();
		if (userid == "" || password == ""||captcha=="") {
			if (userid == "") {
				$('#emailerror').html("<span>请输入登录邮箱</span>").show();
			}

			if (password == "") {
				$('#errorInfo').html("<span>请输入密码</span>").show();
			}
			if (captcha == "") {
				$('#captchaerror').html("<span>请输入验证码</span>").show();
			}

			return;
		} 
		$.ajax({
			url : "/channel-euc/ws/0.1/login/withcaptcha?username=" + userid + "&password=" +hex_md5( password) + "&domain=10&captcha=" + captcha,
			contentType: "application/json;charset=utf-8",
			dataType: "json",
			type: "POST",
			success: function(data) {
				var strHref = window.location.href;
				var strGoToUrl;

				if (strHref.indexOf("backurl=") != -1) {
					strGoToUrl = strHref.substring(strHref.indexOf("backurl=") + "backurl=".length, strHref.length);
				} else {
					strGoToUrl = "index.jsp";
				}
				window.location = strGoToUrl;
			},
			error: function(xhr) {
                var status = xhr.status;
                if(status == 200) {
					/**$.jRadGet({
						beforeSend:function (xhr) {
							xhr.setRequestHeader ("Authorization", "Basic QWRtaW46cGFzc3dvcmQ=");
						},
						url : '/pentaho/plugin/saiku/api/anonymous/discover/refresh'
					});**/ 
                    var strHref = window.location.href;
                    var strGoToUrl;
                    if (strHref.indexOf("backurl=") != -1) {
                        strGoToUrl = strHref.substring(strHref.indexOf("backurl=") + "backurl=".length, strHref.length);
                    } else {
                        strGoToUrl = "index.jsp";
                    }
                    window.location = strGoToUrl;
                } else {
				    var errormsg = eval("(" + xhr.responseText + ")");  
                    $('#captchaerror').html("<font>"+errormsg[0].message+"</font>");
                    $('#captchaerror').attr("class", "on-error");
                    $('#captchaerror').css("display", "block");
                }
            }
		}); 
		 
	 

		
	},
    /**
     *退出登录。
     */
     logOut : function() {
        $.ajax({
            url : "/channel-euc/ws/0.1/logout",
            contentType : "application/json;charset=utf-8",
            dataType : "json",
            type : "GET",
            success : function(data) {
                window.location = "login.jsp";
            }
        });
     },
    /**
     * 初始化登录验证
     */
    initLoginValidator : function() {
        $.formValidator
                .initConfig( {
                    formid : 'user_login',
                    onsuccess : function() {
                        $
                                .ajax( {
                                    url : sys.context_path
                                            + "/registerUser.action",
                                    type : "post",
                                    data : {
                                        'userBase.accountNo' : $('#account_no')
                                                .val(),
                                        'userBase.password' : $('#password')
                                                .val(),
                                        'captcha_code' : $('#captcha_code')
                                                .val()
                                    },
                                    dataType : "json",
                                    success : function(data) {
                                        if (data.isSuccess == 0) {
                                            window.location.href = sys.context_path + '/user/register2.html';
                                        } else if (data.isSuccess == 2) {
                                            $.msgBox.alert( {
                                                title : "提示信息",
                                                msg : "会员ID已分配完，请稍后再注册。",
                                                icon : "warning"
                                            });
                                        } else if (data.isSuccess == 1) {
                                            $.msgBox.alert( {
                                                title : "提示信息",
                                                msg : "网络异常，请稍后再注册。",
                                                icon : "warning"
                                            });
                                        } else if (data.isSuccess == 4) {
                                            $('#captcha_code_tip').attr(
                                                    'class', 'onError');
                                            if ($('#captcha_code').val()) {
                                                $('#captcha_code_tip')
                                                        .html(
                                                                '<span>验证码输入错误，请重新输入</span>');
                                            } else {
                                                $('#captcha_code_tip').html(
                                                        '<span>请输入验证码</span>');
                                            }

                                        } else {
                                            window.location.href = sys.context_path + '/index.jsp';
                                        }
                                    }
                                });
                        return false;
                    }
                });

        $('#protocol').formValidator( {
            tipid : 'protocol_tip',
            onshow : '&nbsp;',
            onfocus : '<span>请阅读《车友互联网络服务使用协议》</span>',
            oncorrect : '&nbsp;'
        }).functionValidator( {
            fun : function(val, obj) {
                if (obj.checked) {
                    return true;
                } else {
                    return false;
                }
            },
            onerror : '<span>请阅读《车友互联网络服务使用协议》</span>'
        });
        $('#account_no')
                .formValidator(
                        {
                            tipid : 'account_no_tip',
                            onshow : '&nbsp;',
                            onfocus : '<span>请输入常用邮箱，如：xx@163.com，它将成为您未来的登录账号！</span>',
                            oncorrect : '&nbsp;'
                        })
                .regexValidator(
                        {
                            param : 'g',
                            regexp : "@[a-z0-9-]{1,}[a-z0-9]\.[a-z\.]{1,}[a-z]$",
                            onerror : "<span>邮箱格式输入不正确</span>"
                        }).ajaxValidator( {
                    type : 'get',
                    url : sys.context_path + '/checkAccountNo.action',
                    datatype : 'json',
                    buttons : $('#reg_button'),
                    success : function(data) {
                        if (data.isSuccess) {
                            return true;
                        }
                        return false;
                    },
                    error : function() {
                        return false;
                    },
                    onerror : '<span>您注册的账户已被使用，请重新输入</span>',
                    onwait : '<span>正在等待服务器验证结果...</span>'
                });
        $('#password').formValidator( {
            tipid : 'password_tip',
            onshow : '&nbsp;',
            onfocus : '<span>6～16个字符（字母、数字、特殊符号），区分大小写</span>',
            oncorrect : '&nbsp;'
        }).functionValidator( {
            fun : function(password) {
                if (!password)
                    return false;
                var len;
                var i;
                var isPassword = true;
                len = 0;
                for (i = 0; i < password.length; i++) {
                    if (password.charCodeAt(i) > 255)
                        isPassword = false;
                }
                if (!isPassword || password.length > 16 || password.length < 6)
                    return false;

                return true;
            },
            onerror : '<span>6～16个字符（字母、数字、特殊符号），区分大小写</span>'
        });
        $('#rep_password').formValidator( {
            tipid : 'rep_password_tip',
            onshow : '&nbsp;',
            onfocus : '<span>请输入确认密码</span>',
            oncorrect : '&nbsp;'
        }).functionValidator( {
            fun : function(repPassword) {
                if (!repPassword)
                    return false;
                return true;
            },
            onerror : '<span>请输入确认密码</span>'
        }).compareValidator( {
            desid : 'password',
            operateor : '=',
            onerror : '<span>两次密码不一致</span>'
        });
    },

    /**
     * 更新验证图片
     */
    refreshCaptchaImg : function(imageId) {
        $('#' + imageId)
                .attr("src", "/channel-euc/ws/0.1/captcha?a=" + index.getRandomStr());
    },
    /**
     * 随机数字
     */
    getRandomStr : function() {
        return parseInt(Math.random() * 1000);
    },

    removeerrorInfo : function(id) {
        var errorid = id;
        /*$('#' + errorid + '').html("");
        $('#' + errorid + '').attr("class", "");*/
        $('#' + errorid + '').attr("style","display:none");
    },

    /**
     * 初始化找回密码验证
     */
    initFWValidator : function() {
        $.formValidator
                .initConfig( {
                    formid : 'my_form',
                    onsuccess : function() {
                        $
                                .ajax( {
                                    url : sys.context_path
                                            + "/findPassword.action",
                                    type : "post",
                                    data : {
                                        'userBase.accountNo' : $('#account_no')
                                                .val(),
                                        'captcha_code' : $('#captcha_code')
                                                .val()
                                    },
                                    dataType : "json",
                                    success : function(data) {
                                        if (data.isSuccess == 0) {
                                            window.location.href = sys.context_path + '/user/findPasswordLogin.jsp';
                                        } else if (data.isSuccess == 1) {
                                            $.msgBox.alert( {
                                                title : "提示信息",
                                                msg : "网络异常，请稍后再注册。",
                                                icon : "warning"
                                            });
                                        } else if (data.isSuccess == 4) {
                                            $('#captcha_code_tip').attr(
                                                    'class', 'onError');
                                            if ($('#captcha_code').val()) {
                                                $('#captcha_code_tip')
                                                        .html(
                                                                '<span>验证码输入错误，请重新输入</span>');
                                            } else {
                                                $('#captcha_code_tip').html(
                                                        '<span>请输入验证码</span>');
                                            }

                                        } else {
                                            window.location.href = sys.context_path + '/index.jsp';
                                        }
                                    }
                                });
                        return false;
                    }
                });

        $('#protocol').formValidator( {
            tipid : 'protocol_tip',
            onshow : '&nbsp;',
            onfocus : '<span>请阅读《车友互联网络服务使用协议》</span>',
            oncorrect : '&nbsp;'
        }).functionValidator( {
            fun : function(val, obj) {
                if (obj.checked) {
                    return true;
                } else {
                    return false;
                }
            },
            onerror : '<span>请阅读《车友互联网络服务使用协议》</span>'
        });
        $('#account_no')
                .formValidator(
                        {
                            tipid : 'account_no_tip',
                            onshow : '&nbsp;',
                            onfocus : '<span>请输入常用邮箱，如：xx@163.com，它将成为您未来的登录账号！</span>',
                            oncorrect : '&nbsp;'
                        })
                .regexValidator(
                        {
                            param : 'g',
                            regexp : "@[a-z0-9-]{1,}[a-z0-9]\.[a-z\.]{1,}[a-z]$",
                            onerror : "<span>邮箱格式输入不正确</span>"
                        }).ajaxValidator( {
                    type : 'get',
                    url : sys.context_path + '/checkAccountNo.action',
                    datatype : 'json',
                    buttons : $('#reg_button'),
                    success : function(data) {
                        if (data.isSuccess) {
                            return true;
                        }
                        return false;
                    },
                    error : function() {
                        return false;
                    },
                    onerror : '<span>您注册的账户已被使用，请重新输入</span>',
                    onwait : '<span>正在等待服务器验证结果...</span>'
                });
        $('#password').formValidator( {
            tipid : 'password_tip',
            onshow : '&nbsp;',
            onfocus : '<span>6～16个字符（字母、数字、特殊符号），区分大小写</span>',
            oncorrect : '&nbsp;'
        }).functionValidator( {
            fun : function(password) {
                if (!password)
                    return false;
                var len;
                var i;
                var isPassword = true;
                len = 0;
                for (i = 0; i < password.length; i++) {
                    if (password.charCodeAt(i) > 255)
                        isPassword = false;
                }
                if (!isPassword || password.length > 16 || password.length < 6)
                    return false;

                return true;
            },
            onerror : '<span>6～16个字符（字母、数字、特殊符号），区分大小写</span>'
        });
        $('#rep_password').formValidator( {
            tipid : 'rep_password_tip',
            onshow : '&nbsp;',
            onfocus : '<span>请输入确认密码</span>',
            oncorrect : '&nbsp;'
        }).functionValidator( {
            fun : function(repPassword) {
                if (!repPassword)
                    return false;
                return true;
            },
            onerror : '<span>请输入确认密码</span>'
        }).compareValidator( {
            desid : 'password',
            operateor : '=',
            onerror : '<span>两次密码不一致</span>'
        });
    },

    /**
     * 输入新密码
     */
    modifyPassword : function() {
        $('#hiddendotype').val("yes");
        index.checkNewPasswordForm();
        var validatorForm = $('#hiddendotype').val();
        if (validatorForm != "no") {
            $("#repeatpwWrap").hide();

            $.msgBox.maskDiv.show("系统正在处理您的请求,请等待！");
        $.ajax( {
            url : "/web4s/modifyPassword.action",
            type : "post",
            data : {
                'userBase.password' : $('#password').val(),
                'repassword' : $('#repassword').val(),
                'userBase.accountNo' : $('#emailAccount').val()
            },
            dataType : "json",
            success : function(data) {
                $.msgBox.maskDiv.close();
                if(data){
                if (data.isSuccess == "1") {
                    $("#repeatpwWrap").show();
                    $("#repeatpwTip").html(data.passwordTip);
                } else if (data.isSuccess == "0") {
                    window.location.href = "/web4s/user/modifyPWSuccess.jsp";
                } else {
                    $.msgBox.alert( {
                        title : "提示信息",
                        msg : "网络错误！",
                        icon : "warning"
                    });
                }
            }else{
                $("#repeatpwWrap").show();
                $("#repeatpwTip").html("<span>修改密码失败。</span>");
            }
           }
        });
        return false;

        }
    },
    removeCPErrMsg:function(){
        $("#repeatpwWrap").hide();
        $("#repeatpwTip").html("<span></span>");
    },
    /**
     * 修改新密码
     */
   checkNewPasswordForm:function(){
        /**创建密码*/
        var password = $('#password').val();
        if (password == "" || password == null) {
            $('#hiddendotype').val("no");
            $("#repeatpwWrap").show();
            $("#repeatpwTip").html("<span>请输入密码</span>");
        }else if (/^[\u0391-\uFFE5\w]+$/.test(password) == false) {
            $('#hiddendotype').val("no");
            $("#repeatpwWrap").show();
            $("#repeatpwTip").html("<span>请输入中文字、英文字母、数字和下划线</span>");
        }else if(password.length<6) {
            $('#hiddendotype').val("no");
            $("#repeatpwWrap").show();
            $("#repeatpwTip").html("<span>密码太短了，最少为6位。</span>");
        }else{
            var len;
            var i;
            var isPassword = true;
            len = 0;
            for (i = 0; i < password.length; i++) {
                if (password.charCodeAt(i) > 255)
                    isPassword = false;
            }
            var and_string = password.charAt(0);
            var and_num = 0;
            if (!isPassword || password.length > 16
                    || password.length < 6) {
                $('#hiddendotype').val("no");
                $("#repeatpwWrap").show();
                $("#repeatpwTip").html("<span>请输入6~16位长度的密码。</span>");
            }
            var temp1 = '';
            for ( var i = 0; i < password.length; i++) {
                temp1 += and_string;
            }
            if (temp1 == password){
               $('#hiddendotype').val("no");
               $("#repeatpwWrap").show();
               $("#repeatpwTip").html("<span>密码不允许连续或重复</span>");
            }
            var a=0;
            var b=0;
            if (!isNaN(password)) {
                and_num = parseInt(and_string);
                for ( var i = 1; i < password.length; i++) {
                    if ((and_num + 1) != parseInt(password
                            .charAt(i))) {
                        a=1;
                    }
                    and_num = parseInt(password.charAt(i));
                }
                var end_num =parseInt(password.charAt(0));
                for ( var c = 1; c < password.length; c++) {
                    if ((end_num - 1) != parseInt(password
                            .charAt(c))) {
                        b=1;
                    }
                    end_num = parseInt(password.charAt(c));
                }



                if(a==0||b==0){
                $('#hiddendotype').val("no");
                $("#repeatpwWrap").show();
                $("#repeatpwTip").html("<span>密码不允许连续或重复</span>");
                }
            }


        }

        /**创建密码*/
        var resPassword2 = $('#repassword').val();

        if (resPassword2 == "" || resPassword2 == null) {
            $('#hiddendotype').val("no");
            $("#repeatpwWrap").show();
            $("#repeatpwTip").html("<span>请输入密码</span>");
        }else if (/^[\u0391-\uFFE5\w]+$/.test(resPassword2) == false) {
            $('#hiddendotype').val("no");
            $("#repeatpwWrap").show();
            $("#repeatpwTip").html("<span>请输入中文字、英文字母、数字和下划线</span>");
        }else if(resPassword2!=password){
            $('#hiddendotype').val("no");
            $("#repeatpwWrap").show();
            $("#repeatpwTip").html("<span>两次输入的密码不同!</span>");

        }




    },
    /**
     * 初始化注册邮箱激活基本信息
     */
    initRegEmail : function(accountNo) {
        index.sendEmailUid=accountNo;
       /* $
                .ajax( {
                    url : "/web4s/getUserLogin.action",
                    type : "get",
                    dataType : "json",
                    success : function(data) {
                        if (data.isSuccess) {
                            $('#email_name').html(data.accountNo);
                            var temp = '';
                            temp = data.accountNo;
                            var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                            if (reg.test(temp)) {
                                temp = temp.split("@")[1];
                                if (temp == "hotmail.com" || temp == "live.cn") {
                                    temp = "live.com";
                                }

                                if (temp == "gmail.com") {
                                    temp = "google.com";
                                }
                            }
                            $('#email_url').click(function() {
                                window.location.href = 'http://mail.' + temp;
                            });
                            $('#email_URL').click(function() {
                                window.location.href = 'http://mail.' + temp;
                            });
                        } else {
                            window.location.href = sys.context_path + '/index.jsp';
                        }
                    }
                });*/
        $("#email_name").html(accountNo);
        var temp = '';
        temp = accountNo;
        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (reg.test(temp)) {
            temp = temp.split("@")[1];
            if (temp == "hotmail.com" || temp == "live.cn") {
                temp = "live.com";
            }

            if (temp == "gmail.com") {
                temp = "google.com";
            }
        }
        $('#email_url').click(function() {
            window.open('http://mail.' + temp);
        });
        $('#email_URL').click(function() {
            window.open('http://mail.' + temp);
        });
    },

    /**
     * 初始化注册邮箱激活基本信息
     */
    initFindPasswordEmail : function(accountNo) {
      var accountNo=$("#accno").val();
      if(accountNo){
       // index.sendEmailUid=accountNo;
       // $("#email_name").html(accountNo);
        var temp = '';
        temp = accountNo;
        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (reg.test(temp)) {
            temp = temp.split("@")[1];
            if (temp == "hotmail.com" || temp == "live.cn") {
                temp = "live.com";
            }

            if (temp == "gmail.com") {
                temp = "google.com";
            }
        }
        $('#email_url').click(function() {
            window.open('http://mail.' + temp);
        });
        $('#email_URL').click(function() {
            window.open('http://mail.' + temp);
        });
      }
    },
    /**
     * 再一次发邮件
     */
    sendEmailAgain:function(){
        $.ajax( {
            url : "/web4s/sendEmailAgain.action",
            type : "post",
            data : {'userId' : index.sendEmailUid,'type' : 1},
            dataType : "json",
            success : function(data) {
                if(data.isSuccess==1){
                    $.msgBox.alert( {
                        title : "提示信息",
                        msg : "发送成功！",
                        icon : "warning"
                    });
                }else{
                    $.msgBox.alert( {
                        title : "提示信息",
                        msg : "发送失败！",
                        icon : "warning"
                    });
                }
            }
        });
    },

    /**
     * 用户登录验证
     * @param id
     */
    checkUserLoginOneFocus:function(id)
    {
        var flag = false;
        if(id=="email"){
       // var result=index.checkEmail();
       // if(result==0){
          /**邮箱地址*/
          var account_no = $('#email').val();
          if (account_no == "" || account_no == null) {
              $('#hiddendotype').val("no");
              $('#emailerror').attr("style","display:block");
              $('#emailerror').html("<span>请输入用户名或登录邮箱。</span>");

          }
/*          else if (/^([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(account_no) == false) {

              $('#hiddendotype').val("no");
              $('#emailerror').html("<span>请输入正确的邮箱地址</span>");
              $('#emailerror').attr("class","onError");
          } */
          if(account_no.length > 255){
              $('#hiddendotype').val("no");
              $('#emailerror').attr("style","display:block");
              $('#emailerror').html("<span>邮箱或用户名长度过长。</span>");

          }

      //  }
        }else if(id=="password"){

          /**创建密码*/
          var password = $('#password').val();
          if (password == "" || password == null) {

              $('#hiddendotype').val("no");
              $('#errorInfo').attr("style","display:block");
              $('#errorInfo').html("<span>请输入密码</span>");
          }else
              {
              flag = true;
              }

        }else if(id=="captcha"){
			  var captcha = $('#captcha').val();
			  if (captcha == "" || captcha == null) {

				  $('#hiddendotype').val("no");
				  $('#captchaerror').attr("style","display:block");
				  $('#captchaerror').html("<span>请输入验证码</span>");
			  }else
				  {
				  flag = true;
				  }
		
		}
        if(flag)
            {
             $("#login").attr("disabled",false);
            }
    },

    
    /**
     * 找回用户密码
     */
    findPassword : function() {
        $.formValidator
                .initConfig( {
                    formid : 'find_passwordform',
                    onsuccess : function() {
                        $
                                .ajax( {
                                    url : "/web4s/findPassword.action",
                                    type : "post",
                                    data : {
                                        'userBase.accountNo' : $('#account_no')
                                                .val(),
                                        'captcha_code' : $('#captcha_code')
                                                .val()
                                    },
                                    dataType : "json",
                                    success : function(data) {
                                        if (data.isSuccess == "0") {
                                            window.location.href = '/web4s/user/findPasswordLogin.jsp?userId='+data.email;

                                            $("#accno").val(data.email);
                                        } else if (data.isSuccess == "1") {
                                            $("#commonTipss").show();
                                            $("#loginTip").html(data.loginTip);
                                        }
                                    }
                                });
                        return false;
                    }
                });
    },

    /**
     * 用户登录界面用户登录
     */
    submitLogin : function(type) {
        if (type == 'send') {
            index.sendLoginUser();
        } else {
            $.formValidator.initConfig( {
                formid : 'user_login',
                onsuccess : function() {
                    index.sendLoginUser();
                }
            });
        }

    },

    sendLoginUser : function() {
        if($("#userid").val()!="" && $("#password").val()!=""){
            $("#user_login_TWO").attr('action', sys.context_path + "/user/user_login.action");

            //$('#user_login_TWO').submit();
        }
    },
    sendLoginUser2 : function() {
        if($("#userid").val()!=""&&$("#password").val()!=""){
        $("#user_login").attr('action', sys.context_path + "/user/user_login.action");
        $('#user_login').submit();
        }
    },

    /**
     * 初始化填写基本信息
     */
    initRegGo : function() {
        $
                .ajax( {
                    url : "/web4s/getUserLogin.action",
                    type : "get",
                    dataType : "json",
                    success : function(data) {
                        if (data.isSuccess) {
                            var html = '<span class="span14px darkRedspan">注册成功！您的车友号是：' + data.userId + ' </span>可用来登录，请记住该车友号！';
                            // $('#reg_go_welcome').html(html);
                            $('#email_name').html(data.accountNo);
                            user.initProvinces();
                            $('#city').sSelect();
                            index.initcarHaveGps('carFactory1');
                            $("#carFactory1").sSelect();
                            $("#carName1").sSelect();

                            user.initDisplacement();
                            $('#displacement').sSelect();

                           // index.initRegGoValidator();
                        } else {
                            window.location.href = sys.context_path + '/index.jsp';
                        }
                    }
                });
    },
    /**
     * 初始化基本信息验证
     */
    initRegGoValidator : function() {
        $('#city').sSelect();
        $.formValidator
                .initConfig( {
                    formid : 'my_form',
                    onsuccess : function() {
                        var userSex = 1;
                        if ($('#sex2').attr('checked'))
                            userSex = 0;
                        var selectText = '';
                        $(":checkbox[name='travel']:checked").each(function() {
                            selectText += $(this).val() + ',';
                        });
                        $
                                .ajax( {
                                    url : sys.context_path
                                            + "/registerUserGo.action",
                                    type : "post",
                                    data : {
                                        'userBase.userId' : $('#userId').val(),
                                        'userBase.nickName' : $('#nick_name')
                                                .val(),
                                        'userBase.cityId' : $('#city').val(),
                                        'userBase.sex' : userSex,
                                        'userDetail.birthDate' : $('#birthday')
                                                .val(),
                                        'userBase.email' : $('#email').val(),
                                        'userBase.carId' : $('#carName1').val(),
                                        'userDetail.displacement' : $(
                                                '#displacement').val(),
                                        'userDetail.afterCode' : $(
                                                '#after_code').val(),
                                        'interest' : selectText
                                    },
                                    dataType : "json",
                                    success : function(data) {
                                        if(data){
                                        if (data.isSuccess==1) {
                                            window.location.href = sys.context_path + '/user/registerGo.jsp';
                                        } else if(data.isSuccess==0){
                                            $.msgBox.alert( {
                                                title : "提示信息",
                                                msg : data.msg,
                                                icon : "warning"
                                            });
                                        }else if(data.isSuccess == 2){
                                            window.location.href=sys.context_path +'/home/index.action';
                                        }
                                      }else{
                                          $.msgBox.alert( {
                                              title : "提示信息",
                                              msg : "系统异常",
                                              icon : "warning"
                                          });
                                      }
                                    }
                                });
                        return false;
                    },
                    error : function() {
                        alert('错误');
                    }
                });
        $('#nick_name').formValidator( {
            tipid : 'nick_name_tip',
            onshow : '&nbsp;',
            onfocus : '<span>请输入2～32个字符昵称（字母、数字、中文、特殊符号）</span>',
            oncorrect : '&nbsp;'
        }).functionValidator( {
            fun : function(nickname) {
                if (!nickname)
                    return false;
                var len;
                var i;
                var isNickname = true;
                len = 0;
                if (!isNickname || nickname.length > 32 || nickname.length < 2)
                    return false;
                return true;
            },
            onerror : '<span>请输入2～32个字符的昵称（字母、数字、特殊符号）</span>'
        }).ajaxValidator( {
            type : 'get',
            url : sys.context_path + '/checkNickname.action',
            datatype : 'json',
            buttons : {"nick_name":$("#nick_name").val(),"userId":$("#userId").val()},
            success : function(data) {
                if (data.isSuccess) {
                    return true;
                }
                return false;
            },
            error : function() {
                return false;
            },
            onerror : '<span>此昵称太受欢迎，已经被人抢了。</span>',
            onwait : '<span>正在等待服务器验证结果...</span>'
        });
        $('#city').formValidator( {
            tipid : 'citys_tip',
            onshow : '&nbsp;',
            onfocus : '<span>请选择城市</span>',
            oncorrect : '&nbsp;'
        }).functionValidator( {
            fun : function(city) {
                if (!city)
                    return false;
                return true;
            },
            onerror : '<span>请选择城市</span>'
        });
        $("#birthday").focus(function() {
            WdatePicker( {
                skin : 'whyGreen',
                maxDate : '%y-%M-%d',
                oncleared : function() {
                    $(this).blur();
                },
                onpicked : function() {
                    $(this).blur();
                }
            });
        }).formValidator( {
            tipid : "birthday_tip",
            onshow : "&nbsp;",
            onfocus : "<span>请选择生日</span>",
            oncorrect : "&nbsp;"
        }).functionValidator( {
            fun : function(birthday) {
                if (!birthday)
                    return false;
                return true;
            },
            onerror : '<span>请选择生日</span>'
        });
        $('#email')
                .formValidator( {
                    tipid : 'email_tip',
                    onshow : '&nbsp;',
                    onfocus : '<span>请输入邮箱</span>',
                    oncorrect : '&nbsp;'
                })
                .functionValidator( {
                    fun : function(email) {
                        if (!email)
                            return false;
                        return true;
                    },
                    onerror : '<span>请输入邮箱</span>'
                })
                .regexValidator(
                        {
                            regexp : "@[a-z0-9-]{1,}[a-z0-9]\.[a-z\.]{1,}[a-z]$",
                            onerror : "<span>邮箱格式输入不正确</span>"
                        });
    },

    /**
     * 检查是否全选
     */
    checkIsCheckAll : function(div) {
        var flag = true;
        $("#" + div + " input:checkbox").each(function() {
            if ($(this).attr("checked") == false) {
                flag = false;
                return false;
            }
        });
        if (flag) {
            $("#selectAllBtn").hide();
            $("#cancelSelectAllBtn").show();
        } else {
            $("#cancelSelectAllBtn").hide();
            $("#selectAllBtn").show();
        }

    },
    /**
     * 全选/取消全选 num 1：全选 0：取消全选
     */
    cancelSelectAll : function(num) {
        if (num == 1) {
            $("#" + index.nowShowDiv + " input:checkbox").each(function() {
                if ($(this).attr("checked") == false) {
                    $(this).attr("checked", true);
                }
            });
            $("#selectAllBtn").hide();
            $("#cancelSelectAllBtn").show();
        } else {
            $("#" + index.nowShowDiv + " input:checkbox").each(function() {
                if ($(this).attr("checked") == true) {
                    $(this).removeAttr("checked");
                }
            });
            $("#cancelSelectAllBtn").hide();
            $("#selectAllBtn").show();
        }

        index.checkCheckBox();
    },

    validEmail : function(email) {
        if (email == "" || email == null) {
            return false;
        }else if (/^([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(email) == false) {
            return false;
        } else if(email.length > 255){
            return false;
        } else {
            return true;
        }
    }
};