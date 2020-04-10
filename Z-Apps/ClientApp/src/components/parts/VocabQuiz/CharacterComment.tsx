import * as React from 'react';
import * as consts from '../../common/consts';

type TProps = { imgNumber: number; screenWidth: number; comment: string; };
export default function CharacterComment(props: TProps) {
    const { imgNumber, screenWidth, comment } = props;
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: 450,
        }}>
            <div>
                <img
                    src={`${consts.BLOB_URL}/vocabulary-quiz/img/ninja${imgNumber}.png`}
                    alt="ninja"
                    style={{
                        width: screenWidth * 2 / 10,
                        maxWidth: 120,
                        height: "auto"
                    }}
                />
            </div>
            <div className="chatting" style={{ verticalAlign: "middle", }}>
                <div className="says" style={{
                    width: screenWidth * 7 / 10,
                    maxWidth: 420,
                }}>
                    <p>{comment}</p>
                </div>
            </div>
        </div>
    );
}