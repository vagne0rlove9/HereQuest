import React, {Component} from "react";
import axios from "axios";
import Map from "../Map/Map";
import TextField from "@material-ui/core/TextField";
import {connect} from "react-redux";
import QuestCurrentTask from "../QuestCurrentTask/QuestCurrentTask";
import Loader from "../Loader/Loader";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import MapArea from "../MapArea/MapArea";

class QuestTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMes: false,
            buttonText: "Ответить на вопрос",
            isNext: false,
            tasks: [],
            curTask: {},
            curId: 0,
            loading: true
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.getTasks();
    }

    getTasks() {
        const id = this.props.match.params.id
        var temp = []
        axios
            .get(`https://js-here.firebaseio.com/quests/riddle/${id}.json`)
            .then((response) => response.data)
            .then(
                (data) => {

                    this.setState({tasks: data, loading: false})
                    this.props.onCountQuestions(1)
                    //this.getCurTask()
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
                    this.props.history.push(`/quests/tourism/${this.props.match.params.id}/questions/result`)
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
                {this.state.loading
                    ? <Loader/>
                    :
                    <>
                        <h3 className="header-task">{this.state.tasks.title}</h3>
                        <h5 className="question">{this.state.tasks.description_task}</h5>
                        <MapArea/>
                    </>
                }
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
        onCoors: value => dispatch({type: "currentCoors", value: value}),
        onRefresh: value => dispatch({type: "isRefresh", value: value}),
    };
};

const mapStateToProps = state => {
    return {
        isRight: state.isRight,
        answer: state.answer,
        countRightAns: state.countRightAns,
        currentCoors: state.currentCoors,
    };
};

export default connect(mapStateToProps, mapDispachToProps)(QuestTasks);
