/**
 * Created by liyang_ly on 2018/3/16.
 */
var Toast = {};
Toast.toast = function(msg) {
    var active = "toast-active";
    var div = document.createElement("div");
    div.classList.add("toast-container")
    div.innerHTML = '<div class="toast-message-container"><div class="toast_warn"></div><div style="margin-top: -10px">' + msg + "</div></div>"
    div.addEventListener("webkitTransitionEnd", function() {
        div.classList.contains(active) || div.parentNode.removeChild(div)
    });
    document.body.appendChild(div)
    div.offsetHeight
    div.classList.add(active)
    setTimeout(function() {
        // div.classList.remove(active)
        $(".toast-container").remove();
    }, 1500)
}
Toast.toastfor1 = function(msg,data) {
    var active = "toast-active";
    var div = document.createElement("div");
    div.classList.add("toast-container")
    div.innerHTML = '<div class="toast-message-container"><div class="toast_warn"></div><div style="margin-top: -10px">' + msg + "</div></div>"
    div.addEventListener("webkitTransitionEnd", function() {
        div.classList.contains(active) || div.parentNode.removeChild(div)
    });
    document.body.appendChild(div)
    div.offsetHeight
    div.classList.add(active)
    setTimeout(function() {
        // div.classList.remove(active)
        $(".toast-container").remove();
        var detial_id = data.data;
        location.href = "app_detail.s?id=" + detial_id;
    }, 1000)
}
Toast.loading = function(msg) {
    var active = "toast-active";
    var div = document.createElement("div");
    div.classList.add("toast-container")
    div.innerHTML = '<div class="toast-message-container"><div class="toast_loading"></div>' + msg + "</div>"
    div.addEventListener("webkitTransitionEnd", function() {
        div.classList.contains(active) || div.parentNode.removeChild(div)
    });
    document.body.appendChild(div)
    div.offsetHeight
    div.classList.add(active)
    // setTimeout(function() {
    //     div.classList.remove(active)
    // }, 1500)
}
Toast.close = function () {
    $(".toast-container").remove();
}