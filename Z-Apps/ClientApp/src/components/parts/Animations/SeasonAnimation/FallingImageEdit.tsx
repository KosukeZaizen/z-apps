import React, { useEffect, useState } from "react";
import { getFallingImages } from ".";
import { sendPost } from "../../../../common/functions";
import { compareObjects } from "../../../../common/util/compareObjects";
import { getCurrentToken, InputRegisterToken } from "../../InputRegisterToken";
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

            {isShown && (
                <Edit
                    close={() => {
                        setIsShown(false);
                    }}
                />
            )}
        </div>
    );
}

function Edit({ close }: { close: () => void }) {
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
        <div
            style={{
                border: "solid",
                padding: 30,
                maxHeight: 600,
                overflowY: "scroll",
                position: "fixed",
                top: 100,
                left: 300,
                backgroundColor: "ivory",
            }}
        >
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
                            <td>
                                <button
                                    onClick={() => {
                                        if (
                                            !window.confirm(
                                                "Do you really want to delete?"
                                            )
                                        ) {
                                            return;
                                        }
                                        setFallingImages(
                                            fallingImages.filter(
                                                im => im !== fi
                                            )
                                        );
                                    }}
                                >
                                    {"ー"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                onClick={() => {
                    setFallingImages([
                        ...fallingImages,
                        { name: "", alt: "", fileName: "" },
                    ]);
                }}
            >
                {"＋"}
            </button>
            <div style={{ marginTop: 40 }}>
                <button
                    style={{ width: 200 }}
                    onClick={() => {
                        saveFallingImages(fallingImages, () => {
                            document.location.reload();
                        });
                    }}
                >
                    {"Save"}
                </button>
                <InputRegisterToken style={{ marginLeft: 60, width: 100 }} />
                <button
                    style={{ marginLeft: 60, width: 200 }}
                    onClick={() => {
                        close();
                    }}
                >
                    close
                </button>
            </div>
        </div>
    );
}

async function saveFallingImages(
    fallingImages: fallingImage[],
    fncAfterSaving: () => void
) {
    if (!fallingImages.every(v => v.name && v.alt && v.fileName)) {
        window.alert("空欄があります");
        return;
    }

    const duplicatedValue = fallingImages.find(
        v =>
            fallingImages.filter(
                va =>
                    v.name === va.name ||
                    v.alt === va.alt ||
                    v.fileName === va.fileName
            ).length > 1
    );
    if (duplicatedValue) {
        alert(
            `重複エラー：「${duplicatedValue.name}」の内容と重複したレコードがあります。`
        );
        return;
    }

    if (!window.confirm("Do you really want to save?")) {
        return;
    }

    try {
        const result = await sendPost(
            {
                fallingImages,
                token: getCurrentToken(),
            },
            "/api/FallingImage/Save"
        );

        if (result === true) {
            alert("success!");
            if (typeof fncAfterSaving === "function") {
                fncAfterSaving();
            }
            return;
        }
    } catch (ex) {}

    alert("failed...");
}
