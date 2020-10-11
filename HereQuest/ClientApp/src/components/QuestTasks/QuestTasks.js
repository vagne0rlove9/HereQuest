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
            errorMes: false,
            buttonText: "Ответить на вопрос",
            isNext: false,
            tasks: [],
            curTask: {},
            curId: 0
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.getTasks();
    }

    getCurTask() {
        const id = this.props.match.params.id
        var temp = []
        axios
            .get(`https://js-here.firebaseio.com/quests/tourism/${id}/tasks/${this.state.tasks[this.state.curId].id}.json`)
            .then((response) => response.data)
            .then(
                (data) => {
                    this.setState({curTask: data})
                    this.setState({
                        curTask: {
                            ...this.state.curTask,
                            id: this.state.curId,
                            count: this.state.tasks.length
                        }
                    })

                }
            );
    }

    getTasks() {
        const id = this.props.match.params.id
        var temp = []
        axios
            .get(`https://js-here.firebaseio.com/quests/tourism/${id}/tasks.json`)
            .then((response) => response.data)
            .then(
                (data) => {
                    Object.keys(data).forEach((key, index) => {
                        temp.push({
                            id: key,
                            index
                        })
                    })
                    this.setState({tasks: temp})
                    this.props.onCountQuestions(temp.length)
                    this.getCurTask()
                }
            );
    }

    handleClick = () => {
        if (this.props.answer === null)
            this.setState({errorMes: true})
        else {
            this.setState({errorMes: false})
            this.props.onDesc(true)
            if (this.props.isRight)
                this.props.onCountRightAns(this.props.countRightAns + 1)
            if (this.state.isNext) {
                this.setState({buttonText: "Ответить на вопрос", isNext: false})
                if (this.state.curId === this.state.tasks.length - 1)
                    this.props.history.push(`/quests/${this.props.match.params.id}/questions/result`)
                else {
                    this.state.curId = this.state.curId + 1
                    this.getCurTask()
                }
            } else {
                if (this.state.curId === this.state.tasks.length - 1)
                    this.setState({buttonText: "Завершить квест", isNext: true})
                else this.setState({buttonText: "Следующее задание", isNext: true})
                this.props.onFlag(false)
                this.props.onDesc(false)
            }

            //this.props.history.push(window.location.href + "/")
        }
    };

    render() {
        const {curTask, error} = this.state;
        if (error) return <div>Error: {error.message}</div>;
        return (
            <div className="container-vac-details">
                <QuestCurrentTask task={curTask}/>
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
        onDesc: value => dispatch({type: "isDesc", value: value}),
        onCountRightAns: value => dispatch({type: "countRightAns", value: value}),
        onCountQuestions: value => dispatch({type: "countQuestions", value: value}),
    };
};

const mapStateToProps = state => {
    return {
        isRight: state.isRight,
        answer: state.answer,
        countRightAns: state.countRightAns,
    };
};

export default connect(mapStateToProps, mapDispachToProps)(QuestTasks);
