function SwitchLoadingPage(io) {
    var LoadingArea = document.getElementById("LoadingArea");
	var LoadingPic = document.getElementById("LoadingPic");
    var LoadingTxt = document.getElementById("LoadingTxt");

    if(io) {
        LoadingArea.classList.add("LoadingArea");
        LoadingArea.classList.remove("noshow");
        LoadingPic.classList.add("LoadingPic");
    } else {
        LoadingArea.removeAttribute("class");
        LoadingPic.removeAttribute("class");
        LoadingTxt.removeAttribute("class");
    }
}