import * as React from 'react';
import './css/CharacterComment.css';
import * as consts from '../../common/consts';

type TProps = { imgNumber: number; screenWidth: number; comment: string | JSX.Element; };
export default function CharacterComment(props: TProps) {
    const { imgNumber, screenWidth, comment } = props;
    return (
        <div style={{
            display: "flex",
            maxWidth: 450,
            margin: "auto",
        }}>
            <div>
                <img
                    src={`${consts.BLOB_URL}/vocabulary-quiz/img/ninja${imgNumber}.png`}
                    alt="Japanese ninja"
                    style={{
                        width: screenWidth * 2 / 10,
                        maxWidth: 120,
                        height: "auto",
                        verticalAlign: "top",
                    }}
                />
            </div>
            <div className="chatting" style={{
                height: "auto",
                display: "flex",
                alignItems: "center",
            }}>
                <div className="says" style={{
                    width: (screenWidth * 7 / 10) - 15,
                    maxWidth: 420,
                }}>
                    {comment}
                </div>
            </div>
        </div>
    );
}