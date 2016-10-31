/*
    **author: v_zhenzhenwu  2014.11
*/

// 控制声音
$(".music").on("click",function(){
    var audioEle=document.getElementById('audio');
    if(audioEle.paused){
        $(".music").removeClass("music_muted");
        audioEle.play();
    }else{
        $(".music").addClass("music_muted");
        audioEle.pause();
    }
});




// 页面元素动画
function func_animate(idx) {
    
    if (idx == 1) {   //不知从什么时候开始、、、
        setTimeout(function () {
            $('.p1_01').addClass('p1_01_exCss');
        }, 300);
 
        setTimeout(function () {
            $('.p1_02').addClass('p1_02_exCss');
        }, 300);
        setTimeout(function () {
            $('.p1_03').addClass('p1_03_exCss');
        }, 300);
		setTimeout(function () {
            $('.p1_04').addClass('p1_04_exCss');
        }, 700);
 
    }
    if (idx == 2) {
        setTimeout(function () {
            $('.p2_01').addClass('p2_01_exCss');
        }, 300);
 
        setTimeout(function () {
            $('.p2_02').addClass('p2_02_exCss');
        }, 500);
		setTimeout(function () {
            $('.p2_03').addClass('p2_03_exCss');
        }, 500);
        setTimeout(function () {
            $('.p2_04').addClass('p2_04_exCss');
        }, 1100);
 
    }
    if (idx == 3) {  //  厨子
         setTimeout(function () {
            $('.p3_01').addClass('p3_01_exCss');
        }, 300);
 
        setTimeout(function () {
            $('.p3_02').addClass('p3_02_exCss');
        }, 500);
        setTimeout(function () {
            $('.p3_03').addClass('p3_03_exCss');
        }, 900);
    }
 
    if (idx == 4) { 
        setTimeout(function () {
            $('.p4_01').addClass('p4_01_exCss');
        }, 300);
 
        setTimeout(function () {
            $('.p4_02').addClass('p4_02_exCss');
        }, 700);
        setTimeout(function () {
            $('.p4_03').addClass('p4_03_exCss');
        }, 1300);
		setTimeout(function () {
            $('.p4_04').addClass('p4_04_exCss');
        }, 1600);
    }
 }

try{
    window.onbeforeunload = function(){
       var audioEle=document.getElementById('audio');
           audioEle.pause();
    }
}catch(e){}