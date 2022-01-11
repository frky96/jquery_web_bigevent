//  每次调用ajax发送请求回先调用这个函数

//  这个函数可以传入ajax中的参数

$.ajaxPrefilter(function (params) {
  params.url = 'http://www.liulongbin.top:3007' + params.url;
})