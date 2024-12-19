
function init() {
    var nav = document.querySelectorAll(".navbar-nav > li");
    var link = ["index.html", "gallery.html"];

    for(var i = 0; i < nav.length; i++) {
        nav[i].addEventListener("click", ClickNavBtn);
    }

    GetGalleryPic();
}

function ClickNavBtn(e) {
    var nav = e.currentTarget.querySelector("a");
    window.location = "/" + nav.getAttribute("action");
}