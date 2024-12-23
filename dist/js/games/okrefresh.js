var okrefresh = {
    "playoxani": function (ox, vtop, vleft, isend) {
        ActFeedback.classList.remove("noshow");

        OO_ani.setAttribute("style", "left:" + (vleft * 100) + "%; top:" + (vtop * 100) + "%;");
        XX_ani.setAttribute("style", "left:" + (vleft * 100) + "%; top:" + (vtop * 100) + "%;");

        isEnd = isend;
        isAns = ox;
        // console.log("isAns =", isAns);
        if(isAns) {
            OO_ani.setAttribute("class", "BO_ani");
        } else {
            XX_ani.setAttribute("class", "BX_ani");
        }

        playOXsound(isAns);
        setTimeout(this.OXaniDone, 3000);
    }, 
    "OXaniDone": function () {
        // console.log("OXaniDone ===");
        ActFeedback.classList.add("noshow");
        OO_ani.removeAttribute("class");
        XX_ani.removeAttribute("class");

        CallReward();
    }
}