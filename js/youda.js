function youdaPay(pay, callback) {
    if (payIsEmpty(pay)) {
        alert("请填写完整");
        return
    }
    var t = '<div class="dv_dialog_box" style="top: 0px;width: 100%;height: 100%;z-index: 2000;position: absolute;left: 0;background-color: rgba(0, 0, 0, 0.4);">';
    t += ' <div class="dv_dialog" style="width: 60%;height: 20%;background-color: #fff;border-radius: 8px;margin: auto;position: absolute;top: 0;left: 0;bottom: 0;right: 0;">';
    t += ' <div class="dv_title" style="padding-top: 20px;width: 100%;height: 60px;font-size: 25px;line-height: 25px;text-align: center;font-family: Microsoft YaHei">是否立即前往支付</div>';
    t += '<div class="dv_btn" style="bottom: 20%;position: absolute;width: 100%;height: 30px;">';
    t += '<button id="dialogSure" class="dialog_btn" style="width: 42%;bottom: 0;height: 30px;border: 1px solid #858585;outline: none;border-radius: 6px;cursor: pointer;background-color: #fff;margin-left: 5%;font-family: Microsoft YaHei;">' + '确定</button>';
    t += '<button id="dialogCancel" class="dialog_btn" style="width: 42%;bottom: 0;height: 30px;border: 1px solid #858585;outline: none;border-radius: 6px;cursor: pointer;background-color: #fff;margin-left: 5%;font-family: Microsoft YaHei;">' + '取消</button>';
    t += '</div>';
    t += ' </div>';
    t += '</div>';
    var body = document.body;
    var div = document.createElement("div");
    div.innerHTML = t;
    body.appendChild(div);
    document.getElementById("dialogSure").onclick = function () {
        body.removeChild(div);
        var paramsSting = new Base64().encode(JSON.stringify(pay));
        window.open("http://23sdk.23h5.cn/h5SDK/pay.html?params=" + paramsSting, "_blank")
        // window.open("./pay.html?params=" + paramsSting, "_blank")
    };
    document.getElementById("dialogCancel").onclick = function () {
        body.removeChild(div);
        if (callback !== null) {
            callback();
        }
    }
}

function youdaLogin(key) {
    if (loginIsEmpty(key)) {
        alert("请填写完整");
        return
    }
    // var paramsSting = new Base64().encode(JSON.stringify(pay));
    // window.open("./login.html?youdaKey="+key.youdaKey+"&backUrl="+key.backUrl,"_self")
    window.open("http://23sdk.23h5.cn/h5SDK/login.html?youdaKey=" + key.youdaKey + "&backUrl=" + key.backUrl, "_self")
    // var body = document.body;
    // var div = document.createElement("div");
    // div.id = "youda";
    // div.innerHTML = "<div style=\"display: none\" id=\"payHref\">" +
    //     "</div>";
    // body.appendChild(div);
    // // var href = "./login.html";
    // var href = "http://23sdk.23h5.cn/h5SDK/login.html";
    // document.getElementById("payHref").innerHTML =
    //     "<form  accept-charset='UTF-8' id='youdaForm' method ='get' action=" + href + ">" +
    //     "<input name ='youdaKey'  value=" + key.youdaKey + ">" +
    //     "<input name ='backUrl' value=" + key.backUrl + ">" +
    //     "</form>";
    // console.log(document.getElementById("payHref").innerHTML);
    // document.getElementById("youdaForm").submit();
    // body.removeChild(div)
}

function getYouDaUser() {
    var string = decodeURIComponent(QueryString("params"));
    if (string === '') {
        return null;
    }
    var base = new Base64();
    user = JSON.parse(base.decode(string));
    return user;
}

/**
 * @return {string}
 */
function QueryString(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result === null || result.length < 1) {
        return "";
    }
    return result[1];
}

function payIsEmpty(pay) {
    if (pay === null) return true;
    if (pay.userId === undefined || pay.userId === '' || pay.userId === null) return true;
    if (pay.gameId === undefined || pay.gameId === '' || pay.gameId === null) return true;
    if (pay.token === undefined || pay.token === '' || pay.token === null) return true;
    if (pay.price === undefined || pay.token === '' || pay.token === null) return true;
    if (pay.content === undefined || pay.token === '' || pay.token === null) return true;
    if (pay.orderId === undefined || pay.token === '' || pay.token === null) return true;
}

function loginIsEmpty(pay) {
    if (pay === null) return true;
    if (pay.youdaKey === undefined || pay.youdaKey === '' || pay.youdaKey === null) return true;
    if (pay.backUrl === undefined || pay.backUrl === '' || pay.backUrl === null) return true;
}

function Base64() {

    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}

