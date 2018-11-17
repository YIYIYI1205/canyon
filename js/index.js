    function team(){
        location.href="team.html";
    }
    function home(){
        location.href="index.html";
    }
    function product(product){
        location.href="product.html?product="+product;
        event.stopPropagation();
    }
    function guest(){
         location.href="guest.html";
    }
    function contact(){
         location.href="contact.html";
    }
$(function(){
    //获取导航
    var url="http://106.12.7.86/getNavigator";
    $.get(url).then(function(res){
        console.log(res);
    },function(res){
        alert("Failed to get product classification!");
    })
    // $.get(url,function(res){
    //     console.log(res);
    //     var str=res.split("{}")[0];
    //     str=str.slice(1,str.length-1);
    //     str=$.parseJSON(str);
    //     console.log(str);
    //     var first=str.first;
    //     var second=str.second;
    //     for(var i=0;i<first.length;i++){
    //         // 空格替换成下划线(太机智了！)
    //         var className=first[i].replace(/\s+/g,"_");
    //         // var space=first[i].indexOf(" ");
            
    //         // if(space!= -1){
    //         //     var className=first[i].substring(0,space);
    //         // }else{
    //         //     var className=first[i];
    //         // }
    //         //我简直是天才(完美解决各种问题！)
    //         var liLeft='<li class="qita yiji '+className+'" onclick="product(';
    //         var liCenter="'"+first[i]+"'";
    //         var liRight=')">'+first[i]+'</li>';
    //         var li=liLeft+liCenter+liRight;
    //         var liAdd=$(li);
    //         $(".first_guide").append(liAdd);
    //     }       
        
    //     for(var i=0;i<second.length;i++){
    //         for(var j=0;j<second[i].length;j++){
    //             if(j==0){
    //                 // var space=second[i][j].indexOf(" ");
    //                 // if(space!= -1){
    //                 //     var className=second[i][j].substring(0,space);
    //                 // }else{
    //                 //     var className=second[i][j];
    //                 // }
    //                 var className=second[i][j].replace(/\s+/g,"_");
    //                 $("."+className).addClass("relative_guide");
    //                 var ul='<ul class="second_guide" id="'+className+'" style="display: none;"></ul>';
    //                 $("."+className).append($(ul));
    //             }else{
    //                 // var space=second[i][j].indexOf(" ");
    //                 // if(space!= -1){
    //                 //     var classNameSecond=second[i][j].substring(0,space);
    //                 // }else{
    //                 //     var classNameSecond=second[i][j];
    //                 // }
                    
    //                 var liLeftSecond='<li class="erji" onclick="product(';
    //                 var liCenterSecond="'"+second[i][j]+"'";
    //                 var liRightSecond=')">'+second[i][j]+'</li>';
    //                 var liSecond=liLeftSecond+liCenterSecond+liRightSecond;
    //                 $('#'+className).append($(liSecond));
    //             }
    //         }
    //     }
    //     //这个竟然必须放在这里才能有作用！！！
    //     $(".yiji").mouseover(function(){
    //         //除了这个一级的二级显示其它都隐藏
    //         $(this).siblings().children('ul').hide();
    //         //显示
    //         $(this).children("ul").show();
    //         //变成蓝色
    //         $(this).addClass("active_guide");
    //         //其它颜色去掉
    //         $(this).siblings().removeClass("active_guide");
    //         //二级颜色去掉
    //         $(".erji").addClass("erji");
    //         //因为active_guide会把所有文字都变成有颜色的
    //         $(".erji").removeClass("active_guide");
    //     });
    //     $(".erji").mouseover(function(){
    //         //erji是白色
    //         $(this).removeClass("erji");
    //         //因为active_guide会把所有文字都变成有颜色的
    //         $(this).siblings().removeClass("active_guide");
    //         $(this).siblings().addClass("erji");
    //     })
    //     $(".erji").mouseleave(function(){
    //         //为什么没有作用！只能在下面才有用！
    //         // $(".second_guide").hide();
    //         $(this).addClass("erji");
    //     })        
    // })

//关于导航栏这太坑了	
    $(".product_guide").mouseover(function(){
		$(".first_guide").show();
    })
    $(".first_guide").mouseleave(function(){
    	$(".first_guide").hide();
        $(".second_guide").hide();
        $(".first_guide").children().removeClass("active_guide");
    })
    $(".hideQita").mouseover(function(){
    	$(".first_guide").hide();
        $(".second_guide").hide();
    })
    $("#search").click(function(){
        $(".search").show();
    })
    $(".searchSubmit").click(function(){
        var title=$("input").val();
        if(title=='aboutus'||title=='About'||title=='about'||title=='about us'||title=='About us'||title=="team"||title=="company"){
            location.href="team.html";
        }else if(title=='hot'||title=='beach shorts'||title=='shorts wears'||title=='pants'||title=='swimming wears'||title=='knit wears'||title=='others'||title=="men's shorts"||title=="women's shorts"||title=="kids shorts"){
            location.href="product.html?product="+title;
        }else if(title=='guest book'||title=='guest'||title=='Guest book'){
            location.href="guest.html";
        }else if(title=='contact us'||title=='Contact us'||title=='tel'||title=='contact'||title=='telephone'||title=='emial'||title=='area'){
            location.href="contact.html";
        }else{
            alert("Can't search");
        }
    })
    // 回车
    $(".input").keypress(function(event){
        if(event.keyCode == 13)      
        {  
            var title=$("input").val();
            if(title=='aboutus'||title=='About'||title=='about'||title=='about us'||title=='About us'||title=="team"||title=="company"){
                location.href="team.html";
            }else if(title=='hot'||title=='beach shorts'||title=='shorts wears'||title=='pants'||title=='swimming wears'||title=='knit wears'||title=='others'||title=="men's shorts"||title=="women's shorts"||title=="kids shorts"){
                location.href="product.html?product="+title;
            }else if(title=='guest book'||title=='guest'||title=='Guest book'){
                location.href="guest.html";
            }else if(title=='contact us'||title=='Contact us'||title=='tel'||title=='contact'||title=='telephone'||title=='emial'||title=='area'){
                location.href="contact.html";
            }else{
                alert("Can't search");
            }
        }  
    })

    $(".Close").click(function(){
         $(".search").hide();
    })
})


