$(function(){
    $.ajaxPrefilter(function(options){
        console.log(options);
        options.url="http://www.liulongbin.top:3007"+options.url;
        options.complete=function(xhr){
            if(xhr.responseJSON.status=== 1 && xhr.responseJSON.message=='身份认证失败!'){
                localStorage.removeItem('token');
                window.parent.location.href = '/login.html';
            }
        }
        options.headers = {
            'Authorization': localStorage.getItem('token')
        }
    })
})