$(function(){
	
    // $.get(url,function(res){
    //     var str=res.split("{}")[0];
    //     str=str.slice(1,str.length-1);
    //     str=$.parseJSON(str);
    //     // console.log(str);
    //     var first=str.first;
    //     var second=str.second;
    //     for(var i=0;i<first.length;i++){
    //         var content=$('<input type="radio" name="typeFirst" value="'+first[i]+'"><label>'+first[i]+'</label>')
    //         $(".dongtai").append(content);
    //     }
        
    //     $("input[name='typeFirst']").click(function(){
    //     	var typeFirst=$(this).val();
    //     	// console.log(typeFirst); 
    //     	$(".dongtaier").empty();
    //     	for(var i=0;i<second.length;i++){
	   //          // if(typeFirst==second[i][0]){
	   //          //     for(var j=1;j<second[i].length;j++){
	   //          //     	var content_second=$('<input type="radio" name="typeSecond" value="'+second[i][j]+'"><label>'+second[i][j]+'</label>');
	   //          //     	$(".dongtaier").append(content);
	   //          //     }
	   //          // }
	   //          // console.log(second[i][0])
	   //          if(typeFirst==second[i][0]){
	   //          	for(var j=1;j<second[i].length;j++){
	   //          		// console.log(second[i][j]);
	   //          		var content_second=$('<input type="radio" name="typeSecond" value="'+second[i][j]+'"><label>'+second[i][j]+'</label>');
	   //          		$(".dongtaier").append(content_second);
	   //          	}	
	   //          	break;
	   //          }
	            
    //     	}      
    //     })        
    // })
    $(".addFirst").click(function(){
    	$(":radio").val("");
    	$(":radio").attr("disabled","disabled");
    	$("input[name='addFirst']").show();
    })
    $(".addSecond").click(function(){
    	$(":radio").val("");
    	$(":radio").attr("disabled","disabled");
    	$("input[name='addSecond']").show();
    })
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
	        　　　　　　　　　　　　
	                            var base64 = canvas.toDataURL('image/jpeg',0.6);  
	  

	                            img_main=img_main+base64; 
	                            // console.log(img_main);                      
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
	        　　　　　　　　　　　　
	                            var base64 = canvas.toDataURL('image/jpeg',0.6);  

	                            img_f=img_f+base64;                       
	                        }
	                    };
                    reader.readAsDataURL(file);
                }
            }); 
    $(".submit").click(function(){
    	var title=$("input[name='title']").val();
    	var describe=$("input[name='describe']").val();
    	var typeFirst=$("input[name='typeFirst']:checked").val();
    	var typeSecond=$("input[name='typeSecond']:checked").val();
    	var addFirst=$("input[name='addFirst']").val();
    	var addSecond=$("input[name='addSecond']").val();
    	var datas={
    		title:title,
    		describe:describe,
    		typeFirst:typeFirst,
    		typeSecond:typeSecond,
    		addFirst:addFirst,
    		addSecond:addSecond,
    		img:img_main,
    		img_f:img_f
    	}
        console.log(datas);
        var url="http://106.12.7.86/submitProduct";
    	$.post(url,datas).then(function(res){
            console.log(res);
            alert("Add product successfully!");
        },function(res){
            alert("Add product failed！");
        })

    })
})