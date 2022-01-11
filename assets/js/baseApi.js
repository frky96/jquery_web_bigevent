//  每次调用ajax发送请求回先调用这个函数

//  这个函数可以传入ajax中的参数

$.ajaxPrefilter(function (params) {
  
  params.url = 'http://www.liulongbin.top:3007' + params.url;

  if (params.url.indexOf('/my/') !== -1) {
    params.headers = {Authorization: localStorage.getItem('token') || ''};
  }

  params.complete = function (res) {
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      localStorage.removeItem('token');
      location.href = '/login.html';
    }
  }

})