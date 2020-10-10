import React, {Component} from "react";
import axios from "axios";
import "./QuestTasks.css";
import Map from "../Map/Map";
import TextField from "@material-ui/core/TextField";
import {connect} from "react-redux";
import QuestCurrentTask from "../QuestCurrentTask/QuestCurrentTask";

class QuestTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quest: {},
            errorMes: false,
            buttonText: "Ответить на вопрос",
            isNext: false,
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.getVacancy();
    }

    getVacancy() {
        //const id = this.props.match.params.id;
        //const url = `${APP_URL_DEV}/api/vacancies/${id}`;

        // axios
        //     .get(url)
        //     .then((response) => response.data)
        //     .then(
        //         (data) =>
        //             this.setState({
        //                 vacancy: data,
        //             }),
        //         (error) =>
        //             this.setState({
        //                 error: error,
        //             })
        //     );
    }

    handleClick = () => {
        if (this.props.answer === null)
            this.setState({errorMes: true})
        else {
            this.setState({errorMes: false})
            this.props.onDesc(true)
            if (this.state.isNext) {
                this.setState({buttonText: "Ответить на вопрос", isNext: false})
            } else {
                this.setState({buttonText: "Следующее задание", isNext: true})
                this.props.onFlag(false)
                this.props.onDesc(false)
            }

            //this.props.history.push(window.location.href + "/")
        }
    };

    render() {
        const {quest, error} = this.state;
        if (error) return <div>Error: {error.message}</div>;
        return (
            <div className="container-vac-details">
                <QuestCurrentTask quest={quest}/>
                {this.state.errorMes ? <div className="error">Выберите вариант ответа</div> : null}
                <button
                    type="button"
                    className="button-start-quest"
                    onClick={this.handleClick}
                >
                    {this.state.buttonText}
                </button>
            </div>
        );
    }
}


const mapDispachToProps = dispatch => {
    return {
        onFlag: value => dispatch({type: "isRight", value: value}),
        onDesc: value => dispatch({type: "isDesc", value: value})
    };
};

const mapStateToProps = state => {
    return {
        isRight: state.isRight,
        answer: state.answer,

    };
};

export default connect(mapStateToProps, mapDispachToProps)(QuestTasks);
