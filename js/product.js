$(function(){
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    getProduct(theRequest.type,theRequest.id,1);
    // 获取产品
    function getProduct(type,id,page){
        var url ="http://106.12.7.86/getProduct";
        if(type=='typeFirst'){
            var datas={typeFirst:id,page:page};
        }else{
            var datas={typeSecond:id,page:page};
        }
        $.post(url,datas).then(function(res){
            if(res.products.length==0){
                alert("No product!");
            }else{
                $(".right").empty();
                _.forEach(res.products,function(item){
                    var list=`<div class="list">
                                <img src='http://106.12.7.86:${item.imagePath}'>
                                <div class='title'>${item.title}</div>
                                <span style='display: none;'>${item.describle}</span>
                                <img src='http://106.12.7.86:${item.img_f}' alt='' style='display: none;'>
                              </div>    
                                `
                    $(".right").append($(list));            
                })
                $(".list").click(function(){
                    var storage=window.localStorage;
                    storage.clear();
                    var children=$(this).children();
                    var img=$(children[0]).attr("src");
                    var title=$(children[1]).text();
                    var describe=$(children[2]).text();
                    var img_f=$(children[3]).attr("src");
                    var title_f=$(children[4]).text();
                    if(img_f=="http://106.12.7.86:"){
                        storage["img"]=img;
                        storage["title"]=title;
                        storage["describe"]=describe;
                    }else{
                        storage["img"]=img;
                        storage["title"]=title;
                        storage["describe"]=describe;
                        storage["img_f"]=img_f;
                    }
                    location.href="./detail.html";
                });
            }
            function pageChange(i) {
                getProduct(theRequest.type,theRequest.id,i+1)
            }
            /*
             * 初始化插件
             * @param  object:翻页容器对象
             * @param  function:回调函数
             * */
            Pagination.init($(".ht-page"), pageChange);
            /*
            * 首次调用
            * @param  object:翻页容器对象
            * @param  number:当前页
            * @param  number:总页数
            * @param  number:每页数据条数
            * */
            Pagination.Page($(".ht-page"), res.currentPage-1, res.count, 12);
                
                },function(res){    
                    alert("Failed to get products!");
                })
            }    
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
    //获取左边导航数据
    getNavigator().then(function(res){
        for(var i=0;i<res.length;i++){
            //处理空格，因为二级菜单添加的时候会添加到第一个元素名为class的元素中，会导致和导航栏混合，所以重新起名  (原本想法：为了和导航栏不影响（主要是想点击别的时候，把其它的二级菜单隐藏，现在想到方法就是给二级加个class，让这个class隐藏，就和导航栏区分开)
            var idName=res[i].describe.replace(/\s+/g,"_").replace("'", "")+'_left';
            var aLeft='<a href="#" id="'+idName+'" onclick="product(';
            var aCenter="'typeFirst',"+res[i].id;
            var aRight=')">'+res[i].describe+'</li>';
            var a=aLeft+aCenter+aRight;
            var a=$(a);
            $(".first").append(a);
            //加left是为了区分和导航栏，后面点中元素后，显示和它id一样的class的元素
        }
        for(var i=0;i<res.length;i++){
            if(res[i].list.length==0){
            }else{
                for(var j=0;j<res[i].list.length;j++){
                    if(j==0){
                        var className=res[i].list[j].describe.replace(/\s+/g,"_").replace("'", "")+'_left';
                        var divLeft='<div class="second_left '+className+'" style="display:none;"><a href="#" class="all" onclick="product(';
                        var divCenter="'typeFirst',"+res[i].id;
                        var divRight=')">all</a>';
                        var div=divLeft+divCenter+divRight;
                        var div=$(div);
                        $(".second").append($(div));
                    }else{
                        var idName=res[i].list[j].describe.replace(/\s+/g,"_").replace("'", "")+'_left';
                        var aLeft='<a href="#" id="'+idName+'" onclick="product(';
                        var aCenter="'typeSecond',"+res[i].list[j].id;
                        var aRight=')">'+res[i].list[j].describe+'</li>';
                        var a=aLeft+aCenter+aRight;
                        var a=$(a);
                        $('.'+className).append(a);
                    }
                }
            }
        }
        if(theRequest.type=="typeFirst"){
            var arr=_.filter(res,{id:parseInt(theRequest.id)});
            var className=arr[0].describe.replace(/\s+/g,"_").replace("'", "")+'_left';
            $("."+className).show();    
            $("#"+className).attr("class",'active');
            $(".all").attr("class",'all active');
        }
        if(theRequest.type=="typeSecond"){
            _.forEach(res,function(item){
                if(item.list.length!=0){
                    _.forEach(item.list,function(second){
                        if(theRequest.id==second.id){
                            var firstType=item.describe;
                            var secondType=second.describe;
                            var firstId=firstType.replace(/\s+/g,"_").replace("'", "")+'_left';
                            $("."+firstId).show();
                            $("#"+firstId).attr("class",'active');
                            var secondId=secondType.replace(/\s+/g,"_").replace("'", "")+'_left';
                            $("#"+secondId).attr("class",'active');   
                        }
                    })
                }
            })
        }
    },function(res){
        alert("Failed to get product classification!");
    })
})