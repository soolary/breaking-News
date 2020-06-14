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
                url: '/my/update/avatar',
                data: {avatar: dataURL},
                success:function(res){
                    layer.msg(res.message);
                    if(res.status===0){
                        window.parent.getUserInfo();
                    }
                }
            })
    })
})