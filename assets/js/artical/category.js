$(function(){
    renderCategory();
    function renderCategory (){
        $.ajax({
            type:"get",
            url:'/my/article/cates',
            success:function(res){
                var str=template('tpl-category',res);
                $('tbody').html(str);
            }
        })
    }
})