//遊戲資訊
var QuesData, QuesTitle;
var NowCode, NowQues;

var isAns;

var NowLevel = 1;
var NowBingo = 0;

function Gameinit() {
    NowCode = "game01";
    NowBingo = 0;
    SoundInit();
    LoadGameFunc();
}
function ChangeGameLevel() {
    var obj = document.getElementById("LevelNum");
    for(var i = 0; i < obj.options.length; i++)
    {
        if(obj[i].selected) {
            NowLevel = obj[i].value;
        }
    }
    LoadGameFunc();
}
function LoadGameFunc() {
    UnLoadGameFunc();

    GetGameData();
}
function UnLoadGameFunc() {
    var ActContainDiv = document.getElementById("ActContainDiv");
    if(ActContainDiv.children.length <= 0) return;
    // console.log("缷載 ======= ");
    var Actsvg = document.getElementById("Actsvg");
    var svgObj = Actsvg.contentDocument;
    svgObj.defaultView.Leave();

    var ActContainDiv = document.getElementById("ActContainDiv");
    while(ActContainDiv.lastChild) {
        ActContainDiv.removeChild(ActContainDiv.lastChild);
    }
}

function GetGameData() {
    // console.log("NowCode =", NowCode);

    fetch("./js/games/" + NowCode + "rule.json")
    .then((response) => response.json())
    .then((json) => GetGameDataDone(json));
}
function GetGameDataDone(data) {
    QuesData = data;
    // console.log("QuesData =", QuesData);
    LoadActiveFunc();
}

//載入互動
function LoadActiveFunc() {
    SwitchLoadingPage(true);

    var ActContainDiv = document.getElementById("ActContainDiv");
    var Actsvg = document.createElement("object");
    Actsvg.id = "Actsvg";
    Actsvg.type = "image/svg+xml";
    Actsvg.data = "/images/games/" + NowCode + ".svg?" + Math.floor(Math.random() * 999);


    Actsvg.addEventListener("load", function () {
        let svg = Actsvg.contentDocument.documentElement;
        // console.log("svg =", svg);
        let w = svg.getAttribute("width");
        let h = svg.getAttribute("height");
        // console.log("w =", w, ", h =", h);
        svg.setAttribute("viewBox", "0 0 " + w  + " " + h);
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");

        LoadActiveComplete();
    }, false);
    ActContainDiv.appendChild(Actsvg);
}
//讀取互動完成
function LoadActiveComplete() {
    //關閉loading動畫
    SwitchLoadingPage(false);
    
    isLoadActive = true;

    GameInit();
}
function GameInit() {
    var Actsvg = document.getElementById("Actsvg");
    var svgObj = Actsvg.contentDocument;
    // console.log("svgObj =", svgObj);
    // console.log("QuesData =", QuesData);

    isAns = false;
    
    NowQues = QuesData[NowLevel - 1];
    QuesTitle = QuesData[NowLevel - 1].Title;
    // console.log("QuesTitle =", QuesTitle);    

    svgObj.defaultView.nowLv = NowLevel;
    svgObj.defaultView.nowSec = QuesData[NowLevel - 1].Times;
    svgObj.defaultView.InitGame();
}

// 答對或答錯
var isEnd, isAns, isBingo, isQuit, isNext = false;
function CallAnsFunc(isans, isquit, isend, top, left) {
    var ActFeedback = document.getElementById("ActFeedback");
    ActFeedback.classList.remove("noshow");
    
    isAns = isans;
    isQuit = isquit;
    isEnd = isend;
    // console.log("CallAnsFunc == isAns =", isAns, ", isEnd =", isEnd);

    if(isAns) {
        NowBingo++;
        //答對
        okrefresh.playoxani(isans, top, left, isend);             
    } else {
        //答錯
        okrefresh.playoxani(isans, top, left, isend);
        if(isQuit || isEnd) {
            isBingo = true;
        }
    }
}
// 答對或答錯
function CallReward() {
    if(ActContainDiv.childElementCount == 0) return;
    // console.log("CallReward == isAns =", isAns, ", isBingo =", isBingo, ", isEnd =", isEnd);
    var Actsvg = document.getElementById("Actsvg");
    var svgObj = Actsvg.contentDocument;

    if(isBingo || isAns) {
        setTimeout(function () {
            if(!isEnd) {
                // console.log("下一題 ==== ");
                svgObj.defaultView.NextQues();
            } else {
                // console.log("NowBingo =", NowBingo);
                svgObj.defaultView.GameClear();
            }
        }, 500);
    } else {
        svgObj.defaultView.isBlock = false;
        if(isNext) {
            isNext = false;
            svgObj.defaultView.NextQues();
        }
    }

    isAns = false;
    isBingo = false;            
}