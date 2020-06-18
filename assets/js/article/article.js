$(function() {
    var form = layui.form;
    form.render('select');
    var data = {
        pagenum: 1,
        pagesize: 10,
        // cate_id:,
        // state:
    }
    renderArticle()

    function renderArticle() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: data,
            success: function(res) {
                if (res.status === 0) {
                    var str = template('tpl-article', res);
                    $('tbody').html(str)
                }
            }
        })
    }
    $('body').on('click', '.edit', function() {
        var id = $(this).attr('data-id');
        console.log(id);
    })
    $('body').on('click', '.delete', function() {
        var id = $(this).attr('data-id');
        console.log(id);

    })
})