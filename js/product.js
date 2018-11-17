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
    var type=theRequest.product;
    console.log(type);
    //获取左边导航数据
    var url="../api/guide.php"
    $.get(url,function(res){
        var str=res.split("{}")[0];
        str=str.slice(1,str.length-1);
        str=$.parseJSON(str);
        var first=str.first;
        var second=str.second;
        console.log(str);  
        for(var i=0;i<first.length;i++){
            //处理空格，因为二级菜单添加的时候会添加到第一个元素名为class的元素中，会导致和导航栏混合，所以重新起名  (原本想法：为了和导航栏不影响（主要是想点击别的时候，把其它的二级菜单隐藏，现在想到方法就是给二级加个class，让这个class隐藏，就和导航栏区分开)
            var idName=first[i].replace(/\s+/g,"_")+'_left';
            
            var aLeft='<a href="#" id="'+idName+'" onclick="product(';
            var aCenter="'"+first[i]+"'";
            var aRight=')">'+first[i]+'</li>';
            var a=aLeft+aCenter+aRight;
            var a=$(a);
            $(".first").append(a);
            //加left是为了区分和导航栏，后面点中元素后，显示和它id一样的class的元素
        }
        for(var i=0;i<second.length;i++){
            for(var j=0;j<second[i].length;j++){
                if(j==0){
                    var className=second[i][j].replace(/\s+/g,"_")+'_left';
                    var divLeft='<div class="second_left '+className+'" style="display:none;"><a href="#" class="all" onclick="product(';
                    var divCenter="'"+second[i][j]+"'";
                    var divRight=')">all</a>';
                    var div=divLeft+divCenter+divRight;
                    var div=$(div);
                    $(".second").append($(div));
                }else{
                    var idName=second[i][j].replace(/\s+/g,"_")+'_left';
                    var aLeft='<a href="#" id="'+idName+'" onclick="product(';
                    var aCenter="'"+second[i][j]+"'";
                    var aRight=')">'+second[i][j]+'</li>';
                    var a=aLeft+aCenter+aRight;
                    var a=$(a);
                    $('.'+className).append(a);
                }
            }
        }
        //type把颜色显示出来
        var type_left=type.replace(/\s+/g,"_")+'_left';
        var check=$("#"+type_left);
        // 把这个元素颜色改成选中
        check.addClass("active");
        // 判断是一级分类还是二级分类
        var parentType=check.parent().attr("class");
        //一级分类，显示二级并且all变成红色
       
        
        if(parentType=="first"){ 
            //把二级分类显示出来
            $("."+type_left).show();
            $(".all").addClass("active");
        }else{
            //找它的一级分类
            var parentClass=check.parent().attr("class");  
            var num=parentClass.indexOf(" ");
            var className=parentClass.substring(num+1,parentClass.length);
            //显示二级并让一级变色
            $("."+className).show();
            $("#"+className).addClass("active");
        }




    })
    var datas={
        type:type,
        page:1
    }
    //获取产品数据
    var url="../api/product.php"
    $.post(url,datas,function(res){
        console.log(res);
    },"json")
  //   var hot=$("<div class='list'><img src='../images/hot/1.jpg'><div class='title'>CYM0001</div><span style='display: none;'>Men's Hybrid Shorts, satin microfibre ,pigment print with heavy enzyme wash</span><img src='../images/men/1(f).jpg' alt='' style='display: none;'><span style='display: none'>CYM0002</span></div><div class='list'><img src='../images/hot/3.jpg'><div class='title'>CYM0003</div><span style='display: none;'>Men's  Beach Shorts, 100%cotton</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/hot/5.jpg'><div class='title'>CYM0005</div><span style='display: none;'>Men's Board Shorts, 4way stretch fabric, sublimation print</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/hot/9.jpg'><div class='title'>CYM0009</div><span style='display: none;'>Men's Board Shorts, satin microfibre, pigment print , with vintage wash</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/hot/18.jpg'><div class='title'>CYM0018</div><span style='display: none;'>Men's Board Shorts, 90%polyester, 10% spandex, water proof</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/hot/25(f).jpg'><div class='title'>CYM0026</div><span style='display: none;'>Men's Beach Shorts, cotton-nylon-elastane, garment dye</span><img src='../images/men/25.jpg' alt='' style='display: none;'><span style='display: none'>CYM0025</span></div><div class='list'><img src='../images/hot/34.jpg'><div class='title'>CYW0034</div><span style='display: none;'>Women's Beach Shorts, satin microfibre, soft handfeeling</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/hot/36.jpg'><div class='title'>CYW0036</div><span style='display: none;'>Women's Board Shorts,  twill microfibre with press print</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/hot/73.jpg'><div class='title'>CYM0073</div><span style='display: none;'>Men's Beach Shorts, cotton-nylon, pigment print with vintage wash</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/hot/83.jpg'><div class='title'>CYM0083</div><span style='display: none;'>Men's Board Shorts, 4 way stretch, pigment dye</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/hot/93.jpg'><div class='title'>CMY0093</div><span style='display: none;'>Men's Board Shorts, satin microfibre with gradient print</span><img src='../images/men/93(f).jpg' alt='' style='display: none;'><span style='display:none;'>CYM0094</span></div><div class='list'><img src='../images/hot/100.jpg'><div class='title'>CYM0100</div><span style='display: none;'>Men's  Board Shorts, high density 4 way stetch fabric</span><img src='../images/men/100(f).jpg' alt='' style='display: none;'><span style='display: none'>CYM0101</span></div><div class='list'><img src='../images/hot/103.jpg'><div class='title'>CYM0103</div><span style='display: none;'>Men's Board Shorts, cotton, polyester, elastane</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/hot/1.jpg'><div class='title'>CYM0105</div><span style='display: none;'>Men's Board Shorts, cotton, polyester, elastane</span><img src='' alt='' style='display: none;'></div>");
  //   var men_shorts=$("<div class='list'><img src='../images/men/1.jpg'><div class='title'>CYM0001</div><span style='display: none;'>Men's Hybrid Shorts,satin microfibre,pigment print with heavy enzyme wash</span><img src='../images/men/1(f).jpg' style='display: none;'><span style='display: none'>CYM0002</span></div><div class='list'><img src='../images/men/3.jpg'><div class='title'>CYM0003</div><span style='display: none;'>Men's Beach Shorts, 100%cotton</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/4.jpg'><div class='title'>CYM0004</div><span style='display: none;'>Men's Board Shorts, 90%polyester, 10% spandex</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/5.jpg'><div class='title'>CYM0005</div><span style='display: none;'>Men's Board Shorts, 4way stretch fabric, sublimation print</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/6.jpg'><div class='title'>CYM0006</div><span style='display: none;'>Men's Board Shorts, polyester-spandex fabric</span><img style='display: none;'></div><div class='list'><img src='../images/men/7.jpg'><div class='title'>CYM0007</div><span style='display: none;'>Men's Beach Shorts, nylon taslon with coating</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/8.jpg'><div class='title'>CYM0008</div><span style='display: none;'>Men's Board Shorts, 100% polyester, quick dry fabric</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/9.jpg'><div class='title'>CYM0009</div><span style='display: none;'>Men's Board Shorts, satin microfibre, pigment print , with vintage wash</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/10.jpg'><div class='title'>CYM0010</div><span style='display: none;'>Men's Hybrid Shorts, polyester-cotton-elastane, 2 way stretch</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/12.jpg'><div class='title'>CYM0012</div><span style='display: none;'>Bermuda Men's Shorts, satin microfibre, sublimation print</span><img src='../images/men/12(f).jpg' style='display: none;'><span style='display: none'>CYM0013</span></div><div class='list'><img src='../images/men/14.jpg'><div class='title'>CYM0014</div><span style='display: none;'>Men's Board Shorts, 100% polyester, quick dry fabric</span><img src='../images/men/14(f).jpg' style='display: none;'><span style='display: none'>CYM0017</span></div><div class='list'><img src='../images/men/15.jpg'><div class='title'>CYM0015</div><span style='display: none;'>Men's Board Shorts, satin microfibre, gradient sublimation print</span><img src='../images/men/15(f).jpg' style='display: none;'><span style='display: none;'>CMY0098</span></div><div class='list'><img src='../images/men/16.jpg'><div class='title'>CYM0016</div><span style='display: none;'>Bermuda Men's Shorts, 100%polyester, quick dry fabric</span><img src='../images/men/16(f).jpg' style='display: none;'><span style='display: none'>CYM0076</span></div><div class='list'><img src='../images/men/18.jpg'><div class='title'>CYM0018</div><span style='display: none;'>Men's Board Shorts, 90%polyester, 10% spandex, water proof</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/23.jpg'><div class='title'>CYM0023</div><span style='display: none;'>Men's Beach Shorts, 100% nylon</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/25.jpg'><div class='title'>CYM0025</div><span style='display: none;'>Men's Beach Shorts, cotton-nylon-elastane, garment dye</span><img src='../images/men/25(f).jpg' style='display: none;'><span style='display: none'>CYM0026</span></div><div class='list'><img src='../images/men/28.jpg'><div class='title'>CYM0028</div><span style='display: none;'>Men's Board Shorts, satin microfibre, sublimation print</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/31.jpg'><div class='title'>CYM0031</div><span style='display: none;'>Men's Hybrid Shorts, twill microfibre</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/32.jpg'><div class='title'>CYM0032</div><span style='display: none;'>Men's Board Shorts, diamond dobby fabric</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/70.jpg'><div class='title'>CYM0070</div><span style='display: none;'>Men's Board Shorts, 100%polyester, quick dry fabric, digital print</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/71.jpg'><div class='title'>CYM0071</div><span style='display: none;'>Men's Board Shorts, satin microfibre</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/72.jpg'><div class='title'>CYM0072</div><span style='display: none;'>Bermuda Men's Shorts, 100% polyester, quick dry fabric</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/73.jpg'><div class='title'>CYM0073</div><span style='display: none;'>Men's Beach Shorts, cotton-nylon, pigment print with vintage wash</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/74.jpg'><div class='title'>CYM0074</div><span style='display: none;'>Men's Beach Shorts, nylon-cotton, garment dye</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/78.jpg'><div class='title'>CYM0078</div><span style='display: none;'>Men's Beach Shorts, plain microfibre, quick dry fabric</span><img src='../images/men/78(f).jpg' style='display: none;'><span style='display:none;'>CMY0099</span></div><div class='list'><img src='../images/men/79.jpg'><div class='title'>CYM0079</div><span style='display: none;'>Men's Beach Shorts, satin microfibre, solid colour</span><img src='../images/men/79(f).jpg' style='display: none;'><span style='display: none'>CYM0104</span></div><div class='list'><img src='../images/men/80.jpg'><div class='title'>CYM0080</div><span style='display: none;'>Men's Beach Shorts, twill microfibre, peach brushy</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/83.jpg'><div class='title'>CYM0083</div><span style='display: none;'>Men's Board Shorts, 4 way stretch, pigment dye</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/86.jpg'><div class='title'>CYM0086</div><span style='display: none;'>Men's  beach shortss, twill microfibre</span><img src='../images/men/86(f).jpg' style='display: none;'><span style='display: none'>CYM0088</span></div><div class='list'><img src='../images/men/87.jpg'><div class='title'>CYM0087</div><span style='display: none;'>Men's  beach mma, 75%cotton,25%nylon</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/89.jpg'><div class='title'>CYM0089</div><span style='display: none;'>Men's beach mma, nylon-cotton fabric , garment dye</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/91.jpg'><div class='title'>CYM0091</div><span style='display: none;'>Men's Sport Shorts, 4 way stretch fabric</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/92.jpg'><div class='title'>CYM0092</div><span style='display: none;'>Hybrid Shorts, high density polyester-spandex</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/93.jpg'><div class='title'>CYM0093</div><span style='display: none;'>Men's Board Shorts, satin microfibre with gradient print</span><img src='../images/men/93(f).jpg' style='display: none;'><span style='display: none'>CYM0094</span></div><div class='list'><img src='../images/men/95.jpg'><div class='title'>CYM0095</div><span style='display: none;'>Men's Board Shorts, 92%polyester, 8%spandex</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/96.jpg'><div class='title'>CMY0096</div><span style='display: none;'>Men's board Shorts, 100%polyester , pigment print with fading wash</span><img src='../images/men/96(f).jpg' style='display: none;'><span style='display:none;'>CMY0097</span></div><div class='list'><img src='../images/men/100.jpg'><div class='title'>CYM0100</div><span style='display: none;'>Men's Board Shorts, high density 4 way stetch fabric</span><img src='../images/men/100(f).jpg' style='display: none;'><span style='display: none'>CYM0101</span></div><div class='list'><img src='../images/men/102.jpg'><div class='title'>CYM0102</div><span style='display: none;'>Men's Beach Shorts, cotton-elastane with pigment print, vintage wash</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/103.jpg'><div class='title'>CYM0103</div><span style='display: none;'>Men's Board Shorts, cotton, polyester, elastane</span><img src='' style='display: none;'></div><div class='list'><img src='../images/men/105.jpg'><div class='title'>CYM0105</div><span style='display: none;'>Men's Board Shorts, cotton, polyester, elastane</span><img src='' style='display: none;'></div>");
  //   var women_shorts=$("<div class='list'><img src='../images/women/34.jpg'><div class='title'>CYW0034</div><span style='display: none;'>Women's Beach Shorts, satin microfibre, soft handfeeling</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/35.jpg'><div class='title'>CYW0035</div><span style='display: none;'>Women's Board Shorts, plain microfibre, quick dry fabric</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/36.jpg'><div class='title'>CYW0036</div><span style='display: none;'>Women's Board Shorts, twill microfibre with press print</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/37.jpg'><div class='title'>CYW0037</div><span style='display: none;'>Women's Board Shorts, satin microfibre</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/38.jpg'><div class='title'>CYW0038</div><span style='display: none;'>Women's Beach Shorts, 100%polyester, quick dry fabric</span><img src='../images/women/38(f).jpg' alt='' style='display: none;'><span style='display: none;'>CYW0041</span></div><div class='list'><img src='../images/women/39.jpg'><div class='title'>CYW0039</div><span style='display: none;'>Women's Board Shorts, heavy polyester</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/40.jpg'><div class='title'>CYW0040</div><span style='display: none;'>Women's Beach Shorts, 100%polyester, quick dry fabric</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/65.jpg'><div class='title'>CYW0065</div><span style='display: none;'>Women's Beach Shorts, twill microfibre with peach frushy, soft handfeeling</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/66.jpg'><div class='title'>CYW0066</div><span style='display: none;'>Women's Beach Shorts, 100%polyester, digital print</span><img src='../images/women/66.jpg' alt='' style='display: none;'><span style='display: none;'>CYW0110</span></div><div class='list'><img src='../images/women/67.jpg'><div class='title'>CYW0067</div><span style='display: none;'>Women's Beach Shorts, plain microfibre with peach frushy, soft handfeeling</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/77.jpg'><div class='title'>CYW0077</div><span style='display: none;'>Women's Board Shorts, twill microfibre</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/84.jpg'><div class='title'>CYW0084</div><span style='display: none;'>Women's Beach Shorts, double twill microfibre</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/106.jpg'><div class='title'>CYW0106</div><span style='display: none;'>Women's Beach Shorts, 160gsm polyester</span><img src='../images/women/106(f).jpg' alt='' style='display: none;'><span style='display: none;'>CYW0107</span></div><div class='list'><img src='../images/women/108.jpg'><div class='title'>CYW0108</div><span style='display: none;'>Women's Beach Shorts, 130gsm polyester</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/109.jpg'><div class='title'>CYW0109</div><span style='display: none;'>Women's Board Shorts, 130gsm twill microfibre with peach brushy, soft handfeeling</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/111.jpg'><div class='title'>CYW0111</div><span style='display: none;'>Women's Beach Shorts, 115gsm twill microfibre</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/112.jpg'><div class='title'>CYW0112</div><span style='display: none;'>Women's Beach Shorts, 100%polyester, quick dry fabric</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/113.jpg'><div class='title'>CYW0113</div><span style='display: none;'>Women's Beach Shorts, plain microfibre, quick dry</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/114.jpg'><div class='title'>CYW0114</div><span style='display: none;'>Women's Beach Shorts, 100% polyester, quick dry</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/115.jpg'><div class='title'>CYW0115</div><span style='display: none;'>Women's Beach Sorts, 100%polyester, water print</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/129.jpg'><div class='title'>CYW0129</div><span style='display: none;'>Women's Board Shorts, 100gsm plain microfibre, water print</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/130.jpg'><div class='title'>CYW0130</div><span style='display: none;'>Women's Beach Shorts, 130gsm twill microfibre, peach brushy</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/131.jpg'><div class='title'>CYW0131</div><span style='display: none;'>Women's Board Shorts, 100%polyester</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/132.jpg'><div class='title'>CYW0132</div><span style='display: none;'>Women's Beach Shorts, 100%polyester</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/133.jpg'><div class='title'>CYW0133</div><span style='display: none;'>Women's Board Shorts, 100%polyester with peach brushy, soft handfeeling fabric</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/134.jpg'><div class='title'>CYW0134</div><span style='display: none;'>Women's Board Shorts, plain microfibre, quick dry fabric</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/women/135.jpg'><div class='title'>CYW0135</div><span style='display: none;'>Women's Board Shorts, twill microfibre</span><img src='' alt='' style='display: none;'></div>");
  //   var kids_shorts=$("<div class='list'><img src='../images/kids/42.jpg'><div class='title'>CYK0042</div><span style='display: none;'>Boy's Beach Shorts, plain microfibre, quick dry fabric</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/kids/43.jpg'><div class='title'>CYK0043</div><span style='display: none;'>Boy's Beach Shorts, 100gsm 100%polyester, quick dry</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/kids/44.jpg'><div class='title'>CYK0044</div><span style='display: none;'>Boy's Beach Shorts, plain microfibre, quick dry fabric</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/kids/45.jpg'><div class='title'>CYK0045</div><span style='display: none;'>Boy's Beach Sorts, cotton-nylon</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/kids/46.jpg'><div class='title'>CYK0046</div><span style='display: none;'>Kids Beach Shorts, twill microfibre, soft handfeeling</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/kids/47.jpg'><div class='title'>CYK0047</div><span style='display: none;'>Boy's Beach Shorts, twill microfibre</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/kids/48.jpg'><div class='title'>CYK0048</div><span style='display: none;'>Boy's Beach Shorts, twill microfibre</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/kids/57.jpg'><div class='title'>CYK0057</div><span style='display: none;'>Kids Beach Shorts, twill microfibre, peach brushy</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/kids/58.jpg'><div class='title'>CYK0058</div><span style='display: none;'>Kids Beach Shorts, satin microfibre</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/kids/116.jpg'><div class='title'>CYK0116</div><span style='display: none;'>Boy's Beach Shorts, twill microfibre</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/kids/117.jpg'><div class='title'>CYK0117</div><span style='display: none;'>Boy's Beach Shorts, twill microfibre</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/kids/118.jpg'><div class='title'>CYK0118</div><span style='display: none;'>Boy's Beach Shorts,100%polyester, quick dry</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/kids/119.jpg'><div class='title'>CYK0119</div><span style='display: none;'>Boy's Beach Shorts, twill microfibre</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/kids/120.jpg'><div class='title'>CYK0120</div><span style='display: none;'>Kids Beach Shorts, twill microfibre</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/kids/121.jpg'><div class='title'>CYK0121</div><span style='display: none;'>Boy's Board Shorts,100% polyester, quick dry fabric</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/kids/122.jpg'><div class='title'>CYK0122</div><span style='display: none;'>Kids Beach Shorts, nylon-cotton, pigment print with vintage wash</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/kids/123.jpg'><div class='title'>CYK0123</div><span style='display: none;'>Kids Beach Shorts, nylon-cotton, pigment print with enzyme wash</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/kids/124.jpg'><div class='title'>CYK0124</div><span style='display: none;'>Boy's Beach Shorts, nylon-cotton, garment dye</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/kids/125.jpg'><div class='title'>CYK0125</div><span style='display: none;'>Boy's Beach Shorts, 100%nylon</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/kids/42.jpg'><div class='title'>CYK0042</div><span style='display: none;'></span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/kids/136.jpg'><div class='title'>CYK0136</div><span style='display: none;'>Girl's Beach Shorts, 160gsm twill microfibre</span><img src='' alt='' style='display: none;'></div>");
  //   var MMA_shorts=$("<div class='list'><img src='../images/mma/49.jpg'><div class='title'>CYM0049</div><span style='display: none;'>MMA Shorts, satin microfibre</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/mma/50.jpg'><div class='title'>CYM0050</div><span style='display: none;'>MMA Shorts, double twil 4 way stretch fabric</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/mma/51.jpg'><div class='title'>CYM0051</div><span style='display: none;'>MMA Shorts, 92%polyester, 8%nylon</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/mma/126.jpg'><div class='title'>CYM0126</div><span style='display: none;'>MMA Shorts, 160gsm , 90%polyester, 10%spandex</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/mma/127.jpg'><div class='title'>CYM0127</div><span style='display: none;'>MMA Shorts, 100%polyester</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/mma/128.jpg'><div class='title'>CYM0128</div><span style='display: none;'>MMA Shorts, polyester-nylon fabric</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/mma/137.jpg'><div class='title'>CYM0137</div><span style='display: none;'>MMA Shorts, high density 4-way stretch fabric</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/mma/138.jpg'><div class='title'>CYM0138</div><span style='display: none;'>MMA Shorts, 160gsm polyester-spandex fabric</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/mma/139.jpg'><div class='title'>CYM0139</div><span style='display: none;'>MMA Shorts, 4-way stretch fabric</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/mma/140.jpg'><div class='title'>CYM0140</div><span style='display: none;'>MMA Shorts, 95%polyester, 5% spandexf</span><img src='' alt='' style='display: none;'></div>");
  //   var boxing_shorts=$("<div class='list'><img src='../images/boxing/156.jpg'><div class='title'>CYKB0156</div><span style='display: none;'>Kickboxing Pants, diamond pongee</span><img src='../images/boxing/156(f).jpg' alt='' style='display: none;'></div><div class='list'><img src='../images/boxing/157.jpg'><div class='title'>CYKB0157</div><span style='display: none;'>Kickboxing Pants, diamond pongee</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/boxing/158.jpg'><div class='title'>CYKB0158</div><span style='display: none;'>Kickboxing Pants, diamond pongee</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/boxing/159.jpg'><div class='title'>CYKB0159</div><span style='display: none;'>Kickboxing Pants, jacquard pongee</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/boxing/160.jpg'><div class='title'>CYKB0160</div><span style='display: none;'>Kickboxing Pants, jacquard poplin</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/boxing/161.jpg'><div class='title'>CYKB0161</div><span style='display: none;'>Kickboxing Pants, polyester pongee</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/boxing/162.jpg'><div class='title'>CYKB0162</div><span style='display: none;'>Kickboxing Pants, jacquard pongee</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/boxing/163.jpg'><div class='title'>CYKB0163</div><span style='display: none;'>Kickboxing Pants, jacquard pongee</span><img src='' alt='' style='display: none;'></div>");
  //   var track_suits=$("<div class='list'><img src='../images/track/148.jpg'><div class='title'>CYTR0148</div><span style='display: none;'>Track Suits-jacket, high  density nylon taffta</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/track/149.jpg'><div class='title'>CYTR0149</div><span style='display: none;'>Track Suits-jacket, polyester pongee</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/track/150.jpg'><div class='title'>CYTR0150</div><span style='display: none;'>Track Suits-jacket, polyester pongee</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/track/151.jpg'><div class='title'>CYTR0151</div><span style='display: none;'>Track Suits-pants, polyester pongee</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/track/152.jpg'><div class='title'>CYTR0152</div><span style='display: none;'>Track Suits-jacket , polyester pongee</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/track/153.jpg'><div class='title'>CYTR0153</div><span style='display: none;'>Track Suits-pants, polyester pongee</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/track/154.jpg'><div class='title'>CYTR0154</div><span style='display: none;'>Track Suits-jacket, jacquard nylon fabric</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/track/155.jpg'><div class='title'>CYTR0155</div><span style='display: none;'>Track Suits-pants, jacquard nylon fabric</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/track/165.jpg'><div class='title'>CYTR0165</div><span style='display: none;'>Track Suits-pants,4way stretch fabric</span><img src='' alt='' style='display: none;'></div>");
  //   var TKD_uniform=$("<div class='list'><img src='../images/TKD/194.jpg'><div class='title'>CYTK0194</div><span style='display: none;'>TKD Uniform</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/TKD/195.jpg'><div class='title'>CYTK0195</div><span style='display: none;'>TKD Uniform</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/TKD/196.jpg'><div class='title'>CYTK0196</div><span style='display: none;'>TKD Uniform</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/TKD/197.jpg'><div class='title'>CYTK0197</div><span style='display: none;'>TKD Uniform</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/TKD/198.jpg'><div class='title'>CYTK0198</div><span style='display: none;'>TKD Uniform</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/TKD/199.jpg'><div class='title'>CYTD0199</div><span style='display: none;'>Judo Uniform</span><img src='' alt='' style='display: none;'></div>");
  //   var compressions=$("<div class='list'><img src='../images/compressions/141.jpg'><div class='title'>CYCP0141</div><span style='display: none;'>Compression Workout Pants</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/compressions/142.jpg'><div class='title'>CYCP0142</div><span style='display: none;'>Compression Workout Shorts</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/compressions/143.jpg'><div class='title'>CYCP0143</div><span style='display: none;'>Compression Workout Pants</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/compressions/144.jpg'><div class='title'>CYCP0144</div><span style='display: none;'>Compression Workout Shorts</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/compressions/145.jpg'><div class='title'>CYCP0145</div><span style='display: none;'>Compression Cycling Shorts</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/compressions/146.jpg'><div class='title'>CYCP0146</div><span style='display: none;'>Compression Cycling Pants</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/compressions/147.jpg'><div class='title'>CYCP0147</div><span style='display: none;'>Compression Cycling clothes</span><img src='' alt='' style='display: none;'></div>");
  //   var pants=$("<div class='list'><img src='../images/pants/180.jpg'><div class='title'>CYMP0180</div><span style='display: none;'>Men's Pants, twill cotton-elastane</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/pants/182.jpg'><div class='title'>CYMP0182</div><span style='display: none;'>Men's Pants, twill cotton-elastane</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/pants/183.jpg'><div class='title'>CYWP0183</div><span style='display: none;'>Women's Pants, twill cotton-elastane</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/pants/184.jpg'><div class='title'>CYWP0184</div><span style='display: none;'>Women's Pants, twill cotton-elastane</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/pants/185.jpg'><div class='title'>CYMP0185</div><span style='display: none;'>Men's Pants, 100% nylon</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/pants/186.jpg'><div class='title'>CYMP0186</div><span style='display: none;'>Men's Cargo Pants, 100% cotton ,garment dye</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/pants/187.jpg'><div class='title'>CYMP0187</div><span style='display: none;'>Men's Pants, checked cotton-wool</span><img src='' alt='' style='display: none;'></div>");
  //   var swimming_wears=$("<div class='list'><img src='../images/swimming/168.jpg'><div class='title'>CYSW0168</div><span style='display: none;'>Men's Swimming Trunk</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/swimming/169.jpg'><div class='title'>CYSW0169</div><span style='display: none;'>Men's Swimming Trunk</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/swimming/170.jpg'><div class='title'>CYSW0170</div><span style='display: none;'>Men's Swimming Trunk</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/swimming/171.jpg'><div class='title'>CYSW0171</div><span style='display: none;'>Men's Swimming Trunk</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/swimming/172.jpg'><div class='title'>CYSW0172</div><span style='display: none;'>Men's Swimming Trunk</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/swimming/173.jpg'><div class='title'>CYSW0173</div><span style='display: none;'>Men's Swimming Trunk</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/swimming/175.jpg'><div class='title'>CYSW0175</div><span style='display: none;'>Men's Swimming Trunk</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/swimming/176.jpg'><div class='title'>CYRG0176</div><span style='display: none;'>Rash Guard</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/swimming/177.jpg'><div class='title'>CYRG0177</div><span style='display: none;'>Rash Guard</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/swimming/178.jpg'><div class='title'>CYRG0178</div><span style='display: none;'>Rash Guard</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/swimming/179.jpg'><div class='title'>CYRG0179</div><span style='display: none;'>Rash Guard</span><img src='' alt='' style='display: none;'></div>\n");
  //   var knit_wears=$("<div class='list'><img src='../images/knit/188.jpg'><div class='title'>CYTE0188</div><span style='display: none;'>Men's Tee, 100% cotton single jersy brushed</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/knit/189.jpg'><div class='title'>CYTE0189</div><span style='display: none;'>Men's Tee, 100% cotton single jersy</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/knit/191.jpg'><div class='title'>CYTT0191</div><span style='display: none;'>Men's Top Tank, CVC with elastane</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/knit/192.jpg'><div class='title'>CYWP0192</div><span style='display: none;'>Mem's Workout Pants, cotton-elastane terry</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/knit/193.jpg'><div class='title'>CYWP0193</div><span style='display: none;'>Men's Workout Pants, cotton-elatance terry</span><img src='' alt='' style='display: none;'></div>");
  //   var others=$("<div class='list'><img src='../images/others/200.jpg'><div class='title'>CYSP0200</div><span style='display: none;'>Sun-proof Jacket</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/others/201.jpg'><div class='title'>CYSP0201</div><span style='display: none;'>Sun-proof Jacket</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/others/203.jpg'><div class='title'>CYBX0203</div><span style='display: none;'>Boxers, yarn dye</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/others/204.jpg'><div class='title'>CYBX0204</div><span style='display: none;'>Boxers, yarn dye</span><img src='' alt='' style='display: none;'></div><div class='list'><img src='../images/others/205.jpg'><div class='title'>CYBX0205</div><span style='display: none;'>Boxers, yarn dye</span><img src='' alt='' style='display: none;'></div>");
  //   var product=theRequest.product;
  //   if(product=="hot"){
  //       $(".hot").append(hot);
  //       $("#hot").attr("class","active");
  //       $(".hot").attr("style","display:block;");
  //   }
  //   if(product=="beach_shorts"){
  //       $(".beach_shorts_add").append(men_shorts);
  //       $(".beach_shorts_add").append(women_shorts);
  //       $(".beach_shorts_add").append(kids_shorts);
  //   	$(".beach_shorts").attr("style","display:block;");
  //   	$("#beach_shorts").attr("class","active");
  //   }
  //   if(product=="men"){
  //       $(".men_shorts_add").append(men_shorts);
  //       $(".men_shorts").show();
  //       $("#beach_shorts").attr("class","active");
  //       $("#men_shorts").attr("class","active");
  //   }
  //   if(product=="women"){
  //       $(".women_shorts_add").append(women_shorts);
  //       $(".women_shorts").show();
  //       $("#beach_shorts").attr("class","active");
  //       $("#women_shorts").attr("class","active");
  //   }
  //    if(product=="kids"){
  //       $(".kids_shorts_add").append(kids_shorts);
  //       $(".kids_shorts").show();
  //       $("#beach_shorts").attr("class","active");
  //       $("#kids_shorts").attr("class","active");
  //   }
  //   if(product=="sports_wears"){
  //       $(".sports_wears_add").append(MMA_shorts);
  //       $(".sports_wears_add").append(boxing_shorts);
  //       $(".sports_wears_add").append(track_suits);
  //       $(".sports_wears_add").append(TKD_uniform);
  //       $(".sports_wears_add").append(compressions);
  //   	$(".sports_wears").attr("style","display:block;");
  //   	$("#sports_wears").attr("class","active");
  //   }
  //   if(product=="MMA"){
  //       $(".MMA_shorts_add").append(MMA_shorts);
  //       $(".MMA_shorts").show();
  //       $("#MMA_shorts").attr("class","active");
  //       $("#sports_wears").attr("class","active");
  //   }
  //   if(product=="boxing"){
  //       $(".boxing_shorts_add").append(boxing_shorts);
  //       $(".boxing_shorts").show();
  //       $("#boxing_shorts").attr("class","active");
  //       $("#sports_wears").attr("class","active");
  //   }
  //   if(product=="track"){
  //       $(".track_suits_add").append(track_suit);
  //       $(".track_suit").show();
  //       $("#track_suit").attr("class","active");
  //       $("#sports_wears").attr("class","active");
  //   }
  //   if(product=="TKD"){
  //       $(".TKD_uniform_add").append(TKD_uniform);
  //       $(".TKD_uniform").show();
  //       $("#TKD_uniform").attr("class","active");
  //       $("#sports_wears").attr("class","active");
  //   }
  //   if(product=="compressions"){
  //       $(".compressions_add").append(compressions);
  //       $(".compressions").show();
  //       $("#compressions").attr("class","active");
  //       $("#sports_wears").attr("class","active");
  //   }
  //   if(product=="pants"){
  //       $(".pants").append(pants);
  //   	$("#pants").attr("class","active");
  //   	$(".pants").attr("style","display:block;");
  //   }
  //   if(product=="swimming_wears"){
  //       $(".swimming_wears").append(swimming_wears);
  //       $("#swimming_wears").attr("class","active");
  //       $(".swimming_wears").attr("style","display:block;");
  //   }
  //   if(product=="knit_wears"){
  //       $(".knit_wears").append(knit_wears);
		// $("#knit_wears").attr("class","active");
		// $(".knit_wears").attr("style","display:block;");
  //   }
  //   if(product=="others"){
  //       $(".others").append(others);
  //   	$(".others").attr("style","display:block;");
  //   	$("#others").attr("class","active");
  //   }
  //   $(".left a").click(function() {
  //       //把未点中的a标签的属性换成空
  //       $(this).siblings("a").attr("class", "");
  //       //把点中的标签的属性换成active
  //       $(this).attr("class", "active");
  //       //获取点中的名字
  //       var id = $(this).attr("id");
  //       //所有的元素中的内容（图片）都清空
  //       // $(".all").attr("style","display:none;");
  //       $(".all").empty();
  //       //二级标签也要隐藏
  //       $(".beach_shorts").hide();
  //       $(".sports_wears").hide();
  //       //获取要添加的属性
  //       var className = '.' + id;
  //       var classNameAdd = '.' + id + '_add';
  //       $(className).attr("style", "display:block;");
  //       if (id == "hot") {
  //           $(classNameAdd).append(hot);
  //       }
  //       if (id == "men_shorts") {
  //           $(classNameAdd).append(men_shorts);
  //       }
  //       if (id == "women_shorts") {
  //           $(classNameAdd).append(women_shorts);
  //       }
  //       if (id == "kids_shorts") {
  //           $(classNameAdd).append(kids_shorts);
  //       }
  //       if (id == "beach_shorts") {
  //           $(classNameAdd).append(men_shorts);
  //           $(classNameAdd).append(women_shorts);
  //           $(classNameAdd).append(kids_shorts);
  //           $(".beach_shorts").show();
  //       }
  //       if (id == "MMA_shorts") {
  //           $(classNameAdd).append(MMA_shorts);
  //       }
  //       if (id == "boxing_shorts") {
  //           $(classNameAdd).append(boxing_shorts);
  //       }
  //       if (id == "track_suits") {
  //           $(classNameAdd).append(track_suits);
  //       }
  //       if (id == "TKD_uniform") {
  //           $(classNameAdd).append(TKD_uniform);
  //       }
  //       if (id == "compressions") {
  //           $(classNameAdd).append(compressions);
  //       }
  //       if (id == "sports_wears") {
  //           $(classNameAdd).append(MMA_shorts);
  //           $(classNameAdd).append(boxing_shorts);
  //           $(classNameAdd).append(track_suits);
  //           $(classNameAdd).append(TKD_uniform);
  //           $(classNameAdd).append(compressions);
  //           $(".sports_wears").show();
  //       }
  //       if (id == "pants") {
  //           $(classNameAdd).append(pants);
  //       }
  //       if (id == "swimming_wears") {
  //           $(classNameAdd).append(swimming_wears);
  //       }
  //       if (id == "knit_wears") {
  //           $(classNameAdd).append(knit_wears);
  //       }
  //       if (id == "others") {
  //           $(classNameAdd).append(others);
  //       }
  //   })
  //   $(".list").click(function(){
  //       var storage=window.localStorage;
  //       storage.clear();
  //       var children=$(this).children();
  //       var img=$(children[0]).attr("src");
  //       var title=$(children[1]).text();
  //       var describe=$(children[2]).text();
  //       var img_f=$(children[3]).attr("src");
  //       var title_f=$(children[4]).text();
  //       storage["img"]=img;
  //       storage["title"]=title;
  //       storage["describe"]=describe;
  //       storage["img_f"]=img_f;
  //       storage["title_f"]=title_f;
  //       location.href="./detail.html";
  //   });
})