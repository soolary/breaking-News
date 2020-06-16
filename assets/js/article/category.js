function renderCategory() {
    $.ajax({
        type: "get",
        url: '/my/article/cates',
        success: function(res) {
            // console.log(res);
            var str = template('tpl-category', res);
            $('tbody').html(str);
        }
    })
}

$(function() {
    var addindex;
    var editIndex;
    var form = layui.form;
    renderCategory();
    $('body').on('click', '.delete', function() {
        var id = $(this).attr('data-id');
        layer.confirm('确定删除吗啊?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    console.log(res);

                    layer.msg(res.message);
                    if (res.status === 0) {
                        renderCategory()
                    }
                }

            })
            layer.close(index);
        });
    })
    $('.layui-card-header button').click(function() {
        addindex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加类别',
            content: $('#tpl-add').html(),
        });
    });

    $('body').on('submit', '#add-form', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    renderCategory()
                    layer.close(addindex)
                }
            }
        })
    })
    $('body').on('click', '#edit', function() {
        var data = this.dataset;

        var editIndex = layer.open({
            type: 1,
            title: '编辑类别',
            content: $('#tpl-edit').html(),
            area: ['500px', '250px'],
            success: function() {

                form.val('edit-form', JSON.parse(JSON.stringify(data)));
            }
        });
    });

    $('body').on('submit', '#edit-form', function(e) {
        e.preventDefault();
        var data = $(this).serializeArray();
        data[0].name = 'Id';
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: data,
            success: function(res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    renderCategory()
                    layer.close(editIndex)
                }
            }
        })
    })
})