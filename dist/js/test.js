var documentHeight = document.body.scrollHeight;
var windowHeight = window.innerHeight;
var scrollPercent = window.scrollY / (documentHeight - windowHeight);
document.addEventListener("scroll", ScrollFunc);

var textWidth = [535, 370, 410];
var gsplit = 6;
var fixpos = 0.4;

function ScrollFunc(e) {
    scrollPercent = window.scrollY / (documentHeight - windowHeight);
    SetTextInner(scrollPercent);
}

function SetTextInner(sp) {
    sp = (sp > fixpos ? fixpos : sp);

    var gtext = document.querySelectorAll(".gtext");
    var gwidth;

    for(var i = 0; i < gtext.length; i++) {
        gtext[i].setAttribute("style", "width: " + textWidth[i] + "px; --text-width: " + textWidth[i] + "px; --gsplit: " + gsplit);
        var gtextinn = gtext[i].querySelectorAll(".gtext-box > .gtext-box-inner");

        gwidth = Math.floor(textWidth[i] / gsplit * 10) / 10 * -1;

        for(var j = 0; j < gtextinn.length; j++) {
            var tx, ty, transX, transY, offsetX, offsetY;
            offsetX = 35;
            offsetY = 75;
            tx = (j < (gsplit / 2) ? -1 : 1);
            ty = (j % 2 == 0 ? -1 : 1);

            transX = (fixpos - sp) * offsetX * tx;
            transY = (fixpos - sp) * offsetY * ty;

            // gwidth = 0;

            gtextinn[j].setAttribute("style", "left: " + gwidth * j + "px; transform: translate(" + transX + "%, " + transY + "%);");
        }
    }

}

function CreateBoxInner() {
    var gtext = document.querySelectorAll(".gtext");

    for(var i = 0; i < gtext.length; i++) {
        var text = gtext[i].getAttribute("data-text");
        for(var j = 0; j < gsplit; j++) {
            var box = document.createElement("span");
            var inner = document.createElement("span");

            box.setAttribute("class", "gtext-box");
            inner.setAttribute("class", "gtext-box-inner");
            inner.innerHTML = text;

            box.appendChild(inner);
            gtext[i].appendChild(box);
        }
    }
}

CreateBoxInner();
SetTextInner(scrollPercent);
