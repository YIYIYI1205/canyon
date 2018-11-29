$(function(){
    getGuest(1);
	//获取数据
    function getGuest(page){
        //先把原来的清空
        $('.guestList').empty();
        var url="http://106.12.7.86/getMessage";
        $.get(url,{company:0,page:page}).then(function(res){
            if(res.messages.length==0){
                $(".noData").show();
            }else{
                $('.guestList').empty();
                for(var i=0;i<res.messages.length;i++){
                    var li = $('<li>'+res.messages[i].content+'</li>');
                    $('.guestList').prepend(li);  
                } 
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
    //点击提交
    $("#submit").click(function(){
        var guest=$("textarea").val();
        if(guest!=""){
            var url="http://106.12.7.86/sendMessage";
            $.post(url,{content:guest}).then(function(res){
                alert("Submit a message successfully!");
                $("textarea").val('');;
                getGuest(1);
            },function(res){
                alert("Failed to submit message!");
            })   
        }else{
            alert("Message cannot be empty!");
        }
    })  
})