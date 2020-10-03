//@ts-nocheck
//------------------------------------------------------------
//
//　日本語・英語のメッセージを保持し、必要なメッセージを返すモジュール
//
//------------------------------------------------------------

export function setLang(lang) {
    const jpMessages = {
        //PCの場合、キーボードを使う旨のメッセージ
        PC_KEYBOARD:
            "PCでは、キーボードの「←」「↑」「→」キーで操作をしてください。",

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
        TOBIISHI_SCROLL_TITLE: "飛び石の術",
        TOBIISHI_SCROLL_MESSAGE:
            "秘技、飛び石の術が使えるようになる巻物。\n" +
            "岩を見つけたら、上に乗ってみるがよい。\n" +
            "目的の地にたどり着くことができるであろう。",

        //半化の術
        HANKA_SCROLL_TITLE: "半化の術",
        HANKA_SCROLL_MESSAGE:
            "秘技、半化の術が使えるようになる巻物。\n" +
            "青いキノコに触れることで体が小さくなる。\n" +
            "赤いキノコに触れると、元の大きさに戻る。",

        //踏みつけの術
        HUMITSUKE_SCROLL_TITLE: "踏みつけの術",
        HUMITSUKE_SCROLL_MESSAGE:
            "伝説の英雄が用いた秘技、\n" +
            "「踏みつけの術」が使えるようになる巻物。\n" +
            "飛び上がって敵を踏みつけることにより、一撃で息の根を止める。",

        //氷溶かしの術
        MELT_SCROLL_TITLE: "氷溶かしの術",
        MELT_SCROLL_MESSAGE:
            "氷に触れることで、その氷を解かすことができる術。\n" +
            "氷のブロックに触れてみるがよい。",

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

        //シノ4
        SHINO4_SCROLL_TITLE: "敵の親玉はすぐそこよ",
        SHINO4_SCROLL_MESSAGE:
            "崖の向こう側に、敵の親玉がいるわ。\n" +
            "あいつさえ倒せば、魔物たちは逃げていくはずよ。\n" +
            "さぁ、キノコ村を救うわよ！",

        //仙人
        SENNIN_SCROLL_TITLE: "わしがキノコ村の仙人じゃ",
        SENNIN_SCROLL_MESSAGE:
            "今はわしの念力で雪を降らせ、魔物たちを一時的に凍らせておる。\n" +
            "しかし、わしの力もそろそろ限界じゃ…　じきにこの雪も止むじゃろう…\n" +
            "その時に、何か奴らと戦う方法があれば良いのじゃが…",

        //仙人2
        SENNIN2_SCROLL_TITLE: "これで魔物たちと戦えるな…",
        SENNIN2_SCROLL_MESSAGE:
            "伝説の英雄の秘技を身に着けたのじゃな。\n" +
            "わしの力はもう限界じゃ…もうしばらく雪を降らせることはできない…\n" +
            "伝説の秘技で敵を踏みつけて、あの魔物たちを退治してくれ！",

        //仙人3
        SENNIN3_SCROLL_TITLE: "ありがとう！",
        SENNIN3_SCROLL_MESSAGE:
            "お主のおかげでキノコ村は救われた。\n" +
            "村を代表して礼を言わせてくれ！\n" +
            "お主は村を救った英雄として、語り継がれるじゃろう！",

        //崖の看板
        SIGN_SCROLL_TITLE: "この先、崖",
        SIGN_SCROLL_MESSAGE:
            "この先、崖があるため進むべからず。\n" +
            "特に風が強い日は落下者多数。",

        //キノコ村入り口　看板
        SIGN2_SCROLL_TITLE: "ようこそ、キノコ村へ",
        SIGN2_SCROLL_MESSAGE:
            "この先、キノコ村。\n村の奥には、英雄墓地があります。",

        //英雄墓地　看板
        SIGN3_SCROLL_TITLE: "伝説の英雄　ここに眠る",
        SIGN3_SCROLL_MESSAGE:
            "かつて、姫が魔物にさらわれた。\n" +
            "その際、京都から来た一人の忍者が敵の大群を打ち負かし、\n" +
            "姫を救ったと言われている。\n",

        //仙人の家の前　看板
        SIGN4_SCROLL_TITLE: "仙人の家",
        SIGN4_SCROLL_MESSAGE: "左に進むと、天候を操る仙人の家",

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

        //初期のポチのメッセージ
        POCHI_SCROLL_TITLE: "Come to my house",
        POCHI_SCROLL_MESSAGE:
            "What a strange occurrence...snow in this area?\n" +
            "There's something I want you to research.\n" +
            "Push [＜] button, and come to my house.",

        //家でのポチ
        POCHI2_SCROLL_TITLE: "How strange..snow in this season?",
        POCHI2_SCROLL_MESSAGE:
            "There is a hermit who can control the weather\n" +
            "in the Mushroom Village. Maybe, something is happening there...\n" +
            "Please read the scroll at the altar, and go to the village!",

        //飛び石の術
        TOBIISHI_SCROLL_TITLE: "The Art of Flying Stone",
        TOBIISHI_SCROLL_MESSAGE:
            "Now, you can use the secret skill, Flying Stone.\n" +
            "When you see a stone, please hitch a ride on it.\n" +
            "You will arrive at your destination!",

        //半化の術
        HANKA_SCROLL_TITLE: "The Art of Small Mushroom",
        HANKA_SCROLL_MESSAGE:
            "Now, you can use the secret skill, Small Mushroom.\n" +
            "If you touch a blue mushroom, your body will become small!\n" +
            "If you touch a red mushroom, you will be normal size.",

        //踏みつけの術
        HUMITSUKE_SCROLL_TITLE: "The Art of Jump Crush",
        HUMITSUKE_SCROLL_MESSAGE:
            "Now, you can use the secret skill of the legendary hero.\n" +
            "If you jump on the enemy, they will die.",

        //氷溶かしの術
        MELT_SCROLL_TITLE: "The Art of Melting Ice",
        MELT_SCROLL_MESSAGE:
            "Now, you can melt the ice by touching it.\n" +
            "Please touch the ice.",

        //シノ
        SHINO_SCROLL_TITLE: "The Mushroom Village is near!",
        SHINO_SCROLL_MESSAGE:
            "If you continue right, you can meet the hermit.\n" +
            "You can recognize him because his face is red, and his nose is long.\n" +
            "Is he controlling the weather, and making it snow..??",

        //シノ2
        SHINO2_SCROLL_TITLE: "Are these the frozen monsters?",
        SHINO2_SCROLL_MESSAGE:
            "The hermit is making it snow to freeze the monsters...\n" +
            "However, the monsters can't die from being frozen...\n" +
            "If the ice melts, they will terrorize again.",

        //シノ3
        SHINO3_SCROLL_TITLE: "Oh, here is the Mushroom Village",
        SHINO3_SCROLL_MESSAGE:
            "While the hermit is making it snow,\n" +
            "we need to find the way to defeat the monsters...\n" +
            "Maybe, they will unfreeze soon...",

        //シノ4
        SHINO4_SCROLL_TITLE: "The boss is just there",
        SHINO4_SCROLL_MESSAGE:
            "Beyond the cliff, there is the main boss.\n" +
            "If you can defeat him, we will win!\n" +
            "Let's save the Mushroom Village!!",

        //仙人
        SENNIN_SCROLL_TITLE: "I am the hermit",
        SENNIN_SCROLL_MESSAGE:
            "Now, I am making it snow to freeze the monsters.\n" +
            "However, my power is now weak. I can't continue much longer.\n" +
            "We need a plan to fight them when the snow stops...",

        //仙人2
        SENNIN2_SCROLL_TITLE: "Now, you can fight the monsters",
        SENNIN2_SCROLL_MESSAGE:
            "You gained the secret skill to kill them.\n" +
            "My powoer is drained... I can't make it snow anymore...\n" +
            "Please crush them by jumping on them..!!",

        //仙人3
        SENNIN3_SCROLL_TITLE: "Thank you!",
        SENNIN3_SCROLL_MESSAGE:
            "You saved the village!!\n" +
            "I want to say thank you!\n" +
            "You will be the village's hero now!!!",

        //崖の看板
        SIGN_SCROLL_TITLE: "Caution!",
        SIGN_SCROLL_MESSAGE:
            "There is a cliff.\n" +
            "You should not go this way.\n" +
            "When the wind is strong, you can fall.",

        //キノコ村入り口　看板
        SIGN2_SCROLL_TITLE: "Welcome to the Mushroom Village",
        SIGN2_SCROLL_MESSAGE:
            "Here is the Mushroom Village.\n" +
            "Deep in the village, lies a hero's grave.",

        //英雄墓地　看板
        SIGN3_SCROLL_TITLE: "The legendary hero is sleeping here",
        SIGN3_SCROLL_MESSAGE:
            "When a princess was kidnapped, the hero saved her.\n" +
            "Alone, he defeated many enemies.",

        //仙人の家の前　看板
        SIGN4_SCROLL_TITLE: "The hermit's house",
        SIGN4_SCROLL_MESSAGE: "If you go left, there is the hermit's house.",

        //修行僧
        MONK_SCROLL_TITLE: "I am a monk from the village",
        MONK_SCROLL_MESSAGE:
            "A few days ago, many monsters attacked our village.\n" +
            "During that time, the hermit made it snow to freeze the monsters.\n" +
            "If you keep going, you will see the frozen monsters.",

        //少女１
        GIRL1_SCROLL_TITLE: "Did you meet the hermit?",
        GIRL1_SCROLL_MESSAGE:
            "If you go left, you can meet the hermit.\n" +
            "He is making it snow!\n" +
            "But he can't make it last forever...",

        //老婆
        OLD_SCROLL_TITLE: "The hero's grave is just over there",
        OLD_SCROLL_MESSAGE:
            "If you keep going right, you will see the hero's grave.\n" +
            "The hero could kill any monster just by jumping on them...\n" +
            "They say the skill is sealed in his grave...",
    };

    if (lang === "Japanese") {
        messages = jpMessages;
    } else {
        messages = enMessages;
    }
}

export let messages;
