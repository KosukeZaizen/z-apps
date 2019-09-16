//------------------------------------------------------------
//
//　日本語・英語のメッセージを保持し、必要なメッセージを返すモジュール
//
//------------------------------------------------------------

export function setLang(lang) {

    const jpMessages = {

        //PCの場合、キーボードを使う旨のメッセージ
        PC_KEYBOARD: "PCでは、キーボードの「←」「↑」「→」キーで操作をしてください。",

        //屋根の上でポチに触った時のメッセージ
        POCHI_SCROLL_TITLE: "拙者の屋敷に参るがよい",
        POCHI_SCROLL_MESSAGE:
            "この村に、こんな時期に雪が降るとは妙じゃのう…\n" +
            "お主に調査してもらいたいことがある。。\n" +
            "[＜] ボタンを押し続けて、拙者の屋敷まで参るがよい。",

        //家でのポチ
        POCHI2_SCROLL_TITLE: "この地に雪が降るとは珍しい…",
        POCHI2_SCROLL_MESSAGE:
            "北の山奥にある「キノコ村」に、天気を操る仙人が住んでおる。\n" +
            "彼らに何かあったのかもしれぬ…\n" +
            "そこの仏壇の巻物を読んで、キノコ村の様子を見てきてくれんか。",

        //飛び石の術
        TOBIISHI_SCROLL_TITLE: "飛び石の書",
        TOBIISHI_SCROLL_MESSAGE:
            "秘技、飛び石の術が使えるようになる巻物。\n" +
            "岩を見つけたら、上に乗ってみるがよい。\n" +
            "目的の地にたどり着くことができるであろう。",

        //半化の術
        HANKA_SCROLL_TITLE: "半化の書",
        HANKA_SCROLL_MESSAGE:
            "秘技、半化の術が使えるようになる巻物。\n" +
            "青いキノコに触れることで体が小さくなる。\n" +
            "赤いキノコに触れると、元の大きさに戻る。",

        //シノ
        SHINO_SCROLL_TITLE: "キノコ村はもうすぐよ",
        SHINO_SCROLL_MESSAGE:
            "しばらく右に進むと、キノコ村の仙人に会えるはずよ。\n" +
            "天狗みたいな格好をしているから、すぐにわかるはず…\n" +
            "彼がこの雪を降らせているのかしら…",

        //シノ2
        SHINO2_SCROLL_TITLE: "これは、氷漬けになった魔物達？",
        SHINO2_SCROLL_MESSAGE:
            "この魔物たちを氷漬けにするために、仙人は雪を降らせたのね。\n" +
            "でも魔物は、凍らせたぐらいじゃ死なないわ…\n" +
            "きっと雪がやめば、またこの魔物の大群が村を襲うわ…",

        //シノ3
        SHINO3_SCROLL_TITLE: "ここがキノコ村ね",
        SHINO3_SCROLL_MESSAGE:
            "仙人が雪を降らせてくれているうちに、\n" +
            "あの魔物たちを倒す方法を探さないと…\n" +
            "きっとまたすぐに魔物たちは動き出すわ…",

        //仙人
        SENNIN_SCROLL_TITLE: "わしがキノコ村の仙人じゃ",
        SENNIN_SCROLL_MESSAGE:
            "今はわしの念力で雪を降らせ、魔物たちを一時的に凍らせておる。\n" +
            "しかし、わしの力もそろそろ限界じゃ…　じきにこの雪も止むじゃろう…\n" +
            "その時に、何か奴らと戦う方法があれば良いのじゃが…",

        //崖の看板
        SIGN_SCROLL_TITLE: "この先、崖",
        SIGN_SCROLL_MESSAGE:
            "この先、崖があるため進むべからず。\n" +
            "特に風が強い日は落下者多数。",

        //キノコ村入り口　看板
        SIGN2_SCROLL_TITLE: "ようこそ、キノコ村へ",
        SIGN2_SCROLL_MESSAGE:
            "この先、キノコ村。\n" +
            "村の奥には、英雄墓地があります。",

        //英雄墓地　看板
        SIGN3_SCROLL_TITLE: "伝説の英雄　ここに眠る",
        SIGN3_SCROLL_MESSAGE:
            "かつて、桃姫という姫が、亀の魔王にさらわれた。\n" +
            "その際、京都から来た一人の忍者が敵の大群を打ち負かし、\n" +
            "魔王から姫を救ったと言われている。\n",

        //修行僧
        MONK_SCROLL_TITLE: "私はキノコ村の修行僧です",
        MONK_SCROLL_MESSAGE:
            "先日、魔物の大群が急に村を襲いました…\n" +
            "その時、仙人が天候を操り、魔物達を氷漬けにしてくれたのです。\n" +
            "もう少し進むと、氷漬けになった魔物の大群がいます…",

        //少女１
        GIRL1_SCROLL_TITLE: "仙人様には会った？",
        GIRL1_SCROLL_MESSAGE:
            "ここから左に進むと、村のはずれに仙人様が住んでいるわ。\n" +
            "この雪も、悪い魔物を凍らせるために、仙人様が降らせているのよ。\n" +
            "でも仙人様も、ずっと雪を降らせておけるわけじゃないのよね…",

        //少女２
        GIRL2_SCROLL_TITLE: "怖いなぁ…",
        GIRL2_SCROLL_MESSAGE:
            "この雪がやんだら、魔物が襲ってくるんでしょ？\n" +
            "怖いなぁ…\n",

        //老婆
        OLD_SCROLL_TITLE: "英雄墓地はすぐそこさ",
        OLD_SCROLL_MESSAGE:
            "ここから右に進むと、かつて姫を救った英雄の墓があるよ。\n" +
            "その英雄は、どんな敵でも、一撃で踏みつけて倒すことができたそうな…\n" +
            "その秘術は、英雄の亡骸と一緒に墓に封印されているという話もあるが…",
    };

    const enMessages = {

        //PCの場合、キーボードを使う旨のメッセージ
        PC_KEYBOARD: "Please use [←], [↑], and [→] keys to play!",

        //屋根の上でポチに触った時のメッセージ
        POCHI_SCROLL_TITLE: "Sneak into the enemy's castle!",
        POCHI_SCROLL_MESSAGE:
            "Can you see the enemy's castle!?\n" +
            "Your mission is to sneak into the castle, and steal the secret scroll!\n" +
            "Don't touch the enemy! Good luck!",

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
    };

    if (lang === "Japanese") {
        messages = jpMessages;
    } else {
        messages = enMessages;
    }
}

export let messages;
