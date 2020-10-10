import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavBar from '../NavBar/NavBar';
import "./Layout.css";
import Footer from '../Footer/Footer'

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
        <div className="main-container">
            <NavBar className="main-navbar" />
            <div className="main-section">{this.props.children}</div>
            <Footer className="main-footer" />
        </div>
    );
  }
}
