var mask,dialog;  
$(function(){
  var h='<div><div>'+
    '<div class="mask" id="mask" style="display:none;"></div>'+
    '<div class="transmitDialog" id="transmitDialog" style="display:none">'+
    '<p>'+
    '微信浏览器可能无法自动安装。<br>'+
    '请点击右上角“...”按钮，<br>' +
    '选择“在浏览器打开”。</p>'+
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
   

