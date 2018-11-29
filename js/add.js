$(function(){
        getNavigator().then(function(res){
            for(let i=0;i<res.length;i++){
                var content=$('<input type="radio" name="typeFirst" value="'+res[i].id+'"><label>'+res[i].describe+'</label>')
                $(".dongtai").append(content);
                var result=res;
                if(i==res.length-1){
                    $("input[name='typeFirst']").click(function(){
                        $(".dongtaier").empty();
                        var id=parseInt($(this).val());
                        //reject相反
                        var arr=_.filter(res,{id:id});
            
                        for(let j=0;j<arr[0].list.length;j++){
                            if(j==0){

                            }else{
                                var content_second=$('<input type="radio" name="typeSecond" value="'+arr[0].list[j].id+'"><label>'+arr[0].list[j].describe+'</label>');
                                $(".dongtaier").append(content_second);
                            }
                        }
                    })    
                }
            }
        },function(res){
            alert("Failed to get product classification!");
        });
         
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

        var img_main="";
        $('input[name="img"]').on('change', function (event) {
            var files = event.target.files;
	            for (var i = 0, len = files.length; i < len; i++) {
	                var file = files[i];
	                var reader = new FileReader();
	                reader.onload = function (e) {
	                    var img = new Image();
	                    img.src = e.target.result;        
	                    img.onload = function () {  
	                       // 不要超出最大宽度  
	                    var w = Math.min(10000, img.width);  
	                    // 高度按比例计算  
	                    var h = img.height * (w / img.width);  
	                    var canvas = document.createElement('canvas');  
	                    var ctx = canvas.getContext('2d');  
	                    // 设置 canvas 的宽度和高度  
	                    canvas.width = w;  
	                    canvas.height = h;  
	                    ctx.drawImage(img, 0, 0, w, h); 　　　　
	                    var base64 = canvas.toDataURL('image/jpeg',0.3);  
	                    img_main=img_main+base64;                 
	                   }
	                };
                    reader.readAsDataURL(file);
                }
        }); 
            var img_f="";
            $('input[name="img-f"]').on('change', function (event) {
                var files = event.target.files;
	                for (var i = 0, len = files.length; i < len; i++) {
	                    var file = files[i];
	                    var reader = new FileReader();
	                    reader.onload = function (e) {
	                        var img = new Image();
	                        img.src = e.target.result;         
	                        img.onload = function () {  
	                            // 不要超出最大宽度  
	                            var w = Math.min(10000, img.width);  
	                            // 高度按比例计算  
	                            var h = img.height * (w / img.width);  
	                            var canvas = document.createElement('canvas');  
	                            var ctx = canvas.getContext('2d');  
	                            // 设置 canvas 的宽度和高度  
	                            canvas.width = w;  
	                            canvas.height = h;  
	                            ctx.drawImage(img, 0, 0, w, h); 
	        　　　　　　　　　　　　
	                            var base64 = canvas.toDataURL('image/jpeg',0.3);  

	                            img_f=img_f+base64;                       
	                        }
	                    };
                    reader.readAsDataURL(file);
                }
            }); 
    $(".submit").click(function(){
        $(".uploading").show();
    	var title=$("input[name='title']").val();
    	var describe=$("input[name='describe']").val();
    	var typeFirst=$("input[name='typeFirst']:checked").val();
    	var typeSecond=$("input[name='typeSecond']:checked").val();
    	var datas={
    		title:title,
    		describle:describe,
    		typeFirst:typeFirst,
    		typeSecond:typeSecond,
    		img:img_main,
    		img_f:img_f
    	}
        var url="http://106.12.7.86/submitProduct";
    	$.post(url,datas).then(function(res){
            $(".uploading").hide();
            alert("Add product successfully!");
            window.location.reload()
        },function(res){
            $(".uploading").hide();
            alert("Add product failed！");
        })
    })
    $(".add").click(function(){
        var addFirst=$("input[name='addFirst']").val();
        var addSecond=$("input[name='addSecond']").val();
        console.log(addSecond);
        if(addSecond==""){
            var datas={
                addTypeFirst:addFirst
            }
        }else{
            var datas={
                addTypeSecond:addSecond,
                addTypeFirst:addFirst
            }
        }
        var url="http://106.12.7.86/addType";
        $.post(url,datas).then(function(res){
            if(res.code==1031){
                alert("class I Catalog already exists!")
            }else if(res.code==1032){
                alert("class II Catalog already exists!")
            }else if(res.code==1033){
                alert("class I Catalog doesn't exist!")
            }else{
                alert("Add Catalog successfully!");
                window.location.reload()
            }
        },function(res){
            $(".uploading").hide();
            alert("Add Catalog failed！");
        })
    })
})