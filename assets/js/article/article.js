$(function() {
    var form = layui.form;
    form.render('select');
    var data = {
        pagenum: 1,
        pagesize: 5,
        // cate_id:,
        // state:
    }

    function renderArticle() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: data,
            success: function(res) {
                if (res.status === 0) {
                    var str = template('tpl-article', res);
                    $('#tbody').html(str)
                }
            }
        })
    }
})