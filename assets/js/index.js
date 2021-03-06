$(function () {

  getUserInfo();

  var layer = layui.layer;

  $('#btnLogout').on('click', function () {
    layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
      localStorage.removeItem('token');
      location.href = '/login.html';
      layer.close(index);
    })
  })

  console.log($('#nav_top_info'));
  
  // $('#nav_top_info').on('click', function() {
  //   // console.log($('#top_left_user'));
  //   // console.log($('#nav_left_info')[0].click);
  //   // $('#top_left_user').click()
  //   // // $('#nav_left_info')[0].click()
  // })
})


//  获取用户基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function (res) {
      // console.log(res);
      if (res.status !== 0) return layui.layer.msg(res.message);
      layui.layer.msg(res.message);
      renderAvatar(res.data);
    }
    // complete: function (res) {
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     localStorage.removeItem('token');
    //     location.href = '/login.html';
    //   }
    // }
  })
}


//  渲染用户头像
function renderAvatar(user) {
  var name = user.nickname || user.username;
  $('#welcome').html('欢迎&nbsp&nbsp' + name);
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide();
  } else {
    $('.layui-nav-img').hide()
    $('.text-avatar').html(name[0].toUpperCase()).show();
  }
}

