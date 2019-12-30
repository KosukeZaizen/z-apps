import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import './PleaseScrollDown.css';

export default class PleaseScrollDown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pleaseScrollDown: true,
        }

        window.addEventListener('scroll', this.judge);
    }

    componentDidMount() {
        this.judge();
    }

    componentDidUpdate(preciousProps) {
        if (preciousProps.criteriaRef.current !== this.props.criteriaRef.current) {
            this.judge();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.judge);
    }

    judge = () => {
        const { screenHeight, criteriaRef } = this.props;
        const elem = criteriaRef && criteriaRef.current;
        if (!elem) return;

        const height = screenHeight || parseInt(window.innerHeight, 10);

        const offsetY = elem.getBoundingClientRect().top;
        const t_position = offsetY - height;

        if (t_position >= 0) {
            // 上側の時
            this.setState({
                pleaseScrollDown: true,
            });
        } else {
            // 下側の時
            this.setState({
                pleaseScrollDown: false,
            });
        }
    }

    render() {
        const { pleaseScrollDown } = this.state;
        const { screenWidth, criteriaRef, targetId } = this.props;
        const elem = criteriaRef && criteriaRef.current;
        const width = screenWidth || parseInt(window.innerWidth, 10);
        if (!elem) return null;

        return (
            <center>
                <div style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    zIndex: pleaseScrollDown ? 999999990 : 0,
                    width: `${width}px`,
                    height: "70px",
                    opacity: pleaseScrollDown ? 1.0 : 0,
                    transition: "all 2s ease",
                    fontSize: "x-large",
                    backgroundColor: "#EEEEEE",
                    borderRadius: "30px 30px 0px 0px",
                }}>
                    <span
                        id="pleaseScroll"
                    >
                        <span></span>
                        <AnchorLink href={`#${targetId || (elem && elem.id)}`}>Scroll</AnchorLink>
                    </span>
                </div>
            </center>
        )
    }
}