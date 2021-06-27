import * as React from "react";
import { Link } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import CardHeader from "reactstrap/lib/CardHeader";

class IncorrectTable extends React.Component<{
    incorrectList: any;
    changePage: any;
}> {
    render() {
        let top = "Characters you should remember:";
        let trList = [];
        for (let key in this.props.incorrectList) {
            trList.push(
                <tr key={key}>
                    <td>{this.props.incorrectList[key]}</td>
                    <td>　:　</td>
                    <td>{key}</td>
                </tr>
            );
        }

        return (
            <Card body inverse color="primary">
                <CardHeader tag="h3">{top}</CardHeader>
                <CardBody>
                    <table>
                        <tbody>{trList}</tbody>
                    </table>
                    <br />
                    <Button
                        onClick={() => {
                            this.props.changePage(1);
                        }}
                        type="button"
                    >
                        Retry
                    </Button>
                </CardBody>
            </Card>
        );
    }
}

class RelatedArticles extends React.Component<{
    objLinks: any;
}> {
    render() {
        let linkList = [];
        for (let key in this.props.objLinks) {
            linkList.push(
                <div key={key}>
                    <span className="font-large">
                        &nbsp; &nbsp;
                        <u>
                            <a
                                href={this.props.objLinks[key]}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {key} &gt;&gt;
                            </a>
                        </u>
                    </span>
                    <br />
                </div>
            );
        }

        return (
            <div className="related-articles">
                <b>
                    <span className="font-large">Related articles:</span>
                </b>
                <br />
                <br />
                {linkList}
            </div>
        );
    }
}

interface Props {
    score: number;
    maxChar: number;
    incorrectList: any;
    changePage: any;
    consts: any;
}
export default class Quiz3 extends React.Component<Props> {
    consts: {
        BUTTON_PRIMARY: "btn btn-primary btn-lg btn-block";
        BUTTON_SUCCESS: "btn btn-success btn-lg btn-block";
        BUTTON_DANGER: "btn btn-danger btn-lg btn-block";
        BUTTON_DARK: "btn btn-dark btn-lg btn-block";
    };

    constructor(props: Props) {
        super(props);
        this.consts = {
            BUTTON_PRIMARY: "btn btn-primary btn-lg btn-block",
            BUTTON_SUCCESS: "btn btn-success btn-lg btn-block",
            BUTTON_DANGER: "btn btn-danger btn-lg btn-block",
            BUTTON_DARK: "btn btn-dark btn-lg btn-block",
        };
    }

    render() {
        return (
            <div id="disp3">
                <h1>
                    Your score is:
                    <br />
                    {this.props.score}/{this.props.maxChar}
                </h1>
                <br />
                {Object.keys(this.props.incorrectList).length > 0 && (
                    <IncorrectTable
                        incorrectList={this.props.incorrectList}
                        changePage={(i: number) => {
                            this.props.changePage(i);
                        }}
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
                    <button className={this.consts.BUTTON_SUCCESS}>
                        {this.props.consts.OTHER_KANA_TYPE} Quiz!
                    </button>
                </Link>
                <br />
                <Link to={"/romaji-converter"}>
                    <button className={this.consts.BUTTON_DANGER}>
                        Romaji Converter
                    </button>
                </Link>
                <br />
                <RelatedArticles objLinks={this.props.consts.OBJ_LINKS} />
            </div>
        );
    }
}

export { Quiz3 };
