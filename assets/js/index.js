$(function() {
    getUserInfo()
    $('#logout').click(function() {
        layer.confirm('are you ok?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function(res) {
            console.log(res);
            // console.log(localStorage.getItem('token'));
            if (res.status === 0) {
                var myname = res.data.nickname || res.data.username;
                $('.myname').text(myname);
                if (res.data.user_pic) {
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();
                    $('.text-avatar').hide()
                } else {
                    var t = myname.substr(0, 1).toUpperCase();
                    $('.layui-nav-img').hide();
                    $('.text-avatar').text(t).css('display', 'inline-block')
                }
            }
        },
        

    })
}