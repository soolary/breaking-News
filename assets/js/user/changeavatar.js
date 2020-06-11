$(function(){
    var $image=$('#image');
    const options ={
        aspectRation:1,
        preview:'.img-preview'

    }
    $image.cropper(options);
    $('button:contains("上传")').click(function(){
        $('#file').trigger('click');
    });
    $('#file').change(function(){
        var fileObj = this.files[0];
        var url = URL.createObjectURL(fileObj);
        $image.cropper('destroy').attr('src', url).cropper(options);

    })
    $('button:contains("确定")').click(function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png');
            $.ajax({
                type: 'POST',
                url: 'http://www.liulongbin.top:3007/my/update/avatar',
                data: {avatar: dataURL},
                success:function(res){
                    layer.msg(res.message);
                    if(res.status===0){
                        window.parent.getUserInfo();
                    }
                },
                headers: {
                    'Authorization': localStorage.getItem('token')
                },
                complete: function (xhr) {
                    if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
                        // 清楚过期的token或者无效的token
                        localStorage.removeItem('token');
                        // 跳转到登录页
                        // window 表示当前的窗口，即repwd.html
                        // window.parent 表示当前窗口的父窗口，即index.html
                        window.parent.location.href = '/login.html';
                    }
                }
            })
    })
})