/*
    **author: v_zhenzhenwu  2014.11
*/
// 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        var oUrl= function (href) {
            var thisHref;
            if (href.search=="") {
                thisHref = href.origin+href.pathname+'?ref=share'+href.hash;
            } else {
                thisHref = href.origin+href.pathname+href.search+'&ref=share'+href.hash
            }
            return thisHref;
        }(location);
        
        var imgUrl = 'http://3gimg.qq.com/tencent_map_wap_static/img/topic/thanksgiving/share.png';
        function getImg() {
            return imgUrl;
        }
        function getTitle() {
            return  '谢谢，改善世界的你 ';
        }
        function getDesc() {
            return '我在看【路宝感恩回馈，分享有礼】，分享给你，快来看！';
        }

        // 发送给好友
        WeixinJSBridge.on('menu:share:appmessage', function(argv) {
            WeixinJSBridge.invoke('sendAppMessage',{
                "img_url": getImg(),
                "img_width": "100",
                "img_height": "100",
                "link": oUrl,
                "title": getTitle(),
                "desc": getDesc()
            }, function(res) {
                try{
                    pgvSendClick({hottag:'LUBAO.THANKSGIVING.SHARE.TOFRIEND',virtualDomain: 'map.wap.qq.com'});
                }catch(e){}
                $('.share-btn,.share_wx').hide();
                $('.download-btn').show();
                //location.replace('http://mp.weixin.qq.com/s?__biz=MjM5OTM5MjcyMg==&mid=201331111&idx=1&sn=b262142bbdb01b532427e094947c2d79#rd');
            });
        });

        // 分享到朋友圈
        WeixinJSBridge.on('menu:share:timeline', function(argv) {
            WeixinJSBridge.invoke('shareTimeline',{
                "img_url": getImg(),
                "img_width": "100",
                "img_height": "100",
                "link":oUrl,
                "title": getTitle(),
                "desc": getDesc()
            }, function(res) {
                try{
                    pgvSendClick({hottag:'LUBAO.THANKSGIVING.SHARE.TOFRIENDCIRCLE',virtualDomain: 'map.wap.qq.com'});
                }catch(e){}
                $('.share-btn,.share_wx').hide();
                $('.download-btn').show();
                //location.replace('http://mp.weixin.qq.com/s?__biz=MjM5OTM5MjcyMg==&mid=201331111&idx=1&sn=b262142bbdb01b532427e094947c2d79#rd');
            });
        });

        // 分享到微博
        WeixinJSBridge.on('menu:share:weibo', function(argv) {
            WeixinJSBridge.invoke('shareWeibo',{
                "img_url": getImg(),
                "title": getTitle(),
                "content": getTitle()+ '\n' + getDesc() + " " + oUrl+"  ",
                "url":oUrl
            }, function(res) {});
        });
    }, false);