var baseUrl = "http://192.168.0.166:8080/GYDomestic/";

function loadXMLDoc(method, url, body, response) {

    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    xmlhttp.onreadystatechange = function () {
        var json = {};
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
                console.log(xmlhttp.response);

                json = JSON.parse(xmlhttp.response);
            } else {
                json.status = "0" + xmlhttp.status;
            }
            response(json)
        }

    };
    xmlhttp.open(method, url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;");
    if (isLogin()) {
        var user = loadUser();
        xmlhttp.setRequestHeader("id", user.userid + "");
        xmlhttp.setRequestHeader("token", user.token);
        console.log(user.token);

    }
    console.log(JSON.stringify(body));
    xmlhttp.send(JSON.stringify(body));
}

function login(body, response) {
    loadXMLDoc("POST", baseUrl + "user/login", body, response)
}

function regist(body, response) {
    loadXMLDoc("POST", baseUrl + "user/register", body, response)
}

function validCode(body, phone, response) {
    loadXMLDoc("GET", baseUrl + "getDomesticCode/send?phone=" + phone, body, response)
}

function createOrder(body, response) {
    loadXMLDoc("POST", baseUrl + "order/create", body, response)
}

function alipayOrder(body, response) {
    loadAlipay("POST", baseUrl + "alipay/phonepay", body, response)
}
function forgetFirst(body,response) {
    loadXMLDoc("PUT", baseUrl + "user/forgetpassone", body, response)
}
function forgetNext(body,response) {
    loadXMLDoc("PUT", baseUrl + "user/forgetpasstwo", body, response)
}
var wait=60;
function time(o) {
    if (wait === 0) {
        o.removeAttribute("disabled");
        o.value="获取验证码";
        wait = 60;
    } else {

        o.setAttribute("disabled", true);
        o.value="重新发送(" + wait + ")";
        wait--;
        setTimeout(function() {
                time(o)
            },
            1000)
    }
}

function loadAlipay(method, url, body, response) {

    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    xmlhttp.onreadystatechange = function () {
        var json = {};
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
                json = xmlhttp.response;
            } else {
                json.status = "0" + xmlhttp.status;
            }
            response(json)
        }
    };
    xmlhttp.open(method, url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;");
    if (isLogin()) {
        var user = loadUser();
        xmlhttp.setRequestHeader("id", user.userid + "");
        xmlhttp.setRequestHeader("token", user.token);
        console.log(user.token);

    }
    console.log(JSON.stringify(body));
    xmlhttp.send(JSON.stringify(body));
}

function isLogin() {

    return this.loadUser() !== null
}

function saveUser(user) {
    var storage = window.localStorage;
    storage.setItem('user', JSON.stringify(user))
}

function loadUser() {
    var user = window.localStorage.getItem('user');
    if (user === undefined || user === null) {
        return null
    }
    return JSON.parse(user);
}

function relogin() {
    logout();
}

function logout() {
    window.localStorage.removeItem('user')
}