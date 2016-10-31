(function($){
	$(function(){
	$("div.regLine div.loaditem2").each(function(i){
		var thisELem=$(this);
		uploaderInit(thisELem,i)
	})
	function uploaderInit(obj,N){
		var $wrap=obj;
		var ratio = window.devicePixelRatio || 1,
			// 缩略图大小
			thumbnailWidth = 110 * ratio,
			thumbnailHeight = 110 * ratio,
			uploader,
			isSupportBase64 = ( function() {
                var data = new Image();
                var support = true;
                data.onload = data.onerror = function() {
                    if( this.width != 1 || this.height != 1 ) {
                        support = false;
                    }
                }
                data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                return support;
            } )(),
        // 检测是否已经安装flash，检测flash的版本
	    flashVersion = ( function() {
	        var version;
	        try {
	            version = navigator.plugins[ 'Shockwave Flash' ];
	            version = version.description;
	        } catch ( ex ) {
	            try {
	                version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
	                        .GetVariable('$version');
	            } catch ( ex2 ) {
	                version = '0.0';
	            }
	        }
	        version = version.match( /\d+/g );
	        return parseFloat( version[ 0 ] + '.' + version[ 1 ], 10 );
	    } )()

//判断flash版本以及安装情况
   if ( !WebUploader.Uploader.support('flash') && WebUploader.browser.ie ) {

    // flash 安装了但是版本过低。
    if (flashVersion) {
        (function(container) {
            window['expressinstallcallback'] = function( state ) {
                switch(state) {
                    case 'Download.Cancelled':
                        alert('您取消了更新！')
                        break;

                    case 'Download.Failed':
                        alert('安装失败')
                        break;

                    default:
                        alert('安装已成功，请刷新！');
                        break;
                }
                delete window['expressinstallcallback'];
            };

            var swf = './expressInstall.swf';
            // insert flash object
            var html = '<object type="application/' +
                    'x-shockwave-flash" data="' +  swf + '" ';

            if (WebUploader.browser.ie) {
                html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
            }

            html += 'width="100%" height="100%" style="outline:0">'  +
                '<param name="movie" value="' + swf + '" />' +
                '<param name="wmode" value="transparent" />' +
                '<param name="allowscriptaccess" value="always" />' +
            '</object>';

            container.html(html);

        })($wrap);

    // 压根就没有安转。
    } else {
//  	alert("请先下载安装flash播放器");
        $wrap.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0" style="color:orangered; display:inline-block; height:35px;line-height:35px;">请先下载安装flash播放器，点击安装flash</a>');
    }
    return;
} else if (!WebUploader.Uploader.support()) {
    alert( 'Web Uploader 不支持您的浏览器！');
    return;
}
//实例化
		$.extend(WebUploader.Uploader.options, {
			auto: true,
			swf: 'js/Uploader.swf',
			server: '/ycbmall-ws/ws/0.1/file/uploadThree',
			accept: {
				title: 'Images',
				extensions: 'jpeg,png,jpg',
				mimeTypes: 'image/*'
			},
			duplicate:true
		});
		uploader=WebUploader.create({
			pick:{
				id:'.uploadBtn'+N,
				multiple:false
			}
		});
		
		uploader.on('fileQueued', function(file) {
			var $li, $img;
			if ($('#Pic'+N).length > 0) {
				$li = $('#Pic'+N);
			} else {
				$li = $(
						'<div id="Pic'+N+'" class="file-item thumbnail">' +
						'<img>' +
						'</div>'
				);

			}
			$img = $li.find('img');
			$('.uploadList'+N).append($li);

			// 创建缩略图
			// 如果为非图片文件，可以不用调用此方法。
			// thumbnailWidth x thumbnailHeight 为 100 x 100
			uploader.makeThumb(file, function(error, src) {
				if (error) {
					$img.replaceWith('<span>不能预览</span>');
					return;
				}
				
				if( isSupportBase64 ) {
                        img = $('<img src="'+src+'">');
                        $wrap.find('#Pic'+N).empty().append( img );
                }else {
                    $.ajax({
                        type: 'POST',
                    	url: mall.url('/file/uploadThree'),
                        data: src,
                        dataType:'json',
                    	success:function( response ) {
                        if (response.fileUrl) {
                        	src=response.fileUrl;
                            img = $('<img src="'+response.fileUrl+'">');
                            $wrap.find('#Pic'+N).empty().append( img );
                        } else {
                            $wrap.siblings('.item4').text("预览出错").show();
                            $wrap.siblings('.item5').hide();
                            
                        }
                        }
                    });
                }
				$img.attr('src', src);
			}, thumbnailWidth, thumbnailHeight);
		});

		// 文件上传过程中创建进度条实时显示。
		uploader.on('uploadProgress', function(file, percentage) {
//			var $li = $('#firstPic'),
//				$percent = $li.find('.progress span');
//
//			// 避免重复创建
//			if (!$percent.length) {
//				$percent = $('<p class="progress"><span></span></p>')
//					.appendTo($li)
//					.find('span');
//			}
//
//			$percent.css('width', percentage * 100 + '%');
		});

		// 文件上传成功，给item添加成功class, 用样式标记上传成功。
		uploader.on('uploadSuccess', function(file,response) {
			response=eval('('+response+')');//将response转化为json格式
			var imgUrl=response.fileUrl//上传图片路径
			$('#Pic'+N).addClass('upload-state-done');
			var $li = $('#Pic'+N),
				$error=$li.parents('#uploader'+N).siblings('.item4'),
				$success=$li.parents('#uploader'+N).siblings('.item5'),
				$img=$li.find('img'),
				$hideImg=$("#hideImg"+N);

			// 避免重复创建
			if (!$success.attr('display')=='block') {
				$error.text('上传失败,请重新上传').hide();
				$success.show();
			}
			$img.attr('src',imgUrl);
			$error.text('上传失败,请重新上传').hide();
			$success.show();
			$hideImg.val(imgUrl);
		});

		// 文件上传失败，现实上传出错。
		uploader.on('uploadError', function(file,reason) {
			var $li = $('#Pic'+N),
				$error=$li.parents('#uploader'+N).siblings('.item4'),
				$success=$li.parents('#uploader'+N).siblings('.item5'),
				$img=$li.find('img'),
				$hideImg=$("#hideImg"+N);

			// 避免重复创建
			if (!$error.attr('display')=='block') {
				$error.text('上传失败,请重新上传').show();
				$success.hide();
			}
			
			$error.text('上传失败,请重新上传').show();
			$success.hide();
			$hideImg.val('');
		});
		
		// 完成上传完了，成功或者失败，先删除进度条。
		uploader.on('uploadComplete', function(file) {
//			$('#Pic'+N).find('.progress').remove();
		});	
		
		//解决IE下，用flash上传  非jpg格式的图片不能上传成功
		var setHeader = function(object, data, headers) {
            headers['Access-Control-Allow-Origin'] = '*';
            headers['Access-Control-Request-Headers'] = 'content-type';
            headers['Access-Control-Request-Method'] = 'POST';
        }
        uploader.on('uploadBeforeSend ', setHeader);
	}
	})
})(jQuery)
