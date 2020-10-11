import React, {Component} from "react";
import axios from "axios";
import "./QuestFinish.css";
import Loader from "../Loader/Loader";
import {connect} from "react-redux";


class QuestFinish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quest: {},
            loading: true
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
    }

    render() {
        const {error} = this.state;
        window.scrollTo(0, 0);
        if (error) return <div>Error: {error.message}</div>;
        return (
            <div className="container-vac-details">
                <h3 className="header-h">Квест "{this.props.questName}" пройден!</h3>
                <h5 className="city">Ваш результат: {this.props.countRightAns} / {this.props.countQuestions}</h5>
            </div>
        );
    }
}

const mapDispachToProps = dispatch => {
    return {
        onAnswer: value => dispatch({type: "answer", value: value})
    };
};

const mapStateToProps = state => {
    return {
        countRightAns: state.countRightAns,
        countQuestions: state.countQuestions,
        questName: state.questName,
    };
};

export default connect(mapStateToProps, mapDispachToProps)(QuestFinish);
