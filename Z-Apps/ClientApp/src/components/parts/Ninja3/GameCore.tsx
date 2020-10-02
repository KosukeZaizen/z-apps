//@ts-nocheck
//------------------------------------------------------------
//
//　　　　ゲームの基本的な操作や描画に関わる関数
//
//------------------------------------------------------------

export const getWindowSize = function () {
    let pageWidth, pageHeight;
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    if (screenWidth > screenHeight) {
        //横長
        pageHeight = screenHeight;
        pageWidth = (pageHeight * 16) / 9;

        if (pageWidth > screenWidth) {
            //横がはみ出たら(正方形に近い画面)
            pageWidth = screenWidth;
            pageHeight = (pageWidth * 9) / 16;

            this.pageStyle = {
                //ページの余白設定
                position: "absolute",
                top: (screenHeight - pageHeight) / 2,
            };
        } else {
            this.pageStyle = {
                //ページの余白設定
                position: "absolute",
                left: (screenWidth - pageWidth) / 2,
            };
        }
    } else {
        //縦長
        pageHeight = (screenWidth * 9) / 10;
        pageWidth = (pageHeight * 16) / 9;

        if (pageWidth > (screenHeight * 9) / 10) {
            //横がはみ出そうだったら(正方形に近い画面)
            pageWidth = (screenHeight * 9) / 10;
            pageHeight = (pageWidth * 9) / 16;

            this.pageStyle = {
                //ページの余白設定
                position: "absolute",
                left: (screenWidth + pageHeight) / 2,
                top: screenHeight / 20,
            };
        } else {
            this.pageStyle = {
                //ページの余白設定
                position: "absolute",
                left: (screenWidth * 95) / 100,
                top: (screenHeight - pageWidth) / 2,
            };
        }
    }

    return { pageWidth: pageWidth, pageHeight: pageHeight };
};

export const checkTerminalPC = function () {
    // ------------------------------------------------------------
    // (PC) or (スマホ/タブレット) 判定
    // ------------------------------------------------------------
    if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)) {
        // スマホ・タブレット（iOS・Android）の場合
        return false;
    } else {
        // PCの場合
        return true;
    }
};

export const setKeyboardEvent = function (objGame) {
    // ------------------------------------------------------------
    // キーボードを押したときに実行されるイベント
    // ------------------------------------------------------------
    document.onkeydown = function (e: any) {
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
        } else if (
            keyCode === 13 ||
            keyCode === 8 ||
            keyCode === 46 ||
            keyCode === 27
        ) {
            keyType = "close";
        }
        objGame.onClickButton(keyType);
    };

    // ------------------------------------------------------------
    // キーボードを離したときに実行されるイベント
    // ------------------------------------------------------------
    document.onkeyup = function (e: any) {
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
        } else if (
            keyCode === 13 ||
            keyCode === 8 ||
            keyCode === 46 ||
            keyCode === 27
        ) {
            keyType = "close";
        }
        objGame.onMouseUp(keyType);
    };
};

//ボタン押下時処理
export const onClickButton = function (btnType) {
    if (btnType === "left") {
        //←ボタン押下判定
        this.lButton = true;
    } else if (btnType === "right") {
        //→ボタン押下判定
        this.rButton = true;
    } else if (btnType === "jump") {
        //jumpボタン押下判定
        this.jButton = true;
    } else if (btnType === "close") {
        //closeキー押下判定（Enter、Delete等）
        this.closeButton = true;
    }
};
//ボタン押下終了時処理
export const onMouseUp = function (btnType) {
    if (btnType === "left") {
        //←ボタン押下判定
        this.lButton = false;
    } else if (btnType === "right") {
        //→ボタン押下判定
        this.rButton = false;
    } else if (btnType === "close") {
        //closeキー押下判定（Enter、Delete等）
        this.closeButton = false;
    }
};

//背景の設定
export function getBgImg(bgImg) {
    return {
        /* 背景画像 */
        backgroundImage: `url(${bgImg})`,

        /* 画像を常に天地左右の中央に配置 */
        backgroundPosition: "center center",

        /* 画像をタイル状に繰り返し表示しない */
        backgroundRepeat: "no-repeat",

        /* 表示するコンテナの大きさに基づいて、背景画像を調整 */
        backgroundSize: "cover",

        /* 背景画像が読み込まれる前に表示される背景のカラー */
        backgroundColor: "black",
    };
}
