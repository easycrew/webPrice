var mask,dialog;  
$(function(){
  var h='<div><div>'+
    '<div class="mask" id="mask" style="display:none;"></div>'+
    '<div class="transmitDialog" id="transmitDialog" style="display:none">'+
    '<p>'+
    '分享给朋友，<br>'+ 
    '一起来赚红包吧。</p>'+
    '<i class="arrows"></i>'+
    '</div></div></div>';

  $('body').append(h)

  mask = $('#mask');
  dialog = $('#transmitDialog');  
  mask.on('click',function(e){
    mask.hide();
    dialog.hide();
  });

  window.onload = function(){
    var con= $('div.con');
    con.height(Math.max(con.height(), ($(window).height() - 32)));
  }
});
function wxShow(){       
   mask.show();
   dialog.show();
}
   

