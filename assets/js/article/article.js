$(function() {
    var form = layui.form;
    form.render('select');
    var laypage = layui.laypage;
    var data = {
        pagenum: 1,
        pagesize: 2,
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
                    showPage(res.total)
                }
            }
        })
    }
    $('body').on('click', '.delete', function() {
        var id = $(this).attr('data-id');
        layer.confirm('确定删除吗啊?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                url: '/my/article/delete/' + id,
                success: function(res) {
                    layer.msg(res.message);
                    if (res.status === 0) {
                        location.href = '/article/article.html';
                    }
                }
            })
        })

    })

    function showPage(t) {
        laypage.render({
            elem: 'page', // 注意，这里的 page 是 ID，不用加 # 号
            count: t, // 数据总数
            limit: data.pagesize, // 每页显示多少条
            limits: [2, 3, 4, 5, 6], // 下拉框可设置每页多少条
            curr: data.pagenum, // 当前页
            // groups: 5,
            // prev: '上一篇'
            layout: ['limit', 'prev', 'page', 'next', 'skip', 'count', ],
            jump: function(obj, first) {
                if (first === undefined) {
                    data.pagenum = obj.curr;
                    data.pagesize = obj.limit;
                    renderArticle()
                }
            }
        });
    }

    $.ajax({
        url: '/my/article/cates',
        success: function(res) {
            console.log(res);
            var str = template('tpl-category', res);
            $('#category').html(str)
            form.render()
        }
    })
    $('#search-form').on('submit', function(e) {
        e.preventDefault();
        var p = $(this).serializeArray();
        // console.log(p);

        if (p[0].value) {
            data.cate_id = p[0].value;
        } else {
            delete data.cate_id; // delete 可以删除对象的属性
        }
        // 判断是否选择了状态
        if (p[1].value) {
            data.state = p[1].value;
        } else {
            delete data.state;
        }
        data.pagenum = 1;
        renderArticle()
    })
})