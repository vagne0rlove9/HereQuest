import React, {Component} from "react";
import axios from "axios";
import "./QuestCurrentTask.css";
import Map from "../Map/Map";
import TextField from "@material-ui/core/TextField";
import {connect} from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

class QuestCurrentTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quest: {},
            ans: null,
            errorMes: null,
            correct: false
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

    handleStartQuest = () => {
        this.props.history.push('/quests/1')
    };

    handleChangeAns = (event) => {
        this.props.onAnswer(event.target.value)
        if (event.target.value === "3") {
            this.props.onFlag(true);
            this.setState({correct: true})
        } else {
            this.props.onFlag(false);
            this.setState({correct: false})
        }
        this.setState({ans: event.target.value})
    }

    render() {
        const {vacancy, error} = this.state;
        if (error) return <div>Error: {error.message}</div>;
        return (
            <>
                <h3 className="header-task">Задание 1</h3>
                <h5 className="question">В каком году был основан город Зеленоград?</h5>
                <Map/>
                {this.props.isDesc 
                    ?
                    <div className="row div-row" style={{marginLeft: "0", marginTop: "20px"}}>
                        <FormControl component="fieldset">
                            <h5 className="question">Варианты ответа:</h5>
                            <RadioGroup aria-label="gender" name="gender1" value={this.state.ans}
                                        onChange={this.handleChangeAns}>
                                <FormControlLabel value="1" control={<Radio/>} label="1957"/>
                                <FormControlLabel value="2" control={<Radio/>} label="1952"/>
                                <FormControlLabel value="3" control={<Radio/>} label="1956"/>
                                <FormControlLabel value="4" control={<Radio/>} label="1980"/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    :
                    <div className="row div-row" style={{marginLeft: "0", marginTop: "20px"}}>
                        <h5 className="question-description">{this.state.correct ? "Вы ответили правильно!" : "Вы ответили неправильно!"}<br/>Описание</h5>
                    </div>
                }
            </>
        );
    }
}

const mapDispachToProps = dispatch => {
    return {
        onFlag: value => dispatch({type: "isRight", value: value}),
        onAnswer: value => dispatch({type: "answer", value: value})
    };
};

const mapStateToProps = state => {
    return {
        isRight: state.isRight,
        isDesc: state.isDesc
    };
};

export default connect(mapStateToProps, mapDispachToProps)(QuestCurrentTask);
