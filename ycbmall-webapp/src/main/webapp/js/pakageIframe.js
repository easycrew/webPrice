document.write("<iframe src="" frameborder="0" width="100%" scrolling="yes" id="detailIframe" name="detailIframe" onload="this.height=detailIframe.document.body.scrollHeight"></iframe>");
$.get(mall.url('/commodity/getCommodityDesc'),{commodityId:$.getQuery('commodityId')},function(data){
	$("div.goodsDetail-info-specific iframe").attr('src',data.descriptionUrl)
})

$(window.parent.document).find("#detailIframe").load(function(){
var main = $(window.parent.document).find("#detailIframe");
var thisheight = $(document).height();

main.css('height',thisheight);

});


