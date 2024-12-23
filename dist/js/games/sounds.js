//ox音效
var snd_X = new Audio();
var snd_O = new Audio();
var snd_url = new Array("./sounds/right.mp3", "./sounds/wrong.mp3");

//音效
var aud = new Audio();
//旁白
var snd = new Audio();
//背景音
var bgm = new Audio();

snd_X.muted = true;
snd_O.muted = true;
aud.muted = true;
snd.muted = true;
bgm.muted = true;

//聲音初始(瀏覽器安全性)
function SoundInit() {
    // console.log("SoundInit ===");    
    snd_O.src = snd_url[0];
    snd_X.src = snd_url[0];
    aud.src = snd_url[0];
    snd.src = snd_url[0];
    bgm.src = snd_url[0];

    snd_X.muted = true;
    snd_O.muted = true;
    aud.muted = true;
    snd.muted = true;
    bgm.muted = true;

    snd_O.play();
    snd_X.play();
    aud.play();
    snd.play();
    bgm.play();
}

//播放音效
function playOXsound(io) {
    // console.log("playOXsound = io =", io);    
    snd_X.muted = false;
    snd_O.muted = false;
    if(io) {
        snd_O.src = snd_url[0];
        snd_O.preload = "auto";
        snd_O.volume = 1;
        snd_O.play();
    } else {
        snd_X.src = snd_url[1];
        snd_X.preload = "auto";
        snd_X.volume = 1;
        snd_X.play();
    }
}
//所有聲音控制(旁白、背景音樂、音效)
function PlayAudio(type, name=null, io=true, vol=1) {
    aud.muted = false;
    snd.muted = false;
    bgm.muted = false;
    if(io && name) {
        //播放
        if(type == "theme") {
            //主題字
            snd.src = UsePicPath + "/music/TA/theme/" + name;
            snd.play();
            snd.addEventListener('ended', PlayThemeEnd);        
        } else if(type.indexOf("sound") >= 0) {
            //旁白
            snd.src = UsePicPath + "/music/TA/sound/active/" + name;
            snd.play();
            snd.addEventListener('ended', PlaySoundEnd);
        } else if(type == "bgm") {
            //背景
            bgm.src = UsePicPath + "/music/TA/bgm/" + name;
            bgm.loop = true;
            bgm.volume = vol;
            bgm.play();
        } else {
            //音效
            aud.src = UsePicPath + "/music/TA/sound/" + name;
            aud.play();
        }
    } else {
        //關閉播放
        if(type == "theme") {
            //旁白
            snd.pause();
            snd.removeEventListener('ended', PlayThemeEnd);
        } else if(type.indexOf("sound") >= 0) {
            //旁白
            snd.pause();
            snd.removeEventListener('ended', PlaySoundEnd);
        } else if(type == "bgm") {
            //背景
            bgm.pause();
        } else {
            //音效
            aud.pause();
        }
    }
    
}
function PlayThemeEnd() {
    var Actsvg = document.getElementById("Actsvg");
    var svgObj = Actsvg.contentDocument;

    snd.removeEventListener('ended', PlayThemeEnd);
    svgObj.defaultView.PlayThemeEnd();
}
function PlaySoundEnd() {
    var Actsvg = document.getElementById("Actsvg");
    var svgObj = Actsvg.contentDocument;

    snd.removeEventListener('ended', PlaySoundEnd);
    svgObj.defaultView.PlaySoundEnd();
}
function SwitchBGMFunc(io, vol=1) {
    bgm.volume = vol;
    if(io) {        
        bgm.play();
    } else {
        bgm.pause();
    }
}