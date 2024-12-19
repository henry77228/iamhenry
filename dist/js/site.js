
function init() {
    var nav = document.querySelectorAll(".navbar-nav > li");

    for(var i = 0; i < nav.length; i++) {
        nav[i].addEventListener("click", ClickNavBtn);
    }

    GetGalleryPic();
}

function ClickNavBtn(e) {
    var nav = e.currentTarget.querySelector("a");
    window.location = nav.getAttribute("action") + ".html";
}