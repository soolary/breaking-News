var form = layui.form

function renderUser() {
    $.ajax({
        type: 'get',
        url: 'http://www.liulongbin.top:3007/my/userinfo',
        success: function(res) {
            console.log(res);
<<<<<<< HEAD
            if (res.stasus === 0) {
                $('input[name="id"]').val(res.data.id);
                $('input[name-="username"]').val(res.data.username);
                $('input[name="nickname"]').val(res.data.nickname);
                $('input[name="email"]').val(res.data.email);
                // form.val('abc', res.data)
=======
            if (res.status === 0) {
                console.log(123);
                
              //  $('input[name="id"]').val(res.data.id);
              //  $('input[name="username"]').val(res.data.username);
              //  $('input[name="nickname"]').val(res.data.nickname);
              //  $('input[name="email"]').val(res.data.email);
             form.val('abc', res.data)
>>>>>>> user
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
}
$(function() {
    renderUser();
    $('form').on('submit', function(e) {
        e.preventDefault();
<<<<<<< HEAD
        $.ajax({
            type: 'post',
            url: 'http://www.liulongbin.top:3007/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.stasus === 0) {

                }
            }
        })
    })
=======
        var data=$(this).serialize();
        $.ajax({
            type: 'post',
            url: 'http://www.liulongbin.top:3007/my/userinfo',
            data: data,
            success: function(res) {
                console.log(res);
                layer.msg(res.message);
                window.parent.getUserInfo();
            },
            headers:{'authorization':localStorage.getItem('token')},
            complete:function(xhr){
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
    $('button[type="reset"]').click(function (e) {
        // 阻止默认清空表单行为
        e.preventDefault();
        // 恢复成和没改之前一样
        renderUser();
    });
>>>>>>> user
})