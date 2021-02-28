import * as React from "react";
import { Link } from "react-router-dom";
import ShurikenProgress from "../parts/Animations/ShurikenProgress";
import Head from "../parts/Helmet";

type TClientOpeLog = {
    time: Date;
    url: string;
    operationName: string;
    userId: string;
    parameters: string;
};
type TClient = {
    userId: string;
    userName: string;
    isAdmin: boolean;
};
export default class OpeLogTable extends React.Component<
    {},
    {
        page: number;
        userId: string;
        clientOpeLogs: TClientOpeLog[];
        allClients: TClient[];
    }
> {
    screenHeight: number;

    constructor(props: {}) {
        super(props);

        this.state = {
            page: 1,
            userId: "",
            clientOpeLogs: [],
            allClients: [],
        };

        this.screenHeight = window.innerHeight;

        this.loadSitemap();
    }

    loadSitemap = async () => {
        try {
            fetch(`api/SystemBase/GetAllClients`).then(res => {
                res.json().then(allClients => {
                    this.setState({ allClients });
                });
            });

            fetch(`api/SystemBase/GetOpeLogs`).then(res => {
                res.json().then(clientOpeLogs => {
                    this.setState({ clientOpeLogs });
                });
            });
        } catch (e) {
            //window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
    };

    render() {
        const { page, clientOpeLogs, allClients, userId } = this.state;
        const userIds = clientOpeLogs
            .map(log => log.userId)
            .filter((x, i, self) => self.indexOf(x) === i);

        const tableStyle = { width: "100%", border: "1px solid gray" };

        let content;
        if (page === 1) {
            content =
                userIds?.length > 0 ? (
                    <div style={{ textAlign: "left" }}>
                        <table style={tableStyle}>
                            <tbody>
                                <tr style={tableStyle}>
                                    <th></th>
                                    <th>{"UserName"}</th>
                                    <th>{"last access"}</th>
                                </tr>
                                {userIds.map(id => {
                                    const logs = clientOpeLogs?.filter(
                                        l => l.userId === id
                                    );

                                    let idOrName;
                                    if (
                                        logs.some(l =>
                                            l.parameters.includes("Googlebot")
                                        )
                                    ) {
                                        idOrName = "Google Bot";
                                    } else if (
                                        logs.some(l =>
                                            l.parameters.includes(
                                                "facebookexternalhit"
                                            )
                                        )
                                    ) {
                                        idOrName = "Facebook Bot";
                                    } else {
                                        idOrName =
                                            allClients
                                                ?.filter(c => id === c.userId)
                                                ?.pop()?.userName ||
                                            id.split(":").pop();
                                    }

                                    return (
                                        <tr key={id} style={tableStyle}>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        this.setState({
                                                            page: 2,
                                                            userId: id,
                                                        });
                                                    }}
                                                    style={{ color: "black" }}
                                                >
                                                    Check
                                                </button>
                                            </td>
                                            <td>{idOrName}</td>
                                            <td>
                                                {logs
                                                    .reduce((log1, log2) =>
                                                        log1.time > log2.time
                                                            ? log1
                                                            : log2
                                                    )
                                                    .time.toString()
                                                    .substr(5)
                                                    .split(".")[0]
                                                    .replace("T", " ")}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="center">
                        <ShurikenProgress key="circle" size="20%" />
                    </div>
                );
        } else if (page === 2) {
            const idOrName =
                allClients?.filter(c => userId === c.userId)?.pop()?.userName ||
                userId.split(":").pop();
            content = (
                <>
                    <h2>{idOrName}</h2>
                    <br />
                    <button
                        style={{ color: "black" }}
                        onClick={() => this.setState({ page: 1 })}
                    >
                        return
                    </button>
                    <br />
                    <table
                        style={{
                            width: "200px",
                            border: "1px solid white",
                            borderColor: "white",
                        }}
                    >
                        <tbody>
                            <tr>
                                <th>time</th>
                                <th>operation</th>
                                <th>url</th>
                                <th>param</th>
                            </tr>
                            {clientOpeLogs
                                ?.filter(log => log.userId === userId)
                                .map(log => {
                                    return (
                                        <tr key={log.time.toString()}>
                                            <td style={tableStyle}>
                                                {log.time
                                                    .toString()
                                                    .substr(5)
                                                    .split(".")[0]
                                                    .replace("T", " ")}
                                            </td>
                                            <td style={tableStyle}>
                                                {log.operationName}
                                            </td>
                                            <td style={tableStyle}>
                                                {log.url
                                                    .replace(
                                                        "https://www.lingual-ninja.com",
                                                        ""
                                                    )
                                                    .split("/")
                                                    .join("/\n")
                                                    .split("_")
                                                    .join("_\n")}
                                            </td>
                                            <td style={tableStyle}>
                                                {log.parameters}
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </>
            );
        }

        return (
            <div className="center">
                <Head title={"ClientOpeLog Table"} noindex={true} />
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#1b181b",
                        position: "fixed",
                        top: 0,
                        right: 0,
                        zIndex: -1,
                    }}
                ></div>
                <div style={{ maxWidth: 1000 }}>
                    <div
                        className="breadcrumbs"
                        style={{ textAlign: "left", color: "white" }}
                    >
                        <Link
                            to="/"
                            style={{ marginRight: "5px", marginLeft: "5px" }}
                        >
                            <span>Home</span>
                        </Link>
                        ＞
                        <span style={{ marginRight: "5px", marginLeft: "5px" }}>
                            ClientOpeLog Table
                        </span>
                    </div>
                    <h1
                        style={{
                            margin: "30px",
                            lineHeight: "30px",
                            color: "#eb6905",
                        }}
                    >
                        <b>ClientOpeLog Table</b>
                    </h1>
                    <br />
                    <div style={{ color: "white" }}>{content}</div>
                </div>
            </div>
        );
    }
}
