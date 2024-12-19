var GalleryJson;
var nowCate = 0;
var nowPic = 0;
var totPic = 0;

function GetGalleryPic() {
    fetch('/json/gallery.json')
    .then((response) => response.json())
    .then((json) => GetFalleryPicDataDone(json));
}

function GetFalleryPicDataDone(json) {
    GalleryJson = json.gallerys;

    var GalleryCate = document.getElementById("GalleryCate");
    var GalleryDesc = document.getElementById("GalleryDesc");
    var GalleryLbt = document.getElementById("GalleryLbt");
    var GalleryRbt = document.getElementById("GalleryRbt");

    //先清空
    while (GalleryCate.lastElementChild) {
        GalleryCate.removeChild(GalleryCate.lastElementChild);
    }
    while (GalleryDesc.lastElementChild) {
        GalleryDesc.removeChild(GalleryDesc.lastElementChild);
    }

    //生成標籤按鈕
    for(var i = 0; i < GalleryJson.length; i++) {
        var btn = document.createElement("div");
        btn.setAttribute("id", "Gallery_" + i);
        btn.classList.add("gallery-cateloge-btn");
        btn.innerHTML = String(GalleryJson[i].titl);
        if(i == 0) {
            btn.classList.add("active");
        }

        btn.addEventListener("click", ClickGalleryCate);
        // btn.addEventListener("touchend", ClickGalleryCate);

        GalleryCate.appendChild(btn);
    }

    //切頁按鈕
    GalleryLbt.addEventListener("click", ClickGalleryPage);
    // GalleryLbt.addEventListener("touchend", ClickGalleryPage);
    GalleryRbt.addEventListener("click", ClickGalleryPage);
    // GalleryRbt.addEventListener("touchend", ClickGalleryPage);

    nowCate = 0;
    SwitchGalleryCate(nowCate);
}

function ClickGalleryCate(e) {
    var btn = e.currentTarget;
    var num = String(btn.id).substr(8, String(btn.id).length);

    if(nowCate != num) SwitchGalleryCate(num);
}

function SwitchGalleryCate(num) {
    var GalleryCate = document.getElementById("GalleryCate");
    var GalleryDesc = document.getElementById("GalleryDesc");
    
    for(var i = 0; i < GalleryCate.childElementCount; i++) {
        var btn = document.getElementById("Gallery_" + i);
        btn.classList.remove("active");

        if(i == num) {
            btn.classList.add("active");
        }
    }

    nowCate = num;
    nowPic = 1;
    totPic = GalleryJson[nowCate].pics.length;

    GalleryDesc.innerHTML = GalleryJson[nowCate].name;
    if(GalleryJson[nowCate].desc) {
        GalleryDesc.innerHTML += "<br>";
        GalleryDesc.innerHTML += "<a href=" + GalleryJson[nowCate].desc + " target='blank'>" + GalleryJson[nowCate].desc + "</a>";
    }

    CheckPageBtn();
    GalleryGotoPage(nowPic);
    console.log("nowCate =", nowCate, ", nowPic =", nowPic, ", totPic =", totPic);
}

function ClickGalleryPage(e) {
    var btn = e.currentTarget;
    
    if(btn.id == "GalleryLbt") {
        //向左、頁數減少
        (nowPic > 1 ? nowPic-- : nowPic = 1);
    } else if(btn.id == "GalleryRbt") {
        //向右、頁數增加
        (nowPic < (totPic - 1) ? nowPic++ : nowPic = totPic);
    }

    CheckPageBtn();
    GalleryGotoPage(nowPic);
}

function GalleryGotoPage(num) {
    var GalleryPic = document.getElementById("GalleryPic");
    var GalleryTxt = document.getElementById("GalleryTxt");

    var img = GalleryPic.querySelector("img");
    img.src = "/images/gallery/" + GalleryJson[nowCate].pics[nowPic - 1].name;
    GalleryTxt.innerHTML = GalleryJson[nowCate].pics[nowPic - 1].desc;    
}

function CheckPageBtn() {
    var GalleryLbt = document.getElementById("GalleryLbt");
    var GalleryRbt = document.getElementById("GalleryRbt");

    if(nowPic == 1) {
        GalleryLbt.classList.add("ds-none");
    } else {
        GalleryLbt.classList.remove("ds-none");
    }
    if(nowPic == totPic) {
        GalleryRbt.classList.add("ds-none");
    } else if(nowPic < totPic) {
        GalleryRbt.classList.remove("ds-none");
    }

    var GalleryPag = document.getElementById("GalleryPag");
    GalleryPag.innerHTML = (nowPic < 10 ? "0" + nowPic : nowPic) + " / " + (totPic < 10 ? "0" + totPic : totPic);
}