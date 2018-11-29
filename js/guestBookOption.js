$(function(){
	getGuest(1);
	//获取数据
    function getGuest(page){
        var url="http://106.12.7.86/getMessage";
        $.get(url,{company:1,page:page}).then(function(res){
            if(res.length==0){
                $(".noData").show();
            }else{
                $('.guestList').empty();
                for(var i=0;i<res.messages.length;i++){
                	if(res.messages[i].state==1){
                		var list = '<div class="lists"><div class="list">'+res.messages[i].content+'</div><div class="option"><button class="show" data-id="'+res.messages[i].id+'">show</button><button class="unShow" data-id="'+res.messages[i].id+'">hide</button></div><div class="state">show</div>';
                	}else{
                		var list = '<div class="lists"><div class="list">'+res.messages[i].content+'</div><div class="option"><button class="show" data-id="'+res.messages[i].id+'">show</button><button class="unShow" data-id="'+res.messages[i].id+'">hide</button></div><div class="state">hide</div>';
                	}
                    $('.guestList').prepend($(list));  
                }  
                var title='<div class="title"><div class="one">guest Book</div><div class="two">option</div><div class="three">state</div></div>';
                $('.guestList').prepend($(title));  
            	$(".show").click(function(){
					var id=$(this).attr("data-id");
					operateMessage(id,1);
				})
				$(".unShow").click(function(){
					var id=$(this).attr("data-id");
					operateMessage(id,0);
				})
                function pageChange(i) {
                    // Pagination.Page($(".ht-page"), i, res.count, 12);
                    getGuest(i+1);
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
            }   
        },function(res){
            alert("Failed to get data!");
        })
    }

    //操作留言
    function operateMessage(id,state){
    	var url="http://106.12.7.86/operateMessage";
    	$.post(url,{guestId:id,state:state}).then(function(res){
    		alert("Successful operation!");
    		getGuest(1);
    	},function(res){
    		alert("operation failed!");
    	})
    }

})