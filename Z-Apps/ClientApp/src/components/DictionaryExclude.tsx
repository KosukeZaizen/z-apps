import { useEffect } from "react";

type Props = {
    location: { pathname: string };
    match: { params: { word: string } };
};
export default function Exclude(props: Props) {
    useEffect(() => {
        const {
            match: {
                params: { word },
            },
        } = props;

        if (!window.confirm(`Do you really want to exclude "${word}"?`)) {
            return;
        }

        const saveData = localStorage.getItem("folktales-register-token");
        const objSaveData = saveData && JSON.parse(saveData);
        const token = objSaveData?.token || "";

        const formData = new FormData();
        formData.append("word", word);
        formData.append("token", token);

        fetch("/api/Wiki/Exclude", {
            method: "POST",
            body: formData,
        });
    }, []);

    return null;
}
