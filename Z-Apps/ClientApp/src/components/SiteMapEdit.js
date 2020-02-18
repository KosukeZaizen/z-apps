import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/SiteMapEditStore';
import Head from './parts/Helmet';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as consts from './common/consts';

export default class SiteMapEdit extends React.Component {

    constructor(props) {
        super(props);

        const { params } = props.match;
        this.state = {
            sitemap: [],
        };

        this.screenHeight = parseInt(window.innerHeight, 10);

        this.loadSitemap();
        //this.props.setInitialToken();
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
                            <Sitemaps
                                sitemap={sitemap}
                                handleChangeSitemap={this.props.handleChangeSitemap}
                                addLine={this.props.addLine}
                                removeLine={this.props.removeLine}
                            />
                            :
                            <center>
                                <CircularProgress key="circle" size="20%" />
                            </center>
                    }
                    <input
                        type="text"
                        value={this.props.token}
                        onChange={this.props.handleChangeToken}
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
                            onClick={this.props.register}
                        >
                            <b>Register</b>
                        </button>
                    </div>
                </div>
            </center>
        );
    }
};
class Sitemaps extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        const { sitemap } = this.props;
        return (
            <div style={{ textAlign: "left" }}>
                {
                    sitemap && sitemap.map((s, i) =>
                        <SitemapInfo
                            s={s}
                            i={i}
                            key={s.loc}
                        />
                    )
                }
            </div>
        );
    }
};

class SitemapInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        const { s, i } = this.props;
        return (
            <span>
                <table style={{ width: "100%" }}>
                    <tbody>
                        <tr style={{ backgroundColor: "black", color: "#757575" }}>
                            <td width="20px"><b>loc:　</b></td>
                            <td><input
                                type="text"
                                value={s.loc}
                                onChange={(e) => this.props.handleChangeSitemap(e, i, "loc")}
                                style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                            /></td>
                        </tr>
                        <tr style={{ backgroundColor: "black", color: "#757575" }}>
                            <td width="20px"><b>lastmod:　</b></td>
                            <td><input
                                type="text"
                                value={s.lastmod}
                                onChange={(e) => this.props.handleChangeSentence(e, i, "hiragana")}
                                style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                            /></td>
                        </tr>
                    </tbody>
                </table>
                <button
                    style={{ marginTop: 10, marginBottom: 2, height: 28, paddingTop: 0, color: "black" }}
                    className="btn btn-dark btn-xs"
                    onClick={() => this.props.addLine(s.lineNumber)}
                >
                    <b>Add Line</b>
                </button>

                <div style={{ textAligh: "right", float: "right" }}>
                    <button
                        style={{ marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0, color: "black" }}
                        className="btn btn-dark btn-xs"
                        onClick={() => this.props.removeLine(s.loc)}
                    >
                        <b>Remove Sentence</b>
                    </button>
                </div>

                <br /><br />
                <hr />
            </span>
        );
    }
};