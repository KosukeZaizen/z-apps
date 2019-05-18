//---------------↓　resize　↓---------------
export function getWindowSize() {
    let pageWidth, pageHeight;
    let screenWidth = parseInt(window.innerWidth, 10);
    let screenHeight = parseInt(window.innerHeight, 10);

    if (screenWidth > screenHeight) {
        //横長
        pageHeight = screenHeight;
        pageWidth = pageHeight * 16 / 9;

        if (pageWidth > screenWidth) {
            //横がはみ出たら(正方形に近い画面)
            pageWidth = screenWidth;
            pageHeight = pageWidth * 9 / 16;

            this.pageStyle = {
                //ページの余白設定
                position: "absolute",
                top: (screenHeight - pageHeight) / 2,
            }
        } else {
            this.pageStyle = {
            };
        }
    } else {
        //縦長
        pageHeight = screenWidth * 9 / 10;
        pageWidth = pageHeight * 16 / 9;

        if (pageWidth > screenHeight * 9 / 10) {
            //横がはみ出そうだったら(正方形に近い画面)
            pageWidth = screenHeight * 9 / 10;
            pageHeight = pageWidth * 9 / 16;

            this.pageStyle = {
                //ページの余白設定
                position: "absolute",
                left: (screenWidth + pageHeight) / 2,
                top: screenHeight / 20,
            }
        } else {
            this.pageStyle = {
                //ページの余白設定
                position: "absolute",
                left: screenWidth * 95 / 100,
                top: (screenHeight - pageWidth) / 2,
            }
        }
    }

    return { pageWidth: pageWidth, pageHeight: pageHeight };
}
    //---------------↑　resize　↑---------------




export function setKeyboardEvent(objGame) {
    // ------------------------------------------------------------
    // キーボードを押したときに実行されるイベント
    // ------------------------------------------------------------
    document.onkeydown = function (e) {
        if (!e) e = window.event; // レガシー

        // ------------------------------------------------------------
        // 入力情報を取得
        // ------------------------------------------------------------
        // キーコード
        let keyCode = e.keyCode;
        let keyType;
        if (keyCode === 37) {
            keyType = "left";
        } else if (keyCode === 39) {
            keyType = "right";
        } else if (keyCode === 38) {
            keyType = "jump";
        } else if (keyCode === 32) {
            keyType = "jump";
        }
        objGame.onClickButton(keyType);
    };

    // ------------------------------------------------------------
    // キーボードを離したときに実行されるイベント
    // ------------------------------------------------------------
    document.onkeyup = function (e) {
        if (!e) e = window.event; // レガシー

        // キーコード
        let keyCode = e.keyCode;
        let keyType;
        if (keyCode === 37) {
            keyType = "left";
        } else if (keyCode === 39) {
            keyType = "right";
        } else if (keyCode === 38) {
            keyType = "jump";
        } else if (keyCode === 32) {
            keyType = "jump";
        }
        objGame.onMouseUp(keyType);
    };
}


//ボタン押下時処理
export function onClickButton(btnType) {
    if (btnType === "left") {
        //←ボタン押下判定
        this.lButton = true;
    } else if (btnType === "right") {
        //→ボタン押下判定
        this.rButton = true;
    } else if (btnType === "jump") {
        //jumpボタン押下判定
        this.jButton = true;
    }
}
//ボタン押下終了時処理
export function onMouseUp(btnType) {
    if (btnType === "left") {
        //←ボタン押下判定
        this.lButton = false;
    } else if (btnType === "right") {
        //→ボタン押下判定
        this.rButton = false;
    }
}