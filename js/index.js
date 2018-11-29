    function team(){
        location.href="team.html";
    }
    function home(){
        location.href="index.html";
    }
    function product(type,id){
        location.href="product.html?id="+id+"&type="+type;
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
    function getNavigator(){
        var url="http://106.12.7.86/getNavigator";
        var defer = $.Deferred();
        $.get(url).then(function(res){
            defer.resolve(res);
        },function(res){    
            defer.reject(res);
        })
        return defer;
    }
    getNavigator().then(function(res){
        for(var i=0;i<res.length;i++){
            // 空格替换成下划线
            var className=res[i].describe.replace(/\s+/g,"_");
            var li=`<li class="qita yiji ${className}" onclick="product('typeFirst',${res[i].id})">${res[i].describe}</li>`;
            var liAdd=$(li);
            $(".first_guide").append(liAdd);
        }
        for(var i=0;i<res.length;i++){
            if(res[i].list.length==0){

            }else{
                for(var j=0;j<res[i].list.length;j++){
                    if(j==0){
                        var className=res[i].list[j].describe.replace(/\s+/g,"_");
                        $("."+className).addClass("relative_guide");
                        var ul='<ul class="second_guide" id="'+className+'" style="display: none;"></ul>';
                        $("."+className).append($(ul));
                    }else{
                        var liSecond=`<li class="erji" onclick="product('typeSecond',${res[i].list[j].id})">${res[i].list[j].describe}</li>`;
                        $('#'+className).append($(liSecond));
                    }
                }
            }
        }
        $(".yiji").mouseover(function(){
            //除了这个一级的二级显示其它都隐藏
            $(this).siblings().children('ul').hide();
            //显示
            $(this).children("ul").show();
            //变成蓝色
            $(this).addClass("active_guide");
            //其它颜色去掉
            $(this).siblings().removeClass("active_guide");
            //二级颜色去掉
            $(".erji").addClass("erji");
            //因为active_guide会把所有文字都变成有颜色的
            $(".erji").removeClass("active_guide");
        });
        $(".erji").mouseover(function(){
            //erji是白色
            $(this).removeClass("erji");
            //因为active_guide会把所有文字都变成有颜色的
            $(this).siblings().removeClass("active_guide");
            $(this).siblings().addClass("erji");
        })
        $(".erji").mouseleave(function(){
            //为什么没有作用！只能在下面才有用！
            // $(".second_guide").hide();
            $(this).addClass("erji");
        })            
    },function(res){
        alert("Failed to get product classification!");
    })
    // 关于导航栏这太坑了 
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
    //可以用模糊查询 以后再写吧
    $(".searchSubmit").click(function(){
        var title=$("input").val();
        var secondArr=[];
        getNavigator().then(function(res){
            _.forEach(res,function(item){
                if(item.list.length!=0){
                    _.forEach(item.list,function(arr){
                        secondArr.push(arr);
                    })
                }
            })
            var secondType=_.find(secondArr,{describe:title})
            var firstType=_.find(res,{describe:title})
            if(title=='aboutus'||title=='About'||title=='about'||title=='about us'||title=='About us'||title=="team"||title=="company"){
                location.href="team.html";
            }else if(title=='guest book'||title=='guest'||title=='Guest book'){
                location.href="guest.html";
            }else if(title=='contact us'||title=='Contact us'||title=='tel'||title=='contact'||title=='telephone'||title=='emial'||title=='area'){
                location.href="contact.html";
            }else if(firstType!=undefined){
                location.href="product.html?id="+firstType.id+"&type=typeFirst";
            }else if(secondType!=undefined){
                location.href="product.html?id="+secondType.id+"&type=typeSecond";
            }else{
                alert("Can't search");
            }
        },function(res){
            alert("Failed to get product classification!")
        })
    })
    // 回车
    $(".input").keypress(function(event){
        if(event.keyCode == 13)      
        {  
            var title=$("input").val();
            var secondArr=[];
            _.forEach(res,function(item){
                if(item.list.length!=0){
                    secondArr.push(item.list)
                }
            })
            var secondType=_.find(secondArr,{describe:title})
            getNavigator().then(function(res){
                var firstType=_.find(res,{describe:title})
                if(title=='aboutus'||title=='About'||title=='about'||title=='about us'||title=='About us'||title=="team"||title=="company"){
                    location.href="team.html";
                }else if(title=='guest book'||title=='guest'||title=='Guest book'){
                    location.href="guest.html";
                }else if(title=='contact us'||title=='Contact us'||title=='tel'||title=='contact'||title=='telephone'||title=='emial'||title=='area'){
                    location.href="contact.html";
                }else if(firstType!=undefined){
                    location.href="product.html?id="+firstType.id+"&type=typeFirst";
                }else if(secondType!=undefined){
                    location.href="product.html?id="+secondType.id+"&type=typeSecond";
                }else{
                    alert("Can't search");
                }
            },function(res){
                alert("Failed to get product classification!")
            })
        }  
    })

    $(".Close").click(function(){
         $(".search").hide();
    })
})    