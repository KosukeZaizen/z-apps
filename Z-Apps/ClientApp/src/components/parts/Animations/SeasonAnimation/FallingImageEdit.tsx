import React, { useEffect, useState } from "react";
import { getFallingImages } from ".";
import { compareObjects } from "../../../../common/util/compareObjects";
import { fallingImage } from "./type";

export function FallingImageEdit() {
    const [isShown, setIsShown] = useState(false);

    return (
        <div style={{ margin: 50 }}>
            <button
                onClick={() => {
                    setIsShown(!isShown);
                }}
            >
                画像マスタ編集
            </button>

            {isShown && <Edit />}
        </div>
    );
}

function Edit() {
    const [fallingImages, setFallingImages] = useState<fallingImage[]>([]);
    const [initialFallingImages, setInitialFallingImages] = useState<
        fallingImage[]
    >([]);

    useEffect(() => {
        const load = async () => {
            const loadedImages = await getFallingImages();
            setFallingImages(loadedImages);
            setInitialFallingImages(loadedImages);
        };
        load();
    }, []);

    const changeValue = (
        targetFallingImage: fallingImage,
        propName: keyof fallingImage,
        newVal: fallingImage[keyof fallingImage]
    ) => {
        setFallingImages(
            fallingImages.map(image => {
                if (targetFallingImage === image) {
                    return {
                        ...image,
                        [propName]: newVal,
                    };
                }
                return image;
            })
        );
    };

    return (
        <div style={{ border: "solid", padding: 30 }}>
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>alt</th>
                        <th>fileName</th>
                    </tr>
                </thead>
                <tbody>
                    {fallingImages.map((fi, i) => (
                        <tr
                            style={{
                                backgroundColor: compareObjects(
                                    fi,
                                    initialFallingImages[i]
                                )
                                    ? undefined
                                    : "red",
                            }}
                        >
                            <td>
                                <input
                                    type="text"
                                    value={fi.name}
                                    onChange={ev => {
                                        const newVal = ev.target.value;
                                        changeValue(fi, "name", newVal);
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={fi.alt}
                                    onChange={ev => {
                                        const newVal = ev.target.value;
                                        changeValue(fi, "alt", newVal);
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={fi.fileName}
                                    onChange={ev => {
                                        const newVal = ev.target.value;
                                        changeValue(fi, "fileName", newVal);
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
