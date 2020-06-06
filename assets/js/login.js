$(function() {
    // ---------------------------- 切换登录和注册的盒子 ------------------------------------
    $('#goto-reg').click(function() {
        $('#login').hide().next().show();
    });

    $('#goto-login').click(function() {
        $('#login').show().next().hide();
    });

    // ---------------------------- 完成注册功能 --------------------------------
    // 1 监听注册表单的提交事件
    $('#register form').on('submit', function(e) {

            // 2 阻止默认行为
            e.preventDefault();
            // 3 获取输入的账号和密码
            var data = $(this).serialize(); // serialize是根据表单项的name属性获取值的，所以这里一定要检查表单项的name属性是否存在，值是否正确
            // console.log(data);
            // 4 ajax提交账号和密码到接口
            $.ajax({
                type: 'POST',
                url: 'http://www.liulongbin.top:3007/api/reguser',
                data: data,
                success: function(res) {
                    // 5 根据接口返回的结果
                    // 5.1 无论成功还是失败，都要给出一个提示
                    layer.msg('注册成功');
                    // 5.2 成功了，显示登录的盒子，隐藏注册的盒子
                    if (res.status === 0) {
                        $('#login').show().next().hide();
                    }
                }
            });

        })
        // ---------------------------- 完成表单验证功能 --------------------------------
    var form = layui.form;
    form.verify({
            len: [/^[\S]{6,12}$/, 'wrong email number'],
            // len: function(val) {
            //     if (val.trim().length < 6 || val.trim().length > 12) {
            //         return 'wrong email number'
            //     }
            // }
            same: function(val) {
                var password = $('.pass').val();
                if (val !== password)
                    return 'password verify faild'
            }
        })
        //登录功能——————————————————————————————————————————————————————
    $('#login form').on('click', function(e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status === 0) {
                    // location.href = '/index.html'
                    layer.msg('登录成功');
                }

            }
        })
    })
});