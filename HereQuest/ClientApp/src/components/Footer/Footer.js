import React, {Component} from "react";
import {NavLink} from "reactstrap";
import {withRouter, Link} from "react-router-dom";
import "../../custom.css";
import "./Footer.css";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";

class Footer extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            results: null,
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    goToSearchPage = (e) => {
        e.preventDefault();
        this.props.history.push(
            "/searchvac/" + document.getElementById("search_str").value
        );
    };


    handleQuest = () => {
        this.props.history.push("/aboutquest");
    }

    render() {
        return (
            <div className="footer-background">
                <div className="footer-row row" style={{margin: "0 auto"}}>
                    <div className="col-sm-3 footer-colm">
                        <h6 className="footer-headers">MayDay</h6>
                        <NavLink tag={Link} className="footer-link" to="/aboutus">
                            О проекте
                        </NavLink>
                        <div className="footer-link-div" onClick={this.handleQuest}>
                            Что такое геоквест
                        </div>
                    </div>
                    <div className="col-sm-3 footer-colm">
                        <h6 className="footer-headers">Вопросы и советы</h6>
                        <NavLink tag={Link} className="footer-link" to="/howtomakeresume">
                            Как пройти квест?
                        </NavLink>
                    </div>
                    <div className="col-sm-3 footer-colm">
                        <h6 className="footer-headers">Контакты</h6>
                        <div className="footer-email word">
                            mayday@gmail.com
                        </div>
                    </div>
                    <div className="col-sm-3 footer-colm">
                        <h6 className="footer-headers">Социальные сети</h6>
                        <div className="footer-link-div">
                            <a target="_blank" href="https://vk.com/studjent">
                                Мы в Вконтакте
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-row row" style={{margin: "0 auto"}}>
                    <h6 className="footer-copyright">
                        Copyright 2020 MayDay all rights reserved
                    </h6>
                </div>
            </div>
        );
    }
}


export default withRouter(Footer);
