var user = null;
window.onload = function () {
    getLoginData();
    include("./js/Api.js")
};
function getLoginData() {
    var user = getYouDaUser();
    if (userIsEmpty(user)) {
        document.getElementById("login").innerHTML = "登录";
        document.getElementById("id").innerHTML = "";
        document.getElementById("phone").innerHTML = "";
    } else {
        document.getElementById("login").innerHTML = "注销登录";
        document.getElementById("id").innerHTML = "用户ID" + user.userId + "<br/>";
        document.getElementById("phone").innerHTML = "用户token" + user.token + "<br/>";
    }

}

function toLogin() {
    var loginParams = {};
    loginParams.youdaKey = "yd69392856";// 这是游达key
    loginParams.backUrl = window.location.href; // 这是回调地址
    youdaLogin(loginParams);
}

function userIsEmpty(user) {
    if (user === null) return true;
    if (user.userId === undefined || user.userId === '' || user.userId === null) return true;
    if (user.gameId === undefined || user.gameId === '' || user.gameId === null) return true;
    if (user.token === undefined || user.token === '' || user.token === null) return true;
}
function include(jsurl) {
    if (jsurl == null || typeof(jsurl) != 'string') return;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = jsurl;
    /*script.setAttribute("src",jsurl);*/
    document.head.appendChild(script);
}