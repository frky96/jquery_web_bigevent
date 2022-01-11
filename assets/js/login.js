$(function () {


  //  login/reg切换
  $('#link_reg').on('click', function () {
    $('.login-box').hide();
    $('.reg-box').show();
  })
  $('#link_login').on('click', function () {
    $('.reg-box').hide();
    $('.login-box').show();
  })


  // 从 layui 中获取 form 对象
  var form = layui.form
  var layer = layui.layer
  // 通过 form.verify() 函数自定义校验规则
  form.verify({
    // 自定义了一个叫做 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致的规则
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息即可
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })


  //  注册
  $('#form_reg').on('submit', function (e) {
    e.preventDefault();
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) return layer.msg(res.message);
      layer.msg('success registered');
      $('#link_login').click();
    })
  })


  //  登录
  $('#form_login').on('submit', function (e) {
    e.preventDefault();

    //  声明一个formdata对象 内部包含全部表单数据
    var formData = new FormData($('#form_login')[0]);

    //  1.将formdate对象转化成对象格式
    var objForm = {};
    for (var key of formData.keys()) {
      objForm[key] = formData.get(key);
    }
    // console.log(objForm);

    //  2.将formdate对象转化成json格式
    jsonForm = JSON.stringify(objForm);
    // console.log(jsonForm);

    //  3.将formdate对象转化成键值对格式
    var arrForm = [];
    for (var pair of formData.entries()) {
      arrForm.push(pair[0] + '=' + pair[1]);
    }
    strForm = arrForm.join('&');
    // console.log(strForm);

    // console.log($('#form_login').serialize());

    //  jq需要上传对象格式的数据 或 键值对格式数据
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $('#form_login').serialize(),  //  键值对格式
      // data: strForm,  //  键值对格式
      // data: objForm,  //  对象格式
      success: function (res) {
        if(res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        localStorage.setItem('token', res.token);
        location.href = '/index.html';
      }
    })
  })













})