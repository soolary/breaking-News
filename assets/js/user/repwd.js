$(function() {
    var form = layui.form;
    form.verify({
        len: [/^[\S]{6,12}$/, '长度6~12，不能出现空格'],
        diff: function(val) {
            var oldPwd = $('.oldPwd').val();
            if (oldPwd === val) {
                return '新密码不能和原密码相同'
            }
        },
        same: function(val) {
            var newPwd = $('.newPwd').val();
            if (val !== newPwd) {
                return '密码不一致'
            }
        }
    })
<<<<<<< HEAD
    $('form').on('submit', function() {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
=======
    $('form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: 'http://www.liulongbin.top:3007/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                layer.msg(res.message);
                
>>>>>>> user
                if (res.stasus === 0) {
                    $('form')[0].reset();
                }
            },
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            complete: function(xhr) {
<<<<<<< HEAD
                if (xhr.responseJSON.stasus === 1 && xhr.responseJSON.message === '身份认证失败') {
=======
                if (xhr.responseJSON.stasus === 1 && xhr.responseJSON.message === '身份认证失败!') {
>>>>>>> user
                    localStorage.removeItem('token')
                    window.parent.location.href = '/login.html'
                }
            }
        })
    })
})