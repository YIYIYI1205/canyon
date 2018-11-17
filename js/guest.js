$(function(){
    getGuuest();
	//获取数据
    function getGuuest(){
        //先把原来的清空
        $('.guestList').empty();
        var url="http://106.12.7.86/getMessage";
        $.get(url,{company:0}).then(function(res){
            if(res.length==0){
                $(".noData").show();
            }else{
                for(var i=0;i<res.length;i++){
                    var li = $('<li>'+res[i].content+'</li>');
                    $('.guestList').prepend(li);  
                }   
            }   
        },function(res){
            alert("Failed to get data!");
        })
    }
    //点击提交
    $("#submit").click(function(){
        console.log($("textarea").val());
        var guest=$("textarea").val();
        if(guest!=""){
            var url="http://106.12.7.86/sendMessage";
            $.post(url,{content:guest}).then(function(res){
                alert("Submit a message successfully!");
                $("textarea").val('');;
                getGuuest();
            },function(res){
                alert("Failed to submit message!");
            })   
        }else{
            alert("Message cannot be empty!");
        }
    })  
    /*
     * 定义回掉函数
     * @param  number:跳转页
     * */
    function pageChange(i) {
        Pagination.Page($(".ht-page"), i, 10000, 10);
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
    Pagination.Page($(".ht-page"), 0, 10000, 10);
})