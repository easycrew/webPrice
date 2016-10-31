// 页面元素动画
function func_animate(idx) { 
    if (idx == 1) {  
        $("#p1 .content-wrap").addClass("p1-animate"); 
    } 
    if (idx == 2) {  
        $("#p2 .content-wrap").addClass("p2-animate"); 
    }
    if (idx == 3) {  
        $("#p3 .content-wrap").addClass("p3-animate"); 
    }
    // if (idx == 2) {
    //     setTimeout(function () {
    //         $('.p2_top').fadeIn(500);
    //     }, 500);
    //     setTimeout(function () {
    //         var p2Name = setInterval('p2Circle.animation()', 28);
    //     }, 900);
    //     setTimeout(function () {
    //         $('.p2_ms').fadeIn('slow');
    //         $('.p2_ms').addClass('p2_ms_exCss');
    //     }, 1300);
    //     setTimeout(function () {
    //         $('.p2_bot').addClass('new_exCss').css('opacity','1');
    //     }, 2100);
 
    // }  
    // if (idx == 13) {
    //     setTimeout(function () {
    //         $('.p13_logo').addClass('p13_circle_exCss');
    //     }, 500);
    //     setTimeout(function () {
    //         $('.p13_d1').fadeIn('slow');
    //     }, 1000);
    //     setTimeout(function () {
    //         $('.p13_d2').fadeIn('slow');
    //     }, 2000);
    //     setTimeout(function () {
    //         $('.p13_d3').fadeIn('slow');
    //     }, 3000);
        
    //     $('.share-btn').on('click',function(){
    //         //分享按钮点击量
    //         pgvSendClick({hottag:'LUBAO.THANKSGIVING.INDEX.SHAREBTN',virtualDomain: 'map.wap.qq.com'});
    //         $('.share_wx').fadeIn();
    //     })
    //     $('.download-btn').on('click',function(){
    //         //下载按钮点击量
    //         pgvSendClick({hottag:'LUBAO.THANKSGIVING.INDEX.DOWNLOADBTN',virtualDomain: 'map.wap.qq.com'});
    //         location.replace('http://map.qq.com/lubao');
    //     })
    //     $('.share_wx').on('click',function(){
    //         $(this).fadeOut();
    //         $('.share-btn').hide();
    //         $('.download-btn').show();
    //     })
    // }
} 