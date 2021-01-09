$(function() {
    // alert(1)
    // 点击'去注册账号'的链接
    // 实现登录和注册的按需切换
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('http://api-breakingnews-web.itheima.net/api/reguser', data,
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录')
                $('#link_login').click()
            })
    })
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('#form_login [name=username]').val(),
            password: $('#form_login [name=password]').val()
        }
        $.ajax({
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            method: 'POST',
            data,
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.alert(res.message)
                }
                layer.alert(res.message)
                localStorage.setItem('token', res.token)
                location.href = './index.html'
            }

        })
    })
})