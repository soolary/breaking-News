$(function() {
    var id = window.location.search.slice(1).split('=')[1]
    var form = layui.form;
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function(res) {
            console.log(res);

            var str = template('tpl-category', res)
            $('select').html(str)
            form.render('select');
            $.ajax({
                url: '/my/article/' + id,
                success: function(res) {
                    form.val('edit-form', res.data)
                    $image.cropper('destroy').attr('src', 'http://www.liulongbin.top:3007' + res.data.cover_img).cropper(options)
                    initEditor()
                }
            })
        }
    });


    var $image = $('#image');
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview',
        autoCropArea: 1
    }
    $image.cropper(options);
    $('.image-btn').click(function() {
        $('#file').click()
    })
    $('#file').change(function() {
        var fileObj = this.files[0];
        var url = URL.createObjectURL(fileObj);
        $image.cropper('destroy').attr('src', url).cropper(options)
    })
    var s = '已发布';
    $('button:contains("存为草稿")').click(function() {
        s = '草稿'
    });
    $('button:contains("发布")').click(function() {
        s = '已发布'
    });
    $('form').on('submit', function(e) {
        e.preventDefault();
        var data = new FormData(this);
        data.append('state', s);
        data.append('Id', id)
        data.set('content', tinyMCE.activeEditor.getContent())
        var canvas = $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        });
        canvas.toBlob((blob) => {
            data.append('cover_img', blob);
            // for (let ele of data) {
            //     console.log(ele);
            // }
            $.ajax({
                type: 'POST',
                url: '/my/article/edit',
                data: data,
                contentType: false,
                processData: false,
                success: function(res) {
                    layer.msg(res.message);
                    console.log(res);

                    if (res.status === 0) {
                        location.href = '/article/article.html';
                    }
                }
            })
        })

    })
})