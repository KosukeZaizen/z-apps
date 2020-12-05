import * as React from "react";
import { Link } from "react-router-dom";
import { Markdown } from "../Markdown";
import PleaseScrollDown from "../PleaseScrollDown";

interface Props {
    consts: {
        KANA_TYPE: string;
        OTHER_KANA_TYPE: string;
    };
    changePage: (i: any) => void;
    setMaxChar: (i: any) => void;
}
export default class Quiz1 extends React.Component<Props> {
    consts: {
        START_BUTTON_PRIMARY: "btn btn-primary btn-lg btn-block";
        START_BUTTON_SUCCESS: "btn btn-success btn-lg btn-block";
        START_BUTTON_DANGER: "btn btn-danger btn-lg btn-block";
        START_BUTTON_DARK: "btn btn-dark btn-lg btn-block";
    };
    ref: React.RefObject<HTMLButtonElement>;

    constructor(props: Props) {
        super(props);
        this.consts = {
            START_BUTTON_PRIMARY: "btn btn-primary btn-lg btn-block",
            START_BUTTON_SUCCESS: "btn btn-success btn-lg btn-block",
            START_BUTTON_DANGER: "btn btn-danger btn-lg btn-block",
            START_BUTTON_DARK: "btn btn-dark btn-lg btn-block",
        };
        this.state = {
            maxChar: 0,
        };

        this.ref = React.createRef();
    }

    startGame(maxChar: number) {
        this.props.setMaxChar(maxChar);
        this.props.changePage(2);
    }

    render() {
        return (
            <div id="disp1">
                <h1>{this.props.consts.KANA_TYPE} Quiz</h1>
                <p>
                    Please bookmark this page to remember all{" "}
                    {this.props.consts.KANA_TYPE} characters!
                </p>
                <br />
                <button
                    id="btn10"
                    onClick={() => this.startGame(10)}
                    className={this.consts.START_BUTTON_PRIMARY}
                >
                    Random 10 characters
                </button>
                <br />

                <button
                    id="btn30"
                    onClick={() => this.startGame(30)}
                    className={this.consts.START_BUTTON_SUCCESS}
                >
                    Random 30 characters
                </button>
                <br />

                <button
                    id="btn102"
                    onClick={() => this.startGame(102)}
                    className={this.consts.START_BUTTON_DANGER}
                    ref={this.ref}
                >
                    All {this.props.consts.KANA_TYPE} characters
                </button>
                <br />
                <hr />
                {this.props.consts.KANA_TYPE === "Hiragana" ? (
                    <Markdown
                        style={{ textAlign: "left" }}
                        source={`
## What is Hiragana?
Japanese language has three types of characters.
The three are Hiragana, Katakana, and Kanji.
Hiragana is the most basic character in Japanese.
This is the first step for learning Japanese!

## How to use Hiragana Quiz
There are three options implemented in this app.
"Random 10 characters", "Random 30 characters", and “All Hiragana characters”.

### Random 10 characters mode
Please try this option first.
10 Hiragana characters will be shown randomly, and you will choose how to pronounce them with Romaji.
After starting the quiz, one Hiragana character will appear on the top of the screen, and below it, you will see 4 options where Romaji characters are written.
You can choose the correct pronunciation of the Hiragana character from the 4 options.

Even if you make a mistake, don’t worry because there will be only 10 questions in this mode.
After you finish all 10 questions, you can check your score.
Also, you can check the list of Hiragana characters in which you didn’t choose the correct answer.
Please remember the Hiragana characters in which you didn’t choose the correct option.
After remembering, please try again!

### Random 30 characters mode
If you can pass the “Random 10 characters mode”, please try “Random 30 characters mode”.
Since you have already gotten use to this app, you can probably proceed with this quiz smoothly.
If you make mistakes, please remember them after the quiz.
The list of the Hiragana characters that you didn’t pass will be shown at the end of the quiz in this mode as well.

### All Hiragana characters mode
If you got a perfect score in the other two modes, please try “All Hiragana characters mode”!
This quiz may be long because there are 102 questions included in this mode.
Even if it’s hard, don’t give up because when you get a perfect score, you will be a Hiragana master!

## The next step after taking this Hiragana Quiz
After you get a perfect score in “All Hiragana characters mode”, the next step is remembering Katakana.
Since you already remembered all of the Hiragana characters using this Hiragana Quiz, remembering the Katakana characters will be quite easy for you.
Many Katakana characters look like Hiragana characters.
So, the knowledge you obtained from the Hiragana Quiz will be useful.
Please proceed to the next step by clicking the “Katakana Quiz” button below!
`}
                    />
                ) : (
                    <Markdown
                        style={{ textAlign: "left" }}
                        source={`
## What is Katakana?
Japanese language has three types of characters.
The three characters are Hiragana, Katakana, and Kanji.
Hiragana is the most basic character in Japanese.
After remembering Hiragana, you should start to learn Katakana.

Katakana and Hiragana look very similar.
Basically, we use Hiragana more than Katakana.

### When do Japanese people use Katakana?
Katakana is used in the limited cases below:
- Loan-words from foreign countries
- Onomatopoeic word

We use Katakana for the two purposes above.
If you want to know more detailed information, please check this link:
 [When should we use Katakana? >>](https://www.lingual-ninja.com/2018/08/katakana-chart.html#Katakana-chart6)

## What you should do before taking this Katakana Quiz

Before remembering Katakana, you should remember Hiragana.
If you still don't remember all the Hiragana characters,
 please try this Hiragana Quiz: [Hiragana Quiz >>](/hiragana-quiz)

## How to use Katakana Quiz
How you use this Katakana Quiz is the same way you use the Hiragana Quiz.
If you have some issues when using the Katakana Quiz,
 please check the explanation in the Hiragana Quiz page:
 [Hiragana Quiz >>](/hiragana-quiz)

## The next step after taking this Katakana Quiz
After you get a perfect score in “All Katakana characters mode”,
 the next step is remembering vocabulary and practice reading and listening.

### Remembering vocabulary

This website has basic vocabulary lists and quizzes for N5 exam.
I recommend you to remember basic N5 vocabulary using this quiz:
 [Vocabulary Quiz >>](/vocabulary-quiz)

### Practice reading and listening
If you want to enjoy Japanese stories while remembering vocabulary,
 there is a good way.
This website has a reading practice tool called "[Japanese Folktales](/folktales)".
You can read Japanese folktales in Romaji, Hiragana, and Katakana.
Also, you can listen to the stories spoken by a native Japanese speaker.
Please try to get used to listening and reading Japanese:
 [Japanese Folktales >>](/folktales)

I hope this application helps you to study Japanese!
`}
                    />
                )}
                <br />
                <Link
                    to={
                        "/" +
                        this.props.consts.OTHER_KANA_TYPE.toLowerCase() +
                        "-quiz"
                    }
                >
                    <button
                        id="btnOther"
                        onClick={() => "start(102)"}
                        className={this.consts.START_BUTTON_DARK}
                    >
                        {this.props.consts.OTHER_KANA_TYPE} Quiz
                    </button>
                </Link>
                <br />
                <PleaseScrollDown criteriaRef={this.ref} targetId="disp1" />
            </div>
        );
    }
}

export { Quiz1 };
