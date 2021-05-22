import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StopAnimation } from "../../../common/animation";
import { sendPost } from "../../../common/functions";
import { compareObjects } from "../../../common/util/compareObjects";
import { storyDesc } from "../../../types/stories";
import { getFallingImages } from "../../parts/Animations/SeasonAnimation";
import ShurikenProgress from "../../parts/Animations/ShurikenProgress";
import Head from "../../parts/Helmet";
import { HideFooter } from "../../parts/HideHeaderAndFooter/HideFooter";
import {
    getCurrentToken,
    InputRegisterToken,
} from "../../parts/InputRegisterToken";

function StoriesEditTop() {
    const [allStories, setAllStories] = useState<storyDesc[]>([]);
    const [initialStories, setInitialStories] = useState<storyDesc[]>([]);
    const [seasonNames, setSeasonNames] = useState<string[]>([]);

    const load = async () => {
        // stories
        const stories = await loadAllStories();
        setAllStories(stories);
        setInitialStories([...stories]);

        // seasons
        const seasons = await getFallingImages();
        setSeasonNames([...seasons.map(s => s.name), "none"]);
    };

    useEffect(() => {
        load();
    }, []);

    const changeStories = (storyId: number, keyValue: Partial<storyDesc>) => {
        setAllStories(
            allStories.map(story => {
                if (storyId === story.storyId) {
                    return { ...story, ...keyValue };
                }
                return { ...story };
            })
        );
    };

    const checkStoriesChanged = (s: storyDesc) =>
        !compareObjects(
            s,
            initialStories.find(st => st.storyId === s.storyId)
        );

    return (
        <div className="center">
            <StopAnimation />
            <HideFooter />
            <Head title="Japanese Folktales" noindex={true} />
            <div>
                <div className="breadcrumbs" style={{ textAlign: "left" }}>
                    <Link
                        to="/"
                        style={{ marginRight: "5px", marginLeft: "5px" }}
                    >
                        <span>Home</span>
                    </Link>
                    ＞
                    <span style={{ marginRight: "5px", marginLeft: "5px" }}>
                        Japanese Folktales
                    </span>
                </div>
                <h1
                    style={{
                        margin: "30px",
                        lineHeight: "40px",
                        fontWeight: "bold",
                    }}
                >
                    Japanese Folktales
                </h1>
                {allStories && allStories.length > 0 ? null : (
                    <div className="center">
                        <ShurikenProgress key="circle" size="20%" />
                    </div>
                )}
                <table style={{ textAlign: "left" }}>
                    <thead>
                        <tr
                            style={{
                                backgroundColor: "ivory",
                                textAlign: "center",
                            }}
                        >
                            <th style={{ border: "solid" }}>released</th>
                            <th style={{ border: "solid" }}>order</th>
                            <th style={{ border: "solid" }}>url</th>
                            <th style={{ border: "solid" }}>season</th>
                            <th style={{ border: "solid" }}>youtube</th>
                            <th style={{ border: "solid" }}>name to show</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allStories &&
                            [...allStories]
                                .sort((a, b) => (b.order || 0) - (a.order || 0))
                                .map(s => (
                                    <tr
                                        key={s.storyId}
                                        style={{
                                            border: "solid",
                                            backgroundColor: checkStoriesChanged(
                                                s
                                            )
                                                ? "red"
                                                : undefined,
                                        }}
                                    >
                                        <td style={{ textAlign: "center" }}>
                                            <input
                                                type="checkbox"
                                                checked={s.released}
                                                onChange={() => {
                                                    changeStories(s.storyId, {
                                                        released: !s.released,
                                                    });
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={s.order
                                                    ?.toString()
                                                    ?.replace(/^0+/, "")}
                                                onChange={ev => {
                                                    changeStories(s.storyId, {
                                                        order: Number(
                                                            ev.target.value
                                                        ),
                                                    });
                                                }}
                                                style={{ width: 100 }}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                value={s.storyName}
                                                onChange={ev => {
                                                    changeStories(s.storyId, {
                                                        storyName:
                                                            ev.target.value,
                                                    });
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <select
                                                value={s.season}
                                                onChange={ev => {
                                                    changeStories(s.storyId, {
                                                        season: ev.target.value,
                                                    });
                                                }}
                                            >
                                                {seasonNames.map(se => (
                                                    <option key={se}>
                                                        {se}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                value={s.youtube}
                                                onChange={ev => {
                                                    changeStories(s.storyId, {
                                                        youtube:
                                                            ev.target.value,
                                                    });
                                                }}
                                            />
                                        </td>
                                        <td>
                                            {initialStories.some(
                                                is => is.storyId === s.storyId
                                            ) ? (
                                                <Link
                                                    to={`/folktalesEdit/${s.storyName}`}
                                                >
                                                    {s.storyName
                                                        .split("--")
                                                        .join(" - ")
                                                        .split("_")
                                                        .join(" ")}
                                                </Link>
                                            ) : (
                                                s.storyName
                                                    .split("--")
                                                    .join(" - ")
                                                    .split("_")
                                                    .join(" ")
                                            )}
                                        </td>
                                    </tr>
                                ))}
                    </tbody>
                </table>
            </div>
            <div style={{ textAlign: "left" }}>
                <button
                    style={{ margin: 30 }}
                    onClick={() => {
                        setAllStories([
                            ...allStories,
                            {
                                storyId:
                                    Math.max(
                                        ...allStories.map(s => s.storyId)
                                    ) + 1,
                                storyName: "",
                                description: "description",
                                order: 0,
                                season: "none",
                                youtube: "",
                                released: false,
                            },
                        ]);
                    }}
                >
                    {"＋"}
                </button>
                <button
                    style={{ margin: 30 }}
                    onClick={() => {
                        save(allStories, () => {
                            load();
                        });
                    }}
                >
                    Save
                </button>
                <InputRegisterToken style={{ margin: 30, width: 40 }} />
            </div>
        </div>
    );
}

async function loadAllStories(): Promise<storyDesc[]> {
    try {
        const url = `api/StoriesEdit/GetAllStories`;
        const response = await fetch(url);

        return await response.json();
    } catch (e) {
        alert(e);
        return [];
    }
}

async function save(stories: storyDesc[], fncAfterSaving: () => void) {
    console.log("stories", stories);

    if (
        !stories.every(
            s => s.storyId && s.storyName && s.description && s.season
        )
    ) {
        alert(
            "「storyId」か「storyName」か「description」か「season」が、空白もしくはゼロの行があります。"
        );
        return;
    }

    const duplicatedGenre = stories.find(
        s =>
            stories.filter(
                st =>
                    s.storyName === st.storyName ||
                    (s.youtube && s.youtube === st.youtube)
            ).length > 1
    );
    if (duplicatedGenre) {
        alert(
            `重複エラー：「${duplicatedGenre.storyName}」のstoryNameもしくはyoutubeIdが重複しています。`
        );
        return;
    }

    if (!window.confirm("Do you really want to save?")) {
        return;
    }

    try {
        const result = await sendPost(
            {
                stories,
                token: getCurrentToken(),
            },
            "/api/StoriesEdit/SaveAllStories"
        );

        if (result === true) {
            if (typeof fncAfterSaving === "function") {
                fncAfterSaving();
            }
            alert("success!");
            return;
        }
    } catch (ex) {}

    alert("failed...");
}

export default StoriesEditTop;
