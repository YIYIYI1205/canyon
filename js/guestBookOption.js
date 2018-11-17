$(function(){
	getGuuest();
	//获取数据
    function getGuuest(){
        var url="http://106.12.7.86/getMessage";
        $.get(url,{company:1}).then(function(res){
            if(res.length==0){
                $(".noData").show();
            }else{
                for(var i=0;i<res.length;i++){
                	if(res[i].state==1){
                		var list = '<div class="lists"><div class="list">'+res[i].content+'</div><div class="option"><button class="show" data-id="'+res[i].id+'">show</button><button class="unShow" data-id="'+res[i].id+'">hide</button></div><div class="state">show</div>';
                	}else{
                		var list = '<div class="lists"><div class="list">'+res[i].content+'</div><div class="option"><button class="show" data-id="'+res[i].id+'">show</button><button class="unShow" data-id="'+res[i].id+'">hide</button></div><div class="state">hide</div>';
                	}
                    $('.content').prepend($(list));  
                }  
                var title='<div class="title"><div class="one">guest Book</div><div class="two">option</div><div class="three">state</div></div>';
                $('.content').prepend($(title));  
            	$(".show").click(function(){
					var id=$(this).attr("data-id");
					operateMessage(id,1);
				})
				$(".unShow").click(function(){
					var id=$(this).attr("data-id");
					operateMessage(id,0);
				})
            }   
        },function(res){
            alert("Failed to get data!");
        })
    }
    //操作留言
    function operateMessage(id,state){
    	var url="http://106.12.7.86/operateMessage";
    	$.post(url,{id:id,state:state}).then(function(res){
    		alert("Successful operation!");
    		getGuuest();
    	},function(res){
    		alert("operation failed!");
    	})
    }

})