var form = layui.form

function renderUser() {
    $.ajax({
        type: 'get',
        url: 'http://www.liulongbin.top:3007/my/userinfo',
        success: function(res) {
            console.log(res);
            if (res.stasus === 0) {
                $('input[name="id"]').val(res.data.id);
                $('input[name-="username"]').val(res.data.username);
                $('input[name="nickname"]').val(res.data.nickname);
                $('input[name="email"]').val(res.data.email);
                // form.val('abc', res.data)
            }
        },
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        complete: function(xhr) {
            if (xhr.responseJSON.stasus === 1 && xhr.responseJSON.message === '身份认证失败') {
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
})