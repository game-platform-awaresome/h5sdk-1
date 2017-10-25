/**
 * Created by chenshengyu on 2017/9/11.
 */

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