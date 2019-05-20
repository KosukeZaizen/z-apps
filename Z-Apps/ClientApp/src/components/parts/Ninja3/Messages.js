//------------------------------------------------------------
//
//　日本語・英語のメッセージを保持し、必要なメッセージを返すモジュール
//
//------------------------------------------------------------


let jpMessages = {

    //屋根の上でポチに触った時のメッセージ
    POCHI_SCROLL_TITLE: "あれが敵の城じゃ！",
    POCHI_SCROLL_MESSAGE:
        "今回のお主の任務は、敵の城に忍び込み、\n" +
        "敵の忍者の長を倒すことである。\n" +
        "敵の手下捕まるでないぞ！検討を祈る！",

    //水辺でポチに触った時のメッセージ
    POCHI_SCROLL2_TITLE: "水路を使うがよい",
    POCHI_SCROLL2_MESSAGE:
        "敵の城に忍び込むには、地下水路を使うのが良さそうじゃ。\n" +
        "水中では [jump]ボタン を何度も押すことで、浮上できるぞ。\n" +
        "さらに「火遁」は水中でも使える！検討を祈る！",

    //ボス部屋前でポチに触った時のメッセージ
    POCHI_SCROLL3_TITLE: "敵のボスはすぐそこじゃ！",
    POCHI_SCROLL3_MESSAGE:
        "敵のボスに炎を当てればお主の勝ちじゃ！\n" +
        "[<]ボタン と [>]ボタン を押しっぱなしにして\n" +
        "火を吹いている間は、奴の手下どもの攻撃を受けないぞ！",

    //全クリ時にポチに触った時のメッセージ
    POCHI_SCROLL4_TITLE: "よくやった！",
    POCHI_SCROLL4_MESSAGE:
        "ついにやつを倒したな！\n" +
        "お主ももう、立派な忍者じゃ。\n" +
        "これが敵の秘伝の巻物である。",

    //火遁の巻物
    FIRE_SCROLL_TITLE: "火遁",
    FIRE_SCROLL_MESSAGE:
        "火遁の術を学ぶための巻物。\n" +
        "[<]ボタン と [>]ボタン を同時に押すことで、火の玉を飛ばせるぞ。\n" +
        "敵に当てることで、敵を倒すことができる！",

    //階段のシノに触った時のメッセージ
    SHINO_SCROLL_TITLE: "調子はどう？",
    SHINO_SCROLL_MESSAGE:
        "貴方も火遁が使えるようになったのね。\n" +
        "木の箱を見付けたら、炎をぶつけてみると良いわ。\n" +
        "箱を壊して、中身を確認することができるわ。",

    //風呂場でシノに触った時のメッセージ
    SHINO_SCROLL2_TITLE: "鍵が必要なようね。",
    SHINO_SCROLL2_MESSAGE:
        "城に入るための扉には鍵がかかっているわ。\n" +
        "確か水の中で鍵を見た気がするけど…\n" +
        "あなた、水路で鍵を拾ったりした？",

    //扉の部屋でシノに触った時のメッセージ
    SHINO_SCROLL3_TITLE: "鍵がかかっているわね...",
    SHINO_SCROLL3_MESSAGE:
        "２つの扉の鍵は、この城のどこかにあるはず…\n" +
        "扉を開けてあの箱を燃やせれば、はしごを登れそうね。\n" +
        "敵のボスの部屋はすぐそこよ！",

    //水中のカギに触った時のメッセージ
    KEY_SCROLL_TITLE: "浴場の鍵",
    KEY_SCROLL_MESSAGE:
        "城の風呂場の鍵を手に入れた！\n" +
        "城に侵入する際に使おう！\n" +
        "なくすでないぞ！",

    //鬼が守るカギに触った時のメッセージ
    KEY2_SCROLL_TITLE: "ボスの部屋の鍵",
    KEY2_SCROLL_MESSAGE:
        "敵のボスがいる部屋への扉を開ける鍵。\n" +
        "２つの鍵が必要。",

    //屋根裏のカギに触った時のメッセージ
    KEY3_SCROLL_TITLE: "ボス部屋の鍵",
    KEY3_SCROLL_MESSAGE:
        "敵のボスの部屋への扉を通るための鍵。\n" +
        "２つの鍵を集めると、ボスの部屋に入れる。",

    //最後の巻物に触った時のメッセージ
    KOSUKE_SCROLL_TITLE: "おめでとう！",
    KOSUKE_SCROLL_MESSAGE:
        "全クリおめでとう！\n" +
        "これで君も立派な忍者だ！\n" +
        "このゲームで遊んでくれて、ありがとう！",
};


let enMessages = {

    //屋根の上でポチに触った時のメッセージ
    POCHI_SCROLL_TITLE: "Sneak into the enemy's castle!",
    POCHI_SCROLL_MESSAGE:
        "Can you see the enemy's castle!?\n" +
        "Your mission is to sneak into the castle, and steal the secret scroll!\n" +
        "Don't touch the enemy! Good luck!",

    //水辺でポチに触った時のメッセージ
    POCHI_SCROLL2_TITLE: "Go under the water!",
    POCHI_SCROLL2_MESSAGE:
        "Best way to sneak into the castle is by going under the water!\n" +
        "In the water, you can swim by pushing [jump] button many times!\n" +
        "Don't touch the enemy! Good luck!",

    //ボス部屋前でポチに触った時のメッセージ
    POCHI_SCROLL3_TITLE: "The boss is there!",
    POCHI_SCROLL3_MESSAGE:
        "If your fire hits the Boss, you will win!\n" +
        "While using fire pushing [<] button and [>] button,\n" +
        "enemies cannot touch you! Good luck!",

    //全クリ時にポチに触った時のメッセージ
    POCHI_SCROLL4_TITLE: "You did it!",
    POCHI_SCROLL4_MESSAGE:
        "You defeated the enemy!\n" +
        "You have become such a strong Ninja!\n" +
        "That is the enemy's secret scroll. Take it!",

    //火遁の巻物
    FIRE_SCROLL_TITLE: "火遁",
    FIRE_SCROLL_MESSAGE:
        "This is the scroll to learn 'Fire Ball'.\n" +
        "Push [<] button and [>] button at the same time.\n" +
        "You can defeat the enemy using Fire Ball.",

    //階段のシノに触った時のメッセージ
    SHINO_SCROLL_TITLE: "Hello!",
    SHINO_SCROLL_MESSAGE:
        "Now, you can use Fire Ball.\n" +
        "When you find a wooden box, you should use fire.\n" +
        "It will burn the box, and you can see what's inside.",

    //風呂場でシノに触った時のメッセージ
    SHINO_SCROLL2_TITLE: "Do you have the key?",
    SHINO_SCROLL2_MESSAGE:
        "The door is locked!\n" +
        "I think I saw the key in the water.\n" +
        "Did you find the key?",

    //扉の部屋でシノに触った時のメッセージ
    SHINO_SCROLL3_TITLE: "The doors are locked...",
    SHINO_SCROLL3_MESSAGE:
        "The keys for these two doors must be in this castle!\n" +
        "The boss's room is just there. We need two keys!\n" +
        "You should burn the wooden boxes to climb the ladder.",

    //水中のカギに触った時のメッセージ
    KEY_SCROLL_TITLE: "Key to the bath room",
    KEY_SCROLL_MESSAGE:
        "You got the key of the bath room!\n" +
        "You will use this to enter the castle.\n" +
        "Don't lose it!",

    //鬼が守るカギに触った時のメッセージ
    KEY2_SCROLL_TITLE: "Key of the Boss's room",
    KEY2_SCROLL_MESSAGE:
        "This is the key to the Boss's room.\n" +
        "To enter the Boss's room, you need to collect two keys!",

    //屋根裏のカギに触った時のメッセージ
    KEY3_SCROLL_TITLE: "Key to enter the boss's room!",
    KEY3_SCROLL_MESSAGE:
        "This is the key to the Boss's room.\n" +
        "To enter the Boss's room, you need to collect two keys!",

    //最後の巻物に触った時のメッセージ
    //天界でコウスケに触った時のメッセージ
    KOSUKE_SCROLL_TITLE: "Congratulations!",
    KOSUKE_SCROLL_MESSAGE:
        "I am the creater of this game!\n" +
        "You completed the game!\n" +
        "Thank you for playing!!!!",
};

let language;
export function setLang(lang) {
    language = lang;
}

export function getMessage(name) {
    if (language === "Japanese") {
        return jpMessages[name];
    } else {
        return enMessages[name];
    }
}
