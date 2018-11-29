$(function(){
    var storage=window.localStorage;
	var img = storage["img"];
    var title = storage["title"];
    var describe = storage["describe"];
    var img_f = storage["img_f"];
    var title_f = storage["title_f"];
    describe=describe.split(",");
    $(".title").text(title);
    //没有附图
    if(img_f==undefined){
        $(".single").attr("src",img);
    }else{
        $(".single").attr("style","display:none;");
        $("#myCarousel").attr("style","display:block;");
        $(".little_img").attr("style","display:block;");
        $(".first-slide").attr("src",img);
        $(".one").attr("src",img);
        $(".second-slide").attr("src",img_f);
        $(".two").attr("src",img_f);
    }
    for(var i=0;i<describe.length;i++){
        var h4=$("<h4></h4>").text(describe[i]);
        $(".describe").append(h4);
    }
})