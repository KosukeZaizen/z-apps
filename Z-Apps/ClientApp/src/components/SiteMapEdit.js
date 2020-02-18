import React from 'react';
import { Link } from 'react-router-dom';
import Head from './parts/Helmet';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as commonFnc from './common/functions';
import * as consts from './common/consts';

export default class SiteMapEdit extends React.Component {

    constructor(props) {
        super(props);

        //セーブデータがあればそれを設定
        const saveData = localStorage.getItem("folktales-register-token");
        const objSaveData = JSON.parse(saveData);

        let token;
        if (objSaveData) {
            token = objSaveData.token || "";
        } else {
            token = "";
        }

        this.state = {
            sitemap: [],
            token: token,
        };

        this.screenHeight = parseInt(window.innerHeight, 10);

        this.loadSitemap();
    }

    loadSitemap = async () => {
        try {
            const url = `api/SiteMapEdit/GetSiteMap`;
            const response = await fetch(url);

            const sitemap = await response.json();
            console.log(sitemap);

            this.setState({ sitemap: sitemap });

        } catch (e) {
            //window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
    }

    handleChangeSitemap = (event, i, item) => {
        const s = this.state.sitemap.concat();
        s[i][item] = event.target.value.split(" ").join("");

        this.setState({ sitemap:s });
    }

    addLine = (i) => {
        const s = this.state.sitemap.concat();
        s.splice(i+1, 0, { loc: "", lastmod: "" });
        console.log(s);

        this.setState({ sitemap: s });
    }

    removeLine = (i) => {
        const s = this.state.sitemap.filter((l,m) => m!=i);
        console.log(s);

        this.setState({ sitemap: s });
    }

    register = async () => {
        try {
            if (window.confirm('Are you sure that you want to register?')) {
                const { sitemap, token } = this.state;

                console.log({ sitemap, token });

                const result = await commonFnc.sendPost({ sitemap, token }, "api/SiteMapEdit/RegisterSiteMap");

                if (result) {
                    alert("Success to save!");
                } else {
                    alert("Failed to save...");
                }
            }
        } catch (ex) {
            console.log(ex);
            alert("Error!");
            alert("Error!");
        }
    }

    changeToken = (event) => {
        const token = event.target.value;
        this.setState({token: token});
        localStorage.setItem("folktales-register-token", JSON.stringify({ token }));
    }

    render() {
        const { sitemap } = this.state;
        return (
            <center>
                <Head
                    title={"Edit Sitemap"}
                    noindex={true}
                />
                <div style={{ width: "100%", height: "100%", backgroundColor: "#1b181b", position: "fixed", top: 0, right: 0, zIndex: "-1" }}>
                </div>
                <div style={{ maxWidth: 1000 }}>
                    <div className="breadcrumbs" style={{ textAlign: "left", color: "white" }}>
                        <Link to="/" style={{ marginRight: "5px", marginLeft: "5px" }}>
                            <span>
                                Home
                            </span>
                        </Link>
                        ＞
                        <Link to="/folktalesEdit" style={{ marginRight: "5px", marginLeft: "5px" }}>
                            <span>
                                Japanese Folktales
                            </span>
                        </Link>
                        ＞
                        <span style={{ marginRight: "5px", marginLeft: "5px" }}>
                            edit sitemap
                        </span>
                    </div>
                    <h1 style={{
                        margin: "30px",
                        lineHeight: "30px",
                        color: "#eb6905",
                    }}>
                        <b>Edit Sitemap</b>
                    </h1>
                    <br />
                    {
                        this.state.sitemap.length > 0 ?
                            <div style={{ textAlign: "left" }}>
                                {
                                    sitemap && sitemap.map((s, i) =>
                                        <SitemapInfo
                                            s={s}
                                            i={i}
                                            key={i}
                                            handleChangeSitemap={this.handleChangeSitemap}
                                            addLine={this.addLine}
                                            removeLine={this.removeLine}
                                        />
                                    )
                                }
                            </div>
                            :
                            <center>
                                <CircularProgress key="circle" size="20%" />
                            </center>
                    }
                    <input
                        type="text"
                        value={this.state.token}
                        onChange={this.changeToken}
                    />
                    <br />
                    <div style={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        zIndex: 99999999,
                        backgroundColor: "black",
                        width: "100%",
                    }}>
                        <span style={{ color: "white" }}>Count: {sitemap.length}</span>
                        "　"
                    <button
                            style={{ marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0, color: "black" }}
                            className="btn btn-dark btn-xs"
                            onClick={this.register}
                        >
                            <b>Register</b>
                        </button>
                    </div>
                </div>
            </center>
        );
    }
};

class SitemapInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    checkInput = (s) => {
        try {
            if (s.loc.indexOf("https://z-apps.lingual-ninja.com") < 0) return "The URL is strange.";

            if (s.lastmod.length != 25) return "Length of lastmod need to be 25.";

            const dateAndTime = s.lastmod.split("T");

            if (dateAndTime.length != 2) return "lastmod needs T";

            const date = dateAndTime[0];
            const time = dateAndTime[1];

            if (date.length != 10) return "The length of the date part needs to be 10.";

            const arrDate = date.split("-");

            if (!(Number(arrDate[0]) >= 2019 && Number(arrDate[0]) < 2030)) return "Year is strange.";
            if (!(Number(arrDate[1]) >= 1 && Number(arrDate[1]) <= 12)) return "Month is strange.";
            if (!(Number(arrDate[2]) >= 1 && Number(arrDate[2]) <= 31)) return "Date is strange.";

            const arrTime = time.split("+");

            if (arrTime[1] != "09:00") return "lastmod needs +09:00";

            const arrTime2 = arrTime[0].split(":");

            if (!(Number(arrTime2[0]) >= 0 && Number(arrTime2[0]) <= 24)) return "Hour needs to be 0 to 24.";
            if (!(Number(arrTime2[1]) >= 0 && Number(arrTime2[1]) <= 59)) return "Minute needs to be 0 to 59.";
            if (!(Number(arrTime2[2]) >= 0 && Number(arrTime2[2]) <= 99)) return "Second needs to be 0 to 99.";

        } catch (ex) {
            return ex.message;
        }

        return "";
    }

    render() {
        const { s, i, handleChangeSitemap, addLine, removeLine } = this.props;
        return (
            <span>
                <span style={{ color: "red" }}>{this.checkInput(s)}</span>
                <table style={{ width: "100%" }}>
                    <tbody>
                        <tr style={{ backgroundColor: "black", color: "#757575" }}>
                            <td width="20px"><b>loc:　</b></td>
                            <td><input
                                type="text"
                                value={s.loc}
                                onChange={(e) => handleChangeSitemap(e, i, "loc")}
                                style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                            /></td>
                        </tr>
                        <tr style={{ backgroundColor: "black", color: "#757575" }}>
                            <td width="20px"><b>lastmod:　</b></td>
                            <td><input
                                type="text"
                                value={s.lastmod}
                                onChange={(e) => handleChangeSitemap(e, i, "lastmod")}
                                style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                            /></td>
                        </tr>
                    </tbody>
                </table>
                <button
                    style={{ marginTop: 10, marginBottom: 2, height: 28, paddingTop: 0, color: "black" }}
                    className="btn btn-dark btn-xs"
                    onClick={() => addLine(i)}
                >
                    <b>Add Line</b>
                </button>

                <div style={{ textAligh: "right", float: "right" }}>
                    <button
                        style={{ marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0, color: "black" }}
                        className="btn btn-dark btn-xs"
                        onClick={() => removeLine(i)}
                    >
                        <b>Remove Line</b>
                    </button>
                </div>

                <br /><br />
                <hr />
            </span>
        );
    }
};